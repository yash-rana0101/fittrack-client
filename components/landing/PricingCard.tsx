"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  ctaHref: string;
}

export function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  const isPopular = tier.isPopular;

  return (
    <motion.div
      className={cn(
        "relative flex flex-col rounded-3xl border bg-card p-8",
        isPopular ? "border-lime shadow-[0_0_40px_rgba(209,255,0,0.15)]" : "border-border",
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-0 right-0 mx-auto flex w-max items-center justify-center overflow-hidden rounded-full bg-lime px-4 py-1">
          <span className="relative z-10 text-xs font-bold uppercase tracking-wider text-black">
            Most Popular
          </span>
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
              repeatDelay: 3,
            }}
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="font-display text-2xl text-foreground">{tier.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
      </div>

      {/* Price */}
      <div className="mb-8 flex items-baseline text-foreground">
        <span className="font-display text-5xl">{tier.price}</span>
        {tier.price !== "Free" && <span className="ml-2 text-muted-foreground">/mo</span>}
      </div>

      {/* Feature List */}
      <ul className="mb-8 flex flex-1 flex-col gap-4">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="mt-0.5 flex shrink-0 items-center justify-center rounded-full bg-lime/10 p-1 text-lime">
              <Check size={14} strokeWidth={3} />
            </div>
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Link
        href={tier.ctaHref}
        className={cn(
          "mt-auto inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-200",
          isPopular
            ? "bg-lime text-black hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
            : "bg-foreground text-background hover:bg-foreground/90 hover:scale-[1.02] active:scale-[0.98]",
        )}
      >
        {tier.ctaText}
      </Link>
    </motion.div>
  );
}
