"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera, User, Bell } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { apiClient } from "@/lib/api-client";

// ─── Validation Schema ───────────────────────────────────────

const step5Schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Max 20 characters"),
  bio: z.string().max(160, "Bio must be under 160 characters").optional(),
  notificationsEnabled: z.boolean(),
});

type Step5Values = z.infer<typeof step5Schema>;

// ─── Component ───────────────────────────────────────────────

export function Step5Profile() {
  const { nextStep, prevStep, updateData, data } = useOnboardingStore();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(data.avatarUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<Step5Values>({
    resolver: zodResolver(step5Schema),
    mode: "onChange",
    defaultValues: {
      username: data.username || "",
      bio: data.bio || "",
      notificationsEnabled: true, // Default to true
    },
  });

  const notificationsEnabled = watch("notificationsEnabled");

  // Handle local image preview without hitting server
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const onSubmit = async (formData: Step5Values) => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      await apiClient.patch("/users/onboarding", {
        step: 5,
        username: formData.username,
        bio: formData.bio || undefined,
        avatarUrl: avatarPreview || undefined,
      });

      updateData({
        username: formData.username,
        bio: formData.bio,
        avatarUrl: avatarPreview || "",
      });
      nextStep();
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to complete setup.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <div>
        <h2 className="font-display text-3xl text-foreground">Profile Setup</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Make it yours. This is how you'll appear to the community.
        </p>

        <form id="step5-form" onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="group relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border bg-card transition-colors hover:border-lime"
            >
              {avatarPreview ? (
                <Image src={avatarPreview} alt="Avatar preview" fill className="object-cover" />
              ) : (
                <Camera className="text-muted-foreground group-hover:text-lime" size={32} strokeWidth={1.5} />
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-xs font-medium text-white">Upload</span>
              </div>
            </button>
            <span className="text-xs text-muted-foreground">JPG, PNG or GIF (Max 2MB)</span>
          </div>

          {/* Username */}
          <div className="space-y-1">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                {...register("username")}
                type="text"
                placeholder="Username"
                className={cn(
                  "w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm text-foreground outline-none transition-all",
                  "focus:border-lime focus:ring-1 focus:ring-lime",
                  errors.username && "border-red-500 focus:border-red-500 focus:ring-red-500",
                )}
              />
            </div>
            {errors.username && <p className="text-xs text-red-500 pl-1">{errors.username.message}</p>}
          </div>

          {/* Bio */}
          <div className="space-y-1">
            <textarea
              {...register("bio")}
              placeholder="Short bio (optional)"
              rows={3}
              className={cn(
                "w-full resize-none rounded-xl border border-border bg-card p-4 text-sm text-foreground outline-none transition-all",
                "focus:border-lime focus:ring-1 focus:ring-lime",
                errors.bio && "border-red-500 focus:border-red-500 focus:ring-red-500",
              )}
            />
            {errors.bio && <p className="text-xs text-red-500 pl-1">{errors.bio.message}</p>}
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime/10 text-lime">
                <Bell size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">Push Notifications</span>
                <span className="text-xs text-muted-foreground">Get reminders and cheers.</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setValue("notificationsEnabled", !notificationsEnabled, { shouldValidate: true })}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                notificationsEnabled ? "bg-lime" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  notificationsEnabled ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
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
          form="step5-form"
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
              Completing...
            </>
          ) : (
            "Complete Setup"
          )}
        </button>
      </div>
    </div>
  );
}
