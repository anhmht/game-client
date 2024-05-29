import React, { FC } from 'react'
import { ClassNames } from '../../modules'

export interface IRowProps {
    justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around',
    className?: string,
    children?:any
}

export const Row: FC<IRowProps> = (props:any) => {
    return (
        <div className={ClassNames({
            row: true,
            [props.className as string]: !!props.className,
            [`justify-content-${props.justifyContent || 'center'}`]: true
        })}>
            {props.children}
        </div>
    )
}