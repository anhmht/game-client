import React, { FC } from 'react'
import NumberFormat from 'react-number-format';
import { IInputProps } from '../../../modules';
import { getLocaleKey } from '../../../languages';

interface IInputNumberCoinProps extends IInputProps {
    coinCode?: string
}

export const InputNumberCoin: FC<IInputNumberCoinProps> = (props) => {

    const locale = getLocaleKey();
    const decimalSeparator = locale === 'vi-VN' ? ',' : '.';
    const thousandSeparator = locale === 'vi-VN' ? '.' : ',';

    return (
        <div className="InputNumberCoin">
            {/* @ts-ignore */}
            <NumberFormat
                value={props.value}
                onValueChange={({ floatValue }:any) => {
                    const data = floatValue || 0;
                    props.onChange(data);
                }}
                onBlur={() => setTimeout(() => props.onTouched(), 500)}
                disabled={props.isDisabled}
                decimalSeparator={decimalSeparator}
                thousandSeparator={thousandSeparator}
            />

            {props.coinCode ? <div className="symbol">
                {props.coinCode}
            </div> : null}
        </div>
    )
}