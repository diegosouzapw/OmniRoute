# Quality Ratchet

| Métrica                                                           | Baseline | Atual | Status                |
| ----------------------------------------------------------------- | -------- | ----- | --------------------- |
| eslintWarnings                                                    | 0        | 0     | ok                    |
| eslintErrors                                                      | 0        | 0     | ok                    |
| coverage.statements                                               | 80.8     | —     | SKIP (ausente)        |
| coverage.lines                                                    | 80.8     | —     | SKIP (ausente)        |
| coverage.functions                                                | 86.42    | —     | SKIP (ausente)        |
| coverage.branches                                                 | 78.1     | —     | SKIP (ausente)        |
| coverage.chatCore.lines                                           | 72.45    | —     | SKIP (ausente)        |
| coverage.combo.lines                                              | 85.42    | —     | SKIP (ausente)        |
| coverage.accountFallback.lines                                    | 96.78    | —     | SKIP (ausente)        |
| coverage.auth.lines                                               | 92.55    | —     | SKIP (ausente)        |
| coverage.routeGuard.lines                                         | 98.73    | —     | SKIP (ausente)        |
| coverage.error.lines                                              | 92.13    | —     | SKIP (ausente)        |
| coverage.publicCreds.lines                                        | 99.07    | —     | SKIP (ausente)        |
| coverage.circuitBreaker.lines                                     | 95.09    | —     | SKIP (ausente)        |
| openapiCoverage.pct                                               | 38       | 38    | ok                    |
| i18nUiCoverage.pct                                                | 99       | 99    | ok                    |
| deadExports                                                       | 227      | —     | SKIP (dedicated gate) |
| cognitiveComplexity                                               | 1223     | —     | SKIP (dedicated gate) |
| typeCoveragePct                                                   | 92.17    | —     | SKIP (dedicated gate) |
| codeqlAlerts                                                      | 0        | —     | SKIP (dedicated gate) |
| secretFindings                                                    | 0        | —     | SKIP (dedicated gate) |
| zizmorFindings                                                    | 190      | —     | SKIP (dedicated gate) |
| vulnCount                                                         | 10       | —     | SKIP (dedicated gate) |
| bundleSize                                                        | 7666     | —     | SKIP (dedicated gate) |
| openapiBreaking                                                   | 0        | —     | SKIP (dedicated gate) |
| mutationScore.src/sse/services/auth.ts                            | 52.57    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/services/accountFallback.ts                | 68.38    | —     | SKIP (dedicated gate) |
| mutationScore.src/server/authz/routeGuard.ts                      | 76.08    | —     | SKIP (dedicated gate) |
| mutationScore.src/shared/utils/circuitBreaker.ts                  | 56.94    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/utils/error.ts                             | 43.83    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/utils/publicCreds.ts                       | 59.76    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/services/combo/autoStrategy.ts             | 41.33    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/services/combo/comboStructure.ts           | 57.82    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/services/combo/validateQuality.ts          | 61.33    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/services/combo/comboPredicates.ts          | 56.62    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/services/combo/rrState.ts                  | 70.88    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/services/combo/shadowRouting.ts            | 48       | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/services/combo/targetSorters.ts            | 68.3     | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/services/combo/comboData.ts                | 76.94    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/services/combo/quotaScoring.ts             | 39.73    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/services/combo/quotaStrategies.ts          | 50.3     | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/handlers/chatCore/passthroughHelpers.ts    | 80.89    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/handlers/chatCore/sanitization.ts          | 70.15    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/handlers/chatCore/upstreamTimeouts.ts      | 33       | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/handlers/chatCore/comboContextCache.ts     | 13.62    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/handlers/chatCore/idempotency.ts           | 42.82    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/handlers/chatCore/responseHeaders.ts       | 62.7     | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/handlers/chatCore/executorHelpers.ts       | 70.39    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/handlers/chatCore/memoryExtraction.ts      | 62.06    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/handlers/chatCore/nonStreamingSse.ts       | 72.82    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/handlers/chatCore/passthroughToolNames.ts  | 66.42    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/handlers/chatCore/headers.ts               | 94.29    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/handlers/chatCore/logTruncation.ts         | 77.64    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/handlers/chatCore/memorySkillsInjection.ts | 13.49    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/handlers/chatCore/semanticCache.ts         | 60.16    | —     | SKIP (dedicated gate) |
| mutationScore.open-sse/handlers/chatCore/telemetryHelpers.ts      | 83.18    | —     | SKIP (dedicated gate) |

**Sem regressões — gate OK.**
