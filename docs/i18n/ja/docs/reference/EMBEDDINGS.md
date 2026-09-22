# Embeddings client runbook (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

OmniRoute が Hindsight 0.9.1（テキスト専用 `encode(list[str])`）および Memorix 1.6.0（Jina メディアゲート）の前段にある場合の `POST /v1/embeddings` に関する運用メモ。2026-08-17 に OmniRoute 3.8.49、`https://omniroute.jaguar-fish.ts.net/v1` に対して実環境で検証済み。以下にシークレットは含まれていない。

## 動作するモデル ID

| クライアント ID                                | HTTP | ベクトル     | 次元数  | 備考                                              |
| ---------------------------------------------- | ---- | ------------ | ------- | ------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | バッチ 2 → 2 | 3072    | ネイティブの Gemini キーなしで動作                |
| `openrouter/google/gemini-embedding-2-preview` | 200  | バッチ 2 → 2 | 3072    | 非プレビュー ID と同じベクトル空間                |
| `openrouter/google/gemini-embedding-001`       | 200  | バッチ 2 → 2 | 3072    | `GET /v1/embeddings` に掲載                       |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | バッチ 2 → 2 | 1024    | 正規の Jina omni ID                               |
| `jina/jina-embeddings-v5-omni-small`           | 200  | バッチ 2 → 2 | 1024    | エイリアス。レスポンスの `model` は `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | バッチ 2 → 2 | 1024    | プレフィックスなしの ID でも解決可能              |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1        | **768** | small とは異なるベクトル空間                      |

`GET /v1/models` と `GET /v1/embeddings` には、
`jina-ai/jina-embeddings-v5-omni-small`（1024）、
`jina-ai/jina-embeddings-v5-omni-nano`（768）、および
`openrouter/google/gemini-embedding-001` が掲載されていた。すでにリクエストを処理できるにもかかわらず、
`openrouter/google/gemini-embedding-2` は掲載されて**いなかった**。

nano（768 次元）と small（1024 次元）を同じインデックスに混在させないこと。両者は比較できない。

## 壊れている／誤解を招く ID

### ネイティブ Gemini Embedding 2

リクエスト：

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

実際の結果（2026-08-17）：HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` も同じ 400 を返す。`google` プレフィックスを使用するカスタムプロバイダーノードがない限り、`google/gemini-embedding-2` は HTTP **400** `Unknown embedding provider: google` を返す。

期待される動作：`gemini` プロバイダー上の Google AI Studio キーを使用したネイティブ Gemini 埋め込みを実行するか、動作する OpenRouter ID を示す 400 を返すこと。

再現手順（Bearer を秘匿すること）：

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

動作する代替手段：

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

ネイティブの `gemini-embedding-2` は GitOps だけでは成功しない。Google AI Studio キーを `gemini` プロバイダー接続として追加する必要がある（ダッシュボード、または OmniRoute にインポートされた `GEMINI_API_KEY`）。そのシークレットはこのリポジトリには含まれていない。

### Jina マルチモーダルパス

`POST /v1/multimodal-embeddings` → HTTP **404**

```json
{
  "error": {
    "message": "Unknown API route: /v1/multimodal-embeddings",
    "type": "not_found",
    "code": "unknown_route",
    "path": "/v1/multimodal-embeddings"
  }
}
```

エイリアスが追加されるまでは `POST /v1/embeddings` を使用すること。

### Jina / Memorix の画像オブジェクト

OmniRoute の正規画像項目（28×28 PNG、784 ピクセル — Jina は 1×1 を拒否する）：

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [
    {
      "type": "image",
      "source": {
        "type": "base64",
        "data": "<base64-png>",
        "media_type": "image/png"
      }
    }
  ]
}
```

実際の結果：HTTP **200**、ベクトル 1 個、1024 次元。

Memorix 1.6.0 / Jina ネイティブ形式：

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

実際の結果：HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` と `{ "image": "data:..." }` を混在させた場合も同じ 400 になる。

## クライアントに関する注意事項

### Hindsight 0.9.1

Hindsight の埋め込みはテキスト専用（`encode(list[str])`）。画像オブジェクトは送信しない。Hindsight の OpenAI 互換埋め込みベース URL を OmniRoute の `/v1` に設定し、上表にある動作する ID（`jina-ai/jina-embeddings-v5-omni-small` または `openrouter/google/gemini-embedding-2`）を使用すること。ゲートウェイに `gemini` API キーが存在しない限り、モデルをプレフィックスなしの `gemini-embedding-2` に設定しないこと。

### Memorix 1.6.0

Memorix は、`baseUrl` が `/jina\.ai/i` に一致する場合にのみネイティブメディアとして扱う。モデルが Jina omni であっても、OmniRoute の URL ではテキスト専用パスが使用される。このゲートは Memorix クライアント側の問題である。これとは別に、仮にゲートが開いた場合に Memorix が送信する Jina の `{image: "data:..."}` ボディも OmniRoute は拒否する。そのため、Jina 互換クライアントは正規の `{type,source}` スキーマを使用しない限り、OmniRoute 経由で画像を埋め込めない。

テキストには `jina-ai/jina-embeddings-v5-omni-small` を使用すること。Memorix の `base_url` を `https://api.jina.ai` に向けず、OmniRoute を唯一の中継点として維持すること。
