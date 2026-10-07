import path from "node:path";

export const GITHUB_REPO_BLOB_URL = "https://github.com/diegosouzapw/OmniRoute/blob/main";

/**
 * Resolves a doc link (e.g. `../routing/AUTO-COMBO.md#14-factors`, `./RESILIENCE_GUIDE.md`,
 * or `../../src/lib/db/core.ts`) into a proper Next.js Fumadocs route path or GitHub blob URL.
 *
 * - Relative doc links within `docs/` -> `/docs/<section>/<slug>[#anchor]`
 * - Root-level doc paths (`/docs/...` or `docs/...`) -> `/docs/<section>/<slug>[#anchor]`
 * - Links to repository source code or root files outside `docs/` -> GitHub blob URL
 * - Pure anchor links (`#section`) and external links (`https://...`) -> untouched
 */
export function resolveDocHref(href: string, currentDocRelPath: string = ""): string {
  if (!href || /^(?:https?:|mailto:|#)/i.test(href)) {
    return href;
  }

  const [rawPath, anchor] = href.includes("#")
    ? [href.slice(0, href.indexOf("#")), href.slice(href.indexOf("#") + 1)]
    : [href, ""];
  const anchorSuffix = anchor ? `#${anchor}` : "";

  if (!rawPath) {
    return href;
  }

  // Absolute /docs/... or docs/... links
  if (/^\/?docs\//i.test(rawPath)) {
    const cleaned = rawPath.replace(/^\/?docs\//i, "");
    if (cleaned.toLowerCase().endsWith(".md")) {
      return `/docs/${cleaned.slice(0, -3)}${anchorSuffix}`;
    }
    return `/docs/${cleaned}${anchorSuffix}`;
  }

  // Relative links starting with ./ or ../
  if (rawPath.startsWith("./") || rawPath.startsWith("../")) {
    const currentDir = currentDocRelPath ? path.dirname(currentDocRelPath) : "";
    const resolvedInDocs = path.normalize(path.join(currentDir, rawPath)).replace(/\\/g, "/");

    // If the path escapes the docs/ tree into repo root (e.g. ../../src/... or ../../package.json)
    if (resolvedInDocs.startsWith("../") || resolvedInDocs === "..") {
      const repoRel = path.normalize(path.join("docs", currentDir, rawPath)).replace(/\\/g, "/");
      return `${GITHUB_REPO_BLOB_URL}/${repoRel}${anchorSuffix}`;
    }

    // Inside docs/ ending with .md -> strip .md to form Fumadocs route slug
    if (resolvedInDocs.toLowerCase().endsWith(".md")) {
      return `/docs/${resolvedInDocs.slice(0, -3)}${anchorSuffix}`;
    }

    // Static asset inside docs/ (e.g. diagrams/exported/foo.svg)
    if (/\.(?:png|jpe?g|gif|svg|webp|json|yaml|yml|ts|js|mjs)$/i.test(resolvedInDocs)) {
      return `${GITHUB_REPO_BLOB_URL}/docs/${resolvedInDocs}${anchorSuffix}`;
    }

    return `/docs/${resolvedInDocs}${anchorSuffix}`;
  }

  // Relative doc path without leading dots, e.g. "routing/AUTO-COMBO.md"
  if (rawPath.toLowerCase().endsWith(".md")) {
    return `/docs/${rawPath.slice(0, -3)}${anchorSuffix}`;
  }

  return href;
}

/**
 * Normalizes all relative markdown links in a raw markdown string for HTML/i18n rendering.
 */
export function normalizeDocsMarkdownLinks(
  markdown: string,
  currentDocRelPath: string = ""
): string {
  if (!markdown) return markdown;

  let out = markdown;

  // 1. Inline links: [text](url "title"?)
  out = out.replace(
    /(^|[^!])\[([^\]]*)\]\(([^)\s]+)(\s+["'][^"']*["'])?\)/g,
    (_match, lead, text, href, title) => {
      const newHref = resolveDocHref(href, currentDocRelPath);
      return `${lead}[${text}](${newHref}${title || ""})`;
    }
  );

  // 2. Reference links: ^[label]: href "title"?
  out = out.replace(
    /^\[([^\]]+)\]:\s*([^\s]+)(\s+["'][^"']*["'])?$/gm,
    (_match, label, href, title) => {
      const newHref = resolveDocHref(href, currentDocRelPath);
      return `[${label}]: ${newHref}${title || ""}`;
    }
  );

  // 3. HTML anchors: <a ... href="..." ...>
  out = out.replace(
    /<a\b([^>]*\bhref=["'])([^"']+)(["'][^>]*)>/gi,
    (_match, before, href, after) => {
      const newHref = resolveDocHref(href, currentDocRelPath);
      return `<a${before}${newHref}${after}>`;
    }
  );

  return out;
}
