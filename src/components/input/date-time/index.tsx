import React, { FC, useState, useEffect } from 'react'
// @ts-ignore
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';

import { IInputProps } from '../../../modules';
import { getLocaleKey } from '../../../languages';

export const InputDateTime: FC<IInputProps> = (props) => {
    const [value, setValue] = useState(null) as any;

    const handleChange = (date: any) => {
        let time: any;
        if (date) time = new Date(date).getTime();

        setValue(time);
        props.onChange(time ? new Date(time).toUTCString() : null);
    }

    const convertTime = (time: any) => {
        if (!time) return;
        return new Date(time);
    }

    useEffect(() => {
        setValue(props.defaultValue);
    }, [props.defaultValue, setValue])

    return <DateTimePicker
        className="InputDateTime"
        calendarClassName="InputDateTimeCalendar"
        clockClassName="InputDateTimeClock"
        // maxDetail={maxDetail}
        disableClock={true}
        onChange={handleChange}
        // minDate={convertTime(minDate)}
        // maxDate={convertTime(maxDate)}
        value={convertTime(value)}
        locale={getLocaleKey()}
        disabled={props.isDisabled}
        onCalendarClose={() => props.onTouched()}
        onBlur={() => props.onTouched()}
    />
}