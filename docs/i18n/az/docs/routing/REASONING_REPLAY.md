# Reasoning Replay Cache (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Əsas mənbə:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Son yenilənmə:** 2026-06-28 — v3.8.40

OmniRoute düşünmə rejimli modellər tərəfindən yaradılan köməkçi `reasoning_content` məzmununu qeydə alır və yuxarı axın provayderi bunu tələb etdikdə çoxgedişli sorğularda şəffaf şəkildə təkrar istifadə edir. Bu, müştərinin söhbət tarixçəsində əvvəlki gedişin əsaslandırması olmadıqda sərt provayderlərin qaytardığı HTTP 400 xətalarını aradan qaldırır.

## Bunun mövcud olma səbəbi

Bir neçə düşünmə rejimli provayder **əvvəlki köməkçi mesajına orijinal `reasoning_content` daxil edilmədikdə** növbəti gedişi rədd edir. Yuxarı axın aşağıdakı kimi mesajlarla 400 xətası qaytarır:

```
Parametr yanlışdır: Düşünmə rejimində reasoning_content API-yə geri ötürülməlidir.
```

Lakin tipik müştərilər (Cursor, Cline, Roo Code, OpenAI SDK) təkrar göndərdikləri tarixçədən `reasoning_content` sahəsini çıxarır. OmniRoute yuxarı axının gördüyü sorğunun ardıcıl olması üçün onu server tərəfindəki keşdən bərpa edir. #1628 nömrəli məsələ, keşin proses yenidən başladıldıqdan sonra da qorunması üçün hibrid yaddaş/SQLite davamlılığını təqdim etdi.

## Arxitektura

```
N-ci gediş (assistant yaradır):
  → cavab reasoning_content + tool_calls ehtiva edir
  → əgər requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      hər bir tool_call.id ilə açarlanaraq yazır (yaddaş + DB)
  → cavabı müştəriyə yönləndirir (müştəri əsaslandırmanı saxlaya da bilər, saxlamaya da bilər)

N+1-ci gediş (müştəri növbəti sorğunu göndərir):
  → tərcüməçi aşkarlayır: requiresReasoningReplay(provider, model) === true
  → tool_calls olan və reasoning_content olmayan hər bir assistant mesajı üçün:
      lookupReasoning(toolCalls[0].id) → yaddaş → DB
      tapıldı   → msg.reasoning_content = cached; recordReplay()
      tapılmadı → msg.reasoning_content = "" (köhnə DeepSeek üçün əvvəlki davranışa keçid)
  → yuxarı axın ardıcıl tarixçə görür → 400 xətası yoxdur
```

Qeydəalma `open-sse/handlers/chatCore.ts` daxilində (iki yerdə, iki `cacheReasoningFromAssistantMessage` çağırış nöqtəsində) baş verir. Təkrar oynatma `open-sse/translator/index.ts` daxilində, sxemə uyğunlaşdırmadan sonra, lakin göndərişdən əvvəl baş verir.

Adi (alət çağırışı olmayan) assistant gedişləri fərqli şəkildə açarlanır: `buildAssistantMessageCacheKey()` sessiya əhatəsini və həmin gedişə qədər normallaşdırılmış OpenAI formatlı transkripti həzm edir, çünki `tools` mövcud olduqda DeepSeek _hər bir_ əvvəlki gedişin əsaslandırmasını tələb edir. Responses API hədəfləri üçün (məsələn, `/responses` ünvanına yönləndirilən `opencode-go/deepseek-v4-flash`) yuxarı axın gövdəsi `messages` deyil, `input` daşıyır; buna görə də `translateRequest()` (`open-sse/translator/index.ts`) həzm etdiyi aralıq transkripti callback seçimi vasitəsilə bildirir və qeydəalma nöqtələri həmin transkripti eyni qaydada həzm edir. Responses təkrar oynatma mərhələsi hər bir mənbə formatı üçün OpenAI aralıq təqdimatı üzərində işləyir, buna görə Anthropic Messages müştəriləri (Claude → OpenAI → Responses) üçün də təkrar oynatma həyata keçirilir.

## Saxlama — Hibrid yaddaş + SQLite

Tez-tez istifadə olunan yol qəza sonrası bərpa və idarəetmə panelində görünürlük üçün SQLite cədvəli ilə dəstəklənən yaddaşdaxili `Map`-dən (yaradılma vaxtına görə LRU) istifadə edir.

| Təbəqə | Reallaşdırma                                          | Məqsəd                                                         |
| ------ | ----------------------------------------------------- | -------------------------------------------------------------- |
| Yaddaş | `open-sse/services/reasoningCache.ts` daxilində `Map` | Sürətli axtarışlar, 200 olduqda ən köhnəni silir               |
| DB     | `reasoning_cache` cədvəli (`src/lib/db/`)             | Yenidən başlatmalar arasında saxlanır, statistikanı təmin edir |

Yazılar hər ikisinə edilir. Oxumalar əvvəlcə yaddaşı yoxlayır, sonra isə DB-yə müraciət edir (DB-də tapılan nəticələr yenidən yaddaşa köçürülür). DB nasazlıqları kritik deyil — yaddaşdaxili keş tez-tez istifadə olunan yola xidmət göstərməyə davam edir.

**Standart dəyərlər:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Yaddaşdakı maksimum qeyd sayı: `200` (`MAX_MEMORY_ENTRIES`)
- Çıxarılma: əvvəlcə ən köhnə `createdAt`

## Verilənlər bazası sxemi

Miqrasiya: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

İndekslər: `expires_at`, `provider`, `model`, `created_at`. `expires_at` Unix epoxası saniyələri kimi saxlanılır; SELECT təbəqəsi köhnə mətn dəyərlərini `EXPIRES_AT_EPOCH_SQL` vasitəsilə normallaşdırır.

## Provayder / Model Aşkarlanması

`requiresReasoningReplay(provider, model)` funksiyası `true` qaytardıqda təkrar oynatma aktivləşdirilir. Funksiya `open-sse/services/reasoningCache.ts` faylındakı iki siyahını yoxlayır.

**Provayder ID-ləri (dəqiq uyğunluq, böyük-kiçik hərfə həssas deyil):**

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

**Model üçün regex nümunələri (böyük-kiçik hərfə həssas deyil):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` və `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, istəyə bağlı `-free` şəkilçisi)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Yeni sərt provayder/model əlavə etmək bu siyahılardan birinə element əlavə etməyi və təkrar oynatmanın daxil edilməsini təsdiqləyən vahid test yazmağı nəzərdə tutur. PR təsvirində dəyişikliyə səbəb olan yuxarı mənbənin dəqiq 400 sətri göstərilməlidir.

## REST API

Keş `src/app/api/cache/reasoning/route.ts` altında iki endpoint təqdim edir. Hər ikisi idarəetmə autentifikasiyası (`@/shared/utils/apiAuth` modulundan `isAuthenticated`) tələb edir.

| Metod  | Endpoint                                                  | Təsvir                                                                           |
| ------ | --------------------------------------------------------- | -------------------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistika + səhifələnmiş qeydlər                                                |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrlənmiş siyahı (`limit` `[1, 200]` aralığına məhdudlaşdırılır)               |
| DELETE | `/api/cache/reasoning`                                    | Hər şeyi (yaddaş + DB) təmizləyir və uğurlu/uğursuz tapılma saylarını sıfırlayır |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Yalnız bir provayderə aid qeydləri təmizləyir                                    |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Tək bir qeydi silir                                                              |

**GET cavabının strukturu:**

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

## Əməliyyat Qeydləri

- **Təmizləmə:** `cleanupReasoningCache()` müddəti bitmiş yaddaş qeydlərini silir və `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` sorğusunu icra edir. Sağlamlıq yoxlaması işçiləri bunu vaxtaşırı çağırır.
- **Qəzadan sonra bərpa:** Yenidən başladıldıqdan sonra yaddaş boş olur, lakin DB müddəti bitməmiş qeydləri saxlamağa davam edir. Verilmiş `tool_call_id` üçün ilk axtarış DB-də uğurlu tapılma, sonrakı axtarışlar isə yaddaşda uğurlu tapılma olur.
- **Əsaslandırma yoxdursa, keş də yoxdur:** Assistent mesajında `reasoning_content` / `reasoning` sahəsi olmadıqda `cacheReasoningFromAssistantMessage` `0` qaytarır, buna görə düşünmə tələb etməyən cavablar heç bir xərc yaratmır.
- **Yazma da şərtlə idarə olunur:** `chatCore.ts` daxilindəki hər iki çağırış nöqtəsi (axınsız və axınlı) yalnız `requiresReasoningReplay(provider, model)` `true` olduqda `cacheReasoningFromAssistantMessage()` funksiyasını çağırır — bu, oxuma tərəfinin yoxladığı eyni predikatdır. Heç vaxt təkrar oynatma provayderindən istifadə etməyən quraşdırmalar əsaslandırma ehtiva edən hər cavab üçün yazma, indeks yeniləməsi və try/catch xərclərini artıq ödəmir.
- **Sərt olmayan provayderlər:** `requiresReasoningReplay` `false` olduqda və hədəf format OpenAI olduqda tərcüməçi gedən mesajlardan bütün `reasoning_content` sahələrini **çıxarır** — OpenAI Chat Completions bunu qəbul etmir.

## Həmçinin baxın

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — dövrə kəsiciləri, soyuma müddətləri, model bloklamaları
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — yuxarı axındakı 400 xətalarının diaqnostikası
- Mənbə: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Miqrasiya: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API marşrutu: `src/app/api/cache/reasoning/route.ts`
- İlkin problem: #1628
