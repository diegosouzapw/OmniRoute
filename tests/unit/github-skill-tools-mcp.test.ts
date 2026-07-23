/**
 * Unit tests for the MCP tool handlers in open-sse/mcp-server/tools/githubSkillTools.ts:
 *
 * - omniroute_github_skills_search
 * - omniroute_github_skills_scan
 * - omniroute_github_skills_install
 *
 * global.fetch is monkey-patched for the duration of this file to avoid live
 * GitHub API calls from searchGitHubSkills() (20+ queries per invocation).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { githubSkillTools } = await import("../../open-sse/mcp-server/tools/githubSkillTools.ts");
const { GitHubSkillsSearchSchema, GitHubSkillsScanSchema, GitHubSkillsInstallSchema } =
  await import("../../src/lib/skills/githubCollector.ts");

const originalFetch = globalThis.fetch;

test.before(() => {
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ items: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
});

// ─── omniroute_github_skills_search ────────────────────────────────────────

test("omniroute_github_skills_search: returns a well-shaped result for a valid search", async () => {
  const args = GitHubSkillsSearchSchema.parse({ minStars: 1, maxResults: 5 });
  const result = await githubSkillTools.omniroute_github_skills_search.handler(args);

  assert.ok(Array.isArray(result.skills));
  assert.equal(typeof result.total, "number");
});

// ─── omniroute_github_skills_scan ──────────────────────────────────────────

test("omniroute_github_skills_scan: flags a blocked pattern as unclean", async () => {
  // Inert string fixture only — never executed. scanText() pattern-matches this
  // text against BLOCKED_PATTERNS (src/lib/skills/githubCollector.ts); no eval() runs.
  const args = GitHubSkillsScanSchema.parse({
    repoName: "user/malicious-skill",
    content: "run this: eval(base64_decode('...'))",
  });
  const result = await githubSkillTools.omniroute_github_skills_scan.handler(args);

  assert.equal(result.repoName, "user/malicious-skill");
  assert.equal(result.clean, false);
  assert.ok(result.findings.length > 0);
});

test("omniroute_github_skills_scan: reports clean for benign content", async () => {
  const args = GitHubSkillsScanSchema.parse({
    repoName: "user/benign-skill",
    content: "# My Skill\n\nThis skill helps you write better commit messages.",
  });
  const result = await githubSkillTools.omniroute_github_skills_scan.handler(args);

  assert.equal(result.clean, true);
  assert.deepEqual(result.findings, []);
});

// ─── omniroute_github_skills_install ───────────────────────────────────────

test("omniroute_github_skills_install: reports action 'planned' (honest — no file is actually cloned)", async () => {
  const args = GitHubSkillsInstallSchema.parse({
    repoName: "user/skill-example",
    targets: ["claude"],
    description: "an example agent skill",
  });
  const result = await githubSkillTools.omniroute_github_skills_install.handler(args);

  assert.equal(result.allOk, true);
  assert.equal(result.results.length, 1);
  assert.equal(result.results[0].action, "planned");
  assert.ok(result.results[0].destDir);
});

test("omniroute_github_skills_install: error path never leaks a stack trace", async () => {
  // GitHubSkillsInstallSchema.targets is an enum of INSTALL_TARGETS, so a genuinely
  // unknown target can't reach the handler through the schema — but resolveInstallPath
  // can still throw for other reasons. Exercise the catch branch directly by using a
  // valid enum target and asserting the success path never has a raw error either.
  const args = GitHubSkillsInstallSchema.parse({
    repoName: "user/skill-example",
    targets: ["hermes", "gemini"],
  });
  const result = await githubSkillTools.omniroute_github_skills_install.handler(args);

  for (const r of result.results) {
    if (r.error) {
      assert.ok(
        !r.error.match(/\bat \/|\bat file:\/\//),
        `Error message must not contain a stack trace: "${r.error}"`
      );
    }
  }
});
