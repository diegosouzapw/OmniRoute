# AgentRouter Setup Guide (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) је релеј компатибилан са Anthropic-ом који препродаје
Claude и друге моделе, често по нижим ценама од директног Anthropic API-ја. Осмишљен је
као непосредна `ANTHROPIC_BASE_URL` замена за званични Claude Code
клијент, па прихвата само саобраћај који одговара мрежном формату Claude Code-а (одређени
User-Agent, `anthropic-beta` заставице, заглавља Stainless SDK-а итд.).

## Брзи почетак — користите изворни `agentrouter` провајдер (препоручено)

За већину корисника **није потребно никакво посебно подешавање**. OmniRoute долази са уграђеним
`agentrouter` провајдером у којем је већ обухваћен комплетан мрежни формат Claude Code-а (погледајте
`open-sse/config/providerRegistry.ts` → `agentrouter`). Да бисте га користили:

1. Отворите **Контролна табла → Провајдери → Додај провајдера**.
2. Изаберите **AgentRouter** са листе.
3. Налепите свој `sk-...` API кључ и сачувајте.

То је све — нису потребне променљиве окружења нити прилагођени тип провајдера. Уграђени модели
обухватају `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` и
`deepseek-v3.2`.

Остатак овог водича описује **напредни начин**: коришћење типа провајдера
`anthropic-compatible-cc-*`. Користите га када вам је потребна већа контрола
над мрежним форматом — на пример, када се повезујете са другим релејима налик AgentRouter-у
који још нису у изворном регистру провајдера или када мењате
основни URL, путању за ћаскање или скуп заглавља.

---

## Напредно: повезивање преко типа провајдера компатибилног са Claude Code-ом

OmniRoute такође подржава AgentRouter (и сличне релеје) преко типа провајдера
**компатибилног са Claude Code-ом** (`anthropic-compatible-cc-*`), који комуницира помоћу
Anthropic Messages API-ја уз одговарајући мрежни формат. Генерички
`openai-compatible-chat` провајдер усмерен на `https://agentrouter.org`
**неће** радити — надређени WAF одбија захтеве који не изгледају као да потичу од Claude
Code-а.

---

## Предуслови

- AgentRouter налог и API кључ. Нови корисници добијају бесплатне кредите преко партнерске
  везе у пројектном документу [README](../README.md).
- OmniRoute покренут са омогућеном функционалном заставицом `ENABLE_CC_COMPATIBLE_PROVIDER`
  (погледајте испод).

## 1. Омогућите тип провајдера компатибилан са CC-ом

Тип провајдера компатибилан са Claude Code-ом налази се иза функционалне заставице јер
шаље саобраћај који веома верно опонаша званични Claude Code клијент. Омогућите га
постављањем променљиве окружења пре покретања OmniRoute-а:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Пример за Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Након поновног покретања, контролна табла приказује опцију **Додај компатибилност са Claude Code-ом**
поред постојећих токова компатибилних са OpenAI-јем и Anthropic-ом.

## 2. Направите провајдера на контролној табли

1. Отворите **Контролна табла → Провајдери → Додај провајдера**.
2. Изаберите **Додај компатибилност са Claude Code-ом** (видљиво само када је горенаведена заставица постављена).
3. Попуните поља:

| Поље              | Вредност                                                                       |
| ----------------- | ------------------------------------------------------------------------------ |
| Назив             | `AgentRouter` (или било која ознака)                                           |
| Префикс           | `agentrouter` (читљив псеудоним приказан у евиденцијама и на контролној табли) |
| Основни URL       | `https://agentrouter.org`                                                      |
| Путања за ћаскање | `/v1/messages?beta=true` (подразумевано — оставите непромењено)                |

> Канонски идентификатор модела и даље користи пуни ID чвора провајдера
> (`anthropic-compatible-cc-{uuid}/{model}`). **Префикс** је само приказни
> псеудоним који `src/lib/usage/callLogs.ts` разрешава ради читљивијег приказа евиденције.

4. (Опционално) Налепите свој API кључ у поље **Провери** и кликните на **Провери** да бисте
   потврдили повезивање пре чувања.
5. Кликните на **Додај**.

Када га направите, отворите провајдера и додајте **Везу** са својим AgentRouter API
кључем (`sk-...`). Вредност `test_status` за везу требало би да постане `active`.

## 3. Користите га преко комбинације или директно

Референцирајте модел користећи префикс свог провајдера као именски простор:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Канонски ID модела `anthropic-compatible-cc-{uuid}/claude-opus-4-6` такође ради
и приказује се у бази података и конфигурацији комбинације.

Или га додајте у комбинацију за усмеравање, резервну опцију и управљање квотама као и било ког другог
провајдера.

---

## Детаљи имитације клијентског захтева

Ради референце, cc-компатибилни мост шаље следеће са сваким узводним
захтевом (погледајте `open-sse/services/claudeCodeCompatible.ts`):

| Заглавље                                       | Вредност                                                                                                    |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `Authorization`                                | `Bearer <api-key>`                                                                                          |
| `User-Agent`                                   | `claude-cli/2.1.258 (external, sdk-cli)`                                                                    |
| `anthropic-version`                            | `2023-06-01`                                                                                                |
| `anthropic-beta`                               | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                    |
| Подешавање beta опције redact-thinking по вези | Додаје `redact-thinking-2026-02-12` за узводне сервисе који изричито захтевају редиговане токове размишљања |
| Подешавање сажетог размишљања по вези          | Додаје `display: "summarized"` CC Compatible захтевима за размишљање који већ нису поставили режим приказа  |
| `anthropic-dangerous-direct-browser-access`    | `true`                                                                                                      |
| `x-app`                                        | `cli`                                                                                                       |
| `X-Stainless-*`                                | Разна заглавља Stainless SDK-а (језик, верзија пакета, ОС, архитектура итд.)                                |

Ово омогућава захтевима да прођу узводни WAF / белу листу клијената.

---

## Решавање проблема

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Ваш захтев се
није подударао са имитацијом захтева Claude Code клијента. Ово се дешава када је провајдер конфигурисан
као `openai-compatible-chat` уместо `anthropic-compatible-cc`, или када
ознака `ENABLE_CC_COMPATIBLE_PROVIDER=true` није постављена при покретању.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
„Неважећи токен“. Имитација клијентског захтева је исправна, али је API кључ одбијен. Генеришите
нови кључ на AgentRouter контролној табли и ажурирајте везу.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter-ов механизам за модерацију одбио је садржај захтева или
план кључа не дозвољава тражени модел. Испробајте другачији упит или модел;
обратите се AgentRouter подршци ако се безопасни упит доследно блокира.

**`[400]: content-blocked` само на одређеним моделима** — Већина AgentRouter планова
дозвољава само подскуп модела (нпр. `claude-opus-4-6`). Други ID-ови модела враћају
`unauthorized_client_error` иако је кључ важећи. Проверите које моделе ваш
план покрива на AgentRouter контролној табли.

**`Invalid JSON response from provider (reset after Ns)` у omniroute евиденцији** —
Узводни сервис је вратио тело које није JSON (обично HTML страницу са грешком од WAF-а).
То најчешће значи да захтев никада није стигао до AgentRouter позадинског система — поново проверите да
ID провајдера почиње са `anthropic-compatible-cc-` (обратите пажњу на завршну цртицу —
погледајте `CLAUDE_CODE_COMPATIBLE_PREFIX` у `open-sse/services/claudeCodeCompatible.ts`)
и да је ознака функције омогућена.

**`unauthorized client detected` / HTML страница са грешком иако AgentRouter
провајдер већ постоји** — вероватно имате **више од једног** AgentRouter провајдера
и ваш захтев стиже до погрешног. Ако је преостао ручно направљен
`anthropic-compatible-*` (који није `cc`) или `openai-compatible-chat-*` провајдер
креиран са префиксом `agentrouter`, он може да преузме ID-ове модела `agentrouter/<model>`
(а комбинације могу да га референцирају преко ID-а чвора), па се саобраћај усмерава том провајдеру —
који шаље генерички User-Agent и бива одбијен — уместо уграђеном
`agentrouter` провајдеру који већ испоручује исправну имитацију клијентског захтева. Проверите на шта се
модел заправо разрешава у omniroute евиденцији (ознака `ROUTING` приказује
`agentrouter/<model> → <providerId>/<model>`); ако `<providerId>` није
`agentrouter`, обједините конфигурацију око изворног провајдера: усмерите комбинације на
`agentrouter/<model>` (providerId `agentrouter`) и избришите дуплиране
компатибилне провајдере. Изворном провајдеру није потребна конфигурација имитације клијентског захтева нити
`customUserAgent`.

---

## Погледајте и

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Напомене о интеграцији добављача Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Каталог добављача
  са бесплатним нивоом
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Имплементација преноса слика
