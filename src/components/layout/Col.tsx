import React, { FC } from 'react'

interface Props {
    amount: number,
    children?:any
}

export const Col: FC<Props> = (props:any) => {
    return (
        <div className={`col-sm-${props.amount}`}>
            {props.children}
        </div>
    )
}