import { motion } from "framer-motion";
import Link from "next/link";
import React, { FC } from "react";
import { Post } from "../../types/types";

type Props = { post: Post };

export const PostItem: FC<Props> = ({ post }) => (
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
      <div className="px-2 text-lg font-medium md:text-2xl	">{post.content}</div>
      <div className="mt-4 px-10 ">{post.body}</div>
    </motion.div>
  </Link>
);
