/**
 * Registry of local-core config renderers, one entry per core.
 *
 * A second core only adds one file plus one table entry; callers resolve the
 * renderer through `RENDERERS[DEFAULT_CORE]` at runtime.
 */
import type { CoreModel } from "./model";
import { renderSingBox, resolveOffendingTag } from "./singbox";

export type RenderOk = {
  ok: true;
  text: string;
  unchanged: boolean;
  skipped: Array<{ node: string; reason: string }>;
  /** Stable digest of the rendered member tags (tags only, never parameters). */
  membersDigest?: string;
  /**
   * Owned-position table aligned with the output positions: one entry
   * per position, the owned node tag or null for positions this renderer
   * does not own (operator entries, selectors). Feeds the offending-output
   * resolver after a failed check.
   */
  ownedIndex?: Array<string | null>;
};

export type RenderRefused = {
  ok: false;
  reason: "unparseable" | "no_ownable_section" | "not_an_object";
};

export type RenderResult = RenderOk | RenderRefused;

export type CoreRenderer = ((model: CoreModel, existingText: string | null) => RenderResult) & {
  /** Whether this core offers an HTTP config-reload API. Defaults to false. */
  apiReload?: boolean;
};

/**
 * Resolves the node tag a failed core check names from the raw checker
 * output and the renderer's owned-position table (`null` entries mark
 * positions the renderer does not own). Returns null when the check names
 * nothing usable. Core-agnostic: each core ships one resolver function.
 */
export type OffendingResolver = (
  stderr: string,
  ownedIndex: Array<string | null>
) => { tag: string; token: string } | null;

/** One offending-output resolver per core, looked up at runtime. */
export const OFFENDING_RESOLVERS: Record<string, OffendingResolver> = {
  "sing-box": resolveOffendingTag,
};

export const RENDERERS: Record<string, CoreRenderer> = {
  "sing-box": Object.assign(renderSingBox, { apiReload: false as const }),
};

/** Core rendered when a subscription doesn't name one (only entry so far). */
export const DEFAULT_CORE = "sing-box";
