import React from "react";
import { Icon } from "../../icon";
import { scroller } from "react-scroll";

type Props = {
  listNavLeft: any;
  heightHeader: any;
};

export const NavMobi = ({ listNavLeft, heightHeader }: Props) => {
  return (
    <div
      className="newNavMobile pd12 d-flex d-sm-none"
      style={{
        top: `${heightHeader}px`,
      }}
    >
      {listNavLeft?.map((item: any, idx: number) => (
        <div
          className="newNavMobile-item mb16"
          key={idx}
          onClick={() => {
            item?.href && window.open(item?.href, "_blank");
            item?.path &&
              scroller.scrollTo(item?.path, {
                offset: -280,
                delay: 0,
              });
          }}
        >
          <div className="icon">{item?.icon}</div>
          <span> {item?.name}</span>
        </div>
      ))}
    </div>
  );
};
