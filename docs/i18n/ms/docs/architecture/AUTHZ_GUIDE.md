# Authorization Guide (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Sumber rujukan utama:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Kemas kini terakhir:** 2026-06-28 — v3.8.40

OmniRoute mempunyai saluran paip pengesahan kuasa yang peka terhadap laluan dan mengawal setiap permintaan API. Pengelasan adalah **deterministik** dan **gagal secara tertutup** — apa-apa yang tidak dapat dikelaskan akan dianggap sebagai `MANAGEMENT` dan memerlukan sesi atau token bertaraf pengurusan. Halaman ini menerangkan model tersebut untuk jurutera yang menyelenggara laluan atau mereka bentuk titik akhir baharu.

![Saluran paip AuthZ (3 kelas laluan + penilaian dasar)](../diagrams/exported/authz-pipeline.svg)

> Sumber: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dua Mod Pengesahan

### 1. Kunci API (Bearer)

Digunakan untuk API klien yang serasi dengan OpenAI/Anthropic/Gemini dan beberapa laluan pengurusan apabila kunci tersebut mempunyai skop `manage`.

```
Authorization: Bearer <api-key>
```

Disahkan oleh `isValidApiKey()` / `extractApiKey()` dalam `src/sse/services/auth.ts` dan dieksport semula melalui `src/shared/utils/apiAuth.ts`. Pengesah juga menerima pemboleh ubah persekitaran `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` sebagai kunci laluan terus kekal (isu #1350).

### 2. Sesi Papan Pemuka (kuki auth_token)

Untuk halaman papan pemuka dan operasi pentadbir.

```
Cookie: auth_token=<JWT ditandatangani dengan JWT_SECRET>
```

Kuki hanya dianggap sebagai sesi apabila JWT berjaya disahkan **dan** membawa `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Setiap
pengguna kuki tersebut (pengawal laluan, muat semula saluran paip pengesahan kuasa, jabat
tangan WebSocket, pelayan langsung, `/api/settings/require-login`, `/api/auth/status`) melalui pembantu tersebut.
Terdapat JWT lain yang ditandatangani dengan `JWT_SECRET` — laluan terus Cursor CLI menjana
token `iss "omniroute" / aud "cursor-cli"` untuk pemegang kunci — dan token tersebut tidak pernah dianggap sebagai sesi
(#13298).

Disahkan oleh `isDashboardSessionAuthenticated()` dalam `src/shared/utils/apiAuth.ts`. Saluran paip memuat semula JWT secara automatik apabila tempoh sahnya berbaki kurang daripada 7 hari daripada jangka hayat 30 harinya.

Sesetengah laluan pengurusan menerima **salah satu** mod: kuki ATAU `Bearer <key>` apabila kunci API mempunyai skop `manage` (atau `admin`). Inilah yang membolehkan aliran kerja "boleh dikonfigurasikan melalui panggilan API" yang ditambahkan dalam v3.8.

#### Gerbang log masuk OIDC pilihan (#6973)

Log masuk pentadbir papan pemuka turut menyokong aliran OIDC (OpenID Connect) secara **ikut serta**
bersama log masuk kata laluan lalai — log masuk kata laluan tidak pernah dialih keluar, hanya
dilengkapkan:

- Dilumpuhkan melainkan `settings.oidcEnabled === true` **dan** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` semuanya telah dikonfigurasikan (Tetapan → Pengesahan).
  `GET /api/auth/oidc/login` mengembalikan `400` jika tidak.
- `GET /api/auth/oidc/login` menemui `authorization_endpoint` daripada
  `/.well-known/openid-configuration` penerbit (dengan sandaran kepada
  `<issuer>/authorize`), membina URI ubah hala daripada permintaan masuk
  (peka terhadap `x-forwarded-proto`), dan mengubah hala ke IdP dengan `state` rawak
  yang disimpan dalam kuki `oidc_state` `httpOnly`.
- `GET /api/auth/oidc/callback` mengesahkan `state`, menukar kod kebenaran,
  dan mengesahkan tandatangan token ID melalui JWKS penerbit
  (`createRemoteJWKSet` milik `jose`, dicache bagi setiap URI JWKS) dengan semakan `issuer`/`audience`.
  Senarai dibenarkan `oidcAllowedSubjects` pilihan memadankan tuntutan `sub`
  token atau tuntutan `email` — tuntutan e-mel hanya diterima apabila
  `email_verified === true`, maka e-mel yang belum disahkan di IdP tidak boleh melepasi
  gerbang tersebut.
- Jika berjaya, ia menjana JWT `auth_token` 30 hari yang **sama sepenuhnya** seperti yang
  dikeluarkan oleh log masuk kata laluan (`src/app/api/auth/login/route.ts`), maka seluruh
  saluran paip sesi papan pemuka yang selebihnya (muat semula automatik, bendera kuki) kekal tidak berubah —
  OIDC hanya menggantikan cara kuki dijana, bukan kebenaran yang diberikannya.

## Kelas Laluan

`src/server/authz/types.ts` mentakrifkan tiga kelas; mana-mana laluan yang tidak dapat dikelaskan secara deterministik akan menggunakan `MANAGEMENT` sebagai lalai.

| Kelas        | Penerangan                                                                                                                                              | Pengesahan diperlukan                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `PUBLIC`     | Laluan yang secara jelas selamat — log masuk, log keluar, status, pemulaan, kesihatan, bootstrap pengenalan.                                            | Tiada                                                                            |
| `CLIENT_API` | Titik akhir penyajian model — `/api/v1/*`, `/api/v1beta/*`, serta alias `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Kunci Bearer apabila bendera ciri `REQUIRE_API_KEY` yang berkuat kuasa didayakan |
| `MANAGEMENT` | Halaman papan pemuka, tetapan, penyedia, kunci, serta titik akhir pentadbir dan diagnostik.                                                             | Sesi papan pemuka ATAU Bearer dengan skop `manage`                               |

## Saluran Pemprosesan

```
Permintaan masuk → src/proxy.ts
  → runAuthzPipeline() dalam src/server/authz/pipeline.ts
    1. Buang pengepala dalaman yang dipercayai (x-omniroute-auth-*, x-omniroute-route-class)
    2. Jana ID permintaan, kelaskan laluan melalui classifyRoute()
    3. Jika pathname == "/" → ubah hala ke /dashboard
    4. Jika sedang dikosongkan (penutupan secara terkawal) dan /api/* → 503
    5. Jika bukan GET /api/* → pengadang checkBodySize()
    6. Jika OPTIONS → prapenerbangan CORS 204
    7. Jika options.enforce == false → teruskan dengan pengepala kelas laluan
    8. Jika tidak: POLICIES[routeClass].evaluate(ctx)
       - benarkan → cap x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - tolak    → ralat JSON dengan correlation_id (halaman papan pemuka → 302 /login)
```

Pengepala dalaman yang dipercayai (ditakrifkan dalam `src/server/authz/headers.ts`) **dibuang daripada permintaan masuk** sebelum pengelasan — klien tidak boleh mengisi awal `x-omniroute-auth-*` untuk menyamar sebagai subjek.

### Kontrak dasar

Setiap kelas laluan mempunyai dasar dalam `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — sentiasa mengembalikan `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — mengekstrak Bearer dan mengesahkannya melalui `validateApiKey()`. Hanya beralih kepada akses tanpa nama apabila bendera ciri `REQUIRE_API_KEY` yang berkuat kuasa dinyahdayakan. Bendera yang berkuat kuasa ditentukan melalui `isRequireApiKeyEnabled()` (`penggantian bendera ciri DB > process.env.REQUIRE_API_KEY > lalai`) supaya Bendera Ciri Papan Pemuka dan pemboleh ubah persekitaran mengawal `/api/v1/*`, `/api/v1beta/*`, serta alias secara konsisten; kegagalan penentu akan ditutup secara selamat. Membenarkan permintaan sesi papan pemuka pada laluan API klien (termasuk `/api/v1/models`, yang digunakan oleh katalog model papan pemuka).
- **`managementPolicy`** (`policies/management.ts`) — menerima sesi papan pemuka, permintaan penyegerakan model dalaman (dipadankan dengan `/api/providers/[name]/(sync-models|models)`), atau dilangkau sepenuhnya jika `isAuthRequired()` mengembalikan false. Mengembalikan 403 (`AUTH_001`) apabila token Bearer disertakan tetapi tidak sah, dan 401 jika tidak. Ia juga menguatkuasakan peringkat pengadang laluan (LOCAL_ONLY / ALWAYS_PROTECTED) sebelum mana-mana cabang pengesahan — lihat [Peringkat Pengadang Laluan](../security/ROUTE_GUARD_TIERS.md). Laluan LOCAL_ONLY dalam `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (pada masa ini: `/api/mcp/`) boleh dicapai dari bukan gelung balik apabila kunci Bearer mempunyai skop `manage`; semua laluan LOCAL_ONLY yang lain kekal terhad kepada gelung balik tanpa mengira skop.

Dasar yang berjaya mengembalikan `AuthSubject` dengan `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Pengendali hiliran boleh membacanya melalui `assertAuth(request, "CLIENT_API")` dalam `src/server/authz/assertAuth.ts` dan bukannya menjalankan semula logik pengesahan.

## Senarai Laluan Awam

`src/shared/constants/publicApiRoutes.ts` ialah senarai dibenarkan yang eksplisit:

Senarai ini dibahagikan mengikut **bentuk**, dan pembahagian ini amat penting (GHSA-74g9-q8f6-793h): awalan dipadankan menggunakan `startsWith()`, maka ia turut memadankan setiap laluan bersebelahan yang berkongsi aksara permulaan yang sama.
Apabila `/api/usage/om-usage` digunakan sebagai awalan, `/api/usage/om-usage<anything>` ditandai sebagai AWAM, dan Next menyelesaikannya kepada `/api/usage/[connectionId]` — pengendali yang tidak mempunyai pengesahan tersendiri.

```ts
// Subpohon sebenar. Setiap entri MESTI berakhir dengan "/" (disahkan oleh ujian unit).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // dianggap sebagai CLIENT_API dalam classify, bukan sebagai awam "tanpa pengesahan"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Laluan tunggal, dipadankan SECARA TEPAT (dengan atau tanpa garis miring di hujung).
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

// Laluan tunggal baca sahaja yang turut menerima pelonggaran asal CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Laluan tunggal baca sahaja TANPA pelonggaran CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Laluan baca sahaja adalah awam **hanya** untuk kaedah yang selamat. Nota: `classifyRoute()` mengecualikan `/api/v1/*` dan `/api/v1beta/*` daripada sandaran PUBLIC — laluan tersebut sentiasa `CLIENT_API` supaya dasar kunci Bearer terus digunakan.

## Menambah Laluan Baharu

### Corak 1 — Titik akhir API klien awam (pengesahan Bearer)

Laluan di bawah `/api/v1/` dan `/api/v1beta/` dikelaskan sebagai `CLIENT_API` secara automatik. Perisian tengah menguatkuasakan semakan Bearer; pengendali laluan tidak perlu mengulanginya, tetapi boleh membaca subjek jika berguna.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logik pengendali
}
```

### Corak 2 — Titik akhir pengurusan (sesi atau Bearer + manage)

Gunakan `requireManagementAuth()` daripada `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logik pengendali
}
```

`requireManagementAuth()` mengembalikan `null` apabila berjaya atau `Response` ralat JSON:

- 401 `AUTH_001` "Pengesahan diperlukan" — langsung tiada bukti kelayakan
- 403 — Bearer tidak sah **atau** Bearer tersedia tetapi kunci tidak mempunyai skop `manage` / `admin`

`hasManageScope(scopes)` mengembalikan true untuk `"manage"` atau `"admin"`.

### Corak 3 — Menambah pada senarai dibenarkan awam

Pilih set berdasarkan bentuk, bukan kemudahan. Satu laluan dimasukkan ke dalam `PUBLIC_API_ROUTES_EXACT` (atau `PUBLIC_READONLY_CORS_API_ROUTES` untuk GET sahaja); hanya subpohon sebenar dimasukkan ke dalam `PUBLIC_API_ROUTE_PREFIXES`, dan ia **mesti berakhir dengan `/`**. Meletakkan satu laluan dalam senarai awalan turut menerbitkan setiap laluan bersebelahan yang berkongsi aksara permulaannya — termasuk laluan saudara segmen dinamik yang ditambah kemudian (GHSA-74g9-q8f6-793h). Kemas kini ujian unit di `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` dan `tests/unit/authz/classify.test.ts`.

## Skop

Kunci API membawa tatasusunan `scopes` (disimpan sebagai JSON dalam `api_keys.scopes`, lihat `src/lib/db/apiKeys.ts`).

### Skop pengurusan

- `manage` / `admin` — memberikan kunci akses kepada titik akhir API pengurusan apabila dihantar sebagai Bearer.

### Skop MCP (`src/shared/constants/mcpScopes.ts`)

Setiap alat MCP memerlukan skop tertentu melalui `MCP_TOOL_SCOPES`. Senarai penuh (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

Penguatkuasaan skop dalam `open-sse/mcp-server/server.ts` menghantar senarai skop setiap alat kepada
`evaluateToolScopes()` selepas `resolveCallerScopeContext()` menyelesaikan skop daripada maklumat pengesahan MCP,
metadata permintaan, atau `OMNIROUTE_MCP_SCOPES`.

## Togol Pengesahan Diperlukan

`isAuthRequired()` dalam `src/shared/utils/apiAuth.ts` menentukan sama ada **sebarang** pengesahan dikuatkuasakan untuk sesuatu permintaan:

- `settings.requireLogin === false` → pengesahan dilumpuhkan secara global.
- Tiada kata laluan dikonfigurasikan **dan** tiada pemboleh ubah persekitaran `INITIAL_PASSWORD` → mod pemula membenarkan bestari penyediaan awal dan permintaan gelung balik, tetapi permintaan rangkaian terdedah masih memerlukan kelayakan.
- Sebarang ralat DB → ditutup apabila gagal (selamat secara lalai).

Penguatkuasaan kunci API klien menggunakan `isRequireApiKeyEnabled()` dalam `src/shared/utils/featureFlags.ts`, bukannya pembacaan terus `process.env.REQUIRE_API_KEY`. Ini penting untuk tika yang digunakan: menogol `REQUIRE_API_KEY` dalam Dashboard → Feature Flags menyimpan penggantian DB dan serta-merta mempengaruhi `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, serta semakan pengesahan API klien lain yang berkongsi pembantu ini. Jika stor bendera ciri tidak dapat dibaca, pengesahan API klien ditutup apabila gagal dan memerlukan kunci.

## Perubahan Pecah Keserasian — v3.8.0

Titik akhir `/api/v1/agents/tasks/*` dan `/api/resilience/model-cooldowns` **kini memerlukan pengesahan pengurusan** (komit `588a0333`). Klien yang sebelum ini menghantar kunci API biasa tanpa skop `manage` akan menerima `403`. Migrasi: sama ada berikan skop `manage` kepada kunci dalam papan pemuka API Keys, atau gunakan sesi papan pemuka yang telah dilog masuk.

## Perubahan Tingkah Laku — v3.8.2

`/api/mcp/*` (pelayan MCP jauh) masih LOCAL_ONLY secara lalai tetapi kini menerima permintaan bukan gelung balik apabila pengepala `Authorization: Bearer <api-key>` membawa skop `manage`. Pengecualian ini dikawal secara eksplisit bagi setiap laluan melalui `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` dalam `src/server/authz/routeGuard.ts`; awalan LOCAL_ONLY yang setara, `/api/cli-tools/runtime/*`, sengaja TIDAK boleh dipintas kerana ia boleh mewujudkan subproses sewenang-wenangnya. Permintaan tanpa nama ke `/api/mcp/*` daripada bukan gelung balik terus mengembalikan `403 LOCAL_ONLY` — lalai bagi mana-mana laluan LOCAL_ONLY baharu kekal sebagai gelung balik ketat. Lihat [Tahap Pengawal Laluan](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Pengujian

- Ujian unit: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Senarai dibenarkan awam: `tests/unit/public-api-routes.test.ts`.
- Jalankan ujian khusus: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Penyahpepijatan

Saluran paip sentiasa mengecap respons dengan:

```
x-request-id:               <id korelasi, digemakan dalam badan ralat>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Untuk permintaan yang disahkan, pengepala permintaan huluan (pada bahagian pengendali) turut merangkumi:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<4-aksara-terakhir> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (pilihan)
x-omniroute-auth-scopes:    senarai dipisahkan koma
```

Gunakan `assertAuth(req, expectedClass)` dalam pengendali — ia melontarkan `AuthzAssertionError` dengan kod `AUTHZ_NOT_INITIALIZED` jika perisian tengah telah dipintas (berguna untuk mengesan regresi konfigurasi dalam ujian).

## Lihat Juga

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — penanda pengesahan bagi setiap titik akhir
- [COMPLIANCE.md](../security/COMPLIANCE.md) — log audit untuk peristiwa pengesahan
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — butiran penguatkuasaan skop MCP
- Sumber: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
