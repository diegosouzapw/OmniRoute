# Model Exposure Allow/Deny List (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Функція вмикається за бажанням і за замовчуванням вимкнена (якщо `modelVisibilityAllowlist` і `modelVisibilityDenylist` порожні,
> каталог `/v1/models` ТА кожен пул кандидатів `auto/*` залишаються побайтово ідентичними). Це споріднена функція
> для `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`), призначена для операторів, які хочуть мати
> ретельно підібраний список моделей із причин, не пов’язаних із вартістю.

## Навіщо це потрібно

`hidePaidModels` відповідає на запитання «чи є ця модель безкоштовною?», а `hideAutoCombos` — «чи потрібно взагалі
показувати віртуальні ідентифікатори `auto/*`?» — жоден із цих параметрів не дає оператору змоги сформувати довільну підмножину
моделей (наприклад, показувати саме ті моделі, які має бачити певний клієнт Claude Code / OpenCode,
незалежно від ціни). #11481 додає цю можливість у вигляді двох незалежних налаштувань із масивами рядків, які вмикаються за бажанням.

## Налаштування

| Ключ                       | Тип        | Значення за замовчуванням | Значення                                                                                   |
| -------------------------- | ---------- | ------------------------- | ------------------------------------------------------------------------------------------ |
| `modelVisibilityDenylist`  | `string[]` | `[]`                      | Записи, що відповідають кандидату, приховують його з каталогу/пулу кандидатів.             |
| `modelVisibilityAllowlist` | `string[]` | `[]`                      | Якщо список непорожній, видимими залишаються ЛИШЕ кандидати, що відповідають його записам. |

Обидва параметри приймають до 500 записів завдовжки до 200 символів кожен (із валідацією Zod у
`src/shared/validation/settingsSchemas.ts`). Запис може бути:

- точним ідентифікатором у каталозі — `"gpt-4o"` (ідентифікатор моделі без префікса) або `"openai/gpt-4o"` (із префіксом постачальника), або
- glob-шаблоном із використанням `*`/`?` — наприклад, `"openai/gpt-4*"` або `"anthropic/*"` — що зіставляється
  за допомогою того самого спільного механізму `globToRegex()` (`src/shared/utils/globPattern.ts`), який уже використовується
  зіставленнями комбінацій для окремих моделей у `ModelRoutingSection` та `freeModels.ts::matchesOnlyPaidModels`.

Пріоритет: спочатку перевіряється список заборон (заборонений запис завжди приховується, навіть якщо він також
відповідає списку дозволів); якщо список дозволів непорожній, залишаються лише записи, що йому відповідають.

## Дві контрольні точки, а не одна

Урок із #6512 (фільтр каталогу лише за `hidePaidModels` усе одно дозволяв `auto/*` маршрутизувати запит до
платної моделі, оскільки пул кандидатів комбінації створювався окремо) так само застосовний і тут.
Предикат зіставлення `isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`)
викликається в ОБОХ місцях:

- `src/app/api/v1/models/catalog.ts` — безпосередньо в списку `/v1/models`, у тих самих 5 контрольних точках для кожного джерела,
  які вже обмежує `shouldHidePaid()` (статичні `PROVIDER_MODELS`, синхронізовані записи постачальників,
  користувацькі записи, записи на основі псевдонімів, записи керованого резервного варіанта).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` — викликається
  з `virtualFactory.ts::buildPreparedPool` одразу після еквівалентного виклику
  `filterPaidOnlyCandidates()`, тож заборонену модель також ніколи не можна вибрати до пулу кандидатів
  `auto/*`.

## Що НЕ фільтрується

Відповідно до наявної поведінки `hideAutoCombos`: ідентифікатор моделі, надісланий **явно** (не через `auto/*`
і не знайдений через список каталогу), ніколи не блокується під час диспетчеризації — фільтрується лише
видимість/належність до пулу кандидатів. Це не залежить від `hidePaidModels`;
оператору може знадобитися ретельно підібраний набір із причин, не пов’язаних із вартістю, тому обидва
налаштування поєднуються як незалежні фільтри за логічним І, подібно до наявної композиції кількох прапорців у
`catalog.ts`.

Експорт налаштувань (`GET /api/settings/export-json`) містить обидва масиви без змін, як і будь-яке інше
поле налаштувань — на відміну від фільтра експорту кроків комбінації `hidePaidModels`, тут немає ризику
повторного відновлення стану: заборонений ідентифікатор, вбудований в експортований крок комбінації, є власним явним вибором маршрутизації
оператора, а не тим, що потрібно вилучати на межі експорту.
