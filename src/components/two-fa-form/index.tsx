import React, { FC, Fragment, useState } from "react";
import Router from "next/router";

import { Icon } from "../../components/icon";
import { translate } from "../../languages";
import { TwoFaForm } from "./TwoFaForm";

export interface ITwoFaPopupProps {
  isRequesting?: boolean;
  onVerify: (code:any)=>void;
  onClose: ()=>void;
}

export const TwoFaPopup: FC<ITwoFaPopupProps> = (props) => {

  return (
    <Fragment>
      {(() => {
          const id = `popup-twofa`;
          return (
            <div
              className="twofaPopup"
              id={id}
            >
              <div className="box">
                <div className="head">
                  {translate('Two-Factor Authentication')}
                  <div className="btnClose" onClick={()=>props.onClose()} >
                    <Icon.Close />
                  </div>
                </div>
                <div className="content">
                <TwoFaForm isRequesting={props?.isRequesting} onSubmit={(code)=>{props.onVerify(code)}} />
                </div>
              </div>
            </div>
          );
        
      })()}
    </Fragment>
  );
};
