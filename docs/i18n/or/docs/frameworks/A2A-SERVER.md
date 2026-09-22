# OmniRoute A2A Server Documentation (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — ଏକ ବୁଦ୍ଧିମାନ ରାଉଟିଂ ଏଜେଣ୍ଟ ଭାବରେ OmniRoute

A2A ଇଣ୍ଟରଫେସ୍ର ଦୁଇଟି ରୂପ ଅଛି:

- **JSON-RPC 2.0** `POST /a2a`ରେ (ମାନକ ପ୍ରବେଶ ବିନ୍ଦୁ, `src/app/a2a/route.ts`ରେ ପରିଭାଷିତ)।
- ଡ୍ୟାଶବୋର୍ଡ ଏବଂ ଟୁଲିଂ ପାଇଁ `/api/a2a/*` ଅଧୀନରେ **REST** (ସ୍ଥିତି, କାର୍ଯ୍ୟ ତାଲିକା, ବାତିଲ୍)।

କାର୍ଯ୍ୟଗୁଡ଼ିକୁ `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, ଡିଫଲ୍ଟ 5-ମିନିଟ୍ TTL) ଦ୍ୱାରା ଟ୍ରାକ୍ କରାଯାଏ। `src/lib/a2a/taskExecution.ts`ରେ ଥିବା `A2A_SKILL_HANDLERS` ମାଧ୍ୟମରେ ଦକ୍ଷତାଗୁଡ଼ିକୁ ପ୍ରେରଣ କରାଯାଏ।

## ଏଜେଣ୍ଟ ଆବିଷ୍କାର

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute ର ଦକ୍ଷତା, ସ୍କିଲ୍ ଏବଂ ପ୍ରମାଣୀକରଣ ଆବଶ୍ୟକତା ବର୍ଣ୍ଣନା କରୁଥିବା ଏଜେଣ୍ଟ କାର୍ଡ ଫେରାଇ ଦିଏ।

ଏଜେଣ୍ଟ କାର୍ଡର `version` ଫିଲ୍ଡ `process.env.npm_package_version` ରୁ ଆସିଛି (ଦେଖନ୍ତୁ `src/app/.well-known/agent.json/route.ts:13`), ତେଣୁ ଏହା ପ୍ରତ୍ୟେକ ରିଲିଜ୍ ସହ ସ୍ୱୟଂଚାଳିତ ଭାବରେ `package.json` ସହ ସିଙ୍କ ରହେ।

---

## ପ୍ରମାଣୀକରଣ

ସମସ୍ତ `/a2a` ଅନୁରୋଧଗୁଡ଼ିକ `Authorization` ହେଡର୍ ମାଧ୍ୟମରେ ଏକ API key ଆବଶ୍ୟକ କରେ:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

ଯଦି ସର୍ଭର୍ରେ କୌଣସି API key କନ୍ଫିଗର ହୋଇ ନାହିଁ, ତେବେ ପ୍ରମାଣୀକରଣ ଛାଡ଼ ଦିଆଯାଏ।

## ସକ୍ଷମତା

A2A **Endpoints → A2A** ଟଗଲ୍ ଦ୍ୱାରା ନିୟନ୍ତ୍ରିତ ହୁଏ ଏବଂ ଡିଫଲ୍ଟ ଭାବରେ ଅସକ୍ଷମ ଥାଏ। ଅସକ୍ଷମ ଥିବା ସମୟରେ,
`GET /api/a2a/status` `status: "disabled"` ଏବଂ `online: false` ରିପୋର୍ଟ କରେ; `POST /a2a` କୁ JSON-RPC କଲ୍ଗୁଡ଼ିକ HTTP 503 ଏବଂ JSON-RPC ତ୍ରୁଟି କୋଡ୍ `-32000` ସହ ଫେରାଇ ଦିଅନ୍ତି।

---

## JSON-RPC 2.0 ପଦ୍ଧତି

### `message/send` — ସିଙ୍କ୍ରୋନସ୍ ଏକ୍ଜିକ୍ୟୁସନ୍

ଏକ ସ୍କିଲ୍କୁ ସନ୍ଦେଶ ପଠାଏ ଏବଂ ସମ୍ପୂର୍ଣ୍ଣ ଉତ୍ତର ପାଇଁ ଅପେକ୍ଷା କରେ।

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
      "messages": [{"role": "user", "content": "Python ରେ ଏକ ହେଲୋ ବିଶ୍ୱ ଲେଖନ୍ତୁ"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

**ଉତ୍ତର:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "ପ୍ରଦାନକର୍ତ୍ତା \"anthropic\" ମାଧ୍ୟମରେ claude-sonnet ବାଛାଯାଇଛି (ଲେଟେନ୍ସି: 1200ms, ଖର୍ଚ୍ଚ: $0.003)",
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
        "reason": "ବଜେଟ୍ ଏବଂ କୋଟା ସୀମା ମଧ୍ୟରେ"
      }
    }
  }
}
```

### `message/stream` — SSE ଷ୍ଟ୍ରିମିଂ

`message/send` ସମାନ କିନ୍ତୁ ରିଅଲ୍-ଟାଇମ୍ ଷ୍ଟ୍ରିମିଂ ପାଇଁ Server-Sent Events ଫେରାଇ ଦିଏ।

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
      "messages": [{"role": "user", "content": "କ୍ୱାଣ୍ଟମ୍ କମ୍ପ୍ୟୁଟିଂ ବୁଝାନ୍ତୁ"}]
    }
  }'
```

**SSE ଇଭେଣ୍ଟ୍:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — ଟାସ୍କ ଷ୍ଟାଟସ୍ ଅନୁସନ୍ଧାନ କରନ୍ତୁ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — ଏକ ଟାସ୍କ ବାତିଲ କରନ୍ତୁ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## ଉପଲବ୍ଧ ଦକ୍ଷତାଗୁଡ଼ିକ

OmniRoute `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` ରେ ୬ଟି A2A ଦକ୍ଷତା ସଂଯୋଗ କରେ। ପ୍ରତ୍ୟେକ ଦକ୍ଷତା ମୋଡ୍ୟୁଲ୍ `src/lib/a2a/skills/` ରେ ଅବସ୍ଥିତ।

| ଦକ୍ଷତା              | ଆଇଡି                 | ବର୍ଣ୍ଣନା                                                                                                                                                                   | ଟ୍ୟାଗଗୁଡ଼ିକ                 | ଉଦାହରଣ                                                 |
| :------------------ | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------- | :----------------------------------------------------- |
| ସ୍ମାର୍ଟ ରୁଟିଂ       | `smart-routing`      | OmniRouteର କମ୍ବୋ ଇଞ୍ଜିନ୍ + ସ୍କୋରିଂ ବ୍ୟବହାର କରି ଏକ ପ୍ରମ୍ପ୍ଟକୁ ସର୍ବୋତ୍ତମ ପ୍ରଦାନକାରୀ/କମ୍ବୋ ମାଧ୍ୟମରେ ରୁଟ୍ କରେ                                                                  | ରୁଟିଂ, ପ୍ରଦାନକାରୀମାନେ       | "ଏହି ପ୍ରମ୍ପ୍ଟକୁ ସର୍ବୋତ୍ତମ ମୋଡେଲ୍ ମାଧ୍ୟମରେ ରୁଟ୍ କରନ୍ତୁ" |
| କ୍ୱୋଟା ପରିଚାଳନା     | `quota-management`   | ପ୍ରତି-ପ୍ରଦାନକାରୀ କ୍ୱୋଟା ସ୍ଥିତି ରିପୋର୍ଟ କରେ, କଲର୍ସମାନଙ୍କୁ ଥ୍ରୋଟଲ୍/ସ୍ଵିଚ୍ କରିବାକୁ ସାହାଯ୍ୟ କରେ                                                                                | କ୍ୱୋଟା, ପ୍ରଦାନକାରୀମାନେ      | "anthropic ପାଇଁ କ୍ୱୋଟା ଯାଞ୍ଚ କରନ୍ତୁ"                   |
| ପ୍ରଦାନକାରୀ ଆବିଷ୍କାର | `provider-discovery` | ସ୍ଥାପିତ ପ୍ରଦାନକାରୀମାନଙ୍କୁ ସାମର୍ଥ୍ୟ, ମୁକ୍ତ-ଟିୟର ଫ୍ଲାଗ୍, OAuth ସ୍ଥିତି ସହ ତାଲିକାଭୁକ୍ତ କରେ                                                                                     | ପ୍ରଦାନକାରୀମାନେ, ଆବିଷ୍କାର    | "କେଉଁ ପ୍ରଦାନକାରୀମାନେ ଉପಲବ୍ଧ ଅଛନ୍ତି?"                   |
| ଖର୍ଚ୍ଚ ବିଶ୍ଳେଷଣ     | `cost-analysis`      | କ୍ୟାଟାଲଗ୍ + ସାମ୍ପ୍ରତିକ ବ୍ୟବହାର ଦତ୍ତ ଏକ ଅନୁରୋଧ/କଥୋପକଥନର ଖର୍ଚ୍ଚ ଅନୁମାନ କରେ                                                                                                   | ଖର୍ଚ୍ଚ, ବ୍ୟବହାର             | "ଏହି କଥୋପକଥନ ପାଇଁ ଖର୍ଚ୍ଚ ଅନୁମାନ କରନ୍ତୁ"                |
| ସ୍ଵାସ୍ଥ୍ୟ ରିପୋର୍ଟ   | `health-report`      | ପ୍ରତି-ପ୍ରଦାନକାରୀ ସର୍କଟ ବ୍ରେକର, କୁଲଡାଉନ୍, ଲକ୍ଆଉଟ୍ ସ୍ଥିତି ସମାହାର କରେ                                                                                                         | ସ୍ଵାସ୍ଥ୍ୟ, ସ୍ଥାୟିତ୍ଵ        | "ସମସ୍ତ ପ୍ରଦାନକାରୀମାନଙ୍କ ସ୍ଵାସ୍ଥ୍ୟ ସ୍ଥିତି ଦେଖାନ୍ତୁ"     |
| ସାମର୍ଥ୍ୟ ତାଲିକା     | `list-capabilities`  | ସମ୍ପୂର୍ଣ୍ଣ ୪୫-ଏଣ୍ଟ୍ରି ଏଜେଣ୍ଟ୍ ଦକ୍ଷତା କ୍ୟାଟାଲଗ୍ (୨୩ API + ୨୧ CLI + ୧ କନଫିଗ୍) ମ୍ୟାର୍କଡାଉନ୍ ଟେବୁଲ୍ ଆକାରରେ ଫେରାଏ ଏବଂ କଣ୍ଟେକ୍ସ୍ଟ ଇଞ୍ଜେକ୍ସନ୍ ପାଇଁ କଞ୍ଚା SKILL.md URLs ପ୍ରଦାନ କରେ | କ୍ୟାଟାଲଗ୍, ଆବିଷ୍କାର, ଦକ୍ଷତା | "OmniRouteର ସମସ୍ତ ସାମର୍ଥ୍ୟ ତାଲିକାଭୁକ୍ତ କରନ୍ତୁ"         |

> ଏଜେଣ୍ଟ୍ କାର୍ଡ୍ କୁ ଲାଇଭ୍ ୩୫୨-ପ୍ରଦାନକାରୀ କ୍ୟାଟାଲଗ୍ ସହ ସଂରେଖିତ ରଖିବା ଉଚିତ; ପ୍ରଦାନକାରୀ ଗଣନା ଏବଂ ମୁକ୍ତ/ନୋ-ଅଥ ମେଟାଡାଟା ରନ୍ଟାଇମ୍ ରେଜିଷ୍ଟ୍ରି ରୁ ସୋର୍ସ୍ ହୋଇଛି।

### `list-capabilities` ଦକ୍ଷତା ବିବରଣୀ

`list-capabilities` ଦକ୍ଷତା ବାହ୍ୟ ଏଜେଣ୍ଟ୍ମାନଙ୍କ ପାଇଁ ବିଶେଷ ଭାବରେ ଉପଯୋଗୀ, ସେମାନେ API କଲ୍ ପଠାଇବା ପୂର୍ବରୁ OmniRoute କଣ ପ୍ରଦାନ କରେ ତାହା ଆବିଷ୍କାର କରିବା ଆବଶ୍ୟକ କରିଥାଏ। ଏହା ଏକ ସଂରଚିତ ମ୍ୟାର୍କଡାଉନ୍ ଟେବୁଲ୍ ଆର୍ଟିଫ୍ୟାକ୍ଟ୍ ଫେରାଏ:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

ପ୍ରତ୍ୟେକ ଧାଡ଼ିରେ `rawUrl` କଲମ୍ ଅନ୍ତର୍ଭୁକ୍ତ ଅଛି ଯାହା ଦ୍ୱାରା ଏଜେଣ୍ଟ୍ମାନେ ସଙ୍ଗେ ସଙ୍ଗେ ସମ୍ପୂର୍ଣ୍ଣ SKILL.md ଆଣିପାରିବେ। `metadata.totalSkills` ଫିଲ୍ଡ୍ ଆଜିକୁ ୪୫ ଥିବା କ୍ୟାଟାଲଗ୍ ଆକାର ସହ ମିଳେ। ବାସ୍ତବାୟନ: `src/lib/a2a/skills/listCapabilities.ts`। ଏହା ମଧ୍ୟ ଦେଖନ୍ତୁ [AGENT-SKILLS.md](./AGENT-SKILLS.md)।

## ରିଷ୍ଟ ଏପିଆଇ (ସହାୟକ)

ଜେଏସପି-ଆର୍ପିସି ଏଣ୍ଡପଏଣ୍ଟ `/a2a` ହେଉଛି କ୍ୟାନନିକାଲ ଏ2ଏ ଏଣ୍ଟ୍ରି ପଏଣ୍ଟ। ନିମ୍ନଲିଖିତ ରିଷ୍ଟ ଏଣ୍ଡପଏଣ୍ଟଗୁଡିକ ଡ୍ୟାସବୋର୍ଡ ଏବଂ ବାହ୍ୟ ଟୁଲିଂ ପାଇଁ ସହାୟକ ପ୍ରବେଶ ପ୍ରଦାନ କରନ୍ତି:

| ଏଣ୍ଡପଏଣ୍ଟ                    | ପଦ୍ଧତି | ବିବରଣୀ                                                         | ପ୍ରମାଣୀକରଣ                                  |
| :--------------------------- | :----- | :------------------------------------------------------------- | :------------------------------------------ |
| `/api/a2a/status`            | GET    | ସର୍ଭର ସ୍ଥିତି, ପଞ୍ଜିକୃତ ସ୍କିଲ                                   | (ସାର୍ବଜନୀନ)                                 |
| `/api/a2a/tasks`             | GET    | ଫିଲ୍ଟର ସହ ଟାସ୍କ ତାଲିକା                                         | ପରିଚାଳନା                                    |
| `/api/a2a/tasks/[id]`        | GET    | ଆଇଡି ଦ୍ୱାରା ଟାସ୍କ ପ୍ରାପ୍ତ କରନ୍ତୁ                               | ପରିଚାଳନା                                    |
| `/api/a2a/tasks/[id]/cancel` | POST   | ଚାଲୁଥିବା ଟାସ୍କ ବାତିଲ କରନ୍ତୁ                                    | ପରିଚାଳନା                                    |
| `/.well-known/agent.json`    | GET    | ଏଜେଣ୍ଟ କାର୍ଡ (ଏ2ଏ ଆବିଷ୍କାର)                                    | (ସାର୍ବଜନୀନ, 3600ସେକେଣ୍ଡ କ୍ୟାଶେଡ)            |
| `/api/a2a/tasks`             | POST   | ଓମ୍ନିକଣ୍ଡକ୍ଟର ଫ୍ଲିଟ୍ ପ୍ରତି ବାହ୍ୟ ପ୍ରତିନିଦେଶ (କଣ୍ଡକ୍ଟର PRD RF5) | ବିୟରର vs `OMNIROUTE_API_KEY` + `a2aEnabled` |

**ବାହ୍ୟ କଣ୍ଡକ୍ଟର ପ୍ରତିନିଦେଶ (`POST /api/a2a/tasks`):** ବାହ୍ୟ ଏ2ଏ ଏଜେଣ୍ଟମାନେ ଓମ୍ନିରୁଟ୍ ମାଧ୍ୟମରେ ଓମ୍ନିକଣ୍ଡକ୍ଟର ଫ୍ଲିଟ୍ କୁ କୋଡିଂ କାର୍ଯ୍ୟ ପ୍ରତିନିଦେଶ କରନ୍ତି। ବଡୀ: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — କେବଳ କଣ୍ଡକ୍ଟର ଫ୍ଲିଟ୍ ସ୍କିଲ (ଏଜେଣ୍ଟ କାର୍ଡରେ ଘୋଷିତ) ପ୍ରତିନିଦେଶଯୋଗ୍ୟ; `metadata.conductor.repo.url` ଆବଶ୍ୟକ (ଫ୍ଲିଟ୍ ଗିଟ୍ ରେପୋଜିରେ କାର୍ଯ୍ୟ କରେ)। ରୁଟ୍ ସର୍ଭର-ସାଇଡ୍ `CONDUCTOR_ORCHESTRATOR_TOKEN` (ଫଲବ୍ୟାକ `CONDUCTOR_HUB_TOKEN`) ବ୍ୟବହାର କରି ହବ୍ର `POST /v1/tasks` କୁ ଅନୁବାଦ କରେ ଏବଂ `201 { conductor_task_id, state: "submitted" }` ଫେରାଏ; ଟାସ୍କ ସ୍ଥିତି SSE→A2A ମିରର (RF1) ମାଧ୍ୟମରେ ପ୍ରବାହିତ ହୁଏ ଏବଂ `GET /api/a2a/tasks?skill=conductor` ମାଧ୍ୟମରେ ଦୃଶ୍ୟ।

---

## ଏକ ନୂଆ ସ୍କିଲ ଯୋଗ କରିବା

1. **ସ୍କିଲ ଫାଇଲ ସୃଷ୍ଟି କରନ୍ତୁ:** `src/lib/a2a/skills/<your-skill>.ts`

   ଏକ ଏସିଙ୍କ ଫଂକ୍ସନ ରପ୍ତାନି କରନ୍ତୁ `(task: A2ATask) => Promise<{ artifacts, metadata }>`। `smartRouting.ts` ପରି ବିଦ୍ୟମାନ ସ୍କିଲର ଆକୃତି ଅନୁସରଣ କରନ୍ତୁ।

2. **ହ୍ୟାଣ୍ଡଲର ପଞ୍ଜିକୃତ କରନ୍ତୁ:** `src/lib/a2a/taskExecution.ts` ରେ, `A2A_SKILL_HANDLERS` ରେ ଏକ ପ୍ରବେଶ ଯୋଗ କରନ୍ତୁ:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...ବିଦ୍ୟମାନ ସ୍କିଲ
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **ଏଜେଣ୍ଟ କାର୍ଡରେ ପ୍ରଦର୍ଶନ କରନ୍ତୁ:** `src/app/.well-known/agent.json/route.ts` ରେ, `skills` ଏରେକ୍ସ ରେ ଯୋଗ କରନ୍ତୁ:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **ପରୀକ୍ଷଣ ଲେଖନ୍ତୁ:** `tests/unit/a2a-<your-skill>.test.ts`। ସୁଖ ପଥ + ତ୍ରୁଟି ପଥ କଭର କରନ୍ତୁ।

5. **ଏହି ଫାଇଲର `ଉପଲବ୍ଧ ସ୍କିଲ` ସାରଣୀରେ ନୂଆ ସ୍କିଲ** ନଥିରେ **ଦସ୍ତାବିଜ** କରନ୍ତୁ।

---

## କାର୍ଯ୍ୟ TTL

କାର୍ଯ୍ୟଗୁଡିକ `ttlMinutes` (ଡିଫଲ୍ଟ 5 ମିନିଟ) ପରେ ସମୟ ସୀମା ଶେଷ ହୋଇଥାଏ — `src/lib/a2a/taskManager.ts:82` ରେ `A2ATaskManager` କନ୍ଷ୍ଟ୍ରକ୍ଟରରେ କନ୍ଫିଗର କରାଯାଇଛି। କଷ୍ଟମାଇଜ୍ କରିବାକୁ, `A2ATaskManager` ଇନ୍ଷ୍ଟାଣ୍ଟିଏସନକୁ ଫୋର୍କ କରନ୍ତୁ ଏବଂ ଏକ ଭିନ୍ନ ମୂଲ୍ୟ ପାସ୍ କରନ୍ତୁ (ଯେପରିକି, 15-ମିନିଟ TTL ପାଇଁ `new A2ATaskManager(15)`)। ଏକ ପୃଷ୍ଠଭୂମି ଇଣ୍ଟରଭାଲ ପ୍ରତି 60 ସେକେଣ୍ଡରେ ସମୟ ସୀମା ଶେଷ ହୋଇଥିବା କାର୍ଯ୍ୟଗୁଡିକୁ ସଫା କରେ।

---

## କାର୍ଯ୍ୟ ଜୀବନ ଚକ୍ର

```
ଦାଖଲ ହୋଇଛି → କାର୍ଯ୍ୟ ହେଉଛି → ସମ୍ପୂର୍ଣ୍ଣ ହୋଇଛି
                    → ବିଫଳ ହୋଇଛି
                    → ବାତିଲ ହୋଇଛି
```

- ଡିଫଲ୍ଟ ଅନୁଯାୟୀ କାର୍ଯ୍ୟଗୁଡିକ 5 ମିନିଟ ପରେ ସମୟ ସୀମା ଶେଷ ହୋଇଥାଏ (ଦେଖନ୍ତୁ [କାର୍ଯ୍ୟ TTL](#କାର୍ଯ୍ୟ-ttl))
- ଟର୍ମିନାଲ୍ ଅବସ୍ଥା: `ସମ୍ପୂର୍ଣ୍ଣ`, `ବିଫଳ`, `ବାତିଲ`
- ଇଭେଣ୍ଟ ଲଗ୍ ପ୍ରତ୍ୟେକ ଅବସ୍ଥା ସ୍ଥାନାନ୍ତରଣକୁ ଟ୍ରାକ୍ କରେ

---

## ତୃଟି କୋଡ୍

| କୋଡ୍   | ଅର୍ଥ                              |
| :----- | :-------------------------------- |
| -32700 | ପାର୍ସ୍ ତୃଟି (ଅବୈଧ JSON)           |
| -32600 | ଅବୈଧ ଅନୁରୋଧ / ଅନଧିକୃତ             |
| -32601 | ପଦ୍ଧତି କିମ୍ବା ସ୍କିଲ୍ ମିଳିଲା ନାହିଁ |
| -32602 | ଅବୈଧ ପାରାମିଟର                     |
| -32603 | ଆନ୍ତରିକ ତୃଟି                      |
| -32000 | A2A ଏଣ୍ଡପଏଣ୍ଟ ନିଷ୍କ୍ରିୟ ଅଛି       |

---

## ଇଣ୍ଟିଗ୍ରେସନ୍ ଉଦାହରଣ

### ପାଇଥନ୍ (requests)

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

### ଟାଇପ୍ସ୍କ୍ରିପ୍ଟ (fetch)

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
