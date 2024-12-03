"use client";

import { SessionProvider } from "next-auth/react";
import { useSession, signOut } from "next-auth/react"; // Import signOut
import { useRouter } from "next/navigation";

function DashboardContent() {
  const { data: session } = useSession(); // Access session data

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      <div className="p-4 bg-white rounded shadow w-full max-w-md">
        <p>
          <strong>Username:</strong> {session?.user?.username}
        </p>
        <p>
          <strong>Email:</strong> {session?.user?.email}
        </p>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })} // Sign out and redirect to login
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <SessionProvider>
      <DashboardContent />
    </SessionProvider>
  );
}
