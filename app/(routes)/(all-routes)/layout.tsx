"use client";

import GeneralFooter from "@/src/components/general-footer";
import GeneralHeader from "@/src/components/general-header";
import VerticalNavbar from "@/src/components/vertical-navbar";
import { translate } from "@/src/languages";
import { Button, CreateAlert, onError } from "@/src/modules";
import { UserService } from "@/src/services";
import { NewsService } from "@/src/services/new";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function AllLayout(props: any) {
  const user = useSelector((state: any) => state.user);
  const detailNewsPopup = useSelector((state: any) => state.news.detailNewsPopup);

  useEffect(() => {
    NewsService.getListNews();
  }, []);

  return (
    <div className="all-routes-layout">
      <VerticalNavbar />

      {user?.status === "JUST_REGISTERED" ? (
        <div id="modalPendingVerify" className="modalPendingVerify">
          <h4 style={{ marginBottom: "8px" }}>{translate("MUST_BE_EMAIL_VERIFIED_USER")}</h4>
          <div className="button-wrapper">
            <Button
              style={{ marginRight: "12px" }}
              label={translate("Resend Email")}
              // buttonType="success"
              onClick={async () =>
                UserService.resendMailVerifyAccount()
                  .then(() =>
                    CreateAlert({
                      message: translate("Resend mail successful!"),
                    })
                  )
                  .catch(onError)
              }
            />

            <Button label={translate("Logout")} buttonType="secondary" onClick={async () => UserService.logout()} />
          </div>
        </div>
      ) : (
        <>
          <GeneralHeader />
          <div className="all-routes-layout__children">
            <div className="flex-grow-1 w-100">{props.children}</div>
          </div>
          {/* <GeneralFooter /> */}
        </>
      )}

      {/* {detailNewsPopup?.length > 0 && (
        <PopupNews
          onClose={() => {
            store.dispatch(setDetailNewsPopup([]));
            CookieService.set(ECookieVariable.OPEN_POPUP_NEWS, `${moment().unix()}`);
          }}
          notCloseOutSide={false}
          data={detailNewsPopup?.[0]}
        />
      )} */}
    </div>
  );
}
