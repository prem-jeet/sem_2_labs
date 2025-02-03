import { Alert } from "@/components/Alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const url = import.meta.env.VITE_API_URL + "/auth";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState(0);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resetPassword, setResetPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setResetPassword(userId ? true : false);
  }, [userId]);

  const validateUser = async (e) => {
    e.preventDefault();
    const req = await fetch(url + "/checkUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // This is required for JSON
      },
      body: JSON.stringify({
        email,
      }),
    });

    const res = await req.json();

    if (res.success) {
      setUserId(res.data.userId);
      setResetPassword(true);
    } else {
      setEmail("");
      setErrorMsg(res.message);
      setError(true);
    }
  };
  const saveNewPassword = async (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      alert("Password does not match");
      return;
    }

    const req = await fetch(url + "/changePassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // This is required for JSON
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const res = await req.json();

    setError(true);
    setErrorMsg(res.message);
    if (res.status == 200) {
      setTimeout(() => navigate("/auth/login"), 700);
    }
  };

  return (
    <div className="w-full max-w-md">
      {error && (
        <Alert
          isOpen={error}
          onChange={() => {
            setError(false);
          }}
          text={errorMsg}
        />
      )}
      <h1 className="text-4xl font-bold mb-8 text-center">Forgot Password</h1>
      {resetPassword ? (
        <form className="space-y-4" onSubmit={saveNewPassword}>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirfPassword"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      ) : (
        <form className="space-y-4" onSubmit={validateUser}>
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
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      )}
      <div className="mt-4 text-center">
        <Link
          to="/auth/login"
          className="text-sm text-blue-600 hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
