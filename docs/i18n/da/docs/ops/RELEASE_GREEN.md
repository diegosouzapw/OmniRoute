# Release-Green: keeping the queue and release branch green (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Problemet, dette løser

Den **fulde gate** (`.github/workflows/ci.yml` — unit-shards, vitest, ratchets,
`package-artifact`, SonarQube, E2E) kører **kun på release-PR'en** (PR → `main`). PR'er, der er målrettet
`release/**`, får **fast-gates** (`quality.yml`: TIA-påvirkede tests + typecheck + lint)
og, ved kodeændringer, et **vejledende** produktionsbuild. Konsekvensen er, at røde resultater, der kun opstår ved release, stadig kan
ophobe sig ubemærket på release-branchen og **eksplodere i lag på ~40 min.** ved releasetidspunktet,
ét ad gangen.

"release-green-familien" findes for at **foregribe** disse røde resultater — validér det, der svarer til den fulde
gate, **lokalt / uden for release**, når som helst, så release-PR'en allerede er
grøn ved sin første CI-kørsel.

> **Ufravigeligt princip:** Intet af dette blokerer bidragyderne. Vi tilføjer ikke et påkrævet
> check, der får deres PR til at fejle. **Drift** (ratchets) er noget, maintaineren skal rebaseline ved release —
> aldrig noget, bidragyderne skal bekymre sig om. Ingen del **lukker** en PR (stjæler anerkendelsen) eller
> **svækker** en test for at få den til at bestå.

## Familien (4 dele) — og hvordan hver del kører uafhængigt

| Del                                                                       | Hvad den er                                                                         | Hvornår den skal køres                                             | Omfang                           |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------- |
| **`/green-prs`** (Løsning A)                                              | Maintainerens scanning efter behov af **køen af åbne PR'er**                        | **Uafhængigt, periodisk** — og især **før** en `/generate-release` | Hele PR-køen → `release/**`      |
| **`/validate-release-green`** (Løsning C — `npm run check:release-green`) | Valideringsmotor: reproducerer den fulde gate for en branch ELLER en merge-kandidat | Uafhængigt, når som helst                                          | En bestemt branch eller merge-PR |
| **`/babysit <PR#>`**                                                      | Driver **live-CI** for **én** PR frem mod grønt resultat                            | Uafhængigt, pr. PR                                                 | En enkelt PR                     |
| **`nightly-release-green.yml`** (Løsning D)                               | Automatiseret natlig workflow; åbner et issue ved HÅRD rød                          | Automatisk (cron)                                                  | Den aktive release-branch        |

**Kort svar på "er dette kun til releases?":** **nej.** `/green-prs` er designet til at
køre **periodisk mellem releases**. Uafhængig kørsel er den normale anvendelse — release er blot
det tidspunkt, hvor det giver størst værdi at køre den.

## Vejledende build fra PR til release

`quality.yml` inkluderer nu `Build (advisory)` for kode-PR'er, der ikke er kladder, og Mergify-køgrene.
Det afspejler produktionsbuild-opskriften fra `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` og `npm run build` med `OMNIROUTE_USE_TURBOPACK=1`. Det uploader bevidst
ikke et build-artefakt, fordi intet efterfølgende kvalitetsjob bruger et i dette workflow.
Fjern `continue-on-error` efter en uge med stabile kørsler af release-PR'er, så signalet bliver en
blokerende gate fra PR til release.

## Løsning C — `npm run check:release-green` (motoren)

Genskaber releaseækvivalent validering mod det aktuelle arbejdstræ og klassificerer hver rød status:

- **HARD** (typecheck, lint-fejl, unit, vitest, db-rules, public-creds, valgfri
  `package-artifact`) → **reel defekt**; `exit 1`. Rettes på kildegrenen (TDD, regel nr. 18).
- **DRIFT** (eslint-**advarsler**, cognitive-complexity, file-size) → ratchet-drift akkumuleret i
  cyklussen, **ikke bidragyderens skyld**; den rapporteres kun og **genbaselines af vedligeholderen ved
  release**. Drift ændrer **aldrig** exitkoden — så den blokerer aldrig nogen.

```bash
npm run check:release-green                 # aktuel gren (arbejdstræ)
node scripts/quality/validate-release-green.mjs --json   # struktureret output
node scripts/quality/validate-release-green.mjs --quick  # springer unit+vitest over (kun drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # inkluderer package-artifact (langsom)
```

Diagnosticerer og **rapporterer** kun (ingen automatisk rettelse). Orkestreringen af rettelser til grøn status findes i
`/green-prs` og `/review-prs`.

## Løsning A — `/green-prs` (køscanningen)

Procedure (oversigt — se færdigheden `green-prs` for detaljer):

1. **Kortlæg** køen af åbne PR'er mod den aktive releasegren.
2. **Triagér** hver PR (levedygtig / bør afvises / kræver forfatterens handling) — dem, der bør afvises eller kræver forfatterens handling,
   **rapporteres, men lukkes ikke** (forfatteren beslutter).
3. For hver levedygtig PR skal du i et **isoleret arbejdstræ** (regel nr. 19) føre PR'en frem til spidsen af releasegrenen og køre
   `npm run check:release-green`:
   - **HARD** → ret **på bidragyderens gren** via medforfatterskab (bevarer forfatterens status som "Merged"),
     og kør igen, indtil alle HARD-fejl er ryddet.
   - **DRIFT** → lad den være; den genbaselines ved release.
4. **Rapportér** en tabel med PR × (resultat, HARD-fejl, rettet?, DRIFT, release-green nu?).

Kan **forberede** køen uden at merge; merger kun, når det udtrykkeligt anmodes — og lukker aldrig en PR.

## Anbefalet kadence

- Kør **`/green-prs` regelmæssigt** (f.eks. ugentligt) og **altid før en
  `/generate-release`**.
- Behold **`nightly-release-green.yml`** (løsning D) som et kontinuerligt signal: Når det åbner en
  issue om en HARD-fejl, er det tid til en scanning.
- Brug **`/validate-release-green`** ad hoc til at kontrollere en gren eller en specifik mergekandidat.
- Brug **`/babysit <PR#>`**, når en bestemt PR skal drives frem til grøn status i aktiv CI.

## Forholdet til release

- `/generate-release` kalder valideringen i **fase 0 (forhåndskontrol)**: genbaseliner DRIFT og retter
  HARD, før release-PR'en åbnes.
- `/review-prs` bruger release-green-gaten ved beslutningen om merge (grøn-før-merge).

Målet med alle delene er det samme: **en grøn release-PR ved den første CI-kørsel** i stedet for at surfe
på røde statusser i lag af 40 minutter på releasedagen.
