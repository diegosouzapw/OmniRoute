# Authorization Guide (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Əsas mənbə:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Son yenilənmə:** 2026-06-28 — v3.8.40

OmniRoute hər bir API sorğusuna nəzarət edən, marşrutdan xəbərdar avtorizasiya konveyerinə malikdir. Təsnifat **deterministikdir** və **uğursuzluq halında girişi rədd edir** — təsnif edilə bilməyən hər şey `MANAGEMENT` kateqoriyasına düşür və sessiya və ya idarəetmə səviyyəli token tələb edir. Bu səhifə marşrutlara texniki xidmət göstərən və ya yeni son nöqtələr layihələndirən mühəndislər üçün modeli izah edir.

![AuthZ konveyeri (3 marşrut sinfi + siyasətin qiymətləndirilməsi)](../diagrams/exported/authz-pipeline.svg)

> Mənbə: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## İki autentifikasiya rejimi

### 1. API açarı (Bearer)

OpenAI/Anthropic/Gemini ilə uyğun müştəri API-ləri və açar `manage` əhatə dairəsinə malik olduqda bəzi idarəetmə marşrutları üçün istifadə olunur.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` faylındakı `isValidApiKey()` / `extractApiKey()` vasitəsilə yoxlanılır və `src/shared/utils/apiAuth.ts` üzərindən yenidən ixrac edilir. Validator həmçinin `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` mühit dəyişənlərini daimi birbaşa ötürmə açarları kimi qəbul edir (məsələ #1350).

### 2. İdarə paneli sessiyası (auth_token kukisi)

İdarə paneli səhifələri və administrator əməliyyatları üçün.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Kuki yalnız JWT yoxlamadan keçdikdə **və** `authenticated: true` daşıdıqda sessiya hesab olunur
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Kukidən
istifadə edən hər bir komponent (marşrut qoruyucusu, authz konveyerinin yenilənməsi, WebSocket bağlantısının qurulması, canlı
server, `/api/settings/require-login`, `/api/auth/status`) həmin köməkçi funksiyadan keçir.
`JWT_SECRET` ilə imzalanmış digər JWT-lər də mövcuddur — Cursor CLI birbaşa ötürməsi açar sahibləri üçün
`iss "omniroute" / aud "cursor-cli"` tokenləri yaradır — və bunlar heç vaxt sessiya hesab edilmir
(#13298).

`src/shared/utils/apiAuth.ts` faylındakı `isDashboardSessionAuthenticated()` tərəfindən yoxlanılır. JWT-nin 30 günlük etibarlılıq müddətinin bitməsinə 7 gündən az qaldıqda konveyer onu avtomatik yeniləyir.

Bəzi idarəetmə marşrutları **hər iki** rejimi qəbul edir: kuki VƏ YA API açarı `manage` (və ya `admin`) əhatə dairəsinə malik olduqda `Bearer <key>`. Bu, v3.8 versiyasında əlavə edilmiş «API çağırışları vasitəsilə konfiqurasiya edilə bilən» iş axınını mümkün edir.

#### İxtiyari OIDC giriş nəzarəti (#6973)

İdarə panelinin administrator girişi standart parol girişinə əlavə olaraq **seçim əsasında aktivləşdirilən** OIDC (OpenID Connect) axınını da dəstəkləyir — parol girişi heç vaxt ləğv edilmir, yalnız əlavə imkanla tamamlanır:

- `settings.oidcEnabled === true` olmadığı **və** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` hamısı konfiqurasiya edilmədiyi müddətdə deaktivdir (Settings → Auth).
  Əks halda `GET /api/auth/oidc/login` `400` qaytarır.
- `GET /api/auth/oidc/login` emitentin
  `/.well-known/openid-configuration` ünvanından `authorization_endpoint` son nöqtəsini aşkarlayır (`<issuer>/authorize`
  ünvanına ehtiyat keçid edir), daxil olan sorğu əsasında yönləndirmə URI-sini qurur
  (`x-forwarded-proto` nəzərə alınmaqla) və `httpOnly` `oidc_state` kukisində saxlanılan təsadüfi `state`
  ilə IdP-yə yönləndirir.
- `GET /api/auth/oidc/callback` `state` dəyərini yoxlayır, avtorizasiya
  kodunu mübadilə edir və `issuer`/`audience` yoxlamaları ilə emitentin JWKS-i
  (`jose` paketinin `createRemoteJWKSet` funksiyası, hər JWKS URI-si üçün keşlənir) vasitəsilə ID tokeninin imzasını yoxlayır.
  İxtiyari `oidcAllowedSubjects` icazə siyahısı tokenin `sub`
  iddiası və ya `email` iddiası ilə uyğunluq axtarır — email iddiası yalnız
  `email_verified === true` olduqda qəbul edilir, buna görə IdP-də təsdiqlənməmiş email heç vaxt
  nəzarətdən keçə bilməz.
- Uğurlu olduqda, parol girişinin yaratdığı 30 günlük `auth_token` JWT-sinin **tam eynisini**
  yaradır (`src/app/api/auth/login/route.ts`), buna görə idarə paneli
  sessiya konveyerinin qalan hissəsi (avtomatik yenilənmə, kuki bayraqları) dəyişməz qalır —
  OIDC yalnız kukinin necə yaradıldığını əvəz edir, onun verdiyi icazələri deyil.

## Marşrut Sinifləri

`src/server/authz/types.ts` üç sinif müəyyən edir; deterministik şəkildə təsnif edilə bilməyən istənilən marşrut standart olaraq `MANAGEMENT` sinfinə aid edilir.

| Sinif        | Təsvir                                                                                                                                                            | Tələb olunan autentifikasiya                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `PUBLIC`     | Açıq şəkildə təhlükəsiz marşrutlar — giriş, çıxış, status, ilkin quraşdırma, sistem sağlamlığı, ilkin istifadəçi quraşdırması.                                    | Yoxdur                                                                 |
| `CLIENT_API` | Model təqdimetmə son nöqtələri — `/api/v1/*`, `/api/v1beta/*`, həmçinin `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*` aliasları. | Effektiv `REQUIRE_API_KEY` funksiya bayrağı aktiv olduqda Bearer açarı |
| `MANAGEMENT` | İdarə paneli səhifələri, parametrlər, provayderlər, açarlar, administrator və diaqnostika son nöqtələri.                                                          | İdarə paneli sessiyası VƏ YA `manage` əhatə dairəsinə malik Bearer     |

## Konveyer

```
Daxil olan sorğu → src/proxy.ts
  → src/server/authz/pipeline.ts daxilində runAuthzPipeline()
    1. Etibarlı daxili başlıqları sil (x-omniroute-auth-*, x-omniroute-route-class)
    2. Sorğu identifikatoru yarat, marşrutu classifyRoute() vasitəsilə təsnif et
    3. Əgər pathname == "/" olarsa → /dashboard ünvanına yönləndir
    4. Boşaltma rejimindədirsə (nizamlı dayandırma) və /api/* olarsa → 503
    5. GET olmayan /api/* sorğusudursa → checkBodySize() qoruyucusunu yoxla
    6. Əgər OPTIONS olarsa → CORS ilkin sorğusuna 204 cavabı ver
    7. Əgər options.enforce == false olarsa → marşrut sinfi başlıqları ilə dəyişiklik etmədən ötür
    8. Əks halda: POLICIES[routeClass].evaluate(ctx)
       - icazə ver  → x-omniroute-auth-{kind,id,label,scopes} əlavə et → NextResponse.next()
       - rədd et → correlation_id ilə JSON xətası (idarə paneli səhifələri → 302 /login)
```

Etibarlı daxili başlıqlar (`src/server/authz/headers.ts` daxilində müəyyən edilib) təsnifatdan əvvəl **daxil olan sorğulardan silinir** — müştərilər subyekti təqlid etmək üçün `x-omniroute-auth-*` başlıqlarını əvvəlcədən təyin edə bilməzlər.

### Siyasət müqavilələri

Hər marşrut sinfinin `src/server/authz/policies/` daxilində bir siyasəti var:

- **`publicPolicy`** (`policies/public.ts`) — həmişə `allow({ kind: "anonymous", id: "anonymous" })` qaytarır.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer açarını çıxarır və `validateApiKey()` vasitəsilə doğrulayır. Yalnız effektiv `REQUIRE_API_KEY` funksiya bayrağı deaktiv olduqda anonim girişə keçid edir. Effektiv bayraq `isRequireApiKeyEnabled()` vasitəsilə müəyyən edilir (`DB funksiya bayrağı əvəzləməsi > process.env.REQUIRE_API_KEY > standart dəyər`), beləliklə, İdarə Panelindəki Funksiya Bayraqları və mühit dəyişənləri `/api/v1/*`, `/api/v1beta/*` və aliasları ardıcıl şəkildə idarə edir; həlledici xətaları zamanı giriş bağlı saxlanılır. Müştəri API-si marşrutlarında idarə paneli sessiyası ilə edilən sorğulara icazə verir (idarə panelinin model kataloqu tərəfindən istifadə edilən `/api/v1/models` daxil olmaqla).
- **`managementPolicy`** (`policies/management.ts`) — idarə paneli sessiyasını, daxili model sinxronlaşdırma sorğularını (`/api/providers/[name]/(sync-models|models)` ilə uyğunlaşdırılır) qəbul edir və ya `isAuthRequired()` false qaytardıqda yoxlamanı tamamilə ötürür. Bearer tokeni təqdim edildikdə, lakin etibarsız olduqda 403 (`AUTH_001`), əks halda isə 401 qaytarır. Həmçinin hər hansı autentifikasiya şaxəsindən əvvəl marşrut qoruyucusu səviyyələrini (LOCAL_ONLY / ALWAYS_PROTECTED) tətbiq edir — baxın: [Marşrut Qoruyucusu Səviyyələri](../security/ROUTE_GUARD_TIERS.md). `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` daxilindəki LOCAL_ONLY yollarına (hazırda: `/api/mcp/`) Bearer açarı `manage` əhatə dairəsinə malik olduqda loopback olmayan ünvanlardan giriş mümkündür; bütün digər LOCAL_ONLY yolları əhatə dairəsindən asılı olmayaraq yalnız loopback üçün əlçatan qalır.

Uğurlu siyasət `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` olan `AuthSubject` qaytarır. Aşağı axındakı işləyicilər autentifikasiya məntiqini yenidən icra etmək əvəzinə onu `src/server/authz/assertAuth.ts` daxilindəki `assertAuth(request, "CLIENT_API")` vasitəsilə oxuya bilərlər.

## Açıq marşrutların siyahısı

`src/shared/constants/publicApiRoutes.ts` açıq şəkildə müəyyən edilmiş icazə siyahısıdır:

Siyahı **formasına** görə bölünüb və bu bölgü kritik əhəmiyyət daşıyır (GHSA-74g9-q8f6-793h): prefiks
`startsWith()` ilə uyğunlaşdırılır, buna görə də başlanğıc simvollarını paylaşan bütün bitişik yollarla uyğun gəlir.
Prefiks kimi `/api/usage/om-usage`, `/api/usage/om-usage<anything>` yolunu AÇIQ kimi işarələyirdi və Next bunu
öz autentifikasiyası olmayan `/api/usage/[connectionId]` işləyicisinə yönləndirirdi.

```ts
// Həqiqi alt ağaclar. Hər bir element "/" ilə bitməlidir (vahid testi ilə yoxlanılır).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify daxilində CLIENT_API kimi qəbul edilir, "autentifikasiyasız açıq" kimi deyil
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Dəqiq uyğunlaşdırılan tək marşrutlar (sonda maili xətt ilə və ya onsuz).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Həmçinin CORS mənşə məhdudiyyətinin yumşaldılması tətbiq olunan yalnız oxuma üçün tək marşrutlar.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS məhdudiyyətinin yumşaldılması OLMADAN yalnız oxuma üçün tək marşrut.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Yalnız oxuma üçün marşrutlar yalnız təhlükəsiz metodlar üçün açıqdır. Qeyd: `classifyRoute()` `/api/v1/*` və `/api/v1beta/*` marşrutlarını PUBLIC ehtiyat uyğunluğundan çıxarır — Bearer açarı siyasətinin hələ də tətbiq olunması üçün bunlar həmişə `CLIENT_API` olur.

## Yeni marşrutun əlavə edilməsi

### Nümunə 1 — Açıq müştəri API son nöqtəsi (Bearer autentifikasiyası)

`/api/v1/` və `/api/v1beta/` altındakı marşrutlar avtomatik olaraq `CLIENT_API` kimi təsnif edilir. Ara proqram Bearer yoxlamasını tətbiq edir; marşrut işləyicilərinin bunu təkrar etməsinə ehtiyac yoxdur, lakin faydalı olarsa subyekti oxuya bilərlər.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... işləyici məntiqi
}
```

### Nümunə 2 — İdarəetmə son nöqtəsi (sessiya və ya Bearer + manage)

`src/lib/api/requireManagementAuth.ts` faylındakı `requireManagementAuth()` funksiyasından istifadə edin:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... işləyici məntiqi
}
```

`requireManagementAuth()` uğur halında `null`, əks halda isə JSON xətası olan `Response` qaytarır:

- 401 `AUTH_001` "Autentifikasiya tələb olunur" — ümumiyyətlə heç bir giriş məlumatı yoxdur
- 403 — etibarsız Bearer **və ya** Bearer mövcuddur, lakin açarda `manage` / `admin` əhatə dairəsi yoxdur

`hasManageScope(scopes)` funksiyası `"manage"` və ya `"admin"` üçün true qaytarır.

### Nümunə 3 — Açıq icazə siyahısına əlavə etmə

Çoxluğu rahatlığa görə deyil, formasına görə seçin. Bir marşrut `PUBLIC_API_ROUTES_EXACT` çoxluğuna (və ya yalnız GET üçün `PUBLIC_READONLY_CORS_API_ROUTES` siyahısına) daxil edilir; yalnız həqiqi alt ağac `PUBLIC_API_ROUTE_PREFIXES` siyahısına daxil edilir və o, **`/` ilə bitməlidir**. Tək marşrutu prefiks siyahısına daxil etmək, başlanğıc simvollarını onunla paylaşan bütün bitişik yolları, o cümlədən sonradan əlavə edilən dinamik seqmentli qardaş marşrutları da açıq edir (GHSA-74g9-q8f6-793h). `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` və `tests/unit/authz/classify.test.ts` fayllarındakı vahid testlərini yeniləyin.

## Əhatə dairələri

API açarları `scopes` massivini daşıyır (`api_keys.scopes` daxilində JSON kimi saxlanılır, bax: `src/lib/db/apiKeys.ts`).

### İdarəetmə əhatə dairəsi

- `manage` / `admin` — Bearer kimi göndərildikdə açara idarəetmə API son nöqtələrinə giriş imkanı verir.

### MCP əhatə dairələri (`src/shared/constants/mcpScopes.ts`)

Hər bir MCP aləti `MCP_TOOL_SCOPES` vasitəsilə müəyyən əhatə dairələri tələb edir. Tam siyahı (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

`open-sse/mcp-server/server.ts` daxilində əhatə dairələrinin tətbiqi, `resolveCallerScopeContext()` funksiyası MCP autentifikasiya məlumatlarından,
sorğu metadatasından və ya `OMNIROUTE_MCP_SCOPES` dəyişənindən əhatə dairələrini müəyyən etdikdən sonra hər bir alətin əhatə dairəsi siyahısını
`evaluateToolScopes()` funksiyasına ötürür.

## Autentifikasiya tələbi keçidi

`src/shared/utils/apiAuth.ts` daxilindəki `isAuthRequired()` sorğu üçün **hər hansı** autentifikasiyanın tətbiq edilib-edilməyəcəyini müəyyən edir:

- `settings.requireLogin === false` → autentifikasiya qlobal olaraq deaktiv edilib.
- Heç bir parol konfiqurasiya edilməyibsə **və** `INITIAL_PASSWORD` mühit dəyişəni yoxdursa → ilkin quraşdırma rejimi işəsalma sehrbazına və loopback sorğularına icazə verir, lakin şəbəkəyə açıq sorğular üçün yenə də giriş məlumatları tələb olunur.
- İstənilən DB xətası → giriş qapalı saxlanılır (standart olaraq təhlükəsiz).

Müştəri API açarının tətbiqi `process.env.REQUIRE_API_KEY` dəyərinin birbaşa oxunmasından deyil, `src/shared/utils/featureFlags.ts` daxilindəki `isRequireApiKeyEnabled()` funksiyasından istifadə edir. Bu, yerləşdirilmiş instansiyalar üçün vacibdir: İdarə paneli → Funksiya bayraqları bölməsində `REQUIRE_API_KEY` parametrinin dəyişdirilməsi DB əvəzləməsini saxlayır və dərhal `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` və bu köməkçi funksiyadan istifadə edən digər müştəri API autentifikasiya yoxlamalarına təsir edir. Funksiya bayraqları yaddaşını oxumaq mümkün olmadıqda, müştəri API autentifikasiyası girişi qapalı saxlayır və açar tələb edir.

## Uyğunluğu pozan dəyişiklik — v3.8.0

`/api/v1/agents/tasks/*` və `/api/resilience/model-cooldowns` son nöqtələri **artıq idarəetmə autentifikasiyası tələb edir** (`588a0333` commit-i). Əvvəllər `manage` əhatə dairəsi olmadan adi API açarı göndərən müştərilər `403` cavabı alır. Miqrasiya: ya API Açarları idarə panelində açara `manage` əhatə dairəsi təyin edin, ya da giriş edilmiş idarə paneli sessiyasından istifadə edin.

## Davranış dəyişikliyi — v3.8.2

`/api/mcp/*` (uzaq MCP serveri) standart olaraq hələ də LOCAL_ONLY rejimindədir, lakin `Authorization: Bearer <api-key>` başlığı `manage` əhatə dairəsini ehtiva etdikdə artıq loopback olmayan sorğuları qəbul edir. Bu istisna `src/server/authz/routeGuard.ts` daxilindəki `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` vasitəsilə hər yol üçün ayrıca aktivləşdirilir; əlaqəli LOCAL_ONLY prefiksi olan `/api/cli-tools/runtime/*` qəsdən bu istisnaya daxil edilmir, çünki ixtiyari alt proseslər başlada bilər. Loopback olmayan mənbələrdən `/api/mcp/*` ünvanına göndərilən anonim sorğular yenə də `403 LOCAL_ONLY` qaytarır — istənilən yeni LOCAL_ONLY yolu üçün standart davranış ciddi loopback məhdudiyyəti olaraq qalır. Baxın: [Marşrut qoruyucusunun səviyyələri](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Sınaq

- Vahid testləri: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- İctimai icazə siyahısı: `tests/unit/public-api-routes.test.ts`.
- Fokuslanmış şəkildə işə salmaq üçün: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Sazlama

Konveyer cavablara həmişə aşağıdakı başlıqları əlavə edir:

```
x-request-id:               <korrelyasiya identifikatoru, xəta gövdələrində təkrarlanır>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Autentifikasiya edilmiş sorğular üçün yuxarı axındakı (işləyici tərəfindəki) sorğu başlıqlarına həmçinin aşağıdakılar daxildir:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<son-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (ixtiyari)
x-omniroute-auth-scopes:    vergüllə ayrılmış siyahı
```

İşləyicilərin daxilində `assertAuth(req, expectedClass)` istifadə edin — aralıq proqram təminatı keçildikdə o, `AUTHZ_NOT_INITIALIZED` kodu ilə `AuthzAssertionError` xətası yaradır (testlərdə konfiqurasiya reqressiyalarını aşkar etmək üçün faydalıdır).

## Həmçinin baxın

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — hər son nöqtə üzrə autentifikasiya markeri
- [COMPLIANCE.md](../security/COMPLIANCE.md) — autentifikasiya hadisələri üçün audit jurnalı
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP əhatə dairəsinin tətbiqi barədə təfərrüatlar
- Mənbə: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
