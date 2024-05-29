import React, { FC, Fragment } from 'react'

import { Icon } from '../icon';
import { ClassNames } from '..';

import { IButtonProps } from '../button';
import { useForm } from './useForm';
import { InputWraper } from './InputWraper';
import { IInputProps } from './types';

export interface IFormField {
    label: string,
    name: string,
    isVisible?: boolean,
    col?: number,
    validate?: any,

    defaultValue?: any,
    disabled?: boolean,
    renderInput?: (state: IInputProps) => any,
    component?: FC<IInputProps>,
}

export interface IFormProps {
    // useForm related
    structure: IFormField[],
    onSubmit: (values: any) => Promise<any> | void,
    isDebug?: boolean,
    onSuccess?: (response?: any) => void
    // another
    className?: string,
    buttonClose?: IButtonProps,
    labelSubmit?: string,
}

export const Form: FC<IFormProps> = (props) => {
    const structure = props.structure.filter(v => v.isVisible !== false)
    const { handleSubmit: onSubmit, isSubmitting, getInputProps } = useForm({
        structure,
        onSubmit: props.onSubmit,
        isDebug: props.isDebug,
        onSuccess: props.onSuccess
    })

    return (
        <div className={ClassNames({
            Form: true,
            [props.className as string]: !!props.className
        })}>
            <form onSubmit={onSubmit} className="form">
                <div className="row">
                    {structure.map((structureInputProps, key) => {
                        const { label, col, name, renderInput: input } = structureInputProps;

                        return <div className={`col-${col || 12}`} key={key}>
                            <InputWraper
                                label={label}
                                inputProps={getInputProps(name)}
                                renderInput={input}
                            />
                        </div>
                    })}
                </div>

                <div className="actions">
                    {(() => {
                        if (isSubmitting) return <div className="loading">
                            <Icon.Loading />
                        </div>

                        return <Fragment>
                            {(() => {
                                if (!props.buttonClose || !props.buttonClose.onClick) return null

                                return <button
                                    type="button"
                                    className="buttonClose"
                                    onClick={() => props.buttonClose && props.buttonClose.onClick ? props.buttonClose.onClick() : null}
                                >
                                    {props.buttonClose.label || 'Close'}
                                </button>
                            })()}

                            <button type="submit">
                                {props.labelSubmit || 'Submit'}
                            </button>
                        </Fragment>
                    })()}
                </div>
            </form>
        </div>
    )
}