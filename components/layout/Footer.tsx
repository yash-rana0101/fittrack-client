import Link from "next/link";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
          {/* Brand & Address */}
          <section className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group w-max">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime transition-transform group-hover:scale-105"
                aria-hidden
              >
                <span className="font-display text-sm text-black leading-none">F</span>
              </div>
              <span className="font-display text-xl text-foreground">FitTrack</span>
            </Link>
            <address className="text-sm not-italic text-muted-foreground">
              123 Fitness Way
              <br />
              London, UK W1T 3BQ
              <br />
              <a href="mailto:hello@fittrack.com" className="hover:text-foreground transition-colors">
                hello@fittrack.com
              </a>
            </address>
          </section>

          {/* Links */}
          <section>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
              Platform
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="/features" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="/workouts" className="hover:text-foreground transition-colors">Workouts</Link></li>
              <li><Link href="/analytics" className="hover:text-foreground transition-colors">Analytics</Link></li>
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
            </ul>
          </section>
        </div>
        
        <div className="mt-12 border-t border-border pt-8 text-center sm:text-left text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} FitTrack. All rights reserved.</p>
          <div className="flex gap-4 justify-center sm:justify-start">
            <Link href="#" aria-label="Twitter" className="hover:text-foreground transition-colors">
              Twitter
            </Link>
            <Link href="#" aria-label="Instagram" className="hover:text-foreground transition-colors">
              Instagram
            </Link>
            <Link href="#" aria-label="YouTube" className="hover:text-foreground transition-colors">
              YouTube
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
