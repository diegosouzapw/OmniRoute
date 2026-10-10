# OmniRoute Auto-Combo Engine (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Para usuarios**: ¿Buscas una guía de inicio rápido? Consulta la [Guía de usuario de Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) para obtener explicaciones sencillas y ejemplos.

> Cadenas de modelos autogestionadas con puntuación adaptativa + enrutamiento automático sin configuración

## Enrutamiento automático sin configuración (prefijo `auto/`)

> **NUEVO:** No es necesario crear combos. Usa el prefijo `auto/` directamente en cualquier cliente.

### Ejemplos rápidos

| ID del modelo  | Variante | Comportamiento                                                                          |
| -------------- | -------- | --------------------------------------------------------------------------------------- |
| `auto`         | default  | Todos los proveedores conectados, estrategia LKGP, pesos equilibrados                   |
| `auto/coding`  | coding   | Pesos que priorizan la calidad, adecuados para la generación de código                  |
| `auto/fast`    | fast     | Selección ponderada de baja latencia                                                    |
| `auto/cheap`   | cheap    | Enrutamiento optimizado para costes (primero el de menor coste)                         |
| `auto/offline` | offline  | Favorece a los proveedores con mayor disponibilidad de cuota                            |
| `auto/smart`   | smart    | Prioridad a la calidad + mayor tasa de exploración (10%) para descubrir mejores modelos |
| `auto/lkgp`    | lkgp     | LKGP explícito (igual que `auto` de forma predeterminada)                               |
| `auto/chaos`   | chaos    | Distribución paralela, un modelo por proveedor (no es inyección de fallos)              |

### Composición categoría × nivel (`auto/<category>:<tier>`)

Los sufijos al estilo de OpenRouter separan **qué tipo de ruta** (categoría) de **cómo optimizarla** (nivel), para que puedas combinarlos libremente (#4235 Fase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Categorías** (filtran el conjunto de candidatos por capacidad): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` conservan los modelos con capacidades de visión; `reasoning` conserva los modelos de razonamiento/pensamiento.
- **Niveles** (seleccionan los pesos de puntuación o el filtro del conjunto): `fast` (entrega rápida) · `cheap` (alias `floor`, ahorro de costes) · `reliable` (estado del disyuntor + estabilidad de latencia) · `free` / `pro` (filtran el conjunto por nivel de modelo mediante `classifyTier`: nivel gratuito frente a prémium).

| Ejemplo                | Se resuelve como                                                             |
| ---------------------- | ---------------------------------------------------------------------------- |
| `auto/coding:fast`     | conjunto de codificación, pesos de baja latencia                             |
| `auto/coding:cheap`    | conjunto de codificación, optimizado para costes (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | solo modelos de razonamiento/pensamiento, nivel prémium                      |
| `auto/vision`          | modelos con capacidades de visión (sin nivel → pesos equilibrados)           |
| `auto/multimodal:free` | modelos con capacidades multimodales, solo nivel gratuito                    |

Cualquier `auto/<category>[:<tier>]` válido se resuelve bajo demanda; se anuncia un subconjunto seleccionado en `/v1/models` y en el panel (`AUTO_SUFFIX_VARIANTS` en `open-sse/services/autoCombo/builtinCatalog.ts`). El filtrado es **fail-open**: si una restricción no coincide con ningún modelo conectado, se utiliza el conjunto completo para que el enrutamiento nunca falle. El sistema de puntuación principal (`combo.ts`) no cambia; el filtro de categoría/nivel se aplica en `buildAutoCandidates`.

> **Inteligencia de modelos en tiempo real:** la idoneidad del enrutamiento automático se basa en clasificaciones de **Arena ELO** en tiempo real + datos de nivel de **models.dev** cuando la opción `ARENA_ELO_SYNC_ENABLED` está activada (de lo contrario, utiliza el mapa estático de idoneidad).

**Cómo usarlo:**

```bash
# Cualquier IDE o herramienta CLI compatible con el formato de OpenAI
Base URL: http://localhost:20128/v1
API Key:  <your-endpoint-key>

# En tu código/configuración, establece el modelo como:
model: "auto"                 # valor predeterminado equilibrado
model: "auto/coding"          # mejor para tareas de codificación
model: "auto/fast"            # el más rápido disponible
model: "auto/cheap"           # el más barato por token
```

**Qué ocurre:**

1. OmniRoute detecta el prefijo `auto/` en `src/sse/handlers/chat.ts`
2. Consulta todas las **conexiones de proveedores activas** en la base de datos
3. Filtra las que tienen credenciales válidas (clave de API o token de OAuth)
4. Determina el modelo de cada conexión (`connection.defaultModel` o el primer modelo del proveedor)
5. Crea un **combo virtual** en memoria (no se almacena en la base de datos)
6. Enruta utilizando el perfil de pesos de la variante seleccionada + la estrategia LKGP

**Propiedades clave:**

- ✅ **Siempre activo:** No se necesita ningún interruptor, creación de combos ni configuración
- ✅ **Dinámico:** Refleja automáticamente los proveedores conectados actualmente
- ✅ **Persistencia de sesión:** LKGP garantiza que se priorice el último proveedor que tuvo éxito
- ✅ **Compatible con varias cuentas:** Cada conexión de proveedor se convierte en un candidato independiente
- ✅ **Sin escrituras en la base de datos:** El combo virtual solo existe durante la solicitud, sin sobrecarga de persistencia

### Control de candidatos por clave (#7819, nivel 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = el sufijo después de `auto/`, o
el literal `auto` para el canal base) es un endpoint de **solo lectura** que enumera el
conjunto actual de candidatos de un canal `auto/*`, complementado con datos de accesibilidad
en tiempo real y reutilizando las lecturas de resiliencia existentes (nunca el `state` sin procesar del disyuntor):

- disyuntor del proveedor — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- tiempo de espera de la conexión — `rateLimitedUntil` / `testStatus` en la fila resuelta de
  `provider_connections`
- bloqueo del modelo — `isModelLocked(provider, connectionId, model)`

Cada candidato también incluye la marca `excluded` de esta clave de API. Las exclusiones se almacenan
por clave de API (tabla `auto_candidate_overrides`, migración `128`): OmniRoute es
monoinquilino y no tiene ninguna tabla `users`, por lo que `apiKeyId` es la identidad real
por solicitante más cercana; además, se aplican en el punto de control del conjunto de candidatos de
`open-sse/services/autoCombo/virtualFactory.ts` mediante la función pura y probada unitariamente
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
El filtro es **fail-open**: un apiKeyId/canal no definido o un fallo de consulta de la base de datos
dejan el conjunto sin filtrar, por lo que un operador sin anulaciones configuradas obtiene un
enrutamiento idéntico byte por byte al que había antes de esta funcionalidad.

**Pospuesto para una incidencia de seguimiento:** pesos por candidato + ordenación explícita (Nivel 3
— se integra en las rutas existentes de estrategias ponderadas/prioritarias) y fijación de una estrategia
`combo.ts` específica por canal `auto/*` (Nivel 4). Consulta el plan de #7819 para la cuestión pendiente
sobre si las anulaciones deben mantenerse por clave de API o pasar a ser globales dado el modelo
de inquilino único.

**Entre bastidores:**

```txt
Solicitud: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts detecta el prefijo
   ↓
createVirtualAutoCombo('coding') → candidatePool de las conexiones activas
   ↓
handleComboChat (el mismo motor que los combos persistentes)
   ↓
La puntuación automática selecciona el mejor proveedor/modelo para cada solicitud
```

**Archivos de implementación:**

| Archivo                                                   | Propósito                                                          |
| --------------------------------------------------------- | ------------------------------------------------------------------ |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Analizador de prefijos (`parseAutoPrefix`)                         |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Crea objetos `AutoComboConfig` virtuales                           |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Punto de enlace de pruebas para simular el registro de proveedores |
| `src/sse/handlers/chat.ts`                                | Integración: atajo para el prefijo automático                      |
| `src/shared/constants/providers.ts`                       | Entrada del sistema `SYSTEM_PROVIDERS.auto`                        |

## Nombres de combos que coinciden con un ID de modelo real

Un combo cuyo `name` es idéntico a un ID de modelo sin prefijo (p. ej., un combo llamado
`gpt-5.5`) es un **patrón intencional y compatible**, no un error: es el
mecanismo para la conmutación por error entre proveedores por ID de modelo documentado en
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Dado que la
resolución de combos se comprueba antes que la resolución de IDs de modelo sin prefijo
(`getComboForModel()` en `src/sse/services/model.ts`), una solicitud para el ID sin prefijo
`gpt-5.5` se enruta a través de los destinos del combo (p. ej.,
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) en lugar de dirigirse
directamente a un único proveedor; esto reutiliza la precedencia de combo antes de reescritura creada para
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) y cuenta con
pruebas de regresión en `tests/unit/responses-combo-resolution-3227.test.ts` y
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Crear o cambiar el nombre de un combo por uno que oculte un ID de modelo real
**nunca se rechaza**, ya que hacerlo interrumpiría este flujo de trabajo documentado. En su lugar
(#8530), `POST /api/combos` y `PUT /api/combos/[id]` añaden un campo
`warning` no bloqueante a la respuesta cuando el nombre (nuevo) entra en conflicto con un ID de
modelo real:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Durante el arranque, `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) también registra una advertencia `[STARTUP]` de una sola línea
que enumera todos los combos existentes que ocultan un ID de modelo, de modo que los operadores que
se encuentren con esto por accidente (en lugar de hacerlo intencionadamente, según #6940) reciban una señal.
La función auxiliar de detección se encuentra en `src/lib/combos/modelNameCollision.ts`.

## Llamar a un combo personalizado desde un cliente

Los combos persistentes (Configuración → Combos) solo se utilizan cuando el cliente envía el **nombre exacto** del combo en el campo `model`; no hay coincidencia aproximada ni parcial del nombre del combo, ni interviene ningún prefijo `auto/`. Orden de resolución (`getComboForModel()` en `src/sse/services/model.ts`):

1. coincidencia exacta con el nombre del combo (`model: "my-combo"`),
2. prefijo `combo/<name>` (`model: "combo/my-combo"`),
3. asignaciones globales de modelo→combo (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Dos errores frecuentes:

- **`auto` no utiliza tus combos.** `auto`/`auto/*` crea su propio conjunto de candidatos sin configuración y solo consulta los combos persistentes si un combo se llama literalmente `auto` (no recomendado). Para enrutar mediante un combo, envía su nombre exacto, no `auto`.
- **`openrouter/auto` es un producto de pago real de OpenRouter** ("Auto Best Available"), no un alias de OmniRoute. Es la única entrada de modelo estática del registro de OpenRouter (`open-sse/config/providers/registry/openrouter/index.ts`) y se factura por separado. Usa Configuración → Enrutamiento → Ocultar modelos de pago para excluirlo de los conjuntos de `auto`.

Consulta [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) y [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) para conocer la confusión original que se documenta aquí.

## Cómo funciona (Auto-Combos persistidos)

El motor de Auto-Combo selecciona dinámicamente el mejor proveedor/modelo para cada solicitud mediante una **función de puntuación de 16 factores** (definida en `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). La suma de los pesos predeterminados es `1.0`; los pesos personalizados se vuelven a normalizar mediante `normalizeScoringWeights()`. Dos de los dieciséis —`cacheAffinity` y `resetWindowAffinity`— tienen un peso predeterminado de `0`; `reliability` tiene `0` en `DEFAULT_WEIGHTS`, pero `0.03` en los paquetes genéricos y `0.04` en `reliability-first`, mientras que `quality` tiene `0.02` en los paquetes (`0.03` en `quality-first`): aun así, se calculan para cada candidato, y `cacheAffinity` controla la deduplicación de la caché de prompts fuera de la puntuación, por lo que los factores con valor predeterminado cero simplemente no participan de forma predeterminada, mientras que sí lo hacen en los paquetes.

![Puntuación de 16 factores de Auto-Combo](../diagrams/exported/auto-combo-scoring.svg)

> Fuente: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (vuelva a generarlo mediante `npm run docs:render-diagrams`). El nombre del archivo es histórico; el código fuente y el diagrama renderizado muestran los 16 factores declarados en `DEFAULT_WEIGHTS`.

| Factor                | Peso predeterminado | Descripción                                                                                                                                                                                                                                                                 |
| :-------------------- | :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429              | Cuota restante/margen disponible del límite de solicitudes [0..1]                                                                                                                                                                                                           |
| `health`              | 0.1605              | Puntuación de estado del disyuntor (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                                                                    |
| `costInv`             | 0.1429              | Coste **combinado** inverso (60 % del precio de los tokens de entrada + 40 % del de los tokens de salida, normalizado): menor coste = mayor puntuación                                                                                                                      |
| `latencyInv`          | 0.1143              | Latencia p95 inversa normalizada respecto al grupo: mayor velocidad = mayor puntuación                                                                                                                                                                                      |
| `taskFit`             | 0.0762              | Idoneidad para el tipo de tarea (programación, revisión, planificación, análisis, depuración, documentación)                                                                                                                                                                |
| `stability`           | 0.0476              | Estabilidad basada en la varianza de la desviación estándar de latencia: un candidato cuyo tiempo de respuesta fluctúa obtiene una puntuación menor                                                                                                                         |
| `tierPriority`        | 0.0476              | Prioridad del nivel de cuenta: Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                                                                 |
| `tierAffinity`        | 0.0476              | Afinidad entre el nivel del candidato y el nivel recomendado por el manifiesto                                                                                                                                                                                              |
| `specificityMatch`    | 0.0476              | Correspondencia entre la especificidad de la solicitud (indicación del manifiesto) y el nivel del modelo                                                                                                                                                                    |
| `contextAffinity`     | 0.0476              | Afinidad entre la necesidad de ventana de contexto de la solicitud y la ventana de contexto del modelo                                                                                                                                                                      |
| `sessionAvailability` | 0.0476              | Disponibilidad de sesión OAuth de la conexión candidata para esta sesión (`getOAuthSessionAvailability()`; las conexiones sin OAuth obtienen una puntuación de 1.0)                                                                                                         |
| `connectionDensity`   | 0.0476              | Distribuye la carga entre las conexiones del mismo proveedor (evita la concentración)                                                                                                                                                                                       |
| `cacheAffinity`       | 0.00                | Afinidad mediante hash de rendezvous hacia la conexión con más probabilidades de contener ya el prefijo de caché de prompts de esta solicitud (`open-sse/services/combo/promptCacheAffinity.ts`); deshabilitada de forma predeterminada (#8008)                             |
| `resetWindowAffinity` | 0.00                | Preferencia por las conexiones cuya ventana de restablecimiento de cuota sea favorable (deshabilitada de forma predeterminada)                                                                                                                                              |
| `quality`             | 0.03                | Señal de calidad de salida basada en comentarios procedente del rastreador de calidad de eventos de enrutamiento; los candidatos sin observaciones reciben un valor neutro de 0.5                                                                                           |
| `reliability`         | 0.00                | Proporción de éxitos observada, `1 - failureRate`, a partir de 24 h de historial de uso, con un mínimo de diez muestras (de lo contrario, se usan métricas en tiempo real); los candidatos sin observaciones se interpretan como 1.0. Deshabilitada de forma predeterminada |

**Suma:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`, tal como se declara en `DEFAULT_WEIGHTS`; los pesos configurados por el usuario se vuelven a normalizar en una distribución mediante `normalizeScoringWeights()` antes de calcular la puntuación.

## Paquetes de modos

Hay 6 perfiles de pesos predefinidos en `open-sse/services/autoCombo/modePacks.ts`. Cada paquete sustituye por completo los pesos predeterminados para orientar la selección hacia un objetivo. Cada paquete ya suma `1.0` (`0.9999` tal como se muestra con cuatro decimales), por lo que `normalizeScoringWeights()` no tiene nada significativo que corregir cuando un paquete está activo: los valores que aparecen a continuación son, salvo por el redondeo, los que aplica el sistema de puntuación.

| Factor                | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Notas:

- **Los paquetes incluyen `quality` y `reliability`** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) y sustituyen por completo el mapa de pesos (`weights = pack`, no es una combinación). `DEFAULT_WEIGHTS` incluye `quality 0.03 / reliability 0`; seleccionar `balanced`/`default` conserva esos valores predeterminados, mientras que seleccionar un paquete utiliza los valores del paquete indicados anteriormente. En un conjunto en frío (todavía sin observaciones, por lo que `quality 0.5` y `reliability 1`), estos dos factores añaden `+0.04` con un paquete genérico (`0.03 + 0.01`), `+0.045` con `quality-first` y `+0.05` con `reliability-first`.
- `tierAffinity`, `specificityMatch` y `resetWindowAffinity` son explícitamente `0` en todos los paquetes.
- El énfasis de cada paquete, de un vistazo:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (conexiones saludables y de baja latencia)
  - **cost-saver** → costInv 0.3324 (ganan los tokens más baratos)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, el valor más alto de todos los paquetes (el mejor modelo para la tarea, con consistencia)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (máximo margen disponible independientemente de la velocidad o el coste)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, el valor más alto de todos los paquetes (la menor cantidad de sorpresas)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (el paquete de pesos que `auto/chaos` asigna a los miembros de su panel; la distribución paralela no lee estos pesos y este no es un perfil de inyección de fallos; consulte [CHAOS-MODE.md](../guides/CHAOS-MODE.md#autochaos-parallel-fan-out))

### Controles por solicitud (encabezados) — #6023 / #6024 / #6025 / #3470

Un combo `auto` puede dirigirse **por solicitud** mediante tres encabezados, sin modificar la
configuración almacenada del combo. Estos solo se aplican a la estrategia `auto` y únicamente a la solicitud
que los incluye; los valores `modePack`/`budgetCap`/`budgetFallback` guardados del combo se utilizan
cuando el encabezado no está presente.

| Encabezado                    | Acepta                                                                                                                                                                                                            | Efecto                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | un alias predefinido (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) o el nombre sin procesar de un paquete (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Sobrescribe los pesos de puntuación para esta solicitud. `balanced`/`default` fuerzan los pesos predeterminados (sin paquete). Los valores desconocidos se ignoran (se conserva la configuración).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `X-OmniRoute-Budget`          | un número positivo (máximo de USD por solicitud)                                                                                                                                                                  | Límite estricto de coste: los candidatos cuyo coste estimado lo supere se filtran antes de la selección. Lo que ocurre cuando **todos** los candidatos lo superan se controla mediante `X-OmniRoute-Budget-Fallback`, que se describe a continuación.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (predeterminado, alias: `cheapest-viable`, `soft`) o `strict` (alias: `block`, `hard`)                                                                                                                 | `cheapest`: recurre al candidato globalmente más barato, aunque siga superando el límite (comportamiento heredado). `strict`: se niega a realizar la selección; la solicitud falla inmediatamente con `HTTP 402` en lugar de exceder silenciosamente el presupuesto. Los valores desconocidos se ignoran.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `X-OmniRoute-Effort`          | `auto` (otros valores reservados)                                                                                                                                                                                 | Presupuesto de razonamiento adaptativo: cuando la solicitud **no** incluye ningún campo de razonamiento de ningún tipo (`reasoning_effort`, `reasoning`, `thinking`), el gateway resuelve `auto` como `low`/`medium`/`high` a partir de señales deterministas de la estructura de la solicitud (longitud del último mensaje del usuario, tamaño del contexto hasta el último mensaje del usuario, resultados anteriores de herramientas, profundidad del bucle de herramientas). Las señales se limitan al turno actual — se ignora todo lo que aparezca después del último mensaje del usuario —, por lo que cada solicitud de un bucle de herramientas se resuelve en el mismo nivel (fijación sin estado por turno, sin estado de sesión y sin escalado a mitad del bucle que pudiera romper los prefijos de la caché de prompts del proveedor ascendente). Un campo de razonamiento explícito del cliente siempre tiene prioridad. Se limita a las solicitudes cuyo envío al proveedor ascendente se resuelve con la estructura de OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`): `reasoning_effort` es un campo con formato de OpenAI, por lo que el encabezado no tiene efecto en una solicitud dirigida a Claude o Gemini (consulta `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Forzar el perfil más rápido, limitar esta solicitud a $0.05 y bloquearla estrictamente en lugar de exceder el presupuesto
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

La resolución es una función pura (`open-sse/services/autoCombo/requestControls.ts`); los
valores resueltos alimentan las entradas existentes `config.modePack` / `config.budgetCap` /
`config.budgetFallback` del motor. El valor `config.budgetFallback` almacenado de una combinación ("strict" |
"cheapest") establece la política persistente; el encabezado la sustituye para una sola solicitud.

## Todas las estrategias de enrutamiento

El motor de combos de OmniRoute admite **20 estrategias de enrutamiento** (declaradas en `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). El propio motor Auto Combo se expone mediante la estrategia `auto`; las demás están disponibles para los combos persistidos.

| Estrategia          | Descripción                                                                                                                                                                                                                          |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Lista ordenada por primer destino con prioridad explícita                                                                                                                                                                            |
| `weighted`          | Selección aleatoria ponderada según el peso de cada destino                                                                                                                                                                          |
| `round-robin`       | Recorre los destinos en orden (por lotes; véase más abajo)                                                                                                                                                                           |
| `context-relay`     | Transfiere el contexto entre destinos (conversaciones largas)                                                                                                                                                                        |
| `fill-first`        | Agota la cuota de cada destino antes de pasar al siguiente                                                                                                                                                                           |
| `p2c`               | Balanceo de carga aleatorio mediante el algoritmo «potencia de 2 opciones»                                                                                                                                                           |
| `random`            | Selección aleatoria uniforme                                                                                                                                                                                                         |
| `least-used`        | Selecciona el destino con la carga actual más baja                                                                                                                                                                                   |
| `cost-optimized`    | Minimiza el coste en $ por solicitud según los precios del catálogo                                                                                                                                                                  |
| `reset-aware` ⭐    | Prioriza según el momento de restablecimiento de la cuota: los intervalos de restablecimiento cortos tienen mayor prioridad                                                                                                          |
| `reset-window`      | Prefiere los destinos cuya ventana de cuota se restablecerá antes                                                                                                                                                                    |
| `headroom`          | Selecciona el destino con el mayor margen de cuota restante                                                                                                                                                                          |
| `quota-weighted`    | Omite las cuentas agotadas y selecciona entre las restantes en proporción a la cuota sobrante dividida por la carga en curso; las conversaciones existentes permanecen fijadas                                                       |
| `strict-random`     | Selección aleatoria sin deduplicar las repeticiones                                                                                                                                                                                  |
| `auto`              | Utiliza la puntuación de Auto Combo (16 factores) — **recomendado**                                                                                                                                                                  |
| `lkgp`              | Última ruta válida conocida (fija el último proveedor que respondió correctamente y, después, recurre a las reglas)                                                                                                                  |
| `context-optimized` | Selecciona el destino que mejor se adapte al tamaño del contexto actual                                                                                                                                                              |
| `cache-optimized`   | Reordena los destinos según la afinidad con la caché de prompts: se prueba primero la conexión con mayor probabilidad de contener ya el prefijo en caché de esta solicitud (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Envía la solicitud en paralelo a un conjunto de modelos y, después, sintetiza una única respuesta mediante un modelo evaluador (véase más abajo)                                                                                     |
| `pipeline`          | Ejecuta los destinos secuencialmente, pasando la salida de cada paso a la entrada del siguiente; solo se devuelve la respuesta final (#6396)                                                                                         |

⭐ = Nuevo en v3.8.0 · 🧬 = Nuevo en v3.8.36

### Semántica de `weighted`

`weighted` realiza una **selección aleatoria proporcional por solicitud**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), no una equiparación:

- Cada solicitud selecciona **un** paso con una probabilidad de `weight / totalWeight`; los pasos restantes
  se ordenan por peso descendente como cadena de respaldo para esa solicitud.
- Un paso cuyo peso sea `0` (o no esté definido) **nunca se selecciona** mientras cualquier otro paso tenga un
  peso > 0; solo puede servir como respaldo después de que falle el paso seleccionado. Únicamente cuando **todos**
  los pesos son 0, la selección pasa a ser uniforme.
- Los pasos cuyos destinos no estén disponibles —disyuntor del proveedor en estado `OPEN`, tiempo de espera
  de la conexión, bloqueo del modelo— se eliminan de la selección antes de que esta se realice
  (`open-sse/services/combo/targetResolution.ts`), por lo que un único paso disponible puede ganar temporalmente
  todas las solicitudes.
- `stickyWeightedLimit` (configuración del combo, valor predeterminado `1` = desactivado) fija el paso seleccionado durante esa cantidad de
  ejecuciones correctas consecutivas antes de volver a realizar la selección.

Para una rotación estricta, usa `round-robin`; asignar pesos iguales en `weighted` proporciona un equilibrio estadístico, no
estricto.

### Modo de canalización agéntica

Un combo `pipeline` con al menos dos modelos puede habilitar el enrutamiento planificador/ejecutor mediante
`config.agenticOrchestration.enabled`. El primer destino se encarga de la planificación y de las respuestas finales;
el segundo destino emite llamadas a herramientas nativas del cliente. OmniRoute detecta las continuaciones
de resultados de herramientas a partir del protocolo de la solicitud, pregunta al planificador si se necesita otra ronda de herramientas
y establece dinámicamente al ejecutor o al planificador como
paso final orientado al cliente.

Los modelos adicionales posteriores al segundo destino se ordenan como ejecutores de respaldo. Una respuesta
HTTP fallida o una excepción de transporte hace que se pase al siguiente ejecutor, manteniendo la
misma decisión del planificador y las herramientas nativas, pero utilizando el prompt de paso y la
conexión resuelta propios de ese ejecutor. La primera respuesta correcta se devuelve sin cambios, incluido
el streaming SSE; los fallos posteriores al inicio de un streaming correcto no se pueden reintentar aquí.
Si todos los ejecutores fallan, se devuelve el último fallo. Las cancelaciones del cliente detienen el envío.

```json
{
  "strategy": "pipeline",
  "models": [{ "model": "provider/planner" }, { "model": "provider/executor" }],
  "config": {
    "agenticOrchestration": { "enabled": true, "maxToolRounds": 8 }
  }
}
```

El ejecutor puede emitir varias llamadas independientes en una sola respuesta. Las llamadas dependientes se
gestionan en turnos posteriores de resultados de herramientas del cliente, y el planificador revisa cada resultado.
El valor predeterminado de `maxToolRounds` es `8` y acepta valores de `1` a `32`; una vez alcanzado, el planificador debe
producir la mejor respuesta final disponible. Las decisiones internas del planificador se almacenan en búfer, mientras que
la respuesta seleccionada orientada al cliente conserva la preferencia original de streaming.

### Lotes persistentes de `round-robin` y expansión de cuentas

Round-robin funciona por lotes, no con una solicitud por paso:

- `stickyRoundRobinLimit` (configuración del combo, luego `comboStickyRoundRobinLimit` y después
  `settings.stickyRoundRobinLimit`; valor predeterminado: **3**) mantiene el mismo destino durante esa cantidad de
  operaciones correctas consecutivas antes de rotar. Establece la anulación del combo en `1` para rotar en cada solicitud.
  El editor de combos muestra el valor efectivo y la capa de la que procede.
- `connectionAwareExpansion` (configuración del combo, luego configuración global; valor predeterminado: **false**) expande
  cada paso a nivel de proveedor en destinos por cuenta antes de la rotación. Las estrategias del grupo B
  (priority, weighted, round-robin, random, p2c, least-used, cost-optimized, lkgp,
  fill-first, strict-random, context-optimized, cache-optimized, context-relay, fusion,
  pipeline) mantienen una vista a nivel de proveedor hasta que esta opción se activa. El editor de combos permite elegir
  heredar / activar / desactivar; heredar utiliza el valor predeterminado global (desactivado).
- El enrutamiento por localidad de la caché de prompts (`promptCacheAffinityEnabled`; valor predeterminado: **true**) reordena
  las conexiones fijadas para que las claves de caché coincidentes permanezcan en una sola cuenta. Tiene prioridad sobre
  la rotación round-robin y ponderada entre pasos fijados por cuenta. Desactívalo en
  Settings → Combo defaults si necesitas una rotación estricta. No hay ninguna anulación por combo.

Para la rotación entre varias cuentas en un modelo, utiliza preferiblemente **un paso de cuenta dinámica** (`connectionId`
vacío, grupo completo) con un límite de persistencia de `1`, en lugar de tres valores de `connectionId` fijados.
Los pasos fijados junto con la afinidad se concentran en la misma cuenta, incluso mientras avanza el contador RR.

## Estrategia Fusion

`fusion` es la única estrategia que **no** selecciona un único destino. Distribuye el prompt
a **todos los modelos del panel en paralelo** y, después, un **modelo juez** configurable sintetiza
una única respuesta final a partir de todas las respuestas del panel. Adaptada del proyecto original `decolua/9router`
(diseño Fusion de OpenRouter); implementación en `open-sse/services/fusion.ts`.

Cómo funciona:

0. **Omisión para solicitudes con herramientas** — una solicitud que incluye un array `tools` no vacío y cuyo
   `tool_choice` no sea explícitamente `"none"` omite el panel por completo: se enruta directamente a
   un único modelo (el juez configurado o `panel[0]`), pasando `tools`/`tool_choice`
   sin modificaciones. Los miembros del panel no tienen acceso a herramientas y la directiva de
   síntesis del juez desaconseja emitir llamadas a herramientas, por lo que los clientes
   de tipo agente o que realizan llamadas a herramientas reciben una decisión real de llamada a una herramienta en lugar de prosa sintetizada (#6771).
1. **Distribución en paralelo** (solo para solicitudes sin herramientas) — el prompt se envía simultáneamente a todos los modelos
   del panel, forzando el modo sin streaming y eliminando las herramientas (el juez necesita
   la prosa completa para sintetizarla).
2. **Recopilación con cuórum y período de gracia** — en cuanto llegan `minPanel` respuestas, se inicia un breve
   temporizador de gracia para los modelos rezagados; después, la fusión continúa con lo que se haya recopilado.
   Esto limita la penalización del modelo más lento sobre el tiempo total, con un límite máximo estricto.
3. **Síntesis del juez** — las respuestas del panel se anonimizan (`Fuente 1`, `Fuente 2`, …, para que
   el juez valore el contenido y no la marca del modelo) y se entregan al juez, que analiza
   el consenso, las contradicciones, la cobertura parcial, las ideas únicas y los puntos ciegos, y luego
   redacta **una** respuesta autoritativa. La llamada al juez conserva el indicador `stream` original
   del cliente y las herramientas, por lo que el streaming y el uso posterior de herramientas siguen funcionando.
4. **Degradación controlada** — 0 respuestas del panel → `503`; exactamente 1 superviviente → esa respuesta
   se devuelve directamente (no hay nada que fusionar); un panel de un solo modelo responde directamente.

Un miembro del panel también puede ser un paso `combo-ref` (`{kind: "combo-ref", comboName: "..."}`) que haga referencia
a otro combo: se resuelve como **una única voz opaca del panel** (un despacho recursivo completo al
combo referenciado, no una distribución en paralelo a los destinos propios de ese combo), con la misma protección
de profundidad y ciclos que ya utiliza cualquier otra estrategia que consume referencias `combo-ref` (#6764).

### Configuración

Se configura en el blob `config` del combo (sin migración del esquema, ya que reutiliza la tabla
`combos` existente):

| Campo                                    | Tipo     | Valor predeterminado    | Propósito                                                                                                      |
| :--------------------------------------- | :------- | :---------------------- | :------------------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | primer modelo del panel | Modelo que sintetiza la respuesta final                                                                        |
| `config.fusionTuning.minPanel`           | `number` | `2`                     | Respuestas correctas necesarias antes de que se inicie el temporizador de gracia (limitado a `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`                  | Tiempo de espera para los rezagados una vez alcanzado el cuórum                                                |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`                 | Límite absoluto para que un modelo bloqueado no pueda detener la solicitud                                     |

Los valores predeterminados se encuentran en `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Ejemplo

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Después, llámalo como cualquier otro combo: `{"model":"fusion-panel","messages":[...]}`.

## Fábrica virtual de Auto-Combo

El motor Auto Combo no requiere combos predefinidos. En su lugar, `open-sse/services/autoCombo/virtualFactory.ts` genera candidatos sobre la marcha:

1. Obtiene `getProviderConnections({ isActive: true })` (todas las conexiones habilitadas)
2. Filtra aquellas que tienen credenciales válidas (clave de API o token OAuth no caducado mediante `hasUsableOAuthToken()`)
3. Cruza los datos con `getProviderRegistry()` para determinar la disponibilidad y los precios de los modelos
4. Para cada tupla `(provider, model, connection)`, crea un `VirtualAutoComboCandidate`
5. Selecciona `connection.defaultModel` (o el primer modelo del registro) como destino de enrutamiento
6. Puntúa cada candidato mediante `scorePool()`, que usa 16 factores, y el conjunto de pesos de la variante
7. Devuelve el `AutoComboConfig` resultante en memoria para `handleComboChat()`; nunca se persiste en la base de datos

Esto significa que **añadir un proveedor nuevo con `auto/*` habilitado amplía automáticamente el conjunto de candidatos**, sin necesidad de editar manualmente el combo. El combo virtual se reconstruye para cada solicitud, por lo que las conexiones recién añadidas o que acaban de recuperar un estado saludable se incorporan inmediatamente.

## Autorrecuperación

- **Exclusión temporal**: puntuación < 0.2 → excluido durante 5 min (espera progresiva, máximo de 30 min)
- **Conocimiento del disyuntor**: OPEN → exclusión automática; HALF_OPEN → solicitudes de prueba
- **Modo incidente**: >50 % en estado OPEN → deshabilita la exploración y maximiza la estabilidad
- **Recuperación tras el periodo de espera**: después de una exclusión, la primera solicitud es una «prueba» con un tiempo de espera reducido

## Exploración mediante bandits

El 5 % de las solicitudes (configurable) se enruta a proveedores aleatorios para fines de exploración. Esta función se deshabilita en el modo incidente.

## API

**No existe un endpoint dedicado `POST /api/combos/auto`** — Auto-Combo se utiliza de dos maneras:

1. **Sin configuración (recomendado):** Envía cualquier solicitud de finalización de chat con `model: "auto"` o `model: "auto/<variant>"`. La fábrica virtual crea el combo para cada solicitud; no se necesita persistencia ni llamadas a la API.

2. **Combo persistente con `strategy: "auto"`:** Crea un combo normal mediante `POST /api/combos` y establece `strategy: "auto"`, además de `config.auto.weights` / `config.auto.candidatePool`. Se utiliza el mismo motor de puntuación; el combo se almacena en `combos` y puede reutilizarse por ID.

Para la detección, `GET /api/combos/auto` enumera cada variante con su grupo de candidatos resuelto, además de `context_length` / `max_output_tokens`: el valor MÁXIMO entre las ventanas del grupo de candidatos. Los clientes (p. ej., el complemento de opencode) deben anunciar estos valores en lugar de `0`: un contexto de cero desactiva por completo la compactación automática de opencode, permitiendo que las sesiones crezcan hasta que la purga del historial del gateway destruya el contexto. Es seguro anunciar el valor MÁXIMO porque el prefiltro de contexto de Auto-Combo dirige las solicitudes sobredimensionadas a candidatos con ventanas grandes.

```bash
# Uso sin configuración (sin creación de combos)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Combo automático persistente mediante el endpoint normal de combos
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Estrategias del enrutador automático

Los combos persistentes con `strategy: "auto"` pueden establecer `config.routerStrategy` (o el valor heredado
`config.auto.routerStrategy`) en uno de los siguientes valores:

- `rules` — puntuación ponderada predeterminada
- `score` — selecciona la puntuación ponderada configurada más alta. Los empates exactos conservan el orden
  configurado de los candidatos; el `explorationRate` existente toma muestras del grupo clasificado completo.
- `cost` / `eco` — proveedor saludable más barato
- `latency` / `fast` — menor latencia p95 con penalización por fiabilidad
- `sla-aware` / `sla` — prioriza candidatos que cumplan los SLO de latencia p95, tasa de errores y, opcionalmente,
  coste
- `lkgp` — primero el último proveedor conocido que funcionó correctamente
- `nadir` — consulta a la API de decisiones de [Nadir](https://getnadir.com) qué modelo del grupo
  necesita el prompt; requiere activación explícita y, en caso de fallo, recurre a `rules`

### Estrategias del enrutador en detalle

El motor de Auto-Combo expone 7 implementaciones conectables de **RouterStrategy** que
puedes intercambiar mediante `config.routerStrategy` (o el valor heredado `config.auto.routerStrategy`).
Cada estrategia elige un proveedor del grupo de candidatos a partir de un `RoutingContext`
(tipo de tarea, indicaciones de herramientas/visión, estimación de tokens, política de SLA opcional y
último proveedor conocido que funcionó correctamente, si está disponible).

#### 1. `rules` (predeterminada) — puntuación ponderada de 16 factores

Encapsula el motor de puntuación existente. Filtra los candidatos del disyuntor de circuito
cuyo estado sea `OPEN` y, a continuación, ejecuta `scorePool()` con el tipo de tarea actual y `getTaskFitness()`,
seleccionando el proveedor con la puntuación más alta.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Cuándo usarla**: De forma predeterminada. Úsala cuando quieras un equilibrio entre todas las señales.

**Alias**: `rules` (sin alias)

---

#### 2. `cost` / `eco` — proveedor saludable más barato

Ordena el grupo de candidatos por `costPer1MTokens` (en orden ascendente) y selecciona el más barato.
Primero filtra los candidatos cuyo estado sea `OPEN`.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Cuándo usarla**: Cargas de trabajo sensibles al coste, procesamiento por lotes o tareas en segundo plano.

**Alias**: `cost`, `eco`

---

#### 3. `latency` / `fast` — menor latencia p95 con penalización por fiabilidad

Ordena por `p95LatencyMs + (errorRate * 1000)`. La penalización por tasa de errores garantiza
que los proveedores poco fiables queden en posiciones inferiores, incluso si su latencia nominal es baja.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Cuándo usarla**: Cargas de trabajo sensibles a la latencia, como chat en tiempo real, autocompletado o
asistentes interactivos de programación.

**Alias**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — cumplimiento de los SLO de latencia/error/coste

Asigna una puntuación a cada candidato según el grado en que satisface la política de SLO configurada:

| Factor                    | Peso | Fórmula                                                      |
| ------------------------- | ---- | ------------------------------------------------------------ |
| Puntuación de latencia    | 35%  | `threshold / max(value, ε)`                                  |
| Puntuación de errores     | 35%  | `threshold / max(value, ε)`                                  |
| Puntuación de salud       | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)            |
| Puntuación de coste       | 10%  | `threshold / max(value, ε)` o inversa normalizada            |
| Puntuación de estabilidad | 5%   | desviación estándar de latencia normalizada de forma inversa |

Cuando `hardConstraints: true`, los candidatos se ordenan principalmente por **puntuación de infracción**
(cuánto exceden algún SLO) y, después, por la puntuación compuesta. De lo contrario, se usa únicamente
la puntuación compuesta.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... puntúa cada candidato según la política: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Campos de SLA** (definidos en la configuración del combo):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Cuándo usarla**: Cargas de trabajo de producción con presupuestos estrictos de latencia, tasa de errores o coste.

**Alias**: `sla-aware`, `sla`

---

#### 5. `lkgp` — primero el último proveedor conocido como válido

Prueba primero el **último proveedor conocido como válido** (si está definido) y, después, recurre a la
estrategia `rules`. Resulta útil para mantener la afinidad de sesión: el mismo proveedor gestiona
las solicitudes posteriores de una conversación.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Recurrir a la estrategia rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Cuándo usarla**: Conversaciones de varios turnos en las que se desea que el mismo proveedor gestione
las solicitudes posteriores (por ejemplo, para almacenamiento en caché, continuidad del contexto o coherencia de precios).

**Alias**: `lkgp` (sin alias)

---

#### 6. `nadir` — elección de modelo según el prompt mediante Nadir

Todas las estrategias anteriores clasifican a los candidatos según su propia telemetría; ninguna de ellas lee
la solicitud. `nadir` envía el último turno del usuario junto con los identificadores de modelo del pool a
la API de decisión de [Nadir](https://getnadir.com) (`POST /v1/bucket`) y enruta la solicitud al modelo
que Nadir selecciona de ese menú (`simple` → el modelo capaz más barato, `complex` → el
modelo de vanguardia). La conexión que sirve ese modelo sigue seleccionándose mediante `rules`, por lo que la cuota,
la salud y el coste continúan determinando qué cuenta se utiliza.

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "nadir",
    "nadir": {
      "apiKey": "ndr_...",
      "baseUrl": "https://api.getnadir.com",
      "timeoutMs": 2000
    }
  }
}
```

`OMNIROUTE_NADIR_API_KEY` y `OMNIROUTE_NADIR_BASE_URL` son variables de entorno de reserva para las dos
cadenas. `baseUrl` solo es necesario para una instancia autoalojada de Nadir (se admite un `/v1` final).
Las llamadas sin clave se envían al nivel anónimo de Nadir, que tiene un límite de solicitudes por IP.

Qué sale del sistema: el texto del último mensaje del usuario (los primeros 16 000 caracteres), los identificadores
de los modelos candidatos y una etiqueta de canal `source: "omniroute"`. No se envían el prompt del sistema, el historial, las herramientas ni
los encabezados.

El comportamiento ante fallos es abierto: un tiempo de espera agotado (2000 ms de forma predeterminada), una respuesta que no sea 2xx, un host
inaccesible, una respuesta con formato incorrecto o una selección que no pertenezca al pool hacen que se utilice la decisión de `rules`,
y el motivo recibe el prefijo `NadirStrategy: fallback (…)`. Después de una llamada fallida, la
estrategia omite la red durante 30 s, por lo que una interrupción supone un único tiempo de espera cada 30 s en lugar de
uno por solicitud. Los eventos de enrutamiento indican `strategy: "nadir"` únicamente cuando Nadir tomó realmente
la decisión.

**Cuándo usarla**: tráfico de dificultad variable en un pool que abarca varios niveles de modelos (uno pequeño, uno intermedio
y uno de vanguardia), cuando se desea reducir el coste de usar siempre el modelo de vanguardia.

**Alias**: `nadir` (sin alias)

---

### Estrategias de enrutamiento personalizadas

Puede registrar su propia implementación de `RouterStrategy` mediante la API pública:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Su lógica de enrutamiento aquí
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

A continuación, úsela:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Guía de selección de estrategias de enrutamiento

| Caso de uso                  | Estrategia  | Motivo                                             |
| ---------------------------- | ----------- | -------------------------------------------------- |
| Carga de trabajo equilibrada | `rules`     | Predeterminada: tiene en cuenta todos los factores |
| Minimizar el coste           | `cost`      | Siempre elige la opción más barata                 |
| Minimizar la latencia        | `latency`   | Elige el proveedor fiable más rápido               |
| SLO estrictos                | `sla-aware` | Filtra por umbrales de p95/errores/coste           |
| Chat de varios turnos        | `lkgp`      | Afinidad de sesión                                 |
| Dificultad variable          | `nadir`     | Elige el nivel de modelo para cada prompt          |

Campos compatibles con SLA:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Adecuación por tarea

Más de 30 modelos evaluados en 6 tipos de tareas (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Admite patrones comodín (p. ej., `*-coder` → puntuación alta en programación).

## Resumen de variantes automáticas

Incluyendo `auto` sin variante (valor predeterminado) y los 6 valores de `AutoVariant` declarados en `autoPrefix.ts`, hay **7 ID de modelo invocables**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` enumera 6 valores; la séptima opción es «sin variante» — `auto` sin variante — que `parseAutoPrefix()` gestiona como `variant: undefined`).

## Cómo encajan los niveles en Auto-Combo

La función de puntuación de 16 factores (`open-sse/services/autoCombo/scoring.ts`) trata la pertenencia a un nivel como dos señales: `tierPriority` (0.0476) y `tierAffinity` (0.0476). Consulta la [tabla canónica de factores de puntuación](#how-it-works-persisted-auto-combos) anterior para ver el conjunto completo de `DEFAULT_WEIGHTS`; las anulaciones por paquete (ship-fast/cost-saver/quality-first/
offline-friendly) aparecen en la tabla «Perfiles de pesos por paquete».

El nivel por sí solo **no** obliga a que el Nivel 1 sea el primero: si la latencia del Nivel 1 es mala o la relación entre coste y calidad no es óptima, gana el Nivel 2. Para imponer el orden de los niveles, usa la estrategia de combo `priority` y organiza los proveedores por nivel.

Para favorecer claramente el Nivel 1 (suscripción), aumenta el peso de `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Consulta [`docs/guides/TIERS.md`](../guides/TIERS.md) para conocer las definiciones de los niveles y la clasificación de los proveedores.

## Pruebas y cobertura

### Matriz determinista de decisiones de enrutamiento (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` demuestra la **decisión** de enrutamiento de las 19
estrategias públicas de extremo a extremo mediante el flujo real de combinación con un servicio ascendente simulado.
La cobertura incluye:

- Las 19 estrategias de `ROUTING_STRATEGY_VALUES` (ordered, weighted, cost, context, fusion, …).
- `quota-share` (interna) de extremo a extremo: equidad DRR + pérdida de prioridad por saturación mediante el
  punto de integración real `selectQuotaShareTarget` (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- Cobertura de transferencia universal de `context-relay` para cada número de destinos.

Este conjunto se ejecuta en CI (trabajo `test:integration`) con `--test-concurrency=1` y
`--test-force-exit`, por lo que es determinista y no requiere credenciales reales.

### Pruebas rápidas reales con activación condicional (NO incluidas en CI — proveedores reales)

| Comando                                | Qué hace                                                                                                |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| `npm run test:combo:live`              | Enrutamiento real en proceso con `RUN_COMBO_LIVE=1`; crea una instantánea de una BD de OmniRoute activa |
| `npm run test:combo:live:vps`          | Llamadas HTTP a un servidor OmniRoute activo (configura `COMBO_LIVE_BASE_URL`)                          |
| `npm run test:combo:live:vps:failover` | Lo mismo, con escenarios deliberados de conmutación por error                                           |

Estas pruebas rápidas ejercitan la ruta de comunicación real (combinación → proveedor → finalización). Se
excluyen deliberadamente de CI porque requieren credenciales reales y acceso a un VPS.

---

## Archivos

| Archivo                                                   | Propósito                                                                                                         |
| :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Función de puntuación de 16 factores, `DEFAULT_WEIGHTS`, normalización del pool                                   |
| `open-sse/services/autoCombo/taskFitness.ts`              | Tabla de correspondencia de idoneidad entre modelo y tarea                                                        |
| `open-sse/services/autoCombo/engine.ts`                   | Lógica de selección, bandit, límite de presupuesto                                                                |
| `open-sse/services/autoCombo/selfHealing.ts`              | Exclusión, sondas, modo de incidente                                                                              |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 perfiles de ponderación (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Analizador del prefijo `auto/` + 6 variantes                                                                      |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Crea una instancia de `AutoComboConfig` en memoria a partir de conexiones activas                                 |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Punto de extensión para pruebas que permite simular el registro de proveedores                                    |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (20 estrategias)                                                                        |
| `src/sse/handlers/chat.ts`                                | Integración: cortocircuito para el prefijo auto                                                                   |
