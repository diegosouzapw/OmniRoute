# Authorization Guide (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **แหล่งข้อมูลหลัก:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **อัปเดตล่าสุด:** 2026-06-28 — v3.8.40

OmniRoute มีไปป์ไลน์การอนุญาตที่รับรู้เส้นทาง ซึ่งควบคุมคำขอ API ทุกคำขอ การจำแนกประเภทเป็นแบบ **กำหนดผลได้แน่นอน** และ **ปิดกั้นเมื่อไม่แน่ใจ** — ทุกสิ่งที่ไม่สามารถจำแนกประเภทได้จะถูกจัดเป็น `MANAGEMENT` และต้องใช้เซสชันหรือโทเค็นระดับการจัดการ หน้านี้อธิบายโมเดลสำหรับวิศวกรที่ดูแลเส้นทางหรือออกแบบเอนด์พอยต์ใหม่

![ไปป์ไลน์ AuthZ (เส้นทาง 3 คลาส + การประเมินนโยบาย)](../diagrams/exported/authz-pipeline.svg)

> แหล่งที่มา: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## โหมดการยืนยันตัวตนสองแบบ

### 1. คีย์ API (Bearer)

ใช้สำหรับ API ไคลเอนต์ที่เข้ากันได้กับ OpenAI/Anthropic/Gemini และเส้นทางการจัดการบางรายการเมื่อคีย์มีขอบเขต `manage`

```
Authorization: Bearer <api-key>
```

ตรวจสอบความถูกต้องโดย `isValidApiKey()` / `extractApiKey()` ใน `src/sse/services/auth.ts` และส่งออกซ้ำผ่าน `src/shared/utils/apiAuth.ts` ตัวตรวจสอบยังยอมรับตัวแปรสภาพแวดล้อม `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` เป็นคีย์ส่งผ่านแบบถาวรด้วย (ปัญหา #1350)

### 2. เซสชันแดชบอร์ด (คุกกี้ auth_token)

สำหรับหน้าแดชบอร์ดและการดำเนินการของผู้ดูแลระบบ

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

คุกกี้จะถือเป็นเซสชันก็ต่อเมื่อ JWT ผ่านการตรวจสอบ **และ** มี `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`) ผู้ใช้งาน
คุกกี้ทุกราย (ตัวป้องกันเส้นทาง, การรีเฟรชไปป์ไลน์ authz, การจับมือ WebSocket, เซิร์ฟเวอร์
ไลฟ์, `/api/settings/require-login`, `/api/auth/status`) จะดำเนินการผ่านตัวช่วยดังกล่าว
มี JWT อื่นที่ลงนามด้วย `JWT_SECRET` เช่นกัน — การส่งผ่าน Cursor CLI จะสร้าง
โทเค็น `iss "omniroute" / aud "cursor-cli"` สำหรับผู้ถือคีย์ — และโทเค็นเหล่านี้จะไม่ถือเป็นเซสชัน
(#13298)

ตรวจสอบโดย `isDashboardSessionAuthenticated()` ใน `src/shared/utils/apiAuth.ts` ไปป์ไลน์จะรีเฟรช JWT โดยอัตโนมัติเมื่ออายุการใช้งาน 30 วันเหลือน้อยกว่า 7 วัน

เส้นทางการจัดการบางรายการยอมรับ **โหมดใดโหมดหนึ่ง** ได้แก่ คุกกี้ หรือ `Bearer <key>` เมื่อคีย์ API มีขอบเขต `manage` (หรือ `admin`) ซึ่งทำให้สามารถใช้เวิร์กโฟลว์ "กำหนดค่าผ่านการเรียก API" ที่เพิ่มเข้ามาใน v3.8 ได้

#### เกตการเข้าสู่ระบบ OIDC แบบเลือกใช้ (#6973)

การเข้าสู่ระบบผู้ดูแลแดชบอร์ดยังรองรับโฟลว์ OIDC (OpenID Connect) แบบ **เลือกเปิดใช้**
ควบคู่กับการเข้าสู่ระบบด้วยรหัสผ่านตามค่าเริ่มต้น — การเข้าสู่ระบบด้วยรหัสผ่านจะไม่ถูกนำออก
แต่เป็นเพียงการเสริมตัวเลือก:

- ปิดใช้งาน เว้นแต่ `settings.oidcEnabled === true` **และ** มีการกำหนดค่า `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` ครบทั้งหมด (Settings → Auth)
  มิฉะนั้น `GET /api/auth/oidc/login` จะส่งคืน `400`
- `GET /api/auth/oidc/login` ค้นหา `authorization_endpoint` จาก
  `/.well-known/openid-configuration` ของผู้ออกโทเค็น (หากไม่สำเร็จจะใช้
  `<issuer>/authorize`) สร้าง URI การเปลี่ยนเส้นทางจากคำขอขาเข้า
  (รองรับ `x-forwarded-proto`) และเปลี่ยนเส้นทางไปยัง IdP พร้อมค่า `state`
  แบบสุ่มที่จัดเก็บไว้ในคุกกี้ `oidc_state` ชนิด `httpOnly`
- `GET /api/auth/oidc/callback` ตรวจสอบ `state` แลกเปลี่ยนรหัสการอนุญาต
  และตรวจสอบลายเซ็นของโทเค็น ID ผ่าน JWKS ของผู้ออกโทเค็น
  (`createRemoteJWKSet` ของ `jose` ซึ่งแคชแยกตาม URI ของ JWKS) พร้อมตรวจสอบ
  `issuer`/`audience` รายการอนุญาต `oidcAllowedSubjects` ซึ่งเป็นตัวเลือกจะจับคู่กับ
  เคลม `sub` หรือเคลม `email` ของโทเค็น — เคลมอีเมลจะได้รับการยอมรับเฉพาะเมื่อ
  `email_verified === true` ดังนั้นอีเมลที่ยังไม่ได้รับการยืนยันจาก IdP จะไม่สามารถผ่าน
  เกตได้
- เมื่อสำเร็จ ระบบจะสร้าง JWT `auth_token` อายุ 30 วันแบบ **เดียวกันทุกประการ** กับที่การเข้าสู่ระบบ
  ด้วยรหัสผ่านสร้าง (`src/app/api/auth/login/route.ts`) ดังนั้นส่วนอื่น ๆ ของ
  ไปป์ไลน์เซสชันแดชบอร์ด (การรีเฟรชอัตโนมัติ, แฟล็กคุกกี้) จึงไม่เปลี่ยนแปลง —
  OIDC เปลี่ยนเฉพาะวิธีสร้างคุกกี้เท่านั้น ไม่ได้เปลี่ยนสิทธิ์ที่คุกกี้มอบให้

## คลาสของเส้นทาง

`src/server/authz/types.ts` กำหนดคลาสไว้สามคลาส โดยเส้นทางใดก็ตามที่ไม่สามารถจำแนกได้อย่างแน่นอนจะใช้ `MANAGEMENT` เป็นค่าเริ่มต้น

| คลาส         | คำอธิบาย                                                                                                                                                  | การยืนยันตัวตนที่ต้องใช้                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `PUBLIC`     | เส้นทางที่ระบุชัดเจนว่าปลอดภัย — การเข้าสู่ระบบ การออกจากระบบ สถานะ การเริ่มต้น การตรวจสอบสถานะระบบ และการบูตสแตรปสำหรับการเริ่มใช้งาน                    | ไม่ต้องใช้                                                         |
| `CLIENT_API` | เอนด์พอยต์สำหรับให้บริการโมเดล — `/api/v1/*`, `/api/v1beta/*` รวมถึงนามแฝง `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*` | คีย์ Bearer เมื่อเปิดใช้แฟล็กฟีเจอร์ `REQUIRE_API_KEY` ที่มีผลอยู่ |
| `MANAGEMENT` | หน้าแดชบอร์ด การตั้งค่า ผู้ให้บริการ คีย์ เอนด์พอยต์สำหรับผู้ดูแลระบบและการวินิจฉัย                                                                       | เซสชันแดชบอร์ด หรือ Bearer ที่มีขอบเขต `manage`                    |

## ไปป์ไลน์

```
คำขอขาเข้า → src/proxy.ts
  → runAuthzPipeline() ใน src/server/authz/pipeline.ts
    1. ลบเฮดเดอร์ภายในที่เชื่อถือได้ (x-omniroute-auth-*, x-omniroute-route-class)
    2. สร้างรหัสคำขอ และจำแนกเส้นทางผ่าน classifyRoute()
    3. หาก pathname == "/" → เปลี่ยนเส้นทางไปยัง /dashboard
    4. หากกำลังระบายคำขอ (การปิดระบบอย่างนุ่มนวล) และเป็น /api/* → 503
    5. หากเป็น /api/* ที่ไม่ใช่ GET → ใช้ตัวป้องกัน checkBodySize()
    6. หากเป็น OPTIONS → ตอบกลับ CORS preflight ด้วย 204
    7. หาก options.enforce == false → ส่งผ่านพร้อมเฮดเดอร์คลาสของเส้นทาง
    8. มิฉะนั้น: POLICIES[routeClass].evaluate(ctx)
       - อนุญาต  → กำหนด x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - ปฏิเสธ → ข้อผิดพลาด JSON พร้อม correlation_id (หน้าแดชบอร์ด → 302 /login)
```

เฮดเดอร์ภายในที่เชื่อถือได้ (กำหนดใน `src/server/authz/headers.ts`) จะถูก **ลบออกจากคำขอขาเข้า** ก่อนการจำแนก — ไคลเอนต์ไม่สามารถกำหนด `x-omniroute-auth-*` ล่วงหน้าเพื่อสวมรอยเป็นตัวตนอื่นได้

### สัญญาของนโยบาย

คลาสของเส้นทางแต่ละคลาสมีนโยบายอยู่ใน `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — ส่งคืน `allow({ kind: "anonymous", id: "anonymous" })` เสมอ
- **`clientApiPolicy`** (`policies/clientApi.ts`) — แยก Bearer ออกมาและตรวจสอบผ่าน `validateApiKey()` โดยจะใช้ anonymous แทนเฉพาะเมื่อปิดใช้แฟล็กฟีเจอร์ `REQUIRE_API_KEY` ที่มีผลอยู่เท่านั้น แฟล็กที่มีผลจะถูกกำหนดผ่าน `isRequireApiKeyEnabled()` (`ค่าที่กำหนดทับจากแฟล็กฟีเจอร์ใน DB > process.env.REQUIRE_API_KEY > ค่าเริ่มต้น`) เพื่อให้แฟล็กฟีเจอร์ในแดชบอร์ดและตัวแปรสภาพแวดล้อมควบคุม `/api/v1/*`, `/api/v1beta/*` และนามแฝงต่าง ๆ อย่างสอดคล้องกัน หากตัวแก้ไขค่าล้มเหลว ระบบจะปฏิเสธไว้ก่อน อนุญาตคำขอที่มีเซสชันแดชบอร์ดบนเส้นทาง API ของไคลเอนต์ (รวมถึง `/api/v1/models` ซึ่งแค็ตตาล็อกโมเดลของแดชบอร์ดใช้งาน)
- **`managementPolicy`** (`policies/management.ts`) — ยอมรับเซสชันแดชบอร์ด คำขอซิงก์โมเดลภายใน (จับคู่กับ `/api/providers/[name]/(sync-models|models)`) หรือข้ามทั้งหมดหาก `isAuthRequired()` ส่งคืน false โดยส่งคืน 403 (`AUTH_001`) เมื่อมีโทเค็น Bearer แต่ไม่ถูกต้อง และส่งคืน 401 ในกรณีอื่น นอกจากนี้ยังบังคับใช้ระดับการป้องกันเส้นทาง (LOCAL_ONLY / ALWAYS_PROTECTED) ก่อนทุกแขนงการยืนยันตัวตน — ดู [ระดับการป้องกันเส้นทาง](../security/ROUTE_GUARD_TIERS.md) พาธ LOCAL_ONLY ใน `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (ปัจจุบันคือ `/api/mcp/`) สามารถเข้าถึงจากที่อยู่ที่ไม่ใช่ลูปแบ็กได้ เมื่อคีย์ Bearer มีขอบเขต `manage` ส่วนพาธ LOCAL_ONLY อื่น ๆ ทั้งหมดยังคงจำกัดเฉพาะลูปแบ็กอย่างเคร่งครัดโดยไม่คำนึงถึงขอบเขต

นโยบายที่สำเร็จจะส่งคืน `AuthSubject` ซึ่งมี `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` ตัวจัดการปลายทางสามารถอ่านค่านี้ผ่าน `assertAuth(request, "CLIENT_API")` ใน `src/server/authz/assertAuth.ts` แทนการเรียกใช้ตรรกะการยืนยันตัวตนซ้ำอีกครั้ง

## รายการเส้นทางสาธารณะ

`src/shared/constants/publicApiRoutes.ts` คือรายการอนุญาตที่ระบุไว้อย่างชัดเจน:

รายการนี้แบ่งตาม **รูปแบบ** และการแบ่งนี้มีความสำคัญต่อความปลอดภัย (GHSA-74g9-q8f6-793h): คำนำหน้าจะถูกจับคู่ด้วย `startsWith()` ดังนั้นจึงจับคู่ทุกพาธที่อยู่ติดกันและใช้อักขระนำหน้าเหมือนกันด้วย
เมื่อใช้ `/api/usage/om-usage` เป็นคำนำหน้า จะทำให้ `/api/usage/om-usage<anything>` ถูกระบุว่าเป็น PUBLIC และ Next จะตีความพาธนั้นเป็น
`/api/usage/[connectionId]` ซึ่งเป็นตัวจัดการที่ไม่มีกลไกตรวจสอบสิทธิ์ของตัวเอง

```ts
// ซับทรีจริง ทุกรายการต้องลงท้ายด้วย "/" (ตรวจยืนยันโดยการทดสอบระดับหน่วย)
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // ถูกจัดเป็น CLIENT_API ใน classify ไม่ใช่สาธารณะแบบ "ไม่ต้องตรวจสอบสิทธิ์"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// เส้นทางเดี่ยวที่จับคู่แบบตรงกันทุกประการ (ไม่ว่าจะมีเครื่องหมายทับปิดท้ายหรือไม่)
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

// เส้นทางเดี่ยวแบบอ่านอย่างเดียวที่ได้รับการผ่อนปรนข้อจำกัดต้นทางของ CORS ด้วย
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// เส้นทางเดี่ยวแบบอ่านอย่างเดียวที่ไม่ได้รับการผ่อนปรน CORS
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

เส้นทางแบบอ่านอย่างเดียวจะเป็นสาธารณะ **เฉพาะ** สำหรับเมธอดที่ปลอดภัยเท่านั้น หมายเหตุ: `classifyRoute()` จะไม่รวม `/api/v1/*` และ `/api/v1beta/*` ไว้ในการจัดประเภทสำรองเป็น PUBLIC — เส้นทางเหล่านี้จะเป็น `CLIENT_API` เสมอ เพื่อให้นโยบายคีย์ Bearer ยังคงมีผลบังคับใช้

## การเพิ่มเส้นทางใหม่

### รูปแบบที่ 1 — ปลายทาง API สาธารณะสำหรับไคลเอนต์ (ตรวจสอบสิทธิ์ด้วย Bearer)

เส้นทางภายใต้ `/api/v1/` และ `/api/v1beta/` จะถูกจัดประเภทเป็น `CLIENT_API` โดยอัตโนมัติ มิดเดิลแวร์จะบังคับใช้การตรวจสอบ Bearer ดังนั้นตัวจัดการเส้นทางจึงไม่จำเป็นต้องตรวจสอบซ้ำ แต่สามารถอ่านข้อมูล subject ได้หากมีประโยชน์

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... ตรรกะของตัวจัดการ
}
```

### รูปแบบที่ 2 — ปลายทางสำหรับการจัดการ (เซสชัน หรือ Bearer + manage)

ใช้ `requireManagementAuth()` จาก `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... ตรรกะของตัวจัดการ
}
```

`requireManagementAuth()` จะคืนค่า `null` เมื่อสำเร็จ หรือคืน `Response` ข้อผิดพลาดในรูปแบบ JSON:

- 401 `AUTH_001` "จำเป็นต้องตรวจสอบสิทธิ์" — ไม่มีข้อมูลประจำตัวใด ๆ
- 403 — Bearer ไม่ถูกต้อง **หรือ** มี Bearer แต่คีย์ไม่มีขอบเขต `manage` / `admin`

`hasManageScope(scopes)` จะคืนค่า true สำหรับ `"manage"` หรือ `"admin"`

### รูปแบบที่ 3 — การเพิ่มลงในรายการอนุญาตสาธารณะ

เลือกชุดตามรูปแบบ ไม่ใช่ตามความสะดวก เส้นทางเดี่ยวต้องอยู่ใน `PUBLIC_API_ROUTES_EXACT` (หรือ `PUBLIC_READONLY_CORS_API_ROUTES` หากใช้เฉพาะ GET) เฉพาะซับทรีจริงเท่านั้นที่ควรอยู่ใน `PUBLIC_API_ROUTE_PREFIXES` และรายการนั้น **ต้องลงท้ายด้วย `/`** การใส่เส้นทางเดี่ยวไว้ในรายการคำนำหน้าจะทำให้ทุกพาธที่อยู่ติดกันและใช้อักขระนำหน้าเหมือนกันถูกเผยแพร่เป็นสาธารณะด้วย — รวมถึงพาธพี่น้องที่ใช้เซกเมนต์แบบไดนามิกซึ่งอาจถูกเพิ่มในภายหลัง (GHSA-74g9-q8f6-793h) ให้อัปเดตการทดสอบระดับหน่วยที่ `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` และ `tests/unit/authz/classify.test.ts`

## ขอบเขตสิทธิ์

คีย์ API มีอาร์เรย์ `scopes` (จัดเก็บเป็น JSON ใน `api_keys.scopes` โปรดดู `src/lib/db/apiKeys.ts`)

### ขอบเขตสิทธิ์การจัดการ

- `manage` / `admin` — ให้สิทธิ์คีย์เข้าถึงปลายทาง API สำหรับการจัดการเมื่อส่งแบบ Bearer

### ขอบเขตสิทธิ์ MCP (`src/shared/constants/mcpScopes.ts`)

เครื่องมือ MCP แต่ละรายการต้องการขอบเขตสิทธิ์เฉพาะผ่าน `MCP_TOOL_SCOPES` รายการทั้งหมด (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

การบังคับใช้ขอบเขตสิทธิ์ใน `open-sse/mcp-server/server.ts` จะส่งรายการขอบเขตสิทธิ์ของแต่ละเครื่องมือไปยัง
`evaluateToolScopes()` หลังจาก `resolveCallerScopeContext()` ระบุขอบเขตสิทธิ์จากข้อมูลการยืนยันตัวตน MCP,
เมทาดาทาของคำขอ หรือ `OMNIROUTE_MCP_SCOPES`

## ตัวเลือกเปิด/ปิดการบังคับใช้การยืนยันตัวตน

`isAuthRequired()` ใน `src/shared/utils/apiAuth.ts` ใช้ตัดสินว่าจะบังคับใช้การยืนยันตัวตน **ใดๆ** กับคำขอหรือไม่:

- `settings.requireLogin === false` → ปิดใช้งานการยืนยันตัวตนทั่วทั้งระบบ
- ไม่ได้กำหนดรหัสผ่าน **และ** ไม่มีตัวแปรสภาพแวดล้อม `INITIAL_PASSWORD` → โหมดเริ่มต้นระบบอนุญาตให้เข้าถึงวิซาร์ดการเริ่มต้นใช้งานและคำขอแบบลูปแบ็ก แต่คำขอผ่านเครือข่ายที่เปิดเผยยังคงต้องใช้ข้อมูลประจำตัว
- ข้อผิดพลาดใดๆ ของ DB → ปฏิเสธการเข้าถึง (ปลอดภัยเป็นค่าเริ่มต้น)

การบังคับใช้คีย์ API ฝั่งไคลเอนต์ใช้ `isRequireApiKeyEnabled()` ใน `src/shared/utils/featureFlags.ts` ไม่ได้อ่าน `process.env.REQUIRE_API_KEY` โดยตรง ซึ่งมีความสำคัญสำหรับอินสแตนซ์ที่นำไปใช้งานแล้ว: การสลับ `REQUIRE_API_KEY` ใน Dashboard → Feature Flags จะจัดเก็บค่าที่เขียนทับไว้ใน DB และส่งผลทันทีต่อ `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` และการตรวจสอบการยืนยันตัวตนของ API ฝั่งไคลเอนต์อื่นๆ ที่ใช้ตัวช่วยนี้ร่วมกัน หากไม่สามารถอ่านที่เก็บ Feature Flag ได้ การยืนยันตัวตนของ API ฝั่งไคลเอนต์จะปฏิเสธการเข้าถึงและกำหนดให้ต้องใช้คีย์

## การเปลี่ยนแปลงที่เข้ากันไม่ได้ — v3.8.0

ขณะนี้ปลายทาง `/api/v1/agents/tasks/*` และ `/api/resilience/model-cooldowns` **ต้องมีการยืนยันตัวตนสำหรับการจัดการ** (คอมมิต `588a0333`) ไคลเอนต์ที่ก่อนหน้านี้ส่งคีย์ API ปกติซึ่งไม่มีขอบเขตสิทธิ์ `manage` จะได้รับ `403` การย้ายระบบ: กำหนดขอบเขตสิทธิ์ `manage` ให้แก่คีย์ในแดชบอร์ด API Keys หรือใช้เซสชันแดชบอร์ดที่เข้าสู่ระบบแล้ว

## การเปลี่ยนแปลงลักษณะการทำงาน — v3.8.2

`/api/mcp/*` (เซิร์ฟเวอร์ MCP ระยะไกล) ยังคงเป็น LOCAL_ONLY โดยค่าเริ่มต้น แต่ขณะนี้จะยอมรับคำขอที่ไม่ได้มาจากลูปแบ็กเมื่อส่วนหัว `Authorization: Bearer <api-key>` มีขอบเขตสิทธิ์ `manage` ข้อยกเว้นนี้ถูกควบคุมไว้อย่างชัดเจนแยกตามพาธผ่าน `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ใน `src/server/authz/routeGuard.ts`; พรีฟิกซ์ LOCAL_ONLY ที่อยู่ระดับเดียวกันอย่าง `/api/cli-tools/runtime/*` ตั้งใจให้ไม่สามารถข้ามข้อจำกัดได้ เนื่องจากสามารถเรียกใช้โพรเซสย่อยใดๆ ได้ คำขอแบบไม่ระบุตัวตนไปยัง `/api/mcp/*` จากต้นทางที่ไม่ใช่ลูปแบ็กจะยังคงได้รับ `403 LOCAL_ONLY` — ค่าเริ่มต้นสำหรับพาธ LOCAL_ONLY ใหม่จะยังคงจำกัดเฉพาะลูปแบ็กอย่างเคร่งครัด โปรดดู [ระดับของ Route Guard](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)

## การทดสอบ

- การทดสอบหน่วย: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`
- รายการอนุญาตสาธารณะ: `tests/unit/public-api-routes.test.ts`
- เรียกใช้แบบเจาะจง: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`

## การดีบัก

ไปป์ไลน์จะประทับส่วนหัวต่อไปนี้ในการตอบกลับเสมอ:

```
x-request-id:               <รหัสสหสัมพันธ์ ซึ่งจะแสดงซ้ำในเนื้อหาข้อผิดพลาด>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

สำหรับคำขอที่ผ่านการยืนยันตัวตน ส่วนหัวของคำขอที่ส่งไปยังต้นทาง (ฝั่งตัวจัดการ) จะมีรายการต่อไปนี้ด้วย:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (ไม่บังคับ)
x-omniroute-auth-scopes:    รายการที่คั่นด้วยจุลภาค
```

ใช้ `assertAuth(req, expectedClass)` ภายในตัวจัดการ — ฟังก์ชันนี้จะส่งข้อยกเว้น `AuthzAssertionError` พร้อมรหัส `AUTHZ_NOT_INITIALIZED` หากมิดเดิลแวร์ถูกข้าม (มีประโยชน์สำหรับตรวจจับการถดถอยของการกำหนดค่าในการทดสอบ)

## ดูเพิ่มเติม

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ตัวบ่งชี้การยืนยันตัวตนสำหรับแต่ละเอนด์พอยต์
- [COMPLIANCE.md](../security/COMPLIANCE.md) — บันทึกการตรวจสอบสำหรับเหตุการณ์การยืนยันตัวตน
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — รายละเอียดการบังคับใช้ขอบเขต MCP
- ซอร์ส: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
