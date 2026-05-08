"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { Step1Account } from "./Step1Account";
import { Step2Details } from "./Step2Details";
import { Step3Goals } from "./Step3Goals";
import { Step4Activity } from "./Step4Activity";
import { Step5Profile } from "./Step5Profile";
import { WelcomeSuccess } from "./WelcomeSuccess";

const SLIDE_VARIANTS = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
};

export function OnboardingContainer() {
  const { activeStep, totalSteps, prevStep } = useOnboardingStore();

  const direction = 1;

  // Render the current step
  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return <Step1Account />;
      case 2:
        return <Step2Details />;
      case 3:
        return <Step3Goals />;
      case 4:
        return <Step4Activity />;
      case 5:
        return <Step5Profile />;
      case 6:
        return <WelcomeSuccess />;
      default:
        return (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h2 className="font-display text-3xl text-foreground">Step {activeStep}</h2>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4 sm:p-8">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-background shadow-2xl">
        {/* Header & Progress Bar */}
        {activeStep <= totalSteps && (
          <header className="relative z-10 px-6 pt-6 pb-2">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={activeStep === 1}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-border disabled:opacity-0"
                aria-label="Go back"
              >
                <ArrowLeft size={16} />
              </button>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Step {activeStep} of {totalSteps}
              </span>
              <div className="h-8 w-8" aria-hidden="true" /> {/* Spacer for centering */}
            </div>

            {/* Animated Progress Bar */}
            <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full bg-lime"
                initial={{ width: 0 }}
                animate={{ width: `${(activeStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </div>
          </header>
        )}

        {/* Step Content Area */}
        <div className="relative px-6 pb-8 pt-4">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeStep}
              custom={direction}
              variants={SLIDE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col min-h-[400px]"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
