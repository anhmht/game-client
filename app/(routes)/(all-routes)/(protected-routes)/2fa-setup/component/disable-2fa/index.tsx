import React, { FC, useState, useEffect } from "react";
import * as Yup from "yup";

import { useForm, InputWraper, Button, CreateAlert, onError, EAlertType } from "@/src/modules";
import { translate } from "@/src/languages";
import { InputPassword, UserRow, UserCol, InputText, Image } from "@/src/components";
import { UserService } from "@/src/services";
import { store } from "@/src/redux/store";

const DisableTwoFaBox: FC = () => {
  const { handleSubmit, getInputProps, isSubmitting, setValues } = useForm({
    structure: [
      {
        name: "password",
        //validate: Yup.string().required(translate('Must be provided')),
      },
      {
        name: "twoFaCode",
        validate: Yup.string().required(translate("Must be provided")),
      },
    ],
    onSubmit: async (values) => {
      UserService.disableTwoFa(values.password, values.twoFaCode)
        .then(() => {
          CreateAlert({
            type: EAlertType.SUCCESS,
            message: translate("Disable Google authentication successfully"),
          });
          UserService.auth(store);
        })
        .catch((onError) => {
          CreateAlert({ type: EAlertType.ERROR, message: onError.message });
        });
    },
  });

  return (
    <form className="TwoFaSettingForm">
      <h3 className="twofa-title">{translate("Disable Google Authentication")}</h3>
      {/* <UserRow>
                <UserCol amount={6}>
                    <InputWraper
                        label={'1. '+translate('Enter login password')}
                        placeholder={translate('Enter login password')}
                        inputProps={getInputProps('password')}
                        component={InputPassword}
                    />
                </UserCol>
            </UserRow> */}
      <UserRow>
        <UserCol>
          <InputWraper
            // label={'2. '+translate('Enter 2FA code from the app')}
            label={translate("Enter 2FA Code from App")}
            inputProps={getInputProps("twoFaCode")}
            component={InputText}
            placeholder={translate('Input code')}
          />
        </UserCol>
      </UserRow>

      <div className="main-button">
        <Button className="disable-2fa-btn" label={translate("Disable")} type="submit" isLoading={isSubmitting} disabled={isSubmitting} onClick={handleSubmit} />
      </div>
    </form>
  );
};
export default DisableTwoFaBox;
