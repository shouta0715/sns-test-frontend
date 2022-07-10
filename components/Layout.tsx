import Head from "next/head";
import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
  title: string;
};

export const Layout: FC<Props> = ({ children, title }) => (
  <div className="font-mono">
    <Head>
      <title>{title}</title>
    </Head>
    <header className="fixed top-0 flex h-16 w-full items-center  justify-center bg-gray-700 text-4xl text-white">
      Header
    </header>
    <main className="flex h-full w-full flex-1 flex-col items-center pt-16">
      {children}
    </main>
  </div>
);
