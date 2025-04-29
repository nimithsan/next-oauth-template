"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/services/auth-service";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isLoginView) {
        // Handle login
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          setError("Invalid email or password");
          setIsLoading(false);
          return;
        }

        // Redirect to dashboard after successful login
        router.push("/dashboard");
        router.refresh();
      } else {
        // Handle registration
        if (!name.trim()) {
          setError("Name is required");
          setIsLoading(false);
          return;
        }

        const result = await registerUser(name, email, password);

        if (!result.success) {
          setError(result.message);
          setIsLoading(false);
          return;
        }

        // Auto login after successful registration
        const signInResult = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (signInResult?.error) {
          setError("Registration successful but couldn't log you in automatically. Please log in.");
          setIsLoading(false);
          setIsLoginView(true);
          return;
        }

        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error("Auth error:", error);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = (provider: string) => {
    setIsLoading(true);
    // Always redirect to dashboard after OAuth login
    signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h1 className="mb-1 text-xl font-bold text-gray-900">Welcome back</h1>
      <p className="mb-4 text-sm text-gray-600">
        Sign in to your account or create a new one
      </p>

      {/* Tabs */}
      <div className="mb-4 grid grid-cols-2 gap-1 rounded-md bg-gray-100 p-1">
        <button
          onClick={() => setIsLoginView(true)}
          className={`rounded-md py-1.5 text-sm font-medium ${
            isLoginView
              ? "bg-white shadow-sm"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLoginView(false)}
          className={`rounded-md py-1.5 text-sm font-medium ${
            !isLoginView
              ? "bg-white shadow-sm"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Register
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {!isLoginView && (
          <div className="mb-3">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-blue-500"
              required
            />
          </div>
        )}
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mb-4 w-full rounded-md bg-blue-500 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? "Loading..." : isLoginView ? "Sign in" : "Sign up"}
        </button>
      </form>

      {/* Divider */}
      <div className="relative mb-4 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-2 flex-shrink text-xs text-gray-500">
          OR CONTINUE WITH
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Social Login */}
      <div className="space-y-2">
        <button
          onClick={() => handleOAuthSignIn("google")}
          type="button"
          className="flex w-full items-center justify-center rounded-md border border-gray-300 p-2 text-sm hover:bg-gray-50"
        >
          <svg
            className="mr-2 h-4 w-4"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Sign in with Google
        </button>
        <button
          onClick={() => handleOAuthSignIn("facebook")}
          type="button"
          className="flex w-full items-center justify-center rounded-md border border-gray-300 p-2 text-sm hover:bg-gray-50"
        >
          <svg
            className="mr-2 h-4 w-4"
            viewBox="0 0 24 24"
            fill="#1877F2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
} 