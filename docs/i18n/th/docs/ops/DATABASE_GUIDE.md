# Database Schema & Operations Guide (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **สรุปสั้นๆ**: OmniRoute ใช้ **SQLite พร้อมการทำเจอร์นัลแบบ WAL** เป็นพื้นที่จัดเก็บหลัก และใช้การเข้ารหัส **AES-256-GCM** สำหรับข้อมูลสำคัญที่จัดเก็บอยู่ คู่มือนี้ครอบคลุมสคีมา การย้ายข้อมูล การสำรอง/กู้คืน และคู่มือปฏิบัติงาน

**แหล่งอ้างอิง:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (ตารางพื้นฐาน 17 ตาราง)
- `src/lib/db/migrationRunner.ts` — การย้ายข้อมูลแบบกำหนดเวอร์ชัน
- `src/lib/db/migrations/` — ไฟล์ SQL แบบกำหนดเวอร์ชัน 167 ไฟล์
- `src/lib/db/encryption.ts` — ฟังก์ชันช่วยสำหรับการเข้ารหัส
- `src/lib/db/backup.ts` — การส่งออก/นำเข้าข้อมูลสำรอง
- `src/lib/db/healthCheck.ts` — การวินิจฉัยสถานะระบบ

---

## ทำไมจึงเลือก SQLite?

OmniRoute เลือก SQLite แทน PostgreSQL/MySQL ด้วยเหตุผลหลายประการ:

| ปัจจัย               | SQLite                                    | PostgreSQL                                 |
| -------------------- | ----------------------------------------- | ------------------------------------------ |
| **การปรับใช้**       | ฝังในตัว — ไม่ต้องมีเซิร์ฟเวอร์แยกต่างหาก | ต้องตั้งค่าเซิร์ฟเวอร์                     |
| **การเข้ารหัส**      | ระดับแอปพลิเคชัน (AES-256-GCM)            | TDE ในตัว                                  |
| **ประสิทธิภาพ**      | เร็วกว่าสำหรับเวิร์กโหลดขนาดเล็ก/ปานกลาง  | เหมาะกว่าสำหรับการเขียนพร้อมกันจำนวนมหาศาล |
| **การทำงานพร้อมกัน** | โหมด WAL รองรับการอ่านพร้อมกัน            | MVCC เต็มรูปแบบ                            |
| **การสำรองข้อมูล**   | คัดลอกไฟล์เดียว                           | `pg_dump` หรือสแนปช็อตระบบไฟล์             |
| **กรณีใช้งาน**       | การติดตั้งต่อผู้ใช้, แบบฝังในตัว          | SaaS แบบหลายผู้เช่า                        |

สำหรับการปรับใช้แบบ **ผู้ใช้คนเดียว อินสแตนซ์เดียว** (กรณีใช้งานหลักของ OmniRoute) SQLite เรียบง่ายและรวดเร็วกว่า

### การทำเจอร์นัลแบบ WAL

`core.ts` เปิดฐานข้อมูลด้วย **โหมด WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL รองรับ **การอ่านพร้อมกัน** ระหว่างการเขียน ซึ่งสำคัญสำหรับแดชบอร์ดที่เรียกค้นข้อมูลในขณะที่กำลังบันทึกคำขอ

ขนาดแคชเริ่มต้นคือ **65,536 KiB (64 MiB)** SQLite ตีความค่า
`cache_size` ที่เป็นค่าลบว่าเป็นขีดจำกัดบนโดยประมาณในหน่วย KiB และจัดสรรเพจตามความต้องการ
**การตั้งค่า > ระบบและพื้นที่จัดเก็บ > ขนาดแคช** รองรับค่าจำนวนเต็มตั้งแต่ **1 ถึง
1,000,000 KiB** การบันทึกการตั้งค่าจะนำค่านั้นไปใช้กับการเชื่อมต่อฐานข้อมูลที่กำลังทำงานอยู่
และ OmniRoute จะคืนค่าที่บันทึกไว้เมื่อเริ่มต้นระบบ

---

## ตำแหน่งฐานข้อมูล

ไฟล์ SQLite ถูกจัดเก็บไว้ที่:

| ระบบปฏิบัติการ | พาธ                                                     |
| -------------- | ------------------------------------------------------- |
| Linux          | `~/.omniroute/storage.sqlite`                           |
| macOS          | `~/.omniroute/storage.sqlite`                           |
| Windows        | `%USERPROFILE%\.omniroute\storage.sqlite`               |
| Docker         | `/app/data/storage.sqlite` (กำหนดค่าได้ผ่าน `DATA_DIR`) |

ไฟล์และไดเรกทอรีประกอบ:

- `storage.sqlite-wal` — บันทึกแบบ write-ahead
- `storage.sqlite-shm` — ไฟล์หน่วยความจำร่วม
- `call_logs/` — อาร์ติแฟกต์เพย์โหลดของคำขอ (หากเปิดใช้งาน)

**กำหนดตำแหน่งอื่น:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## สถาปัตยกรรมโมดูลโดเมน

ฐานข้อมูลของ OmniRoute มี **โมดูล TypeScript ระดับบนสุด 110 โมดูล** ใน `src/lib/db/` โดยแต่ละโมดูลโดเมน:

- เป็นเจ้าของตารางที่ระบุอย่างน้อยหนึ่งตาราง
- ส่งออกฟังก์ชัน CRUD ที่มีการกำหนดชนิดข้อมูล
- ไม่เข้าถึงตารางของโมดูลอื่น
- ใช้ `getDbInstance()` จาก `core.ts` เพื่อเข้าถึงฐานข้อมูล

### โมดูลฐานข้อมูลระดับบนสุดทั้ง 110 โมดูล

OmniRoute มี **ไฟล์ TypeScript ระดับบนสุด 110 ไฟล์** ใน `src/lib/db/` ด้านล่างคือตัวอย่างโมดูลหลัก โปรดดูรายการไดเรกทอรีสำหรับรายการทั้งหมด:

| โมดูล                   | ตาราง                                                          | ความรับผิดชอบ                                                             |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | การลงทะเบียนและข้อมูลรับรองของผู้ให้บริการด้วย OAuth/API key              |
| `models.ts`             | `key_value` (ข้อมูลโมเดล)                                      | นิยามโมเดล ความสามารถ และการกำหนดราคา                                     |
| `combos.ts`             | `combos`                                                       | การกำหนดค่าและลำดับการกำหนดเส้นทางแบบคอมโบ                                |
| `apiKeys.ts`            | `api_keys`                                                     | วงจรชีวิตของ API key ขอบเขตสิทธิ์ และการติดตามโควตา                       |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | การกำหนดค่าระบบและที่เก็บ KV ที่ใช้ร่วมกัน                                |
| `backup.ts`             | —                                                              | การดำเนินการส่งออก/นำเข้าข้อมูลสำรอง                                      |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | การกำหนดค่าพร็อกซีและกฎการกำหนดเส้นทาง                                    |
| `prompts.ts`            | `prompt_templates`                                             | เทมเพลตพรอมต์ที่นำกลับมาใช้ซ้ำได้และการจัดการเวอร์ชัน                     |
| `webhooks.ts`           | `webhooks`                                                     | การสมัครรับ webhook และบันทึกเหตุการณ์แบบขับเคลื่อนด้วยเหตุการณ์          |
| `detailedLogs.ts`       | `request_detail_logs`                                          | การบันทึกการตรวจสอบสำหรับแต่ละคำขอ (ไม่บังคับ ปริมาณสูง)                  |
| `domainState.ts`        | `domain_*` (5 ตาราง)                                           | งบประมาณของโดเมน ตัวตัดวงจร การล็อก การเชื่อมโยงการสำรอง และประวัติต้นทุน |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | API key ที่อนุญาตสำหรับ MCP/A2A                                           |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | ประวัติการใช้โควตา                                                        |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | จับคู่โมเดลกับค่าเริ่มต้นของคอมโบ                                         |
| `cliToolState.ts`       | `cli_tool_state`                                               | สถานะถาวรเฉพาะ CLI                                                        |
| `encryption.ts`         | —                                                              | ฟังก์ชันช่วยสำหรับเข้ารหัส/ถอดรหัสฟิลด์                                   |
| `readCache.ts`          | —                                                              | แคชในหน่วยความจำสำหรับการดำเนินการที่มีการอ่านจำนวนมาก                    |
| `secrets.ts`            | `key_value` (รายการที่เข้ารหัส)                                | พื้นที่จัดเก็บข้อมูลลับแบบเข้ารหัส                                        |
| `stateReset.ts`         | —                                                              | ล้าง/รีเซ็ตสถานะฐานข้อมูลสำหรับการทดสอบ                                   |
| `contextHandoffs.ts`    | `context_handoffs`                                             | บริบทเซสชันสำหรับการส่งต่องานระหว่างเอเจนต์                               |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | การติดตามการใช้งาน                                                        |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | การกำหนดค่าการบีบอัด                                                      |

### ขอบเขตของโมดูล

กฎหลักของสถาปัตยกรรมคือ: **โมดูลต้องไม่เข้าถึงตารางของกันและกันโดยตรง** หากต้องการทำงานกับข้อมูลของโมดูลอื่น ให้นำเข้าฟังก์ชันจากโมดูลนั้น

```ts
// ❌ ไม่ถูกต้อง: ใช้ SQL โดยตรงจากโมดูลอื่น
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ถูกต้อง: ใช้ฟังก์ชันจากโมดูล providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

กฎนี้บังคับใช้ผ่านการตรวจสอบโค้ด — ไม่มีการตรวจสอบแบบสแตติก แต่การละเมิดจะถูกแจ้งเตือน

---

## สคีมาพื้นฐาน (17 ตาราง)

`core.ts` กำหนดตารางพื้นฐาน 17 ตารางใน `SCHEMA_SQL` ตารางเหล่านี้ถูกสร้างโดยไมเกรชัน `001_initial_schema.sql` และประกอบเป็นสคีมาหลัก

### ตารางหลัก (สร้างในไมเกรชันเริ่มต้น)

| ตาราง                      | วัตถุประสงค์                             | คอลัมน์สำคัญ                                                            |
| -------------------------- | ---------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | ข้อมูลรับรองของผู้ให้บริการ (เข้ารหัส)   | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | ข้อมูลการกำหนดเส้นทางโหนดของผู้ให้บริการ | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | ที่เก็บ KV ทั่วไป                        | `namespace`, `key`, `value`                                             |
| `combos`                   | ข้อกำหนดคอมโบการกำหนดเส้นทาง             | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | คีย์ API สำหรับเกตเวย์                   | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | เมทาดาทาของฐานข้อมูล                     | `key`, `value`                                                          |
| `usage_history`            | ระเบียนการใช้งานของคำขอ                  | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | เพย์โหลดและการตอบกลับของคำขอ             | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | บันทึกคำขอพร็อกซี                        | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | เชนโมเดลไปยังผู้ให้บริการ                | `model`, `chain`                                                        |
| `domain_budgets`           | งบประมาณค่าใช้จ่ายต่อโดเมน               | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | ประวัติการรีเซ็ตงบประมาณ                 | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | การติดตามค่าใช้จ่ายต่อโดเมน              | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | สถานะการจำกัดอัตราของโดเมน               | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | สถานะเซอร์กิตเบรกเกอร์ต่อโดเมน           | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | แคชการตอบกลับของ LLM                     | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | สแนปช็อตโควตาในอดีต                      | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### ตารางเพิ่มเติม (เพิ่มโดยไมเกรชันภายหลัง)

ไมเกรชันถัดมาเพิ่มตารางต่าง ๆ เช่น:

- `cli_tool_state` (ไมเกรชัน 011) — สถานะเครื่องมือ CLI
- ตาราง `mcp_*` — การตรวจสอบเซิร์ฟเวอร์ MCP
- ตาราง `a2a_*` — สถานะงาน A2A
- ตาราง `usage_*` — การติดตามการใช้งาน
- ตาราง `plugin_*` — ระบบปลั๊กอิน
- `skill_executions` — ประวัติการดำเนินการของทักษะ
- ตาราง `memory_*` — ระบบหน่วยความจำ
- ตาราง `compression_*` — ระบบบีบอัด
- ตาราง `webhook_*` — บันทึกการส่งเว็บฮุก
- ตาราง `acp_*` — Agent Client Protocol
- ตาราง `oneproxy_*` — มาร์เก็ตเพลส 1proxy
- `proxy_assignments` — การผูกขอบเขตพร็อกซี
- `detailed_call_artifacts` — เมทาดาทาของอาร์ติแฟกต์บันทึกการเรียก
- `quota_alert_history` — การตรวจสอบการแจ้งเตือนโควตา
- `command_code_auth_sessions` — เซสชัน OAuth ของ Command Code

รายการตารางทั้งหมดกว่า 30 ตารางอยู่ใน `src/lib/db/migrations/`

---

## การย้ายข้อมูล

OmniRoute ใช้ **การย้ายข้อมูลแบบมีเวอร์ชันและทำซ้ำได้อย่างปลอดภัย** ใน `src/lib/db/migrations/` การย้ายข้อมูลแต่ละรายการเป็นไฟล์ SQL หนึ่งไฟล์ที่ตั้งชื่อในรูปแบบ `NNN_description.sql`

### การตั้งชื่อการย้ายข้อมูล

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### วิธีเรียกใช้การย้ายข้อมูล

เมื่อเริ่มต้นระบบ `migrationRunner.ts` จะ:

1. สร้างตาราง `_omniroute_migrations` หากยังไม่มี
2. ตรวจสอบการย้ายข้อมูลที่นำไปใช้แล้ว
3. นำการย้ายข้อมูลใหม่ทั้งหมดไปใช้ตามลำดับ โดยแต่ละรายการอยู่ภายในธุรกรรม
4. บันทึกการย้ายข้อมูลแต่ละรายการที่นำไปใช้พร้อมการประทับเวลา

```ts
// src/lib/db/migrationRunner.ts (ฉบับย่อ)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### ความสามารถในการทำซ้ำอย่างปลอดภัย

การย้ายข้อมูลต้อง **สามารถทำซ้ำได้อย่างปลอดภัย** — การเรียกใช้สองครั้งไม่ควรก่อให้เกิดการเปลี่ยนแปลงใดๆ:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

ใช้คำสั่ง `IF NOT EXISTS`, `IF EXISTS` และอนุประโยค `OR IGNORE` / `OR REPLACE` อย่างเต็มที่

### การเพิ่มการย้ายข้อมูลใหม่

1. **ระบุหมายเลขถัดไป**: `ls src/lib/db/migrations/ | tail -1`
2. **สร้างไฟล์**: `NNN_my_change.sql`
3. **ใช้ DDL ที่ปลอดภัย**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **เติมข้อมูลย้อนหลังอย่างระมัดระวัง**: ใช้ `UPDATE ... WHERE ...` เพื่อจัดการแถวที่มีอยู่
5. **ทดสอบกับสำเนา**: ห้ามเรียกใช้การย้ายข้อมูลที่ยังไม่ได้ทดสอบบนระบบที่ใช้งานจริง

ตัวอย่าง:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **การเปลี่ยนแปลงที่ไม่รองรับความเข้ากันได้ย้อนหลัง** (เช่น การลบคอลัมน์) มีความซับซ้อน OmniRoute ไม่รองรับการปรับลดเวอร์ชัน — เมื่อใช้การย้ายข้อมูลแล้ว การเปลี่ยนแปลงสคีมาจะมีผลถาวร โปรดวางแผนให้เหมาะสม

---

## การเข้ารหัสข้อมูลขณะจัดเก็บ

ฟิลด์ที่ละเอียดอ่อน (คีย์ API, โทเค็น OAuth, สตริงการเชื่อมต่อ) จะได้รับการเข้ารหัสขณะจัดเก็บด้วย **AES-256-GCM**

### วิธีการทำงาน

```ts
// src/lib/db/encryption.ts (ฉบับย่อ)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### ตำแหน่งที่ใช้งาน

- `provider_connections.api_key` — เข้ารหัสในระดับแอปพลิเคชัน
- `provider_connections.access_token`, `refresh_token`, `id_token` — เข้ารหัสในระดับแอปพลิเคชัน
- รายการ `key_value` ที่มี `namespace = "secrets"` — เข้ารหัสในระดับแอปพลิเคชัน
- `proxy_registry.auth` — เข้ารหัสในระดับแอปพลิเคชัน (หากมี)

### คีย์การเข้ารหัส

คีย์การเข้ารหัสจะถูกสร้างจาก **วลีรหัสผ่าน** (ตั้งค่าผ่านตัวแปรสภาพแวดล้อม `STORAGE_ENCRYPTION_KEY`) และ **salt** (จัดเก็บไว้ในฐานข้อมูล) โดยจำเป็นต้องมีทั้งสองอย่างเพื่อถอดรหัสข้อมูล

```bash
# สร้างวลีรหัสผ่านที่ปลอดภัย
openssl rand -hex 32

# ตั้งค่าใน .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **สำคัญอย่างยิ่ง**: การทำคีย์การเข้ารหัสสูญหายหมายถึงการสูญเสียสิทธิ์เข้าถึงข้อมูลที่เข้ารหัสทั้งหมด **สำรองคีย์แยกจากฐานข้อมูล**

### สิ่งที่ไม่ได้เข้ารหัส

เพื่อประสิทธิภาพ ข้อมูลต่อไปนี้จะถูกจัดเก็บเป็นข้อความธรรมดา:

- ชื่อที่ใช้แสดงของผู้ให้บริการ
- ข้อกำหนดโมเดล (เป็นข้อมูลสาธารณะอยู่แล้ว)
- กฎการกำหนดเส้นทาง
- บันทึกการใช้งาน (ไม่มี PII)

---

## ข้อควรระวังเกี่ยวกับการเข้ารหัส (v3.8.16+)

OmniRoute ใช้ **`migrateLegacyEncryptedString()`** เพื่อรองรับรูปแบบการเข้ารหัสสองแบบอย่างโปร่งใส:

- **แบบเดิม** (ก่อน v3.5.0): "การเข้ารหัส" ที่ใช้ XOR (ไม่ใช่การเข้ารหัสที่แท้จริง)
- **แบบปัจจุบัน**: AES-256-GCM พร้อม IV และแท็กยืนยันความถูกต้องที่เหมาะสม

ตัวช่วยย้ายข้อมูลจะตรวจจับรูปแบบเดิมและเข้ารหัสใหม่ด้วยรูปแบบใหม่เมื่ออ่านครั้งแรก ซึ่งหมายความว่าคุณสามารถอัปเกรดฐานข้อมูลเก่าได้โดยไม่สูญเสียข้อมูลประจำตัว

---

## แคชสำหรับการอ่าน

สำหรับข้อมูลที่มีการอ่านบ่อย (โมเดล ผู้ให้บริการ และการตั้งค่า) `readCache.ts` มี **แคชในหน่วยความจำ**:

```ts
// แคชเมื่อเริ่มต้น และทำให้ใช้ไม่ได้เมื่อมีการเขียน
const providers = await getCachedProviders(); // รวดเร็ว อยู่ในหน่วยความจำ
const fresh = await listProviders(); // ช้า เข้าถึงฐานข้อมูล
```

| เอนทิตีที่แคชไว้       | คีย์แคช        | TTL                |
| ---------------------- | -------------- | ------------------ |
| `models`               | `models:v1`    | จนกว่าจะมีการเขียน |
| `provider_connections` | `providers:v1` | จนกว่าจะมีการเขียน |
| `settings`             | `settings:v1`  | จนกว่าจะมีการเขียน |
| `combos`               | `combos:v1`    | จนกว่าจะมีการเขียน |

แคชจะถูกทำให้ใช้ไม่ได้ทุกครั้งที่มีการเขียนไปยังตารางที่เกี่ยวข้อง

---

## การสำรองและการกู้คืน

### การสำรองข้อมูลด้วยตนเอง

```bash
# ใช้ CLI เพื่อสร้างข้อมูลสำรองในเครื่อง
omniroute backup create --name pre-migration

# หรือผ่าน API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

ไฟล์สำรองประกอบด้วย:

- ตารางฐานข้อมูลทั้งหมด (ทำให้เป็นอนุกรมในรูปแบบ JSON)
- อาร์ติแฟกต์บันทึกการเรียก (เข้ารหัสแบบ base64 และเลือกเปิดใช้ได้)
- การตั้งค่า + ข้อมูลลับ (เข้ารหัสแล้ว)
- การกำหนดค่าปลั๊กอิน

### การกู้คืน

```bash
# ผ่าน CLI
omniroute restore pre-migration

# ผ่าน API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **คำเตือน**: การกู้คืนจะเขียนทับฐานข้อมูลทั้งหมด โปรดหยุดไคลเอนต์ทั้งหมดก่อน

### การสำรองข้อมูลอัตโนมัติ

```bash
# เปิดใช้การสำรองข้อมูลรายวันอัตโนมัติผ่าน CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

กำหนดการจะถูกเรียกใช้ที่ฝั่งเซิร์ฟเวอร์โดยงานเบื้องหลังซึ่งทำงานทุก 30 วินาที
(ค่าเริ่มต้น) และประเมินนิพจน์ cron เทียบกับเวลาท้องถิ่นของเซิร์ฟเวอร์

| ตัวแปร                                      | ค่าเริ่มต้น | คำอธิบาย                                                                                                                   |
| ------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`     | ช่วงเวลาการทำงานในหน่วย ms (ขั้นต่ำ `5000`) ต้องสั้นกว่า 60 วินาทีเพื่อให้ทำงานภายในนาทีที่ตรงกับ cron ได้อย่างน่าเชื่อถือ |

### การสำรองข้อมูลแบบ Hot Backup ของ SQLite

สำหรับการสำรองฐานข้อมูลที่กำลังใช้งานโดยไม่มีช่วงหยุดให้บริการ:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

วิธีนี้ใช้ API สำรองข้อมูลออนไลน์ของ SQLite ซึ่งสามารถเรียกใช้ได้อย่างปลอดภัยขณะที่ OmniRoute กำลังทำงาน

---

## การปรับแต่งประสิทธิภาพ

### โหมด WAL

WAL เปิดใช้งานโดยค่าเริ่มต้น สำหรับเวิร์กโหลดที่มีการเขียนข้อมูลปริมาณมาก ให้พิจารณาการตั้งค่าต่อไปนี้:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- ทำ checkpoint ทุก 1000 หน้า
PRAGMA journal_size_limit = 67108864;  -- จำกัดขนาด WAL ที่ 64MB
```

### ดัชนี

ดัชนีสำคัญสำหรับประสิทธิภาพ (สร้างโดยอัตโนมัติผ่าน migration):

- `idx_models_provider` — ค้นหาโมเดลตามผู้ให้บริการ
- `idx_combo_targets_combo_id` — ขยายเป้าหมายของ combo
- `idx_usage_history_api_key_timestamp` — วิเคราะห์การใช้งาน
- `idx_quota_snapshots_api_key_window` — ติดตามโควตา
- `idx_call_logs_timestamp` — คิวรีบันทึกการเรียกใช้

หากต้องการเพิ่มดัชนีใหม่ ให้สร้าง migration:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O แบบแมปหน่วยความจำ

สำหรับฐานข้อมูลขนาดใหญ่มาก (>10GB) สามารถปรับการแมปหน่วยความจำผ่าน pragma ของ SQLite ได้:

```sql
-- ตั้งค่าผ่าน pragma ของ SQLite (ปรับใน core.ts หรือขณะรันไทม์)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### การกระชับฐานข้อมูล

อินสแตนซ์ OmniRoute ที่ทำงานเป็นเวลานานจะได้รับประโยชน์จากการเรียกใช้ `VACUUM` เป็นครั้งคราว:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

เรียกใช้ทุกเดือนในช่วงที่มีทราฟฟิกต่ำ (โหมด WAL ช่วยลดความจำเป็น แต่ไม่ได้ขจัดความจำเป็นทั้งหมด)

---

## การตรวจสอบสถานะ

`src/lib/db/healthCheck.ts` ให้บริการ **การวินิจฉัยสถานะระดับฐานข้อมูล**:

HTTP verb ทั้งสองต้องมีการยืนยันตัวตน (มิฉะนั้นจะได้รับ `401`) `GET` ใช้สำหรับวินิจฉัยเท่านั้น ส่วน `POST` จะเรียกใช้
การตรวจสอบเดียวกันโดยเปิดใช้งาน `autoRepair`

```bash
GET  /api/db/health   # วินิจฉัย
POST /api/db/health   # วินิจฉัย + ซ่อมแซม
```

การตอบกลับคือ `DbHealthCheckResult` ที่สร้างโดย `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "งบประมาณโดเมนอ้างอิง API key ที่ไม่มีอยู่อีกต่อไป",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| ฟิลด์             | ความหมาย                                                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isHealthy`       | เป็น `true` เมื่อ `issues` ว่างเปล่า โดย `driver` จะไม่มีผลต่อค่านี้                                                                                               |
| `issues[].type`   | เป็นหนึ่งในค่า `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`                                                                     |
| `repairedCount`   | จำนวนแถวที่ซ่อมแซมระหว่างการเรียกใช้ครั้งนี้ และจะเป็น `0` เสมอเมื่อ `autoRepair` เป็น false                                                                       |
| `backupCreated`   | ระบุว่ามีการสำรองข้อมูลก่อนซ่อมแซมหรือไม่                                                                                                                          |
| `checkedAt`       | การประทับเวลาแบบ ISO ที่ใช้ร่วมกันระหว่างการเรียกใช้กับหมายเหตุการซ่อมแซมที่ถูกเขียนขึ้น                                                                           |
| `driver.name`     | ไดรเวอร์ SQLite ที่ให้บริการฐานข้อมูลซึ่งถูกตรวจสอบ                                                                                                                |
| `driver.degraded` | เป็น `true` เมื่อการเขียนไม่ได้รับการสำรองลงในไฟล์ฐานข้อมูลอย่างคงทน — กรณี fallback แบบ WASM ของ `sql.js` (การคงอยู่ของข้อมูลทั้งไฟล์) หรือฐานข้อมูลในหน่วยความจำ |

เครื่องมือ MCP `omniroute_db_health_check` จะส่งคืนเพย์โหลดเดียวกัน

เรียกใช้ `PRAGMA integrity_check` เพื่อตรวจหาความเสียหาย:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# ควรแสดงผล: ok
```

หากส่งคืนค่าอื่นนอกเหนือจาก `ok` ให้ **หยุดใช้ฐานข้อมูลทันที** และกู้คืนจากข้อมูลสำรอง

---

## การกู้คืนจากภัยพิบัติ

### สถานการณ์ที่ 1: ไฟล์ WAL สูญหาย

ไฟล์ `-wal` หายไป แต่ไฟล์ `-shm` และฐานข้อมูลหลักยังคงสมบูรณ์:

```bash
# กู้คืนโดยอัตโนมัติเมื่อเปิดครั้งถัดไป
omniroute
```

หาก SQLite ไม่สามารถกู้คืนโดยอัตโนมัติได้:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### สถานการณ์ที่ 2: ไฟล์ฐานข้อมูลหลักเสียหาย

กู้คืนจากข้อมูลสำรอง:

```bash
omniroute sync pull --merge   # หรือ: omniroute backup restore <backup-id>
```

### สถานการณ์ที่ 3: คีย์เข้ารหัสสูญหาย

**ไม่สามารถกู้คืนได้** หากไม่มีคีย์ ฟิลด์ที่เข้ารหัสไว้จะไม่สามารถอ่านได้ ให้เพิ่มผู้ให้บริการทั้งหมดอีกครั้งด้วยข้อมูลประจำตัวชุดใหม่ด้วยตนเอง

> **การลดความเสี่ยง**: สำรองคีย์เข้ารหัสแยกต่างหากเสมอ โดยควรเก็บไว้ในโปรแกรมจัดการรหัสผ่านหรือ KMS

### สถานการณ์ที่ 4: ดิสก์เต็ม

SQLite จะส่งคืนข้อผิดพลาด `SQLITE_FULL` ให้เพิ่มพื้นที่ว่างบนดิสก์ จากนั้นเรียกใช้:

```bash
# ทำ checkpoint ให้ WAL เพื่อเพิ่มพื้นที่ว่าง
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## การดำเนินการทั่วไป

### ตรวจสอบตาราง

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### นับแถวในทุกตาราง

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### รีเซ็ต (ล้าง) ข้อมูลทั้งหมด

```bash
# หยุด OmniRoute ก่อน
omniroute stop

# ลบไฟล์ฐานข้อมูล
rm ~/.omniroute/storage.sqlite*

# เริ่มใหม่ (ระบบจะสร้างฐานข้อมูลว่างขึ้นมาใหม่)
omniroute
```

สำหรับการรีเซ็ตแบบ **เลือกเฉพาะส่วน** (เก็บผู้ให้บริการไว้ แต่ล้างข้อมูลการใช้งาน):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### ส่งออกตารางเดียว

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## การแก้ไขปัญหา

### "ฐานข้อมูลถูกล็อก"

มีกระบวนการอื่นกำลังถือ write lock อยู่ ให้ดำเนินการอย่างใดอย่างหนึ่ง:

- รอให้กระบวนการอื่นทำงานเสร็จ (ตรวจสอบด้วย `lsof | grep storage.sqlite`)
- ยุติกระบวนการอื่น
- หากปัญหายังคงอยู่ ให้เริ่ม OmniRoute ใหม่

### "ข้อจำกัดของ foreign key ล้มเหลว"

โมดูลโดเมนกำลังละเมิดความสมบูรณ์ของการอ้างอิง ให้ตรวจสอบ:

- แถวที่ไม่มีข้อมูลแม่ในตารางที่ขึ้นต่อกัน
- การลบแบบต่อเนื่องที่ไม่ส่งผลต่อไปยังข้อมูลที่เกี่ยวข้อง
- การย้ายข้อมูลล่าสุดที่เปลี่ยน foreign key

เรียกใช้ `PRAGMA foreign_key_check;` เพื่อค้นหาการละเมิด

### "หน่วยความจำไม่เพียงพอ"

I/O แบบ memory-mapped ของ SQLite ใช้หน่วยความจำเกินขีดจำกัดของระบบปฏิบัติการ ให้ลดค่าผ่าน pragma ของ SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB แทน 256MB
```

หรือปิดใช้งาน:

```sql
PRAGMA mmap_size = 0;
```

### "การย้ายข้อมูลล้มเหลวระหว่างดำเนินการ"

การย้ายข้อมูลทำงานภายใน transaction ดังนั้นจึงควรถูกย้อนกลับแล้ว หากไม่เป็นเช่นนั้น:

1. **หยุด OmniRoute** (ป้องกันการพยายามดำเนินการเพิ่มเติม)
2. **ตรวจสอบสถานะฐานข้อมูล** ด้วย `sqlite3`
3. **แก้ไข** การย้ายข้อมูลบางส่วนด้วยตนเอง
4. **เรียกใช้** OmniRoute อีกครั้ง (ระบบจะลองย้ายข้อมูลอีกครั้ง)

เพื่อป้องกันปัญหานี้ ให้ทดสอบการย้ายข้อมูลกับสำเนาก่อนเสมอ

---

## ดูเพิ่มเติม

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — ตารางการใช้งาน
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — การตรวจสอบสถานะระบบ
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — กระบวนการเผยแพร่
- ซอร์ส: `src/lib/db/` (ไฟล์มากกว่า 80 ไฟล์, LOC ประมาณ 25K)
