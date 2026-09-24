# Release-Green: keeping the queue and release branch green (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Problemet detta löser

Den **fullständiga grinden** (`.github/workflows/ci.yml` — enhetstestshards, vitest, ratchets,
`package-artifact`, SonarQube, E2E) körs **endast på release-PR:en** (PR → `main`). PR:er som riktas mot
`release/**` får **snabbgrindarna** (`quality.yml`: TIA-påverkade tester + typkontroll + lintning)
och, vid kodändringar, ett **rådgivande** produktionsbygge. Konsekvensen är att röda resultat som endast uppstår vid release fortfarande kan
samlas obemärkt på release-grenen och **explodera i lager om ~40 min** vid releasetillfället,
ett i taget.

Familjen ”release-green” finns för att **förutse** dessa röda resultat — validera motsvarigheten till den fullständiga
grinden **lokalt/utanför release**, när som helst, så att release-PR:en redan är
grön vid sin första CI-körning.

> **Icke-förhandlingsbar princip:** inget av detta blockerar bidragsgivaren. Vi lägger inte till en obligatorisk
> kontroll som får deras PR att misslyckas. **Avvikelsen** (ratchets) är något som underhållaren ska baslinjejustera vid release —
> aldrig något som bidragsgivaren behöver bekymra sig om. Ingen del **stänger** en PR (stöld av erkännande) eller
> **försvagar** ett test för att få det att passera.

## Familjen (4 delar) — och hur var och en körs oberoende

| Del                                                                       | Vad den är                                                                                         | När den ska köras                                                         | Omfattning                                   |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------- |
| **`/green-prs`** (Lösning A)                                              | Underhållarens behovsstyrda genomsökning av **kön med öppna PR:er**                                | **Oberoende, regelbundet** — och särskilt **före** en `/generate-release` | Hela PR-kön → `release/**`                   |
| **`/validate-release-green`** (Lösning C — `npm run check:release-green`) | Valideringsmotor: återskapar den fullständiga grinden mot en gren ELLER en sammanslagningskandidat | Oberoende, när som helst                                                  | En specifik gren eller en sammanslagnings-PR |
| **`/babysit <PR#>`**                                                      | Driver **live-CI** för **en** PR tills den blir grön                                               | Oberoende, per PR                                                         | En enskild PR                                |
| **`nightly-release-green.yml`** (Lösning D)                               | Automatiserat nattligt arbetsflöde; öppnar ett ärende vid HÅRT rött resultat                       | Automatiskt (cron)                                                        | Den aktiva release-grenen                    |

**Kort svar på ”är detta endast för releaser?”:** **nej.** `/green-prs` utformades för att
köras **regelbundet, mellan releaser**. Oberoende körning är det normala användningssättet — release är bara
det tillfälle då en körning ger störst värde.

## Rådgivande bygge från PR till release

`quality.yml` innehåller nu `Build (advisory)` för kod-PR:er som inte är utkast samt Mergify-kögrenar.
Det speglar produktionsbyggets konfiguration från `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` och `npm run build` med `OMNIROUTE_USE_TURBOPACK=1`. Det laddar avsiktligt
inte upp någon byggartefakt eftersom inget efterföljande kvalitetsjobb använder en sådan i detta arbetsflöde.
Ta bort `continue-on-error` efter en vecka med stabila körningar av release-PR:er så att signalen blir en
blockerande kontroll från PR till release.

## Lösning C — `npm run check:release-green` (motorn)

Återskapar releaseekvivalent validering mot det aktuella arbetsträdet och klassificerar varje rött resultat:

- **HARD** (typkontroll, lintfel, enhetstester, vitest, db-rules, public-creds, valfri
  `package-artifact`) → **verkligt fel**; `exit 1`. Åtgärdas på källgrenen (TDD, regel nr 18).
- **DRIFT** (eslint-**varningar**, kognitiv komplexitet, filstorlek) → gradvis avvikelse som ackumulerats under
  cykeln, **inte bidragsgivarens fel**; den rapporteras endast och **baslinjejusteras av underhållaren vid
  release**. DRIFT ändrar **aldrig** slutkoden — och blockerar därför aldrig någon.

```bash
npm run check:release-green                 # aktuell gren (arbetsträd)
node scripts/quality/validate-release-green.mjs --json   # strukturerade utdata
node scripts/quality/validate-release-green.mjs --quick  # hoppar över enhetstester+vitest (endast avvikelse+typkontroll+lint)
node scripts/quality/validate-release-green.mjs --with-build  # inkluderar package-artifact (långsamt)
```

Diagnostiserar och **rapporterar** endast (ingen automatisk korrigering). Orkestreringen för att åtgärda till grönt finns i
`/green-prs` och `/review-prs`.

## Lösning A — `/green-prs` (kögenomsökningen)

Procedur (sammanfattning — se färdigheten `green-prs` för mer information):

1. **Inventera** kön med öppna PR:er mot den aktiva releasegrenen.
2. **Prioritera** varje PR (livskraftig / bör avvisas / kräver åtgärd av författaren) — PR:er som bör avvisas eller kräver åtgärd av författaren
   **rapporteras, men stängs inte** (författaren avgör).
3. För varje livskraftig PR: för PR:en till releasespetsen i ett **isolerat arbetsträd** (regel nr 19) och kör
   `npm run check:release-green`:
   - **HARD** → åtgärda **på bidragsgivarens gren** via medförfattarskap (bevarar författarens status som ”Merged”),
     kör igen tills alla HARD-resultat har åtgärdats.
   - **DRIFT** → lämna det; det baslinjejusteras vid release.
4. **Rapportera** en tabell över PR × (bedömning, röda HARD-resultat, åtgärdat?, DRIFT, release-green nu?).

Kan **förbereda** kön utan att slå samman; slår endast samman när det uttryckligen begärs — och stänger aldrig en PR.

## Rekommenderad frekvens

- Kör **`/green-prs` regelbundet** (t.ex. varje vecka) och **alltid före en
  `/generate-release`**.
- Behåll **`nightly-release-green.yml`** (lösning D) som en kontinuerlig signal: när det öppnar ett ärende för ett
  rött HARD-resultat är det dags för en genomsökning.
- Använd **`/validate-release-green`** vid behov för att kontrollera en gren eller en specifik kandidat för sammanslagning.
- Använd **`/babysit <PR#>`** när en specifik PR behöver drivas till grönt i aktiv CI.

## Förhållande till release

- `/generate-release` anropar valideringen i **fas 0 (förkontroll)**: baslinjejusterar DRIFT och åtgärdar
  HARD innan release-PR:en öppnas.
- `/review-prs` använder release-green-kontrollen vid beslutet om sammanslagning (grönt före sammanslagning).

Målet med alla delar är detsamma: **en grön release-PR vid den första CI-körningen**, i stället för att hantera
röda resultat i lager om 40 minuter på releasedagen.
