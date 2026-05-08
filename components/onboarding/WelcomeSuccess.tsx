"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { PartyPopper } from "lucide-react";
import { useOnboardingStore } from "@/store/useOnboardingStore";

export function WelcomeSuccess() {
  const router = useRouter();
  const { data } = useOnboardingStore();
  const firstName = data.name ? data.name.split(" ")[0] : "Athlete";

  useEffect(() => {
    // Fire confetti on mount
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#D1FF00", "#FFFFFF", "#333333"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#D1FF00", "#FFFFFF", "#333333"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-lime/20 text-lime"
      >
        <PartyPopper size={48} />
      </motion.div>

      <h2 className="font-display text-4xl text-foreground">
        Welcome to FitTrack, <br />
        <span className="text-lime">{firstName}</span>!
      </h2>
      
      <p className="mt-4 max-w-sm text-sm text-muted-foreground">
        Your personalized dashboard is ready. Let's start crushing those goals.
      </p>

      <div className="mt-12 w-full">
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full rounded-xl bg-lime py-4 text-sm font-bold text-black transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
