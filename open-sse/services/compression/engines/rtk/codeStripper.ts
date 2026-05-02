const COMMENT_PATTERNS: Record<string, RegExp[]> = {
  javascript: [/^\s*\/\/.*$/gm, /\/\*[\s\S]*?\*\//g],
  typescript: [/^\s*\/\/.*$/gm, /\/\*[\s\S]*?\*\//g],
  python: [/^\s*#.*$/gm],
  shell: [/^\s*#.*$/gm],
  go: [/^\s*\/\/.*$/gm, /\/\*[\s\S]*?\*\//g],
  java: [/^\s*\/\/.*$/gm, /\/\*[\s\S]*?\*\//g],
};

export function stripCodeComments(
  text: string,
  language = "typescript"
): {
  text: string;
  stripped: boolean;
} {
  const patterns = COMMENT_PATTERNS[language] ?? COMMENT_PATTERNS.typescript;
  let result = text;
  for (const pattern of patterns) {
    result = result.replace(pattern, "");
  }
  result = result.replace(/\n{3,}/g, "\n\n").trim();
  return { text: result, stripped: result !== text };
}
