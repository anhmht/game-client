"use client";
import { Routes } from "@/src/AppRoutes";
import { CreateAlert, EAlertType } from "@/src/modules";
import { UserService } from "@/src/services";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

const page: FC<any> = (props: any) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserService.getLinkToPlay({
      content: localStorage.getItem("content-redirect"),
    })
      .then((res) => {
        setUrl(res?.result?.entry);
      })
      .catch((err) => {
        CreateAlert({ message: err.message, type: EAlertType.ERROR });
        setTimeout(() => {
          return window.open(Routes.home.href, "_self");
        }, 3000);
      })
      .finally(() => {
        localStorage.removeItem("content-redirect");
      });
  }, []);

  return (
    <div
      style={{
        background: "#000",
      }}
    >
      <div
        className={`position-fixed top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center ${loading ? "d-block" : "d-none"}`}
      >
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <iframe
        src={url}
        onLoad={() =>
          setTimeout(() => {
            setLoading(false);
          }, 5000)
        }
        style={{
          width: "100vw",
          height: "99vh",
          border: "none",
        }}
      ></iframe>
    </div>
  );
};

export default page;
