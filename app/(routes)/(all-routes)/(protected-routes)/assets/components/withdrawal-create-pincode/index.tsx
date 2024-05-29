import React, { useEffect, useRef, useState } from "react";
import { Button, CreateAlert, EAlertType, InputWraper, useForm } from "@/src/modules";
import * as Yup from "yup";
import { UserService } from "@/src/services";
import { translate } from "@/src/languages";
import { InputPassword } from "@/src/components";
import { store } from "@/src/redux/store";

export const WithdrawalCreatePinCodeForm = (props: any) => {
    const { getInputProps, handleSubmit, isSubmitting } = useForm({
        structure: [
            {
                name: "pinWithdraw",
                validate: Yup.number()
                    .typeError(translate("Must be a number"))
                    .required(translate("Must be provided"))
                    .test({
                        message: translate("Must be 6 digits"),
                        test: function (value) {
                            if (value?.toString()?.length != 6) return false;
                            return true;
                        },
                    }),
            },
            {
                name: "password",
                validate: Yup.string().required(translate("Must be provided")),
            },
        ],
        onSubmit: async (values) => {
            let payload = {
                pinWithdraw: values?.pinWithdraw,
                password: values?.password,
            };
            return UserService.setWithdrawalPinCode(payload)
                .then((res: any) => {
                    CreateAlert({ message: "Set up Withdrawal Code successfully", type: EAlertType.SUCCESS });
                    UserService.auth(store);
                })
                .catch((err: any) => {
                    CreateAlert({ message: err.message, type: EAlertType.ERROR });
                }).finally(() => props.onClose());
        },
    });
    return (
        <div className="pincode-form">
            <div className="pincode-form__control-input">
                <div className="row">
                    <div className="col-12">
                        <InputWraper
                            label={translate("Withdrawal Code")}
                            placeholder="Input Withdrawal Code"
                            inputProps={getInputProps("pinWithdraw")}
                            component={InputPassword}
                        />
                    </div>
                    <div className="col-12">
                        <InputWraper
                            label={translate("Password")}
                            placeholder="Input password"
                            inputProps={getInputProps("password")}
                            component={InputPassword}
                        />
                    </div>
                </div>
            </div>
            <div className="pincode-form__control-indicator text-center">
                <Button
                    type="submit"
                    label={'Confirm'}
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                />
            </div>
        </div>
    );
};
