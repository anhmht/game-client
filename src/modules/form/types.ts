import { FormEvent, FC } from "react";
import { ILocale } from "../types";

export interface IUseFormStructureItem {
  name: string;
  label?: any;
  description?: any;
  validate?: any;
  defaultValue?: any;
  isDisabled?: boolean;
  isVisible?: boolean;
  onChange?: (value: any) => void;
  isMutilLocale?: boolean;
}

export interface IInputProps {
  className?: string;
  name: string;
  value?: any;
  error?: any;
  label?: any;
  description?: any;
  onChange: (value: any, e?: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEvent?: (value: any) => void;
  onTouched: (status?: boolean) => void;
  onFocus?: () => void;
  onClick?: () => void;
  defaultValue?: any;
  isDisabled?: boolean;
  getValue?: (name: string) => any;
  locales?: ILocale[];
  isMutilLocale?: boolean;
  tabIndex?: number;
  placeholder?: string;
  tail?: string;
  trailing?: string;
  ref?: any;
  showImage?: boolean;
  isClear?: boolean;
  limitSize?: number;
  limitWidth?: number;
  limitHeight?: number;
  temp?: number;
  urlExample?: string;
  customTypeAccept?: string[];
  decimalScale?: number;
  suffix?: any;
  customSuffix?: any;
  isSkeletonLoading?: boolean;
}

export interface IUseFormExportProps {
  values: any;
  getValue: (name: string) => any;
  setValues: (value: any) => any;
  setErrors: (value: any) => any;
  handleSubmit: (e?: FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  getInputProps: (fieldName: string) => IInputProps;
  getDirtyFields: () => any;
  isValid: boolean;
  resetForm: (e?: FormEvent<HTMLFormElement>) => any;
}

export interface IUseFormConfigs {
  structure: IUseFormStructureItem[];
  onSubmit: (values: any, dirtyFields: any) => Promise<any> | void;
  isDebug?: boolean;
  enableReinitialize?: boolean;
  onSuccess?: (response?: any) => void;
}

export interface IInputWraperInputProps extends IInputProps {
  label: any;
}

export interface IInputWraperProps {
  label?: any;
  inputProps: IInputProps;
  renderInput?: (state: IInputProps) => any;
  component?: FC<IInputProps>;
  className?: string;
  description?: any;
  enableReinitialize?: boolean;
  isVisible?: boolean;
  isRequired?: boolean;
  isDisabledAutoFill?: boolean;
  tabIndex?: number;
  placeholder?: string;
  tail?: string;
  trailing?: string;
  onChangeEvent?: (value: any) => void;
  onClick?: () => void;
  isDisable?: boolean;
  showImage?: boolean;
  isClear?: boolean;
  limitSize?: number;
  limitWidth?: number;
  limitHeight?: number;
  customTypeAccept?: string[];
  decimalScale?: number;
  suffix?: any;
  customSuffix?: any;
}
