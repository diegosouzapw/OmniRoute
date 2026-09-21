# Playground Studio (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Функционалност:** Playground Studio — унифицирано работно пространство за тестване с AI за `/dashboard/playground`.
> **Планове:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Състояние:** Пуснато във v3.8.6

---

## Общ преглед

Playground Studio преобразява `/dashboard/playground` от обикновен редактор, базиран на Monaco, в
пълнофункционално работно пространство за тестване. Той заменя наследения `page.tsx` с обвивка `PlaygroundStudio`,
която визуализира четири раздела и споделен панел за конфигурация.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Чат] [⚖ Сравнение] [{} API] [🔧 Създаване] 142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {съдържание на активния раздел}         │ ─ Конфигурация            │
│                                          │ Крайна точка [чат ∨]      │
│                                          │ Модел       [gpt-5.4 ∨]   │
│                                          │ Система     [текстово поле]│
│                                          │ Температура ▕▕▔▔ 0.7      │
│                                          │ Шаблони [▾ зареди][запази]│
│                                          │ [✨ Подобри подканата]     │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Раздели

### Раздел „Чат“

Разширява `ChatPlayground.tsx` до работна среда за многоходов стрийминг:

- Пълно визуализиране на markdown чрез `MarkdownMessage.tsx` (кодови блокове, таблици, списъци, връзки).
- Системна подкана, извлечена от споделения панел за конфигурация.
- Токени/цена за всяко съобщение (токени на подканата + токени на отговора).
- Повторно генериране на последния отговор.
- Изпраща към `POST /v1/chat/completions` със SSE стрийминг.

### Раздел „Сравнение“

Ключовото предимство за прокси: изпълнение на 1 подкана паралелно с до **4 модела**.

- До 4 колони, всяка от които стриймва независимо от `/v1/chat/completions`.
- Бутон `+ Добавяне на модел` (клавишна комбинация Cmd+K) за добавяне на колони.
- `Изпълнение на всички ▶` задейства всички потоци едновременно чрез `Promise.all` + отделен `AbortController` за всяка колона.
- Глобалното действие **Отмяна на всички** прекратява всеки активен поток.
- `ProviderMetrics` за всяка колона показва TTFT, TPS, токени и прогнозна цена в реално време.
- Метриките са обозначени като **„оценка от страна на клиента“** (D12) — измерени от първия SSE фрагмент.

### Раздел „API“

Запазва 100% от оригиналния редактор Monaco за напреднали потребители (D14):

- 10 крайни точки: завършвания на чат, завършвания, вграждания, изображения, аудио, реч, транскрипции, модериране, пренареждане, търсене.
- Качване на мултимодални файлове.
- SSE стрийминг с изход в реално време.
- Обвито като `ApiTab.tsx` (отложено зареждане, `ssr: false`).

### Раздел „Създаване“

Потребителски интерфейс за извикване на инструменти/функции и структуриран изход:

- `ToolsBuilder.tsx` — добавяне/редактиране/премахване на `tools[]` с редактор на JSON схема за всеки инструмент.
  Валидира параметрите чрез `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — превключване на JSON режим + редактор на JSON схема.
  Валидира отговора спрямо схемата чрез `StructuredOutputSchema` (Zod).
- Изпраща заявка към `/v1/chat/completions` с `tools[]` и/или `response_format`.

---

## Панел за конфигурация (споделен)

`StudioConfigPane.tsx` — винаги видим, със свиваема секция.

| Поле                  | Компонент             | Бележки                                                                                       |
| --------------------- | --------------------- | --------------------------------------------------------------------------------------------- |
| Крайна точка          | `<select>`            | 10 опции, съответстващи на `PlaygroundEndpoint`                                               |
| Модел                 | `<input>`             | свободен текст, напр. `openai/gpt-4o`                                                         |
| Системна инструкция   | `<textarea>`          | подава се към всички раздели                                                                  |
| Параметри             | `ParamSliders`        | temperature, max_tokens, top_p, presence/frequency penalty, seed, stop                        |
| Предварителни набори  | `PresetPicker`        | зареждане/запазване на именувани снимки на конфигурацията (съхранявани в БД)                  |
| Подобряване на заявка | `ImprovePromptButton` | отваря модален прозорец с предупреждение за квотата, извиква `/api/playground/improve-prompt` |

Състоянието е изнесено в `PlaygroundStudio.tsx` и се предава на всички раздели. Превключването между разделите
запазва състоянието на конфигурацията.

---

## Горна лента

`StudioTopBar.tsx`:

- Превключвател на раздели (role="tablist").
- `TokenCostCounter` — показване в реално време на токените (↑/↓) и прогнозната цена.
- Бутон за експортиране на код (`</>`) — отваря `ExportCodeModal`.

---

## Модален прозорец за експортиране на код

`ExportCodeModal.tsx` използва `codeExport.ts`, за да генерира curl / Python / TypeScript фрагменти
от текущия `PlaygroundState`. Заместителят за API ключ винаги е `$OMNIROUTE_API_KEY` (D11).

---

## Подобряване на заявки

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. Модалният прозорец предупреждава, че операцията „ще използва квота“.
2. При потвърждение изпраща `{ system, prompt, model, tone }` към маршрута.
3. Маршрутът извиква вътрешно `/v1/chat/completions` с `promptImprover.META_SYSTEM_PROMPT`.
4. Връща `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. Потребителският интерфейс актуализира системната инструкция в панела за конфигурация и потребителската заявка в раздела за чат.

---

## Предварителни набори

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Съхраняват се в SQLite таблицата `playground_presets` (миграция `084_playground_presets.sql`).
- Всеки предварителен набор съхранява: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: списък чрез `GET`, създаване чрез `POST`, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Метрики за потока

`useStreamMetrics.ts` + `streamMetrics.ts` (чиста функция):

- `start()` — записва началния час на заявката.
- `onFirstChunk()` — записва TTFT.
- `onChunk(n)` — натрупва броя на токените в отговора.
- `finish(usage?)` — изчислява крайните метрики: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Ценообразуването е от статичната таблица в `src/lib/playground/types.ts` (обозначено като „прогнозно“ — D13).

---

## Бекенд маршрути

| Метод    | Път                              | Обработчик                                                                                      |
| -------- | -------------------------------- | ----------------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Валидира `ImprovePromptRequestSchema` чрез Zod; извиква `/v1/chat/completions` с метаинструкция |
| `GET`    | `/api/playground/presets`        | Връща `{ presets: PlaygroundPresetListItem[] }`                                                 |
| `POST`   | `/api/playground/presets`        | Създава предварителен набор; валидира `PlaygroundPresetCreateSchema`                            |
| `GET`    | `/api/playground/presets/:id`    | Връща един предварителен набор или 404                                                          |
| `PUT`    | `/api/playground/presets/:id`    | Частично актуализиране                                                                          |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                             |

Удостоверяване: незадължително (`REQUIRE_API_KEY`). Грешките се обработват чрез `buildErrorBody()` (Строго правило №12).

---

## Ключови файлове

| Път                                                                        | Предназначение                                                    |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Основен компонент, управляващ разделите                           |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Раздели + брояч + бутон за експортиране                           |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Споделен панел за конфигурация                                    |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Работна среда за чат                                              |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Сравнение на множество модели                                     |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Редактор Monaco (запазен)                                         |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Инструменти + структуриран изход                                  |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Модален прозорец за експортиране на код                           |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Отделна колона за сравнение                                       |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | Показване на TTFT/TPS                                             |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Клиентска кука за метрики                                         |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | CRUD кука за предварително зададени настройки                     |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Кука за подобряване на подкани                                    |
| `src/lib/playground/codeExport.ts`                                         | Генератор за curl/Python/TS (споделен с инструментите за търсене) |
| `src/lib/playground/promptImprover.ts`                                     | Конструктор на мета-подкани                                       |
| `src/lib/playground/streamMetrics.ts`                                      | Чисто изчисляване на метрики                                      |
| `src/lib/db/playgroundPresets.ts`                                          | Модул за базата данни (CRUD)                                      |
| `src/app/api/playground/improve-prompt/route.ts`                           | REST маршрут за подобряване на подкани                            |
| `src/app/api/playground/presets/route.ts`                                  | Извеждане на списък и създаване на предварителни настройки        |
| `src/app/api/playground/presets/[id]/route.ts`                             | Получаване/актуализиране/изтриване на предварителни настройки     |
| `src/lib/db/migrations/084_playground_presets.sql`                         | Миграция на базата данни                                          |

---

## Отстраняване на неизправности

| Симптом                                           | Причина                                      | Решение                                                                                                       |
| ------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Редакторът Monaco не се визуализира в раздела API | SSR е заредил Monaco                         | Уверете се, че `ApiTab` използва `dynamic(..., { ssr: false })`                                               |
| Потоците за сравнение се стартират последователно | Неправилно използване на `Promise.all`       | Всички потоци трябва да бъдат стартирани в едно извикване на `Promise.all`                                    |
| Метриките показват `null` за TTFT                 | Обработчикът на първия фрагмент не е свързан | Проверете дали `useStreamMetrics.onFirstChunk()` се извиква в цикъла на SSE четеца                            |
| Предварителната настройка не се запазва           | Миграцията на БД не е изпълнена              | Изпълнете `npm run db:migrate` или рестартирайте сървъра (миграцията се изпълнява автоматично при стартиране) |
| Подобряването на подканата връща 502              | Моделът не е зададен в конфигурацията        | Потребителят трябва да въведе име на модел в панела за конфигурация преди подобряването                       |
| Експортираният код показва `MISSING_API_KEY`      | Заместващият текст не е вмъкнат              | `codeExport.ts` винаги използва `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                                  |

---

## Препратки

- Основен план: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- План на функционалността: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Експортиране на код: `src/lib/playground/codeExport.ts`
- Подобрител на подкани: `src/lib/playground/promptImprover.ts`
- Студио за инструменти за търсене: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
