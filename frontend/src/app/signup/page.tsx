"use client"; // Ensure client-side execution
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { IconBrandGoogle, IconBrandApple } from "@tabler/icons-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Ensure this code runs on the client only
    setIsClient(true);
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "alvina" && password === "1234") {
      router.push("/onboarding");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/onboarding" }); // Redirect to /onboarding after successful login
  };

  const handleAppleSignIn = () => {
    // Replace with actual Apple Sign-In logic when available
    alert("Apple Sign-In not yet implemented.");
  };

  if (!isClient) return null; // Avoid rendering until on the client

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">Login to Leetcode Lock</h1>
      <form
        onSubmit={handleLogin}
        className="border border-white rounded z-10 bg-black px-8 pt-6 pb-8 w-full max-w-md"
      >
        <div className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-zinc-900 text-white"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-zinc-900 text-white"
            placeholder="Enter your password"
            required
          />
        </div>
        {error && (
          <p className="text-red-500 text-xs italic mb-4">{error}</p>
        )}
        <div className="flex items-center justify-between mb-2">
          <button
            type="submit"
            className="bg-zinc-900 hover:bg-zinc-700 text-white  shadow-xl border border-white/[0.1] shadow-white/[0.05] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Login
          </button>   
        </div>
        <div className="flex items-center justify-center mb-2">
          or
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-700 text-white font-medium py-3 px-4 rounded-md shadow-xl border border-white/[0.1] shadow-white/[0.05] w-full"
        >
          <IconBrandGoogle className="h-5 w-5" />
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
