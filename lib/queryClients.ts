import { QueryClient } from "react-query";

export const queryClients = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return queryClient;
};
