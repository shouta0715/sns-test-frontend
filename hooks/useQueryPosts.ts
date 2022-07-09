import axios from "axios";
import { useQuery } from "react-query";
import { Post } from "../types/types";

export const useQueryPosts = () => {
  const getPost = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/post`);

    return data;
  };

  return useQuery<Post[], Error>({
    queryKey: "posts",
    queryFn: getPost,
    staleTime: 0,
    refetchInterval: 2000,
  });
};
