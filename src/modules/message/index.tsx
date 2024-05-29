import React, { FC, useState, CSSProperties } from 'react'

import { Icon } from '../icon';
import { ClassNames } from '../utils/classNames.util';
import { moduleConfig } from '../module.config';
import { translate } from '../../languages';

interface IButtonTryAgain {
    label?: string,
    onClick: any,
}

type TMessageType = 'error' | 'loading' | 'emptyData' | 'info';

type Props = {
    message?: string,
    style?: CSSProperties,
    status?: number,
    type: TMessageType,
    isLogoMeete?: boolean,
    buttonTryAgain?: IButtonTryAgain,
}

const MessageIcon: FC<{ type: TMessageType }> = ({ type }) => {
    // if (type === 'emptyData') return <Icon.Data />
    if (type === 'emptyData') return null
    if (type === 'loading') return <Icon.Loading />
    if (type === 'error') return <Icon.Error />
    return <Icon.Info />
}

export const Message: FC<Props> = (props) => {
    const { buttonTryAgain, message, style, type } = props;
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className={ClassNames({ Message: true, [type]: !!type })} style={style}>
            <div className="content">
                <MessageIcon type={type} />

                {(() => {
                    if (!message) { 
                        if (type === 'emptyData') return moduleConfig.translate('No data');
                        if (type === 'loading') return moduleConfig.translate('Processing');
                    }

                    return message
                })()}
            </div>

            {buttonTryAgain ? <div className="btnActions">
                {(() => {
                    if (isLoading) return <Icon.Loading />
                    return <button type="button" className="tryAgain Button info" onClick={async () => {
                        setIsLoading(true);
                        await buttonTryAgain.onClick();
                        setIsLoading(false);
                    }}>
                        {buttonTryAgain.label || translate('try-again')}
                    </button>
                })()}
            </div> : null}
        </div>
    )
}