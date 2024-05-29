import React, { FC, useState } from 'react'
import { ClassNames } from '../../modules'
import { Icon } from '../icon'

export interface ICollapseProps {
    title: any,
    className?: string,
    type?: 'normal' | 'title-outside',
    children?:any
}

export const Collapse: FC<ICollapseProps> = (props:any) => {
    const { className, type = 'normal', title } = props;
    const [active, setActiveCollaspse] = useState(1);
    const [styleActive, setStyleActive] = useState({display: 'none', height: '0' , transition: 'all 2.35s ease'})

    const handleCollapse = () => {
        if(active){
            setActiveCollaspse(0)
        }else{
            setActiveCollaspse(1)
        }
    }

    return(
       
        <div className={ClassNames({
            Collapse: true,
            [className as string]: !!className,
            [type as string]: true,
        })}>
            <div className="head">
                <div className="title">
                    {title}
                </div>
                <div className={ClassNames({
                    btnShowHide: true,
                    active: active
                })} onClick={() => handleCollapse() }><Icon.ArrowDown/></div>
            </div>

            <div className={ClassNames({
                boxContent: true,
                active: active
                })}>
                {props.children}
            </div>
        </div>
    );
}