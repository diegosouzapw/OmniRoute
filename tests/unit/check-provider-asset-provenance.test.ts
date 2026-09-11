import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const SCRIPT_PATH = fileURLToPath(
  new URL("../../scripts/check/check-provider-asset-provenance.mjs", import.meta.url)
);
const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));

const SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"></svg>\n';
const SVG_WITH_DOCTYPE = `<?xml version="1.0"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"></svg>
`;

function sha256(value: string | Buffer) {
  return createHash("sha256").update(value).digest("hex");
}

function makeFixture() {
  const root = mkdtempSync(join(tmpdir(), "provider-asset-provenance-"));
  const providersDir = join(root, "public/providers");
  const manifestPath = join(root, "config/quality/provider-assets-provenance.jsonl");
  mkdirSync(providersDir, { recursive: true });
  mkdirSync(join(root, "config/quality"), { recursive: true });
  return { root, providersDir, manifestPath };
}

function writeManifest(
  path: string,
  records: Record<string, unknown>[],
  headerOverrides: Record<string, unknown> = {}
) {
  const header = {
    recordType: "manifest",
    schemaVersion: 1,
    expectedAssetCount: records.filter((record) => record.recordType === "asset").length,
    // HEAD instead of a pinned SHA: the fast-unit shards run on a shallow checkout,
    // where a historical commit object does not exist and the gate would reject
    // the fixture before exercising what the test is about.
    auditedCommit: gitObjectId("HEAD"),
    auditedAt: "2026-08-26",
    legalScope:
      "Provenance records source matching only; it does not establish copyright or trademark clearance.",
    ...headerOverrides,
  };
  writeFileSync(
    path,
    `${[header, ...records].map((record) => JSON.stringify(record)).join("\n")}\n`
  );
}

function unresolvedAsset(path: string, content: string | Buffer = SVG) {
  return {
    recordType: "asset",
    path,
    mediaType: "image/svg+xml",
    sha256: sha256(content),
    provenanceStatus: "unresolved",
    source: null,
    upstreamLicenseClaim: null,
    trademarkClearance: null,
    evidenceNote: "No immutable upstream source is recorded yet.",
  };
}

function provenAsset(path: string, content: string | Buffer = SVG) {
  return {
    ...unresolvedAsset(path, content),
    provenanceStatus: "proven",
    source: {
      kind: "git",
      url: "https://example.invalid/source",
      ref: "a".repeat(40),
      path: "icons/example.svg",
      integrity: `sha256:${sha256(content)}`,
      match: "byte-exact",
    },
    evidenceNote: "Local bytes match an immutable source; no legal clearance is inferred.",
  };
}

function runGate(providersDir: string, manifestPath: string, timeout?: number) {
  return spawnSync(
    process.execPath,
    [SCRIPT_PATH, "--providers-dir", providersDir, "--manifest", manifestPath],
    { encoding: "utf8", timeout }
  );
}

function gitObjectId(revision: string) {
  const result = spawnSync("git", ["-C", REPO_ROOT, "rev-parse", revision], {
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.trim();
}

function gitHasCommit(objectId: string) {
  return (
    spawnSync("git", ["-C", REPO_ROOT, "cat-file", "-e", `${objectId}^{commit}`], {
      encoding: "utf8",
    }).status === 0
  );
}

function isShallowRepository() {
  const result = spawnSync("git", ["-C", REPO_ROOT, "rev-parse", "--is-shallow-repository"], {
    encoding: "utf8",
  });
  return result.status === 0 && result.stdout.trim() === "true";
}

/**
 * A commit whose tree is empty, so every physical provider file is "missing"
 * from its snapshot. Built as a dangling object (no ref is written) so it also
 * works on the shallow checkouts the unit shards use, where the root commit is
 * the grafted HEAD itself and would match the physical snapshot exactly.
 */
function emptyTreeCommit() {
  const tree = spawnSync("git", ["-C", REPO_ROOT, "hash-object", "-w", "-t", "tree", "--stdin"], {
    input: "",
    encoding: "utf8",
  });
  assert.equal(tree.status, 0, tree.stderr);
  const identity = {
    GIT_AUTHOR_NAME: "provenance-fixture",
    GIT_AUTHOR_EMAIL: "provenance-fixture@example.invalid",
    GIT_COMMITTER_NAME: "provenance-fixture",
    GIT_COMMITTER_EMAIL: "provenance-fixture@example.invalid",
  };
  const commit = spawnSync(
    "git",
    [
      "-C",
      REPO_ROOT,
      "commit-tree",
      tree.stdout.trim(),
      "-m",
      "provenance fixture: empty snapshot",
    ],
    { encoding: "utf8", env: { ...process.env, ...identity } }
  );
  assert.equal(commit.status, 0, commit.stderr);
  return commit.stdout.trim();
}

function workflowJob(source: string, name: string) {
  const lines = source.split("\n");
  const start = lines.indexOf(`  ${name}:`);
  assert.notEqual(start, -1, `workflow job ${name} must exist`);
  let end = lines.length;
  for (let index = start + 1; index < lines.length; index++) {
    const line = lines[index];
    if (line.startsWith("  ") && !line.startsWith("   ") && line.endsWith(":")) {
      end = index;
      break;
    }
  }
  return lines.slice(start + 1, end).join("\n");
}

test("provider asset provenance gate rejects a new physical asset without a manifest record", () => {
  const fixture = makeFixture();
  try {
    writeFileSync(join(fixture.providersDir, "registered.svg"), SVG);
    writeFileSync(join(fixture.providersDir, "surprise.svg"), SVG);
    writeManifest(fixture.manifestPath, [unresolvedAsset("public/providers/registered.svg")]);

    const result = runGate(fixture.providersDir, fixture.manifestPath);

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(
      `${result.stdout}\n${result.stderr}`,
      /missing from manifest: public\/providers\/surprise\.svg/
    );
  } finally {
    rmSync(fixture.root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("provider asset provenance gate rejects a symlink that could evade physical coverage", () => {
  const fixture = makeFixture();
  try {
    writeFileSync(join(fixture.providersDir, "registered.svg"), SVG);
    symlinkSync("registered.svg", join(fixture.providersDir, "unregistered-link.svg"));
    writeManifest(fixture.manifestPath, [unresolvedAsset("public/providers/registered.svg")]);

    const result = runGate(fixture.providersDir, fixture.manifestPath);

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(
      `${result.stdout}\n${result.stderr}`,
      /non-regular provider asset entry is not allowed: public\/providers\/unregistered-link\.svg/
    );
  } finally {
    rmSync(fixture.root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("provider asset provenance gate rejects a stale SHA-256", () => {
  const fixture = makeFixture();
  try {
    writeFileSync(join(fixture.providersDir, "registered.svg"), SVG);
    writeManifest(fixture.manifestPath, [
      {
        ...unresolvedAsset("public/providers/registered.svg"),
        sha256: "0".repeat(64),
      },
    ]);

    const result = runGate(fixture.providersDir, fixture.manifestPath);

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(
      `${result.stdout}\n${result.stderr}`,
      /sha256 mismatch: public\/providers\/registered\.svg/
    );
  } finally {
    rmSync(fixture.root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("provider asset provenance gate validates magic MIME instead of trusting the suffix", () => {
  const fixture = makeFixture();
  const jpeg = Buffer.from([0xff, 0xd8, 0xff, 0xd9]);
  try {
    writeFileSync(join(fixture.providersDir, "misleading.png"), jpeg);
    writeManifest(fixture.manifestPath, [
      {
        ...unresolvedAsset("public/providers/misleading.png", jpeg),
        mediaType: "image/png",
      },
    ]);

    const result = runGate(fixture.providersDir, fixture.manifestPath);

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(
      `${result.stdout}\n${result.stderr}`,
      /mediaType mismatch: public\/providers\/misleading\.png \(manifest image\/png, actual image\/jpeg\)/
    );
  } finally {
    rmSync(fixture.root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("provider asset provenance gate does not accept a truncated JPEG prefix", () => {
  const fixture = makeFixture();
  const falseJpeg = Buffer.from([0xff, 0xd8, 0x00]);
  try {
    writeFileSync(join(fixture.providersDir, "truncated.jpg"), falseJpeg);
    writeManifest(fixture.manifestPath, [
      {
        ...unresolvedAsset("public/providers/truncated.jpg", falseJpeg),
        mediaType: "image/jpeg",
      },
    ]);

    const result = runGate(fixture.providersDir, fixture.manifestPath);

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(
      `${result.stdout}\n${result.stderr}`,
      /mediaType mismatch: public\/providers\/truncated\.jpg \(manifest image\/jpeg, actual unknown\)/
    );
  } finally {
    rmSync(fixture.root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("provider asset provenance gate recognizes an SVG with an XML doctype", () => {
  const fixture = makeFixture();
  try {
    writeFileSync(join(fixture.providersDir, "doctype.svg"), SVG_WITH_DOCTYPE);
    writeManifest(fixture.manifestPath, [
      unresolvedAsset("public/providers/doctype.svg", SVG_WITH_DOCTYPE),
    ]);

    const result = runGate(fixture.providersDir, fixture.manifestPath);

    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  } finally {
    rmSync(fixture.root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("provider asset provenance gate scans adversarial SVG comment chains within a fixed bound", () => {
  const fixture = makeFixture();
  const adversarial = `<!--${"--><!--".repeat(50_000)}`;
  try {
    writeFileSync(join(fixture.providersDir, "adversarial.svg"), adversarial);
    writeManifest(fixture.manifestPath, [
      unresolvedAsset("public/providers/adversarial.svg", adversarial),
    ]);

    const result = runGate(fixture.providersDir, fixture.manifestPath, 10_000);

    assert.equal(result.error, undefined, result.error?.message);
    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(
      `${result.stdout}\n${result.stderr}`,
      /mediaType mismatch: public\/providers\/adversarial\.svg \(manifest image\/svg\+xml, actual unknown\)/
    );
  } finally {
    rmSync(fixture.root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("provider asset provenance gate rejects a status that implies legal clearance", () => {
  const fixture = makeFixture();
  try {
    writeFileSync(join(fixture.providersDir, "registered.svg"), SVG);
    writeManifest(fixture.manifestPath, [
      {
        ...unresolvedAsset("public/providers/registered.svg"),
        provenanceStatus: "licensed",
      },
    ]);

    const result = runGate(fixture.providersDir, fixture.manifestPath);

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(
      `${result.stdout}\n${result.stderr}`,
      /invalid provenanceStatus for public\/providers\/registered\.svg: licensed/
    );
  } finally {
    rmSync(fixture.root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("provider asset provenance gate requires an alias record for duplicate content", () => {
  const fixture = makeFixture();
  try {
    writeFileSync(join(fixture.providersDir, "canonical.svg"), SVG);
    writeFileSync(join(fixture.providersDir, "alias.svg"), SVG);
    writeManifest(fixture.manifestPath, [
      unresolvedAsset("public/providers/alias.svg"),
      unresolvedAsset("public/providers/canonical.svg"),
    ]);

    const result = runGate(fixture.providersDir, fixture.manifestPath);

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(
      `${result.stdout}\n${result.stderr}`,
      new RegExp(`duplicate content missing alias record: sha256:${sha256(SVG)}`)
    );
  } finally {
    rmSync(fixture.root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("provider asset provenance gate requires immutable source evidence for proven assets", () => {
  const fixture = makeFixture();
  try {
    writeFileSync(join(fixture.providersDir, "registered.svg"), SVG);
    writeManifest(fixture.manifestPath, [
      {
        ...unresolvedAsset("public/providers/registered.svg"),
        provenanceStatus: "proven",
      },
    ]);

    const result = runGate(fixture.providersDir, fixture.manifestPath);

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(
      `${result.stdout}\n${result.stderr}`,
      /proven asset requires immutable source evidence: public\/providers\/registered\.svg/
    );
  } finally {
    rmSync(fixture.root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("provider asset provenance gate rejects malformed pinned-source integrity", () => {
  const fixture = makeFixture();
  try {
    writeFileSync(join(fixture.providersDir, "registered.svg"), SVG);
    writeManifest(fixture.manifestPath, [
      {
        ...provenAsset("public/providers/registered.svg"),
        source: {
          kind: "npm",
          url: "https://registry.npmjs.org/example/-/example-1.2.3.tgz",
          ref: "1.2.3",
          path: "package/icon.js",
          integrity: "sha512:not-a-digest",
          packageShasum: "a".repeat(40),
          match: "svg-path-data",
          matchDetail: "The only local path matches the pinned component.",
        },
      },
    ]);

    const result = runGate(fixture.providersDir, fixture.manifestPath);

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(
      `${result.stdout}\n${result.stderr}`,
      /proven asset requires immutable source evidence: public\/providers\/registered\.svg/
    );
  } finally {
    rmSync(fixture.root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("provider asset provenance gate rejects an unstructured upstream license claim", () => {
  const fixture = makeFixture();
  try {
    writeFileSync(join(fixture.providersDir, "registered.svg"), SVG);
    writeManifest(fixture.manifestPath, [
      {
        ...provenAsset("public/providers/registered.svg"),
        upstreamLicenseClaim: "MIT",
      },
    ]);

    const result = runGate(fixture.providersDir, fixture.manifestPath);

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(
      `${result.stdout}\n${result.stderr}`,
      /invalid upstreamLicenseClaim for public\/providers\/registered\.svg/
    );
  } finally {
    rmSync(fixture.root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("provider asset provenance gate allows probable and unresolved records and reports counts", () => {
  const fixture = makeFixture();
  try {
    writeFileSync(join(fixture.providersDir, "probable.svg"), SVG);
    writeFileSync(join(fixture.providersDir, "unresolved.svg"), SVG);
    writeManifest(fixture.manifestPath, [
      {
        ...unresolvedAsset("public/providers/probable.svg"),
        provenanceStatus: "probable",
        evidenceNote:
          "Repository history suggests a source family, but no immutable source exists.",
      },
      unresolvedAsset("public/providers/unresolved.svg"),
      {
        recordType: "contentAlias",
        sha256: sha256(SVG),
        canonicalPath: "public/providers/probable.svg",
        aliases: ["public/providers/unresolved.svg"],
      },
    ]);

    const result = runGate(fixture.providersDir, fixture.manifestPath);

    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    assert.match(
      result.stdout,
      /2\/2 registered; proven=0 probable=1 unresolved=1; duplicate-groups=1/
    );
  } finally {
    rmSync(fixture.root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("provider asset provenance gate rejects a stale expected asset count", () => {
  const fixture = makeFixture();
  try {
    writeFileSync(join(fixture.providersDir, "registered.svg"), SVG);
    writeManifest(fixture.manifestPath, [unresolvedAsset("public/providers/registered.svg")], {
      expectedAssetCount: 225,
    });

    const result = runGate(fixture.providersDir, fixture.manifestPath);

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(
      `${result.stdout}\n${result.stderr}`,
      /expectedAssetCount mismatch: manifest 225, records 1, physical 1/
    );
  } finally {
    rmSync(fixture.root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("provider asset provenance gate rejects a missing or non-commit auditedCommit", () => {
  const fixture = makeFixture();
  const missingObject = "f".repeat(40);
  const blobObject = gitObjectId("HEAD:README.md");
  try {
    writeFileSync(join(fixture.providersDir, "registered.svg"), SVG);

    for (const [auditedCommit, expectedError] of [
      [missingObject, `auditedCommit object does not exist: ${missingObject}`],
      [blobObject, `auditedCommit must identify a Git commit: ${blobObject} (found blob)`],
    ] as const) {
      writeManifest(fixture.manifestPath, [unresolvedAsset("public/providers/registered.svg")], {
        auditedCommit,
      });

      const result = runGate(fixture.providersDir, fixture.manifestPath);

      assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
      assert.ok(`${result.stdout}\n${result.stderr}`.includes(expectedError));
    }
  } finally {
    rmSync(fixture.root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("provider asset provenance gate binds auditedCommit to the physical provider snapshot", () => {
  const fixture = makeFixture();
  try {
    const records = readFileSync(
      join(REPO_ROOT, "config/quality/provider-assets-provenance.jsonl"),
      "utf8"
    )
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line));
    records[0] = { ...records[0], auditedCommit: emptyTreeCommit() };
    writeFileSync(
      fixture.manifestPath,
      `${records.map((record) => JSON.stringify(record)).join("\n")}\n`
    );

    const result = runGate(join(REPO_ROOT, "public/providers"), fixture.manifestPath);

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(
      `${result.stdout}\n${result.stderr}`,
      /auditedCommit provider snapshot (?:is missing|differs): public\/providers\//
    );
  } finally {
    rmSync(fixture.root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("repository provider asset manifest covers the audited 141-file snapshot", (t) => {
  const manifestPath = join(REPO_ROOT, "config/quality/provider-assets-provenance.jsonl");
  const { auditedCommit } = JSON.parse(readFileSync(manifestPath, "utf8").split("\n")[0]);
  if (!gitHasCommit(auditedCommit) && isShallowRepository()) {
    // The real manifest pins a historical commit. The unit shards check out with
    // depth 1, so it is not fetched there; the gate itself still runs on both
    // blocking rails with fetch-depth 0 (asserted by the test right below).
    t.skip(`shallow checkout without auditedCommit ${auditedCommit}`);
    return;
  }
  const result = runGate(join(REPO_ROOT, "public/providers"), manifestPath);

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(
    result.stdout,
    /141\/141 registered; proven=72 probable=69 unresolved=0; duplicate-groups=1/
  );
});

test("provider asset provenance gate stays on both blocking CI rails", () => {
  const ci = readFileSync(join(REPO_ROOT, ".github/workflows/ci.yml"), "utf8");
  const ciLintJob = workflowJob(ci, "lint");
  assert.match(ciLintJob, /^\s*- run: npm run check:provider-asset-provenance\s*$/m);
  assert.match(ciLintJob, /fetch-depth: 0/);

  const quality = readFileSync(join(REPO_ROOT, ".github/workflows/quality.yml"), "utf8");
  const qualityFastGatesJob = workflowJob(quality, "fast-gates");
  assert.match(qualityFastGatesJob, /gates=\([\s\S]*?\bprovider-asset-provenance\b[\s\S]*?\)/);
  assert.match(qualityFastGatesJob, /npm run "check:\$g"/);
  assert.match(qualityFastGatesJob, /fetch-depth: 0/);
});
