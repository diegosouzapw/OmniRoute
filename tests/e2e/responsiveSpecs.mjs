/**
 * Responsive Test Specs — T-39
 *
 * Test specifications for Playwright responsive testing.
 * These define the viewports and pages to test.
 *
 * Usage with Playwright:
 *   import { VIEWPORTS, PAGES, generateTestMatrix } from "./responsiveSpecs";
 *
 * @module tests/e2e/responsiveSpecs
 */

/**
 * Viewport definitions for responsive testing.
 */
export const VIEWPORTS = {
  mobile: { width: 375, height: 812, label: "Mobile (375px)" },
  tablet: { width: 768, height: 1024, label: "Tablet (768px)" },
  desktop: { width: 1280, height: 800, label: "Desktop (1280px)" },
};

/**
 * Pages to test with responsive viewports.
 */
export const PAGES = [
  { path: "/login", name: "Login", requiresAuth: false },
  { path: "/dashboard", name: "Dashboard", requiresAuth: true },
  { path: "/dashboard/providers", name: "Providers", requiresAuth: true },
  { path: "/dashboard/settings", name: "Settings", requiresAuth: true },
];

/**
 * Accessibility checks to perform on each page.
 */
export const A11Y_CHECKS = [
  { id: "overflow-x", check: "document.body.scrollWidth <= document.body.clientWidth", description: "No horizontal overflow" },
  { id: "touch-targets", check: "min 44px touch targets on mobile", description: "Touch targets ≥ 44px" },
  { id: "font-size", check: "min 16px base font on mobile", description: "Base font ≥ 16px" },
  { id: "viewport-meta", check: "has viewport meta tag", description: "Viewport meta present" },
];

/**
 * Generate test matrix (viewport × page combinations).
 *
 * @returns {Array<{ viewport: typeof VIEWPORTS.mobile, page: typeof PAGES[0], testName: string }>}
 */
export function generateTestMatrix() {
  const matrix = [];

  for (const [vpKey, viewport] of Object.entries(VIEWPORTS)) {
    for (const page of PAGES) {
      matrix.push({
        viewport,
        page,
        testName: `${page.name} @ ${viewport.label}`,
      });
    }
  }

  return matrix;
}

/**
 * Get viewport names.
 * @returns {string[]}
 */
export function getViewportNames() {
  return Object.keys(VIEWPORTS);
}
