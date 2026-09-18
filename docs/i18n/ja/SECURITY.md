# Security Policy (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇪🇹 [am](../am/SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇬🇷 [el](../el/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇪🇪 [et](../et/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇳🇬 [ha](../ha/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇦🇲 [hy](../hy/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇳🇬 [ig](../ig/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇬🇪 [ka](../ka/SECURITY.md) · 🇰🇭 [km](../km/SECURITY.md) · 🇮🇳 [kn](../kn/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇱🇻 [lv](../lv/SECURITY.md) · 🇮🇳 [ml](../ml/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇲🇹 [mt](../mt/SECURITY.md) · 🇲🇲 [my](../my/SECURITY.md) · 🇳🇵 [ne](../ne/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇮🇳 [or](../or/SECURITY.md) · 🇮🇳 [pa](../pa/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇱🇰 [si](../si/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇺🇿 [uz](../uz/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇳🇬 [yo](../yo/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## 脆弱性の報告

OmniRoute でセキュリティ脆弱性を発見した場合は、責任ある方法で報告してください。

1. 公開 GitHub Issue を作成**しないでください**
2. [GitHub Security Advisories](https://github.com/diegosouzapw/OmniRoute/security/advisories/new) を使用してください
3. 説明、再現手順、潜在的な影響を含めてください

## 対応スケジュール

| 段階             | 目標                        |
| ---------------- | --------------------------- |
| 受領確認         | 48 時間以内                 |
| トリアージと評価 | 5 営業日以内                |
| パッチリリース   | 14 営業日以内（重大な場合） |

## サポート対象バージョン

| バージョン | サポート状況            |
| ---------- | ----------------------- |
| 3.8.x      | ✅ アクティブ           |
| 3.7.x      | ✅ セキュリティサポート |
| < 3.7.0    | ❌ サポート対象外       |

---

## セキュリティアーキテクチャ

OmniRoute は多層セキュリティモデルを実装しています。

```
リクエスト → CORS → Authz パイプライン（分類 → ポリシー → 適用）
           → ガードレール（PII マスカー、プロンプトインジェクション、ビジョンブリッジ）
           → レートリミッター → サーキットブレーカー → クールダウン → モデルロックアウト → プロバイダー
```

### 🔐 認証と認可

| 機能                       | 実装                                                                                                                                                                         |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ダッシュボードログイン** | JWT トークン（HttpOnly Cookie）を使用したパスワードベースの認証                                                                                                              |
| **API キー認証**           | CRC 検証を備えた HMAC 署名付きキー                                                                                                                                           |
| **OAuth 2.0 + PKCE**       | プロバイダー固有のブラウザー／デバイス OAuth では、サポートされている場合に PKCE を使用します。インポート専用の Devin 認証情報は別途処理されます。                           |
| **トークン更新**           | 有効期限が切れる前に OAuth トークンを自動更新                                                                                                                                |
| **セキュア Cookie**        | HTTPS 環境では `AUTH_COOKIE_SECURE=true`                                                                                                                                     |
| **Authz パイプライン**     | ルート分類（PUBLIC / CLIENT_API / MANAGEMENT）— `docs/architecture/AUTHZ_GUIDE.md` を参照                                                                                    |
| **ルートガード階層**       | 管理ルート向けの 3 階層モデル（LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT）— `docs/security/ROUTE_GUARD_TIERS.md` を参照                                                     |
| **管理スコープ MCP**       | リモートの `/api/mcp/*` アクセスは `manage` スコープを持つ API キーによって制限され、`/api/cli-tools/runtime/*` は厳格なループバック限定のままです。ROUTE_GUARD_TIERS を参照 |
| **MCP スコープ**           | 32 個の詳細なスコープ（read:health、write:combos、execute:completions など）— `docs/frameworks/MCP-SERVER.md` を参照                                                         |

### 🛡️ 保存データの暗号化

SQLite に保存されるすべての機密データは、scrypt 鍵導出を使用した **AES-256-GCM** で暗号化されます。

- API キー、アクセストークン、リフレッシュトークン、ID トークン
- バージョン付き形式：`enc:v1:<iv>:<ciphertext>:<authTag>`
- `STORAGE_ENCRYPTION_KEY` が設定されていない場合は、パススルーモード（平文）

```bash
# 暗号化キーを生成：
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ ガードレールフレームワーク

OmniRoute には、優先度順に並べられた 3 つの組み込みガードレールを備える、ホットリロード可能な**ガードレールレジストリ**（`src/lib/guardrails/`）が含まれています。

| ガードレール       | 優先度 | 目的                                                                                      |
| ------------------ | ------ | ----------------------------------------------------------------------------------------- |
| `vision-bridge`    | 5      | 画像を認識できないモデルを画像対応の説明で補完し、画像 URL に対する SSRF 保護を提供します |
| `pii-masker`       | 10     | 呼び出し前後の PII 編集（メール、電話番号、CPF、CNPJ、クレジットカード、SSN）             |
| `prompt-injection` | 20     | オーバーライド、ロールハイジャック、ジェイルブレイク、漏洩のパターンを検出します          |

カスタムガードレールは `registerGuardrail(new MyGuardrail())` を使用して登録します。このモデルはフェイルオープンです（例外によってトラフィックがブロックされることはありません）。リクエストごとに `x-omniroute-disabled-guardrails` ヘッダーを使用してオプトアウトできます。→ [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) を参照してください。

### 🧠 プロンプトインジェクションガード

LLM リクエスト内のプロンプトインジェクションパターンを検出する、ベストエフォート方式のヒューリスティックミドルウェアです。
**完全なプロンプトインジェクションファイアウォールではありません**。偽陽性（無害な
ペルソナ／RPG プロンプト）や偽陰性（リートスピーク、スペース挿入、英語以外のパターン）が発生する可能性があります。

| パターン種別               | 重大度 | 例                                                 |
| -------------------------- | ------ | -------------------------------------------------- |
| システムオーバーライド     | 高     | 「以前の指示をすべて無視してください」             |
| ロールハイジャック         | 中     | 「あなたは今から DAN で、何でもできます」          |
| 区切り文字インジェクション | 高     | コンテキスト境界を破壊するエンコード済み区切り文字 |
| DAN／ジェイルブレイク      | 中     | 既知のジェイルブレイクプロンプトパターン           |
| 指示漏洩                   | 高     | 「システムプロンプトを見せてください」             |
| エンコードによる回避       | 中     | base64／rot13／hex デコード + 指示キーワード       |

`block` モードでは、重大度が**高**の検出のみがブロックされます。重大度が中の
パターン群はログに記録されますが、`sanitizeRequest` によってブロックされることはありません。

ダッシュボード（Settings → Security）または `.env` で設定します。

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block（インジェクションポリシー。従来の "redact" ではインジェクションテキストは除去されません）
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high（デフォルト）| medium | low — block モードでは、この値以上の重大度がブロックされます
```

### 🔒 PII 編集

個人を特定できる情報を自動的に検出し、必要に応じて編集します。

| PII の種類       | パターン              | 置換後             |
| ---------------- | --------------------- | ------------------ |
| メールアドレス   | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF（ブラジル）  | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ（ブラジル） | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| クレジットカード | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| 電話番号         | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN（米国）      | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # PII の書き換えを要求。INPUT_SANITIZER_MODE とは独立
PII_RESPONSE_SANITIZATION=true  # 任意：クライアントに返されるプロバイダーのレスポンス内の PII を秘匿化
```

### 🌐 ネットワークセキュリティ

| 機能                       | 説明                                                                                |
| -------------------------- | ----------------------------------------------------------------------------------- |
| **CORS**                   | 明示的なクロスオリジン許可リスト（`CORS_ALLOWED_ORIGINS`、旧設定は `CORS_ORIGIN`）  |
| **IP フィルタリング**      | ダッシュボードで IP 範囲の許可リスト／ブロックリストを設定                          |
| **レート制限**             | プロバイダーごとのレート制限と自動バックオフ                                        |
| **集中アクセス対策**       | ミューテックスと接続ごとのロックにより、連鎖的な 502 エラーを防止                   |
| **TLS フィンガープリント** | ブラウザのような TLS フィンガープリントを偽装し、ボット検出を低減                   |
| **CLI フィンガープリント** | ネイティブ CLI のシグネチャに合わせて、プロバイダーごとにヘッダー／本文の順序を調整 |

### 🔌 回復性と可用性

| 機能                     | 説明                                                                    |
| ------------------------ | ----------------------------------------------------------------------- |
| **サーキットブレーカー** | プロバイダーごとの 3 状態（Closed → Open → Half-Open）、SQLite に永続化 |
| **リクエストの冪等性**   | 重複リクエストに対する 5 秒間の重複排除ウィンドウ                       |
| **指数バックオフ**       | 待機時間を段階的に増加させる自動再試行                                  |
| **ヘルスダッシュボード** | プロバイダーの状態をリアルタイムで監視                                  |

### 📋 コンプライアンス

| 機能                       | 説明                                                              |
| -------------------------- | ----------------------------------------------------------------- |
| **ログ保持**               | `CALL_LOG_RETENTION_DAYS` の経過後に自動クリーンアップ            |
| **ログ記録のオプトアウト** | API キーごとの `noLog` フラグにより、リクエストのログ記録を無効化 |
| **監査ログ**               | 管理操作を `audit_log` テーブルに記録                             |
| **MCP 監査**               | すべての MCP ツール呼び出しを SQLite ベースの監査ログに記録       |
| **Zod バリデーション**     | モジュール読み込み時に、すべての API 入力を Zod v4 スキーマで検証 |

---

## 必須の環境変数

サーバーを起動する前に、すべてのシークレットを設定する必要があります。欠落している場合や強度が不十分な場合、サーバーは**即座にエラー終了**します。

```bash
# 必須 — これらがないとサーバーは起動しません:
JWT_SECRET=$(openssl rand -base64 48)     # 最低32文字
API_KEY_SECRET=$(openssl rand -hex 32)    # 最低16文字

# 推奨 — 保存時の暗号化を有効にします:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

サーバーは、`changeme`、`secret`、`password` など、脆弱であることが知られている値を明示的に拒否します。

---

## Docker のセキュリティ

- 本番環境では非 root ユーザーを使用する
- シークレットを読み取り専用ボリュームとしてマウントする
- `.env` ファイルを Docker イメージにコピーしない
- `.dockerignore` を使用して機密ファイルを除外する
- HTTPS の背後で動作させる場合は `AUTH_COOKIE_SECURE=true` を設定する

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

- `npm audit` を定期的に実行する（`npm run audit:deps` はメインと electron の両方を対象とします）
- 依存関係を最新の状態に保つ
- このプロジェクトでは、コミット前チェックに `husky` + `lint-staged` を使用しています（lint-staged + check-docs-sync + check:any-budget:t11）
- CI パイプラインでは、プッシュのたびに ESLint のセキュリティルールを実行します（`no-eval`、`no-implied-eval`、`no-new-func` = error）
- プロバイダー定数は、モジュールのロード時に Zod を使用して検証されます（`src/shared/validation/schemas.ts`）
- セキュア・バイ・デフォルトなライブラリを使用しています：`dompurify` / `isomorphic-dompurify`（XSS）、`jose`（JWT）、`better-sqlite3`（パラメーター化クエリにより SQLi リスクなし）、`bcryptjs`（パスワードのハッシュ化）

## 厳格なセキュリティルール

以下のルールは、ツールおよびレビュアーによって強制されます：

1. **シークレットを絶対にコミットしない** — `.env` は gitignore の対象です。`.env.example` がテンプレートです（リテラルは含めず、コメントのみ — 下記の PUBLIC_CREDS.md を参照）
2. **`eval()`、`new Function()`、または暗黙的な eval を絶対に使用しない** — ESLint により強制されます
3. **Husky フックを絶対に回避しない**（`--no-verify`、`--no-gpg-sign`）— オペレーターの明示的な承認がある場合を除きます
4. **ルート内に生の SQL を絶対に記述しない** — 必ず `src/lib/db/` を経由する（パラメーター化）
5. **入力は必ず Zod で検証する** — `src/shared/validation/schemas.ts`
6. **アップストリームヘッダーを必ずサニタイズする** — `src/shared/constants/upstreamHeaders.ts` の拒否リストを使用する
7. **保存時に認証情報を暗号化する** — `src/lib/db/encryption.ts` を介した AES-256-GCM
8. **公開アップストリーム OAuth 識別子には `resolvePublicCred()` を使用する** — `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` のリテラルをソースに直接埋め込まない。詳細は [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) を参照してください。
9. **エラーレスポンスには `buildErrorBody()` / `sanitizeErrorMessage()` を使用する** — 生の `err.stack` / `err.message` を HTTP / SSE / executor / MCP のレスポンス本文に含めない。詳細は [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) を参照してください。
10. **`exec()` / `spawn()` のランタイム値には `env` オプションを使用する** — 外部パスや信頼できない値を、シェルに渡されるスクリプトへ文字列補間しない。参照：`src/mitm/cert/install.ts::updateNssDatabases`。
11. **セキュア・バイ・デフォルトなライブラリを優先する** — [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)（Helmet.js、DOMPurify、ssrf-req-filter、safe-regex、Google Tink）を参照してください。独自実装を行う前に、まずこれらの利用を検討してください。

## サプライチェーンスキャナーの検出結果（Socket.dev / Snyk / 類似ツール）

公開されている `omniroute` npm アーティファクトには、Next.js の `output: "standalone"`
ビルドが同梱されています。これは、文書化されている特権機能（MITM、Zed インポート、Cloud Sync、組み込みサービススーパーバイザー）を含むすべてのルートハンドラーが、
`.next/server/*.js` のミニファイ済みチャンクに含まれることを意味します。ヒューリスティック型のサプライチェーンスキャナーは、
これらのチャンクをマルウェアシグネチャとパターンマッチングして検出することがよくあります。

使用しているスキャナー設定は、リポジトリルートの [`socket.yml`](socket.yml) にあります
（Socket.dev GitHub App 形式 v2 —
<https://docs.socket.dev/docs/socket-yml> を参照）。この設定では、配布されないディレクトリ
（`tests/`、`_tasks/`、`_references/`、`_ideia/`、
`_mono_repo/`、`docs/` など）を明示的に除外しているため、スキャナーは実際に公開版のユーザーへ届くコードパスのみを報告します。スキャン自体は、このリポジトリ内のワークフローではなく、
当該ファイルを読み取る Socket GitHub App によって実行されます。

検出カテゴリごとに、個々の検出結果に対するメンテナー証明を管理しています。

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  検出結果ごとの対応表：ソースファイル ↔ フラグ付けされたチャンク ↔ 動作 ↔
  v3.8.6 で適用された緩和策。
- フラグ付けされた各関数にあるソース内の `SECURITY-AUDITOR-NOTE:` ブロックは、
  同じドキュメントを参照しています。

パイプライン側でアラートを緩和できない場合は、
`OMNIROUTE_BUILD_PROFILE=minimal npm run build` を使用してビルドしてください。これにより、4 つの機密性の高いモジュールが、実行時に HTTP 503 `feature-disabled` を返すスタブへ置き換えられるため、
特権コードパスはバンドル内から物理的に除外されます。
公開手順については、[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)
を参照してください。

## 参考資料

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — 認可パイプライン
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — ガードレールフレームワーク
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — 監査ログと保持
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — 公開アップストリーム認証情報の**必須**パターン
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — エラーレスポンスの**必須**パターン
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — サプライチェーンスキャナーの検出結果に対するメンテナー証明
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — サーキットブレーカー + クールダウン + ロックアウト
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — TLS フィンガープリンティング（法的・倫理的注意事項）
- [`CLAUDE.md`](CLAUDE.md) — AI エージェント向けの厳格なルール
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — セキュア・バイ・デフォルトなライブラリの厳選リスト
