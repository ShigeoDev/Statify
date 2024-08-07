import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-7xl lg:text-9xl font-bold">
        Statify
      </h1>
      <h2 className="mt-10 text-lg lg:text-3xl text-center">
        Discover your top artists, top tracks, and more.
      </h2>
      <Link href="/dashboard" className="flex justify-center items-center mt-20 w-[8rem] h-[3rem] rounded-full spotifygreen ">
        <p className="text-center text-xl">
          Begin
        </p>
      </Link>
      <Link href="/about" className="mt-10 text-lg lg:text-3xl text-center">
        <p className="text-center text-lg">
          About
        </p>
      </Link>
    </div>
  );
}
