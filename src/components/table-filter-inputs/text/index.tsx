import React, { FC, useRef } from "react";

import { ITableFilterInputProps, ObjectUtils, Icon } from "../../../modules";

const TableFilterInputText: FC<ITableFilterInputProps> = (props) => {
  const key = props.paramKey;

  const inputRef: any = useRef(null);
  let delayCheckTyping: any;
  const isHasValue = !!ObjectUtils.getIn(inputRef, "current.value");

  const handleChange = (e: any) => {
    clearTimeout(delayCheckTyping);
    const value = e.target.value;
    delayCheckTyping = setTimeout(async () => {
      if (inputRef && inputRef.current && inputRef.current.value === value) {
        props.onChange({ [key]: value });
      }
    }, 500);
  };

  return (
    <div className="TableFilterInputText">
      <input type="text" ref={inputRef} onChange={handleChange} defaultValue={props.params[key]} />

      {isHasValue ? (
        <div
          className="btnClear"
          onClick={() => {
            props.onChange({ [key]: "" });
            inputRef.current.value = "";
          }}
        >
          <Icon.Remove />
        </div>
      ) : null}
    </div>
  );
};

export default TableFilterInputText;
