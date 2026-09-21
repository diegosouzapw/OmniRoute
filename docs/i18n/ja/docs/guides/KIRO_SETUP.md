# Kiro Setup Guide (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

このガイドでは、Kiro（AWS がホストする AI コーディングアシスタント）のアカウントを OmniRoute に追加する方法について、セッションの競合を発生させずに複数のアカウントを同時実行することを中心に説明します。

---

## 背景：Kiro アカウントが競合する理由

Kiro のバックエンドでは、AWS SSO OIDC クライアント登録を使用してアクティブなセッションを追跡します。
重要な制約として、**各 OIDC クライアント登録でサポートされるアクティブなセッションは、一度に 1 つだけです**。同じ登録済みクライアントを使用して 2 台目のデバイスまたは別のユーザーが認証すると、バックエンドは最初のアカウントのリフレッシュトークンを無効化します。

これは、別の Kiro アカウントがすでにサインインしているマシンで `kiro-cli login` を実行したときに問題が発生する仕組みと同じです。新しいログインによって、最初のアカウントのトークンが失効します。

---

## OmniRoute による解決方法（v3.8.0 以降）

v3.8.0 以降、OmniRoute は Kiro 接続をインポートするたびに `registerClient()`（AWS SSO OIDC）を呼び出します。これにより、OmniRoute の各接続に専用の OIDC クライアント登録が割り当てられます。各クライアント登録は独立しているため、あるアカウントの更新または再認証を行っても、他のアカウントのリフレッシュトークンには影響しません。

この分離はリフレッシュトークンのインポート方式に適用されます。また、API キー認証では OIDC リフレッシュセッションを一切使用しません。

| インポート方式                                                 | 分離状況                                                                                                 |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| AWS Builder ID / IDC デバイスコードフロー                      | デバイスコードフローの導入時から分離済み                                                                 |
| **トークンをインポート**（リフレッシュトークンの手動貼り付け） | v3.8.0 以降で分離済み                                                                                    |
| **Google / GitHub ソーシャルログイン**                         | v3.8.0 以降で分離済み                                                                                    |
| **自動インポート**（kiro-cli SQLite）                          | v3.8.0 以降で分離済み（SQLite パスは以前から分離済み。SSO キャッシュへのフォールバックも現在は分離済み） |
| **API キー**（長期間有効な CodeWhisperer キー）                | リフレッシュセッションなし。キーは検証され、Bearer 認証情報として保存されます                            |

---

## v3.8.0 より前に作成された接続に関する移行上の注意

v3.8.0 より前にインポートされた接続には、専用の OIDC クライアント登録が `providerSpecificData` に保存されていません。これらの接続は引き続き機能しますが、共有のソーシャル認証用リフレッシュエンドポイントを使用するため、そのような接続が 2 つある場合、互いを無効化する可能性が残ります。

**分離を有効にするには：** **ダッシュボード → プロバイダー**から古い接続を削除し、サポートされているいずれかのインポートフローを使用して再インポートしてください。新しく作成されるすべての接続には、それぞれのクライアント登録が自動的に割り当てられます。

---

## 2 つの Kiro アカウントを並行して追加する

### 前提条件

- OmniRoute v3.8.0 以降。
- 使用可能な Kiro アカウント（メールアドレス + パスワード、Google、または GitHub ログイン）。
- 必要に応じて、2 つ目の Kiro アカウント。

### ステップ 1：最初のアカウントをインポートする

1. **ダッシュボード → プロバイダー → プロバイダーを追加 → Kiro**を開きます。
2. 次のいずれかを選択します。
   - **トークンをインポート** — `aorAAAAAG` で始まるリフレッシュトークンを貼り付けます。
   - **API キー** — 長期間有効な Kiro / CodeWhisperer API キーを貼り付けます。
   - **Google / GitHub ログイン** — ブラウザーで OAuth フローを完了します。
   - **自動インポート** — ボタンをクリックします。OmniRoute がローカルの kiro-cli データベースまたは `~/.aws/sso/cache` から認証情報を読み取ります。
3. 接続が保存されます。リフレッシュトークンを使用するフローでは、専用の OIDC クライアントが自動的に登録されます。API キーを使用するフローでは、AWS でキーを検証し、リフレッシュトークンは保存しません。

### ステップ 2：2 つ目のアカウントをインポートする

2 つ目のアカウントについて、ステップ 1 を繰り返します。インポートごとに個別の OIDC クライアント登録が作成されるため、2 つの接続は完全に分離されます。

### ステップ 3：両方の接続がアクティブであることを確認する

1. **ダッシュボード → プロバイダー** — 両方の Kiro 接続に**アクティブ**ステータスが表示されていることを確認します。
2. **ダッシュボード → ヘルス** — 両方の接続がトークンのヘルスチェックに合格することを確認します。

### ステップ 4：コンボを使用してアカウント間でルーティングする

両方の接続をターゲットとして含むコンボを作成し、それらの間で負荷分散またはフォールバックを行います。

```
kiro/kiro-dev → kiro/kiro-pro
```

コンボの設定については、[FEATURES.md](./FEATURES.md)およびルーティングに関するドキュメントを参照してください。

---

## Enterprise / IDC ユーザー

AWS IAM Identity Center (IDC) アカウントでは、**Dashboard → Providers → Kiro → Device Code** から **AWS Builder ID / IDC デバイスコード**フローを使用してください。デバイスコードフローは、以前から完全に分離されています。これらの接続を再インポートする必要はありません。

デフォルト以外の AWS リージョンを使用する Enterprise ユーザーは、Import Token API 経由でインポートする際にリージョンを指定できます。

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

`region` フィールドを省略した場合、デフォルトは `us-east-1` です。

---

## API キーのインポートフロー

API キー認証は、長期間有効な Kiro / AWS CodeWhisperer の bearer 認証情報向けです。OAuth 更新を使用しないため、共有 OIDC セッションの無効化を回避できます。

### Dashboard

1. **Dashboard -> Providers -> Kiro** を開きます。
2. **API Key** を選択します。
3. API キーと、必要に応じて AWS リージョン（デフォルトは `us-east-1`）を貼り付けます。
4. OmniRoute がキーを検証し、接続を保存します。

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### 内部コントラクト

API ルートは `KiroService.validateApiKey()` を呼び出してキーを検証します。このメソッドは、リージョンに対応する CodeWhisperer/Amazon Q エンドポイントに対して `ListAvailableProfiles` を使用し、`profileArn` を解決します。

保存される接続では、以下を使用します。

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

実行時に、`KiroExecutor.buildHeaders()` はキーを `Authorization: Bearer <key>` として送信し、`tokentype: API_KEY` を追加します。クォータおよびプロファイルの呼び出しでも同じマーカーを使用するため、AWS は bearer を OIDC またはソーシャルアクセストークンではなく、長期間有効な API キーとして扱います。

---

## OIDC クライアントの有効期限

AWS SSO OIDC のパブリッククライアントは通常、90 日後に期限切れになります（`clientSecretExpiresAt`）。OmniRoute は、可観測性を確保するため、このタイムスタンプを `providerSpecificData` に保存します。接続が約 90 日後に更新されなくなった場合は、新しい OIDC クライアント登録を取得するため、接続を再インポートしてください。有効期限切れ時の自動再登録は、今後の改善項目として追跡されています。

API キー接続は AWS SSO OIDC 経由で更新されないため、OIDC クライアントの有効期限はありません。

---

## トラブルシューティング

### 2 つ目のアカウントがログアウトし続ける

- **Dashboard → Providers** で両方の接続を確認し、それぞれの生 JSON（情報アイコンから表示可能）で `clientId` が null ではないことを確認してください。いずれかの接続に `clientId` がない場合、その接続は v3.8.0 より前にインポートされています。再インポートしてください。

### 「Token validation failed」でインポートに失敗する

- リフレッシュトークンが `aorAAAAAG` で始まっていることを確認してください。
- OmniRoute が `https://oidc.us-east-1.amazonaws.com`（または設定済みのリージョン）に到達できることを確認してください。企業プロキシの背後にいる場合は、**Dashboard → Settings → Proxies** でプロバイダーレベルのプロキシを設定してください。

### API キーのインポートに失敗する

- キーがリフレッシュトークンではなく、Kiro / CodeWhisperer API キーであることを確認してください。
- AWS リージョンがキーまたはアカウントと一致していることを確認してください。デフォルトは `us-east-1` です。
- キーには `ListAvailableProfiles` を呼び出す権限が必要です。そうでない場合、OmniRoute は必要な `profileArn` を解決できません。

その他の問題については、メインの [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) を参照してください。
