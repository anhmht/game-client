"use client";

import GeneralFooter from "@/src/components/general-footer";
import GeneralHeader from "@/src/components/general-header";
import VerticalNavbar from "@/src/components/vertical-navbar";
import { translate } from "@/src/languages";
import { Button, CreateAlert, EAlertType, Icon } from "@/src/modules";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

interface Countdown {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

type Props = {};

const page = (props: Props) => {
  const [countdown, setCountdown] = useState<Countdown | null>(null);

  useEffect(() => {
    const startDateTime = "2024-04-25T00:00:00";
    const endDateTime = "2024-06-27T00:00:00";

    const startCountdown = (startDateTime: string, endDateTime: string): void => {
      const startMoment = moment(startDateTime);
      const endMoment = moment(endDateTime);

      if (startMoment.isAfter(endMoment)) {
        console.error("Ngày giờ bắt đầu phải trước ngày giờ kết thúc.");
        return;
      }

      const intervalId = setInterval(() => {
        const now = moment();
        const remainingTime = endMoment.diff(startMoment.isAfter(now) ? startMoment : now, "seconds");

        if (remainingTime <= 0) {
          clearInterval(intervalId);
          console.log("Đếm ngược đã kết thúc.");
        } else {
          const duration = moment.duration(remainingTime, "seconds");

          const newCountdown: Countdown = {
            days: Math.floor(duration.asDays()).toString().padStart(2, "0"),
            hours: duration.hours().toString().padStart(2, "0"),
            minutes: duration.minutes().toString().padStart(2, "0"),
            seconds: duration.seconds().toString().padStart(2, "0"),
          };

          setCountdown(newCountdown);
        }
      }, 1000);
    };

    startCountdown(startDateTime, endDateTime);
  }, []);

  console.log(countdown);

  return (
    <>
      <VerticalNavbar />
      <GeneralHeader />
      <div className="coming-soon">
        <div className="banner">
          <img className="banner_bg" src="/assets/images/home_banner.gif" alt="Logo" />
          <img className="banner_bg_mobi" src="/assets/images/home_banner_mobi.gif" alt="Logo" />
          <div className="banner_content">
            <img src="/assets/images/token-light.gif" alt="Logo" />
            <h1 className="title">GET READY TO LAUNCH</h1>
            <div className="countdown-box">
              <p className="countdown-box_title">START IN</p>
              <div className="countdown-box_content">
                {countdown && (
                  <>
                    <div className="countdown-box_content_item">
                      <div className="time">
                        {countdown.days.split("").map((digit, index) => (
                          <div key={index} className="item">
                            {index === 0 && digit === "00" ? "0" : ""}
                            {digit}
                          </div>
                        ))}
                      </div>
                      <span className="text">Day</span>
                    </div>
                    <div className="countdown-box_content_item">
                      <div className="time">
                        {countdown.hours.split("").map((digit, index) => (
                          <div key={index} className="item">
                            {index === 0 && digit === "00" ? "0" : ""}
                            {digit}
                          </div>
                        ))}
                      </div>
                      <span className="text">Hours</span>
                    </div>
                    <div className="countdown-box_content_item">
                      <div className="time">
                        {countdown.minutes.split("").map((digit, index) => (
                          <div key={index} className="item">
                            {index === 0 && digit === "00" ? "0" : ""}
                            {digit}
                          </div>
                        ))}
                      </div>
                      <span className="text">Minutes</span>
                    </div>
                    <div className="countdown-box_content_item">
                      <div className="time">
                        {countdown.seconds.split("").map((digit, index) => (
                          <div key={index} className="item">
                            {index === 0 && digit === "00" ? "0" : ""}
                            {digit}
                          </div>
                        ))}
                      </div>
                      <span className="text">Seconds</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <GeneralFooter />
    </>
  );
};

export default page;
