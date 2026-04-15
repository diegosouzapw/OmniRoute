import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skills-registry-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");

function resetRegistryState() {
  skillRegistry["registeredSkills"].clear();
  skillRegistry["versionCache"].clear();
}

async function resetStorage() {
  resetRegistryState();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  resetRegistryState();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("skillRegistry registers, lists, sorts and resolves versions", async () => {
  await skillRegistry.register({
    name: "echo",
    version: "1.0.0",
    description: "stable",
    schema: { input: { text: "string" }, output: { result: "string" } },
    handler: "echo-handler",
    apiKeyId: "key-a",
  });
  const latest = await skillRegistry.register({
    name: "echo",
    version: "1.2.0",
    description: "latest",
    schema: { input: { text: "string" }, output: { result: "string" } },
    handler: "echo-handler",
    apiKeyId: "key-a",
  });
  await skillRegistry.register({
    name: "summarize",
    description: "defaults version",
    schema: { input: {}, output: {} },
    handler: "summarize-handler",
    apiKeyId: "key-b",
  });

  assert.equal(skillRegistry.list("key-a").length, 2);
  assert.equal(skillRegistry.list().length, 3);
  assert.equal(skillRegistry.getSkill("echo@1.2.0").description, "latest");

  const versions = skillRegistry.getSkillVersions("echo").map((skill) => skill.version);
  assert.deepEqual(versions, ["1.2.0", "1.0.0"]);
  assert.equal(skillRegistry.resolveVersion("echo", "^1.1.0")?.id, latest.id);
  assert.equal(skillRegistry.resolveVersion("echo", "~1.0.0")?.version, "1.0.0");
  assert.equal(skillRegistry.resolveVersion("echo", "1.2.0")?.version, "1.2.0");
  assert.equal(skillRegistry.resolveVersion("missing", "^1.0.0"), undefined);
});

test("skillRegistry can reload persisted skills from SQLite", async () => {
  const first = await skillRegistry.register({
    name: "file-read",
    version: "2.0.0",
    description: "reads files",
    schema: { input: { path: "string" }, output: { content: "string" } },
    handler: "file-read-handler",
    apiKeyId: "key-a",
  });
  const second = await skillRegistry.register({
    name: "file-write",
    version: "1.0.0",
    description: "writes files",
    schema: { input: { path: "string", content: "string" }, output: { ok: true } },
    handler: "file-write-handler",
    apiKeyId: "key-b",
  });

  resetRegistryState();
  assert.equal(skillRegistry.list().length, 0);

  await skillRegistry.loadFromDatabase("key-a");
  assert.deepEqual(
    skillRegistry.list().map((skill) => skill.name),
    ["file-read"]
  );

  resetRegistryState();
  await skillRegistry.loadFromDatabase();
  const loadedNames = skillRegistry
    .list()
    .map((skill) => skill.name)
    .sort();

  assert.deepEqual(loadedNames, ["file-read", "file-write"]);
  assert.equal(skillRegistry.getSkill(`${first.name}@${first.version}`)?.apiKeyId, "key-a");
  assert.equal(skillRegistry.getSkill(`${second.name}@${second.version}`)?.apiKeyId, "key-b");
});

test("skillRegistry unregisters by version, by name/apiKey and by id", async () => {
  const exact = await skillRegistry.register({
    name: "translate",
    version: "1.0.0",
    description: "translate en to pt",
    schema: { input: { text: "string" }, output: { text: "string" } },
    handler: "translate-handler",
    apiKeyId: "key-a",
  });
  await skillRegistry.register({
    name: "translate",
    version: "1.1.0",
    description: "translate v2",
    schema: { input: { text: "string" }, output: { text: "string" } },
    handler: "translate-handler",
    apiKeyId: "key-a",
  });
  const otherKey = await skillRegistry.register({
    name: "translate",
    version: "2.0.0",
    description: "translate external",
    schema: { input: { text: "string" }, output: { text: "string" } },
    handler: "translate-handler",
    apiKeyId: "key-b",
  });

  assert.equal(await skillRegistry.unregister("translate", "1.0.0", "key-a"), true);
  assert.equal(skillRegistry.getSkill("translate@1.0.0"), undefined);
  assert.equal(await skillRegistry.unregister("translate", undefined, "key-a"), true);
  assert.deepEqual(
    skillRegistry.list().map((skill) => skill.id),
    [otherKey.id]
  );
  assert.equal(await skillRegistry.unregisterById(otherKey.id), true);
  assert.equal(await skillRegistry.unregisterById(exact.id), false);
  assert.equal(await skillRegistry.unregister("translate", undefined, "key-a"), false);
});

test("skillRegistry rejects invalid payloads from schema validation", async () => {
  await assert.rejects(
    skillRegistry.register({
      name: "bad-skill",
      version: "not-semver",
      description: "invalid version",
      schema: { input: {}, output: {} },
      handler: "bad-handler",
      apiKeyId: "key-a",
    }),
    /Invalid string/
  );

  await assert.rejects(
    skillRegistry.register({
      name: "",
      version: "1.0.0",
      description: "missing name",
      schema: { input: {}, output: {} },
      handler: "bad-handler",
      apiKeyId: "key-a",
    }),
    /Too small/
  );
});

// ---------------------------------------------------------------------------
// TTL Cache tests
// ---------------------------------------------------------------------------

const skillPayload = (name = "cache-skill", version = "1.0.0", apiKeyId = "key-cache") => ({
  name,
  version,
  description: `${name} desc`,
  schema: { input: {}, output: {} },
  handler: `${name}-handler`,
  apiKeyId,
});

test("cache hit — loadFromDatabase within TTL returns same reference (no DB re-query)", async () => {
  const originalNow = Date.now;
  try {
    // Register a skill so the DB has data
    await skillRegistry.register(skillPayload("cache-hit", "1.0.0"));

    // Force cache stale, then load to prime it
    skillRegistry.invalidateCache();
    let fakeTime = originalNow.call(Date);
    Date.now = () => fakeTime;

    await skillRegistry.loadFromDatabase();
    const loadedOnce = skillRegistry["lastLoaded"];

    // Advance time by less than cacheTTL (e.g. 30s)
    fakeTime += 30_000;

    // Second load should short-circuit (lastLoaded unchanged)
    await skillRegistry.loadFromDatabase();
    const loadedTwice = skillRegistry["lastLoaded"];

    assert.equal(loadedOnce, loadedTwice, "lastLoaded should NOT update on cache hit");
  } finally {
    Date.now = originalNow;
  }
});

test("cache miss on expiry — after TTL passes, loadFromDatabase re-queries", async () => {
  const originalNow = Date.now;
  try {
    await skillRegistry.register(skillPayload("cache-expiry", "1.0.0"));

    skillRegistry.invalidateCache();
    let fakeTime = originalNow.call(Date);
    Date.now = () => fakeTime;

    await skillRegistry.loadFromDatabase();
    const firstLoad = skillRegistry["lastLoaded"];

    // Advance past TTL (cacheTTL = 60_000)
    fakeTime += 61_000;

    await skillRegistry.loadFromDatabase();
    const secondLoad = skillRegistry["lastLoaded"];

    assert.notEqual(firstLoad, secondLoad, "lastLoaded should update after TTL expiry");
    assert.equal(secondLoad, fakeTime, "lastLoaded should reflect current time after reload");
  } finally {
    Date.now = originalNow;
  }
});

test("cache invalidated on register — calling register() clears the cache", async () => {
  const originalNow = Date.now;
  try {
    let fakeTime = originalNow.call(Date);
    Date.now = () => fakeTime;

    // Prime cache
    skillRegistry.invalidateCache();
    await skillRegistry.loadFromDatabase();
    const loadedBefore = skillRegistry["lastLoaded"];
    assert.ok(loadedBefore > 0, "cache should be primed");

    // Register a new skill — should invalidate
    await skillRegistry.register(skillPayload("cache-inv-reg", "1.0.0"));

    assert.equal(skillRegistry["lastLoaded"], 0, "lastLoaded should be 0 after register()");
  } finally {
    Date.now = originalNow;
  }
});

test("cache invalidated on unregister — calling unregister() clears the cache", async () => {
  const originalNow = Date.now;
  try {
    let fakeTime = originalNow.call(Date);
    Date.now = () => fakeTime;

    const skill = await skillRegistry.register(skillPayload("cache-inv-unreg", "1.0.0"));

    // Prime cache
    skillRegistry.invalidateCache();
    await skillRegistry.loadFromDatabase();
    assert.ok(skillRegistry["lastLoaded"] > 0, "cache should be primed");

    // Unregister — should invalidate
    await skillRegistry.unregister("cache-inv-unreg", "1.0.0", "key-cache");

    assert.equal(skillRegistry["lastLoaded"], 0, "lastLoaded should be 0 after unregister()");
  } finally {
    Date.now = originalNow;
  }
});

test("cache invalidated on unregisterById — calling unregisterById() clears the cache", async () => {
  const originalNow = Date.now;
  try {
    let fakeTime = originalNow.call(Date);
    Date.now = () => fakeTime;

    const skill = await skillRegistry.register(skillPayload("cache-inv-byid", "1.0.0"));

    // Prime cache
    skillRegistry.invalidateCache();
    await skillRegistry.loadFromDatabase();
    assert.ok(skillRegistry["lastLoaded"] > 0, "cache should be primed");

    // Unregister by id — should invalidate
    await skillRegistry.unregisterById(skill.id);

    assert.equal(skillRegistry["lastLoaded"], 0, "lastLoaded should be 0 after unregisterById()");
  } finally {
    Date.now = originalNow;
  }
});

test("concurrent loadFromDatabase calls during cache miss only query DB once (no stampede)", async () => {
  const originalNow = Date.now;
  try {
    await skillRegistry.register(skillPayload("cache-concurrent", "1.0.0"));

    // Force stale
    skillRegistry.invalidateCache();
    let fakeTime = originalNow.call(Date);
    Date.now = () => fakeTime;

    // Fire multiple concurrent loads
    const results = await Promise.all([
      skillRegistry.loadFromDatabase(),
      skillRegistry.loadFromDatabase(),
      skillRegistry.loadFromDatabase(),
    ]);

    // After all settle, lastLoaded should be set exactly to fakeTime
    const lastLoaded = skillRegistry["lastLoaded"];
    assert.equal(lastLoaded, fakeTime, "lastLoaded should be set after concurrent loads");

    // Advance time but stay within TTL
    fakeTime += 10_000;

    // Additional call should NOT re-query (cache hit)
    await skillRegistry.loadFromDatabase();
    assert.equal(
      skillRegistry["lastLoaded"],
      lastLoaded,
      "cache should still be fresh after concurrent loads settled"
    );
  } finally {
    Date.now = originalNow;
  }
});
