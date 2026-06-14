// src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts
"use client";

import { useState, useCallback } from "react";
import type {
  PlaygroundPresetListItem,
  PlaygroundPresetCreateSchema,
  PlaygroundPresetUpdateSchema,
} from "@/shared/schemas/playground";
import type { z } from "zod";

type CreateInput = z.infer<typeof PlaygroundPresetCreateSchema>;
type UpdateInput = z.infer<typeof PlaygroundPresetUpdateSchema>;

export interface UsePresetsState {
  presets: PlaygroundPresetListItem[];
  loading: boolean;
  error: string | null;
}

export interface UsePresets extends UsePresetsState {
  list: () => Promise<void>;
  create: (input: CreateInput) => Promise<PlaygroundPresetListItem | null>;
  update: (id: string, patch: UpdateInput) => Promise<PlaygroundPresetListItem | null>;
  remove: (id: string) => Promise<void>;
}

/**
 * Hook for managing playground presets via REST API.
 * Wraps fetch calls to /api/playground/presets with local state cache.
 */
export function usePresets(): UsePresets {
  const [presets, setPresets] = useState<PlaygroundPresetListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const list = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/playground/presets");
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          error?: { message?: string };
        };
        throw new Error(body.error?.message ?? `HTTP ${res.status}`);
      }
      const body = (await res.json()) as { presets: PlaygroundPresetListItem[] };
      setPresets(body.presets ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(
    async (input: CreateInput): Promise<PlaygroundPresetListItem | null> => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/playground/presets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as {
            error?: { message?: string };
          };
          throw new Error(body.error?.message ?? `HTTP ${res.status}`);
        }
        const created = (await res.json()) as PlaygroundPresetListItem;
        // Refresh the list after mutation.
        await list();
        return created;
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        return null;
      } finally {
        setLoading(false);
      }
    },
    [list],
  );

  const update = useCallback(
    async (id: string, patch: UpdateInput): Promise<PlaygroundPresetListItem | null> => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/playground/presets/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        });
        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as {
            error?: { message?: string };
          };
          throw new Error(body.error?.message ?? `HTTP ${res.status}`);
        }
        const updated = (await res.json()) as PlaygroundPresetListItem;
        // Refresh list after mutation.
        await list();
        return updated;
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        return null;
      } finally {
        setLoading(false);
      }
    },
    [list],
  );

  const remove = useCallback(
    async (id: string): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/playground/presets/${id}`, {
          method: "DELETE",
        });
        if (!res.ok && res.status !== 204) {
          const body = (await res.json().catch(() => ({}))) as {
            error?: { message?: string };
          };
          throw new Error(body.error?.message ?? `HTTP ${res.status}`);
        }
        // Refresh list after mutation.
        await list();
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    },
    [list],
  );

  return {
    presets,
    loading,
    error,
    list,
    create,
    update,
    remove,
  };
}
