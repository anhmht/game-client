import { InputText } from "@/src/components";
import { InputImageSingle } from "@/src/components/single-image";
import { translate } from "@/src/languages";
import { Button, CreateAlert, EAlertType, InputWraper, useForm } from "@/src/modules";
import React, { useState } from "react";
import _ from "lodash";
import moment from "moment";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { UserService } from "@/src/services";

type Props = {
  dataClaimToday: any;
  dataTopOrders: any;
  setOpenPopup: any;
  setForceUpdateTable: any;
};

const FormRequest = ({ dataClaimToday, dataTopOrders, setOpenPopup, setForceUpdateTable }: Props) => {
  const user = useSelector((state: any) => state.user);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const { handleSubmit, getInputProps, isSubmitting, resetForm } = useForm({
    enableReinitialize: true,
    structure: [
      {
        name: "Email",
        defaultValue: user?.email,
      },
      {
        name: "RegisterTime",
        defaultValue: dataClaimToday
          ? moment(dataClaimToday?.startDate).format("YYYY/MM/DD HH:mm") + " → " + moment(dataClaimToday?.exDate).format("YYYY/MM/DD HH:mm")
          : null,
      },
      {
        name: "ExperiencePack",
        defaultValue: dataClaimToday ? `${dataClaimToday?.packageValue}$` : null,
      },
      {
        name: "InitialBalance",
        defaultValue: _.isEmpty(dataTopOrders) === false ? `${dataTopOrders[0]?.balanceBefore}$` : null,
      },
      {
        name: "ProofPhoto1",
        validate: Yup.object().required(translate("Must be provided")),
      },
      {
        name: "ProofPhoto2",
        validate: Yup.object().required(translate("Must be provided")),
      },
    ],
    onSubmit: async (values: any) => {
      let payload = {
        // lost: +values?.MTGLost,
        // reqDate: moment(values?.DateTime).toISOString(),
        // percentLost: +values?.PercentLost,
        experienceGameId: dataClaimToday?.experienceGameId,
        proofImage1: values?.ProofPhoto1?.src,
        proofImage2: values?.ProofPhoto2?.src,
      };
      UserService.RequestClaim(payload)
        .then((res) => {
          setTimeout(() => {
            setOpenPopup(false);
            resetForm();
            setForceUpdateTable((prev: any) => !prev);
          }, 1000);
          return CreateAlert({
            message: translate("Claim successfully"),
            type: EAlertType.SUCCESS,
          });
        })
        .catch((err) => {
          return CreateAlert({
            message: translate(err.message),
            type: EAlertType.ERROR,
          });
        })
        .finally(() => setIsRequesting(false));
    },
  });

  let handleOnClickClaim = () => {
    if (isRequesting === true) return;
    setIsRequesting(true);
    handleSubmit();
  };

  return (
    <div className="claim-form-request">
      <InputWraper label={translate("Email")} inputProps={getInputProps("Email")} component={InputText} isDisable={true} />
      <InputWraper label={translate("Play time")} inputProps={getInputProps("RegisterTime")} component={InputText} isDisable={true} />
      <InputWraper label={translate("Package Price")} inputProps={getInputProps("ExperiencePack")} component={InputText} isDisable={true} />
      <InputWraper label={translate("Experience USDT balance")} inputProps={getInputProps("InitialBalance")} component={InputText} isDisable={true} />
      <InputWraper
        className={"image"}
        label={translate("Proof Photo 1")}
        inputProps={getInputProps("ProofPhoto1")}
        component={InputImageSingle}
        onChangeEvent={(value: any) => {}}
        isDisable={
          _.isEmpty(dataClaimToday) ||
          moment().isSameOrAfter(moment(dataClaimToday?.startDate).add(3, "hours")) ||
          moment().isSameOrBefore(dataClaimToday?.startDate)
        } // moment() <= startDate || moment() >= startDate + 3hours
      />
      <InputWraper
        className={"image"}
        label={translate("Proof Photo 2")}
        inputProps={getInputProps("ProofPhoto2")}
        component={InputImageSingle}
        onChangeEvent={(value: any) => {}}
        isDisable={
          _.isEmpty(dataClaimToday) ||
          moment().isSameOrAfter(moment(dataClaimToday?.startDate).add(3, "hours")) ||
          moment().isSameOrBefore(dataClaimToday?.startDate)
        } // moment() <= startDate || moment() >= startDate + 3hours
      />

      <Button
        className="claim-button"
        label={translate("Claim")}
        type="submit"
        isLoading={isSubmitting}
        onClick={handleOnClickClaim}
        disabled={
          _.isEmpty(dataClaimToday) ||
          moment().isSameOrAfter(moment(dataClaimToday?.startDate).add(3, "hours")) ||
          moment().isSameOrBefore(dataClaimToday?.startDate)
        } // moment() <= startDate || moment() >= startDate + 3hours
      />
    </div>
  );
};

export default FormRequest;
