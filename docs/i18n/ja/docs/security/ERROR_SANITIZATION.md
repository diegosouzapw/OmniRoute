# Error Message Sanitization (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **信頼できる唯一の情報源:** `open-sse/utils/errorSanitization.ts`、
> `open-sse/utils/errorPathRedaction.ts`、および `open-sse/utils/error.ts` の公開ビルダー
> **テスト:** `tests/unit/error-message-sanitization.test.ts`、
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **最終更新:** 2026-09-02 — v3.8.51
> **対象読者:** エラーレスポンスを扱うすべてのエンジニア（HTTP ルート、SSE ストリーム、エグゼキューター、MCP ハンドラー）。
> **ステータス:** クライアントにエラーメッセージを返す、あらゆるコードパスで **必須**。

## この仕組みが必要な理由

CodeQL ルール `js/stack-trace-exposure`（CWE-209）は、ランタイム例外に由来するエラーメッセージがサニタイズされずに HTTP / SSE レスポンスへ到達するコードパスを検出します。本番環境のレスポンスに含まれるスタックトレースや絶対ファイルパスは、攻撃者に次の情報を与えます。

- 内部ディレクトリ構成（`/srv/app/src/lib/...`）→ さらなる攻撃に向けた偵察。
- スタックフレームから推測されるライブラリ / フレームワークのバージョン → 標的を絞ったエクスプロイトの選択。
- エラーに文字列補間される可能性がある機密性の高いランタイム値（DB クエリ、設定値）。

`open-sse/utils/error.ts` からエクスポートされる `sanitizeErrorMessage` ヘルパーは、次の種類の情報漏洩を除去します。

1. 物理的、シリアライズ済み、および明確にインライン化された JavaScript スタックフレーム末尾。
2. 安全な HTTPS URL と明示的にマークされた API ルートを維持しながら、POSIX、Windows、UNC、および `file://` の絶対ファイルシステムパス。
3. 認証情報の代入、一般的なプロバイダートークン形式、秘密鍵の PEM ブロック、および base64 データ URL。

サニタイザーは入力長に上限を設け、スローされた値の文字列変換が失敗した場合は安全側に倒します。
再帰的なアップストリーム JSON のサニタイズでは、レスポンスがシリアライズされる前に、安全でない認証情報 / パスのキー、セッションエイリアス、およびプロトタイプ制御キーも除外されます。

## 必須パターン

### 1. エラーレスポンスの構築（HTTP / API ルート）

`buildErrorBody()` を使用してください。サニタイズが組み込まれています。

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... ハンドラーのロジック ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

または、同じモジュール内の便利なラッパーを使用します。

```ts
import {
  errorResponse, // 単発の Response オブジェクト
  writeStreamError, // SSE ライター
  createErrorResult, // { success: false, status, response, ... } 形式
  unavailableResponse, // Retry-After を追加
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

これらはすべて、正規の公開エラー境界を適用します。`errorResponse`、`writeStreamError`、および
`createErrorResult` は `buildErrorBody` を経由し、3 つの特殊な再試行 / サーキット用ヘルパーは、
公開コンテキストを直接抽出してサニタイズします。これらのヘルパーを使用する場合、**`sanitizeErrorMessage` を手動で呼び出す必要はありません**。

### 2. カスタムエラーエンベロープ（まれ）

上記のヘルパーを使用できない場合（たとえば、レスポンス形式が Connect-RPC のようなアップストリームプロトコルによって規定されている場合）は、`sanitizeErrorMessage` を直接インポートしてください。

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

これは、カスタムエラー本文を組み立てるために認められている唯一の方法です。リファレンス実装については、`open-sse/executors/cursor.ts::buildErrorResponse` を参照してください。

### 3. ロギングとレスポンスの違い

信頼された内部例外については、オペレーターがデバッグできるように完全なメッセージとスタックを保持しても構いません。
プロバイダー、検証、ブラウザーセッション、または認証情報に近接する境界で生成された値は、
コンソール出力、監査メタデータ、または永続的な呼び出しログに入る前にサニタイズする必要があります。パターン:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // 信頼された内部例外のみ
  return errorResponse(500, getErrorMessage(err)); // サニタイズ済み — クライアントへ送信
}
```

プロバイダーによって制御されるエラーについては、ログに記録する値も抽出してください。

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. 禁止パターン

❌ **決して**未加工の例外出力を Response 本文に入れないでください。

```ts
// 悪い例: スタックトレースとファイルパスがクライアントに到達する
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **決して**独自の先頭行分割処理を実装しないでください。

```ts
// 悪い例: 絶対パスの除去を忘れており、正規のヘルパーと乖離する可能性がある
const safe = String(err).split("\n")[0];
```

❌ **決して**ルート側だけをサニタイズして SSE パスを忘れないでください。ストリームに書き込むものはすべて、`writeStreamError`（またはその基盤となる `buildErrorBody`）を経由させます。

❌ **決して**`process.cwd()`、`__filename`、`__dirname`、または環境変数由来のパスを意図的にエラーメッセージへ含めないでください。サニタイザーは多層防御として絶対パスを処理しますが、そもそも呼び出し側でシステム構成を露呈するメッセージを作成してはなりません。

## CI でのカバレッジ

`tests/unit/error-message-sanitization.test.ts` では、以下を検証します。

- `/api/model-combo-mappings/*` 配下のすべてのルートが、4xx/5xx の際にサニタイズ済みの本文を返すこと。
- `sanitizeErrorMessage` が複数行のスタックトレースを除去すること。
- `sanitizeErrorMessage` が POSIX および Windows の絶対パスを `<path>` に置換すること。
- `sanitizeErrorMessage` が `null`/`undefined`/`Error` インスタンスの入力を安全に処理すること。
- `buildErrorBody` が、その `message` フィールドにスタックトレースを決して露出させないこと。

新しいルートまたはエグゼキューターを追加する場合は、このファイルのアサーションパターンをコピーしてください。カバレッジゲート（`npm run test:coverage`）では、ステートメント／行／関数／分岐について 60% 以上が必須です。エラーパスもカバーする必要があります。

## 関連する制御

- `.github/security` 内の `js/stack-trace-exposure` CodeQL アラートは、必ず、これらのヘルパーを使用して修正するか、このドキュメントを引用したコメントを付けて却下するかの**いずれか**にしてください。
- `pino` のリダクション設定（`src/shared/utils/logRedaction.ts`）は、信頼済みの構造化ログを別途処理します。このドキュメントでは、公開レスポンスメッセージと、永続的な呼び出しログ／プロキシログの境界を越えるプロバイダー管理の値を対象とします。
- アップストリームヘッダーの拒否リスト（`src/shared/constants/upstreamHeaders.ts`）は、ヘッダー漏えいを対象とします。新たな情報流出上の懸念事項を追加する場合は、両方のファイルの整合性を維持してください。

## アップストリーム詳細のパススルー

`buildErrorBody` は、オプションの第 3 引数 `upstreamDetails`（アップストリームプロバイダーから取得した、未加工の解析済み本文）を受け取ります。指定された場合、レスポンスに `upstream_details` として含められる前に、`sanitizeUpstreamDetails` によってサニタイズされます。

オプションの第 4 引数 `classification`
（`{ type?: string; code?: string; reason?: string }`）は、明示的な公開分類を受け取ります。
すべてのフィールドは、制限された公開識別子の語彙へ投影されます。安全でない値、認証情報のような形式の値、制御文字を含む値、または長すぎる値は、ステータスから導出されたタイプ／コードにフォールバックします。安全でないオプションの理由は省略されます。3 桁の HTTP ステータス識別子（`100` から `599`）は、数値のアップストリームステータスを機械可読コードとして公開するプロバイダー契約のために、引き続き有効です。ローカルで生成される HTTP ステータスのプレースホルダー形式でも、同じ制限範囲が受け入れられます。任意のプロバイダー番号や名前は、引き続き語彙の対象外です。

明示的な分類は、すべてこの第 4 引数で渡してください。`buildErrorBody()` が返った後に、`body.error.code`、`body.error.type`、または `body.error.reason` を上書きしないでください。ビルダー実行後の変更は、公開用の投影処理を迂回します。

`upstreamDetails` に適用されるサニタイズルール：

1. 文字列のリーフ値：`sanitizeErrorMessage` を通します（スタックと絶対パスを除去）。
2. 安全でないパス、認証情報、セッションエイリアス、およびプロトタイプ制御用のキーは削除されます。
3. 深度制限：4 レベルを超えるネストは、文字列 `"[truncated]"` に置換されます。
4. 配列は最大 32 要素に制限されます。

解析済みのプロバイダーエラー本文がある呼び出し元だけが、`upstreamDetails` を渡すようにしてください。OmniRoute 内部のエラー（SSE 解析エラー、空のコンテンツ、ガードレールによるブロック）には、これを含めてはいけません。

未加工の `err.stack`、`err.message`、またはランタイム例外から取得した任意の文字列を、`upstreamDetails` に渡しては**いけません**。これらは引き続き、アップストリーム本文なしで `errorResponse` / `buildErrorBody(code, msg)` を通す必要があります。

アップストリームの 4xx を選択的にパススルーすることで、クライアントの自動復旧に必要な、プロバイダーの安全な JSON 構造と文言が維持されます。ただし、これはバイト単位で同一のパススルーではありません。シリアライズ前には、常に再帰的サニタイザーが実行されます。循環参照を含む本文、BigInt を含む本文、または悪意のある `toJSON()` を持つ本文は、安全側に倒して処理に失敗し、パススルーの対象にはなりません。OCR とモデレーションにも同じルールが適用されます。JSON でないアップストリーム本文、空のアップストリーム本文、または誤ったラベルが付けられたアップストリーム本文は、標準の OmniRoute JSON エラーエンベロープに変換されます。

## CodeQL の既知の制限: カスタムサニタイザーが認識されない

CodeQL クエリ [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) は、固定されたサニタイザーパターンの許可リスト（例: インラインの `.split("\n")[0]`、特定の正規表現形式を使用する `String#replace`、`Error` の `.message` へのアクセス）を使用します。これは、当プロジェクトの `sanitizeErrorMessage()` のようなカスタムヘルパーを介した間接処理を認識**しません**。

つまり、`open-sse/utils/error.ts::errorResponse` や `open-sse/executors/cursor.ts::buildErrorResponse` など、このモジュールを介して明らかにサニタイズしているコールサイトであっても、コードが機能的に安全であるにもかかわらず、引き続きアラートが発生する可能性があります。過去の却下例: `#224`、`#231`（2026 年 5 月）。いずれも技術的な根拠に基づき `false positive` としてマークされています。

**新たな発生への対処方法:**

1. コールサイトが実際にメッセージを `sanitizeErrorMessage` / `buildErrorBody` / 上記で文書化されているラッパーのいずれかに通していることを確認します（コールチェーンを最初から最後まで確認してください。コメントを鵜呑みにしないでください）。
2. `tests/unit/error-message-sanitization.test.ts` がそのパスをテストしていることを確認します（またはカバレッジを追加します）。
3. この文書を参照し、`gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` を使用してアラートを却下します。
4. あらゆる箇所に `.split("\n")[0]` をインライン化することで「修正」**しないでください**。このヘルパーが信頼できる唯一の情報源です。スキャナーを満足させるように見せかけるためにパターンを重複させると、サニタイザーの機能（パスのスクラブ、長さの上限、型変換）が損なわれます。

CodeQL の [`@codeql/javascript-models` custom sanitizer config](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) のようなオプトイン機能を採用することが長期的な解決策です。これはこの文書の範囲外です。

## 参考資料

- [CWE-209: エラーメッセージを通じた情報漏えい](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: エラー処理チートシート](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- ヘルパーを一元化したコミット: `1a39c31f` — _fix(security): 公開されるアップストリーム認証情報をマスクし、エラーのサニタイズを一元化_
