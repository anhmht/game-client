import React, { FC, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { Icon } from "../icon";

interface INotiItem {
  id?: any;
  title?: string;
  message: string;
  secondTimeout?: number;
  isHover?: boolean;
}

export interface INotiPayload {
  title?: string;
  message: string;
}

let setNotiState: any;

export const onError = (res: any) => CreateNoti(res.alert);

export function CreateNoti(payload: INotiPayload, secondTimeout: number = 3) {
  try {
    const id = Date.now();
    // ============================ Add alert ============================
    setNotiState((state: INotiItem[]) => [
      ...state,
      { ...payload, id, secondTimeout },
    ]);

    // ============================ Auto remove ============================
    const onRemove = () =>
      setNotiState((state: INotiItem[]) => {
        const item: any = state.find((v) => v.id === id);
        if (item && item.isHover) return state;
        return state.filter((v) => v.id !== id);
      });

    if (secondTimeout)
      setTimeout(() => {
        onRemove();
      }, secondTimeout * 1000);
  } catch (error) {
    console.error(error);
  }
}

export const Noti: FC = () => {
  const [data, setData] = useState<INotiItem[]>([]);

  setNotiState = setData;

  return (
    <div className="Noti">
      {/* @ts-ignore */}
      <TransitionGroup className="noti-list">
        {data.map((item, key: number) => {
          return (<>
            {/* @ts-ignore */}
            <CSSTransition key={item.id} timeout={500} classNames="Noti__Item">
              <div
                className="Noti__Item"
                key={key}
                // onMouseEnter={() => { if (!item.isHover) setData(state => state.map(v => v.id === item.id ? { ...v, isHover: true } : v)) }}
              >
                <div className="content">
                  <div className="title">{item.title}</div>
                  <div className="message">{item.message}</div>
                </div>

                <div
                  className="btnRemove"
                  onClick={() =>
                    setData((state) => state.filter((v) => v.id !== item.id))
                  }
                >
                  <Icon.Close />
                </div>
              </div>
            </CSSTransition>
          </>);
        })}
      </TransitionGroup>
    </div>
  );
};
