"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, TrendingUp, Flame, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Animation Variants ──────────────────────────────────────

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE_OUT_EXPO },
  }),
};

const STAGGER_CONTAINER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const WORD_REVEAL = {
  hidden: { opacity: 0, y: 40, rotateX: 45 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

const FLOAT = {
  initial: { y: 0 },
  animate: {
    y: [-6, 6, -6],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const FLOAT_DELAYED = {
  initial: { y: 0 },
  animate: {
    y: [6, -6, 6],
    transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" as const, delay: 1.5 },
  },
};

// ─── Avatar data ─────────────────────────────────────────────

const AVATARS = [
  { src: "/avatars/avatar-1.png", alt: "Athlete 1" },
  { src: "/avatars/avatar-2.png", alt: "Athlete 2" },
  { src: "/avatars/avatar-3.png", alt: "Athlete 3" },
  { src: "/avatars/avatar-4.png", alt: "Athlete 4" },
];

// ─── Sub-components ──────────────────────────────────────────

function AnimatedHeadline() {
  const line1 = "Today's workout";
  const line2 = "is ready for you!";

  return (
    <motion.h1
      className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground leading-[0.95]"
      variants={STAGGER_CONTAINER}
      initial="hidden"
      animate="visible"
      style={{ perspective: 400 }}
    >
      <span className="block overflow-hidden">
        {line1.split(" ").map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.25em]"
            variants={WORD_REVEAL}
          >
            {word}
          </motion.span>
        ))}
      </span>
      <span className="block overflow-hidden mt-1">
        {line2.split(" ").map((word, i) => (
          <motion.span
            key={i}
            className={cn(
              "inline-block mr-[0.25em]",
              word === "you!" && "text-lime",
            )}
            variants={WORD_REVEAL}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  );
}

function HeroCTAs() {
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4"
      variants={FADE_UP}
      initial="hidden"
      animate="visible"
      custom={0.7}
    >
      <Link
        href="/join"
        id="hero-cta-primary"
        className={cn(
          "inline-flex items-center justify-center rounded-full px-8 py-3.5",
          "bg-lime text-black font-semibold text-base",
          "transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]",
          "shadow-[0_0_40px_rgba(209,255,0,0.3)]",
        )}
      >
        Get Started Free
      </Link>
      <Link
        href="/demo"
        id="hero-cta-secondary"
        className={cn(
          "inline-flex items-center gap-2 justify-center rounded-full px-8 py-3.5",
          "border border-border text-foreground font-medium text-base",
          "transition-all duration-200 hover:bg-muted hover:scale-[1.02] active:scale-[0.98]",
        )}
      >
        <Play size={16} className="fill-current" />
        Watch Demo
      </Link>
    </motion.div>
  );
}

function SocialProof() {
  return (
    <motion.div
      className="flex items-center gap-3"
      variants={FADE_UP}
      initial="hidden"
      animate="visible"
      custom={0.9}
    >
      <div className="flex -space-x-2.5">
        {AVATARS.map(({ src, alt }, i) => (
          <div
            key={i}
            className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-background"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
        ))}
        {/* "+N" overflow indicator */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-lime text-[11px] font-bold text-black">
          +9k
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Trusted by <span className="font-semibold text-foreground">10,000+</span> athletes
      </p>
    </motion.div>
  );
}

function PerformanceBadge() {
  return (
    <motion.div
      className={cn(
        "absolute -left-4 sm:-left-6 bottom-16 sm:bottom-24 z-10",
        "flex items-center gap-3 rounded-2xl bg-background/90 backdrop-blur-md",
        "border border-border shadow-xl px-4 py-3",
      )}
      variants={FLOAT}
      initial="initial"
      animate="animate"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime">
        <TrendingUp size={20} className="text-black" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Weekly Progress</p>
        <p className="text-sm font-bold text-foreground">+23% Performance</p>
      </div>
    </motion.div>
  );
}

function CalorieBadge() {
  return (
    <motion.div
      className={cn(
        "absolute -right-3 sm:-right-5 top-12 sm:top-16 z-10",
        "flex items-center gap-3 rounded-2xl bg-background/90 backdrop-blur-md",
        "border border-border shadow-xl px-4 py-3",
      )}
      variants={FLOAT_DELAYED}
      initial="initial"
      animate="animate"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black dark:bg-white">
        <Flame size={20} className="text-white dark:text-black" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Calories Burned</p>
        <p className="text-sm font-bold text-foreground">1,248 kcal</p>
      </div>
    </motion.div>
  );
}

function HeroImage() {
  return (
    <motion.div
      className="relative w-full max-w-lg lg:max-w-none"
      variants={FADE_UP}
      initial="hidden"
      animate="visible"
      custom={0.4}
    >
      <PerformanceBadge />
      <CalorieBadge />

      {/* Main image with custom large-radius mask */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl">
        <Image
          src="/hero-athlete.png"
          alt="Athlete performing a workout in a modern gym"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover"
          priority
        />
        {/* Gradient overlay for depth — bottom fades into background so the image
            doesn't end with a hard edge against the page content below */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      </div>

      {/* Decorative accent ring behind the image */}
      <div
        className="absolute -inset-4 -z-10 rounded-[2.5rem] border border-lime/20"
        aria-hidden
      />
    </motion.div>
  );
}

function HeroContent() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Eyebrow tag */}
      <motion.div
        className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-muted/50 px-4 py-1.5"
        variants={FADE_UP}
        initial="hidden"
        animate="visible"
        custom={0.1}
      >
        <Timer size={14} className="text-lime" />
        <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
          No.1 Fitness Platform
        </span>
      </motion.div>

      <AnimatedHeadline />

      <motion.p
        className="max-w-md text-base sm:text-lg text-muted-foreground leading-relaxed"
        variants={FADE_UP}
        initial="hidden"
        animate="visible"
        custom={0.55}
      >
        Track every rep, set, and mile. Smart insights powered by real data — so you
        can train harder, recover smarter, and see results faster.
      </motion.p>

      <HeroCTAs />
      <SocialProof />
    </div>
  );
}

// ─── Main Hero ───────────────────────────────────────────────

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-background"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <HeroContent />
        <HeroImage />
      </div>

      {/* Background texture — subtle dot grid for visual depth */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />
    </section>
  );
}
