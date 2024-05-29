import React, { FC } from "react";
import * as Yup from "yup";

import { useForm, InputWraper, Button, CreateAlert, onError, EAlertType } from "@/src/modules";
import { translate } from "@/src/languages";
import { InputPassword, UserRow, UserCol } from "@/src/components";
import { UserService } from "@/src/services";
import { Routes } from "@/src/AppRoutes";
import { useRouter } from "next/navigation";

const ChangePasswordForm: FC = () => {
  const router = useRouter();
  
  const { handleSubmit, getInputProps, isSubmitting } = useForm({
    structure: [
      {
        name: "currentPassword",
        validate: Yup.string().required("Must be provided"),
      },
      {
        name: "newPassword",
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
        name: "confirmNewPassword",
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
          .min(8, translate("Password is too short - should be 8 characters minimum") + ".")
          .max(20, translate("Password is too long - only 20 characters maximum") + ".")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
            translate("Password must contain one uppercase letter, one lowercase letter, one number and one special case character")
          ),
      },
    ],
    onSubmit: async (values) =>
      UserService.changePassword(values.currentPassword, values.confirmNewPassword)
        .then(() => {
          UserService.logout();
          CreateAlert({
            type: EAlertType.SUCCESS,
            message: translate("Your password was updated"),
          });
        })
        .catch(onError),
  });

  return (
    <form className="ChangePasswordForm" autoComplete="new-password">
      <div className="row">
        <div className="col-12">
          <InputWraper
            className="update-pass"
            label={translate("Current Password")}
            placeholder={'Input password'}
            inputProps={getInputProps("currentPassword")}
            component={InputPassword}
          />
        </div>
        <div className="col-12">
          <InputWraper
            className="update-pass"
            label={translate("New Password")}
            placeholder={'Input password'}
            inputProps={getInputProps("newPassword")}
            component={InputPassword}
          />
        </div>
        <div className="col-12">
          <InputWraper
            className="update-pass"
            label={translate("Confirm Password")}
            placeholder={'Input password'}
            inputProps={getInputProps("confirmNewPassword")}
            component={InputPassword}
          />
        </div>
        <div className="main-button text-center">
          <Button className="update-pass-btn" label={translate("Update")} type="submit" isLoading={isSubmitting} onClick={handleSubmit} />
        </div>
      </div>

    </form>
  );
};
export default ChangePasswordForm;
