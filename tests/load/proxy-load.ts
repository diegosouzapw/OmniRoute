/**
 * OmniRoute — k6 Load / Performance Test (T-5)
 *
 * Tests the proxy endpoint under sustained load to measure:
 *   - Request throughput (RPS)
 *   - Response latency (p50, p95, p99)
 *   - Error rate
 *   - Concurrent connection handling
 *
 * Usage:
 *   k6 run tests/load/proxy-load.js
 *   k6 run tests/load/proxy-load.js --env BASE_URL=https://llms.omniroute.online
 *   k6 run tests/load/proxy-load.js --env VUS=50 --env DURATION=120s
 *
 * Prerequisites:
 *   - k6 installed: https://grafana.com/docs/k6/latest/set-up/install-k6/
 *   - OMNIROUTE_API_KEY env var or --env API_KEY=... set
 */

import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

// ── Custom metrics ──
const errorRate = new Rate("errors");
const chatLatency = new Trend("chat_latency", true); // in ms
const healthLatency = new Trend("health_latency", true);

// ── Configuration ──
const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";
const API_KEY = __ENV.API_KEY || __ENV.OMNIROUTE_API_KEY || "test-key";
const VUS = parseInt(__ENV.VUS || "10", 10);
const DURATION = __ENV.DURATION || "60s";

export const options = {
  scenarios: {
    // Ramp-up scenario for stress testing
    chat_stress: {
      executor: "ramping-vus",
      startVUs: 1,
      stages: [
        { duration: "10s", target: VUS }, // Ramp up
        { duration: DURATION, target: VUS }, // Sustained load
        { duration: "10s", target: 0 }, // Ramp down
      ],
      exec: "chatCompletions",
    },
    // Constant rate for health checks
    health_check: {
      executor: "constant-vus",
      vus: 2,
      duration: DURATION,
      exec: "healthCheck",
    },
  },
  thresholds: {
    http_req_duration: ["p(95)<5000"], // 95% of requests < 5s
    errors: ["rate<0.1"], // Error rate < 10%
    chat_latency: ["p(50)<3000", "p(95)<8000"],
    health_latency: ["p(95)<500"],
  },
};

// ── Headers ──
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

// ── Scenarios ──

/**
 * Chat Completions — main proxy endpoint
 * Sends a simple non-streaming chat request.
 */
export function chatCompletions() {
  const payload = JSON.stringify({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: "Say hello in one word." }],
    temperature: 0,
    max_tokens: 10,
    stream: false,
  });

  const res = http.post(`${BASE_URL}/v1/chat/completions`, payload, {
    headers,
    timeout: "15s",
  });

  chatLatency.add(res.timings.duration);

  const passed = check(res, {
    "status is 200": (r) => r.status === 200,
    "has choices": (r) => {
      try {
        const body = JSON.parse(r.body);
        return body.choices && body.choices.length > 0;
      } catch {
        return false;
      }
    },
    "response time < 10s": (r) => r.timings.duration < 10000,
  });

  errorRate.add(!passed);
  sleep(0.5);
}

/**
 * Health Check — lightweight endpoint to measure base latency.
 */
export function healthCheck() {
  const res = http.get(`${BASE_URL}/api/monitoring/health`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
    timeout: "5s",
  });

  healthLatency.add(res.timings.duration);

  const passed = check(res, {
    "health status 200": (r) => r.status === 200,
    "response time < 1s": (r) => r.timings.duration < 1000,
  });

  errorRate.add(!passed);
  sleep(2);
}

/**
 * Summary handler — outputs a custom summary.
 */
export function handleSummary(data) {
  const summary = {
    timestamp: new Date().toISOString(),
    scenarios: Object.keys(options.scenarios),
    metrics: {
      http_reqs: data.metrics.http_reqs?.values?.count || 0,
      avg_duration_ms: Math.round(data.metrics.http_req_duration?.values?.avg || 0),
      p95_duration_ms: Math.round(data.metrics.http_req_duration?.values?.["p(95)"] || 0),
      p99_duration_ms: Math.round(data.metrics.http_req_duration?.values?.["p(99)"] || 0),
      error_rate: (data.metrics.errors?.values?.rate || 0).toFixed(4),
    },
  };

  return {
    stdout: `\n📊 Load Test Summary\n${JSON.stringify(summary, null, 2)}\n`,
    "tests/load/results.json": JSON.stringify(summary, null, 2),
  };
}
