# Electron Desktop Guide (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Source de vérité :** espace de travail `electron/`
> **Dernière mise à jour :** 2026-06-28 — v3.8.40

OmniRoute fournit une application de bureau multiplateforme (Windows / macOS / Linux) basée sur
**Electron 41** + **electron-builder 26.10**. L’application de bureau lance le serveur autonome
Next.js en tant que processus enfant, y connecte une `BrowserWindow`, et ajoute une
icône dans la zone de notification, un système de mise à jour automatique, un pont IPC et une initialisation sans configuration des secrets.

## Architecture

```
┌────────────────────────────────────────────────────────┐
│ Processus principal Electron (electron/main.js)        │
│ ├─ Verrou d’instance unique                            │
│ ├─ Processus enfant : serveur autonome Next.js         │
│ │   (lancé avec l’environnement Node d’Electron)       │
│ ├─ BrowserWindow → http://localhost:PORT               │
│ ├─ Zone de notification + menu contextuel              │
│ ├─ Mise à jour automatique via electron-updater        │
│ ├─ Content Security Policy (en-têtes de session)       │
│ └─ Initialisation des secrets (JWT / API_KEY_SECRET)   │
└────────────────────────────────────────────────────────┘
            ↕ Pont IPC (electron/preload.js)
┌────────────────────────────────────────────────────────┐
│ Moteur de rendu (tableau de bord Next.js)              │
│   window.electronAPI.* (contextIsolation)              │
└────────────────────────────────────────────────────────┘
```

## Versions

Confirmées à partir de `electron/package.json` :

| Paquet                       | Version                                                                     |
| ---------------------------- | --------------------------------------------------------------------------- |
| `electron`                   | `^43.4.1`                                                                   |
| `electron-builder`           | `^26.15.3`                                                                  |
| `electron-updater`           | `^6.8.9`                                                                    |
| `better-sqlite3`             | racine `^13.0.2` (précompilations Node-API — aucune recompilation Electron) |
| Version de l’application     | `3.8.0`                                                                     |
| Identifiant de l’application | `online.omniroute.desktop`                                                  |
| Nom du produit               | `OmniRoute`                                                                 |

## Scripts (`package.json` racine)

| Script                            | Objectif                                                                               |
| --------------------------------- | -------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Démarre `npm run dev` + attend `localhost:20128` + lance Electron                      |
| `npm run electron:build`          | Compile Next.js, puis exécute `electron-builder` pour le système d’exploitation actuel |
| `npm run electron:build:win`      | Génère l’installateur Windows NSIS + la version portable (x64)                         |
| `npm run electron:build:mac`      | Génère le DMG macOS (Intel + Apple Silicon)                                            |
| `npm run electron:build:linux`    | Génère les paquets Linux AppImage + DEB (x64 + arm64)                                  |
| `npm run electron:smoke:packaged` | Lance le binaire empaqueté et vérifie que `/login` renvoie HTTP 200, puis l’arrête     |

L’espace de travail `electron/` expose également :

- `npm run prepare:bundle` — exécute `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — compilations macOS pour une seule architecture
- `npm run pack` — compilation sous forme de répertoire uniquement pour les tests locaux (sans installateur)

## Organisation des répertoires

```
electron/
├── package.json              # Dépendances Electron + configuration electron-builder
├── main.js                   # Processus principal (24 Ko — voir les annotations ci-dessous)
├── preload.js                # Pont IPC contextBridge
├── types.d.ts                # Types AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Notes internes à l’espace de travail
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Sortie electron-builder (ignorée par Git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Prépare le bundle .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Test de vérification après la compilation
```

`main.js` et `preload.js` sont tous deux des **fichiers CommonJS `.js`**, et non des fichiers TypeScript. Les
déclarations de types côté moteur de rendu se trouvent dans `electron/types.d.ts`.

## Pont IPC (`preload.js`)

Le script de préchargement expose une API sur liste blanche dans `window.electronAPI` à l’aide de `contextBridge`,
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

| Appel du moteur de rendu                                          | Type                                        |
| ----------------------------------------------------------------- | ------------------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                      |
| `openExternal(url)`                                               | invoke                                      |
| `getDataDir()`                                                    | invoke                                      |
| `restartServer()`                                                 | invoke                                      |
| `getAppVersion()`                                                 | invoke                                      |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                      |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                        |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (renvoie une fonction de nettoyage) |

Les fonctions auxiliaires de réception renvoient une **fonction de nettoyage** au lieu de s’appuyer sur
`removeAllListeners` — cela évite l’accumulation d’écouteurs lorsque les composants React
sont remontés.

## Cycle de vie du serveur

`main.js` lance directement le bundle autonome Next.js avec l’environnement d’exécution Node
d’Electron afin d’éviter une incompatibilité d’ABI des modules natifs avec la version système de Node :

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
- `stdio: "pipe"` capture stdout/stderr ; les expressions indiquant que le serveur est prêt (`Ready` / `listening`) émettent `server-status: running` via IPC.
- `before-quit` attend jusqu’à 5 s la fin d’un SIGTERM propre (point de contrôle WAL), puis envoie SIGKILL.
- Le sélecteur de port dans la zone de notification (`20128`, `3000`, `8080`) arrête et redémarre le serveur, puis recharge la BrowserWindow.

## Amorçage des secrets sans configuration

Au premier lancement, le processus principal génère automatiquement les secrets manquants et les conserve :

| Secret                   | Source                                                                                       |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                     |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (refuse si des identifiants chiffrés existent déjà) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                     |

Ils sont enregistrés dans `<DATA_DIR>/server.env`. `DATA_DIR` est résolu comme suit :

- Windows : `%APPDATA%\omniroute`
- Linux : `$XDG_CONFIG_HOME/omniroute` ou `~/.omniroute`
- macOS : `~/.omniroute`

## Recherche du fichier d’environnement

Avant de lancer le serveur, le processus principal (`getPreferredEnvFilePath()` dans
`electron/main.js`) sélectionne **un seul** fichier `.env` : le premier fichier existant parmi les suivants.

1. `$DATA_DIR/.env`, lorsque `DATA_DIR` est défini dans l’environnement depuis lequel l’application a été lancée.
2. `<resolved DATA_DIR>/.env`, en utilisant les mêmes valeurs par défaut que ci-dessus : `%APPDATA%\omniroute\.env` sous
   Windows, `$XDG_CONFIG_HOME/omniroute/.env` ou `~/.omniroute/.env` sous Linux et macOS.
3. Le fichier `.env` dans le répertoire de travail du processus.

Le processus principal lit uniquement ce fichier ; les candidats suivants ne sont pas fusionnés. L’environnement
du serveur est ensuite construit selon l’ordre de priorité suivant (du plus élevé au plus faible) :

1. L’environnement du processus Electron (variables héritées de ce qui a lancé l’application).
2. Le fichier `.env` sélectionné.
3. `<DATA_DIR>/server.env` (les secrets d’amorçage ci-dessus).

L’environnement du processus est capturé au démarrage de l’application ; par conséquent, une variable d’environnement
système ou utilisateur définie pendant que l’application est en cours d’exécution (y compris lorsqu’elle reste dans la zone de notification après la fermeture de sa fenêtre)
n’est pas transmise au serveur tant que l’application n’a pas été complètement quittée puis relancée. Pour les paramètres d’exécution
tels que `CONTEXT_LENGTH_<PROVIDER>` (voir
[Variables d’environnement : longueur de contexte par fournisseur](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)),
privilégiez le fichier `.env`, puis quittez complètement l’application (zone de notification, **Quitter**) et relancez-la.

## Fenêtre et zone de notification

- `BrowserWindow` : 1400×900 (minimum 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS : `titleBarStyle: "hiddenInset"`, boutons de fenêtre à `{ x: 16, y: 16 }`.
- Windows/Linux : barre de titre native.
- Le bouton de fermeture réduit l’application dans la zone de notification ; le menu de la zone de notification contient **Ouvrir OmniRoute**, **Ouvrir le tableau de bord** (navigateur externe), le sous-menu **Port du serveur**, **Rechercher les mises à jour**, **Quitter**.

## Politique de sécurité du contenu

Définie via `session.defaultSession.webRequest.onHeadersReceived`. Directives importantes :

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Le mode développement ajoute `'unsafe-eval'` à `script-src` uniquement

## Mise à jour automatique

Utilise `electron-updater` avec le fournisseur GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Événements transmis au processus de rendu via l’IPC `update-status` :
  `checking`, `available`, `not-available`, `downloading` (avec `percent`), `downloaded`, `error`
- `installUpdate()` arrête le serveur, puis appelle `autoUpdater.quitAndInstall()`
- Ignorée en mode développement (`!app.isPackaged`)

## Pipeline de build

1. `npm run build` → version autonome de Next.js dans `.next/standalone`.
2. `prepare-electron-standalone.mjs` → réorganise les fichiers dans `.next/electron-standalone` et réécrit les chemins absolus dans `server.js` + `required-server-files.json` afin que le bundle soit déplaçable.
3. `electron-builder` empaquette `main.js`, `preload.js`, `node_modules` et `extraResources: { ../.next/electron-standalone → app }`.

### Cibles de build

| OS      | Cibles                                                 |
| ------- | ------------------------------------------------------ |
| Windows | Programme d’installation NSIS + version portable (x64) |
| macOS   | DMG (Intel + arm64, glisser-déposer vers Applications) |
| Linux   | AppImage + DEB (x64 + arm64)                           |

Paramètres NSIS : `oneClick: false`, permet à l’utilisateur de choisir le répertoire d’installation et crée des raccourcis sur le Bureau et dans le menu Démarrer.

## Test rapide du build empaqueté

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs` :

- Détecte automatiquement le binaire empaqueté dans `electron/dist-electron/` pour la plateforme actuelle.
- Le lance avec des répertoires `HOME`/`APPDATA`/`XDG_*` isolés afin de ne pas toucher aux données du développeur.
- Interroge régulièrement `http://127.0.0.1:20128/login` jusqu’à obtenir une réponse HTTP 200 dans un délai de 45 s.
- Surveille stderr/stdout afin de détecter les motifs d’erreur fatale (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, etc.).
- Attend 2 s d’exécution stable après que l’application est prête, puis envoie SIGTERM et attend que le port soit libéré.
- Dans la CI, transmet automatiquement `--no-sandbox --disable-gpu` (ainsi que `--disable-dev-shm-usage` sous Linux).

Variables d’environnement de remplacement : `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Signature du code

`electron/package.json` ne configure **pas** directement les identifiants de signature. Transmettez-les à `electron-builder` au moyen de variables d’environnement :

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

La signature d’AppImage est facultative — définissez `LINUX_GPG_KEY` pour signer.

## Distribution

Les artefacts sont générés dans `electron/dist-electron/` :

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Les versions sont publiées dans GitHub Releases (`diegosouzapw/OmniRoute`), où `electron-updater` vérifie également la disponibilité de nouvelles versions.

## Dépannage

| Symptôme                                                                         | Solution                                                                                                                                                                            |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` après une mise à niveau majeure d’Electron | better-sqlite3 v13 fournit des builds précompilés Node-API — réexécutez `npm install` à la racine et `prepare:bundle` (qui vérifie le build précompilé pour la plateforme actuelle) |
| `ERR_DLOPEN_FAILED` pour un module natif                                         | Réexécutez `prepare:bundle` — la commande échoue immédiatement lorsque le build précompilé Node-API pour la plateforme actuelle est absent                                          |
| La fenêtre apparaît vide sous Linux                                              | Vérifiez que le serveur Next.js s’est bien lié à PORT (consultez les journaux `[Server]`)                                                                                           |
| La notarisation macOS reste bloquée                                              | Assurez-vous que les variables `APPLE_*` sont exportées et qu’elles ne sont pas uniquement définies dans `.env`                                                                     |
| Avertissement Windows SmartScreen                                                | Signez avec un certificat EV, ou les utilisateurs peuvent effectuer un clic droit → « Exécuter quand même »                                                                         |
| Le test rapide échoue, car le port est déjà utilisé                              | Arrêtez tout serveur de développement local utilisant le port 20128 avant d’exécuter `electron:smoke:packaged`                                                                      |

## Voir aussi

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Source : `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Utilitaires : `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
