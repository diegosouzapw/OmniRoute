# CLI Machine-ID Token (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## 概要

OmniRoute CLI コマンドは、`x-omniroute-cli-token` リクエストヘッダーで送信される
`HMAC-SHA256(machine-id, salt)` トークンを使用して、ローカル管理 API に対して認証を行います。

これにより、CLI サブコマンド（`omniroute status`、`omniroute providers` など）は、
呼び出しのたびにユーザーが JWT やパスワードを指定しなくても、管理エンドポイントを呼び出せます。

## 仕組み

1. `getMachineTokenSync()` は `node-machine-id` を介してハードウェアのマシン ID を読み取ります
   （失敗した場合は空文字列にフォールバックし、CLI 認証を無効にします）。
2. `HMAC-SHA256(machine_id, salt)` を計算し、このマシンに紐付けられた決定論的かつ
   非可逆なトークンである、完全な 64 文字の 16 進ダイジェストを返します。
3. CLI は、解決された宛先が明示的なループバック URL（`localhost`、`127.0.0.0/8`、
   またはループバック IPv6）の場合にのみ、トークンを `x-omniroute-cli-token` として送信します。
   トークンを含むリクエストでは `redirect: error` を使用するため、ローカルリダイレクトによって
   別のオリジンへトークンが転送されることはありません。リモートコンテキストでは、代わりに
   スコープ付きアクセストークンを使用します。導出できない場合、CLI はヘッダーを省略し、
   空のトークンを有効として扱うのではなく、`omniroute doctor` がその失敗を報告します。
4. サーバー（`src/server/authz/policies/management.ts`）は、同じ salt を使用して
   期待されるトークンを再計算し、タイミングに基づく抽出を防ぐために
   `timingSafeEqual` で比較します。

## セキュリティ特性

| 特性                            | 詳細                                                                                                                                                                                                                  |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ループバック限定**            | サーバーの信頼されたピアローカリティスタンプ（実際の TCP ピアアドレスから導出）がループバックを示す場合にのみ受け入れられます。クライアントが制御可能な `Host` ヘッダーは、ローカリティの判定には一切信頼されません。 |
| **定数時間比較**                | `crypto.timingSafeEqual` によりタイミング攻撃を防止します。                                                                                                                                                           |
| **非可逆**                      | HMAC の出力から machine-id を復元することはできません。                                                                                                                                                               |
| **`always` 保護のバイパスなし** | `isAlwaysProtectedPath()` は CLI トークンの確認より前に評価されます。`/api/shutdown` と `/api/settings/database` では常に JWT が必要です。                                                                            |
| **エクスポート不可**            | トークンがディスクに書き込まれたり、ログに記録されたりすることはありません。                                                                                                                                          |

## デフォルトの salt（インストールごとにランダム）

`OMNIROUTE_CLI_SALT` が設定されていない場合、salt は一度だけ生成され、
`<DATA_DIR>/cli-token-salt.json`（モード `0600`）に永続化されるランダムな 64 文字の
16 進文字列であり、リポジトリに含まれるリテラル `omniroute-cli-auth-v1` ではありません。
`src/lib/machineToken.ts` の `getActiveSalt()` と、
`bin/cli/utils/cliToken.mjs` にある対応する実装はどちらも同じファイルを読み取るため、
このインストール環境上のサーバーとすべての CLI 呼び出しは同じ値を使用します。
リポジトリに含まれるリテラルは、永続化された salt または環境変数の salt をまだ確立できない場合
（たとえば、サーバーが一度も実行されていない新規の CLI のみのインストール）に限り、
最終手段のフォールバックとして使用されます。これにより、従来の固定リテラルのデフォルトが持つ
脆弱性が解消されます。`/etc/machine-id` は一般に誰でも読み取り可能であるため、
`OMNIROUTE_CLI_SALT` が設定されていないすべてのインストール環境で、
ローカルユーザーが同じトークンを導出できてしまう可能性がありました。

## ソルトのローテーション

コードを変更せずに派生トークンをローテーションするには、`OMNIROUTE_CLI_SALT` を設定します。これは常に、インストールごとに永続化されたソルトよりも優先されます。ローテーション後、このマシン上のすべての CLI プロセスは新しいトークンを自動的に使用します。プロセス一覧からの漏洩によって、以前の派生値が露出した可能性がある場合に有用です。

```bash
# 永続的なローテーション（シェルプロファイルに追加）
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# 新しいトークンが使用されていることを確認
omniroute status
```

## レガシー形式（SHA-256、32文字）— 引き続き利用可能

上記の HMAC 形式が導入される前、CLI は
`bin/cli/utils/cliToken.mjs`（`src/lib/machineToken.ts` の `getLegacyCliTokenSync`）で、
`SHA-256(machineId + salt).hex[0..32]`（32文字のプレフィックス）としてトークンを派生していました。

後方互換性のため、サーバーは**両方**の形式を受け入れます。検証側は
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` を構築し、受信したヘッダーを
`timingSafeEqual` を使用して各トークンと比較します
（`src/server/authz/policies/management.ts` および `src/lib/middleware/cliTokenAuth.ts`）。
したがって、トークンが64文字の HMAC ダイジェストまたは32文字のレガシー SHA-256 プレフィックスの**いずれか**と一致すれば有効です。

**オプトアウト：** CLI トークン機構を完全に無効化するには、`OMNIROUTE_DISABLE_CLI_TOKEN=true`（環境変数または `.env`）を設定します。その場合、すべてのアクセスで明示的な API キーが必要になります。マルチユーザーホストでは、`machine-id` はユーザー単位ではなくデバイス単位であり、同じホスト上の別のユーザーが同じトークンを算出できるため、この設定を推奨します。

## ファイル

| ファイル                                  | 目的                                             |
| ----------------------------------------- | ------------------------------------------------ |
| `src/lib/machineToken.ts`                 | トークンの派生（`getMachineTokenSync`）          |
| `bin/cli/utils/cliToken.mjs`              | 同じ派生処理の CLI 側の実装                      |
| `<DATA_DIR>/cli-token-salt.json`          | インストールごとに永続化されたランダムなソルト   |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` 定数                          |
| `src/server/authz/policies/management.ts` | サーバー側の検証                                 |
| `src/server/authz/routeGuard.ts`          | ループバックホストのチェック（`isLoopbackHost`） |

## 関連項目

- `docs/security/ROUTE_GUARD_TIERS.md` — ルート保護の階層
- `docs/architecture/AUTHZ_GUIDE.md` — 認可パイプライン全体
