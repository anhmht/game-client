import { FC } from "react";
import { scroller } from "react-scroll";
import { Routes } from "../../AppRoutes";
import { translate } from "../../languages";
import { Icon } from "../icon";
import { Link } from "../link";
import { useSelector } from "react-redux";

export const MobiNav: FC<{
  onClose: () => void;
  listMenu: {
    name: string;
    path: string;
    href: string;
  }[];
}> = ({ onClose, listMenu }) => {
  const user = useSelector((state:any) => state.user);

  const renderNavLink = () => {
    return listMenu.map((item, index) => {
      return (
        <li className="nav-item" key={index}>
          <a
            className="nav-link"
            onClick={() => {
              scroller.scrollTo(item?.path, {
                // duration: 800,
                offset: -92,
                delay: 0,
                smooth: "easeOutQuart",
              });
              onClose();
            }}
            href={item?.href}
          >
            {translate(`${item?.name}`)}
          </a>
        </li>
      );
    });
  };

  return (
    <div className="MobileNavigatorMenu" id="MobileNavigatorMenu" onClick={(e: any) => (e.target.id === "MobileNavigatorMenu" ? onClose() : "")}>
      <div className="box ml-auto">
        <div className="head">
          <div className="btnBack left" onClick={() => onClose()}>
            <Icon.ArrowLeft />
          </div>
          <Link href={Routes.homePage.href} path={Routes.homePage.renderPath()}>
            <img className="logo" src="/assets/images/gamepro/Logo.png" alt="" />
          </Link>
        </div>

        <ul className="navbar-nav">{renderNavLink()}</ul>

        {!user ? (
          <>
            <div className="nav-btn">
              <button onClick={() => Routes.login.push()} className="nav-btn__white">
                {translate("Login")}
              </button>
              <button onClick={() => Routes.register.push()} className="nav-btn__yellow">
                {translate("Join now")}
              </button>
            </div>
          </>
        ) : (
          <div className="nav-btn">
            <button className="nav-btn__white" onClick={() => Routes.userDashboard.push()}>
              {translate("Dashboard")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
