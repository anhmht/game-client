"use client";

import { InputText } from "@/src/components";
import { getLocale, translate } from "@/src/languages";
import { Button, CreateAlert, EAlertType, InputWraper, ObjectUtils, onError, useForm } from "@/src/modules";
import { UserService } from "@/src/services";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const personalInfo = () => {
    const user = useSelector((state:any) => state.user);
    const countries = useSelector((state:any) => state.countries);
    const [isShowForgotPinCode, setIsShowForgotPinCode] = useState<boolean>(false);

    const { getInputProps, handleSubmit, isSubmitting } = useForm({
        enableReinitialize: true,
        structure: [
            {
                name: "email",
                defaultValue: ObjectUtils.getIn(user, "email", ""),
                isDisabled: true,
            },
            {
                name: "uId",
                defaultValue: ObjectUtils.getIn(user, "thirdPartyUid", ""),
                isDisabled: true,
            },
            {
                name: "firstName",
                validate: Yup.string().required(translate("Must be provided")),
                defaultValue: ObjectUtils.getIn(user, "firstName", ""),
                isDisabled: true
            },
            // {
            //   name: "lastName",
            //   validate: Yup.string().required(translate("Must be provided")),
            //   defaultValue: ObjectUtils.getIn(user, "lastName", ""),
            // },
            // {
            //   name: "phoneNumber",
            //   validate: Yup.string().required(translate("Must be provided")),
            //   defaultValue: ObjectUtils.getIn(user, "phone.phoneNumber", ""),
            // },
            {
                name: "countryId",
                validate: Yup.string().required(translate("Must be provided")),
                defaultValue: ObjectUtils.getIn(user, "country.countryId", ""),
            },
        ],
        onSubmit: async (values) => {
            const country = ObjectUtils.getIn(countries, "data", [], (arr) => arr.find((v: any) => v.countryId === values.countryId));
            const payload = {
                ...ObjectUtils.selects(values, [
                    "firstName",
                    // "lastName",
                    "phoneNumber",
                    "countryId",
                ]),
                // phoneCountryId: +ObjectUtils.getIn(country, "phoneNumberPrefix"),
                languageId: getLocale().id,
            };

            return UserService.updateProfile(payload)
                .then(() =>
                    CreateAlert({
                        message: "Update profile successful",
                        type: EAlertType.SUCCESS,
                    }),
                )
                .catch(onError);
        },
    });
    return (
        <div className="personal-information-page">
            <div className="personal-information__header">{translate('Personal Information')}</div>
            <div className="personal-information__body">
                <div className="personal-information__body__title">{translate('Personal Information')}</div>
                <div className="personal-information__body__content">
                    <div className="personal__info">
                        <div className="personal__info__avatar">
                            <img src={`/images/level${user?.rank}.png`} alt="" />
                            <div className="personal__info__avatar__edit">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.6262 1.45451C11.7726 1.60095 11.7726 1.83839 11.6262 1.98484L10.844 2.767L9.34403 1.267L10.1262 0.484835C10.2726 0.338388 10.5101 0.338388 10.6565 0.484835L11.6262 1.45451Z" fill="black"/>
                                    <path d="M10.3137 3.29733L8.8137 1.79733L3.70396 6.90707C3.66279 6.94824 3.63178 6.99842 3.61337 7.05365L3.00995 8.86391C2.96109 9.01049 3.10054 9.14994 3.24712 9.10108L5.05738 8.49766C5.11261 8.47925 5.16279 8.44824 5.20396 8.40707L10.3137 3.29733Z" fill="black"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.75 10.125C0.75 10.7463 1.25368 11.25 1.875 11.25H10.125C10.7463 11.25 11.25 10.7463 11.25 10.125V5.625C11.25 5.41789 11.0821 5.25 10.875 5.25C10.6679 5.25 10.5 5.41789 10.5 5.625V10.125C10.5 10.3321 10.3321 10.5 10.125 10.5H1.875C1.66789 10.5 1.5 10.3321 1.5 10.125V1.875C1.5 1.66789 1.66789 1.5 1.875 1.5H6.75C6.95711 1.5 7.125 1.33211 7.125 1.125C7.125 0.917893 6.95711 0.75 6.75 0.75H1.875C1.25368 0.75 0.75 1.25368 0.75 1.875V10.125Z" fill="black"/>
                                </svg>
                            </div>
                        </div>
                        <div className="personal__info__input">
                            <div className="row">
                                <div className="col-md-6 col-12">
                                    <InputWraper 
                                        label={translate('Email')} 
                                        inputProps={getInputProps("email")} 
                                        component={InputText} 
                                        isDisable={true} 
                                    />
                                </div>
                                <div className="col-md-6 col-12">
                                    <InputWraper
                                        label={translate('Username')}
                                        // placeholder={translate("Enter your display name")}
                                        inputProps={getInputProps("firstName")}
                                        component={InputText}
                                        // isDisable={user?.isChangeFirstName === true}
                                    />
                                </div>
                            </div>
                            <div className="personal__info__main-button">
                                <Button 
                                    label={translate('Save').toUpperCase()} 
                                    buttonType="primary"
                                    onClick={handleSubmit}
                                    isLoading={isSubmitting}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default personalInfo;
