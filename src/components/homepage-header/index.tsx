import { Routes } from "@/src/AppRoutes";
import { useTradeCoin } from "@/src/hook";
import { translate } from "@/src/languages";
import { Button, Icon, NumberUtils, ObjectUtils } from "@/src/modules";
import { setIsOpenVerticalNavbarMobile } from "@/src/redux/slices/mainSlice";
import { store } from "@/src/redux/store";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const HomepageHeader = (props: any) => {
  const router: any = useRouter();
  const pathname = usePathname();
  const { coins } = useTradeCoin();

  const user = useSelector((state: any) => state.user);
  const main = useSelector((state: any) => state.main);
  const isOpenVerticalNavbarMobile = useSelector((state: any) => state.main.isOpenVerticalNavbarMobile);

  const walletBalances = useSelector((state: any) => state.userWalletBalances);
  const walletBalance = ObjectUtils.getIn(walletBalances, "data", [], (arr) => arr.find((item: any) => item.code === coins?.[0]?.code));
  const availableAmount: number = +ObjectUtils.getIn(walletBalance, "amount", 0);

  return (
    <div className={`homepage-header ${props?.scrolled ? "animated fadeInDown homepage-header--scrolled" : ""}`}>
      <div className="homepage-header__left">
        <div className="homepage-header__left__main-welcome">
          {pathname?.startsWith("/games") ? (
            <div className="nav__search">
              <div className="nav__search__icon">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.8321 4C7.96613 4 4.83212 7.13401 4.83212 11C4.83212 14.866 7.96613 18 11.8321 18C15.6981 18 18.8321 14.866 18.8321 11C18.8321 7.13401 15.6981 4 11.8321 4ZM2.83212 11C2.83212 6.02944 6.86156 2 11.8321 2C16.8027 2 20.8321 6.02944 20.8321 11C20.8321 15.9706 16.8027 20 11.8321 20C6.86156 20 2.83212 15.9706 2.83212 11Z"
                    fill="white"
                    fillOpacity="0.44"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.7735 15.9413C17.164 15.5508 17.7971 15.5508 18.1877 15.9413L22.5377 20.2913C22.9282 20.6819 22.9282 21.315 22.5377 21.7055C22.1471 22.0961 21.514 22.0961 21.1235 21.7055L16.7735 17.3555C16.3829 16.965 16.3829 16.3319 16.7735 15.9413Z"
                    fill="white"
                    fillOpacity="0.44"
                  />
                </svg>
              </div>
              <div className="nav__search__input">
                <input type="text" placeholder={translate("Search game")} />
              </div>
            </div>
          ) : user ? (
            <div className="d-flex align-items-center">
              <span className="mr8">{`${translate("Welcome")}, ${user?.firstName.toUpperCase()}`}</span>
              <Image
                unoptimized
                style={{ borderRadius: "50%", width: "45px", height: "45px", objectFit: "contain", objectPosition: "center center" }}
                src={`/images/level${user?.rank}.png`}
                alt="rank"
                width={45}
                height={45}
              />
            </div>
          ) : (
            <span
              dangerouslySetInnerHTML={{
                __html: translate("Welcome to <strong>{appName}</strong>", { appName: process.env["NEXT_PUBLIC_MY_APP_NAME"] }),
              }}
            ></span>
          )}
        </div>
        {isOpenVerticalNavbarMobile === false && (
          <div className="homepage-header__left__menu-mobile" onClick={() => store.dispatch(setIsOpenVerticalNavbarMobile(true))}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" fill="#FFF" />
              <path d="M4 6H20M4 12H20M4 18H20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        {isOpenVerticalNavbarMobile === true && (
          <div className="homepage-header__left__menu-mobile-close" onClick={() => store.dispatch(setIsOpenVerticalNavbarMobile(false))}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18L18 6M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        <div className="homepage-header__left__logo-mobile" onClick={() => router.push(Routes.home.href, { scroll: true })}>
          <img src="/assets/images/main-logo.png" alt="" />
        </div>
      </div>
      <div className="homepage-header__right">
        {main.userPageInitializeStatus !== "completed" ? (
          <Icon.Loading />
        ) : (
          <>
            {user === null ? (
              <div className="homepage-header__right__auth-container">
                <Button
                  className="homepage-header__right__auth-container__button homepage-header__right__auth-container__login-button"
                  label={translate("Login")}
                  buttonType="primary"
                  onClick={() => router.push(Routes.login.href)}
                />
                <Button
                  className="homepage-header__right__auth-container__button homepage-header__right__auth-container__signup-button"
                  label={translate("SIGN UP")}
                  buttonType="primary"
                  onClick={() => router.push(Routes.register.href)}
                />
              </div>
            ) : (
              <div className="homepage-header__right__authenticated" onClick={() => router.push(Routes.userAccountAssets.href)}>
                <div className="homepage-header__right__authenticated__user">
                  <div className="homepage-header__right__authenticated__user__info">
                    <div className="homepage-header__right__authenticated__user__info__name">{user?.firstName}</div>
                    <div className="homepage-header__right__authenticated__user__info__balance">
                      {NumberUtils.toFormatNumber(availableAmount, 4)} USD
                    </div>
                  </div>
                  <div className="homepage-header__right__authenticated__user__avatar">
                    <Image unoptimized width={45} height={45} src={`/images/level${user?.rank}.png`} alt="rank" />
                  </div>
                </div>
                <div className="homepage-header__right__authenticated__indicator">
                  <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3.86602 4.5C3.48112 5.16667 2.51887 5.16667 2.13397 4.5L0.401923 1.5C0.0170226 0.833333 0.498148 5.6841e-07 1.26795 5.01112e-07L4.73205 1.9827e-07C5.50185 1.30972e-07 5.98298 0.833333 5.59808 1.5L3.86602 4.5Z"
                      fill="#2A2A2A"
                    />
                  </svg>
                </div>
                {/* <div className="homepage-header__right__authenticated__dropdown">
                    <div className="homepage-header__right__authenticated__dropdown__group">
                      <div className="homepage-header__right__authenticated__dropdown__item">Menu</div>
                    </div>
                    <div className="homepage-header__right__authenticated__dropdown__group">
                      <div className="homepage-header__right__authenticated__dropdown__item" onClick={() => UserService.logout()}>
                        {translate("Logout")}
                      </div>
                    </div>
                  </div> */}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default HomepageHeader;
