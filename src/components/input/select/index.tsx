import React, { Component, FC } from "react";
import Select, { components } from "react-select";

import { IInputProps, ObjectUtils } from "../../../modules";
import { isEqual } from "../../../utils";
import { Icon } from "../../icon";
import { translate } from "@/src/languages";

interface IInputSelect extends IInputProps {
  isClearable?: boolean;
  isSearchable?: boolean;
  options?: any;
}

export const InputSelect: FC<IInputSelect> = (props: any) => {
  const { isSearchable, defaultValue, options, isClearable = true, isDisabled } = props;
  return (
    <Select
      className="InputSelect"
      classNamePrefix="InputSelect"
      isSearchable={isSearchable ?? false}
      placeholder={`${translate(`Select`)}`}
      onChange={(data) => props.onChange(data ? data.value : "")}
      defaultValue={defaultValue}
      onBlur={() => setTimeout(() => props.onTouched(), 500)}
      options={options}
      value={options.find((v: any) => isEqual(props.value, v.value))}
      isClearable={isClearable}
      isDisabled={isDisabled}
      components={{ DropdownIndicator }}
    />
  );
};

interface IAsyncDataConfig {
  pathLabel: string;
  pathValue: string;
  response: any;
}

interface IInputSelectAsyncData extends IInputProps {
  isClearable?: boolean;
  asyncData: IAsyncDataConfig;
  tabIndex?: any;
  prefixLabel?: string;
}

export const InputSelectAsyncData: FC<IInputSelectAsyncData> = (props) => {
  const { asyncData } = props;
  const { pathLabel, pathValue, response } = asyncData;
  const errorMessage = ObjectUtils.getIn(response, "error.message");

  if (!response) return <input disabled defaultValue="Fetching options..." />;
  if (errorMessage) return <input disabled defaultValue={`Error: ${errorMessage}`} />;

  const options = ObjectUtils.getIn(response, "data", [], (arr) =>
    arr.map((item: any) => ({
      label: (props.prefixLabel || "") + ObjectUtils.getIn(item, pathLabel),
      value: ObjectUtils.getIn(item, pathValue, ""),
    }))
  );

  const getValue = () => {
    return props.value ? options.find((v: any) => isEqual(props.value, v.value)) : "";
  };

  return (
    <Select
      className="InputSelect"
      classNamePrefix="InputSelect"
      isSearchable
      placeholder="-- Select --"
      onChange={(data) => props.onChange(data ? data.value : "")}
      defaultValue={props.defaultValue}
      onBlur={() => setTimeout(() => props.onTouched(), 500)}
      options={options}
      value={getValue()}
      isClearable={props.isClearable}
      isDisabled={props.isDisabled}
      tabIndex={props.tabIndex}
      components={{ DropdownIndicator }}
    />
  );
};

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon.ReactSelectIndicator />
    </components.DropdownIndicator>
  );
};
