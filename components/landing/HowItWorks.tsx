"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Target, TrendingUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Data ────────────────────────────────────────────────────

interface StepData {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const STEPS: StepData[] = [
  {
    number: "01",
    title: "Sign Up",
    description:
      "Create your free account in under 30 seconds. No credit card, no commitments — just your email and you're in.",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "Set Goals",
    description:
      "Tell us what you're training for. We'll build a personalised programme around your schedule, experience, and targets.",
    icon: Target,
  },
  {
    number: "03",
    title: "Track Progress",
    description:
      "Log workouts, hit milestones, and watch your data turn into real results. Every session makes you sharper.",
    icon: TrendingUp,
  },
];

// ─── Animation Variants ──────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

const STEP_REVEAL = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.2 + i * 0.2, ease: EASE },
  }),
};

const HEADING_REVEAL = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

// ─── SVG Connector ───────────────────────────────────────────
// Horizontal dashed path that "draws" itself on scroll. Sits between
// step cards on desktop (lg+). Hidden on smaller screens where the
// layout stacks vertically and uses a simple vertical line instead.

function HorizontalConnector() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <svg
      ref={ref}
      className="hidden lg:block absolute top-12 left-0 w-full h-6 pointer-events-none"
      viewBox="0 0 1000 24"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      {/* Track (faint background) */}
      <path
        d="M160 12 H840"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="8 6"
        className="text-border"
      />
      {/* Animated overlay that draws in */}
      <motion.path
        d="M160 12 H840"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="8 6"
        className="text-lime"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
      />
    </svg>
  );
}

// Vertical connector for mobile/tablet stacked layout.
// Draws downward between each step card.

function VerticalConnector({ index }: { index: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <svg
      ref={ref}
      className="mx-auto block lg:hidden h-12 w-6"
      viewBox="0 0 24 48"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 0 V48"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="6 5"
        className="text-border"
      />
      <motion.path
        d="M12 0 V48"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="6 5"
        className="text-lime"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.6, delay: 0.15 + index * 0.2, ease: "easeInOut" }}
      />
    </svg>
  );
}

// ─── Step Card ───────────────────────────────────────────────

function Step({ step, index }: { step: StepData; index: number }) {
  const Icon = step.icon;

  return (
    <motion.div
      className="relative flex flex-col items-center text-center"
      variants={STEP_REVEAL}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={index}
    >
      {/* Large stylised number — sits behind the icon */}
      <span
        className="absolute -top-4 font-display text-8xl text-muted-foreground/10 select-none"
        aria-hidden
      >
        {step.number}
      </span>

      {/* Icon with pulse ring */}
      <div className="relative z-10 mb-5">
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-2xl",
            "bg-lime/10 text-lime",
            "transition-colors duration-300",
          )}
        >
          <Icon size={28} strokeWidth={2} />
        </div>
        {/* Pulse ring — draws attention to each step sequentially */}
        <span
          className={cn(
            "absolute inset-0 -z-10 rounded-2xl bg-lime/20",
            "animate-ping [animation-duration:2.5s]",
          )}
          style={{ animationDelay: `${index * 0.6}s` }}
          aria-hidden
        />
      </div>

      {/* Step number badge */}
      <span className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-lime text-xs font-bold text-black">
        {index + 1}
      </span>

      <h3 className="font-display text-xl text-foreground">{step.title}</h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
        {step.description}
      </p>
    </motion.div>
  );
}

// ─── Main Section ────────────────────────────────────────────

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-muted/30 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center sm:mb-20"
          variants={HEADING_REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-lime">
            How It Works
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-foreground">
            Three steps to a{" "}
            <span className="text-lime">stronger you</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground leading-relaxed sm:text-lg">
            No complex setup, no learning curve. Get started in minutes and
            let the platform do the heavy lifting.
          </p>
        </motion.div>

        {/* Desktop: 3-column grid with horizontal SVG connector */}
        <div className="relative">
          <HorizontalConnector />

          {/* Mobile/Tablet: stacked with vertical connectors between cards */}
          <div className="flex flex-col items-center gap-0 lg:hidden">
            {STEPS.map((step, i) => (
              <div key={step.number} className="w-full max-w-sm">
                <Step step={step} index={i} />
                {i < STEPS.length - 1 && <VerticalConnector index={i} />}
              </div>
            ))}
          </div>

          {/* Desktop: horizontal grid — hidden below lg */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-12">
            {STEPS.map((step, i) => (
              <Step key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
