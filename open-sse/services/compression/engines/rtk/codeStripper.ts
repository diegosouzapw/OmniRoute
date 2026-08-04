import { createRequire } from "node:module";
// Type-only import: erased at build time, so it never forces the `typescript`
// package to be present at runtime. The value handle is resolved lazily below.
import type * as TypeScriptApi from "typescript";

type TypeScriptModule = typeof import("typescript");

// `typescript` is a devDependency used only for opt-in AST-based comment
// stripping. A production-lean deploy (`npm run build && npm prune --omit=dev`,
// recommended in Discussion #6956) removes it, so importing it eagerly at module
// top level broke *every* Compression Context page (#7096). Resolve it lazily on
// first use and degrade to a no-op when it is unavailable.
let typeScriptModule: TypeScriptModule | null | undefined;
let warnedMissingTypeScript = false;
let loadTypeScriptModule: () => TypeScriptModule | null = defaultLoadTypeScriptModule;

function defaultLoadTypeScriptModule(): TypeScriptModule | null {
  try {
    const requireFromHere = createRequire(import.meta.url);
    return requireFromHere("typescript") as TypeScriptModule;
  } catch {
    return null;
  }
}

function resolveTypeScript(): TypeScriptModule | null {
  if (typeScriptModule === undefined) {
    typeScriptModule = loadTypeScriptModule();
    if (!typeScriptModule && !warnedMissingTypeScript) {
      warnedMissingTypeScript = true;
      // One-time warning: compression still works, just without AST-based
      // code-comment stripping (which is opt-in and off by default anyway).
      console.warn(
        "[compression/rtk] optional dependency 'typescript' is not installed; " +
          "skipping AST-based code-comment stripping (compression still works). " +
          "Install 'typescript' to re-enable it."
      );
    }
  }
  return typeScriptModule;
}

/**
 * @internal Test seam — override the lazy TypeScript loader (pass `null` to
 * restore the default) and reset the cache so graceful degradation can be
 * exercised without uninstalling the package. Not part of the public API.
 */
export function __setTypeScriptModuleLoaderForTests(
  loader: (() => TypeScriptModule | null) | null
): void {
  loadTypeScriptModule = loader ?? defaultLoadTypeScriptModule;
  typeScriptModule = undefined;
  warnedMissingTypeScript = false;
}

export type CodeLanguage =
  | "javascript"
  | "typescript"
  | "python"
  | "rust"
  | "go"
  | "ruby"
  | "java"
  | "unknown";

export interface CodeStripperOptions {
  removeComments?: boolean;
  removeEmptyLines?: boolean;
  collapseWhitespace?: boolean;
  preserveDocstrings?: boolean;
}

const LANGUAGE_ALIASES: Record<string, CodeLanguage> = {
  js: "javascript",
  jsx: "javascript",
  javascript: "javascript",
  ts: "typescript",
  tsx: "typescript",
  typescript: "typescript",
  py: "python",
  python: "python",
  rs: "rust",
  rust: "rust",
  go: "go",
  rb: "ruby",
  ruby: "ruby",
  java: "java",
};

export function normalizeCodeLanguage(language?: string | null): CodeLanguage {
  if (!language) return "unknown";
  return LANGUAGE_ALIASES[language.trim().toLowerCase()] ?? "unknown";
}

export function detectCodeLanguage(text: string): CodeLanguage {
  if (/\b(?:interface|type)\s+\w+\s*=|:\s*(?:string|number|boolean)\b/.test(text)) {
    return "typescript";
  }
  if (/\b(?:const|let|function|import|export)\b|=>/.test(text)) return "javascript";
  if (/\bdef\s+\w+\(|\bimport\s+\w+|print\(/.test(text)) return "python";
  if (/\bfn\s+\w+\(|\blet\s+mut\b|println!\(/.test(text)) return "rust";
  if (/\bfunc\s+\w+\(|package\s+\w+/.test(text)) return "go";
  if (/\bclass\s+\w+|System\.out\.println/.test(text)) return "java";
  if (/\bdef\s+\w+|puts\s+|end\s*$/.test(text)) return "ruby";
  return "unknown";
}

/**
 * Remove JS/TS comments using the TypeScript parser (R1/N3). Using the parser —
 * not a regex or the raw scanner — means string, template and regex literals are
 * never mistaken for comments (the scanner alone cannot tell a regex from a
 * division without parser context). Bails out entirely when JSX is present so
 * JSX expression-container comments are never corrupted.
 */
function stripJsTsComments(text: string, preserveDocstrings: boolean): string {
  const ts = resolveTypeScript();
  // Graceful degradation: when `typescript` is unavailable (e.g. after
  // `npm prune --omit=dev`), skip AST-based comment stripping and leave the
  // code untouched rather than crashing (#7096).
  if (!ts) return text;

  const source = ts.createSourceFile(
    "snippet.tsx",
    text,
    ts.ScriptTarget.Latest,
    /* setParentNodes */ true,
    ts.ScriptKind.TSX
  );

  let hasJsx = false;
  const detectJsx = (node: TypeScriptApi.Node): void => {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node) || ts.isJsxFragment(node)) {
      hasJsx = true;
      return;
    }
    if (!hasJsx) ts.forEachChild(node, detectJsx);
  };
  detectJsx(source);
  if (hasJsx) return text;

  const ranges = new Map<number, TypeScriptApi.CommentRange>();
  const collect = (node: TypeScriptApi.Node): void => {
    for (const range of ts.getLeadingCommentRanges(text, node.getFullStart()) ?? []) {
      ranges.set(range.pos, range);
    }
    for (const range of ts.getTrailingCommentRanges(text, node.getEnd()) ?? []) {
      ranges.set(range.pos, range);
    }
    ts.forEachChild(node, collect);
  };
  collect(source);

  if (ranges.size === 0) return text;
  let result = text;
  for (const range of [...ranges.values()].sort((a, b) => b.pos - a.pos)) {
    // Keep JSDoc/docstring block comments (`/** ... */`) when preserveDocstrings is on — they
    // carry API documentation that is worth more than the bytes they cost.
    if (preserveDocstrings && text.startsWith("/**", range.pos)) continue;
    result = result.slice(0, range.pos) + result.slice(range.end);
  }
  return result;
}

export function stripCode(
  text: string,
  language: CodeLanguage = "unknown",
  options: CodeStripperOptions = {}
): {
  text: string;
  strippedLines: number;
  language: CodeLanguage;
} {
  const resolvedLanguage = language === "unknown" ? detectCodeLanguage(text) : language;
  const opts: Required<CodeStripperOptions> = {
    // Opt-in (default false): historically this flag was read but never applied,
    // so the effective behaviour was "preserve". Keeping the default at preserve
    // avoids a silent production change; callers opt in with removeComments:true.
    removeComments: options.removeComments === true,
    removeEmptyLines: options.removeEmptyLines !== false,
    collapseWhitespace: options.collapseWhitespace !== false,
    preserveDocstrings: options.preserveDocstrings === true,
  };
  const originalLines = text.split(/\r?\n/).length;
  let result = text;

  if (
    opts.removeComments &&
    (resolvedLanguage === "javascript" || resolvedLanguage === "typescript")
  ) {
    result = stripJsTsComments(result, opts.preserveDocstrings);
  }

  if (opts.removeEmptyLines) result = result.replace(/^\s*$(?:\r?\n)?/gm, "");
  if (opts.collapseWhitespace) {
    result = result
      .split(/\r?\n/)
      .map((line) => line.replace(/[ \t]+$/g, ""))
      .join("\n");
  }

  result = result.replace(/^\s*\n/, "").replace(/\n\s*$/, "");
  const strippedLines = Math.max(0, originalLines - (result ? result.split(/\r?\n/).length : 0));
  return { text: result, strippedLines, language: resolvedLanguage };
}
