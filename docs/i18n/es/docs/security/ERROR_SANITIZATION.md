# Error Message Sanitization (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Fuente de referencia:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` y los constructores públicos de `open-sse/utils/error.ts`
> **Pruebas:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Última actualización:** 2026-09-02 — v3.8.51
> **Audiencia:** Cualquier ingeniero que trabaje con respuestas de error (rutas HTTP, flujos SSE, ejecutores, controladores MCP).
> **Estado:** **OBLIGATORIO** para toda ruta de código que devuelva un mensaje de error a un cliente.

## Por qué existe esto

La regla `js/stack-trace-exposure` (CWE-209) de CodeQL marca cualquier ruta de código en la que un mensaje de error procedente de una excepción en tiempo de ejecución llega a una respuesta HTTP / SSE sin haber sido saneado. Las trazas de pila y las rutas absolutas de archivos en respuestas de producción proporcionan a los atacantes:

- La estructura de directorios interna (`/srv/app/src/lib/...`) → reconocimiento para ataques posteriores.
- Versiones de bibliotecas / frameworks inferidas a partir de los marcos de pila → selección dirigida de exploits.
- Valores confidenciales de tiempo de ejecución que pueden haberse interpolado como cadenas en los errores (consultas de bases de datos, valores de configuración).

El auxiliar `sanitizeErrorMessage` exportado por `open-sse/utils/error.ts` elimina estas clases de
filtraciones:

1. Sufijos de marcos de pila de JavaScript físicos, serializados e inequívocamente insertados en línea.
2. Rutas absolutas de sistemas de archivos POSIX, Windows, UNC y `file://`, al tiempo que conserva las URL HTTPS seguras
   y las rutas de API marcadas explícitamente.
3. Asignaciones de credenciales, formatos comunes de tokens de proveedores, bloques PEM de claves privadas y URL de datos
   base64.

El saneador limita la longitud de la entrada y aplica un cierre seguro cuando un valor lanzado rechaza la conversión a cadena.
El saneamiento recursivo del JSON ascendente también descarta claves de credenciales/rutas no seguras, alias de sesión y
claves de control de prototipos antes de serializar una respuesta.

## El patrón obligatorio

### 1. Construcción de una respuesta de error (rutas HTTP / API)

Use `buildErrorBody()` — el saneamiento está integrado:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... lógica del controlador ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

O bien, para los envoltorios prácticos del mismo módulo:

```ts
import {
  errorResponse, // objeto Response de una sola operación
  writeStreamError, // escritor SSE
  createErrorResult, // estructura { success: false, status, response, ... }
  unavailableResponse, // añade Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Todos ellos aplican el límite canónico de errores públicos. `errorResponse`, `writeStreamError` y
`createErrorResult` pasan por `buildErrorBody`; los tres auxiliares especializados de reintento/circuito
proyectan y sanean directamente su contexto público. **Nunca necesita llamar a
`sanitizeErrorMessage` manualmente** cuando usa estos auxiliares.

### 2. Envoltorios de error personalizados (poco frecuente)

Cuando no pueda usar los auxiliares anteriores (p. ej., porque la estructura de la respuesta viene dictada por un protocolo ascendente como Connect-RPC), importe `sanitizeErrorMessage` directamente:

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

Esta es la única forma autorizada de ensamblar un cuerpo de error personalizado. Consulte `open-sse/executors/cursor.ts::buildErrorResponse` para ver la implementación de referencia.

### 3. Registro frente a respuesta

Las excepciones internas de confianza pueden conservar su mensaje completo y su traza para que los operadores puedan depurar. Los valores
procedentes de límites relacionados con proveedores, validación, sesiones del navegador o credenciales deben
sanearse antes de que lleguen a la salida de la consola, los metadatos de auditoría o los registros persistentes de llamadas. Patrón:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "falló el controlador"); // solo para excepciones internas de confianza
  return errorResponse(500, getErrorMessage(err)); // saneado — enviado al cliente
}
```

Para los fallos controlados por proveedores, proyecte también el valor registrado:

```ts
log.error({
  message: sanitizeErrorMessage(err) || "Falló la solicitud al proveedor",
});
```

### 4. Patrones prohibidos

❌ **Nunca** incluya la salida sin procesar de una excepción en el cuerpo de una Response:

```ts
// INCORRECTO: la traza de pila y las rutas de archivos llegan al cliente
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Nunca** implemente su propio divisor de la primera línea:

```ts
// INCORRECTO: no elimina las rutas absolutas y puede divergir del auxiliar canónico
const safe = String(err).split("\n")[0];
```

❌ **Nunca** aplique el saneamiento en la ruta y olvide la ruta SSE. Todo lo que escriba en un flujo debe pasar por `writeStreamError` (o por su `buildErrorBody` subyacente).

❌ **Nunca** incluya intencionadamente `process.cwd()`, `__filename`, `__dirname` o rutas derivadas de variables de entorno
en mensajes de error. El saneador cubre las rutas absolutas como defensa en profundidad, pero quienes realizan las llamadas no deben
construir en primer lugar mensajes que revelen la topología.

## Cobertura en CI

`tests/unit/error-message-sanitization.test.ts` garantiza:

- Cada ruta bajo `/api/model-combo-mappings/*` devuelve cuerpos saneados para respuestas 4xx/5xx.
- `sanitizeErrorMessage` elimina trazas de pila de varias líneas.
- `sanitizeErrorMessage` reemplaza rutas absolutas de POSIX y Windows por `<path>`.
- `sanitizeErrorMessage` gestiona de forma segura entradas `null`/`undefined`/instancias de `Error`.
- `buildErrorBody` nunca expone trazas de pila en su campo `message`.

Al añadir una nueva ruta o ejecutor, copie el patrón de aserciones de este archivo. El umbral de cobertura (`npm run test:coverage`) exige ≥60 % de sentencias/líneas/funciones/ramas; las rutas de error deben estar cubiertas.

## Controles relacionados

- Las alertas de CodeQL `js/stack-trace-exposure` en `.github/security` siempre deben **o bien** corregirse mediante estas funciones auxiliares, **o bien** descartarse con un comentario que cite este documento.
- La configuración de censura de `pino` (`src/shared/utils/logRedaction.ts`) gestiona por separado los registros estructurados de confianza. Este documento abarca los mensajes de respuesta públicos y los valores controlados por el proveedor que atraviesan los límites persistentes de registros de llamadas/proxy.
- La lista de exclusión de encabezados ascendentes (`src/shared/constants/upstreamHeaders.ts`) abarca la filtración de encabezados; mantenga ambos archivos alineados al añadir un nuevo riesgo de exfiltración.

## Transferencia de detalles ascendentes

`buildErrorBody` acepta un tercer argumento opcional, `upstreamDetails` (el cuerpo sin procesar analizado del proveedor ascendente). Cuando se proporciona, `sanitizeUpstreamDetails` lo sanea antes de incluirlo en la respuesta como `upstream_details`.

Un cuarto argumento opcional, `classification`
(`{ type?: string; code?: string; reason?: string }`), acepta una clasificación pública explícita.
Cada campo se proyecta sobre el vocabulario acotado de identificadores públicos. Los valores no seguros, con formato de credencial, con caracteres de control o demasiado largos recurren al tipo/código derivado del estado; se omite un motivo opcional que no sea seguro. Los identificadores de estado HTTP de tres dígitos (`100` a `599`) siguen siendo válidos para contratos de proveedores que exponen el estado numérico ascendente como código legible por máquina. El mismo intervalo acotado se acepta en el formato de marcador de posición de estado HTTP generado localmente; los números y nombres arbitrarios del proveedor quedan fuera del vocabulario.

Pase cada clasificación explícita en ese cuarto argumento. Nunca sobrescriba
`body.error.code`, `body.error.type` ni `body.error.reason` después de que `buildErrorBody()` retorne;
la mutación posterior a la construcción omite la proyección pública.

Reglas de saneamiento aplicadas a `upstreamDetails`:

1. Hojas de tipo cadena: se procesan mediante `sanitizeErrorMessage` (elimina las pilas y las rutas absolutas).
2. Se eliminan las claves no seguras relacionadas con rutas, credenciales, alias de sesión y control de prototipos.
3. Límite de profundidad: el anidamiento superior a 4 niveles se reemplaza por la cadena `"[truncated]"`.
4. Los arrays se limitan a 32 elementos.

Solo los lugares de llamada que dispongan de un cuerpo de error analizado del proveedor deben pasar `upstreamDetails`. Los errores internos de OmniRoute (fallos de análisis de SSE, contenido vacío, bloqueos de barreras de protección) no deben incluirlo.

NO pase `err.stack`, `err.message` sin procesar ni ninguna cadena procedente de una excepción en tiempo de ejecución a
`upstreamDetails`. Estos deben seguir pasando por `errorResponse` / `buildErrorBody(code, msg)`
sin un cuerpo ascendente.

La transferencia selectiva de respuestas 4xx ascendentes conserva la estructura JSON segura y la redacción del proveedor necesarias para la recuperación automática del cliente, pero no es una transferencia byte por byte: el saneador recursivo siempre se ejecuta antes de la serialización. Los cuerpos cíclicos, que contienen BigInt o con `toJSON()` hostil se rechazan de forma segura y no son aptos para la transferencia. OCR y moderación aplican la misma regla; los cuerpos ascendentes que no sean JSON, estén vacíos o estén etiquetados incorrectamente se convierten en el contenedor de error JSON canónico de OmniRoute.

## Limitación conocida de CodeQL: no se reconocen los sanitizadores personalizados

La consulta de CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) utiliza una lista fija de patrones de sanitización permitidos (p. ej., `.split("\n")[0]` en línea, `String#replace` con formas específicas de expresiones regulares, acceso a `.message` en `Error`). **No** reconoce la indirección a través de una función auxiliar personalizada como nuestra `sanitizeErrorMessage()`.

Esto significa que los puntos de llamada que sanitizan de forma demostrable mediante este módulo —por ejemplo, `open-sse/utils/error.ts::errorResponse` y `open-sse/executors/cursor.ts::buildErrorResponse`— pueden seguir generando la alerta aunque el código sea funcionalmente seguro. Desestimaciones precedentes: `#224`, `#231` (mayo de 2026), ambas marcadas como `false positive` con justificación técnica.

**Cómo gestionar una nueva aparición:**

1. Confirma que el punto de llamada realmente enruta el mensaje a través de `sanitizeErrorMessage` / `buildErrorBody` / uno de los envoltorios documentados anteriormente (lee la cadena de llamadas de principio a fin; no confíes en un comentario).
2. Confirma que `tests/unit/error-message-sanitization.test.ts` ejercita la ruta (o añade cobertura).
3. Desestima la alerta mediante `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'`, haciendo referencia a este documento.
4. **No** lo «corrijas» insertando `.split("\n")[0]` en línea en todas partes: la función auxiliar es la única fuente de verdad; duplicar el patrón debilita el sanitizador (se pierden la eliminación de rutas, el límite de longitud y la conversión de tipos) solo para aparentar que se satisface al escáner.

Adoptar funciones opcionales como la [configuración de sanitizadores personalizados de `@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) de CodeQL es la solución a largo plazo; queda fuera del alcance de este documento.

## Referencias

- [CWE-209: Exposición de información mediante un mensaje de error](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Hoja de referencia para la gestión de errores](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit que centraliza la función auxiliar: `1a39c31f` — _fix(security): enmascarar credenciales públicas de servicios externos + centralizar la sanitización de errores_
