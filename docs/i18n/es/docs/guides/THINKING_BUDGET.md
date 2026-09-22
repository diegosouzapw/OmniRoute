# Thinking Budget (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Panel de control:** Configuración → **IA** → Presupuesto de razonamiento  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Fuente:** `open-sse/services/thinkingBudget.ts`

El presupuesto de razonamiento controla si OmniRoute **reescribe los parámetros de pensamiento/razonamiento del cliente** antes de enviarlos a los proveedores. **No** activa ni desactiva la compresión, el enrutamiento ni la caché de prompts.

## Modos

| Modo                               | Qué hace OmniRoute                                                                                                               | Cuándo usarlo                                                                                                                                                                                                           |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (predeterminado) | Deja intactos los campos del cliente (`reasoning`, `reasoning_effort`, `thinking` de Claude, `thinking_config` de Gemini, etc.). | **Codex / Desktop / cualquier cliente que deba controlar el esfuerzo y los resúmenes de razonamiento.** Es obligatorio para mostrar paneles de pensamiento cuando el cliente solicita `reasoning.summary`.              |
| **`auto`**                         | **Elimina todos** los campos de pensamiento/razonamiento del cuerpo de la solicitud antes de enviarla al proveedor.              | Solo cuando se desea deliberadamente que el **proveedor** determine los valores predeterminados y **no** se necesita que el cliente controle el pensamiento. **No** significa «mostrar automáticamente el pensamiento». |
| **`custom`**                       | Sobrescribe cada solicitud con un presupuesto fijo de tokens de pensamiento.                                                     | Límite estricto de tokens de pensamiento para todo el tráfico.                                                                                                                                                          |
| **`adaptive`**                     | Ajusta el presupuesto a partir de un esfuerzo base utilizando el número de mensajes, las herramientas y la longitud del prompt.  | Control flexible de tokens sin eliminar por completo la intención del cliente.                                                                                                                                          |

### Qué elimina `auto`

Cuando el modo es `auto`, `stripThinkingConfig()` elimina, entre otros:

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking` y `output_config.effort`, cuando está presente
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Si un cliente (p. ej., Codex Desktop) envía `reasoning: { effort: "ultra", summary: "detailed" }`, **`auto` elimina ese objeto**. El proveedor aún puede facturar algunos tokens de razonamiento, pero a menudo devuelve elementos de razonamiento **vacíos o solo cifrados**, por lo que la interfaz no muestra ningún flujo de pensamiento útil.

## Lo que esto **no es**

| Función                                                         | Relación                                                                                                                                            |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Compresión** (Caveman, RTK, apilada, …)                       | Canalización independiente. Funciona con todos los modos de presupuesto de razonamiento.                                                            |
| **Caché de prompts / semántica**                                | Independiente. No se ve afectada por el modo de presupuesto de razonamiento.                                                                        |
| **Enrutamiento combinado / rutas alternativas**                 | Independiente. No se ve afectado.                                                                                                                   |
| **Límites de tokens de claves de API / presupuestos de costes** | Independientes. No se ven afectados.                                                                                                                |
| **Caché de reproducción de razonamiento**                       | Reinserción en varios turnos para proveedores estrictos (DeepSeek, Kimi, Qwen-thinking, …). No es lo mismo que «mostrar el pensamiento» en Desktop. |
| **Descifrado de `encrypted_content`**                           | **Imposible.** Los blobs de razonamiento privados de OpenAI/Codex son opacos. OmniRoute nunca los descifra (#7095 / #7176 / #7304).                 |

## Pensamiento visible (clientes de Codex / Responses)

Para que un cliente muestre el texto del razonamiento, necesitas **todo** lo siguiente:

1. El modo Thinking Budget = **`passthrough`** (o custom/adaptive, siempre que conserve las solicitudes de resumen lo suficiente para la ruta que utilizas).
2. El cliente solicita un resumen, por ejemplo, Codex `model_reasoning_summary = "detailed"` / `auto` (no `none`).
3. El proveedor ascendente realmente transmite `response.reasoning_summary_text.*` (o un `reasoning.summary` no vacío en el elemento).

Si solo obtienes «razonamiento privado cifrado», puede deberse a que:

- el modo era **`auto`** (se eliminó la solicitud del cliente), o
- el proveedor ascendente devolvió `encrypted_content` sin texto de resumen (limitación del proveedor; OmniRoute solo puede mostrar un marcador de posición, no texto sin cifrar).

## Ejemplos de la API

```bash
# Leer
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Recomendado para la visibilidad del razonamiento en Codex / Desktop
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Esquema (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; `customBudget`, `effortLevel`, `baseBudget` y `complexityMultiplier` son opcionales.

### Persistencia / reinicio

El valor se almacena bajo la clave de configuración `thinkingBudget` y se carga al iniciar el proceso (`hydrateThinkingBudgetConfig`). Después de cambiarlo mediante la base de datos o algunas rutas ajenas a la API, **reinicia el proceso de OmniRoute** para que la instancia única en memoria coincida con el disco.

## Lista de comprobación para operadores

- [ ] Usuarios de Codex / Desktop: modo = **passthrough**
- [ ] Mantén activada la compresión si quieres ahorrar tokens en los **mensajes**, no eliminando el razonamiento
- [ ] No esperes que `auto` «muestre más razonamiento»
- [ ] Los resúmenes exclusivamente cifrados son un comportamiento del **proveedor**; passthrough no puede descifrarlos

## Documentación relacionada

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — caché de `reasoning_content` multturno
- [USER_GUIDE.md](./USER_GUIDE.md) — pestañas del panel de configuración
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — endpoints de configuración
