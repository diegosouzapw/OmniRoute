# Release Checklist (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **最終更新:** 2026-08-28 — v3.8.51
> Claude Code スキルを活用して自動化する、合理化されたリリースフロー。
>
> **リリース間もキュー/ブランチをグリーンに保つ:** [RELEASE_GREEN.md](./RELEASE_GREEN.md) を参照
> （`/green-prs` ファミリー + `npm run check:release-green` + `/babysit` + nightly）。これを定期的に、特に
> このチェックリストを実行する**前に**行うことで、リリース PR をグリーンな状態で開始できます。

## TL;DR

```bash
# 1. バージョンを更新して CHANGELOG を生成（スキル）
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

## npm Trusted Publishing（v3.8.51 以降のデフォルト）— 要求に応じてステージング、フォールバックとして直接公開

`npm-publish.yml` は、デフォルトで **npm Trusted Publishing (OIDC)** を通じて公開します。
`stage-npm` ジョブ（github-hosted）は、GitHub の id-token をその実行専用の短期間有効な npm
認証情報と交換します。リポジトリシークレットに長期間有効な npm トークンを保存する必要がなく、2FA プロンプトもなく、provenance が付与されます。
これは、2FA をスキップするトークンが廃止される現在、npm が認めるバイパス方法です。
これにより、WS1.3 の保証（漏洩したトークンだけでは公開できない。そもそもトークンが存在しない）を維持しつつ、
v3.8.48 までプロジェクトで使用していた完全自動フローを復元します。

**初回のみのセットアップ（オーナー）:** npmjs.com → package `omniroute` → Settings → _Trusted
Publisher_ → GitHub: owner `diegosouzapw`、repo `OmniRoute`、workflow `npm-publish.yml`
（environment: none）。これが設定されるまでは、自動ステップが `ENEEDAUTH` で失敗します。
`publish_mode=staged`（下記）または `direct` を指定して再ディスパッチしてください。

### ステージング公開（要求時 — `publish_mode=staged`）

npm-publish ワークフローは直接公開を行わなくなりました。パック済み tarball を起動
（`check:pack-boot`）した後、`npm stage publish` を実行します。まったく同じバイト列が
レジストリに保管され、オーナーが承認するまで**インストールできません**。人間による 2FA ゲートは、
検証前ではなく検証後に移動しました。

**ワークフローがグリーンになった後のオーナー向け手順:**

1. `npm stage list omniroute` — stage id を見つけます（ワークフローのサマリーにも表示されます）。
2. ステージングされたバイト列を検証します（推奨）: `npm stage download <id>` を実行し、ダウンロードした
   tarball を一時 prefix にインストールして起動します（CI では `npm run check:pack-boot` が
   同じ pack→install→boot の判定を自動化します）。
3. `npm stage approve <id>` — 2FA プロンプトが公開そのものです。`npm stage reject <id>` は破棄します。
4. 公開後のセーフティネット: 公開後ベリファイア（v3.8.49 計画の WS1.4）が、クリーンなコンテナ内で
   公開バージョンをパブリックレジストリからインストールして起動します。

**緊急時のフォールバック:** `publish_mode=direct` を指定した `workflow_dispatch` により、
従来の即時 `npm publish` を復元できます（ステージング自体が正常に動作しない場合にのみ使用し、理由を記録してください）。

**初回のみのハードニング（オーナー、npmjs.com）:** `omniroute` の Trusted Publisher を
stage-only モードに設定し、漏洩した長期間有効なトークンを使って任意の場所から直接 `npm publish`
できないようにしてください。CI はステージングのみ可能で、リリースできるのはオーナーの 2FA のみです。

**破損アーティファクトへの対処手順（変更なし）:** デフォルトの初動として
`npm deprecate omniroute@<bad> "<reason> — use <fixed>"` を使用します（数分で実行でき、元に戻せます）。
`npm unpublish` は 72 時間以内かつ依存パッケージがない場合にのみ使用し、決して最初の対応にはしないでください。
Docker: バージョンタグを上書きしないでください。ロールバックとは、`latest` を直前の正常な digest に付け替えることです。

**Docker Hub の `latest`（安定版 SemVer を公開するたびに必須）:**
`docker-publish` ワークフローは **`X.Y.Z` と**、`should-promote-latest.sh` が
これを最新の安定版 SemVer と判定した場合は `:latest` の**両方**に、
**同じ digest** をタグ付けする必要があります。ジョブ完了後、Hub の `latest` digest が新しい
SemVer digest と一致し、`last_updated` が更新されていることを確認してください。リリースノートで
git 上にしか存在しない修正について説明しながら、`:latest` を古いビルドのままにしないでください。
Compose のクイックスタートでは `:latest` を使用しますが、GitOps では引き続き `X.Y.Z` に固定してください。
[Docker のリリースチャネル](../guides/DOCKER_GUIDE.md#release-channels)および #10317 を参照してください。

## ホットフィックス・ファストレーン（ラベル `hotfix`）

`hotfix` ラベルが付いた PR は、負荷の高い CI マトリクス（9 シャード E2E、カバレッジ・ラチェット、
quality-gate、quality-extended）をスキップし、高速で検出力の高いゲート（ビルド、
ユニットテストのシャード、統合テスト、vitest、lint/typecheck、docs-sync、`check:pack-artifact`、
および tarball の起動スモークテスト（`check:pack-boot`））を維持します。目標：所要時間を約 33 分から 15 分以内に短縮。

**適用ポリシー — 4 項目すべてが必須（Chromium/VS Code/Node の緊急レーンをモデル化）：**

1. **重大度**：本番環境が壊れていること — 公開済みアーティファクトが起動時にクラッシュする /
   セキュリティ修正である / リリースの全ユーザーが影響を受ける。「重要」は「壊れている」ではありません。
2. **権限**：`hotfix` ラベルを付与できるのはリポジトリ所有者のみです。このラベル自体が
   承認を意味します — キャンペーン PR で自己判断により使用してはいけません。
3. **証拠**：PR 本文に、直前の完全成功した負荷の高い実行（スキップされるジョブが再検証する
   スイート）と、修正自体について失敗後に成功するようになったテストへのリンクを記載します。
4. **スコープ**：cherry-pick のみに限定 — 最小限の修正とし、リファクタリングや便乗変更を含めません。

スキップされたカバレッジ/ラチェットの対象は、リリースブランチで次回実行される
完全なテスト（継続的なリリース成功状態）によって再検証されます — このレーンがスキップするのは待機であり、検証ではありません。
テストのみの差分（すべてのファイルが `tests/` 配下にあり、`tests/e2e/` 配下にはない場合）は、
ラベルなしで E2E マトリクスを自動的にスキップします。

## 詳細チェックリスト

### リリース前

- [ ] このリリースを対象とするすべての PR が `release/vX.Y.0` にマージされている
- [ ] このバージョンに関する未完了の Linear/issue 項目がすべてクローズされているか、次のマイルストーンに移されている
- [ ] `release/vX.Y.0` ブランチの CI が成功している
- [ ] コード内に `TODO(release)` マーカーがない：`grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker ベースイメージが最新である（現在は `node:24.15.0-trixie-slim`）

### バージョンと変更履歴

- [ ] `/version-bump-cc <patch|minor|major>` を実行する（Claude Code スキル）
  - `package.json`、`electron/package.json` のバージョンを更新する
  - 最後のタグ以降の git コミットから `CHANGELOG.md` を再生成する
  - README.md のバッジを更新する
- [ ] CHANGELOG.md を手動で確認し、必要に応じてコミットメッセージを整理する
- [ ] `CHANGELOG.md` の最新 semver セクションが `package.json` のバージョンと一致していることを確認する
- [ ] 今後の作業向けに `## [Unreleased]` を変更履歴の最初のセクションとして維持する
- [ ] `docs/openapi.yaml` を更新する → `info.version` は `package.json` のバージョンと一致している必要がある

### コード品質

- [ ] `npm run lint` — エラー 0 件（警告は既存のもの）
- [ ] `npm run typecheck:core` — 問題なし
- [ ] `npm run typecheck:noimplicit:core` — 問題なし（厳格）
- [ ] `npm run check:cycles` — 循環依存なし
- [ ] `npm run check:any-budget:t11` — 予算内
- [ ] `npm run check:route-validation:t06` — 問題なし
- [ ] `npm run check:node-runtime` — サポート対象ランタイムの下限を満たしている（`src/shared/utils/nodeRuntimeSupport.ts` の `SUPPORTED_NODE_RANGE` に基づき、`>=22.22.2 <23`、`>=24.0.0 <27`。`package.json` の `engines` と整合）

### テスト

- [ ] `npm run test:unit` — 成功
- [ ] `npm run test:vitest` — 成功（MCP サーバー、autoCombo、キャッシュ）
- [ ] `npm run test:coverage` — ゲート 60/60/60/60 を満たす（ステートメント/行/関数/分岐）
- [ ] `npm run test:integration` — 成功（変更が DB / ハンドラーに関係する場合）
- [ ] `npm run test:combo:matrix` — 成功（コンボ戦略マトリクス：公開されている 19 個すべてのルーティング戦略について、選択結果を決定論的に検証する。コンボルーティング、戦略解決、またはフォールバックロジックを変更する場合に実行）
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **任意/手動**（ゲート付きの実上流スモークテスト。VPS `root@192.168.0.15` から読み取り専用 DB スナップショットを取得する。実際のプロバイダーにアクセスし、クレジットを消費する。CI では実行されず、ゲートがなければ正常にスキップされる）
- [ ] `npm run test:combo:live:vps` — **任意/手動**（フェーズ 3 VPS ライブスモークテスト：プレーンな Node ESM を介して稼働中の `.15` サーバーに対する 7 つの HTTP シナリオを実行する。`ssh root@192.168.0.15` が必要。`__live_test__*` コンボのみを作成/削除する。実際のプロバイダーにアクセスする。CI では実行されない）
- [ ] `npm run test:e2e` — 成功（UI の変更）
- [ ] `npm run test:protocols:e2e` — 成功（MCP/A2A の変更）
- [ ] `npm run test:ecosystem` — 成功

### フック（Husky により検証）

Husky フックは `.husky/` にあり、git 操作時に自動実行されます。

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** 高速で決定論的なゲート — `npm run check:any-budget:t11 && npm run check:tracked-artifacts`（2026-06-13 に有効化）。`test:unit` は意図的に除外されています（低速であり、CI の `test-unit` ジョブでカバーされるため）。
  - リリースブランチを push する前に `npm run test:unit` を手動で実行する。

フックが失敗した場合：根本的な問題を修正し、`--no-verify` で回避しないでください。

### Conventional Commits

リリース対象のすべてのコミットは `type(scope): subject` 形式に従う必要があります。

**有効な type：** `feat`、`fix`、`refactor`、`docs`、`test`、`chore`、`perf`、`style`、`ci`

**有効な scope：** `db`、`sse`、`oauth`、`dashboard`、`api`、`cli`、`docker`、`ci`、`mcp`、`a2a`、`memory`、`skills`、`cloud-agent`、`guardrails`、`compression`、`auto-combo`、`resilience`、`providers`、`executors`、`translator`、`domain`、`authz`

破壊的変更：`BREAKING CHANGE:` フッター、または scope の後に `!` を追加します（例：`feat(api)!: drop /v0`）。

### ドキュメント

- [ ] `npm run check:docs-sync` が成功する（pre-commit により自動実行）
- [ ] `npm run check:docs-all` が成功する（包括チェック: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links）
- [ ] `npm run check:env-doc-sync` が終了コード 0 で終了する — コード ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` 間の環境変数契約が維持されている
- [ ] `npm run check:doc-links` が終了コード 0 で終了する — 再構成後に壊れた内部 Markdown 参照がない
- [ ] `docs/architecture/ARCHITECTURE.md` について、ストレージ／ランタイムとの不整合がないかレビュー済み
- [ ] `docs/guides/TROUBLESHOOTING.md` について、環境変数および運用との不整合がないかレビュー済み
- [ ] `.env.example` を変更した場合: `docs/reference/ENVIRONMENT.md` を更新済み
- [ ] 新機能に UI がある場合: `docs/guides/USER_GUIDE.md` に記載済み
- [ ] 新機能に API がある場合: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` を更新済み
- [ ] 新機能がモジュールの場合: 専用の `docs/<MODULE>.md` が存在する
- [ ] 破壊的変更の場合: `docs/guides/TROUBLESHOOTING.md` に移行に関する注記がある

### i18n

- [ ] `npm run i18n:check` が終了コード 0 で終了する — 翻訳状態（`.i18n-state.json`）がソースドキュメントと同期している（strict モードでは差異のあるソースがないこと。直前のドキュメント微修正については warn モードの警告を許容できるが、タグ付け前には 0 にすること）
- [ ] `npm run i18n:check-ui-coverage` が終了コード 0 で終了する — すべての UI ロケールがカバレッジ下限の 80% 以上である
- [ ] `npm run i18n:sync-ui:dry` が全 42 ロケールについて不足キー 0 件を報告する
- [ ] 英語のソースドキュメントを変更した場合、タグ付け前に `npm run i18n:run` を実行する（`.env` に `OMNIROUTE_TRANSLATION_API_KEY` が必要）
- [ ] 軽微な場合、翻訳への貢献は次回リリースまで延期可能（CHANGELOG で追跡する）

### データベースマイグレーション

- [ ] `src/lib/db/migrations/` に新しいファイルがある場合:
  - [ ] 各マイグレーションが冪等である（`CREATE TABLE IF NOT EXISTS` など）
  - [ ] マイグレーションがトランザクションでラップされている
  - [ ] 正しく採番されている（シーケンスに欠番がない）
- [ ] 新規インストールでテストする: `~/.omniroute/omniroute.db` を削除して `npm run dev` を実行
- [ ] 既存インストールでテストする: DB をバックアップし、マイグレーションを実行してスキーマを検証
- [ ] マイグレーションでテーブルを書き換える場合、WAL ファイル（`-wal`、`-shm`）が正しく処理される

### プロバイダーカタログ（Zod で検証）

- [ ] `src/shared/constants/providers.ts` の Zod スキーマが読み込み時に有効である
  - [ ] すべてのプロバイダーに必須フィールド（`id`、`label`、`kind` など）がある
  - [ ] 新しい無料プロバイダーに `freeNote` が指定されている
  - [ ] OAuth プロバイダーの `oauthConfig` が `src/lib/oauth/constants/oauth.ts` に登録されている
- [ ] 新しいプロバイダーを追加した場合: 対応する executor が `open-sse/executors/` にある
- [ ] OpenAI 形式でない場合: translator が `open-sse/translator/` にある
- [ ] モデルが `open-sse/config/providerRegistry.ts` に登録されている
- [ ] `tests/unit/` のユニットテストがプロバイダーの分類とルーティングを網羅している

### デスクトップ（Electron）

`electron/` を変更した場合:

- [ ] `npm run electron:smoke:packaged` が成功する
- [ ] `:win`、`:mac`、`:linux` のうち少なくとも 1 つのビルドをテスト済み
- [ ] コード署名を行う場合、署名証明書の有効期限が切れていない
- [ ] `electron/package.json` のバージョンがルートの `package.json` と一致している
- [ ] `stable` にリリースする場合、自動更新チャンネルのポインターを更新済み

### ビルドレイアウト

このリポジトリでは 3 つの異なる出力ディレクトリを使用します。これらを混同しないでください:

| ディレクトリ | 用途                                                      | 追跡対象?           |
| ------------ | --------------------------------------------------------- | ------------------- |
| `src/`       | アプリケーションソース（TypeScript / TSX）                | はい                |
| `.build/`    | ビルド中間生成物 — `next build` の出力（`distDir`）       | いいえ（gitignore） |
| `dist/`      | 配布可能な npm バンドル — `assembleStandalone` により構成 | いいえ（gitignore） |

> **運用担当者向け注記:** リモート VPS のイメージディレクトリは引き続き `/usr/lib/node_modules/omniroute/app/` です。
> 変更されたのは**リポジトリ内**のビルド出力のみです（`app/` → `dist/`）。デプロイスキルは
> `dist/` の内容をリモートの `app/` ディレクトリへ rsync するため、VPS のパス変更は不要です。

**単一ビルドフロー:**

```
npm run build:release
  └─ rm -rf .build dist          （クリーンアップ）
  └─ next build → .build/next/   （中間生成物）
  └─ assembleStandalone          （standalone + static + public + natives を dist/ へコピー）
  └─ dist/BUILD_SHA を書き込む    （HEAD センチネル）
```

デプロイ時に `npm run build` を実行した後、別途 `npm run build:cli` を実行しないでください。
クリーンな再ビルドとセンチネル生成を 1 コマンドで行う `npm run build:release` を使用してください。

### アーティファクトの検証

- [ ] `npm run build:release` が成功し、`dist/BUILD_SHA` == `git rev-parse --short HEAD` である
- [ ] `npm run check:pack-artifact` がクリーンである — `app.__qa_backup`、`scripts/scratch`、`package-lock.json`、その他のローカル残留物がない
- [ ] ビルド後に `dist/server.js` が存在する
- [ ] 任意のローカルパッケージ済みランタイムスモークテスト: `npm run dev:candidate -- build` の後に `npm run dev:candidate -- validate` を実行すると、隔離された `DATA_DIR` 上でパッケージ済み tarball が起動し、`/api/health` + `/v1/models` がチェックされる（[Contribution Golden Path](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) を参照）

### タグ付けとリリース

- [ ] `/generate-release-cc`（Claude Code スキル）を実行する:
  - タグ `vX.Y.Z` を作成する
  - タグとブランチをプッシュする
  - changelog 本文を含む GitHub Release を作成する
  - Electron インストーラーを添付する（ビルドした場合）
- [ ] または手動で実行する:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### デプロイ

デプロイスキルでは軽量な rsync フローを使用します。`npm pack` や `npm i -g` は使用しません:

- [ ] 対象に一致するデプロイスキルを使用する：
  - `/deploy-vps-local-cc` — ローカル VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — 両方
- [ ] デプロイ前に、`dist/BUILD_SHA` == `git rev-parse --short HEAD` であることを確認する
- [ ] ビルドは、`node_modules` が実体として存在する場所（メインのチェックアウト、または `npm ci` を実行済みの worktree。シンボリックリンクされた worktree は不可）で実行する必要がある
- [ ] デプロイ済みインスタンスのスモークテストを実施する：
  - `/dashboard/health` を開く → バージョン文字列がリリースと一致することを確認する
  - 既知のプロバイダーに対して `/v1/chat/completions` リクエストを実行する
  - `/api/monitoring/health` が `CLOSED` のサーキットブレーカーを返すことを確認する
  - MCP トランスポートが応答することを確認する（`/mcp` HTTP、`/mcp-sse` SSE）

### リリース後

- [ ] `/capture-release-evidences-cc`（Claude Code スキル）を実行する
  - 新機能の WebP スクリーンショット／録画を取得する
  - リリースノート／ブログ記事に添付する
- [ ] GitHub Discussions／Discord をリリース告知で更新する
- [ ] 次のバージョン用のマイルストーンを作成する
- [ ] 重要な場合：ディスカッションをピン留めするか、アプリ内バナー用に `news.json` に投稿する

### Radar 公開開始ゲート

Radar の告知は、意図的に `active: false` の状態でコミットされています。以下のすべての項目について証跡が揃った後、別の変更として有効化します：

- [ ] 積み重ねられたすべての Radar PR がマージされ、リリース先端の CI が成功している
- [ ] `RADAR_ENABLED` をデフォルトで無効にしたまま、OSS Radar のルートをデプロイしてスモークテストする
- [ ] 指定された Radar ホストで `GET /planos`、`/termos`、`/privacidade`、`/reembolso` をスモークテストする
- [ ] 非公開サービスに、運用担当者の本人情報／連絡先／住所、および所有者が承認した法務レビューを記録する
- [ ] テストモードのみで Stripe Checkout と署名付き webhook を動作確認する
- [ ] 承認済みの送信者／ドメインを使用し、暗号化されたトランザクションメールの配信を 1 回動作確認する
- [ ] バックアップからの復元と、監督下で予算上限を設定したリサーチ実行を 1 回実証する
- [ ] 寄付の証跡を受け付ける前に、BRL/PIX のレビューポリシーを承認する
- [ ] 上記のゲートを通過した後にのみ公開 Checkout を有効化し、その後、新しい `news.json` ID を有効化する
- [ ] Home バナーがローカライズされた文言を使用し、古い ID を非表示にした後でも、新しい ID が再表示されることを確認する

## 組み込みサービスのスモークテスト (v3.8.4+)

組み込みサービスの変更を含むリリースを公開する前に、以下を確認してください。

### 新規DBでの起動（マイグレーションの競合を検出 — v3.8.4のホットフィックス後に追加）

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — 起動するまで10秒待つ
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` が `"9router"` を返す（404でも500でもない）。マイグレーション `071_services.sql` が適用され、行がシードされたことを確認する。
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` が3行を返す。
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` が2行を返す（`070_webhooks_kind_metadata.sql` が適用されたことを検証）。
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` が成功する — 将来の競合を防止する。

### 9Router

- [ ] `POST /api/services/9router/install` が2分以内に `installedVersion` を含む200を返す
- [ ] `POST /api/services/9router/start` が30秒以内に200と `state: "running"` を返す
- [ ] `GET /api/services/9router/status` が `health: "healthy"` を報告する
- [ ] `"model": "9router/auto/..."` を指定した `POST /v1/chat/completions` が200を返す（9Routerを介したエンドツーエンドのルーティング）
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` がプロキシ内に9RouterのネイティブUIをレンダリングする（`127.0.0.1:port` を直接指定するiframeではない）
- [ ] `POST /api/services/9router/rotate-key` が `{ keyRotated: true }` を返し、サービスが正常に再起動する
- [ ] `POST /api/services/9router/stop` が200と `state: "stopped"` を返す
- [ ] `GET /api/services/9router/logs?tail=50` が、直近の行を含む `snapshot` イベント付きのSSEストリームを返す
- [ ] PATHに `npm` がない環境でインストールすると、わかりやすい（スタックトレースではない）エラーメッセージとともに500が返される

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` が2分以内に200を返す
- [ ] `POST /api/services/cliproxy/start` が30秒以内に200と `state: "running"` を返す
- [ ] `GET /api/services/cliproxy/status` が `health: "healthy"` を報告する
- [ ] `POST /api/services/cliproxy/stop` が200と `state: "stopped"` を返す
- [ ] `GET /api/services/cliproxy/logs?tail=50` がSSEストリームを返す

### セキュリティのリグレッション

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` が `403 LOCAL_ONLY` を返す
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` が `403 LOCAL_ONLY` を返す
- [ ] `/api/services/*` からのエラーレスポンスに `err.stack` や絶対ファイルパスが含まれていない

## v3.8.0+の確認項目

v3.8.xリリースを公開する前に、以下の追加項目を確認してください。

- [ ] `omniroute --tray` がmacOSで起動する（systray2が `~/.omniroute/runtime/` にインストールされる）
- [ ] `omniroute --tray` がLinuxで起動する（DISPLAYが必要。未設定の場合は適切なエラーを表示する）
- [ ] `omniroute --tray` がWindowsで起動する（PowerShell NotifyIconを使用し、追加のバイナリは不要）
- [ ] `omniroute config tray enable` が自動起動エントリを作成し、無効化すると削除される
- [ ] `npm install -g omniroute@<this-version>` が致命的エラーで終了することなくpostinstallを実行する
- [ ] 更新経路でオプション依存関係が維持される：`omniroute update --apply` と自動アップデーターが
      `npm install -g … --include=optional` を実行し、`optionalDependencies`（better-sqlite3、
      keytar、tls-client、およびllmlingua SLMスタック：`@atjsh/llmlingua-2@2.0.5`、
      `js-tiktoken`）が更新後も維持される。ultra `modelPath` SLM階層には
      tinybertモデルも必要で、初回使用時に `${DATA_DIR}/models/llmlingua` へ自動ダウンロードされる。Postinstall
      （`scripts/build/colocateOptionals.mjs`）はその後、SLMのオプション依存関係一式を
      `dist/node_modules` に併置し、ワーカーが単一の `@huggingface/transformers` ^4.2.0
      インスタンスを解決するようにする — スタンドアロンのトレースではtransformersのみがバンドルされ、動的にインポートされる
      オプション依存関係はバンドルされないため、これがないとワーカーはルートのtransformersに対してllmlingua-2を読み込み、
      SLM階層が通知なくフェイルオープンする。
- [ ] `.env` がなくても `omniroute status` が動作する（CLIトークン経路、ループバックのみ）
- [ ] `curl http://localhost:20128/api/shutdown` が401を返す（常に保護されるルート）
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` が401を返す（ループバックガード）
- [ ] 初回実行時にSQLiteランタイムが `bundled` として解決される（同梱バイナリがプラットフォームで有効）
- [ ] `node_modules/better-sqlite3` を削除すると、SQLiteランタイムが `runtime` にフォールバックする
- [ ] Smart MCPフィルターが実際の `playwright-mcp browser_snapshot` 出力を圧縮する（50%以上削減）
- [ ] 10個すべての `skills/omniroute*/SKILL.md` ファイルがGitHubのraw URL経由で公開取得できる
- [ ] 新規セットアップ時に、オンボーディングウィザードに「仕組み」の階層ツアーステップが表示される
- [ ] ホームダッシュボードの階層カバレッジウィジェットに、設定済み数とアクティブ数が表示される

---

## 3.9.0 LTS 分岐（3.8.58 でリハーサル済み）

v3.8.59 の次のバージョンは 3.9.0 で、その先端は 2 つの長期運用ブランチになります：
`stable/v3`（v3 LTS ライン、npm `latest`）と `develop`（v4、4.0.0 にバージョンアップ、npm
`nightly`）。ブランチ／チャンネルモデル、フォワードポート、ラベルについては
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md) を、計画については [ROADMAP](../../ROADMAP.md)（Phase 3）を参照してください。この分岐は一度だけ実行します。
3.8.58 ではフォーク上で最初から最後までリハーサルし、3.8.59 は
[GO/NO-GO チェックリスト](./LTS_GO_NO_GO.md)で締めくくります。

### ドライラン（読み取り専用、いつでも安全）

```bash
npm run release:dry-run-lts-cut                       # 実際の分岐：HEAD から 3.9.0、直前のタグは v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # ソースコミットを固定
```

`scripts/release/dry-run-lts-cut.mjs` は何も実行しません。git と `gh` を読み取り、シーケンス全体を出力します。
具体的には、事前条件（ソースが解決できること、直前のタグが存在すること、`package.json` が
対象バージョンであること、`release-freeze` issue がオープンであること、既存のリリースブランチに
オープンな `Release branch not green` issue がないこと—存在しないブランチは green ではなく
`?` unknown と報告されます—、Mergify の `release` キューが構成されていること（G11：`queue_rules`、`checks_timeout`、
ラベル `queue`）、`release/*` ルールセットが引き続き削除と force-push をブロックしていること、
そして `stable/v3` と `develop` がまだ存在しないこと）、2 つのブランチ作成手順、どの休止中ワークフローの
トリガーと `if:` 条件が true になるか（また、どれがリポジトリ変数によって引き続きゲートされるか、
または canonical repository に固定されているか）、想定される dist-tags（`latest` → 3.9.0、`next` と
`nightly` は空）、およびロールバックです。終了コード `0` = `RESULT: READY`、`1` = ブロッキング事前条件の
失敗（`✗`）、`2` = 使用方法のエラーです。`--advisory <id,...>` はチェックを非表示にすることなく
警告（`!`）へ格下げします。

3.9.0 のリリースフリーズがまだ有効な間に、実際の分岐のドライランを実行してください。ブランチは
タグの後、かつ Phase 12c でフリーズを解除する前に作成されます。

### 3.8.58 のリハーサル（フォークのみ）

```bash
# 1. リハーサル用パラメーターを指定して、現在の先端でドライラン
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. FORK リモートに対して実行（URL が canonical
#    repository である origin またはその他のリモートは拒否されます。各手順でターミナル上の確認が求められます）
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. フォーク内の休止中ワークフローを動作確認（ドライランが
#    canonical-repository への固定を報告する場合は workflow_dispatch）してから、ロールバック
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

develop のバージョンアップコミットは git plumbing を使用して作成され（作業ツリーには触れません）、
サイクル開始コミットと同じ 5 つのファイルを更新します：`package.json`、`open-sse/package.json`、
`electron/package.json`、`package-lock.json`、`docs/openapi.yaml`。その後、最初の
PR より前に、`develop` 上で `[4.0.0]` CHANGELOG セクションとその i18n ミラーを開始します。
スクリプトが npm dist-tags を変更することはありません。これらはスクラッチパッケージでリハーサルしてください。

### PR プレビューアーティファクト（一度だけビルドし、同じバイト列を昇格）

`.github/workflows/preview-artifact.yml` は PR の head から 1 つの本番用 tarball をビルドし、
その同一のビルドを検証します（#8084 slice (a)）。同一リポジトリの PR のみが対象で、何も公開されません。

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # または `preview-artifact` ラベルを追加
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # プレビューをインストール
```

この実行では `npm ci`、`npm run build:release`、`npm run check:pack-artifact` を実行し、
tarball をパックして `npm run check:pack-boot`（偽のシークレット、一時的なデータディレクトリ）を実行し、
再度パックします。ダイジェストが同一でなければ失敗します。その後、`artifact-identity.json`（head SHA、base
SHA、lockfile hash、platform、arch、node ABI、bundler、build policy —
`scripts/release/artifact-identity.mjs`）を記録し、別のジョブで tarball を attest します。プレビューの
昇格とは、その tarball をインストールすることを意味します。ソースから再ビルドしてはいけません。

### 分岐（3.9.0、GO 後）

1. GO が [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md) に記録されていること。
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` が `RESULT: READY` を出力すること。
3. ドライランが出力するコマンドを使用して、`origin` 上に手動でブランチを作成します。
   スクリプトは `origin` への push を拒否します。レビュー済みの develop コミットを再利用するには、
   まず 3.9.0 の先端からフォークに対して `--execute` リハーサルを実行します。これにより両方の SHA が
   出力され、同じコミットを push できます：

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. 最初の PR がマージされる前に、`stable/v3` と `develop` を保護します（rulesets + merge queue）。
5. 休止中のワークフローはブランチの存在によって有効になります：`forward-port.yml`（`stable/v3` への
   push）、`validate-stable-pr.yml`（`stable/v3` 向けの PR）、`nightly-v4-build.yml`
   （`develop` をビルド）。本番稼働前に、`secrets.FORWARD_PORT_TOKEN` リポジトリシークレットを設定してください
   （これにより CI がフォワードポート PR で実行されます）。nightly の公開は、所有者がリポジトリ変数
   `vars.NIGHTLY_PUBLISH` を `true` に設定し、npm Trusted Publishing が
   `nightly-v4-build.yml` を受け入れるまで無効のままです。チャンネル解決には
   `scripts/release/dist-tag.mjs` を使用します。これは `npm-publish.yml` が使用するものと同じ
   resolver です。
6. チャンネルを検証します：`npm view omniroute dist-tags --json` で `latest` = 3.9.0 が表示され、
   v4 が公開されるまで `next` / `nightly` が存在しないことを確認します。
7. 必要な場合のロールバック：`git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   および `npm dist-tag add omniroute@3.8.59 latest`。

---

## ロールバック

リリースに重大な問題がある場合：

1. `gh release edit vX.Y.Z --prerelease`（最新リリースではないものとしてマーク）
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z`（まだユーザーに利用されていない場合のみ）
3. または：`release/vX.Y.0` でホットフィックスを実施 → パッチリリース `vX.Y.(Z+1)`
4. GitHub Discussions と Discord で直ちに告知

## 厳守事項

- `main` に直接コミットしない
- `main` または `release/*` ブランチに対して `git push --force` を使用しない
- Husky フックをスキップしない（`--no-verify`）
- シークレット、認証情報、または `.env` ファイルをコミットしない
- カバレッジは 60/60/60/60 以上（ステートメント／行／関数／ブランチ）を維持する
- `src/`、`open-sse/`、`electron/`、または `bin/` の本番コードを変更する場合は、必ずテストを追加または更新する

## 自動同期チェック

PR を作成する前に、ドキュメント同期ガードをローカルで実行してください：

```bash
npm run check:docs-sync
```

CI でも `.github/workflows/ci.yml`（lint ジョブ）でこのチェックが実行されます。
