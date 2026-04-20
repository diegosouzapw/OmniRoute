import { expect, test, type Page, type Route } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

const NAVIGATION_TIMEOUT_MS = 300_000;

type SkillRecord = {
  id: string;
  name: string;
  version: string;
  description: string;
  enabled: boolean;
  createdAt: string;
};

type MarketplaceSkill = {
  name: string;
  description: string;
  version: string;
  sourceUrl: string;
  skillMdContent: string;
};

async function fulfillJson(route: Route, body: unknown, status = 200) {
  await route.fulfill({
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  });
}

test.describe("Skills marketplace", () => {
  test.setTimeout(600_000);

  test("searches, installs, toggles, and scrolls through skills in the dashboard", async ({
    page,
  }) => {
    const state: {
      skills: SkillRecord[];
      marketplace: MarketplaceSkill[];
      nextId: number;
      toggleCalls: number;
      marketplaceInstalls: number;
      customInstalls: number;
    } = {
      skills: [
        {
          id: "skill-weather",
          name: "lookupWeather",
          version: "1.0.0",
          description: "Returns current weather conditions.",
          enabled: false,
          createdAt: new Date("2026-04-05T20:00:00.000Z").toISOString(),
        },
      ],
      marketplace: Array.from({ length: 12 }, (_, index) => ({
        name: index === 0 ? "Weather Pro" : `Skill Page ${index + 1}`,
        description:
          index === 0
            ? "Extended weather reports with severe alert support."
            : `Marketplace skill result ${index + 1}.`,
        version: `1.${index}.0`,
        sourceUrl: `https://skillsmp.example/${index + 1}`,
        skillMdContent: `# Skill ${index + 1}\n\nMarketplace content`,
      })),
      nextId: 2,
      toggleCalls: 0,
      marketplaceInstalls: 0,
      customInstalls: 0,
    };

    await page.route(/\/api\/skills\/executions(?:\?.*)?$/, async (route) => {
      await fulfillJson(route, { data: [], total: 0, totalPages: 1 });
    });

    await page.route(/\/api\/skills\/marketplace(?:\?.*)?$/, async (route) => {
      const url = new URL(route.request().url());
      const query = url.searchParams.get("q")?.toLowerCase() || "";
      const results = state.marketplace.filter((skill) =>
        query
          ? skill.name.toLowerCase().includes(query) ||
            skill.description.toLowerCase().includes(query)
          : true
      );
      await fulfillJson(route, { skills: results });
    });

    await page.route("**/api/skills/marketplace/install", async (route) => {
      state.marketplaceInstalls += 1;
      const payload = (route.request().postDataJSON() as Partial<MarketplaceSkill>) || {};
      state.skills.push({
        id: `skill-${state.nextId++}`,
        name: payload.name || "marketplace-skill",
        version: payload.version || "1.0.0",
        description: payload.description || "Installed from marketplace",
        enabled: true,
        createdAt: new Date("2026-04-05T20:10:00.000Z").toISOString(),
      });
      await fulfillJson(route, { success: true });
    });

    await page.route("**/api/skills/install", async (route) => {
      state.customInstalls += 1;
      const payload = (route.request().postDataJSON() as Partial<SkillRecord>) || {};
      state.skills.push({
        id: `skill-${state.nextId++}`,
        name: payload.name || "custom-skill",
        version: payload.version || "1.0.0",
        description: payload.description || "Custom installed skill",
        enabled: true,
        createdAt: new Date("2026-04-05T20:20:00.000Z").toISOString(),
      });
      await fulfillJson(route, {
        success: true,
        id: `skill-${state.nextId}`,
      });
    });

    await page.route(/\/api\/skills\/skill-[^/?]+(?:\?.*)?$/, async (route) => {
      if (route.request().method() !== "PUT") {
        await fulfillJson(route, { error: "Method not allowed in skill detail stub" }, 405);
        return;
      }

      state.toggleCalls += 1;
      const skillId = route.request().url().split("/").pop() || "";
      state.skills = state.skills.map((skill) =>
        skill.id === skillId ? { ...skill, enabled: !skill.enabled } : skill
      );
      await fulfillJson(route, { success: true });
    });

    await page.route(/\/api\/skills(?:\?.*)?$/, async (route) => {
      await fulfillJson(route, {
        data: state.skills,
        total: state.skills.length,
        totalPages: 1,
      });
    });

    await gotoDashboardRoute(page, "/dashboard/skills", {
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    });

    await expect(page.getByText("lookupWeather")).toBeVisible({ timeout: 15000 });
    const weatherCard = page
      .locator("div")
      .filter({ has: page.getByText("lookupWeather") })
      .first();
    const weatherSwitch = weatherCard.getByRole("switch");
    await expect(weatherSwitch).toHaveAttribute("aria-checked", "false");
    await weatherSwitch.click();
    await expect(weatherSwitch).toHaveAttribute("aria-checked", "true");
    await expect.poll(() => state.toggleCalls).toBe(1);

    await page.getByRole("button", { name: /marketplace/i }).click();
    const marketplaceSearch = page.getByPlaceholder(/Search SkillsMP\.\.\./i);
    await expect(marketplaceSearch).toBeVisible({ timeout: 15000 });

    await marketplaceSearch.fill("weather");
    await page.getByRole("button", { name: /search skillsmp/i }).click();
    await expect(page.getByText("Weather Pro")).toBeVisible({ timeout: 15000 });
    await page.getByRole("button", { name: /^install$/i }).click();
    await expect.poll(() => state.marketplaceInstalls).toBe(1);

    await marketplaceSearch.fill("");
    await page.getByRole("button", { name: /search skillsmp/i }).click();
    const lastMarketplaceSkill = page.getByText("Skill Page 12").last();
    await lastMarketplaceSkill.scrollIntoViewIfNeeded();
    await expect(lastMarketplaceSkill).toBeVisible();

    await page.getByRole("button", { name: /^skills$/i }).click();
    await expect(page.getByText("Weather Pro")).toBeVisible();

    await page.getByRole("button", { name: /^install skill$/i }).click();
    const installDialog = page
      .locator("div.fixed.inset-0.z-50")
      .filter({ has: page.getByRole("heading", { name: /^install skill$/i }) });
    await expect(installDialog).toBeVisible();
    await installDialog.locator("textarea").fill(
      JSON.stringify(
        {
          name: "customMath",
          version: "1.0.0",
          description: "Custom calculator skill",
          schema: { input: {}, output: {} },
          handlerCode: "export default async () => ({ ok: true });",
        },
        null,
        2
      )
    );
    await installDialog.getByRole("button", { name: /^install$/i }).click();

    await expect.poll(() => state.customInstalls).toBe(1);
    await expect(installDialog.getByText(/skill installed/i)).toBeVisible();
    await installDialog.getByRole("button", { name: /cancel/i }).click();

    await expect(page.getByText("customMath")).toBeVisible();

    const installedSwitch = page
      .getByRole("heading", { name: "Weather Pro" })
      .locator('xpath=ancestor::div[contains(@class, "flex items-center justify-between")][1]')
      .getByRole("switch");
    await expect(installedSwitch).toHaveAttribute("aria-checked", "true");
    await installedSwitch.click();
    await expect(installedSwitch).toHaveAttribute("aria-checked", "false");
    await expect.poll(() => state.toggleCalls).toBe(2);
  });
});
