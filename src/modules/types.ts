export interface IInputSelectOption {
    value: any,
    label: string,
}

export interface IButtonProps {
    label: string,
    onClick: () => void,
    type?: 'button' | 'submit'
}


export interface ILocale {
    key: string,
    label: string,
    isActive: boolean
}

export interface IModuleConfig {
    translate: (id: string, values?: any) => string,
    getLocaleList: () => ILocale[]
}