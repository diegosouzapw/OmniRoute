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
