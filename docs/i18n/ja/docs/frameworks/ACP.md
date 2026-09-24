# ACP (Agent Client Protocol) (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **要約**: ACPを使用すると、OmniRouteはHTTP APIを使用する代わりに、CLIエージェント（Claude Code、Codexなど）を子プロセスとして起動できます。これにより、「バックエンドとしてのCLI」トランスポートを利用できます。

---

## ACPとは？

ACP（Agent Client Protocol）は、OmniRoute向けの**「バックエンドとしてのCLI」トランスポート**です。AIプロバイダーへのHTTP API呼び出しをインターセプトする代わりに、ACPは**CLIエージェントを子プロセスとして起動**し、それぞれのネイティブインターフェースを介してプロンプトを送信します。

### ACPを使用する理由

| メリット                       | 説明                                            |
| ------------------------------ | ----------------------------------------------- |
| **APIキーが不要**              | 既存のCLI認証を使用します                       |
| **ネイティブプロトコル**       | 各CLIのネイティブな入出力形式を使用します       |
| **自動検出**                   | システムにインストールされているCLIを検出します |
| **15個の組み込みエージェント** | 一般的なCLIツール向けに事前設定されています     |
| **カスタムエージェント**       | 設定から独自のCLIツールを追加できます           |
| **プロセス管理**               | ライフサイクル（起動、送信、終了）を処理します  |

---

## 対応しているCLIエージェント

ACPは、標準で**15個の組み込みCLIエージェント**をサポートしています。

| エージェントID | 表示名             | バイナリ      | プロトコル |
| -------------- | ------------------ | ------------- | ---------- |
| `codex`        | OpenAI Codex CLI   | `codex`       | stdio      |
| `claude`       | Claude Code CLI    | `claude`      | stdio      |
| `goose`        | Goose CLI          | `goose`       | stdio      |
| `openclaw`     | OpenClaw           | `openclaw`    | stdio      |
| `aider`        | Aider              | `aider`       | stdio      |
| `opencode`     | OpenCode           | `opencode`    | stdio      |
| `cline`        | Cline              | `cline`       | stdio      |
| `qwen`         | Qwen Code          | `qwen --acp`  | stdio      |
| `forge`        | ForgeCode          | `forge`       | stdio      |
| `amazon-q`     | Amazon Q Developer | `q`           | stdio      |
| `interpreter`  | Open Interpreter   | `interpreter` | stdio      |
| `cursor-cli`   | Cursor CLI         | `cursor`      | stdio      |
| `warp`         | Warp AI            | `warp`        | stdio      |
| `gemini`       | Gemini CLI         | `gemini`      | stdio      |
| `zcode`        | ZCode              | `zcode`       | stdio      |

### カスタムエージェント

設定から独自のCLIエージェントを追加できます。カスタムエージェントは、組み込みエージェントと同じ機能をサポートします。

---

## クイックスタート

### ステップ1：CLIエージェントをインストールする

```bash
# 例：Claude Code CLIをインストール
npm install -g @anthropic-ai/claude-code

# インストールを確認
claude --version
```

### ステップ2：ACPによる自動検出

ACPは、システムにインストールされているCLIエージェントを自動的に検出します。設定は不要です！

### ステップ3：ACPトランスポートを使用する

検出後、ACPをサポート対象の任意のプロバイダーのトランスポートとして使用できます。CLIが利用可能な場合、OmniRouteはACPを自動的に使用します。

---

## ACPの仕組み

### アーキテクチャ

```
┌─────────────────┐
│  OmniRoute      │
│  （HTTPプロキシ）   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  子プロセス     │
│  （CLIエージェント） │
│                 │
│  stdin  ◄──────┤  プロンプトを送信
│  stdout ──────►│  応答を受信
│  stderr ──────►│  エラーを受信
└─────────────────┘
```

### プロセスのライフサイクル

1. **起動** — ACPがCLIエージェントの子プロセスを作成します
2. **送信** — ACPがプロンプトをプロセスのstdinに書き込みます
3. **受信** — ACPがstdout/stderrから応答を読み取ります
4. **アイドル検出** — ACPは、応答が完了したと判断する前に2秒間出力がないことを待ちます
5. **終了** — ACPがプロセスを終了します（SIGTERMを送信し、5秒後にSIGKILLを送信）

### 通信プロトコル

ACPは、CLIエージェントとの通信に**stdio**（標準入出力）を使用します。プロトコルは次のとおりです。

1. **プロンプトを送信** — 改行を付けてstdinに書き込みます
2. **応答を待機** — アイドル状態になるまでstdoutから読み取ります（2秒間出力なし）
3. **タイムアウト** — デフォルトは120秒です（設定可能）

---

## APIリファレンス

### レジストリ関数

#### `detectInstalledAgents()`

システムにインストールされているすべてのCLIエージェントを検出します。結果は60秒間キャッシュされます。

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// 戻り値: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // 例: "codex", "claude"
  name: string; // 表示名
  binary: string; // 起動するバイナリ名
  versionCommand: string; // バージョン検出コマンド
  version: string | null; // 検出されたバージョン（インストールされていない場合はnull）
  installed: boolean; // エージェントがインストールされているかどうか
  providerAlias: string; // OmniRoute内のプロバイダーID
  spawnArgs: string[]; // 起動時に渡す引数
  protocol: "stdio" | "http"; // 通信プロトコル
  isCustom?: boolean; // ユーザー定義のカスタムエージェントかどうか
}
```

#### `getAvailableAgents()`

インストール済みでACPに使用可能なエージェントのみを取得します。

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// 戻り値: CliAgentInfo[]（インストール済みのエージェントのみ）
```

#### `getAgentById(id)`

IDを指定して特定のエージェントを取得します。

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// 戻り値: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

設定からカスタムエージェント定義を設定します。

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

### マネージャー関数

#### `acpManager.spawn(agentId, binary, args, env)`

新しいCLIエージェントプロセスを起動します。

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* カスタム環境変数 */
});
// 戻り値: AcpSession
```

**許可されているエージェントID**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

CLIエージェントにプロンプトを送信し、レスポンスを収集します。

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2分のタイムアウト
);
// 戻り値: Promise<string>
```

#### `acpManager.kill(sessionId)`

セッションを終了し、クリーンアップします。

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// 戻り値: boolean
```

#### `acpManager.getActiveSessions()`

すべてのアクティブなセッションを取得します。

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// 戻り値: AcpSession[]
```

#### `acpManager.killAll()`

すべてのセッションを終了します。

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### セッションインターフェース

```typescript
interface AcpSession {
  id: string; // 一意のセッションID
  agentId: string; // エージェントID（例: "claude"）
  process: ChildProcess; // 子プロセスのハンドル
  alive: boolean; // プロセスが実行中かどうか
  stdoutBuffer: string; // 累積されたstdoutバッファ
  stderrBuffer: string; // 累積されたstderrバッファ
  createdAt: Date; // 作成日時
}
```

### イベント

`AcpManager`は`EventEmitter`を拡張し、以下のイベントを発行します。

#### `stdout`

CLIエージェントがstdoutに書き込んだときに発行されます。

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

CLIエージェントがstderrに書き込んだときに発行されます。

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

CLIエージェントプロセスが終了したときに発行されます。

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

CLIエージェントプロセスでエラーが発生したときに発行されます。

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## 設定

### 環境変数

ACP は親プロセスからすべての環境変数を継承し、カスタム環境変数で拡張できます。

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### 起動引数

各エージェントには、レジストリで定義されたデフォルトの起動引数があります。これらは上書きできます。

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### タイムアウト

デフォルトのプロンプトタイムアウトは **120 秒**（2 分）です。次のように上書きできます。

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 分
```

### 検出キャッシュ

負荷の高いファイルシステムスキャンを避けるため、エージェントの検出結果は **60 秒間**キャッシュされます。強制的に更新するには、次のようにします。

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## セキュリティ

### コマンドインジェクションの防止

ACP は、コマンドインジェクション攻撃を防止するためにバージョンコマンドを検証します。

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

以下の文字を含むバージョンコマンドは拒否されます。

- `;` — コマンド区切り文字
- `&` — バックグラウンドプロセス
- `|` — パイプ
- `<`, `>` — リダイレクト
- `` ` `` — コマンド置換
- `$` — 変数展開
- `\r`, `\n` — 改行

### バイナリ名の検証

ACP は、バージョンコマンドのバイナリが想定されるバイナリ名と一致することを検証します（カスタムエージェントの場合を除く）。

### プロセスの分離

各 ACP セッションは、それぞれ独立した子プロセスで実行されます。セッションが終了するかタイムアウトすると、プロセスは強制終了されます。

---

## パフォーマンス

### 検出パフォーマンス

- **初回呼び出し**: 約 50～200ms（各エージェントの `version` コマンドを実行）
- **キャッシュ済みの呼び出し**: 1ms 未満（キャッシュから返却）
- **キャッシュ TTL**: 60 秒

### プロンプトのパフォーマンス

- **起動**: 約 50～100ms
- **プロンプト送信**: 約 10～50ms
- **応答待機**: CLI エージェントに依存（通常は 1～30 秒）
- **強制終了**: 約 5 秒（SIGTERM）+ 即時（SIGKILL）

### リソース使用量

- **セッションあたりのメモリ**: 約 10～50MB（CLI エージェントに依存）
- **CPU**: 最小限（I/O バウンド）
- **ディスク**: なし

---

## トラブルシューティング

### 「Unknown agent」エラー

**問題**: `acpManager.spawn()` が `Unknown agent: <id>` をスローする

**解決策**: `spawn()` で使用できるのは、次のエージェントのみです。

- `claude`
- `codex`
- `gemini`
- `qwen`

その他のエージェントは、手動またはカスタムエージェント定義を使用して起動する必要があります。

### 「Session not alive」エラー

**問題**: `acpManager.sendPrompt()` が `Session ${sessionId} is not alive` をスローする

**解決策**: セッションが終了したか、強制終了された可能性があります。セッションの状態を確認してください。

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // セッションを再起動
  acpManager.spawn("claude", "claude", [], {});
}
```

### 「ACP timeout」エラー

**問題**: `acpManager.sendPrompt()` が `ACP timeout after 120000ms` をスローする

**解決策**: タイムアウトを延長してください。

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 分
```

### CLI が検出されない

**問題**: `detectInstalledAgents()` が CLI を検出しない

**解決策**:

1. **PATH を確認**: CLI がシステムの PATH に含まれていることを確認する
2. **バージョンコマンドを確認**: `claude --version` を手動で実行する
3. **権限を確認**: CLI が実行可能であることを確認する
4. **カスタムエージェント**: 非標準の CLI 用にカスタムエージェント定義を追加する

### 権限拒否

**問題**: ACP が CLI を実行できない

**解決策**:

1. **ファイル権限を確認**: `chmod +x /usr/local/bin/claude`
2. **所有権を確認**: OmniRoute に読み取り／実行権限があることを確認する
3. **SELinux/AppArmor を確認**: プロセスの起動がブロックされる場合があります

---

## 使用例

### 例 1: Claude Code の起動と使用

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// インストール済みのエージェントを検出
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // 新しいセッションを起動
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // プロンプトを送信
  const response = await acpManager.sendPrompt(
    session.id,
    "量子コンピューティングについて100語で説明してください"
  );

  console.log("Claudeの応答:", response);

  // クリーンアップ
  acpManager.kill(session.id);
}
```

### 例 2: フォールバック付き自動検出

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// まずClaudeを試し、見つからない場合はCodexにフォールバック
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("ACP互換のCLIエージェントが見つかりません");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "こんにちは！");

acpManager.kill(session.id);
```

### 例 3: カスタムエージェント

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// カスタムCLIエージェントを登録
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

// detectInstalledAgents()に「my-llm-cli」が含まれるようになります
const agents = detectInstalledAgents();
```

---

## 次のステップ

- **[APIリファレンス](../reference/API_REFERENCE.md)** — REST APIエンドポイント
- **[プロバイダーリファレンス](../reference/PROVIDER_REFERENCE.md)** — 全352プロバイダー
- **[MCPサーバー](./MCP-SERVER.md)** — Model Context Protocolとの統合
- **[A2Aサーバー](./A2A-SERVER.md)** — エージェント間プロトコル
- **[クラウドエージェント](./CLOUD_AGENT.md)** — クラウドベースのエージェント

---

## 参考資料

- [AionUiプロジェクト](https://github.com/iOfficeAI/AionUi) — ACP自動検出の着想元
- [ACPソースコード](../../src/lib/acp/) — 実装の詳細
  - `manager.ts` — プロセスのライフサイクル管理
  - `registry.ts` — エージェントの検出と登録
  - `index.ts` — 公開APIのエクスポート
