import { Hero } from "@/components/landing/Hero";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TestimonialCarousel } from "@/components/landing/TestimonialCarousel";
import { Pricing } from "@/components/landing/Pricing";
import { CTASection } from "@/components/landing/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      <TestimonialCarousel />
      <Pricing />
      <CTASection />
    </>
  );
}
