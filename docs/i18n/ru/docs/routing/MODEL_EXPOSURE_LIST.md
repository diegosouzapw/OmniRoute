# Model Exposure Allow/Deny List (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇦 [bs](../../../bs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Функция включается явно и по умолчанию отключена (если `modelVisibilityAllowlist` и `modelVisibilityDenylist` пусты,
> каталог `/v1/models` И каждый пул кандидатов `auto/*` остаются побайтово идентичными). Это аналог
> `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`) для операторов, которым нужен курируемый
> список моделей по причинам, не связанным со стоимостью.

## Зачем это нужно

`hidePaidModels` отвечает на вопрос «эта модель бесплатна?», а `hideAutoCombos` — на вопрос «следует ли вообще
показывать виртуальные идентификаторы `auto/*`?» — но ни одна из этих настроек не позволяет оператору сформировать произвольное подмножество
моделей (например, показывать ровно те модели, которые должен видеть конкретный клиент Claude Code / OpenCode,
независимо от цен). #11481 добавляет такую возможность в виде двух независимых строковых массивов, активируемых явно.

## Настройки

| Ключ                       | Тип        | По умолчанию | Значение                                                                     |
| -------------------------- | ---------- | ------------ | ---------------------------------------------------------------------------- |
| `modelVisibilityDenylist`  | `string[]` | `[]`         | Записи, соответствующие кандидату, скрывают его из каталога/пула кандидатов. |
| `modelVisibilityAllowlist` | `string[]` | `[]`         | Если список не пуст, отображаются ТОЛЬКО соответствующие кандидаты.          |

Оба списка принимают до 500 записей длиной до 200 символов каждая (с проверкой Zod в
`src/shared/validation/settingsSchemas.ts`). Запись может быть:

- точным идентификатором из каталога — `"gpt-4o"` (идентификатор модели без префикса) или `"openai/gpt-4o"` (с префиксом провайдера), либо
- glob-шаблоном с `*`/`?` — например, `"openai/gpt-4*"` или `"anthropic/*"` — обрабатываемым тем же
  общим сопоставителем `globToRegex()` (`src/shared/utils/globPattern.ts`), который уже используется
  сопоставлениями комбинаций для отдельных моделей в `ModelRoutingSection` и `freeModels.ts::matchesOnlyPaidModels`.

Приоритет: сначала проверяется список запретов (запрещённая запись всегда скрыта, даже если она также
соответствует списку разрешений); если список разрешений не пуст, остаются только соответствующие ему записи.

## Две точки контроля, а не одна

Урок из #6512 (фильтр каталога только по `hidePaidModels` всё равно позволял `auto/*` направлять запрос к
платной модели, поскольку пул кандидатов комбинации формировался независимо) в полной мере применим и здесь.
Предикат сопоставления `isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`) вызывается в ОБОИХ местах:

- `src/app/api/v1/models/catalog.ts` — непосредственно в листинге `/v1/models`, в тех же 5 точках контроля для каждого источника,
  где уже применяется `shouldHidePaid()` (статические `PROVIDER_MODELS`, синхронизированные записи провайдеров,
  пользовательские записи, записи на основе псевдонимов, записи управляемого резервного варианта).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` — вызывается
  из `virtualFactory.ts::buildPreparedPool` сразу после аналогичного вызова
  `filterPaidOnlyCandidates()`, поэтому запрещённая модель также никогда не сможет попасть в пул кандидатов `auto/*`.

## Что НЕ фильтруется

Поведение соответствует существующему поведению `hideAutoCombos`: идентификатор модели, переданный **явно** (не через `auto/*`
и не найденный через каталог), никогда не блокируется при диспетчеризации — фильтруются только
отображение и членство в пуле кандидатов. Это не зависит от `hidePaidModels`;
оператору может понадобиться курируемый набор по причинам, не связанным со стоимостью, поэтому обе
настройки объединяются как независимые фильтры через логическое И, аналогично существующей композиции нескольких флагов в
`catalog.ts`.

Экспорт настроек (`GET /api/settings/export-json`) включает оба массива без изменений, как и любые другие
поля настроек. В отличие от фильтра экспорта шагов комбинации в `hidePaidModels`, здесь нет риска повторной гидратации:
запрещённый идентификатор, встроенный в экспортированный шаг комбинации, — это собственный явный выбор маршрутизации
оператора, а не то, что нужно удалять на границе экспорта.
