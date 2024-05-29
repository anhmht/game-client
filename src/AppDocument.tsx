import Document, { Html, Head, Main, NextScript } from "next/document";
import Useragent from "express-useragent";
import parse from "html-react-parser";
import { EDeviceType } from "./types";
import { ClassNames } from "./modules";
class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    const device = Useragent.parse(ctx.req.headers["user-agent"]);

    return {
      ...initialProps,
      device: device,
    };
  }

  render() {
    // @ts-ignore
    const device = this.props["device"];
    const deviceType = device.isDesktop ? EDeviceType.DESKTOP : EDeviceType.MOBILE;

    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta name="theme-color" content="#c59e57" />
          {/* <!-- ios support --> */}
          <link rel="apple-touch-icon" href="/assets/images/launchericon-96x96.png" />
          <meta name="apple-mobile-web-app-status-bar" content="#1f0039" />
          <meta name="theme-color" content="#ed7523" />
          {/* <link rel="shortcut icon" href="./app/favicon.ico" /> */}

          {/* --------- Include Styles --------- */}
          <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700;900&display=swap" rel="stylesheet" />
          {/* <link rel="stylesheet" href="/assets/styles/user-bootstrap-grid.min.css" /> */}
          {/* <link rel="manifest" href="/manifest.json" /> */}
          {/* --------- End Include Styles --------- */}

          {/* --------- Data Feeds Styles --------- */}
          <script src="/datafeeds/udf/dist/polyfills.js" />
          <script src="/datafeeds/udf/dist/bundle.js" />
          {/* --------- End Data Feeds Styles --------- */}
          {/* <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-8M81EPXG1Taaa"
          ></script> */}
          {/* {parse(`<script>
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', 'G-8M81EPXG1Taaa');
                </script>`)} */}

          {/* {parse(`<script>
                    <!-- Start of LiveChat (www.livechatinc.com) code -->
                    window.__lc = window.__lc || { };
                    window.__lc.license = 13844391;
                    ;(function(n,t,c){function i(n) { return e._h ? e._h.apply(null, n(sad)e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on", c.call(arguments)])},once:function(){i(["once", c.call(arguments)])},off:function(){i(["off", c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call", c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
                    <noscript><a href="https://www.livechatinc.com/chat-with/13844391/" rel="nofollow">Chat with us</a>, powered by <a href="https://www.livechatinc.com/?welcome" rel="noopener nofollow" target="_blank">LiveChat</a></noscript>
                    <!-- End of LiveChat code -->
                    </script>`)} */}

          {/* <!-- Google tag (gtag.js) --> */}
          {parse(`<script async src="https://www.googletagmanager.com/gtag/js?id=G-6PZLSRXKDW"></script>
                <script>
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', 'G-6PZLSRXKDW');
                </script>`)}
          {parse(`<script>
            window.recaptchaOptions = {
              useRecaptchaNet: true
            };
          </script>`)}
        </Head>

        <body className={ClassNames({ [deviceType]: true, App: true })}>
          <Main />
          <NextScript />
          {/* <audio id="sound-win" src="/assets/sound/win.mp3" /> */}
          {/* {parse(`<script src="/assets/js/app.js"></script>`)} */}
          {parse(`<script src="/assets/js/OrgChart.js"></script>`)}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
