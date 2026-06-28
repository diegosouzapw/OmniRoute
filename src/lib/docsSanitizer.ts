import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

let sanitizer: createDOMPurify.DOMPurifyI | null = null;

/**
 * Get or create a server-side DOMPurify instance.
 */
function getSanitizer(): createDOMPurify.DOMPurifyI {
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
  return purify.sanitize(html, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "p", "a", "ul", "ol",
      "nl", "li", "ins", "del", "te", "bw", "em", "strong", "span", "hr", "br",
      "div", "table", "thead", "caption", "tbody", "tr", "th", "td", "pre",
      "code", "img", "details", "summary", "input"
    ],
    ALLOWED_ATTR: [
      "href", "name", "target", "src", "alt", "title", "class", "id", "type",
      "checked", "disabled", "rel"
    ],
  });
}
