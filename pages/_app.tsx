import "bootstrap/dist/css/bootstrap.css";
import "./../styles/style.scss";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  return <Component {...pageProps} />;
}
