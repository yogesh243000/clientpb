"use client";
import useAuth from "../../lib/useAuth";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const MemberPage = () => {
  const { user, player, isAuthenticated, playerError, teams } = useAuth();

  const router = useRouter();

  // Redirect if the user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // If not authenticated, show a message
  if (!isAuthenticated) {
    return (
      <p className="text-center text-red-500 text-lg">
        Please log in to view member profiles.
      </p>
    );
  }

  return (
    <>
      <Head>
        <title>Player Page</title>
        <meta name="description" content="Member Page Description" />
        <meta property="og:title" content="Member Page" />
        <meta property="og:description" content="Member Page Description" />
        <meta property="og:type" content="website" />
      </Head>
      <main className="min-h-screen bg-blue-200 rounded-md flex flex-col items-center py-8 px-4 sm:px-6 md:px-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Member Page
        </h1>

        {/* Error handling for failed player data load */}
        {playerError ? (
          <p className="text-red-500 text-center text-lg">
            Failed to load player profile.
          </p>
        ) : player.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No player found.</p>
        ) : (
          <div className="bg-white w-full max-w-4xl rounded-md p-6 gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {/* Display player details */}
            {player.map((playerItem) => (
              <div
                className="bg-white rounded-md p-6 flex flex-col gap-6 border border-gray-200 shadow-md"
                key={playerItem.id}
              >
                <h2 className="text-xl sm:text-2xl text-gray-700 font-bold">
                  {playerItem.name || "Unknown Player"}
                </h2>
                <p className="text-sm sm:text-lg text-gray-800">
                  Age: {playerItem.age || "N/A"}
                </p>
                <p className="text-sm sm:text-lg text-gray-800">
                  Position: {playerItem.position || "Unknown Position"}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default MemberPage;
