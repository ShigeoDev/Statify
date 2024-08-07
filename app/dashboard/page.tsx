"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { JWT } from "next-auth/jwt";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";

async function topTrack(token: JWT) {
  return await fetch("https://api.spotify.com/v1/me/top/tracks?limit=1", { method: "GET", headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.json())
}

async function topArtist(token: JWT) {
  return await fetch("https://api.spotify.com/v1/me/top/artists?limit=1", { method: "GET", headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.json())
}

async function recentlyPlayed(token: JWT) {
  return await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", { method: "GET", headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.json())
}

export default function Dashboard() {
  const { data: session } = useSession();
  const token = session?.accessToken
  const [track, setTrack] = useState(null)
  const [artist, setArtist] = useState(null)
  const [recent, setRecent] = useState(null)


  useEffect(() => {
    topTrack(token).then(data => setTrack(data.items[0].album.images[0].url))
    topArtist(token).then(data => setArtist(data.items[0].images[0].url))
    recentlyPlayed(token).then(data => setRecent(data.items[0].track.album.images[0].url))
  }, [])


  if (!session) {
    redirect("/login");
  }

    return (
      <div className="lg:flex grid justify-center items-center h-screen overflow-scroll">
        <div className="grid lg:grid-cols-3 lg:mt-0 grid-cols-1 mt-[80px] mb-[40px] gap-10">
          <Link href="/dashboard/tracks" className="spotifygreen w-60 h-60 rounded-md flex flex-col items-center">
            <h2 className="font-bold my-3">Top Tracks</h2>
            {track && <img src={track} alt="track cover" className="w-40 h-40 rounded-md" />}
          </Link>
          <Link href="/dashboard/albums" className="spotifygreen w-60 h-60 rounded-md flex flex-col items-center">
            <h2 className="font-bold my-3">Top Albums</h2>
            {artist && <img src={artist} alt="artist cover" className="w-40 h-40 rounded-md" />}
          </Link>
          <Link href="/dashboard/recent" className="spotifygreen w-60 h-60 rounded-md flex flex-col items-center">
            <h2 className="font-bold my-3">Recently Played</h2>
            {recent && <img src={recent} alt="recent" className="w-40 h-40 rounded-md" />}
          </Link>
        </div>
      </div>
    )
}

