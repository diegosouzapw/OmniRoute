# ACP (Agent Client Protocol) (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: ACP membolehkan OmniRoute melancarkan ejen CLI (seperti Claude Code, Codex) sebagai proses anak dan bukannya menggunakan API HTTP. Ini memberikan anda pengangkutan "CLI-sebagai-backend".

---

## Apakah ACP?

ACP (Agent Client Protocol) ialah pengangkutan **"CLI-sebagai-backend"** untuk OmniRoute. Daripada memintas panggilan API HTTP kepada penyedia AI, ACP **melancarkan ejen CLI sebagai proses anak** dan menghantar gesaan melalui antara muka asalnya.

### Mengapa Menggunakan ACP?

| Manfaat                        | Penerangan                                             |
| ------------------------------ | ------------------------------------------------------ |
| **Kunci API tidak diperlukan** | Menggunakan pengesahan CLI sedia ada anda              |
| **Protokol asli**              | Menggunakan format input/output asli setiap CLI        |
| **Pengesanan automatik**       | Mengesan CLI yang dipasang pada sistem anda            |
| **15 ejen terbina dalam**      | Diprakonfigurasi untuk alat CLI popular                |
| **Ejen tersuai**               | Tambahkan alat CLI anda sendiri melalui tetapan        |
| **Pengurusan proses**          | Mengendalikan kitaran hayat (lancar, hantar, hentikan) |

---

## Ejen CLI yang Disokong

ACP menyokong **15 ejen CLI terbina dalam** secara lalai:

| ID Ejen       | Nama Paparan       | Binari        | Protokol |
| ------------- | ------------------ | ------------- | -------- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio    |
| `claude`      | Claude Code CLI    | `claude`      | stdio    |
| `goose`       | Goose CLI          | `goose`       | stdio    |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio    |
| `aider`       | Aider              | `aider`       | stdio    |
| `opencode`    | OpenCode           | `opencode`    | stdio    |
| `cline`       | Cline              | `cline`       | stdio    |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio    |
| `forge`       | ForgeCode          | `forge`       | stdio    |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio    |
| `interpreter` | Open Interpreter   | `interpreter` | stdio    |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio    |
| `warp`        | Warp AI            | `warp`        | stdio    |
| `gemini`      | Gemini CLI         | `gemini`      | stdio    |
| `zcode`       | ZCode              | `zcode`       | stdio    |

### Ejen Tersuai

Anda boleh menambahkan ejen CLI anda sendiri melalui tetapan. Ejen tersuai menyokong ciri yang sama seperti ejen terbina dalam.

---

## Permulaan Pantas

### Langkah 1: Pasang Ejen CLI

```bash
# Contoh: Pasang Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Sahkan pemasangan
claude --version
```

### Langkah 2: Pengesanan Automatik ACP

ACP mengesan ejen CLI yang dipasang pada sistem anda secara automatik. Tiada konfigurasi diperlukan!

### Langkah 3: Gunakan Pengangkutan ACP

Setelah dikesan, ACP boleh digunakan sebagai pengangkutan untuk mana-mana penyedia yang disokong. OmniRoute akan menggunakan ACP secara automatik apabila CLI tersedia.

---

## Cara ACP Berfungsi

### Seni Bina

```
┌─────────────────┐
│  OmniRoute      │
│  (Proksi HTTP)  │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Proses Anak    │
│  (Ejen CLI)     │
│                 │
│  stdin  ◄──────┤  Hantar gesaan
│  stdout ──────►│  Terima respons
│  stderr ──────►│  Terima ralat
└─────────────────┘
```

### Kitaran Hayat Proses

1. **Lancar** — ACP mencipta proses anak untuk ejen CLI
2. **Hantar** — ACP menulis gesaan ke stdin proses
3. **Terima** — ACP membaca respons daripada stdout/stderr
4. **Pengesanan Melahu** — ACP menunggu ketidakaktifan selama 2 saat sebelum menganggap respons selesai
5. **Hentikan** — ACP menamatkan proses (SIGTERM, kemudian SIGKILL selepas 5s)

### Protokol Komunikasi

ACP menggunakan **stdio** (input/output standard) untuk berkomunikasi dengan ejen CLI. Protokolnya ialah:

1. **Hantar gesaan** — Tulis ke stdin dengan baris baharu
2. **Tunggu respons** — Baca daripada stdout sehingga melahu (tiada output selama 2s)
3. **Tamat masa** — Lalai 120 saat (boleh dikonfigurasi)

---

## Rujukan API

### Fungsi Pendaftaran

#### `detectInstalledAgents()`

Mengesan semua ejen CLI yang dipasang pada sistem. Hasil dicache selama 60 saat.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Mengembalikan: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // cth., "codex", "claude"
  name: string; // Nama paparan
  binary: string; // Nama binari untuk dilancarkan
  versionCommand: string; // Perintah pengesanan versi
  version: string | null; // Versi yang dikesan (null jika tidak dipasang)
  installed: boolean; // Sama ada ejen telah dipasang
  providerAlias: string; // ID penyedia dalam OmniRoute
  spawnArgs: string[]; // Argumen untuk dihantar semasa pelancaran
  protocol: "stdio" | "http"; // Protokol komunikasi
  isCustom?: boolean; // Sama ada ini ialah ejen tersuai yang ditakrifkan oleh pengguna
}
```

#### `getAvailableAgents()`

Mendapatkan hanya ejen yang dipasang dan tersedia untuk ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Mengembalikan: CliAgentInfo[] (hanya ejen yang dipasang)
```

#### `getAgentById(id)`

Mendapatkan ejen tertentu berdasarkan ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Mengembalikan: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Menetapkan takrif ejen tersuai daripada tetapan.

```typescript
import { setCustomAgents } from "@/lib/acp";

setCustomAgents([
  {
    id: "my-custom-cli",
    name: "My Custom CLI",
    binary: "mycli",
    versionCommand: "mycli --version",
    providerAlias: "my-provider",
    spawnArgs: [],
    protocol: "stdio",
  },
]);
```

### Fungsi Pengurus

#### `acpManager.spawn(agentId, binary, args, env)`

Melancarkan proses ejen CLI baharu.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* pemboleh ubah persekitaran tersuai */
});
// Mengembalikan: AcpSession
```

**ID ejen yang dibenarkan**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Menghantar prom kepada ejen CLI dan mengumpulkan respons.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // tamat masa 2 minit
);
// Mengembalikan: Promise<string>
```

#### `acpManager.kill(sessionId)`

Menamatkan sesi dan menjalankan pembersihan.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Mengembalikan: boolean
```

#### `acpManager.getActiveSessions()`

Mendapatkan semua sesi aktif.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Mengembalikan: AcpSession[]
```

#### `acpManager.killAll()`

Menamatkan semua sesi.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Antara Muka Sesi

```typescript
interface AcpSession {
  id: string; // ID sesi unik
  agentId: string; // ID ejen (cth., "claude")
  process: ChildProcess; // Pemegang proses anak
  alive: boolean; // Sama ada proses masih aktif
  stdoutBuffer: string; // Penimbal stdout terkumpul
  stderrBuffer: string; // Penimbal stderr terkumpul
  createdAt: Date; // Cap masa penciptaan
}
```

### Peristiwa

`AcpManager` melanjutkan `EventEmitter` dan memancarkan peristiwa berikut:

#### `stdout`

Dipancarkan apabila ejen CLI menulis kepada stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Dipancarkan apabila ejen CLI menulis kepada stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Dipancarkan apabila proses ejen CLI tamat.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Dipancarkan apabila proses ejen CLI mengalami ralat.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Konfigurasi

### Pemboleh Ubah Persekitaran

ACP mewarisi semua pemboleh ubah persekitaran daripada proses induk dan boleh dilanjutkan dengan pemboleh ubah persekitaran tersuai:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Argumen Pelancaran

Setiap ejen mempunyai argumen pelancaran lalai yang ditakrifkan dalam daftar. Anda boleh mengatasinya:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Tamat Masa

Tamat masa lalai untuk gesaan ialah **120 saat** (2 minit). Anda boleh mengatasinya:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minit
```

### Cache Pengesanan

Pengesanan ejen dicache selama **60 saat** untuk mengelakkan imbasan sistem fail yang memerlukan banyak sumber. Paksa muat semula:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Keselamatan

### Pencegahan Suntikan Perintah

ACP mengesahkan perintah versi untuk mencegah serangan suntikan perintah:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Perintah versi yang mengandungi aksara ini akan ditolak:

- `;` — Pemisah perintah
- `&` — Proses latar belakang
- `|` — Paip
- `<`, `>` — Penghalaan semula
- `` ` `` — Penggantian perintah
- `$` — Pengembangan pemboleh ubah
- `\r`, `\n` — Pemisah baris

### Pengesahan Nama Binari

ACP mengesahkan bahawa binari perintah versi sepadan dengan nama binari yang dijangkakan (melainkan ia merupakan ejen tersuai).

### Pengasingan Proses

Setiap sesi ACP berjalan dalam proses anaknya sendiri. Proses tersebut dimatikan apabila sesi tamat atau mencapai had masa.

---

## Prestasi

### Prestasi Pengesanan

- **Panggilan pertama**: ~50-200ms (menjalankan perintah `version` untuk setiap ejen)
- **Panggilan dicache**: <1ms (dikembalikan daripada cache)
- **TTL cache**: 60 saat

### Prestasi Gesaan

- **Pelancaran**: ~50-100ms
- **Hantar gesaan**: ~10-50ms
- **Tunggu respons**: Bergantung pada ejen CLI (biasanya 1-30 saat)
- **Matikan**: ~5 saat (SIGTERM) + serta-merta (SIGKILL)

### Penggunaan Sumber

- **Memori bagi setiap sesi**: ~10-50MB (bergantung pada ejen CLI)
- **CPU**: Minimum (terikat I/O)
- **Cakera**: Tiada

---

## Penyelesaian Masalah

### Ralat "Unknown agent"

**Masalah**: `acpManager.spawn()` mencetuskan `Unknown agent: <id>`

**Penyelesaian**: Hanya ejen berikut dibenarkan dalam `spawn()`:

- `claude`
- `codex`
- `gemini`
- `qwen`

Ejen lain mesti dilancarkan secara manual atau melalui takrifan ejen tersuai.

### Ralat "Session not alive"

**Masalah**: `acpManager.sendPrompt()` mencetuskan `Session ${sessionId} is not alive`

**Penyelesaian**: Sesi mungkin telah tamat atau dimatikan. Semak status sesi:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Lancarkan semula sesi
  acpManager.spawn("claude", "claude", [], {});
}
```

### Ralat "ACP timeout"

**Masalah**: `acpManager.sendPrompt()` mencetuskan `ACP timeout after 120000ms`

**Penyelesaian**: Tingkatkan tamat masa:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minit
```

### CLI Tidak Dikesan

**Masalah**: `detectInstalledAgents()` tidak menemui CLI anda

**Penyelesaian**:

1. **Semak PATH**: Pastikan CLI berada dalam PATH sistem anda
2. **Semak perintah versi**: Jalankan `claude --version` secara manual
3. **Semak kebenaran**: Pastikan CLI boleh dilaksanakan
4. **Ejen tersuai**: Tambahkan takrifan ejen tersuai untuk CLI bukan standard

### Kebenaran Ditolak

**Masalah**: ACP tidak dapat melaksanakan CLI

**Penyelesaian**:

1. **Semak kebenaran fail**: `chmod +x /usr/local/bin/claude`
2. **Semak pemilikan**: Pastikan OmniRoute mempunyai kebenaran membaca/melaksanakan
3. **Semak SELinux/AppArmor**: Mungkin menyekat pelancaran proses

---

## Contoh

### Contoh 1: Mulakan dan Gunakan Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Kesan ejen yang dipasang
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Mulakan sesi baharu
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Hantar gesaan
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Bersihkan sumber
  acpManager.kill(session.id);
}
```

### Contoh 2: Penemuan Automatik dengan Pilihan Sandaran

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Cuba Claude dahulu, gunakan Codex sebagai pilihan sandaran
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("No ACP-compatible CLI agent found");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "Hello!");

acpManager.kill(session.id);
```

### Contoh 3: Ejen Tersuai

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Daftarkan ejen CLI tersuai
setCustomAgents([
  {
    id: "my-llm-cli",
    name: "My LLM CLI",
    binary: "myllm",
    versionCommand: "myllm --version",
    providerAlias: "my-llm-provider",
    spawnArgs: ["--format", "json"],
    protocol: "stdio",
  },
]);

// Kini detectInstalledAgents() akan menyertakan "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Langkah Seterusnya?

- **[Rujukan API](../reference/API_REFERENCE.md)** — Titik akhir REST API
- **[Rujukan Penyedia](../reference/PROVIDER_REFERENCE.md)** — Kesemua 352 penyedia
- **[Pelayan MCP](./MCP-SERVER.md)** — Penyepaduan Model Context Protocol
- **[Pelayan A2A](./A2A-SERVER.md)** — Protokol antara ejen
- **[Ejen Awan](./CLOUD_AGENT.md)** — Ejen berasaskan awan

---

## Rujukan

- [Projek AionUi](https://github.com/iOfficeAI/AionUi) — Inspirasi untuk pengesanan automatik ACP
- [Kod Sumber ACP](../../src/lib/acp/) — Butiran pelaksanaan
  - `manager.ts` — Pengurusan kitar hayat proses
  - `registry.ts` — Penemuan dan pendaftaran ejen
  - `index.ts` — Eksport API awam
