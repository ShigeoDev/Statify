"use client";

import { getSession, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  const { data: session, update } = useSession();
  const token = session?.accessToken
  const [track, setTrack] = useState(null)
  const [artist, setArtist] = useState(null)
  const [recent, setRecent] = useState(null)

  if (!session) {
    redirect("/login");
  }

  useEffect(() => {
    if (token) {
      fetch("https://api.spotify.com/v1/me/top/tracks?limit=1", { method: "GET", headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => setTrack(data.items[0].album.images[0].url))
      fetch("https://api.spotify.com/v1/me/top/artists?limit=1", { method: "GET", headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => setArtist(data.items[0].images[0].url))
      fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", { method: "GET", headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => setRecent(data.items[0].track.album.images[0].url))
    }
    else {
      update()
    }
  }, [session, token])

  return (
    <div className="lg:flex grid justify-center items-center h-screen overflow-auto">
      <div className="grid lg:grid-cols-3 lg:mt-0 grid-cols-1 mt-[80px] mb-[40px] gap-10">
        <Link href="/dashboard/tracks" className="spotifygreen w-60 h-60 rounded-md flex flex-col items-center">
          <h2 className="font-bold my-3">Top Tracks</h2>
          {track && <Image src={track} height={500} width={500} alt="track cover" className="w-40 h-40 rounded-md" />}
        </Link>
        <Link href="/dashboard/artists" className="spotifygreen w-60 h-60 rounded-md flex flex-col items-center">
          <h2 className="font-bold my-3">Top Artists</h2>
          {artist && <Image src={artist} height={500} width={500} alt="artist cover" className="w-40 h-40 rounded-md" />}
        </Link>
        <Link href="/dashboard/recent" className="spotifygreen w-60 h-60 rounded-md flex flex-col items-center">
          <h2 className="font-bold my-3">Recently Played</h2>
          {recent && <Image src={recent} height={500} width={500} alt="recent" className="w-40 h-40 rounded-md" />}
        </Link>
      </div>
    </div>
  )
}

