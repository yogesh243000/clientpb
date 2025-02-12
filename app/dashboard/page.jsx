"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../lib/useAuth"; // Import from lib

const DashboardPage = () => {
  const { user, authError, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authError) {
      router.push("/login");
    }
  }, [authError, router]); // Redirect only if authError exists

  if (!isAuthenticated) {
    return (
      <p style={{ color: "red", fontWeight: "bold" }}>
        Please log in to access this page.
      </p>
    );
  }

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default DashboardPage;
