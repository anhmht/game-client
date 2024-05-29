import React, { FC, Fragment } from "react";
import NumberFormat from "react-number-format";
import { IInputProps, Icon } from "../../../modules";
import { getLocaleKey } from "../../../languages";

interface IInputNumberProps extends IInputProps {
  suffix?: string;
  prefix?: string;
  max?: number;
  min?: number;
  onBlur?: (value: any) => void
}

export const InputNumber: FC<IInputNumberProps> = (props) => {
  const {
    value,
    onTouched,
    suffix,
    customSuffix,
    prefix,
    max,
    min,
    onChange,
    placeholder,
    isDisabled,
    decimalScale,
    onBlur
  } = props;
  const locale = getLocaleKey();

  const decimalSeparator = locale === "vi-VN" ? "," : ".";
  const thousandSeparator = locale === "vi-VN" ? "." : ",";

  return (
    <Fragment>
      {/* @ts-ignore */}
      <NumberFormat
        // fixedDecimalScale={true}
        decimalScale={(decimalScale != null) ? decimalScale : 8}
        value={value || ""}
        decimalSeparator={decimalSeparator}
        thousandSeparator={thousandSeparator}
        onValueChange={({ floatValue, value }:any) => {
          return onChange(floatValue);
        }}
        // onChange={(e: any) => onChange(+e?.target?.value)}
        onBlur={(e:any) => {
          let _e = {...e};
          setTimeout(() => {
              onTouched();
              if (onBlur) onBlur(_e);
            }, 500)
        }}
        suffix={suffix}
        prefix={prefix}
        placeholder={placeholder}
        disabled={isDisabled}
        // decimalScale={decimalScale ? decimalScale : 8}
      />

      {customSuffix && (
        <div className="custom-suffix">{customSuffix}</div>
      )}

      {value ? (
        <div className="btnInputNumberClear" onClick={() => props.onChange(0)}>
          <Icon.Close />
        </div>
      ) : null}
    </Fragment>
  );
};
