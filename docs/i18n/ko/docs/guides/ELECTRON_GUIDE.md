# Electron Desktop Guide (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **기준 소스:** `electron/` 워크스페이스
> **최종 업데이트:** 2026-06-28 — v3.8.40

OmniRoute는 **Electron 41** + **electron-builder 26.10**을 기반으로 구축된 크로스 플랫폼 데스크톱 앱(Windows / macOS / Linux)을 제공합니다. 데스크톱 앱은 Next.js 독립 실행형 서버를 자식 프로세스로 생성하고, `BrowserWindow`가 해당 서버를 가리키도록 하며, 시스템 트레이, 자동 업데이터, IPC 브리지 및 무설정 시크릿 부트스트랩 기능을 추가합니다.

## 아키텍처

```
┌──────────────────────────────────────────────────┐
│ Electron 메인 프로세스 (electron/main.js)        │
│ ├─ 단일 인스턴스 잠금                            │
│ ├─ 자식 프로세스: Next.js 독립 실행형 서버       │
│ │   (Electron의 Node 런타임으로 생성됨)           │
│ ├─ BrowserWindow → http://localhost:PORT         │
│ ├─ 시스템 트레이 + 컨텍스트 메뉴                 │
│ ├─ electron-updater를 통한 자동 업데이트         │
│ ├─ 콘텐츠 보안 정책(세션 헤더)                   │
│ └─ 시크릿 부트스트랩(JWT / API_KEY_SECRET)       │
└──────────────────────────────────────────────────┘
               ↕ IPC 브리지 (electron/preload.js)
┌──────────────────────────────────────────────────┐
│ 렌더러(Next.js 대시보드)                         │
│   window.electronAPI.* (contextIsolation)        │
└──────────────────────────────────────────────────┘
```

## 버전

`electron/package.json`에서 확인됨:

| 패키지             | 버전                                                         |
| ------------------ | ------------------------------------------------------------ |
| `electron`         | `^43.4.1`                                                    |
| `electron-builder` | `^26.15.3`                                                   |
| `electron-updater` | `^6.8.9`                                                     |
| `better-sqlite3`   | 루트 `^13.0.2` (Node-API 사전 빌드 — Electron 재빌드 불필요) |
| 앱 버전            | `3.8.0`                                                      |
| 앱 ID              | `online.omniroute.desktop`                                   |
| 제품명             | `OmniRoute`                                                  |

## 스크립트(루트 `package.json`)

| 스크립트                          | 용도                                                                     |
| --------------------------------- | ------------------------------------------------------------------------ |
| `npm run electron:dev`            | `npm run dev`를 시작하고 `localhost:20128`을 기다린 후 Electron 실행     |
| `npm run electron:build`          | Next.js를 빌드한 후 현재 OS용 `electron-builder` 실행                    |
| `npm run electron:build:win`      | Windows NSIS 설치 프로그램 + 포터블 버전(x64) 빌드                       |
| `npm run electron:build:mac`      | macOS DMG(Intel + Apple Silicon) 빌드                                    |
| `npm run electron:build:linux`    | Linux AppImage + DEB(x64 + arm64) 빌드                                   |
| `npm run electron:smoke:packaged` | 패키징된 바이너리를 실행하고 `/login`에서 HTTP 200 응답을 확인한 후 종료 |

`electron/` 워크스페이스에서는 다음 스크립트도 제공합니다:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` 실행
- `npm run build:mac-x64` / `build:mac-arm64` — 단일 아키텍처 macOS 빌드
- `npm run pack` — 로컬 테스트용 디렉터리 전용 빌드(설치 프로그램 없음)

## 디렉터리 구조

```
electron/
├── package.json              # Electron 의존성 + electron-builder 설정
├── main.js                   # 메인 프로세스(24 KB — 아래 주석 참조)
├── preload.js                # contextBridge IPC 브리지
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI 타입
├── README.md                 # 워크스페이스 내부 참고 사항
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder 출력(gitignored)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # .next/electron-standalone 번들 스테이징
└── dev/
    └── smoke-electron-packaged.mjs       # 빌드 후 스모크 테스트
```

`main.js`와 `preload.js`는 모두 TypeScript가 아니라 **CommonJS `.js` 파일**입니다.
렌더러 측 타입 정의는 `electron/types.d.ts`에 있습니다.

## IPC 브리지(`preload.js`)

프리로드는 `contextIsolation: true` 및 `nodeIntegration: false` 설정과 함께 `contextBridge`를 사용하여 허용 목록에 포함된 API를 `window.electronAPI`에 노출합니다.

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

노출된 메서드:

| 렌더러 호출                                                       | 유형                    |
| ----------------------------------------------------------------- | ----------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                  |
| `openExternal(url)`                                               | invoke                  |
| `getDataDir()`                                                    | invoke                  |
| `restartServer()`                                                 | invoke                  |
| `getAppVersion()`                                                 | invoke                  |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                  |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                    |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive(해제 함수 반환) |

수신 헬퍼는 `removeAllListeners`에 의존하지 않고 **해제 함수**를 반환합니다. 이를 통해 React 컴포넌트가 다시 마운트될 때 리스너가 누적되는 것을 방지합니다.

## 서버 수명 주기

`main.js`는 시스템 Node와의 네이티브 모듈 ABI 불일치를 방지하기 위해 Electron Node 런타임으로 Next.js 독립 실행형 번들을 직접 생성합니다.

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

주요 사항:

- `waitForServer()`는 창을 표시하기 전에 최대 30초 동안 URL을 폴링합니다(콜드 스타트 시 빈 화면 방지).
- `stdio: "pipe"`는 stdout/stderr를 캡처하며, 준비 완료 문구(`Ready` / `listening`)가 감지되면 IPC를 통해 `server-status: running`을 내보냅니다.
- `before-quit`는 정상적인 SIGTERM 종료(WAL 체크포인트)를 위해 최대 5초간 대기한 후 SIGKILL을 보냅니다.
- 트레이의 포트 전환기(`20128`, `3000`, `8080`)는 서버를 중지하고 다시 시작한 다음 BrowserWindow를 다시 로드합니다.

## 무설정 시크릿 부트스트랩

최초 실행 시 메인 프로세스가 누락된 시크릿을 자동 생성하고 영구 저장합니다.

| 시크릿                   | 소스                                                                             |
| ------------------------ | -------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                         |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (암호화된 자격 증명이 이미 있으면 거부) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                         |

`<DATA_DIR>/server.env`에 저장됩니다. `DATA_DIR`은 다음 경로로 결정됩니다.

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` 또는 `~/.omniroute`
- macOS: `~/.omniroute`

## 창 및 트레이

- `BrowserWindow`: 1400×900(최소 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, 창 제어 버튼 위치는 `{ x: 16, y: 16 }`.
- Windows/Linux: 네이티브 제목 표시줄.
- 닫기 버튼을 누르면 트레이로 최소화됩니다. 트레이 메뉴에는 **OmniRoute 열기**, **대시보드 열기**(외부 브라우저), **서버 포트** 하위 메뉴, **업데이트 확인**, **종료**가 있습니다.

## 콘텐츠 보안 정책

`session.defaultSession.webRequest.onHeadersReceived`를 통해 설정됩니다. 주요 지시문은 다음과 같습니다.

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- 개발 모드에서는 `script-src`에만 `'unsafe-eval'`이 추가됩니다.

## 자동 업데이트

GitHub 공급자(`diegosouzapw/OmniRoute`)와 함께 `electron-updater`를 사용합니다.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- 이벤트는 `update-status` IPC를 통해 렌더러로 전달됩니다.
  `checking`, `available`, `not-available`, `downloading`(`percent` 포함), `downloaded`, `error`
- `installUpdate()`는 서버를 종료한 다음 `autoUpdater.quitAndInstall()`을 호출합니다.
- 개발 모드(`!app.isPackaged`)에서는 건너뜁니다.

## 빌드 파이프라인

1. `npm run build` → `.next/standalone`에 Next.js standalone을 생성합니다.
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone`으로 다시 스테이징하고, 번들을 재배치할 수 있도록 `server.js` 및 `required-server-files.json` 내부의 절대 경로를 다시 작성합니다.
3. `electron-builder`는 `main.js`, `preload.js`, `node_modules` 및 `extraResources: { ../.next/electron-standalone → app }`을 패키징합니다.

### 빌드 대상

| OS      | 대상                                      |
| ------- | ----------------------------------------- |
| Windows | NSIS 설치 프로그램 + 포터블(x64)          |
| macOS   | DMG(Intel + arm64, Applications로 드래그) |
| Linux   | AppImage + DEB(x64 + arm64)               |

NSIS 설정: `oneClick: false`이며, 사용자가 설치 디렉터리를 선택할 수 있고 바탕 화면 및 시작 메뉴 바로 가기를 생성합니다.

## 패키징된 빌드 스모크 테스트

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- 현재 플랫폼에 맞는 패키징된 바이너리를 `electron/dist-electron/`에서 자동으로 검색합니다.
- 개발자 데이터에 영향을 주지 않도록 격리된 `HOME`/`APPDATA`/`XDG_*` 디렉터리를 사용해 실행합니다.
- 45초 이내에 `http://127.0.0.1:20128/login`이 HTTP 200을 반환하는지 폴링합니다.
- stderr/stdout에서 치명적 패턴(`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` 등)을 감시합니다.
- 준비 완료 후 2초 동안 안정적으로 실행되는지 기다린 다음 SIGTERM을 보내고 포트가 해제될 때까지 기다립니다.
- CI에서는 자동으로 `--no-sandbox --disable-gpu`를 전달하며, Linux에서는 `--disable-dev-shm-usage`도 함께 전달합니다.

환경 변수 재정의: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## 코드 서명

`electron/package.json`에서는 서명 자격 증명을 직접 연결하지 **않습니다**. 환경 변수를 통해 `electron-builder`에 전달하세요.

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

AppImage 서명은 선택 사항입니다. 서명하려면 `LINUX_GPG_KEY`를 설정하세요.

## 배포

아티팩트는 `electron/dist-electron/`에 생성됩니다.

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

릴리스는 GitHub Releases(`diegosouzapw/OmniRoute`)에 게시되며, `electron-updater`도 이 위치에서 새 버전을 확인합니다.

## 문제 해결

| 증상                                                                          | 해결 방법                                                                                                                                                                 |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron 메이저 버전 업그레이드 후 `Cannot find module 'better-sqlite3'` 발생 | better-sqlite3 v13은 Node-API 프리빌드를 제공합니다. 루트에서 `npm install`과 `prepare:bundle`을 다시 실행하세요(`prepare:bundle`은 현재 플랫폼용 프리빌드를 검증합니다). |
| 네이티브 모듈에서 `ERR_DLOPEN_FAILED` 발생                                    | `prepare:bundle`을 다시 실행하세요. 현재 플랫폼용 Node-API 프리빌드가 없으면 즉시 실패합니다.                                                                             |
| Linux에서 창이 비어 있음                                                      | Next.js 서버가 실제로 PORT에 바인딩되었는지 확인하세요(`[Server]` 로그 확인).                                                                                             |
| macOS 공증이 멈춤                                                             | `APPLE_*` 변수가 `.env`에만 설정된 것이 아니라 export되었는지 확인하세요.                                                                                                 |
| Windows SmartScreen 경고                                                      | EV 인증서로 서명하거나, 사용자가 마우스 오른쪽 버튼을 클릭한 후 → "Run anyway"를 선택하도록 안내하세요.                                                                   |
| 포트 사용 중 오류로 스모크 테스트 실패                                        | `electron:smoke:packaged`를 실행하기 전에 20128에서 실행 중인 모든 로컬 개발 서버를 중지하세요.                                                                           |

## 참고 항목

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- 소스: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- 도우미: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
