/**
 * Sync-side generation: render the core config beside the adopted file.
 *
 * This is the only file of the generation feature that touches the disk.
 * It reads the adopted file with `readPrivateConfigFile` (read-only here) and
 * writes `<path>.generated` with `writePrivateConfigFile` (atomic,
 * symlink-refusing, mode 0600). The adopted file is only ever replaced by
 * `apply.ts`, after a native check by the host-configured core binary.
 *
 * Note: the writer creates a missing target directory internally, so the
 * directory check below is best-effort only — it warns first without
 * creating anything; a directory removed in between still gets created by
 * the writer (the write itself stays atomic either way).
 */
import fs from "node:fs";
import path from "node:path";
import { readPrivateConfigFile, writePrivateConfigFile } from "@/lib/cli-helper/privateConfigFile";
import { parseLocalCoreEndpoints } from "../coreEndpoint";
import type { ParsedSubscription } from "../parse";
import { applyRendered, type ApplyBesideReason } from "./apply";
import { buildCoreModel } from "./model";
import { isCoreBinaryPathAllowed } from "./pathGuard";
import { DEFAULT_CORE, RENDERERS, type RenderRefused } from "./renderers";

export interface CoreConfigSub {
  coreConfigPath: string | null;
  localCoreEndpoint: string | null;
  id?: string;
}

function logSkippedCounts(
  model: { skipped: Array<{ reason: string }> },
  result: { skipped: Array<{ reason: string }> },
  label: string
): void {
  const counts = new Map<string, number>();
  for (const entry of [...model.skipped, ...result.skipped]) {
    counts.set(entry.reason, (counts.get(entry.reason) ?? 0) + 1);
  }
  if (counts.size === 0) return;
  const summary = [...counts.entries()]
    .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
    .map(([reason, count]) => `${reason}=${count}`)
    .join(", ");
  console.warn(`[ProxySubscription] core config skipped for ${label}: ${summary}`);
}

/** Encode a sync warning without importing the service (cycle-free). */
function encodeWarning(code: string, detail?: string): string {
  return JSON.stringify(detail ? { code, detail } : { code });
}

function warn(reason: string): string {
  return encodeWarning("CORE_CONFIG_NOT_GENERATED", reason);
}

function renderAndLog(
  sub: CoreConfigSub,
  model: ReturnType<typeof buildCoreModel>,
  existingText: string | null
): string | null | { text: string } {
  const target = (sub.coreConfigPath ?? "").trim();
  const renderer = RENDERERS[DEFAULT_CORE];
  const result = renderer(model, existingText);
  if (!result.ok) return warn((result as RenderRefused).reason);
  if (result.unchanged) return null;
  logSkippedCounts(model, result, (sub as { id?: string }).id ?? target);
  return { text: result.text };
}

/**
 * Render and apply the beside-file for one subscription. Returns the encoded
 * warning when nothing usable was written, null on success or when the
 * feature is off (empty path). Never throws — sync must never fail because
 * generation did.
 *
 * With a core binary configured on the host (OMNIROUTE_PROXY_CORE_BINARY_PATH),
 * the rendered text is verified with the core's native check before replacing
 * the adopted file (a pass swaps it in atomically, a miss writes
 * `<path>.generated` beside it and warns). Without one, the beside-file is
 * written directly as before.
 */
export async function generateForSubscription(
  sub: CoreConfigSub,
  parsed: ParsedSubscription
): Promise<string | null> {
  const target = (sub.coreConfigPath ?? "").trim();
  if (!target) return null;

  const existingText = readExisting(target);
  if (existingText.failed) return warn("read_failed");

  const model = buildCoreModel(parseLocalCoreEndpoints(sub.localCoreEndpoint), [
    ...parsed.nodes,
    ...parsed.needsCore,
  ]);
  const rendered = renderAndLog(sub, model, existingText.text);
  if (typeof rendered === "string") return rendered;
  if (rendered === null) return null;

  const dir = path.dirname(`${target}.generated`);
  try {
    if (!fs.statSync(dir).isDirectory()) return warn("write_failed");
  } catch {
    return warn("write_failed");
  }
  const binaryPath = configuredCoreBinary(sub.id ?? target);
  if (binaryPath) return applyVerified(sub, target, binaryPath, rendered.text);
  return writeBeside(target, rendered.text);
}

/** Host environment variable naming the core binary used for the native check. */
export const CORE_BINARY_ENV = "OMNIROUTE_PROXY_CORE_BINARY_PATH";

/**
 * The core binary is run with `execFile`, so its path comes from the host
 * environment only — never from the database or the management API (Hard Rule
 * #15). An unset value means "write beside only"; a value that fails the
 * structural guard is ignored with a server-side warning. Never throws.
 */
function configuredCoreBinary(label: string): string | null {
  const raw = (process.env[CORE_BINARY_ENV] ?? "").trim();
  if (!raw) return null;
  const verdict = isCoreBinaryPathAllowed(raw);
  if (verdict.allowed) return raw;
  console.warn(`[ProxySubscription] ${CORE_BINARY_ENV} ignored for ${label}: ${verdict.reason}`);
  return null;
}

/** Read the beside-file, falling back to the adopted file. Never throws. */
function readExisting(target: string): { failed: boolean; text: string | null } {
  try {
    return { failed: false, text: readPrivateConfigFile(`${target}.generated`) };
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code !== "ENOENT") return { failed: true, text: null };
    try {
      return { failed: false, text: readPrivateConfigFile(target) };
    } catch (adoptedError) {
      if ((adoptedError as NodeJS.ErrnoException)?.code !== "ENOENT")
        return { failed: true, text: null };
      return { failed: false, text: null };
    }
  }
}

/** Write the beside-file directly (no binary configured). Never throws. */
function writeBeside(target: string, text: string): string | null {
  try {
    writePrivateConfigFile(`${target}.generated`, text);
    return null;
  } catch {
    return warn("write_failed");
  }
}

/**
 * Verify the rendered text with the core's native check before replacing
 * the adopted file: a pass swaps it in atomically, a miss writes
 * `<path>.generated` beside it and warns. Never throws.
 */
async function applyVerified(
  sub: CoreConfigSub,
  target: string,
  binaryPath: string,
  renderedText: string
): Promise<string | null> {
  try {
    const outcome = await applyRendered({
      adoptedPath: target,
      binaryPath,
      renderedText,
      subscriptionId: sub.id ?? "",
    });
    if (outcome.status === "replaced") return null;
    return warn(applyReason(outcome.beside));
  } catch {
    return warn("write_failed");
  }
}

/**
 * Map an apply beside-reason to the sync warning detail. The `no_binary`
 * case cannot happen here (guarded above) — it still maps, defensively.
 */
function applyReason(beside: ApplyBesideReason | undefined): string {
  switch (beside) {
    case "binary_missing":
    case "check_failed":
      return "check_failed";
    case "unchanged_skip":
      return "unchanged";
    case "write_failed":
      return "write_failed";
    default:
      return "not_applied";
  }
}
