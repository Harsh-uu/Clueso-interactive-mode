"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Problem", href: "#problem" },
  { label: "Interactive Demo", href: "#demo" },
  { label: "How It Works", href: "#how-it-works" },
];

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-black">
    <line x1="6" x2="18" y1="8" y2="8" />
    <line x1="6" x2="18" y1="16" y2="16" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-black">
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
    <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.5 0-.25-.01-1.06-.01-1.92-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .08 1.52 1.05 1.52 1.05.88 1.56 2.31 1.11 2.87.85.09-.66.34-1.11.62-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .85-.28 2.79 1.05A9.4 9.4 0 0 1 12 6.84c.85 0 1.71.12 2.5.36 1.94-1.33 2.79-1.05 2.79-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.95-2.35 4.82-4.58 5.08.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .28.18.61.69.5A10.27 10.27 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
  </svg>
);

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolledPastVideo, setScrolledPastVideo] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const video = document.querySelector("[data-video-placeholder]") as HTMLElement | null;
      if (!video) return;
      const rect = video.getBoundingClientRect();
      const midpoint = rect.top + rect.height / 2;
      setScrolledPastVideo(midpoint < 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-9999 bg-white border-b border-gray-200">
      <div className="flex justify-between py-3 md:py-4 items-center text-[#171717] text-sm px-4 md:px-10 lg:px-40">
        <div className="flex flex-col">
          <h1 className="font-nohemi tracking-wide text-2xl">Clueso </h1>
          <span className="-mt-2 ml-0.5">Interactive Mode</span>
        </div>

        {/* Desktop nav */}
        <ul className="hidden lg:flex gap-12">
          {navLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="hover:text-[#171717] text-[#171717]/60 transition-colors font-medium">{l.label}</a>
            </li>
          ))}
        </ul>

        <a
          href="https://github.com/Harsh-uu/Clueso-interactive-mode"
          target="_blank"
          rel="noreferrer"
          className={`hidden lg:inline-flex h-9 w-9 items-center justify-center rounded-lg text-white border transition-colors duration-300 ${
            scrolledPastVideo
              ? "bg-[#d462c5] border-[#d462c5] hover:bg-[#f770e3]"
              : "bg-black border-[#171717]/40 hover:bg-[#171717]/60"
          }`}
          aria-label="Open GitHub repository"
        >
          <GitHubIcon />
        </a>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="lg:hidden text-[#c9d3ee] cursor-pointer hover:bg-[#f7f7f7] border border-gray-200 rounded-sm active:bg-[#ebebeb] p-1 active:border-gray-400"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu — lives inside the header, no portal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 top-0"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className="lg:hidden bg-white border-t border-gray-100 h-[calc(100dvh-57px)] overflow-y-auto origin-top"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="flex flex-col px-4 pt-1 pb-2">
                {navLinks.map((l) => (
                  <li key={l.label} className="border-b border-gray-100 last:border-none">
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-4 text-[#171717] transition-colors font-medium"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="px-7 pb-5">
                <a
                  href="https://github.com/Harsh-uu/Clueso-interactive-mode"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#171717] text-white border border-gray-800"
                  aria-label="Open GitHub repository"
                >
                  <GitHubIcon />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
