const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" /><path d="M22 5h-4" />
  </svg>
);

const WandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72z" />
    <path d="m14 7 3 3" />
    <path d="M5 6v4" /><path d="M19 14v4" />
    <path d="M10 2v2" /><path d="M7 8H3" /><path d="M21 16h-4" /><path d="M11 3H9" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const benefits = [
  {
    title: "Faster Workflows",
    description:
      "Skip the blank-page problem. Pre-built prompts let you go from browsing to AI output in one click — no typing, no context-switching.",
    Icon: RocketIcon,
  },
  {
    title: "Better AI Results",
    description:
      "Purpose-built prompts extract richer, more relevant answers from AI because they're written for the exact page you're on.",
    Icon: SparklesIcon,
  },
  {
    title: "Less Prompt Engineering",
    description:
      "You shouldn't need to be a prompt expert. Context packs handle the craft so you can focus on the outcome, not the wording.",
    Icon: WandIcon,
  },
  {
    title: "Context Awareness",
    description:
      "The same AI, different superpowers on every site. Merlin adapts prompts to LinkedIn, YouTube, GitHub, and more automatically.",
    Icon: EyeIcon,
  },
];

export const WhyThisMatters = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 lg:py-20">
      <p className="text-sm text-[#666fdf] font-semibold tracking-widest uppercase text-center">
        Why This Matters
      </p>
      <h2 className="text-3xl lg:text-4xl text-center mt-3 [text-shadow:2px_2px_2px_black]">
        Why Context Packs Matter
      </h2>
      <p className="text-[#939db8] text-center mt-4 max-w-xl mx-auto">
        Context-aware prompts make AI assistants faster, smarter, and easier to
        use.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-14">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="group rounded-lg border border-[#c9d3ee]/10 bg-white/3 backdrop-blur-md p-7 transition-all duration-300 hover:border-[#666fdf]/40 hover:bg-white/6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#666fdf]/10 text-[#666fdf] mb-5">
              <b.Icon />
            </div>
            <h3 className="text-lg font-semibold text-[#e2e5ec]">{b.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#939db8]">
              {b.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-14 text-center text-[#939db8] max-w-2xl mx-auto leading-relaxed">
        Context-aware prompts could make AI assistants significantly more useful
        across the web — turning every tab into an opportunity for smarter,
        faster, and more relevant AI interactions.
      </p>
    </div>
  );
};