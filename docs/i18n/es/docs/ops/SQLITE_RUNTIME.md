# SQLite Runtime Resolution (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute resuelve su controlador de SQLite al iniciarse mediante una cadena de respaldo de 5 pasos:

1. **`better-sqlite3` incluido** (mediante `dependencies` en `package.json`)
   — la opción más rápida, con binario nativo, instalada por `npm install` cuando las herramientas de compilación están disponibles.

2. **`better-sqlite3` instalado en tiempo de ejecución** (en `~/.omniroute/runtime/`)
   — se instala de forma diferida en la primera ejecución **O** mediante `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Valida los bytes mágicos del archivo nativo `.node` (ELF / Mach-O / PE) antes de cargarlo
   para protegerse contra binarios dañados o correspondientes a una plataforma incorrecta.

3. **`node:sqlite`** (biblioteca estándar de Node ≥22.5) — no requiere compilación nativa; se utiliza cuando
   fallan ambas rutas de better-sqlite3. Conjunto de funcionalidades limitado.

4. **`sql.js`** (WASM) — último recurso. Funciona en todas partes, pero es más lento
   y escribe los datos a intervalos en lugar de hacerlo de forma síncrona.

## ¿Por qué esta complejidad?

- **EBUSY en Windows**: `npm install -g omniroute@latest` puede fallar si el archivo
  `better_sqlite3.node` de la versión anterior está bloqueado por un proceso en ejecución. La instalación
  en tiempo de ejecución en `~/.omniroute/runtime/` evita la caché global de npm.
- **Sin herramientas de compilación**: Algunos entornos (Windows corporativo sin VS Build
  Tools, imágenes mínimas de Docker) no pueden compilar `better-sqlite3`. El instalador en tiempo de ejecución
  obtiene un binario precompilado del registro de npm; los controladores de respaldo
  garantizan que OmniRoute pueda iniciarse incluso si esto falla.
- **Sistemas aislados de la red**: Si no se puede acceder al registro de npm, `node:sqlite`
  o `sql.js` garantizan una funcionalidad básica.

## Validación de bytes mágicos

Antes de cargar un archivo `.node` instalado en tiempo de ejecución, OmniRoute lee los primeros 8
bytes y los compara con los valores mágicos conocidos de las plataformas:

| Plataforma            | Bytes (hex)   | Etiqueta    |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS de 64 bits BE   | `FE ED FA CF` | `macho`     |
| macOS de 64 bits LE   | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Si el valor mágico no coincide, el archivo se ignora y el proceso de respaldo continúa con el siguiente paso.

## Comprobación del controlador activo

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Control manual

```bash
# Omitir la preparación posterior a la instalación (para instalaciones rápidas de CI)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Forzar la reinstalación de better-sqlite3 en tiempo de ejecución
rm -rf ~/.omniroute/runtime
omniroute  # se reinstalará en el próximo inicio

# Comprobar qué controlador está activo
omniroute config db-info  # (si el comando de la CLI existe)
```

## Referencia

Implementación:

- `bin/cli/runtime/magicBytes.mjs` — funciones auxiliares para validar los bytes mágicos de los binarios
- `bin/cli/runtime/sqliteRuntime.mjs` — resolución en tiempo de ejecución de 5 pasos + instalador diferido
- `bin/cli/runtime/index.mjs` — orquestador de inicio (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — enlace de npm posterior a la instalación (preparación no fatal)
- `src/lib/db/core.ts` — exportaciones de `ensureDbInitialized()` / `getDriverInfo()`

## Topología de escritor único (sin compatibilidad con HA)

La cadena de controladores de respaldo anterior sigue ejecutándose en **un solo proceso**. Con SQLite
predeterminado, OmniRoute tiene **un único escritor**:

- No conecte dos réplicas de OmniRoute al mismo archivo `storage.sqlite`.
- Un reinicio del contenedor, un despliegue Recreate, una finalización por OOM o un reinicio por HEALTHCHECK interrumpe
  todas las sesiones SSE en curso. No existe drenaje de sesiones en la configuración estándar.
- Una comprobación de actividad del orquestador que considere inactivo un `/healthz` lento finalizará la única
  réplica. Es preferible usar una comprobación de actividad TCP + una comprobación de disponibilidad HTTP `/healthz`. Consulte la
  [Guía de Docker — disponibilidad](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  y las [recomendaciones para sondas de Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
