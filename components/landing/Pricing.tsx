"use client";

import { motion } from "framer-motion";
import { PricingCard, type PricingTier } from "./PricingCard";

const TIERS: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    description: "Everything you need to start tracking your progress.",
    features: [
      "Basic workout logging",
      "Up to 3 custom routines",
      "Standard analytics dashboard",
      "Community forum access",
    ],
    ctaText: "Get Started Free",
    ctaHref: "/signup?tier=free",
  },
  {
    name: "Pro",
    price: "$12",
    description: "Advanced tools for athletes who want to train smarter.",
    features: [
      "Unlimited custom routines",
      "Advanced progress analytics",
      "Personalised nutrition plans",
      "Progressive overload suggestions",
      "Priority customer support",
    ],
    isPopular: true,
    ctaText: "Start 14-Day Trial",
    ctaHref: "/signup?tier=pro",
  },
  {
    name: "Elite",
    price: "$39",
    description: "Maximum performance with 1-on-1 expert guidance.",
    features: [
      "Everything in Pro",
      "Monthly 1-on-1 coaching call",
      "Custom weekly macro adjustments",
      "Form review via video submission",
      "Exclusive Elite community group",
    ],
    ctaText: "Join Elite",
    ctaHref: "/signup?tier=elite",
  },
];

const HEADING_REVEAL = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Pricing() {
  return (
    <section id="pricing" className="relative bg-muted/10 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center sm:mb-20"
          variants={HEADING_REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-lime">
            Pricing
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-foreground">
            Simple, transparent <span className="text-lime">pricing</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground leading-relaxed sm:text-lg">
            Whether you're just starting out or preparing for your next competition,
            we have a plan that fits your goals.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {TIERS.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
