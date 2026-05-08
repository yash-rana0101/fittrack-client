"use client";

import { motion } from "framer-motion";
import { UserPlus, Target, TrendingUp, Dumbbell, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: "signup",
    title: "Quick Sign Up",
    description: "Create your free account in under 30 seconds. No credit card required.",
    icon: UserPlus,
  },
  {
    id: "goals",
    title: "Set Your Goals",
    description: "Tell us what you're training for and we'll build a personalized program.",
    icon: Target,
  },
  {
    id: "track",
    title: "Track Progress",
    description: "Log workouts and watch your data turn into real, measurable results.",
    icon: TrendingUp,
  },
  {
    id: "results",
    title: "Achieve Results",
    description: "Hit milestones and elevate your endurance with expert guidance.",
    icon: Dumbbell,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export function HowItWorks() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-24 lg:py-32">
      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={STAGGER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        
        {/* ─── Typography Header ─── */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24 mb-24">
          <motion.div variants={FADE_UP} className="flex flex-col items-start gap-8 w-full lg:w-1/2">
            <h2 className="font-display text-6xl sm:text-7xl lg:text-[9rem] font-bold text-foreground tracking-tighter leading-none">
              How It
            </h2>
            <p className="max-w-sm text-sm font-medium text-muted-foreground ml-0 lg:ml-24">
              Whether you're a beginner looking to kickstart your fitness journey or an experienced athlete aiming to reach new heights.
            </p>
          </motion.div>
          <motion.div variants={FADE_UP} className="flex flex-col items-start lg:items-end gap-8 w-full lg:w-1/2 mt-0 lg:mt-24">
            <p className="max-w-sm text-sm font-medium text-muted-foreground mr-0 lg:mr-24 text-left lg:text-right">
              At FitTrack, we are dedicated to helping you achieve your health and wellness goals with a comprehensive range of fitness tracking tools.
            </p>
            <h2 className="font-display text-6xl sm:text-7xl lg:text-[9rem] font-bold text-foreground tracking-tighter leading-none">
              Works
            </h2>
          </motion.div>
        </div>

        {/* ─── Cutout Cards Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                variants={FADE_UP}
                className="relative overflow-visible rounded-[32px] border border-border bg-card p-6 sm:p-8 pt-10 h-full flex flex-col group transition-shadow hover:shadow-xl"
              >
                {/* Masking block to hide the default rounded border on top-right */}
                <div className="absolute -right-[2px] -top-[2px] h-[66px] w-[66px] bg-background z-10" />
                
                {/* SVG Organic Cutout */}
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  className="absolute -right-[1px] -top-[1px] z-20 text-border"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Fill area connecting the card to the cutout */}
                  <path
                    d="M 0 0 C 32 0 32 32 32 32 C 32 64 64 64 64 64 L 0 64 Z"
                    className="fill-card"
                  />
                  {/* The curved border stroke */}
                  <path
                    d="M 0 0 C 32 0 32 32 32 32 C 32 64 64 64 64 64"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                </svg>

                {/* Floating Arrow Button */}
                <button className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-lime group-hover:text-black z-30">
                  <ArrowUpRight size={20} strokeWidth={2.5} />
                </button>

                {/* Card Content */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-muted/50 text-foreground mb-16 transition-colors group-hover:bg-lime/20 group-hover:text-lime">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                
                <div className="mt-auto">
                  <h3 className="font-display text-xl font-bold text-foreground tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
}
