/**
 * Registry of local-core config renderers, one entry per core.
 *
 * A second core only adds one file plus one table entry; callers resolve the
 * renderer through `RENDERERS[DEFAULT_CORE]` at runtime.
 */
import type { CoreModel } from "./model";
import { renderSingBox } from "./singbox";

export type RenderOk = {
  ok: true;
  text: string;
  unchanged: boolean;
  skipped: Array<{ node: string; reason: string }>;
  /** Stable digest of the rendered member tags (tags only, never parameters). */
  membersDigest?: string;
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

export const RENDERERS: Record<string, CoreRenderer> = {
  "sing-box": Object.assign(renderSingBox, { apiReload: false as const }),
};

/** Core rendered when a subscription doesn't name one (only entry so far). */
export const DEFAULT_CORE = "sing-box";
