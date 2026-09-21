# Subscription-first routing (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> 2 つの新しい `auto/*` ID — `auto/subscription` と `auto/thrifty`。どちらも、明示的に
> リクエストされた場合のみ有効になります。呼び出し元が ID を名前で指定しない限り、
> これらを経由してルーティングされることはなく、既存のプール、戦略、デフォルトも変更されません。

## これが存在する理由

OmniRoute はすでにコストに関する 2 つの問いに答えていますが、どちらも大半の運用者が尋ねる問いではありません。

| 既存の仕組み                                             | 答える問い                                         |
| -------------------------------------------------------- | -------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | 「このモデルは無料としてカタログ化されているか？」 |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | 「この接続から課金される可能性はあるか？」         |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | 「この接続は上限に近づいているか？」               |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | 「支出に上限を設け、最安の選択肢へ切り替える」     |

無料専用の仕組みはすべて **フェイルクローズ** です。無料プールを使い切ると空のプールになり、
有料オプションへ昇格することはありません。また、有料側の仕組みはいずれもティアを考慮しません。
どちらも、次の問いには答えられません。

> 「すでに料金を支払っているクォータを使う。それを使い切ったら停止するか、最も安い有料オプションから
> 1 段ずつ昇格していく。そして、クォータがリセットされたら即座に戻る。」

## 課金はモデルではなく接続の属性

`classifyTier()` (`open-sse/services/tierResolver.ts`) は `(provider, model)` をキーとして、
カタログ価格から `free | cheap | premium` を返します。しかし、リクエストに追加料金が
発生するかどうかは、**どの接続がそのリクエストを処理するか** によって決まります。同じモデルでも、
Claude Code OAuth 接続ではプランに含まれますが、API キー接続ではトークン単位で課金されます。

`provider_connections.auth_type` は、どちらの方向でも安全な判定材料ではありません。従量課金の
OAuth 接続もあれば、プランに含まれる API キー接続もあります（Copilot のシートトークンは
従量課金 API キーではありません）。そのため、課金クラスは **キュレーション済みカタログ**
`open-sse/config/connectionBillingCatalog.ts` から取得し、各プロバイダーが公開している規約に
基づいて手動設定します。これは、無料モデル向けに `FreeModelBudget.hardStopGuaranteed` が
すでに確立しているものと同じパターンです。

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

解決順序（`autoCombo/connectionBilling.ts`）は、合成された認証なしセンチネル →
`keyless`、プロバイダー **かつ** `authType` に一致するカタログエントリ、プロバイダー全体の
エントリ、それ以外は `unknown` です。**未キュレーションは無料ではありません**。
`unknown` はあらゆる箇所で `metered` として扱われるため、明日追加されるプロバイダーは
最初からサブスクリプション段階の外に置かれ、意図的にキュレーションしなければそこには入りません。

## 段階モデル

昇格順に 5 つの段階があります。違いは価格だけではありません。それぞれに **固有の**
枯渇シグナルがあるため、これは単なるソートではありません。

| #   | 段階           | メンバーシップ                                 | 枯渇条件                           |
| --- | -------------- | ---------------------------------------------- | ---------------------------------- |
| 0   | `subscription` | キュレーション済みの `billing: "subscription"` | クォータウィンドウがカットオフ以下 |
| 1   | `keyless`      | 合成された認証なしパス                         | 接続のクールダウン／ブレーカー     |
| 2   | `free`         | 従量課金接続、`classifyTier() === "free"`      | 無料枠を使い切ったとき             |
| 3   | `cheap`        | 従量課金接続、`classifyTier() === "cheap"`     | 段階ごとの予算を使い切ったとき     |
| 4   | `premium`      | 従量課金接続、`classifyTier() === "premium"`   | 段階ごとの予算を使い切ったとき     |

段階 0～2 は、観測可能ですでに追跡されている **クォータ** によって枯渇します。段階 3～4 には
クォータがありません。有料接続は無期限に処理し続けるため、妥当な枯渇シグナルは段階ごとの
**予算** だけです。予算がなければ、「cheap が枯渇したら昇格する」ためのトリガーがありません。

## `auto/subscription` — フェイルクローズ

プール = ラング 0 のみ。超過時の挙動が文書化された `hard-stop` であり、クォータに余裕があることがライブで確認された接続だけに制限されます。曖昧なものはすべて除外されます。具体的には、未精査のプロバイダー、検証不能なクォータ値、古い値、または超過分が従量課金されるものです。

空のプールは不具合ではなく、**意図された**結果です。呼び出し元に既存の空プール処理があり、暗黙の課金フォールバックではなく明確なエラーへ変換します。これが、この id が保証するすべてです。

`keyless` は意図的に対象外です。このグループは「自分が料金を支払っているプラン」を意味するため、認証不要のバックエンドはここには属しません。その用途には `auto/thrifty`（または `auto/best-free`）を使用してください。

### 接続の安全性

候補は必ずしも 1 つの接続に紐づいているとは限りません。論理候補は `allowedConnectionIds` 許可リストを持ち、実際に使用するアカウントは後からディスパッチ時に `open-sse/services/combo/autoStrategy.ts` によって選択されます。そのため、どちらのグループも**各接続を個別に**検証し、`allowedConnectionIds` を、条件を満たしたサブセットだけに書き換えます。元のリスト全体にも、恣意的に選んだ 1 件にも決してしません。`autoStrategy.ts` はこの配列をすでに厳格な許可リストとして強制しているため、ここで書き換えることにより、「検証済み」と「実際に使用される」が構造上同じ集合になります。これは [STRICT_ZERO_COST](./STRICT_ZERO_COST.md) と同じ不変条件であり、同じ考え方です。

## `auto/thrifty` — 一度に 1 ラングずつエスカレート

プール = 全ラング。ラングインデックス順に並び、枯渇した候補は除外されます。`auto` エンジンは、条件を満たしたプールの**内部**で引き続きスコアリングを行います。ラダーがどのラングを対象にするかを決定し、スコアリングがその中でどの候補を選ぶかを決定します。ラング内の順序は安定しているため、このオーバーレイによってスコアラー自身のランキングが並べ替えられることはありません。

これは順序付け + ゲーティングのオーバーレイであり、**新しいディスパッチャーではありません**。`combo.ts` の投機的ループは、すでにターゲットを順番に処理して失敗時に次へフォールスルーするため、事前チェックで検出できなかった実行時の枯渇が発生しても、同じリクエスト内で次のラングへエスカレートします。

`auto/subscription` が**フェイルクローズ**するのに対し、`auto/thrifty` は**フェイルオープン**します。使用可能なクォータ値が取得できない場合でも、プランに含まれる接続が最初に試されます。試すだけならコストはかからず、実際に枯渇していればフォールスルーによって次のラングへ進みます。一方、試行を拒否すると、テレメトリが欠落しているだけでリクエストが有料ラングへ送られます。これはまさに、このグループが回避するために存在している結果です。

## リセット後にプランへ戻る

ルーティングがラング 0 に戻るには、独立した 3 つの要素すべてが期限切れになる必要があります。1 つだけ修正しても、プランが補充されてから長時間にわたり、ラダーが有料ラングに固定されたままになります。

1. **クォータ状態キャッシュ** — `freeAccessQuota.ts` は `(provider, connection)` ごとに 180 秒の TTL でキャッシュします。自身の `resetAt` がすでに経過しているキャッシュエントリは、もはや存在しないウィンドウを表しているため、経過時間に**関係なく**古いものとして扱われ、強制的に更新されるようになりました。これがないと、深夜 0 時に補充されたプランでも、TTL がたまたま切れるまで枯渇状態として読み取られ続けます。
2. **ラダー自体の状態** — 設計上、そのような状態はありません。ラングの適格性は、プールを構築するたびにライブのクォータ状態から再計算されます。リセット後も残存してルーティングを停止させる可能性のある「現在ラング 3 を使用中」のような永続化レコードは存在しません。
3. **接続のクールダウン** — 枯渇時の 429 は指数バックオフに基づいて `rateLimitedUntil` を設定しますが、プラン接続の場合、実際のリセット時刻を超過する可能性があります。`clampCooldownToReset()`（`subscriptionLadder.ts`）は、クールダウンをアップストリーム自身のリセット時刻まで短縮し、延長することは決してありません。**実装およびテストは済んでいますが、まだ接続されていません**。`src/sse/services/auth.ts` では、クールダウンが書き込まれる**前に**クォータキャッシュが無効化されるため、`resetAt` は同関数内のさらに早い段階で取得する必要があります。これはレジリエンスのホットパスへの変更であり、独立してレビューされる PR で扱うべきものです。それまでは、再参加は接続のクールダウンが終わるまで待機します（プロバイダーがアップストリームの `Retry-After` ヒントを送信した場合は、すでにそちらが優先されます）。

### フラッピング防止

リセットされたばかりのラングが再び許可されるのは、`reentryMinRemainingPercent`（デフォルト 5）を上回った場合のみです。一方、すでに使用中の接続は `exitCutoffPercent`（デフォルト 2、`quotaPreflight.defaultThresholdPercent` と一致）を上回っていれば維持されます。この差がヒステリシス帯です。これがないと、カットオフ付近を推移する接続は、連続するリクエストのたびにラング間を行き来します。

## 設定

チューニングのみです。意図的に `enabled` フラグはありません。これらを無効にできるトグルがあると、
`auto/subscription` が、その名称が示す意味とは正反対に、有料モデルを含むプール全体を
ひそかに提供することになるためです。

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 にすると、そのラングが完全に無効になります
  },
}
```

支出リゾルバーが接続されるまで、予算によるゲーティングは機能しません。会計情報を利用できない場合、有料
ラングは順序付けされますが、ゲーティングされることはありません。v3.8.51 時点では、`rungBudgetUsd` 設定は
スキーマで受け入れられますが、まだ適用されません。実際に機能する支出上限ではなく、予約済みの設定として扱ってください。ラングの順序付け、クォータに基づく枯渇、リセット後の再エントリーは、いずれも
この設定なしで機能します。

## 構成

`subscription` と `thrifty` は `AutoTier` 値であるため、すべてのカテゴリと組み合わせられます。
たとえば、`auto/coding:thrifty`、`auto/reasoning:subscription` などです。2 つのフラット ID
（`auto/subscription`、`auto/thrifty`）は、`/v1/models` とダッシュボードに表示されます。

どちらの ID も有料ティアではないため、`isPaidTierAutoId()` は両方に対して `false` を返し、
`auto/subscription` は `hidePaidModels` による非表示の対象になりません。

## コードの所在

| 関連事項                               | ファイル                                            |
| -------------------------------------- | --------------------------------------------------- |
| 厳選された課金情報                     | `open-sse/config/connectionBillingCatalog.ts`       |
| 分類器                                 | `open-sse/services/autoCombo/connectionBilling.ts`  |
| ラング、両方のグループ化、再エントリー | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| 候補プールへの接続                     | `open-sse/services/autoCombo/virtualFactory.ts`     |
| リセットを考慮したキャッシュの陳腐化   | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| ティアの公開面                         | `open-sse/services/autoCombo/suffixComposition.ts`  |
| 表示される ID                          | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| テスト                                 | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
