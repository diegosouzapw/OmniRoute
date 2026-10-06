# OmniRoute Routing Policy

Routing preserves the existing capability and combo selection logic, then applies allocation, health, circuit, quota, latency, reliability, model preference, and cost preference factors.

The adaptive score is explainable and returns both the selected candidate and all ranked candidates. Exhausted quota, denied allocation, and open circuits are ineligible. Unknown quota remains eligible with a neutral quota factor.

Route preview is deterministic and performs zero upstream model requests:

`POST /api/omniroute/route/preview`

The response includes candidate scores, factors, reasons, the selected provider, and `liveRequestExecuted: false`.
