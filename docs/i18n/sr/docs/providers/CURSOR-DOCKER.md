# Cursor Provider in Docker Environments (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Када се OmniRoute покреће унутар Docker-а, застарели токови **Увоз из Cursor IDE-а** /
`cursor-agent` не функционишу јер контејнер не може да види Cursor инсталацију на хосту.
Уместо тога користите **Пријаву преко Cursor-а** (deep-control PKCE).

## Зашто увоз из IDE-а / CLI-ја не функционише у Docker-у

1. **Изолација система датотека** — Аутоматски увоз тражи Linux путање као што је
   `~/.config/Cursor/User/globalStorage/state.vscdb` _унутар_ контејнера.
   На Docker Desktop-у за macOS, база података IDE-а са хоста није подразумевано
   монтирана, а оперативни систем контејнера је Linux чак и када је хост Darwin.
2. **Нема бинарне датотеке `cursor-agent`** — Званичне OmniRoute слике не садрже
   `cursor-agent`. Доступни модели су раније позивали
   `cursor-agent --list-models` преко љуске и, у случају неуспеха, користили статички каталог.
3. **Погрешна бинарна датотека** — **Немојте** bind-монтирати macOS `cursor-agent`
   у Linux контејнер. Неће моћи да се изврши.

## Препоручено: Пријава преко Cursor-а

1. Отворите **Контролна табла → Провајдери → Cursor**.
2. Изаберите картицу **Пријава преко Cursor-а**.
3. Кликните на **Пријава преко Cursor-а** — OmniRoute отвара
   `https://cursor.com/loginDeepControl?…` у прегледачу на вашем **хосту**.
4. Одобрите пријаву у прегледачу, а затим се вратите на контролну таблу. OmniRoute
   проверава `api2.cursor.sh/auth/poll` док токени не стигну.
5. OmniRoute чува токене за **приступ + освежавање** и освежава их преко
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Овај начин не захтева Cursor IDE или `cursor-agent` унутар контејнера.

## Откривање модела

Када постоји пријављена веза, **Доступни модели / Аутоматска синхронизација** даје
предност Cursor-овом HTTP каталогу `AiService/AvailableModels`, користећи bearer
токен везе. Ако то не успе, OmniRoute и даље покушава да користи `cursor-agent`
са хоста (када је присутан), а затим статички почетни регистар.

OmniRoute увек излаже **`auto`** у каталогу (приказ „Аутоматски“), као и
OpenCodex стилове режима рутера **`auto-cost`**, **`auto-balance`** и
**`auto-intelligence`**. При преносу се они мапирају на Cursor-ов модел `default`
(са `optimization` ModelParameter параметром за три варијанте). Дајте предност
моделу `cu/auto` када је потрошена квота премијум модела — аутоматски режим често
и даље има расположиву квоту.

### Активни каталог је искључив након синхронизације

Након успешне синхронизације Cursor модела (`cursor-agent --list-models` → сачувани
синхронизовани каталог или горенаведено bearer-аутентификовано преузимање
`AvailableModels`), **контролна табла**, **`/v1/models`** и **Тестирај све** приказују:

1. Моделе које је вратила активна синхронизација
2. Додате ID-ове аутоматског рутера: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. **Прилагођене** моделе оператера (увоз / ручни унос) — синхронизација их никада не уклања

Велики статички регистар у
`open-sse/config/providers/registry/cursor/` служи **само као резервна опција ван мреже**. Када
је синхронизовани каталог празан (или откривање не успе), приказ се враћа на тај регистар.

ID-ови са суфиксом нивоа напора (на пример `claude-4.6-sonnet-high`) и даље могу
бити **затражени** током извршавања: `resolveRequestedModel` уклања суфикс и претвара
га у ModelParameter за пренос. Искључиви приказ намерно скрива те статичке варијанте
из опције Тестирај све, како би провере одговарале ономе што Cursor заиста враћа као доступно.

### Помоћне функције

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — спајање за контролну таблу
- `ensureCursorAutoCatalogEntry` — додавање auto* при откривању + приказивању
- `shouldSuppressStaticModelForExclusiveListing` — статичка петља за `/v1/models`

## Ограничења провајдера (квота)

**Потрошња → Ограничења провајдера** за Cursor користи Bearer API-је на `api2.cursor.sh`
(`GetCurrentPeriodUsage` → сажетак потрошње → auth/usage) након PKCE-а или увоза
токена. Застарела путања преко колачића/`cursor.com` контролне табле остаје последња
резервна опција за старије сесије увезене из IDE-а.

Прозори обично садрже **Укупно**, **Аутоматски + Composer** и **API**. Ако
ограничења делују празно, поново покрените **Пријаву преко Cursor-а** или поново
увезите токене (сам увоз из IDE-а више није неопходан).

## Празни одговори / потрошена квота

Када Cursor прихвати покретање, али не врати текст асистента (што је уобичајено
када је потрошена премијум квота), OmniRoute приказује употребљиву грешку **429**
(са назнакама о квоти) или **502** са смерницама — а не само „Провајдер је вратио
празан садржај“. Грешке при стримовању као што је
`not_found: AI Model Not Found` (исцрпљен период коришћења) класификују се као
**прекорачено Cursor ограничење брзине / потрошње** и та порука се задржава кроз
SSE ток (заједничка заштита од празног тока не замењује већ емитовану грешку).
Проверите Ограничења провајдера, испробајте модел **`auto`** или повећајте
ограничења Cursor плана.

## Верзија клијента (без графичког окружења)

Без локалне `cursor-agent` инсталације, OmniRoute одређује
`x-cursor-client-version` прво преко env променљиве `CURSOR_AGENT_CLI_VERSION`,
затим преко локално кешираног преузимања података из Cursor инсталационе скрипте,
а на крају преко фиксираног ID-а издања. По потреби поставите
`CURSOR_AGENT_CLI_VERSION` да бисте заменили вредност.

## Резервна опција: Ручни увоз токена

Ако не можете да довршите пријаву у прегледачу:

1. На хосту издвојте токене из Cursor-ове базе `state.vscdb`:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Отворите **Увоз токена** у Cursor модалном прозору за аутентификацију.
3. Налепите **приступни токен** и, када је доступан, **токен за освежавање**
   (неопходан за аутоматско освежавање). ID машине је опционалан.

Увози који садрже само приступни токен и даље функционишу, али ће токен истећи
без токена за освежавање — поново га увезите када ћаскање почне да враћа грешке
при аутентификацији.

## Повезано

- Zed смернице за Docker: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex референца за Cursor пријаву (спољна):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
