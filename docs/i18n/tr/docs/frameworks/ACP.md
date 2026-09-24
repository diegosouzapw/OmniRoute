# ACP (Agent Client Protocol) (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **Özet**: ACP, OmniRoute'un HTTP API'lerini kullanmak yerine CLI ajanlarını (Claude Code, Codex gibi) alt süreçler olarak başlatmasını sağlar. Bu, size "arka uç olarak CLI" aktarımı sunar.

---

## ACP Nedir?

ACP (Agent Client Protocol), OmniRoute için bir **"arka uç olarak CLI" aktarımıdır**. ACP, yapay zekâ sağlayıcılarına yapılan HTTP API çağrılarını yakalamak yerine **CLI ajanlarını alt süreçler olarak başlatır** ve istemleri bu ajanların yerel arayüzleri üzerinden iletir.

### Neden ACP Kullanılmalı?

| Avantaj                   | Açıklama                                                  |
| ------------------------- | --------------------------------------------------------- |
| **API anahtarı gerekmez** | Mevcut CLI kimlik doğrulamanızı kullanır                  |
| **Yerel protokol**        | Her CLI'ın yerel giriş/çıkış biçimini kullanır            |
| **Otomatik keşif**        | Sisteminizde yüklü CLI'ları algılar                       |
| **15 yerleşik ajan**      | Popüler CLI araçları için önceden yapılandırılmıştır      |
| **Özel ajanlar**          | Ayarlar aracılığıyla kendi CLI araçlarınızı ekleyin       |
| **Süreç yönetimi**        | Yaşam döngüsünü yönetir (başlatma, gönderme, sonlandırma) |

---

## Desteklenen CLI Ajanları

ACP, kutudan çıktığı hâliyle **15 yerleşik CLI ajanını** destekler:

| Ajan Kimliği  | Görünen Ad         | İkili Dosya   | Protokol |
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

### Özel Ajanlar

Ayarlar aracılığıyla kendi CLI ajanlarınızı ekleyebilirsiniz. Özel ajanlar, yerleşik ajanlarla aynı özellikleri destekler.

---

## Hızlı Başlangıç

### 1. Adım: Bir CLI Ajanı Yükleyin

```bash
# Örnek: Claude Code CLI'ı yükleyin
npm install -g @anthropic-ai/claude-code

# Yüklemeyi doğrulayın
claude --version
```

### 2. Adım: ACP Otomatik Algılama

ACP, sisteminizde yüklü CLI ajanlarını otomatik olarak algılar. Herhangi bir yapılandırma gerekmez!

### 3. Adım: ACP Aktarımını Kullanın

ACP algılandıktan sonra, desteklenen herhangi bir sağlayıcı için aktarım olarak kullanılabilir. OmniRoute, CLI kullanılabilir olduğunda ACP'yi otomatik olarak kullanır.

---

## ACP Nasıl Çalışır?

### Mimari

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP Proxy)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Alt Süreç      │
│  (CLI Ajanı)    │
│                 │
│  stdin  ◄──────┤  İstemi gönder
│  stdout ──────►│  Yanıtı al
│  stderr ──────►│  Hataları al
└─────────────────┘
```

### Süreç Yaşam Döngüsü

1. **Başlatma** — ACP, CLI ajanı için bir alt süreç oluşturur
2. **Gönderme** — ACP, istemleri sürecin stdin'ine yazar
3. **Alma** — ACP, yanıtları stdout/stderr'den okur
4. **Boşta Kalma Algılama** — ACP, yanıtı tamamlanmış kabul etmeden önce 2 saniye boyunca etkinlik olmamasını bekler
5. **Sonlandırma** — ACP, süreci sonlandırır (SIGTERM, ardından 5 saniye sonra SIGKILL)

### İletişim Protokolü

ACP, CLI ajanlarıyla iletişim kurmak için **stdio** (standart giriş/çıkış) kullanır. Protokol şu şekildedir:

1. **İstemi gönderme** — Satır sonu karakteriyle birlikte stdin'e yazılır
2. **Yanıtı bekleme** — Boşta kalana kadar stdout'tan okunur (2 saniye boyunca çıktı olmaması)
3. **Zaman aşımı** — Varsayılan olarak 120 saniyedir (yapılandırılabilir)

---

## API Referansı

### Kayıt Fonksiyonları

#### `detectInstalledAgents()`

Sistemde yüklü olan tüm CLI ajanlarını algılar. Sonuçlar 60 saniye boyunca önbelleğe alınır.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Döndürür: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // ör. "codex", "claude"
  name: string; // Görünen ad
  binary: string; // Başlatılacak ikili dosyanın adı
  versionCommand: string; // Sürüm algılama komutu
  version: string | null; // Algılanan sürüm (yüklü değilse null)
  installed: boolean; // Ajanın yüklü olup olmadığı
  providerAlias: string; // OmniRoute içindeki sağlayıcı kimliği
  spawnArgs: string[]; // Başlatma sırasında geçirilecek argümanlar
  protocol: "stdio" | "http"; // İletişim protokolü
  isCustom?: boolean; // Bunun kullanıcı tanımlı özel bir ajan olup olmadığı
}
```

#### `getAvailableAgents()`

Yalnızca yüklü ve ACP için kullanılabilir olan ajanları getirir.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Döndürür: CliAgentInfo[] (yalnızca yüklü ajanlar)
```

#### `getAgentById(id)`

Belirli bir ajanı kimliğine göre getirir.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Döndürür: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Ayarlardaki özel ajan tanımlarını belirler.

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

### Yönetici Fonksiyonları

#### `acpManager.spawn(agentId, binary, args, env)`

Yeni bir CLI ajan işlemi başlatır.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* özel ortam değişkenleri */
});
// Döndürür: AcpSession
```

**İzin verilen ajan kimlikleri**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Bir CLI ajanına istem gönderir ve yanıtı toplar.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 dakikalık zaman aşımı
);
// Döndürür: Promise<string>
```

#### `acpManager.kill(sessionId)`

Bir oturumu sonlandırır ve kaynakları temizler.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Döndürür: boolean
```

#### `acpManager.getActiveSessions()`

Tüm etkin oturumları getirir.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Döndürür: AcpSession[]
```

#### `acpManager.killAll()`

Tüm oturumları sonlandırır.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Oturum Arayüzü

```typescript
interface AcpSession {
  id: string; // Benzersiz oturum kimliği
  agentId: string; // Ajan kimliği (ör. "claude")
  process: ChildProcess; // Alt işlem tanıtıcısı
  alive: boolean; // İşlemin çalışır durumda olup olmadığı
  stdoutBuffer: string; // Birikmiş stdout arabelleği
  stderrBuffer: string; // Birikmiş stderr arabelleği
  createdAt: Date; // Oluşturulma zaman damgası
}
```

### Olaylar

`AcpManager`, `EventEmitter` sınıfını genişletir ve aşağıdaki olayları yayınlar:

#### `stdout`

CLI ajanı stdout'a yazdığında yayınlanır.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

CLI ajanı stderr'e yazdığında yayınlanır.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

CLI ajan işlemi sonlandığında yayınlanır.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

CLI ajan işleminde hata oluştuğunda yayınlanır.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Yapılandırma

### Ortam Değişkenleri

ACP, üst süreçteki tüm ortam değişkenlerini devralır ve özel ortam değişkenleriyle genişletilebilir:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Başlatma Argümanları

Her aracının kayıt defterinde tanımlanmış varsayılan başlatma argümanları vardır. Bunları geçersiz kılabilirsiniz:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Zaman Aşımları

Varsayılan istem zaman aşımı **120 saniyedir** (2 dakika). Bunu geçersiz kılabilirsiniz:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 dakika
```

### Algılama Önbelleği

Maliyetli dosya sistemi taramalarını önlemek için aracı algılama sonuçları **60 saniye** boyunca önbelleğe alınır. Yenilemeyi zorlamak için:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Güvenlik

### Komut Enjeksiyonunu Önleme

ACP, komut enjeksiyonu saldırılarını önlemek için sürüm komutlarını doğrular:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Bu karakterleri içeren sürüm komutları reddedilir:

- `;` — Komut ayırıcı
- `&` — Arka plan süreci
- `|` — Boru
- `<`, `>` — Yeniden yönlendirme
- `` ` `` — Komut ikamesi
- `$` — Değişken genişletme
- `\r`, `\n` — Satır sonları

### İkili Dosya Adı Doğrulaması

ACP, sürüm komutundaki ikili dosya adının beklenen ikili dosya adıyla eşleştiğini doğrular (özel bir aracı olmadığı sürece).

### Süreç Yalıtımı

Her ACP oturumu kendi alt sürecinde çalışır. Oturum sona erdiğinde veya zaman aşımına uğradığında süreç sonlandırılır.

---

## Performans

### Algılama Performansı

- **İlk çağrı**: ~50-200ms (her aracı için `version` komutunu çalıştırır)
- **Önbelleğe alınmış çağrılar**: <1ms (önbellekten döndürür)
- **Önbellek TTL'si**: 60 saniye

### İstem Performansı

- **Başlatma**: ~50-100ms
- **İstem gönderme**: ~10-50ms
- **Yanıtı bekleme**: CLI aracısına bağlıdır (genellikle 1-30 saniye)
- **Sonlandırma**: ~5 saniye (SIGTERM) + anında (SIGKILL)

### Kaynak Kullanımı

- **Oturum başına bellek**: ~10-50MB (CLI aracısına bağlıdır)
- **CPU**: Minimum düzeyde (G/Ç ağırlıklı)
- **Disk**: Yok

---

## Sorun Giderme

### "Unknown agent" Hatası

**Sorun**: `acpManager.spawn()`, `Unknown agent: <id>` hatası oluşturuyor

**Çözüm**: `spawn()` içinde yalnızca şu aracılara izin verilir:

- `claude`
- `codex`
- `gemini`
- `qwen`

Diğer aracılar manuel olarak veya özel aracı tanımları aracılığıyla başlatılmalıdır.

### "Session not alive" Hatası

**Sorun**: `acpManager.sendPrompt()`, `Session ${sessionId} is not alive` hatası oluşturuyor

**Çözüm**: Oturum sonlanmış veya sonlandırılmış olabilir. Oturum durumunu kontrol edin:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Oturumu yeniden başlatın
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" Hatası

**Sorun**: `acpManager.sendPrompt()`, `ACP timeout after 120000ms` hatası oluşturuyor

**Çözüm**: Zaman aşımını artırın:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 dakika
```

### CLI Algılanmadı

**Sorun**: `detectInstalledAgents()` CLI'nizi bulamıyor

**Çözümler**:

1. **PATH'i kontrol edin**: CLI'nin sistem PATH'inizde olduğundan emin olun
2. **Sürüm komutunu kontrol edin**: `claude --version` komutunu manuel olarak çalıştırın
3. **İzinleri kontrol edin**: CLI'nin çalıştırılabilir olduğundan emin olun
4. **Özel aracı**: Standart olmayan CLI'ler için özel bir aracı tanımı ekleyin

### İzin Reddedildi

**Sorun**: ACP, CLI'yi çalıştıramıyor

**Çözümler**:

1. **Dosya izinlerini kontrol edin**: `chmod +x /usr/local/bin/claude`
2. **Sahipliği kontrol edin**: OmniRoute'un okuma/çalıştırma izinlerine sahip olduğundan emin olun
3. **SELinux/AppArmor'u kontrol edin**: Süreç başlatmayı engelliyor olabilir

---

## Örnekler

### Örnek 1: Claude Code'u Başlatma ve Kullanma

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Yüklü ajanları algıla
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Yeni bir oturum başlat
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Bir istem gönder
  const response = await acpManager.sendPrompt(session.id, "Kuantum bilişimi 100 kelimeyle açıkla");

  console.log("Claude'un yanıtı:", response);

  // Kaynakları temizle
  acpManager.kill(session.id);
}
```

### Örnek 2: Geri Dönüş Seçenekli Otomatik Keşif

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Önce Claude'u dene, bulunamazsa Codex'i kullan
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("ACP uyumlu CLI ajanı bulunamadı");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "Merhaba!");

acpManager.kill(session.id);
```

### Örnek 3: Özel Ajan

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Özel bir CLI ajanı kaydet
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

// Artık detectInstalledAgents(), "my-llm-cli" ajanını da içerecek
const agents = detectInstalledAgents();
```

---

## Sırada Ne Var?

- **[API Referansı](../reference/API_REFERENCE.md)** — REST API uç noktaları
- **[Sağlayıcı Referansı](../reference/PROVIDER_REFERENCE.md)** — 352 sağlayıcının tamamı
- **[MCP Sunucusu](./MCP-SERVER.md)** — Model Context Protocol entegrasyonu
- **[A2A Sunucusu](./A2A-SERVER.md)** — Agent-to-Agent protokolü
- **[Bulut Ajanı](./CLOUD_AGENT.md)** — Bulut tabanlı ajanlar

---

## Referans

- [AionUi Projesi](https://github.com/iOfficeAI/AionUi) — ACP otomatik algılama özelliğinin ilham kaynağı
- [ACP Kaynak Kodu](../../src/lib/acp/) — Uygulama ayrıntıları
  - `manager.ts` — Süreç yaşam döngüsü yönetimi
  - `registry.ts` — Ajan keşfi ve kaydı
  - `index.ts` — Genel API dışa aktarımları
