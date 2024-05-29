"use client";
import { Routes } from "@/src/AppRoutes";
import { InputCheckbox, InputPassword, InputText, LanguageSelectCompnt } from "@/src/components";
import { translate } from "@/src/languages";
import { Button, CreateAlert, EAlertType, Icon, InputWraper, useForm } from "@/src/modules";
import { UserService } from "@/src/services";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const page = () => {
  const { push } = useRouter();
  const user = useSelector((state: any) => state.user);
  const [isShow2FA, setIsShow2FA] = useState(false);
  const [dataPuzzleImg, setDataPuzzleImg] = useState<any>();
  const [captchaUid, setCaptchaUid] = useState<any>();

  const EMAIL_REGX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  const { handleSubmit, getInputProps, isSubmitting, resetForm } = useForm({
    structure: [
      {
        name: "email",
        validate: Yup.string().required(translate("Must be provided")).matches(EMAIL_REGX, "Invalid email format"),
      },
      {
        name: "password",
        validate: Yup.string().required(translate("Must be provided")),
      },
      {
        name: "googleAuthenticationCode",
        validate: isShow2FA === true ? Yup.string().required(translate("Must be provided")) : null,
      },
      // {
      //     name: "puzzleAnswer",
      //     validate: dataPuzzleImg != null ? Yup.string().required(translate("Must be provided")) : null,
      // },
    ],
    onSubmit: async (values) => {
      let GoogleRecaptchaToken;

      // try {
      //     // recaptchaRef?.current?.reset(); //google recaptcha v2
      //     // GoogleRecaptchaToken = await recaptchaRef?.current?.executeAsync(); //google recaptcha v2
      //     GoogleRecaptchaToken = await executeRecaptcha("login"); //google recaptcha v3
      // } catch (error) {
      //     console.log(error);
      // }

      let payload = {
        email: values.email,
        password: values.password,
        recaptcha: GoogleRecaptchaToken,
        twoFaCode: values?.googleAuthenticationCode,
        captchaUid: captchaUid,
        puzzleAnswer: values?.puzzleAnswer,
      };

      return UserService.login(payload)
        .then(() => {})
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
              CreateAlert({ message: translate(messageJSON.message), type: EAlertType.ERROR });
              return;
            }
          }

          if (err.message == "REQUIRED_TWO_FA") {
            setIsShow2FA(true);
            return;
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

          CreateAlert({ message: translate(err.message), type: EAlertType.ERROR });
        });
    },
  });

  return (
    <div className="login-form">
      <Link href={Routes.home.href} className="close">
        <Icon.Close />
      </Link>
      <p className="title">Register / Login</p>
      <span className="sub-title">Smart Login, without a password</span>

      <form onSubmit={handleSubmit} className="text-left">
        <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="300" data-aos-anchor="#login_page__main__logo">
          <InputWraper label={translate("Email")} inputProps={getInputProps("email")} component={InputText} placeholder={translate("Input email")} />
        </div>
        <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="400" data-aos-anchor="#login_page__main__logo">
          <InputWraper
            label={translate("Password")}
            inputProps={getInputProps("password")}
            component={InputPassword}
            placeholder={translate("Input password")}
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="500" data-aos-anchor="#login_page__main__logo">
          <InputCheckbox
            className="login-form__form__checkbox1"
            value={isShow2FA}
            label={translate("Google Authentication code")}
            name=""
            onChange={(value) => setIsShow2FA(value)}
            onTouched={() => null}
          />
        </div>
        {isShow2FA === true && (
          <InputWraper
            label={translate("Google Authentication code")}
            inputProps={getInputProps("googleAuthenticationCode")}
            component={InputText}
            placeholder={translate("Google Authentication")}
          />
        )}
        {/* <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="600" data-aos-anchor="#login_page__main__logo">
              <InputCheckbox
                className="login-form__form__checkbox2"
                label={translate("Remember me")}
                name=""
                onChange={() => null}
                onTouched={() => null}
              />
            </div> */}
        <div id="mainbutton" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="700" data-aos-anchor="#login_page__main__logo">
          <Button
            isMiddle
            className="login-form__form__login-button"
            label={translate("Login")}
            type="submit"
            isLoading={isSubmitting}
            disabled={user || isSubmitting}
          />
        </div>
      </form>

      <div
        className="login-form__forgot-password"
        data-aos="fade-left"
        data-aos-duration="600"
        data-aos-delay="800"
        data-aos-anchor="#login_page__main__logo"
      >
        <Link href="/forgot-password">{translate("Forgot Password?")}</Link>
      </div>

      <div
        className="login-form__signup-here"
        data-aos="fade-left"
        data-aos-duration="600"
        data-aos-delay="900"
        data-aos-anchor="#login_page__main__logo"
      >
        {translate(`Do not have an account`)}? <Link href={Routes.register.href}>{translate("SIGN UP HERE")}</Link>
      </div>
    </div>
  );
};

export default page;
