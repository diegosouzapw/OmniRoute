# Tunnels Guide (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md)

---

> **事實來源：** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`、`src/app/api/tunnels/`
> **最後更新：** 2026-06-28 — v3.8.40

OmniRoute 可透過三種隧道後端，將其本機伺服器 (`http://localhost:20128`) 公開至
網際網路。這適用於：

- 需要可公開存取之重新導向 URL 的雲端提供者（Antigravity、Gemini、Cursor）
  OAuth 回呼。
- 無須部署 VM，即可與團隊成員分享您的本機執行個體。
- 行動裝置、遠端或跨網路測試。

這三種後端全都在程序內管理 — OmniRoute 可從儀表板或 REST API 啟動／停止底層
二進位檔或 SDK。不需要設定反向代理或 systemd。

## 後端概覽

| 後端                    | 持久性                                | 費用            | 設定                                   |
| ----------------------- | ------------------------------------- | --------------- | -------------------------------------- |
| **Cloudflare 快速隧道** | 暫時性（每次重新啟動時 URL 都會變更） | 免費            | 無需設定 — 自動安裝 `cloudflared`      |
| **ngrok**               | 設定付費方案或固定網域後可保持穩定    | 免費方案 + 付費 | 需要 ngrok 帳戶 + authtoken            |
| **Tailscale Funnel**    | 在您的 tailnet 中，每個節點均保持穩定 | 個人使用免費    | 需要安裝 Tailscale + 登入 + Funnel ACL |

實作位於 `src/lib/cloudflaredTunnel.ts`、
`src/lib/ngrokTunnel.ts` 和 `src/lib/tailscaleTunnel.ts`。這三者皆會傳回具有共同結構的
`status` 物件，其中包含 `phase`、`running`、`publicUrl`、`apiUrl`、
`targetUrl` 和 `lastError` 欄位，讓儀表板能以一致方式呈現它們。

## 1. Cloudflare Tunnel（快速隧道 + 具名隧道）

`src/lib/cloudflaredTunnel.ts` 會將 `cloudflared` 作為子程序執行。它支援
兩種模式，依是否提供具名隧道設定而定：

- **快速隧道（預設）。** 執行 `cloudflared tunnel --url
http://localhost:<apiPort>`，並從 stdout 剖析獲指派的 `*.trycloudflare.com` URL。
  URL 為暫時性，每次重新啟動時都會變更。
- **具名隧道（選用）。** 當 `CLOUDFLARED_CONFIG` 指向本機管理的
  cloudflared `config.yml` 時，OmniRoute 會執行 `cloudflared tunnel --no-autoupdate
--config <path> run`，為您提供**穩定的具名主機名稱**。該設定會提供
  隧道 UUID、`credentials-file` 和 `ingress` 路由，因此不會傳遞
  `--url`，也不需要 Zero Trust 儀表板權杖。`run` 會從設定中的絕對
  `credentials-file` 路徑讀取認證資料 — 不需要 `cert.pem`
  （該檔案僅用於隧道生命週期管理）。

主要行為：

- **自動安裝。** 首次使用時，OmniRoute 會從官方 GitHub releases 下載最新的
  `cloudflared` 二進位檔（受管理的安裝位於
  `DATA_DIR/cloudflared/`）。執行前，會根據 release manifest 驗證所下載資產的
  SHA256。
- **程序監督。** cloudflared PID 和解析後的 URL 會保存至
  `quick-tunnel-state.json`，讓儀表板能在重新載入後恢復狀態。

### 具名隧道設定（穩定的主機名稱）

1. 使用 cloudflared CLI 建立本機管理的隧道（僅需執行一次）：

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. 撰寫 `~/.cloudflared/config.yml`，將您的主機名稱路由至 OmniRoute 的本機
   API 連接埠（預設為 20128）：

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. 將 OmniRoute 指向該設定，然後（重新）啟動隧道：

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # 選用 — 覆寫 OmniRoute 回報的主機名稱；否則會從設定中的
   # 第一條 ingress 規則讀取：
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   請使用與快速隧道相同的方式啟用隧道（請參閱下方的 REST／儀表板／CLI）。
   具名隧道不會輸出可供擷取的公開 URL，因此就緒狀態會根據 cloudflared 已註冊的
   邊緣連線進行偵測，而 `publicUrl`／`apiUrl` 則會根據
   `CLOUDFLARED_HOSTNAME`（或設定中的第一個 ingress 主機名稱）回報。

### 透過 REST 啟用／停用

此端點使用 `{action: "enable" | "disable"}` 主體，而不是個別的
`start`／`stop` 路徑。需要管理驗證（管理員工作階段或管理員 API 金鑰）。

```bash
# 啟用
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# 狀態
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# 停用
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

或透過儀表板：**Settings → Tunnels → Cloudflare**。

### 選用環境變數

| 變數                                                 | 用途                                                                                                                                         |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | 覆寫二進位檔路徑。若已設定且有效，OmniRoute 會使用該路徑，而不會下載。                                                                       |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | 傳輸協定（預設為 `http2`；亦支援 `quic`、`auto`）。                                                                                          |
| `CLOUDFLARED_CONFIG`                                 | 指向本機管理的 cloudflared `config.yml` 之路徑。設定後，OmniRoute 會執行**具名／持久性**隧道（`tunnel --config <path> run`），而非快速隧道。 |
| `CLOUDFLARED_HOSTNAME`                               | 覆寫具名隧道回報的公開主機名稱（例如 `ai.example.com`）。若未設定，則從設定檔中第一個 `ingress` 的主機名稱讀取。                             |

## 2. ngrok

`src/lib/ngrokTunnel.ts` 使用 **`@ngrok/ngrok` SDK**（程序內執行，不使用 CLI
子程序）。原生模組會在首次啟動時延遲匯入，因此沒有預先建置二進位檔的平台
不會在應用程式啟動時發生錯誤。

### 先決條件

1. 在 <https://ngrok.com> 註冊。
2. 從 ngrok 儀表板複製您的 authtoken。
3. 透過下列任一方式提供：
   - `.env`：`NGROK_AUTHTOKEN=<token>`，或
   - 儀表板：**設定 → 通道 → ngrok**，或
   - REST 主體（單次使用）：`{"action":"enable","authToken":"<token>"}`。

如果兩者皆未設定，狀態將傳回 `phase: "needs_auth"`。

### 透過 REST 啟用／停用

```bash
# 啟用（使用環境中的 NGROK_AUTHTOKEN）
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# 使用內嵌權杖啟用
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# 狀態
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# 停用
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

回應會包含指派的 `publicUrl`（例如
`https://abcd-1234.ngrok-free.app`）。自訂網域、區域與原則規則
必須在 ngrok 儀表板中設定——OmniRoute 本身只會將本機目標 URL 轉送至
SDK。

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` 會協調系統的 `tailscale` CLI，透過
**Funnel**（Tailscale 用於 serve 的公用網際網路輸出）公開本機 API 連接埠。
它支援完整的生命週期：安裝、登入、啟動常駐程式、啟用與停用。

此實作會呼叫 `tailscale funnel --bg <port>`（背景模式）。
公開 URL 的格式為 `https://<machine>.<tailnet>.ts.net/`。

### 先決條件

1. 安裝 Tailscale（或讓 OmniRoute 執行安裝——請參閱下方的 `install` 端點）。
2. 登入（使用 `tailscale login` 或 OmniRoute 的 `login` 端點）。
3. 在 Tailscale 管理控制台中為您的 tailnet 啟用 Funnel：
   <https://login.tailscale.com/admin/settings/features>。

在 Linux 與 macOS 上，控制常駐程式（`tailscaled`）需要 `sudo`。
POST 端點接受選用的 `sudoPassword` 欄位，該欄位會在呼叫期間轉送至
OmniRoute 的 MITM 密碼快取（`getCachedPassword` / `setCachedPassword`）。
Windows 會使用位於
`C:\Program Files\Tailscale\tailscale.exe` 的預設服務安裝。

### REST 端點

Tailscale 提供的介面比其他後端更豐富，因為安裝、登入、常駐程式與通道
是各自獨立的事項。

| 端點                                  | 方法   | 用途                                                     |
| ------------------------------------- | ------ | -------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | 彙總的通道狀態（`phase`、`tunnelUrl`、`apiUrl` 等）      |
| `/api/tunnels/tailscale/check`        | `GET`  | 較低階的檢查：是否已安裝？已登入？常駐程式正在執行？     |
| `/api/tunnels/tailscale/install`      | `POST` | 安裝 Tailscale（透過 SSE 串流傳送進度事件）— Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | 在 Linux/macOS 上啟動 `tailscaled`                       |
| `/api/tunnels/tailscale/login`        | `POST` | 開始登入流程；傳回要在瀏覽器中開啟的 `authUrl`           |
| `/api/tunnels/tailscale/enable`       | `POST` | 為 API 連接埠啟動 Funnel                                 |
| `/api/tunnels/tailscale/disable`      | `POST` | 停止 Funnel                                              |

所有 Tailscale 端點都需要管理驗證（請參閱 `routeUtils.ts ::
requireTailscaleAuth`）。

啟用範例：

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

如果尚未在管理控制台中啟用 Funnel，回應會包含
`funnelNotEnabled: true`，以及要在瀏覽器中開啟的 `enableUrl`。

### 選用環境變數

| 變數            | 用途                          |
| --------------- | ----------------------------- |
| `TAILSCALE_BIN` | 覆寫 `tailscale` 二進位檔路徑 |

## 端點摘要

| 端點                                  | 方法   | 主體                                | 驗證     |
| ------------------------------------- | ------ | ----------------------------------- | -------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | 管理權限 |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | 管理權限 |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | 管理權限 |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | 管理權限 |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | 管理權限 |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | 管理權限 |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | 管理權限 |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | 管理權限 |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | 管理權限 |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | 管理權限 |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | 管理權限 |

沒有中央 `/api/settings/tunnels` 端點——每個後端皆彼此獨立。

## OAuth 回呼注意事項

透過通道公開 OmniRoute 時，儀表板與 OAuth 流程必須依據**公開**主機名稱建立回呼 URL，而非 `localhost`。否則，OAuth 提供者會將使用者重新導向至其伺服器無法連線的 URL，導致交握失敗。

編輯儀表板及儲存設定時，不需要在 `NEXT_PUBLIC_BASE_URL` 中固定通道主機名稱。已驗證身分的儀表板會使用與工作階段繫結的 CSRF 權杖，傳送同源的不安全請求，因此登入後仍可使用暫時性的 Cloudflare Quick Tunnel 主機進行一般 UI 管理。

設定：

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

並在啟動 OAuth 前重新啟動 OmniRoute。對於暫時性的 Cloudflare Quick Tunnels，URL 會在每次重新啟動後變更，因此若要在正式環境中使用 OAuth，建議使用具備保留網域的 ngrok 或 Tailscale Funnel。

## 健康狀態與監控

儀表板會在**設定 → 通道**下顯示通道狀態：

- 使用中的後端以及目前的 `phase`（`stopped`、`starting`、`running`、`needs_auth`、`error`）。
- 目前的公開 URL，以及衍生出的 API URL（`<publicUrl>/v1`）。
- 通道正在轉送至的本機目標 URL。
- 最近一次的錯誤訊息（若有）。

若要進行程式化監控，請輪詢各後端的 `GET` 端點。允許同時執行多個後端；OmniRoute 會分別追蹤每個後端。

## 疑難排解

### 「找不到 cloudflared 二進位檔」

OmniRoute 會在首次使用時嘗試自動安裝。如果安裝遭到封鎖（網路受限、無法存取 GitHub），請從 <https://github.com/cloudflare/cloudflared/releases> 手動下載 `cloudflared`，並設定 `CLOUDFLARED_BIN=/path/to/cloudflared`。

### 「ngrok：需要 authtoken」

`phase: "needs_auth"` 表示找不到 authtoken。請在 `.env` 中設定 `NGROK_AUTHTOKEN`、透過儀表板進行設定，或在啟用用的 POST 主體中傳遞 `authToken`。

### 「tailscale：未啟用 funnel」

當啟用回應包含 `funnelNotEnabled: true` 時，表示您的 tailnet 已停用 Funnel。請開啟回傳的 `enableUrl`（或管理主控台的功能頁面），並開啟 Funnel。

### 通道 URL 變更導致 OAuth 中斷

請使用具備保留網域的 ngrok 或 Tailscale Funnel（兩者皆可為每個節點提供穩定網址）。Cloudflare Quick Tunnels 在設計上屬於暫時性通道，不建議用於長期使用的 OAuth 回呼。

### 在 Linux/macOS 上使用 Tailscale 時出現權限遭拒

`tailscaled` 需要 root 權限。請向相關的 POST 端點提供 `sudoPassword`，或自行執行守護程式（`sudo systemctl start tailscaled`）。

## 另請參閱

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — 用於出口流量的對外代理（1proxy、SOCKS5、HTTP）。
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — 環境變數的完整清單，包括
  `NEXT_PUBLIC_BASE_URL`。
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md)、
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — 可取代隧道、用於穩定公開託管的方案。
- 原始碼：`src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`、
  `src/app/api/tunnels/`。
