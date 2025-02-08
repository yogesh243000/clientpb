import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "../../lib/axiosInstance";
import useSWR from "swr";
import { useRouter } from "next/navigation"; // Next.js router

const useAuth = () => {
  const fetcher = async (url) => {
    const token = localStorage.getItem("authToken");
    if (!token) return null; // Prevent request if no token
    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { data: user, mutate } = useSWR("/api/user", fetcher);

  return { user, mutate };
};

export const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, mutate } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token
    mutate(null); // Clear user data
    setIsOpen(false); // Close dropdown
    router.push("/"); // Redirect to homepage
  };

  return (
    <div className="relative">
      {user ? (
        // If logged in, show profile dropdown
        <>
          <button
            className="flex items-center space-x-2 text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Image
              src="/profile.png"
              alt="profile"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>{user.name}</span>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md py-2">
              <Link href="/profile" onClick={() => setIsOpen(false)}>
                <p className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  View Profile
                </p>
              </Link>
              <Link href="/settings" onClick={() => setIsOpen(false)}>
                <p className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Settings
                </p>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-red-500 hover:bg-gray-200 w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        // If not logged in, show Login & Register buttons
        <div className="flex space-x-4">
          <Link href="/login">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md">
              Register
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
