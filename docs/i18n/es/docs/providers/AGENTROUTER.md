# AgentRouter Setup Guide (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) es un servicio de retransmisión compatible con Anthropic que revende
Claude y otros modelos, a menudo a precios más bajos que la API directa de Anthropic. Está
diseñado como un reemplazo directo de `ANTHROPIC_BASE_URL` para el cliente oficial de Claude Code,
por lo que solo acepta tráfico que coincida con el formato de comunicación de Claude Code (un
User-Agent específico, indicadores `anthropic-beta`, encabezados del SDK de Stainless, etc.).

## Inicio rápido — usar el proveedor nativo `agentrouter` (recomendado)

Para la mayoría de los usuarios, **no se requiere ninguna configuración especial**. OmniRoute incluye un
proveedor `agentrouter` integrado con el formato de comunicación completo de Claude Code ya incorporado (consulta
`open-sse/config/providerRegistry.ts` → `agentrouter`). Para usarlo:

1. Abre **Panel de control → Proveedores → Añadir proveedor**.
2. Selecciona **AgentRouter** en la lista.
3. Pega tu clave de API `sk-...` y guarda.

Eso es todo: no se necesitan variables de entorno ni un tipo de proveedor personalizado. Los modelos integrados
incluyen `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` y
`deepseek-v3.2`.

El resto de esta guía aborda la **ruta avanzada**: usar el tipo de proveedor
`anthropic-compatible-cc-*`. Úsalo cuando necesites más control
sobre el formato de comunicación; por ejemplo, al conectarte a otros servicios de retransmisión similares a AgentRouter
que aún no estén en el registro de proveedores nativos, o al sobrescribir la
URL base, la ruta de chat o el conjunto de encabezados.

---

## Avanzado: conexión mediante el tipo de proveedor compatible con Claude Code

OmniRoute también admite AgentRouter (y servicios de retransmisión similares) mediante el tipo de proveedor
**compatible con Claude Code** (`anthropic-compatible-cc-*`), que utiliza la
API Messages de Anthropic con el formato de comunicación correcto. Un proveedor genérico
`openai-compatible-chat` que apunte a `https://agentrouter.org`
**no** funcionará: el WAF del servicio ascendente rechaza las solicitudes que no parecen proceder de Claude
Code.

---

## Requisitos previos

- Una cuenta y una clave de API de AgentRouter. Los nuevos registros reciben créditos gratuitos mediante el enlace
  de afiliado incluido en el [README](../README.md) del proyecto.
- OmniRoute ejecutándose con la opción de funcionalidad `ENABLE_CC_COMPATIBLE_PROVIDER` habilitada
  (consulta la sección siguiente).

## 1. Habilitar el tipo de proveedor compatible con CC

El tipo de proveedor compatible con Claude Code está protegido por una opción de funcionalidad porque
envía tráfico que imita fielmente al cliente oficial de Claude Code. Habilítalo
estableciendo una variable de entorno antes de iniciar OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Ejemplo con Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Después de reiniciar, el panel de control muestra una opción **Añadir compatible con Claude Code** además de
los flujos existentes compatibles con OpenAI y Anthropic.

## 2. Crear el proveedor en el panel de control

1. Abre **Panel de control → Proveedores → Añadir proveedor**.
2. Elige **Añadir compatible con Claude Code** (solo es visible cuando se ha establecido la opción anterior).
3. Completa los campos:

| Campo        | Valor                                                                             |
| ------------ | --------------------------------------------------------------------------------- |
| Nombre       | `AgentRouter` (o cualquier etiqueta)                                              |
| Prefijo      | `agentrouter` (alias descriptivo mostrado en los registros y el panel de control) |
| URL base     | `https://agentrouter.org`                                                         |
| Ruta de chat | `/v1/messages?beta=true` (predeterminada; déjala como está)                       |

> El identificador canónico del modelo sigue usando el ID completo del nodo del proveedor
> (`anthropic-compatible-cc-{uuid}/{model}`). El **Prefijo** es solo un alias de visualización
> que `src/lib/usage/callLogs.ts` resuelve para ofrecer una salida de registro más legible.

4. (Opcional) Pega tu clave de API en el campo **Validar** y haz clic en **Comprobar** para
   confirmar la conectividad antes de guardar.
5. Haz clic en **Añadir**.

Una vez creado, abre el proveedor y añade una **Conexión** con tu clave de API de AgentRouter
(`sk-...`). El `test_status` de la conexión debería cambiar a `active`.

## 3. Úsalo mediante un combo o directamente

Haz referencia al modelo utilizando el prefijo de tu proveedor como espacio de nombres:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

El ID canónico del modelo `anthropic-compatible-cc-{uuid}/claude-opus-4-6` también funciona
y es el que aparece en la base de datos y en la configuración del combo.

También puedes añadirlo a un combo para gestionar el enrutamiento, la conmutación por error y las cuotas, como con cualquier otro
proveedor.

---

## Detalles de la imagen de conexión

Como referencia, el puente compatible con cc envía lo siguiente en cada solicitud
ascendente (consulta `open-sse/services/claudeCodeCompatible.ts`):

| Encabezado                                            | Valor                                                                                                                                  |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                       | `Bearer <api-key>`                                                                                                                     |
| `User-Agent`                                          | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                               |
| `anthropic-version`                                   | `2023-06-01`                                                                                                                           |
| `anthropic-beta`                                      | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                               |
| Opción beta por conexión para ocultar el razonamiento | Añade `redact-thinking-2026-02-12` para los servicios ascendentes que requieren específicamente flujos de razonamiento ocultos         |
| Opción por conexión para resumir el razonamiento      | Añade `display: "summarized"` a las solicitudes de razonamiento de CC Compatible que aún no hayan establecido un modo de visualización |
| `anthropic-dangerous-direct-browser-access`           | `true`                                                                                                                                 |
| `x-app`                                               | `cli`                                                                                                                                  |
| `X-Stainless-*`                                       | Diversos encabezados del SDK de Stainless (lenguaje, versión del paquete, SO, arquitectura, etc.)                                      |

Esto es lo que permite que las solicitudes superen el WAF ascendente y la lista de clientes permitidos.

---

## Solución de problemas

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Tu solicitud no
coincidió con la imagen de conexión de Claude Code. Esto sucede cuando el proveedor está configurado
como `openai-compatible-chat` en lugar de `anthropic-compatible-cc`, o cuando la
opción `ENABLE_CC_COMPATIBLE_PROVIDER=true` no se estableció al iniciar.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
«Token no válido». La imagen de conexión es correcta, pero la clave de API ha sido rechazada. Genera una
clave nueva en el panel de AgentRouter y actualiza la conexión.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — El mecanismo de moderación de AgentRouter rechazó el contenido de la solicitud, o el
plan de la clave no permite usar el modelo solicitado. Prueba con otro prompt o modelo;
contacta con el soporte de AgentRouter si un prompt inocuo se bloquea sistemáticamente.

**`[400]: content-blocked` solo en modelos específicos** — La mayoría de los planes de AgentRouter solo
permiten un subconjunto de modelos (p. ej., `claude-opus-4-6`). Otros ID de modelo devuelven
`unauthorized_client_error` aunque la clave sea válida. Comprueba qué modelos
cubre tu plan en el panel de AgentRouter.

**`Invalid JSON response from provider (reset after Ns)` en los registros de omniroute** —
El servicio ascendente devolvió un cuerpo que no era JSON (normalmente, una página de error HTML del WAF).
Esto suele significar que la solicitud nunca llegó al backend de AgentRouter; vuelve a comprobar que
el ID del proveedor comience por `anthropic-compatible-cc-` (ten en cuenta el guion final;
consulta `CLAUDE_CODE_COMPATIBLE_PREFIX` en `open-sse/services/claudeCodeCompatible.ts`)
y que la opción de funcionalidad esté habilitada.

**`unauthorized client detected` / página de error HTML aunque ya exista un proveedor de
AgentRouter** — Probablemente tienes **más de un** proveedor de AgentRouter
y tu solicitud está llegando al incorrecto. Si se creó previamente un proveedor manual
`anthropic-compatible-*` (sin `cc`) u `openai-compatible-chat-*` con el
prefijo `agentrouter`, este puede apropiarse de los ID de modelo `agentrouter/<model>`
(y los combos pueden hacer referencia a él mediante el ID de nodo), por lo que el tráfico se enruta a ese proveedor,
que envía un User-Agent genérico y es rechazado, en lugar de al proveedor integrado
`agentrouter`, que ya incluye la imagen de conexión correcta. Comprueba dónde se
resuelve realmente el modelo en los registros de omniroute (la etiqueta `ROUTING` muestra
`agentrouter/<model> → <providerId>/<model>`); si `<providerId>` no es
`agentrouter`, consolida la configuración en el proveedor nativo: haz que los combos apunten a
`agentrouter/<model>` (providerId `agentrouter`) y elimina los proveedores compatibles
duplicados. El proveedor nativo no necesita configurar la imagen de conexión ni
`customUserAgent`.

---

## Véase también

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Notas sobre la integración del proveedor Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Catálogo de proveedores
  con nivel gratuito
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Implementación de imágenes mediante protocolo de comunicación
