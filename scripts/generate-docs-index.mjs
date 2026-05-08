#!/usr/bin/env node

/**
 * Build-time script: scans docs/*.md and generates
 * src/app/docs/lib/docs-auto-generated.ts with static navigation + search data.
 *
 * This file is imported by both client and server components — NO fs/path imports.
 * Run via: node scripts/generate-docs-index.mjs
 * Automatically runs as prebuild step.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOCS_DIR = path.join(ROOT, "docs");
const OUT_FILE = path.join(ROOT, "src", "app", "docs", "lib", "docs-auto-generated.ts");

const SECTION_CATEGORIES = {
  "Getting Started": [
    "SETUP_GUIDE",
    "USER_GUIDE",
    "CLI_TOOLS",
    "ARCHITECTURE",
    "QUICK_START",
    "GETTING_STARTED",
  ],
  Features: [
    "FEATURES",
    "AUTO_COMBO",
    "COMPRESSION_GUIDE",
    "RTK_COMPRESSION",
    "COMPRESSION_ENGINES",
    "COMPRESSION_RULES_FORMAT",
    "COMPRESSION_LANGUAGE_PACKS",
    "FREE_TIERS",
  ],
  "API & Protocols": ["API_REFERENCE", "MCP_SERVER", "A2A_SERVER"],
  Deployment: [
    "DOCKER_GUIDE",
    "VM_DEPLOYMENT_GUIDE",
    "FLY_IO_DEPLOYMENT_GUIDE",
    "TERMUX_GUIDE",
    "PWA_GUIDE",
  ],
  Operations: ["PROXY_GUIDE", "RESILIENCE_GUIDE", "ENVIRONMENT", "TROUBLESHOOTING"],
  Development: [
    "CODEBASE_DOCUMENTATION",
    "COVERAGE_PLAN",
    "I18N",
    "RELEASE_CHECKLIST",
    "UNINSTALL",
    "CONTRIBUTING",
    "CHANGELOG",
    "CODE_OF_CONDUCT",
  ],
};

const SECTION_ORDER = {
  "Getting Started": 1,
  Features: 2,
  "API & Protocols": 3,
  Deployment: 4,
  Operations: 5,
  Development: 6,
};

function categorizeFile(fileName) {
  const stem = fileName.replace(/\.md$/i, "").toUpperCase().replace(/-/g, "_");
  for (const [section, patterns] of Object.entries(SECTION_CATEGORIES)) {
    if (patterns.some((p) => stem === p)) {
      return section;
    }
  }
  return "Other";
}

function extractTitleFromContent(content) {
  const match = content.match(/^#\s+(.+)$/m);
  if (match) {
    return match[1]
      .replace(/^📖\s*/, "")
      .replace(/^🌐\s*/, "")
      .replace(/\s*—\s*OmniRoute\s*$/i, "")
      .replace(/\s*—\s*OmniRoute Docs\s*$/i, "")
      .trim();
  }
  return "";
}

function extractHeadings(content) {
  const headings = [];
  const regex = /^(#{2,4})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    headings.push(match[2].replace(/\*\*/g, "").replace(/\*/g, "").replace(/`/g, "").trim());
  }
  return headings.slice(0, 10);
}

function extractContentPreview(content) {
  const stripped = content
    .replace(/^---[\s\S]*?---/m, "")
    .replace(/^#{1,6}\s+.+$/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`~>#|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return stripped.slice(0, 300);
}

// ---------- Main ----------

const files = fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

const docs = [];
for (const fileName of files) {
  const filePath = path.join(DOCS_DIR, fileName);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContent);

  const slug =
    frontmatter.slug ||
    fileName
      .replace(/\.mdx?$/i, "")
      .toLowerCase()
      .replace(/_/g, "-");
  const title = frontmatter.title || extractTitleFromContent(content) || slug.replace(/-/g, " ");
  const section = frontmatter.section || categorizeFile(fileName);
  const order = frontmatter.order ?? 999;
  const headings = extractHeadings(content);
  const contentPreview = frontmatter.description || extractContentPreview(content);

  docs.push({ slug, title, fileName, section, order, content: contentPreview, headings });
}

docs.sort((a, b) => {
  const sectionA = SECTION_ORDER[a.section] ?? 99;
  const sectionB = SECTION_ORDER[b.section] ?? 99;
  if (sectionA !== sectionB) return sectionA - sectionB;
  return a.order - b.order;
});

// Build navigation sections
const sectionMap = new Map();
for (const doc of docs) {
  const items = sectionMap.get(doc.section) || [];
  items.push(doc);
  sectionMap.set(doc.section, items);
}
const orderedSections = [...new Set([...Object.keys(SECTION_ORDER), ...sectionMap.keys()])];
const navSections = orderedSections
  .filter((s) => sectionMap.has(s))
  .sort((a, b) => (SECTION_ORDER[a] ?? 99) - (SECTION_ORDER[b] ?? 99))
  .map((title) => ({
    title,
    items: sectionMap.get(title).map((doc) => ({
      slug: doc.slug,
      title: doc.title,
      fileName: doc.fileName,
    })),
  }));

// Build search index
const searchIndex = docs.map((doc) => ({
  slug: doc.slug,
  title: doc.title,
  fileName: doc.fileName,
  section: doc.section,
  content: doc.content,
  headings: doc.headings,
}));

// Add api-explorer synthetic entry if api-reference exists
if (searchIndex.some((item) => item.slug === "api-reference")) {
  if (!searchIndex.some((item) => item.slug === "api-explorer")) {
    searchIndex.push({
      slug: "api-explorer",
      title: "API Explorer",
      fileName: "API_REFERENCE.md",
      section: "API & Protocols",
      content: "interactive try it live api explorer endpoint test request response curl example",
      headings: ["Try It", "Endpoints"],
    });
  }
}

// ---------- Write output ----------

const output = `// AUTO-GENERATED by scripts/generate-docs-index.mjs — DO NOT EDIT MANUALLY
// Regenerate with: node scripts/generate-docs-index.mjs

export interface AutoGenDocItem {
  slug: string;
  title: string;
  fileName: string;
}

export interface AutoGenNavSection {
  title: string;
  items: AutoGenDocItem[];
}

export interface AutoGenSearchItem {
  slug: string;
  title: string;
  fileName: string;
  section: string;
  content: string;
  headings: string[];
}

export const autoNavSections: AutoGenNavSection[] = ${JSON.stringify(navSections, null, 2)};

export const autoSearchIndex: AutoGenSearchItem[] = ${JSON.stringify(searchIndex, null, 2)};

export const autoAllSlugs: string[] = ${JSON.stringify(
  docs.map((d) => d.slug),
  null,
  2
)};
`;

fs.writeFileSync(OUT_FILE, output, "utf8");
console.log(`✅ Generated ${OUT_FILE} with ${docs.length} docs, ${navSections.length} sections`);
