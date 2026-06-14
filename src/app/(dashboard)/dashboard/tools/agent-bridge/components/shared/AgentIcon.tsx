"use client";

interface AgentIconProps {
  icon: string;
  color: string;
  size?: number;
}

export function AgentIcon({ icon, color, size = 20 }: AgentIconProps) {
  return (
    <div
      className="flex items-center justify-center rounded-lg shrink-0"
      style={{
        backgroundColor: `${color}20`,
        width: size + 12,
        height: size + 12,
      }}
    >
      <span
        className="material-symbols-outlined"
        style={{ fontSize: size, color }}
      >
        {icon}
      </span>
    </div>
  );
}
