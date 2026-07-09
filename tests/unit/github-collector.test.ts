/**
 * Tests for githubCollector.ts — GitHub agent skill discovery, scoring, scanning, and installation.
 * Uses node:test (Node.js built-in test runner), matching the project convention.
 */
import test from "node:test";
import assert from "node:assert/strict";

const {
  scoreRepo,
  scanText,
  inferCategory,
  resolveInstallPath,
  QUERY_STRATEGIES,
  INSTALL_TARGETS,
} = await import("../../src/lib/skills/githubCollector.ts");

// ─── scoreRepo ─────────────────────────────────────────────────────────────

void test("scoreRepo: returns 0.98 for gold repos", () => {
  const score = scoreRepo({
    fullName: "addyosmani/agent-skills",
    description: "Collection of agent skills",
    stars: 100,
    forks: 10,
    hasLicense: true,
    topics: [],
  });
  assert.equal(score, 0.98);
});

void test("scoreRepo: returns reasonable score for good agent repos", () => {
  const score = scoreRepo({
    fullName: "user/awesome-agent-skills",
    description: "Curated list of AI agent skills for LLMs",
    stars: 5000,
    forks: 200,
    hasLicense: true,
    topics: ["agent", "ai-agent", "mcp"],
  });
  assert.ok(score > 0.5);
  assert.ok(score <= 1.0);
});

void test("scoreRepo: returns low score for unrelated repos", () => {
  const score = scoreRepo({
    fullName: "user/todo-app",
    description: "A simple todo list app built with react",
    stars: 5,
    forks: 1,
    hasLicense: false,
    topics: ["javascript", "react"],
  });
  assert.ok(score < 0.5);
});

void test("scoreRepo: boosts score for skill-file name signals", () => {
  const score = scoreRepo({
    fullName: "user/agent-skill-pack",
    description: "Agent skill pack for codex",
    stars: 100,
    forks: 30,
    hasLicense: true,
    topics: ["agent"],
  });
  assert.ok(score > 0.3);
  assert.ok(score < 0.98);
});

void test("scoreRepo: applies stars bonus logarithmically", () => {
  const low = scoreRepo({
    fullName: "user/skill-repo",
    description: "Agent skill",
    stars: 50,
    forks: 5,
    hasLicense: false,
    topics: [],
  });
  const high = scoreRepo({
    fullName: "user/skill-repo",
    description: "Agent skill",
    stars: 10000,
    forks: 500,
    hasLicense: false,
    topics: [],
  });
  assert.ok(high > low);
  assert.ok(high < 0.98);
});

void test("scoreRepo: caps stars for awesome lists", () => {
  const score = scoreRepo({
    fullName: "user/awesome-list",
    description: "A curated list of awesome things",
    stars: 50000,
    forks: 2000,
    hasLicense: true,
    topics: [],
  });
  // awesome list without skill file signals should be capped below gold-repo threshold
  assert.ok(score < 0.9);
});

void test("scoreRepo: handles zero stars gracefully", () => {
  const score = scoreRepo({
    fullName: "user/new-repo",
    description: "Brand new agent skill",
    stars: 0,
    forks: 0,
    hasLicense: false,
    topics: [],
  });
  assert.ok(score >= 0);
  assert.ok(score < 0.5);
});

// ─── scanText ──────────────────────────────────────────────────────────────

void test("scanText: empty findings for clean content", () => {
  const findings = scanText("print('hello world')\nconst x = 1;\n", "test.md");
  assert.equal(findings.length, 0);
});

void test("scanText: detects eval(base64) pattern", () => {
  const findings = scanText('eval(base64_decode("dGVzdA=="))', "evil.md");
  assert.ok(findings.length > 0);
  assert.ok(findings[0].pattern.includes("eval(base64)"));
  assert.equal(findings[0].file, "evil.md");
});

void test("scanText: detects hardcoded private keys", () => {
  const content =
    "-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA...\n-----END RSA PRIVATE KEY-----";
  const findings = scanText(content, "leaked.md");
  assert.ok(findings.some((f) => f.pattern.includes("Private key")));
});

void test("scanText: detects API key patterns", () => {
  const findings = scanText('const api_key = "abc123def456";', "config.js");
  assert.ok(findings.some((f) => f.pattern.includes("API key")));
});

void test("scanText: detects multiple patterns in one file", () => {
  const content = `
    const api_key = "12345";
    password = "secret123";
    eval(base64_decode("test"));
  `;
  const findings = scanText(content, "danger.js");
  assert.ok(findings.length >= 3);
});

void test("scanText: provides context around the match", () => {
  const findings = scanText("some text before api_key = 'abc123' some text after", "test.js");
  assert.ok(findings.length > 0);
  assert.ok(findings[0].context.length > 15);
});

void test("scanText: ignores safe content with keyword-like patterns", () => {
  const findings = scanText("using password hashing for security\napi version 2.0", "safe.txt");
  assert.equal(findings.length, 0);
});

void test("scanText: detects OpenAI key pattern (sk- alphanumeric)", () => {
  // OpenAI keys: sk- followed by 20+ alphanumeric chars (no hyphens inside the token part)
  const findings = scanText('OPENAI_API_KEY="sk-abcdefghijklmnopqrstuvwxyz1234567890"', ".env");
  assert.ok(findings.some((f) => f.pattern.includes("OpenAI API key")));
});

void test("scanText: detects GitHub PAT pattern (ghp_)", () => {
  const findings = scanText("GITHUB_TOKEN=ghp_abcdefghijklmnopqrstuvwxyz1234567890123456", ".env");
  assert.ok(findings.some((f) => f.pattern.includes("GitHub PAT")));
});

// ─── inferCategory ─────────────────────────────────────────────────────────

void test("inferCategory: returns 'imported-github' for generic skills", () => {
  const cat = inferCategory("user/some-skill", "A useful skill for agents");
  assert.equal(cat, "imported-github");
});

void test("inferCategory: detects security-related skills", () => {
  const cat = inferCategory("user/sec-scan", "Security vulnerability scanner for code");
  assert.equal(cat, "security");
});

void test("inferCategory: detects data-science skills", () => {
  const cat = inferCategory("user/ml-pipeline", "ML model training and data analytics");
  assert.equal(cat, "data-science");
});

void test("inferCategory: detects devops skills", () => {
  const cat = inferCategory("user/deploy-tool", "Docker deployment pipeline for CI/CD");
  assert.equal(cat, "devops");
});

void test("inferCategory: detects creative skills", () => {
  const cat = inferCategory("user/art-gen", "AI image design generator");
  assert.equal(cat, "creative");
});

void test("inferCategory: detects productivity skills", () => {
  const cat = inferCategory("user/email-assistant", "Email scheduling and document tool");
  assert.equal(cat, "productivity");
});

void test("inferCategory: detects research skills", () => {
  const cat = inferCategory("user/paper-finder", "arXiv academic paper search");
  assert.equal(cat, "research");
});

void test("inferCategory: detects software-development skills", () => {
  const cat = inferCategory("user/code-reviewer", "Automated code review and debugging");
  assert.equal(cat, "software-development");
});

void test("inferCategory: detects media skills (youtube + transcript keywords)", () => {
  const cat = inferCategory("user/yt-dl", "YouTube transcript downloader");
  assert.equal(cat, "media");
});

// ─── resolveInstallPath ────────────────────────────────────────────────────

void test("resolveInstallPath: resolves to a valid path string", () => {
  const origHome = process.env.HOME;
  process.env.HOME = "/home/testuser";
  try {
    const path = resolveInstallPath("hermes", "sec-scan", "A security scanner");
    // The path should start with the HOME directory and contain the category
    assert.ok(path.startsWith("/home/testuser"));
    assert.ok(path.includes("security"));
    assert.ok(path.includes("hermes/skills"));
  } finally {
    process.env.HOME = origHome;
  }
});

void test("resolveInstallPath: infers category from description", () => {
  const origHome = process.env.HOME;
  process.env.HOME = "/home/testuser";
  try {
    const path = resolveInstallPath("claude", "data-pipeline", "Data science tool");
    assert.ok(path.includes("data-science"));
  } finally {
    process.env.HOME = origHome;
  }
});

void test("resolveInstallPath: uses category for unknown target and throws", () => {
  assert.throws(() => resolveInstallPath("unknown", "x", ""), Error);
});

void test("resolveInstallPath: different targets produce different base paths", () => {
  const origHome = process.env.HOME;
  process.env.HOME = "/home/testuser";
  try {
    const hermesPath = resolveInstallPath("hermes", "my-skill", "generic");
    const claudePath = resolveInstallPath("claude", "my-skill", "generic");
    assert.notEqual(hermesPath, claudePath);
    assert.ok(hermesPath.includes("AppData/Local/hermes"));
    assert.ok(claudePath.includes(".claude"));
  } finally {
    process.env.HOME = origHome;
  }
});

// ─── QUERY_STRATEGIES structural sanity ────────────────────────────────────

void test("QUERY_STRATEGIES: has file, name, and description categories", () => {
  assert.ok(Array.isArray(QUERY_STRATEGIES.file));
  assert.ok(Array.isArray(QUERY_STRATEGIES.name));
  assert.ok(Array.isArray(QUERY_STRATEGIES.description));
});

void test("QUERY_STRATEGIES: has at least 10 file-name queries", () => {
  assert.ok(QUERY_STRATEGIES.file.length >= 10);
});

void test("QUERY_STRATEGIES: all queries are non-empty strings", () => {
  const all = [...QUERY_STRATEGIES.file, ...QUERY_STRATEGIES.name, ...QUERY_STRATEGIES.description];
  assert.ok(all.length > 15);
  for (const q of all) {
    assert.equal(typeof q, "string");
    assert.ok(q.length > 5);
  }
});

void test("QUERY_STRATEGIES: each file query ends with a star threshold", () => {
  for (const q of QUERY_STRATEGIES.file) {
    assert.ok(/stars:>=\d+/.test(q));
  }
});

// ─── INSTALL_TARGETS ────────────────────────────────────────────────────────

void test("INSTALL_TARGETS: includes all expected agent targets", () => {
  assert.ok(INSTALL_TARGETS.includes("hermes"));
  assert.ok(INSTALL_TARGETS.includes("claude"));
  assert.ok(INSTALL_TARGETS.includes("gemini"));
  assert.ok(INSTALL_TARGETS.includes("opencode"));
});
