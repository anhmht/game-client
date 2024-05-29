import { translate } from "@/src/languages";
import React, { useEffect, useRef, useState } from "react";
import { InputCheckbox } from "../checkbox";

type Props = {
  label: string;
  option: {
    label: string;
    value: string | number | boolean;
  }[];
  onChange: (values: any) => void;
  defaultValue?: any[];
};

function CustomSelectMulti({ label, option, onChange, defaultValue }: Props) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [listSelected, setSelected] = useState<any[]>([]);

  const menuContentRef = useRef<HTMLDivElement | null>(null);
  const inputContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onChange && onChange(listSelected);
  }, [listSelected]);

  useEffect(() => {
    defaultValue && defaultValue?.length > 0 && setSelected(defaultValue.filter((item) => item));
  }, [defaultValue?.length]);

  useEffect(() => {
    setOptions(option);
  }, [option, open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      open &&
        menuContentRef.current &&
        !menuContentRef.current.contains(event.target as Node) &&
        inputContentRef.current &&
        !inputContentRef.current.contains(event.target as Node) &&
        setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuContentRef, inputContentRef, open]);

  return (
    <div className="select-custom">
      <div ref={inputContentRef} onClick={() => setOpen((prev) => !prev)} className="select-custom_input">
        <span>
          {listSelected.length > 0
            ? option
                ?.filter((item) => listSelected.includes(item.value))
                ?.reduce((str: any, item: any) => (str === "" ? (str = item.label) : (str = `${str} + ${item.label}`)), "")
            : `${translate("All")} ${label}`}
        </span>
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
            fill="white"
          />
        </svg>
      </div>
      {open && (
        <div ref={menuContentRef} className="select-custom_menu">
          <div className="search">
            <div className="search__icon">
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.8321 4C7.96613 4 4.83212 7.13401 4.83212 11C4.83212 14.866 7.96613 18 11.8321 18C15.6981 18 18.8321 14.866 18.8321 11C18.8321 7.13401 15.6981 4 11.8321 4ZM2.83212 11C2.83212 6.02944 6.86156 2 11.8321 2C16.8027 2 20.8321 6.02944 20.8321 11C20.8321 15.9706 16.8027 20 11.8321 20C6.86156 20 2.83212 15.9706 2.83212 11Z"
                  fill="white"
                  fillOpacity="0.44"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.7735 15.9413C17.164 15.5508 17.7971 15.5508 18.1877 15.9413L22.5377 20.2913C22.9282 20.6819 22.9282 21.315 22.5377 21.7055C22.1471 22.0961 21.514 22.0961 21.1235 21.7055L16.7735 17.3555C16.3829 16.965 16.3829 16.3319 16.7735 15.9413Z"
                  fill="white"
                  fillOpacity="0.44"
                />
              </svg>
            </div>
            <div className="search__input">
              <input
                type="text"
                placeholder={translate("Search")}
                onChange={(e) => {
                  setOptions(() =>
                    `${e.target.value}`.trim() === ""
                      ? option
                      : option?.filter((item: any) => item.label.toLowerCase().includes(`${e.target.value}`.toLowerCase().trim()))
                  );
                }}
              />
            </div>
          </div>

          <div className="content">
            {options?.length > 0 ? (
              options?.map((item, idx) => (
                <div
                  key={idx}
                  className={`item ${listSelected?.includes(item.value) && "active"}`}
                  onClick={() =>
                    setSelected((prev: any) => {
                      if (prev?.includes(item.value)) return prev?.filter((el: any) => el !== item?.value);
                      else return [...prev, item?.value];
                    })
                  }
                >
                  <InputCheckbox label={item.label} name="" onChange={() => ""} onTouched={() => ""} value={listSelected?.includes(item.value)} />
                </div>
              ))
            ) : (
              <div className="item text-center">{translate("No data")}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomSelectMulti;
