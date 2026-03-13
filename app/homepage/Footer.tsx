const links = [
  { label: "Solution", href: "#solution" },
  { label: "Context Packs", href: "#context-packs" },
  { label: "Demo", href: "#demo" },
  { label: "How It Works", href: "#how-it-works" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-[#c9d3ee]/8">
      <div className="text-center mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-base font-semibold text-[#e2e5ec]">
            Merlin Context Packs
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#939db8] max-w-xs mx-auto">
            Context-aware prompt suggestions for every website you browse.
            Powered by Merlin AI.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#939db8] mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm text-[#c9d3ee]/70 hover:text-[#e2e5ec] transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#939db8] mb-3">
            Credit
          </h4>
          <p className="text-sm text-[#c9d3ee]/70">
            Built by{" "}
            <a
              href="https://portfolio-harshuus-projects.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8b92f0] hover:text-[#5e63a3] font-medium transition-colors"
            >
              Harsh
            </a>
          </p>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-[#c9d3ee]/8">
        <div className="max-w-5xl mx-auto px-4 py-5">
          <p className="text-xs text-[#939db8]/60 text-center">
            © {new Date().getFullYear()} Merlin Context Packs. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};