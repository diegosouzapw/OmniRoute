# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Este documento describe la base de enrutamiento adaptativo basado en retroalimentación añadida a
OmniRoute. Es deliberadamente pequeña: introduce un canal tipado de resultados de
enrutamiento, una señal de calidad en línea que alimenta el sistema de puntuación
auto-combo existente, un exportador opcional de OpenTelemetry y un endpoint de
explicabilidad. **No** reemplaza la pila de resiliencia existente (disyuntor, tiempo
de espera de conexión, bloqueo de modelos, matriz de estado, piloto automático), sino
que la complementa.

## 1. Contexto arquitectónico

OmniRoute es un plano de datos con una **ruta crítica de solicitudes** y un **plano
de control/inteligencia**. La ruta crítica debe seguir siendo rápida, eficiente en
memoria, asíncrona, resiliente y predecible. La evaluación, la puntuación de calidad,
los experimentos y el análisis histórico pertenecen al plano de control.

```
Agente de IA / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   plano de datos (rápido, síncrono, en memoria)
│ enrutam. / conmutac.│
│ estado / protección │
│ caché / streaming   │
└──────────┬──────────┘
           │ RoutingEvent (disparar y olvidar, ~0.2µs)
           ▼
┌─────────────────────┐
│ Receptores feedback │   plano de control (asíncrono, mejor esfuerzo)
│ seguidor de calidad │
│ exportador OTel     │
│ almacén explicativo │
└──────────┬──────────┘
           ▼  puntuación de calidad
   sistema de puntuación auto-combo
```

### Lo que ya existía (auditado, no duplicado)

| Concepto                                  | Implementación existente                                                                                            |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Disponibilidad (¿podemos enviar tráfico?) | Disyuntor (CLOSED/DEGRADED/OPEN/HALF_OPEN, persistido en BD), tiempo de espera de conexión, bloqueo de modelos      |
| Informes de estado                        | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                             |
| Tráfico en sombra                         | `open-sse/services/combo/shadowRouting.ts`                                                                          |
| Medidas de protección                     | `src/lib/guardrails/` (hooks previos/posteriores)                                                                   |
| Caché exacta                              | `src/lib/semanticCache.ts` (basada en firmas)                                                                       |
| Evaluadores / enrutamiento por evaluación | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                                |
| Explicabilidad de decisiones de combos    | `open-sse/services/combo/decisionTrace.ts`                                                                          |
| Eventos en tiempo real del panel          | `src/lib/events/eventBus.ts` (canal de notificaciones de la IU, cargas útiles `unknown`, historial de 100 entradas) |

La capa de eventos de enrutamiento **no** es una reimplementación de `eventBus`: ese bus
es el canal de notificaciones en tiempo real del panel (nombres de _eventos_ tipados,
cargas útiles opacas, consumidores de la IU). `RoutingEvent` es una estructura
tipada de _resultados_ (latencia/tokens/coste/resultado/motivo de finalización)
consumida por los receptores de retroalimentación del plano de control (seguidor de
calidad, exportador OTel, almacén explicativo).

### Lo que faltaba (añadido aquí)

1. Una **abstracción de evento de resultado de enrutamiento + receptor tipado**
   (`RoutingEvent` / `RoutingEventSink`). `decisionTrace` está limitado a los combos
   y solo reside en memoria; `comboMetrics` son contadores acumulativos; `call_logs`
   es persistencia asíncrona sin procesar. Ninguno es un canal de resultados tipado
   y basado en receptores al que puedan suscribirse un seguidor de calidad, un
   exportador OTel o un evaluador del estilo Future-AGI.
2. Una **señal de calidad en línea** (EWMA) para la calidad de salida; anteriormente,
   el sistema de puntuación representaba la «calidad» únicamente mediante la
   adecuación estática a la tarea y las tasas de aprobación opcionales de las
   evaluaciones.
3. Un **exportador OTel opcional y sin dependencias** que utiliza convenciones
   semánticas de GenAI.
4. Un **endpoint de explicabilidad** que devuelve las decisiones reales de
   enrutamiento y el estado de calidad.

## 2. Eventos de enrutamiento (base de la retroalimentación)

Archivos: `open-sse/services/routing/events.ts`, `.../index.ts`

Un `RoutingEvent` contiene únicamente metadatos de enrutamiento:

```ts
interface RoutingEvent {
  requestId: string;
  provider: string;
  model: string;
  strategy: string; // "auto" | "priority" | "direct" | ...
  latencyMs: number;
  ttftMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome; // unión con lista de valores permitidos
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` es un trait al estilo `Send+Sync` en TypeScript:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // debe ser O(1), sin E/S síncrona
}
```

La ruta crítica llama a `emitRoutingEvent(event)` una vez por cada solicitud completada
(el callback de finalización del streaming, la ruta de éxito sin streaming y la
ruta de fallo por respuesta 200 malformada en `handleChatCore`). La distribución
es una difusión síncrona a los receptores registrados, pero cada receptor solo
encola o actualiza el estado en memoria. **No hay escrituras síncronas en la base
de datos ni E/S de red en la ruta crítica.**

Receptores predeterminados:

- `MemoryRoutingEventStore` — búfer circular acotado (500), con los más recientes
  primero, para el endpoint de explicación.
- Consumidor `QualityTracker` — actualiza la estimación de calidad EWMA.
- `OtlpHttpsEventSink` — opcional, habilitado únicamente cuando está configurado
  `OMNIROUTE_OTEL_ENDPOINT` (o `OTEL_EXPORTER_OTLP_ENDPOINT`).

### Sobrecarga medida (comparación transparente)

`npm run bench:routing-events` en esta estación de trabajo (100 000 iteraciones;
las operaciones de menos de 1 µs se miden como µs/op agregados porque los
percentiles por operación están por debajo de la resolución del temporizador
`performance.now()`):

| Escenario                                | µs/op  | ops/s  |
| ---------------------------------------- | ------ | ------ |
| referencia (solo puntuación)             | ~0.045 | ~22 M  |
| referencia + RoutingEvent (2 receptores) | ~0.168 | ~5.9 M |
| referencia + evento + encolado de OTel   | ~0.163 | ~6.1 M |
| concurrente (8 ráfagas intercaladas)     | ~0.18  | —      |

La diferencia de la distribución de eventos respecto a la puntuación de
referencia es de ~0.12 µs/solicitud; el receptor de OTel solo encola (inserción
en búfer O(1)), sin añadir nada medible. Estas cifras son específicas de la
máquina y relativas; no constituyen una garantía de producción. La cifra de
v1 de «~0.2 µs» era una estimación agregada; esta metodología separa la
puntuación de referencia del coste de distribución de eventos.

## 3. Señal de calidad (estado del proveedor basado en retroalimentación)

Archivos: `open-sse/services/routing/quality.ts`

v2 separa la calidad **operativa** de la **semántica**:

- **Operativa** — derivada de la ruta crítica de enrutamiento (HTTP 4xx/5xx,
  fallos de conexión, respuestas 429, respuestas malformadas, interrupciones
  del flujo, `finish_reason=length`, éxitos sin salida, EWMA de latencia/TTFT).
  Una respuesta 200 NO se considera calidad semántica.
- **Semántica** — el valor real de la salida generada. SOLO la produce un
  evaluador mediante `setSemanticQuality()`. Es `null` hasta que uno la
  proporciona y nunca se filtra a la puntuación operativa.

Estado por (proveedor, modelo) (EWMA + contadores acotados):

- `successEwma` — EWMA (α=0.2) del éxito de los resultados.
- `latencyEwma` / `ttftEwma` — EWMA de la latencia (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — cuánto tiempo ha pasado desde la última observación del modelo.

### Consideración de la confianza y del número de muestras

`confidence = clamp01(samples / 50)`, y la puntuación devuelta al sistema de
puntuación se combina con el punto medio neutro:

```
score = 0.5 + confidence * (operational - 0.5)
```

Consecuencias (verificadas mediante pruebas):

- Un proveedor sin datos (0 muestras) obtiene **0.5**: no se lo penaliza
  injustamente, pero tampoco puede imponerse a un proveedor con miles de
  observaciones sólidas.
- Un proveedor con 7 éxitos afortunados es atraído hacia 0.5 (nunca se impone
  gracias a una inicialización optimista).
- Un proveedor con 50 o más muestras converge hacia su puntuación operativa real.
- La degradación y la recuperación son graduales (EWMA), y un fallo aislado no
  destruye a un proveedor saludable.

`ProviderQuality` expone `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Esto alimenta el sistema de puntuación de combinación automática como factor de
puntuación `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` en
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. La suma se
  mantiene en 1.0.
- `buildAutoCandidates` rellena `candidate.quality` a partir del rastreador; los
  candidatos sin datos adoptan de forma predeterminada el valor neutro **0.5**
  (un candidato sin datos no recibe ni bonificación ni penalización).

El bucle cerrado:

```
RoutingEvent → QualityTracker → getQualityScore → factor de calidad de auto-combo
      ↑                                                    │
      └────── resultado de la solicitud (handleChatCore) ←─┘
```

### Exclusión estricta frente a penalización moderada

La señal de calidad es únicamente una **preferencia adaptativa moderada**. La
exclusión estricta sigue correspondiendo a la pila de resiliencia existente:
disyuntor OPEN, cuota agotada, fallo de autenticación, bloqueo del modelo; nada
de esto se ve afectado por la puntuación de calidad. Un proveedor cuya puntuación
de calidad disminuye temporalmente pasa a tener menor preferencia, pero nunca
se deshabilita de forma estricta.

## 3b. Temporización canónica del flujo (TTFT / ITL)

Archivos: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` es el único punto de instrumentación para la ruta de
streaming, integrado en `createSSEStream` (open-sse/utils/stream.ts):

- `markByte()` — primer fragmento recibido del upstream.
- `markForward()` — primer fragmento reenviado al cliente (utilizado para TTFT).
- `markInterrupted()` — timeout/abort/error del flujo antes de una finalización correcta.
- `ttft()` = latencia hasta el primer fragmento SSE reenviado. **Esto NO es TTFT a nivel de token** —
  un único fragmento SSE puede transportar cero, uno o muchos tokens. Está documentado con precisión.
- `avgItlMs()` = intervalo medio entre fragmentos (un proxy de latencia por fragmento para ITL).

TTFT/ITL/interrupted se incorporan al `RoutingEvent` (`ttftMs`, `itlMs`) y se
exportan como atributos de span de GenAI/OmniRoute mediante el sink de OTel.

## 4. Observabilidad con OpenTelemetry / GenAI

Archivos: `open-sse/services/routing/otel.ts`

- Exportador OTLP/HTTP JSON sin dependencias (utiliza el `fetch` global, sin el
  SDK `@opentelemetry/*`).
- Los spans siguen las convenciones semánticas de GenAI (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`), además de los atributos
  de enrutamiento de OmniRoute (resultado, estado, TTFT, reintentos, fallback).
- `record()` solo agrega elementos a un búfer acotado (O(1)); un temporizador en
  segundo plano realiza el flush mediante `POST {endpoint}/v1/traces` de forma
  asíncrona. En caso de sobrecarga, se descartan los eventos más antiguos
  (contador `dropped`), sin aplicar nunca contrapresión al plano de datos.
- **Deshabilitado salvo que se configure.** Debe establecerse
  `OMNIROUTE_OTEL_ENDPOINT` (o `OTEL_EXPORTER_OTLP_ENDPOINT`); de lo contrario,
  el sink no se registra y no se ejecuta ningún código de OTel.

## 5. Explicabilidad

- `GET /v1/explain/routing` devuelve los `RoutingEvent` recientes (las decisiones
  reales, comenzando por las más recientes) y la instantánea de calidad por proveedor/modelo.
- La autenticación replica la de `/v1/combos` (clave de API Bearer o sesión del
  panel; acceso anónimo en despliegues locales de un solo usuario con
  `REQUIRE_API_KEY=false`).
- Las trazas por invocación a nivel de combo siguen disponibles mediante el
  `decisionTrace.ts` existente (cabecera `X-OmniRoute-Combo-Trace`).
- Seguridad: los eventos solo contienen metadatos de enrutamiento, nunca prompts,
  cuerpos ni credenciales.

## 6. Integración del plano de evaluación (preparación para Future AGI)

OmniRoute trata Future AGI (o cualquier evaluador) como un **backend potencial
de inteligencia/evaluación, no como una dependencia**. Los puntos de integración:

- Un `RoutingEventSink` puede reenviar eventos a un evaluador de forma asíncrona.
- `MemoryRoutingEventStore` y la instantánea de calidad proporcionan al evaluador
  el flujo bruto de decisiones.
- Un futuro `Evaluator` (determinista, juez local, HTTP, WASM) consumiría
  eventos/trazas y devolvería un `QualityScore` que alimentaría la misma ruta de
  `getQualityScore`/factor de calidad.
- El enrutamiento basado en evaluaciones existente (`open-sse/services/evalRouting.ts`)
  ya reordena los destinos del combo según las tasas de aprobación de `eval_runs`
  cuando está habilitado.

Ninguna evaluación se ejecuta de forma síncrona en la ruta de la solicitud, y el
gateway funciona completamente aunque el evaluador no esté presente.

## 7. Revisión arquitectónica final

1. **¿Qué permanece en la ruta crítica síncrona?** El enrutamiento/la puntuación,
   las comprobaciones previas de guardrails, la consulta de caché y un fan-out de
   `emitRoutingEvent` (~0,12 µs respecto a la puntuación base) hacia sinks en memoria.
2. **¿Qué se trasladó al procesamiento asíncrono?** La exportación de OTel
   (temporizador + fetch), la persistencia de `call_logs`/uso y las escrituras en
   la caché semántica; la calidad se mantiene en memoria y es O(1) (no requiere
   procesamiento asíncrono).
3. **¿Cómo se convierte un resultado de enrutamiento en feedback?** `handleChatCore`
   emite un `RoutingEvent` → `QualityTracker` actualiza el estado EWMA →
   `getQualityScore` alimenta el factor `quality` del combo automático.
4. **¿Cómo influye la calidad en el enrutamiento futuro?** Una puntuación de
   calidad baja reduce la puntuación ponderada de ese proveedor/modelo en
   `scoreAutoTargets`, por lo que los modelos degradados pierden preferencia
   gradualmente y se recuperan a medida que mejora su EWMA.
5. **¿Cómo puede integrarse Future AGI sin convertirse en una dependencia?**
   Mediante la interfaz `RoutingEventSink` / un futuro adaptador `Evaluator`, sin
   ninguna dependencia codificada de forma rígida.
6. **¿Qué sucede cuando el evaluador no está disponible?** El enrutamiento no se
   ve afectado; para los modelos sin señales observadas, la calidad utiliza el
   valor neutral (1.0).
7. **¿Qué sucede cuando la telemetría no está disponible?** El sink de OTel
   simplemente no se registra; el resto de la capa de enrutamiento funciona sin cambios.
8. **¿Qué sucede en caso de sobrecarga?** El búfer de OTel descarta los eventos
   más antiguos; la calidad y el búfer circular están acotados por diseño; no
   hay contrapresión.
9. **¿Cómo se recupera el estado del proveedor tras una degradación?** EWMA
   vuelve a converger a medida que se acumulan resultados exitosos; el warmup
   mantiene neutrales los modelos sin historial; el circuit breaker se recupera
   de forma independiente mediante sondeos HALF_OPEN.
10. **¿Qué funcionalidades propuestas NO se implementaron intencionadamente y por qué?**
    - Tráfico sombra / experimentos — ya están implementados
      (`combo/shadowRouting.ts`); no se volvieron a implementar.
    - Guardrails — ya están implementados (`src/lib/guardrails/`); no se duplicaron.
    - Caché semántica — ya está implementada (`src/lib/semanticCache.ts`); no se
      duplicó.
    - Una plataforma completa de gestión de experimentos, herramientas para datasets,
      una plataforma de optimización de prompts, una base de datos vectorial o una
      infraestructura externa de OTel obligatoria — quedan fuera del alcance de
      un plano de datos ligero.
    - Una estructura `RoutingEvent` en Rust — el plano de datos está implementado
      en TypeScript; el tipo de TS es el equivalente adaptado.

## 8. Referencia de configuración

| Variable                      | Valor predeterminado | Efecto                                                                                             |
| ----------------------------- | -------------------- | -------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | sin definir          | Cuando se establece, habilita el exportador de trazas OTLP/HTTP (p. ej., `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | sin definir          | Alias alternativo para el endpoint OTLP.                                                           |
| `OTEL_SERVICE_NAME`           | `omniroute`          | Atributo de recurso `service.name`.                                                                |

## 9. Pruebas

- `tests/unit/routing-events.test.ts` — normalización de eventos, clasificación
  de estados, búfer circular acotado, distribución a receptores + aislamiento.
- `tests/unit/routing-quality.test.ts` — calentamiento de EWMA, recuperación tras fallos/éxitos,
  penalizaciones por anomalías, gestión transitoria de 429, instantánea, restablecimiento.
- `tests/unit/routing-scoring-quality.test.ts` — integridad de pesos, valor predeterminado
  neutro, clasificación por factor de calidad.
- `tests/unit/routing-otel.test.ts` — control de habilitación, carga útil del span GenAI, vaciado
  asíncrono, descarte por sobrecarga.
- `tests/unit/routing-events-concurrency.test.ts` — miles de eventos, acotación del
  búfer circular, aislamiento de receptores que generan excepciones, ráfagas asíncronas intercaladas,
  restablecimiento durante inserciones.
- `tests/unit/routing-adaptive-e2e.test.ts` — bucle integral determinista mediante
  el puntuador real `scoreAutoTargets`: saludable → degradación → recuperación → incidencia puntual, además de
  escenarios de arranque en frío y proveedor en frío afortunado.
- `tests/unit/stream-timing.test.ts` — TTFT (primer fragmento reenviado), ITL,
  primer byte frente a primer reenvío, interrupción, seguridad ante fragmentos malformados/vacíos.

## 10. Estado de los problemas preexistentes (Fase 18)

| Problema                                                      | Estado                      | Notas                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Incompatibilidad de exportación de `omniglyph`                | **CORREGIDO (entorno)**     | `node_modules` no estaba sincronizado con `package-lock.json` (versión instalada 1.3.1 frente a la versión bloqueada 1.4.0). Ejecutar `npm install omniglyph@1.4.0` restauró la versión bloqueada; los errores de tipos se redujeron a 0. Los manifiestos no se modificaron.                 |
| Pruebas obsoletas de `getKnownContextOverflow`                | **CONOCIDO — sin corregir** | `combo-context-overflow-compression-probe.test.ts` importa una función que ya no existe en `open-sse/services/combo.ts` (solo se menciona en comentarios). Corregirlo requiere volver a implementarla o reescribir esas pruebas, lo cual implicaría cambios arquitectónicos no relacionados. |
| Aislamiento de BD de `combo-runtime-unit-concurrency.test.ts` | **CONOCIDO — sin corregir** | La aserción de aislamiento de SQLite del entorno de pruebas falla cuando se ejecuta directamente; falla de forma idéntica en la rama base.                                                                                                                                                   |
| Desfase de i18n en `llm.txt`                                  | **CONOCIDO — sin corregir** | `docs/i18n/*/llm.txt` difieren del archivo raíz; es un problema preexistente que bloquea la comprobación pre-commit de sincronización de la documentación.                                                                                                                                   |

Los problemas del entorno y los del código se mantienen diferenciados; no se ocultan
fallos no relacionados mediante cambios en los filtros de pruebas.
