"use client";

interface ContextColorBarProps {
  contextKey?: string;
  className?: string;
}

function hashToHue(key: string): number {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) & 0xffffff;
  }
  return (hash * 137.5) % 360;
}

export function ContextColorBar({ contextKey, className }: ContextColorBarProps) {
  const hue = contextKey ? hashToHue(contextKey) : 0;
  const color = contextKey ? `hsl(${hue}, 70%, 50%)` : "transparent";
  return (
    <div
      className={className}
      style={{ width: 3, minWidth: 3, backgroundColor: color, borderRadius: 2 }}
      title={contextKey ? `ctx #${contextKey.slice(0, 6)}` : undefined}
    />
  );
}
