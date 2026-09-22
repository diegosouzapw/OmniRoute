# Embeddings client runbook (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

OmniRoute가 Hindsight 0.9.1(텍스트 전용 `encode(list[str])`) 및 Memorix 1.6.0(Jina 미디어 게이트) 앞에 있을 때의 `POST /v1/embeddings` 운영자 참고 사항입니다. 2026-08-17에 OmniRoute 3.8.49 및 `https://omniroute.jaguar-fish.ts.net/v1`을 대상으로 실제 검증했습니다. 아래에는 비밀 정보가 없습니다.

## 작동하는 모델 ID

| 클라이언트 ID                                  | HTTP | 벡터       | 차원    | 참고 사항                                |
| ---------------------------------------------- | ---- | ---------- | ------- | ---------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | 배치 2 → 2 | 3072    | 네이티브 Gemini 키 없이 작동             |
| `openrouter/google/gemini-embedding-2-preview` | 200  | 배치 2 → 2 | 3072    | 비프리뷰 ID와 동일한 벡터 공간           |
| `openrouter/google/gemini-embedding-001`       | 200  | 배치 2 → 2 | 3072    | `GET /v1/embeddings`에 나열됨            |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | 배치 2 → 2 | 1024    | 정식 Jina omni ID                        |
| `jina/jina-embeddings-v5-omni-small`           | 200  | 배치 2 → 2 | 1024    | 별칭이며, 응답의 `model`은 `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | 배치 2 → 2 | 1024    | 접두사 없는 ID도 확인됨                  |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1      | **768** | small과 다른 벡터 공간                   |

`GET /v1/models`와 `GET /v1/embeddings`에는
`jina-ai/jina-embeddings-v5-omni-small`(1024),
`jina-ai/jina-embeddings-v5-omni-nano`(768) 및
`openrouter/google/gemini-embedding-001`이 나열되었습니다. 그러나 이미 요청을 처리할 수 있음에도
`openrouter/google/gemini-embedding-2`는 나열되지 **않았습니다**.

nano(768차원)와 small(1024차원)을 하나의 인덱스에서 혼용하지 마십시오. 서로
비교할 수 없습니다.

## 작동하지 않거나 오해의 소지가 있는 ID

### 네이티브 Gemini Embedding 2

요청:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

실제 결과(2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2`도 동일한 400을 반환합니다. `google` 접두사를 사용하는 커스텀
프로바이더 노드가 없다면 `google/gemini-embedding-2`는 HTTP **400**
`Unknown embedding provider: google`을 반환합니다.

예상 결과: `gemini` 프로바이더에 설정된 Google AI Studio 키를 사용한 네이티브 Gemini
임베딩이거나, 작동하는 OpenRouter ID를 명시하는 400 응답이어야 합니다.

재현 방법(보유자 토큰은 마스킹할 것):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

작동하는 대체 방법:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

네이티브 `gemini-embedding-2`는 GitOps만으로 작동하게 할 수 없습니다. Google AI
Studio 키를 `gemini` 프로바이더 연결로 추가해야 합니다(대시보드에서 추가하거나
`GEMINI_API_KEY`를 OmniRoute로 가져오기). 해당 비밀 정보는 이 저장소에 없습니다.

### Jina 멀티모달 경로

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

별칭이 추가될 때까지 `POST /v1/embeddings`를 사용하십시오.

### Jina / Memorix 이미지 객체

OmniRoute 표준 이미지 항목(28×28 PNG, 784픽셀 — Jina는 1×1을 거부함):

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

실제 결과: HTTP **200**, 벡터 1개, 1024차원.

Memorix 1.6.0 / Jina 네이티브 형식:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

실제 결과: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }`와 `{ "image": "data:..." }`를 혼합해도 동일한 400이 반환됩니다.

## 클라이언트 참고 사항

### Hindsight 0.9.1

Hindsight 임베딩은 텍스트 전용(`encode(list[str])`)입니다. 이미지 객체는 전송하지
않습니다. Hindsight의 OpenAI 호환 임베딩 기본 URL을 OmniRoute `/v1`로 지정하고,
위 표에서 작동하는 ID
(`jina-ai/jina-embeddings-v5-omni-small` 또는
`openrouter/google/gemini-embedding-2`)를 사용하십시오. 게이트웨이에 `gemini` API 키가
없다면 모델을 접두사 없는 `gemini-embedding-2`로 설정하지 마십시오.

### Memorix 1.6.0

Memorix는 `baseUrl`이 `/jina\.ai/i`와 일치할 때만 네이티브 미디어로 처리합니다.
OmniRoute URL은 모델이 Jina omni인 경우에도 텍스트 전용 경로를 유지합니다.
이 게이트는 Memorix 클라이언트의 문제입니다. 이와 별개로 OmniRoute는 게이트가
열릴 경우 Memorix가 전송하게 될 Jina `{image: "data:..."}` 본문도 거부합니다.
따라서 Jina 호환 클라이언트는 표준 `{type,source}` 스키마 없이는 OmniRoute를 통해
이미지를 임베딩할 수 없습니다.

텍스트에는 `jina-ai/jina-embeddings-v5-omni-small`을 사용하십시오. Memorix의
`base_url`을 `https://api.jina.ai`로 지정하지 말고 OmniRoute를 유일한 홉으로
유지하십시오.
