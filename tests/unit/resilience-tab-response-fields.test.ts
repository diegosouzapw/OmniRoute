import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const RESILIENCE_TAB_PATH = path.resolve(
  process.cwd(),
  "src/app/(dashboard)/dashboard/settings/components/ResilienceTab.tsx"
);
const RESILIENCE_ROUTE_PATH = path.resolve(process.cwd(), "src/app/api/resilience/route.ts");

const REQUIRED_RESPONSE_FIELDS = [
  "requestQueue",
  "connectionCooldown",
  "providerBreaker",
  "waitForCooldown",
  "comboCooldownWait",
  "quotaShareConcurrencyLimit",
  "providerCooldown",
];

test("ResilienceTab maps every rendered /api/resilience field into component state", () => {
  const source = fs.readFileSync(RESILIENCE_TAB_PATH, "utf8");
  const mapper = source.match(
    /function\s+toResilienceResponse\s*\([^)]*\)\s*:\s*ResilienceResponse\s*{(?<body>[\s\S]*?)\n}/
  )?.groups?.body;

  assert.ok(mapper, "ResilienceTab should use a shared toResilienceResponse mapper");

  for (const field of REQUIRED_RESPONSE_FIELDS) {
    assert.match(
      mapper,
      new RegExp(`${field}:\\s*json\\.${field}\\b`),
      `toResilienceResponse should preserve ${field} from /api/resilience`
    );
  }

  for (const field of ["comboCooldownWait", "quotaShareConcurrencyLimit"]) {
    assert.match(
      source,
      new RegExp(`value=\\{data\\.${field}\\}`),
      `ResilienceTab should render ${field}; missing state mapping would crash the page`
    );
  }
});

test("/api/resilience returns rendered card fields after GET and PATCH", () => {
  const source = fs.readFileSync(RESILIENCE_ROUTE_PATH, "utf8");

  for (const field of ["comboCooldownWait", "quotaShareConcurrencyLimit", "providerCooldown"]) {
    assert.match(
      source,
      new RegExp(`${field}:\\s*resilience\\.${field}\\b`),
      `GET /api/resilience should return ${field}`
    );
    assert.match(
      source,
      new RegExp(`${field}:\\s*nextResilience\\.${field}\\b`),
      `PATCH /api/resilience should return ${field}`
    );
  }
});
