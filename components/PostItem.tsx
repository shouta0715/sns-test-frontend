import { motion } from "framer-motion";
import React, { FC } from "react";
import { useMutatePosts } from "../hooks/useMutatePosts";
import { Post } from "../types/types";

type Props = { post: Post };

export const PostItem: FC<Props> = ({ post }) => {
  const { deletePostMutate } = useMutatePosts();

  return (
    <motion.div
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className=" relative flex w-full flex-col items-center justify-center border p-4 "
    >
      <div className="m-4 text-3xl font-bold">
        <span className="">Title:</span>
        <span className="px-2 ">{post.title}</span>
      </div>
      <div className="px-2 text-2xl">{post.content}</div>
      <div className="mt-4 px-10">{post.body}</div>
      <button
        type="button"
        onClick={() =>
          deletePostMutate.mutate({
            id: post.id,
            userId: "93057214-99aa-45ca-ab23-f385af300b88",
          })
        }
        className="absolute top-8 right-20"
        disabled={post.authorId !== "93057214-99aa-45ca-ab23-f385af300b88"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 rounded-full stroke-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </motion.div>
  );
};
