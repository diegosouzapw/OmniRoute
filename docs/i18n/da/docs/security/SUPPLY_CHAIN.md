# Supply-Chain Gates (Phase 8 · Block A) (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/SUPPLY_CHAIN.md) · 🇪🇹 [am](../../../am/docs/security/SUPPLY_CHAIN.md) · 🇸🇦 [ar](../../../ar/docs/security/SUPPLY_CHAIN.md) · 🇦🇿 [az](../../../az/docs/security/SUPPLY_CHAIN.md) · 🇧🇬 [bg](../../../bg/docs/security/SUPPLY_CHAIN.md) · 🇧🇩 [bn](../../../bn/docs/security/SUPPLY_CHAIN.md) · 🇧🇦 [bs](../../../bs/docs/security/SUPPLY_CHAIN.md) · 🇨🇿 [cs](../../../cs/docs/security/SUPPLY_CHAIN.md) · 🇩🇪 [de](../../../de/docs/security/SUPPLY_CHAIN.md) · 🇬🇷 [el](../../../el/docs/security/SUPPLY_CHAIN.md) · 🇪🇸 [es](../../../es/docs/security/SUPPLY_CHAIN.md) · 🇪🇪 [et](../../../et/docs/security/SUPPLY_CHAIN.md) · 🇮🇷 [fa](../../../fa/docs/security/SUPPLY_CHAIN.md) · 🇫🇮 [fi](../../../fi/docs/security/SUPPLY_CHAIN.md) · 🇫🇷 [fr](../../../fr/docs/security/SUPPLY_CHAIN.md) · 🇮🇪 [ga](../../../ga/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [gu](../../../gu/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ha](../../../ha/docs/security/SUPPLY_CHAIN.md) · 🇮🇱 [he](../../../he/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [hi](../../../hi/docs/security/SUPPLY_CHAIN.md) · 🇭🇷 [hr](../../../hr/docs/security/SUPPLY_CHAIN.md) · 🇭🇺 [hu](../../../hu/docs/security/SUPPLY_CHAIN.md) · 🇦🇲 [hy](../../../hy/docs/security/SUPPLY_CHAIN.md) · 🇮🇩 [id](../../../id/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ig](../../../ig/docs/security/SUPPLY_CHAIN.md) · 🇮🇹 [it](../../../it/docs/security/SUPPLY_CHAIN.md) · 🇯🇵 [ja](../../../ja/docs/security/SUPPLY_CHAIN.md) · 🇬🇪 [ka](../../../ka/docs/security/SUPPLY_CHAIN.md) · 🇰🇭 [km](../../../km/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [kn](../../../kn/docs/security/SUPPLY_CHAIN.md) · 🇰🇷 [ko](../../../ko/docs/security/SUPPLY_CHAIN.md) · 🇱🇹 [lt](../../../lt/docs/security/SUPPLY_CHAIN.md) · 🇱🇻 [lv](../../../lv/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ml](../../../ml/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [mr](../../../mr/docs/security/SUPPLY_CHAIN.md) · 🇲🇾 [ms](../../../ms/docs/security/SUPPLY_CHAIN.md) · 🇲🇹 [mt](../../../mt/docs/security/SUPPLY_CHAIN.md) · 🇲🇲 [my](../../../my/docs/security/SUPPLY_CHAIN.md) · 🇳🇵 [ne](../../../ne/docs/security/SUPPLY_CHAIN.md) · 🇳🇱 [nl](../../../nl/docs/security/SUPPLY_CHAIN.md) · 🇳🇴 [no](../../../no/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [or](../../../or/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [pa](../../../pa/docs/security/SUPPLY_CHAIN.md) · 🇵🇭 [phi](../../../phi/docs/security/SUPPLY_CHAIN.md) · 🇵🇱 [pl](../../../pl/docs/security/SUPPLY_CHAIN.md) · 🇵🇹 [pt](../../../pt/docs/security/SUPPLY_CHAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/SUPPLY_CHAIN.md) · 🇷🇴 [ro](../../../ro/docs/security/SUPPLY_CHAIN.md) · 🇷🇺 [ru](../../../ru/docs/security/SUPPLY_CHAIN.md) · 🇱🇰 [si](../../../si/docs/security/SUPPLY_CHAIN.md) · 🇸🇰 [sk](../../../sk/docs/security/SUPPLY_CHAIN.md) · 🇸🇮 [sl](../../../sl/docs/security/SUPPLY_CHAIN.md) · 🇷🇸 [sr](../../../sr/docs/security/SUPPLY_CHAIN.md) · 🇸🇪 [sv](../../../sv/docs/security/SUPPLY_CHAIN.md) · 🇰🇪 [sw](../../../sw/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ta](../../../ta/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [te](../../../te/docs/security/SUPPLY_CHAIN.md) · 🇹🇭 [th](../../../th/docs/security/SUPPLY_CHAIN.md) · 🇹🇷 [tr](../../../tr/docs/security/SUPPLY_CHAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/SUPPLY_CHAIN.md) · 🇵🇰 [ur](../../../ur/docs/security/SUPPLY_CHAIN.md) · 🇺🇿 [uz](../../../uz/docs/security/SUPPLY_CHAIN.md) · 🇻🇳 [vi](../../../vi/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [yo](../../../yo/docs/security/SUPPLY_CHAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/SUPPLY_CHAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/SUPPLY_CHAIN.md)

---

OmniRoute udgiver npm + Docker-artefakter. Disse gates leverer proveniens, inventar (SBOM) og CVE-scanning, alt sammen OSS, integreret i release-workflows. **Advisory-first** tilgang — de rapporterer nu, og promoverer til blokerende efter den 1. grønne release.

| Gate                  | Værktøj                                        | Hvor                          | Blokerer?                     | Output                                      |
| :-------------------- | :--------------------------------------------- | :---------------------------- | :---------------------------- | :------------------------------------------ |
| SLSA proveniens (npm) | `npm --provenance` (OIDC)                      | `npm-publish.yml`             | kun hvis publish mislykkes    | badge npmjs / `npm audit signatures`        |
| SBOM npm              | `@cyclonedx/cyclonedx-npm`                     | `npm-publish.yml`             | kun hvis generering mislykkes | Release-aktiv + artefakt                    |
| SBOM image            | `anchore/sbom-action` (syft)                   | `docker-publish.yml` (merge)  | rådgivende                    | CycloneDX-artefakt                          |
| Trivy CVE (SARIF)     | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | rådgivende                    | SARIF (HIGH+CRITICAL) → Sikkerhedsfanen     |
| Trivy KRITISK gate    | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | **blokerende**                | `exit-code: '1'` ved fikserbar KRITISK      |
| osv vulnCount         | `osv-scanner` (`check:vuln-ratchet --ratchet`) | `ci.yml` (`quality-extended`) | **blokerende**                | ratcheter `metrics.vulnCount` (retning:ned) |
| OpenSSF Scorecard     | `ossf/scorecard-action`                        | `scorecard.yml` (cron)        | rådgivende                    | SARIF → Sikkerhed + badge                   |

Image CVE-ratcheten bruger **to trin** i `docker-publish.yml`: SARIF-trinnet (`HIGH,CRITICAL`, `exit-code: 0`) holder HIGH+CRITICAL synlig i Sikkerhedsfanen uden at blokere; det _KRITISKE gate_-trin (`severity: CRITICAL`, `ignore-unfixed: true`, `exit-code: 1`) får releasen til at fejle ved en KRITISK CVE **med en tilgængelig løsning**. `ignore-unfixed` forhindrer blokering af releasen for en base-image CVE uden en upstream-patch.

## ⚠️ CVE-varians (blokerende osv/Trivy-gates)

osv og Trivy sammenligner afhængigheder med CVE-databaser, der **kontinuerligt vokser**. En PR, der **ikke rører ved afhængigheder**, kan pludselig blive rød, fordi en ny CVE blev afsløret i en eksisterende afhængighed (osv: målt `vulnCount` > baseline; Trivy: en ny fikserbar KRITISK i imaget). **Dette er FORVENTET operationel adfærd for en blokerende CVE-gate, ikke en produktregression.**

Når osv eller Trivy bliver rød på grund af en nyopdaget CVE, er løsningen:

1.  **Opdater den berørte afhængighed** (foretrukket) — opgrader til den patchede version via `package.json` `overrides` (transitive afhængigheder) eller genopbyg imaget på en patchet base.
2.  **Hvis der ikke er en upstream-løsning:**
    - **osv:** re-baseline `metrics.vulnCount` i `config/quality/quality-baseline.json` (`npm run quality:ratchet -- --update` dækker ikke dedikerede gates — rediger værdien manuelt, `direction:down`) med en begrundelsesnote + sporingssag.
    - **Trivy:** tilføj en post i `.trivyignore` (CVE-ID per linje) med en begrundelseskommentar + sporingssag. `ignore-unfixed: true` dækker allerede CVE'er uden patches automatisk.

Begge gates **SKIPPER elegant** (exit 0), når værktøjet mangler, eller målingen mislykkes (osv-scanner ikke i PATH, osv.dev/netværk utilgængeligt, ugyldig JSON) — en **målingsfejl** blokerer aldrig, kun en **målt** regression blokerer.

## Kendte Accepterede Risici

### extract-zip 2.0.1 — GHSA-7pqw-9j4j-h8q3 / GHSA-jmr9-qjv8-65gv (#14482)

`extract-zip@2.0.1` indeholder to uopdaterede symlink-traversal-advarsler med høj alvorlighedsgrad. I henhold til "ingen upstream-rettelse"-grenen af CVE Variance-afhjælpningen ovenfor er dette en **accepteret risiko**, ikke en opjustering:

- **Kæde:** `promptfoo` (devDependency) → `@openai/codex-security` → `extract-zip@2.0.1`. Bekræftet via `package-lock.json` — præcis én pakke i hele afhængighedstræet (`@openai/codex-security`) erklærer `extract-zip`, og præcis én pakke (`promptfoo`) erklærer `@openai/codex-security`.
- **Ingen rettet udgivelse eksisterer nogen steder i kæden.** `extract-zip@2.0.1` (udgivet 2020) er pakkens sidste udgivelse — den vedligeholdes ikke. `@openai/codex-security`'s nuværende npm-latest (`0.1.29`) trækker stadig `extract-zip@2.0.1`.
- **Uopnåelig fra produktion.** `promptfoo` er kun devDependency (aldrig opført under `dependencies`), og ingen fil under `src/`, `open-sse/` eller `bin/` importerer `extract-zip` npm-pakken — OmniRoutes egen `extractZip()` hjælpefunktion (`src/lib/versionManager/binaryManager.ts:93`) kalder native `unzip`/`tar` og er urelateret. `@openai/codex-security` leverer også sin egen symlink-traversal-beskyttelse ud over extract-zip's onEntry callback.
- **Undgå** at aliasere `extract-zip` via `package.json` `overrides` — den eneste levedygtige drop-in-erstatning er Electron-org-internal og API-inkompatibel med `@openai/codex-security`'s egne onEntry/defaultDirMode/defaultFileMode-tjek; at overskrive den ville lydløst bryde pakkens sikkerhedstjek.
- **Baseline:** målt osv `vulnCount` (3) er allerede et godt stykke under den frosne `config/quality/quality-baseline.json` baseline (27) — ingen ratchet-ændring nødvendig.
- **Regressionsbeskyttelse:** `tests/unit/extract-zip-14482-exposure.test.ts` bekræfter kæden og den ovenstående no-production-import invariant; den får CI til at fejle, hvis en af delene nogensinde brydes (f.eks. hvis en fremtidig PR gør `extract-zip` tilgængelig fra produktion).
- **Sporing:** issue #14482.

## Restance: Scorecard-rådgivning → blokerende

Efter den 1. grønne udgivelse med Scorecard-rapportering:

- Scorecard: score ratchet (fryser den målte score; kan ikke falde).

Komplementerer Fase 7-portene (osv-scanner, gitleaks, actionlint+zizmor): zizmor reviderer selve workflows; Scorecard måler repoets holdning samlet.
