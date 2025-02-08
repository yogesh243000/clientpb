"use client";
import { Error } from "../../../components/ui/Error";
import React, { useState } from "react";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { Label } from "../../../components/ui/Label";
import axiosInstance from "../../../lib/axiosInstance";

import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmedPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (password !== confirmedPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await axiosInstance.post("api/v1/register", {
        name,
        email,
        password,
        password_confirmation: confirmedPassword,
      });

      if (res.data.user) {
        router.push("/dashboard"); // Redirect after successful registration
      } else {
        setError("Failed to register: Invalid credentials" + res.data.message);
      }
    } catch (error) {
      console.log("Api error: " + error.response?.data);
      setError("Failed to register: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-blue-400">
      <div className="flex flex-col justify-center bg-white w-[500px] h-[500px] rounded-md shadow-md p-8">
        <h1 className="text-2xl font-bold text-center">Register Form</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Label text="Name" id="name" />
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Label text="Email" id="email" />
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Label text="Password" id="password" />
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Label text="Confirmed Password" id="password" />
          <Input
            type="password"
            placeholder="Confirm your password"
            value={confirmedPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Error error={error} />

          <Button type="submit" disabled={isLoading}>
            Register
          </Button>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
