import { Poppins } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "react-calendar/dist/Calendar.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import "@/src/styles/main.scss";
import "@/styles/style.scss";
import "./index.scss";
import React, { Suspense } from "react";
import { headers } from "next/headers";
const poppins = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"] });
import Providers from "@/src/redux/Provider";
import Useragent from "express-useragent";
import parse from "html-react-parser";
export default function RootLayout(props: any) {
  const headersList = headers();
  const userAgent = headersList.get("user-agent");
  const device = Useragent.parse(userAgent as any);

  return (
    <html lang="en" prefix="og: http://ogp.me/ns#">
      <head>
        <title>GAM - Revolutionizing Blockchain Lotteries with Memes</title>
        <meta name="description" content="GAM - Revolutionizing Blockchain Lotteries with Memes" />
        <meta property="og:description" content="GAM - Revolutionizing Blockchain Lotteries with Memes" />
        <meta property="twitter:description" content="GAM - Revolutionizing Blockchain Lotteries with Memes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link href="https://fonts.cdnfonts.com/css/itc-kabel-std" rel="stylesheet"></link>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet" />
        {parse(`<script async src="https://www.googletagmanager.com/gtag/js?id=${process.env["GA_TRACKING_ID"]}"></script>`)}
        {parse(`<script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${process.env["GA_TRACKING_ID"]}');
                </script>`)}
      </head>
      <body className={poppins.className}>
        <Providers device={device}>{props.children}</Providers>
        <script src="/assets/js/OrgChart.js"></script>
      </body>
    </html>
  );
}
