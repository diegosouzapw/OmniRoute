# Termux Headless Setup (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute 可透過 Termux 在 Android 上以無頭伺服器方式執行。Termux 不支援 Electron 桌面應用程式，但可透過本機瀏覽器或相同網路上的其他裝置使用 Web 儀表板和 OpenAI 相容 API。

## 先決條件

從 F-Droid 或 GitHub releases 安裝 Termux，接著更新套件，並安裝 `better-sqlite3` 等原生相依套件所需的建置工具。

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js 版本：**OmniRoute 需要 Node `>=22.22.2 <23 || >=24.0.0 <27`（與 `package.json` 中的 `engines` / `SUPPORTED_NODE_RANGE` 相符）。Termux 的 `nodejs-lts` 通常提供 Node 20 LTS，而該版本已**不再受到支援**——請改為執行 `pkg install nodejs` 安裝目前版本，並確認 `node --version` 顯示 22.x/24.x+ 系列版本。

如果原生套件編譯失敗，請重新執行上述 `pkg install` 命令，然後再次嘗試安裝 OmniRoute。

## 安裝

直接執行最新發布的套件：

```bash
npx -y omniroute@latest
```

也可以全域安裝：

```bash
npm install -g omniroute
omniroute
```

## 執行

以無頭伺服器模式啟動 OmniRoute：

```bash
omniroute
```

或：

```bash
npx omniroute
```

儀表板會監聽：

```text
http://localhost:20128
```

在 Android 瀏覽器中開啟該 URL。如果在 Termux 內執行用戶端，請使用相同的主機和連接埠作為 OpenAI 相容的基底 URL。

## 背景執行

若要以簡單的背景程序執行：

```bash
nohup omniroute > omniroute.log 2>&1 &
```

若要停止：

```bash
pkill -f omniroute
```

若要在裝置開機後自動啟動，請安裝 Termux:Boot 附加元件並建立開機指令碼：

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Android 的電池最佳化功能可能會停止長時間執行的背景程序。如果預期伺服器需持續上線，請停用 Termux 的電池最佳化。

## 從其他裝置存取

找出手機在 WiFi 網路上的 IP 位址：

```bash
ip addr show wlan0
```

接著從其他裝置開啟儀表板：

```text
http://PHONE_IP:20128
```

例如：

```text
http://192.168.1.50:20128
```

請讓手機和用戶端保持連線至同一個受信任的網路。如果要從手機外部公開 OmniRoute，請啟用 API 金鑰及儀表板驗證。

## 資料目錄

依預設，OmniRoute 會將資料儲存在 Termux 主目錄下，並遵循 Linux 所使用的相同伺服器端資料路徑行為。若要將資料庫放置在明確指定的位置：

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## 限制

- Electron 無法在 Termux 中執行。
- 不提供系統匣或桌面整合功能。
- 此設定僅供伺服器使用：請使用瀏覽器儀表板。
- 原生相依套件可能需要在本機編譯。
- 記憶體較少的 Android 裝置可能需要減少並行請求數。
- MITM／系統憑證功能可能需要在 Termux 外部進行 Android 層級的信任存放區設定。

## 疑難排解

### 不支援的平台：android（每個請求都傳回 HTTP 500）

**症狀：**`omniroute` / `omniroute serve` 會顯示 `✔ OmniRoute is running!`，但每個儀表板或 API 請求都會傳回單純的 `500 Internal Server Error`。`~/.omniroute/logs/application/app.log` 保持空白，`APP_LOG_LEVEL=debug` 不會輸出任何有用資訊，而回應本文是純文字（`Internal Server Error`），沒有 JSON 詳細資訊。

**原因：**某些 Termux/Node 組建會回報 `process.platform === "android"`。Next.js 的 `getCacheDirectory()` 不會處理該平台：它要求 `~/.cache`（或通用 tmp 目錄）必須_事先_存在，否則在載入檢測掛鉤時會失敗，並顯示：

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

由於掛鉤從未載入，記錄功能也不會啟動——因此這個 500 錯誤看起來完全無法診斷。OmniRoute 會在 Next.js 啟動前，於 CLI 進入點建立 `~/.cache`（並在尚未設定時設定 `XDG_CACHE_HOME`），讓此探測作業可在 Android/Termux 上成功執行。

**受支援的解決方式（無須修補套件）：**

```bash
mkdir -p ~/.cache
omniroute serve
```

目前的 OmniRoute 組建會由 CLI 在 Android/Termux 上自動執行此操作——全新的 `npx -y omniroute@latest`／全域安裝應不需要手動執行此步驟。如果升級後仍看到此錯誤，請依照上述方式建立一次 `~/.cache`，然後重新啟動。

**請勿**修補 `dist/server.js` 以強制設定 `process.platform = "linux"`。這類套件修補會在每次重新安裝／升級時遭到覆寫，而且只要快取目錄存在，就不需要進行此修補。

### better-sqlite3 建置錯誤

安裝 Termux 建置工具鏈：

```bash
pkg install nodejs python build-essential
```

接著重新執行：

```bash
npx -y omniroute@latest
```

### 連接埠已被使用

檢查預設連接埠上正在監聽的程序：

```bash
ss -ltnp | grep 20128
```

停止舊程序：

```bash
pkill -f omniroute
```

### 無法從其他裝置連線至儀表板

確認兩部裝置都位於相同的 WiFi 網路上，然後從 Termux 進行測試：

```bash
curl http://localhost:20128
```

如果本機可以存取，但區域網路無法存取，請檢查 Android 熱點／WiFi 隔離功能，以及手機上的任何防火牆或 VPN 設定檔。
