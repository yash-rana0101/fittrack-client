import { create } from "zustand";

interface OnboardingData {
  name: string;
  email: string;
  dob: string;
  gender: string;
  height: number;
  weight: number;
  goals: string[];
  activityLevel: string;
  username: string;
  bio: string;
  avatarUrl: string;
}

interface OnboardingState {
  activeStep: number;
  totalSteps: number;
  data: Partial<OnboardingData>;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (newData: Partial<OnboardingData>) => void;
  setStep: (step: number) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  activeStep: 1,
  totalSteps: 5,
  data: {},
  nextStep: () =>
    set((state) => ({
      activeStep: Math.min(state.activeStep + 1, state.totalSteps + 1),
    })),
  prevStep: () =>
    set((state) => ({
      activeStep: Math.max(state.activeStep - 1, 1),
    })),
  updateData: (newData) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),
  setStep: (step) =>
    set((state) => ({
      activeStep: Math.max(1, Math.min(step, state.totalSteps)),
    })),
}));
