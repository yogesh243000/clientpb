"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../lib/useAuth"; // Import from lib
import Unauthorized from "../../components/serverProps/401";

const DashboardPage = () => {
  const { user, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (error?.message === "Unauthorized") {
      router.push("/login");
    }
  }, [error, router]);

  if (!user && !error) return <p>Loading...</p>;

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
