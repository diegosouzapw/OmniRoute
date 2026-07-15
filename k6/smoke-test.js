import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

// Smoke test — validates the server is working under minimal load.
// Run: k6 run k6/smoke-test.js

export const options = {
  vus: 1,
  duration: "10s",
  thresholds: {
    http_req_duration: ["p(95)<2000"], // 95% of requests under 2s
    http_req_failed: ["rate<0.01"],    // <1% failure rate
  },
};

const BASE_URL = __ENV.OMNIROUTE_URL || "http://localhost:8080";

export default function () {
  // Health check
  const healthResp = http.get(`${BASE_URL}/health`);
  check(healthResp, {
    "health is 200": (r) => r.status === 200,
  });

  // Ready check
  const readyResp = http.get(`${BASE_URL}/ready`);
  check(readyResp, {
    "ready is 200": (r) => r.status === 200,
  });

  // Metrics endpoint
  const metricsResp = http.get(`${BASE_URL}/metrics`);
  check(metricsResp, {
    "metrics is 200": (r) => r.status === 200,
  });

  // Simulate one chat completion (without API key — expect 401)
  const chatResp = http.post(
    `${BASE_URL}/api/v1/chat/completions`,
    JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: "Say hello" }],
    }),
    { headers: { "Content-Type": "application/json" } }
  );
  check(chatResp, {
    "chat returns 401 without auth": (r) => r.status === 401,
  });
}
