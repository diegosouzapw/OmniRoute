#!/usr/bin/env node

import { CLI_TOKEN_HEADER, getCliToken } from "../../bin/cli/utils/cliToken.mjs";

const baseUrl = (process.env.OMNIROUTE_BASE_URL || "http://127.0.0.1:20128").replace(/\/$/, "");
const apiKey = process.env.OMNIROUTE_API_KEY || "";
const timeoutMs = 5000;

async function get(path) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let hardTimer;
  const hardTimeout = new Promise((_, reject) => {
    hardTimer = setTimeout(
      () => reject(new Error(`request timeout after ${timeoutMs}ms`)),
      timeoutMs + 100
    );
  });
  try {
    const response = await Promise.race([
      fetch(`${baseUrl}${path}`, {
        headers: {
          ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
          [CLI_TOKEN_HEADER]: await getCliToken(),
        },
        signal: controller.signal,
      }),
      hardTimeout,
    ]);
    const body = await response.json().catch(() => null);
    return { ok: response.ok, status: response.status, body };
  } finally {
    clearTimeout(timer);
    clearTimeout(hardTimer);
  }
}

function check(label, passed, detail = "") {
  console.log(`${label}: ${passed ? "PASS" : "FAIL"}${detail ? ` (${detail})` : ""}`);
  return passed;
}

console.log("OmniRoute Verification");
console.log(`Gateway: ${baseUrl}`);
const results = [];

try {
  const models = await get("/v1/models");
  results.push(check("Gateway", models.ok, `HTTP ${models.status}`));
  const modelCount = Array.isArray(models.body?.data) ? models.body.data.length : 0;
  results.push(check("Catalog", modelCount > 0, `${modelCount} models`));

  const pools = await get("/api/quota/pools");
  const poolRows = Array.isArray(pools.body?.pools) ? pools.body.pools : [];
  const allocations = poolRows.reduce((sum, pool) => sum + (pool.allocations?.length || 0), 0);
  results.push(check("Pools", pools.ok, `${poolRows.length}`));
  results.push(check("Allocations", pools.ok && allocations >= poolRows.length, `${allocations}`));

  const status = await get("/api/omniroute/status");
  results.push(check("Status API", status.ok, `HTTP ${status.status}`));
  results.push(check("No live request", status.body?.liveRequestExecuted === false));
} catch (error) {
  results.push(
    check("Verification", false, error instanceof Error ? error.message : String(error))
  );
}

console.log(`Live upstream requests: 0`);
if (results.some((passed) => !passed)) process.exitCode = 1;
