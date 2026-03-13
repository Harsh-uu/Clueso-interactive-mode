const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-[#666fdf]">
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
  </svg>
);

const features = [
  "Prompt packs for LinkedIn, YouTube, GitHub & more",
  "One-click prompt usage",
  "Faster AI workflows",
];

export const CTA = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 lg:py-20">
      <div className="relative rounded-2xl border border-[#c9d3ee]/10 bg-white/3 backdrop-blur-md px-8 py-16 text-center overflow-hidden">
        {/* subtle glow */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-64 w-lg rounded-full bg-[radial-gradient(ellipse_at_center,rgba(102,111,223,0.24)_0%,transparent_70%)] blur-2xl pointer-events-none" />

        <div className="relative">
          <h2 className="text-3xl lg:text-4xl font-semibold [text-shadow:2px_2px_2px_black]">
            Prompt suggestions for every webpage
          </h2>
          <p className="mt-5 text-[#939db8] max-w-xl mx-auto leading-relaxed">
            Merlin already understands the page you're browsing. Context Packs
            simply suggest the most useful prompts so users can start faster and
            get better results.
          </p>

          <ul className="mt-8 flex flex-col items-start sm:items-center justify-center gap-3 sm:gap-4 mx-auto w-fit">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-[#c9d3ee]/80">
                <span className="shrink-0 mt-0.5"><CheckIcon /></span>
                <span className="text-left">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href="#demo" className="w-full sm:w-auto text-center bg-[#666fdf] hover:bg-[#575fd0] px-6 py-2.5 rounded-xl text-[#e2e5ec] font-semibold border border-[#c9d3ee]/30 cursor-pointer transition-colors">
              Try the Demo
            </a>
            <a href="#context-packs" className="w-full sm:w-auto text-center bg-white/5 hover:bg-white/10 px-6 py-2.5 rounded-xl text-[#e2e5ec] font-semibold border border-[#c9d3ee]/15 cursor-pointer transition-colors">
              Explore Context Packs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};