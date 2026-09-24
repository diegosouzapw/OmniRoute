# Homologation Suite (`npm run homolog`) (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Валидиране E2E в реална среда на внедряването на OmniRoute, работещо на VPS за хомологация
(`HOMOLOG_BASE_URL`, напр. `http://192.168.0.15:20128`). Една команда заменя ръчния
контролен списък за release STOP #2 с автоматизирано изпълнение, генериращо доказателства.

## Какво обхваща

| Слой                        | Какво проверява                                                                                                                                                                                                                        | Реализация                                                                    |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — състояние/съответствие | `/api/monitoring/health` отговаря с `200`, със `status: "healthy"` и очакваната версия                                                                                                                                                 | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — временен ключ         | Вход като администратор → `POST /api/keys` създава API ключ с ограничен обхват за изпълнението, който се отнема (`DELETE /api/keys/:id`) в блок `finally` независимо от резултата                                                      | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API интерфейс         | Каталогът `/v1/models`, реално нестриймващо завършване на чат (критичен за нивото модел, `max_tokens: 5`), отговор `401` при невалиден ключ и публичният `/api/monitoring/health`                                                      | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE стрийминг         | Реално стриймващо завършване на чат; проверява `text/event-stream`, поне една делта със съдържание и завършващ маркер `[DONE]`                                                                                                         | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — реални доставчици      | Една заявка за чат с минимална цена за всеки критичен доставчик, наличен в активния каталог `/v1/models`, генерирана динамично чрез promptfoo                                                                                          | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — удостоверяване в UI   | Влиза веднъж през реалната форма за вход и използва повторно сесията (`storageState`) в целия UI слой                                                                                                                                  | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI маршрути           | Всяка статична `page.tsx` под `src/app/(dashboard)/dashboard` (открита от файловата система; динамичните маршрути `[param]` се пропускат) се зарежда без HTTP грешка, грешка в страницата или граничния компонент за грешки на Next.js | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — критичен UI поток     | Създава API ключ чрез UI на таблото за управление и след това отново го отнема (не оставя остатъчни данни на VPS)                                                                                                                      | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — обединен отчет         | Обединява httpYac (чрез `junit-to-ctrf`), адаптера promptfoo→CTRF и CTRF репортера на Playwright в един `homolog-ctrf.json`, както и в четим за хора отчет `homolog-report/summary.md`                                                 | `scripts/homolog/run.mjs`                                                     |

Нулево участие на LLM в самото повторно изпълнение — това е детерминиран набор от регресионни тестове,
а не оценяване. AI се включва само при бъдеща работа по поддръжката (вижте Пътната карта по-долу).

## Предварителни изисквания

1. Копирайте `.env.homolog.example` като `.env.homolog` (игнорира се от git — никога не го commit-вайте) и попълнете:
   - `HOMOLOG_BASE_URL` — целевото внедряване, напр. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — паролата за управление на таблото за това внедряване.
   - `HOMOLOG_CRITICAL_PROVIDERS` — разделени със запетаи префикси на доставчици, за които се изпраща реална
     smoke chat заявка (напр. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — оставете празно при нормални изпълнения; тестовият пакет създава и анулира
     собствен временен ключ. Задавайте го само за отстраняване на проблеми в отделен слой.
2. Изпълнете `npm install` в хранилището (зависимостите на тестовия пакет — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — са обикновени devDependencies).
3. Изпълнете `npx playwright install`, ако двоичните файлове на браузърите все още не са налични.

## Как се изпълнява

```bash
npm run homolog
```

За валидиране спрямо внедряване, чиято версия не съвпада с локалния `package.json`
(напр. среда за хомологация, която все още е на предишно patch издание), задайте изрично
очакваната версия:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Изпълнението завършва с ненулев код, ако някой слой е неуспешен, и винаги прави опит да анулира създадения
временен API ключ дори при грешка (`finally` блокът в `scripts/homolog/run.mjs`).

## Преглед на отчета

Целият изход се записва в `homolog-report/` (игнорира се от git):

- `summary.md` — същата таблица, която се извежда в stdout, с по един ред за всеки слой (✅/❌ + подробности).
- `homolog-ctrf.json` — обединеният CTRF отчет (сливане на резултатите от API/SSE, provider-smoke и
  потребителския интерфейс) — това е артефактът, който трябва да се приложи към контролния списък за STOP #2 на дадено издание.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — необработените/междинните
  отчети за отделните слоеве.
- `promptfooconfig.yaml`, `provider-misses.json` — генерираната конфигурация на promptfoo за
  текущото изпълнение и всички критични доставчици, които липсват в активния каталог.

Неуспешен L0 прекратява изпълнението незабавно (не се създава временен ключ), тъй като несъответствие
във версията/състоянието означава, че всеки следващ слой би валидирал грешното внедряване.

## Повторно установяване на базовото състояние при основателни промени в потребителския интерфейс

L4b (smoke тест на маршрутите) и L4c (поток през потребителския интерфейс за API ключове) използват реални DOM локатори, а не
моментни снимки, така че повечето основателни промени в потребителския интерфейс не изискват актуализиране на тестовия пакет. Когато дадена промяна
все пак повреди локатор (напр. преименуван етикет на бутон или преместена страница с настройки):

1. Потвърдете отново локатора спрямо текущия изходен код (спецификациите вече документират спрямо кой
   файл/ред е потвърден всеки локатор — следвайте същия подход, не гадайте).
2. Актуализирайте спецификацията в `tests/homolog/ui/`.
3. Изпълнете отново `npm run homolog` (или само засегнатата Playwright спецификация) спрямо VPS, за да
   потвърдите корекцията, след което направете commit.

В този тестов пакет няма визуално/пикселно базово състояние (F1) — вижте Пътната карта за това.

## Пътна карта (F2 / F3)

Дизайнът и поетапното внедряване са описани във вътрешната спецификация за планиране
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (без връзка — вътрешен
артефакт в `_tasks/`, който не е част от проследяваната документация на това хранилище). Обобщение:

- **F2** — запис на пълен walkthrough → Playwright Test Agents (`planner`/`generator`)
  го преобразуват в спецификации на потоци (създаване на combo, тестване на доставчик, редактиране на настройки, MCP инструменти) +
  базово състояние за визуална регресия (Lost Pixel) с маски върху динамични данни (метрики,
  времеви маркери, логове) + рутинна процедура за поддръжка чрез `healer` при всяко издание.
- **F3** — покритие за устойчивост/договори/свързване: toxiproxy + фалшив OpenAI-съвместим
  доставчик на devbox, combo `homolog-resilience` на VPS, насочено към него
  (инжектиран timeout → потвърждаване на fallback + отваряне/затваряне на circuit breaker чрез
  `/api/monitoring/health`); контролирано с gate тестване на договорите чрез Schemathesis спрямо
  `docs/openapi.yaml` (ниска стойност на `--max-examples`, фиксирани seeds, само крайни точки без LLM); и
  свързване на `npm run homolog` + неговия `summary.md` към фазата STOP #2 на `/generate-release`.
