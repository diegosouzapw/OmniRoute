# Homologation Suite (`npm run homolog`) (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

E2E-validering i et reelt miljø af OmniRoute-deploymenten, der kører på homologerings-VPS'en
(`HOMOLOG_BASE_URL`, f.eks. `http://192.168.0.15:20128`). Én kommando erstatter den manuelle
STOP #2-tjekliste for releases med en automatiseret kørsel, der producerer dokumentation.

## Hvad den dækker

| Lag                     | Hvad det kontrollerer                                                                                                                                                                        | Implementering                                                                |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — sundhed/paritet    | `/api/monitoring/health` svarer med `200`, `status: "healthy"` og den forventede version                                                                                                     | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — midlertidig nøgle | Administratorlogin → `POST /api/keys` opretter en afgrænset API-nøgle til kørslen, som tilbagekaldes (`DELETE /api/keys/:id`) i en `finally`-blok uanset resultatet                          | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API-overflade     | `/v1/models`-kataloget, en reel ikke-streamende chatfuldførelse (model, der er kritisk for niveauet, `max_tokens: 5`), en `401` ved ugyldig nøgle og det offentlige `/api/monitoring/health` | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE-streaming     | Reel streamende chatfuldførelse; kontrollerer `text/event-stream`, mindst ét indholdsdelta og en `[DONE]`-terminator                                                                         | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — reelle udbydere    | Én chatanmodning med minimale omkostninger pr. kritisk udbyder, der findes i det aktive `/v1/models`-katalog, genereret dynamisk via promptfoo                                               | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI-godkendelse    | Logger ind én gang via den rigtige loginformular og genbruger sessionen (`storageState`) på tværs af UI-laget                                                                                | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI-ruter          | Hver statisk `page.tsx` under `src/app/(dashboard)/dashboard` (fundet via filsystemet; dynamiske `[param]`-ruter springes over) indlæses uden HTTP-fejl, sidefejl eller Next.js-fejlgrænsen  | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — kritisk UI-flow   | Opretter en API-nøgle via dashboardets UI og tilbagekalder den igen (efterlader ingen rester på VPS'en)                                                                                      | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — samlet rapport     | Samler httpYac (via `junit-to-ctrf`), promptfoo→CTRF-adapteren og Playwright CTRF-rapportøren i én `homolog-ctrf.json` samt en læsevenlig `homolog-report/summary.md`                        | `scripts/homolog/run.mjs`                                                     |

Ingen LLM-involvering i selve genafspilningen — dette er en deterministisk regressionspakke,
ikke en evaluering. AI kommer kun i spil ved fremtidigt vedligeholdelsesarbejde (se køreplanen nedenfor).

## Forudsætninger

1. Kopiér `.env.homolog.example` til `.env.homolog` (ignoreres af git — commit den aldrig), og udfyld:
   - `HOMOLOG_BASE_URL` — den ønskede udrulning, f.eks. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — adgangskoden til administration af dashboardet for denne udrulning.
   - `HOMOLOG_CRITICAL_PROVIDERS` — kommaseparerede providerpræfikser, som får en rigtig
     smoke-chatforespørgsel (f.eks. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — lad den være tom ved normale kørsler; suiten opretter og tilbagekalder sin
     egen midlertidige nøgle. Angiv kun denne for at fejlfinde et enkelt lag isoleret.
2. Kør `npm install` i repoet (suitens afhængigheder — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — er almindelige devDependencies).
3. Kør `npx playwright install`, hvis browserbinærfilerne ikke allerede er installeret.

## Sådan køres den

```bash
npm run homolog
```

For at validere mod en udrulning, hvis version ikke matcher den lokale `package.json`
(f.eks. et homologationsmiljø, der stadig kører en tidligere patchudgivelse), kan den forventede
version tilsidesættes eksplicit:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Kørslen afsluttes med en statuskode forskellig fra nul, hvis et lag fejler, og forsøger altid at tilbagekalde den midlertidige
API-nøgle, den oprettede, selv ved fejl (`finally`-blok i `scripts/homolog/run.mjs`).

## Sådan læses rapporten

Alt output placeres i `homolog-report/` (ignoreres af git):

- `summary.md` — den samme tabel, som udskrives til stdout, med én række pr. lag (✅/❌ + detaljer).
- `homolog-ctrf.json` — den samlede CTRF-rapport (fletning af API/SSE-, provider-smoke- og
  UI-resultater) — dette er artefaktet, der skal vedhæftes tjeklisten for STOP #2 i en udgivelse.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — de
  rå/midlertidige rapporter pr. lag.
- `promptfooconfig.yaml`, `provider-misses.json` — den genererede promptfoo-konfiguration for
  den aktuelle kørsel og eventuelle kritiske providers, der manglede i livekataloget.

En fejl i L0 afbryder straks kørslen (der oprettes ingen midlertidig nøgle), eftersom en uoverensstemmelse i version/tilstand
betyder, at alle efterfølgende lag ville validere den forkerte udrulning.

## Genetablering af baseline, når brugergrænsefladen ændres legitimt

L4b (route-smoke) og L4c (API-nøgleflow i brugergrænsefladen) styres af rigtige DOM-lokatorer, ikke
snapshots, så de fleste legitime ændringer i brugergrænsefladen kræver ingen opdatering af suiten. Når en ændring
får en lokator til at fejle (f.eks. en omdøbt knaptekst eller en flyttet indstillingsside):

1. Bekræft lokatoren igen mod den aktuelle kildekode (specifikationerne dokumenterer allerede, hvilken
   fil/linje hver lokator blev bekræftet mod — følg samme mønster, gæt ikke).
2. Opdatér specifikationen i `tests/homolog/ui/`.
3. Kør `npm run homolog` igen (eller blot den berørte Playwright-specifikation) mod VPS'en for at
   bekræfte rettelsen, og commit derefter.

Der er ingen visuel/pixelbaseret baseline i denne suite (F1) — se Roadmap for dette.

## Roadmap (F2 / F3)

Design og trinvis udrulning findes i den interne planlægningsspecifikation
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (ikke linket — internt
`_tasks/`-artefakt, ikke en del af dette repos versionsstyrede dokumentation). Oversigt:

- **F2** — fuld optagelse af gennemgang → Playwright Test Agents (`planner`/`generator`)
  omdanner den til flowspecifikationer (opret combo, test provider, redigér indstillinger, MCP-værktøjer) +
  baseline for visuel regression (Lost Pixel) med masker over dynamiske data (målinger,
  tidsstempler, logfiler) + en `healer`-vedligeholdelsesrutine pr. udgivelse.
- **F3** — dækning af robusthed/kontrakter/integration: toxiproxy + en falsk OpenAI-kompatibel
  provider på devboxen, en `homolog-resilience`-combo på VPS'en, der peger på den
  (injiceret timeout → verificér fallback + åbning/lukning af kredsløbsafbryderen via
  `/api/monitoring/health`); adgangsstyret Schemathesis-kontrakttest mod
  `docs/openapi.yaml` (lav `--max-examples`, faste seeds, kun ikke-LLM-endpoints); samt
  integration af `npm run homolog` + dens `summary.md` i STOP #2-fasen for `/generate-release`.
