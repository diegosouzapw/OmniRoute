// @ts-check
/**
 * a11y Audit — Basic WCAG Accessibility Checker
 *
 * Simple HTML string audit for common accessibility violations.
 * Uses regex-based detection (lightweight, no DOM parser required).
 *
 * @module shared/utils/a11yAudit
 */

/** WCAG rule identifiers */
export const WCAG_RULES = {
  IMAGE_ALT: "image-alt",
  ARIA_LABEL: "aria-label",
  DIALOG_ROLE: "dialog-role",
  COLOR_CONTRAST: "color-contrast",
  FOCUS_TRAP: "focus-trap",
  HEADING_ORDER: "heading-order",
};

/**
 * @typedef {Object} Violation
 * @property {string} id - Rule identifier from WCAG_RULES
 * @property {string} description - Human-readable description
 * @property {string} impact - "critical" | "serious" | "moderate" | "minor"
 * @property {string} help - Remediation guidance
 * @property {Array<{html: string}>} nodes - Offending elements
 */

/**
 * Audit an HTML string for common accessibility violations.
 *
 * @param {string} html - HTML string to audit
 * @returns {Violation[]} List of violations found
 */
export function auditHTML(html) {
  const violations = [];

  // Check images without alt text
  const imgMatches = html.match(/<img\b[^>]*>/gi) || [];
  for (const img of imgMatches) {
    if (!/\balt\s*=/i.test(img)) {
      violations.push({
        id: WCAG_RULES.IMAGE_ALT,
        description: "Images must have alternate text",
        impact: "critical",
        help: "Add an alt attribute to the <img> element",
        nodes: [{ html: img }],
      });
    }
  }

  // Check dialogs/modals without role
  const modalMatches = html.match(/<div\b[^>]*class="[^"]*modal[^"]*"[^>]*>/gi) || [];
  for (const modal of modalMatches) {
    if (!/\brole\s*=/i.test(modal)) {
      violations.push({
        id: WCAG_RULES.DIALOG_ROLE,
        description: 'Dialogs must have role="dialog"',
        impact: "serious",
        help: 'Add role="dialog" and aria-modal="true" to the modal container',
        nodes: [{ html: modal }],
      });
    }
  }

  return violations;
}

/**
 * Parse a hex color string to RGB components.
 * @param {string} hex - Color in #RGB, #RRGGBB, or #RRGGBBAA format
 * @returns {{ r: number, g: number, b: number }|null}
 */
function parseHexColor(hex) {
  if (!hex || typeof hex !== "string") return null;
  const clean = hex.replace(/^#/, "");

  let r, g, b;
  if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16);
    g = parseInt(clean[1] + clean[1], 16);
    b = parseInt(clean[2] + clean[2], 16);
  } else if (clean.length === 6 || clean.length === 8) {
    r = parseInt(clean.slice(0, 2), 16);
    g = parseInt(clean.slice(2, 4), 16);
    b = parseInt(clean.slice(4, 6), 16);
  } else {
    return null;
  }

  return { r, g, b };
}

/**
 * Compute relative luminance per WCAG 2.x specification.
 * @param {{ r: number, g: number, b: number }} rgb
 * @returns {number} Relative luminance (0..1)
 */
function relativeLuminance({ r, g, b }) {
  const [sR, sG, sB] = [r, g, b].map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sR + 0.7152 * sG + 0.0722 * sB;
}

/**
 * Get the contrast ratio between two hex colors.
 * @param {string} fgHex - Foreground color (#RRGGBB)
 * @param {string} bgHex - Background color (#RRGGBB)
 * @returns {number} Contrast ratio (1..21)
 */
export function getContrastRatio(fgHex, bgHex) {
  const fg = parseHexColor(fgHex);
  const bg = parseHexColor(bgHex);
  if (!fg || !bg) return 0;

  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check WCAG AA contrast compliance between foreground and background colors.
 *
 * @param {string} fgHex - Foreground color (#RRGGBB)
 * @param {string} bgHex - Background color (#RRGGBB)
 * @param {{ largeText?: boolean }} [options={}] - Options
 * @returns {{ ratio: number, aa: boolean, aaa: boolean }}
 */
export function checkContrast(fgHex, bgHex, options: any = {}) {
  const ratio = getContrastRatio(fgHex, bgHex);
  const minAA = options.largeText ? 3 : 4.5;
  const minAAA = options.largeText ? 4.5 : 7;

  return {
    ratio: Math.round(ratio * 100) / 100,
    aa: ratio >= minAA,
    aaa: ratio >= minAAA,
  };
}

/**
 * Generate a summary report from a list of violations.
 *
 * @param {Violation[]} violations
 * @returns {{ total: number, critical: number, serious: number, moderate: number, minor: number, passed: boolean }}
 */
export function generateReport(violations) {
  return {
    total: violations.length,
    critical: violations.filter((v) => v.impact === "critical").length,
    serious: violations.filter((v) => v.impact === "serious").length,
    moderate: violations.filter((v) => v.impact === "moderate").length,
    minor: violations.filter((v) => v.impact === "minor").length,
    passed: violations.length === 0,
  };
}
