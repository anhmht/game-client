"use client";
import * as Yup from "yup";
import { Routes } from "@/src/AppRoutes";
import { InputPassword } from "@/src/components";
import { InputText, LanguageSelectCompnt } from "@/src/components";
import { translate } from "@/src/languages";
import { Button, CreateAlert, EAlertType, Icon, InputWraper, useForm } from "@/src/modules";
import { UserService } from "@/src/services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = ({ params }: { params: { code: string } }) => {
  const { push } = useRouter();
  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const { handleSubmit, getInputProps, isSubmitting } = useForm({
    structure: [
      {
        name: "password",
        validate: Yup.string()
          .required(translate("Must be provided"))
          .min(8, translate("Password is too short - should be 8 characters minimum") + ".")
          .max(20, translate("Password is too long - only 20 characters maximum") + ".")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
            translate("Password must contain one uppercase letter, one lowercase letter, one number and one special case character")
          ),
      },
      {
        name: "confirmPassword",
        validate: Yup.string()
          .required(translate("Must be provided"))
          .test({
            message: translate("Password confirmation does not match"),
            test: function (value) {
              const password = this.resolve(Yup.ref("password"));
              if (password && value && value !== password) return false;
              return true;
            },
          })
          .required(translate("Must be provided")),
      },
    ],
    onSubmit: async (values: any) => {
      return UserService.resetPassword(values.password, params.code as any)
        .then(() => {
          CreateAlert({
            message: translate("Recovery your password successful. Please login to access."),
            type: EAlertType.SUCCESS,
          });
          // Routes.login.push();
          push(Routes.login.href);
        })
        .catch((err) => {
          CreateAlert({ message: translate(err.message), type: EAlertType.ERROR });
          throw err;
        });
    },
  });

  let handleOnClickSubmit = () => {
    if (isRequesting === true) return;
    setIsRequesting(true);
    handleSubmit();
  };

  return (
    <div className="reset-form">
      <Link href={Routes.home.href} className="close">
        <Icon.Close />
      </Link>
      <Link href={Routes.home.href}>
        <img src="/assets/images/main-logo.png" alt="Logo" />
      </Link>
      <p className="title">{translate("Reset password")!}</p>

      <form onSubmit={handleSubmit} className="text-left">
        <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="200" data-aos-anchor="#signup_page__main__logo">
          <InputWraper
            label={translate("New Password")}
            inputProps={getInputProps("password")}
            component={InputPassword}
            placeholder={translate("Input new password")}
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="300" data-aos-anchor="#signup_page__main__logo">
          <InputWraper
            label={translate("Confirm Password")}
            inputProps={getInputProps("confirmPassword")}
            component={InputPassword}
            placeholder={translate("Input confirm password")}
          />
        </div>
        <div id="mainbutton" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="400" data-aos-anchor="#signup_page__main__logo">
          <Button
            isMiddle
            className="reset-form__form__reset-button"
            label={translate("Confirm")}
            type="submit"
            buttonType="primary"
            isLoading={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

// resetPassword.getInitialProps = async (ctx: any) => {
//     const { store, req, query, res } = ctx;
//     const isServer = !!req;

//     if (isServer) {
//         // Fetching data from server
//         const isAuthed = !!store.getState().user;
//         if (isAuthed) {
//             ctx.res.writeHead(302, { Location: Routes.userTrade.renderPath() });
//             ctx.res.end();
//         }
//     }

//     return { query };
// };

export default page;
