import Link from "next/link";
import { Routes } from "../../../AppRoutes";
import { translate } from "../../../languages";
import { usePathname } from "next/navigation";

type Props = {
  windowWidth?: number;
};

export const Footer = ({ windowWidth }: Props) => {
  const pathname = usePathname();

  return (
    <footer className={`newFooter ${windowWidth && windowWidth < 576 && pathname !== "/" && "pdb50"}`}>
      <div className="row align-items-center justify-content-between newFooter-top">
        <div className="col-12 col-sm-6 newFooter-top_text">
          <Link href={Routes.homePage.href}>
            <img width={104} height={40} src="/assets/images/gamepro/Logo.png" alt="Logo" />
          </Link>
          <div
            className="mt16"
            style={{
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            {translate("content-footer").split(". ")?.[0]}
          </div>
        </div>
        <div className="text-white col-12 col-sm-4 d-flex justify-content-start justify-content-sm-end">
          <div>
            {translate("follow_us")}:
            <div className="social-media mt16">
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
          </div>
        </div>
      </div>
      <div
        style={{
          background: "#020202;",
        }}
      >
        <div className="newFooter-bottom">
          <div className="d-block d-sm-flex align-items-center justify-content-between mb16">
            <div className="newFooter-title">
              <span>{translate("BEST BITCOIN CASINO EXPERIENCE")}</span>
              <a href="#" className="ml6">
                {translate("Read more")}
              </a>
            </div>
            <div className="copyright__icon">
              <div className="copyright__icon__item">
                <img className="copyright__icon__item__img" src="/assets/images/copyright-icon-1.png" alt="" />
              </div>
              <div className="copyright__icon__item">
                <img className="copyright__icon__item__img" src="/assets/images/copyright-icon-2.png" alt="" />
              </div>
              <div className="copyright__icon__item">
                <img className="copyright__icon__item__img" src="/assets/images/copyright-icon-3.png" alt="" />
              </div>
            </div>
          </div>
          <div
            style={{
              color: "rgba(255, 255, 255,0.5)",
            }}
          >
            {translate("content-footer")}
          </div>
        </div>
      </div>
      <div className="newFooter-copy text-white">{translate("Copyright © 2023 BEZON. All Rights Reserved.")}</div>
    </footer>
  );
};
