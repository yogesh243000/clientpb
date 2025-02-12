import React from "react";
import { HomeData } from "../components/data/data";
import Image from "next/image";
import Head from "next/head";
const HomePage = () => {
  return (
    <>
      <Head>
        <title>MyApp</title>
        <meta name="description" content="My App" />
        <meta property="og:title" content="MyApp" />
        <meta property="og:description" content="My App" />
        <meta property="og:type" content="website" />
      </Head>
      <main className="bg-blue-200 rounded-md flex flex-col items-center py-8 px-4 sm:px-6 md:px-8">
        <div className="bg-white rounded-md shadow-md border border-black p-4">
          {HomeData.map((data, index) => (
            <div
              key={index}
              className="flex items-center justify-center flex-col"
            >
              <h2 className="text-center text-4xl font-semibold">
                {data.title}
              </h2>
              <p className="mt-6 ">{data.content}</p>
              <Image
                src={data.image}
                width={700}
                height={700}
                alt="home image"
                className="rounded-md shadow-md mt-4"
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default HomePage;
