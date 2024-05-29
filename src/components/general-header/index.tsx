import React, { useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Routes } from "@/src/AppRoutes";
import Link from "next/link";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { translate } from "@/src/languages";
import { useSelector } from "react-redux";
import { Icon } from "../icon";
import { Button, NumberUtils } from "@/src/modules";
import { DepositModalContext } from "../deposit-modal";
import { WithdrawalModalContext } from "../withdrawal-modal";
import { UserService } from "@/src/services";
import { useTradeCoin } from "@/src/hook";
import { store } from "@/src/redux/store";
import { setIsOpenVerticalNavbarMobile } from "@/src/redux/slices/mainSlice";

const GeneralHeader = (props: any) => {
  const router: any = useRouter();
  const path = usePathname();
  const user = useSelector((state: any) => state.user);
  const main = useSelector((state: any) => state.main);
  const isOpenVerticalNavbarMobile = useSelector((state: any) => state.main.isOpenVerticalNavbarMobile);

  const { setIsShowDepositModal } = useContext<any>(DepositModalContext);
  const { setIsShowWithdrawalModal } = useContext<any>(WithdrawalModalContext);

  const mainMenuList = [
    { label: "ABOUT", path: "/about/about-us" },
    { label: "CHARACTER", path: Routes.comingSoon.href },
    { label: "ENVIROMENT", path: Routes.userAccountAssets.href },
    { label: "GAME PLAY", path: "/white-paper" },
    { label: "Q&A", path: "/white-paper" },
  ];

  return (
    <div className={`general-header ${props?.scrolled ? "animated fadeInDown general-header--scrolled" : ""}`}>
      <div className="general-header__main">
        <div className="general-header__menu-mobile mb10" onClick={() => store.dispatch(setIsOpenVerticalNavbarMobile(true))}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill="none" />
            <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="general-header__main__logo" onClick={() => router.push(Routes.home.href, { scroll: true })}>
          <img src="/assets/images/main-logo.png" alt="" />
        </div>
        <div className="general-header__main__menu">
          <Swiper modules={[FreeMode]} slidesPerView={"auto"} freeMode={true} className="general-header__main__menu__swiper">
            {mainMenuList?.map((element: any, idx: number) => {
              if (idx === 0)
                return (
                  <SwiperSlide key={idx}>
                    <Link className={`general-header__main__menu__wrap-item ${path === element?.path && "active"}`} href={element.path}>
                      <div key={idx} className={`general-header__main__menu__item`}>                        
                        {element?.label}
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              return (
                <SwiperSlide key={idx}>
                  <Link
                    className={`general-header__main__menu__wrap-item ${path === element?.path && "active"}`}
                    href={element.path}
                  >
                    <div key={idx} className={`general-header__main__menu__item`}>
                      {element?.label}
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {main.userPageInitializeStatus !== "completed" ? (
          <span className="d-none d-lg-block">
            <Icon.Loading />
          </span>
        ) : (
          <div className="d-none d-lg-block">
            {user === null ? (
              <div className="general-header__main__auth__btn">
                <Button label={translate("Login")} onClick={() => router.push(Routes.login.href)} />
              </div>
            ) : (
              <div className="general-header__main__auth" onClick={() => router.push(Routes.userAccountAssets.href)}>
                <div className="general-header__main__auth__avatar">
                  <img className="general-header__main__auth__avatar__img" src={`/assets/images/rank/${user?.rank}.png`} alt="" />
                </div>
                <div className="general-header__main__auth__info">
                  <div className="general-header__main__auth__info__name">
                    <div className="general-header__main__auth__info__name__text">{user?.firstName}</div>
                    <div className="general-header__main__auth__info__name__indicator">
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11.6673 8.83333L12.1673 8.83333L12.1673 8.33333L12.1673 8.16666L12.334 8.16666L12.834 8.16666L12.834 7.66666L12.834 6.33333L12.834 5.83333L12.334 5.83333L12.1673 5.83333L12.1673 5.66666L12.1673 5.16666L11.6673 5.16666L11.5007 5.16666L11.5007 5L11.5007 4.5L11.0007 4.5L10.834 4.5L10.834 4.33333L10.834 3.83333L10.334 3.83333L10.1673 3.83333L10.1673 3.66666L10.1673 3.16666L9.66732 3.16666L9.50065 3.16666L9.50065 2.99999L9.50065 2.49999L9.00065 2.49999L8.83399 2.49999L8.83399 2.33333L8.83399 1.83333L8.33399 1.83333L8.16732 1.83333L8.16732 1.66666L8.16732 1.16666L7.66732 1.16666L6.33399 1.16666L5.83399 1.16666L5.83399 1.66666L5.83399 1.83333L5.66732 1.83333L5.16732 1.83333L5.16732 2.33333L5.16732 2.49999L5.00065 2.49999L4.50065 2.49999L4.50065 2.99999L4.50065 3.16666L4.33399 3.16666L3.83398 3.16666L3.83398 3.66666L3.83398 3.83333L3.66732 3.83333L3.16732 3.83333L3.16732 4.33333L3.16732 4.49999L3.00065 4.49999L2.50065 4.49999L2.50065 4.99999L2.50065 5.16666L2.33399 5.16666L1.83399 5.16666L1.83399 5.66666L1.83399 5.83333L1.66732 5.83333L1.16732 5.83333L1.16732 6.33333L1.16732 7.66666L1.16732 8.16666L1.66732 8.16666L1.83399 8.16666L1.83399 8.33333L1.83399 8.83333L2.33399 8.83333L3.66732 8.83333L4.16732 8.83333L4.16732 8.33333L4.16732 8.16666L4.33398 8.16666L4.83398 8.16666L4.83398 7.66666L4.83398 7.49999L5.00065 7.49999L5.50065 7.49999L5.50065 6.99999L5.50065 6.83333L5.66732 6.83333L6.16732 6.83333L6.16732 6.33333L6.16732 6.16666L6.33399 6.16666L6.83399 6.16666L6.83399 5.66666L6.83399 5.49999L7.16732 5.49999L7.16732 5.66666L7.16732 6.16666L7.66732 6.16666L7.83398 6.16666L7.83398 6.33333L7.83398 6.83333L8.33398 6.83333L8.50065 6.83333L8.50065 6.99999L8.50065 7.49999L9.00065 7.49999L9.16732 7.49999L9.16732 7.66666L9.16732 8.16666L9.66732 8.16666L9.83398 8.16666L9.83398 8.33333L9.83398 8.83333L10.334 8.83333L11.6673 8.83333Z"
                          fill="#FFD91D"
                          stroke="black"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="general-header__main__auth__dropdown">
                  <div
                    className="general-header__main__auth__dropdown__logout"
                    onClick={() => {
                      UserService.logout();
                    }}
                  >
                    <div className="general-header__main__auth__dropdown__logout__icon">
                      <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8.33331 14.8333L8.33331 15.6666L6.66665 15.6666L6.66665 14.8333L5.83331 14.8333L5.83331 14L4.99998 14L4.99998 13.1666L4.16665 13.1666L4.16665 12.3333L3.33331 12.3333L3.33331 11.5L2.49998 11.5L2.49998 10.6666L1.66665 10.6666L1.66665 9.83329L0.833313 9.83329L0.833313 8.16663L1.66665 8.16663L1.66665 7.33329L2.49998 7.33329L2.49998 6.49996L3.33331 6.49996L3.33331 5.66663L4.16665 5.66663L4.16665 4.83329L4.99998 4.83329L4.99998 3.99996L5.83331 3.99996L5.83331 3.16663L6.66665 3.16663L6.66665 2.33329L8.33331 2.33329L8.33331 3.16663L9.16665 3.16663L9.16665 4.83329L8.33331 4.83329L8.33331 5.66663L7.49998 5.66663L7.49998 6.49996L6.66665 6.49996L6.66665 7.33329L14.1666 7.33329L14.1666 10.6666L6.66665 10.6666L6.66665 11.5L7.49998 11.5L7.49998 12.3333L8.33331 12.3333L8.33331 13.1666L9.16665 13.1666L9.16665 14.8333L8.33331 14.8333Z"
                          fill="white"
                        />
                        <path d="M16.6667 0.666706L16.6667 17.3334L19.1667 17.3334L19.1667 0.666706L16.6667 0.666706Z" fill="white" />
                      </svg>
                    </div>
                    <div className="general-header__main__auth__dropdown__logout__label">Sign out</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default GeneralHeader;
