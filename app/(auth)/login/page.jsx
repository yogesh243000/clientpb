"use client";
import React, { useState } from "react";
import { Label } from "../../../components/ui/Label";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { Error } from "../../../components/ui/Error"; // Add this import
import { useRouter } from "next/navigation"; // Import useRouter
import axiosInstance from "../../../lib/axiosInstance";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Define router

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axiosInstance.post("api/v1/login", {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token); // Store the token
        router.push("/dashboard"); // Redirect to dashboard after login
      } else {
        setError("Failed to login: Invalid credentials");
      }
    } catch (error) {
      console.log("API error:", error.response?.data);
      setError(
        "Failed to login: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-blue-400">
      <div className="flex flex-col justify-center bg-white w-[500px] h-[500px] rounded-md shadow-md p-8">
        <h1 className="text-2xl font-bold text-center">Login Form</h1>{" "}
        {/* Fixed Title */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex flex-col gap-2">
            <Label text="Email" id="email" />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label text="Password" id="password" />
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Error error={error} /> {/* Display error message */}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <div className="pb-6 mt-4">
          <p className="text-sm">
            Don't have an account?{" "}
            <span className="hover:underline text-blue-500">
              <Link href="/register">Register</Link>
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
