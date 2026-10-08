# OpenCode Integration (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md)

---

> **狀態：** 已正式發布。
> **適用對象：** 將 OpenCode 連接至 OmniRoute 部署的維運人員。
> **事實來源（設定結構描述）：** `src/shared/services/opencodeConfig.ts`
> **事實來源（npm 套件）：** `@omniroute/opencode-provider/`（可發布的工作區）

[OpenCode](https://opencode.ai) 是代理式 CLI／桌面 AI 用戶端。它會從 `~/.config/opencode/opencode.json`（或 `opencode.jsonc`）讀取提供者目錄，並遵循 `https://opencode.ai/config.json` 中的結構描述。OmniRoute 會以其中一個提供者的形式提供給 OpenCode——每個請求都會經由 OmniRoute 標準且相容 OpenAI 的 `/v1` 介面傳送，因此 OpenCode 可自動受益於 Auto-Combo 路由、斷路器、金鑰政策、可觀測性等功能。

有**兩種支援的整合方式**。請擇一使用——兩者會產生相同的設定。

---

## 方式 1 — CLI 產生器（無須安裝 npm）

建議一般使用者採用。隨 OmniRoute 一同提供。會直接更新 `opencode.json`。

```bash
# 安裝 OmniRoute 後（npm i -g @omniroute/cli 或本機複製）
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

CLI 會在幕後呼叫 `mergeOpenCodeConfigText()`（`src/shared/services/opencodeConfig.ts:104`），因此現有的 `opencode.json` 會保留其他提供者與註解。OmniRoute 項目會以不可分割的方式新增或取代。

產生的檔案（預設模型目錄）：

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<your-key>",
      },
      "models": {
        "claude-opus-4-5-thinking": { "name": "claude-opus-4-5-thinking" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" },
      },
    },
  },
}
```

---

## 方式 2 — npm 套件 `@omniroute/opencode-provider`

建議透過 Node/TS 以程式方式產生設定時使用（CI 管線、monorepo、自訂安裝流程）。

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // 選用：覆寫公開給 OpenCode 的模型目錄
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

若要以非破壞性方式合併現有檔案，請複製 `opencodeConfig.ts` 中的 `mergeOpenCodeConfigText()`，或呼叫 CLI 產生器。

完整 API 請參閱[套件 README](../../@omniroute/opencode-provider/README.md)。

---

## 執行階段實際執行的操作

這兩種方式都會產生相同的 `provider.omniroute.npm: "@ai-sdk/openai-compatible"`。在執行階段，OpenCode 會載入 `@ai-sdk/openai-compatible`（已是 OpenCode 的遞移相依套件），並使用 `baseURL` + `apiKey` 進行設定。接下來的流程如下：

```
OpenCode UI／代理程式
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          （OmniRoute OpenAI 介面）
         → OmniRoute /v1/chat/completions 處理常式     （open-sse/handlers/chatCore.ts）
            → 組合路由／Auto-Combo／執行器
               → 上游提供者
```

此外掛程式絕不會接觸 HTTP。它只會產生設定。

---

## 模型目錄預設值

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

你可以透過 `models: [...]` 覆寫。建議新增：

- `"auto"` — 顯示 OmniRoute 的 [Auto-Combo](../routing/AUTO-COMBO.md) 零設定路由器。讓 OpenCode 選擇「最佳可用模型」，而無須將目錄硬式編碼。
- `"<combo-name>"` — 你在儀表板中定義的任何組合；OmniRoute 會以透明方式解析。

---

## URL 正規化

此輔助工具接受下列兩種形式，並確保只輸出一個 `/v1`：

| 輸入                           | 輸出（`options.baseURL`）   |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

此去重處理是舊版設定中**最常見的故障原因**。如果你有一份 v3.8.0 之前的 `opencode.json`，且其中指向 `/v1/v1/...`，請重新執行產生器，或再次呼叫 `createOmniRouteProvider`。

---

## 驗證模式

| OmniRoute 設定                        | 建議的 `apiKey` 值                                   |
| ------------------------------------- | ---------------------------------------------------- |
| `REQUIRE_API_KEY=false`（本機預設值） | `sk_omniroute`（字面值預留位置）                     |
| `REQUIRE_API_KEY=true`                | 來自「儀表板 → API 金鑰」的真實個別使用者 API 金鑰。 |

對於傳送 `x-api-key` + `anthropic-version` 的 Anthropic 風格用戶端，OmniRoute 的 `extractApiKey` 也會採用來自 `x-api-key` 的金鑰。OpenCode 使用 OpenAI 介面，因此一律會傳送 `Authorization: Bearer ${apiKey}` — 此處不適用 Anthropic 的特殊處理。

---

## 疑難排解

| 症狀                                                | 原因                                                        | 修正方式                                                                              |
| --------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 每個 URL 包含 `/v1/v1/` 的請求都傳回 `404`          | v3.8 之前的外掛舊設定重複加上了 `/v1` 後綴。                | 透過路徑 1 或 2 重新產生設定。                                                        |
| `401 Invalid API key`                               | OmniRoute 設定了 `REQUIRE_API_KEY=true`，且無法識別該金鑰。 | 在儀表板中建立金鑰，或設定 `REQUIRE_API_KEY=false`（僅限本機）並使用 `sk_omniroute`。 |
| OpenCode UI 中的模型清單為空                        | 4 個預設模型全都在 OmniRoute 的提供者可見性設定中設為隱藏。 | 傳入 `models: ["auto", ...]`，以顯示你已啟用的模型。                                  |
| OpenCode 500 並顯示 `cannot read property 'models'` | 較舊版本的 OpenCode（< 0.1.x）不接受內嵌的 `models`。       | 將 OpenCode 升級至遵循 v1 結構描述（`opencode.ai/config.json`）的版本。               |

---

## 另請參閱

- [API 參考文件](../reference/API_REFERENCE.md) — 完整的 OmniRoute REST API 介面
- [Auto-Combo](../routing/AUTO-COMBO.md) — `model: "auto"` 的含義
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- 原始碼：`src/shared/services/opencodeConfig.ts`、`src/lib/cli-helper/config-generator/opencode.ts`、`@omniroute/opencode-provider/src/index.ts`
