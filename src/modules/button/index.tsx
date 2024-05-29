import React, { FC, useState, CSSProperties, SyntheticEvent } from "react";

import { Icon } from "../icon";
import { ClassNames } from "../utils";

export type TButtonStyleType = "primary" | "secondary" | "rejected";
// | "success"
// | "primary"
// | "info"
// | "danger"
// | "warning"
// | "dark"
// | "success-outline"
// | "primary-outline"
// | "info-outline"
// | "danger-outline"
// | "warning-outline"
// | "dark-outline"
// | "grey"
// | "grey-outline";
export type TButtonType = "button" | "submit" | "reset";

export interface IButtonProps {
  isVisible?: boolean;
  label: any;
  onClick?: any;
  isMiddle?: boolean;
  style?: CSSProperties;
  type?: TButtonType;
  buttonType?: TButtonStyleType;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  icon?: () => any;
  id?: string;
}

const Wraper: any = (props: any) => {
  if (props.isMiddle) return <div className="Button_Wraper_Middle">{props.children}</div>;
  return props.children;
};

export const Button: FC<IButtonProps> = ({
  isVisible = true,
  label,
  type = "button",
  onClick,
  isMiddle = false,
  style,
  buttonType = "primary",
  isLoading,
  className,
  disabled,
  icon,
  id,
}) => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const loading = isButtonLoading || isLoading;

  const buttonClassName = ClassNames({
    Button: true,
    middle: isMiddle,
    loading: !!loading,
    [buttonType as string]: !!buttonType,
    [className as string]: !!className,
    disabled: disabled,
  });

  const handleClick = async (e?: SyntheticEvent) => {
    if (isButtonLoading || disabled) return;
    if (e) e.preventDefault();
    if (typeof isLoading !== "boolean") setIsButtonLoading(true);
    await onClick();
    if (typeof isLoading !== "boolean") setIsButtonLoading(false);
  };

  if (!isVisible) return null;

  return (
    <Wraper isMiddle={isMiddle}>
      {(() => {
        if (onClick)
          return (
            <button id={id} disabled={disabled} style={style} type={type} className={buttonClassName} onClick={handleClick}>
              {/* <Icon.Button /> */}
              <div className="content-btn">
                <span className="label">{label}</span>

                {icon ? icon() : null}

                {loading ? (
                  <div className="iconLoading">
                    <Icon.Loading />
                  </div>
                ) : null}
              </div>
            </button>
          );

        return (
          <button id={id} disabled={disabled} style={style} type={type} className={buttonClassName}>
            {/* <Icon.Button /> */}
            <div className="content-btn">
              <span className="label">{label}</span>

              {icon ? icon() : null}

              {loading ? (
                <div className="iconLoading">
                  <Icon.Loading />
                </div>
              ) : null}
            </div>
          </button>
        );
      })()}
    </Wraper>
  );
};
