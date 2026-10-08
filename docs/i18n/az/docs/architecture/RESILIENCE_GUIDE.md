# Resilience Guide (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute bir-biri ilə əlaqəli, lakin fərqli üç dayanıqlılıq mexanizminə malikdir. Hər birinin fərqli əhatə dairəsi və məqsədi var. Marşrutlaşdırma davranışında sazlama apararkən onları bir-birindən ayrı nəzərdən keçirin.

![3-səviyyəli dayanıqlılıq modeli](../diagrams/exported/resilience-3layers.svg)

> Mənbə: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Provayder dövrə açarı

**Əhatə dairəsi:** bütün provayder (məsələn, `glm`, `openai`, `anthropic`).

**Məqsəd:** yuxarı axın/xidmət səviyyəsində təkrar-təkrar uğursuz olan provayderə trafik göndərilməsini dayandırmaq.

**Reallaşdırma:**

- Əsas sinif: `src/shared/utils/circuitBreaker.ts`
- Əlaqələndirmə: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status API-si: `GET /api/monitoring/health`
- Sıfırlama API-si: `POST /api/resilience/reset`
- Örtüklər: `open-sse/services/accountFallback.ts`
- DB cədvəli: `domain_circuit_breakers`

**Vəziyyətlər:**

- `CLOSED` — normal trafikə icazə verilir
- `DEGRADED` — trafikə hələ də icazə verilir, lakin provayder uğursuzluqlarının artması izlənilir
- `OPEN` — provayder müvəqqəti bloklanıb; kombinasiya marşrutlaşdırması onu ötürür
- `HALF_OPEN` — sıfırlama gözləmə müddəti bitib; yoxlama sorğusuna icazə verilir

**Konfiqurasiya edilə bilən standart dəyərlər (`open-sse/config/constants.ts`, İdarəetmə paneli → Parametrlər → Dayanıqlılıq bölməsində təqdim olunur):**

| Sinif     | Deqradasiya həddi | Açılma həddi  | Sıfırlama gözləmə müddəti |
| --------- | ----------------- | ------------- | ------------------------- |
| OAuth     | 5 uğursuzluq      | 8 uğursuzluq  | 60s                       |
| API açarı | 7 uğursuzluq      | 12 uğursuzluq | 30s                       |
| Lokal     | hesablanır        | 2 uğursuzluq  | 15s                       |

`degradationThreshold` provayderin nə zaman `DEGRADED` vəziyyətinə keçməsini, `failureThreshold` isə nə zaman açılmasını və ötürülməsini idarə edir. Lokal provayder profilləri hələ Dayanıqlılıq parametrləri səhifəsində təqdim edilmir.

**İşə düşmə kodları:** yalnız provayder səviyyəli `[408, 500, 502, 503, 504]` statusları. Hesab səviyyəli xətalar üçün (əksər 401/403/429 — bunlar soyuma müddətinə və ya bloklanmaya aiddir) işə salmayın.

**Tənbəl bərpa:** `OPEN` müddəti bitdikdə `getStatus()`, `canExecute()`, `getRetryAfterMs()` vəziyyəti `HALF_OPEN` olaraq yeniləyir. Fon taymerinə ehtiyac yoxdur.

---

### İstəyə bağlı qlobal Provayder Soyuma Müddəti (pəncərə keçidi)

Dördüncü, **istəyə bağlı** qat (`PROVIDER_COOLDOWN_ENABLED`, standart olaraq **söndürülüb**) uğursuz provayderlər haqqında sorğulararası yaddaşı
`open-sse/services/providerCooldownTracker.ts` daxilində saxlayır və kombinasiya hədəflərinin
müəyyənləşdirilməsi zamanı bu yaddaşa müraciət edilir ki, ardıcıl kombinasiya sorğuları indicə
uğursuz olmuş provayderi yenidən yoxlamasın. Provayder səviyyəli qeydlər `PROVIDER_PROFILES` pəncərə keçidinə tabedir:

| Profil    | bundan sonra işə düşür (`providerFailureThreshold`) | bu müddət ərzində (`providerFailureWindowMs`) | bu qədər soyuyur (`providerCooldownMs`) |
| --------- | --------------------------------------------------: | --------------------------------------------: | --------------------------------------: |
| OAuth     |                                                `10` |                                       `15min` |                                  `5min` |
| API açarı |                                                `15` |                                       `30min` |                                 `10min` |

Həddən aşağı olduqda provayder **soyuma vəziyyətində** hesab edilmir; uğurlu nəticə
pəncərəni təmizləyir. Bağlantı səviyyəli qeydlər (`provider:connectionId`) isə
eksponensial `minRetryCooldownMs → maxRetryCooldownMs` geri çəkilməsini saxlayır. Əvəzləmələr:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Reqressiyadan qorunma testi: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Bağlantının gözləmə müddəti

**Əhatə dairəsi:** tək provayder bağlantısı/hesabı/açarı.

**Məqsəd:** eyni provayderə aid digər bağlantılar xidmət göstərməyə davam edərkən nasaz bir açarı ötürmək.

**İcra:**

- Əlçatmaz kimi işarələmə: `src/sse/services/auth.ts::markAccountUnavailable()`
- Seçim: eyni fayldakı `getProviderCredentials*`
- Gözləmə müddətinin hesablanması: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Parametrlər: `src/lib/resilience/settings.ts`

**Hər bağlantı üzrə sahələr:**

- `rateLimitedUntil` — gözləmə müddətinin bitdiyi vaxt damğası
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponensial geri çəkilmə sayğacı

**Defolt gözləmə müddətləri:**

- OAuth bazası: 5 san.
- API açarı bazası: 3 san.
- API açarı üçün 429: yuxarı axının `Retry-After`/sıfırlama başlıqlarına/pars edilə bilən sıfırlama mətninə üstünlük verir
- Geri çəkilmə: `baseCooldownMs * 2 ** failureIndex`

**Eyni anda sorğu axınının qarşısını alan qoruyucu mexanizm:** paralel xətaların gözləmə müddətini həddən artıq uzatmasının və ya `backoffLevel` dəyərini iki dəfə artırmasının qarşısını alır.

**Terminal vəziyyətlər (gözləmə müddəti DEYİL):**

- `banned` — qadağan edilmiş açar söz / hesab qadağası aşkarlanması ilə (baxın: [BAN_DETECTION](../security/BAN_DETECTION.md)), həmçinin yuxarı axından hər sorğu üzrə ardıcıl üç imtina ilə təyin edilir (`request_rejected`, məsələn, Anthropic OAuth 403 "Sorğuya icazə verilmir" — `open-sse/services/requestRejectedStreak.ts`); tək bir imtina yalnız bağlantını gözləmə rejiminə keçirir
- `expired` (məhdud sayda təkrar cəhddən sonra terminal vəziyyətə keçir — eksponensial geri çəkilmə ilə `EXPIRED_RETRY_MAX = 3` — beləliklə, müvəqqəti OAuth xətaları hesab həmişəlik deaktiv edilməzdən əvvəl öz-özünə bərpa oluna bilər)
- `credits_exhausted`

Bunlar giriş məlumatları dəyişənə və ya operator onları sıfırlayana qədər qalır. Terminal vəziyyətləri müvəqqəti gözləmə vəziyyəti ilə əvəz etməyin.

**Tənbəl bərpa:** `rateLimitedUntil` vaxtı keçdikdə bağlantı yenidən uyğun olur. Uğurlu istifadədən sonra `clearAccountError()` bütün xəta sahələrini təmizləyir.

### Claude OAuth istifadə həddi: aşağı prioritetli kanal + sessiya limitinin sıfırlanması

**Əhatə dairəsi:** bir Claude abunəliyi (OAuth) bağlantısı. Hər iki funksiya **hər bağlantı üçün ayrıca aktivləşdirilir**
(Bağlantını redaktə et → Claude bölməsi → `providerSpecificData` daxilində `lowPriorityMode` / `autoLimitReset`,
hər ikisi defolt olaraq söndürülüb) və Claude Code-un `/low-priority` və
`/limit-reset` əmrlərini əks etdirir (protokol müqaviləsi Claude Code 2.1.263-dən götürülüb).

**İcra:**

- Vəziyyət maşını + cavab təsnifatı: `open-sse/services/claudeLowPriority.ts`
- Sıfırlama statusu/iddia müştərisi: `open-sse/services/claudeLimitReset.ts`
- İcra mexanizminin qarmağı (başlığın əlavə edilməsi + eyni hesabla təkrar cəhd): `open-sse/executors/base.ts::execute()`
- Aktivləşdirmə seçiminin saxlanması: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Tətikləyici:** 5 saatlıq istifadə həddi — başlıqlarında
`anthropic-ratelimit-unified-status: rejected` və hesab uyğun olduqda
`anthropic-ratelimit-unified-slow-offer: treatment` olan `429`. Həmin ilk hədd
429 cavabından əvvəl heç nə göndərilmir; vahid başlıqları olmayan intensiv 429 axını normal gözləmə müddəti yolu ilə emal olunur.

**Aşağı prioritetli kanal** (`lowPriorityMode`):

- Hədd üzrə 429 cavabında icra mexanizmi təklifi qəbul edir və dərhal **eyni**
  hesabla `anthropic-usage-limit: slow` başlığından istifadə edərək yenidən cəhd edir; kanal elan edilmiş
  `anthropic-ratelimit-unified-reset` vaxtına (+60 san. güzəşt müddəti) qədər aktiv qalır və həmin zaman
  pəncərəsindəki hər sorğu bu başlığı daşıyır. Tutulmuş 429 cavabı heç vaxt `handleChatCore` funksiyasına
  çatmır, buna görə də bağlantı gözləmə rejiminə keçirilmir və başqa bağlantı ilə əvəzlənmir.
- Sonrakı cavablardakı `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  kanalı saxlayır; `slot_busy` (429) və ya `529` serverin
  `anthropic-ratelimit-unified-slow-retry-after` müddətini gözləyir (defolt 20 san., 5–600 san. həddində məhdudlaşdırılır, ±30% təsadüfi yayınma)
  və `anthropic-ratelimit-unified-slow-max-wait` ilə məhdudlaşdırılmış şəkildə yenidən cəhd edir (defolt 20 dəq., 1 dəq.–6 saat
  həddində məhdudlaşdırılır) — bu müddət keçdikdən sonra kanal bağlanır və 10 dəqiqəlik fasilə
  yenidən qəbulu bloklayır. Gözləmə müddəti əlavə olaraq sorğunun öz yuxarı axın başlanğıcı üçün taymautundan
  (`resolveFetchStartTimeout`, defolt olaraq 10 dəq.) qalan müddət minus 5 san. ilə məhdudlaşdırılır: bu məhdudiyyət olmasaydı,
  20 dəqiqəlik defolt maksimum gözləmə sorğunun ömrünü aşar və gözləmə zamanı yuxu dayandırılaraq
  səliqəli `max_wait` sonluğu + fasilə əvəzinə `TimeoutError` göstərilərdi.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5 saatlıq pəncərənin yenilənməsi və ya
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (ödənişli əlavə istifadə artıq həddi qarşıladığı üçün
  istənilən statusda onu `extra_usage` kimi tamamlayır) kanalı bağlayır; bundan sonra
  cavab normal gözləmə müddəti yolu ilə emal olunur. `budget_exhausted` elan edilmiş büdcə sıfırlanmasına qədər
  (≤ 8 gün) yadda saxlanılır.
- Hədd yoxlaması icra mexanizminin öz 400 cavabı ilə başladılan cəhdaxili təkrarlarından (kontekstin
  redaktəsi, düşünmə/səy məhdudiyyətləri, parametrin avtomatik öyrənilməsi) sonra işləyir, beləliklə, yalnız
  bu təkrarlardan birində üzə çıxan hədd üzrə 429 cavabı gözləmə müddəti yoluna çatmaq əvəzinə yenə də tutulur.
- Vəziyyət hər bağlantı üzrə yaddaşda saxlanılır (yenidən başlatma təkrar qəbul üçün əlavə bir hədd üzrə 429 cavabına səbəb olur).

**Sessiya limitinin sıfırlanması** (`autoLimitReset`, hər ikisi aktiv olduqda kanaldan əvvəl sınanır):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  bloku; `arm: "reset"` və `available: true` olduqda,
  `{ "program": "juniper_tide" }` ilə
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`
  (`providerSpecificData.organizationUUID` daxilindəki təşkilat UUID-si, ilkin yükləmə ehtiyat variantı).
- `result: reset|not_limited` → sorğu tam sürətlə yenidən sınanır (yavaş rejim başlığı olmadan).
  `already_used` / `not_offered` dəyərləri `next_available_at` dəyərini yadda saxlayır (defolt olaraq bir həftə);
  istənilən xəta 15 dəqiqəlik geri çəkilməyə səbəb olur. Sıfırlama həftədə bir dəfədir və yenə də
  həftəlik limitə daxil edilir.

Reqressiyadan qorunma testləri: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Sessiya bağlılığı (#7274)

**Əhatə dairəsi:** **istənilən** provayder üçün bir bağlantıya bağlanmış bir müştəri sessiyası (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` başlığı).

**Məqsəd:** çoxturlu agenti (Claude Code, aider, xüsusi agentlər) sorğular arasında eyni hesabda saxlamaq, hesablararası kontekst itkisini və hesab üzrə sessiya vəziyyətinə malik provayderlərdə təkrarlanan soyuq başlanğıc `429` xətalarını azaltmaq.

**İcra:**

- TTL-in müəyyən edilməsi: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin seçimi/yaradılması: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Başlığın çıxarılması (ümumi, istənilən provayder): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Daimi saxlanılan pin cədvəli: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Parametr: `sessionAffinityTtlMs` (ms ilə qlobal TTL, `0` deaktiv edir) — `src/lib/db/settings.ts`. Yalnız Codex üçün olan `codexSessionAffinityTtlMs` adından `124_generic_session_affinity_ttl.sql` miqrasiyası vasitəsilə dəyişdirilib; bu miqrasiya əvvəllər konfiqurasiya edilmiş istənilən Codex TTL dəyərini yeni standart dəyər kimi köçürür.

#7274-dən əvvəl `resolveSessionAffinityTtlMs()` `codex` istisna olmaqla hər bir provayder üçün dərhal `0` qaytarırdı, buna görə də pinləmə mexanizmi və başlıq çıxarılması artıq provayderdən asılı olmasa da, TTL parametri (və sessiya başlıqları) başqa heç bir yerdə təsir göstərmirdi. Düzəliş həmin erkən çıxışı aradan qaldırdı; TTL qlobal olaraq `0`-dan yuxarı təyin edildikdən sonra bütün provayderlərə vahid şəkildə tətbiq olunur.

Üç sessiya yaxınlığı başlığının heç biri yuxarı axına ötürülmür — icraedicilər müştəri başlıqlarını olduğu kimi ötürmək əvəzinə öz yuxarı axın başlıqlarını sıfırdan qururlar, buna görə də bu, yalnız daxili korrelyasiya identifikatoru olaraq qalır.

### Eksklüziv idarə olunan sessiya bağlantısı icarələri

**Əhatə dairəsi:** bir aktiv idarə olunan HTTP müştərisi/sessiyası bir uyğun OmniRoute bağlantısına sahib olur.

**Məqsəd:** sorğular arasında sərt marşrutlaşdırma sərhədinə ehtiyac duyan müştərilər üçün davamlı eksklüziv bağlantı sahibliyi təmin etmək. Bu, yumşaq davamlılıq üstünlüyü olan sessiya yaxınlığından fərqlənir: eksklüziv icarə həyat dövrü vəziyyətini SQLite-da saxlayır, qlobal aktiv sahib və aktiv bağlantı unikallığını təmin edir və provayderə göndərişdən əvvəl köhnəlmiş nəsli rədd edir.

Funksiya hər API açarı üçün ayrıca aktivləşdirilir. İdarə olunan açar `lease:exclusive` əhatə dairəsinə və açıq şəkildə göstərilmiş, boş olmayan `allowedConnections` siyahısına malik olmalıdır. İstənilən HTTP müştərisi həyat dövrü son nöqtəsindən istifadə edə bilər; müştəri adı, user-agent, provayder, OAuth metodu və ya model tələb olunmur. İcarə modelə deyil, bağlantıya sahib olur, buna görə də bağlantı adi qaydada uyğun qaldığı müddətdə model dəyişikliyi bağlanmanı qoruyur. Normal model, kvota, sağlamlıq, gözləmə müddəti və icazə siyahısı qaydaları qüvvədə qalır və eyni nəsli başqa sərbəst uyğun bağlantıya keçirə bilər.

Həyat dövrü `acquire`, `renew` və `release` JSON əməliyyatları ilə `POST /api/v1/session-leases` vasitəsilə idarə olunur. İdarə olunan çıxarış sorğuları qeyri-şəffaf `X-OmniRoute-Lease-Owner` dəyərini və dəqiq `X-OmniRoute-Lease-Generation` dəyərini təqdim edir. Sahib identifikatoru `vlo_` prefiksindən və ardınca gələn 43 base64url simvolundan ibarətdir; yalnız onun SHA-256 heşi saxlanılır. Hər yekun göndəriş sərhədi həmçinin autentifikasiya edilmiş API açarı ID-sini və aktiv bağlantı ID-sini bağlayır. İcarəyə nəzarət başlıqları jurnallardan, saxlanılan sorğu anlıq görüntülərindən və yuxarı axın icraedici başlıqlarından silinir.

Adi marşrutlaşdırmada uyğun idarə olunan namizədlər mövcuddursa, lakin bütün sərbəst namizədlər başqa aktiv icarələr tərəfindən tutulubsa, OmniRoute HTTP `429`, lease-capacity-unavailable kodu, tutum gözləmə vəziyyəti və ən erkən müvafiq bitmə vaxtından hesablanan məhdud `Retry-After` qaytarır. Adi uyğunluq siyahısının boş olması icarə çəkişməsi deyil və mövcud marşrutlaşdırma xətası semantikasını qoruyur.

Əlaqəli mexanizmlər ayrı qalır:

- OAuth sessiya məşğulluğu OAuth hesabları üçün proses daxilində yumşaq paylamadır.
- Hesab semaforları sorğu paralelliyi icazələri verir və sorğu tamamlandıqda bitir.
- Eksklüziv idarə olunan sessiya icarələri nəsil sərhədinə malik davamlı həyat dövrü sahibliyidir.

---

## 3. Model Bloklanması

**Əhatə dairəsi:** provayder + bağlantı + model üçlüyü.

**Statusa görə açar əhatəsi:** uğursuzluq statusu bloklanmanın hansı açara
yazılacağını müəyyən edir (`open-sse/services/accountFallback/exactModelLock.ts`
faylındakı `resolveLockoutScope()`):

- `429` / `403` / `402` — kvota və ya istifadə hüququ siqnalı — **kvota ailəsini**
  bloklayır: codex üçün bağlantının bütün `codex` / `spark` əhatəsi (hər bir
  `gpt-5*` modeli), digər provayderlər üçün `getQuotaScopedModelForProvider()`.
- `404` əsas modeli bloklayır (`getModelLockKey()` `not_found` əhatəsini daraldır).
- İstənilən digər status — `5xx` nəqliyyat/server xətaları və keyfiyyət
  yoxlaması nəticəsində OmniRoute-un özünün yaratdığı `502` — yalnız **dəqiq**
  provayder/bağlantı/model üçlüyünü bloklayır. Bir modeldəki nasaz axın hesabın
  kvotası barədə sübut deyil; bu qaydadan əvvəl `codex/gpt-5.6-luna` üçün bir boş
  cavab həmin bağlantının bütün `gpt-5*` modellərini, kvota toxunulmaz qaldığı
  halda, 2–30 dəqiqəlik (artan şəkildə) marşrutlaşdırmadan çıxarırdı.
- Çağıranın açıq şəkildə göstərdiyi `scope` seçimi həmişə üstünlük təşkil edir
  (Antigravity `"exact"` ötürür).

**Məqsəd:** yalnız bir model əlçatan olmadıqda və ya kvota ilə məhdudlaşdırıldıqda bütöv bağlantının deaktiv edilməsinin qarşısını almaq.

**Nümunələr:**

- Hər model üzrə kvota tətbiq edən və 429 qaytaran provayderlər
- Bir çatışmayan model üçün 404 qaytaran lokal provayderlər
- Provayderə xas rejim/model icazəsi xətaları (məsələn, Grok rejimləri)

**İcra:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model Soyuma Müddətləri İdarəetmə Paneli (v3.8.0)

İnterfeys: Parametrlər → Model Soyuma Müddətləri (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Aktiv bloklanmaları bu məlumatlarla siyahıya alır: provayder, bağlantı, model, səbəb, expiresAt. Operatorlar kartdan modeli əl ilə yenidən aktivləşdirə bilərlər.

**REST API:**

- `GET /api/resilience/model-cooldowns` — aktiv bloklanmaları siyahıya almaq
- `DELETE /api/resilience/model-cooldowns` — əl ilə yenidən aktivləşdirmək. Sorğu gövdəsi: `{provider, connection, model}`. Avtorizasiya: idarəetmə.

### Bloklanma parametrləri interfeysi + uğurla azalma əsasında bərpa (v3.8.23)

Model bloklanması həmişə aktiv olan, kodda sərt şəkildə müəyyənləşdirilmiş
davranışdan ayrıca parametr kartına və özünü sağaldan bərpa yoluna malik, tam
konfiqurasiya edilə bilən, könüllü aktivləşdirilən funksiyaya çevrildi.

**Parametrlər kartı:** Parametrlər → Model Bloklanması
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Bu, yuxarıdakı yalnız oxumaq üçün olan `ModelCooldownsCard`-dan (yalnız aktiv
bloklanmaları _siyahıya alır_) **fərqlidir** — yeni kart _parametrləri
konfiqurasiya edir_. Standart dəyərlər `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) daxilindədir:

| Parametr                | Standart dəyər                   | Mənası                                                         |
| ----------------------- | -------------------------------- | -------------------------------------------------------------- |
| `enabled`               | `false`                          | Əsas keçid — model bloklanması **standart olaraq söndürülüb**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Model əhatəli xəta sayılan yuxarı axın statusları.             |
| `baseCooldownMs`        | `120_000` (120 san.)             | İlk xəta üçün ilkin bloklanma müddəti.                         |
| `maxCooldownMs`         | `1_800_000` (30 dəq.)            | Artırılmış soyuma müddətinin yuxarı həddi.                     |
| `maxBackoffSteps`       | `10`                             | Eksponensial geriçəkilmə artımının maksimum addım sayı.        |
| `useExponentialBackoff` | `true`                           | Təkrarlanan xətaların soyuma müddətini eksponensial artırması. |

Parametrlər adi parametr yaddaşı vasitəsilə saxlanılır və dayanıqlılıq
parametrləri sxemi ilə yoxlanılır; kart `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` olmaqla) və `maxBackoffSteps` dəyərlərini
icazə verilən hədlərdə saxlayır.

**Uğurla azalma əsasında bərpa:** bərpa yalnız taymerin bitməsinə əsaslanmır.
Sağlam cavab modelin xəta sayını mərhələli şəkildə azaldır, beləliklə müddətin
ortasında bərpa olunan model taymer bitməzdən əvvəl artımı dayandırır (və
bloklanmanı ləğv edir). Kombinasiya hədəfindən uğurlu cavab gəldikdə
`open-sse/services/combo.ts`, `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) funksiyasını çağırır; bu funksiya
saxlanılan `failureCount` dəyərini **yarıya endirir**
(`Math.floor(failureCount / 2)`); dəyər `0` olduqda bloklanma qeydi tamamilə
silinir. Bunun qarşılığı olan `recordModelLockoutFailure()` artım pəncərəsi
daxilindəki xətalarda sayğacı artırır (və soyuma müddətini uzadır). Uğurla azalma
mexanizmi sadə taymer bitməsinə əlavə olaraq işləyir — hər iki yol modeli yenidən
aktivləşdirə bilər.

**Vəziyyət:** bloklanmalar verilənlər bazasında saxlanılmır, **yaddaşda**
(`provider:connectionId:model` açarı ilə indekslənən prosesə aid `ModelLockoutEntry`
`Map`-ləri, dəqiq əhatəli bloklanmalar üçün isə
`provider:connectionId:exact:model`) saxlanılır — yenidən başlatma zamanı
itir. _Parametrlər_ daimi saxlanılır; aktiv bloklanma _vəziyyəti_ müvəqqətidir.

---

## 4. Kvota paylaşımı üçün paralellik nəzarəti (v3.8.36)

Abunəlik hesabları (GLM, MiniMax və s.) çox vaxt yalnız ~1–3 paralel sorğunu
qəbul edir; bu həddin aşılması 429 xətalarına və gözləmə müddətlərinə səbəb olur. Bu problem
bir neçə API açarının eyni yuxarı səviyyəli hesabı paylaşdığı **quota-share** (`qtSd/…`)
kombinasiyalarında xüsusilə kəskindir. Üç səviyyə paylaşılan hesabın sorğu axınına məruz
qalmasının qarşısını alır.

### Hər bağlantı üzrə paralellik həddi (`max_concurrent`)

Hər bir provayder bağlantısı `max_concurrent` yuxarı həddi təyin edə bilər
(`provider_connections.max_concurrent`, bağlantı modal pəncərəsində / API / DB-də təyin edilir).
Məhdudiyyət olmaması üçün onu boş saxlayın. Bu, aşağıdakı ardıcıllaşdırma səviyyəsini
idarə edən yeganə parametrdir — onu hesabın real paralellik göstəricisinə uyğun təyin edin
(məsələn, GLM ~1, MiniMax ~2).

### Kvota paylaşımı sorğularının ardıcıllaşdırılması

Kvota paylaşımı üzrə yönləndirmə müsbət `max_concurrent` dəyəri təyin edilmiş
bir bağlantını hədəflədikdə, həmin **hesaba** göndərilən paralel sorğular
hər bağlantı üzrə semafor (`qsconn:<connectionId>` açarı) vasitəsilə ardıcıllaşdırılır:
artıq sorğular hesabı yükləmək əvəzinə **növbədə gözləyir**. Mexanizm **fail-open**
prinsipi ilə işləyir — dolmuş növbə və ya vaxt aşımı yönləndirilə bilən sorğunu rədd
etmək əvəzinə onun slot olmadan davam etməsinə imkan verir. Bu funksiyanı
**Settings → Resilience → Quota-share per-connection concurrency**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, standart olaraq aktivdir)
bölməsində dəyişə bilərsiniz. `max_concurrent` həddi olmadıqda davranış dəyişmir.

> Kvota paylaşımı üzrə marşrutlaşdırma keçidi (`selectQuotaShareTarget`, DRR + P2C)
> özü də fail-open prinsipi ilə işləyir və yalnız həddə çatmış bağlantının
> _prioritetini azaldır_ — tək bağlantılı hovuzda sərt məhdudiyyət tətbiq edə
> bilmədiyi üçün sorğu axınının qarşısını faktiki olaraq bu semafor alır.

### Gözləmə müddətini nəzərə alan kombinasiya təkrarı

Hər bir kombinasiya strategiyasında (aktiv olduqda), QISA müvəqqəti gözləmə müddəti
üçün 429 xətasını qəti hala gətirəcək sorğu 429-u qaytarmaq əvəzinə bu müddətin
bitməsini gözləyir və yenidən yönləndirilir — bu, çoxmodelli kombinasiyalarda
Gemini sinfinə aid TPM/RPM pəncərələrini (~60 san. retry-after), məsələn,
2 modelli kombinasiyanın hər iki hədəfinin hər model üzrə sürət həddinə çatmasını
əhatə edir. **Settings → Resilience** bölməsindəki `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) ilə məhdudlaşdırılır.
`quota_exhausted` (gecə yarısına qədər kilidlənir) və ya autentifikasiya/tapılmama
səbəbləri üçün heç vaxt gözləmir.

---

## 5. Sorğu Növbəsinə Qəbul Nəzarəti (v3.8.49 · məsələ #6593)

**Əhatə dairəsi**: yuxarıdakı üç mexanizmdən bir səviyyə aşağıda yerləşən, hər provider+connection üçün lokal sürət məhdudiyyəti növbəsi (`open-sse/services/rateLimitManager.ts`,
Bottleneck əsasında).

**`maxWaitMs` növbədə gözləmə müddətini, `executionMaxWaitMs` isə icra müddətini məhdudlaşdırır.**
Bu ikisi qəsdən ayrıdır və heç biri digərinə təsir etmir.

`resilienceSettings.requestQueue.maxWaitMs` **növbədə gözləmə büdcəsidir**: o,
provider slotunun boşalmasını gözləməyi və sonra QUEUED vəziyyətində qalmağı
əhatə edir; tapşırıq QUEUED vəziyyətindən çıxıb icraya başlayan kimi onun
taymeri silinir (`rateLimitManager.ts`, `wrappedFn`). Bu müddəti aşan sorğu
heç vaxt yuxarı axındakı xidmətə çatmır. Defolt dəyər 30000ms-dir,
`src/lib/resilience/settings.ts` daxilindəki `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
tərəfindən təmin edilir və
`tests/unit/ratelimit-admission-control-6593.test.ts` tərəfindən sabitlənir;
beləliklə, onun dəyişdirilməsi bu paraqrafı səssizcə köhnəlmiş saxlamaq əvəzinə
həmin testi uğursuz edir.

`resilienceSettings.requestQueue.executionMaxWaitMs` Bottleneck-ə tapşırığın
`expiration` dəyəri kimi ötürülür və onun taymeri yalnız yönləndirmədən sonra
işə düşür. Bu, öz yuxarı axın taymautu olmayan icraçılar üçün ehtiyat
mexanizmidir və icraçının öz fetch-start taymautu daha uzun olduqda həmin
dəyərə yüksəldilir; beləliklə, normal şəkildə davam edən cavabı yarıda kəsə
bilməz. Defolt dəyər 600000ms-dir (10 dəq).

Növbə büdcəsinin `expiration` parametrinə ötürülməsi əvvəllər qeyri-inkremental
şlüzləri icranın ortasında dayandırırdı — onlar ilk baytları göndərməzdən əvvəl
haqlı olaraq bir neçə dəqiqə işləyə bilərlər — və buna görə də müddətin bitməsi
`code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) kimi təqdim olunur, növbə
büdcəsi isə növbə taymautu kodunu daşıyır. Hər iki dəyəri
`RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (mühit dəyişəni)
və ya idarə paneli (**Settings → Resilience**) vasitəsilə dəyişdirin.
Normallaşdırılarkən hər ikisi 1ms–24h aralığı ilə məhdudlaşdırılır.

**Hər ikisi üçün prioritet:** mühit dəyişəni yalnız _defolt_ dəyəri təmin edir.
`resilienceSettings.requestQueue` daxilində saxlanılmış dəyər (idarə paneli /
API patch, `key_value` daxilində saxlanılır) onu üstələyir, hər connection üçün
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` isə həmin dəyəri də
üstələyir. Buna görə də artıq saxlanılmış dəyəri olan yerləşdirmədə mühit
dəyişəninin təyin edilməsi heç nəyi dəyişmir — bunun əvəzinə saxlanılmış
parametri silin və ya yeniləyin.

Növbədə qalma müddəti `maxWaitMs` ilə məhdudlaşdırılır; aşağıdakı
`maxQueueDepth` isə eyni vaxtda neçə çağırışçının növbədə ola biləcəyini
məhdudlaşdırır.

**`maxQueueDepth` — aktivləşdirilməsi seçimə bağlı qəbul limiti (yeni).** `resilienceSettings.requestQueue.maxQueueDepth`
bir provider+connection üçün eyni vaxtda neçə sorğunun növbədə (hələ
yönləndirilməmiş) qala biləcəyini məhdudlaşdırır. Növbədə artıq
`maxQueueDepth` sayda sorğu olduqda yeni sorğu `limiter.schedule()` metoduna
çatmamışdan **əvvəl** tipli `code: "RATE_LIMIT_QUEUE_FULL"` xətası ilə dərhal
rədd edilir — beləliklə, rəddetmə az resurs tələb edir və həmin sorğu üçün hər
hansı aşağı axın prompt sıxışdırması / tərcümə işi başlamazdan əvvəl baş verir.
Defolt `0` = deaktivdir və mövcud məhdudiyyətsiz növbə davranışını qoruyur;
0–100000 aralığı ilə məhdudlaşdırılır. Dəyəri `RATE_LIMIT_MAX_QUEUE_DEPTH`
(mühit dəyişəni) və ya `resilienceSettings.requestQueue.maxQueueDepth`
(idarə paneli/API patch) vasitəsilə dəyişdirin.

Qəbul yoxlamasının özü saf funksiyadır
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), buna
görə də real Bottleneck məhdudlaşdırıcısı olmadan vahid testlərlə yoxlana bilər.

> #6593 məsələsini açan RFC həmçinin `bypassCompressionOnRateLimit`
> bayrağını təklif edirdi. Bu repozitorinin `open-sse/services/compression/`
> konveyeri sintez edilmiş 429 gövdələrində HTTP cavab sıxışdırması deyil,
> çıxan LLM sorğusunun prompt/kontekst sıxışdırılmasıdır (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` bloku ətrafında)
> — hərfi bypass bayrağına uyğun kod yolu yoxdur. Həmin prompt sıxışdırma
> addımı hazırda sorğu konveyerində `withRateLimit()` çağırışından _əvvəl_ də
> icra olunur; buna görə də növbə dolu olduqda rəddetmə zamanı onu ötürmək üçün
> ardıcıllığın dəyişdirilməsi bu məsələnin əhatə dairəsindən ayrı və daha böyük
> dəyişiklikdir. Bu, burada qəsdən **həyata keçirilməyib** və CPU qənaəti
> ardıcıllığın dəyişdirilməsi riskinə dəyərsə, sonrakı iş kimi saxlanılıb.

---

## 6. Yavaş axın məhsuldarlığı nəzarətçisi (#9709)

İxtiyari `resilienceSettings.streamRecovery.throughputWatchdog` qoruyucusu hələ də fraqmentlər göndərən, lakin konfiqurasiya edilmiş faydalı çıxış sürətindən aşağı səviyyədə assistent çıxışı yaradan yuxarı axını aşkarlayır. Bu mexanizm məqsədli şəkildə boşdayanma taym-autundan fərqləndirilir: nəbz siqnalları və metadata heç bir taymeri sıfırlamır və irəliləyiş hesab edilmir. O, həmçinin çıxış keyfiyyətindən asılı olmayaraq mütləq təhlükəsizlik həddi olaraq qalan sərt cəhd müddəti limitindən (#9153) fərqlənir.

Nəzarətçi dayandırma tətbiq edə bilməzdən əvvəl isinmə müddətinin, ardınca isə tam sürüşən pəncərənin tamamlanmasını tələb edir. O, Chat Completions və Responses API çıxış hadisələrindəki mətn deltalarını hesablayır (UTF-8 baytlarının konservativ aproksimasiyası), yalnız istifadə məlumatı daşıyan və boş hadisələri nəzərə almır, alət çağırışı və ya əsaslandırma hadisələri davam edərkən isə qiymətləndirməni dayandırır. Defolt olaraq deaktivdir və `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ilə aktivləşdirilə bilər; pəncərə, isinmə müddəti, minimum sürət və ölçülə bilən minimum çıxış adi dayanıqlılıq parametrlərinin normallaşdırma təbəqəsi tərəfindən məhdudlaşdırılır.

Aktiv olduqda nəzarətçinin dayandırması yalnız aktiv yuxarı axın cəhdinə tətbiq edilir. Müştəriyə görünən hər hansı bayt göndərilməzdən əvvəl mövcud eyni hesab üzrə erkən bərpa yolu cəhdi yenidən aça bilər. Təsdiqdən sonra axın heç vaxt kor-koranə təkrar oynadılmır; yalnız mövcud təhlükəsiz axınortası davametmə müqaviləsi sonluğu birləşdirə bilər. Yekunlaşdırma birdəfəlik olaraq qalır, buna görə istifadə uçotu və semaforun buraxılması təkrarlanmır.

---

## 7. Yuxarı axın statusunun yenidən ifadə edilməsi (yanlış göstərilən kvota xətaları)

**Əhatə dairəsi:** müvəqqəti kvota tükənməsini yanlış HTTP statusu ilə bildirən bir yuxarı axın şlüzü.

**Məqsəd:** klassifikasiyadan ƏVVƏL yanıltıcı statusu düzəltmək ki, aşağı axın istehlakçıları (ehtiyat mexanizmi, combo aqreqasiyası, müştəriyə təqdim olunan cavab) xətanın həqiqi, təkrar cəhd edilə bilən xarakterini görsün.

Bəzi şlüzlər MÜVƏQQƏTİ kvota tükənməsini təkrar cəhd edilə bilməyən HTTP statusu ilə bildirir. `agentrouter.org` standart `429` əvəzinə Çin dilində məzmunla (`用户额度不足` / `额度不足`) `403` (bəzən `400`) qaytarır. Claude Code kimi müştərilər `403` statusunu daimi hesab edərək sessiyanı dayandırır və düzəliş edilməzsə, ehtiyat mexanizmi bunu kvota hadisəsi əvəzinə `AUTH_ERROR` kimi təsnif edər.

**İcra:**

- Reyestr + uyğunlaşdırıcı: `open-sse/config/upstreamStatusRestatement.ts` — `applyStatusRestatement()` vasitəsilə uyğunlaşdırılan, hər provayder üçün ayrıca qaydalar siyahısı (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`).
- Çağırış yeri: `open-sse/handlers/chatCore.ts` faylındakı `providerFailure:` bloku (təxminən 3654-cü sətir), `parseUpstreamError()` xəta HTTP statusuna (`!providerResponse.ok`) malik yuxarı axın cavabını təhlil etdikdən dərhal sonra və hər hansı klassifikasiya işə düşməzdən əvvəl yerləşir ki, bütün aşağı axın istehlakçıları düzəldilmiş statusu görsün. `200` SSE axınına yerləşdirilmiş xətalar ayrıca, daha sonrakı axın təhlili yolu ilə emal edilir və bu gün bu mexanizmlə **əhatə olunmur** — bu, agentrouter-in yanlış statusu üçün hələlik lazım olmayan məlum məhdudiyyətdir (çünki həmin status xəta HTTP statusu kimi üzə çıxır).
- Təkrar cəhd uyğunluğu: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES` siyahısındadır (`open-sse/services/combo/unavailableRetryGate.ts`), buna görə yenidən ifadə edilmiş xəta işləməyən `403` kimi üzə çıxmaq əvəzinə real təkrar cəhd pəncərəsi daşıyır.
- Sintetik `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) yalnız yenidən ifadə edilmiş cavabın **müştəriyə** bildirdiyi müddətdir; bu, bağlantının daxili soyuma/bloklama müddəti deyil — həmin müddət yenidən ifadə edilmiş xətanı faktiki emal edən mexanizm tərəfindən ayrıca idarə olunur (Connection Cooldown mexanizminin artan geriçəkilmə intervalı, §2, API açarı provayderləri üçün baza `3s`; yaxud agentrouter kimi model üzrə kvota provayderləri üçün Model Lockout, §3). Router daxili olaraq təkrar cəhd üçün müştəriyə elan etdiyi 60s pəncərəsindən daha tez uyğun vəziyyətə gələ bilər — bu, xəta deyil, məqsədli ehtiyat intervalıdır.

Daimi xətalar (agentrouter-in `无权访问模型` xətası — bu modelə giriş yoxdur) HEÇ VAXT yenidən ifadə edilmir: `textMarkers` uyğun gəlsə belə, `excludeMarkers` qaydanı ləğv edir, buna görə xəta ilkin statusunu saxlayır və heç bir mexanizm onu sonsuzadək təkrar sınamır. Uyğun provayder klassifikasiya qaydası (`open-sse/config/providerErrorRules.ts` faylındakı `agentrouter-model-access-denied`: `reason: "auth_error"`, `scope: "model"`, elan edilmiş `6h` baza soyuma müddəti) ümumi apikey kateqoriyalı `FORBIDDEN` erkən qayıdışından _əvvəl_ `checkFallbackError` (`open-sse/services/accountFallback.ts`) tərəfindən nəzərə alınır və `honorsRuleLockScope(provider)` ilə idarə olunur (#10334 — hazırda `providerErrorRules.ts` faylındakı `HONORS_RULE_LOCK_SCOPE_PROVIDERS` icazə siyahısı vasitəsilə yalnız agentrouter üçün). Qaydanın elan edilmiş 6h soyuma müddəti `fallbackResult.baseCooldownMs` kimi ötürülür, lakin yenə də əvvəlcədən mövcud olan model üzrə kvota bloklama yoluna (`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, soyuma müddətinin mənbəyi istisna olmaqla #10334 tərəfindən dəyişdirilməyib) daxil olur: hər bir digər model bloklamasında olduğu kimi, operatorun `mlSettings.maxCooldownMs` dəyərinə (defolt `1_800_000ms` / 30min) qədər azaldılır və _saxlanılan bloklama səbəbi_ qaydanın `"auth_error"` dəyəri deyil, əvvəlcədən mövcud olan sərt kodlaşdırılmış `"forbidden"` dəyəri olaraq qalır — başdan sona yalnız soyuma müddəti nəzərə alınır, səbəb sətri yox. Bağlantının özü aktiv qalır; eyni bağlantıdakı digər modellərə təsir göstərilmir.

Yenidən ifadə edilmiş kvota xətaları (`额度不足`) istehsal mühitində provayder qaydasına uyğun gəlir
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, özünə aid elan edilmiş gözləmə müddəti yoxdur — persistensiya qatının
miqyaslandırılmış eksponensial gecikmə üzrə standart dəyəri tətbiq olunur). #10334-dən bəri
`ProviderErrorRuleMatch` üzərindəki `scope` başdan sona istifadə olunur, lakin **yalnız**
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` icazə siyahısındakı provayderlər üçün
(`providerErrorRules.ts` — hazırda yalnız `"agentrouter"`,
`honorsRuleLockScope()` vasitəsilə məhdudlaşdırılır). Bütün digər
provayderlər üçün `scope`, #10334-dən əvvəl olduğu kimi, yalnız məlumat xarakterli olaraq qalır.
`checkFallbackError` uyğun gələn qaydanın əhatə dairəsini
`fallbackResult.ruleScope` kimi təqdim edir; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) isə `ruleScope` dəyərinin bağlantı miqyasında, öz-özünə bərpa olunan
siqnal kimi nəzərə alınmasının həqiqətən təhlükəsiz olduğunu təsdiqləyən ortaq yoxlamadır
(əhatə dairəsi `"connection"`, səbəb `quota_exhausted`, heç vaxt `permanent` deyil,
heç vaxt `creditsExhausted` deyil — gələcəkdə `"connection"` əhatə dairəsini
daimi hesab vəziyyəti ilə əlaqələndirən qaydaya qarşı müdafiədir). Ondan iki istehlakçı istifadə edir:

- **Persistensiya** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  agentrouter `passthroughModels: true` olduğu üçün → `hasPerModelQuota()`
  `true` qaytardığından, tranzit provayderin **hər model üzrə** bloklama
  qoluna düşmək əvəzinə **müvəqqəti bağlantı gözləmə müddəti** tətbiq edir —
  `testStatus: "unavailable"` + `rateLimitedUntil`, heç vaxt terminal status
  (`credits_exhausted`/`banned`/`expired`) deyil — beləliklə, bağlantı
  gözləmə müddəti bitdikdən sonra əl ilə etimadnamə sıfırlanmasını tələb etmək əvəzinə
  öz-özünə bərpa olunur. `disableCooling: true` olan bağlantılar üçün
  ötürülür (#2997): bu imtina seçimi əvəzində hər model üzrə bloklamaya keçir
  (sənədləşdirilmiş kompromisdir — qolun üstündəki kod şərhinə baxın).
- **Eyni sorğu daxilində kombinasiya marşrutlaşdırması** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): eyni yoxlama bağlantını
  `${provider}:${connectionId}` açarı ilə yaddaşdaxili `exhaustedConnections`
  çoxluğunda işarələyir. Bu, yalnız qalan EYNİ-SORĞU hədəfinin _öz hədəf
  obyektində artıq məhz həmin `connectionId` dəyəri olduqda_ onu ötürür
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` — `exhaustedConnections` axtarışından əvvəl) — qardaş
  hədəflərin özlərinə bərkidilmiş `connectionId` daşımadığı və dəyərin yalnız hər göndəriş üzrə
  cavabın `X-OmniRoute-Selected-Connection-Id` başlığından müəyyən edildiyi adi
  model siyahısı kombinasiyası heç vaxt həmin açarla uyğunlaşmır. Bu ümumi
  halda qalan qolun indicə tükənmiş hesabdan təkrar istifadəsinə qarşı həqiqi
  qoruma bu Set DEYİL — yuxarıdakı persistensiya qatının
  (bağlantının `rateLimitedUntil` dəyəri artıq gələcəkdədir) eyni yoxlamanın
  xəta üçün `transientRateLimitedProviders` dəyərini boğması ilə birləşməsidir
  (`targetExhaustion.ts` daxilindəki `isAgentrouterConnectionQuotaScope`
  qoluna aid kod şərhinə və aşağıdakı "İki mərhələli dizayn" bölməsinə baxın):
  həmin Set işarələnmədikdə `combo.ts` faylındakı `allowRateLimitedConnection`
  məcburi icazəsi (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`)
  provayderin qalan qolları üçün işə düşmür; buna görə etimadnamə seçiminin
  `rateLimitedUntil` filtri (`src/sse/services/auth.ts:1238`) normal şəkildə
  nəzərə alınır və qalan qol ya fərqli, hələ də uyğun agentrouter
  bağlantısını seçir, ya da əlçatan etimadnamə olmadığı üçün uğursuz olur —
  bu qolun indicə gözləmə rejiminə keçirdiyi bağlantıya məcburi şəkildə qayıtmır.

### İki mərhələli dizayn: statusun yenidən ifadəsi, sonra təsnifat

Statusun yenidən ifadəsi (`upstreamStatusRestatement.ts`) və provayder
təsnifat qaydaları (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) həm provayder identifikatorunu, həm də mətn markerlərini açar kimi
istifadə edən ayrı reyestrlərdir, lakin onlar fərqli yerlərdə işləyir və fərqli
məqsədlərə xidmət edir: yenidən ifadə `chatCore.ts` daxilində HTTP statusunu erkən mərhələdə
yenidən yazır; təsnifat qaydaları isə `checkFallbackError()` daxilində
ehtiyat `reason` dəyərini və kilid `scope` dəyərini
(`model` / `provider` / `connection`) seçir
(`open-sse/services/accountFallback.ts`).

Təsnifat qaydaları yalnız `providerErrorRules.ts` daxilindəki
`FULL_TEXT_RULE_PROVIDERS` icazə siyahısında göstərilən provayderlər üçün tam xəta
**mətnini** görür (`额度不足` kimi gövdə markerlərinə uyğun gəlmək üçün lazımdır) —
hazırda yalnız `"agentrouter"`. Bütün digər **daxili kataloq** provayderləri üçün
`checkFallbackError`, `getProviderErrorRuleMatch` funksiyasına yalnız strukturlaşdırılmış
xətanı (`{code, type}`) ötürür; bu, başlıq/status/kod əsaslı qaydalar üçün
kifayətdir, lakin gövdə mətni markerlərini görə bilmir.
`resolveRuleMatchBody()` köməkçisi bu seçimi həyata keçirir: icazə siyahısındakı
provayderlər üçün tam xəta mətni, digərləri üçün isə strukturlaşdırılmış xəta.
**Daxili** provayderin `FULL_TEXT_RULE_PROVIDERS` siyahısına əlavə edilməsi
hər provayder üzrə açıq seçimdir — bu, siyahıda olmayan hər provayder üçün
standart yolun bayt-bayt dəyişməz qalmasını təmin etmək məqsədi daşıyır.

Qaydanın `scope` dəyəri (`model` / `provider` / `connection`)
`FULL_TEXT_RULE_PROVIDERS` seçimindən ayrıdır: `checkFallbackError` onu yalnız
`fallbackResult.ruleScope` kimi təqdim edir və aşağı axındakı istehlakçılar
onu məlumat xarakterli etiketdən fərqli şəkildə yalnız eyni fayldakı
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` icazə siyahısında olan provayderlər üçün nəzərə alır
(`honorsRuleLockScope()` vasitəsilə məhdudlaşdırılır — hazırda yalnız
`"agentrouter"`). Provayder həmin icazə siyahısında olduqdan sonra
`scope: "connection"` uyğunluğunun əslində nə etdiyini öyrənmək üçün yuxarıdakı
"Yenidən ifadə edilmiş kvota xətaları" bölməsinə baxın.

**#11104 — operator tərəfindən elan edilən qaydalar hər iki icazə siyahısından yan keçir.** Operator bu faylı redaktə etmədən `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
vasitəsilə icra zamanı hər provayder üçün ayrıca qayda elan edə bilər. Operator qaydasını daxili kataloq qaydalarının **standart** davranışını qorumaq üçün nəzərdə tutulmuş
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` icazə siyahıları ilə məhdudlaşdırmaq, qaydanın elan edilməsinin artıq operatorun açıq şəkildə razılıq verməsi olduğunu nəzərə alsaq, parametrlər mexanizmini orada artıq sadalanmış provayderlərdən başqa bütün provayderlər üçün təsirsiz edərdi. Həm `resolveRuleMatchBody()`, həm də `honorsRuleLockScope()` əvvəlcə
`hasOperatorRuleForProvider()` yoxlamasını aparır: operator qaydası olan provayder xam xəta mətnini əldə edir və onun elan edilmiş `scope` dəyərinə hər iki icazə siyahısından hər hansı birində olub-olmamasından asılı olmayaraq riayət edilir.

**Məlum boşluq — HTTP 400 üçün `providerRuleRegistry` heç vaxt yoxlanılmır.**
`checkFallbackError` funksiyasının `BAD_REQUEST` budağı status 400-ü tamamilə öz nümunə massivləri (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` və s., `accountFallback.ts` daxilində) vasitəsilə təsnif edir və ondan yuxarıdakı `configuredRule`/`getProviderErrorRuleMatch` budağına çatmazdan əvvəl nəticə qaytarır.
`status: 400` olan daxili kataloq qaydası (və ya operator qaydası) sintaktik baxımdan düzgündür, lakin heç vaxt işə düşməyəcək. Hazırda mövcud qaydaların heç biri 400-ü hədəfləmir, buna görə istehsal mühitində heç nə təsirlənmir — lakin gələcək 400 qaydası əvvəlcə bu budağa toxunmağı tələb edəcək; bu isə qayda əlavə etməkdən daha böyük dəyişiklikdir (nümunə massivi davranışına artıq güvənən hər bir provayder üçün 400-ü yenidən təsnif edir) və tək provayder üçün qayda əlavə edilməsinin əhatə dairəsindən kənardadır.

### Kvotanı yanlış ifadə edən yeni şlüzün əlavə edilməsi

1. `statusRestatementRegistry` daxilində bir qayda massivi qeydiyyatdan keçirin
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers` dəyərlərini
   provayderə xas saxlayın; `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) ilə üst-üstə düşən ümumi ingilis ifadələrini heç vaxt təkrar istifadə etməyin.
2. Düzgün kilid əhatə dairəsini seçmək üçün istəyə bağlı olaraq
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) daxilində təsnifat qaydalarını qeydiyyatdan keçirin (`connection` hesab miqyaslı kvota üçün, `model` isə modelə görə xətalar üçün). Bu addım istehsal mühitində yalnız qaydaları tam xəta mətninə (gövdə markerlərinə) ehtiyac duyan provayderlər üçün qüvvəyə minir: provayder identifikatorunu eyni fayldakı `FULL_TEXT_RULE_PROVIDERS` siyahısına əlavə edin — əks halda `checkFallbackError` qaydaya yalnız strukturlaşdırılmış
   `{code, type}` xətasını ötürür və gövdə mətninə əsaslanan qayda canlı trafikdə heç vaxt uyğun gəlmir.
   Yalnız `status`/`headers` əsasında uyğunluq tapan qaydalar (Opencode və ya Minimax qaydaları kimi) bu aktivləşdirməni tələb etmir. Bundan ayrıca, qayda
   `scope: "connection"` elan edirsə və məqsəd sadəcə məlumat xarakterli etiket deyil, faktiki bağlantı miqyaslı gözləmə müddəti və eyni sorğu daxilində kombinasiya keçididirsə, provayder identifikatorunu eyni fayldakı `HONORS_RULE_LOCK_SCOPE_PROVIDERS` siyahısına əlavə edin — bu, `markAccountUnavailable()` (`src/sse/services/auth.ts`) daxilindəki `isAgentrouterConnectionQuotaScope()` tipli istehlakı və
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) funksiyasını idarə edir; bunsuz `scope`
   hələ də `fallbackResult.ruleScope` vasitəsilə ötürülür, lakin heç nə ona əsasən hərəkət etmir.
3. `tests/unit/upstream-status-restatement.test.ts`
   və `tests/unit/agentrouter-error-rules.test.ts` fayllarını nümunə götürərək vahid testləri əlavə edin (daimi olmama / `creditsExhausted` olmama qoruyucuları və — əgər provayderə icazə siyahısı lazımdırsa — `resolveRuleMatchBody()` funksiyasının yalnız həmin provayder üçün tam mətni qaytardığını təsdiqləyən test daxil olmaqla).

`chatCore.ts`, `classifyError` və ya kombinasiya kodunda heç bir dəyişiklik tələb olunmur.

#### Çıxış üzrə qruplaşdırılmış kilid (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` siyahısındakı provayderlər (opencode ailəsi) IP üzrə qruplaşdırılmış yuxarı axın kimi qəbul edilir (opencode-un pulsuz səviyyəsi hesab üzrə deyil, IP üzrə qruplaşdırılıb — baxın: #9611): `quota_exhausted`
**və ya** `rate_limit_exceeded` kimi təsnif edilmiş status-429, rotasiya onları sınamazdan əvvəl son məlum çıxış IP-si uğursuz bağlantının IP-si ilə uyğun gələn, icazə siyahısındakı ailəyə aid bütün bağlantıları gözləmə rejiminə keçirir
— beləliklə, uğursuz olacağına zəmanət verilən N-1 yuxarı axın çağırışının qarşısı alınır (#10460/#10525 ilə eyni quruluş).
`rate_limit_exceeded` qəsdən daxil edilib: `markAccountUnavailable`
yolunda opencode-a xas qaydalar heç vaxt uyğun gəlmir (`checkFallbackError` funksiyasına başlıqlar/gövdə ötürülmür, opencode `FULL_TEXT_RULE_PROVIDERS` siyahısında deyil), buna görə gövdəsində abunə kvotası mətni ("monthly usage limit
reached") olan 429, `status_429` qaydasına çatmamışdan əvvəl kvota mətni ehtiyat mexanizmi
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 saatlıq gözləmə müddəti) tərəfindən `quota_exhausted` kimi təsnif edilir — kvota mətni olmayan 429 isə (adi sürət məhdudlaşdırması) `status_429` qaydası vasitəsilə `rate_limit_exceeded` kimi təsnif edilir və yenə də IP ailəsini gözləmə rejiminə keçirir. İcazə siyahısındakı provayder üçün IP üzrə qruplaşdırılmış sürət məhdudiyyəti tükənmiş kvota ilə eyni siqnaldır. Faktiki məhdudiyyətlər:

- **Ən yaxşı səy prinsipi**: kilid bağlantının son məlum `egress_ip`
  dəyərini `proxy_logs`-dan müəyyən edir (24 saatlıq pəncərə, sinxron, keşsiz).
  Soyuq keş (`egress` IP-si heç vaxt yoxlanılmayıb) və ya sətrin olmaması →
  uğursuz bağlantı yenə də budaq tərəfindən soyutma rejiminə keçirilir (indiki
  kimi qeydə alınır), sadəcə heç bir əlaqəli bağlantı kilidlənmir.
- **Heç vaxt terminal deyil**: soyutma yenilənən kvota pəncərəsidir
  (`testStatus: "unavailable"`); IP səviyyəli siqnaldan heç vaxt daimi vəziyyət
  çıxarılmır. `disableCooling` bağlantıları bu budağı tamamilə ötürür.
- **İcazə siyahısındakı ailə üçün kilid qranulyarlığı dəyişir**: bu, yalnız
  əlaqəli bağlantı optimallaşdırması deyil, əhatə dairəsi dəyişikliyidir.
  opencode `passthroughModels` provayderidir, buna görə də bu budaqdan əvvəl 429
  hər MODEL üzrə kilidlənmə yaradırdı; indi isə bağlantının soyudulmasını
  yaradır — hətta heç bir əlaqəli bağlantısı olmadan tək bağlantı işlədən
  operator üçün belə. Bu, opencode qaydalar cədvəlinin artıq düzgün elan etdiyi
  qranulyarlıqdır (`scope: "connection"`, `providerErrorRules.ts`), lakin
  opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS` daxilində olmadığı üçün indiyədək
  heç vaxt tətbiq edilməyib. Budaq bağlantı əhatəli agentrouter budağını
  təkrarlayaraq uğursuz bağlantının soyutmasını + `backoffLevel` dəyərini özü
  yazır və geri qayıdır — aşağıdakı hər model üzrə blok və ümumi yol heç vaxt
  icra edilmir.
- **Combo daxildir**: agentrouter budağında olduğu kimi, əhatə dairəsi combo
  çağıranın 429-a tətbiq etdiyi `persistUnavailableState`/`isCombo`
  zəiflətməsini qəsdən nəzərə almır. Hər model üzrə kilidlənmə bu əhatə
  dairəsinin daha zəif forması deyil, yanlış vahiddir: tükənmiş IP barədə heç
  nə bildirmir, buna görə combo rotasiyası hər əlaqəli bağlantı üçün zəmanətli
  şəkildə uğursuz olacaq bir çağırışı sərf etməyə davam edərdi.
- **Əlaqəli bağlantıların təhlükəsizliyi**: artıq terminal vəziyyətdə olan
  (banned/credits_exhausted) və ya daha uzun soyutma rejimində olan əlaqəli
  bağlantının üzərinə heç vaxt yazılmır.
- **Eksklüziv icazə siyahısı**: `EGRESS_BUCKETED_LOCK_PROVIDERS` siyahısının
  genişləndirilməsi sahibin açıq qərarıdır; ümumi qoşulma yoxdur
  (nümunə #10334/#10419). Əlaqəli bağlantı sorğusu həmin icazə siyahısını SQL
  literalı kimi təkrarlamaq əvəzinə ona bağlanır, beləliklə onun
  genişləndirilməsi bir sətirlik dəyişiklik olaraq qalır.
- **Hər iki istiqamətdə egress IP rotasiyası**: axtarış pəncərəsi (24 saat)
  egress-IP keşinin TTL müddətindən (5 dəq) xeyli genişdir, buna görə “son məlum
  IP” cari vəziyyət deyil, tarixçədir. Bağlantının proksisi bu pəncərə ərzində
  rotasiya edibsə, kilid həqiqətən paylaşılan IP-ni **gözdən qaçıra** bilər
  (qeydə alınmış IP yeni, tükənməmiş IP-dir) — simmetrik olaraq isə tükənmiş
  IP-dən artıq uzaqlaşmış **əlaqəli bağlantını soyutma rejiminə keçirə** bilər.
  İkinci hal həmin əlaqəli bağlantıya bir soyutma pəncərəsi bahasına başa gəlir;
  hər iki hal tarixçəyə əsaslanan axtarışın qəbul edilmiş ən yaxşı səy
  məhdudiyyətləridir.
- **Xərc**: `proxy_logs` üzərində iki məhdud skan (pəncərə üzrə
  `idx_pl_timestamp` vasitəsilə filtrlənir), yalnız 429 tezliyində. Yeni indeks
  yoxdur (miqrasiya 134 YAGNI). Orta ölçülü real trafik verilənlər bazasının
  nüsxəsində ölçülüb; yüksək ötürmə qabiliyyətli instans eyni pəncərədə
  mütənasib olaraq daha çox sətir saxlayır.

---

## Digər Dayanıqlılıq Xüsusiyyətləri

- **19 marşrutlaşdırma strategiyası** (prioritet, çəkili, dövri, kontekst ötürülməsi, əvvəlcə doldurma, p2c, təsadüfi, ən az istifadə olunan, xərc baxımından optimallaşdırılmış, sıfırlanmanı nəzərə alan, sıfırlama pəncərəsi, ehtiyat tutumu, ciddi təsadüfi, avtomatik, lkgp, kontekst üçün optimallaşdırılmış, keş üçün optimallaşdırılmış, birləşmə, konveyer) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) sənədinə baxın.
- **Sıfırlanmanı nəzərə alan marşrutlaşdırma** (v3.8.0) — bağlantıları kvotanın sıfırlanma vaxtına görə prioritetləşdirir.
- **Fon rejiminin aşağı salınması** — Responses API üçün `background: true` xəbərdarlıqla sinxron rejimə keçirilir.
- **Dinamik alət limiti aşkarlanması** — alət sayı limitlərinə çatıldıqda provayderlərdən geri çəkilir.
- **Fövqəladə alternativə keçid** — `OMNIROUTE_EMERGENCY_FALLBACK` tərəfindən idarə olunur; operatorlar sistemi yenidən başlatmadan Funksiya Bayraqları səhifəsindən bunu dəyişə bilərlər.

---

## Sazlama

- Çəkili kombinasiya `503 all_targets_cooling_down` cavabı verir (`Retry-After` təyin edilib, `diagnostics.excluded` isə hər bir hədəfi `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` səbəbləri ilə sadalayır) → hovuz konfiqurasiya edilib və qoşulub, sadəcə hər bir hədəf dayanıqlılıq taymeri tərəfindən istisna edilib; `[COMBO] Weighted selection: every target excluded before dispatch — …` xəbərdarlığı səbəbləri və qalan saniyələri göstərir. Eyni kombinasiyadan gələn `404 no_executable_targets` cavabı heç bir dayanıqlılıq taymerinin işə düşmədiyini bildirir (icra ediləcək heç nə yoxdur və ya hər hesab əlçatanlıq yoxlamasından keçməyib). `targetResolution.ts` daxilində toplanmış istisnalar əsasında `open-sse/services/combo/pinRecovery.ts` daxilində yaradılıb.
- Provayder üçün bütün açarlar ötürülüb → həm dövrəqıranın vəziyyətini, həm də hər bir bağlantının `rateLimitedUntil`/`testStatus` dəyərlərini yoxlayın.
- Sıfırlama müddətindən sonra provayder həmişəlik istisna edilir → kod `getStatus()`/`canExecute()` əvəzinə birbaşa `state` oxuyur.
- Bir açar uğursuz olur, digərləri işləməlidir → dövrəqıran əvəzinə bağlantının soyuma müddətinə üstünlük verin.
- Yalnız bir model uğursuz olur → bağlantının soyuma müddəti əvəzinə model bloklanmasına üstünlük verin.
- Vəziyyət öz-özünə bərpa olunmalıdır, lakin olunmur → gələcək zaman damğasının olub-olmadığını və vaxtı bitmiş vəziyyəti yeniləyən oxuma yolunu yoxlayın. Daimi statuslar əl ilə dəyişiklik tələb edir.

---

## TLS Barmaq İzi və Gizlilik

Provayderə xas gizlilik (JA3/JA4, CCH, qarışdırma) ayrıca sənədləşdirilib — `docs/security/STEALTH_GUIDE.md` sənədinə baxın (git; `/docs` daxilində kompilyasiya edilməyib).

---

## Dayanıqlılıq Sınaqları (Mərhələ 8 · Blok C)

Dayanıqlılıq məntiqi üçün vahid testlərdən əlavə, üç test real gərginlik/nasazlıq şəraitində icra mühitini sınaqdan keçirir (hamısı inteqrasiya/gecə testləridir — heç biri PR-ları bloklamır):

| Test                      | Nəyi yoxlayır                                                                                                                                                                                                                                | İcra əmri                             |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| Xaos                      | Saxta yuxarı axın qovşağı real gecikmə/sıfırlama/vaxt aşımı/503 əlavə edir; avtomatik qoruyucunun açıldığını/bərpa olunduğunu və `checkFallbackError` funksiyasının 503-ü bərpa edilə bilən alternativə keçid kimi təsnif etdiyini yoxlayır. | `RUN_CHAOS_INT=1 npm run test:chaos`  |
| Heap artımı               | `--expose-gc` altında hər `createSSEStream` üçün ~500 axın; heap müəyyən edilmiş həddi keçərsə, test uğursuz olur (OOM qoruyucusu #3069).                                                                                                    | `npm run test:heap`                   |
| k6 uzunmüddətli yük testi | `/api/monitoring/health` ünvanına davamlı yük; p95/xəta hədləri.                                                                                                                                                                             | `k6 run tests/load/k6-soak.js` (gecə) |

`.github/workflows/nightly-resilience.yml` tərəfindən idarə olunur (cron + əl ilə işə salma). Standart
`test:integration` zamanı xaos və heap testləri öz-özünə ötürülür (`RUN_CHAOS_INT`/`--expose-gc` olmadıqda).

---

## Həmçinin baxın

- [Arxitektura təlimatı](./ARCHITECTURE.md) — Sistem arxitekturası və daxili mexanizmlər
- [İstifadəçi təlimatı](../guides/USER_GUIDE.md) — Provayderlər, kombinasiyalar, CLI inteqrasiyası
- [Avtomatik kombinasiya mühərriki](../routing/AUTO-COMBO.md) — 16 amilli qiymətləndirmə, rejim paketləri
