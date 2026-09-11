# COVERAGE_PLAN (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../../ar/docs/ops/COVERAGE_PLAN.md) · 🇦🇿 [az](../../../az/docs/ops/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../../bg/docs/ops/COVERAGE_PLAN.md) · 🇧🇩 [bn](../../../bn/docs/ops/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../../cs/docs/ops/COVERAGE_PLAN.md) · 🇩🇰 [da](../../../da/docs/ops/COVERAGE_PLAN.md) · 🇩🇪 [de](../../../de/docs/ops/COVERAGE_PLAN.md) · 🇬🇷 [el](../../../el/docs/ops/COVERAGE_PLAN.md) · 🇪🇸 [es](../../../es/docs/ops/COVERAGE_PLAN.md) · 🇪🇪 [et](../../../et/docs/ops/COVERAGE_PLAN.md) · 🇮🇷 [fa](../../../fa/docs/ops/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../../fi/docs/ops/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../../fr/docs/ops/COVERAGE_PLAN.md) · 🇮🇪 [ga](../../../ga/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [gu](../../../gu/docs/ops/COVERAGE_PLAN.md) · 🇮🇱 [he](../../../he/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../../hi/docs/ops/COVERAGE_PLAN.md) · 🇭🇷 [hr](../../../hr/docs/ops/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../../hu/docs/ops/COVERAGE_PLAN.md) · 🇮🇩 [id](../../../id/docs/ops/COVERAGE_PLAN.md) · 🇮🇹 [it](../../../it/docs/ops/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../../ja/docs/ops/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../../ko/docs/ops/COVERAGE_PLAN.md) · 🇱🇹 [lt](../../../lt/docs/ops/COVERAGE_PLAN.md) · 🇱🇻 [lv](../../../lv/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [mr](../../../mr/docs/ops/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../../ms/docs/ops/COVERAGE_PLAN.md) · 🇲🇹 [mt](../../../mt/docs/ops/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../../nl/docs/ops/COVERAGE_PLAN.md) · 🇳🇴 [no](../../../no/docs/ops/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../../phi/docs/ops/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../../pl/docs/ops/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../../pt/docs/ops/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../../ro/docs/ops/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../../ru/docs/ops/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../../sk/docs/ops/COVERAGE_PLAN.md) · 🇸🇮 [sl](../../../sl/docs/ops/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../../sv/docs/ops/COVERAGE_PLAN.md) · 🇰🇪 [sw](../../../sw/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [ta](../../../ta/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [te](../../../te/docs/ops/COVERAGE_PLAN.md) · 🇹🇭 [th](../../../th/docs/ops/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../../tr/docs/ops/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/COVERAGE_PLAN.md) · 🇵🇰 [ur](../../../ur/docs/ops/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../../vi/docs/ops/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/COVERAGE_PLAN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/COVERAGE_PLAN.md)

---

---

title: "План покривености тестовима"
version: 3.8.40
lastUpdated: 2026-06-28
---

# План покривености тестовима

Последње ажурирано: 2026-06-28

> Статус мерен 2026-05-13: линије 82.58%, наредбе 82.58%, функције 84.23%, гранања 75.22%. Фазе 1-5 су завршене. Тренутни фокус је Фаза 6 (>=85%) и Фаза 7 (>=90%).

## Основна вредност

Постоји више бројки покривености у зависности од начина на који се извештај рачуна. За планирање, само једна од њих је корисна.

| Метрика                      | Опсег                                                    | Наредбе / Линије | Гранања | Функције | Напомене                                                     |
| ---------------------------- | -------------------------------------------------------- | ---------------: | ------: | -------: | ------------------------------------------------------------ |
| Застарело                    | Стари `npm run test:coverage`                            |           79.42% |  75.15% |   67.94% | Надувано: рачуна тест фајлове и искључује `open-sse`         |
| Дијагностика                 | Само извор, искључујући тестове и искључујући `open-sse` |           68.16% |  63.55% |   64.06% | Корисно само за изолацију `src/**`                           |
| Препоручена основна вредност | Само извор, искључујући тестове и укључујући `open-sse`  |           82.58% |  75.22% |   84.23% | Ово је основна вредност на нивоу целог пројекта за побољшање |

Препоручена основна вредност је бројка коју треба оптимизовати.

## Правила

- Циљеви покривености се односе на изворне фајлове, а не на `tests/**`.
- `open-sse/**` је део производа и мора остати у опсегу.
- Нови код не би требало да смањује покривеност у измењеним областима.
- Пожељно је тестирати понашање и исходе гранања уместо детаља имплементације.
- За `src/lib/db/**` пожељно је користити привремене SQLite базе података и мале fixture-е уместо широких mock-ова.

## Тренутни скуп команди

- `npm run test:coverage`
  - Главна капија покривености извора за скуп јединичних тестова
  - Генерише `text-summary`, `html`, `json-summary` и `lcov`
- `npm run coverage:report`
  - Детаљан извештај по фајловима из последњег покретања
- `npm run test:coverage:legacy`
  - Само за историјско поређење

## Прекретнице

| Фаза   |                  Циљ | Фокус                                                    | Статус      |
| ------ | -------------------: | -------------------------------------------------------- | ----------- |
| Фаза 1 | 60% наредбе / линије | Брзи резултати и покривеност алата ниског ризика         | ✅ Завршено |
| Фаза 2 | 65% наредбе / линије | Основе базе података и рута                              | ✅ Завршено |
| Фаза 3 | 70% наредбе / линије | Валидација провајдера и аналитика коришћења              | ✅ Завршено |
| Фаза 4 | 75% наредбе / линије | `open-sse` преводиоци и помоћне функције                 | ✅ Завршено |
| Фаза 5 | 80% наредбе / линије | `open-sse` руковаоци и гранања извршитеља                | ✅ Завршено |
| Фаза 6 | 85% наредбе / линије | Тежи гранични случајеви, дуг гранања, регресиони скупови | У току      |
| Фаза 7 | 90% наредбе / линије | Финални преглед, затварање празнина, строго затезање     | На чекању   |

Гранања и функције би требало постепено да расту са сваком фазом, али примарни строги циљ су наредбе / линије.

## Приоритетне тачке (hotspots)

Ови фајлови данас имају најмању покривеност линија (< 60%) и нуде најбољи повраћај за фазе 6-7. Генерисано из `coverage/coverage-summary.json` дана 2026-05-13:

| #   | Фајл                                                         | Линије % |
| --- | ------------------------------------------------------------ | -------: |
| 1   | `open-sse/services/compression/validation.ts`                |    7.87% |
| 2   | `src/app/api/v1/batches/route.ts`                            |    9.67% |
| 3   | `src/app/docs/components/FeedbackWidget.tsx`                 |    9.80% |
| 4   | `open-sse/services/compression/toolResultCompressor.ts`      |   10.00% |
| 5   | `src/app/docs/components/DocCodeBlocks.tsx`                  |   10.63% |
| 6   | `open-sse/services/compression/engines/rtk/lineFilter.ts`    |   10.96% |
| 7   | `open-sse/services/specificityRules.ts`                      |   11.28% |
| 8   | `src/mitm/systemCommands.ts`                                 |   12.19% |
| 9   | `open-sse/services/compression/aggressive.ts`                |   12.77% |
| 10  | `src/app/api/v1/batches/[id]/cancel/route.ts`                |   12.98% |
| 11  | `open-sse/services/compression/progressiveAging.ts`          |   13.26% |
| 12  | `open-sse/services/compression/engines/rtk/smartTruncate.ts` |   13.43% |
| 13  | `open-sse/services/compression/engines/rtk/deduplicator.ts`  |   13.51% |
| 14  | `src/lib/cloudAgent/agents/jules.ts`                         |   13.52% |
| 15  | `open-sse/services/compression/lite.ts`                      |   14.46% |
| 16  | `src/app/api/v1/rerank/route.ts`                             |   14.94% |
| 17  | `open-sse/services/compression/preservation.ts`              |   15.07% |
| 18  | `src/lib/cloudAgent/agents/codex.ts`                         |   15.54% |
| 19  | `open-sse/services/tierResolver.ts`                          |   16.66% |
| 20  | `src/app/docs/components/DocsLazyWrapper.tsx`                |   16.66% |

Теме за фазе 6-7:

- `open-sse/services/compression/**` је најгушћи кластер ниске покривености и доминира преостали јаз.
- API руте за batch и rerank (`src/app/api/v1/batches/**`, `src/app/api/v1/rerank/route.ts`) захтевају тестове на нивоу handler-а.
- Адаптери за cloud агенте (`src/lib/cloudAgent/agents/jules.ts`, `codex.ts`) и `tierResolver.ts` захтевају тестове сценарија.
- UI компоненте документације и `src/mitm/systemCommands.ts` имају нижи приоритет, али доносе јефтине добитке у покривености грана (branch).

## Контролна листа извршавања

### Фаза 1: 56.95% -> 60%

- [x] Исправити метрику покривености тако да одражава изворни код уместо тест фајлова
- [x] Задржати legacy скрипту за покривеност ради поређења
- [x] Забележити базну линију и приоритетне тачке у репозиторијуму
- [ ] Додати фокусирене тестове за утилитете ниског ризика:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Додати тестове рута за:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`

### Фаза 2: 60% -> 65%

- [ ] Додати тестове подржане базом података за:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Покрити понашање грана (branch) у:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`

### Фаза 3: 65% -> 70%

- [ ] Додати тестове аналитике коришћења за:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Проширити покривеност рута за управљање proxy-јем и гране подешавања

### Фаза 4: 70% -> 75%

- [ ] Покрити помоћне функције преводиоца (translator) и централне путеве превода:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`

### Фаза 5: 75% -> 80%

- [ ] Додати тестове на нивоу handler-а за:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Додати покривеност грана извршиоца (executor) за аутентикацију специфичну за провајдера, поновне покушаје и премошћавања крајњих тачака

### Фаза 6: 80% -> 85%

- [ ] Спојити више низова тестова за ивичне случајеве (edge-case) у главни пут покривености
- [ ] Повећати покривеност функција за модуле базе података са слабом покривеношћу конструктора/помоћних функција
- [ ] Затворити јазове у гранама у `settings.ts`, `registeredKeys.ts`, `validation.ts` и помоћним функцијама преводиоца

### Фаза 7: 85% -> 90%

- [ ] Третирати преостале фајлове са ниском покривеношћу као блокере
- [ ] Додати регресионе тестове за сваку непокривену производну грешку исправљену током гурања ка 90%
- [ ] Подићи праг покривености у CI тек након што локална базна линија буде стабилна кроз најмање два узастопна извршавања

## Ratchet politika

Ažurirajte pragove za `npm run test:coverage` samo nakon što projekat zaista premaši sledeći milestone sa komotnim bafером.

**Trenutna kapija:** `npm run test:coverage` primenjuje **60 statements / 60 lines / 60 functions / 60 branches** (metrika je rebazirana u Quality-Gates Fazi 6A.1 — raniji bazni nivo od 82.58% bio je naduvan zato što je uračunavao test fajlove i isključivao `open-sse`). Komanda `test:coverage:legacy` čuva staru metriku 50/50/50 radi istorijskog poređenja.

Za ad-hoc provere pragova u odnosu na najnoviji izveštaj koristite:

```bash
node scripts/check/test-report-summary.mjs --threshold 75
```

Preporučeni ratchet redosled (poredak je `statements-lines / branches / functions`):

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72 <-- trenutna kapija (75/70/75)
6. 80/75/78
7. 85/80/84
8. 90/85/88

Sledeći ratchet cilj je `80/75/78` kada pokrivenost branch-ova ostane iznad 78% u dva uzastopna pokretanja.

## Poznati nedostatak

Trenutna komanda za pokrivenost mери glavni Node unit paket testova i uključuje izvorni kod dostupan iz njega, uključujući `open-sse`. Još ne spaja Vitest pokrivenost u jedinstveni, ujedinjeni izveštaj. To spajanje vredi uraditi kasnije, ali nije prepreka za početak penjanja sa 60% na 80%.
