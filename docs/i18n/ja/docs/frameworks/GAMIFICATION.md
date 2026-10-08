# Gamification & Leaderboard System (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **信頼できる情報源:** `src/lib/gamification/`、`src/lib/db/gamification.ts`、`src/app/api/gamification/`
> **最終更新:** 2026-06-28 — v3.8.40

OmniRoute には、プラットフォームの利用（リクエストの実行、プロバイダーの切り替え、コンボの作成、トークンの共有、コミュニティへの貢献）に応じてユーザーに報酬を与える、ローカルファーストのゲーミフィケーションレイヤーが含まれています。すべての状態は SQLite に保存されます。コミュニティサーバーとのフェデレーションはオプトイン方式で、プッシュベースです。

このシステムは、**ホットパスでゼロレイテンシー**となるよう設計されています。ゲーミフィケーションイベントはリクエストパイプラインからファイア・アンド・フォーゲット方式でディスパッチされ、LLM のレスポンスをブロックすることはありません。

---

## 概要

### 目的

目に見える進捗（XP、レベル、バッジ）、社会的証明（リーダーボード）、経済的インセンティブ（トークン共有、招待報酬）を提供することで、ユーザーエンゲージメントと継続率を向上させます。

### 対象範囲

| 機能                 | 説明                                                           |
| -------------------- | -------------------------------------------------------------- |
| XP とレベル          | アクションごとに XP を獲得し、多項式曲線に沿ってレベルアップ   |
| バッジ               | 5 つのカテゴリーと 4 段階のレアリティにわたる 20 以上の実績    |
| ストリーク           | 現在および最長の連続記録を含む、日次アクティブ利用状況の追跡   |
| リーダーボード       | グローバル、週間、月間、トークン共有、貢献度の各スコープ       |
| トークン共有         | 複式記帳台帳を介したユーザー間のクレジット移転                 |
| 招待と引き換え       | SHA-256 でハッシュ化して保存される紹介コード                   |
| コミュニティサーバー | 外部の OmniRoute インスタンスとのフェデレーション              |
| 不正防止             | サーバー側でのスコアリング、レート制限、z スコアによる異常検出 |

### 設計原則

1. **ローカルファースト** — すべての状態を SQLite に保存し、外部サービスを必要としません。
2. **ノンブロッキング** — イベントはファイア・アンド・フォーゲット方式です。ゲーミフィケーションロジックによって LLM のレスポンス経路が遅延することはありません。
3. **サーバー権限** — XP はサーバー側でのみ計算され、クライアントがスコアを不正に増加させることはできません。
4. **プライバシーへの配慮** — リーダーボードへの参加はオプトイン方式で、ユーザーはプロフィールを非表示にできます。
5. **フェデレーション対応** — コミュニティサーバーは署名付き API を介してスコアをプッシュできます。同期では加算ではなく上書きが行われます。

---

## アーキテクチャ

### 高レベルフロー

```
クライアントリクエスト
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (既存のパイプライン) ...
      → アップストリームのレスポンスをクライアントに送信
      → setImmediate (ファイア・アンド・フォーゲット):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

イベントエミッターが唯一の統合ポイントです。`chatCore.ts` はレスポンスの送信後に `emitGamificationEvent()` を呼び出し、イベントモジュールが XP、ストリーク、バッジ、リーダーボード、不正防止の各サブシステムへ処理を振り分けます。

### モジュール依存関係グラフ

```
src/lib/gamification/
  events.ts          ← エントリーポイント (chatCore.ts から呼び出される)
    ├── xp.ts        ← XP の計算とレベルの決定
    ├── streaks.ts   ← 日次アクティブストリークの追跡
    ├── badges.ts    ← バッジ基準の評価
    ├── leaderboard.ts ← ランクの計算と SSE ブロードキャスト
    ├── antiCheat.ts ← レート制限と異常検出
    ├── sharing.ts   ← トークン移転台帳
    ├── invites.ts   ← 招待/引き換えコードの管理
    ├── servers.ts   ← コミュニティサーバーのフェデレーション
    └── notifications.ts ← SSE 通知ストリーム

src/lib/db/
  gamification.ts    ← すべての CRUD 操作 (8 テーブル)

src/app/api/gamification/
  leaderboard/       ← GET ランキング、POST 手動更新
  leaderboard/stream ← SSE リアルタイム更新
  transfer/          ← GET 履歴、POST トークン送信
  invite/            ← GET/POST コード、DELETE 取り消し
  invite/redeem/     ← POST コードの引き換え
  servers/           ← GET/POST/DELETE コミュニティサーバー
  federation/score/  ← POST サーバーへのスコアのプッシュ
  federation/leaderboard/ ← GET サーバーからのリーダーボードの取得
  notifications/     ← SSE バッジ/レベルアップ通知
  anomalies/         ← GET 異常レポート (管理者)
  rotate/            ← POST 招待トークンシークレットのローテーション
```

---

## データレイヤー

### データベーステーブル

すべてのテーブルは、マイグレーション `060_create_gamification.sql` によって作成されるメインの OmniRoute SQLite データベース内にあります。WAL ジャーナリングは、`src/lib/db/core.ts` のシングルトン `getDbInstance()` から継承されます。

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ api_key_id    TEXT PK    │
│ api_key_id    TEXT      │     │ xp            INTEGER    │
│ scope         TEXT      │     │ level         INTEGER    │
│ score         INTEGER   │     │ title         TEXT       │
│ period        TEXT      │     │ updated_at    TEXT       │
│ updated_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────┐     ┌──────────────────────────┐
│     user_badges         │     │    badge_definitions     │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ badge_id      TEXT FK   │     │ category      TEXT       │
│ earned_at     TEXT      │     │ rarity        TEXT       │
│ notified      INTEGER   │     │ criteria_type TEXT       │
└─────────────────────────┘     │ criteria      TEXT(JSON) │
                                │ description   TEXT       │
                                │ icon          TEXT       │
                                │ hidden        INTEGER    │
                                └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│     xp_audit_log        │     │     token_ledger         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ from_key_id   TEXT       │
│ action        TEXT      │     │ to_key_id     TEXT       │
│ xp_awarded    INTEGER   │     │ amount        INTEGER    │
│ metadata      TEXT(JSON)│     │ idempotency_key TEXT UQ  │
│ created_at    TEXT      │     │ created_at    TEXT       │
└─────────────────────────┘     └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│    invite_tokens        │     │   community_servers      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ code          TEXT UQ   │     │ url           TEXT       │
│ token_hash    TEXT      │     │ token_hash    TEXT       │
│ uses          INTEGER   │     │ status        TEXT       │
│ max_uses      INTEGER   │     │ last_sync     TEXT       │
│ created_at    TEXT      │     │ created_at    TEXT       │
│ expires_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
```

### ドメインモジュール: `src/lib/db/gamification.ts`

標準的な OmniRoute パターンに従い、`core.ts` から `getDbInstance()` をインポートし、型付けされた CRUD 関数をエクスポートします。ルートハンドラーには生の SQL を記述しません。

主要な関数:

| 関数                       | 説明                                                     |
| -------------------------- | -------------------------------------------------------- |
| `upsertLeaderboardEntry()` | (api_key_id, scope, period) のスコアを挿入または更新する |
| `getLeaderboard()`         | 指定された scope/period のページネーション付きランキング |
| `getUserLevel()`           | ユーザーレベルレコードを取得または作成する               |
| `updateUserLevel()`        | XP、レベル、称号をアトミックに設定する                   |
| `getBadgeDefinitions()`    | すべてのバッジ定義（任意でフィルタリング可能）           |
| `getUserBadges()`          | ユーザーが獲得したバッジ                                 |
| `awardBadge()`             | バッジ獲得情報を挿入する（badge_id に対して冪等）        |
| `logXpAction()`            | xp_audit_log に追記する                                  |
| `getXpAuditLog()`          | ユーザーのページネーション付き監査履歴                   |
| `insertLedgerEntry()`      | 複式記帳による送金（トランザクション内）                 |
| `getBalance()`             | ユーザーの受取額から送金額を差し引いた合計               |
| `getTransferHistory()`     | ページネーション付き送金ログ                             |
| `createInviteToken()`      | 招待コードとハッシュ化されたトークンを挿入する           |
| `redeemInviteToken()`      | コードで検索し、検証して、使用回数を増加させる           |
| `upsertCommunityServer()`  | フェデレーションサーバーを登録または更新する             |
| `getCommunityServers()`    | ユーザーのサーバー一覧                                   |
| `deleteCommunityServer()`  | サーバー登録を削除する                                   |

---

## XP / レベルシステム

**ファイル:** `src/lib/gamification/xp.ts`

### レベル曲線

レベル `n` に到達するために必要な XP は、次の多項式曲線に従います。

```
xp_for_level(n) = floor(100 * n^1.5)
```

| レベル | 次のレベルまでの XP | 累計 XP   | 称号         |
| ------ | ------------------- | --------- | ------------ |
| 1      | 100                 | 100       | 初心者       |
| 5      | 1,118               | 2,415     | 初心者       |
| 10     | 3,162               | 10,523    | 探索者       |
| 25     | 12,500              | 86,024    | 探索者       |
| 50     | 35,355              | 345,529   | エキスパート |
| 75     | 64,952              | 948,683   | マスター     |
| 100    | 100,000             | 2,050,000 | レジェンド   |

### 称号

| レベル範囲 | 称号         |
| ---------- | ------------ |
| 1 – 9      | 初心者       |
| 10 – 24    | 探索者       |
| 25 – 49    | エキスパート |
| 50 – 74    | マスター     |
| 75 – 100   | レジェンド   |

### XP 報酬

| アクション        | XP  | 説明                                                      |
| ----------------- | --- | --------------------------------------------------------- |
| `request`         | 1   | OmniRoute を経由してルーティングされた API リクエストごと |
| `provider_switch` | 5   | 別のプロバイダーへの切り替え                              |
| `model_switch`    | 3   | 別のモデルへの切り替え                                    |
| `combo_create`    | 10  | 新しいコンボの作成                                        |
| `combo_use`       | 2   | リクエストでのコンボの使用                                |
| `token_share`     | 1   | 別のユーザーと共有した 1,000 トークンごと                 |
| `invite_redeem`   | 50  | 招待コードの引き換え                                      |
| `daily_login`     | 5   | 日ごとのアクティブ利用（1 日 1 回）                       |
| `streak_bonus`    | 2   | 連続利用日ごと（連続日数を乗算）                          |
| `badge_unlock`    | 10  | バッジのアンロック                                        |

### 付与フロー

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. `XP_REWARDS[action]` を参照して XP の量を取得します。
2. `checkRateLimit()` を通します（不正防止: キーごとに最大 1000 XP/分）。
3. トランザクションを開始します。
   - 現在の `user_levels` 行を読み取ります。
   - XP を加算し、`levelFromXp(totalXp)` でレベルを再計算します。
   - レベルが変わった場合、`levelUp = true` を設定します。
   - `user_levels` 行を更新します。
   - `xp_audit_log` に挿入します。
4. 結果を返します。通知は呼び出し元が処理します。

### ヘルパー: `levelFromXp(totalXp)`

レベル 1..100 を反復し、累計 XP が `totalXp` を超えるまで `xp_for_level(n)` を加算します。しきい値を満たす最も高いレベルを返します。
これは O(100) です。レベルの上限が 100 であるため、許容範囲内です。

---

## バッジシステム

**ファイル:** `src/lib/gamification/badges.ts`

### カテゴリ

| カテゴリ       | 説明                         | バッジの例                                |
| -------------- | ---------------------------- | ----------------------------------------- |
| `usage`        | 利用量に基づくマイルストーン | 初回リクエスト、1,000 リクエスト、100,000 |
| `sharing`      | トークン共有と紹介           | 初回共有、寛大（10 回共有）               |
| `contribution` | コミュニティへの貢献         | コンボ作成者、プロバイダー探索者          |
| `streak`       | 継続的な利用                 | 週間戦士、月間献身者                      |
| `rare`         | 達成困難または非表示の実績   | 早期導入者、バグ報告者                    |

### レアリティ

| レアリティ  | 色       | 確率の目安         |
| ----------- | -------- | ------------------ |
| `common`    | グレー   | ほとんどのユーザー |
| `uncommon`  | グリーン | アクティブユーザー |
| `rare`      | ブルー   | 熱心なユーザー     |
| `legendary` | ゴールド | 上位 1%            |

### 条件タイプ

| タイプ         | フィールド           | 説明                                            |
| -------------- | -------------------- | ----------------------------------------------- |
| `action_count` | `count`              | アクションを N 回実行（例: 1,000 リクエスト）   |
| `streak`       | `days`               | N 日間連続の利用を維持                          |
| `unique_count` | `field`, `n`         | N 個の一意な値を使用（例: 10 個の異なるモデル） |
| `rank`         | `scope`, `n`         | リーダーボードのスコープでランク N に到達       |
| `first`        | —                    | アクションを最初に実行                          |
| `hidden`       | （条件により異なる） | 獲得するまで表示されない条件                    |

バッジ定義は JSON の `criteria` として `badge_definitions` に保存されます。

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### 評価フロー

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # すべての定義
    → getUserBadges(apiKeyId)         # 獲得済み（スキップ）
    → 未獲得の各バッジについて:
       → matchesCriteria(badge, event, userState)
       → 一致した場合: awardBadge(apiKeyId, badgeId)
         → 通知ペイロードを返す
```

評価は**イベント駆動型**です。ゲーミフィケーションイベントのたびに実行されますが、`criteria.type` がイベントアクションと一致するバッジのみを確認します。これにより、評価を高速に保ちます（ほとんどのイベントで 5ms 未満）。

### `matchesCriteria(badge, event, userState)`

| 条件タイプ     | チェック                                                                 |
| -------------- | ------------------------------------------------------------------------ |
| `action_count` | `getActionCount(apiKeyId, action) >= count`                              |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                                     |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                                   |
| `rank`         | `getRank(apiKeyId, scope) <= n`                                          |
| `first`        | このアクションタイプについて、過去の `xp_audit_log` エントリが存在しない |
| `hidden`       | 適切なサブチェックに処理を委譲                                           |

### 組み込みバッジ（20 個以上）

<details>
<summary>バッジの全リスト</summary>

| バッジ                 | カテゴリ | レアリティ     | 条件                       |
| ---------------------- | -------- | -------------- | -------------------------- |
| はじめの一歩           | 利用     | コモン         | 1回のリクエスト            |
| ウォームアップ         | 利用     | コモン         | 100回のリクエスト          |
| パワーユーザー         | 利用     | アンコモン     | 1,000回のリクエスト        |
| センチュリオン         | 利用     | レア           | 10,000回のリクエスト       |
| オムニパワー           | 利用     | レジェンダリー | 100,000回のリクエスト      |
| プロバイダーホッパー   | 貢献     | コモン         | 5種類のプロバイダーを使用  |
| プロバイダーマスター   | 貢献     | アンコモン     | 20種類のプロバイダーを使用 |
| コンボアーキテクト     | 貢献     | アンコモン     | 5個のコンボを作成          |
| コンボグランドマスター | 貢献     | レア           | 25個のコンボを作成         |
| 初めての共有           | 共有     | コモン         | 1回のトークン転送          |
| 寛大                   | 共有     | アンコモン     | 10回のトークン転送         |
| 博愛家                 | 共有     | レア           | 合計10,000トークンを転送   |
| 紹介者                 | 共有     | コモン         | 1件の紹介に成功            |
| ネットワークビルダー   | 共有     | アンコモン     | 10件の紹介に成功           |
| 週間ウォリアー         | 連続記録 | アンコモン     | 7日間連続                  |
| 月間デボーテッド       | 連続記録 | レア           | 30日間連続                 |
| アンストッパブル       | 連続記録 | レジェンダリー | 365日間連続                |
| アーリーアダプター     | レア     | レジェンダリー | ベータ期間中に参加         |
| 圧縮の先駆者           | レア     | アンコモン     | 圧縮を100回使用            |
| スキルコレクター       | レア     | レア           | 10種類のスキルを使用       |
| モデルエクスプローラー | 貢献     | アンコモン     | 15種類のモデルを使用       |

</details>

---

## ストリークトラッカー

**ファイル:** `src/lib/gamification/streaks.ts`

### データモデル

ストリークは、名前空間付きキーを使用して `key_value` テーブル（共有ユーティリティテーブル）に保存されます。

| キー                          | 値                               | 説明                         |
| ----------------------------- | -------------------------------- | ---------------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | アクティブなストリークデータ |

### ロジック

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. `key_value` からストリークレコードを読み取ります。
2. `{current}`、`{longest}`、`{lastDate}`（ISO 日付文字列）を解析します。
3. `lastDate === today` の場合 — 変更しません（当日分はすでにカウント済み）。
4. `lastDate === yesterday` の場合 — `current` をインクリメントし、必要に応じて `longest` を更新します。
5. `lastDate < yesterday` の場合 — `current = 1` にリセットします（ストリークが途切れたため）。
6. 更新したレコードを書き込みます。
7. マイルストーン（7、14、30、60、90、180、365日）を確認します。到達した場合は
   `milestone = true` を設定します（呼び出し元が XP を付与し、バッジを確認します）。

### エッジケース

- **タイムゾーン**: ストリークでは UTC 日付（`new Date().toISOString().slice(0, 10)`）を使用します。
  これは意図的な仕様です。単一の標準タイムゾーンを採用することで、
  タイムゾーンを切り替える不正行為を防止します。
- **新規ユーザー**: ストリークレコードが存在しないため、最初のリクエスト時に
  `current=1, longest=1, lastDate=today` として作成されます。
- **1日あたり複数回のリクエスト**: UTC 日付における最初のリクエストのみが
  ストリークをインクリメントします。

---

## リーダーボード

**ファイル:** `src/lib/gamification/leaderboard.ts`

### スコープ

| スコープ        | 期間    | 説明                                                         |
| --------------- | ------- | ------------------------------------------------------------ |
| `global`        | `all`   | 全期間の累計 XP                                              |
| `weekly`        | `week`  | 現在の UTC 週（月曜日〜日曜日）に獲得した XP                 |
| `monthly`       | `month` | 現在の UTC 月に獲得した XP                                   |
| `tokens_shared` | `all`   | 他のユーザーに移転したトークンの合計                         |
| `contributions` | `all`   | 作成したコンボ数 + 使用したプロバイダー数 + 使用したスキル数 |

### ランクの計算

ランクは保存されず、**読み取り時に計算されます**。これにより、古くなったランクデータを回避し、
定期的なランク再計算ジョブが不要になります。

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

クエリパターン:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### 期間のローテーション

週間および月間リーダーボードは自動的にローテーションされます。

1. **アーカイブ**: 期間の境界で、現在のエントリを期間ラベルとともに
   `leaderboard_archive` にコピーします。
2. **リセット**: 終了した期間のエントリを削除します。
3. **トリガー**: `updateLeaderboard()` が呼び出されるたびに確認し、新しい期間の
   最初のリクエストによってローテーションが実行されます。

これにより、週間リーダーボードは毎週月曜日の 00:00 UTC にリセットされ、
月間リーダーボードは毎月1日にリセットされます。

### SSE リアルタイム更新

**エンドポイント:** `GET /api/gamification/stream`

```
クライアント → GET /api/gamification/stream
  → SSE 接続を確立
  → サーバーが上位10件のリーダーボードスナップショットを即座に送信
  → 5秒ごと: 変更がある場合、更新された上位10件をプッシュ
  → 15秒ごと: ハートビートコメント（": heartbeat\n\n"）
  → クライアントが切断 → クリーンアップ（リスナーを削除）
```

イベント形式:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

SSE マネージャーはスコープごとに接続済みクライアントを追跡し、
前回のプッシュ以降にリーダーボードデータが実際に変更された場合のみ更新を送信します。

---

## トークン共有

**ファイル:** `src/lib/gamification/sharing.ts`

### 複式台帳

各送金では、`token_ledger` に2行が作成されます。

| 行   | `from_key_id` | `to_key_id` | `amount` |
| ---- | ------------- | ----------- | -------- |
| 借方 | 送信者        | 受信者      | +金額    |
| 貸方 | 受信者        | 送信者      | -金額    |

ただし、規則は次のとおりです。

| 行   | `from_key_id` | `to_key_id` | `amount` | 意味             |
| ---- | ------------- | ----------- | -------- | ---------------- |
| 送信 | 送信者        | 受信者      | +金額    | 送信者からの流出 |
| 受信 | 受信者        | 送信者      | +金額    | 受信者への流入   |

残高は次のように計算されます。

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### 送金フロー

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **検証**: `amount > 0`、`fromKeyId !== toKeyId`。
2. **冪等性**: `idempotency_key` が台帳にすでに存在するか確認します。
   存在する場合は、キャッシュされた結果を返します。
3. **トランザクション**（単一のSQLiteトランザクション）:
   a. 送信者の残高を計算します。
   b. `balance < amount` の場合、処理を中止します（残高不足）。
   c. 送信行を挿入します（`from=sender,` を返します。

### レート制限

- APIキーごとに1分あたり最大10回の送金。
- 1回の送金につき最大10,000トークン。
- APIキーごとに1日あたり最大100,000トークンを送金可能。

---

## 招待トークンと引き換えトークン

**ファイル:** `src/lib/gamification/invites.ts`

### コード形式

- **コード**: 8文字の英数字（例: `A3K9-X7M2`）。人間が読みやすい形式で、
  ユーザーに表示されます。
- **トークン**: 32バイトのランダムトークン。SHA-256ハッシュとして保存されます。
  プログラムによる引き換え（例: URLリンク）に使用されます。

### ストレージ

| 列           | 値                                   |
| ------------ | ------------------------------------ |
| `code`       | `A3K9X7M2`（一意、インデックス付き） |
| `token_hash` | SHA-256(raw_token)                   |

生のトークンは、作成時に一度だけユーザーに返されます。OmniRouteは、
その後このトークンを保存または表示することはありません。保持されるのはハッシュのみです。

### 自己紹介の防止

ユーザーがコードを引き換える際、システムは次の項目を確認します。

1. コードが別の `api_key_id` に属していること。
2. 引き換えを行うユーザーが、同じ紹介者のコードを過去に引き換えていないこと
   （`invite_tokens` と引き換えログを結合して確認）。

いずれかの確認に失敗した場合、明確なエラーメッセージとともに引き換えが拒否されます。

### 有効期限と制限

- デフォルトの `max_uses`: 10（作成時に設定可能）。
- デフォルトの `expires_at`: 作成から30日後。
- 有効期限切れまたは使用上限に達したコードに対しては、HTTP 410 Goneが返されます。

---

## コミュニティサーバーフェデレーション

**ファイル:** `src/lib/gamification/servers.ts`

### 接続

コミュニティサーバーは、リモートサーバーが発行した招待トークンを使用して登録されます。ローカルインスタンスは次の処理を行います。

1. 招待トークンを受け取ります（例: ダッシュボードに貼り付け）。
2. リモートサーバーの `POST /api/gamification/federation/leaderboard` を呼び出し、トークンを検証して現在のリーダーボードを取得します。
3. `status: connected` としてサーバーレコードを保存します。

### 同期モデル

フェデレーションでは、加算方式ではなく**上書き同期**を使用します。

```
ローカルインスタンス                  コミュニティサーバー
     │                                        │
     ├── スコアをプッシュ ──────────────────►│  POST /federation/score
     │   { api_key_id, score }                │  (サーバーがトークンハッシュを検証)
     │                                        │
     ├── リーダーボードをプル ──────────────►│  GET /federation/leaderboard
     │◄── 上位N件のエントリ ─────────────────┤  (ローカルキャッシュを上書き)
     │                                        │
     └── ヘルスチェック ────────────────────►│  GET /federation/health
         (60秒ごと、タイムアウト5秒)          │
```

### 認証

フェデレーションリクエストには以下が含まれます。

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

リモートサーバーはトークンをハッシュ化し、一致する `community_servers` 行を検索します。これにより、保存されているハッシュを送信せずに済みます。

### ヘルスモニタリング

各サーバーレコードでは、以下を追跡します。

| フィールド  | 説明                                        |
| ----------- | ------------------------------------------- |
| `status`    | `connected`、`degraded`、`unreachable`      |
| `last_sync` | 最後に同期が成功した時点のISOタイムスタンプ |
| `failures`  | 連続したヘルスチェックの失敗回数            |

5回連続で失敗すると、ステータスが `unreachable` に変わり、手動のヘルスチェックが成功するまで同期が一時停止されます。

---

## 不正防止

**ファイル:** `src/lib/gamification/antiCheat.ts`

### サーバー側でのスコア計算

すべてのXP計算は `src/lib/gamification/xp.ts` で行われます。クライアントがスコアを送信することはありません。クライアントはアクションを送信し、サーバーがXPを計算します。`leaderboard.score` 列に書き込めるのは、サーバー側のコードのみです。

### レート制限

| 制限                    | 値      | 適用範囲    |
| ----------------------- | ------- | ----------- |
| 1分あたりの最大XP       | 1,000   | APIキーごと |
| 1分あたりの最大転送回数 | 10      | APIキーごと |
| 1回あたりの最大転送量   | 10,000  | 転送ごと    |
| 1日あたりの最大転送量   | 100,000 | APIキーごと |

レート制限には、メモリ内のスライディングウィンドウ（`open-sse/services/` の `RateLimitManager` と同じパターン）を使用します。プロセスが再起動した場合は、SQLiteベースのカウンターにフォールバックします。

### Zスコアによる異常検出

APIキーごとに、1時間あたりの獲得XPについて、直近7日間のローリングウィンドウを維持します。XPが付与されるたびに、以下の処理を行います。

1. ユーザーの現在の1時間あたりのXP獲得率を計算します。
2. 母集団の平均値と標準偏差を計算します。
3. `z = (user_rate - mean) / stddev` を計算します。
4. `z > 3.0`（標準偏差の3倍）の場合、異常としてフラグを付けます。

異常は `action = 'anomaly_detected'` として `xp_audit_log` に記録され、管理ダッシュボードに表示されます。

### 監査証跡

XPの付与、転送、バッジ獲得、異常検出はすべて、以下の情報とともに `xp_audit_log` に記録されます。

| フィールド   | 説明                                                |
| ------------ | --------------------------------------------------- |
| `api_key_id` | 実行者                                              |
| `action`     | 発生した内容（xp_award、transfer、anomaly、…）      |
| `xp_awarded` | 量（XP以外のイベントでは0）                         |
| `metadata`   | コンテキストを含むJSON（アクションタイプ、対象、…） |
| `created_at` | 発生日時（ISO 8601）                                |

管理者は `GET /api/gamification/anomalies` を通じて、完全な監査証跡を照会できます。

---

## APIルート

すべてのルートは標準のOmniRouteパターンに従います。

```
ルート → CORSプリフライト → リクエストボディの検証（Zod） → 認証（extractApiKey）
  → ハンドラー
```

### エンドポイント

| メソッド | パス                                       | 説明                                                     | 認証             |
| -------- | ------------------------------------------ | -------------------------------------------------------- | ---------------- |
| GET      | `/api/gamification/leaderboard`            | リーダーボードを取得（スコープ、期間、ページネーション） | 任意             |
| POST     | `/api/gamification/leaderboard`            | リーダーボードのキャッシュを強制更新                     | 必須             |
| GET      | `/api/gamification/stream`                 | SSEによるリアルタイムのリーダーボード更新                | 任意             |
| GET      | `/api/gamification/transfer`               | 送金履歴を取得（ページネーション）                       | 必須             |
| POST     | `/api/gamification/transfer`               | 別のユーザーにトークンを送信                             | 必須             |
| GET      | `/api/gamification/invite`                 | 自分の招待コードを一覧表示                               | 必須             |
| POST     | `/api/gamification/invite`                 | 新しい招待コードを生成                                   | 必須             |
| DELETE   | `/api/gamification/invite`                 | 招待コードを無効化                                       | 必須             |
| POST     | `/api/gamification/invite/redeem`          | 招待コードを利用                                         | 必須             |
| GET      | `/api/gamification/servers`                | コミュニティサーバーを一覧表示                           | 必須             |
| POST     | `/api/gamification/servers`                | コミュニティサーバーに接続                               | 必須             |
| DELETE   | `/api/gamification/servers`                | コミュニティサーバーから切断                             | 必須             |
| POST     | `/api/gamification/federation/score`       | リモートサーバーにスコアを送信                           | フェデレーション |
| GET      | `/api/gamification/federation/leaderboard` | リモートからリーダーボードを取得                         | フェデレーション |
| GET      | `/api/gamification/notifications`          | SSEによるバッジ獲得／レベルアップ通知                    | 必須             |
| GET      | `/api/gamification/anomalies`              | 異常レポートを表示（管理者）                             | 管理者           |
| POST     | `/api/gamification/rotate`                 | 招待トークンのシークレットをローテーション               | 必須             |

### リクエスト／レスポンスの例

**POST /api/gamification/transfer**

```json
// リクエスト
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// レスポンス 200
{
  "success": true,
  "transfer": {
    "id": "txn-uuid",
    "from": "sender-api-key-id",
    "to": "recipient-api-key-id",
    "amount": 500,
    "createdAt": "2026-05-19T12:00:00.000Z"
  },
  "balance": 2500
}

// レスポンス 400（残高不足）
{
  "error": "Insufficient balance",
  "balance": 200,
  "requested": 500
}
```

**GET /api/gamification/leaderboard?scope=weekly&limit=10**

```json
{
  "scope": "weekly",
  "period": "2026-W20",
  "entries": [
    {
      "rank": 1,
      "apiKeyId": "key-uuid",
      "displayName": "User***1234",
      "score": 15230,
      "level": 42,
      "title": "Expert"
    }
  ],
  "total": 847,
  "updatedAt": "2026-05-19T12:00:00.000Z"
}
```

---

## MCP ツール (8)

既存のツールとともに `open-sse/mcp-server/` に登録されています。
`gamification` 権限スコープの配下にあります。

| ツール                     | 説明                                       | 入力スキーマ                 |           |
| -------------------------- | ------------------------------------------ | ---------------------------- | --------- |
| `gamification_leaderboard` | スコープ／期間のリーダーボードを取得       | `{ scope, period?, limit? }` |
| `gamification_rank`        | 呼び出し元の順位と前後のユーザーを取得     | `{ scope }`                  |
| `gamification_profile`     | XP、レベル、称号、ストリークの概要を取得   | `{}`                         |
| `gamification_badges`      | 獲得済みバッジまたはすべての定義を一覧表示 | `{ earned?: boolean }`       |
| `gamification_transfer`    | 別のユーザーにトークンを送信               | `{ to, amount }`             |
| `gamification_invite`      | 招待コードを生成または一覧表示             | `{ action: "create"          | "list" }` |
| `gamification_servers`     | コミュニティサーバーを一覧表示または接続   | `{ action, token? }`         |
| `gamification_anomalies`   | 異常レポートを表示（管理者スコープ）       | `{ limit?, since? }`         |

---

## ダッシュボードページ

### `/dashboard/leaderboard`

- 表彰台表示（上位3名のアバターとXP）。
- スコープセレクター：グローバル／週間／月間／共有トークン数／貢献。
- 順位、名前、スコア、レベル、称号を含むページネーション付きテーブル（1ページ25件）。
- SSEによるリアルタイム更新 — 順位の変動をアニメーション表示。
- 現在のユーザーをテーブル内で強調表示し、「あなたの順位」の固定行を表示。

### `/dashboard/profile`

- 現在のレベルと次のレベルのしきい値を示すXP進捗バー。
- 称号バッジを目立つように表示。
- バッジギャラリー — 獲得済みバッジには獲得日を表示し、未獲得バッジはグレー表示
  （隠しバッジは獲得するまで「???」と表示）。
- 炎アイコン付きのストリークカウンターと、ストリークカレンダー（過去30日間）。
- XP履歴グラフ（過去30日間の日次XP）。

### `/dashboard/tokens`

- トークン残高（ページ上部に目立つように表示）。
- 送信フォーム：受信者、数量、確認ダイアログ。
- フィルター（送信／受信／すべて）付きの送信履歴テーブル。
- 招待セクション：有効なコード、新規生成、共有リンク。
- コミュニティサーバー：稼働状態を含む一覧、接続／切断。

### `/dashboard/gamification/admin`

- 重大度、ユーザー、タイムスタンプ、zスコアを含む異常一覧。
- フィルター（アクション種別、ユーザー、日付範囲）付きの監査ログビューアー。
- システム統計：付与されたXPの合計、アクティブユーザー数、バッジ獲得率。
- フェデレーションサーバーの稼働状況の概要。

---

## パイプライン統合

### 統合ポイント

ゲーミフィケーションは、`open-sse/handlers/chatCore.ts` 内の単一のポイントで
リクエストパイプラインにフックされます。

```typescript
// レスポンスがクライアントに送信された後：
setImmediate(() => {
  emitGamificationEvent({
    type: "request.completed",
    apiKeyId,
    metadata: {
      provider: selectedProvider,
      model: selectedModel,
      comboId: resolvedCombo?.id,
      compressionUsed: compressionStats?.applied,
      skillUsed: skillExecution?.name,
    },
  }).catch(() => {
    // ファイア・アンド・フォーゲット：ログには記録するが、クライアントには決して伝播させない
  });
});
```

### イベントタイプ

| イベントタイプ      | 発行されるタイミング                                         |
| ------------------- | ------------------------------------------------------------ |
| `request.completed` | 成功したLLMレスポンスが送信されたとき                        |
| `provider.switch`   | プロバイダーが変更されたとき（コンボのフォールバックを含む） |
| `combo.created`     | 新しいコンボ設定が保存されたとき                             |
| `combo.used`        | コンボターゲットへのアクセスに成功したとき                   |
| `badge.earned`      | バッジ評価で一致が見つかったとき                             |
| `streak.milestone`  | ストリークのしきい値を超えたとき                             |
| `transfer.sent`     | トークンの送信が完了したとき                                 |
| `referral.redeemed` | 招待コードが正常に引き換えられたとき                         |
| `compression.used`  | プロンプト圧縮が適用されたとき                               |
| `skill.executed`    | スキルの実行が完了したとき                                   |
| `model.first_use`   | 過去7日間に使用されていないモデルが使用されたとき            |

### ノンブロッキングの保証

`setImmediate` + `.catch(() => {})` パターンにより、以下が保証されます。

1. ゲーミフィケーションが実行される前に、レスポンスが完全に送信されます。
2. ゲーミフィケーションのエラーがクライアントに通知されることはありません。
3. イベント処理はインラインではなく、次のマイクロタスクで実行されます。

---

## セキュリティ

### 脅威モデル

| 脅威                           | 対策                                                                          |
| ------------------------------ | ----------------------------------------------------------------------------- |
| スコアの水増し                 | XP の計算はサーバー側のみで実施。クライアントはスコアではなくアクションを送信 |
| リプレイ攻撃                   | 転送に冪等性キーを使用。監査ログの重複を排除                                  |
| 転送詐欺                       | 複式簿記台帳、アトミックトランザクション、レート制限                          |
| 自己紹介                       | 引き換え時に `api_key_id` を照合                                              |
| リーダーボードの操作           | Z スコアによる異常検知、管理者向け異常ダッシュボード                          |
| フェデレーショントークンの窃取 | SHA-256 でハッシュ化して保存。生のトークンは一度だけ表示                      |
| 招待コードへの総当たり攻撃     | 引き換えエンドポイントでのレート制限、8 文字分のエントロピー                  |
| 表示名での XSS                 | 表示名をサニタイズ。リーダーボードのエントリをエスケープ                      |
| ハッシュへのタイミング攻撃     | トークンハッシュの比較に `crypto.timingSafeEqual` を使用                      |

### 認証要件

- **公開**（認証不要）: `GET /leaderboard`、`GET /stream`（読み取り専用の
  リーダーボード）。
- **API キー必須**: すべての書き込み操作、プロフィール、転送、招待。
- **管理者のみ**: 異常ダッシュボード、監査ログビューアー。
- **フェデレーション**: `Authorization` ヘッダー内の生のトークンを使用する別の認証パス。
  保存されている SHA-256 ハッシュと照合して検証。

---

## テスト

### テストファイル

すべてのテストで Node.js ネイティブテストランナー（`node --import tsx/esm --test`）を使用します。

| テストファイル                                | 対象範囲                                       | テスト数 |
| --------------------------------------------- | ---------------------------------------------- | -------- |
| `tests/unit/gamification/xp.test.ts`          | XP の計算、レベル曲線、称号                    | 8        |
| `tests/unit/gamification/badges.test.ts`      | バッジ条件の照合、付与                         | 10       |
| `tests/unit/gamification/streaks.test.ts`     | 連続記録のロジック、マイルストーン、境界ケース | 7        |
| `tests/unit/gamification/leaderboard.test.ts` | 順位計算、ページネーション、ローテーション     | 8        |
| `tests/unit/gamification/sharing.test.ts`     | 転送、残高、冪等性                             | 9        |
| `tests/unit/gamification/invites.test.ts`     | 作成、引き換え、有効期限、自己紹介             | 7        |
| `tests/unit/gamification/antiCheat.test.ts`   | レート制限、Z スコア、監査ログ記録             | 6        |
| `tests/unit/gamification/events.test.ts`      | イベント発行、ファンアウト、エラー処理         | 5        |

### テストの実行

```bash
# すべてのゲーミフィケーションテスト
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# 単一のテストファイル
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### カバレッジ要件

`CONTRIBUTING.md` に従い、すべての新規モジュールは以下を満たす必要があります。

- ブランチカバレッジ >= 80%。
- すべての公開関数を少なくとも 1 回テストする。
- エラーパスをテストする（残高不足、期限切れのコード、レート制限）。

---

## ファイル構成

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # 全8テーブル + インデックス
      gamification.ts                  # ドメインCRUDモジュール
    gamification/
      xp.ts                           # XP計算、レベル曲線、称号
      badges.ts                       # バッジ定義、条件、評価
      streaks.ts                      # 連続利用日数の追跡
      leaderboard.ts                  # ランク計算、SSE、ローテーション
      antiCheat.ts                    # レート制限、zスコア、監査
      sharing.ts                      # トークン転送台帳
      invites.ts                      # 招待／引き換えコード
      servers.ts                      # コミュニティサーバーのフェデレーション
      events.ts                       # イベントエミッター（統合ポイント）
      notifications.ts                # SSE通知ストリーム
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST リーダーボード
        leaderboard/stream/route.ts   # SSEリアルタイム更新
        transfer/route.ts             # GET/POST 転送
        invite/route.ts               # GET/POST/DELETE 招待コード
        invite/redeem/route.ts        # POST コード引き換え
        servers/route.ts              # GET/POST/DELETE サーバー
        federation/score/route.ts     # POST スコアのプッシュ
        federation/leaderboard/route.ts # GET リーダーボードの取得
        notifications/route.ts        # SSE通知
        anomalies/route.ts            # GET 異常レポート
        rotate/route.ts               # POST シークレットのローテーション
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # ランキングページ
        profile/page.tsx               # XP／バッジ／連続利用日数ページ
        tokens/page.tsx                # 残高／転送／招待ページ
        gamification/admin/page.tsx    # 管理者向け異常監視
  shared/
    constants/
      gamification.ts                  # XP_REWARDS、TITLES、BADGE_DEFS、LIMITS

tests/
  unit/
    gamification/
      xp.test.ts
      badges.test.ts
      streaks.test.ts
      leaderboard.test.ts
      sharing.test.ts
      invites.test.ts
      antiCheat.test.ts
      events.test.ts

docs/
  frameworks/
    GAMIFICATION.md                    # 本ドキュメント
```

---

## マイグレーション戦略

### フェーズ1：バックエンドコア（PR 1）

- マイグレーション `060_create_gamification.sql`（8テーブル）。
- `src/lib/db/gamification.ts`（ドメインモジュール）。
- `src/lib/gamification/xp.ts`、`streaks.ts`、`events.ts`。
- `chatCore.ts` の統合ポイント。
- XP、連続利用日数、イベントのユニットテスト。

### フェーズ2：バッジとリーダーボード（PR 2）

- `src/lib/gamification/badges.ts`、`leaderboard.ts`。
- 定数内のバッジ定義。
- リーダーボードAPIルート + SSEストリーム。
- バッジ、リーダーボードのユニットテスト。

### フェーズ3：共有と招待（PR 3）

- `src/lib/gamification/sharing.ts`、`invites.ts`、`antiCheat.ts`。
- 転送 + 招待APIルート。
- 共有、招待、不正防止のユニットテスト。

### フェーズ4：フェデレーションとダッシュボード（PR 4）

- `src/lib/gamification/servers.ts`、`notifications.ts`。
- フェデレーションAPIルート。
- ダッシュボードページ（リーダーボード、プロフィール、トークン、管理）。
- MCPツールの登録。

---

## 今後の検討事項

- **シーズンイベント**: 期間限定のバッジセットとリーダーボードシーズン。
- **チームリーダーボード**: 組織またはコンボごとにユーザーをグループ化。
- **XP倍率**: プロモーション期間中にXP獲得量を増加。
- **実績の共有**: 共有可能なバッジカード（OpenGraph画像）を生成。
- **モバイルプッシュ通知**: バッジ／レベルイベント向けのWebhookベースの通知。
- **リーダーボードAPI**: サードパーティー連携向けの公開API。
