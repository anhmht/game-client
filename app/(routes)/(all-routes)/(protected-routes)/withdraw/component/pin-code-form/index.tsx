import { InputPassword } from "@/src/components";
import { translate } from "@/src/languages";
import { Button, InputWraper, useForm } from "@/src/modules";
import * as Yup from "yup";

export const PinCodeForm = (props: any) => {
    const { getInputProps, handleSubmit, isSubmitting } = useForm({
      structure: [
        {
          name: "code",
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
      ],
      onSubmit: async (values) => {
        props.onSubmit(values.code);
      },
    });
  
    return (
      <div className="pincode-form">
        <div className="pincode-form__control-input">
          <InputWraper label={translate("Withdrawal Code")} inputProps={getInputProps("code")} component={InputPassword} placeholder={translate("Enter your Withdrawal Code")} />
        </div>
        <div className="pincode-form__control-indicator">
          <Button style={{display: 'flex', marginLeft: 'auto', marginRight: 'auto'}} type="submit" isLoading={props?.isRequesting} label={translate("Confirm")} onClick={handleSubmit} />
        </div>
      </div>
    );
  };