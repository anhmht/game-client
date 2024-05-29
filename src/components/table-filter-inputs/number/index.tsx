import React, { FC } from 'react'
import NumberFormat from 'react-number-format';

import { ITableFilterInputProps } from '../../../modules'

export const TableFilterInputNumber: FC<ITableFilterInputProps> = (props) => {
    const key = props.paramKey;

    return (
        <div className="TableFilterInputNumber">
            {/* @ts-ignore */}
            <NumberFormat
                fixedDecimalScale={false}
                defaultValue={props.params[key]}
                onValueChange={({ floatValue }:any) => {
                    const data = floatValue || 0;
                    props.onChange({ [key]: data })
                }}
            />
        </div>
    )
}