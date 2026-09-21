# Reasoning Routing (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

推論ルーティングルールは、既存のモデルおよびコンボルーティングを拡張します。アクティブなルールが一致しない場合、既存の thinking、サフィックス、接続デフォルト、およびプロバイダー変換の動作は変更されません。

## 管理

ルール管理は **Settings → Global Routing** で利用できます。API キーエディターには、選択したキーでフィルタリングされた同じ管理 UI が表示されます。

管理 API は、以下のルートで公開されています。

- `/api/settings/reasoning-routing-rules` の `GET` および `POST`
- `/api/settings/reasoning-routing-rules/[id]` の `GET`、`PATCH`、および `DELETE`
- `/api/settings/reasoning-routing-rules/simulate` の `POST`

すべてのルートで `requireManagementAuth` を使用します。入力は `src/shared/validation/schemas/reasoningRouting.ts` のスキーマで検証されます。シミュレーターがアップストリーム呼び出しを行うことはありません。

## ルール解決

早期評価では、ルールが厳密に 1 つ選択されます。スコープは次の順序で確認されます。

1. `apiKey`
2. `combo`
3. `model`
4. `global`

各スコープ内では、まず `priority` が高いものが優先され、次に glob パターンよりもモデルの完全一致が優先され、その後は `createdAt` と `id` の安定した順序に従います。`requestTags` は `metadata.tags` からのみ読み取られ、`any` または `all` によるマッチングをサポートします。

`connection` ルールは、早期ルールが選択されず、具体的なプロバイダー接続がすでに選択されている場合にのみ評価されます。このルールで変更できるのは effort と budget のみです。

## Effort と Budget

`sourceEffort` は `any`、`missing`、`none`、`low`、`medium`、`high`、`xhigh`、`max`、および `ultra` を受け付けます。`missing` は、リクエストに個別の effort、thinking トグル、thinking budget のいずれも含まれていないことを意味します。したがって、budget のみのシグナルは `any` によってのみマッチします。

`effortMode` には 3 つのバリエーションがあります。

- `inherit` はクライアントの effort を維持しつつ、モデルまたはコンボの変更を許可します。
- `default` は、明示的な推論シグナルが存在しない場合にのみ `targetEffort` を設定します。
- `force` は、個別の effort を `targetEffort` に置き換えます。

これとは独立して、`budgetAction` には `preserve`、`remove`、または `set` を指定できます。`none` を指定した `force` は、認識されているすべての effort および budget フィールドを削除します。`none` と `set` の組み合わせは無効です。

既知の非互換モデルを対象とするリクエストは、アップストリーム呼び出しの前に拒否されます。コンボターゲットの場合、互換性のないエントリは削除されます。エントリが 1 つも残らない場合、リクエストはステータス `400` を返します。不明なケイパビリティデータがある場合は警告が生成され、ルールはアクティブなまま維持されます。

## セキュリティとトランスポート

ソースおよびターゲットのモデル、またはソースおよびターゲットのコンボには、引き続き既存の API キーポリシーが適用されます。推論ルールによって、モデル、コンボ、またはクォータの権限が拡張されることはありません。

エンジンは Chat Completions、Responses、Anthropic Messages、および内部の Codex WebSocket パスに統合されています。WebSocket パスが受け付けるのは Codex ターゲットモデルのみです。コンボターゲットはこのパスでは実行できません。ルールの決定内容は、シークレットを含めずに既存のルートトレースへ保存されます。

## 永続化

マイグレーション `src/lib/db/migrations/126_reasoning_routing_rules.sql` は、`reasoning_routing_rules` テーブルを作成します。ルールは、保存済みの API キー、コンボ、およびプロバイダー接続を参照します。削除時には関連するルールもクリーンアップされます。`src/lib/db/reasoningRoutingRules.ts` のデータベースアクセスレイヤーは、リクエストパス向けの無効化可能なキャッシュを管理します。

ルールは、SQLite バックアップ、データベース全体のエクスポート、および config-sync バンドルに含まれます。`reconcileReasoningRulesForSync` は、参照先が見つからないインポート済みルールを無効化し、それらの競合を報告します。
