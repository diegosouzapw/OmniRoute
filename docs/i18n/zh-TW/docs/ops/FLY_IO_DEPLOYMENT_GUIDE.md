# OmniRoute Fly.io 部署指南 (中文 (簡體))

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../da/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../de/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../es/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../he/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../id/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../it/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../no/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../te/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../th/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FLY_IO_DEPLOYMENT_GUIDE.md)

---

本文檔記錄 OmniRoute 在 Fly.io 上的實際部署方法，適用於兩類場景：

- 首次把當前項目部署到 Fly.io
- 後續代碼更新後繼續發布
- 新項目參考同樣流程部署

本文基於當前項目已經驗證通過的設定整理，應用名為 `omniroute`。

---

## 1. 部署目標

- 平臺：Fly.io
- 部署方式：本地 `flyctl` 直接發布
- 運行方式：使用倉庫內現有 `Dockerfile` 和 `fly.toml`
- 數據持久化：Fly Volume 掛載到 `/data`
- 訪問地址：`https://omniroute.fly.dev/`

---

## 2. 當前項目關鍵設定

當前倉庫中的 `fly.toml` 已確認包含以下關鍵項：

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

說明：

- `app = 'omniroute'` 決定實際部署到哪個 Fly 應用
- `destination = '/data'` 決定持久卷掛載目錄
- 本項目必須讓 `DATA_DIR=/data`，否則資料庫和密鑰會寫到容器臨時目錄

---

## 3. 必備工具

### 3.1 安裝 Fly CLI

Windows PowerShell：

```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

如果安裝腳本在當前環境失敗，也可以手動下載 `flyctl` 二進位並放到 `PATH` 中。

### 3.2 登錄 Fly 帳號

```powershell
flyctl auth login
```

### 3.3 檢查登錄狀態

```powershell
flyctl auth whoami
flyctl version
```

---

## 4. 首次部署當前項目

### 4.1 獲取代碼並進入目錄

```powershell
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
```

### 4.2 確認應用名

打開 `fly.toml`，重點看這一行：

```toml
app = 'omniroute'
```

如果你準備部署到自己的新應用，可改成全局唯一名稱，例如：

```toml
app = 'omniroute-yourname'
```

注意：

- 控制臺裡要看的是與 `fly.toml` 裡 `app` 一致的應用
- 以前如果用過別的名字，例如 `oroute`，不要和 `omniroute` 混淆

### 4.3 創建應用

如果該應用尚不存在：

```powershell
flyctl apps create omniroute
```

如果你已經改成別的應用名，把 `omniroute` 替換成你的名字。

### 4.4 首次部署

```powershell
flyctl deploy
```

---

## 5. 必配參數

本項目在 Fly.io 上建議至少設定以下參數。

### 5.1 已驗證使用的參數

這些參數已經在當前 `omniroute` 應用上實際部署：

- `API_KEY_SECRET`
- `DATA_DIR`
- `JWT_SECRET`
- `MACHINE_ID_SALT`
- `NEXT_PUBLIC_BASE_URL`
- `STORAGE_ENCRYPTION_KEY`

### 5.2 關於 `INITIAL_PASSWORD`

當前項目沒有設置 `INITIAL_PASSWORD`，因為本次部署按需求不使用它。

如果不設置：

- 啟動日誌會提示默認密碼是 `CHANGEME`
- 部署後應儘快在系統設置中修改登錄密碼

如果你希望無人值守初始化後臺密碼，也可以後續補：

- `INITIAL_PASSWORD`

---

## 6. 推薦參數說明

### 6.1 Secrets 中設置

建議放入 Fly Secrets：

| 變量名                   | 是否推薦 | 說明                           |
| ------------------------ | -------- | ------------------------------ |
| `API_KEY_SECRET`         | 必需     | API Key 生成與校驗使用         |
| `JWT_SECRET`             | 必需     | 登錄態和 JWT 籤名使用          |
| `STORAGE_ENCRYPTION_KEY` | 強烈推薦 | 加密存儲敏感連接資訊           |
| `MACHINE_ID_SALT`        | 推薦     | 生成穩定機器標識               |
| `INITIAL_PASSWORD`       | 可選     | 首次部署時直接指定後臺初始密碼 |
| OAuth/API 私密憑證       | 按需     | 各類外部平臺鑑權設定           |

### 6.2 當前項目推薦值

| 變量名                 | 推薦值                      |
| ---------------------- | --------------------------- |
| `DATA_DIR`             | `/data`                     |
| `NEXT_PUBLIC_BASE_URL` | `https://omniroute.fly.dev` |

說明：

- `DATA_DIR=/data` 非常關鍵，必須與 Fly Volume 掛載點一致
- `NEXT_PUBLIC_BASE_URL` 用於調度器和前端回調等場景

---

## 7. 一鍵設置參數

下面命令會生成安全隨機值，並把當前項目需要的參數一次性寫入 Fly Secrets。

說明：

- 不包含 `INITIAL_PASSWORD`
- 適用於當前項目 `omniroute`

```powershell
$apiKeySecret = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$jwtSecret = [Convert]::ToHexString((1..64 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$machineIdSalt = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$storageKey = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()

flyctl secrets set `
  API_KEY_SECRET=$apiKeySecret `
  JWT_SECRET=$jwtSecret `
  MACHINE_ID_SALT=$machineIdSalt `
  STORAGE_ENCRYPTION_KEY=$storageKey `
  DATA_DIR=/data `
  NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev `
  -a omniroute
```

如果你還要加初始密碼：

```powershell
flyctl secrets set INITIAL_PASSWORD=你的強密碼 -a omniroute
```

---

## 8. 查看當前參數

```powershell
flyctl secrets list -a omniroute
```

如果控制臺 `Secrets` 頁面沒有顯示你期待的變量，先檢查：

- 看的應用是不是 `omniroute`
- `fly.toml` 的 `app` 是否和控制臺應用一致

---

## 9. 後續更新發布

代碼有更新後，發布步驟很簡單：

```powershell
git pull
flyctl deploy
```

如果只更新參數，不改代碼：

```powershell
flyctl secrets set KEY=value -a omniroute
```

Fly 會自動滾動更新機器。

### 9.1 跟蹤原倉庫更新並保留 fork 的 `fly.toml`

如果當前倉庫是 fork，並且你要同步上遊 `https://github.com/diegosouzapw/OmniRoute` 的更新，推薦按下面流程執行。

先確認遠程：

```powershell
git remote -v
```

應至少包含：

- `origin` 指向你自己的 fork
- `upstream` 指向原倉庫

如果沒有 `upstream`，先添加：

```powershell
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git
```

同步上遊前，先抓取最新提交和標籤：

```powershell
git fetch upstream --tags
```

查看當前版本和上遊標籤：

```powershell
git describe --tags --always
git show --no-patch --oneline v3.4.7
```

如果你想合併上遊最新 `main`，並強制保留 fork 當前的 `fly.toml`，可按下面流程執行：

```powershell
git merge upstream/main
git checkout HEAD~1 -- fly.toml
git add -- fly.toml
git commit -m "chore(deploy): keep fork fly.toml"
git push origin main
```

說明：

- `git merge upstream/main` 用於同步原倉庫最新代碼
- `git checkout HEAD~1 -- fly.toml` 用於恢復合併前你 fork 自己的 `fly.toml`
- 如果上遊沒有改 `fly.toml`，這一步不會帶來額外差異
- 如果上遊改了 `fly.toml`，這一步能確保 Fly 應用名、掛載卷、區域等 fork 自定義部署設定不被覆蓋

如果你明確只想對齊某個發布標籤，例如 `v3.4.7`，也可以先確認標籤是否已經包含在 `upstream/main`：

```powershell
git merge-base --is-ancestor v3.4.7 upstream/main
```

返回成功表示 `upstream/main` 已經包含該版本，直接合併 `upstream/main` 即可。

### 9.2 同步上遊後的標準發布順序

同步原倉庫完成後，推薦按下面順序發布：

1. `git fetch upstream --tags`
2. `git merge upstream/main`
3. 恢復 fork 的 `fly.toml`
4. `git push origin main`
5. `flyctl deploy`
6. `flyctl status -a omniroute`
7. `flyctl logs --no-tail -a omniroute`

這就是當前項目升級到 `v3.4.7` 時使用的實際流程。

---

## 10. 發布後檢查

### 10.1 查看應用狀態

```powershell
flyctl status -a omniroute
```

### 10.2 查看啟動日誌

```powershell
flyctl logs --no-tail -a omniroute
```

### 10.3 檢查網站可訪問

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

返回 `200` 說明站點已正常響應。

---

## 11. 成功標誌

部署成功後，日誌裡應看到類似內容：

```text
[bootstrap] Secrets persisted to: /data/server.env
[DB] SQLite database ready: /data/storage.sqlite
```

這兩個點很關鍵：

- `/data/server.env` 說明運行時密鑰落到了持久卷
- `/data/storage.sqlite` 說明資料庫寫入持久卷

如果你看到的是 `/app/data/...`，說明 `DATA_DIR` 沒配對，需要立即修正。

---

## 12. 常見問題

### 12.1 `Secrets` 頁面是空的

通常有兩種原因：

- 你還沒執行 `flyctl secrets set`
- 你打開的是另一個應用，例如 `oroute`，不是 `omniroute`

### 12.2 `flyctl deploy` 報 `app not found`

先創建應用：

```powershell
flyctl apps create omniroute
```

### 12.3 `fly.toml` 解析失敗

重點檢查：

- 注釋裡是否有亂碼字符
- TOML 引號和縮進是否正確

### 12.4 數據沒有持久化

檢查以下兩點：

- `fly.toml` 中是否存在 `destination = '/data'`
- `DATA_DIR` 是否設置為 `/data`

### 12.5 不設置 `INITIAL_PASSWORD` 是否能跑

可以運行，但會回退到默認 `CHANGEME`。生產環境建議儘快修改後臺密碼。

---

## 13. 新項目復用建議

如果以後是新項目照著這份文檔部署，最少改這幾項：

1. 修改 `fly.toml` 裡的 `app`
2. 修改 `NEXT_PUBLIC_BASE_URL`
3. 保持 `DATA_DIR=/data`
4. 重新生成 `API_KEY_SECRET`、`JWT_SECRET`、`MACHINE_ID_SALT`、`STORAGE_ENCRYPTION_KEY`
5. 首次部署後檢查日誌是否寫入 `/data`

不要直接復用舊項目的密鑰。

---

## 14. 當前項目的最小發布清單

當前項目後續最常用的命令如下：

```powershell
flyctl auth whoami
flyctl status -a omniroute
flyctl secrets list -a omniroute
flyctl deploy
flyctl logs --no-tail -a omniroute
```

如果只是正常發版，核心就是：

```powershell
flyctl deploy
```

如果是新環境首次部署，核心就是：

1. `flyctl auth login`
2. `flyctl apps create omniroute`
3. `flyctl secrets set ... -a omniroute`
4. `flyctl deploy`
5. `flyctl logs --no-tail -a omniroute`
