import React, { useEffect, useRef, useState } from "react";
import { Button, CreateAlert, EAlertType, InputWraper, useForm } from "@/src/modules";
import * as Yup from "yup";
import { UserService } from "@/src/services";
import { translate } from "@/src/languages";
import { InputPassword } from "@/src/components";

export const WithdrawalForgotPinCodeForm = (props: any) => {
    const { getInputProps, handleSubmit, isSubmitting, resetForm } = useForm({
        structure: [
            {
                name: "currentPassword",
                validate: Yup.string().required(translate("Must be provided")),
            },
        ],
        onSubmit: async (values) => {
            let payload = {
                currentPassword: values?.currentPassword,
            };
            return UserService.resetWithdrawalPinCode(payload)
                .then((res: any) => {
                    CreateAlert({ message: "Reset Withdrawal Code successfully, please check your email", type: EAlertType.SUCCESS });
                    resetForm();
                    props?.onChangeShowForgotPinCode(false);
                })
                .catch((err: any) => {
                    CreateAlert({ message: err.message, type: EAlertType.ERROR });
                })
                .finally(() => props.onClose());
        },
    });
    return (
        <div className="pincode-form">
            <div className="pincode-form__control-input">
                <div className="row">
                    <div className="col-12">
                        <InputWraper
                            label={translate("Password")}
                            placeholder="Input password"
                            inputProps={getInputProps("currentPassword")}
                            component={InputPassword}
                        />
                    </div>
                </div>
            </div>
            <div className="pincode-form__control-indicator text-center">
                <div className="row">
                    <div className="col-12 mb-3">
                        <Button
                            type="submit"
                            label={'Confirm'}
                            isLoading={isSubmitting}
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                        />
                    </div>
                    <div className="col-12">
                        <div
                            className="change-pin"
                            onClick={() => props?.onChangeShowForgotPinCode(false)}
                        >
                            {translate("Change Withdrawal Code")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};