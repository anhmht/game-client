import React, { FC, useState, useEffect } from 'react'

import { Button } from '../../modules'
import { translate, getLocaleKey } from '../../languages'
import { Routes } from '../../AppRoutes'
import { Icon } from '../icon'

export let addAlertReceiveTransfer: (value: number) => void = () => 1;

export const AlertReceiveTransfer: FC = () => {
    const [result, setResult] = useState([] as number[]);
    const [transaction, setTransaction] = useState(null) as any;
    // const [transaction, setTransaction] = useState({
    //     "transactionId": 255,
    //     "transactionRequestId": 3,
    //     "userId": 1,
    //     "coinId": 3,
    //     "transactionTypeId": 3,
    //     "isFee": false,
    //     "description": "Receive from bank@fxpromax.com: Description",
    //     "transactionHash": null,
    //     "created": "2020-06-26T12:21:39.796Z",
    //     "value": 10,
    //     "balanceBefore": 420,
    //     "balanceAfter": 430,
    //     "modified": "2020-06-26T12:21:39.796Z",
    //     "transactionType": {
    //         "transactionTypeId": 3,
    //         "name": "RECEIVE_TRANSFER",
    //         "sign": true
    //     }
    // }) as any;

    let timeoutClose: any;
    const clearTimeoutClose = () => {
        try {
            clearTimeout(timeoutClose);
            timeoutClose = null;
        } catch (error) { }
    }

    addAlertReceiveTransfer = (value: number) => {
        console.log(value);
        setResult(state => ([...state, value]))
    }

    useEffect(() => {
        // if (!profit && result.length > 0) {
        //     setTimeout(() => {
        //         setProfit(result[0]);

        //         try {
        //             const isEnableSound = localStorage.getItem('sound') !== 'off';

        //             if (isEnableSound) {
        //                 const soundWin: any = document.getElementById('sound-win');
        //                 soundWin.play();
        //             }
        //         } catch (error) { }
        //     }, 100);
        // }

        // if (profit) {
        //     clearTimeoutClose();
        //     timeoutClose = setTimeout(() => handleClose(), 3000);
        // }
    }, [transaction, result])

    const handleClose = () => {
        clearTimeoutClose();
        setResult(state => state.slice(1, state.length));
        setTransaction(null);
    }

    if (!transaction) return null

    return (
        <div className="AlertReceiveTransfer" id="AlertReceiveTransfer" onClick={(e: any) => e.target.id === 'AlertReceiveTransfer' ? handleClose() : ''}>
            <div className="box">
                <div className="btnClose" onClick={handleClose}>
                    <Icon.Close />
                </div>

                <div className="content">
                    <div className="senderInformation">
                        <h3 className="name">Phan Quoc Hoi</h3>
                        <p className="email">phanquochoi@gmail.com</p>
                    </div>

                    <div className="transaction">
                        <h3 className="title">Đã chuyển tiền đến bạn</h3>
                        <p className="amount">
                            1.000 đ
                        </p>
                    </div>

                    <Button
                        buttonType="secondary"
                        label="Chuyển lại"
                        onClick={async () => Routes.userAccountWallets.push()}
                    />
                </div>
            </div>
        </div>
    )
}