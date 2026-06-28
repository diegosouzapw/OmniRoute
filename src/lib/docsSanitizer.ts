import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

type Sanitizer = ReturnType<typeof createDOMPurify>;

let sanitizer: Sanitizer | null = null;

// Curated allowlist for HTML rendered from trusted-repo markdown (marked output).
// Explicit ALLOWED_TAGS/ATTR (no USE_PROFILES — when USE_PROFILES is set DOMPurify
// ignores ALLOWED_TAGS entirely) so the surviving tag set is deterministic and
// reviewable. Covers GFM output: headings, lists, tables, code, images, GFM
// task-list checkboxes (`input[type=checkbox]`), and collapsible details blocks.
const ALLOWED_TAGS = [
  "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "p", "a", "ul", "ol",
  "li", "ins", "del", "sub", "sup", "em", "strong", "span", "hr", "br",
  "div", "table", "thead", "caption", "tbody", "tr", "th", "td", "pre",
  "code", "img", "details", "summary", "input",
];
const ALLOWED_ATTR = [
  "href", "name", "target", "src", "alt", "title", "class", "id", "type",
  "checked", "disabled", "rel",
];

/**
 * Get or create a server-side DOMPurify instance (jsdom window — DOMPurify needs a DOM).
 */
function getSanitizer(): Sanitizer {
  if (!sanitizer) {
    const window = new JSDOM("").window;
    sanitizer = createDOMPurify(window as unknown as Window);
  }
  return sanitizer;
}

/**
 * Sanitize HTML content for documentation display.
 * @param html The raw HTML to sanitize
 */
export function sanitizeDocsHtml(html: string): string {
  const purify = getSanitizer();
  return purify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR });
}
