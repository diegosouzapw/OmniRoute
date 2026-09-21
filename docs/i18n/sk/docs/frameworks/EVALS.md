# Evaluations (Evals) (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Zdroj pravdy:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Posledná aktualizácia:** 2026-06-28 — v3.8.40

OmniRoute obsahuje všeobecný hodnotiaci framework, ktorý môžete použiť na porovnávanie konfigurácií smerovania, jednotlivých poskytovateľov/modelov alebo vstavaných balíkov „golden set“. Pomocou neho môžete overovať zmeny smerovania, validovať nových poskytovateľov a podmieňovať vydania pred ich nasadením do produkčnej prevádzky.

Framework sa skladá z:

- Samostatného vykonávacieho nástroja (`src/lib/evals/evalRunner.ts`), ktorý registruje vstavané balíky v pamäti, vyhodnocuje výstupy podľa očakávaných kritérií a agreguje hodnotiace prehľady.
- Perzistentnej vrstvy (`src/lib/db/evals.ts`) pre vlastné (používateľom definované) balíky a historické spustenia v SQLite.
- Orchestračnej vrstvy (`src/lib/evals/runtime.ts`), ktorá vykonáva každý prípad odoslaním skutočných volaní na `POST /v1/chat/completions`, zaznamenáva latenciu a výstupy a ukladá výsledky spustenia.
- Koncových bodov REST pod `/api/evals/*` (iba s overením správcu).
- Rozhrania ovládacieho panela v `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Koncepty

### Balík

Balík je pomenovaná kolekcia testovacích prípadov s poľom `description` a jedným alebo viacerými prípadmi. Balíky pochádzajú z dvoch zdrojov:

| Zdroj      | Miesto definície                                | Možno meniť za behu?    |
| ---------- | ----------------------------------------------- | ----------------------- |
| `built-in` | Registrovaný cez `registerSuite()` pri spustení | Nie (definovaný v kóde) |
| `custom`   | Uložený v SQLite `eval_suites` + `eval_cases`   | Áno (cez API/UI)        |

Aktuálne vstavané balíky (pozrite si `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 základných prípadov z oblastí pozdravov/matematiky/prekladu/bezpečnosti
- `coding-proficiency` — Python/JS/SQL/TS/detekcia chýb
- `reasoning-logic` — sylogizmy, slovné úlohy, rozpoznávanie vzorov
- `multilingual` — preklad a detekcia jazyka
- `safety-guardrails` — PII, jailbreak, odmietnutie, uvedomovanie si zaujatosti
- `instruction-following` — iba JSON, číslované zoznamy, jazykové obmedzenia
- `codex-comparison` — priame porovnávacie programátorské úlohy určené pre režim porovnávania

### Prípad

Každý prípad obsahuje:

| Pole       | Popis                                                               |
| ---------- | ------------------------------------------------------------------- |
| `id`       | Stabilný identifikátor (používa sa ako kľúč pre výstupy a metriky)  |
| `name`     | Používateľsky zrozumiteľný názov                                    |
| `model`    | Predvolený model, keď spustenie používa zacielenie `suite-default`  |
| `input`    | `{ messages, max_tokens? }` — odosiela sa na `/v1/chat/completions` |
| `expected` | `{ strategy, value }` — kritériá hodnotenia (pozrite nižšie)        |
| `tags`     | Voliteľné označenia (napr. `safety`, `pii`, `jailbreak`)            |

### Cieľ

Rovnaký balík možno spustiť pre rôzne ciele. Schéma cieľa je `evalTargetSchema` v `src/shared/validation/schemas.ts`:

| Typ cieľa       | `id`             | Správanie                                                                  |
| --------------- | ---------------- | -------------------------------------------------------------------------- |
| `suite-default` | `null`           | Každý prípad používa svoje vstavané pole `model`                           |
| `model`         | názov modelu     | Vynúti spracovanie každého prípadu jedným priamym modelom (napr. `gpt-4o`) |
| `combo`         | názov kombinácie | Spustí každý prípad cez jednu kombináciu (testuje smerovací mechanizmus)   |

Pre `model` a `combo` je pole `id` povinné (vynucuje ho Zod `superRefine`). Keď je zadaný `compareTarget`, oba ciele sa musia líšiť — vykonávací nástroj uloží obe spustenia pod rovnakým `runGroupId` na účely A/B porovnania.

## Kritériá hodnotenia

Implementované v `evaluateCase()` (evalRunner.ts):

| Stratégia  | Test prejde, keď…                                                           |
| ---------- | --------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                           |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`         |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` má pravdivú hodnotu         |
| `custom`   | `expected.fn(actualOutput, evalCase)` vráti pravdivú hodnotu (iba vstavané) |

**Poznámka:** Hodnotenie pomocou vlastnej funkcie je vyhradené pre sady definované v kóde (vstavané),
pretože funkcie nemožno serializovať prostredníctvom API. Schéma
`evalCaseBuilderSchema` prijíma pre používateľom vytvorené sady iba
`contains | exact | regex`.

V súčasnosti nie je k dispozícii hodnotiteľ založený na LLM ani vyhodnocovanie podobnosti pomocou embeddingov —
predstavovalo by to prirodzený bod rozšírenia vo funkcii `evaluateCase()`.

## Schéma databázy

Tri tabuľky (migrácie `030_create_eval_runs.sql` a
`031_create_eval_suites.sql`):

| Tabuľka       | Účel                                                                                                                              |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metadáta vlastných sád (`id`, `name`, `description`)                                                                              |
| `eval_cases`  | Prípady pre jednotlivé sady — `input_json`, `expected_*`, `tags_json`                                                             |
| `eval_runs`   | Historické spustenia — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Vstavané sady **nie sú** uložené v databáze. Nachádzajú sa v pamäti a
opätovne sa registrujú pri každom importe súboru `evalRunner.ts`.

## REST API

Všetky koncové body vyžadujú autentifikáciu na správu (`requireManagementAuth`) — nie sú
súčasťou verejne dostupného proxy rozhrania.

| Koncový bod                   | Metóda   | Popis                                                                      |
| ----------------------------- | -------- | -------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Zoznam sád + nedávne spustenia + prehľad výsledkov + ciele + kľúče         |
| `/api/evals`                  | `POST`   | Spustenie sady (samostatne alebo porovnanie) — schéma `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | Načítanie jednej sady (vstavanej alebo vlastnej)                           |
| `/api/evals/suites`           | `POST`   | Vytvorenie vlastnej sady — schéma `evalSuiteSaveSchema`                    |
| `/api/evals/suites/{suiteId}` | `GET`    | Načítanie vlastnej sady                                                    |
| `/api/evals/suites/{suiteId}` | `PUT`    | Nahradenie vlastnej sady (prípady sa opätovne vložia)                      |
| `/api/evals/suites/{suiteId}` | `DELETE` | Odstránenie vlastnej sady a jej prípadov                                   |

### Spustenie sady

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

Voliteľné polia:

- `outputs` — `Record<caseId, string>` s vopred vypočítanými výstupmi. Ak je poskytnuté,
  spúšťač **preskočí odoslanie** a iba vyhodnotí výstupy z vyrovnávacej pamäte (užitočné na
  offline hodnotenie).
- `compareTarget` — druhý cieľ, ktorý sa spustí paralelne; obe spustenia zdieľajú
  vygenerované `runGroupId` na priame porovnanie.
- `apiKeyId` — interný kľúč API používaný na autentifikáciu odosielaných
  volaní `/v1/chat/completions`. Vyžaduje sa, keď je zapnuté `REQUIRE_API_KEY`.

### Vytvorenie vlastnej sady

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## Proces spracovania

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Vyhľadá sadu (vstavanú alebo vlastnú).
2. Pre každý prípad zostaví `Request` na `/v1/chat/completions` s hodnotami
   `messages` daného prípadu, vyhľadaným `model`, `stream: false` a `max_tokens: 512`
   (alebo hodnotou prepísanou v danom prípade).
3. Zavolá obslužnú funkciu chatu priamo (v rámci procesu — bez ďalšieho HTTP volania).
4. Zaznamená latenciu a extrahuje text buď z `choices[0].message.content`,
   alebo z dát `output[]` rozhrania Responses API.
5. Vyhodnotí všetky výstupy prostredníctvom `runSuite()` a potom ich uloží pomocou `saveEvalRun()`.

Prípady sa spúšťajú **sekvenčne**. V súčasnosti neexistuje príznak na riadenie súbežnosti.

## Ovládací panel

Používateľské rozhranie sa nachádza v časti `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Odtiaľ môžete:

- Prechádzať vstavané a vlastné sady s náhľadom jednotlivých prípadov.
- Vytvárať, upravovať a odstraňovať vlastné sady pomocou nástroja na tvorbu prípadov.
- Vybrať cieľ (predvolené nastavenia sady/model/kombinácia), voliteľne druhý
  `compareTarget`, voliteľne kľúč API a potom spustiť vyhodnotenie na požiadanie.
- Kontrolovať históriu spustení, úspech alebo zlyhanie jednotlivých prípadov, latenciu a zachytené výstupy.
- Zobraziť priebežný prehľad skóre agregovaný z najnovšieho spustenia pre každý
  rozsah `(suite, target)`.

## Vzťah k RFC automatického hodnotenia

Samostatný, užšie zameraný subsystém hodnotenia sa nachádza v `src/domain/assessment/`
(pozrite si aj [AUTO-COMBO.md](../routing/AUTO-COMBO.md), kde nájdete aktívny mechanizmus výpočtu skóre).
Tento subsystém je určený pre mechanizmus Auto Combo — automaticky hodnotí poskytovateľov a
modely, aby sa kombinácie mohli samy zotaviť pri zlyhaní zdrojových služieb. Používa vlastný spúšťač,
vlastný kategorizátor a vlastnú logiku výpočtu skóre.

Tu zdokumentovaný rámec Evals je **širšie, všeobecne použiteľné
prostredie na testovanie**. Uprednostnite ho pri ľubovoľných regresných sadách, A/B porovnaniach
a rýchlych testoch jednotlivých vydaní. Subsystém automatického hodnotenia použite, keď potrebujete,
aby stav poskytovateľa v reálnom čase ovplyvňoval rozhodnutia o smerovaní.

## Integrácia CI

V súčasnosti neexistuje osobitný npm skript `eval:ci`. Ak chcete podmieniť
vydania výsledkami vyhodnotení, máte dve možnosti:

- **Cesta cez HTTP**: spustite server, odošlite požiadavku `POST /api/evals` so známymi
  hodnotami `suiteId` + `target` a overte, že `runs[].summary.passRate >= N`
  v odpovedi.
- **Cesta v rámci procesu**: importujte `runEvalSuiteAgainstTarget()` z
  `@/lib/evals/runtime` do skriptu, spustite ho nad testovacou databázou a skontrolujte
  vrátenú hodnotu `PersistedEvalRun.summary`.

Testy pokrývajúce trasu a históriu sa nachádzajú v súboroch
`tests/unit/evals-route.test.ts` a `tests/unit/evals-history.test.ts`.

## Body rozšírenia

Bežné zmeny a miesta, kde ich vykonať:

- **Nová stratégia výpočtu skóre** — rozšírte blok `switch (evalCase.expected.strategy)`
  vo funkcii `evaluateCase()` (`evalRunner.ts`) a rozšírte `EvalCaseStrategy` v
  `src/lib/db/evals.ts` spolu s `evalCaseBuilderSchema` v `schemas.ts`.
- **Nová vstavaná sada** — definujte objekt sady a zavolajte `registerSuite()` v
  spodnej časti súboru `evalRunner.ts`. Funkcia `listSuites()` ju automaticky nájde.
- **Súbežné spúšťanie** — zmeňte sekvenčný cyklus `for` vo funkcii
  `runEvalSuiteAgainstTarget()` na ohraničený `Promise.all` (v súčasnosti
  neexistuje riadenie súbežnosti).
- **Prípady so streamovaním/volaním nástrojov** — spúšťač v súčasnosti vynucuje `stream: false`.
  Streamované vyhodnotenie alebo vyhodnotenie zohľadňujúce nástroje by vyžadovalo zmeny v `runtime.ts`
  (zachytenie a agregovanie blokov SSE pred výpočtom skóre).

## Pozri tiež

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — celkový sprievodca produktom
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — referencia k spracovaniu požiadaviek
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — hodnotiaci mechanizmus Auto Combo (aktívny za behu)
- Zdroj: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Používateľské rozhranie: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
