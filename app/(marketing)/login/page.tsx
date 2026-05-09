"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: LoginValues) => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const response = await apiClient.post<{ data: { token: string } }>("/auth/login", formData);
      apiClient.setToken(response.data.token);
      router.push("/dashboard");
    } catch (error: any) {
      setErrorMsg(error.message || "Invalid email or password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-muted/30 p-4 sm:p-8">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-background shadow-2xl">
        <div className="px-6 py-8">
          <h2 className="font-display text-3xl text-foreground">Welcome Back</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Log in to FitTrack to continue your fitness journey.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
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
              {errors.password && <p className="text-xs text-red-500 pl-1">{errors.password.message}</p>}
            </div>

            {errorMsg && (
              <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
                {errorMsg}
              </div>
            )}

            <div className="mt-8 flex flex-col items-center gap-4 pt-4">
              <button
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
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
              
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/join" className="font-semibold text-foreground hover:text-lime transition-colors">
                  Join now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
