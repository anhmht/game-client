"use client";
import { Routes } from "@/src/AppRoutes";
import { InputText, LanguageSelectCompnt } from "@/src/components";
import { translate } from "@/src/languages";
import { CreateAlert, EAlertType, InputWraper, useForm, Button, Icon } from "@/src/modules";
import { UserService } from "@/src/services";
import _ from "lodash";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
// import { useGoogleReCaptcha } from "react-google-recaptcha-v3"; //google recaptcha v3
import * as Yup from "yup";

const page = () => {
  const { push } = useRouter();
  const [dataPuzzleImg, setDataPuzzleImg] = useState<any>();
  const [captchaUid, setCaptchaUid] = useState<any>();

  // const { executeRecaptcha } = useGoogleReCaptcha() as any; //google recaptcha v3
  // const recaptchaRef = useRef<any>(null); //google recaptcha v2

  const EMAIL_REGX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  const { handleSubmit, getInputProps, isSubmitting, resetForm } = useForm({
    structure: [
      {
        name: "email",
        validate: Yup.string().required(translate("Must be provided")).matches(EMAIL_REGX, "Invalid email format"),
      },
      {
        name: "puzzleAnswer",
        validate: dataPuzzleImg != null ? Yup.string().required(translate("Must be provided")) : null,
      },
    ],
    onSubmit: async (values) => {
      let GoogleRecaptchaToken;

      // try {
      //   // recaptchaRef?.current?.reset(); //google recaptcha v2
      //   // GoogleRecaptchaToken = await recaptchaRef?.current?.executeAsync(); //google recaptcha v2
      //   GoogleRecaptchaToken = await executeRecaptcha("recovery_password"); //google recaptcha v3
      // } catch (error) {
      //   console.log(error);
      // }

      return UserService.sendRequestResetPasswordEmail({
        email: values.email,
        recaptcha: GoogleRecaptchaToken,
        captchaUid: captchaUid,
        puzzleAnswer: values?.puzzleAnswer,
      })
        .then(() => {
          push(Routes.login.href);
          CreateAlert({
            message: translate("Request recovery password successful. Please check your mailbox."),
            type: EAlertType.SUCCESS,
          });
        })
        .catch((err) => {
          if (_.isError(_.attempt(JSON.parse, err.message)) === false) {
            let messageJSON = JSON.parse(err.message);
            if (messageJSON?.message === "REQUIRED_SOLVE_PUZZLE") {
              setDataPuzzleImg(messageJSON?.puzzleImg);
              setCaptchaUid(messageJSON?.captchaUid);
              return;
            }
            if (messageJSON?.message === "SOLVE_PUZZLE_INCORRECTLY") {
              setDataPuzzleImg(messageJSON?.puzzleImg);
              setCaptchaUid(messageJSON?.captchaUid);
              CreateAlert({ message: translate(messageJSON.message), type: EAlertType.ERROR });
              return;
            }
            if (messageJSON?.detail?.includes("timeout-or-duplicate") === true) {
              //if token Google reCaptcha expired then get new token and call api
              handleSubmit();
              return;
            }
            if (_.isPlainObject(messageJSON)) {
              CreateAlert({ message: messageJSON.message, type: EAlertType.ERROR });
              return;
            }
          }

          if (dataPuzzleImg != null) {
            //if any info incorrect, also refresh puzzle
            UserService.getPuzzleCaptcha({
              captchaUid: captchaUid,
            }).then((res: any) => {
              setDataPuzzleImg(res?.result?.puzzleImg);
              setCaptchaUid(res?.result?.captchaUid);
            });
          }

          CreateAlert({ message: err.message, type: EAlertType.ERROR });
          throw err;
        });
    },
  });
  return (
    <div className="forgot-password-form">
      <Link href={Routes.home.href} className="close">
        <Icon.Close />
      </Link>
      <Link href={Routes.home.href}>
        <img src="/assets/images/main-logo.png" alt="Logo" />
      </Link>
      <p className="title">{translate("Forgot Password")!}</p>
      <span className="sub-title">{translate("Enter your email registered with MemeLotto to recover password")}</span>

      <form onSubmit={handleSubmit} className="text-left">
        <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="300" data-aos-anchor="#signup_page__main__logo">
          <InputWraper
            label={translate("EMAIL")}
            inputProps={getInputProps("email")}
            component={InputText}
            tabIndex={1}
            placeholder={translate("Input email")}
          />
        </div>
        <div id="mainbutton" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="400" data-aos-anchor="#signup_page__main__logo">
          <Button isMiddle className="forgot-form__form__forgot-button" label={translate("Next")} type="submit" isLoading={isSubmitting} />
        </div>
      </form>
    </div>
  );
};

export default page;
