import { IModuleConfig } from "./modules/types";
import { ELocale } from "./types";
import { translate } from "./languages";

const moduleConfig: IModuleConfig = {
    translate: (id: string, values?: any) => translate(id, values),
    getLocaleList: () => [
        {
            key: ELocale.ENGLISH,
            label: 'ENG',
            isActive: true,
        },
        {
            key: ELocale.CHINA,
            label: 'CN',
            isActive: true,
        }
    ]
}

export default moduleConfig;