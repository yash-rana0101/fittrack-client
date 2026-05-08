"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TESTIMONIALS } from "@/lib/constants/testimonials";
import { TestimonialCard } from "./TestimonialCard";

const EASE = [0.22, 1, 0.36, 1] as const;

const HEADING_REVEAL = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

// ─── Navigation Button ───────────────────────────────────────

function NavButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous testimonials" : "Next testimonials"}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full",
        "border border-border bg-card text-foreground",
        "transition-all duration-200",
        "hover:bg-lime hover:text-black hover:border-lime",
        "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-card disabled:hover:text-foreground disabled:hover:border-border",
      )}
    >
      <Icon size={18} />
    </button>
  );
}

// ─── Main Carousel ───────────────────────────────────────────

export function TestimonialCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    // Scroll by roughly one card width + gap
    const amount = 380;
    el.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="testimonials" className="relative bg-background py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header + nav buttons */}
        <motion.div
          className="mb-12 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between"
          variants={HEADING_REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <div>
            <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-lime">
              Testimonials
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground">
              Loved by <span className="text-lime">athletes</span>
            </h2>
            <p className="mt-4 max-w-lg text-base text-muted-foreground leading-relaxed sm:text-lg">
              Real results from real people — no fluff, no paid endorsements.
            </p>
          </div>

          <div className="flex gap-2" aria-label="Carousel navigation">
            <NavButton direction="prev" onClick={() => scroll("prev")} disabled={!canScrollLeft} />
            <NavButton direction="next" onClick={() => scroll("next")} disabled={!canScrollRight} />
          </div>
        </motion.div>
      </div>

      {/* Carousel track — full-bleed so cards can overflow the max-w container */}
      <div className="relative">
        {/* Left gradient fade */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-16 bg-gradient-to-r from-background to-transparent"
          aria-hidden
        />
        {/* Right gradient fade */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-16 bg-gradient-to-l from-background to-transparent"
          aria-hidden
        />

        <motion.div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto px-4 pb-4 sm:gap-6 sm:px-6 lg:px-8 scrollbar-none"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
          drag="x"
          dragConstraints={scrollRef}
          dragElastic={0.1}
          dragMomentum
          whileTap={{ cursor: "grabbing" }}
        >
          {/* Leading spacer — aligns first card with the max-w-7xl container */}
          <div className="w-0 shrink-0 lg:w-[calc((100vw-80rem)/2)]" aria-hidden />

          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}

          {/* Trailing spacer */}
          <div className="w-0 shrink-0 lg:w-[calc((100vw-80rem)/2)]" aria-hidden />
        </motion.div>
      </div>
    </section>
  );
}
