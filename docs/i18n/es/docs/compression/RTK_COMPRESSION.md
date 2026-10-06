# RTK Compression (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

La compresión RTK es el motor de compresión de OmniRoute que tiene en cuenta los comandos para la salida del terminal y de las herramientas. Está
diseñado para sesiones de agentes de programación en las que la mayor parte del crecimiento del contexto proviene de registros de pruebas, salida de compilación,
ruido de gestores de paquetes, transcripciones del shell, salida de Docker, salida de git y trazas de pila.

RTK puede ejecutarse directamente con `defaultMode: "rtk"` o como primer paso de una canalización apilada, normalmente:

```txt
rtk -> caveman
```

Ese orden comprime primero la salida ruidosa de las máquinas y después permite que Caveman condense el texto restante.

El proyecto original de RTK informa de un ahorro del `60-90%` en la salida de comandos. La sesión de ejemplo de su README pasa de
`~118,000` tokens estándar a `~23,900` tokens de RTK, lo que supone un ahorro del `79.7%` (`~80%`). OmniRoute utiliza
ese promedio del proyecto original para calcular el ahorro apilado con la compresión de entrada de Caveman:

```txt
Promedio de RTK:  80% de ahorro
Entrada Caveman:  46% de ahorro
Apilado:          1 - (1 - 0.80) * (1 - 0.46) = 89.2% de ahorro
Intervalo:        1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Qué comprime

El catálogo integrado incluye actualmente 49 filtros distribuidos entre estas categorías:

| Categoría | Ejemplos                                                          |
| --------- | ----------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`                 |
| `test`    | Vitest, Jest, Pytest, Playwright, pruebas de Go, pruebas de Cargo |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx     |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler     |
| `shell`   | `ls`, `find`, `grep`, registros genéricos del shell               |
| `docker`  | `docker ps`, registros de Docker                                  |
| `infra`   | Terraform, OpenTofu, `systemctl status`                           |
| `generic` | Salida JSON, trazas de pila, alternativa genérica para la salida  |

El detector de `open-sse/services/compression/engines/rtk/commandDetector.ts` clasifica la salida
antes de seleccionar el filtro. Los filtros también pueden coincidir mediante un patrón de comando o una expresión regular de salida cuando una clase
de comando no es suficiente.

## Resolución de filtros

RTK carga los filtros en este orden:

1. Filtros del proyecto de `.rtk/filters.toml` y `.rtk/filters.json`, solo cuando son de confianza.
2. Filtros globales de `DATA_DIR/rtk/filters.toml` y `DATA_DIR/rtk/filters.json`.
3. Filtros integrados de `open-sse/services/compression/engines/rtk/filters/`.

Dentro del mismo ámbito, los filtros del esquema v1 de RTK TOML tienen prioridad sobre los filtros JSON de OmniRoute. Las expresiones TOML
`match_command` se comprueban antes que la coincidencia por tipo de comando, de modo que un filtro importado específico para un comando
pueda sustituir a un filtro más amplio del mismo ámbito. El ámbito del proyecto sigue teniendo prioridad sobre el ámbito global,
independientemente del formato del archivo.

Los filtros del proyecto están sujetos intencionadamente a una comprobación de confianza porque los filtros de expresiones regulares pueden cambiar cómo se muestra la salida de las herramientas
a los agentes. Un archivo de filtros del proyecto se acepta cuando se cumple una de estas condiciones:

- `rtkConfig.trustProjectFilters` es `true`.
- Se establece `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1`.
- `.rtk/trust.json` contiene el hash SHA-256 correspondiente al archivo de filtros del proyecto.

Ejemplo de archivo de confianza:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Los hashes son independientes: `filtersSha256` confía en `.rtk/filters.json`, mientras que `filtersTomlSha256`
confía en `.rtk/filters.toml`. Editar cualquiera de los archivos invalida únicamente su propia entrada de confianza. Los archivos globales
son instalados por el administrador y utilizan el comportamiento de confianza existente para los filtros globales.

Los filtros personalizados pueden ser un objeto de filtro o una matriz de objetos de filtro. Los filtros personalizados no válidos se
omiten y se incluyen en los diagnósticos de `/api/context/rtk/filters`. Los filtros integrados no válidos provocan un error inmediato.

## Compatibilidad con el esquema TOML v1 de RTK

OmniRoute puede analizar, validar, probar e instalar archivos de filtros declarativos mediante el esquema TOML v1 de RTK.
Los campos compatibles son `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` y las pruebas en línea `[[tests.<filter>]]`.
Se rechazan los campos desconocidos, las expresiones regulares no válidas o inseguras, las reglas simultáneas de eliminación y conservación, los archivos de más de
1 MiB y las referencias a filtros desconocidos. Un archivo cuyas pruebas en línea fallen puede
validarse para su inspección, pero no puede instalarse ni cargarse. Los fallos al cargar archivos personalizados siguen
un comportamiento abierto ante fallos: el archivo no válido se omite y los filtros restantes continúan funcionando.

OmniRoute recibe la salida de la herramienta después de que el cliente ya la haya capturado, por lo que `filter_stderr = true`
no puede cambiar la captura del proceso. El campo se acepta sin realizar ninguna operación y la validación devuelve una advertencia.
Esto se describe intencionadamente como **compatibilidad con el esquema TOML v1 de RTK**, no como compatibilidad total
con el ejecutable RTK, los hooks de shell, las implementaciones de comandos en Rust ni la estructura de su almacén de confianza.

La vista avanzada de RTK del panel acepta TOML pegado o cargado. La validación es de solo lectura.
La instalación escribe `DATA_DIR/rtk/filters.toml` de forma atómica con permisos restrictivos y actualiza
el catálogo de filtros activo sin necesidad de reiniciar. Reemplazar un archivo existente requiere la confirmación explícita de `overwrite`
y crea primero `DATA_DIR/rtk/filters.toml.bak`.

## DSL de filtros

Los filtros utilizan el esquema JSON descrito en [Formato de reglas de compresión](./COMPRESSION_RULES_FORMAT.md).
El entorno de ejecución aplica estas etapas en orden:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> descartar/incluir líneas
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Campos importantes:

| Campo                        | Propósito                                                                           |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| `rules.stripAnsi`            | Eliminar las secuencias de color/control del terminal antes de buscar coincidencias |
| `rules.filterStderr`         | Normalizar los prefijos comunes de stderr antes de buscar coincidencias o filtrar   |
| `rules.replace`              | Aplicar reemplazos ordenados mediante expresiones regulares                         |
| `rules.matchOutput`          | Devolver un resumen compacto cuando la salida coincida con una condición conocida   |
| `rules.matchOutput[].unless` | Omitir el atajo cuando exista un patrón de error o fallo                            |
| `rules.dropPatterns`         | Eliminar líneas irrelevantes                                                        |
| `rules.includePatterns`      | Dar prioridad a las líneas que permiten actuar                                      |
| `rules.collapsePatterns`     | Contraer líneas coincidentes repetidas                                              |
| `rules.deduplicate`          | Activación opcional por filtro: contraer líneas duplicadas consecutivas             |
| `rules.truncateLineAt`       | Truncamiento por línea compatible con Unicode                                       |
| `rules.onEmpty`              | Mensaje alternativo si se filtran todas las líneas                                  |
| `tests[]`                    | Ejemplos en línea utilizados por la puerta de verificación                          |

Se espera que los filtros integrados incluyan ejemplos de `tests[]` en línea. Los filtros personalizados también deberían incluirlos,
especialmente cuando se comparten entre proyectos.

## Deduplicación de líneas (dos capas)

RTK combina las líneas duplicadas en dos capas independientes:

1. **`deduplicate` por filtro (opcional, valor predeterminado `false`).** Un filtro puede establecer `rules.deduplicate: true`
   para combinar líneas duplicadas consecutivas _dentro de la salida coincidente de ese filtro_, antes del truncamiento.
   Esto se ejecuta dentro de `lineFilter.ts`. Para los filtros heredados, se habilita automáticamente cuando el filtro define
   `collapsePatterns`. Esquema: `deduplicate: z.boolean().default(false)` en
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **`deduplicateThreshold` para todo el motor (valor predeterminado `3`).** Después de ejecutar todos los filtros, el motor combina
   cualquier secuencia de `>= deduplicateThreshold` líneas consecutivas idénticas en todo el resultado
   (`deduplicateRepeatedLines`, aplicado en `engines/rtk/index.ts`). Durante la normalización, el valor se limita al intervalo de 2 a 100.

La pasada por filtro se ejecuta primero (dentro del filtro) y la pasada para todo el motor se ejecuta al final (sobre la salida
unida), por lo que ambas se combinan sin contabilizar dos veces.

## Agrupación de líneas (`enableGrouping`)

Cuando `rtkConfig.enableGrouping` es `true` (valor predeterminado `false`), RTK ejecuta una pasada adicional de `groupSimilarLines`
sobre el resultado posterior a la deduplicación, que combina secuencias de líneas consecutivas _casi equivalentes_ (no idénticas byte a byte).
`rtkConfig.groupingThreshold` (valor predeterminado `3`) es la longitud mínima de la secuencia que activa
la agrupación. Esta es la contraparte estructural de `deduplicateThreshold`: la deduplicación gestiona repeticiones exactas,
mientras que la agrupación gestiona «la misma forma con pequeñas diferencias». Ambas opciones forman parte del JSON `rtkConfig`
conservado en la tabla `key_value` (consulte Configuración más arriba), por lo que el ajuste persiste tras los reinicios.

## Eliminación de comentarios de código (`stripCodeComments` / `preserveDocstrings`)

Cuando `rtkConfig.applyToCodeBlocks` está habilitado, RTK también puede eliminar comentarios de bloques de código delimitados:

- `stripCodeComments` (valor predeterminado `false`) — opcional. Cuando es `true`, RTK elimina los comentarios de los bloques delimitados de JavaScript
  y TypeScript. Históricamente, esta opción se leía, pero nunca se aplicaba, por lo que el valor predeterminado sigue siendo
  «conservar» para evitar un cambio silencioso en producción.
- `preserveDocstrings` (valor predeterminado `true`) — al eliminar comentarios, se conservan los comentarios de bloque JSDoc/`/** … */`
  (contienen documentación de la API cuyo valor supera el coste de los bytes que ocupan). Establézcalo en `false` para eliminarlos
  también.

La eliminación de comentarios está implementada en `open-sse/services/compression/engines/rtk/codeStripper.ts`. Utiliza
el **analizador de TypeScript** (no una expresión regular) para que los literales de cadena, plantilla y expresión regular nunca se confundan
con comentarios, y abandona el proceso por completo cuando detecta JSX (de modo que los comentarios de contenedores de expresiones JSX
nunca resulten dañados). Actualmente, la eliminación de comentarios se aplica **solo a JavaScript y TypeScript**; otros
lenguajes del conjunto `CodeLanguage` del eliminador (Python, Rust, Go, Ruby, Java) eliminan líneas vacías y
compactan espacios en blanco, pero no eliminan comentarios. La ejecución del bloque depurado se etiqueta como `rtk:code-strip` en
`rulesApplied`.

> **Nota: GCF/la codificación tabular es un motor independiente.** RTK **no** contiene el codificador JSON
> tabular/columnar «GCF» (Graph Compact Format). Ese codificador —que reemplazó a un codificador anterior
> `omni-tabular`— se encuentra en el motor **headroom**
> (`open-sse/services/compression/engines/headroom/`, con el códec incorporado en
> `headroom/gcf/`). No está relacionado con la canalización de filtros de RTK documentada aquí.

## Configuración

Los ajustes globales están disponibles a través de `/api/settings/compression`. Los ajustes específicos de RTK también están
disponibles a través de `/api/context/rtk/config`.

```json
{
  "defaultMode": "stacked",
  "autoTriggerMode": "stacked",
  "autoTriggerTokens": 32000,
  "stackedPipeline": [
    { "engine": "rtk", "intensity": "standard" },
    { "engine": "caveman", "intensity": "full" }
  ],
  "rtkConfig": {
    "enabled": true,
    "intensity": "standard",
    "applyToToolResults": true,
    "applyToCodeBlocks": false,
    "applyToAssistantMessages": false,
    "enabledFilters": [],
    "disabledFilters": [],
    "maxLinesPerResult": 120,
    "maxCharsPerResult": 12000,
    "deduplicateThreshold": 3,
    "customFiltersEnabled": true,
    "trustProjectFilters": false,
    "rawOutputRetention": "never",
    "rawOutputMaxBytes": 1048576,
    "enableGrouping": false,
    "groupingThreshold": 3,
    "stripCodeComments": false,
    "preserveDocstrings": true
  }
}
```

`enabledFilters` y `disabledFilters` usan identificadores de filtro, por ejemplo, `test-vitest` o `git-diff`.

La estructura completa de `rtkConfig` está definida por `RtkConfig` / `DEFAULT_RTK_CONFIG` en
`open-sse/services/compression/types.ts`. El objeto completo se conserva como un único valor JSON en
la tabla `key_value` de SQLite bajo `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`), y `normalizeRtkConfig` lo normaliza al leerlo. Por lo tanto, todos los campos siguientes
— incluidos `enableGrouping`, `groupingThreshold`, `stripCodeComments` y `preserveDocstrings` —
realizan el ciclo completo a través del mismo almacén y se conservan tras un reinicio.

| Clave                  | Valor predeterminado | Propósito                                                                                      |
| ---------------------- | -------------------- | ---------------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`                  | Para todo el motor: mínimo de líneas consecutivas idénticas que se contraen (limitado a 2–100) |
| `enableGrouping`       | `false`              | Opcional: contrae secuencias de líneas consecutivas casi equivalentes                          |
| `groupingThreshold`    | `3`                  | Secuencia consecutiva mínima de líneas similares que activa la agrupación                      |
| `stripCodeComments`    | `false`              | Opcional: elimina comentarios de bloques de código delimitados (requiere `applyToCodeBlocks`)  |
| `preserveDocstrings`   | `true`               | Al eliminar comentarios, conserva los bloques JSDoc/`/** … */`                                 |

## API

| Ruta                               | Método | Propósito                                                   |
| ---------------------------------- | ------ | ----------------------------------------------------------- |
| `/api/context/rtk/config`          | GET    | Leer la configuración de RTK                                |
| `/api/context/rtk/config`          | PUT    | Actualizar la configuración de RTK                          |
| `/api/context/rtk/filters`         | GET    | Enumerar el catálogo de filtros y los diagnósticos de carga |
| `/api/context/rtk/import`          | POST   | Validar o instalar archivos de esquema TOML v1 de RTK       |
| `/api/context/rtk/test`            | POST   | Previsualizar la compresión RTK para una carga de texto     |
| `/api/context/rtk/raw-output/[id]` | GET    | Leer la salida sin procesar, redactada y conservada         |
| `/api/compression/preview`         | POST   | Previsualizar cualquier modo de compresión                  |

Carga de prueba de RTK:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Carga de previsualización de compresión:

```json
{
  "mode": "stacked",
  "messages": [
    {
      "role": "tool",
      "content": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed"
    }
  ],
  "config": {
    "rtkConfig": {
      "rawOutputRetention": "failures"
    }
  }
}
```

Las rutas de administración requieren autenticación de administración del panel o la política de clave de API correspondiente.

Carga de validación TOML de RTK:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Usa `"action": "install"` para instalar globalmente el archivo validado. Añade `"overwrite": true` únicamente
después de revisar y confirmar la sustitución de un archivo global existente.

## Recuperación de la salida sin procesar

Normalmente, RTK solo devuelve texto comprimido. Para la depuración, `rawOutputRetention` puede conservar la salida sin procesar redactada:

| Valor      | Comportamiento                                                         |
| ---------- | ---------------------------------------------------------------------- |
| `never`    | No conservar la salida sin procesar                                    |
| `failures` | Conservar únicamente la salida que probablemente corresponda a errores |
| `always`   | Conservar toda salida sin procesar comprimida por RTK, tras redactarla |

Los archivos conservados se escriben en:

```txt
DATA_DIR/rtk/raw-output/
```

Los secretos se redactan antes de persistirlos, incluidos tokens de portador comunes, claves de API, tokens de Slack, claves de acceso de AWS y valores con formato de asignación `token=...`, `secret=...`, `password=...`. Los análisis solo almacenan el identificador del puntero y los metadatos de tamaño y hash.

## Puerta de verificación

La puerta de verificación específica ejecuta pruebas integradas de filtros en línea sin invocar comandos externos mediante el shell:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

La puerta de RTK más amplia es:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Ejecute la puerta de compresión amplia antes del lanzamiento:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Ampliación de RTK

1. Añada o actualice un archivo JSON de filtro.
2. Incluya al menos una muestra `tests[]` que demuestre el comportamiento importante.
3. Añada un fixture en `tests/unit/compression/fixtures/rtk/` para las nuevas familias de comandos.
4. Añada cobertura de detección de comandos cuando introduzca una nueva clase de salida.
5. Ejecute las puertas de verificación y de RTK amplia.
6. Si el filtro es local al proyecto, confirme `.rtk/filters.json` y actualice `.rtk/trust.json` únicamente después de revisarlo.

---

## Niveles de intensidad (v3.8.16+)

RTK admite **3 niveles de intensidad** que ofrecen distintos equilibrios entre la **agresividad de la compresión** y la **seguridad**. El nivel se establece mediante `config.intensity` en la configuración del motor.

### Los 3 niveles

| Nivel                       | Umbral de truncamiento | Ahorro de tokens | Riesgo   | Ideal para                       |
| --------------------------- | ---------------------- | ---------------- | -------- | -------------------------------- |
| `minimal`                   | 24 líneas por sección  | ~20-40%          | Muy bajo | Producción con contexto crítico  |
| `standard` (predeterminado) | 24 líneas por sección  | ~50-70%          | Bajo     | Sesiones diarias de programación |
| `aggressive`                | 16 líneas por sección  | ~70-90%          | Medio    | Sesiones largas, ahorro máximo   |

### Dónde se produce el truncamiento

El umbral de truncamiento afecta a `lineFilter.ts`:

```ts
// De open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Se conservan tanto el **inicio** como el **final** de cada sección; el contenido intermedio se descarta cuando se activa el truncamiento.

### Qué se conserva y qué se elimina

| Contenido                         | minimal       | standard      | aggressive    |
| --------------------------------- | ------------- | ------------- | ------------- |
| Errores / trazas de pila          | ✅ conservado | ✅ conservado | ✅ conservado |
| Fallos de pruebas                 | ✅ conservado | ✅ conservado | ✅ conservado |
| Errores de compilación            | ✅ conservado | ✅ conservado | ✅ conservado |
| Pruebas superadas (detalladas)    | ✅ conservado | 🟡 contraído  | 🟡 contraído  |
| Salida rutinaria (registros info) | 🟡 contraído  | 🟡 contraído  | ❌ descartado |
| Barras de progreso                | 🟡 contraído  | ❌ descartado | ❌ descartado |
| Banner / arte ASCII               | 🟡 contraído  | ❌ descartado | ❌ descartado |

### Elección de la intensidad adecuada

```
                  ¿Perder contexto sería catastrófico?
                  │
      ┌───────────┼───────────┐
      │           │           │
     SÍ          NO         NO SEGURO
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      ¿Qué importancia  Pruebe primero `standard`
      │      tiene el          (funciona en el 80% de los
      │      rendimiento?      casos)
      │           │
      │      ┌────┴────┐
      │      │         │
      │     BAJA      ALTA
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Configuración de la intensidad

**Por combo** (en la configuración del combo):

```json
{
  "combo": "my-coding-combo",
  "routing": {/* ... */},
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

**Mediante programación**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) es un
`CompressionEngine` y no tiene ningún método `updateConfig`. En su lugar, actualice la configuración
de un motor mediante la función auxiliar del registro:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Verificación del efecto

Utilice la **puerta de verificación** (véase más abajo) para confirmar que su filtro es seguro con la intensidad elegida:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Los filtros fallaron con la intensidad aggressive");
}
```

---

## Desarrollo de filtros personalizados (v3.8.16+)

El directorio `engines/rtk/filters/` contiene **más de 49 archivos JSON de filtros integrados**. Puede añadir los suyos propios para comprimir la salida de herramientas personalizadas no cubiertas por los valores predeterminados.

### Esquema del filtro (Zod)

```ts
{
  "id": "string",                      // Obligatorio. Identificador del filtro (kebab-case, p. ej., "python-traceback")
  "label": "string",                   // Obligatorio. Nombre legible del filtro
  "description": "string",             // Opcional (valor predeterminado: ""). Descripción breve de lo que hace el filtro
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Opcional (0-100, valor predeterminado: 50). Orden de ejecución (un valor mayor se ejecuta primero)
  "match": {
    "commands": ["string"],            // Nombres de comandos que deben coincidir (p. ej., "python", "pytest")
    "patterns": ["string"],            // Patrones regex que deben coincidir con la salida
    "outputTypes": ["string"]          // Clases de salida detectadas (p. ej., "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Opcional (valor predeterminado: false). Elimina los códigos de color ANSI
    "replace": [                       // Reglas de búsqueda y reemplazo (valor predeterminado: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Finaliza anticipadamente cuando coincide un patrón (valor predeterminado: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Omite si este patrón coincide
      }
    ],
    "includePatterns": ["string"],     // Líneas que se conservarán (patrones regex, valor predeterminado: [])
    "dropPatterns": ["string"],        // Líneas que se eliminarán (patrones regex, valor predeterminado: [])
    "collapsePatterns": ["string"],    // Líneas que se reducirán a una única aparición (valor predeterminado: [])
    "deduplicate": boolean,            // Opcional (valor predeterminado: false). Elimina las líneas duplicadas
    "truncateLineAt": number,          // Opcional (valor predeterminado: 0). Trunca las líneas a un número máximo de caracteres
    "maxLines": number,                // Opcional (valor predeterminado: 0). Límite estricto del número total de líneas
    "headLines": number,               // Opcional (valor predeterminado: 20). Conserva las primeras N líneas de la salida coincidente
    "tailLines": number,               // Opcional (valor predeterminado: 20). Conserva las últimas N líneas de la salida coincidente
    "onEmpty": "string",               // Opcional (valor predeterminado: ""). Mensaje alternativo si se filtran todas las líneas
    "filterStderr": boolean            // Opcional (valor predeterminado: false). También filtra la salida stderr
  },
  "preserve": {
    "errorPatterns": ["string"],       // Patrones que siempre deben conservarse (valor predeterminado: [])
    "summaryPatterns": ["string"]      // Patrones para la línea de resumen final (valor predeterminado: [])
  },
  "tests": [                           // Pruebas integradas para verificación (valor predeterminado: [])
    {
      "name": "string",               // Obligatorio. Nombre de la prueba
      "input": "sample output",        // Obligatorio. Texto de entrada de ejemplo
      "expected": "expected output",   // Obligatorio. Salida comprimida esperada
      "command": "optional command"    // Opcional. Contexto del comando
    }
  ]
}
```

### Ejemplo: filtro de rastreo de Python

```json
{
  "id": "python-traceback",
  "label": "Python Traceback Filter",
  "description": "Compresses Python tracebacks to essential file/line locations and error type",
  "category": "test",
  "priority": 60,
  "match": {
    "commands": ["python", "python3", "pytest", "uv", "poetry"],
    "patterns": ["Traceback \\(most recent call last\\)", "Error", "Exception"],
    "outputTypes": ["error-traceback"]
  },
  "rules": {
    "stripAnsi": true,
    "includePatterns": [
      "Traceback \\(most recent call last\\)",
      "^\\s*File \".+\", line \\d+",
      "^\\s*[A-Z][a-zA-Z]+Error:",
      "^\\s*[A-Z][a-zA-Z]+Exception"
    ],
    "dropPatterns": ["site-packages/", "^\\s+[a-z_]+\\([^)]*\\)$"],
    "headLines": 5,
    "tailLines": 3,
    "maxLines": 25,
    "filterStderr": true
  },
  "preserve": {
    "errorPatterns": ["Error:", "Exception:", "Traceback"],
    "summaryPatterns": ["^[A-Z][a-zA-Z]+(?:Error|Exception):"]
  },
  "tests": [
    {
      "name": "preserves-error-type-and-location",
      "input": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "expected": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n  File \"lib/utils.py\", line 17, in helper\nZeroDivisionError: division by zero",
      "command": "python app.py"
    }
  ]
}
```

### Carga de filtros personalizados

Coloque el archivo en una ubicación reconocida:

```
~/.omniroute/rtk/filters/my-filter.json     # Nivel de usuario
<project>/.rtk/filters/my-filter.json      # Nivel de proyecto
```

Los filtros se cargan automáticamente al iniciar mediante `loadRtkFilters()` en `open-sse/services/compression/engines/rtk/filterLoader.ts`. El cargador detecta filtros en:

- Catálogo integrado: `open-sse/services/compression/engines/rtk/filters/`
- Directorio del usuario: `~/.omniroute/rtk/filters/`
- Directorio del proyecto: `<project>/.rtk/filters/`

Para cargar filtros mediante programación:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Opciones: customFiltersEnabled (carga los filtros del usuario/proyecto; activado de forma predeterminada),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Validación

Los filtros se validan con el esquema de Zod durante la carga. Un filtro con una estructura incorrecta no se cargará y registrará un error:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

Para validar todos los filtros instalados, llame a `runRtkFilterTests()`, que se exporta desde `open-sse/services/compression/engines/rtk/verify.ts`.

### Prácticas recomendadas

1. **Incluye siempre `tests[]`** — demuestran que tu filtro funciona y evitan regresiones
2. **Usa `matchOutput` para cortocircuitos** — si una sola línea cuenta toda la historia, sustituye el bloque completo
3. **Prefiere `keep` a `strip`** — las reglas explícitas de «preservar siempre» son más seguras que las de «eliminar siempre»
4. **Prueba los 3 niveles de intensidad** — `minimal` no debería realizar cambios y `aggressive` debería seguir preservando los errores
5. **Usa el campo `unless`** — protege los cortocircuitos con «no activar si X está presente»

---

## Recuperación de la salida sin procesar y puerta de verificación

Cuando RTK comprime la salida de forma agresiva, puedes **recuperar el texto original** para depuración, auditoría o reproducción.

### Cómo funciona la recuperación de la salida sin procesar

```
Salida original (10K tokens)
        │
        ▼
Compresión de RTK (con rawOutput.enabled=true)
        │
        ├─▶ Salida comprimida (2K tokens)  ──▶ al LLM
        │
        └─▶ Salida original (10K tokens)   ──▶ almacenada en la BD
                                                  (vinculada mediante request_id)
```

### Activación del almacenamiento de la salida sin procesar

**Por solicitud** (en la configuración combinada):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // límite de 1MB
    }
  }
}
```

**Valor predeterminado**: `rawOutput.enabled: false` (ahorra almacenamiento).

### Coste de almacenamiento

| Por solicitud                  | Límite de 1MB | Límite de 10MB |
| ------------------------------ | ------------- | -------------- |
| Salida comprimida promedio     | ~5KB          | ~5KB           |
| Salida sin procesar almacenada | ~50-500KB     | ~500KB-5MB     |
| Con 1000 solicitudes/día       | 50-500MB/día  | 500MB-5GB/día  |

> **Recomendación**: Activa la salida sin procesar únicamente para **sesiones de depuración** o **auditorías por muestreo**, no de forma permanente.

### Recuperación del original

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId de las estadísticas de compresión
if (raw) {
  console.log("Original output:", raw);
}
```

El `pointerId` se devuelve en `CompressionStats.rtkRawOutputPointers[]` después de la compresión.
Consulta `open-sse/services/compression/engines/rtk/rawOutput.ts:102` para ver la firma de la función.

### La puerta de verificación

La **verificación de filtros de RTK** (`open-sse/services/compression/engines/rtk/verify.ts`) valida todos los filtros respecto a sus `tests[]` y garantiza que el comportamiento sea correcto en los 3 niveles de intensidad.

**Llama a `runRtkFilterTests()`** para ejecutar la verificación:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Passed: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Failed: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Filters failed verification");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: expected "${o.expected}", got "${o.actual}"`
      );
    });
}
```

**Qué valida**:

1. Todos los filtros se cargan y superan la validación del esquema
2. Cada entrada de `tests[]` produce la salida esperada
3. La intensidad `minimal` no realiza ninguna operación (conserva el original y solo aplica filtros estructurales)
4. La intensidad `aggressive` conserva los errores, los fallos de las pruebas y los seguimientos de pila
5. La salida comprimida nunca es mayor que la entrada original

- Fuente: `open-sse/services/compression/engines/rtk/` (63 archivos, ~70KB)

- **Antes de fusionar un cambio en un filtro** — asegúrate siempre de que las pruebas se superen
- **Después de actualizar el motor RTK** — el esquema puede haber cambiado
- **Periódicamente durante la monitorización** — protege contra desviaciones en los datos de prueba
- **Al añadir una nueva familia de herramientas/comandos** — demuestra que el nuevo filtro funciona

---

## Véase también

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Descripción general completa del proceso de compresión
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registro de motores y motores integrados
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Motores personalizados, paquetes de idiomas y procesos apilados
- Código fuente: `open-sse/services/compression/engines/rtk/` (63 archivos, ~70 KB)
