import { Routes } from "@/src/AppRoutes";
import { translate } from "@/src/languages";
import { setIsOpenVerticalNavbarMobile } from "@/src/redux/slices/mainSlice";
import { store } from "@/src/redux/store";
import { UserService } from "@/src/services";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { LanguageSelectCompnt } from "../language-select-compnt";
import Link from "next/link";
import { Button } from "@/src/modules";

const VerticalNavbar = () => {
  const path = usePathname();
  const router: any = useRouter();
  const sidebarRef = useRef<any>(null);
  const user = useSelector((state: any) => state.user);
  const isOpenVerticalNavbarMobile = useSelector((state: any) => state.main.isOpenVerticalNavbarMobile);

  const mainMenuList = [
    { label: "Lucky lotto", path: Routes.comingSoon.href },
    { label: "Dashboard", path: Routes.userAccountAssets.href },
    { label: "White paper", path: "/white-paper" },
    { label: "About us", path: "/about/about-us" },
  ];

  const handleOutsideClick = (event: any) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      store.dispatch(setIsOpenVerticalNavbarMobile(false));
    }
  };

  useEffect(() => {
    const htmlStyle = document.querySelector("html");
    if (isOpenVerticalNavbarMobile) htmlStyle?.classList.add("overflow-hidden");
    else htmlStyle?.classList.remove("overflow-hidden");
  }, [isOpenVerticalNavbarMobile]);

  useEffect(() => {
    document.addEventListener("mouseup", handleOutsideClick);
    return () => {
      document.removeEventListener("mouseup", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={sidebarRef} className={`nav-bar ${isOpenVerticalNavbarMobile ? "mobile-open" : ""}`}>
      <div className="nar-bar__header">
        {isOpenVerticalNavbarMobile && (
          <div className="general-header__menu-mobile" onClick={() => store.dispatch(setIsOpenVerticalNavbarMobile(false))}>
            <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22 10V12H4V13H5V14H6V15H7V16H8V17H9V18H10V19H11V20H12V21H11V22H10V21H9V20H8V19H7V18H6V17H5V16H4V15H3V14H2V13H1V12H0V10H1V9H2V8H3V7H4V6H5V5H6V4H7V3H8V2H9V1H10V0H11V1H12V2H11V3H10V4H9V5H8V6H7V7H6V8H5V9H4V10H22Z"
                fill="white"
              />
            </svg>
          </div>
        )}
        <div className="nar-bar__logo" onClick={() => router.push(Routes.home.href, { scroll: true })}>
          <img src="/assets/images/main-logo-mobi.png" alt="" />
        </div>
      </div>
      <div className="nar-bar__menu">
        {isOpenVerticalNavbarMobile &&
          (user === null ? (
            <div className="d-flex">
              <Button label={translate("Login")} onClick={() => router.push(Routes.login.href)} />
              <Button className="ml10" label={translate("SIGN UP")} buttonType="secondary" onClick={() => router.push(Routes.register.href)} />
            </div>
          ) : (
            <Link href={Routes.userAccountAssets.href} className="nar-bar__menu__info">
              <img className="nar-bar__menu__info__img" src={`/assets/images/rank/${user?.rank}.png`} alt="" />
              <div className="nar-bar__menu__info__name">{user?.firstName}</div>
              <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ms-auto">
                <path
                  d="M4.16699 12.6666L4.16699 13.1666L4.66699 13.1666L4.83366 13.1666L4.83366 13.3333L4.83366 13.8333L5.33366 13.8333L6.66699 13.8333L7.16699 13.8333L7.16699 13.3333L7.16699 13.1666L7.33366 13.1666L7.83366 13.1666L7.83366 12.6666L7.83366 12.4999L8.00033 12.4999L8.50033 12.4999L8.50033 11.9999L8.50033 11.8333L8.66699 11.8333L9.16699 11.8333L9.16699 11.3333L9.16699 11.1666L9.33366 11.1666L9.83366 11.1666L9.83366 10.6666L9.83366 10.4999L10.0003 10.4999L10.5003 10.4999L10.5003 9.99992L10.5003 9.83325L10.667 9.83325L11.167 9.83325L11.167 9.33325L11.167 9.16659L11.3337 9.16659L11.8337 9.16659L11.8337 8.66659L11.8337 7.33325L11.8337 6.83325L11.3337 6.83325L11.167 6.83325L11.167 6.66659L11.167 6.16659L10.667 6.16659L10.5003 6.16659L10.5003 5.99992L10.5003 5.49992L10.0003 5.49992L9.83366 5.49992L9.83366 5.33325L9.83366 4.83325L9.33366 4.83325L9.16699 4.83325L9.16699 4.66659L9.16699 4.16659L8.66699 4.16659L8.50032 4.16659L8.50032 3.99992L8.50032 3.49992L8.00032 3.49992L7.83366 3.49992L7.83366 3.33325L7.83366 2.83325L7.33366 2.83325L7.16699 2.83325L7.16699 2.66659L7.16699 2.16659L6.66699 2.16659L5.33366 2.16659L4.83366 2.16659L4.83366 2.66659L4.83366 2.83325L4.66699 2.83325L4.16699 2.83325L4.16699 3.33325L4.16699 4.66659L4.16699 5.16659L4.66699 5.16659L4.83366 5.16659L4.83366 5.33325L4.83366 5.83325L5.33366 5.83325L5.50033 5.83325L5.50033 5.99992L5.50033 6.49992L6.00033 6.49992L6.16699 6.49992L6.16699 6.66659L6.16699 7.16659L6.66699 7.16659L6.83366 7.16659L6.83366 7.33325L6.83366 7.83325L7.33366 7.83325L7.50032 7.83325L7.50032 8.16659L7.33366 8.16659L6.83366 8.16659L6.83366 8.66659L6.83366 8.83325L6.66699 8.83325L6.16699 8.83325L6.16699 9.33325L6.16699 9.49992L6.00033 9.49992L5.50033 9.49992L5.50033 9.99992L5.50033 10.1666L5.33366 10.1666L4.83366 10.1666L4.83366 10.6666L4.83366 10.8333L4.66699 10.8333L4.16699 10.8333L4.16699 11.3333L4.16699 12.6666Z"
                  fill="white"
                  stroke="black"
                />
              </svg>
            </Link>
          ))}

        {mainMenuList?.map((item: any, idx: number) => (
          <Link href={item?.path} className={`nar-bar__menu__item ${path === item?.path && "active"}`}>
            {idx === 0 && (
              <img
                style={{
                  margin: "0 8px 6px 0",
                }}
                src="/assets/images/crown.png"
                alt=""
              />
            )}
            {item?.label}
          </Link>
        ))}

        {user && (
          <div
            className="nar-bar__menu__logout"
            onClick={() => {
              UserService.logout();
            }}
          >
            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.33331 14.8333L8.33331 15.6666L6.66665 15.6666L6.66665 14.8333L5.83331 14.8333L5.83331 14L4.99998 14L4.99998 13.1666L4.16665 13.1666L4.16665 12.3333L3.33331 12.3333L3.33331 11.5L2.49998 11.5L2.49998 10.6666L1.66665 10.6666L1.66665 9.83329L0.833313 9.83329L0.833313 8.16663L1.66665 8.16663L1.66665 7.33329L2.49998 7.33329L2.49998 6.49996L3.33331 6.49996L3.33331 5.66663L4.16665 5.66663L4.16665 4.83329L4.99998 4.83329L4.99998 3.99996L5.83331 3.99996L5.83331 3.16663L6.66665 3.16663L6.66665 2.33329L8.33331 2.33329L8.33331 3.16663L9.16665 3.16663L9.16665 4.83329L8.33331 4.83329L8.33331 5.66663L7.49998 5.66663L7.49998 6.49996L6.66665 6.49996L6.66665 7.33329L14.1666 7.33329L14.1666 10.6666L6.66665 10.6666L6.66665 11.5L7.49998 11.5L7.49998 12.3333L8.33331 12.3333L8.33331 13.1666L9.16665 13.1666L9.16665 14.8333L8.33331 14.8333Z"
                fill="white"
              />
              <path d="M16.6667 0.666706L16.6667 17.3334L19.1667 17.3334L19.1667 0.666706L16.6667 0.666706Z" fill="white" />
            </svg>
            <div className="nar-bar__menu__logout__label">Sign out</div>
          </div>
        )}
      </div>
      <div className="narbar__footer">
        <div onClick={() => window.open("https://www.facebook.com/memelotto", "_blank")}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.1673 7.50004V12.5H18.334V14.1667H17.5006V15.8334H16.6673V16.6667H15.834V17.5H14.1673V18.3334H12.5007V19.1667H11.6673V12.5H13.334V11.6667H14.1673V10H11.6673V7.50004H12.5007V6.66671H14.1673V4.16671H10.834V5.00004H9.16732V6.66671H8.33398V10H5.83398V12.5H8.33398V19.1667H7.50065V18.3334H5.83398V17.5H4.16732V16.6667H3.33398V15.8334H2.50065V14.1667H1.66732V12.5H0.833984V7.50004H1.66732V5.83337H2.50065V4.16671H3.33398V3.33337H4.16732V2.50004H5.83398V1.66671H7.50065V0.833374H12.5007V1.66671H14.1673V2.50004H15.834V3.33337H16.6673V4.16671H17.5006V5.83337H18.334V7.50004H19.1673Z"
              fill="white"
            />
          </svg>
        </div>
        <div onClick={() => window.open("https://twitter.com/MemeLotto_", "_blank")}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.9167 7.33329V6.49996H12.75V5.66663H13.5833V4.83329H14.4167V3.99996H15.25V3.16663H16.0833V2.33329H16.9167V1.49996H17.75V0.666626H15.25V1.49996H14.4167V2.33329H13.5833V3.16663H12.75V3.99996H11.9167V4.83329H11.0833V5.66663H9.41667V4.83329H8.58333V3.99996H7.75V2.33329H6.91667V1.49996H6.08333V0.666626H0.25V1.49996H1.08333V2.33329H1.91667V3.16663H2.75V4.83329H3.58333V5.66663H4.41667V7.33329H5.25V8.16663H6.08333V9.83329H6.91667V10.6666H6.08333V11.5H5.25V12.3333H4.41667V13.1666H3.58333V14H2.75V14.8333H1.91667V15.6666H1.08333V16.5H0.25V17.3333H2.75V16.5H3.58333V15.6666H4.41667V14.8333H5.25V14H6.08333V13.1666H6.91667V12.3333H8.58333V13.1666H9.41667V14H10.25V15.6666H11.0833V16.5H11.9167V17.3333H17.75V16.5H16.9167V15.6666H16.0833V14.8333H15.25V13.1666H14.4167V12.3333H13.5833V10.6666H12.75V9.83329H11.9167V8.16663H11.0833V7.33329H11.9167ZM11.9167 10.6666V11.5H12.75V13.1666H13.5833V14H14.4167V15.6666H11.9167V14H11.0833V13.1666H10.25V12.3333H9.41667V10.6666H8.58333V9.83329H7.75V8.99996H6.91667V7.33329H6.08333V6.49996H5.25V4.83329H4.41667V3.99996H3.58333V2.33329H6.08333V3.16663H6.91667V4.83329H7.75V5.66663H8.58333V7.33329H9.41667V8.16663H10.25V8.99996H11.0833V10.6666H11.9167Z"
              fill="white"
            />
          </svg>
        </div>
        <div onClick={() => window.open("https://www.instagram.com/memelott_official/", "_blank")}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.1667 7.5V6.66667H13.3333V5.83333H12.5V5H7.5V5.83333H6.66667V6.66667H5.83333V7.5H5V12.5H5.83333V13.3333H6.66667V14.1667H7.5V15H12.5V14.1667H13.3333V13.3333H14.1667V12.5H15V7.5H14.1667ZM13.3333 11.6667H12.5V12.5H11.6667V13.3333H8.33333V12.5H7.5V11.6667H6.66667V8.33333H7.5V7.5H8.33333V6.66667H11.6667V7.5H12.5V8.33333H13.3333V11.6667Z"
              fill="white"
            />
            <path
              d="M18.334 4.16671V2.50004H17.5006V1.66671H15.834V0.833374H4.16732V1.66671H2.50065V2.50004H1.66732V4.16671H0.833984V15.8334H1.66732V17.5H2.50065V18.3334H4.16732V19.1667H15.834V18.3334H17.5006V17.5H18.334V15.8334H19.1673V4.16671H18.334ZM17.5006 15.8334H16.6673V16.6667H15.834V17.5H4.16732V16.6667H3.33398V15.8334H2.50065V4.16671H3.33398V3.33337H4.16732V2.50004H15.834V3.33337H16.6673V4.16671H17.5006V15.8334Z"
              fill="white"
            />
            <path d="M15.8327 4.16663H14.166V5.83329H15.8327V4.16663Z" fill="white" />
          </svg>
        </div>
        <div onClick={() => window.open("https://www.youtube.com/@Memelotto_official", "_blank")}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.334 5.83337V4.16671H16.6673V3.33337H3.33398V4.16671H1.66732V5.83337H0.833984V14.1667H1.66732V15.8334H3.33398V16.6667H16.6673V15.8334H18.334V14.1667H19.1673V5.83337H18.334ZM10.0007 12.5H8.33398V7.50004H10.0007V8.33337H11.6673V9.16671H13.334V10.8334H11.6673V11.6667H10.0007V12.5Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default VerticalNavbar;
