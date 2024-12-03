"use client";

import LoginForm from "@/components/LoginForm";
import Link from "next/link"; // Import Link untuk navigate

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <LoginForm />
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
