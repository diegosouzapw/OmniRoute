# 🚀 OmniRoute — 無料の AI ゲートウェイ

### コーディングを決してやめないでください。自動フォールバックを備えた **無料および低コストの AI モデル**へのスマート ルーティング。

_ユニバーサル API プロキシ - 1 つのエンドポイント、67 以上のプロバイダー、ダウンタイムなし。 **MCP および A2A** エージェント オーケストレーションを使用できるようになりました。_

**チャット補完 • 埋め込み • 画像生成 • ビデオ • 音楽 • オーディオ • 再ランキング • **Web 検索** • MCP サーバー • A2A プロトコル • 100% TypeScript**

---

<div align="center">

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![npm downloads](https://img.shields.io/npm/dm/omniroute?color=cb3837&logo=npm&label=npm%20downloads)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![Docker Pulls](https://img.shields.io/docker/pulls/diegosouzapw/omniroute?logo=docker&color=2496ED&label=docker%20pulls)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

</div>

🌐 **入手可能な場所:** 🇺🇸 [English](README.md) | 🇧🇷 [Português (Brasil)](docs/i18n/pt-BR/README.md) | 🇪🇸 [Español](docs/i18n/es/README.md) | 🇫🇷 [Français](docs/i18n/fr/README.md) | 🇮🇹 [Italiano](docs/i18n/it/README.md) | 🇷🇺 [Русский](docs/i18n/ru/README.md) | 🇨🇳 [中文 (简体)](docs/i18n/zh-CN/README.md) | 🇩🇪 [Deutsch](docs/i18n/de/README.md) | 🇮🇳 [हिन्दी](docs/i18n/in/README.md) | 🇹🇭 [ไทย](docs/i18n/th/README.md) | 🇺🇦 [Українська](docs/i18n/uk-UA/README.md) | 🇸🇦 [العربية](docs/i18n/ar/README.md) | 🇯🇵 [日本語](docs/i18n/ja/README.md) | 🇻🇳 [Tiếng Việt](docs/i18n/vi/README.md) | 🇧🇬 [Български](docs/i18n/bg/README.md) | 🇩🇰 [Dansk](docs/i18n/da/README.md) | 🇫🇮 [Suomi](docs/i18n/fi/README.md) | 🇮🇱 [עברית](docs/i18n/he/README.md) | 🇭🇺 [Magyar](docs/i18n/hu/README.md) | 🇮🇩 [Bahasa Indonesia](docs/i18n/id/README.md) | 🇰🇷 [한국어](docs/i18n/ko/README.md) | 🇲🇾 [Bahasa Melayu](docs/i18n/ms/README.md) | 🇳🇱 [Nederlands](docs/i18n/nl/README.md) | 🇳🇴 [Norsk](docs/i18n/no/README.md) | 🇵🇹 [Português (Portugal)](docs/i18n/pt/README.md) | 🇷🇴 [Română](docs/i18n/ro/README.md) | 🇵🇱 [Polski](docs/i18n/pl/README.md) | 🇸🇰 [Slovenčina](docs/i18n/sk/README.md) | 🇸🇪 [Svenska](docs/i18n/sv/README.md) | 🇵🇭 [Filipino](docs/i18n/phi/README.md) | 🇨🇿 [Čeština](docs/i18n/cs/README.md)

---

## 🆕 v3.0.0 の新機能

> **v2.9.5 からアップグレードしますか?** — すべての変更点については、[full CHANGELOG](CHANGELOG.md#300--2026-03-22-release-candidate--not-yet-merged-to-main) を参照してください。

| エリア                              | 変更                                                                                                                                                                                                  |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔒 **CodeQL セキュリティ**          | 10 件以上の CodeQL アラートを修正: 多項式やり直し、安全でないランダム性、シェル インジェクションの修復                                                                                                |
| ✅ **ルート検証**                   | 176 個の API ルートすべてが Zod スキーマ + `validateBody()` — CI `check:route-validation:t06` パスで検証されるようになりました。                                                                      |
| 🐛 **omniModel タグのリーク**       | 内部 `<omniModel>` タグは、SSE ストリーミング応答でクライアントにリークしなくなりました (#585)。                                                                                                      |
| 🔑 **登録キー API**                 | `POST /api/v1/registered-keys` 経由で API キーを自動プロビジョニングし、プロバイダー/アカウントごとのクォータ適用、冪等性、SHA-256 ストレージ、およびオプションの GitHub 問題レポートを使用できます。 |
| 🎨 **プロバイダーアイコン**         | PNG を使用した `@lobehub/icons` (SVG) → 汎用フォールバック チェーン経由の 130 以上のプロバイダー ロゴ                                                                                                 |
| 🔄 **モデルの自動同期**             | 24 時間スケジューラーと手動 UI を切り替えて、組み込みおよびカスタムの OpenAI 互換プロバイダーのモデル リストを同期                                                                                    |
| 🌐 **OpenCode Zen/Go**              | PR #530 経由の @kang-heewon からの 2 つの新しいプロバイダー: 無料枠 + `OpencodeExecutor` 経由のサブスクリプション枠                                                                                   |
| 🐛 **Gemini CLI OAuth**             | Docker に `GEMINI_OAUTH_CLIENT_SECRET` が見つからない場合の対処可能なエラー (不可解な Google エラー)                                                                                                  |
| 🐛 **OpenCode 構成**                | `saveOpenCodeConfig()` は TOML を `XDG_CONFIG_HOME` に正しく書き込むようになりました。                                                                                                                |
| 🐛 **固定モデルのオーバーライド**   | コンテキスト キャッシュ保護で `body.model` が `pinnedModel` に正しく設定されました。                                                                                                                  |
| 🐛 **コーデックス/クロード ループ** | `tool_result` ブロックは無限ループを防ぐためにテキストに変換されるようになりました。                                                                                                                  |
| 🐛 **ログインリダイレクト**         | パスワード設定をスキップしてもログインがフリーズしなくなりました                                                                                                                                      |
| 🐛 **Windows パス**                 | MSYS2/Git-Bash パス (`/c/...`) は `C:\...` に自動的に正規化されます。                                                                                                                                 |

---

## 🖼️ メイン ダッシュボード

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
</div>

---

## 📸 ダッシュボードのプレビュー

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
| **エンドポイント** | ![Endpoints](docs/screenshots/09-endpoint.png)    |

</details>

---

### 🤖 お気に入りのコーディング エージェント向けの無料 AI プロバイダー

_AI を活用した IDE または CLI ツールを、無制限のコーディングのための無料 API ゲートウェイである OmniRoute 経由で接続します。_

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/openclaw/openclaw">
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

## 🤔 なぜオムニルートなのか?

**お金の無駄遣いや限界に達するのはやめましょう:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> サブスクリプション クォータは毎月未使用のまま期限切れになります
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
- **貢献**: [CONTRIBUTING.md](CONTRIBUTING.md) を参照するか、PR を開くか、`good first issue` を選択してください
- **オリジナル プロジェクト**: [9router by decolua](https://github.com/decolua/9router)

### 🐛 バグを報告しますか?

問題を開くときは、system-info コマンドを実行して、生成されたファイルを添付してください。

```bash
npm run system-info
```

これにより、Node.js のバージョン、OmniRoute のバージョン、OS の詳細、インストールされている CLI ツール (iflow、gemini、claude、codex、antigravity、droid など)、Docker/PM2 のステータス、システム パッケージなど、問題を迅速に再現するために必要なものすべてを含む `system-info.txt` が生成されます。ファイルを GitHub の問題に直接添付します。

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
<summary><b>💸 1. 「高価なサブスクリプションの料金を支払っているのに、制限によって中断されます。」</b></summary>

開発者は、Claude Pro、Codex Pro、または GitHub Copilot に月額 20 ～ 200 ドルを支払います。有料であっても、割り当てには上限があり、5 時間の使用量、週ごとの制限、または分ごとのレート制限があります。コーディング セッションの途中でプロバイダーが応答を停止し、開発者はフローと生産性を失います。

**OmniRoute がそれを解決する方法:**

- **スマート 4 層フォールバック** — サブスクリプション クォータが不足すると、手動介入なしで自動的に API キー→格安→無料にリダイレクトされます。
- **リアルタイム クォータ トラッキング** — リセット カウントダウン (5 時間、毎日、毎週) でトークンの消費量をリアルタイムで表示します。
- **マルチアカウントのサポート** — 自動ラウンドロビンによるプロバイダーごとの複数のアカウント — 1 つのアカウントがなくなると、次のアカウントに切り替わります
- **カスタム コンボ** — 6 つのバランシング戦略 (フィルファースト、ラウンドロビン、P2C、ランダム、最小使用、コスト最適化) を備えたカスタマイズ可能なフォールバック チェーン
- **Codex Business クォータ** — ビジネス/チームのワークスペース クォータをダッシュボードで直接監視

</details>

<details>
<summary><b>🔌 2. 「複数のプロバイダーを使用する必要があるが、それぞれに異なる API がある」</b></summary>

OpenAI は 1 つの形式を使用し、Claude (Anthropic) は別の形式を使用し、Gemini はさらに別の形式を使用します。開発者が異なるプロバイダーのモデルをテストしたり、プロバイダー間でフォールバックしたりする場合は、SDK を再構成し、エンドポイントを変更し、互換性のない形式に対処する必要があります。カスタム プロバイダー (FriendLI、NIM) には、非標準モデルのエンドポイントがあります。

**OmniRoute がそれを解決する方法:**

- **統合エンドポイント** — 単一の `http://localhost:20128/v1` が 67 を超えるすべてのプロバイダーのプロキシとして機能します
- **フォーマット変換** — 自動かつ透過的: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **レスポンスのサニタイズ** — OpenAI SDK v1.83+ を破壊する非標準フィールド (`x_groq`、`usage_breakdown`、`service_tier`) を削除します。
- **ロールの正規化** — 非 OpenAI プロバイダーの場合は `developer` → `system` を変換します。 `system` → `user` (GLM/ERNIE 用)
- **Think Tag Extraction** — DeepSeek R1 などのモデルから `<think>` ブロックを標準化された `reasoning_content` に抽出します。
- **Gemini の構造化出力** — `json_schema` → `responseMimeType`/`responseSchema` 自動変換
- **`stream` のデフォルトは `false`** — OpenAI 仕様に準拠し、Python/Rust/Go SDK での予期しない SSE を回避します

</details>

<details>
<summary><b>🌐 3. 「AI プロバイダーが私の地域/国をブロックしています」</b></summary>

OpenAI/Codex などのプロバイダーは、特定の地理的地域からのアクセスをブロックします。ユーザーは、OAuth および API 接続中に `unsupported_country_region_territory` のようなエラーを受け取ります。これは、発展途上国の開発者にとって特にイライラさせられます。

**OmniRoute がそれを解決する方法:**

- **3 レベルのプロキシ構成** — 3 つのレベルで構成可能なプロキシ: グローバル (すべてのトラフィック)、プロバイダーごと (1 つのプロバイダーのみ)、および接続/キーごと
- **色分けされたプロキシ バッジ** — 視覚的なインジケーター: 🟢 グローバル プロキシ、🟡 プロバイダー プロキシ、🔵 接続プロキシ、常に IP を表示
- **プロキシを介した OAuth トークン交換** — OAuth フローもプロキシを経由し、`unsupported_country_region_territory` を解決します
- **プロキシ経由の接続テスト** — 接続テストは構成されたプロキシを使用します (直接バイパスはありません)。
- **SOCKS5 サポート** — アウトバウンド ルーティングに対する SOCKS5 プロキシの完全なサポート
- **TLS フィンガープリント スプーフィング** — `wreq-js` を介したブラウザーのような TLS フィンガープリントによりボット検出をバイパスします
- **🔏 CLI フィンガープリント マッチング** — ネイティブ CLI バイナリ署名と一致するようにヘッダーと本文フィールドの順序を変更し、アカウントにフラグを立てるリスクを大幅に軽減します。プロキシ IP は保持されます。ステルス ** と ** IP マスキングの両方を同時に取得できます。

</details>

<details>
<summary><b>🆓 4. 「コーディングに AI を使用したいが、お金がない」</b></summary>

誰もが AI サブスクリプションに月額 20 ～ 200 ドルを支払えるわけではありません。学生、新興国の開発者、愛好家、フリーランサーは、高品質のモデルに無料でアクセスできる必要があります。

**OmniRoute がそれを解決する方法:**

- **無料利用枠プロバイダーの組み込み** — 100% 無料プロバイダーのネイティブ サポート: iFlow (OAuth 経由の 5 つの無制限のモデル: kimi-k2- Thinking、qwen3-coder-plus、deepseek-r1、minimax-m2、kimi-k2)、Qwen (4 つの無制限のモデル: qwen3-coder-plus、qwen3-coder-flash、qwen3-coder-next、 vision-model)、Kiro (Claude + AWS Builder ID は無料)、Gemini CLI (180,000 トークン/月は無料)
- **Ollama Cloud** — 無料の「ライト使用量」レベルの `api.ollama.com` のクラウド ホスト型 Ollama モデル。 `ollamacloud/<model>` プレフィックスを使用する
- **無料のみのコンボ** — チェーン `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = 月額 0 ドル、ダウンタイムなし
- **NVIDIA NIM 無料アクセス** — ~40 RPM 開発 - build.nvidia.com で 70 以上のモデルに永久に無料アクセス (クレジットから純粋なレート制限に移行)
- **コスト最適化戦略** — 利用可能な最も安価なプロバイダーを自動的に選択するルーティング戦略

</details>

<details>
<summary><b>🔒 5. 「AI ゲートウェイを不正アクセスから保護する必要があります」</b></summary>

AI ゲートウェイをネットワーク (LAN、VPS、Docker) に公開すると、アドレスを持っている人は誰でも開発者のトークン/クォータを消費できます。保護がなければ、API は誤用、即時挿入、悪用に対して脆弱になります。

**OmniRoute がそれを解決する方法:**

- **API キー管理** — 専用の `/dashboard/api-manager` ページによるプロバイダーごとの生成、ローテーション、スコープ設定
- **モデルレベルの権限** — すべて許可/制限の切り替えにより、API キーを特定のモデル (`openai/*`、ワイルドカード パターン) に制限します
- **API エンドポイント保護** — `/v1/models` のキーを要求し、リストから特定のプロバイダーをブロックします
- **認証ガード + CSRF 保護** — すべてのダッシュボード ルートは `withAuth` ミドルウェア + CSRF トークンで保護されています
- **レート リミッター** — 構成可能なウィンドウによる IP ごとのレート制限
- **IP フィルタリング** — アクセス制御の許可リスト/ブロックリスト
- **プロンプト インジェクション ガード** — 悪意のあるプロンプト パターンに対するサニタイズ
- **AES-256-GCM 暗号化** — 認証情報は保存時に暗号化されます

</details>

<details>
<summary><b>🛑 6. 「プロバイダーがダウンし、コーディング フローが失われました」</b></summary>

AI プロバイダーが不安定になったり、5xx エラーを返したり、一時的なレート制限に達したりする可能性があります。開発者が単一のプロバイダーに依存している場合、それらは中断されます。サーキット ブレーカーがないと、再試行を繰り返すとアプリケーションがクラッシュする可能性があります。

**OmniRoute がそれを解決する方法:**

- **モデルごとのサーキット ブレーカー** — 設定可能なしきい値とクールダウン (閉/開/半開) による自動開閉、カスケード ブロックを回避するためのモデルごとのスコープ
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
- **1 つのエンドポイント、すべてのモデル** — `http://localhost:20128/v1` を 1 回構成すると、67 を超えるプロバイダーにアクセスできます

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

呼び出しが失敗すると、開発者はそれがレート制限なのか、トークンの期限切れなのか、間違った形式なのか、プロバイダーのエラーなのかわかりません。異なる端末間で断片化されたログ。可観測性がなければ、デバッグは試行錯誤になります。

**OmniRoute がそれを解決する方法:**

- **統合ログ ダッシュボード** — 4 つのタブ: リクエスト ログ、プロキシ ログ、監査ログ、コンソール
- **コンソール ログ ビューア** — 色分けされたレベル、自動スクロール、検索、フィルターを備えたリアルタイムのターミナル スタイルのビューア
- **SQLite プロキシ ログ** — サーバーの再起動後も存続する永続的なログ
- **Translator Playground** — 4 つのデバッグ モード: プレイグラウンド (形式変換)、チャット テスター (往復)、テストベンチ (バッチ)、ライブ モニター (リアルタイム)
- **リクエスト テレメトリ** — p50/p95/p99 レイテンシー + X-Request-Id トレース
- **ローテーションを使用したファイルベースのログ** — コンソール インターセプターは、サイズベースのローテーションを使用してすべてを JSON ログにキャプチャします。
- **システム情報レポート** - `npm run system-info` は、完全な環境 (ノード バージョン、OmniRoute バージョン、OS、CLI ツール、Docker/PM2 ステータス) を含む `system-info.txt` を生成します。即時トリアージのために問題を報告するときに添付してください。

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
<summary><b>🌍 12. 「インターフェースは英語のみで、私のチームは英語を話せません。」</b></summary>

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

- **エンベディング** — `/v1/embeddings` (6 つのプロバイダーと 9 つ以上のモデル)
- **画像生成** — 10 プロバイダーと 20 以上のモデルを備えた `/v1/images/generations` (OpenAI、xAI、Togetter、Fireworks、Nebius、Hyperbolic、NanoBanana、Antigravity、SD WebUI、ComfyUI)
- **Text-to-Video** — `/v1/videos/generations` — ComfyUI (AnimateDiff、SVD) および SD WebUI
- **Text-to-Music** — `/v1/music/generations` — ComfyUI (安定したオーディオ オープン、MusicGen)
- **音声転写** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM、HuggingFace、Qwen3
- **テキスト読み上げ** — `/v1/audio/speech` — イレブンラボ、Nvidia NIM、HuggingFace、Coqui、Tortoise、Qwen3、**Inworld**、**Cartesia**、**PlayHT**、+ 既存のプロバイダー
- **モデレーション** — `/v1/moderations` — コンテンツの安全性チェック
- **再ランキング** — `/v1/rerank` — ドキュメントの関連性の再ランキング
- **レスポンス API** — Codex の `/v1/responses` の完全サポート

</details>

<details>
<summary><b>🧪 14. 「モデル間で品質をテストして比較する方法がない」</b></summary>

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
<summary><b>🧠 18. 「同期 + ストリーム タスク パスを使用した A2A オーケストレーションが必要です」</b></summary>

エージェント ワークフローには、直接応答と、ライフサイクル制御による長時間実行のストリーミング実行の両方が必要です。

**OmniRoute がそれを解決する方法:**

- A2A JSON-RPC エンドポイント (`POST /a2a`) と `message/send` および `message/stream`
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

- `/.well-known/agent.json` で公開されたエージェント カード
- 管理UIに表示される能力とスキル
- A2A ステータス API には自動化のための検出メタデータが含まれています

</details>

<details>
<summary><b>🧭 26. 「製品 UX にプロトコルの検出機能が必要です」</b></summary>

ユーザーがプロトコルの表面を発見できない場合、導入とサポートの品質が低下します。

**OmniRoute がそれを解決する方法:**

- プロキシ、MCP、A2A、API エンドポイントのタブを備えた統合された **エンドポイント** ページ
- MCP および A2A のインライン サービス ステータスの切り替え (オンライン/オフライン)
- 概要から専用の管理タブへのリンク

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
3) Observe via /dashboard/endpoint (MCP and A2A tabs)
4) Toggle services via inline status controls
```

---

## 🆓 無料で始められる - 構成コストゼロ

> **$0/月**で AI コーディングを数分でセットアップできます。これらの無料アカウントを接続し、組み込みの **Free Stack** コンボを使用します。

| ステップ | アクション                                               | プロバイダーのロックが解除されました                             |
| -------- | -------------------------------------------------------- | ---------------------------------------------------------------- |
| 1        | **Kiro** に接続 (AWS ビルダー ID OAuth)                  | Claude Sonnet 4.5、Haiku 4.5 — **無制限**                        |
| 2        | **iFlow** に接続する (Google OAuth)                      | kimi-k2- Thinking、qwen3-coder-plus、deepseek-r1... — **無制限** |
| 3        | **Qwen** を接続 (デバイス コード)                        | qwen3-coder-plus、qwen3-coder-flash... — **無制限**              |
| 4        | **Gemini CLI** に接続する (Google OAuth)                 | gemini-3-flash、gemini-2.5-pro — **180K/月無料**                 |
| 5        | `/dashboard/combos` → **無料スタック ($0)** テンプレート | すべての無料プロバイダーを自動的にラウンドロビンします。         |

**任意の IDE/CLI を次のように指定します。** `http://localhost:20128/v1` · API キー: `any-string` · 完了。

> **オプションの追加補償範囲 (こちらも無料):** Groq API キー (30 RPM 無料)、NVIDIA NIM (40 RPM 無料、70 以上のモデル)、Cerebras (100 万トークン/日)、LongCat API キー (5000 万トークン/日!)、Cloudflare Workers AI (10,000 ニューロン/日、50 以上のモデル)。

## ⚡ クイックスタート

### 1) インストールして実行する

```bash
npm install -g omniroute
omniroute
```

> **pnpm ユーザー:** インストール後に `pnpm approve-builds -g` を実行して、`better-sqlite3` および `@swc/core` に必要なネイティブ ビルド スクリプトを有効にします。
>
> ```bash
> pnpm install -g omniroute
> pnpm approve-builds -g   # Select all packages → approve
> omniroute
> ```

ダッシュボードは `http://localhost:20128` で開き、API ベース URL は `http://localhost:20128/v1` です。

| コマンド                | 説明                                                                              |
| ----------------------- | --------------------------------------------------------------------------------- |
| `omniroute`             | サーバーを開始します (`PORT=20128`、API とダッシュボードは同じポート上にあります) |
| `omniroute --port 3000` | 正規/API ポートを 3000 に設定します。                                             |
| `omniroute --mcp`       | MCP サーバー (stdio トランスポート) を開始します。                                |
| `omniroute --no-open`   | ブラウザを自動的に開かない                                                        |
| `omniroute --help`      | ヘルプを表示                                                                      |

オプションの分割ポート モード:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) プロバイダーに接続し、API キーを作成します

1. ダッシュボード → `Providers` を開き、少なくとも 1 つのプロバイダー (OAuth または API キー) に接続します。
2. ダッシュボード → `Endpoints` を開き、API キーを作成します。
3. (オプション) ダッシュボード → `Combos` を開き、フォールバック チェーンを設定します。

### 3) コーディング ツールを OmniRoute に指定します

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

Claude Code、Codex CLI、Gemini CLI、Cursor、Cline、OpenClaw、OpenCode、OpenAI 互換 SDK で動作します。

### 4) プロトコルを有効にして検証する (v2.0)

**MCP (ツール主導の操作用):**

```bash
omniroute --mcp
```

次に、`stdio` 経由で MCP クライアントに接続し、次のようなツールをテストします。

- `omniroute_get_health`
- `omniroute_list_combos`

**A2A (エージェント間のワークフロー用):**

```bash
curl http://localhost:20128/.well-known/agent.json
```

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

### 5) すべてをエンドツーエンドで検証します (推奨)

```bash
npm run test:protocols:e2e
```

このスイートは、実行中のアプリに対して実際の MCP および A2A クライアント フローを検証します。

### 代替案: ソースから実行

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
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

## 🖥️ デスクトップ アプリ — オフライン&常時接続

> 🆕 **新規!** OmniRoute は、Windows、macOS、Linux の **ネイティブ デスクトップ アプリケーション** として利用できるようになりました。

OmniRoute をスタンドアロンのデスクトップ アプリとして実行します。ローカル モデルにはターミナル、ブラウザ、インターネットは必要ありません。 Electron ベースのアプリには次のものが含まれます。

- 🖥️ **ネイティブ ウィンドウ** — システム トレイと統合された専用アプリ ウィンドウ
- 🔄 **自動開始** — システムログイン時に OmniRoute を起動します
- 🔔 **ネイティブ通知** — クォータの枯渇またはプロバイダーの問題に関するアラートを受け取ります
- ⚡ **ワンクリック インストール** — NSIS (Windows)、DMG (macOS)、AppImage (Linux)
- 🌐 **オフライン モード** — バンドルされたサーバーで完全にオフラインで動作します

### クイックスタート

```bash
# Development mode
npm run electron:dev

# Build for your platform
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### システムトレイ

最小化すると、OmniRoute はシステム トレイに常駐し、簡単なアクションが実行されます。

- ダッシュボードを開く
- サーバーポートの変更
- アプリケーションを終了する

📖 完全なドキュメント: [**OMNI_TOKEN_153**](electron/README.md)

---

## 💰 価格の概要

| 階層                      | プロバイダー                      | コスト                          | クォータのリセット  | 最適な用途                              |
| ------------------------- | --------------------------------- | ------------------------------- | ------------------- | --------------------------------------- |
| **💳 サブスクリプション** | クロード・コード (プロ)           | $20/月                          | 5 時間 + 毎週       | すでに購読済み                          |
|                           | コーデックス (プラス/プロ)        | $20-200/月                      | 5 時間 + 毎週       | OpenAI ユーザー                         |
|                           | ジェミニ CLI                      | **無料**                        | 180K/月 + 1K/日     | みんな！                                |
|                           | GitHub コパイロット               | $10-19/月                       | 月刊                | GitHub ユーザー                         |
| **🔑 API キー**           | NVIDIA NIM                        | **無料** (開発は永久に)         | ~40 RPM             | 70 以上のオープン モデル                |
|                           | 大脳                              | **無料** (100 万トーク/日)      | 60K TPM / 30 RPM    | 世界最速                                |
|                           | グロク                            | **無料** (30 RPM)               | 14.4K RPD           | 超高速ラマ/ジェマ                       |
|                           | ディープシーク V3.2               | 100 万あたり $0.27/$1.10        | なし                | 最高の価格/品質の理由                   |
|                           | xAI Grok-4 高速                   | **100 万あたり $0.20/$0.50** 🆕 | なし                | 最速 + ツール呼び出し、超低コスト       |
|                           | xAI Grok-4 (標準)                 | 100 万あたり $0.20/$1.50 🆕     | なし                | xAI の推論フラッグシップ                |
|                           | ミストラル                        | 無料トライアル + 有料           | レート制限          | ヨーロッパのAI                          |
|                           | オープンルーター                  | 従量課金制                      | なし                | 合計 100 以上のモデル                   |
| **💰安い**                | GLM-5 (Z.AI経由) 🆕               | $0.5/100万                      | 毎日午前 10 時      | 128K 出力、最新のフラッグシップ         |
|                           | GLM-4.7                           | $0.6/100万                      | 毎日午前 10 時      | 予算のバックアップ                      |
|                           | ミニマックス M2.5 🆕              | 100 万ドルあたり 0.3 ドルの入力 | 5時間ローリング     | 推論 + エージェント タスク              |
|                           | ミニマックス M2.1                 | $0.2/100万                      | 5時間ローリング     | 最も安いオプション                      |
|                           | キミ K2.5 (ムーンショット API) 🆕 | 従量課金制                      | なし                | Moonshot API への直接アクセス           |
|                           | キミ K2                           | 月額 9 ドルのフラット           | 1,000 万トークン/月 | 予測可能なコスト                        |
| **🆓 無料**               | iFlow                             | **$0**                          | 無制限              | 5モデル無制限                           |
|                           | クウェン                          | **$0**                          | 無制限              | 4モデル無制限                           |
|                           | キロ                              | **$0**                          | 無制限              | クロード・ソネット/俳句 (AWS ビルダー)  |
|                           | LongCat Flash-Lite 🆕             | **$0** (5,000 万トーク/日 🔥)   | 1 RPS               | 地球上で最大の無料割り当て              |
|                           | 受粉 AI 🆕                        | **$0** (キーは必要ありません)   | 1 リクエスト/15 秒  | GPT-5、クロード、ディープシーク、ラマ 4 |
|                           | Cloudflare ワーカー AI 🆕         | **$0** (10,000 ニューロン/日)   | ~150 回/日          | 50 を超えるモデル、グローバル エッジ    |
|                           | スケールウェイ AI 🆕              | **$0** (合計 100 万トークン)    | レート制限          | EU/GDPR、Qwen3 235B、ラマ 70B           |

> 🆕 **新しいモデルの追加 (2026 年 3 月):** $0.20/$0.50/M の Grok-4 Fast ファミリ (1143 ミリ秒でベンチマーク - Gemini 2.5 フラッシュより 30% 高速)、128K 出力の Z.AI 経由の GLM-5、MiniMax M2.5 推論、DeepSeek V3.2 の最新価格、Moonshot direct API 経由の Kim K2.5。

**💡 $0 コンボ スタック — 完全な無料セットアップ:**

```
# 🆓 Ultimate Free Stack 2026 — 11 Providers, $0 Forever
Kiro (kr/)             → Claude Sonnet/Haiku UNLIMITED
iFlow (if/)            → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 UNLIMITED
LongCat Lite (lc/)     → LongCat-Flash-Lite — 50M tokens/day 🔥
Pollinations (pol/)    → GPT-5, Claude, DeepSeek, Llama 4 — no key needed
Qwen (qw/)             → qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next UNLIMITED
Gemini (gemini/)       → Gemini 2.5 Flash — 1,500 req/day free API key
Cloudflare AI (cf/)    → Llama 70B, Gemma 3, Mistral — 10K Neurons/day
Scaleway (scw/)        → Qwen3 235B, Llama 70B — 1M free tokens (EU)
Groq (groq/)           → Llama/Gemma ultra-fast — 14.4K req/day
NVIDIA NIM (nvidia/)   → 70+ open models — 40 RPM forever
Cerebras (cerebras/)   → Llama/Qwen world-fastest — 1M tok/day
```

**コストゼロ。コーディングを決してやめません。** これを 1 つの OmniRoute コンボとして設定すると、すべてのフォールバックが自動的に行われ、手動で切り替える必要はありません。

---

---

## 🆓 無料モデル — 実際に得られるもの

> 以下のすべてのモデルは **完全に無料で、クレジット カードは必要ありません**。 OmniRoute は、1 つのクォータがなくなると、それらの間で自動ルーティングを行います。すべてを組み合わせて、破ることのできない $0 コンボを実現します。

### 🔵 CLAUDE MODELS (Kiro 経由 — AWS ビルダー ID)

| モデル              | プレフィックス | 制限       | レート制限                           |
| ------------------- | -------------- | ---------- | ------------------------------------ |
| `claude-sonnet-4.5` | `kr/`          | **無制限** | 1 日あたりの上限は報告されていません |
| `claude-haiku-4.5`  | `kr/`          | **無制限** | 1 日あたりの上限は報告されていません |
| `claude-opus-4.6`   | `kr/`          | **無制限** | Kiro 経由の最新作品                  |

### 🟢 IFLOW モデル (無料 OAuth — クレジット カードなし)

| モデル             | プレフィックス | 制限       | レート制限                 |
| ------------------ | -------------- | ---------- | -------------------------- |
| `kimi-k2-thinking` | `if/`          | **無制限** | 報告された上限はありません |
| `qwen3-coder-plus` | `if/`          | **無制限** | 報告された上限はありません |
| `deepseek-r1`      | `if/`          | **無制限** | 報告された上限はありません |
| `minimax-m2.1`     | `if/`          | **無制限** | 報告された上限はありません |
| `kimi-k2`          | `if/`          | **無制限** | 報告された上限はありません |

### 🟡 QWEN モデル (デバイスコード認証)

| モデル              | プレフィックス | 制限       | レート制限                 |
| ------------------- | -------------- | ---------- | -------------------------- |
| `qwen3-coder-plus`  | `qw/`          | **無制限** | 報告された上限はありません |
| `qwen3-coder-flash` | `qw/`          | **無制限** | 報告された上限はありません |
| `qwen3-coder-next`  | `qw/`          | **無制限** | 報告された上限はありません |
| `vision-model`      | `qw/`          | **無制限** | マルチモーダル (画像)      |

### 🟣 GEMINI CLI (Google OAuth)

| モデル                   | プレフィックス | 制限                                    | レート制限     |
| ------------------------ | -------------- | --------------------------------------- | -------------- |
| `gemini-3-flash-preview` | `gc/`          | **180,000 トーク/月** + 1,000 トーク/日 | 毎月のリセット |
| `gemini-2.5-pro`         | `gc/`          | 180K/月 (共有プール)                    | 高品質         |

### ⚫ NVIDIA NIM (無料 API キー — build.nvidia.com)

| 階層        | 1 日あたりの制限     | レート制限  | メモ                                                |
| ----------- | -------------------- | ----------- | --------------------------------------------------- |
| 無料 (開発) | トークンキャップなし | **~40 RPM** | 70以上のモデル; 2025 年半ばに純粋なレート制限に移行 |

人気の無料モデル: `moonshotai/kimi-k2.5` (Kimi K2.5)、`z-ai/glm4.7` (GLM 4.7)、`deepseek-ai/deepseek-v3.2` (DeepSeek V3.2)、`nvidia/llama-3.3-70b-instruct`、`deepseek/deepseek-r1`

### ⚪ CEREBRAS (無料 API キー — inference.cerebras.ai)

| 階層 | 1 日あたりの制限      | レート制限       | メモ                              |
| ---- | --------------------- | ---------------- | --------------------------------- |
| 無料 | **100 万トークン/日** | 60K TPM / 30 RPM | 世界最速の LLM 推論。毎日リセット |

無料で利用可能: `llama-3.3-70b`、`llama-3.1-8b`、`deepseek-r1-distill-llama-70b`

### 🔴 GROQ (無料 API キー — console.groq.com)

| 階層 | 1 日あたりの制限 | レート制限          | メモ                                                    |
| ---- | ---------------- | ------------------- | ------------------------------------------------------- |
| 無料 | **14.4K RPD**    | モデルごとに 30 RPM | クレジットカードはありません。 429 が制限、課金されない |

無料で利用可能: `llama-3.3-70b-versatile`、`gemma2-9b-it`、`mixtral-8x7b`、`whisper-large-v3`

### 🔴 LONGCAT AI (無料 API キー — longcat.chat) 🆕

| モデル                        | プレフィックス | 毎日の無料割り当て      | メモ                   |
| ----------------------------- | -------------- | ----------------------- | ---------------------- |
| `LongCat-Flash-Lite`          | `lc/`          | **5,000 万トークン** 💥 | 史上最大の無料割り当て |
| `LongCat-Flash-Chat`          | `lc/`          | 500K トークン           | マルチターンチャット   |
| `LongCat-Flash-Thinking`      | `lc/`          | 500K トークン           | 推論/CoT               |
| `LongCat-Flash-Thinking-2601` | `lc/`          | 500K トークン           | 2026年1月版            |
| `LongCat-Flash-Omni-2603`     | `lc/`          | 500K トークン           | マルチモーダル         |

> パブリックベータ版の間は完全に無料です。電子メールまたは電話で [longcat.chat](https://longcat.chat) にサインアップしてください。毎日 00:00 UTC にリセットされます。

### 🟢 POLLINATIONS AI (API キーは不要) 🆕

| モデル     | プレフィックス | レート制限         | 背後のプロバイダー  |
| ---------- | -------------- | ------------------ | ------------------- |
| `openai`   | `pol/`         | 1 リクエスト/15 秒 | GPT-5               |
| `claude`   | `pol/`         | 1 リクエスト/15 秒 | 人間のクロード      |
| `gemini`   | `pol/`         | 1 リクエスト/15 秒 | Google ジェミニ     |
| `deepseek` | `pol/`         | 1 リクエスト/15 秒 | ディープシーク V3   |
| `llama`    | `pol/`         | 1 リクエスト/15 秒 | メタラマ 4 スカウト |
| `mistral`  | `pol/`         | 1 リクエスト/15 秒 | ミストラルAI        |

> ✨ **摩擦ゼロ:** サインアップも API キーも必要ありません。空のキーフィールドを使用して Pollinations プロバイダーを追加すると、すぐに機能します。

### 🟠 CLOUDFLARE WORKERS AI (無料 API キー — Cloudflare.com) 🆕

| 階層 | デイリーニューロン | 同等の使用法                                    | メモ                               |
| ---- | ------------------ | ----------------------------------------------- | ---------------------------------- |
| 無料 | **10,000**         | ~150 LLM 対応 / 500 秒オーディオ / 15K 埋め込み | グローバル エッジ、50 以上のモデル |

人気の無料モデル: `@cf/meta/llama-3.3-70b-instruct`、`@cf/google/gemma-3-12b-it`、`@cf/openai/whisper-large-v3-turbo` (無料音声!)、`@cf/qwen/qwen2.5-coder-15b-instruct`

> [dash.cloudflare.com](https://dash.cloudflare.com) の API トークン + アカウント ID が必要です。アカウント ID をプロバイダー設定に保存します。

### 🟣 Scaleway AI (100 万個の無料トークン —scaleway.com) 🆕

| 階層 | 無料割り当て       | 場所        | メモ                                       |
| ---- | ------------------ | ----------- | ------------------------------------------ |
| 無料 | **100 万トークン** | 🇫🇷 パリ、EU | 制限内ではクレジットカードは必要ありません |

無料で利用可能: `qwen3-235b-a22b-instruct-2507` (Qwen3 235B!)、`llama-3.1-70b-instruct`、`mistral-small-3.2-24b-instruct-2506`、`deepseek-v3-0324`

> EU/GDPR に準拠。 [console.scaleway.com](https://console.scaleway.com) で API キーを取得します。

> **💡 究極の無料スタック (11 プロバイダー、永久に $0):**
>
> ```
> Kiro (kr/)             → Claude Sonnet/Haiku UNLIMITED
> iFlow (if/)            → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 UNLIMITED
> LongCat Lite (lc/)     → LongCat-Flash-Lite — 50M tokens/day 🔥
> Pollinations (pol/)    → GPT-5, Claude, DeepSeek, Llama 4 — no key needed
> Qwen (qw/)             → qwen3-coder models UNLIMITED
> Gemini (gemini/)       → Gemini 2.5 Flash — 1,500 req/day free
> Cloudflare AI (cf/)    → 50+ models — 10K Neurons/day
> Scaleway (scw/)        → Qwen3 235B, Llama 70B — 1M free tokens (EU)
> Groq (groq/)           → Llama/Gemma — 14.4K req/day ultra-fast
> NVIDIA NIM (nvidia/)   → 70+ open models — 40 RPM forever
> Cerebras (cerebras/)   → Llama/Qwen world-fastest — 1M tok/day
> ```

## 🎙️ 無料文字起こしコンボ

> あらゆるオーディオ/ビデオを **$0** で文字起こし — Deepgram は 200 ドルを無料、AssemblyAI は 50 ドルのフォールバック、無制限の緊急バックアップとして Groq Whisper を提供します。

| プロバイダー          | 無料クレジット                  | ベストモデル                              | レート制限                      |
| --------------------- | ------------------------------- | ----------------------------------------- | ------------------------------- |
| 🟢 **ディープグラム** | **200 ドル無料** (サインアップ) | `nova-3` — 最高の精度、30 以上の言語      | 無料クレジットには RPM 制限なし |
| 🔵 **AssemblyAI**     | **50 ドル無料** (サインアップ)  | `universal-3-pro` — 章、センチメント、PII | 無料クレジットには RPM 制限なし |
| 🔴 **グロク**         | **永久無料**                    | `whisper-large-v3` — OpenAI ウィスパー    | 30 RPM (レート制限)             |

**`/dashboard/combos` での推奨コンボ:**

```
Name: free-transcription
Strategy: Priority
Nodes:
  [1] deepgram/nova-3          → uses $200 free first
  [2] assemblyai/universal-3-pro → fallback when Deepgram credits run out
  [3] groq/whisper-large-v3    → free forever, emergency fallback
```

次に、`/dashboard/media` → **文字起こし** タブで、音声ファイルまたはビデオ ファイルをアップロード → コンボ エンドポイントを選択 → サポートされている形式で文字起こしを取得します。

## 💡 主な機能

OmniRoute v2.0 は、単なるリレー プロキシではなく、運用プラットフォームとして構築されています。

### 🆕 新しい — ClawRouter からインスピレーションを得た改善 (2026 年 3 月)

| 特集                                    | 何をするのか                                                                                                      |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| ⚡ **Grok-4 高速ファミリー**            | xAI モデルは $0.20/$0.50/M です — ベンチマークでは 1143 ミリ秒 (Gemini 2.5 フラッシュより 30% 高速)               |
| 🧠 **GLM-5 (Z.AI 経由)**                | 128K 出力コンテキスト、0.5/100 万ドル — GLM ファミリの最新フラッグシップ                                          |
| 🔮 **ミニマックス M2.5**                | 推論 + エージェント タスクを $0.30/1M で – M2.1 からの大幅なアップグレード                                        |
| 🎯 **モデルごとのツール呼び出しフラグ** | レジストリ内のモデルごとの `toolCalling: true/false` — AutoCombo はツールに対応していないモデルをスキップします。 |
| 🌍 **多言語の意図の検出**               | オートコンボ スコアリングにおける PT/ZH/ES/AR キーワード — 英語以外のコンテンツに対するより適切なモデル選択       |
| 📊 **ベンチマーク主導のフォールバック** | ライブリクエストからの実際の p95 レイテンシがコンボスコアリングにフィード — AutoCombo は実際のデータから学習      |
| 🔁 **重複排除をリクエスト**             | コンテンツ ハッシュ ベースの重複排除ウィンドウ - マルチエージェントで安全、重複請求を防止                         |
| 🔌 **プラグイン可能なルーター戦略**     | 拡張可能な `RouterStrategy` インターフェイス — カスタム ルーティング ロジックをプラグインとして追加します。       |

### 🚀 以前の v2.0.9+ — プレイグラウンド、CLI フィンガープリント、ACP

| 特集                                                       | 何をするのか                                                                                                                                                                                                                                                                                         |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **モデルの遊び場**                                      | 任意のモデルを直接テストするためのダッシュボード ページ — プロバイダー/モデル/エンドポイント セレクター、モナコ エディター、ストリーミング、中止、タイミング                                                                                                                                         |
| 🔏 **CLI 指紋照合**                                        | ネイティブ CLI 署名と一致するようにプロバイダーごとにヘッダー/本文を順序付けします。[設定] > [セキュリティ] でプロバイダーごとに切り替えます。 **プロキシ IP は保持されます**                                                                                                                        |
| 🤝 **ACP サポート (エージェント クライアント プロトコル)** | CLI エージェント検出 (Codex、Claude、Goose、Gemini CLI、OpenClaw + その他 9 つ)、プロセス スポーナー、`/api/acp/agents` エンドポイント                                                                                                                                                               |
| 🤖 **ACP エージェント ダッシュボード**                     | デバッグ › エージェント ページ — インストール ステータス、バージョン、CLI ツールのカスタム エージェント フォームを含む 14 個のエージェントのグリッド。 **OpenCode** ユーザーには、利用可能なすべてのモデルですぐに使用できる構成を自動生成する [opencode.json をダウンロード] ボタンが表示されます。 |
| 🔧 **カスタム モデル `apiFormat` ルーティング**            | `apiFormat: "responses"` を使用したカスタム モデルは、Responses API トランスレーターに正しくルーティングされるようになりました。                                                                                                                                                                     |
| 🏢 **Codex ワークスペースの分離**                          | 電子メールごとに複数の Codex ワークスペース - OAuth はワークスペース ID によって接続を正しく分離します。                                                                                                                                                                                             |
| 🔄 **Electron 自動アップデート**                           | デスクトップ アプリがアップデートをチェックし、再起動時に自動インストール                                                                                                                                                                                                                            |

### 🤖 エージェントとプロトコルの操作 (v2.0)

| 特集                                     | 何をするのか                                                                                                                        |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 🔧 **MCP サーバー (16 ツール)**          | 3 つのトランスポート経由の IDE/エージェント ツール: 標準入出力、SSE (`/api/mcp/sse`)、ストリーミング可能な HTTP (`/api/mcp/stream`) |
| 🤝 **A2A サーバー (JSON-RPC + SSE)**     | 同期およびストリーミング フローを使用したエージェント間のタスクの実行                                                               |
| 🧭 **統合エンドポイント ページ**         | [エンドポイント プロキシ]、[MCP]、[A2A]、および [API エンドポイント] タブを備えたタブ付き管理ページ                                 |
| 🎚️ **サービスの有効化/無効化の切り替え** | 設定永続性を備えた MCP および A2A の ON/OFF スイッチ (デフォルト: OFF)                                                              |
| 🛰️ **MCP ランタイム ハートビート**       | 実際のプロセス ステータス (pid、稼働時間、ハートビート経過時間、トランスポート、スコープ モード)                                    |
| 📋 **MCP 監査証跡**                      | 成功/失敗およびキーの属性を含むフィルタリング可能な監査ログ                                                                         |
| 🔐 **MCP スコープの適用**                | 制御されたツールアクセスのための 9 つの詳細な範囲の権限                                                                             |
| 📡 **A2A タスク ライフサイクル管理**     | タスクのリスト/フィルター、イベント/アーティファクトの検査、実行中のタスクのキャンセル                                              |
| 📋 **エージェント カードの検出**         | `/.well-known/agent.json` クライアント自動検出用                                                                                    |
| 🧪 **プロトコル E2E テスト ハーネス**    | `test:protocols:e2e` での実際の MCP SDK + A2A クライアント フロー                                                                   |
| ⚙️ **運用管理**                          | 1 つのコントロール サーフェスからコンボを切り替え、レジリエンス プロファイルを適用し、ブレーカーをリセット                          |

### 🧠 ルーティングとインテリジェンス

| 特集                                        | 何をするのか                                                                 |
| ------------------------------------------- | ---------------------------------------------------------------------------- |
| 🎯 **スマート 4 層フォールバック**          | 自動ルート: サブスクリプション → API キー → 格安 → 無料                      |
| 📊 **リアルタイムのクォータ追跡**           | プロバイダーごとのライブ トークン数 + リセット カウントダウン                |
| 🔄 **フォーマット変換**                     | OpenAI ↔ Claude ↔ Gemini ↔ スキーマセーフな変換による応答                    |
| 👥 **マルチアカウントのサポート**           | インテリジェントな選択によるプロバイダーごとの複数のアカウント               |
| 🔄 **自動トークン更新**                     | OAuth トークンは再試行によって自動的に更新されます。                         |
| 🎨 **カスタムコンボ**                       | 6 つのバランシング戦略 + フォールバック チェーン制御                         |
| 🌐 **ワイルドカードルーター**               | `provider/*` 動的ルーティング                                                |
| 🧠 **予算管理について考える**               | パススルー、自動、カスタム、および適応推論の制限                             |
| 🔀 **モデルのエイリアス**                   | 組み込み + カスタム モデルのエイリアシングと移行の安全性                     |
| ⚡ **背景の劣化**                           | 優先度の低いバックグラウンド タスクを安価なモデルにルーティングする          |
| 🧪 **タスク認識型スマート ルーティング**    | コンテンツ タイプ (コーディング/ビジョン/分析/要約) によるモデルの自動選択   |
| 💬 **システム プロンプト インジェクション** | 一貫して適用されるグローバルな動作制御                                       |
| 📄 **レスポンス API の互換性**              | Codex および高度なエージェント ワークフローの完全な `/v1/responses` サポート |

### 🎵 マルチモーダル API

| 特集                    | 何をするのか                                                                                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **画像生成**         | `/v1/images/generations` クラウドおよびローカル バックエンドを使用                                                                                                        |
| 📐 **埋め込み**         | `/v1/embeddings` 検索および RAG パイプライン用                                                                                                                            |
| 🎤 **音声文字起こし**   | `/v1/audio/transcriptions` — 7 つのプロバイダー (Deepgram Nova 3、AssemblyAI、Groq Whisper、HuggingFace、イレブンラボ、OpenAI、Azure)、自動言語検出、MP4/MP3/WAV サポート |
| 🔊 **テキスト読み上げ** | `/v1/audio/speech` — 10 プロバイダー (イレブンラボ、OpenAI、Deepgram、Cartesia、PlayHT、HuggingFace、Nvidia NIM、I​​nworld、Coqui、Tortoise) と正しいエラー メッセージ    |
| 🎬 **ビデオ生成**       | `/v1/videos/generations` (ComfyUI + SD WebUI ワークフロー)                                                                                                                |
| 🎵 **音楽生成**         | `/v1/music/generations` (ComfyUI ワークフロー)                                                                                                                            |
| 🛡️ **モデレーション**   | `/v1/moderations` 安全性チェック                                                                                                                                          |
| 🔀 **再ランキング**     | 関連性スコアリング用の `/v1/rerank`                                                                                                                                       |
| 🔍 **ウェブ検索** 🆕    | `/v1/search` — 5 プロバイダー (Serper、Brave、Perplexity、Exa、Tavily)、6,500 以上無料/月、自動フェイルオーバー、キャッシュ                                               |

### 🛡️ 復元力、セキュリティ、ガバナンス

| 特集                                   | 何をするのか                                                                                   |
| -------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 🔌 **サーキットブレーカー**            | 閾値制御によるモデルごとのトリップ/リカバリ                                                    |
| 🎯 **エンドポイント対応モデル**        | カスタム モデルは、サポートされるエンドポイント + API 形式を宣言します。                       |
| 🛡️ **対雷鳴の群れ**                    | 再試行/レートイベントにおけるミューテックス + セマフォ保護                                     |
| 🧠 **セマンティック + 署名キャッシュ** | 2 つのキャッシュ層によるコスト/遅延の削減                                                      |
| ⚡ **冪等性のリクエスト**              | 重複保護ウィンドウ                                                                             |
| 🔒 **TLS 指紋スプーフィング**          | ブラウザのような TLS フィンガープリント — **ボットの検出とアカウントのフラグ付けを削減します** |
| 🔏 **CLI 指紋照合**                    | ネイティブ CLI リクエスト署名と一致 — **プロキシ IP を保持しながら禁止リスクを軽減**           |
| 🌐 **IP フィルタリング**               | 公開された展開のホワイトリスト/ブロックリストの制御                                            |
| 📊 **編集可能なレート制限**            | 永続性を備えた構成可能なグローバル/プロバイダーレベルの制限                                    |
| 🔑 **API キー管理 + スコーピング**     | 安全なキーの発行/ローテーションとモデル/プロバイダーの制御                                     |
| 🛡️ **保護されています `/models`**      | モデル カタログのオプションの認証ゲートとプロバイダーの非表示                                  |

### 📊 可観測性と分析

| 特集                              | 何をするのか                                                          |
| --------------------------------- | --------------------------------------------------------------------- |
| 📝 **リクエスト + プロキシ ログ** | 完全なリクエスト/レスポンスとプロキシ ログ                            |
| 📋 **統合ログ ダッシュボード**    | リクエスト、プロキシ、監査、およびコンソールのビューを 1 ページに表示 |
| 🔍 **テレメトリのリクエスト**     | p50/p95/p99 レイテンシーとリクエストのトレース                        |
| 🏥 **健康ダッシュボード**         | 稼働時間、ブレーカー状態、ロックアウト、キャッシュ統計                |
| 💰 **コスト追跡**                 | 予算管理とモデルごとの価格の可視性                                    |
| 📈 **分析の視覚化**               | モデル/プロバイダーの使用状況に関する洞察と傾向ビュー                 |
| 🧪 **評価フレームワーク**         | 構成可能な一致戦略を使用したゴールデン セット テスト                  |

### ☁️ 導入とプラットフォーム

| 特集                                | 何をするのか                                                               |
| ----------------------------------- | -------------------------------------------------------------------------- | ------------------------------ |
| 🌐 **どこにでも展開**               | Localhost、VPS、Docker、クラウド環境                                       |
| 💾 **クラウド同期**                 | クラウド ワーカー経由の構成同期                                            |
| 🔄 **バックアップ/復元**            | エクスポート/インポートと災害復旧フロー                                    |
| 🧙 **オンボーディング ウィザード**  | 初回実行のガイド付きセットアップ                                           |
| 🔧 **CLI ツール ダッシュボード**    | 人気のコーディング ツールをワンクリックでセットアップ                      |
| 🎮 **モデルの遊び場**               | ダッシュボードから任意のプロバイダー/モデル/エンドポイントをテストします。 |
| 🔏 **CLI 指紋切り替え**             | [設定] > [セキュリティ]                                                    | でのプロバイダーごとの指紋照合 |
| 🌐 **i18n (30 言語)**               | RTL をカバーする完全なダッシュボード + ドキュメント言語サポート            |
| 🧹 **すべてのモデルをクリア**       | ワンクリックでプロバイダー詳細のモデルリストをクリア                       |
| 📋 **問題テンプレート**             | バグと機能用の標準化された GitHub テンプレート                             |
| 📂 **カスタム データ ディレクトリ** | `DATA_DIR` 保管場所のオーバーライド                                        |

### 機能の詳細

#### 実用的なコスト管理によるスマートなフォールバック

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

クォータ、レート、またはヘルスに障害が発生した場合、OmniRoute は手動で切り替えることなく、次の候補に自動的に移動します。

#### 見える化・操作可能なプロトコル管理

- MCP + A2A は UI とドキュメントで検出可能です (非表示ではありません)
- プロトコル ステータス API はライブ運用データを公開します (`/api/mcp/*`、`/api/a2a/*`)
- ダッシュボードには 2 日目の操作のアクション (コンボの切り替え、ブレーカーのリセット、タスクのキャンセル) が含まれています

#### 翻訳者 + 検証ワークフロー

翻訳領域には次のものが含まれます。

- **プレイグラウンド**: 変換チェックをリクエストします
- **チャット テスター**: 完全なリクエスト/レスポンスの往復
- **テストベンチ**: 1 回の実行で複数のケース
- **ライブ モニター**: リアルタイムの交通状況ビュー

さらに、`npm run test:protocols:e2e` を介した実際のクライアントでのプロトコル検証。

> 📖 **[MCP Server README](open-sse/mcp-server/README.md)** — ツールリファレンス、IDE 構成、およびクライアントの例
>
> 📖 **[A2A Server README](src/lib/a2a/README.md)** — スキル、JSON-RPC メソッド、ストリーミング、タスクのライフサイクル

## 🧪 評価 (Evals)

OmniRoute には、ゴールデン セットに対して LLM 応答品質をテストするための評価フレームワークが組み込まれています。ダッシュボードの **Analytics → Evals** からアクセスします。

### 内蔵ゴールデンセット

プリロードされた「OmniRoute Golden Set」には、次のテスト ケースが含まれています。

- 挨拶、数学、地理、コード生成
- JSON形式への準拠、翻訳、マークダウン生成
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

### プロトコルのセットアップ (MCP + A2A)

<details>
<summary><b>🧩 MCP セットアップ (モデル コンテキスト プロトコル)</b></summary>

MCP トランスポートを標準入出力モードで開始します。

```bash
omniroute --mcp
```

推奨される検証フロー:

1. MCP クライアントを標準入出力経由で接続します。
2. `omniroute_get_health` を実行します。
3. `omniroute_list_combos` を実行します。
4. `/dashboard/mcp` を開いて、ハートビート、アクティビティ、および監査を確認します。

自動化に役立つ API:

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

</details>

<details>
<summary><b>🤝 A2A セットアップ (エージェント 2 エージェント)</b></summary>

エージェントを検出します。

```bash
curl http://localhost:20128/.well-known/agent.json
```

タスクを送信します。

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"setup-a2a","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Summarize quota status."}]}}'
```

ライフサイクルを管理する:

- `GET /api/a2a/status`
- `GET /api/a2a/tasks`
- `GET /api/a2a/tasks/:id`
- `POST /api/a2a/tasks/:id/cancel`

操作UI:

- `/dashboard/a2a` タスク/状態/ストリームの可観測性とスモークアクション用

</details>

<details>
<summary><b>🧪 エンドツーエンドのプロトコル検証</b></summary>

実際のクライアントを使用して両方のプロトコルを検証します。

```bash
npm run test:protocols:e2e
```

これにより以下が検証されます。

- MCP SDK クライアントの接続/リスト/呼び出し
- A2A 検出/送信/ストリーム/取得/キャンセル
- MCP監査およびA2Aタスク管理APIのデータをクロスチェックします

</details>

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

#### Codex アカウント制限管理 (5 時間 + 毎週)

各 Codex アカウントには、`Dashboard -> Providers` でポリシーの切り替えが含まれるようになりました。

- `5h` (オン/オフ): 5 時間のウィンドウしきい値ポリシーを適用します。
- `Weekly` (オン/オフ): 週ごとのウィンドウしきい値ポリシーを強制します。
- しきい値の動作: 有効なウィンドウの使用率が 90% 以上に達すると、そのアカウントはスキップされます。
- ローテーション動作: OmniRoute は、次の対象となる Codex アカウントに自動的にルーティングします。
- リセット動作: プロバイダー `resetAt` 時間が経過すると、アカウントは自動的に再び適格になります。

シナリオ:

- `5h ON` + `Weekly ON`: いずれかのウィンドウがしきい値に達すると、アカウントはスキップされます。
- `5h OFF` + `Weekly ON`: アカウントをブロックできるのは週単位の使用のみです。
- `5h ON` + `Weekly OFF`: アカウントをブロックできるのは 5 時間の使用のみです。
- `resetAt` に合格しました: アカウントは自動的にローテーションを再開します (手動での再有効化はありません)。

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

### NVIDIA NIM (無料の開発者アクセス - 70 以上のモデル)

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

### キミ K2 (月額定額 9 ドル)

1. 購読: [Moonshot AI](https://platform.moonshot.ai/)
2. APIキーを取得する
3. ダッシュボード → APIキーの追加

**使用方法:** `kimi/kimi-latest`

**プロのヒント:** 1,000 万トークンの固定 $9/月 = 0.90 ドル/100 万の実効コスト!

</details>

<details>
<summary><b>🆓 無料プロバイダー (緊急バックアップ)</b></summary>

### iFlow (OAuth 経由の 5 つの無料モデル)

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

### Qwen (デバイス コード経由の 4 つの無料モデル)

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

### オープンコード

**ステップ 1:** OmniRoute をカスタム プロバイダーとして追加します。

```bash
opencode
/connect
# Select "Other" → Enter ID: "omniroute" → Enter your OmniRoute API key
```

**ステップ 2:** プロジェクト ルートで `opencode.json` を作成/編集します。

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1"
      },
      "models": {
        "cc/claude-sonnet-4-20250514": { "name": "Claude Sonnet 4" },
        "gg/gemini-2.5-pro": { "name": "Gemini 2.5 Pro" },
        "if/kimi-k2-thinking": { "name": "Kimi K2 (Free)" }
      }
    }
  }
}
```

**ステップ 3:** OpenCode でモデルを選択します。

```bash
/models
# Select any OmniRoute model from the list
```

> **ヒント:** OmniRoute `/v1/models` エンドポイントで利用可能なモデルを `models` セクションに追加します。 OmniRoute ダッシュボードから `provider/model-id` 形式を使用します。

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

**ダッシュボード/API ポートが間違っています**

- `PORT` は正規のベース ポート (およびデフォルトでは API ポート)
- `API_PORT` は OpenAI 互換の API リスナーのみをオーバーライドします
- `DASHBOARD_PORT` はダッシュボード/Next.js リスナーのみをオーバーライドします
- `NEXT_PUBLIC_BASE_URL` をダッシュボード/パブリック URL に設定します (OAuth コールバック用)

**クラウド同期エラー**

- `BASE_URL` が実行中のインスタンスを指していることを確認します
- `CLOUD_URL` が予想されるクラウド エンドポイントを指していることを確認します
- `NEXT_PUBLIC_*` 値をサーバー側の値と一致させます。

**最初のログインが機能しない**

- `.env` の `INITIAL_PASSWORD` を確認してください
- 設定されていない場合、フォールバック パスワードは `123456` です。

**リクエストログなし**

- `.env` に `ENABLE_REQUEST_LOGS=true` を設定します

**OpenAI 互換プロバイダーの接続テストで「無効」と表示される**

- 多くのプロバイダーは `/models` エンドポイントを公開していません
- OmniRoute v1.0.6+ には、チャット完了によるフォールバック検証が含まれています
- ベース URL に `/v1` サフィックスが含まれていることを確認してください

### 🔐 リモートサーバー上の OAuth

<a name="oauth-on-a-remote-server"></a>
<a name="oauth-em-servidor-remoto"></a>

> **⚠️ VPS、Docker、または任意のリモート サーバーで OmniRoute を実行しているユーザーにとって重要**

#### Antigravity / Gemini CLI OAuth がリモート サーバーで失敗するのはなぜですか?

**Antigravity** プロバイダーと **Gemini CLI** プロバイダーは **Google OAuth 2.0** を使用します。 Google では、OAuth フロー内の `redirect_uri` が、アプリの Google Cloud Console に事前登録された URI の 1 つと正確に一致する必要があります。

OmniRoute にバンドルされている OAuth 資格情報は、**`localhost` に対してのみ**登録されます。リモート サーバー (`https://omniroute.myserver.com` など) 上の OmniRoute にアクセスすると、Google は次のような認証を拒否します。

```
Error 400: redirect_uri_mismatch
```

#### 解決策: 独自の OAuth 資格情報を構成する

Google Cloud Console でサーバーの URI を使用して **OAuth 2.0 クライアント ID** を作成する必要があります。

#### ステップバイステップ

**1. Google Cloud コンソールを開きます**

[https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials) に移動します。

**2.新しい OAuth 2.0 クライアント ID を作成します**

- **「+ 資格情報の作成」** → **「OAuth クライアント ID」** をクリックします。
- アプリケーションの種類: **「Web アプリケーション」**
- 名前: 任意の名前 (例: `OmniRoute Remote`)

**3.承認されたリダイレクト URI の追加**

**「承認されたリダイレクト URI」** フィールドに、次を追加します。

```
https://your-server.com/callback
```

> `your-server.com` をサーバーのドメインまたは IP に置き換えます (必要に応じてポートを含めます (例: `http://45.33.32.156:20128/callback`))。

**4.資格情報を保存してコピーします**

作成後、Google には **クライアント ID** と **クライアント シークレット**が表示されます。

**5.環境変数を設定します**

`.env` (または Docker 環境変数) 内:

```bash
# For Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-your-secret

# For Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
```

**6. OmniRoute を再起動します**

```bash
# npm:
npm run dev

# Docker:
docker restart omniroute
```

**7.もう一度接続してみてください**

ダッシュボード → プロバイダー → Antigravity (または Gemini CLI) → OAuth

Google は `https://your-server.com/callback` に正しくリダイレクトされるようになりました。

---

#### 一時的な回避策 (カスタム認証情報を使用しない場合)

今すぐ独自の認証情報を設定したくない場合でも、**手動 URL フロー**を使用できます。

1. OmniRoute が Google 認証 URL を開きます
2. 承認後、Google は `localhost` へのリダイレクトを試行します (リモート サーバーで失敗します)。
3. ブラウザのアドレス バーから **完全な URL をコピー**します (ページが読み込まれない場合でも)
4. その URL を OmniRoute 接続モーダルに表示されるフィールドに貼り付けます。
5. **「接続」** をクリックします。

> これは、リダイレクト ページが読み込まれたかどうかに関係なく、URL 内の認証コードが有効であるため機能します。

---

<details>
<summary><b>🇧🇷 ポルトガル語</b></summary>

#### Antigravity / Gemini CLI の OAuth は、リモートのサービスを提供しますか?

**反重力** と **Gemini CLI** を使用して **Google OAuth 2.0** を認証します。 O Google exige que a `redirect_uri` usada no fluxo OAuth seja **exatamente** uma das URIs pré-cadastradas Google Cloud Console でアプリケーションを実行できません。

認証情報として OAuth は、`localhost`\*\* の OmniRoute データベースの構築をサポートしません。 OmniRoute サーバー リモートへのアクセス (例: `https://omniroute.meuservidor.com`)、Google による認証:

```
Error 400: redirect_uri_mismatch
```

#### 解決策: OAuth の固有資格情報を構成する

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

#### 一時的な回避策 (資格情報を適切に設定する)

**URL のマニュアル**:

1. OmniRoute は Google の自動 URL を提供します
2. `localhost` による Google の自動リダイレクト (サーバー リモートの要求)
3. **URL をコピーしてください** ブラウザを使用してブラウザを開きます (カレーグのページを表示します)
4. コール エッサ URL は、OmniRoute の接続モーダルなしです。
5. クリーク**「接続」**

> 自動回避策の機能は URL から独立してリダイレクトされます。

</details>

---

</details>

## 🛠️ 技術スタック

<details>
<summary><b>クリックして技術スタックの詳細を展開</b></summary>

- **ランタイム**: Node.js 18–22 LTS (⚠️ Node.js 24+ は **サポートされていません** — `better-sqlite3` ネイティブ バイナリは互換性がありません)
- **言語**: TypeScript 5.9 — `src/` および `open-sse/` 全体で **100% TypeScript** (v2.0 以降のコア モジュールには `any` はありません)
- **フレームワーク**: Next.js 16 + React 19 + Tailwind CSS 4
- **データベース**: LowDB (JSON) + SQLite (ドメイン状態 + プロキシ ログ + MCP 監査 + ルーティング決定)
- **スキーマ**: Zod (MCP ツール I/O 検証、API コントラクト)
- **プロトコル**: MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **ストリーミング**: サーバー送信イベント (SSE)
- **認証**: OAuth 2.0 (PKCE) + JWT + API キー + MCP スコープの認証
- **テスト**: Node.js テスト ランナー + Vitest (単体、統合、E2E を含む 900 以上のテスト)
- **CI/CD**: GitHub アクション (自動 npm パブリッシュ + リリース時の Docker Hub)
- **ウェブサイト**: [omniroute.online](https://omniroute.online)
- **パッケージ**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **回復力**: サーキット ブレーカー、エクスポネンシャル バックオフ、アンチサンダー ハード、TLS スプーフィング、自動コンボ自己修復

</details>

---

## 📖 ドキュメント

| ドキュメント                                   | 説明                                                        |
| ---------------------------------------------- | ----------------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)               | プロバイダー、コンボ、CLI 統合、展開                        |
| [API Reference](docs/API_REFERENCE.md)         | すべてのエンドポイントと例                                  |
| [MCP Server](open-sse/mcp-server/README.md)    | 16 MCP ツール、IDE 構成、Python/TS/Go クライアント          |
| [A2A Server](src/lib/a2a/README.md)            | JSON-RPC 2.0 プロトコル、スキル、ストリーミング、タスク管理 |
| [Auto-Combo Engine](docs/auto-combo.md)        | 6 要素スコアリング、モード パック、自己修復                 |
| [Troubleshooting](docs/TROUBLESHOOTING.md)     | よくある問題と解決策                                        |
| [Architecture](docs/ARCHITECTURE.md)           | システム アーキテクチャと内部構造                           |
| [Contributing](CONTRIBUTING.md)                | 開発セットアップとガイドライン                              |
| [OpenAPI Spec](docs/openapi.yaml)              | OpenAPI 3.0 仕様                                            |
| [Security Policy](SECURITY.md)                 | 脆弱性の報告とセキュリティの実践                            |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md)   | 完全ガイド: VM + nginx + Cloudflare セットアップ            |
| [Features Gallery](docs/FEATURES.md)           | スクリーンショットを含むビジュアル ダッシュボード ツアー    |
| [Release Checklist](docs/RELEASE_CHECKLIST.md) | リリース前の検証手順                                        |

---

## 🗺️ ロードマップ

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

> 📝 [**OMNI_TOKEN_342**](docs/new-features/) で全機能の仕様が利用可能 (217 の詳細仕様)

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
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 スターの歴史

## 時を超えたスターゲイザー

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 謝辞

このフォークのきっかけとなった元のプロジェクトである **[decolua](https://github.com/decolua)** による **[9router](https://github.com/decolua/9router)** に感謝します。 OmniRoute は、追加機能、マルチモーダル API、完全な TypeScript の書き換えを備えた素晴らしい基盤の上に構築されています。

この JavaScript 移植のきっかけとなったオリジナルの Go 実装である **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** に感謝します。

---

## 📄 ライセンス

MIT ライセンス - 詳細については、[LICENSE](LICENSE) を参照してください。

---

<div align="center">
  <sub>24 時間 365 日コーディングする開発者向けに ❤️ で構築</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
<!-- GitHub ディスカッションでコミュニティ Q&A が有効になりました -->
