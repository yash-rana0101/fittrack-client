"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { apiClient } from "@/lib/api-client";
import Link from "next/link";

// ─── Validation Schema ───────────────────────────────────────

const step1Schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type Step1Values = z.infer<typeof step1Schema>;

// ─── Helper: Password Strength ───────────────────────────────

function calculateStrength(password: string): number {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score; // 0 to 4
}

// ─── Step 1 Component ────────────────────────────────────────

export function Step1Account() {
  const { nextStep, updateData, data } = useOnboardingStore();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    mode: "onChange",
    defaultValues: {
      name: data.name || "",
      email: data.email || "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");
  const strengthScore = calculateStrength(passwordValue);

  const onSubmit = async (formData: Step1Values) => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const response = await apiClient.post<{ data: { token: string } }>("/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      apiClient.setToken(response.data.token);
      updateData({ name: formData.name, email: formData.email });
      nextStep();
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <h2 className="font-display text-3xl text-foreground">Create Account</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Join FitTrack and start your fitness journey today.
        </p>

        {/* Social Auth */}
        <button
          type="button"
          className={cn(
            "mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-all",
            "hover:bg-muted hover:border-zinc-500 active:scale-[0.98]",
          )}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign up with Google
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        {/* Form */}
        <form id="step1-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                {...register("name")}
                type="text"
                placeholder="Full Name"
                className={cn(
                  "w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm text-foreground outline-none transition-all",
                  "focus:border-lime focus:ring-1 focus:ring-lime",
                  errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500",
                )}
              />
            </div>
            {errors.name && <p className="text-xs text-red-500 pl-1">{errors.name.message}</p>}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                {...register("email")}
                type="email"
                placeholder="Email Address"
                className={cn(
                  "w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm text-foreground outline-none transition-all",
                  "focus:border-lime focus:ring-1 focus:ring-lime",
                  errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500",
                )}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 pl-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={cn(
                  "w-full rounded-xl border border-border bg-card py-3 pl-10 pr-10 text-sm text-foreground outline-none transition-all",
                  "focus:border-lime focus:ring-1 focus:ring-lime",
                  errors.password && "border-red-500 focus:border-red-500 focus:ring-red-500",
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {passwordValue && (
              <div className="mt-2 flex gap-1 px-1">
                {[1, 2, 3, 4].map((level) => (
                  <motion.div
                    key={level}
                    className="h-1 flex-1 rounded-full bg-border"
                    animate={{
                      backgroundColor:
                        strengthScore >= level
                          ? strengthScore < 2
                            ? "#ef4444" // red
                            : strengthScore < 3
                            ? "#eab308" // yellow
                            : "#D1FF00" // lime
                          : "var(--border)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            )}
            {errors.password && <p className="text-xs text-red-500 pl-1">{errors.password.message}</p>}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                {...register("confirmPassword")}
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className={cn(
                  "w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm text-foreground outline-none transition-all",
                  "focus:border-lime focus:ring-1 focus:ring-lime",
                  errors.confirmPassword && "border-red-500 focus:border-red-500 focus:ring-red-500",
                )}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 pl-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {errorMsg && (
            <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
              {errorMsg}
            </div>
          )}
        </form>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <button
          form="step1-form"
          type="submit"
          disabled={!isValid || isSubmitting}
          className={cn(
            "w-full rounded-xl bg-lime py-4 text-sm font-semibold text-black transition-all",
            "hover:brightness-110 active:scale-[0.98]",
            "disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:active:scale-100 flex justify-center items-center gap-2",
          )}
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
              Creating...
            </>
          ) : (
            "Continue"
          )}
        </button>
        
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-foreground hover:text-lime transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
