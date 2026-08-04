import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names. Conditional classes are flattened by clsx; conflicting Tailwind
 * utilities are deduped by tailwind-merge, so a caller's `className` override actually
 * REPLACES a primitive's class (e.g. `rounded-full` wins over the primitive's radius)
 * instead of both stacking and relying on CSS source order.
 */
export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}
