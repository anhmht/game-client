import { FC, useEffect, useRef, useState } from "react";
import { Icon } from "../../modules";

export const PopupHomePageWrapper: FC<{
  onClose: () => any;
  loading?: boolean;
  notCloseOutSide?: boolean;
  children?:any;
}> = (props) => {
  const id = `${Date.now()}-popupHomePageWraper`;
  const [fullScreen, setFullScreen] = useState<boolean>(false);

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!props.notCloseOutSide) {
      function handleClickOutside(event: any) {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          props.onClose();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [popupRef]);

  return (
    <div className={`PopupHomePageWrapper ${fullScreen ? "full-screen" : ""}`} id={id}>
      <div className="overlay-page">
        {props.loading && (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>

      <div className="popup-container" ref={props.loading ? null : popupRef}>
        <div className="popup-wraper">
          {!props.loading && (
            <div className="btnClose" onClick={() => props.onClose()}>
              <Icon.ClosePopup />
            </div>
          )}
          {/* <div className="btnFullScreen" onClick={() => setFullScreen(!fullScreen)}>
                        {
                            fullScreen ? <Icon.OffFullScreen /> : <Icon.OnFullScreen />
                        }
                    </div> */}
          <div className="popup-body">{props.children}</div>
          {/* <div className="popup-footer">
                        <button onClick={() => props.onClose()} className="btn-gray">{translate('Close')}</button>
                    </div> */}
        </div>
      </div>
    </div>
  );
};
