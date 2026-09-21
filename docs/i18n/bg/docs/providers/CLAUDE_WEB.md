# Providers — Claude Web (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` изпраща заявки за чат във формат OpenAI чрез удостоверена браузърна сесия в `claude.ai`. Изпълнителят нормализира предоставената бисквитка, определя една удостоверена организация, подготвя състоянието на разговора, избира директен или браузърен транспорт и стриктно преобразува SSE отговора от услугата нагоре по веригата. Оркестрацията се намира в `open-sse/executors/claude-web.ts:320`.

> **Не сте работили с доставчици, използващи уеб бисквитки?**
>
> Прочетете **`docs/getting-started/WEB-COOKIE-GUIDE.md`** за общия процес на настройване, указанията за удостоверяване, ограниченията и отстраняването на неизправности, преди да продължите с това ръководство за конкретния доставчик.

### Каталог с модели

Регистърът на доставчика в момента предоставя точно тези седем статични идентификатора на модели (`open-sse/config/providers/registry/claude/web/index.ts:11`):

| Идентификатор на модел      | Показвано име           |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (уеб)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (уеб)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (уеб)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (уеб)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (уеб)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (уеб)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (уеб) |

Динамичното откриване на модели не е реализирано за този доставчик. Списъкът по-горе е каталогът по време на изпълнение.

### Идентификационни данни и определяне на организацията

Предоставете или пълната заглавка Cookie за `claude.ai`, или само стойност на сесията. Самостоятелните стойности се нормализират до `sessionKey`; ако са предоставени други бисквитки, те се запазват. Изпълнителят приема бисквитката чрез `cookie` или `apiKey` и прочита незадължителните стойности `deviceId` и `orgId` от данните за връзката (`open-sse/executors/claude-web.ts:72`).

Ако `orgId` липсва, изпълнителят извиква `GET https://claude.ai/api/organizations` и използва първата организация, върната от удостоверената сесия в Claude Web (`open-sse/executors/claude-web.ts:141`). Той прекратява безопасно при липса на валидна организация, отчита отхвърленото удостоверяване на сесията като 401 и разграничава проверка от Cloudflare от неуспешно удостоверяване.

### Операции с разговори

Незадължителният обект `claude_web` от най-високо ниво е строг. Неизвестните полета се отхвърлят. Приеманите от него полета са дефинирани в `open-sse/executors/claude-web/session.ts:50`:

| Поле                  | Значение                                                             |
| --------------------- | -------------------------------------------------------------------- |
| `operation`           | По подразбиране е `completion`; използвайте `retry` за повторен опит |
| `conversation_id`     | Изричен UUID за съществуващ разговор                                 |
| `parent_message_uuid` | Изричен UUID за родителското съобщение на асистента                  |
| `timezone`            | Валидно име на часова зона по IANA                                   |
| `locale`              | Структурно валидна локализация                                       |
| `tool_states`         | Незадължителен масив със състояния на инструментите, до 128 записа   |

Подготвените заявки използват една от две крайни точки нагоре по веригата (`open-sse/executors/claude-web.ts:203`):

- Нов или последващ ход изпраща заявка до
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Повторен опит изпраща заявка до
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Новият ход включва `create_conversation_params`. Кеширан или изрично свързан последващ ход включва `parent_message_uuid` и пропуска `create_conversation_params`. Повторният опит изисква както състояние на разговора, така и състояние на родителското съобщение, и не изпраща подкана (`open-sse/executors/claude-web/session.ts:254`). Новите разговори отварят удостоверения потребителски интерфейс на `/new`; кешираните или изрично свързани последващи ходове отварят точната страница на разговора (`open-sse/executors/claude-web/session.ts:324`).

Състоянието на разговора представлява кеш в паметта, индексиран чрез SHA-256 обхват на акаунта и каноничния препис на извикващата страна. Записите изтичат след 30 минути, а кешът е ограничен до 5 000 записа (`open-sse/executors/claude-web/session.ts:12`). Състоянието се записва само след като строгият анализатор на потока открие `message_stop`; рестартирането на процеса го изтрива. При пропуск в кеша заявка с множество съобщения се сериализира в една подкана за възстановяване, вместо по-ранните съобщения да бъдат безшумно отхвърлени.

Локализацията и часовата зона използват следния приоритет: стойност от `claude_web` в заявката, стойност на връзката, стойност на средата на изпълнение, след което `en-US` за локализацията или `UTC` за часовата зона (`open-sse/executors/claude-web/session.ts:218`).

### Инструменти и съдържание на заявките

Директните заявки преобразуват само структурно валидни OpenAI функционални инструменти, предоставени от извикващата страна. Не се създава изкуствен статичен списък с инструменти по подразбиране (`open-sse/executors/claude-web/payload.ts:102`).

Вместо това браузърните заявки прихващат удостоверената заявка на потребителския интерфейс и запазват нейните инструменти за акаунта, състояния на инструментите и персонализирани стилове. Подготвените полета за разговор, модел, разсъждение, подкана и UUID на съобщението все пак заменят стойностите в прихванатата заявка (`open-sse/executors/claude-web/browserTransport.ts:175`). Обхватът на браузърните шаблони се определя чрез хеш на акаунта, организацията, бисквитката, локализацията и часовата зона, а шаблоните изтичат след 30 минути (`open-sse/executors/claude-web/browserTransport.ts:11`, `open-sse/executors/claude-web/browserTransport.ts:158`). Когато директна заявка не съдържа инструменти от извикващата страна, тя може да използва повторно този шаблон с определен обхват; изрично зададените от извикващата страна инструменти са с предимство (`open-sse/executors/claude-web/browserTransport.ts:214`).

### Избор на транспорт

Пътят по подразбиране е `sendClaudeWebDirect()`, който извиква `tlsFetchClaude()` с конфигурирания профил Chrome 146 и предоставената бисквитка (`open-sse/services/claudeTlsClient.ts:23`). Той не стартира инструмент за заобикаляне на проверки и не създава заместваща бисквитка.

Задайте `WEB_COOKIE_USE_BROWSER` на `1`, `true` или `on`, за да направите браузърния адаптер с обхват до акаунта основен транспорт. Задайте `OMNIROUTE_BROWSER_POOL` на една от същите стойности, за да позволите при разпознато Cloudflare 403 предизвикателство директният транспорт да премине към браузърния адаптер (`open-sse/executors/claude-web.ts:195`). Други HTTP грешки не задействат това резервно преминаване.

Браузърният адаптер съхранява бисквитките в същия обединен Playwright контекст, използва описания по-горе хеширан ключ с ограничен обхват и изпраща завършения отговор от този контекст (`open-sse/executors/claude-web/browserTransport.ts:444`). Той никога не експортира разрешена от браузъра бисквитка към директния TLS клиент. Повторните опити през браузъра изискват неизтекъл UI шаблон, обвързан със същия действителен Playwright контекст (`open-sse/executors/claude-web/browserTransport.ts:467`). Отговорите от браузъра се четат поетапно в удостоверената страница, спазват отмяната на заявката и отменят входящото тяло веднага щом то надвиши 16 MiB (`open-sse/executors/claude-web/browserTransport.ts:259`).

Изпълнителят връща редактирана одитна проекция към споделения регистратор на заявки: UUID идентификаторите на организацията, разговора и съобщенията, текстът на подканата, дефинициите на инструментите, бисквитките и идентификаторите на устройствата са изключени (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Изключенията на транспорта също връщат обща грешка при свързване вместо съобщението на възникналото изключение.

### Поведение на SSE

`createClaudeWebResponse()` обработва рамкиране с LF или CRLF и многоредови полета `data:`. Тя преобразува текстовите делти в `content`, делтите на разсъжденията в `reasoning_content`, а известните събития с метаданни — в разширението на отговора `claude_web`. Всяко събитие с метаданни се проектира чрез собствен списък с разрешени полета (`open-sse/executors/claude-web/stream.ts:37`). Метаданните за разговора, родителското съобщение, съобщението на асистента и операцията също се връщат в заглавки `X-OmniRoute-Claude-Web-*` (`open-sse/executors/claude-web/stream.ts:364`).

Анализаторът прекратява обработката при неправилно форматиран JSON, входящи събития `error`, неизвестни типове събития, невалидна последователност, несъответствия в блоковете със съдържание или EOF преди `message_stop`. Поточното извеждане генерира един завършващ фрагмент и един `[DONE]`; буферираното извеждане използва същия анализатор. Анализаторът третира `message_stop` като незабавно крайно събитие, отменя последващите входящи данни и предава отмяната от получателя към входящия четец (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Незавършените SSE редове и натрупаните събития са ограничени до 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Файлове

| Файл                                                     | Предназначение                                  |
| -------------------------------------------------------- | ----------------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Статичен регистър на модели на доставчик        |
| `open-sse/executors/claude-web.ts`                       | Оркестрация на изпълнителя                      |
| `open-sse/executors/claude-web/payload.ts`               | Трансформация на полезния товар и инструментите |
| `open-sse/executors/claude-web/session.ts`               | Състояние на хода и кеш на транскрипта          |
| `open-sse/executors/claude-web/transport.ts`             | Адаптер за директен транспорт                   |
| `open-sse/executors/claude-web/browserTransport.ts`      | Браузърен адаптер с обхват до акаунта           |
| `open-sse/executors/claude-web/stream.ts`                | Строго преобразуване на SSE                     |
| `open-sse/services/claudeTlsClient.ts`                   | Нативен TLS транспорт                           |
| `open-sse/services/browserPool.ts`                       | Обединени Playwright контексти                  |

### Тестване

Изпълнете детерминистичния набор от тестове на Claude Web без реални идентификационни данни:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Зависещите от Playwright случаи в `tests/unit/claude-web-auto-refresh.test.ts` са изрично пропуснати. Понастоящем това хранилище не дефинира скрипт за тестове на Claude Web в реална среда с идентификационни данни, така че тези пропуснати случаи не представляват доказателство за работата по време на изпълнение.

### Настройване

1. Стартирайте OmniRoute с `npm run dev` или от изградена инсталация.
2. Отворете Dashboard → Providers → Add Provider.
3. Изберете категорията Web Cookie и Claude Web.
4. Поставете пълната заглавка Cookie, копирана от удостоверена заявка към `claude.ai`.
