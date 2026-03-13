const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const DatabaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
  </svg>
);

const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const steps = [
  {
    num: 1,
    title: "Detect Website",
    description:
      "Merlin detects the website you're currently browsing, such as LinkedIn, YouTube, or GitHub.",
    Icon: GlobeIcon,
  },
  {
    num: 2,
    title: "Load Context Pack",
    description:
      "A curated set of prompts tailored for that website is automatically loaded in the Merlin sidebar.",
    Icon: DatabaseIcon,
  },
  {
    num: 3,
    title: "Use AI Instantly",
    description:
      "Select a prompt and Merlin fills the input field so you can run the AI instantly.",
    Icon: ZapIcon,
  },
];

export const HowItWorks = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 lg:py-20">
      <p className="text-sm text-[#666fdf] font-semibold tracking-widest uppercase text-center">
        How It Works
      </p>
      <h2 className="text-3xl lg:text-4xl text-center mt-3 [text-shadow:2px_2px_2px_black]">
        How Context Packs Work
      </h2>
      <p className="text-[#939db8] text-center mt-4 max-w-xl mx-auto">
        Merlin automatically suggests the best prompts based on the page you're
        browsing.
      </p>

      <div className="relative mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
        {/* dotted connector line – visible on desktop only */}
        <div
          className="hidden md:block absolute top-11 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] border-t-2 border-dashed border-[#666fdf]/25 pointer-events-none"
          aria-hidden
        />

        {steps.map((step) => (
          <div key={step.num} className="relative flex flex-col items-center text-center">
            {/* icon circle */}
            <div className="relative z-10 flex h-22 w-22 items-center justify-center rounded-full border border-[#c9d3ee]/10 bg-white/3 backdrop-blur-md text-[#666fdf]">
              <step.Icon />
            </div>

            {/* step badge */}
            <span className="mt-5 inline-block text-[11px] font-bold uppercase tracking-widest text-[#666fdf]">
              Step {step.num}
            </span>

            <h3 className="mt-2 text-lg font-semibold text-[#e2e5ec]">
              {step.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-[#939db8] max-w-xs">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};