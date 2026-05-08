🏗️ FitTrack Architecture & Technical Design
This document outlines the architectural decisions, folder structure, and technical implementation details for the FitTrack platform.

1. Core Tech Stack
Framework: Next.js 14+ (App Router)

Styling: Tailwind CSS (Utility-first)

Components: Shadcn/UI (Radix UI Primitives)

Animations: Framer Motion (Orchestration & Transitions)

Form Management: React Hook Form + Zod (Schema Validation)

Icons: Lucide React

2. Folder Structure
The project follows a Feature-Based Architecture to ensure high maintainability and scalability, as requested in the assessment criteria.
````
├── app/                  # Routes, Layouts, and Server Components
│   ├── (marketing)/      # Landing Page (Hero, Features, Pricing)
│   ├── (auth)/           # Multi-step Onboarding (Steps 1-5)
│   └── (dashboard)/      # User Dashboard & Stats
├── components/           # UI Components
│   ├── ui/               # Nova/Shadcn primitives (Buttons, Inputs)
│   ├── shared/           # Navbar, Footer
│   └── onboarding/       # Specific sub-components for the 5-step flow
├── features/             # Business Logic & Complex Components
│   ├── charts/           # Activity/Fitness Charts
│   └── forms/            # Zod validation schemas and form logic
├── hooks/                # Custom React hooks (useStep, useLocalStorage)
├── lib/                  # Shared utilities (Tailwind merge, API helpers)
├── public/               # Static assets (Hero images, Icons)
├── tailwind.config.ts    # Design System configuration
└── next.config.js        # Next.js specific settings
````

3. High-Level Design Patterns
A. Multi-Step Onboarding Controller
To achieve "Apple-level polish", the onboarding flow uses a Centralized State Pattern.

State Management: Managed via a custom hook or URL Query Parameters (?step=1) to allow for browser "Back" button support.

Transitions: An AnimatePresence wrapper ensures smooth entry/exit animations when switching steps.

Validation: Each step uses a specific Zod schema fragment, preventing progress until the current step's requirements are met.

B. Responsive Layout Strategy
Desktop (1440px): Utilizes a multi-column masonry grid for the Landing Page and a permanent Sidebar for the Dashboard.

Tablet (768px): Adapts grids to 2-columns; Navbar collapses into a simplified menu.

Mobile (375px): Features "thumb-friendly" bottom navigation for the Dashboard and full-screen cards for the onboarding flow.

C. Performance & Optimization
Image Optimization: Every asset (like the hero image from image_76075d.jpg) uses next/image for automatic resizing and lazy loading.

Dynamic Imports: Heavy components like Dashboard Charts are dynamically imported with ssr: false to reduce the initial bundle size.

Skeleton States: Shadcn Skeleton components are used during data loading to provide a stable UI (avoiding Layout Shift).

4. UI/UX Features
Glassmorphism: Implementing backdrop-blur and semi-transparent backgrounds on the sticky Navbar for a premium feel.

Theming: Dark mode is handled via next-themes with a smooth CSS transition between palettes.

Micro-interactions: Buttons use whileTap={{ scale: 0.95 }} and whileHover scales to provide tactile feedback.

5. Security & Validation
Client-side Validation: Real-time feedback using Zod schemas ensures users correct errors before submission.

Password Strength: A custom visual indicator calculates complexity on Step 1 of onboarding.

Persistence: Onboarding progress is cached in sessionStorage to prevent data loss on accidental refreshes.