import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { StateProvider } from "../context/StateProvider";
import { queryClients } from "../lib/queryClients";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClients()}>
    <StateProvider>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </StateProvider>
  </QueryClientProvider>
);

export default MyApp;
