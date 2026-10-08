"use client";

import { useState } from "react";

type Draft = { owner: object | null; value: string };

/**
 * Tracks the test model chosen in the Edit Connection form. The draft is bound
 * to the connection snapshot it was edited on, so opening another snapshot
 * (or reopening the modal, i.e. a null snapshot) starts with no pending change.
 */
export function useConnectionTestModelDraft(
  snapshot: { id?: string } | null | undefined,
  disabled = false
) {
  const [draft, setDraft] = useState<Draft | null>(null);
  if (!snapshot && draft) setDraft(null); // closed: discard any unsaved choice
  const pending = snapshot && draft?.owner === snapshot ? draft.value : undefined;
  return {
    fieldProps: {
      connectionId: snapshot?.id ?? "",
      disabled,
      onChange: (value: string) => setDraft({ owner: snapshot ?? null, value }),
    },
    /** Omit unchanged values: the test dialog may have saved a newer model since
     * this snapshot loaded, and the API merges the current data. */
    applyTo(providerSpecificData: Record<string, unknown>) {
      delete providerSpecificData.connectionTestModel;
      if (pending !== undefined) providerSpecificData.connectionTestModel = pending || null;
    },
  };
}
