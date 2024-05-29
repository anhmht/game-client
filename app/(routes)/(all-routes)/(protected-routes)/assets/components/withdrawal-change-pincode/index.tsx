import React, { useEffect, useRef, useState } from "react";
import { Button, CreateAlert, EAlertType, InputWraper, useForm } from "@/src/modules";
import * as Yup from "yup";
import { UserService } from "@/src/services";
import { translate } from "@/src/languages";
import { InputPassword } from "@/src/components";

export const WithdrawalChangePinCodeForm = (props: any) => {
    const { getInputProps, handleSubmit, isSubmitting, resetForm } = useForm({
        structure: [
            {
                name: "oldPinWithdraw",
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
                name: "newPinWithdraw",
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
                oldPinWithdraw: values?.oldPinWithdraw,
                newPinWithdraw: values?.newPinWithdraw,
                password: values?.password,
            };
            return UserService.changeWithdrawalPinCode(payload)
                .then((res: any) => {
                    CreateAlert({ message: "Change Withdrawal Code successfully", type: EAlertType.SUCCESS });
                    resetForm();
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
                            label={translate("Current Withdrawal Code")}
                            placeholder="Input Current Withdrawal Code"
                            inputProps={getInputProps("oldPinWithdraw")}
                            component={InputPassword}
                        />
                    </div>
                    <div className="col-12">
                        <InputWraper
                            label={translate("New Withdrawal Code")}
                            placeholder="Input New Withdrawal Code"
                            inputProps={getInputProps("newPinWithdraw")}
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
                <div className="row">
                    <div className="col-12 mb-3">
                        <Button
                            type="submit"
                            label={"Confirm"}
                            isLoading={isSubmitting}
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                        />
                    </div>
                    <div className="col-12">
                        <div
                            className="forgot-pin"
                            onClick={() => props?.onChangeShowForgotPinCode(true)}
                        >
                            {`${translate("Forgot Withdrawal Code")}?`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};