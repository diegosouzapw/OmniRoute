# APIリファレンス

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

すべての OmniRoute API エンドポイントの完全なリファレンス。

---

## 目次

- [Chat Completions](#chat-completions)
- [Embeddings](#embeddings)
- [Image Generation](#image-generation)
- [List Models](#list-models)
- [Compatibility Endpoints](#compatibility-endpoints)
- [Semantic Cache](#semantic-cache)
- [Dashboard & Management](#dashboard--management)
- [Request Processing](#request-processing)
- [Authentication](#authentication)

---

## チャットの完了

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### カスタムヘッダー

| ヘッダー                 | 方向       | 説明                                                |
| ------------------------ | ---------- | --------------------------------------------------- | ------------------------ |
| `X-OmniRoute-No-Cache`   | リクエスト | キャッシュをバイパスするには、`true` に設定します。 |
| `X-OmniRoute-Progress`   | リクエスト | 進行状況イベントの場合は `true` に設定します。      |
| `Idempotency-Key`        | リクエスト | 重複排除キー (5 秒ウィンドウ)                       |
| `X-Request-Id`           | リクエスト | 代替の重複排除キー                                  |
| `X-OmniRoute-Cache`      | 応答       | `HIT` または `MISS` (非ストリーミング)              |
| `X-OmniRoute-Idempotent` | 応答       | `true` (重複排除の場合)                             |
| `X-OmniRoute-Progress`   | 応答       | `enabled`                                           | で進行状況を追跡する場合 |

---

## 埋め込み

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

利用可能なプロバイダー: Nebius、OpenAI、Mistral、Togetter AI、Fireworks、NVIDIA。

```bash
# List all embedding models
GET /v1/embeddings
```

---

## 画像の生成

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/dall-e-3",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
```

利用可能なプロバイダー: OpenAI (DALL-E)、xAI (Grok Image)、Togetter AI (FLUX)、Fireworks AI。

```bash
# List all image models
GET /v1/images/generations
```

---

## モデルのリスト

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## 互換性エンドポイント

| 方法 | パス                        | フォーマット          |
| ---- | --------------------------- | --------------------- |
| 投稿 | `/v1/chat/completions`      | オープンAI            |
| 投稿 | `/v1/messages`              | 人類                  |
| 投稿 | `/v1/responses`             | OpenAI の応答         |
| 投稿 | `/v1/embeddings`            | オープンAI            |
| 投稿 | `/v1/images/generations`    | オープンAI            |
| 入手 | `/v1/models`                | オープンAI            |
| 投稿 | `/v1/messages/count_tokens` | 人類                  |
| 入手 | `/v1beta/models`            | ジェミニ              |
| 投稿 | `/v1beta/models/{...path}`  | Gemini コンテンツ生成 |
| 投稿 | `/v1/api/chat`              | オラマ                |

### 専用プロバイダー ルート

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

プロバイダーのプレフィックスが存在しない場合は、自動的に追加されます。モデルが一致しない場合は、`400` が返されます。

---

## セマンティック キャッシュ

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

応答例:

```json
{
  "semanticCache": {
    "memorySize": 42,
    "memoryMaxSize": 500,
    "dbSize": 128,
    "hitRate": 0.65
  },
  "idempotency": {
    "activeKeys": 3,
    "windowMs": 5000
  }
}
```

---

## ダッシュボードと管理

### 認証

| エンドポイント                | 方法    | 説明                                 |
| ----------------------------- | ------- | ------------------------------------ |
| `/api/auth/login`             | 投稿    | ログイン                             |
| `/api/auth/logout`            | 投稿    | ログアウト                           |
| `/api/settings/require-login` | GET/PUT | ログインが必要かどうかを切り替えます |

### プロバイダー管理

| エンドポイント               | 方法           | 説明                         |
| ---------------------------- | -------------- | ---------------------------- |
| `/api/providers`             | 取得/投稿      | プロバイダーのリスト/作成    |
| `/api/providers/[id]`        | 取得/挿入/削除 | プロバイダーを管理する       |
| `/api/providers/[id]/test`   | 投稿           | プロバイダー接続をテストする |
| `/api/providers/[id]/models` | 入手           | プロバイダーモデルのリスト   |
| `/api/providers/validate`    | 投稿           | プロバイダー構成を検証する   |
| `/api/provider-nodes*`       | いろいろ       | プロバイダーノード管理       |
| `/api/provider-models`       | 取得/投稿/削除 | カスタムモデル               |

### OAuth フロー

| エンドポイント                   | 方法     | 説明                     |
| -------------------------------- | -------- | ------------------------ |
| `/api/oauth/[provider]/[action]` | いろいろ | プロバイダー固有の OAuth |

### ルーティングと構成

| エンドポイント        | 方法      | 説明                                    |
| --------------------- | --------- | --------------------------------------- |
| `/api/models/alias`   | 取得/投稿 | モデルの別名                            |
| `/api/models/catalog` | 入手      | プロバイダー + タイプ別のすべてのモデル |
| `/api/combos*`        | いろいろ  | コンボ管理                              |
| `/api/keys*`          | いろいろ  | API キー管理                            |
| `/api/pricing`        | 入手      | モデルの価格                            |

### 使用状況と分析

| エンドポイント              | 方法 | 説明                   |
| --------------------------- | ---- | ---------------------- |
| `/api/usage/history`        | 入手 | 利用履歴               |
| `/api/usage/logs`           | 入手 | 使用ログ               |
| `/api/usage/request-logs`   | 入手 | リクエストレベルのログ |
| `/api/usage/[connectionId]` | 入手 | 接続ごとの使用量       |

### 設定

| エンドポイント                  | 方法    | 説明                           |
| ------------------------------- | ------- | ------------------------------ |
| `/api/settings`                 | GET/PUT | 一般設定                       |
| `/api/settings/proxy`           | GET/PUT | ネットワークプロキシ設定       |
| `/api/settings/proxy/test`      | 投稿    | プロキシ接続をテストする       |
| `/api/settings/ip-filter`       | GET/PUT | IP 許可リスト/ブロックリスト   |
| `/api/settings/thinking-budget` | GET/PUT | トークンの予算の推論           |
| `/api/settings/system-prompt`   | GET/PUT | グローバル システム プロンプト |

### モニタリング

| エンドポイント           | 方法      | 説明                         |
| ------------------------ | --------- | ---------------------------- |
| `/api/sessions`          | 入手      | アクティブなセッションの追跡 |
| `/api/rate-limits`       | 入手      | アカウントごとのレート制限   |
| `/api/monitoring/health` | 入手      | 健康診断                     |
| `/api/cache`             | 取得/削除 | キャッシュ統計 / クリア      |

### バックアップとエクスポート/インポート

| エンドポイント              | 方法 | 説明                                                       |
| --------------------------- | ---- | ---------------------------------------------------------- |
| `/api/db-backups`           | 入手 | 利用可能なバックアップをリストする                         |
| `/api/db-backups`           | 置く | 手動バックアップを作成する                                 |
| `/api/db-backups`           | 投稿 | 特定のバックアップから復元する                             |
| `/api/db-backups/export`    | 入手 | データベースを .sqlite ファイルとしてダウンロード          |
| `/api/db-backups/import`    | 投稿 | .sqlite ファイルをアップロードしてデータベースを置き換える |
| `/api/db-backups/exportAll` | 入手 | 完全バックアップを .tar.gz アーカイブとしてダウンロード    |

### クラウド同期

| エンドポイント         | 方法     | 説明             |
| ---------------------- | -------- | ---------------- |
| `/api/sync/cloud`      | いろいろ | クラウド同期操作 |
| `/api/sync/initialize` | 投稿     | 同期を初期化する |
| `/api/cloud/*`         | いろいろ | クラウド管理     |

### CLI ツール

| エンドポイント                     | 方法 | 説明                    |
| ---------------------------------- | ---- | ----------------------- |
| `/api/cli-tools/claude-settings`   | 入手 | クロード CLI ステータス |
| `/api/cli-tools/codex-settings`    | 入手 | Codex CLI ステータス    |
| `/api/cli-tools/droid-settings`    | 入手 | Droid CLI ステータス    |
| `/api/cli-tools/openclaw-settings` | 入手 | OpenClaw CLI ステータス |
| `/api/cli-tools/runtime/[toolId]`  | 入手 | 汎用 CLI ランタイム     |

CLI 応答には、`installed`、`runnable`、`command`、`commandPath`、`runtimeMode`、`reason` が含まれます。

### 復元力とレート制限

| エンドポイント          | 方法    | 説明                                 |
| ----------------------- | ------- | ------------------------------------ |
| `/api/resilience`       | GET/PUT | 回復力プロファイルを取得/更新する    |
| `/api/resilience/reset` | 投稿    | サーキットブレーカーをリセットする   |
| `/api/rate-limits`      | 入手    | アカウントごとのレート制限ステータス |
| `/api/rate-limit`       | 入手    | グローバルレート制限の設定           |

### 評価

| エンドポイント | 方法      | 説明                              |
| -------------- | --------- | --------------------------------- |
| `/api/evals`   | 取得/投稿 | 評価スイートのリスト / 評価の実行 |

### ポリシー

| エンドポイント  | 方法           | 説明                            |
| --------------- | -------------- | ------------------------------- |
| `/api/policies` | 取得/投稿/削除 | ルーティング ポリシーを管理する |

### コンプライアンス

| エンドポイント              | 方法 | 説明                                |
| --------------------------- | ---- | ----------------------------------- |
| `/api/compliance/audit-log` | 入手 | コンプライアンス監査ログ (最後の N) |

### v1beta (Gemini 互換)

| エンドポイント             | 方法 | 説明                                    |
| -------------------------- | ---- | --------------------------------------- |
| `/v1beta/models`           | 入手 | Gemini 形式でモデルをリストする         |
| `/v1beta/models/{...path}` | 投稿 | Gemini `generateContent` エンドポイント |

これらのエンドポイントは、ネイティブの Gemini SDK 互換性を期待するクライアント向けに、Gemini の API 形式を反映しています。

### 内部/システム API

| エンドポイント  | 方法 | 説明                                                |
| --------------- | ---- | --------------------------------------------------- |
| `/api/init`     | 入手 | アプリケーション初期化チェック (最初の実行時に使用) |
| `/api/tags`     | 入手 | Ollama 互換モデル タグ (Ollama クライアント用)      |
| `/api/restart`  | 投稿 | サーバーの正常な再起動をトリガーする                |
| `/api/shutdown` | 投稿 | サーバーの正常なシャットダウンをトリガーする        |

> **注:** これらのエンドポイントは、システムによって内部的に使用されるか、Ollama クライアントの互換性のために使用されます。通常、これらはエンド ユーザーによって呼び出されることはありません。

---

## 音声文字起こし

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Deepgram または AssemblyAI を使用して音声ファイルを文字起こしします。

**リクエスト:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**応答:**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**サポートされているプロバイダー:** `deepgram/nova-3`、`assemblyai/best`。

**サポートされている形式:** `mp3`、`wav`、`m4a`、`flac`、`ogg`、`webm`。

---

## Ollama の互換性

Ollama の API 形式を使用するクライアントの場合:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

リクエストは、Ollama 形式と内部形式の間で自動的に変換されます。

---

## テレメトリ

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**応答:**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## 予算

```bash
# Get budget status for all API keys
GET /api/usage/budget

# Set or update a budget
POST /api/usage/budget
Content-Type: application/json

{
  "keyId": "key-123",
  "limit": 50.00,
  "period": "monthly"
}
```

---

## モデルの利用可能性

```bash
# Get real-time model availability across all providers
GET /api/models/availability

# Check availability for a specific model
POST /api/models/availability
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929"
}
```

---

## リクエストの処理

1. クライアントはリクエストを `/v1/*` に送信します
2. ルート ハンドラーが `handleChat`、`handleEmbedding`、`handleAudioTranscription`、または `handleImageGeneration` を呼び出します。
3. モデルが解決されます (直接プロバイダー/モデルまたはエイリアス/コンボ)
4. アカウント可用性フィルタリングを使用してローカル DB から選択された資格情報
5. チャットの場合: `handleChatCore` — フォーマット検出、変換、キャッシュ チェック、冪等性チェック
6. プロバイダーエグゼキューターがアップストリームリクエストを送信します
7. 応答はクライアント形式に変換されるか (チャット)、またはそのまま返されます (埋め込み/画像/音声)
8. 使用状況/ログの記録
9. フォールバックはコンボルールに従ってエラーに適用されます

完全なアーキテクチャリファレンス: [**OMNI_TOKEN_119**](ARCHITECTURE.md)

---

## 認証

- ダッシュボード ルート (`/dashboard/*`) は `auth_token` Cookie を使用します
- ログインには保存されたパスワード ハッシュが使用されます。 `INITIAL_PASSWORD` へのフォールバック
- `requireLogin` は `/api/settings/require-login` 経由で切り替え可能
- `/v1/*` ルートでは、`REQUIRE_API_KEY=true` の場合、オプションでベアラー API キーが必要です
