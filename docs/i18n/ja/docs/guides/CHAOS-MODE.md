# Chaos Mode (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **ダッシュボード:** **Chaos Mode**（サイドバー）→ `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run`（ダッシュボードセッション）· `POST /api/skills/collect/chaos`（APIキー）  
> **ソース:** `src/lib/chaos/chaosExecutor.ts`、`src/lib/chaos/chaosConfig.ts`

Chaos Modeは、**1つのタスクを複数のプロバイダーへ同時に送信**します。参加する各プロバイダーが1つのモデルインスタンスを提供し、すべての回答を並べて（または連鎖させて）取得できます。これはルーティング戦略ではなく、マルチモデル実行機能です。通常の`/v1/chat/completions`トラフィックには一切影響しません。

**区別 — 名前に「chaos」を含む機能は3つあります:**

| 対象            | 概要                                                                                                            | ドキュメント                                 |
| --------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**  | ここで説明するダッシュボードページとAPIです。1つのタスクを多数のプロバイダーに展開します（並列または協調）。    | このガイド                                   |
| `auto/chaos`    | 耐障害性テスト用の障害注入スコアリング重みを備えたAuto-ComboモデルIDです。設定は不要です。                      | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaosコンボ設定 | `config.chaos.enabled`を持つ永続化されたコンボです。オプションの判定モデルを含むパネルへ展開します（APIのみ）。 | `open-sse/services/autoCombo/chaosEngine.ts` |

## セットアップ

1. **ダッシュボード → Chaos Mode**（`/dashboard/chaos`）を開きます。
2. **オン**にします。Chaos Modeは**デフォルトで無効**です（`src/lib/chaos/chaosConfig.ts`の`enabled: false`）。無効な間、`POST /api/chaos/run`は`400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`を返します。
3. 参加プロバイダーとデフォルト値を選択します（設定ストアを通じてインスタンスごとに永続化されます）。

   | フィールド          | 意味                                                                         | デフォルト / 制限                                |
   | ------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------ |
   | `enabled`           | マスタースイッチ                                                             | `false`                                          |
   | `defaultMode`       | `parallel`または`collaborative`（以下を参照）                                | `parallel`                                       |
   | `providerOverrides` | プロバイダーごとの参加設定（`providerId`、オプションの`modelId`、`enabled`） | 空 = すべてのアクティブなプロバイダー、最大200件 |
   | `systemPrompt`      | 組み込みのChaosシステムプロンプトの上書き                                    | オプション、最大10,000文字                       |
   | `timeoutMs`         | モデル呼び出しごとの最大時間                                                 | `120000`（5,000～600,000）                       |
   | `maxTokens`         | モデル呼び出しごとの`max_tokens`                                             | `4096`（256～128,000）                           |

4. **ページ自体からテストを実行**します。結果パネルには各プロバイダーの回答、ステータス、所要時間が表示されます。

## 実行モード

- **`parallel`** — すべてのモデルが同じタスクを同時に受け取り、各回答を個別に取得します。
- **`collaborative`** — モデルは**連鎖的に**実行されます。各モデルは直前のモデルの出力を参照し、それを改善、拡張、批評するか、別の案を提示するよう求められます。レスポンスの`summary`フィールドには、成功した出力が連鎖順に連結されます（並列実行には`summary`がありません）。

## API

### `POST /api/chaos/run` — ダッシュボードセッション

Cookie認証（管理セッション。[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)を参照）を使用し、ダッシュボードページから利用されます。

```jsonc
// リクエストボディ
{
  "task": "Compare approaches to X", // 必須
  "providers": ["glm", "kimi"], // オプションのフィルター
  "mode": "parallel", // オプション — defaultModeを上書き
  "systemPrompt": "…", // オプションの上書き
  "maxTokens": 4096, // オプションの上書き
}
```

### `POST /api/skills/collect/chaos` — APIキー

外部呼び出し元向けのBearerトークン版です。キーには**Chaos Mode権限**（`chaosModeEnabled`）が必要です。この権限は**デフォルトでオフ**になっています。キーごとに**ダッシュボード → API Manager → キーを編集 → 権限 → Chaos Mode**で有効にしてください。リクエストボディは上記と同じです。

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

どちらのエンドポイントも同じ形式を返します。

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // collaborativeモードのみ
}
```

## トラブルシューティング

- **`400 Chaos Mode is not enabled`** — 上記の手順2を確認してください。グローバルスイッチがオフになっています。
- **APIキーが`/api/skills/collect/chaos`で拒否される** — キーに、キーごとの`chaosModeEnabled`権限がありません（デフォルトではオフです。これは設定であり、エラーではありません）。
- **結果に想定していたプロバイダーが含まれていない** — Chaos Modeページの`providerOverrides`（無効なオーバーライドは対象から除外されます）と、プロバイダー接続がアクティブかどうかを確認してください。
