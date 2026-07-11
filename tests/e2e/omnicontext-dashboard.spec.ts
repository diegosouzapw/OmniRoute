import { expect, test, type Route } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

const NAVIGATION_TIMEOUT_MS = 300_000;

async function fulfillJson(route: Route, body: unknown, status = 200) {
  await route.fulfill({
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  });
}

test.describe("OmniContext dashboard", () => {
  test.setTimeout(600_000);

  test("loads settings, creates project, and switches advanced toggles", async ({ page }) => {
    const state = {
      settings: {
        enabled: false,
        injectBudgetTokens: 2000,
        retrieveTimeoutMs: 2000,
        gitProbeEnabled: false,
        autoPublish: "off",
        hybridRetrieve: false,
        preferStablePrefix: true,
        backend: "native",
        remoteBaseUrl: "",
        remoteApiKey: "",
        remoteTimeoutMs: 2000,
        dlpEnabled: false,
        departmentReviewRequired: true,
        universalHandoff: {
          enabled: true,
          trigger: "on-switch",
          maxMessagesForSummary: 30,
          handoffModel: "",
          ttlMinutes: 300,
          preserveSystemPrompt: true,
        },
      },
      projects: [] as Array<{ id: string; name: string; slug: string }>,
      teams: [] as Array<{ id: string; name: string; slug: string }>,
      members: [] as Array<{ projectId: string; apiKeyId: string; role: string }>,
      artifacts: [] as Array<{
        id: string;
        type: string;
        title: string;
        status: string;
        trustTier: string;
        updatedAt: string;
      }>,
      handoffs: [] as Array<{ id: string; goal: string; status: string; updatedAt: string }>,
    };

    await page.route("**/api/omnicontext/settings", async (route) => {
      if (route.request().method() === "GET") {
        await fulfillJson(route, state.settings);
        return;
      }
      if (route.request().method() === "PUT") {
        const body = route.request().postDataJSON() as Record<string, unknown>;
        state.settings = { ...state.settings, ...body } as typeof state.settings;
        if (body.universalHandoff && typeof body.universalHandoff === "object") {
          state.settings.universalHandoff = {
            ...state.settings.universalHandoff,
            ...(body.universalHandoff as object),
          };
        }
        await fulfillJson(route, state.settings);
        return;
      }
      await route.fallback();
    });

    await page.route("**/api/omnicontext/projects", async (route) => {
      if (route.request().method() === "GET") {
        await fulfillJson(route, { projects: state.projects });
        return;
      }
      if (route.request().method() === "POST") {
        const body = route.request().postDataJSON() as { name: string; slug: string };
        const project = {
          id: `proj-${state.projects.length + 1}`,
          name: body.name,
          slug: body.slug,
        };
        state.projects.push(project);
        await fulfillJson(route, { project }, 201);
        return;
      }
      await route.fallback();
    });

    await page.route("**/api/omnicontext/teams", async (route) => {
      if (route.request().method() === "GET") {
        await fulfillJson(route, { teams: state.teams });
        return;
      }
      if (route.request().method() === "POST") {
        const body = route.request().postDataJSON() as { name: string; slug: string };
        const team = { id: `team-${state.teams.length + 1}`, name: body.name, slug: body.slug };
        state.teams.push(team);
        await fulfillJson(route, { team }, 201);
        return;
      }
      await fulfillJson(route, { ok: true });
    });

    await page.route("**/api/omnicontext/projects/*/members", async (route) => {
      await fulfillJson(route, { members: state.members });
    });
    await page.route("**/api/omnicontext/projects/*/artifacts", async (route) => {
      await fulfillJson(route, { artifacts: state.artifacts });
    });
    await page.route("**/api/omnicontext/projects/*/handoffs", async (route) => {
      await fulfillJson(route, { handoffs: state.handoffs });
    });

    await gotoDashboardRoute(page, "/dashboard/omnicontext", {
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    });

    await expect(page.getByRole("heading", { name: "OmniContext" })).toBeVisible({
      timeout: NAVIGATION_TIMEOUT_MS,
    });
    await expect(page.getByText("OmniContext enabled")).toBeVisible();

    await page.getByRole("switch").click();
    await expect.poll(() => state.settings.enabled).toBe(true);

    await page.getByPlaceholder("Name").fill("Continuity Demo");
    await page.getByPlaceholder("slug-kebab-case").fill("continuity-demo");
    await page.getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("Continuity Demo")).toBeVisible();

    await page.getByRole("button", { name: "Advanced" }).click();
    await expect(page.getByText("Hybrid retrieve")).toBeVisible();
    await page.getByText("Hybrid retrieve (FTS + embeddings)").click();
    await expect.poll(() => state.settings.hybridRetrieve).toBe(true);

    await page.getByRole("button", { name: "Teams" }).click();
    await page.getByPlaceholder("Team name").fill("Platform");
    await page.getByPlaceholder("team-slug").fill("platform");
    await page.getByRole("button", { name: "Create team" }).click();
    await expect(page.getByText("Platform")).toBeVisible();
  });
});
