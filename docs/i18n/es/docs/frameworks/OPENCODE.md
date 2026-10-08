# OpenCode Integration (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Estado:** Disponibilidad general.
> **Audiencia:** Operadores que conectan OpenCode con un despliegue de OmniRoute.
> **Fuente de referencia (esquema de configuración):** `src/shared/services/opencodeConfig.ts`
> **Fuente de referencia (paquete npm):** `@omniroute/opencode-provider/` (espacio de trabajo publicable)

[OpenCode](https://opencode.ai) es un cliente de IA agéntico para CLI y escritorio. Lee su catálogo de proveedores desde `~/.config/opencode/opencode.json` (o `opencode.jsonc`) y sigue el esquema disponible en `https://opencode.ai/config.json`. OmniRoute se presenta ante OpenCode como uno de esos proveedores: cada solicitud fluye a través de la interfaz `/v1` estándar de OmniRoute compatible con OpenAI, por lo que OpenCode se beneficia automáticamente del enrutamiento Auto-Combo, los disyuntores, las políticas de claves, la observabilidad, etc.

Existen **dos vías de integración compatibles**. Elija una: ambas generan la misma configuración.

---

## Vía 1 — Generador de CLI (sin instalar npm)

Recomendada para usuarios finales. Se incluye con OmniRoute. Escribe `opencode.json` directamente.

```bash
# Después de instalar OmniRoute (npm i -g @omniroute/cli o mediante un clon local)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Internamente, la CLI llama a `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), por lo que un archivo `opencode.json` existente conserva sus demás proveedores y comentarios. La entrada de OmniRoute se añade o reemplaza de forma atómica.

Archivo resultante (catálogo de modelos predeterminado):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<su-clave>",
      },
      "models": {
        "claude-opus-4-5-thinking": { "name": "claude-opus-4-5-thinking" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" },
      },
    },
  },
}
```

---

## Vía 2 — Paquete npm `@omniroute/opencode-provider`

Recomendada cuando se automatiza la configuración desde Node/TS (canalizaciones de CI, monorepositorios, flujos de instalación personalizados).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Opcional: sustituya el catálogo de modelos expuesto a OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Para realizar una combinación no destructiva con un archivo existente, replique `mergeOpenCodeConfigText()` desde `opencodeConfig.ts` o invoque el generador de la CLI.

Consulte el [README del paquete](../../@omniroute/opencode-provider/README.md) para conocer la API completa.

---

## Qué hace realmente el entorno de ejecución

Ambas vías generan el mismo valor `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Durante la ejecución, OpenCode carga `@ai-sdk/openai-compatible` (que ya es una dependencia transitiva de OpenCode) y lo configura con `baseURL` + `apiKey`. A partir de ahí:

```
Interfaz/agente de OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (interfaz de OmniRoute compatible con OpenAI)
         → Manejador /v1/chat/completions de OmniRoute     (open-sse/handlers/chatCore.ts)
            → enrutamiento combinado / Auto-Combo / ejecutor
               → proveedor ascendente
```

El complemento nunca interactúa con HTTP. Solo genera la configuración.

---

## Valores predeterminados del catálogo de modelos

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Puedes sobrescribirlos mediante `models: [...]`. Adiciones recomendadas:

- `"auto"` — expone [Auto-Combo](../routing/AUTO-COMBO.md) de OmniRoute, el enrutador sin configuración. Permite que OpenCode elija «el mejor modelo disponible» sin que tengas que codificar de forma fija el catálogo.
- `"<combo-name>"` — cualquier combinación que hayas definido en el panel; OmniRoute la resuelve de forma transparente.

---

## Normalización de URL

La función auxiliar acepta ambos formatos y genera exactamente un `/v1`:

| Entrada                        | Salida (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Esta deduplicación es **el problema más común** observado en configuraciones antiguas. Si tienes un `opencode.json` anterior a v3.8.0 que apunta a `/v1/v1/...`, vuelve a ejecutar el generador o llama de nuevo a `createOmniRouteProvider`.

---

## Modos de autenticación

| Configuración de OmniRoute                          | Valor recomendado de `apiKey`                               |
| --------------------------------------------------- | ----------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (predeterminado localmente) | `sk_omniroute` (marcador de posición literal)               |
| `REQUIRE_API_KEY=true`                              | Una clave de API real por usuario de Panel → Claves de API. |

Para los clientes de estilo Anthropic que envían `x-api-key` + `anthropic-version`, `extractApiKey` de OmniRoute también acepta la clave de `x-api-key`. OpenCode utiliza la interfaz de OpenAI, por lo que siempre enviará `Authorization: Bearer ${apiKey}`; en este caso no se aplica ningún tratamiento especial para Anthropic.

---

## Solución de problemas

| Síntoma                                                   | Causa                                                                                      | Solución                                                                                              |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `404` en cada solicitud cuya URL contiene `/v1/v1/`       | Configuración obsoleta de un complemento anterior a v3.8 que añadía `/v1` dos veces.       | Vuelve a generarla mediante la Ruta 1 o 2.                                                            |
| `401 Invalid API key`                                     | OmniRoute tiene `REQUIRE_API_KEY=true` y la clave es desconocida.                          | Crea la clave en el panel o establece `REQUIRE_API_KEY=false` (solo localmente) y usa `sk_omniroute`. |
| Lista de modelos vacía en la interfaz de OpenCode         | Los 4 modelos predeterminados están ocultos en la visibilidad de proveedores de OmniRoute. | Usa `models: ["auto", ...]` para mostrar los que hayas habilitado.                                    |
| Error 500 de OpenCode con `cannot read property 'models'` | Las versiones antiguas de OpenCode (< 0.1.x) no aceptaban `models` en línea.               | Actualiza OpenCode a una versión que siga el esquema v1 (`opencode.ai/config.json`).                  |

---

## Véase también

- [Referencia de la API](../reference/API_REFERENCE.md) — superficie REST completa de OmniRoute
- [Auto-Combo](../routing/AUTO-COMBO.md) — qué significa `model: "auto"`
- [README de `@omniroute/opencode-provider`](../../@omniroute/opencode-provider/README.md)
- Código fuente: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
