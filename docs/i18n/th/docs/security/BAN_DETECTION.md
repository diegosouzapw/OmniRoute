# Account-Ban / Banned-Keyword Detection (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute สแกนการตอบกลับข้อผิดพลาดจาก upstream เพื่อหาสัญญาณที่บ่งชี้ว่า
**บัญชีของผู้ให้บริการใช้งานไม่ได้อย่างถาวร** (ถูกระงับ / ปิดใช้งาน / ถูกแบนเนื่องจากละเมิด ToS) และเมื่อ
พบสัญญาณดังกล่าว จะย้ายการเชื่อมต่อนั้นไปยัง **สถานะสิ้นสุด `banned`** เพื่อไม่ให้
ถูกเลือกสำหรับคำขออีกต่อไป นี่คือสิ่งที่การ์ดการตั้งค่า **Security → Banned Keywords**
ใช้กำหนดค่า ("คีย์เวิร์ดเพิ่มเติมที่ทริกเกอร์การตรวจจับการแบนบัญชีอย่างถาวร
คีย์เวิร์ดที่มีมาให้ในระบบจะมีผลเสมอ")

หน้านี้อธิบายรายการที่มีมาให้ในระบบ ลำดับขั้นตอนการตรวจจับ ขอบเขต วิธีเพิ่ม
คีย์เวิร์ดแบบกำหนดเองอย่างปลอดภัย และวิธีกู้คืนการเชื่อมต่อที่ถูกทำเครื่องหมายไว้ สถานะ
สิ้นสุดดังกล่าวเป็นส่วนหนึ่งของโมเดลความยืดหยุ่นของระบบ — ดู
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("สถานะสิ้นสุด")

**แหล่งข้อมูลอ้างอิงหลัก:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`)

## คีย์เวิร์ดที่มีมาให้ในระบบ

สตริงย่อย 8 รายการต่อไปนี้มีผลเสมอ (ไม่คำนึงถึงตัวพิมพ์เล็ก-ใหญ่) ไม่ว่าจะมีรายการแบบกำหนดเองหรือไม่:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> รายการนี้จะเปลี่ยนแปลงไปตามถ้อยคำที่ผู้ให้บริการใช้แจ้งการแบน แหล่งข้อมูล
> ที่เชื่อถือได้คือ `ACCOUNT_DEACTIVATED_SIGNALS` ใน `open-sse/services/accountFallback.ts`;
> ให้ถือว่าบล็อกด้านบนเป็นภาพรวม ณ เวลาหนึ่ง

ตารางสัญญาณที่อยู่ติดกันอีกสองตารางซึ่ง **แยกจากกัน** อยู่ในไฟล์เดียวกัน และ _ไม่ได้_ เป็นส่วนหนึ่ง
ของการตรวจจับคีย์เวิร์ดการแบน:

- `CREDITS_EXHAUSTED_SIGNALS` — เครดิตสำหรับการเรียกเก็บเงิน/โควตาหมดลง (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → สถานะสิ้นสุด `credits_exhausted`
- `OAUTH_INVALID_TOKEN_SIGNALS` — **ไม่ใช่สถานะสิ้นสุด**; การรีเฟรชโทเค็นสามารถกู้คืนได้

หมายเหตุ: วลีชั่วคราวที่พบบ่อย เช่น **`rate limit`** / `429` จะได้รับการจัดการโดย
เส้นทางการจำกัดอัตรา / การพักการเชื่อมต่อ และ **ไม่ใช่** สัญญาณการแบน

## ลำดับขั้นตอนการตรวจจับ

```
การตอบกลับข้อผิดพลาดจาก upstream
  → แปลง body เป็นสตริง + เปลี่ยนเป็นตัวพิมพ์เล็ก
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [จับคู่สตริงย่อย]
  → ตรงกันหรือไม่?
      → connection testStatus = "banned"      (ถาวร — พักการเชื่อมต่อ 1 ปี และไม่กู้คืนโดยอัตโนมัติ)
      → หากเปิดการตั้งค่า `autoDisableBannedAccounts` และ `autoDisableBannedScope`
        ครอบคลุมการเชื่อมต่อนี้ (`all` หรือ `subscription` สำหรับ OAuth/cookie/session)
        → กำหนด isActive = false เพิ่มเติมด้วย คีย์ API แบบชำระเงินล่วงหน้าจะยังคงใช้งานอยู่เมื่อขอบเขตเป็น
        `subscription`
      → การเชื่อมต่อจะถูกข้ามระหว่างการเลือกบัญชี (สถานะ QUOTA_BLOCKING แบบรวม)
```

- การจับคู่เป็นการค้นหา **สตริงย่อยโดยไม่คำนึงถึงตัวพิมพ์เล็ก-ใหญ่** ใน **body**
  ของการตอบกลับ (`isAccountDeactivated`, `accountFallback.ts`)
- การกำหนดสถานะสิ้นสุด `banned` แบบถาวรจะเกิดขึ้นเมื่อ body มีสัญญาณการแบนที่ **สถานะ
  HTTP ใดๆ** (ผ่าน `markAccountUnavailable` → `checkFallbackError`) ป้ายกำกับ
  **`deactivated`** ที่มีขอบเขตแคบกว่า (`isActive=false` เมื่อการเชื่อมต่อไม่มี
  คีย์ API สำรอง) จะถูกเขียนโดยเส้นทางแบบอินไลน์ของ `chatCore.ts` เมื่อเป็น **HTTP 401 / 403**
  (จำแนกผ่าน `classifyProviderError` → `ACCOUNT_DEACTIVATED`) โปรดทราบว่า
  เส้นทาง `markAccountUnavailable()` จะเขียนสถานะสิ้นสุดที่ _แตกต่างออกไป_ —
  **`expired`** — สำหรับสัญญาณ `ACCOUNT_DEACTIVATED` เดียวกัน (ผ่าน
  `resolveTerminalConnectionStatus`) ดังนั้น การแบนเดียวกันอาจปรากฏเป็น
  `deactivated` หรือ `expired` ก็ได้ ขึ้นอยู่กับว่าเส้นทางใดเป็นผู้จัดการการตอบกลับนั้น (ความคิดเห็น
  ในโค้ดรุ่นเก่าระบุว่า "เมื่อ body ของ 401 มีสตริงเหล่านี้" — ซึ่งอธิบายพฤติกรรม
  ปัจจุบันไม่ครบถ้วน)
- การเชื่อมต่อที่มีสถานะ `banned` จะถูกยกเว้นจากการเลือกในทุกจุดที่มีการกรองสถานะสิ้นสุด
  (`isTerminalConnectionStatus`, `QUOTA_BLOCKING_CONNECTION_STATUSES` แบบรวม)

## ขอบเขต — ผู้ให้บริการใดบ้างที่ถูกสแกน

**ผู้ให้บริการทั้งหมด** การตรวจสอบทำงานอยู่ในไปป์ไลน์จัดการข้อผิดพลาดทั่วไป ซึ่งคำขอไปยังต้นทางที่ล้มเหลวทุกรายการจะไหลผ่าน — การตรวจสอบนี้ **ไม่ได้** จำกัดไว้เฉพาะตัวรวบรวมข้อมูล OAuth/การสมัครสมาชิก สถานะปลายทางที่เกิดขึ้นจะถูกกำหนดต่อ **การเชื่อมต่อ** ไม่ใช่ต่อผู้ให้บริการ

อย่างไรก็ตาม _สตริง_ ที่มีมาให้ในตัวจะมุ่งเน้นไปที่ผู้ให้บริการแบบสมัครสมาชิก/OAuth ซึ่งมีความเสี่ยงที่จะถูกแบนจริง (ChatGPT Web Codex, Claude Web, Codex, Muse Spark, Antigravity) ผู้ให้บริการที่ใช้ API key จะทริกเกอร์ตัวตรวจจับก็ต่อเมื่อเนื้อหาข้อผิดพลาดมีสตริงย่อยรายการใดรายการหนึ่งอยู่จริงเท่านั้น

`autoDisableBannedScope` (`all` | `subscription`, ค่าเริ่มต้นคือ `all`) ควบคุมว่าการพบข้อความที่ตรงกันจะตั้งค่า `isActive=false` ด้วยหรือไม่ `subscription` หมายถึงสิทธิ์ใช้งานแบบล็อกอิน (การสมัครสมาชิกแบบชำระเงินและบัญชีฟรี รวมถึงเซสชันที่ใช้คุกกี้เว็บ) ระบบยังคงบันทึก `testStatus=banned` สำหรับ API key แบบชำระเงินล่วงหน้า แต่จะปล่อยให้คีย์เหล่านั้นอยู่ในพูลการกำหนดเส้นทาง การออกแบบระยะยาวคือการรองรับการกำหนดค่าแทนที่แยกตามผู้ให้บริการและตามบัญชี ส่วน enum ส่วนกลางเป็นการใช้งานระยะแรก

## คีย์เวิร์ดการแบนแบบกำหนดเอง

เพิ่มหรือลบคีย์เวิร์ดได้ที่ **Security → Banned Keywords** (คงค่าไว้เป็นการตั้งค่าส่วนกลาง `customBannedSignals` ผ่าน `PATCH /api/settings`) คีย์เวิร์ดเหล่านี้จะถูก **เพิ่มเข้าไปใน** รายการที่มีมาให้ในตัว — ไม่ได้ใช้แทนที่รายการเดิม — และจะโหลดใหม่ทันทีเมื่อบันทึก (รวมถึงเมื่อเริ่มต้นระบบ) ผ่าน `setCustomBannedSignals()` คีย์เวิร์ดแต่ละรายการจำกัดความยาวสูงสุดไว้ที่ 200 อักขระ โดยไม่จำกัดจำนวนสมาชิกในอาร์เรย์

**⚠ ความเสี่ยงจากผลบวกลวง — เลือกใช้วลีที่เฉพาะเจาะจง** การตรวจจับใช้การค้นหาสตริงย่อยแบบตรงตัวจากเนื้อหาการตอบกลับทั้งหมด และผลที่ตรงกันจะมีสถานะ **ถาวร** (ระยะพัก 1 ปี และต้องกู้คืนด้วยตนเอง) คีย์เวิร์ดที่กว้างเกินไปอาจทำให้การเชื่อมต่อที่ทำงานได้ตามปกติถูกแบน:

- **ไม่ดี:** `quota`, `limit`, `error`, `denied` — ปรากฏในข้อผิดพลาดชั่วคราวหลายประเภท
- **ดี:** ประโยคแจ้งการแบนแบบเต็ม เช่น `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`

ควรเลือกใช้วลีที่ยาวที่สุดและมีความหมายชัดเจนซึ่งผู้ให้บริการส่งกลับมาเมื่อมีการแบนจริง หากไม่แน่ใจ ให้ตรวจสอบ `lastError` ของการเชื่อมต่อก่อน แล้วจึงเพิ่มข้อความตามที่ปรากฏจริง

## การกู้คืนการเชื่อมต่อที่ถูกทำเครื่องหมาย

สถานะปลายทาง `banned` / `deactivated` **จะไม่กู้คืนโดยอัตโนมัติ** (สถานะเหล่านี้ถูกตัดออกจากรอบการกู้คืนเชิงรุก — มีเพียงระยะพักของ `unavailable` เท่านั้นที่กู้คืนได้เอง) ผู้ปฏิบัติงานต้องล้างสถานะเหล่านี้อย่างชัดเจน:

1. **ทดสอบการเชื่อมต่ออีกครั้ง** — การดำเนินการ **Test** บนแดชบอร์ด
   (`POST /api/providers/{id}/test`); การตรวจสอบที่สำเร็จจะรีเซ็ต `testStatus` เป็น
   `active` และล้างฟิลด์ข้อผิดพลาด
2. **ยืนยันตัวตนใหม่ / แก้ไขข้อมูลรับรอง** — สำหรับผู้ให้บริการ OAuth ให้เรียกใช้โฟลว์ล็อกอิน
   / รีเฟรชอีกครั้ง เส้นทางสำหรับสร้าง/นำเข้าผู้ให้บริการจะตั้งค่า `isActive = true`
3. **เปิดใช้งานการเชื่อมต่ออีกครั้ง** — หากการปิดใช้งานอัตโนมัติตั้งค่า `isActive = false`
   (ขอบเขต `all` หรือ `subscription` สำหรับการเชื่อมต่อ OAuth/คุกกี้/เซสชัน)
   ให้เปิดกลับมาอีกครั้งหลังจากแก้ไขบัญชีแล้ว

ไม่มีปุ่ม "clear ban flag" แยกต่างหาก — การกู้คืนทำได้ด้วยการทดสอบใหม่ การยืนยันตัวตนใหม่ หรือการเปิดใช้งานใหม่ ซึ่งเป็นไปตามกฎสถานะปลายทางทั่วไปใน
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md)

## การแยกการตรวจสอบออกจากกัน (การทดสอบโมเดลทั้งหมด)

**ความล้มเหลวที่เกิดจากการตรวจสอบ** (การส่งคำขอทดสอบโมเดลทั้งหมด / ตรวจสอบสถานะ ซึ่งทำงานภายใน `runAsProbe`) จะไม่นำการเชื่อมต่อออกจากพูล (#9817): ระบบจะ **บันทึกไว้เพื่อให้มองเห็นได้** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`) แต่ข้าม **ทุก** การเปลี่ยนแปลงสถานะการกำหนดเส้นทาง — ระยะพัก สถานะปลายทาง (`banned` / `deactivated` / `credits_exhausted`) การล็อกแยกตามโมเดล ตัวตัดวงจรของผู้ให้บริการ แคชโควตา 5 นาที การรีเฟรชโทเค็น OAuth และการปิดใช้งานอัตโนมัติ เฉพาะความล้มเหลวในเส้นทางคำขอจริงเท่านั้นที่จะทำให้ปิดใช้งาน ข้อผิดพลาดที่บันทึกไว้ทำให้บัญชีที่ถูกทำเครื่องหมายปรากฏในแดชบอร์ด ขณะที่บัญชีนั้นยังคงให้บริการทราฟฟิกต่อไป

จุดตัดสินใจเพียงจุดเดียวคือ `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`) ซึ่งถูกเรียกใช้จาก **ทุก** ตำแหน่งที่อาจเปลี่ยนแปลงสถานะการกำหนดเส้นทางจากความล้มเหลวที่เกิดจากการตรวจสอบ:

- `markAccountUnavailable` (`auth.ts`) — บันทึกเท่านั้น (`lastError` เป็นข้อความดิบ,
  `lastErrorType`, `errorCode`, `lastErrorAt`; โดยตั้งใจ **ไม่** บันทึก
  `backoffLevel` เพราะจะทริกเกอร์การลดสถานะอัตโนมัติในเวลาคัดเลือกและล้าง
  ระเบียนนี้)
- `maybeAutoDisableBannedAccount` — ไม่มีการปิดใช้งานอัตโนมัติ
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (บันทึกเท่านั้น
  ไม่มีสถานะปลายทาง `credits_exhausted`), GEO_BLOCKED (ไม่มีการยกเว้น 24 ชั่วโมง),
  MODEL_NOT_FOUND (ไม่มี `lockModel`), การสลับบัญชีสำรองเมื่อ codex ได้รับ 429
  (ไม่มี `markCodexScopeRateLimited`, ไม่มีการคงค่า `rate_limited_until`, ไม่มี
  การล้างความสัมพันธ์ของเซสชัน), `persistCodexQuotaState` (ไม่มีการเขียนสถานะโควตา
  และไม่มีการทำให้แคชใช้ไม่ได้), `recordKeyHealthStatus` (ไม่แตะต้องตัวหมุนเวียนสถานะ
  ของคีย์)
- การรีเฟรช OAuth — ทั้งการรีเฟรชเชิงรุกในคลาสฐานของตัวดำเนินการ
  (`base.ts` `execute()` โดยไม่ใช้การหมุนเวียน refresh token) และเส้นทางตอบสนองต่อ 401/403
  ใน `chatCore` (ไม่มีการปิดใช้งานเป็น `expired`)
- `chat.ts` — ตัวตัดวงจรของผู้ให้บริการและแคชโควตา 5 นาที
  (`markAccountExhaustedFrom429`) จะไม่ถูกลดระดับ

ข้อผิดพลาดที่บันทึกไว้ทำให้บัญชีที่ถูกทำเครื่องหมายปรากฏในแดชบอร์ด ขณะที่บัญชีนั้นยังคงให้บริการทราฟฟิกต่อไป หมายเหตุ: ระเบียนการตรวจสอบจะเก็บข้อความข้อผิดพลาดแบบ **ดิบ**
(ไม่ถูกตัด) ซึ่งต่างจากเส้นทางจริงที่ตัดข้อความด้วย `slice(0,100)`

ผู้ปฏิบัติงานที่ใช้การทดสอบทั้งหมดเป็นเครื่องมือบำรุงรักษาสามารถคืนค่าพฤติกรรมเดิม
(ถือว่าการตรวจสอบเป็นการสร้างผลลัพธ์จริง) ได้ด้วยวิธีใดวิธีหนึ่งต่อไปนี้:

- การตั้งค่า `probeCanDisable` (`POST /api/settings` พร้อม
  `{"probeCanDisable": true}` หรือแก้ไขฐานข้อมูล `key_value` โดยตรง) หรือ
- แฟล็กฟีเจอร์ **`PROBE_CAN_DISABLE=true`** (กำหนดผ่าน env หรือฐานข้อมูล โดยมีลำดับความสำคัญเหนือ
  การตั้งค่า)

กลไกป้องกันความล้มเหลว: หากการค้นหาแฟล็กหรือการตั้งค่าเกิดข้อผิดพลาด การแยกการตรวจสอบจะยังคงเปิดอยู่

## ไฟล์ต้นฉบับ

| ประเด็น                                | ไฟล์                                                                                                          |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| ตารางสัญญาณ + การจับคู่                | `open-sse/services/accountFallback.ts`                                                                        |
| การกำหนดสถานะสิ้นสุด / การคงข้อมูล     | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| ขอบเขตการปิดใช้งานอัตโนมัติ            | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| การจำแนกประเภทแบบอินไลน์               | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| การยกเว้นการกู้คืนสถานะสิ้นสุด         | `src/lib/quota/connectionRecovery.ts`                                                                         |
| การโหลดคีย์เวิร์ดแบบกำหนดเองขณะรันไทม์ | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| UI การตั้งค่า                          | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
