// Pure DeepSeek stream content/citation formatting. Verbatim from deepseek-web.ts.

export function isThinkingModel(model: string): boolean {
  const m = model.toLowerCase();
  return m.includes("think") || m.includes("r1") || m.includes("reason");
}

export function isSearchModel(model: string): boolean {
  const m = model.toLowerCase();
  return m.includes("search") || m.includes("fold");
}

export function cleanDeepSeekToken(text: string): string {
  return text.replace(/FINISHED/g, "").replace(/^(SEARCH|WEB_SEARCH|SEARCHING)\s*/i, "");
}

export function formatStreamContent(raw: string, model: string): string {
  let text = cleanDeepSeekToken(raw);
  if (!isSearchModel(model)) return text;
  if (model.toLowerCase().includes("search-silent")) {
    return text.replace(/\[citation:(\d+)\]/g, "");
  }
  return text.replace(/\[citation:(\d+)\]/g, "[$1]");
}

export interface DeepSeekSearchResult {
  cite_index?: number;
  title?: string;
  url?: string;
}

export function appendSearchCitations(
  searchResults: DeepSeekSearchResult[],
  model: string
): string {
  if (searchResults.length === 0 || model.toLowerCase().includes("search-silent")) {
    return "";
  }
  return searchResults
    .filter((r) => r.cite_index)
    .sort((a, b) => (a.cite_index || 0) - (b.cite_index || 0))
    .map((r) => `[${r.cite_index}]: [${r.title}](${r.url})`)
    .join("\n");
}
