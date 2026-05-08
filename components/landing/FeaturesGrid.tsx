"use client";

import { motion } from "framer-motion";
import { Dumbbell, Apple, BarChart3, Users } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const FEATURES = [
  {
    title: "Workout Tracking",
    description:
      "Log every rep, set, and rest period. Smart auto-detection adapts to your routine and suggests progressive overloads.",
    icon: Dumbbell,
    image: "/features/workout.png",
    imageAlt: "Workout tracking interface showing exercise timer and rep counter",
  },
  {
    title: "Nutrition Plans",
    description:
      "Personalised macro splits and meal suggestions that adapt weekly based on your training volume and recovery needs.",
    icon: Apple,
    image: "/features/nutrition.png",
    imageAlt: "Nutrition dashboard showing macronutrient breakdown and calorie tracking",
  },
  {
    title: "Progress Analytics",
    description:
      "Visualise strength curves, volume trends, and body composition changes with data you can actually act on.",
    icon: BarChart3,
    image: "/features/analytics.png",
    imageAlt: "Analytics dashboard with performance charts and progress metrics",
  },
  {
    title: "Community",
    description:
      "Join challenges, share PRs, and train alongside a global network of athletes pushing their limits every day.",
    icon: Users,
    image: "/features/community.png",
    imageAlt: "Community interface showing group challenges and social leaderboard",
  },
] as const;

const HEADING_REVEAL = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function FeaturesGrid() {
  return (
    <section id="features" className="relative bg-background py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="mb-14 max-w-2xl sm:mb-16"
          variants={HEADING_REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-lime">
            Features
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-foreground">
            Everything you need to{" "}
            <span className="text-lime">train smarter</span>
          </h2>
          <p className="mt-4 max-w-lg text-base text-muted-foreground leading-relaxed sm:text-lg">
            Four pillars of a complete fitness platform — built for athletes
            who take their progress seriously.
          </p>
        </motion.div>

        {/* Card grid: 1 → 2 → 4 columns */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
