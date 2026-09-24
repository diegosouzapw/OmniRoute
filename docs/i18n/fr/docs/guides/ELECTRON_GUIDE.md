# Electron Desktop Guide (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Source de référence :** espace de travail `electron/`
> **Dernière mise à jour :** 2026-06-28 — v3.8.40

OmniRoute fournit une application de bureau multiplateforme (Windows / macOS / Linux) basée sur
**Electron 41** + **electron-builder 26.10**. L’application de bureau lance le serveur autonome
Next.js en tant que processus enfant, y connecte une `BrowserWindow` et ajoute une
icône dans la zone de notification, un système de mise à jour automatique, une passerelle IPC et une initialisation sans configuration des secrets.

## Architecture

```
┌──────────────────────────────────────────────┐
│ Processus principal Electron (electron/main.js) │
│ ├─ Verrou d’instance unique                  │
│ ├─ Processus enfant : serveur autonome Next.js │
│ │   (lancé avec l’environnement Node d’Electron) │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Zone de notification + menu contextuel    │
│ ├─ Mise à jour auto. via electron-updater    │
│ ├─ Politique de sécurité du contenu (en-têtes de session) │
│ └─ Initialisation des secrets (JWT / API_KEY_SECRET) │
└──────────────────────────────────────────────┘
            ↕ Passerelle IPC (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Moteur de rendu (tableau de bord Next.js)    │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## Versions

Confirmées à partir de `electron/package.json` :

| Paquet             | Version                                                                               |
| ------------------ | ------------------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                             |
| `electron-builder` | `^26.15.3`                                                                            |
| `electron-updater` | `^6.8.9`                                                                              |
| `better-sqlite3`   | racine `^13.0.2` (binaires Node-API précompilés — aucune recompilation pour Electron) |
| Version de l’app   | `3.8.0`                                                                               |
| ID de l’app        | `online.omniroute.desktop`                                                            |
| Nom du produit     | `OmniRoute`                                                                           |

## Scripts (`package.json` racine)

| Script                            | Objectif                                                                               |
| --------------------------------- | -------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Lance `npm run dev`, attend `localhost:20128`, puis lance Electron                     |
| `npm run electron:build`          | Compile Next.js, puis exécute `electron-builder` pour le système d’exploitation actuel |
| `npm run electron:build:win`      | Crée l’installateur Windows NSIS et la version portable (x64)                          |
| `npm run electron:build:mac`      | Crée le DMG macOS (Intel + Apple Silicon)                                              |
| `npm run electron:build:linux`    | Crée les paquets Linux AppImage + DEB (x64 + arm64)                                    |
| `npm run electron:smoke:packaged` | Lance le binaire empaqueté et vérifie que `/login` renvoie HTTP 200, puis l’arrête     |

L’espace de travail `electron/` expose également :

- `npm run prepare:bundle` — exécute `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — compilations macOS pour une seule architecture
- `npm run pack` — compilation en répertoire uniquement pour les tests locaux (sans installateur)

## Structure des répertoires

```
electron/
├── package.json              # Dépendances Electron + configuration electron-builder
├── main.js                   # Processus principal (24 Ko — voir les annotations ci-dessous)
├── preload.js                # Pont IPC contextBridge
├── types.d.ts                # Types AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Notes internes à l’espace de travail
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Sortie d’electron-builder (ignorée par git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Prépare le bundle .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Test de validation après compilation
```

`main.js` et `preload.js` sont tous deux des **fichiers `.js` CommonJS**, et non des fichiers TypeScript. Les
définitions de types côté moteur de rendu se trouvent dans `electron/types.d.ts`.

## Pont IPC (`preload.js`)

Le script de préchargement expose une API en liste blanche sur `window.electronAPI` à l’aide de `contextBridge`,
avec `contextIsolation: true` et `nodeIntegration: false`.

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

Méthodes exposées :

| Appel du moteur de rendu                                          | Type                                          |
| ----------------------------------------------------------------- | --------------------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invocation                                    |
| `openExternal(url)`                                               | invocation                                    |
| `getDataDir()`                                                    | invocation                                    |
| `restartServer()`                                                 | invocation                                    |
| `getAppVersion()`                                                 | invocation                                    |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invocation                                    |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | envoi                                         |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | réception (renvoie une fonction de nettoyage) |

Les fonctions auxiliaires de réception renvoient une **fonction de nettoyage** plutôt que de s’appuyer sur
`removeAllListeners` — cela empêche l’accumulation d’écouteurs lorsque les composants React
sont remontés.

## Cycle de vie du serveur

`main.js` lance directement le bundle autonome Next.js avec l’environnement d’exécution Node
d’Electron afin d’éviter toute incompatibilité d’ABI des modules natifs avec le Node du système :

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

Points clés :

- `waitForServer()` interroge l’URL pendant un maximum de 30 s avant d’afficher la fenêtre (aucun écran vide lors d’un démarrage à froid).
- `stdio: "pipe"` capture stdout/stderr ; les expressions signalant que le serveur est prêt (`Ready` / `listening`) émettent `server-status: running` via IPC.
- `before-quit` attend jusqu’à 5 s la fin gracieuse déclenchée par SIGTERM (point de contrôle WAL), puis envoie SIGKILL.
- Le sélecteur de port dans la zone de notification (`20128`, `3000`, `8080`) arrête et redémarre le serveur, puis recharge la BrowserWindow.

## Initialisation des secrets sans configuration

Au premier lancement, le processus principal génère automatiquement les secrets manquants et les conserve :

| Secret                   | Source                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                    |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (refus si des identifiants chiffrés existent déjà) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                    |

Ils sont conservés dans `<DATA_DIR>/server.env`. `DATA_DIR` correspond à :

- Windows : `%APPDATA%\omniroute`
- Linux : `$XDG_CONFIG_HOME/omniroute` ou `~/.omniroute`
- macOS : `~/.omniroute`

## Fenêtre et zone de notification

- `BrowserWindow` : 1400×900 (minimum 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS : `titleBarStyle: "hiddenInset"`, boutons de fenêtre à `{ x: 16, y: 16 }`.
- Windows/Linux : barre de titre native.
- Le bouton de fermeture réduit l’application dans la zone de notification ; le menu de celle-ci propose **Ouvrir OmniRoute**, **Ouvrir le tableau de bord** (dans le navigateur externe), un sous-menu **Port du serveur**, **Rechercher des mises à jour** et **Quitter**.

## Politique de sécurité du contenu

Définie via `session.defaultSession.webRequest.onHeadersReceived`. Directives importantes :

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Le mode développement ajoute `'unsafe-eval'` uniquement à `script-src`

## Mise à jour automatique

Utilise `electron-updater` avec le fournisseur GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Événements transmis au processus de rendu via l’IPC `update-status` :
  `checking`, `available`, `not-available`, `downloading` (avec `percent`), `downloaded`, `error`
- `installUpdate()` arrête le serveur, puis appelle `autoUpdater.quitAndInstall()`
- Ignorée en mode développement (`!app.isPackaged`)

## Pipeline de build

1. `npm run build` → version autonome de Next.js dans `.next/standalone`.
2. `prepare-electron-standalone.mjs` → réorganise les fichiers dans `.next/electron-standalone` et réécrit les chemins absolus dans `server.js` + `required-server-files.json` afin que le bundle soit relocalisable.
3. `electron-builder` empaquette `main.js`, `preload.js`, `node_modules` et `extraResources: { ../.next/electron-standalone → app }`.

### Cibles de build

| Système d’exploitation | Cibles                                         |
| ---------------------- | ---------------------------------------------- |
| Windows                | Programme d’installation NSIS + portable (x64) |
| macOS                  | DMG (Intel + arm64, glisser vers Applications) |
| Linux                  | AppImage + DEB (x64 + arm64)                   |

Paramètres NSIS : `oneClick: false`, permet à l’utilisateur de choisir le répertoire d’installation et crée des raccourcis sur le Bureau et dans le menu Démarrer.

## Test rapide du build empaqueté

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs` :

- Détecte automatiquement le binaire empaqueté dans `electron/dist-electron/` pour la plateforme actuelle.
- Le lance avec des répertoires `HOME`/`APPDATA`/`XDG_*` isolés afin de ne pas modifier les données de développement.
- Interroge `http://127.0.0.1:20128/login` jusqu’à obtenir une réponse HTTP 200 dans un délai de 45 s.
- Surveille stderr/stdout à la recherche de motifs d’erreur fatale (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, etc.).
- Attend 2 s de fonctionnement stable après que l’application est prête, puis envoie SIGTERM et attend que le port soit libéré.
- Dans la CI, transmet automatiquement `--no-sandbox --disable-gpu` (ainsi que `--disable-dev-shm-usage` sous Linux).

Surcharges via les variables d’environnement : `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Signature du code

`electron/package.json` ne configure **pas** directement les identifiants de signature. Transmettez-les à `electron-builder` via des variables d’environnement :

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

La signature des AppImage est facultative — définissez `LINUX_GPG_KEY` pour les signer.

## Distribution

Les artefacts sont générés dans `electron/dist-electron/` :

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Les versions sont publiées dans GitHub Releases (`diegosouzapw/OmniRoute`), où `electron-updater` recherche également les nouvelles versions.

## Dépannage

| Symptôme                                                                         | Solution                                                                                                                                                                                   |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Cannot find module 'better-sqlite3'` après une mise à niveau majeure d’Electron | better-sqlite3 v13 fournit des binaires précompilés Node-API — réexécutez `npm install` à la racine, puis `prepare:bundle` (qui vérifie le binaire précompilé pour la plateforme actuelle) |
| `ERR_DLOPEN_FAILED` pour un module natif                                         | Réexécutez `prepare:bundle` — la commande échoue immédiatement si le binaire précompilé Node-API pour la plateforme actuelle est absent                                                    |
| La fenêtre reste vide sous Linux                                                 | Vérifiez que le serveur Next.js s’est bien lié à PORT (consultez les journaux `[Server]`)                                                                                                  |
| La notarisation macOS reste bloquée                                              | Vérifiez que les variables `APPLE_*` sont exportées et ne sont pas uniquement définies dans `.env`                                                                                         |
| Avertissement Windows SmartScreen                                                | Signez avec un certificat EV, ou demandez aux utilisateurs de faire un clic droit → « Exécuter quand même »                                                                                |
| Le test rapide échoue, car le port est déjà utilisé                              | Arrêtez tout serveur de développement local utilisant le port 20128 avant d’exécuter `electron:smoke:packaged`                                                                             |

## Voir aussi

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Source : `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Utilitaires : `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
