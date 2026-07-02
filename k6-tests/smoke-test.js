// k6 smoke test — minimal validation against a single target endpoint.
//
// Run:  k6 run k6-tests/smoke-test.js
// Env:  TARGET (default http://localhost:8080)

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,                // single virtual user
  duration: '30s',        // short window
  thresholds: {
    http_req_failed: ['rate<0.01'],  // fail if >1% requests error
  },
};

const BASE = __ENV.TARGET || 'http://localhost:8080';

export default function () {
  const res = http.get(`${BASE}/health`);
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 2000ms': (r) => r.timings.duration < 2000,
  });
  sleep(1);
}
