/**
 * Minimal YAML frontmatter reader/writer for idea files.
 * Supports: scalars (string/number/bool), nested object (one level), inline arrays [a, b].
 * Not a general YAML lib — kept simple intentionally.
 */

const DELIM = "---";

function parseScalar(raw) {
  const s = raw.trim();
  if (s === "true") return true;
  if (s === "false") return false;
  if (s === "null") return null;
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
  if (s.startsWith("[") && s.endsWith("]")) {
    const inner = s.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(",").map((x) => parseScalar(x.trim()));
  }
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

export function parseFrontmatter(text) {
  if (typeof text !== "string") return null;
  if (!text.startsWith(`${DELIM}\n`)) return null;
  const rest = text.slice(DELIM.length + 1);
  const closeIdx = rest.indexOf(`\n${DELIM}`);
  if (closeIdx < 0) return null;
  const body = rest.slice(0, closeIdx);

  const out = {};
  let currentNested = null;

  for (const line of body.split("\n")) {
    if (!line.trim()) continue;
    if (line.startsWith("  ") && currentNested) {
      const m = line.match(/^\s{2}([\w_-]+):\s*(.*)$/);
      if (m) currentNested[m[1]] = parseScalar(m[2]);
      continue;
    }
    const m = line.match(/^([\w_-]+):\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    const val = m[2];
    if (val === "") {
      currentNested = {};
      out[key] = currentNested;
    } else {
      currentNested = null;
      out[key] = parseScalar(val);
    }
  }
  return out;
}

function serializeScalar(v) {
  if (v === null) return "null";
  if (typeof v === "boolean") return String(v);
  if (typeof v === "number") return String(v);
  if (Array.isArray(v)) return `[${v.map(serializeScalar).join(", ")}]`;
  return String(v);
}

export function serializeFrontmatter(meta, body) {
  const lines = [DELIM];
  for (const [k, v] of Object.entries(meta)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      lines.push(`${k}:`);
      for (const [nk, nv] of Object.entries(v)) {
        lines.push(`  ${nk}: ${serializeScalar(nv)}`);
      }
    } else {
      lines.push(`${k}: ${serializeScalar(v)}`);
    }
  }
  lines.push(DELIM, "", body);
  return lines.join("\n");
}

export function stripFrontmatter(text) {
  if (typeof text !== "string") return text;
  if (!text.startsWith(`${DELIM}\n`)) return text;
  const rest = text.slice(DELIM.length + 1);
  const closeIdx = rest.indexOf(`\n${DELIM}`);
  if (closeIdx < 0) return text;
  return rest.slice(closeIdx + DELIM.length + 1).replace(/^\n+/, "");
}
