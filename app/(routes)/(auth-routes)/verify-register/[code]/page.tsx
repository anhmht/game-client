"use client";
import { Routes } from "@/src/AppRoutes";
import { translate } from "@/src/languages";
import { Button, ClassNames, CreateAlert, EAlertType, Icon, Message } from "@/src/modules";
import { UserService } from "@/src/services";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

const page = ({ params }: { params: { code: string } }) => {
  const { push } = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    UserService.verifyRegister(params.code)
      .then(() => {
        CreateAlert({
          message: translate('Verify your account successfully! Please login to continue'),
          type: EAlertType.SUCCESS
        });
        // Routes.login.push();
        push(Routes.login.href)
      })
      .catch((err: any) => setError(err.message));
  }, [params.code]);

  return (
    <div className="login-reg-main text-center">
      <div className="PageVerifyRegister">
        {/* {HeadService.render()} */}

        {/* <img src="/assets/images/maps.png" className="background" alt="" /> */}

        <div className={ClassNames({ icon: true, error: !!error })}>
          {(() => {
            if (error) return <Icon.Info />;
            return (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57.591 66">
                <g transform="translate(-146.706 -241.5)">
                  <path
                    className="a"
                    d="M175.5,307.5a3.324,3.324,0,0,1-.947-.139c-28.168-8.519-28.323-43.935-27.7-54.587a3.4,3.4,0,0,1,3.314-3.207c.068,0,.138,0,.207.007.577.029,1.15.044,1.714.044h0a35.276,35.276,0,0,0,21.36-7.4,3.307,3.307,0,0,1,4.1,0,35.233,35.233,0,0,0,21.344,7.4c.572,0,1.153-.015,1.726-.044.061,0,.121,0,.181,0a3.379,3.379,0,0,1,3.35,3.2c.623,10.652.468,46.069-27.7,54.585A3.319,3.319,0,0,1,175.5,307.5Zm-25.3-55.1a.692.692,0,0,0-.691.662c-.551,12.994.866,44.033,25.857,51.592a.7.7,0,0,0,.4,0c26-7.9,26.145-41.487,25.57-51.593a.69.69,0,0,0-.689-.651h-.034c-.586.028-1.178.042-1.762.042a38.177,38.177,0,0,1-22.927-7.917.69.69,0,0,0-.849,0,38.216,38.216,0,0,1-22.93,7.916c-.633,0-1.276-.016-1.91-.05Z"
                  />
                  <path
                    className="a"
                    d="M173.4,280.126a1.406,1.406,0,0,1-1-.415l-4.211-4.211a1.414,1.414,0,1,1,2-2l2.722,2.722a.689.689,0,0,0,.977,0l6.934-6.934a1.415,1.415,0,1,1,2,2l-8.422,8.422A1.407,1.407,0,0,1,173.4,280.126Z"
                  />
                  <path
                    className="a"
                    d="M175.5,290.654A16.154,16.154,0,1,1,191.656,274.5,16.173,16.173,0,0,1,175.5,290.654Zm0-29.479A13.325,13.325,0,1,0,188.826,274.5,13.339,13.339,0,0,0,175.5,261.175Z"
                  />
                </g>
              </svg>
            );
          })()}
        </div>

        {(() => {
          if (error)
            return (
              <Fragment>
                <p className="mt20 textDanger">
                  {translate("Error")}: {translate(error)}
                </p>
                {/* <Button label={translate("Go back")} className="grey-outline mt20" onClick={() => Routes.register.push()} /> */}
                <Button label={translate("Go back")} className="grey-outline mt20" onClick={() => push(Routes.register.href)} />
              </Fragment>
            );

          return <Message type="loading" message={translate("Verifing your account...")} />;
        })()}
      </div>
    </div>
  );
};

export default page;