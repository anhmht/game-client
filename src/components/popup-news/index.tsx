import { translate } from "../../languages";
import { PopupHomePageWrapper } from "../poup-home-page";

type Props = {
  onClose: () => void;
  loading?: any;
  notCloseOutSide: boolean;
  data?: any;
};

export const PopupNews = (props: Props) => {
  return (
    <div className="popup-news">
      <PopupHomePageWrapper onClose={() => props.onClose()} notCloseOutSide={props.notCloseOutSide} loading={props.loading}>
        <div className="popup--news">
          <div className="popup--news__title">{translate("news")}</div>

          <div className="popup--news__img">
            <img src={props?.data?.image} alt="" />
          </div>

          <div className="popup--news__subtitle">{props?.data?.title}</div>
          <div
            className="popup--news__content"
            dangerouslySetInnerHTML={{
              __html: `${props?.data?.content}`,
            }}
          ></div>
        </div>
      </PopupHomePageWrapper>
    </div>
  );
};
