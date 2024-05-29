"use client";
import { Routes } from "@/src/AppRoutes";
import { addAlertWinCustom } from "@/src/components";
import DashboardHeader from "@/src/components/dashboard-header";
import GeneralHeader from "@/src/components/general-header";
import HomepageFooter from "@/src/components/general-footer";
import HomepageHeader from "@/src/components/homepage-header";
import { translate } from "@/src/languages";
import { Button, CreateAlert, EAlertType, Icon, onError } from "@/src/modules";
import { store } from "@/src/redux/store";
import { SocketService, UserService } from "@/src/services";
import AffiliateService from "@/src/services/affiliate/affiliate.service";
import _ from "lodash";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { push } = useRouter();

  const user = useSelector((state: any) => state.user);
  const lifeCycleTime = useSelector((state: any) => state.main.lifeCycleTime);
  const userPageInitializeStatus = useSelector((state: any) => state.main.userPageInitializeStatus);
  const DashboardLayoutRef = useRef<any>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);

  let _clearTimeout: any;
  const registerSockerServices = () => {
    // SocketService.disconnect();
    SocketService.removeListenerCommand();
    clearTimeout(_clearTimeout);
    setTimeout(() => {
      if (user) {
        // OrderService.getTotalOpenOrder(store, coinActive.coinId, 1);

        // Handle socket event
        SocketService.on(SocketService.COMMAND_TYPE.REFRESH_BALANCE, () => {
          console.log("REFRESH_BALANCEREFRESH_BALANCEREFRESH_BALANCE");
          UserService.getWalletBalances(store);
        });

        SocketService.on(SocketService.COMMAND_TYPE.UPDATE_ACTIVE_ORDER, () => {
          UserService.getWalletBalances(store);
        });

        SocketService.on(SocketService.COMMAND_TYPE.NEW_ANNOUNCEMENT, (payload) => {});

        SocketService.on(SocketService.COMMAND_TYPE.REFRESH_RANK, () => {
          AffiliateService.getInfo();
        });

        SocketService.on(SocketService.COMMAND_TYPE.SOCKET_COMMAND_BOT_LOSE, (payload) => {
          addAlertWinCustom({
            message: translate(
              '{appName} refunds event of <div style="color:#f1eb4e;display:inline-flex;">{lose}</div> consecutive losses (<div style="color:#f1eb4e;display:inline-flex;">{bonus} USDT</div>)',
              { appName: process.env["NEXT_PUBLIC_SITE_NAME"], lose: +payload?.LOSE_CONSTANT, bonus: +payload?.BOUNS }
            ),
          });
        });

        SocketService.on(SocketService.COMMAND_TYPE.SOCKET_DEPOSIT_BONUS, (payload) => {
          addAlertWinCustom({
            message: translate(
              'Congratulations, you have received <div style="color:#f1eb4e;display:inline-flex;">{amount}</div> USDT from the deposit bonus event. <div style="color:#f1eb4e;display:inline-flex;">{amount}</div> is the amount received under {type}',
              { amount: +payload?.value, type: "Deposit bonus" }
            ),
          });
        });
      }
    }, 500);
  };

  useEffect(() => {
    SocketService.removeListenerCommand();

    registerSockerServices();
  }, [user, lifeCycleTime]);

  useEffect(() => {
    if (userPageInitializeStatus === "completed") {
      if (!user) {
        localStorage.setItem("auth-redirect-to", window.location.pathname);
        // Routes.login.push();
        push(Routes.login.href);
      }
    }
  }, [user, userPageInitializeStatus]);

  useEffect(() => {
    let handleScroll = (element: any) => {
      if (element.scrollTop > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    let DashboardElement = DashboardLayoutRef?.current;

    if (DashboardElement) {
      DashboardElement.addEventListener("scroll", () => handleScroll(DashboardElement));
      return () => {
        DashboardElement.removeEventListener("scroll", () => handleScroll(DashboardElement));
      };
    }
  }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [path]);

  if (!user)
    return (
      <div className="dasboard-loading">
        <img src="/assets/images/main-logo.png" alt="" />
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );

  return (
    <div ref={DashboardLayoutRef} className="dashboard-layout">
      {/* <HomepageHeader scrolled={scrolled} /> */}
      <DashboardHeader />
      {children}
    </div>
  );
}
