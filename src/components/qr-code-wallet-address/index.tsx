import React, { FC } from 'react'
import LibQRCode from 'qrcode.react';

export const QRCodeWalletAddress: FC<{ value: string }> = ({ value }) => {
    return (
        <div className="QRCodeWalletAddress">
            <div className="content">
                <div className="code">
                    <LibQRCode
                        value={value}
                        renderAs="svg"
                        bgColor="transparent"
                        fgColor="white"
                    />

                    {/* <div className="lineTopLeft" />
                    <div className="lineTopRight" />
                    <div className="lineBottomLeft" />
                    <div className="lineBottomRight" /> */}
                </div>

                <div className="note">Scan QR code</div>
            </div>
        </div>
    )
}