# Egress IP Family Policy (IPv4/IPv6) (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **ตรึงทราฟฟิกขาออกไว้กับตระกูล IP เดียว — `auto`, `ipv4` หรือ `ipv6` — แยกตามพร็อกซี เพื่อให้ทางออกที่รองรับเฉพาะ IPv6 ไม่รั่วไหลกลับไปใช้ IPv4 โดยไม่แจ้งให้ทราบ**

> **แหล่งข้อมูลหลัก:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute ช่วยให้พร็อกซีแต่ละตัวมี **คำสั่งกำหนดตระกูลแอดเดรสสำหรับทราฟฟิกขาออก** ได้ โดยค่าเริ่มต้น ระบบปฏิบัติการจะเลือก IPv4 หรือ IPv6 (ดูอัลสแต็ก, "Happy Eyeballs") เมื่อคุณตั้งค่าคำสั่งเป็น `ipv4` หรือ `ipv6` OmniRoute จะตรึงทุกการเชื่อมต่อผ่านพร็อกซีนั้นไว้กับตระกูลที่เลือก และ **ปิดกั้นเมื่อล้มเหลว** แทนที่จะย้อนกลับไปใช้ตระกูลอื่น

หน้านี้อธิบายว่าคำสั่งนี้คืออะไร เหตุใดจึงมีอยู่ กำหนดค่าได้ที่ใด และรันไทม์ประมวลผลคำสั่งนี้อย่างไร

---

## สารบัญ

- [คืออะไร](#what-it-is)
- [เหตุใดจึงมีอยู่](#why-it-exists)
- [ค่าทั้งสาม](#the-three-values)
- [วิธีกำหนดค่า](#how-to-configure-it)
- [วิธีประมวลผล `auto`](#how-auto-resolves)
- [วิธีบังคับใช้ `ipv4` / `ipv6`](#how-ipv4--ipv6-are-enforced)
- [ความเข้ากันได้กับ SOCKS5](#socks5-compatibility)
- [ลักษณะการทำงานแบบปิดกั้นเมื่อล้มเหลว](#fail-closed-behavior)
- [โมเดลข้อมูล](#data-model)
- [เอกสารที่เกี่ยวข้อง](#related-documentation)

---

## คืออะไร

พร็อกซีทุกตัวในรีจิสทรีมีฟิลด์ `family` ซึ่งรองรับค่าที่เป็นไปได้สามค่า และตรวจสอบความถูกต้องด้วย Zod enum:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

ฟิลด์นี้มีค่าเริ่มต้นเป็น `"auto"` ซึ่งคงลักษณะการทำงานแบบดูอัลสแต็กเดิมไว้ การตั้งค่าเป็น `ipv4` หรือ `ipv6` จะตรึงตระกูลที่ใช้เชื่อมต่อสำหรับพร็อกซีนั้น

คำสั่งนี้จะถูกปรับให้อยู่ในรูปแบบมาตรฐานทุกจุดผ่านตัวช่วยเดียว เพื่อให้ค่าที่ไม่รู้จักทั้งหมดถูกเปลี่ยนเป็น `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## เหตุใดจึงมีอยู่

เพิ่มเข้ามาใน PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777) ปัญหาหลักที่เป็นแรงจูงใจ:

| ปัญหา                                                             | สิ่งที่คำสั่งนี้แก้ไข                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ทราฟฟิกขาออกที่ควรใช้เฉพาะ IPv6 รั่วไหลไปยัง IPv4**             | เมื่อโฮสต์พร็อกซีมีทั้งระเบียน A และ AAAA (หรือระบบปฏิบัติการเลือก IPv4 ก่อน) Happy Eyeballs อาจเชื่อมต่อขาออกผ่าน IPv4 แม้ว่าคุณตั้งใจให้ใช้เส้นทางเฉพาะ IPv6 การตรึงเป็น `ipv6` จะป้องกันการรั่วไหลดังกล่าว                                                                                                                                         |
| **การเพิกถอนเนื่องจากความผิดปกติของทางออกที่ใช้ร่วมกัน**          | ผู้ให้บริการที่มีการหมุนเวียน (codex/openai) จะเพิกถอนโทเค็นเมื่อหลายบัญชีส่งทราฟฟิกขาออกผ่าน IP **เดียวกัน** ในปริมาณมาก การควบคุมตระกูลของทราฟฟิกขาออกเป็นส่วนหนึ่งของการทำให้บัญชีต่าง ๆ ใช้เส้นทางขาออกที่แยกจากกันและคาดการณ์ได้ (ดู [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) สำหรับการวินิจฉัย IP ขาออกที่ใช้ร่วมกับฟีเจอร์นี้) |
| **ทราฟฟิกขาออกที่กำหนดแน่นอนเพื่อการปฏิบัติตามข้อกำหนด/การทดสอบ** | เมื่อคุณต้องรับประกันว่าทราฟฟิกออกจากระบบผ่านตระกูลใดตระกูลหนึ่งโดยเฉพาะ `auto` นั้นไม่เพียงพอ                                                                                                                                                                                                                                                        |

คำสั่งนี้ได้รับการออกแบบให้เป็นแบบ **แยกตามพร็อกซี** โดยเจตนา ไม่ใช่แบบส่วนกลาง — พร็อกซีแต่ละตัวในพูลของคุณจึงสามารถใช้นโยบายที่แตกต่างกันได้

---

## ค่าทั้งสามแบบ

| ค่า    | ป้ายกำกับใน UI           | ลักษณะการทำงาน                                                                                                                                                               |
| ------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `อัตโนมัติ (dual-stack)` | ระบบปฏิบัติการเป็นผู้เลือกแฟมิลี สำหรับโฮสต์พร็อกซีที่ระบุเป็น IP โดยตรง แฟมิลีจะถูกกำหนดโดยค่าดังกล่าวอยู่แล้ว ส่วนชื่อโฮสต์สามารถใช้ได้ทั้งสองแฟมิลี ค่านี้เป็นค่าเริ่มต้น |
| `ipv4` | `IPv4 เท่านั้น`          | บังคับให้การเชื่อมต่อใช้ IPv4 และจะปฏิเสธการเชื่อมต่อหากโฮสต์พร็อกซีไม่มีระเบียน IPv4 (A)                                                                                    |
| `ipv6` | `IPv6 เท่านั้น`          | บังคับให้การเชื่อมต่อใช้ IPv6 และจะปฏิเสธการเชื่อมต่อหากโฮสต์พร็อกซีไม่มีระเบียน IPv6 (AAAA)                                                                                 |

สตริงของ UI อยู่ใน `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`)

---

## วิธีการกำหนดค่า

### แดชบอร์ด

ตัวเลือกอยู่ในแบบฟอร์มพร็อกซีของแท็บ **กลุ่มพร็อกซี**:

1. เปิด **แดชบอร์ด → การตั้งค่า → พร็อกซี → กลุ่มพร็อกซี**
2. เพิ่มหรือแก้ไขพร็อกซี
3. ตั้งค่ารายการแบบเลื่อนลง **แฟมิลี IP** เป็น `อัตโนมัติ (dual-stack)`, `IPv4 เท่านั้น` หรือ `IPv6 เท่านั้น`
4. บันทึก

คอนโทรลนี้เรนเดอร์โดย `ProxyRegistryManager.tsx` (เมานต์อยู่ใน `proxy/ProxyPoolTab.tsx`)

### API

ฟิลด์ `family` เป็นส่วนหนึ่งของเพย์โหลดสำหรับสร้าง/อัปเดตรีจิสทรีพร็อกซี ซึ่งตรวจสอบความถูกต้องโดย `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) และจัดการโดย `POST` / `PATCH /api/v1/management/proxies`:

```bash
# สร้างพร็อกซีที่ใช้ IPv6 เท่านั้น
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# เปลี่ยนพร็อกซีที่มีอยู่ให้ใช้ IPv4 เท่านั้น
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

ออบเจ็กต์การกำหนดค่าพร็อกซีแบบอินไลน์ที่ใช้กับรายการพร็อกซีต้นทางก็รองรับฟิลด์เดียวกันนี้ด้วย (`upstream_proxy_config.family` โปรดดู [โมเดลข้อมูล](#data-model))

สำหรับ API ส่วนที่เหลือเกี่ยวกับการสร้าง อ่าน อัปเดต ลบ และกำหนดพร็อกซี โปรดดู [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md)

---

## วิธีที่ `auto` กำหนดค่า

เมื่อ `family` เป็น `auto` OmniRoute จะ **ไม่** เพิ่มไดเรกทีฟใดๆ ต่อท้าย โดยจะใช้ URL ของพร็อกซีตามเดิม และแฟมิลีสำหรับการเชื่อมต่อจะถูกกำหนดจากข้อมูลที่มีอยู่ในตัวมันเอง

ในขั้นตอนสร้าง URL (`proxyConfigToUrl` / `normalizeProxyUrl` ใน `open-sse/utils/proxyDispatcher.ts`) พร็อกซีแบบ `auto` จะให้ URL ปกติที่ไม่มีเครื่องหมายกำกับ:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

ในขั้นตอนการส่งต่อ (`resolveDispatcherFamily`) ค่า `auto` จะถูกกำหนดเป็นแฟมิลีที่มีอยู่ในตัวของโฮสต์ที่ระบุเป็น IP โดยตรง หรือเป็น `null` (ให้ระบบปฏิบัติการตัดสินใจ) สำหรับชื่อโฮสต์:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // ชื่อโฮสต์จะให้ค่า null → ระบบปฏิบัติการเป็นผู้เลือก
  // ...
}
```

ดังนั้น:

- `auto` + โฮสต์ที่ระบุเป็น IP โดยตรง (`192.0.2.1` / `[2001:db8::1]`) → ใช้แฟมิลีของ IP ดังกล่าว
- `auto` + ชื่อโฮสต์ → `null` → ใช้การแปลงชื่อแบบ dual-stack มาตรฐานของระบบปฏิบัติการ

---

## วิธีบังคับใช้ `ipv4` / `ipv6`

คำสั่งที่ไม่ใช่ `auto` จะถูกส่งต่อในรูปเครื่องหมายกำกับคิวรีสังเคราะห์เพียงรายการเดียว — `?family=ipv4` หรือ `?family=ipv6` — โดยผนวกเข้ากับ URL ของพร็อกซีที่ผ่านการทำให้เป็นรูปแบบมาตรฐานแล้วเพียงครั้งเดียว `normalizeProxyUrl` จะลบและผนวกเครื่องหมายกำกับนี้กลับเข้าไปใหม่อย่างระมัดระวังเพียงครั้งเดียว เพื่อไม่ให้การแยกวิเคราะห์พอร์ตเสียหาย

เมื่อสร้าง dispatcher แล้ว ระบบจะอ่านเครื่องหมายกำกับและแปลงเป็น family ที่ใช้เชื่อมต่ออย่างเจาะจง หากโฮสต์เป็นค่า IP แบบลิเทอรัลของ family **ตรงข้าม** OmniRoute จะโยนข้อผิดพลาด (เมื่อเกิดความขัดแย้ง ระบบจะปฏิเสธการทำงานแบบ fail-closed):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

จากนั้น family ที่ระบุอย่างเจาะจงจะถูกตรึงไว้บน connector:

- **พร็อกซี HTTP/HTTPS** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — ปิดใช้งาน Happy Eyeballs เพื่อให้ระบบเชื่อมต่อผ่าน family ที่เลือกไว้เพียงรายการเดียว
- **พร็อกซี SOCKS5**: connector แบบกำหนดเองจะส่งต่อ `socket_options: { family, autoSelectFamily: false }` ไปยังไคลเอนต์ SOCKS (ดู [ความเข้ากันได้กับ SOCKS5](#socks5-compatibility))

---

## ความเข้ากันได้กับ SOCKS5

การตรึง family ใช้งานได้กับพร็อกซี SOCKS5 แต่ `fetch-socks` มาตรฐานไม่ได้เปิดให้เข้าถึงตัวเลือกของซ็อกเก็ตที่จำเป็นสำหรับตรึง family ของช่วงเชื่อมต่อไปยังพร็อกซี OmniRoute จึงมาพร้อม connector ของตัวเองสำหรับกรณีนี้:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

การส่งคำขอผ่าน SOCKS5 ทั้งหมดจะผ่าน `createSocksDispatcherWithFamily` โดยไม่ขึ้นกับค่า `family` (รวมถึง `null` / `auto` เมื่อใช้ชื่อโฮสต์): `buildSocksFamilySocketOptions(null)` จะให้ผลลัพธ์เป็น `{}` และระบบจะใช้เส้นทาง `SocksClient.createConnection` + TLS `buildConnector` เดียวกัน พร้อมการตรึงผ่าน `socket_options` เพื่อไม่ให้ Happy Eyeballs เลือก IPv4 สำหรับนโยบายทราฟฟิกขาออกที่อนุญาตเฉพาะ IPv6

การรองรับ SOCKS5 จะเปิดใช้งานตามค่าเริ่มต้น (เลือกปิดได้ผ่าน `ENABLE_SOCKS5_PROXY=false`); ดู [PROXY_GUIDE.md → ตัวแปรสภาพแวดล้อม](../ops/PROXY_GUIDE.md#environment-variables)

---

## พฤติกรรมแบบ Fail-Closed

จุดประสงค์หลักของคำสั่งนี้คือการ **ปฏิเสธ** แทนที่จะย้อนกลับไปใช้ family ที่ไม่ถูกต้องโดยไม่มีการแจ้งเตือน มีกลไกป้องกันสองส่วนที่บังคับใช้พฤติกรรมนี้:

1. **ความขัดแย้งของค่าลิเทอรัล** — คำสั่งที่ขัดแย้งกับโฮสต์ซึ่งเป็น IP แบบลิเทอรัลจะโยนข้อผิดพลาดขณะสร้าง dispatcher (`resolveDispatcherFamily` ดังที่แสดงไว้ข้างต้น)

2. **การตรวจสอบ DNS ล่วงหน้าสำหรับชื่อโฮสต์** — สำหรับพร็อกซีที่ใช้ชื่อโฮสต์และมีการตรึง family `proxyFetch.ts` จะตรวจสอบว่าชื่อโฮสต์นั้นมีระเบียนของ family ที่กำหนดจริง **ก่อน** ส่งทราฟฟิกขาออก ผ่าน `assertHostnameSupportsFamily`:

   ```ts
   // open-sse/utils/proxyFamilyResolve.ts
   const hasFamily = records.some((r) => r.family === family);
   if (!hasFamily) {
     throw new Error(
       `[ProxyFamily] Proxy host ${host} has no ${family === 6 ? "IPv6 (AAAA)" : "IPv4 (A)"} record; ` +
         `refusing ${family === 6 ? "IPv6" : "IPv4"}-only egress (fail-closed)`
     );
   }
   ```

   เมื่อเกิดความล้มเหลว `proxyFetch.ts` จะกำกับข้อผิดพลาดด้วย `code = "PROXY_FAMILY_UNAVAILABLE"` และ `statusCode = 503` ความล้มเหลวในการแปลงชื่อ DNS จะถูกจัดการแบบ fail-closed เช่นเดียวกัน (ปฏิเสธการส่งทราฟฟิกขาออก)

สำหรับโฮสต์ที่เป็น IP แบบลิเทอรัล การตรวจสอบ DNS ล่วงหน้าจะไม่ดำเนินการใด ๆ เนื่องจาก family เป็นคุณสมบัติที่มีอยู่ในตัวอยู่แล้วและไม่จำเป็นต้องค้นหา

---

## โมเดลข้อมูล

คอลัมน์ `family` ถูกเพิ่มโดยไมเกรชัน `099_proxy_family.sql` ลงในตาราง **สอง** ตาราง:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — คำสั่งเฉพาะพร็อกซีสำหรับรายการในรีจิสทรี (`src/lib/db/proxies.ts`) คิวรีการแก้ไขค่าจะเลือก `family` พร้อมกับคอลัมน์พร็อกซีอื่นๆ และค่าที่ไม่มีอยู่หรือไม่ใช่สตริงจะถูกแปลงเป็น `"auto"`
- `upstream_proxy_config.family` — คำสั่งสำหรับรายการพร็อกซีต้นทาง (`src/lib/db/upstreamProxy.ts`) โดยมีค่าเริ่มต้น `"auto"` เช่นเดียวกัน

เมื่ออ็อบเจ็กต์พร็อกซีที่ผ่านการแก้ไขค่ามี `family` ที่ไม่ใช่ `auto` ฟังก์ชัน `proxyConfigToUrl` จะเพิ่มมาร์กเกอร์ `?family=` เพื่อให้การตรึงค่านี้คงอยู่ตลอดเส้นทางไปจนถึง dispatcher

---

## เอกสารที่เกี่ยวข้อง

> 📖 **เอกสารที่เกี่ยวข้อง:**
>
> - [คู่มือพร็อกซี](../ops/PROXY_GUIDE.md) — ระบบพร็อกซีฉบับเต็ม: CRUD ของรีจิสทรี การแก้ไขค่า 4 ระดับ การหมุนเวียน การตรวจสอบสถานะ และข้อมูลอ้างอิง API
> - `docs/security/STEALTH_GUIDE.md` (git; ไม่ได้คอมไพล์รวมไว้ใน `/docs`) — ชั้นลายนิ้วมือ TLS และลายนิ้วมือ CLI ที่ทำงานอยู่บนพร็อกซี
> - [ระดับ Route Guard](./ROUTE_GUARD_TIERS.md) — การบังคับใช้ loopback สำหรับเส้นทางที่เข้าถึงได้เฉพาะภายในเครื่อง
