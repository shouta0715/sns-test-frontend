import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { StateProvider } from "../context/StateProvider";
import { queryClients } from "../lib/queryClients";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => queryClients());

  return (
    <QueryClientProvider client={queryClient}>
      <StateProvider>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </StateProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
