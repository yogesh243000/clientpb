import Head from "next/head";
import React from "react";
import { AboutUs } from "../../components/data/data";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About Us</title>
        <meta name="description" content="About MyApp" />
        <meta property="og:title" content="About Us" />
        <meta property="og:description" content="About MyApp" />
        <meta property="og:type" content="website" />
      </Head>

      <main className=" bg-blue-200 rounded-md flex flex-col items-center py-8 px-4 sm:px-6 md:px-8">
        <div className="bg-white rounded-md shadow-md border border-black p-4">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          {AboutUs.map((about, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-xl font-semibold">{about.title}</h2>
              <p>{about.content}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default AboutPage;
