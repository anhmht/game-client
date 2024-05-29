import React, { FC } from "react";
import { ClassNames } from "../../modules";

export interface IUserRowProps {
  justifyContent?: "start" | "end" | "center" | "between" | "around";
  className?: string;
  onClick?: () => void;
  children?: any;
}

export const UserRow: FC<IUserRowProps> = (props:any) => {
  return (
    <div
      className={ClassNames({
        "user-row": true,
        [props.className as string]: !!props.className,
        [`justify-content-${props.justifyContent || "center"}`]: true,
      })}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};
