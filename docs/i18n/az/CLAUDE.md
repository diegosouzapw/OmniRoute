# CLAUDE.md (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Bu fayl, bu depo ilə işləyərkən Claude Code (claude.ai/code) üçün rəhbərlik təqdim edir.

## Tez Başlama

```bash
npm install                    # Asılılıqları quraşdırın (auto-generates .env from .env.example)
npm run dev                    # Dev server http://localhost:20128
npm run build                  # İstehsal üçün qurma (Next.js 16 müstəqil)
npm run lint                   # ESLint (0 səhv gözlənilir; xəbərdarlıqlar mövcuddur)
npm run typecheck:core         # TypeScript yoxlaması (təmiz olmalıdır)
npm run typecheck:noimplicit:core  # Sıx yoxlama (implicit any olmamalıdır)
npm run test:coverage          # Birlik testləri + əhatə qapısı (75/75/75/70 — ifadələr/sətirlər/funksiyalar/şöbələr)
npm run check                  # lint + test birləşdirilmiş
npm run check:cycles           # Dairəvi asılılıqları aşkar et
```

### Testləri İcra Etmək

```bash
# Tək test faylı (Node.js yerli test icraçısı — əksər testlər)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# Bütün dəstlər
npm run test:all
```

Tam test matrisası üçün `CONTRIBUTING.md` → "Testləri İcra Etmək" bölməsinə baxın. Dərin arxitektura üçün `AGENTS.md`-ə baxın.

---

## Layihəyə Qısa Baxış

**OmniRoute** — birləşdirilmiş AI proxy/router. Bir uç nöqtə, 160+ LLM təminatçısı, avtomatik geri dönmə.

| Təbəqə        | Yer                     | Məqsəd                                                          |
| ------------- | ----------------------- | --------------------------------------------------------------- |
| API Yolları   | `src/app/api/v1/`       | Next.js App Router — giriş nöqtələri                            |
| İdarəedicilər | `open-sse/handlers/`    | Sorğu emalı (söhbət, embedding və s.)                           |
| İcraçılar     | `open-sse/executors/`   | Təminatçıya spesifik HTTP göndərişi                             |
| Tercüməçilər  | `open-sse/translator/`  | Format çevrilməsi (OpenAI↔Claude↔Gemini)                        |
| Transformator | `open-sse/transformer/` | Cavablar API ↔ Söhbət Tamamlamaları                             |
| Xidmətlər     | `open-sse/services/`    | Kombinasiya yönləndirmə, sürət limitləri, keşləmə və s.         |
| Veritabanı    | `src/lib/db/`           | SQLite domen modulları (45+ fayl, 55 köçürmə)                   |
| Domen/Siyasət | `src/domain/`           | Siyasət mühərriki, xərc qaydaları, geri dönmə məntiqi           |
| MCP Server    | `open-sse/mcp-server/`  | 37 alət (30 əsas + 3 yaddaş + 4 bacarıq), 3 nəqliyyat, ~13 sahə |
| A2A Server    | `src/lib/a2a/`          | JSON-RPC 2.0 agent protokolu                                    |
| Bacarıqlar    | `src/lib/skills/`       | Genişləndirilə bilən bacarıq çərçivəsi                          |
| Yaddaş        | `src/lib/memory/`       | Davamlı söhbət yaddaşı                                          |

Monorepo: `src/` (Next.js 16 tətbiqi), `open-sse/` (axın mühərriki iş sahəsi), `electron/` (masaüstü tətbiqi), `tests/`, `bin/` (CLI giriş nöqtəsi).

---

## İstək Boru Kəməri

```
Müştəri → /v1/chat/completions (Next.js marşrutu)
  → CORS → Zod təsdiqi → auth? → siyasət yoxlaması → prompt injection guard
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → keş yoxlaması → sürət limiti → kombinasiyalı marşrutlama?
      → resolveComboTargets() → handleSingleModel() hədəf üzrə
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry w/ backoff
    → cavab tərcüməsi → SSE axını və ya JSON
    → Əgər Responses API: responsesTransformer.ts TransformStream
```

API marşrutları ardıcıl bir nümunəni izləyir: `Marşrut → CORS əvvəlcədən yoxlama → Zod bədən təsdiqi → İstəyə bağlı auth (extractApiKey/isValidApiKey) → API açar siyasətinin icrası → Handler delegasiyası (open-sse)`. Qlobal Next.js middleware yoxdur — müdaxilə marşrut spesifikdir.

**Kombinasiyalı marşrutlama** (`open-sse/services/combo.ts`): 14 strategiya (prioritet, çəkili, ilk doldur, dövrü, P2C, təsadüfi, ən az istifadə olunan, xərclərə optimallaşdırılmış, sıfırlama ilə tanış, sərt-təsadüfi, avtomatik, lkgp, kontekstə optimallaşdırılmış, kontekst-relay). Hər bir hədəf `handleSingleModel()` çağırır ki, bu da `handleChatCore()`-u hədəf üzrə səhv idarəetmə və dövrə qırıcı yoxlamaları ilə sarır. 9-faktorlu Auto-Combo ballandırma üçün `docs/routing/AUTO-COMBO.md`-a və 3 davamlılıq qatları üçün `docs/architecture/RESILIENCE_GUIDE.md`-a baxın.

---

## Davamlılıq İcraat Vəziyyəti

OmniRoute-un üç əlaqəli, lakin fərqli müvəqqəti uğursuzluq mexanizmi var. Marşrut davranışını düzəldərkən onların
sahəsini ayrı saxlayın. Bir baxışda xəritə üçün
[3-laylı davamlılıq diaqramı](./docs/diagrams/exported/resilience-3layers.svg)
(mənbə: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))-na baxın.

### Təchizatçı Dövrə Qırıcı

**Sahə**: tam təchizatçı, məsələn, `glm`, `openai`, `anthropic`.

**Məqsəd**: üst səviyyədə/xidmət səviyyəsində dəfələrlə uğursuz olan bir təchizatçıya trafik göndərməni dayandırmaq, beləliklə, bir sağlam olmayan təchizatçı hər bir istəyi yavaşlatmır.

**İcra**:

- Əsas sinif: `src/shared/utils/circuitBreaker.ts`
- Chat qapısı/icra kabelləri: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- İcraat statusu API: `src/app/api/monitoring/health/route.ts`
- Paylaşılan sarğılar: `open-sse/services/accountFallback.ts`
- Davamlı vəziyyət cədvəli: `domain_circuit_breakers`

**Vəziyyətlər**:

- `CLOSED`: normal trafikə icazə verilir.
- `OPEN`: təchizatçı müvəqqəti bloklanmışdır; çağıranlar təchizatçı-dövrə-açıq cavabı alır
  və ya kombinasiyalı marşrutlama başqa bir hədəfə keçir.
- `HALF_OPEN`: sıfırlama vaxtı keçmişdir; bir sınaq istəyi icazə verilir. Uğur dövrəni bağlayır,
  uğursuzluq onu yenidən açır.

**Standartlar** (`open-sse/config/constants.ts`):

- OAuth təchizatçıları: hədd `3`, sıfırlama vaxtı `60s`.
- API-açar təchizatçıları: hədd `5`, sıfırlama vaxtı `30s`.
- Yerli təchizatçılar: hədd `2`, sıfırlama vaxtı `15s`.

Yalnız təchizatçı səviyyəsində uğursuzluq statusları təchizatçı dövrəsini işə salmalıdır:

```ts
(408, 500, 502, 503, 504);
```

Normal hesab/açar/model xətaları üçün tam təchizatçı dövrəsini işə salmayın, məsələn, əksər
`401`, `403`, və ya `429` halları. Bunlar adətən bağlantı cooldown və ya model
bloklanması ilə bağlıdır. Ümumi bir API-açar təchizatçısı `403` bərpa oluna bilər, əgər o, terminal təchizatçı/hesab xətası kimi təsnif olunmayıbsa.

Dövrə tənbəl bərpa istifadə edir, arxa planda zamanlayıcı deyil. `OPEN` müddəti bitdikdə, `getStatus()`, `canExecute()`, və `getRetryAfterMs()` kimi oxumalar vəziyyəti `HALF_OPEN`-a yeniləyir, beləliklə, panellər və kombinasiyalı namizəd qurucuları bir müddət bitmiş təchizatçını sonsuza qədər istisna etmirlər.

### Bağlantı Cooldown

**Sahə**: bir təchizatçı bağlantısı/hesabı/açar.

**Məqsəd**: eyni təchizatçı üçün digər bağlantıların istəkləri xidmət etməyə davam etməsinə icazə verərkən bir pis açarı/hesabı müvəqqəti olaraq atlamaq.

**İcra**:

- Yazma/yeni yol: `src/sse/services/auth.ts::markAccountUnavailable()`
- Hesab seçimi/süzgəc: `src/sse/services/auth.ts::getProviderCredentials...`
- Cooldown hesablaması: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Parametrlər: `src/lib/resilience/settings.ts`

Təchizatçı bağlantılarında vacib sahələr:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Hesab seçimi zamanı, bir bağlantı atlanır, əgər:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldown-lar da tənbəldir: `rateLimitedUntil` keçmişdə olduqda, bağlantı yenidən uyğun olur. Uğurlu istifadə zamanı, `clearAccountError()` `testStatus`, `rateLimitedUntil`, xəta sahələrini və `backoffLevel`-i təmizləyir.

Standart bağlantı cooldown davranışı:

- OAuth əsas cooldown: `5s`.
- API-açar əsas cooldown: `3s`.
- API-açar `429` mövcud olduqda upstream retry işarələrini (`Retry-After`, sıfırlama başlıqları, və ya
  parseable sıfırlama mətni) üstün tutmalıdır.
- Təkrarlanan bərpa olunan uğursuzluqlar eksponensial geriyə çəkilmə istifadə edir:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Anti-thundering-herd qoruyucusu eyni bağlantıda eyni anda baş verən uğursuzluqların
cooldown-u təkrarlanan şəkildə uzatmasını və ya `backoffLevel`-i ikiqat artırmasını qarşısını alır.

Terminal vəziyyətlər cooldown deyil. `banned`, `expired`, və `credits_exhausted`
kredensiallar/parametrlər dəyişənə qədər və ya bir operator onları sıfırlayana qədər
mövcud olmamalıdır. Terminal vəziyyətləri müvəqqəti cooldown vəziyyəti ilə üst-üstə düşməməlidir.

### Model Bloklanması

**Sahə**: təchizatçı + bağlantı + model.

**Məqsəd**: yalnız bir model mövcud olmadıqda və ya bu bağlantı üçün kvota məhdudlaşdırıldıqda bütün bağlantını deaktiv etməmək.

Məsələn:

- Hər model kvota təchizatçıları `429` qaytarır.
- Bir itkin model üçün `404` qaytaran yerli təchizatçılar.
- Seçilmiş Grok modları kimi təchizatçıya spesifik mod/model icazə uğursuzluqları.

Model bloklanması `open-sse/services/accountFallback.ts`-da yaşayır və eyni
bağlantının digər modelləri xidmət etməyə davam etməsinə icazə verir.

### Düzəltmə Təlimatları

- Əgər bir təchizatçı üçün bütün açarlar atlanırsa, həm təchizatçı dövrə vəziyyətini, həm də hər bir
  bağlantının `rateLimitedUntil`/`testStatus`-ını yoxlayın.
- Əgər bir təchizatçı sıfırlama pəncərəsindən sonra daimi olaraq istisna olunursa, kodun
  `state`-i xam oxuyub-oxumadığını yoxlayın, `getStatus()`/`canExecute()` istifadə etməyi unutmayın.
- Əgər bir təchizatçı açarı uğursuz olursa, lakin digərləri işləməlidirsə, təchizatçı dövrəsindən daha çox bağlantı cooldown-u üstün tutun.
- Əgər yalnız bir model uğursuz olursa, model bloklanmasını bağlantı cooldown-dan daha üstün tutun.
- Əgər bir vəziyyət öz-özünə bərpa olunmalıdırsa, o, gələcək zaman damğası/sıfırlama vaxtı və
  müddəti bitmiş vəziyyəti yeniləyən bir oxuma yolu olmalıdır. Daimi statuslar manual kredensial
  və ya konfiqurasiya dəyişiklikləri tələb edir.

## Əsas Konvensiyalar

### Kod Üslubu

- **2 boşluq**, nöqtəli vergüllər, ikiqat dırnaqlar, 100 simvol genişlik, es5 son vergüllər (lint-staged vasitəsilə Prettier tərəfindən tətbiq olunur)
- **İdxallar**: xarici → daxili (`@/`, `@omniroute/open-sse`) → nisbət
- **Adlandırma**: fayllar=camelCase/kebab, komponentlər=PascalCase, sabitlər=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = hər yerdə səhv; `no-explicit-any` = `open-sse/` və `tests/` içində xəbərdarlıq
- **TypeScript**: `strict: false`, hədəf ES2022, modul esnext, həll edici bundler. Aydın tipləri üstün tutun.

### Veritabanı

- **Həmişə** `src/lib/db/` domen modulları vasitəsilə keçin — **heç vaxt** marşrutlarda və ya handler-lərdə xam SQL yazmayın
- **Heç vaxt** `src/lib/localDb.ts`-ə məntiq əlavə etməyin (yalnız re-export təbəqəsi)
- **Heç vaxt** `localDb.ts`-dən barrel-import etməyin — əvəzinə spesifik `db/` modullarını idxal edin
- DB singleton: `getDbInstance()` `src/lib/db/core.ts`-dən (WAL jurnalizasiya)
- Miqrasiya: `src/lib/db/migrations/` — versiyalı SQL faylları, idempotent, tranzaksiyalarda icra olunur

### Xəta İdarəetməsi

- spesifik xəta tipləri ilə try/catch, pino konteksti ilə log edin
- SSE axınlarında xətaları udmayın — təmizləmə üçün abort siqnallarından istifadə edin
- Düzgün HTTP status kodları qaytarın (4xx/5xx)

### Təhlükəsizlik

- **Heç vaxt** `eval()`, `new Function()`, və ya imzalanmış eval istifadə etməyin
- Bütün girişləri Zod sxemləri ilə təsdiqləyin
- Şifrələri istirahətdə şifrələyin (AES-256-GCM)
- Yuxarı axın başlıq qadağan siyahısı: `src/shared/constants/upstreamHeaders.ts` — redaktə edərkən sanitizasiya, Zod sxemləri və vahid testlərin uyğunluğunu qoruyun
- **İctimai yuxarı axın şifrələri** (Gemini/Antigravity/Windsurf üslubunda OAuth client_id/sirri + ictimai CLI-lərdən çıxarılmış Firebase Web açarları): **MÜTLƏQ** `resolvePublicCred()` vasitəsilə `open-sse/utils/publicCreds.ts`-də yerləşdirilməlidir — **heç vaxt** string literal olaraq. Məcburi nümunə üçün `docs/security/PUBLIC_CREDS.md`-ə baxın.
- **Xəta cavabları** (HTTP / SSE / executor / MCP handler): **MÜTLƏQ** `buildErrorBody()` və ya `sanitizeErrorMessage()` vasitəsilə `open-sse/utils/error.ts`-dən yönləndirilməlidir — **heç vaxt** xam `err.stack` və ya `err.message` cavab bədənində qoymayın. `docs/security/ERROR_SANITIZATION.md`-ə baxın.
- **Dəyişənlərdən yaradılan shell əmrləri**: `exec()`/`spawn()` çağırarkən runtime dəyərlərinə ehtiyac olan bir skript ilə, onları `env` seçimi vasitəsilə ötürün (avtomatik olaraq shell-qaçırılmış) — **heç vaxt** etibarsız/xarici yolları skript bədəninə string-interpolate etməyin. İstinad: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Təhlükəsiz-default kitabxanaları** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): yeni təhlükəsizlik həssas səthlər əlavə edərkən Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink-i öz tətbiqlərinizdən üstün tutun.

---

## Ümumi Dəyişiklik Senariləri

### Yeni Provayder Əlavə Etmək

1. `src/shared/constants/providers.ts`-də qeydiyyatdan keçin (yüklənərkən Zod ilə təsdiqlənir)
2. `open-sse/executors/`-də executor əlavə edin, əgər xüsusi məntiq lazımdırsa ( `BaseExecutor`-i genişləndirin)
3. `open-sse/translator/`-də tərcüməçi əlavə edin, əgər OpenAI formatı deyilsə
4. `src/lib/oauth/constants/oauth.ts`-də OAuth konfiqurasiyası əlavə edin, əgər OAuth əsaslıdırsa — əgər yuxarı axın CLI ictimai client_id/sirri göndərirsə, `resolvePublicCred()` vasitəsilə yerləşdirin (baxın `docs/security/PUBLIC_CREDS.md`), **heç vaxt** literal olaraq
5. `open-sse/config/providerRegistry.ts`-də modelləri qeyd edin
6. `tests/unit/`-də testlər yazın (əgər yeni bir yerləşdirilmiş default əlavə etmisinizsə, publicCreds forması təsdiqini daxil edin)

### Yeni API Marşrutu Əlavə Etmək

1. `src/app/api/v1/your-route/` altında qovluq yaradın
2. `GET`/`POST` handler-ləri ilə `route.ts` yaradın
3. Nümunəni izləyin: CORS → Zod bədən təsdiqi → optional auth → handler delegasiyası
4. Handler `open-sse/handlers/`-də yerləşir (oradan idxal edin, inline deyil)
5. Xəta cavabları `buildErrorBody()` / `errorResponse()` vasitəsilə `open-sse/utils/error.ts`-dən istifadə edir (avtomatik sanitizasiya — heç vaxt `err.stack` və ya `err.message` xam bədəndə qoymayın). `docs/security/ERROR_SANITIZATION.md`-ə baxın.
6. Testlər əlavə edin — ən azı bir təsdiq daxil olmaqla ki, xəta cavabları stack izlərini sızdırmır (`!body.error.message.includes("at /")`)

### Yeni DB Modulu Əlavə Etmək

1. `src/lib/db/yourModule.ts` yaradın — `./core.ts`-dən `getDbInstance`-i idxal edin
2. domen cədvəliniz üçün CRUD funksiyalarını ixrac edin
3. Yeni cədvəllər lazım olduqda `src/lib/db/migrations/`-də miqrasiya əlavə edin
4. `src/lib/localDb.ts`-dən re-export edin (yalnız re-export siyahısına əlavə edin)
5. Testlər yazın

### Yeni MCP Aləti Əlavə Etmək

1. `open-sse/mcp-server/tools/`-də Zod giriş sxemi + asinxron handler ilə alət tərifini əlavə edin
2. Alət dəstində qeydiyyatdan keçin ( `createMcpServer()` vasitəsilə bağlanır)
3. Müvafiq sahələrə təyin edin
4. Testlər yazın (alət çağırışı `mcp_audit` cədvəlinə qeyd olunur)

### Yeni A2A Bacarığı Əlavə Etmək

1. `src/lib/a2a/skills/`-də bacarıq yaradın (artıq 5 mövcuddur: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. Bacarıq tapşırıq kontekstini alır (mesajlar, metadata) → strukturlaşdırılmış nəticə qaytarır
3. `src/lib/a2a/taskExecution.ts`-də `A2A_SKILL_HANDLERS`-də qeyd edin
4. `src/app/.well-known/agent.json/route.ts`-də açın (Agent Kartı)
5. `tests/unit/`-də testlər yazın
6. `docs/frameworks/A2A-SERVER.md` bacarıq cədvəlində sənədləşdirin

### Yeni Bulud Agentini Əlavə Etmək

1. `src/lib/cloudAgent/agents/`-də `CloudAgentBase`-dən uzanan agent sinfini yaradın (artıq 3 mövcuddur: codex-cloud, devin, jules)
2. `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`-i həyata keçirin
3. `src/lib/cloudAgent/registry.ts`-də qeyd edin
4. Lazım olduqda OAuth/şifrələr idarəetməsini əlavə edin (`src/lib/oauth/providers/`)
5. Testlər + `docs/frameworks/CLOUD_AGENT.md`-də sənədləşdirin

### Yeni Guardrail / Eval / Bacarıq / Webhook hadisəsi Əlavə Etmək

- Guardrail: `src/lib/guardrails/` → sənədlər: `docs/security/GUARDRAILS.md`
- Eval dəsti: `src/lib/evals/` → sənədlər: `docs/frameworks/EVALS.md`
- Bacarıq (sandbox): `src/lib/skills/` → sənədlər: `docs/frameworks/SKILLS.md`
- Webhook hadisəsi: `src/lib/webhookDispatcher.ts` → sənədlər: `docs/frameworks/WEBHOOKS.md`

## İstinad Sənədi

Hər hansı qeyri-adi dəyişiklik üçün, uyğun dərin araşdırmanı əvvəlcə oxuyun:

| Sahə                                                           | Sənəd                                                             |
| -------------------------------------------------------------- | ----------------------------------------------------------------- |
| Repo naviqasiyası                                              | `docs/architecture/REPOSITORY_MAP.md`                             |
| Arxitektura                                                    | `docs/architecture/ARCHITECTURE.md`                               |
| Mühəndislik istinadı                                           | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Avtomatik Kombinasiya (9-faktor qiymətləndirmə, 14 strategiya) | `docs/routing/AUTO-COMBO.md`                                      |
| Dayanıqlılıq (3 mexanizm)                                      | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Düşüncə yenidən oynatma                                        | `docs/routing/REASONING_REPLAY.md`                                |
| Bacarıqlar çərçivəsi                                           | `docs/frameworks/SKILLS.md`                                       |
| Yaddaş sistemi (FTS5 + Qdrant)                                 | `docs/frameworks/MEMORY.md`                                       |
| Bulud agentləri                                                | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Qoruyucu çərçivələr (ŞPİ / inyeksiya / vizyon)                 | `docs/security/GUARDRAILS.md`                                     |
| İctimai yuxarı axın etibarnamələri (Gemini/və s.)              | `docs/security/PUBLIC_CREDS.md`                                   |
| Xəta mesajlarının sanitizasiyası                               | `docs/security/ERROR_SANITIZATION.md`                             |
| Qiymətləndirmələr                                              | `docs/frameworks/EVALS.md`                                        |
| Uyğunluq / audit                                               | `docs/security/COMPLIANCE.md`                                     |
| Webhooklar                                                     | `docs/frameworks/WEBHOOKS.md`                                     |
| İcazə boru xətti                                               | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Gizlilik (TLS / barmaq izi)                                    | `docs/security/STEALTH_GUIDE.md`                                  |
| Agent protokolları (A2A / ACP / Bulud)                         | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP server                                                     | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A server                                                     | `docs/frameworks/A2A-SERVER.md`                                   |
| API istinadı + OpenAPI                                         | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Təchizatçı kataloqu (avtomatik yaradılmış)                     | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Buraxılış axını                                                | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## Test

| Nə                      | Əmr                                                                           |
| ----------------------- | ----------------------------------------------------------------------------- |
| Birlik testləri         | `npm run test:unit`                                                           |
| Tək fayl                | `node --import tsx/esm --test tests/unit/file.test.ts`                        |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                         |
| E2E (Playwright)        | `npm run test:e2e`                                                            |
| Protokol E2E (MCP+A2A)  | `npm run test:protocols:e2e`                                                  |
| Ekosistem               | `npm run test:ecosystem`                                                      |
| Coverage gate           | `npm run test:coverage` (75/75/75/70 — ifadələr/sətirlər/funksiyalar/şaxələr) |
| Coverage report         | `npm run coverage:report`                                                     |

**PR qaydası**: Əgər `src/`, `open-sse/`, `electron/`, və ya `bin/` içərisində istehsal kodunu dəyişsəniz, eyni PR-da testləri daxil etməli və ya yeniləməlisiniz.

**Test qatının üstünlüyü**: birinci birlik → inteqrasiya (çox-modul və ya DB vəziyyəti) → e2e (UI/iş axını yalnız). Xətaların təkrarlanmasını düzəlişdən əvvəl və ya onunla birlikdə avtomatlaşdırılmış testlər kimi kodlayın.

**Copilot coverage siyasəti**: Bir PR istehsal kodunu dəyişdikdə və coverage 75%-dən (ifadələr/sətirlər/funksiyalar) və ya 70%-dən (şaxələr) aşağıdırsa, yalnız hesabat verməyin — testləri əlavə edin və ya yeniləyin, coverage gate-i yenidən işə salın, sonra təsdiq istəyin. PR hesabatında icra olunan əmr, dəyişdirilmiş test faylları və son coverage nəticəsini daxil edin.

---

## Git İş Prosesi

```bash
# Heç vaxt birbaşa main-ə commit etməyin
git checkout -b feat/your-feature
git commit -m "feat: dəyişikliklərinizi təsvir edin"
git push -u origin feat/your-feature
```

**Şaxə prefiksləri**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Commit formatı** (Konvensional Commits): `feat(db): circuit breaker əlavə et` — sahələr: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky hook-ları**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Mühit

- **İcra mühiti**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES Modulları
- **TypeScript**: 5.9+, hədəf ES2022, modul esnext, resolution bundler
- **Yol aliasları**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Default port**: 20128 (API + dashboard eyni portda)
- **Məlumat qovluğu**: `DATA_DIR` env var, varsayılan `~/.omniroute/`
- **Əsas env var-lar**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Quraşdırma: `cp .env.example .env` sonra `JWT_SECRET` (`openssl rand -base64 48`) və `API_KEY_SECRET` (`openssl rand -hex 32`) yaradın

---

## Sərt Qaydalar

1. Heç vaxt gizli məlumatları və ya kimlikləri commit etməyin
2. Heç vaxt `localDb.ts`-ə məntiq əlavə etməyin
3. Heç vaxt `eval()` / `new Function()` / imalı eval istifadə etməyin
4. Heç vaxt birbaşa `main`-ə commit etməyin
5. Heç vaxt marşrutlarda xam SQL yazmayın — `src/lib/db/` modullarından istifadə edin
6. Heç vaxt SSE axınlarında xətaları səssizcə udmayın
7. Həmişə Zod sxemləri ilə girişləri təsdiqləyin
8. İstehsal kodunu dəyişərkən həmişə testləri daxil edin
9. Coverage ≥75% (ifadələr, sətirlər, funksiyalar) / ≥70% (şaxələr) səviyyəsində qalmalıdır. Cari ölçülən: ~82%.
10. Heç vaxt Husky hook-larını (`--no-verify`, `--no-gpg-sign`) açıq operator təsdiqi olmadan keçməyin.
11. Heç vaxt ictimai upstream OAuth client_id/secret və ya Firebase Web açarlarını string literal kimi daxil etməyin — həmişə `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`) vasitəsilə keçin. `docs/security/PUBLIC_CREDS.md`-ə baxın.
12. Heç vaxt HTTP / SSE / executor cavablarında xam `err.stack` / `err.message` qaytarmayın — həmişə `buildErrorBody()` və ya `sanitizeErrorMessage()` (`open-sse/utils/error.ts`) vasitəsilə yönləndirin. `docs/security/ERROR_SANITIZATION.md`-ə baxın.
13. Heç vaxt xarici yolları və ya icra dəyərlərini `exec()`/`spawn()`-a ötürülən shell skriptlərinə string-interpolate etməyin — bunun əvəzinə `env` seçimi vasitəsilə ötürün. İstinad: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Heç vaxt CodeQL / Gizli-Skanlama xəbərdarlığını (a) əvvəlcə yuxarıdakı naxış sənədlərini yoxlamadan, köməkçinin tətbiq olunub-olunmadığını görmək üçün, və (b) rədd etmə şərhində texniki əsaslandırmanı qeyd etmədən rədd etməyin. Precedent: `js/stack-trace-exposure` `sanitizeErrorMessage()` vasitəsilə yönləndirilən çağırış yerlərində qaldırılmışdır, bu, tanınmayan xüsusi sanitizatorların olduğu məlum CodeQL məhdudiyyətidir — `docs/security/ERROR_SANITIZATION.md`-ə istinad edərək `false positive` olaraq rədd edin.
15. Heç vaxt uşaq prosesləri yaradan marşrutları (`/api/mcp/`, `/api/cli-tools/runtime/`) `src/server/authz/routeGuard.ts`-də `isLocalOnlyPath()` təsnifatı olmadan daxil etməyin. Loopback icrası hər hansı bir auth yoxlamasından əvvəl şərtsiz baş verir — tunel vasitəsilə sızan JWT prosesin yaranmasına səbəb ola bilməz. `docs/security/ROUTE_GUARD_TIERS.md`-ə baxın.
16. Heç vaxt commit mesajlarında `Co-Authored-By` əlavələri daxil etməyin. Commitlər yalnız depo sahibinin Git kimliyi altında görünməlidir (`diegosouzapw`). `Co-Authored-By: Claude …` sətiri GitHub-un commitləri `claude` Anthropic hesabına aid etməsinə səbəb olur, PR tarixində real müəllifi gizlədir.
