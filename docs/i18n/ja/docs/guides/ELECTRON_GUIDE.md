# Electron Desktop Guide (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **信頼できる唯一の情報源:** `electron/` ワークスペース
> **最終更新日:** 2026-06-28 — v3.8.40

OmniRoute は、**Electron 41** + **electron-builder 26.10** を基盤として構築された、クロスプラットフォーム対応のデスクトップアプリ（Windows / macOS / Linux）を提供します。デスクトップアプリは Next.js のスタンドアロンサーバーを子プロセスとして起動し、そのサーバーを `BrowserWindow` で表示します。また、システムトレイ、自動更新機能、IPC ブリッジ、設定不要のシークレット初期化機能も追加します。

## アーキテクチャ

```
┌──────────────────────────────────────────────┐
│ Electron メインプロセス (electron/main.js)   │
│ ├─ 単一インスタンスロック                    │
│ ├─ 子プロセス: Next.js スタンドアロンサーバー│
│ │   (Electron の Node ランタイムで起動)       │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ システムトレイ + コンテキストメニュー     │
│ ├─ electron-updater による自動更新            │
│ ├─ Content Security Policy (セッションヘッダー)│
│ └─ シークレット初期化 (JWT / API_KEY_SECRET) │
└──────────────────────────────────────────────┘
            ↕ IPC ブリッジ (electron/preload.js)
┌──────────────────────────────────────────────┐
│ レンダラー (Next.js ダッシュボード)           │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## バージョン

`electron/package.json` で確認済み:

| パッケージ         | バージョン                                                       |
| ------------------ | ---------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                        |
| `electron-builder` | `^26.15.3`                                                       |
| `electron-updater` | `^6.8.9`                                                         |
| `better-sqlite3`   | ルート `^13.0.2` (Node-API プリビルド — Electron のリビルド不要) |
| アプリバージョン   | `3.8.0`                                                          |
| アプリ ID          | `online.omniroute.desktop`                                       |
| 製品名             | `OmniRoute`                                                      |

## スクリプト（ルートの `package.json`）

| スクリプト                        | 目的                                                                              |
| --------------------------------- | --------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` を開始し、`localhost:20128` の起動を待ってから Electron を起動      |
| `npm run electron:build`          | Next.js をビルドしてから、現在の OS 向けに `electron-builder` を実行              |
| `npm run electron:build:win`      | Windows NSIS インストーラー + ポータブル版（x64）をビルド                         |
| `npm run electron:build:mac`      | macOS DMG（Intel + Apple Silicon）をビルド                                        |
| `npm run electron:build:linux`    | Linux AppImage + DEB（x64 + arm64）をビルド                                       |
| `npm run electron:smoke:packaged` | パッケージ済みバイナリを起動し、`/login` が HTTP 200 を返すことを確認してから終了 |

`electron/` ワークスペースでは、次のスクリプトも公開されています:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` を実行
- `npm run build:mac-x64` / `build:mac-arm64` — 単一アーキテクチャ向けの macOS ビルド
- `npm run pack` — ローカルテスト用のディレクトリのみのビルド（インストーラーなし）

## ディレクトリ構成

```
electron/
├── package.json              # Electron の依存関係 + electron-builder の設定
├── main.js                   # メインプロセス（24 KB — 下記の注釈を参照）
├── preload.js                # contextBridge IPC ブリッジ
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI の型
├── README.md                 # ワークスペース内のメモ
├── assets/                   # icon.png、icon.ico、icon.icns、tray-icon.png
└── dist-electron/            # electron-builder の出力（gitignore 対象）

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # .next/electron-standalone バンドルをステージング
└── dev/
    └── smoke-electron-packaged.mjs       # ビルド後のスモークテスト
```

`main.js` と `preload.js` はどちらも TypeScript ではなく、**CommonJS `.js` ファイル**です。
レンダラー側の型定義は `electron/types.d.ts` にあります。

## IPC ブリッジ（`preload.js`）

preload は、`contextIsolation: true` および `nodeIntegration: false` を使用し、
`contextBridge` 経由でホワイトリスト登録された API を `window.electronAPI` に公開します。

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

公開されるメソッド：

| レンダラーからの呼び出し                                          | 種類                       |
| ----------------------------------------------------------------- | -------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                     |
| `openExternal(url)`                                               | invoke                     |
| `getDataDir()`                                                    | invoke                     |
| `restartServer()`                                                 | invoke                     |
| `getAppVersion()`                                                 | invoke                     |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                     |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                       |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive（disposer を返す） |

receive ヘルパーは `removeAllListeners` に依存せず、**disposer 関数**を返します。これにより、
React コンポーネントが再マウントされた際にリスナーが蓄積するのを防ぎます。

## サーバーのライフサイクル

`main.js` は、システムの Node とのネイティブモジュール ABI の不一致を回避するため、
Electron の Node ランタイムを使用して Next.js のスタンドアロンバンドルを直接起動します。

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

主なポイント：

- `waitForServer()` は、ウィンドウを表示する前に最大 30 秒間 URL をポーリングします（コールドスタート時に空白画面が表示されません）。
- `stdio: "pipe"` は stdout/stderr をキャプチャします。準備完了を示すフレーズ（`Ready` / `listening`）を検出すると、IPC 経由で `server-status: running` を送信します。
- `before-quit` は、正常な SIGTERM（WAL チェックポイント）の完了を最大 5 秒間待機し、その後 SIGKILL を送信します。
- トレイのポート切り替え機能（`20128`、`3000`、`8080`）は、サーバーを停止して再起動した後、BrowserWindow を再読み込みします。

## ゼロコンフィグのシークレット初期化

初回起動時に、メインプロセスが不足しているシークレットを自動生成し、永続化します。

| シークレット             | 生成元                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                   |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")`（暗号化済みの認証情報がすでに存在する場合は拒否） |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                   |

`<DATA_DIR>/server.env` に保存されます。`DATA_DIR` は以下の場所に解決されます。

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` または `~/.omniroute`
- macOS: `~/.omniroute`

## ウィンドウとトレイ

- `BrowserWindow`: 1400×900（最小 1024×700）、`backgroundColor: "#0a0a0a"`。
- macOS: `titleBarStyle: "hiddenInset"`、ウィンドウコントロールの位置は `{ x: 16, y: 16 }`。
- Windows/Linux: ネイティブタイトルバー。
- 閉じるボタンを押すとトレイに最小化されます。トレイメニューには、**OmniRoute を開く**、**ダッシュボードを開く**（外部ブラウザー）、**サーバーポート**サブメニュー、**アップデートを確認**、**終了**があります。

## コンテンツセキュリティポリシー

`session.defaultSession.webRequest.onHeadersReceived` を介して設定されます。主なディレクティブは次のとおりです。

- `frame-ancestors 'none'`、`object-src 'none'`、`child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- 開発モードでは、`script-src` にのみ `'unsafe-eval'` が追加されます

## 自動アップデート

GitHub プロバイダー（`diegosouzapw/OmniRoute`）とともに `electron-updater` を使用します。

- `autoDownload = false`、`autoInstallOnAppQuit = true`
- イベントは `update-status` IPC を介してレンダラーに転送されます。
  `checking`、`available`、`not-available`、`downloading`（`percent` 付き）、`downloaded`、`error`
- `installUpdate()` はサーバーを停止してから `autoUpdater.quitAndInstall()` を呼び出します
- 開発モード（`!app.isPackaged`）ではスキップされます

## ビルドパイプライン

1. `npm run build` → `.next/standalone` に Next.js スタンドアロンを生成します。
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone` に再配置し、バンドルを再配置可能にするため、`server.js` と `required-server-files.json` 内の絶対パスを書き換えます。
3. `electron-builder` が `main.js`、`preload.js`、`node_modules`、および `extraResources: { ../.next/electron-standalone → app }` をパッケージ化します。

### ビルドターゲット

| OS      | ターゲット                                    |
| ------- | --------------------------------------------- |
| Windows | NSIS インストーラー + ポータブル版（x64）     |
| macOS   | DMG（Intel + arm64、Applications へドラッグ） |
| Linux   | AppImage + DEB（x64 + arm64）                 |

NSIS の設定: `oneClick: false`。ユーザーがインストール先ディレクトリを選択でき、デスクトップとスタートメニューにショートカットを作成します。

## パッケージ化されたビルドのスモークテスト

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- 現在のプラットフォーム向けに、`electron/dist-electron/` 内のパッケージ化されたバイナリを自動検出します。
- 開発者データに影響を与えないよう、分離された `HOME`/`APPDATA`/`XDG_*` ディレクトリを使用して起動します。
- 45 秒以内に HTTP 200 が返されるか、`http://127.0.0.1:20128/login` をポーリングします。
- stderr/stdout で致命的なパターン（`Cannot find module`、`MODULE_NOT_FOUND`、`ERR_DLOPEN_FAILED`、`Failed to start server` など）を監視します。
- 準備完了後、安定した実行状態が 2 秒続くまで待機し、その後 SIGTERM を送信してポートが解放されるまで待機します。
- CI では、`--no-sandbox --disable-gpu`（Linux ではさらに `--disable-dev-shm-usage`）を自動的に渡します。

環境変数による上書き: `ELECTRON_SMOKE_APP_EXECUTABLE`、`ELECTRON_SMOKE_URL`、`ELECTRON_SMOKE_TIMEOUT_MS`、`ELECTRON_SMOKE_SETTLE_MS`、`ELECTRON_SMOKE_DATA_DIR`、`ELECTRON_SMOKE_KEEP_DATA`、`ELECTRON_SMOKE_STREAM_LOGS`。

## コード署名

`electron/package.json` には署名用の認証情報が直接設定されていません。環境変数を介して `electron-builder` に渡してください。

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

AppImage の署名は任意です。署名する場合は `LINUX_GPG_KEY` を設定してください。

## 配布

成果物は `electron/dist-electron/` に出力されます。

- `OmniRoute.Setup.X.Y.Z.exe`、`OmniRoute X.Y.Z.exe`（Windows）
- `OmniRoute-X.Y.Z-mac.dmg`、`OmniRoute-X.Y.Z-arm64-mac.dmg`（macOS）
- `OmniRoute-X.Y.Z.AppImage`、`omniroute-desktop_X.Y.Z_amd64.deb`（Linux）

リリースは GitHub Releases（`diegosouzapw/OmniRoute`）に公開されます。`electron-updater` もそこで新しいバージョンを確認します。

## トラブルシューティング

| 症状                                                                                 | 対処方法                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron のメジャーアップデート後に `Cannot find module 'better-sqlite3'` が発生する | better-sqlite3 v13 には Node-API のビルド済みバイナリが含まれています。ルートで `npm install` と `prepare:bundle` を再実行してください（現在のプラットフォーム用のビルド済みバイナリが検証されます） |
| ネイティブモジュールで `ERR_DLOPEN_FAILED` が発生する                                | `prepare:bundle` を再実行してください。現在のプラットフォーム用の Node-API ビルド済みバイナリがない場合、即座に失敗します                                                                            |
| Linux でウィンドウが空白になる                                                       | Next.js サーバーが実際に PORT にバインドされていることを確認してください（`[Server]` ログを確認）                                                                                                    |
| macOS の公証処理が停止する                                                           | `APPLE_*` 変数が `.env` 内にあるだけでなく、エクスポートされていることを確認してください                                                                                                             |
| Windows SmartScreen の警告が表示される                                               | EV 証明書で署名するか、右クリック → 「Run anyway」を選択するようユーザーに案内してください                                                                                                           |
| ポート使用中のためスモークテストが失敗する                                           | `electron:smoke:packaged` を実行する前に、20128 で動作しているローカル開発サーバーを停止してください                                                                                                 |

## 関連項目

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- ソース：`electron/main.js`、`electron/preload.js`、`electron/package.json`
- ヘルパー：`scripts/build/prepare-electron-standalone.mjs`、`scripts/dev/smoke-electron-packaged.mjs`
