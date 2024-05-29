import React, { FC, useState } from "react";

// @ts-ignore
import { DateTimeUtils, ClassNames, ITableFilterInputProps } from "@/src/modules";
import { getLocaleKey, translate } from "@/src/languages";
// @ts-ignore
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import { Icon } from "../../icon";
import moment from "moment";
import _ from "lodash";

interface ITableFilterRangeTimeInputProps extends ITableFilterInputProps {
  fromKey: string;
  toKey: string;
  format?: string;
}

export const TableFilterRangeTimeInput: FC<ITableFilterRangeTimeInputProps> = (props) => {
  return (
    <InputDateTimeRange
      startTimeDefaultValue={(props.params[props.fromKey] ? new Date(props.params[props.fromKey]) : undefined) as any}
      endTimeDefaultValue={(props.params[props.fromKey] ? new Date(props.params[props.toKey]) : undefined) as any}
      onChange={(e) => {
        if (e) props.onChange({ [props.fromKey]: moment(e.startTime).format(), [props.toKey]: moment(e.endTime).format() });
        else props.onChange({ [props.fromKey]: "", [props.toKey]: "" });
      }}
      format={_.isNil(props?.format) ? "dd/MM/y HH:mm:ss" : props.format}
    />
  );
};

// ============================ Date Time ============================
type IDateTimeProps = {
  onChange: (time: number) => void;
  maxDetail?: string;
  isSecondTime?: boolean;
  locale?: string;
  value?: any;
  minDate?: number;
  maxDate?: number;
  className?: string;
  disabled?: boolean;
  onBlur?: ((event?: React.FocusEvent<HTMLInputElement>) => void) | undefined;
  onFocus?: ((event?: React.FocusEvent<HTMLInputElement>) => void) | undefined;
  defaultValue?: number;
  format?: string;
};

export const InputDateTime: FC<IDateTimeProps> = (props) => {
  const { onChange, minDate, maxDate, maxDetail, isSecondTime = false, locale = "en-GB", disabled, className, format }: any = props;

  const handleChange = (date: any) => {
    let time: any;

    if (date) {
      time = new Date(date);
      if (isSecondTime) time = DateTimeUtils.timeToSeconds(date);
    }

    if (onChange) return onChange(time);
  };

  const convertTime = (time: any) => {
    if (!time) return;
    if (isSecondTime) return DateTimeUtils.secondsToTime(time);
    return new Date(time);
  };

  return (
    <DateTimePicker
      className={`InputDateTime ${className}`}
      calendarClassName="InputDateTimeCalendar"
      clockClassName="InputDateTimeClock"
      calendarIcon={<Icon.Calenadar />}
      maxDetail={maxDetail}
      disableClock={true}
      onChange={handleChange}
      minDate={convertTime(minDate)}
      maxDate={convertTime(maxDate)}
      value={convertTime(props.value)}
      locale={getLocaleKey()}
      disabled={disabled}
      format={format}
      clearIcon={null}
      onCalendarClose={() => {
        if (props.onFocus) props.onFocus();
      }}
      onCalendarOpen={() => {
        if (props.onBlur) props.onBlur();
      }}
      onBlur={(e: any) => {
        if (props.onBlur) props.onBlur(e);
      }}
      onFocus={(e: any) => {
        if (props.onFocus) props.onFocus(e);
      }}
    />
  );
};

// ============================ Date Time Range ============================
interface ITimeRangeValue {
  startTime: number;
  endTime: number;
}

interface IDateTimeRangeProps {
  maxDetail?: string;
  isSecondTime?: boolean;
  locale?: string;
  value?: any;
  minDate?: number;
  maxDate?: number;
  className?: string;
  disabled?: boolean;

  startTimeDefaultValue?: number;
  endTimeDefaultValue?: number;
  onChange: (value: ITimeRangeValue | null) => any;
  format?: string;
}

export const InputDateTimeRange: FC<IDateTimeRangeProps> = (props) => {
  const { onChange, minDate, maxDate, isSecondTime, className } = props;
  const [startTime, setStartTime] = useState<any>(props.startTimeDefaultValue);
  const [endTime, setEndTime] = useState<any>(props.endTimeDefaultValue);

  // ============================ Functions ============================
  const handleChangeRange = (type: "startTime" | "endTime", date: any) => {
    if (type === "startTime") {
      if (endTime && date) onChange({ startTime: date, endTime });
      if (!endTime && !date) onChange(null);
      if (!date) {
        setStartTime("");
        return;
      }
      date = new Date(date);
      setStartTime(date);
    }

    if (type === "endTime") {
      if (startTime && date) onChange({ startTime, endTime: date });
      if (!startTime && !date) onChange(null);
      if (!date) {
        setEndTime("");
        return;
      }
      date = new Date(date);
      setEndTime(date);
    }
  };

  return (
    <div
      className={ClassNames({
        InputDateTimeRange: true,
        [className as string]: !!className,
        disabled: props.disabled,
      })}
    >
      <div className="input">
        {/* <div className="label">{translate("From")}</div> */}
        <InputDateTime
          value={startTime}
          isSecondTime={isSecondTime}
          minDate={isSecondTime && minDate ? minDate * 1000 : minDate}
          onChange={(date: any) => handleChangeRange("startTime", date)}
          format={_.isNil(props?.format) ? "dd/MM/y HH:mm:ss" : props.format}
        />
      </div>
      <span className="separation" style={{marginRight: '7px'}}>-</span>
      <div className="input">
        {/* <div className="label">{translate("To")}</div> */}
        <InputDateTime
          value={endTime}
          isSecondTime={isSecondTime}
          onChange={(date: any) => handleChangeRange("endTime", date)}
          minDate={startTime}
          maxDate={isSecondTime && maxDate ? maxDate * 1000 : maxDate}
          format={_.isNil(props?.format) ? "dd/MM/y HH:mm:ss" : props.format}
        />
      </div>
    </div>
  );
};
