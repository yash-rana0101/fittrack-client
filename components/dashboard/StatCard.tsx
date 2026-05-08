"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  index: number;
}

export function StatCard({ title, value, change, trend, icon: Icon, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime/10 text-lime">
          <Icon size={16} strokeWidth={2.5} />
        </div>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <h3 className="font-display text-3xl font-bold text-foreground">{value}</h3>
        <span
          className={cn(
            "text-xs font-medium",
            trend === "up" && "text-lime",
            trend === "down" && "text-red-400",
            trend === "neutral" && "text-muted-foreground",
          )}
        >
          {change}
        </span>
      </div>
    </motion.div>
  );
}
