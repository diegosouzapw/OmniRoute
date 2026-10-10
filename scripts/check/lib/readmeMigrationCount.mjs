import fs from "node:fs";
import path from "node:path";
import { parseFragment } from "parse5";

function normalizeDigits(value) {
  return value.replace(/[٠-٩۰-۹]/g, (digit) => String(digit.charCodeAt(0) % 16));
}

function readTextContent(node) {
  if (node.nodeName === "#text") return node.value;
  return (node.childNodes ?? []).map(readTextContent).join("");
}

function validateReadmeMigrationCount(content, expected) {
  const rows = [...content.matchAll(/<tr\b[^>]*>[\s\S]*?<\/tr>/g)].filter(([row]) =>
    row.includes("better-sqlite3")
  );
  if (rows.length !== 1) {
    return { ok: false, detail: "expected one translated database table row" };
  }
  // All README translations retain this table's stable product names and em dash.
  // The prose after it has exactly two counts: domain modules, then migrations.
  // Wording and numeral placement within each phrase vary across languages.
  const tail = rows[0][0].match(/—([\s\S]*?)<\/td>/)?.[1] ?? "";
  const counts = normalizeDigits(readTextContent(parseFragment(tail))).match(/\d+/g) ?? [];
  if (counts.length !== 2) {
    return { ok: false, detail: "expected module and migration counts in database row" };
  }
  const found = Number(counts[1]);
  return {
    ok: found === expected,
    detail: `translated database row: ${found} migrations; SQL files: ${expected}`,
  };
}

export function buildReadmeMigrationChecks(root, actual) {
  const config = JSON.parse(fs.readFileSync(path.join(root, "config/i18n.json"), "utf8"));
  return [
    {
      label: "DB migrations count (README mirrors)",
      actual,
      docKey: "migrations",
      strict: true,
      files: config.locales
        .filter(({ code }) => code !== "en")
        .map(({ code }) => `docs/i18n/${code}/README.md`),
      validate: (content) => validateReadmeMigrationCount(content, actual),
    },
  ];
}
