import axios from "axios";
import { useQuery } from "react-query";
import { Post } from "../types/types";

export const useQueryPosts = () => {
  const getUserId = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/post`);

    return data;
  };

  return useQuery<Post[], Error>({
    queryKey: "userId",
    queryFn: getUserId,
    staleTime: Infinity,
    refetchInterval: 20000,
    cacheTime: Infinity,
  });
};
