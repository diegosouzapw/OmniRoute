# CLI Machine-ID Token (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md)

---

## 概述

OmniRoute CLI 命令會使用透過 `x-omniroute-cli-token` 請求標頭傳送的
`HMAC-SHA256(machine-id, salt)` 權杖，向本機管理 API 進行驗證。

這可讓 CLI 子命令（`omniroute status`、`omniroute providers` 等）
呼叫管理端點，而不需要使用者在每次呼叫時提供 JWT 或密碼。

## 運作方式

1. `getMachineTokenSync()` 透過 `node-machine-id` 讀取硬體機器 ID
   （失敗時會回退為空字串，並停用 CLI 驗證）。
2. 它會計算 `HMAC-SHA256(machine_id, salt)`，並傳回完整的 64 字元
   十六進位摘要——一個與此機器綁定、具確定性且不可逆的權杖。
3. 只有當解析後的目的地是明確的回送 URL（`localhost`、`127.0.0.0/8` 或
   回送 IPv6）時，CLI 才會以 `x-omniroute-cli-token` 傳送權杖。攜帶權杖的
   請求會使用 `redirect: error`，因此本機重新導向無法將其轉送到其他來源。
   遠端上下文則會改用具範圍限制的存取權杖。如果無法衍生權杖，CLI 會省略該標頭，
   且 `omniroute doctor` 會回報失敗，而不會將空權杖視為有效。
4. 伺服器（`src/server/authz/policies/management.ts`）會使用相同的 salt
   重新計算預期權杖，並透過 `timingSafeEqual` 進行比較，以防止基於時間差的擷取攻擊。

## 安全屬性

| 屬性                       | 詳細資訊                                                                                                                                  |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **僅限回送位址**           | 僅當伺服器受信任的對等端區域性標記（衍生自實際 TCP 對等端位址）指出為回送位址時才接受。絕不會信任由用戶端控制的 `Host` 標頭來判斷區域性。 |
| **固定時間比較**           | `crypto.timingSafeEqual` 可防止時間差攻擊。                                                                                               |
| **不可逆**                 | 無法從 HMAC 輸出還原 machine-id。                                                                                                         |
| **無法繞過 `always` 保護** | 會在檢查 CLI 權杖之前評估 `isAlwaysProtectedPath()`。`/api/shutdown` 和 `/api/settings/database` 一律需要 JWT。                           |
| **不可匯出**               | 權杖絕不會寫入磁碟或記錄至日誌。                                                                                                          |

## 預設 salt（每次安裝隨機產生）

未設定 `OMNIROUTE_CLI_SALT` 時，salt 會是僅產生一次並持久儲存於
`<DATA_DIR>/cli-token-salt.json`（模式 `0600`）的隨機 64 字元十六進位字串——
而不是簽入版本庫的常值 `omniroute-cli-auth-v1`。`src/lib/machineToken.ts`
中的 `getActiveSalt()` 及其位於 `bin/cli/utils/cliToken.mjs` 的對應實作都會讀取
同一個檔案，因此伺服器與此安裝中的每次 CLI 呼叫最終都會使用相同的值；只有在尚無法
建立持久化 salt 或環境變數 salt 時（例如伺服器從未執行過的全新純 CLI 安裝），
才會使用簽入版本庫的常值作為最後的回退值。這修正了舊有固定常值預設值的弱點：
`/etc/machine-id` 通常可由全世界讀取，因此，若未設定 `OMNIROUTE_CLI_SALT`，
任何本機使用者原本都能為每個安裝衍生出相同的權杖。

## 鹽值輪替

設定 `OMNIROUTE_CLI_SALT` 即可在不變更程式碼的情況下輪替衍生權杖——它一律優先於每次安裝時持久化儲存的鹽值。輪替後，此機器上的所有 CLI 處理程序都會自動使用新權杖。這在處理程序清單外洩、可能已暴露先前衍生值時特別有用。

```bash
# 持久化輪替（加入 shell 設定檔）
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# 驗證是否正在使用新權杖
omniroute status
```

## 舊版格式（SHA-256、32 字元）——仍可接受

在使用上述 HMAC 格式之前，CLI 會在 `bin/cli/utils/cliToken.mjs` 中將權杖衍生為 `SHA-256(machineId + salt).hex[0..32]`（32 字元前綴）（對應 `src/lib/machineToken.ts` 中的 `getLegacyCliTokenSync`）。

為了向後相容，伺服器會接受**兩種**格式：驗證器會建立 `expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]`，並使用 `timingSafeEqual` 將傳入的標頭與每個權杖進行比較（`src/server/authz/policies/management.ts` 與 `src/lib/middleware/cliTokenAuth.ts`）。因此，只要權杖符合 64 字元的 HMAC 摘要或 32 字元的舊版 SHA-256 前綴**其中任一種**，即為有效。

**選擇停用：**設定 `OMNIROUTE_DISABLE_CLI_TOKEN=true`（透過環境變數或 `.env`）即可完全停用 CLI 權杖機制；之後所有存取都需要明確的 API 金鑰。建議在多使用者主機上採用此設定，因為 `machine-id` 是以裝置為單位（而非以使用者為單位），同一主機上的其他使用者可能會計算出相同的權杖。

## 檔案

| 檔案                                      | 用途                              |
| ----------------------------------------- | --------------------------------- |
| `src/lib/machineToken.ts`                 | 權杖衍生（`getMachineTokenSync`） |
| `bin/cli/utils/cliToken.mjs`              | CLI 端相同衍生邏輯的對應實作      |
| `<DATA_DIR>/cli-token-salt.json`          | 持久化儲存的每次安裝隨機鹽值      |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` 常數           |
| `src/server/authz/policies/management.ts` | 伺服器端驗證                      |
| `src/server/authz/routeGuard.ts`          | 回送主機檢查（`isLoopbackHost`）  |

## 另請參閱

- `docs/security/ROUTE_GUARD_TIERS.md` — 路由保護層級
- `docs/architecture/AUTHZ_GUIDE.md` — 完整的授權流程
