"use client";
import { MainService } from "@/src/services";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AlertWin, AlertWinCustom, Noti } from "@/src/components";
import { DepositModal, DepositModalContext, WithdrawalModal, WithdrawalModalContext } from "@/src/components";
import { useParams, usePathname } from "next/navigation";
import { store } from "@/src/redux/store";
import { setIsOpenVerticalNavbarMobile } from "@/src/redux/slices/mainSlice";

export default function MainLayout(props: any) {
  const pathname = usePathname();
  const params = useParams();
  const user = useSelector((state: any) => state.user);
  const userPageInitializeStatus = useSelector((state: any) => state.main.userPageInitializeStatus);

  const [isShowDepositModal, setIsShowDepositModal] = useState<any>(false);
  const [isShowWithdrawalModal, setIsShowWithdrawalModal] = useState<any>(false);

  useEffect(() => {
    AOS.init();
    import("bootstrap/dist/js/bootstrap");
    MainService.initializeClient();
  }, []);

  useEffect(() => {
    store.dispatch(setIsOpenVerticalNavbarMobile(false));
  }, [pathname]);

  useEffect(() => {
    if (userPageInitializeStatus === "pending") MainService.initialUserPage();
  }, [user, userPageInitializeStatus]);

  return (
    <>
      <ToastContainer
        style={{ zIndex: "999999999" }}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <NextTopLoader color={"#F2EB00"} showSpinner={false} />
      <Noti />
      <AlertWin />
      <AlertWinCustom />
      {/* <AlertReceiveTransfer /> */}
      <DepositModalContext.Provider value={{ isShowDepositModal, setIsShowDepositModal }}>
        <DepositModal />
        <WithdrawalModalContext.Provider value={{ isShowWithdrawalModal, setIsShowWithdrawalModal }}>
          <WithdrawalModal />
          {props.children}
        </WithdrawalModalContext.Provider>
      </DepositModalContext.Provider>
    </>
  );
}
