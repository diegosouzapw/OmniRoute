import type { EngineConfigField } from "@omniroute/open-sse/services/compression/engines/types";

type FormValues = Record<string, unknown>;

function asRecord(value: unknown): FormValues {
  return value && typeof value === "object" ? (value as FormValues) : {};
}

// The settings schemas reject an empty string, so an emptied text field means "not set".
function isEmptyText(value: unknown): boolean {
  return typeof value === "string" && value.trim() === "";
}

/** Form values an engine page shows: schema defaults, then the stored sub-object. */
export function seedEngineForm(
  engineId: string,
  schema: EngineConfigField[],
  stored: unknown
): FormValues {
  const current = asRecord(stored);
  const defaults: FormValues = Object.fromEntries(schema.map((f) => [f.key, f.defaultValue]));
  // Leave lite.maxToolLength out until a cap is stored. The baseline then has no cap, so an
  // unset cap stays unset (OMNIROUTE_LITE_MAX_TOOL_LENGTH applies) and typing 2000 still counts
  // as an edit. The form still shows 2000 through field.defaultValue.
  if (engineId === "lite" && current.maxToolLength === undefined) {
    delete defaults.maxToolLength;
  }
  return { ...defaults, ...current };
}

/**
 * The sub-object an engine page PUTs on save. The server replaces each sub-object row whole
 * (lite merges), so the body starts from the copy stored at save time and applies only the fields
 * edited since `saved`. The page hides `enabled`, so the form never writes it and the stored value
 * passes through. An emptied text field removes its key, and an emptied number field (NaN) leaves
 * the body as not set — except lite's cap, which maps to null below.
 */
export function buildEngineDetailUpdate(
  engineId: string,
  saved: FormValues,
  edited: FormValues,
  stored: unknown
): FormValues {
  const next = { ...asRecord(stored) };
  for (const [key, value] of Object.entries(edited)) {
    if (key === "enabled" || Object.is(value, saved[key])) continue;
    if (isEmptyText(value)) {
      delete next[key];
    } else if (typeof value === "number" && Number.isNaN(value)) {
      // An emptied number input is the only source of NaN: it means "not set" and leaves the
      // body, except lite's cap, which the lite merge below maps to null to drop the stored cap.
      // Overflow (Infinity) is a value, not an unset: it stays, and a non-lite schema rejects the
      // wire-null it serializes to. lite's cap null IS the clear sentinel, so only the page's cap
      // range guard stops an overflow cap from silently clearing the stored cap.
      if (engineId !== "lite" || key !== "maxToolLength") delete next[key];
      else next[key] = value;
    } else {
      next[key] = value;
    }
  }
  if (engineId !== "lite") return next;
  // The lite settings schema accepts only these two fields. A cleared cap input holds NaN, and
  // null tells the server to drop the stored cap.
  const cap = next.maxToolLength;
  return {
    compressToolResults: next.compressToolResults !== false,
    ...("maxToolLength" in next
      ? { maxToolLength: typeof cap === "number" && Number.isNaN(cap) ? null : Math.floor(cap) }
      : {}),
  };
}

/** The form after a successful save: what the server now holds, plus edits made meanwhile. */
export function formAfterSave(written: FormValues, sent: FormValues, now: FormValues): FormValues {
  const next = { ...written };
  for (const [key, value] of Object.entries(now)) {
    if (!Object.is(value, sent[key])) next[key] = value;
  }
  return next;
}

/**
 * The baseline after a failed save. The server may have applied the save before the request
 * failed, so the fields it carried leave the baseline and the next save sends them again.
 */
export function forgetSentEdits(saved: FormValues, sent: FormValues): FormValues {
  const next = { ...saved };
  for (const [key, value] of Object.entries(sent)) {
    if (!Object.is(value, saved[key])) delete next[key];
  }
  return next;
}

/**
 * Form values without emptied text fields or emptied number fields (NaN), so a preview config
 * passes the settings schema. Overflow values stay, so the schema rejects them visibly.
 */
export function withoutEmptyText(values: FormValues): FormValues {
  return Object.fromEntries(
    Object.entries(values).filter(
      ([, value]) => !isEmptyText(value) && !(typeof value === "number" && Number.isNaN(value))
    )
  );
}
