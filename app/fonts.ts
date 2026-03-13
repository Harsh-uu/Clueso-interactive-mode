import localFont from "next/font/local";

export const myFont = localFont({
  src: [
    {
      path: "../public/fonts/Nohemi-Regular-BF6438cc579d934.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-nohemi",
});