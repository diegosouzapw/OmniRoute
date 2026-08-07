#!/usr/bin/env node
/**
 * @file usage-benchmark.mjs
 * @description Battle-test Raycast Pro usage via OmniRoute local endpoint.
 *
 * Env (required):
 *   OMNIROUTE_URL          default http://127.0.0.1:20128/v1
 *   OMNIROUTE_API_KEY      OmniRoute API key (if REQUIRE_API_KEY)
 *
 * Env (optional — direct Raycast probe without OmniRoute):
 *   RAYCAST_BEARER_TOKEN
 *   RAYCAST_DEVICE_ID
 *   RAYCAST_AID
 *   RAYCAST_SIG_SECRET
 *
 * Usage:
 *   node scripts/raycast/usage-benchmark.mjs --models 5 --rounds 3
 *   node scripts/raycast/usage-benchmark.mjs --model openai-gpt-5-mini --rounds 10
 *
 * @changes
 * - [2026-07-27] [Composer] - Initial Raycast Pro usage benchmark script
 */

import { createHmac, createHash } from "node:crypto";

const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}

const rounds = Number(arg("rounds", "3"));
const model = arg("model", "");
const modelCount = Number(arg("models", "5"));
const omnirouteUrl = (process.env.OMNIROUTE_URL || "http://127.0.0.1:20128/v1").replace(/\/$/, "");
const apiKey = process.env.OMNIROUTE_API_KEY || "";

const RAYCAST_CHAT_URL = "https://backend.raycast.com/api/v1/ai/chat_completions";
const RAYCAST_MODELS_URL = "https://backend.raycast.com/api/v1/ai/models";
const SIG_SECRET =
  process.env.RAYCAST_SIG_SECRET ||
  "6bc455473576ce2cd6f70426caff867aabbe3f7291c1a79681af5e8ce0ca1408";

function rot13rot5(input) {
  return input.replace(/[A-Za-z0-9]/g, (char) => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + 13) % 26) + 65);
    if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + 13) % 26) + 97);
    return String.fromCharCode(((code - 48 + 5) % 10) + 48);
  });
}

function signatureV2(timestamp, deviceId, payload, secret) {
  const bodyHash = createHash("sha256").update(payload).digest("hex");
  const message = [timestamp, deviceId, bodyHash].map(rot13rot5).join(".");
  return createHmac("sha256", secret).update(message).digest("hex");
}

function raycastJwt(aid, secret) {
  const iat = Date.now() / 1000;
  const header = Buffer.from(JSON.stringify({ typ: "JWT", alg: "HS256" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({ aid, exp: iat + 60, iat })).toString("base64url");
  const signature = createHmac("sha256", secret)
    .update(`${header}.${payload}`)
    .digest("base64url");
  return `${header}.${payload}.${signature}`;
}

function raycastHeaders(payload) {
  const bearerToken = process.env.RAYCAST_BEARER_TOKEN;
  const deviceId = process.env.RAYCAST_DEVICE_ID;
  const aid = process.env.RAYCAST_AID;
  if (!bearerToken || !deviceId || !aid) {
    throw new Error("Set RAYCAST_BEARER_TOKEN, RAYCAST_DEVICE_ID, RAYCAST_AID for direct probe");
  }
  const timestamp = Math.floor(Date.now() / 1000).toString();
  return {
    Accept: "application/json",
    Authorization: `Bearer ${bearerToken}`,
    "X-Raycast-Timestamp": timestamp,
    "X-Raycast-DeviceId": deviceId,
    "Content-Type": "application/json",
    "X-Raycast-Signature-v2": signatureV2(timestamp, deviceId, payload, SIG_SECRET),
    "X-Raycast-Signature": raycastJwt(aid, SIG_SECRET),
    "X-Raycast-Experimental": "chatBranching, mcpHTTPServer",
    "User-Agent": "Raycast/1.104.20 (macOS Version 26.5.1 (Build 25F80))",
  };
}

async function fetchRaycastModels() {
  const payload = "{}";
  const res = await fetch(RAYCAST_MODELS_URL, { method: "GET", headers: raycastHeaders(payload) });
  const text = await res.text();
  if (!res.ok) throw new Error(`models [${res.status}]: ${text.slice(0, 200)}`);
  const data = JSON.parse(text);
  return (data.models || []).map((m) => m.id);
}

async function chatOmniroute(modelId, prompt) {
  const headers = { "Content-Type": "application/json" };
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
  const started = Date.now();
  const res = await fetch(`${omnirouteUrl}/chat/completions`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: `raycast/${modelId}`,
      messages: [{ role: "user", content: prompt }],
      stream: false,
      max_tokens: 32,
    }),
  });
  const ms = Date.now() - started;
  const body = await res.text();
  return { ok: res.ok, status: res.status, ms, body: body.slice(0, 300) };
}

async function main() {
  console.log(`OmniRoute: ${omnirouteUrl}`);
  console.log(`Rounds per model: ${rounds}`);

  let models = [];
  if (model) {
    models = [model];
  } else if (process.env.RAYCAST_BEARER_TOKEN) {
    models = (await fetchRaycastModels()).slice(0, modelCount);
    console.log(`Direct Raycast model probe — testing ${models.length} models via OmniRoute`);
  } else {
    models = ["openai-gpt-5-mini"];
    console.log("No RAYCAST_* env — using default model openai-gpt-5-mini via OmniRoute combo id");
  }

  const results = [];
  for (const modelId of models) {
    let ok = 0;
    let fail = 0;
    const latencies = [];
    for (let i = 0; i < rounds; i++) {
      const prompt = `Raycast benchmark round ${i + 1} — reply with exactly: pong`;
      try {
        const r = await chatOmniroute(modelId, prompt);
        latencies.push(r.ms);
        if (r.ok) ok++;
        else {
          fail++;
          console.error(`  FAIL ${modelId} #${i + 1} [${r.status}]: ${r.body}`);
        }
      } catch (err) {
        fail++;
        console.error(`  ERR ${modelId} #${i + 1}:`, err.message);
      }
    }
    const avg = latencies.length ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : 0;
    results.push({ modelId, ok, fail, avgMs: avg });
    console.log(`${modelId}: ${ok}/${rounds} ok, avg ${avg}ms`);
  }

  console.log("\nSummary:");
  console.table(results);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
