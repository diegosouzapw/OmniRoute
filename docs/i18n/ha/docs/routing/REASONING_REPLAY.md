# Reasoning Replay Cache (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Madogarar gaskiya:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Sabuntawa na ƙarshe:** 2026-06-28 — v3.8.40

OmniRoute yana adana `reasoning_content` na mataimaki da samfurori masu yanayin tunani suka samar, sannan ya sake saka shi ta atomatik a buƙatun da ke da zagaye da yawa idan mai samar da sabis na upstream yana buƙatarsa. Wannan yana kawar da kurakuran HTTP 400 da masu samar da sabis masu tsauraran ƙa'idoji ke bayarwa idan tarihin tattaunawar abokin ciniki ba ya ɗauke da tunanin zagayen da ya gabata.

## Dalilin Samuwar Wannan

Wasu masu samar da sabis masu yanayin tunani suna ƙin karɓar zagaye na gaba sai idan **saƙon mataimaki na baya ya ƙunshi ainihin `reasoning_content`**. Upstream yana mayar da 400 tare da saƙonni irin su:

```
Siga Ba Daidai Ba: Dole ne a sake aika reasoning_content na yanayin tunani zuwa API.
```

Amma abokan ciniki na yau da kullum (Cursor, Cline, Roo Code, OpenAI SDK) suna cire `reasoning_content` daga tarihin da suke sake aikawa. OmniRoute yana dawo da shi daga cache na gefen uwar garke domin buƙatar da upstream ke gani ta kasance daidaitacciya. Issue #1628 ya gabatar da tsarin adanawa haɗaɗɗe na memory/SQLite domin cache ya ci gaba da kasancewa bayan sake kunna process.

## Tsarin Gine-gine

```
Zagaye N (mataimaki yana samarwa):
  → amsa tana ƙunshe da reasoning_content + tool_calls
  → idan requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      yana rubutawa (memory + DB), tare da amfani da kowane tool_call.id a matsayin maɓalli
  → tura amsa zuwa abokin ciniki (wanda zai iya riƙe reasoning ko kuma a'a)

Zagaye N+1 (abokin ciniki yana aika ci gaba):
  → translator yana gano: requiresReasoningReplay(provider, model) === true
  → ga kowane saƙon mataimaki mai tool_calls amma babu reasoning_content:
      lookupReasoning(toolCalls[0].id) → memory → DB
      an samu  → msg.reasoning_content = cached; recordReplay()
      ba a samu ba → msg.reasoning_content = "" (madadin tsohon tsari don tsofaffin nau'ikan DeepSeek)
  → upstream yana ganin daidaitaccen tarihi → babu 400
```

Ana yin kamawa a `open-sse/handlers/chatCore.ts` (wurare biyu, a wuraren kira biyu na `cacheReasoningFromAssistantMessage`). Ana yin sake sakawa a `open-sse/translator/index.ts` bayan daidaita schema amma kafin turawa.

Ana sanya maɓalli ga zagayen mataimaki na yau da kullum (wanda ba shi da tool-call) ta wata hanya dabam: `buildAssistantMessageCacheKey()` yana ƙirƙirar digest daga iyakar session tare da transcript da aka daidaita zuwa tsarin OpenAI har zuwa wannan zagayen, saboda DeepSeek yana buƙatar reasoning na _kowane_ zagayen baya da zarar `tools` yana nan. Ga wuraren da Responses-API ke karɓa (misali `opencode-go/deepseek-v4-flash`, wanda ake tura shi zuwa `/responses`), jikin buƙatar upstream yana ɗauke da `input`, ba `messages` ba, don haka `translateRequest()` (`open-sse/translator/index.ts`) yana bayar da rahoton pivot transcript ɗin da ya yi wa digest ta hanyar zaɓin callback, sannan wuraren kamawa su yi wa wannan transcript ɗin digest iri ɗaya. Matakin sake sakawa na Responses yana gudana a kan OpenAI pivot ga kowane tsarin tushe, don haka ana sake saka bayanan abokan cinikin Anthropic Messages (Claude → OpenAI → Responses) su ma.

## Ma'aji — Haɗaɗɗen Memory + SQLite

Hanyar da aka fi amfani da ita tana amfani da `Map` na cikin memory (LRU-by-creation), wanda teburin SQLite yake tallafawa domin dawo da bayanai bayan rushewa da kuma nuna su a dashboard.

| Mataki | Aiwatarwa                                           | Manufa                                                   |
| ------ | --------------------------------------------------- | -------------------------------------------------------- |
| Memory | `Map` a cikin `open-sse/services/reasoningCache.ts` | Bincike mai sauri, yana cire mafi tsufa idan sun kai 200 |
| DB     | Teburin `reasoning_cache` (`src/lib/db/`)           | Yana adanawa bayan sake kunnawa, yana samar da ƙididdiga |

Ana rubutawa zuwa duka biyun. Karatu yana fara duba memory, sannan ya koma DB idan ba a samu ba (abubuwan da aka samu daga DB ana mayar da su cikin memory). Gazawar DB ba ta dakatar da aiki — cache na cikin memory yana ci gaba da hidimar hanyar da aka fi amfani da ita.

**Ƙimomin asali:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Matsakaicin adadin abubuwan memory: `200` (`MAX_MEMORY_ENTRIES`)
- Cirewa: mafi tsohon `createdAt` da farko

## Tsarin Bayanai na Database

Migration: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Fihirisa: `expires_at`, `provider`, `model`, `created_at`. Ana adana `expires_at` a matsayin daƙiƙun zamanin Unix; matakin SELECT yana daidaita tsoffin ƙimomin rubutu ta hanyar `EXPIRES_AT_EPOCH_SQL`.

## Gano Mai Bayarwa / Samfuri

Ana kunna sake kunnawa idan `requiresReasoningReplay(provider, model)` ya dawo da `true`. Wannan aikin yana duba jerin abubuwa guda biyu a cikin `open-sse/services/reasoningCache.ts`.

**ID ɗin masu bayarwa (daidaituwa kai tsaye, ba tare da la’akari da manyan ko ƙananan haruffa ba):**

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

**Tsarin regex na samfura (ba tare da la’akari da manyan ko ƙananan haruffa ba):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` da `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, ƙarshen `-free` na zaɓi)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Ƙara sabon mai bayarwa/samfuri mai tsauraran ƙa’idoji yana nufin ƙara shi zuwa ɗaya daga cikin waɗannan jerin tare da rubuta gwajin naúra da ke tabbatar da shigar da sake kunnawa. Bayanin PR ya kamata ya kawo ainihin saƙon 400 daga tushen sama wanda ya sa aka yi canjin.

## REST API

Ma’ajin wucin-gadi yana bayyana hanyoyin shiga guda biyu a ƙarƙashin `src/app/api/cache/reasoning/route.ts`. Dukansu suna buƙatar tantancewar gudanarwa (`isAuthenticated` daga `@/shared/utils/apiAuth`).

| Hanya  | Wurin Shiga                                               | Bayani                                                                    |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Ƙididdiga + shigarwar da aka rarraba zuwa shafuka                         |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Jerin da aka tace (`limit` an taƙaita shi zuwa `[1, 200]`)                |
| DELETE | `/api/cache/reasoning`                                    | Share komai (memory + DB) sannan a sake saita ƙididdigar samu/rashin samu |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Share shigarwar mai bayarwa guda ɗaya kawai                               |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Share shigarwa guda ɗaya                                                  |

**Tsarin amsar GET:**

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

## Bayanan Aiki

- **Tsaftacewa:** `cleanupReasoningCache()` yana share bayanan ƙwaƙwalwar da wa’adinsu ya ƙare kuma yana gudanar da `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Ma’aikatan duba-lafiya suna kiran wannan lokaci-lokaci.
- **Farfadowa bayan rushewa:** Bayan sake farawa, ƙwaƙwalwa tana zama babu komai amma DB har yanzu yana riƙe da bayanan da wa’adinsu bai ƙare ba. Neman farko na wani `tool_call_id` yana samun bayanai daga DB; nema na gaba yana samun bayanai daga ƙwaƙwalwa.
- **Babu reasoning, babu cache:** `cacheReasoningFromAssistantMessage` yana mayar da `0` idan saƙon mataimaki ba shi da filin `reasoning_content` / `reasoning`, don haka martanin da ba ya amfani da tunani ba ya jawo wani kuɗi.
- **Ana kuma kayyade rubutawa:** wuraren kira biyu a cikin `chatCore.ts` (wanda ba na streaming ba da kuma na streaming) suna kiran `cacheReasoningFromAssistantMessage()` ne kawai idan `requiresReasoningReplay(provider, model)` ya kasance `true` — wannan ne sharadin da ɓangaren karantawa yake dubawa. Shigarwar da ba sa taɓa mai samar da replay ba za su ƙara biyan kuɗin rubutawa, sabunta index, da try/catch a kan kowane martani mai ɗauke da reasoning ba.
- **Masu samarwa marasa tsauraran ƙa’idoji:** Idan `requiresReasoningReplay` ya kasance `false` kuma tsarin da ake nufi shi ne OpenAI, mai fassara yana **cire** duk wani filin `reasoning_content` daga saƙonnin da ake aikawa — OpenAI Chat Completions ba ya karɓar sa.

## Duba Kuma

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuit breakers, lokutan dakatawa, da kulle-kullen model
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — gano musabbabin kurakuran 400 daga upstream
- Tushen lamba: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migration: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Hanyar API: `src/app/api/cache/reasoning/route.ts`
- Matsala ta asali: #1628
