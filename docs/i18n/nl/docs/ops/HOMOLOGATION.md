# Homologation Suite (`npm run homolog`) (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

E2E-validatie in een echte omgeving van de OmniRoute-deployment die op de homologatie-VPS draait
(`HOMOLOG_BASE_URL`, bijv. `http://192.168.0.15:20128`). Eén opdracht vervangt de handmatige
STOP #2-checklist voor releases door een geautomatiseerde uitvoering die bewijsmateriaal produceert.

## Wat wordt gecontroleerd

| Laag                     | Wat wordt gecontroleerd                                                                                                                                                                                               | Implementatie                                                                 |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — status/pariteit     | `/api/monitoring/health` antwoordt met `200`, met `status: "healthy"` en de verwachte versie                                                                                                                          | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — tijdelijke sleutel | Beheerderslogin → `POST /api/keys` maakt een API-sleutel met een beperkt bereik voor de uitvoering, die ongeacht het resultaat in een `finally`-blok wordt ingetrokken (`DELETE /api/keys/:id`)                       | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API-oppervlak      | `/v1/models`-catalogus, een echte niet-streamende chatvoltooiing (model dat essentieel is voor de tier, `max_tokens: 5`), een `401` voor een ongeldige sleutel en de openbare `/api/monitoring/health`                | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE-streaming      | Echte streamende chatvoltooiing; controleert `text/event-stream`, ten minste één inhoudsdelta en een `[DONE]`-afsluiting                                                                                              | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — echte providers     | Eén chatverzoek met minimale kosten per kritieke provider die aanwezig is in de live `/v1/models`-catalogus, direct gegenereerd via promptfoo                                                                         | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI-authenticatie   | Logt eenmaal in via het echte inlogformulier en hergebruikt de sessie (`storageState`) in de gehele UI-laag                                                                                                           | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI-routes          | Elke statische `page.tsx` onder `src/app/(dashboard)/dashboard` (ontdekt vanuit het bestandssysteem; dynamische `[param]`-routes worden overgeslagen) wordt geladen zonder HTTP-fout, paginafout of Next.js-foutgrens | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — kritieke UI-flow   | Maakt via de dashboard-UI een API-sleutel aan en trekt deze vervolgens weer in (laat geen restanten achter op de VPS)                                                                                                 | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — uniform rapport     | Voegt httpYac (via `junit-to-ctrf`), de promptfoo→CTRF-adapter en de Playwright CTRF-reporter samen in één `homolog-ctrf.json`, plus een voor mensen leesbaar `homolog-report/summary.md`                             | `scripts/homolog/run.mjs`                                                     |

Geen enkele LLM-betrokkenheid bij de herhaling zelf — dit is een deterministische regressietestreeks,
geen evaluatie. AI wordt alleen ingezet bij toekomstig onderhoudswerk (zie de roadmap hieronder).

## Vereisten

1. Kopieer `.env.homolog.example` naar `.env.homolog` (door git genegeerd — commit dit bestand nooit) en vul het volgende in:
   - `HOMOLOG_BASE_URL` — de doelimplementatie, bijvoorbeeld `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — het beheerderswachtwoord van het dashboard voor die implementatie.
   - `HOMOLOG_CRITICAL_PROVIDERS` — door komma's gescheiden providerprefixen waarvoor een echte
     smokechat-aanvraag wordt uitgevoerd (bijvoorbeeld `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — laat dit bij normale uitvoeringen leeg; de suite maakt zelf een tijdelijke
     sleutel aan en trekt deze weer in. Stel dit alleen in om één afzonderlijke laag te debuggen.
2. Voer `npm install` uit in de repo (de afhankelijkheden van de suite — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — zijn reguliere devDependencies).
3. Voer `npx playwright install` uit als de browserbinaire bestanden nog niet aanwezig zijn.

## Uitvoeren

```bash
npm run homolog
```

Als je wilt valideren tegen een implementatie waarvan de versie niet overeenkomt met de lokale `package.json`
(bijvoorbeeld een homologatieomgeving die nog op een eerdere patchrelease draait), overschrijf dan
expliciet de verwachte versie:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

De uitvoering eindigt met een niet-nulstatus als een laag mislukt en probeert altijd de aangemaakte tijdelijke
API-sleutel in te trekken, zelfs bij een fout (`finally`-blok in `scripts/homolog/run.mjs`).

## Het rapport lezen

Alle uitvoer komt terecht in `homolog-report/` (door git genegeerd):

- `summary.md` — dezelfde tabel die naar stdout wordt geschreven, met één rij per laag (✅/❌ + details).
- `homolog-ctrf.json` — het samengevoegde CTRF-rapport (samenvoeging van API/SSE-, provider-smoke- en
  UI-resultaten) — dit is het artefact dat aan de STOP #2-checklist van een release moet worden toegevoegd.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — de
  onbewerkte/tussentijdse rapporten per laag.
- `promptfooconfig.yaml`, `provider-misses.json` — de gegenereerde promptfoo-configuratie voor
  de huidige uitvoering en eventuele kritieke providers die in de livecatalogus ontbraken.

Een mislukte L0 breekt onmiddellijk af (er wordt geen tijdelijke sleutel aangemaakt), omdat een afwijking
in versie/status betekent dat elke volgende laag de verkeerde implementatie zou valideren.

## De baseline opnieuw vastleggen wanneer de UI legitiem verandert

L4b (route-smoketest) en L4c (UI-flow voor API-sleutels) worden aangestuurd door echte DOM-locators, niet
door snapshots. Daardoor vereisen de meeste legitieme UI-wijzigingen geen aanpassing van de suite. Wanneer een
wijziging toch een locator breekt (bijvoorbeeld door een hernoemd knoplabel of een verplaatste instellingenpagina):

1. Controleer de locator opnieuw aan de hand van de huidige broncode (de specs documenteren al tegen welk
   bestand/welke regel elke locator is gecontroleerd — volg hetzelfde patroon en gok niet).
2. Werk de spec bij in `tests/homolog/ui/`.
3. Voer `npm run homolog` opnieuw uit (of alleen de betreffende Playwright-spec) tegen de VPS om
   de oplossing te bevestigen en commit vervolgens de wijziging.

Deze suite heeft geen visuele/pixelbaseline (F1) — zie de roadmap daarvoor.

## Roadmap (F2 / F3)

Het ontwerp en de gefaseerde uitrol staan in de interne planningsspec
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (niet gelinkt — intern
`_tasks/`-artefact, geen onderdeel van de bijgehouden documentatie van deze repo). Samenvatting:

- **F2** — volledige walkthrough-opname → Playwright Test Agents (`planner`/`generator`)
  zetten deze om in flowspecs (combo maken, provider testen, instellingen bewerken, MCP-tools) +
  visuele-regressiebaseline (Lost Pixel) met maskers over dynamische gegevens (metriekwaarden,
  tijdstempels, logs) + een `healer`-onderhoudsroutine per release.
- **F3** — dekking voor robuustheid/contracten/koppelingen: toxiproxy + een neppe OpenAI-compatibele
  provider op de devbox, een `homolog-resilience`-combo op de VPS die daarnaar verwijst
  (geïnjecteerde time-out → fallback bevestigen + openen/sluiten van de circuitbreaker via
  `/api/monitoring/health`); afgeschermde Schemathesis-contracttests tegen
  `docs/openapi.yaml` (lage `--max-examples`, vaste seeds, alleen niet-LLM-eindpunten); en
  het integreren van `npm run homolog` + de bijbehorende `summary.md` in de STOP #2-fase van `/generate-release`.
