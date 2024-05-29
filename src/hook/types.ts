export type TDeviceType = 'Desktop' | 'Mobile' | 'Tablet' | null;

export type TTradeCoinType = 'REAL' | 'DEMO'
export type TTradeCoinItem = {
    type: TTradeCoinType;
    label: string;
    amount: number;
    isActive: boolean;
    coinId: number;
}
export type TUseTradeCoinExports = {
    toggleChangeTradeCoin: () => void;
    data: TTradeCoinItem[],
    coinActive: TTradeCoinItem,
    coins: any[],
    isDemo: boolean,
    totalUsdBalance: number,
}