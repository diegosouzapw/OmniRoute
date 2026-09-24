# Embeddings client runbook (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Notas operacionais para `POST /v1/embeddings` quando o OmniRoute está à frente do
Hindsight 0.9.1 (`encode(list[str])` apenas para texto) e do Memorix 1.6.0 (bloqueio de multimédia
da Jina). Verificado em ambiente real em 2026-08-17 com o OmniRoute 3.8.49 em
`https://omniroute.jaguar-fish.ts.net/v1`. Não existem segredos abaixo.

## IDs de modelo funcionais

| ID do cliente                                  | HTTP | Vetores    | Dim.    | Notas                                        |
| ---------------------------------------------- | ---- | ---------- | ------- | -------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | lote 2 → 2 | 3072    | Funciona sem uma chave nativa do Gemini      |
| `openrouter/google/gemini-embedding-2-preview` | 200  | lote 2 → 2 | 3072    | O mesmo espaço vetorial que o ID sem preview |
| `openrouter/google/gemini-embedding-001`       | 200  | lote 2 → 2 | 3072    | Listado em `GET /v1/embeddings`              |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | lote 2 → 2 | 1024    | ID omni canónico da Jina                     |
| `jina/jina-embeddings-v5-omni-small`           | 200  | lote 2 → 2 | 1024    | Alias; o `model` da resposta é `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | lote 2 → 2 | 1024    | O ID simples também é resolvido              |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1      | **768** | Espaço vetorial diferente do small           |

`GET /v1/models` e `GET /v1/embeddings` listaram
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) e
`openrouter/google/gemini-embedding-001`. Não listaram
`openrouter/google/gemini-embedding-2`, apesar de esse ID já responder a pedidos.

Não misture nano (768 dimensões) e small (1024 dimensões) no mesmo índice. Não são
comparáveis.

## IDs com problemas ou enganadores

### Gemini Embedding 2 nativo

Pedido:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Resultado real (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` devolve o mesmo 400. `google/gemini-embedding-2`
devolve HTTP **400** `Unknown embedding provider: google`, a menos que um nó
de fornecedor personalizado utilize o prefixo `google`.

Resultado esperado: um embedding nativo do Gemini com uma chave do Google AI Studio no
fornecedor `gemini`, ou um 400 que indique o ID funcional do OpenRouter.

Reprodução (oculte o bearer):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Alternativa funcional:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

O `gemini-embedding-2` nativo não pode funcionar apenas através do GitOps. É necessário
adicionar uma chave do Google AI Studio como uma ligação ao fornecedor `gemini` (através do painel
ou importando `GEMINI_API_KEY` para o OmniRoute). Esse segredo não se encontra neste repositório.

### Caminho multimodal da Jina

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

Utilize `POST /v1/embeddings` até existir um alias.

### Objeto de imagem da Jina / Memorix

Item de imagem canónico do OmniRoute (PNG de 28×28, 784 píxeis — a Jina rejeita 1×1):

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

Resultado real: HTTP **200**, 1 vetor, 1024 dimensões.

Formato nativo do Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Resultado real: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` misturado com `{ "image": "data:..." }` produz o mesmo 400.

## Notas para clientes

### Hindsight 0.9.1

Os embeddings do Hindsight destinam-se apenas a texto (`encode(list[str])`). Este não envia
objetos de imagem. Aponte o URL base de embeddings compatível com OpenAI do Hindsight para
`/v1` do OmniRoute e utilize um ID funcional da tabela acima
(`jina-ai/jina-embeddings-v5-omni-small` ou
`openrouter/google/gemini-embedding-2`). Não defina o modelo como
`gemini-embedding-2` simples, a menos que exista uma chave de API `gemini` no gateway.

### Memorix 1.6.0

O Memorix apenas trata um `baseUrl` que corresponda a `/jina\.ai/i` como multimédia nativa. Um
URL do OmniRoute permanece no caminho reservado a texto, mesmo quando o modelo é Jina omni.
Esse bloqueio é um problema do cliente Memorix. Independentemente disso, o OmniRoute continua a rejeitar
o corpo Jina `{image: "data:..."}` que o Memorix enviaria se o bloqueio fosse ultrapassado,
pelo que os clientes compatíveis com a Jina não conseguem gerar embeddings de imagens através do OmniRoute
sem o esquema canónico `{type,source}`.

Utilize `jina-ai/jina-embeddings-v5-omni-small` para texto. Não aponte o
`base_url` do Memorix para `https://api.jina.ai` — mantenha o OmniRoute como único intermediário.
