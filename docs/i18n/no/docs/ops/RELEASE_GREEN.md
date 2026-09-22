# Release-Green: keeping the queue and release branch green (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Problemet dette løser

Den **fullstendige kontrollen** (`.github/workflows/ci.yml` — enhetstestdeler, vitest, ratchets,
`package-artifact`, SonarQube, E2E) kjører **bare på release-PR-en** (PR → `main`). PR-er som retter seg mot
`release/**`, får **hurtigkontrollene** (`quality.yml`: TIA-berørte tester + typekontroll + linting)
og, ved kodeendringer, et **rådgivende** produksjonsbygg. Konsekvensen er at røde feil som bare oppstår ved release,
fortsatt kan hope seg opp ubemerket på release-grenen og **eksplodere i lag på ~40 min** ved release,
én om gangen.

«release-green-familien» finnes for å **foregripe** disse røde feilene — validere det som tilsvarer den fullstendige
kontrollen **lokalt / utenfor release**, når som helst, slik at release-PR-en allerede er
grønn ved sin første CI-kjøring.

> **Ufravikelig prinsipp:** Ingenting av dette blokkerer bidragsyteren. Vi legger ikke til en obligatorisk
> kontroll som får PR-en deres til å feile. **Avviket** (ratchets) er noe vedlikeholderen skal etablere et nytt basisnivå for ved release —
> aldri noe bidragsyteren skal bekymre seg for. Ingen deler **lukker** en PR (stjeling av anerkjennelse) eller
> **svekker** en test for å bestå.

## Familien (4 deler) — og hvordan hver del kjører uavhengig

| Del                                                                       | Hva den er                                                                                   | Når den skal kjøres                                                   | Omfang                             |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------- |
| **`/green-prs`** (Løsning A)                                              | Vedlikeholderens behovsstyrte skanning av **køen med åpne PR-er**                            | **Uavhengig, regelmessig** — og særlig **før** en `/generate-release` | Hele PR-køen → `release/**`        |
| **`/validate-release-green`** (Løsning C — `npm run check:release-green`) | Valideringsmotor: gjenskaper den fullstendige kontrollen mot en gren ELLER en flettekandidat | Uavhengig, når som helst                                              | En bestemt gren eller en flette-PR |
| **`/babysit <PR#>`**                                                      | Driver **aktiv CI** for **én** PR til grønt                                                  | Uavhengig, per PR                                                     | Én enkelt PR                       |
| **`nightly-release-green.yml`** (Løsning D)                               | Automatisert nattlig arbeidsflyt; åpner en sak ved HARD rød                                  | Automatisk (cron)                                                     | Den aktive release-grenen          |

**Kort svar på «er dette bare for releaser?»:** **nei.** `/green-prs` ble utviklet for å
kjøre **regelmessig, mellom releaser**. Uavhengig kjøring er den normale bruken — release er bare
tidspunktet da en kjøring gir størst verdi.

## Rådgivende bygging fra PR til utgivelse

`quality.yml` inkluderer nå `Build (advisory)` for kode-PR-er som ikke er utkast, og Mergify-køgrener.
Den gjenspeiler produksjonsoppskriften for bygging fra `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` og `npm run build` med `OMNIROUTE_USE_TURBOPACK=1`. Den laster med hensikt
ikke opp en byggeartefakt, fordi ingen etterfølgende kvalitetsjobb bruker en i denne arbeidsflyten.
Fjern `continue-on-error` etter én uke med stabile kjøringer av utgivelses-PR-er, slik at signalet blir
en blokkerende port fra PR til utgivelse.

## Løsning C — `npm run check:release-green` (motoren)

Gjenskaper validering tilsvarende en utgivelse mot det gjeldende arbeidstreet og klassifiserer hver røde feil:

- **HARD** (typekontroll, lint-feil, enhetstester, vitest, db-rules, public-creds, valgfri
  `package-artifact`) → **reell feil**; `exit 1`. Rettes på kildegrenen (TDD, regel nr. 18).
- **DRIFT** (eslint-**advarsler**, kognitiv kompleksitet, filstørrelse) → gradvis avvik som har samlet seg opp i
  syklusen, **ikke bidragsyterens feil**; det rapporteres bare og **får ny baseline av vedlikeholderen ved
  utgivelse**. Avvik **endrer aldri** avslutningskoden — dermed blokkerer det aldri noen.

```bash
npm run check:release-green                 # gjeldende gren (arbeidstre)
node scripts/quality/validate-release-green.mjs --json   # strukturert utdata
node scripts/quality/validate-release-green.mjs --quick  # hopper over unit+vitest (kun avvik+typekontroll+lint)
node scripts/quality/validate-release-green.mjs --with-build  # inkluderer package-artifact (tregt)
```

Diagnostiserer og **rapporterer** bare (ingen automatisk retting). Orkestreringen for å rette til grønn status finnes i
`/green-prs` og `/review-prs`.

## Løsning A — `/green-prs` (køskanningen)

Prosedyre (sammendrag — se ferdigheten `green-prs` for detaljer):

1. **Kartlegg** køen med åpne PR-er mot den aktive utgivelsesgrenen.
2. **Vurder** hver PR (levedyktig / bør avvises / trenger bidragsyteren) — avvisning / trenger bidragsyteren blir
   **rapportert, ikke lukket** (bidragsyteren bestemmer).
3. For hver levedyktige PR: Bring PR-en opp til spissen av utgivelsesgrenen i et **isolert arbeidstre** (regel nr. 19), og kjør
   `npm run check:release-green`:
   - **HARD** → rett **på bidragsyterens gren** via medforfatterskap (bevarer bidragsyterens «Merged»-status),
     og kjør på nytt til alle HARD-feil er rettet.
   - **DRIFT** → la det stå; det får ny baseline ved utgivelsen.
4. **Rapporter** en tabell med PR × (resultat, HARD-feil, rettet?, DRIFT, utgivelsesklar nå?).

Kan **klargjøre** køen uten å flette; fletter bare når det uttrykkelig bes om det — og lukker aldri en PR.

## Anbefalt hyppighet

- Kjør **`/green-prs` regelmessig** (f.eks. ukentlig) og **alltid før en
  `/generate-release`**.
- Behold **`nightly-release-green.yml`** (løsning D) som et kontinuerlig signal: Når den oppretter en sak for en
  HARD-feil, er det på tide med en skanning.
- Bruk **`/validate-release-green`** ved behov for å kontrollere en gren eller en bestemt flettingskandidat.
- Bruk **`/babysit <PR#>`** når en bestemt PR må drives frem til grønn status i aktiv CI.

## Forholdet til utgivelsen

- `/generate-release` kaller validering i **fase 0 (forhåndskontroll)**: setter ny baseline for DRIFT og retter
  HARD-feil før utgivelses-PR-en åpnes.
- `/review-prs` bruker porten for utgivelsesklar status i beslutningstrinnet for fletting (grønn før fletting).

Målet med alle delene er det samme: **en grønn utgivelses-PR ved første CI-kjøring**, i stedet for å ri
på røde feil i 40-minutters lag på utgivelsesdagen.
