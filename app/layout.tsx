import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { myFont } from "./fonts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clueso Interactive Mode",
  description: "Turn screen recordings into interactive walkthroughs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${myFont.variable} antialiased [font-family:var(--font-geist-sans)]`}
      >
        {children}
      </body>
    </html>
  );
}
