import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Routes } from "../../AppRoutes";
import { ButtonSelectLanguage } from "../button-select-language";
import { Icon } from "../icon";
import { MainService } from "../../services";
import { useDeviceType } from "../../hook";
import { LiveChat } from '../livechat';
import { useSelector } from "react-redux";

export const HomepageLayoutWrapper = (Component: FC<any>) => (props: any) => {
    const [active, setActive] = useState<any>(false);
    const deviceType = useDeviceType();
    const listenScrollEvent = (event: any) => {
        window.scrollY > 60 ? setActive(true) : setActive(false);
    };
    const userPageInitializeStatus = useSelector(
        (state:any) => state.main.userPageInitializeStatus
    );
    const user = useSelector((state:any) => state.user);
    useEffect(() => {
        if (userPageInitializeStatus === "pending")
            MainService.initialUserPage();
    }, [user, userPageInitializeStatus]);

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => window.removeEventListener("scroll", listenScrollEvent);
    }, []);

    let handleThirdPartyLogin = () => {
        window.open(`${process.env['NEXT_PUBLIC_SITE_SERVICE_URL']}/platform/login.html?appKey=${process.env['NEXT_PUBLIC_SITE_APP_KEY']}&redirectUrl=${process.env['NEXT_PUBLIC_PUBLIC_URL']}&lang=en_US`,"_self");
    }

    return (
        <>
            {/* [BEGIN] - Header */}
            <header
                style={{
                    background: active ? "rgba(0, 0, 0, 0.75)" : "transparent",
                }}
            >
                {/* <LiveChat title={"www.livechatinc.com"} className="LiveChat"></LiveChat> */}

                <div className="header-container container">
                    <div className="header-container__left">
                        <Link href={Routes.homePage.href}>
                            <div className="header-container__icon">
                                <img
                                    src="/assets/images/metagames-logo.png"
                                    alt=""
                                    onClick={() => Routes.homePage.push()}
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="header-container__right">
                        <div className="header-container__SITE-logo">
                            <img src={(deviceType == "Desktop") ? "/assets/images/SITE-logo.png": "/assets/images/SITE-mobile-logo.png"} alt="" onClick={()=>window.open(process.env['NEXT_PUBLIC_SITE_URL'],"_self")} />
                        </div>
                        {!user ? (
                            <div className="header-container__account-button">
                                {/* <button className="account-button__login" onClick={() => Routes.login.push()}>Login</button>
                                <button className="account-button__register" onClick={() => Routes.register.push()}>Register Now</button> */}
                                <button className="btn account-button__3rd-login" onClick={()=>handleThirdPartyLogin()}>Login</button>
                            </div>
                        ) : (
                            <div className="header-container__account-button">
                                <button className="account-button__dashboard" onClick={() => Routes.userDashboard.push()}>Dashboard</button>
                            </div>
                        )}

                        {/* <div className="header-container__language-bar">
                            <ButtonSelectLanguage isShowAll isNotArrowDown />
                        </div> */}
                    </div>
                </div>
            </header>
            {/* [END] - Header */}
            <Component {...props} />
            {/* [BEGIN] - Footer */}
            <footer>
                <div className="footer-container">
                    <div className="footer-container__first-section">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div
                                    className="col-12 col-lg-8"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                >
                                    <div className="main-tab">
                                        <Link href={Routes.homePage.href}>
                                            <div className="main-tab__title">
                                                <img
                                                    src="/assets/images/metagames-logo-footer.png"
                                                    alt=""
                                                />
                                            </div>
                                        </Link>
                                        <div className="main-tab__description">
                                            {process.env['NEXT_PUBLIC_MY_APP_NAME']} ecosystem of 70 providers with<br/>more than 4000+ games
                                        </div>
                                        <div className="main-tab__social-link">
                                            <div className="social-link__instagram">
                                                <Icon.InstagramIcon />
                                            </div>
                                            <div className="social-link__linkedin">
                                                <Icon.LinkedInIcon />
                                            </div>
                                            <div className="social-link__facebook">
                                                <Icon.FacebookIcon />
                                            </div>
                                            <div className="social-link__twitter">
                                                <Icon.TwitterIcon />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-12 col-lg-4"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                >
                                    <div className="contact-info-tab">
                                        <div className="contact-info-tab__title">
                                            {"Contact Info"}
                                        </div>
                                        <div className="contact-info-tab__items">
                                            <div className="item">
                                                <div className="item__icon">
                                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M17.6322 13.7003C16.4585 13.7003 15.306 13.5034 14.214 13.1163C13.6789 12.9205 13.021 13.1001 12.6944 13.4599L10.5389 15.2051C8.03913 13.7739 6.49931 12.1229 5.18314 9.4619L6.76245 7.21022C7.17277 6.77072 7.31994 6.12871 7.14361 5.52633C6.78117 4.34887 6.59706 3.11342 6.59706 1.85404C6.59711 0.944256 5.90702 0.204102 5.05883 0.204102H1.53827C0.690084 0.204102 0 0.944256 0 1.85399C0 12.2819 7.90968 20.7654 17.6322 20.7654C18.4803 20.7654 19.1704 20.0253 19.1704 19.1156V15.3501C19.1704 14.4404 18.4803 13.7003 17.6322 13.7003Z" fill="black"/>
                                                    </svg>
                                                </div>
                                                <div className="item__label">+088 (246) 642-27-10</div>
                                            </div>
                                            <div className="item">
                                                <div className="item__icon">
                                                    <svg width="23" height="14" viewBox="0 0 23 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M22.2566 0.944237C22.0903 0.873549 21.8945 0.89821 21.7561 1.00617C18.3271 3.65946 13.9508 7.06044 12.5739 8.19293C11.8011 8.82968 10.7286 8.82968 9.95397 8.19209C8.48634 6.98509 3.57188 3.17163 0.772758 1.00613C0.633404 0.89817 0.437245 0.874353 0.272238 0.944197C0.106352 1.01452 0 1.16598 0 1.3329V12.1068C0 13.0519 0.841972 13.8205 1.87742 13.8205H20.6515C21.6869 13.8205 22.5289 13.0519 22.5289 12.1068V1.3329C22.5289 1.16598 22.4225 1.01412 22.2566 0.944237Z" fill="black"/>
                                                    </svg>
                                                </div>
                                                <div className="item__label">example@gmail.com</div>
                                            </div>
                                            <div className="item">
                                                <div className="item__icon">
                                                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12.0765 0.998047H12.21C13.443 1.00255 19.6905 1.04755 21.375 1.50055C21.8842 1.6388 22.3483 1.90828 22.7207 2.28206C23.0932 2.65584 23.361 3.12082 23.4975 3.63055C23.649 4.20055 23.7555 4.95505 23.8275 5.73355L23.8425 5.88955L23.8755 6.27955L23.8875 6.43555C23.985 7.80655 23.997 9.09055 23.9985 9.37105V9.48355C23.997 9.77455 23.9835 11.1455 23.8755 12.5735L23.8635 12.731L23.85 12.887C23.775 13.745 23.664 14.597 23.4975 15.224C23.3615 15.734 23.0938 16.1992 22.7212 16.573C22.3487 16.9469 21.8844 17.2162 21.375 17.354C19.635 17.822 13.0215 17.855 12.105 17.8565H11.892C11.4285 17.8565 9.5115 17.8475 7.5015 17.7785L7.2465 17.7695L7.116 17.7635L6.8595 17.753L6.603 17.7425C4.938 17.669 3.3525 17.5505 2.622 17.3525C2.11273 17.2148 1.6486 16.9457 1.27609 16.5722C0.903575 16.1986 0.63577 15.7337 0.4995 15.224C0.333 14.5985 0.222 13.745 0.147 12.887L0.135 12.7295L0.123 12.5735C0.0489714 11.5571 0.0079498 10.5386 0 9.51955L0 9.33505C0.003 9.01255 0.015 7.89805 0.096 6.66805L0.1065 6.51355L0.111 6.43555L0.123 6.27955L0.156 5.88955L0.171 5.73355C0.243 4.95505 0.3495 4.19905 0.501 3.63055C0.63704 3.12062 0.904743 2.65541 1.27727 2.28157C1.6498 1.90773 2.11405 1.63839 2.6235 1.50055C3.354 1.30555 4.9395 1.18555 6.6045 1.11055L6.8595 1.10005L7.1175 1.09105L7.2465 1.08655L7.503 1.07605C8.93056 1.03011 10.3587 1.00461 11.787 0.999547H12.0765V0.998047ZM9.6 5.81305V13.04L15.8355 9.42805L9.6 5.81305Z" fill="black"/>
                                                    </svg>
                                                </div>
                                                <div className="item__label">https://youtu.be/2D6qaZTOAXs</div>
                                            </div>
                                            <div className="item">
                                                <div className="item__icon">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M24 12C24 18.627 18.627 24 12 24C5.373 24 0 18.627 0 12C0 5.373 5.373 0 12 0C18.627 0 24 5.373 24 12ZM12.43 8.859C11.263 9.344 8.93 10.349 5.432 11.873C4.864 12.099 4.566 12.32 4.539 12.536C4.493 12.902 4.951 13.046 5.573 13.241C5.658 13.268 5.746 13.295 5.836 13.325C6.449 13.524 7.273 13.757 7.701 13.766C8.09 13.774 8.524 13.614 9.003 13.286C12.271 11.079 13.958 9.964 14.064 9.94C14.139 9.923 14.243 9.901 14.313 9.964C14.383 10.026 14.376 10.144 14.369 10.176C14.323 10.369 12.529 12.038 11.599 12.902C11.309 13.171 11.104 13.362 11.062 13.406C10.968 13.503 10.872 13.596 10.78 13.685C10.21 14.233 9.784 14.645 10.804 15.317C11.294 15.64 11.686 15.907 12.077 16.173C12.504 16.464 12.93 16.754 13.482 17.116C13.622 17.208 13.756 17.303 13.887 17.396C14.384 17.751 14.831 18.069 15.383 18.019C15.703 17.989 16.035 17.688 16.203 16.789C16.6 14.663 17.382 10.059 17.563 8.161C17.574 8.00341 17.5673 7.84509 17.543 7.689C17.5285 7.56293 17.4671 7.44693 17.371 7.364C17.228 7.247 17.006 7.222 16.906 7.224C16.455 7.232 15.763 7.473 12.43 8.859Z" fill="black"/>
                                                    </svg>
                                                </div>
                                                <div className="item__label">https://telegram.me/group/af5</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-container__second-section">
                        Copyright © 2022 {process.env['NEXT_PUBLIC_MY_APP_NAME']}. All rights reserved.
                    </div>
                </div>
            </footer>
            {/* [END] - Footer */}
        </>
    );
};
