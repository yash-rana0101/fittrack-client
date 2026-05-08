"use client";

import { useState, useEffect } from "react";
import { Play, Utensils, LineChart as ChartIcon } from "lucide-react";
import { motion } from "framer-motion";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { WorkoutList } from "@/components/dashboard/WorkoutList";
import { cn } from "@/lib/utils";

// ─── Skeletons ───────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-2xl bg-muted/50", className)} />
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      {/* Quick Actions Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
      </div>
      
      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>

      {/* Chart & Workout Skeleton */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Skeleton className="h-[350px]" />
        </div>
        <div>
          <Skeleton className="h-[350px]" />
        </div>
      </div>
    </div>
  );
}

// ─── Quick Actions ───────────────────────────────────────────

const ACTIONS = [
  { name: "Start Workout", icon: Play, color: "bg-lime text-black border-transparent", hover: "hover:brightness-110" },
  { name: "Log Meal", icon: Utensils, color: "bg-card text-foreground border-border", hover: "hover:bg-muted" },
  { name: "View Progress", icon: ChartIcon, color: "bg-card text-foreground border-border", hover: "hover:bg-muted" },
];

function QuickActions() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {ACTIONS.map((action, i) => {
        const Icon = action.icon;
        return (
          <motion.button
            key={action.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex items-center justify-center gap-3 rounded-2xl border p-4 font-semibold transition-all shadow-sm",
              action.color,
              action.hover
            )}
          >
            <Icon size={18} />
            {action.name}
          </motion.button>
        );
      })}
    </div>
  );
}

// ─── Dashboard Page ──────────────────────────────────────────

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  // Simulate network request to show skeleton loaders
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex flex-col gap-8">
      <QuickActions />
      <StatsGrid />
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <div className="h-[400px] lg:h-auto">
          <WorkoutList />
        </div>
      </div>
    </div>
  );
}
