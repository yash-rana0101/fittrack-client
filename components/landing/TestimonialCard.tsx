import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/constants/testimonials";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={cn(
            "transition-colors",
            i < rating
              ? "fill-lime text-lime"
              : "fill-muted text-muted",
          )}
        />
      ))}
    </div>
  );
}

export function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <figure
      className={cn(
        "flex h-full w-[320px] shrink-0 flex-col justify-between sm:w-[360px]",
        "rounded-3xl border border-border bg-card p-6",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg hover:shadow-lime/5",
        "select-none",
      )}
    >
      {/* Quote */}
      <blockquote className="mb-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>

      {/* Author row */}
      <figcaption className="flex items-center gap-3 border-t border-border pt-4">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <Image
            src={testimonial.avatar}
            alt={`Portrait of ${testimonial.name}`}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {testimonial.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {testimonial.role}
          </p>
        </div>
        <StarRating rating={testimonial.rating} />
      </figcaption>
    </figure>
  );
}
