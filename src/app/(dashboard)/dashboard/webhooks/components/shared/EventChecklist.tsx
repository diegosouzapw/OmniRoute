"use client";

const WEBHOOK_EVENTS = [
  "request.completed",
  "request.failed",
  "provider.error",
  "provider.recovered",
  "quota.exceeded",
  "combo.switched",
  "test.ping",
] as const;

interface EventChecklistProps {
  selected: string[];
  onChange: (events: string[]) => void;
  allEventsLabel?: string;
}

export function EventChecklist({
  selected,
  onChange,
  allEventsLabel = "All events",
}: EventChecklistProps) {
  const isAll = selected.includes("*");

  const toggle = (event: string) => {
    if (event === "*") {
      onChange(["*"]);
      return;
    }
    const without = selected.filter((e) => e !== "*");
    const next = without.includes(event) ? without.filter((e) => e !== event) : [...without, event];
    onChange(next.length > 0 ? next : ["*"]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => toggle("*")}
        className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
          isAll
            ? "border-primary/30 bg-primary/10 text-primary"
            : "border-border bg-surface text-text-muted hover:text-text-main"
        }`}
      >
        {allEventsLabel}
      </button>
      {WEBHOOK_EVENTS.map((ev) => (
        <button
          key={ev}
          type="button"
          onClick={() => toggle(ev)}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            isAll || selected.includes(ev)
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-border bg-surface text-text-muted hover:text-text-main"
          }`}
        >
          {ev}
        </button>
      ))}
    </div>
  );
}
