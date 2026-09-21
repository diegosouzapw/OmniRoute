# OmniRoute Tiers — User Guide (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TIERS.md) · 🇪🇹 [am](../../../am/docs/guides/TIERS.md) · 🇸🇦 [ar](../../../ar/docs/guides/TIERS.md) · 🇦🇿 [az](../../../az/docs/guides/TIERS.md) · 🇧🇬 [bg](../../../bg/docs/guides/TIERS.md) · 🇧🇩 [bn](../../../bn/docs/guides/TIERS.md) · 🇨🇿 [cs](../../../cs/docs/guides/TIERS.md) · 🇩🇰 [da](../../../da/docs/guides/TIERS.md) · 🇩🇪 [de](../../../de/docs/guides/TIERS.md) · 🇬🇷 [el](../../../el/docs/guides/TIERS.md) · 🇪🇸 [es](../../../es/docs/guides/TIERS.md) · 🇪🇪 [et](../../../et/docs/guides/TIERS.md) · 🇮🇷 [fa](../../../fa/docs/guides/TIERS.md) · 🇫🇮 [fi](../../../fi/docs/guides/TIERS.md) · 🇫🇷 [fr](../../../fr/docs/guides/TIERS.md) · 🇮🇪 [ga](../../../ga/docs/guides/TIERS.md) · 🇮🇳 [gu](../../../gu/docs/guides/TIERS.md) · 🇳🇬 [ha](../../../ha/docs/guides/TIERS.md) · 🇮🇱 [he](../../../he/docs/guides/TIERS.md) · 🇮🇳 [hi](../../../hi/docs/guides/TIERS.md) · 🇭🇷 [hr](../../../hr/docs/guides/TIERS.md) · 🇭🇺 [hu](../../../hu/docs/guides/TIERS.md) · 🇦🇲 [hy](../../../hy/docs/guides/TIERS.md) · 🇮🇩 [id](../../../id/docs/guides/TIERS.md) · 🇳🇬 [ig](../../../ig/docs/guides/TIERS.md) · 🇮🇹 [it](../../../it/docs/guides/TIERS.md) · 🇬🇪 [ka](../../../ka/docs/guides/TIERS.md) · 🇰🇭 [km](../../../km/docs/guides/TIERS.md) · 🇮🇳 [kn](../../../kn/docs/guides/TIERS.md) · 🇰🇷 [ko](../../../ko/docs/guides/TIERS.md) · 🇱🇹 [lt](../../../lt/docs/guides/TIERS.md) · 🇱🇻 [lv](../../../lv/docs/guides/TIERS.md) · 🇮🇳 [ml](../../../ml/docs/guides/TIERS.md) · 🇮🇳 [mr](../../../mr/docs/guides/TIERS.md) · 🇲🇾 [ms](../../../ms/docs/guides/TIERS.md) · 🇲🇹 [mt](../../../mt/docs/guides/TIERS.md) · 🇲🇲 [my](../../../my/docs/guides/TIERS.md) · 🇳🇵 [ne](../../../ne/docs/guides/TIERS.md) · 🇳🇱 [nl](../../../nl/docs/guides/TIERS.md) · 🇳🇴 [no](../../../no/docs/guides/TIERS.md) · 🇮🇳 [or](../../../or/docs/guides/TIERS.md) · 🇮🇳 [pa](../../../pa/docs/guides/TIERS.md) · 🇵🇭 [phi](../../../phi/docs/guides/TIERS.md) · 🇵🇱 [pl](../../../pl/docs/guides/TIERS.md) · 🇵🇹 [pt](../../../pt/docs/guides/TIERS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TIERS.md) · 🇷🇴 [ro](../../../ro/docs/guides/TIERS.md) · 🇷🇺 [ru](../../../ru/docs/guides/TIERS.md) · 🇱🇰 [si](../../../si/docs/guides/TIERS.md) · 🇸🇰 [sk](../../../sk/docs/guides/TIERS.md) · 🇸🇮 [sl](../../../sl/docs/guides/TIERS.md) · 🇷🇸 [sr](../../../sr/docs/guides/TIERS.md) · 🇸🇪 [sv](../../../sv/docs/guides/TIERS.md) · 🇰🇪 [sw](../../../sw/docs/guides/TIERS.md) · 🇮🇳 [ta](../../../ta/docs/guides/TIERS.md) · 🇮🇳 [te](../../../te/docs/guides/TIERS.md) · 🇹🇭 [th](../../../th/docs/guides/TIERS.md) · 🇹🇷 [tr](../../../tr/docs/guides/TIERS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TIERS.md) · 🇵🇰 [ur](../../../ur/docs/guides/TIERS.md) · 🇺🇿 [uz](../../../uz/docs/guides/TIERS.md) · 🇻🇳 [vi](../../../vi/docs/guides/TIERS.md) · 🇳🇬 [yo](../../../yo/docs/guides/TIERS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TIERS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TIERS.md)

---

OmniRoute は、サポートされている 352 のプロバイダーを 3 つの料金ティアに分類します。各リクエストは、いずれかが正常に応答するまで順番に処理されます。フォールバックコードを一切記述することなく、利用可能な中で最も安価な応答を得られます。

## ティア 1 — サブスクリプション

**すでに料金を支払っているプロバイダー。** OmniRoute は、有効期限が切れる前にクォータを余すことなく活用します。

| プロバイダー                              | ティア 1 である理由                             |
| ----------------------------------------- | ----------------------------------------------- |
| Claude Code OAuth                         | Anthropic Pro/Team — 定額制で、未使用になりがち |
| OpenAI Codex (ChatGPT サブスクリプション) | Plus/Team に Codex クォータが含まれる           |
| GitHub Copilot                            | ユーザー単位 — クォータは毎月リセット           |
| Cursor IDE                                | Pro プランのクォータ                            |
| Antigravity / Devin Desktop               | 組み込みのクォータ                              |

**戦略**: モデルの得意分野に適合するすべてのリクエストを、まずここにルーティングします。クォータトラッカーはリセット時期の接近を監視し、`reset-aware` コンボ戦略がそれに応じて優先順位を付けます。ティア 1 を最初に使用し、クォータを使い切った場合にのみ有料ティアへ移行するには、`auto/thrifty` ID を使用します。または、プランに含まれるキャパシティの範囲内にとどまり、利用できない場合は失敗として終了するには、`auto/subscription` を使用します。[サブスクリプション優先ルーティング](../routing/SUBSCRIPTION_LADDER.md)を参照してください。

## ティア 2 — 低価格

**100 万トークンあたり $1 未満の従量課金プロバイダー。** 大量処理、またはティア 1 のクォータが上限に達した後のために確保されます。

| プロバイダー             | 料金（入力／出力）         | 強み                       |
| ------------------------ | -------------------------- | -------------------------- |
| DeepSeek V4 Pro          | 100 万あたり $0.27 / $1.10 | コード、推論               |
| GLM-4.5                  | 100 万あたり $0.60 / $2.20 | 長いコンテキスト           |
| MiniMax M1               | 100 万あたり $0.20 / $1.10 | 速度                       |
| Qwen Coder               | 100 万あたり $0.30 / $1.20 | コード                     |
| OpenRouter（価格最適化） | 変動                       | 100 以上のモデル、動的選択 |

**戦略**: `cost-optimized` コンボは、タスクの機能フィルター（ビジョン、JSON モード、ツール、最大コンテキスト）を満たすモデルのうち、トークン単価が最も低いものを選択します。

## ティア 3 — 無料

**コストゼロのプロバイダー** — 無料ティア、クレジットプログラム、OAuth の日次クォータ。

| プロバイダー     | 無料クォータ／クレジット                   |
| ---------------- | ------------------------------------------ |
| Kiro AI          | 無料の Claude ティア（寛大なフェアユース） |
| OpenCode Free    | 認証不要、寛大なレート制限                 |
| Qoder            | 無料の OAuth                               |
| Google Vertex AI | 新規アカウント向け $300 クレジット         |
| Amazon Q         | AWS ユーザー向け無料ティア                 |
| Pollinations     | オープンな公開 API                         |
| Cloudflare AI    | Workers AI の無料ティア                    |

**戦略**: 予算上限を設定した `auto` コンボは、ティア 1 と 2 が失敗した場合、または `useFreeOnly=true` が設定されている場合に、ここへルーティングします。無料プロバイダーはレート制限が厳しいことが多いため、サーキットブレーカーがバックオフ後に利用可能な状態へ復帰させます。

## ティアの設定

ダッシュボード → **Tiers** → プロバイダーを割り当てます。デフォルト（`tierDefaults.json` で定義）は妥当な設定です。優先したい特定のサブスクリプションや、除外したいプロバイダーがある場合は編集してください。

Auto-Combo の 16 要素スコアリングでは、ティアも考慮されます。[`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md)を参照してください。

## テレメトリ

ダッシュボード → **Usage** では、ティアごとの 1 日あたりのトークン使用量を確認できます。これを使用して、次のことを行えます。

- ティア 1 が完全に活用されていることを確認する（そうでなければ、サブスクリプションの価値を無駄にしています）
- 最も多く選択されているティア 2 モデルを特定する（1〜2 個に集約する）
- ティア 3 によってテスト／探索ワークロードのコストが削減されていることを確認する

## 一般的なパターン

### 完全無料のワークロード

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "costInv": 0.5, "tierPriority": 0.3 } } }
}
```

ティア 3 を強く優先します。ティア 3 が利用できない場合にのみ、ティア 2 を使用します。

### サブスクリプション優先、低価格フォールバック付き

```json
{
  "strategy": "priority",
  "targets": [
    { "provider": "claude-code-oauth", "weight": 1 },
    { "provider": "deepseek", "weight": 1 },
    { "provider": "kiro", "weight": 1 }
  ]
}
```

ティア 1 → ティア 2 → ティア 3 に対応する、明示的な順序付きリストです。
