"use client";

import { motion } from "framer-motion";
import { Sofa, Footprints, Activity, Flame, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnboardingStore } from "@/store/useOnboardingStore";

const LEVELS = [
  {
    id: "sedentary",
    title: "Sedentary",
    description: "Little to no exercise, desk job.",
    icon: Sofa,
  },
  {
    id: "light",
    title: "Lightly Active",
    description: "Light exercise 1-3 days a week.",
    icon: Footprints,
  },
  {
    id: "moderate",
    title: "Moderately Active",
    description: "Moderate exercise 3-5 days a week.",
    icon: Activity,
  },
  {
    id: "very_active",
    title: "Very Active",
    description: "Hard exercise 6-7 days a week.",
    icon: Flame,
  },
  {
    id: "athlete",
    title: "Athlete",
    description: "Physical job or training twice a day.",
    icon: Trophy,
  },
];

export function Step4Activity() {
  const { nextStep, prevStep, updateData, data } = useOnboardingStore();
  const selectedLevel = data.activityLevel;

  const handleSelect = (id: string) => {
    updateData({ activityLevel: id });
    nextStep(); // Auto-advance for single-select quick flows
  };

  const handleSkip = () => {
    updateData({ activityLevel: undefined });
    nextStep();
  };

  return (
    <div className="flex flex-col justify-between">
      <div>
        <h2 className="font-display text-3xl text-foreground">Activity Level</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          How active are you in your day-to-day life?
        </p>

        <div className="mt-8 flex flex-col gap-3">
          {LEVELS.map((level) => {
            const Icon = level.icon;
            const isSelected = selectedLevel === level.id;

            return (
              <motion.button
                key={level.id}
                onClick={() => handleSelect(level.id)}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200",
                  isSelected
                    ? "border-lime bg-lime/10"
                    : "border-border bg-card hover:bg-lime/5 hover:border-lime/50",
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
                    isSelected ? "bg-lime text-black" : "bg-muted text-muted-foreground",
                  )}
                >
                  <Icon size={24} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">{level.title}</span>
                  <span className="text-sm text-muted-foreground">{level.description}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={prevStep}
          className="rounded-xl border border-border bg-card px-8 py-4 text-sm font-semibold text-foreground transition-all hover:bg-muted active:scale-[0.98]"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSkip}
          className="px-4 py-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
