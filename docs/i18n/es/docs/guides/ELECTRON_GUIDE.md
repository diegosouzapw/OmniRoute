# Electron Desktop Guide (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Fuente de referencia:** espacio de trabajo `electron/`
> **Última actualización:** 2026-06-28 — v3.8.40

OmniRoute incluye una aplicación de escritorio multiplataforma (Windows / macOS / Linux) creada con
**Electron 41** + **electron-builder 26.10**. La aplicación de escritorio inicia el servidor
independiente de Next.js como proceso secundario, dirige una `BrowserWindow` hacia él y añade una
bandeja del sistema, un actualizador automático, un puente IPC y una inicialización de secretos sin configuración.

## Arquitectura

```
┌─────────────────────────────────────────────────────┐
│ Proceso principal de Electron (electron/main.js)    │
│ ├─ Bloqueo de instancia única                       │
│ ├─ Proceso secundario: servidor independiente de    │
│ │   Next.js (iniciado con el entorno Node de        │
│ │   Electron)                                       │
│ ├─ BrowserWindow → http://localhost:PORT            │
│ ├─ Bandeja del sistema + menú contextual            │
│ ├─ Actualización automática mediante                │
│ │  electron-updater                                 │
│ ├─ Política de seguridad de contenido               │
│ │  (cabeceras de sesión)                            │
│ └─ Inicialización de secretos                       │
│    (JWT / API_KEY_SECRET)                           │
└─────────────────────────────────────────────────────┘
            ↕ Puente IPC (electron/preload.js)
┌─────────────────────────────────────────────────────┐
│ Renderizador (panel de Next.js)                     │
│   window.electronAPI.* (contextIsolation)           │
└─────────────────────────────────────────────────────┘
```

## Versiones

Confirmadas en `electron/package.json`:

| Paquete                  | Versión                                                                         |
| ------------------------ | ------------------------------------------------------------------------------- |
| `electron`               | `^43.4.1`                                                                       |
| `electron-builder`       | `^26.15.3`                                                                      |
| `electron-updater`       | `^6.8.9`                                                                        |
| `better-sqlite3`         | raíz `^13.0.2` (binarios de Node-API — no requiere recompilación para Electron) |
| Versión de la aplicación | `3.8.0`                                                                         |
| ID de la aplicación      | `online.omniroute.desktop`                                                      |
| Nombre del producto      | `OmniRoute`                                                                     |

## Scripts (`package.json` raíz)

| Script                            | Propósito                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Inicia `npm run dev`, espera a que `localhost:20128` esté disponible e inicia Electron      |
| `npm run electron:build`          | Compila Next.js y después ejecuta `electron-builder` para el sistema operativo actual       |
| `npm run electron:build:win`      | Crea el instalador NSIS de Windows y la versión portátil (x64)                              |
| `npm run electron:build:mac`      | Crea el DMG de macOS (Intel + Apple Silicon)                                                |
| `npm run electron:build:linux`    | Crea AppImage + DEB para Linux (x64 + arm64)                                                |
| `npm run electron:smoke:packaged` | Inicia el binario empaquetado, comprueba que `/login` devuelva HTTP 200 y después lo cierra |

El espacio de trabajo `electron/` también incluye:

- `npm run prepare:bundle` — ejecuta `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — compilaciones de macOS para una sola arquitectura
- `npm run pack` — compilación únicamente en directorio para pruebas locales (sin instalador)

## Estructura de directorios

```
electron/
├── package.json              # Dependencias de Electron + configuración de electron-builder
├── main.js                   # Proceso principal (24 KB — consulta las anotaciones a continuación)
├── preload.js                # Puente IPC de contextBridge
├── types.d.ts                # Tipos AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Notas dentro del espacio de trabajo
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Salida de electron-builder (ignorada por git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Prepara el paquete .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Prueba de humo posterior a la compilación
```

Tanto `main.js` como `preload.js` son **archivos `.js` CommonJS**, no TypeScript. Los
tipos del lado del renderizador se encuentran en `electron/types.d.ts`.

## Puente IPC (`preload.js`)

El script de precarga expone una API incluida en una lista blanca en `window.electronAPI` mediante `contextBridge`,
con `contextIsolation: true` y `nodeIntegration: false`.

```javascript
const VALID_CHANNELS = {
  invoke: [
    "get-app-info",
    "open-external",
    "get-data-dir",
    "restart-server",
    "check-for-updates",
    "download-update",
    "install-update",
    "get-app-version",
  ],
  send: ["window-minimize", "window-maximize", "window-close"],
  receive: ["server-status", "port-changed", "update-status"],
};
```

Métodos expuestos:

| Llamada del renderizador                                          | Tipo                                       |
| ----------------------------------------------------------------- | ------------------------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                     |
| `openExternal(url)`                                               | invoke                                     |
| `getDataDir()`                                                    | invoke                                     |
| `restartServer()`                                                 | invoke                                     |
| `getAppVersion()`                                                 | invoke                                     |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                     |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                       |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (devuelve una función de limpieza) |

Los auxiliares de recepción devuelven una **función de limpieza** en lugar de depender de
`removeAllListeners`; esto evita la acumulación de listeners cuando los componentes de React
se vuelven a montar.

## Ciclo de vida del servidor

`main.js` inicia el paquete independiente de Next.js directamente con el entorno de ejecución
Node de Electron para evitar incompatibilidades de ABI en módulos nativos con el Node del sistema:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: {
    ...serverEnv,
    PORT,
    NODE_ENV: "production",
    ELECTRON_RUN_AS_NODE: "1",
    NODE_PATH,
  },
  stdio: "pipe",
});
```

Aspectos destacados:

- `waitForServer()` consulta periódicamente la URL durante un máximo de 30 s antes de mostrar la ventana (sin pantalla en blanco durante un inicio en frío).
- `stdio: "pipe"` captura stdout/stderr; las frases que indican que está listo (`Ready` / `listening`) emiten `server-status: running` mediante IPC.
- `before-quit` espera hasta 5 s para una SIGTERM ordenada (punto de control de WAL) y luego envía SIGKILL.
- El selector de puertos de la bandeja (`20128`, `3000`, `8080`) detiene y reinicia el servidor y, a continuación, vuelve a cargar BrowserWindow.

## Inicialización de secretos sin configuración

En el primer inicio, el proceso principal genera automáticamente y guarda los secretos que falten:

| Secreto                  | Origen                                                                                              |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                            |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (se niega a continuar si ya existen credenciales cifradas) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                            |

Se guardan en `<DATA_DIR>/server.env`. `DATA_DIR` se resuelve como:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` o `~/.omniroute`
- macOS: `~/.omniroute`

## Búsqueda del archivo de entorno

Antes de iniciar el servidor, el proceso principal (`getPreferredEnvFilePath()` en
`electron/main.js`) selecciona **un** archivo `.env`: el primero de los siguientes que exista.

1. `$DATA_DIR/.env`, cuando `DATA_DIR` está definido en el entorno con el que se inició la aplicación.
2. `<resolved DATA_DIR>/.env`, utilizando los mismos valores predeterminados anteriores: `%APPDATA%\omniroute\.env` en
   Windows, `$XDG_CONFIG_HOME/omniroute/.env` o `~/.omniroute/.env` en Linux y macOS.
3. `.env` en el directorio de trabajo del proceso.

El proceso principal solo lee ese archivo; los candidatos posteriores no se combinan. A continuación, el entorno
del servidor se crea con esta precedencia (de mayor a menor):

1. El entorno del proceso de Electron (variables heredadas de aquello que inició la aplicación).
2. El archivo `.env` seleccionado.
3. `<DATA_DIR>/server.env` (los secretos de inicialización anteriores).

El entorno del proceso se captura cuando se inicia la aplicación, por lo que una variable de entorno
del sistema o del usuario definida mientras la aplicación está en ejecución (incluso mientras permanece en la bandeja después de cerrar su ventana)
no llega al servidor hasta que la aplicación se cierra por completo y se vuelve a iniciar. Para opciones de configuración en tiempo de ejecución
como `CONTEXT_LENGTH_<PROVIDER>` (consulte
[Variables de entorno: longitud de contexto por proveedor](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)),
es preferible usar el archivo `.env`; después, cierre la aplicación por completo (bandeja, **Salir**) y vuelva a iniciarla.

## Ventana y bandeja

- `BrowserWindow`: 1400×900 (mín. 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, controles de ventana en `{ x: 16, y: 16 }`.
- Windows/Linux: barra de título nativa.
- El botón de cierre minimiza la aplicación a la bandeja; el menú de la bandeja incluye **Abrir OmniRoute**, **Abrir panel** (navegador externo), submenú **Puerto del servidor**, **Buscar actualizaciones** y **Salir**.

## Política de seguridad de contenido

Se establece mediante `session.defaultSession.webRequest.onHeadersReceived`. Directivas destacadas:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- El modo de desarrollo añade `'unsafe-eval'` a `script-src` únicamente

## Actualización automática

Utiliza `electron-updater` con el proveedor de GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Eventos reenviados al proceso de renderizado mediante IPC `update-status`:
  `checking`, `available`, `not-available`, `downloading` (con `percent`), `downloaded`, `error`
- `installUpdate()` detiene el servidor y, a continuación, llama a `autoUpdater.quitAndInstall()`
- Se omite en el modo de desarrollo (`!app.isPackaged`)

## Canalización de compilación

1. `npm run build` → versión independiente de Next.js en `.next/standalone`.
2. `prepare-electron-standalone.mjs` → vuelve a preparar los archivos en `.next/electron-standalone` y reescribe las rutas absolutas dentro de `server.js` + `required-server-files.json` para que el paquete se pueda reubicar.
3. `electron-builder` empaqueta `main.js`, `preload.js`, `node_modules` y `extraResources: { ../.next/electron-standalone → app }`.

### Destinos de compilación

| SO      | Destinos                                      |
| ------- | --------------------------------------------- |
| Windows | Instalador NSIS + versión portátil (x64)      |
| macOS   | DMG (Intel + arm64, arrastrar a Aplicaciones) |
| Linux   | AppImage + DEB (x64 + arm64)                  |

Configuración de NSIS: `oneClick: false`, permite al usuario elegir el directorio de instalación y crea accesos directos en el escritorio y en el menú Inicio.

## Prueba rápida de la compilación empaquetada

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Detecta automáticamente el binario empaquetado en `electron/dist-electron/` para la plataforma actual.
- Se inicia con directorios `HOME`/`APPDATA`/`XDG_*` aislados para no modificar los datos del desarrollador.
- Consulta periódicamente `http://127.0.0.1:20128/login` hasta recibir HTTP 200 en un plazo de 45 s.
- Supervisa stderr/stdout en busca de patrones de errores graves (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, etc.).
- Espera 2 s de ejecución estable después de que el servicio esté listo, envía SIGTERM y espera a que el puerto quede libre.
- En CI, pasa automáticamente `--no-sandbox --disable-gpu` (y `--disable-dev-shm-usage` en Linux).

Variables de entorno de sobrescritura: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Firma de código

`electron/package.json` **no** configura directamente las credenciales de firma. Páselas a `electron-builder` mediante variables de entorno:

### macOS

```bash
export APPLE_ID=<email>
export APPLE_APP_SPECIFIC_PASSWORD=<password>
export APPLE_TEAM_ID=<id>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<cert-password>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<cert-password>
npm run electron:build:win
```

### Linux

La firma de AppImage es opcional; establezca `LINUX_GPG_KEY` si desea firmarlo.

## Distribución

Los artefactos se generan en `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Las versiones se publican en GitHub Releases (`diegosouzapw/OmniRoute`), que también es donde `electron-updater` comprueba si hay nuevas versiones.

## Solución de problemas

| Síntoma                                                                                  | Solución                                                                                                                                                                                       |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` después de una actualización principal de Electron | better-sqlite3 v13 incluye binarios precompilados de Node-API; vuelva a ejecutar `npm install` en la raíz y `prepare:bundle` (este verifica el binario precompilado para la plataforma actual) |
| `ERR_DLOPEN_FAILED` para un módulo nativo                                                | Vuelva a ejecutar `prepare:bundle`; este falla de inmediato cuando falta el binario precompilado de Node-API para la plataforma actual                                                         |
| La ventana aparece en blanco en Linux                                                    | Confirme que el servidor Next.js realmente se haya vinculado a PORT (revise los registros de `[Server]`)                                                                                       |
| La notarización de macOS se bloquea                                                      | Asegúrese de que las variables `APPLE_*` estén exportadas, no solo definidas en `.env`                                                                                                         |
| Advertencia de Windows SmartScreen                                                       | Firme con un certificado EV o indique a los usuarios que hagan clic con el botón derecho → "Ejecutar de todas formas"                                                                          |
| La prueba rápida falla porque el puerto está en uso                                      | Detenga cualquier servidor de desarrollo local que use el puerto 20128 antes de ejecutar `electron:smoke:packaged`                                                                             |

## Véase también

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Código fuente: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Herramientas auxiliares: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
