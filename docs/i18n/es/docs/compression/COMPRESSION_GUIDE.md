# 🗜️ Prompt Compression Guide — OmniRoute (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Ahorra automáticamente entre un 15 % y un 95 % del contexto elegible. Para obtener una descripción general rápida, consulta la [sección sobre compresión del README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Descripción general

OmniRoute implementa una canalización modular de compresión de prompts que se ejecuta **proactivamente** antes de que las solicitudes lleguen a los proveedores ascendentes. Esto significa que el ahorro de tokens se produce de forma transparente, sin necesidad de realizar cambios en tu flujo de trabajo.

```
Solicitud del cliente
  → Selector de estrategia de compresión
    → ¿Sobrescritura mediante combo? → Usar la configuración del combo
    → ¿Umbral de activación automática? → Usar el modo automático
    → ¿Modo predeterminado? → Usar la configuración global
    → ¿Desactivado? → Omitir la compresión
  → Modo de compresión seleccionado
    → Desactivado: Sin compresión
    → Ligero: Limpieza segura de espacios en blanco/formato (~15 %)
    → Estándar: Eliminación de contenido superfluo al estilo cavernícola (~30 %)
    → Agresivo: Envejecimiento del historial + resumen (~50 %)
    → Ultra: Poda heurística + reducción de bloques de código (~75 %)
    → RTK: Filtrado de terminal/salida de herramientas basado en comandos (intervalo ascendente del 60-90 %)
    → Apilado: Canalización ordenada con varios motores, normalmente RTK y después Caveman (intervalo elegible del 78-95 %)
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
| `collapseWhitespace`     | Fusiona líneas en blanco consecutivas y espacios finales |
| `dedupSystemPrompt`      | Elimina mensajes del sistema duplicados                  |
| `compressToolResults`    | Comprime salidas detalladas de herramientas/funciones    |
| `removeRedundantContent` | Elimina instrucciones repetidas                          |
| `replaceImageUrls`       | Acorta los URI de datos de imágenes en base64            |

**Ideal para:** Uso permanente y flujos de trabajo críticos para la seguridad.

### Modo estándar (~30 % de ahorro)

Inspirado en [Caveman](https://github.com/JuliusBrussee/caveman): elimina palabras de relleno y expresiones innecesariamente largas, a la vez que preserva el significado:

- Elimina palabras de relleno («por favor», «creo que», «básicamente», «en realidad»)
- Condensa frases innecesariamente largas («con el fin de» → «para», «como resultado de» → «debido a»)
- Elimina expresiones corteses e indirectas («¿Te importaría...?», «Si fuera posible...»)
- Más de 30 reglas regex ajustadas para prompts de programación

**Ideal para:** Flujos de trabajo diarios de programación y equipos que buscan reducir costes.

### Modo agresivo (~50 % de ahorro)

Gestión inteligente del historial para sesiones largas:

- **Envejecimiento de mensajes** — los mensajes más antiguos se comprimen progresivamente
- **Compresión de resultados de herramientas** — las salidas largas de herramientas se truncan u omiten (primeras/últimas líneas,
  filtrado de líneas coincidentes, compactación de claves JSON)
- **Protecciones de integridad estructural** — garantizan que los pares `tool_use` + `tool_result` permanezcan coherentes
- **Consideración de la ventana de contexto** — respeta los límites de tokens de cada modelo

**Ideal para:** Sesiones prolongadas de depuración y grandes bases de código.

### Modo ultra (~75 % de ahorro)

Compresión máxima para situaciones en las que los tokens son críticos:

- **Poda heurística** — poda de tokens de texto en prosa basada en puntuaciones
- **Preservación de la estructura** — los bloques de código delimitados, el código en línea, las URL y los identificadores se
  sustituyen temporalmente y se vuelven a insertar literalmente; nunca se podan
- **Nivel SLM opcional** — un pequeño modelo local puede refinar la poda cuando está configurado
- Independiente del modo agresivo: no ejecuta el envejecimiento de mensajes, la compresión de resultados de herramientas
  ni el resumidor alternativo (solo un fallo del nivel SLM puede dirigir una pasada alternativa a través
  del modo agresivo)

**Ideal para:** Cuando alcanzas repetidamente los límites de contexto.

### Modo RTK (intervalo ascendente del 60-90 %)

El modo RTK está optimizado para las salidas detalladas de herramientas que aparecen en las sesiones de agentes de programación:

- Detecta clases de comandos/salidas como `git status`, `git diff`, `git log`, ejecutores de pruebas,
  compilaciones de TypeScript/Vite/Webpack, ESLint/Biome/Prettier, auditorías/instalaciones de npm, registros de Docker, salidas de infraestructura
  y salidas genéricas del shell
- Aplica paquetes de filtros JSON de `open-sse/services/compression/engines/rtk/filters/`
- Importa filtros del esquema TOML v1 de RTK desde archivos `filters.toml` del proyecto o globales, con validación mediante pruebas
  en línea y control de confianza para los archivos del proyecto
- Incluye 55 filtros integrados con muestras de verificación en línea
- Elimina secuencias de control ANSI, barras de progreso, líneas repetidas y ruido que no permite tomar medidas
- Conserva fallos, errores, advertencias, archivos modificados, resúmenes y la parte final de las salidas largas
- Admite filtros de proyecto con control de confianza, filtros globales y recuperación opcional de la salida sin procesar redactada

**Ideal para:** Sesiones de agentes con transcripciones de shell, compilación, pruebas, git, grep y salidas de archivos.

### Modo apilado (intervalo elegible del 78-95 %)

El modo apilado ejecuta varios motores de compresión en un orden determinista. La canalización predeterminada es:

```txt
RTK -> Caveman
```

Ese orden compacta primero la salida de terminal/herramientas y, después, aplica la condensación semántica de Caveman al
prompt restante en lenguaje natural. Las canalizaciones apiladas pueden configurarse globalmente o mediante
combos de compresión asignados a combos de enrutamiento.

**Ideal para:** Contexto mixto con grandes registros de herramientas, además de instrucciones humanas o resúmenes del asistente.

---

## Cálculo del ahorro upstream

OmniRoute documenta el ahorro por compresión a partir de dos fuentes: benchmarks de proyectos upstream y
la propia composición de motores de OmniRoute.

| Fuente  | Cifra del README upstream utilizada aquí                                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` menos tokens de salida, `65%` de ahorro medio de salida en benchmarks, rango de `22-87%` y herramienta de compresión de entrada de `~46%` |
| RTK     | `60-90%` de ahorro en la salida de comandos; sesión de ejemplo de `~118,000 -> ~23,900` tokens, o un `79.7%` ahorrado (`~80%`)                   |

Para las cargas de herramientas/contexto que se solapan, la combinación predeterminada de OmniRoute apila los motores:

```txt
RTK -> Caveman
```

El ahorro combinado es multiplicativo, no aditivo:

```txt
combinado = 1 - (1 - ahorro de RTK) * (1 - ahorro de entrada de Caveman)
promedio  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
rango     = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Ese valor de `78-95%` se aplica cuando tanto RTK como Caveman pueden reducir la misma carga de entrada/contexto.
El modo de salida de respuestas de Caveman es independiente: cuando está habilitado, utiliza el ahorro de salida propio de Caveman (`65%`
de promedio, `~75%` como cifra destacada, rango de `22-87%`). El ahorro total de facturación depende de la proporción entre prompts y salidas.

### Qué significa realmente "elegible"

El rango destacado de 15-95% es real, pero solo se aplica a contenido **redundante o verboso**: líneas de
error repetidas, un registro de compilación que repite constantemente la misma advertencia, un volcado sobredimensionado de `grep`/lectura de archivos. **No**
significa que cada solicitud ahorre esa cantidad.

Verificado empíricamente (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): una
ejecución `stacked` (RTK + Caveman) sobre un bloque `tool_result` con formato de Anthropic que contenía 300 líneas
de error idénticas produjo un **95.93% de ahorro de tokens / 96.26% de ahorro de caracteres**, claramente dentro del rango
anunciado. Sin embargo, la misma canalización ejecutada sobre una salida de herramienta normal y no redundante (una lista limpia de coincidencias de `grep`,
una lectura breve de archivo, texto conversacional ordinario) produce correctamente un **ahorro casi nulo**, porque
no hay nada repetitivo que eliminar y `validateCompression()` (`validation.ts`) se niega a entregar una
reescritura que elimine o altere bloques de código, URLs, encabezados, versiones o identificadores de constantes en MAYÚSCULAS.

Este es un comportamiento esperado y seguro, no un error: una sesión de programación que principalmente lea/busque con grep en archivos limpios
obtendrá un ahorro total modesto incluso con la compresión completamente habilitada, mientras que una sesión que entre en un bucle fallido
o utilice un linter muy verboso obtendrá el rango completo de 78-95% sobre ese tráfico. No utilices el
bajo porcentaje de ahorro agregado de una sola sesión como prueba de que la compresión está mal configurada: comprueba primero si la
salida subyacente de la herramienta era realmente redundante.

---

## Visualización del ahorro de tokens

```
Sin compresión:       47K tokens enviados al LLM
Con Lite:             40K tokens enviados          (15% ahorrado — seguro, siempre activo)
Con Standard:         33K tokens enviados          (30% ahorrado — reglas de habla cavernícola)
Con Aggressive:       24K tokens enviados          (50% ahorrado — envejecimiento + resumen)
Con Ultra:            12K tokens enviados          (75% ahorrado — poda heurística)
Con RTK:              19K-5K tokens enviados       (60-90% ahorrado en la salida de comandos/herramientas)
Con Stacked:          10K-2.5K tokens enviados     (rango elegible de RTK+Caveman del 78-95%)
```

---

## Configuración

### Panel

Ve a `Panel → Contexto y caché`:

- **Caveman** — selección de modo, paquetes de idioma, vista previa y valores predeterminados globales
- **RTK** — vista previa del filtro de comandos, configuración de seguridad de RTK y catálogo de filtros
- **Combinaciones de compresión** — canalizaciones de motores con nombre asignadas a combinaciones de enrutamiento
- **Umbral de activación automática** — activa automáticamente la compresión cuando el número de tokens supera el umbral

### Anulación por combinación

En `Panel → Contexto y caché → Combinaciones de compresión`, asigna una combinación de compresión a una
combinación de enrutamiento:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Esto permite usar compresión apilada con proveedores gratuitos o de programación, mientras se mantiene
el modo Lite en las suscripciones de pago.

Esta asignación de "anulación por combinación" es un control distinto de la anulación del **modo de
compresión de la combinación de enrutamiento** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses;
el esquema del campo también acepta `rtk`, `stacked` y `omniglyph`): esa anulación no selecciona una
canalización de combinación de compresión con nombre; simplemente establece el campo `compressionMode`
consultado por `resolveCompressionPlan`. Puede configurarse en la tarjeta de la combinación
(`Panel → Combinaciones`) o, desde #6760, por combinación de enrutamiento en la lista "Asignar al
enrutamiento" de `Panel → Contexto y caché → Combinaciones de compresión`, justo al lado de la casilla
de asignación de canalización documentada anteriormente. Ambas interfaces guardan los cambios mediante
el mismo endpoint `PUT /api/combos/{id}`.

### Anulación por solicitud

Envía el encabezado de solicitud `x-omniroute-compression` para anular el plan de compresión de una sola
solicitud. Tiene la máxima prioridad: prevalece sobre la anulación de la combinación de enrutamiento,
el perfil activo, la activación automática y el valor Default del panel. Los valores desconocidos se
ignoran (la solicitud nunca se rechaza) y el interruptor maestro global sigue controlándolo todo: cuando
la compresión está desactivada globalmente, el encabezado no puede activarla. Valores:

| Valor         | Efecto                                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `off`         | Sin compresión para esta solicitud.                                                                                     |
| `default`     | El perfil Default derivado del panel (ignora el perfil activo). Los motores con pérdida permanecen desactivados.        |
| `safe`        | Igual que omitir el encabezado: solo deduplicación y compactación de espacios en blanco.                                |
| `allow-lossy` | Mantiene el plan del operador para esta solicitud, incluidos resúmenes, filtros de relevancia y reescrituras de estilo. |
| `engine:<id>` | Un único motor cuando está habilitado, p. ej., `engine:rtk`. Esta es la activación por solicitud para ese motor.        |
| `<combo>`     | Una combinación con nombre; primero se busca por nombre (sin distinguir mayúsculas y minúsculas) y después por id.      |

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

# Previsualizar una carga útil RTK/stacked específica
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
- ✅ URLs y rutas de archivo
- ✅ Estructuras JSON y datos estructurados
- ✅ Identificadores y tokens técnicos protegidos
- ✅ Expresiones matemáticas
- ✅ Definiciones de llamadas a herramientas/funciones
- ✅ Prompts del sistema (en modo lite)

La recuperación de salida sin procesar de RTK censura claves de API comunes, tokens de portador, tokens de Slack, claves de acceso de AWS,
contraseñas, tokens y secretos antes de que se conserve cualquier dato.

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

## Hoja de ruta por fases

| Fase    | Modos                                                                                                                                                            | Estado       |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Fase 1  | Desactivado, Lite                                                                                                                                                | ✅ Publicada |
| Fase 2  | Standard, Aggressive, Ultra                                                                                                                                      | ✅ Publicada |
| Fase 3  | RTK, Stacked, combinaciones de compresión                                                                                                                        | ✅ Publicada |
| Fase 4  | Estilos de salida, Ultra de nivel SLM, conjunto de evaluación                                                                                                    | ✅ Publicada |
| Fase 4C | Presupuesto de contexto adaptativo («dial») — motor de cálculo + API (`contextBudget` en `PUT /api/settings/compression`) + controles de modo/política del panel | ✅ Publicada |

---

## Agradecimientos

Las reglas de compresión del modo Standard están inspiradas en **[Caveman](https://github.com/JuliusBrussee/caveman)** de **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ más de 51 000) — el proyecto viral «why use many token when few token do trick». Caveman informa de `~75%` menos tokens de salida, un ahorro medio de salida del `65%` en pruebas comparativas, un intervalo de salida del `22-87%` y una herramienta de compresión de entrada de `~46%`.

El modo RTK está inspirado en **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** de **[RTK AI](https://github.com/rtk-ai)** — el proyecto de compresión de salida de comandos de alto rendimiento para terminales, compilaciones, pruebas, git y filtrado de salida de herramientas. RTK informa de un ahorro del `60-90%`, y la sesión de ejemplo de su README muestra un ahorro de `~80%`.

---

## Sistemas avanzados de compresión

Además de los 7 modos descritos anteriormente (el código fuente también acepta los modos `codex-responses` y
`omniglyph`, que esta guía no cubre), las siguientes secciones abordan funciones
que operan dentro de esos modos o junto a ellos: la compresión de resultados de herramientas y el envejecimiento progresivo
son los pasos 1 y 2 del motor agresivo (el modo Aggressive y un paso `aggressive` de una
canalización apilada), la canalización apilada es la forma en que se ejecuta el modo Stacked, la compresión compatible
con caché degrada `aggressive` y `ultra` a `standard` para los proveedores con almacenamiento en caché mientras la compresión
está activada, y el modo de salida Caveman y los estilos de salida son instrucciones opcionales del prompt del sistema,
desactivadas de forma predeterminada, que dan forma a la salida del modelo en lugar de comprimir la solicitud.

### Compresión compatible con caché

Algunos proveedores (como Anthropic con almacenamiento en caché de prompts) admiten el **almacenamiento en caché de prompts**,
lo que les permite almacenar en caché partes del prompt para reducir los costes y la latencia. Cuando
el almacenamiento en caché está activado, la compresión agresiva puede en realidad **perjudicar** el rendimiento
porque cambia los tokens almacenados en caché, lo que invalida la caché.

El módulo `cachingAware.ts` resuelve esto **detectando el contexto de almacenamiento en caché** y
**ajustando la estrategia de compresión** en consecuencia.

#### Cómo funciona

1. **Detectar el contexto de almacenamiento en caché** — Examina el cuerpo de la solicitud en busca de marcadores `cache_control`
2. **Identificar proveedores con almacenamiento en caché** — Comprueba si el proveedor de destino admite almacenamiento en caché
3. **Ajustar la estrategia** — Degrada `aggressive`/`ultra` a `standard` para los proveedores con almacenamiento en caché
4. **Omitir el prompt del sistema** — Los prompts del sistema suelen almacenarse en caché, por lo que no deben comprimirse

El asistente de estrategia también devuelve un indicador `deterministicOnly`, pero el generador del plan solo consume
la estrategia; actualmente, ningún componente posterior lee el indicador.

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
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Cuándo usarla

La compresión compatible con caché está **siempre activada**; no requiere configuración. Se activa siempre que
la compresión está habilitada y el proveedor de destino admite el almacenamiento en caché de prompts (Anthropic, OpenAI,
etc.); no se requieren marcadores `cache_control` explícitos: un proveedor con almacenamiento en caché por sí solo
activa la degradación, y los marcadores por sí solos nunca lo hacen (la detección de marcadores alimenta la
telemetría de caché, no la decisión sobre la estrategia).

### Envejecimiento progresivo

Las conversaciones largas acumulan muchos turnos de mensajes, pero los turnos más antiguos se vuelven menos
relevantes. El módulo `progressiveAging.ts` **degrada los mensajes según la distancia entre turnos**
(distancia medida desde el final de la conversación). Con los valores predeterminados incluidos
(`verbatim: 2, light: 2, moderate: 3`):

- **Últimos 2 turnos (distancia ≤ 2)**: Se conservan literalmente
- **Distancia 3**: Compresión cavernícola (eliminación de relleno)
- **Distancia 4+**: Los mensajes del asistente se resumen; los mensajes del usuario se reducen a su primera
  línea, con un límite de 120 caracteres; los demás roles no se modifican. Los prompts del sistema, los mensajes
  ya envejecidos y el último mensaje del usuario siempre se conservan literalmente, independientemente de la distancia.
  No se descarta nada por completo, y la banda `light`
  es inalcanzable con los valores predeterminados incluidos (`light` equivale a `verbatim`).

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
  verbatim: 3, // últimos 3 turnos: literales
  light: 8, // distancia <= 8: compresión ligera
  moderate: 20, // distancia <= 20: compresión cavernícola
  fullSummary: 5, // requerido por el tipo, no leído por el código de bandas
  // distancia > 20: resumido (asistente) / se conserva la primera línea (usuario)
});

// saved = número de tokens ahorrados
```

#### Cuándo usarlo

El envejecimiento progresivo está **siempre activado** para el modo `aggressive`: es el paso 2 de
`compressAggressive()`. El modo Ultra no lo ejecuta. Es
especialmente eficaz para:

- Sesiones de programación prolongadas
- Conversaciones de varios días
- Flujos de trabajo con agentes y muchas llamadas a herramientas

### Modo de salida cavernícola

El modo de salida cavernícola añade **instrucciones al prompt del sistema** que solicitan al propio modelo
una salida concisa: el nivel `lite` pide respuestas breves que conserven oraciones completas, `full`
le pide que «responda de forma concisa como un cavernícola inteligente» y `ultra` pide una salida telegráfica;
las instrucciones solo lo solicitan, no pueden garantizarlo. Las solicitudes las reciben mediante
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` primero resuelve la selección con la capa de compatibilidad retroactiva
(`resolveOutputStyleSelection()` en
`open-sse/services/compression/outputStyles/backCompat.ts`), que, mientras `outputStyles`
esté vacío, asigna un `cavemanOutputMode` habilitado al estilo de salida `terse-prose` con
`cavemanOutputMode.intensity` (véase Compatibilidad retroactiva más adelante); una selección no vacía de `outputStyles`
se usa tal cual, y `cavemanOutputMode.enabled` e `intensity` dejan de tener
efecto, mientras que su opción `autoClarity` sigue aplicándose. `outputMode.ts` contiene los
textos de las instrucciones (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), la omisión basada en el contenido y la
función auxiliar de colocación que usa la inyección; su propio inyector `applyCavemanOutputMode()` no tiene
ningún llamador en producción.

#### Cómo funciona

Este modo no comprime la entrada. Añade un bloque de instrucciones al prompt del sistema
(véase Cómo funciona la inyección más adelante), y cualquier modo de compresión de entrada seleccionado para la solicitud
se ejecuta después sobre el cuerpo que ahora contiene el bloque. Antes de la cláusula compartida
de límites con la que termina cada nivel, el nivel `full` en inglés dice:

> «Responde de forma concisa como un cavernícola inteligente. Omite artículos (a/an/the), relleno (just/really/basically/actually/simply), cortesías y expresiones de cautela. Se permiten fragmentos. Usa sinónimos cortos (big, no extensive; fix, no implement). Conserva exactamente todo el contenido técnico, el código, los errores, las URLs y los identificadores».

Esto funciona especialmente bien para:

- Generación de código (salida más concisa = menos tokens)
- Preguntas y respuestas rápidas (no se necesitan explicaciones elaboradas)
- Procesamiento por lotes (maximiza el rendimiento)

#### Cuándo usarlo

El modo de salida cavernícola es **opcional**. Con la compresión activada (`enabled: true`, el interruptor principal
de la página Compression Settings), actívelo con `cavemanOutputMode.enabled`; `intensity`
selecciona `lite`, `full` o `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

El interruptor **Output Mode** de una combinación de compresión (`outputMode`, con el nivel en `outputModeIntensity`)
establece la misma opción para las solicitudes a las que se aplica dicha combinación, y la herramienta MCP
`omniroute_set_compression_engine` la escribe mediante su argumento booleano `outputMode`.
Una selección no vacía de `outputStyles` tiene prioridad sobre este interruptor. En el
panel, habilitar el estilo de salida **Terse prose** inyecta el mismo bloque (véase Output
Styles más adelante).

### Estilos de salida (catálogo)

El modo de salida cavernícola anterior es la **ruta heredada de estilo único**. La fase 4 lo generalizó
en un catálogo de estilos de salida componibles: `OUTPUT_STYLE_CATALOG` en
`open-sse/services/compression/outputStyles/catalog.ts`. Cada estilo es una instrucción del prompt del sistema
que solicita al propio modelo una salida más económica; los estilos pueden habilitarse
juntos y se inyectan en el orden del catálogo.

| Estilo                                 | `id`          | Qué hace                                                                                                                                                                                                                             | Idiomas de las instrucciones                             |
| -------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| Prosa concisa                          | `terse-prose` | Elimina relleno/artículos/matices; mantiene intacta la sustancia técnica. El mismo texto que el modo de salida cavernícola heredado (referenciado, no reescrito).                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi            |
| Menos código                           | `less-code`   | Escala YAGNI: el cambio funcional más pequeño, sin abstracciones no solicitadas.                                                                                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi            |
| Coleta (desarrollador sénior perezoso) | `ponytail`    | "El mejor código es el que nunca se escribe": reutilizar > reescribir, causa raíz > síntoma, el diff funcional más corto.                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi            |
| Tengo TDAH (acción primero)            | `i-have-adhd` | Primero la acción (comando/ruta/fragmento antes que la prosa), pasos numerados y acotados, UN siguiente paso concreto, sin preámbulo/resumen/cierres. Adaptado de [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi            |
| CJK conciso (文言)                     | `terse-cjk`   | Respuesta `full`/`ultra` en chino clásico (文言); `lite` solo solicita respuestas breves sin palabras funcionales, cortesías ni adornos.                                                                                             | zh (restringido por configuración regional, véase abajo) |

Cada estilo incluye tres niveles de intensidad —`lite`, `full`, `ultra`— y cada nivel
termina con la cláusula de límites compartida (`SHARED_BOUNDARIES` en `outputMode.ts`), que
mantiene intactos los bloques de código, las rutas de archivo, los comandos, los errores y las URL. Los textos de nivel de
`terse-prose` y `terse-cjk` añaden los identificadores a esa lista.

`terse-cjk` está restringido a la configuración regional `zh` en dos lugares. La página de configuración de compresión muestra
su fila solo cuando el idioma de la interfaz del panel es chino (`zh-CN` o `zh-TW`), y
`applyOutputStyles()` lo inyecta solo cuando el idioma resuelto de la solicitud (véase Selección de
idioma más abajo) es `zh`. Ocultar la fila no elimina una selección guardada de `terse-cjk`:
la API de configuración acepta cualquier id de estilo, y guardar otros estilos en la página lo conserva. En
el momento de la solicitud, la comprobación de idioma de `applyOutputStyles()` es la única restricción de configuración regional.

#### Cómo funciona la inyección

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) contrasta
la selección con el catálogo (los id desconocidos y los estilos que no coinciden con la configuración regional
se descartan, nunca producen un error; una selección que no se resuelve en ningún estilo deja el cuerpo
sin cambios, omitido como `no_styles`), concatena las instrucciones seleccionadas en el orden del catálogo,
añade la cláusula de límites **una vez** (más la cláusula de seguridad, `SAFETY_BOUNDARIES` o su
traducción, cuando se selecciona `less-code` o `ponytail`) e inicia el bloque con un
único marcador de idempotencia (`[OmniRoute Output Styles]`), por lo que volver a aplicarlo no produce cambios. Cuando
el idioma resuelto (véase Selección de idioma más abajo) tiene una traducción, se inyecta la instrucción
localizada en lugar de la inglesa.

En un cuerpo con un array `messages` no vacío, la comprobación de idempotencia se ejecuta antes que la
omisión por contenido: cuando el marcador `[OmniRoute Output Styles]` ya está en el campo
`system` de nivel superior (una cadena o un array de bloques de contenido) o en un mensaje del sistema con contenido
de cadena, el cuerpo se deja sin cambios como `already_applied` y no se ejecuta ninguna comprobación de palabras clave.
En caso contrario, una omisión por contenido (`shouldBypassCavemanOutputMode()` en
`open-sse/services/compression/outputMode.ts`) comprueba el texto de los últimos tres
mensajes, independientemente de su rol, y omite los estilos durante todo el turno cuando ese texto
coincide con sus palabras clave de seguridad, acciones irreversibles o aclaración, o con una
secuencia sensible al orden: `first`, `then`, `after that`, `before`, `rollback` o
`backup` seguidos, en un máximo de 240 caracteres, por `delete`, `drop`, `migrate`, `deploy` o
`release`. La omisión se ejecuta mientras el interruptor **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, activado de forma predeterminada) esté activado; desactivar el interruptor omite la
comprobación de palabras clave.

Cuando la omisión permite continuar el turno, `placeSystemInstruction()` (en el mismo archivo), que
nunca crea un nuevo `messages[0]`, coloca el bloque en el primero de estos lugares que encuentra:

1. Un mensaje inicial del sistema con contenido de cadena: el bloque se añade después de su texto.
2. El campo `system` de nivel superior: el bloque se añade después del texto de una cadena o
   se agrega como un nuevo bloque de texto a un array de bloques de contenido.
3. El primer mensaje posterior del sistema con contenido de cadena: el bloque se añade después de su
   texto.
4. Ninguno de los anteriores: el bloque se coloca en un nuevo mensaje del sistema al final de `messages`.

En un cuerpo sin un array `messages` (o con uno vacío), no se ejecuta ninguna omisión por contenido y
no se consulta un campo `system` de nivel superior. El bloque se añade después del texto de un
campo `instructions` de cadena, a menos que dicho campo ya contenga el marcador
`[OmniRoute Output Styles]`, en cuyo caso el cuerpo se deja sin cambios como
`already_applied`. Cuando el cuerpo no tiene un campo `instructions` de cadena, pero contiene `input`
(una cadena o un array), el bloque pasa a ser `instructions`, reemplazando cualquier valor que no sea de cadena
que tuviera ese campo. Un cuerpo sin un campo `instructions` de cadena ni un `input` de cadena o array
se deja sin cambios y se omite como `no_messages`.

#### Cómo habilitarlo

En el panel: **Contexto de compresión → Configuración de compresión**
(`/dashboard/context/settings`), sección de estilos de salida: una fila por estilo con un
interruptor de activación/desactivación y un selector de nivel. Los estilos se inyectan
mientras la compresión esté activada (el interruptor principal de la página, `enabled`).
El interruptor **Omisión automática de claridad** está en la página **Caveman**
(`/dashboard/context/caveman`), en su tarjeta **Modo de salida**. Programáticamente, la
configuración de compresión conserva la selección como:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Compatibilidad retroactiva: mientras `outputStyles` esté vacío, la configuración heredada
`cavemanOutputMode.enabled` se asigna a `terse-prose` con
`cavemanOutputMode.intensity`. El bloque comienza entonces con el marcador
`[OmniRoute Output Styles]`, mientras que el inyector heredado
`applyCavemanOutputMode()` escribía `[OmniRoute Caveman Output Mode]`. Debajo del
marcador, el texto coincide con la inyección heredada en en, pt-BR, es, de, fr, it, ru,
id y vi; en ja y zh incluye un espacio adicional antes de la cláusula de límites.
`terse-prose` está traducido a pt-BR, es, de, fr, it, ru, zh, ja, id y vi, por lo que
una solicitud cuyo idioma resuelto sea `hu` recibe el texto en inglés, mientras que el
inyector heredado utilizaba su versión en húngaro.

Selección de idioma de los estilos de salida (`resolveOutputStyleLanguage()` en
`outputStyles/apply.ts`): con `languageConfig.enabled` activado, `autoDetect` toma como
muestra el mensaje de usuario más reciente del array `messages` de la solicitud que
contenga texto (contenido de tipo cadena o el `text` de sus partes de contenido) y
ejecuta sobre él el detector del motor Caveman (`detectCompressionLanguage()`). El
detector devuelve `zh` para texto con caracteres Han y sin kana; de lo contrario,
devuelve el idioma de entre `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` e `id`
que tenga más coincidencias de indicios, y `en` cuando no haya ninguna coincidencia:
el texto que no puede clasificar recibe inglés, nunca `defaultLanguage`, y `vi` nunca
se detecta, aunque los estilos incluyan texto en `vi`. El cuerpo de Responses API
mantiene sus turnos en `input`, que no se toma como muestra, por lo que recibe
`defaultLanguage` y después inglés. Cuando ningún mensaje de usuario de `messages`
contiene texto, o con `autoDetect` desactivado, se aplica `defaultLanguage` y después
inglés. Con `languageConfig.enabled` desactivado, el idioma es inglés, salvo que se
aplique una combinación de compresión a la solicitud (una combinación asignada a la
combinación de enrutamiento de la solicitud, o la combinación de compresión
predeterminada a la que recurre chatCore para la canalización apilada integrada):
aplicar una combinación activa `languageConfig.enabled` para esa solicitud y establece
`defaultLanguage` a partir de los paquetes de idioma de la combinación (el valor
guardado si es uno de los paquetes de la combinación; de lo contrario, el primer
paquete de la combinación, cuyo valor predeterminado es `en`), mientras que el valor
guardado de `autoDetect` (activado de forma predeterminada) sigue aplicándose. El motor
de entrada Caveman selecciona el idioma de su paquete de reglas de forma distinta: por
cada parte de texto y, con la detección automática desactivada, condicionado por
`enabledPacks`.

La matriz de estilo × idioma está fijada por
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: cada estilo del catálogo
necesita una entrada en `BASELINE_LANGUAGES` de la prueba; un estilo que no esté
restringido por configuración regional debe incluir una traducción a pt-BR
(`terse-cjk`, restringido por configuración regional, está exento de esta regla), a
menos que figure en `KNOWN_ENGLISH_ONLY`, que solo puede contener estilos sin ninguna
traducción: si un estilo incluido tiene alguna traducción, la prueba falla; y un estilo
no supera la prueba cuando pierde un idioma incluido en su entrada de
`BASELINE_LANGUAGES`. Para añadir un estilo, consulta
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compresión de resultados de herramientas

`compressToolResult()` en `open-sse/services/compression/toolResultCompressor.ts`
comprime el texto de los resultados de herramientas mediante **5 estrategias**. Las
prueba en este orden, y la primera estrategia activada cuya comprobación coincida con
el contenido determina el resultado:

1. **`fileContent`**: el contenido de 3 o más líneas en el que al menos una línea, ignorando
   la sangría inicial, comienza con `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` o `return ` (la palabra clave más un espacio), o con `if`,
   `for` o `while` seguido de `(` o ` (`, conserva sus primeras 20 y últimas 5 líneas,
   con la parte central omitida marcada.
2. **`grepSearch`**: el contenido con al menos una línea de la forma `<path>:<digits>:`,
   donde el texto anterior al primer signo de dos puntos no contiene espacios en blanco,
   conserva solo esas líneas, hasta un máximo de 30, seguidas de un recuento de las
   coincidencias adicionales y de la lista de archivos coincidentes; todas las demás
   líneas se descartan. Una sola línea de este tipo basta para activar la estrategia,
   por lo que una línea de registro que comience con una marca de tiempo como
   `12:30:45` también cuenta.
3. **`shellOutput`**: la salida que contiene una secuencia ANSI CSI (`ESC[` seguida de
   dígitos o puntos y comas y, después, una letra, como en los códigos de color) o un
   `$` seguido de un espacio en blanco en cualquier parte del texto pierde esas
   secuencias (se conservan otras secuencias de escape, como `ESC[?25l` o una secuencia
   OSC de título de ventana) y conserva sus últimas 50 líneas, contrayendo las líneas
   consecutivas repetidas. Como esta comprobación se ejecuta antes de `json` y
   `errorMessage`, la salida JSON o de error que contenga dicho `$` nunca llega a esas
   estrategias mientras `shellOutput` esté activada.
4. **`json`**: una carga JSON de más de 2.000 caracteres que comienza con `{` o `[`
   (después de espacios en blanco opcionales) y se analiza correctamente se resume:
   un array de más de 7 elementos conserva sus primeros 5 y últimos 2 elementos y su
   recuento total, y un objeto conserva sus primeras 20 claves, reemplazando cada
   valor de objeto o array anidado por un marcador de posición `{…N keys}` (para un
   array, N es su longitud) y añadiendo un marcador `_remaining_<N>_keys` que cuenta
   las claves descartadas después de las primeras 20. Los valores escalares se copian
   íntegramente, por lo que un objeto de 20 claves o menos sin valores anidados solo
   cambia su sangría; uno minificado gana caracteres y permanece sin cambios.
5. **`errorMessage`**: la salida que contiene, en cualquier parte y sin distinguir entre
   mayúsculas y minúsculas, `error:`, `error ` (la palabra seguida de un espacio, como
   en `no error found`), `[error]`, `exception:`, `exception `, `[exception]` o
   `traceback` conserva su primera línea, las 10 líneas siguientes y las últimas 3,
   con un marcador `… [N frames elided] …` en lugar de las líneas intermedias. El
   marcador solo aparece cuando hay más de 13 líneas después de la primera, por lo que
   una salida de error de 14 líneas o menos no se acorta (con 12 o 13 líneas, las
   últimas 3 repiten líneas que ya se habían conservado).

Después de que una estrategia coincida, aunque no ahorre nada, no se prueban las
estrategias posteriores. Cuando la estrategia coincidente no ahorra ningún token
estimado (longitud ÷ 4, redondeada hacia arriba), por ejemplo, un archivo con aspecto
de código de 25 líneas o menos, o un array JSON de más de 2.000 caracteres con 7
elementos o menos, el motor agresivo conserva el resultado original de la herramienta:
ambos invocadores (`compressAggressive()` y `compressAnthropicToolResultBlock()`)
conservan el original cuando `saved` es 0 o inferior, mientras que
`compressToolResult()` sigue devolviendo la salida de esa estrategia. El paso del
resultado de la herramienta no es la última palabra: el resumidor de respaldo del
motor aún puede acortar un mensaje `tool` o `function` de más de 8.192 caracteres
(`maxTokensPerMessage`, 2.048, multiplicado por 4).

#### Cuándo usarlo

La compresión de resultados de herramientas es el paso 1 del motor agresivo
(`compressAggressive()` en `open-sse/services/compression/aggressive.ts`), por lo que
se ejecuta en modo Aggressive y en un paso `aggressive` de una canalización apilada.
Comprime los mensajes `tool` y `function` con formato OpenAI y el texto dentro de los
bloques `tool_result` de Anthropic. Cada estrategia tiene su propio interruptor bajo
`aggressive.toolStrategies`, y todos están activados de forma predeterminada. En el
panel, los interruptores se encuentran en la vista **Advanced** de la página Caveman
mientras la compresión está activada y el modo predeterminado es Aggressive.

### Canalización apilada

El modo apilado ejecuta **varios motores en secuencia**: normalmente, primero RTK
(un ahorro del 60-90 % en la salida de herramientas) y después Caveman sobre el texto
restante (un ahorro de entrada de aproximadamente el 46 %). En conjunto, esto da el
**intervalo elegible del 78-95 %** (consulta Cálculo del ahorro ascendente más arriba):
`1 - (1 - 0.60..0.90) × (1 - 0.46)` da un promedio de ≈89 %.

#### Cómo funciona

```
Entrada (1000 tokens)
  → RTK (filtro sensible a comandos) → 200 tokens
    → Caveman (eliminación de relleno) → 108 tokens
  → Salida (108 tokens, ~89 % de ahorro)
```

#### Cuándo usarlo

Usa el modo apilado para:

- Flujos de trabajo con uso intensivo de herramientas (programación con agentes, investigación)
- Procesamiento por lotes sensible a los costes
- Cuando necesites el máximo ahorro de tokens

Las canalizaciones apiladas se configuran mediante el ajuste global de compresión
`stackedPipeline` o mediante una combinación de compresión con nombre asignada a una
combinación de enrutamiento (consulta Sustitución por combinación más arriba), no
mediante un `modePack` de combinación automática (ese campo solo vuelve a ponderar la
selección de modelos de la combinación automática, y `stacked` no es un nombre de
paquete válido).

---

## Anulaciones de combinación de compresión

Puede anular el modo de compresión global **por combinación** para ajustar con precisión el comportamiento
en distintos casos de uso:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Esto resulta útil para:

- **Combinaciones de programación**: Use el modo `aggressive` para sesiones largas
- **Combinaciones de preguntas y respuestas rápidas**: Use el modo `lite` para obtener respuestas rápidas
- **Combinaciones con uso intensivo de herramientas**: Use el modo `stacked` para maximizar el ahorro
- **Combinaciones de producción**: deje desactivada la anulación para los proveedores con almacenamiento en caché; el ajuste siempre activo
  que tiene en cuenta la caché cambia automáticamente `aggressive`/`ultra` a `standard`
  (no existe un modo `cache-aware` seleccionable)

---

## Véase también

- [Configuración del entorno](../reference/ENVIRONMENT.md) — Variables de entorno de compresión
- [Guía de arquitectura](../architecture/ARCHITECTURE.md) — Funcionamiento interno de la canalización de compresión
- [Guía del usuario](../guides/USER_GUIDE.md) — Primeros pasos con la compresión
- [Compresión RTK](./RTK_COMPRESSION.md) — Filtros RTK, modelo de confianza, puerta de verificación y recuperación de la salida sin procesar
- [Motores de compresión](./COMPRESSION_ENGINES.md) — Caveman, RTK, apilamiento, API, MCP y panel de control
- [Formato de las reglas de compresión](./COMPRESSION_RULES_FORMAT.md) — Formato del paquete de reglas JSON
- [Paquetes de idiomas de compresión](./COMPRESSION_LANGUAGE_PACKS.md) — Reglas de Caveman específicas de cada idioma
