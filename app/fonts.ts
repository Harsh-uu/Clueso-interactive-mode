import localFont from "next/font/local";

export const myFont = localFont({
  src: [
    {
      path: "../public/fonts/Nohemi-Medium-BF6438cc5883899.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-nohemi",
});