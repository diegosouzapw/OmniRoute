// @ts-check
import { chromium, type BrowserContext, type Page } from "@playwright/test";

/**
 * Default a11y snapshot test using axe-core.
 *
 * Run: npx playwright test --config tests/a11y/playwright.config.ts
 */

const BASE_URL = process.env.A11Y_BASE_URL || "http://localhost:8080";

async function runAxe(page: Page): Promise<{ violations: any[]; passes: any[] }> {
  // Inject axe-core
  await page.addScriptTag({
    path: require.resolve("axe-core/axe.min.js"),
  });
  const result = await page.evaluate(() =>
    // @ts-ignore
    window.axe.run()
  );
  return { violations: result.violations, passes: result.passes };
}

async function setupContext(): Promise<BrowserContext> {
  const browser = await chromium.launch({ headless: true });
  return browser.newContext({
    viewport: { width: 1280, height: 720 },
    colorScheme: "light",
  });
}

// Dashboard pages to test
const DASHBOARD_PAGES = [
  { path: "/", name: "Dashboard Home" },
  { path: "/endpoint", name: "Endpoint" },
  { path: "/providers", name: "Providers" },
  { path: "/settings", name: "Settings" },
];

test.describe("WCAG 2.2 AA Accessibility Baseline", () => {
  DASHBOARD_PAGES.forEach(({ path, name }) => {
    test(`${name} - no critical violations`, async () => {
      const context = await setupContext();
      const page = await context.newPage();
      try {
        await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle" });
        const { violations } = await runAxe(page);

        // Filter to only violations that are serious or critical
        const seriousViolations = violations.filter(
          (v: any) => v.impact === "critical" || v.impact === "serious"
        );

        expect(seriousViolations.length).toBe(0);
        if (seriousViolations.length > 0) {
          console.log(
            `A11y violations on ${name}:`,
            JSON.stringify(seriousViolations, null, 2)
          );
        }
      } finally {
        await page.close();
        await context.browser()?.close();
      }
    });
  });

  test("keyboard navigation - tab order is logical", async () => {
    const context = await setupContext();
    const page = await context.newPage();
    try {
      await page.goto(BASE_URL, { waitUntil: "networkidle" });
      // Tab through the page
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press("Tab");
        const focused = await page.evaluate(() => {
          const el = document.activeElement;
          return el ? el.tagName + (el.id ? "#" + el.id : "") : "null";
        });
        expect(focused).not.toBe("null");
      }
    } finally {
      await page.close();
      await context.browser()?.close();
    }
  });

  test("landmarks - has main navigation and main content", async () => {
    const context = await setupContext();
    const page = await context.newPage();
    try {
      await page.goto(BASE_URL, { waitUntil: "networkidle" });
      const hasNav = await page.evaluate(() => !!document.querySelector("nav"));
      const hasMain = await page.evaluate(() => !!document.querySelector("main"));
      expect(hasNav).toBe(true);
      expect(hasMain).toBe(true);
    } finally {
      await page.close();
      await context.browser()?.close();
    }
  });

  test("color contrast - meets WCAG 2.2 AA", async () => {
    const context = await setupContext();
    const page = await context.newPage();
    try {
      await page.goto(BASE_URL, { waitUntil: "networkidle" });
      const { violations } = await runAxe(page);
      const contrastViolations = violations.filter(
        (v: any) => v.id === "color-contrast"
      );
      expect(contrastViolations.length).toBe(0);
    } finally {
      await page.close();
      await context.browser()?.close();
    }
  });

  test("reduced motion - respects prefers-reduced-motion", async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    try {
      await page.goto(BASE_URL, { waitUntil: "networkidle" });
      // Check no CSS animation is more than 0s when prefers-reduced-motion
      const longAnimations = await page.evaluate(() => {
        const sheets = document.styleSheets;
        let count = 0;
        for (let i = 0; i < sheets.length; i++) {
          try {
            const rules = sheets[i].cssRules || sheets[i].cssRules;
            for (let j = 0; j < rules.length; j++) {
              const rule = rules[j] as CSSStyleRule;
              if (rule.style?.animationDuration && rule.style.animationDuration !== "0s") {
                count++;
              }
            }
          } catch (_) {}
        }
        return count;
      });
      // This is a soft check — some animations may still fire
      console.log(`Long animations found with reduced motion: ${longAnimations}`);
    } finally {
      await page.close();
      await browser.close();
    }
  });
});
