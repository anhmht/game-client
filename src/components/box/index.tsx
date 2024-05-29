import React, { FC } from 'react'
import { ClassNames } from '../../modules'

export interface IBoxProps {
    title: any,
    className?: string,
    type?: 'normal' | 'title-outside'
}

export const Box: FC<any> = (props:any) => {
    const { className, type = 'normal', title } = props;
    return (
        <div className={ClassNames({
            Box: true,
            [className as string]: !!className,
            [type as string]: true,
        })}>
            <div className="head">
                <div className="title">
                    {title}
                </div>
            </div>

            <div className="content">
                {props.children}
            </div>
        </div>
    )
}