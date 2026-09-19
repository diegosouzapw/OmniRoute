# Reasoning Replay Cache (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Ճշմարտության աղբյուր՝** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Վերջին թարմացումը՝** 2026-06-28 — v3.8.40

OmniRoute-ը գրանցում է մտածողության ռեժիմով մոդելների ստեղծած օգնականի `reasoning_content`-ը և թափանցիկորեն կրկին փոխանցում այն բազմափուլ հարցումների ժամանակ, երբ վերին մակարդակի մատակարարը դա պահանջում է։ Սա վերացնում է HTTP 400 սխալները, որոնք խիստ պահանջներ ունեցող մատակարարներն առաջացնում են, երբ հաճախորդի զրույցի պատմության մեջ բացակայում է նախորդ փուլի հիմնավորումը։

## Ինչու է սա գոյություն ունենում

Մտածողության ռեժիմով աշխատող մի շարք մատակարարներ մերժում են հաջորդ փուլը, եթե **օգնականի նախորդ հաղորդագրությունը չի ներառում սկզբնական `reasoning_content`-ը**։ Վերին մակարդակի ծառայությունը վերադարձնում է 400՝ հետևյալ հաղորդագրությունների նման տեքստով.

```
Սխալ պարամետր. մտածողության ռեժիմում reasoning_content-ը պետք է կրկին փոխանցվի API-ին։
```

Սակայն սովորական հաճախորդները (Cursor, Cline, Roo Code, OpenAI SDK) հեռացնում են `reasoning_content`-ը իրենց կրկին փոխանցած պատմությունից։ OmniRoute-ը վերականգնում է այն սերվերային քեշից, որպեսզի վերին մակարդակի ծառայության ստացած հարցումը լինի հետևողական։ #1628 խնդիրը ներմուծեց հիշողության/SQLite-ի հիբրիդային պահպանումը, որպեսզի քեշը պահպանվի գործընթացի վերագործարկումներից հետո։

## Ճարտարապետություն

```
Turn N (assistant generates):
  → response contains reasoning_content + tool_calls
  → if requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      writes (memory + DB), keyed by every tool_call.id
  → forward response to client (which may or may not retain reasoning)

Turn N+1 (client sends follow-up):
  → translator detects: requiresReasoningReplay(provider, model) === true
  → for each assistant message with tool_calls and no reasoning_content:
      lookupReasoning(toolCalls[0].id) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback for older DeepSeek)
  → upstream sees consistent history → no 400
```

Ֆիքսումը (Capture) կատարվում է `open-sse/handlers/chatCore.ts`-ում (երկու տեղում՝ `cacheReasoningFromAssistantMessage`-ի կանչի երկու կետերում): Վերարտադրումը (Replay) կատարվում է `open-sse/translator/index.ts`-ում՝ սխեմայի ձևափոխումից հետո, բայց մինչև ուղարկելը (dispatch):

Պարզ (առանց գործիքի կանչի) ասիստենտի քայլերը (turns) նույնականացվում են այլ կերպ. `buildAssistantMessageCacheKey()`-ը մշակում է սեսիայի շրջանակը գումարած OpenAI ձևաչափով նորմալացված տեքստը (transcript) մինչև այդ քայլը, քանի որ DeepSeek-ը պահանջում է _բոլոր_ նախորդ քայլերի տրամաբանությունը (reasoning), հենց որ առկա են `tools`-ները: Responses-API թիրախների համար (օրինակ՝ `opencode-go/deepseek-v4-flash`, որը ուղղորդվում է դեպի `/responses`), վերին հոսքի (upstream) մարմինը պարունակում է `input`, այլ ոչ թե `messages`, ուստի `translateRequest()`-ը (`open-sse/translator/index.ts`) հաղորդում է հենակետային (pivot) տեքստը, որը մշակել է հետկանչի (callback) տարբերակի միջոցով, և ֆիքսման կետերը մշակում են նույն տեքստը: Responses-ի վերարտադրման փուլն աշխատում է OpenAI-ի հենակետի վրա յուրաքանչյուր ելնային ձևաչափի համար, այնպես որ Anthropic Messages հաճախորդները նույնպես (Claude → OpenAI → Responses) վերարտադրվում են:

## Պահեստավորում — Հիբրիդային հիշողություն + SQLite

Հաճախ օգտագործվող ուղին կիրառում է հիշողության մեջ գտնվող `Map` (LRU՝ ըստ ստեղծման ժամանակի), որի հիմքում SQLite աղյուսակն է՝ վթարից հետո վերականգնման և կառավարման վահանակում տեսանելիության համար։

| Շերտ         | Իրականացում                                      | Նպատակ                                                              |
| ------------ | ------------------------------------------------ | ------------------------------------------------------------------- |
| Հիշողություն | `Map`՝ `open-sse/services/reasoningCache.ts`-ում | Արագ որոնումներ, ամենահները հեռացվում են 200-ի դեպքում              |
| DB           | `reasoning_cache` աղյուսակ (`src/lib/db/`)       | Պահպանվում է վերագործարկումների միջև, տրամադրում է վիճակագրությունը |

Գրառումներն ուղարկվում են երկուսին էլ։ Ընթերցումները նախ ստուգում են հիշողությունը, ապա դիմում DB-ին (DB-ում գտնված գրառումները կրկին տեղափոխվում են հիշողություն)։ DB-ի խափանումները ճակատագրական չեն. հիշողության քեշը շարունակում է սպասարկել հաճախ օգտագործվող ուղին։

**Լռելյայն արժեքներ՝**

- TTL՝ `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Հիշողության գրառումների առավելագույն քանակ՝ `200` (`MAX_MEMORY_ENTRIES`)
- Հեռացում՝ սկզբում ամենահին `createdAt`-ը

## Տվյալների բազայի սխեմա

Միգրացիա՝ `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Ինդեքսներ՝ `expires_at`, `provider`, `model`, `created_at`։ `expires_at`-ը պահվում է որպես Unix դարաշրջանի վայրկյանների քանակ, իսկ SELECT շերտը նորմալացնում է հին տեքստային արժեքները `EXPIRES_AT_EPOCH_SQL`-ի միջոցով։

## Մատակարարի / մոդելի հայտնաբերում

Վերարտադրումը միացված է, երբ `requiresReasoningReplay(provider, model)`-ը վերադարձնում է `true`։ Ֆունկցիան ստուգում է `open-sse/services/reasoningCache.ts`-ում գտնվող երկու ցանկ։

**Մատակարարների ID-ներ (ճշգրիտ համընկնում, առանց տառաշարի մեծատառ/փոքրատառ լինելը հաշվի առնելու).**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Մոդելների կանոնավոր արտահայտությունների ձևանմուշներ (առանց տառաշարի մեծատառ/փոքրատառ լինելը հաշվի առնելու).**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` և `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, ընտրովի `-free` վերջածանցով)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Նոր խիստ մատակարար կամ մոդել ավելացնելու համար անհրաժեշտ է այն կցել այս ցանկերից մեկին և գրել միավորային թեստ, որը հաստատում է վերարտադրման ներարկումը։ PR-ի նկարագրության մեջ պետք է մեջբերվի փոփոխության պատճառ դարձած upstream 400 ճշգրիտ տողը։

## REST API

Քեշը տրամադրում է երկու վերջնակետ `src/app/api/cache/reasoning/route.ts`-ում։ Երկուսն էլ պահանջում են կառավարման նույնականացում (`isAuthenticated`՝ `@/shared/utils/apiAuth`-ից)։

| Մեթոդ  | Վերջնակետ                                                 | Նկարագրություն                                                      |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Վիճակագրություն + էջավորված գրառումներ                              |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Զտված ցանկ (`limit`-ը սահմանափակվում է `[1, 200]` միջակայքով)       |
| DELETE | `/api/cache/reasoning`                                    | Մաքրել ամեն ինչ (հիշողություն + DB) և զրոյացնել hit/miss հաշվիչները |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Մաքրել միայն մեկ մատակարարի գրառումները                             |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Ջնջել մեկ գրառում                                                   |

**GET պատասխանի կառուցվածքը.**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Շահագործման նշումներ

- **Մաքրում.** `cleanupReasoningCache()`-ը հեռացնում է հիշողության ժամկետանց գրառումները և կատարում `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` հրամանը։ Առողջական վիճակի ստուգման worker-ները պարբերաբար կանչում են այն։
- **Վթարից հետո վերականգնում.** Վերագործարկումից հետո հիշողությունը դատարկ է, սակայն DB-ն դեռ պահպանում է ժամկետը չլրացած գրառումները։ Տվյալ `tool_call_id`-ի առաջին որոնումը DB hit է, իսկ հետագա որոնումները՝ memory hit։
- **Չկա reasoning, չկա քեշավորում.** `cacheReasoningFromAssistantMessage`-ը վերադարձնում է `0`, երբ օգնականի հաղորդագրությունը չունի `reasoning_content` / `reasoning` դաշտ, ուստի մտածողություն չպարունակող պատասխանները որևէ ծախս չեն առաջացնում։
- **Գրելը նույնպես պայմանավորված է.** `chatCore.ts`-ի երկու կանչման վայրերն էլ (ոչ հոսքային և հոսքային) կանչում են `cacheReasoningFromAssistantMessage()` միայն այն դեպքում, երբ `requiresReasoningReplay(provider, model)`-ը `true` է՝ նույն պրեդիկատը, որը ստուգում է ընթերցման կողմը։ Այն տեղադրումները, որոնք երբեք չեն օգտագործում վերարտադրում պահանջող մատակարար, այլևս չեն կրում գրելու, ինդեքսը թարմացնելու և reasoning պարունակող յուրաքանչյուր պատասխանի համար try/catch-ի ծախսերը։
- **Ոչ խիստ մատակարարներ.** Երբ `requiresReasoningReplay`-ը `false` է, իսկ նպատակային ձևաչափը OpenAI-ն է, փոխակերպիչը ելքային հաղորդագրություններից **հեռացնում է** ցանկացած `reasoning_content` դաշտ՝ OpenAI Chat Completions-ը չի ընդունում այն։

## Տե՛ս նաև

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — անջատիչներ, սառեցման ժամանակահատվածներ, մոդելների արգելափակումներ
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — վերին մակարդակի 400 սխալների ախտորոշում
- Սկզբնաղբյուր՝ `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Միգրացիա՝ `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API երթուղի՝ `src/app/api/cache/reasoning/route.ts`
- Սկզբնական խնդիր՝ #1628
