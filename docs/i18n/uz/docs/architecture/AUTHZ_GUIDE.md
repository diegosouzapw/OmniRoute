# Authorization Guide (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Asosiy manba:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Oxirgi yangilanish:** 2026-06-28 — v3.8.40

OmniRoute har bir API soʻrovini nazorat qiladigan, marshrutdan xabardor avtorizatsiya konveyeriga ega. Tasniflash **deterministik** va **yopiq holda rad etuvchi** — tasniflab boʻlmaydigan barcha narsalar `MANAGEMENT` toifasiga tushadi va sessiya yoki boshqaruv darajasidagi tokenni talab qiladi. Ushbu sahifa marshrutlarni qoʻllab-quvvatlaydigan yoki yangi endpointlarni loyihalaydigan muhandislar uchun modelni tushuntiradi.

![AuthZ konveyeri (3 ta marshrut sinfi + siyosatni baholash)](../diagrams/exported/authz-pipeline.svg)

> Manba: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Ikki autentifikatsiya rejimi

### 1. API kaliti (Bearer)

OpenAI/Anthropic/Gemini bilan mos mijoz API’lari hamda kalitda `manage` doirasi mavjud boʻlganda ayrim boshqaruv marshrutlari uchun ishlatiladi.

```
Authorization: Bearer <api-kalit>
```

`src/sse/services/auth.ts` ichidagi `isValidApiKey()` / `extractApiKey()` orqali tekshiriladi va `src/shared/utils/apiAuth.ts` orqali qayta eksport qilinadi. Validator, shuningdek, `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` muhit oʻzgaruvchilarini doimiy toʻgʻridan-toʻgʻri uzatish kalitlari sifatida qabul qiladi (masala #1350).

### 2. Boshqaruv paneli sessiyasi (auth_token cookie fayli)

Boshqaruv paneli sahifalari va administrator amallari uchun.

```
Cookie: auth_token=<JWT_SECRET bilan imzolangan JWT>
```

Cookie faqat JWT tekshiruvdan oʻtganida **va** `authenticated: true` qiymatini oʻz ichiga olganida sessiya hisoblanadi
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Cookie’dan
foydalanuvchi har bir komponent (marshrut himoyachisi, authz konveyerini yangilash, WebSocket ulanishi, jonli
server, `/api/settings/require-login`, `/api/auth/status`) shu yordamchi orqali oʻtadi.
`JWT_SECRET` bilan imzolangan boshqa JWT’lar ham mavjud — Cursor CLI toʻgʻridan-toʻgʻri uzatish mexanizmi
kalit egalariga `iss "omniroute" / aud "cursor-cli"` tokenlarini yaratadi — va ular hech qachon sessiya
hisoblanmaydi (#13298).

`src/shared/utils/apiAuth.ts` ichidagi `isDashboardSessionAuthenticated()` orqali tekshiriladi. JWT’ning 30 kunlik amal qilish muddatidan 7 kundan kam vaqt qolganda konveyer uni avtomatik ravishda yangilaydi.

Ayrim boshqaruv marshrutlari **har ikkala** rejimni qabul qiladi: cookie YOKI API kalitida `manage` (yoki `admin`) doirasi mavjud boʻlsa, `Bearer <key>`. Aynan shu v3.8 versiyasida qoʻshilgan «API chaqiruvlari orqali sozlash» ish jarayonini taʼminlaydi.

#### Ixtiyoriy OIDC kirish nazorati (#6973)

Boshqaruv panelidagi administrator kirishi standart parol orqali kirishga qoʻshimcha ravishda
**ixtiyoriy ravishda yoqiladigan** OIDC (OpenID Connect) oqimini ham qoʻllab-quvvatlaydi — parol orqali kirish hech qachon olib tashlanmaydi, faqat
toʻldiriladi:

- `settings.oidcEnabled === true` boʻlmasa **hamda** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` qiymatlarining barchasi sozlanmagan boʻlsa (Settings → Auth),
  funksiya oʻchirilgan boʻladi. Aks holda `GET /api/auth/oidc/login` `400` qaytaradi.
- `GET /api/auth/oidc/login` emitentning
  `/.well-known/openid-configuration` manzilidan `authorization_endpoint`ni aniqlaydi (topilmasa,
  `<issuer>/authorize`dan foydalanadi), kiruvchi soʻrov asosida qayta yoʻnaltirish URI’sini
  (`x-forwarded-proto`ni hisobga olgan holda) tuzadi va `httpOnly` turidagi `oidc_state` cookie faylida
  saqlanadigan tasodifiy `state` bilan IdP’ga qayta yoʻnaltiradi.
- `GET /api/auth/oidc/callback` `state`ni tekshiradi, avtorizatsiya
  kodini almashtiradi va `issuer`/`audience`
  tekshiruvlari bilan emitentning JWKS’i orqali ID token imzosini
  (`jose`ning `createRemoteJWKSet` funksiyasi, har bir JWKS URI uchun keshlanadi) tekshiradi. Ixtiyoriy `oidcAllowedSubjects` ruxsat roʻyxati tokenning
  `sub` daʼvosiga yoki uning `email` daʼvosiga mos keladi — email daʼvosi faqat
  `email_verified === true` boʻlganda qabul qilinadi, shuning uchun IdP’dagi tasdiqlanmagan email hech qachon
  nazoratdan oʻta olmaydi.
- Muvaffaqiyatli yakunlanganda u parol orqali kirish chiqaradigan **aynan bir xil** 30 kunlik `auth_token` JWT’ni
  (`src/app/api/auth/login/route.ts`) yaratadi, shu sababli boshqaruv paneli
  sessiyasi konveyerining qolgan qismi (avtomatik yangilash, cookie bayroqlari) oʻzgarmaydi —
  OIDC faqat cookie qanday yaratilishini almashtiradi, u beradigan ruxsatlarni emas.

## Marshrut sinflari

`src/server/authz/types.ts` uchta sinfni belgilaydi; aniq tasniflab bo‘lmaydigan har qanday marshrut standart holatda `MANAGEMENT` sinfiga kiritiladi.

| Sinf         | Tavsif                                                                                                                                                                         | Autentifikatsiya talabi                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `PUBLIC`     | Xavfsizligi aniq belgilangan marshrutlar — tizimga kirish, chiqish, holat, boshlang‘ich sozlash, tizim salomatligi, dastlabki ishga tushirish.                                 | Talab qilinmaydi                                                       |
| `CLIENT_API` | Modelga xizmat ko‘rsatish endpointlari — `/api/v1/*`, `/api/v1beta/*`, shuningdek `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*` taxalluslari. | Amaldagi `REQUIRE_API_KEY` funksiya bayrog‘i yoqilganida Bearer kaliti |
| `MANAGEMENT` | Boshqaruv paneli sahifalari, sozlamalar, provayderlar, kalitlar, administrator va diagnostika endpointlari.                                                                    | Boshqaruv paneli sessiyasi YOKI `manage` doirasiga ega Bearer          |

## Konveyer

```
Kiruvchi so‘rov → src/proxy.ts
  → src/server/authz/pipeline.ts ichidagi runAuthzPipeline()
    1. Ishonchli ichki sarlavhalarni olib tashlash (x-omniroute-auth-*, x-omniroute-route-class)
    2. So‘rov identifikatorini yaratish, marshrutni classifyRoute() orqali tasniflash
    3. Agar pathname == "/" bo‘lsa → /dashboard manziliga yo‘naltirish
    4. Agar tizim yakunlanayotgan bo‘lsa (to‘g‘ri yakunlash) va /api/* bo‘lsa → 503
    5. Agar GET bo‘lmagan /api/* bo‘lsa → checkBodySize() himoyasini tekshirish
    6. Agar OPTIONS bo‘lsa → CORS preflight 204
    7. Agar options.enforce == false bo‘lsa → marshrut sinfi sarlavhalari bilan o‘tkazib yuborish
    8. Aks holda: POLICIES[routeClass].evaluate(ctx)
       - allow  → x-omniroute-auth-{kind,id,label,scopes} ni belgilash → NextResponse.next()
       - reject → correlation_id bilan JSON xatosi (boshqaruv paneli sahifalari → 302 /login)
```

Ishonchli ichki sarlavhalar (`src/server/authz/headers.ts` ichida belgilangan) tasniflashdan oldin **kiruvchi so‘rovlardan olib tashlanadi** — mijozlar boshqa subyekt nomidan ish ko‘rish uchun `x-omniroute-auth-*` sarlavhalarini oldindan kirita olmaydi.

### Siyosat shartnomalari

Har bir marshrut sinfi `src/server/authz/policies/` ichida o‘z siyosatiga ega:

- **`publicPolicy`** (`policies/public.ts`) — har doim `allow({ kind: "anonymous", id: "anonymous" })` qaytaradi.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer qiymatini ajratib oladi va `validateApiKey()` orqali tekshiradi. Faqat amaldagi `REQUIRE_API_KEY` funksiya bayrog‘i o‘chirilganida anonim kirishga o‘tadi. Amaldagi bayroq `isRequireApiKeyEnabled()` orqali aniqlanadi (`DB funksiya bayrog‘i ustuvor qiymati > process.env.REQUIRE_API_KEY > standart qiymat`), shu sababli boshqaruv panelidagi funksiya bayroqlari va muhit o‘zgaruvchilari `/api/v1/*`, `/api/v1beta/*` hamda taxalluslarni izchil boshqaradi; aniqlashdagi xatoliklar kirishni yopadi. Mijoz API marshrutlarida, jumladan boshqaruv panelining modellar katalogi foydalanadigan `/api/v1/models` marshrutida, boshqaruv paneli sessiyasiga ega so‘rovlarga ruxsat beradi.
- **`managementPolicy`** (`policies/management.ts`) — boshqaruv paneli sessiyasini, ichki model sinxronlash so‘rovlarini (`/api/providers/[name]/(sync-models|models)` bilan moslashtiriladi) qabul qiladi yoki `isAuthRequired()` false qaytarsa, tekshiruvni butunlay o‘tkazib yuboradi. Bearer tokeni mavjud, ammo yaroqsiz bo‘lsa 403 (`AUTH_001`), aks holda 401 qaytaradi. Shuningdek, autentifikatsiyaning har qanday tarmog‘idan oldin marshrut himoyasi darajalarini (LOCAL_ONLY / ALWAYS_PROTECTED) qo‘llaydi — [Marshrut himoyasi darajalari](../security/ROUTE_GUARD_TIERS.md) bo‘limiga qarang. `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ichidagi LOCAL_ONLY yo‘llariga (hozirda: `/api/mcp/`) Bearer kaliti `manage` doirasiga ega bo‘lsa, loopback bo‘lmagan manzildan kirish mumkin; boshqa barcha LOCAL_ONLY yo‘llari doiradan qat’i nazar faqat loopback orqali kirish talabini qat’iy saqlaydi.

Muvaffaqiyatli siyosat `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` qiymatiga ega `AuthSubject` qaytaradi. Quyi oqimdagi ishlov beruvchilar autentifikatsiya mantiqini qayta ishga tushirish o‘rniga uni `src/server/authz/assertAuth.ts` ichidagi `assertAuth(request, "CLIENT_API")` orqali o‘qishi mumkin.

## Ommaviy marshrutlar roʻyxati

`src/shared/constants/publicApiRoutes.ts` — aniq ruxsat etilganlar roʻyxati:

Roʻyxat **shakliga** koʻra ajratilgan va bu ajratish xavfsizlik uchun muhim (GHSA-74g9-q8f6-793h): prefiks `startsWith()` orqali moslashtiriladi, shuning uchun u boshlangʻich belgilari bir xil boʻlgan barcha yondosh yoʻllarga ham mos keladi.
`/api/usage/om-usage` prefiks sifatida `/api/usage/om-usage<anything>` yoʻlini OMMAVIY deb belgilagan va Next buni `/api/usage/[connectionId]` ga yoʻnaltiradi — bu oʻz autentifikatsiyasiga ega boʻlmagan ishlov beruvchi.

```ts
// Haqiqiy quyi daraxtlar. Har bir yozuv "/" bilan tugashi SHART (bu birlik testi orqali tekshiriladi).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify ichida CLIENT_API sifatida koʻriladi, "autentifikatsiyasiz ommaviy" sifatida emas
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Oxiridagi qiya chiziq bilan yoki usiz, AYNAN moslashtiriladigan alohida marshrutlar.
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

// CORS origin cheklovi yumshatilishi ham qoʻllanadigan faqat oʻqish uchun alohida marshrutlar.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS cheklovi yumshatilishi qoʻllanmaydigan faqat oʻqish uchun alohida marshrut.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Faqat oʻqish uchun marshrutlar faqat xavfsiz metodlar uchun ommaviydir. Eslatma: `classifyRoute()` `/api/v1/*` va `/api/v1beta/*` yoʻllarini PUBLIC standart holatidan chiqarib tashlaydi — Bearer kaliti siyosati baribir qoʻllanishi uchun ular har doim `CLIENT_API` boʻladi.

## Yangi marshrut qoʻshish

### 1-andoza — Ommaviy mijoz API endpointi (Bearer autentifikatsiyasi)

`/api/v1/` va `/api/v1beta/` ostidagi marshrutlar avtomatik ravishda `CLIENT_API` sifatida tasniflanadi. Oraliq dastur Bearer tekshiruvini majburiy qiladi; marshrut ishlov beruvchilari uni qayta bajarishi shart emas, ammo zarur boʻlsa subyektni oʻqishi mumkin.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... ishlov beruvchi mantiqi
}
```

### 2-andoza — Boshqaruv endpointi (sessiya yoki Bearer + manage)

`src/lib/api/requireManagementAuth.ts` ichidagi `requireManagementAuth()` dan foydalaning:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... ishlov beruvchi mantiqi
}
```

`requireManagementAuth()` muvaffaqiyatli boʻlsa `null`, aks holda JSON xatosi boʻlgan `Response` qaytaradi:

- 401 `AUTH_001` "Autentifikatsiya talab qilinadi" — umuman hisob maʼlumotlari yoʻq
- 403 — Bearer yaroqsiz **yoki** Bearer mavjud, ammo kalitda `manage` / `admin` doirasi yoʻq

`hasManageScope(scopes)` `"manage"` yoki `"admin"` uchun true qaytaradi.

### 3-andoza — Ommaviy ruxsat etilganlar roʻyxatiga qoʻshish

Toʻplamni qulaylikka qarab emas, shakliga qarab tanlang. Bitta marshrut `PUBLIC_API_ROUTES_EXACT` ga (yoki faqat GET uchun `PUBLIC_READONLY_CORS_API_ROUTES` ga) qoʻshiladi; faqat haqiqiy quyi daraxt `PUBLIC_API_ROUTE_PREFIXES` ga qoʻshiladi va u **`/` bilan tugashi shart**. Bitta marshrutni prefikslar roʻyxatiga kiritish uning boshlangʻich belgilariga ega barcha yondosh yoʻllarni, jumladan keyinchalik qoʻshilgan dinamik segmentli qardosh yoʻllarni ham ommaviy qiladi (GHSA-74g9-q8f6-793h). `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` va `tests/unit/authz/classify.test.ts` fayllaridagi birlik testlarini yangilang.

## Qamrovlar

API kalitlari `scopes` massiviga ega (`api_keys.scopes` ichida JSON sifatida saqlanadi, `src/lib/db/apiKeys.ts` fayliga qarang).

### Boshqaruv qamrovi

- `manage` / `admin` — Bearer sifatida yuborilganda kalitga boshqaruv API endpointlaridan foydalanish huquqini beradi.

### MCP qamrovlari (`src/shared/constants/mcpScopes.ts`)

Har bir MCP vositasi `MCP_TOOL_SCOPES` orqali muayyan qamrovlarni talab qiladi. Toʻliq roʻyxat (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

`open-sse/mcp-server/server.ts` ichidagi qamrovlarni majburiy tekshirish, `resolveCallerScopeContext()` MCP autentifikatsiya maʼlumotlari, soʻrov metamaʼlumotlari yoki `OMNIROUTE_MCP_SCOPES` orqali qamrovlarni aniqlaganidan soʻng, har bir vositaning qamrovlar roʻyxatini `evaluateToolScopes()` funksiyasiga uzatadi.

## Autentifikatsiya talabi almashtirgichi

`src/shared/utils/apiAuth.ts` ichidagi `isAuthRequired()` soʻrov uchun **har qanday** autentifikatsiya majburiy yoki majburiy emasligini belgilaydi:

- `settings.requireLogin === false` → autentifikatsiya global miqyosda oʻchiriladi.
- Parol sozlanmagan **va** `INITIAL_PASSWORD` muhit oʻzgaruvchisi mavjud emas → boshlangʻich sozlash rejimi dastlabki sozlash ustasi va loopback soʻrovlariga ruxsat beradi, ammo tarmoqqa ochiq soʻrovlar uchun baribir hisob maʼlumotlari talab qilinadi.
- Har qanday DB xatosi → yopiq holatda rad etiladi (standart holatda xavfsiz).

Mijoz API kalitini majburiy tekshirish `process.env.REQUIRE_API_KEY` qiymatini bevosita oʻqishdan emas, `src/shared/utils/featureFlags.ts` ichidagi `isRequireApiKeyEnabled()` funksiyasidan foydalanadi. Bu joylashtirilgan instansiyalar uchun muhim: Dashboard → Feature Flags boʻlimida `REQUIRE_API_KEY` qiymatini almashtirish DB bekor qilish qiymatini saqlaydi va `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` hamda ushbu yordamchi funksiyadan foydalanadigan boshqa mijoz API autentifikatsiya tekshiruvlariga darhol taʼsir qiladi. Agar xususiyat bayroqlari omborini oʻqib boʻlmasa, mijoz API autentifikatsiyasi yopiq holatda rad etiladi va kalit talab qiladi.

## Moslikni buzuvchi oʻzgarish — v3.8.0

`/api/v1/agents/tasks/*` va `/api/resilience/model-cooldowns` endpointlari **endi boshqaruv autentifikatsiyasini talab qiladi** (`588a0333` kommiti). Avval `manage` qamrovisiz oddiy API kalitini yuborgan mijozlar `403` javobini oladi. Migratsiya: API Keys boshqaruv panelida kalitga `manage` qamrovini bering yoki tizimga kirilgan boshqaruv paneli seansidan foydalaning.

## Xatti-harakat oʻzgarishi — v3.8.2

`/api/mcp/*` (masofaviy MCP serveri) hali ham standart holatda LOCAL_ONLY, ammo `Authorization: Bearer <api-key>` sarlavhasida `manage` qamrovi mavjud boʻlsa, endi loopback boʻlmagan soʻrovlarni ham qabul qiladi. Ushbu istisno `src/server/authz/routeGuard.ts` ichidagi `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` orqali har bir yoʻl uchun alohida boshqariladi; yonma-yon joylashgan `/api/cli-tools/runtime/*` LOCAL_ONLY prefiksini ataylab chetlab oʻtib boʻlmaydi, chunki u ixtiyoriy quyi jarayonlarni ishga tushirishi mumkin. Loopback boʻlmagan manzildan `/api/mcp/*` ga yuborilgan anonim soʻrovlar `403 LOCAL_ONLY` javobini qaytarishda davom etadi — har qanday yangi LOCAL_ONLY yoʻli uchun standart holat qatʼiy loopback boʻlib qoladi. [Yoʻnalish himoyachisi darajalari](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) boʻlimiga qarang.

## Sinov

- Birlik sinovlari: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Ommaviy ruxsat berilganlar roʻyxati: `tests/unit/public-api-routes.test.ts`.
- Yoʻnaltirilgan ishga tushirish: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Nosozliklarni tuzatish

Konveyer javoblarga har doim quyidagi sarlavhalarni qoʻshadi:

```
x-request-id:               <korrelyatsiya identifikatori, xato javoblari tanasida qaytariladi>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Autentifikatsiya qilingan soʻrovlar uchun yuqori oqimdagi (ishlov beruvchi tomonidagi) soʻrov sarlavhalari quyidagilarni ham oʻz ichiga oladi:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<oxirgi-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (ixtiyoriy)
x-omniroute-auth-scopes:    vergul bilan ajratilgan roʻyxat
```

Ishlov beruvchilar ichida `assertAuth(req, expectedClass)` dan foydalaning — agar oraliq dasturiy taʼminot chetlab oʻtilgan boʻlsa, u `AUTHZ_NOT_INITIALIZED` kodli `AuthzAssertionError` xatosini chiqaradi (testlarda konfiguratsiya regressiyalarini aniqlash uchun foydali).

## Shuningdek qarang

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — har bir oxirgi nuqta uchun autentifikatsiya belgisi
- [COMPLIANCE.md](../security/COMPLIANCE.md) — autentifikatsiya hodisalari uchun audit jurnali
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP qamrovini majburiy qoʻllash tafsilotlari
- Manba: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
