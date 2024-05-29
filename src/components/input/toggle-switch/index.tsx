import React, { FC } from 'react'

import { ClassNames, IInputProps } from '../../../modules';

export interface IInputToggleSwitchProps extends IInputProps {
    type?: 'rectangular' | 'round',
    label: string,
}

export const InputToggleSwitch: FC<IInputToggleSwitchProps> = (props) => {
    const { label, value, type = 'round' } = props;
    return (
        <div className="InputToggleSwitch">
            <div className="label">
                {label}
            </div>

            <label className="switch">
                <input type="checkbox" checked={value} onChange={(e) => props.onChange(!!!value, e)} />
                <span className={ClassNames({ slider: true, [type as string]: !!type })} />
            </label>
        </div>
    )
}