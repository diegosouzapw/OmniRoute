---
title: "環境變數參考"
version: 3.8.40
lastUpdated: 2026-06-28
---

# 環境變數參考

> OmniRoute 所識別的每個環境變數的完整參考。
> 快速入門範本請參閱 [`.env.example`](../../.env.example)。

> [!IMPORTANT]
> 此處記錄的每個變數都必須同時出現在 `.env.example` 中，而 `.env.example` 中的每個變數都必須出現在此處。`npm run check:env-doc-sync` 會在提交時及 CI 中強制執行此規則。若要刻意省略某個變數，請將其加入 `scripts/check/check-env-doc-sync.mjs` 中的允許清單。

---

## 目錄

- [1. 必要秘密](#1-必要秘密)
- [2. 儲存與資料庫](#2-儲存與資料庫)
- [3. 網路與連接埠](#3-網路與連接埠)
- [4. 安全與驗證](#4-安全與驗證)
- [5. 輸入消毒與 PII 保護](#5-輸入消毒與-pii-保護)
- [6. 工具與路由政策](#6-工具與路由政策)
- [7. URL 與雲端同步](#7-url-與雲端同步)
- [8. 對外代理](#8-對外代理)
- [9. CLI 工具整合](#9-cli-工具整合)
- [10. 內部代理與 MCP 整合](#10-內部代理與-mcp-整合)
- [11. OAuth 提供者憑證](#11-oauth-提供者憑證)
- [12. 提供者 User-Agent 覆寫](#12-提供者-user-agent-覆寫)
- [13. CLI 指紋相容性](#13-cli-指紋相容性)
- [14. API 金鑰提供者](#14-api-金鑰提供者)
- [15. 逾時設定](#15-逾時設定)
- [16. 紀錄](#16-紀錄)
- [17. 記憶體最佳化](#17-記憶體最佳化)
- [18. 定價同步](#18-定價同步)
- [19. 模型同步（開發）](#19-模型同步開發)
- [20. 提供者特定設定](#20-提供者特定設定)
- [21. 代理健康狀態](#21-代理健康狀態)
- [22. 除錯](#22-除錯)
- [23. GitHub 整合](#23-github-整合)
- [24. Skills 沙箱（v3.8.0+）](#24-skills-沙箱-v380)
- [部署情境](#部署情境)
- [稽核：已移除／失效變數](#稽核已移除失效變數)

---

## 1. 必要秘密

這些**必須**在首次執行前設定。若未設定，應用程式將拒絕啟動或以不安全的預設值運作。

| 變數                             | 必填                  | 預設值            | 原始檔                                        | 說明                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------- | --------------------- | ----------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`                     | **是**                | _（無）_          | `src/lib/auth`                                 | 簽署／驗證所有儀表板工作階段 Cookie（JWT）。使用 `openssl rand -base64 48` 產生。                                                                                                                                                                                                                                                                           |
| `API_KEY_SECRET`                 | **是**                | _（無）_          | `src/lib/db/apiKeys.ts`                        | SQLite 中 API 金鑰靜態加密的 AES 加密金鑰。使用 `openssl rand -hex 32` 產生。                                                                                                                                                                                                                                                                              |
| `INITIAL_PASSWORD`               | **是**                | `CHANGEME`        | 啟動腳本                                       | 設定初始管理員儀表板密碼（與 `.env.example` 預設值一致 — 故意保留為明顯不安全的狀態以強制變更）。**首次使用前請變更。** 登入後，可透過儀表板 → 設定 → 安全性變更。                                                                                                                                                                                            |
| `OMNIROUTE_WS_BRIDGE_SECRET`     | **是**（生產環境）     | _（未設定）_      | `src/app/api/internal/codex-responses-ws/route.ts` | 內部 Codex Responses WebSocket 橋接的共用秘密。驗證 Electron/瀏覽器 WS 中繼與 OmniRoute 之間的橋接請求。⚠️ **生產環境中為必填 — 若未設定，所有 WS 橋接請求將被拒絕。** 使用 `openssl rand -base64 32` 產生。                                                                                          |
| `OMNIROUTE_PEER_STAMP_TOKEN`     | 否（自動）             | _（每次啟動自動產生）_ | `src/server/authz/policies/management.ts`          | 用來證明受信任對等 IP 戳記來自 OmniRoute 自身 HTTP 伺服器的每程序秘密（`scripts/dev/peer-stamp.mjs`）。授權中間件僅在戳記攜帶此權杖時才信任請求位置（LOCAL_ONLY 路由的迴路/LAN 閘控）。每次啟動自動產生 — 保持未設定；僅在多程序設定中需共用戳記時才固定。 |

### 產生指令

```bash
# 一次產生四個秘密：
echo "JWT_SECRET=$(openssl rand -base64 48)"
echo "API_KEY_SECRET=$(openssl rand -hex 32)"
echo "INITIAL_PASSWORD=$(openssl rand -base64 16)"
echo "OMNIROUTE_WS_BRIDGE_SECRET=$(openssl rand -base64 32)"
```

> [!CAUTION]
> 切勿將含有真實秘密的 `.env` 檔案提交至版本控制。`.gitignore` 已排除 `.env`，但請在推送前再次確認。

---

## 2. 儲存與資料庫

OmniRoute 使用 **SQLite**（經由 `better-sqlite3`）進行所有持久化儲存。這些變數控制資料位置、加密和生命週期。

| 變數                               | 預設值                | 原始檔                                           | 說明                                                                                                                                                                                                                                   |
| ---------------------------------- | --------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATA_DIR`                         | `~/.omniroute/`        | `src/lib/db/core.ts`                             | SQLite 資料庫、備份和資料檔案的根目錄。可為 Docker 磁碟區或自訂路徑進行覆寫。                                                                                                                                                         |
| `STORAGE_ENCRYPTION_KEY`           | _（空值 = 停用）_      | `src/lib/db/encryption.ts`                       | 完整 SQLite 資料庫靜態加密的 AES 金鑰。使用 `openssl rand -hex 32` 產生。                                                                                                                                                             |
| `STORAGE_ENCRYPTION_KEY_VERSION`   | `v1`                   | `scripts/build/bootstrap-env.mjs`, `electron/main.js` | 加密金鑰的版本標籤。執行金鑰輪換時請遞增，以支援舊備份的解密。                                                                                                                                                                     |
| `DISABLE_SQLITE_AUTO_BACKUP`       | `false`                | `src/lib/db/backup.ts`                           | 設為 `true` 時，跳過每次啟動時在遷移前執行的自動資料庫備份。                                                                                                                                                                        |
| `OMNIROUTE_CRYPT_KEY`              | _（未設定）_            | `src/lib/db/encryption.ts`                       | **舊版別名**，對應 `STORAGE_ENCRYPTION_KEY`。在主變數不存在時接受為後備。                                                                                                                                                             |
| `OMNIROUTE_API_KEY_BASE64`         | _（未設定）_            | `src/lib/db/encryption.ts`                       | **舊版別名**（Base64 編碼形式），接受為後備。使用前會自動解碼。                                                                                                                                                                     |
| `OMNIROUTE_DB_HEALTHCHECK_INTERVAL_MS` | _（未設定）_         | `src/lib/db/core.ts`                             | 覆寫定期 SQLite 健康檢查間隔（毫秒）。未設定時，預設值衍生自 `NODE_ENV`。                                                                                                                                                            |
| `OMNIROUTE_SKIP_DB_HEALTHCHECK`    | `0`                    | `src/lib/db/core.ts`, `src/lib/db/healthCheck.ts` | 設為 `1` 以在啟動時跳過資料庫健康檢查。適用於短期任務和整合測試。                                                                                                                                                                   |
| `OMNIROUTE_FORCE_DB_HEALTHCHECK`   | `0`                    | `src/lib/db/core.ts`                             | 設為 `1` 以強制啟用資料庫健康檢查迴圈，即使通常會被跳過（例如短期任務）。                                                                                                                                                            |
| `OMNIROUTE_SKIP_POSTINSTALL`       | `0`                    | `scripts/postinstall.mjs`                        | 設為 `1` 以在 `npm install` 期間跳過原生執行序暖機。適用於 sqlite 已建置完成的 CI/無頭安裝。                                                                                                                                          |
| `OMNIROUTE_MIGRATIONS_DIR`         | _（自動偵測）_          | `src/lib/db/migrationRunner.ts`                  | 覆寫遷移執行器掃描的目錄。在自訂建置中打包遷移時很有用。                                                                                                                                                                           |
| `OMNIROUTE_MAX_PENDING_MIGRATIONS` | `50`                   | `src/lib/db/migrationRunner.ts`                  | 大量待處理遷移安全閥值（#3416）。若現有資料庫的待處理遷移超過此數目，啟動會中止（防止追蹤表被清除）。提高以還原較舊的備份；設為 `0` 可停用檢查。                                                                                |
| `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | _（程式碼中預設值）_    | `src/lib/spend/batchWriter.ts`                   | 批次花費/成本寫入器的寫入間隔（毫秒）。較低的值減少寫入合併；較高的值減少資料庫競爭。                                                                                                                                                |
| `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | _（程式碼中預設值）_    | `src/lib/spend/batchWriter.ts`                   | 強制寫入前最大緩衝的花費條目數。在高 QPS 部署中調高；在記憶體優先時調低。                                                                                                                                                            |
| `OMNIROUTE_PROXY_FETCH_DEBUG`       | _（未設定）_            | `open-sse/utils/proxyFetch.ts`                   | 設為 `"true"` 以在 Vercel 中繼路徑上輸出 `[ProxyFetch]` 除錯紀錄。預設關閉以避免洩漏路由提示。                                                                                                                                         |
| `OMNIROUTE_DEBUG_COMPLETION`        | _（未設定）_            | `bin/cli/commands/completion.mjs`                | 設為任何非空值以從 CLI shell 補完快取路徑輸出 `[omniroute completion]` 診斷資訊（讀取/重新整理/寫入）。預設關閉 — 這些快取會靜默失敗，因此遺失或損壞的快取不會破壞 Tab 補完。                                                            |
| `BATCH_RETRY_DURATION_MS`           | `86400000`（24 小時）    | `open-sse/services/batchProcessor.ts`            | 個別批次項目的最長重試窗口（毫秒）。超過此時間的項目標記為失敗。                                                                                                                                                                   |
| `BATCH_BACKOFF_BASE_MS`             | `5000`                  | `open-sse/services/batchProcessor.ts`            | 批次項目重試指數退避的基礎延遲（毫秒）。                                                                                                                                                                                          |
| `BATCH_BACKOFF_MAX_MS`              | `3600000`（1 小時）      | `open-sse/services/batchProcessor.ts`            | 批次項目重試間指數退避的上限（毫秒）。                                                                                                                                                                                            |
| `BATCH_MAX_CONCURRENT`              | `1`                     | `open-sse/services/batchProcessor.ts`            | 同時處理的最大批次數量。調高以增加吞吐量；保持較低以避免速率限制風暴。                                                                                                                                                            |

### 情境

| 情境                  | 設定                                                                               |
| --------------------- | ---------------------------------------------------------------------------------- |
| **本機開發**          | 保留所有預設值。資料庫位於 `~/.omniroute/omniroute.db`。                            |
| **Docker**            | `DATA_DIR=/data` + 在 `/data` 掛載磁碟區。                                         |
| **靜態加密**          | 設定 `STORAGE_ENCRYPTION_KEY` + 備份金鑰！遺失金鑰 = 遺失資料。                     |
| **CI/測試**           | `DATA_DIR=/tmp/omniroute-test` — 暫時性，無需加密。                                |

---

## 3. 網路與連接埠

| 變數                                            | 預設值                          | 原始檔                                                                        | 說明                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PORT`                                          | `20128`                         | `src/lib/runtime/ports.ts`                                                    | 儀表板 UI 和 API 端點的主要連接埠（單連接埠模式）。                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_BASE_PATH`                           | _（空值 = 根路徑）_              | `next.config.mjs`                                                             | 在反向代理後以子路徑提供 OmniRoute 服務的 URL 子路徑（設定 Next.js `basePath`；驗證重新導向會感知 basePath）。例如 `/omniroute`。                                                                                                                                                                                           |
| `API_PORT`                                      | _（未設定）_                     | `src/lib/runtime/ports.ts`                                                    | 設定時，在此獨立連接埠上提供 `/v1/*` 代理 API。                                                                                                                                                                                                                                                                             |
| `API_HOST`                                      | `0.0.0.0`                       | `src/lib/runtime/ports.ts`                                                    | API 連接埠的綁定位址。                                                                                                                                                                                                                                                                                                       |
| `DASHBOARD_PORT`                                | _（未設定）_                     | `src/lib/runtime/ports.ts`                                                    | 設定時，在此獨立連接埠上提供儀表板 UI。                                                                                                                                                                                                                                                                                      |
| `OMNI_MAX_CONCURRENT_CONNECTIONS`               | `0` _（停用）_                   | `src/sse/utils/backpressure.ts`                                               | 限制同時進行的聊天連線；超過限制的請求會回傳 `503` 和 `Retry-After`。正整數啟用防護；未設定/`0` 停用。                                                                                                                                                                                                                        |
| `OMNIROUTE_INSTANCE_ID`                         | _（未設定）_                     | `src/shared/resilience/peerRouting.ts`                                        | 串聯 OmniRoute 實例時此閘道的穩定唯一 ID。啟用入站對等迴圈檢查。允許字元：字母、數字、`.`, `_`, `:`, `-`；最多 64 個字元。                                                                                                                                                                                                  |
| `OMNIROUTE_PEER_URLS`                           | _（未設定）_                     | `src/shared/resilience/peerRouting.ts`, `open-sse/executors/base.ts`          | 以逗號分隔的 OmniRoute 基礎 URL，可能接收 `X-OmniRoute-Peer-Trace`。僅明確允許清單中的上游 URL 會收到對等元資料；所有其他提供者不受影響。                                                                                                                                                                                    |
| `OMNIROUTE_PEER_MAX_HOPS`                       | `4`                             | `src/shared/resilience/peerRouting.ts`                                        | 串聯請求接受的最大之前造訪 OmniRoute 實例數（`1`-`32`）。重複的實例或耗盡的預算回傳 HTTP `508 偵測到迴圈`。                                                                                                                                                                                                                       |
| `PROD_DASHBOARD_PORT`                           | `20130`                         | `docker-compose.prod.yml`                                                     | Docker 生產模式中儀表板的主機端發布連接埠。                                                                                                                                                                                                                                                                                 |
| `PROD_API_PORT`                                 | `20131`                         | `docker-compose.prod.yml`                                                     | Docker 生產模式中 API 的主機端發布連接埠。                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_PORT`                                | _（未設定）_                     | `src/lib/runtime/ports.ts`                                                    | 在 Electron 或其他包裝器中執行時優先於 `PORT`。                                                                                                                                                                                                                                                                              |
| `LIVE_WS_PORT`                                  | `20129`                         | `src/server/ws/liveServer.ts`                                                 | 即時 WebSocket 即時監控伺服器的連接埠。                                                                                                                                                                                                                                                                                      |
| `LIVE_WS_HOST`                                  | `127.0.0.1`                     | `src/server/ws/liveServer.ts`                                                 | 即時 WebSocket 伺服器的綁定位址。設為 `0.0.0.0` 以在 LAN 上公開（也請設定 `LIVE_WS_ALLOWED_ORIGINS`）。                                                                                                                                                                                                                       |
| `LIVE_WS_ALLOWED_ORIGINS`                       | _（未設定）_                     | `src/server/ws/liveServer.ts`                                                 | 允許開啟即時 WebSocket 的額外來源（逗號分隔）。迴路儀表板來源已預設允許。                                                                                                                                                                                                                                                    |
| `LIVE_WS_ALLOWED_HOSTS`                         | _（未設定）_                     | `src/server/ws/liveServerAllowList.ts`                                        | 允許用於即時 WebSocket 來源的額外主機名稱（逗號分隔）。與 `LIVE_WS_ALLOWED_ORIGINS`（完整原始 URL）不同，僅比對主機部分 — 適用於 LAN/Tailscale 設定。                                                                                                                                                                           |
| `NEXT_PUBLIC_LIVE_WS_PUBLIC_URL`                | _（未設定）_                     | `src/hooks/useLiveDashboard.ts`                                               | 即時儀表板 WebSocket 的公開 URL（瀏覽器端）。當使用反向代理或 Cloudflare Tunnel 前端 WS 伺服器時設定（例如 `wss://ws.my-ai.com/live-ws`）；瀏覽器會連接到此處而不是 `ws://hostname:20132`。路徑名稱部分也用作 WebSocket 升級路徑（預設：`/live-ws`）。                                                                  |
| `OMNIROUTE_ENABLE_LIVE_WS`                      | `true`                          | `src/server/ws/liveServer.ts` 和 `scripts/start-ws-server.mjs`               | 設為 `0` 或 `false` 以停用即時 WebSocket 伺服器（預設啟用，綁定至迴路）。CI/測試工具切換，用於停用獨立的即時 WebSocket 輔助腳本。                                                                                                                                                                                            |
| `RELAY_IP_PER_MINUTE`                           | `30`                            | `src/app/api/v1/relay/chat/completions/route.ts`                              | 每（權杖、IP）中繼速率限制，請求/分鐘。記憶體內，每個實例。`0` 或負數停用 IP 維度閘控（每權杖資料庫限制仍適用）。                                                                                                                                                                                                            |
| `NODE_ENV`                                      | `production`                    | Next.js 核心                                                                  | 控制紀錄詳細程度、快取、錯誤詳細資訊揭露和 Next.js 最佳化。                                                                                                                                                                                                                                                                |
| `OMNIROUTE_USE_TURBOPACK`                       | `1`（Turbopack — 程式碼預設值）    | `package.json` / Next.js 16                                                   | Turbopack 是 `npm run dev` 和 `npm run build` 的預設打包工具（基準測試顯示建置速度快 2-3 倍）。設為 `0` 以在 Windows 上、遇到原生繫結/打包器相容性問題時，**或在記憶體受限的機器上**回退至 webpack — 此 Next.js 版本線（16.2.x）上的 Turbopack 生產建置已知在大型模組圖上的記憶體峰值遠高於 webpack（Next 16.3 的 Turbopack 記憶體回收修復尚未穩定）；webpack 回退的峰值低得多。詳見 #6409。 |
| `OMNIROUTE_SKIP_DB_HEALTHCHECK`                 | _（未設定）_                     | `src/lib/db/core.ts` / `src/lib/db/healthCheck.ts`                            | 設為 `1` 以在啟動時跳過 SQLite 完整性健康檢查。在大型資料庫上加快啟動速度時很有用。                                                                                                                                                                                                                                           |
| `CREDENTIAL_HEALTH_CHECK_INTERVAL`              | `300000`                        | `open-sse/config/constants.ts` / `src/lib/credentialHealth/scheduler.ts`      | 背景憑證健康檢查排程器的間隔（毫秒）。最小值：10000（10 秒）。                                                                                                                                                                                                                                                             |
| `CREDENTIAL_HEALTH_CACHE_TTL`                   | `300000`                        | `open-sse/config/constants.ts` / `src/lib/credentialHealth/cache.ts`          | 快取憑證健康狀態的 TTL（毫秒）。                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK`     | `false`                         | `src/lib/credentialHealth/scheduler.ts`                                       | 設為 `1` 或 `true` 以停用提供者連線的背景定期測試。                                                                                                                                                                                                                                                                        |
| `HOST`                                          | `0.0.0.0`                       | `scripts/dev/run-next.mjs`                                                    | Next.js 開發/啟動伺服器的綁定位址。設定時覆寫預設的 `0.0.0.0`。                                                                                                                                                                                                                                                            |
| `HOSTNAME`                                      | `127.0.0.1`                     | `scripts/dev/run-next-playwright.mjs`                                         | Playwright 執行器啟動 Next.js 時使用的綁定位址。預設為 `127.0.0.1` 以進行封閉測試。**請勿用於 `omniroute serve`** — 請改用 `OMNIROUTE_SERVER_HOST`（POSIX shell 會自動將 `HOSTNAME` 設為機器名稱；`.env` 無法覆蓋它）。                                                                                                    |
| `OMNIROUTE_SERVER_HOST`                         | `0.0.0.0`                       | `bin/cli/commands/serve.mjs`                                                  | `omniroute serve` 的綁定位址。避免與 POSIX shell `HOSTNAME` 變數衝突（bash/zsh 總是將其設為機器名稱）。未設定時回退至 `0.0.0.0`。（#6194）                                                                                                                                                                                   |

### 連接埠模式

```
┌─────────────────────────── 單一連接埠（預設）──────────────────────────┐
│  PORT=20128                                                                 │
│  → 儀表板：http://localhost:20128                                        │
│  → API：     http://localhost:20128/v1/chat/completions                    │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────── 分離連接埠 ─────────────────────────────────────┐
│  DASHBOARD_PORT=20128                                                       │
│  API_PORT=20129                                                             │
│  API_HOST=0.0.0.0                                                           │
│  → 儀表板：http://localhost:20128                                        │
│  → API：     http://0.0.0.0:20129/v1/chat/completions                     │
│  使用案例：將 API 公開至 LAN，同時限制儀表板僅限 localhost。      │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────── Docker 生產 ──────────────────────────────┐
│  PROD_DASHBOARD_PORT=443   PROD_API_PORT=8443                              │
│  → 將容器連接埠對應至 docker-compose.prod.yml 中的主機連接埠。          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. 安全與驗證

| 變數                                    | 預設值                   | 原始檔                                            | 說明                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------- | ------------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MACHINE_ID_SALT`                       | `endpoint-proxy-salt`    | `src/lib/auth`                                    | 與硬體識別碼結合用於機器指紋識別的鹽值。請為每個部署變更以實現隔離。                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_CLI_SALT`                    | `omniroute-cli-auth-v1`  | `src/lib/machineToken.ts`                         | 用於衍生本機 CLI 驗證權杖的 HMAC 鹽值。變更此值會輪換機器上所有 CLI 權杖。詳見 `docs/security/CLI_TOKEN.md`。                                                                                                                                                                                                                                                 |
| `AUTH_COOKIE_SECURE`                    | `false`                  | `src/lib/auth`                                    | 在工作階段 Cookie 上設定 `Secure` 標記。在 HTTPS 後方執行時**必須設為 `true`**。                                                                                                                                                                                                                                                                              |
| `REQUIRE_API_KEY`                       | `false`                  | API 中介軟體                                      | 設為 `true` 時，所有 `/v1/*` 代理請求必須包含有效的 API 金鑰。                                                                                                                                                                                                                                                                                             |
| `ALLOW_API_KEY_REVEAL`                  | `false`                  | `src/shared/constants/featureFlagDefinitions.ts`  | 允許在儀表板 UI 中顯示完整的 API 金鑰值。可從儀表板功能標誌設定；在共用實例上存在安全風險。                                                                                                                                                                                                                                                               |
| `NO_LOG_API_KEY_IDS`                    | _（空值）_                | `src/lib/compliance/index.ts`                     | 以逗號分隔的 API 金鑰 ID，這些金鑰的請求不會被記錄（GDPR 合規）。                                                                                                                                                                                                                                                                                          |
| `DEFAULT_RATE_LIMIT_PER_DAY`            | `1000`                   | `src/shared/utils/apiKeyPolicy.ts`                | 套用至 `rate_limits` 欄位為空的 API 金鑰的每日請求預算後備值。預設（未設定/空值/格式錯誤）保留舊版 1000/天、5000/週、20000/月 的窗口。明確設為 `0` 可選擇退出（無限制）。任何正整數 N 啟用 N/天、5N/週、20N/月。Zod 驗證；無效值會記錄警告並使用舊版預設值。                                                                                      |
| `MAX_BODY_SIZE_BYTES`                   | `10485760`（10 MB）       | `src/shared/middleware/bodySizeGuard.ts`          | 允許的最大請求主體大小。超過此限制的負載將被拒絕。                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_CHAT_LARGE_BODY_BYTES`       | `262144`（256 KB）        | `src/shared/middleware/chatBodyAdmission.ts`      | 實際請求主體達到或超過此閥值時，需要在 JSON 解析前取得原子程序本機重量級許可租約。                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_CHAT_HARD_MAX_BODY_BYTES`    | `52428800`（50 MB）       | `src/shared/middleware/chatBodyAdmission.ts`      | 聊天路由硬性上限，針對有限攝取期間讀取的位元組數強制執行，包括缺少、無效或不誠實的 `Content-Length` 的請求；超過則回傳 `413`。                                                                                                                                                                                                                             |
| `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`    | `1`                      | `src/shared/middleware/chatBodyAdmission.ts`      | 單一程序中同時允許的最大重量級聊天請求。當容量不可用時，OmniRoute 回傳可重試的 `503` 及 `Retry-After`。                                                                                                                                                                                                                                                   |
| `OMNIROUTE_MAX_NONSTREAMING_RESPONSE_BYTES` | `67108864`（64 MB）  | `open-sse/handlers/chatCore/nonStreamingResponseBody.ts` | 非串流上游回應完全緩衝到記憶體中的硬性上限。超過此值時，上游讀取器會被取消，請求快速失敗，而不是增長無界字串直到堆疊耗盡。                                                                                                                                                                                                                                    |
| `CORS_ORIGIN`                           | _（未設定）_               | `src/server/cors/origins.ts`                     | 舊版單一來源 CORS 允許清單。新部署建議使用 `CORS_ALLOWED_ORIGINS`。CORS 僅適用於跨來源瀏覽器 API 用戶端；已驗證的儀表板寫入使用同源請求加上工作階段綁定的 CSRF 保護。                                                                                                                                                                                    |
| `CORS_ALLOWED_ORIGINS`                  | _（未設定）_               | `src/server/cors/origins.ts`                     | 逗號分隔的 CORS 允許清單。除非明確設定 `CORS_ALLOW_ALL=true`，否則不會發送萬用字元。                                                                                                                                                                                                                                                                        |
| `CORS_ALLOW_ALL`                        | `false`                   | `src/server/cors/origins.ts`                     | 僅限開發使用的逃逸艙口，會回應任何瀏覽器 `Origin`。請勿在共用或生產部署中啟用。                                                                                                                                                                                                                                                                            |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | `true`                    | `src/shared/network/outboundUrlGuard.ts`          | 封鎖針對私有/迴路/鏈結本機 IP 範圍的提供者呼叫。僅在隔離測試環境中停用。                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS` | `false`                   | `src/shared/network/outboundUrlGuard.ts`          | 允許指向私有/本機網路（localhost、192.168.x.x、10.x.x.x 等）的提供者 URL。**自託管提供者（LM Studio、Ollama、vLLM、Llamafile、Triton、SearXNG）必須設定為 `true`**。設為 `false` 時，儀表板拒絕驗證本機 URL。                                                                                                                                            |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`   | `true`                    | `src/shared/network/outboundUrlGuard.ts`          | 允許在本機/私有位址（127.0.0.1、localhost、LAN、私有範圍）上新增/驗證提供者 — 限定於提供者驗證路徑。**預設 `true`**（本機優先）；設為 `false` 以強制執行嚴格僅限公開的封鎖。雲端元資料端點（169.254.169.254、metadata.google.internal）仍保持封鎖。（#5066）                                                                                     |

### 強化檢查清單

```bash
# 生產安全性最低要求：
AUTH_COOKIE_SECURE=true        # 需要 HTTPS
REQUIRE_API_KEY=true           # 驗證所有代理呼叫
ALLOW_API_KEY_REVEAL=false     # 絕不在 UI 中暴露金鑰
CORS_ALLOWED_ORIGINS=https://your.domain.com
MAX_BODY_SIZE_BYTES=5242880    # 5 MB 限制
```

---

## 5. 輸入消毒與 PII 保護

OmniRoute 提供兩層防禦：請求端的注入掃描和回應端的 PII 去除。

### 請求端：提示注入防護

| 變數                        | 預設值    | 原始檔                                    | 說明                                                                                         |
| --------------------------- | --------- | ----------------------------------------- | -------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`   | `true`    | `src/middleware/promptInjectionGuard.ts`  | 啟用掃描傳入訊息中的提示注入模式。                                                           |
| `INPUT_SANITIZER_MODE`      | `warn`    | `src/middleware/promptInjectionGuard.ts`  | `warn` = 僅記錄，`block` = 以 400 拒絕請求，`redact` = 去除可疑模式。                       |
| `INJECTION_GUARD_MODE`      | _（未設定）_ | `src/middleware/promptInjectionGuard.ts`  | `INPUT_SANITIZER_MODE` 的舊版別名 — 行為相同。                                               |
| `PII_REDACTION_ENABLED`     | `false`   | `src/middleware/promptInjectionGuard.ts`  | 偵測傳入請求中的 PII（電子郵件、電話、SSN）。                                                |
| `CREDENTIAL_REDACTION_ENABLED` | `false` | `src/lib/guardrails/credentialMasker.ts`  | 從請求/回應負載中去除眾所周知的 API 金鑰/秘密權杖模式。選擇加入；鏡像 `PII_REDACTION_ENABLED`。 |

### 回應端：PII 消毒器

| 變數                             | 預設值    | 原始檔                     | 說明                                                                 |
| -------------------------------- | -------- | --------------------------- | -------------------------------------------------------------------- |
| `PII_RESPONSE_SANITIZATION`      | `false`  | `src/lib/piiSanitizer.ts`   | 在回傳給用戶端前掃描 LLM 回應中洩漏的 PII。                           |
| `PII_RESPONSE_SANITIZATION_MODE` | `redact` | `src/lib/piiSanitizer.ts`   | `redact` = 遮罩 PII，`warn` = 僅記錄，`block` = 丟棄整個回應。       |

### VS Code 權杖化路由內容消毒器

| 變數                                | 預設值 | 原始檔                                         | 說明                                                                                                                                                                                                                                   |
| ----------------------------------- | ------ | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_VSCODE_SANITIZE_CONTEXT` | `1`    | `src/app/api/v1/vscode/contextSanitizer.ts`    | 從 `/v1/vscode/[token]/*` 請求中去除隱含的活躍編輯器內容（`editorContext`、`activeEditor`、`currentFile`、`selection`、`openTabs`…），並編輯明確附加的敏感檔案內容。預設安全；設為 `0` 以停用。 |

### 情境

| 情境                      | 設定                                                                                                                         |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **企業合規**              | `INPUT_SANITIZER_ENABLED=true`、`INPUT_SANITIZER_MODE=block`、`PII_REDACTION_ENABLED=true`、`PII_RESPONSE_SANITIZATION=true` |
| **僅監控**                | `INPUT_SANITIZER_ENABLED=true`、`INPUT_SANITIZER_MODE=warn` — 記錄但從不封鎖                                                 |
| **個人使用**              | 全部停用 — 零開銷                                                                                                            |

---

## 6. 工具與路由政策

| 變數                                                         | 預設值                         | 原始檔                                  | 說明                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------ | ------------------------------ | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`                                           | `disabled`                     | `src/lib/toolPolicy.ts`                 | 控制 LLM 工具/函式呼叫存取。`allowlist` = 僅列出工具，`denylist` = 除列出者外全部允許，`disabled` = 無限制。                                                                                                                                             |
| `OMNIROUTE_PAYLOAD_RULES_PATH`                               | `./config/payloadRules.json`   | `open-sse/services/payloadRules.ts`     | 負載操作規則 JSON 檔案的路徑（每個模型/協定的上游調整）。                                                                                                                                                                                               |
| `OMNIROUTE_PAYLOAD_RULES_RELOAD_MS`                          | `5000`                         | `open-sse/services/payloadRules.ts`     | 熱重新載入負載規則檔案的間隔（毫秒）。最小值 `1000`。                                                                                                                                                                                                   |
| `OMNIROUTE_PREFER_CLAUDE_CODE_FOR_UNPREFIXED_CLAUDE_MODELS`  | `false`                        | `open-sse/services/model.ts`            | 選擇加入：將來自 Claude Code 用戶端的裸 `claude-*` 模型 ID 路由至 Claude Code OAuth 帳戶，而不需要提供者前綴。明確的提供者前綴仍然優先。也可透過 Claude 提供者頁面上的儀表板切換進行設定。                                                              |

---

## 7. URL 與雲端同步

| 變數                                        | 預設值                                                             | 原始檔                                          | 說明                                                                                                                                                                                                                                                                                            |
| ------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BASE_URL`                                  | `http://localhost:20128`                                            | `src/lib/cloudSync.ts`                          | 伺服器端 URL，供內部同步作業呼叫 `/api/sync/cloud`。即使應用程式透過公開代理提供服務，也請保持為迴路/容器 URL。                                                                                                                                                                                 |
| `CLOUD_URL`                                 | _（空值）_                                                          | `src/lib/cloudSync.ts`                          | 雲端中繼端點 URL（進階功能）。                                                                                                                                                                                                                                                                |
| `CLOUD_SYNC_TIMEOUT_MS`                     | `12000`                                                             | `src/lib/cloudSync.ts`                          | 雲端同步請求的 HTTP 逾時。                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_BUILD_PROFILE`                   | `full`                                                              | Webpack 建置設定                                 | 建置時設定檔（設為 `minimal` 以從套件中實際排除特權模組）。                                                                                                                                                                                                                                  |
| `OMNIROUTE_CLOUD_SYNC_SECRET`               | _（空值）_                                                          | `src/lib/cloudSync.ts`                          | 用於驗證 Cloud Sync 回應的 HMAC-SHA256 簽章的共用秘密。                                                                                                                                                                                                                                      |
| `OMNIROUTE_CLOUD_SYNC_SECRETS`              | `false`                                                             | `src/lib/cloudSync.ts`                          | 設為 `true` 以允許 Cloud Sync 端點覆寫本機憑證。預設為 `false`。                                                                                                                                                                                                                             |
| `OMNIROUTE_ZED_IMPORT_LEGACY_ONE_STEP`      | `false`                                                             | `src/app/api/providers/zed/import/route.ts`     | 設為 `true` 以回退至 v3.8.5 的單步「匯入全部」行為，無需使用者確認。                                                                                                                                                                                                                          |
| `NEXT_PUBLIC_BASE_URL`                      | `http://localhost:20128`                                            | OAuth、儀表板、同步                               | 面向公眾的 URL，用於 OAuth redirect_uri、儀表板連結和產生的公開 URL。當 OAuth 回呼或產生的瀏覽器連結需要使用標準反向代理主機時，請設定此為穩定的公開 URL。                                                                                                                                      |
| `NEXT_PUBLIC_CLOUD_URL`                     | _（空值）_                                                          | 用戶端                                          | `CLOUD_URL` 的用戶端鏡像。                                                                                                                                                                                                                                                                   |
| `NEXT_PUBLIC_APP_URL`                       | _（未設定）_                                                        | `src/shared/services/cloudSyncScheduler.ts`     | `NEXT_PUBLIC_BASE_URL` 的舊版後備值。                                                                                                                                                                                                                                                        |
| `OMNIROUTE_PUBLIC_BASE_URL`                 | _（未設定）_                                                        | 公開原始解析器、圖像 URL                          | 用於公開 URL 產生和非儀表板瀏覽器原始驗證（例如 `/v1/chatgpt-web/image/<id>`）的最高優先級瀏覽器端 OmniRoute 原始。當 OpenWebUI 或其他中繼透過內部 URL 到達 OmniRoute，但使用者的瀏覽器必須從 LAN、通道或公開原始取得圖像時，請設定此值。**請勿**包含 `/v1`。                                          |
| `OMNIROUTE_PROVIDER_MANIFEST_URL`           | _（未設定）_                                                        | `open-sse/config/providerPluginManifestUrl.ts`   | 向 Sidecar 用戶端公告的絕對提供者外掛清單 URL。未設定時，OmniRoute 會從請求原始或 HOST/PORT 衍生 `/api/v1/provider-plugin-manifest`。                                                                                                                                                        |
| `OMNIROUTE_PUBLIC_PROTOCOL`                 | `http`                                                              | `open-sse/config/providerPluginManifestUrl.ts`   | 在沒有請求原始的情況下從 HOST/PORT 衍生提供者外掛清單 URL 時使用的協定。當未設定明確的 `OMNIROUTE_PROVIDER_MANIFEST_URL` 時，請在 TLS 終止的公開代理後方設為 `https`。                                                                                                                       |
| `OMNIROUTE_TRUST_PROXY`                     | _（未設定）_                                                        | `src/server/origin/publicOrigin.ts`              | 用於轉發的公開原始標頭的可選信任模式。未設定 = 不信任 `Forwarded` / `X-Forwarded-*` 進行安全決策。`true` / `loopback` 僅信任來自權杖戳記迴路代理的轉發主機/協定。`private` / `lan` 也信任私有 LAN 代理對等。生產環境中建議使用明確的 `NEXT_PUBLIC_BASE_URL`。                              |
| `OMNIROUTE_CGPT_WEB_IMAGE_TIMEOUT_MS`       | `180000`（3 分鐘）                                                  | `open-sse/executors/chatgpt-web.ts`             | 非同步 chatgpt-web 圖像透過 celsius WebSocket 到達的最長等待時間。在上游佇列較深的期間調高。                                                                                                                                                                                               |
| `OMNIROUTE_CGPT_WEB_IMAGE_CACHE_MAX_MB`     | `256`                                                               | `open-sse/services/chatgptImageCache.ts`        | 服務 `/v1/chatgpt-web/image/<id>` 的 chatgpt-web 圖像快取的記憶體內總位元組預算（MB）。在記憶體受限的主機上調低；如果圖像生成量大且用戶端競爭 30 分鐘 TTL，請調高。                                                                                                                           |
| `OMNIROUTE_CGPT_WEB_PRO_TIMEOUT_MS`         | `1200000`（20 分鐘）                                                | `open-sse/executors/chatgpt-web.ts`             | chatgpt-web GPT-5.5 Pro 背景輪詢交接的總等待預算。Pro 推理執行結束帶外完成，因此 OmniRoute 會持續輪詢直到答案到達或此預算用盡。如果 Pro 請求在完成前逾時，請調高。                                                                                                                              |
| `OMNIROUTE_CGPT_WEB_PRO_POLL_INTERVAL_MS`   | `4000`（4 秒）                                                      | `open-sse/executors/chatgpt-web.ts`             | chatgpt-web GPT-5.5 Pro 背景輪詢嘗試之間的間隔。調低可獲得更快的完成速度，但會增加上游輪詢量；調高可減少請求量。                                                                                                                                                                              |
| `THEOLDLLM_NAV_TIMEOUT_MS`                  | `30000`（30 秒）                                                     | `open-sse/executors/theoldllm.ts`               | The Old LLM（theoldllm）免費提供者使用的瀏覽器導航逾時（毫秒）。如果中繼頁面在慢速網路上穩定速度較慢，請調高。                                                                                                                                                                               |
| `KIE_CALLBACK_URL`                          | _（未設定）_                                                        | `open-sse/utils/kieTask.ts`                     | 非同步 kie.ai 作業的公開回呼 URL。在 `OMNIROUTE_KIE_CALLBACK_URL` 和 `OMNIROUTE_PUBLIC_URL` 之前的最高優先級覆寫。                                                                                                                                                                            |
| `OMNIROUTE_KIE_CALLBACK_URL`                | _（未設定）_                                                        | `open-sse/utils/kieTask.ts`                     | `KIE_CALLBACK_URL` 的替代拼寫。當主變數未設定時回退。                                                                                                                                                                                                                                         |
| `OMNIROUTE_PUBLIC_URL`                      | _（未設定）_                                                        | `open-sse/utils/kieTask.ts`                     | 用於組成非同步回呼 URL 的公開原始。kie.ai 回呼的最低優先級後備值；也用作其他中繼的通用公開 URL。                                                                                                                                                                                              |
| `OMNIROUTE_CROF_USAGE_URL`                  | `https://crof.ai/usage_api/`                                        | `open-sse/services/usage.ts`                    | CrofAI 用量查詢端點，用於用量頁面。可為中繼/測試裝置進行覆寫。                                                                                                                                                                                                                              |
| `OMNIROUTE_OPENCODE_QUOTA_URL`              | `https://opencode.ai/zen/go/v1/quota`                               | `open-sse/services/opencodeQuotaFetcher.ts`     | OpenCode（zen/go）用量查詢端點，用於用量頁面。可為中繼/測試裝置進行覆寫。                                                                                                                                                                                                                   |
| `OMNIROUTE_OPENCODE_GO_QUOTA_URL`           | _（未設定）_                                                        | `open-sse/services/opencodeOllamaUsage.ts`      | OpenCode Go 用量查詢端點，用於用量頁面。OpenCode Go 沒有公開的用量 API，因此在運營者選擇加入自託管/鏡像端點之前，此項無預設值且網路呼叫將被跳過。                                                                                                                                              |
| `OMNIROUTE_OPENCODE_GO_DASHBOARD_URL`       | `https://opencode.ai/workspace`                                     | `open-sse/services/usage.ts`                    | 設定工作區 ID 和驗證 Cookie 時用於用量抓取的 OpenCode Go 儀表板基礎 URL。可為中繼/測試裝置進行覆寫。                                                                                                                                                                                        |
| `OPENCODE_GO_WORKSPACE_ID`                  | _（未設定）_                                                        | `open-sse/services/usage.ts`                    | 用於儀表板用量抓取的 OpenCode Go 工作區 ID。當設定多個帳戶時，建議使用每個連線的儀表板欄位。                                                                                                                                                                                               |
| `OMNIROUTE_OPENCODE_GO_WORKSPACE_ID`        | _（未設定）_                                                        | `open-sse/services/usage.ts`                    | 在較短別名之前使用的替代 OpenCode Go 工作區 ID 環境變數。當設定多個帳戶時，建議使用每個連線的儀表板欄位。                                                                                                                                                                                   |
| `OPENCODE_GO_AUTH_COOKIE`                   | _（未設定）_                                                        | `open-sse/services/usage.ts`                    | 用於儀表板用量抓取的 OpenCode Go `auth` Cookie。敏感資訊；當設定多個帳戶時，建議使用每個連線的儀表板欄位。                                                                                                                                                                                   |
| `OPENCODE_SYNTHESIZE_CLI_HEADERS`           | `false`                                                             | `open-sse/executors/opencode.ts`                | 選擇加入：在用戶端未發送的 opencode-go/zen 上游請求上合成 OpenCode CLI 身分標頭（User-Agent、x-opencode-client/project、請求/工作階段 UUID），以便 VPS 出口上的 Cloudflare 接受它們（#6210/#5997）。預設關閉（僅轉發更安全）。                                                               |
| `OPENCODE_USER_AGENT`                       | `opencode-cli/1.0.0`                                                | `open-sse/executors/opencode.ts`                | 當 `OPENCODE_SYNTHESIZE_CLI_HEADERS` 啟用且未設定每個提供者的 `<PROVIDER>_USER_AGENT` 覆寫時使用的預設 User-Agent。僅套用至 opencode 執行器。                                                                                                                                               |
| `OPENCODE_CLIENT`                           | `cli`                                                               | `open-sse/executors/opencode.ts`                | 當 `OPENCODE_SYNTHESIZE_CLI_HEADERS` 啟用時，用於合成的 `x-opencode-client` 標頭的值。                                                                                                                                                                                                      |
| `OPENCODE_PROJECT`                          | `default`                                                           | `open-sse/executors/opencode.ts`                | 當 `OPENCODE_SYNTHESIZE_CLI_HEADERS` 啟用時，用於合成的 `x-opencode-project` 標頭的值。                                                                                                                                                                                                     |
| `OMNIROUTE_OPENCODE_GO_AUTH_COOKIE`         | _（未設定）_                                                        | `open-sse/services/usage.ts`                    | 在較短別名之前使用的替代 OpenCode Go `auth` Cookie 環境變數。敏感資訊；當設定多個帳戶時，建議使用每個連線的儀表板欄位。                                                                                                                                                                    |
| `OMNIROUTE_OLLAMA_CLOUD_USAGE_URL`          | `https://ollama.com/settings`                                       | `open-sse/services/usage.ts`                    | 用於用量抓取的 Ollama Cloud 設定 URL。可為中繼/測試裝置進行覆寫。                                                                                                                                                                                                                            |
| `OLLAMA_USAGE_COOKIE`                       | _（未設定）_                                                        | `open-sse/services/usage.ts`                    | 用於設定頁面用量抓取的 Ollama Cloud `__Secure-session` Cookie。敏感資訊；當設定多個帳戶時，建議使用每個連線的儀表板欄位。                                                                                                                                                                  |
| `OLLAMA_CLOUD_USAGE_COOKIE`                 | _（未設定）_                                                        | `open-sse/services/usage.ts`                    | 替代的 Ollama Cloud `__Secure-session` Cookie 環境變數。敏感資訊；當設定多個帳戶時，建議使用每個連線的儀表板欄位。                                                                                                                                                                          |
| `OMNIROUTE_OLLAMA_USAGE_COOKIE`             | _（未設定）_                                                        | `open-sse/services/usage.ts`                    | 在較短別名之前使用的替代 Ollama Cloud `__Secure-session` Cookie 環境變數。敏感資訊；當設定多個帳戶時，建議使用每個連線的儀表板欄位。                                                                                                                                                      |
| `OMNIROUTE_CODEWHISPERER_BASE_URL`          | `https://codewhisperer.us-east-1.amazonaws.com`                     | `open-sse/services/usage.ts`                    | CodeWhisperer（AWS Kiro）用量限制端點。可為中繼/測試裝置進行覆寫。                                                                                                                                                                                                                           |

> [!IMPORTANT]
> 當在反向代理（nginx、Caddy）後方部署時，如果 OAuth 回呼或產生的公開連結需要使用該主機名稱，請將 `NEXT_PUBLIC_BASE_URL` 設定為穩定的公開 URL（例如 `https://omniroute.example.com`）。否則 OAuth 回呼可能因 redirect_uri 不匹配而失敗，且產生的公開連結可能指向內部容器原始。
>
> 對於伺服器對伺服器作業，請將 `BASE_URL` 保留為內部迴路/容器 URL。請勿使用瀏覽器 `Origin` 或公開主機名稱來進行含有憑證的內部自我提取。
>
> 已驗證的儀表板寫入不需要靜態的公開基礎 URL：儀表板會發送帶有工作階段綁定 CSRF 權杖的同源不安全請求。OmniRoute 仍會為非儀表板瀏覽器整合集中化公開原始驗證：先信任明確的公開 URL 環境變數；除非啟用 `OMNIROUTE_TRUST_PROXY` 且直接代理對等已被權杖戳記為受信任，否則原始的 `Forwarded` / `X-Forwarded-*` 標頭將被忽略。請勿使用 CORS 設定來修復同源儀表板請求；CORS 僅適用於跨來源瀏覽器用戶端。

---

## 8. 對外代理

透過 HTTP 或 SOCKS5 代理路由上游 LLM 提供者呼叫，以進行出口控制、地理路由或 IP 遮罩。

| 變數                                       | 預設值      | 原始檔                                    | 說明                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------ | ----------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY`                      | `true`      | `open-sse/executors`                      | 啟用上游呼叫的 SOCKS5 代理代理。使用 `false` 選擇退出。                                                                                                                                                                                                                                                                                                        |
| `NEXT_PUBLIC_ENABLE_SOCKS5_PROXY`          | `true`      | 用戶端                                     | 用戶端對 SOCKS5 可用性的感知。                                                                                                                                                                                                                                                                                                                                |
| `HTTP_PROXY`                               | _（未設定）_ | Node.js 標準                               | 上游呼叫的 HTTP 代理。                                                                                                                                                                                                                                                                                                                                        |
| `HTTPS_PROXY`                              | _（未設定）_ | Node.js 標準                               | 上游呼叫的 HTTPS 代理。                                                                                                                                                                                                                                                                                                                                       |
| `ALL_PROXY`                                | _（未設定）_ | Node.js 標準                               | 通用代理（支援 `socks5://`）。                                                                                                                                                                                                                                                                                                                                |
| `NO_PROXY`                                 | _（未設定）_ | Node.js 標準                               | 逗號分隔的主機名稱/IP，以繞過代理。                                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_PROXY_DISPATCHER_CONNECTIONS`   | `32`        | `open-sse/utils/proxyDispatcher.ts`       | 每個快取 HTTP/SOCKS 代理分配器的最大並行 Socket。當多個請求共用相同帳戶層級代理時，像是 Codex `/v1/responses` 這類長壽命的 SSE 串流需要多個連線。超過 `256` 的值將被限制。                                                                                                                                                                                     |
| `SOCKS_HANDSHAKE_TIMEOUT_MS`               | `10000`     | `open-sse/utils/socksConnectorWithFamily.ts` | SOCKS5 握手（連線）逾時（毫秒）。當單一住宅閘道主機受到高並發（例如 100 個同時請求）衝擊時調高 — 在飽和的連線池下，即使代理可達，真實握手時間也可能超過 10 秒，否則會顯示為錯誤的 `[Proxy Fast-Fail] Proxy unreachable`。上限為 `120000`。                                                                                                                     |
| `PROXY_FAIL_OPEN`                          | `false`     | `src/sse/handlers/chatHelpers.ts`         | 設為 `false`（預設）時，分配代理失敗的請求會被**拒絕（關閉失敗）**，而不是回退至直接連線 — 可防止真實 IP 洩漏。設為 `true` 以恢復舊版的 DIRECT 回退。                                                                                                                                                                                                         |
| `ENABLE_TLS_FINGERPRINT`                   | `false`     | `open-sse/executors`                      | 使用 wreq-js 偽造 TLS 指紋（模仿 Chrome 124）。對抗 JA3/JA4 封鎖。                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_TURNSTILE_IGNORE_TLS_ERRORS`    | `false`     | `open-sse/services/claudeTurnstileSolver.ts` | 允許 Claude Turnstile Playwright 瀏覽器上下文忽略 HTTPS 憑證錯誤。                                                                                                                                                                                                                                                                                            |

### 情境

| 情境                                      | 設定                                                                                                                    |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **透過 SSH 隧道的 SOCKS5**                | `ALL_PROXY=socks5://127.0.0.1:7890`、`ENABLE_SOCKS5_PROXY=true`                                                         |
| **企業 HTTP 代理**                        | `HTTP_PROXY=http://proxy.corp.com:3128`、`HTTPS_PROXY=http://proxy.corp.com:3128`、`NO_PROXY=localhost,internal.corp.com` |
| **反指紋**                                | `ENABLE_TLS_FINGERPRINT=true` — 需要 `wreq-js`（已包含）                                                                |
| **出口受控／無直接存取**                  | 保持 `PROXY_FAIL_OPEN=false`（預設）。代理不可用時請求嚴格失敗，不會透過直接連線洩漏。                                   |
| **舊版／開發 — 允許直接回退**             | `PROXY_FAIL_OPEN=true`。恢復強化前行為：代理解析失敗時使用直接連線。                                                     |

> **注意（NVIDIA 驗證繞過 — #3226）：** NVIDIA 的 API 金鑰驗證端點
> 在透過全域代理/TLS 修補的 fetch（undici 分配器 → 504）路由時會停滯。
> `src/lib/providers/validation.ts::directHttpsRequest()` 有意使用
> `safeOutboundFetch({ bypassProxyPatch: true })` 繞過該單一驗證呼叫的代理修補。
> 這是文件記載的範圍限定例外 — 它**不**影響聊天/用量出口。
> 此繞過由 `tests/unit/proxy-bypass-scope-guard-3226.test.ts` 進行範圍固定。

---

## 9. CLI 工具整合

控制 OmniRoute 如何發現和啟動 CLI 附屬程式（Claude Code、Codex 等）。

| 變數                        | 預設值       | 原始檔                                          | 說明                                                                                                                                                                       |
| --------------------------- | ------------ | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_MODE`                  | `auto`       | `src/shared/services/cliRuntime.ts`             | `auto` = 搜尋系統 PATH；`manual` = 僅使用明確路徑。                                                                                                                        |
| `CLI_EXTRA_PATHS`           | _（未設定）_  | `src/shared/services/cliRuntime.ts`             | 用於 CLI 二進位檔發現的額外 PATH 條目（冒號分隔）。                                                                                                                        |
| `CLI_CONFIG_HOME`           | _（未設定）_  | `src/shared/services/cliRuntime.ts`             | 覆寫用於讀取 CLI 設定檔（`~/.claude`、`~/.codex`）的家目錄。                                                                                                                |
| `CLI_ALLOW_CONFIG_WRITES`   | `false`      | `src/shared/services/cliRuntime.ts`             | 允許 OmniRoute 寫入 CLI 設定檔（權杖重新整理、工作階段資料）。                                                                                                              |
| `CLI_CLAUDE_BIN`            | `claude`     | `src/shared/services/cliRuntime.ts`             | Claude CLI 二進位檔的自訂路徑。                                                                                                                                             |
| `CLI_CODEX_BIN`             | `codex`      | `src/shared/services/cliRuntime.ts`             | Codex CLI 二進位檔的自訂路徑。                                                                                                                                              |
| `CLI_DROID_BIN`             | `droid`      | `src/shared/services/cliRuntime.ts`             | Droid CLI 二進位檔的自訂路徑。                                                                                                                                              |
| `CLI_OPENCLAW_BIN`          | `openclaw`   | `src/shared/services/cliRuntime.ts`             | OpenClaw CLI 二進位檔的自訂路徑。                                                                                                                                           |
| `CLI_CURSOR_BIN`            | `agent`      | `src/shared/services/cliRuntime.ts`             | Cursor 代理二進位檔的自訂路徑。                                                                                                                                             |
| `CLI_CLINE_BIN`             | `cline`      | `src/shared/services/cliRuntime.ts`             | Cline CLI 二進位檔的自訂路徑。                                                                                                                                              |
| `CLI_CONTINUE_BIN`          | `cn`         | `src/shared/services/cliRuntime.ts`             | Continue CLI 二進位檔的自訂路徑。                                                                                                                                           |
| `CLI_QODER_BIN`             | `qoder`      | `src/shared/services/cliRuntime.ts`             | Qoder CLI 二進位檔的自訂路徑。                                                                                                                                              |
| `CLI_QWEN_BIN`              | `qwen`       | `src/shared/services/cliRuntime.ts`             | Qwen Code CLI 二進位檔的自訂路徑。                                                                                                                                          |
| `CLI_DEVIN_BIN`             | `devin`      | `open-sse/executors/devin-cli.ts`              | Devin CLI 二進位檔的自訂路徑（v3.8.0）。由 Windsurf/Devin 執行器使用。                                                                                                     |
| `AUGGIE_BIN`                | `auggie`     | `open-sse/executors/auggie.ts`                 | 本機 `auggie` 提供者使用的 Augment（Auggie）CLI 二進位檔的絕對路徑覆寫。回退至 `CLI_AUGGIE_BIN`，然後是 PATH 查詢。                                                         |
| `CLI_AUGGIE_BIN`            | `auggie`     | `open-sse/executors/auggie.ts`                 | Augment（Auggie）CLI 二進位檔路徑的別名覆寫（在 `AUGGIE_BIN` 之後檢查）。                                                                                                  |
| `HERMES_HOME`               | `~/.hermes`  | `src/lib/cli-helper/config-generator/hermesHome.ts` | Hermes Agent 家目錄，OmniRoute 在此讀取/寫入 Hermes CLI 設定。與 Hermes PowerShell 安裝程式在 Windows 上設定的環境變數（`%LOCALAPPDATA%\\hermes`）相符。                    |

### CLI 設定檔自動同步

這些功能標誌為選擇加入，預設關閉。也可從 CLI Code 儀表板切換。

| 變數                                    | 預設值  | 原始檔                                          | 說明                                                                                                                                                                                                                                             |
| --------------------------------------- | ------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`    | `false` | `src/shared/constants/featureFlagDefinitions.ts` | 在提供者模型同步後，自動根據即時目錄重新寫入 `~/.codex/*.config.toml` 設定檔。需要 `CLI_ALLOW_CONFIG_WRITES`；絕不變更作用中/預設的 Codex 設定、驗證、Codex-lb 設定或提供者選擇。                                                              |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES`   | `false` | `src/shared/constants/featureFlagDefinitions.ts` | 在提供者模型同步後，自動根據即時目錄重新寫入 `~/.claude/profiles/<name>/settings.json` Claude Code 設定檔。需要 `CLI_ALLOW_CONFIG_WRITES`；絕不變更作用中/預設的 Claude 設定、驗證或提供者選擇。                                              |

### Docker 範例

```bash
# 將主機二進位檔掛載至容器並告訴 OmniRoute 它們的位置：
CLI_EXTRA_PATHS=/host-cli/bin
CLI_CONFIG_HOME=/root
CLI_ALLOW_CONFIG_WRITES=true
CLI_CLAUDE_BIN=/host-cli/bin/claude
```

### CLI 二進位檔（`omniroute`）輔助工具

這些變數調整 `omniroute` CLI 二進位檔自身的行為（非上述的附屬程式偵測）。

| 變數                             | 預設值       | 原始檔                                    | 說明                                                                                                                           |
| -------------------------------- | ------------ | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_LANG`                 | _（系統）_   | `bin/cli/i18n.mjs`                        | 強制 CLI 輸出語言。BCP-47 地區設定（例如 `en`、`pt-BR`）。覆寫系統地區設定環境變數（LC_ALL、LC_MESSAGES）。                        |
| `OMNIROUTE_SHOW_LOG`             | _（未設定）_ | `bin/cli/runtime/processSupervisor.mjs`   | 設為 `1` 以在監督模式下將伺服器 stdout/stderr 轉發至終端機。等同於 `omniroute serve` 的 `--log` 標記。                         |
| `OMNIROUTE_CLI_TOKEN`            | _（未設定）_ | `bin/cli/api.mjs`                         | 作為 `x-omniroute-cli-token` 標頭注入的機器驗證權杖。在工作 8.12 中自動產生。                                                 |
| `OMNIROUTE_HTTP_TIMEOUT_MS`      | `30000`     | `bin/cli/api.mjs`                         | CLI → 伺服器請求的每次嘗試 HTTP 逾時（毫秒）。                                                                                  |
| `OMNIROUTE_VERBOSE`              | `0`         | `bin/cli/api.mjs`                         | 設為 `1` 以在 CLI 指令期間將重試/退避診斷資訊列印至 stderr。                                                                   |
| `OMNIROUTE_PLUGIN_PATH`          | _（未設定）_ | `bin/cli/plugins.mjs`                     | CLI 外掛發現的自訂目錄（`omniroute-cmd-*` 套件）。未設定時預設為 `~/.omniroute/plugins/`。                                     |
| `OMNIROUTE_PLUGINS_ALLOW_EXEC`   | `0`         | `src/lib/plugins/pluginWorker.ts`         | 設為 `1` 以允許外掛請求 `exec` 權限（從工作者沙箱產生子程序）。僅限本機運營者。                                                |

---

## 10. 內部代理與 MCP 整合

| 變數                                              | 預設值                                              | 原始檔                                                      | 說明                                                                                                                                                                 |
| ------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                              | 自動偵測                                            | `open-sse/mcp-server/server.ts`                             | MCP/A2A 工具用來連線 OmniRoute 的明確 URL。覆寫 localhost 自動偵測。                                                                                                |
| `OMNIROUTE_API_KEY`                               | _（未設定）_                                        | MCP/A2A 模組                                                | 內部 MCP 工具和 A2A 技能呼叫的 API 金鑰。                                                                                                                            |
| `OMNIROUTE_API_KEY_ID`                            | _（未設定）_                                        | `open-sse/mcp-server/audit.ts`                              | 用於 MCP 稽核紀錄歸因的金鑰 ID。                                                                                                                                    |
| `ROUTER_API_KEY`                                  | _（未設定）_                                        | 舊版                                                        | `OMNIROUTE_API_KEY` 的舊版別名。                                                                                                                                     |
| `OMNIROUTE_ISSUE_AGENT_ENABLED`                   | `false`                                             | `src/app/api/issue-agent/runs/route.ts`                     | 啟用離線/本機 Issue Agent 記錄式分類。除非明確執行本機記錄式分類工作流程，否則請保持停用。                                                                         |
| `OMNIROUTE_ISSUE_AGENT_TIMEOUT_MS`                | _（未設定）_                                        | `src/lib/issueAgent/execution.ts`                           | 單次 Issue Agent 記錄式分類執行的逾時（毫秒）。限制在內部最大值內；未設定或無效時回退至內建預設值。                                                                    |
| `OMNIROUTE_CONTEXT`                               | _（活躍上下文）_                                    | `bin/cli/program.mjs`、`bin/cli/api.mjs`                   | CLI 遠端模式的 `omniroute` 指令上下文/設定檔；覆寫本機上下文儲存中的活躍上下文。等同於 `--context <name>`。                                                          |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`                    | `true`                                              | `open-sse/mcp-server/server.ts`                             | 對 MCP 工具呼叫強制執行基於範圍的存取控制。                                                                                                                          |
| `OMNIROUTE_MCP_SCOPES`                            | _（全部）_                                          | `open-sse/mcp-server/server.ts`                             | 逗號分隔的範圍：`admin`、`combos`、`health`、`models`、`routing`、`budget`、`metrics`、`pricing`、`memory`、`skills`。                                              |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`             | `false`                                             | `open-sse/mcp-server/descriptionCompressor.ts`              | 在序列化清單前壓縮 MCP 工具描述。啟用值：`1`、`true`、`on`。                                                                                                         |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION`           | `rtk`                                               | `open-sse/mcp-server/descriptionCompressor.ts`              | 壓縮演算法/設定檔。停用值：`0`、`false`、`off`。                                                                                                                    |
| `MODEL_SYNC_INTERVAL_HOURS`                       | `24`                                                | `src/shared/services/modelSyncScheduler.ts`                 | 模型目錄同步間隔（小時）。                                                                                                                                           |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES`           | `70`                                                | `src/server-init.ts`                                        | 提供者速率限制和配額輪詢間隔。                                                                                                                                       |
| `PROVIDER_LIMITS_SYNC_SPACING_MS`                 | `1500`                                              | `src/lib/usage/providerLimits.ts`                           | 大量同步中連續 OAuth 配額擷取之間的間隔（毫秒）；OAuth 連線一次擷取一個，以避免突發上游。`0` 表示選擇退出（並發）。                                                   |
| `OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS`           | `250`                                               | `open-sse/services/quotaFetchThrottle.ts`                   | 每個請求預檢/監控路徑上連續上游配額擷取之間的最小間隔（毫秒）；分散並發網路呼叫，使同一 IP 上的多個帳戶不會突發上游。連接到 Codex（`/wham/usage`）、DeepSeek、Bailian（兩個擷取站點）、OpenCode 和 Crof 配額擷取器（#6009、#6911）。通用的 `usage.ts::getUsageForProvider` 分發路徑（github/glm/minimax/nanogpt/xai/等）尚未涵蓋 — 另行追蹤。快取命中不受影響。`0` 停用；限制在 `0..5000`。 |
| `PROVIDER_LIMITS_POST_USAGE_REFRESH_DELAY_MS`     | `5000`                                              | `src/lib/usage/providerLimits.ts`                           | 在實際用量事件後重新整理提供者限制前的延遲（毫秒），給上游配額 API 時間來記錄消耗。                                                                                 |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`           | `false`                                             | `src/instrumentation-node.ts`                               | 停用所有背景服務（同步、定價、模型重新整理）。適用於 CI/測試。                                                                                                      |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS`       | _（未設定）_                                        | `src/lib/config/runtimeSettings.ts`                         | 在自動化測試偵測下強制啟用背景任務。設為 `1` 以覆寫測試啟發式。                                                                                                    |
| `OMNIROUTE_BUDGET_RESET_JOB_INTERVAL_MS`          | `600000`                                            | `src/lib/jobs/budgetResetJob.ts`                            | 預算重設檢查頻率（毫秒）。下限 `10000`。                                                                                                                             |
| `OMNIROUTE_CONNECTION_RECOVERY_INTERVAL_MS`       | `60000`                                             | `src/lib/quota/connectionRecovery.ts`                      | 主動連線冷卻恢復頻率（毫秒）：重新驗證其短暫 `rate_limited_until` 已過期的連線，在請求熱路徑之外。下限 `5000`。                                                       |
| `OMNIROUTE_DISABLE_CONNECTION_RECOVERY`           | `false`                                             | `src/lib/quota/connectionRecovery.ts`                      | 停用主動連線冷卻恢復排程器（`getProviderCredentials` 中的懶式恢復仍然適用）。                                                                                        |
| `OMNIROUTE_REASONING_CACHE_CLEANUP_INTERVAL_MS`   | `1800000`                                           | `src/lib/jobs/reasoningCacheCleanupJob.ts`                 | 推理快取清理頻率（毫秒）。下限 `60000`。                                                                                                                             |
| `OMNIROUTE_CONFIG_HOT_RELOAD_MS`                  | `5000`                                              | `src/lib/config/hotReload.ts`                               | 設定熱重新載入的輪詢間隔（毫秒）。低於 `1000` 將被拒絕。                                                                                                            |
| `OMNIROUTE_DISABLE_REDIS_AUTH_CACHE`              | _（啟用中）_                                        | `src/lib/db/apiKeys.ts`                                     | 設為 `1` 以繞過 Redis 支援的 API 金鑰驗證快取（強制資料庫讀取）。                                                                                                    |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`             | `0`                                                 | `open-sse/services/compression/engines/rtk/filterLoader.ts` | 信任使用者管理的 RTK 專案過濾規則，無需嚴格的簽章檢查。                                                                                                              |
| `COMPRESSION_PIPELINE_BREAKER_ENABLED`            | `false`                                             | `open-sse/services/compression/pipelineEngineBreaker.ts`    | T02 堆疊管線每個引擎的斷路器主開關。**選擇加入（預設關閉）** — 啟用時，跨請求重複拋出的引擎會跳過（開放失敗）進行冷卻；關閉時 = 位元組相同的舊版行為。                |
| `COMPRESSION_PIPELINE_BREAKER_THRESHOLD`          | `3`                                                 | `open-sse/services/compression/pipelineEngineBreaker.ts`    | 在引擎的斷路器開啟前連續跨請求失敗次數。                                                                                                                            |
| `COMPRESSION_PIPELINE_BREAKER_COOLDOWN_MS`        | `30000`                                             | `open-sse/services/compression/pipelineEngineBreaker.ts`    | 已開啟引擎在進行半開探測前保持跳過的毫秒數。                                                                                                                        |
| `COMPRESSION_CCR_RETRIEVAL_RAMP_FACTOR`           | `2`                                                 | `open-sse/services/compression/engines/ccr/index.ts`       | T08/H8 CCR 檢索回饋斜坡：儲存區塊的每次先前檢索都會線性提高其有效 `minChars`（經常檢索的內容壓縮較少；`>=3` 次檢索 = 永不壓縮）。`1` 停用斜坡（僅在閥值處進行二進位跳過）。 |
| `COMPRESSION_PREFIX_FREEZE_ENABLED`               | `false`                                             | `open-sse/services/compression/prefixFreeze.ts`            | T08/H5 用量觀察前綴凍結主開關。**選擇加入（預設關閉）** — 啟用時，觀察到 `>=` 閥值的系統提示被視為穩定的可快取前綴，並從壓縮中保留，即使靜態快取啟發式遺漏（凍結僅*保留*，絕不變異）。 |
| `COMPRESSION_PREFIX_FREEZE_THRESHOLD`             | `3`                                                 | `open-sse/services/compression/prefixFreeze.ts`            | 系統提示在被視為凍結的穩定前綴之前的觀察次數。                                                                                                                      |
| `OMNIROUTE_BOOTSTRAPPED`                          | `false`                                             | `src/app/(dashboard)/dashboard/page.tsx`                   | 由啟動腳本在初始設定後設為 `true`。控制設定精靈的可見性。                                                                                                            |
| `OMNIROUTE_ALLOW_BODY_PROJECT_OVERRIDE`           | `0`                                                 | `open-sse/executors/antigravity.ts`                        | 逃逸艙口：允許請求主體覆寫 Antigravity 專案欄位。                                                                                                                   |
| `ANTIGRAVITY_CREDITS`                             | _（未設定）_                                        | `open-sse/services/antigravityCredits.ts`                  | 覆寫 Antigravity 公告的剩餘點數（測試/強制值）。                                                                                                                    |
| `AGY_TOKEN_FILE`                                  | `~/.gemini/antigravity-cli/antigravity-oauth-token`  | `src/app/api/providers/agy-auth/apply-local/route.ts`       | 覆寫自動偵測本機登入匯入的 Antigravity CLI（agy）權杖檔案路徑。                                                                                                     |

### OAuth CLI 橋接（內部）

| 變數                  | 預設值       | 原始檔                            | 說明                                    |
| --------------------- | ------------ | --------------------------------- | --------------------------------------- |
| `OMNIROUTE_SERVER`    | 自動偵測     | `src/lib/oauth/config/index.ts`   | CLI↔OmniRoute 驗證橋接的伺服器 URL。    |
| `OMNIROUTE_TOKEN`     | _（未設定）_  | `src/lib/oauth/config/index.ts`   | CLI 橋接的驗證權杖。                    |
| `OMNIROUTE_USER_ID`   | `cli`        | `src/lib/oauth/config/index.ts`   | CLI 橋接工作階段的使用者 ID。           |
| `SERVER_URL`          | _（未設定）_  | `src/lib/oauth/config/index.ts`   | `OMNIROUTE_SERVER` 的舊版別名。         |
| `CLI_TOKEN`           | _（未設定）_  | `src/lib/oauth/config/index.ts`   | `OMNIROUTE_TOKEN` 的舊版別名。          |
| `CLI_USER_ID`         | _（未設定）_  | `src/lib/oauth/config/index.ts`   | `OMNIROUTE_USER_ID` 的舊版別名。        |

---

## 11. OAuth 提供者憑證

**本機開發**的內建憑證。對於遠端部署，請在各提供者的開發者主控台自行註冊。
</parameter>
