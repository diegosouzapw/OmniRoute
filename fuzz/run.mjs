#! /usr/bin/env node
// @ts-check

/**
 * OmniRoute API Fuzz Harness
 *
 * Fuzzes the chat/completions endpoint with random inputs.
 * Run: node fuzz/run.mjs
 *
 * Requires the server to be running on the configured URL.
 */

const BASE_URL = process.env.FUZZ_BASE_URL || "http://localhost:8080";
const ITERATIONS = parseInt(process.env.FUZZ_ITERATIONS || "100", 10);
const ENDPOINTS = ["/api/v1/chat/completions", "/api/v1/embeddings", "/api/v1/moderations"];

// Random string generator for fuzzing
function randomString(length) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]|:;<>,.?/~`\n\r\t\\\"' ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

// Generate a random payload
function randomPayload(endpoint) {
  switch (endpoint) {
    case "/api/v1/chat/completions":
      return {
        model: randomString(Math.floor(Math.random() * 20) + 1),
        messages: [
          { role: "user", content: randomString(Math.floor(Math.random() * 500) + 1) },
        ],
        temperature: Math.random() * 5,
        max_tokens: Math.floor(Math.random() * 100000),
        stream: Math.random() > 0.5,
      };
    case "/api/v1/embeddings":
      return {
        model: randomString(Math.floor(Math.random() * 20) + 1),
        input: randomString(Math.floor(Math.random() * 500) + 1),
      };
    case "/api/v1/moderations":
      return {
        input: randomString(Math.floor(Math.random() * 500) + 1),
      };
    default:
      return {};
  }
}

async function fuzzEndpoint(endpoint, apiKey = "") {
  const url = `${BASE_URL}${endpoint}`;
  const payload = randomPayload(endpoint);
  const headers = { "Content-Type": "application/json" };
  if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    // Any status is acceptable — we're looking for crashes
    if (response.status >= 500) {
      const body = await response.text();
      // Server errors should have sanitized error messages (no stack traces)
      if (body.includes("Error:") && body.includes("at ")) {
        console.error(`⚠️  Potential stack leak on ${endpoint}:`, body.substring(0, 200));
        return { status: "stack_leak", endpoint };
      }
    }
    return { status: "ok", endpoint };
  } catch (err) {
    console.error(`💥 Crash on ${endpoint}:`, err.message);
    return { status: "crash", endpoint, error: err.message };
  }
}

async function main() {
  console.log(`OmniRoute API Fuzz Harness`);
  console.log(`Server: ${BASE_URL}`);
  console.log(`Iterations: ${ITERATIONS}`);
  console.log(`Endpoints: ${ENDPOINTS.join(", ")}`);
  console.log();

  let crashes = 0;
  let leaks = 0;

  for (let i = 0; i < ITERATIONS; i++) {
    const endpoint = ENDPOINTS[Math.floor(Math.random() * ENDPOINTS.length)];
    const result = await fuzzEndpoint(endpoint);

    if (result.status === "crash") crashes++;
    if (result.status === "stack_leak") leaks++;

    if ((i + 1) % 10 === 0) {
      console.log(`  Progress: ${i + 1}/${ITERATIONS} (${crashes} crashes, ${leaks} leaks)`);
    }
  }

  console.log();
  console.log(`Fuzz Results: ${ITERATIONS} iterations`);
  console.log(`  Crashes: ${crashes}`);
  console.log(`  Stack leaks: ${leaks}`);

  if (crashes > 0) {
    console.error(`❌ ${crashes} crash(es) detected`);
    process.exit(1);
  }
  if (leaks > 0) {
    console.error(`⚠️  ${leaks} stack leak(s) detected`);
    process.exit(1);
  }
  console.log(`✅ All clean`);
}

main();
