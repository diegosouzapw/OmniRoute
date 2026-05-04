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

function removeSlashComments(text: string): string {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/\s+\/\/\s.*$/gm, "");
}

function removeHashComments(text: string): string {
  return text.replace(/^\s*#.*$/gm, "").replace(/\s+#\s.*$/gm, "");
}

function stripByLanguage(
  text: string,
  language: CodeLanguage,
  options: Required<CodeStripperOptions>
): string {
  if (!options.removeComments) return text;

  if (language === "javascript" || language === "typescript" || language === "rust") {
    return removeSlashComments(text);
  }
  if (language === "go" || language === "java") return removeSlashComments(text);
  if (language === "python") {
    const withoutDocstrings = options.preserveDocstrings
      ? text
      : text.replace(/("""[\s\S]*?"""|'''[\s\S]*?''')/g, "");
    return removeHashComments(withoutDocstrings);
  }
  if (language === "ruby") {
    return removeHashComments(text.replace(/^=begin[\s\S]*?^=end/gm, ""));
  }
  return text;
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
    removeComments: options.removeComments !== false,
    removeEmptyLines: options.removeEmptyLines !== false,
    collapseWhitespace: options.collapseWhitespace !== false,
    preserveDocstrings: options.preserveDocstrings === true,
  };
  const originalLines = text.split(/\r?\n/).length;
  let result = stripByLanguage(text, resolvedLanguage, opts);

  if (opts.removeEmptyLines) result = result.replace(/^\s*$(?:\r?\n)?/gm, "");
  if (opts.collapseWhitespace) {
    result = result
      .split(/\r?\n/)
      .map((line) => line.replace(/[ \t]+$/g, ""))
      .join("\n");
  }

  result = result.trim();
  const strippedLines = Math.max(0, originalLines - (result ? result.split(/\r?\n/).length : 0));
  return { text: result, strippedLines, language: resolvedLanguage };
}

export function stripCodeComments(
  text: string,
  language = "typescript"
): {
  text: string;
  stripped: boolean;
} {
  const result = stripCode(text, normalizeCodeLanguage(language));
  return { text: result.text, stripped: result.strippedLines > 0 || result.text !== text };
}
