import { MousePointerClick, Upload } from "lucide-react";
import type { ReactNode } from "react";

const steps: { num: string; title: string; description: string; icon: ReactNode }[] = [
  {
    num: "01",
    title: "Upload Recording",
    description:
      "Upload a raw screen recording of your product walkthrough. No editing needed.",
    icon: <Upload className="h-7 w-7 text-[#da5cc7]" strokeWidth={1.5} />,
  },
  {
    num: "02",
    title: "AI Extracts Steps",
    description:
      "AI identifies every click and navigation and breaks it into sequential steps.",
    icon: <span className="text-2xl text-[#da5cc7] leading-none">✦</span>,
  },
  {
    num: "03",
    title: "Interactive Simulation",
    description:
      "Users click through a live simulation of your product and learn by doing.",
    icon: <MousePointerClick className="h-7 w-7 text-[#da5cc7]" strokeWidth={1.5} />,
  },
];

const StepCard = ({ step }: { step: (typeof steps)[number] }) => (
  <article className="rounded-lg border border-gray-200 bg-white overflow-hidden flex flex-col h-full">
    {/* Icon area */}
    <div
      className="h-40 lg:h-48 flex items-center justify-center border-b border-gray-100 relative overflow-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Fading diagonal stripes */}
      <div
        className="absolute inset-x-0 top-1/6 bottom-1/6 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent, transparent 10px, #f0f0f0 10px, #f0f0f0 11px)",
          maskImage: "radial-gradient(circle, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 70%)",
        }}
      />
      <div className="flex h-16 w-16 items-center z-10 justify-center rounded-full bg-white border border-gray-200 shadow-sm">
        {step.icon}
      </div>
    </div>

    {/* Content */}
    <div className="px-6 lg:px-8 py-6 lg:py-7">
      <span className="text-[11px] font-bold uppercase tracking-widest text-gray-300">
        Step {step.num}
      </span>
      <h3 className="mt-2 text-2xl font-nohemi tracking-wide text-[#171717]">
        {step.title}
      </h3>
      <p className="mt-3 text-[#5c5c5c] text-base leading-relaxed max-w-xl">
        {step.description}
      </p>
    </div>
  </article>
);

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="w-full">
      <div className="px-4 md:px-10 lg:px-40 pb-8">
        <p className="text-sm text-[#da5cc7] font-semibold tracking-widest uppercase">
          ✦ How It Works
        </p>

        <h2 className="text-3xl lg:text-5xl mt-3 font-nohemi text-[#171717] leading-tight max-w-3xl">
          From recording to tutorial in&nbsp;minutes
        </h2>

        <p className="text-[#5c5c5c] mt-4 hidden lg:block text-lg max-w-xl leading-relaxed">
          Three steps. No code. Interactive learning experience.
        </p>
      </div>

      <div className="px-4 md:px-10 lg:px-40 ">
        <div
          className="relative rounded-lg p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 lg:min-h-[460px] items-start"
          style={{
            backgroundColor: "#FAE6F8",
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent, transparent 10px, #FCDFF7 10px, #FCDFF7 11px)",
          }}
        >
          {steps.map((step) => (
            <StepCard key={step.num} step={step} />
          ))}
        </div>

        <div className="h-16 lg:h-20" />
      </div>
    </section>
  );
};
