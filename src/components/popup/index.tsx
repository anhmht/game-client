import React, { FC } from 'react'
import { Icon } from '../icon';

export const PopupWraper: FC<{ className?: string, title: string, onClose: () => void,center?: boolean, children?:any }> = (props) => {
    const id = `${Date.now()}-popupwraper`;

    return (
        <div
            id={id}
            className={`PopupWraper ${props.center?'PopupWraper--center':''} ${props.className || ''}`}
            onClick={(e: any) => e.target.id === id ? props.onClose() : null}
        >
            <div className="box">
                <div className="boxTitle">
                    <span>{props.title}</span>
                    <div className="btnClose" onClick={() => props.onClose()}>
                        <Icon.Close />
                    </div>
                </div>
                <div className="content">
                    {props.children}
                </div>
            </div>
        </div>
    )
}