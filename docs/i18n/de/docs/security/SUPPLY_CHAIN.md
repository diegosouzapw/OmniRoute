# Supply-Chain Gates (Phase 8 · Block A) (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../security/SUPPLY_CHAIN.md) · 🇪🇹 [am](../../../am/docs/security/SUPPLY_CHAIN.md) · 🇸🇦 [ar](../../../ar/docs/security/SUPPLY_CHAIN.md) · 🇦🇿 [az](../../../az/docs/security/SUPPLY_CHAIN.md) · 🇧🇬 [bg](../../../bg/docs/security/SUPPLY_CHAIN.md) · 🇧🇩 [bn](../../../bn/docs/security/SUPPLY_CHAIN.md) · 🇧🇦 [bs](../../../bs/docs/security/SUPPLY_CHAIN.md) · 🇨🇿 [cs](../../../cs/docs/security/SUPPLY_CHAIN.md) · 🇩🇰 [da](../../../da/docs/security/SUPPLY_CHAIN.md) · 🇬🇷 [el](../../../el/docs/security/SUPPLY_CHAIN.md) · 🇪🇸 [es](../../../es/docs/security/SUPPLY_CHAIN.md) · 🇪🇪 [et](../../../et/docs/security/SUPPLY_CHAIN.md) · 🇮🇷 [fa](../../../fa/docs/security/SUPPLY_CHAIN.md) · 🇫🇮 [fi](../../../fi/docs/security/SUPPLY_CHAIN.md) · 🇫🇷 [fr](../../../fr/docs/security/SUPPLY_CHAIN.md) · 🇮🇪 [ga](../../../ga/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [gu](../../../gu/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ha](../../../ha/docs/security/SUPPLY_CHAIN.md) · 🇮🇱 [he](../../../he/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [hi](../../../hi/docs/security/SUPPLY_CHAIN.md) · 🇭🇷 [hr](../../../hr/docs/security/SUPPLY_CHAIN.md) · 🇭🇺 [hu](../../../hu/docs/security/SUPPLY_CHAIN.md) · 🇦🇲 [hy](../../../hy/docs/security/SUPPLY_CHAIN.md) · 🇮🇩 [id](../../../id/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ig](../../../ig/docs/security/SUPPLY_CHAIN.md) · 🇮🇹 [it](../../../it/docs/security/SUPPLY_CHAIN.md) · 🇯🇵 [ja](../../../ja/docs/security/SUPPLY_CHAIN.md) · 🇬🇪 [ka](../../../ka/docs/security/SUPPLY_CHAIN.md) · 🇰🇭 [km](../../../km/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [kn](../../../kn/docs/security/SUPPLY_CHAIN.md) · 🇰🇷 [ko](../../../ko/docs/security/SUPPLY_CHAIN.md) · 🇱🇹 [lt](../../../lt/docs/security/SUPPLY_CHAIN.md) · 🇱🇻 [lv](../../../lv/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ml](../../../ml/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [mr](../../../mr/docs/security/SUPPLY_CHAIN.md) · 🇲🇾 [ms](../../../ms/docs/security/SUPPLY_CHAIN.md) · 🇲🇹 [mt](../../../mt/docs/security/SUPPLY_CHAIN.md) · 🇲🇲 [my](../../../my/docs/security/SUPPLY_CHAIN.md) · 🇳🇵 [ne](../../../ne/docs/security/SUPPLY_CHAIN.md) · 🇳🇱 [nl](../../../nl/docs/security/SUPPLY_CHAIN.md) · 🇳🇴 [no](../../../no/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [or](../../../or/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [pa](../../../pa/docs/security/SUPPLY_CHAIN.md) · 🇵🇭 [phi](../../../phi/docs/security/SUPPLY_CHAIN.md) · 🇵🇱 [pl](../../../pl/docs/security/SUPPLY_CHAIN.md) · 🇵🇹 [pt](../../../pt/docs/security/SUPPLY_CHAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/SUPPLY_CHAIN.md) · 🇷🇴 [ro](../../../ro/docs/security/SUPPLY_CHAIN.md) · 🇷🇺 [ru](../../../ru/docs/security/SUPPLY_CHAIN.md) · 🇱🇰 [si](../../../si/docs/security/SUPPLY_CHAIN.md) · 🇸🇰 [sk](../../../sk/docs/security/SUPPLY_CHAIN.md) · 🇸🇮 [sl](../../../sl/docs/security/SUPPLY_CHAIN.md) · 🇷🇸 [sr](../../../sr/docs/security/SUPPLY_CHAIN.md) · 🇸🇪 [sv](../../../sv/docs/security/SUPPLY_CHAIN.md) · 🇰🇪 [sw](../../../sw/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ta](../../../ta/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [te](../../../te/docs/security/SUPPLY_CHAIN.md) · 🇹🇭 [th](../../../th/docs/security/SUPPLY_CHAIN.md) · 🇹🇷 [tr](../../../tr/docs/security/SUPPLY_CHAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/SUPPLY_CHAIN.md) · 🇵🇰 [ur](../../../ur/docs/security/SUPPLY_CHAIN.md) · 🇺🇿 [uz](../../../uz/docs/security/SUPPLY_CHAIN.md) · 🇻🇳 [vi](../../../vi/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [yo](../../../yo/docs/security/SUPPLY_CHAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/SUPPLY_CHAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/SUPPLY_CHAIN.md)

---

OmniRoute veröffentlicht npm- und Docker-Artefakte. Diese Gates stellen Herkunftsnachweise,
Inventarisierung (SBOM) und CVE-Scans bereit, vollständig auf OSS-Basis und in die Release-Workflows integriert.
**Advisory-first**-Ansatz — derzeit geben sie nur Meldungen aus; nach dem ersten
grünen Release werden sie als blockierend aktiviert.

| Gate                         | Tool                                           | Wo                            | Blockiert?                                | Ausgabe                                         |
| ---------------------------- | ---------------------------------------------- | ----------------------------- | ----------------------------------------- | ----------------------------------------------- |
| SLSA-Herkunftsnachweis (npm) | `npm --provenance` (OIDC)                      | `npm-publish.yml`             | nur bei fehlgeschlagener Veröffentlichung | Badge auf npmjs / `npm audit signatures`        |
| SBOM für npm                 | `@cyclonedx/cyclonedx-npm`                     | `npm-publish.yml`             | nur bei fehlgeschlagener Generierung      | Release-Asset + Artefakt                        |
| SBOM für Image               | `anchore/sbom-action` (syft)                   | `docker-publish.yml` (Merge)  | informativ                                | CycloneDX-Artefakt                              |
| Trivy-CVE (SARIF)            | `aquasecurity/trivy-action`                    | `docker-publish.yml` (Merge)  | informativ                                | SARIF (HIGH+CRITICAL) → Security-Tab            |
| Trivy-CRITICAL-Gate          | `aquasecurity/trivy-action`                    | `docker-publish.yml` (Merge)  | **blockierend**                           | `exit-code: '1'` bei behebbaren CRITICAL-Funden |
| osv-vulnCount                | `osv-scanner` (`check:vuln-ratchet --ratchet`) | `ci.yml` (`quality-extended`) | **blockierend**                           | verschärft `metrics.vulnCount` (direction:down) |
| OpenSSF Scorecard            | `ossf/scorecard-action`                        | `scorecard.yml` (cron)        | informativ                                | SARIF → Security + Badge                        |

Die CVE-Ratsche für Images verwendet **zwei Schritte** in `docker-publish.yml`: Der SARIF-Schritt
(`HIGH,CRITICAL`, `exit-code: 0`) hält HIGH+CRITICAL im Security-Tab sichtbar,
ohne zu blockieren; der Schritt _CRITICAL-Gate_ (`severity: CRITICAL`, `ignore-unfixed: true`,
`exit-code: 1`) lässt das Release bei einer CRITICAL-CVE **mit verfügbarer Fehlerbehebung**
fehlschlagen. `ignore-unfixed` verhindert, dass das Release wegen einer CVE im Basis-Image
ohne verfügbaren Upstream-Patch blockiert wird.

## ⚠️ CVE-Varianz (blockierende osv-/Trivy-Gates)

osv und Trivy gleichen Abhängigkeiten mit CVE-Datenbanken ab, die **kontinuierlich wachsen**. Ein PR,
der **keine Abhängigkeiten verändert**, kann plötzlich rot werden, weil eine neue CVE
in einer vorhandenen Abhängigkeit veröffentlicht wurde (osv: gemessener `vulnCount` > Baseline; Trivy: eine neue
behebbare CRITICAL-CVE im Image). **Dies ist das ERWARTETE Betriebsverhalten eines blockierenden
CVE-Gates und keine Produktregression.**

Wenn osv oder Trivy aufgrund einer neu veröffentlichten CVE rot werden, ist folgendermaßen vorzugehen:

1. **Betroffene Abhängigkeit aktualisieren** (bevorzugt) — auf die gepatchte Version aktualisieren, entweder über `package.json`
   `overrides` (transitive Abhängigkeiten) oder durch einen erneuten Build des Images auf einer gepatchten Basis.
2. **Wenn es keine Upstream-Fehlerbehebung gibt:**
   - **osv:** `metrics.vulnCount` in `config/quality/quality-baseline.json` neu als Baseline festlegen
     (`npm run quality:ratchet -- --update` deckt dedizierte Gates nicht ab — den Wert
     manuell bearbeiten, `direction:down`) und einen Begründungshinweis sowie ein Tracking-Issue hinzufügen.
   - **Trivy:** Einen Eintrag in `.trivyignore` hinzufügen (eine CVE-ID pro Zeile), einschließlich eines begründenden
     Kommentars und eines Tracking-Issues. `ignore-unfixed: true` deckt CVEs ohne
     Patches bereits automatisch ab.

Beide Gates führen einen **ordnungsgemäßen SKIP** aus (Exit-Code 0), wenn das Tool fehlt oder die Messung
fehlschlägt (`osv-scanner` nicht in PATH, osv.dev/Netzwerk nicht erreichbar, ungültiges JSON) — ein
**Messfehler** blockiert niemals; nur eine **gemessene** Regression blockiert.

## Backlog: Scorecard von informativ zu blockierend

Nach dem ersten grünen Release mit Scorecard-Berichterstellung:

- Scorecard: Score-Ratsche (fixiert den gemessenen Score; er kann nicht sinken).

Ergänzt die Gates aus Phase 7 (osv-scanner, gitleaks, actionlint+zizmor): zizmor
prüft die Workflows selbst; Scorecard misst die Repository-Sicherheitslage als Ganzes.
