import { cn } from "@/shared/utils";

interface CategoryDotProps {
  color: string;
  hasFree?: boolean;
  label?: string;
  freeLabel?: string;
  className?: string;
}

export function CategoryDot({
  color,
  hasFree = false,
  label,
  freeLabel,
  className,
}: CategoryDotProps) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 shrink-0", className)}>
      <span className={cn("size-2 rounded-full shrink-0", color)} title={label} />
      {hasFree && <span className="size-2 rounded-full shrink-0 bg-green-500" title={freeLabel} />}
    </span>
  );
}
