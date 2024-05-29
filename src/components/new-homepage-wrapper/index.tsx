import { FC, useEffect, useState } from "react";
import { UserService } from "../../services";
import { Icon } from "../icon";
import { Footer } from "./footer";
import { Nav } from "./nav";
import { useSelector } from "react-redux";

type Props = {};

export const NewHomepageWrapper =
  (Component: FC<any>) =>
  ({}: Props) => {
    const user = useSelector((state:any) => state.user);

    const [windowWidth, setWindowWidth] = useState(0);
    const [heightHeader, setHeightHeader] = useState(89);
    const [widthNav, setWidthNav] = useState(100);
    //const [listSupplier, setListSupplier] = useState<any>();
    const [listTopProfit, setListTopProfit] = useState<any>([]);
    const [listLastedProfit, setListLastedProfit] = useState<any>([]);
    const [searchString, setSearchString] = useState<string>("");
    const [currentSupplierIndex, setCurrentSupplierIndex] = useState<number>();

    const listNavLeft = [
      {
        name: "Top",
        icon: <Icon.Top />,
      },
      {
        name: "Promotion",
        icon: <Icon.Gift />,
        href: "https://whitepaper.BEZON.com/promotion",
      },
      {
        name: "Slot Game",
        icon: <Icon.SlotGame />,
        path: "TopSlot",
      },
      {
        name: "Live",
        icon: <Icon.LiveGame />,
        path: "LiveCasino",
      },
      // {
      //   name: "Roulette",
      //   icon: <Icon.Roulette />,
      // },
      {
        name: "Provably Fair",
        icon: <Icon.Provably />,
        href: "https://whitepaper.BEZON.com/provably-fair",
      },
      {
        name: "Support",
        icon: <Icon.Support />,
      },
      {
        name: "Community",
        icon: <Icon.Community />,
        href: "https://whitepaper.BEZON.com/official-link-of-BEZON.com",
      },
    ];

    const litstMenuMobile = [
      {
        name: "Dashboard",
        icon: <Icon.Dashboard />,
      },
      {
        name: "My Notification",
        icon: <Icon.Ring />,
      },
      {
        name: "Promotion Information",
        icon: <Icon.Top />,
      },
      {
        name: "Support",
        icon: <Icon.Support />,
      },
      {
        name: "Community",
        icon: <Icon.Community />,
        href: "https://whitepaper.BEZON.com/official-link-of-BEZON.com",
      },
    ]?.filter((item: any) => (!user ? item?.name !== "Dashboard" : item));

    useEffect(() => {
      // UserService.getListSupplier().then((res: any) => {
      //   setListSupplier(res?.result);
      // });

      UserService.getTopProfit().then((res) => setListTopProfit(res));
      UserService.getLastedProfit().then((res) => setListLastedProfit(res));

      window.scrollTo(0, 0);

      const initialWidth = document.body.clientWidth;
      setWindowWidth(initialWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    if (windowWidth <= 0) return;
    // return (
    //   <div className="new-wrapper">
    //     <div
    //       style={{
    //         marginTop: `${heightHeader}px`,
    //         marginLeft: `${widthNav}px`,
    //       }}
    //     >
    //       <Nav
    //         heightHeader={heightHeader}
    //         listSupplier={listSupplier}
    //         listNavLeft={listNavLeft}
    //         listTopProfit={listTopProfit}
    //         listLastedProfit={listLastedProfit}
    //         getWidth={setWidthNav}
    //         windowWidth={windowWidth}
    //         currentSupplierIndex={currentSupplierIndex}
    //         setCurrentSupplierIndex={setCurrentSupplierIndex}
    //       />
    //       <Component
    //         listSupplier={listSupplier}
    //         listNavLeft={listNavLeft}
    //         heightHeader={heightHeader}
    //         searchString={searchString}
    //         windowWidth={windowWidth}
    //         currentSupplierIndex={currentSupplierIndex}
    //         setCurrentSupplierIndex={setCurrentSupplierIndex}
    //       />
    //       <Footer />
    //     </div>
    //   </div>
    // );
  };
