import type { RetryPlan } from "./types";

/**
 * Parse the error JSONL (output of a failed batch) and return a Set of custom_ids
 * that had errors.
 *
 * Each line of the error file has the shape:
 *   { "id": "...", "custom_id": "...", "error": { "code": "...", "message": "..." } }
 */
function parseErrorIds(errorJsonl: string): Set<string> {
  const out = new Set<string>();
  for (const line of errorJsonl.split(/\r?\n/)) {
    if (line.trim().length === 0) continue;
    try {
      const parsed = JSON.parse(line);
      if (typeof parsed?.custom_id === "string" && parsed.custom_id.length > 0) {
        out.add(parsed.custom_id);
      }
    } catch {
      // Skip lines that are not valid JSON — they are not error entries
    }
  }
  return out;
}

/**
 * Build a retry plan: filter the original input JSONL to keep only the requests
 * whose `custom_id` appears in the error JSONL.
 *
 * This helper is **pure** — it does not fetch, read files, or write to disk.
 * The caller is responsible for:
 *   1. Fetching `GET /v1/files/{inputFileId}/content` → inputJsonl
 *   2. Fetching `GET /v1/files/{errorFileId}/content`  → errorJsonl
 *   3. Calling buildRetryPlan({ inputJsonl, errorJsonl })
 *   4. Uploading newJsonl via `POST /v1/files`
 *   5. Creating a new batch via `POST /v1/batches`
 */
export function buildRetryPlan(input: {
  inputJsonl: string;
  errorJsonl: string;
}): RetryPlan {
  const failed = parseErrorIds(input.errorJsonl);

  if (failed.size === 0) {
    return {
      failedCustomIds: [],
      retriableLines: 0,
      skippedLines: 0,
      newJsonl: "",
    };
  }

  const out: string[] = [];
  let skipped = 0;

  for (const line of input.inputJsonl.split(/\r?\n/)) {
    if (line.trim().length === 0) continue;
    try {
      const parsed = JSON.parse(line);
      if (typeof parsed?.custom_id === "string" && failed.has(parsed.custom_id)) {
        out.push(line);
      } else {
        skipped++;
      }
    } catch {
      // Skip invalid JSON lines — they won't retry cleanly anyway
      skipped++;
    }
  }

  return {
    failedCustomIds: Array.from(failed),
    retriableLines: out.length,
    skippedLines: skipped,
    newJsonl: out.join("\n") + (out.length > 0 ? "\n" : ""),
  };
}
