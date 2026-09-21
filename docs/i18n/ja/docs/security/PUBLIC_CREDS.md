# Public Credentials Handling (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **信頼できる唯一の情報源:** `open-sse/utils/publicCreds.ts`
> **テスト:** `tests/unit/publicCreds.test.ts`
> **最終更新:** 2026-08-07 — v3.8.50
> **対象読者:** 公開 CLI に公開 OAuth client_id / client_secret / Firebase Web API キーを同梱するプロバイダーを統合するエンジニア。
> **ステータス:** アップストリームの識別子を埋め込むすべての新規コードで**必須**。

## これが存在する理由

- [ネイティブアプリ向け OAuth 2.0（PKCE）](https://developers.google.com/identity/protocols/oauth2/native-app) — インストール型アプリの OAuth client_id / client_secret は公開情報であり、実際のセキュリティは PKCE によって提供されます。
- [Firebase API キー](https://firebase.google.com/docs/projects/api-keys) — Web クライアント識別子は設計上、公開情報です。

OmniRoute では、`.env` を設定しないユーザーでも、すぐに動作する OAuth フローを利用できるよう、これらの値を埋め込む必要があります。フォールバックが埋め込まれていない場合、「クローンして実行するだけ」の手順に従うすべてのユーザーに対して、Gemini / Antigravity プロバイダーが動作しなくなります。

しかし、`AIzaSy…`、`GOCSPX-…`、`…apps.googleusercontent.com` のようなリテラル値は、**GitHub Secret Scanning**、**Semgrep**、および類似のパターンスキャナーによって検出されます。その結果、リリースのたびに誤検知が大量に発生し、プッシュ保護によって正当なコミットがブロックされ、運用担当者がアラートフィードを信頼しなくなります。

`open-sse/utils/publicCreds.ts` ヘルパーは、次の方法で両方の制約を同時に解決します。

- 公開識別子を**XOR でマスクしたバイト列**として埋め込みます（ソース内にスキャナーが検出するパターンを残しません）。
- 実行時に `decodePublicCred` / `resolvePublicCred` を介してデコードします。
- 既知のプレフィックス（`AIza`、`GOCSPX-`、`<digits>-<32hex>.apps.googleusercontent.com`、`Iv1.<hex>`）にすでに一致する生の値を検出し、そのまま渡します。これにより、既存の `.env` で生の値を使用しているユーザーは、**移行作業なし**で引き続き利用できます。

これは**難読化であり、暗号化ではありません。** ソースを読めば誰でも値を復元できますが、その値は設計上公開されているため問題ありません。唯一の目的は、スキャナーの正規表現への一致を避けることです。

## 必須パターン

### 1. 新しい公開クレデンシャルの追加

次の条件を満たす、アップストリームから提供された新しい値を埋め込む必要がある場合:

- 公開 CLI / デスクトップアプリ / ブラウザバンドルから取得した値であること、**かつ**
- アップストリームプロバイダーが公開クライアント識別子として文書化している（またはそのように扱っている）こと、**かつ**
- そのままではパターンスキャナーに検出されること（`AIza…`、`GOCSPX-…`、`<digits>-…apps.googleusercontent.com` など）、

…次のチェックリストに従ってください。

1. マスク済みバイト列を生成します。

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. `open-sse/utils/publicCreds.ts` の `EMBEDDED_DEFAULTS` に、**中立的なキー名**（`<provider>_id`、`<provider>_alt`、`<provider>_fb` など）を使用して新しいエントリを追加します。ヘルパー内では `client_secret` や `api_key` のような名前を使用しないでください。これらの単語は Semgrep の汎用シークレットルールをトリガーします。

3. 公開型のユニオンに `keyof typeof EMBEDDED_DEFAULTS` を追加します（これは自動的に推論されます）。

4. コンシューマーコード内のハードコードされたリテラルを、次のように置き換えます。

   ```ts
   // 単一の環境変数によるオーバーライド
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // 複数の環境変数エイリアス（最初の空でない値が優先）
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // 環境変数によるオーバーライドなし（常に埋め込みのデフォルト値）
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. `.env.example` からリテラルを削除します（読者をこの文書へ誘導するコメントのみのドキュメントに置き換えます）。

   ```dotenv
   # ── プロバイダー（Google / Firebase / など）──
   # 公開 OAuth クレデンシャルは、次のファイルを介してコードに組み込まれています。
   # open-sse/utils/publicCreds.ts。独自の値を使用する場合のみ、これらの変数を設定してください。
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. `tests/unit/publicCreds.test.ts` を更新し、新しいキーの形式に関するアサーションを追加します（リテラル値ではなく形式を検証してください。パターンについては既存のテストを参照してください）。

7. テストファイルには、`AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` のリテラルを**絶対に**追加しないでください。`.join("")` で連結したフラグメントから作成される `FAKE_*` 定数を使用してください（既存のテストを参照）。

### 2. コンシューマー

- **必ず `resolvePublicCred()` / `resolvePublicCredMulti()` から読み取ってください**。ヘルパーの外部から `decodePublicCredBytes()` を直接呼び出してはいけません。
- このヘルパーは意図的に低コスト（バイト単位の線形 XOR）に設計されており、モジュールのロード時に安全に呼び出せます。デフォルト値は一度だけ計算されます。
- 環境変数によるオーバーライドが常に優先されます。ユーザーが `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` を設定した場合、ヘルパーはその生の値をそのまま渡します。

### 3. 禁止パターン

❌ 本番コード（`src/`、`open-sse/`、`electron/`、`bin/`）では、次のいずれも**絶対に**行わないでください。

```ts
// 悪い例: リテラル値が Secret Scanning と Semgrep をトリガーする
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// 悪い例: リテラルの base64 — GitHub は 2025 年 2 月以降、これも検出する
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// 悪い例: 実行時にパターンを再構成する文字列連結
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// 悪い例: hex/ROT13 エンコーディング — 難読化方法が異なるだけで、検出リスクは同じ
clientSecret: hexDecode("474f4353..."),
```

これらはすべて、最終的にスキャナーによって検出されます。`resolvePublicCred()` を使用してください。

❌ `.env.example` にクレデンシャルのリテラルを**絶対に**追加しないでください。実際のアップストリーム値が必要なユーザーは、公開 CLI から自分で抽出するか、独自の OAuth 登録を使用できます。

❌ 新しいシークレットスキャンアラートについて、そのクレデンシャルをこのヘルパーへ移動すべきかどうかを最初に確認せず、無視扱いにしてはいけません。

## 関連する管理項目

- `publicCreds.ts` の `RAW_VALUE_PATTERN` は、パススルーを発生させるプレフィックスを列挙しています（後方互換性のため）。文書化された公開認証情報の形式に対してのみ拡張し、独自仕様のシークレットには決して使用しないでください。
- `.env.example` は CI の `check-env-doc-sync` スクリプトで管理されています。ここから変数を削除する場合は、ドキュメントも一致するように更新してください。
- `npm run test:vitest` と `node --import tsx/esm --test tests/unit/publicCreds.test.ts` の両テストスイートが、常に成功する状態を維持する必要があります。

## このヘルパーを使用してはいけない場合

このヘルパーは、以下の条件を満たす認証情報に**のみ**使用します。

1. アップストリームプロバイダーによって公開配布されているもの（CLI バイナリ、ブラウザバンドル、公式ドキュメント）。
2. 機密ではないことが文書化されているか、強く示唆されているもの（PKCE で保護されたもの、Firebase Web キーなど）。

それ以外のすべて（運用者が発行したトークン、テナントごとのシークレット、独自の OAuth アプリの client_secret、暗号化キー、JWT シークレット、データベースパスワード）については、**環境変数のみ**を使用してください（`process.env.FOO`、`||` による空文字列へのフォールバック、または明示的なエラー）。これらはソースコードではなく、`.env` と[暗号化された認証情報ストア](./COMPLIANCE.md)に保存してください。

## 参考資料

- [Google：ネイティブアプリ向け OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase：クライアント識別用の API キー](https://firebase.google.com/docs/projects/api-keys)
- [GitHub Secret Scanning でサポートされているシークレット](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub：トークンの base64 検出（2025 年 2 月）](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- このヘルパーを導入したコミット：`1a39c31f` — _fix(security): 公開アップストリーム認証情報をマスクし、エラーのサニタイズ処理を一元化_
