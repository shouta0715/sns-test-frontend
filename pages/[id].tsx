import Link from "next/link";
import React from "react";
import { Layout } from "../components/Layout";

const detailPage = () => (
  <Layout title="詳細">
    <div>
      <Link href="/">
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
          back
        </div>
      </Link>
    </div>
  </Layout>
);

export default detailPage;
