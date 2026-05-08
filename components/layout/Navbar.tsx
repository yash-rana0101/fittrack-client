"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Classes", href: "/classes" },
  { label: "Workouts", href: "/workouts" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
] as const;

// ─── Sub-components ──────────────────────────────────────────

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group" id="nav-logo">
      <div
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime transition-transform group-hover:scale-105"
        aria-hidden
      >
        <span className="font-display text-sm text-black leading-none">F</span>
      </div>
      <span className="font-display text-xl text-foreground">FitTrack</span>
    </Link>
  );
}

function DesktopLinks() {
  return (
    <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
      {NAV_LINKS.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          id={`nav-link-${label.toLowerCase()}`}
          className="group relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {label}
          {/* Underline that expands from center on hover */}
          <span
            className="absolute bottom-0.5 left-1/2 h-0.5 w-0 bg-lime transition-all duration-300 ease-out group-hover:left-[25%] group-hover:w-1/2"
            aria-hidden
          />
        </Link>
      ))}
    </nav>
  );
}

function JoinButton({ className }: { className?: string }) {
  return (
    <Link
      href="/join"
      id="nav-join-cta"
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-lime px-6 py-2.5 text-sm font-semibold text-black",
        "transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]",
        className,
      )}
    >
      Join Now
    </Link>
  );
}

function MobileToggle({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative z-50 flex lg:hidden h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      id="nav-mobile-toggle"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <X size={20} />
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Menu size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

/*
 * Mobile drawer slides in from the right. Uses a full-viewport overlay
 * so the user can tap outside to close. The staggerChildren on the list
 * gives each link a cascading entrance.
 */
function MobileDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
          />

          {/* Drawer panel */}
          <motion.aside
            className="fixed inset-y-0 right-0 z-40 flex w-[min(80vw,320px)] flex-col bg-background border-l border-border p-6 pt-20 lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            id="nav-mobile-drawer"
          >
            <motion.nav
              className="flex flex-col gap-1"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
              }}
              aria-label="Mobile"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <motion.div
                  key={href}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={href}
                    onClick={onClose}
                    className="flex items-center rounded-xl px-4 py-3 text-lg font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="mt-4 pt-4 border-t border-border"
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <JoinButton className="w-full py-3 text-base" />
              </motion.div>
            </motion.nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Navbar ─────────────────────────────────────────────

export function Navbar() {
  const { isScrolled } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent",
      )}
      id="nav-header"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <DesktopLinks />

        <div className="flex items-center gap-3">
          <JoinButton className="hidden lg:inline-flex" />
          <MobileToggle
            isOpen={mobileOpen}
            onToggle={() => setMobileOpen((prev) => !prev)}
          />
        </div>
      </div>

      <MobileDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}
