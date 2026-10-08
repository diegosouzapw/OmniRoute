# Electron Desktop Guide (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **신뢰할 수 있는 원본:** `electron/` 워크스페이스
> **마지막 업데이트:** 2026-06-28 — v3.8.40

OmniRoute는 **Electron 41** + **electron-builder 26.10**을 기반으로 구축된 크로스 플랫폼 데스크톱 앱(Windows / macOS / Linux)을 제공합니다. 데스크톱 앱은 Next.js 독립 실행형 서버를 자식 프로세스로 생성하고, `BrowserWindow`가 해당 서버를 가리키도록 설정하며, 시스템 트레이, 자동 업데이트, IPC 브리지 및 별도 설정이 필요 없는 시크릿 부트스트랩을 추가합니다.

## 아키텍처

```
┌──────────────────────────────────────────────┐
│ Electron 메인 프로세스 (electron/main.js)   │
│ ├─ 단일 인스턴스 잠금                        │
│ ├─ 자식 프로세스: Next.js 독립 실행형 서버   │
│ │   (Electron의 Node 런타임으로 생성)        │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ 시스템 트레이 + 컨텍스트 메뉴             │
│ ├─ electron-updater를 통한 자동 업데이트     │
│ ├─ 콘텐츠 보안 정책 (세션 헤더)              │
│ └─ 시크릿 부트스트랩 (JWT / API_KEY_SECRET)  │
└──────────────────────────────────────────────┘
            ↕ IPC 브리지 (electron/preload.js)
┌──────────────────────────────────────────────┐
│ 렌더러 (Next.js 대시보드)                    │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
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
| `npm run electron:dev`            | `npm run dev`를 시작하고 `localhost:20128`을 기다린 후 Electron을 실행   |
| `npm run electron:build`          | Next.js를 빌드한 후 현재 OS용 `electron-builder`를 실행                  |
| `npm run electron:build:win`      | Windows NSIS 설치 프로그램 + 포터블 버전(x64)을 빌드                     |
| `npm run electron:build:mac`      | macOS DMG(Intel + Apple Silicon)를 빌드                                  |
| `npm run electron:build:linux`    | Linux AppImage + DEB(x64 + arm64)를 빌드                                 |
| `npm run electron:smoke:packaged` | 패키징된 바이너리를 실행하고 `/login`에서 HTTP 200 응답을 확인한 후 종료 |

`electron/` 워크스페이스에서는 다음 항목도 제공합니다:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs`를 실행
- `npm run build:mac-x64` / `build:mac-arm64` — 단일 아키텍처용 macOS 빌드
- `npm run pack` — 로컬 테스트용 디렉터리 전용 빌드(설치 프로그램 없음)

## 디렉터리 구조

```
electron/
├── package.json              # Electron 의존성 + electron-builder 구성
├── main.js                   # 메인 프로세스(24 KB — 아래 주석 참조)
├── preload.js                # contextBridge IPC 브리지
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI 타입
├── README.md                 # 워크스페이스 내 참고 사항
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder 출력(gitignored)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # .next/electron-standalone 번들 준비
└── dev/
    └── smoke-electron-packaged.mjs       # 빌드 후 스모크 테스트
```

`main.js`와 `preload.js`는 모두 TypeScript가 아닌 **CommonJS `.js` 파일**입니다.
렌더러 측 타입 정의는 `electron/types.d.ts`에 있습니다.

## IPC 브리지(`preload.js`)

preload는 `contextIsolation: true` 및 `nodeIntegration: false`로 설정된 `contextBridge`를
사용하여 `window.electronAPI`에 허용 목록 기반 API를 노출합니다.

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

receive 헬퍼는 `removeAllListeners`에 의존하는 대신 **해제 함수**를 반환합니다.
이를 통해 React 컴포넌트가 다시 마운트될 때 리스너가 누적되는 것을 방지합니다.

## 서버 수명 주기

`main.js`는 시스템 Node와의 네이티브 모듈 ABI 불일치를 방지하기 위해 Electron Node
런타임으로 Next.js 독립 실행형 번들을 직접 생성합니다.

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
- `before-quit`는 정상적인 SIGTERM 종료(WAL 체크포인트)를 위해 최대 5초간 기다린 후 SIGKILL을 전송합니다.
- 트레이의 포트 전환기(`20128`, `3000`, `8080`)는 서버를 중지하고 다시 시작한 다음 BrowserWindow를 새로고침합니다.

## 무설정 시크릿 부트스트랩

처음 실행할 때 메인 프로세스는 누락된 시크릿을 자동으로 생성하고 영구 저장합니다.

| 시크릿                   | 소스                                                                               |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                           |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (암호화된 자격 증명이 이미 존재하면 거부) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                           |

`<DATA_DIR>/server.env`에 저장됩니다. `DATA_DIR`은 다음과 같이 결정됩니다.

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` 또는 `~/.omniroute`
- macOS: `~/.omniroute`

## 환경 파일 검색

서버를 생성하기 전에 메인 프로세스(`electron/main.js`의 `getPreferredEnvFilePath()`)는 다음 중 존재하는 첫 번째 `.env` 파일 **하나**를 선택합니다.

1. 앱이 실행된 환경에 `DATA_DIR`이 설정되어 있으면 `$DATA_DIR/.env`.
2. 위와 동일한 기본값을 사용하는 `<resolved DATA_DIR>/.env`: Windows에서는 `%APPDATA%\omniroute\.env`, Linux 및 macOS에서는 `$XDG_CONFIG_HOME/omniroute/.env` 또는 `~/.omniroute/.env`.
3. 프로세스 작업 디렉터리의 `.env`.

메인 프로세스는 해당 파일만 읽으며, 이후 후보는 병합하지 않습니다. 그러면 서버 환경은 다음 우선순위로 구성됩니다(높은 순서부터).

1. Electron 프로세스 환경(앱을 실행한 항목으로부터 상속된 변수).
2. 선택된 `.env` 파일.
3. `<DATA_DIR>/server.env`(위의 부트스트랩 시크릿).

프로세스 환경은 앱이 시작될 때 캡처되므로, 앱이 실행 중인 동안 설정된 시스템 또는 사용자 환경 변수는 창이 닫힌 후 트레이에 남아 있는 동안 설정된 경우를 포함하여 앱을 완전히 종료하고 다시 실행하기 전까지 서버에 전달되지 않습니다. `CONTEXT_LENGTH_<PROVIDER>`와 같은 런타임 설정값은
[환경 변수: 공급자별 컨텍스트 길이](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)를 참조하여 `.env` 파일을 사용하는 것이 좋으며, 이후 앱을 완전히 종료한 다음(트레이에서 **종료**) 다시 실행하세요.

## 창 및 트레이

- `BrowserWindow`: 1400×900(최소 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, 트래픽 라이트 위치는 `{ x: 16, y: 16 }`.
- Windows/Linux: 네이티브 제목 표시줄.
- 닫기 버튼을 누르면 트레이로 최소화됩니다. 트레이 메뉴에는 **OmniRoute 열기**, **대시보드 열기**(외부 브라우저), **서버 포트** 하위 메뉴, **업데이트 확인**, **종료**가 있습니다.

## 콘텐츠 보안 정책

`session.defaultSession.webRequest.onHeadersReceived`를 통해 설정됩니다. 주요 지시문은 다음과 같습니다.

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- 개발 모드에서는 `script-src`에만 `'unsafe-eval'` 추가

## 자동 업데이트

GitHub 공급자(`diegosouzapw/OmniRoute`)와 함께 `electron-updater`를 사용합니다.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- `update-status` IPC를 통해 렌더러에 전달되는 이벤트:
  `checking`, `available`, `not-available`, `downloading`(`percent` 포함), `downloaded`, `error`
- `installUpdate()`는 서버를 종료한 다음 `autoUpdater.quitAndInstall()`을 호출합니다.
- 개발 모드에서는 건너뜁니다(`!app.isPackaged`).

## 빌드 파이프라인

1. `npm run build` → `.next/standalone`에 Next.js 독립 실행형 빌드를 생성합니다.
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone`에 다시 스테이징하고, 번들을 재배치할 수 있도록 `server.js` + `required-server-files.json` 내부의 절대 경로를 다시 작성합니다.
3. `electron-builder`는 `main.js`, `preload.js`, `node_modules` 및 `extraResources: { ../.next/electron-standalone → app }`을 패키징합니다.

### 빌드 대상

| OS      | 대상                                      |
| ------- | ----------------------------------------- |
| Windows | NSIS 설치 프로그램 + 포터블 버전(x64)     |
| macOS   | DMG(Intel + arm64, Applications로 드래그) |
| Linux   | AppImage + DEB(x64 + arm64)               |

NSIS 설정: `oneClick: false`이며, 사용자가 설치 디렉터리를 선택할 수 있고 바탕 화면 및 시작 메뉴 바로 가기를 생성합니다.

## 패키징된 빌드 스모크 테스트

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- 현재 플랫폼에 맞는 패키징된 바이너리를 `electron/dist-electron/`에서 자동으로 찾습니다.
- 개발자 데이터에 영향을 주지 않도록 격리된 `HOME`/`APPDATA`/`XDG_*` 디렉터리를 사용하여 실행합니다.
- 45초 이내에 `http://127.0.0.1:20128/login`에서 HTTP 200 응답이 반환되는지 폴링합니다.
- stderr/stdout에서 치명적 패턴(`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` 등)을 감시합니다.
- 준비가 완료된 후 2초 동안 런타임이 안정적으로 유지되기를 기다린 다음 SIGTERM을 전송하고 포트가 해제될 때까지 기다립니다.
- CI에서는 `--no-sandbox --disable-gpu`를 자동으로 전달합니다(Linux에서는 `--disable-dev-shm-usage`도 전달).

환경 변수 재정의: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## 코드 서명

`electron/package.json`은 서명 자격 증명을 직접 연결하지 **않습니다**. 환경 변수를 통해 `electron-builder`에 전달하세요.

### macOS

```bash
export APPLE_ID=<이메일>
export APPLE_APP_SPECIFIC_PASSWORD=<비밀번호>
export APPLE_TEAM_ID=<ID>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<인증서-비밀번호>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<인증서-비밀번호>
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

| 증상                                                                        | 해결 방법                                                                                                                                            |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron 메이저 버전 업데이트 후 `Cannot find module 'better-sqlite3'` 발생 | better-sqlite3 v13은 Node-API 사전 빌드를 제공합니다. 루트에서 `npm install`과 `prepare:bundle`을 다시 실행하세요(현재 플랫폼의 사전 빌드를 검증함). |
| 네이티브 모듈에서 `ERR_DLOPEN_FAILED` 발생                                  | `prepare:bundle`을 다시 실행하세요. 현재 플랫폼에 필요한 Node-API 사전 빌드가 없으면 즉시 실패합니다.                                                |
| Linux에서 빈 창이 표시됨                                                    | Next.js 서버가 실제로 PORT에 바인딩되었는지 확인하세요(`[Server]` 로그 확인).                                                                        |
| macOS 공증이 중단됨                                                         | `APPLE_*` 변수가 `.env`에만 설정된 것이 아니라 내보내졌는지 확인하세요.                                                                              |
| Windows SmartScreen 경고                                                    | EV 인증서로 서명하거나, 사용자가 마우스 오른쪽 버튼을 클릭한 후 → "그래도 실행"을 선택하도록 안내하세요.                                             |
| 포트 사용 중 오류로 스모크 테스트 실패                                      | `electron:smoke:packaged`를 실행하기 전에 20128에서 실행 중인 로컬 개발 서버를 중지하세요.                                                           |

## 참고 자료

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- 소스: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- 헬퍼: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
