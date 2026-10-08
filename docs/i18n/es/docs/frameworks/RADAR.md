# Radar Free-Model Catalog (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Fuente de referencia:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Última actualización:** 2026-09-01 — v3.8.51
> **Límite de las pruebas del servicio alojado:** las reglas del lado del servidor descritas aquí se verificaron el
> 2026-09-01 con el servidor Radar intencionadamente privado en la revisión exacta
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Esa implementación no se distribuye en
> este repositorio OSS; la disponibilidad del servicio alojado sigue siendo un estado operativo independiente.

Radar es un **complemento opcional** que superpone un catálogo firmado y recientemente seleccionado
de modelos gratuitos sobre la base de referencia de la versión (`FREE_MODEL_BUDGETS` en
`open-sse/config/freeModelCatalog.data.ts`). Existe porque el panorama del nivel gratuito cambia
más rápido que la cadencia de lanzamientos: los proveedores añaden, reducen o eliminan cuotas gratuitas entre
versiones, y el catálogo de referencia solo puede actualizarse cuando se publica una nueva versión.

**Nada de lo que es gratuito hoy deja de serlo debido al feed remoto.** Radar nunca
impone un muro de pago a una entrada de referencia; solo actualiza los campos de límites/estado en el momento de la lectura y puede
incorporar modelos gratuitos recién descubiertos entre versiones. Un operador aún puede ocultar un
modelo localmente y restaurarlo desde el mismo panel. El catálogo de referencia en sí
nunca se modifica en el disco; consulte
[Reglas de fusión de superposiciones en el momento de la lectura](#read-time-overlay-merge-rules) a continuación.

---

## Estado de entrega en v3.8.51

El siguiente estado distingue lo que implementa esta versión OSS de las líneas de trabajo posteriores
de Radar. Es un estado a nivel de código, no una promesa de que una implementación alojada
o una integración externa concreta estén disponibles actualmente.

| Área                                          | Estado en esta versión                                                                                                                                                                                                                                                                                 |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cliente de catálogo firmado                   | Implementado tras `RADAR_ENABLED`, con adhesión opcional independiente, verificación Ed25519, configuración/caché local cifrada, anulaciones persistentes de visualización/activación, marcadores de eliminación reversibles, programador y panel.                                                     |
| Activación de colaboradores                   | El panel enlaza al flujo de solicitud de GitHub alojado en el servidor y acepta una clave `omr_…` existente. El servicio privado determina la elegibilidad del colaborador; el cliente OSS no contiene ningún token de GitHub ni lógica de emisión.                                                    |
| Activación mediante clave de colaborador      | Implementada. La clave sin procesar se valida, se cifra en reposo, se enmascara en las lecturas y solo se envía mediante sincronización del lado del servidor. Cambiar o borrar la clave invalida las cuatro cachés de feeds sensibles a los derechos.                                                 |
| Enlaces de referencia                         | Implementados como un feed firmado por separado que se actualiza cada hora. Los enlaces fijos están disponibles inmediatamente para el nivel comunitario; las campañas limitadas siguen siendo datos del nivel en vivo.                                                                                |
| Ofertas para colaboradores                    | Implementadas como un feed independiente, firmado y exclusivo del nivel en vivo, y como una página del panel. El cliente vuelve a validar el esquema cerrado de beneficios, conserva la última caché válida, filtra las entradas caducadas y etiqueta explícitamente las ofertas de socios.            |
| Información y reconocimiento de colaboradores | Implementados como un feed estricto, firmado y exclusivo del nivel en vivo, con ELO propiedad de Radar, datos objetivos sobre la actualidad/tendencia del catálogo, una insignia local verificada de colaborador, una página del panel y comandos CLI de estado/sincronización exclusivamente locales. |
| Pagos y correo electrónico transaccional      | No implementados en el cliente OSS. La compra, la donación, la revisión de recibos, la recuperación y la entrega de correo pertenecen al servicio privado; la disponibilidad del servicio alojado sigue dependiendo de su despliegue supervisado y de la configuración del proveedor.                  |
| Línea de trabajo del agente de investigación  | No forma parte de esta versión del cliente. El contenido seleccionado del feed sigue siendo información del lado del servidor; ninguna instalación de OmniRoute ejecuta un agente de investigación autónomo.                                                                                           |

---

## Lector de anuncios públicos

El lector genérico de anuncios es independiente de la marca de función Radar. La página de inicio del panel y el
visor del registro de cambios obtienen el archivo público `news.json` del repositorio mediante una solicitud `GET` simple a
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). No envían ninguna configuración de Radar, prompt, configuración
de proveedor, registro de uso ni estado de descarte local.

`news.json` utiliza el esquema v2 cerrado implementado por `parseNewsPayload()`:

- `schemaVersion: 2` y una colección `items[]` acotada;
- valores `id` de anuncio estables y únicos;
- campos explícitos `active` y `publishedAt` en formato ISO;
- texto en inglés obligatorio con texto localizado opcional;
- enlaces HTTPS opcionales que no requieren credenciales y un icono incluido en la lista de permitidos;
- selección de los elementos activos más recientes primero, uso del inglés como alternativa de configuración regional y descarte local por ID.

El analizador acepta temporalmente el formato singular anterior `{ active, title, message, ... }` para que
las bifurcaciones más antiguas puedan migrar sin que se rompa la vista del registro de cambios. Los feeds no válidos permanecen inactivos. La entrada de lanzamiento de Radar
se distribuye con `active: false`; cambiarlo a `true` es una acción de lanzamiento independiente posterior a la fusión y al despliegue,
y no modifica `RADAR_ENABLED` ni la suscripción independiente a la sincronización del feed.

---

## Marca: `RADAR_ENABLED` (desactivada de forma predeterminada)

Radar está restringido de extremo a extremo por la marca de función `RADAR_ENABLED`
(`src/shared/constants/featureFlagDefinitions.ts`, categoría `policies`,
`defaultValue: "false"`).

**Cuando la marca está desactivada, la funcionalidad no existe:**

- Todos los endpoints `/api/radar/*`, incluidas las lecturas y escrituras locales del estado del modelo,
  devuelven `404` antes de acceder a cualquier módulo de Radar.
- Las pantallas del panel (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) renderizan
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) devuelve la línea base intacta:
  el mismo número de entradas, los mismos valores y todas las entradas etiquetadas con `origin: "baseline"`; además, nunca
  lee la caché del feed.
- Nunca se realiza ninguna llamada de red de Radar; cada módulo de sincronización devuelve `{ status: "disabled" }`
  antes de acceder a `fetch`.

Esta es una restricción estrictamente superior: activar la marca desbloquea las _pantallas_, nada
más. No carga datos, no inicia una sincronización en segundo plano ni cambia
el enrutamiento o la selección de modelos; consulte la suscripción independiente que aparece a continuación.

---

## La sincronización de datos es una suscripción INDEPENDIENTE: la promesa de privacidad

Activar `RADAR_ENABLED` solo desbloquea la interfaz de usuario. La sincronización del feed requiere una segunda
suscripción independiente almacenada en `radar_settings.opt_in` (`src/lib/db/radar.ts`,
migración `136_radar_cache_settings.sql`). `syncRadar()` comprueba la marca _y_ la
suscripción antes de realizar cualquier llamada de red:

```
Marca desactivada  → { status: "disabled" }   — no se realiza ninguna llamada de red
Suscripción falsa  → { status: "opt_out" }    — no se realiza ninguna llamada de red
```

Cuando ambas están activadas, la ruta de sincronización es la siguiente:

1. `GET <URL base del feed>/v1/catalog/latest` con `x-omniroute-radar-schema: 2` y un encabezado
   opcional `Authorization: Bearer <clave de colaborador>` (véase más adelante). Cuando el encabezado de esquema está ausente, los servidores usan de forma predeterminada
   el artefacto de transición v1 firmado por separado, de modo que los clientes instalados más antiguos sigan
   recibiendo actualizaciones.
2. Este es un flujo de aplicación exclusivamente de descarga, pero sigue siendo una solicitud HTTPS. La infraestructura
   alojada recibe metadatos de conexión habituales, como la IP de origen. Cuando se configura una clave de colaborador,
   la sincronización también envía esa clave en el encabezado Bearer para que el servicio pueda determinar
   el derecho de acceso. En la revisión exacta del servidor privado identificada anteriormente en el límite de evidencia,
   la contabilidad de solicitudes del feed utiliza hashes de claves, uso agregado y un HMAC truncado de la IP
   que rota diariamente para la revisión manual de abusos; esas tablas no conservan ni la clave ni la IP sin procesar.
   Los registros de acceso de la infraestructura y la bandeja de salida cifrada de entregas constituyen límites operativos
   independientes.
3. OmniRoute nunca envía prompts, respuestas, conversaciones, credenciales de proveedores, tráfico de modelos,
   tiempo de actividad, latencia ni la configuración local de proveedores al servicio Radar.
4. La respuesta se verifica, valida y almacena localmente en caché (consulte
   [Modelo de seguridad](#security-model)). Radar tiene exactamente cuatro rutas de red del lado del servidor:
   `syncRadar()` para el catálogo, `syncRadarReferrals()` para las referencias y
   `syncRadarOffers()` / `syncRadarIntel()` para las ofertas y la información Intel exclusivas para colaboradores.

La **clave de colaborador** es un token Bearer opcional (`radar_settings.supporter_key`)
que permite al servicio del feed decidir qué nivel servir (consulte
[Niveles](#tiers-community-and-live)). Esta clave:

- Se almacena **cifrada en reposo** con las mismas funciones auxiliares AES-256-GCM `encrypt()`/`decrypt()`
  (`src/lib/db/encryption.ts`) utilizadas para las credenciales de proveedores.
- Se establece mediante `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) y
  **nunca se devuelve**: la respuesta devuelve una forma enmascarada (`omr_****abcd`).
- Al modificarla o eliminarla, se invalidan atómicamente las cachés del catálogo, las referencias, las ofertas e Intel. La
  siguiente sincronización o lectura determina el nuevo derecho de acceso en el servidor; guardar una clave no realiza por sí mismo
  ninguna solicitud de red ni consume una clave de activación de un solo uso.
- Se envía al servicio del feed como token Bearer en la solicitud GET de sincronización; ninguna otra información sobre la
  clave sale del cliente.

---

## Reglas de acceso y seguridad mostradas antes de aceptar

El panel inactivo muestra estas reglas desde
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **antes** de cualquiera de las acciones de activación.
La escala de acceso canónica es:

| Nivel                     | Requisitos                                                                                                   | Acceso                                                                 | Regla de repetición/caducidad                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Comunidad                 | Cualquiera; sin clave                                                                                        | Catálogo completo con unos 30 días de retraso                          | Siempre disponible; no se emiten claves                                           |
| Estrella + seguimiento    | GitHub OAuth verifica tanto una estrella en el repositorio como el seguimiento de su propietario             | Una consulta del catálogo en tiempo real y, después, Comunidad         | Una emisión por inicio de sesión; nunca se vuelve a emitir                        |
| Colaborador Top 10        | Posiciones 1–10 en la última clasificación semanal completa                                                  | 365 días en tiempo real                                                | Se reclama bajo demanda; salir de la clasificación no acorta un período concedido |
| Colaborador Top 100       | Posiciones 11–100 en esa clasificación                                                                       | 90 días en tiempo real                                                 | La misma regla de reclamación bajo demanda e idempotente                          |
| Compra de colaborador     | Compra única de 6 meses, 1 año o de por vida                                                                 | Catálogo en tiempo real, ofertas firmadas en tiempo real e Intel       | Sin renovación automática                                                         |
| Donación/concesión manual | Donación revisada por el propietario o concesión del propietario por un número explícito de días/de por vida | El mismo derecho de acceso en tiempo real durante el período concedido | Concesión auditada e idempotente                                                  |

Los PR fusionados, los commits y las líneas modificadas son **únicamente datos de entrada para la clasificación**. Un inicio de sesión fuera del Top 100 no obtiene
ninguna concesión de colaborador, independientemente del número de PR. Las compras con duración limitada, las donaciones, los períodos de colaborador y
las concesiones manuales se acumulan a partir de la fecha de caducidad actual; el acceso de por vida prevalece. Un cambio de posición nunca
revoca ni acorta retroactivamente el tiempo ya concedido.

La licencia alojada es personal y la regla de cara al usuario permite una instalación activa a la vez. Esta
versión **no** afirma tener un bloqueo de hardware: la sincronización OSS no genera huellas digitales del hardware ni mantiene un
arrendamiento criptográfico del dispositivo. En la revisión del servidor privado verificada anteriormente, la aplicación implementada
consiste en la validación de derechos, además de una señal para revisión manual cuando la misma clave activa se detecta desde una cuarta
IP distinta en un plazo de 24 horas. Esa señal nunca bloquea ni revoca una clave automáticamente. La recuperación
revoca y reemplaza la clave perdida, conservando la fecha de caducidad existente; no reinicia el
período comprado o concedido.

Las ofertas en tiempo real se seleccionan manualmente y pueden cambiar o caducar. La pantalla de aceptación también especifica el límite
exacto de privacidad: se descargan metadatos firmados del catálogo y de referencias; una clave válida desbloquea además
ofertas firmadas e Intel; la clave Bearer y los metadatos normales de conexión llegan al servicio alojado;
los prompts, las respuestas, las conversaciones, las credenciales de proveedores, el tráfico de modelos, el tiempo de actividad, la latencia y la configuración
local de proveedores no se envían.

---

## Obtener una clave de colaborador

La pantalla de activación (`/dashboard/radar`) enlaza con dos flujos para **obtener** una
clave de colaborador. El propio repositorio OSS nunca emite ninguna, nunca ejecuta código de pago y
**nunca indica un precio**: los precios se deciden y muestran íntegramente en las
páginas de destino, no en este repositorio (decisión de especificación D14).

- **"Soy colaborador"** — abre `RADAR_CONTRIBUTOR_CLAIM_URL` (valor predeterminado
  `https://radar.omniroute.online/auth/github`), un flujo de reclamación mediante GitHub OAuth alojado en
  el servidor privado de Radar. Comprueba la clasificación semanal completa más reciente: los 10 primeros reciben 365 días
  y las posiciones 11–100 reciben 90 días. Fuera de los 100 primeros, la cantidad de PR nunca concede acceso; en su lugar, el flujo
  comprueba el nivel independiente de un solo uso por marcar con una estrella + seguir.
- **"Apoya el proyecto"** — abre `RADAR_SUPPORTER_PLANS_URL` (valor predeterminado
  `https://radar.omniroute.online/planos`), la página alojada para las opciones de pago único de 6 meses, 1 año y
  de por vida. La página OSS sigue sin mostrar ningún valor monetario.

Ambas URL se resuelven en el servidor (`src/lib/radar/links.ts`, con el mismo patrón de
anulación mediante variables de entorno que `RADAR_FEED_URL`) y se transmiten al panel mediante la respuesta existente de
`GET /api/radar/settings` (`contributorClaimUrl`, `supporterPlansUrl`); el
componente cliente nunca lee `process.env` directamente.

| Variable                      | Propósito                                                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Sobrescribe la URL para reclamar la clave de colaborador (valor predeterminado: `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Sobrescribe la URL de los planes de colaborador (valor predeterminado: `https://radar.omniroute.online/planos`).               |

### Recuperar una clave de colaborador perdida

El punto de entrada de recuperación del servicio alojado es `https://radar.omniroute.online/recover`; también
está enlazado desde la página de planes. La recuperación permanece íntegramente fuera del cliente OSS porque la
instalación local nunca recibe el correo electrónico del comprador/colaborador y no puede reconstruir una clave sin procesar a partir de
sus ajustes cifrados.

1. Envía el correo electrónico asociado a la clave. El servicio devuelve la misma página de confirmación tanto si
   existe una licencia recuperable como si no, por lo que el formulario no permite enumerar cuentas.
2. Si cumple los requisitos, el trabajador de entrega envía un enlace de corta duración y de un solo uso. Al abrirlo, se mueve
   inmediatamente el token a una cookie cifrada transitoria `HttpOnly`/`Secure` y se redirige a la URL limpia
   `/recover`; la página no contiene ningún token, correo electrónico, clave anterior ni clave de reemplazo.
3. Confirma la revocación. El servicio privado revoca la clave anterior, crea la de reemplazo con
   el mismo plan y vencimiento, y la pone en cola para enviarla por correo electrónico en una sola transacción. La clave de reemplazo nunca
   se devuelve al navegador.
4. Pega la clave de reemplazo en `/dashboard/radar`. La clave anterior ahora debe degradarse a `community`; la
   de reemplazo debe producir una sincronización `live` verificada. Volver a abrir el mismo enlace de recuperación debe fallar con
   una respuesta genérica que indique que no es válido o que ha caducado.

La ruta de recuperación alojada y el trabajador de correo pueden estar presentes en el código y, aun así, no estar disponibles en un
despliegue determinado. No consideres el flujo listo para producción hasta que se haya desplegado el servidor, se haya configurado
el proveedor de entrega con un destinatario controlado y se haya probado el enlace completo de un solo uso.

Una vez que un visitante dispone de una clave (`omr_` + 40 caracteres hexadecimales), la pantalla de activación
(`src/app/(dashboard)/dashboard/radar/page.tsx`) ofrece como vía principal un campo para pegar la clave:
al pegar una clave y enviarla, se manda `POST /api/radar/settings`
(`{ optIn: true, supporterKey }`) en una sola llamada; pegar una clave la configura y activa la participación,
desbloqueando la pantalla. Primero se comprueba en el cliente el formato (`omr_` + 40 caracteres hexadecimales)
mediante la función auxiliar compartida `isValidSupporterKeyFormat()` (`src/lib/radar/supporterKey.ts`)
como mejora de la experiencia de usuario; en cualquier caso, el esquema Zod del servidor es la comprobación definitiva. Una vez
configurada una clave, la pantalla de activación muestra la versión enmascarada (`supporterKeyMasked` de
`GET /api/radar/settings`) en lugar de un campo vacío, con un control para "cambiar la clave" que permite
pegar una nueva; la clave sin procesar nunca vuelve a mostrarse. Los dos botones anteriores para reclamar/ver los planes
siguen siendo la forma de _obtener_ una clave inicialmente; este campo es donde la activa un operador
que ya dispone de una.

### Activación de extremo a extremo y configuración guiada

El servicio privado de fuentes y este cliente OSS tienen una frontera deliberadamente limitada: el servicio
emite y valida la clave de colaborador, mientras que la instalación local de OmniRoute cifra la clave,
sincroniza los artefactos firmados en el servidor y guía la configuración del proveedor. El orden de validación asistida es:

1. Obtén una clave recién emitida o recuperada desde la reclamación del colaborador, los planes/pago, el
   proceso de recuperación o un operador autorizado de un servidor privado. No pegues la clave sin procesar en registros,
   capturas de pantalla, comentarios de incidencias ni argumentos de línea de comandos.
2. Habilita la bandera de funcionalidad `RADAR_ENABLED` en la instalación local de OmniRoute. Esto habilita la interfaz de usuario,
   pero permanece inactivo en la red hasta que se guarde la suscripción voluntaria por separado.
3. Abre `/dashboard/radar`, pega la clave y actívala. El navegador envía una única solicitud local
   `POST /api/radar/settings` con `{ optIn: true, supporterKey }`; la clave se cifra localmente y
   la respuesta contiene únicamente `omr_****<last4>`.
4. Deja que la pantalla de activación ejecute la sincronización del catálogo o selecciona **Sincronizar ahora**. Confirma que la página
   muestre `live`, una versión del feed y una hora de obtención. Para realizar un diagnóstico local autenticado,
   `GET /api/radar/status` informa sobre la suscripción voluntaria y la presencia de la clave, así como sobre los cuatro estados de la caché, sin devolver
   la clave. `POST /api/radar/sync-all` puede actualizar explícitamente el catálogo, las referencias, las ofertas e Intel.
5. Abre `/dashboard/radar/setup?provider=<provider>`. Sigue la URL de credenciales gestionada por el proveedor,
   selecciona **Añadir clave de API**, guarda mediante el formulario real del proveedor, vuelve a la guía y ejecuta
   **Probar conexión**. La guía utiliza las rutas normales `/api/providers` y
   `/api/providers/<connection-id>/test`; no crea una credencial paralela de Radar.
6. Abre `/dashboard/radar/combos` cuando haya al menos dos conexiones de proveedores compatibles activas.
   Revisa la familia sugerida y crea la combinación mediante la API de combinaciones existente. Las ofertas e
   Intel permanecen como cachés firmadas independientes disponibles únicamente en vivo y pueden consultarse en sus páginas específicas de Radar.
7. Vuelve a cargar `/dashboard/radar` y la página de configuración. La suscripción voluntaria, el estado de la clave enmascarada, la caché verificada, la conexión
   del proveedor guardada y la acción de prueba deben persistir tras la recarga. Captura pruebas únicamente después de que
   la clave sin procesar y la credencial del proveedor ya no sean visibles.

Guardar una clave no demuestra por sí mismo que exista un derecho de acceso activo. La prueba es la combinación del resultado de
`GET /v1/license/check` del servicio privado, el nivel `live` proporcionado por el catálogo OSS, una caché firmada
verificada y el flujo real de conexión/prueba del proveedor. Una clave no válida, caducada o revocada
degrada de forma segura el catálogo a `community`; no debe informarse como una validación correcta de una clave activa.

### Enlace al panel de administración privado

`RADAR_ADMIN_URL` añade opcionalmente **Administración de Radar ↗** inmediatamente después del elemento de Radar orientado
al usuario en la sección Costes de la barra lateral. Deliberadamente, no tiene ningún valor predeterminado: cuando la variable no está
definida o no es válida, la barra lateral estática, la paleta de comandos y la pantalla de personalización de la barra lateral no contienen
ningún elemento de administración ni ninguna URL privada.

El valor se resuelve en el servidor y se transmite mediante la respuesta
`GET /api/settings`, autenticada para la administración, únicamente a una sesión autenticada del panel, o al propietario
de loopback de confianza durante un arranque local sin inicio de sesión. La autenticación mediante CLI, servicio interno y clave de API
con ámbito de administración no lo recibe. El navegador vuelve a validar la respuesta antes de materializar
el enlace externo, que se abre con `noopener noreferrer`.

Utiliza una URL HTTPS de túnel/tailnet sin credenciales. HTTP sin cifrar se acepta únicamente para un reenvío SSH
de loopback, como `http://127.0.0.1:9351`; otros esquemas, las credenciales incrustadas, las URL con formato incorrecto y
los destinos HTTP remotos fallan de forma segura y dejan la navegación inactiva.

---

## Modelo de seguridad

### Firma Ed25519 sobre los bytes exactos

El payload del feed está firmado con Ed25519. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) verifica la firma sobre los **bytes exactos de la respuesta**
recibidos a través de la red; el payload nunca se vuelve a serializar antes de la verificación, por lo que una
recodificación byte por byte no puede invalidar ni eludir silenciosamente la comprobación de la firma.
Un fallo de verificación (`invalid_signature`) cancela la sincronización antes de que el payload llegue a
analizarse o almacenarse en caché.

### Clave pública fijada + rotación

La clave pública de verificación está fijada en `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`), un array que permite anteponer una clave nueva antes de una
rotación, mientras que los feeds antiguos almacenados en caché y firmados con una clave anterior siguen siendo válidos hasta que
se vuelvan a sincronizar.

### Sobrescrituras mediante variables de entorno compatibles con forks

Dos variables de entorno permiten que los forks y las instalaciones autoalojadas dirijan el cliente a su propio feed en lugar de
al servicio OmniRoute predeterminado; consulte
[Cómo autoalojar un feed](#cómo-autoalojar-un-feed) más abajo:

| Variable            | Propósito                                                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `RADAR_FEED_URL`    | Sobrescribe la URL base del feed (valor predeterminado: `https://radar.omniroute.online`).                            |
| `RADAR_FEED_PUBKEY` | Sobrescribe la clave pública fijada (SPKI DER en base64 o PEM), sustituyendo el array integrado por esta única clave. |

### Versión mínima

`syncRadar()` rechaza un feed descargado cuya `version` no sea estrictamente más reciente que la
versión almacenada actualmente en caché (comparación de `YYYY.MM.DD.n` con puntos mediante `compareVersions()`);
devuelve `{ status: "stale" }`. Esto impide que un endpoint de feed comprometido o mal configurado
revierta un cliente a un payload más antiguo firmado de forma diferente.

### Dos fechas y por qué se conservan ambas

Un feed almacenado en caché contiene dos fechas distintas, y evitar confundirlas es precisamente el motivo de
conservar ambas:

| Campo         | Procede de                   | Indica                                   |
| ------------- | ---------------------------- | ---------------------------------------- |
| `generatedAt` | el cuerpo firmado del feed   | la antigüedad de los **datos**           |
| `fetchedAt`   | el reloj de esta instalación | cuándo esta instalación los **descargó** |

Un feed descargado hace unos minutos puede contener cifras de hace semanas, por lo que `fetchedAt` por sí solo no permite
que un operador determine si la superposición es más reciente que la línea base sobre la que se aplica. Ambas fechas
se conservan en `radar_feed_cache`, se devuelven mediante `getRadarCatalog().meta` y se muestran
por separado en `GET /api/radar/status`. Una fila almacenada en caché antes de que existiera la columna `generated_at`
(migración 163) se recupera como `null`: lo desconocido sigue siendo desconocido, en lugar de
tomar prestada la hora de descarga. `radar_referrals_cache` conserva su propio `generated_at` desde
la migración 142.

La versión mínima anterior compara `version`, no ninguna de las dos fechas.

Quedan dos carencias, ambas deliberadas: el panel todavía muestra únicamente `Last fetched`, por lo que mostrar
allí la fecha de generación requiere una etiqueta nueva (y sus 41 entradas de configuración regional); además, las cachés de ofertas e inteligencia
no conservan ninguna fecha de generación, aunque los esquemas de sus feeds incluyen una. Por ello, `GET
/api/radar/status` omite el campo para esas dos cachés en lugar de devolver un valor `null`
que se interpretaría como «desconocido».

### Validación del esquema

Los bytes descargados se analizan y validan con `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, un esquema de Zod) **después** de verificar la firma. Una
discrepancia con el esquema devuelve `{ status: "invalid_schema" }` y la caché permanece
intacta. Además, como medida defensiva, el payload almacenado en caché se vuelve a validar en cada lectura
(`getRadarCatalog()`): si una fila de la caché está dañada o se ha editado manualmente, se recurre a la
línea base en lugar de servirla.

### Límite de tamaño de la respuesta (10 MB)

`syncRadar()` aplica un **límite estricto de 10 MB** al cuerpo de la respuesta del feed: el feed
firmado es un documento JSON de apenas unos KB, por lo que cualquier tamaño superior indica un `RADAR_FEED_URL`
mal configurado o malicioso (o un servidor upstream que devuelve contenido basura), no un catálogo legítimo.
La aplicación del límite se realiza en dos niveles:

1. Una comprobación previa de `Content-Length` evita por completo la lectura del cuerpo cuando el
   encabezado ya declara un valor superior al límite.
2. Una comprobación del total acumulado durante la lectura del cuerpo aplica el límite incluso cuando
   `Content-Length` no está presente o declara un tamaño inferior al real: nunca se confía únicamente
   en el encabezado. La concatenación de los fragmentos acumulados conserva los bytes exactos
   necesarios para comprobar después la firma Ed25519.

Superar el límite devuelve `{ status: "too_large" }` y deja la caché intacta,
siguiendo el mismo patrón no destructivo que cualquier otro fallo de sincronización
(`invalid_signature`, `invalid_schema`, `stale`).

---

## Niveles: `community` y `live`

El esquema del feed contiene un campo `tier: "community" | "live"`, decidido **en el servidor**
por el servicio del feed en función de la solicitud (presencia y validez de la clave de colaborador)
— el cliente nunca decide su propio nivel.

- **`community`** — el catálogo gratuito, con un retraso aproximado de 30 días respecto a los datos
  más recientes. Es lo que recibe una solicitud no autenticada o con una clave no válida.
- **`live`** — el catálogo más reciente, servido a las solicitudes que incluyen una clave de
  colaborador válida.

**Una clave de colaborador no válida o caducada pasa a `community`; nunca es un
error.** La ruta de sincronización solo distingue los fallos de firma/esquema/versión (todos
recuperables y no fatales para el estado almacenado en caché) de una respuesta correcta `{ status:
"updated", version, tier }`. No existe una ruta de error específica de un nivel que el cliente deba
gestionar.

### El nivel servido procede de una cabecera de respuesta, no del cuerpo firmado

El campo `tier` del **cuerpo** firmado del feed siempre es `"live"` — el servicio del feed publica
**dos artefactos firmados por versión**: live incluye las campañas actuales y community
las omite. Cada artefacto se firma sobre sus propios bytes exactos. El cuerpo sigue sin
servir como decisión de autorización; el nivel realmente seleccionado para una solicitud se indica
en la **cabecera de respuesta `x-omniroute-feed-tier`**, decidida en el servidor a partir de la clave
`Authorization` de la solicitud.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) es el único lugar
que determina el nivel en el que debe confiar un cliente:

1. Analizar `x-omniroute-feed-tier` con `RadarTierSchema` (Zod) — una cabecera ausente o
   un valor que no sea exactamente `"community"` o `"live"` se trata como **no
   presente** (nunca se incorpora tal cual y como valor de confianza a la caché/interfaz; esto también cubre servidores
   de feeds antiguos anteriores a la cabecera).
2. Recurrir al campo `tier` del cuerpo firmado (siempre `"live"`) solo cuando el paso 1
   no produce ningún resultado.
3. El nivel resuelto es el que se almacena en caché y se devuelve como `{ status: "updated",
version, tier }` — este es el valor que muestra el panel, nunca el campo sin procesar del
   cuerpo.

---

## Reglas de combinación de la superposición en tiempo de lectura

`applyFeed()` (`src/lib/radar/applyFeed.ts`) combina el feed almacenado en caché **sobre** la
base estática en **tiempo de lectura**, dentro de `getRadarCatalog()`. El array base
(`FREE_MODEL_BUDGETS`) nunca se modifica — se calcula un `MergedEntry[]` nuevo en cada
llamada.

Cuatro reglas, en orden de precedencia:

1. **El feed nunca sobrescribe una modificación local.** Campo por campo: si el operador ha
   personalizado un campo de una entrada (mapa `localOverrides`, indexado por `provider:modelId`),
   se omite el valor del feed para ese campo específico — prevalece el valor del operador.
2. **`enabled: false` deshabilita la entrada, conservando la procedencia.** Una entrada del feed que
   desactiva una entrada establece `enabled: false` y `disabledBy: "radar"` en el resultado combinado,
   de modo que la interfaz pueda explicar _por qué_ una entrada pasó de estar disponible a estar deshabilitada.
3. **Una entrada añadida por el usuario que no está presente en el feed permanece intacta.** Las entradas que
   solo existen en la base (o se añadieron localmente) y no tienen una entrada correspondiente en el feed
   pasan sin cambios.
4. **Una entrada marcada con una lápida nunca se restablece.** Si el operador eliminó explícitamente una
   entrada (conjunto `tombstones`), que el feed vuelva a añadir ese `provider:modelId` en una versión
   posterior no hace que reaparezca.

Los campos editables y las lápidas se conservan en
`radar_local_model_state` (migración `153_radar_local_model_state.sql`). El adaptador público de la BD
(`src/lib/db/radar.ts`) convierte esas filas en el mapa `localOverrides` y el conjunto
`tombstones` que utiliza `applyFeed()`; en producción, `getRadarCatalog()` carga ese estado
después de superar las comprobaciones de indicador, caché y esquema. Solo `displayName` y `enabled` son
editables por el operador. La identidad del proveedor/modelo, la procedencia del feed, la cuota, las capacidades, los TdS
y los datos de configuración no pueden escribirse mediante esta interfaz.

El panel ofrece cuatro acciones locales:

- **Editar** cambia el nombre mostrado localmente y el estado de activación.
- **Restablecer cambios locales** borra ambos campos editables sin modificar una lápida.
- **Ocultar** crea una lápida, para que las actualizaciones posteriores del feed no puedan volver a crear la fila.
- **Restaurar** elimina la lápida; cualquier modificación guardada por separado sigue vigente.

Un `enabled: false` del feed sigue siendo la excepción de seguridad: prevalece sobre un
`enabled: true` local obsoleto, mantiene deshabilitada la entrada combinada y registra `disabledBy: "radar"`.

Las publicaciones del catálogo utilizan `schemaVersion: 2`. `contextWindow` y cada uno de `tools`, `vision` y
`thinking` son, de forma independiente, `number | null` / `boolean | null`: `null` significa desconocido, mientras que
`false` significa que una fuente oficial del proveedor confirmada mediante D16 indica explícitamente que la capacidad está ausente.
Los indicadores internos del registro/especificación de modelos de OmniRoute nunca se promueven directamente a hechos del feed. El cliente
sigue aceptando instantáneas v1; como el generador antiguo utilizaba `false` como marcador de ausencia, un `false` de v1 se
normaliza como desconocido, mientras que un `true` de v1 sigue siendo un hecho. Las versiones de esquema desconocidas fallan de forma segura y la
última caché válida sigue disponible. Cada modelo v2 con un contexto/capacidad no nulo debe incluir
un `metadataEvidenceUrls[]` HTTPS que no requiera credenciales; de lo contrario, la validación del esquema falla y la caché no se
reemplaza. La tabla del catálogo representa los tres estados como `✓`, `✕` y `?`.

### Combinaciones guiadas y acceso MCP

Los valores `familyId` confirmados se conservan tras la superposición en tiempo de lectura y controlan el módulo puro
`buildRadarComboSuggestions()` (`src/lib/radar/comboSuggestions.ts`). Una familia solo se sugiere
cuando al menos dos proveedores distintos tienen conexiones activas y ofrecen el ID exacto del modelo seleccionado.
Los modelos deshabilitados, los proveedores inactivos, los IDs de modelo ausentes, las familias con un único miembro y las
coincidencias ambiguas de alias/prefijos fallan de forma segura. Las sugerencias utilizan la estrategia `priority` existente, ordenando
primero el mayor presupuesto mensual recurrente; la interfaz solo las crea mediante `POST /api/combos`.

La interfaz de usuario guiada se encuentra en `/dashboard/radar/combos`. Solo lee los endpoints locales
`GET /api/radar/catalog` y `GET /api/combos/builder/options`. Nunca activa la sincronización de Radar,
lee credenciales de proveedores ni escribe directamente en la base de datos de combos.

Los clientes MCP pueden leer la misma proyección local con `omniroute_radar_catalog` (`read:radar`). Los
filtros opcionales `provider`, `familyId` y `enabledOnly` se evalúan después de una lectura local de
`GET /api/radar/catalog`. Su salida cerrada incluye los metadatos del catálogo, así como proveedor/modelo,
nombre para mostrar, `familyId`, cuota, capacidades, estado habilitado, origen y `disabledBy`; nunca se
devuelven URLs de configuración, pasos, conexiones, direcciones de correo electrónico, claves ni datos de
referencia. Esta herramienta es de solo lectura y nunca invoca `/api/radar/sync`.

### Marcadores de procedencia

Cada entrada combinada incluye un campo `origin` que la interfaz de usuario muestra como una insignia:

- `"baseline"` — sin cambios respecto al catálogo estático de la versión.
- `"radar"` — uno o más campos fueron actualizados por el feed.
- `"local"` — el operador tiene al menos una sobrescritura local en esta entrada (las
  sobrescrituras locales siempre prevalecen sobre el feed según la regla 1, independientemente de lo que indique el feed).

---

## Superficies locales — nunca un proxy del feed

Las siguientes familias de rutas locales de Radar respaldan la interfaz de usuario en `src/app/api/radar/`:

| Ruta                           | Método | Propósito                                                                                                                       |
| ------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | Devuelve el catálogo combinado (`getRadarCatalog()`) desde la caché local.                                                      |
| `/api/radar/sync`              | POST   | Activa `syncRadar()` en el servidor; devuelve el estado resultante.                                                             |
| `/api/radar/settings`          | GET    | Devuelve `{ optIn, hasSupporterKey, supporterKeyMasked }`; nunca la clave sin enmascarar.                                       |
| `/api/radar/settings`          | POST   | Establece la participación voluntaria y/o la clave de colaborador (cifrada).                                                    |
| `/api/radar/referrals`         | GET    | Devuelve `{ fixed, campaigns, tier }` desde la caché local; consulte [Enlaces de referido](#referral-links-free-credits) abajo. |
| `/api/radar/offers`            | GET    | Devuelve ofertas activas desde la caché local en vivo verificada; nunca devuelve la clave de colaborador.                       |
| `/api/radar/offers/sync`       | POST   | Activa el proceso `syncRadarOffers()` en el servidor, exclusivamente con la clave en vivo.                                      |
| `/api/radar/intel`             | GET    | Devuelve Intel local en vivo verificado y un booleano de reconocimiento de colaborador; nunca una identidad ni una clave.       |
| `/api/radar/intel/sync`        | POST   | Activa el proceso `syncRadarIntel()` en el servidor, exclusivamente con la clave en vivo.                                       |
| `/api/radar/status`            | GET    | Devuelve el estado local de solo lectura de la configuración/caché del catálogo, referidos, ofertas e Intel, sin secretos.      |
| `/api/radar/sync-all`          | POST   | Ejecuta los cuatro módulos de sincronización en el servidor y devuelve un estado independiente para cada feed.                  |
| `/api/radar/local-model-state` | GET    | Enumera las anulaciones persistentes y los marcadores de eliminación para los controles de edición/restauración.                |
| `/api/radar/local-model-state` | PATCH  | Establece o borra los campos de anulación validados `displayName`/`enabled`.                                                    |
| `/api/radar/local-model-state` | PUT    | Crea o elimina un marcador de eliminación con `{ provider, modelId, tombstoned }`.                                              |
| `/api/radar/local-model-state` | DELETE | Borra los campos de anulación editables y conserva cualquier marcador de eliminación.                                           |

**Regla estricta: estas rutas nunca actúan como proxy del servicio de feeds.** El navegador solo se comunica
con el servidor local de OmniRoute. Los cuatro módulos que se comunican con el servicio Radar son
`src/lib/radar/sync.ts` (catálogo), `src/lib/radar/referralsSync.ts` (referidos) y
`src/lib/radar/offersSync.ts` (ofertas), además de `src/lib/radar/intelSync.ts` (Intel); todos se ejecutan
en el servidor, nunca en el cliente. Esto mantiene
la URL del feed y cualquier clave de colaborador completamente fuera del tráfico de red de cara al cliente.

Todos los endpoints de Radar devuelven `404` cuando `RADAR_ENABLED` está desactivado (consulte
[Indicador](#flag-radar_enabled-default-off) arriba) y procesan las respuestas de error mediante
`buildErrorBody()`/`sanitizeErrorMessage()` de acuerdo con la regla de saneamiento de errores de todo el repositorio
(`docs/security/ERROR_SANITIZATION.md`).

### Autenticación

Todos los endpoints de Radar requieren autenticación mediante `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`): una cookie de sesión del panel o una clave de API con alcance
de administración, la misma barrera que protege el resto de `/api/settings/*`. La comprobación
de `404` por indicador desactivado siempre se ejecuta **antes** que la comprobación de autenticación,
por lo que una instalación con `RADAR_ENABLED` desactivado permanece idéntica byte por byte (sin solicitar
autenticación solo para descubrir que la superficie no existe); una vez activado el indicador, una solicitud
no autenticada recibe `401` antes de cualquier lectura o escritura en la base de datos.
`GET /api/radar/settings` nunca devuelve la clave de colaborador sin enmascarar, independientemente
del estado de autenticación; solo devuelve la forma enmascarada y un booleano `hasSupporterKey`.

---

## Ofertas para colaboradores

Las ofertas utilizan su propio artefacto firmado, `GET /v1/offers/latest`, y nunca comparten la caché del catálogo ni la de referidos. El endpoint del servidor requiere una clave Bearer válida y activa de colaborador; no existe una alternativa para la comunidad. Por lo tanto, `syncRadarOffers()` se detiene antes de acceder a la red cuando la marca de funcionalidad está desactivada, el operador no ha dado su consentimiento o no hay ninguna clave de colaborador configurada.

Después de un GET correcto, el cliente verifica la firma Ed25519 sobre los bytes exactos de la respuesta, valida `RadarOffersFeedSchema`, exige que tanto el cuerpo firmado como el encabezado `x-omniroute-feed-tier` indiquen `live`, aplica una versión con puntos estrictamente más reciente y, solo entonces, reemplaza atómicamente `radar_offers_cache` (migración `144_radar_offers_cache.sql`). Se aplica el mismo límite de 10 MB para encabezados y flujo utilizado por los demás feeds. Los fallos de firma, esquema, nivel, repetición, tamaño, HTTP y red conservan la última caché verificada.

El formato cerrado de las ofertas admite tres tipos de beneficios comparables: porcentaje en puntos básicos, crédito en unidades monetarias menores o días de prueba. Una oferta de un socio debe incluir una referencia pública del mismo tipo y su beneficio debe ser estrictamente superior; las ofertas oficiales no tienen una referencia de socio. Las URL deben usar HTTPS y no contener credenciales. `getRadarOffers()` vuelve a validar de forma preventiva la carga útil almacenada en caché y filtra las entradas vencidas en cada lectura local; `/dashboard/radar/offers` vuelve a filtrar las ofertas vencidas antes de renderizarlas, utiliza texto en portugués cuando está disponible, con el inglés como alternativa, y etiqueta explícitamente las ofertas de socios.

El navegador solo llama a rutas locales: lee la instantánea enmascarada de la configuración, solicita a `POST /api/radar/offers/sync` que actualice los datos en el servidor y, después, lee `GET /api/radar/offers`. Si no hay una clave, muestra los enlaces existentes para colaboradores y de soporte en lugar de intentar realizar una solicitud al feed. Los enlaces externos de las ofertas se abren en una pestaña nueva con `noopener noreferrer`. En esta versión no se expone ninguna herramienta MCP `radar_offers`.

---

## Radar Intel, insignia de colaborador y CLI

Intel es un artefacto firmado disponible en `GET /v1/intel/latest`. El esquema cerrado `RadarIntelFeedSchema` solo acepta clasificaciones ELO propiedad de Radar, derivadas por el curador privado a partir de comparaciones confirmadas, y diferencias objetivas de antigüedad y cantidad del catálogo derivadas de instantáneas firmadas del catálogo. La metodología se fija en una puntuación inicial de 1000 y K=32. Una clasificación vacía es válida cuando no se ha confirmado ninguna comparación; el cliente nunca genera una de forma sintética.

`syncRadarIntel()` aplica el mismo Bearer del lado del servidor, tiempo de espera de 30 segundos, límite de transmisión de 10 MiB, verificación Ed25519 de los bytes exactos, esquema estricto, requisito de `live` en el cuerpo y el encabezado, versión mínima y conservación de la última caché válida que las ofertas. Después de conservar una instantánea activa verificada, el cliente deriva `radar:<sha256(supporter key)>`, almacena únicamente esa identidad unidireccional y emite el evento de reconocimiento específico `radar_supporter`. Su insignia `radar-supporter` es idempotente y otorga cero XP; nunca actualiza las tablas de clasificación ni reutiliza `token_share`. `/dashboard/radar/intel` renderiza la insignia únicamente a partir de metadatos verificados de la caché local.

La CLI expone `omniroute radar status` y `omniroute radar sync`. Ambos se comunican únicamente con la API local de OmniRoute. `status` realiza una solicitud de solo lectura `GET /api/radar/status`; `sync` envía una solicitud `POST /api/radar/sync-all` e imprime un resultado por cada feed. Ninguno de los comandos lee, acepta ni imprime la clave de colaborador, y ninguno se comunica directamente con el servicio Radar.

---

## Enlaces de referidos (créditos gratuitos)

Los enlaces de referidos se sirven desde un feed **independiente y siempre actualizado** —
`GET /v1/referrals/latest` — separado del feed del catálogo. Esto es deliberado: el
feed del catálogo del nivel community es una instantánea que puede tener hasta 30 días
de antigüedad, por lo que un enlace de referido extraído de él solía ir por detrás de la
lista real de enlaces del servidor durante el mismo periodo (un referido recién añadido
podía tardar hasta un mes en llegar a un usuario gratuito/community). El feed de referidos
elimina ese retraso al sincronizarse con su propia cadencia, mucho más corta.

```ts
// Cuerpo de la respuesta de GET /v1/referrals/latest (firmado con Ed25519, con la misma
// clave fijada que el feed del catálogo):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — determinista: max(updatedAt) entre los enlaces
                                  // de referidos, por lo que dos solicitudes idénticas producen
                                  // exactamente los mismos bytes firmados/la misma firma
  referrals: {
    fixed: RadarReferral[],      // presente en TODOS los niveles, incluidos sin autenticación/community
    campaigns: RadarReferral[],  // solo se rellena para una clave Bearer válida y activa
                                  // (supporter); las solicitudes sin autenticación/con clave caducada reciben []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

A diferencia del feed del catálogo, este cuerpo no contiene ningún campo `tier` — el
servidor decide qué incluir en cada solicitud según la clave `Authorization`, por lo
que el encabezado de respuesta `x-omniroute-feed-tier` es la ÚNICA fuente del nivel
servido (`referralsSync.ts::syncRadarReferrals`); un encabezado ausente/no reconocido
se degrada a `"community"`, la suposición con menos privilegios.
`RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`) valida el cuerpo
completo y reutiliza el mismo `RadarReferralSchema` por referido exportado desde
`feedSchema.ts`, de modo que ambos feeds validan los referidos individuales de forma
idéntica. Cada `RadarReferral.url` debe usar `https://` — una URL con `http://` no
supera la validación del esquema.

El ANTIGUO campo `referrals` integrado en el catálogo de `RadarFeedSchema`
(`feedSchema.ts`) se conserva por compatibilidad con versiones anteriores de feeds del
catálogo que ya estén almacenados en caché, pero `getRadarReferrals()` ya no lo lee —
consulta [Acceso](#accessor) a continuación.

### Sincronización

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) es el ÚNICO módulo que accede
a la red para obtener referidos y replica exactamente el contrato de `syncRadar()`:
indicador desactivado → `disabled`; participación desactivada → `opt_out`; descarga
`${RADAR_FEED_URL}/v1/referrals/latest` (con las mismas sustituciones
`RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` para forks que el catálogo), verifica la firma
Ed25519 sobre los bytes exactos de la respuesta (`verifyFeedBytes`), valida mediante
`RadarReferralsFeedSchema` y almacena los datos en caché en la tabla
`radar_referrals_cache` (migración `142_radar_referrals_cache.sql`) — una tabla
completamente separada de `radar_feed_cache`, la caché del catálogo. Un límite de
respuesta de 10 MB y un límite inferior para `generatedAt` rechazan cualquier feed
entrante más antiguo que el almacenado en caché, lo que protege frente a la reproducción
de un artefacto firmado anterior. Se acepta una marca de tiempo igual: el servidor asigna
intencionadamente el mismo `generatedAt` determinista a las variantes community y live
de los referidos, por lo que la carga firmada y el nivel servido pueden cambiar tras un
cambio en la clave de supporter sin que cambie el conjunto subyacente de enlaces. Nunca
lanza excepciones — siempre devuelve un objeto de estado; los errores nunca incluyen un
seguimiento de pila en `reason`.

Dos desencadenadores mantienen actualizada la caché de referidos, ambos independientes
de la cadencia propia de 24 h del catálogo:

- **Sincronización al leer** — el propio `GET /api/radar/referrals` llama a
  `syncRadarReferrals()` en línea siempre que no exista la caché o que tenga más de
  `REFERRALS_STALE_MS` (1 h, `shouldSyncReferralsOnRead()`), antes de servir la
  respuesta. Esto es lo que hace que los enlaces fijos estén «siempre actualizados» para
  la siguiente carga del panel, sin esperar a ningún temporizador en segundo plano.
- **Sincronización secundaria del planificador** — `radarSchedulerTick()`
  (`scheduler.ts`) evalúa de forma independiente la obsolescencia de los referidos en el
  mismo ciclo horario utilizado para el catálogo y llama a `syncRadarReferrals()` cuando
  corresponde. Esto se ejecuta independientemente de si el catálogo debía sincronizarse
  en ese ciclo y nunca afecta a la estructura de `RadarTickResult` (solo es un efecto
  secundario de mejor esfuerzo cuyos errores se omiten).

### Acceso

`src/lib/radar/index.ts` exporta dos métodos de acceso de solo lectura, ninguno de los
cuales lanza excepciones (el mismo contrato defensivo que `getRadarCatalog()` — si el
indicador está desactivado, no hay caché o la carga almacenada en caché está dañada,
todos esos casos devuelven la estructura vacía en lugar de un error):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  lee desde `radar_referrals_cache` (mediante `getRadarReferralsCache()`) y valida a
  través de `RadarReferralsFeedSchema` — **no** desde la caché del catálogo.
- `getDefaultReferralFor(provider)` → el referido `fixed` con `isDefault: true` para
  ese proveedor, o `null`. Solo consulta `fixed` — una campaña nunca se utiliza como
  enlace «predeterminado» de un proveedor.

La regla real que determina «qué referido es el predeterminado para un proveedor» se
encuentra en `findDefaultReferral()` (`src/lib/radar/referrals.ts`), una pequeña función
pura **sin ninguna importación de la base de datos** — es seguro importarla en un
componente `"use client"`. `getRadarReferrals`/`getDefaultReferralFor` (en `index.ts`)
incluyen `@/lib/db/radar` y, por tanto, permanecen exclusivamente en el servidor; el
panel de proveedores importa `referrals.ts` directamente en lugar de `index.ts`
(consulta a continuación) para evitar incluir `better-sqlite3` en el paquete del
navegador.

### `GET /api/radar/referrals`

Sigue exactamente el mismo orden de comprobaciones que todas las demás rutas de Radar: `RADAR_ENABLED` desactivado →
`404` (se comprueba primero, inercia idéntica byte por byte); sin autenticar → `401`; de lo contrario,
activa una sincronización al leer (véase arriba) cuando está obsoleto y después devuelve `200` con
`{ fixed, campaigns, tier }` — `tier` procede directamente de la fila de caché (posiblemente recién actualizada)
y es puramente informativo (controla el texto de venta adicional no intrusiva de la interfaz que aparece más abajo). Nunca
actúa directamente como proxy del servidor del feed — el código fuente de la propia ruta no contiene ninguna llamada a `fetch(`;
la red solo se utiliza dentro de `syncRadarReferrals()`, siguiendo el mismo
principio de uso exclusivo de la caché local que `/api/radar/catalog`.

### Interfaz del panel — pestaña "Créditos gratis" en `/dashboard/radar`

Reutiliza la página existente de Radar (`src/app/(dashboard)/dashboard/radar/page.tsx`) como una
segunda pestaña en lugar de una ruta nueva — menos superficie de enrutamiento/i18n para una función que es una
variación de los datos que la página ya obtiene. Tras habilitarla, la barra de pestañas ofrece
**Catálogo** (tabla existente) y **Créditos gratis**:

- Los enlaces fijos se agrupan por proveedor; cada uno muestra `requiredAction` (cuando existe)
  y un botón con `target="_blank" rel="noopener noreferrer"` que dirige a la URL de referido.
- Las campañas muestran lo mismo, además de `validUntil` cuando existe.
- Cuando `campaigns` está vacío **y** el nivel servido es `community`, la interfaz muestra una
  breve nota de venta adicional ("las campañas por tiempo limitado son una ventaja para los colaboradores") — esto **nunca**
  oculta ni restringe la lista de enlaces fijos, que permanece completamente disponible para todos los niveles. La
  venta adicional es solo un mensaje discreto, nunca un bloqueo.

### Enlace de referido en el nombre del proveedor (panel de proveedores)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
ya enlazaba el nombre del proveedor con `providerInfo.website` cuando estaba presente, con un
precedente para un enlace monetizado: la nota del enlace de socio de Kimi (Moonshot AI)
(clave de i18n `providers.kimiPartnerLinkNote`). D28 reutiliza exactamente el mismo patrón de nota discreta
para los referidos predeterminados de Radar, en lugar de introducir una clave nueva.

Acoplamiento débil, por diseño:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  es una función **pura** — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — sin dependencias de `@/lib/radar` ni de `@/lib/db/*`. `providerPageUtils.ts` en su
  totalidad permanece libre de esas importaciones (verificado por
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (un componente `"use client"`) es el único lugar autorizado
  para obtener datos de Radar — mediante `fetch("/api/radar/referrals")`, el mismo patrón de ruta local
  que utiliza la propia página del panel de Radar — y calcula el referido predeterminado
  en el cliente con `findDefaultReferral()` desde `src/lib/radar/referrals.ts`, que no depende de la base de datos.
- Con `RADAR_ENABLED` desactivado, la petición devuelve un error 404, `referralUrl` permanece como `null` y
  `resolveProviderHeaderLink()` devuelve el `website` estático del catálogo sin cambios — la
  página del proveedor es idéntica byte por byte a como era antes de que existiera esta función. El mismo resultado se produce cuando
  todavía no hay caché o no existe un referido predeterminado para ese proveedor específico.
- Cuando sí corresponde un referido predeterminado, `ProviderPageHeader` recibe `isReferralLink`
  y muestra la misma nota/ayuda emergente discreta que el enlace de socio de Kimi (reutilizando la
  clave `providers.kimiPartnerLinkNote`) — nunca un tratamiento visual nuevo e independiente.

---

## Cómo autoalojar un feed

Un fork o un usuario que aloje su propia instancia y quiera tener control total sobre el catálogo puede ejecutar su propio servicio de feed sin modificar el código del cliente:

1. Sirva un endpoint `GET /v1/catalog/latest` que devuelva un cuerpo JSON que cumpla con `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`): en el nivel superior, `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`, `quirks` y `totals`. Respete `x-omniroute-radar-schema: 2`; un servidor compatible con la transición debe usar de forma predeterminada un artefacto v1 firmado por separado para las solicitudes que no lo incluyan.
2. Firme los bytes exactos de la respuesta con un par de claves Ed25519 y devuelva la firma en base64 en el encabezado de respuesta `x-omniroute-feed-signature`.
3. Establezca `RADAR_FEED_URL` en la nueva URL base y `RADAR_FEED_PUBKEY` en la clave pública correspondiente (SPKI DER en base64 o PEM); consulte la [referencia de variables de entorno](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Habilite `RADAR_ENABLED` y acepte participar mediante `POST /api/radar/settings` (`{ optIn: true }`).

No se requieren otros cambios en el código: `verifyFeedBytes()` detecta automáticamente la configuración personalizada (`getFeedPublicKeys()` en `src/lib/radar/pinnedKeys.ts`), y la comparación de versiones, la validación del esquema y las reglas de combinación se aplican de forma idéntica a un feed autoalojado.

Los enlaces de recomendación (consulte [Enlaces de recomendación (créditos gratuitos)](#referral-links-free-credits) más arriba) son un artefacto independiente y opcional: un fork que solo sirva `/v1/catalog/latest` seguirá funcionando plenamente; `syncRadarReferrals()` pasa a `{ status: "error" }` cuando recibe un `404` de `/v1/referrals/latest`, y la caché simplemente permanece vacía, por lo que `GET /api/radar/referrals` sigue devolviendo `{ fixed: [], campaigns: [], tier: null }` en lugar de provocar un error en el resto de la página. Para ofrecer también enlaces de recomendación, sirva `GET /v1/referrals/latest` cumpliendo con `RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`) y fírmelo con el mismo par de claves Ed25519 que el feed del catálogo.

Las ofertas para patrocinadores son otro artefacto opcional. Para servirlas, implemente `GET /v1/offers/latest` con el esquema cerrado `RadarOffersFeedSchema` (`src/lib/radar/offersFeedSchema.ts`), exija un derecho de acceso activo, devuelva `x-omniroute-feed-tier: live` y firme los bytes exactos con la misma clave. Un fork que omita este endpoint mantendrá sin cambios el comportamiento del catálogo y las recomendaciones; la actualización de ofertas falla de forma no destructiva y la última caché local de ofertas verificada permanece disponible.

Intel es opcional del mismo modo. Quien aloje su propia instancia puede servir `GET /v1/intel/latest` usando `RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), exigir un derecho de acceso activo, devolver `x-omniroute-feed-tier: live` y firmar los bytes exactos con la clave Ed25519 compartida. Omitir el endpoint no altera el catálogo, las recomendaciones ni las ofertas; la actualización de Intel conserva cualquier última instantánea local verificada.

---

## Documentación relacionada

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — el patrón de respuesta de errores que siguen las rutas `/api/radar/*`.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting) — referencia de `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY`.
