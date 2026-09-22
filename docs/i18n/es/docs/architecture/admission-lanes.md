# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute tiene **dos** sistemas de carriles locales al proceso con ámbitos diferentes. Son
complementarios; los operadores deben saber cuál están observando.

## 1. Admisión a nivel de bytes para todo el proceso (`chatBodyAdmission.ts`)

- **Ámbito:** la ruta de cuerpo almacenado en búfer/montículo para `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` y las demás rutas con formato de chat. Protege
  contra la amplificación del montículo provocada por cuerpos grandes de agentes de programación (#4380).
- **Un controlador global por proceso, no carriles por clave (#10110).** Cada clave de API
  (con hash) o sesión `anonymous` se admite en función del **mismo** presupuesto compartido;
  el id de sesión con hash se utiliza ÚNICAMENTE como clave de planificación equitativa (despacho
  por turnos entre quienes esperan), nunca como partición de capacidad. Una versión anterior de este
  documento describía carriles por clave con capacidad independiente; ese modelo se
  eliminó en #10110 porque permitía que credenciales falsas no autenticadas multiplicaran
  el límite para todo el proceso.
- **Control (#503-fanout): un presupuesto de ingestión en BYTES derivado automáticamente, no un recuento fijo de
  solicitudes.** El límite heredado por recuento de solicitudes `CHAT_MAX_HEAVY_IN_FLIGHT` (valor predeterminado `1`
  antes de esta corrección) reducía el fan-out de los agentes de programación (varios subagentes/CLI,
  con cuerpos habitualmente > 256 KB) a una concurrencia efectiva de ~1, lo que provocaba respuestas 503
  bajo una carga completamente normal. Ahora solo se aplica cuando un operador establece explícitamente
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Si no se establece, la admisión queda
  controlada por `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`: un presupuesto derivado automáticamente del
  límite real de memoria del proceso (`src/shared/middleware/admissionBudget.ts`):
  el 25 % del menor valor entre el límite del montículo de V8 y cualquier límite de cgroup/contenedor,
  dividido por un factor de amplificación transitoria de 8x y restringido a un intervalo de entre 8 MiB y
  2 GiB. Las anulaciones explícitas utilizan los mismos límites. Esto se ajusta automáticamente desde un
  contenedor de 512 MB hasta un equipo de escritorio de 32 GB sin configurar variables de entorno. Un cuerpo que no
  pueda caber dentro del presupuesto efectivo falla inmediatamente con `413 body_exceeds_budget`;
  solo la contención entre cuerpos que pueden procesarse individualmente entra en la cola acotada
  de equidad. Un monitor activo de presión de recursos basado en múltiples señales (proporción del montículo de V8,
  cgroup, PSI, eventos OOM: `open-sse/utils/resourcePressurePolicy.ts`) reduce
  la espera acotada bajo presión `high` y rechaza inmediatamente con
  `503 resource_pressure` bajo presión `critical`, antes incluso de ingerir
  ningún byte. PSI se lee del archivo `memory.pressure` del cgroup de esta unidad cuando está presente
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` abarca
  todo el host y solo se utiliza como alternativa en hardware físico/cgroup v1, de modo que un
  host que utilice intercambio de memoria no pueda provocar un 503 en un contenedor inactivo.
- **Ajustes:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — anulación del presupuesto de bytes derivado automáticamente
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — límite heredado por recuento de solicitudes, solo mediante activación explícita
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — espera en cola antes de un 503 (valor predeterminado: 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — válvula del montículo para bytes en cola (valor predeterminado: 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — obsoletos
    y sin efecto desde #10110 (se aceptan por compatibilidad de configuración, pero se ignoran)
- **Informes:** `GET /api/monitoring/health` → `chatAdmission` (#11244), incluidas
  las adiciones de #503-fanout `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` y `countCapEnabled`
  (false en una implementación predeterminada; confirma que el presupuesto de bytes, y no el límite heredado
  por recuento, es el que realmente se está aplicando).

## 2. Carriles virtuales adaptativos en tiempo de ejecución (`open-sse/services/admission`)

- **Alcance:** admisión por clave de inquilino para el despacho a proveedores — coste de cola, adaptación de límites guiada por latencia, puesta en cola por carril y métricas de carril.
- **Activación:** **opcional.** Está deshabilitado a menos que `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Sin esta opción, el controlador adaptativo mantiene el comportamiento de cola compartida (el criterio 1 de #9654 solo se cumple cuando un operador habilita los carriles).
- **Ajuste:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + configuración adaptativa (`maxQueueCount`, `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Informes:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`, `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (identificadores de carril opacos, nunca claves sin procesar) y `virtualLanes`, el indicador definitivo de que «los carriles están activos» en la instantánea.

## 3. Sondeos de distribución — admisión por destino para combo/fusion (#9654 Oleada 2)

Combo (prioridad / round-robin) y fusion distribuyen N destinos de modelo bajo una única solicitud principal. Desde la Oleada 2 de #9654, **cada destino de la distribución se somete a control antes del despacho** mediante un sondeo por destino (`PerTargetAdmissionHook`, creado por `createPerTargetAdmissionHook`) contra el carril del inquilino de la solicitud **principal**.

- **Alcance:** todos los destinos de distribución despachados por combo, fusion y el motor de caos. El sistema 1 (a nivel de bytes) no se ve afectado: nunca sondea destinos de distribución.
- **Activación:** **opcional con el sistema 2.** No realiza ninguna operación cuando `OMNIROUTE_CHAT_VIRTUAL_LANES` no está definido: en ese modo, la solicitud principal ya conserva la concesión de la cola compartida, por lo que realizar sondeos provocaría un cómputo doble y rechazaría los destinos de combo.
- **Semántica:**
  - **Estrictamente no bloqueante: omitir, nunca poner en cola.** `maxWaitMs 0`: un carril lleno omite el destino y, en su lugar, responde el mecanismo de respaldo de combo (o el panel de supervivientes de fusion). Esto es deliberado: un destino de distribución supone trabajo redundante, y ponerlo en cola acumula aún más carga precisamente sobre la congestión que los carriles pretenden detener. Por tanto, `defaultMaxWaitMs` se aplica **únicamente a la solicitud principal**; los sondeos de distribución nunca esperan y, de forma intencionada, **no existe ningún parámetro** que permita hacerlos esperar (el historial del problema demuestra que los parámetros de espera produjeron la clase de errores 502/504 masivos que #9654 evita; solo debe reconsiderarse si un operador informa de que los destinos de distribución omitidos perjudican la calidad de las respuestas).
  - **Liberación al admitir.** Un sondeo admitido libera su concesión inmediatamente: es un control de capacidad, no una retención. La concesión de la solicitud principal cubre la distribución; retener N concesiones adicionales inflaría el coste activo compartido y provocaría el rechazo de otros inquilinos. Es una acción de mejor esfuerzo, no una reserva: el carril puede volver a llenarse entre el sondeo y el despacho, por lo que, si existe una contención elevada, el control puede admitir un destino en un carril que vuelva a estar lleno en el momento en que se despache dicho destino.
  - **Coste calculado a partir del cuerpo real de la distribución.** El sondeo estima el coste a partir del cuerpo real del destino, incluida la clase de solicitud derivada de su indicador `stream`, exactamente igual que en la ruta principal, de modo que los miembros del panel de fusion (`stream: false`) se valoran según la clase sin streaming que ocuparán realmente, y los destinos de prioridad/RR según lo que haya solicitado el usuario.
- **Informes:** la omisión de un sondeo después del primer destino incrementa el `fallbackCount` por solicitud de combo (reflejando la semántica de respaldo existente; visible en los registros de combo); fusion devuelve 503 cuando se omiten todos los miembros del panel. Actualmente **no existe ningún contador agregado** (por ejemplo, `virtualFanoutSkipped`) en la instantánea; si un operador informa de que no puede determinar con qué frecuencia el control de carriles omite destinos de distribución, esa será la señal para añadir uno.

## Cuál se muestra en un panel

- `adaptiveAdmission.laneCount` / `laneTenants` → **carriles virtuales adaptativos** (sistema 2).
- `adaptiveAdmission.virtualLanes === true` → las sondas de distribución de la sección 3
  también están activas. Una carga útil en la que falte `virtualLanes` o sea `false` significa
  que `OMNIROUTE_CHAT_VIRTUAL_LANES` no está configurada: los carriles a nivel de bytes
  (sistema 1) siguen activos, pero nada de `adaptiveAdmission` (ni ningún control de
  distribución) entra en vigor hasta que se habilite.

## Por qué existen ambos

Los carriles a nivel de bytes limitan la ruta de análisis/compresión con un uso intensivo de
memoria; los carriles adaptativos limitan el coste de despacho por inquilino. El criterio 1 de
#9654 («la ráfaga de una sesión no provoca un 503 en otra») se aplica de forma incondicional
mediante el sistema 1 y mediante el sistema 2 una vez habilitada la activación voluntaria.

## 4. `/v1/responses` prolongadas en un solo proceso (margen saludable)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) añadió
`tryAcquireHealthyHeadroom` para que se admita una segunda solicitud estructuralmente pesada
cuando el heap está por debajo de `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. La ruta BYTE
utilizada por `admitChatRequest` (cuerpos ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
valor predeterminado: 256 KiB, incluido `POST /v1/responses`) utiliza la **misma**
vía de escape.

Esta es la configuración compatible de **un solo proceso** para más de dos conexiones SSE
`/v1/responses` prolongadas simultáneas: aumente la capacidad principal y el margen saludable
solo hasta donde lo permitan el heap y el presupuesto de bytes en curso para todo el proceso
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Tener decenas de clientes SSE prolongados
(40–50) es una cuestión de ese presupuesto de memoria, no un límite rígido del producto de
«máximo 2». Un heap sometido a presión sigue descartando solicitudes con un `503` reintentable,
de modo que #7849 no vuelva a producirse.

Para **multiplicar los heaps**, ejecute N `DATA_DIR` independientes (#11024). Nunca use
`replicas > 1` con un mismo archivo SQLite (#10350). Esta sección no reabre la
configuración de escalado horizontal mediante DATA_DIR.
