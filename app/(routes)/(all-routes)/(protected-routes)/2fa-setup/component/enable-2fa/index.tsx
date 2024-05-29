import { FC, useEffect, useState } from "react";
import * as Yup from "yup";

import { store } from "@/src/redux/store";
import CopyToClipboard from "react-copy-to-clipboard";
import { InputText, UserCol, UserRow } from "@/src/components";
import { translate } from "@/src/languages";
import { Button, CreateAlert, EAlertType, Icon, InputWraper, useForm } from "@/src/modules";
import { UserService } from "@/src/services";

const EnableTwoFaBox: FC = () => {
  const [dataTwoFa, setDataTwoFa] = useState({ qrCode: "", secretCode: "" });

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
      UserService.enableTwoFa(values.password, values.twoFaCode, dataTwoFa.secretCode)
        .then(() => {
          CreateAlert({
            type: EAlertType.SUCCESS,
            message: translate("Enable Google authentication successfully"),
          });
          UserService.auth(store);
        })
        .catch((onError) => {
          CreateAlert({ type: EAlertType.ERROR, message: onError.message });
        });
    },
  });

  const getData = async () => {
    UserService.getDataTwoFa()
      .then((result) => {
        setDataTwoFa({ qrCode: result.qrCode, secretCode: result.secretCode });
      })
      .catch((error) => {
        // CreateAlert({ message: "Can't load transaction", type: "danger" });
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <form className="placeholder-glow TwoFaSettingForm">
      <UserRow className="user-row-compnt">
        <UserCol className="user-col-compnt">
          <h3 className={`twofa-title`}>{translate("Enable Google Authentication")}</h3>
          <div className="row-twofa">
            <div className="group-twofa download">
              <div className="label">
                <span>{"1. " + translate("Download and Install")}</span>
              </div>
              <div className="content-twofa app">
                <a
                  style={{ width: "100%", height: "100%" }}
                  href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                  target="_blank"
                >
                  <img src="/assets/images/google-play.png" alt="" />
                </a>
                <a
                  style={{ width: "100%", height: "100%" }}
                  href="https://apps.apple.com/vn/app/google-authenticator/id388497605"
                  target="_blank"
                >
                  <img src="/assets/images/apple-store.png" alt="" />
                </a>
              </div>
            </div>
          </div>
          <div className="row-twofa block">
            <div className="label">
              <span>{"2. " + translate("2FA Backup Key")}</span>
            </div>
            <div className="group-twofa qr">
              <div className="content-twofa">
                <img src={dataTwoFa?.qrCode} alt="" />
              </div>
            </div>
            <div className="group-twofa key">
              <div className="content-twofa">
                {/* @ts-ignore */}
                <CopyToClipboard
                  text={dataTwoFa?.secretCode}
                  onCopy={() => {
                    CreateAlert({
                      message: translate("Copied 2FA Backup Key"),
                      type: EAlertType.SUCCESS,
                    });
                  }}
                >
                  <div className={`key-backup`}>
                    <span className="key-backup__icon">
                        <span>
                          <Icon.KeyBackupIcon />
                        </span>
                      
                    </span>
                    <input className="key-backup__input" disabled value={dataTwoFa?.secretCode} />
                  </div>
                </CopyToClipboard>
              </div>
            </div>
          </div>

          {/* <InputWraper
                        label={'3. '+translate('Enter login password')}
                        placeholder={translate('Enter login password')}
                        inputProps={getInputProps('password')}
                        component={InputPassword}
                    /> */}
          <InputWraper 
            label={"3. " + translate("Enter 2FA Code from App")} 
            inputProps={getInputProps("twoFaCode")} 
            component={InputText} 
            placeholder={translate('Input code')}
          />
        </UserCol>
      </UserRow>

      <div className="main-button">
        <Button className="enable-2fa-btn" label={translate("Enable")} type="submit" isLoading={isSubmitting} disabled={isSubmitting} onClick={handleSubmit} />
      </div>
    </form>
  );
};

export default EnableTwoFaBox;
