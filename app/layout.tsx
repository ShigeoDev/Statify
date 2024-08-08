import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { getServerSession } from "next-auth";

import SessionProvider from "./components/SessionProvider";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Statify by Nigel Loh",
  description: "Spotify statistics",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <main className="flex flex-col gap-2">
            <Navbar />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
