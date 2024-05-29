import React, { FC } from "react";
import { Routes } from "../../AppRoutes";
import { translate } from "../../languages";
import { Icon } from "../icon";
import { Link } from "../link";

export const MobiNav: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div
      className="MobileNavigatorMenu"
      id="MobileNavigatorMenu"
      onClick={(e: any) => (e.target.id === "MobileNavigatorMenu" ? onClose() : "")}
    >
      <div className="box">
        <div className="head">
          <div className="btnBack" onClick={() => onClose()}>
            <Icon.ArrowLeft />
          </div>
          <Link href={Routes.homePage.href} path={Routes.homePage.renderPath()}>
            <img width={109} height={48} src="/assets/images/gamepro/Logo.png" alt="" />
          </Link>
        </div>

        <div className="nav-btn">
          <button onClick={() => Routes.login.push()} className="nav-btn__white">
            {translate("Login")}
          </button>
          <button onClick={() => Routes.register.push()} className="nav-btn__yellow">
            {translate("Join now")}
          </button>
        </div>
      </div>
    </div>
  );
};
