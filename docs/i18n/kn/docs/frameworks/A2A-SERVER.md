# OmniRoute A2A Server Documentation (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — ಬುದ್ಧಿವಂತ ರೂಟಿಂಗ್ ಏಜೆಂಟ್ ಆಗಿ OmniRoute

A2A ಇಂಟರ್ಫೇಸ್ ಎರಡು ರೂಪಗಳನ್ನು ಹೊಂದಿದೆ:

- **JSON-RPC 2.0** — `POST /a2a` ನಲ್ಲಿ (ಪ್ರಮಾಣಿತ ಪ್ರವೇಶ ಬಿಂದು, `src/app/a2a/route.ts` ನಲ್ಲಿ ವ್ಯಾಖ್ಯಾನಿಸಲಾಗಿದೆ).
- **REST** — ಡ್ಯಾಶ್ಬೋರ್ಡ್ಗಳು ಮತ್ತು ಪರಿಕರಗಳಿಗಾಗಿ `/api/a2a/*` ಅಡಿಯಲ್ಲಿ (ಸ್ಥಿತಿ, ಕಾರ್ಯ ಪಟ್ಟಿ, ರದ್ದುಗೊಳಿಸುವಿಕೆ).

ಕಾರ್ಯಗಳನ್ನು `A2ATaskManager` ಮೂಲಕ ಟ್ರ್ಯಾಕ್ ಮಾಡಲಾಗುತ್ತದೆ (`src/lib/a2a/taskManager.ts`, ಡೀಫಾಲ್ಟ್ 5-ನಿಮಿಷದ TTL). ಕೌಶಲ್ಯಗಳನ್ನು `src/lib/a2a/taskExecution.ts` ನಲ್ಲಿರುವ `A2A_SKILL_HANDLERS` ಮೂಲಕ ರವಾನಿಸಲಾಗುತ್ತದೆ.

## ಏಜೆಂಟ್ ಅನ್ವೇಷಣೆ

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute ನ ಸಾಮರ್ಥ್ಯಗಳು, ಕೌಶಲ್ಯಗಳು ಮತ್ತು ದೃಢೀಕರಣದ ಅಗತ್ಯಗಳನ್ನು ವಿವರಿಸುವ ಏಜೆಂಟ್ ಕಾರ್ಡ್ ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ.

ಏಜೆಂಟ್ ಕಾರ್ಡ್ನ `version` ಕ್ಷೇತ್ರವನ್ನು `process.env.npm_package_version` ನಿಂದ ಪಡೆಯಲಾಗುತ್ತದೆ (`src/app/.well-known/agent.json/route.ts:13` ನೋಡಿ), ಆದ್ದರಿಂದ ಅದು ಪ್ರತಿ ಬಿಡುಗಡೆಯಲ್ಲೂ `package.json` ಜೊತೆಗೆ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸಿಂಕ್ ಆಗಿರುತ್ತದೆ.

---

## ದೃಢೀಕರಣ

ಎಲ್ಲಾ `/a2a` ವಿನಂತಿಗಳಿಗೆ `Authorization` ಹೆಡರ್ ಮೂಲಕ API ಕೀ ಅಗತ್ಯವಿದೆ:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

ಸರ್ವರ್ನಲ್ಲಿ ಯಾವುದೇ API ಕೀ ಕಾನ್ಫಿಗರ್ ಮಾಡದಿದ್ದರೆ, ದೃಢೀಕರಣವನ್ನು ಬೈಪಾಸ್ ಮಾಡಲಾಗುತ್ತದೆ.

## ಸಕ್ರಿಯಗೊಳಿಸುವಿಕೆ

A2A ಅನ್ನು **Endpoints → A2A** ಟಾಗಲ್ ಮೂಲಕ ನಿಯಂತ್ರಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಡೀಫಾಲ್ಟ್ ಆಗಿ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ. ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿದಾಗ,
`GET /api/a2a/status` ಎಂಬುದು `status: "disabled"` ಮತ್ತು `online: false` ಎಂದು ವರದಿ ಮಾಡುತ್ತದೆ; `POST /a2a` ಗೆ ಮಾಡುವ JSON-RPC ಕರೆಗಳು
JSON-RPC ದೋಷ ಕೋಡ್ `-32000` ಜೊತೆಗೆ HTTP 503 ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತವೆ.

---

## JSON-RPC 2.0 ವಿಧಾನಗಳು

### `message/send` — ಸಮಕಾಲಿಕ ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ

ಕೌಶಲ್ಯಕ್ಕೆ ಸಂದೇಶವನ್ನು ಕಳುಹಿಸಿ, ಸಂಪೂರ್ಣ ಪ್ರತಿಕ್ರಿಯೆಗಾಗಿ ಕಾಯುತ್ತದೆ.

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

**ಪ್ರತಿಕ್ರಿಯೆ:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "cost_envelope": {
        "estimated": 0.005,
        "actual": 0.003,
        "currency": "USD"
      },
      "resilience_trace": [
        {
          "event": "primary_selected",
          "provider": "anthropic",
          "timestamp": "..."
        }
      ],
      "policy_verdict": {
        "allowed": true,
        "reason": "within budget and quota limits"
      }
    }
  }
}
```

### `message/stream` — SSE ಸ್ಟ್ರೀಮಿಂಗ್

`message/send` ನಂತೆಯೇ ಇರುತ್ತದೆ, ಆದರೆ ನೈಜ-ಸಮಯದ ಸ್ಟ್ರೀಮಿಂಗ್ಗಾಗಿ ಸರ್ವರ್-ಸೆಂಟ್ ಈವೆಂಟ್ಗಳನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ.

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**SSE ಈವೆಂಟ್ಗಳು:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — ಕಾರ್ಯದ ಸ್ಥಿತಿಯನ್ನು ವಿಚಾರಿಸಿ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — ಕಾರ್ಯವನ್ನು ರದ್ದುಗೊಳಿಸಿ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## ಲಭ್ಯವಿರುವ ಕೌಶಲ್ಯಗಳು

OmniRoute, `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` ನಲ್ಲಿ ಸಂಯೋಜಿಸಲಾದ 6 A2A ಕೌಶಲ್ಯಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ. ಪ್ರತಿಯೊಂದು ಕೌಶಲ್ಯ ಮಾಡ್ಯೂಲ್ `src/lib/a2a/skills/` ನಲ್ಲಿ ಇರುತ್ತದೆ.

| ಕೌಶಲ್ಯ                    | ID                   | ವಿವರಣೆ                                                                                                                                                                  | ಟ್ಯಾಗ್ಗಳು                      | ಉದಾಹರಣೆಗಳು                                      |
| :------------------------ | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------- | :---------------------------------------------- |
| ಸ್ಮಾರ್ಟ್ ರೂಟಿಂಗ್          | `smart-routing`      | OmniRoute ನ combo ಎಂಜಿನ್ + ಸ್ಕೋರಿಂಗ್ ಬಳಸಿ, ಅತ್ಯುತ್ತಮ provider/combo ಮೂಲಕ prompt ಅನ್ನು ರೂಟ್ ಮಾಡುತ್ತದೆ                                                                    | ರೂಟಿಂಗ್, ಪ್ರೊವೈಡರ್ಗಳು          | "ಈ prompt ಅನ್ನು ಅತ್ಯುತ್ತಮ model ಮೂಲಕ ರೂಟ್ ಮಾಡಿ" |
| ಕೋಟಾ ನಿರ್ವಹಣೆ             | `quota-management`   | ಪ್ರತಿ ಪ್ರೊವೈಡರ್ನ ಕೋಟಾ ಸ್ಥಿತಿಯನ್ನು ವರದಿ ಮಾಡುತ್ತದೆ ಮತ್ತು ಯಾವಾಗ ನಿಯಂತ್ರಿಸಬೇಕು/ಬದಲಾಯಿಸಬೇಕು ಎಂಬುದನ್ನು ನಿರ್ಧರಿಸಲು ಕರೆ ಮಾಡುವವರಿಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ                               | ಕೋಟಾ, ಪ್ರೊವೈಡರ್ಗಳು             | "anthropic ಗಾಗಿ ಕೋಟಾ ಪರಿಶೀಲಿಸಿ"                 |
| ಪ್ರೊವೈಡರ್ ಅನ್ವೇಷಣೆ        | `provider-discovery` | ಸಾಮರ್ಥ್ಯಗಳು, ಉಚಿತ-ಶ್ರೇಣಿ ಫ್ಲ್ಯಾಗ್ಗಳು ಮತ್ತು OAuth ಸ್ಥಿತಿಯೊಂದಿಗೆ ಸ್ಥಾಪಿಸಲಾದ ಪ್ರೊವೈಡರ್ಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡುತ್ತದೆ                                                               | ಪ್ರೊವೈಡರ್ಗಳು, ಅನ್ವೇಷಣೆ         | "ಯಾವ ಪ್ರೊವೈಡರ್ಗಳು ಲಭ್ಯವಿವೆ?"                    |
| ವೆಚ್ಚ ವಿಶ್ಲೇಷಣೆ           | `cost-analysis`      | ಕ್ಯಾಟಲಾಗ್ + ಇತ್ತೀಚಿನ ಬಳಕೆಯನ್ನು ಆಧರಿಸಿ ವಿನಂತಿ/ಸಂಭಾಷಣೆಯ ವೆಚ್ಚವನ್ನು ಅಂದಾಜಿಸುತ್ತದೆ                                                                                          | ವೆಚ್ಚ, ಬಳಕೆ                    | "ಈ ಸಂಭಾಷಣೆಯ ವೆಚ್ಚವನ್ನು ಅಂದಾಜಿಸಿ"                |
| ಆರೋಗ್ಯ ವರದಿ               | `health-report`      | ಪ್ರತಿ ಪ್ರೊವೈಡರ್ಗೆ circuit breaker, cooldown ಮತ್ತು lockout ಸ್ಥಿತಿಯನ್ನು ಒಟ್ಟುಗೂಡಿಸುತ್ತದೆ                                                                                  | ಆರೋಗ್ಯ, ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವ        | "ಎಲ್ಲಾ ಪ್ರೊವೈಡರ್ಗಳ ಆರೋಗ್ಯ ಸ್ಥಿತಿಯನ್ನು ತೋರಿಸಿ"   |
| ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ | `list-capabilities`  | ಸಂದರ್ಭ ಸೇರಿಸುವಿಕೆಗಾಗಿ raw SKILL.md URL ಗಳೊಂದಿಗೆ ಸಂಪೂರ್ಣ 45-ನಮೂದುಗಳ Agent Skills ಕ್ಯಾಟಲಾಗ್ ಅನ್ನು (23 API + 21 CLI + 1 ಕಾನ್ಫಿಗರೇಶನ್) markdown ಕೋಷ್ಟಕವಾಗಿ ಹಿಂತಿರುಗಿಸುತ್ತದೆ | ಕ್ಯಾಟಲಾಗ್, ಅನ್ವೇಷಣೆ, ಕೌಶಲ್ಯಗಳು | "ಎಲ್ಲಾ OmniRoute ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ"     |

> Agent Card ಅನ್ನು ಚಾಲ್ತಿಯಲ್ಲಿರುವ 352-ಪ್ರೊವೈಡರ್ ಕ್ಯಾಟಲಾಗ್ಗೆ ಹೊಂದಿಕೆಯಾಗುವಂತೆ ಇರಿಸಬೇಕು; ಪ್ರೊವೈಡರ್ ಸಂಖ್ಯೆಗಳು ಮತ್ತು ಉಚಿತ/ದೃಢೀಕರಣ-ರಹಿತ metadata ಅನ್ನು runtime registry ಯಿಂದ ಪಡೆಯಲಾಗುತ್ತದೆ.

### `list-capabilities` ಕೌಶಲ್ಯದ ವಿವರ

API ಕರೆಗಳನ್ನು ಕಳುಹಿಸುವ ಮೊದಲು OmniRoute ಏನನ್ನು ಒದಗಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ಕಂಡುಹಿಡಿಯಬೇಕಾದ ಬಾಹ್ಯ ಏಜೆಂಟ್ಗಳಿಗೆ `list-capabilities` ಕೌಶಲ್ಯವು ವಿಶೇಷವಾಗಿ ಉಪಯುಕ್ತವಾಗಿದೆ. ಇದು ರಚನಾತ್ಮಕ markdown ಕೋಷ್ಟಕ artifact ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ:

```
| ID | ಹೆಸರು | ವರ್ಗ | ಕ್ಷೇತ್ರ | ಎಂಡ್ಪಾಯಿಂಟ್ಗಳು/ಕಮಾಂಡ್ಗಳು | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | ದೃಢೀಕರಣ ಮತ್ತು ಸೆಷನ್ಗಳು | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

ಪ್ರತಿಯೊಂದು ಸಾಲು `rawUrl` ಕಾಲಮ್ ಅನ್ನು ಒಳಗೊಂಡಿರುವುದರಿಂದ, ಏಜೆಂಟ್ಗಳು ಸಂಪೂರ್ಣ SKILL.md ಅನ್ನು ತಕ್ಷಣವೇ ಪಡೆಯಬಹುದು. `metadata.totalSkills` ಕ್ಷೇತ್ರವು ಕ್ಯಾಟಲಾಗ್ ಗಾತ್ರವನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ (ಇಂದು 45). ಅನುಷ್ಠಾನ: `src/lib/a2a/skills/listCapabilities.ts`. [AGENT-SKILLS.md](./AGENT-SKILLS.md) ಅನ್ನೂ ನೋಡಿ.

---

## REST API (ಪೂರಕ)

JSON-RPC ಎಂಡ್ಪಾಯಿಂಟ್ `/a2a` ಅಂಗೀಕೃತ A2A ಪ್ರವೇಶ ಬಿಂದುವಾಗಿದೆ. ಕೆಳಗಿನ REST ಎಂಡ್ಪಾಯಿಂಟ್ಗಳು ಡ್ಯಾಶ್ಬೋರ್ಡ್ಗಳು ಮತ್ತು ಬಾಹ್ಯ ಪರಿಕರಗಳಿಗೆ ಪೂರಕ ಪ್ರವೇಶವನ್ನು ಒದಗಿಸುತ್ತವೆ:

| ಎಂಡ್ಪಾಯಿಂಟ್                  | ವಿಧಾನ | ವಿವರಣೆ                                                    | ದೃಢೀಕರಣ                                         |
| :--------------------------- | :---- | :-------------------------------------------------------- | :---------------------------------------------- |
| `/api/a2a/status`            | GET   | ಸರ್ವರ್ ಸ್ಥಿತಿ, ನೋಂದಾಯಿತ ಕೌಶಲ್ಯಗಳು                         | (ಸಾರ್ವಜನಿಕ)                                     |
| `/api/a2a/tasks`             | GET   | ಫಿಲ್ಟರ್ಗಳೊಂದಿಗೆ ಕಾರ್ಯಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ                    | ನಿರ್ವಹಣೆ                                        |
| `/api/a2a/tasks/[id]`        | GET   | ID ಮೂಲಕ ಕಾರ್ಯವನ್ನು ಪಡೆಯಿರಿ                                | ನಿರ್ವಹಣೆ                                        |
| `/api/a2a/tasks/[id]/cancel` | POST  | ಚಾಲನೆಯಲ್ಲಿರುವ ಕಾರ್ಯವನ್ನು ರದ್ದುಗೊಳಿಸಿ                      | ನಿರ್ವಹಣೆ                                        |
| `/.well-known/agent.json`    | GET   | ಏಜೆಂಟ್ ಕಾರ್ಡ್ (A2A ಅನ್ವೇಷಣೆ)                              | (ಸಾರ್ವಜನಿಕ, 3600s ವರೆಗೆ ಕ್ಯಾಶ್ ಮಾಡಲಾಗಿದೆ)       |
| `/api/a2a/tasks`             | POST  | OmniConductor ಫ್ಲೀಟ್ಗೆ ಒಳಬರುವ ನಿಯೋಜನೆ (Conductor PRD RF5) | Bearer ಮತ್ತು `OMNIROUTE_API_KEY` + `a2aEnabled` |

**ಒಳಬರುವ Conductor ನಿಯೋಜನೆ (`POST /api/a2a/tasks`):** ಬಾಹ್ಯ A2A ಏಜೆಂಟ್ಗಳು OmniRoute ಮೂಲಕ ಕೋಡಿಂಗ್ ಕೆಲಸವನ್ನು OmniConductor ಫ್ಲೀಟ್ಗೆ ನಿಯೋಜಿಸುತ್ತವೆ. ಬಾಡಿ: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — Conductor ಫ್ಲೀಟ್ ಕೌಶಲ್ಯಗಳನ್ನು (ಏಜೆಂಟ್ ಕಾರ್ಡ್ನಲ್ಲಿ ಪ್ರಕಟಿಸಲಾದವುಗಳನ್ನು) ಮಾತ್ರ ನಿಯೋಜಿಸಬಹುದು; `metadata.conductor.repo.url` ಅಗತ್ಯವಿದೆ (ಫ್ಲೀಟ್ git ರೆಪೊಗಳಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ). ಈ ರೂಟ್ ಸರ್ವರ್-ಸೈಡ್ `CONDUCTOR_ORCHESTRATOR_TOKEN` (`CONDUCTOR_HUB_TOKEN` ಫಾಲ್ಬ್ಯಾಕ್) ಬಳಸಿಕೊಂಡು ಹಬ್ನ `POST /v1/tasks` ಗೆ ಅನುವಾದಿಸುತ್ತದೆ ಮತ್ತು `201 { conductor_task_id, state: "submitted" }` ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ; ಕಾರ್ಯದ ಸ್ಥಿತಿಗಳು SSE→A2A ಮಿರರ್ (RF1) ಮೂಲಕ ಹಿಂದಿರುಗುತ್ತವೆ ಮತ್ತು `GET /api/a2a/tasks?skill=conductor` ಮೂಲಕ ಗೋಚರಿಸುತ್ತವೆ.

---

## ಹೊಸ ಕೌಶಲ್ಯವನ್ನು ಸೇರಿಸುವುದು

1. **ಕೌಶಲ್ಯ ಫೈಲ್ ರಚಿಸಿ:** `src/lib/a2a/skills/<your-skill>.ts`

   `(task: A2ATask) => Promise<{ artifacts, metadata }>` ಎಂಬ async ಫಂಕ್ಷನ್ ಅನ್ನು ಎಕ್ಸ್ಪೋರ್ಟ್ ಮಾಡಿ. `smartRouting.ts` ನಂತಹ ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಕೌಶಲ್ಯಗಳ ಸ್ವರೂಪವನ್ನು ಅನುಸರಿಸಿ.

2. **ಹ್ಯಾಂಡ್ಲರ್ ನೋಂದಾಯಿಸಿ:** `src/lib/a2a/taskExecution.ts` ನಲ್ಲಿ, `A2A_SKILL_HANDLERS` ಗೆ ಒಂದು ನಮೂದನ್ನು ಸೇರಿಸಿ:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಕೌಶಲ್ಯಗಳು
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **ಏಜೆಂಟ್ ಕಾರ್ಡ್ನಲ್ಲಿ ಬಹಿರಂಗಪಡಿಸಿ:** `src/app/.well-known/agent.json/route.ts` ನಲ್ಲಿ, `skills` ಅರೇಗೆ ಸೇರಿಸಿ:

   ```json
   {
     "id": "your-skill",
     "name": "ನಿಮ್ಮ ಕೌಶಲ್ಯ",
     "description": "ಸಂಕ್ಷಿಪ್ತ, ಉದ್ದೇಶ-ಕೇಂದ್ರಿತ ವಿವರಣೆ",
     "tags": ["ರೂಟಿಂಗ್", "ಕೋಟಾ"],
     "examples": ["ನೈಸರ್ಗಿಕ ಭಾಷೆಯ ಮಾದರಿ ಆಹ್ವಾನ"]
   }
   ```

4. **ಪರೀಕ್ಷೆಗಳನ್ನು ಬರೆಯಿರಿ:** `tests/unit/a2a-<your-skill>.test.ts`. ಯಶಸ್ವಿ ಮಾರ್ಗ + ದೋಷದ ಮಾರ್ಗವನ್ನು ಒಳಗೊಳ್ಳಿ.

5. **ದಾಖಲಿಸಿ:** ಈ ಫೈಲ್ನ `Available Skills` ಕೋಷ್ಟಕದಲ್ಲಿ ಹೊಸ ಕೌಶಲ್ಯವನ್ನು ದಾಖಲಿಸಿ.

---

## ಕಾರ್ಯದ TTL

ಕಾರ್ಯಗಳು `ttlMinutes` ನಂತರ (ಡೀಫಾಲ್ಟ್ ಆಗಿ 5 ನಿಮಿಷ) ಅವಧಿ ಮೀರುತ್ತವೆ — ಇದನ್ನು `src/lib/a2a/taskManager.ts:82` ನಲ್ಲಿರುವ `A2ATaskManager` ಕನ್ಸ್ಟ್ರಕ್ಟರ್ನಲ್ಲಿ ಕಾನ್ಫಿಗರ್ ಮಾಡಲಾಗಿದೆ. ಕಸ್ಟಮೈಸ್ ಮಾಡಲು, `A2ATaskManager` ಇನ್ಸ್ಟಾನ್ಷಿಯೇಷನ್ ಅನ್ನು ಫೋರ್ಕ್ ಮಾಡಿ ಮತ್ತು ಬೇರೆ ಮೌಲ್ಯವನ್ನು ಪಾಸ್ ಮಾಡಿ (ಉದಾ., 15 ನಿಮಿಷಗಳ TTL ಗಾಗಿ `new A2ATaskManager(15)`). ಹಿನ್ನೆಲೆ ಇಂಟರ್ವಲ್ ಪ್ರತಿ 60 ಸೆಕೆಂಡುಗಳಿಗೆ ಅವಧಿ ಮೀರಿದ ಕಾರ್ಯಗಳನ್ನು ತೆರವುಗೊಳಿಸುತ್ತದೆ.

---

## ಕಾರ್ಯದ ಜೀವನಚಕ್ರ

```
ಸಲ್ಲಿಸಲಾಗಿದೆ → ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆ → ಪೂರ್ಣಗೊಂಡಿದೆ
                                  → ವಿಫಲವಾಗಿದೆ
                                  → ರದ್ದುಗೊಂಡಿದೆ
```

- ಕಾರ್ಯಗಳು ಡೀಫಾಲ್ಟ್ ಆಗಿ 5 ನಿಮಿಷಗಳ ನಂತರ ಅವಧಿ ಮೀರುತ್ತವೆ ([ಕಾರ್ಯದ TTL](#task-ttl) ನೋಡಿ)
- ಅಂತಿಮ ಸ್ಥಿತಿಗಳು: `completed`, `failed`, `cancelled`
- ಈವೆಂಟ್ ಲಾಗ್ ಪ್ರತಿಯೊಂದು ಸ್ಥಿತಿ ಪರಿವರ್ತನೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡುತ್ತದೆ

---

## ದೋಷ ಕೋಡ್ಗಳು

| ಕೋಡ್   | ಅರ್ಥ                            |
| :----- | :------------------------------ |
| -32700 | ಪಾರ್ಸ್ ದೋಷ (ಅಮಾನ್ಯ JSON)        |
| -32600 | ಅಮಾನ್ಯ ವಿನಂತಿ / ಅನುಮತಿ ಇಲ್ಲ     |
| -32601 | ವಿಧಾನ ಅಥವಾ ಕೌಶಲ್ಯ ಕಂಡುಬಂದಿಲ್ಲ   |
| -32602 | ಅಮಾನ್ಯ ಪ್ಯಾರಾಮೀಟರ್ಗಳು           |
| -32603 | ಆಂತರಿಕ ದೋಷ                      |
| -32000 | A2A ಎಂಡ್ಪಾಯಿಂಟ್ ನಿಷ್ಕ್ರಿಯವಾಗಿದೆ |

---

## ಏಕೀಕರಣದ ಉದಾಹರಣೆಗಳು

### Python (requests)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (fetch)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
