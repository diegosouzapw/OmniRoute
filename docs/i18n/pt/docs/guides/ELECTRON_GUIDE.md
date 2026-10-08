# Electron Desktop Guide (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Fonte fidedigna:** espaço de trabalho `electron/`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute disponibiliza uma aplicação multiplataforma para ambiente de trabalho (Windows / macOS / Linux), criada com
**Electron 41** + **electron-builder 26.10**. A aplicação para ambiente de trabalho inicia o servidor autónomo Next.js
como um processo subordinado, direciona uma `BrowserWindow` para o mesmo e adiciona um
ícone na área de notificação, atualizações automáticas, uma ponte IPC e inicialização de segredos sem configuração.

## Arquitetura

```
┌────────────────────────────────────────────────────┐
│ Processo principal do Electron (electron/main.js)  │
│ ├─ Bloqueio de instância única                     │
│ ├─ Processo subordinado: servidor autónomo Next.js │
│ │   (iniciado com o runtime Node do Electron)      │
│ ├─ BrowserWindow → http://localhost:PORT           │
│ ├─ Área de notificação + menu de contexto          │
│ ├─ Atualização automática via electron-updater     │
│ ├─ Política de Segurança de Conteúdos              │
│ │   (cabeçalhos de sessão)                         │
│ └─ Inicialização de segredos                       │
│     (JWT / API_KEY_SECRET)                         │
└────────────────────────────────────────────────────┘
            ↕ Ponte IPC (electron/preload.js)
┌────────────────────────────────────────────────────┐
│ Renderizador (painel Next.js)                      │
│   window.electronAPI.* (contextIsolation)          │
└────────────────────────────────────────────────────┘
```

## Versões

Confirmadas em `electron/package.json`:

| Pacote              | Versão                                                                |
| ------------------- | --------------------------------------------------------------------- |
| `electron`          | `^43.4.1`                                                             |
| `electron-builder`  | `^26.15.3`                                                            |
| `electron-updater`  | `^6.8.9`                                                              |
| `better-sqlite3`    | raiz `^13.0.2` (pré-compilações Node-API — sem recompilação Electron) |
| Versão da aplicação | `3.8.0`                                                               |
| ID da aplicação     | `online.omniroute.desktop`                                            |
| Nome do produto     | `OmniRoute`                                                           |

## Scripts (`package.json` da raiz)

| Script                            | Finalidade                                                                                            |
| --------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Inicia `npm run dev` + aguarda por `localhost:20128` + inicia o Electron                              |
| `npm run electron:build`          | Compila o Next.js e, em seguida, executa o `electron-builder` para o sistema operativo atual          |
| `npm run electron:build:win`      | Compila o instalador NSIS do Windows + versão portátil (x64)                                          |
| `npm run electron:build:mac`      | Compila o DMG do macOS (Intel + Apple Silicon)                                                        |
| `npm run electron:build:linux`    | Compila AppImage + DEB para Linux (x64 + arm64)                                                       |
| `npm run electron:smoke:packaged` | Inicia o binário empacotado, verifica `/login` para obter HTTP 200 e, em seguida, encerra a aplicação |

O espaço de trabalho `electron/` também disponibiliza:

- `npm run prepare:bundle` — executa `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — compilações macOS para uma única arquitetura
- `npm run pack` — compilação apenas para diretório, destinada a testes locais (sem instalador)

## Estrutura de Diretórios

```
electron/
├── package.json              # Dependências do Electron + configuração do electron-builder
├── main.js                   # Processo principal (24 KB — ver anotações abaixo)
├── preload.js                # Ponte IPC do contextBridge
├── types.d.ts                # Tipos AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Notas no espaço de trabalho
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Saída do electron-builder (ignorada pelo git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Prepara o pacote .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Teste de fumo pós-compilação
```

Tanto `main.js` como `preload.js` são **ficheiros CommonJS `.js`**, não TypeScript. As
tipagens do lado do renderizador encontram-se em `electron/types.d.ts`.

## Ponte IPC (`preload.js`)

O preload expõe uma API incluída numa lista de permissões em `window.electronAPI` utilizando `contextBridge`
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

| Chamada do renderizador                                           | Tipo                                |
| ----------------------------------------------------------------- | ----------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                              |
| `openExternal(url)`                                               | invoke                              |
| `getDataDir()`                                                    | invoke                              |
| `restartServer()`                                                 | invoke                              |
| `getAppVersion()`                                                 | invoke                              |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                              |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (devolve função de limpeza) |

Os auxiliares de receção devolvem uma **função de limpeza** em vez de dependerem de
`removeAllListeners` — isto impede a acumulação de listeners quando os componentes React
são novamente montados.

## Ciclo de Vida do Servidor

O `main.js` inicia diretamente o pacote autónomo do Next.js com o runtime Node do Electron
para evitar uma incompatibilidade de ABI dos módulos nativos com o Node do sistema:

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

- `waitForServer()` consulta o URL durante até 30 s antes de apresentar a janela (sem ecrã em branco num arranque a frio).
- `stdio: "pipe"` captura stdout/stderr; as expressões de prontidão (`Ready` / `listening`) emitem `server-status: running` através de IPC.
- `before-quit` aguarda até 5 s por um SIGTERM normal (checkpoint WAL) e, em seguida, envia SIGKILL.
- O seletor de porta na área de notificação (`20128`, `3000`, `8080`) para e reinicia o servidor e, em seguida, recarrega a BrowserWindow.

## Inicialização de segredos sem configuração

No primeiro arranque, o processo principal gera automaticamente e guarda os segredos em falta:

| Segredo                  | Fonte                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                  |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (recusa se já existirem credenciais encriptadas) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                  |

Guardados em `<DATA_DIR>/server.env`. `DATA_DIR` é resolvido para:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` ou `~/.omniroute`
- macOS: `~/.omniroute`

## Pesquisa do ficheiro de ambiente

Antes de iniciar o servidor, o processo principal (`getPreferredEnvFilePath()` em
`electron/main.js`) escolhe **um** ficheiro `.env`: o primeiro dos seguintes que existir.

1. `$DATA_DIR/.env`, quando `DATA_DIR` está definido no ambiente com o qual a aplicação foi iniciada.
2. `<resolved DATA_DIR>/.env`, utilizando os mesmos valores predefinidos acima: `%APPDATA%\omniroute\.env` no
   Windows, `$XDG_CONFIG_HOME/omniroute/.env` ou `~/.omniroute/.env` no Linux e macOS.
3. `.env` no diretório de trabalho do processo.

O processo principal lê apenas esse ficheiro; os candidatos posteriores não são combinados. O ambiente
do servidor é depois criado com esta ordem de precedência (da mais alta para a mais baixa):

1. O ambiente do processo Electron (variáveis herdadas do processo que iniciou a aplicação).
2. O ficheiro `.env` selecionado.
3. `<DATA_DIR>/server.env` (os segredos de inicialização acima).

O ambiente do processo é capturado quando a aplicação é iniciada, pelo que uma variável de ambiente
do sistema ou do utilizador definida enquanto a aplicação está em execução (incluindo enquanto permanece
na área de notificação após a janela ser fechada) não chega ao servidor até que a aplicação seja completamente
encerrada e reiniciada. Para definições de execução como `CONTEXT_LENGTH_<PROVIDER>` (consulte
[Variáveis de ambiente: tamanho de contexto por fornecedor](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)),
dê preferência ao ficheiro `.env` e, em seguida, encerre completamente a aplicação (área de notificação, **Sair**) e reinicie-a.

## Janela e área de notificação

- `BrowserWindow`: 1400×900 (mín. 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, botões de semáforo em `{ x: 16, y: 16 }`.
- Windows/Linux: barra de título nativa.
- O botão Fechar minimiza para a área de notificação; o respetivo menu inclui **Abrir o OmniRoute**, **Abrir o painel de controlo** (navegador externo), o submenu **Porta do servidor**, **Procurar atualizações** e **Sair**.

## Política de Segurança de Conteúdos

Definida através de `session.defaultSession.webRequest.onHeadersReceived`. Diretivas relevantes:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- O modo de desenvolvimento adiciona `'unsafe-eval'` apenas a `script-src`

## Atualização automática

Utiliza `electron-updater` com o fornecedor GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Eventos encaminhados para o processo de renderização através do IPC `update-status`:
  `checking`, `available`, `not-available`, `downloading` (com `percent`), `downloaded`, `error`
- `installUpdate()` termina o servidor e, em seguida, chama `autoUpdater.quitAndInstall()`
- Ignorada no modo de desenvolvimento (`!app.isPackaged`)

## Pipeline de compilação

1. `npm run build` → versão autónoma do Next.js em `.next/standalone`.
2. `prepare-electron-standalone.mjs` → reorganiza os ficheiros em `.next/electron-standalone` e reescreve os caminhos absolutos dentro de `server.js` + `required-server-files.json`, para que o pacote possa ser relocalizado.
3. `electron-builder` empacota `main.js`, `preload.js`, `node_modules` e `extraResources: { ../.next/electron-standalone → app }`.

### Destinos de compilação

| SO      | Destinos                                      |
| ------- | --------------------------------------------- |
| Windows | Instalador NSIS + portátil (x64)              |
| macOS   | DMG (Intel + arm64, arrastar para Aplicações) |
| Linux   | AppImage + DEB (x64 + arm64)                  |

Definições do NSIS: `oneClick: false`, permite ao utilizador escolher o diretório de instalação e cria atalhos no Ambiente de Trabalho e no Menu Iniciar.

## Teste rápido da compilação empacotada

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Deteta automaticamente o binário empacotado em `electron/dist-electron/` para a plataforma atual.
- Inicia-o com diretórios `HOME`/`APPDATA`/`XDG_*` isolados, para não afetar os dados do programador.
- Consulta repetidamente `http://127.0.0.1:20128/login` até obter HTTP 200, dentro de 45 s.
- Monitoriza stderr/stdout para detetar padrões fatais (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, etc.).
- Aguarda 2 s de execução estável após estar pronto, envia depois SIGTERM e espera que a porta fique livre.
- Em CI, passa automaticamente `--no-sandbox --disable-gpu` (e `--disable-dev-shm-usage` no Linux).

Substituições através de variáveis de ambiente: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Assinatura de código

`electron/package.json` **não** configura diretamente as credenciais de assinatura. Passe-as ao `electron-builder` através de variáveis de ambiente:

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

A assinatura de AppImage é opcional — defina `LINUX_GPG_KEY` caso pretenda assinar.

## Distribuição

Os artefactos são colocados em `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

As versões são publicadas nas GitHub Releases (`diegosouzapw/OmniRoute`), que é também onde o `electron-updater` procura novas versões.

## Resolução de problemas

| Sintoma                                                                          | Correção                                                                                                                                                                   |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` após uma atualização principal do Electron | O better-sqlite3 v13 inclui pré-compilações Node-API — execute novamente `npm install` na raiz e `prepare:bundle` (este verifica a pré-compilação para a plataforma atual) |
| `ERR_DLOPEN_FAILED` para um módulo nativo                                        | Execute novamente `prepare:bundle` — este falha imediatamente quando não existe a pré-compilação Node-API para a plataforma atual                                          |
| A janela aparece em branco no Linux                                              | Confirme que o servidor Next.js ficou realmente associado a PORT (consulte os registos `[Server]`)                                                                         |
| A notarização do macOS fica bloqueada                                            | Certifique-se de que as variáveis `APPLE_*` são exportadas e não estão apenas em `.env`                                                                                    |
| Aviso do Windows SmartScreen                                                     | Assine com um certificado EV ou peça aos utilizadores para clicarem com o botão direito → "Executar mesmo assim"                                                           |
| O teste rápido falha porque a porta está a ser utilizada                         | Pare qualquer servidor de desenvolvimento local na porta 20128 antes de executar `electron:smoke:packaged`                                                                 |

## Consulte Também

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Código-fonte: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Utilitários: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
