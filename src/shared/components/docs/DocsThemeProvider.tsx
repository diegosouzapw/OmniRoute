"use client";

import React from "react";
import { cn } from "@/shared/utils/cn";
import { DOCS_TOKENS } from "./tokens";

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: "light" | "dark" | "system";
}

export default function DocsThemeProvider({
  children,
  initialTheme = "system",
}: ThemeProviderProps) {
  return (
    <div className="min-h-screen bg-bg text-text-main font-sans selection:bg-primary/20">
      {children}
    </div>
  );
}
