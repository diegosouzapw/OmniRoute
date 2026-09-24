# Supply-Chain Gates (Phase 8 · Block A) (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/SUPPLY_CHAIN.md) · 🇪🇹 [am](../../../am/docs/security/SUPPLY_CHAIN.md) · 🇸🇦 [ar](../../../ar/docs/security/SUPPLY_CHAIN.md) · 🇦🇿 [az](../../../az/docs/security/SUPPLY_CHAIN.md) · 🇧🇬 [bg](../../../bg/docs/security/SUPPLY_CHAIN.md) · 🇧🇩 [bn](../../../bn/docs/security/SUPPLY_CHAIN.md) · 🇧🇦 [bs](../../../bs/docs/security/SUPPLY_CHAIN.md) · 🇨🇿 [cs](../../../cs/docs/security/SUPPLY_CHAIN.md) · 🇩🇪 [de](../../../de/docs/security/SUPPLY_CHAIN.md) · 🇬🇷 [el](../../../el/docs/security/SUPPLY_CHAIN.md) · 🇪🇸 [es](../../../es/docs/security/SUPPLY_CHAIN.md) · 🇪🇪 [et](../../../et/docs/security/SUPPLY_CHAIN.md) · 🇮🇷 [fa](../../../fa/docs/security/SUPPLY_CHAIN.md) · 🇫🇮 [fi](../../../fi/docs/security/SUPPLY_CHAIN.md) · 🇫🇷 [fr](../../../fr/docs/security/SUPPLY_CHAIN.md) · 🇮🇪 [ga](../../../ga/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [gu](../../../gu/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ha](../../../ha/docs/security/SUPPLY_CHAIN.md) · 🇮🇱 [he](../../../he/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [hi](../../../hi/docs/security/SUPPLY_CHAIN.md) · 🇭🇷 [hr](../../../hr/docs/security/SUPPLY_CHAIN.md) · 🇭🇺 [hu](../../../hu/docs/security/SUPPLY_CHAIN.md) · 🇦🇲 [hy](../../../hy/docs/security/SUPPLY_CHAIN.md) · 🇮🇩 [id](../../../id/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ig](../../../ig/docs/security/SUPPLY_CHAIN.md) · 🇮🇹 [it](../../../it/docs/security/SUPPLY_CHAIN.md) · 🇯🇵 [ja](../../../ja/docs/security/SUPPLY_CHAIN.md) · 🇬🇪 [ka](../../../ka/docs/security/SUPPLY_CHAIN.md) · 🇰🇭 [km](../../../km/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [kn](../../../kn/docs/security/SUPPLY_CHAIN.md) · 🇰🇷 [ko](../../../ko/docs/security/SUPPLY_CHAIN.md) · 🇱🇹 [lt](../../../lt/docs/security/SUPPLY_CHAIN.md) · 🇱🇻 [lv](../../../lv/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ml](../../../ml/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [mr](../../../mr/docs/security/SUPPLY_CHAIN.md) · 🇲🇾 [ms](../../../ms/docs/security/SUPPLY_CHAIN.md) · 🇲🇹 [mt](../../../mt/docs/security/SUPPLY_CHAIN.md) · 🇲🇲 [my](../../../my/docs/security/SUPPLY_CHAIN.md) · 🇳🇵 [ne](../../../ne/docs/security/SUPPLY_CHAIN.md) · 🇳🇱 [nl](../../../nl/docs/security/SUPPLY_CHAIN.md) · 🇳🇴 [no](../../../no/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [or](../../../or/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [pa](../../../pa/docs/security/SUPPLY_CHAIN.md) · 🇵🇭 [phi](../../../phi/docs/security/SUPPLY_CHAIN.md) · 🇵🇱 [pl](../../../pl/docs/security/SUPPLY_CHAIN.md) · 🇵🇹 [pt](../../../pt/docs/security/SUPPLY_CHAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/SUPPLY_CHAIN.md) · 🇷🇴 [ro](../../../ro/docs/security/SUPPLY_CHAIN.md) · 🇷🇺 [ru](../../../ru/docs/security/SUPPLY_CHAIN.md) · 🇱🇰 [si](../../../si/docs/security/SUPPLY_CHAIN.md) · 🇸🇰 [sk](../../../sk/docs/security/SUPPLY_CHAIN.md) · 🇸🇮 [sl](../../../sl/docs/security/SUPPLY_CHAIN.md) · 🇷🇸 [sr](../../../sr/docs/security/SUPPLY_CHAIN.md) · 🇸🇪 [sv](../../../sv/docs/security/SUPPLY_CHAIN.md) · 🇰🇪 [sw](../../../sw/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ta](../../../ta/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [te](../../../te/docs/security/SUPPLY_CHAIN.md) · 🇹🇭 [th](../../../th/docs/security/SUPPLY_CHAIN.md) · 🇹🇷 [tr](../../../tr/docs/security/SUPPLY_CHAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/SUPPLY_CHAIN.md) · 🇵🇰 [ur](../../../ur/docs/security/SUPPLY_CHAIN.md) · 🇺🇿 [uz](../../../uz/docs/security/SUPPLY_CHAIN.md) · 🇻🇳 [vi](../../../vi/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [yo](../../../yo/docs/security/SUPPLY_CHAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/SUPPLY_CHAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/SUPPLY_CHAIN.md)

---

OmniRoute udgiver npm- og Docker-artefakter. Disse gates leverer proveniens,
inventarliste (SBOM) og CVE-scanning, alt sammen OSS og integreret i release-workflows.
**Advisory-first**-tilgang — de rapporterer nu og ændres til blokerende efter den første
grønne release.

| Gate                  | Værktøj                                        | Hvor                            | Blokerer?                    | Output                                         |
| --------------------- | ---------------------------------------------- | ------------------------------- | ---------------------------- | ---------------------------------------------- |
| SLSA-proveniens (npm) | `npm --provenance` (OIDC)                      | `npm-publish.yml`               | kun hvis udgivelsen fejler   | badge på npmjs / `npm audit signatures`        |
| SBOM for npm          | `@cyclonedx/cyclonedx-npm`                     | `npm-publish.yml`               | kun hvis genereringen fejler | Release-asset + artefakt                       |
| SBOM for image        | `anchore/sbom-action` (syft)                   | `docker-publish.yml` (fletning) | rådgivende                   | CycloneDX-artefakt                             |
| Trivy-CVE (SARIF)     | `aquasecurity/trivy-action`                    | `docker-publish.yml` (fletning) | rådgivende                   | SARIF (HIGH+CRITICAL) → fanen Security         |
| Trivy CRITICAL-gate   | `aquasecurity/trivy-action`                    | `docker-publish.yml` (fletning) | **blokerende**               | `exit-code: '1'` ved CRITICAL, der kan rettes  |
| osv vulnCount         | `osv-scanner` (`check:vuln-ratchet --ratchet`) | `ci.yml` (`quality-extended`)   | **blokerende**               | ratcheter `metrics.vulnCount` (direction:down) |
| OpenSSF Scorecard     | `ossf/scorecard-action`                        | `scorecard.yml` (cron)          | rådgivende                   | SARIF → Security + badge                       |

Image-CVE-ratcheten bruger **to trin** i `docker-publish.yml`: SARIF-trinnet
(`HIGH,CRITICAL`, `exit-code: 0`) holder HIGH+CRITICAL synlige på fanen Security
uden at blokere; trinnet _CRITICAL-gate_ (`severity: CRITICAL`, `ignore-unfixed: true`,
`exit-code: 1`) får releasen til at fejle ved en CRITICAL-CVE, **hvor en rettelse er
tilgængelig**. `ignore-unfixed` forhindrer blokering af releasen på grund af en
CVE i basisimaget uden en upstream-patch.

## ⚠️ CVE-variation (blokerende osv-/Trivy-gates)

osv og Trivy sammenligner afhængigheder med CVE-databaser, som **vokser løbende**. En PR,
der **ikke ændrer nogen afhængigheder**, kan pludselig blive rød, fordi en ny CVE er
blevet offentliggjort i en eksisterende afhængighed (osv: målt `vulnCount` > baseline;
Trivy: en ny CRITICAL i imaget, der kan rettes). **Dette er FORVENTET driftsadfærd for
en blokerende CVE-gate, ikke en produktregression.**

Når osv eller Trivy bliver røde på grund af en nyligt offentliggjort CVE, er løsningen:

1. **Opgradér den berørte afhængighed** (foretrækkes) — opgradér til den patchede version via
   `package.json`-feltet `overrides` (transitive afhængigheder), eller genopbyg imaget på
   en patchet base.
2. **Hvis der ikke findes en upstream-rettelse:**
   - **osv:** Fastlæg en ny baseline for `metrics.vulnCount` i
     `config/quality/quality-baseline.json` (`npm run quality:ratchet -- --update` omfatter
     ikke dedikerede gates — redigér værdien manuelt, `direction:down`) med en
     begrundende note + et tracking-issue.
   - **Trivy:** Tilføj en post i `.trivyignore` (ét CVE-id pr. linje) med en begrundende
     kommentar + et tracking-issue. `ignore-unfixed: true` omfatter allerede automatisk
     CVE'er uden patches.

Begge gates **SKIPPER kontrolleret** (exit 0), når værktøjet mangler, eller målingen
fejler (`osv-scanner` ikke i PATH, osv.dev/netværket kan ikke nås, ugyldig JSON) — en
**målefejl** blokerer aldrig; kun en **målt** regression blokerer.

## Backlog: Scorecard fra rådgivende → blokerende

Efter den første grønne release med Scorecard-rapportering:

- Scorecard: score-ratchet (fastlåser den målte score; den må ikke falde).

Supplerer Phase 7-gatene (`osv-scanner`, `gitleaks`, `actionlint`+`zizmor`): `zizmor`
auditerer selve workflowsene; Scorecard måler repositoryets samlede sikkerhedsprofil.
