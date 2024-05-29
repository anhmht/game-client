"use client";
import { Routes } from "@/src/AppRoutes";
import { GearLoaderCompnt } from "@/src/components";
import { getLocaleCode, getLocaleKey, translate } from "@/src/languages";
import { Button, CreateAlert, CustomTable, EAlertType, InputWraper, ObjectUtils } from "@/src/modules";
import { UserService } from "@/src/services";
import _ from "lodash";
import moment, * as momentTz from "moment-timezone";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import Select, { StylesConfig } from "react-select";

interface Option {
    value: string;
    label: string;
}

const page = () => {
    const countriesDB = require("countries-db");
    const walletBalances = useSelector((state: any) => state.userWalletBalances);
    const walletBalance = ObjectUtils.getIn(walletBalances, "data", [], (arr:any) => arr.find((item: any) => item.code === "USDT"));
    const availableAmount: number = +ObjectUtils.getIn(walletBalance, "amount", 0);

    const listTimeGame = [
        {
            label: "00:00",
            value: "00",
        },
        {
            label: "03:00",
            value: "03",
        },
        {
            label: "06:00",
            value: "06",
        },
        {
            label: "09:00",
            value: "09",
        },
        {
            label: "12:00",
            value: "12",
        },
        {
            label: "15:00",
            value: "15",
        },
        {
            label: "18:00",
            value: "18",
        },
        {
            label: "21:00",
            value: "21",
        },
    ];

    const listExperienceItem = [
        {
            label: "$100",
            value: "100",
        },
        {
            label: "$500",
            value: "500",
        },
        {
            label: "$1.000",
            value: "1000",
        },
        {
            label: "$2.000",
            value: "2000",
        },
        {
            label: "$3.000",
            value: "3000",
        },
        {
            label: "$4.000",
            value: "4000",
        },
        {
            label: "$5.000",
            value: "5000",
        },
        {
            label: "$8.000",
            value: "8000",
        },
        {
            label: "$10.000",
            value: "10000",
        },
        {
            label: "$15.000",
            value: "15000",
        },
        {
            label: "$20.000",
            value: "20000",
        },
        {
            label: "$25.000",
            value: "25000",
        },
        {
            label: "$30.000",
            value: "30000",
        },
        {
            label: "$35.000",
            value: "35000",
        },
        {
            label: "$40.000",
            value: "40000",
        },
        {
            label: "$50.000",
            value: "50000",
        },
    ];

    const listTab = [
        {
            label: translate("Register"),
            value: "Register",
        },
        {
            label: translate("History"),
            value: "History",
        },
    ];

    let TableStructure = [
        {
            className: "col-md-12 col-6 order-md-1 order-3",
            name: translate("Play time"),
            key: "regTime",
            render: (item: any) => `${item?.regTime}:00 ➜ ${item?.regTime}:30` ,
        },
        {
            className: "col-md-12 col-6 order-md-1 order-3",
            name: translate("Purchase Time"),
            key: "created",
            render: (item: any) => moment(item?.created).format("YYYY/MM/DD HH:mm"),
        },
        {
            className: "col-md-12 col-6 order-md-1 order-3",
            name: translate("Package Price"),
            key: "packageValue",
            render: (item: any) => "$" + new Intl.NumberFormat("en").format(item?.packageValue),
        },
        {
            className: "col-md-12 col-6 order-md-1 order-3",
            name: translate("Closing Time"),
            key: "exDate",
            render: (item: any) => moment(item?.exDate).format("YYYY/MM/DD HH:mm"),
        },
        {
            className: "col-md-12 col-6 order-md-1 order-1 hide-mobile-header",
            name: translate("Status"),
            key: "status",
            render: (item: any) => <span style={{width: 'max-content'}} className={`status status--${item?.status?.toLowerCase()}`}>{translate(item.status)}</span>,
        },
        // {
        //     name: translate(`Action`),
        //     key: "",
        //     render: (item: any) => {
        //         if (item.status == "EXPIRED") return <Link href={`${Routes.gameExperienceHistory.href}/${item.experienceGameId}`}>{translate(`History`)}</Link>;
        //         else return "-";
        //     },
        // },
    ];

    const trialPageElement = useRef<any>(null);
    const periodResultElement = useRef<any>(null);
    const [tab, setTab] = useState<any>(listTab?.[0]?.value);
    const [selectedOption, setSelectedOption] = useState<Option | any>({});
    const [selectedTime, setSelectedTime] = useState(null as any);
    const [listTimeLocal, setListTimeLocal] = useState<any>(null);
    const [itemExperienceActivated, setItemExperienceActivated] = useState<number>(-1);
    const [rangeDate, setRangeDate] = useState<any>([]);
    const [periodResultExpandMobile, setPeriodResultExpandMobile] = useState<boolean>(true);
    const [forceUpdateTable, setForceUpdateTable] = useState<boolean>(false);
    const [isRequesting, setIsRequesting] = useState<boolean>(false);

    const countries: any = Object.values(countriesDB.getAllCountries()).map((item: any) =>
        item.timezones.map((el: any) => {
            const utcOffset = momentTz.tz(el).utcOffset();
            const localTime = momentTz.utc().add(utcOffset, "minutes").format("HH:mm");

            return {
                label: `(UTC ${momentTz.tz(el).format("Z")}) ${item.name}`,
                value: el,
            };
        }),
    );

    const handleOnClickConfirmButton = () => {
        if (selectedTime == null) {
            CreateAlert({message: translate('Please select block time'), type: EAlertType.WARNING});
            return;
        }
        if (isRequesting === true) return;
        setIsRequesting(true);
        UserService.ExperienceRegister({
            tz: Number(moment.tz(selectedOption?.value).format("Z").split(":")[0]),
            regTime: +selectedTime,
            packageValue: +itemExperienceActivated,
        })
            .then((res) => {
                setForceUpdateTable((state:any) => !state);
                setSelectedOption(() => {
                    const utcOffset = momentTz.tz(moment.tz.guess()).utcOffset();
                    const localTime = momentTz.utc().add(utcOffset, "minutes").format("HH:mm");

                    return {
                        label: `(UTC ${momentTz.tz(moment.tz.guess()).format("Z")}) ${momentTz.tz(moment.tz.guess()).zoneName()} (${localTime})`,
                        value: moment.tz.guess(),
                    };
                });
                CreateAlert({ message: "Register successfully", type: EAlertType.SUCCESS });
                setTab("History");
            })
            .catch((err) => {
                CreateAlert({
                    message: err.message,
                    type: EAlertType.ERROR,
                });
            }).finally(() => {
                setItemExperienceActivated(-1);
                setSelectedTime(null);
                setIsRequesting(false);
            });
    };

    const customStyles: StylesConfig = {
        // control: (provided, state) => ({
        //     ...provided,
        //     backgroundColor: "#242882",
        //     color: "#ffffff",
        //     width: "auto",
        //     borderColor: "#4A54AF",
        //     height: "60px",
        //     borderRadius: "10px",
        // }),
        // option: (provided, state) => ({
        //     ...provided,
        //     color: state.isSelected ? "#ffffff" : "#000",
        //     backgroundColor: state.isSelected ? "#1B1D4D" : "#ffffff",
        // }),
        // singleValue: (base) => ({
        //     ...base,
        //     border: "none",
        //     color: "#fff",
        // }),
    };

    let handleOnClickPackagePrice = (element:any) => {
        if (availableAmount < element?.value) return;
        if (itemExperienceActivated === element?.value) {
            setItemExperienceActivated(-1);
            return;
        }
        setItemExperienceActivated(element?.value);
    }

    useEffect(() => {
        setListTimeLocal(() => {
            return listTimeGame
                .map((item) => momentTz.tz(`${moment().format("L")} ${item.label}`, selectedOption?.value).format("HH"))
                .sort((a: any, b: any) => Number(a) - Number(b))
                .map((item) => ({
                    label: `${item}:00 ➜ ${item}:30`,
                    value: item,
                }));
        });
    }, [selectedOption]);

    const DAY_OF_WEEK_PLAY = 6;
    useEffect(() => {
        if (selectedOption?.value && selectedTime)
            setRangeDate(() => {
                if (_.isNil(selectedTime)) return [];
                let currentTime = moment().tz(selectedOption?.value);
                let StartWeek = moment().tz(selectedOption?.value).startOf("isoWeek");
                let AnchorTime = StartWeek.clone().add(4, "days").set("hour", +selectedTime); //After this date => register for next week
                if (currentTime.isAfter(AnchorTime)) StartWeek = currentTime.add(1, "weeks").startOf("isoWeek");
                let listAvailable = [];
                let tempTime;
                for (let i = 0; i < DAY_OF_WEEK_PLAY; i++) {
                    tempTime = StartWeek.clone().add(i, "days").set("hour", +selectedTime);
                    if (tempTime.isAfter(currentTime)) listAvailable.push(tempTime);
                }
                if (listAvailable.length === 0) return [];
                const value = listAvailable?.map((item) => new Date(item?.format("L")));
                return [value?.[0], value?.[value.length - 1]];
            });
    }, [selectedTime, selectedOption?.value]);

    useEffect(() => {
        setSelectedOption(() => {
            const utcOffset = momentTz.tz(moment.tz.guess()).utcOffset();
            const localTime = momentTz.utc().add(utcOffset, "minutes").format("HH:mm");

            return {
                label: `(UTC ${momentTz.tz(moment.tz.guess()).format("Z")}) ${momentTz.tz(moment.tz.guess()).zoneName()} (${localTime})`,
                value: moment.tz.guess(),
            };
        });
    }, [countries?.length]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                trialPageElement.current.style.paddingBottom = periodResultElement.current?.offsetHeight + 'px'
            } else {
                trialPageElement.current.style.paddingBottom = '';
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [periodResultElement.current, periodResultExpandMobile]);

    return (
        <div ref={trialPageElement} className="trial-page">
            <div className="trial__header">
                <div className="trial__header__title">{translate('Trial Period')}</div>
                <div className="trial__header__indicator" role="tablist" id="v-pills-tab">
                    {listTab.map((element:any, idx: number) => {
                        return (
                            <div 
                                key={idx}
                                className={`trial__header__indicator__item ${(tab === element?.value) ? 'active' : ''}`}
                                onClick={() => setTab(element?.value)}
                                id={`${element?.label}-tab`}
                                data-bs-toggle="tab"
                                data-bs-target={`#${element?.label}`}
                                aria-controls={element?.label}
                                aria-selected="true"
                            >
                                {element?.label}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="tab-content trial__body">
                <div 
                    className={`tab-pane fade ${listTab?.[0]?.value === tab && "show active"}`}
                    id={listTab?.[0]?.label}
                    role="tabpanel"
                    aria-labelledby={`${listTab?.[0]?.label}-tab`}
                >
                    <div className="row">
                        <div className="col-md-7 col-12">
                            <div className="package-price">
                                <div className="package-price__title">
                                    <div className="package-price__title__bubble">1</div>
                                    <div className="package-price__title__text">{translate('Select Package Price')}</div>
                                </div>
                                <div className="package-price__content-wrapper">
                                    <div className="row row-cols-sm-4 row-cols-3 package-price__content">
                                        {listExperienceItem?.map((element:any, idx:number) => {
                                            return (
                                                <div key={idx} className="col package-price__content__wrap-item">
                                                    <div 
                                                        className={`package-price__content__item ${(availableAmount >= element?.value) ? 'available' : ''} ${itemExperienceActivated === element?.value ? 'active' : ''}`}
                                                        onClick={() => handleOnClickPackagePrice(element)}
                                                    >
                                                        <div className="package-price__content__item__checked">
                                                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M3.15428 5.57556C3.00897 5.57556 2.87015 5.51754 2.76766 5.41344L0.766895 3.38013C0.557059 3.16649 0.559766 2.82382 0.773403 2.61344C0.98704 2.40415 1.33026 2.40631 1.54009 2.61995L3.13856 4.24441L6.44554 0.602362C6.64777 0.380604 6.99047 0.364882 7.21113 0.565503C7.43289 0.766671 7.44916 1.10934 7.24799 1.33165L3.55552 5.39824C3.45522 5.50884 3.31424 5.57283 3.16513 5.57608C3.16133 5.57556 3.15808 5.57556 3.15428 5.57556Z" fill="white"/>
                                                            </svg>
                                                        </div>
                                                        {element?.label}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="block-time">
                                <div className="block-time__title">
                                    <div className="block-time__title__title__bubble">2</div>
                                    <div className="block-time__title__title__text">{translate('Select block time')}</div>
                                </div>
                                <div className="block-time__content">
                                    <Select
                                        classNamePrefix="block-time__content__timezone-select"
                                        instanceId={useId()}
                                        defaultValue={countries.flat()?.filter((item: any) => item?.value === momentTz.tz.guess())}
                                        onChange={setSelectedOption}
                                        options={countries.flat()}
                                        components={{ IndicatorSeparator: () => null }}
                                        styles={customStyles}
                                    />
                                    <Select
                                        classNamePrefix="block-time__content__hour-select"
                                        onChange={(element:any) => setSelectedTime(element?.value)}
                                        options={listTimeLocal}
                                        components={{ IndicatorSeparator: () => null }}
                                        styles={customStyles}
                                        placeholder={translate('Select')}
                                    />
                                    
                                    
                                </div>
                            </div>
                            <div className="time-available">
                                <div className="time-available__title">
                                    <div className="time-available__title__title__bubble">3</div>
                                    <div className="time-available__title__title__text">{translate('Select time available')}</div>
                                </div>
                                <div className="time-available__content">
                                    <div className="time-available__content__note">
                                        <div className="time-available__content__note__item time-available__content__note__item--today">
                                            <div className="time-available__content__note__item__icon"></div>
                                            <div className="time-available__content__note__item__label">{translate('Today')}</div>
                                        </div>
                                        <div className="time-available__content__note__item time-available__content__note__item--available">
                                            <div className="time-available__content__note__item__icon"></div>
                                            <div className="time-available__content__note__item__label">{translate('Available')}</div>
                                        </div>
                                    </div>
                                    <Calendar value={rangeDate} className="pe-none" locale={`${getLocaleKey()}`} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 col-12">
                            <div ref={periodResultElement} className="period-result">
                                <div className="period-result__title">
                                    {translate('Trial Period Register')}
                                    <div className="period-result__title__mobile-indicator">
                                        {(periodResultExpandMobile === false) && <div className="period-result__title__mobile-indicator__expand" onClick={() => setPeriodResultExpandMobile(true)}>
                                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.70703 7.707L6.00003 3.414L10.293 7.707L11.707 6.293L6.00003 0.586002L0.293031 6.293L1.70703 7.707Z" fill="white"/>
                                            </svg>
                                        </div>}
                                        {(periodResultExpandMobile === true) && <div className="period-result__title__mobile-indicator__collapse" onClick={() => setPeriodResultExpandMobile(false)}>
                                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.293 0.292999L5.99997 4.586L1.70697 0.292999L0.292969 1.707L5.99997 7.414L11.707 1.707L10.293 0.292999Z" fill="white"/>
                                            </svg>
                                        </div>}
                                    </div>
                                </div>
                                <div className="period-result__content">
                                    <div className="period-result__content__item">
                                        <div className="period-result__content__item__label">{translate('Package Price')}</div>
                                        <div className="period-result__content__item__value">
                                            {(itemExperienceActivated !== -1) ? (
                                                `$${new Intl.NumberFormat(getLocaleCode()).format(itemExperienceActivated)}`
                                            ) : (
                                                <GearLoaderCompnt />
                                            )}
                                        </div>
                                    </div>
                                    {(periodResultExpandMobile === true) && (<>
                                        <div className="period-result__content__item">
                                            <div className="period-result__content__item__label">{translate('Timezone')}</div>
                                            <div className="period-result__content__item__value">{countries.flat()?.filter((element: any) => element?.value === selectedOption?.value)[0]?.label}</div>
                                        </div>
                                        <div className="period-result__content__item">
                                            <div className="period-result__content__item__label">{translate('Block Time')}</div>
                                            <div className="period-result__content__item__value">
                                                {(selectedTime != null) ? (
                                                    listTimeLocal?.find((element:any) => element?.value === selectedTime)?.label
                                                ) : (
                                                    <GearLoaderCompnt />
                                                )}
                                            </div>
                                        </div>
                                        <div className="period-result__content__item">
                                            <div className="period-result__content__item__label">{translate('Expiration Date')}</div>
                                            <div className="period-result__content__item__value">
                                                {((itemExperienceActivated !== -1) && (selectedTime != null)) ? (
                                                    moment(rangeDate[1])?.tz(selectedOption?.value)?.subtract(1, 'days')?.format("L")
                                                ) : (
                                                    <GearLoaderCompnt />
                                                )}
                                            </div>
                                        </div>
                                    </>)}
                                </div>
                                <div className="period-result__main-button">
                                    <Button 
                                        label={translate('CONFIRM')} 
                                        onClick={handleOnClickConfirmButton}
                                        disabled={(itemExperienceActivated == -1) || (selectedTime == null) || isRequesting}
                                        isLoading={isRequesting}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`tab-pane fade ${listTab?.[1]?.value === tab && "show active"}`}
                    id={listTab?.[1]?.value}
                    role="tabpanel"
                    aria-labelledby={`${listTab?.[1]?.value}-tab`}
                >
                    <CustomTable
                        classNameNoColumn="col-md-12 col-6 order-md-1 order-1 mobile-column-key"
                        title={translate('Register history')}
                        isHighLightHeader
                        isTextCenter
                        hasOrderColumn
                        structure={TableStructure}
                        forceUpdateTable={forceUpdateTable}
                        fetchData={async (state) =>
                            UserService.getListExperienceRegister({
                            ...state,
                            numberOfTransactionsPerPage: state.limit,
                            page: state.pageNumber,
                            fromDate: "0",
                            toDate: moment().endOf("day").toISOString(),
                            })
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default page;
