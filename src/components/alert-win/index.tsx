import React, { FC, useState, useEffect } from 'react'

import { Button } from '../../modules'
import { translate, getLocaleKey } from '../../languages'
import { Routes } from '../../AppRoutes'
import { Icon } from '../icon'
import { useTradeCoin } from '../../hook'

export let addAlertWin: (value: number) => void = () => 1;

export const AlertWin: FC = () => {
    const [result, setResult] = useState([] as number[]);
    const [profit, setProfit] = useState(null) as any;
    const { getIsDemo, data } = useTradeCoin();
    const isDemo = getIsDemo();
    let timeoutClose: any;
    const clearTimeoutClose = () => {
        try {
            clearTimeout(timeoutClose);
            timeoutClose = null;
        } catch (error) { }
    }

    addAlertWin = (value: number) => {
        setResult(state => ([...state, value]))
    }

    useEffect(() => {
        if (!profit && result.length > 0) {
            setTimeout(() => {
                setProfit(result[0]);

                try {
                    const isEnableSound = localStorage.getItem('sound') !== 'off';

                    if (isEnableSound) {
                        const soundWin: any = document.getElementById('sound-win');
                        soundWin.play();
                    }
                } catch (error) { }
            }, 100);
        }

        if (profit) {
            clearTimeoutClose();
            timeoutClose = setTimeout(() => handleClose(), 5000);
        }
    }, [profit, result])

    const handleClose = () => {
        clearTimeoutClose();
        setResult(state => state.slice(1, state.length));
        setProfit(null);
    }

    if (!profit) return null

    return (
        <div className="AlertWin" id="AlertWin" onClick={(e: any) => e.target.id === 'AlertWin' ? handleClose() : ''}>
            <div className="box">
                <div className="btnClose" onClick={handleClose}>
                    <Icon.Close />
                </div>

                <img className="imageHead" src="/assets/images/win.png" alt="" />

                <div className="title">{translate('alert-win-title')}</div>
                <div className="message">{translate('alert-win-message')}</div>
                <div className="value">+${(+profit).toLocaleString(getLocaleKey(), { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</div>
                <Button
                    buttonType="primary"
                    label= {!isDemo ? translate('live-account') : translate('demo-account')}
                    onClick={async () => {
                        handleClose();
                        Routes.userAccountWallets.push();
                    }}
                />
            </div>
        </div>
    )
}