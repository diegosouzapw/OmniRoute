# OmniRoute A2A Server Documentation (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Protokol Agent-ke-Agent v0.3 — OmniRoute sebagai agen penghalaan pintar

Permukaan A2A mempunyai dua antara muka:

- **JSON-RPC 2.0** di `POST /a2a` (titik masuk kanonik, ditakrifkan dalam `src/app/a2a/route.ts`).
- **REST** di bawah `/api/a2a/*` untuk papan pemuka dan alat bantu (status, senarai tugasan, pembatalan).

Tugasan dijejaki oleh `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL lalai 5 minit). Kemahiran dihantar melalui `A2A_SKILL_HANDLERS` dalam `src/lib/a2a/taskExecution.ts`.

## Penemuan Agen

```bash
curl http://localhost:20128/.well-known/agent.json
```

Mengembalikan Kad Agen yang menerangkan keupayaan, kemahiran dan keperluan pengesahan OmniRoute.

Medan `version` Kad Agen diperoleh daripada `process.env.npm_package_version` (lihat `src/app/.well-known/agent.json/route.ts:13`), maka ia kekal disegerakkan secara automatik dengan `package.json` pada setiap keluaran.

---

## Pengesahan

Semua permintaan `/a2a` memerlukan kunci API melalui pengepala `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Jika tiada kunci API dikonfigurasikan pada pelayan, pengesahan akan dipintas.

## Pengaktifan

A2A dikawal oleh togol **Titik Akhir → A2A** dan dinyahdayakan secara lalai. Apabila dinyahdayakan,
`GET /api/a2a/status` melaporkan `status: "disabled"` dan `online: false`; panggilan JSON-RPC ke
`POST /a2a` mengembalikan HTTP 503 dengan kod ralat JSON-RPC `-32000`.

---

## Kaedah JSON-RPC 2.0

### `message/send` — Pelaksanaan Segerak

Menghantar mesej kepada kemahiran dan menunggu respons lengkap.

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

**Respons:**

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

### `message/stream` — Penstriman SSE

Sama seperti `message/send`, tetapi mengembalikan Peristiwa Dihantar Pelayan untuk penstriman masa nyata.

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

**Peristiwa SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Menanyakan Status Tugasan

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Membatalkan Tugasan

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Kemahiran Tersedia

OmniRoute menyediakan 6 kemahiran A2A yang disambungkan dalam `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Setiap modul kemahiran terletak dalam `src/lib/a2a/skills/`.

| Kemahiran            | ID                   | Penerangan                                                                                                                                                         | Tag                          | Contoh                                      |
| :------------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------- | :------------------------------------------ |
| Penghalaan Pintar    | `smart-routing`      | Menghalakan prom melalui penyedia/gabungan optimum menggunakan enjin gabungan + pemarkahan OmniRoute                                                               | penghalaan, penyedia         | "Halakan prom ini melalui model terbaik"    |
| Pengurusan Kuota     | `quota-management`   | Melaporkan keadaan kuota bagi setiap penyedia, membantu pemanggil menentukan masa untuk mengehadkan kadar/bertukar                                                 | kuota, penyedia              | "Semak kuota untuk anthropic"               |
| Penemuan Penyedia    | `provider-discovery` | Menyenaraikan penyedia yang dipasang berserta keupayaan, penanda peringkat percuma dan status OAuth                                                                | penyedia, penemuan           | "Apakah penyedia yang tersedia?"            |
| Analisis Kos         | `cost-analysis`      | Menganggarkan kos permintaan/perbualan berdasarkan katalog + penggunaan terkini                                                                                    | kos, penggunaan              | "Anggarkan kos untuk perbualan ini"         |
| Laporan Kesihatan    | `health-report`      | Mengagregatkan keadaan pemutus litar, tempoh bertenang dan penguncian bagi setiap penyedia                                                                         | kesihatan, daya tahan        | "Tunjukkan status kesihatan semua penyedia" |
| Senaraikan Keupayaan | `list-capabilities`  | Mengembalikan katalog penuh 45 entri Kemahiran Ejen (23 API + 21 CLI + 1 konfigurasi) sebagai jadual markdown dengan URL mentah SKILL.md untuk penyuntikan konteks | katalog, penemuan, kemahiran | "Senaraikan semua keupayaan OmniRoute"      |

> Kad Ejen hendaklah sentiasa diselaraskan dengan katalog langsung yang mengandungi 352 penyedia; bilangan penyedia serta metadata percuma/tanpa pengesahan diperoleh daripada pendaftar masa jalan.

### Butiran Kemahiran `list-capabilities`

Kemahiran `list-capabilities` amat berguna untuk ejen luaran yang perlu mengetahui perkara yang disediakan oleh OmniRoute sebelum menghantar panggilan API. Ia mengembalikan artifak jadual markdown berstruktur:

```
| ID | Nama | Kategori | Bidang | Titik Akhir/Perintah | URL Mentah |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Pengesahan & Sesi | api | pengesahan | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Setiap baris menyertakan lajur `rawUrl` supaya ejen boleh mendapatkan SKILL.md penuh dengan serta-merta. Medan `metadata.totalSkills` mencerminkan saiz katalog (45 pada masa ini). Pelaksanaan: `src/lib/a2a/skills/listCapabilities.ts`. Lihat juga [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (tambahan)

Titik akhir JSON-RPC `/a2a` ialah titik masuk A2A kanonik. Titik akhir REST di bawah menyediakan akses tambahan untuk papan pemuka dan perkakas luaran:

| Titik akhir                  | Kaedah | Penerangan                                                         | Pengesahan                                           |
| :--------------------------- | :----- | :----------------------------------------------------------------- | :--------------------------------------------------- |
| `/api/a2a/status`            | GET    | Status pelayan, kemahiran berdaftar                                | (awam)                                               |
| `/api/a2a/tasks`             | GET    | Senaraikan tugasan dengan penapis                                  | pengurusan                                           |
| `/api/a2a/tasks/[id]`        | GET    | Dapatkan tugasan mengikut ID                                       | pengurusan                                           |
| `/api/a2a/tasks/[id]/cancel` | POST   | Batalkan tugasan yang sedang berjalan                              | pengurusan                                           |
| `/.well-known/agent.json`    | GET    | Kad Ejen (penemuan A2A)                                            | (awam, dicache selama 3600s)                         |
| `/api/a2a/tasks`             | POST   | Perwakilan masuk kepada kelompok OmniConductor (Conductor PRD RF5) | Bearer berbanding `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Perwakilan Conductor masuk (`POST /api/a2a/tasks`):** ejen A2A luaran mewakilkan kerja pengekodan kepada kelompok OmniConductor melalui OmniRoute. Badan: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — hanya kemahiran kelompok Conductor (yang diumumkan pada Kad Ejen) boleh diwakilkan; `metadata.conductor.repo.url` diperlukan (kelompok tersebut mengendalikan repositori git). Laluan ini diterjemahkan kepada `POST /v1/tasks` hab menggunakan `CONDUCTOR_ORCHESTRATOR_TOKEN` pada bahagian pelayan (sandaran `CONDUCTOR_HUB_TOKEN`) dan mengembalikan `201 { conductor_task_id, state: "submitted" }`; keadaan tugasan disalurkan semula melalui cermin SSE→A2A (RF1) dan boleh dilihat melalui `GET /api/a2a/tasks?skill=conductor`.

---

## Menambahkan Kemahiran Baharu

1. **Cipta fail kemahiran:** `src/lib/a2a/skills/<your-skill>.ts`

   Eksport fungsi tak segerak `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Ikuti struktur kemahiran sedia ada seperti `smartRouting.ts`.

2. **Daftarkan pengendali:** dalam `src/lib/a2a/taskExecution.ts`, tambahkan entri kepada `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...kemahiran sedia ada
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Dedahkan dalam Kad Ejen:** dalam `src/app/.well-known/agent.json/route.ts`, tambahkan kepada tatasusunan `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Tulis ujian:** `tests/unit/a2a-<your-skill>.test.ts`. Liputi laluan berjaya + laluan ralat.

5. **Dokumentasikan** kemahiran baharu dalam jadual `Available Skills` fail ini.

---

## TTL Tugas

Tugas tamat tempoh selepas `ttlMinutes` (lalai 5 min) — dikonfigurasikan dalam pembina `A2ATaskManager` di `src/lib/a2a/taskManager.ts:82`. Untuk menyesuaikannya, lakukan fork pada penciptaan tika `A2ATaskManager` dan berikan nilai yang berbeza (contohnya, `new A2ATaskManager(15)` untuk TTL 15 minit). Suatu sela latar belakang membersihkan tugas yang telah tamat tempoh setiap 60 saat.

---

## Kitar Hayat Tugas

```
diserahkan → sedang diproses → selesai
                              → gagal
                              → dibatalkan
```

- Tugas tamat tempoh selepas 5 minit secara lalai (lihat [TTL Tugas](#task-ttl))
- Keadaan terminal: `completed`, `failed`, `cancelled`
- Log peristiwa menjejaki setiap peralihan keadaan

---

## Kod Ralat

| Kod    | Maksud                                  |
| :----- | :-------------------------------------- |
| -32700 | Ralat penghuraian (JSON tidak sah)      |
| -32600 | Permintaan tidak sah / Tidak dibenarkan |
| -32601 | Kaedah atau kemahiran tidak ditemukan   |
| -32602 | Parameter tidak sah                     |
| -32603 | Ralat dalaman                           |
| -32000 | Titik akhir A2A dinyahdayakan           |

---

## Contoh Penyepaduan

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
