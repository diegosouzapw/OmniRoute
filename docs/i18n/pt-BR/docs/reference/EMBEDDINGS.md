# Embeddings client runbook (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Notas operacionais para `POST /v1/embeddings` quando o OmniRoute está à frente do
Hindsight 0.9.1 (`encode(list[str])` somente para texto) e do Memorix 1.6.0
(bloqueio de mídia da Jina). Verificado em ambiente ativo em 2026-08-17 com o
OmniRoute 3.8.49 em `https://omniroute.jaguar-fish.ts.net/v1`. Nenhum segredo abaixo.

## IDs de modelos funcionais

| ID do cliente                                  | HTTP | Vetores    | Dim     | Observações                                  |
| ---------------------------------------------- | ---- | ---------- | ------- | -------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | lote 2 → 2 | 3072    | Funciona sem uma chave nativa do Gemini      |
| `openrouter/google/gemini-embedding-2-preview` | 200  | lote 2 → 2 | 3072    | Mesmo espaço vetorial que o ID sem preview   |
| `openrouter/google/gemini-embedding-001`       | 200  | lote 2 → 2 | 3072    | Listado em `GET /v1/embeddings`              |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | lote 2 → 2 | 1024    | ID omni canônico da Jina                     |
| `jina/jina-embeddings-v5-omni-small`           | 200  | lote 2 → 2 | 1024    | Alias; o `model` da resposta é `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | lote 2 → 2 | 1024    | O ID sem prefixo também é resolvido          |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1      | **768** | Espaço vetorial diferente do small           |

`GET /v1/models` e `GET /v1/embeddings` listaram
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) e
`openrouter/google/gemini-embedding-001`. Eles **não** listaram
`openrouter/google/gemini-embedding-2`, embora esse ID já esteja atendendo requisições.

Não misture nano (768-d) e small (1024-d) em um mesmo índice. Eles não são
comparáveis.

## IDs com problemas / enganosos

### Gemini Embedding 2 nativo

Requisição:

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

`gemini/gemini-embedding-2` retorna o mesmo 400. `google/gemini-embedding-2`
retorna HTTP **400** `Unknown embedding provider: google`, a menos que um nó
de provedor personalizado use o prefixo `google`.

Esperado: ou um embedding nativo do Gemini com uma chave do Google AI Studio
no provedor `gemini`, ou um 400 que informe o ID funcional do OpenRouter.

Reprodução (remova o bearer):

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

O `gemini-embedding-2` nativo não pode funcionar apenas com o GitOps. Uma chave
do Google AI Studio deve ser adicionada como uma conexão do provedor `gemini`
(pelo painel ou por meio de `GEMINI_API_KEY` importada para o OmniRoute). Esse
segredo não está neste repositório.

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

Use `POST /v1/embeddings` até que exista um alias.

### Objeto de imagem Jina / Memorix

Item de imagem canônico do OmniRoute (PNG de 28×28, 784 pixels — a Jina rejeita 1×1):

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

Resultado real: HTTP **200**, 1 vetor, 1024-d.

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

`{ "text": "..." }` misturado com `{ "image": "data:..." }` resulta no mesmo 400.

## Notas sobre os clientes

### Hindsight 0.9.1

Os embeddings do Hindsight são somente para texto (`encode(list[str])`). Ele não
envia objetos de imagem. Aponte a URL base de embeddings compatível com OpenAI
do Hindsight para `/v1` do OmniRoute e use um ID funcional da tabela acima
(`jina-ai/jina-embeddings-v5-omni-small` ou
`openrouter/google/gemini-embedding-2`). Não defina o modelo como
`gemini-embedding-2` sem prefixo, a menos que exista uma chave de API `gemini`
no gateway.

### Memorix 1.6.0

O Memorix somente trata um `baseUrl` que corresponda a `/jina\.ai/i` como mídia
nativa. Uma URL do OmniRoute permanece no caminho somente para texto, mesmo
quando o modelo é Jina omni. Esse bloqueio é um problema do cliente Memorix.
Independentemente disso, o OmniRoute ainda rejeita o corpo Jina
`{image: "data:..."}` que o Memorix enviaria se o bloqueio fosse liberado;
portanto, clientes compatíveis com a Jina não conseguem gerar embeddings de
imagens por meio do OmniRoute sem o esquema canônico `{type,source}`.

Use `jina-ai/jina-embeddings-v5-omni-small` para texto. Não aponte o
`base_url` do Memorix para `https://api.jina.ai` — mantenha o OmniRoute como o
único intermediário.
