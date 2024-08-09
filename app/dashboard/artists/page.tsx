"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Artists() {
  const { data: session, update } = useSession();
  const token = session?.accessToken

  const [artists, setArtists] = useState<any[]>([]);

  if (!session) {
    redirect("/login");
  }

  useEffect(() => {
    if (token) {
      fetch("https://api.spotify.com/v1/me/top/artists?limit=10", { method: "GET", headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => setArtists(data.items))
    }
    else {
      update()
    }
  }, [session, token])

  return (
    <div className="grid grid-cols-1 justify-items-center justify-center items-center h-screen overflow-auto">
      <div className="my-20 mx-5">
        <h1 className="lg:text-5xl text-4xl font-bold tracking-widest text-center mx-[20px]">Your Top Artists</h1>
        <hr className="mt-5" />
        <ul className="mt-10 mx:[10px]">
          {artists && artists.map((artists: any) => {
            return (
              <li key={artists.name} className="flex items-center gap-4 mt-4 mx-[25px]">
                <Image width={500} height={500} src={artists.images[0].url} alt="track cover" className="w-[60px] h-[60px] rounded-md" />
                <div>
                  <h2 className="font-bold lg:text-xl text-sm">{artists.name}</h2>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
