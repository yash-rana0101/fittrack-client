"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  /** Delay multiplier for staggered scroll reveal (0-based index) */
  index?: number;
}

const REVEAL = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function FeatureCard({
  title,
  description,
  icon: Icon,
  image,
  imageAlt,
  index = 0,
}: FeatureCardProps) {
  return (
    <motion.article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl",
        "border border-border bg-card",
        "transition-shadow duration-300",
        "hover:shadow-[0_0_60px_rgba(209,255,0,0.12)]",
      )}
      variants={REVEAL}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={index}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Image area with masked corners */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Bottom gradient so card text area blends into the image edge */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-5 pt-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
              "bg-lime/10 text-lime transition-colors duration-200",
              "group-hover:bg-lime group-hover:text-black",
            )}
          >
            <Icon size={18} strokeWidth={2.25} />
          </div>
          <h3 className="font-display text-lg text-foreground">{title}</h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Accent border that reveals on hover — sits on top of the card's
          natural border so it appears to "light up" */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-3xl",
          "border-2 border-lime/0 transition-all duration-300",
          "group-hover:border-lime/30",
        )}
        aria-hidden
      />
    </motion.article>
  );
}
