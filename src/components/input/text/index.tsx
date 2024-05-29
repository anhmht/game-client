import React, { FC } from 'react'
import { IInputProps } from '../../../modules'

interface IInputTextProps extends IInputProps {
    onBlur?: (value: any) => void
}

export const InputText: FC<IInputTextProps> = ({ name, onChange, onTouched, value, onBlur, tabIndex, placeholder, isDisabled, onFocus, isSkeletonLoading }) => {
    return (
        <input
            className={isSkeletonLoading ? 'placeholder' : ''}
            id={name}
            type="text"
            onChange={e => onChange(e.target.value)}
            onBlur={(e) => {
                const value = e.target.value;
                let _e = {...e};
                setTimeout(() => {
                    onTouched();
                    if (onBlur) onBlur(_e);
                }, 500);
            }}
            onFocus={() => {
                if (onFocus) onFocus();
            }}
            value={value || ''}
            tabIndex={tabIndex || 0}
            placeholder={isSkeletonLoading ? undefined : placeholder}
            disabled={isDisabled}
        />
    )
}