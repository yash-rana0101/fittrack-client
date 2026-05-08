import { Hero } from "@/components/landing/Hero";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TestimonialCarousel } from "@/components/landing/TestimonialCarousel";
import { Pricing } from "@/components/landing/Pricing";
import { CTASection } from "@/components/landing/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialCarousel />
      <Pricing />
      <CTASection />
    </>
  );
}
