import React, { FC, Fragment } from "react";

import { IInputWraperProps, IInputWraperInputProps } from "./types";
import { ClassNames, ObjectUtils } from "../utils";

export const InputWraper: FC<IInputWraperProps> = (props) => {
  const { error, isDisabled, name, locales, value, label, description } = props.inputProps;
  const isMutilLocale = props.inputProps.isMutilLocale && locales && locales.length > 0;
  const inputProps: IInputWraperInputProps = {
    ...props.inputProps,
    value,
    label: label || props.label,
    description: description || props.description,
    tabIndex: props.tabIndex,
    placeholder: props.placeholder,
    isDisabled: props.isDisable,
    decimalScale: props?.decimalScale,
    suffix: props?.suffix,
    customSuffix: props?.customSuffix
  };

  if (props.isVisible === false) return null;

  return (
    <div
      id={name}
      className={ClassNames({
        InputWraper: true,
        hasValue: !!value,
        error: !!error,
        disabled: !!props.isDisable,
        mutilLocale: isMutilLocale,
        [props.className as string]: !!props.className,
        required: !!props.isRequired,
        tabIndex: !!props.tabIndex,
      })}
    >
      {inputProps.label ? (
        <div className="label">
          <span>{inputProps.label}</span>
        </div>
      ) : null}

      {inputProps.description ? <div className="description">{inputProps.description}</div> : null}

      {(() => {
        if (isMutilLocale && locales) {
          const generalErrorMessage = typeof error === "string" ? error : "";
          return (
            <Fragment>
              {locales
                .filter((v) => v.isActive)
                .map((locale, key) => {
                  const errorMessage = ObjectUtils.getIn(error, locale.key);

                  return (
                    <div
                      key={key}
                      className={ClassNames({
                        wraper: true,
                        hasError: !!errorMessage,
                      })}
                    >
                      <div className="input">
                        <div className="localeLabel">{locale.label}</div>
                        {(() => {
                          const mutilInputProps: IInputWraperInputProps = {
                            ...inputProps,
                            value: ObjectUtils.getIn(props.inputProps, `value.${locale.key}`),
                            defaultValue: ObjectUtils.getIn(props.inputProps, `defaultValue.${locale.key}`),
                            onChange: (e) => inputProps.onChange({ ...value, [locale.key]: e }),
                          };

                          if (props.component) return <props.component {...mutilInputProps} />;
                          if (props.renderInput) return props.renderInput(mutilInputProps);
                        })()}
                      </div>

                      {errorMessage ? <div className="errorMessage">{errorMessage.toString()}</div> : null}
                    </div>
                  );
                })}

              {generalErrorMessage ? <div className="generalErrorMessage">{generalErrorMessage.toString()}</div> : null}
            </Fragment>
          );
        }

        return (
          <div
            className={ClassNames({
              wraper: true,
              hasError: !!error,
            })}
          >
            <div className={`input`}>
              {(() => {
                if (props.component) return <props.component {...inputProps} />;
                if (props.renderInput) return props.renderInput(inputProps);
              })()}
            </div>
            {error ? <div className="errorMessage">{error.toString()}</div> : null}
          </div>
        );
      })()}
    </div>
  );
};
