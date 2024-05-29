import React, { FC, Fragment, useEffect, useState } from 'react'
import NumberFormat from 'react-number-format';
import { IInputProps, Icon } from '../../../modules';
import { getLocaleKey } from '../../../languages';
import { useDeviceType } from '../../../hook';


interface IInputNumberProps extends IInputProps {
    suffix?: string
    prefix?: string
    max?: number,
    min?: number,
}

export const InputNumberAmount: FC<IInputNumberProps> = (props) => {
    const { value, onTouched, suffix, prefix, max, min, onChange } = props;
    const locale = getLocaleKey();
    const deviceType = useDeviceType();
    const decimalSeparator = locale === 'vi-VN' ? ',' : '.';
    const thousandSeparator = locale === 'vi-VN' ? '.' : ',';
    const [isFirst, setIsFirst] = useState(true);

    const amount = isFirst ? 10 : value;

    useEffect(() => {
        setIsFirst(false)
        onChange(amount);
    }, [props.value])

 
    return (
        <Fragment>
                {deviceType === "Desktop" ? <div className="amount-box">Amount</div> : null} 
                {/* @ts-ignore */}
                <NumberFormat
                    fixedDecimalScale={true}
                    value={amount}
                    decimalSeparator={decimalSeparator}
                    thousandSeparator={thousandSeparator}
                    onValueChange={({ floatValue, value }:any) => {
                        const data = floatValue || '';
                        if ((typeof max === 'number') && (+data > max)) return onChange(max);
                        return onChange(data);
                    }}
                    onBlur={() => setTimeout(() => onTouched(), 500)}
                    suffix={suffix}
                    prefix={prefix}
                />
                {deviceType === "Desktop" ?
                    <div className="actionPlus">
                        <div className="btnInputNumberPlus" onClick={() => {
                                if (typeof max === 'number' && amount > max) return onChange(max);
                                props.onChange((amount || 0)+1);
                            }}>
                            <Icon.Plus/>
                        </div>
                        <div className="space"></div>
                        <div className="btnInputNumberMinus" onClick={() => {
                            if (amount <= 1) return onChange(1);
                                props.onChange(amount-1)
                            }}>
                            <Icon.Minus/>
                        </div>
                    </div>
                    :
                    null
                }
        </Fragment>
    )
}