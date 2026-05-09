"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// ─── Animation Variants ──────────────────────────────────────

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

const STAGGER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

// ─── Sub-components ──────────────────────────────────────────

function CategoryList() {
  const cats = ["Gym", "Yoga", "Dance", "Sports", "Swimming", "Meditation"];
  return (
    <motion.div variants={FADE_UP} className="flex flex-col gap-4 items-end">
      {cats.map((cat, i) => {
        const isActive = i === 0;
        return (
          <div
            key={cat}
            className={cn(
              "flex items-center gap-6 text-sm transition-colors cursor-pointer",
              isActive ? "font-bold text-foreground" : "font-medium text-muted-foreground hover:text-foreground"
            )}
          >
            <span>{cat}</span>
            <span className={cn("w-6 text-right font-mono text-xs", isActive ? "text-foreground" : "text-muted-foreground")}>
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        );
      })}
    </motion.div>
  );
}

function MonitorCard() {
  const items = ["Exercises", "Food", "Starvation", "Walking", "Water", "Dream"];
  
  return (
    <motion.div variants={FADE_UP} className="relative z-10">
      <div className="mb-6">
        <h3 className="font-display font-bold text-2xl text-foreground leading-tight tracking-tight">
          Monitor your<br />performance
        </h3>
      </div>
      
      <div className="relative w-48 rounded-[24px] border border-border bg-card py-6 px-6 shadow-sm">
        <ul className="flex flex-col gap-4">
          {items.map((item, i) => (
            <li
              key={i}
              className={cn(
                "text-sm transition-colors cursor-pointer",
                i === 0 ? "font-bold text-foreground" : "font-medium text-muted-foreground hover:text-foreground"
              )}
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Liquid Tab Notch */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[100%] h-[100px] w-[40px] group cursor-pointer">
          {/* Mask to hide straight border line underneath */}
          <div className="absolute left-[-2px] top-[1px] bottom-[1px] w-[4px] bg-card z-10" />
          
          {/* SVG Organic Curve */}
          <svg
            width="40"
            height="100"
            viewBox="0 0 40 100"
            className="absolute left-[-1px] top-0 text-border fill-card"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 0 0 C 20 0 40 20 40 50 C 40 80 20 100 0 100"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
          
          {/* Floating Action Button inside Notch */}
          <div className="absolute left-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center z-20 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-lime group-hover:text-black">
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatBadge({ num, val, label }: { num: string; val: string; label: string }) {
  return (
    <motion.div variants={FADE_UP} className="flex flex-col gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
        {num}
      </div>
      <div>
        <h4 className="font-display text-4xl font-bold text-foreground tracking-tight">{val}</h4>
        <p className="text-sm font-semibold text-muted-foreground mt-1">{label}</p>
      </div>
    </motion.div>
  );
}

function Headline() {
  return (
    <div className="flex flex-col gap-2 sm:gap-4 w-full">
      <motion.div variants={FADE_UP} className="flex items-center flex-wrap gap-4">
        <h1 className="font-display text-5xl sm:text-7xl lg:text-[7.5rem] tracking-[-0.04em] text-foreground font-bold leading-none">
          Today's workout
        </h1>
        {/* <div className="relative h-14 w-32 sm:h-20 sm:w-48 lg:h-[100px] lg:w-64 overflow-hidden rounded-full bg-muted">
          <Image
            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop"
            alt="Workout inline 1"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div> */}
      </motion.div>
      <motion.div variants={FADE_UP} className="flex items-center flex-wrap gap-4">
        {/* <div className="relative h-14 w-24 sm:h-20 sm:w-32 lg:h-[100px] lg:w-48 overflow-hidden rounded-full bg-muted">
          <Image
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop"
            alt="Workout inline 2"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div> */}
        <h1 className="font-display text-5xl sm:text-7xl lg:text-[7.5rem] tracking-[-0.04em] text-foreground font-bold leading-none">
          is ready for you!
        </h1>
      </motion.div>
    </div>
  );
}

function HeroVisual() {
  const router = useRouter();
    return (
    <motion.div variants={FADE_UP} className="relative w-full h-[400px] sm:h-[500px] lg:h-[700px] mt-12 lg:mt-0">
      <div className="relative w-full h-full overflow-hidden rounded-[40px] sm:rounded-[64px] bg-muted shadow-2xl">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
          alt="Athlete working out"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Pill CTA - Bottom Right */}
      <div className="absolute -bottom-6 right-4 lg:bottom-12 lg:-right-8 z-20">
        <button onClick={() => router.push("/join")} className="group flex h-16 items-center overflow-hidden rounded-full bg-foreground pl-8 pr-2 shadow-2xl transition-transform hover:scale-[1.02] active:scale-[0.98]">
          <span className="mr-6 text-base font-bold text-background">Start Now</span>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lime text-black transition-transform group-hover:-rotate-45">
            <ArrowRight size={20} strokeWidth={2.5} />
          </div>
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Hero ───────────────────────────────────────────────

export function Hero() {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-background pt-32 pb-16 lg:pt-40 lg:pb-24">
      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={STAGGER}
        initial="hidden"
        animate="visible"
      >
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          <Headline />
          <div className="hidden lg:block shrink-0 mt-4">
            <CategoryList />
          </div>
        </div>

        {/* Main Body Row */}
        <div className="mt-16 lg:mt-24 flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Sidebar */}
          <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-12 justify-between">
            <MonitorCard />
            <div className="flex gap-12 lg:flex-col lg:gap-12">
              <StatBadge num="01" val="100+" label="Client Reviews" />
              <StatBadge num="02" val="20+" label="Expert Team" />
            </div>
          </div>

          {/* Main Visual */}
          <div className="w-full flex-1">
            <HeroVisual />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
