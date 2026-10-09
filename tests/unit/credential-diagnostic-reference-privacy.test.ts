import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-diagnostic-privacy-"));
process.env.DATA_DIR = path.join(sandbox, "data");
process.env.OMNIROUTE_PLUGINS_DIR = path.join(sandbox, "plugins");
const { connectionRestrictionDiagnostics } =
  await import("../../src/sse/services/credentialSelectionDiagnostics.ts");

test.after(() => fs.rmSync(sandbox, { recursive: true, force: true }));

test("diagnostic references cannot be matched against a public SHA-256 dictionary", () => {
  const candidate = "private-low-entropy-selection-id";
  const publicDigest = createHash("sha256").update(candidate).digest("hex").slice(0, 12);
  const result = connectionRestrictionDiagnostics([candidate]);
  const reference = result.allowedConnectionRefs![0];
  assert.notEqual(reference.split(":").at(-1), publicDigest);
  assert.doesNotMatch(JSON.stringify(result), /private-low-entropy-selection-id/);
});

test("the same identifier has different diagnostic references in separate processes", () => {
  const candidate = "private-low-entropy-selection-id";
  const local = connectionRestrictionDiagnostics([candidate]).allowedConnectionRefs![0];
  const child = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx/esm",
      "--input-type=module",
      "--eval",
      `const { connectionRestrictionDiagnostics } = await import(process.argv[1]);
       const result = connectionRestrictionDiagnostics([process.argv[2]]);
       process.stdout.write(JSON.stringify(result.allowedConnectionRefs));
       process.exit(0);`,
      new URL("../../src/sse/services/credentialSelectionDiagnostics.ts", import.meta.url).href,
      candidate,
    ],
    {
      cwd: fileURLToPath(new URL("../../", import.meta.url)),
      env: { ...process.env, NODE_ENV: "test" },
      encoding: "utf8",
      timeout: 30_000,
      maxBuffer: 1024 * 1024,
    }
  );
  assert.equal(child.status, 0, `${child.error ?? ""}\n${child.stderr}`);
  const remote = JSON.parse(child.stdout) as string[];
  assert.equal(remote.length, 1);
  assert.notEqual(remote[0], local);
});

test("diagnostic references remain stable and distinct within the same process", () => {
  const first = connectionRestrictionDiagnostics(["account-a", "account-b", "account-a"]);
  const again = connectionRestrictionDiagnostics(["account-a", "account-b"]);
  assert.equal(first.allowedConnectionRefs![0], first.allowedConnectionRefs![2]);
  assert.notEqual(first.allowedConnectionRefs![0], first.allowedConnectionRefs![1]);
  assert.deepEqual(first.allowedConnectionRefs!.slice(0, 2), again.allowedConnectionRefs);
});

test("privacy protection retains bounded samples, sources, legacy IDs and noauth", () => {
  const result = connectionRestrictionDiagnostics(
    ["noauth", ...Array.from({ length: 8 }, (_, index) => `account-${index}`)],
    ["combo_pin"]
  );
  assert.equal(result.allowedConnectionsCount, 9);
  assert.equal(result.allowedConnectionRefs!.length, 6);
  assert.equal(result.allowedConnectionRefs![0], "noauth");
  assert.deepEqual(result.connectionRestrictionSources, ["combo_pin"]);
  assert.deepEqual(connectionRestrictionDiagnostics(null).allowedConnectionRefs, null);
  assert.deepEqual(connectionRestrictionDiagnostics([]).allowedConnectionRefs, []);
  assert.deepEqual(
    connectionRestrictionDiagnostics("legacy-id"),
    connectionRestrictionDiagnostics(["legacy-id"])
  );
});
