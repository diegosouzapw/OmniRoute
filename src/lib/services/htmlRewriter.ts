/**
 * HTML rewriter for the embedded-service reverse proxy.
 *
 * Rewrites an HTML document so that absolute-path URLs point through the
 * OmniRoute proxy prefix instead of directly to the embedded service's port.
 *
 * What it does:
 *   - Inserts `<base href="${publicPrefix}/">` as the first child of `<head>`.
 *   - Rewrites path-absolute URLs (starting with `/` but NOT `//`) in selected
 *     attributes: <a href>, <link href>, <script src>, <img src/srcset>,
 *     <form action>, <iframe src>, <source src/srcset>.
 *
 * What it does NOT do (known v1 limitations):
 *   - CSS `url(...)` rewriting (too complex, CSS parser not included).
 *   - JS `window.location` rewriting (client-side navigation may break).
 *   - Multi-URL `srcset` values (comma-separated) — skipped when a comma
 *     is detected.
 */

import { parse, serialize } from "parse5";
import type { DefaultTreeAdapterMap } from "parse5";

type Document = DefaultTreeAdapterMap["document"];
type Element = DefaultTreeAdapterMap["element"];
type Node = DefaultTreeAdapterMap["node"];
type Attr = { name: string; value: string; namespace?: string; prefix?: string };

// Matches /foo but not //foo, http://, https://, mailto:, javascript:, #, etc.
const ABS_PATH_RE = /^\/(?!\/)/;

// Schemes that should NOT be rewritten — leave them as-is.
const SKIP_SCHEMES = ["http:", "https:", "mailto:", "javascript:", "data:", "blob:", "ftp:"];

const REWRITABLE_ATTRS: Record<string, string[]> = {
  a: ["href"],
  link: ["href"],
  script: ["src"],
  img: ["src", "srcset"],
  form: ["action"],
  iframe: ["src"],
  source: ["src", "srcset"],
};

/**
 * Rewrite an HTML string so all path-absolute URLs are prefixed with
 * `publicPrefix`, and a `<base href>` is injected into `<head>`.
 *
 * @param html         Raw HTML from the upstream service.
 * @param publicPrefix The proxy prefix path (e.g. "/dashboard/providers/services/9router/embed").
 *                     Trailing slash is stripped internally.
 */
export function rewriteHtml(html: string, publicPrefix: string): string {
  const prefix = publicPrefix.endsWith("/") ? publicPrefix.slice(0, -1) : publicPrefix;

  const doc = parse(html) as Document;

  const headEl = findOrCreateHead(doc);
  injectBase(headEl, `${prefix}/`);
  visitNode(doc, prefix);

  return serialize(doc);
}

// ─── private helpers ─────────────────────────────────────────────────────────

/**
 * Find the <head> element in the document. parse5 always produces a full tree
 * (html → head + body) even for partial HTML, so this should always succeed.
 * Falls back to creating a minimal <head> if somehow absent.
 */
function findOrCreateHead(doc: Document): Element {
  for (const child of doc.childNodes) {
    if (isElement(child) && child.tagName === "html") {
      for (const htmlChild of child.childNodes) {
        if (isElement(htmlChild) && htmlChild.tagName === "head") {
          return htmlChild;
        }
      }
      // <head> missing inside <html> — create one and prepend
      const head = makeElement("head");
      child.childNodes.unshift(head);
      (head as Element & { parentNode: Node }).parentNode = child;
      return head;
    }
  }

  // Completely bare fragment — unlikely from parse5, but be safe.
  // Find/create <html> too.
  const htmlEl = makeElement("html");
  const head = makeElement("head");
  head.childNodes = [];
  (head as Element & { parentNode: Node }).parentNode = htmlEl;
  htmlEl.childNodes = [head as Node];
  (htmlEl as Element & { parentNode: Node }).parentNode = doc as unknown as Node;
  doc.childNodes.push(htmlEl as unknown as Node);
  return head;
}

/**
 * Prepend `<base href="...">` to `<head>`, but only if one doesn't already
 * exist (avoid double-inject on re-proxied pages).
 */
function injectBase(head: Element, baseHref: string): void {
  // If a <base> already exists, update its href and exit.
  for (const child of head.childNodes) {
    if (isElement(child) && child.tagName === "base") {
      const hrefAttr = child.attrs.find((a) => a.name === "href");
      if (hrefAttr) {
        hrefAttr.value = baseHref;
      } else {
        child.attrs.push({ name: "href", value: baseHref });
      }
      return;
    }
  }

  // No <base> found — create one and prepend.
  const baseEl = makeElement("base");
  baseEl.attrs = [{ name: "href", value: baseHref }];
  baseEl.childNodes = [];
  (baseEl as Element & { parentNode: Node }).parentNode = head;
  head.childNodes.unshift(baseEl as unknown as Node);
}

/** Recursively walk the parse5 tree and rewrite matching attrs. */
function visitNode(node: Node, prefix: string): void {
  if (isElement(node)) {
    const tag = node.tagName.toLowerCase();
    const rewritable = REWRITABLE_ATTRS[tag];
    if (rewritable) {
      for (const attr of node.attrs as Attr[]) {
        if (rewritable.includes(attr.name)) {
          attr.value = rewriteUrl(attr.value, prefix);
        }
      }
    }
  }

  const children = (node as { childNodes?: Node[] }).childNodes;
  if (children) {
    for (const child of children) {
      visitNode(child, prefix);
    }
  }
}

/**
 * Rewrite a single URL value:
 * - Path-absolute URLs starting with `/` (but not `//`) → prefix + url
 * - All other values (relative, external, mailto:, srcset with commas) → unchanged
 */
function rewriteUrl(value: string, prefix: string): string {
  const trimmed = value.trim();
  if (!trimmed) return value;

  // Skip multi-URL srcset (contains comma + space pattern) — too complex for v1
  if (trimmed.includes(",")) return value;

  // Skip known schemes
  for (const scheme of SKIP_SCHEMES) {
    if (trimmed.toLowerCase().startsWith(scheme)) return value;
  }

  // Rewrite path-absolute URLs only
  if (ABS_PATH_RE.test(trimmed)) {
    return `${prefix}${trimmed}`;
  }

  return value;
}

function isElement(node: Node): node is Element {
  return (node as Element).attrs !== undefined && (node as Element).tagName !== undefined;
}

function makeElement(tag: string): Element {
  return {
    nodeName: tag,
    tagName: tag,
    attrs: [],
    namespaceURI: "http://www.w3.org/1999/xhtml",
    childNodes: [],
    parentNode: null as unknown as Node,
  } as unknown as Element;
}
