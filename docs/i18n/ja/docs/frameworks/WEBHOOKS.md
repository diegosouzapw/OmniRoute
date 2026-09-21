# Webhooks (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **信頼できる唯一の情報源:** `src/lib/webhookDispatcher.ts`、`src/lib/db/webhooks.ts`、`src/app/api/webhooks/`
> **最終更新:** 2026-06-28 — v3.8.40

OmniRoute は、プラットフォームイベントの発生時に HTTP Webhook を送信できます。Slack、PagerDuty、Datadog、社内アラートサービス、その他の HTTP レシーバーとの統合に使用できます。

ディスパッチャーは各配信を HMAC-SHA256 で署名し、一時的な障害が発生した場合に再試行し、Webhook ごとに配信状態を追跡します。また、失敗が続くエンドポイントを自動的に無効化します。

## サポートされているイベント

`WebhookEvent` 型（`src/lib/webhooks/eventDescriptions.ts`。`src/lib/webhookDispatcher.ts` から使用）は、現在、次の4つのイベントのみをモデル化しています。

| イベント            | 発生条件                                                                 |
| ------------------- | ------------------------------------------------------------------------ |
| `request.completed` | プロキシされたリクエストが正常に完了したとき                             |
| `request.failed`    | すべての再試行／フォールバック後にプロキシされたリクエストが失敗したとき |
| `quota.exceeded`    | API キーが予算／クォータのしきい値を超えたとき                           |
| `test.ping`         | テストエンドポイントで使用される合成イベント                             |

サブスクリプションでは、すべてのイベントを受信するためにリテラル `"*"` を指定できます。`events` 内の不明なイベント名は、ディスパッチ時に無視されます。

> 注: ディスパッチャー API は接続済みですが、一部の `test.ping` 以外のイベントについては、本番環境の呼び出し元がまだ実装途上です。お使いのリリースで現在どのパスがディスパッチャーを呼び出しているかを確認するには、`grep dispatchEvent` を実行してください。

## アーキテクチャ

```
呼び出し元（ハンドラー、サービス、モニター）
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> webhook.events でフィルタリング
    -> 一致する各 Webhook に対して（並列実行）:
       deliverWebhook(url, payload, secret)
         ペイロード { event, timestamp, data } を構築
         HMAC-SHA256 で本文に署名（secret が存在する場合）
         10秒のタイムアウトで POST
         5xx／ネットワークエラー時に最大3回再試行
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

ディスパッチは、呼び出し元にとってファイア・アンド・フォーゲット方式です。`Promise.allSettled` が Webhook ごとのエラーを吸収するため、1つの不正なレシーバーが他のレシーバーをブロックすることはありません。

## HMAC 署名

Webhook に `secret` が設定されている場合、OmniRoute は JSON 本文に署名し、次のヘッダーを送信します。

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <イベント>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<16進数の HMAC-SHA256(secret, body)>
```

> ヘッダー名には `X-Webhook-*` プレフィックスを使用します（`X-OmniRoute-*` ではありません）。署名値は `sha256=<16進数>` です。プレフィックスを含む値全体を検証してください。

secret を指定せずに `createWebhook` を呼び出した場合、DB モジュールが secret（`whsec_<48桁の16進数>`）を生成するため、デフォルトですべての Webhookが署名されます。

### レシーバー側での検証

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

JSON を解析する前に、必ず**未加工の**リクエスト本文に対して検証してください。

## 再試行と失敗に関するポリシー

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 各試行のタイムアウトは10秒です（`AbortController`）。
- HTTP 2xx は成功として扱われます。
- HTTP 3xx/4xx は再試行不可の最終ステータスとして扱われ、`success = res.ok` として配信結果が記録されます。
- HTTP 5xx とネットワークエラーは、指数バックオフを使用して再試行されます:
  `2^attempt * 1000 ms`（1秒、2秒、4秒）。
- `maxRetries` を超えると、配信は失敗として記録されます。
- 配信のたびに `last_triggered_at`、`last_status` が更新され、`failure_count` はリセットまたは増加されます。
- ディスパッチャーは各ファンアウト後に `disableWebhooksWithHighFailures(10)` を呼び出すため、`failure_count >= 10` の Webhook は自動的に無効化されます。

## データベース

テーブル `webhooks`（マイグレーション `011_webhooks.sql`）:

| 列                  | 型      | 備考                                             |
| ------------------- | ------- | ------------------------------------------------ |
| `id`                | TEXT PK | UUID                                             |
| `url`               | TEXT    | 配信先 URL                                       |
| `events`            | TEXT    | JSON 配列。デフォルトは `["*"]`                  |
| `secret`            | TEXT    | HMAC シークレット（未指定の場合は自動生成）      |
| `enabled`           | INT     | 0/1。デフォルトは1                               |
| `description`       | TEXT    | 任意の人間向けラベル                             |
| `created_at`        | TEXT    | `datetime('now')`                                |
| `last_triggered_at` | TEXT    | 配信試行のたびに更新                             |
| `last_status`       | INT     | 最後の試行の HTTP ステータス（0 = ネットワーク） |
| `failure_count`     | INT     | 成功時に0へリセット、失敗時に+1                  |

配信履歴は、`webhooks` 行の集計カウンターに加えて、専用の `webhook_deliveries` テーブルに永続化されます（マイグレーション `069_webhook_deliveries.sql`。試行のたびに `src/lib/db/webhookDeliveries.ts::insertDelivery` を介して書き込まれます）。種別メタデータ（Slack / Discord / Telegram / カスタムペイロード変換処理）は、`070_webhooks_kind_metadata.sql` によって追加されました。

## REST API

すべてのエンドポイントで管理認証（`requireManagementAuth`）が必要です。

| エンドポイント                  | メソッド | 説明                                       |
| ------------------------------- | -------- | ------------------------------------------ |
| `/api/webhooks`                 | GET      | Webhook の一覧（シークレットはマスク済み） |
| `/api/webhooks`                 | POST     | Webhook を作成                             |
| `/api/webhooks/[id]`            | GET      | Webhook の詳細（完全なシークレット）       |
| `/api/webhooks/[id]`            | PUT      | フィールドを更新                           |
| `/api/webhooks/[id]`            | DELETE   | 削除                                       |
| `/api/webhooks/[id]/test`       | POST     | `test.ping` を送信（再試行なし）           |
| `/api/webhooks/[id]/deliveries` | GET      | 1つの Webhook の最近の配信試行             |
| `/api/webhooks/validate-url`    | POST     | 事前 URL 検証（SSRF ガード）               |

`GET /api/webhooks` は、一覧ページでの漏えいを防ぐため、シークレットを `<先頭10文字>...` にマスクします。実際にシークレットが必要な場合は、`[id]` の GET を使用してください。

### Webhook の作成

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack alerts"
  }'
```

`secret` を省略した場合、サーバーは `whsec_<hex>` 形式のシークレットを生成し、レスポンスで返します。

### Webhook のテスト

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` を返します。再試行は行われません。受信側がペイロードと署名を受け入れるかどうかを素早く検証する場合に便利です。

## ダッシュボード

`/dashboard/webhooks` のダッシュボードページ（
`src/app/(dashboard)/dashboard/webhooks/page.tsx` を参照）では、以下の機能を提供します。

- イベントピッカーを使用した Webhook の作成・編集
- `enabled`、`failure_count`、`last_status` に基づくステータス表示（有効 / 無効 / エラー）
- ワンクリックでのテスト配信
- 手動での有効化・無効化切り替え

## ペイロードの例

### request.completed

```json
{
  "event": "request.completed",
  "timestamp": "2026-05-13T20:30:00.123Z",
  "data": {
    "trace_id": "...",
    "api_key_id": "...",
    "provider": "openai",
    "model": "gpt-5",
    "status": 200,
    "tokens_in": 142,
    "tokens_out": 350,
    "cost_usd": 0.0042
  }
}
```

### test.ping

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "OmniRoute からのテスト Webhook 配信",
    "webhookId": "<uuid>"
  }
}
```

`test.ping` 以外のイベントのフィールド構造は、それらを発行する呼び出し元によって定義されます。`data` オブジェクトは前方互換性があるものとして扱ってください（フィールドは追加し、フィールドが存在しないことに依存しないでください）。

## ベストプラクティス

- **配信ごとに署名を検証する** — 必ず未加工のリクエストボディに対して検証してください。Webhook URL を推測した第三者による偽装 POST を防止できます。
- **約 5 秒以内に 2xx で応答する** — ディスパッチャーは 10 秒でタイムアウトします。受信側の処理が遅いと再試行回数を消費し、`failure_count` が増加します。
- **ハンドラーを冪等にする** — 再試行と少なくとも 1 回の配信セマンティクスにより、重複が発生する可能性があります。
- **必要最小限のイベントのみを購読する** — 実際に使用するイベントだけを指定してください。`"*"` を指定すると、管理下にない受信側にもコストが発生します。
- **`failure_count` を監視する** — エンドポイントは 10 回連続で失敗すると自動的に無効化されます。受信側を修正した後、`enabled: true` を指定して `PUT /api/webhooks/[id]` を呼び出すことでリセットできます。
- **シークレットを定期的にローテーションする** — 新しい `secret` を `PUT` し、その新しい値を受信側にデプロイしたうえで、テストエンドポイントを使用して確認してください。

## 関連項目

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — 管理 API の全仕様
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — `request.failed` を通じて通知されるプロバイダー障害の背後にあるサーキットブレーカー / クールダウンのセマンティクス
- ソース: `src/lib/webhookDispatcher.ts`、`src/lib/db/webhooks.ts`
