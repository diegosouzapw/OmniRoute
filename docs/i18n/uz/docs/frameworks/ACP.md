# ACP (Agent Client Protocol) (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **Qisqacha**: ACP OmniRoute’ga HTTP API’lardan foydalanish o‘rniga CLI agentlarini (masalan, Claude Code, Codex) quyi jarayonlar sifatida ishga tushirish imkonini beradi. Bu sizga «CLI-backend sifatida» transportini taqdim etadi.

---

## ACP nima?

ACP (Agent Client Protocol) — OmniRoute uchun **«CLI-backend sifatida» transporti**. AI provayderlariga yuboriladigan HTTP API chaqiruvlarini tutib olish o‘rniga, ACP **CLI agentlarini quyi jarayonlar sifatida ishga tushiradi** va so‘rovlarni ularning mahalliy interfeysi orqali uzatadi.

### Nima uchun ACP’dan foydalanish kerak?

| Afzallik                     | Tavsif                                                              |
| ---------------------------- | ------------------------------------------------------------------- |
| **API kalitlari kerak emas** | Mavjud CLI autentifikatsiyangizdan foydalanadi                      |
| **Mahalliy protokol**        | Har bir CLI’ning mahalliy kiritish/chiqarish formatidan foydalanadi |
| **Avtomatik aniqlash**       | Tizimingizda o‘rnatilgan CLI’larni aniqlaydi                        |
| **15 ta ichki agent**        | Ommabop CLI vositalari uchun oldindan sozlangan                     |
| **Maxsus agentlar**          | Sozlamalar orqali o‘z CLI vositalaringizni qo‘shing                 |
| **Jarayonlarni boshqarish**  | Hayotiy siklni boshqaradi (ishga tushirish, yuborish, to‘xtatish)   |

---

## Qo‘llab-quvvatlanadigan CLI agentlari

ACP standart holatda **15 ta ichki CLI agentini** qo‘llab-quvvatlaydi:

| Agent ID      | Ko‘rsatiladigan nom | Binar fayl    | Protokol |
| ------------- | ------------------- | ------------- | -------- |
| `codex`       | OpenAI Codex CLI    | `codex`       | stdio    |
| `claude`      | Claude Code CLI     | `claude`      | stdio    |
| `goose`       | Goose CLI           | `goose`       | stdio    |
| `openclaw`    | OpenClaw            | `openclaw`    | stdio    |
| `aider`       | Aider               | `aider`       | stdio    |
| `opencode`    | OpenCode            | `opencode`    | stdio    |
| `cline`       | Cline               | `cline`       | stdio    |
| `qwen`        | Qwen Code           | `qwen --acp`  | stdio    |
| `forge`       | ForgeCode           | `forge`       | stdio    |
| `amazon-q`    | Amazon Q Developer  | `q`           | stdio    |
| `interpreter` | Open Interpreter    | `interpreter` | stdio    |
| `cursor-cli`  | Cursor CLI          | `cursor`      | stdio    |
| `warp`        | Warp AI             | `warp`        | stdio    |
| `gemini`      | Gemini CLI          | `gemini`      | stdio    |
| `zcode`       | ZCode               | `zcode`       | stdio    |

### Maxsus agentlar

Sozlamalar orqali o‘z CLI agentlaringizni qo‘shishingiz mumkin. Maxsus agentlar ichki agentlar bilan bir xil imkoniyatlarni qo‘llab-quvvatlaydi.

---

## Tezkor boshlash

### 1-qadam: CLI agentini o‘rnating

```bash
# Misol: Claude Code CLI’ni o‘rnating
npm install -g @anthropic-ai/claude-code

# O‘rnatilganini tekshiring
claude --version
```

### 2-qadam: ACP orqali avtomatik aniqlash

ACP tizimingizda o‘rnatilgan CLI agentlarini avtomatik ravishda aniqlaydi. Hech qanday konfiguratsiya talab qilinmaydi!

### 3-qadam: ACP transportidan foydalaning

Aniqlangandan so‘ng, ACP’dan qo‘llab-quvvatlanadigan istalgan provayder uchun transport sifatida foydalanish mumkin. CLI mavjud bo‘lsa, OmniRoute avtomatik ravishda ACP’dan foydalanadi.

---

## ACP qanday ishlaydi?

### Arxitektura

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP proksi)  │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Quyi jarayon   │
│  (CLI agenti)   │
│                 │
│  stdin  ◄──────┤  So‘rovni yuborish
│  stdout ──────►│  Javobni qabul qilish
│  stderr ──────►│  Xatolarni qabul qilish
└─────────────────┘
```

### Jarayonning hayotiy sikli

1. **Ishga tushirish** — ACP CLI agenti uchun quyi jarayon yaratadi
2. **Yuborish** — ACP so‘rovlarni jarayonning stdin oqimiga yozadi
3. **Qabul qilish** — ACP javoblarni stdout/stderr oqimlaridan o‘qiydi
4. **Faolsizlikni aniqlash** — Javobni yakunlangan deb hisoblashdan oldin ACP 2 soniyalik faolsizlikni kutadi
5. **To‘xtatish** — ACP jarayonni to‘xtatadi (SIGTERM, so‘ng 5 soniyadan keyin SIGKILL)

### Aloqa protokoli

ACP CLI agentlari bilan aloqa qilish uchun **stdio**’dan (standart kiritish/chiqarish) foydalanadi. Protokol quyidagicha:

1. **So‘rovni yuborish** — Yangi satr belgisi bilan stdin oqimiga yozish
2. **Javobni kutish** — Faolsizlik yuz berguncha stdout oqimidan o‘qish (2 soniya davomida chiqish bo‘lmasa)
3. **Taym-aut** — Standart qiymat 120 soniya (sozlanishi mumkin)

---

## API ma’lumotnomasi

### Reestr funksiyalari

#### `detectInstalledAgents()`

Tizimda o‘rnatilgan barcha CLI agentlarini aniqlaydi. Natijalar 60 soniya davomida keshda saqlanadi.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Qaytaradi: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // masalan, "codex", "claude"
  name: string; // Ko‘rsatiladigan nom
  binary: string; // Ishga tushiriladigan ikkilik fayl nomi
  versionCommand: string; // Versiyani aniqlash buyrug‘i
  version: string | null; // Aniqlangan versiya (o‘rnatilmagan bo‘lsa null)
  installed: boolean; // Agent o‘rnatilgan yoki o‘rnatilmaganligi
  providerAlias: string; // OmniRoute ichidagi provayder IDsi
  spawnArgs: string[]; // Ishga tushirishda uzatiladigan argumentlar
  protocol: "stdio" | "http"; // Aloqa protokoli
  isCustom?: boolean; // Bu foydalanuvchi belgilagan maxsus agent yoki yo‘qligi
}
```

#### `getAvailableAgents()`

Faqat o‘rnatilgan va ACP uchun mavjud agentlarni oladi.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Qaytaradi: CliAgentInfo[] (faqat o‘rnatilgan agentlar)
```

#### `getAgentById(id)`

Muayyan agentni ID bo‘yicha oladi.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Qaytaradi: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Sozlamalardan maxsus agent ta’riflarini o‘rnatadi.

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

### Menejer funksiyalari

#### `acpManager.spawn(agentId, binary, args, env)`

Yangi CLI agent jarayonini ishga tushiradi.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* maxsus muhit o‘zgaruvchilari */
});
// Qaytaradi: AcpSession
```

**Ruxsat etilgan agent IDlari**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

CLI agentiga so‘rov yuboradi va javobni yig‘adi.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 daqiqalik kutish vaqti
);
// Qaytaradi: Promise<string>
```

#### `acpManager.kill(sessionId)`

Seansni tugatadi va resurslarni tozalaydi.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Qaytaradi: boolean
```

#### `acpManager.getActiveSessions()`

Barcha faol seanslarni oladi.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Qaytaradi: AcpSession[]
```

#### `acpManager.killAll()`

Barcha seanslarni tugatadi.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Seans interfeysi

```typescript
interface AcpSession {
  id: string; // Noyob seans IDsi
  agentId: string; // Agent IDsi (masalan, "claude")
  process: ChildProcess; // Ichki jarayon deskriptori
  alive: boolean; // Jarayon faol yoki faol emasligi
  stdoutBuffer: string; // Yig‘ilgan stdout buferi
  stderrBuffer: string; // Yig‘ilgan stderr buferi
  createdAt: Date; // Yaratilgan vaqt belgisi
}
```

### Hodisalar

`AcpManager` `EventEmitter` imkoniyatlarini kengaytiradi va quyidagi hodisalarni chiqaradi:

#### `stdout`

CLI agenti stdout’ga yozganda chiqariladi.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

CLI agenti stderr’ga yozganda chiqariladi.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

CLI agent jarayoni yakunlanganda chiqariladi.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

CLI agent jarayonida xatolik yuz berganda chiqariladi.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Konfiguratsiya

### Muhit o‘zgaruvchilari

ACP ota-jarayondagi barcha muhit o‘zgaruvchilarini meros qilib oladi va ularni maxsus muhit o‘zgaruvchilari bilan kengaytirish mumkin:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Ishga tushirish argumentlari

Har bir agent uchun reyestrda standart ishga tushirish argumentlari belgilangan. Ularni qayta belgilashingiz mumkin:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Vaqt cheklovlari

So‘rov uchun standart vaqt cheklovi **120 soniya** (2 daqiqa). Uni qayta belgilashingiz mumkin:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 daqiqa
```

### Aniqlash keshi

Qimmatga tushadigan fayl tizimi tekshiruvlarini oldini olish uchun agentni aniqlash natijasi **60 soniya** davomida keshlanadi. Majburiy yangilash:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Xavfsizlik

### Buyruq kiritish hujumlarining oldini olish

ACP buyruq kiritish hujumlarining oldini olish uchun versiya buyruqlarini tekshiradi:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Quyidagi belgilarni o‘z ichiga olgan versiya buyruqlari rad etiladi:

- `;` — Buyruq ajratgichi
- `&` — Fon jarayoni
- `|` — Konveyer
- `<`, `>` — Qayta yo‘naltirish
- `` ` `` — Buyruqni almashtirish
- `$` — O‘zgaruvchini kengaytirish
- `\r`, `\n` — Satr uzilishlari

### Binar fayl nomini tekshirish

ACP versiya buyrug‘idagi binar fayl nomi kutilgan binar fayl nomiga mos kelishini tekshiradi (maxsus agent bo‘lmasa).

### Jarayonlarni izolyatsiyalash

Har bir ACP sessiyasi alohida ichki jarayonda ishlaydi. Sessiya tugaganda yoki vaqt cheklovi oshib ketganda jarayon to‘xtatiladi.

---

## Unumdorlik

### Aniqlash unumdorligi

- **Birinchi chaqiruv**: ~50-200ms (har bir agent uchun `version` buyrug‘ini ishga tushiradi)
- **Keshlangan chaqiruvlar**: <1ms (keshdan qaytaradi)
- **Kesh TTL**: 60 soniya

### So‘rov unumdorligi

- **Ishga tushirish**: ~50-100ms
- **So‘rov yuborish**: ~10-50ms
- **Javobni kutish**: CLI agentiga bog‘liq (odatda 1-30 soniya)
- **To‘xtatish**: ~5 soniya (SIGTERM) + darhol (SIGKILL)

### Resurslardan foydalanish

- **Har bir sessiya uchun xotira**: ~10-50MB (CLI agentiga bog‘liq)
- **CPU**: Minimal (I/O bilan cheklangan)
- **Disk**: Ishlatilmaydi

---

## Muammolarni bartaraf etish

### "Unknown agent" xatosi

**Muammo**: `acpManager.spawn()` `Unknown agent: <id>` xatosini chiqaradi

**Yechim**: `spawn()` ichida faqat quyidagi agentlardan foydalanishga ruxsat etiladi:

- `claude`
- `codex`
- `gemini`
- `qwen`

Boshqa agentlarni qo‘lda yoki maxsus agent ta’riflari orqali ishga tushirish kerak.

### "Session not alive" xatosi

**Muammo**: `acpManager.sendPrompt()` `Session ${sessionId} is not alive` xatosini chiqaradi

**Yechim**: Sessiya yakunlangan yoki to‘xtatilgan bo‘lishi mumkin. Sessiya holatini tekshiring:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Sessiyani qayta ishga tushirish
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" xatosi

**Muammo**: `acpManager.sendPrompt()` `ACP timeout after 120000ms` xatosini chiqaradi

**Yechim**: Vaqt cheklovini oshiring:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 daqiqa
```

### CLI aniqlanmadi

**Muammo**: `detectInstalledAgents()` CLI’ingizni topmayapti

**Yechimlar**:

1. **PATH’ni tekshiring**: CLI tizimingizdagi PATH ichida ekanligiga ishonch hosil qiling
2. **Versiya buyrug‘ini tekshiring**: `claude --version` buyrug‘ini qo‘lda ishga tushiring
3. **Ruxsatlarni tekshiring**: CLI bajarilishi mumkinligiga ishonch hosil qiling
4. **Maxsus agent**: Nostandart CLI’lar uchun maxsus agent ta’rifini qo‘shing

### Ruxsat rad etildi

**Muammo**: ACP CLI’ni bajara olmayapti

**Yechimlar**:

1. **Fayl ruxsatlarini tekshiring**: `chmod +x /usr/local/bin/claude`
2. **Egalik huquqini tekshiring**: OmniRoute o‘qish/bajarish ruxsatlariga ega ekanligiga ishonch hosil qiling
3. **SELinux/AppArmor’ni tekshiring**: Jarayonni ishga tushirishni bloklashi mumkin

---

## Misollar

### 1-misol: Claude Code’ni ishga tushirish va undan foydalanish

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// O‘rnatilgan agentlarni aniqlash
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Yangi seansni ishga tushirish
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // So‘rov yuborish
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Resurslarni tozalash
  acpManager.kill(session.id);
}
```

### 2-misol: Zaxira variantli avtomatik aniqlash

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Avval Claude’ni sinab ko‘rish, mavjud bo‘lmasa Codex’dan foydalanish
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

### 3-misol: Maxsus agent

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Maxsus CLI agentini ro‘yxatdan o‘tkazish
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

// Endi detectInstalledAgents() tarkibida "my-llm-cli" ham bo‘ladi
const agents = detectInstalledAgents();
```

---

## Keyingi qadamlar

- **[API ma’lumotnomasi](../reference/API_REFERENCE.md)** — REST API so‘nggi nuqtalari
- **[Provayderlar ma’lumotnomasi](../reference/PROVIDER_REFERENCE.md)** — Barcha 352 ta provayder
- **[MCP serveri](./MCP-SERVER.md)** — Model Context Protocol integratsiyasi
- **[A2A serveri](./A2A-SERVER.md)** — Agent-to-Agent protokoli
- **[Bulutli agent](./CLOUD_AGENT.md)** — Bulutga asoslangan agentlar

---

## Ma’lumotnoma

- [AionUi loyihasi](https://github.com/iOfficeAI/AionUi) — ACP’ni avtomatik aniqlash uchun ilhom manbai
- [ACP manba kodi](../../src/lib/acp/) — Amalga oshirish tafsilotlari
  - `manager.ts` — Jarayonning hayot siklini boshqarish
  - `registry.ts` — Agentlarni aniqlash va ro‘yxatdan o‘tkazish
  - `index.ts` — Ommaviy API eksportlari
