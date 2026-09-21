# Supply-Chain Gates (Phase 8 · Block A) (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../security/SUPPLY_CHAIN.md) · 🇪🇹 [am](../../../am/docs/security/SUPPLY_CHAIN.md) · 🇸🇦 [ar](../../../ar/docs/security/SUPPLY_CHAIN.md) · 🇦🇿 [az](../../../az/docs/security/SUPPLY_CHAIN.md) · 🇧🇬 [bg](../../../bg/docs/security/SUPPLY_CHAIN.md) · 🇧🇩 [bn](../../../bn/docs/security/SUPPLY_CHAIN.md) · 🇨🇿 [cs](../../../cs/docs/security/SUPPLY_CHAIN.md) · 🇩🇰 [da](../../../da/docs/security/SUPPLY_CHAIN.md) · 🇩🇪 [de](../../../de/docs/security/SUPPLY_CHAIN.md) · 🇬🇷 [el](../../../el/docs/security/SUPPLY_CHAIN.md) · 🇪🇸 [es](../../../es/docs/security/SUPPLY_CHAIN.md) · 🇪🇪 [et](../../../et/docs/security/SUPPLY_CHAIN.md) · 🇮🇷 [fa](../../../fa/docs/security/SUPPLY_CHAIN.md) · 🇫🇮 [fi](../../../fi/docs/security/SUPPLY_CHAIN.md) · 🇫🇷 [fr](../../../fr/docs/security/SUPPLY_CHAIN.md) · 🇮🇪 [ga](../../../ga/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [gu](../../../gu/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ha](../../../ha/docs/security/SUPPLY_CHAIN.md) · 🇮🇱 [he](../../../he/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [hi](../../../hi/docs/security/SUPPLY_CHAIN.md) · 🇭🇷 [hr](../../../hr/docs/security/SUPPLY_CHAIN.md) · 🇭🇺 [hu](../../../hu/docs/security/SUPPLY_CHAIN.md) · 🇦🇲 [hy](../../../hy/docs/security/SUPPLY_CHAIN.md) · 🇮🇩 [id](../../../id/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ig](../../../ig/docs/security/SUPPLY_CHAIN.md) · 🇮🇹 [it](../../../it/docs/security/SUPPLY_CHAIN.md) · 🇯🇵 [ja](../../../ja/docs/security/SUPPLY_CHAIN.md) · 🇬🇪 [ka](../../../ka/docs/security/SUPPLY_CHAIN.md) · 🇰🇭 [km](../../../km/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [kn](../../../kn/docs/security/SUPPLY_CHAIN.md) · 🇰🇷 [ko](../../../ko/docs/security/SUPPLY_CHAIN.md) · 🇱🇹 [lt](../../../lt/docs/security/SUPPLY_CHAIN.md) · 🇱🇻 [lv](../../../lv/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ml](../../../ml/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [mr](../../../mr/docs/security/SUPPLY_CHAIN.md) · 🇲🇾 [ms](../../../ms/docs/security/SUPPLY_CHAIN.md) · 🇲🇹 [mt](../../../mt/docs/security/SUPPLY_CHAIN.md) · 🇲🇲 [my](../../../my/docs/security/SUPPLY_CHAIN.md) · 🇳🇵 [ne](../../../ne/docs/security/SUPPLY_CHAIN.md) · 🇳🇴 [no](../../../no/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [or](../../../or/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [pa](../../../pa/docs/security/SUPPLY_CHAIN.md) · 🇵🇭 [phi](../../../phi/docs/security/SUPPLY_CHAIN.md) · 🇵🇱 [pl](../../../pl/docs/security/SUPPLY_CHAIN.md) · 🇵🇹 [pt](../../../pt/docs/security/SUPPLY_CHAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/SUPPLY_CHAIN.md) · 🇷🇴 [ro](../../../ro/docs/security/SUPPLY_CHAIN.md) · 🇷🇺 [ru](../../../ru/docs/security/SUPPLY_CHAIN.md) · 🇱🇰 [si](../../../si/docs/security/SUPPLY_CHAIN.md) · 🇸🇰 [sk](../../../sk/docs/security/SUPPLY_CHAIN.md) · 🇸🇮 [sl](../../../sl/docs/security/SUPPLY_CHAIN.md) · 🇷🇸 [sr](../../../sr/docs/security/SUPPLY_CHAIN.md) · 🇸🇪 [sv](../../../sv/docs/security/SUPPLY_CHAIN.md) · 🇰🇪 [sw](../../../sw/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ta](../../../ta/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [te](../../../te/docs/security/SUPPLY_CHAIN.md) · 🇹🇭 [th](../../../th/docs/security/SUPPLY_CHAIN.md) · 🇹🇷 [tr](../../../tr/docs/security/SUPPLY_CHAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/SUPPLY_CHAIN.md) · 🇵🇰 [ur](../../../ur/docs/security/SUPPLY_CHAIN.md) · 🇺🇿 [uz](../../../uz/docs/security/SUPPLY_CHAIN.md) · 🇻🇳 [vi](../../../vi/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [yo](../../../yo/docs/security/SUPPLY_CHAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/SUPPLY_CHAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/SUPPLY_CHAIN.md)

---

OmniRoute publiceert npm- en Docker-artifacts. Deze controles bieden herkomstinformatie,
inventarisatie (SBOM) en CVE-scans, volledig met OSS en geïntegreerd in releaseworkflows.
**Eerst adviserend** — ze rapporteren nu en worden na de eerste groene release
blokkerend.

| Controle                | Tool                                           | Waar                          | Blokkeert?                       | Uitvoer                                            |
| ----------------------- | ---------------------------------------------- | ----------------------------- | -------------------------------- | -------------------------------------------------- |
| SLSA-herkomst (npm)     | `npm --provenance` (OIDC)                      | `npm-publish.yml`             | alleen als publicatie mislukt    | npmjs-badge / `npm audit signatures`               |
| SBOM npm                | `@cyclonedx/cyclonedx-npm`                     | `npm-publish.yml`             | alleen als het genereren mislukt | Release-asset + artifact                           |
| SBOM-image              | `anchore/sbom-action` (syft)                   | `docker-publish.yml` (merge)  | adviserend                       | CycloneDX-artifact                                 |
| Trivy-CVE (SARIF)       | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | adviserend                       | SARIF (HIGH+CRITICAL) → tabblad Security           |
| Trivy CRITICAL-controle | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | **blokkerend**                   | `exit-code: '1'` bij oplosbare CRITICAL            |
| osv vulnCount           | `osv-scanner` (`check:vuln-ratchet --ratchet`) | `ci.yml` (`quality-extended`) | **blokkerend**                   | ratelt `metrics.vulnCount` vast (richting: omlaag) |
| OpenSSF Scorecard       | `ossf/scorecard-action`                        | `scorecard.yml` (cron)        | adviserend                       | SARIF → Security + badge                           |

De CVE-ratel voor images gebruikt **twee stappen** in `docker-publish.yml`: de SARIF-stap
(`HIGH,CRITICAL`, `exit-code: 0`) houdt HIGH+CRITICAL zichtbaar op het tabblad Security
zonder te blokkeren; de stap _CRITICAL-controle_ (`severity: CRITICAL`, `ignore-unfixed: true`,
`exit-code: 1`) laat de release mislukken bij een CRITICAL-CVE **waarvoor een oplossing beschikbaar is**. `ignore-unfixed`
voorkomt dat de release wordt geblokkeerd vanwege een CVE in het basisimage waarvoor nog geen upstream-patch bestaat.

## ⚠️ CVE-variatie (blokkerende osv-/Trivy-controles)

osv en Trivy vergelijken afhankelijkheden met CVE-databases die **continu groeien**. Een PR
die **geen afhankelijkheden wijzigt**, kan plotseling rood worden doordat een nieuwe CVE
bekend is gemaakt in een bestaande afhankelijkheid (osv: gemeten `vulnCount` > basiswaarde; Trivy: een nieuwe
oplosbare CRITICAL in het image). **Dit is het VERWACHTE operationele gedrag van een blokkerende
CVE-controle, geen productregressie.**

Wanneer osv of Trivy rood wordt vanwege een pas bekendgemaakte CVE, is de oplossing:

1. **Werk de getroffen afhankelijkheid bij** (voorkeur) — upgrade naar de gepatchte versie via `package.json`
   `overrides` (transitieve afhankelijkheden) of bouw het image opnieuw op basis van een gepatcht basisimage.
2. **Als er geen upstream-oplossing is:**
   - **osv:** stel een nieuwe basiswaarde in voor `metrics.vulnCount` in `config/quality/quality-baseline.json`
     (`npm run quality:ratchet -- --update` omvat geen afzonderlijke controles — wijzig de waarde
     handmatig, `direction:down`) met een motivering en een trackingissue.
   - **Trivy:** voeg een vermelding toe aan `.trivyignore` (één CVE-ID per regel), met een motiverende
     opmerking en een trackingissue. `ignore-unfixed: true` dekt CVE's zonder
     patches al automatisch af.

Beide controles worden **probleemloos OVERGESLAGEN** (exit 0) wanneer de tool ontbreekt of de meting
mislukt (osv-scanner niet in PATH, osv.dev/netwerk onbereikbaar, ongeldige JSON) — een mislukte
**meting** blokkeert nooit; alleen een **gemeten** regressie blokkeert.

## Backlog: Scorecard van adviserend naar blokkerend

Na de eerste groene release met Scorecard-rapportage:

- Scorecard: scoreratel (zet de gemeten score vast; deze kan niet dalen).

Vormt een aanvulling op de controles uit fase 7 (osv-scanner, gitleaks, actionlint+zizmor): zizmor
controleert de workflows zelf; Scorecard meet de algehele status van de repository.
