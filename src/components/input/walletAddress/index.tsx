import React, { FC, useState } from 'react'
import { IInputProps, ClassNames, CreateAlert, EAlertType } from '../../../modules'
import { Icon } from '../../icon';
import { UserService } from '../../../services';
import { translate } from '../../../languages';
import { ENetWork } from '../../../types';

export interface IInputWalletAddressProps extends IInputProps {
    coinCode: string,
    network: ENetWork
}

export const InputWalletAddress: FC<IInputWalletAddressProps> = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdateWalletAddress = async (value: string) => {
        if (value !== props.defaultValue) {
            setIsLoading(true);
            await UserService.changeExternalWalletAddress(props.coinCode, value, props.network)
                .then(() => {
                    CreateAlert({ message: translate('Update wallet address successful'), type: EAlertType.SUCCESS });
                    props.onChange(value);
                })
                .catch(res => CreateAlert(res.alert))

            setIsLoading(false);
        }
    }

    return (
        <div className={ClassNames({
            InputWalletAddress: true,
            loading: isLoading,
        })}>
            <input
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                onBlur={e => handleUpdateWalletAddress(e.target.value)}
                placeholder={props?.placeholder}
            />

            <div className="btnUpdate" onClick={() => handleUpdateWalletAddress(props.value)}>
                <div className="icon">
                    <Icon.Update />
                </div>

                {/* <div className="label">{translate('Update')}</div> */}
            </div>
        </div>
    )
}