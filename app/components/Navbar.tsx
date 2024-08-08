"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import statify from "../../public/statify.png";
import { signOut } from "next-auth/react";
import { useOutsideClick } from "../hooks/outsideClick";
import { usePathname } from "next/navigation";

function LoginButton() {
  const { data: session } = useSession();

  const { visible, setVisible, ref } = useOutsideClick(false);

  function dropdown() {
    setVisible(!visible);
  }

  if (!session) {
    return (
      <div className="flex items-center gap-4 mr-4">
        <a href="/login" className="text-lg font-bold">Login</a>
      </div>
    )
  }
  else {
    return (
      <div ref={ref}>
        <div className="flex items-center gap-4 mr-4">
          <button onClick={() => dropdown()} className="text-lg font-bold">{session?.user?.name}</button>
        </div>
        {visible &&
          <div>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="text-lg font-bold absolute right-8 top-[60px] spotifygreen w-[7rem] h-[3rem] rounded-full">Sign Out</button>
          </div>
        }
      </div>
    )
  }
}


export default function Navbar() {

  const { data: session } = useSession();
  const path = usePathname();

  return (
    <nav className="bg-[#191414] fixed w-screen flex items-center justify-between p-4">
      <div className="flex items-center gap-4 ml-4">
        <a href="/" className="text-lg font-bold">
          <Image src={statify} alt="statify" width={30} height={30} />
        </a>
        {session &&
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="text-lg font-bold">Dashboard</a>
          </div>
        }
      </div>
      {path !== "/login" &&
        <LoginButton />
      }
    </nav>
  );
}
