"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import { DOCS_TOKENS } from "./tokens";

interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

interface DocsSidebarProps {
  sections: NavItem[];
  currentPath?: string;
  className?: string;
}

export default function DocsSidebar({ sections, currentPath, className }: DocsSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => pathname === href || currentPath === href;

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-sidebar border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-border">
        {!collapsed && <span className="font-bold text-text-primary">OmniRoute Docs</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 hover:bg-bg-subtle rounded transition-colors"
          aria-label="Toggle Sidebar"
        >
          <span className="block w-4 h-0.5 bg-text-main mb-1"></span>
          <span className="block w-4 h-0.5 bg-text-main mb-1"></span>
          <span className="block w-4 h-0.5 bg-text-main"></span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-2">
            {!collapsed && (
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.children?.map((item, childIdx) => (
                <Link
                  key={childIdx}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    isActive(item.href)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-text-main hover:bg-bg-subtle"
                  )}
                >
                  <span className="truncate">{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
