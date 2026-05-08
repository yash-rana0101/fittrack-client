"use client";

import { Flame, Activity, CalendarDays, Target } from "lucide-react";
import { StatCard } from "./StatCard";

const STATS_DATA = [
  {
    title: "Calories Burned",
    value: "2,450",
    change: "+12% vs last week",
    trend: "up" as const,
    icon: Flame,
  },
  {
    title: "Workouts This Week",
    value: "4 / 5",
    change: "On track",
    trend: "neutral" as const,
    icon: Activity,
  },
  {
    title: "Streak Days",
    value: "12",
    change: "Personal Best: 14",
    trend: "neutral" as const,
    icon: CalendarDays,
  },
  {
    title: "Goal Progress",
    value: "68%",
    change: "Build Muscle",
    trend: "up" as const,
    icon: Target,
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS_DATA.map((stat, i) => (
        <StatCard key={stat.title} {...stat} index={i} />
      ))}
    </div>
  );
}
