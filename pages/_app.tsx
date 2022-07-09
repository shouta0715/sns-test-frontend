import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClients } from "../lib/queryClients";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClients()}>
    <Component {...pageProps} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default MyApp;
