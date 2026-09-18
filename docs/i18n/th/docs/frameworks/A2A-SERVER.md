# OmniRoute A2A Server Documentation (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute ในฐานะเอเจนต์กำหนดเส้นทางอัจฉริยะ

พื้นผิว A2A มีสองรูปแบบ:

- **JSON-RPC 2.0** ที่ `POST /a2a` (จุดเริ่มต้นมาตรฐาน ซึ่งกำหนดไว้ใน `src/app/a2a/route.ts`)
- **REST** ภายใต้ `/api/a2a/*` สำหรับแดชบอร์ดและเครื่องมือต่าง ๆ (สถานะ รายการงาน การยกเลิก)

งานต่าง ๆ ได้รับการติดตามโดย `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL เริ่มต้น 5 นาที) ส่วนสกิลต่าง ๆ จะถูกส่งต่อผ่าน `A2A_SKILL_HANDLERS` ใน `src/lib/a2a/taskExecution.ts`

## การค้นพบเอเจนต์

```bash
curl http://localhost:20128/.well-known/agent.json
```

ส่งคืน Agent Card ที่อธิบายความสามารถ สกิล และข้อกำหนดด้านการตรวจสอบสิทธิ์ของ OmniRoute

ฟิลด์ `version` ของ Agent Card ดึงค่ามาจาก `process.env.npm_package_version` (ดู `src/app/.well-known/agent.json/route.ts:13`) จึงซิงค์กับ `package.json` โดยอัตโนมัติในทุกรีลีส

---

## การตรวจสอบสิทธิ์

คำขอทั้งหมดไปยัง `/a2a` ต้องใช้คีย์ API ผ่านส่วนหัว `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

หากไม่มีการกำหนดค่าคีย์ API บนเซิร์ฟเวอร์ ระบบจะข้ามการตรวจสอบสิทธิ์

## การเปิดใช้งาน

A2A ควบคุมด้วยสวิตช์ **Endpoints → A2A** และปิดใช้งานตามค่าเริ่มต้น เมื่อปิดใช้งาน
`GET /api/a2a/status` จะรายงาน `status: "disabled"` และ `online: false`; การเรียก JSON-RPC ไปยัง
`POST /a2a` จะส่งคืน HTTP 503 พร้อมรหัสข้อผิดพลาด JSON-RPC `-32000`

---

## เมธอด JSON-RPC 2.0

### `message/send` — การดำเนินการแบบซิงโครนัส

ส่งข้อความไปยังสกิลและรอการตอบกลับที่สมบูรณ์

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

**การตอบกลับ:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "cost_envelope": {
        "estimated": 0.005,
        "actual": 0.003,
        "currency": "USD"
      },
      "resilience_trace": [
        {
          "event": "primary_selected",
          "provider": "anthropic",
          "timestamp": "..."
        }
      ],
      "policy_verdict": {
        "allowed": true,
        "reason": "within budget and quota limits"
      }
    }
  }
}
```

### `message/stream` — การสตรีมผ่าน SSE

ทำงานเหมือนกับ `message/send` แต่ส่งคืน Server-Sent Events สำหรับการสตรีมแบบเรียลไทม์

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**อีเวนต์ SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — ตรวจสอบสถานะงาน

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — ยกเลิกงาน

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## ทักษะที่พร้อมใช้งาน

OmniRoute เปิดให้ใช้งานทักษะ A2A จำนวน 6 รายการที่เชื่อมโยงไว้ใน `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` โดยโมดูลของแต่ละทักษะอยู่ใน `src/lib/a2a/skills/`

| ทักษะ                   | ID                   | คำอธิบาย                                                                                                                                                                     | แท็ก                          | ตัวอย่าง                                         |
| :---------------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------- | :----------------------------------------------- |
| การกำหนดเส้นทางอัจฉริยะ | `smart-routing`      | กำหนดเส้นทางพรอมต์ผ่านผู้ให้บริการ/ชุดค่าผสมที่เหมาะสมที่สุดโดยใช้กลไกชุดค่าผสมและการให้คะแนนของ OmniRoute                                                                   | การกำหนดเส้นทาง, ผู้ให้บริการ | "กำหนดเส้นทางพรอมต์นี้ผ่านโมเดลที่ดีที่สุด"      |
| การจัดการโควตา          | `quota-management`   | รายงานสถานะโควตาของผู้ให้บริการแต่ละราย และช่วยผู้เรียกตัดสินใจว่าควรจำกัดอัตรา/สลับผู้ให้บริการเมื่อใด                                                                      | โควตา, ผู้ให้บริการ           | "ตรวจสอบโควตาสำหรับ anthropic"                   |
| การค้นหาผู้ให้บริการ    | `provider-discovery` | แสดงรายการผู้ให้บริการที่ติดตั้งไว้ พร้อมความสามารถ สถานะระดับฟรี และสถานะ OAuth                                                                                             | ผู้ให้บริการ, การค้นหา        | "มีผู้ให้บริการใดพร้อมใช้งานบ้าง?"               |
| การวิเคราะห์ต้นทุน      | `cost-analysis`      | ประมาณการต้นทุนของคำขอ/การสนทนาโดยอ้างอิงจากแค็ตตาล็อกและการใช้งานล่าสุด                                                                                                     | ต้นทุน, การใช้งาน             | "ประมาณการต้นทุนสำหรับการสนทนานี้"               |
| รายงานสถานภาพ           | `health-report`      | รวบรวมสถานะเซอร์กิตเบรกเกอร์ คูลดาวน์ และการล็อกเอาต์ของผู้ให้บริการแต่ละราย                                                                                                 | สถานภาพ, ความทนทาน            | "แสดงสถานะความพร้อมใช้งานของผู้ให้บริการทั้งหมด" |
| แสดงรายการความสามารถ    | `list-capabilities`  | ส่งคืนแค็ตตาล็อก Agent Skills แบบเต็มจำนวน 45 รายการ (API 23 รายการ + CLI 21 รายการ + การกำหนดค่า 1 รายการ) เป็นตารางมาร์กดาวน์ พร้อม URL ดิบของ SKILL.md สำหรับการแทรกบริบท | แค็ตตาล็อก, การค้นหา, ทักษะ   | "แสดงความสามารถทั้งหมดของ OmniRoute"             |

> ควรรักษา Agent Card ให้สอดคล้องกับแค็ตตาล็อกผู้ให้บริการจริงจำนวน 352 ราย โดยจำนวนผู้ให้บริการและเมทาดาทาเกี่ยวกับการใช้งานฟรี/ไม่ต้องยืนยันตัวตนมีที่มาจากรีจิสทรีขณะรันไทม์

### รายละเอียดทักษะ `list-capabilities`

ทักษะ `list-capabilities` มีประโยชน์เป็นพิเศษสำหรับเอเจนต์ภายนอกที่ต้องการค้นหาว่า OmniRoute เปิดให้ใช้งานอะไรบ้างก่อนส่งคำขอ API โดยจะส่งคืนอาร์ติแฟกต์ตารางมาร์กดาวน์ที่มีโครงสร้าง:

```
| ID | ชื่อ | หมวดหมู่ | ขอบเขต | เอนด์พอยต์/คำสั่ง | URL ดิบ |
| --- | --- | --- | --- | --- | --- |
| omni-auth | การยืนยันตัวตนและเซสชัน | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

แต่ละแถวมีคอลัมน์ `rawUrl` เพื่อให้เอเจนต์สามารถดึงไฟล์ SKILL.md ฉบับเต็มได้ทันที ฟิลด์ `metadata.totalSkills` สอดคล้องกับขนาดของแค็ตตาล็อก (ปัจจุบันคือ 45) การนำไปใช้: `src/lib/a2a/skills/listCapabilities.ts` โปรดดูเพิ่มเติมที่ [AGENT-SKILLS.md](./AGENT-SKILLS.md)

---

## REST API (ส่วนเสริม)

ปลายทาง JSON-RPC `/a2a` คือจุดเข้าสู่ A2A หลัก ปลายทาง REST ด้านล่างให้การเข้าถึงเพิ่มเติมสำหรับแดชบอร์ดและเครื่องมือภายนอก:

| ปลายทาง                      | เมธอด | คำอธิบาย                                                        | การยืนยันตัวตน                                     |
| :--------------------------- | :---- | :-------------------------------------------------------------- | :------------------------------------------------- |
| `/api/a2a/status`            | GET   | สถานะเซิร์ฟเวอร์และสกิลที่ลงทะเบียนไว้                          | (สาธารณะ)                                          |
| `/api/a2a/tasks`             | GET   | แสดงรายการงานพร้อมตัวกรอง                                       | การจัดการ                                          |
| `/api/a2a/tasks/[id]`        | GET   | รับงานตาม ID                                                    | การจัดการ                                          |
| `/api/a2a/tasks/[id]/cancel` | POST  | ยกเลิกงานที่กำลังทำงานอยู่                                      | การจัดการ                                          |
| `/.well-known/agent.json`    | GET   | Agent Card (การค้นหา A2A)                                       | (สาธารณะ, แคช 3600s)                               |
| `/api/a2a/tasks`             | POST  | การมอบหมายงานขาเข้าให้กับฟลีต OmniConductor (Conductor PRD RF5) | Bearer เทียบกับ `OMNIROUTE_API_KEY` + `a2aEnabled` |

**การมอบหมายงาน Conductor ขาเข้า (`POST /api/a2a/tasks`):** เอเจนต์ A2A ภายนอกมอบหมายงานเขียนโค้ดให้กับฟลีต OmniConductor ผ่าน OmniRoute เนื้อหาคำขอ: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — มอบหมายได้เฉพาะสกิลของฟลีต Conductor (สกิลที่ประกาศไว้ใน Agent Card) เท่านั้น; จำเป็นต้องระบุ `metadata.conductor.repo.url` (ฟลีตทำงานกับรีโพ git) เส้นทางนี้จะแปลงเป็น `POST /v1/tasks` ของฮับโดยใช้ `CONDUCTOR_ORCHESTRATOR_TOKEN` ฝั่งเซิร์ฟเวอร์ (สำรองด้วย `CONDUCTOR_HUB_TOKEN`) และส่งคืน `201 { conductor_task_id, state: "submitted" }`; สถานะงานจะไหลกลับผ่านมิเรอร์ SSE→A2A (RF1) และดูได้ผ่าน `GET /api/a2a/tasks?skill=conductor`

---

## การเพิ่มสกิลใหม่

1. **สร้างไฟล์สกิล:** `src/lib/a2a/skills/<your-skill>.ts`

   ส่งออกฟังก์ชัน async `(task: A2ATask) => Promise<{ artifacts, metadata }>` ให้เป็นไปตามโครงสร้างของสกิลที่มีอยู่ เช่น `smartRouting.ts`

2. **ลงทะเบียนแฮนด์เลอร์:** ใน `src/lib/a2a/taskExecution.ts` ให้เพิ่มรายการลงใน `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...สกิลที่มีอยู่
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **แสดงใน Agent Card:** ใน `src/app/.well-known/agent.json/route.ts` ให้เพิ่มต่อท้ายอาร์เรย์ `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "สกิลของคุณ",
     "description": "คำอธิบายสั้น ๆ ที่มุ่งเน้นเจตนา",
     "tags": ["การกำหนดเส้นทาง", "โควตา"],
     "examples": ["ตัวอย่างการเรียกใช้ด้วยภาษาธรรมชาติ"]
   }
   ```

4. **เขียนการทดสอบ:** `tests/unit/a2a-<your-skill>.test.ts` ให้ครอบคลุมทั้งกรณีสำเร็จ + กรณีข้อผิดพลาด

5. **จัดทำเอกสาร** สำหรับสกิลใหม่ในตาราง `Available Skills` ของไฟล์นี้

---

## TTL ของงาน

งานจะหมดอายุหลังจาก `ttlMinutes` (ค่าเริ่มต้น 5 นาที) — กำหนดค่าใน constructor ของ `A2ATaskManager` ที่ `src/lib/a2a/taskManager.ts:82` หากต้องการปรับแต่ง ให้ fork การสร้างอินสแตนซ์ `A2ATaskManager` และส่งค่าอื่นเข้าไป (เช่น `new A2ATaskManager(15)` สำหรับ TTL 15 นาที) โดย interval ที่ทำงานเบื้องหลังจะตรวจสอบและกวาดงานที่หมดอายุทุก 60 วินาที

---

## วงจรชีวิตของงาน

```
ส่งแล้ว → กำลังทำงาน → เสร็จสมบูรณ์
                       → ล้มเหลว
                       → ยกเลิกแล้ว
```

- โดยค่าเริ่มต้น งานจะหมดอายุหลังจาก 5 นาที (ดู [TTL ของงาน](#task-ttl))
- สถานะสิ้นสุด: `completed`, `failed`, `cancelled`
- บันทึกเหตุการณ์จะติดตามการเปลี่ยนสถานะทุกครั้ง

---

## รหัสข้อผิดพลาด

| รหัส   | ความหมาย                                      |
| :----- | :-------------------------------------------- |
| -32700 | ข้อผิดพลาดในการแยกวิเคราะห์ (JSON ไม่ถูกต้อง) |
| -32600 | คำขอไม่ถูกต้อง / ไม่ได้รับอนุญาต              |
| -32601 | ไม่พบเมธอดหรือทักษะ                           |
| -32602 | พารามิเตอร์ไม่ถูกต้อง                         |
| -32603 | ข้อผิดพลาดภายใน                               |
| -32000 | ปิดใช้งาน endpoint A2A                        |

---

## ตัวอย่างการผสานการทำงาน

### Python (requests)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (fetch)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
