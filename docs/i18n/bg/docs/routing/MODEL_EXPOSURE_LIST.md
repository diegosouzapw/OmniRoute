# Model Exposure Allow/Deny List (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Избираема функционалност, изключена по подразбиране (когато `modelVisibilityAllowlist`/`modelVisibilityDenylist` са празни,
> каталогът `/v1/models` И всеки набор от кандидати `auto/*` остават байт по байт идентични). Сродна настройка на
> `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`) за оператори, които искат подбран
> списък с модели по причини, които нямат нищо общо с цената.

## Защо съществува това

`hidePaidModels` отговаря на „безплатен ли е този модел?“, а `hideAutoCombos` отговаря на „трябва ли
виртуалните идентификатори `auto/*` изобщо да бъдат показвани?“ — нито една от двете настройки не позволява на оператор
да подбере произволно подмножество от модели (например да показва точно моделите, които даден клиент на Claude Code / OpenCode трябва да вижда,
независимо от ценообразуването). #11481 добавя тази възможност чрез две независими, избираеми настройки от тип масив от низове.

## Настройки

| Ключ                       | Тип        | По подразбиране | Значение                                                                    |
| -------------------------- | ---------- | --------------- | --------------------------------------------------------------------------- |
| `modelVisibilityDenylist`  | `string[]` | `[]`            | Записите, съвпадащи с кандидат, го скриват от каталога/набора от кандидати. |
| `modelVisibilityAllowlist` | `string[]` | `[]`            | Когато не е празен, се показват САМО кандидатите, съвпадащи със записите.   |

И двете приемат до 500 записа с дължина до 200 знака всеки (валидирани със Zod в
`src/shared/validation/settingsSchemas.ts`). Един запис може да бъде:

- точен идентификатор от каталога — `"gpt-4o"` (идентификатор само на модела) или `"openai/gpt-4o"` (с префикс на доставчика), или
- glob шаблон, използващ `*`/`?` — например `"openai/gpt-4*"` или `"anthropic/*"` — обработван чрез
  същия споделен съпоставител `globToRegex()` (`src/shared/utils/globPattern.ts`), който вече се използва от
  съпоставянията на комбинации за отделни модели в `ModelRoutingSection` и от `freeModels.ts::matchesOnlyPaidModels`.

Приоритет: списъкът със забранени модели се проверява първи (забранен запис винаги се скрива дори ако
съвпада и със списъка с разрешени модели); когато списъкът с разрешени модели не е празен, остават само записите, с които той съвпада.

## Две контролни точки, не една

Поуката от #6512 (филтър само на каталога чрез `hidePaidModels` все пак позволяваше на `auto/*` да маршрутизира към
платен модел, тъй като наборът от кандидати за комбинацията се създаваше независимо) важи по същия начин и тук.
Предикатът за съпоставяне `isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`) се
извиква и от ДВЕТЕ места:

- `src/app/api/v1/models/catalog.ts` — самият списък `/v1/models`, в същите 5 контролни точки за отделните източници,
  които `shouldHidePaid()` вече ограничава (статични `PROVIDER_MODELS`, синхронизирани редове на доставчици,
  персонализирани редове, редове, базирани на псевдоними, редове за управляван резервен вариант).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` — извиква се
  от `virtualFactory.ts::buildPreparedPool` непосредствено след еквивалентното извикване на
  `filterPaidOnlyCandidates()`, така че забранен модел никога да не може да бъде избран и в набор от кандидати
  `auto/*`.

## Какво НЕ се филтрира

Следва съществуващото поведение на `hideAutoCombos`: идентификатор на модел, изпратен **изрично** (не чрез `auto/*`
и не открит чрез списъка на каталога), никога не се блокира при изпращане — филтрират се само
показването и членството в набора от кандидати. Това е независимо от `hidePaidModels`;
оператор може да иска подбран набор по причини, които нямат нищо общо с цената, затова двете
настройки се комбинират като независими филтри, свързани с логическо И, по същия начин като съществуващото комбиниране на множество флагове в
`catalog.ts`.

Експортирането на настройките (`GET /api/settings/export-json`) включва и двата масива дословно, както всяко друго
поле с настройки — за разлика от филтъра на стъпки в комбинации на `hidePaidModels` при експортиране, тук няма риск
при повторно зареждане: забранен идентификатор, вграден в експортирана стъпка на комбинация, е изричен избор за маршрутизиране
на самия оператор, а не нещо, което трябва да бъде премахнато на границата на експортирането.
