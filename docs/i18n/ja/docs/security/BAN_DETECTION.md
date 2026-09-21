# Account-Ban / Banned-Keyword Detection (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute は、プロバイダーの**アカウントが恒久的に無効**（一時停止 / 無効化 / 利用規約違反による禁止）であることを示すシグナルがないかアップストリームのエラーレスポンスをスキャンし、一致した場合、その接続を**終端 `banned` 状態**に移行して、以後リクエストに選択されないようにします。これは、**Security → Banned Keywords** 設定カード（「恒久的なアカウント禁止の検出をトリガーする追加キーワード。組み込みキーワードは常に適用されます。」）で設定する機能です。

このページでは、組み込みリスト、検出フロー、その適用範囲、カスタムキーワードを安全に追加する方法、およびフラグが付けられた接続を復旧する方法について説明します。終端状態自体はレジリエンスモデルの一部です。詳細については、
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md)（「終端状態」）を参照してください。

**信頼できる情報源:** `open-sse/services/accountFallback.ts`
（`ACCOUNT_DEACTIVATED_SIGNALS`、`getMergedBannedSignals()`、`isAccountDeactivated()`）。

## 組み込みキーワード

以下の8つの部分文字列は、カスタムリストの有無にかかわらず、常に適用されます（大文字と小文字は区別されません）。

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> このリストは、プロバイダーが禁止時の文言を変更するのに合わせて更新されます。正式な
> 内容は `open-sse/services/accountFallback.ts` の `ACCOUNT_DEACTIVATED_SIGNALS`
> です。上記のブロックはスナップショットとして扱ってください。

同じファイルには、隣接する2つの**別個の**シグナルテーブルがあり、これらは banned-keyword 検出の一部ではありません。

- `CREDITS_EXHAUSTED_SIGNALS` — 請求枠/クォータの枯渇（`insufficient_quota`、
  `credit_balance_too_low`、`payment required`、…）→ 終端 `credits_exhausted`。
- `OAUTH_INVALID_TOKEN_SIGNALS` — **非終端**。トークンの更新によって復旧可能です。

注: **`rate limit`** / `429` のような一般的な一時的フレーズは、レート制限 / 接続クールダウンの経路で処理され、禁止シグナルには**該当しません**。

## 検出フロー

```
アップストリームのエラーレスポンス
  → 本文を文字列化して小文字に変換
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [部分文字列一致]
  → 一致するか？
      → 接続の testStatus = "banned"      （恒久的 — 1年間のクールダウン、自動復旧なし）
      → 設定 `autoDisableBannedAccounts` が有効で、`autoDisableBannedScope` が
        この接続を対象に含む場合（`all`、または OAuth/cookie/session に対する `subscription`）
        → さらに isActive = false。スコープが `subscription` の場合、
        プリペイド API キーはアクティブなままです。
      → アカウント選択時に接続をスキップ（combo の QUOTA_BLOCKING ステータス）
```

- 一致判定は、レスポンス**本文**に対する**大文字と小文字を区別しない部分文字列**検索です
  （`isAccountDeactivated`、`accountFallback.ts`）。
- 禁止シグナルを含む本文が検出されると、**任意の HTTP ステータス**で恒久的な `banned` への終端化が実行されます（`markAccountUnavailable` → `checkFallbackError` 経由）。より限定的な **`deactivated`** ラベル（接続に予備の API キーがない場合は `isActive=false`）は、**HTTP 401 / 403** のときにインラインの `chatCore.ts` 経路によって書き込まれます（`classifyProviderError` → `ACCOUNT_DEACTIVATED` によって分類）。一方、`markAccountUnavailable()` 経路は、同じ `ACCOUNT_DEACTIVATED` シグナルに対して、`resolveTerminalConnectionStatus` 経由で**別の**終端ステータスである **`expired`** を書き込むことに注意してください。そのため、同じ禁止でも、レスポンスを処理した経路に応じて `deactivated` または `expired` のいずれかとして現れる可能性があります。（古いコードコメントには「401 の本文にこれらの文字列が含まれている場合」と記載されていますが、これは現在の動作を過小に説明しています。）
- `banned` 接続は、終端ステータスがフィルタリングされるすべての箇所で選択対象から除外されます（`isTerminalConnectionStatus`、combo の `QUOTA_BLOCKING_CONNECTION_STATUSES`）。

## スコープ — スキャン対象のプロバイダー

**すべてのプロバイダー。** このチェックは、失敗したすべてのアップストリームリクエストが通過する汎用エラー処理パイプラインで実行されます。OAuth/サブスクリプションスクレイパーに限定されているわけでは**ありません**。その結果として設定される終端状態は、プロバイダー単位ではなく**接続**単位です。

ただし、組み込みの_文字列_は、実際にBANされるリスクがあるサブスクリプション/OAuthプロバイダー（ChatGPT Web Codex、Claude Web、Codex、Muse Spark、Antigravity）向けに調整されています。APIキープロバイダーで検出が発生するのは、そのエラー本文にいずれかの部分文字列が文字どおり含まれている場合のみです。

`autoDisableBannedScope`（`all` | `subscription`、デフォルトは`all`）は、一致した場合に`isActive=false`も設定するかどうかを制御します。`subscription`は、ログイン形式のアカウント枠（有料サブスクリプションおよび無料アカウント。Web Cookieセッションを含む）を意味します。プリペイドAPIキーについても`testStatus=banned`は記録されますが、ルーティングプールには残されます。最終的な設計ではプロバイダー単位およびアカウント単位のオーバーライドを採用する予定であり、このグローバル列挙型はその第一段階です。

## カスタムBANキーワード

**Security → Banned Keywords**でキーワードを追加または削除します（グローバルな`customBannedSignals`設定として`PATCH /api/settings`経由で永続化されます）。これらは組み込みリストに**追加**されるものであり、置き換えるものではありません。また、保存時（および起動時）に`setCustomBannedSignals()`経由でホットリロードされます。各キーワードは最大200文字に制限されますが、配列の長さに上限はありません。

**⚠ 誤検出のリスク — 具体的なフレーズを選んでください。** 検出ではレスポンス本文全体に対して単純な部分文字列一致が行われ、一致すると**永続的**に扱われます（1年間のクールダウン、手動復旧）。範囲が広すぎるキーワードは、完全に正常な接続をBANする可能性があります。

- **悪い例:** `quota`、`limit`、`error`、`denied` — 多くの一時的なエラーに出現します。
- **良い例:** BANを示す完全な文。例: `your account has been suspended for`、
  `account permanently banned`、`violation of our terms`。

実際にBANされた際にプロバイダーが返す、曖昧さのない最長のフレーズを使用してください。判断に迷う場合は、まず接続の`lastError`を確認してから、そこに記載された正確な文言を追加してください。

## フラグが付いた接続の復旧

終端状態の`banned` / `deactivated`は**自動復旧しません**（プロアクティブ復旧処理の対象外です。自動的に復旧するのは`unavailable`のクールダウンだけです）。オペレーターが明示的に解除する必要があります。

1. **接続を再テストする** — ダッシュボードの**Test**操作
   （`POST /api/providers/{id}/test`）。プローブに成功すると`testStatus`が
   `active`にリセットされ、エラーフィールドがクリアされます。
2. **再認証する / 認証情報を編集する** — OAuthプロバイダーでは、ログイン
   / 更新フローを再実行します。プロバイダーの作成/インポートルートは`isActive = true`を設定します。
3. **接続を再度有効にする** — 自動無効化によって`isActive = false`が設定された場合
   （スコープが`all`の場合、またはOAuth/Cookie/セッション接続で`subscription`の場合）、
   アカウントを修正した後に再び有効化してください。

「BANフラグをクリア」するための独立したボタンはありません。復旧方法は再テスト、再認証、または再有効化であり、[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md)に記載されている一般的な終端状態のルールに従います。

## プローブの分離（モデルの全件テスト）

**プローブ起因の障害**（`runAsProbe`内で実行されたモデルの全件テスト / ヘルスチェックディスパッチ）によって接続がプールから削除されることはありません（#9817）。これは**可視化のために記録**されます（`last_error`、`last_error_type`、`error_code`、`last_error_at`）が、クールダウン、終端状態（`banned` / `deactivated` / `credits_exhausted`）、モデル単位のロックアウト、プロバイダーのサーキットブレーカー、5分間のクォータキャッシュ、OAuthトークンの更新、自動無効化など、ルーティングに対する**すべての**変更はスキップされます。無効化が発生するのは、実際のリクエストパスで障害が発生した場合のみです。記録されたエラーにより、フラグが付いたアカウントはトラフィックの処理を継続したままダッシュボードに表示されます。

単一の判定ポイントは`shouldIsolateProbeFailures()`
（`src/shared/utils/probeOrigin.ts`）であり、プローブ起因の障害からルーティング状態を変更する可能性がある**すべての**箇所で参照されます。

- `markAccountUnavailable`（`auth.ts`）— 記録のみ（`lastError`の生テキスト、
  `lastErrorType`、`errorCode`、`lastErrorAt`。`backoffLevel`は意図的に記録**しません**。
  これは選択時の自動減衰をトリガーし、記録を消去してしまうためです）
- `maybeAutoDisableBannedAccount` — 自動無効化なし
- `chatCore` — FORBIDDEN、ACCOUNT_DEACTIVATED、QUOTA_EXHAUSTED（記録のみで、
  終端状態の`credits_exhausted`にはしない）、GEO_BLOCKED（24時間の除外なし）、
  MODEL_NOT_FOUND（`lockModel`なし）、codex 429のアカウントローテーションによるフェイルオーバー
  （`markCodexScopeRateLimited`なし、永続化される`rate_limited_until`なし、
  セッションアフィニティのクリアなし）、`persistCodexQuotaState`（クォータ状態の書き込みなし、
  キャッシュの無効化なし）、`recordKeyHealthStatus`（キーヘルスローテーターは変更されない）
- OAuth更新 — executor baseでのプロアクティブ更新
  （`base.ts`の`execute()`。更新トークンのローテーションを消費しない）と、
  `chatCore`内のリアクティブな401/403パス（`expired`による無効化なし）の両方
- `chat.ts` — プロバイダーのサーキットブレーカーおよび5分間のクォータキャッシュ
  （`markAccountExhaustedFrom429`）はデグレードされない

記録されたエラーにより、フラグが付いたアカウントはトラフィックの処理を継続したままダッシュボードに表示されます。注意: 実際のパスでは`slice(0,100)`で切り詰められるのとは異なり、プローブの記録には**生の**（切り詰められていない）エラーテキストが保存されます。

全件テストをメンテナンスツールとして使用するオペレーターは、以下のいずれかを使用して従来の動作（プローブを実際の生成として扱う）に戻せます。

- `probeCanDisable`設定（`POST /api/settings`に
  `{"probeCanDisable": true}`を指定するか、`key_value` DBを直接編集）、または
- 機能フラグ**`PROBE_CAN_DISABLE=true`**（環境変数またはDBオーバーライド。設定より優先されます）。

フェイルセーフ: フラグまたは設定の検索で例外が発生した場合、分離は有効なまま維持されます。

## ソースファイル

| 関心事項                           | ファイル                                                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| シグナルテーブル + マッチング      | `open-sse/services/accountFallback.ts`                                                                        |
| 終端化 / 永続化                    | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| 自動無効化のスコープ               | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| インライン分類                     | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| 終端状態のリカバリー除外           | `src/lib/quota/connectionRecovery.ts`                                                                         |
| カスタムキーワードのランタイム読込 | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| 設定 UI                            | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
