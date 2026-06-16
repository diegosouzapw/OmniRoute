---
title: "Supply-Chain Gates"
---

# Supply-Chain Gates (Fase 8 · Bloco A)

OmniRoute publica artefatos npm + Docker. Estes gates dão proveniência,
inventário (SBOM) e scan de CVE, todos OSS, plugados nos workflows de release.
Postura **advisory-first** — reportam agora, promovem a bloqueante depois do 1º
release verde.

| Gate | Ferramenta | Onde | Bloqueia? | Saída |
|---|---|---|---|---|
| SLSA provenance (npm) | `npm --provenance` (OIDC) | `npm-publish.yml` | só se publish falhar | badge npmjs / `npm audit signatures` |
| SBOM npm | `@cyclonedx/cyclonedx-npm` | `npm-publish.yml` | só se geração quebrar | asset do Release + artifact |
| SBOM imagem | `anchore/sbom-action` (syft) | `docker-publish.yml` (merge) | advisory | artifact CycloneDX |
| Trivy CVE (SARIF) | `aquasecurity/trivy-action` | `docker-publish.yml` (merge) | advisory | SARIF (HIGH+CRITICAL) → aba Security |
| Trivy CRITICAL gate | `aquasecurity/trivy-action` | `docker-publish.yml` (merge) | **bloqueante** | `exit-code: '1'` em CRITICAL fixável |
| osv vulnCount | `osv-scanner` (`check:vuln-ratchet --ratchet`) | `ci.yml` (`quality-extended`) | **bloqueante** | catraca `metrics.vulnCount` (direction:down) |
| OpenSSF Scorecard | `ossf/scorecard-action` | `scorecard.yml` (cron) | advisory | SARIF → Security + badge |

A catraca de CVE da imagem usa **dois passos** no `docker-publish.yml`: o passo
SARIF (`HIGH,CRITICAL`, `exit-code: 0`) mantém HIGH+CRITICAL visíveis na aba Security
sem bloquear; o passo *CRITICAL gate* (`severity: CRITICAL`, `ignore-unfixed: true`,
`exit-code: 1`) falha o release num CVE CRÍTICO **com fix disponível**. `ignore-unfixed`
evita travar o release por um CVE de base-image sem patch upstream.

## ⚠️ Variância de CVE (gates osv/Trivy bloqueantes)

osv e Trivy comparam as deps contra bancos de CVE que **crescem continuamente**. Um PR
que **não toca nenhuma dependência** pode subitamente ficar vermelho porque um CVE novo
foi divulgado numa dep já presente (osv: `vulnCount` medido > baseline; Trivy: um novo
CRITICAL fixável na imagem). **Isso é comportamento operacional ESPERADO de um gate de
CVE bloqueante, não uma regressão de produto.**

Quando osv ou Trivy ficam vermelhos por um CVE recém-divulgado, o remédio é:

1. **Bumpar a dep afetada** (preferível) — sobe a versão patcheada via `package.json`
   `overrides` (deps transitivas) ou rebuild da imagem sobre uma base patcheada.
2. **Se não houver fix upstream:**
   - **osv:** re-baseline `metrics.vulnCount` em `config/quality/quality-baseline.json`
     (`npm run quality:ratchet -- --update` não cobre dedicated gates — edite o valor à
     mão, `direction:down`) com uma nota de justificativa + issue de tracking.
   - **Trivy:** adicione uma entrada em `.trivyignore` (CVE-ID por linha) com um comentário
     de justificativa + issue de tracking. `ignore-unfixed: true` já cobre os CVEs sem
     patch automaticamente.

Os dois gates **SKIP gracioso** (exit 0) quando a ferramenta está ausente ou a medição
falha (osv-scanner fora do PATH, osv.dev/rede inacessível, JSON inválido) — uma falha de
**medição** nunca bloqueia, só uma regressão **medida** bloqueia.

## Backlog: Scorecard advisory → bloqueante

Depois do 1º release verde com Scorecard reportando:

- Scorecard: catraca de score (congela o score medido; não pode cair).

Casa com os gates da Fase 7 (osv-scanner, gitleaks, actionlint+zizmor): zizmor
audita os próprios workflows; Scorecard mede a postura do repo no agregado.
