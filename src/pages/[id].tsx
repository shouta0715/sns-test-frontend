import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { Layout } from "../components/Layout/Layout";
import { Spin } from "../components/Layout/Spin";
import { useStateContext } from "../context/StateProvider";
import { getAllIds, getPost } from "../hooks/posts";
import { useMutatePosts } from "../hooks/useMutatePosts";
import { Post } from "../types/types";

type Props = {
  post: Post;
};

const detailPage: FC<Props> = ({ post }) => {
  const { deletePostMutate } = useMutatePosts();

  const router = useRouter();

  const { userId, setUserId } = useStateContext();

  useEffect(() => {
    if (userId === "") setUserId("f9607a9f-51dd-401a-b000-4b14b0867942");
  }, []);

  if (deletePostMutate.isLoading) {
    return (
      <Layout title={`${post.title}`}>
        <Spin />
      </Layout>
    );
  }

  if (deletePostMutate.isSuccess) {
    router.push("/MainPost");

    return (
      <Layout title={`${post.title}`}>
        <Spin />
      </Layout>
    );
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={`${post.title}`}>
      <div className=" flex  flex-col items-center justify-center   p-4 ">
        <div className="m-4 text-xl font-bold md:text-3xl">
          <span className="">Title:</span>
          <span className="px-2 ">{post.title}</span>
        </div>
        <div className="px-2 text-lg font-medium md:text-2xl	">
          {post.content}
        </div>
        <div className="my-4 px-10">
          {post.body}
          <button
            type="button"
            onClick={() =>
              deletePostMutate.mutate({
                id: post.id,
                userId,
              })
            }
            className="group relative left-10 top-1 cursor-pointer disabled:opacity-50"
            disabled={post.authorId !== userId}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=" h-6 w-6 rounded-full stroke-red-500"
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
        </div>

        <Link href="/MainPost">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </div>
        </Link>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllIds();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params!.id);

  return {
    props: {
      post,
    },
  };
};

export default detailPage;
