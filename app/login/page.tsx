"use client";

import { signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {!session ? (
        <button
          className="px-3 py-2 border border-neutral-700 bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-100 w-60 h-16"
          onClick={() => signIn('spotify')} 
        >
          <img src="/spotify.svg" alt="Spotify Logo" className="h-[35px] w-[35px]" />
          <div className="ml-3 text-lg">Sign in with Spotify</div>
        </button>

      ) : (

        <button onClick={() => signOut()} className="flex justify-center items-center w-[8rem] h-[3rem] rounded-full spotifygreen ">
          Sign Out
        </button>

      )}
    </div>
  )
}
