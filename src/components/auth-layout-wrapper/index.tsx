import { FC, useEffect, useState } from "react";
import { ButtonSelectLanguage } from "../button-select-language";
import { Icon } from "../icon";
import { Link } from "../../components";
import { Routes } from "../../AppRoutes";
import { MainService } from "../../services";
import { translate } from "../../languages";
import { useDeviceType } from "../../hook";
import { MobiNav } from "./mobiNav";
import { useSelector } from "react-redux";

export const AuthLayoutWrapper = (Component: FC<any>) => (props: any) => {
  const [active, setActive] = useState<any>(false);
  const listenScrollEvent = (event: any) => {
    window.scrollY > 60 ? setActive(true) : setActive(false);
  };
  const deviceType = useDeviceType();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userPageInitializeStatus = useSelector((state:any) => state.main.userPageInitializeStatus);
  const user = useSelector((state:any) => state.user);
  useEffect(() => {
    if (userPageInitializeStatus === "pending") MainService.initialUserPage();
    // console.log("user", user);
  }, [user, userPageInitializeStatus]);

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);
  return (
    <>
      {/* [BEGIN] - Header */}
      {deviceType === "Desktop" ? (
        <header className="auth-header">
          <div className="header-container">
            <div className="header-container__left">
              <Link path={Routes.homePage.renderPath()} href={Routes.homePage.href}>
                <div className="header-container__icon">
                  <img src="/assets/images/gamepro/Logo.png" alt="" />
                </div>
              </Link>
            </div>
            <div className="header-container__right">
              <div className="header-container__account-button mr16">
                <Link path={Routes.login.renderPath()} href={Routes.login.href}>
                  <button className="account-button__login">{translate("Login")}</button>
                </Link>
                <Link path={Routes.register.renderPath()} href={Routes.register.href}>
                  <button className="account-button__register">{translate("Register Now")}</button>
                </Link>
              </div>
              <div className="header-container__language-bar">
                <ButtonSelectLanguage isShowAll isNotArrowDown />
              </div>
            </div>
          </div>
        </header>
      ) : (
        <div className="auth-navigator">
          <header>
            <div className="iconMenu" onClick={() => setIsMenuOpen(true)}>
              <Icon.Menu />

              <Link href={Routes.homePage.href} path={Routes.homePage.renderPath()}>
                <img src="/assets/images/gamepro/Logo.png" alt="" />
              </Link>
            </div>
            {isMenuOpen ? <MobiNav onClose={() => setIsMenuOpen(false)} /> : null}
          </header>
        </div>
      )}

      {/* [END] - Header */}
      <Component {...props} />      
    </>
  );
};
