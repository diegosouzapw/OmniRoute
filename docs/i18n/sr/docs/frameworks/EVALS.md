# Evaluations (Evals) (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Извор истине:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Последње ажурирање:** 2026-06-28 — v3.8.40

OmniRoute садржи генерички оквир за евалуацију који можете да користите за упоредно тестирање конфигурација рутирања, појединачних добављача/модела или укључених „golden set” скупова тестова. Користите га за проверу измена рутирања, валидацију нових добављача и контролу издања пре њиховог пуштања у продукциони саобраћај.

Оквир је имплементиран као:

- Независни покретач (`src/lib/evals/evalRunner.ts`) који региструје уграђене скупове тестова у меморији, евалуира излазе у односу на очекиване критеријуме и обједињује картице резултата.
- Слој за перзистенцију (`src/lib/db/evals.ts`) за прилагођене (кориснички дефинисане) скупове тестова и историјска покретања у SQLite-у.
- Оркестрациони слој (`src/lib/evals/runtime.ts`) који извршава сваки случај слањем стварних позива ка `POST /v1/chat/completions`, бележи кашњење и излазе и трајно чува покретање.
- REST крајње тачке под `/api/evals/*` (само уз администраторску аутентификацију).
- Приказ контролне табле на `Контролна табла → Употреба → Евалуације` (`EvalsTab.tsx`).

## Концепти

### Скуп тестова

Скуп тестова је именована колекција тестних случајева са пољем `description` и једним или више случајева. Скупови тестова потичу из два извора:

| Извор      | Где је дефинисано                                       | Променљиво током извршавања?             |
| ---------- | ------------------------------------------------------- | ---------------------------------------- |
| `built-in` | Регистровано преко `registerSuite()` при покретању      | Не (дефинисано у коду)                   |
| `custom`   | Сачувано у SQLite табелама `eval_suites` + `eval_cases` | Да (преко API-ја/корисничког интерфејса) |

Тренутни уграђени скупови тестова (погледајте `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 основних случајева који обухватају поздраве/математику/превођење/безбедност
- `coding-proficiency` — Python/JS/SQL/TS/откривање грешака
- `reasoning-logic` — силогизми, текстуални задаци, препознавање образаца
- `multilingual` — превођење и препознавање језика
- `safety-guardrails` — лични идентификациони подаци, jailbreak, одбијање, свест о пристрасности
- `instruction-following` — само JSON, нумерисане листе, језичка ограничења
- `codex-comparison` — директни задаци програмирања намењени режиму поређења

### Случај

Сваки случај садржи:

| Поље       | Опис                                                             |
| ---------- | ---------------------------------------------------------------- |
| `id`       | Стабилан идентификатор (користи се као кључ за излазе и метрике) |
| `name`     | Ознака читљива људима                                            |
| `model`    | Подразумевани модел када покретање користи циљ `suite-default`   |
| `input`    | `{ messages, max_tokens? }` — шаље се на `/v1/chat/completions`  |
| `expected` | `{ strategy, value }` — критеријум оцењивања (погледајте испод)  |
| `tags`     | Опционе ознаке (нпр. `safety`, `pii`, `jailbreak`)               |

### Циљ

Исти скуп тестова може да се покрене над различитим циљевима. Шема циља је `evalTargetSchema` у `src/shared/validation/schemas.ts`:

| Тип циља        | `id`              | Понашање                                                                       |
| --------------- | ----------------- | ------------------------------------------------------------------------------ |
| `suite-default` | `null`            | Сваки случај користи сопствено уграђено поље `model`                           |
| `model`         | назив модела      | Сваки случај се принудно усмерава кроз један директни модел (нпр. `gpt-4o`)    |
| `combo`         | назив комбинације | Сваки случај се покреће кроз једну комбинацију (тестира механизам за рутирање) |

За `model` и `combo`, поље `id` је обавезно (што спроводи Zod преко `superRefine`). Када је наведен `compareTarget`, оба циља морају да се разликују — покретач трајно чува оба покретања под истим `runGroupId` ради A/B поређења.

## Критеријуми оцењивања

Имплементирани у `evaluateCase()` (evalRunner.ts):

| Стратегија | Пролази када…                                                                                |
| ---------- | -------------------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                            |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                          |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` има истиниту вредност                        |
| `custom`   | `expected.fn(actualOutput, evalCase)` враћа истиниту вредност (само уграђени пакети тестова) |

**Напомена:** Оцењивање прилагођеном функцијом резервисано је за пакете тестова
дефинисане у коду (уграђене), јер функције не могу да се серијализују путем API-ја.
`evalCaseBuilderSchema` прихвата само `contains | exact | regex` за пакете тестова
које креирају корисници.

Тренутно не постоји LLM оцењивач нити оцењивач сличности заснован на уграђивањима —
то би била јасна тачка проширења у `evaluateCase()`.

## Шема базе података

Три табеле (миграције `030_create_eval_runs.sql` и
`031_create_eval_suites.sql`):

| Табела        | Намена                                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Метаподаци прилагођених пакета тестова (`id`, `name`, `description`)                                                               |
| `eval_cases`  | Случајеви по пакету тестова — `input_json`, `expected_*`, `tags_json`                                                              |
| `eval_runs`   | Историјска извршавања — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Уграђени пакети тестова се **не** чувају у бази података. Налазе се у меморији и
поново се региструју сваки пут када се `evalRunner.ts` увезе.

## REST API

Све крајње тачке захтевају управљачку ауторизацију (`requireManagementAuth`) —
оне нису део јавне прокси површине.

| Крајња тачка                  | Метод    | Опис                                                                              |
| ----------------------------- | -------- | --------------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Наводи пакете тестова + недавна извршавања + преглед резултата + циљеве + кључеве |
| `/api/evals`                  | `POST`   | Покреће пакет тестова (појединачно или поређење) — шема `evalRunSuiteSchema`      |
| `/api/evals/{suiteId}`        | `GET`    | Добавља један пакет тестова (уграђени или прилагођени)                            |
| `/api/evals/suites`           | `POST`   | Креира прилагођени пакет тестова — шема `evalSuiteSaveSchema`                     |
| `/api/evals/suites/{suiteId}` | `GET`    | Добавља прилагођени пакет тестова                                                 |
| `/api/evals/suites/{suiteId}` | `PUT`    | Замењује прилагођени пакет тестова (случајеви се поново убацују)                  |
| `/api/evals/suites/{suiteId}` | `DELETE` | Брише прилагођени пакет тестова и његове случајеве                                |

### Покретање пакета тестова

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

Опциона поља:

- `outputs` — `Record<caseId, string>` унапред израчунатих излаза. Када је наведено,
  покретач **прескаче слање захтева** и само оцењује кеширане излазе (корисно за
  офлајн евалуацију).
- `compareTarget` — други циљ који се покреће паралелно; оба извршавања деле
  генерисани `runGroupId` ради директног поређења.
- `apiKeyId` — интерни API кључ који се користи за аутентификацију послатих
  `/v1/chat/completions` позива. Обавезан је када је `REQUIRE_API_KEY` омогућен.

### Креирање прилагођеног пакета тестова

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

## Proces izvršavanja

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Razrešava skup testova (ugrađeni ili prilagođeni).
2. Za svaki slučaj formira `Request` ka `/v1/chat/completions` sa vrednostima
   `messages` iz slučaja, razrešenim `model`, `stream: false` i `max_tokens: 512`
   (ili vrednošću definisanom u samom slučaju).
3. Direktno poziva rukovalac ćaskanja (unutar procesa — bez dodatnog HTTP poziva).
4. Beleži latenciju i izdvaja tekst iz `choices[0].message.content`
   ili korisnog sadržaja Responses API-ja `output[]`.
5. Ocenjuje sve izlaze pomoću `runSuite()`, a zatim ih čuva pomoću `saveEvalRun()`.

Slučajevi se izvršavaju **sekvencijalno**. Trenutno ne postoji opcija za konkurentno izvršavanje.

## Kontrolna tabla

Korisnički interfejs se nalazi na `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Odatle možete:

- Pregledati ugrađene i prilagođene skupove sa pregledom svakog pojedinačnog slučaja.
- Kreirati/uređivati/brisati prilagođene skupove pomoću alatke za pravljenje slučajeva.
- Izabrati cilj (podrazumevane vrednosti skupa / model / kombinacija), opciono drugi
  `compareTarget`, opciono API ključ, a zatim pokrenuti izvršavanje na zahtev.
- Pregledati istoriju izvršavanja, status prolaza/neuspeha za svaki slučaj, latenciju i zabeležene izlaze.
- Videti zbirni pregled rezultata agregiran na osnovu najnovijeg izvršavanja za svaki
  opseg `(suite, target)`.

## Odnos sa RFC-om za automatsku procenu

Zaseban, uže usmeren podsistem za procenu nalazi se u `src/domain/assessment/`
(pogledajte i [AUTO-COMBO.md](../routing/AUTO-COMBO.md) za aktivni mehanizam ocenjivanja).
Taj podsistem je namenjen mehanizmu Auto Combo — automatski ocenjuje provajdere i
modele kako bi se kombinacije mogle samostalno oporaviti kada uzvodni sistemi otkažu. Koristi sopstveni izvršavač,
sopstveni kategorizator i sopstvenu logiku ocenjivanja.

Ovde dokumentovan okvir Evals predstavlja **širu platformu za testiranje opšte namene**.
Dajte mu prednost za proizvoljne skupove regresionih testova, A/B poređenja
i dimne testove za svako izdanje. Koristite podsistem Auto-Assessment kada je potrebno
da stanje provajdera u realnom vremenu utiče na odluke o usmeravanju.

## Integracija sa CI-jem

Trenutno ne postoji namenski npm skript `eval:ci`. Ako želite da uslovite
objavljivanje izdanja rezultatima evaluacije, postoje dva pristupa:

- **HTTP pristup**: pokrenite server, pošaljite `POST /api/evals` sa poznatim
  `suiteId` + `target` i proverite da li je `runs[].summary.passRate >= N` u
  odgovoru.
- **Pristup unutar procesa**: uvezite `runEvalSuiteAgainstTarget()` iz
  `@/lib/evals/runtime` unutar skripta, pokrenite ga nad testnom bazom podataka i proverite
  vraćeni `PersistedEvalRun.summary`.

Testovi koji pokrivaju rutu i istoriju nalaze se u
`tests/unit/evals-route.test.ts` i `tests/unit/evals-history.test.ts`.

## Tačke proširenja

Uobičajene izmene i mesta na kojima ih treba napraviti:

- **Nova strategija ocenjivanja** — proširite blok `switch (evalCase.expected.strategy)`
  u `evaluateCase()` (`evalRunner.ts`) i proširite `EvalCaseStrategy` u
  `src/lib/db/evals.ts`, kao i `evalCaseBuilderSchema` u `schemas.ts`.
- **Novi ugrađeni skup** — definišite objekat skupa i pozovite `registerSuite()` na
  kraju datoteke `evalRunner.ts`. Funkcija `listSuites()` automatski će ga otkriti.
- **Konkurentno izvršavanje** — promenite sekvencijalnu petlju `for` u
  `runEvalSuiteAgainstTarget()` u ograničeni `Promise.all` (trenutno ne postoji
  kontrola konkurentnosti).
- **Slučajevi strimovanja/pozivanja alata** — izvršavač trenutno nameće `stream: false`.
  Evaluacija sa strimovanjem ili podrškom za alate zahtevala bi izmene u `runtime.ts`
  (beleženje i objedinjavanje SSE fragmenata pre ocenjivanja).

## Такође погледајте

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — општи водич кроз производ
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — референца за ток обраде захтева
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — механизам за оцењивање Auto Combo (у активном окружењу)
- Изворни код: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Кориснички интерфејс: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
