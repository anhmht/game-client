import React, { FC } from 'react';
import { translate } from '../../languages';
import { Button, Icon } from '../../modules';

export const GeneralPopupCompnt: FC<any> = (props) => {
    return (
        <div className="general-popup-compnt">
            <div className="popup-container">
                <div className="popup-wraper">
                    <div className="btnClose" onClick={() => props?.onClose()}>
                        <Icon.ClosePopup />
                    </div>
                    <div className="popup-body">
                        <img className="pic-confirm" src="/assets/images/popup-confirm-pic.png" />
                        {props.titlePopup ? <div className="title-popup"> {props.titlePopup} </div> : null}
                        <div className="message-popup">{props.messagePopup}</div>
                        <div className="button-container">
                            <Button
                                label={translate('Confirm')}
                                type="submit"
                                buttonType="primary"
                                className="confirm-button"
                                onClick={() => props?.onClickConfirm()}
                            />
                            <Button
                                label={translate('Cancel')}
                                type="button"
                                buttonType="secondary"
                                className="cancel-button"
                                onClick={() => props?.onClose()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
