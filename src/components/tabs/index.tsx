import React, { FC, Fragment, useState, useEffect } from 'react'
import { ClassNames } from '../../modules';

export interface ITab {
    label: string,
    id: string,
    data?: any,
}

export interface ITabsProps {
    tabs: ITab[],
    render?: (tab: ITab) => any,
    component?: any,
}

export const Tabs: FC<ITabsProps> = (props) => {
    const [tabActive, setTabActive] = useState(props.tabs[0]);
    const [isShow, setIsShow] = useState(false);

    const handleChange = (state: any) => {
        setIsShow(false);

        setTabActive(state);

        setTimeout(() => {
            setIsShow(true);
        }, 20);
    }

    useEffect(() => {
        handleChange(props.tabs[0])
    }, [props.tabs, props.render])

    return (
        <Fragment>
            <div className="Tabs">
                {props.tabs.map((item, key) => {
                    return (
                        <div
                            key={key}
                            className={ClassNames({
                                item: true,
                                active: tabActive.id === item.id
                            })}
                            onClick={() => handleChange(item)}
                        >
                            {item.label}
                        </div>
                    )
                })}
            </div>

            {(() => {
                if (!isShow) return null
                if (props.component) return <props.component tabId={tabActive.id} />
                if (isShow && props.render) return props.render(tabActive)
            })()}
        </Fragment>
    )
}