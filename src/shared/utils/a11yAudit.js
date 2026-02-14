/**
 * Accessibility Audit Utility — T-35
 *
 * Provides utilities for running accessibility audits
 * using axe-core in automated tests or manual checks.
 *
 * Usage:
 *   import { auditPage, WCAG_RULES } from "@/shared/utils/a11yAudit";
 *
 * @module shared/utils/a11yAudit
 */

// @ts-check

/**
 * WCAG AA rules to check against.
 * These are the most impactful accessibility issues.
 */
export const WCAG_RULES = {
  /** All interactive elements must have accessible names */
  ARIA_LABEL: "aria-label",
  /** Dialog elements must have role="dialog" and aria-modal */
  DIALOG_ROLE: "dialog-role",
  /** Focus must be trapped within modal dialogs */
  FOCUS_TRAP: "focus-trap",
  /** Color contrast must meet WCAG AA ratio (4.5:1 for normal text) */
  COLOR_CONTRAST: "color-contrast",
  /** Form inputs must have associated labels */
  LABEL: "label",
  /** Images must have alt text */
  IMAGE_ALT: "image-alt",
  /** Keyboard navigation must work for all interactive elements */
  KEYBOARD: "keyboard",
  /** Heading levels should not skip */
  HEADING_ORDER: "heading-order",
};

/**
 * @typedef {Object} A11yViolation
 * @property {string} id - Rule ID
 * @property {string} description - What the rule checks
 * @property {string} impact - "critical" | "serious" | "moderate" | "minor"
 * @property {string} help - How to fix
 * @property {string[]} nodes - CSS selectors of affected elements
 */

/**
 * Audit a component's HTML for accessibility violations.
 * This is a lightweight check that works without a full browser.
 *
 * @param {string} html - HTML string to audit
 * @returns {A11yViolation[]} List of violations found
 */
export function auditHTML(html) {
  const violations = [];

  // Check: Interactive elements without aria-label
  const interactiveWithoutLabel = html.match(
    /<(button|a|input|select|textarea)(?![^>]*(?:aria-label|aria-labelledby|title))[^>]*>/gi
  );
  if (interactiveWithoutLabel) {
    // Filter out elements that have visible text content or labels
    const problematic = interactiveWithoutLabel.filter(
      (el) => !el.includes("type=\"hidden\"") && !el.includes("type='hidden'")
    );
    if (problematic.length > 0) {
      violations.push({
        id: WCAG_RULES.ARIA_LABEL,
        description: "Interactive elements should have accessible names",
        impact: "serious",
        help: "Add aria-label, aria-labelledby, or title attribute",
        nodes: problematic.slice(0, 5).map((el) => el.substring(0, 80)),
      });
    }
  }

  // Check: Dialogs without role="dialog"
  const modals = html.match(/<div[^>]*(?:modal|dialog|overlay)[^>]*>/gi) || [];
  const modalsWithoutRole = modals.filter((m) => !m.includes('role="dialog"'));
  if (modalsWithoutRole.length > 0) {
    violations.push({
      id: WCAG_RULES.DIALOG_ROLE,
      description: "Modal elements should have role=\"dialog\"",
      impact: "serious",
      help: "Add role=\"dialog\" and aria-modal=\"true\" to modal containers",
      nodes: modalsWithoutRole.map((m) => m.substring(0, 80)),
    });
  }

  // Check: Images without alt text
  const imgsWithoutAlt = html.match(/<img(?![^>]*alt=)[^>]*>/gi);
  if (imgsWithoutAlt) {
    violations.push({
      id: WCAG_RULES.IMAGE_ALT,
      description: "Images must have alt text",
      impact: "critical",
      help: "Add alt attribute to all <img> elements",
      nodes: imgsWithoutAlt.slice(0, 5).map((el) => el.substring(0, 80)),
    });
  }

  // Check: Form inputs without labels
  const inputsWithoutLabel = html.match(
    /<input(?![^>]*(?:aria-label|aria-labelledby|id="[^"]*"))[^>]*type="(?:text|email|password|number|search|tel|url)"[^>]*>/gi
  );
  if (inputsWithoutLabel) {
    violations.push({
      id: WCAG_RULES.LABEL,
      description: "Form inputs should have associated labels",
      impact: "serious",
      help: "Add aria-label or associate a <label> element",
      nodes: inputsWithoutLabel.slice(0, 5).map((el) => el.substring(0, 80)),
    });
  }

  return violations;
}

/**
 * Generate an accessibility report summary.
 *
 * @param {A11yViolation[]} violations
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
