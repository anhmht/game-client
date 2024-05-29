import React, { FC } from 'react'
import { ClassNames } from '../../modules'

export interface IUserColProps {
    amount?: number,
    fixed?: boolean,
    className?: string,
    children?:any
}

export const UserCol: FC<IUserColProps> = (props:any) => {
    return (
        <div className={ClassNames({
            [(() => {
                if (!props.amount) return `user-col-sm`;
                if (props.fixed) return `user-col-${props.amount}`;
                return `user-col-sm-${props.amount}`;
            })()]: true,
            [props.className as string]: props.className
        })}>
            {props.children}
        </div>
    )
}