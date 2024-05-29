import React, { FC } from 'react'
import * as Yup from 'yup'

import { useForm, InputWraper, Button, ObjectUtils, onError, CreateAlert, IInputProps } from '../../modules';
import { Icon, InputText} from '../../components';
import { translate } from '../../languages';

interface IActionForm {
    isRequesting?: boolean;
    onSubmit: (code:any)=> void
}

export const TwoFaForm: FC<IActionForm> = (props) => {

    const { getInputProps, handleSubmit, isSubmitting } = useForm({
        enableReinitialize: true,
        structure: [
            {
                name: 'code',
                // defaultValue: ObjectUtils.getIn(externalWallet, 'address', ''),
                validate: Yup.string().required(translate('Must be provided')),
            },
        ],
        onSubmit: async (values) => {
            props.onSubmit(values.code)
        }
    })

    return (
        <div className="TwoFaForm">
            <form onSubmit={handleSubmit} autoComplete="off">
                <InputWraper
                    label={translate('authentication-code')}
                    inputProps={getInputProps('code')}
                    renderInput={state => {
                        return <InputText {...state}/>
                    }}
                    placeholder={translate("Enter your authentication code")}
                />
                <Button
                    style={{display: 'flex', marginLeft: 'auto', marginRight: 'auto'}}
                    className="mt20"
                    buttonType='primary'
                    type='submit'
                    label={'VERIFY'}
                    isLoading={props?.isRequesting}
                />
            </form>
        </div>
    )
}
