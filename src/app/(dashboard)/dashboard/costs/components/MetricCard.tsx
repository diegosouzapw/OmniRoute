import { Card } from "@/shared/components";

export function MetricCard({
  label,
  value,
  subValue,
  color = "text-text-main",
  loading = false,
}: {
  label: string;
  value: string;
  subValue?: string;
  color?: string;
  loading?: boolean;
}) {
  return (
    <Card className="px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-text-muted font-semibold">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{loading ? "…" : value}</p>
      {subValue ? <p className="text-xs text-text-muted mt-1">{subValue}</p> : null}
    </Card>
  );
}
