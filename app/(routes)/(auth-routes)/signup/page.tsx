"use client";

import { InputCheckbox, InputPassword, InputText } from "@/src/components";
import { getLocale, translate } from "@/src/languages";
import { Button, CreateAlert, EAlertType, Icon, InputWraper, ObjectUtils, useForm } from "@/src/modules";
import Link from "next/link";
import { useState } from "react";
import { UserService } from "@/src/services";
import _ from "lodash";
import { useRouter } from "next/navigation";
// import { useGoogleReCaptcha } from "react-google-recaptcha-v3"; //google recaptcha v3
import { Routes } from "@/src/AppRoutes";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const page = ({ params }: any) => {
  const { push } = useRouter();
  const [isTerm, setIsTerm] = useState(false);
  const [dataPuzzleImg, setDataPuzzleImg] = useState<any>();
  const [captchaUid, setCaptchaUid] = useState<any>();
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  let countries = useSelector((state: any) => state.countries);

  const initCountryId = 226;
  // const { executeRecaptcha } = useGoogleReCaptcha() as any; //google recaptcha v3
  // const recaptchaRef = useRef<any>(null); //google recaptcha v2

  const onError = (res: any) => {
    if (res.alert.message == "INVALID_PASSWORD")
      CreateAlert({
        message: translate("Password must contain one uppercase letter, one lowercase letter, one number and one special case character"),
        type: EAlertType.WARNING,
      });
    else CreateAlert(res.alert);
  };

  // const getCountry = (value: any) => {
  //   let getCountry = countries;
  //   if (!getCountry) return initPhone;
  //   // console.log("getCountry", getCountry);

  //   getCountry = ObjectUtils.getIn(countries, "data", [], (arr) =>
  //     arr.find((v: any) => v.countryId === value)
  //   );

  //   return getCountry?.phoneNumberPrefix;
  // };

  const EMAIL_REGX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  const { handleSubmit, getInputProps, isSubmitting } = useForm({
    structure: [
      {
        name: "affiliationCode",
        defaultValue: localStorage.getItem("affiliate-code") || "",
        validate: Yup.string().required(translate("Must be provided")),
      },
      // {
      //   name: "uid",
      //   validate: Yup.string().required(translate("Must be provided")),
      // },
      {
        name: "email",
        validate: Yup.string().required(translate("Must be provided")).matches(EMAIL_REGX, "Invalid email format"),
      },
      {
        name: "firstName",
        validate: Yup.string().required(translate("Must be provided")),
      },
      // {
      //     name: 'lastName',
      //     validate: Yup.string().required(translate('Must be provided')),
      // },
      // {
      //     name: 'phoneNumber',
      //     validate: Yup.string().required(translate('Must be provided')),
      // },
      // {
      //     name: 'phoneNumberAreaCode',
      //     validate: Yup.string().required(translate('Must be provided')),
      //     isDisabled: true
      // },
      // {
      //   name: "countryId",
      //   validate: Yup.number().required(translate("Must be provided")),
      //   defaultValue: initCountryId,
      // },
      {
        name: "password",
        // description: "* Minimum 8 characters, at least 1 UPPER CASE, at least 1 number, at least 1 special character",
        // Yêu cầu mật khẩu tối thiểu 8 ký tự có 1 chữ in hoa, 1 số và 1 ký tự đặt biệt. Tối đa 20 ký tự
        validate: Yup.string()
          .required(translate("Must be provided"))
          .min(8, translate("Password is too short - should be 8 characters minimum") + "."),
        // .max(20, translate("Password is too long - only 20 characters maximum") + ".")
        // .matches(
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
        //   translate(
        //     "Password must contain one uppercase letter, one lowercase letter, one number and one special case character"
        //   )
        // ),
      },
      // {
      //     name: "confirmPassword",
      //     validate: Yup.string()
      //         .required(translate("Must be provided"))
      //         .test({
      //             message: translate("Password confirmation does not match"),
      //             test: function (value) {
      //                 const password = this.resolve(Yup.ref("password"));
      //                 if (password && value && value !== password) return false;
      //                 return true;
      //             },
      //         })
      //         .min(8, translate("Password is too short - should be 8 characters minimum") + "."),
      //     // .max(20, translate("Password is too long - only 20 characters maximum") + ".")
      //     // .matches(
      //     //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
      //     //   translate(
      //     //     "Password must contain one uppercase letter, one lowercase letter, one number and one special case character"
      //     //   )
      //     // ),
      // },
      // {
      //   name: "puzzleAnswer",
      //   validate: dataPuzzleImg != null ? Yup.string().required(translate("Must be provided")) : null,
      // },
    ],
    onSubmit: async (values) => {
      let GoogleRecaptchaToken;

      // try {
      //   // recaptchaRef?.current?.reset(); //google recaptcha v2
      //   // GoogleRecaptchaToken = await recaptchaRef?.current?.executeAsync(); //google recaptcha v2
      //   GoogleRecaptchaToken = await executeRecaptcha("register"); //google recaptcha v3
      // } catch (error) {
      //   console.log(error);
      // }

      // const country = ObjectUtils.getIn(countries, "data", [], (arr) => arr.find((v: any) => v.countryId === values.countryId));
      const payload = {
        ...ObjectUtils.selects(values, ["email", "firstName", "password", "affiliationCode"]),
        countryId: 226,
        languageId: getLocale().id,
        thirdPartyUid: values.uid,
        recaptcha: GoogleRecaptchaToken,
        captchaUid: captchaUid,
        puzzleAnswer: null,
      };

      return UserService.register(payload)
        .then(() => {
          CreateAlert({
            message: translate("Please check email to verify your account."),
            type: EAlertType.SUCCESS,
          });
          push(Routes.login.href);
        })
        .catch(async (err) => {
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
  const privacyNode = (
    <span className="item-title d-flex align-items-center">
      <span>{translate("You agree with our")}&nbsp;</span>
      {/* <Link href="#">Forgot Password</Link>
                    <span>And </span> */}
      {/* <Link href="privacy-policy" target="_blank"> */}
      {translate("Privacy policy")}
      {/* </Link> */}
    </span>
  );

  return (
    <div className="signup-form">
      <Link href={Routes.home.href} className="close">
        <Icon.Close />
      </Link>
      <Link href={Routes.home.href}>
        <img src="/assets/images/main-logo.png" alt="Logo" />
      </Link>
      <p className="title">{translate("Create Account")!}</p>
      <span className="sub-title">{translate("Sign Up to MemeLotto and Start Playing")}</span>

      <form onSubmit={handleSubmit} className="text-left">
        <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="300" data-aos-anchor="#signup_page__main__logo">
          <InputWraper
            label={translate("EMAIL")}
            inputProps={getInputProps("email")}
            component={InputText}
            tabIndex={1}
            placeholder={translate("Input email")}
            isRequired
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="400" data-aos-anchor="#signup_page__main__logo">
          <InputWraper
            label={translate("USER NAME")}
            inputProps={getInputProps("firstName")}
            component={InputText}
            tabIndex={2}
            placeholder={translate("Input username")}
            isRequired
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="500" data-aos-anchor="#signup_page__main__logo">
          <InputWraper
            label={translate("PASSWORD")}
            inputProps={getInputProps("password")}
            component={InputPassword}
            isDisabledAutoFill={true}
            tabIndex={3}
            placeholder={translate("Input password")}
            isRequired
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="600" data-aos-anchor="#signup_page__main__logo">
          <InputWraper
            label={translate("AFFILIATION CODE")}
            inputProps={getInputProps("affiliationCode")}
            component={InputText}
            tabIndex={4}
            placeholder={translate("Input affiliation code")}
            isRequired
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="700" data-aos-anchor="#signup_page__main__logo">
          <InputCheckbox
            className="signup-form__form__checkbox1"
            value={isChecked}
            label={privacyNode}
            name=""
            onChange={(value) => setIsChecked(value)}
            onTouched={() => null}
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="800" data-aos-anchor="#signup_page__main__logo">
          <InputCheckbox
            className="signup-form__form__checkbox1"
            value={isChecked2}
            label={translate("I am over 18 years old")}
            name=""
            onChange={(value) => setIsChecked2(value)}
            onTouched={() => null}
          />
        </div>

        {/* <button className="cmn-btn mt-40 w-100" disabled={!isChecked}>Sign Up</button> */}
        <div id="mainbutton" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="900" data-aos-anchor="#signup_page__main__logo">
          <Button
            isMiddle
            className="signup-form__form__signup-button"
            label={translate("SIGN UP")}
            type="submit"
            buttonType="primary"
            isLoading={isSubmitting}
            disabled={!isChecked || !isChecked2}
          />
        </div>
      </form>

      <div
        className="signup-form__signup-here"
        data-aos="fade-left"
        data-aos-duration="600"
        data-aos-delay="900"
        data-aos-anchor="#signup_page__main__logo"
      >
        {translate("Have an Account")}? <Link href={Routes.login.href}>{translate("Login")}</Link>
      </div>
    </div>
  );
};

export default page;
