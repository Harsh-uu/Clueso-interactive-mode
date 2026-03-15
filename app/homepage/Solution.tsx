"use client";

import dynamic from "next/dynamic";

const RiveAnimation = dynamic(
  () => import("../components/RiveAnimation"),
  { ssr: false }
);

type SolutionItem = {
  num: string;
  heading: string;
  description: string;
  src: string;
  artboard: string;
  stateMachine: string;
};

const solutions: SolutionItem[] = [
  {
    num: "01",
    heading: "Guided Steps",
    description:
      "Users are guided through the workflow step by step, just like in a real product.",
    src: "/animations/optimised_website_animations.riv",
    artboard: "How to doc",
    stateMachine: "How to loop",
  },
  {
    num: "02",
    heading: "Clickable Interface",
    description:
      "Learners interact with a simulated UI instead of passively watching a video.",
    src: "/animations/optimised_website_animations.riv",
    artboard: "Zoom",
    stateMachine: "Zoom - Loop",
  },
  {
    num: "03",
    heading: "Instant Feedback",
    description:
      "Each action confirms whether the step was completed correctly.",
    src: "/animations/optimised_website_animations.riv",
    artboard: "Flawless video script",
    stateMachine: "Video script loop",
  },
  {
    num: "04",
    heading: "Learn By Doing",
    description:
      "Interactive practice helps user understand workflows much faster.",
    src: "/animations/optimised_website_animations.riv",
    artboard: "AI Voices",
    stateMachine: "AI Voices- Loop",
  },
];

const SolutionCard = ({
  solution,
}: {
  solution: SolutionItem;
}) => (
  <article className="rounded-lg border bg-white border-gray-200 overflow-hidden">
    <div className="relative h-48 lg:h-56">
      <div className="absolute inset-0" />

      <div className="absolute inset-0 flex items-center justify-center p-6">
        <RiveAnimation
          src={solution.src}
          artboard={solution.artboard}
          stateMachine={solution.stateMachine}
        />
      </div>
    </div>

    <div className="px-6 lg:px-8 py-6 lg:py-7">
      <h3 className="text-2xl font-nohemi tracking-wide text-[#171717]">
        {solution.heading}
      </h3>

      <p className="mt-3 text-[#5c5c5c] text-base leading-relaxed max-w-xl">
        {solution.description}
      </p>
    </div>
  </article>
);

export const Solution = () => {
  return (
    <section id="solution" className="w-full">
      <div className="px-4 md:px-10 lg:px-40 pb-8">
        <p className="text-sm text-[#da5cc7] font-semibold tracking-widest uppercase">
          ✦ The Solution
        </p>

        <h2 className="text-3xl lg:text-5xl mt-3 font-nohemi text-[#171717] leading-tight max-w-3xl">
          Introducting Interactive Mode
        </h2>

        <p className="text-[#5c5c5c] mt-4 hidden lg:block text-lg max-w-xl leading-relaxed">
          Click-through tutorials that teach by doing.
        </p>
      </div>

      <div className="px-4 md:px-10 lg:px-40">
        <div className="relative">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-200 w-lg -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f8f8f8] blur-3xl opacity-95" />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,248,248,0.98)_0%,rgba(248,248,248,0.86)_18%,rgba(248,248,248,0.56)_38%,rgba(248,248,248,0.16)_62%,rgba(248,248,248,0)_82%)]" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {solutions.map((solution) => (
              <SolutionCard key={solution.num} solution={solution} />
            ))}
          </div>
        </div>

        <div className="h-16 lg:h-20" />
      </div>
    </section>
  );
};