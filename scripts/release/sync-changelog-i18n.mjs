import fs from "node:fs";
import path from "node:path";

function sectionRange(text, ver, nextVer) {
  const lines = text.split("\n");
  const start = lines.findIndex((l) => l.startsWith(`## [${ver}]`));
  if (start < 0) return null;
  let end = lines.findIndex((l, i) => i > start && l.startsWith(`## [${nextVer}]`));
  if (end < 0) end = lines.length;
  return { lines, start, end };
}

// Replace the [ver] section in every docs/i18n/<loc>/CHANGELOG.md with the root one.
// If a mirror lacks the section, insert it before [nextVer]. Returns count updated.
export function syncChangelogSection(root, ver, nextVer) {
  const rootCl = fs.readFileSync(path.join(root, "CHANGELOG.md"), "utf8");
  const r = sectionRange(rootCl, ver, nextVer);
  if (!r) throw new Error(`root CHANGELOG missing [${ver}]`);
  const block = r.lines.slice(r.start, r.end).join("\n");
  const i18nDir = path.join(root, "docs/i18n");
  if (!fs.existsSync(i18nDir)) return 0;
  let n = 0;
  for (const loc of fs.readdirSync(i18nDir)) {
    const fp = path.join(i18nDir, loc, "CHANGELOG.md");
    if (!fs.existsSync(fp)) continue;
    const txt = fs.readFileSync(fp, "utf8");
    const m = sectionRange(txt, ver, nextVer);
    let next;
    if (m) {
      next =
        m.lines.slice(0, m.start).join("\n") +
        "\n" +
        block +
        "\n" +
        m.lines.slice(m.end).join("\n");
    } else {
      const idx = txt.indexOf(`## [${nextVer}]`);
      if (idx < 0) continue;
      next = txt.slice(0, idx) + block + "\n\n" + txt.slice(idx);
    }
    if (next !== txt) {
      fs.writeFileSync(fp, next);
      n++;
    }
  }
  return n;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [ver, nextVer] = process.argv.slice(2);
  if (!ver || !nextVer) {
    console.error("usage: sync-changelog-i18n.mjs <ver> <nextVer>");
    process.exit(2);
  }
  const n = syncChangelogSection(process.cwd(), ver, nextVer);
  console.log(`[sync-changelog-i18n] updated ${n} mirror(s) for [${ver}]`);
}
