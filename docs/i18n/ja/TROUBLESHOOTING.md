# トラブルシューティング

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

OmniRoute の一般的な問題と解決策。

---

## クイックフィックス

| 問題                                      | ソリューション                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------------- |
| 最初のログインが機能しない                | `.env` の `INITIAL_PASSWORD` を確認します (デフォルト: `123456`)。              |
| ダッシュボードが間違ったポートで開きます  | `PORT=20128` と `NEXT_PUBLIC_BASE_URL=http://localhost:20128` を設定します。    |
| `logs/` の下にリクエスト ログがありません | `ENABLE_REQUEST_LOGS=true` を設定                                               |
| EACCES: 許可が拒否されました              | `DATA_DIR=/path/to/writable/dir` を設定して `~/.omniroute` をオーバーライドする |
| ルーティング戦略が保存されない            | v1.4.11+ に更新 (設定永続性のための Zod スキーマ修正)                           |

---

## プロバイダーの問題

### 「言語モデルがメッセージを提供しませんでした」

**原因:** プロバイダーの割り当てが枯渇しました。

**修正:**

1. ダッシュボードのクォータ トラッカーを確認する
2. フォールバック層とのコンボを使用する
3. より安価な/無料枠に切り替える

### レート制限

**原因:** サブスクリプション割り当てを使い果たしました。

**修正:**

- フォールバックを追加: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- 安価なバックアップとして GLM/MiniMax を使用する

### OAuth トークンの有効期限が切れました

OmniRoute はトークンを自動更新します。問題が解決しない場合:

1. ダッシュボード → プロバイダー → 再接続
2. プロバイダー接続を削除して再度追加します。

---

## クラウドの問題

### クラウド同期エラー

1. `BASE_URL` が実行中のインスタンス (例: `http://localhost:20128`) を指していることを確認します。
2. `CLOUD_URL` がクラウド エンドポイント (例: `https://omniroute.dev`) を指していることを確認します。
3. `NEXT_PUBLIC_*` 値をサーバー側の値と一致させておく

### クラウド `stream=false` は 500 を返します

**症状:** 非ストリーミング通話のクラウド エンドポイントで `Unexpected token 'd'...` が発生します。

**原因:** クライアントが JSON を期待しているのに、アップストリームは SSE ペイロードを返します。

**回避策:** クラウド直接呼び出しには `stream=true` を使用します。ローカル ランタイムには SSE→JSON フォールバックが含まれます。

### クラウドは接続済みだが「API キーが無効です」と表示します

1. ローカル ダッシュボードから新しいキーを作成します (`/api/keys`)
2. クラウド同期を実行します: [クラウドを有効にする] → [今すぐ同期]
3. 古い/非同期キーはクラウド上でも `401` を返すことができます

---

## Docker の問題

### CLI ツールがインストールされていないと表示される

1. 実行時フィールドを確認します: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. ポータブル モードの場合: イメージ ターゲット `runner-cli` (バンドルされた CLI) を使用します。
3. ホスト マウント モードの場合: `CLI_EXTRA_PATHS` を設定し、ホストの bin ディレクトリを読み取り専用としてマウントします。
4. `installed=true` および `runnable=false` の場合: バイナリは見つかりましたが、ヘルスチェックに失敗しました

### 迅速なランタイム検証

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## コストの問題

### 高コスト

1.「ダッシュボード」→「使用状況」で使用状況統計を確認します。2. プライマリ モデルを GLM/MiniMax に切り替える 3. 重要ではないタスクには無料枠 (Gemini CLI、iFlow) を使用する 4. API キーごとにコスト予算を設定します: [ダッシュボード] → [API キー] → [予算]

---

## デバッグ

### リクエストログを有効にする

`.env` ファイルに `ENABLE_REQUEST_LOGS=true` を設定します。ログは `logs/` ディレクトリの下に表示されます。

### プロバイダーの健全性を確認する

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### ランタイムストレージ

- メイン状態: `${DATA_DIR}/db.json` (プロバイダー、コンボ、エイリアス、キー、設定)
- 使用法: `${DATA_DIR}/usage.json`、`${DATA_DIR}/log.txt`、`${DATA_DIR}/call_logs/`
- リクエストログ：`<repo>/logs/...`（`ENABLE_REQUEST_LOGS=true`の場合）

---

## サーキットブレーカーの問題

### プロバイダーが OPEN 状態でスタックしている

プロバイダーのサーキット ブレーカーが OPEN の場合、リクエストはクールダウンが期限切れになるまでブロックされます。

**修正:**

1. **ダッシュボード → 設定 → レジリエンス** に移動します
2. 影響を受けるプロバイダーのサーキット ブレーカー カードを確認します。
3. [**すべてリセット**] をクリックしてすべてのブレーカーをクリアするか、クールダウンが期限切れになるまで待ちます。
4. リセットする前に、プロバイダーが実際に利用可能であることを確認します。

### プロバイダーがサーキットブレーカーを落とし続けます

プロバイダーが繰り返し OPEN 状態になる場合:

1. **ダッシュボード → ヘルス → プロバイダーのヘルス** で障害パターンを確認します。
2. **[設定] → [復元力] → [プロバイダー プロファイル]** に移動し、失敗のしきい値を増やします。
3. プロバイダーが API 制限を変更したか、再認証が必要かどうかを確認します。
4. レイテンシーテレメトリを確認します - レイテンシーが長いとタイムアウトベースのエラーが発生する可能性があります

---

## 音声文字起こしの問題

### 「サポートされていないモデル」エラー

- 正しいプレフィックスを使用していることを確認してください: `deepgram/nova-3` または `assemblyai/best`
- **「ダッシュボード」→「プロバイダー」**でプロバイダーが接続されていることを確認します。

### 文字起こしが空を返すか失敗する

- サポートされているオーディオ形式を確認します: `mp3`、`wav`、`m4a`、`flac`、`ogg`、`webm`
- ファイル サイズがプロバイダーの制限内であることを確認します (通常は < 25MB)
- プロバイダー カードのプロバイダー API キーの有効性を確認します。

---

## トランスレータのデバッグ

**ダッシュボード → トランスレーター** を使用して、形式変換の問題をデバッグします。

| モード                | いつ使用するか                                                                                              |
| --------------------- | ----------------------------------------------------------------------------------------------------------- |
| **遊び場**            | 入力/出力形式を並べて比較します。失敗したリクエストを貼り付けて、それがどのように変換されるかを確認します。 |
| **チャット テスター** | ライブ メッセージを送信し、ヘッダーを含む完全なリクエスト/レスポンス ペイロードを検査します。               |
| **テストベンチ**      | フォーマットの組み合わせ全体でバッチ テストを実行して、どの翻訳が壊れているかを見つけます。                 |
| **ライブモニター**    | リアルタイムのリクエスト フローを監視して断続的な翻訳の問題を検出                                           |

### 一般的な形式の問題

- **思考タグが表示されない** — ターゲットプロバイダーが思考と思考予算設定をサポートしているかどうかを確認してください
- **ツール呼び出しのドロップ** — 一部の形式変換では、サポートされていないフィールドが削除される場合があります。プレイグラウンド モードで確認する
- **システム プロンプトがありません** — クロードとジェミニはシステム プロンプトの処理方法が異なります。翻訳出力を確認する
- **SDK はオブジェクトではなく生の文字列を返します** — v1.1.0 で修正されました: 応答サニタイザーは、OpenAI SDK Pydantic 検証エラーの原因となる非標準フィールド (`x_groq`、`usage_breakdown` など) を削除するようになりました。
- **GLM/ERNIE が `system` ロールを拒否します** — v1.1.0 で修正: ロール ノーマライザーは、互換性のないモデルのシステム メッセージをユーザー メッセージに自動的にマージします
- **`developer` ロールが認識されない** — v1.1.0 で修正: 非 OpenAI プロバイダーの場合は自動的に `system` に変換されます
- **`json_schema` が Gemini で動作しない** — v1.1.0 で修正: `response_format` は Gemini の `responseMimeType` + `responseSchema` に変換されるようになりました。

---

## 復元力の設定

### 自動レート制限がトリガーされない

- 自動レート制限は API キープロバイダーにのみ適用されます (OAuth/サブスクリプションには適用されません)
- **設定 → 復元力 → プロバイダー プロファイル** で自動レート制限が有効になっていることを確認します
- プロバイダーが `429` ステータス コードまたは `Retry-After` ヘッダーを返すかどうかを確認します。

### 指数バックオフの調整

プロバイダー プロファイルは次の設定をサポートします。

- **基本遅延** — 最初の失敗後の初期待機時間 (デフォルト: 1 秒)
- **最大遅延** — 最大待機時間の上限 (デフォルト: 30 秒)
- **乗数** — 連続した失敗ごとにどれだけ遅延を増加させるか (デフォルト: 2x)

### 対雷の群れ

多くの同時リクエストがレート制限プロバイダーに到達すると、OmniRoute はミューテックスと自動レート制限を使用してリクエストをシリアル化し、連鎖的な失敗を防ぎます。これは API キープロバイダーの場合は自動的に行われます。

---

## まだ行き詰まっていますか?

- **GitHub の問題**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **アーキテクチャ**: 内部の詳細については、[**OMNI_TOKEN_55**](ARCHITECTURE.md) を参照してください。
- **API リファレンス**: すべてのエンドポイントについては、[**OMNI_TOKEN_56**](API_REFERENCE.md) を参照してください。
- **ヘルス ダッシュボード**: リアルタイムのシステム ステータスについては、**ダッシュボード → ヘルス** を確認してください。
- **トランスレータ**: **ダッシュボード → トランスレータ**を使用して形式の問題をデバッグします
