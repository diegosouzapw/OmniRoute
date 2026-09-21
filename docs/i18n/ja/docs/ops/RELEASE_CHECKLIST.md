# Release Checklist (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **最終更新:** 2026-08-28 — v3.8.51
> 自動化に Claude Code スキルを活用する、効率化されたリリースフロー。
>
> **リリース間もキュー／ブランチをグリーンに保つ:** [RELEASE_GREEN.md](./RELEASE_GREEN.md) を参照
> （`/green-prs` ファミリー + `npm run check:release-green` + `/babysit` + nightly）。これを定期的に、特にこのチェックリストを実行する**前に**行うことで、リリース PR をグリーンな状態で開始できます。

## 要約

```bash
# 1. バージョンを更新し、CHANGELOG を生成（スキル）
/version-bump-cc patch    # または minor/major

# 2. ローカルで品質ゲートを実行
npm run check              # lint + テスト
npm run test:coverage      # 完全なカバレッジゲート（60/60/60/60）

# 3. ビルドとスモークテスト
npm run build
npm run test:e2e           # 任意だが推奨

# 4. リリースを生成（スキル）
/generate-release-cc

# 5. デプロイ（スキル）
/deploy-vps-both-cc        # または akamai-cc / local-cc

# 6. リリースエビデンスを取得（スキル）
/capture-release-evidences-cc
```

## npm Trusted Publishing（v3.8.51 以降のデフォルト）— リクエスト時はステージング、フォールバックとして直接公開

`npm-publish.yml` は、デフォルトで **npm Trusted Publishing (OIDC)** を通じて公開します。`stage-npm` ジョブ（github-hosted）は、その実行用に GitHub の id-token を有効期間の短い npm 認証情報と交換します。リポジトリのシークレットに長期間有効な npm トークンを保存する必要はなく、2FA プロンプトもなく、provenance が添付されます。
これは、2FA をスキップするトークンが廃止されつつある現在、npm が認めるバイパス手段です。WS1.3 の保証（漏洩したトークンだけでは公開できない。そもそもトークンが存在しない）を維持しながら、プロジェクトが v3.8.48 まで利用していた完全自動フローを復元します。

**初回のみのセットアップ（オーナー）:** npmjs.com → package `omniroute` → Settings → _Trusted Publisher_ → GitHub: owner `diegosouzapw`、repo `OmniRoute`、workflow `npm-publish.yml`（environment: none）。これが設定されるまでは、自動ステップは `ENEEDAUTH` で失敗します。`publish_mode=staged`（下記）または `direct` を指定して再ディスパッチしてください。

### ステージング公開（リクエスト時 — `publish_mode=staged`）

npm-publish ワークフローは直接公開しなくなりました。パックされた tarball を起動し（`check:pack-boot`）、その後 `npm stage publish` を実行します。完全に同一のバイト列がレジストリに保留され、オーナーが承認するまで**インストールできません**。人による 2FA ゲートは検証前ではなく、検証後に移動しました。

**ワークフローがグリーンになった後のオーナー向けフロー:**

1. `npm stage list omniroute` — stage id を確認します（ワークフローのサマリーにも出力されます）。
2. ステージングされたバイト列を検証します（推奨）: `npm stage download <id>` を実行し、ダウンロードした tarball を一時 prefix にインストールして起動します（`npm run check:pack-boot` は、同じ pack→install→boot の判定を CI で自動化します）。
3. `npm stage approve <id>` — 2FA プロンプトへの対応が公開操作そのものです。`npm stage reject <id>` は破棄します。
4. 公開後のセーフティネット: 公開後の検証処理（v3.8.49 計画の WS1.4）は、公開されたバージョンをクリーンなコンテナ内でパブリックレジストリからインストールし、起動します。

**緊急時のフォールバック:** `publish_mode=direct` を指定した `workflow_dispatch` により、従来の即時 `npm publish` を復元できます（ステージング自体が正常に動作しない場合にのみ使用し、理由を記録してください）。

**初回のみの強化設定（オーナー、npmjs.com）:** `omniroute` の Trusted Publisher を stage-only モードで設定し、長期間有効なトークンが漏洩しても、どこからも直接 `npm publish` できないようにします。CI が実行できるのはステージングのみで、公開できるのはオーナーの 2FA だけです。

**壊れたアーティファクトへの対応手順（変更なし）:** デフォルトの初動として `npm deprecate omniroute@<bad> "<reason> — use <fixed>"` を実行します（数分で実行可能、取り消し可能）。`npm unpublish` は 72 時間以内かつ依存元が存在しない場合にのみ使用し、最初の対応としては決して使用しないでください。Docker では、バージョンタグを決して書き換えないでください。ロールバックとは、`latest` を直前の正常な digest に付け替えることです。

**Docker Hub の `latest`（安定版 SemVer の公開ごとに必須）:** `docker-publish` ワークフローは **`X.Y.Z` と `:latest` の両方**をタグ付けする必要があります。`should-promote-latest.sh` により、そのバージョンが最上位の安定版 SemVer であると判定された場合、両方に**同一の digest**を使用します。ジョブ実行後は、Hub の `latest` の digest が新しい SemVer の digest と一致し、`last_updated` が更新されている必要があります。リリースノートで git にしか存在しない修正について説明しながら、`:latest` を古いビルドのままにしないでください。Compose のクイックスタートでは `:latest` を使用しますが、GitOps では引き続き `X.Y.Z` を固定して使用してください。[Docker リリースチャネル](../guides/DOCKER_GUIDE.md#release-channels)および #10317 を参照してください。

## ホットフィックス・ファストレーン（ラベル `hotfix`）

`hotfix` ラベルが付いた PR は、負荷の高い CI マトリクス（9 シャード E2E、カバレッジ・ラチェット、
quality-gate、quality-extended）をスキップし、高速でシグナル精度の高いゲートである build、
unit シャード、integration、vitest、lint/typecheck、docs-sync、`check:pack-artifact`、
および tarball の起動スモークテスト（`check:pack-boot`）を維持します。目標：所要時間を約 33 分ではなく 15 分以内にすること。

**適用ポリシー — 4 項目すべてが必須（Chromium/VS Code/Node の緊急レーンをモデル化）：**

1. **重大度**：本番環境が壊れていること — 公開済みアーティファクトが起動時にクラッシュする、
   セキュリティ修正である、またはリリースの全ユーザーが影響を受けていること。「重要」は「壊れている」ことを意味しません。
2. **権限**：`hotfix` ラベルを付けられるのはリポジトリ所有者のみです。ラベル自体が
   承認を意味します — キャンペーン PR で自己判断により適用してはいけません。
3. **証拠**：PR 本文に、直前の完全成功した負荷の高い実行（スキップされたジョブが再検証するスイート）へのリンクと、
   修正自体について、テストが失敗してから成功するようになったことを示す内容を記載します。
4. **スコープ**：cherry-pick のみ — 最小限の修正に限定し、リファクタリングや便乗変更を含めません。

スキップされたカバレッジ／ラチェットの対象領域は、release ブランチでの次回の完全実行
（継続的な release-green）によって再検証されます — このレーンがスキップするのは待ち時間であり、検証ではありません。
テストのみの差分（すべてのファイルが `tests/` 配下にあり、`tests/e2e/` 配下にはない場合）は、
ラベルなしで E2E マトリクスを自動的にスキップします。

## 詳細チェックリスト

### リリース前

- [ ] このリリースを対象とするすべての PR が `release/vX.Y.0` にマージされている
- [ ] このバージョンに関する未完了の Linear／issue 項目がすべてクローズされているか、次のマイルストーンに移されている
- [ ] `release/vX.Y.0` ブランチの CI が成功している
- [ ] コード内に `TODO(release)` マーカーがない：`grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker ベースイメージが最新である（現在は `node:24.15.0-trixie-slim`）

### バージョンと変更履歴

- [ ] `/version-bump-cc <patch|minor|major>` を実行する（Claude Code スキル）
  - `package.json`、`electron/package.json` のバージョンを更新する
  - 前回のタグ以降の git コミットから `CHANGELOG.md` を再生成する
  - README.md のバッジを更新する
- [ ] CHANGELOG.md を手動でレビューし、必要に応じてコミットメッセージを整理する
- [ ] `CHANGELOG.md` の最新 semver セクションが `package.json` のバージョンと一致していることを確認する
- [ ] 今後の作業用として `## [Unreleased]` を変更履歴の最初のセクションに維持する
- [ ] `docs/openapi.yaml` を更新する → `info.version` は `package.json` のバージョンと一致している必要がある

### コード品質

- [ ] `npm run lint` — エラー 0 件（警告は既存のもの）
- [ ] `npm run typecheck:core` — 問題なし
- [ ] `npm run typecheck:noimplicit:core` — 問題なし（厳格）
- [ ] `npm run check:cycles` — 循環依存がない
- [ ] `npm run check:any-budget:t11` — 予算内
- [ ] `npm run check:route-validation:t06` — 問題なし
- [ ] `npm run check:node-runtime` — サポート対象ランタイムの下限を満たしている（`src/shared/utils/nodeRuntimeSupport.ts` の `SUPPORTED_NODE_RANGE` に従い、`>=22.22.2 <23`、`>=24.0.0 <27`。`package.json` の `engines` と整合していること）

### テスト

- [ ] `npm run test:unit` — 成功
- [ ] `npm run test:vitest` — 成功（MCP サーバー、autoCombo、キャッシュ）
- [ ] `npm run test:coverage` — ゲート 60/60/60/60 を満たす（ステートメント／行／関数／分岐）
- [ ] `npm run test:integration` — 成功（変更が DB／ハンドラーに及ぶ場合）
- [ ] `npm run test:combo:matrix` — 成功（コンボ戦略マトリクス：公開されている 19 個すべてのルーティング戦略の選択判断を決定論的に実証する。コンボルーティング、戦略解決、またはフォールバックロジックを変更する場合に実行）
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **任意／手動**（ゲート付きの実アップストリーム・スモークテスト。VPS `root@192.168.0.15` から読み取り専用 DB スナップショットを取得する。実際のプロバイダーにアクセスし、クレジットを消費する。CI では実行されず、ゲートがなければ問題なくスキップされる）
- [ ] `npm run test:combo:live:vps` — **任意／手動**（Phase-3 VPS ライブスモーク：プレーンな Node ESM を使用し、稼働中の `.15` サーバーに対して 7 件の HTTP シナリオを実行する。`ssh root@192.168.0.15` が必要。`__live_test__*` コンボのみを作成／削除する。実際のプロバイダーにアクセスする。CI では実行されない）
- [ ] `npm run test:e2e` — 成功（UI の変更）
- [ ] `npm run test:protocols:e2e` — 成功（MCP/A2A の変更）
- [ ] `npm run test:ecosystem` — 成功

### フック（Husky で検証済み）

Husky フックは `.husky/` にあり、git 操作時に自動実行されます。

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** 高速で決定論的なゲート — `npm run check:any-budget:t11 && npm run check:tracked-artifacts`（2026-06-13 に有効化）。`test:unit` は意図的に除外されています（低速であり、CI の `test-unit` ジョブでカバーされるため）。
  - release ブランチを push する前に、`npm run test:unit` を手動で実行する。

フックが失敗した場合：根本的な問題を修正し、`--no-verify` で回避しないでください。

### Conventional Commits

リリース対象のすべてのコミットは、`type(scope): subject` 形式に従う必要があります。

**有効な type：** `feat`、`fix`、`refactor`、`docs`、`test`、`chore`、`perf`、`style`、`ci`

**有効な scope：** `db`、`sse`、`oauth`、`dashboard`、`api`、`cli`、`docker`、`ci`、`mcp`、`a2a`、`memory`、`skills`、`cloud-agent`、`guardrails`、`compression`、`auto-combo`、`resilience`、`providers`、`executors`、`translator`、`domain`、`authz`

破壊的変更：`BREAKING CHANGE:` フッターを追加するか、scope の後に `!` を付けます（例：`feat(api)!: drop /v0`）。

### ドキュメント

- [ ] `npm run check:docs-sync` が成功する（pre-commit により自動実行）
- [ ] `npm run check:docs-all` が成功する（包括チェック: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links）
- [ ] `npm run check:env-doc-sync` が終了コード 0 で終了する — コード ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` 間の環境変数の契約が維持されている
- [ ] `npm run check:doc-links` が終了コード 0 で終了する — 再構成後、内部 Markdown 参照にリンク切れがない
- [ ] `docs/architecture/ARCHITECTURE.md` について、ストレージ／ランタイムとの乖離をレビュー済み
- [ ] `docs/guides/TROUBLESHOOTING.md` について、環境変数および運用との乖離をレビュー済み
- [ ] `.env.example` を変更した場合: `docs/reference/ENVIRONMENT.md` を更新済み
- [ ] 新機能に UI がある場合: `docs/guides/USER_GUIDE.md` に記載済み
- [ ] 新機能に API がある場合: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` を更新済み
- [ ] 新機能がモジュールの場合: 専用の `docs/<MODULE>.md` が存在する
- [ ] 破壊的変更の場合: `docs/guides/TROUBLESHOOTING.md` に移行メモがある

### i18n

- [ ] `npm run i18n:check` が終了コード 0 で終了する — 翻訳状態（`.i18n-state.json`）がソースドキュメントと同期している（strict モードでは乖離したソースがないこと。直前のドキュメント修正については warn モードの勧告を許容できるが、タグ付け前には 0 にすること）
- [ ] `npm run i18n:check-ui-coverage` が終了コード 0 で終了する — すべての UI ロケールがカバレッジ下限 80% 以上
- [ ] `npm run i18n:sync-ui:dry` が全 42 ロケールで欠落キー 0 件を報告する
- [ ] 英語のソースドキュメントを変更した場合、タグ付け前に `npm run i18n:run` を実行する（`.env` に `OMNIROUTE_TRANSLATION_API_KEY` が必要）
- [ ] 軽微な場合、翻訳へのコントリビューションは次回リリースまで延期可能（CHANGELOG で追跡）

### データベースマイグレーション

- [ ] `src/lib/db/migrations/` に新しいファイルがある場合:
  - [ ] 各マイグレーションが冪等である（`CREATE TABLE IF NOT EXISTS` など）
  - [ ] マイグレーションがトランザクションでラップされている
  - [ ] 正しく採番されている（連番に欠番がない）
- [ ] 新規インストールでテストする: `~/.omniroute/omniroute.db` を削除し、`npm run dev` を実行する
- [ ] 既存インストールでテストする: DB をバックアップし、マイグレーションを実行してスキーマを検証する
- [ ] マイグレーションでテーブルを書き換える場合、WAL ファイル（`-wal`、`-shm`）が正しく処理される

### プロバイダーカタログ（Zod 検証済み）

- [ ] `src/shared/constants/providers.ts` の Zod スキーマがロード時に有効である
  - [ ] すべてのプロバイダーに必須フィールド（`id`、`label`、`kind` など）がある
  - [ ] 新しい無料プロバイダーに `freeNote` が指定されている
  - [ ] OAuth プロバイダーの `oauthConfig` が `src/lib/oauth/constants/oauth.ts` に登録されている
- [ ] 新しいプロバイダーを追加した場合: 対応する executor が `open-sse/executors/` にある
- [ ] OpenAI 形式でない場合: translator が `open-sse/translator/` にある
- [ ] モデルが `open-sse/config/providerRegistry.ts` に登録されている
- [ ] `tests/unit/` のユニットテストでプロバイダーの分類とルーティングがカバーされている

### デスクトップ（Electron）

`electron/` を変更した場合:

- [ ] `npm run electron:smoke:packaged` が成功する
- [ ] `:win`、`:mac`、`:linux` のうち少なくとも 1 つでビルドをテスト済み
- [ ] コード署名を行う場合、証明書が期限切れでない
- [ ] `electron/package.json` のバージョンがルートの `package.json` と一致する
- [ ] `stable` にリリースする場合、自動更新チャネルのポインターを更新済み

### ビルドレイアウト

このリポジトリでは 3 つの異なる出力ディレクトリを使用します。絶対に混同しないでください:

| ディレクトリ | 用途                                                      | 追跡対象?           |
| ------------ | --------------------------------------------------------- | ------------------- |
| `src/`       | アプリケーションソース（TypeScript / TSX）                | はい                |
| `.build/`    | ビルド中間生成物 — `next build` の出力（`distDir`）       | いいえ（gitignore） |
| `dist/`      | 配布可能な npm バンドル — `assembleStandalone` により作成 | いいえ（gitignore） |

> **運用担当者向けメモ:** リモート VPS のイメージディレクトリは引き続き `/usr/lib/node_modules/omniroute/app/` です。
> 移動したのは **リポジトリ内の** ビルド出力のみです（`app/` → `dist/`）。デプロイスキルは
> `dist/` の内容をリモートの `app/` ディレクトリへ rsync するため、VPS のパス変更は不要です。

**単一ビルドフロー:**

```
npm run build:release
  └─ rm -rf .build dist          （クリーンアップ）
  └─ next build → .build/next/   （中間生成物）
  └─ assembleStandalone          （standalone + static + public + natives を dist/ へコピー）
  └─ writes dist/BUILD_SHA       （HEAD センチネル）
```

デプロイ時に `npm run build` を実行した後、別途 `npm run build:cli` を実行しては**なりません**。
クリーンリビルドとセンチネル生成を 1 つのコマンドで行う `npm run build:release` を使用してください。

### 成果物の検証

- [ ] `npm run build:release` が成功し、`dist/BUILD_SHA` == `git rev-parse --short HEAD` である
- [ ] `npm run check:pack-artifact` がクリーンに成功する — `app.__qa_backup`、`scripts/scratch`、`package-lock.json`、その他のローカル残留物がない
- [ ] ビルド後に `dist/server.js` が存在する

### タグ付けとリリース

- [ ] `/generate-release-cc`（Claude Code スキル）を実行する:
  - タグ `vX.Y.Z` を作成する
  - タグとブランチを push する
  - changelog の本文を使用して GitHub Release を作成する
  - Electron インストーラーを添付する（ビルドした場合）
- [ ] または手動で実行する:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### デプロイ

デプロイスキルは軽量な rsync フローを使用します。`npm pack` や `npm i -g` は使用しません:

- [ ] 対象に合ったデプロイスキルを使用する:
  - `/deploy-vps-local-cc` — ローカル VPS（192.168.0.15）
  - `/deploy-vps-akamai-cc` — Akamai VPS（69.164.221.35）
  - `/deploy-vps-both-cc` — 両方
- [ ] デプロイ前に `dist/BUILD_SHA` == `git rev-parse --short HEAD` であることを確認する
- [ ] ビルドは `node_modules` が実体である場所（メインのチェックアウト、または `npm ci` を実行した worktree）で実行すること。シンボリックリンクされた worktree では実行しないこと
- [ ] デプロイされたインスタンスをスモークテストする:
  - `/dashboard/health` を開く → バージョン文字列がリリースと一致することを確認する
  - 既知のプロバイダーに対して `/v1/chat/completions` リクエストを実行する
  - `/api/monitoring/health` が `CLOSED` 状態のサーキットブレーカーを返すことを確認する
  - MCP トランスポートが応答することを確認する（`/mcp` HTTP、`/mcp-sse` SSE）

### リリース後

- [ ] `/capture-release-evidences-cc`（Claude Code スキル）を実行
  - 新機能の WebP スクリーンショット／録画を取得
  - リリースノート／ブログ記事に添付
- [ ] GitHub Discussions／Discord をリリース告知で更新
- [ ] 次のバージョン用のマイルストーンを作成
- [ ] 重要な場合：ディスカッションをピン留めするか、アプリ内バナー用に `news.json` に投稿

### Radar 一般公開ゲート

Radar の告知は、意図的に `active: false` の状態でコミットされています。有効化は、以下の全項目についてエビデンスが揃った後に行う個別の変更です：

- [ ] 積み上げられたすべての Radar PR がマージされ、リリース先端の CI がグリーンである
- [ ] `RADAR_ENABLED` をデフォルトで無効のままにし、OSS Radar のルートをデプロイしてスモークテストする
- [ ] 指定された Radar ホスト上で `GET /planos`、`/termos`、`/privacidade`、`/reembolso` をスモークテストする
- [ ] 運用担当者の身元／連絡先／住所、およびオーナー承認済みの法務レビューをプライベートサービスに記録する
- [ ] テストモードのみで Stripe Checkout と署名付き Webhook を実行検証する
- [ ] 承認済みの送信者／ドメインを使用して、暗号化されたトランザクションメールを 1 件配信し、動作を検証する
- [ ] バックアップからの復元と、監督下で予算上限を設定した調査実行を 1 回行い、正常性を実証する
- [ ] 寄付エビデンスを受け付ける前に、BRL/PIX のレビューポリシーを承認する
- [ ] 先行するゲートをすべて通過した後にのみ公開 Checkout を有効化し、その後、新しい `news.json` ID を有効化する
- [ ] ホームバナーでローカライズ済みの文言が使用され、古い ID を閉じた後でも新しい ID が再表示されることを確認する

## Embedded Services スモークテスト (v3.8.4+)

組み込みサービスの変更を含むリリースを公開する前に、以下を確認してください。

### 新規 DB での起動（マイグレーションの競合を検出 — v3.8.4 ホットフィックス後に追加）

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — 起動するまで 10 秒待機する
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` が `"9router"` を返す（404 でも 500 でもない）。マイグレーション `071_services.sql` が適用され、行がシードされたことを確認する。
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` が 3 行を返す。
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` が 2 行を返す（`070_webhooks_kind_metadata.sql` が適用されたことを検証する）。
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` が成功する — 将来の競合を防止する。

### 9Router

- [ ] `POST /api/services/9router/install` が 2 分以内に `installedVersion` を含む 200 を返す
- [ ] `POST /api/services/9router/start` が 30 秒以内に 200 と `state: "running"` を返す
- [ ] `GET /api/services/9router/status` が `health: "healthy"` を報告する
- [ ] `"model": "9router/auto/..."` を指定した `POST /v1/chat/completions` が 200 を返す（9Router を介したエンドツーエンドのルーティング）
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` がプロキシ内に 9Router のネイティブ UI を表示する（`127.0.0.1:port` を直接指定する iframe ではない）
- [ ] `POST /api/services/9router/rotate-key` が `{ keyRotated: true }` を返し、サービスが正常に再起動する
- [ ] `POST /api/services/9router/stop` が 200 と `state: "stopped"` を返す
- [ ] `GET /api/services/9router/logs?tail=50` が、最近の行を含む `snapshot` イベントの SSE ストリームを返す
- [ ] PATH に `npm` がない環境でのインストールが、分かりやすい（スタックトレースではない）エラーメッセージとともに 500 を返す

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` が 2 分以内に 200 を返す
- [ ] `POST /api/services/cliproxy/start` が 30 秒以内に 200 と `state: "running"` を返す
- [ ] `GET /api/services/cliproxy/status` が `health: "healthy"` を報告する
- [ ] `POST /api/services/cliproxy/stop` が 200 と `state: "stopped"` を返す
- [ ] `GET /api/services/cliproxy/logs?tail=50` が SSE ストリームを返す

### セキュリティのリグレッション

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` が `403 LOCAL_ONLY` を返す
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` が `403 LOCAL_ONLY` を返す
- [ ] `/api/services/*` からのエラーレスポンスに `err.stack` や絶対ファイルパスが含まれていない

## v3.8.0+ の確認項目

v3.8.x リリースを公開する前に、以下の追加項目を確認してください。

- [ ] `omniroute --tray` が macOS で起動する（systray2 が `~/.omniroute/runtime/` にインストールされる）
- [ ] `omniroute --tray` が Linux で起動する（DISPLAY が必要。未設定の場合は適切なエラーを返す）
- [ ] `omniroute --tray` が Windows で起動する（PowerShell NotifyIcon、追加のバイナリは不要）
- [ ] `omniroute config tray enable` が自動起動エントリを作成し、disable で削除される
- [ ] `npm install -g omniroute@<this-version>` の postinstall が致命的な終了なしで実行される
- [ ] 更新処理でオプショナル依存関係が維持される：`omniroute update --apply` と自動アップデーターが
      `npm install -g … --include=optional` を実行し、`optionalDependencies`（better-sqlite3、
      keytar、tls-client、および llmlingua SLM スタック：`@atjsh/llmlingua-2@2.0.5`、
      `js-tiktoken`）が更新後も維持される。ultra `modelPath` SLM ティアでは tinybert モデルも必要であり、
      初回使用時に `${DATA_DIR}/models/llmlingua` へ自動的にダウンロードされる。続いて postinstall
      （`scripts/build/colocateOptionals.mjs`）が SLM のオプショナル依存関係一式を
      `dist/node_modules` に同居させ、ワーカーが単一の `@huggingface/transformers` ^4.2.0
      インスタンスを解決するようにする — スタンドアロントトレースにバンドルされるのは transformers のみで、
      動的にインポートされるオプショナル依存関係は含まれないため、この処理がないとワーカーはルートの transformers に対して
      llmlingua-2 をロードし、SLM ティアが通知なくフェイルオープンする。
- [ ] `.env` がなくても `omniroute status` が動作する（CLI トークンのパス、ループバックのみ）
- [ ] `curl http://localhost:20128/api/shutdown` が 401 を返す（常に保護されるルート）
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` が 401 を返す（ループバックガード）
- [ ] 初回実行時に SQLite ランタイムが `bundled` として解決される（バンドルされたバイナリがプラットフォームで有効）
- [ ] `node_modules/better-sqlite3` が削除されると、SQLite ランタイムが `runtime` にフォールバックする
- [ ] Smart MCP フィルターが実際の `playwright-mcp browser_snapshot` 出力を圧縮する（50% 以上削減）
- [ ] 10 個すべての `skills/omniroute*/SKILL.md` ファイルを raw GitHub URL 経由で公開取得できる
- [ ] 新規セットアップ時に、オンボーディングウィザードへ「仕組み」のティア紹介ステップが表示される
- [ ] ホームダッシュボードのティアカバレッジウィジェットに、設定済み数とアクティブ数が表示される

---

## ロールバック

リリースに重大な問題がある場合：

1. `gh release edit vX.Y.Z --prerelease`（最新リリースではないものとしてマーク）
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z`（まだユーザーに利用されていない場合のみ）
3. または：`release/vX.Y.0` でホットフィックス → パッチリリース `vX.Y.(Z+1)`
4. GitHub Discussions と Discord ですぐに周知

## 厳守事項

- `main` に直接コミットしない
- `main` または `release/*` ブランチに対して `git push --force` を使用しない
- Husky フックをスキップしない（`--no-verify`）
- シークレット、認証情報、または `.env` ファイルをコミットしない
- カバレッジは ≥60/60/60/60（ステートメント／行／関数／ブランチ）を維持する
- `src/`、`open-sse/`、`electron/`、または `bin/` の本番コードを変更する場合は、必ずテストを追加または更新する

## 自動同期チェック

PR を作成する前に、ドキュメント同期ガードをローカルで実行してください：

```bash
npm run check:docs-sync
```

CI でも `.github/workflows/ci.yml`（lint ジョブ）でこのチェックが実行されます。
