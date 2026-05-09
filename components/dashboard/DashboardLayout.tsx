"use client";

import { useState,useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, Dumbbell, Apple, LineChart, Settings, Menu, X, Bell, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Workouts", href: "/dashboard/workouts", icon: Dumbbell },
  { name: "Nutrition", href: "/dashboard/nutrition", icon: Apple },
  { name: "Progress", href: "/dashboard/progress", icon: LineChart },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState<string>("Athlete");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get<{ data: { user: { name: string } } }>("/users/me");
        if (response.data?.user?.name) {
          setUserName(response.data.user.name);
        }
      } catch (err) {
        // Redirect to login if unauthorized
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = () => {
    apiClient.clearToken();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* ─── DESKTOP SIDEBAR ───────────────────────────────────── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-border bg-background transition-transform lg:flex",
        )}
      >
        <div className="flex h-16 shrink-0 items-center px-6">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime transition-transform group-hover:scale-105">
              <span className="font-display text-sm text-black leading-none">F</span>
            </div>
            <span className="font-display text-xl text-foreground">FitTrack</span>
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-lime/10 text-lime"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Snippet at bottom of sidebar */}
        <div className="border-t border-border p-4">
          <div className="flex items-center justify-between rounded-xl p-2 hover:bg-muted transition-colors">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-lime/20 flex items-center justify-center text-lime font-bold">
                {isLoading ? "" : userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {isLoading ? "Loading..." : userName}
                </span>
                <span className="text-xs text-muted-foreground">Free Plan</span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* ─── MOBILE HEADER & TAB BAR ───────────────────────────── */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Mobile Top Header */}
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-4 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime">
              <span className="font-display text-sm text-black leading-none">F</span>
            </div>
            <h1 className="font-display text-lg">Dashboard</h1>
          </div>
          
          <div className="hidden lg:flex items-center gap-2">
            <h1 className="font-display text-xl text-foreground">
              Welcome back{isLoading ? "" : `, ${userName.split(" ")[0]}!`}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-lime" />
            </button>
            <div className="lg:hidden flex items-center gap-2">
              <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-lime/20 flex items-center justify-center text-lime font-bold">
                {isLoading ? "" : userName.charAt(0).toUpperCase()}
              </div>
              <button 
                onClick={handleLogout}
                className="p-1 text-muted-foreground hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-8">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Tab Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-background/90 px-4 backdrop-blur-lg lg:hidden pb-safe">
          {NAV_ITEMS.slice(0, 4).map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 p-2 transition-colors",
                  isActive ? "text-lime" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon size={20} />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
