"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { JWT } from "next-auth/jwt";

async function topTrack(token: JWT) {
  return await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", { method: "GET", headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.json())
}

export default function tracks() {
  const { data: session } = useSession();
  const token = session?.accessToken

  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    topTrack(token).then(data => setTracks(data.items))
  }, [])

  if (!session) {
    redirect("/login");
  }
  else {
    return (
      <div className="grid justify-center mt-40 overflow-x-scroll">
        <div>
          <h1 className="text-5xl font-bold tracking-widest">Your Top Tracks</h1>
          <hr />
          <ul className="lg:mt-0 mt-[60px]">
            {tracks && tracks.map((track: any) => {
              return (
                <li key={track.name} className="flex items-center gap-4 mt-4">
                  <img src={track.album.images[0].url} alt="track cover" className="w-20 h-20 rounded-md" />
                  <div>
                    <h2 className="font-bold">{track.name}</h2>
                    <p>{track.artists[0].name}</p>
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
