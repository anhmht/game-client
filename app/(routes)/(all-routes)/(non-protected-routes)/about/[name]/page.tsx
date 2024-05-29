"use client";

import { Routes } from "@/src/AppRoutes";
import { NewsService } from "@/src/services/new";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const page = (props: Props) => {
  const router: any = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    NewsService.getNewsBySlug(`${params?.name}`)
      .then((res) => {
        if (Object.keys(res).length <= 0) router.push(Routes.home.href, { scroll: true });
        else {
          setData(res);
          setLoading(false);
        }
      })
      .catch(() => router.push(Routes.home.href, { scroll: true }));
  }, [params?.name]);

  if (loading)
    return (
      <div className="dasboard-loading">
        <img src="/assets/images/main-logo.png" alt="" />
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );

  return (
    <div className="d-flex align-items-center justify-content-center About-news">
      <div>
        <h2 className="text-center">{data?.title}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: data?.content,
          }}
        ></div>
      </div>
    </div>
  );
};

export default page;
