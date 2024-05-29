"use client";
import { Routes } from "@/src/AppRoutes";
import { Icon } from "@/src/modules";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const user = useSelector((state: any) => state.user);
  const userPageInitializeStatus = useSelector((state: any) => state.main.userPageInitializeStatus);

  useEffect(() => {
    if (userPageInitializeStatus === "completed" && user) {
      push(Routes.userAccountAssets.href);
      localStorage.removeItem("auth-redirect-to");
    }
  }, [user, userPageInitializeStatus]);

  return (
    <div className="auth-page">
      <div className="auth-bg">{children}</div>
    </div>
  );
}
