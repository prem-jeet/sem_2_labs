"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const url = import.meta.env.VITE_API_URL + "/auth/register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setAlertMsg("Passwords don't match");
      setAlertOpen(true);
      return;
    }
    // Here you would typically handle the signup logic

    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // This is required for JSON
      },
      body: JSON.stringify({
        email,
        username,
        fullname: fullName,
        password,
      }),
    });
    const res = await req.json();

    if (res.data) {
      window.localStorage.setItem("token", res.data.token);
      window.localStorage.setItem("id", res.data.id);

      setAlertMsg(res.message);
      setTimeout(() => navigate("/user"), 700);
    } else {
      setAlertMsg(JSON.stringify(res.message));
    }
    setAlertOpen(true);
  };

  return (
    <>
      <Alert
        onChange={() => setAlertOpen(false)}
        isOpen={alertOpen}
        text={alertMsg}
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
        <div className="text-center">
          <Link
            to="/auth/login"
            className="text-sm text-blue-600 hover:underline"
          >
            Already have an account? Login
          </Link>
        </div>
      </form>
    </>
  );
}
