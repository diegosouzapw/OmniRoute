// #5486 — Split a plain string into text + URL segments so messages that embed a
// URL (e.g. the GitLab Duo OAuth setup instructions pointing at
// https://gitlab.com/-/profile/applications) can render clickable links instead of
// dead red text in the OAuth error step. Pure (no React) so it is unit-testable.
//
// The matcher is a single unbounded repetition over a NEGATED character class
// (`[^\s...]+`) — linear time, no catastrophic backtracking (ReDoS-safe per the
// bounded-regex rule). A trailing sentence punctuation char is peeled back out of
// the URL so "…restart." keeps its period as text and the link stays valid.

export type TextSegment = { text: string; href?: string };

const URL_RE = /https?:\/\/[^\s"'<>)]+/g;

export function linkifyText(input: string): TextSegment[] {
  if (!input) return [];
  const segments: TextSegment[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  URL_RE.lastIndex = 0;
  while ((match = URL_RE.exec(input)) !== null) {
    if (match.index > last) {
      segments.push({ text: input.slice(last, match.index) });
    }
    let url = match[0];
    let trailing = "";
    while (url.length > 0 && /[.,;:!?]$/.test(url)) {
      trailing = url.slice(-1) + trailing;
      url = url.slice(0, -1);
    }
    segments.push({ text: url, href: url });
    if (trailing) segments.push({ text: trailing });
    last = match.index + match[0].length;
  }
  if (last < input.length) segments.push({ text: input.slice(last) });
  return segments;
}
