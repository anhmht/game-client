import * as Yup from 'yup'
import { useFormik, FormikHelpers } from 'formik'

import { ObjectUtils } from '..'
import { IUseFormConfigs, IUseFormExportProps } from './types'
import { moduleConfig } from '../module.config'
import { isEqual } from '../utils'

export const useForm = (configs: IUseFormConfigs): IUseFormExportProps => {
    let initialValues: any = {}, validationSchema: any = {};
    const locales = moduleConfig.getLocaleList();

    const onSubmit = async (values: any, { setErrors, setSubmitting }: FormikHelpers<any>) => {
        try {
            const response = await configs.onSubmit(values, getDirtyFields())
            if (configs.onSuccess) configs.onSuccess(response)
            setSubmitting(false);
        } catch (error:any) {
            setErrors(error.errors || {});
            setSubmitting(false);
        }
    }

    const structure = configs.structure.reduce((output: any, item) => {
        output[item.name] = {
            ...item,
            defaultValue: typeof item.defaultValue !== 'undefined' ? item.defaultValue : '',
            isDisabled: typeof item.isDisabled === 'boolean' ? item.isDisabled : false,
            isVisible: typeof item.isVisible === 'boolean' ? item.isVisible : true,
        }

        // Default Values
        if (typeof item.defaultValue !== 'undefined') initialValues[item.name] = item.defaultValue;
        else {
            if (item.isMutilLocale) initialValues[item.name] = {};
            else initialValues[item.name] = '';
        }

        // Validates
        if (typeof item.validate !== 'undefined') {
            if (item.isMutilLocale && locales.length > 0) {
                validationSchema[item.name] = Yup.object().shape(locales.reduce((output: any, i) => {
                    output[i.key] = item.validate
                    return output;
                }, {}))
            }
            else validationSchema[item.name] = item.validate;
        }

        return output;
    }, {})

    const formState = useFormik({
        enableReinitialize: !!configs.enableReinitialize,
        initialValues,
        validationSchema: Yup.object().shape(validationSchema),
        onSubmit,
        validateOnBlur: false,
        validateOnChange: true,
        validateOnMount: true,
    })

    const getDirtyFields = () => {
        return Object.keys(formState.values).reduce((output: any = {}, key: string) => {
            if (!isEqual(formState.values[key], initialValues[key])) output[key] = formState.values[key];
            return output;
        }, {})
    }

    if (configs.isDebug) console.log('Form debug: ', formState);

    return {
        getInputProps: (name: string) => {
            if (!structure[name]) throw Error(`Cannot find structureItem with name:${name}`);
            return {
                name,
                value: ObjectUtils.getIn(formState.values, name, ''),
                defaultValue: initialValues[name],
                isDisabled: structure[name].isDisabled || formState.isSubmitting,
                error: ObjectUtils.getIn(formState.touched, name, false) ? ObjectUtils.getIn(formState.errors, name, '') : null,
                onChange: (value: any) => formState.isSubmitting ? value : formState.setFieldValue(name, value),
                onTouched: (status: boolean = true) => formState.setFieldTouched(name, status),
                getValue: (name: string) => formState.values[name],
                locales,
                isMutilLocale: structure[name].isMutilLocale,
                label: structure[name].label,
                description: structure[name].description,
            }
        },
        handleSubmit: e => {
            if (e) e.preventDefault();
            formState.handleSubmit();
        },
        resetForm: e => {
            if (e) e.preventDefault();
            formState.resetForm();
        },
        isSubmitting: formState.isSubmitting,
        getValue: (name: string) => formState.values[name],
        setValues: (values: any) => formState.setValues({ ...formState.values, ...values }),
        setErrors: (errors: any) => {
            formState.setErrors({ ...formState.errors, ...errors });
            formState.setTouched({
                ...formState.touched, ...Object.keys(errors).reduce((output: any, key) => {
                    output[key] = true;
                    return output
                }, {})
            });
        },
        values: formState.values,
        getDirtyFields,
        isValid: formState.isValid
    }
}