import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically handle the login logic
    console.log("Login attempted with:", { username, password })
  }

  return (
    (<form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
      </div>
      <div className="flex justify-between items-center">
        <Link to="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
          Forgot password?
        </Link>
        <Link to="/auth/signup" className="text-sm text-blue-600 hover:underline">
          Sign up
        </Link>
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>)
  );
}

