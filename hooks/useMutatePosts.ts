import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Post } from "../types/types";

export const useMutatePosts = () => {
  const queryClient = useQueryClient();

  const createPostMutate = useMutation(
    (post: Omit<Post, "id">) =>
      axios.post(`${process.env.NEXT_PUBLIC_URL}/post`, post),
    {
      onSuccess: () => {
        const previousPosts = queryClient.getQueryData<Post[]>("posts");
        if (previousPosts) {
          queryClient.invalidateQueries("posts");
          //   queryClient.setQueryData("posts", [...previousPosts, res.data]);
        }
      },
    }
  );

  const deletePostMutate = useMutation(
    (post: { id: string; userId: string }) =>
      axios.delete(`${process.env.NEXT_PUBLIC_URL}/post/${post.id}`, {
        data: { userId: post.userId },
      }),
    {
      onSuccess: (_, __) => {
        const previousPosts = queryClient.getQueryData<Post[]>("posts");
        if (previousPosts) {
          queryClient.invalidateQueries("posts");
          // queryClient.setQueryData<Post[]>(
          //   "posts",
          //   previousPosts.filter((post) => post.id !== variables)
          // );
        }
      },
    }
  );

  return { createPostMutate, deletePostMutate };
};
