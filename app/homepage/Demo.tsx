"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── prompt data per site ─────────────────────────────────────── */

const sitePrompts: Record<string, string[]> = {
  LinkedIn: [
    "Write a connection request for a hiring manager",
    "Rewrite my About section for a product role",
    "Generate a post celebrating a career milestone",
    "Summarize this profile and suggest talking points",
  ],
  YouTube: [
    "Summarize this video in 5 bullet points",
    "Generate timestamps from the transcript",
    "Write a thoughtful follow-up comment",
    "Turn this tutorial into step-by-step notes",
  ],
  GitHub: [
    "Explain this pull request diff in plain English",
    "Write a clear issue description from this bug",
    "Suggest improvements for this README",
    "Generate a commit message from staged changes",
  ],
  Blog: [
    "Summarize this article in one paragraph",
    "List the key takeaways from this post",
    "Draft a reply with a counter-argument",
    "Rewrite the intro to hook readers faster",
  ],
  Twitter: [
    "Turn this idea into a viral thread with a hook",
    "Write a witty quote-tweet reply",
    "Summarize this thread into one tweet",
    "Generate 3 reply options for this tweet",
  ],
};

const sites = Object.keys(sitePrompts);

const funnyMessages = [
  "You really thought this would work? 😂 This is just a demo, my friend.",
  "Nice try! But I'm just a pretty UI with no brain behind it... yet. 🧠",
  "Hold on, let me pretend to think... 🤔 Nope, still a demo.",
  "Error 418: I'm a teapot. Just kidding — I'm a landing page. ☕",
  "I appreciate the enthusiasm, but I'm about as real as a unicorn. 🦄",
  "Plot twist: the real AI was the friends we made along the way. 🤝",
  "If I had a dollar for every time someone tried this... I'd have like $4. 💰",
];

/* ── SVG icons ────────────────────────────────────────────────── */

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);
const BlogIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    <path d="M8 7h6" /><path d="M8 11h8" />
  </svg>
);
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
    <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.154.75.75 0 0 0 0-1.115A28.897 28.897 0 0 0 3.105 2.288Z" />
  </svg>
);
const SparkleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
    <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" />
  </svg>
);

const siteIconMap: Record<string, () => React.JSX.Element> = {
  LinkedIn: LinkedInIcon,
  YouTube: YouTubeIcon,
  GitHub: GitHubIcon,
  Blog: BlogIcon,
  Twitter: TwitterIcon,
};

const siteAccent: Record<string, string> = {
  LinkedIn: "#0a66c2",
  YouTube: "#ff0000",
  GitHub: "#e2e5ec",
  Blog: "#f59e0b",
  Twitter: "#e2e5ec",
};

/* ── component ────────────────────────────────────────────────── */

export const Demo = () => {
  const [active, setActive] = useState("LinkedIn");
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [funnyReply, setFunnyReply] = useState("");
  const [displayedReply, setDisplayedReply] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const funnyIndexRef = useRef(0);

  const handleSiteChange = (site: string) => {
    if (site === active) return;
    setActive(site);
    setLoading(true);
    setInputValue("");
    setFunnyReply("");
    setDisplayedReply("");
    setIsTyping(false);
  };

  const handleSend = useCallback(() => {
    if (!inputValue.trim() || isTyping) return;
    const msg = funnyMessages[funnyIndexRef.current % funnyMessages.length];
    funnyIndexRef.current += 1;
    setFunnyReply(msg);
    setDisplayedReply("");
    setIsTyping(true);
    setInputValue("");
  }, [inputValue, isTyping]);

  // typewriter effect
  useEffect(() => {
    if (!funnyReply || !isTyping) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedReply(funnyReply.slice(0, i));
      if (i >= funnyReply.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [funnyReply, isTyping]);

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, [loading]);

  const Icon = siteIconMap[active];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 lg:py-20">
      <p className="text-sm text-[#666fdf] font-semibold tracking-widest uppercase text-center">
        Interactive Demo
      </p>
      <h2 className="text-3xl lg:text-4xl text-center mt-3 [text-shadow:2px_2px_2px_black]">
        See Context Packs in Action
      </h2>
      <p className="text-[#939db8] text-center mt-4 max-w-xl mx-auto">
        Select a website and see the prompts Merlin would suggest.
      </p>

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* ── left: site picker ─────────────────────────────── */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#939db8] mb-2">
            Choose a website
          </span>
          {sites.map((site) => {
            const SiteIcon = siteIconMap[site];
            const isActive = site === active;
            return (
              <button
                key={site}
                onClick={() => handleSiteChange(site)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? "border-[#666fdf]/50 bg-[#666fdf]/10 text-[#e2e5ec]"
                    : "border-[#c9d3ee]/8 bg-white/3 text-[#939db8] hover:bg-white/6 hover:text-[#e2e5ec]"
                }`}
              >
                <span style={{ color: isActive ? siteAccent[site] : undefined }}>
                  <SiteIcon />
                </span>
                {site}
              </button>
            );
          })}
        </div>

        {/* ── right: fake merlin sidebar ────────────────────── */}
        <div className="rounded-2xl border border-[#c9d3ee]/10 bg-white/3 backdrop-blur-md overflow-hidden flex flex-col">
          {/* sidebar header */}
          <div className="flex items-center justify-between border-b border-[#c9d3ee]/8 px-5 py-3.5">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-[#666fdf] flex items-center justify-center text-white">
                <SparkleIcon />
              </div>
              <span className="text-sm font-semibold text-[#e2e5ec]">
                Merlin AI
              </span>
            </div>
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#c9d3ee]/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#c9d3ee]/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#c9d3ee]/15" />
            </div>
          </div>

          {/* content area */}
          <div className="flex-1 px-5 py-4 flex flex-col min-h-105">
            <AnimatePresence mode="wait">
              {loading ? (
                /* ── loading state ───────────────────────── */
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col items-center justify-center gap-4"
                >
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-3 text-center"
                  >
                    <div className="flex items-center gap-2 text-sm text-[#939db8]">
                      Detected Website:{" "}
                      <span
                        className="inline-block"
                        style={{ color: siteAccent[active] }}
                      >
                        <Icon />
                      </span>
                      <span className="font-semibold text-[#e2e5ec]">
                        {active}
                      </span>
                    </div>
                    <span className="text-xs text-[#666fdf] font-medium">
                      Loading Context Pack…
                    </span>
                  </motion.div>
                </motion.div>
              ) : (
                /* ── prompts state ───────────────────────── */
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col flex-1"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span style={{ color: siteAccent[active] }}>
                      <Icon />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#939db8]">
                      Context Pack: {active}
                    </span>
                  </div>

                  <p className="text-[11px] uppercase tracking-wider text-[#939db8]/70 font-semibold mb-2">
                    Suggested Prompts
                  </p>

                  <div className="space-y-2 flex-1">
                    {sitePrompts[active].map((prompt, i) => (
                      <motion.div
                        key={prompt}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.25 }}
                        className="flex items-start justify-between gap-3 rounded-xl border border-[#c9d3ee]/6 bg-white/2 px-4 py-3 text-[13px] text-[#c9d3ee]/90 transition-colors hover:border-[#c9d3ee]/12 hover:bg-white/4"
                      >
                        <span className="leading-relaxed">{prompt}</span>
                        <button
                          onClick={() => setInputValue(prompt)}
                          className="shrink-0 rounded-lg border border-[#666fdf]/30 bg-[#666fdf]/10 px-2.5 py-1 text-[11px] font-semibold text-[#666fdf] transition-colors hover:bg-[#666fdf]/20 cursor-pointer"
                        >
                          Use
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {/* funny AI reply bubble */}
                  <AnimatePresence>
                    {displayedReply && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-3 rounded-xl border border-[#666fdf]/20 bg-[#666fdf]/5 px-4 py-3"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="h-5 w-5 rounded-md bg-[#666fdf] flex items-center justify-center text-white">
                            <SparkleIcon />
                          </div>
                          <span className="text-[11px] font-semibold text-[#939db8]">Merlin AI</span>
                        </div>
                        <p className="text-[13px] text-[#c9d3ee] leading-relaxed">
                          {displayedReply}
                          {isTyping && <span className="inline-block w-1.5 h-4 bg-[#666fdf] ml-0.5 animate-pulse align-middle" />}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* chat input bar */}
          <div className="border-t border-[#c9d3ee]/8 px-4 py-3">
            <div className="flex items-center gap-2 rounded-xl border border-[#c9d3ee]/10 bg-white/3 px-4 py-2.5">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                placeholder="Ask Merlin anything…"
                className="flex-1 bg-transparent text-sm text-[#e2e5ec] placeholder-[#939db8]/50 outline-none"
              />
              <button onClick={handleSend} className="text-[#666fdf] hover:text-[#8b92f0] transition-colors cursor-pointer">
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};