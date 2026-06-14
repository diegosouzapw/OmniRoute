// src/app/(dashboard)/dashboard/playground/hooks/useToolsBuilder.ts
"use client";

import { useState, useCallback } from "react";
import { ToolDefinitionSchema } from "@/shared/schemas/playground";
import type { ToolDefinition } from "@/lib/playground/codeExport";

export interface ToolsBuildResult {
  ok: true;
}

export interface ToolsBuildError {
  ok: false;
  error: string;
}

export type ToolsBuildOutcome = ToolsBuildResult | ToolsBuildError;

export interface UseToolsBuilderState {
  tools: ToolDefinition[];
  errors: Map<number, string>;
}

export interface UseToolsBuilder extends UseToolsBuilderState {
  /**
   * Add a tool after Zod validation.
   * Returns { ok: true } on success; { ok: false, error } if validation fails.
   */
  add: (tool: ToolDefinition) => ToolsBuildOutcome;
  /** Remove tool at given index. No-op if index out of bounds. */
  remove: (index: number) => void;
  /**
   * Replace tool at index after Zod validation.
   * Returns { ok: true } on success; { ok: false, error } if validation fails.
   * Clears previous error for that index on success.
   */
  update: (index: number, tool: ToolDefinition) => ToolsBuildOutcome;
  /** Remove all tools and clear all errors. */
  clear: () => void;
}

/**
 * Client-side manager for the `tools[]` array (Function Calling / Build tab).
 *
 * Validates each tool via Zod `ToolDefinitionSchema` before adding/updating.
 * Stores per-index validation errors so the UI can show inline hints.
 */
export function useToolsBuilder(): UseToolsBuilder {
  const [tools, setTools] = useState<ToolDefinition[]>([]);
  const [errors, setErrors] = useState<Map<number, string>>(new Map());

  const add = useCallback((tool: ToolDefinition): ToolsBuildOutcome => {
    const parsed = ToolDefinitionSchema.safeParse(tool);
    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => i.message).join("; ");
      return { ok: false, error: message };
    }
    setTools((prev) => [...prev, parsed.data as ToolDefinition]);
    return { ok: true };
  }, []);

  const remove = useCallback((index: number): void => {
    setTools((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
    setErrors((prev) => {
      const next = new Map(prev);
      next.delete(index);
      // Re-index errors for items after the removed one.
      const reindexed = new Map<number, string>();
      next.forEach((v, k) => {
        reindexed.set(k > index ? k - 1 : k, v);
      });
      return reindexed;
    });
  }, []);

  const update = useCallback((index: number, tool: ToolDefinition): ToolsBuildOutcome => {
    const parsed = ToolDefinitionSchema.safeParse(tool);
    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => i.message).join("; ");
      setErrors((prev) => {
        const next = new Map(prev);
        next.set(index, message);
        return next;
      });
      return { ok: false, error: message };
    }
    setTools((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      const next = [...prev];
      next[index] = parsed.data as ToolDefinition;
      return next;
    });
    setErrors((prev) => {
      const next = new Map(prev);
      next.delete(index);
      return next;
    });
    return { ok: true };
  }, []);

  const clear = useCallback((): void => {
    setTools([]);
    setErrors(new Map());
  }, []);

  return {
    tools,
    errors,
    add,
    remove,
    update,
    clear,
  };
}
