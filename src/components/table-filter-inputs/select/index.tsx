import React, { FC } from "react";
import Select from "react-select";
import { translate } from "../../../languages";

import { ITableFilterInputProps, ObjectUtils } from "../../../modules";
import { IInputSelectOption } from "../../../modules/types";

interface ITableFilterInputSelectProps extends ITableFilterInputProps {
  options: IInputSelectOption[];
  isClearable?: boolean;
}

export const TableFilterInputSelect: FC<ITableFilterInputSelectProps> = (props) => {
  const { options, isClearable = true } = props;
  const key = props.paramKey;

  return (
    <Select
      options={options.filter((v) => v.value !== props.params[key])}
      className="TableFilterInputSelect"
      classNamePrefix="TableFilterInputSelect"
      placeholder={"-- " + translate("Select") + " --"}
      onChange={(option) => {
        props.onChange({ [key]: ObjectUtils.getIn(option, "value", "") });
      }}
      defaultValue={options.find((v) => v.value === props.params[key])}
      isClearable={isClearable}
      components={{ IndicatorSeparator }}
    />
  );
};

const IndicatorSeparator = (props: any) => null;
