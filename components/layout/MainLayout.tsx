import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

/**
 * App-wide layout shell. Wraps content with the sticky navbar and
 * reserves top padding so page content isn't hidden behind the
 * fixed header (h-16 = 4rem).
 */
export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </>
  );
}
