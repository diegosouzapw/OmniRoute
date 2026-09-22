# Providers — Claude Web (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` шаље захтеве за ћаскање у OpenAI формату путем аутентификоване `claude.ai`
сесије прегледача. Извршилац нормализује достављени колачић, разрешава једну аутентификовану
организацију, припрема стање разговора, бира директни транспорт или транспорт преко прегледача и
строго преводи узводни SSE одговор. Оркестрација се налази у
`open-sse/executors/claude-web.ts:320`.

> **Први пут користите добављаче засноване на веб-колачићима?**
>
> Прочитајте **`docs/getting-started/WEB-COOKIE-GUIDE.md`** за општи поступак подешавања, смернице за аутентификацију, ограничења и решавање проблема пре него што наставите са овим водичем специфичним за добављача.

### Каталог модела

Регистар добављача тренутно излаже тачно ових седам статичких ID-ова модела
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| ID модела                   | Приказани назив         |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (веб)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (веб)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (веб)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (веб)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (веб)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (веб)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (веб) |

Динамичко откривање модела није имплементирано за овог добављача. Горња листа је
каталог доступан током извршавања.

### Акредитиви и разрешавање организације

Доставите или цело Cookie заглавље за `claude.ai` или само вредност сесије. Самосталне вредности се
нормализују у `sessionKey`; остали колачићи се задржавају ако су достављени. Извршилац прихвата
колачић путем `cookie` или `apiKey` и
чита опционе вредности `deviceId` и `orgId` из података о вези
(`open-sse/executors/claude-web.ts:72`).

Ако `orgId` није присутан, извршилац позива `GET https://claude.ai/api/organizations` и користи прву
организацију коју врати аутентификована Claude Web сесија
(`open-sse/executors/claude-web.ts:141`). Извршавање се безбедно прекида када није враћена ниједна важећа организација,
одбијена ауторизација сесије пријављује се као 401, а Cloudflare
провера разликује се од неуспешне аутентификације.

### Операције над разговором

Опциони објекат највишег нивоа `claude_web` је строг. Непозната поља се одбијају. Његова
прихваћена поља дефинисана су у `open-sse/executors/claude-web/session.ts:50`:

| Поље                  | Значење                                                                 |
| --------------------- | ----------------------------------------------------------------------- |
| `operation`           | Подразумевано `completion`; користите `retry` за поновни покушај потеза |
| `conversation_id`     | Експлицитни UUID постојећег разговора                                   |
| `parent_message_uuid` | Експлицитни UUID надређене поруке асистента                             |
| `timezone`            | Важећи назив IANA временске зоне                                        |
| `locale`              | Структурно важећи локалитет                                             |
| `tool_states`         | Опциони низ стања алата налога, ограничен на 128 ставки                 |

Припремљени захтеви користе једну од две узводне крајње тачке
(`open-sse/executors/claude-web.ts:203`):

- Нови или наредни потез шаље се на
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Поновни покушај шаље се на
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Нови потез укључује `create_conversation_params`. Кеширани или експлицитно повезани наредни потез
укључује `parent_message_uuid` и изоставља `create_conversation_params`. Поновни покушај захтева и
стање разговора и стање надређене поруке и не шаље упит
(`open-sse/executors/claude-web/session.ts:254`). Нови разговори отварају аутентификовани
кориснички интерфејс на `/new`; кеширани или експлицитно повезани наредни потези отварају тачну страницу разговора
(`open-sse/executors/claude-web/session.ts:324`).

Стање разговора је кеш у меморији чији кључ чине опсег налога заснован на SHA-256 и канонски
транскрипт позиваоца. Ставке истичу након 30 минута, а кеш је ограничен на 5.000 ставки
(`open-sse/executors/claude-web/session.ts:12`). Стање се потврђује тек након што строги
парсер тока уочи `message_stop`; поновно покретање процеса га одбацује. При промашају кеша,
захтев са више порука серијализује се у један упит за опоравак уместо да се раније поруке
прећутно одбаце.

Локалитет и временска зона користе следећи редослед приоритета: вредност `claude_web` из захтева, вредност везе,
вредност окружења за извршавање, а затим `en-US` за локалитет или `UTC` за временску зону
(`open-sse/executors/claude-web/session.ts:218`).

### Алати и садржаји захтева

Директни захтеви трансформишу само структурно важеће OpenAI функционалне алате које је доставио
позивалац. Не постоји измишљена статичка подразумевана листа алата
(`open-sse/executors/claude-web/payload.ts:102`).

Захтеви из прегледача уместо тога пресрећу захтев аутентификованог корисничког интерфејса и задржавају његове алате налога,
стања алата и персонализоване стилове. Припремљена поља разговора, модела, резоновања, упита и
UUID-а поруке и даље замењују вредности из пресретнутог захтева
(`open-sse/executors/claude-web/browserTransport.ts:175`). Шаблони прегледача имају опсег одређен
хешом налога, организације, колачића, локалитета и временске зоне и истичу након 30 минута
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). Када директни захтев нема алате
позиваоца, може поново да употреби тај шаблон ограниченог опсега; експлицитни алати позиваоца имају приоритет
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### Избор транспорта

Подразумевана путања је `sendClaudeWebDirect()`, која позива `tlsFetchClaude()` са конфигурисаним
Chrome 146 профилом и достављеним колачићем (`open-sse/services/claudeTlsClient.ts:23`). Она не
покреће решавач нити генерише заменски колачић.

Подесите `WEB_COOKIE_USE_BROWSER` на `1`, `true` или `on` да би адаптер прегледача ограничен на налог постао примарни транспорт. Подесите `OMNIROUTE_BROWSER_POOL` на једну од истих вредности како бисте омогућили да се препознати Cloudflare 403 изазов пребаци са директног транспорта на адаптер прегледача (`open-sse/executors/claude-web.ts:195`). Друге HTTP грешке не покрећу ово пребацивање.

Адаптер прегледача чува колачиће унутар истог дељеног Playwright контекста, користи претходно описани хеширани кључ ограниченог опсега и шаље довршени одговор из тог контекста (`open-sse/executors/claude-web/browserTransport.ts:444`). Он никада не извози колачић који је прегледач добио решавањем изазова у директни TLS клијент. Поновни покушаји преко прегледача захтевају UI шаблон који није истекао и који је повезан са истим стварним Playwright контекстом (`open-sse/executors/claude-web/browserTransport.ts:467`). Одговори прегледача се читају постепено на аутентификованој страници, поштују отказивање захтева и отказују узводно тело чим премаши 16 MiB (`open-sse/executors/claude-web/browserTransport.ts:259`).

Извршилац враћа редиговану пројекцију за ревизију дељеном евидентичару захтева: UUID-ови организације, разговора и порука, текст упита, дефиниције алата, колачићи и идентификатори уређаја су изузети (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Транспортни изузеци такође враћају генеричку грешку везе уместо поруке избаченог изузетка.

### Понашање SSE-а

`createClaudeWebResponse()` обрађује уоквиривање помоћу LF или CRLF и вишелинијска `data:` поља. Мапира делте текста на `content`, делте размишљања на `reasoning_content`, а познате догађаје метаподатака на проширење одговора `claude_web`. Сваки догађај метаподатака пројектује се кроз сопствену листу дозвољених поља (`open-sse/executors/claude-web/stream.ts:37`). Метаподаци разговора, родитељске поруке, поруке асистента и операције такође се враћају у `X-OmniRoute-Claude-Web-*` заглављима (`open-sse/executors/claude-web/stream.ts:364`).

Парсер безбедно прекида обраду у случају неисправног JSON-а, узводних `error` догађаја, непознатих типова догађаја, неважећег редоследа, неподударања блокова садржаја или EOF-а пре `message_stop`. Стримовани излаз емитује један завршни фрагмент и један `[DONE]`; баферовани излаз користи исти парсер. Парсер третира `message_stop` као терминални догађај одмах, отказује преостале узводне податке и преноси низводно отказивање до узводног читача (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Незавршене SSE линије и акумулирани догађаји ограничени су на 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Датотеке

| Датотека                                                 | Намена                                   |
| -------------------------------------------------------- | ---------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Статички регистар модела добављача       |
| `open-sse/executors/claude-web.ts`                       | Оркестрација извршиоца                   |
| `open-sse/executors/claude-web/payload.ts`               | Трансформација корисног садржаја и алата |
| `open-sse/executors/claude-web/session.ts`               | Стање потеза и кеш транскрипта           |
| `open-sse/executors/claude-web/transport.ts`             | Адаптер директног транспорта             |
| `open-sse/executors/claude-web/browserTransport.ts`      | Адаптер прегледача ограничен на налог    |
| `open-sse/executors/claude-web/stream.ts`                | Строго превођење SSE-а                   |
| `open-sse/services/claudeTlsClient.ts`                   | Изворни TLS транспорт                    |
| `open-sse/services/browserPool.ts`                       | Дељени Playwright контексти              |

### Тестирање

Покрените детерминистички Claude Web пакет тестова без стварних акредитива:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Случајеви који зависе од Playwright-а у `tests/unit/claude-web-auto-refresh.test.ts` изричито су прескочени. Ово складиште тренутно не дефинише скрипту за тестирање Claude Web-а уживо са акредитивима, тако да ти прескочени случајеви нису доказ понашања током извршавања.

### Подешавање

1. Покрените OmniRoute помоћу `npm run dev` или из изграђене инсталације.
2. Отворите Контролну таблу → Добављачи → Додај добављача.
3. Изаберите категорију Веб-колачић, а затим Claude Web.
4. Налепите цело Cookie заглавље копирано из аутентификованог `claude.ai` захтева.
