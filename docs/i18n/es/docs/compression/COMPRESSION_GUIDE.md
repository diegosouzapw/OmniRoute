# 🗜️ Prompt Compression Guide — OmniRoute (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Ahorra automáticamente entre un 15 % y un 95 % del contexto apto. Para obtener una vista general rápida, consulta la [sección Compresión del README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Descripción general

OmniRoute implementa una canalización modular de compresión de prompts que se ejecuta **proactivamente** antes de que las solicitudes lleguen a los proveedores upstream. Esto significa que el ahorro de tokens se produce de forma transparente, sin necesidad de realizar cambios en tu flujo de trabajo.

```
Solicitud del cliente
  → Selector de estrategia de compresión
    → ¿Sobrescritura por combo? → Usar la configuración del combo
    → ¿Umbral de activación automática? → Usar el modo automático
    → ¿Modo predeterminado? → Usar la configuración global
    → ¿Desactivado? → Omitir la compresión
  → Modo de compresión seleccionado
    → Desactivado: Sin compresión
    → Ligero: Limpieza segura de espacios en blanco/formato (~15 %)
    → Estándar: Eliminación de relleno al estilo telegráfico (~30 %)
    → Agresivo: Envejecimiento del historial + resumen (~50 %)
    → Ultra: Poda heurística + reducción de bloques de código (~75 %)
    → RTK: Filtrado de salida de terminal/herramientas basado en comandos (rango upstream del 60-90 %)
    → Apilado: Canalización ordenada de varios motores, normalmente RTK y después Caveman (rango apto del 78-95 %)
  → Solicitud comprimida → Proveedor
```

---

## Modos de compresión

### Desactivado

No se aplica ninguna compresión. Todos los mensajes pasan sin cambios.

### Modo ligero (~15 % de ahorro, <1 ms de latencia)

El modo más seguro: ningún cambio semántico, solo limpieza de formato:

| Técnica                  | Descripción                                              |
| ------------------------ | -------------------------------------------------------- |
| `collapseWhitespace`     | Combina líneas en blanco consecutivas y espacios finales |
| `dedupSystemPrompt`      | Elimina mensajes de sistema duplicados                   |
| `compressToolResults`    | Comprime salidas detalladas de herramientas/funciones    |
| `removeRedundantContent` | Elimina instrucciones repetidas                          |
| `replaceImageUrls`       | Acorta los URI de datos de imágenes en base64            |

**Ideal para:** Uso continuo y flujos de trabajo críticos para la seguridad.

### Modo estándar (~30 % de ahorro)

Inspirado en [Caveman](https://github.com/JuliusBrussee/caveman): elimina palabras de relleno y expresiones verbosas, a la vez que conserva el significado:

- Elimina palabras de relleno ("por favor", "creo que", "básicamente", "en realidad")
- Condensa expresiones verbosas ("con el fin de" → "para", "como resultado de" → "porque")
- Elimina fórmulas de cortesía atenuantes ("¿Te importaría...?", "Si fuera posible...")
- Más de 30 reglas de expresiones regulares optimizadas para prompts de programación

**Ideal para:** Flujos de trabajo diarios de programación y equipos preocupados por los costes.

### Modo agresivo (~50 % de ahorro)

Gestión inteligente del historial para sesiones largas:

- **Envejecimiento de mensajes** — los mensajes antiguos se comprimen progresivamente
- **Resumen de resultados de herramientas** — las salidas largas de herramientas se sustituyen por resúmenes
- **Protecciones de integridad estructural** — garantizan que los pares `tool_use` + `tool_result` se mantengan coherentes
- **Consideración de la ventana de contexto** — respeta los límites de tokens de cada modelo

**Ideal para:** Sesiones de depuración prolongadas y bases de código grandes.

### Modo ultra (~75 % de ahorro)

Compresión máxima para situaciones en las que los tokens son críticos:

- **Poda heurística** — elimina mensajes por debajo del umbral de relevancia
- **Reducción de bloques de código** — comprime ejemplos de código repetitivos
- **Truncamiento mediante búsqueda binaria** — encuentra el punto de corte óptimo para la ventana de contexto
- Incluye todas las funciones del modo agresivo

**Ideal para:** Cuando alcanzas repetidamente los límites de contexto.

### Modo RTK (rango upstream del 60-90 %)

El modo RTK está optimizado para las salidas detalladas de herramientas que aparecen en las sesiones con agentes de programación:

- Detecta clases de comandos/salidas como `git status`, `git diff`, `git log`, ejecutores de pruebas,
  compilaciones de TypeScript/Vite/Webpack, ESLint/Biome/Prettier, auditorías/instalaciones de npm, registros de Docker, salidas
  de infraestructura y salidas genéricas del shell
- Aplica paquetes de filtros JSON desde `open-sse/services/compression/engines/rtk/filters/`
- Importa filtros del esquema TOML v1 de RTK desde archivos `filters.toml` globales o del proyecto, con validación
  de pruebas integradas y control de confianza para los archivos del proyecto
- Incluye 49 filtros integrados con muestras de verificación en línea
- Elimina secuencias de control ANSI, barras de progreso, líneas repetidas y ruido que no permite tomar medidas
- Conserva fallos, errores, advertencias, archivos modificados, resúmenes y la parte final de las salidas largas
- Admite filtros de proyecto sujetos a controles de confianza, filtros globales y recuperación opcional de la salida sin procesar y redactada

**Ideal para:** Sesiones con agentes que incluyen transcripciones de shell, compilación, pruebas, git, grep y salidas de archivos.

### Modo apilado (rango apto del 78-95 %)

El modo apilado ejecuta varios motores de compresión en un orden determinista. La canalización predeterminada es:

```txt
RTK -> Caveman
```

Este orden compacta primero la salida de terminal/herramientas y, a continuación, aplica la condensación semántica de Caveman al
prompt restante en lenguaje natural. Las canalizaciones apiladas pueden configurarse globalmente o mediante
combos de compresión asignados a combos de enrutamiento.

**Ideal para:** Contextos mixtos con registros extensos de herramientas, además de instrucciones humanas o resúmenes del asistente.

---

## Cálculo del ahorro con los proyectos de origen

OmniRoute documenta los ahorros por compresión a partir de dos fuentes: las pruebas de rendimiento de los proyectos de origen y
la propia composición de motores de OmniRoute.

| Fuente  | Cifra del README del proyecto de origen utilizada aquí                                                                                                |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` menos tokens de salida, `65%` de ahorro medio de salida en las pruebas, intervalo de `22-87%` y herramienta de compresión de entrada de `~46%` |
| RTK     | Ahorro de `60-90%` en la salida de comandos; sesión de ejemplo de `~118,000 -> ~23,900` tokens, es decir, `79.7%` de ahorro (`~80%`)                  |

Para las cargas útiles de herramientas/contexto que se solapan, la combinación predeterminada de OmniRoute apila los motores:

```txt
RTK -> Caveman
```

Los ahorros combinados son multiplicativos, no aditivos:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Esa cifra de `78-95%` se aplica cuando tanto RTK como Caveman pueden reducir la misma carga útil de entrada/contexto.
El modo de salida de respuestas de Caveman es independiente: cuando está habilitado, se utilizan los ahorros de salida propios de Caveman (`65%`
de media, `~75%` como cifra destacada e intervalo de `22-87%`). Los ahorros totales de facturación dependen de la combinación de prompts y salidas.

### Qué significa realmente "elegible"

El intervalo destacado del 15-95% es real, pero solo se aplica a contenido **redundante o verboso**: líneas de
error repetidas, un registro de compilación que inunda la salida con la misma advertencia o un volcado sobredimensionado de `grep`/lectura de archivos. Esto
**no** significa que todas las solicitudes ahorren esa cantidad.

Verificado empíricamente (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): una
ejecución `stacked` (RTK + Caveman) sobre un bloque `tool_result` con formato de Anthropic que contenía 300 líneas
de error idénticas produjo un **ahorro de tokens del 95.93% / un ahorro de caracteres del 96.26%**, plenamente dentro del intervalo anunciado.
Sin embargo, la misma canalización aplicada a una salida normal y no redundante de herramientas (una lista limpia de coincidencias de `grep`,
una lectura breve de un archivo o texto conversacional normal) produce correctamente un **ahorro cercano a cero**, porque
no hay nada repetitivo que eliminar y `validateCompression()` (`validation.ts`) se niega a enviar una
reescritura que elimine o modifique bloques de código, URLs, encabezados, versiones o identificadores de constantes EN MAYÚSCULAS.

Este es un comportamiento esperado y seguro, no un error: una sesión de programación que principalmente lea/busque con grep en archivos limpios
experimentará un ahorro total moderado incluso con la compresión totalmente habilitada, mientras que una sesión que se encuentre con un bucle fallido
o un linter demasiado prolijo verá el intervalo completo del 78-95% en ese tráfico. No utilice el bajo porcentaje
de ahorro acumulado de una sola sesión como prueba de que la compresión está mal configurada; compruebe primero si la
salida subyacente de la herramienta era realmente redundante.

---

## Visualización del ahorro de tokens

```
Sin compresión:      47K tokens enviados al LLM
Con Lite:            40K tokens enviados          (15% de ahorro — seguro, siempre activo)
Con Standard:        33K tokens enviados          (30% de ahorro — reglas de estilo caveman)
Con Aggressive:      24K tokens enviados          (50% de ahorro — envejecimiento + resumen)
Con Ultra:           12K tokens enviados          (75% de ahorro — poda heurística)
Con RTK:             19K-5K tokens enviados       (60-90% de ahorro en la salida de comandos/herramientas)
Con Stacked:         10K-2.5K tokens enviados     (intervalo elegible de RTK+Caveman del 78-95%)
```

---

## Configuración

### Panel

Ve a `Dashboard → Context & Cache`:

- **Caveman** — selección de modo, paquetes de idiomas, vista previa y valores predeterminados globales
- **RTK** — vista previa del filtro de comandos, configuración de seguridad de RTK y catálogo de filtros
- **Compression Combos** — canalizaciones de motores con nombre asignadas a combinaciones de enrutamiento
- **Auto-Trigger Threshold** — activa automáticamente la compresión cuando el número de tokens supera el umbral

### Anulación por combinación

En `Dashboard → Context & Cache → Compression Combos`, asigna una combinación de compresión a una
combinación de enrutamiento:

```txt
Combinación: "free-tier-fallback"
  Combinación de compresión: "coding-agent-stack"
  Canalización: RTK -> Caveman
  Destinos:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Esto permite usar compresión apilada con proveedores gratuitos/de programación y mantener el modo
ligero en las suscripciones de pago.

Esta asignación de "Anulación por combinación" es un control distinto de la anulación del **modo de
compresión de la combinación de enrutamiento** (Predeterminado/Desactivado/Ligero/Estándar/Agresivo/Ultra):
esa anulación no selecciona una canalización de combinación de compresión con nombre; simplemente
establece el campo `compressionMode` que consulta `resolveCompressionPlan`. Puede configurarse en la
tarjeta de la combinación (`Dashboard → Combos`) o, desde #6760, para cada combinación de enrutamiento
en la lista "Assign to routing" de `Dashboard → Context & Cache → Compression Combos`, justo al lado
de la casilla de asignación de canalización documentada anteriormente. Ambas interfaces conservan los
cambios mediante el mismo endpoint `PUT /api/combos/{id}`.

### Anulación por solicitud

Envía el encabezado de solicitud `x-omniroute-compression` para anular el plan de compresión de una
solicitud individual. Tiene la máxima precedencia: prevalece sobre la anulación de la combinación de
enrutamiento, el perfil activo, la activación automática y el valor predeterminado del panel. Los
valores desconocidos se ignoran (la solicitud nunca se rechaza) y el interruptor maestro global sigue
controlándolo todo: cuando la compresión está desactivada globalmente, el encabezado no puede
activarla. Valores:

| Valor         | Efecto                                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `off`         | Sin compresión para esta solicitud.                                                                                     |
| `default`     | El perfil predeterminado derivado del panel (ignora el perfil activo). Los motores con pérdida quedan desactivados.     |
| `safe`        | Igual que omitir el encabezado: solo deduplicación y compactación de espacios en blanco.                                |
| `allow-lossy` | Conserva el plan del operador para esta solicitud, incluidos resúmenes, filtros de relevancia y reescrituras de estilo. |
| `engine:<id>` | Un único motor cuando está habilitado, p. ej., `engine:rtk`. Esta es la activación por solicitud para ese motor.        |
| `<combo>`     | Una combinación con nombre, comparada primero por nombre (sin distinguir mayúsculas y minúsculas) y luego por id.       |

Sin `allow-lossy`, `engine:<id>` o una combinación con nombre, no se aplican motores con pérdida. La
solicitud sigue recibiendo deduplicación de sesión y compactación de espacios en blanco cuando la
compresión está activada.

El plan aplicado se devuelve en el encabezado de respuesta
`X-OmniRoute-Compression: <mode>; source=<source>`, donde `<source>` es uno de `request-header`,
`routing-override`, `active-profile`, `auto-trigger`, `default` u `off`.

### API

```bash
# Obtener la configuración de compresión
curl http://localhost:20128/api/settings/compression

# Actualizar la configuración de compresión
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Previsualizar una carga útil específica de RTK/apilada
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Enumerar los paquetes de filtros de RTK
curl http://localhost:20128/api/context/rtk/filters

# Probar RTK directamente con metadatos de comando opcionales
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Qué se protege

El motor de compresión **siempre conserva:**

- ✅ Bloques de código (delimitados y en línea)
- ✅ URL y rutas de archivos
- ✅ Estructuras JSON y datos estructurados
- ✅ Identificadores y tokens técnicos protegidos
- ✅ Expresiones matemáticas
- ✅ Definiciones de llamadas a herramientas/funciones
- ✅ Prompts del sistema (en modo ligero)

La recuperación de salida sin procesar de RTK oculta claves de API comunes, tokens de portador, tokens de Slack, claves de acceso de AWS,
contraseñas, tokens y secretos antes de que se almacene cualquier dato.

---

## Estadísticas de compresión

Cada solicitud comprimida incluye estadísticas en los registros del servidor:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Hoja de ruta de fases

| Fase    | Modos                                                                                                                                                            | Estado       |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Fase 1  | Desactivado, Ligero                                                                                                                                              | ✅ Publicada |
| Fase 2  | Estándar, Agresivo, Ultra                                                                                                                                        | ✅ Publicada |
| Fase 3  | RTK, Apilado, combinaciones de compresión                                                                                                                        | ✅ Publicada |
| Fase 4  | Estilos de salida, Ultra de nivel SLM, entorno de evaluación                                                                                                     | ✅ Publicada |
| Fase 4C | Presupuesto de contexto adaptativo ("dial") — motor de cálculo + API (`contextBudget` en `PUT /api/settings/compression`) + controles de modo/política del panel | ✅ Publicada |

---

## Agradecimientos

Las reglas de compresión del modo estándar están inspiradas en **[Caveman](https://github.com/JuliusBrussee/caveman)** de **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — el proyecto viral «por qué usar muchos tokens cuando pocos tokens bastan». Caveman informa de `~75%` menos tokens de salida, un ahorro medio de salida del `65%` en pruebas comparativas, un intervalo de salida del `22-87%` y una herramienta de compresión de entrada de `~46%`.

El modo RTK está inspirado en **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** de **[RTK AI](https://github.com/rtk-ai)** — el proyecto de compresión de alto rendimiento para filtrar la salida de terminales, compilaciones, pruebas, git y herramientas. RTK informa de un ahorro del `60-90%`, y la sesión de ejemplo de su README muestra un ahorro de `~80%`.

---

## Sistemas de compresión avanzados

Además de los 7 modos estándar, OmniRoute incluye varios sistemas de compresión
avanzados que funcionan automáticamente según el contexto.

### Compresión con reconocimiento de caché

Algunos proveedores (como Anthropic con el almacenamiento en caché de prompts) admiten el **almacenamiento en caché de prompts**,
lo que les permite almacenar en caché partes del prompt para reducir los costes y la latencia. Cuando
el almacenamiento en caché está activado, la compresión agresiva puede **perjudicar** el rendimiento
porque cambia los tokens almacenados en caché, invalidando la caché.

El módulo `cachingAware.ts` resuelve esto **detectando el contexto de almacenamiento en caché** y
**ajustando la estrategia de compresión** en consecuencia.

#### Cómo funciona

1. **Detectar el contexto de almacenamiento en caché** — Examina el cuerpo de la solicitud en busca de marcadores `cache_control`
2. **Identificar proveedores con almacenamiento en caché** — Comprueba si el proveedor de destino admite almacenamiento en caché
3. **Ajustar la estrategia** — Reduce `aggressive`/`ultra` a `standard` para los proveedores con almacenamiento en caché
4. **Omitir el prompt del sistema** — Los prompts del sistema suelen almacenarse en caché, por lo que no deben comprimirse
5. **Usar transformaciones deterministas** — Utiliza únicamente transformaciones que produzcan resultados consistentes

#### Ejemplo de código

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Marcador de caché
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Cuándo usarlo

La compresión con reconocimiento de caché está **siempre activada** — no requiere configuración. Solo se activa
cuando:

- La solicitud contiene marcadores `cache_control`
- El proveedor de destino admite el almacenamiento en caché de prompts (Anthropic, OpenAI, etc.)

### Envejecimiento progresivo

Las conversaciones largas acumulan muchos turnos de mensajes, pero los turnos más antiguos se vuelven menos
relevantes. El módulo `progressiveAging.ts` **degrada los mensajes según la distancia entre turnos**:

- **Turnos recientes (0-3)**: Se conservan literalmente (todos los detalles)
- **Turnos intermedios (4-8)**: Compresión ligera (limpieza de espacios en blanco y formato)
- **Turnos antiguos (9+)**: Compresión de estilo cavernícola (eliminación de contenido superfluo y resumen)
- **Turnos muy antiguos (20+)**: Se resumen considerablemente o se descartan

#### Ejemplo de código

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 turnos más ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Primeros 3 turnos: literales
  light: 8, // Turnos 4-8: compresión ligera
  moderate: 20, // Turnos 9-20: compresión de estilo cavernícola
  // Turnos 21+: resumen intensivo
});

// saved = número de tokens ahorrados
```

#### Cuándo usarlo

El envejecimiento progresivo está **siempre activado** para los modos `aggressive` y `ultra`. Es
especialmente eficaz para:

- Sesiones de programación prolongadas
- Conversaciones de varios días
- Flujos de trabajo agénticos con muchas llamadas a herramientas

### Modo de salida cavernícola

El módulo `outputMode.ts` inyecta **instrucciones en el prompt del sistema** para que el
propio modelo genere una salida comprimida y concisa (un estilo «cavernícola»).

#### Cómo funciona

En lugar de comprimir la entrada, este modo añade un prompt del sistema como:

> "Responde con el mínimo de palabras. Omite las cortesías. Usa frases cortas."

Esto funciona especialmente bien para:

- Generación de código (salida más concisa = menos tokens)
- Preguntas y respuestas rápidas (no se necesitan explicaciones elaboradas)
- Procesamiento por lotes (maximiza el rendimiento)

#### Cuándo usarlo

El modo de salida cavernícola es **opcional** — configúralo mediante la configuración combinada:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### Estilos de salida (catálogo)

El modo de salida cavernícola anterior es la **ruta heredada de estilo único**. La fase 4 lo generalizó
en un catálogo de estilos de salida componibles: `OUTPUT_STYLE_CATALOG` en
`open-sse/services/compression/outputStyles/catalog.ts`. Cada estilo es una instrucción del prompt del sistema
que hace que el propio modelo produzca una salida más económica; los estilos pueden activarse
simultáneamente y se inyectan en el orden del catálogo.

| Estilo                                 | `id`          | Qué hace                                                                                                                                                                                                                            | Idiomas de las instrucciones                                                               |
| -------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Prosa concisa                          | `terse-prose` | Elimina relleno/artículos/matizaciones; mantiene exacta la sustancia técnica. El mismo texto que el modo de salida cavernícola heredado (referenciado, no reescrito).                                                               | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                              |
| Menos código                           | `less-code`   | Escala YAGNI: el cambio funcional más pequeño, sin abstracciones no solicitadas.                                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                              |
| Coleta (desarrollador sénior perezoso) | `ponytail`    | "El mejor código es el que nunca se escribe": reutilizar > reescribir, causa raíz > síntoma, el diff funcional más corto.                                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                              |
| Tengo TDAH (acción primero)            | `i-have-adhd` | Primero la acción (comando/ruta/fragmento antes de la prosa), pasos numerados y acotados, UN siguiente paso concreto, sin preámbulo/resumen/cierres. Adaptado de [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                              |
| CJK conciso (文言)                     | `terse-cjk`   | Estilo ultraconciso de chino clásico.                                                                                                                                                                                               | zh (limitado por configuración regional: solo se ofrece cuando el idioma resuelto es `zh`) |

Cada estilo incluye tres niveles de intensidad — `lite`, `full`, `ultra` — y cada nivel
termina con la cláusula de límites compartida, que conserva literalmente los bloques de código, las rutas de archivos, los comandos,
los mensajes de error, las URL y los identificadores.

#### Cómo funciona la inyección

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) compara
la selección con el catálogo (los identificadores desconocidos y los estilos que no coinciden con la configuración regional
se descartan, nunca generan un error), concatena las instrucciones seleccionadas en el orden del catálogo,
añade la cláusula de límites **una vez** y antepone el resultado al prompt del sistema
detrás de un único marcador de idempotencia (`[OmniRoute Output Styles]`); volver a aplicarlo
no tiene efecto. Cuando existe una traducción para el idioma detectado de la solicitud, se inyecta
la instrucción localizada en lugar de la inglesa.

#### Cómo habilitarlo

En el panel: **Contexto → Configuración → Compresión** — una fila por estilo con un
interruptor de activación/desactivación y un selector de nivel. Mediante programación, la configuración de compresión conserva
la selección como:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Compatibilidad con versiones anteriores: la configuración combinada heredada `outputMode: "caveman"` sigue funcionando y se asigna a
`terse-prose`, idéntico byte por byte a la antigua inyección en todos los idiomas heredados.

Selección de idioma: con `languageConfig.enabled` activado, `autoDetect` selecciona el
idioma del último mensaje del usuario (el mismo detector que usan los motores de entrada);
desactivar `autoDetect` fija `defaultLanguage`. Desactivado → inglés.

La matriz estilo × idioma está fijada por
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: un estilo nuevo no puede publicarse
sin al menos una traducción a pt-BR (o una excepción explícita con seguimiento), y un
estilo existente no puede perder silenciosamente una configuración regional. Para añadir un estilo, consulta
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compresión de resultados de herramientas

El módulo `toolResultCompressor.ts` proporciona **5 estrategias de compresión especializadas**
para los resultados de herramientas (llamadas a funciones, salidas de agentes, resultados de búsqueda, etc.):

1. **Compresión de resultados de búsqueda** — Elimina resultados redundantes y conserva los N primeros
2. **Compresión de lectura de archivos** — Trunca archivos grandes y conserva encabezados/importaciones
3. **Compresión de ejecución de código** — Conserva únicamente stdout/stderr esenciales
4. **Compresión de consultas de base de datos** — Limita las filas y elimina metadatos detallados
5. **Compresión de respuestas de API** — Elimina campos nulos y condensa matrices

#### Cuándo usarla

La compresión de resultados de herramientas está **siempre activada** cuando hay llamadas a herramientas. No
requiere configuración.

### Canalización apilada

El modo apilado ejecuta **varios motores en secuencia** — normalmente primero RTK
(ahorro del 60-90 % en la salida de herramientas) y después Caveman (ahorro adicional del 30 % en el
texto restante). Esto consigue un **ahorro total del 78-95 %**.

#### Cómo funciona

```
Entrada (1000 tokens)
  → RTK (filtro que reconoce comandos) → 200 tokens
    → Caveman (eliminación de relleno) → 140 tokens
  → Salida (140 tokens, 86 % de ahorro)
```

#### Cuándo usarlo

Usa el modo apilado para:

- Flujos de trabajo con uso intensivo de herramientas (programación agéntica, investigación)
- Procesamiento por lotes sensible a los costes
- Cuando necesites el máximo ahorro de tokens

Configúralo mediante una combinación:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## Anulaciones de compresión por combo

Puedes anular el modo de compresión global **para cada combo** a fin de ajustar el comportamiento
para distintos casos de uso:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

Esto resulta útil para:

- **Combos de programación**: Usa el modo `aggressive` para sesiones largas
- **Combos de preguntas y respuestas rápidas**: Usa el modo `lite` para obtener respuestas rápidas
- **Combos con uso intensivo de herramientas**: Usa el modo `stacked` para maximizar el ahorro
- **Combos de producción**: Usa el modo `cache-aware` para proveedores con almacenamiento en caché

---

## Véase también

- [Configuración del entorno](../reference/ENVIRONMENT.md) — Variables de entorno de compresión
- [Guía de arquitectura](../architecture/ARCHITECTURE.md) — Funcionamiento interno del pipeline de compresión
- [Guía del usuario](../guides/USER_GUIDE.md) — Primeros pasos con la compresión
- [Compresión RTK](./RTK_COMPRESSION.md) — Filtros RTK, modelo de confianza, puerta de verificación y recuperación de la salida sin procesar
- [Motores de compresión](./COMPRESSION_ENGINES.md) — Caveman, RTK, apilamiento, APIs, MCP y panel de control
- [Formato de las reglas de compresión](./COMPRESSION_RULES_FORMAT.md) — Formato JSON de los paquetes de reglas
- [Paquetes de idioma de compresión](./COMPRESSION_LANGUAGE_PACKS.md) — Reglas de Caveman específicas de cada idioma
