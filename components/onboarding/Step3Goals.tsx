"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { apiClient } from "@/lib/api-client";

// ─── Goal Data ───────────────────────────────────────────────

const GOALS = [
  { id: "lose_weight", label: "Lose Weight", emoji: "🔥" },
  { id: "build_muscle", label: "Build Muscle", emoji: "💪" },
  { id: "stay_active", label: "Stay Active", emoji: "🏃" },
  { id: "improve_flexibility", label: "Improve Flexibility", emoji: "🧘" },
  { id: "eat_healthier", label: "Eat Healthier", emoji: "🥗" },
  { id: "reduce_stress", label: "Reduce Stress", emoji: "🧠" },
];

// ─── Component ───────────────────────────────────────────────

export function Step3Goals() {
  const { nextStep, prevStep, updateData, data } = useOnboardingStore();
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    Array.isArray(data.goals) ? data.goals : [],
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) => {
      // If already selected, remove it
      if (prev.includes(id)) {
        return prev.filter((g) => g !== id);
      }
      // If adding a new one, max 3 allowed
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const isValid = selectedGoals.length > 0 && selectedGoals.length <= 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const goalMap: Record<string, string> = {
        lose_weight: "LOSE_WEIGHT",
        build_muscle: "BUILD_MUSCLE",
        stay_active: "STAY_ACTIVE",
        improve_flexibility: "INCREASE_FLEXIBILITY",
        eat_healthier: "EAT_HEALTHIER",
        reduce_stress: "REDUCE_STRESS",
      };

      const mappedGoals = selectedGoals.map((id) => goalMap[id]).filter(Boolean);

      await apiClient.patch("/users/onboarding", {
        step: 3,
        goals: mappedGoals,
      });

      updateData({ goals: selectedGoals });
      nextStep();
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to save goals. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <h2 className="font-display text-3xl text-foreground">Fitness Goals</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          What are you trying to achieve? (Select 1-3)
        </p>

        <form id="step3-form" onSubmit={handleSubmit} className="mt-8">
          <div className="grid grid-cols-2 gap-4">
            {GOALS.map((goal) => {
              const isSelected = selectedGoals.includes(goal.id);
              const isDisabled = !isSelected && selectedGoals.length >= 3;

              return (
                <motion.button
                  key={goal.id}
                  type="button"
                  onClick={() => toggleGoal(goal.id)}
                  disabled={isDisabled}
                  whileTap={!isDisabled ? { scale: 0.95 } : undefined}
                  className={cn(
                    "relative flex aspect-square flex-col items-center justify-center gap-3 rounded-3xl border-2 p-4 text-center transition-all duration-200",
                    isSelected
                      ? "border-lime bg-lime/10"
                      : "border-border bg-card hover:border-zinc-500",
                    isDisabled && "cursor-not-allowed opacity-50 hover:border-border",
                  )}
                >
                  <span className="text-4xl">{goal.emoji}</span>
                  <span className="text-sm font-medium text-foreground">{goal.label}</span>

                  {/* Checkmark indicator for selected state */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-lime text-black shadow-sm"
                    >
                      <Check size={14} strokeWidth={3} />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {errorMsg && (
            <div className="mt-6 rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
              {errorMsg}
            </div>
          )}
        </form>
      </div>

      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={prevStep}
          className="flex-1 rounded-xl border border-border bg-card py-4 text-sm font-semibold text-foreground transition-all hover:bg-muted active:scale-[0.98]"
        >
          Back
        </button>
        <button
          form="step3-form"
          type="submit"
          disabled={!isValid || isSubmitting}
          className={cn(
            "flex-[2] rounded-xl bg-lime py-4 text-sm font-semibold text-black transition-all",
            "hover:brightness-110 active:scale-[0.98]",
            "disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:active:scale-100 flex justify-center items-center gap-2",
          )}
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
              Saving...
            </>
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </div>
  );
}
