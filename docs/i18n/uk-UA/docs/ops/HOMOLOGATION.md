# Homologation Suite (`npm run homolog`) (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Перевірка E2E у реальному середовищі розгортання OmniRoute, що працює на VPS для омологації
(`HOMOLOG_BASE_URL`, наприклад `http://192.168.0.15:20128`). Одна команда замінює ручний
контрольний список STOP #2 для релізу автоматизованим запуском із формуванням доказів.

## Що охоплюється

| Рівень                            | Що перевіряється                                                                                                                                                                                                         | Реалізація                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| L0 — працездатність/відповідність | `/api/monitoring/health` відповідає `200` зі `status: "healthy"` та очікуваною версією                                                                                                                                   | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — тимчасовий ключ             | Вхід адміністратора → `POST /api/keys` створює API-ключ з обмеженою областю дії для запуску, який відкликається (`DELETE /api/keys/:id`) у блоці `finally` незалежно від результату                                      | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — поверхня API                | Каталог `/v1/models`, реальне непотокове завершення чату (критична для рівня модель, `max_tokens: 5`), відповідь `401` для недійсного ключа та загальнодоступний `/api/monitoring/health`                                | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — потокове передавання SSE    | Реальне потокове завершення чату; перевіряє `text/event-stream`, щонайменше одну дельту вмісту та термінатор `[DONE]`                                                                                                    | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — реальні провайдери           | Один запит до чату з мінімальною вартістю для кожного критичного провайдера, наявного в актуальному каталозі `/v1/models`, який генерується на льоту за допомогою promptfoo                                              | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — автентифікація в UI         | Одноразово виконує вхід через справжню форму входу та повторно використовує сеанс (`storageState`) у межах рівня UI                                                                                                      | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — маршрути UI                 | Кожна статична сторінка `page.tsx` у `src/app/(dashboard)/dashboard` (виявлена у файловій системі; динамічні маршрути `[param]` пропускаються) завантажується без помилки HTTP, помилки сторінки чи межі помилок Next.js | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — критичний потік UI          | Створює API-ключ через UI панелі керування та повторно відкликає його (не залишає залишкових даних на VPS)                                                                                                               | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — уніфікований звіт            | Об’єднує httpYac (через `junit-to-ctrf`), адаптер promptfoo→CTRF і CTRF-репортер Playwright в один `homolog-ctrf.json`, а також створює зручний для читання `homolog-report/summary.md`                                  | `scripts/homolog/run.mjs`                                                     |

Жодного залучення LLM до самого повторного прогону — це детермінований набір регресійних
перевірок, а не оцінювання. ШІ залучатиметься лише до майбутніх робіт із супроводу (див. дорожню карту нижче).

## Передумови

1. Скопіюйте `.env.homolog.example` до `.env.homolog` (ігнорується git — ніколи не додавайте його до комітів) і заповніть:
   - `HOMOLOG_BASE_URL` — цільове розгортання, наприклад `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — пароль керування панеллю для цього розгортання.
   - `HOMOLOG_CRITICAL_PROVIDERS` — розділені комами префікси провайдерів, для яких виконується реальний
     димовий чат-запит (наприклад, `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — залишайте порожнім під час звичайних запусків; набір тестів створює та відкликає
     власний тимчасовий ключ. Установлюйте це значення лише для налагодження окремого рівня в ізоляції.
2. Виконайте `npm install` у репозиторії (залежності набору тестів — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — є звичайними devDependencies).
3. Виконайте `npx playwright install`, якщо бінарні файли браузерів ще не встановлено.

## Як запустити

```bash
npm run homolog
```

Щоб виконати перевірку щодо розгортання, версія якого не відповідає локальному `package.json`
(наприклад, середовище омологації все ще використовує попередній патч-реліз), явно перевизначте очікувану
версію:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Запуск завершується з ненульовим кодом, якщо будь-який рівень завершується невдало, і завжди намагається відкликати створений ним тимчасовий
API-ключ, навіть у разі помилки (блок `finally` у `scripts/homolog/run.mjs`).

## Читання звіту

Усі результати зберігаються в `homolog-report/` (ігнорується git):

- `summary.md` — та сама таблиця, що виводиться у stdout, з одним рядком на рівень (✅/❌ + деталі).
- `homolog-ctrf.json` — об’єднаний звіт CTRF (поєднання результатів API/SSE, димових тестів провайдерів та
  інтерфейсу) — це артефакт, який потрібно додати до контрольного списку STOP #2 релізу.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — необроблені/проміжні
  звіти для кожного рівня.
- `promptfooconfig.yaml`, `provider-misses.json` — згенерована конфігурація promptfoo для
  поточного запуску та перелік усіх критичних провайдерів, відсутніх у робочому каталозі.

Помилка на L0 негайно перериває виконання (тимчасовий ключ не створюється), оскільки невідповідність версії або стану
означає, що кожен наступний рівень перевіряв би не те розгортання.

## Оновлення базового стану після правомірних змін інтерфейсу

L4b (димова перевірка маршрутів) і L4c (сценарій роботи з API-ключем в інтерфейсі) використовують реальні локатори DOM, а не
знімки, тому більшість правомірних змін інтерфейсу не потребують оновлення набору тестів. Якщо зміна
все ж порушує роботу локатора (наприклад, через перейменування кнопки або переміщення сторінки налаштувань):

1. Повторно перевірте локатор за актуальним вихідним кодом (у специфікаціях уже задокументовано, у якому
   файлі/рядку було підтверджено кожен локатор — дотримуйтеся того самого підходу, не вгадуйте).
2. Оновіть специфікацію в `tests/homolog/ui/`.
3. Повторно виконайте `npm run homolog` (або лише відповідну специфікацію Playwright) щодо VPS, щоб
   підтвердити виправлення, а потім створіть коміт.

У цьому наборі тестів немає візуального/піксельного еталона (F1) — дивіться дорожню карту щодо цього.

## Дорожня карта (F2 / F3)

Проєктування та поетапне впровадження описані у внутрішній специфікації планування
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (посилання не наведено — це внутрішній
артефакт `_tasks/`, який не входить до відстежуваної документації цього репозиторію). Стислий опис:

- **F2** — повний запис покрокового сценарію → агенти Playwright Test (`planner`/`generator`)
  перетворюють його на специфікації сценаріїв (створення комбінації, тестування провайдера, редагування налаштувань, інструменти MCP) +
  еталон візуальної регресії (Lost Pixel) із масками над динамічними даними (метрики,
  позначки часу, журнали) + процедура супроводу `healer` для кожного релізу.
- **F3** — покриття відмовостійкості/контрактів/інтеграції: toxiproxy + фіктивний OpenAI-сумісний
  провайдер на devbox, комбінація `homolog-resilience` на VPS, спрямована на нього
  (ін’єкція тайм-ауту → перевірка резервного перемикання + відкриття/закриття автоматичного вимикача через
  `/api/monitoring/health`); контрольоване контрактне тестування Schemathesis щодо
  `docs/openapi.yaml` (низьке значення `--max-examples`, фіксовані початкові значення, лише кінцеві точки без LLM); а також
  інтеграція `npm run homolog` і його `summary.md` у фазу STOP #2 процесу `/generate-release`.
