import { expect, test, type Page } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

// The advertised-CLI-version card renders only on the claude and codex provider
// pages. Its GET/PUT are stubbed here so the spec drives the REAL page and the
// real component without touching operator settings.
type VersionRow = {
  key: string;
  version: string | null;
  effective: string;
  source: string;
  pinned: string;
};

const CLAUDE_ROW: VersionRow = {
  key: "claude",
  version: null,
  effective: "2.1.258",
  source: "default",
  pinned: "2.1.258",
};

const CODEX_ROW: VersionRow = {
  key: "codex",
  version: null,
  effective: "0.155.0",
  source: "default",
  pinned: "0.155.0",
};

/**
 * Stub the CLI-version endpoint with a small in-memory store so a PUT is
 * reflected in the next GET exactly the way the real route behaves.
 * Returns the captured PUT bodies.
 */
async function stubCliVersions(page: Page, rows: VersionRow[]) {
  const store = new Map(rows.map((row) => [row.key, { ...row }]));
  const puts: Array<Record<string, unknown>> = [];

  await page.route("**/api/settings/cli-versions", async (route) => {
    if (route.request().method() === "PUT") {
      const body = route.request().postDataJSON() as Record<string, unknown>;
      puts.push(body);
      for (const [key, value] of Object.entries(body)) {
        const existing = store.get(key);
        if (!existing) continue;
        existing.version = (value as string | null) ?? null;
        existing.effective = existing.version ?? existing.pinned;
        existing.source = existing.version ? "settings" : "default";
      }
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ items: [...store.values()] }),
    });
  });

  return puts;
}

/** The provider detail page needs an empty connection list to render its panels. */
async function stubProviderApis(page: Page) {
  await page.route("**/api/providers", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ connections: [] }),
    })
  );
  await page.route("**/api/provider-nodes", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ nodes: [] }),
    })
  );
}

test.describe("Advertised CLI client version card", () => {
  test.describe.configure({ mode: "serial" });

  test("renders on the Claude Code provider page with the billing caveat", async ({ page }) => {
    await stubProviderApis(page);
    await stubCliVersions(page, [CLAUDE_ROW]);

    await gotoDashboardRoute(page, "/dashboard/providers/claude");

    await expect(page.getByText("Advertised CLI client version")).toBeVisible({ timeout: 20000 });
    await expect(page.getByText("Resolved from: captured default")).toBeVisible();
    await expect(page.getByText("Captured default: 2.1.258")).toBeVisible();
    await expect(page.getByText(/Billing caveat/)).toBeVisible();
    await expect(page.getByText(/2\.1\.260\.1e2/)).toBeVisible();
  });

  test("renders on the Codex provider page with the caller-forwarding caveat", async ({ page }) => {
    await stubProviderApis(page);
    await stubCliVersions(page, [CODEX_ROW]);

    await gotoDashboardRoute(page, "/dashboard/providers/codex");

    await expect(page.getByText("Advertised CLI client version")).toBeVisible({ timeout: 20000 });
    await expect(page.getByText(/gpt-6-astra/)).toBeVisible();
    await expect(page.getByText(/Inference caveat/)).toBeVisible();
  });

  test("is absent from an unrelated provider page", async ({ page }) => {
    await stubProviderApis(page);
    await stubCliVersions(page, [CLAUDE_ROW, CODEX_ROW]);

    await gotoDashboardRoute(page, "/dashboard/providers/openai");

    await expect(page.getByText("Advertised CLI client version")).toHaveCount(0);
  });

  test("saves an override and reports the dashboard override as the source", async ({ page }) => {
    await stubProviderApis(page);
    const puts = await stubCliVersions(page, [CLAUDE_ROW]);

    await gotoDashboardRoute(page, "/dashboard/providers/claude");

    const input = page.getByLabel("Override version");
    await expect(input).toBeVisible({ timeout: 20000 });
    await input.fill("2.1.260");

    // Scope to the editor row: the provider page has other Save buttons.
    const saveButton = input.locator("xpath=..").getByRole("button", { name: "Save" });
    await expect(saveButton).toBeEnabled();
    await saveButton.click();

    await expect(page.getByText("Resolved from: dashboard override")).toBeVisible({
      timeout: 15000,
    });
    expect(puts).toEqual([{ claude: "2.1.260" }]);
  });
});
