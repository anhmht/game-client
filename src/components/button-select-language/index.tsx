import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import {
    getLocaleKey,
    locales,
    setLocale,
    getLocaleCode,
} from "../../languages";
import { Icon } from "../icon";
import { ClassNames, ObjectUtils } from "../../modules";
import { useDeviceType } from "../../hook";

export const ButtonSelectLanguage: FC<{
    isFixed?: boolean;
    isShowAll?: boolean;
    isNotArrowDown?: boolean;
}> = ({ isFixed = false, isShowAll, isNotArrowDown }) => {
    const localeKey = getLocaleCode();
    const localeActive = locales.find((v) => v.key === localeKey);
    const localeLable = ObjectUtils.getIn(localeActive, "label", "--");
    const [isShow, setIsShow] = useState<boolean>(false);
    const elementShow = useRef<HTMLDivElement>(null);
    const deviceType = useDeviceType();

    useEffect(() => {
        if (isShow === false) return;
        function handleClick(e: any) {
            if (
                elementShow.current &&
                !elementShow.current.contains(e.target)
            ) {
                setIsShow(false);
            }
        }
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, [isShow]);

    return (
        <div
            className={ClassNames({
                ButtonSelectLanguage: true,
                fixed: isFixed,
                show: isShow,
            })}
            onClick={() => setIsShow(!isShow)}
        >
            {/* {!isFixed ? <div className="label">{localeLable}</div> : null} */}
            <button type="button">
                <div className="info">
                    <img
                        className="flag"
                        src={`/assets/images/lang/${localeKey}.png`}
                        alt=""
                    />
                    <div className="info-label">
                        {locales.find((item) => item.key === localeKey)?.label}
                    </div>
                    <div className="info-indicator">
                        <Icon.LanguageIndicator />
                    </div>
                    {/* {deviceType==='Desktop' ? <div className="name">{locales.find((item,key)=>item.isActive===true)?.label}</div> : null} */}
                </div>
                {isNotArrowDown ? null : (
                    <div className="toggleIcon">
                        <Icon.ArrowDown />
                    </div>
                )}

                <div className="options" ref={elementShow}>
                    <div className="wraper">
                        {locales
                            .filter((v) => v.isActive || isShowAll)
                            .map((item, key, arr) => {
                                return (
                                    <Fragment key={key}>
                                        <div
                                            className={ClassNames({
                                                item: true,
                                                language: true,
                                                active: item.key === localeKey,
                                            })}
                                            onClick={() => setLocale(item.key)}
                                        >
                                            <img
                                                className="flag"
                                                src={`/assets/images/lang/${item.key}.png`}
                                                alt=""
                                            />
                                            <div className="name">
                                                {item.label}
                                            </div>
                                        </div>
                                        {key !== arr.length - 1 && (
                                            <hr
                                                style={{
                                                    width: "80%",
                                                    margin: "auto",
                                                    borderBottom:
                                                        "1px solid #559EC1",
                                                }}
                                            />
                                        )}
                                    </Fragment>
                                );
                            })}
                    </div>
                </div>
            </button>
        </div>
    );
};