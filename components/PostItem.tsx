import { motion } from "framer-motion";
import Link from "next/link";
import React, { FC } from "react";
import { useMutatePosts } from "../hooks/useMutatePosts";
import { Post } from "../types/types";
import { Spin } from "./Spin";

type Props = { post: Post };

export const PostItem: FC<Props> = ({ post }) => {
  const { deletePostMutate } = useMutatePosts();

  if (deletePostMutate.isLoading || deletePostMutate.isSuccess) {
    return <Spin />;
  }

  return (
    <Link href={`/${post.id}`} as={`/${post.id}`}>
      <motion.div
        layout
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className=" relative flex w-full flex-col items-center justify-center border md:p-4 "
      >
        <div className="m-4 text-xl font-bold md:text-3xl">
          <span className="">Title:</span>
          <span className="px-2 ">{post.title}</span>
        </div>
        <div className="px-2 text-lg font-medium md:text-2xl	">
          {post.content}
        </div>
        <div className="mt-4 px-10 ">{post.body}</div>
        <button
          type="button"
          onClick={() =>
            deletePostMutate.mutate({
              id: post.id,
              userId: "d710df2a-9bbc-44d9-a174-231f0c788a53",
            })
          }
          className="absolute bottom-8 right-10 md:top-8 md:right-20"
          disabled={post.authorId !== "d710df2a-9bbc-44d9-a174-231f0c788a53"}
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
    </Link>
  );
};
