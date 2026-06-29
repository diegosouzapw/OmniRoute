import { SHARED_BOUNDARIES, CAVEMAN_INSTRUCTION_BY_LANGUAGE } from "../outputMode.ts";

/**
 * A single output-steering style. Instruction text MUST be static per
 * `(id, level, language)` — no timestamps, no per-request interpolation — so the
 * injected system prefix stays prompt-cache-stable (D-A4). The registry contract
 * forbids non-deterministic instruction text.
 */
export interface OutputStyle {
  /** Stable id, e.g. "terse-prose" | "less-code" | "terse-cjk". */
  id: string;
  /** Human label for the settings panel. */
  label: string;
  /** Short panel description (i18n-independent English). */
  description?: string;
  /** Instruction text per intensity. Static / deterministic. */
  levels: { lite: string; full: string; ultra: string };
  /** Optional per-style boundary clause; when absent the SHARED_BOUNDARIES is used. */
  boundaries?: string;
  /** Locale gate: when set, the style is only offered/honored under this language code. */
  locale?: string;
  /** Optional localized `levels`, keyed by language code. */
  i18n?: Record<string, { lite: string; full: string; ultra: string }>;
}

/**
 * The Output Style registry. Adding a style = one entry here; the injector and the
 * settings panel both enumerate this object, so no other file needs to change (D-A1).
 * Declaration order is the deterministic concatenation order used by the injector.
 */
export const OUTPUT_STYLE_CATALOG: Record<string, OutputStyle> = {
  "terse-prose": {
    id: "terse-prose",
    label: "Terse prose",
    description: "Drop filler/articles/hedging; keep technical substance exact.",
    // Migrated verbatim from the caveman output mode (outputMode.ts) — referenced (not
    // re-typed) so the back-compat injection stays byte-identical across ALL languages,
    // not just English (the legacy mode localized to en/pt-BR/ja/id).
    levels: CAVEMAN_INSTRUCTION_BY_LANGUAGE.en,
    i18n: {
      "pt-BR": CAVEMAN_INSTRUCTION_BY_LANGUAGE["pt-BR"],
      ja: CAVEMAN_INSTRUCTION_BY_LANGUAGE.ja,
      id: CAVEMAN_INSTRUCTION_BY_LANGUAGE.id,
    },
  },
  "less-code": {
    id: "less-code",
    label: "Less code",
    description: "YAGNI ladder: smallest working change, no unrequested abstractions.",
    // Ported from 9router ponytail (ponytailPrompt.js); attribution preserved.
    levels: {
      lite: `Write the smallest change that satisfies the request. Skip speculative abstractions. ${SHARED_BOUNDARIES}`,
      full: `Act like a lazy senior dev applying YAGNI. Smallest working change only. No unrequested abstractions, no premature generalization, no extra layers, no defensive scaffolding the request did not ask for. Reuse existing code over adding new code. ${SHARED_BOUNDARIES}`,
      ultra: `Minimal diff discipline. Touch the fewest lines that make it work. Zero new files, classes, or config unless strictly required. Inline over abstract. No "while we're here" extras. ${SHARED_BOUNDARIES}`,
    },
  },
  "terse-cjk": {
    id: "terse-cjk",
    label: "Terse CJK (文言)",
    description: "Classical-Chinese ultra-terse style (locale-gated to zh).",
    // Ported from 9router wenyan (cavemanPrompts.js); the worked extensibility example.
    locale: "zh",
    levels: {
      lite: `回答从简，去虚词、寒暄、修饰。代码、路径、命令、错误、URL、标识符一律照原样保留。${SHARED_BOUNDARIES}`,
      full: `以文言简体回答，惜字如金，去赘语虚词。代码、路径、命令、错误、URL、标识符照原样保留，不得改写。${SHARED_BOUNDARIES}`,
      ultra: `以极简文言回答，字字千金。仅留要义。代码、API名、错误串、URL、标识符照原样保留，绝不省略或改写。${SHARED_BOUNDARIES}`,
    },
  },
};

/** Catalog ids in declaration order (the deterministic concat order). */
export const OUTPUT_STYLE_IDS: string[] = Object.keys(OUTPUT_STYLE_CATALOG);

export function outputStyleMeta(id: string): OutputStyle {
  return OUTPUT_STYLE_CATALOG[id];
}
