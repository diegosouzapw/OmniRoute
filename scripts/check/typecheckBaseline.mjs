// Shared parsing and frozen-baseline comparison for the scoped TypeScript gates.

const TSC_ERROR_LINE = /^(.+?)\((\d+),(\d+)\): error (TS\d+):/;
const TS_CODE = /^TS\d+$/;
const UNSAFE_PROPERTY_KEYS = new Set(["__proto__", "constructor", "prototype"]);

function isPlainObject(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function normalizeDiagnosticCounts(value, label) {
  if (!isPlainObject(value)) {
    throw new TypeError(`${label} must be a plain object`);
  }

  const normalized = Object.create(null);
  for (const [file, codes] of Object.entries(value)) {
    if (UNSAFE_PROPERTY_KEYS.has(file)) {
      throw new TypeError(`${label} contains unsupported property key "${file}"`);
    }
    if (file.startsWith("_")) continue;
    if (!isPlainObject(codes)) {
      throw new TypeError(`${label} entry "${file}" must be a plain object`);
    }

    const normalizedCodes = Object.create(null);
    for (const [code, count] of Object.entries(codes)) {
      if (!TS_CODE.test(code)) {
        throw new TypeError(`${label} entry "${file}" has invalid TypeScript code "${code}"`);
      }
      if (!Number.isFinite(count) || !Number.isInteger(count) || count < 0) {
        throw new TypeError(
          `${label} entry "${file}" code "${code}" must be a finite nonnegative integer`
        );
      }
      normalizedCodes[code] = count;
    }
    normalized[file] = normalizedCodes;
  }
  return normalized;
}

/** Parse `tsc --pretty false` output into per-file/per-code diagnostic counts. */
export function parseTscOutput(raw) {
  const counts = {};
  for (const line of String(raw).split("\n")) {
    const match = TSC_ERROR_LINE.exec(line);
    if (!match) continue;
    const [, file, , , code] = match;
    if (!counts[file]) counts[file] = {};
    counts[file][code] = (counts[file][code] || 0) + 1;
  }
  return counts;
}

/**
 * Compare live diagnostic counts with a frozen baseline.
 *
 * Underscore-prefixed top-level keys are reserved for baseline metadata and
 * never participate in the diagnostic comparison.
 */
export function diffAgainstBaseline(live, baseline) {
  const liveCounts = normalizeDiagnosticCounts(live, "live diagnostics");
  const baselineCounts = normalizeDiagnosticCounts(baseline, "typecheck baseline");
  const regressions = [];
  const improvements = [];

  for (const [file, codes] of Object.entries(liveCounts)) {
    for (const [code, liveCount] of Object.entries(codes)) {
      const baselineCount = baselineCounts[file]?.[code] ?? 0;
      if (liveCount > baselineCount) {
        regressions.push({ file, code, liveCount, baselineCount });
      } else if (liveCount < baselineCount) {
        improvements.push({ file, code, liveCount, baselineCount });
      }
    }
  }

  for (const [file, codes] of Object.entries(baselineCounts)) {
    for (const [code, baselineCount] of Object.entries(codes)) {
      const liveCodes = liveCounts[file];
      if (!Object.hasOwn(liveCodes ?? {}, code) && baselineCount > 0) {
        improvements.push({ file, code, liveCount: 0, baselineCount });
      }
    }
  }

  return { regressions, improvements };
}
