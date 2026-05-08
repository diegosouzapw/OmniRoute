"use client";

import React, { useState } from "react";
import { cn } from "@/shared/utils/cn";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultIndex?: number;
  className?: string;
}

export default function Tabs({ tabs, defaultIndex = 0, className }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className={cn("my-6 flex flex-col gap-2", className)} role="tablist">
      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`tab-panel-${index}`}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              activeIndex === index
                ? "text-text-primary border-b-2 border-primary"
                : "text-text-muted hover:text-text-main"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        id={`tab-panel-${activeIndex}`}
        role="tabpanel"
        className="p-4 rounded-lg bg-bg-subtle border border-border"
      >
        {tabs[activeIndex].content}
      </div>
    </div>
  );
}
