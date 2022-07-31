import axios from "axios";
import { Post } from "../types/types";

export const getAllIds = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/post`);

  return data?.map((post: Post) => ({ params: { id: post.id.toString() } }));
};

export const getPost = async (id: string | string[] | undefined) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/post/${id}`);

  return data;
};
