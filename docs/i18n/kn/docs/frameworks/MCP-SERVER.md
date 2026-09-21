# OmniRoute MCP Server Documentation (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> ರೂಟಿಂಗ್, ಕ್ಯಾಶ್, ಕಂಪ್ರೆಷನ್, ಮೆಮೊರಿ, ಸ್ಕಿಲ್ಸ್, ಪ್ರಾಕ್ಸಿ, ಪೂಲ್, Radar ಮತ್ತು ಕಾಂಟೆಕ್ಸ್ಟ್ ಸೋರ್ಸ್ ಕಾರ್ಯಾಚರಣೆಗಳಾದ್ಯಂತ 110 ಪರಿಕರಗಳನ್ನು ಹೊಂದಿರುವ Model Context Protocol ಸರ್ವರ್.
>
> ಅಧಿಕೃತ ಮೂಲ: `open-sse/mcp-server/server.ts`, `countUniqueMcpTools()` ಮೂಲಕ **110 ವಿಶಿಷ್ಟ ಪರಿಕರಗಳನ್ನು** ಲೆಕ್ಕಹಾಕುತ್ತದೆ: 45 ಪ್ರಮಾಣಿತ ವ್ಯಾಖ್ಯಾನಗಳು (ಆರು CCR ಲೈಫ್ಸೈಕಲ್ ಪರಿಕರಗಳು, ಏಜೆಂಟ್-ಸ್ಕಿಲ್ಸ್ ತ್ರಯ, `omniroute_radar_catalog` ಮತ್ತು `omniroute_x_search` ಸೇರಿದಂತೆ), ಜೊತೆಗೆ ಮೆಮೊರಿ (3), ಸ್ಕಿಲ್ಸ್ (4), GitHub ಸ್ಕಿಲ್ಸ್ (3), ಪೂಲ್ (6), ಗೇಮಿಫಿಕೇಶನ್ (8), ಪ್ಲಗಿನ್ಗಳು (8), Notion (6), Obsidian (22), ಸ್ಥಳೀಯ ಕಾರ್ಪಸ್ (3), ಮತ್ತು ಎರಡು RTK-ಮಾತ್ರದ ಕಂಪ್ರೆಷನ್ ಪರಿಕರಗಳು.

## ಸ್ಥಾಪನೆ

OmniRoute MCP ಅಂತರ್ನಿರ್ಮಿತವಾಗಿದೆ. ಇದನ್ನು ಹೀಗೆ ಪ್ರಾರಂಭಿಸಿ:

```bash
omniroute --mcp
```

ಅಥವಾ open-sse ಟ್ರಾನ್ಸ್ಪೋರ್ಟ್ ಮೂಲಕ:

```bash
# HTTP ಸ್ಟ್ರೀಮ್ ಮಾಡಬಹುದಾದ ಟ್ರಾನ್ಸ್ಪೋರ್ಟ್ (ಪೋರ್ಟ್ 20130)
omniroute --dev  # /mcp ಎಂಡ್ಪಾಯಿಂಟ್ನಲ್ಲಿ MCP ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ
```

HTTP ಟ್ರಾನ್ಸ್ಪೋರ್ಟ್ಗಳು (`sse` / `streamable-http`, ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸರ್ವರ್ನಿಂದ ಅದೇ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ಒದಗಿಸಲಾಗುತ್ತದೆ) ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ
ನಿಷ್ಕ್ರಿಯವಾಗಿರುತ್ತವೆ ಮತ್ತು ಈ ಹಿಂದೆ `/dashboard/mcp` ಪುಟದಿಂದ ಮಾತ್ರ ಟಾಗಲ್ ಮಾಡಬಹುದಾಗಿತ್ತು. v3.8.51 ರಿಂದ
CLI ಕೂಡ ಅದಕ್ಕೆ ಸಮಾನವಾದ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಹೊಂದಿದೆ:

```bash
omniroute mcp status                                  # ಸಕ್ರಿಯ/ಆನ್ಲೈನ್, ಟ್ರಾನ್ಸ್ಪೋರ್ಟ್, ಟೂಲ್ಗಳ ಸಂಖ್ಯೆ
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # ಸಕ್ರಿಯ sse/streamable-http ಸೆಷನ್ಗಳನ್ನು ಮರುಹೊಂದಿಸುತ್ತದೆ
```

`mcp enable`/`mcp disable`, `/api/settings` ಮೂಲಕ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಟಾಗಲ್ ಮಾಡುವ ಅದೇ `mcpEnabled` (ಮತ್ತು ಐಚ್ಛಿಕವಾಗಿ `mcpTransport`) ಸೆಟ್ಟಿಂಗ್ಗೆ
PATCH ವಿನಂತಿಯನ್ನು ಕಳುಹಿಸುತ್ತವೆ. `mcp restart`, `POST /api/mcp/restart` ಅನ್ನು ಕರೆಮಾಡುತ್ತದೆ: ಇದು ಸಕ್ರಿಯ
`sse`/`streamable-http` ಸೆಷನ್ಗಳನ್ನು ಸ್ಥಗಿತಗೊಳಿಸುತ್ತದೆ, ಇದರಿಂದ ಮುಂದಿನ ವಿನಂತಿಯು ಸ್ವಚ್ಛವಾಗಿ ಮರುಪ್ರಾರಂಭಗೊಳ್ಳುತ್ತದೆ; MCP ನಿಷ್ಕ್ರಿಯವಾಗಿದ್ದರೆ
`409` ಅನ್ನು ಮತ್ತು `stdio` ಟ್ರಾನ್ಸ್ಪೋರ್ಟ್ಗಾಗಿ `501` ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ (stdio ಕ್ಲೈಂಟ್ಗಳು ತಮ್ಮದೇ
ಉಪಪ್ರಕ್ರಿಯೆಯನ್ನು ನಿರ್ವಹಿಸುತ್ತವೆ — ಮರುಪ್ರಾರಂಭಿಸಲು ಅದೇ ಪ್ರಕ್ರಿಯೆಯೊಳಗಿನ ಯಾವುದೇ ಹ್ಯಾಂಡಲ್ ಇರುವುದಿಲ್ಲ).

## ಸಾರಿಗೆಗಳು

MCP ಸರ್ವರ್ ಮೂರು ಸಾರಿಗೆಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ; ಅವೆಲ್ಲವೂ ಒಂದೇ `createMcpServer()` ಫ್ಯಾಕ್ಟರಿಯಿಂದ ಬೆಂಬಲಿತವಾಗಿವೆ:

| ಸಾರಿಗೆ            | ಸ್ಥಳ                                         | ಯಾವಾಗ ಬಳಸಬೇಕು                                        |
| :---------------- | :------------------------------------------- | :--------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`              | IDE ಏಕೀಕರಣಗಳು (Claude Desktop, Cursor ಇತ್ಯಾದಿ)       |
| `sse`             | `httpTransport` ಮೂಲಕ `POST/GET /api/mcp/sse` | ಈವೆಂಟ್ ಸ್ಟ್ರೀಮ್ ಅಗತ್ಯವಿರುವ ಬ್ರೌಸರ್/ಏಜೆಂಟ್ ಕ್ಲೈಂಟ್ಗಳು |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`            | ಬಹು-ಸೆಷನ್ HTTP ಕ್ಲೈಂಟ್ಗಳು (`mcp-session-id` ಹೆಡರ್)   |

ಸಕ್ರಿಯ HTTP ಸಾರಿಗೆಯನ್ನು (`sse` ಅಥವಾ `streamable-http`) `mcpTransport` ಸೆಟ್ಟಿಂಗ್ ಮೂಲಕ ಆಯ್ಕೆ ಮಾಡಲಾಗುತ್ತದೆ. ಸಾರಿಗೆಗಳನ್ನು ಬದಲಾಯಿಸಿದಾಗ, ಮತ್ತೊಂದು ಸಾರಿಗೆಯಲ್ಲಿರುವ ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಸೆಷನ್ಗಳು ಮುಚ್ಚಲ್ಪಡುತ್ತವೆ.

### ದೂರಸ್ಥ ಪ್ರವೇಶ (`manage` ವ್ಯಾಪ್ತಿಯ ಬೈಪಾಸ್)

`/api/mcp/*` LOCAL_ONLY ಹಂತದಲ್ಲಿದೆ (`src/server/authz/routeGuard.ts`) — ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ಲೂಪ್ಬ್ಯಾಕ್ ಹೋಸ್ಟ್ಗಳು (`localhost`, `127.0.0.1`, `::1`) ಮಾತ್ರ ಅದನ್ನು ಪ್ರವೇಶಿಸಬಹುದು. v3.8.2 ರಿಂದ, ಲೂಪ್ಬ್ಯಾಕ್ ಅಲ್ಲದ ಕ್ಲೈಂಟ್ಗಳು `manage` ವ್ಯಾಪ್ತಿಯನ್ನು ಹೊಂದಿರುವ ಕೀಲಿಯ `Authorization: Bearer <api-key>` ಅನ್ನು ಒದಗಿಸಿದರೆ ಸಂಪರ್ಕಿಸಬಹುದು. ಟನಲ್, ರಿವರ್ಸ್ ಪ್ರಾಕ್ಸಿ ಅಥವಾ ಸಾರ್ವಜನಿಕ ಹೋಸ್ಟ್ಹೆಸರಿನ ಮೂಲಕ ದೂರಸ್ಥ MCP ಸರ್ವರ್ ಅನ್ನು ತಲುಪಲು ಇದು ಏಕೈಕ ಮಾರ್ಗವಾಗಿದೆ.

```bash
# manage ವ್ಯಾಪ್ತಿಯನ್ನು ನೀಡಿ: ಡ್ಯಾಶ್ಬೋರ್ಡ್ನ API Keys ಪುಟವನ್ನು ತೆರೆಯಿರಿ ಮತ್ತು ಕೀಲಿಯಲ್ಲಿ
# "Management Access" ಅನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ, ಅಥವಾ ರಚಿಸುವಾಗ POST scopes:["manage"] ಬಳಸಿ.

# ನಂತರ ದೂರಸ್ಥ MCP ಕ್ಲೈಂಟ್ನಿಂದ ಸಂಪರ್ಕಿಸಿ:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

`manage` ವ್ಯಾಪ್ತಿ ಇಲ್ಲದ ಕೀಲಿ (ಅಥವಾ Bearer ಇಲ್ಲದಿದ್ದರೆ) `403 LOCAL_ONLY` ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ. ಪಕ್ಕದ ಪೂರ್ವಪ್ರತ್ಯಯ `/api/cli-tools/runtime/*` ಅನ್ನು ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ಬೈಪಾಸ್ ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ — [ರೂಟ್ ಗಾರ್ಡ್ ಹಂತಗಳು — `manage` ವ್ಯಾಪ್ತಿಯ ವಿನಾಯಿತಿ](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) ನೋಡಿ.

## IDE ಸಂರಚನೆ

Claude Desktop, Cursor, Cline ಮತ್ತು ಹೊಂದಾಣಿಕೆಯಾಗುವ MCP ಕ್ಲೈಂಟ್ಗಳ ಸೆಟಪ್ಗಾಗಿ [MCP ಕ್ಲೈಂಟ್ ಸಂರಚನೆ](../guides/SETUP_GUIDE.md#mcp-client-configuration) ನೋಡಿ.

---

## ಅಗತ್ಯ ಪರಿಕರಗಳು (14) — ಹಂತ 1

| ಪರಿಕರ                           | ವ್ಯಾಪ್ತಿಗಳು           | ವಿವರಣೆ                                                                                                                               |
| :------------------------------ | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | ಅಪ್ಟೈಮ್, ಮೆಮೊರಿ, ಸರ್ಕ್ಯೂಟ್ ಬ್ರೇಕರ್ಗಳು, ದರ ಮಿತಿಗಳು, ಕ್ಯಾಶ್ ಅಂಕಿಅಂಶಗಳು                                                                 |
| `omniroute_list_combos`         | `read:combos`         | ತಂತ್ರಗಳೊಂದಿಗೆ ಸಂರಚಿಸಲಾದ ಎಲ್ಲಾ ಕಾಂಬೊಗಳು (ಐಚ್ಛಿಕ ಮೆಟ್ರಿಕ್ಗಳು)                                                                          |
| `omniroute_get_combo_metrics`   | `read:combos`         | ನಿರ್ದಿಷ್ಟ ಕಾಂಬೊಗಾಗಿ ಕಾರ್ಯಕ್ಷಮತೆಯ ಮೆಟ್ರಿಕ್ಗಳು                                                                                         |
| `omniroute_switch_combo`        | `write:combos`        | ಕಾಂಬೊವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ ಅಥವಾ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿ                                                                                         |
| `omniroute_create_combo`        | `write:combos`        | ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಕಾಂಬೊ API ಮೂಲಕ ಮೌಲ್ಯೀಕರಿಸಿದ ಕಾಂಬೊವನ್ನು ರಚಿಸಿ                                                                        |
| `omniroute_check_quota`         | `read:quota`          | ಬಳಸಿದ/ಒಟ್ಟು ಕೋಟಾ, ಉಳಿದಿರುವ ಶೇಕಡಾವಾರು, ಮರುಹೊಂದಿಸುವ ಸಮಯ, ಟೋಕನ್ ಸ್ಥಿತಿ                                                                  |
| `omniroute_route_request`       | `execute:completions` | OmniRoute ರೂಟಿಂಗ್ ಮೂಲಕ ಚಾಟ್ ಪೂರ್ಣಗೊಳಿಸುವಿಕೆ ವಿನಂತಿಯನ್ನು ಕಳುಹಿಸಿ                                                                      |
| `omniroute_cost_report`         | `read:usage`          | ಅವಧಿಯ ಪ್ರಕಾರ ವೆಚ್ಚದ ವರದಿ (ಸೆಷನ್/ದಿನ/ವಾರ/ತಿಂಗಳು)                                                                                      |
| `omniroute_list_models_catalog` | `read:models`         | ಸಾಮರ್ಥ್ಯಗಳು, ಸ್ಥಿತಿ ಮತ್ತು ಬೆಲೆಗಳೊಂದಿಗೆ ಸಂಪೂರ್ಣ ಮಾದರಿ ಕ್ಯಾಟಲಾಗ್                                                                       |
| `omniroute_radar_catalog`       | `read:radar`          | ಸ್ಥಳೀಯವಾಗಿ ಸಹಿ ಮಾಡಿದ Radar ಕ್ಯಾಟಲಾಗ್; ಐಚ್ಛಿಕ ಪೂರೈಕೆದಾರ/ಕುಟುಂಬ ಫಿಲ್ಟರ್ಗಳು                                                             |
| `omniroute_tool_search`         | `read:tools`          | ನೋಂದಾಯಿತ MCP ಕ್ಯಾಟಲಾಗ್ನಿಂದ ಪರಿಕರಗಳನ್ನು ಅನ್ವೇಷಿಸಿ                                                                                     |
| `omniroute_web_search`          | `execute:search`      | ಸಂರಚಿಸಲಾದ ಹುಡುಕಾಟ ಪೂರೈಕೆದಾರರ ಮೂಲಕ ವೆಬ್ ಹುಡುಕಾಟ. X/Twitter ಅಲ್ಲ.                                                                      |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok ಮೂಲಕ X ಅನ್ನು ಹುಡುಕಿ, ಅಥವಾ Xquik API ಫಲಿತಾಂಶಗಳಿಗಾಗಿ `xquik-search` ಆಯ್ಕೆಮಾಡಿ. ಆಯ್ಕೆಮಾಡಿದ ಬ್ಯಾಕೆಂಡ್ಗೆ ರುಜುವಾತುಗಳು ಅಗತ್ಯ. |
| `omniroute_web_fetch`           | `execute:search`      | ಸಂರಚಿಸಲಾದ ಫೆಚ್ ಪೂರೈಕೆದಾರರ ಮೂಲಕ ವೆಬ್ ವಿಷಯವನ್ನು ಪಡೆಯಿರಿ                                                                                |

## ಸುಧಾರಿತ ಪರಿಕರಗಳು (11) — ಹಂತ 2

| ಪರಿಕರ                              | ವ್ಯಾಪ್ತಿಗಳು                          | ವಿವರಣೆ                                                                                                         |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | ಫಾಲ್ಬ್ಯಾಕ್ ಟ್ರೀಯೊಂದಿಗೆ ಡ್ರೈ-ರನ್ ರೂಟಿಂಗ್ ಸಿಮ್ಯುಲೇಶನ್                                                            |
| `omniroute_set_budget_guard`       | `write:budget`                       | ಡಿಗ್ರೇಡ್/ಬ್ಲಾಕ್/ಎಚ್ಚರಿಕೆ ಕ್ರಿಯೆಯೊಂದಿಗೆ ಸೆಷನ್ ಬಜೆಟ್                                                             |
| `omniroute_set_routing_strategy`   | `write:combos`                       | ರನ್ಟೈಮ್ನಲ್ಲಿ ಕಾಂಬೊ ತಂತ್ರವನ್ನು ನವೀಕರಿಸಿ (ಆದ್ಯತೆ/ತೂಕಾಧಾರಿತ/ಸ್ವಯಂ/ಇತ್ಯಾದಿ)                                        |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವದ ಪೂರ್ವನಿಗದಿಯನ್ನು ಅನ್ವಯಿಸಿ                           |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | ನೈಜ ಅಪ್ಸ್ಟ್ರೀಮ್ ಕರೆಯನ್ನು ಬಳಸಿ ಕಾಂಬೊದಲ್ಲಿರುವ ಪ್ರತಿಯೊಂದು ಪೂರೈಕೆದಾರರ ನೇರ ಪರೀಕ್ಷೆ                                  |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 ವಿಳಂಬ ಮತ್ತು ಸರ್ಕ್ಯೂಟ್ ಬ್ರೇಕರ್ ಸ್ಥಿತಿಯೊಂದಿಗೆ ಪ್ರತಿ ಪೂರೈಕೆದಾರರ ಮೆಟ್ರಿಕ್ಗಳು                           |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | ಬಜೆಟ್/ವಿಳಂಬ ನಿರ್ಬಂಧಗಳೊಂದಿಗೆ ಕಾರ್ಯದ ಪ್ರಕಾರದ ಆಧಾರದ ಮೇಲೆ ಕಾಂಬೊವನ್ನು ಶಿಫಾರಸು ಮಾಡಿ                                  |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | ವಿನಂತಿಯನ್ನು ಪೂರೈಕೆದಾರರ ಕಡೆಗೆ ಏಕೆ ರೂಟ್ ಮಾಡಲಾಯಿತು ಎಂಬುದನ್ನು ವಿವರಿಸಿ (ಸ್ಕೋರಿಂಗ್ ಅಂಶಗಳು + ಫಾಲ್ಬ್ಯಾಕ್ಗಳು)           |
| `omniroute_get_session_snapshot`   | `read:usage`                         | ಸಂಪೂರ್ಣ ಸೆಷನ್ ಸ್ನ್ಯಾಪ್ಶಾಟ್: ವೆಚ್ಚ, ಟೋಕನ್ಗಳು, ಪ್ರಮುಖ ಮಾದರಿಗಳು/ಪೂರೈಕೆದಾರರು, ದೋಷಗಳು, ಬಜೆಟ್ ಗಾರ್ಡ್                 |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | ಮುರಿದ ಕಾಂಬೊ ಉಲ್ಲೇಖಗಳು / ಅನಾಥ ಸಾಲುಗಳಂತಹ ಡೇಟಾಬೇಸ್ ವ್ಯತ್ಯಾಸವನ್ನು ಪತ್ತೆಹಚ್ಚಿ (ಮತ್ತು ಐಚ್ಛಿಕವಾಗಿ ಸ್ವಯಂ-ದುರಸ್ತಿ ಮಾಡಿ) |
| `omniroute_sync_pricing`           | `pricing:write`                      | ಬಾಹ್ಯ ಮೂಲಗಳಿಂದ (LiteLLM) ಬೆಲೆ ಡೇಟಾವನ್ನು ಸಿಂಕ್ ಮಾಡಿ; `dryRun` ಅನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ                               |

## ಕ್ಯಾಶ್ ಪರಿಕರಗಳು (2)

| ಪರಿಕರ                   | ವ್ಯಾಪ್ತಿಗಳು   | ವಿವರಣೆ                                                             |
| :---------------------- | :------------ | :----------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | ಸೀಮ್ಯಾಂಟಿಕ್ ಕ್ಯಾಶ್, ಪ್ರಾಂಪ್ಟ್-ಕ್ಯಾಶ್ ಮತ್ತು ಐಡೆಂಪೊಟೆನ್ಸಿ ಅಂಕಿಅಂಶಗಳು |
| `omniroute_cache_flush` | `write:cache` | ಜಾಗತಿಕವಾಗಿ ಅಥವಾ ಸಿಗ್ನೇಚರ್/ಮಾದರಿಯ ಪ್ರಕಾರ ಕ್ಯಾಶ್ ತೆರವುಗೊಳಿಸಿ         |

## ಕಂಪ್ರೆಷನ್ ಪರಿಕರಗಳು (13)

| ಪರಿಕರ                               | ವ್ಯಾಪ್ತಿಗಳು         | ವಿವರಣೆ                                                                                                                                    |
| :---------------------------------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | ಕಂಪ್ರೆಷನ್ ಸೆಟ್ಟಿಂಗ್ಗಳು, ವಿಶ್ಲೇಷಣಾ ಸಾರಾಂಶ ಮತ್ತು ಕ್ಯಾಶ್-ಅರಿವುಳ್ಳ ಅಂಕಿಅಂಶಗಳು (`analytics.mcpDescriptionCompression` ಮೆಟಾಡೇಟಾವನ್ನು ಒಳಗೊಂಡಿದೆ) |
| `omniroute_compression_configure`   | `write:compression` | ಕಂಪ್ರೆಷನ್ ಮೋಡ್, ಮಿತಿ, ಗುರಿ ಅನುಪಾತ, ಸಿಸ್ಟಮ್-ಪ್ರಾಂಪ್ಟ್ ಸಂರಕ್ಷಣೆ ಮತ್ತು MCP ವಿವರಣೆ ಕಂಪ್ರೆಷನ್ ಟಾಗಲ್ ಅನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿ                       |
| `omniroute_set_compression_engine`  | `write:compression` | ಸಕ್ರಿಯ ಎಂಜಿನ್ (off/caveman/rtk/stacked) ಮತ್ತು Caveman/RTK ತೀವ್ರತೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ                                                          |
| `omniroute_list_compression_combos` | `read:compression`  | ಹೆಸರಿಸಲಾದ ಕಂಪ್ರೆಷನ್ ಕಾಂಬೊಗಳು ಮತ್ತು ಅವುಗಳ ಎಂಜಿನ್ ಪೈಪ್ಲೈನ್ಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ                                                                 |
| `omniroute_compression_combo_stats` | `read:compression`  | ಕಂಪ್ರೆಷನ್ ಕಾಂಬೊ ಮತ್ತು ಎಂಜಿನ್ ಪ್ರಕಾರ ಗುಂಪುಮಾಡಿದ ವಿಶ್ಲೇಷಣೆ                                                                                  |
| `omniroute_ccr_store`               | `write:compression` | ಕಾಲರ್-ಪ್ರತ್ಯೇಕಿತ ವಿಷಯವನ್ನು ಮಿತಿಯಿರುವ ಇನ್-ಮೆಮೊರಿ CCR ಸ್ಟೋರ್ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಿ ಮತ್ತು ಮಾರ್ಕರ್ ಜೊತೆಗೆ `ccr://` ಉಲ್ಲೇಖವನ್ನು ಹಿಂತಿರುಗಿಸಿ           |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR ವಿಷಯವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಅಥವಾ ಹೆಡ್, ಟೇಲ್, ಸಾಲುಗಳು, grep ಮತ್ತು ಅಂಕಿಅಂಶಗಳ ಮೋಡ್ಗಳಲ್ಲಿ ಹಿಂಪಡೆಯಿರಿ                                            |
| `omniroute_ccr_inspect`             | `read:compression`  | ವಿಷಯವನ್ನು ಹಿಂತಿರುಗಿಸದೆ ಕಾಲರ್-ಮಾಲೀಕತ್ವದ CCR ಮೆಟಾಡೇಟಾವನ್ನು ಪರಿಶೀಲಿಸಿ                                                                        |
| `omniroute_ccr_list`                | `read:compression`  | ಕಾಲರ್-ಮಾಲೀಕತ್ವದ CCR ಬ್ಲಾಕ್ಗಳ ಪುಟವಿಂಗಡಿತ ಮೆಟಾಡೇಟಾವನ್ನು ಪಟ್ಟಿ ಮಾಡಿ                                                                          |
| `omniroute_ccr_delete`              | `write:compression` | ಕಾಲರ್-ಮಾಲೀಕತ್ವದ CCR ಬ್ಲಾಕ್ ಅನ್ನು ಅಳಿಸಿ                                                                                                    |
| `omniroute_ccr_stats`               | `read:compression`  | ಕಾಲರ್-ವ್ಯಾಪ್ತಿಯ ಮೆಮೊರಿ ಬಳಕೆ, ಜೀವನಚಕ್ರ ಕೌಂಟರ್ಗಳು ಮತ್ತು ಸ್ಟೋರ್ ಮಿತಿಗಳನ್ನು ವರದಿ ಮಾಡಿ                                                         |
| `omniroute_rtk_discover`            | `read:compression`  | ಆಯ್ಕೆಮಾಡಿ ಸೇರಿಸಲಾದ RTK ಔಟ್ಪುಟ್ ಮಾದರಿಗಳಲ್ಲಿನ ಪುನರಾವರ್ತಿತ ಅನಗತ್ಯ ಮಾಹಿತಿಯನ್ನು ಪತ್ತೆಹಚ್ಚಿ                                                     |
| `omniroute_rtk_learn`               | `read:compression`  | ಆಯ್ಕೆಮಾಡಿ ಸೇರಿಸಲಾದ ಮಾದರಿಗಳಿಂದ ಪರಿಶೀಲಿಸಬಹುದಾದ RTK ಫಿಲ್ಟರ್ ಕರಡನ್ನು ರಚಿಸಿ                                                                    |

CCR ನಮೂದುಗಳು ಇನ್-ಮೆಮೊರಿಯಲ್ಲಿ ಮಾತ್ರ ಇರುತ್ತವೆ ಮತ್ತು ಮರುಪ್ರಾರಂಭಿಸಿದಾಗ ಕಣ್ಮರೆಯಾಗುತ್ತವೆ. ಪ್ರತಿ ಬ್ಲಾಕ್ 2 MiBಗೆ, ಪ್ರತಿ
ಪ್ರಿನ್ಸಿಪಲ್ 16 MiBಗೆ ಮತ್ತು ಜಾಗತಿಕ ಸ್ಟೋರ್ 64 MiBಗೆ ಸೀಮಿತವಾಗಿದೆ. ನಮೂದುಗಳ ಡೀಫಾಲ್ಟ್ TTL 24 ಗಂಟೆಗಳು (ಗರಿಷ್ಠ
ಏಳು ದಿನಗಳು). ಸಂಪೂರ್ಣ MCP ಹಿಂಪಡೆಯುವಿಕೆಯು 256 KiBಗೆ ಸೀಮಿತವಾಗಿದೆ; ದೊಡ್ಡ ಬ್ಲಾಕ್ಗಳು ವ್ಯಾಪ್ತಿ ಮತ್ತು grep
ಮೋಡ್ಗಳ ಮೂಲಕ ಲಭ್ಯವಿರುತ್ತವೆ. ಸಂಗ್ರಹಣೆ, ಹಿಂಪಡೆಯುವಿಕೆ, ಪಟ್ಟಿಮಾಡುವಿಕೆ, ಪರಿಶೀಲನೆ, ಅಳಿಸುವಿಕೆ ಮತ್ತು ಅಂಕಿಅಂಶಗಳನ್ನು
ದೃಢೀಕೃತ API-key ಪ್ರಿನ್ಸಿಪಲ್ ಪ್ರಕಾರ ಪ್ರತ್ಯೇಕಿಸಲಾಗಿದೆ. ಆಡಿಟ್ ದಾಖಲೆಗಳು ಹ್ಯಾಶ್ಗಳು ಮತ್ತು ಗಾತ್ರದ ಮೆಟಾಡೇಟಾವನ್ನು ಒಳಗೊಂಡಿರುತ್ತವೆ, ವಿಷಯವನ್ನಲ್ಲ.

`omniroute_compression_status`, MCP ವಿವರಣೆ ಕಂಪ್ರೆಷನ್ ಅನ್ನು
`analytics.mcpDescriptionCompression` ಅಡಿಯಲ್ಲಿ ಪ್ರತ್ಯೇಕವಾಗಿ ವರದಿ ಮಾಡುತ್ತದೆ. ಆ ಮೌಲ್ಯಗಳು MCP ಪಟ್ಟಿಮಾಡಬಹುದಾದ
ವಿವರಣೆಗಳ (`tools`, `prompts`, `resources` ಮತ್ತು `resourceTemplates`) ಮೆಟಾಡೇಟಾ-ಗಾತ್ರದ ಅಂದಾಜುಗಳಾಗಿವೆ; ಅವು ಪೂರೈಕೆದಾರ ಬಳಕೆಯ
ರಸೀದಿಗಳಲ್ಲ ಮತ್ತು `source: "mcp_metadata_estimate"` ಎಂದು ಗುರುತಿಸಲಾಗಿದೆ.

### MCP ಪ್ರವೇಶಸಾಧ್ಯತಾ ಟ್ರೀ ಫಿಲ್ಟರ್ (v3.8.0)

ಮೇಲಿನ ಕಂಪ್ರೆಷನ್ ಪರಿಕರಗಳಿಂದ ಪ್ರತ್ಯೇಕವಾಗಿ, OmniRoute ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆಯ ನಂತರದ ಫಿಲ್ಟರ್ ಅನ್ನು ಒಳಗೊಂಡಿದ್ದು, ಅದು
MCP ಬ್ರೌಸರ್/ಪ್ರವೇಶಸಾಧ್ಯತಾ ಪರಿಕರಗಳ **ಪರಿಕರ ಫಲಿತಾಂಶಗಳನ್ನು** ಏಜೆಂಟ್ಗೆ ಹಿಂತಿರುಗಿಸುವ ಮೊದಲು
ಸಂಕುಚಿತಗೊಳಿಸುತ್ತದೆ. ಈ ಫಿಲ್ಟರ್ ಸ್ವತಃ ಒಂದು ಪರಿಕರವಲ್ಲ — ವಿಸ್ತೃತ ಪ್ರವೇಶಸಾಧ್ಯತಾ-ಟ್ರೀ ಅಥವಾ ಬ್ರೌಸರ್-ಸ್ನ್ಯಾಪ್ಶಾಟ್ ಪಠ್ಯವನ್ನು (≥2000 ಅಕ್ಷರಗಳು)
ಒಳಗೊಂಡಿರುವ ಯಾವುದೇ ಪರಿಕರ ಫಲಿತಾಂಶದ ಮೇಲೆ ಇದು ಪಾರದರ್ಶಕವಾಗಿ ಚಲಿಸುತ್ತದೆ.

ಪ್ರಮುಖ ನಡವಳಿಕೆಗಳು:

- ≥30 ಸತತ ಪುನರಾವರ್ತಿತ ಸಹೋದರ ಸಾಲುಗಳನ್ನು ಹೆಡ್ + ಟೇಲ್ ಸಾರಾಂಶವಾಗಿ ಸಂಕುಚಿಸುತ್ತದೆ
- Playwright/computer-useಗೆ ಅಗತ್ಯವಿರುವ `[ref=eXX]` ಆಂಕರ್ಗಳನ್ನು ಸಂರಕ್ಷಿಸುತ್ತದೆ
- ಅತಿಗಾತ್ರದ ಪಠ್ಯವನ್ನು (>50,000 ಅಕ್ಷರಗಳು) ನ್ಯಾವಿಗೇಷನ್ ಸುಳಿವಿನೊಂದಿಗೆ ಕಡ್ಡಾಯವಾಗಿ ಮೊಟಕುಗೊಳಿಸುತ್ತದೆ
- ನಿರೀಕ್ಷಿತ ಉಳಿತಾಯ: ಬ್ರೌಸರ್ ಸ್ನ್ಯಾಪ್ಶಾಟ್ ಪೇಲೋಡ್ಗಳಲ್ಲಿ **60–80%**

ಕಾನ್ಫಿಗರೇಶನ್: ಜಾಗತಿಕ ಸೆಟ್ಟಿಂಗ್ಗಳಲ್ಲಿ `compression.mcpAccessibility` (ಮೈಗ್ರೇಶನ್ 056).
ಅನುಷ್ಠಾನ: `open-sse/services/compression/engines/mcpAccessibility/`.
ಸಂಪೂರ್ಣ ದಸ್ತಾವೇಜುಗಳು: [ಕಂಪ್ರೆಷನ್ ಎಂಜಿನ್ಗಳು — MCP ಪ್ರವೇಶಸಾಧ್ಯತಾ ಟ್ರೀ ಫಿಲ್ಟರ್](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

ಈ ಪರಿಕರಗಳ ಹಿಂದಿರುವ ರನ್ಟೈಮ್ ಕಂಪ್ರೆಷನ್ ಮಾದರಿಗಾಗಿ [ಕಂಪ್ರೆಷನ್ ಎಂಜಿನ್ಗಳು](../compression/COMPRESSION_ENGINES.md) ಮತ್ತು [RTK ಕಂಪ್ರೆಷನ್](../compression/RTK_COMPRESSION.md) ನೋಡಿ.

## 1Proxy ಪರಿಕರಗಳು (3)

| ಪರಿಕರ                       | ವ್ಯಾಪ್ತಿಗಳು    | ವಿವರಣೆ                                                                                          |
| :-------------------------- | :------------- | :---------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 1proxy ಮಾರುಕಟ್ಟೆಯಿಂದ ಉಚಿತ ಪ್ರಾಕ್ಸಿಗಳನ್ನು ಪಡೆಯಿರಿ (ಪ್ರೋಟೋಕಾಲ್/ದೇಶ/ಗುಣಮಟ್ಟ/ಮಿತಿ ಫಿಲ್ಟರ್ಗಳು)       |
| `omniroute_oneproxy_rotate` | `read:proxies` | ಕಾರ್ಯತಂತ್ರದ ಪ್ರಕಾರ ಮುಂದಿನ ಲಭ್ಯವಿರುವ ಪ್ರಾಕ್ಸಿಯನ್ನು ಪಡೆಯಿರಿ (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | ಪೂಲ್ ಅಂಕಿಅಂಶಗಳು, ಸಿಂಕ್ ಸ್ಥಿತಿ, ಪ್ರೋಟೋಕಾಲ್ ಮತ್ತು ದೇಶದ ಪ್ರಕಾರ ವಿತರಣೆ                              |

## ಮೆಮೊರಿ ಪರಿಕರಗಳು (3)

`open-sse/mcp-server/tools/memoryTools.ts` ನಲ್ಲಿ ವ್ಯಾಖ್ಯಾನಿಸಲಾಗಿದೆ. ಪ್ರಮಾಣೀಕರಣ/ವ್ಯಾಪ್ತಿಯನ್ನು ಪ್ರಮಾಣಿತ MCP ವ್ಯಾಪ್ತಿ ಪೈಪ್ಲೈನ್ ಮೂಲಕ ಜಾರಿಗೊಳಿಸಲಾಗುತ್ತದೆ.

| ಪರಿಕರ                     | ವ್ಯಾಪ್ತಿಗಳು    | ವಿವರಣೆ                                                                                                  |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------------------ |
| `omniroute_memory_search` | `read:memory`  | ಟೋಕನ್-ಬಜೆಟ್ ಜಾರಿಯೊಂದಿಗೆ ಪ್ರಶ್ನೆ / ಪ್ರಕಾರ / API ಕೀ ಆಧರಿಸಿ ಮೆಮೊರಿಗಳನ್ನು ಹುಡುಕಿ                            |
| `omniroute_memory_add`    | `write:memory` | ಹೊಸ ಮೆಮೊರಿ ನಮೂದನ್ನು ಸೇರಿಸಿ (`factual` / `episodic` / `procedural` / `semantic`)                         |
| `omniroute_memory_clear`  | `write:memory` | API ಕೀಗಾಗಿ ಮೆಮೊರಿಗಳನ್ನು ತೆರವುಗೊಳಿಸಿ; ಐಚ್ಛಿಕವಾಗಿ ಪ್ರಕಾರ ಅಥವಾ `olderThan` ಟೈಮ್ಸ್ಟ್ಯಾಂಪ್ ಮೂಲಕ ಫಿಲ್ಟರ್ ಮಾಡಿ |

## ಕೌಶಲ್ಯ ಪರಿಕರಗಳು (4)

`open-sse/mcp-server/tools/skillTools.ts` ನಲ್ಲಿ ವ್ಯಾಖ್ಯಾನಿಸಲಾಗಿದೆ. `src/lib/skills/registry` + `src/lib/skills/executor` ಇವುಗಳಿಂದ ಬೆಂಬಲಿತವಾಗಿದೆ.

| ಪರಿಕರ                         | ವ್ಯಾಪ್ತಿಗಳು      | ವಿವರಣೆ                                                                                                        |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | API ಕೀ, ಹೆಸರು ಅಥವಾ ಸಕ್ರಿಯಗೊಳಿಸಿದ ಸ್ಥಿತಿಯ ಆಧಾರದ ಮೇಲೆ ಐಚ್ಛಿಕ ಫಿಲ್ಟರಿಂಗ್ನೊಂದಿಗೆ ನೋಂದಾಯಿತ ಕೌಶಲ್ಯಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ |
| `omniroute_skills_enable`     | `write:skills`   | ID ಮೂಲಕ ನಿರ್ದಿಷ್ಟ ಕೌಶಲ್ಯವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ ಅಥವಾ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿ                                               |
| `omniroute_skills_execute`    | `execute:skills` | ಒದಗಿಸಲಾದ ಇನ್ಪುಟ್ನೊಂದಿಗೆ ಕೌಶಲ್ಯವನ್ನು ಕಾರ್ಯಗತಗೊಳಿಸಿ ಮತ್ತು ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ ದಾಖಲೆಯನ್ನು ಹಿಂತಿರುಗಿಸಿ              |
| `omniroute_skills_executions` | `read:skills`    | ಇತ್ತೀಚಿನ ಕೌಶಲ್ಯ ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ ಇತಿಹಾಸವನ್ನು ಪಟ್ಟಿ ಮಾಡಿ                                                      |

## Notion ಸಂದರ್ಭ ಮೂಲ (6)

`open-sse/mcp-server/tools/notionTools.ts` ನಲ್ಲಿ ವ್ಯಾಖ್ಯಾನಿಸಲಾಗಿದೆ. ಟೋಕನ್ ಅನ್ನು `src/lib/db/notion.ts` ಮೂಲಕ `key_value` ಕೋಷ್ಟಕದಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ. REST ಕ್ಲೈಂಟ್ `src/lib/notion/api.ts` ನಲ್ಲಿದೆ. ಸೆಟ್ಟಿಂಗ್ಗಳ API `src/app/api/settings/notion/route.ts` ನಲ್ಲಿದೆ. ಡ್ಯಾಶ್ಬೋರ್ಡ್ UI `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` ನಲ್ಲಿದೆ.

Endpoint ಡ್ಯಾಶ್ಬೋರ್ಡ್ನ **ಸಂದರ್ಭ ಮೂಲಗಳು** ಟ್ಯಾಬ್ನಿಂದ ಅಥವಾ REST API ಮೂಲಕ ನಿಮ್ಮ Notion ಏಕೀಕರಣ ಟೋಕನ್ ಅನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿ:

```bash
# ಟೋಕನ್ ಹೊಂದಿಸಿ
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ
curl http://localhost:20128/api/settings/notion

# ಸಂಪರ್ಕ ಕಡಿತಗೊಳಿಸಿ
curl -X DELETE http://localhost:20128/api/settings/notion
```

| ಪರಿಕರ                        | ವ್ಯಾಪ್ತಿಗಳು    | ವಿವರಣೆ                                                                  |
| :--------------------------- | :------------- | :---------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | ಎಲ್ಲಾ ಪುಟಗಳು ಮತ್ತು ಡೇಟಾಬೇಸ್ಗಳಾದ್ಯಂತ ಪೂರ್ಣ-ಪಠ್ಯ ಹುಡುಕಾಟ ನಡೆಸಿ            |
| `notion_get_page`            | `read:notion`  | ಪುಟವನ್ನು ಅದರ ಗುಣಲಕ್ಷಣಗಳೊಂದಿಗೆ ID ಮೂಲಕ ಪಡೆಯಿರಿ                           |
| `notion_list_block_children` | `read:notion`  | ಪುಟ ಅಥವಾ ಬ್ಲಾಕ್ನ ಚೈಲ್ಡ್ ಬ್ಲಾಕ್ಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ                         |
| `notion_query_database`      | `read:notion`  | ಫಿಲ್ಟರ್ಗಳು, ವಿಂಗಡಣೆಗಳು ಮತ್ತು ಪುಟವಿಂಗಡಣೆಯೊಂದಿಗೆ ಡೇಟಾಬೇಸ್ ಅನ್ನು ಪ್ರಶ್ನಿಸಿ |
| `notion_get_database`        | `read:notion`  | ID ಮೂಲಕ ಡೇಟಾಬೇಸ್ ಸ್ಕೀಮಾವನ್ನು ಪಡೆಯಿರಿ                                    |
| `notion_append_blocks`       | `write:notion` | ಪೇರೆಂಟ್ ಬ್ಲಾಕ್ಗೆ ಚೈಲ್ಡ್ ಬ್ಲಾಕ್ಗಳನ್ನು ಸೇರಿಸಿ (ಪ್ರತಿ ವಿನಂತಿಗೆ ಗರಿಷ್ಠ 100) |

## ಏಜೆಂಟ್ ಕೌಶಲ್ಯ ಕ್ಯಾಟಲಾಗ್ ಪರಿಕರಗಳು (3)

`open-sse/mcp-server/tools/agentSkillTools.ts` ನಲ್ಲಿ ವ್ಯಾಖ್ಯಾನಿಸಲಾಗಿದೆ. `src/lib/agentSkills/catalog` ಇದರ ಆಧಾರವಾಗಿದೆ. ಈ ಪರಿಕರಗಳು 45-ನಮೂದುಗಳ ಏಜೆಂಟ್ ಕೌಶಲ್ಯಗಳ ದಾಖಲಾತಿ ಕ್ಯಾಟಲಾಗ್ ಅನ್ನು MCP ಕ್ಲೈಂಟ್ಗಳು ಮತ್ತು ಬಾಹ್ಯ ಏಜೆಂಟ್ಗಳಿಗೆ ಲಭ್ಯವಾಗುವಂತೆ ಮಾಡುತ್ತವೆ. ವ್ಯಾಪ್ತಿ: `read:catalog`.

| ಪರಿಕರ                             | ವ್ಯಾಪ್ತಿಗಳು    | ವಿವರಣೆ                                                                                                                                                            |
| :-------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | ಐಚ್ಛಿಕ `category` (api\|cli) ಮತ್ತು `area` ಫಿಲ್ಟರ್ಗಳೊಂದಿಗೆ ಎಲ್ಲಾ 45 ಏಜೆಂಟ್ ಕೌಶಲ್ಯಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡುತ್ತದೆ; ಮೆಟಾಡೇಟಾ + ವ್ಯಾಪ್ತಿ ಮಾಹಿತಿಯನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ          |
| `omniroute_agent_skills_get`      | `read:catalog` | ಅಂಗೀಕೃತ `id` ಮೂಲಕ ಒಂದೇ ಕೌಶಲ್ಯಕ್ಕಾಗಿ ಪೂರ್ಣ ಮೆಟಾಡೇಟಾ + SKILL.md ವಿಷಯವನ್ನು ಪಡೆಯುತ್ತದೆ                                                                                |
| `omniroute_agent_skills_coverage` | `read:catalog` | ವ್ಯಾಪ್ತಿ ಅಂಕಿಅಂಶಗಳು: ಕ್ಯಾಟಲಾಗ್ನ ಒಟ್ಟು ಸಂಖ್ಯೆಗೆ ಹೋಲಿಸಿದರೆ, 23 API, 21 CLI ಮತ್ತು 1 config ಕೌಶಲ್ಯಗಳಲ್ಲಿ ಎಷ್ಟು ಕೌಶಲ್ಯಗಳು ಫೈಲ್ಸಿಸ್ಟಮ್ನಲ್ಲಿ SKILL.md ಫೈಲ್ಗಳನ್ನು ಹೊಂದಿವೆ |

ಪೂರ್ಣ ಕ್ಯಾಟಲಾಗ್ ಮತ್ತು ಬಾಹ್ಯ ಏಜೆಂಟ್ಗಳು ಅದನ್ನು ಹೇಗೆ ಬಳಸುತ್ತವೆ ಎಂಬುದಕ್ಕಾಗಿ [AGENT-SKILLS.md](./AGENT-SKILLS.md) ನೋಡಿ.

## ಸಂಬಂಧಿತ ಫ್ರೇಮ್ವರ್ಕ್ಗಳು (v3.8.0)

ಮೇಲಿನ MCP ಪರಿಕರ ಸಂಗ್ರಹವು (110 ಅನನ್ಯ ಪರಿಕರಗಳು, `countUniqueMcpTools()` ಮೂಲಕ ಲೆಕ್ಕಹಾಕಲಾಗಿದೆ) ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ
ರನ್ಟೈಮ್ ರೂಟಿಂಗ್/ಕ್ಯಾಶ್/ಕಂಪ್ರೆಷನ್/ಮೆಮೊರಿ/ಕೌಶಲ್ಯಗಳು/ಪ್ರಾಕ್ಸಿ/ಸಂದರ್ಭ-ಮೂಲ ಕಾರ್ಯಾಚರಣೆಗಳಿಗೆ ಸೀಮಿತವಾಗಿದೆ. ಪಕ್ಕದ ಎರಡು
ಫ್ರೇಮ್ವರ್ಕ್ಗಳನ್ನು v3.8.0 ನಲ್ಲಿ MCP ಸರ್ವರ್ನೊಂದಿಗೆ ಒದಗಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಅವುಗಳನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿ ದಾಖಲಿಸಲಾಗಿದೆ:

### ಕ್ಲೌಡ್ ಏಜೆಂಟ್ಗಳು

ಕ್ಲೌಡ್ ಏಜೆಂಟ್ಗಳು ಪ್ರಕ್ರಿಯೆಯ ಹೊರಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುವ AI ಕೋಡಿಂಗ್ ಏಜೆಂಟ್ಗಳಾಗಿದ್ದು (codex-cloud, cursor-cloud, devin, jules), LLM ಪೂರೈಕೆದಾರರಿಗೆ ಬಳಸುವ ಅದೇ ಸಂಪರ್ಕ ಮಾದರಿಯ ಮೂಲಕ
OmniRoute ಗೆ ಜೋಡಿಸಲ್ಪಟ್ಟಿವೆ. ಅವುಗಳನ್ನು
ಅವುಗಳ ಸ್ವಂತ REST ಮೇಲ್ಮೈ (`/api/v1/agents/*`) ಮೂಲಕ ಲಭ್ಯವಾಗುವಂತೆ ಮಾಡಲಾಗಿದೆ ಮತ್ತು ಅವು MCP ಪರಿಕರ ಕ್ಯಾಟಲಾಗ್ನ ಭಾಗವಾಗಿಲ್ಲ
— ಕ್ಲೌಡ್ ಏಜೆಂಟ್ ಅನ್ನು ಕರೆ ಮಾಡುವುದರಿಂದ MCP ವ್ಯಾಪ್ತಿ ಬಳಕೆಯಾಗುವುದಿಲ್ಲ.

- ಅನುಷ್ಠಾನ: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- ಜೀವನಚಕ್ರ: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- ದಾಖಲಾತಿ: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### ಸುರಕ್ಷತಾ ನಿಯಂತ್ರಣಗಳು

ಸುರಕ್ಷತಾ ನಿಯಂತ್ರಣಗಳು ಚಾಟ್ ಪೈಪ್ಲೈನ್ನಲ್ಲಿ ಅನ್ವಯಿಸಲಾದ ಪೂರ್ವ/ನಂತರ-ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ ಫಿಲ್ಟರ್ಗಳಾಗಿವೆ (vision-bridge, pii-masker, prompt-injection).
MCP ಪರಿಕರ/ರೂಟ್ ಪದರವನ್ನು ತಲುಪುವ ಮೊದಲು ಅವು ಚಾಲನೆಯಾಗುತ್ತವೆ
ಮತ್ತು ಆಡಿಟ್ ಪೈಪ್ಲೈನ್ಗೆ ರಚನಾತ್ಮಕ ಉಲ್ಲಂಘನೆಗಳನ್ನು ಹೊರಸೂಸುತ್ತವೆ; ಅವುಗಳನ್ನು MCP ಪರಿಕರಗಳಾಗಿ ಆಹ್ವಾನಿಸಲಾಗುವುದಿಲ್ಲ.

- ಅನುಷ್ಠಾನ: `src/lib/guardrails/`.
- ದಾಖಲಾತಿ: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

ನಿರ್ಬಂಧಿಸಲ್ಪಟ್ಟಂತೆ ಕಾಣುವ MCP ಕರೆಯನ್ನು ಡೀಬಗ್ ಮಾಡುವಾಗ, MCP ಆಡಿಟ್ ಲಾಗ್
(`scope_denied:*` ನಮೂದುಗಳು) ಮತ್ತು ಸುರಕ್ಷತಾ ನಿಯಂತ್ರಣಗಳ ಆಡಿಟ್ ಜಾಡು—ಎರಡನ್ನೂ ಪರಿಶೀಲಿಸಿ; ವಿನಂತಿಯು MCP ವ್ಯಾಪ್ತಿ ಜಾರಿಗೊಳಿಸುವಿಕೆ ಪದರವನ್ನು ತಲುಪುವ **ಮೊದಲೇ**
ಸುರಕ್ಷತಾ ನಿಯಂತ್ರಣದಿಂದ ತಿರಸ್ಕರಿಸಲ್ಪಡಬಹುದು.

---

## REST API ಅಂತಿಮಬಿಂದುಗಳು

| ಅಂತಿಮಬಿಂದು             | ವಿಧಾನ                 | ವಿವರಣೆ                                                                                                   | ದೃಢೀಕರಣ                   |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------- | :------------------------ |
| `/api/mcp/status`      | `GET`                 | ಸರ್ವರ್ ಸ್ಥಿತಿ: ಹೃದಯಬಡಿತ, HTTP ಸಾರಿಗೆ ಸ್ಥಿತಿ, ಆಡಿಟ್ ಚಟುವಟಿಕೆಯ ಸಾರಾಂಶ                                      | ನಿರ್ವಹಣೆ (ಸೆಷನ್/ನಿರ್ವಾಹಕ) |
| `/api/mcp/tools`       | `GET`                 | ಪರಿಕರ ಕ್ಯಾಟಲಾಗ್ (ಹೆಸರು, ವಿವರಣೆ, ವ್ಯಾಪ್ತಿಗಳು, ಹಂತ, ಮೂಲ ಅಂತಿಮಬಿಂದುಗಳು)                                     | ನಿರ್ವಹಣೆ                  |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE ಸಾರಿಗೆ ಅಂತಿಮಬಿಂದು (`mcpEnabled` + `mcpTransport === "sse"` ಮೂಲಕ ನಿಯಂತ್ರಿತ)                           | API ಕೀಲಿ + ವ್ಯಾಪ್ತಿಗಳು    |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | ಸ್ಟ್ರೀಮ್ ಮಾಡಬಹುದಾದ HTTP ಸಾರಿಗೆ (`mcp-session-id` ಹೆಡರ್ ಬಳಸುತ್ತದೆ; `DELETE` ಸೆಷನ್ ಅನ್ನು ಕೊನೆಗೊಳಿಸುತ್ತದೆ)  | API ಕೀಲಿ + ವ್ಯಾಪ್ತಿಗಳು    |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit` ನಿಂದ ಆಡಿಟ್ ಲಾಗ್ ನಮೂದುಗಳು (ಫಿಲ್ಟರ್ಗಳು: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | ನಿರ್ವಹಣೆ                  |
| `/api/mcp/audit/stats` | `GET`                 | ಒಟ್ಟುಗೂಡಿಸಿದ ಆಡಿಟ್ ಅಂಕಿಅಂಶಗಳು (`totalCalls`, `successRate`, `avgDurationMs`, ಅಗ್ರ ಪರಿಕರಗಳು)              | ನಿರ್ವಹಣೆ                  |

ಮೂಲ ಫೈಲ್ಗಳು: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

ಸೆಟ್ಟಿಂಗ್ಗಳಲ್ಲಿ MCP ಸರ್ವರ್ ಅನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ (`mcpEnabled`) ಮತ್ತು ಸೂಕ್ತವಾದ `mcpTransport` ಅನ್ನು ಆಯ್ಕೆ ಮಾಡುವವರೆಗೆ SSE ಮತ್ತು ಸ್ಟ್ರೀಮ್ ಮಾಡಬಹುದಾದ HTTP ಸಾರಿಗೆಗಳೆರಡನ್ನೂ ನಿರ್ಬಂಧಿಸಲಾಗುತ್ತದೆ. ತಪ್ಪಾದ ಸಾರಿಗೆಯನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿದ್ದರೆ, ಸೆಟ್ಟಿಂಗ್ಗಳನ್ನು ಬದಲಾಯಿಸುವ ಸೂಚನೆಯೊಂದಿಗೆ ರೂಟ್ HTTP 400 ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ.

---

## ದೃಢೀಕರಣ & ಸ್ಕೋಪ್ಗಳು

MCP ಪರಿಕರಗಳನ್ನು API ಕೀ ಸ್ಕೋಪ್ಗಳ ಮೂಲಕ ದೃಢೀಕರಿಸಲಾಗುತ್ತದೆ. ಸ್ಕೋಪ್ ಜಾರಿಗೊಳಿಸುವಿಕೆಯನ್ನು
`open-sse/mcp-server/scopeEnforcement.ts` ನಲ್ಲಿ ಕೇಂದ್ರೀಕರಿಸಲಾಗಿದೆ. ಪ್ರತಿ ಪರಿಕರಕ್ಕೂ ನಿರ್ದಿಷ್ಟ ಸ್ಕೋಪ್ಗಳು ಅಗತ್ಯವಿವೆ:

| ಸ್ಕೋಪ್                | ಪರಿಕರಗಳು                                                                                                                                                                        |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                               |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                       |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                          |
| `read:quota`          | `check_quota`                                                                                                                                                                   |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                          |
| `read:models`         | `list_models_catalog`                                                                                                                                                           |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                   |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                           |
| `write:budget`        | `set_budget_guard`                                                                                                                                                              |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                     |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                  |
| `read:cache`          | `cache_stats`                                                                                                                                                                   |
| `write:cache`         | `cache_flush`                                                                                                                                                                   |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                      |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                               |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                           |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                          |
| `read:memory`         | `memory_search`                                                                                                                                                                 |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                    |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                              |
| `write:skills`        | `skills_enable`                                                                                                                                                                 |
| `execute:skills`      | `skills_execute`                                                                                                                                                                |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                         |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                       |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                  |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                              |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                 |
| `read:obsidian`       | 13 ಓದುವ ಪರಿಕರಗಳು — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 ಬರೆಯುವ ಪರಿಕರಗಳು — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …              |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                               |

ವೈಲ್ಡ್ಕಾರ್ಡ್ ಸ್ಕೋಪ್ಗಳಿಗೆ ಬೆಂಬಲವಿದೆ: `read:*` ಎಲ್ಲಾ ಓದುವ ಸ್ಕೋಪ್ಗಳನ್ನು ನೀಡುತ್ತದೆ, `*` ಸಂಪೂರ್ಣ ಪ್ರವೇಶವನ್ನು ನೀಡುತ್ತದೆ.

### `mcp:connect` — ಸೀಮಿತ ರೂಟ್ ಸಾಮರ್ಥ್ಯ (#7895)

ಲೂಪ್ಬ್ಯಾಕ್ ಅಲ್ಲದ ಮೂಲದಿಂದ HTTP/SSE MCP ಟ್ರಾನ್ಸ್ಪೋರ್ಟ್ (`/api/mcp/*`) ಅನ್ನು ತಲುಪಲು
`/api/mcp/` LOCAL_ONLY ವಿನಾಯಿತಿ ಅಗತ್ಯವಿದೆ (`docs/security/ROUTE_GUARD_TIERS.md` ನೋಡಿ). ಹಿಂದೆ
ಆ ವಿನಾಯಿತಿಯು ಸಂಪೂರ್ಣ `manage`/`admin`-ಸ್ಕೋಪ್ನ API ಕೀಯನ್ನು ಮಾತ್ರ ಸ್ವೀಕರಿಸುತ್ತಿತ್ತು — ಕೇವಲ
MCP ಜೊತೆ ಸಂವಹನ ನಡೆಸಬೇಕಾದ ಕರೆಗಾರನಿಗೆ ಇದು ಅಗತ್ಯಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ವ್ಯಾಪ್ತಿಯಾಗಿತ್ತು. `src/shared/constants/managementScopes.ts` ಈಗ
`MCP_CONNECT_SCOPE = "mcp:connect"` ಅನ್ನು ಎಕ್ಸ್ಪೋರ್ಟ್ ಮಾಡುತ್ತದೆ: ಇದು ಹೆಚ್ಚುವರಿ, ಸೀಮಿತ ಸ್ಕೋಪ್ ಆಗಿದ್ದು (`SELF_USAGE_SCOPE` ನಂತೆಯೇ ಅದೇ ಪೂರ್ವನಿದರ್ಶನ)
`src/server/authz/policies/management.ts` ನಲ್ಲಿನ `/api/mcp/` ಬೈಪಾಸ್ಗೆ ಮಾತ್ರ ಅಧಿಕಾರ ನೀಡುತ್ತದೆ — ಇದು ಬೇರೆ ಯಾವುದೇ ಮ್ಯಾನೇಜ್ಮೆಂಟ್-ರೂಟ್ ಪ್ರವೇಶವನ್ನು
ನೀಡುವುದಿಲ್ಲ ಮತ್ತು ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ `MANAGEMENT_API_KEY_SCOPES` ನಿಂದ ಹೊರಗಿಡಲಾಗಿದೆ. `manage`/`admin`
ಹೊಂದಿರುವ ಕೀ ಇನ್ನೂ ಯಾವುದೇ ಬದಲಾವಣೆಯಿಲ್ಲದೆ ವಿನಾಯಿತಿಯನ್ನು ಹಾದುಹೋಗುತ್ತದೆ; ದೂರಸ್ಥ MCP-ಮಾತ್ರ ಕರೆಗಾರರಿಗೆ
`mcp:connect` ಕಡಿಮೆ-ಅಧಿಕಾರದ ಪರ್ಯಾಯವಾಗಿದ್ದು, ಅದನ್ನು `hasMcpConnectOrManageScope()` ಮೂಲಕ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ.

### ಪ್ರತಿ-ಕೀ HTTP ಸ್ಕೋಪ್ ಬೈಂಡಿಂಗ್ (#7895)

HTTP/SSE ಮೂಲಕ, `open-sse/mcp-server/httpTransport.ts` ಈಗ ಕರೆಗಾರನ ನಿಜವಾದ
`api_keys.scopes` ಅನ್ನು `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
ಮೂಲಕ ನಿರ್ಧರಿಸುತ್ತದೆ ಮತ್ತು ಅದನ್ನು MCP SDK ಯ `transport.handleRequest(req, { authInfo })` ಗೆ ರವಾನಿಸುತ್ತದೆ, ಆದ್ದರಿಂದ
ಪ್ರತಿ ಪರಿಕರದ ಕರೆಗೆ ತಲುಪುವ `extra.authInfo.scopes` Bearer ಕೀಯ ಸ್ವಂತ ಸ್ಕೋಪ್ಗಳನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ.
`scopeEnforcement.ts` ನ `resolveCallerScopeContext()` ಈಗಾಗಲೇ `_meta` ಮತ್ತು
`OMNIROUTE_MCP_SCOPES` env ಫಾಲ್ಬ್ಯಾಕ್ಗಿಂತ `authInfo` ಗೆ ಆದ್ಯತೆ ನೀಡುತ್ತಿತ್ತು — ಈ ಬದಲಾವಣೆಯು ಹಿಂದೆ HTTP ಮೂಲಕ
ಮಾಹಿತಿ ಸಿಗದಿದ್ದ ಆ ಮೊದಲ, ಅತ್ಯುನ್ನತ-ಆದ್ಯತೆಯ ಮೂಲವನ್ನು ಮಾತ್ರ ಭರ್ತಿ ಮಾಡುತ್ತದೆ. ಯಾವುದೇ API ಕೀ ನಿರ್ಧಾರವಾಗದಿದ್ದಾಗ
(ಹೆಡರ್ ಇಲ್ಲದಿದ್ದರೆ, ಅಮಾನ್ಯ ಕೀಯಿದ್ದರೆ), `authInfo` `undefined` ಆಗಿಯೇ ಉಳಿಯುತ್ತದೆ ಮತ್ತು ನಿರ್ಧಾರ ಪ್ರಕ್ರಿಯೆಯು
ಈಗಿರುವ `meta`/env ಸರಪಳಿಗೆ ಯಾವುದೇ ಬದಲಾವಣೆಯಿಲ್ಲದೆ ಮುಂದುವರಿಯುತ್ತದೆ. ಇದು `OMNIROUTE_MCP_ENFORCE_SCOPES` ನ
ಡೀಫಾಲ್ಟ್ ಅನ್ನು ಬದಲಾಯಿಸುವುದಿಲ್ಲ — ಜಾರಿಗೊಳಿಸುವಿಕೆಯನ್ನು ಇನ್ನೂ ಸ್ಪಷ್ಟವಾಗಿ ಸಕ್ರಿಯಗೊಳಿಸಬೇಕು; ಈ ಬದಲಾವಣೆಯು ಅದು ಸಕ್ರಿಯವಾದ ನಂತರ
ಪ್ರತಿ-ಕೀ ಮಾರ್ಗಕ್ಕೆ ಆದ್ಯತೆ ಸಿಗುವಂತೆ ಮಾತ್ರ ಮಾಡುತ್ತದೆ. stdio ಗೆ ಪ್ರತಿ-ಕರೆಗಾರ ಗುರುತು ಇಲ್ಲ
(`mcpCallerIdentity.ts` ನೋಡಿ) ಮತ್ತು ಇದರಿಂದ ಪರಿಣಾಮವಾಗುವುದಿಲ್ಲ — ಅದು `_meta`/env ಫಾಲ್ಬ್ಯಾಕ್ ಸರಪಳಿಯಲ್ಲಿಯೇ ಉಳಿಯುತ್ತದೆ.

---

## ಪರಿಸರ ಚರಾಂಶಗಳು

| ಚರಾಂಶ                                   | ಡೀಫಾಲ್ಟ್                                          | ಉದ್ದೇಶ                                                                                                                                              |
| :-------------------------------------- | :------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                          | OmniRoute ಆಂತರಿಕ APIಗಳನ್ನು ಕರೆಯುವಾಗ MCP ಸರ್ವರ್ ಬಳಸುವ ಮೂಲ URL                                                                                        |
| `OMNIROUTE_API_KEY`                     | (ಖಾಲಿ)                                            | ಆಂತರಿಕ API ಕರೆಗಳಿಗೆ `Authorization: Bearer` ಆಗಿ ರವಾನಿಸಲಾಗುವ API ಕೀ                                                                                  |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (`"true"` ಮಾತ್ರ ಇದನ್ನು ಸಕ್ರಿಯಗೊಳಿಸುತ್ತದೆ) | ಸಕ್ರಿಯಗೊಳಿಸಿದಾಗ, ಲಭ್ಯವಿಲ್ಲದ ಸ್ಕೋಪ್ಗಳು ಪರಿಕರ ಕರೆಗಳನ್ನು ನಿರಾಕರಿಸುತ್ತವೆ ಮತ್ತು ಆಡಿಟ್ ಲಾಗ್ನಲ್ಲಿ `scope_denied:<reason>` ಅನ್ನು ದಾಖಲಿಸುತ್ತವೆ               |
| `OMNIROUTE_MCP_SCOPES`                  | (ಖಾಲಿ)                                            | ಡೀಫಾಲ್ಟ್ ಆಗಿ "ಲಭ್ಯವಿದೆ" ಎಂದು ಪರಿಗಣಿಸಲಾದ ಸ್ಕೋಪ್ಗಳ ಅಲ್ಪವಿರಾಮದಿಂದ ಬೇರ್ಪಡಿಸಿದ ಅನುಮತಿ ಪಟ್ಟಿ (ಕರೆ ಮಾಡುವವರು ತಮ್ಮದೇ ಸ್ಕೋಪ್ಗಳನ್ನು ಒದಗಿಸದಿದ್ದಾಗ ಬಳಸಲಾಗುತ್ತದೆ) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (ಹೊಂದಿಸಿಲ್ಲ = ಸಕ್ರಿಯ)                             | `0/false/off/no` ಗೆ ಹೊಂದಿಸಿದಾಗ, ನೋಂದಣಿ ಸಮಯದಲ್ಲಿ MCP ವಿವರಣೆ ಸಂಕುಚನವನ್ನು ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುತ್ತದೆ                                                         |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (ಹೊಂದಿಸಿಲ್ಲ = ಸಕ್ರಿಯ)                             | ಮೇಲಿನ ಅದೇ ಟಾಗಲ್ಗೆ ಪರ್ಯಾಯ ಅಲಿಯಾಸ್                                                                                                                    |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                           | ಆಂತರಿಕ ನಿರ್ವಹಣಾ ಓದುಗಳಿಗೆ (ಸ್ಥಿತಿ, ಸ್ಥಿತಿಸ್ಥಾಪಕತೆ, ಸಂಯೋಜನೆಗಳು, ಕೋಟಾ, ಬಳಕೆ) ರದ್ದುಗೊಳಿಸುವ ಸಮಯ ಮಿತಿ                                                     |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                           | ಪೂರೈಕೆದಾರರಿಗಾಗಿ ಕಾಯುವ ಹಂತಗಳಿಗೆ (`route_request`, `web_search`, `web_fetch`) ರದ್ದುಗೊಳಿಸುವ ಸಮಯ ಮಿತಿ                                                   |
| `MCP_TOOL_DENY`                         | (ಹೊಂದಿಸಿಲ್ಲ = ಫಿಲ್ಟರ್ ಇಲ್ಲ)                       | `tools/list` ನಿಂದ ತೆಗೆದುಹಾಕಬೇಕಾದ ಅಲ್ಪವಿರಾಮದಿಂದ ಬೇರ್ಪಡಿಸಿದ ಪರಿಕರ ಹೆಸರುಗಳು (ಪರಿಕರ-ಕಾರ್ಡಿನಾಲಿಟಿ ಕಡಿತ — ಕೆಳಗೆ ನೋಡಿ)                                     |
| `MCP_TOOL_ALLOW`                        | (ಹೊಂದಿಸಿಲ್ಲ = ಫಿಲ್ಟರ್ ಇಲ್ಲ)                       | ಪ್ರತ್ಯೇಕವಾಗಿ ಉಳಿಸಬೇಕಾದ ಅಲ್ಪವಿರಾಮದಿಂದ ಬೇರ್ಪಡಿಸಿದ ಪರಿಕರ ಹೆಸರುಗಳು (ಅನುಮತಿ-ಪಟ್ಟಿ ಮೋಡ್ — ಕೆಳಗೆ ನೋಡಿ)                                                     |
| `DATA_DIR`                              | `~/.omniroute`                                    | ಹಾರ್ಟ್ಬೀಟ್ ಫೈಲ್ ಅನ್ನು `${DATA_DIR}/runtime/mcp-heartbeat.json` ಗೆ ಬರೆಯಲಾಗುತ್ತದೆ                                                                     |

---

## ವಿವರಣೆ ಸಂಕುಚನ

ಕ್ಲೈಂಟ್ಗಳಿಗೆ ಬಹಿರಂಗಪಡಿಸಲಾಗುವ ಮೆಟಾಡೇಟಾ ಗಾತ್ರವನ್ನು (ಹಾಗಾಗಿ ಪ್ರಾಂಪ್ಟ್ ಸಂದರ್ಭದ ವೆಚ್ಚವನ್ನೂ) ಕಡಿಮೆ ಮಾಡಲು, MCP ಪರಿಕರ, ಪ್ರಾಂಪ್ಟ್ ಮತ್ತು ಸಂಪನ್ಮೂಲ ರಿಜಿಸ್ಟ್ರಿಗಳು ನೋಂದಣಿ/ಪಟ್ಟಿ ಸಮಯದಲ್ಲಿ ವಿವರಣೆಗಳನ್ನು ಸಂಕುಚಿತಗೊಳಿಸಬಹುದು. ಅನುಷ್ಠಾನವು `open-sse/mcp-server/descriptionCompressor.ts` ನಲ್ಲಿದೆ ಮತ್ತು `createMcpServer()` ಒಳಗಿನ `compressMcpRegistryMetadata` ಮೂಲಕ MCP ಸರ್ವರ್ಗೆ ಸಂಯೋಜಿಸಲಾಗಿದೆ.

- ರಚನಾತ್ಮಕ ವಿಷಯವು ಬದಲಾಗದಂತೆ ಸಂರಕ್ಷಿತ-ಬ್ಲಾಕ್ ಹೊರತೆಗೆಯುವಿಕೆಯೊಂದಿಗೆ (ಕೋಡ್ ಸ್ಪ್ಯಾನ್ಗಳು, ಫೆನ್ಸ್ ಮಾಡಿದ ಬ್ಲಾಕ್ಗಳು ಇತ್ಯಾದಿ), Caveman ನಿಯಮಸಮೂಹವನ್ನು (`getRulesForContext("all", "full")`) ಬಳಸಿ ವಿವರಣೆ ಪಠ್ಯದ ಮೇಲೆ ಸಂಕುಚನವನ್ನು ನಡೆಸಲಾಗುತ್ತದೆ.
- `key_value` ಸೆಟ್ಟಿಂಗ್ಗಳ ಕೋಷ್ಟಕದಲ್ಲಿರುವ `compression.mcpDescriptionCompressionEnabled` ಮೌಲ್ಯದ ಮೂಲಕ ಪ್ರತಿ ನಿಯೋಜನೆಗೆ ಟಾಗಲ್ ಮಾಡಿ (ಡೀಫಾಲ್ಟ್: ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ) — UIಯಲ್ಲಿ **ವಿಶ್ಲೇಷಣೆ → MCP ವಿವರಣೆ ಸಂಕುಚನ** ಎಂದು ಪ್ರದರ್ಶಿಸಲಾಗುತ್ತದೆ.
- `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` ಅಥವಾ `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` ಇವುಗಳಲ್ಲಿ ಯಾವುದಾದರೊಂದರ ಮೂಲಕ ಪ್ರಕ್ರಿಯೆಯಾದ್ಯಂತ ಟಾಗಲ್ ಮಾಡಿ.
- ನೈಜ ಪೂರೈಕೆದಾರರ ಬಳಕೆಯ ರಸೀದಿಗಳಿಂದ ಪ್ರತ್ಯೇಕಿಸಲು, ನೈಜ-ಸಮಯದ ಅಂಕಿಅಂಶಗಳನ್ನು `analytics.mcpDescriptionCompression` ಅಡಿಯಲ್ಲಿ `omniroute_compression_status` ಮೂಲಕ ಪ್ರದರ್ಶಿಸಲಾಗುತ್ತದೆ ಮತ್ತು `source: "mcp_metadata_estimate"` ಎಂದು ಟ್ಯಾಗ್ ಮಾಡಲಾಗುತ್ತದೆ.

---

## ಟೂಲ್ ಕಾರ್ಡಿನಾಲಿಟಿ ಕಡಿತ (F4.3)

ವಿವರಣೆಯ ಸಂಕುಚನವು ಪ್ರತಿ ಟೂಲ್ನ ಮೆಟಾಡೇಟಾವನ್ನು ಕುಗ್ಗಿಸುತ್ತದೆ; **ಟೂಲ್-ಕಾರ್ಡಿನಾಲಿಟಿ ಕಡಿತ**ವು ಘೋಷಿಸಲಾಗುವ ಟೂಲ್ಗಳ _ಸಂಖ್ಯೆಯನ್ನೇ_ ಕಡಿಮೆ ಮಾಡುವ ಮೂಲಕ ಇನ್ನೊಂದು ಹೆಜ್ಜೆ ಮುಂದೆ ಹೋಗುತ್ತದೆ. `tools/list` ಮ್ಯಾನಿಫೆಸ್ಟ್ನಲ್ಲಿ ಕಡಿಮೆ ಟೂಲ್ಗಳನ್ನು ಪ್ರಕಟಿಸುವುದರಿಂದ, ಟೂಲ್ ಕ್ಯಾಟಲಾಗ್ಗಾಗಿ ಕ್ಲೈಂಟ್ನ ಮಾಡೆಲ್ ಪ್ರತಿ ವಿನಂತಿಗೆ ಪಾವತಿಸುವ ಟೋಕನ್ ವೆಚ್ಚವು ಕಡಿಮೆಯಾಗುತ್ತದೆ ("layer 5" ಸಂಕುಚನ). ಇದರ ಅನುಷ್ಠಾನವು `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`) ನಲ್ಲಿರುವ ಶುದ್ಧ, ಸ್ಥಿತಿರಹಿತ ಫಿಲ್ಟರ್ ಆಗಿದ್ದು, `createMcpServer()` (`open-sse/mcp-server/server.ts`) ನಲ್ಲಿನ ನೋಂದಣಿ ಲೂಪ್ಗೆ ಜೋಡಿಸಲಾಗಿದೆ.

**ಆಯ್ಕೆ ಮಾಡಿದಾಗ ಮಾತ್ರ ಸಕ್ರಿಯ, ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ನಿಷ್ಕ್ರಿಯ.** ಎರಡು ಪರಿಸರ ಚರಗಳಲ್ಲಿ ಕನಿಷ್ಠ ಒಂದನ್ನು ಹೊಂದಿಸಿದಾಗ ಮಾತ್ರ ಫಿಲ್ಟರ್ ಚಲಿಸುತ್ತದೆ; ಎರಡನ್ನೂ ಹೊಂದಿಸದಿದ್ದರೆ, ಎಲ್ಲಾ 110 ಟೂಲ್ಗಳನ್ನು ಯಾವುದೇ ಬದಲಾವಣೆಯಿಲ್ಲದೆ ಘೋಷಿಸಲಾಗುತ್ತದೆ.

| ಚರ               | ಮೋಡ್                                                                                                     |
| :--------------- | :------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | ಕಪ್ಪುಪಟ್ಟಿ — `tools/list` ನಿಂದ ಯಾವಾಗಲೂ ತೆಗೆದುಹಾಕಬೇಕಾದ, ಅಲ್ಪವಿರಾಮದಿಂದ ಬೇರ್ಪಡಿಸಿದ ಟೂಲ್ ಹೆಸರುಗಳು            |
| `MCP_TOOL_ALLOW` | ಅನುಮತಿ ಪಟ್ಟಿ — ಅಲ್ಪವಿರಾಮದಿಂದ ಬೇರ್ಪಡಿಸಿದ ಟೂಲ್ ಹೆಸರುಗಳು; ಇವು ಮಾತ್ರ ಉಳಿಯುತ್ತವೆ, ಉಳಿದೆಲ್ಲ ತೆಗೆದುಹಾಕಲಾಗುತ್ತದೆ |

`deny` ಗೆ `allow` ಗಿಂತ ಆದ್ಯತೆ ಇದೆ. ಹೆಸರುಗಳನ್ನು ಅಲ್ಪವಿರಾಮಗಳಿಂದ ಬೇರ್ಪಡಿಸಲಾಗುತ್ತದೆ, ಅವುಗಳ ಮುಂದು-ಹಿಂದಿನ ಖಾಲಿ ಜಾಗವನ್ನು ತೆಗೆದುಹಾಕಲಾಗುತ್ತದೆ ಮತ್ತು ಖಾಲಿ ನಮೂದುಗಳನ್ನು ನಿರ್ಲಕ್ಷಿಸಲಾಗುತ್ತದೆ. ಉದಾಹರಣೆಗಳು:

```bash
# ಕ್ಯಾಟಲಾಗ್ನಿಂದ ಎರಡು ಟೂಲ್ಗಳನ್ನು ತೆಗೆದುಹಾಕಿ
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# ರೂಟಿಂಗ್ + ಕೋಟಾ ಟೂಲ್ಗಳನ್ನು ಮಾತ್ರ ಘೋಷಿಸಿ (ಅನುಮತಿ-ಪಟ್ಟಿ ಮೋಡ್)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**ಫಿಲ್ಟರ್ ಮಾಡಿದ ಟೂಲ್ಗಳನ್ನು ತೆಗೆದುಹಾಕುವ ವಿಧಾನ:** ನೋಂದಣಿ ಯಾವಾಗಲೂ ಯಶಸ್ವಿಯಾಗುತ್ತದೆ; ಪ್ರೊಫೈಲ್ ತಿರಸ್ಕರಿಸುವ ಟೂಲ್ ಅನ್ನು ನಂತರ MCP SDK ಹ್ಯಾಂಡಲ್ನಲ್ಲಿ `.disable()` ಮಾಡಲಾಗುತ್ತದೆ, ಆದ್ದರಿಂದ ಅದು `tools/list` ನಲ್ಲಿ ಎಂದಿಗೂ ಕಾಣಿಸುವುದಿಲ್ಲ, ಆದರೆ ವೈರಿಂಗ್ ಹಾಗೆಯೇ ಉಳಿಯುತ್ತದೆ (ಸ್ವಚ್ಛವಾದ ಸಕ್ರಿಯಗೊಳಿಸುವಿಕೆ/ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುವಿಕೆ, ಮರು-ನೋಂದಣಿ ಇಲ್ಲ). ಪ್ರೊಫೈಲ್ ಪಾರ್ಸರ್ `readMcpToolProfileFromEnv(process.env)` ಆಗಿದ್ದು, ಎರಡೂ ಚರಗಳು ಖಾಲಿಯಾಗಿರುವಾಗ ಅದು `null` (ಫಿಲ್ಟರಿಂಗ್ ಇಲ್ಲ) ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ.

`reduceToolManifest` ನ ಹಿಂದಿರುವ ಹೆಚ್ಚು ಸಮೃದ್ಧವಾದ `ToolProfile` ರಚನೆಯು ಸ್ಕೋಪ್-ಛೇದನ ಫಿಲ್ಟರಿಂಗ್ (`allowScopes`, `read:*`-ಶೈಲಿಯ ವೈಲ್ಡ್ಕಾರ್ಡ್ ಹೊಂದಾಣಿಕೆಯೊಂದಿಗೆ) ಮತ್ತು ನಿರ್ಣಾಯಕ `maxTools` ಮಿತಿಯನ್ನೂ ಬೆಂಬಲಿಸುತ್ತದೆ, ಆದರೆ ಆ ಎರಡು ನಿಯಂತ್ರಣಗಳಿಗೆ ನೋಂದಣಿ ಸಮಯದಲ್ಲಿ ಸಂಪೂರ್ಣ ಮ್ಯಾನಿಫೆಸ್ಟ್ ಅಗತ್ಯವಿರುತ್ತದೆ ಮತ್ತು ಅವುಗಳನ್ನು ಇಂದು ಪರಿಸರ ಚರಗಳ ಮೂಲಕ **ಬಹಿರಂಗಪಡಿಸಲಾಗಿಲ್ಲ** (`tools/list`-ಮಟ್ಟದ ಹುಕ್ ಒಂದು ಟ್ರ್ಯಾಕ್ ಮಾಡಲಾದ ಮುಂದಿನ ಕಾರ್ಯವಾಗಿದೆ). ಕಡಿತದ ಮೊದಲು ಮತ್ತು ನಂತರದ ಮ್ಯಾನಿಫೆಸ್ಟ್ ಟೋಕನ್ ವೆಚ್ಚವನ್ನು ಹೋಲಿಸಲು `estimateManifestTokens()` ಲಭ್ಯವಿದೆ.

---

## ರನ್ಟೈಮ್ ಹಾರ್ಟ್ಬೀಟ್

stdio ಟ್ರಾನ್ಸ್ಪೋರ್ಟ್ ಪ್ರತಿ 5 ಸೆಕೆಂಡುಗಳಿಗೊಮ್ಮೆ ಜೀವಂತಿಕೆಯ ಸ್ಥಿತಿಯನ್ನು `${DATA_DIR}/runtime/mcp-heartbeat.json` ನಲ್ಲಿ ಉಳಿಸುತ್ತದೆ. `online` ಸ್ಥಿತಿಯನ್ನು ನಿರ್ಧರಿಸಲು ಡ್ಯಾಶ್ಬೋರ್ಡ್ (`/api/mcp/status`) ಈ ಫೈಲ್ ಮತ್ತು PID ಜೀವಂತಿಕೆಯನ್ನು ಓದುತ್ತದೆ. ಬದಲಾಗಿ, HTTP ಟ್ರಾನ್ಸ್ಪೋರ್ಟ್ಗಳು ಪ್ರಕ್ರಿಯೆಯೊಳಗಿನ `getMcpHttpStatus()` ನಿಂದ ಸ್ಥಿತಿಯನ್ನು ವರದಿ ಮಾಡುತ್ತವೆ (ಫೈಲ್ ಬರವಣಿಗೆ ಇಲ್ಲ).

ಹಾರ್ಟ್ಬೀಟ್ ಸ್ನ್ಯಾಪ್ಶಾಟ್ ಈ ಕೆಳಗಿನವುಗಳನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ:

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## ಆಡಿಟ್ ಲಾಗಿಂಗ್

ಪ್ರತಿ ಟೂಲ್ ಕರೆಯನ್ನು `open-sse/mcp-server/audit.ts` ಮೂಲಕ SQLite `mcp_tool_audit` ಟೇಬಲ್ಗೆ ಲಾಗ್ ಮಾಡಲಾಗುತ್ತದೆ:

- ಟೂಲ್ ಹೆಸರು, ಆರ್ಗ್ಯುಮೆಂಟ್ಗಳು (ಪ್ರತಿ-ಟೂಲ್ `auditLevel` ಪ್ರಕಾರ ಹ್ಯಾಶ್ ಮಾಡಿದ/ಮೊಟಕುಗೊಳಿಸಿದ), ಫಲಿತಾಂಶ
- ms ನಲ್ಲಿ ಅವಧಿ, ಯಶಸ್ಸು/ವೈಫಲ್ಯ ಫ್ಲ್ಯಾಗ್, ದೋಷ ಸಂದೇಶ (ಅನ್ವಯಿಸಿದಾಗ)
- API ಕೀ ಹ್ಯಾಶ್, ಟೈಮ್ಸ್ಟ್ಯಾಂಪ್
- ಸ್ಕೋಪ್ ನಿರಾಕರಣೆಗಳನ್ನು ಕಾಣೆಯಾದ ಸ್ಕೋಪ್ ಪಟ್ಟಿಯೊಂದಿಗೆ `scope_denied:<reason>` ಎಂದು ಲಾಗ್ ಮಾಡಲಾಗುತ್ತದೆ

ಇತ್ತೀಚಿನ ಕರೆಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಅಥವಾ `/api/mcp/audit` ಮತ್ತು `/api/mcp/audit/stats` REST ಎಂಡ್ಪಾಯಿಂಟ್ಗಳನ್ನು ಬಳಸಿ.

---

## ಫೈಲ್ಗಳು

| ಫೈಲ್                                                                     | ಉದ್ದೇಶ                                                                      |
| :----------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP ಸರ್ವರ್ ಫ್ಯಾಕ್ಟರಿ, stdio ಪ್ರವೇಶ ಬಿಂದು, ವ್ಯಾಪ್ತಿ-ನಿರ್ದಿಷ್ಟ ಟೂಲ್ ನೋಂದಣಿಗಳು |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP ಸಾರಿಗೆ (ಸೆಷನ್ ನಿರ್ವಹಣೆ)                               |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | ಟೂಲ್ ವ್ಯಾಪ್ತಿ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ಕಾಲರ್ ಪರಿಹಾರ                                  |
| `open-sse/mcp-server/audit.ts`                                           | ಟೂಲ್ ಕರೆ ಆಡಿಟ್ ಲಾಗಿಂಗ್ (`mcp_tool_audit`)                                   |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio ಹಾರ್ಟ್ಬೀಟ್ ರೈಟರ್ (`mcp-heartbeat.json`)                               |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | ಟೂಲ್ / ಪ್ರಾಂಪ್ಟ್ / ಸಂಪನ್ಮೂಲ ರಿಜಿಸ್ಟ್ರಿಗಳಿಗಾಗಿ ವಿವರಣೆ ಸಂಕೋಚನ                 |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod ಸ್ಕೀಮಾಗಳು + ಟೂಲ್ ರಿಜಿಸ್ಟ್ರಿ (`MCP_TOOLS`, 45 ನಮೂದುಗಳು)                  |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | ಹಂತ 2 + ಕ್ಯಾಶ್ + 1proxy ಟೂಲ್ ಹ್ಯಾಂಡ್ಲರ್ಗಳು                                  |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | ಸಂಕೋಚನ ಟೂಲ್ ಹ್ಯಾಂಡ್ಲರ್ಗಳು                                                   |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | ಮೆಮೊರಿ ಟೂಲ್ ವ್ಯಾಖ್ಯಾನಗಳು (3 ಟೂಲ್ಗಳು)                                        |
| `open-sse/mcp-server/tools/skillTools.ts`                                | ಕೌಶಲ್ಯ ಟೂಲ್ ವ್ಯಾಖ್ಯಾನಗಳು (4 ಟೂಲ್ಗಳು)                                        |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion ಸಂದರ್ಭ ಮೂಲ ಟೂಲ್ ವ್ಯಾಖ್ಯಾನಗಳು (6 ಟೂಲ್ಗಳು)                             |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | ಗೇಮಿಫಿಕೇಶನ್ ಟೂಲ್ ವ್ಯಾಖ್ಯಾನಗಳು (8 ಟೂಲ್ಗಳು)                                   |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | ಪ್ಲಗಿನ್ ನೋಂದಣಿ ಮತ್ತು ನಿರ್ವಹಣಾ ಟೂಲ್ಗಳು (8 ಟೂಲ್ಗಳು)                           |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` ಎಂಡ್ಪಾಯಿಂಟ್                                               |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` ಎಂಡ್ಪಾಯಿಂಟ್                                                |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE ಸಾರಿಗೆ ರೂಟ್                                              |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP ಸಾರಿಗೆ ರೂಟ್                               |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` ಆಡಿಟ್ ಲಾಗ್ ಕ್ವೆರಿ                                          |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` ಒಟ್ಟುಗೂಡಿಸಿದ ಆಡಿಟ್ ಮೆಟ್ರಿಕ್ಗಳು                       |
| `src/lib/notion/api.ts`                                                  | Notion REST API ಕ್ಲೈಂಟ್ (ಮರುಪ್ರಯತ್ನ, ಕಾಲಾವಧಿ ಮೀರಿಕೆ, ದೋಷ ವರ್ಗೀಕರಣ)          |
| `src/lib/db/notion.ts`                                                   | Notion ಟೋಕನ್ ಸ್ಥಿರ ಸಂಗ್ರಹಣೆ (`key_value` ಟೇಬಲ್)                             |
| `src/app/api/settings/notion/route.ts`                                   | Notion ಸೆಟ್ಟಿಂಗ್ಗಳ API (GET/POST/DELETE)                                    |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion ಟೋಕನ್ ನಿರ್ವಹಣಾ UI                                                    |
| `tests/unit/notion-api.test.ts`                                          | Notion API ಕ್ಲೈಂಟ್ ಪರೀಕ್ಷೆಗಳು (7)                                           |
| `tests/unit/notion-tools.test.ts`                                        | Notion ಟೂಲ್ಗಳ ವ್ಯಾಪ್ತಿ ಜಾರಿ ಪರೀಕ್ಷೆಗಳು (10)                                 |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB ಮಾಡ್ಯೂಲ್ ಪರೀಕ್ಷೆಗಳು (3)                                           |
