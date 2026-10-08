# Cursor Image Generation (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute омогућава **генерисање слика** у оквиру Cursor плана преко `POST /v1/images/generations`, користећи исти ID добављача као за ћаскање: `cursor` (алијас `cu`).

| Поље                 | Вредност                                                                                           |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS` ID | `cursor`                                                                                           |
| Формат               | `cursor-agent-image`                                                                               |
| Аутентификација      | Иста OAuth веза / веза путем API кључа као за ћаскање (`provider_connections.provider = "cursor"`) |
| Модели               | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                          |

## Зашто Agent CLI

Cursor ћаскање у OmniRoute-у користи `agent.v1.AgentService/Run` (protobuf). Та путања **одбија** уграђене клијентске алате (shell, write, …). Генерисање слика је изворни Cursor алат који **`agent` CLI** извршава над корисничким местом. Зато руковалац сликама покреће `agent` са закључаним упитом и привременим радним простором за сваки захтев (по истом обрасцу као мостови за корисничка места које одржава заједница), а затим враћа `b64_json` компатибилан са OpenAI-јем.

## Ограничење приступа (строга правила #15 + #17)

Ово је једини формат у `IMAGE_PROVIDERS` који покреће подређени процес (`agent`
бинарну датотеку). Пошто `POST /v1/images/generations` дели око 40 других добављача
слика који не покрећу процесе и које удаљени позиваоци легитимно користе, цела рута
није класификована као `LOCAL_ONLY` — уместо тога, `handleCursorAgentImageGeneration`
примењује сопствену контролу користећи поуздану оцену `AUTHZ_HEADER_PEER_LOCALITY`,
коју authz процес поставља на сваки захтев (на основу стварног TCP равноправног чвора,
а никада на основу лажљивог заглавља `Host`): само позиваоци из `loopback` и `lan`
могу да покрену процес; сви остали (укључујући процурели API кључ поново употребљен
преко јавног тунела) добијају `403` пре било каквог проналажења акредитива или
покретања процеса. Погледајте `src/server/authz/policies/management.ts` за исту
политику примењену на остатак нивоа `LOCAL_ONLY`.

## Контрола конкурентности је на нивоу модула (ограничење једне инстанце)

`CURSOR_IMG_MAX_CONCURRENT` се примењује помоћу бројача/реда у меморији, ограниченог
на инстанцу Node модула (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
Он исправно ограничава истовремена покретања процеса `agent` унутар једног OmniRoute
процеса, али **не** координира више процеса/инстанци који деле исто Cursor корисничко
место (нпр. имплементацију са више реплика) — свака инстанца примењује сопствено,
независно ограничење. За имплементацију са једном инстанцом (подразумевано) ово је
прецизно; хоризонтално скалиране имплементације треба да подесе
`CURSOR_IMG_MAX_CONCURRENT` конзервативно за сваку инстанцу или да усмере Cursor
саобраћај за слике ка једној инстанци.

## Захтеви

1. Повезан Cursor налог на контролној табли (OAuth или `crsr_…` API кључ).
2. Cursor Agent бинарна датотека доступна OmniRoute процесу:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, или
   - `~/.local/bin/agent`, или
   - `providerSpecificData.agentBin` у Cursor вези.

Опционо подешавање:

| Env                         | Подразумевано               | Значење                                           |
| --------------------------- | --------------------------- | ------------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                    | Максимално време извршавања по слици              |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                         | Контрола конкурентности дељеног корисничког места |
| `CURSOR_IMG_MODEL`          | (модел из захтева / `auto`) | Замена CLI опције `--model`                       |

## Пример

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Генерисање обично траје 1–2 минута. Дајте предност путањи преко интерне мреже; рубни проксији са временским ограничењем од око 100 секунди неће успети.

## LiteLLM

Региструјте модел слике са `mode: image_generation`, `api_base: http://omniroute:20128/v1` и `model: openai/cursor/auto` (или само `cursor/auto`, у зависности од ваше верзије LiteLLM-а).
