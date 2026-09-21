# Extending the Compression Pipeline (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **TL;DR**: El motor de compresión de OmniRoute es **conectable**: puedes registrar motores personalizados, distribuir paquetes de idioma para nuevos idiomas y componer canalizaciones apiladas. Esta guía muestra cómo hacerlo.

**Guías relacionadas:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Descripción general de la canalización completa
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registro de motores y motores integrados
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Motor RTK y filtros personalizados
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Referencia del formato de los paquetes de reglas

---

## Descripción general

El sistema de compresión tiene **3 puntos de extensión**:

| Punto de extensión       | Caso de uso                                                                                              | Dificultad   |
| ------------------------ | -------------------------------------------------------------------------------------------------------- | ------------ |
| **Motor personalizado**  | Añadir un algoritmo de compresión completamente nuevo (p. ej., un resumidor especializado en un dominio) | Avanzada     |
| **Paquete de idioma**    | Añadir compatibilidad con un nuevo idioma natural (p. ej., hindi o árabe)                                | Media        |
| **Canalización apilada** | Componer motores existentes en un orden personalizado                                                    | Principiante |

```
┌─────────────────────────────────────────────────────────────┐
│                    Estrategia de compresión                  │
│                                                             │
│   Mensajes de entrada ──▶ getEffectiveMode() ──▶ modo       │
│                                                │            │
│                      ┌─────────────────────────┼──────────┐  │
│                      │         │         │         │      │  │
│                      ▼         ▼         ▼         ▼      │  │
│                   "rtk"    "lite"   "standard" "stacked" │  │
│                      │         │         │         │      │  │
│                      ▼         ▼         ▼         ▼      │  │
│                   RTK       Lite     Caveman   engines[] │  │
│                   motor     motor    motor     encadenados│  │
│                      │         │         │         │      │  │
│                      └─────────┴─────────┴─────────┘      │  │
│                                      │                    │
│                                      ▼                    │
│                              Salida comprimida            │
└─────────────────────────────────────────────────────────────┘

El selector de estrategia se BASA EN MODOS: cada solicitud selecciona UN modo
(rtk / lite / standard / aggressive / ultra / stacked / off).
Solo el modo "stacked" encadena varios motores secuencialmente.
El modo predeterminado de activación automática es "lite" (no una cadena
de prioridades de 3 niveles).
```

---

## Cómo escribir un motor de compresión personalizado

La interfaz del motor (`open-sse/services/compression/engines/types.ts`) es el contrato que debe cumplir cada motor. Tiene 5 métodos obligatorios.

### La interfaz `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // ID único del motor
  name: string; // Nombre para mostrar
  description: string; // Descripción breve
  icon: string; // Icono (emoji o URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Puede utilizarse en una canalización apilada
  stackPriority: number; // Orden en las canalizaciones apiladas (menor = anterior)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Ejemplo mínimo: motor de espacios en blanco

El motor más sencillo posible: elimina los espacios en blanco adicionales de los mensajes.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Dividir por los delimitadores de bloques de código y conservar los espacios en blanco dentro de ellos
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // No modificar los bloques de código
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Aplicar solo a la prosa
    })
    .join("");
}

const whitespaceEngine: CompressionEngine = {
  id: "whitespace",
  name: "Whitespace Stripper",
  description: "Removes extra whitespace and blank lines",
  icon: "📝",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 100, // Ejecutar DESPUÉS de caveman/rtk

  metadata: {
    id: "whitespace",
    name: "Whitespace Stripper",
    description: "Removes extra whitespace and blank lines",
    inputScope: "messages",
    targetLatencyMs: 5,
    supportsPreview: true,
    stable: true,
  },

  apply(body, options) {
    return this.compress(body, options?.config);
  },

  compress(body, config = {}) {
    let originalLength = 0;
    let compressedLength = 0;

    // Recorrer el array de mensajes; gestionar tanto contenido de tipo string como multiparte
    const compressedBody = (body.messages || []).map((msg) => {
      if (typeof msg.content === "string") {
        originalLength += msg.content.length;
        let compressed = msg.content
          .replace(/[ \t]+/g, " ")
          .replace(/\n{3,}/g, "\n\n")
          .replace(/^\s+|\s+$/gm, "");
        compressedLength += compressed.length;
        return { ...msg, content: compressed };
      }
      // Contenido multiparte: recorrer las partes y comprimir solo las partes de texto
      if (Array.isArray(msg.content)) {
        const newParts = msg.content.map((part) => {
          if (part.type === "text" && typeof part.text === "string") {
            originalLength += part.text.length;
            let compressed = part.text
              .replace(/[ \t]+/g, " ")
              .replace(/\n{3,}/g, "\n\n")
              .replace(/^\s+|\s+$/gm, "");
            compressedLength += compressed.length;
            return { ...part, text: compressed };
          }
          return part; // conservar image_url, tool_use, etc.
        });
        return { ...msg, content: newParts };
      }
      return msg;
    });

    return {
      body: { ...body, messages: compressedBody },
      stats: {
        originalTokens: Math.ceil(originalLength / 4),
        compressedTokens: Math.ceil(compressedLength / 4),
        savingsPercent: originalLength > 0 ? 100 * (1 - compressedLength / originalLength) : 0,
        techniques: ["whitespace-collapse"],
        engineId: "whitespace",
      },
    };
  },

  getConfigSchema() {
    return [
      {
        key: "preserveCodeBlocks",
        type: "boolean",
        label: "Preserve code blocks",
        defaultValue: true,
        description: "Don't touch whitespace inside ```code``` blocks",
      },
    ];
  },

  validateConfig(config) {
    if (config.preserveCodeBlocks !== undefined && typeof config.preserveCodeBlocks !== "boolean") {
      return { valid: false, errors: ["preserveCodeBlocks must be a boolean"] };
    }
    return { valid: true, errors: [] };
  },
};

// Registrar globalmente
registerCompressionEngine(whitespaceEngine);
````

### Dónde colocar los motores personalizados

```
~/.omniroute/compression/engines/my-engine.ts    # Nivel de usuario
<project>/compression-engines/my-engine.ts        # Nivel de proyecto (se carga al iniciar)
```

O cárguelos mediante programación desde un plugin:

```ts
// En su plugin
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // El SDK de plugins expone los hooks onRequest / onResponse / onError. Registre el
  // motor cuando se cargue el módulo del plugin (o en el primer onRequest); anule su registro
  // desde su propia ruta de desmontaje.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Durante el desmontaje:
// unregisterCompressionEngine("my-engine");
```

### Probar su motor

Registre su motor en un plugin o una función de inicio. Una vez registrado, el motor estará disponible
en el selector de estrategias mediante su `id`. Pruebe la integración componiéndolo en una canalización apilada:

---

## Creación de paquetes de idioma

La compresión de estilo cavernícola utiliza **paquetes de reglas específicos de cada idioma** para gestionar muletillas, expresiones de duda y patrones verbosos en cada lengua natural. OmniRoute incluye **6 paquetes de idioma**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Estructura de los paquetes

Un paquete de idioma es un directorio de **archivos JSON** ubicado en `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Cortesías, expresiones de duda, fórmulas de amabilidad
│   ├── context.json         # Reglas de reducción de contexto
│   ├── dedup.json           # Reglas de deduplicación
│   ├── structural.json      # Puntuación, formato
│   └── ultra.json           # Reglas de compresión agresiva
├── es/  (misma estructura)
├── fr/  (misma estructura)
├── de/  (misma estructura)
├── ja/  (misma estructura)
└── pt-BR/ (misma estructura)
```

### Anatomía de una regla

Cada regla tiene esta forma (de `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Nombre legible para humanos (kebab-case)
  pattern: string; // Patrón de expresión regular de JavaScript
  replacement?: string; // Texto con el que se reemplazará la coincidencia
  replacementMap?: Record<string, string>; // O un mapa de clave→reemplazo
  flags?: string; // Indicadores de la expresión regular (normalmente "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Omitir por debajo de esta intensidad
  description?: string; // Documentación
}
```

### Ejemplo: adición de reglas de muletillas en hindi

```json
{
  "language": "hi",
  "category": "filler",
  "rules": [
    {
      "name": "polite_opener",
      "pattern": "\\b(?:नमस्ते|नमस्कार|आदरणीय)\\b[,!\\s]*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Strip polite openers like 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Strip 'actually' fillers"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Strip 'please' in Hindi"
    }
  ]
}
```

### Validación

Los paquetes de reglas se validan con `_schema.json` al cargarse. Un paquete con una estructura incorrecta no se cargará y registrará un error:

```
RULE_LOADER: el paquete "hi/filler.json" no superó la validación:
  - rules.0.pattern: Expresión regular no válida
  - rules.1.context: debe ser uno de [all, user, system, assistant]
```

La validación se ejecuta automáticamente cuando se carga un paquete (con `_schema.json`); un
paquete no válido se rechaza y se registra el error anterior. No existe un script
`npm run` independiente para validar paquetes: cargue el paquete (por ejemplo, inicie el servidor o
ejecute la ruta de compresión) y observe los registros.

### Carga de un paquete de idioma personalizado

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

O colóquelo en una ubicación reconocida:

```
~/.omniroute/compression/rules/hi/filler.json  # Nivel de usuario
<project>/.compression/rules/hi/filler.json   # Nivel de proyecto
```

### Prácticas recomendadas para paquetes de idioma

1. **Comience con `filler`** — estas son las reglas de mayor impacto
2. **Utilice `minIntensity`** para limitar las reglas agresivas — protege contra la compresión excesiva
3. **Incluya casos de prueba** — añada una matriz `tests[]` al JSON para verificar el comportamiento
4. **El orden importa** — las reglas anteriores se aplican primero; coloque primero las reglas de mayor impacto
5. **Sea prudente con `replacement`** — una cadena vacía suele ser la opción correcta; nunca introduzca contenido nuevo

### Estrategia de traducción

Al adaptar paquetes de reglas a un idioma nuevo:

1. **Traduzca los nombres de las reglas** — aparecen en la salida de depuración
2. **Adapte los patrones de expresiones regulares** — la traducción directa suele fallar (los límites de las palabras varían)
3. **Pruebe con conversaciones reales** — el paquete debe ser seguro con entradas reales
4. **Respete las convenciones culturales** — los paquetes de japonés, por ejemplo, tienen más muletillas honoríficas que los de inglés

---

## Pipelines apilados

Un **pipeline apilado** ejecuta varios motores en secuencia, y la salida de cada motor alimenta al siguiente. Así es como funciona internamente `mode: stacked`.

### Cómo funciona el apilamiento

```
Entrada (10,000 tokens)
        │
        ▼
   ┌──────────┐
   │  Motor   │  prioridad 10
   │  A       │  ──▶ salida: 6,000 tokens (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Motor   │  prioridad 50
   │  B       │  ──▶ salida: 2,400 tokens (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Motor   │  prioridad 100
   │  C       │  ──▶ salida: 1,200 tokens (-80%)
   └────┬─────┘
        │
        ▼
Salida final (1,200 tokens, ~88% de ahorro combinado)
```

Cuando se selecciona `mode: "stacked"`, los motores se ejecutan secuencialmente en el orden especificado en el array `pipeline`.
La salida del motor N se convierte en la entrada del motor N+1.

### Modos de compresión

OmniRoute selecciona **UN modo por solicitud** según la configuración, los umbrales de activación automática y las anulaciones de combinaciones.
Los modos disponibles se definen en `open-sse/services/compression/types.ts` (tipo `CompressionMode`):

| Modo         | Motores                | Caso de uso                                                                                                                                                                                                                                        |
| ------------ | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Ninguno                | Desactiva toda la compresión                                                                                                                                                                                                                       |
| `rtk`        | Solo RTK               | Sesiones con abundante salida de comandos (ahorro superior al 80%)                                                                                                                                                                                 |
| `lite`       | Solo Lite              | Compresión conservadora (rápida y segura)                                                                                                                                                                                                          |
| `standard`   | Caveman                | Compresión de prosa con paquetes de idioma                                                                                                                                                                                                         |
| `aggressive` | Caveman + Aggressive   | Prosa agresiva + pasada final agresiva                                                                                                                                                                                                             |
| `ultra`      | Ultra                  | Compresión máxima (con pérdida, último recurso). Opcionalmente se procesa mediante el motor SLM **LLMLingua-2** cuando se establece `ultra.modelPath` (si el modelo no está disponible, se recurre de forma tolerante a la ruta basada en reglas). |
| `stacked`    | Pipeline personalizado | Combina motores en cualquier orden (consulta más abajo)                                                                                                                                                                                            |

> Además de los motores de modo anteriores, el registro también incluye motores especializados que se pueden apilar —
> **CCR**, **headroom**, **ionizer** y **session-dedup** — documentados en
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

La selección del modo viene determinada por `getEffectiveMode()` en `open-sse/services/compression/strategySelector.ts`:

1. Si la compresión está desactivada: `"off"`
2. Si existe una anulación de combinación: usa la anulación
3. Si se supera el umbral de activación automática: usa `autoTriggerMode` (valor predeterminado: `"lite"`)
4. De lo contrario: usa `defaultMode`

### El pipeline apilado predeterminado

Cuando se configura explícitamente `mode: "stacked"`, el pipeline predeterminado combina:

1. **RTK** — elimina el ruido de la salida de comandos (~80% de ahorro en la salida del terminal)
2. **Caveman** — elimina el contenido superfluo y hace la prosa más concisa (~46% en el texto restante)
3. **Lite** — pasada final de espacios en blanco + deduplicación

Esta combinación consigue un **ahorro del 78-95%** en sesiones con un uso intensivo de herramientas.

### Configuración de pipelines apilados

En la configuración de la combinación:

```json
{
  "compression": {
    "mode": "stacked",
    "pipeline": [
      { "engine": "rtk", "config": { "intensity": "aggressive" } },
      { "engine": "caveman", "config": { "intensity": "full" } },
      { "engine": "lite", "config": {} }
    ]
  }
}
```

Puedes omitir motores, añadir motores personalizados o reordenarlos.

### Transferencia de estado

Los motores pueden leer metadatos del contexto de la solicitud (en `options`):

```ts
compress(body, config) {
  // Lee metadatos de motores anteriores
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Los metadatos son **de solo lectura**: los motores no pueden modificar el contexto de la solicitud, solo su propia salida del cuerpo.

### Consideraciones sobre el orden de ejecución

| Orden de los motores                       | Efecto                                                                                                  |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                       | **Recomendado** (elimina primero el ruido, después el lenguaje y finalmente los espacios)               |
| Lite → RTK → Caveman                       | Malo: Lite elimina los espacios de la salida sin procesar, lo que impide que RTK reconozca los patrones |
| Caveman → RTK                              | Malo: Caveman puede reescribir el texto de formas que RTK no reconoce                                   |
| Cualquier orden con `tool_results` primero | Mejor: la salida de las herramientas es el contenido con más ruido                                      |

### Cuándo NO apilar

Apilar no siempre es mejor:

- **Mensajes simples** (sin salida de herramientas): basta con Caveman o Lite por separado
- **Sensibilidad a los costes**: cada motor añade ~5-50ms de latencia
- **Herramientas específicas**: RTK por sí solo suele ser suficiente para la salida del shell

### Creación de un pipeline personalizado

No existe un registro de pipelines con nombre. Un pipeline apilado es simplemente un **array inline
de pasos** que se pasa a `applyStackedCompression()` (exportada desde
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Cuando no se proporciona un pipeline, el valor predeterminado es `rtk(standard) → caveman(full)`.

Para controlarlo desde la configuración, establece `mode: "stacked"` y proporciona el array de pasos en
`stackedPipeline` (leído desde `config.stackedPipeline`):

```json
{
  "compression": {
    "mode": "stacked",
    "stackedPipeline": [
      { "engine": "rtk", "intensity": "aggressive" },
      { "engine": "caveman", "intensity": "full" }
    ]
  }
}
```

---

## Política de sincronización con proyectos upstream

Los motores de compresión de OmniRoute reconocen en el README la contribución de varios proyectos upstream
("inspirado en RTK, Caveman, LLMLingua-2 y Troglodita"). Una pregunta habitual de los colaboradores
es: **cuando RTK upstream añade un nuevo filtro de herramientas o Caveman añade un paquete de
reglas, ¿cómo llega eso a OmniRoute?** Esta sección contiene la respuesta oficial.

### Copias vendorizadas frente a implementaciones independientes

| Motor                        | Relación con el proyecto upstream                                                                                                                | Ubicación                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| **RTK**                      | **Reimplementación independiente** (inspirada en el proyecto, no es una copia)                                                                   | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Reimplementación independiente** (inspirada en el proyecto)                                                                                    | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Principalmente interno; solo el códec `gcf/` está **realmente vendorizado** desde `gcf-typescript` (MIT, marcado con SPDX, solo perfil genérico) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Inspirados en estos proyectos (impulsan los motores `llmlingua` + `session-dedup`)                                                               | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Punto clave: **RTK y Caveman son implementaciones TypeScript de sala limpia de las
_ideas_ (reglas de filtrado, paquetes de reglas), no árboles de código fuente vendorizados.** No hay
ninguna copia upstream desde la que ejecutar `git pull`; precisamente por eso el README dice
"inspirado en" en lugar de "incluido".

### Cómo se integran las mejoras upstream

**No existe ningún seguimiento automatizado de versiones upstream ni ninguna etiqueta
`compression-sync`**, por diseño. Como los motores son reimplementaciones, un filtro de RTK
o un paquete de reglas de Caveman upstream no se integra como código, sino que se **vuelve a expresar como una nueva
regla o filtro en el formato propio de OmniRoute** (consulta
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) y se incorpora de manera puntual mediante
un PR normal. Los puntos de extensión anteriores (motor personalizado, paquete de idioma, filtro de RTK)
son la forma autorizada de contribuir con uno.

Ejemplos recientes de este flujo:

- Filtros de RTK para la salida de compilación de Gradle y `dotnet` (v3.8.42)
- Filtros de RTK para kubectl / docker-build / composer / gh (#2824)
- Paquete de idioma indonesio de Caveman (#3975), además de paquetes para alemán / francés / japonés / chino

### Headroom (proxy de compresión de entrada)

Headroom es **completamente interno**: una instantánea vendorizada y fijada del códec `gcf`, además de
las capas propias de OmniRoute `smartcrusher` / `toon` / `tabular`. No hay ningún proyecto
upstream activo que seguir más allá de la copia vendorizada; las actualizaciones de `gcf` se incorporan
manualmente cuando cambia el códec y se vuelven a validar mediante la comprobación del presupuesto de
compresión (`check:compression-budget`).

### Proponer una mejora inspirada en un proyecto upstream

1. **No vendorices**: vuelve a expresar la regla o el filtro upstream en el formato de OmniRoute.
2. Añádelo mediante el punto de extensión correspondiente indicado a continuación (paquete de idioma, filtro de RTK o
   motor personalizado).
3. Haz referencia al proyecto upstream en la descripción del PR (atribución), no
   copies su código fuente sujeto a licencia.
4. Incluye pruebas y confirma que la comprobación `check:compression-budget` sigue superándose.

---

## Añadir un estilo de salida

Los estilos de salida (consulta la [tabla del catálogo de la guía](./COMPRESSION_GUIDE.md#output-styles-catalog))
son la contraparte, en el lado de la respuesta, de los motores de entrada: en lugar de comprimir lo que
envías, indican al modelo que produzca una salida más económica. El registro es
`OUTPUT_STYLE_CATALOG` en `open-sse/services/compression/outputStyles/catalog.ts`, y
**una entrada del catálogo constituye toda la funcionalidad**: el inyector, el panel de configuración del
dashboard, la persistencia y la telemetría enumeran el catálogo; no hay ninguna otra lista que actualizar.

1. **Añade una entrada a `OUTPUT_STYLE_CATALOG`** con `id`, `label`, `description` y los
   tres `levels` en inglés (`lite`, `full`, `ultra`). Cada nivel debe terminar con
   `${SHARED_BOUNDARIES}` para que el código, las rutas, los comandos, los errores y las URL permanezcan literalmente iguales.
   El texto de la instrucción debe ser **estático y determinista** para cada
   `(id, level, language)`; `${SHARED_BOUNDARIES}` es la única interpolación permitida.
2. **Tradúcelo.** Incluye al menos un bloque `pt-BR` dentro de `i18n`; `ponytail` y
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) son la estructura de referencia. Un estilo deliberadamente
   limitado a un solo idioma establece `locale` en su lugar (como `terse-cjk` → `zh`) y, por tanto,
   solo se ofrece para esa configuración regional.
3. **Actualiza la protección de la matriz**: añade los idiomas del estilo a `BASELINE_LANGUAGES` en
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. La comprobación rechaza cualquier estilo nuevo
   no limitado por configuración regional que no incluya las traducciones necesarias, a menos que tenga una
   entrada explícita en `KNOWN_ENGLISH_ONLY` con una incidencia de seguimiento.
4. **Añade una prueba específica para el estilo** basada en
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: estructura del catálogo, cláusula de
   límites para cada nivel y una aserción de referencia que compruebe que cada traducción está escrita en su
   propio idioma en lugar de ser una copia del inglés.
5. **Atribución**: si el estilo está adaptado de un proyecto externo, dale crédito mediante un
   comentario de origen en la entrada (por ejemplo, `i-have-adhd` → ayghri/i-have-adhd, MIT); se aplica la
   misma regla que en «Proponer una mejora inspirada en un proyecto externo» más arriba.

No es necesario realizar cambios en la interfaz de usuario, el esquema ni la telemetría: esas superficies se generan a partir del catálogo.

---

## Prácticas recomendadas

### Desarrollo de motores

1. **Implementa siempre `validateConfig`**: los motores sin validación provocan fallos silenciosos
2. **Establece un `targetLatencyMs` realista**: el selector de estrategia lo utiliza para elegir motores
3. **Usa `getConfigSchema` para el dashboard**: nunca ocultes la configuración a los usuarios
4. **Admite `stackable: true` si tu motor es puro**: los motores con efectos secundarios no deberían apilarse
5. **Escribe pruebas en línea**: los motores deben poder verificarse en <1s

### Desarrollo de paquetes de idioma

1. **Comienza con la intensidad `lite`**: tus reglas deben ser seguras en la configuración más baja
2. **Usa `context` para delimitar el ámbito de las reglas**: las reglas exclusivas de `user` no pueden afectar accidentalmente a los prompts del sistema
3. **Evita capturar claves JSON**: `\\bword\\b` puede coincidir dentro de JSON y dañar los datos estructurados
4. **Prueba casos extremos**: entrada vacía, Unicode, texto RTL y emojis
5. **Usa los paquetes existentes como plantillas**: `en/filler.json` es el ejemplo más desarrollado

### Diseño del pipeline

1. **Perfila antes de optimizar**: mide primero con `compression_stats`
2. **Prefiere la composición a la reimplementación**: amplía las reglas de Caveman antes de escribir un motor nuevo
3. **Documenta la justificación del orden**: comenta por qué el motor A va antes que el motor B
4. **Prueba los 3 niveles de intensidad**: `lite` es rápido, pero impreciso; `ultra` es lento, pero preciso

---

## Referencia: motores integrados

| ID del motor         | Apilable | stackPriority predeterminada | Objetivos                                               |
| -------------------- | -------- | ---------------------------- | ------------------------------------------------------- |
| `lite`               | Sí       | 5                            | mensajes, resultados de herramientas                    |
| `rtk`                | Sí       | 10                           | resultados de herramientas                              |
| `standard` (caveman) | Sí       | 20                           | mensajes, resultados de herramientas, bloques de código |
| `aggressive`         | Sí       | 30                           | mensajes                                                |
| `ultra`              | Sí       | 40                           | mensajes, bloques de código                             |

### Véase también

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Descripción general del pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Referencia del registro de motores
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Especificación del formato de reglas
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Detalles de los paquetes de idioma
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Motor RTK y filtros personalizados
- Código fuente: `open-sse/services/compression/` (117 archivos, ~250 KB)
