# Zed IDE Integration in Docker Environments (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md)

---

當 OmniRoute 在 Docker 內執行時，標準的「從 Zed 鑰匙圈匯入」流程會失敗，
因為容器無法存取主機作業系統的鑰匙圈常駐程式（Linux 上的 libsecret、
macOS 上的 Keychain、Windows 上的 Credential Manager），而且主機檔案系統上的
Zed 設定目錄預設不會顯示在容器內。

## 為什麼鑰匙圈匯入在 Docker 中會失敗

容器內會發生兩個阻礙問題：

1. **檔案系統隔離** — `isZedInstalled()` 會尋找 `~/.config/zed`（Linux）、
   `~/Library/Application Support/Zed`（macOS）或 Windows 上的對應路徑。這些路徑
   位於主機上，除非明確掛載為磁碟區，否則無法使用。
2. **IPC 隔離** — 即使已掛載設定目錄，`keytar` 原生模組仍會透過 Unix socket
   或 D-Bus 工作階段與作業系統的鑰匙圈服務通訊。預設情況下，兩者都不會橋接至
   容器中，因此讀取憑證必定會失敗。

OmniRoute 會透過兩種啟發式方法偵測 Docker 環境：

- 存在 `/.dockerenv`（由 Docker 常駐程式在容器啟動時寫入）。
- `/proc/1/cgroup` 中出現字串 `docker`（Linux cgroup v1）。

當任一啟發式方法觸發時，匯入路由會傳回 HTTP 422，並包含
`zedDockerEnvironment: true` 以及引導您前往「手動權杖匯入」分頁的訊息。

## 使用「手動權杖匯入」分頁

1. 開啟 **儀表板 → 提供者 → Zed**。
2. **手動權杖匯入**面板會顯示在鑰匙圈匯入卡片下方。當
   OmniRoute 偵測到 Docker 時，此面板會在第一次鑰匙圈匯入嘗試失敗後自動展開。
3. 從下拉式選單中選取提供者（OpenAI、Anthropic、Google、Mistral、xAI、
   OpenRouter 或 DeepSeek）。
4. 將 API 金鑰貼到密碼欄位中。
5. 按一下**匯入**。

該金鑰會儲存為新的提供者連線，名稱為
`Zed Manual Import (<provider>)`。

## Zed 在主機上儲存 API 金鑰的位置

Zed 會將 AI 提供者金鑰儲存在作業系統鑰匙圈中，使用的服務名稱包括
`zed-openai`、`ai.zed.openai`、`zed-anthropic` 等。若要擷取這些金鑰以供手動
匯入，請查看：

**Linux**

```
~/.config/zed/settings.json
```

`language_models` 區段包含提供者設定。透過 Zed UI 儲存到
鑰匙圈的金鑰不會以純文字形式出現在 `settings.json` 中；請透過
GNOME Keyring / Seahorse 等鑰匙圈檢視器擷取，或執行：

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

您可以在 **Keychain Access.app** 中搜尋 `zed` 來尋找鑰匙圈項目。

## 磁碟區掛載選項（進階）

您可以選擇將 Zed 設定目錄以唯讀方式掛載到容器中。
這不會解決鑰匙圈問題，但對於未來讀取非機密 Zed 設定值
（例如模型偏好設定）的功能可能有所幫助。

```yaml
# docker-compose.yml 片段
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux 主機
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS 主機（改為取消此行註解）
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # 未來：ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

注意：目前尚未實作 `ZED_CONFIG_PATH` 環境變數覆寫。此
片段是為加入該功能後提供的參考。

## 手動匯入 API

也可以直接呼叫手動匯入端點：

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // 選用
}
```

成功時會傳回：

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## 疑難排解

| 症狀                               | 原因                     | 修正方式                 |
| ---------------------------------- | ------------------------ | ------------------------ |
| 422 + `zedDockerEnvironment: true` | 正在 Docker 內執行       | 使用「手動權杖匯入」分頁 |
| 404 + `zedInstalled: false`        | 主機上未安裝 Zed         | 安裝 Zed 或使用手動匯入  |
| 403 + 鑰匙圈存取遭拒               | 作業系統拒絕鑰匙圈存取   | 在作業系統提示中授予權限 |
| 404 + 鑰匙圈服務無法使用           | Linux 上缺少 `libsecret` | 安裝 `libsecret-1-dev`   |
