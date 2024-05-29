import { FC, useState } from "react";
import Select, { components } from "react-select";
import { getLocale, locales, setLocale } from "../../languages";
import { Icon } from "../icon";

export interface ILanguageSelectCompnt {
    menuPlacement?: any,
    menuHorizontalPlacement?: 'left' | 'right'
}

export const LanguageSelectCompnt: FC<ILanguageSelectCompnt> = (props) => {
    const locale = getLocale();
    const optionLanguage = locales.map((item) => ({
        value: item.key,
        label: item.label,
        description: item.description
    }));
    return (
        <>
            <Select
                instanceId={'language-select-compnt'}
                menuPlacement={props?.menuPlacement}
                className="language-select-compnt"
                classNamePrefix="language-select-compnt"
                options={optionLanguage}
                defaultValue={{ label: locale.label, value: locale.key }}
                onChange={(element: any) => setLocale(element.value)}
                styles={
                    {
                        // control: (base, state) => ({
                        //   ...base,
                        //   background: "rgba(0,0,0,0.5)",
                        //   border: "none",
                        //   color: "#fff",
                        // }),
                        // option: (provided, state) => ({
                        //     ...provided,
                        //     background: 'rgba(0,0,0,0.5)'
                        // }),
                        // menuList: (provided, state) => ({
                        //     ...provided,
                        //     background: 'rgba(0,0,0,0.5)'
                        // }),
                        // menu: (provided, state) => ({
                        //   ...provided,
                        //   background: "rgba(0,0,0,0.5)",
                        // }),
                        menu: (provided:any, state:any) => ((props?.menuHorizontalPlacement === 'right') ? {
                            ...provided,
                            right: 0,
                        } : {
                            ...provided, //default
                        })
                    }
                }
                components={{
                    SingleValue: SingleValue,
                    Option: CustomOption,
                    DropdownIndicator,
                    IndicatorSeparator: CustomIndicatorSeparator,
                }}
                isSearchable={false}
            />
        </>
    );
};

const SingleValue = (props: any) => {
    return (
        <>
            <components.SingleValue {...props}>
                <div className="language-select-compnt__single-value__container">
                    <div className="language-select-compnt__single-value__label">{props?.data?.label}</div>
                    <div className="language-select-compnt__single-value__icon">
                        <img className="language-select-compnt__single-value__flag" src={`/assets/images/lang/${props?.data?.value}.png`} alt="" />
                    </div>
                </div>
            </components.SingleValue>
        </>
    );
};

const CustomOption = (props: any) => {
    return (
        <components.Option {...props}>
            <div className="language-select-compnt__custom-option__container">
                <div className="language-select-compnt__custom-option__icon">
                    <img className="language-select-compnt__custom-option__flag" src={`/assets/images/lang/${props?.data?.value}.png`} alt="" />
                </div>
                <div className="language-select-compnt__custom-option__description">{props?.data?.description}</div>
                <div className="language-select-compnt__custom-option__label">{props?.data?.label}</div>
            </div>
        </components.Option>
    );
};

const DropdownIndicator = (props: any) => {
    return (
        <components.DropdownIndicator {...props}>
            <Icon.LanguageIndicator />
        </components.DropdownIndicator>
    );
};

const CustomIndicatorSeparator = (props: any) => null;
