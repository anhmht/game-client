import { useEffect } from "react";
import { useSelector, useStore } from "react-redux";

import { ObjectUtils } from "../modules";
import { CookieService, ECookieVariable, MainService, SocketService } from "../services";
import { TDeviceType, TUseTradeCoinExports, TTradeCoinItem } from "./types";
import { translate } from "../languages";
import { useDispatch } from "react-redux";
import { increaseAppLifeCycle } from "../redux/slices/mainSlice";

export const useAppLifeCycle = (handleChange?: () => void) => {
    const dispatch = useDispatch();
    const lifeCycleTime = useSelector((state:any) => state.main.lifeCycleTime);
    const store = useStore();

    useEffect(() => {
        if (lifeCycleTime > 1 && handleChange) handleChange();
    }, [lifeCycleTime])

    // const updateLifeCycle = () => store.dispatch({ type: INCREASE_APP_LIFE_CYCLE });
    const updateLifeCycle = () => dispatch(increaseAppLifeCycle(null));

    const registerSockerServices = () => {
        // console.log("registerSockerServices");
        SocketService.initializeV2();
    };
    const user = useSelector((state:any) => state.user);
    useEffect(() => {
        if (!user) SocketService.disconnect();
        else registerSockerServices();
    }, [user, lifeCycleTime, SocketService.socket]);

    return { lifeCycleTime, updateLifeCycle }
}

export const useDeviceType = (): TDeviceType => {
    const device = useSelector((state:any) => state.main.device);
    const deviceType: TDeviceType = ObjectUtils.getIn(device, 'type');
    return deviceType
}

export const useTradeCoin = () => {
    useAppLifeCycle();

    const userWalletBalancesState = useSelector((state:any) => state.userWalletBalances);
    const balances: any[] = ObjectUtils.getIn(userWalletBalancesState, 'data', []);
    
    const coinsState = useSelector((state:any) => state.coins);
    
    const coins: any[] = ObjectUtils.getIn(coinsState, 'data', [], (coinArr) => coinArr.map((coin: any) => {
        const balance = balances.find(v => v.code === coin.code);
        return {
            ...coin,
            balance: ObjectUtils.getIn(balance, 'amount', 0)
        }
    }));
    
    const tradeRealCoinCode = process.env['NEXT_PUBLIC_TRADE_REAL_COIN_CODE'];
    const tradeDemoCoinCode = process.env['NEXT_PUBLIC_TRADE_DEMO_COIN_CODE'];

    // let tradeCoinCode: string = CookieService.get(ECookieVariable.USER_TRADE_COIN);
    let tradeCoinCode: string = "USD";
    CookieService.set(ECookieVariable.USER_TRADE_COIN, tradeCoinCode)
    

    // Validate
    // if (![tradeRealCoinCode, tradeDemoCoinCode].includes(tradeCoinCode)) {
    //     tradeCoinCode = tradeRealCoinCode;
    //     CookieService.set(ECookieVariable.USER_TRADE_COIN, tradeRealCoinCode)
    // }

    const realBalance = balances.find((coin) => coin.code === tradeRealCoinCode);
    const realCoin = coins.find(v => v.code === tradeRealCoinCode) || {};

    const demoBalance = balances.find((coin) => coin.code === tradeDemoCoinCode);
    const demoCoin = coins.find(v => v.code === tradeDemoCoinCode) || {};

    const handleChangeTradeCoin = () => {
        CookieService.set(
            ECookieVariable.USER_TRADE_COIN,
            ((tradeCoinCode === 'DEMO') ? tradeRealCoinCode : tradeDemoCoinCode) as string
        );
        MainService.forceUpdateApp();
    }

    
    const data: TTradeCoinItem[] = [
        {
            type: 'REAL',
            label: translate('live-account'),
            amount: realBalance && realBalance.amount || 0,
            isActive: tradeCoinCode === tradeRealCoinCode,
            coinId: realCoin.coinId,
        },
        {
            type: 'DEMO',
            label: translate('demo-account'),
            amount: demoBalance && demoBalance.amount || 0,
            isActive: tradeCoinCode === tradeDemoCoinCode,
            coinId: demoCoin.coinId,
        },
    ]

    const coinActive = data.find(v => v.isActive) || data[0]
    
    
    const coinsArr = coinActive.type === 'DEMO' ? coins.filter((v: any) => v.code === 'DEMO') : coins.filter((v: any) => v.code !== 'DEMO')
    
    //const totalUsdBalance: number = coins.filter(v => v.code !== 'DEMO').reduce((sum,item) => sum + item.balance * item.toUsd, 0);
    let totalUsdBalance: number
    if(coinActive.type !== 'DEMO'){
        totalUsdBalance = coinsArr.reduce((sum,item) => sum + item.balance * item.toUsd, 0);
    }else{
        totalUsdBalance = coinsArr.reduce((sum,item) => sum + item.balance, 0);
    }
    

    const getIsDemo = (): boolean => CookieService.get(ECookieVariable.USER_TRADE_COIN) === 'DEMO'

    return {
        toggleChangeTradeCoin: handleChangeTradeCoin,
        data,
        coinActive,
        coins: coinsArr.reverse(),
        getIsDemo,
        totalUsdBalance,
        coinsState,
        demoCoin,
    }
}