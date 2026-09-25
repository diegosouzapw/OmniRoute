export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "-";
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? "-"
    : date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}
