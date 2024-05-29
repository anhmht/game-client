import React, { FC, useState, useEffect, ReactNode } from 'react'

import { ClassNames, IInputProps } from '../../../modules';

export interface IInputCheckboxProps extends IInputProps {
    type?: 'checkbox' | 'radio',
    label: string | ReactNode
}

export const InputCheckbox: FC<IInputCheckboxProps> = (props) => {
    const { label, onChange, type = 'checkbox' } = props;
    const [value, setValue] = useState(!!props.defaultValue);

    useEffect(() => {
        if (typeof props.value === 'boolean') setValue(props.value);
    }, [props.value])

    return (
        <div
            onClick={() => {
                if (props.isDisabled) return;
                setValue(!value);
                onChange(!value);
            }}
            className={ClassNames({
                InputCheckbox: true,
                checked: !!value,
                [type as string]: !!type,
                [props.className as string]: !!props.className,
                disabled: props.isDisabled                
            })}
        >
            <div className="icon">
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.589 1.07748C11.7452 1.23376 11.833 1.44568 11.833 1.66665C11.833 1.88762 11.7452 2.09954 11.589 2.25582L4.92235 8.92248C4.76608 9.07871 4.55415 9.16647 4.33318 9.16647C4.11221 9.16647 3.90029 9.07871 3.74402 8.92248L0.410684 5.58915C0.258886 5.43198 0.174891 5.22148 0.176789 5.00298C0.178688 4.78449 0.266329 4.57548 0.420836 4.42097C0.575342 4.26646 0.784353 4.17882 1.00285 4.17692C1.22135 4.17502 1.43185 4.25902 1.58902 4.41082L4.33318 7.15498L10.4107 1.07748C10.567 0.921259 10.7789 0.833496 10.9999 0.833496C11.2208 0.833496 11.4327 0.921259 11.589 1.07748Z" fill="white"/>
                </svg>
            </div>

            {label ? <div className="label">
                {label}
            </div> : null}
        </div>
    )
}