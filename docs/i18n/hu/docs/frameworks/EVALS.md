# Evaluations (Evals) (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Hiteles forrás:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Legutóbb frissítve:** 2026-06-28 — v3.8.40

Az OmniRoute egy általános kiértékelési keretrendszert biztosít, amellyel teljesítménytesztelhetők az útválasztási konfigurációk, az egyes szolgáltatók/modellek, illetve a mellékelt „golden set” tesztcsomagok. Segítségével ellenőrizhetők az útválasztási módosítások, validálhatók az új szolgáltatók, és kiadási feltételek szabhatók meg, mielőtt a változtatások éles forgalomba kerülnének.

A keretrendszer a következő elemekből áll:

- Egy tiszta futtató (`src/lib/evals/evalRunner.ts`), amely regisztrálja a memóriában tárolt, beépített tesztcsomagokat, a kimeneteket az elvárt feltételek alapján értékeli ki, és összesíti a pontozólapokat.
- Egy perzisztenciaréteg (`src/lib/db/evals.ts`) az egyéni (felhasználó által definiált) tesztcsomagok és a korábbi futtatások SQLite-adatbázisban történő tárolásához.
- Egy vezérlési réteg (`src/lib/evals/runtime.ts`), amely minden esetet a `POST /v1/chat/completions` végpontra küldött valós hívással hajt végre, rögzíti a késleltetést és a kimeneteket, majd tartósan tárolja a futtatást.
- REST-végpontok az `/api/evals/*` alatt (kizárólag felügyeleti hitelesítéssel).
- Egy irányítópult-felület a `Dashboard → Usage → Evals` helyen (`EvalsTab.tsx`).

## Fogalmak

### Tesztcsomag

A tesztcsomag tesztesetek névvel ellátott gyűjteménye, amely egy `description` mezőt és egy vagy több esetet tartalmaz. A tesztcsomagok két forrásból származhatnak:

| Forrás     | Definíció helye                               | Módosítható futásidőben? |
| ---------- | --------------------------------------------- | ------------------------ |
| `built-in` | Indításkor, a `registerSuite()` használatával | Nem (kódban definiált)   |
| `custom`   | SQLite `eval_suites` + `eval_cases` táblákban | Igen (API/UI útján)      |

A jelenlegi beépített tesztcsomagok (lásd: `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 alapteszteset üdvözléshez, matematikához, fordításhoz és biztonsághoz
- `coding-proficiency` — Python/JS/SQL/TS/hibafelismerés
- `reasoning-logic` — szillogizmusok, szöveges feladatok, mintafelismerés
- `multilingual` — fordítás és nyelvfelismerés
- `safety-guardrails` — személyazonosításra alkalmas adatok, jailbreak, visszautasítás, előítéletek felismerése
- `instruction-following` — kizárólag JSON-formátumú válaszok, számozott listák, nyelvi korlátozások
- `codex-comparison` — összehasonlítási módhoz szánt, közvetlenül összevethető programozási feladatok

### Eset

Minden eset a következőket tartalmazza:

| Mező       | Leírás                                                                  |
| ---------- | ----------------------------------------------------------------------- |
| `id`       | Stabil azonosító (a kimenetek és mérőszámok kulcsaként használatos)     |
| `name`     | Ember által olvasható címke                                             |
| `model`    | Alapértelmezett modell, ha a futtatás `suite-default` célzást használ   |
| `input`    | `{ messages, max_tokens? }` — a `/v1/chat/completions` végpontra küldve |
| `expected` | `{ strategy, value }` — pontozási szempontrendszer (lásd alább)         |
| `tags`     | Opcionális címkék (például `safety`, `pii`, `jailbreak`)                |

### Cél

Ugyanaz a tesztcsomag különböző célokon is futtatható. A célsémát az
`evalTargetSchema` határozza meg a `src/shared/validation/schemas.ts` fájlban:

| Céltípus        | `id`          | Viselkedés                                                                |
| --------------- | ------------- | ------------------------------------------------------------------------- |
| `suite-default` | `null`        | Minden eset a saját beépített `model` mezőjét használja                   |
| `model`         | modellnév     | Minden esetet egyetlen közvetlen modellen futtat (például `gpt-4o`)       |
| `combo`         | kombinációnév | Minden esetet egyetlen kombináción futtat (az útválasztó motort teszteli) |

A `model` és a `combo` esetében az `id` mező megadása kötelező (ezt a Zod
`superRefine` kényszeríti ki). A `compareTarget` megadásakor a két célnak
különböznie kell — a futtató mindkét futtatást ugyanazzal a `runGroupId`
értékkel tárolja az A/B összehasonlításhoz.

## Pontozási szabályok

Az `evaluateCase()` függvényben megvalósítva (evalRunner.ts):

| Stratégia  | Sikeres, ha…                                                                          |
| ---------- | ------------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                     |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                   |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` igaz értéket ad vissza                |
| `custom`   | `expected.fn(actualOutput, evalCase)` igaz értéket ad vissza (csak beépített esetben) |

**Megjegyzés:** Az egyéni függvénnyel történő pontozás a kódban definiált
(beépített) tesztcsomagok számára van fenntartva, mivel a függvények nem
szerializálhatók az API-n keresztül. Az `evalCaseBuilderSchema` kizárólag a
`contains | exact | regex` értékeket fogadja el a felhasználók által létrehozott
tesztcsomagok esetében.

Jelenleg nincs LLM-alapú értékelő vagy embeddingalapú hasonlósági pontozó — ez
egyértelmű bővítési pont lenne az `evaluateCase()` függvényben.

## Adatbázisséma

Három tábla (`030_create_eval_runs.sql` és `031_create_eval_suites.sql`
migrációk):

| Tábla         | Rendeltetés                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Egyéni tesztcsomagok metaadatai (`id`, `name`, `description`)                                                                   |
| `eval_cases`  | Tesztesetek tesztcsomagonként — `input_json`, `expected_*`, `tags_json`                                                         |
| `eval_runs`   | Korábbi futtatások — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

A beépített tesztcsomagok **nincsenek** az adatbázisban tárolva. A memóriában
találhatók, és az `evalRunner.ts` minden importálásakor újra regisztrálva lesznek.

## REST API

Minden végpont kezelői hitelesítést (`requireManagementAuth`) igényel — ezek nem
részei a nyilvános proxyfelületnek.

| Végpont                       | Metódus  | Leírás                                                                           |
| ----------------------------- | -------- | -------------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Tesztcsomagok + legutóbbi futtatások + eredménytábla + célok + kulcsok listázása |
| `/api/evals`                  | `POST`   | Tesztcsomag futtatása (önálló vagy összehasonlító) — séma: `evalRunSuiteSchema`  |
| `/api/evals/{suiteId}`        | `GET`    | Egy tesztcsomag lekérése (beépített vagy egyéni)                                 |
| `/api/evals/suites`           | `POST`   | Egyéni tesztcsomag létrehozása — séma: `evalSuiteSaveSchema`                     |
| `/api/evals/suites/{suiteId}` | `GET`    | Egyéni tesztcsomag lekérése                                                      |
| `/api/evals/suites/{suiteId}` | `PUT`    | Egyéni tesztcsomag lecserélése (az esetek újra beszúrásra kerülnek)              |
| `/api/evals/suites/{suiteId}` | `DELETE` | Egyéni tesztcsomag és eseteinek törlése                                          |

### Tesztcsomag futtatása

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

Opcionális mezők:

- `outputs` — előre kiszámított kimenetek `Record<caseId, string>` formában. Ha
  meg van adva, a futtató **kihagyja a továbbítást**, és csak a gyorsítótárazott
  kimeneteket pontozza (offline kiértékeléshez hasznos).
- `compareTarget` — párhuzamosan futtatandó második cél; a két futtatás közös,
  generált `runGroupId` értéket használ a közvetlen összehasonlításhoz.
- `apiKeyId` — a továbbított `/v1/chat/completions` hívások hitelesítésére
  használt belső API-kulcs. Kötelező, ha a `REQUIRE_API_KEY` engedélyezve van.

### Egyéni tesztcsomag létrehozása

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

## Végrehajtási folyamat

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Feloldja a tesztcsomagot (beépített vagy egyéni).
2. Minden esethez összeállít egy `Request` kérést a `/v1/chat/completions` végponthoz az esethez tartozó
   `messages`, a feloldott `model`, a `stream: false` és a `max_tokens: 512`
   értékekkel (vagy az esetben megadott felülírással).
3. Közvetlenül meghívja a csevegéskezelőt (folyamaton belül — további HTTP-ugrás nélkül).
4. Rögzíti a késleltetést, és kinyeri a szöveget a `choices[0].message.content`
   mezőből vagy a Responses API `output[]` hasznos adattartalmából.
5. Az összes kimenetet pontozza a `runSuite()` segítségével, majd elmenti őket a `saveEvalRun()` használatával.

Az esetek végrehajtása **szekvenciálisan** történik. Jelenleg nincs párhuzamossági kapcsoló.

## Irányítópult

A felhasználói felület a `Dashboard → Usage → Evals` útvonalon található
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Innen a következőket
teheti:

- Böngészhet a beépített és egyéni tesztcsomagok között, esetenkénti előnézettel.
- Egyéni tesztcsomagokat hozhat létre, szerkeszthet és törölhet az esetépítővel.
- Kiválaszthat egy célpontot (a tesztcsomag alapértelmezései / modell / kombináció), opcionálisan egy második
  `compareTarget` célpontot és egy API-kulcsot, majd igény szerint elindíthatja a futtatást.
- Megtekintheti a futtatási előzményeket, az esetenkénti sikeres/sikertelen állapotot, a késleltetést és a rögzített kimeneteket.
- Megtekintheti a gördülő eredménykártyát, amely a legutóbbi futtatás alapján összesít az egyes
  `(suite, target)` hatókörökre.

## Kapcsolat az automatikus értékelési RFC-vel

Egy különálló, szűkebb értékelési alrendszer található a `src/domain/assessment/`
könyvtárban (az éles pontozómotorról lásd még: [AUTO-COMBO.md](../routing/AUTO-COMBO.md)).
Ez az alrendszer az Auto Combo motort célozza — automatikusan pontozza a szolgáltatókat és
modelleket, hogy a kombinációk önjavító módon reagálhassanak, amikor a felsőbb szintű szolgáltatások meghibásodnak. Saját futtatót,
saját kategorizálót és saját pontozási logikát használ.

Az itt dokumentált Evals keretrendszer a **szélesebb körű, általános célú
tesztelési felület**. Tetszőleges regressziós tesztcsomagokhoz, A/B összehasonlításokhoz
és kiadásonkénti füsttesztekhez ezt részesítse előnyben. Az Auto-Assessment alrendszert akkor használja,
ha a valós idejű szolgáltatói állapotnak befolyásolnia kell az útválasztási döntéseket.

## CI-integráció

Jelenleg nincs külön `eval:ci` npm-szkript. Ha a kiadásokat az értékelési eredményekhez
szeretné kötni, két lehetőség áll rendelkezésre:

- **HTTP-útvonal**: indítsa el a kiszolgálót, küldjön kérést a `POST /api/evals` végpontra egy ismert
  `suiteId` + `target` párossal, és ellenőrizze a válaszban, hogy
  `runs[].summary.passRate >= N`.
- **Folyamaton belüli útvonal**: importálja a `runEvalSuiteAgainstTarget()` függvényt az
  `@/lib/evals/runtime` modulból egy szkriptben, futtassa egy tesztadatbázissal, és ellenőrizze a
  visszaadott `PersistedEvalRun.summary` értéket.

Az útvonalat és az előzményeket lefedő tesztek a
`tests/unit/evals-route.test.ts` és `tests/unit/evals-history.test.ts` fájlokban találhatók.

## Bővítési pontok

Gyakori módosítások és végrehajtásuk helye:

- **Új pontozási stratégia** — bővítse a `switch (evalCase.expected.strategy)`
  blokkot az `evaluateCase()` függvényben (`evalRunner.ts`), valamint bővítse az `EvalCaseStrategy` típust a
  `src/lib/db/evals.ts` fájlban és az `evalCaseBuilderSchema` sémát a `schemas.ts` fájlban.
- **Új beépített tesztcsomag** — definiáljon egy tesztcsomag-objektumot, és hívja meg a `registerSuite()` függvényt az
  `evalRunner.ts` végén. A `listSuites()` automatikusan felderíti.
- **Párhuzamos futtatás** — módosítsa a szekvenciális `for` ciklust a
  `runEvalSuiteAgainstTarget()` függvényben korlátozott `Promise.all` használatára (jelenleg nincs
  párhuzamosság-vezérlés).
- **Adatfolyamos/eszközhívásos esetek** — a futtató jelenleg kikényszeríti a `stream: false` beállítást.
  Az adatfolyamos vagy eszköztudatos értékeléshez módosítani kellene a `runtime.ts` fájlt
  (az SSE-darabok rögzítése és összesítése a pontozás előtt).

## Lásd még

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — a termék átfogó bemutatása
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — a kérésfeldolgozási folyamat referenciája
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo pontozási motor (élő futtatókörnyezet)
- Forrás: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Felhasználói felület: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
