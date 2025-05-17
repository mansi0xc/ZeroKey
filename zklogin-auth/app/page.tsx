'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-2xl font-bold">Google OAuth Test</h1>
        
        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <div className="flex flex-col items-center gap-4">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt="Profile picture"
                width={64}
                height={64}
                className="rounded-full"
              />
            )}
            <p>Signed in as {session.user?.email}</p>
            <button
              onClick={() => signOut()}
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Sign in with Google
          </button>
        )}
      </main>
    </div>
  );
}
