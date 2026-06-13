# Fase 8 — Quality Gates: Supply-Chain, Contratos, Resiliência & Segurança-LLM

> **Status:** PLANO APROVADO PARA DEBATE/EXECUÇÃO (owner aprovou os 4 blocos em 2026-06-13).
> **Pré-requisito:** Fases 6A + 7 completas (branch `feat/quality-gates-phase6a-7`).
> **Origem:** pesquisa de estado-da-arte 2026 (2 agentes, 25+ buscas web, claims verificados). Tudo OSS/self-hostable.

Cada task segue o padrão consolidado: gate determinístico → métrica (catraca) ou policy (pass/fail) → wire no CI. Catracas nascem com baseline congelado do estado real. Ferramental externo entra advisory até o 1º run verde, como na Fase 7.

---

## BLOCO A — Supply-Chain & Artefato (o maior buraco atual; baixo esforço)

### A.1 — npm/SLSA provenance
- **Ferramenta:** `actions/attest-build-provenance` (MIT, OIDC do GitHub, zero chaves).
- **O quê:** attestation SLSA Build L2 no publish do npm; verificável via `npm audit signatures`.
- **Artefatos:** step no `npm-publish.yml` (`NPM_CONFIG_PROVENANCE: true` + attest). **Policy.**

### A.2 — SBOM (CycloneDX)
- **Ferramenta:** `@cyclonedx/cyclonedx-npm` + `anchore/syft` (Apache-2.0).
- **O quê:** gerar SBOM CycloneDX por release; arquivar como artefato; alimenta o scan do Grype.
- **Artefatos:** `scripts/build/generate-sbom.mjs`, step no release. **Artefato.**

### A.3 — Container scan da imagem Docker
- **Ferramenta:** `aquasecurity/trivy-action` (Apache-2.0).
- **O quê:** scan da imagem publicada (CVEs/secrets/misconfig) com `--severity HIGH,CRITICAL`.
- **Artefatos:** job no `docker-publish.yml`. **Policy** (advisory→bloqueante).

### A.4 — OpenSSF Scorecard
- **Ferramenta:** `ossf/scorecard-action` (Apache-2.0).
- **O quê:** 20+ checks de postura (pinned-deps, token-permissions, dangerous-workflow). Casa com o zizmor da Fase 7.
- **Artefatos:** workflow `scorecard.yml` (scheduled + push). **Catraca** (score 0–10).

---

## BLOCO B — Contratos & Correção (alto ROI para um proxy de formatos)

### B.1 — Property-based testing (`fast-check`, MIT)
- **O quê:** invariantes em combo-routing (round-robin não repete provider consecutivo), translators (round-trip preserva `model`), sanitizers, parser SSE. Captura edge cases que testes por-exemplo perdem.
- **Artefatos:** devDep `fast-check`; `tests/unit/**/*.property.test.ts`. **Catraca CI** (property violada = falha). Capturar seed em CI para reprodução.

### B.2 — Golden-file/contract snapshots dos translators
- **Ferramenta:** `node:assert.snapshot` (nativo Node 22+, zero dep).
- **O quê:** congelar output de `translateRequest`/`translateResponse` (OpenAI↔Claude↔Gemini) como JSON versionado; drift de formato dispara o gate.
- **Artefatos:** `tests/snapshots/translator-*.json`. **Catraca CI.**

### B.3 — SSE-correctness gates (lacuna sem OSS pronto → helpers custom)
- **Building blocks:** `eventsource-parser` + `undici` (nativo).
- **O quê:** stream fecha após `[DONE]` (sem socket pendurado); abort propaga ao upstream; nenhum listener vazado; sub-streams de combo cancelados no abort; zero dup de texto no fim (bug já documentado no CLAUDE.md).
- **Artefatos:** `tests/integration/sse-correctness.test.ts`. **Integração.** ⭐ maior ROI do bloco (proxies de LLM sofrem socket exhaustion/leak).

### B.4 (opcional) — API fuzzing + breaking-change
- `schemathesis` (lê o `openapi.yaml`, gera centenas de casos; nightly) + `oasdiff` (breaking-change no spec, pre-commit). Ambos maduros 2026.

---

## BLOCO C — Resiliência Runtime (testa o coração do OmniRoute)

### C.1 — Chaos/fault-injection (`Shopify/toxiproxy`, maduro)
- **O quê:** valida circuit-breaker + connection-cooldown + model-lockout com latência/timeout/reset REAIS (não mocks). Toxics: `latency`, `timeout`, `slicer`+`reset_peer` (SSE no meio).
- **Artefatos:** `docker-compose.test.yml` (toxiproxy), `tests/integration/resilience-chaos.test.ts`. **Nightly/integração.** ⭐ maior ROI (3 mecanismos de resiliência são o núcleo).

### C.2 — Heap-growth gate (nativo, `--expose-gc`)
- **O quê:** após N requests, `heapUsed` não cresce além de um teto (pega SSE que não fecha, listeners de combo, caches sem TTL). O projeto já teve OOM (#3069).
- **Artefatos:** `tests/integration/heap-growth.test.ts`. **Nightly soak.** (clinic.js está descontinuado — usar nativo.)

### C.3 (opcional) — Load/soak (`k6`, Grafana)
- Thresholds p95/TTFT como gate; soak nightly de 30min detecta degradação entre releases.

---

## BLOCO D — Segurança LLM (emergente 2026)

### D.1 — LLM eval/red-team (`promptfoo`, MIT)
- **O quê:** `apiBaseUrl: localhost:20128/v1` → testa de ponta a ponta. (a) regressão de qualidade de saída via llm-rubric; (b) valida que os guardrails de prompt-injection (`src/lib/guardrails/`) REALMENTE bloqueiam. Presets `owasp:llm`.
- **Artefatos:** `promptfooconfig.yaml`, job nightly. **Policy** (nightly, custo por run).

### D.2 — LLM vuln-scan (`NVIDIA/garak`, ativo)
- **O quê:** 37+ probes (jailbreak, PII-leak, system-prompt-exfil) contra o proxy. Python, job separado.
- **Artefatos:** job nightly/release. **Nightly.**

---

## Descartados na pesquisa (transparência)
`clinic.js` (heap, descontinuado 2023) → nativo. `apiaryio/dredd` (contract, arquivado nov/2024) → schemathesis/golden-files. `jazzer.js` (fuzzing coverage-guided, nicho) → fast-check cobre o ROI. Reproducible builds npm (sem tool madura; Next.js chunk IDs não-determinísticos) → SLSA provenance substitui. AI code provenance/watermarking (research-only). Tracetest (observabilidade-gate; exige OTel instrumentado primeiro) → diferir.

---

## Sequenciamento sugerido (a debater)
1. **Quick wins (baixo esforço, alto retorno):** A.1 provenance, A.3 Trivy, A.4 Scorecard, B.1 fast-check, B.2 golden-files.
2. **Estrutural:** B.3 SSE-correctness, C.1 toxiproxy, C.2 heap, A.2 SBOM.
3. **Nightly:** D.1 promptfoo, D.2 garak, C.3 k6, B.4 schemathesis.
