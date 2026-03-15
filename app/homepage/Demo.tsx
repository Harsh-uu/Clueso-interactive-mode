"use client";

import { Check, Loader2, Upload, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

type DemoStage = "upload" | "processing" | "stepsDetected" | "interactive";
type FeedbackState = "idle" | "correct" | "wrong";

type TutorialStep = {
  id: number;
  label: string;
  targetId: string;
};

// ─── Data ───────────────────────────────────────────────────────────────────

const STEPS: TutorialStep[] = [
  { id: 1, label: "Open Settings", targetId: "sidebar-settings" },
  { id: 2, label: "Go to Billing", targetId: "tab-billing" },
  { id: 3, label: "Enable Notifications", targetId: "toggle-notifications" },
];

const TOTAL = STEPS.length;

const PROCESSING_MSGS = [
  "Analyzing recording…",
  "Detecting product actions…",
  "Mapping tutorial steps…",
  "Preparing simulation…",
];

const DEMO_HEIGHT = 460;

// ─── Fake product UI ────────────────────────────────────────────────────────

const ProductShell = ({
  target,
  done,
  onClick,
  locked,
  section,
  tab,
}: {
  target: string;
  done: string[];
  onClick: (id: string) => void;
  locked: boolean;
  section: string;
  tab: string;
}) => {
  const sidebarItems = [
    { id: "sidebar-dashboard", label: "Dashboard" },
    { id: "sidebar-settings", label: "Settings" },
    { id: "sidebar-analytics", label: "Analytics" },
  ];

  const tabs = [
    { id: "tab-overview", label: "Overview" },
    { id: "tab-billing", label: "Billing" },
    { id: "tab-users", label: "Users" },
  ];

  const hit = (id: string) => {
    if (!locked) onClick(id);
  };

  return (
    <div className="flex flex-col h-full rounded-lg border border-gray-200 bg-white overflow-hidden">
      {/* Browser bar */}
      <div className="flex items-center gap-1.5 border-b border-gray-100 px-4 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 rounded bg-gray-50 px-3 py-0.5 text-[11px] text-gray-400 font-mono">
          app.example.com/settings
        </span>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-40 shrink-0 border-r border-gray-100 p-3 flex flex-col gap-0.5">
          <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-gray-300 px-2.5 mb-1">
            Menu
          </span>
          {sidebarItems.map((item) => {
            const isTarget = item.id === target && !done.includes(item.id);
            const isActive = item.id === section;
            const isDone = done.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => hit(item.id)}
                disabled={locked || isDone}
                className={`
                  text-left text-[13px] px-2.5 py-1.5 rounded transition-all duration-150
                  ${isTarget ? "ring-1 ring-[#da5cc7]/50 bg-[#fdf2fc]" : ""}
                  ${isActive && !isTarget ? "bg-gray-50 text-gray-900 font-medium" : ""}
                  ${!isActive && !isTarget ? "text-gray-500 hover:bg-gray-50 hover:text-gray-700" : ""}
                  ${isDone ? "opacity-40 cursor-default" : "cursor-pointer"}
                `}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Main area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            {tabs.map((t) => {
              const isTarget = t.id === target && !done.includes(t.id);
              const isActive = t.id === tab;
              const isDone = done.includes(t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => hit(t.id)}
                  disabled={locked || isDone}
                  className={`
                    text-[13px] px-4 py-2 border-b-2 transition-all duration-150
                    ${isTarget ? "ring-1 ring-inset ring-[#da5cc7]/50 bg-[#fdf2fc]" : ""}
                    ${isActive && !isTarget ? "border-gray-900 text-gray-900 font-medium" : "border-transparent"}
                    ${!isActive && !isTarget ? "text-gray-400 hover:text-gray-600" : ""}
                    ${isDone ? "opacity-40 cursor-default" : "cursor-pointer"}
                  `}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="flex-1 p-5 space-y-3">
            <div className="h-2 w-3/4 rounded bg-gray-100" />
            <div className="h-2 w-1/2 rounded bg-gray-100" />
            <div className="h-2 w-2/3 rounded bg-gray-50" />

            <div className="pt-4">
              <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-gray-300">
                Preferences
              </span>
              {(() => {
                const id = "toggle-notifications";
                const isTarget = id === target && !done.includes(id);
                const isDone = done.includes(id);
                return (
                  <button
                    onClick={() => hit(id)}
                    disabled={locked || isDone}
                    className={`
                      mt-2 flex w-full items-center justify-between rounded border px-4 py-3 text-[13px] transition-all duration-150
                      ${isTarget ? "ring-1 ring-[#da5cc7]/50 bg-[#fdf2fc] border-[#da5cc7]/20" : "border-gray-100 bg-white"}
                      ${isDone ? "opacity-40 cursor-default" : "cursor-pointer hover:border-gray-200"}
                    `}
                  >
                    <span className="text-gray-700">Enable Notifications</span>
                    <span
                      className={`h-5 w-9 rounded-full px-0.5 flex items-center transition-colors duration-200 ${
                        isDone ? "bg-emerald-400" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                          isDone ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </span>
                  </button>
                );
              })()}
            </div>

            <div className="pt-3 space-y-2">
              <div className="h-2 w-5/6 rounded bg-gray-50" />
              <div className="h-2 w-1/3 rounded bg-gray-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Root component ─────────────────────────────────────────────────────────

export const Demo = () => {
  const [stage, setStage] = useState<DemoStage>("upload");
  const [msgIdx, setMsgIdx] = useState(0);
  const [revealed, setRevealed] = useState(0);

  const [step, setStep] = useState(1);
  const [doneSteps, setDoneSteps] = useState<number[]>([]);
  const [doneTargets, setDoneTargets] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<FeedbackState>("idle");
  const [locked, setLocked] = useState(false);

  const [section, setSection] = useState("sidebar-dashboard");
  const [tab, setTab] = useState("tab-overview");

  const containerRef = useRef<HTMLDivElement>(null);

  const isComplete = doneSteps.length === TOTAL;
  const activeStep = STEPS.find((s) => s.id === step);
  const target = isComplete ? "" : (activeStep?.targetId ?? "");

  // ── Handlers ──────────────────────────────────────────────────────────

  const reset = useCallback(() => {
    setStage("upload");
    setMsgIdx(0);
    setRevealed(0);
    setStep(1);
    setDoneSteps([]);
    setDoneTargets([]);
    setFeedback("idle");
    setLocked(false);
    setSection("sidebar-dashboard");
    setTab("tab-overview");
  }, []);

  const handleClick = useCallback(
    (id: string) => {
      if (locked || isComplete) return;

      setLocked(true);
      setTimeout(() => setLocked(false), 300);

      if (id === activeStep?.targetId) {
        setFeedback("correct");
        if (id.startsWith("sidebar-")) setSection(id);
        if (id.startsWith("tab-")) setTab(id);
        setDoneTargets((p) => [...p, id]);

        setTimeout(() => {
          setDoneSteps((p) => [...p, step]);
          setFeedback("idle");
          if (step < TOTAL) setStep((p) => p + 1);
        }, 700);
      } else {
        setFeedback("wrong");
        setTimeout(() => setFeedback("idle"), 1000);
      }
    },
    [locked, isComplete, activeStep, step]
  );

  // ── Timers ────────────────────────────────────────────────────────────

  useEffect(() => {
    if (stage !== "processing") return;
    let t: ReturnType<typeof setTimeout>;
    let i = 0;
    const tick = () => {
      if (i < PROCESSING_MSGS.length - 1) {
        i++;
        setMsgIdx(i);
        t = setTimeout(tick, 800);
      } else {
        t = setTimeout(() => setStage("stepsDetected"), 800);
      }
    };
    t = setTimeout(tick, 800);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage !== "stepsDetected") return;
    setRevealed(0);
    let n = 0;
    const t = setInterval(() => {
      n++;
      setRevealed(n);
      if (n >= TOTAL) clearInterval(t);
    }, 500);
    return () => clearInterval(t);
  }, [stage]);

  useEffect(() => {
    setFeedback("idle");
  }, [step]);

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <section id="demo" className="w-full">
      {/* Header */}
      <div className="px-4 md:px-10 lg:px-40 pb-8">
        <p className="text-sm text-[#da5cc7] font-semibold tracking-widest uppercase">
          ✦ Try It Yourself
        </p>

        <h2 className="text-3xl lg:text-5xl mt-3 font-nohemi text-[#171717] leading-tight max-w-3xl">
          See it in action
        </h2>

        <p className="text-[#5c5c5c] mt-4 hidden lg:block text-lg max-w-xl leading-relaxed">
          Upload, process, and walk through it yourself.
        </p>
      </div>

      {/* Demo card */}
      <div className="px-4 md:px-10 lg:px-40">
        <div className="relative">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f8f8f8] blur-3xl opacity-95" />

          <div
            ref={containerRef}
            className="relative rounded-lg border border-gray-200 bg-white overflow-hidden"
            style={{ minHeight: DEMO_HEIGHT }}
          >
            {/* ── Upload ──────────────────────────────────────────── */}
            {stage === "upload" && (
              <div
                className="flex flex-col items-center justify-center gap-6 px-8"
                style={{ minHeight: DEMO_HEIGHT }}
              >
                <div className="w-72 border border-dashed border-gray-200 rounded-xl p-10 flex flex-col items-center gap-3">
                  <Upload className="h-6 w-6 text-gray-300" strokeWidth={1.5} />
                  <div className="text-center">
                    <p className="text-sm text-gray-500">product-walkthrough.mp4</p>
                    <p className="text-[11px] text-gray-300 mt-0.5">4.2 MB</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMsgIdx(0);
                    setStage("processing");
                  }}
                  className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                >
                  Upload Recording
                </button>
              </div>
            )}

            {/* ── Processing ──────────────────────────────────────── */}
            {stage === "processing" && (
              <div
                className="flex flex-col items-center justify-center px-8"
                style={{ minHeight: DEMO_HEIGHT }}
              >
                <div className="w-full max-w-xs space-y-4">
                  {PROCESSING_MSGS.map((msg, i) => (
                    <div
                      key={msg}
                      className={`flex items-center gap-3 transition-all duration-300 ${
                        i > msgIdx ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
                      }`}
                    >
                      {i < msgIdx ? (
                        <Check className="h-4 w-4 text-emerald-400 shrink-0" strokeWidth={2.5} />
                      ) : (
                        <Loader2 className="h-4 w-4 text-gray-300 animate-spin shrink-0" strokeWidth={2} />
                      )}
                      <span className={`text-sm ${i <= msgIdx ? "text-gray-600" : "text-gray-300"}`}>
                        {msg}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Steps detected ───────────────────────────────────── */}
            {stage === "stepsDetected" && (
              <div
                className="flex flex-col items-center justify-center px-8"
                style={{ minHeight: DEMO_HEIGHT }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-300 mb-5">
                  Detected {TOTAL} steps
                </p>
                <div className="w-full max-w-xs space-y-2 mb-8">
                  {STEPS.map((s, i) => (
                    <div
                      key={s.id}
                      className={`flex items-center gap-3 border border-gray-100 px-4 py-2.5 text-sm transition-all duration-300 ${
                        i < revealed
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }`}
                    >
                      <span className="h-5 w-5 rounded-full bg-gray-100 text-gray-400 text-[11px] font-medium flex items-center justify-center shrink-0">
                        {s.id}
                      </span>
                      <span className="text-gray-600">{s.label}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setStage("interactive")}
                  disabled={revealed < TOTAL}
                  className={`rounded-lg px-5 py-2 text-sm font-medium transition-all ${
                    revealed >= TOTAL
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "bg-gray-100 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  Start Tutorial
                </button>
              </div>
            )}

            {/* ── Interactive ──────────────────────────────────────── */}
            {stage === "interactive" && (
              <div className="flex flex-col h-full" style={{ minHeight: DEMO_HEIGHT }}>
                {/* Completion overlay */}
                {isComplete && (
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 mb-4">
                      <Check className="h-6 w-6 text-emerald-500" strokeWidth={2.5} />
                    </div>
                    <p className="text-lg font-semibold text-gray-900 mb-1">Tutorial Complete</p>
                    <p className="text-sm text-gray-400 mb-6">All steps finished successfully</p>
                    <button
                      onClick={reset}
                      className="rounded-lg bg-gray-900 px-5 py-2 text-sm cursor-pointer font-medium text-white hover:bg-gray-800 transition-colors"
                    >
                      Restart Demo
                    </button>
                  </div>
                )}

                {/* Feedback overlay */}
                {feedback !== "idle" && (
                  <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg ${
                        feedback === "correct" ? "ring-1 ring-emerald-100" : "ring-1 ring-rose-100"
                      }`}
                    >
                      {feedback === "correct" ? (
                        <Check className="h-7 w-7 text-emerald-500" strokeWidth={2.5} />
                      ) : (
                        <X className="h-7 w-7 text-rose-400" strokeWidth={2.5} />
                      )}
                    </div>
                  </div>
                )}

                {/* Top bar: progress + instruction */}
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    {STEPS.map((s) => {
                      const isDone = doneSteps.includes(s.id);
                      const isCurrent = s.id === step && !isDone;
                      return (
                        <span
                          key={s.id}
                          className={`h-1.5 w-5 rounded-full transition-colors duration-300 ${
                            isDone ? "bg-emerald-400" : isCurrent ? "bg-gray-900" : "bg-gray-200"
                          }`}
                        />
                      );
                    })}
                    <span className="text-[11px] text-gray-400 ml-1">
                      {isComplete ? `${TOTAL}/${TOTAL}` : `${step}/${TOTAL}`}
                    </span>
                  </div>
                  {!isComplete && activeStep && (
                    <span className="text-[13px] text-gray-500">
                      {activeStep.label}
                    </span>
                  )}
                </div>

                {/* Content: Product UI + step sidebar */}
                <div className="flex flex-1 min-h-0">
                  <div className="relative flex-1 p-5 min-w-0">
                    <ProductShell
                      target={target}
                      done={doneTargets}
                      onClick={handleClick}
                      locked={locked}
                      section={section}
                      tab={tab}
                    />
                  </div>

                  {/* Step sidebar */}
                  <div className="hidden lg:flex w-48 shrink-0 border-l border-gray-100 flex-col p-4">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-gray-300 mb-3">
                      Steps
                    </span>
                    <div className="space-y-1">
                      {STEPS.map((s) => {
                        const isDone = doneSteps.includes(s.id);
                        const isCurrent = s.id === step && !isDone;
                        return (
                          <div
                            key={s.id}
                            className={`flex items-center gap-2 px-2.5 py-1.5 text-[12px] rounded transition-all duration-200 ${
                              isDone
                                ? "text-emerald-600 bg-emerald-50/60"
                                : isCurrent
                                ? "text-gray-900 bg-gray-50 font-medium"
                                : "text-gray-400"
                            }`}
                          >
                            <span
                              className={`h-1 w-1 rounded-full shrink-0 ${
                                isDone ? "bg-emerald-400" : isCurrent ? "bg-gray-900" : "bg-gray-300"
                              }`}
                            />
                            {s.label}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="h-16 lg:h-20" />
      </div>
    </section>
  );
};
