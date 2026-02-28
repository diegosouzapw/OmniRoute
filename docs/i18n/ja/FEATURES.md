# OmniRoute — ダッシュボード機能ギャラリー

🌐 **Languages:** 🇺🇸 [English](../../FEATURES.md) | 🇧🇷 [Português (Brasil)](../pt-BR/FEATURES.md) | 🇪🇸 [Español](../es/FEATURES.md) | 🇫🇷 [Français](../fr/FEATURES.md) | 🇮🇹 [Italiano](../it/FEATURES.md) | 🇷🇺 [Русский](../ru/FEATURES.md) | 🇨🇳 [中文 (简体)](../zh-CN/FEATURES.md) | 🇩🇪 [Deutsch](../de/FEATURES.md) | 🇮🇳 [हिन्दी](../in/FEATURES.md) | 🇹🇭 [ไทย](../th/FEATURES.md) | 🇺🇦 [Українська](../uk-UA/FEATURES.md) | 🇸🇦 [العربية](../ar/FEATURES.md) | 🇯🇵 [日本語](../ja/FEATURES.md) | 🇻🇳 [Tiếng Việt](../vi/FEATURES.md) | 🇧🇬 [Български](../bg/FEATURES.md) | 🇩🇰 [Dansk](../da/FEATURES.md) | 🇫🇮 [Suomi](../fi/FEATURES.md) | 🇮🇱 [עברית](../he/FEATURES.md) | 🇭🇺 [Magyar](../hu/FEATURES.md) | 🇮🇩 [Bahasa Indonesia](../id/FEATURES.md) | 🇰🇷 [한국어](../ko/FEATURES.md) | 🇲🇾 [Bahasa Melayu](../ms/FEATURES.md) | 🇳🇱 [Nederlands](../nl/FEATURES.md) | 🇳🇴 [Norsk](../no/FEATURES.md) | 🇵🇹 [Português (Portugal)](../pt/FEATURES.md) | 🇷🇴 [Română](../ro/FEATURES.md) | 🇵🇱 [Polski](../pl/FEATURES.md) | 🇸🇰 [Slovenčina](../sk/FEATURES.md) | 🇸🇪 [Svenska](../sv/FEATURES.md) | 🇵🇭 [Filipino](../phi/FEATURES.md)

OmniRoute ダッシュボードの各セクションへの視覚的なガイド。

---

## 🔌 プロバイダー

AI プロバイダー接続の管理: OAuth プロバイダー (Claude Code、Codex、Gemini CLI)、API キー プロバイダー (Groq、DeepSeek、OpenRouter)、および無料プロバイダー (iFlow、Qwen、Kiro)。

![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 コンボ

フィルファースト、ラウンドロビン、2 つのべき乗、ランダム、最小使用、コスト最適化の 6 つの戦略を使用してモデル ルーティング コンボを作成します。各コンボは、自動フォールバックを使用して複数のモデルをチェーンします。

![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 分析

トークン消費量、コスト見積もり、アクティビティヒートマップ、週次分布グラフ、プロバイダーごとの内訳を含む包括的な使用状況分析。

![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 システムの健全性

リアルタイム監視: 稼働時間、メモリ、バージョン、遅延パーセンタイル (p50/p95/p99)、キャッシュ統計、プロバイダーのサーキット ブレーカーの状態。

![Health Dashboard](screenshots/04-health.png)

---

## 🔧 翻訳者の遊び場

API 変換をデバッグするための 4 つのモード: **プレイグラウンド** (フォーマット コンバーター)、**チャット テスター** (ライブ リクエスト)、**テスト ベンチ** (バッチ テスト)、**ライブ モニター** (リアルタイム ストリーム)。

![Translator Playground](screenshots/05-translator.png)

---

## ⚙️ 設定

一般設定、システム ストレージ、バックアップ管理 (データベースのエクスポート/インポート)、外観 (ダーク/ライト モード)、セキュリティ (API エンドポイント保護とカスタム プロバイダーのブロックを含む)、ルーティング、復元力、および詳細な構成。

![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI ツール

AI コーディング ツールのワンクリック構成: Claude Code、Codex CLI、Gemini CLI、OpenClaw、Kilo Code、Antigravity。

![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 📝 リクエストログ

プロバイダー、モデル、アカウント、API キーによるフィルタリングを備えたリアルタイムのリクエストログ。ステータス コード、トークンの使用状況、待ち時間、応答の詳細を表示します。

![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API エンドポイント

機能の内訳を含む統合 API エンドポイント: チャット完了、埋め込み、画像生成、再ランキング、音声文字起こし、登録された API キー。

![Endpoint Dashboard](screenshots/09-endpoint.png)
