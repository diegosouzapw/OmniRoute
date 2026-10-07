# AgentRouter Setup Guide (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) 是一個相容於 Anthropic 的中繼服務，以通常比直接使用 Anthropic API 更低的價格轉售 Claude 與其他模型。它被設計成官方 Claude Code 用戶端的即插即用 `ANTHROPIC_BASE_URL` 替代方案，因此僅接受符合 Claude Code 線路格式的流量（特定的 User-Agent、`anthropic-beta` 旗標、Stainless SDK 標頭等）。

## 快速開始 — 使用原生 `agentrouter` 提供者（建議）

對大多數使用者而言，**不需要任何特殊設定**。OmniRoute 隨附內建的 `agentrouter` 提供者，其中已完整內建 Claude Code 線路格式（請參閱 `open-sse/config/providerRegistry.ts` → `agentrouter`）。使用方式如下：

1. 開啟 **儀表板 → 提供者 → 新增提供者**。
2. 從清單中選取 **AgentRouter**。
3. 貼上您的 `sk-...` API 金鑰並儲存。

就是這麼簡單 — 不需要環境變數，也不需要自訂提供者類型。內建模型包括 `claude-opus-4-6`、`claude-haiku-4-5-20251001`、`glm-5.1` 和 `deepseek-v3.2`。

本指南其餘部分將介紹**進階方式**：使用 `anthropic-compatible-cc-*` 提供者類型。當您需要更精細地控制線路格式時，請使用此方式 — 例如連線到尚未收錄於原生提供者登錄檔中的其他 AgentRouter 類型中繼服務，或覆寫基礎 URL、聊天路徑或標頭集合。

---

## 進階：透過 Claude Code 相容提供者類型連線

OmniRoute 也可透過 **Claude Code 相容**提供者類型（`anthropic-compatible-cc-*`）支援 AgentRouter（以及類似的中繼服務），該類型會使用正確的線路格式與 Anthropic Messages API 通訊。將一般的 `openai-compatible-chat` 提供者指向 `https://agentrouter.org` 將**無法**運作 — 上游 WAF 會拒絕看起來不像 Claude Code 的請求。

---

## 先決條件

- AgentRouter 帳戶與 API 金鑰。新註冊使用者可透過專案 [README](../README.md) 中的聯盟連結取得免費點數。
- 執行 OmniRoute 時已啟用 `ENABLE_CC_COMPATIBLE_PROVIDER` 功能旗標（請參閱下方說明）。

## 1. 啟用 CC 相容提供者類型

Claude Code 相容提供者類型受到功能旗標控管，因為它傳送的流量會高度模擬官方 Claude Code 用戶端。請在啟動 OmniRoute 前設定環境變數來啟用：

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker 範例：

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

重新啟動後，除了現有的 OpenAI 相容與 Anthropic 相容流程之外，儀表板還會顯示**新增 Claude Code 相容提供者**選項。

## 2. 在儀表板中建立提供者

1. 開啟**儀表板 → 提供者 → 新增提供者**。
2. 選擇**新增 Claude Code 相容提供者**（僅在設定上述旗標時顯示）。
3. 填寫欄位：

| 欄位     | 值                                              |
| -------- | ----------------------------------------------- |
| 名稱     | `AgentRouter`（或任何標籤）                     |
| 前綴     | `agentrouter`（顯示於日誌與儀表板中的易讀別名） |
| 基礎 URL | `https://agentrouter.org`                       |
| 聊天路徑 | `/v1/messages?beta=true`（預設值 — 保持不變）   |

> 標準模型識別碼仍使用完整的提供者節點 ID
> （`anthropic-compatible-cc-{uuid}/{model}`）。**前綴**只是由
> `src/lib/usage/callLogs.ts` 解析的顯示別名，可讓日誌輸出更易於閱讀。

4. （選用）在**驗證**欄位中貼上您的 API 金鑰，然後按一下**檢查**，以便在儲存前確認連線能力。
5. 按一下**新增**。

建立後，開啟該提供者，並使用您的 AgentRouter API 金鑰（`sk-...`）新增一個**連線**。該連線的 `test_status` 應變為 `active`。

## 3. 透過組合使用或直接使用

使用提供者的前綴作為命名空間來引用模型：

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

標準模型 ID `anthropic-compatible-cc-{uuid}/claude-opus-4-6` 也可使用，
而且這正是資料庫與組合設定中所顯示的 ID。

或者像使用任何其他提供者一樣，將其新增至組合中，以進行路由、
備援及配額管理。

---

## 線路映像詳細資訊

供參考，cc-compatible 橋接器會在每個上游請求中傳送以下內容
（請參閱 `open-sse/services/claudeCodeCompatible.ts`）：

| 標頭                                        | 值                                                                       |
| ------------------------------------------- | ------------------------------------------------------------------------ |
| `Authorization`                             | `Bearer <api-key>`                                                       |
| `User-Agent`                                | `claude-cli/2.1.258 (external, sdk-cli)`                                 |
| `anthropic-version`                         | `2023-06-01`                                                             |
| `anthropic-beta`                            | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24` |
| 各連線的隱去思考 beta 切換選項              | 針對明確要求隱去思考串流的上游新增 `redact-thinking-2026-02-12`          |
| 各連線的摘要思考切換選項                    | 為尚未設定顯示模式的 CC Compatible 思考請求新增 `display: "summarized"`  |
| `anthropic-dangerous-direct-browser-access` | `true`                                                                   |
| `x-app`                                     | `cli`                                                                    |
| `X-Stainless-*`                             | 各種 Stainless SDK 標頭（語言、套件版本、作業系統、架構等）              |

這正是請求得以通過上游 WAF／用戶端白名單的原因。

---

## 疑難排解

**`{"error":{"message":"unauthorized client detected, ..."}}`** — 您的請求
不符合 Claude Code 線路映像。當提供者被設定為
`openai-compatible-chat` 而非 `anthropic-compatible-cc`，或啟動時未設定
`ENABLE_CC_COMPATIBLE_PROVIDER=true` 旗標，就會發生此情況。

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
「無效的權杖」。線路映像正確，但 API 金鑰遭到拒絕。請在 AgentRouter
控制面板中產生新的金鑰，並更新連線。

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter 的內容審核鉤子拒絕了請求內容，或該金鑰的方案
不允許使用所請求的模型。請嘗試不同的提示詞或模型；若正常無害的提示詞
持續遭到封鎖，請聯絡 AgentRouter 支援團隊。

**僅在特定模型上出現 `[400]: content-blocked`** — 大多數 AgentRouter
方案僅允許使用一部分模型（例如 `claude-opus-4-6`）。即使金鑰有效，
其他模型 ID 仍會傳回 `unauthorized_client_error`。請在 AgentRouter
控制面板中確認您的方案涵蓋哪些模型。

**omniroute 日誌中的 `Invalid JSON response from provider (reset after Ns)`** —
上游傳回了非 JSON 內文（通常是來自 WAF 的 HTML 錯誤頁面）。這通常表示
請求根本未到達 AgentRouter 後端——請再次確認提供者 ID 是以
`anthropic-compatible-cc-` 開頭（請注意結尾的連字號——請參閱
`open-sse/services/claudeCodeCompatible.ts` 中的
`CLAUDE_CODE_COMPATIBLE_PREFIX`），並確認功能旗標已啟用。

**即使 AgentRouter 提供者已存在，仍出現 `unauthorized client detected`／
HTML 錯誤頁面** — 您很可能有**多個** AgentRouter 提供者。如果先前以
`agentrouter` 前綴建立的手動
`anthropic-compatible-*`（非 `cc`）或 `openai-compatible-chat-*`
提供者仍然存在，它可能會占用 `agentrouter/<model>` 模型 ID（而且組合
可能會透過節點 ID 引用它），導致流量被路由至該提供者——該提供者會傳送
通用的 User-Agent，因此遭到拒絕——而不是路由至已內建正確線路映像的
`agentrouter` 提供者。請在 omniroute 日誌中確認模型實際解析至何處
（`ROUTING` 標籤會顯示 `agentrouter/<model> → <providerId>/<model>`）；
若 `<providerId>` 不是 `agentrouter`，請整合至原生提供者：讓組合指向
`agentrouter/<model>`（providerId 為 `agentrouter`），並刪除重複的
相容提供者。原生提供者不需要任何線路映像設定，也不需要
`customUserAgent`。

---

## 另請參閱

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web 提供者整合說明
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — 免費方案提供者
  目錄
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Wire 圖片實作
