# AgentRouter Setup Guide (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org)-ը Anthropic-ի հետ համատեղելի միջնորդ ծառայություն է, որը վերավաճառում է
Claude-ը և այլ մոդելներ՝ հաճախ ավելի ցածր գներով, քան անմիջապես Anthropic API-ն։ Այն
նախագծված է որպես պաշտոնական Claude Code հաճախորդի համար `ANTHROPIC_BASE_URL`-ի
անմիջական փոխարինող, ուստի ընդունում է միայն Claude Code-ի ցանցային ձևաչափին համապատասխանող
հարցումներ (հատուկ User-Agent, `anthropic-beta` դրոշակներ, Stainless SDK-ի վերնագրեր և այլն)։

## Արագ մեկնարկ — օգտագործեք ներկառուցված `agentrouter` մատակարարը (խորհուրդ է տրվում)

Օգտատերերի մեծ մասի համար **հատուկ կարգավորում չի պահանջվում**։ OmniRoute-ը տրամադրվում է
ներկառուցված `agentrouter` մատակարարով, որտեղ Claude Code-ի ամբողջական ցանցային ձևաչափն արդեն
ներառված է (տե՛ս `open-sse/config/providerRegistry.ts` → `agentrouter`)։ Այն օգտագործելու համար՝

1. Բացեք **Կառավարման վահանակ → Մատակարարներ → Ավելացնել մատակարար**։
2. Ցանկից ընտրեք **AgentRouter**։
3. Տեղադրեք ձեր `sk-...` API բանալին և պահպանեք։

Այսքանն է․ միջավայրի փոփոխականներ կամ մատակարարի հատուկ տեսակ անհրաժեշտ չեն։ Ներկառուցված մոդելները
ներառում են `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` և
`deepseek-v3.2`։

Այս ուղեցույցի մնացած մասը վերաբերում է **ընդլայնված տարբերակին**՝
`anthropic-compatible-cc-*` մատակարարի տեսակի օգտագործմանը։ Այն օգտագործեք, երբ ցանցային ձևաչափի
նկատմամբ ավելի մեծ վերահսկողություն է անհրաժեշտ, օրինակ՝ AgentRouter-ի ոճի այլ միջնորդ
ծառայություններին միանալիս, որոնք դեռ ներառված չեն ներկառուցված մատակարարների գրանցամատյանում, կամ
բազային URL-ը, զրույցի ուղին կամ վերնագրերի հավաքածուն վերասահմանելիս։

---

## Ընդլայնված․ միացում Claude Code-ի հետ համատեղելի մատակարարի տեսակի միջոցով

OmniRoute-ը նաև աջակցում է AgentRouter-ին (և նմանատիպ միջնորդ ծառայություններին) **Claude Code-ի
հետ համատեղելի** մատակարարի տեսակի (`anthropic-compatible-cc-*`) միջոցով, որն օգտագործում է
Anthropic Messages API-ն՝ ճիշտ ցանցային ձևաչափով։ `https://agentrouter.org` հասցեն մատնանշող
ընդհանուր `openai-compatible-chat` մատակարարը **չի** աշխատի․ վերին մակարդակի WAF-ը մերժում է այն
հարցումները, որոնք նման չեն Claude Code-ի հարցումներին։

---

## Նախապայմաններ

- AgentRouter հաշիվ և API բանալի։ Նոր գրանցվողներն անվճար կրեդիտներ են ստանում նախագծի
  [README](../README.md)-ում գտնվող գործընկերային հղման միջոցով։
- OmniRoute-ը պետք է աշխատի միացված `ENABLE_CC_COMPATIBLE_PROVIDER` գործառույթի դրոշակով
  (տե՛ս ստորև)։

## 1. Միացրեք CC-ի հետ համատեղելի մատակարարի տեսակը

Claude Code-ի հետ համատեղելի մատակարարի տեսակը հասանելի է գործառույթի դրոշակի միջոցով, քանի որ այն
ուղարկում է պաշտոնական Claude Code հաճախորդի հարցումներին շատ նման հարցումներ։ Այն միացնելու համար
OmniRoute-ը գործարկելուց առաջ սահմանեք միջավայրի փոփոխականը՝

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker-ի օրինակ՝

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Վերագործարկումից հետո կառավարման վահանակում, OpenAI-ի հետ համատեղելի և Anthropic-ի հետ համատեղելի
առկա տարբերակներից բացի, հասանելի կլինի **Ավելացնել Claude Code-ի հետ համատեղելի մատակարար**
տարբերակը։

## 2. Ստեղծեք մատակարարը կառավարման վահանակում

1. Բացեք **Կառավարման վահանակ → Մատակարարներ → Ավելացնել մատակարար**։
2. Ընտրեք **Ավելացնել Claude Code-ի հետ համատեղելի մատակարար** (տեսանելի է միայն, երբ վերը նշված դրոշակը սահմանված է)։
3. Լրացրեք դաշտերը՝

| Դաշտ         | Արժեք                                                                                 |
| ------------ | ------------------------------------------------------------------------------------- |
| Անուն        | `AgentRouter` (կամ ցանկացած պիտակ)                                                    |
| Նախածանց     | `agentrouter` (տեղեկամատյաններում և կառավարման վահանակում ցուցադրվող հարմար այլանուն) |
| Բազային URL  | `https://agentrouter.org`                                                             |
| Զրույցի ուղի | `/v1/messages?beta=true` (լռելյայն՝ թողեք անփոփոխ)                                    |

> Մոդելի կանոնական նույնացուցիչը շարունակում է օգտագործել մատակարարի հանգույցի ամբողջական ID-ն
> (`anthropic-compatible-cc-{uuid}/{model}`)։ **Նախածանցը** պարզապես ցուցադրման
> այլանուն է, որը `src/lib/usage/callLogs.ts`-ը լուծում է տեղեկամատյաններում ավելի ընթեռնելի տեսքով
> ցուցադրելու համար։

4. (Ըստ ցանկության) Տեղադրեք ձեր API բանալին **Վավերացնել** դաշտում և սեղմեք **Ստուգել**՝
   պահպանելուց առաջ կապը հաստատելու համար։
5. Սեղմեք **Ավելացնել**։

Ստեղծելուց հետո բացեք մատակարարը և ավելացրեք **Կապ**՝ ձեր AgentRouter API
բանալիով (`sk-...`)։ Կապի `test_status`-ը պետք է դառնա `active`։

## 3. Օգտագործեք այն համակցման միջոցով կամ ուղղակիորեն

Մոդելին հղում կատարեք՝ որպես անվանատարածք օգտագործելով ձեր մատակարարի նախածանցը.

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Կանոնական մոդելի ID-ն՝ `anthropic-compatible-cc-{uuid}/claude-opus-4-6`, նույնպես աշխատում է
և հենց դա է ցուցադրվում տվյալների բազայում ու համակցման կազմաձևում։

Կամ ավելացրեք այն համակցման մեջ՝ երթուղավորման, պահուստային անցման և քվոտաների կառավարման համար, ինչպես ցանկացած այլ
մատակարարի դեպքում։

---

## Ցանցային պատկերի մանրամասները

Տեղեկանքի համար՝ cc-compatible կամուրջը յուրաքանչյուր վերին հոսքի
հարցման հետ ուղարկում է հետևյալը (տե՛ս `open-sse/services/claudeCodeCompatible.ts`).

| Վերնագիր                                          | Արժեք                                                                                                                         |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                   | `Bearer <api-key>`                                                                                                            |
| `User-Agent`                                      | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                      |
| `anthropic-version`                               | `2023-06-01`                                                                                                                  |
| `anthropic-beta`                                  | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                      |
| Յուրաքանչյուր կապի redact-thinking բետա փոխարկիչ  | Ավելացնում է `redact-thinking-2026-02-12` այն վերին հոսքերի համար, որոնք հատուկ պահանջում են խմբագրված մտածողության հոսքեր    |
| Յուրաքանչյուր կապի ամփոփված մտածողության փոխարկիչ | Ավելացնում է `display: "summarized"` այն CC Compatible մտածողության հարցումներին, որոնցում ցուցադրման ռեժիմ դեռ սահմանված չէր |
| `anthropic-dangerous-direct-browser-access`       | `true`                                                                                                                        |
| `x-app`                                           | `cli`                                                                                                                         |
| `X-Stainless-*`                                   | Stainless SDK-ի տարբեր վերնագրեր (լեզու, փաթեթի տարբերակ, ՕՀ, ճարտարապետություն և այլն)                                       |

Սա է հնարավորություն տալիս հարցումներին անցնել վերին հոսքի WAF-ի / հաճախորդների թույլատրելի ցանկի ստուգումը։

---

## Խնդիրների լուծում

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Ձեր հարցումը
չի համապատասխանել Claude Code-ի ցանցային պատկերին։ Սա տեղի է ունենում, երբ մատակարարը կազմաձևված է
որպես `openai-compatible-chat`՝ `anthropic-compatible-cc`-ի փոխարեն, կամ երբ մեկնարկի ժամանակ
`ENABLE_CC_COMPATIBLE_PROVIDER=true` դրոշը սահմանված չի եղել։

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
«Անվավեր թոքեն»։ Ցանցային պատկերը ճիշտ է, սակայն API բանալին մերժվել է։ AgentRouter-ի կառավարման վահանակում ստեղծեք
նոր բանալի և թարմացրեք կապը։

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter-ի մոդերացիայի մշակիչը մերժել է հարցման բովանդակությունը, կամ
բանալու սակագնային պլանը չի թույլատրում պահանջված մոդելի օգտագործումը։ Փորձեք այլ հուշում կամ մոդել.
եթե անվնաս հուշումը շարունակաբար արգելափակվում է, դիմեք AgentRouter-ի աջակցման ծառայությանը։

**`[400]: content-blocked` միայն որոշակի մոդելներում** — AgentRouter-ի սակագնային պլանների մեծ մասը
թույլատրում է մոդելների միայն ենթաբազմություն (օրինակ՝ `claude-opus-4-6`)։ Մոդելների այլ ID-ները վերադարձնում են
`unauthorized_client_error`, նույնիսկ եթե բանալին վավեր է։ AgentRouter-ի կառավարման վահանակում ստուգեք, թե
ձեր պլանն ինչ մոդելներ է ներառում։

**`Invalid JSON response from provider (reset after Ns)` omniroute-ի մատյաններում** —
Վերին հոսքը վերադարձրել է ոչ JSON մարմին (սովորաբար՝ WAF-ի HTML սխալի էջ)։
Սա սովորաբար նշանակում է, որ հարցումն այդպես էլ չի հասել AgentRouter-ի հետին համակարգին. կրկին ստուգեք, որ
մատակարարի ID-ն սկսվում է `anthropic-compatible-cc-`-ով (ուշադրություն դարձրեք վերջի գծիկին —
տե՛ս `CLAUDE_CODE_COMPATIBLE_PREFIX`-ը `open-sse/services/claudeCodeCompatible.ts`-ում),
և որ գործառույթի դրոշը միացված է։

**`unauthorized client detected` / HTML սխալի էջ, թեև AgentRouter-ի
մատակարար արդեն գոյություն ունի** — հավանաբար ունեք AgentRouter-ի **մեկից ավելի** մատակարար,
և ձեր հարցումը հասնում է սխալ մատակարարին։ Եթե `agentrouter` նախածանցով ստեղծվել է մնացորդային՝ ձեռքով կազմված
`anthropic-compatible-*` (ոչ `cc`) կամ `openai-compatible-chat-*` մատակարար,
այն կարող է տիրապետել `agentrouter/<model>` մոդելի ID-ներին
(իսկ համակցումները կարող են դրան հղվել հանգույցի ID-ով), ուստի երթևեկությունն ուղղորդվում է այդ մատակարարին,
որը ուղարկում է ընդհանուր User-Agent և մերժվում, այլ ոչ թե ներկառուցված
`agentrouter` մատակարարին, որն արդեն ներառում է ճիշտ ցանցային պատկերը։ omniroute-ի մատյաններում ստուգեք, թե
իրականում ուր է հանգուցալուծվում մոդելը (`ROUTING` պիտակը ցույց է տալիս
`agentrouter/<model> → <providerId>/<model>`). եթե `<providerId>`-ն
`agentrouter` չէ, համախմբեք բնիկ մատակարարի վրա. համակցումներն ուղղեք դեպի
`agentrouter/<model>` (providerId՝ `agentrouter`) և ջնջեք կրկնօրինակ
համատեղելի մատակարարները։ Բնիկ մատակարարին անհրաժեշտ չէ ո՛չ ցանցային պատկերի կազմաձևում, ո՛չ էլ
`customUserAgent`։

---

## Տես նաև

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web մատակարարի ինտեգրման նշումներ
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Անվճար մակարդակի մատակարարների
  կատալոգ
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Wire image-ի իրականացում
