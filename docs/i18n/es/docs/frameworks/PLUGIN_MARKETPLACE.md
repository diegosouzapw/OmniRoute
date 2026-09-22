# Plugin Marketplace (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Fuente de referencia:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` y
> `src/app/(dashboard)/dashboard/plugins/`
> **Última actualización:** 2026-06-28 — v3.8.40

OmniRoute incluye un sistema de plugins al estilo de WordPress. Los plugins son
directorios independientes —cada uno con un manifiesto `plugin.json` y un archivo
de entrada— que se conectan a la canalización de solicitudes (`onRequest` /
`onResponse` / `onError`) y a los eventos del ciclo de vida (`onInstall` /
`onActivate` / `onDeactivate` / `onUninstall`).

El **Marketplace de plugins** es la capa de descubrimiento situada sobre ese
sistema. Ofrece un catálogo navegable de plugins instalables. De forma
predeterminada, el catálogo es un pequeño registro semilla integrado; un operador
puede configurarlo para que use la URL de un registro remoto personalizado, en
cuyo caso la obtención está protegida mediante una defensa contra SSRF que
resuelve DNS (consulte [Seguridad](#security)).

Todas las rutas de plugins son **exclusivas de loopback** (nivel 1 —
`LOCAL_ONLY`): los plugins cargan y ejecutan código en procesos secundarios, por
lo que no se puede acceder a las rutas desde un origen que no sea de loopback,
independientemente de la autenticación. Consulte
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Cómo encaja todo

```
Panel (/dashboard/plugins)
  ├─ Pestaña "Instalados" → GET /api/plugins            (listPlugins)
  │                         POST /api/plugins/scan      (pluginManager.scan)
  │                         POST /api/plugins/{name}/activate|deactivate
  │                         DELETE /api/plugins/{name}   (desinstalar)
  └─ Pestaña "Marketplace" → GET /api/plugins/marketplace
                              → listMarketplacePlugins()
                                ├─ sin URL personalizada → SEED_REGISTRY integrado
                                └─ URL personalizada → protección SSRF isSafeMarketplaceUrl()
                                                     → safeOutboundFetch(guard:"public-only")
```

- **Capa de registro** — `src/lib/plugins/marketplace.ts`: enumera y busca en el
  catálogo, recurriendo al registro semilla ante cualquier fallo.
- **Capa de ciclo de vida** — `src/lib/plugins/manager.ts` (singleton
  `pluginManager`): instalación, actualización, activación, desactivación,
  desinstalación, análisis y carga al iniciar.
- **Capa de manifiesto** — `src/lib/plugins/manifest.ts`: esquema Zod y valores
  predeterminados para `plugin.json`.
- **Escáner** — `src/lib/plugins/scanner.ts`: detecta plugins en el disco dentro
  del directorio de plugins.
- **Cargador** — `src/lib/plugins/loader.ts`: inicia cada plugin en un proceso
  secundario aislado y gestiona las llamadas a los hooks mediante IPC.

## Catálogo del Marketplace

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) devuelve una lista
de objetos `MarketplaceEntry`:

| Campo         | Tipo     | Notas                                             |
| ------------- | -------- | ------------------------------------------------- |
| `name`        | string   | Nombre del plugin en kebab-case                   |
| `version`     | string   | semver                                            |
| `description` | string   | Resumen breve                                     |
| `author`      | string   | Autor/organización                                |
| `license`     | string   | Identificador de licencia de estilo SPDX          |
| `downloadUrl` | string   | URL de descarga de la fuente (puede estar vacía)  |
| `repository`  | string?  | URL opcional del repositorio                      |
| `tags`        | string[] | Etiquetas de búsqueda/filtrado                    |
| `downloads`   | number   | Número de descargas                               |
| `rating`      | number   | 0–5                                               |
| `verified`    | boolean  | Indica si la entrada está marcada como verificada |
| `lastUpdated` | string   | Cadena de fecha en formato similar a ISO          |

Cuando no se configura la URL de un registro personalizado, el catálogo es el
`SEED_REGISTRY` integrado (actualmente `request-logger`, `rate-limiter`,
`cost-tracker` y `theme-manager`). El registro semilla siempre está disponible:
si un registro remoto configurado no está disponible, devuelve un estado que no
es `200` o devuelve un cuerpo no reconocido, `listMarketplacePlugins()` registra
una advertencia y recurre a la lista semilla.

> Nota: el **catálogo** del Marketplace (exploración/búsqueda) está integrado de
> extremo a extremo, pero la **instalación** con un clic desde el catálogo aún no
> está implementada: actualmente, el botón "Instalar" del panel para una entrada
> del Marketplace muestra un aviso de "próximamente". En la actualidad, la
> instalación se realiza mediante el flujo de instalación desde una ruta local
> (`POST /api/plugins`) y la detección en disco (`POST /api/plugins/scan`).

## API REST

Todos los endpoints requieren autenticación de administración (`requireManagementAuth`)
**y** solo son accesibles desde loopback; `/api/plugins` y `/api/plugins/` aparecen en
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Endpoint                         | Método | Descripción                                                       |
| -------------------------------- | ------ | ----------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Enumera los plugins instalados (filtro `?status=` opcional)       |
| `/api/plugins`                   | POST   | Instala un plugin desde una ruta local absoluta                   |
| `/api/plugins/scan`              | POST   | Explora el directorio de plugins y registra plugins nuevos        |
| `/api/plugins/marketplace`       | GET    | Enumera las entradas del catálogo del marketplace                 |
| `/api/plugins/[name]`            | GET    | Obtiene los detalles de un plugin instalado                       |
| `/api/plugins/[name]`            | DELETE | Desinstala un plugin                                              |
| `/api/plugins/[name]/activate`   | POST   | Activa (carga + registra hooks)                                   |
| `/api/plugins/[name]/deactivate` | POST   | Desactiva (ejecuta `onDeactivate`, elimina el registro de hooks)  |
| `/api/plugins/[name]/config`     | GET    | Obtiene la configuración del plugin + su esquema de configuración |
| `/api/plugins/[name]/config`     | PUT    | Actualiza la configuración del plugin (validada según el esquema) |

El filtro `status` de `GET /api/plugins` acepta uno de estos valores:
`installed` / `active` / `inactive` / `error`. Un valor no válido devuelve `400`.

### Enumerar los plugins instalados

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Instalar desde una ruta local

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

La `path` debe ser **absoluta** y no puede contener segmentos transversales `..` ni
bytes nulos (Zod se encarga de hacer cumplir esta restricción). El directorio de origen debe contener un
`plugin.json` válido (o ser el directorio padre de uno). Si la operación se realiza correctamente, la respuesta es `201` e incluye la
fila del plugin instalado.

### Explorar el marketplace

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Actualizar la configuración del plugin

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` valida cada valor proporcionado según el
`configSchema` del plugin (declarado en el manifiesto): los campos `number` respetan `min`/`max`;
los campos `select` deben coincidir con el `enum` declarado. Se permiten las claves que no estén presentes en el esquema.

## Configuración

### Directorio de plugins

Los plugins se encuentran en el directorio de datos de OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (o aquello a lo que apunte manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) resuelve ese directorio en
tres pasos:

1. **`OMNIROUTE_PLUGINS_DIR`**, cuando está definida: se utiliza literalmente, independientemente de lo que indique `HOME`. Este es
   el control explícito para Docker/K8s, donde el árbol de plugins se monta mediante bind mount en una ruta
   que normalmente no tiene ninguna relación con el directorio de inicio del contenedor (#11827).
2. `<home>/.omniroute/plugins`, donde `<home>` se obtiene de las variables de entorno `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, cuando el proceso no exporta ningún directorio de inicio.

El directorio resuelto se registra una vez durante el inicio como `scanner.dir_resolved`, indicando la
entrada seleccionada (`OMNIROUTE_PLUGINS_DIR`, `home` o `no-home-fallback`); de este modo, una imagen
que termina silenciosamente en el paso 3 lo comunica, en lugar de limitarse a informar de una lista de plugins vacía.
`POST /api/plugins/scan` descubre cualquier subdirectorio de esa ubicación que contenga un
`plugin.json` válido y lo registra; ese mismo directorio es la raíz en la que
`pluginManager.install()` copia los plugins, por lo que una sobrescritura mueve conjuntamente el descubrimiento y
la instalación.

> **`OMNIROUTE_PLUGINS_DIR` no es `OMNIROUTE_PLUGIN_PATH`.** Esta última solo es leída por
> el cargador de plugins de comandos de la CLI (`bin/cli/plugins.mjs`) para encontrar paquetes npm
> `omniroute-cmd-*` que añaden subcomandos a `omniroute`; no afecta al escáner en tiempo de ejecución
> descrito aquí. Consulta [PLUGINS.md](./PLUGINS.md) para obtener información sobre ese aspecto.

### URL personalizada del registro del marketplace

El origen del catálogo del marketplace se obtiene del ajuste `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` lee `settings.pluginMarketplaceUrl`). Cuando
se establece en una URL `http(s)`, `listMarketplacePlugins()` obtiene esa URL y acepta
un array JSON de entradas en el nivel superior o un objeto con un array `plugins`;
se filtran las entradas que no tengan un `name` de tipo string. Cuando no está configurada (o cuando la solicitud
no supera la protección SSRF o devuelve una respuesta incorrecta), se utiliza el registro inicial
integrado.

La pestaña "Marketplace" del panel expone un campo para esta URL (que vuelve a leerse mediante
`GET /api/settings`).

> Nota de implementación: la acción "Guardar" del panel envía
> `pluginMarketplaceUrl` a `PATCH /api/settings`. En el momento de redactar este documento, esta
> clave no está declarada en `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), por lo que debes verificar la persistencia en tu
> versión antes de depender de ella; la ruta de **lectura** (`getSettings()` →
> `listMarketplacePlugins()`) respeta la clave una vez que está presente en el almacén de
> ajustes.

## Seguridad

### Nivel de ruta — solo loopback

Los plugins ejecutan código en procesos secundarios generados, por lo que toda la
superficie `/api/plugins` está clasificada como `LOCAL_ONLY` (nivel 1). La
restricción de loopback se aplica incondicionalmente **antes** de cualquier
comprobación de autenticación, por lo que un token de administración filtrado que
llegue al equipo a través de un túnel tampoco puede instalar, activar ni desinstalar
un plugin. Consulte [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md)
y las reglas estrictas n.º 15 y n.º 17.

### Protección SSRF del registro del marketplace

Una URL de registro personalizada es una configuración que puede estar influida
por un atacante, por lo que, antes de obtenerla, `listMarketplacePlugins()` la
hace pasar por dos capas:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Rechaza todo lo que no sea `http:` / `https:`.
   - Rechaza hosts literales privados, loopback, link-local o ULA (IPv4 **e**
     IPv6, incluidas las direcciones IPv4 mapeadas) mediante la función canónica
     `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Resuelve registros `A` y `AAAA` y rechaza la URL si **alguna** dirección
     resuelta es privada, lo que bloquea la evasión mediante nombre de host
     público → IP privada.
   - **Falla de forma segura**: un error de resolución DNS provoca el rechazo de
     la URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): vuelve a aplicar la protección de
   URL solo pública en el momento de la solicitud y **bloquea las redirecciones**
   (sin posibilidad de pivotar de una dirección pública a una privada mediante
   `30x`).

Una URL que no supera alguna de las capas no cancela la solicitud: el marketplace
recurre silenciosamente al registro inicial integrado y registra una advertencia.

> Esta protección se reforzó en la PR #3774 específicamente para resolver A +
> AAAA y usar la función canónica `isPrivateHost` en lugar de una comprobación
> exclusiva para IPv4.

### Aislamiento de la ejecución de plugins

- **Aislamiento de procesos** — `loadPlugin()` (`src/lib/plugins/loader.ts`)
  ejecuta cada plugin en un proceso secundario independiente de Node.js y se
  comunica mediante IPC. Las llamadas a hooks tienen un tiempo de espera con
  escalamiento de `SIGTERM` → `SIGKILL`.
- **Lista de variables de entorno permitidas** — el proceso secundario recibe
  únicamente un conjunto permitido de variables de entorno; el conjunto más
  amplio solo se concede cuando el manifiesto solicita el permiso `env`.
- **Contención de rutas** — las operaciones de instalación, actualización y
  desinstalación verifican que el directorio del plugin y `manifest.main` se
  resuelvan **dentro** de la raíz administrada de plugins antes de cualquier
  copia o eliminación recursiva (lo que protege contra rutas de BD manipuladas
  y recorridos `../` en `manifest.main`). La activación resuelve los enlaces
  simbólicos mediante `realpath` y se niega a cargar un punto de entrada que
  escape del directorio del plugin.
- **Fijación de integridad opcional** — un manifiesto puede declarar un campo
  `integrity` (`sha256-<base64>`, formato SRI). Cuando está presente, el cargador
  verifica el hash del archivo de entrada durante la carga y rechaza la
  activación si no coincide. Es un mecanismo opcional de detección de
  manipulaciones, **no** un límite de seguridad: el enrutamiento exclusivo para
  loopback y el modelo de permisos son los verdaderos límites.

## Manifiesto (`plugin.json`)

Validado por `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Campo              | Tipo      | Notas                                                                  |
| ------------------ | --------- | ---------------------------------------------------------------------- |
| `name`             | string    | Obligatorio; kebab-case (`^[a-z0-9-]+$`), entre 1 y 100 caracteres     |
| `version`          | string    | Obligatorio; semver (`MAJOR.MINOR.PATCH`)                              |
| `description`      | string?   | ≤ 500 caracteres                                                       |
| `author`           | string?   | ≤ 200 caracteres                                                       |
| `license`          | string?   | El valor predeterminado es `MIT`                                       |
| `main`             | string?   | Archivo de entrada; el valor predeterminado es `index.js`              |
| `source`           | enum?     | `local` \| `marketplace` (el valor predeterminado es `local`)          |
| `tags`             | string[]? | Etiquetas de búsqueda                                                  |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                        |
| `hooks`            | object?   | Valores booleanos que declaran qué hooks implementa el plugin          |
| `skills`           | object[]? | Definiciones opcionales de habilidades                                 |
| `enabledByDefault` | boolean?  | Activación automática durante la instalación                           |
| `configSchema`     | object?   | Mapa de campos de configuración (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Fijación opcional del archivo de entrada mediante `sha256-<base64>`    |

Los permisos se toman de la enumeración
`network` / `file-read` / `file-write` / `env` / `exec`.

## Flujo del ciclo de vida

```
instalar (POST /api/plugins, ruta)
  → escanear/validar el manifiesto → copiar al área de preparación → comprobar que main esté dentro del directorio
  → cambio de nombre atómico a ~/.omniroute/plugins/<name> → insertar fila en la base de datos
  → ejecutar onInstall → si enabledByDefault: activar

activar (POST /api/plugins/{name}/activate)
  → comprobar la contención con realpath → loadPlugin() (iniciar proceso secundario)
  → registrar los hooks declarados → status = "active" → ejecutar onActivate

desactivar (POST /api/plugins/{name}/deactivate)
  → ejecutar onDeactivate (ANTES de anular el registro) → anular el registro de los hooks
  → finalizar el proceso secundario → status = "inactive"

desinstalar (DELETE /api/plugins/{name})
  → desactivar si está activo → ejecutar onUninstall
  → eliminación recursiva con comprobación de contención del directorio del plugin → eliminar fila de la base de datos
```

Volver a ejecutar `install` en un directorio cuya versión del manifiesto sea **estrictamente
más reciente** que la versión instalada realiza una actualización automática (reinstalación limpia; la configuración se restablece
a los valores predeterminados). Se rechaza una versión igual o anterior.

## Base de datos

Tabla `plugins` (migración `076_create_plugins.sql`):

| Columna         | Tipo    | Notas                                                                |
| --------------- | ------- | -------------------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                                 |
| `name`          | TEXT    | Único                                                                |
| `version`       | TEXT    | semver; valor predeterminado `1.0.0`                                 |
| `description`   | TEXT    | Opcional                                                             |
| `author`        | TEXT    | Opcional                                                             |
| `license`       | TEXT    | Valor predeterminado `MIT`                                           |
| `main`          | TEXT    | Archivo de entrada; valor predeterminado `index.js`                  |
| `source`        | TEXT    | Valor predeterminado `local`                                         |
| `tags`          | TEXT    | Array JSON; valor predeterminado `[]`                                |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`                     |
| `enabled`       | INT     | 0/1; valor predeterminado 0                                          |
| `manifest`      | TEXT    | JSON completo del manifiesto                                         |
| `config`        | TEXT    | JSON; valor predeterminado `{}`                                      |
| `config_schema` | TEXT    | JSON; valor predeterminado `{}`                                      |
| `hooks`         | TEXT    | Array JSON de nombres de hooks declarados; valor predeterminado `[]` |
| `permissions`   | TEXT    | Array JSON; valor predeterminado `[]`                                |
| `plugin_dir`    | TEXT    | Directorio de instalación absoluto                                   |
| `error_message` | TEXT    | Se establece cuando `status = "error"`                               |
| `installed_at`  | TEXT    | `datetime('now')`                                                    |
| `updated_at`    | TEXT    | `datetime('now')`                                                    |
| `activated_at`  | TEXT    | Se establece al activar                                              |

Las métricas y los análisis de los plugins se registran en tablas adicionales
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Panel de control

La página del panel de control en `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) proporciona dos pestañas:

- **Instalados** — enumera los plugins instalados con sus hooks declarados, un
  conmutador para activar/desactivar, un botón de desinstalación y una acción «Buscar plugins»
  (`POST /api/plugins/scan`).
- **Marketplace** — muestra el catálogo de `GET /api/plugins/marketplace` con un
  campo para establecer la URL personalizada del registro.

La página de configuración de cada plugin se encuentra en `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Véase también

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  por qué `/api/plugins` solo es accesible desde la interfaz de bucle invertido (Nivel 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — el framework de habilidades relacionado
  (`src/lib/skills/`); los plugins pueden declarar habilidades en su manifiesto
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — integraciones salientes
  basadas en eventos
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  el patrón `buildErrorBody()` que utiliza cada ruta de plugin para las respuestas de error
