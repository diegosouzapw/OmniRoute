import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildGlmQuotaFetch, getGlmTeamQuotaConfig } from "../../open-sse/config/glmProvider.ts";
import { getGlmUsage } from "../../open-sse/services/usage/glm.ts";
import { assignGlmTeamQuotaProviderData } from "../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/glmTeamQuotaProviderData.ts";

const TEAM_QUOTA_RESPONSE = {
  code: 200,
  msg: "操作成功",
  data: {
    limits: [
      {
        type: "TIME_LIMIT",
        unit: 5,
        number: 1,
        usage: 1000,
        currentValue: 43,
        remaining: 957,
        percentage: 4,
        nextResetTime: 1784269055973,
        usageDetails: [
          { modelCode: "search-prime", usage: 34 },
          { modelCode: "web-reader", usage: 9 },
          { modelCode: "zread", usage: 0 },
        ],
      },
      {
        type: "TOKENS_LIMIT",
        unit: 3,
        number: 5,
        percentage: 0,
      },
      {
        type: "TOKENS_LIMIT",
        unit: 6,
        number: 1,
        percentage: 87,
        nextResetTime: 1783491455996,
      },
    ],
    level: "pro",
  },
  success: true,
};

describe("getGlmTeamQuotaConfig", () => {
  it("returns none when org/project are missing", () => {
    assert.deepEqual(getGlmTeamQuotaConfig({}), { state: "none" });
  });

  it("returns configured when both org and project are present", () => {
    assert.deepEqual(
      getGlmTeamQuotaConfig({
        glmOrganizationId: "org-abc",
        glmProjectId: "proj_xyz",
      }),
      {
        state: "configured",
        organizationId: "org-abc",
        projectId: "proj_xyz",
      }
    );
  });

  it("accepts bigmodel* aliases", () => {
    assert.deepEqual(
      getGlmTeamQuotaConfig({
        bigmodelOrganization: "org-alias",
        bigmodelProject: "proj-alias",
      }),
      {
        state: "configured",
        organizationId: "org-alias",
        projectId: "proj-alias",
      }
    );
  });

  it("returns incomplete when only one field is set", () => {
    assert.deepEqual(getGlmTeamQuotaConfig({ glmOrganizationId: "org-only" }), {
      state: "incomplete",
      missing: "glmProjectId",
    });
  });
});

describe("buildGlmQuotaFetch", () => {
  it("uses personal quota URL without team headers by default", () => {
    const { url, headers } = buildGlmQuotaFetch("glm-key", { apiRegion: "china" });
    assert.equal(url, "https://open.bigmodel.cn/api/monitor/usage/quota/limit");
    assert.equal(headers.Authorization, "Bearer glm-key");
    assert.equal(headers["bigmodel-organization"], undefined);
    assert.equal(headers["bigmodel-project"], undefined);
    assert.equal(url.includes("type=2"), false);
  });

  it("uses team quota URL and headers when org/project are configured", () => {
    const { url, headers } = buildGlmQuotaFetch("glm-key", {
      apiRegion: "china",
      glmOrganizationId: "org-team",
      glmProjectId: "proj_team",
    });
    assert.equal(url, "https://open.bigmodel.cn/api/monitor/usage/quota/limit?type=2");
    assert.equal(headers.Authorization, "Bearer glm-key");
    assert.equal(headers["bigmodel-organization"], "org-team");
    assert.equal(headers["bigmodel-project"], "proj_team");
  });

  it("uses international team quota URL when apiRegion is international", () => {
    const { url } = buildGlmQuotaFetch("glm-key", {
      apiRegion: "international",
      glmOrganizationId: "org-team",
      glmProjectId: "proj_team",
    });
    assert.equal(url, "https://api.z.ai/api/monitor/usage/quota/limit?type=2");
  });
});

describe("assignGlmTeamQuotaProviderData", () => {
  it("writes canonical keys and strips legacy alias fields", () => {
    const target: Record<string, unknown> = {
      bigmodelOrganization: "org-alias",
      bigmodelProject: "proj-alias",
      glmOrganization: "org-legacy",
      glmProject: "proj-legacy",
    };

    assignGlmTeamQuotaProviderData(
      true,
      { glmOrganizationId: "org-canonical", glmProjectId: "proj-canonical" },
      target
    );

    assert.equal(target.glmOrganizationId, "org-canonical");
    assert.equal(target.glmProjectId, "proj-canonical");
    assert.equal(target.bigmodelOrganization, undefined);
    assert.equal(target.bigmodelProject, undefined);
    assert.equal(target.glmOrganization, undefined);
    assert.equal(target.glmProject, undefined);
  });

  it("treats missing form values as blank strings", () => {
    const target: Record<string, unknown> = {
      glmOrganizationId: "org-old",
      glmProjectId: "proj-old",
    };

    assignGlmTeamQuotaProviderData(
      true,
      {
        glmOrganizationId: undefined as unknown as string,
        glmProjectId: null as unknown as string,
      },
      target
    );

    assert.equal(getGlmTeamQuotaConfig(target).state, "none");
    assert.equal(target.glmOrganizationId, undefined);
    assert.equal(target.glmProjectId, undefined);
  });

  it("clears all team quota keys when both form fields are blank", () => {
    const target: Record<string, unknown> = {
      glmOrganizationId: "org-old",
      glmProjectId: "proj-old",
      bigmodelOrganization: "org-alias",
      bigmodelProject: "proj-alias",
    };

    assignGlmTeamQuotaProviderData(true, { glmOrganizationId: "", glmProjectId: "" }, target);

    assert.equal(getGlmTeamQuotaConfig(target).state, "none");
    assert.equal(target.glmOrganizationId, undefined);
    assert.equal(target.glmProjectId, undefined);
    assert.equal(target.bigmodelOrganization, undefined);
    assert.equal(target.bigmodelProject, undefined);
  });
});

describe("getGlmUsage team quota parsing", () => {
  it("parses numeric percentage fields from team quota response", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url, init = {}) => {
      assert.match(String(url), /open\.bigmodel\.cn\/api\/monitor\/usage\/quota\/limit\?type=2/);
      assert.equal(
        (init as { headers: Record<string, string> }).headers["bigmodel-organization"],
        "org-team"
      );
      assert.equal(
        (init as { headers: Record<string, string> }).headers["bigmodel-project"],
        "proj_team"
      );
      return new Response(JSON.stringify(TEAM_QUOTA_RESPONSE), { status: 200 });
    };

    try {
      const usage = await getGlmUsage("glm-cn-key", {
        apiRegion: "china",
        glmOrganizationId: "org-team",
        glmProjectId: "proj_team",
      });

      assert.equal(usage.plan, "Pro");
      assert.equal(usage.quotas.session.remaining, 100);
      assert.equal(usage.quotas.weekly.remaining, 13);
      assert.equal(usage.quotas.mcp_monthly.remaining, 957);
      assert.equal(usage.quotas.mcp_monthly.remainingPercentage, 96);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("returns a hint message for team keys missing org/project", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({
          code: 500,
          msg: "当前用户不存在coding plan",
          success: false,
        }),
        { status: 200 }
      );

    try {
      const usage = await getGlmUsage("glm-cn-key", { apiRegion: "china" });
      assert.match(String(usage.message), /team plan/i);
      assert.match(String(usage.message), /Organization ID and Project ID/i);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("returns incomplete message when only organization is configured", async () => {
    const usage = await getGlmUsage("glm-cn-key", {
      apiRegion: "china",
      glmOrganizationId: "org-only",
    });
    assert.match(String(usage.message), /Project ID/i);
  });

  it("returns upstream message when configured team quota request fails", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({
          code: 403,
          msg: "project mismatch",
          success: false,
        }),
        { status: 200 }
      );

    try {
      const usage = await getGlmUsage("glm-cn-key", {
        apiRegion: "china",
        glmOrganizationId: "org-team",
        glmProjectId: "proj_team",
      });
      assert.equal(usage.message, "project mismatch");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("returns upstream message for personal-plan failures instead of throwing", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({
          code: 429,
          msg: "rate limited",
          success: false,
        }),
        { status: 200 }
      );

    try {
      const usage = await getGlmUsage("glm-key", { apiRegion: "international" });
      assert.equal(usage.message, "rate limited");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("throws when quota API returns non-object JSON", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => new Response("null", { status: 200 });

    try {
      await assert.rejects(
        () => getGlmUsage("glm-cn-key", { apiRegion: "china" }),
        /Invalid JSON response from GLM quota API/
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("suggests team quota fields for chinese team-plan error text", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({
          code: 500,
          msg: "当前用户不存在coding plan",
          success: false,
        }),
        { status: 200 }
      );

    try {
      const usage = await getGlmUsage("glm-cn-key", { apiRegion: "china" });
      assert.match(String(usage.message), /team plan/i);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
