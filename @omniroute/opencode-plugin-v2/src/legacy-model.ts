/**
 * Vendored legacy catalog shape (beta `Model`), kept dependency-free.
 *
 * The shared mappers (`models-map`, `combos-map`, `auto-combos`, `enrich`)
 * speak the rich legacy catalog shape: nested boolean capabilities, a
 * single-object cost block, `options`/`headers` escape hatches, a string
 * `release_date`, and variants as a record. It was previously imported from
 * `@opencode-ai/sdk/v2`; vendoring it removes the beta SDK dependency while
 * keeping the mapper layer untouched. The stable-contract boundary lives in
 * `catalog.ts` (`legacyToStable`), which projects this shape onto the
 * `Model.Info`/`Provider.Info` types from `@opencode/plugin`.
 */
export interface LegacyModelCapabilities {
  temperature: boolean;
  reasoning: boolean;
  attachment: boolean;
  toolcall: boolean;
  input: {
    text: boolean;
    audio: boolean;
    image: boolean;
    video: boolean;
    pdf: boolean;
  };
  output: {
    text: boolean;
    audio: boolean;
    image: boolean;
    video: boolean;
    pdf: boolean;
  };
  interleaved:
    | boolean
    | {
        field: "reasoning" | "reasoning_content" | "reasoning_text" | string;
      };
}

export interface LegacyModelCost {
  input: number;
  output: number;
  cache: {
    read: number;
    write: number;
  };
}

export interface LegacyModel {
  id: string;
  providerID: string;
  api: {
    id: string;
    url: string;
    npm: string;
  };
  name: string;
  family?: string;
  capabilities: LegacyModelCapabilities;
  cost: LegacyModelCost;
  limit: {
    context: number;
    input?: number;
    output: number;
  };
  status: "alpha" | "beta" | "deprecated" | "active";
  options: {
    [key: string]: unknown;
  };
  headers: {
    [key: string]: string;
  };
  release_date: string;
  variants?: {
    [key: string]: {
      [key: string]: unknown;
    };
  };
}

/** Namespace alias so existing `Model as X` imports keep working. */
export type Model = LegacyModel;
