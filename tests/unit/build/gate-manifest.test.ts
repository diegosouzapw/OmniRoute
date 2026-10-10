import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test, { type TestContext } from "node:test";
import {
  readManifest,
  validateManifest,
  resolveProfile,
} from "../../../scripts/quality/gate-manifest.mjs";

function fixture() {
  const scripts = { "check:a": "bun scripts/check/a.ts", "test:b": "node --test b.ts" };
  const manifest = {
    schemaVersion: 1,
    aliases: Object.entries(scripts).map(([name, command]) => ({
      name,
      command,
      disposition: "separately-invoked",
    })),
    profiles: {
      scan: { description: "Focused scan, not release acceptance", aliases: ["check:a"] },
    },
  };
  return { scripts, manifest };
}

test("manifest resolves the npm entrypoint, preserving its chosen runtime", () => {
  const { scripts, manifest } = fixture();
  assert.deepEqual(validateManifest(manifest, scripts), []);
  assert.deepEqual(resolveProfile(manifest, scripts, "scan"), [
    { name: "check:a", cmd: ["npm", "run", "--silent", "check:a"] },
  ]);
});

test("new validation aliases cannot silently evade the inventory", () => {
  const { scripts, manifest } = fixture();
  assert.match(
    validateManifest(manifest, { ...scripts, "check:new": "node new.mjs" }).join(),
    /unmapped.*check:new/
  );
});

test("removed aliases and changed commands invalidate the manifest", () => {
  const { manifest } = fixture();
  const errors = validateManifest(manifest, { "check:a": "node a.ts" }).join();
  assert.match(errors, /command.*check:a/);
  assert.match(errors, /removed.*test:b/);
});

test("duplicate inventory entries and profile members are rejected", () => {
  const { scripts, manifest } = fixture();
  manifest.aliases.push(manifest.aliases[0]);
  manifest.profiles.scan.aliases.push("check:a");
  assert.match(validateManifest(manifest, scripts).join(), /duplicate alias/);
  assert.match(validateManifest(manifest, scripts).join(), /duplicate profile member/);
});

test("unknown or empty profiles never report a successful scan", () => {
  const { scripts, manifest } = fixture();
  assert.throws(() => resolveProfile(manifest, scripts, "typo"), /unknown profile/);
  manifest.profiles.scan.aliases = [];
  assert.throws(() => resolveProfile(manifest, scripts, "scan"), /empty profile/);
});

test("maintenance commands cannot be selected as read-only gates", () => {
  const { scripts, manifest } = fixture();
  manifest.aliases[0].disposition = "maintenance";
  assert.throws(() => resolveProfile(manifest, scripts, "scan"), /maintenance/);
});

test("schema and unrecognized dispositions fail closed", () => {
  const { scripts, manifest } = fixture();
  manifest.schemaVersion = 99;
  manifest.aliases[0].disposition = "trust-me";
  assert.match(validateManifest(manifest, scripts).join(), /schema/);
  assert.match(validateManifest(manifest, scripts).join(), /disposition/);
});

test("the committed inventory covers current scripts without command drift", () => {
  const manifest = JSON.parse(readFileSync("config/quality/gate-manifest.json", "utf8"));
  const { scripts } = JSON.parse(readFileSync("package.json", "utf8"));
  assert.deepEqual(validateManifest(manifest, scripts), []);
  const full = resolveProfile(manifest, scripts, "quality-scan");
  const fast = resolveProfile(manifest, scripts, "quality-scan-fast");
  assert.ok(full.length > fast.length);
  assert.ok(fast.every((gate) => full.some((other) => other.name === gate.name)));
  assert.ok(full.some((gate) => gate.name === "check:gate-manifest"));
});

test("real aggregator list mode uses the manifest without running any gate", () => {
  const manifest = JSON.parse(readFileSync("config/quality/gate-manifest.json", "utf8"));
  for (const [flags, profile] of [
    [[], "quality-scan"],
    [["--fast"], "quality-scan-fast"],
  ] as const) {
    const actual = JSON.parse(
      execFileSync(process.execPath, ["scripts/quality/run-all-gates.mjs", ...flags, "--list"], {
        encoding: "utf8",
        timeout: 15_000,
      })
    );
    assert.equal(actual.profile, profile);
    assert.deepEqual(actual.aliases, manifest.profiles[profile].aliases);
    assert.equal(actual.releaseAcceptance, false);
  }
});

test("the static scan uses the same frozen cycle ratchet as CI", () => {
  const manifest = JSON.parse(readFileSync("config/quality/gate-manifest.json", "utf8"));
  const { scripts } = JSON.parse(readFileSync("package.json", "utf8"));
  const full = resolveProfile(manifest, scripts, "quality-scan");
  assert.ok(full.some((gate) => gate.name === "check:cycles:ratchet"));
  assert.equal(
    full.some((gate) => gate.name === "check:cycles"),
    false
  );
  assert.match(readFileSync(".github/workflows/ci.yml", "utf8"), /npm run check:cycles:ratchet/);
  assert.equal(scripts["check:cycles:ratchet"], "node scripts/check/check-cycles.mjs --ratchet");
});

function admissionFixture(domains: unknown = ["provider"]) {
  return {
    schemaVersion: 1,
    profiles: Object.fromEntries(
      ["ci", "quality"].map((profile) => [
        profile,
        {
          checkName: `Gate / ${profile}`,
          jobs: { sample: { when: "code", disposition: "required", domains } },
        },
      ])
    ),
  };
}

function linkedFixture(t: TestContext, policy: unknown = admissionFixture()) {
  const root = mkdtempSync(join(tmpdir(), "gate-domains-16075-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const { scripts, manifest } = fixture();
  const linkedManifest = { ...manifest, admissionPolicy: "config/quality/admission-policy.json" };
  mkdirSync(join(root, "config/quality"), { recursive: true });
  writeFileSync(join(root, "package.json"), JSON.stringify({ scripts }));
  writeFileSync(join(root, "config/quality/gate-manifest.json"), JSON.stringify(linkedManifest));
  const policyPath = join(root, linkedManifest.admissionPolicy);
  writeFileSync(policyPath, JSON.stringify(policy));
  return { root, policyPath, manifest: linkedManifest, scripts };
}

test("linked admission domains preserve the readManifest return contract", (t) => {
  const { root, manifest, scripts } = linkedFixture(t);
  assert.deepEqual(readManifest(root), { manifest, scripts });
});

for (const [label, domains] of [
  ["missing", undefined],
  ["empty", []],
  ["unknown", ["catalog", "imaginary"]],
  ["duplicate", ["provider", "provider"]],
  ["not an array", "provider"],
  ["not a domain string", [null]],
] as const) {
  test(`linked admission rejects ${label} domains before accepting an inventory`, (t) => {
    const policy = admissionFixture();
    policy.profiles.ci.jobs.sample.domains = domains;
    const { root } = linkedFixture(t, policy);
    assert.throws(() => readManifest(root), /domains.*ci\/sample/);
  });
}

for (const [label, policy] of [
  ["unsupported schema", { ...admissionFixture(), schemaVersion: 2 }],
  ["missing profiles", { schemaVersion: 1 }],
  ["missing quality", { schemaVersion: 1, profiles: { ci: admissionFixture().profiles.ci } }],
  [
    "unknown profile",
    { schemaVersion: 1, profiles: { ...admissionFixture().profiles, extra: {} } },
  ],
  [
    "empty jobs",
    { schemaVersion: 1, profiles: { ...admissionFixture().profiles, ci: { jobs: {} } } },
  ],
  [
    "array jobs",
    { schemaVersion: 1, profiles: { ...admissionFixture().profiles, ci: { jobs: [] } } },
  ],
] as const) {
  test(`linked admission rejects ${label}`, (t) => {
    const { root } = linkedFixture(t, policy);
    assert.throws(() => readManifest(root), /admission/);
  });
}

test("linked admission validates the quality profile as well as CI", (t) => {
  const policy = admissionFixture();
  policy.profiles.quality.jobs.sample.domains = [];
  const { root } = linkedFixture(t, policy);
  assert.throws(() => readManifest(root), /domains.*quality\/sample/);
});

test("linked admission rejects absent or malformed policy files", (t) => {
  const { root, policyPath } = linkedFixture(t);
  writeFileSync(policyPath, "{invalid JSON");
  assert.throws(() => readManifest(root), SyntaxError);
  rmSync(policyPath);
  assert.throws(() => readManifest(root), /ENOENT/);
});

test("admission references cannot bypass the declared repository policy", (t) => {
  const { root, manifest } = linkedFixture(t);
  for (const admissionPolicy of [undefined, "", "../outside.json", "/tmp/outside.json"]) {
    writeFileSync(
      join(root, "config/quality/gate-manifest.json"),
      JSON.stringify({ ...manifest, admissionPolicy })
    );
    assert.throws(() => readManifest(root), /admission policy reference/);
  }
});

test("inventory CLI validates domains without node_modules before npm ci", (t) => {
  const { root, policyPath } = linkedFixture(t);
  mkdirSync(join(root, "scripts/quality"), { recursive: true });
  for (const name of ["gate-manifest.mjs", "classify-pr-changes.mjs"]) {
    copyFileSync(
      new URL(`../../../scripts/quality/${name}`, import.meta.url),
      join(root, "scripts/quality", name)
    );
  }
  assert.equal(existsSync(join(root, "node_modules")), false);
  const invoke = () =>
    spawnSync(process.execPath, ["scripts/quality/gate-manifest.mjs"], {
      cwd: root,
      encoding: "utf8",
      timeout: 15_000,
    });
  const valid = invoke();
  assert.equal(valid.status, 0, valid.stderr);
  assert.deepEqual(JSON.parse(valid.stdout), {
    schemaVersion: 1,
    aliases: 2,
    profiles: { scan: 1 },
    releaseAcceptance: false,
  });
  writeFileSync(policyPath, JSON.stringify(admissionFixture(["imaginary"])));
  const invalid = invoke();
  assert.equal(invalid.status, 1, invalid.stderr);
  assert.match(invalid.stderr, /domains/);
});
