# Homologation Suite (`npm run homolog`) (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Validering från början till slut (E2E) i en verklig miljö av OmniRoute-distributionen som körs på VPS:en för homologering
(`HOMOLOG_BASE_URL`, t.ex. `http://192.168.0.15:20128`). Ett enda kommando ersätter den manuella
checklistan för release STOP #2 med en automatiserad körning som genererar verifieringsunderlag.

## Vad den omfattar

| Lager                      | Vad som kontrolleras                                                                                                                                                                         | Implementering                                                                |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — hälsa/paritet         | `/api/monitoring/health` svarar med `200`, `status: "healthy"` och den förväntade versionen                                                                                                  | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — tillfällig nyckel    | Administratörsinloggning → `POST /api/keys` skapar en avgränsad API-nyckel för körningen, som återkallas (`DELETE /api/keys/:id`) i ett `finally`-block oavsett resultat                     | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API-yta              | `/v1/models`-katalogen, en verklig icke-strömmande chattkomplettering (nivåkritisk modell, `max_tokens: 5`), ett `401` för en ogiltig nyckel samt publika `/api/monitoring/health`           | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE-strömning        | Verklig strömmande chattkomplettering; verifierar `text/event-stream`, minst ett innehållsdelta och en `[DONE]`-avslutare                                                                    | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — verkliga leverantörer | En chattförfrågan till minimal kostnad per kritisk leverantör som finns i den aktiva `/v1/models`-katalogen, genererad dynamiskt via promptfoo                                               | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI-autentisering     | Loggar in en gång via det verkliga inloggningsformuläret och återanvänder sessionen (`storageState`) i hela UI-lagret                                                                        | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI-rutter            | Varje statisk `page.tsx` under `src/app/(dashboard)/dashboard` (identifierad från filsystemet, dynamiska `[param]`-rutter hoppas över) läses in utan HTTP-fel, sidfel eller Next.js-felgräns | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — kritiskt UI-flöde    | Skapar en API-nyckel via instrumentpanelens UI och återkallar den sedan igen (lämnar inga rester på VPS:en)                                                                                  | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — enhetlig rapport      | Slår samman httpYac (via `junit-to-ctrf`), promptfoo→CTRF-adaptern och Playwrights CTRF-rapportör till en enda `homolog-ctrf.json`, samt en läsbar `homolog-report/summary.md`               | `scripts/homolog/run.mjs`                                                     |

Ingen LLM-medverkan i själva återuppspelningen — detta är en deterministisk uppsättning regressionstester,
inte en utvärdering. AI används endast för framtida underhållsarbete (se färdplanen nedan).

## Förutsättningar

1. Kopiera `.env.homolog.example` till `.env.homolog` (ignoreras av git — checka aldrig in den) och fyll i:
   - `HOMOLOG_BASE_URL` — måldriftsättningen, t.ex. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — lösenordet för hantering av instrumentpanelen för den driftsättningen.
   - `HOMOLOG_CRITICAL_PROVIDERS` — kommaseparerade leverantörsprefix som får en riktig
     smoke-testförfrågan för chatt (t.ex. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — lämna tom i normala körningar; testsviten skapar och återkallar
     sin egen tillfälliga nyckel. Ange endast detta för att felsöka ett enskilt lager isolerat.
2. Kör `npm install` i repot (testsvitens beroenden — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — är vanliga devDependencies).
3. Kör `npx playwright install` om webbläsarbinärerna inte redan finns.

## Så här kör du

```bash
npm run homolog
```

För att validera mot en driftsättning vars version inte matchar den lokala `package.json`
(t.ex. en homologeringsmiljö som fortfarande kör en tidigare patchversion), åsidosätt den
förväntade versionen uttryckligen:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Körningen avslutas med en felkod om något lager misslyckas och försöker alltid återkalla den
tillfälliga API-nyckel som skapades, även vid fel (`finally`-block i `scripts/homolog/run.mjs`).

## Läsa rapporten

Alla utdata hamnar i `homolog-report/` (ignoreras av git):

- `summary.md` — samma tabell som skrivs till standardutdata, en rad per lager (✅/❌ + detaljer).
- `homolog-ctrf.json` — den sammanfogade CTRF-rapporten (sammanslagning av API/SSE, smoke-tester för leverantörer och
  UI-resultat) — detta är artefakten som ska bifogas till STOPP #2-checklistan för en release.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — de
  råa mellanrapporterna per lager.
- `promptfooconfig.yaml`, `provider-misses.json` — den genererade promptfoo-konfigurationen för
  den aktuella körningen och eventuella kritiska leverantörer som saknades i livekatalogen.

Ett misslyckat L0 avbryter omedelbart (ingen tillfällig nyckel skapas), eftersom en avvikelse
i version eller hälsostatus innebär att alla efterföljande lager skulle validera fel driftsättning.

## Uppdatera baslinjen när gränssnittet ändras avsiktligt

L4b (smoke-test av rutter) och L4c (UI-flöde för API-nycklar) drivs av verkliga DOM-lokatorer, inte
ögonblicksbilder, så de flesta avsiktliga UI-ändringar kräver ingen uppdatering av testsviten. När en ändring
gör att en lokator slutar fungera (t.ex. en knappetikett som bytt namn eller en inställningssida som flyttats):

1. Bekräfta lokatorn på nytt mot den aktuella källkoden (specifikationerna dokumenterar redan vilken
   fil/rad varje lokator bekräftades mot — följ samma mönster, gissa inte).
2. Uppdatera specifikationen i `tests/homolog/ui/`.
3. Kör `npm run homolog` igen (eller bara den berörda Playwright-specifikationen) mot VPS:en för att
   bekräfta korrigeringen och checka sedan in ändringen.

Det finns ingen visuell/pixelbaslinje i den här testsviten (F1) — se färdplanen för detta.

## Färdplan (F2 / F3)

Design och stegvis utrullning finns i den interna planeringsspecifikationen
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (inte länkad — en intern
`_tasks/`-artefakt, inte en del av repots versionshanterade dokumentation). Sammanfattning:

- **F2** — fullständig inspelning av genomgång → Playwright Test Agents (`planner`/`generator`)
  omvandlar den till flödesspecifikationer (skapa kombination, testa leverantör, redigera inställningar, MCP-verktyg) +
  baslinje för visuell regression (Lost Pixel) med masker över dynamiska data (mätvärden,
  tidsstämplar, loggar) + en underhållsrutin med `healer` för varje release.
- **F3** — täckning för motståndskraft/kontrakt/kopplingar: toxiproxy + en falsk OpenAI-kompatibel
  leverantör på utvecklingsmaskinen, en `homolog-resilience`-kombination på VPS:en som pekar mot den
  (injicerad timeout → verifiera reservväxling + att effektbrytaren öppnas/stängs via
  `/api/monitoring/health`); villkorsstyrd Schemathesis-kontraktstestning mot
  `docs/openapi.yaml` (lågt `--max-examples`, fasta startvärden, endast slutpunkter utan LLM); samt
  integrering av `npm run homolog` + dess `summary.md` i STOPP #2-fasen för `/generate-release`.
