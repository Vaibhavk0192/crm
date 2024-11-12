'use client';

import { signIn, useSession, signOut } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {session ? `Welcome, ${session.user.name}` : "Login"}
        </h2>

        {session ? (
          <>
            <p className="text-center mt-4">Signed in as {session.user.email}</p>
            <button
              onClick={() => signOut()}
              className="w-full px-4 py-2 mt-3 text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="w-full px-4 py-2 mt-3 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
}
