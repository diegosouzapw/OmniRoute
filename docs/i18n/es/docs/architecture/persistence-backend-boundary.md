# ADR: Pluggable persistence boundary (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇧🇦 [bs](../../../bs/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Estado:** Propuesto — requiere la aprobación de los mantenedores antes de comenzar el trabajo en tiempo de ejecución
- **Incidencia de seguimiento:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Alcance:** Solo la arquitectura de persistencia; esta decisión no añade ni selecciona una base de datos externa

## Contexto

Actualmente, OmniRoute ofrece funciones de persistencia orientadas al dominio desde `src/lib/db/`, mientras que la conexión compartida devuelta por `src/lib/db/core.ts` implementa el contrato síncrono `SqliteAdapter` de `src/lib/db/adapters/types.ts`. Ese adaptador admite varios entornos de ejecución de SQLite, pero su interfaz sigue estando diseñada en torno a SQLite: sentencias preparadas síncronas, `pragma`, transacciones diferidas e inmediatas, copias de seguridad nativas o mediante copia de archivos, puntos de control y un identificador local de la base de datos.

La ruta actual de inicio y recuperación también gestiona el ciclo de vida del archivo de SQLite. `src/lib/db/core.ts` resuelve `storage.sqlite`, mantiene un único adaptador global por proceso, crea puntos de control de WAL, conserva determinadas tablas durante la recuperación y elimina los archivos auxiliares de SQLite al reconstruir una base de datos. La selección del controlador en `src/lib/db/adapters/driverFactory.ts` elige entre los entornos de ejecución de SQLite compatibles; no constituye una abstracción de backends externos.

La evolución del esquema presenta un acoplamiento similar. `src/lib/db/migrationRunner.ts` aplica archivos SQL numerados, consulta `sqlite_master` y `PRAGMA table_info`, detecta la compatibilidad opcional con FTS5 y ejecuta las tareas de migración dentro de transacciones de SQLite. Los módulos operativos como `src/lib/db/backup.ts` y `src/lib/db/optimizationSettings.ts` utilizan directamente las semánticas de copia de seguridad, `PRAGMA`, WAL, tamaño de página, vaciado automático y `VACUUM`.

Estas son propiedades válidas de la implementación integrada de SQLite. Deben seguir estando disponibles sin obligar a PostgreSQL ni a MySQL a emular una API de SQLite.

## Decisión

Adoptar un límite de persistencia de dos niveles para el estado duradero portable:

1. **Los contratos de repositorios de dominio** definen las operaciones de persistencia que necesitan el código de negocio y el de enrutamiento. Los consumidores dependen del comportamiento y de los datos del dominio, no del texto SQL, de las sentencias preparadas, de los archivos de bases de datos ni de objetos de dialecto.
2. **Un contrato interno asíncrono de backend** proporciona a las implementaciones de repositorios contextos de transacción, comprobaciones de estado y disponibilidad, coordinación de migraciones, capacidades del backend y errores clasificados. La interfaz exacta de TypeScript se propondrá en el primer PR de implementación y se validará mediante pruebas de conformidad; este ADR no fija intencionadamente una API especulativa.

SQLite continúa siendo la implementación predeterminada. La cascada existente de controladores de SQLite y el `SqliteAdapter` síncrono permanecen detrás de la implementación de repositorios de SQLite mientras los dominios se migran en pequeños segmentos verticales. Ningún usuario está obligado a configurar un servicio externo.

PostgreSQL es la primera implementación externa propuesta una vez que el límite de los repositorios se haya validado con SQLite. MySQL se incorporará después como una implementación equivalente respecto al mismo conjunto de pruebas de conformidad, en lugar de como una segunda bifurcación de la lógica de negocio.

## Reglas del límite

### Interfaz portable de los repositorios

Un repositorio portable puede exponer:

- lecturas y escrituras de dominio;
- operaciones atómicas explícitas y acceso a repositorios dentro del ámbito de una transacción;
- operaciones de comparación/actualización o de arrendamiento cuando la semántica de concurrencia forme parte del dominio;
- paginación, ordenación y errores de restricciones independientes del backend.

El estado, la disponibilidad y la coordinación de migraciones del backend pertenecen al contrato interno operativo o del backend, y no a los repositorios individuales de cada dominio.

Un repositorio portable no debe exponer:

- `prepare`, `get`, `all`, `run` ni identificadores sin procesar de controladores;
- `PRAGMA`, modos de puntos de control de WAL, `VACUUM` ni ajustes de páginas o caché;
- rutas de archivos de SQLite, archivos auxiliares ni copias de seguridad mediante copia de archivos;
- `lastInsertRowid` como contrato de dominio común a distintos backends;
- sintaxis de FTS5 o `sqlite-vec`;
- una vía de escape genérica al dialecto utilizada por el código de negocio habitual.

### Interfaz de capacidades del backend

El comportamiento específico de cada backend permanece explícito y es fácil de identificar. El mantenimiento exclusivo de SQLite se mantiene detrás de su propia implementación e interfaz operativa, lo que incluye:

- selección del controlador en tiempo de ejecución;
- puntos de control de WAL y comportamiento de cierre de SQLite;
- configuración del tamaño de página, del tamaño de la caché y del vaciado automático;
- copia de seguridad, restauración y recuperación de archivos de bases de datos;
- introspección del esquema de SQLite;
- integración con FTS5 y `sqlite-vec`.

Un backend externo no está obligado a imitar estas funcionalidades. Los repositorios deben utilizar una capacidad portable, proporcionar una implementación específica del backend con un comportamiento documentado o informar de que una capacidad no está disponible.

## Modelo de transacciones y migraciones

Las API de los repositorios definen la operación de negocio atómica; los llamadores no seleccionan un modo de transacción SQL.
Cada operación debe definir sus garantías de concurrencia observables: invariantes protegidas, detección de conflictos, clasificación de reintentos, expectativas de idempotencia y propagación del contexto de transacción.
Las implementaciones pueden utilizar diferentes mecanismos de transacción y aislamiento únicamente cuando esas garantías observables sigan siendo equivalentes. SQLite puede seguir utilizando internamente su comportamiento actual de transacciones diferidas o inmediatas cuando este satisfaga el contrato de la operación.

Los backends externos requieren una propiedad explícita de las migraciones para que múltiples réplicas de la aplicación no puedan competir por el mismo cambio de esquema. Los historiales de migración de los backends pueden compartir hitos lógicos, pero no se presupone que los archivos SQL de SQLite sean portables ni reutilizables en otro dialecto.

## Semántica de conformidad entre backends

Las pruebas de conformidad deben cubrir el comportamiento, no solo las firmas de los métodos de los repositorios. Cada dominio migrado debe definir y verificar:

- zona horaria, precisión y serialización de las marcas de tiempo;
- expectativas sobre la ordenación de `NULL`, la intercalación y la distinción entre mayúsculas y minúsculas;
- representación de JSON y comportamiento de comparación;
- precisión de enteros, decimales y valores monetarios;
- ordenación estable y criterios de desempate deterministas para la paginación;
- generación de ID sin depender de los identificadores de fila de SQLite;
- clasificación de las infracciones de unicidad y de clave foránea;
- comportamiento de las filas afectadas en operaciones sin cambios, de comparación/actualización y de eliminación;
- resultados de escrituras simultáneas, conflictos reintentables y reintentos idempotentes.

Si un dominio no puede establecer una semántica observable equivalente, aún no es portable y debe seguir siendo específico del backend hasta que se diseñe dicho contrato.

## Requisitos de compatibilidad

Toda implementación que siga este ADR debe conservar estas propiedades:

- SQLite sigue siendo la opción predeterminada sin configuración.
- Los archivos y el historial de migraciones existentes de SQLite siguen siendo legibles.
- npm, Electron, Docker y las alternativas de SQLite para entornos de ejecución restringidos conservan su ruta de inicio actual.
- Las credenciales almacenadas de los proveedores siguen utilizando el comportamiento de cifrado existente de la aplicación.
- Una migración de repositorio no modifica de forma silenciosa la semántica de enrutamiento, cuotas, claves de API ni auditoría.
- El comportamiento de las copias de seguridad y la recuperación se documenta por backend en lugar de presentarse como universal.
- Una instalación limpia que utilice únicamente SQLite no carga ni requiere un controlador de base de datos externo.

## Secuencia de entrega

1. Publicar un inventario reproducible del acoplamiento con SQLite como artefacto de revisión independiente.
2. Introducir los primeros contratos de repositorio de dominio y las pruebas de conformidad.
3. Adaptar la implementación existente de SQLite tras esos contratos sin modificar los valores predeterminados.
4. Sujeto a la aprobación de los mantenedores, añadir PostgreSQL como primera implementación externa para una porción delimitada del plano de control.
5. Ampliar el estado compartido únicamente después de que existan pruebas de escrituras simultáneas y de propiedad de las migraciones.
6. Añadir una ruta sin conexión y validada de migración de SQLite a un backend externo antes de anunciar la posibilidad de cambiar de base de datos.
7. Añadir MySQL sobre los contratos de repositorio y backend ya probados.

Cada paso en tiempo de ejecución constituye una PR independiente y revisable. No se debe utilizar un paso posterior para justificar la integración de una abstracción no demostrada en un paso anterior.

## Primera fase de implementación

La primera fase de ejecución debe seleccionarse después de revisar el inventario de acoplamientos. Las conexiones de proveedores, las claves de API, las combinaciones y la configuración de enrutamiento son candidatas porque sus tablas base están visibles en `src/lib/db/core.ts`, pero este ADR no aprueba una lista de tablas ni un PR de migración.
La fase debe incluir:

- pruebas de conservación del comportamiento de SQLite;
- pruebas de conformidad de los repositorios;
- límites de transacción explícitos;
- verificación del cifrado y la ocultación de las credenciales almacenadas;
- ningún cambio en la configuración de inicio predeterminada.

## Alternativas consideradas

### Añadir PostgreSQL debajo de `SqliteAdapter`

Rechazado. `SqliteAdapter` es una capa de compatibilidad para entornos de ejecución de SQLite y expone operaciones específicas de SQLite. Emular esa interfaz introduciría supuestos síncronos y específicos del dialecto en un backend nuevo.

### Exponer una API genérica de consulta/ejecución a todos los dominios

Rechazado como límite principal. Centralizaría la gestión de conexiones, pero mantendría el acoplamiento con el dialecto SQL, las transacciones y las tablas en los módulos de negocio. Puede existir una primitiva de backend de bajo nivel dentro de las implementaciones de los repositorios, pero no como API de persistencia orientada a la aplicación.

### Reescribir toda la persistencia antes de validar una fase

Rechazado. La superficie de persistencia actual es amplia e incluye el ciclo de vida de los archivos, la recuperación, la búsqueda y la configuración operativa. Las fases verticales proporcionan límites de comportamiento y reversión que pueden revisarse.

### Sustituir SQLite como opción predeterminada

Rechazado. Las implementaciones integradas y de escritorio dependen del modelo de inicio actual sin servicios adicionales. Un backend externo es opcional.

### Usar Redis como autoridad duradera

Rechazado. Redis puede utilizarse para coordinación explícitamente efímera, caché o contadores, pero no sustituye el contrato de repositorio duradero descrito aquí.

## Consecuencias

### Positivas

- El código de negocio obtiene un punto de separación de persistencia estable e independiente del dialecto de la base de datos.
- El comportamiento de SQLite se prueba antes de que un backend externo defina la abstracción.
- PostgreSQL y MySQL comparten contratos y pruebas en lugar de duplicar la lógica de dominio.
- Las capacidades exclusivas de SQLite siguen siendo elementos de primera clase en lugar de convertirse en capas de compatibilidad con abstracciones permeables.
- El comportamiento de las migraciones y las transacciones con múltiples réplicas se convierte en una consideración de diseño explícita.

### Costes y riesgos

- La extracción de repositorios requiere una migración incremental de los puntos de llamada.
- Los límites asíncronos pueden propagarse por código de servicio que actualmente es síncrono.
- La semántica entre backends requiere pruebas de conformidad más allá de la compatibilidad de la sintaxis SQL.
- Las copias de seguridad, la búsqueda, el almacenamiento vectorial y el mantenimiento siguen dependiendo de capacidades específicas.
- Mantener más de una implementación de persistencia aumenta el coste de la integración continua y del soporte operativo.

## Objetivos excluidos

Este ADR no:

- añade una dependencia de base de datos, una variable de entorno, un esquema ni una migración;
- modifica el singleton de SQLite activo ni la cadena de selección de controladores;
- promete compatibilidad con PostgreSQL o MySQL en una versión específica;
- hace portables FTS5, `sqlite-vec`, los archivos de copia de seguridad ni el mantenimiento de SQLite;
- define la preparación para un modelo activo-activo antes de que existan pruebas de estado compartido y coordinación;
- aprueba una reescritura completa y de una sola vez de `src/lib/db/`.

## Preguntas abiertas para la aprobación de los mantenedores

1. ¿Es la dirección preferida el repositorio junto con el límite interno del backend asíncrono, o debería
   la persistencia externa estar detrás de un servicio independiente del plano de control?
2. ¿Es PostgreSQL aceptable como primera implementación externa tras verificar la conformidad con SQLite?
3. ¿Qué dominio debería ser la primera sección delimitada del repositorio?
4. ¿Qué estado debe compartirse para el primer hito con múltiples réplicas y cuál debe permanecer local al nodo?
5. ¿Qué periodo de compatibilidad se requiere para una migración del repositorio interrumpida o revertida?

Hasta que se resuelvan estas preguntas, este documento es una propuesta y no implica ninguna refactorización en tiempo de ejecución.
