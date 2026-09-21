# Evaluations (Evals) (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Fuente de referencia:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Última actualización:** 2026-06-28 — v3.8.40

OmniRoute incluye un framework de evaluación genérico que puede utilizar para comparar configuraciones de enrutamiento, proveedores/modelos individuales o las suites de referencia «golden set» incluidas. Úselo para verificar cambios de enrutamiento, validar nuevos proveedores y establecer controles de calidad para las versiones antes de desplegarlas en el tráfico de producción.

El framework está implementado mediante:

- Un ejecutor puro (`src/lib/evals/evalRunner.ts`) que registra en memoria las suites integradas, evalúa los resultados según los criterios esperados y agrega las tarjetas de puntuación.
- Una capa de persistencia (`src/lib/db/evals.ts`) para las suites personalizadas (definidas por el usuario) y las ejecuciones históricas en SQLite.
- Una capa de orquestación (`src/lib/evals/runtime.ts`) que ejecuta cada caso enviando llamadas reales a `POST /v1/chat/completions`, captura la latencia y los resultados, y conserva la ejecución.
- Endpoints REST en `/api/evals/*` (solo con autenticación de administración).
- Una sección del panel en `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Conceptos

### Suite

Una suite es una colección con nombre de casos de prueba, con una `description` y uno o más casos. Las suites proceden de dos fuentes:

| Fuente     | Dónde se define                                   | ¿Modificable durante la ejecución? |
| ---------- | ------------------------------------------------- | ---------------------------------- |
| `built-in` | Registrada mediante `registerSuite()` al iniciar  | No (definida en el código)         |
| `custom`   | Almacenada en SQLite `eval_suites` + `eval_cases` | Sí (mediante API/UI)               |

Las suites integradas actuales (consulte `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 casos de referencia sobre saludos/matemáticas/traducción/seguridad
- `coding-proficiency` — Python/JS/SQL/TS/detección de errores
- `reasoning-logic` — silogismos, problemas verbales y reconocimiento de patrones
- `multilingual` — traducción y detección de idiomas
- `safety-guardrails` — PII, jailbreak, rechazo y concienciación sobre sesgos
- `instruction-following` — solo JSON, listas numeradas y restricciones de idioma
- `codex-comparison` — tareas de programación comparativas destinadas al modo de comparación

### Caso

Cada caso contiene:

| Campo      | Descripción                                                                   |
| ---------- | ----------------------------------------------------------------------------- |
| `id`       | Identificador estable (utilizado como clave de resultados y métricas)         |
| `name`     | Etiqueta legible para humanos                                                 |
| `model`    | Modelo predeterminado cuando la ejecución utiliza el objetivo `suite-default` |
| `input`    | `{ messages, max_tokens? }` — enviado a `/v1/chat/completions`                |
| `expected` | `{ strategy, value }` — rúbrica de puntuación (consulte más adelante)         |
| `tags`     | Etiquetas opcionales (p. ej., `safety`, `pii`, `jailbreak`)                   |

### Objetivo

La misma suite puede ejecutarse con distintos objetivos. El esquema del objetivo es `evalTargetSchema` en `src/shared/validation/schemas.ts`:

| Tipo de objetivo | `id`              | Comportamiento                                                                |
| ---------------- | ----------------- | ----------------------------------------------------------------------------- |
| `suite-default`  | `null`            | Cada caso utiliza su campo `model` integrado                                  |
| `model`          | nombre del modelo | Fuerza que cada caso pase por un único modelo directo (p. ej., `gpt-4o`)      |
| `combo`          | nombre del combo  | Ejecuta cada caso mediante un único combo (ejercita el motor de enrutamiento) |

Para `model` y `combo`, el campo `id` es obligatorio (impuesto mediante `superRefine` de Zod). Cuando se proporciona `compareTarget`, ambos objetivos deben ser diferentes; el ejecutor conserva ambas ejecuciones bajo el mismo `runGroupId` para la comparación A/B.

## Rúbricas de puntuación

Implementadas en `evaluateCase()` (evalRunner.ts):

| Estrategia | Se aprueba cuando…                                                                 |
| ---------- | ---------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                  |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` es verdadero                       |
| `custom`   | `expected.fn(actualOutput, evalCase)` devuelve un valor verdadero (solo integrada) |

**Nota:** La puntuación mediante funciones personalizadas está reservada para las suites
definidas en código (integradas), ya que las funciones no se pueden serializar mediante la API. El
`evalCaseBuilderSchema` solo acepta `contains | exact | regex` para las
suites creadas por el usuario.

Actualmente no existe ningún evaluador basado en LLM ni ningún sistema de puntuación de similitud basado en embeddings;
sería un punto de extensión claro en `evaluateCase()`.

## Esquema de la base de datos

Tres tablas (migraciones `030_create_eval_runs.sql` y
`031_create_eval_suites.sql`):

| Tabla         | Propósito                                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metadatos de las suites personalizadas (`id`, `name`, `description`)                                                                |
| `eval_cases`  | Casos por suite — `input_json`, `expected_*`, `tags_json`                                                                           |
| `eval_runs`   | Ejecuciones históricas — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Las suites integradas **no** se almacenan en la base de datos. Residen en memoria y se
vuelven a registrar cada vez que se importa `evalRunner.ts`.

## API REST

Todos los endpoints requieren autenticación de administración (`requireManagementAuth`); no
forman parte de la superficie pública del proxy.

| Endpoint                      | Método   | Descripción                                                                        |
| ----------------------------- | -------- | ---------------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Enumera suites + ejecuciones recientes + tabla de puntuaciones + destinos + claves |
| `/api/evals`                  | `POST`   | Ejecuta una suite (individual o comparativa) — esquema `evalRunSuiteSchema`        |
| `/api/evals/{suiteId}`        | `GET`    | Obtiene una suite (integrada o personalizada)                                      |
| `/api/evals/suites`           | `POST`   | Crea una suite personalizada — esquema `evalSuiteSaveSchema`                       |
| `/api/evals/suites/{suiteId}` | `GET`    | Obtiene una suite personalizada                                                    |
| `/api/evals/suites/{suiteId}` | `PUT`    | Sustituye una suite personalizada (los casos se vuelven a insertar)                |
| `/api/evals/suites/{suiteId}` | `DELETE` | Elimina una suite personalizada y sus casos                                        |

### Ejecutar una suite

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

Campos opcionales:

- `outputs` — `Record<caseId, string>` de salidas calculadas previamente. Cuando se proporciona,
  el ejecutor **omite el envío** y solo puntúa las salidas almacenadas en caché (útil para la
  evaluación sin conexión).
- `compareTarget` — segundo destino que se ejecutará en paralelo; ambas ejecuciones comparten un
  `runGroupId` generado para la visualización comparativa.
- `apiKeyId` — clave de API interna utilizada para autenticar las llamadas enviadas a
  `/v1/chat/completions`. Es obligatoria cuando `REQUIRE_API_KEY` está habilitado.

### Crear una suite personalizada

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## Canalización de ejecución

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Resuelve la suite (integrada o personalizada).
2. Para cada caso, crea una `Request` a `/v1/chat/completions` con los
   `messages` del caso, el `model` resuelto, `stream: false` y `max_tokens: 512`
   (o el valor sobrescrito del caso).
3. Llama directamente al controlador del chat (en el mismo proceso, sin una solicitud HTTP adicional).
4. Registra la latencia y extrae el texto de `choices[0].message.content`
   o de la carga útil `output[]` de la API Responses.
5. Puntúa todas las salidas mediante `runSuite()` y, a continuación, las persiste mediante `saveEvalRun()`.

Los casos se ejecutan **secuencialmente**. Actualmente no existe ninguna opción de concurrencia.

## Panel de control

La interfaz de usuario se encuentra en `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Desde allí puedes:

- Explorar suites integradas y personalizadas con una vista previa caso por caso.
- Crear, editar y eliminar suites personalizadas con el generador de casos.
- Elegir un destino (valores predeterminados de la suite / modelo / combo), opcionalmente un segundo
  `compareTarget`, opcionalmente una clave de API y, a continuación, ejecutar bajo demanda.
- Consultar el historial de ejecuciones, el resultado de aprobación o fallo por caso, la latencia y las salidas capturadas.
- Ver el cuadro de puntuaciones acumulado, agregado a partir de la ejecución más reciente por ámbito
  `(suite, target)`.

## Relación con la RFC de evaluación automática

Existe un subsistema de evaluación separado y más específico en `src/domain/assessment/`
(consulta también [AUTO-COMBO.md](../routing/AUTO-COMBO.md) para obtener información sobre el motor de puntuación en vivo).
Este subsistema está orientado al motor Auto Combo: puntúa automáticamente los proveedores y
modelos para que los combos puedan autorrecuperarse cuando fallen los servicios de origen. Utiliza su propio ejecutor,
su propio categorizador y su propia lógica de puntuación.

El marco de Evals documentado aquí es la **superficie de pruebas más amplia y de propósito
general**. Es preferible para suites de regresión arbitrarias, comparaciones A/B
y pruebas de humo por versión. Utiliza el subsistema de evaluación automática cuando necesites
que el estado en tiempo real de los proveedores influya en las decisiones de enrutamiento.

## Integración con CI

Actualmente no existe un script npm `eval:ci` específico. Hay dos opciones si deseas
condicionar las versiones a los resultados de las evaluaciones:

- **Vía HTTP**: inicia el servidor, envía una solicitud a `POST /api/evals` con valores conocidos de
  `suiteId` + `target` y comprueba que `runs[].summary.passRate >= N` en la
  respuesta.
- **Vía en el mismo proceso**: importa `runEvalSuiteAgainstTarget()` desde
  `@/lib/evals/runtime` en un script, ejecútalo contra una base de datos de pruebas y comprueba el
  valor `PersistedEvalRun.summary` devuelto.

Las pruebas que cubren la ruta y el historial se encuentran en
`tests/unit/evals-route.test.ts` y `tests/unit/evals-history.test.ts`.

## Puntos de extensión

Cambios habituales y dónde realizarlos:

- **Nueva estrategia de puntuación** — amplía el bloque `switch (evalCase.expected.strategy)`
  en `evaluateCase()` (`evalRunner.ts`) y amplía `EvalCaseStrategy` en
  `src/lib/db/evals.ts`, además de `evalCaseBuilderSchema` en `schemas.ts`.
- **Nueva suite integrada** — define un objeto de suite y llama a `registerSuite()` al
  final de `evalRunner.ts`. `listSuites()` la descubrirá automáticamente.
- **Ejecución con concurrencia** — cambia el bucle `for` secuencial de
  `runEvalSuiteAgainstTarget()` por un `Promise.all` acotado (actualmente no
  existe ningún control de concurrencia).
- **Casos de streaming/llamadas a herramientas** — actualmente, el ejecutor fuerza `stream: false`.
  La evaluación compatible con streaming o herramientas requeriría cambios en `runtime.ts`
  (capturar y agregar los fragmentos SSE antes de puntuar).

## Véase también

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — guía general del producto
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — referencia del flujo de solicitudes
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — motor de puntuación Auto Combo (entorno de ejecución activo)
- Código fuente: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Interfaz de usuario: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
