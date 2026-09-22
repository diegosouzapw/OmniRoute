# ACP (Agent Client Protocol) (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **Tóm tắt**: ACP cho phép OmniRoute khởi chạy các tác nhân CLI (như Claude Code, Codex) dưới dạng tiến trình con thay vì sử dụng API HTTP. Điều này cung cấp cho bạn cơ chế truyền tải "CLI làm backend".

---

## ACP là gì?

ACP (Agent Client Protocol) là một cơ chế truyền tải **"CLI làm backend"** dành cho OmniRoute. Thay vì chặn các lệnh gọi API HTTP đến nhà cung cấp AI, ACP **khởi chạy các tác nhân CLI dưới dạng tiến trình con** và chuyển lời nhắc qua giao diện gốc của chúng.

### Tại sao nên sử dụng ACP?

| Lợi ích                      | Mô tả                                              |
| ---------------------------- | -------------------------------------------------- |
| **Không cần khóa API**       | Sử dụng thông tin xác thực CLI hiện có của bạn     |
| **Giao thức gốc**            | Sử dụng định dạng đầu vào/đầu ra gốc của từng CLI  |
| **Tự động phát hiện**        | Phát hiện các CLI đã cài đặt trên hệ thống của bạn |
| **15 tác nhân tích hợp sẵn** | Được cấu hình sẵn cho các công cụ CLI phổ biến     |
| **Tác nhân tùy chỉnh**       | Thêm công cụ CLI của riêng bạn thông qua cài đặt   |
| **Quản lý tiến trình**       | Xử lý vòng đời (khởi chạy, gửi, kết thúc)          |

---

## Các tác nhân CLI được hỗ trợ

ACP hỗ trợ sẵn **15 tác nhân CLI tích hợp**:

| ID tác nhân   | Tên hiển thị       | Tệp thực thi  | Giao thức |
| ------------- | ------------------ | ------------- | --------- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio     |
| `claude`      | Claude Code CLI    | `claude`      | stdio     |
| `goose`       | Goose CLI          | `goose`       | stdio     |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio     |
| `aider`       | Aider              | `aider`       | stdio     |
| `opencode`    | OpenCode           | `opencode`    | stdio     |
| `cline`       | Cline              | `cline`       | stdio     |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio     |
| `forge`       | ForgeCode          | `forge`       | stdio     |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio     |
| `interpreter` | Open Interpreter   | `interpreter` | stdio     |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio     |
| `warp`        | Warp AI            | `warp`        | stdio     |
| `gemini`      | Gemini CLI         | `gemini`      | stdio     |
| `zcode`       | ZCode              | `zcode`       | stdio     |

### Tác nhân tùy chỉnh

Bạn có thể thêm các tác nhân CLI của riêng mình thông qua phần cài đặt. Các tác nhân tùy chỉnh hỗ trợ những tính năng tương tự như tác nhân tích hợp sẵn.

---

## Bắt đầu nhanh

### Bước 1: Cài đặt một tác nhân CLI

```bash
# Ví dụ: Cài đặt Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Xác minh cài đặt
claude --version
```

### Bước 2: ACP tự động phát hiện

ACP tự động phát hiện các tác nhân CLI đã cài đặt trên hệ thống của bạn. Không cần cấu hình!

### Bước 3: Sử dụng cơ chế truyền tải ACP

Sau khi được phát hiện, ACP có thể được sử dụng làm cơ chế truyền tải cho bất kỳ nhà cung cấp nào được hỗ trợ. OmniRoute sẽ tự động sử dụng ACP khi CLI khả dụng.

---

## Cách ACP hoạt động

### Kiến trúc

```
┌─────────────────┐
│  OmniRoute      │
│  (Proxy HTTP)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Tiến trình con │
│  (Tác nhân CLI) │
│                 │
│  stdin  ◄──────┤  Gửi lời nhắc
│  stdout ──────►│  Nhận phản hồi
│  stderr ──────►│  Nhận lỗi
└─────────────────┘
```

### Vòng đời tiến trình

1. **Khởi chạy** — ACP tạo một tiến trình con cho tác nhân CLI
2. **Gửi** — ACP ghi lời nhắc vào stdin của tiến trình
3. **Nhận** — ACP đọc phản hồi từ stdout/stderr
4. **Phát hiện trạng thái nhàn rỗi** — ACP chờ 2 giây không có hoạt động trước khi coi phản hồi là hoàn tất
5. **Kết thúc** — ACP chấm dứt tiến trình (SIGTERM, sau đó là SIGKILL sau 5 giây)

### Giao thức giao tiếp

ACP sử dụng **stdio** (đầu vào/đầu ra tiêu chuẩn) để giao tiếp với các tác nhân CLI. Giao thức như sau:

1. **Gửi lời nhắc** — Ghi vào stdin kèm theo một ký tự xuống dòng
2. **Chờ phản hồi** — Đọc từ stdout cho đến khi không còn hoạt động (không có đầu ra trong 2 giây)
3. **Thời gian chờ** — Mặc định là 120 giây (có thể cấu hình)

---

## Tham chiếu API

### Các hàm Registry

#### `detectInstalledAgents()`

Phát hiện tất cả CLI agent đã cài đặt trên hệ thống. Kết quả được lưu vào bộ nhớ đệm trong 60 giây.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Trả về: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // ví dụ: "codex", "claude"
  name: string; // Tên hiển thị
  binary: string; // Tên tệp thực thi sẽ được khởi chạy
  versionCommand: string; // Lệnh phát hiện phiên bản
  version: string | null; // Phiên bản được phát hiện (null nếu chưa cài đặt)
  installed: boolean; // Agent có được cài đặt hay không
  providerAlias: string; // ID nhà cung cấp trong OmniRoute
  spawnArgs: string[]; // Các đối số sẽ truyền khi khởi chạy
  protocol: "stdio" | "http"; // Giao thức giao tiếp
  isCustom?: boolean; // Đây có phải là agent tùy chỉnh do người dùng định nghĩa hay không
}
```

#### `getAvailableAgents()`

Chỉ lấy các agent đã được cài đặt và có sẵn cho ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Trả về: CliAgentInfo[] (chỉ các agent đã cài đặt)
```

#### `getAgentById(id)`

Lấy một agent cụ thể theo ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Trả về: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Thiết lập các định nghĩa agent tùy chỉnh từ phần cài đặt.

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

### Các hàm Manager

#### `acpManager.spawn(agentId, binary, args, env)`

Khởi chạy một tiến trình CLI agent mới.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* các biến môi trường tùy chỉnh */
});
// Trả về: AcpSession
```

**Các ID agent được phép**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Gửi một prompt đến CLI agent và thu thập phản hồi.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // thời gian chờ 2 phút
);
// Trả về: Promise<string>
```

#### `acpManager.kill(sessionId)`

Dừng một phiên và dọn dẹp tài nguyên.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Trả về: boolean
```

#### `acpManager.getActiveSessions()`

Lấy tất cả các phiên đang hoạt động.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Trả về: AcpSession[]
```

#### `acpManager.killAll()`

Dừng tất cả các phiên.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Interface phiên

```typescript
interface AcpSession {
  id: string; // ID phiên duy nhất
  agentId: string; // ID agent (ví dụ: "claude")
  process: ChildProcess; // Handle của tiến trình con
  alive: boolean; // Tiến trình có đang hoạt động hay không
  stdoutBuffer: string; // Bộ đệm stdout được tích lũy
  stderrBuffer: string; // Bộ đệm stderr được tích lũy
  createdAt: Date; // Dấu thời gian tạo
}
```

### Sự kiện

`AcpManager` mở rộng `EventEmitter` và phát ra các sự kiện sau:

#### `stdout`

Được phát ra khi CLI agent ghi vào stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Được phát ra khi CLI agent ghi vào stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Được phát ra khi tiến trình CLI agent thoát.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Được phát ra khi tiến trình CLI agent gặp lỗi.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Cấu hình

### Biến môi trường

ACP kế thừa tất cả biến môi trường từ tiến trình cha và có thể được mở rộng bằng các biến môi trường tùy chỉnh:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Đối số khởi chạy

Mỗi agent có các đối số khởi chạy mặc định được định nghĩa trong registry. Bạn có thể ghi đè chúng:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Thời gian chờ

Thời gian chờ mặc định cho prompt là **120 giây** (2 phút). Bạn có thể ghi đè:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 phút
```

### Bộ nhớ đệm phát hiện

Kết quả phát hiện agent được lưu vào bộ nhớ đệm trong **60 giây** để tránh các lần quét hệ thống tệp tốn kém. Buộc làm mới:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Bảo mật

### Ngăn chặn chèn lệnh

ACP xác thực các lệnh kiểm tra phiên bản để ngăn chặn các cuộc tấn công chèn lệnh:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Các lệnh kiểm tra phiên bản chứa những ký tự sau sẽ bị từ chối:

- `;` — Dấu phân cách lệnh
- `&` — Tiến trình nền
- `|` — Đường ống
- `<`, `>` — Chuyển hướng
- `` ` `` — Thay thế lệnh
- `$` — Mở rộng biến
- `\r`, `\n` — Ngắt dòng

### Xác thực tên tệp nhị phân

ACP xác thực rằng tệp nhị phân trong lệnh kiểm tra phiên bản khớp với tên tệp nhị phân dự kiến (trừ khi đó là agent tùy chỉnh).

### Cô lập tiến trình

Mỗi phiên ACP chạy trong một tiến trình con riêng. Tiến trình sẽ bị kết thúc khi phiên kết thúc hoặc hết thời gian chờ.

---

## Hiệu suất

### Hiệu suất phát hiện

- **Lần gọi đầu tiên**: ~50-200ms (chạy lệnh `version` cho từng agent)
- **Các lần gọi được lưu vào bộ nhớ đệm**: <1ms (trả về từ bộ nhớ đệm)
- **TTL của bộ nhớ đệm**: 60 giây

### Hiệu suất xử lý prompt

- **Khởi chạy**: ~50-100ms
- **Gửi prompt**: ~10-50ms
- **Chờ phản hồi**: Phụ thuộc vào CLI agent (thường từ 1-30 giây)
- **Kết thúc**: ~5 giây (SIGTERM) + ngay lập tức (SIGKILL)

### Mức sử dụng tài nguyên

- **Bộ nhớ cho mỗi phiên**: ~10-50MB (phụ thuộc vào CLI agent)
- **CPU**: Tối thiểu (bị giới hạn bởi I/O)
- **Đĩa**: Không sử dụng

---

## Khắc phục sự cố

### Lỗi "Unknown agent"

**Vấn đề**: `acpManager.spawn()` ném ra lỗi `Unknown agent: <id>`

**Giải pháp**: Chỉ những agent sau được phép sử dụng trong `spawn()`:

- `claude`
- `codex`
- `gemini`
- `qwen`

Các agent khác phải được khởi chạy thủ công hoặc thông qua các định nghĩa agent tùy chỉnh.

### Lỗi "Session not alive"

**Vấn đề**: `acpManager.sendPrompt()` ném ra lỗi `Session ${sessionId} is not alive`

**Giải pháp**: Phiên có thể đã thoát hoặc bị kết thúc. Hãy kiểm tra trạng thái phiên:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Khởi chạy lại phiên
  acpManager.spawn("claude", "claude", [], {});
}
```

### Lỗi "ACP timeout"

**Vấn đề**: `acpManager.sendPrompt()` ném ra lỗi `ACP timeout after 120000ms`

**Giải pháp**: Tăng thời gian chờ:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 phút
```

### Không phát hiện được CLI

**Vấn đề**: `detectInstalledAgents()` không tìm thấy CLI của bạn

**Giải pháp**:

1. **Kiểm tra PATH**: Đảm bảo CLI nằm trong PATH của hệ thống
2. **Kiểm tra lệnh phiên bản**: Chạy thủ công `claude --version`
3. **Kiểm tra quyền**: Đảm bảo CLI có thể thực thi
4. **Agent tùy chỉnh**: Thêm định nghĩa agent tùy chỉnh cho các CLI không tiêu chuẩn

### Quyền bị từ chối

**Vấn đề**: ACP không thể thực thi CLI

**Giải pháp**:

1. **Kiểm tra quyền tệp**: `chmod +x /usr/local/bin/claude`
2. **Kiểm tra quyền sở hữu**: Đảm bảo OmniRoute có quyền đọc/thực thi
3. **Kiểm tra SELinux/AppArmor**: Có thể chặn việc khởi chạy tiến trình

---

## Ví dụ

### Ví dụ 1: Khởi chạy và sử dụng Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Phát hiện các agent đã cài đặt
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Khởi chạy một phiên mới
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Gửi một prompt
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Dọn dẹp
  acpManager.kill(session.id);
}
```

### Ví dụ 2: Tự động khám phá với phương án dự phòng

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Thử Claude trước, dùng Codex làm phương án dự phòng
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

### Ví dụ 3: Agent tùy chỉnh

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Đăng ký một agent CLI tùy chỉnh
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

// Giờ đây detectInstalledAgents() sẽ bao gồm "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Tiếp theo là gì?

- **[Tài liệu tham khảo API](../reference/API_REFERENCE.md)** — Các endpoint REST API
- **[Tài liệu tham khảo nhà cung cấp](../reference/PROVIDER_REFERENCE.md)** — Toàn bộ 352 nhà cung cấp
- **[Máy chủ MCP](./MCP-SERVER.md)** — Tích hợp Model Context Protocol
- **[Máy chủ A2A](./A2A-SERVER.md)** — Giao thức Agent-to-Agent
- **[Cloud Agent](./CLOUD_AGENT.md)** — Các agent dựa trên đám mây

---

## Tài liệu tham khảo

- [Dự án AionUi](https://github.com/iOfficeAI/AionUi) — Nguồn cảm hứng cho tính năng tự động phát hiện ACP
- [Mã nguồn ACP](../../src/lib/acp/) — Chi tiết triển khai
  - `manager.ts` — Quản lý vòng đời tiến trình
  - `registry.ts` — Khám phá và đăng ký agent
  - `index.ts` — Các phần xuất API công khai
