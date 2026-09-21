# OmniRoute Tiers — User Guide (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TIERS.md) · 🇪🇹 [am](../../../am/docs/guides/TIERS.md) · 🇸🇦 [ar](../../../ar/docs/guides/TIERS.md) · 🇦🇿 [az](../../../az/docs/guides/TIERS.md) · 🇧🇬 [bg](../../../bg/docs/guides/TIERS.md) · 🇧🇩 [bn](../../../bn/docs/guides/TIERS.md) · 🇨🇿 [cs](../../../cs/docs/guides/TIERS.md) · 🇩🇰 [da](../../../da/docs/guides/TIERS.md) · 🇩🇪 [de](../../../de/docs/guides/TIERS.md) · 🇬🇷 [el](../../../el/docs/guides/TIERS.md) · 🇪🇸 [es](../../../es/docs/guides/TIERS.md) · 🇪🇪 [et](../../../et/docs/guides/TIERS.md) · 🇮🇷 [fa](../../../fa/docs/guides/TIERS.md) · 🇫🇮 [fi](../../../fi/docs/guides/TIERS.md) · 🇫🇷 [fr](../../../fr/docs/guides/TIERS.md) · 🇮🇪 [ga](../../../ga/docs/guides/TIERS.md) · 🇮🇳 [gu](../../../gu/docs/guides/TIERS.md) · 🇳🇬 [ha](../../../ha/docs/guides/TIERS.md) · 🇮🇱 [he](../../../he/docs/guides/TIERS.md) · 🇮🇳 [hi](../../../hi/docs/guides/TIERS.md) · 🇭🇷 [hr](../../../hr/docs/guides/TIERS.md) · 🇭🇺 [hu](../../../hu/docs/guides/TIERS.md) · 🇦🇲 [hy](../../../hy/docs/guides/TIERS.md) · 🇮🇩 [id](../../../id/docs/guides/TIERS.md) · 🇳🇬 [ig](../../../ig/docs/guides/TIERS.md) · 🇮🇹 [it](../../../it/docs/guides/TIERS.md) · 🇯🇵 [ja](../../../ja/docs/guides/TIERS.md) · 🇬🇪 [ka](../../../ka/docs/guides/TIERS.md) · 🇰🇭 [km](../../../km/docs/guides/TIERS.md) · 🇮🇳 [kn](../../../kn/docs/guides/TIERS.md) · 🇰🇷 [ko](../../../ko/docs/guides/TIERS.md) · 🇱🇹 [lt](../../../lt/docs/guides/TIERS.md) · 🇱🇻 [lv](../../../lv/docs/guides/TIERS.md) · 🇮🇳 [ml](../../../ml/docs/guides/TIERS.md) · 🇮🇳 [mr](../../../mr/docs/guides/TIERS.md) · 🇲🇾 [ms](../../../ms/docs/guides/TIERS.md) · 🇲🇹 [mt](../../../mt/docs/guides/TIERS.md) · 🇲🇲 [my](../../../my/docs/guides/TIERS.md) · 🇳🇵 [ne](../../../ne/docs/guides/TIERS.md) · 🇳🇱 [nl](../../../nl/docs/guides/TIERS.md) · 🇳🇴 [no](../../../no/docs/guides/TIERS.md) · 🇮🇳 [or](../../../or/docs/guides/TIERS.md) · 🇮🇳 [pa](../../../pa/docs/guides/TIERS.md) · 🇵🇭 [phi](../../../phi/docs/guides/TIERS.md) · 🇵🇱 [pl](../../../pl/docs/guides/TIERS.md) · 🇵🇹 [pt](../../../pt/docs/guides/TIERS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TIERS.md) · 🇷🇴 [ro](../../../ro/docs/guides/TIERS.md) · 🇷🇺 [ru](../../../ru/docs/guides/TIERS.md) · 🇱🇰 [si](../../../si/docs/guides/TIERS.md) · 🇸🇰 [sk](../../../sk/docs/guides/TIERS.md) · 🇸🇮 [sl](../../../sl/docs/guides/TIERS.md) · 🇷🇸 [sr](../../../sr/docs/guides/TIERS.md) · 🇸🇪 [sv](../../../sv/docs/guides/TIERS.md) · 🇰🇪 [sw](../../../sw/docs/guides/TIERS.md) · 🇮🇳 [ta](../../../ta/docs/guides/TIERS.md) · 🇮🇳 [te](../../../te/docs/guides/TIERS.md) · 🇹🇭 [th](../../../th/docs/guides/TIERS.md) · 🇹🇷 [tr](../../../tr/docs/guides/TIERS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TIERS.md) · 🇵🇰 [ur](../../../ur/docs/guides/TIERS.md) · 🇺🇿 [uz](../../../uz/docs/guides/TIERS.md) · 🇻🇳 [vi](../../../vi/docs/guides/TIERS.md) · 🇳🇬 [yo](../../../yo/docs/guides/TIERS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TIERS.md)

---

OmniRoute 將支援的 352 個提供者分為 3 個經濟層級。每個請求都會依序經過這些層級，直到其中一個成功回應——您無須撰寫任何後援程式碼，就能取得成本最低且可用的回應。

## 層級 1 — 訂閱

**您已付費訂閱的提供者。** OmniRoute 會在配額到期前充分利用每一分額度。

| 提供者                       | 列為層級 1 的原因                            |
| ---------------------------- | -------------------------------------------- |
| Claude Code OAuth            | Anthropic Pro/Team——固定費率，通常未充分使用 |
| OpenAI Codex（ChatGPT 訂閱） | Plus/Team 包含 Codex 配額                    |
| GitHub Copilot               | 按席位計費——配額每月重設                     |
| Cursor IDE                   | Pro 方案配額                                 |
| Antigravity / Devin Desktop  | 內建配額                                     |

**策略**：針對每個符合模型優勢的請求，優先路由至此層級。配額追蹤器會監控即將重設的配額，而 `reset-aware` 組合策略會據此調整優先順序。若要優先路由至層級 1，並僅在配額用盡時轉至付費層級，請使用 `auto/thrifty` id——或使用 `auto/subscription`，將流量限制在方案所含的容量內，否則直接失敗。請參閱[訂閱優先路由](../routing/SUBSCRIPTION_LADDER.md)。

## 層級 2 — 低成本

**每 100 萬個 token 收費低於 $1 的按 token 計費提供者。** 保留給高流量工作，或在層級 1 配額達到上限後使用。

| 提供者                   | 價格（輸入／輸出）  | 優勢                  |
| ------------------------ | ------------------- | --------------------- |
| DeepSeek V4 Pro          | 每 1M $0.27 / $1.10 | 程式碼、推理          |
| GLM-4.5                  | 每 1M $0.60 / $2.20 | 長上下文              |
| MiniMax M1               | 每 1M $0.20 / $1.10 | 速度                  |
| Qwen Coder               | 每 1M $0.30 / $1.20 | 程式碼                |
| OpenRouter（價格最佳化） | 浮動                | 100+ 個模型、動態調整 |

**策略**：`cost-optimized` 組合策略會選擇符合任務能力篩選條件（視覺、JSON 模式、工具、最大上下文）且每個 token 成本最低的模型。

## 層級 3 — 免費

**零成本提供者**——免費層級、點數方案、OAuth 每日配額。

| 提供者           | 免費配額／點數                       |
| ---------------- | ------------------------------------ |
| Kiro AI          | 免費 Claude 層級（寬鬆的合理使用量） |
| OpenCode Free    | 無需驗證，寬鬆的速率限制             |
| Qoder            | 免費 OAuth                           |
| Google Vertex AI | 新帳戶 $300 點數                     |
| Amazon Q         | AWS 使用者可用的免費層級             |
| Pollinations     | 開放的公用 API                       |
| Cloudflare AI    | Workers AI 免費層級                  |

**策略**：當層級 1 和 2 失敗，或設定 `useFreeOnly=true` 時，具有預算上限的 `auto` 組合策略會將請求路由至此。免費提供者的速率限制通常較嚴格——斷路器會在退避期間結束後恢復使用這些提供者。

## 設定層級

控制面板 → **層級** → 指派您的提供者。預設值（來自 `tierDefaults.json`）通常相當合理；當您有特定訂閱需要優先處理，或有提供者需要排除時，可加以編輯。

Auto-Combo 的 16 因素評分也會考量層級。請參閱
[`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md)。

## 遙測

控制面板 → **用量**會顯示每個層級每日使用的 token。您可以利用此資訊：

- 確認層級 1 已充分使用（否則就是在浪費訂閱價值）
- 找出最常被選用的層級 2 模型（整併為 1 至 2 個）
- 驗證層級 3 確實能為測試／探索工作負載節省成本

## 常見模式

### 全免費工作負載

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "costInv": 0.5, "tierPriority": 0.3 } } }
}
```

強烈偏向層級 3；僅在層級 3 無法使用時才使用層級 2。

### 訂閱優先，搭配低成本後援

```json
{
  "strategy": "priority",
  "targets": [
    { "provider": "claude-code-oauth", "weight": 1 },
    { "provider": "deepseek", "weight": 1 },
    { "provider": "kiro", "weight": 1 }
  ]
}
```

明確的順序清單，對應層級 1 → 層級 2 → 層級 3。
