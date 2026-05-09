"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { apiClient } from "@/lib/api-client";

// ─── Validation Schema ───────────────────────────────────────

const step2Schema = z.object({
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "non-binary", "prefer-not-to-say"]),
  height: z.number().min(50).max(300), // stored in cm
  weight: z.number().min(20).max(300), // stored in kg
  unitSystem: z.enum(["metric", "imperial"]),
});

type Step2Values = z.infer<typeof step2Schema>;

// ─── Helper: Unit Conversions ────────────────────────────────

const kgToLbs = (kg: number) => Math.round(kg * 2.20462);
const lbsToKg = (lbs: number) => Math.round(lbs / 2.20462);
const cmToIn = (cm: number) => Math.round(cm * 0.393701);
const inToCm = (inches: number) => Math.round(inches / 0.393701);

// ─── Component ───────────────────────────────────────────────

export function Step2Details() {
  const { nextStep, prevStep, updateData, data } = useOnboardingStore();
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    mode: "onChange",
    defaultValues: {
      dob: data.dob || "",
      gender: (data.gender as any) || undefined,
      height: data.height || 170,
      weight: data.weight || 70,
      unitSystem: "metric",
    },
  });

  const gender = watch("gender");
  const heightCm = watch("height");
  const weightKg = watch("weight");

  // Display values based on current unit system
  const displayHeight = unitSystem === "metric" ? heightCm : cmToIn(heightCm);
  const displayWeight = unitSystem === "metric" ? weightKg : kgToLbs(weightKg);

  // Sync manual input to internal metric state
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) return;
    setValue("height", unitSystem === "metric" ? val : inToCm(val), {
      shouldValidate: true,
    });
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) return;
    setValue("weight", unitSystem === "metric" ? val : lbsToKg(val), {
      shouldValidate: true,
    });
  };

  const onSubmit = async (formData: Step2Values) => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const genderMap: Record<string, string> = {
        male: "MALE",
        female: "FEMALE",
        "non-binary": "OTHER",
        "prefer-not-to-say": "PREFER_NOT_TO_SAY"
      };

      await apiClient.patch("/users/onboarding", {
        step: 2,
        dateOfBirth: new Date(formData.dob).toISOString(),
        gender: genderMap[formData.gender] || "PREFER_NOT_TO_SAY",
        height: formData.height,
        weight: formData.weight,
      });

      updateData({
        dob: formData.dob,
        gender: formData.gender,
        height: formData.height,
        weight: formData.weight,
      });
      nextStep();
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to save details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <h2 className="font-display text-3xl text-foreground">Personal Details</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This helps us calculate your macros and tailor your programme.
        </p>

        <form id="step2-form" onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {/* Date of Birth */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Date of Birth</label>
            <input
              {...register("dob")}
              type="date"
              className={cn(
                "block w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-all",
                "focus:border-lime focus:ring-1 focus:ring-lime",
                "cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 dark:[&::-webkit-calendar-picker-indicator]:invert",
              )}
            />
          </div>

          {/* Gender Pills */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Gender</label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "male", label: "Male" },
                { id: "female", label: "Female" },
                { id: "non-binary", label: "Non-Binary" },
                { id: "prefer-not-to-say", label: "Prefer not to say" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setValue("gender", opt.id as any, { shouldValidate: true })}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                    gender === opt.id
                      ? "border-lime bg-lime/10 text-lime"
                      : "border-border bg-card text-muted-foreground hover:bg-muted",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Unit System Toggle */}
          <div className="flex items-center justify-between border-t border-border pt-6">
            <label className="text-sm font-medium text-foreground">Metrics</label>
            <div className="flex rounded-lg border border-border bg-card p-1">
              <button
                type="button"
                onClick={() => setUnitSystem("metric")}
                className={cn(
                  "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                  unitSystem === "metric" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                Metric (kg/cm)
              </button>
              <button
                type="button"
                onClick={() => setUnitSystem("imperial")}
                className={cn(
                  "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                  unitSystem === "imperial" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                Imperial (lbs/in)
              </button>
            </div>
          </div>

          {/* Height Slider & Input */}
          <div className="space-y-4 rounded-2xl border border-border bg-card/50 p-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-muted-foreground">Height</label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={displayHeight}
                  onChange={handleHeightChange}
                  className="w-16 rounded-md border border-border bg-background px-2 py-1 text-right text-sm font-semibold text-foreground outline-none focus:border-lime focus:ring-1 focus:ring-lime"
                />
                <span className="text-sm font-medium text-muted-foreground">
                  {unitSystem === "metric" ? "cm" : "in"}
                </span>
              </div>
            </div>
            <input
              type="range"
              min={unitSystem === "metric" ? 100 : 40}
              max={unitSystem === "metric" ? 250 : 100}
              value={displayHeight}
              onChange={handleHeightChange}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-border accent-lime"
            />
          </div>

          {/* Weight Slider & Input */}
          <div className="space-y-4 rounded-2xl border border-border bg-card/50 p-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-muted-foreground">Weight</label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={displayWeight}
                  onChange={handleWeightChange}
                  className="w-16 rounded-md border border-border bg-background px-2 py-1 text-right text-sm font-semibold text-foreground outline-none focus:border-lime focus:ring-1 focus:ring-lime"
                />
                <span className="text-sm font-medium text-muted-foreground">
                  {unitSystem === "metric" ? "kg" : "lbs"}
                </span>
              </div>
            </div>
            <input
              type="range"
              min={unitSystem === "metric" ? 40 : 90}
              max={unitSystem === "metric" ? 150 : 330}
              value={displayWeight}
              onChange={handleWeightChange}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-border accent-lime"
            />
          </div>

          {errorMsg && (
            <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
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
          form="step2-form"
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
