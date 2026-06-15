import http from "k6/http";
import { check } from "k6";

// Soak contra um endpoint leve (sem custo de LLM) para medir liveness/leak do
// servidor sob carga sustentada. Configurável por env: BASE_URL, SOAK_VUS, SOAK_DURATION.
export const options = {
  stages: [{ duration: __ENV.SOAK_DURATION || "3m", target: Number(__ENV.SOAK_VUS || 10) }],
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"],
  },
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:20128";

export default function () {
  const res = http.get(`${BASE_URL}/api/monitoring/health`);
  check(res, { "status is 200": (r) => r.status === 200 });
}
