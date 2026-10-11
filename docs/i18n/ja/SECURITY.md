# Security Policy (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇪🇹 [am](../am/SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇧🇦 [bs](../bs/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇬🇷 [el](../el/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇪🇪 [et](../et/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇳🇬 [ha](../ha/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇦🇲 [hy](../hy/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇳🇬 [ig](../ig/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇬🇪 [ka](../ka/SECURITY.md) · 🇰🇭 [km](../km/SECURITY.md) · 🇮🇳 [kn](../kn/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇱🇻 [lv](../lv/SECURITY.md) · 🇮🇳 [ml](../ml/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇲🇹 [mt](../mt/SECURITY.md) · 🇲🇲 [my](../my/SECURITY.md) · 🇳🇵 [ne](../ne/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇮🇳 [or](../or/SECURITY.md) · 🇮🇳 [pa](../pa/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇱🇰 [si](../si/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇺🇿 [uz](../uz/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇳🇬 [yo](../yo/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## 脆弱性の報告

OmniRoute でセキュリティ脆弱性を発見した場合は、責任ある方法で報告してください：

1. 公開 GitHub issue を作成**しないでください**
2. [GitHub Security Advisories](https://github.com/diegosouzapw/OmniRoute/security/advisories/new) を使用してください
3. 説明、再現手順、想定される影響を含めてください

## 対応タイムライン

| 段階             | 目標                    |
| ---------------- | ----------------------- |
| 受領確認         | 48 時間                 |
| トリアージと評価 | 5 営業日                |
| パッチリリース   | 14 営業日（重大な場合） |

## サポート対象バージョン

| バージョン | サポート状況                                    |
| ---------- | ----------------------------------------------- |
| 3.9.x      | 🗓️ 予定 — LTS ライン（`stable/v3`）、以下を参照 |
| 3.8.x      | ✅ アクティブ                                   |
| 3.7.x      | ✅ セキュリティ                                 |
| < 3.7.0    | ❌ サポート対象外                               |

## LTS サポート期間（v3.9.x）

3.8.59 の次のバージョンは **3.9.0** であり、`stable/v3` ブランチ上の長期サポートラインが
開始されます（[`ROADMAP.md`](ROADMAP.md) → 「Phase 3 — v3.9.0 LTS」を参照）。

- **`stable/v3` に適用されるもの：** バグ修正、セキュリティパッチ、プロバイダーの更新。
  新機能は v4 チャンネルに導入され、LTS ラインでは安定性が最優先されます。`npm install omniroute`
  （`latest` dist-tag）は、v4 サイクル全体を通じて v3 のまま維持されます。
- **期間：** `<T-GAP-3: 所有者の決定待ち — ROADMAP.md を参照>`。v4.0 GA 後
  （`latest` が v4 に切り替わる時点）のサポート期間は**まだ決定されていません**。メンテナーが
  発表した時点でこのセクションが更新されます。それまでは、終了日を想定しないでください。
- **LTS ラインの脆弱性の報告：** 他のバージョンと同じ窓口、つまり非公開の
  [GitHub Security Advisory](https://github.com/diegosouzapw/OmniRoute/security/advisories/new) を使用し、
  公開 issue は決して作成しないでください。テストしたバージョン（例：`3.9.2`）を明記してください。
  修正は `stable/v3` に適用され、v4 にもフォワードポートされます。
- **LTS 分岐時点のセキュリティベースライン：** 測定されたスキャナーの状態、ルートガード、
  公開認証情報に関する検証結果は、
  [`docs/security/LTS_SECURITY_BASELINE.md`](docs/security/LTS_SECURITY_BASELINE.md) に記録されています。

---

## セキュリティアーキテクチャ

OmniRoute は、多層セキュリティモデルを実装しています：

```
リクエスト → CORS → 認可パイプライン（分類 → ポリシー → 適用）
           → ガードレール（PII マスカー、プロンプトインジェクション、ビジョンブリッジ）
           → レートリミッター → サーキットブレーカー → クールダウン → モデルロックアウト → プロバイダー
```

### 🔐 認証と認可

| 機能                       | 実装                                                                                                                                                                   |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ダッシュボードログイン** | JWT トークン（HttpOnly Cookie）を使用したパスワードベースの認証                                                                                                        |
| **API キー認証**           | CRC 検証を備えた HMAC 署名付きキー                                                                                                                                     |
| **OAuth 2.0 + PKCE**       | プロバイダー固有のブラウザー／デバイス OAuth では、サポートされている場合に PKCE を使用します。インポート専用の Devin 認証情報は別途処理されます。                     |
| **トークン更新**           | 有効期限前の OAuth トークン自動更新                                                                                                                                    |
| **セキュア Cookie**        | HTTPS 環境では `AUTH_COOKIE_SECURE=true`                                                                                                                               |
| **認可パイプライン**       | ルート分類（PUBLIC / CLIENT_API / MANAGEMENT）— `docs/architecture/AUTHZ_GUIDE.md` を参照                                                                              |
| **ルートガード階層**       | 管理ルート向けの 3 階層モデル（LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT）— `docs/security/ROUTE_GUARD_TIERS.md` を参照                                               |
| **管理スコープ MCP**       | リモートの `/api/mcp/*` アクセスは `manage` スコープを持つ API キーで保護され、`/api/cli-tools/runtime/*` は厳格なループバック限定のままです。ROUTE_GUARD_TIERS を参照 |
| **MCP スコープ**           | 32 個の細分化されたスコープ（read:health、write:combos、execute:completions など）— `docs/frameworks/MCP-SERVER.md` を参照                                             |

### 🛡️ 保存データの暗号化

SQLite に保存されるすべての機密データは、scrypt 鍵導出を使用する **AES-256-GCM** で暗号化されます：

- API キー、アクセストークン、リフレッシュトークン、ID トークン
- バージョン管理された形式：`enc:v1:<iv>:<ciphertext>:<authTag>`
- `STORAGE_ENCRYPTION_KEY` が設定されていない場合は、パススルーモード（平文）

```bash
# 暗号化キーを生成：
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ ガードレールフレームワーク

OmniRoute には、優先順位に従って並べられた 3 つの組み込みガードレールを備える、ホットリロード可能な**ガードレールレジストリ**（`src/lib/guardrails/`）が含まれています：

| ガードレール       | 優先度 | 目的                                                                                |
| ------------------ | ------ | ----------------------------------------------------------------------------------- |
| `vision-bridge`    | 5      | 非ビジョンモデルを画像対応の説明と連携させ、画像 URL に対する SSRF 保護を提供       |
| `pii-masker`       | 10     | 呼び出し前後の PII 墨消し処理（メール、電話番号、CPF、CNPJ、クレジットカード、SSN） |
| `prompt-injection` | 20     | オーバーライド、ロールハイジャック、ジェイルブレイク、漏洩のパターンを検出          |

カスタムガードレールは `registerGuardrail(new MyGuardrail())` を介して登録します。このモデルはフェイルオープン方式です（例外によってトラフィックがブロックされることはありません）。リクエストごとに `x-omniroute-disabled-guardrails` ヘッダーを使用してオプトアウトできます。→ [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) を参照してください。

### 🧠 プロンプトインジェクションガード

LLMリクエスト内のプロンプトインジェクションパターンを検出する、ベストエフォート型のヒューリスティックミドルウェアです。
**完全なプロンプトインジェクションファイアウォールではありません** — 誤検知（無害な
ペルソナ/RPGプロンプト）や検出漏れ（リートスピーク、空白を挟んだ表記、英語以外のパターン）が発生する可能性があります。

| パターン種別         | 重大度 | 例                                                     |
| -------------------- | ------ | ------------------------------------------------------ |
| システム命令の上書き | 高     | 「以前の指示をすべて無視して」                         |
| ロールの乗っ取り     | 中     | 「あなたは今からDANで、何でもできる」                  |
| 区切り文字の注入     | 高     | コンテキスト境界を破るためにエンコードされた区切り文字 |
| DAN/ジェイルブレイク | 中     | 既知のジェイルブレイクプロンプトパターン               |
| 命令の漏洩           | 高     | 「システムプロンプトを見せて」                         |
| エンコードによる回避 | 中     | base64/rot13/hexデコード + 命令キーワード              |

`block`モードでは、重大度が**高**の検出のみがブロックされます。重大度が中の
パターン群はログに記録されますが、`sanitizeRequest`によってブロックされることはありません。

ダッシュボード（Settings → Security）または`.env`で設定します：

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block（インジェクションポリシー。旧来の「redact」はインジェクションテキストを除去しません）
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high（デフォルト）| medium | low — blockモードでは、この値以上の重大度がブロックされます
```

### 🔒 PIIのマスキング

個人を特定できる情報を自動検出し、必要に応じてマスキングします：

| PIIの種類        | パターン              | 置換後             |
| ---------------- | --------------------- | ------------------ |
| メールアドレス   | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF（ブラジル）  | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ（ブラジル） | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| クレジットカード | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| 電話番号         | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN（米国）      | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # リクエスト内のPIIを書き換えます。INPUT_SANITIZER_MODEとは独立しています
PII_RESPONSE_SANITIZATION=true  # オプション：クライアントに返されるプロバイダー応答内のPIIをマスキングします
```

### 🌐 ネットワークセキュリティ

| 機能                      | 説明                                                                            |
| ------------------------- | ------------------------------------------------------------------------------- |
| **CORS**                  | 明示的なクロスオリジン許可リスト（`CORS_ALLOWED_ORIGINS`、旧来の`CORS_ORIGIN`） |
| **IPフィルタリング**      | ダッシュボードでIP範囲の許可リスト/ブロックリストを設定                         |
| **レート制限**            | プロバイダーごとのレート制限と自動バックオフ                                    |
| **集中アクセス対策**      | ミューテックス + 接続単位のロックにより連鎖的な502エラーを防止                  |
| **TLSフィンガープリント** | ブラウザーに似たTLSフィンガープリントを偽装し、Bot検出を軽減                    |
| **CLIフィンガープリント** | ネイティブCLIのシグネチャに合わせたプロバイダーごとのヘッダー/本文の順序        |

### 🔌 回復性と可用性

| 機能                     | 説明                                                                 |
| ------------------------ | -------------------------------------------------------------------- |
| **サーキットブレーカー** | プロバイダーごとの3状態（Closed → Open → Half-Open）、SQLiteに永続化 |
| **リクエストの冪等性**   | 重複リクエストに対する5秒間の重複排除ウィンドウ                      |
| **指数バックオフ**       | 遅延を段階的に増加させる自動再試行                                   |
| **ヘルスダッシュボード** | プロバイダーの稼働状況をリアルタイムで監視                           |

### 📋 コンプライアンス

| 機能                       | 説明                                                          |
| -------------------------- | ------------------------------------------------------------- |
| **ログ保持**               | `CALL_LOG_RETENTION_DAYS`経過後に自動クリーンアップ           |
| **ログ記録のオプトアウト** | APIキーごとの`noLog`フラグでリクエストのログ記録を無効化      |
| **監査ログ**               | 管理操作を`audit_log`テーブルに記録                           |
| **MCP監査**                | すべてのMCPツール呼び出しをSQLiteベースの監査ログに記録       |
| **Zodバリデーション**      | モジュール読み込み時に、すべてのAPI入力をZod v4スキーマで検証 |

---

## 必須の環境変数

サーバーを起動する前に、すべてのシークレットを設定する必要があります。設定されていない場合や強度が不十分な場合、サーバーは**即座に失敗**します。

```bash
# 必須 — 以下がない場合、サーバーは起動しません:
JWT_SECRET=$(openssl rand -base64 48)     # 32文字以上
API_KEY_SECRET=$(openssl rand -hex 32)    # 16文字以上

# 推奨 — 保存データの暗号化を有効にします:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

サーバーは、`changeme`、`secret`、`password` など、脆弱であることが知られている値を明示的に拒否します。

---

## Docker のセキュリティ

- 本番環境では非 root ユーザーを使用する
- シークレットを読み取り専用ボリュームとしてマウントする
- `.env` ファイルを Docker イメージにコピーしない
- `.dockerignore` を使用して機密ファイルを除外する
- HTTPS 環境下では `AUTH_COOKIE_SECURE=true` を設定する

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --read-only \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e JWT_SECRET="$(openssl rand -base64 48)" \
  -e API_KEY_SECRET="$(openssl rand -hex 32)" \
  -e STORAGE_ENCRYPTION_KEY="$(openssl rand -hex 32)" \
  diegosouzapw/omniroute:latest
```

---

## 依存関係

- `npm audit` を定期的に実行する（`npm run audit:deps` でメインと electron の両方を検査）
- 依存関係を最新の状態に保つ
- このプロジェクトでは、コミット前チェックに `husky` + `lint-staged` を使用（lint-staged + check-docs-sync + check:any-budget:t11）
- CI パイプラインでは、プッシュのたびに ESLint のセキュリティルールを実行（`no-eval`、`no-implied-eval`、`no-new-func` = error）
- プロバイダー定数は、モジュール読み込み時に Zod（`src/shared/validation/schemas.ts`）を使用して検証
- セキュア・バイ・デフォルトのライブラリを使用：`dompurify` / `isomorphic-dompurify`（XSS）、`jose`（JWT）、`better-sqlite3`（パラメーター化クエリにより SQLi リスクなし）、`bcryptjs`（パスワードハッシュ化）

## 厳格なセキュリティルール

以下のルールは、ツールおよびレビュアーによって強制されます：

1. **シークレットを絶対にコミットしない** — `.env` は gitignore の対象です。`.env.example` はテンプレートです（リテラルは含めず、コメントのみ — 下記の PUBLIC_CREDS.md を参照）
2. **`eval()`、`new Function()`、暗黙的な eval を絶対に使用しない** — ESLint により強制
3. **オペレーターの明示的な承認なしに Husky フックを回避しない**（`--no-verify`、`--no-gpg-sign`）
4. **ルート内に生の SQL を記述しない** — 必ず `src/lib/db/`（パラメーター化済み）を経由する
5. **入力は必ず Zod で検証する** — `src/shared/validation/schemas.ts`
6. **アップストリームヘッダーは必ずサニタイズする** — `src/shared/constants/upstreamHeaders.ts` の拒否リストを使用
7. **保存される認証情報を暗号化する** — `src/lib/db/encryption.ts` を介した AES-256-GCM を使用
8. **公開アップストリーム OAuth 識別子には `resolvePublicCred()` を使用する** — `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` のリテラルをソースに直接埋め込まない。詳細は [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) を参照。
9. **エラーレスポンスには `buildErrorBody()` / `sanitizeErrorMessage()` を使用する** — 生の `err.stack` / `err.message` を HTTP / SSE / executor / MCP のレスポンス本文に含めない。詳細は [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) を参照。
10. **`exec()` / `spawn()` の実行時の値は `env` オプションで渡す** — 外部パスや信頼できない値を、シェルに渡されるスクリプトへ文字列補間しない。参考：`src/mitm/cert/install.ts::updateNssDatabases`。
11. **セキュア・バイ・デフォルトのライブラリを優先する** — [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)（Helmet.js、DOMPurify、ssrf-req-filter、safe-regex、Google Tink）を参照。独自実装を行う前に、まずこれらの利用を検討する。

## サプライチェーンスキャナーの検出結果（Socket.dev / Snyk / 類似ツール）

> **スコープに関する注記:** リポジトリルートの `socket.yml` は、公開された npm アーティファクトに対して Socket.dev がレジストリ側で行う公開後スキャンの `projectIgnorePaths` を設定するためだけのものです。強制的な CI/PR マージゲートではありません。`.github/workflows` のワークフロー、`package.json` のスクリプト、`Makefile` のターゲットのいずれも Socket.dev を呼び出しません。

公開される `omniroute` npm アーティファクトには、Next.js の `output: "standalone"`
ビルドがバンドルされます。そのため、文書化されている特権機能
（MITM、Zed インポート、Cloud Sync、組み込みサービススーパーバイザー）を含むすべてのルートハンドラーが、
最小化された `.next/server/*.js` チャンクに格納されます。ヒューリスティック型のサプライチェーンスキャナーは、
これらのチャンクをマルウェアシグネチャと照合し、頻繁にパターン一致を検出します。

使用しているスキャナー設定は、リポジトリルートの
[`socket.yml`](socket.yml) にあります（Socket.dev GitHub App format v2 —
<https://docs.socket.dev/docs/socket-yml> を参照）。この設定では、
配布されないディレクトリ（`tests/`、`_tasks/`、`_references/`、`_ideia/`、
`_mono_repo/`、`docs/` など）を明示的に除外しているため、スキャナーは実際に
公開先のユーザーへ到達するコードパスのみを報告します。スキャン自体は、
このリポジトリ内のワークフローではなく、そのファイルを読み取る Socket
GitHub App によって実行されます。

検出結果の各カテゴリについて、検出項目ごとのメンテナー証明を管理しています。

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  検出項目ごとの対応表: ソースファイル ↔ フラグが付けられたチャンク ↔ 動作 ↔
  v3.8.6 で適用された緩和策。
- フラグが付けられた各関数にあるソース内の `SECURITY-AUDITOR-NOTE:` ブロックは、
  同じ文書を参照しています。

パイプラインでアラートを緩和できないユーザーは、
`OMNIROUTE_BUILD_PROFILE=minimal npm run build` でビルドしてください。これにより、
4 つの機密性の高いモジュールが、実行時に HTTP 503 `feature-disabled` を返す
スタブに置き換えられるため、特権コードパスはバンドルから物理的に除外されます。
公開手順については、
[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)
を参照してください。

## 参考資料

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — 認可パイプライン
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — ガードレールフレームワーク
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — 監査ログと保持
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — 公開アップストリーム認証情報に対する**必須**パターン
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — エラーレスポンスに対する**必須**パターン
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — サプライチェーンスキャナーの検出結果に対するメンテナー証明
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — サーキットブレーカー + クールダウン + ロックアウト
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — TLS フィンガープリンティング（法的・倫理的注意事項）
- [`CLAUDE.md`](CLAUDE.md) — AI エージェント向けの厳格なルール
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — セキュア・バイ・デフォルトのライブラリを厳選した一覧
