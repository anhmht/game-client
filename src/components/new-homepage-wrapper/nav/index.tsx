import { useEffect, useRef, useState } from "react";
import { Icon } from "../../icon";
import { Accordion } from "./accordion";
import { translate } from "../../../languages";
import { CreateAlert, EAlertType, NumberUtils } from "../../../modules";
import { scroller } from "react-scroll";
import CopyToClipboard from "react-copy-to-clipboard";
import { UserService } from "../../../services";
import { Routes } from "../../../AppRoutes";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

type Props = {
  listSupplier?: any;
  listNavUser?: any;
  listNavLeft?: any;
  listTopProfit?: any;
  listLastedProfit?: any;
  heightHeader: any;
  getWidth: (width: number) => void;
  windowWidth?: number;
  currentSupplierIndex?: any;
  setCurrentSupplierIndex?: (value: any) => void;
};

export const Nav = ({
  heightHeader,
  listSupplier,
  listNavLeft,
  listTopProfit,
  listLastedProfit,
  getWidth,
  listNavUser,
  windowWidth,
  currentSupplierIndex,
  setCurrentSupplierIndex,
}: Props) => {
  const navWidth = useRef<any>(null);
  const pathname = usePathname()

  const user = useSelector((state:any) => state.user);

  const [showMorePopular, setShowMorePopular] = useState(false);
  const [showMoreRecent, setShowMoreRecent] = useState(false);
  const [showMoreLasted, setShowMoreLasted] = useState(false);

  const renderPopular = () => (
    <>
      <div className="newNav-right_item">
        <div style={{ width: "14px" }}></div>
        <div>All providers</div>
      </div>
      {listSupplier
        ?.filter((item: any, idx: number) => (!showMorePopular ? idx < 5 : idx >= 0))
        ?.map((item: any, idx: number) => (
          <div
            key={idx}
            className="newNav-right_item mt4"
            onClick={() => {
              if (windowWidth && setCurrentSupplierIndex) {
                scroller.scrollTo("LiveCasino", {
                  offset: windowWidth < 576 ? -280 : -92,
                  delay: 0,
                });
                if (currentSupplierIndex !== item?.supplierId) setCurrentSupplierIndex(item?.supplierId);
              }
            }}
          >
            <Icon.Top />
            {item?.name}
          </div>
        ))}
      {listSupplier?.length > 5 && (
        <div className="newNav-right_item mt4" onClick={() => setShowMorePopular((prev) => !prev)}>
          {!showMorePopular ? translate("show_more") : translate("hidden")}
        </div>
      )}
    </>
  );

  const renderRecent = () => (
    <>
      {listTopProfit
        ?.filter((item: any, idx: number) => (!showMoreRecent ? idx < 5 : idx >= 0))
        ?.map((item: any, idx: number) => (
          <div key={idx} className="newNav-right_item mt4">
            <img src={item?.thumnail || "/assets/images/new_homepage/RecentDemo.png"} alt="" />
            <div>
              <div className="newNav-right_item-title"> {item?.gameType}</div>
              <div className="d-flex align-items-center">
                <Icon.Cherry />
                <span className="ml6">{NumberUtils.toFormatNumber(item?.topAmount)} USDT</span>
              </div>
            </div>
          </div>
        ))}
      {listTopProfit?.length > 5 && (
        <div className="newNav-right_item mt4" onClick={() => setShowMoreRecent((prev) => !prev)}>
          {!showMoreRecent ? translate("show_more") : translate("hidden")}
        </div>
      )}
    </>
  );

  const renderLastestWin = () => (
    <>
      {listLastedProfit
        ?.filter((item: any, idx: number) => (!showMoreLasted ? idx < 5 : idx >= 0))
        ?.map((item: any, idx: number) => (
          <div key={idx} className="newNav-right_item mt4">
            <img src={item?.thumnail || "/assets/images/new_homepage/RecentDemo.png"} alt="" />
            <div>
              <div className="newNav-right_item-title"> {item?.gameType}</div>
              <div>{NumberUtils.toFormatNumber(item?.profit)} USDT</div>
            </div>
          </div>
        ))}
      {listLastedProfit?.length > 5 && (
        <div className="newNav-right_item mt4" onClick={() => setShowMoreLasted((prev) => !prev)}>
          {!showMoreLasted ? translate("show_more") : translate("hidden")}
        </div>
      )}
    </>
  );

  const listAccordion = [
    {
      title: "Popular Provider",
      content: renderPopular(),
    },
    {
      title: "Recent Big Wins",
      content: renderRecent(),
    },
    {
      title: "Lastest Win",
      content: renderLastestWin(),
    },
  ];

  useEffect(() => {
    const initialWidth = navWidth?.current?.offsetWidth;
    getWidth(initialWidth);

    const handleResize = () => {
      getWidth(navWidth?.current?.offsetWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navWidth?.current?.offsetWidth]);

  return (
    <nav
      ref={navWidth}
      className="position-fixed d-none d-sm-flex align-items-start newNav"
      style={{ top: `${heightHeader}px`, left: "0", bottom: "0", right: "0" }}
    >
      <div
        className="newNav-left"
        style={{
          minWidth: listNavLeft ? "100px" : "330px",
        }}
      >
        {listNavLeft &&
          listNavLeft?.map((item: any, idx: number) => (
            <div
              className="mb20 newNav-left_item_homepage"
              key={idx}
              onClick={() => {
                item?.href && window.open(item?.href, "_blank");
                item?.path &&
                  scroller.scrollTo(item?.path, {
                    offset: -120,
                    delay: 0,
                  });
              }}
            >
              <div className="icon">{item?.icon}</div>
              {item?.name}
            </div>
          ))}
        {listNavUser && (
          <>
            <div className="d-flex align-items-center justify-content-between newUser-bg">
              <div className="mr10 newUser flex-grow-1">
                <img width={48} height={48} src="/assets/images/new_homepage/NewUser.png" alt="User" />
                {/* @ts-ignore */}
                <CopyToClipboard
                  text={user?.userId}
                  onCopy={() => {
                    CreateAlert({
                      message: translate("Copied UID"),
                      type: EAlertType.SUCCESS,
                    });
                  }}
                >
                  <div className="value flex-grow-1">
                    <span>{user?.firstName}</span>
                    <div className="d-flex align-items-center">
                      <p>UID {user?.userId}</p>
                      <div className="icon">
                        <Icon.Copy />
                      </div>
                    </div>
                  </div>
                </CopyToClipboard>
              </div>
            </div>
            {listNavUser?.map((item: any, idx: number) => (
              <div
                className={`newNav-left_item_user ${pathname === item?.href && "active"}`}
                key={idx}
                onClick={() => {
                  item?.push();
                }}
              >
                <div className="icon">{item?.icon}</div>
                {item?.name}
              </div>
            ))}
            <div
              className="newNav-left_item_user"
              onClick={() => {
                UserService.logout();
                Routes.homePage.push();
              }}
            >
              <div className="icon">
                <Icon.Logout />
              </div>
              {"Logout"}
            </div>
          </>
        )}
      </div>
      {listSupplier && listTopProfit && listLastedProfit && (
        <div className="newNav-right">
          <Accordion items={listAccordion} />
        </div>
      )}
    </nav>
  );
};
