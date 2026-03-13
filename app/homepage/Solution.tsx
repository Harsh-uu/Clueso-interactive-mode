const packs = [
  {
    site: "LinkedIn",
    prompts: [
      "Write a connection request for a hiring manager",
      "Rewrite my About section for a product role",
      "Generate a post celebrating a career milestone",
      "Summarize this profile and suggest talking points",
    ],
  },
  {
    site: "YouTube",
    prompts: [
      "Summarize this video in 3 bullet points",
      "Generate timestamps from the transcript",
      "Write a comment asking a thoughtful follow-up",
      "Turn this tutorial into step-by-step notes",
    ],
  },
  {
    site: "GitHub",
    prompts: [
      "Explain this pull request diff in plain English",
      "Write a clear issue description from this bug",
      "Suggest improvements for this README",
      "Generate a commit message from staged changes",
    ],
  },
  {
    site: "Blog",
    prompts: [
      "Summarize this article in one paragraph",
      "List the key takeaways from this post",
      "Draft a reply with a counter-argument",
      "Rewrite the intro to hook readers faster",
    ],
  },
];

export const Solution = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 lg:py-20">
      <p className="text-sm text-[#666fdf] font-semibold tracking-widest uppercase text-center">
        The Solution
      </p>
      <h2 className="text-3xl lg:text-4xl text-center mt-3 [text-shadow:2px_2px_2px_black]">
        Context-aware prompts for every website
      </h2>
      <p className="text-[#939db8] text-center mt-4 max-w-xl mx-auto">
        Merlin context packs automatically suggests the best prompt depending on
        the website you're browsing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-14">
        {packs.map((pack) => (
          <div
            key={pack.site}
            className="group rounded-2xl border border-[#c9d3ee]/10 bg-white/3 backdrop-blur-md p-6 transition-all duration-300 hover:border-[#666fdf]/40 hover:bg-white/6"
          >
            <h3 className="text-lg font-semibold text-[#e2e5ec]">
              {pack.site}
            </h3>

            <ul className="mt-4 space-y-2.5">
              {pack.prompts.map((prompt) => (
                <li
                  key={prompt}
                  className="flex items-start gap-2 text-sm text-[#939db8]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#666fdf]" />
                  {prompt}
                </li>
              ))}
            </ul>

            <button className="mt-5 text-sm font-semibold text-[#666fdf] cursor-pointer transition-colors hover:text-[#8b92f0]">
              View prompts →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};