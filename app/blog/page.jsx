"use client";
import useAuth from "../../lib/useAuth";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const BlogPage = () => {
  const { user, blog, blogError, isAuthenticated } = useAuth();

  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);
  if (!isAuthenticated) {
    return (
      <p className="text-center text-red-500 text-lg">
        Please log in to view blog posts.
      </p>
    );
  }

  return (
    <>
      <Head>
        <title>Blog Page</title>
        <meta name="description" content="Blog Page Description" />
        <meta property="og:title" content="Blog Page" />
        <meta property="og:description" content="Blog Page Description" />
        <meta property="og:type" content="website" />
      </Head>
      <main className="min-h-screen bg-blue-200 rounded-md flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-center">Blog Page</h1>
        {blogError ? (
          <p className="text-red-500 text-center text-lg">
            Failed to load blog posts
          </p>
        ) : blog.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No blog posts found.
          </p>
        ) : (
          <div className="bg-white m-4 rounded-md p-4 flex flex-col gap-4">
            {blog.map((post) => (
              <div key={post.id} className="p-4 border rounded-md">
                <h1 className="text-2xl text-gray-700 font-bold">
                  {post.title}
                </h1>
                <p className="text-xl text-gray-800">{post.content}</p>
                <div className="mt-4">
                  <h2 className="text-lg text-gray-500">{post.author}</h2>
                  <span className="text-gray-400 text-xs">
                    {post.publish_date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default BlogPage;
