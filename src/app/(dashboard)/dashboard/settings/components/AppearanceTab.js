"use client";

import { Card, Toggle } from "@/shared/components";
import { useTheme } from "@/shared/hooks/useTheme";
import { cn } from "@/shared/utils/cn";

export default function AppearanceTab() {
  const { theme, setTheme, isDark } = useTheme();

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            palette
          </span>
        </div>
        <h3 className="text-lg font-semibold">Appearance</h3>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Dark Mode</p>
            <p className="text-sm text-text-muted">Switch between light and dark themes</p>
          </div>
          <Toggle checked={isDark} onChange={() => setTheme(isDark ? "light" : "dark")} />
        </div>

        <div className="pt-4 border-t border-border">
          <div
            role="tablist"
            aria-label="Theme selection"
            className="inline-flex p-1 rounded-lg bg-black/5 dark:bg-white/5"
          >
            {["light", "dark", "system"].map((option) => (
              <button
                key={option}
                role="tab"
                aria-selected={theme === option}
                onClick={() => setTheme(option)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all",
                  theme === option
                    ? "bg-white dark:bg-white/10 text-text-main shadow-sm"
                    : "text-text-muted hover:text-text-main"
                )}
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  {option === "light" ? "light_mode" : option === "dark" ? "dark_mode" : "contrast"}
                </span>
                <span className="capitalize">{option}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
