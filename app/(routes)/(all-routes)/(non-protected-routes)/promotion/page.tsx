"use client";

import { translate } from "@/src/languages";
import { useSelector } from "react-redux";

const page = () => {
  const detailNews = useSelector((state: any) => state.news.detailNews);

  return (
    <section>
      <h1>{translate("news")}</h1>

      {detailNews?.length > 0 ? (
        <>
          <div className="news__img">
            <img src={detailNews?.[0]?.image} alt="" />
          </div>

          <div className="news__subtitle">{detailNews?.[0]?.title}</div>
          <div
            className="news__content"
            dangerouslySetInnerHTML={{
              __html: `${detailNews?.[0]?.content}`,
            }}
          ></div>
        </>
      ) : (
        translate("no-news")
      )}
    </section>
  );
};

export default page;
