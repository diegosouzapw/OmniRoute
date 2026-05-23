import { cn } from "@/shared/utils";

interface CategoryDotProps {
  color: string;
  label?: string;
  className?: string;
}

export function CategoryDot({ color, label, className }: CategoryDotProps) {
  return (
    <span className={cn("inline-flex items-center shrink-0", className)}>
      <span className={cn("size-2 rounded-full shrink-0", color)} title={label} />
    </span>
  );
}
