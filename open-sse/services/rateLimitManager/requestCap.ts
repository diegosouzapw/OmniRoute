/**
 * Parse a hard request cap out of a 429 body.
 *
 * Some providers state their ceiling in prose instead of headers, e.g.
 * TokenRouter: "You have reached the request limit: Maximum 5 requests within
 * 1 minutes". Nothing else learns that number, so the limiter keeps racing into
 * the cap. This turns the phrasing into `{ requests, windowMs }` so the
 * learned-limit path can pace dispatch below it (#13594).
 */

const UNIT_MS: Record<string, number> = {
  second: 1_000,
  sec: 1_000,
  minute: 60_000,
  min: 60_000,
  hour: 3_600_000,
  hr: 3_600_000,
};

// A cap word must come shortly before the figure so a bare usage statement
// ("you made 120 requests in 1 minute", "current usage: 4 rpm") is not read as
// a ceiling. Both patterns below share it.
const CAP_WORD_PREFIX = String.raw`\b(?:max(?:imum)?|limit(?:ed)?|allowed|up to|at most|exceed(?:ed|s)?|quota|rate)\b(?![^.\n]{0,40}\b(?:made|sent|used)\b)[^.\n]{0,40}?`;
// "Maximum 5 requests within 1 minutes", "Rate limit exceeded: 60 requests
// per minute", "limit of 10 requests per 2 minutes".
const REQUESTS_PER_WINDOW_RE = new RegExp(
  CAP_WORD_PREFIX +
    String.raw`(\d{1,7})\s+requests?\s+(?:within|per|in|every)\s+(?:(\d{1,5})\s*)?(second|sec|minute|min|hour|hr)s?\b`,
  "i"
);
// "Rate limit: 20 RPM"
const RPM_RE = new RegExp(CAP_WORD_PREFIX + String.raw`(\d{1,7})\s*rpm\b`, "i");

const MAX_TEXT_LENGTH = 4_000;
const MAX_WINDOW_MS = 24 * 3_600_000;

export interface RequestCap {
  requests: number;
  windowMs: number;
}

function bodyText(body: unknown): string {
  if (typeof body === "string") return body;
  if (body === null || body === undefined) return "";
  try {
    return JSON.stringify(body);
  } catch {
    return "";
  }
}

export function parseRequestCapFromBody(body: unknown): RequestCap | null {
  const text = bodyText(body).slice(0, MAX_TEXT_LENGTH);
  if (!text) return null;

  let requests = 0;
  let windowMs = 0;

  const perWindow = REQUESTS_PER_WINDOW_RE.exec(text);
  if (perWindow) {
    requests = Number.parseInt(perWindow[1], 10);
    const count = perWindow[2] ? Number.parseInt(perWindow[2], 10) : 1;
    windowMs = count * UNIT_MS[perWindow[3].toLowerCase()];
  } else {
    const rpm = RPM_RE.exec(text);
    if (!rpm) return null;
    requests = Number.parseInt(rpm[1], 10);
    windowMs = UNIT_MS.minute;
  }

  const cap = { requests, windowMs };
  return isValidRequestCap(cap) ? cap : null;
}

/** A cap is usable when it is a whole number of requests over 1s..24h. */
export function isValidRequestCap(cap: RequestCap): boolean {
  return (
    Number.isInteger(cap.requests) &&
    cap.requests >= 1 &&
    Number.isFinite(cap.windowMs) &&
    cap.windowMs >= 1_000 &&
    cap.windowMs <= MAX_WINDOW_MS
  );
}

export interface RequestCapSettings {
  minTime: number;
  reservoirRefreshAmount: number;
  reservoirRefreshInterval: number;
}

/**
 * Bottleneck settings that keep dispatch under a cap: a reservoir of
 * `requests` refilled every `windowMs`, spread evenly by `minTime`.
 */
export function requestCapSettings(cap: RequestCap): RequestCapSettings {
  return {
    minTime: Math.floor(cap.windowMs / cap.requests),
    reservoirRefreshAmount: cap.requests,
    reservoirRefreshInterval: cap.windowMs,
  };
}
