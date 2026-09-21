# Homologation Suite (`npm run homolog`) (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

E2E validácia nasadenia OmniRoute v reálnom prostredí bežiacom na homologačnom VPS
(`HOMOLOG_BASE_URL`, napr. `http://192.168.0.15:20128`). Jeden príkaz nahrádza manuálny
kontrolný zoznam vydania STOP č. 2 automatizovaným spustením, ktoré vytvára dôkazové výstupy.

## Čo pokrýva

| Vrstva                     | Čo kontroluje                                                                                                                                                                                                   | Implementácia                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — stav/parita           | `/api/monitoring/health` odpovedá kódom `200` so `status: "healthy"` a očakávanou verziou                                                                                                                       | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — dočasný kľúč         | Prihlásenie správcu → `POST /api/keys` vytvorí API kľúč s obmedzeným rozsahom pre dané spustenie, ktorý sa bez ohľadu na výsledok zneplatní (`DELETE /api/keys/:id`) v bloku `finally`                          | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — rozhranie API        | Katalóg `/v1/models`, skutočné nestreamované dokončenie chatu (model kritický pre úroveň, `max_tokens: 5`), odpoveď `401` pri neplatnom kľúči a verejný koncový bod `/api/monitoring/health`                    | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — streamovanie SSE     | Skutočné streamované dokončenie chatu; overuje `text/event-stream`, aspoň jeden rozdiel obsahu a ukončovací prvok `[DONE]`                                                                                      | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — reálni poskytovatelia | Jedna chatová požiadavka s minimálnymi nákladmi pre každého kritického poskytovateľa prítomného v živom katalógu `/v1/models`, generovaná priebežne pomocou promptfoo                                           | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — overenie UI          | Prihlási sa raz prostredníctvom skutočného prihlasovacieho formulára a opakovane používa reláciu (`storageState`) v celej vrstve UI                                                                             | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — trasy UI             | Každá statická stránka `page.tsx` v `src/app/(dashboard)/dashboard` (objavená zo súborového systému; dynamické trasy `[param]` sa preskočia) sa načíta bez chyby HTTP, chyby stránky alebo hranice chýb Next.js | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — kritický tok UI      | Vytvorí API kľúč prostredníctvom používateľského rozhrania dashboardu a znova ho zneplatní (na VPS nezanechá žiadne zvyšky)                                                                                     | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — zjednotený report     | Zlúči httpYac (prostredníctvom `junit-to-ctrf`), adaptér promptfoo→CTRF a reportér Playwright CTRF do jedného súboru `homolog-ctrf.json` spolu s ľudsky čitateľným súborom `homolog-report/summary.md`          | `scripts/homolog/run.mjs`                                                     |

Samotné opakované spustenie vôbec nezapája LLM — ide o deterministickú súpravu regresných testov,
nie o eval. AI sa zapojí až pri budúcej údržbe (pozrite si Plán vývoja nižšie).

## Predpoklady

1. Skopírujte `.env.homolog.example` do `.env.homolog` (ignorované systémom git — nikdy ho necommitujte) a vyplňte:
   - `HOMOLOG_BASE_URL` — cieľové nasadenie, napr. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — heslo na správu dashboardu pre dané nasadenie.
   - `HOMOLOG_CRITICAL_PROVIDERS` — predpony poskytovateľov oddelené čiarkami, pre ktoré sa vykoná skutočná
     testovacia chatová požiadavka (napr. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — pri bežných spusteniach ponechajte prázdne; sada vytvorí a zruší svoj
     vlastný dočasný kľúč. Nastavte ho iba pri ladení jednej vrstvy samostatne.
2. Spustite `npm install` v repozitári (závislosti sady — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — sú bežné devDependencies).
3. Spustite `npx playwright install`, ak binárne súbory prehliadačov ešte nie sú nainštalované.

## Ako spustiť

```bash
npm run homolog
```

Ak chcete vykonať validáciu voči nasadeniu, ktorého verzia sa nezhoduje s lokálnym súborom `package.json`
(napr. homologačné prostredie stále používa predchádzajúcu opravnú verziu), explicitne prepíšte očakávanú
verziu:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Spustenie skončí s nenulovým návratovým kódom, ak zlyhá ktorákoľvek vrstva, a vždy sa pokúsi zrušiť vytvorený
dočasný API kľúč, a to aj pri zlyhaní (blok `finally` v `scripts/homolog/run.mjs`).

## Čítanie reportu

Všetky výstupy sa ukladajú do `homolog-report/` (ignorované systémom git):

- `summary.md` — rovnaká tabuľka, aká sa vypíše na štandardný výstup, s jedným riadkom pre každú vrstvu (✅/❌ + podrobnosti).
- `homolog-ctrf.json` — zjednotený report CTRF (zlúčenie výsledkov API/SSE, testov poskytovateľov a
  používateľského rozhrania) — toto je artefakt, ktorý treba pripojiť ku kontrolnému zoznamu STOP #2 vydania.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — nespracované/priebežné reporty
  jednotlivých vrstiev.
- `promptfooconfig.yaml`, `provider-misses.json` — vygenerovaná konfigurácia promptfoo pre
  aktuálne spustenie a všetci kritickí poskytovatelia, ktorí chýbali v aktívnom katalógu.

Zlyhanie L0 spôsobí okamžité prerušenie (nevytvorí sa žiadny dočasný kľúč), pretože nezhoda
verzie alebo stavu znamená, že každá nasledujúca vrstva by overovala nesprávne nasadenie.

## Opätovné nastavenie východiskového stavu pri legitímnej zmene používateľského rozhrania

L4b (základný test trás) a L4c (tok používateľského rozhrania pre API kľúč) používajú reálne lokátory DOM, nie
snímky, takže väčšina legitímnych zmien používateľského rozhrania nevyžaduje žiadnu aktualizáciu sady. Keď zmena
naruší lokátor (napr. premenovaný text tlačidla alebo premiestnená stránka nastavení):

1. Opätovne overte lokátor voči aktuálnemu zdrojovému kódu (špecifikácie už dokumentujú, voči ktorému
   súboru/riadku bol každý lokátor overený — postupujte rovnakým spôsobom, nehádajte).
2. Aktualizujte špecifikáciu v `tests/homolog/ui/`.
3. Znovu spustite `npm run homolog` (alebo iba dotknutú špecifikáciu Playwright) voči VPS, aby ste
   potvrdili opravu, a potom vykonajte commit.

Táto sada nemá východiskový stav vizuálneho/pixelového porovnávania (F1) — ďalšie informácie nájdete v pláne.

## Plán (F2 / F3)

Návrh a postupné nasadenie sú uvedené v internej plánovacej špecifikácii
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (bez odkazu — interný
artefakt `_tasks/`, ktorý nie je súčasťou sledovanej dokumentácie tohto repozitára). Zhrnutie:

- **F2** — záznam úplného prechodu → Agenti Playwright Test (`planner`/`generator`)
  ho prevedú na špecifikácie tokov (vytvorenie kombinácie, test poskytovateľa, úprava nastavení, nástroje MCP) +
  východiskový stav vizuálnej regresie (Lost Pixel) s maskami nad dynamickými údajmi (metriky,
  časové pečiatky, logy) + údržbová rutina `healer` pre každé vydanie.
- **F3** — pokrytie odolnosti, kontraktov a prepojenia: toxiproxy + falošný poskytovateľ kompatibilný s OpenAI
  na devboxe, kombinácia `homolog-resilience` na VPS nasmerovaná naň
  (vložený časový limit → overenie záložného mechanizmu + otvorenia/zatvorenia ističa prostredníctvom
  `/api/monitoring/health`); podmienené testovanie kontraktov pomocou Schemathesis voči
  `docs/openapi.yaml` (nízka hodnota `--max-examples`, pevné seedy, iba koncové body bez LLM); a
  zapojenie `npm run homolog` + jeho súboru `summary.md` do fázy STOP #2 procesu `/generate-release`.
