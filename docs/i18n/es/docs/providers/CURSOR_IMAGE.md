# Cursor Image Generation (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute expone la **generación de imágenes** del plan de Cursor en `POST /v1/images/generations` mediante el mismo id de proveedor que el chat: `cursor` (alias `cu`).

| Campo                   | Valor                                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------------- |
| id de `IMAGE_PROVIDERS` | `cursor`                                                                                                 |
| Formato                 | `cursor-agent-image`                                                                                     |
| Autenticación           | La misma conexión OAuth / mediante clave de API que el chat (`provider_connections.provider = "cursor"`) |
| Modelos                 | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                                |

## Por qué se usa Agent CLI

El chat de Cursor en OmniRoute utiliza `agent.v1.AgentService/Run` (protobuf). Esa vía **rechaza** las herramientas integradas del cliente (shell, escritura, etc.). La generación de imágenes es una herramienta nativa de Cursor que la **CLI `agent`** ejecuta mediante la cuenta. Por lo tanto, el controlador de imágenes inicia `agent` con un prompt bloqueado y un espacio de trabajo temporal por solicitud (con la misma estructura que los puentes de cuentas de la comunidad) y, a continuación, devuelve `b64_json` compatible con OpenAI.

## Restricción de acceso (Reglas estrictas n.º 15 y 17)

Este es el único formato de `IMAGE_PROVIDERS` que inicia un proceso secundario (el binario `agent`). Dado que `POST /v1/images/generations` se comparte con unos 40 proveedores de imágenes adicionales que no inician procesos y que los clientes remotos utilizan legítimamente, la ruta completa **no** se clasifica como `LOCAL_ONLY`. En su lugar, `handleCursorAgentImageGeneration` aplica su propia restricción mediante el veredicto de confianza `AUTHZ_HEADER_PEER_LOCALITY` que la canalización de autorización añade a cada solicitud (a partir del par TCP real, nunca del encabezado `Host`, que se puede suplantar): solo los clientes `loopback` y `lan` pueden iniciar el proceso; cualquier otro cliente (incluida una clave de API filtrada y reutilizada a través de un túnel público) recibe un error `403` antes de que se realice cualquier búsqueda de credenciales o se inicie un proceso. Consulta `src/server/authz/policies/management.ts` para ver la misma política aplicada al resto del nivel `LOCAL_ONLY`.

## La restricción de concurrencia está en el ámbito del módulo (limitación de instancia única)

`CURSOR_IMG_MAX_CONCURRENT` se aplica mediante un contador/una cola en memoria cuyo ámbito es la instancia del módulo de Node (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`). Limita correctamente los inicios simultáneos de `agent` dentro de un proceso de OmniRoute, pero **no** coordina varios procesos/instancias que compartan la misma cuenta de Cursor (por ejemplo, un despliegue con varias réplicas): cada instancia aplica su propio límite independiente. En un despliegue de instancia única (el valor predeterminado), esto es exacto; los despliegues con escalado horizontal deben mantener un valor conservador de `CURSOR_IMG_MAX_CONCURRENT` por instancia o dirigir el tráfico de imágenes de Cursor a una única instancia.

## Requisitos

1. Una cuenta de Cursor conectada en el panel (OAuth o clave de API `crsr_…`).
2. El binario de Cursor Agent disponible para el proceso de OmniRoute:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, o
   - `~/.local/bin/agent`, o
   - `providerSpecificData.agentBin` en la conexión de Cursor.

Ajustes opcionales:

| Env                         | Valor predeterminado              | Significado                                         |
| --------------------------- | --------------------------------- | --------------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                          | Tiempo de reloj por imagen                          |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                               | Restricción de concurrencia de la cuenta compartida |
| `CURSOR_IMG_MODEL`          | (modelo de la solicitud / `auto`) | Sustituye `--model` de la CLI                       |

## Ejemplo

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

La generación suele tardar entre 1 y 2 minutos. Es preferible utilizar una ruta de red interna; los proxies perimetrales con tiempos de espera de unos 100 segundos fallarán.

## LiteLLM

Registra un modelo de imágenes con `mode: image_generation`, `api_base: http://omniroute:20128/v1` y `model: openai/cursor/auto` (o simplemente `cursor/auto`, según tu versión de LiteLLM).
