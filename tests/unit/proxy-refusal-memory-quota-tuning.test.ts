import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

// The quota curve is read once at module load, so each environment case replays in a
// fresh child process with its own variables. The child records consecutive refusals
// at an injected clock and prints the periods as JSON; warnings surface on stderr.

const START_MS = 1_800_000_000_000;
const MIN = 60_000;
const DEFAULT_PERIODS = [2 * MIN, 4 * MIN, 8 * MIN, 16 * MIN, 32 * MIN, 60 * MIN, 60 * MIN];

const ROOT = path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url))));

const PROBE = `
const count = Number(process.argv[1]);
const memory = await import("./open-sse/utils/proxyRefusalMemory.ts");
const periods = [];
let now = ${START_MS};
for (let i = 0; i < count; i++) {
  const period = memory.noteProxyRefusal("http://@tunable:8080", "ip_quota_429", now);
  periods.push(period);
  now += period ?? 0;
}
console.log(JSON.stringify(periods));
`;

function replay(
  env: Record<string, string>,
  notes: number
): { periods: Array<number | null>; stderr: string } {
  const childEnv = { ...process.env };
  delete childEnv.PROXY_QUOTA_429_BASE_MS;
  delete childEnv.PROXY_QUOTA_429_MAX_MS;
  Object.assign(childEnv, env);
  const result = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx/esm",
      "--import",
      "./open-sse/utils/setupPolyfill.ts",
      "-e",
      PROBE,
      String(notes),
    ],
    { env: childEnv, encoding: "utf8", timeout: 60_000, cwd: ROOT }
  );
  assert.equal(
    result.status,
    0,
    `probe exited with status ${result.status}: ${result.stderr}${result.error ?? ""}`
  );
  return { periods: JSON.parse(result.stdout) as Array<number | null>, stderr: result.stderr };
}

test("without variables the curve is unchanged", () => {
  const { periods, stderr } = replay({}, 7);
  assert.deepEqual(periods, DEFAULT_PERIODS);
  assert.ok(!stderr.includes("PROXY_QUOTA_429"), `unexpected warning: ${stderr}`);
});

test("bounded variables set the base and the cap", () => {
  const { periods, stderr } = replay(
    { PROXY_QUOTA_429_BASE_MS: "300000", PROXY_QUOTA_429_MAX_MS: "900000" },
    4
  );
  assert.deepEqual(periods, [300_000, 600_000, 900_000, 900_000]);
  assert.ok(!stderr.includes("PROXY_QUOTA_429"), `unexpected warning: ${stderr}`);
});

test("an out-of-range base falls back to the default with a warning", () => {
  const { periods, stderr } = replay({ PROXY_QUOTA_429_BASE_MS: "0" }, 2);
  assert.deepEqual(periods, [2 * MIN, 4 * MIN]);
  assert.match(stderr, /PROXY_QUOTA_429_BASE_MS/);
});

test("an unreadable base falls back to the default with a warning", () => {
  const { periods, stderr } = replay({ PROXY_QUOTA_429_BASE_MS: "abc" }, 1);
  assert.deepEqual(periods, [2 * MIN]);
  assert.match(stderr, /PROXY_QUOTA_429_BASE_MS/);
});

test("an out-of-range cap falls back to the default with a warning", () => {
  const { periods, stderr } = replay({ PROXY_QUOTA_429_MAX_MS: "999999999" }, 7);
  assert.deepEqual(periods, DEFAULT_PERIODS);
  assert.match(stderr, /PROXY_QUOTA_429_MAX_MS/);
});

test("a cap below the base falls back to the default cap with a warning", () => {
  const { periods, stderr } = replay(
    { PROXY_QUOTA_429_BASE_MS: "600000", PROXY_QUOTA_429_MAX_MS: "300000" },
    5
  );
  assert.deepEqual(periods, [600_000, 1_200_000, 2_400_000, 3_600_000, 3_600_000]);
  assert.match(stderr, /PROXY_QUOTA_429_MAX_MS/);
});

test("a zero or negative cap never disables the set-aside", () => {
  for (const cap of ["0", "-5"]) {
    const { periods, stderr } = replay({ PROXY_QUOTA_429_MAX_MS: cap }, 2);
    assert.deepEqual(periods, [2 * MIN, 4 * MIN]);
    assert.ok(
      periods.every((period) => typeof period === "number" && period > 0),
      `cap ${cap} gave a non-positive period`
    );
    assert.match(stderr, /PROXY_QUOTA_429_MAX_MS/);
  }
});
