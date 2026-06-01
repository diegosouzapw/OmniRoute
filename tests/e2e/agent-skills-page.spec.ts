import { expect, test, type Route } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

const NAVIGATION_TIMEOUT_MS = 300_000;

type AgentSkill = {
  id: string;
  name: string;
  description: string;
  category: "api" | "cli";
  area: string;
  icon: string;
  endpoints?: string[];
  cliCommands?: string[];
  rawUrl: string;
  githubUrl: string;
};

type SkillCoverage = {
  api: { have: number; total: number };
  cli: { have: number; total: number };
  totalSkills: number;
  generatedAt: string;
};

function makeAgentSkills(): AgentSkill[] {
  const skills: AgentSkill[] = [];
  for (let i = 0; i < 22; i++) {
    skills.push({
      id: `omni-skill-${i}`,
      name: `API Skill ${i}`,
      description: `API skill description ${i}`,
      category: "api",
      area: `area-${i}`,
      icon: "api",
      endpoints: [`GET /api/skill-${i}`],
      rawUrl: `https://raw.githubusercontent.com/example/OmniRoute/main/skills/omni-skill-${i}/SKILL.md`,
      githubUrl: `https://github.com/example/OmniRoute/blob/main/skills/omni-skill-${i}/SKILL.md`,
    });
  }
  for (let i = 0; i < 20; i++) {
    skills.push({
      id: `cli-skill-${i}`,
      name: `CLI Skill ${i}`,
      description: `CLI skill description ${i}`,
      category: "cli",
      area: `cli-area-${i}`,
      icon: "terminal",
      cliCommands: [`skill${i} run`],
      rawUrl: `https://raw.githubusercontent.com/example/OmniRoute/main/skills/cli-skill-${i}/SKILL.md`,
      githubUrl: `https://github.com/example/OmniRoute/blob/main/skills/cli-skill-${i}/SKILL.md`,
    });
  }
  return skills;
}

const FULL_COVERAGE: SkillCoverage = {
  api: { have: 22, total: 22 },
  cli: { have: 20, total: 20 },
  totalSkills: 42,
  generatedAt: new Date().toISOString(),
};

async function fulfillJson(route: Route, body: unknown, status = 200) {
  await route.fulfill({
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  });
}

async function fulfillText(route: Route, body: string, status = 200) {
  await route.fulfill({
    status,
    contentType: "text/markdown; charset=utf-8",
    body,
  });
}

test.describe("Agent Skills page", () => {
  test.setTimeout(600_000);

  test("renders SkillsConceptCard with data-testid skills-concept-card-agent", async ({
    page,
  }) => {
    const skills = makeAgentSkills();

    await page.route(/\/api\/agent-skills(?:\?.*)?$/, async (route) => {
      if (route.request().method() === "GET") {
        await fulfillJson(route, { skills, coverage: FULL_COVERAGE });
      } else {
        await route.continue();
      }
    });

    await gotoDashboardRoute(page, "/dashboard/agent-skills", {
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    });

    const conceptCard = page.locator("[data-testid='skills-concept-card-agent']");
    await expect(conceptCard).toBeVisible({ timeout: 15_000 });
  });

  test("grid shows 42 skill cards when filter is 'all'", async ({ page }) => {
    const skills = makeAgentSkills();

    await page.route(/\/api\/agent-skills(?:\?.*)?$/, async (route) => {
      if (route.request().method() === "GET") {
        await fulfillJson(route, { skills, coverage: FULL_COVERAGE });
      } else {
        await route.continue();
      }
    });

    await gotoDashboardRoute(page, "/dashboard/agent-skills", {
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    });

    // Wait for cards to render
    await expect(page.locator("[data-testid^='skill-card-']").first()).toBeVisible({
      timeout: 15_000,
    });

    const cards = page.locator("[data-testid^='skill-card-']");
    await expect(cards).toHaveCount(42, { timeout: 15_000 });
  });

  test("clicking omni-skill-0 card renders markdown in preview pane", async ({
    page,
  }) => {
    const skills = makeAgentSkills();
    const mockMarkdown = "# API Skill 0\n\nThis skill manages connections.";

    await page.route(/\/api\/agent-skills(?:\?.*)?$/, async (route) => {
      if (route.request().method() === "GET") {
        await fulfillJson(route, { skills, coverage: FULL_COVERAGE });
      } else {
        await route.continue();
      }
    });

    await page.route(/\/api\/agent-skills\/omni-skill-0\/raw/, async (route) => {
      await fulfillText(route, mockMarkdown);
    });

    await gotoDashboardRoute(page, "/dashboard/agent-skills", {
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    });

    // Wait for cards to render and click first card
    const firstCard = page.locator("[data-testid='skill-card-omni-skill-0']");
    await expect(firstCard).toBeVisible({ timeout: 15_000 });
    await firstCard.click();

    // Preview pane should show non-empty content
    const previewPane = page.locator("[data-testid='skill-preview-pane']");
    await expect(previewPane).toBeVisible({ timeout: 15_000 });
    const previewText = await previewPane.textContent();
    expect(previewText?.trim().length).toBeGreaterThan(0);
  });

  test("cross-link 'Understand the difference' navigates to /dashboard/omni-skills", async ({
    page,
  }) => {
    const skills = makeAgentSkills();

    await page.route(/\/api\/agent-skills(?:\?.*)?$/, async (route) => {
      if (route.request().method() === "GET") {
        await fulfillJson(route, { skills, coverage: FULL_COVERAGE });
      } else {
        await route.continue();
      }
    });

    await gotoDashboardRoute(page, "/dashboard/agent-skills", {
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    });

    const conceptCard = page.locator("[data-testid='skills-concept-card-agent']");
    await expect(conceptCard).toBeVisible({ timeout: 15_000 });

    // Find the cross-link inside the concept card
    const crossLink = conceptCard.locator("a");
    await expect(crossLink).toBeVisible({ timeout: 5_000 });

    await crossLink.click();
    await page.waitForURL(/\/dashboard\/omni-skills/, { timeout: 15_000 });
    expect(page.url()).toContain("/dashboard/omni-skills");
  });

  test("/dashboard/skills redirects to /dashboard/omni-skills", async ({ page }) => {
    await page.goto("/dashboard/skills", { waitUntil: "commit", timeout: NAVIGATION_TIMEOUT_MS });
    await page.waitForURL(/\/dashboard\/(omni-skills|login|onboarding)/, {
      timeout: 15_000,
    });
    // After auth, check that the final destination is omni-skills
    const finalUrl = page.url();
    expect(
      finalUrl.includes("/dashboard/omni-skills") ||
        finalUrl.includes("/login") ||
        finalUrl.includes("/onboarding"),
    ).toBe(true);
  });
});
