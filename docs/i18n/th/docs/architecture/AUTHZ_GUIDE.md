# Authorization Guide (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **แหล่งข้อมูลที่แท้จริง:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **อัปเดตล่าสุด:** 2026-09-22 — ขอบเขตเนมสเปซชี้ไปที่ MCP-SERVER.md

OmniRoute มีไปป์ไลน์การอนุญาตที่รับรู้เส้นทาง ซึ่งควบคุมทุกคำขอ API การจัดประเภทเป็นแบบ **กำหนดได้** และ **ปิดเมื่อล้มเหลว** — สิ่งใดก็ตามที่ไม่สามารถจัดประเภทได้จะถูกจัดเป็น `MANAGEMENT` และต้องใช้เซสชันหรือโทเค็นระดับการจัดการ หน้านี้อธิบายโมเดลสำหรับวิศวกรที่ดูแลเส้นทางหรือออกแบบปลายทางใหม่

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> ที่มา: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## สองโหมดการยืนยันตัวตน

### 1. คีย์ API (Bearer)

ใช้สำหรับ API ไคลเอ็นต์ที่เข้ากันได้กับ OpenAI/Anthropic/Gemini และเส้นทางจัดการบางส่วนเมื่อคีย์มีขอบเขต `manage`

```
Authorization: Bearer <api-key>
```

ตรวจสอบโดย `isValidApiKey()` / `extractApiKey()` ใน `src/sse/services/auth.ts` และส่งออกซ้ำผ่าน `src/shared/utils/apiAuth.ts` ตัวตรวจสอบยังยอมรับตัวแปรสภาพแวดล้อม `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` เป็นคีย์ส่งผ่านแบบถาวร (ปัญหา #1350)

### 2. เซสชันแดชบอร์ด (คุกกี้ auth_token)

สำหรับหน้าแดชบอร์ดและการดำเนินการของผู้ดูแลระบบ

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

คุกกี้จะเป็นเซสชันก็ต่อเมื่อ JWT ตรวจสอบ **และ** มี `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`) ผู้ใช้
คุกกี้ทุกราย (ตัวป้องกันเส้นทาง, การรีเฟรชไปป์ไลน์การอนุญาต, การจับมือ WebSocket, เซิร์ฟเวอร์สด,
`/api/settings/require-login`, `/api/auth/status`) จะผ่านตัวช่วยนี้
JWT อื่นๆ ที่ลงนามด้วย `JWT_SECRET` มีอยู่ — Cursor CLI จะสร้าง
โทเค็น `iss "omniroute" / aud "cursor-cli"` สำหรับผู้ถือคีย์ — และไม่เคยเป็นเซสชัน
(#13298)

ตรวจสอบโดย `isDashboardSessionAuthenticated()` ใน `src/shared/utils/apiAuth.ts` ไปป์ไลน์จะรีเฟรช JWT โดยอัตโนมัติเมื่อเหลือเวลาน้อยกว่า 7 วันในอายุการใช้งาน 30 วัน

เส้นทางจัดการบางเส้นทางยอมรับ **ทั้งสอง** โหมด: คุกกี้ หรือ `Bearer <key>` เมื่อคีย์ API มีขอบเขต `manage` (หรือ `admin`) นี่คือสิ่งที่ทำให้เวิร์กโฟลว์ "กำหนดค่าได้ผ่านการเรียก API" ที่เพิ่มเข้ามาใน v3.8 ทำงานได้

#### ประตูเข้าสู่ระบบ OIDC เสริม (#6973)

การเข้าสู่ระบบผู้ดูแลระบบแดชบอร์ดยังรองรับโฟลว์ OIDC (OpenID Connect) แบบ **เลือกใช้**
ควบคู่ไปกับการเข้าสู่ระบบด้วยรหัสผ่านเริ่มต้น — การเข้าสู่ระบบด้วยรหัสผ่านไม่เคยถูกลบออก เพียงแต่
เสริมเข้ามา:

- ปิดใช้งานเว้นแต่ `settings.oidcEnabled === true` **และ** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` ทั้งหมดได้รับการกำหนดค่า (การตั้งค่า → การยืนยันตัวตน)
  `GET /api/auth/oidc/login` จะคืนค่า `400` มิฉะนั้น
- `GET /api/auth/oidc/login` ค้นพบ `authorization_endpoint` จาก
  `/.well-known/openid-configuration` ของผู้ออก (จะกลับไปใช้
  `<issuer>/authorize`), สร้าง URI เปลี่ยนเส้นทางจากคำขอที่เข้ามา
  (รับรู้ `x-forwarded-proto`) และเปลี่ยนเส้นทางไปยัง IdP พร้อม `state` แบบสุ่ม
  ที่เก็บไว้ในคุกกี้ `oidc_state` แบบ `httpOnly`
- `GET /api/auth/oidc/callback` ตรวจสอบ `state`, แลกเปลี่ยนรหัสการอนุญาต,
  และตรวจสอบลายเซ็นของโทเค็น ID ผ่าน JWKS ของผู้ออก
  (`jose`'s `createRemoteJWKSet`, แคชตาม URI ของ JWKS) พร้อมการตรวจสอบ
  `issuer`/`audience` รายการอนุญาต `oidcAllowedSubjects` เสริมจะจับคู่
  `sub` claim ของโทเค็นหรือ `email` claim — `email` claim จะได้รับเกียรติก็ต่อเมื่อ
  `email_verified === true` เท่านั้น ดังนั้นอีเมลที่ไม่ได้รับการยืนยันที่ IdP
  จึงไม่สามารถผ่านประตูได้
- เมื่อสำเร็จ จะสร้าง JWT `auth_token` อายุ 30 วัน **แบบเดียวกันทุกประการ**
  กับการเข้าสู่ระบบด้วยรหัสผ่าน (`src/app/api/auth/login/route.ts`) ดังนั้นส่วนที่เหลือของ
  ไปป์ไลน์เซสชันแดชบอร์ด (การรีเฟรชอัตโนมัติ, แฟล็กคุกกี้) จึงไม่เปลี่ยนแปลง —
  OIDC เพียงแค่เข้ามาแทนที่วิธีการสร้างคุกกี้ ไม่ใช่สิ่งที่คุกกี้ให้สิทธิ์

## คลาสของเส้นทาง (Route Classes)

`src/server/authz/types.ts` กำหนดคลาสสามประเภท; เส้นทางใดๆ ที่ไม่สามารถจัดประเภทได้อย่างชัดเจนจะถูกจัดเป็น `MANAGEMENT` โดยปริยาย

| คลาส         | คำอธิบาย                                                                                                                                                    | การยืนยันตัวตนที่จำเป็น                                                           |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| `PUBLIC`     | เส้นทางที่ปลอดภัยอย่างชัดเจน — การเข้าสู่ระบบ, การออกจากระบบ, สถานะ, การเริ่มต้น, สุขภาพ, การเริ่มต้นใช้งาน (onboarding bootstrap)                          | ไม่มี                                                                             |
| `CLIENT_API` | ปลายทางสำหรับการให้บริการโมเดล — `/api/v1/*`, `/api/v1beta/*`, รวมถึงชื่อแทน `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*` | คีย์ Bearer เมื่อมีการเปิดใช้งานแฟล็กคุณสมบัติ `REQUIRE_API_KEY` ที่มีผลบังคับใช้ |
| `MANAGEMENT` | หน้าแดชบอร์ด, การตั้งค่า, ผู้ให้บริการ, คีย์, ปลายทางสำหรับผู้ดูแลระบบและการวินิจฉัย                                                                        | เซสชันแดชบอร์ด หรือ Bearer ที่มีขอบเขต `manage`                                   |

## ไปป์ไลน์ (Pipeline)

```
คำขอขาเข้า → src/proxy.ts
  → runAuthzPipeline() ใน src/server/authz/pipeline.ts
    1. ลบส่วนหัวภายในที่เชื่อถือได้ (x-omniroute-auth-*, x-omniroute-route-class)
    2. สร้างรหัสคำขอ, จัดประเภทเส้นทางผ่าน classifyRoute()
    3. หาก pathname == "/" → เปลี่ยนเส้นทางไปที่ /dashboard
    4. หากกำลังระบาย (ปิดระบบอย่างนุ่มนวล) และ /api/* → 503
    5. หากไม่ใช่ GET /api/* → ตรวจสอบ checkBodySize() guard
    6. หาก OPTIONS → CORS preflight 204
    7. หาก options.enforce == false → ส่งผ่านพร้อมส่วนหัว route-class
    8. มิฉะนั้น: POLICIES[routeClass].evaluate(ctx)
       - อนุญาต  → ประทับ x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - ปฏิเสธ → ข้อผิดพลาด JSON พร้อม correlation_id (หน้าแดชบอร์ด → 302 /login)
```

ส่วนหัวภายในที่เชื่อถือได้ (กำหนดไว้ใน `src/server/authz/headers.ts`) จะ**ถูกลบออกจากคำขอขาเข้า**ก่อนการจัดประเภท — ลูกค้าไม่สามารถใส่ `x-omniroute-auth-*` ล่วงหน้าเพื่อปลอมตัวเป็นผู้ใช้ได้

### สัญญาของนโยบาย (Policy contracts)

แต่ละคลาสของเส้นทางมีนโยบายอยู่ใน `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — จะคืนค่า `allow({ kind: "anonymous", id: "anonymous" })` เสมอ
- **`clientApiPolicy`** (`policies/clientApi.ts`) — ดึง Bearer ออกมา, ตรวจสอบความถูกต้องผ่าน `validateApiKey()` จะเปลี่ยนไปใช้ anonymous ก็ต่อเมื่อแฟล็กคุณสมบัติ `REQUIRE_API_KEY` ที่มีผลบังคับใช้ถูกปิดใช้งาน แฟล็กที่มีผลบังคับใช้จะถูกแก้ไขผ่าน `isRequireApiKeyEnabled()` (การแทนที่แฟล็กคุณสมบัติของ DB > `process.env.REQUIRE_API_KEY` > ค่าเริ่มต้น) ดังนั้นแฟล็กคุณสมบัติของแดชบอร์ดและตัวแปรสภาพแวดล้อมจึงควบคุม `/api/v1/*`, `/api/v1beta/*` และชื่อแทนได้อย่างสอดคล้องกัน; ความล้มเหลวในการแก้ไขจะทำให้การเข้าถึงถูกปฏิเสธ อนุญาตคำขอเซสชันแดชบอร์ดบนเส้นทาง API ของไคลเอ็นต์ (รวมถึง `/api/v1/models` ที่ใช้โดยแคตตาล็อกโมเดลของแดชบอร์ด)
- **`managementPolicy`** (`policies/management.ts`) — ยอมรับเซสชันแดชบอร์ด, คำขอซิงค์โมเดลภายใน (ที่ตรงกับ `/api/providers/[name]/(sync-models|models)`) หรือข้ามทั้งหมดหาก `isAuthRequired()` คืนค่าเป็น false คืนค่า 403 (`AUTH_001`) เมื่อมีโทเค็น Bearer แต่ไม่ถูกต้อง, มิฉะนั้นจะคืนค่า 401 นอกจากนี้ยังบังคับใช้ระดับการป้องกันเส้นทาง (LOCAL_ONLY / ALWAYS_PROTECTED) ก่อนที่จะมีการตรวจสอบการยืนยันตัวตนใดๆ — ดู [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md) เส้นทาง LOCAL_ONLY ใน `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (ปัจจุบัน: `/api/mcp/`) อาจเข้าถึงได้จากภายนอก loopback เมื่อคีย์ Bearer มีขอบเขต `manage`; เส้นทาง LOCAL_ONLY อื่นๆ ทั้งหมดจะยังคงเป็น strict-loopback โดยไม่คำนึงถึงขอบเขต

นโยบายที่สำเร็จจะคืนค่า `AuthSubject` ที่มี `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` แฮนเดิลเลอร์ปลายน้ำสามารถอ่านได้ผ่าน `assertAuth(request, "CLIENT_API")` ใน `src/server/authz/assertAuth.ts` แทนที่จะเรียกใช้ตรรกะการยืนยันตัวตนซ้ำ

## รายการเส้นทางสาธารณะ

`src/shared/constants/publicApiRoutes.ts` คือรายการที่อนุญาตอย่างชัดเจน:

รายการนี้ถูกแบ่งตาม **รูปแบบ** และการแบ่งนี้มีผลสำคัญ (GHSA-74g9-q8f6-793h): คำนำหน้าจะถูกจับคู่ด้วย `startsWith()` ดังนั้นจึงจับคู่กับทุกเส้นทางที่อยู่ติดกันซึ่งมีอักขระนำหน้าเหมือนกัน
`/api/usage/om-usage` ในฐานะคำนำหน้าจะถูกทำเครื่องหมายว่า `/api/usage/om-usage<anything>` เป็น PUBLIC และ Next จะแปลงสิ่งนั้นเป็น `/api/usage/[connectionId]` — ซึ่งเป็นตัวจัดการที่ไม่มีการยืนยันตัวตนของตัวเอง

```ts
// โครงสร้างย่อยที่แท้จริง ทุกรายการต้องลงท้ายด้วย "/" (ยืนยันโดยการทดสอบหน่วย)
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // ถือเป็น CLIENT_API ใน classify ไม่ใช่ "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// เส้นทางเดียวที่จับคู่ตรงกัน (มีหรือไม่มีเครื่องหมายทับท้าย)
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

// เส้นทางเดียวแบบอ่านอย่างเดียวที่อนุญาตการผ่อนปรน CORS origin ด้วย
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// เส้นทางเดียวแบบอ่านอย่างเดียวที่ไม่มีการผ่อนปรน CORS
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

เส้นทางแบบอ่านอย่างเดียวจะเป็นสาธารณะ **เฉพาะ** สำหรับเมธอดที่ปลอดภัยเท่านั้น ข้อควรทราบ: `classifyRoute()` จะยกเว้น `/api/v1/*` และ `/api/v1beta/*` จากการผ่านไปเป็น PUBLIC — เส้นทางเหล่านี้จะเป็น `CLIENT_API` เสมอ ดังนั้นนโยบายคีย์ Bearer จึงยังคงใช้ได้

## การเพิ่มเส้นทางใหม่

### รูปแบบที่ 1 — ปลายทาง API ของไคลเอนต์สาธารณะ (การยืนยันตัวตนแบบ Bearer)

เส้นทางภายใต้ `/api/v1/` และ `/api/v1beta/` จะถูกจัดประเภทเป็น `CLIENT_API` โดยอัตโนมัติ มิดเดิลแวร์จะบังคับใช้การตรวจสอบ Bearer; ตัวจัดการเส้นทางไม่จำเป็นต้องทำซ้ำ แต่สามารถอ่าน subject ได้หากเป็นประโยชน์

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... handler logic
}
```

### รูปแบบที่ 2 — ปลายทางสำหรับการจัดการ (เซสชันหรือ Bearer + จัดการ)

ใช้ `requireManagementAuth()` จาก `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... handler logic
}
```

`requireManagementAuth()` จะคืนค่า `null` เมื่อสำเร็จ หรือคืนค่า `Response` ข้อผิดพลาดแบบ JSON:

- 401 `AUTH_001` "Authentication required" — ไม่มีข้อมูลรับรองเลย
- 403 — Bearer ไม่ถูกต้อง **หรือ** มี Bearer แต่คีย์ไม่มีขอบเขต `manage` / `admin`

`hasManageScope(scopes)` จะคืนค่า true สำหรับ `"manage"` หรือ `"admin"`

### รูปแบบที่ 3 — การเพิ่มลงในรายการที่อนุญาตสาธารณะ

เลือกชุดตามรูปแบบ ไม่ใช่ตามความสะดวก เส้นทางเดียวจะอยู่ใน `PUBLIC_API_ROUTES_EXACT` (หรือ `PUBLIC_READONLY_CORS_API_ROUTES` สำหรับ GET-only); เฉพาะโครงสร้างย่อยที่แท้จริงเท่านั้นที่จะอยู่ใน `PUBLIC_API_ROUTE_PREFIXES` และ **ต้องลงท้ายด้วย `/`** การใส่เส้นทางเดียวในรายการคำนำหน้ายังเป็นการเผยแพร่เส้นทางที่อยู่ติดกันทั้งหมดที่ใช้ตัวอักษรนำหน้าเดียวกัน — รวมถึงเส้นทางพี่น้องที่มีส่วนของไดนามิกที่เพิ่มเข้ามาภายหลัง (GHSA-74g9-q8f6-793h) อัปเดตการทดสอบหน่วยที่ `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` และ `tests/unit/authz/classify.test.ts`

## สโคป

สามเนมสเปซ ตัวตรวจสอบแต่ละตัวจะอ่านเฉพาะสตริงของตัวเองเท่านั้น การเปรียบเทียบแบบเคียงข้างกัน รวมถึงเหตุผลที่ `manage` ล้มเหลวในการ `scopeMatches` สำหรับ `read:compression` และเหตุผลที่โทเค็นการเข้าถึงแบบ `read` ไม่สามารถ `PATCH /api/keys/{id}` ได้ อยู่ที่ [Three scope namespaces](../frameworks/MCP-SERVER.md#three-scope-namespaces)

คีย์ API มีอาร์เรย์ `scopes` (จัดเก็บเป็น JSON ใน `api_keys.scopes` ดู `src/lib/db/apiKeys.ts`)

### สโคปการจัดการ

- `manage` / `admin` — `hasManageScope` การเข้าถึงเส้นทาง API การจัดการแบบ Bearer
- `mcp:connect`, `self:usage`, `self:account-quota` และ `policy:bypass-provider-quota` เป็นสโคปแบบเพิ่มค่าที่ตรงกันทุกประการ สโคปเหล่านี้อยู่นอก `MANAGEMENT_API_KEY_SCOPES` `mcp:connect` จะเปิดเฉพาะส่วน `/api/mcp/` ที่ไม่ใช่ loopback เท่านั้น

### สโคปเครื่องมือ MCP

แค็ตตาล็อกและกฎการจับคู่ (สตริงที่เหมือนกัน หรือสโคปที่ได้รับซึ่งลงท้ายด้วย `*`): [MCP tool scopes](../frameworks/MCP-SERVER.md#mcp-tool-scopes) `MCP_SCOPE_LIST` ใน `src/shared/constants/mcpScopes.ts` เป็นชุดย่อยที่พิมพ์ไว้แต่เดิม ไม่ใช่แค็ตตาล็อกทั้งหมดนั้น การบังคับใช้จะทำงานใน `open-sse/mcp-server/scopeEnforcement.ts` หลังจาก `resolveCallerScopeContext()` แก้ไขสโคปจากข้อมูลการรับรองความถูกต้องของ MCP, เมตาดาต้าคำขอ หรือ `OMNIROUTE_MCP_SCOPES` จะยังคงปิดอยู่เว้นแต่ `OMNIROUTE_MCP_ENFORCE_SCOPES=true`

### สโคปโทเค็นการเข้าถึง

`read` / `write` / `admin` บนโทเค็น `oma_live_…` จัดอันดับโดย `scopeSatisfies` (`src/lib/accessTokens/scopes.ts`) การจัดอันดับนี้ใช้กับข้อมูลประจำตัวของโทเค็นการเข้าถึงเท่านั้น ดู [Management Authentication](../guides/MANAGEMENT-AUTH.md)

## การสลับการบังคับใช้การรับรองความถูกต้อง

`isAuthRequired()` ใน `src/shared/utils/apiAuth.ts` จะตัดสินใจว่ามีการบังคับใช้การรับรองความถูกต้อง **ใดๆ** สำหรับคำขอหรือไม่:

- `settings.requireLogin === false` → การรับรองความถูกต้องถูกปิดใช้งานทั่วโลก
- ไม่ได้กำหนดรหัสผ่าน **และ** ไม่มีตัวแปรสภาพแวดล้อม `INITIAL_PASSWORD` → โหมด bootstrap อนุญาตให้ใช้วิซาร์ดการเริ่มต้นใช้งานและคำขอ loopback แต่คำขอเครือข่ายที่เปิดเผยยังคงต้องการข้อมูลประจำตัว
- ข้อผิดพลาดของ DB ใดๆ → ล้มเหลวแบบปิด (ปลอดภัยโดยค่าเริ่มต้น)

การบังคับใช้คีย์ API ของไคลเอ็นต์ใช้ `isRequireApiKeyEnabled()` ใน `src/shared/utils/featureFlags.ts` ไม่ใช่การอ่าน `process.env.REQUIRE_API_KEY` โดยตรง สิ่งนี้สำคัญสำหรับอินสแตนซ์ที่ปรับใช้: การสลับ `REQUIRE_API_KEY` ใน Dashboard → Feature Flags จะจัดเก็บการแทนที่ DB และส่งผลกระทบโดยตรงต่อ `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` และการตรวจสอบการรับรองความถูกต้องของ Client-API อื่นๆ ที่ใช้ตัวช่วยนี้ร่วมกัน หากไม่สามารถอ่านที่เก็บแฟล็กคุณสมบัติได้ การรับรองความถูกต้องของ Client API จะล้มเหลวแบบปิดและต้องใช้คีย์

## การเปลี่ยนแปลงที่ส่งผลกระทบ — v3.8.0

เอนด์พอยต์ `/api/v1/agents/tasks/*` และ `/api/resilience/model-cooldowns` **ตอนนี้ต้องมีการรับรองความถูกต้องของการจัดการ** (คอมมิต `588a0333`) ไคลเอ็นต์ที่เคยส่งคีย์ API ปกติโดยไม่มีสโคป `manage` จะได้รับ `403` การย้ายข้อมูล: ออกสโคป `manage` ให้กับคีย์ในแดชบอร์ด API Keys หรือใช้เซสชันแดชบอร์ดที่เข้าสู่ระบบแล้ว

## การเปลี่ยนแปลงพฤติกรรม — v3.8.2

`/api/mcp/*` (เซิร์ฟเวอร์ MCP ระยะไกล) ยังคงเป็น LOCAL_ONLY โดยค่าเริ่มต้น แต่ตอนนี้ยอมรับคำขอที่ไม่ใช่ loopback เมื่อส่วนหัว `Authorization: Bearer <api-key>` มีสโคป `manage` ส่วนที่แยกออกมาถูกจำกัดอย่างชัดเจนต่อเส้นทางผ่าน `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ใน `src/server/authz/routeGuard.ts`; ส่วนนำหน้า LOCAL_ONLY ที่เป็นพี่น้องกัน `/api/cli-tools/runtime/*` ไม่สามารถข้ามได้โดยเจตนาเนื่องจากสามารถสร้างกระบวนการย่อยแบบสุ่มได้ คำขอที่ไม่ระบุชื่อไปยัง `/api/mcp/*` จากที่ไม่ใช่ loopback ยังคงส่งคืน `403 LOCAL_ONLY` — ค่าเริ่มต้นสำหรับเส้นทาง LOCAL_ONLY ใหม่ใดๆ ยังคงเป็น strict-loopback ดู [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)

## การทดสอบ

- การทดสอบหน่วย: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`
- รายการที่อนุญาตสาธารณะ: `tests/unit/public-api-routes.test.ts`
- เรียกใช้แบบเน้น: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`

## การดีบัก

ไปป์ไลน์จะประทับการตอบกลับด้วย:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

สำหรับการร้องขอที่ผ่านการรับรองความถูกต้อง ส่วนหัวการร้องขอต้นน้ำ (ฝั่งแฮนเดิลเลอร์) จะรวมถึง:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

ใช้ `assertAuth(req, expectedClass)` ภายในแฮนเดิลเลอร์ — มันจะโยน `AuthzAssertionError` พร้อมโค้ด `AUTHZ_NOT_INITIALIZED` หากมิดเดิลแวร์ถูกข้าม (มีประโยชน์สำหรับการตรวจจับการถดถอยของการกำหนดค่าในการทดสอบ)

## ดูเพิ่มเติม

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ตัวทำเครื่องหมายการรับรองความถูกต้องต่อปลายทาง
- [COMPLIANCE.md](../security/COMPLIANCE.md) — บันทึกการตรวจสอบสำหรับเหตุการณ์การรับรองความถูกต้อง
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — สามเนมสเปซขอบเขตและแคตตาล็อกขอบเขตเครื่องมือ MCP
- แหล่งที่มา: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
