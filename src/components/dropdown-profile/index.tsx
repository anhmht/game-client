import React, { FC, useState } from "react";
import { getLocaleKey, locales, setLocale } from "../../languages";
import { Icon } from "../icon";
import { ClassNames, ObjectUtils } from "../../modules";
import { Image, Link } from "../../components";
import { UserService } from "../../services";
import { translate } from "../../languages";
import { Routes } from "../../AppRoutes";
import { useSelector } from "react-redux";

export const DropdownProfile: FC<{ isFixed?: boolean }> = ({ isFixed = false }) => {
  const localeKey = getLocaleKey();
  const localeActive = locales.find((v) => v.key === localeKey);
  const localeLable = ObjectUtils.getIn(localeActive, "label", "--");
  const user = useSelector((state:any) => state.user);
  const name = `${user.firstName} ${user.lastName}`;
  const [isShow, setIsShow] = useState(false);

  return (
    <div
      onClick={() => setIsShow(!isShow ? true : false)}
      className={ClassNames({ DropdownProfile: true, show: isShow })}
    >
      {!isFixed ? (
        <div className="label">
          {/* <Image src={user.avatar} type="avatar"/> */}
          <Image src={"/assets/images/2color/user-profile.png"} type="avatar" />
          <span className="label--name">{name}</span>
        </div>
      ) : null}

      {/* <button type="button">
        <div className="options">
          <div className="wraper">
            <div className="item">
              <div className="name">
                {" "}
                {translate("Welcome")} {name}
              </div>
            </div>
            <div className="item" onClick={async () => Routes.userAccountProfile.push()}>
              <div className="name">
                <Link
                  href={Routes.userAccountProfile.href}
                  path={Routes.userAccountProfile.renderPath()}
                >
                  <Icon.Profile />
                  <p>{translate("Account")}</p>
                </Link>
              </div>
            </div>
            <div className="item" onClick={() => UserService.logout()}>
              <div className="name">
                <Icon.Logout />
                <p className="logout">{translate("Logout")}</p>
              </div>
            </div>
          </div>
        </div>
      </button> */}
    </div>
  );
};
