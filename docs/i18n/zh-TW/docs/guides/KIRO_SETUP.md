# Kiro Setup Guide (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md)

---

本指南說明如何將 Kiro（由 AWS 託管的 AI 程式設計助理）帳戶新增至 OmniRoute，
並著重介紹如何同時執行多個帳戶而不發生工作階段衝突。

---

## 背景：Kiro 帳戶為何可能發生衝突

Kiro 的後端使用 AWS SSO OIDC 用戶端註冊來追蹤作用中的工作階段。
關鍵限制是：**每個 OIDC 用戶端註冊一次只支援一個作用中的
工作階段**。當第二台裝置或第二位使用者使用相同的已註冊用戶端進行驗證時，
後端會使第一個帳戶的重新整理權杖失效。

這與在已有另一個 Kiro 帳戶登入的機器上執行 `kiro-cli login` 時
所造成問題的機制相同——新的登入會撤銷第一個帳戶的權杖。

---

## OmniRoute 如何解決此問題（v3.8.0+）

從 v3.8.0 開始，OmniRoute 會在每次匯入 Kiro 連線時呼叫 `registerClient()`（AWS SSO OIDC）。
如此可讓每個 OmniRoute 連線擁有專屬的 OIDC
用戶端註冊。由於每個用戶端註冊彼此獨立，因此重新整理或
重新驗證某個帳戶不會影響任何其他帳戶的重新整理權杖。

隔離機制適用於重新整理權杖匯入方法，而 API 金鑰驗證則完全
不使用 OIDC 重新整理工作階段：

| 匯入方法                                | 隔離狀態                                                              |
| --------------------------------------- | --------------------------------------------------------------------- |
| AWS Builder ID / IDC 裝置代碼流程       | 自推出裝置代碼流程以來即已隔離                                        |
| **匯入權杖**（手動貼上重新整理權杖）    | 自 v3.8.0 起隔離                                                      |
| **Google / GitHub 社群登入**            | 自 v3.8.0 起隔離                                                      |
| **自動匯入**（kiro-cli SQLite）         | 自 v3.8.0 起隔離（SQLite 路徑原本就已隔離；SSO 快取備援現在也已隔離） |
| **API 金鑰**（長效 CodeWhisperer 金鑰） | 不使用重新整理工作階段；金鑰經驗證後會儲存為 Bearer 憑證              |

---

## v3.8.0 之前建立之連線的移轉注意事項

在 v3.8.0 之前匯入的連線，其 `providerSpecificData` 中未儲存專屬的 OIDC 用戶端註冊。
這些連線仍可繼續運作，但會使用共用的
社群驗證重新整理端點，這表示兩個此類連線仍可能使彼此的權杖失效。

**若要取得隔離功能：**請從**儀表板 → 提供者**刪除舊連線，並
使用任何支援的匯入流程重新匯入。所有新建立的連線都會
自動取得各自的用戶端註冊。

---

## 並行新增兩個 Kiro 帳戶

### 先決條件

- OmniRoute v3.8.0 或更新版本。
- 一個可正常使用的 Kiro 帳戶（電子郵件地址 + 密碼、Google 或 GitHub 登入）。
- 可選擇準備第二個 Kiro 帳戶。

### 步驟 1：匯入第一個帳戶

1. 開啟**儀表板 → 提供者 → 新增提供者 → Kiro**。
2. 選擇下列其中一種方式：
   - **匯入權杖**——貼上以 `aorAAAAAG` 開頭的重新整理權杖。
   - **API 金鑰**——貼上長效的 Kiro / CodeWhisperer API 金鑰。
   - **Google / GitHub 登入**——在瀏覽器中完成 OAuth 流程。
   - **自動匯入**——按一下按鈕；OmniRoute 會從本機 kiro-cli 資料庫或 `~/.aws/sso/cache`
     讀取憑證。
3. 連線隨即儲存。重新整理權杖流程會自動註冊一個專屬的
   OIDC 用戶端。API 金鑰流程會透過 AWS 驗證金鑰，且不會儲存重新整理權杖。

### 步驟 2：匯入第二個帳戶

針對第二個帳戶重複步驟 1。由於每次匯入都會建立獨立的 OIDC
用戶端註冊，因此兩個連線會完全隔離。

### 步驟 3：確認兩個連線皆為作用中

1. **儀表板 → 提供者**——兩個 Kiro 連線都應顯示**作用中**狀態。
2. **儀表板 → 健康狀態**——兩個連線都應通過其權杖健康狀態檢查。

### 步驟 4：使用組合在帳戶之間進行路由

建立以這兩個連線為目標的組合，以便在兩者之間進行負載平衡或故障轉移：

```
kiro/kiro-dev → kiro/kiro-pro
```

如需組合設定資訊，請參閱 [FEATURES.md](./FEATURES.md) 與路由文件。

---

## 企業 / IDC 使用者

對於 AWS IAM Identity Center (IDC) 帳戶，請使用 **Dashboard → Providers → Kiro → Device Code** 中的 **AWS Builder ID / IDC 裝置代碼**流程。裝置代碼流程一直都是完全隔離的。這些連線不需要重新匯入。

在非預設 AWS 區域中操作的企業使用者，可以在透過 Import Token API 匯入時指定區域：

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

若省略 `region` 欄位，則預設為 `us-east-1`。

---

## API 金鑰匯入流程

API 金鑰驗證適用於長效型 Kiro / AWS CodeWhisperer Bearer 憑證。它不使用 OAuth 重新整理，因此可避免共享 OIDC 工作階段失效。

### 儀表板

1. 開啟 **Dashboard -> Providers -> Kiro**。
2. 選擇 **API Key**。
3. 貼上 API 金鑰以及選填的 AWS 區域（預設為 `us-east-1`）。
4. OmniRoute 會驗證金鑰並儲存連線。

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### 內部契約

API 路由會呼叫 `KiroService.validateApiKey()` 來驗證金鑰；此方法會對符合區域的 CodeWhisperer/Amazon Q 端點使用 `ListAvailableProfiles`，並解析出 `profileArn`。

儲存的連線會使用：

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

執行階段中，`KiroExecutor.buildHeaders()` 會以 `Authorization: Bearer <key>` 傳送金鑰，並加入 `tokentype: API_KEY`。配額/設定檔呼叫也會使用相同的標記，讓 AWS 將該 Bearer 憑證視為長效型 API 金鑰，而非 OIDC 或社群存取權杖。

---

## OIDC 用戶端到期

AWS SSO OIDC 公開用戶端通常會在 90 天後到期（`clientSecretExpiresAt`）。OmniRoute 會將此時間戳記儲存在 `providerSpecificData` 中，以便進行可觀測性監控。若連線在約 90 天後停止重新整理，請重新匯入連線，以取得新的 OIDC 用戶端註冊。到期時自動重新註冊已列為未來的改進項目。

API 金鑰連線不會有 OIDC 用戶端到期問題，因為它們不會透過 AWS SSO OIDC 進行重新整理。

---

## 疑難排解

### 第二個帳戶一直被登出

- 在 **Dashboard → Providers** 中檢查兩個連線，並確認每個連線的原始 JSON（可透過資訊圖示查看）皆顯示非 null 的 `clientId`。若任一連線缺少 `clientId`，表示該連線是在 v3.8.0 之前匯入的——請重新匯入。

### 匯入失敗並顯示「Token validation failed」

- 確認重新整理權杖以 `aorAAAAAG` 開頭。
- 確認 OmniRoute 可以連線至 `https://oidc.us-east-1.amazonaws.com`（或已設定的區域）。若您位於企業 Proxy 後方，請在 **Dashboard → Settings → Proxies** 中設定提供者層級的 Proxy。

### API 金鑰匯入失敗

- 確認該金鑰是 Kiro / CodeWhisperer API 金鑰，而不是重新整理權杖。
- 確認 AWS 區域與金鑰/帳戶相符。預設為 `us-east-1`。
- 該金鑰必須能夠呼叫 `ListAvailableProfiles`；否則 OmniRoute 無法解析必要的 `profileArn`。

如有其他問題，請參閱主要的 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)。
