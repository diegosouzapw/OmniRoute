# Electron Desktop Guide (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Fonte oficial:** workspace `electron/`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute inclui um aplicativo multiplataforma para desktop (Windows / macOS / Linux) desenvolvido com
**Electron 41** + **electron-builder 26.10**. O aplicativo para desktop inicia o servidor
standalone do Next.js como um processo filho, direciona uma `BrowserWindow` para ele e adiciona
um ícone na bandeja do sistema, atualizações automáticas, uma ponte IPC e inicialização de segredos sem configuração.

## Arquitetura

```
┌──────────────────────────────────────────────┐
│ Processo principal do Electron (electron/main.js) │
│ ├─ Bloqueio de instância única               │
│ ├─ Processo filho: servidor standalone do Next.js │
│ │   (iniciado com o runtime Node do Electron) │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Bandeja do sistema + menu de contexto     │
│ ├─ Atualização automática via electron-updater │
│ ├─ Política de Segurança de Conteúdo (cabeçalhos da sessão) │
│ └─ Inicialização de segredos (JWT / API_KEY_SECRET) │
└──────────────────────────────────────────────┘
            ↕ Ponte IPC (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Renderizador (painel do Next.js)             │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## Versões

Confirmadas em `electron/package.json`:

| Pacote               | Versão                                                                       |
| -------------------- | ---------------------------------------------------------------------------- |
| `electron`           | `^43.4.1`                                                                    |
| `electron-builder`   | `^26.15.3`                                                                   |
| `electron-updater`   | `^6.8.9`                                                                     |
| `better-sqlite3`     | raiz `^13.0.2` (pré-compilações Node-API — sem recompilação para o Electron) |
| Versão do aplicativo | `3.8.0`                                                                      |
| ID do aplicativo     | `online.omniroute.desktop`                                                   |
| Nome do produto      | `OmniRoute`                                                                  |

## Scripts (`package.json` raiz)

| Script                            | Finalidade                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| `npm run electron:dev`            | Inicia `npm run dev` + aguarda `localhost:20128` + inicia o Electron                 |
| `npm run electron:build`          | Compila o Next.js e executa `electron-builder` para o sistema operacional atual      |
| `npm run electron:build:win`      | Compila o instalador NSIS do Windows + versão portátil (x64)                         |
| `npm run electron:build:mac`      | Compila o DMG do macOS (Intel + Apple Silicon)                                       |
| `npm run electron:build:linux`    | Compila AppImage + DEB para Linux (x64 + arm64)                                      |
| `npm run electron:smoke:packaged` | Inicia o binário empacotado e testa `/login` em busca de HTTP 200; depois, encerra-o |

O workspace `electron/` também disponibiliza:

- `npm run prepare:bundle` — executa `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — compilações do macOS para uma única arquitetura
- `npm run pack` — compilação apenas do diretório para testes locais (sem instalador)

## Estrutura de diretórios

```
electron/
├── package.json              # Dependências do Electron + configuração do electron-builder
├── main.js                   # Processo principal (24 KB — consulte as anotações abaixo)
├── preload.js                # Ponte IPC do contextBridge
├── types.d.ts                # Tipos AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Notas no workspace
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Saída do electron-builder (ignorada pelo git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Prepara o pacote .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Teste de fumaça pós-build
```

Tanto `main.js` quanto `preload.js` são **arquivos CommonJS `.js`**, não TypeScript. As
tipagens do lado do renderer ficam em `electron/types.d.ts`.

## Ponte IPC (`preload.js`)

O preload expõe uma API permitida em `window.electronAPI` usando `contextBridge`
com `contextIsolation: true` e `nodeIntegration: false`.

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

Métodos expostos:

| Chamada do renderer                                               | Tipo                       |
| ----------------------------------------------------------------- | -------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                     |
| `openExternal(url)`                                               | invoke                     |
| `getDataDir()`                                                    | invoke                     |
| `restartServer()`                                                 | invoke                     |
| `getAppVersion()`                                                 | invoke                     |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                     |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                       |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (retorna disposer) |

Os helpers de receive retornam uma **função disposer**, em vez de depender de
`removeAllListeners` — isso evita o acúmulo de listeners quando os componentes React
são remontados.

## Ciclo de vida do servidor

`main.js` inicia o pacote standalone do Next.js diretamente com o runtime Node do
Electron para evitar incompatibilidade de ABI dos módulos nativos com o Node do sistema:

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

Destaques:

- `waitForServer()` consulta a URL por até 30 s antes de exibir a janela (sem tela em branco na inicialização a frio).
- `stdio: "pipe"` captura stdout/stderr; expressões de prontidão (`Ready` / `listening`) emitem `server-status: running` por IPC.
- `before-quit` aguarda até 5 s pelo SIGTERM normal (checkpoint do WAL) e, em seguida, envia SIGKILL.
- O seletor de porta na bandeja (`20128`, `3000`, `8080`) interrompe e reinicia o servidor e, depois, recarrega a BrowserWindow.

## Inicialização de segredos sem configuração

Na primeira inicialização, o processo principal gera automaticamente e persiste os segredos ausentes:

| Segredo                  | Origem                                                                                       |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                     |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (recusa se já existirem credenciais criptografadas) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                     |

Persistidos em `<DATA_DIR>/server.env`. `DATA_DIR` é resolvido como:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` ou `~/.omniroute`
- macOS: `~/.omniroute`

## Janela e bandeja

- `BrowserWindow`: 1400×900 (mín. 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, botões de controle da janela em `{ x: 16, y: 16 }`.
- Windows/Linux: barra de título nativa.
- O botão Fechar minimiza para a bandeja; o menu da bandeja contém **Abrir o OmniRoute**, **Abrir o painel** (navegador externo), submenu **Porta do servidor**, **Verificar atualizações** e **Sair**.

## Política de Segurança de Conteúdo

Definida por meio de `session.defaultSession.webRequest.onHeadersReceived`. Diretivas relevantes:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- O modo de desenvolvimento adiciona `'unsafe-eval'` somente a `script-src`

## Atualização automática

Usa `electron-updater` com o provedor do GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Eventos encaminhados ao renderizador por meio do IPC `update-status`:
  `checking`, `available`, `not-available`, `downloading` (com `percent`), `downloaded`, `error`
- `installUpdate()` encerra o servidor e depois chama `autoUpdater.quitAndInstall()`
- Ignorada no modo de desenvolvimento (`!app.isPackaged`)

## Pipeline de build

1. `npm run build` → versão standalone do Next.js em `.next/standalone`.
2. `prepare-electron-standalone.mjs` → reorganiza os arquivos em `.next/electron-standalone` e reescreve os caminhos absolutos dentro de `server.js` + `required-server-files.json` para que o pacote possa ser realocado.
3. `electron-builder` empacota `main.js`, `preload.js`, `node_modules` e `extraResources: { ../.next/electron-standalone → app }`.

### Destinos de build

| SO      | Destinos                                       |
| ------- | ---------------------------------------------- |
| Windows | Instalador NSIS + versão portátil (x64)        |
| macOS   | DMG (Intel + arm64, arrastar para Aplicativos) |
| Linux   | AppImage + DEB (x64 + arm64)                   |

Configurações do NSIS: `oneClick: false`, permite que o usuário escolha o diretório de instalação e cria atalhos na Área de Trabalho e no Menu Iniciar.

## Teste rápido do build empacotado

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Descobre automaticamente o binário empacotado em `electron/dist-electron/` para a plataforma atual.
- Inicia com diretórios `HOME`/`APPDATA`/`XDG_*` isolados para não interferir nos dados do desenvolvedor.
- Consulta repetidamente `http://127.0.0.1:20128/login` até receber HTTP 200 no prazo de 45 s.
- Monitora stderr/stdout em busca de padrões fatais (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` etc.).
- Aguarda 2 s de execução estável após o sistema estar pronto, envia SIGTERM e espera até que a porta seja liberada.
- Em CI, passa automaticamente `--no-sandbox --disable-gpu` (e `--disable-dev-shm-usage` no Linux).

Sobrescritas por variáveis de ambiente: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Assinatura de código

O `electron/package.json` **não** configura diretamente as credenciais de assinatura. Forneça-as ao `electron-builder` por meio de variáveis de ambiente:

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

A assinatura do AppImage é opcional — defina `LINUX_GPG_KEY` caso queira assiná-lo.

## Distribuição

Os artefatos são gerados em `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

As versões são publicadas no GitHub Releases (`diegosouzapw/OmniRoute`), onde o `electron-updater` também verifica se há novas versões.

## Solução de problemas

| Sintoma                                                                          | Solução                                                                                                                                                       |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` após uma atualização principal do Electron | O better-sqlite3 v13 fornece prebuilds da Node-API — execute novamente `npm install` na raiz e `prepare:bundle` (ele verifica o prebuild da plataforma atual) |
| `ERR_DLOPEN_FAILED` para um módulo nativo                                        | Execute novamente `prepare:bundle` — ele falha imediatamente quando o prebuild da Node-API para a plataforma atual está ausente                               |
| A janela aparece em branco no Linux                                              | Confirme se o servidor Next.js realmente está vinculado à PORT (verifique os logs `[Server]`)                                                                 |
| A notarização do macOS fica travada                                              | Certifique-se de que as variáveis `APPLE_*` foram exportadas, e não apenas definidas em `.env`                                                                |
| Aviso do Windows SmartScreen                                                     | Assine com um certificado EV ou peça aos usuários para clicar com o botão direito → "Executar assim mesmo"                                                    |
| O teste de fumaça falha porque a porta está em uso                               | Pare qualquer servidor de desenvolvimento local na porta 20128 antes de executar `electron:smoke:packaged`                                                    |

## Veja também

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Código-fonte: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Utilitários: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
