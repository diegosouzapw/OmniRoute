# ACP (Agent Client Protocol) (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **Qısa xülasə**: ACP OmniRoute-a HTTP API-lərindən istifadə etmək əvəzinə CLI agentlərini (məsələn, Claude Code, Codex) alt proseslər kimi işə salmağa imkan verir. Bu, sizə "CLI-backend kimi" nəqliyyat mexanizmi təqdim edir.

---

## ACP nədir?

ACP (Agent Client Protocol) OmniRoute üçün **"CLI-backend kimi" nəqliyyat mexanizmidir**. ACP süni intellekt provayderlərinə edilən HTTP API çağırışlarını ələ keçirmək əvəzinə, **CLI agentlərini alt proseslər kimi işə salır** və sorğuları onların öz interfeysi vasitəsilə ötürür.

### ACP-dən niyə istifadə etməli?

| Üstünlük                          | Təsvir                                                     |
| --------------------------------- | ---------------------------------------------------------- |
| **API açarlarına ehtiyac yoxdur** | Mövcud CLI autentifikasiyanızdan istifadə edir             |
| **Native protokol**               | Hər CLI-ın öz giriş/çıxış formatından istifadə edir        |
| **Avtomatik aşkarlama**           | Sisteminizdə quraşdırılmış CLI-ları aşkarlayır             |
| **15 daxili agent**               | Populyar CLI alətləri üçün əvvəlcədən konfiqurasiya edilib |
| **Fərdi agentlər**                | Parametrlər vasitəsilə öz CLI alətlərinizi əlavə edin      |
| **Proseslərin idarə edilməsi**    | Həyat dövrünü idarə edir (işə salma, göndərmə, dayandırma) |

---

## Dəstəklənən CLI agentləri

ACP ilkin olaraq **15 daxili CLI agentini** dəstəkləyir:

| Agent ID-si   | Göstərilən ad      | İcra faylı    | Protokol |
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

### Fərdi agentlər

Parametrlər vasitəsilə öz CLI agentlərinizi əlavə edə bilərsiniz. Fərdi agentlər daxili agentlərlə eyni funksiyaları dəstəkləyir.

---

## Sürətli başlanğıc

### Addım 1: CLI agentini quraşdırın

```bash
# Nümunə: Claude Code CLI-ı quraşdırın
npm install -g @anthropic-ai/claude-code

# Quraşdırmanı yoxlayın
claude --version
```

### Addım 2: ACP ilə avtomatik aşkarlama

ACP sisteminizdə quraşdırılmış CLI agentlərini avtomatik aşkarlayır. Heç bir konfiqurasiyaya ehtiyac yoxdur!

### Addım 3: ACP nəqliyyat mexanizmindən istifadə edin

Aşkarlandıqdan sonra ACP istənilən dəstəklənən provayder üçün nəqliyyat mexanizmi kimi istifadə edilə bilər. CLI əlçatan olduqda OmniRoute avtomatik olaraq ACP-dən istifadə edəcək.

---

## ACP necə işləyir?

### Arxitektura

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP Proksi)  │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Alt Proses     │
│  (CLI Agenti)   │
│                 │
│  stdin  ◄──────┤  Sorğunu göndər
│  stdout ──────►│  Cavabı qəbul et
│  stderr ──────►│  Xətaları qəbul et
└─────────────────┘
```

### Prosesin həyat dövrü

1. **İşə salma** — ACP CLI agenti üçün alt proses yaradır
2. **Göndərmə** — ACP sorğuları prosesin stdin axınına yazır
3. **Qəbul etmə** — ACP cavabları stdout/stderr axınlarından oxuyur
4. **Boşdayanmanın aşkarlanması** — ACP cavabı tamamlanmış hesab etməzdən əvvəl 2 saniyəlik fəaliyyətsizliyi gözləyir
5. **Dayandırma** — ACP prosesi dayandırır (SIGTERM, daha sonra 5s keçdikdən sonra SIGKILL)

### Rabitə protokolu

ACP CLI agentləri ilə əlaqə üçün **stdio** (standart giriş/çıxış) istifadə edir. Protokol belədir:

1. **Sorğunu göndərmə** — Yeni sətir simvolu ilə stdin axınına yazın
2. **Cavabı gözləmə** — Boşdayanma baş verənədək (2s ərzində çıxış olmadıqda) stdout axınından oxuyun
3. **Taym-aut** — Standart olaraq 120 saniyədir (konfiqurasiya edilə bilər)

---

## API İstinadı

### Reyestr Funksiyaları

#### `detectInstalledAgents()`

Sistemdə quraşdırılmış bütün CLI agentlərini aşkarlayır. Nəticələr 60 saniyə keşlənir.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Qaytarır: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // məsələn, "codex", "claude"
  name: string; // Göstərilən ad
  binary: string; // İşə salınacaq binar faylın adı
  versionCommand: string; // Versiyanın aşkarlanması əmri
  version: string | null; // Aşkarlanmış versiya (quraşdırılmayıbsa null)
  installed: boolean; // Agentin quraşdırılıb-quraşdırılmadığı
  providerAlias: string; // OmniRoute daxilində provayder ID-si
  spawnArgs: string[]; // İşə salınarkən ötürüləcək arqumentlər
  protocol: "stdio" | "http"; // Rabitə protokolu
  isCustom?: boolean; // Bunun istifadəçi tərəfindən müəyyən edilmiş fərdi agent olub-olmadığı
}
```

#### `getAvailableAgents()`

Yalnız quraşdırılmış və ACP üçün əlçatan olan agentləri əldə edir.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Qaytarır: CliAgentInfo[] (yalnız quraşdırılmış agentlər)
```

#### `getAgentById(id)`

ID üzrə konkret agenti əldə edir.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Qaytarır: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Parametrlərdən fərdi agent təriflərini təyin edir.

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

### Menecer Funksiyaları

#### `acpManager.spawn(agentId, binary, args, env)`

Yeni CLI agent prosesi işə salır.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* fərdi mühit dəyişənləri */
});
// Qaytarır: AcpSession
```

**İcazə verilən agent ID-ləri**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

CLI agentinə sorğu göndərir və cavabı toplayır.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 dəqiqəlik vaxt limiti
);
// Qaytarır: Promise<string>
```

#### `acpManager.kill(sessionId)`

Sessiyanı dayandırır və təmizləmə aparır.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Qaytarır: boolean
```

#### `acpManager.getActiveSessions()`

Bütün aktiv sessiyaları əldə edir.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Qaytarır: AcpSession[]
```

#### `acpManager.killAll()`

Bütün sessiyaları dayandırır.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Sessiya İnterfeysi

```typescript
interface AcpSession {
  id: string; // Unikal sessiya ID-si
  agentId: string; // Agent ID-si (məsələn, "claude")
  process: ChildProcess; // Alt proses deskriptoru
  alive: boolean; // Prosesin aktiv olub-olmadığı
  stdoutBuffer: string; // Toplanmış stdout buferi
  stderrBuffer: string; // Toplanmış stderr buferi
  createdAt: Date; // Yaradılma vaxt nişanı
}
```

### Hadisələr

`AcpManager`, `EventEmitter` sinfini genişləndirir və aşağıdakı hadisələri yayır:

#### `stdout`

CLI agenti stdout-a yazdıqda yayılır.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

CLI agenti stderr-ə yazdıqda yayılır.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

CLI agent prosesi başa çatdıqda yayılır.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

CLI agent prosesində xəta baş verdikdə yayılır.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Konfiqurasiya

### Mühit Dəyişənləri

ACP bütün mühit dəyişənlərini ana prosesdən miras alır və xüsusi mühit dəyişənləri ilə genişləndirilə bilər:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### İşə Salma Arqumentləri

Hər agent üçün reyestrdə standart işə salma arqumentləri müəyyən edilib. Onları əvəz edə bilərsiniz:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Taymautlar

Sorğu üçün standart taymaut **120 saniyədir** (2 dəqiqə). Onu dəyişə bilərsiniz:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 dəqiqə
```

### Aşkarlama Keşi

Bahalı fayl sistemi skanlarının qarşısını almaq üçün agent aşkarlamasının nəticəsi **60 saniyə** keşdə saxlanılır. Məcburi yeniləmə:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Təhlükəsizlik

### Əmr İnjektiyasının Qarşısının Alınması

ACP əmr injeksiyası hücumlarının qarşısını almaq üçün versiya əmrlərini yoxlayır:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Bu simvolları ehtiva edən versiya əmrləri rədd edilir:

- `;` — Əmr ayırıcısı
- `&` — Fon prosesi
- `|` — Kanal
- `<`, `>` — Yönləndirmə
- `` ` `` — Əmr əvəzlənməsi
- `$` — Dəyişən genişləndirilməsi
- `\r`, `\n` — Sətir sonları

### Binar Fayl Adının Yoxlanması

ACP versiya əmrindəki binar fayl adının gözlənilən binar fayl adı ilə uyğunluğunu yoxlayır (xüsusi agent olmadığı halda).

### Proses İzolyasiyası

Hər ACP sessiyası ayrıca alt prosesdə işləyir. Sessiya başa çatdıqda və ya taymaut baş verdikdə proses dayandırılır.

---

## Məhsuldarlıq

### Aşkarlama Məhsuldarlığı

- **İlk çağırış**: ~50-200ms (hər agent üçün `version` əmrini icra edir)
- **Keşlənmiş çağırışlar**: <1ms (keşdən qaytarır)
- **Keş TTL-i**: 60 saniyə

### Sorğu Məhsuldarlığı

- **İşə salma**: ~50-100ms
- **Sorğunun göndərilməsi**: ~10-50ms
- **Cavabın gözlənilməsi**: CLI agentindən asılıdır (adətən 1-30 saniyə)
- **Dayandırma**: ~5 saniyə (SIGTERM) + dərhal (SIGKILL)

### Resurs İstifadəsi

- **Hər sessiya üzrə yaddaş**: ~10-50MB (CLI agentindən asılıdır)
- **CPU**: Minimal (I/O ilə məhdudlaşır)
- **Disk**: İstifadə edilmir

---

## Problemlərin Aradan Qaldırılması

### "Unknown agent" Xətası

**Problem**: `acpManager.spawn()` funksiyası `Unknown agent: <id>` xətası yaradır

**Həll**: `spawn()` daxilində yalnız bu agentlərə icazə verilir:

- `claude`
- `codex`
- `gemini`
- `qwen`

Digər agentlər əl ilə və ya xüsusi agent tərifləri vasitəsilə işə salınmalıdır.

### "Session not alive" Xətası

**Problem**: `acpManager.sendPrompt()` funksiyası `Session ${sessionId} is not alive` xətası yaradır

**Həll**: Sessiya başa çatmış və ya dayandırılmış ola bilər. Sessiyanın vəziyyətini yoxlayın:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Sessiyanı yenidən işə salın
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" Xətası

**Problem**: `acpManager.sendPrompt()` funksiyası `ACP timeout after 120000ms` xətası yaradır

**Həll**: Taymautu artırın:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 dəqiqə
```

### CLI Aşkarlanmadı

**Problem**: `detectInstalledAgents()` CLI-nizi tapa bilmir

**Həllər**:

1. **PATH-i yoxlayın**: CLI-nin sisteminizin PATH dəyişənində olduğuna əmin olun
2. **Versiya əmrini yoxlayın**: `claude --version` əmrini əl ilə icra edin
3. **İcazələri yoxlayın**: CLI-nin icra edilə bildiyinə əmin olun
4. **Xüsusi agent**: Standart olmayan CLI-lər üçün xüsusi agent tərifi əlavə edin

### İcazə Rədd Edildi

**Problem**: ACP CLI-ni icra edə bilmir

**Həllər**:

1. **Fayl icazələrini yoxlayın**: `chmod +x /usr/local/bin/claude`
2. **Sahibliyi yoxlayın**: OmniRoute-un oxuma/icra icazələrinə malik olduğuna əmin olun
3. **SELinux/AppArmor-u yoxlayın**: Prosesin işə salınmasını bloklaya bilər

---

## Nümunələr

### Nümunə 1: Claude Code-u işə salmaq və istifadə etmək

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Quraşdırılmış agentləri aşkarlayın
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Yeni sessiya başladın
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Sorğu göndərin
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Resursları təmizləyin
  acpManager.kill(session.id);
}
```

### Nümunə 2: Ehtiyat variantla avtomatik aşkarlama

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Əvvəlcə Claude-u sınayın, alınmasa Codex-dən istifadə edin
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

### Nümunə 3: Fərdi agent

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Fərdi CLI agentini qeydiyyatdan keçirin
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

// İndi detectInstalledAgents() nəticəsinə "my-llm-cli" daxil ediləcək
const agents = detectInstalledAgents();
```

---

## Növbəti addımlar

- **[API arayışı](../reference/API_REFERENCE.md)** — REST API son nöqtələri
- **[Provayder arayışı](../reference/PROVIDER_REFERENCE.md)** — Bütün 352 provayder
- **[MCP serveri](./MCP-SERVER.md)** — Model Context Protocol inteqrasiyası
- **[A2A serveri](./A2A-SERVER.md)** — Agentlərarası protokol
- **[Bulud agenti](./CLOUD_AGENT.md)** — Bulud əsaslı agentlər

---

## İstinad

- [AionUi layihəsi](https://github.com/iOfficeAI/AionUi) — ACP-nin avtomatik aşkarlanması üçün ilham mənbəyi
- [ACP mənbə kodu](../../src/lib/acp/) — Tətbiq detalları
  - `manager.ts` — Prosesin həyat dövrünün idarə edilməsi
  - `registry.ts` — Agentlərin aşkarlanması və qeydiyyatı
  - `index.ts` — İctimai API ixracları
