import { expect, type Page } from "@playwright/test";

type GotoDashboardRouteOptions = {
  timeoutMs?: number;
  waitUntil?: "commit" | "domcontentloaded" | "load" | "networkidle";
};

const DEFAULT_TIMEOUT_MS = 300_000;
const APP_ROUTE_PATTERN = /\/(login|dashboard)(\/.*)?$/;
const E2E_PASSWORD =
  process.env.OMNIROUTE_E2E_PASSWORD || process.env.INITIAL_PASSWORD || "omniroute-e2e-password";

async function waitForAppRoute(page: Page, timeoutMs: number) {
  await page.waitForURL(APP_ROUTE_PATTERN, { timeout: timeoutMs });
  await page.locator("body").waitFor({ state: "visible", timeout: timeoutMs });
}

async function finishOnboardingIfNeeded(page: Page, timeoutMs: number) {
  if (!page.url().includes("/dashboard/onboarding")) return;

  const skipWizardButton = page.getByRole("button", {
    name: /skip wizard|skip/i,
  });
  await expect(skipWizardButton).toBeVisible({ timeout: timeoutMs });
  await skipWizardButton.click();
  await page.waitForURL(/\/dashboard(\/.*)?$/, { timeout: timeoutMs });
  await page.locator("body").waitFor({ state: "visible", timeout: timeoutMs });
}

async function loginIfNeeded(page: Page, timeoutMs: number) {
  if (!page.url().includes("/login")) return;

  const passwordInput = page.locator('input[type="password"]').first();
  await expect(passwordInput).toBeVisible({ timeout: timeoutMs });
  await passwordInput.fill(E2E_PASSWORD);

  const submitButton = page.locator("form").getByRole("button").first();
  await expect(submitButton).toBeEnabled({ timeout: timeoutMs });
  await Promise.all([
    page.waitForURL(/\/dashboard(\/.*)?$/, { timeout: timeoutMs }),
    submitButton.click(),
  ]);
  await page.locator("body").waitFor({ state: "visible", timeout: timeoutMs });
}

async function getDashboardAuthState(page: Page) {
  return await page.evaluate(async () => {
    const safeJson = async (response: Response) => {
      try {
        return (await response.json()) as any;
      } catch {
        return null;
      }
    };

    const [requireLoginResponse, settingsResponse] = await Promise.all([
      fetch("/api/settings/require-login", {
        credentials: "include",
        cache: "no-store",
      }),
      fetch("/api/settings", {
        credentials: "include",
        cache: "no-store",
      }),
    ]);

    const requireLoginPayload = await safeJson(requireLoginResponse);

    return {
      requireLogin: requireLoginPayload?.requireLogin === true,
      settingsStatus: settingsResponse.status,
    };
  });
}

export async function gotoDashboardRoute(
  page: Page,
  url: string,
  options: GotoDashboardRouteOptions = {}
) {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const waitUntil = options.waitUntil ?? "commit";
  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      await page.goto(url, { waitUntil, timeout: timeoutMs });
      await waitForAppRoute(page, timeoutMs);
      await finishOnboardingIfNeeded(page, timeoutMs);

      if (page.url().includes("/login")) {
        await loginIfNeeded(page, timeoutMs);
      }

      if (page.url().includes("/dashboard/onboarding") || page.url().includes("/login")) {
        await page.goto(url, { waitUntil, timeout: timeoutMs });
        await waitForAppRoute(page, timeoutMs);
        await finishOnboardingIfNeeded(page, timeoutMs);
        await loginIfNeeded(page, timeoutMs);
      }

      const authState = await getDashboardAuthState(page);
      if (authState.requireLogin && authState.settingsStatus === 401) {
        await page.goto("/login", { waitUntil, timeout: timeoutMs });
        await waitForAppRoute(page, timeoutMs);
        await loginIfNeeded(page, timeoutMs);
        await page.goto(url, { waitUntil, timeout: timeoutMs });
        await waitForAppRoute(page, timeoutMs);
        await finishOnboardingIfNeeded(page, timeoutMs);
      }

      await page.locator("body").waitFor({ state: "visible", timeout: timeoutMs });
      return;
    } catch (error: any) {
      lastError = error;
      await page.waitForTimeout(1000);
    }
  }

  throw lastError instanceof Error ? lastError : new Error(`Failed to open protected route ${url}`);
}
