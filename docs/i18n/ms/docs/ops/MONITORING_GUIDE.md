# Monitoring & Observability Guide (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute dilengkapi dengan pemantauan kesihatan terbina dalam, autopilot penyedia, penjejakan kuota dan cangkuk kebolehcerapan. Panduan ini merangkumi papan pemuka, amaran dan penyelesaian masalah.

**Sumber:**

- `src/lib/monitoring/observability.ts` — syot kilat kebolehcerapan
- `src/lib/monitoring/comboHealthAutopilot.ts` — autopilot kesihatan kombo
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot penyedia
- `src/lib/monitoring/providerHealthMatrix.ts` — matriks kesihatan penyedia
- `src/lib/localHealthCheck.ts` — pemeriksaan kesihatan setempat
- `src/lib/tokenHealthCheck.ts` — kesihatan penyegaran token
- `src/lib/proxyHealth.ts` — cache kesihatan proksi (diterangkan dalam PROXY_GUIDE.md)

---

## Gambaran Keseluruhan

OmniRoute mempunyai **3 lapisan pemantauan**:

```
┌──────────────────────────────────────────────────────────────┐
│  Lapisan 1: Kesihatan Sistem (peringkat pelayan)              │
│  ├─ localHealthCheck.ts — DB, port, kebergantungan natif      │
│  ├─ db/healthCheck.ts — integriti, FK, artifak terbiar        │
│  └─ Papan pemuka: /dashboard/health                           │
├──────────────────────────────────────────────────────────────┤
│  Lapisan 2: Kesihatan Penyedia (daya tahan setiap penyedia)   │
│  ├─ providerHealthAutopilot.ts — pemutus litar, tempoh bertenang│
│  ├─ providerHealthMatrix.ts — skor kesihatan mengikut penyedia/model│
│  └─ Papan pemuka: /dashboard/providers                        │
├──────────────────────────────────────────────────────────────┤
│  Lapisan 3: Kebolehcerapan Langsung (syot kilat masa jalan)   │
│  ├─ observability.ts — pemutus litar, sesi, kuota             │
│  ├─ tokenHealthCheck.ts — kesihatan penyegaran token OAuth    │
│  └─ Alat MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Halaman Papan Pemuka

### `/dashboard/health` (Kesihatan Sistem)

Papan pemuka kesihatan peringkat tertinggi menunjukkan:

| Bahagian               | Perkara yang ditunjukkan                                 |
| ---------------------- | -------------------------------------------------------- |
| **Status pelayan**     | Masa operasi, versi, port, sambungan aktif               |
| **Pangkalan data**     | Sambungan, integriti, saiz WAL, migrasi terkini          |
| **Ringkasan penyedia** | Bilangan aktif, bilangan sihat, bilangan pemutus terbuka |
| **Pemantau kuota**     | Sesi aktif, pemberian amaran, kuota habis                |
| **Ralat terkini**      | 10 ralat terakhir berserta surih tindanan                |
| **Penggunaan sumber**  | Memori, CPU, penunjuk tekanan timbunan                   |

### `/dashboard/providers` (Kesihatan Penyedia)

Papan pemuka bagi setiap penyedia:

| Lajur     | Penerangan                                        |
| --------- | ------------------------------------------------- |
| Penyedia  | ID penyedia + nama paparan                        |
| Kesihatan | Status hijau/kuning/merah                         |
| Litar     | Keadaan terbuka/tertutup/separuh terbuka          |
| Sambungan | Bilangan sambungan, penyegaran terakhir           |
| Model     | Model tersedia, kesihatan bagi setiap model       |
| Kos       | Kos hari ini, trend 7 hari                        |
| Ralat     | Bilangan ralat 24 jam terakhir, kelas ralat utama |

Klik penyedia untuk melihat:

- Permintaan terkini dengan pecahan kependaman
- Skor kesihatan bagi setiap sambungan
- Sekatan bagi setiap model
- Saranan autopilot

### `/dashboard/quota` (Penjejakan Kuota)

Bagi setiap kunci API:

- Penggunaan semasa berbanding had (bar kemajuan)
- Trend kuota (carta 30 hari)
- Masa tetapan semula seterusnya
- Sejarah amaran

### `/dashboard/combos` (Kesihatan Kombo)

Bagi setiap kombo:

- Strategi + sasaran
- Kesihatan bagi setiap sasaran
- Peristiwa sandaran terkini
- Kadar kejayaan (24 jam, 7 hari, 30 hari)

---

## API Semakan Kesihatan

OmniRoute menyediakan **dua** permukaan kesihatan HTTP. Kedua-duanya tidak boleh digunakan secara saling menggantikan untuk pengorkestra.

| Laluan                       | Tujuan                                                               | Beban                                 | Gunakan untuk                                                                       |
| ---------------------------- | -------------------------------------------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------- |
| `GET /healthz`               | Keaktifan/kesiapsiagaan kitar hayat (`ok` / `starting` / `stopping`) | Ringan (bendera fasa sahaja)          | **Kesiapsiagaan** Kubernetes; **keaktifan** ringan jika anda mesti menggunakan HTTP |
| `GET /api/monitoring/health` | Ringkasan mendalam sistem + penyedia (DB, heap, kiraan katalog, …)   | Berat (kerja DB segerak / pemantauan) | Papan pemuka, semakan mendalam blackbox, semakan kesihatan terbina dalam Docker     |

> **Nota:** Matriks kesihatan penyedia, isu autopilot, pemantau kuota, kesihatan token dan butiran kependaman selain `/api/monitoring/health` tersedia melalui **alat MCP** `observability_snapshot` atau halaman **papan pemuka** — tiada laluan REST khusus untuk perkara tersebut.

Kedua-dua laluan berjalan pada **gelung peristiwa Node yang sama** dengan pengendalian permintaan. Laluan yang terikat CPU (kerja katalog `GET /v1/models` yang besar, pemampatan konteks panjang / pengiraan token) boleh melengahkan **semua** pengendali HTTP, termasuk `/healthz`. Gelung peristiwa sibuk ≠ proses mati. Utamakan pembaikan proses yang membolot sumber; pelarasan prob hanya mengurangkan penamatan palsu.

### Prob pengorkestra ringan

```bash
GET /healthz
# atau HEAD /healthz
```

- **200** + isi `ok` apabila fasa kitar hayat pelayan sudah sedia
- **503** + `starting` / `stopping` semasa permulaan atau penutupan
- Pelaksanaan: `src/app/healthz/route.ts` (tanpa ping DB)

### Kesihatan Sistem (mendalam)

```bash
GET /api/monitoring/health
```

Respons:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: cache prob berbanding `test_status` SQLite

`GET /api/monitoring/health` → `credentialHealth` ialah **tolok cache prob dalam memori**,
bukan longgokan langsung `provider_connections.test_status`. Selepas #12532, laluan
permintaan hanya membaca `getCachedCredentialHealthSummary()`; prob latar belakang
menyegarkan cache di luar gelung peristiwa.

| Lapisan                 | Lokasi                                                                | Maksudnya                                                                                                                                                                                                              |
| ----------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tolok cache prob        | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Hasil prob kesihatan kelayakan terakhir yang masih disimpan dalam memori proses. `source` sentiasa `probe-cache`.                                                                                                      |
| Butiran sambungan gagal | `credentialHealth.failedConnections`                                  | Hadir **hanya apabila `failed > 0`**. Senarai terhad baris cache dengan `status=error` (`connectionId`, `status`, `lastError` / `lastErrorType` yang disanitasi). `failedOmitted` ditetapkan apabila senarai dihadkan. |
| Status lekat SQLite     | `credentialHealth.staleDbNonOkCount`                                  | Bilangan baris sambungan **aktif** (`is_active=1`) yang `test_status` tersimpannya merupakan nilai bukan ok yang diketahui (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).          |

Kedua-dua lapisan boleh berbeza secara disengajakan:

- Tolok `failed=0` sementara `staleDbNonOkCount>0` — SQLite masih mempunyai
  `test_status` lekat (contohnya `expired` atau `credits_exhausted`) yang tidak
  dikira sebagai `status=error` oleh petikan cache prob terkini.
- Tolok `failed>0` sementara SQLite kelihatan sihat — prob terkini gagal dan
  dicache; baris DB belum dikemas kini, atau telah dikosongkan kemudian.

Jangan cetuskan amaran berdasarkan `provider_connections.test_status` sahaja ketika mengikis
titik akhir ini. Gunakan `failed` + `failedConnections` untuk kegagalan prob langsung dan
`staleDbNonOkCount` apabila anda memerlukan kiraan status lekat tersimpan.

### Cadangan prob Kubernetes

OmniRoute ialah **satu proses Node** (satu gelung peristiwa). `HEALTHCHECK` Docker standard menyasarkan `/healthz` yang ringan. `/api/monitoring/health` adalah **terlalu berat** untuk selang keaktifan kubelet.

| Probe                  | Sasaran yang disyorkan                                                                     | Catatan                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Permulaan**          | HTTP `GET /healthz` dengan `failureThreshold` yang panjang (atau `startPeriod` yang besar) | Permulaan sejuk + migrasi SQLite boleh mengambil masa lebih daripada beberapa saat                                                                                                                                                                                                                                                                                                                      |
| **Kesediaan**          | HTTP `GET /healthz`                                                                        | Kitar hayat `ok` / `starting` / `stopping` (200 berbanding 503). Masih berubah-ubah jika gelung disekat oleh CPU. **Respons 200 yang mengambil masa beberapa saat bukanlah sihat** (#10303) — ini bermakna gelung peristiwa telah kebuluran sebelum pengendali 3 bait dijalankan                                                                                                                        |
| **Keaktifan**          | HTTP `GET /livez`, **atau TCP** pada port perkhidmatan utama (`PORT`, lalai `20128`)       | `/livez` hanya menunjukkan proses masih hidup (sentiasa 200 jika pengendali berjalan). Ia masih berkongsi gelung peristiwa — sibuk ≠ mati, dan ia tidak mengesan kebuluran gelung peristiwa (#10303) dengan lebih baik berbanding TCP. Utamakan **TCP** jika probe HTTP tamat masa ketika beban katalog/pemampatan; jangan matikan pod akibat gangguan singkat gelung peristiwa dalam mana-mana keadaan |
| **Kesihatan mendalam** | `GET /api/monitoring/health` daripada pemeriksa luaran                                     | Bukan untuk `livenessProbe` kubelet / `readinessProbe` yang ketat                                                                                                                                                                                                                                                                                                                                       |

Contoh struktur (laraskan ambang mengikut beban permulaan sejuk dan pemampatan anda):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Ketika gelung peristiwa tergendala, HTTP /livez masih boleh tamat masa. TCP ialah
  # alternatif yang lebih konservatif:
  # tcpSocket:
  #   port: http
```

**Jangan** halakan **keaktifan** kubelet kepada `/api/monitoring/health`. Laluan tersebut menjalankan kerja DB/pemantauan sebenar dan akan menghasilkan positif palsu ketika beban tinggi.

Berkaitan: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (probe ketika gelung peristiwa sibuk), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (penggunaan berlebihan sumber oleh penetapan harga katalog), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (penggunaan berlebihan sumber oleh pengiraan token pemampatan).

### Kerja laluan permintaan pilihan (memori, kemahiran, penyegaran token)

Pengekstrakan memori, penyuntikan kemahiran dan penyegaran token OAuth berkongsi **gelung peristiwa Node utama** dengan `/healthz`. Ia merupakan ciri togol papan pemuka (`memoryEnabled`, `skillsEnabled`), bukannya kelompok pekerja. Lihat [Persekitaran — kos gelung peristiwa](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Kesihatan Penyedia

> **Tiada titik akhir REST.** Data kesihatan penyedia tersedia melalui alat MCP `observability_snapshot` atau halaman papan pemuka `/dashboard/providers`.

### Butiran Penyedia

> **Tiada titik akhir REST.** Butiran bagi setiap penyedia tersedia melalui halaman papan pemuka `/dashboard/providers`.

---

## Autopilot Kesihatan Penyedia

Modul `providerHealthAutopilot.ts` ialah **sistem pemulihan kendiri** yang:

1. Mengesan masalah penyedia (litar terbuka, tempoh bertenang, sekatan, amaran kuota)
2. Menjana **tindakan yang disyorkan** untuk menyelesaikannya
3. Secara pilihan, **melaksanakan secara automatik** tindakan berisiko rendah

### Jenis Masalah yang Dikesan

| Jenis masalah                | Keterukan | Contoh keadaan                               |
| ---------------------------- | --------- | -------------------------------------------- |
| `provider_circuit_open`      | kritikal  | Pemutus litar terbuka selepas 5 kegagalan    |
| `provider_circuit_half_open` | amaran    | Litar sedang menguji pemulihan               |
| `connection_cooldown`        | amaran    | Sambungan dalam tempoh bertenang selepas 429 |
| `stale_connection_error`     | amaran    | Muat semula terakhir gagal 30+ minit lalu    |
| `terminal_connection_error`  | kritikal  | OAuth dibatalkan, kunci tidak sah            |
| `inactive_connection`        | maklumat  | Sambungan dinyahdayakan dalam tetapan        |
| `model_lockout`              | amaran    | Model tertentu dalam kuarantin               |
| `quota_monitor_warning`      | amaran    | Penggunaan kuota pada 80%+                   |

### Jenis Tindakan yang Dijana

| Tindakan                       | Risiko    | Penerangan                                      |
| ------------------------------ | --------- | ----------------------------------------------- |
| `clear_provider_breaker`       | sederhana | Tetapkan semula pemutus litar kepada tertutup   |
| `clear_connection_cooldown`    | rendah    | Alih keluar tempoh bertenang daripada sambungan |
| `clear_stale_connection_error` | rendah    | Kosongkan penanda ralat lapuk                   |
| `clear_model_lockout`          | rendah    | Dayakan semula model yang dikuarantin           |
| `reactivate_connection`        | sederhana | Dayakan semula sambungan yang dinyahaktifkan    |
| `deactivate_connection`        | tinggi    | Nyahdayakan sambungan yang bermasalah           |

### API

> **Tiada titik akhir REST.** Masalah autopilot tersedia melalui alat MCP `observability_snapshot` atau papan pemuka. Autopilot berjalan secara dalaman; tingkah lakunya dikonfigurasikan melalui DB tetapan (medan `autopilotMode` bagi setiap sambungan), bukan pemboleh ubah persekitaran — `grep -rn` untuk pemboleh ubah persekitaran mod autopilot tidak menemukan sebarang hasil.

### Mod Autopilot

Autopilot beroperasi dalam **mod manual** secara lalai — ia mengesan masalah dan menjana tindakan yang disyorkan, tetapi tidak menerapkannya secara automatik. Tindakan boleh diterapkan melalui papan pemuka.

---

## Autopilot Kesihatan Kombo

`comboHealthAutopilot.ts` ialah padanan **khusus untuk kombo** bagi autopilot penyedia. Ia:

- Mengesan kombo yang tidak sihat
- Mengesyorkan penyusunan semula sasaran
- Mencadangkan supaya sasaran yang rosak dinyahdayakan
- Mengalih keluar sasaran yang tidak berfungsi secara automatik selepas N kegagalan

### Contoh Masalah Kombo

```
Kombo "always-on" (strategi keutamaan)
├─ Sasaran 1: openai/gpt-5 (sihat)
├─ Sasaran 2: anthropic/claude-opus-4-6 (⚠️ model disekat sehingga 14:00)
└─ Sasaran 3: kiro/claude-sonnet-4-5 (sihat)

Tindakan yang disyorkan: Susun semula — alihkan kiro ke atas anthropic sehingga sekatan tamat
```

---

## Pemantau Kuota

`observability.ts` mendedahkan **pemantau kuota bagi setiap sesi** untuk penyedia langganan (Claude Code, Codex, GitHub Copilot):

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Maksud Status

| Status      | Keadaan                          | Tindakan UI                                |
| ----------- | -------------------------------- | ------------------------------------------ |
| `starting`  | Tinjauan awal sedang berlangsung | Pemutar                                    |
| `idle`      | Tiada aktiviti terkini           | Disembunyikan daripada papan pemuka        |
| `healthy`   | Baki kuota > 50%                 | Titik hijau                                |
| `warning`   | Baki kuota < 50%                 | Amaran kuning                              |
| `exhausted` | Kuota = 0%                       | Blok merah, halakan ke penyedia seterusnya |
| `error`     | Tinjauan gagal                   | Titik merah, cuba semula tidak lama lagi   |

### API

> **Tiada titik akhir REST.** Data pemantau kuota tersedia melalui alat MCP `observability_snapshot` atau papan pemuka.

---

## Snapshot Kebolehcerapan

Alat MCP `observability_snapshot` mengembalikan **snapshot sistem lengkap** untuk ejen AI:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* lihat di atas */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Ejen menggunakan maklumat ini untuk membuat **keputusan penghalaan** — contohnya, "jika litar openai terbuka, halakan kepada anthropic terlebih dahulu".

---

## Semakan Kesihatan Token

Penyedia OAuth (Claude Code, GitHub Copilot, Cursor) memerlukan **penyegaran token berkala**. `src/lib/tokenHealthCheck.ts` menjalankan penjadual latar belakang:

- **Detik sapuan**: setiap 60 saat (sapuan dalam `TICK_MS = 60 * 1000` di `src/lib/tokenHealthCheck.ts:30`)
- **Selang semakan kesihatan bagi setiap sambungan**: lalai 60 minit (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); boleh dikonfigurasikan melalui pangkalan data tetapan
- **Penyegaran awalan apabila menerima 401**: dikendalikan oleh pemintas bagi setiap sambungan

### Status Kesihatan Token

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### Konfigurasi

Konfigurasi semakan kesihatan token dikendalikan secara dalaman oleh `tokenHealthCheck.ts`.

### Kesihatan Token

> **Tiada titik akhir REST.** Data kesihatan token tersedia melalui papan pemuka atau alat MCP `observability_snapshot`.

---

## Pemberitahuan Amaran

### Saluran Terbina Dalam

OmniRoute menyokong **3 saluran amaran**:

| Saluran               | Persediaan         | Kes penggunaan                 |
| --------------------- | ------------------ | ------------------------------ |
| Sepanduk papan pemuka | Sentiasa aktif     | Pemberitahuan dalam aplikasi   |
| Webhook               | Konfigurasikan URL | Slack, Discord, PagerDuty      |
| Log                   | Lalai              | Untuk pengagregatan log luaran |

### Konfigurasi Webhook

> **Nota:** Konfigurasi amaran webhook dikendalikan melalui halaman Tetapan pada papan pemuka. Lihat UI Tetapan untuk URL webhook, penapisan peristiwa dan penyesuaian muatan.

### Jenis Amaran

| Amaran                       | Bila                                            | Keterukan lalai |
| ---------------------------- | ----------------------------------------------- | --------------- |
| `provider_circuit_open`      | Litar terbuka                                   | kritikal        |
| `provider_circuit_half_open` | Litar menguji pemulihan                         | maklumat        |
| `quota_warning`              | Kuota pada 80%+                                 | amaran          |
| `quota_exhausted`            | Kuota pada 100%                                 | kritikal        |
| `token_refresh_failed`       | 3+ kegagalan penyegaran berturut-turut          | amaran          |
| `token_expired`              | Token melepasi tarikh luput                     | kritikal        |
| `combo_target_unhealthy`     | Sasaran kombo dalam tempoh bertenang selama 1j+ | amaran          |
| `db_integrity_warning`       | Pelanggaran FK > 0                              | amaran          |
| `heap_pressure`              | Penggunaan timbunan > 80% daripada ambang       | amaran          |

---

## Metrik Prestasi

### Metrik yang Dijejaki

| Metrik                  | Jenis     | Sumber                          |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | pembilang | `services/usage.ts`             |
| `request_latency_ms`    | histogram | `services/usage.ts`             |
| `tokens_consumed`       | pembilang | `services/usage.ts`             |
| `cost_usd`              | pembilang | `services/usage.ts`             |
| `provider_errors`       | pembilang | `services/errorClassifier.ts`   |
| `circuit_state_changes` | pembilang | `services/resilience.ts`        |
| `cache_hits`            | pembilang | `services/signatureCache.ts`    |
| `compression_savings`   | histogram | `services/compression/stats.ts` |
| `quota_used`            | tolok     | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | tolok     | `observability.ts`              |

### Persentil Kependaman (p50/p95/p99)

> **Tiada titik akhir REST.** Data persentil kependaman tersedia melalui halaman papan pemuka `/dashboard/health`. Eksport Prometheus/OpenTelemetry dirancang untuk v3.9.

### Eksport Prometheus / OpenTelemetry (Fasa 2)

Dirancang untuk v3.9: eksport natif ke Prometheus, OpenTelemetry, Datadog.

Buat masa ini, kutip data daripada `/api/monitoring/health` menggunakan mana-mana sistem pemantauan berasaskan HTTP (pengeksport blackbox Prometheus, semakan HTTP Datadog dan sebagainya).

---

## Panduan Amaran

### Slack

> **Nota:** Amaran webhook dikonfigurasikan melalui halaman Settings pada papan pemuka — tiada pemboleh ubah persekitaran webhook khusus (`grep -rn` mengembalikan sifar padanan). Lihat UI Settings untuk URL webhook, penapisan peristiwa dan penyesuaian muatan.

### Discord

> Amaran webhook menggunakan aliran UI Settings yang sama seperti Slack. Discord menerima bentuk muatan JSON yang sama.

### PagerDuty

> Amaran webhook menggunakan aliran UI Settings yang sama. Kunci penghalaan PagerDuty Events API v2 dikonfigurasikan dalam UI Settings.

### Webhook Tersuai (JSON)

> Mana-mana titik akhir HTTP yang menerima POST dengan badan JSON boleh digunakan. Konfigurasikan URL dalam UI Settings.

---

## Konfigurasi Papan Pemuka

### Sesuaikan Papan Pemuka Kesihatan

Cipta `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Sematkan Penyedia di Bahagian Atas

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Penyelesaian Masalah

### "Penyedia menyatakan sihat tetapi permintaan gagal"

1. Semak **isu autopilot** — mungkin model telah disekat
2. Lihat **ralat terkini** untuk kelas ralat tertentu
3. Cuba **ujian sambungan** pada kad penyedia
4. Semak sama ada penyedia **dikenakan had kadar di huluan** (tidak kelihatan secara setempat)

### "Kuota menyatakan sihat tetapi saya melihat 429"

- 429 bermaksud penyedia menyatakan bahawa anda telah menggunakan kuota anda
- Penjejakan kuota OmniRoute mungkin **lapuk** — maklumat yang tepat berada di huluan penyedia
- Data kuota disegar semula secara automatik melalui pemantau kuota dalaman

### "Gabungan gagal tetapi semua sasaran kelihatan sihat"

- Semak papan pemuka **kesihatan gabungan** untuk masalah susunan sasaran
- Lihat **peristiwa sandaran** — mungkin gabungan menghabiskan semua pilihan terlalu cepat
- Sahkan bahawa **strategi** sepadan dengan kes penggunaan anda (keutamaan berbanding giliran bergilir berbanding automatik)

### "Semakan kesihatan pangkalan data gagal"

- Jalankan `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Jika "ok" — penggera palsu, semakan kesihatan terlalu ketat
- Jika selainnya — **hentikan OmniRoute** dan ikuti [panduan pemulihan bencana](./DATABASE_GUIDE.md#disaster-recovery)

### "Tekanan heap memori berada pada tahap kritikal"

```bash
# Semak heap semasa
node -e "console.log(process.memoryUsage())"

# Cetuskan GC manual (jika --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Kurangkan permintaan serentak (tetapkan melalui halaman Settings pada papan pemuka, bukan pemboleh ubah persekitaran)
# Tiada pemboleh ubah persekitaran `MAX_CONCURRENT_REQUESTS` — konfigurasikannya dalam Settings → Concurrency.
```

---

## Lihat Juga

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — penjejakan penggunaan & kos
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — skema DB + kesihatan
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — kesihatan proksi (cache berasingan)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — seni bina sistem
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — butiran pemutus litar
- Sumber: `src/lib/monitoring/` (4 fail, 2121 LOC)
