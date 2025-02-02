import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="w-full max-w-md">
      <h1 className="text-4xl font-bold mb-8 text-center">Forgot Password</h1>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Reset Password
        </Button>
      </form>
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
