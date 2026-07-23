---
title: "OmniRoute Fly.io 部署指南（繁體中文）"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute Fly.io 部署指南（繁體中文）

🌐 **語言:** 🇺🇸 [English](../../../../docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../da/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../de/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../es/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../he/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../id/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../it/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../no/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../te/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../th/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FLY_IO_DEPLOYMENT_GUIDE.md)

本文件說明 OmniRoute 在 Fly.io 上的實際部署流程，涵蓋兩種情境：

- 首次將目前專案部署到 Fly.io
- 發布後續程式碼更新
- 新專案遵循相同的部署工作流程

本指南基於目前專案經過驗證的有效配置。應用程式名稱為 `omniroute`。

---

## 1. 部署目標

- 平台：Fly.io
- 部署方式：本機 `flyctl` 直接發布
- 執行環境：使用儲存庫中現有的 `Dockerfile` 和 `fly.toml`
- 資料持久化：Fly Volume 掛載至 `/data`
- 存取 URL：`https://omniroute.fly.dev/`

---

## 2. 目前專案關鍵配置

目前儲存庫中的 `fly.toml` 已確認包含以下關鍵項目：

```toml
app = 'omniroute'
primary_region = 'sin'

[[mounts]]
  source = 'data'
  destination = '/data'

[processes]
  app = 'node run-standalone.mjs'

[http_service]
  internal_port = 20128

[env]
  TZ = "Asia/Shanghai"
  HOST = "0.0.0.0"
  HOSTNAME = "0.0.0.0"
  BIND = "0.0.0.0"
```

注意事項：

- `app = 'omniroute'` 決定部署目標是哪個 Fly 應用程式
- `destination = '/data'` 決定持久化磁碟區的掛載目錄
- 此專案必須設定 `DATA_DIR=/data`，否則資料庫和金鑰會寫入容器的暫存目錄

---

## 3. 前置需求

### 3.1 安裝 Fly CLI

Windows PowerShell：

```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

如果安裝腳本在您的環境中失敗，您也可以手動下載 `flyctl` 二進位檔並將其加入 `PATH`。

### 3.2 登入您的 Fly 帳戶

```powershell
flyctl auth login
```

### 3.3 驗證登入狀態

```powershell
flyctl auth whoami
flyctl version
```

---

## 4. 首次部署目前專案

### 4.1 複製程式碼並進入目錄

```powershell
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
```

### 4.2 確認應用程式名稱

開啟 `fly.toml` 並確認以下行：

```toml
app = 'omniroute'
```

如果您要部署到自己的新應用程式，可以將其變更為全域唯一的名稱，例如：

```toml
app = 'omniroute-yourname'
```

注意事項：

- 請確保您在控制台中看到的應用程式與 `fly.toml` 中的 `app` 值相符
- 如果您之前使用過不同的名稱（例如 `oroute`），請不要與 `omniroute` 混淆

### 4.3 建立應用程式

如果應用程式尚未存在：

```powershell
flyctl apps create omniroute
```

如果您變更了應用程式名稱，請將 `omniroute` 替換為您選擇的名稱。

### 4.4 首次部署

```powershell
flyctl deploy
```

---

## 5. 必要參數

本專案建議至少在 Fly.io 上配置以下參數。

### 5.1 已驗證的參數

以下參數已在目前 `omniroute` 應用程式的實際部署中使用：

- `API_KEY_SECRET`
- `DATA_DIR`
- `JWT_SECRET`
- `MACHINE_ID_SALT`
- `NEXT_PUBLIC_BASE_URL`
- `OMNIROUTE_WS_BRIDGE_SECRET`（生產環境必填 — 用於 WebSocket 橋接認證）
- `STORAGE_ENCRYPTION_KEY`

### 5.2 關於 `INITIAL_PASSWORD`

目前專案未設定 `INITIAL_PASSWORD`，因為此部署不需要。

如果未設定：

- 啟動日誌會顯示預設密碼為 `CHANGEME`
- 您應在部署後盡快在系統設定中變更登入密碼

如果您想在無人值守的情況下初始化後端密碼，可以之後再新增：

- `INITIAL_PASSWORD`

---

## 6. 建議參數

### 6.1 機密配置

以下變數建議用於 Fly Secrets：

| 變數                          | 建議           | 說明                                |
| ----------------------------- | -------------- | ----------------------------------- |
| `API_KEY_SECRET`              | 必填           | 用於 API 金鑰產生與驗證             |
| `JWT_SECRET`                  | 必填           | 用於登入工作階段和 JWT 簽章         |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | 生產環境必填   | WebSocket 橋接認證密鑰              |
| `STORAGE_ENCRYPTION_KEY`      | 強烈建議       | 靜態加密敏感連線資訊                |
| `MACHINE_ID_SALT`             | 建議           | 產生穩定的機器識別碼                |
| `INITIAL_PASSWORD`            | 可選           | 首次部署時設定初始後端密碼          |
| OAuth/API 私有憑證            | 視需要而定     | 外部平台認證配置                    |

### 6.2 目前專案的建議值

| 變數                   | 建議值                      |
| ---------------------- | --------------------------- |
| `DATA_DIR`             | `/data`                     |
| `NEXT_PUBLIC_BASE_URL` | `https://omniroute.fly.dev` |

注意事項：

- `DATA_DIR=/data` 至關重要，必須與 Fly Volume 掛載點相符
- `NEXT_PUBLIC_BASE_URL` 由排程器、前端回呼等使用

### 6.3 OAuth 回呼 URL 配置

如果您需要在 Fly.io 部署上啟用基於 OAuth 的提供商（例如 Antigravity、Gemini、Cursor），請確保以下兩點：

1. **將 `NEXT_PUBLIC_BASE_URL` 設定為您的公開 HTTPS 網域**

   ```powershell
   flyctl secrets set NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev -a omniroute
   ```

   如果您使用自訂網域，請替換為對應的網域（例如 `https://omniroute.yourdomain.com`）。

2. **在提供商控制台中配置回呼 URL**

   所有 OAuth 提供商共用單一回呼路徑 `/callback` — 沒有每個提供商的獨立回呼路由：

   ```text
   <NEXT_PUBLIC_BASE_URL>/callback
   ```

   例如，不論是 Gemini、Antigravity、Cursor 或 GitLab Duo：
   - `https://omniroute.fly.dev/callback`

   如果 `NEXT_PUBLIC_BASE_URL` 與註冊在提供商的回呼 URL 不符，OAuth 流程將在瀏覽器重新導向步驟失敗。

---

## 7. 單一命令密鑰設定

以下命令會產生安全隨機值，並一步將目前專案的所有必要參數寫入 Fly Secrets。

注意事項：

- 不包含 `INITIAL_PASSWORD`
- 適用於目前專案 `omniroute`

```powershell
$apiKeySecret = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$jwtSecret = [Convert]::ToHexString((1..64 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$machineIdSalt = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$storageKey = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$wsBridgeSecret = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()

flyctl secrets set `
  API_KEY_SECRET=$apiKeySecret `
  JWT_SECRET=$jwtSecret `
  MACHINE_ID_SALT=$machineIdSalt `
  STORAGE_ENCRYPTION_KEY=$storageKey `
  OMNIROUTE_WS_BRIDGE_SECRET=$wsBridgeSecret `
  DATA_DIR=/data `
  NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev `
  -a omniroute
```

在 Linux / macOS 上，也可以使用 `openssl rand -hex 32`：

```bash
flyctl secrets set OMNIROUTE_WS_BRIDGE_SECRET=$(openssl rand -hex 32) -a omniroute
```

注意事項：

- `OMNIROUTE_WS_BRIDGE_SECRET` 在生產環境中為必填；缺少此項將導致 WebSocket 橋接通話失敗

如果您也想設定初始密碼：

```powershell
flyctl secrets set INITIAL_PASSWORD=your-strong-password -a omniroute
```

---

## 8. 檢視目前參數

```powershell
flyctl secrets list -a omniroute
```

如果控制台中的「Secrets」頁面未顯示預期的變數，請檢查：

- 您正在檢視的是 `omniroute` 應用程式
- `fly.toml` 中的 `app` 值與控制台中的應用程式相符

---

## 9. 後續更新與發布

程式碼更新後，發布流程很簡單：

```powershell
git pull
flyctl deploy
```

如果您只需要更新參數而不變更程式碼：

```powershell
flyctl secrets set KEY=value -a omniroute
```

Fly 會自動執行機器的滾動更新。

### 9.1 追蹤上游儲存庫更新同時保留 Fork 的 `fly.toml`

如果目前儲存庫是 fork，且您想同步上游 `https://github.com/diegosouzapw/OmniRoute` 的更新，請遵循以下工作流程。

首先，確認您的遠端倉庫：

```powershell
git remote -v
```

您應該會看到：

- `origin` 指向您自己的 fork
- `upstream` 指向原始儲存庫

如果未配置 `upstream`，請新增：

```powershell
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git
```

在與上游同步之前，請先擷取最新的提交和標籤：

```powershell
git fetch upstream --tags
```

檢查目前版本和上游標籤：

```powershell
git describe --tags --always
git show --no-patch --oneline v3.4.7
```

> 注意：目前專案版本為 `v3.8.0`。以下 `v3.4.7` 的引用僅作為歷史範例保留。實際發布時，請使用 `:latest` 或目前版本標籤（例如 `:v3.8.0`）。

如果您想合併最新的上游 `main`，同時強制保留您 fork 的 `fly.toml`，請遵循以下工作流程：

```powershell
git merge upstream/main
git checkout HEAD~1 -- fly.toml
git add -- fly.toml
git commit -m "chore(deploy): keep fork fly.toml"
git push origin main
```

注意事項：

- `git merge upstream/main` 會同步原始儲存庫的最新程式碼
- `git checkout HEAD~1 -- fly.toml` 會從合併前還原您 fork 自己的 `fly.toml`
- 如果上游未修改 `fly.toml`，此步驟不會引入任何差異
- 如果上游修改了 `fly.toml`，此步驟可確保您的 Fly 應用程式名稱、磁碟區掛載、地區和其他 fork 特定的部署配置不會被覆寫

如果您想對齊特定的發布標籤（例如 `v3.4.7`），請先確認該標籤已包含在 `upstream/main` 中：

```powershell
git merge-base --is-ancestor v3.4.7 upstream/main
```

成功回傳表示 `upstream/main` 已包含該版本；您可以直接合併 `upstream/main`。

### 9.2 同步上游後的標準發布順序

與原始儲存庫同步後，請遵循此建議的發布順序：

1. `git fetch upstream --tags`
2. `git merge upstream/main`
3. 還原 fork 的 `fly.toml`
4. `git push origin main`
5. `flyctl deploy`
6. `flyctl status -a omniroute`
7. `flyctl logs --no-tail -a omniroute`

這是升級目前專案至 `v3.4.7` 時使用的實際工作流程（範例引用的是舊版本；目前實際版本為 `v3.8.0`）。

---

## 10. 部署後檢查

### 10.1 檢查應用程式狀態

```powershell
flyctl status -a omniroute
```

### 10.2 檢視啟動日誌

```powershell
flyctl logs --no-tail -a omniroute
```

### 10.3 驗證網站可存取性

```powershell
try {
  (Invoke-WebRequest -Uri "https://omniroute.fly.dev" -MaximumRedirection 5 -UseBasicParsing).StatusCode
} catch {
  if ($_.Exception.Response) {
    $_.Exception.Response.StatusCode.value__
  } else {
    throw
  }
}
```

回傳值為 `200` 表示網站正常回應。

---

## 11. 成功指標

成功部署後，日誌應顯示類似以下內容：

```text
[bootstrap] Secrets persisted to: /data/server.env
[DB] SQLite database ready: /data/storage.sqlite
```

這兩點至關重要：

- `/data/server.env` 確認執行時期密鑰已寫入持久化磁碟區
- `/data/storage.sqlite` 確認資料庫已寫入持久化磁碟區

如果您看到 `/app/data/...`，表示 `DATA_DIR` 配置錯誤，必須立即修正。

---

## 12. 常見問題

### 12.1 「Secrets」頁面為空

通常有兩個原因：

- 您尚未執行 `flyctl secrets set`
- 您正在檢視不同的應用程式（例如 `oroute` 而非 `omniroute`）

### 12.2 `flyctl deploy` 回報 `app not found`

請先建立應用程式：

```powershell
flyctl apps create omniroute
```

### 12.3 `fly.toml` 解析失敗

請檢查以下項目：

- 註解中是否有亂碼字元
- TOML 的引號和縮排是否正確

### 12.4 資料未持久化

請同時驗證以下兩項：

- `fly.toml` 包含 `destination = '/data'`
- `DATA_DIR` 設定為 `/data`

### 12.5 沒有 `INITIAL_PASSWORD` 可以執行嗎？

可以執行。它會回退到預設密碼 `CHANGEME`。建議在生產環境中盡快變更後端密碼。

---

## 13. 新專案重複使用

如果您要依照本文件部署新專案，只需變更以下項目：

1. 變更 `fly.toml` 中的 `app` 值
2. 變更 `NEXT_PUBLIC_BASE_URL`
3. 保留 `DATA_DIR=/data`
4. 重新產生 `API_KEY_SECRET`、`JWT_SECRET`、`MACHINE_ID_SALT` 和 `STORAGE_ENCRYPTION_KEY`
5. 首次部署後，驗證日誌是否寫入 `/data`

請勿重複使用先前專案的密鑰。

---

## 14. 目前專案的極簡發布檢查清單

後續發布最常用的命令：

```powershell
flyctl auth whoami
flyctl status -a omniroute
flyctl secrets list -a omniroute
flyctl deploy
flyctl logs --no-tail -a omniroute
```

對於一般發布，核心命令很簡單：

```powershell
flyctl deploy
```

對於新環境的首次部署，核心步驟為：

1. `flyctl auth login`
2. `flyctl apps create omniroute`
3. `flyctl secrets set ... -a omniroute`
4. `flyctl deploy`
5. `flyctl logs --no-tail -a omniroute`
