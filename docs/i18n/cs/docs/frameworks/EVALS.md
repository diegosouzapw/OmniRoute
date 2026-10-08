# Evaluations (Evals) (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Zdroj pravdy:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Poslední aktualizace:** 2026-06-28 — v3.8.40

OmniRoute obsahuje obecný vyhodnocovací framework, který můžete použít k porovnávání konfigurací směrování, jednotlivých poskytovatelů/modelů nebo přibalených sad „golden set“. Pomocí něj můžete ověřovat změny směrování, validovat nové poskytovatele a nastavovat podmínky pro vydání před jejich nasazením do produkčního provozu.

Framework se skládá z:

- Čistého runneru (`src/lib/evals/evalRunner.ts`), který registruje vestavěné sady v paměti, vyhodnocuje výstupy podle očekávaných kritérií a agreguje výsledkové přehledy.
- Perzistentní vrstvy (`src/lib/db/evals.ts`) pro vlastní (uživatelsky definované) sady a historická spuštění v SQLite.
- Orchestrační vrstvy (`src/lib/evals/runtime.ts`), která provádí jednotlivé případy odesíláním skutečných volání na `POST /v1/chat/completions`, zachycuje latenci a výstupy a ukládá běh.
- Endpointů REST pod `/api/evals/*` (pouze s autentizací pro správu).
- Rozhraní dashboardu v `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Koncepty

### Sada

Sada je pojmenovaná kolekce testovacích případů s polem `description` a jedním nebo více případy. Sady pocházejí ze dvou zdrojů:

| Zdroj      | Kde je definována                                | Lze měnit za běhu?     |
| ---------- | ------------------------------------------------ | ---------------------- |
| `built-in` | Registrována pomocí `registerSuite()` při startu | Ne (definována v kódu) |
| `custom`   | Uložena v SQLite `eval_suites` + `eval_cases`    | Ano (přes API/UI)      |

Aktuální vestavěné sady (viz `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 základních případů pokrývajících pozdravy/matematiku/překlad/bezpečnost
- `coding-proficiency` — Python/JS/SQL/TS/detekce chyb
- `reasoning-logic` — sylogismy, slovní úlohy, rozpoznávání vzorů
- `multilingual` — překlad a detekce jazyka
- `safety-guardrails` — PII, jailbreak, odmítnutí, povědomí o zkreslení
- `instruction-following` — pouze JSON, číslované seznamy, jazyková omezení
- `codex-comparison` — programátorské úlohy pro přímé porovnání určené pro režim porovnávání

### Případ

Každý případ obsahuje:

| Pole       | Popis                                                              |
| ---------- | ------------------------------------------------------------------ |
| `id`       | Stabilní identifikátor (používá se jako klíč výstupů a metrik)     |
| `name`     | Popisek srozumitelný pro člověka                                   |
| `model`    | Výchozí model, když běh používá cílení `suite-default`             |
| `input`    | `{ messages, max_tokens? }` — odesílá se na `/v1/chat/completions` |
| `expected` | `{ strategy, value }` — pravidla hodnocení (viz níže)              |
| `tags`     | Volitelné štítky (např. `safety`, `pii`, `jailbreak`)              |

### Cíl

Stejnou sadu lze spustit proti různým cílům. Schéma cíle je `evalTargetSchema` v `src/shared/validation/schemas.ts`:

| Typ cíle        | `id`            | Chování                                                                  |
| --------------- | --------------- | ------------------------------------------------------------------------ |
| `suite-default` | `null`          | Každý případ používá své vestavěné pole `model`                          |
| `model`         | název modelu    | Vynutí zpracování každého případu jedním přímým modelem (např. `gpt-4o`) |
| `combo`         | název kombinace | Spustí každý případ přes jednu kombinaci (otestuje směrovací engine)     |

Pro `model` a `combo` je pole `id` povinné (vynucuje jej Zod `superRefine`). Pokud je zadán `compareTarget`, oba cíle se musí lišit — runner uloží oba běhy pod stejným `runGroupId` pro A/B porovnání.

## Hodnoticí kritéria

Implementováno v `evaluateCase()` (evalRunner.ts):

| Strategie  | Úspěšné, když…                                                                  |
| ---------- | ------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                               |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`             |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` je pravdivé                     |
| `custom`   | `expected.fn(actualOutput, evalCase)` vrátí pravdivou hodnotu (pouze vestavěné) |

**Poznámka:** Hodnocení pomocí vlastní funkce je vyhrazeno pro sady definované
v kódu (vestavěné), protože funkce nelze serializovat prostřednictvím API.
`evalCaseBuilderSchema` přijímá pro uživatelsky vytvořené sady pouze
`contains | exact | regex`.

V současnosti není k dispozici žádné hodnocení typu LLM-as-judge ani hodnocení
podobnosti založené na embeddings — šlo by o přirozený bod rozšíření
v `evaluateCase()`.

## Databázové schéma

Tři tabulky (migrace `030_create_eval_runs.sql` a
`031_create_eval_suites.sql`):

| Tabulka       | Účel                                                                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metadata vlastních sad (`id`, `name`, `description`)                                                                             |
| `eval_cases`  | Případy pro jednotlivé sady — `input_json`, `expected_*`, `tags_json`                                                            |
| `eval_runs`   | Historická spuštění — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Vestavěné sady se v databázi **neukládají**. Existují v paměti a znovu se
registrují při každém importu `evalRunner.ts`.

## REST API

Všechny endpointy vyžadují autentizaci pro správu (`requireManagementAuth`) —
nejsou součástí veřejného proxy rozhraní.

| Endpoint                      | Metoda   | Popis                                                                   |
| ----------------------------- | -------- | ----------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Vypíše sady + nedávná spuštění + přehled výsledků + cíle + klíče        |
| `/api/evals`                  | `POST`   | Spustí sadu (samostatně nebo v porovnání) — schéma `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | Načte jednu sadu (vestavěnou nebo vlastní)                              |
| `/api/evals/suites`           | `POST`   | Vytvoří vlastní sadu — schéma `evalSuiteSaveSchema`                     |
| `/api/evals/suites/{suiteId}` | `GET`    | Načte vlastní sadu                                                      |
| `/api/evals/suites/{suiteId}` | `PUT`    | Nahradí vlastní sadu (případy se znovu vloží)                           |
| `/api/evals/suites/{suiteId}` | `DELETE` | Odstraní vlastní sadu a její případy                                    |

### Spuštění sady

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

Volitelná pole:

- `outputs` — `Record<caseId, string>` předem vypočítaných výstupů. Pokud je
  uvedeno, nástroj pro spuštění **přeskočí odeslání požadavků** a pouze
  ohodnotí výstupy uložené v mezipaměti (užitečné pro offline vyhodnocení).
- `compareTarget` — druhý cíl, který se spustí paralelně; obě spuštění sdílejí
  vygenerované `runGroupId`, což umožňuje přímé porovnání.
- `apiKeyId` — interní API klíč používaný k autentizaci odesílaných volání
  `/v1/chat/completions`. Je vyžadován, pokud je povoleno `REQUIRE_API_KEY`.

### Vytvoření vlastní sady

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

## Kanál spouštění

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Načte sadu (vestavěnou nebo vlastní).
2. Pro každý případ sestaví požadavek `Request` na `/v1/chat/completions` se
   `messages` daného případu, načteným `model`, `stream: false` a `max_tokens: 512`
   (nebo hodnotou přepsanou daným případem).
3. Zavolá obslužnou funkci chatu přímo (v rámci procesu — bez dalšího HTTP volání).
4. Zaznamená latenci a extrahuje text buď z `choices[0].message.content`,
   nebo z dat `output[]` rozhraní Responses API.
5. Ohodnotí všechny výstupy pomocí `runSuite()` a poté je uloží pomocí `saveEvalRun()`.

Případy se spouštějí **sekvenčně**. V současnosti není k dispozici žádný příznak pro souběžné spouštění.

## Řídicí panel

Uživatelské rozhraní se nachází v `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Z něj můžete:

- Procházet vestavěné i vlastní sady s náhledem jednotlivých případů.
- Vytvářet/upravovat/odstraňovat vlastní sady pomocí nástroje pro sestavování případů.
- Vybrat cíl (výchozí nastavení sady / model / kombinaci), volitelně druhý
  `compareTarget`, případně klíč API, a poté spustit vyhodnocení na vyžádání.
- Prohlížet historii spuštění, stav úspěchu či neúspěchu jednotlivých případů, latenci a zaznamenané výstupy.
- Zobrazit průběžný přehled skóre agregovaný z nejnovějšího spuštění pro každý
  rozsah `(suite, target)`.

## Vztah k RFC Auto-Assessment

Samostatný, úžeji zaměřený subsystém hodnocení se nachází v `src/domain/assessment/`
(viz také [AUTO-COMBO.md](../routing/AUTO-COMBO.md), kde je popsán produkční hodnoticí modul).
Tento subsystém je určen pro modul Auto Combo — automaticky hodnotí poskytovatele a
modely, aby se kombinace mohly samy zotavit při selhání externích služeb. Používá vlastní spouštěcí mechanismus,
vlastní kategorizátor a vlastní logiku hodnocení.

Zde zdokumentovaný framework Evals představuje **širší, univerzální
prostředí pro testování**. Upřednostněte jej pro libovolné regresní sady, A/B porovnání
a rychlé kontrolní testy jednotlivých vydání. Subsystém Auto-Assessment použijte, pokud potřebujete,
aby stav poskytovatelů v reálném čase ovlivňoval rozhodování o směrování.

## Integrace do CI

V současnosti neexistuje vyhrazený npm skript `eval:ci`. Pokud chcete
vydání podmínit výsledky vyhodnocení, máte dvě možnosti:

- **Cesta přes HTTP**: spusťte server, odešlete požadavek `POST /api/evals` se známými
  hodnotami `suiteId` + `target` a ověřte, že odpověď splňuje podmínku
  `runs[].summary.passRate >= N`.
- **Cesta v rámci procesu**: importujte `runEvalSuiteAgainstTarget()` z
  `@/lib/evals/runtime` do skriptu, spusťte jej nad testovací databází a zkontrolujte
  vrácenou hodnotu `PersistedEvalRun.summary`.

Testy pokrývající trasu a historii se nacházejí v
`tests/unit/evals-route.test.ts` a `tests/unit/evals-history.test.ts`.

## Body rozšíření

Běžné změny a místa, kde je provést:

- **Nová strategie hodnocení** — rozšiřte blok `switch (evalCase.expected.strategy)`
  ve funkci `evaluateCase()` (`evalRunner.ts`) a rozšiřte `EvalCaseStrategy` v
  `src/lib/db/evals.ts` spolu s `evalCaseBuilderSchema` v `schemas.ts`.
- **Nová vestavěná sada** — definujte objekt sady a zavolejte `registerSuite()` na
  konci souboru `evalRunner.ts`. Funkce `listSuites()` ji automaticky objeví.
- **Souběžné spouštění** — změňte sekvenční smyčku `for` ve funkci
  `runEvalSuiteAgainstTarget()` na omezené `Promise.all` (v současnosti
  neexistuje žádné řízení souběžnosti).
- **Případy se streamováním/voláním nástrojů** — spouštěcí mechanismus nyní vynucuje `stream: false`.
  Streamované nebo na nástrojích závislé vyhodnocování by vyžadovalo změny v `runtime.ts`
  (zachycení a agregaci bloků SSE před hodnocením).

## Viz také

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — celkový průvodce produktem
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — referenční dokumentace kanálu zpracování požadavků
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — vyhodnocovací mechanismus Auto Combo (za běhu)
- Zdrojový kód: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Uživatelské rozhraní: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
