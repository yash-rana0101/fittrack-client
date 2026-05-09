"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const CLASSES_DATA = [
  {
    id: "digital",
    title: "Digital Coaching",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
    aspectRatio: "aspect-[4/5]",
    parallaxSpeed: -50,
    marginTop: "mt-0 lg:mt-32",
  },
  {
    id: "group",
    title: "Group Training",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop",
    aspectRatio: "aspect-[3/4]",
    parallaxSpeed: -120,
    marginTop: "mt-0 lg:mt-64",
  },
  {
    id: "outdoor",
    title: "Outdoor Classes",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop",
    aspectRatio: "aspect-[4/5]",
    parallaxSpeed: -80,
    marginTop: "mt-0 lg:mt-48",
  },
  {
    id: "personal",
    title: "Personal Training",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1469&auto=format&fit=crop",
    aspectRatio: "aspect-[1/2]",
    parallaxSpeed: -200,
    marginTop: "mt-0",
  },
];

export function FeaturesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="classes" ref={containerRef} className="relative w-full overflow-hidden bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ─── Typography Header ─── */}
        <div className="relative mb-20 flex flex-col gap-8 lg:mb-0">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-display text-7xl tracking-tighter text-foreground sm:text-8xl lg:text-[9rem]">
              Classes
            </h2>
            <p className="max-w-sm text-sm font-medium text-muted-foreground lg:mb-4 lg:text-right">
              Welcome to the dynamic and energizing world of fitness classes at FitTrack. Explore our offerings and find the class that suits your goals and lifestyle.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-0">
            <p className="max-w-sm text-sm font-medium text-muted-foreground lg:mt-4">
              Whether you're looking to burn calories, build strength, increase flexibility, or find a moment of calm, we have the perfect class for you.
            </p>
            <h2 className="font-display text-7xl tracking-tighter text-foreground sm:text-8xl lg:text-[9rem] lg:-ml-32">
              For You
            </h2>
          </div>

          {/* Centered Pill CTA */}
          <div className="mt-12 flex justify-start lg:absolute lg:left-1/2 lg:top-1/2 lg:mt-0 lg:-translate-x-1/2 lg:translate-y-full">
            <button className="group flex h-14 items-center overflow-hidden rounded-full bg-foreground pl-8 pr-1.5 shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <span className="mr-6 text-sm font-semibold text-background">See All</span>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-border text-foreground transition-all group-hover:bg-lime group-hover:text-black">
                <ArrowRight size={20} strokeWidth={2.5} className="transition-transform group-hover:-rotate-45" />
              </div>
            </button>
          </div>
        </div>

        {/* ─── Asymmetrical Grid ─── */}
        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {CLASSES_DATA.map((card, index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(scrollYProgress, [0, 1], [0, card.parallaxSpeed]);

            return (
              <motion.div
                key={card.id}
                style={{ y }}
                className={cn("flex flex-col group", card.marginTop)}
              >
                {/* Custom Masked Image */}
                <div
                  className={cn(
                    "relative w-full overflow-hidden rounded-[48px] bg-muted shadow-lg",
                    card.aspectRatio
                  )}
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                </div>

                {/* Floating Action / Label */}
                <div className="mt-6 flex items-center justify-between px-2">
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {card.title}
                  </h3>
                  <button className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background transition-all hover:scale-110 hover:bg-lime hover:text-black">
                    <ArrowUpRight size={20} strokeWidth={2.5} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
