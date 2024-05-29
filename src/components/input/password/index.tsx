import React, { FC, useState, Fragment } from 'react'

import { IInputProps } from '../../../modules'
import { Icon } from '../../icon'

export interface IInputPassword extends IInputProps {
    isDisabledAutoFill?: boolean
}

export const InputPassword: FC<IInputPassword> = (props) => {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false)

    return (
        <Fragment>
            <input
                className="InputPassword"
                value={props.value || ''}
                readOnly={props.isDisabled}
                type={isVisiblePassword ? 'text' : 'password'}
                onChange={e => props.onChange(e.target.value)}
                onBlur={() => setTimeout(() => props.onTouched(), 500)}
                autoComplete={'new-password'}
                tabIndex={props.tabIndex || 0}
                placeholder={props.placeholder}
            />

             <div className="InputPassword_ToggleVisible" onClick={() => setIsVisiblePassword(state => !state)}>
                {isVisiblePassword ? <Icon.Invisible /> : <Icon.Visible />}
            </div> 
        </Fragment>
    )
}