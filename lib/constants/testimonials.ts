export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Aisha Johnson",
    role: "CrossFit Athlete",
    quote:
      "FitTrack completely changed how I approach programming. The analytics showed me I was overtraining my shoulders — something I'd missed for months. Two weeks of adjustments and my overhead press jumped 12kg.",
    rating: 5,
    avatar: "/testimonials/avatar-1.png",
  },
  {
    id: "t2",
    name: "Marcus Brennan",
    role: "Powerlifter",
    quote:
      "I've tried every tracking app out there. FitTrack is the first one that actually feels designed for serious lifters. The progressive overload suggestions alone are worth it.",
    rating: 5,
    avatar: "/testimonials/avatar-2.png",
  },
  {
    id: "t3",
    name: "Kevin Luo",
    role: "Marathon Runner",
    quote:
      "The weekly progress reports keep me honest. I can see exactly where my mileage dips and when I need to dial back intensity. Shaved 4 minutes off my PB this season.",
    rating: 5,
    avatar: "/testimonials/avatar-3.png",
  },
  {
    id: "t4",
    name: "Priya Sharma",
    role: "Yoga Instructor",
    quote:
      "My clients love that I can share workout plans directly through the app. The community features make group accountability actually work — not just a buzzword.",
    rating: 4,
    avatar: "/testimonials/avatar-4.png",
  },
  {
    id: "t5",
    name: "Diego Morales",
    role: "Personal Trainer",
    quote:
      "I recommend FitTrack to every single client. The nutrition integration with workout data gives me insights I used to spend hours calculating manually. Game changer.",
    rating: 5,
    avatar: "/testimonials/avatar-5.png",
  },
  {
    id: "t6",
    name: "Emma Sullivan",
    role: "Triathlete",
    quote:
      "Balancing swim, bike, and run training used to be chaos. FitTrack's multi-sport tracking finally gave me one place to see everything. The UI is gorgeous too.",
    rating: 5,
    avatar: "/testimonials/avatar-6.png",
  },
];
