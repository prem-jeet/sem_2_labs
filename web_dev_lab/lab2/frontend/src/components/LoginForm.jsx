import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Alert } from "./Alert";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const url = import.meta.env.VITE_API_URL + "/auth/login";

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    const body = { username, password };

    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // This is required for JSON
      },
      body: JSON.stringify(body),
    });

    const res = await req.json();
    if (res.success) {
      window.localStorage.setItem("token", res.data.token);
      window.location.reload(false);
    } else {
      setErrorMsg(res.message);
      setError(true);
    }
  };

  return (
    <>
      <Alert isOpen={error} onChange={() => setError(false)} text={errorMsg} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <Link
            to="/auth/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
          <Link
            to="/auth/signup"
            className="text-sm text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </>
  );
}
