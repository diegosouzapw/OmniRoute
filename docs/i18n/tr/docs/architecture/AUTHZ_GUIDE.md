# Authorization Guide (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Doğruluk kaynağı:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Son güncelleme:** 2026-06-28 — v3.8.40

OmniRoute, her API isteğini denetleyen, rota farkındalığına sahip bir yetkilendirme işlem hattına sahiptir. Sınıflandırma **deterministiktir** ve **başarısızlık durumunda erişimi reddeder** — sınıflandırılamayan her şey `MANAGEMENT` olarak değerlendirilir ve bir oturum veya yönetim düzeyinde belirteç gerektirir. Bu sayfa, rotaların bakımını yapan veya yeni uç noktalar tasarlayan mühendisler için modeli açıklar.

![AuthZ işlem hattı (3 rota sınıfı + politika değerlendirmesi)](../diagrams/exported/authz-pipeline.svg)

> Kaynak: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## İki Kimlik Doğrulama Modu

### 1. API Anahtarı (Bearer)

OpenAI/Anthropic/Gemini uyumlu istemci API'leri ve anahtarın `manage` kapsamına sahip olduğu birkaç yönetim rotası için kullanılır.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` içindeki `isValidApiKey()` / `extractApiKey()` tarafından doğrulanır ve `src/shared/utils/apiAuth.ts` üzerinden yeniden dışa aktarılır. Doğrulayıcı ayrıca `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ortam değişkenlerini kalıcı doğrudan geçiş anahtarları olarak kabul eder (sorun #1350).

### 2. Pano Oturumu (auth_token çerezi)

Pano sayfaları ve yönetici işlemleri için kullanılır.

```
Cookie: auth_token=<JWT_SECRET ile imzalanmış JWT>
```

Bir çerez yalnızca JWT doğrulandığında **ve** `authenticated: true` taşıdığında oturum olarak kabul edilir
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Çerezin her
tüketicisi (rota koruması, authz işlem hattı yenilemesi, WebSocket el sıkışması, canlı
sunucu, `/api/settings/require-login`, `/api/auth/status`) bu yardımcıdan geçer.
`JWT_SECRET` ile imzalanmış başka JWT'ler de vardır — Cursor CLI doğrudan geçişi,
anahtar sahipleri için `iss "omniroute" / aud "cursor-cli"` belirteçleri oluşturur — ve bunlar hiçbir zaman oturum
olarak kabul edilmez (#13298).

`src/shared/utils/apiAuth.ts` içindeki `isDashboardSessionAuthenticated()` tarafından doğrulanır. İşlem hattı, 30 günlük kullanım ömrünün bitmesine 7 günden az kaldığında JWT'yi otomatik olarak yeniler.

Bazı yönetim rotaları **iki** modu da kabul eder: API anahtarı `manage` (veya `admin`) kapsamına sahipse çerez VEYA `Bearer <key>`. v3.8'de eklenen “API çağrıları aracılığıyla yapılandırılabilir” iş akışını mümkün kılan budur.

#### İsteğe bağlı OIDC oturum açma geçidi (#6973)

Pano yöneticisi oturum açma işlemi, varsayılan parola ile oturum açma yönteminin yanında
**isteğe bağlı** bir OIDC (OpenID Connect) akışını da destekler — parola ile oturum açma hiçbir zaman
kaldırılmaz, yalnızca desteklenir:

- Yalnızca `settings.oidcEnabled === true` olduğunda **ve** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` değerlerinin tümü yapılandırıldığında etkinleştirilir (Ayarlar → Kimlik Doğrulama).
  Aksi durumda `GET /api/auth/oidc/login`, `400` döndürür.
- `GET /api/auth/oidc/login`, sağlayıcının
  `/.well-known/openid-configuration` adresinden `authorization_endpoint` değerini keşfeder (bulamazsa
  `<issuer>/authorize` değerini kullanır), yönlendirme URI'sini gelen istekten
  (`x-forwarded-proto` dikkate alınarak) oluşturur ve rastgele bir `state`
  değerini `httpOnly` özellikli `oidc_state` çerezinde saklayarak IdP'ye yönlendirir.
- `GET /api/auth/oidc/callback`, `state` değerini doğrular, yetkilendirme
  kodunu takas eder ve ID belirtecinin imzasını sağlayıcının JWKS'si aracılığıyla
  (`jose` paketinin `createRemoteJWKSet` işlevi; her JWKS URI'si için önbelleğe alınır), `issuer`/`audience`
  kontrolleriyle doğrular. İsteğe bağlı `oidcAllowedSubjects` izin listesi, belirtecin
  `sub` talebiyle veya `email` talebiyle eşleşir — e-posta talebi yalnızca
  `email_verified === true` olduğunda dikkate alınır; böylece IdP'deki doğrulanmamış bir e-posta
  bu geçitten hiçbir zaman geçemez.
- Başarılı olduğunda, parola ile oturum açma işleminin oluşturduğu **tamamen aynı** 30 günlük `auth_token`
  JWT'sini oluşturur (`src/app/api/auth/login/route.ts`); dolayısıyla
  pano oturum işlem hattının geri kalanı (otomatik yenileme, çerez bayrakları) değişmeden kalır —
  OIDC yalnızca çerezin nasıl oluşturulduğunu değiştirir, verdiği yetkileri değil.

## Rota Sınıfları

`src/server/authz/types.ts` üç sınıf tanımlar; deterministik olarak sınıflandırılamayan tüm rotalar varsayılan olarak `MANAGEMENT` sınıfına alınır.

| Sınıf        | Açıklama                                                                                                                                                | Gerekli kimlik doğrulama                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `PUBLIC`     | Açıkça güvenli rotalar — oturum açma, oturumu kapatma, durum, başlatma, sağlık kontrolü, ilk katılım önyüklemesi.                                       | Yok                                                             |
| `CLIENT_API` | Model sunma uç noktaları — `/api/v1/*`, `/api/v1beta/*` ve `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*` takma adları. | Etkin `REQUIRE_API_KEY` özellik bayrağı açıkken Bearer anahtarı |
| `MANAGEMENT` | Pano sayfaları, ayarlar, sağlayıcılar, anahtarlar, yönetici ve tanılama uç noktaları.                                                                   | Pano oturumu VEYA `manage` kapsamına sahip Bearer               |

## İşlem Hattı

```
Gelen istek → src/proxy.ts
  → src/server/authz/pipeline.ts içindeki runAuthzPipeline()
    1. Güvenilir dahili üstbilgileri kaldır (x-omniroute-auth-*, x-omniroute-route-class)
    2. İstek kimliği oluştur, rotayı classifyRoute() aracılığıyla sınıflandır
    3. pathname == "/" ise → /dashboard adresine yönlendir
    4. İstekler boşaltılıyorsa (zarif kapatma) ve rota /api/* ise → 503
    5. GET dışındaki /api/* isteklerinde → checkBodySize() korumasını çalıştır
    6. OPTIONS ise → CORS ön kontrolü 204
    7. options.enforce == false ise → rota sınıfı üstbilgileriyle doğrudan geçir
    8. Aksi takdirde: POLICIES[routeClass].evaluate(ctx)
       - izin ver  → x-omniroute-auth-{kind,id,label,scopes} ekle → NextResponse.next()
       - reddet → correlation_id içeren JSON hatası (pano sayfaları → 302 /login)
```

Güvenilir dahili üstbilgiler (`src/server/authz/headers.ts` içinde tanımlanır), sınıflandırmadan önce **gelen isteklerden kaldırılır** — istemciler bir öznenin kimliğine bürünmek için `x-omniroute-auth-*` üstbilgilerini önceden dolduramaz.

### İlke sözleşmeleri

Her rota sınıfının `src/server/authz/policies/` içinde bir ilkesi vardır:

- **`publicPolicy`** (`policies/public.ts`) — her zaman `allow({ kind: "anonymous", id: "anonymous" })` döndürür.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer bilgisini çıkarır ve `validateApiKey()` aracılığıyla doğrular. Yalnızca etkin `REQUIRE_API_KEY` özellik bayrağı devre dışı olduğunda anonim erişime geri döner. Etkin bayrak, `isRequireApiKeyEnabled()` (`DB özellik bayrağı geçersiz kılması > process.env.REQUIRE_API_KEY > varsayılan`) aracılığıyla çözümlenir; böylece Pano Özellik Bayrakları ile ortam değişkenleri `/api/v1/*`, `/api/v1beta/*` ve takma adları tutarlı şekilde yönetir. Çözümleyici hatalarında erişim reddedilir. İstemci API rotalarında, pano model kataloğunun kullandığı `/api/v1/models` dâhil olmak üzere, pano oturumuna sahip isteklere izin verir.
- **`managementPolicy`** (`policies/management.ts`) — pano oturumunu ve dahili model eşitleme isteklerini (`/api/providers/[name]/(sync-models|models)` ile eşleştirilir) kabul eder veya `isAuthRequired()` false döndürürse denetimi tamamen atlar. Bearer belirteci mevcut ancak geçersiz olduğunda 403 (`AUTH_001`), aksi takdirde 401 döndürür. Ayrıca herhangi bir kimlik doğrulama dalından önce rota koruması katmanlarını (LOCAL_ONLY / ALWAYS_PROTECTED) uygular — bkz. [Rota Koruması Katmanları](../security/ROUTE_GUARD_TIERS.md). `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` içindeki LOCAL_ONLY yollarına (şu anda: `/api/mcp/`), Bearer anahtarı `manage` kapsamını taşıyorsa geri döngü dışındaki adreslerden erişilebilir; diğer tüm LOCAL_ONLY yolları, kapsamdan bağımsız olarak yalnızca geri döngü erişimine açık kalır.

Başarılı bir ilke, `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` değerine sahip bir `AuthSubject` döndürür. Alt akış işleyicileri, kimlik doğrulama mantığını yeniden çalıştırmak yerine `src/server/authz/assertAuth.ts` içindeki `assertAuth(request, "CLIENT_API")` aracılığıyla bu özneyi okuyabilir.

## Herkese Açık Rotalar Listesi

`src/shared/constants/publicApiRoutes.ts` açık izin listesidir:

Liste **şekle** göre ayrılmıştır ve bu ayrım güvenlik açısından kritiktir (GHSA-74g9-q8f6-793h): bir önek
`startsWith()` ile eşleştirildiğinden, baştaki karakterleri paylaşan tüm bitişik yollarla da eşleşir.
Önek olarak `/api/usage/om-usage`, `/api/usage/om-usage<anything>` biçimindeki tüm yolları HERKESE AÇIK olarak işaretledi ve Next bunu
kendi kimlik doğrulaması olmayan bir işleyici olan `/api/usage/[connectionId]` yoluna çözümler.

```ts
// Gerçek alt ağaçlar. Her girdi "/" ile BİTMELİDİR (bir birim testiyle doğrulanır).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify içinde CLIENT_API olarak değerlendirilir, "kimlik doğrulamasız herkese açık" olarak değil
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// TAM OLARAK eşleştirilen tekil rotalar (sonunda eğik çizgi olsa da olmasa da).
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

// CORS kaynağı gevşetmesinin de uygulandığı salt okunur tekil rotalar.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS gevşetmesi OLMAYAN salt okunur tekil rota.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Salt okunur rotalar **yalnızca** güvenli yöntemler için herkese açıktır. Not: `classifyRoute()`, `/api/v1/*` ve `/api/v1beta/*` yollarını PUBLIC geri dönüşünden hariç tutar — Bearer anahtarı politikasının uygulanmaya devam etmesi için bunlar her zaman `CLIENT_API` olur.

## Yeni Bir Rota Ekleme

### Kalıp 1 — Herkese açık istemci API uç noktası (Bearer kimlik doğrulaması)

`/api/v1/` ve `/api/v1beta/` altındaki rotalar otomatik olarak `CLIENT_API` şeklinde sınıflandırılır. Ara yazılım Bearer denetimini uygular; rota işleyicilerinin bunu tekrarlaması gerekmez, ancak yararlıysa özneyi okuyabilirler.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... işleyici mantığı
}
```

### Kalıp 2 — Yönetim uç noktası (oturum veya Bearer + manage)

`src/lib/api/requireManagementAuth.ts` dosyasındaki `requireManagementAuth()` işlevini kullanın:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... işleyici mantığı
}
```

`requireManagementAuth()`, başarı durumunda `null`, hata durumunda ise bir JSON `Response` döndürür:

- 401 `AUTH_001` "Kimlik doğrulaması gerekli" — hiçbir kimlik bilgisi yok
- 403 — geçersiz Bearer **veya** Bearer mevcut ancak anahtar `manage` / `admin` kapsamına sahip değil

`hasManageScope(scopes)`, `"manage"` veya `"admin"` için true döndürür.

### Kalıp 3 — Herkese açık izin listesine ekleme

Kümeyi kullanım kolaylığına göre değil, şekle göre seçin. Tek bir rota `PUBLIC_API_ROUTES_EXACT` kümesine (veya yalnızca GET için `PUBLIC_READONLY_CORS_API_ROUTES` listesine) eklenir; yalnızca gerçek bir alt ağaç `PUBLIC_API_ROUTE_PREFIXES` listesine eklenir ve `/` ile **bitmelidir**. Tek bir rotayı önek listesine eklemek, daha sonra eklenecek dinamik segmentli kardeşler de dahil olmak üzere, baştaki karakterlerini paylaşan tüm bitişik yolları da herkese açar (GHSA-74g9-q8f6-793h). `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` ve `tests/unit/authz/classify.test.ts` dosyalarındaki birim testlerini güncelleyin.

## Kapsamlar

API anahtarları bir `scopes` dizisi taşır (`api_keys.scopes` içinde JSON olarak saklanır; bkz. `src/lib/db/apiKeys.ts`).

### Yönetim kapsamı

- `manage` / `admin` — Bearer olarak gönderildiğinde anahtara yönetim API uç noktalarına erişim izni verir.

### MCP kapsamları (`src/shared/constants/mcpScopes.ts`)

Her MCP aracı, `MCP_TOOL_SCOPES` aracılığıyla belirli kapsamlar gerektirir. Tam liste (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

`open-sse/mcp-server/server.ts` içindeki kapsam zorlaması, `resolveCallerScopeContext()` MCP kimlik doğrulama bilgilerinden, istek meta verilerinden veya `OMNIROUTE_MCP_SCOPES` değerinden kapsamları çözümledikten sonra her aracın kapsam listesini `evaluateToolScopes()` işlevine aktarır.

## Kimlik Doğrulama Gereksinimi Anahtarı

`src/shared/utils/apiAuth.ts` içindeki `isAuthRequired()`, bir istek için **herhangi bir** kimlik doğrulamanın zorunlu tutulup tutulmayacağına karar verir:

- `settings.requireLogin === false` → kimlik doğrulama genel olarak devre dışıdır.
- Yapılandırılmış parola **ve** `INITIAL_PASSWORD` ortam değişkeni yoksa → başlangıç modu, ilk kurulum sihirbazına ve geri döngü isteklerine izin verir; ancak ağa açık istekler için yine de kimlik bilgileri gerekir.
- Herhangi bir DB hatası → güvenli varsayılan yaklaşımıyla erişimi reddeder.

İstemci API anahtarı zorlaması, doğrudan `process.env.REQUIRE_API_KEY` okumasını değil, `src/shared/utils/featureFlags.ts` içindeki `isRequireApiKeyEnabled()` işlevini kullanır. Bu, dağıtılmış kurulumlar açısından önemlidir: Dashboard → Feature Flags bölümünde `REQUIRE_API_KEY` ayarının değiştirilmesi, DB'ye bir geçersiz kılma değeri kaydeder ve `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` ile bu yardımcı işlevi paylaşan diğer istemci API kimlik doğrulama kontrollerini anında etkiler. Özellik bayrağı deposu okunamazsa istemci API kimlik doğrulaması güvenli varsayılan yaklaşımıyla erişimi reddeder ve bir anahtar gerektirir.

## Uyumluluğu Bozan Değişiklik — v3.8.0

`/api/v1/agents/tasks/*` ve `/api/resilience/model-cooldowns` uç noktaları **artık yönetim kimlik doğrulaması gerektirir** (`588a0333` commit'i). Daha önce `manage` kapsamı olmadan normal bir API anahtarı gönderen istemciler `403` yanıtı alır. Geçiş: API Keys panosunda anahtara `manage` kapsamını verin veya oturum açılmış bir dashboard oturumu kullanın.

## Davranış Değişikliği — v3.8.2

`/api/mcp/*` (uzak MCP sunucusu) varsayılan olarak hâlâ LOCAL_ONLY'dir; ancak `Authorization: Bearer <api-key>` üstbilgisi `manage` kapsamını taşıdığında artık geri döngü dışı istekleri kabul eder. Bu istisna, `src/server/authz/routeGuard.ts` içindeki `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` aracılığıyla yol başına açıkça denetlenir; aynı düzeydeki LOCAL_ONLY öneki `/api/cli-tools/runtime/*`, rastgele alt süreçler başlatabildiği için kasıtlı olarak atlanamaz. Geri döngü dışından `/api/mcp/*` yoluna yapılan anonim istekler `403 LOCAL_ONLY` döndürmeye devam eder — yeni LOCAL_ONLY yollar için varsayılan davranış, yalnızca geri döngüye kesin biçimde izin vermeye devam eder. Bkz. [Rota Koruması Düzeyleri](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Test

- Birim testleri: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Genel erişim izin listesi: `tests/unit/public-api-routes.test.ts`.
- Odaklanmış çalıştırma: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Hata Ayıklama

İşlem hattı, yanıtlara her zaman şu başlıkları ekler:

```
x-request-id:               <korelasyon kimliği, hata gövdelerinde yinelenir>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Kimliği doğrulanmış isteklerde yukarı akış (işleyici tarafındaki) istek başlıkları ayrıca şunları içerir:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<son-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (isteğe bağlı)
x-omniroute-auth-scopes:    virgülle ayrılmış liste
```

İşleyiciler içinde `assertAuth(req, expectedClass)` kullanın — ara yazılım atlandıysa `AUTHZ_NOT_INITIALIZED` koduyla bir `AuthzAssertionError` oluşturur (testlerde yapılandırma gerilemelerini yakalamak için yararlıdır).

## Ayrıca Bakınız

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — uç nokta başına kimlik doğrulama işareti
- [COMPLIANCE.md](../security/COMPLIANCE.md) — kimlik doğrulama olayları için denetim günlüğü
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP kapsamı uygulama ayrıntıları
- Kaynak: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
