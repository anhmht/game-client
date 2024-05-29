"use client";

import { Routes } from "@/src/AppRoutes";
import { InputSelect } from "@/src/components";
import CustomSelect from "@/src/components/input/custom-select";
import CustomSelectMulti from "@/src/components/input/custom-select-multi";
import { useDeviceType } from "@/src/hook";
import { translate } from "@/src/languages";
import { Button } from "@/src/modules";
import { UserService } from "@/src/services";
import { createCipheriv } from "crypto";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pagination, Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

const page = ({ params }: { params: { params: string } }) => {
  const deviceType = useDeviceType();

  const user = useSelector((state: any) => state.user);
  const listCategory = useSelector((state: any) => state.game.category);
  const listSupplier = useSelector((state: any) => state.game.providers);

  const [listCategorySelect, setListCategorySelect] = useState<any>(null);
  const [listSupplierSelect, setListSupplierSelect] = useState<any>([]);
  const [sortBy, setSortBy] = useState(0);

  const [configIp, setConfigIp] = useState("");
  const [page, setPage] = useState(1);
  const [listGame, setListGame] = useState([]);
  const [totalGame, setTotalGame] = useState(0);
  const [checkLoadMore, setCheckLoadMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [disable, setDisable] = useState(false);

  const encrypt: any = (item: any) => {
    const tableId: string = item.tableId as string;
    const gamePlaform: string = item.gamePlaform as string;
    const gameType: string = item.gameType as string;
    const gameCode: string = item.gameCode as string;
    const gameId: string = item.gameId as string;
    const supplierId: string = item.supplierId as string;

    const algorithm = "aes-256-cbc";
    const iv = "692e44dbbea073fc1a8d1c37ea68dffa";

    const cipher = createCipheriv(algorithm, `${process.env["NEXT_PUBLIC_CRYPTOJS_SECRET_KEY"]}`, Buffer.from(iv, "hex"));

    let content = {
      clientIp: configIp,
      sbo: {
        gameId: gameId,
        tableId: tableId,
      },
      isMobile: deviceType === "Mobile" ? true : false,
      supplierId: supplierId,
      timestamp: Date.now(),
    };

    let encrypted = cipher.update(JSON.stringify(content), "utf8", "hex");
    encrypted += cipher.final("hex");

    localStorage.setItem("content-redirect", encrypted);
  };

  useEffect(() => {
    if (listCategory?.length > 0 && listSupplier?.length > 0) {
      if ((params.params?.[0] === "provider" && listSupplierSelect.length <= 0) || (params.params?.[0] === "game" && !listCategorySelect)) return;

      setDisable(true);

      let payload: any = {
        page,
        pageSize: 25,
        categoryId: [listCategorySelect],
        supplierId: listSupplierSelect,
      };

      if (sortBy == 1)
        payload = {
          ...payload,
          order: "playTimes",
          orderBy: "DESC",
        };
      if (sortBy == 2)
        payload = {
          ...payload,
          order: "tableName",
          orderBy: "ASC",
        };
      if (sortBy == 3)
        payload = {
          ...payload,
          order: "priority",
          orderBy: "ASC",
        };

      UserService.getListGame(payload)
        .then((res) => {
          setListGame((prev) => {
            if (loadingMore) return [...prev, ...res?.result?.data];
            return res?.result?.data;
          });

          setTotalGame(res?.result?.total);
        })
        .finally(() => {
          setLoadingMore(false);
          setDisable(false);
        });
    }
  }, [page, listCategorySelect, listSupplierSelect.length, listCategory, listSupplier, sortBy]);

  useEffect(() => {
    setCheckLoadMore(listGame?.length === totalGame || listGame?.length === 0 ? false : true);
  }, [listGame.length]);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((result) => {
        setConfigIp(result.ip);
      });
  }, []);

  if (listCategory?.length > 0 && listSupplier.length > 0)
    return (
      <div className="games">
        <div className="games-banner row mb24 d-flex">
          <div className="col-12 col-xl-6 mb-2 mb-xl-0">
            <Swiper
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: ".next",
              }}
              modules={[Navigation, Pagination]}
            >
              <SwiperSlide className="position-relative next">
                <img src="/images/banner-games-1.png" alt="" />
              </SwiperSlide>
              <SwiperSlide className="position-relative next">
                <img src="/images/banner-games-2.png" alt="" />
              </SwiperSlide>
              <SwiperSlide className="position-relative next">
                <img src="/images/banner-games-3.png" alt="" />
              </SwiperSlide>
              <SwiperSlide className="position-relative next">
                <img src="/images/banner-games-4.png" alt="" />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="col-4 col-sm-6 col-xl-2 mb-2 mb-sm-0 position-relative">
            <img src="/images/banner-games-5.png" alt="" />
            {/* <div className="games-banner_slide_secondary">
              <span>Best Live casino</span>
            </div> */}
          </div>
          <div className="col-8 col-sm-3 col-xl-2">
            <div className="d-flex flex-sm-column flex-row h-100">
              <div className="position-relative h-full mb10">
                <img src="/images/banner-games-6.png" alt="" />
                {/* <div className="games-banner_slide_secondary">
                  <span>Best Live casino</span>
                </div> */}
              </div>
              <div className="position-relative h-full">
                <img src="/images/banner-games-7.png" alt="" />
                {/* <div className="games-banner_slide_secondary">
                  <span>Best Live casino</span>
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-8 col-sm-3 col-xl-2">
            <div className="d-flex  flex-sm-column flex-row h-100">
              <div className="box-game new-game mb10">
                <span>{translate("new-game")}</span>
                <img src="/assets/images/newgame.png" alt="" />
              </div>
              <div className="box-game promotion">
                <span>{translate("Promotion")}</span>
                <img src="/assets/images/promotion.png" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="games-list row">
          <div className="col-12">
            <div className="games-list_filter mb13">
              <div className="left">
                <h1>{`${translate("All")} ${translate("Games").toLowerCase()}`}</h1>
                <span>{`${listGame.length} / ${totalGame} ${translate("Games")}`}</span>
              </div>
              <div className="right d-flex">
                <div className="filter-item">
                  <div className="label">{translate("Category")}</div>
                  <CustomSelect
                    label={translate("Category")}
                    option={listCategory?.map((item: any) => ({
                      label: item.name,
                      value: item.categoryId,
                    }))}
                    onChange={(values) => setListCategorySelect(values)}
                    defaultValue={listCategory?.filter((item: any) => item?.name === decodeURI(params.params?.[1]))?.[0]?.categoryId}
                  />
                </div>
                <div className="filter-item ml12 mr12">
                  <div className="label">{translate("Providers")}</div>
                  <CustomSelectMulti
                    label={translate("Providers")}
                    option={listSupplier?.map((item: any) => ({
                      label: item.name,
                      value: item.supplierId,
                    }))}
                    onChange={(values) => setListSupplierSelect(values)}
                    defaultValue={[listSupplier?.filter((item: any) => item?.name === decodeURI(params.params?.[1]))?.[0]?.supplierId]}
                  />
                </div>
                <div className="filter-item">
                  <div className="label">{translate("Sort by")}</div>
                  <InputSelect
                    name="sort"
                    onChange={(e) => setSortBy(e !== "" ? +e : 0)}
                    onTouched={() => ""}
                    value={sortBy}
                    options={[
                      {
                        label: translate("Popuplarity"),
                        value: 1,
                      },
                      {
                        label: "A-Z",
                        value: 2,
                      },
                      {
                        label: translate("Top game"),
                        value: 3,
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="games-list_content row row-cols-3 row-cols-sm-5">
              {listGame?.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="game__list__item mb24"
                  onClick={async () => {
                    if (user) {
                      await encrypt(item);
                      window.open(Routes.play.href, "_blank");
                    } else window.open(Routes.login.href, "_blank");
                  }}
                >
                  <div className="game__list__item__thumb">
                    <img src={item?.image} alt="" />
                  </div>
                  <div className="game__list__item__title">{`${item?.tableName}`.toUpperCase()}</div>
                  <div className="game__list__item__description">{item?.gamePlaform}</div>
                </div>
              ))}

              {checkLoadMore && (
                <div
                  className={`w-100 text-center load-more`}
                  onClick={() => {
                    setPage((prev) => (prev += 1));
                    setLoadingMore(true);
                  }}
                >
                  <span className={`${disable && "disable"}`}>
                    {disable ? (
                      <div
                        className="spinner-border text-dark"
                        role="status"
                        style={{
                          width: "15px",
                          height: "15px",
                        }}
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      translate("Load more")
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );

  return <></>;
};

export default page;
