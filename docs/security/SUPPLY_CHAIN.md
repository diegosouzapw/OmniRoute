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
| Trivy CVE | `aquasecurity/trivy-action` | `docker-publish.yml` (merge) | **advisory** | SARIF → aba Security |
| OpenSSF Scorecard | `ossf/scorecard-action` | `scorecard.yml` (cron) | advisory | SARIF → Security + badge |

## Promoção advisory → bloqueante (backlog)

Depois do 1º release verde com Trivy/Scorecard reportando:

- Trivy: `exit-code: '1'` em CRITICAL (falha o release com CVE crítico na imagem).
- Scorecard: catraca de score (congela o score medido; não pode cair).

Casa com os gates da Fase 7 (osv-scanner, gitleaks, actionlint+zizmor): zizmor
audita os próprios workflows; Scorecard mede a postura do repo no agregado.
