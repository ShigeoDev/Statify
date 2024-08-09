"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Recents() {
  const { data: session } = useSession();
  const token = session?.accessToken

  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    (async function waitSession() {
      if (token) {
        fetch("https://api.spotify.com/v1/me/player/recently-played?limit=10", { method: "GET", headers: { Authorization: `Bearer ${token}` } })
          .then(res => res.json())
          .then(data => setRecent(data.items))
      }
    })()
  }, [token])

  console.log(recent)

  if (!session) {
    redirect("/login");
  }
  else {
    return (
      <div className="grid grid-cols-1 justify-items-center justify-center items-center h-screen overflow-auto">
        <div className="my-20 mx-5">
          <h1 className="lg:text-5xl text-4xl font-bold tracking-widest text-center mx-[20px]">Your Recent Tracks</h1>
          <hr className="mt-5" />
          <ul className="mt-10 mx:[10px]">
            {recent && recent.map((track: any) => {
              return (
                <li key={track.track.name} className="flex items-center gap-4 mt-4 mx-[25px]">
                  <Image height={500} width={500} src={track.track.album.images[0].url} alt="track cover" className="w-[60px] h-[60px] rounded-md" />
                  <div>
                    <h2 className="font-bold lg:text-xl text-sm">{track.track.name}</h2>
                    <p className="lg:text-xl text-sm">{track.track.artists[0].name}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
