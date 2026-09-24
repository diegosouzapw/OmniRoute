# Skills Framework (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **信頼できる情報源:** `src/lib/skills/` および `src/app/api/skills/`
> **最終更新:** 2026-06-28 — v3.8.40

OmniRoute は、言語モデル（およびオペレーター）が再利用可能な機能を組み合わせられる、拡張可能な Skills フレームワークを提供します。ファイルシステムの読み取りや HTTP リクエストから、サンドボックス化されたコード実行、厳選されたマーケットプレイスのスキルまで対応します。

スキルは、バージョン管理され、スキーマによって定義された作業単位です。OmniRoute は、送信リクエストにスキルをツール定義として注入し、モデルから返されるツール呼び出しをインターセプトして、対応するハンドラーを実行し、その結果をモデルに返すことで会話を継続できます。モデルが実装を参照することはなく、参照できるのはツールインターフェースのみです。

---

## Agent Skills と Omni Skills

OmniRoute には、明確に異なりながら相互補完的な 2 つのスキルシステムがあります。

| 観点             | **Omni Skills**（本ドキュメント）                        | **Agent Skills**                                                                             |
| :--------------- | :------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| 目的             | LLM ツールの注入 + サンドボックス化された実行            | 外部エージェントが検出して利用するための SKILL.md カタログ                                   |
| 信頼できる情報源 | `src/lib/skills/` + マーケットプレイス                   | `src/lib/agentSkills/` + `skills/` ディレクトリ                                              |
| ランタイムモード | 送信リクエストに注入され、ツール呼び出しイベント時に実行 | 静的 Markdown カタログ + REST/MCP/A2A 検出エンドポイント                                     |
| 利用者           | OmniRoute 自体（コンボルーティング、受信 LLM 呼び出し）  | 外部エージェント、MCP クライアント、A2A オーケストレーター                                   |
| 数               | 可変（マーケットプレイスに依存）                         | 45 件のカタログエントリ（API 23 件 + CLI 21 件 + 設定 1 件）                                 |
| 形式             | ツールスキーマ + ハンドラーを持つ `SkillDefinition`      | `SKILL.md` フロントマター + Markdown 本文                                                    |
| 検出             | `/api/skills/*` REST + `omniroute_skills_*` MCP ツール   | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP ツール + A2A `list-capabilities` |

**Omni Skills** は実行エンジンです。LLM がツールを呼び出した際に OmniRoute が「何を実行できるか」を定義します。

**Agent Skills** はドキュメントカタログです。外部エージェントに対し、OmniRoute の REST API と CLI を「どのように使用するか」を説明します。構造化された SKILL.md ファイルは、エージェントのプロンプトに直接取り込めます。

Agent Skills のカタログ、ジェネレーター、MCP ツール、および A2A スキルについては、[docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md) を参照してください。

---

## 概念

### スキルのソース

同じレジストリ内に、次の 3 つのスキルソースが共存します。

1. **組み込みスキル**（`src/lib/skills/builtins.ts`）— OmniRoute に同梱されています。一般的なユースケースをカバーします。
   - `file_read`, `file_write` — `<DATA_DIR>/skills/workspaces/<hashed-key>/` 配下にある API キーごとのサンドボックスワークスペース
   - `http_request` — `guard: "public-only"` を指定した `safeOutboundFetch` 経由の送信 HTTP リクエスト
   - `web_search` — キャッシュ機能を備えた差し替え可能な検索プロバイダー（`executeWebSearch`）
   - `eval_code` — Docker でサンドボックス化された `node` または `python` の実行
   - `execute_command` — Docker でサンドボックス化されたシェルコマンド
   - `browser` — Playwright ベースのスキャフォールディング。デフォルトでは無効（`builtin/browser.ts`）
2. **SkillsMP**（OmniRoute マーケットプレイス）— `https://skillsmp.com/api/v1/skills/search` から取得されます。Settings で `skillsmpApiKey` を設定する必要があります。
3. **SkillsSH**（`skills.sh` コミュニティカタログ）— `https://skills.sh/api/search` から取得されます。認証は不要です。SKILL.md の内容は GitHub raw から取得されます。

単一の「アクティブプロバイダー」によって、ダッシュボードがどのカタログからインストールするかが制御されます（`src/lib/skills/providerSettings.ts`）。**Settings → Memory & Skills** で切り替えます。デフォルトは `skillsmp` です。

### スキルの識別

スキルは、メモリ内レジストリ（`src/lib/skills/registry.ts`）で `name@version` をキーとして管理されます。バージョンは semver（`^\d+\.\d+\.\d+$`）でなければなりません。`resolveVersion()` は、`^`、`~`、`>`、`>=`、`<`、`<=`、`==`、および完全一致制約を解釈します。

### スキルモード

各スキルには、いつ注入されるかを制御するランタイムモードがあります。

| モード | 動作                                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------- |
| `on`   | 常にツール定義として注入される                                                                                |
| `off`  | 注入されず、実行もされない                                                                                    |
| `auto` | 受信リクエストに対してスコアリングされ、スコアが `AUTO_MIN_SCORE`（デフォルトは 3）以上の場合にのみ注入される |

`auto` は、マーケットプレイスからインストールされたスキルのデフォルトです。`enabled=true` と `mode="off"` の組み合わせは、「登録済みだが非アクティブ」を意味します。レガシーカラムを介して `enabled` を切り替えると `mode` も更新されるため、古いコードパスとの整合性が維持されます（`src/app/api/skills/[id]/route.ts`）。

### ステータス（実行）

スキルの実行は、次のステータスとともに `skill_executions` テーブルで追跡されます（`src/lib/skills/types.ts`）。

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### レジストリキャッシュ

`SkillRegistry` は、60 秒の TTL キャッシュを持つシングルトンです（`registry.ts:14`）。`loadFromDatabase()` は冪等であり、`pendingLoad` を介して同時呼び出しを重複排除します。書き込み操作（`register`/`unregister`/`unregisterById`）が行われると、キャッシュは無効化されます。バージョンを検索するには、`getSkillVersions(name)` および `resolveVersion(name, constraint)` を使用します。

### プロバイダー対応の注入

`src/lib/skills/injection.ts` の `injectSkills()` は、登録済みスキルをプロバイダー固有のツール定義へ変換するエントリーポイントです。

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

ツール名は `name@version` としてエンコードされるため、モデルがツールを呼び出した際に、ハンドラーが適切なバージョンを選択できます。

### AUTO スコアリング

`mode="auto"` の場合、各スキル候補はリクエストコンテキストに対してスコアリングされます（`injection.ts` の `scoreAutoSkill()`）。

| シグナル                                                       | ポイント          |
| -------------------------------------------------------------- | ----------------- |
| スキル名がコンテキスト内にそのまま出現する                     | +6                |
| 名前の各トークンがコンテキストのトークンと一致する             | +2                |
| 各タグの部分文字列がコンテキストと一致する                     | +3                |
| 説明の各トークンがコンテキストと一致する                       | +1                |
| バックグラウンド理由が名前のトークンと一致する                 | トークンごとに +2 |
| バックグラウンド理由がタグと一致する                           | トークンごとに +2 |
| タグ内のプロバイダーヒントがリクエストのプロバイダーと一致する | +2 / −2           |

`score >= AUTO_MIN_SCORE = 3` を満たすスキルのうち、上位 `AUTO_MAX_SKILLS = 5` 件が挿入されます。同点の場合は、`installCount` の降順、次に名前のアルファベット順で順位が決まります（`injection.ts:225-235`）。

### ツール呼び出しのインターセプト

`src/lib/skills/interception.ts` の `handleToolCallExecution()` は、アップストリームがツール呼び出しレスポンスを返した後、チャットハンドラーによって呼び出されます。

1. `extractToolCalls()` がプロバイダー固有の形式（OpenAI の `tool_calls` / Responses の `function_call`、Anthropic の `tool_use`、Gemini の `functionCalls`）を読み取ります。
2. 組み込みツールのエイリアス（例：`omniroute_web_search` → `web_search`）が最初に解決されます。組み込みハンドラーはインラインで実行されます。
3. それ以外はすべて、`skillExecutor.execute(name@version, args, { apiKeyId, sessionId })` を介してルーティングされます。
4. 結果は必要に応じて、`tool_results`、`function_call_output` 項目、または Anthropic の `tool_result` ブロックとしてレスポンスに組み込まれます。

実行コンテキスト内の `customSkillExecutionEnabled` を `false` に設定すると、組み込みのインターセプトのみを許可できます（ユーザー定義ハンドラーを明示的に無効化するリクエストパスで使用されます）。

---

## Docker サンドボックス

組み込みではないコードパス（`eval_code`、`execute_command`）は、`SandboxRunner`（`src/lib/skills/sandbox.ts`）を介して Docker 内で実行されます。各コンテナは以下の設定で起動されます。

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (readOnly=true の場合)
```

デフォルト（`SandboxRunner.DEFAULT_CONFIG`）：

| フィールド       | デフォルト      | 注記                                                      |
| ---------------- | --------------- | --------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | `--cpus` に渡す前に 1000 で除算                           |
| `memoryLimit`    | 256 MB          | ハードリミット                                            |
| `timeout`        | 30000 ms        | `SIGTERM` + `docker kill` によるソフトキル                |
| `networkEnabled` | `false`         | `--network none` になる                                   |
| `readOnly`       | `true`          | ルート FS は読み取り専用。`/tmp` と `/workspace` は tmpfs |

シャットダウン用に `SandboxRunner.kill(id)` と `killAll()` が公開されています。実行中のコンテナは `runningContainers: Map<string, ChildProcess>` で追跡されます。

### サンドボックス環境変数

`src/lib/skills/builtins.ts` 内の `process.env` を介して設定されます。

| 環境変数                          | デフォルト       | 目的                                                                                        |
| --------------------------------- | ---------------- | ------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | `file_read` と `file_write` の上限                                                          |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | `http_request` のレスポンス本文の上限                                                       |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | 呼び出し元に返される stdout/stderr の上限                                                   |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | サンドボックス化されたコマンドのデフォルトタイムアウト。上限は 60 s                         |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | 外向き通信のマスターゲート。呼び出しごとのオプトインを許可するには `1` または `true` に設定 |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | （以下を参照）   | Docker イメージのカンマ区切り許可リスト                                                     |

デフォルトで許可されるイメージ：`alpine:3.20`、`node:22-alpine`、`python:3.12-alpine`。`SKILLS_ALLOWED_SANDBOX_IMAGES` による追加分はデフォルトとマージされ、未知のイメージは `normalizeImage()` によって拒否されます。

> 注：独立した `SKILLS_EXECUTION_TIMEOUT_MS` 環境変数はありません。サンドボックス外のハンドラーのタイムアウトは `SkillExecutor`（`executor.ts:13`）内で 30 s にハードコードされていますが、実行時に `skillExecutor.setTimeout(ms)` で上書きできます。

### ワークスペースの分離

`file_read` と `file_write` は、すべてのパスを API キーごとのワークスペース `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/` を基準として解決します。パストラバーサル（`..`）および禁止セグメント（`.env`、`.git`、`.ssh`、`.omniroute`、`.codex`、`secrets`）は、ディスク I/O が行われる前に拒否されます。

### HTTP の堅牢化

`http_request`（`builtins.ts:257`）：

- メソッドの許可リスト：`GET, HEAD, POST, PUT, PATCH, DELETE`
- ブロックされる外向きヘッダー：`host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- リダイレクトは無効（`allowRedirect: false`）
- `guard: "public-only"` を指定した `safeOutboundFetch` 経由でルーティング（プライベート／ループバック範囲をブロック）
- レスポンスは `SKILLS_MAX_HTTP_RESPONSE_BYTES` で切り詰められ、クライアントには `truncated: true` が返される

---

## ハイブリッドエグゼキューター（プレビュー）

`src/lib/skills/hybrid.ts` は、呼び出しごとに `direct`（プロセス内）実行と `sandbox` 実行のどちらを使用するかを決定し、タイムアウト／メモリエラー発生時には `autoUpgrade` による再試行を行う `HybridExecutor` を定義しています。組み込まれている `directExecutor` / `sandboxRunner` の実装はスタブです（`executeDirect`、`executeInSandbox` はプレースホルダーオブジェクトを返します）。このモジュールは構築途中のコントラクトとして扱ってください。実際の実行は、引き続き `skillExecutor` + `SandboxRunner` を通じて行われます。

---

## ストレージ

スキーマは、次の2つのマイグレーションにあります。

- `src/lib/db/migrations/016_create_skills.sql` — 基本となる `skills` および `skill_executions` テーブルを作成し、`(api_key_id, name)` と `(skill_id, status, created_at)` にインデックスを設定します。
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — `skills` に `mode`、`source_provider`、`tags`（JSON）、`install_count` を追加します。

`skill_executions.status` はデータベースレベルで制約されています：`CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`。

---

## REST API

すべてのエンドポイントは `src/app/api/skills/` 配下にあります。管理エンドポイント（`/api/skills`、`/api/skills/[id]`、`/api/skills/install`）には、`requireManagementAuth()` による**管理認証**が必要です。マーケットプレイス／インストールフローでは、より軽量な `isAuthenticated()`（セッションまたはAPIキー）を使用します。

| エンドポイント | メソッド | 目的 |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | 登録済みスキルを一覧表示します。`?q=`、`?mode=on                        | off | auto`、`?source=skillsmp | skillssh | local`、ページネーションをサポートします |
| `/api/skills/[id]` | PUT | `enabled` または `mode` を更新します |
| `/api/skills/[id]` | DELETE | IDで登録を解除します |
| `/api/skills/install` | POST | カスタムスキル（ハンドラーコード + スキーマ）をインストールします |
| `/api/skills/marketplace` | GET | SkillsMPカタログを検索します（`q` が空の場合は人気のデフォルト項目を返します） |
| `/api/skills/marketplace/install` | POST | SkillsMPスキルをインストールします（アクティブなプロバイダーが `skillsmp` である必要があります） |
| `/api/skills/skillssh` | GET | skills.shカタログを検索します（`?q=&limit=`、上限100件） |
| `/api/skills/skillssh/install` | POST | skills.shスキルをインストールします（アクティブなプロバイダーが `skillssh` である必要があります） |
| `/api/skills/executions` | GET | ページネーション付きの実行履歴（`?apiKeyId=`） |
| `/api/skills/executions` | POST | 登録済みスキルをアドホックに実行します |

`POST /api/skills/executions` エンドポイントは、`settings.skillsEnabled === false` の場合、HTTP `503` と `{ error: "Skills execution is disabled..." }` を返します（`executor.ts:42-45`）。オペレーターは、**Settings → AI** からマスタースイッチを切り替えられます。

### 例：カスタムスキルをインストールする

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Reverses a string",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

`handlerCode` 文字列は、実行可能コードではなく、**ハンドラー名のルックアップ**です。エグゼキューターは、`skillExecutor.registerHandler(name, fn)`（`executor.ts:25`）を介してこれをマッピングします。マーケットプレイスからのインストールでは、SKILL.mdのテキストをドキュメントとしてこのフィールドに保存し、モデルが生成したツール呼び出しを通じて実行をルーティングします。ユーザーが任意に提供したソースがevalされることはありません。

---

## MCP ツール

4 つの MCP ツールがスキル機能をラップしています（`open-sse/mcp-server/tools/skillTools.ts`）。これらは MCP サーバーの起動時に自動登録されます。

| ツール                        | 説明                                                                          |
| ----------------------------- | ----------------------------------------------------------------------------- |
| `omniroute_skills_list`       | スキルを一覧表示します。オプションのフィルター: `apiKeyId`、`name`、`enabled` |
| `omniroute_skills_enable`     | `skillId` を指定してスキルを有効化または無効化します                          |
| `omniroute_skills_execute`    | 入力ペイロードを使用してスキルを実行します                                    |
| `omniroute_skills_executions` | 最近の実行履歴（デフォルト 50 件、最大 100 件）                               |

トランスポートの設定とスコープの割り当てについては、[MCP-SERVER.md](./MCP-SERVER.md)を参照してください。

---

## A2A 統合

`src/lib/skills/a2a.ts` は、`memory_aware_routing` A2A スキル記述子と `registerA2ASkill(registry)` ヘルパーをエクスポートします。カスタム A2A スキルは `src/lib/a2a/skills/` に配置され、`A2A_SKILL_HANDLERS`（`src/lib/a2a/taskExecution.ts`）を介してディスパッチされます。タスクのライフサイクル全体については、[A2A-SERVER.md](./A2A-SERVER.md)を参照してください。

---

## 新しい組み込みスキルの追加

1. **ハンドラーを定義**します。`src/lib/skills/builtins.ts`（または `src/lib/skills/builtin/` 配下の同階層ファイル）に追加します。シグネチャ: `(input, { apiKeyId, sessionId }) => Promise<output>`。
2. **サンドボックス化されたコードパスですか？** `sandboxRunner.run(image, command, env, sandboxConfig({...}))` を呼び出します。許可リストに対して `normalizeImage()` を使用します。
3. **ファイルシステムパスですか？** ディスクにアクセスする前に、必ず `resolveWorkspacePath(input, context)` を通します。
4. **ネットワーク呼び出しですか？** `guard: "public-only"` を指定して `safeOutboundFetch` を使用し、`sanitizeHeaders()` でヘッダーをサニタイズします。
5. **登録**するには、`builtinSkills` にエントリを追加します（または起動時に `registerBrowserSkill(executor)` 形式で呼び出します）。
6. **組み込みツールのエイリアスを接続**します（任意）。上流モデルが異なる名前を出力する場合は、`BUILTIN_TOOL_ALIASES`（`interception.ts:23`）に追加します。
7. **テスト**は `src/lib/skills/__tests__/` に追加します（Vitest）。

---

## カスタム（非組み込み）スキルの追加

1. プロセスの起動時にハンドラーを登録します。
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. `POST /api/skills/install` を介してスキルを挿入します（`handlerCode` フィールドは登録済みのハンドラー名と一致する必要があります）。
3. `PUT /api/skills/[id]` を介して `mode` を `on` または `auto` に切り替えます。

---

## 運用上のヒント

- **マスタースイッチ:** `settings.skillsEnabled = false` にすると、すべての実行がブロックされ、`/api/skills/executions` は HTTP `503` を返します。レジストリの読み込みは継続されます。
- **外向き通信の制限:** 完全にエアギャップされたサンドボックスを維持するには、`SKILLS_SANDBOX_NETWORK_ENABLED` を未設定（デフォルト）のままにします。呼び出しごとの `networkEnabled: true` でも、マスターゲートが有効である必要があります。
- **特定イメージの許可:** 許可リストを拡張するには、`SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` を設定します。
- **実行の監査:** `/dashboard/skills/executions` と `omniroute_skills_executions` は、どちらも `skill_executions` をクエリします。成功した実行には `durationMs`、失敗した実行には `errorMessage` が含まれます。
- **キャッシュの無効化:** DB を手動で編集した後は `skillRegistry.invalidateCache()` を呼び出します。それ以外の場合は 60 秒待ちます。
- **匿名ワークスペース:** `apiKeyId` が空の場合、すべての呼び出しは同じ `"anonymous"` ワークスペースにハッシュされます。共有を考慮するコードでは、常に実際のキーを渡す必要があります。

---

## 実行ライフサイクル (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) は、すべてのスキル呼び出しを管理する**シングルトン**です。そのライフサイクルを理解することは、タイムアウト、再試行、実行状態をデバッグするうえで重要です。

### 5段階のライフサイクル

```
   execute() が呼び出される
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← キューに登録済み、まだ開始されていない（DB行を作成）
  └──────┬──────┘
         │ ハンドラーを開始
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← タイムアウト付きでハンドラーを呼び出し
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   （他の経路はなし — 親によって強制終了）
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   ステータス、出力、durationMs でDB行を更新
```

### デフォルト設定

| 設定         | デフォルト値   | 設定方法                             |
| ------------ | -------------- | ------------------------------------ |
| `timeout`    | `30000` (30秒) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`            | `skillExecutor.setMaxRetries(count)` |

> **重要**: executor はシングルトンです。`setTimeout()` を呼び出すと、それ以降のすべての呼び出しにグローバルに影響します。スキルごとのタイムアウトは現在サポートされていません。スキルごとに異なるタイムアウトが必要な場合は、別々のプロセスを起動するか、executor をフォークしてください。

### ステータス値

`src/lib/skills/types.ts` より:

```ts
enum SkillStatus {
  PENDING = "pending", // キューに登録済み、まだ開始されていない
  RUNNING = "running", // ハンドラーが呼び出された
  SUCCESS = "success", // ハンドラーが有効な出力を返した
  ERROR = "error", // ハンドラーが例外をスローした
  TIMEOUT = "timeout", // executor のタイムアウト時間を超過した
}
```

> **注記**: `TIMEOUT` ステータスは enum で定義されていますが、現在の executor 実装では**実際にはDBに書き込まれません**。タイムアウトは、メッセージ `"Skill execution timed out"` を伴う `ERROR` として表面化します。このステータス enum は将来の使用のために予約されています。

### 実行の確認

```ts
import { skillExecutor } from "omniroute/skills/executor";

// IDで特定の実行を取得
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// APIキーの最近の実行を一覧表示
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// 実行総数を取得
const total = skillExecutor.countExecutions("api-key-id");
```

### 再試行の動作

`maxRetries` 設定は保存されますが、現在 executor の `execute()` メソッドでは**使用されていません**。実行されるのは1回の試行のみです。`maxRetries` の値は、将来の実装と、この値を読み取る必要があるフックのために公開されています。

現時点では、再試行はスキルハンドラー内で実装する必要があります。組み込み
スキルは executor に対して登録されます（例: `src/lib/skills/builtin/` 内の
`registerBuiltinSkills(executor)` / `registerBrowserSkill(executor)`）。登録する
ハンドラーは、それ自体の再試行ループで処理をラップできます。

```ts
// スキルハンドラー内
async function handler(input, ctx) {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchSomething(input);
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
  }
  throw lastError;
}
```

---

## SkillMode の詳細

`SkillMode` enum（`src/lib/skills/types.ts`）は、スキルが**いつ、どのように**呼び出されるかを制御します。

```ts
enum SkillMode {
  AUTO = "auto", // スキルをいつ呼び出すかを LLM が判断
  MANUAL = "manual", // ユーザーからの明示的なリクエストによってのみ呼び出される
  HYBRID = "hybrid", // AUTO スコアリング + 手動オーバーライド
}
```

> **注**: コードベースでは `SkillMode`（AUTO/MANUAL/HYBRID）が定義されていますが、`Skill.mode` フィールドは別の形式（`"on" | "off" | "auto"`）を使用します。これらは関連していますが、同一ではありません。`SkillMode` はエグゼキューターのポリシー用であり、`Skill.mode` はスキルごとの有効化設定用です。

### 各モードを使用する場面

| モード   | LLM の動作                                                                           | ユースケース                                             |
| -------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| `AUTO`   | 必要と判断した場合、LLM はスキルを呼び出せる                                         | 汎用スキル（ファイルの読み取り、HTTP リクエスト）        |
| `MANUAL` | LLM はスキルを呼び出せず、明示的な `executeSkill` API 呼び出しによってのみ実行される | 機密性の高い操作（データベースへの書き込み、支払い処理） |
| `HYBRID` | LLM はスキルを提案できるが、ユーザーによる確認が必要                                 | 副作用はあるものの危険ではないスキル                     |

### AUTO スコアリング

`AUTO` モードが有効な場合、各候補スキルは
`src/lib/skills/injection.ts` の `scoreAutoSkill()` によってリクエストの
コンテキストに対してスコアリングされます。これは加算式の整数ポイントシステム
（スキル名の一致、名前・タグ・説明のトークン重複、バックグラウンド理由のヒント、
プロバイダーヒントのボーナス／ペナルティ）です。`score >= AUTO_MIN_SCORE = 3` を
満たす上位 `AUTO_MAX_SKILLS = 5` 個のスキルが呼び出し可能なツールとして注入され、
同点の場合は `installCount`、次に名前の順で決定されます。完全なポイント表については、
このドキュメントの前半にある
[**ツールスキーマ生成 → AUTO スコアリング**](#auto-scoring)を参照してください。
浮動小数点数の `0.6` のようなしきい値や、`registry.ts` でのスコアリングはありません。

---

## 組み込みスキルカタログ

OmniRoute には、`src/lib/skills/builtin/` に厳選された組み込みスキルのセットが付属しています。最も一般的なものは次のとおりです。

### ブラウザー自動化スキル

ブラウザースキル（`src/lib/skills/builtin/browser.ts`）は、Playwright/Puppeteer を介したヘッドレスブラウザー自動化を提供します。**実装済みですが、デフォルトのスキルカタログには含まれていません**。使用するには、ブラウザー拡張プラグインを別途インストールしてください。

```ts
// 設定で有効化
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // 常に明示的な呼び出しを要求
  allowedSkills: ["browser"],
  timeout: 60000, // ページ読み込み用に 60 秒
  maxRetries: 1,
};
```

### その他の組み込みカテゴリー

| カテゴリー   | スキル                                                  | モード |
| ------------ | ------------------------------------------------------- | ------ |
| ファイル I/O | `file_read`, `file_write`                               | AUTO   |
| HTTP         | `http_request`                                          | AUTO   |
| 検索         | `web_search`                                            | AUTO   |
| コード実行   | `eval_code`（サンドボックス化された JavaScript/Python） | HYBRID |
| システム     | `execute_command`（サンドボックス化された CLI 実行）    | MANUAL |

### カスタムスキルの追加

プラグインシステムを介してカスタムスキルを追加する方法については、[プラグイン SDK とスキルの統合](./PLUGIN_SDK.md)を参照してください。

---

## 関連項目

- [MCP-SERVER.md](./MCP-SERVER.md) — MCPツールの登録とトランスポート
- [A2A-SERVER.md](./A2A-SERVER.md) — A2Aタスクのライフサイクルとスキルのディスパッチ
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — ユーザー向け概要
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — リクエストパイプラインとコンポーネントマップ
- ソース: `src/lib/skills/`、`src/app/api/skills/`、`open-sse/mcp-server/tools/skillTools.ts`
- テスト: `src/lib/skills/__tests__/integration.test.ts`
