const problems = [
  {
    num: 1,
    heading: "Users don't know what prompts to use",
    description:
      "Most people stare at the AI chat box with no idea what to type. Without guidance, they default to vague questions and get shallow, generic answers.",
  },
  {
    num: 2,
    heading: "Prompts are repetitive and time-consuming",
    description:
      "Power users end up copy-pasting the same prompts across tabs. There's no easy way to reuse or share what works without manual effort every single time.",
  },
  {
    num: 3,
    heading: "Prompts should depend on the context",
    description:
      "A prompt that works on LinkedIn is useless on GitHub. AI needs to understand where you are and what you're doing to give actually useful results.",
  },
];

export const Problem = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 lg:py-20">
      <p className="text-sm text-[#666fdf] font-semibold tracking-widest uppercase text-center">
        The Problem
      </p>
      <h2 className="text-3xl lg:text-4xl text-center mt-3 [text-shadow:2px_2px_2px_black]">
        Great AI results require great prompts
      </h2>
      <p className="text-[#939db8] text-center mt-4 max-w-lg mx-auto">
        But most users struggle to write them — and context changes with every website.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
        {problems.map((problem) => (
          <div
            key={problem.num}
            className="group relative rounded-2xl border border-[#c9d3ee]/10 bg-white/3 backdrop-blur-md p-6 transition-all duration-300 hover:border-[#666fdf]/40 hover:bg-white/6"
          >
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#666fdf] mb-4">
              Problem {problem.num}
            </span>
            <h3 className="text-lg font-semibold text-[#e2e5ec] leading-snug">
              {problem.heading}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#939db8]">
              {problem.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
