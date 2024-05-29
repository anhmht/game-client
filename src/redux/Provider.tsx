"use client"

import { Provider } from "react-redux";
import { store } from "./store";
import { setDevice } from "./slices/mainSlice";
import { useEffect } from "react";
import { EDeviceType } from "../types";

function Providers(props:any) {
    useEffect(() => {
        store.dispatch(setDevice({
            type: props?.device.isDesktop ? EDeviceType.DESKTOP : EDeviceType.MOBILE,
            platform: props?.device.platform,
            os: props?.device.os,
            version: props?.device.version,
            source: props?.device.source,
        }));
    }, [])
    return <Provider store={store}>{props.children}</Provider>
}

export default Providers;