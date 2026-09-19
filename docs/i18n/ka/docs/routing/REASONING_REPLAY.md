# Reasoning Replay Cache (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **ჭეშმარიტების წყარო:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **ბოლოს განახლდა:** 2026-06-28 — v3.8.40

OmniRoute იღებს აზროვნების რეჟიმის მოდელების მიერ გენერირებულ ასისტენტის `reasoning_content`-ს და გამჭვირვალედ ხელახლა გადასცემს მას მრავალსვლიან მოთხოვნებში, როდესაც ამას ზედა დონის პროვაიდერი მოითხოვს. ეს გამორიცხავს HTTP 400 შეცდომებს, რომლებსაც მკაცრი პროვაიდერები აბრუნებენ, როდესაც კლიენტის საუბრის ისტორიაში წინა სვლის მსჯელობა არ არის.

## რატომ არსებობს ეს

აზროვნების რეჟიმის რამდენიმე პროვაიდერი უარყოფს მომდევნო სვლას, თუ **ასისტენტის წინა შეტყობინება თავდაპირველ `reasoning_content`-ს არ შეიცავს**. ზედა დონის სერვისი აბრუნებს 400 შეცდომას მსგავსი შეტყობინებებით:

```
არასწორი პარამეტრი: აზროვნების რეჟიმში reasoning_content ხელახლა უნდა გადაეცეს API-ს.
```

თუმცა ტიპური კლიენტები (Cursor, Cline, Roo Code, OpenAI SDK) ხელახლა გადაცემული ისტორიიდან `reasoning_content`-ს შლიან. OmniRoute აღადგენს მას სერვერის მხარეს არსებული კეშიდან, რათა ზედა დონის სერვისის მიერ მიღებული მოთხოვნა თანმიმდევრული იყოს. საკითხმა #1628 დანერგა მეხსიერებისა და SQLite-ის ჰიბრიდული პერმანენტული შენახვა, რათა კეში პროცესის ხელახლა გაშვების შემდეგაც შენარჩუნდეს.

## არქიტექტურა

```
სვლა N (ასისტენტი აგენერირებს):
  → პასუხი შეიცავს reasoning_content-სა და tool_calls-ს
  → თუ requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      წერს (მეხსიერება + DB), გასაღებად იყენებს თითოეულ tool_call.id-ს
  → პასუხს გადასცემს კლიენტს (რომელმაც მსჯელობა შეიძლება შეინარჩუნოს ან არ შეინარჩუნოს)

სვლა N+1 (კლიენტი აგზავნის მომდევნო მოთხოვნას):
  → მთარგმნელი ადგენს: requiresReasoningReplay(provider, model) === true
  → ასისტენტის თითოეული შეტყობინებისთვის, რომელსაც აქვს tool_calls და არ აქვს reasoning_content:
      lookupReasoning(toolCalls[0].id) → მეხსიერება → DB
      ნაპოვნია  → msg.reasoning_content = cached; recordReplay()
      ვერ მოიძებნა → msg.reasoning_content = "" (მემკვიდრეობითი სარეზერვო ქცევა ძველი DeepSeek-ისთვის)
  → ზედა დონის სერვისი იღებს თანმიმდევრულ ისტორიას → 400 შეცდომა აღარ არის
```

მიღება ხდება `open-sse/handlers/chatCore.ts`-ში (ორ ადგილას, `cacheReasoningFromAssistantMessage`-ის გამოძახების ორ წერტილში). ხელახლა გადაცემა ხდება `open-sse/translator/index.ts`-ში, სქემის იძულებითი გარდაქმნის შემდეგ, მაგრამ გაგზავნამდე.

## საცავი — მეხსიერებისა და SQLite-ის ჰიბრიდი

სწრაფი გზა იყენებს მეხსიერებაში არსებულ `Map`-ს (LRU შექმნის დროის მიხედვით), რომელსაც ავარიული აღდგენისა და მართვის პანელში ხილვადობისთვის SQLite-ის ცხრილი უდევს საფუძვლად.

| ფენა       | იმპლემენტაცია                                      | დანიშნულება                                               |
| ---------- | -------------------------------------------------- | --------------------------------------------------------- |
| მეხსიერება | `Map` ფაილში `open-sse/services/reasoningCache.ts` | სწრაფი ძიება, 200 ჩანაწერისას შლის ყველაზე ძველს          |
| DB         | `reasoning_cache` ცხრილი (`src/lib/db/`)           | ინახება ხელახლა გაშვებებს შორის, უზრუნველყოფს სტატისტიკას |

ჩაწერა ორივეგან ხდება. წაკითხვა ჯერ მეხსიერებას ამოწმებს, შემდეგ კი DB-ს მიმართავს (DB-ში ნაპოვნი ჩანაწერები კვლავ მეხსიერებაში გადადის). DB-ის შეცდომები ფატალური არ არის — მეხსიერებაში არსებული კეში სწრაფი გზის მომსახურებას განაგრძობს.

**ნაგულისხმევი მნიშვნელობები:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- მეხსიერების ჩანაწერების მაქსიმალური რაოდენობა: `200` (`MAX_MEMORY_ENTRIES`)
- ჩანაწერების წაშლა: ჯერ ყველაზე ძველი `createdAt`

## მონაცემთა ბაზის სქემა

მიგრაცია: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

ინდექსები: `expires_at`, `provider`, `model`, `created_at`. `expires_at` ინახება Unix ეპოქის წამების სახით; SELECT ფენა მემკვიდრეობით ტექსტურ მნიშვნელობებს `EXPIRES_AT_EPOCH_SQL`-ის მეშვეობით ახდენს ნორმალიზებას.

## პროვაიდერის / მოდელის გამოვლენა

ხელახალი დაკვრა ჩართულია, როდესაც `requiresReasoningReplay(provider, model)` აბრუნებს `true`-ს. ფუნქცია ამოწმებს ორ სიას ფაილში `open-sse/services/reasoningCache.ts`.

**პროვაიდერის ID-ები (ზუსტი დამთხვევა, რეგისტრის გაუთვალისწინებლად):**

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

**მოდელის რეგულარული გამოსახულების შაბლონები (რეგისტრის გაუთვალისწინებლად):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` და `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, არასავალდებულო `-free` სუფიქსით)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

ახალი მკაცრი პროვაიდერის/მოდელის დასამატებლად საჭიროა მისი ერთ-ერთ ამ სიაში ჩამატება და ერთეულოვანი ტესტის დაწერა, რომელიც ხელახალი დაკვრის ჩასმას ადასტურებს. PR-ის აღწერაში მითითებული უნდა იყოს ზუსტი ზედა დონის 400 შეცდომის ტექსტი, რომელმაც ცვლილება განაპირობა.

## REST API

ქეში ხელმისაწვდომს ხდის ორ საბოლოო წერტილს `src/app/api/cache/reasoning/route.ts`-ის ქვეშ. ორივე მოითხოვს მართვის ავტორიზაციას (`isAuthenticated` მოდულიდან `@/shared/utils/apiAuth`).

| მეთოდი | საბოლოო წერტილი                                           | აღწერა                                                                    |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | სტატისტიკა + გვერდებად დაყოფილი ჩანაწერები                                |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | გაფილტრული სია (`limit` შეზღუდულია `[1, 200]` დიაპაზონით)                 |
| DELETE | `/api/cache/reasoning`                                    | ყველაფრის გასუფთავება (მეხსიერება + DB) და hit/miss მრიცხველების განულება |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | მხოლოდ ერთი პროვაიდერის ჩანაწერების გასუფთავება                           |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | ერთი ჩანაწერის წაშლა                                                      |

**GET პასუხის სტრუქტურა:**

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

## საოპერაციო შენიშვნები

- **გასუფთავება:** `cleanupReasoningCache()` შლის მეხსიერებიდან ვადაგასულ ჩანაწერებს და ასრულებს `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` მოთხოვნას. მდგომარეობის შემოწმების მუშაკები ამას პერიოდულად იძახებენ.
- **ავარიული შეწყვეტის შემდეგ აღდგენა:** ხელახლა გაშვების შემდეგ მეხსიერება ცარიელია, მაგრამ DB-ში ვადაგაუსვლელი ჩანაწერები კვლავ რჩება. მოცემული `tool_call_id`-ისთვის პირველი მოძიება DB-ში მოხვედრაა; მომდევნო მოძიებები კი მეხსიერებაში მოხვედრებია.
- **მსჯელობის გარეშე ქეშიც არ არის:** `cacheReasoningFromAssistantMessage` აბრუნებს `0`-ს, როდესაც ასისტენტის შეტყობინებას არ აქვს `reasoning_content` / `reasoning` ველი, ამიტომ მსჯელობის არმქონე პასუხები არაფერს ხარჯავს.
- **ჩაწერაც პირობითია:** `chatCore.ts`-ში ორივე გამოძახების ადგილი (ნაკადური და არანაკადური) `cacheReasoningFromAssistantMessage()`-ს მხოლოდ მაშინ იძახებს, როდესაც `requiresReasoningReplay(provider, model)` არის `true` — ეს იგივე პრედიკატია, რომელსაც წაკითხვის მხარე ამოწმებს. ინსტალაციები, რომლებიც ხელახალი დაკვრის პროვაიდერს არასდროს იყენებენ, აღარ იხდიან ჩაწერის, ინდექსის განახლებისა და ყველა მსჯელობის შემცველ პასუხზე try/catch-ის შესრულების საფასურს.
- **არამკაცრი პროვაიდერები:** როდესაც `requiresReasoningReplay` არის `false` და სამიზნე ფორმატია OpenAI, მთარგმნელი გამავალ შეტყობინებებს `reasoning_content` ველს **აცილებს** — OpenAI Chat Completions მას არ იღებს.

## აგრეთვე იხილეთ

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ამომრთველები, შეყოვნების პერიოდები, მოდელის ბლოკირებები
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — ზემდგომი სერვისიდან მიღებული 400 შეცდომების დიაგნოსტიკა
- საწყისი კოდი: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- მიგრაცია: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API მარშრუტი: `src/app/api/cache/reasoning/route.ts`
- თავდაპირველი საკითხი: #1628
