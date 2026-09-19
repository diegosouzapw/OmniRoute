# Reasoning Replay Cache (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Tushen gaskiya:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Sabuntawa ta ƙarshe:** 2026-06-28 — v3.8.40

OmniRoute yana ɗaukar `reasoning_content` na mataimaki wanda samfuran yanayin tunani suka samar, sannan ya sake amfani da shi ta atomatik a buƙatun da ke da zagaye da yawa idan mai samar da sabis na sama ya buƙaci hakan. Wannan yana kawar da kurakuran HTTP 400 da tsauraran masu samar da sabis ke bayarwa idan tarihin tattaunawar abokin ciniki bai ƙunshi tunanin zagayen da ya gabata ba.

## Dalilin Samuwar Wannan

Wasu masu samar da sabis na yanayin tunani suna ƙin karɓar zagaye na gaba sai idan **saƙon mataimaki na baya ya ƙunshi ainihin `reasoning_content`**. Sabis na sama yana mayar da 400 tare da saƙonni kamar:

```
Siga Ba Daidai Ba: Dole ne a mayar da reasoning_content na yanayin tunani zuwa ga API.
```

Amma abokan ciniki na yau da kullum (Cursor, Cline, Roo Code, OpenAI SDK) suna cire `reasoning_content` daga tarihin da suke sake aikawa. OmniRoute yana maido da shi daga ma'ajiyar wucin gadi ta gefen uwar garke domin buƙatar da sabis na sama yake gani ta kasance daidaitacciya. Batu #1628 ya gabatar da adanawar haɗin ƙwaƙwalwa/SQLite domin ma'ajiyar wucin gadi ta ci gaba da kasancewa bayan sake kunna tsarin.

## Tsarin Gine-gine

```
Zagaye na N (mataimaki yana samarwa):
  → amsa tana ɗauke da reasoning_content + tool_calls
  → idan requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      yana rubutawa (ƙwaƙwalwa + DB), tare da amfani da kowane tool_call.id a matsayin maɓalli
  → aika amsa zuwa ga abokin ciniki (wanda zai iya ko ba zai iya riƙe reasoning ba)

Zagaye na N+1 (abokin ciniki yana aika saƙon biyo baya):
  → mai fassara yana gano: requiresReasoningReplay(provider, model) === true
  → ga kowane saƙon mataimaki mai tool_calls kuma marar reasoning_content:
      lookupReasoning(toolCalls[0].id) → ƙwaƙwalwa → DB
      an samu  → msg.reasoning_content = cached; recordReplay()
      ba a samu ba → msg.reasoning_content = "" (madadin tsohon tsari don tsofaffin nau'ikan DeepSeek)
  → tsarin sama yana ganin daidaitaccen tarihi → babu 400
```

Ana yin kamawa a cikin `open-sse/handlers/chatCore.ts` (a wurare biyu, a wuraren kiran `cacheReasoningFromAssistantMessage` guda biyu). Ana yin sake kunnawa a cikin `open-sse/translator/index.ts` bayan tilasta daidaiton tsari amma kafin aikawa.

Zagayen mataimaki na yau da kullum (marasa kiran kayan aiki) suna amfani da maɓalli ta wata hanya dabam: `buildAssistantMessageCacheKey()` yana samar da digest na iyakar zaman tare da rubutaccen tarihin tattaunawa na tsarin OpenAI da aka daidaita har zuwa wannan zagayen, saboda DeepSeek yana buƙatar reasoning na _kowane_ zagayen da ya gabata da zarar `tools` yana nan. Ga wuraren da Responses-API ke nufa (misali `opencode-go/deepseek-v4-flash`, wanda ake bi da shi zuwa `/responses`) jikin buƙatar da ake aikawa zuwa tsarin sama yana ɗauke da `input`, ba `messages` ba, don haka `translateRequest()` (`open-sse/translator/index.ts`) yana bayar da rahoton rubutaccen tarihin pivot da ya samar masa da digest ta hanyar zaɓin callback, sannan wuraren kamawa su samar da digest na wannan rubutaccen tarihin iri ɗaya. Matakin sake kunnawa na Responses yana gudana a kan pivot na OpenAI ga kowane tsarin tushe, don haka ana sake kunna abokan cinikin Anthropic Messages (Claude → OpenAI → Responses) su ma.

## Adanawa — Haɗin Ƙwaƙwalwa + SQLite

Hanyar da aka fi amfani da ita tana amfani da `Map` na cikin ƙwaƙwalwa (LRU bisa lokacin ƙirƙira), wanda teburin SQLite ke tallafa masa domin dawo da bayanai bayan durƙushewar tsarin da kuma nuna bayanai a dashboard.

| Mataki    | Aiwatarwa                                           | Manufa                                                     |
| --------- | --------------------------------------------------- | ---------------------------------------------------------- |
| Ƙwaƙwalwa | `Map` a cikin `open-sse/services/reasoningCache.ts` | Bincike cikin sauri, yana cire mafi tsufa idan sun kai 200 |
| DB        | Teburin `reasoning_cache` (`src/lib/db/`)           | Yana adanawa bayan sake kunnawa, yana samar da ƙididdiga   |

Rubuce-rubuce suna zuwa wuraren biyu. Karatu yana fara duba ƙwaƙwalwa, sannan ya koma DB idan ba a samu ba (abubuwan da aka samu a DB ana mayar da su cikin ƙwaƙwalwa). Gazawar DB ba ta dakatar da aiki — ma'ajiyar wucin gadi ta cikin ƙwaƙwalwa tana ci gaba da gudanar da hanyar da aka fi amfani da ita.

**Tsoffin ƙimomi:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Matsakaicin adadin bayanai a ƙwaƙwalwa: `200` (`MAX_MEMORY_ENTRIES`)
- Cirewa: mafi tsohon `createdAt` da farko

## Tsarin Bayanai na Database

Hijira: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Fihirisa: `expires_at`, `provider`, `model`, `created_at`. Ana adana `expires_at` a matsayin daƙiƙun Unix epoch; matakin SELECT yana daidaita tsofaffin ƙimomin rubutu ta hanyar `EXPIRES_AT_EPOCH_SQL`.

## Gano Mai Samarwa / Samfuri

Ana kunna sake kunnawa idan `requiresReasoningReplay(provider, model)` ya dawo da `true`. Wannan aikin yana duba jerin abubuwa biyu a cikin `open-sse/services/reasoningCache.ts`.

**ID na masu samarwa (daidaituwa kai tsaye, ba tare da la’akari da manyan ko ƙananan haruffa ba):**

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

**Tsarukan regex na samfura (ba tare da la’akari da manyan ko ƙananan haruffa ba):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` da `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, tare da zaɓin ƙarin `-free` a ƙarshe)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Ƙara sabon mai samarwa/samfuri mai tsauraran ƙa’idoji yana nufin ƙara shi a ɗaya daga cikin waɗannan jerin sannan a rubuta gwajin raka’a da ke tabbatar da shigar da sake kunnawa. Bayanin PR ya kamata ya ambaci ainihin saƙon 400 na upstream wanda ya sa aka yi canjin.

## REST API

Ma’ajiyar bayanan wucin gadi tana samar da endpoints guda biyu a ƙarƙashin `src/app/api/cache/reasoning/route.ts`. Dukansu suna buƙatar tantancewar gudanarwa (`isAuthenticated` daga `@/shared/utils/apiAuth`).

| Hanya  | Endpoint                                                  | Bayani                                                               |
| ------ | --------------------------------------------------------- | -------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Ƙididdiga + bayanan da aka raba zuwa shafuka                         |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Jerin da aka tace (`limit` an taƙaita shi zuwa `[1, 200]`)           |
| DELETE | `/api/cache/reasoning`                                    | Share komai (ƙwaƙwalwa + DB) sannan a sake saita ƙididdigar hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Share bayanan mai samarwa guda ɗaya kawai                            |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Share bayani guda ɗaya                                               |

**Tsarin martanin GET:**

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

- **Tsaftacewa:** `cleanupReasoningCache()` yana cire bayanan ƙwaƙwalwar da wa’adinsu ya ƙare sannan ya gudanar da `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Ma’aikatan duba lafiyar tsarin suna kiran wannan lokaci-lokaci.
- **Farfadowa bayan durƙushewa:** Bayan sake farawa, ƙwaƙwalwar ba ta da komai amma DB har yanzu yana riƙe da bayanan da wa’adinsu bai ƙare ba. Neman farko na wani `tool_call_id` zai samu daga DB; nema na gaba zai samu daga ƙwaƙwalwa.
- **Babu tunani, babu ajiyar wucin gadi:** `cacheReasoningFromAssistantMessage` yana dawo da `0` idan saƙon mataimaki ba shi da filin `reasoning_content` / `reasoning`, don haka martanin da ba na tunani ba ba ya haifar da wani ƙarin nauyi.
- **Rubutawa ma tana da sharaɗi:** wuraren kira biyu a cikin `chatCore.ts` (marar gudana da mai gudana) suna kiran `cacheReasoningFromAssistantMessage()` ne kawai idan `requiresReasoningReplay(provider, model)` ya zama `true` — wannan shi ne ma’aunin da ɓangaren karantawa yake dubawa. Shigarwar da ba sa taɓa amfani da mai samar da sake kunnawa ba sa ɗaukar nauyin rubutawa, sabunta index, da try/catch a kan kowane martani mai ɗauke da tunani.
- **Masu samarwa marasa tsauraran ƙa’idoji:** Idan `requiresReasoningReplay` ya zama `false` kuma tsarin da ake nufi OpenAI ne, mai fassara yana **cire** duk wani filin `reasoning_content` daga saƙonnin da za a aika — OpenAI Chat Completions ba ya karɓar sa.

## Duba Kuma

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — masu katse da'ira, lokutan jira, kulle-kullen samfuri
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — gano matsalolin 400 daga sabis na sama
- Tushen lamba: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Ƙaura: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Hanyar API: `src/app/api/cache/reasoning/route.ts`
- Matsala ta asali: #1628
