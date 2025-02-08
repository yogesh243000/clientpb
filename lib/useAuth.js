import useSWR from "swr";
import axiosInstance from "../lib/axiosInstance";

const useAuth = () => {
  const fetcher = async (url) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Unauthorized");

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

export default useAuth;
