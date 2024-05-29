import { IModuleConfig } from "./types";
import { ObjectUtils } from "./utils";
import config from '../module.config';

export const moduleConfig: IModuleConfig = {
    translate: ObjectUtils.getIn(config, 'translate', () => ''),
    getLocaleList: ObjectUtils.getIn(config, 'getLocaleList', () => []),
}