"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import axiosInstance from "../../lib/axiosInstance";
import Unauthorized from "../../components/serverProps/401"; // Import 401 component

// Auth hook
export const useAuth = () => {
  const fetcher = async (url) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Unauthorized"); // Trigger error if no token

    try {
      const response = await axiosInstance.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw new Error(
        err.response?.status === 401 ? "Unauthorized" : "FetchError"
      );
    }
  };

  const { data: user, error } = useSWR("/api/user", fetcher);

  return { user, error };
};

// Dashboard page
const DashboardPage = () => {
  const { user, error } = useAuth();
  const router = useRouter();

  // Redirect to login only if it's an authentication error
  useEffect(() => {
    if (error?.message === "Unauthorized") {
      router.push("/login");
    }
  }, [error, router]);

  if (!user && !error) return <p>Loading...</p>; // Show loading while fetching

  // Show 401 page if authentication failed
  if (error?.message === "Unauthorized") {
    return <Unauthorized />;
  }

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default DashboardPage;
