# Cursor Image Generation (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute は、チャットと同じプロバイダー ID `cursor`（エイリアス `cu`）を通じて、`POST /v1/images/generations` で Cursor プランの**画像生成**を提供します。

| フィールド           | 値                                                                                |
| -------------------- | --------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS` ID | `cursor`                                                                          |
| 形式                 | `cursor-agent-image`                                                              |
| 認証                 | チャットと同じ OAuth / API キー接続（`provider_connections.provider = "cursor"`） |
| モデル               | `cursor/auto`、`cursor/composer-2`、`cursor/composer-2.5`                         |

## Agent CLI を使用する理由

OmniRoute の Cursor チャットは `agent.v1.AgentService/Run`（protobuf）を使用します。この経路では、組み込みのクライアントツール（shell、write、…）が**拒否されます**。画像生成は、シートに対して **`agent` CLI** により実行される Cursor ネイティブのツールです。そのため、画像ハンドラーは固定されたプロンプトとリクエストごとの一時ワークスペース（コミュニティのシートブリッジと同じ形式）を使用して `agent` を起動し、OpenAI 互換の `b64_json` を返します。

## アクセス制限（ハードルール #15 + #17）

これは、子プロセス（`agent` バイナリ）を起動する唯一の `IMAGE_PROVIDERS` 形式です。`POST /v1/images/generations` は、リモート呼び出し元が正当に利用する、プロセスを起動しない約40の画像プロバイダーでも共有されているため、ルート全体は `LOCAL_ONLY` に分類されていません。代わりに、`handleCursorAgentImageGeneration` が独自のゲートを適用します。このゲートでは、authz パイプラインが各リクエストに付与する信頼済みの `AUTHZ_HEADER_PEER_LOCALITY` 判定（偽装可能な `Host` ヘッダーではなく、実際の TCP ピアに基づく）を使用します。プロセス起動に到達できるのは `loopback` および `lan` の呼び出し元のみです。それ以外のすべての呼び出し元（漏洩した API キーが公開トンネル経由で再利用された場合を含む）には、認証情報の検索やプロセスの起動が行われる前に `403` が返されます。`LOCAL_ONLY` 層の残りに適用される同じポリシーについては、`src/server/authz/policies/management.ts` を参照してください。

## 同時実行ゲートはモジュール単位（単一インスタンスの制限）

`CURSOR_IMG_MAX_CONCURRENT` は、Node モジュールインスタンス（`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`）にスコープされたインメモリのカウンター／キューによって適用されます。単一の OmniRoute プロセス内では、同時に起動される `agent` の数を正しく制限しますが、同じ Cursor シートを共有する複数のプロセス／インスタンス（マルチレプリカ構成など）の間では**連携しません**。各インスタンスがそれぞれ独立した制限を適用します。単一インスタンス構成（デフォルト）では正確に機能します。水平スケーリングされた構成では、インスタンスごとの `CURSOR_IMG_MAX_CONCURRENT` を控えめな値に設定するか、Cursor の画像トラフィックを単一のインスタンスにルーティングしてください。

## 要件

1. ダッシュボードで接続済みの Cursor アカウント（OAuth または `crsr_…` API キー）。
2. OmniRoute プロセスから Cursor Agent バイナリを利用できること：
   - 環境変数 `CURSOR_AGENT_BIN=/path/to/agent`、または
   - `~/.local/bin/agent`、または
   - Cursor 接続の `providerSpecificData.agentBin`。

オプションの調整項目：

| 環境変数                    | デフォルト                    | 意味                       |
| --------------------------- | ----------------------------- | -------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                      | 画像ごとの実時間制限       |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                           | 共有シートの同時実行ゲート |
| `CURSOR_IMG_MODEL`          | （リクエストモデル / `auto`） | CLI の `--model` を上書き  |

## 例

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

生成には通常1～2分かかります。内部ネットワーク経路の使用を推奨します。タイムアウトが約100秒に設定されたエッジプロキシでは失敗します。

## LiteLLM

`mode: image_generation`、`api_base: http://omniroute:20128/v1`、および `model: openai/cursor/auto`（LiteLLM のバージョンによっては単に `cursor/auto`）を指定して画像モデルを登録してください。
