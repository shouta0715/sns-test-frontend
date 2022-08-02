import Head from "next/head";
import { useRouter } from "next/router";
import React, { FC } from "react";
import Cookie from "universal-cookie";
import { useStateContext } from "../../context/StateProvider";

type Props = {
  children: React.ReactNode;
  title: string;
};

const cookie = new Cookie();

export const Layout: FC<Props> = ({ children, title }) => {
  const { isLogin, setIsLogin } = useStateContext();

  const router = useRouter();

  const changeAdmin = () => {
    if (isLogin) {
      cookie.remove("token");
      router.push("/");
      setIsLogin(false);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="h-screen w-screen font-mono">
      <Head>
        <title>{title}</title>
      </Head>
      <header className="fixed top-0 flex h-8 w-full items-center justify-center   bg-gray-200 text-white md:h-16 md:text-2xl">
        <span className="absolute text-center font-Title text-2xl text-black md:text-4xl">
          AppTest
        </span>
        <div className="relative h-full w-full ">
          <button
            onClick={() => changeAdmin()}
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 text-black md:h-12 md:w-12 ${
                isLogin && "hidden"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 text-black md:h-12 md:w-12 ${
                !isLogin && "hidden"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </header>
      <main className="flex h-full w-full flex-1 flex-col items-center pt-16">
        {children}
      </main>
    </div>
  );
};
