#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const toolRevision = execFileSync("git", ["rev-parse", "HEAD"], {
  cwd: root,
  encoding: "utf8",
}).trim();

const sourceRoots = ["src/", "open-sse/", "electron/", "bin/"];
try {
  execFileSync("git", ["diff", "--quiet", "HEAD", "--", ...sourceRoots], {
    cwd: root,
    stdio: "ignore",
  });
} catch {
  throw new Error(
    "Refusing to audit: tracked files in the configured source roots differ from HEAD. Commit or restore them first."
  );
}

const trackedFiles = execFileSync("git", ["ls-files", "-z"], {
  cwd: root,
  encoding: "utf8",
})
  .split("\0")
  .filter(Boolean);

const sourceExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".cjs"]);
const isTestFile = (file) =>
  file.includes("/__tests__/") || /\.(?:test|spec)\.[cm]?[jt]sx?$/.test(file);
const sourceFiles = trackedFiles.filter(
  (file) =>
    sourceRoots.some((prefix) => file.startsWith(prefix)) &&
    sourceExtensions.has(path.extname(file)) &&
    !isTestFile(file)
);
const migrationFiles = trackedFiles.filter(
  (file) => file.startsWith("src/lib/db/migrations/") && file.endsWith(".sql")
);
const scannedFiles = [...sourceFiles, ...migrationFiles];
const contents = new Map(
  scannedFiles.map((file) => [file, readFileSync(path.join(root, file), "utf8")])
);
const corpusSha256 = createHash("sha256")
  .update(
    scannedFiles
      .sort()
      .map((file) => `${file}\0${contents.get(file)}\0`)
      .join("")
  )
  .digest("hex");

function countMatches(text, regex) {
  return [
    ...text.matchAll(
      new RegExp(regex.source, regex.flags.includes("g") ? regex.flags : `${regex.flags}g`)
    ),
  ].length;
}

function maskCommentsAndLiterals(text) {
  const output = [...text];
  let state = "code";

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (state === "code") {
      if (char === "/" && next === "/") {
        output[index] = output[index + 1] = " ";
        index += 1;
        state = "line-comment";
      } else if (char === "/" && next === "*") {
        output[index] = output[index + 1] = " ";
        index += 1;
        state = "block-comment";
      } else if (char === "'") {
        output[index] = " ";
        state = "single-quote";
      } else if (char === '"') {
        output[index] = " ";
        state = "double-quote";
      } else if (char === "`") {
        output[index] = " ";
        state = "template";
      }
      continue;
    }

    if (char !== "\n" && char !== "\r") output[index] = " ";
    if (state === "line-comment" && (char === "\n" || char === "\r")) state = "code";
    if (state === "block-comment" && char === "*" && next === "/") {
      output[index + 1] = " ";
      index += 1;
      state = "code";
    } else if (state === "single-quote" && char === "\\") {
      if (index + 1 < text.length) output[index + 1] = " ";
      index += 1;
    } else if (state === "single-quote" && char === "'") {
      state = "code";
    } else if (state === "double-quote" && char === "\\") {
      if (index + 1 < text.length) output[index + 1] = " ";
      index += 1;
    } else if (state === "double-quote" && char === '"') {
      state = "code";
    } else if (state === "template" && char === "\\") {
      if (index + 1 < text.length) output[index + 1] = " ";
      index += 1;
    } else if (state === "template" && char === "`") {
      state = "code";
    }
  }

  return output.join("");
}

const codeContents = new Map(
  sourceFiles.map((file) => [file, maskCommentsAndLiterals(contents.get(file) ?? "")])
);

function collect(regex, files = sourceFiles, source = codeContents) {
  const matches = [];
  let occurrences = 0;
  for (const file of files) {
    const count = countMatches(source.get(file) ?? "", regex);
    if (count === 0) continue;
    occurrences += count;
    matches.push({ file, occurrences: count });
  }
  matches.sort(
    (left, right) => right.occurrences - left.occurrences || left.file.localeCompare(right.file)
  );
  return { occurrences, files: matches.length, matches };
}

function splitDbLayer(result) {
  const inside = result.matches.filter((entry) => entry.file.startsWith("src/lib/db/"));
  const outside = result.matches.filter((entry) => !entry.file.startsWith("src/lib/db/"));
  return {
    total: { occurrences: result.occurrences, files: result.files, matches: result.matches },
    insideDbLayer: {
      occurrences: inside.reduce((sum, entry) => sum + entry.occurrences, 0),
      files: inside.length,
      matches: inside,
    },
    outsideDbLayer: {
      occurrences: outside.reduce((sum, entry) => sum + entry.occurrences, 0),
      files: outside.length,
      matches: outside,
    },
  };
}

const adapterSurfacePatterns = {
  prepare: /\.prepare(?:<[^>]+>)?\s*\(/g,
  transaction: /\.transaction\s*\(/g,
  immediate: /\.immediate\s*\(/g,
  pragma: /\.pragma\s*\(/g,
  backup: /\.backup\s*\(/g,
  checkpoint: /\.checkpoint\s*\(/g,
  lastInsertRowid: /\blastInsertRowid\b/g,
};

const sqliteDialectPatterns = {
  pragma: /\bPRAGMA\b/gi,
  sqliteMaster: /\bsqlite_master\b/gi,
  beginImmediate: /\bBEGIN\s+IMMEDIATE\b/gi,
  insertOrReplace: /\bINSERT\s+OR\s+REPLACE\b/gi,
  autoincrement: /\bAUTOINCREMENT\b/gi,
  datetimeNow: /datetime\s*\(\s*['"]now['"]\s*\)/gi,
  vacuum: /\bVACUUM\b/gi,
  walCheckpoint: /\bwal_checkpoint\b/gi,
  fts5: /\bfts5\b/gi,
  vec0: /\bvec0\b/gi,
  lastInsertRowidFunction: /\blast_insert_rowid\s*\(/gi,
};

const adapterSurface = Object.fromEntries(
  Object.entries(adapterSurfacePatterns).map(([name, regex]) => [
    name,
    splitDbLayer(collect(regex)),
  ])
);
const sqliteDialect = Object.fromEntries(
  Object.entries(sqliteDialectPatterns).map(([name, regex]) => [
    name,
    collect(regex, scannedFiles, contents),
  ])
);

const directCoreConsumers = collect(/\bgetDbInstance\s*\(/g).matches.filter(
  (entry) => !entry.file.startsWith("src/lib/db/")
);
const localDbImportConsumers = sourceFiles
  .filter((file) =>
    /(?:from|import\s*\()\s*["'][^"']*(?:\/lib\/localDb|\.\/localDb)["']/.test(
      contents.get(file) ?? ""
    )
  )
  .sort();
const sqliteAdapterTypeConsumers = sourceFiles
  .filter(
    (file) =>
      !file.startsWith("src/lib/db/") && /\bSqliteAdapter\b/.test(codeContents.get(file) ?? "")
  )
  .sort();

const inventory = {
  toolRevision,
  corpusSha256,
  scope: {
    sourceRoots,
    sourceFiles: sourceFiles.length,
    migrationFiles: migrationFiles.length,
    exclusions: [
      "tests/",
      "co-located __tests__ directories",
      "*.test.* and *.spec.* source files",
      "paths outside the configured source roots (including docs/ and scripts/)",
    ],
  },
  boundaries: {
    directGetDbInstanceOutsideDbLayer: {
      files: directCoreConsumers.length,
      occurrences: directCoreConsumers.reduce((sum, entry) => sum + entry.occurrences, 0),
      matches: directCoreConsumers,
    },
    localDbImportConsumers: {
      files: localDbImportConsumers.length,
      paths: localDbImportConsumers,
    },
    sqliteAdapterTypeConsumersOutsideDbLayer: {
      files: sqliteAdapterTypeConsumers.length,
      paths: sqliteAdapterTypeConsumers,
    },
  },
  adapterSurface,
  sqliteDialect,
};

function markdownTable(rows) {
  return [
    "| Signal | Occurrences | Files | Outside `src/lib/db/` occurrences | Outside files |",
    "| --- | ---: | ---: | ---: | ---: |",
    ...rows.map(
      ([name, value]) =>
        `| \`${name}\` | ${value.total.occurrences} | ${value.total.files} | ${value.outsideDbLayer.occurrences} | ${value.outsideDbLayer.files} |`
    ),
  ].join("\n");
}

function renderTopMatches(matches, limit = 12) {
  if (matches.length === 0) return "- None";
  return matches
    .slice(0, limit)
    .map((entry) => `- \`${entry.file}\`: ${entry.occurrences}`)
    .join("\n");
}

function renderMarkdown() {
  const dialectRows = Object.entries(inventory.sqliteDialect).map(
    ([name, value]) => `| \`${name}\` | ${value.occurrences} | ${value.files} |`
  );
  return `# SQLite coupling audit output\n\n- Audit-tool revision: \`${inventory.toolRevision}\`\n- Scanned-corpus SHA-256: \`${inventory.corpusSha256}\`\n- Tracked non-test source files scanned: ${inventory.scope.sourceFiles}\n- Migration SQL files scanned: ${inventory.scope.migrationFiles}\n\n## Boundary signals\n\n- Direct \`getDbInstance()\` call syntax outside comments and literals, excluding \`src/lib/db/\`: ${inventory.boundaries.directGetDbInstanceOutsideDbLayer.files} files / ${inventory.boundaries.directGetDbInstanceOutsideDbLayer.occurrences} occurrences\n- \`@/lib/localDb\` or relative \`localDb\` import consumers: ${inventory.boundaries.localDbImportConsumers.files} files\n- \`SqliteAdapter\` type consumers outside comments and literals, excluding \`src/lib/db/\`: ${inventory.boundaries.sqliteAdapterTypeConsumersOutsideDbLayer.files} files\n\n## Adapter-shaped call syntax\n\n${markdownTable(Object.entries(inventory.adapterSurface))}\n\n## SQLite dialect and lifecycle text\n\n| Signal | Occurrences | Files |\n| --- | ---: | ---: |\n${dialectRows.join("\n")}\n\n## Top direct \`getDbInstance()\` consumers outside the DB layer\n\n${renderTopMatches(inventory.boundaries.directGetDbInstanceOutsideDbLayer.matches)}\n\n## Top \`.prepare()\` files outside the DB layer\n\n${renderTopMatches(inventory.adapterSurface.prepare.outsideDbLayer.matches)}\n`;
}

if (process.argv.includes("--json")) {
  process.stdout.write(`${JSON.stringify(inventory, null, 2)}\n`);
} else {
  process.stdout.write(renderMarkdown());
}
