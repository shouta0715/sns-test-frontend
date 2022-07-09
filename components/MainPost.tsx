import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useMutatePosts } from "../hooks/useMutatePosts";
import { useQueryPosts } from "../hooks/useQueryPosts";
import { Layout } from "./Layout";
import { PostItem } from "./PostItem";

export const MainPost = () => {
  const { isLoading, isError, data } = useQueryPosts();
  const [input, setInput] = useState({
    title: "",
    content: "",
    body: "",
  });

  const { createPostMutate } = useMutatePosts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const create = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.title) {
      createPostMutate.mutate({
        title: input.title,
        content: input.content,
        body: input.body,
        authorId: "93057214-99aa-45ca-ab23-f385af300b88",
      });
      setInput({ title: "", content: "", body: "" });
    }
  };

  return (
    <Layout title="posts">
      <div className=" my-4 flex w-full flex-col items-center justify-center p-4">
        <form className="flex flex-col space-y-4" onSubmit={create}>
          <input
            type="text"
            placeholder="title"
            className="rounded border-2 border-black px-4 py-2"
            onChange={(e) => setInput({ ...input, title: e.target.value })}
            value={input.title}
          />
          <input
            type="text"
            placeholder="content"
            className="rounded border-2 border-black px-4 py-2"
            onChange={(e) => setInput({ ...input, content: e.target.value })}
            value={input.content}
          />
          <input
            type="textarea"
            className="textarea h-48 w-[400px] border-black"
            placeholder="body"
            onChange={(e) => setInput({ ...input, body: e.target.value })}
            value={input.body}
          />
          <div className="flex w-full items-center justify-center">
            <button
              type="submit"
              className="ml-4 rounded-md border-2 bg-indigo-500 py-2 px-4 text-white hover:bg-indigo-600"
            >
              追加
            </button>

            <button
              type="button"
              className="ml-4 rounded-md border-2 bg-red-500 py-2 px-4 text-white hover:bg-red-600"
              onClick={() => setInput({ title: "", content: "", body: "" })}
            >
              キャンセル
            </button>
          </div>
        </form>
      </div>
      <ul className="flex w-full flex-col items-center justify-center">
        {data?.map((post) => (
          <li key={post.id} className=" w-full ">
            <AnimatePresence>
              <PostItem post={post} />
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </Layout>
  );
};