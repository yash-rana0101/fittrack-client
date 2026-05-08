import { Hero } from "@/components/landing/Hero";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TestimonialCarousel } from "@/components/landing/TestimonialCarousel";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      <TestimonialCarousel />
    </>
  );
}
