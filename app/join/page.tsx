import { OnboardingContainer } from "@/components/onboarding/OnboardingContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join FitTrack — Create Your Account",
  description: "Start your fitness journey with FitTrack today.",
};

export default function JoinPage() {
  return <OnboardingContainer />;
}
