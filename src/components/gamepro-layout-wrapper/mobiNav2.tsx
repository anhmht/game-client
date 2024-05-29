import React, { FC } from "react";
import { Routes } from "../../AppRoutes";
import { translate } from "../../languages";
import { Icon } from "../icon";
import { Link } from "../link";
import { animateScroll as scroll, scroller } from "react-scroll";
import { useSelector } from "react-redux";

export const MobiNav2: FC<{
  onClose: () => void;
  listMenu: {
    name: string;
    path: string;
    href: string;
    code: number;
  }[];
  getAutoChangeTabsGame: (value: number) => void;
}> = ({ onClose, listMenu, getAutoChangeTabsGame }) => {
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
              getAutoChangeTabsGame(item?.code);
            }}
            href={item?.href}
            target="__blank"
          >
            <img
              style={{ height: "24px", marginRight: "12px" }}
              src={`/assets/images/icon-menu/${item?.name?.trim().toLowerCase().replace(/\s+/g, "-")}.png`}
              alt=""
            />
            {item?.name}
          </a>
        </li>
      );
    });
  };

  return (
    <div className="MobileNavigatorMenu" id="MobileNavigatorMenu" onClick={(e: any) => (e.target.id === "MobileNavigatorMenu" ? onClose() : "")}>
      <div className="box">
        <div className="head">
          <div className="btnBack right" onClick={() => onClose()}>
            <Icon.ArrowLeft />
          </div>
          <Link href={Routes.homePage.href} path={Routes.homePage.renderPath()}>
            <img className="logo" src="/assets/images/gamepro/Logo.png" alt="" />
          </Link>
        </div>

        <ul className="navbar-nav">{renderNavLink()}</ul>
      </div>
    </div>
  );
};
