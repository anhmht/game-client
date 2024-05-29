import React, { FC, useState, useEffect } from 'react'

import { Button } from '../../modules'
import { translate, getLocaleKey } from '../../languages'
import { Routes } from '../../AppRoutes'
import { Icon } from '../icon'
import { useTradeCoin } from '../../hook'

export let addAlertWinCustom: (payload: any) => void = () => {};

export const AlertWinCustom: FC = () => {
    const [payload, setPayload] = useState([] as any);
    const [current, setCurrent] = useState(null) as any;

    addAlertWinCustom = (payload: any) => {
        setPayload((state:any) => [...state, payload])
    }

    useEffect(() => {
        if (!current && payload.length > 0) {
            setTimeout(() => {
                setCurrent(payload[0]);
                try {
                    const isEnableSound = localStorage.getItem('sound') !== 'off';

                    if (isEnableSound) {
                        const soundWin: any = document.getElementById('sound-win');
                        soundWin.play();
                    }
                } catch (error) { }
            }, 100);
        }

    }, [current, payload])

    const handleClose = () => {
        setPayload((state:any) => state.slice(1, state.length));
        setCurrent(null);
    }

    if (!current) return null

    return (
        <div className="AlertWinCustom" id="AlertWinCustom" onClick={(e: any) => e.target.id === 'AlertWinCustom' ? handleClose() : ''}>
            <div className="box">
                <div className="btnClose" onClick={handleClose}>
                    <Icon.Close />
                </div>

                <img className="imageHead" src="/assets/images/win.png" alt="" />

                <div className="title">{current?.title ?? translate('Notification')}</div>
                <div className="message" dangerouslySetInnerHTML={{__html: current?.message}}></div>
            </div>
        </div>
    )
}