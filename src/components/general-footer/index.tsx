import { Routes } from "@/src/AppRoutes";
import { translate } from "@/src/languages";
import { CreateAlert, EAlertType } from "@/src/modules";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CopyToClipboard from "react-copy-to-clipboard";
import { TrademarkCompnt } from "../trademark-compnt";

const GeneralFooter = () => {
  const router: any = useRouter();

  return (<>
    <TrademarkCompnt />
    <div className="homepage-footer">
      <div className="homepage-footer__main">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="homepage-footer__main__company">
              <div className="homepage-footer__main__company__logo" onClick={() => router.push(Routes.home.href, { scroll: true })}>
                <img src="/assets/images/main-logo.png" alt="" />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-2">
            <div className="homepage-footer__main__menu1">
              <Link href={"about/about-us"} scroll className="homepage-footer__main__menu1__item">
                About us
              </Link>
              <div
                className="homepage-footer__main__menu1__item"
                onClick={() => {
                  window.open("/white-paper", "_blank");
                }}
              >
                {translate("White Paper")}
              </div>
              <div className="homepage-footer__main__menu1__item">
                Contact:{" "}
                <CopyToClipboard
                  text={"support@memelotto.io"}
                  onCopy={() => {
                    CreateAlert({
                      message: translate("Copied Successful"),
                      type: EAlertType.SUCCESS,
                    });
                  }}
                >
                  <span>support@memelotto.io</span>
                </CopyToClipboard>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-2">
            <div className="homepage-footer__main__menu2">
              <Link href={"/about/terms-of-use"} scroll className="homepage-footer__main__menu2__item">
                Terms of Use
              </Link>
              <Link href={"/about/fire-sale-agreement"} scroll className="homepage-footer__main__menu2__item">
                Terms for Fire Sale
              </Link>
              <Link href={"/about/terms-and-conditions"} scroll className="homepage-footer__main__menu2__item">
                Terms for Airdrop
              </Link>
              <Link href={"/about/privacy-policy"} scroll className="homepage-footer__main__menu2__item">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="col-12 col-lg-2">
            <div className="homepage-footer__main__social-network">
              <div
                className="homepage-footer__main__social-network__item"
                onClick={() => window.open("https://www.youtube.com/@Memelotto_official", "_blank")}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.334 5.83337V4.16671H16.6673V3.33337H3.33398V4.16671H1.66732V5.83337H0.833984V14.1667H1.66732V15.8334H3.33398V16.6667H16.6673V15.8334H18.334V14.1667H19.1673V5.83337H18.334ZM10.0007 12.5H8.33398V7.50004H10.0007V8.33337H11.6673V9.16671H13.334V10.8334H11.6673V11.6667H10.0007V12.5Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div
                className="homepage-footer__main__social-network__item"
                onClick={() => window.open("https://www.facebook.com/memelotto", "_blank")}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19.1673 7.50004V12.5H18.334V14.1667H17.5006V15.8334H16.6673V16.6667H15.834V17.5H14.1673V18.3334H12.5007V19.1667H11.6673V12.5H13.334V11.6667H14.1673V10H11.6673V7.50004H12.5007V6.66671H14.1673V4.16671H10.834V5.00004H9.16732V6.66671H8.33398V10H5.83398V12.5H8.33398V19.1667H7.50065V18.3334H5.83398V17.5H4.16732V16.6667H3.33398V15.8334H2.50065V14.1667H1.66732V12.5H0.833984V7.50004H1.66732V5.83337H2.50065V4.16671H3.33398V3.33337H4.16732V2.50004H5.83398V1.66671H7.50065V0.833374H12.5007V1.66671H14.1673V2.50004H15.834V3.33337H16.6673V4.16671H17.5006V5.83337H18.334V7.50004H19.1673Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div
                className="homepage-footer__main__social-network__item"
                onClick={() => window.open("https://www.instagram.com/memelott_official/", "_blank")}
              >
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
              <div className="homepage-footer__main__social-network__item" onClick={() => window.open("https://twitter.com/MemeLotto_", "_blank")}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.9167 7.33329V6.49996H12.75V5.66663H13.5833V4.83329H14.4167V3.99996H15.25V3.16663H16.0833V2.33329H16.9167V1.49996H17.75V0.666626H15.25V1.49996H14.4167V2.33329H13.5833V3.16663H12.75V3.99996H11.9167V4.83329H11.0833V5.66663H9.41667V4.83329H8.58333V3.99996H7.75V2.33329H6.91667V1.49996H6.08333V0.666626H0.25V1.49996H1.08333V2.33329H1.91667V3.16663H2.75V4.83329H3.58333V5.66663H4.41667V7.33329H5.25V8.16663H6.08333V9.83329H6.91667V10.6666H6.08333V11.5H5.25V12.3333H4.41667V13.1666H3.58333V14H2.75V14.8333H1.91667V15.6666H1.08333V16.5H0.25V17.3333H2.75V16.5H3.58333V15.6666H4.41667V14.8333H5.25V14H6.08333V13.1666H6.91667V12.3333H8.58333V13.1666H9.41667V14H10.25V15.6666H11.0833V16.5H11.9167V17.3333H17.75V16.5H16.9167V15.6666H16.0833V14.8333H15.25V13.1666H14.4167V12.3333H13.5833V10.6666H12.75V9.83329H11.9167V8.16663H11.0833V7.33329H11.9167ZM11.9167 10.6666V11.5H12.75V13.1666H13.5833V14H14.4167V15.6666H11.9167V14H11.0833V13.1666H10.25V12.3333H9.41667V10.6666H8.58333V9.83329H7.75V8.99996H6.91667V7.33329H6.08333V6.49996H5.25V4.83329H4.41667V3.99996H3.58333V2.33329H6.08333V3.16663H6.91667V4.83329H7.75V5.66663H8.58333V7.33329H9.41667V8.16663H10.25V8.99996H11.0833V10.6666H11.9167Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="homepage-footer__copyright">© 2024 MemeLotto. All Rights Reserved.</div>
    </div>
  </>);
};
export default GeneralFooter;
