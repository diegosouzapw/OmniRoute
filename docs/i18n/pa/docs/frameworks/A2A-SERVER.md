# OmniRoute A2A Server Documentation (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — ਇੱਕ ਬੁੱਧੀਮਾਨ ਰੂਟਿੰਗ ਏਜੰਟ ਵਜੋਂ OmniRoute

A2A ਇੰਟਰਫੇਸ ਦੇ ਦੋ ਰੂਪ ਹਨ:

- **JSON-RPC 2.0** `POST /a2a` ਉੱਤੇ (ਮਿਆਰੀ ਪ੍ਰਵੇਸ਼ ਬਿੰਦੂ, ਜੋ `src/app/a2a/route.ts` ਵਿੱਚ ਪਰਿਭਾਸ਼ਿਤ ਹੈ)।
- **REST** ਡੈਸ਼ਬੋਰਡਾਂ ਅਤੇ ਟੂਲਿੰਗ ਲਈ `/api/a2a/*` ਦੇ ਅਧੀਨ (ਸਥਿਤੀ, ਕਾਰਜ ਸੂਚੀ, ਰੱਦ ਕਰਨਾ)।

ਕਾਰਜਾਂ ਨੂੰ `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, ਮੂਲ 5-ਮਿੰਟ TTL) ਦੁਆਰਾ ਟਰੈਕ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। ਹੁਨਰਾਂ ਨੂੰ `src/lib/a2a/taskExecution.ts` ਵਿੱਚ ਮੌਜੂਦ `A2A_SKILL_HANDLERS` ਰਾਹੀਂ ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ।

## ਏਜੰਟ ਖੋਜ

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute ਦੀਆਂ ਸਮਰੱਥਾਵਾਂ, ਸਕਿੱਲਾਂ ਅਤੇ ਪ੍ਰਮਾਣੀਕਰਨ ਲੋੜਾਂ ਦਾ ਵੇਰਵਾ ਦੇਣ ਵਾਲਾ Agent Card ਵਾਪਸ ਕਰਦਾ ਹੈ।

Agent Card ਦਾ `version` ਫੀਲਡ `process.env.npm_package_version` ਤੋਂ ਲਿਆ ਜਾਂਦਾ ਹੈ (`src/app/.well-known/agent.json/route.ts:13` ਵੇਖੋ), ਇਸ ਲਈ ਇਹ ਹਰ ਰਿਲੀਜ਼ ਉੱਤੇ `package.json` ਨਾਲ ਆਪਣੇ-ਆਪ ਸਮਕਾਲੀ ਰਹਿੰਦਾ ਹੈ।

---

## ਪ੍ਰਮਾਣੀਕਰਨ

ਸਾਰੀਆਂ `/a2a` ਬੇਨਤੀਆਂ ਲਈ `Authorization` ਹੈਡਰ ਰਾਹੀਂ ਇੱਕ API ਕੁੰਜੀ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

ਜੇ ਸਰਵਰ ਉੱਤੇ ਕੋਈ API ਕੁੰਜੀ ਸੰਰਚਿਤ ਨਹੀਂ ਹੈ, ਤਾਂ ਪ੍ਰਮਾਣੀਕਰਨ ਨੂੰ ਬਾਈਪਾਸ ਕਰ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ।

## ਸਮਰੱਥਕਰਨ

A2A ਨੂੰ **Endpoints → A2A** ਟੌਗਲ ਦੁਆਰਾ ਨਿਯੰਤਰਿਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਅਤੇ ਇਹ ਡਿਫੌਲਟ ਤੌਰ ਉੱਤੇ ਅਸਮਰੱਥ ਹੁੰਦਾ ਹੈ। ਅਸਮਰੱਥ ਹੋਣ ਉੱਤੇ,
`GET /api/a2a/status` `status: "disabled"` ਅਤੇ `online: false` ਰਿਪੋਰਟ ਕਰਦਾ ਹੈ; `POST /a2a` ਲਈ JSON-RPC ਕਾਲਾਂ
JSON-RPC ਗਲਤੀ ਕੋਡ `-32000` ਨਾਲ HTTP 503 ਵਾਪਸ ਕਰਦੀਆਂ ਹਨ।

---

## JSON-RPC 2.0 ਵਿਧੀਆਂ

### `message/send` — ਸਮਕਾਲੀ ਕਾਰਜ-ਨਿਰਵਹਿਣ

ਇੱਕ ਸਕਿੱਲ ਨੂੰ ਸੁਨੇਹਾ ਭੇਜਦਾ ਹੈ ਅਤੇ ਪੂਰੇ ਜਵਾਬ ਦੀ ਉਡੀਕ ਕਰਦਾ ਹੈ।

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

**ਜਵਾਬ:**

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

### `message/stream` — SSE ਸਟ੍ਰੀਮਿੰਗ

`message/send` ਵਾਂਗ ਹੀ ਹੈ, ਪਰ ਰੀਅਲ-ਟਾਈਮ ਸਟ੍ਰੀਮਿੰਗ ਲਈ Server-Sent Events ਵਾਪਸ ਕਰਦਾ ਹੈ।

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

**SSE ਇਵੈਂਟ:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — ਟਾਸਕ ਸਥਿਤੀ ਬਾਰੇ ਪੁੱਛਗਿੱਛ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — ਇੱਕ ਟਾਸਕ ਰੱਦ ਕਰੋ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## ਉਪਲਬਧ ਸਕਿਲਾਂ

OmniRoute `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` ਵਿੱਚ ਜੋੜੀਆਂ ਗਈਆਂ 6 A2A ਸਕਿਲਾਂ ਉਪਲਬਧ ਕਰਵਾਉਂਦਾ ਹੈ। ਹਰੇਕ ਸਕਿਲ ਮੋਡੀਊਲ `src/lib/a2a/skills/` ਵਿੱਚ ਮੌਜੂਦ ਹੈ।

| ਸਕਿਲ              | ID                   | ਵੇਰਵਾ                                                                                                                                               | ਟੈਗ                  | ਉਦਾਹਰਨਾਂ                                        |
| :---------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- | :---------------------------------------------- |
| ਸਮਾਰਟ ਰੂਟਿੰਗ      | `smart-routing`      | OmniRoute ਦੇ ਕੰਬੋ ਇੰਜਣ + ਸਕੋਰਿੰਗ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕਿਸੇ ਪ੍ਰੌਂਪਟ ਨੂੰ ਸਭ ਤੋਂ ਢੁਕਵੇਂ ਪ੍ਰਦਾਤਾ/ਕੰਬੋ ਰਾਹੀਂ ਰੂਟ ਕਰਦਾ ਹੈ                                        | ਰੂਟਿੰਗ, ਪ੍ਰਦਾਤਾ      | "ਇਸ ਪ੍ਰੌਂਪਟ ਨੂੰ ਸਭ ਤੋਂ ਵਧੀਆ ਮਾਡਲ ਰਾਹੀਂ ਰੂਟ ਕਰੋ" |
| ਕੋਟਾ ਪ੍ਰਬੰਧਨ      | `quota-management`   | ਹਰੇਕ ਪ੍ਰਦਾਤਾ ਲਈ ਕੋਟੇ ਦੀ ਸਥਿਤੀ ਦੀ ਰਿਪੋਰਟ ਦਿੰਦਾ ਹੈ ਅਤੇ ਕਾਲਰਾਂ ਨੂੰ ਇਹ ਫ਼ੈਸਲਾ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ ਕਿ ਕਦੋਂ ਥਰੌਟਲ/ਸਵਿੱਚ ਕਰਨਾ ਹੈ                          | ਕੋਟਾ, ਪ੍ਰਦਾਤਾ        | "anthropic ਲਈ ਕੋਟਾ ਜਾਂਚੋ"                       |
| ਪ੍ਰਦਾਤਾ ਖੋਜ       | `provider-discovery` | ਸਮਰੱਥਾਵਾਂ, ਮੁਫ਼ਤ-ਟੀਅਰ ਫਲੈਗਾਂ ਅਤੇ OAuth ਸਥਿਤੀ ਸਮੇਤ ਇੰਸਟਾਲ ਕੀਤੇ ਪ੍ਰਦਾਤਿਆਂ ਦੀ ਸੂਚੀ ਦਿੰਦਾ ਹੈ                                                            | ਪ੍ਰਦਾਤਾ, ਖੋਜ         | "ਕਿਹੜੇ ਪ੍ਰਦਾਤਾ ਉਪਲਬਧ ਹਨ?"                       |
| ਲਾਗਤ ਵਿਸ਼ਲੇਸ਼ਣ    | `cost-analysis`      | ਕੈਟਾਲਾਗ + ਹਾਲੀਆ ਵਰਤੋਂ ਦੇ ਆਧਾਰ 'ਤੇ ਕਿਸੇ ਬੇਨਤੀ/ਗੱਲਬਾਤ ਦੀ ਲਾਗਤ ਦਾ ਅਨੁਮਾਨ ਲਗਾਉਂਦਾ ਹੈ                                                                    | ਲਾਗਤ, ਵਰਤੋਂ          | "ਇਸ ਗੱਲਬਾਤ ਦੀ ਲਾਗਤ ਦਾ ਅਨੁਮਾਨ ਲਗਾਓ"              |
| ਸਿਹਤ ਰਿਪੋਰਟ       | `health-report`      | ਹਰੇਕ ਪ੍ਰਦਾਤਾ ਲਈ ਸਰਕਟ ਬ੍ਰੇਕਰ, ਕੂਲਡਾਊਨ ਅਤੇ ਲੌਕਆਊਟ ਸਥਿਤੀ ਨੂੰ ਇਕੱਠਾ ਕਰਦਾ ਹੈ                                                                             | ਸਿਹਤ, ਲਚਕੀਲਾਪਣ       | "ਸਾਰੇ ਪ੍ਰਦਾਤਿਆਂ ਦੀ ਸਿਹਤ ਸਥਿਤੀ ਦਿਖਾਓ"            |
| ਸਮਰੱਥਾਵਾਂ ਦੀ ਸੂਚੀ | `list-capabilities`  | ਸੰਦਰਭ ਇੰਜੈਕਸ਼ਨ ਲਈ ਕੱਚੇ SKILL.md URL ਸਮੇਤ ਪੂਰਾ 45-ਐਂਟਰੀਆਂ ਵਾਲਾ Agent Skills ਕੈਟਾਲਾਗ (23 API + 21 CLI + 1 ਸੰਰਚਨਾ) ਇੱਕ ਮਾਰਕਡਾਊਨ ਟੇਬਲ ਵਜੋਂ ਵਾਪਸ ਕਰਦਾ ਹੈ | ਕੈਟਾਲਾਗ, ਖੋਜ, ਸਕਿਲਾਂ | "OmniRoute ਦੀਆਂ ਸਾਰੀਆਂ ਸਮਰੱਥਾਵਾਂ ਦੀ ਸੂਚੀ ਦਿਓ"   |

> Agent Card ਨੂੰ ਲਾਈਵ 352-ਪ੍ਰਦਾਤਾ ਕੈਟਾਲਾਗ ਨਾਲ ਇਕਸਾਰ ਰੱਖਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ; ਪ੍ਰਦਾਤਿਆਂ ਦੀ ਗਿਣਤੀ ਅਤੇ ਮੁਫ਼ਤ/ਬਿਨਾਂ-ਪ੍ਰਮਾਣੀਕਰਨ ਮੈਟਾਡਾਟਾ ਰਨਟਾਈਮ ਰਜਿਸਟਰੀ ਤੋਂ ਪ੍ਰਾਪਤ ਹੁੰਦੇ ਹਨ।

### `list-capabilities` ਸਕਿਲ ਦਾ ਵੇਰਵਾ

`list-capabilities` ਸਕਿਲ ਉਹਨਾਂ ਬਾਹਰੀ ਏਜੰਟਾਂ ਲਈ ਖ਼ਾਸ ਤੌਰ 'ਤੇ ਲਾਭਦਾਇਕ ਹੈ, ਜਿਨ੍ਹਾਂ ਨੂੰ API ਕਾਲਾਂ ਭੇਜਣ ਤੋਂ ਪਹਿਲਾਂ ਇਹ ਪਤਾ ਲਗਾਉਣ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ ਕਿ OmniRoute ਕੀ ਉਪਲਬਧ ਕਰਵਾਉਂਦਾ ਹੈ। ਇਹ ਇੱਕ ਸੰਰਚਿਤ ਮਾਰਕਡਾਊਨ ਟੇਬਲ ਆਰਟੀਫੈਕਟ ਵਾਪਸ ਕਰਦਾ ਹੈ:

```
| ID | ਨਾਮ | ਸ਼੍ਰੇਣੀ | ਖੇਤਰ | ਐਂਡਪੌਇੰਟ/ਕਮਾਂਡਾਂ | ਕੱਚਾ URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | ਪ੍ਰਮਾਣੀਕਰਨ ਅਤੇ ਸੈਸ਼ਨ | api | ਪ੍ਰਮਾਣੀਕਰਨ | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

ਹਰੇਕ ਕਤਾਰ ਵਿੱਚ `rawUrl` ਕਾਲਮ ਸ਼ਾਮਲ ਹੁੰਦਾ ਹੈ, ਤਾਂ ਜੋ ਏਜੰਟ ਤੁਰੰਤ ਪੂਰੀ SKILL.md ਪ੍ਰਾਪਤ ਕਰ ਸਕਣ। `metadata.totalSkills` ਫ਼ੀਲਡ ਕੈਟਾਲਾਗ ਦੇ ਆਕਾਰ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ (ਅੱਜ 45)। ਇੰਪਲੀਮੈਂਟੇਸ਼ਨ: `src/lib/a2a/skills/listCapabilities.ts`। [AGENT-SKILLS.md](./AGENT-SKILLS.md) ਵੀ ਵੇਖੋ।

---

## REST API (ਸਹਾਇਕ)

JSON-RPC ਐਂਡਪੌਇੰਟ `/a2a` ਪ੍ਰਮਾਣਿਕ A2A ਪ੍ਰਵੇਸ਼ ਬਿੰਦੂ ਹੈ। ਹੇਠਾਂ ਦਿੱਤੇ REST ਐਂਡਪੌਇੰਟ ਡੈਸ਼ਬੋਰਡਾਂ ਅਤੇ ਬਾਹਰੀ ਟੂਲਿੰਗ ਲਈ ਸਹਾਇਕ ਪਹੁੰਚ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਨ:

| ਐਂਡਪੌਇੰਟ                     | ਵਿਧੀ | ਵੇਰਵਾ                                                          | ਪ੍ਰਮਾਣੀਕਰਨ                                           |
| :--------------------------- | :--- | :------------------------------------------------------------- | :--------------------------------------------------- |
| `/api/a2a/status`            | GET  | ਸਰਵਰ ਸਥਿਤੀ, ਰਜਿਸਟਰ ਕੀਤੇ ਹੁਨਰ                                   | (ਜਨਤਕ)                                               |
| `/api/a2a/tasks`             | GET  | ਫ਼ਿਲਟਰਾਂ ਨਾਲ ਕਾਰਜਾਂ ਦੀ ਸੂਚੀ                                    | ਪ੍ਰਬੰਧਨ                                              |
| `/api/a2a/tasks/[id]`        | GET  | ID ਰਾਹੀਂ ਕਾਰਜ ਪ੍ਰਾਪਤ ਕਰੋ                                       | ਪ੍ਰਬੰਧਨ                                              |
| `/api/a2a/tasks/[id]/cancel` | POST | ਚੱਲ ਰਿਹਾ ਕਾਰਜ ਰੱਦ ਕਰੋ                                          | ਪ੍ਰਬੰਧਨ                                              |
| `/.well-known/agent.json`    | GET  | ਏਜੰਟ ਕਾਰਡ (A2A ਖੋਜ)                                            | (ਜਨਤਕ, 3600s ਲਈ ਕੈਸ਼ ਕੀਤਾ)                           |
| `/api/a2a/tasks`             | POST | OmniConductor ਫ਼ਲੀਟ ਨੂੰ ਆਉਣ ਵਾਲਾ ਡੈਲੀਗੇਸ਼ਨ (Conductor PRD RF5) | `OMNIROUTE_API_KEY` + `a2aEnabled` ਦੇ ਮੁਕਾਬਲੇ Bearer |

**ਆਉਣ ਵਾਲਾ Conductor ਡੈਲੀਗੇਸ਼ਨ (`POST /api/a2a/tasks`):** ਬਾਹਰੀ A2A ਏਜੰਟ OmniRoute ਰਾਹੀਂ ਕੋਡਿੰਗ ਦਾ ਕੰਮ OmniConductor ਫ਼ਲੀਟ ਨੂੰ ਸੌਂਪਦੇ ਹਨ। ਬਾਡੀ: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — ਸਿਰਫ਼ Conductor ਫ਼ਲੀਟ ਦੇ ਹੁਨਰ (ਜੋ ਏਜੰਟ ਕਾਰਡ ਉੱਤੇ ਘੋਸ਼ਿਤ ਕੀਤੇ ਗਏ ਹਨ) ਹੀ ਸੌਂਪੇ ਜਾ ਸਕਦੇ ਹਨ; `metadata.conductor.repo.url` ਲਾਜ਼ਮੀ ਹੈ (ਫ਼ਲੀਟ git ਰਿਪੋਜ਼ ਉੱਤੇ ਕੰਮ ਕਰਦੀ ਹੈ)। ਇਹ ਰੂਟ ਸਰਵਰ-ਸਾਈਡ `CONDUCTOR_ORCHESTRATOR_TOKEN` (ਫ਼ਾਲਬੈਕ `CONDUCTOR_HUB_TOKEN`) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਹੱਬ ਦੇ `POST /v1/tasks` ਵਿੱਚ ਅਨੁਵਾਦ ਹੁੰਦਾ ਹੈ ਅਤੇ `201 { conductor_task_id, state: "submitted" }` ਵਾਪਸ ਕਰਦਾ ਹੈ; ਕਾਰਜ ਦੀਆਂ ਸਥਿਤੀਆਂ SSE→A2A ਮਿਰਰ (RF1) ਰਾਹੀਂ ਵਾਪਸ ਪ੍ਰਵਾਹਿਤ ਹੁੰਦੀਆਂ ਹਨ ਅਤੇ `GET /api/a2a/tasks?skill=conductor` ਰਾਹੀਂ ਦਿਸਦੀਆਂ ਹਨ।

---

## ਨਵਾਂ ਹੁਨਰ ਸ਼ਾਮਲ ਕਰਨਾ

1. **ਹੁਨਰ ਫ਼ਾਈਲ ਬਣਾਓ:** `src/lib/a2a/skills/<your-skill>.ts`

   ਇੱਕ async ਫੰਕਸ਼ਨ `(task: A2ATask) => Promise<{ artifacts, metadata }>` ਐਕਸਪੋਰਟ ਕਰੋ। `smartRouting.ts` ਵਰਗੇ ਮੌਜੂਦਾ ਹੁਨਰਾਂ ਦੀ ਬਣਤਰ ਦੀ ਪਾਲਣਾ ਕਰੋ।

2. **ਹੈਂਡਲਰ ਰਜਿਸਟਰ ਕਰੋ:** `src/lib/a2a/taskExecution.ts` ਵਿੱਚ, `A2A_SKILL_HANDLERS` ਵਿੱਚ ਇੱਕ ਐਂਟਰੀ ਸ਼ਾਮਲ ਕਰੋ:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...ਮੌਜੂਦਾ ਹੁਨਰ
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **ਏਜੰਟ ਕਾਰਡ ਵਿੱਚ ਪ੍ਰਗਟ ਕਰੋ:** `src/app/.well-known/agent.json/route.ts` ਵਿੱਚ, `skills` ਐਰੇ ਵਿੱਚ ਜੋੜੋ:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **ਟੈਸਟ ਲਿਖੋ:** `tests/unit/a2a-<your-skill>.test.ts`। ਸਫਲਤਾ ਮਾਰਗ + ਤਰੁੱਟੀ ਮਾਰਗ ਨੂੰ ਕਵਰ ਕਰੋ।

5. **ਇਸ ਫ਼ਾਈਲ ਦੀ `Available Skills` ਸਾਰਣੀ ਵਿੱਚ ਨਵੇਂ ਹੁਨਰ ਦਾ ਦਸਤਾਵੇਜ਼ੀਕਰਨ ਕਰੋ।**

---

## ਟਾਸਕ TTL

ਟਾਸਕ `ttlMinutes` (ਡਿਫੌਲਟ 5 ਮਿੰਟ) ਤੋਂ ਬਾਅਦ ਮਿਆਦ ਪੁੱਗ ਜਾਂਦੇ ਹਨ — ਇਸਨੂੰ `src/lib/a2a/taskManager.ts:82` ਵਿੱਚ `A2ATaskManager` ਕੰਸਟਰਕਟਰ ਵਿੱਚ ਸੰਰਚਿਤ ਕੀਤਾ ਗਿਆ ਹੈ। ਇਸਨੂੰ ਅਨੁਕੂਲਿਤ ਕਰਨ ਲਈ, `A2ATaskManager` ਇੰਸਟੈਂਸ਼ੀਏਸ਼ਨ ਨੂੰ ਫੋਰਕ ਕਰੋ ਅਤੇ ਕੋਈ ਵੱਖਰਾ ਮੁੱਲ ਪਾਸ ਕਰੋ (ਉਦਾਹਰਨ ਲਈ, 15-ਮਿੰਟ ਦੀ TTL ਵਾਸਤੇ `new A2ATaskManager(15)`)। ਇੱਕ ਬੈਕਗ੍ਰਾਊਂਡ ਇੰਟਰਵਲ ਹਰ 60 ਸਕਿੰਟਾਂ ਬਾਅਦ ਮਿਆਦ ਪੁੱਗੇ ਟਾਸਕਾਂ ਨੂੰ ਹਟਾਉਂਦਾ ਹੈ।

---

## ਟਾਸਕ ਜੀਵਨ-ਚੱਕਰ

```
ਸਪੁਰਦ ਕੀਤਾ → ਕਾਰਜਸ਼ੀਲ → ਪੂਰਾ ਹੋਇਆ
                       → ਅਸਫਲ
                       → ਰੱਦ ਕੀਤਾ
```

- ਡਿਫੌਲਟ ਤੌਰ 'ਤੇ ਟਾਸਕਾਂ ਦੀ ਮਿਆਦ 5 ਮਿੰਟਾਂ ਬਾਅਦ ਪੁੱਗ ਜਾਂਦੀ ਹੈ ([ਟਾਸਕ TTL](#task-ttl) ਵੇਖੋ)
- ਅੰਤਿਮ ਸਥਿਤੀਆਂ: `completed`, `failed`, `cancelled`
- ਇਵੈਂਟ ਲੌਗ ਹਰ ਸਥਿਤੀ ਤਬਦੀਲੀ ਨੂੰ ਟਰੈਕ ਕਰਦਾ ਹੈ

---

## ਗਲਤੀ ਕੋਡ

| ਕੋਡ    | ਅਰਥ                              |
| :----- | :------------------------------- |
| -32700 | ਪਾਰਸ ਗਲਤੀ (ਅਵੈਧ JSON)            |
| -32600 | ਅਵੈਧ ਬੇਨਤੀ / ਅਣਅਧਿਕਾਰਤ           |
| -32601 | ਵਿਧੀ ਜਾਂ ਹੁਨਰ ਨਹੀਂ ਮਿਲਿਆ         |
| -32602 | ਅਵੈਧ ਪੈਰਾਮੀਟਰ                    |
| -32603 | ਅੰਦਰੂਨੀ ਗਲਤੀ                     |
| -32000 | A2A ਐਂਡਪੌਇੰਟ ਅਸਮਰੱਥ ਕੀਤਾ ਹੋਇਆ ਹੈ |

---

## ਏਕੀਕਰਨ ਉਦਾਹਰਨਾਂ

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
