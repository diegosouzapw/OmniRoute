import { test, expect } from "@playwright/test";

import { A11Y_CHECKS, generateTestMatrix } from "./responsiveSpecs";

const executableChecks = A11Y_CHECKS.filter((check) => check.kind === "evaluate");

test.describe("Responsive matrix", () => {
  for (const { viewport, page: pageSpec, testName } of generateTestMatrix()) {
    test(`${testName} has no basic responsive regressions`, async ({ page }) => {
      test.skip(pageSpec.requiresAuth, "Requires authenticated session before responsive checks.");

      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(pageSpec.path);

      for (const check of executableChecks) {
        const passed = await page.evaluate(check.evaluate);
        expect(passed, check.criteria).toBe(true);
      }
    });
  }
});
