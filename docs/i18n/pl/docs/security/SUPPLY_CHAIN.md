---
title: "Bramki łańcucha dostaw (Supply-Chain Gates)"
---

# Bramki łańcucha dostaw (Supply-Chain Gates) (Phase 8 · Block A)

OmniRoute publikuje artefakty npm + Docker. Te bramki zapewniają provenance,
inwentaryzację (SBOM) oraz skanowanie CVE — wszystko OSS, wpięte w workflowy release.
Postawa **advisory-first** — na razie raportują, na blokujące przechodzą po 1.
zielonym release.

| Gate                  | Tool                                           | Where                         | Blocks?                  | Output                                        |
| --------------------- | ---------------------------------------------- | ----------------------------- | ------------------------ | --------------------------------------------- |
| SLSA provenance (npm) | `npm --provenance` (OIDC)                      | `npm-publish.yml`             | only if publish fails    | badge npmjs / `npm audit signatures`          |
| SBOM npm              | `@cyclonedx/cyclonedx-npm`                     | `npm-publish.yml`             | only if generation fails | Release asset + artifact                      |
| SBOM image            | `anchore/sbom-action` (syft)                   | `docker-publish.yml` (merge)  | advisory                 | CycloneDX artifact                            |
| Trivy CVE (SARIF)     | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | advisory                 | SARIF (HIGH+CRITICAL) → Security tab          |
| Trivy CRITICAL gate   | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | **blocking**             | `exit-code: '1'` on fixable CRITICAL          |
| osv vulnCount         | `osv-scanner` (`check:vuln-ratchet --ratchet`) | `ci.yml` (`quality-extended`) | **blocking**             | ratchets `metrics.vulnCount` (direction:down) |
| OpenSSF Scorecard     | `ossf/scorecard-action`                        | `scorecard.yml` (cron)        | advisory                 | SARIF → Security + badge                      |

Ratchet CVE obrazu używa **dwóch kroków** w `docker-publish.yml`: krok SARIF
(`HIGH,CRITICAL`, `exit-code: 0`) utrzymuje HIGH+CRITICAL widoczne w zakładce Security
bez blokowania; krok _CRITICAL gate_ (`severity: CRITICAL`, `ignore-unfixed: true`,
`exit-code: 1`) oblewa release przy CRITICAL CVE **z dostępną poprawką**. `ignore-unfixed`
zapobiega blokowaniu release z powodu CVE obrazu bazowego bez upstreamowego patcha.

## ⚠️ Wariancja CVE (blokujące bramki osv/Trivy)

osv i Trivy porównują zależności z bazami CVE, które **ciągle rosną**. PR,
który **nie dotyka żadnych zależności**, może nagle zredzić się, bo ujawniono nowe CVE
w istniejącej zależności (osv: zmierzony `vulnCount` > baseline; Trivy: nowe
naprawialne CRITICAL w obrazie). **To jest OCZEKIWANE zachowanie operacyjne blokującej
bramki CVE, a nie regresja produktu.**

Gdy osv lub Trivy zredzieją przez nowo ujawnione CVE, remedium to:

1. **Podnieś wersję dotkniętej zależności** (preferowane) — upgrade do wersji z patchiem przez `package.json`
   `overrides` (zależności transitive) albo przebuduj obraz na załatanej bazie.
2. **Jeśli nie ma upstreamowego fixa:**
   - **osv:** zrób re-baseline `metrics.vulnCount` w `config/quality/quality-baseline.json`
     (`npm run quality:ratchet -- --update` nie obejmuje dedykowanych bramek — edytuj wartość
     ręcznie, `direction:down`) z notatką uzasadniającą + issue trackingowym.
   - **Trivy:** dodaj wpis w `.trivyignore` (CVE-ID w linii) z komentarzem
     uzasadniającym + issue trackingowym. `ignore-unfixed: true` już automatycznie
     pokrywa CVE bez patchy.

Obie bramki **łagodnie SKIP-ują** (exit 0), gdy narzędzie jest niedostępne albo pomiar
się nie uda (osv-scanner nie w PATH, osv.dev/sieć niedostępna, nieprawidłowy JSON) —
awaria **pomiaru** nigdy nie blokuje; blokuje tylko zmierzona **regresja**.

## Backlog: Scorecard advisory → blocking

Po 1. zielonym release ze Scorecardem raportującym:

- Scorecard: score ratchet (zamraża zmierzony score; nie może spaść).

Uzupełnia bramki Phase 7 (osv-scanner, gitleaks, actionlint+zizmor): zizmor
audytuje same workflowy; Scorecard mierzy postawę repo w agregacie.
