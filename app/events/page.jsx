"use client";

import React, { useEffect } from "react";
import Head from "next/head";
import useAuth from "../../lib/useAuth";
import { useRouter } from "next/navigation";

const EventsPage = () => {
  const { user, events, eventsError, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <p className="text-center text-red-500 text-lg">
        Please log in to view events.
      </p>
    );
  }

  return (
    <>
      <Head>
        <title>Events Page</title>
        <meta name="description" content="Events Page Description" />
        <meta property="og:title" content="Events Page" />
        <meta property="og:description" content="Events Page Description" />
        <meta property="og:type" content="website" />
      </Head>
      <main className="min-h-screen bg-blue-200 rounded-md flex flex-col items-center py-8">
        <h1 className="text-4xl font-bold text-center mb-6">Events Page</h1>

        {eventsError ? (
          <p className="text-red-500 text-center text-lg">
            ⚠️ Failed to load events.
          </p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No events found.</p>
        ) : (
          <div className="bg-white w-full max-w-3xl rounded-md p-6 flex flex-col gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 border border-gray-300 rounded-md shadow-sm"
              >
                <h2 className="text-2xl text-gray-700 font-bold">
                  {event.event_name}
                </h2>
                <p className="text-lg text-gray-800">{event.description}</p>
                <div className="mt-2">
                  <h3 className="text-md text-gray-500">{event.event_type}</h3>
                  <span className="text-gray-400 text-sm">
                    {new Date(event.event_date).toDateString()}
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

export default EventsPage;
