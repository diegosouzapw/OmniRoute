# Embeddings client runbook (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Notas operativas para `POST /v1/embeddings` cuando OmniRoute se sitúa delante de
Hindsight 0.9.1 (`encode(list[str])` solo para texto) y Memorix 1.6.0 (puerta
de medios de Jina). Verificado en producción el 2026-08-17 con OmniRoute 3.8.49 en
`https://omniroute.jaguar-fish.ts.net/v1`. No hay secretos a continuación.

## Id. de modelos que funcionan

| Id. del cliente                                | HTTP | Vectores   | Dim.    | Notas                                              |
| ---------------------------------------------- | ---- | ---------- | ------- | -------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | lote 2 → 2 | 3072    | Funciona sin una clave nativa de Gemini            |
| `openrouter/google/gemini-embedding-2-preview` | 200  | lote 2 → 2 | 3072    | Mismo espacio que el id. sin vista previa          |
| `openrouter/google/gemini-embedding-001`       | 200  | lote 2 → 2 | 3072    | Aparece en `GET /v1/embeddings`                    |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | lote 2 → 2 | 1024    | Id. omni canónico de Jina                          |
| `jina/jina-embeddings-v5-omni-small`           | 200  | lote 2 → 2 | 1024    | Alias; el `model` de la respuesta es `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | lote 2 → 2 | 1024    | El id. sin prefijo también se resuelve             |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1      | **768** | Espacio vectorial diferente al de small            |

`GET /v1/models` y `GET /v1/embeddings` mostraron
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) y
`openrouter/google/gemini-embedding-001`. **No** mostraron
`openrouter/google/gemini-embedding-2`, aunque ese id. ya está operativo.

No mezcle nano (768 dimensiones) y small (1024 dimensiones) en un mismo índice. No son
comparables.

## Id. rotos o engañosos

### Gemini Embedding 2 nativo

Solicitud:

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

`gemini/gemini-embedding-2` devuelve el mismo 400. `google/gemini-embedding-2`
devuelve HTTP **400** `Unknown embedding provider: google`, salvo que un nodo
de proveedor personalizado use el prefijo `google`.

Resultado esperado: una incrustación nativa de Gemini con una clave de Google AI Studio en el
proveedor `gemini`, o un 400 que indique el id. funcional de OpenRouter.

Reproducción (oculte el token de portador):

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

El `gemini-embedding-2` nativo no puede funcionar únicamente mediante GitOps. Debe añadirse
una clave de Google AI Studio como conexión del proveedor `gemini` (mediante el panel o
importando `GEMINI_API_KEY` en OmniRoute). Ese secreto no está en este repositorio.

### Ruta multimodal de Jina

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

Use `POST /v1/embeddings` hasta que exista un alias.

### Objeto de imagen de Jina/Memorix

Elemento de imagen canónico de OmniRoute (PNG de 28×28, 784 píxeles; Jina rechaza imágenes de 1×1):

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

Resultado real: HTTP **200**, 1 vector, 1024 dimensiones.

Formato nativo de Memorix 1.6.0/Jina:

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

La mezcla de `{ "text": "..." }` con `{ "image": "data:..." }` produce el mismo 400.

## Notas sobre los clientes

### Hindsight 0.9.1

Las incrustaciones de Hindsight son solo para texto (`encode(list[str])`). No envía
objetos de imagen. Configure la URL base de incrustaciones compatible con OpenAI de Hindsight para que apunte a
`/v1` de OmniRoute y use un id. funcional de la tabla anterior
(`jina-ai/jina-embeddings-v5-omni-small` u
`openrouter/google/gemini-embedding-2`). No establezca como modelo el
`gemini-embedding-2` sin prefijo, salvo que exista una clave de API de `gemini` en la puerta de enlace.

### Memorix 1.6.0

Memorix solo trata como medios nativos los `baseUrl` que coinciden con `/jina\.ai/i`. Una
URL de OmniRoute permanece en la ruta exclusiva para texto incluso cuando el modelo es Jina omni.
Esa puerta es un problema del cliente Memorix. De forma independiente, OmniRoute sigue rechazando
el cuerpo de Jina `{image: "data:..."}` que Memorix enviaría si la puerta
se abriera, por lo que los clientes compatibles con Jina no pueden incrustar imágenes mediante OmniRoute
sin el esquema canónico `{type,source}`.

Use `jina-ai/jina-embeddings-v5-omni-small` para texto. No configure Memorix
`base_url` para que apunte a `https://api.jina.ai`; mantenga OmniRoute como el único salto.
