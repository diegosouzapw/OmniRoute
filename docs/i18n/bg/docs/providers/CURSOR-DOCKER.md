# Cursor Provider in Docker Environments (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Когато OmniRoute работи в Docker, наследените механизми **Импортиране от Cursor IDE** /
`cursor-agent` не работят, защото контейнерът не може да вижда инсталацията на Cursor
на хоста. Вместо това използвайте **Вход с Cursor** (deep-control PKCE).

## Защо импортирането от IDE / CLI не работи в Docker

1. **Изолация на файловата система** — Автоматичното импортиране търси Linux пътища като
   `~/.config/Cursor/User/globalStorage/state.vscdb` _вътре_ в контейнера.
   При Docker Desktop за macOS базата данни на IDE от хоста не се монтира по подразбиране, а
   операционната система на контейнера е Linux дори когато хостът е Darwin.
2. **Липсва изпълним файл `cursor-agent`** — Официалните образи на OmniRoute не включват
   `cursor-agent`. Преди това „Налични модели“ изпълняваше
   `cursor-agent --list-models` и при неуспех използваше статичен каталог.
3. **Неправилен изпълним файл** — **Не** монтирайте чрез bind mount версия на `cursor-agent` за macOS
   в Linux контейнер. Тя няма да може да бъде изпълнена.

## Препоръчително: Вход с Cursor

1. Отворете **Табло → Доставчици → Cursor**.
2. Изберете раздела **Вход с Cursor**.
3. Щракнете върху **Вход с Cursor** — OmniRoute отваря
   `https://cursor.com/loginDeepControl?…` във вашия **хост** браузър.
4. Одобрете влизането в браузъра, след което се върнете в таблото. OmniRoute
   проверява периодично `api2.cursor.sh/auth/poll`, докато получи токените.
5. OmniRoute съхранява токените за **достъп + опресняване** и ги опреснява чрез
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Този подход не изисква Cursor IDE или `cursor-agent` вътре в контейнера.

## Откриване на модели

При активна връзка с влязъл потребител **Налични модели / Автоматично синхронизиране** предпочита
HTTP каталога `AiService/AvailableModels` на Cursor, като използва bearer токена на връзката.
Ако това не успее, OmniRoute все пак опитва да използва `cursor-agent` на хоста (когато е наличен), а след това
началния набор от статичния регистър.

OmniRoute винаги предоставя **`auto`** в каталога (показвано като „Auto“), както и
режимите за маршрутизиране в стил OpenCodex **`auto-cost`**, **`auto-balance`** и
**`auto-intelligence`**. При предаването им те се преобразуват към модела `default` на Cursor
(с `optimization` ModelParameter за трите варианта). Предпочитайте
`cu/auto`, когато използването на премиум моделите е изчерпано — Auto често все още разполага с квота.

### Каталогът в реално време е единственият източник след синхронизиране

След успешно синхронизиране на моделите на Cursor (`cursor-agent --list-models` → запазен
синхронизиран каталог или удостовереното чрез bearer токен извличане на `AvailableModels` по-горе),
**таблото**, **`/v1/models`** и списъкът **Тестване на всички** съдържат:

1. Моделите, върнати от синхронизирането в реално време
2. Добавените идентификатори за автоматично маршрутизиране: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. **Персонализираните** модели на оператора (Импортиране / ръчно добавяне) — те никога не се премахват при синхронизиране

Големият статичен регистър в
`open-sse/config/providers/registry/cursor/` се използва **само като офлайн резервен вариант**. Когато
синхронизираният каталог е празен (или откриването е неуспешно), списъкът се попълва от този регистър.

Идентификаторите със суфикс за ниво на усилие (например `claude-4.6-sonnet-high`) все пак могат да бъдат
**заявявани** по време на изпълнение: `resolveRequestedModel` премахва суфикса и го преобразува в
`ModelParameter` за предаване. Единственият списък умишлено скрива тези статични варианти
от „Тестване на всички“, така че проверките да съответстват на това, което Cursor действително връща като налично.

### Помощни функции

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — обединяване за таблото
- `ensureCursorAutoCatalogEntry` — добавяне на auto* при откриване + извеждане на списъка
- `shouldSuppressStaticModelForExclusiveListing` — цикълът за статичните модели в `/v1/models`

## Ограничения на доставчика (квота)

**Използване → Ограничения на доставчика** за Cursor използва Bearer API в `api2.cursor.sh`
(`GetCurrentPeriodUsage` → обобщение на използването → auth/usage) след PKCE или импортиране на
токен. Наследеният механизъм чрез cookie/таблото на `cursor.com` остава последен резервен вариант
за по-стари сесии, импортирани от IDE.

Прозорците обикновено включват **Общо**, **Auto + Composer** и **API**. Ако
ограниченията изглеждат празни, изпълнете отново **Вход с Cursor** или импортирайте токените отново (вече
не е необходимо да се извършва само импортиране от IDE).

## Празни отговори / изчерпано използване

Когато Cursor приеме Run, но не върне текст от асистента (често когато използването
на премиум модели е изчерпано), OmniRoute показва приложима грешка **429** (индикации за квота) или
**502** с насоки — а не просто „Доставчикът върна празно съдържание“. Грешки при поточно предаване
като `not_found: AI Model Not Found` (изчерпан прозорец за използване) се
класифицират като **превишено ограничение за честота / използване на Cursor** и това съобщение се запазва
през целия SSE конвейер (споделената защита срещу празен поток не презаписва
вече изведена грешка). Проверете ограниченията на доставчика, опитайте модела **`auto`** или увеличете
ограниченията на плана в Cursor.

## Версия на клиента (без графичен интерфейс)

Без локална инсталация на `cursor-agent` OmniRoute определя
`x-cursor-client-version` чрез променливата на средата `CURSOR_AGENT_CLI_VERSION`, след това чрез
кеширано на диска извличане от инсталационния скрипт на Cursor и накрая чрез фиксиран идентификатор на компилация. При нужда
задайте изрично `CURSOR_AGENT_CLI_VERSION`.

## Резервен вариант: Ръчно импортиране на токен

Ако не можете да завършите влизането чрез браузъра:

1. На хоста извлечете токените от `state.vscdb` на Cursor:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Отворете **Импортиране на токен** в модалния прозорец за удостоверяване на Cursor.
3. Поставете **Токен за достъп** и, когато е наличен, **Токен за опресняване** (необходим за
   автоматично опресняване). Идентификаторът на машината не е задължителен.

Импортирането само на токен за достъп продължава да работи, но токенът ще изтече без токен за опресняване —
импортирайте го отново, когато чатът започне да връща грешки при удостоверяване.

## Свързани материали

- Указания за Zed в Docker: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Справка за влизане в Cursor чрез OpenCodex (външен ресурс):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
