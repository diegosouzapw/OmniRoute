<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute — 無料の AI ゲートウェイ

### コーディングを決してやめないでください。自動フォールバックを備えた **無料および低コストの AI モデル**へのスマート ルーティング。

_ユニバーサル API プロキシ — 1 つのエンドポイント、36 以上のプロバイダー、ダウンタイムなし。_

**チャット補完 • 埋め込み • 画像生成 • オーディオ • 再ランキング • 100% TypeScript **

---

### 🆕 v2.7.0 の新機能

- **プラガブル RouterStrategy** — ルール・コスト・レイテンシ戦略をサポート
- **多言語インテント検出** — 30以上の言語でルーティングスコアリング
- **リクエスト重複排除** — コンテンツハッシュで重複 API 呼び出しを防止
- **新しいプロバイダー：** Grok-4 Fast (xAI)、GLM-5 / Z.AI、MiniMax M2.5、Kimi K2.5
- **価格更新：** Grok-4 Fast $0.20/$0.50/M、GLM-5 $0.50/M、MiniMax M2.5 $0.30/M

---

### 🚀 New in v2.0.9+ — Playground, CLI Fingerprints & ACP

| Feature                                    | What It Does                                                                                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Playground**                    | Dashboard page to test any model directly — provider/model/endpoint selectors, Monaco Editor, streaming, abort, timing                        |
| 🔏 **CLI Fingerprint Matching**            | Per-provider header/body ordering to match native CLI signatures — toggle per provider in Settings > Security. **Your proxy IP is preserved** |
| 🤝 **ACP Support (Agent Client Protocol)** | CLI agent discovery (Codex, Claude, Goose, Gemini CLI, OpenClaw), process spawner, `/api/acp/agents` endpoint                                 |
| 🤖 **ACP Agents Dashboard**                | Debug > Agents page — grid of 14 agents with install status, version, custom agent form for any CLI tool                                      |
| 🔧 **Custom Model `apiFormat` Routing**    | Custom models with `apiFormat: "responses"` now correctly route to the Responses API translator                                               |
| 🏢 **Codex Workspace Isolation**           | Multiple Codex workspaces per email — OAuth correctly separates connections by workspace ID                                                   |
| 🔄 **Electron Auto-Update**                | Desktop app checks for updates + auto-install on restart                                                                                      |

### 🤖 お気に入りのコーディング エージェント向けの無料 AI プロバイダー

_AI を活用した IDE または CLI ツールを、無制限のコーディングのための無料 API ゲートウェイである OmniRoute 経由で接続します。_

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/cline/cline">
          <img src="./public/providers/openclaw.png" alt="OpenClaw" width="48"/><br/>
          <b>OpenClaw</b>
        </a><br/>
        <sub>⭐ 205K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/HKUDS/nanobot">
          <img src="./public/providers/nanobot.png" alt="NanoBot" width="48"/><br/>
          <b>NanoBot</b>
        </a><br/>
        <sub>⭐ 20.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/sipeed/picoclaw">
          <img src="./public/providers/picoclaw.jpg" alt="PicoClaw" width="48"/><br/>
          <b>PicoClaw</b>
        </a><br/>
        <sub>⭐ 14.6K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/zeroclaw-labs/zeroclaw">
          <img src="./public/providers/zeroclaw.png" alt="ZeroClaw" width="48"/><br/>
          <b>ZeroClaw</b>
        </a><br/>
        <sub>⭐ 9.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/nearai/ironclaw">
          <img src="./public/providers/ironclaw.png" alt="IronClaw" width="48"/><br/>
          <b>IronClaw</b>
        </a><br/>
        <sub>⭐ 2.1K</sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/anomalyco/opencode">
          <img src="./public/providers/opencode.svg" alt="OpenCode" width="48"/><br/>
          <b>OpenCode</b>
        </a><br/>
        <sub>⭐ 106K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/openai/codex">
          <img src="./public/providers/codex.png" alt="Codex CLI" width="48"/><br/>
          <b>Codex CLI</b>
        </a><br/>
        <sub>⭐ 60.8K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/anthropics/claude-code">
          <img src="./public/providers/claude.png" alt="Claude Code" width="48"/><br/>
          <b>Claude Code</b>
        </a><br/>
        <sub>⭐ 67.3K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/google-gemini/gemini-cli">
          <img src="./public/providers/gemini-cli.png" alt="Gemini CLI" width="48"/><br/>
          <b>Gemini CLI</b>
        </a><br/>
        <sub>⭐ 94.7K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/Kilo-Org/kilocode">
          <img src="./public/providers/kilocode.png" alt="Kilo Code" width="48"/><br/>
          <b>Kilo Code</b>
        </a><br/>
        <sub>⭐ 15.5K</sub>
      </td>
    </tr>
  </table>

<sub>📡 すべてのエージェントは <code>http://localhost:20128/v1</code> または <code>http://cloud.omniroute.online/v1</code> 経由で接続します — 1 つの構成、無制限のモデルとクォータ</sub>

---

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 ウェブサイト](https://omniroute.online) • [🚀 クイックスタート](#-クイックスタート) • [💡 主な機能](#-主な機能) • [📖 ドキュメント](#-ドキュメント) • [💰 料金](#-価格の概要) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

🌐 **対応言語:** 🇺🇸 [English](../../README.md) | 🇧🇷 [Português (Brasil)](../pt-BR/README.md) | 🇪🇸 [Español](../es/README.md) | 🇫🇷 [Français](../fr/README.md) | 🇮🇹 [Italiano](../it/README.md) | 🇷🇺 [Русский](../ru/README.md) | 🇨🇳 [中文 (简体)](../zh-CN/README.md) | 🇩🇪 [Deutsch](../de/README.md) | 🇮🇳 [हिन्दी](../in/README.md) | 🇹🇭 [ไทย](../th/README.md) | 🇺🇦 [Українська](../uk-UA/README.md) | 🇸🇦 [العربية](../ar/README.md) | 🇯🇵 [日本語](../ja/README.md) | 🇻🇳 [Tiếng Việt](../vi/README.md) | 🇧🇬 [Български](../bg/README.md) | 🇩🇰 [Dansk](../da/README.md) | 🇫🇮 [Suomi](../fi/README.md) | 🇮🇱 [עברית](../he/README.md) | 🇭🇺 [Magyar](../hu/README.md) | 🇮🇩 [Bahasa Indonesia](../id/README.md) | 🇰🇷 [한국어](../ko/README.md) | 🇲🇾 [Bahasa Melayu](../ms/README.md) | 🇳🇱 [Nederlands](../nl/README.md) | 🇳🇴 [Norsk](../no/README.md) | 🇵🇹 [Português (Portugal)](../pt/README.md) | 🇷🇴 [Română](../ro/README.md) | 🇵🇱 [Polski](../pl/README.md) | 🇸🇰 [Slovenčina](../sk/README.md) | 🇸🇪 [Svenska](../sv/README.md) | 🇵🇭 [Filipino](../phi/README.md)

</div>

---

## 🖼️

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute" width="800"/>
</div>

---

## 📸

<details>
<summary><b>...</b></summary>

| #     | #                                        |
| ----- | ---------------------------------------- |
| **1** | ![1](docs/screenshots/01-providers.png)  |
| **2** | ![2](docs/screenshots/02-combos.png)     |
| **3** | ![3](docs/screenshots/03-analytics.png)  |
| **4** | ![4](docs/screenshots/04-health.png)     |
| **5** | ![5](docs/screenshots/05-translator.png) |
| **6** | ![6](docs/screenshots/06-settings.png)   |
| **7** | ![7](docs/screenshots/07-cli-tools.png)  |
| **8** | ![8](docs/screenshots/08-usage.png)      |
| **9** | ![9](docs/screenshots/09-endpoint.png)   |

</details>

---

## 🤔 なぜオムニルートなのか?

**お金の無駄遣いや限界に達するのはやめましょう:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> サブスクリプション割り当ては毎月未使用のまま期限切れになります
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> レート制限によりコーディングの途中で停止する
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> 高価な API (プロバイダーごとに月額 20 ～ 50 ドル)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> プロバイダー間の手動切り替え

**OmniRoute はこれを解決します:**

- ✅ **サブスクリプションを最大化** - クォータを追跡し、リセットする前にすべてのビットを使用します
- ✅ **自動フォールバック** - サブスクリプション → API キー → 安価 → 無料、ダウンタイムなし
- ✅ **マルチアカウント** - プロバイダーごとのアカウント間のラウンドロビン
- ✅ **ユニバーサル** - Claude Code、Codex、Gemini CLI、Cursor、Cline、OpenClaw、あらゆる CLI ツールで動作します

---

## 📧 サポート

> 💬 **コミュニティに参加してください!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — ヘルプを取得し、ヒントを共有し、最新情報を入手してください。

- **ウェブサイト**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **問題**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **オリジナル プロジェクト**: [9router by decolua](https://github.com/decolua/9router)

---

## 🔄 仕組み

```
┌─────────────┐
│  Your CLI   │  (Claude Code, Codex, Gemini CLI, OpenClaw, Cursor, Cline...)
│   Tool      │
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────┐
│           OmniRoute (Smart Router)        │
│  • Format translation (OpenAI ↔ Claude) │
│  • Quota tracking + Embeddings + Images │
│  • Auto token refresh                   │
└──────┬──────────────────────────────────┘
       │
       ├─→ [Tier 1: SUBSCRIPTION] Claude Code, Codex, Gemini CLI
       │   ↓ quota exhausted
       ├─→ [Tier 2: API KEY] DeepSeek, Groq, xAI, Mistral, NVIDIA NIM, etc.
       │   ↓ budget limit
       ├─→ [Tier 3: CHEAP] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ budget limit
       └─→ [Tier 4: FREE] iFlow, Qwen, Kiro (unlimited)

Result: Never stop coding, minimal cost
```

---

## 🎯 OmniRoute が解決するもの — 30 の実際の問題点とユースケース

> **AI ツールを使用するすべての開発者は、これらの問題に日々直面しています。** OmniRoute は、コスト超過から地域ブロック、壊れた OAuth フローからプロトコル操作、企業の可観測性まで、それらすべてを解決するために構築されました。

<details>
<summary><b>💸 1. 「高価なサブスクリプションの料金を支払っているのに、制限によって中断されます」</b></summary>

開発者は、Claude Pro、Codex Pro、または GitHub Copilot に月額 20 ～ 200 ドルを支払います。有料であっても、割り当てには上限があり、5 時間の使用量、週ごとの制限、または分ごとのレート制限があります。コーディング セッションの途中でプロバイダーが応答を停止し、開発者はフローと生産性を失います。

**OmniRoute がそれを解決する方法:**

- **スマート 4 層フォールバック** — サブスクリプション クォータが不足すると、手動介入なしで自動的に API キー→格安→無料にリダイレクトされます。
- **リアルタイム クォータ トラッキング** — リセット カウントダウン (5 時間、毎日、毎週) でトークンの消費量をリアルタイムで表示します。
- **マルチアカウントのサポート** — 自動ラウンドロビンによるプロバイダーごとの複数のアカウント — 1 つのアカウントがなくなると、次のアカウントに切り替わります
- **カスタム コンボ** — 6 つのバランシング戦略 (フィルファースト、ラウンドロビン、P2C、ランダム、最小使用、コスト最適化) を備えたカスタマイズ可能なフォールバック チェーン
- **Codex Business クォータ** — ビジネス/チームのワークスペース クォータをダッシュボードで直接監視

</details>

<details>
<summary><b>🔌 2. 「複数のプロバイダーを使用する必要がありますが、それぞれに異なる API があります」</b></summary>

OpenAI は 1 つの形式を使用し、Claude (Anthropic) は別の形式を使用し、Gemini はさらに別の形式を使用します。開発者が異なるプロバイダーのモデルをテストしたり、プロバイダー間でフォールバックしたりする場合は、SDK を再構成し、エンドポイントを変更し、互換性のない形式に対処する必要があります。カスタム プロバイダー (FriendLI、NIM) には、非標準モデルのエンドポイントがあります。

**OmniRoute がそれを解決する方法:**

- **統合エンドポイント** - 単一の `http://localhost:20128/v1` が 36 を超えるすべてのプロバイダーのプロキシとして機能します
- **フォーマット変換** — 自動かつ透過的: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **レスポンスのサニタイズ** — OpenAI SDK v1.83 以降を破壊する非標準フィールド (`x_groq`、`usage_breakdown`、`service_tier`) を除去します。
- **ロールの正規化** — 非 OpenAI プロバイダーに対して `developer` → `system` を変換します。 GLM/ERNIE 用 `system` → `user`
- **Think Tag Extraction** — DeepSeek R1 などのモデルから `<think>` ブロックを標準化された `reasoning_content` に抽出します。
- **Gemini の構造化出力** — `json_schema` → `responseMimeType`/`responseSchema` 自動変換
- **`stream` のデフォルトは `false`** — OpenAI 仕様に準拠し、Python/Rust/Go SDK での予期しない SSE を回避します

</details>

<details>
<summary><b>🌐 3. 「AI プロバイダーが私の地域/国をブロックしています」</b></summary>

OpenAI/Codex などのプロバイダーは、特定の地理的地域からのアクセスをブロックします。 OAuth および API 接続中に、ユーザーは `unsupported_country_region_territory` のようなエラーを受け取ります。これは、発展途上国の開発者にとって特にイライラさせられます。

**OmniRoute がそれを解決する方法:**

- **3 レベルのプロキシ構成** — 3 つのレベルで構成可能なプロキシ: グローバル (すべてのトラフィック)、プロバイダーごと (1 つのプロバイダーのみ)、および接続/キーごと
- **色分けされたプロキシ バッジ** — 視覚的なインジケーター: 🟢 グローバル プロキシ、🟡 プロバイダー プロキシ、🔵 接続プロキシ、常に IP を表示
- **プロキシを介した OAuth トークン交換** — OAuth フローもプロキシを通過し、`unsupported_country_region_territory` を解決します
- **プロキシ経由の接続テスト** — 接続テストは構成されたプロキシを使用します (直接バイパスはありません)。
- **SOCKS5 サポート** — アウトバウンド ルーティングに対する SOCKS5 プロキシの完全なサポート
- **TLS フィンガープリント スプーフィング** — `wreq-js` を介したブラウザーのような TLS フィンガープリントによりボット検出をバイパスします

</details>

<details>
<summary><b>🆓 4. 「AIを使ってコーディングしたいけどお金がない」</b></summary>

誰もが AI サブスクリプションに月額 20 ～ 200 ドルを支払えるわけではありません。学生、新興国の開発者、愛好家、フリーランサーは、高品質のモデルに無料でアクセスできる必要があります。

**OmniRoute がそれを解決する方法:**

- **無料利用枠プロバイダーの組み込み** — 100% 無料プロバイダーのネイティブ サポート: iFlow (8 つの無制限のモデル)、Qwen (3 つの無制限のモデル)、Kiro (無料の Claude)、Gemini CLI (180K/月無料)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **無料のみのコンボ** — チェーン `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = 月額 0 ドル、ダウンタイムなし
- **NVIDIA NIM 無料クレジット** — 1000 の無料クレジットが統合されています
- **コスト最適化戦略** — 利用可能な最も安価なプロバイダーを自動的に選択するルーティング戦略

</details>

<details>
<summary><b>🔒 5. 「AI ゲートウェイを不正アクセスから保護する必要があります」</b></summary>

AI ゲートウェイをネットワーク (LAN、VPS、Docker) に公開すると、アドレスを持っている人は誰でも開発者のトークン/クォータを消費できます。保護がなければ、API は誤用、即時挿入、悪用に対して脆弱になります。

**OmniRoute がそれを解決する方法:**

- **API キー管理** — 専用の `/dashboard/api-manager` ページを使用したプロバイダーごとの生成、ローテーション、およびスコープ設定
- **モデルレベルの権限** — すべて許可/制限の切り替えにより、API キーを特定のモデル (`openai/*`、ワイルドカード パターン) に制限します
- **API エンドポイント保護** - `/v1/models` のキーを要求し、リストから特定のプロバイダーをブロックします
- **認証ガード + CSRF 保護** — すべてのダッシュボード ルートは `withAuth` ミドルウェア + CSRF トークンで保護されています
- **レート リミッター** — 構成可能なウィンドウによる IP ごとのレート制限
- **IP フィルタリング** — アクセス制御の許可リスト/ブロックリスト
- **プロンプト インジェクション ガード** — 悪意のあるプロンプト パターンに対するサニタイズ
- **AES-256-GCM 暗号化** — 認証情報は保存時に暗号化されます

</details>

<details>
<summary><b>🛑 6. 「プロバイダーがダウンしてコーディング フローが失われました」</b></summary>

AI プロバイダーが不安定になったり、5xx エラーを返したり、一時的なレート制限に達したりする可能性があります。開発者が単一のプロバイダーに依存している場合、それらは中断されます。サーキット ブレーカーがないと、再試行を繰り返すとアプリケーションがクラッシュする可能性があります。

**OmniRoute がそれを解決する方法:**

- **プロバイダーごとのサーキット ブレーカー** — 設定可能なしきい値とクールダウンによる自動開閉 (クローズ/オープン/ハーフオープン)
- **指数バックオフ** — 漸進的な再試行遅延
- **Anti-Thundering Herd** — 同時再試行の嵐に対するミューテックス + セマフォ保護
- **コンボ フォールバック チェーン** - プライマリ プロバイダーに障害が発生した場合、介入なしで自動的にチェーンを通過します。
- **コンボ サーキット ブレーカー** — コンボ チェーン内の障害が発生したプロバイダーを自動的に無効にします
- **ヘルス ダッシュボード** — 稼働時間モニタリング、サーキット ブレーカーの状態、ロックアウト、キャッシュ統計、p50/p95/p99 レイテンシ

</details>

<details>
<summary><b>🔧 7. 「各 AI ツールの設定は面倒で繰り返しが多い」</b></summary>

開発者は、Cursor、Claude Code、Codex CLI、OpenClaw、Gemini CLI、Kilo Code を使用します。各ツールには異なる構成 (API エンドポイント、キー、モデル) が必要です。プロバイダーや機種変更時に再設定するのは時間の無駄です。

**OmniRoute がそれを解決する方法:**

- **CLI ツール ダッシュボード** — Claude Code、Codex CLI、OpenClaw、Kilo Code、Antigravity、Cline をワンクリックでセットアップできる専用ページ
- **GitHub Copilot Config Generator** — モデルを一括選択して VS Code の `chatLanguageModels.json` を生成します
- **オンボーディング ウィザード** - 初めてユーザー向けのガイド付き 4 ステップ セットアップ
- **1 つのエンドポイント、すべてのモデル** — `http://localhost:20128/v1` を 1 回構成すると、36 を超えるプロバイダーにアクセスできます

</details>

<details>
<summary><b>🔑 8. 「複数のプロバイダーからの OAuth トークンを管理するのは地獄です」</b></summary>

Claude Code、Codex、Gemini CLI、Copilot — すべては有効期限切れのトークンを持つ OAuth 2.0 を使用します。開発者は定期的に再認証し、`client_secret is missing`、`redirect_uri_mismatch`、およびリモート サーバーの障害に対処する必要があります。 LAN/VPS 上の OAuth は特に問題があります。

**OmniRoute がそれを解決する方法:**

- **自動トークン更新** — OAuth トークンは有効期限が切れる前にバックグラウンドで更新されます。
- **OAuth 2.0 (PKCE) ビルトイン** — Claude Code、Codex、Gemini CLI、Copilot、Kiro、Qwen、iFlow の自動フロー
- **マルチアカウント OAuth** — JWT/ID トークン抽出によるプロバイダーごとの複数のアカウント
- **OAuth LAN/リモート修正** — `redirect_uri` のプライベート IP 検出 + リモート サーバーの手動 URL モード
- **Nginx の背後にある OAuth** — リバース プロキシの互換性のために `window.location.origin` を使用します
- **リモート OAuth ガイド** — VPS/Docker での Google Cloud 認証情報のステップバイステップ ガイド

</details>

<details>
<summary><b>📊 9. 「どこにいくら使っているのか分かりません」</b></summary>

開発者は複数の有料プロバイダーを使用していますが、支出について統一した見解がありません。各プロバイダーには独自の請求ダッシュボードがありますが、統合されたビューはありません。予期せぬ出費がかさむ可能性があります。

**OmniRoute がそれを解決する方法:**

- **コスト分析ダッシュボード** — トークンごとのコスト追跡とプロバイダーごとの予算管理
- **階層ごとの予算制限** — 自動フォールバックをトリガーする階層ごとの支出上限
- **モデルごとの価格構成** — モデルごとに構成可能な価格
- **API キーごとの使用統計** — キーごとのリクエスト数と最後に使用されたタイムスタンプ
- **分析ダッシュボード** — 統計カード、モデル使用状況グラフ、成功率と遅延を含むプロバイダー表

</details>

<details>
<summary><b>🐛 10. 「AI 呼び出しのエラーや問題を診断できません」</b></summary>

呼び出しが失敗すると、開発者はそれがレート制限なのか、トークンの期限切れなのか、間違った形式なのか、プロバイダーのエラーなのかわかりません。さまざまな端末にわたる断片化されたログ。可観測性がなければ、デバッグは試行錯誤になります。

**OmniRoute がそれを解決する方法:**

- **統合ログ ダッシュボード** — 4 つのタブ: リクエスト ログ、プロキシ ログ、監査ログ、コンソール
- **コンソール ログ ビューア** — 色分けされたレベル、自動スクロール、検索、フィルターを備えたリアルタイムのターミナル スタイルのビューア
- **SQLite プロキシ ログ** — サーバーの再起動後も存続する永続的なログ
- **Translator Playground** — 4 つのデバッグ モード: プレイグラウンド (形式変換)、チャット テスター (往復)、テストベンチ (バッチ)、ライブ モニター (リアルタイム)
- **リクエスト テレメトリ** — p50/p95/p99 レイテンシ + X-Request-Id トレース
- **ローテーションを使用したファイルベースのログ** — コンソール インターセプターは、サイズベースのローテーションを使用してすべてを JSON ログにキャプチャします。

</details>

<details>
<summary><b>🏗️ 11. 「ゲートウェイの導入と保守は複雑です」</b></summary>

さまざまな環境 (ローカル、VPS、Docker、クラウド) 間で AI プロキシをインストール、構成、維持するには、多大な労力がかかります。ハードコーディングされたパス、ディレクトリ上の `EACCES`、ポートの競合、クロスプラットフォーム ビルドなどの問題により、摩擦が増大します。

**OmniRoute がそれを解決する方法:**

- **npm グローバル インストール** — `npm install -g omniroute && omniroute` — 完了
- **Docker マルチプラットフォーム** — AMD64 + ARM64 ネイティブ (Apple Silicon、AWS Graviton、Raspberry Pi)
- **Docker Compose プロファイル** — `base` (CLI ツールなし) および `cli` (Claude Code、Codex、OpenClaw あり)
- **Electron デスクトップ アプリ** — システム トレイ、自動起動、オフライン モードを備えた Windows/macOS/Linux 用ネイティブ アプリ
- **分割ポート モード** - 高度なシナリオ (リバース プロキシ、コンテナ ネットワーキング) 向けに個別のポート上の API とダッシュボード
- **Cloud Sync** — Cloudflare Workers を介したデバイス間での設定の同期
- **DB バックアップ** — すべての設定の自動バックアップ、復元、エクスポート、インポート

</details>

<details>
<summary><b>🌍 12. 「インターフェースは英語のみで、私のチームは英語を話せません」</b></summary>

非英語圏の国、特にラテンアメリカ、アジア、ヨーロッパのチームは、英語のみのインターフェースに苦労しています。言語の壁があると採用が減り、構成エラーが増加します。

**OmniRoute がそれを解決する方法:**

- **ダッシュボード i18n — 30 言語** — アラビア語、ブルガリア語、デンマーク語、ドイツ語、スペイン語、フィンランド語、フランス語、ヘブライ語、ヒンディー語、ハンガリー語、インドネシア語、イタリア語、日本語、韓国語、マレー語、オランダ語、ノルウェー語、ポーランド語、ポルトガル語 (PT/BR)、ルーマニア語、ロシア語、スロバキア語、スウェーデン語、タイ語、ウクライナ語、ベトナム語、中国語、フィリピン語、英語
- **RTL サポート** — アラビア語とヘブライ語の右から左へのサポート
- **多言語 README** — 30 件の完全なドキュメント翻訳
- **言語セレクター** — リアルタイム切り替えのためのヘッダーの地球儀アイコン

</details>

<details>
<summary><b>🔄 13. 「チャット以上のものが必要です — 埋め込み、画像、音声が必要です」</b></summary>

AIは単なるチャット補完ではありません。開発者は、画像の生成、音声の文字起こし、RAG の埋め込みの作成、ドキュメントの再ランク付け、およびコンテンツの管理を行う必要があります。各 API には異なるエンドポイントと形式があります。

**OmniRoute がそれを解決する方法:**

- **エンベディング** — 6 つのプロバイダーと 9 つ以上のモデルを備えた `/v1/embeddings`
- **画像生成** — 10 プロバイダーと 20 以上のモデルを備えた `/v1/images/generations` (OpenAI、xAI、Togetter、Fireworks、Nebius、Hyperbolic、NanoBanana、Antigravity、SD WebUI、ComfyUI)
- **Text-to-Video** — `/v1/videos/generations` — ComfyUI (AnimateDiff、SVD) および SD WebUI
- **テキストから音楽へ** — `/v1/music/generations` — ComfyUI (安定したオーディオ オープン、MusicGen)
- **音声転写** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM、HuggingFace、Qwen3
- **テキスト読み上げ** — `/v1/audio/speech` — イレブンラボ、Nvidia NIM、HuggingFace、Coqui、Tortoise、Qwen3、+ 既存のプロバイダー
- **モデレーション** — `/v1/moderations` — コンテンツの安全性チェック
- **再ランキング** — `/v1/rerank` — ドキュメントの関連性の再ランキング
- **応答 API** — Codex の `/v1/responses` の完全サポート

</details>

<details>
<summary><b>🧪 14. 「モデル間で品質をテストして比較する方法がありません」</b></summary>

開発者は、コード、翻訳、推論などのユースケースにどのモデルが最適であるかを知りたいと考えていますが、手動で比較するのは時間がかかります。統合された評価ツールは存在しません。

**OmniRoute がそれを解決する方法:**

- **LLM 評価** — 挨拶、数学、地理、コード生成、JSON 準拠、翻訳、マークダウン、安全性の拒否をカバーする 10 個の事前ロードされたケースによるゴールデン セット テスト
- **4 つのマッチ戦略** — `exact`、`contains`、`regex`、`custom` (JS 関数)
- **Translator Playground Test Bench** — 複数の入力と予想される出力を使用したバッチ テスト、クロスプロバイダー比較
- **チャット テスター** — 視覚的な応答レンダリングによる完全な往復
- **ライブ モニター** — プロキシを通過するすべてのリクエストのリアルタイム ストリーム

</details>

<details>
<summary><b>📈 15. 「パフォーマンスを落とさずにスケールする必要がある」</b></summary>

リクエストの量が増えると、同じ質問をキャッシュしないと重複したコストが発生します。冪等性がないと、重複したリクエストにより処理が無駄になります。プロバイダーごとのレート制限を遵守する必要があります。

**OmniRoute がそれを解決する方法:**

- **セマンティック キャッシュ** — 2 層キャッシュ (署名 + セマンティック) によりコストと遅延が削減されます。
- **リクエストの冪等性** — 同一のリクエストに対する重複排除ウィンドウは 5 秒です
- **レート制限検出** — プロバイダーごとの RPM、最小ギャップ、最大同時トラッキング
- **編集可能なレート制限** — [設定] → [永続性を伴う回復力] で構成可能なデフォルト
- **API キー検証キャッシュ** — 運用パフォーマンスのための 3 層キャッシュ
- **テレメトリ付きヘルス ダッシュボード** — p50/p95/p99 レイテンシ、キャッシュ統計、稼働時間

</details>

<details>
<summary><b>🤖 16. 「モデルの動作をグローバルに制御したい」</b></summary>

すべての応答を特定の言語、特定の口調で行いたい、または推論トークンを制限したい開発者。すべてのツール/リクエストでこれを設定するのは現実的ではありません。

**OmniRoute がそれを解決する方法:**

- **システム プロンプト インジェクション** — すべてのリクエストに適用されるグローバル プロンプト
- **思考予算検証** — リクエストごとの推論トークン割り当て制御 (パススルー、自動、カスタム、適応)
- **6 ルーティング戦略** — リクエストの分散方法を決定するグローバル戦略
- **ワイルドカード ルーター** - `provider/*` パターンは任意のプロバイダーに動的にルーティングします
- **コンボ有効/無効切り替え** — ダッシュボードから直接コンボを切り替えます
- **プロバイダー切り替え** — ワンクリックでプロバイダーのすべての接続を有効/無効にします。
- **ブロックされたプロバイダー** — `/v1/models` リストから特定のプロバイダーを除外します

</details>

<details>
<summary><b>🧰 17. 「一流の製品機能として MCP ツールが必要です」</b></summary>

多くの AI ゲートウェイは、MCP を非表示の実装詳細としてのみ公開します。チームには、目に見えて管理しやすいオペレーション レイヤーが必要です。

**OmniRoute がそれを解決する方法:**

- MCP はダッシュボードのナビゲーションとエンドポイント プロトコル タブに表示されます
- プロセス、ツール、スコープ、監査を備えた専用の MCP 管理ページ
- `omniroute --mcp` およびクライアントのオンボーディング用の組み込みクイックスタート

</details>

<details>
<summary><b>🧠 18. 「同期 + ストリーム タスク パスを備えた A2A オーケストレーションが必要です」</b></summary>

エージェント ワークフローには、直接応答と、ライフサイクル制御による長時間実行のストリーミング実行の両方が必要です。

**OmniRoute がそれを解決する方法:**

- A2A JSON-RPC エンドポイント (`POST /a2a`) (`message/send` および `message/stream`)
- 端末状態の伝播を伴う SSE ストリーミング
- `tasks/get` および `tasks/cancel` のタスク ライフサイクル API

</details>

<details>
<summary><b>🛰️ 19. 「推測されたステータスではなく、実際の MCP プロセスの健全性が必要です」</b></summary>

運用チームは、API が到達可能かどうかだけでなく、MCP が実際に生きているかどうかを知る必要があります。

**OmniRoute がそれを解決する方法:**

- PID、タイムスタンプ、トランスポート、ツール数、およびスコープモードを含むランタイムハートビートファイル
- ハートビートと最近のアクティビティを組み合わせた MCP ステータス API
- プロセス/稼働時間/ハートビートの鮮度を示す UI ステータス カード

</details>

<details>
<summary><b>📋 20. 「監査可能な MCP ツールの実行が必要です」</b></summary>

ツールが構成を変更したり、運用アクションをトリガーしたりする場合、チームはフォレンジックなトレーサビリティを必要とします。

**OmniRoute がそれを解決する方法:**

- MCP ツール呼び出しの SQLite ベースの監査ログ
- ツール、成功/失敗、API キー、ページネーションによるフィルター
- ダッシュボード監査テーブル + 自動化のための統計エンドポイント

</details>

<details>
<summary><b>🔐 21. 「統合ごとにスコープ指定された MCP 権限が必要です」</b></summary>

異なるクライアントには、ツール カテゴリへの最小限の特権アクセスが必要です。

**OmniRoute がそれを解決する方法:**

- 制御されたツールアクセスのための 9 つの詳細な MCP スコープ
- MCP 管理 UI でのスコープの適用と可視性
- 運用ツールの安全なデフォルト姿勢

</details>

<details>
<summary><b>⚙️ 22. 「再デプロイせずに運用制御が必要です」</b></summary>

チームは、インシデントやコスト イベントが発生した際に、実行時の変更を迅速に行う必要があります。

**OmniRoute がそれを解決する方法:**

- MCP ダッシュボードからコンボのアクティブ化を直接切り替えます
- 事前定義されたポリシーパックから復元プロファイルを適用
- 同じ操作パネルからサーキットブレーカーの状態をリセット
  | 🎯 **Endpoint-Aware Models** | Custom models declare supported endpoints + API format |

</details>

<details>
<summary><b>🔄 23. 「ライブ A2A タスクのライフサイクルの可視化とキャンセルが必要です」</b></summary>

ライフサイクルの可視性がなければ、タスク インシデントの優先順位付けが困難になります。

**OmniRoute がそれを解決する方法:**

- ページネーションを使用した状態/スキルによるタスクのリスト/フィルタリング
- タスクのメタデータ、イベント、アーティファクトのドリルダウン
- タスクキャンセルエンドポイントと確認付きの UI アクション

</details>

<details>
<summary><b>🌊 24. 「A2A ロード用のアクティブ ストリーム メトリクスが必要です」</b></summary>

ストリーミング ワークフローには、同時実行性とライブ接続に関する運用上の洞察が必要です。

**OmniRoute がそれを解決する方法:**

- アクティブ ストリーム カウンターが A2A ステータスに統合されました
- 最後のタスクのタイムスタンプと状態ごとのカウント
- リアルタイム運用監視用の A2A ダッシュボード カード

</details>

<details>
<summary><b>🪪 25. 「クライアントの標準エージェント検出が必要です」</b></summary>

外部クライアントとオーケストレーターには、オンボーディング用の機械可読メタデータが必要です。

**OmniRoute がそれを解決する方法:**

- エージェント カードが `/.well-known/agent.json` で公開される
- 管理UIに表示される能力とスキル
- A2A ステータス API には自動化のための検出メタデータが含まれています

</details>

<details>
<summary><b>🧭 26. 「製品 UX にプロトコルの検出機能が必要です」</b></summary>

ユーザーがプロトコルの表面を発見できない場合、導入とサポートの品質が低下します。

**OmniRoute がそれを解決する方法:**

- MCP および A2A のサイドバー エントリ
- クイックスタートとステータスを含むエンドポイント ページの [プロトコル] タブ
- 概要から専用の管理ダッシュボードへのリンク

</details>

<details>
<summary><b>🧪 27. 「実際のクライアントを使用したエンドツーエンドのプロトコル検証が必要です」</b></summary>

模擬テストは、リリース前にプロトコルの互換性を検証するには十分ではありません。

**OmniRoute がそれを解決する方法:**

- アプリを起動し、実際の MCP SDK クライアント トランスポートを使用する E2E スイート
- A2A クライアントは、フローの検出、送信、ストリーミング、取得、キャンセルをテストします。
- MCP 監査および A2A タスク API に対するアサーションのクロスチェック

</details>

<details>
<summary><b>📡 28. 「すべてのインターフェースにわたって統合された可観測性が必要です」</b></summary>

プロトコルごとに可観測性を分割すると、盲点が生じ、MTTR が長くなります。

**OmniRoute がそれを解決する方法:**

- ダッシュボード/ログ/分析を 1 つの製品に統合
- OpenAI、MCP、A2A レイヤーにわたるヘルス + 監査 + リクエスト テレメトリ
- ステータスと自動化のための運用 API

</details>

<details>
<summary><b>💼 29. 「プロキシ + ツール + エージェント オーケストレーション用のランタイムが 1 つ必要です」</b></summary>

多くの個別のサービスを実行すると、運用コストが増加し、障害モードが増加します。

**OmniRoute がそれを解決する方法:**

- OpenAI互換プロキシ、MCPサーバー、A2Aサーバーを1つのスタックに搭載
- 共有認証、復元力、データストア、可観測性
- すべての対話面にわたる一貫したポリシー モデル

</details>

<details>
<summary><b>🚀 30. 「グルーコードのスプロールなしでエージェント ワークフローを出荷する必要がある」</b></summary>

複数のアドホック サービスとスクリプトをつなぎ合わせると、チームの速度が低下します。

**OmniRoute がそれを解決する方法:**

- クライアントとエージェント向けの統合エンドポイント戦略
- 組み込みのプロトコル管理 UI とスモーク検証パス
- 本番環境に対応した基盤 (セキュリティ、ロギング、復元力、バックアップ)

</details>

### プレイブックの例 (統合されたユースケース)

**戦略 A: 有料サブスクリプション + 安価なバックアップを最大限に活用する**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**プレイブック B: ゼロコストのコーディング スタック**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**プレイブック C: 24 時間年中無休の常時オンのフォールバック チェーン**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**プレイブック D: MCP + A2A を使用したエージェントの運用**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ クイックスタート

**1.グローバルにインストール:**

```bash
npm install -g omniroute
omniroute
```

🎉 ダッシュボードは `http://localhost:20128` に開きます

| コマンド                | 説明                                            |
| ----------------------- | ----------------------------------------------- |
| `omniroute`             | サーバーを起動します (デフォルトのポート 20128) |
| `omniroute --port 3000` | カスタムポートを使用する                        |
| `omniroute --no-open`   | ブラウザを自動的に開かない                      |
| `omniroute --help`      | ヘルプを表示                                    |

**2.無料のプロバイダーに接続します:**

ダッシュボード → プロバイダー → **Claude Code** または **Antigravity** に接続 → OAuth ログイン → 完了!

**3. CLI ツールで使用します:**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Settings:
  Endpoint: http://localhost:20128/v1
  API Key: [copy from dashboard]
  Model: if/kimi-k2-thinking
```

**それだけです!** 無料の AI モデルを使用してコーディングを始めましょう。

**代替 — ソースから実行:**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

---

## 🐳 ドッカー

OmniRoute は、[Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute) のパブリック Docker イメージとして利用できます。

**クイック実行:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**環境ファイルあり:**

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Docker Compose の使用:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| 画像                     | タグ     | サイズ  | 説明                 |
| ------------------------ | -------- | ------- | -------------------- |
| `diegosouzapw/omniroute` | `latest` | ～250MB | 最新の安定版リリース |
| `diegosouzapw/omniroute` | `1.0.3`  | ～250MB | 現在のバージョン     |

---

---

## 🖥️

> 🆕 **新機能！** OmniRouteが**ネイティブデスクトップアプリケーション**としてWindows、macOS、Linuxで利用可能になりました。

- 🖥️ **ネイティブウィンドウ** — システムトレイ統合付きの専用ウィンドウ
- 🔄 **自動起動** — システムログイン時にOmniRouteを起動
- 🔔 **ネイティブ通知** — クォータ枯渇やプロバイダー問題のアラート
- ⚡ **ワンクリックインストール** — NSIS (Windows)、DMG (macOS)、AppImage (Linux)
- 🌐 **オフラインモード** — 内蔵サーバーで完全オフライン動作

```bash
npm run electron:dev           # 開発モード
npm run electron:build         # 現在のプラットフォーム
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg)
npm run electron:build:linux   # Linux (.AppImage)
```

📖 完全なドキュメント：[`electron/README.md`](electron/README.md)

---

## 💰 価格の概要

| 階層                      | プロバイダー               | コスト                     | クォータのリセット  | 最適な用途         |
| ------------------------- | -------------------------- | -------------------------- | ------------------- | ------------------ |
| **💳 サブスクリプション** | クロード・コード (プロ)    | $20/月                     | 5 時間 + 毎週       | すでに購読済み     |
|                           | コーデックス (プラス/プロ) | $20-200/月                 | 5 時間 + 毎週       | OpenAI ユーザー    |
|                           | ジェミニ CLI               | **無料**                   | 180K/月 + 1K/日     | みんな！           |
|                           | GitHub コパイロット        | $10-19/月                  | 月刊                | GitHub ユーザー    |
| **🔑 API キー**           | NVIDIA NIM                 | **無料** (1000 クレジット) | ワンタイム          | 無料枠のテスト     |
|                           | ディープシーク             | 従量課金制                 | なし                | 最高の価格/品質    |
|                           | グロク                     | 無料利用枠 + 有料          | レート制限          | 超高速推論         |
|                           | xAI (グロック)             | 従量課金制                 | なし                | Grok モデル        |
|                           | ミストラル                 | 無料利用枠 + 有料          | レート制限          | ヨーロッパのAI     |
|                           | オープンルーター           | 従量課金制                 | なし                | 100 以上のモデル   |
| **💰安い**                | GLM-4.7                    | $0.6/100万                 | 毎日午前 10 時      | 予算のバックアップ |
|                           | ミニマックス M2.1          | $0.2/100万                 | 5時間ローリング     | 最も安いオプション |
|                           | キミ K2                    | 月額 9 ドルのフラット      | 1,000 万トークン/月 | 予測可能なコスト   |
| **🆓 無料**               | iFlow                      | $0                         | 無制限              | 8 モデルは無料     |
|                           | クウェン                   | $0                         | 無制限              | 3 モデルは無料     |
|                           | キロ                       | $0                         | 無制限              | クロード・フリー   |

**💡 プロのヒント:** Gemini CLI (180,000 無料/月) + iFlow (無制限の無料) コンボ = コスト 0 ドルから始めましょう!

---

## 💡 主な機能

### 🧠 コアルーティングとインテリジェンス

| 特集                                        | 何をするのか                                                                        |
| ------------------------------------------- | ----------------------------------------------------------------------------------- |
| 🎯 **スマート 4 層フォールバック**          | 自動ルート: サブスクリプション → API キー → 格安 → 無料                             |
| 📊 **リアルタイムのクォータ追跡**           | プロバイダーごとのライブ トークン数 + リセット カウントダウン                       |
| 🔄 **フォーマット変換**                     | OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro シームレス + 応答サニタイズ                |
| 👥 **マルチアカウントのサポート**           | インテリジェントな選択によるプロバイダーごとの複数のアカウント                      |
| 🔄 **自動トークン更新**                     | OAuth トークンは再試行によって自動的に更新されます。                                |
| 🎨 **カスタムコンボ**                       | 6 つの戦略: フィルファースト、ラウンドロビン、p2c、ランダム、最小使用、コスト最適化 |
| 🧩 **カスタムモデル**                       | 任意のモデル ID を任意のプロバイダーに追加する                                      |
| 🌐 **ワイルドカードルーター**               | `provider/*` パターンを任意のプロバイダーに動的にルーティングする                   |
| 🧠 **予算を考える**                         | 推論モデルのパススルー、自動、カスタム、および適応モード                            |
| 🔀 **Model Aliases**                        | Auto-forward deprecated model IDs to current replacements (built-in + custom)       |
| ⚡ **Background Degradation**               | Auto-route background tasks (titles, summaries) to cheaper models                   |
| 💬 **システム プロンプト インジェクション** | すべてのリクエストに適用されるグローバル システム プロンプト                        |
| 📄 **レスポンス API**                       | Codex の OpenAI Response API (`/v1/responses`) の完全なサポート                     |

### 🎵 マルチモーダル API

| 特集                    | 何をするのか                                                                                                                                                               |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **画像生成**         | `/v1/images/generations` — 4 つのプロバイダー、9 つ以上のモデル                                                                                                            |
| 📐 **埋め込み**         | `/v1/embeddings` — 6 つのプロバイダー、9 つ以上のモデル                                                                                                                    |
| 🎤 **音声文字起こし**   | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **テキスト読み上げ** | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise)                                      |
| 🛡️ **モデレーション**   | `/v1/moderations` — コンテンツの安全性チェック                                                                                                                             |
| 🔀 **再ランキング**     | `/v1/rerank` — ドキュメントの関連性の再ランキング                                                                                                                          |

### 🛡️ 復元力とセキュリティ

| 特集                             | 何をするのか                                                                 |
| -------------------------------- | ---------------------------------------------------------------------------- |
| 🔌 **サーキットブレーカー**      | 設定可能なしきい値によるプロバイダーごとの自動開閉                           |
| 🎯 **Endpoint-Aware Models**     | Custom models declare supported endpoints + API format                       |
| 🛡️ **対雷鳴の群れ**              | API キープロバイダーのミューテックス + セマフォのレート制限                  |
| 🧠 **セマンティック キャッシュ** | 2 層キャッシュ (シグネチャ + セマンティック) によりコストと遅延が削減        |
| ⚡ **冪等性のリクエスト**        | 重複リクエストに対する 5 秒の重複除去ウィンドウ                              |
| 🔒 **TLS 指紋スプーフィング**    | wreq-js 経由で TLS ベースのボット検出をバイパスする                          |
| 🌐 **IP フィルタリング**         | API アクセス制御の許可リスト/ブロックリスト                                  |
| 📊 **編集可能なレート制限**      | システム レベルで構成可能な RPM、最小ギャップ、最大同時実行                  |
| 💾 **Rate Limit Persistence**    | Learned limits survive restarts via SQLite with 60s debounce + 24h staleness |
| 🔄 **Token Refresh Resilience**  | Per-provider circuit breaker (5 fails→30min) + 30s timeout per attempt       |
| 🛡 **API エンドポイント保護**    | `/models` エンドポイントの認証ゲート + プロバイダー ブロック                 |
| 🔒 **プロキシの可視性**          | 色分けされたバッジ: 🟢 グローバル、🟡 プロバイダー、🔵 IP 表示による接続ごと |
| 🌐 **3 レベルのプロキシ構成**    | グローバル、プロバイダーごと、または接続ごとのレベルでプロキシを構成する     |

### 📊 可観測性と分析

| 特集                            | 何をするのか                                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| 📝 **リクエストログ**           | 完全なリクエスト/レスポンス ログを含むデバッグ モード                                                        |
| 💾 **SQLite プロキシ ログ**     | 永続的なプロキシ ログはサーバーの再起動後も存続します。                                                      |
| 📊 **分析ダッシュボード**       | Recharts を活用: 統計カード、モデル使用状況チャート、プロバイダー テーブル                                   |
| 📈 **進捗状況の追跡**           | ストリーミング用の SSE 進行状況イベントをオプトインする                                                      |
| 🧪 **LLM 評価**                 | 4 つの試合戦略によるゴールデン セット テスト                                                                 |
| 🔍 **テレメトリのリクエスト**   | p50/p95/p99 レイテンシ集計 + X-Request-Id トレース                                                           |
| 📋 **ログ ダッシュボード**      | 統合された 4 つのタブ ページ: リクエスト ログ、プロキシ ログ、監査ログ、コンソール                           |
| 🖥️ **コンソール ログ ビューア** | レベルフィルター、検索、自動スクロール機能を備えたリアルタイムターミナルスタイルのビューア                   |
| 📑 **ファイルベースのロギング** | コンソール インターセプターは、ローテーションを使用してすべての出力を JSON ログ ファイルにキャプチャします。 |
| 🏥 **健康ダッシュボード**       | システム稼働時間、サーキット ブレーカーの状態、ロックアウト、キャッシュ統計                                  |
| 💰 **コスト追跡**               | 予算管理 + モデルごとの価格設定                                                                              |

### ☁️ 導入と同期

| 特集                                | 何をするのか                                                                        |
| ----------------------------------- | ----------------------------------------------------------------------------------- |
| 💾 **クラウド同期**                 | Cloudflare Workers 経由でデバイス間で構成を同期する                                 |
| 🌐 **どこにでも展開**               | Localhost、VPS、Docker、Cloudflare ワーカー                                         |
| 🔑 **API キー管理**                 | プロバイダーごとに API キーを生成、ローテーション、スコープ設定する                 |
| 🧙 **オンボーディング ウィザード**  | 初めてのユーザーのための 4 ステップのガイド付きセットアップ                         |
| 🔧 **CLI ツール ダッシュボード**    | Claude、Codex、Cline、OpenClaw、Kilo、Antigravity をワンクリックで設定              |
| 🔄 **DB バックアップ**              | すべての設定の自動バックアップ、復元、エクスポートとインポート                      |
| 🌐 **国際化**                       | next-intl を備えた完全な i18n — 英語 + ポルトガル語 (ブラジル) のサポート           |
| 🌍 **言語セレクター**               | リアルタイム言語切り替え用のヘッダーの地球儀アイコン (🇺🇸/🇧🇷)                        |
| 📂 **カスタム データ ディレクトリ** | デフォルトの `~/.omniroute` ストレージ パスをオーバーライドする `DATA_DIR` 環境変数 |

<details>
<summary><b>📖 機能の詳細</b></summary>

### 🎯 スマート 4 層フォールバック

自動フォールバックを使用してコンボを作成します。

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6        (your subscription)
  2. nvidia/llama-3.3-70b      (free NVIDIA API)
  3. glm/glm-4.7               (cheap backup, $0.6/1M)
  4. if/kimi-k2-thinking       (free fallback)

→ Auto switches when quota runs out or errors occur
```

### 📊 リアルタイムのクォータ追跡

- プロバイダーごとのトークン消費量
- リセットカウントダウン（5時間、毎日、毎週）
- 有料レベルのコストの見積もり
- 毎月の支出レポート

### 🔄 フォーマット変換

フォーマット間でのシームレスな翻訳:

- **OpenAI** ↔ **クロード** ↔ **ジェミニ** ↔ **OpenAI の応答**
- CLI ツールが OpenAI 形式を送信 → OmniRoute が変換 → プロバイダーがネイティブ形式を受信
- カスタム OpenAI エンドポイントをサポートするあらゆるツールと連携
- **レスポンスのサニタイズ** — 厳密な OpenAI SDK 互換性のために非標準フィールドを削除します
- **ロールの正規化** — 非 OpenAI の場合は `developer` → `system`。 `system` → `user` (GLM/ERNIE モデルの場合)
- **思考タグの抽出** — `<think>` ブロック → 思考モデル用の `reasoning_content`
- **構造化された出力** — `json_schema` → Gemini の `responseMimeType`/`responseSchema`

### 👥 マルチアカウントのサポート

- プロバイダーごとに複数のアカウントを追加
- 自動ラウンドロビンまたは優先順位ベースのルーティング
- クォータに達した場合、次のアカウントにフォールバックします

### 🔄 自動トークン更新

- OAuth トークンは有効期限が切れる前に自動的に更新されます
- 手動による再認証は必要ありません
- すべてのプロバイダーにわたるシームレスなエクスペリエンス

### 🎨 カスタムコンボ

- 無制限のモデルの組み合わせを作成
- 6 つの戦略: フィルファースト、ラウンドロビン、2 つの選択肢の累乗、ランダム、最小使用、コスト最適化
- Cloud Sync を使用してデバイス間でコンボを共有

### 🏥 健康ダッシュボード

- システムステータス (稼働時間、バージョン、メモリ使用量)
- プロバイダーごとのサーキットブレーカーの状態 (クローズ/オープン/ハーフオープン)
  | 🎯 **Endpoint-Aware Models** | Custom models declare supported endpoints + API format |
- レート制限ステータスとアクティブなロックアウト
- 署名キャッシュ統計
- レイテンシ テレメトリ (p50/p95/p99) + プロンプト キャッシュ
- ワンクリックで健康状態をリセット

### 🔧 翻訳者の遊び場

OmniRoute には、API 翻訳のデバッグ、テスト、監視のための **4 つのモード**を備えた強力な組み込みのトランスレータ プレイグラウンドが含まれています。

| モード                   | 説明                                                                                                                                                                                                                                |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **💻遊び場**             | 直接形式変換 — API リクエスト本文を貼り付けると、OmniRoute がプロバイダー形式 (OpenAI ↔ Claude ↔ Gemini ↔ Responses API) 間でそれをどのように変換するかを即座に確認できます。テンプレートの例と形式の自動検出が含まれています。     |
| **💬 チャット テスター** | 実際のチャット リクエストを OmniRoute 経由で送信すると、入力、翻訳されたリクエスト、プロバイダーの応答、そして返される翻訳された応答という完全なラウンドトリップを確認できます。コンボ ルーティングを検証するのに非常に役立ちます。 |
| **🧪 テストベンチ**      | バッチ テスト モード - 異なる入力と予想される出力を持つ複数のテスト ケースを定義し、それらをすべて一度に実行し、プロバイダーやモデル間で結果を比較します。                                                                          |
| **📱 ライブモニター**    | リアルタイムのリクエスト監視 — 受信リクエストが OmniRoute を通過するのを監視し、ライブで行われているフォーマット変換を確認し、問題を即座に特定します。                                                                              |

**アクセス:** ダッシュボード → トランスレーター (サイドバー)

### 💾 クラウド同期

- デバイス間でプロバイダー、コンボ、設定を同期します
- 自動バックグラウンド同期
- 安全な暗号化ストレージ

</details>

## 🧪 評価 (Evals)

OmniRoute には、ゴールデン セットに対して LLM 応答品質をテストするための評価フレームワークが組み込まれています。ダッシュボードの **Analytics → Evals** からアクセスします。

### 内蔵ゴールデンセット

プリロードされた「OmniRoute Golden Set」には、以下をカバーする 10 のテスト ケースが含まれています。

- 挨拶、数学、地理、コード生成
- JSON形式への準拠、翻訳、マークダウン
- 安全拒否（有害なコンテンツ）、カウント、ブール論理

### 評価戦略

| 戦略       | 説明                                                                                        | 例          |
| ---------- | ------------------------------------------------------------------------------------------- | ----------- |
| `exact`    | 出力は正確に一致する必要があります                                                          | `"4"`       |
| `contains` | 出力には部分文字列が含まれている必要があります (大文字と小文字は区別されません)。 `"Paris"` |
| `regex`    | 出力は正規表現パターンと一致する必要があります                                              | `"1.*2.*3"` |
| `custom`   | カスタム JS 関数は true/false を返します。 `(output) => output.length > 10`                 |

---

## 📖 セットアップガイド

<details>
<summary><b>💳 サブスクリプションプロバイダー</b></summary>

### クロード コード (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**プロのヒント:** 複雑なタスクには Opus を使用し、速度を求める場合は Sonnet を使用します。 OmniRoute はモデルごとの割り当てを追跡します。

### OpenAI コーデックス (プラス/プロ)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

### Gemini CLI (月額 180,000 回無料!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**ベストバリュー:** 膨大な無料枠!有料レベルの前にこれを使用してください。

### GitHub コパイロット

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

</details>

<details>
<summary><b>🔑 API キープロバイダー</b></summary>

### NVIDIA NIM (無料 1000 クレジット!)

1. サインアップ: [build.nvidia.com](https://build.nvidia.com)
2. 無料の API キーを取得します (1000 推論クレジットが含まれます)
3. ダッシュボード → プロバイダーの追加 → NVIDIA NIM:
   - API キー: `nvapi-your-key`

**モデル:** `nvidia/llama-3.3-70b-instruct`、`nvidia/mistral-7b-instruct`、および 50 以上

**プロのヒント:** OpenAI 互換 API — OmniRoute のフォーマット変換とシームレスに連携します。

### ディープシーク

1. サインアップ: [platform.deepseek.com](https://platform.deepseek.com)
2. APIキーを取得する
3. ダッシュボード → プロバイダーの追加 → DeepSeek

**モデル:** `deepseek/deepseek-chat`、`deepseek/deepseek-coder`

### Groq (無料利用枠あり!)

1. サインアップ: [console.groq.com](https://console.groq.com)
2. API キーを取得します (無料利用枠を含む)
3. ダッシュボード → プロバイダーの追加 → Groq

**モデル:** `groq/llama-3.3-70b`、`groq/mixtral-8x7b`

**プロのヒント:** 超高速推論 — リアルタイム コーディングに最適です。

### OpenRouter (100 以上のモデル)

1. サインアップ: [openrouter.ai](https://openrouter.ai)
2. APIキーを取得する
3. ダッシュボード → プロバイダーの追加 → OpenRouter

**モデル:** 単一の API キーを通じて、すべての主要プロバイダーの 100 以上のモデルにアクセスします。

</details>

<details>
<summary><b>💰 格安プロバイダー (バックアップ)</b></summary>

### GLM-4.7 (毎日リセット、0.6 ドル/100 万ドル)

1. サインアップ: [Zhipu AI](https://open.bigmodel.cn/) 2.コーディングプランからAPIキーを取得
2. ダッシュボード → API キーの追加:
   - プロバイダー: `glm`
   - API キー: `your-key`

**使用方法:** `glm/glm-4.7`

**プロのヒント:** コーディング プランでは、1/7 のコストで 3 倍の割り当てを提供します。毎日午前 10 時にリセットされます。

### MiniMax M2.1 (5 時間リセット、$0.20/1M)

1. サインアップ: [MiniMax](https://www.minimax.io/)
2. APIキーを取得する
3. ダッシュボード → APIキーの追加

**使用方法:** `minimax/MiniMax-M2.1`

**プロのヒント:** 長いコンテキスト (100 万トークン) の最も安価なオプション!

### キミ K2 (月額一律 $9)

1. 購読: [Moonshot AI](https://platform.moonshot.ai/)
2. APIキーを取得する
3. ダッシュボード → APIキーの追加

**使用方法:** `kimi/kimi-latest`

**プロのヒント:** 1,000 万トークンの固定 $9/月 = 0.90 ドル/100 万の実効コスト!

</details>

<details>
<summary><b>🆓 無料プロバイダー (緊急バックアップ)</b></summary>

### iFlow (8 つの無料モデル)

```bash
Dashboard → Connect iFlow
→ iFlow OAuth login
→ Unlimited usage

Models:
  if/kimi-k2-thinking
  if/qwen3-coder-plus
  if/glm-4.7
  if/minimax-m2
  if/deepseek-r1
```

### Qwen (3 つの無料モデル)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### キロ (クロード・フリー)

```bash
Dashboard → Connect Kiro
→ AWS Builder ID or Google/GitHub
→ Unlimited usage

Models:
  kr/claude-sonnet-4.5
  kr/claude-haiku-4.5
```

</details>

<details>
<summary><b>🎨 コンボを作成</b></summary>

### 例 1: サブスクリプションを最大化 → 安価なバックアップ

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### 例 2: 無料のみ (コストゼロ)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

</details>

<details>
<summary><b>🔧 CLI 統合</b></summary>

### カーソル IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### クロードコード

ダッシュボードの **CLI ツール** ページを使用してワンクリック構成するか、`~/.claude/settings.json` を手動で編集します。

### コーデックス CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### オープンクロー

**オプション 1 — ダッシュボード (推奨):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**オプション 2 — 手動:** `~/.openclaw/openclaw.json` を編集:

```json
{
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://127.0.0.1:20128/v1",
        "apiKey": "sk_omniroute",
        "api": "openai-completions"
      }
    }
  }
}
```

> **注:** OpenClaw はローカル OmniRoute でのみ機能します。 IPv6 解決の問題を回避するには、`localhost` ではなく `127.0.0.1` を使用してください。

### クライン / 継続 / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

</details>

---

## 🐛 トラブルシューティング

<details>
<summary><b>クリックしてトラブルシューティング ガイドを展開</b></summary>

**「言語モデルがメッセージを提供しませんでした」**

- プロバイダー クォータが枯渇した → ダッシュボード クォータ トラッカーを確認してください
- 解決策: コンボフォールバックを使用するか、より安価なレベルに切り替える

**レート制限**

- サブスクリプション クォータ アウト → GLM/MiniMax へのフォールバック
- コンボを追加: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**OAuth トークンの有効期限が切れました**

- OmniRouteによる自動更新
- 問題が解決しない場合: ダッシュボード → プロバイダー → 再接続

**高コスト**

- [ダッシュボード] → [コスト] で使用状況の統計を確認します。
- プライマリ モデルを GLM/MiniMax に切り替えます
- 重要ではないタスクには無料枠 (Gemini CLI、iFlow) を使用する

**ダッシュボードが間違ったポートで開きます**

- `PORT=20128` および `NEXT_PUBLIC_BASE_URL=http://localhost:20128` を設定します

**クラウド同期エラー**

- `BASE_URL` が実行中のインスタンスを指していることを確認します
- `CLOUD_URL` が予想されるクラウド エンドポイントを指していることを確認します
- `NEXT_PUBLIC_*` 値をサーバー側の値と一致させます。

**最初のログインが機能しない**

- `.env` の `INITIAL_PASSWORD` を確認してください
- 設定されていない場合、フォールバック パスワードは `123456` です

**リクエストログなし**

- `.env` に `ENABLE_REQUEST_LOGS=true` を設定します

**OpenAI 互換プロバイダーの接続テストで「無効」と表示される**

- 多くのプロバイダーは `/models` エンドポイントを公開していません
- OmniRoute v1.0.6+ には、チャット完了によるフォールバック検証が含まれています
- ベース URL に `/v1` サフィックスが含まれていることを確認してください

### 🔐 サーバーリモートの OAuth (リモート OAuth セットアップ)

<a name="oauth-em-servidor-remoto"></a>

> **⚠️ VPS/Docker/サーバーリモートの OmniRoute に関する重要事項**

### OAuth

**反重力** と **Gemini CLI** を使用して **Google OAuth 2.0** を認証します。 O Google exige que a `redirect_uri` usada no fluxo OAuth seja **exatamente** uma das URIs pré-cadastradas Google Cloud Console でアプリケーションを実行できません。

認証情報として OAuth は、`localhost`\*\* の OmniRoute データベース管理機能を備えていません。 OmniRoute サーバー リモートへのアクセス (例: `https://omniroute.meuservidor.com`)、Google による認証:

```
Error 400: redirect_uri_mismatch
```

### 解決策: OAuth の固有資格情報を構成する

**OAuth 2.0 クライアント ID** では、Google Cloud Console の URI がサーバーを参照するための正確な基準が設定されています。

#### パッソ ア パッソ

**1. Google Cloud コンソールへのアクセス**

アブラ: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2.新しい OAuth 2.0 クライアント ID**

- Clique em **「+ 認証情報の作成」** → **「OAuth クライアント ID」**
- 応用情報: **「Web アプリケーション」**
- 名前: escolha qualquer 名前 (例: `OmniRoute Remote`)

**3.承認されたリダイレクト URI としての Adicione**

**「承認されたリダイレクト URI」** はありません、アディシオン:

```
https://seu-servidor.com/callback
```

> `seu-servidor.com` を IP サーバーとして置き換えてください (必要なポータルを含む、例: `http://45.33.32.156:20128/callback`)。

**4.コピーを認証情報として保存**

Google のほとんどの情報、**クライアント ID**、または **クライアント シークレット** を使用してください。

**5.環境変数として設定**

`.env` は使用できません (Docker の環境変数を変更します):

```bash
# Para Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret

# Para Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
```

**6.レイニシー・オ・オムニルート**

```bash
# Se usando npm:
npm run dev

# Se usando Docker:
docker restart omniroute
```

**7.テンテ コネクター ノヴァメンテ**

ダッシュボード → プロバイダー → Antigravity (Gemini CLI) → OAuth

`https://seu-servidor.com/callback` の認証機能を Google でリダイレクトして修正します。

---

### 一時的な回避策 (資格情報を適切に設定する)

**URL のマニュアル**:

1. OmniRoute は Google の自動 URL を提供します
2. `localhost` による Google の自動リダイレクト (サーバー リモートの要求)
3. **URL をコピーしてください** ブラウザを使用してブラウザを開きます (カレーグのページを表示します)
4. コール エッサ URL は、OmniRoute の接続モーダルなしです。
5. クリーク**「接続」**

> 自動回避策の機能は URL から独立してリダイレクトされます。

</details>

---

## 🛠️

- **ランタイム**: Node.js 18–22 LTS (⚠️ Node.js 24+ は **サポートされていません** — `better-sqlite3` ネイティブ バイナリは互換性がありません)
- **言語**: TypeScript 5.9 — `src/` および `open-sse/` で **100% TypeScript** (v1.0.6)
- **フレームワーク**: Next.js 16 + React 19 + Tailwind CSS 4
- **データベース**: LowDB (JSON) + SQLite (ドメイン状態 + プロキシ ログ)
- **ストリーミング**: サーバー送信イベント (SSE)
- **認証**: OAuth 2.0 (PKCE) + JWT + API キー
- **テスト**: Node.js テスト ランナー (368 以上の単体テスト)
- **CI/CD**: GitHub アクション (自動 npm パブリッシュ + リリース時の Docker Hub)
- **ウェブサイト**: [omniroute.online](https://omniroute.online)
- **パッケージ**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **復元力**: サーキット ブレーカー、エクスポネンシャル バックオフ、サンダーリング ハード対策、TLS スプーフィング

---

## 📖 ドキュメント

| ドキュメント                                 | 説明                                                     |
| -------------------------------------------- | -------------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)             | プロバイダー、コンボ、CLI 統合、展開                     |
| [API Reference](docs/API_REFERENCE.md)       | すべてのエンドポイントと例                               |
| [Troubleshooting](docs/TROUBLESHOOTING.md)   | よくある問題と解決策                                     |
| [Architecture](docs/ARCHITECTURE.md)         | システム アーキテクチャと内部構造                        |
| [Contributing](CONTRIBUTING.md)              | 開発セットアップとガイドライン                           |
| [OpenAPI Spec](docs/openapi.yaml)            | OpenAPI 3.0 仕様                                         |
| [Security Policy](SECURITY.md)               | 脆弱性の報告とセキュリティの実践                         |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md) | 完全ガイド: VM + nginx + Cloudflare セットアップ         |
| [Features Gallery](docs/FEATURES.md)         | スクリーンショットを含むビジュアル ダッシュボード ツアー |

### 📸 ダッシュボードのプレビュー

<details>
<summary><b>クリックしてダッシュボードのスクリーンショットを表示</b></summary>

| ページ             | スクリーンショット                                |
| ------------------ | ------------------------------------------------- |
| **プロバイダー**   | ![Providers](docs/screenshots/01-providers.png)   |
| **コンボ**         | ![Combos](docs/screenshots/02-combos.png)         |
| **分析**           | ![Analytics](docs/screenshots/03-analytics.png)   |
| **健康**           | ![Health](docs/screenshots/04-health.png)         |
| **翻訳者**         | ![Translator](docs/screenshots/05-translator.png) |
| **設定**           | ![Settings](docs/screenshots/06-settings.png)     |
| **CLI ツール**     | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **使用ログ**       | ![Usage](docs/screenshots/08-usage.png)           |
| **エンドポイント** | ![Endpoint](docs/screenshots/09-endpoint.png)     |

</details>

---

## 🗺️

OmniRoute には、複数の開発フェーズにわたって **210 以上の機能が計画されています**。主要な領域は次のとおりです。

| カテゴリー                            | 計画されている機能 | ハイライト                                                                                                     |
| ------------------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------- |
| 🧠 **ルーティングとインテリジェンス** | 25+                | 最低レイテンシのルーティング、タグベースのルーティング、クォータ プリフライト、P2C アカウントの選択            |
| 🔒 **セキュリティとコンプライアンス** | 20歳以上           | SSRF の強化、資格情報のクローキング、エンドポイントごとのレート制限、管理キーのスコーピング                    |
| 📊 **可観測性**                       | 15 歳以上          | OpenTelemetry 統合、リアルタイム クォータ監視、モデルごとのコスト追跡                                          |
| 🔄 **プロバイダーの統合**             | 20歳以上           | 動的モデル レジストリ、プロバイダーのクールダウン、マルチアカウント Codex、Copilot クォータ解析                |
| ⚡ **パフォーマンス**                 | 15 歳以上          | デュアル キャッシュ レイヤー、プロンプト キャッシュ、応答キャッシュ、ストリーミング キープアライブ、バッチ API |
| 🌐 **生態系**                         | 10+                | WebSocket API、構成ホットリロード、分散構成ストア、商用モード                                                  |

### 🔜近日公開予定

- 🔗 **OpenCode Integration** — OpenCode AI コーディング IDE のネイティブ プロバイダー サポート
- 🔗 **TRAE 統合** — TRAE AI 開発フレームワークの完全サポート
- 📦 **バッチ API** — 一括リクエストの非同期バッチ処理
- 🎯 **タグベースのルーティング** — カスタムタグとメタデータに基づいてリクエストをルーティングします
- 💰 **最低コスト戦略** — 利用可能な最も安価なプロバイダーを自動的に選択します

> 📝 [link](docs/new-features/) で全機能の仕様が利用可能 (217 の詳細仕様)

---

## 👥 貢献者

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### 貢献方法

1. リポジトリをフォークする
2. 機能ブランチを作成します (`git checkout -b feature/amazing-feature`)
3. 変更をコミットします (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュします (`git push origin feature/amazing-feature`)
5. プルリクエストを開く

詳細なガイドラインについては、[CONTRIBUTING.md](CONTRIBUTING.md) を参照してください。

### 新しいバージョンのリリース

```bash
# Create a release — npm publish happens automatically
gh release create v1.0.6 --title "v1.0.6" --generate-notes
```

---

## 📊 スターの歴史

## Stargazers over time

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 謝辞

このフォークのきっかけとなった元のプロジェクトである **[decolua](https://github.com/decolua)** による **[9router](https://github.com/decolua/9router)** に感謝します。 OmniRoute は、追加機能、マルチモーダル API、完全な TypeScript の書き換えを備えた素晴らしい基盤の上に構築されています。

この JavaScript 移植のきっかけとなったオリジナルの Go 実装である **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** に感謝します。

---

## 📄 ライセンス

MIT ライセンス - 詳細については、[LICENSE](LICENSE) を参照してください。

---

---
