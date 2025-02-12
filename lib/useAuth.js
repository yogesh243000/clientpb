import useSWR from "swr";
import axiosInstance from "../lib/axiosInstance";
import { useState, useEffect } from "react";

const fetcher = async (url) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return { error: "Unauthorized: Please log in." };
  }

  try {
    const response = await axiosInstance.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (err) {
    return {
      error:
        err.response?.status === 401
          ? "Unauthorized: Please log in."
          : "FetchError",
    };
  }
};

const useAuth = () => {
  const { data: user, error } = useSWR("/api/user", fetcher);
  const { data: blogData, error: blogError } = useSWR("/api/v1/blog", fetcher);
  const { data: events, error: eventsError } = useSWR(
    "/api/v1/events",
    fetcher
  );
  const { data: playerData, error: playerError } = useSWR(
    "api/v1/player",
    fetcher
  );
  const { data: teamsData, error: teamsError } = useSWR(
    "/api/v1/team",
    fetcher
  );

  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (error?.error === "Unauthorized: Please log in.") {
      setAuthError("You need to log in to access this page.");
    }
  }, [error]);

  return {
    user,
    authError, // Expose this error to show a login prompt in the UI
    blog: blogData?.data?.data || blogData?.data || [],
    blogError,
    events: events?.data?.data || events?.data || [],
    eventsError,
    isAuthenticated: !!user && !authError,
    player: playerData?.data?.data || playerData?.data || [], // Assuming playerData already contains team_name
    playerError,
    teams: teamsData?.data || teamsData?.data || [],
    teamsError,
  };
};

export default useAuth;
