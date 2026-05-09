"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Download, Bell, ArrowRight, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const NAV_LINKS = ["Home", "Classes", "Pricing", "Testimonials", "Contact"];

export function Navbar() {
  const [activeLink, setActiveLink] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const scrollToSection = (link: string) => {
    setActiveLink(link);
    setMobileOpen(false); // Close mobile menu if open
    
    // Check if we are on the home page, if not navigate to home first
    if (window.location.pathname !== '/') {
      router.push(`/#${link.toLowerCase()}`);
      return;
    }

    const element = document.getElementById(link.toLowerCase());
    if (element) {
      // Get the navbar height to offset the scroll (approx 80px / 5rem)
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else if (link === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between border-b border-border bg-background px-4 transition-all lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime transition-transform group-hover:scale-105">
            <span className="font-display text-sm font-bold text-black leading-none">F</span>
          </div>
          <span className="font-display text-xl text-foreground">FitTrack</span>
        </Link>

        {/* Desktop Links with Liquid Underline */}
        <nav className="hidden h-full items-center lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeLink === link;
            return (
              <div key={link} className="relative flex h-full items-center px-6">
                <button
                  onClick={() => scrollToSection(link)}
                  className={cn(
                    "text-sm transition-colors",
                    isActive ? "font-semibold text-foreground" : "font-medium text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link}
                </button>
                
                {/* Active Dip SVG */}
                {isActive && (
                  <motion.div
                    layoutId="liquid-dip"
                    className="absolute -bottom-[1px] left-1/2 z-10 -translate-x-1/2 text-border"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <svg
                      width="64"
                      height="12"
                      viewBox="0 0 64 12"
                      className="fill-background stroke-accent"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M 0 12 C 18 12 16 0 32 0 C 48 0 46 12 64 12"
                        strokeWidth="1"
                      />
                    </svg>
                  </motion.div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Side Utilities & Pill */}
        <div className="hidden shrink-0 items-center lg:flex">
          <div className="mr-6 flex items-center gap-5 text-foreground">
            <button className="transition-opacity hover:opacity-70"><Search size={20} strokeWidth={1.5} /></button>
            <button className="transition-opacity hover:opacity-70"><Download size={20} strokeWidth={1.5} /></button>
            <button className="relative transition-opacity hover:opacity-70">
              <Bell size={20} strokeWidth={1.5} />
              <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-lime border border-background" />
            </button>
          </div>

          <button onClick={() => router.push("/join")} className="group relative flex h-12 items-center overflow-hidden rounded-full bg-foreground pl-6 pr-1.5 shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]">
            <span className="mr-4 text-sm font-semibold text-background">Log In</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lime text-black transition-transform group-hover:-rotate-45">
              <ArrowRight size={18} strokeWidth={2.5} />
            </div>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex items-center text-foreground lg:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Simple Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 right-0 top-0 z-50 flex w-64 flex-col bg-background p-6 lg:hidden"
            >
              <div className="flex flex-col gap-4 mt-8">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link)}
                    className={cn(
                      "text-left text-lg transition-colors",
                      activeLink === link ? "font-semibold text-lime" : "font-medium text-foreground"
                    )}
                  >
                    {link}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
