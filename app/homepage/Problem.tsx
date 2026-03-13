"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type ProblemItem = {
  num: string;
  heading: string;
  description: string;
  background: string;
  image: string;
};

const problems: ProblemItem[] = [
  {
    num: "01",
    heading: "Hard to Follow",
    description:
      "Users constantly pause and rewind videos just to replicate simple steps.",
    background: "#e93544",
    image: "/p1.png",
  },
  {
    num: "02",
    heading: "Easy to Forget",
    description:
      "Watching a workflow once doesn't mean users can actually remember it.",
    background: "#dd41c6",
    image: "/p2.png",
  },
  {
    num: "03",
    heading: "No Hands-on Practice",
    description:
      "Users only watch tutorials instead of interacting with the product themselves.",
    background: "#3559e9",
    image: "/p4.png",
  },
];

const ProblemCard = ({
  problem,
  index,
}: {
  problem: ProblemItem;
  index: number;
}) => (
  <motion.article
    className="sticky top-24 w-full rounded-lg bg-[#f7f7f7] overflow-hidden border border-gray-200/80 mb-16"
    style={{ zIndex: index + 1 }}
  >
    <div className="flex items-center justify-between px-6 md:px-10 lg:px-24 py-8 lg:py-10 min-h-72">
      <div className="flex flex-col max-w-sm">
        <span className="text-3xl font-extralight text-[#d1d1d1] font-nohemi leading-none select-none mb-4">
          Problem {problem.num}
        </span>
        <h3 className="text-2xl lg:text-3xl font-nohemi leading-tight">
          <span
            className="text-white p-2 tracking-wide inline"
            style={{ backgroundColor: problem.background }}
          >
            {problem.heading}
          </span>
        </h3>
        <p className="mt-4 text-[#5c5c5c] text-sm lg:text-base leading-relaxed">
          {problem.description}
        </p>
      </div>

      <div className="hidden lg:flex items-center justify-center w-120 h-full">
        <Image
          src={problem.image}
          alt="Problem visual placeholder"
          width={1200}
          height={1200}
          style={{height: '220px'}}
          className="opacity-80 w-full max-w-lg object-contain"
        />
      </div>
    </div>
  </motion.article>
);

export const Problem = () => {
  return (
    <section id="problem" className="w-full">
      {/* Heading — matches Clueso layout exactly */}
      <div className="px-4 md:px-10 lg:px-40 pt-16 lg:pt-20 pb-8">
        <p className="text-sm text-[#da5cc7] font-semibold tracking-widest uppercase">
          ✦ The Problem
        </p>
        <h2 className="text-3xl lg:text-5xl mt-3 font-nohemi text-[#171717] leading-tight max-w-2xl">
          Learning software shouldn't be passive
        </h2>
        <p className="text-[#5c5c5c] mt-4 hidden lg:block text-lg max-w-xl leading-relaxed">
          Most product tutorials are passive. Users watch the workflow but
          rarely practice it themselves.
        </p>
      </div>

      <div className="px-4 md:px-10 lg:px-40 pb-24">
        {problems.map((problem, index) => (
          <ProblemCard key={problem.num} problem={problem} index={index} />
        ))}
        <div className="h-24" />
      </div>
    </section>
  );
};
