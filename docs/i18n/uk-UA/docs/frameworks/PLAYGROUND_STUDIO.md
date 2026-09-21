# Playground Studio (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Функція:** Playground Studio — уніфікований робочий простір для тестування ШІ в `/dashboard/playground`.
> **Плани:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Статус:** Випущено у v3.8.6

---

## Огляд

Playground Studio перетворює `/dashboard/playground` із простого редактора на базі Monaco
на повнофункціональний робочий простір для тестування. Він замінює застарілий `page.tsx` оболонкою
`PlaygroundStudio`, яка відображає чотири вкладки та спільну панель конфігурації.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Чат] [⚖ Порівняння] [{} API] [🔧 Збірка]  142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {вміст активної вкладки}                │ ─ Конфігурація            │
│                                          │ Кінцева точка [chat ∨]    │
│                                          │ Модель    [gpt-5.4 ∨]     │
│                                          │ Система   [текстове поле] │
│                                          │ Температура ▕▕▔▔ 0.7      │
│                                          │ Пресети [▾ завант.][збер.]│
│                                          │ [✨ Покращити промпт]      │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Вкладки

### Вкладка чату

Перетворює `ChatPlayground.tsx` на робоче середовище з підтримкою потокової передачі та кількох послідовних обмінів повідомленнями:

- Повноцінне відтворення Markdown через `MarkdownMessage.tsx` (блоки коду, таблиці, списки, посилання).
- Системний промпт береться зі спільної панелі конфігурації.
- Кількість токенів і вартість для кожного повідомлення (токени промпту та завершення).
- Повторне генерування останньої відповіді.
- Надсилає запити до `POST /v1/chat/completions` із потоковою передачею через SSE.

### Вкладка порівняння

Ключова перевага проксі: запуск одного промпту паралельно на щонайбільше **4 моделях**.

- До 4 стовпців, кожен із яких незалежно отримує потокові дані з `/v1/chat/completions`.
- Кнопка `+ Додати модель` (комбінація клавіш Cmd+K) для додавання стовпців.
- `Запустити всі ▶` одночасно запускає всі потоки за допомогою `Promise.all` та окремого `AbortController` для кожного стовпця.
- Глобальна кнопка **Скасувати всі** перериває кожен активний потік.
- `ProviderMetrics` у кожному стовпці показує TTFT, TPS, кількість токенів і приблизну вартість у реальному часі.
- Метрики позначено як **«оцінка на стороні клієнта»** (D12) — вимірювання починається з першого фрагмента SSE.

### Вкладка API

Повністю зберігає оригінальний редактор Monaco для досвідчених користувачів (D14):

- 10 кінцевих точок: завершення чату, завершення, вбудовування, зображення, аудіо, мовлення, транскрибування, модерація, повторне ранжування, пошук.
- Завантаження мультимодальних файлів.
- Потокова передача через SSE з виведенням у реальному часі.
- Обгорнуто в `ApiTab.tsx` (ліниве завантаження, `ssr: false`).

### Вкладка збірки

Інтерфейс для інструментів/виклику функцій і структурованого виведення:

- `ToolsBuilder.tsx` — додавання, редагування та видалення `tools[]` із редактором схеми JSON для кожного інструмента.
  Перевіряє параметри за допомогою `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — перемикач режиму JSON та редактор схеми JSON.
  Перевіряє відповідь за схемою за допомогою `StructuredOutputSchema` (Zod).
- Надсилає запит до `/v1/chat/completions` із `tools[]` та/або `response_format`.

---

## Панель конфігурації (спільна)

`StudioConfigPane.tsx` — завжди видима, можна згорнути.

| Поле             | Компонент             | Примітки                                                                                      |
| ---------------- | --------------------- | --------------------------------------------------------------------------------------------- |
| Кінцева точка    | `<select>`            | 10 варіантів, що відповідають `PlaygroundEndpoint`                                            |
| Модель           | `<input>`             | довільний текст, наприклад `openai/gpt-4o`                                                    |
| Системний промпт | `<textarea>`          | передається до всіх вкладок                                                                   |
| Параметри        | `ParamSliders`        | temperature, max_tokens, top_p, штрафи presence/frequency, seed, stop                         |
| Пресети          | `PresetPicker`        | завантаження/збереження іменованих знімків конфігурації (зберігаються в БД)                   |
| Покращити промпт | `ImprovePromptButton` | відкриває модальне вікно з попередженням про квоту, викликає `/api/playground/improve-prompt` |

Стан піднято до `PlaygroundStudio.tsx` і передано до всіх вкладок. Перемикання вкладок
зберігає стан конфігурації.

---

## Верхня панель

`StudioTopBar.tsx`:

- Перемикач вкладок (role="tablist").
- `TokenCostCounter` — відображення кількості токенів (↑/↓) і орієнтовної вартості в реальному часі.
- Кнопка експорту коду (`</>`) — відкриває `ExportCodeModal`.

---

## Модальне вікно експорту коду

`ExportCodeModal.tsx` використовує `codeExport.ts` для генерування фрагментів curl / Python / TypeScript
із поточного `PlaygroundState`. Заповнювач ключа API завжди має значення `$OMNIROUTE_API_KEY` (D11).

---

## Покращувач промптів

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. Модальне вікно попереджає, що операція «використає квоту».
2. Після підтвердження надсилає `{ system, prompt, model, tone }` до маршруту.
3. Маршрут внутрішньо викликає `/v1/chat/completions` із `promptImprover.META_SYSTEM_PROMPT`.
4. Повертає `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. Інтерфейс оновлює системний промпт панелі конфігурації та промпт користувача на вкладці чату.

---

## Пресети

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Зберігаються в таблиці SQLite `playground_presets` (міграція `084_playground_presets.sql`).
- Кожен пресет зберігає: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: список через `GET`, створення через `POST`, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Метрики потоку

`useStreamMetrics.ts` + `streamMetrics.ts` (чиста функція):

- `start()` — записує час початку запиту.
- `onFirstChunk()` — записує TTFT.
- `onChunk(n)` — накопичує кількість токенів завершення.
- `finish(usage?)` — обчислює підсумкові метрики: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Ціни зі статичної таблиці в `src/lib/playground/types.ts` (позначені як «орієнтовні» — D13).

---

## Серверні маршрути

| Метод    | Шлях                             | Обробник                                                                                                 |
| -------- | -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Перевіряє `ImprovePromptRequestSchema` за допомогою Zod; викликає `/v1/chat/completions` із метапромптом |
| `GET`    | `/api/playground/presets`        | Повертає `{ presets: PlaygroundPresetListItem[] }`                                                       |
| `POST`   | `/api/playground/presets`        | Створює пресет; перевіряє `PlaygroundPresetCreateSchema`                                                 |
| `GET`    | `/api/playground/presets/:id`    | Повертає один пресет або 404                                                                             |
| `PUT`    | `/api/playground/presets/:id`    | Часткове оновлення                                                                                       |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                                      |

Автентифікація: необов’язкова (`REQUIRE_API_KEY`). Помилки через `buildErrorBody()` (жорстке правило №12).

---

## Ключові файли

| Шлях                                                                       | Призначення                                         |
| -------------------------------------------------------------------------- | --------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Компонент-оболонка, координатор вкладок             |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Вкладки + лічильник + кнопка експорту               |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Спільна панель конфігурації                         |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Робоче середовище чату                              |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Порівняння кількох моделей                          |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Редактор Monaco (збережено)                         |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Інструменти + структурований вивід                  |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Модальне вікно експорту коду                        |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Окремий стовпець порівняння                         |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | Відображення TTFT/TPS                               |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Клієнтський хук метрик                              |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | Хук CRUD для наборів налаштувань                    |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Хук покращення промпту                              |
| `src/lib/playground/codeExport.ts`                                         | Генератор curl/Python/TS (спільний із Search Tools) |
| `src/lib/playground/promptImprover.ts`                                     | Конструктор метапромптів                            |
| `src/lib/playground/streamMetrics.ts`                                      | Чисте обчислення метрик                             |
| `src/lib/db/playgroundPresets.ts`                                          | Модуль БД (CRUD)                                    |
| `src/app/api/playground/improve-prompt/route.ts`                           | REST-маршрут покращення промпту                     |
| `src/app/api/playground/presets/route.ts`                                  | Отримання списку та створення наборів налаштувань   |
| `src/app/api/playground/presets/[id]/route.ts`                             | Отримання/оновлення/видалення наборів налаштувань   |
| `src/lib/db/migrations/084_playground_presets.sql`                         | Міграція БД                                         |

---

## Усунення несправностей

| Симптом                                          | Причина                                  | Виправлення                                                                                                 |
| ------------------------------------------------ | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Редактор Monaco не відображається на вкладці API | SSR завантажив Monaco                    | Переконайтеся, що `ApiTab` використовує `dynamic(..., { ssr: false })`                                      |
| Потоки порівняння запускаються послідовно        | Неправильне використання `Promise.all`   | Запуски всіх потоків мають бути ініційовані одним викликом `Promise.all`                                    |
| Метрики показують `null` для TTFT                | Обробник першого фрагмента не підключено | Перевірте, чи викликається `useStreamMetrics.onFirstChunk()` у циклі читання SSE                            |
| Попереднє налаштування не зберігається           | Міграцію БД не виконано                  | Виконайте `npm run db:migrate` або перезапустіть сервер (міграція запускається автоматично під час запуску) |
| Функція покращення запиту повертає 502           | Модель не задано в конфігурації          | Перед покращенням користувач має ввести назву моделі на панелі конфігурації                                 |
| Експортований код містить `MISSING_API_KEY`      | Заповнювач не вставлено                  | `codeExport.ts` завжди використовує `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                            |

---

## Посилання

- Основний план: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- План функції: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Експорт коду: `src/lib/playground/codeExport.ts`
- Покращувач запитів: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
