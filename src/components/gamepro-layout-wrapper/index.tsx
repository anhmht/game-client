import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useRef, useState } from "react";
import { scroller } from "react-scroll";
import { Routes } from "../../AppRoutes";
import { useDeviceType, useTradeCoin } from "../../hook";
import { translate } from "../../languages";
import { NumberUtils, ObjectUtils } from "../../modules";
import { MainService, TradeService } from "../../services";
import { ButtonSelectLanguage } from "../button-select-language";
import { Icon } from "../icon";
import { LandBot } from "../landbot";
import { MobiNav } from "./mobiNav";
import { MobiNav2 } from "./mobiNav2";
import { useSelector } from "react-redux";

export const GameProLayoutWrapper = (Component: FC<any>) => (props: any) => {
  const user = useSelector((state:any) => state.user);
  const deviceType = useDeviceType();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpen2, setIsMenuOpen2] = useState(false);
  const [autoChangeTabsGame, setAutoChangeTabsGame] = useState<any>(0);
  const router = useRouter();
  const { coins } = useTradeCoin();
  const walletBalances = useSelector((state:any) => state.userWalletBalances);

  const [isOpenLiveChat, setIsOpenLiveChat] = useState<"minimized" | "maximized" | "hidden" | undefined>("minimized");
  const [headerHeight, setHeaderHeight] = useState<any>(null);

  const headerTop = useRef<any>(null);
  const headerBottom = useRef<any>(null);
  const header = useRef<any>(null);

  const listMenu: any = [
    // {
    //   name: "Live Casino",
    //   path: "allGame",
    // },
    // {
    //   name: "Slot Game",
    //   path: "allGame",
    //   code: 7,
    // },
    // {
    //   name: "Sports Bet",
    //   path: "allGame",
    //   code: 8,
    // },
    // {
    //   name: "Game Provider",
    //   path: "gameProvider",
    // },
    {
      name: "White Paper",
      href: " https://whitepaper.BEZON.com",
      path: "/",
    },
    // {
    //   name: "Affiliate Program",
    //   href: "https://whitepaper.BEZON.com/affiliate-program",
    //   path: "/",
    // },
  ];

  const listMenu2: any = [
    {
      name: "Promotion",
      path: "/",
      href: "https://whitepaper.BEZON.com/promotion",
    },
    {
      name: "Slot Game",
      path: "allGame",
      code: 7,
    },
    {
      name: "Live Baccarat",
      path: "allGame",
      code: 1,
    },
    {
      name: "Live Roulette",
      path: "allGame",
      code: 2,
    },
    {
      name: "Live Blackjack",
      path: "allGame",
      code: 3,
    },
    {
      name: "Live Dragontiger",
      path: "allGame",
      code: 4,
    },
    {
      name: "Live Game Show",
      path: "allGame",
      code: 9,
    },
    {
      name: "Provably Fair",
      path: "/",
      href: "https://whitepaper.BEZON.com/provably-fair",
    },
    {
      name: "Live Support",
    },
    {
      name: "Community",
      path: "/",
      href: "https://whitepaper.BEZON.com/official-link-of-BEZON.com",
    },
  ];

  const userPageInitializeStatus = useSelector((state:any) => state.main.userPageInitializeStatus);

  const renderNavLink = () => {
    return listMenu.map((item: any, index: number) => {
      return (
        <li className="nav-item" key={index}>
          <a
            className="nav-link"
            rel="nofollow"
            onClick={() => {
              scroller.scrollTo(item?.path, {
                // duration: 800,
                offset: -92,
                delay: 0,
                // smooth: "easeOutQuart",
              });
              setAutoChangeTabsGame(item?.code);
              if (item?.name === "Live Support") setIsOpenLiveChat((prev) => (prev === "minimized" ? "maximized" : "minimized"));
            }}
            href={item?.href}
          >
            {translate(`${item?.name}`)}
          </a>
        </li>
      );
    });
  };

  useEffect(() => {
    if (userPageInitializeStatus === "pending") MainService.initialUserPage();
  }, [user, userPageInitializeStatus]);

  useEffect(() => {
    setHeaderHeight(header?.current?.clientHeight);
  }, [header]);

  useEffect(() => {
    if (router.asPath !== "" && router.asPath === "/allGame")
      setTimeout(() => {
        scroller.scrollTo("allGame", {
          // duration: 800,
          offset: -92,
          delay: 0,
          // smooth: "easeOutQuart",
        });
      }, 500);
  }, [router]);

  // useEffect(() => {
  //   if (deviceType === "Desktop") {
  //     const height = headerTop?.current?.offsetHeight;
  //     const handleScroll = () => {
  //       if (window.scrollY > height) {
  //         header.current.style.position = "fixed";
  //         headerTop.current.style.display = "none";
  //         headerBottom.current.style.background = "#161616";
  //       } else if (window.scrollY <= height) {
  //         header.current.style.position = "absolute";
  //         headerTop.current.style.display = "block";
  //         headerBottom.current.style.background = "transparent";
  //       }
  //     };
  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }
  // }, []);

  return (
    <>
      {/* Header Start */}
      {deviceType === "Desktop" ? (
        <div className="header" ref={header}>
          {/* <div className="header-top" ref={headerTop}>
            <div className="container">
              <div className="d-none d-sm-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <div className="header-support d-flex">
                    <Icon.HeaderPhone />
                    <span className="header-support__text">{translate("Support")}</span>
                  </div>
                  <div className="header-icon d-flex justify-content-around">
                    <Icon.Telegram />
                    <Icon.Message />
                    <Icon.Twitter />
                    <Icon.Facebook />
                    <Icon.Intagrams />
                    <Icon.EighteenPlus />
                  </div>
                </div>
                <div className="header-contact d-flex">
                  <ButtonSelectLanguage />
                  <div className="header-contact__icon">
                    <Icon.Ring />
                  </div>
                  <Icon.Letter />
                </div>
              </div>
            </div>
          </div> */}

          <div className="header-bottom" ref={headerBottom}>
            <div className="container-fluid">
              <div className="d-flex justify-content-between align-items-center">
                <nav className="d-none d-sm-flex navbar navbar-expand-lg">
                  <div className="d-none d-sm-flex justify-content-center align-items-center">
                    <Link href={Routes.homePage.href}>
                      <img className="logo" src="/assets/images/gamepro/Logo.png" alt="Logo" />
                    </Link>
                  </div>

                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">{renderNavLink()}</ul>
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => window.open("https://t.me/SpBezon", "_blank")}
                    >
                      <img width={24} height={24} src="/assets/images/social-media-telegram-blue.png" alt="" />
                    </div>
                  </div>
                </nav>
                <div className="d-none d-sm-flex nav-btn align-items-center">
                  {!user ? (
                    <>
                      <button className="nav-btn__wallet deposit mr16" onClick={() => Routes.login.push()}>
                        <Icon.Wallet />
                        <span>{translate("Deposit")}</span>
                      </button>
                      <button className="nav-btn__wallet withdraw mr16" onClick={() => Routes.login.push()}>
                        <Icon.Wallet />
                        <span>{translate("Withdraw")}</span>
                      </button>
                      <button onClick={() => Routes.login.push()} className="nav-btn__white">
                        {translate("Login")}
                      </button>
                      <button onClick={() => Routes.register.push()} className="nav-btn__yellow">
                        {translate("Join now")}
                      </button>
                    </>
                  ) : (
                    <>
                      {coins.reverse().map((item: any) => (
                        <div className="wallet-item">
                          <div className="d-flex align-items-center">
                            <img className="coinLogo" src={TradeService.getCoinImageSrc(item?.code)} alt="" />
                            <span className="ml3 text-white">{item?.name}</span>
                          </div>
                          <div className="text-white wallet-item__value">
                            {NumberUtils.toFormatNumber(
                              +ObjectUtils.getIn(
                                ObjectUtils.getIn(walletBalances, "data", [], (arr) => arr.find((el: any) => el.code === item?.code)),
                                "amount",
                                0
                              ),
                              4
                            )}
                          </div>
                        </div>
                      ))}

                      <button className="nav-btn__wallet deposit mr16" onClick={() => Routes.userDeposit.push()}>
                        <Icon.Wallet />
                        <span>{translate("Deposit")}</span>
                      </button>
                      <button className="nav-btn__wallet withdraw mr16" onClick={() => Routes.userWithdraw.push()}>
                        <Icon.Wallet />
                        <span>{translate("Withdraw")}</span>
                      </button>

                      <button className="nav-btn__white m-0" onClick={() => Routes.userDashboard.push()}>
                        {translate("Dashboard")}
                      </button>
                    </>
                  )}
                  <div
                    style={{
                      border: "1px solid #fff",
                      width: "fit-content",
                      borderRadius: "8px",
                      marginLeft: "16px",
                    }}
                  >
                    <ButtonSelectLanguage isShowAll isNotArrowDown />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="home-navigator">
          <header>
            <div className="iconMenu">
              <div className="iconMenu__left" onClick={() => setIsMenuOpen2(true)}>
                <Icon.Menu />
              </div>

              <Link href={Routes.homePage.href}>
                <img className="logo" src="/assets/images/gamepro/Logo.png" alt="" />
              </Link>

              <div className="d-flex align-items-center">
                <div
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => window.open("https://t.me/SpBezon", "_blank")}
                >
                  <img width={24} height={24} src="/assets/images/social-media-telegram-blue.png" alt="" />
                </div>

                <ButtonSelectLanguage isShowAll isNotArrowDown />

                <div className="iconMenu__right" onClick={() => setIsMenuOpen(true)}>
                  <Icon.Menu2 />
                </div>
              </div>
            </div>
            {isMenuOpen ? <MobiNav listMenu={listMenu} onClose={() => setIsMenuOpen(false)} /> : null}
            {isMenuOpen2 ? (
              <MobiNav2 listMenu={listMenu2} onClose={() => setIsMenuOpen2(false)} getAutoChangeTabsGame={(value) => setAutoChangeTabsGame(value)} />
            ) : null}
          </header>
        </div>
      )}

      {/* Header End */}

      <Component
        {...props}
        headerHeight={headerHeight}
        autoChangeTabsGameMobi={autoChangeTabsGame}
        handleOpenLive={() => setIsOpenLiveChat((prev) => (prev === "minimized" ? "maximized" : "minimized"))}
      />

      <LandBot title={"Support Chat"} className="support-chat"></LandBot>

      {/* Footer Start */}
      <footer className="footer">
        <div className="primary-title">{translate("BEST BITCOIN CASINO EXPERIENCE")}</div>
        <div className="secondary-title">
          {translate(
            "Bitcoin is the foremost cryptocurrency, with hundreds of thousands of businesses from around the globe accepting it as a method of payment"
          )}
          . <span className="read-more">{translate("Read more")}</span>
        </div>
        <div className="social-media">
          <div className="social-media__item" onClick={() => window.open("https://t.me/SpBezon", "_blank")}>
            <img className="social-media__item__img" src="/assets/images/social-media-telegram.png" alt="" />
          </div>
          <div className="social-media__item">
            <img className="social-media__item__img" src="/assets/images/social-media-facebook.svg" alt="" />
          </div>
          <div className="social-media__item">
            <img className="social-media__item__img" src="/assets/images/social-media-twitter.svg" alt="" />
          </div>
          <div className="social-media__item">
            <img className="social-media__item__img" src="/assets/images/social-media-instagram.svg" alt="" />
          </div>
          <div className="social-media__item">
            <img className="social-media__item__img" src="/assets/images/social-media-vimeo.svg" alt="" />
          </div>
        </div>
        <div className="branch-container">
          <div className="branch">
            <div className="branch__item">
              <img className="branch__item__img" src="/assets/images/branch-footer-1.svg" alt="" />
            </div>
            <div className="branch__item">
              <img className="branch__item__img" src="/assets/images/branch-footer-2.svg" alt="" />
            </div>
            <div className="branch__item">
              <img className="branch__item__img" src="/assets/images/branch-footer-3.svg" alt="" />
            </div>
            <div className="branch__item">
              <img className="branch__item__img" src="/assets/images/branch-footer-4.svg" alt="" />
            </div>
            <div className="branch__item">
              <img className="branch__item__img" src="/assets/images/branch-footer-5.svg" alt="" />
            </div>
            <div className="branch__item">
              <img className="branch__item__img" src="/assets/images/branch-footer-6.svg" alt="" />
            </div>
            <div className="branch__item">
              <img className="branch__item__img" src="/assets/images/branch-footer-7.svg" alt="" />
            </div>
            <div className="branch__item">
              <img className="branch__item__img" src="/assets/images/branch-footer-8.svg" alt="" />
            </div>
            <div className="branch__item">
              <img className="branch__item__img" src="/assets/images/branch-footer-9.svg" alt="" />
            </div>
            <div className="branch__item">
              <img className="branch__item__img" src="/assets/images/branch-footer-10.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="copyright__top">
            <div className="copyright__top__left">{translate("Copyright © 2023 BEZON. All Rights Reserved.")}</div>
            <div className="copyright__top__right">
              <div className="copyright__top__right__text">
                <div className="copyright__top__right__text__item">{translate("Affiliate Program")}</div>
                <div className="copyright__top__right__text__item">{translate("Terms & Conditions")}</div>
                <div className="copyright__top__right__text__item">{translate("Bonus Terms & Conditions")}</div>
              </div>
              <div className="copyright__top__right__icon">
                <div className="copyright__top__right__icon__item">
                  <img className="copyright__top__right__icon__item__img" src="/assets/images/copyright-icon-1.png" alt="" />
                </div>
                <div className="copyright__top__right__icon__item">
                  <img className="copyright__top__right__icon__item__img" src="/assets/images/copyright-icon-2.png" alt="" />
                </div>
                <div className="copyright__top__right__icon__item">
                  <img className="copyright__top__right__icon__item__img" src="/assets/images/copyright-icon-3.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="copyright__bottom">
            {translate("content-footer")}
            {/* <span className="contact">contact@BEZON.com</span> */}
          </div>
        </div>
      </footer>
      {/* Footer End */}
    </>
  );
};
