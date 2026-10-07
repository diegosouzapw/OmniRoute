const CLOSE_RE =
  /gh issue close\b|issues\.update\b|state=closed/g;

const KEYWORD_RE = new RegExp(
  String.raw`\b(?:fix(?:es|ed)?|close[sd]?|resolve[sd]?)\s+#(\d+)\b`,
  "i"
);

export function findTrackerCloses(workflowText) {
  const hits = [];
  const lines = String(workflowText ?? "").split(/\n/);
  for (let i = 0; i < lines.length; i++) {
    CLOSE_RE.lastIndex = 0;
    if (CLOSE_RE.test(lines[i])) {
      hits.push({ line: i + 1, text: lines[i].trim() });
    }
    CLOSE_RE.lastIndex = 0;
  }
  return hits;
}

export function closingKeywordInBody(body, tracker = 12732) {
  const re = new RegExp(KEYWORD_RE.source, KEYWORD_RE.flags.includes("g") ? KEYWORD_RE.flags : `${KEYWORD_RE.flags}g`);
  const text = String(body ?? "");
  let m;
  while ((m = re.exec(text)) !== null) {
    if (Number(m[1]) === Number(tracker)) return true;
  }
  return false;
}
