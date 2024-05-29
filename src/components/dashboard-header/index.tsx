import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Routes } from "@/src/AppRoutes";
import Link from "next/link";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { translate } from "@/src/languages";

const DashboardHeader = (props: any) => {
    const path = usePathname();
    const menuList = [
        // { label: translate("Overview"), path: Routes.overview.href },
        { label: translate("My Wallet"), path: Routes.userAccountAssets.href },
        // {label: translate('Trial Period'), path: Routes.gameExperience.href},
        // { label: translate("Claim"), path: Routes.requestClaim.href },
        { label: translate("Affiliate"), path: Routes.affiliateMarketing.href },
        // { label: translate("Personal Information"), path: Routes.personalInformation.href },
        // { label: translate("2FA Setup"), path: Routes.twoFactorAuthen.href },
        // { label: translate("Withdrawal Code"), path: Routes.withdrawalCode.href },
        // { label: translate("Password"), path: Routes.changePassword.href },
        { label: translate("Private Sale"), path: Routes.privateSale.href },
        { label: translate("Airdrop"), path: Routes.airdrop.href },
    ];
    return (
        <div className={`dashboard-header ${props?.scrolled ? "animated fadeInDown dashboard-header--scrolled" : ""}`}>
            <div className="dashboard-header__main-title">
                <img className="dashboard-header__main-title__img" src="/assets/images/dashboard-image.png" alt="" />
            </div>
            <div className="dashboard-header__horizontal-navbar">
                <Swiper
                    modules={[FreeMode]}
                    slidesPerView={"auto"}
                    freeMode={true}
                    className="dashboard-header__horizontal-navbar__swiper"
                >
                    {menuList?.map((element: any, idx: number) => (
                        <SwiperSlide key={idx}>
                            <Link
                                className="dashboard-header__horizontal-navbar__wrap-item"
                                href={element.path}
                            >
                                <div
                                    key={idx}
                                    className={`dashboard-header__horizontal-navbar__item ${path?.includes(element?.path) ? "active" : ""}`}
                                >
                                    {element?.label}
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
export default DashboardHeader;
