"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type FeedbackState = "idle" | "correct" | "wrong";

type TutorialStep = {
  id: number;
  instruction: string;
  targetId: string;
  hint: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 1,
    instruction: 'Click the "Settings" button in the sidebar.',
    targetId: "sidebar-settings",
    hint: "Look for Settings in the left sidebar.",
  },
  {
    id: 2,
    instruction: 'Click the "Billing" tab in the top navigation.',
    targetId: "tab-billing",
    hint: "Find the Billing tab in the top navigation bar.",
  },
  {
    id: 3,
    instruction: 'Toggle "Enable Notifications" in the content area.',
    targetId: "toggle-notifications",
    hint: "Scroll the main content area and find the toggle.",
  },
];

const TOTAL_STEPS = TUTORIAL_STEPS.length;

// ─── Sub-components ───────────────────────────────────────────────────────────

const StepProgress = ({
  current,
  total,
  completed,
}: {
  current: number;
  total: number;
  completed: number[];
}) => (
  <div className="flex items-center gap-3">
    <span className="text-xs font-semibold tracking-widest uppercase text-[#5c5c5c]">
      Step {current} of {total}
    </span>
    <div className="flex gap-1.5">
      {Array.from({ length: total }, (_, i) => i + 1).map((step) => (
        <span
          key={step}
          className={`block h-1.5 w-6 rounded-full transition-all duration-300 ${
            completed.includes(step)
              ? "bg-[#da5cc7]"
              : step === current
              ? "bg-[#171717]"
              : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  </div>
);

const FeedbackMessage = ({
  state,
  isComplete,
}: {
  state: FeedbackState;
  isComplete: boolean;
}) => {
  if (isComplete) return null;
  if (state === "idle") return null;

  return (
    <div
      className={`mt-3 flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
        state === "correct" ? "text-emerald-600" : "text-rose-500"
      }`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-xs text-white ${
          state === "correct" ? "bg-emerald-500" : "bg-rose-400"
        }`}
      >
        {state === "correct" ? "✓" : "✕"}
      </span>
      {state === "correct" ? "Correct! Moving on…" : "Not the right element — try again."}
    </div>
  );
};

const StepInstruction = ({
  step,
  feedback,
  isComplete,
}: {
  step: TutorialStep | undefined;
  feedback: FeedbackState;
  isComplete: boolean;
}) => (
  <div
    className={`rounded-xl border px-5 py-4 transition-all duration-300 ${
      feedback === "wrong"
        ? "border-rose-200 bg-rose-50"
        : "border-gray-200 bg-white"
    }`}
  >
    {isComplete ? (
      <p className="font-semibold text-[#171717]">🎉 Tutorial complete!</p>
    ) : (
      <p className="font-medium text-[#171717] leading-snug">
        {step?.instruction}
      </p>
    )}
    {step && !isComplete && (
      <p className="mt-1 text-xs text-[#5c5c5c]">{step.hint}</p>
    )}
    <FeedbackMessage state={feedback} isComplete={isComplete} />
  </div>
);

// ─── Fake UI pieces ───────────────────────────────────────────────────────────

type ClickableProps = {
  id: string;
  label: string;
  isTarget: boolean;
  isCompleted: boolean;
  onClick: (id: string) => void;
  locked: boolean;
  icon?: string;
  variant?: "sidebar" | "tab" | "toggle";
  active?: boolean;
};

const ClickableElement = ({
  id,
  label,
  isTarget,
  isCompleted,
  onClick,
  locked,
  icon,
  variant = "sidebar",
  active = false,
}: ClickableProps) => {
  const pulse = isTarget && !isCompleted;

  const baseClasses =
    "relative cursor-pointer select-none transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#da5cc7]";

  const variantClasses: Record<string, string> = {
    sidebar: `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium w-full text-left ${
      active
        ? "bg-[#f3f3f3] text-[#171717]"
        : "text-[#5c5c5c] hover:bg-[#f9f9f9] hover:text-[#171717]"
    }`,
    tab: `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
      active
        ? "border-[#171717] text-[#171717]"
        : "border-transparent text-[#5c5c5c] hover:text-[#171717] hover:border-gray-300"
    }`,
    toggle: "flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 w-full text-left hover:border-gray-300",
  };

  return (
    <button
      id={id}
      disabled={locked || isCompleted}
      onClick={() => onClick(id)}
      className={`${baseClasses} ${variantClasses[variant]} ${
        pulse ? "ring-2 ring-[#da5cc7] ring-offset-1 animate-pulse" : ""
      } ${isCompleted ? "opacity-50" : ""}`}
    >
      {variant === "toggle" ? (
        <>
          <span className="text-sm font-medium text-[#171717]">
            {icon} {label}
          </span>
          <span
            className={`flex h-5 w-9 items-center rounded-full px-0.5 transition-colors duration-300 ${
              isCompleted ? "bg-[#da5cc7]" : "bg-gray-200"
            }`}
          >
            <span
              className={`h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 ${
                isCompleted ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </span>
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          <span>{label}</span>
          {isCompleted && <span className="ml-auto text-[#da5cc7]">✓</span>}
        </>
      )}
    </button>
  );
};

const Sidebar = ({
  currentTarget,
  completedTargets,
  onElementClick,
  locked,
  activeItem,
}: {
  currentTarget: string;
  completedTargets: string[];
  onElementClick: (id: string) => void;
  locked: boolean;
  activeItem: string;
}) => {
  const items = [
    { id: "sidebar-dashboard", label: "Dashboard", icon: "⬛" },
    { id: "sidebar-settings", label: "Settings", icon: "⚙️" },
    { id: "sidebar-analytics", label: "Analytics", icon: "📊" },
  ];

  return (
    <nav className="flex w-44 shrink-0 flex-col gap-1 border-r border-gray-100 py-4 pr-3">
      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
        Menu
      </p>
      {items.map((item) => (
        <ClickableElement
          key={item.id}
          id={item.id}
          label={item.label}
          icon={item.icon}
          isTarget={item.id === currentTarget}
          isCompleted={completedTargets.includes(item.id)}
          onClick={onElementClick}
          locked={locked}
          variant="sidebar"
          active={activeItem === item.id}
        />
      ))}
    </nav>
  );
};

const TopTabs = ({
  currentTarget,
  completedTargets,
  onElementClick,
  locked,
  activeTab,
}: {
  currentTarget: string;
  completedTargets: string[];
  onElementClick: (id: string) => void;
  locked: boolean;
  activeTab: string;
}) => {
  const tabs = [
    { id: "tab-overview", label: "Overview" },
    { id: "tab-billing", label: "Billing" },
    { id: "tab-users", label: "Users" },
  ];

  return (
    <div className="flex gap-0 border-b border-gray-100">
      {tabs.map((tab) => (
        <ClickableElement
          key={tab.id}
          id={tab.id}
          label={tab.label}
          isTarget={tab.id === currentTarget}
          isCompleted={completedTargets.includes(tab.id)}
          onClick={onElementClick}
          locked={locked}
          variant="tab"
          active={activeTab === tab.id}
        />
      ))}
    </div>
  );
};

const ContentArea = ({
  currentTarget,
  completedTargets,
  onElementClick,
  locked,
}: {
  currentTarget: string;
  completedTargets: string[];
  onElementClick: (id: string) => void;
  locked: boolean;
}) => (
  <div className="flex flex-1 flex-col gap-3 p-5">
    {/* Placeholder rows */}
    <div className="h-2.5 w-3/4 rounded-full bg-gray-100" />
    <div className="h-2.5 w-1/2 rounded-full bg-gray-100" />
    <div className="mt-2 h-2.5 w-2/3 rounded-full bg-gray-100" />

    {/* Toggle */}
    <div className="mt-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
        Preferences
      </p>
      <ClickableElement
        id="toggle-notifications"
        label="Enable Notifications"
        icon="🔔"
        isTarget={"toggle-notifications" === currentTarget}
        isCompleted={completedTargets.includes("toggle-notifications")}
        onClick={onElementClick}
        locked={locked}
        variant="toggle"
      />
    </div>

    {/* More placeholder rows */}
    <div className="mt-4 h-2.5 w-5/6 rounded-full bg-gray-100" />
    <div className="h-2.5 w-1/3 rounded-full bg-gray-100" />
  </div>
);

const FakeProductUI = ({
  currentTarget,
  completedTargets,
  onElementClick,
  locked,
  activeSection,
  activeTab,
}: {
  currentTarget: string;
  completedTargets: string[];
  onElementClick: (id: string) => void;
  locked: boolean;
  activeSection: string;
  activeTab: string;
}) => (
  <div className="overflow-hidden rounded-xl border border-gray-200 bg-[#fafafa]">
    {/* Fake browser chrome */}
    <div className="flex items-center gap-1.5 border-b border-gray-100 bg-white px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
      <div className="ml-3 flex-1 rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-400">
        app.example.com/settings
      </div>
    </div>

    {/* App body */}
    <div className="flex" style={{ minHeight: 220 }}>
      <Sidebar
        currentTarget={currentTarget}
        completedTargets={completedTargets}
        onElementClick={onElementClick}
        locked={locked}
        activeItem={activeSection}
      />

      <div className="flex flex-1 flex-col">
        <TopTabs
          currentTarget={currentTarget}
          completedTargets={completedTargets}
          onElementClick={onElementClick}
          locked={locked}
          activeTab={activeTab}
        />
        <ContentArea
          currentTarget={currentTarget}
          completedTargets={completedTargets}
          onElementClick={onElementClick}
          locked={locked}
        />
      </div>
    </div>
  </div>
);

// ─── Root component ───────────────────────────────────────────────────────────

export const Demo = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [completedTargets, setCompletedTargets] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<FeedbackState>("idle");
  const [locked, setLocked] = useState(false);

  // Derived UI state to make the fake product feel "alive"
  const [activeSection, setActiveSection] = useState("sidebar-dashboard");
  const [activeTab, setActiveTab] = useState("tab-overview");

  const isComplete = completedSteps.length === TOTAL_STEPS;
  const activeStepData = TUTORIAL_STEPS.find((s) => s.id === currentStep);

  const reset = useCallback(() => {
    setCurrentStep(1);
    setCompletedSteps([]);
    setCompletedTargets([]);
    setFeedback("idle");
    setLocked(false);
    setActiveSection("sidebar-dashboard");
    setActiveTab("tab-overview");
  }, []);

  const handleElementClick = useCallback(
    (clickedId: string) => {
      if (locked || isComplete) return;

      // Brief interaction lock to prevent rapid clicking
      setLocked(true);
      setTimeout(() => setLocked(false), 300);

      const target = activeStepData?.targetId;

      if (clickedId === target) {
        setFeedback("correct");

        // Reflect click in the fake UI
        if (clickedId.startsWith("sidebar-")) setActiveSection(clickedId);
        if (clickedId.startsWith("tab-")) setActiveTab(clickedId);

        setCompletedTargets((prev) => [...prev, clickedId]);

        setTimeout(() => {
          setCompletedSteps((prev) => [...prev, currentStep]);
          setFeedback("idle");
          if (currentStep < TOTAL_STEPS) {
            setCurrentStep((prev) => prev + 1);
          }
        }, 800);
      } else {
        setFeedback("wrong");
        setTimeout(() => setFeedback("idle"), 1200);
      }
    },
    [locked, isComplete, activeStepData, currentStep]
  );

  // Clear feedback when step advances
  useEffect(() => {
    setFeedback("idle");
  }, [currentStep]);

  const currentTarget = isComplete ? "" : (activeStepData?.targetId ?? "");

  return (
    <section id="demo" className="w-full">
      <div className="px-4 md:px-10 lg:px-40 pt-16 lg:pt-20 pb-8">
        <p className="text-sm text-[#da5cc7] font-semibold tracking-widest uppercase">
          ✦ Try It Yourself
        </p>

        <h2 className="text-3xl lg:text-5xl mt-3 font-nohemi text-[#171717] leading-tight max-w-3xl">
          Interactive Demo
        </h2>

        <p className="text-[#5c5c5c] mt-4 hidden lg:block text-lg max-w-xl leading-relaxed">
          Follow the instructions below and click the correct element to
          complete each step.
        </p>
      </div>

      <div className="px-4 md:px-10 lg:px-40 pb-24">
        <div className="relative">
          {/* Background glow — mirrors Solution.tsx */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f8f8f8] blur-3xl opacity-95" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,248,248,0.98)_0%,rgba(248,248,248,0.86)_18%,rgba(248,248,248,0.56)_38%,rgba(248,248,248,0.16)_62%,rgba(248,248,248,0)_82%)]" />

          <article className="relative rounded-2xl border bg-white border-gray-200 overflow-hidden">
            <div className="px-6 lg:px-8 py-6 lg:py-7 border-b border-gray-100 flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <StepProgress
                  current={isComplete ? TOTAL_STEPS : currentStep}
                  total={TOTAL_STEPS}
                  completed={completedSteps}
                />
                <div className="mt-3">
                  <StepInstruction
                    step={activeStepData}
                    feedback={feedback}
                    isComplete={isComplete}
                  />
                </div>
              </div>

              {isComplete && (
                <button
                  onClick={reset}
                  className="shrink-0 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-[#5c5c5c] transition hover:border-[#da5cc7] hover:text-[#da5cc7]"
                >
                  ↺ Restart
                </button>
              )}
            </div>

            <div className="px-6 lg:px-8 py-6 lg:py-7">
              <FakeProductUI
                currentTarget={currentTarget}
                completedTargets={completedTargets}
                onElementClick={handleElementClick}
                locked={locked}
                activeSection={activeSection}
                activeTab={activeTab}
              />
            </div>
          </article>
        </div>

        <div className="h-16 lg:h-20" />
      </div>
    </section>
  );
};
