# Compression Rules Format (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

Las reglas de compresión son archivos JSON que se cargan en tiempo de ejecución. Intencionadamente, solo contienen datos para que los nuevos
paquetes de idiomas y filtros de comandos RTK puedan revisarse sin modificar el código del motor.

> **Esquema canónico (fuente de verdad):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema, borrador 2020-12).
> Los ejemplos siguientes son ilustrativos; en caso de duda, valida tu paquete con `_schema.json`.

## Paquetes de reglas Caveman

Los paquetes de reglas Caveman se encuentran en:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

Cada paquete contiene sustituciones que se aplican al texto normal después de aislar las regiones protegidas.

```json
{
  "language": "en",
  "category": "filler",
  "rules": [
    {
      "name": "question_to_directive",
      "pattern": "\\b(?:Can you explain why|Could you show me how)\\b\\s*",
      "replacement": "Explain why ",
      "replacementMap": {
        "can you explain why": "Explain why ",
        "could you show me how": "Show how "
      },
      "flags": "gi",
      "context": "all",
      "category": "context",
      "minIntensity": "lite",
      "description": "Convert verbose questions into direct requests."
    }
  ]
}
```

### Campos de Caveman

| Campo                    | Obligatorio | Descripción                                                                                     |
| ------------------------ | ----------- | ----------------------------------------------------------------------------------------------- |
| `language`               | sí          | Clave de idioma similar a BCP-47, como `en`, `pt-BR`, `es`                                      |
| `category`               | sí          | Nombre de archivo/categoría del paquete, por ejemplo, `filler` o `dedup`                        |
| `rules`                  | sí          | Matriz de reglas de sustitución mediante expresiones regulares                                  |
| `rules[].name`           | sí          | Nombre estable de la regla                                                                      |
| `rules[].pattern`        | sí          | Patrón de expresión regular de JavaScript                                                       |
| `rules[].flags`          | no          | Indicadores de expresiones regulares de JavaScript; valor predeterminado: `gi`                  |
| `rules[].replacement`    | no          | Cadena de sustitución o valor alternativo cuando `replacementMap` no encuentra una coincidencia |
| `rules[].replacementMap` | no          | Sustituciones específicas de coincidencias indexadas por el texto coincidente normalizado       |
| `rules[].context`        | no          | `all`, `user`, `assistant` o `system`; valor predeterminado: `all`                              |
| `rules[].category`       | no          | `filler`, `context`, `structural`, `dedup`, `terse` o `ultra`                                   |
| `rules[].minIntensity`   | no          | `lite`, `full` o `ultra`; valor predeterminado: `lite`                                          |
| `rules[].description`    | no          | Resumen de la regla legible por humanos                                                         |

Usa `flags` cuando sea importante distinguir entre mayúsculas y minúsculas, por ejemplo, al eliminar artículos antes de texto en minúsculas
sin eliminar `the OpenAI API`. Usa `replacementMap` cuando una expresión regular tenga varias alternativas
que requieran resultados diferentes; esto permite que los paquetes de reglas JSON sigan conteniendo solo datos y, al mismo tiempo, conserven el comportamiento de
las funciones de sustitución integradas de TypeScript, que son más completas.

## Paquetes de filtros RTK

Los filtros RTK se encuentran en:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

Cada filtro describe cómo reconocer y comprimir una familia de salidas de comandos.

```json
{
  "id": "test-vitest",
  "label": "Vitest output",
  "category": "test",
  "priority": 92,
  "match": {
    "outputTypes": ["test-vitest"],
    "commands": ["vitest", "npm test", "npm run test"],
    "patterns": ["\\bFAIL\\b", "\\bPASS\\b", "\\bTest Files\\b"]
  },
  "rules": {
    "stripAnsi": true,
    "replace": [{ "pattern": "\\s+\\[[0-9]+ms\\]", "replacement": "" }],
    "matchOutput": [
      {
        "pattern": "All tests passed",
        "message": "vitest: ok",
        "unless": "FAIL|Error:"
      }
    ],
    "includePatterns": ["FAIL", "Error:", "Test Files", "Tests"],
    "dropPatterns": ["^\\s*$", "Duration\\s+\\d+"],
    "collapsePatterns": ["^\\s+at "],
    "deduplicate": true,
    "truncateLineAt": 240,
    "maxLines": 160,
    "headLines": 24,
    "tailLines": 40,
    "onEmpty": "vitest: ok",
    "filterStderr": false
  },
  "preserve": {
    "errorPatterns": ["FAIL", "Error:", "AssertionError"],
    "summaryPatterns": ["Test Files", "Tests", "Snapshots"]
  },
  "tests": [
    {
      "name": "keeps failing tests",
      "command": "vitest",
      "input": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed",
      "expected": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed"
    }
  ]
}
```

### Campos de RTK

| Campo                      | Obligatorio | Descripción                                                                         |
| -------------------------- | ----------- | ----------------------------------------------------------------------------------- |
| `id`                       | sí          | Identificador estable del filtro                                                    |
| `label`                    | sí          | Nombre legible en el panel de control                                               |
| `category`                 | sí          | Familia del filtro: git, test, build, shell, docker, package, infra, cloud, generic |
| `priority`                 | no          | La prioridad más alta prevalece cuando coinciden varios filtros                     |
| `match.outputTypes`        | no          | Identificadores de salida del detector que seleccionan este filtro                  |
| `match.commands`           | no          | Tokens de comandos que seleccionan este filtro                                      |
| `match.patterns`           | no          | Patrones regex que seleccionan este filtro a partir del texto de salida             |
| `rules.stripAnsi`          | no          | Elimina las secuencias de escape ANSI antes de las etapas de regex                  |
| `rules.replace`            | no          | Sustituciones regex ordenadas que se aplican línea por línea                        |
| `rules.matchOutput`        | no          | Reglas de salida de cortocircuito con una condición `unless` opcional               |
| `rules.includePatterns`    | no          | Líneas cuya conservación debe priorizarse                                           |
| `rules.dropPatterns`       | no          | Líneas que deben eliminarse por considerarse ruido                                  |
| `rules.collapsePatterns`   | no          | Líneas coincidentes repetidas que pueden contraerse                                 |
| `rules.deduplicate`        | no          | Contrae las líneas normalizadas duplicadas                                          |
| `rules.truncateLineAt`     | no          | Límite de caracteres por línea compatible con Unicode                               |
| `rules.maxLines`           | no          | Número máximo de líneas conservadas antes de preservar la parte final               |
| `rules.headLines`          | no          | Líneas iniciales conservadas durante el truncamiento                                |
| `rules.tailLines`          | no          | Líneas finales conservadas para mantener el contexto reciente                       |
| `rules.onEmpty`            | no          | Mensaje alternativo cuando el filtrado elimina todo el contenido                    |
| `rules.filterStderr`       | no          | Normaliza los prefijos comunes de stderr antes de etapas de filtrado posteriores    |
| `preserve.errorPatterns`   | no          | Líneas de error que deben conservarse tras el truncamiento                          |
| `preserve.summaryPatterns` | no          | Líneas de resumen que deben conservarse tras el truncamiento                        |
| `tests[]`                  | no          | Ejemplos de verificación integrados utilizados por la puerta de verificación de RTK |

RTK aplica las etapas declarativas en este orden: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines` y `onEmpty`.

Los filtros personalizados pueden cargarse desde:

1. Los archivos `.rtk/filters.json` del proyecto, solo después de que exista un hash coincidente en `.rtk/trust.json` o
   se haya habilitado `trustProjectFilters`.
2. El archivo global `DATA_DIR/rtk/filters.json`.
3. Los filtros integrados.

Los archivos personalizados del proyecto/globales pueden contener un objeto de filtro o una matriz de objetos de filtro. Los filtros
personalizados no válidos se omiten con diagnósticos; los filtros integrados no válidos provocan un error de validación.

Archivo de confianza del proyecto:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

La anulación mediante la variable de entorno `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` confía en los filtros del proyecto sin un
hash y debe limitarse al desarrollo local controlado.

## Reglas de seguridad

- Mantén las reglas idempotentes: ejecutar el mismo filtro dos veces no debe corromper la salida.
- Conserva el texto exacto de los errores, las rutas de archivos, los números de línea y los resúmenes de comandos siempre que sea posible.
- Evita reglas que modifiquen bloques de código, cargas JSON, URLs o secretos.
- Añade cobertura unitaria para nuevas familias de comandos en las pruebas de detectores/filtros.
- Añade muestras `tests[]` a cada filtro integrado y a los filtros personalizados compartidos.

## Validación

Los paquetes de reglas se validan antes de usarse. Los paquetes Caveman integrados y los filtros RTK integrados fallan de inmediato
durante la validación para que los recursos de lanzamiento defectuosos se detecten antes de su distribución. Los filtros RTK personalizados se
omiten con diagnósticos cuando falla el análisis o la validación de confianza.

Validación específica:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
