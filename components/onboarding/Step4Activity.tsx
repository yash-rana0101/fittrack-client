"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sofa, Footprints, Activity, Flame, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { apiClient } from "@/lib/api-client";

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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = async (id: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const activityMap: Record<string, string> = {
        sedentary: "SEDENTARY",
        light: "LIGHTLY_ACTIVE",
        moderate: "MODERATELY_ACTIVE",
        very_active: "VERY_ACTIVE",
        athlete: "EXTRA_ACTIVE",
      };
      
      await apiClient.patch("/users/onboarding", {
        step: 4,
        activityLevel: activityMap[id] || "SEDENTARY",
      });

      updateData({ activityLevel: id });
      nextStep();
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to save activity level");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      await apiClient.patch("/users/onboarding", {
        step: 4,
        skip: true,
      });

      updateData({ activityLevel: undefined });
      nextStep();
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to skip");
    } finally {
      setIsSubmitting(false);
    }
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
          {errorMsg && (
            <div className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
              {errorMsg}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={prevStep}
          disabled={isSubmitting}
          className="rounded-xl border border-border bg-card px-8 py-4 text-sm font-semibold text-foreground transition-all hover:bg-muted active:scale-[0.98] disabled:opacity-50"
        >
          Back
        </button>
        <div className="flex items-center gap-4">
          {isSubmitting && (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
          )}
          <button
            type="button"
            onClick={handleSkip}
            disabled={isSubmitting}
            className="px-4 py-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
