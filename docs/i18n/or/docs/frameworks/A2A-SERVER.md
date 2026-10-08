# OmniRoute A2A Server Documentation (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — ଏକ ବୁଦ୍ଧିମାନ ରାଉଟିଂ ଏଜେଣ୍ଟ ଭାବରେ OmniRoute

A2A ପୃଷ୍ଠର ଦୁଇଟି ରୂପ ଅଛି:

- **JSON-RPC 2.0** `POST /a2a` ଠାରେ (ପ୍ରାମାଣିକ ପ୍ରବେଶ ବିନ୍ଦୁ, `src/app/a2a/route.ts` ରେ ପରିଭାଷିତ)।
- **REST** ଡ୍ୟାଶବୋର୍ଡ ଏବଂ ଟୁଲିଂ ପାଇଁ `/api/a2a/*` ଅଧୀନରେ (ସ୍ଥିତି, କାର୍ଯ୍ୟ ତାଲିକା, ବାତିଲ୍)।

କାର୍ଯ୍ୟଗୁଡ଼ିକୁ `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, ଡିଫଲ୍ଟ 5-ମିନିଟ୍ TTL) ଦ୍ୱାରା ଟ୍ରାକ୍ କରାଯାଏ। ଦକ୍ଷତାଗୁଡ଼ିକୁ `src/lib/a2a/taskExecution.ts` ରେ ଥିବା `A2A_SKILL_HANDLERS` ମାଧ୍ୟମରେ ପ୍ରେରଣ କରାଯାଏ।

## ଏଜେଣ୍ଟ ଆବିଷ୍କାର

```bash
curl http://localhost:20128/.well-known/agent.json
```

ଏହା OmniRouteର କ୍ଷମତା, ଦକ୍ଷତା ଏବଂ ପ୍ରମାଣୀକରଣ ଆବଶ୍ୟକତା ବର୍ଣ୍ଣନା କରୁଥିବା ଏଜେଣ୍ଟ କାର୍ଡ ଫେରାଏ।

ଏଜେଣ୍ଟ କାର୍ଡର `version` ଫିଲ୍ଡ `process.env.npm_package_version` ରୁ ନିଆଯାଏ (`src/app/.well-known/agent.json/route.ts:13` ଦେଖନ୍ତୁ), ତେଣୁ ପ୍ରତ୍ୟେକ ରିଲିଜ୍ରେ ଏହା `package.json` ସହିତ ସ୍ୱୟଂଚାଳିତ ଭାବରେ ସିଙ୍କ୍ ହୋଇ ରହେ।

---

## ପ୍ରମାଣୀକରଣ

ସମସ୍ତ `/a2a` ଅନୁରୋଧ ପାଇଁ `Authorization` ହେଡର୍ ମାଧ୍ୟମରେ ଏକ API କୀ ଆବଶ୍ୟକ:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

ଯଦି ସର୍ଭରରେ କୌଣସି API କୀ ବିନ୍ୟାସ କରାଯାଇନାହିଁ, ତେବେ ପ୍ରମାଣୀକରଣକୁ ଏଡ଼ାଇ ଦିଆଯାଏ।

## ସକ୍ଷମକରଣ

A2A **Endpoints → A2A** ଟଗଲ୍ ଦ୍ୱାରା ନିୟନ୍ତ୍ରିତ ହୁଏ ଏବଂ ଡିଫଲ୍ଟ ଭାବରେ ଅକ୍ଷମ ଥାଏ। ଅକ୍ଷମ ଥିବାବେଳେ,
`GET /api/a2a/status` ଦ୍ୱାରା `status: "disabled"` ଏବଂ `online: false` ରିପୋର୍ଟ କରାଯାଏ; `POST /a2a` ପ୍ରତି JSON-RPC କଲ୍ଗୁଡ଼ିକ JSON-RPC ତ୍ରୁଟି କୋଡ୍ `-32000` ସହିତ HTTP 503 ଫେରାନ୍ତି।

---

## JSON-RPC 2.0 ପଦ୍ଧତିଗୁଡ଼ିକ

### `message/send` — ସମକାଳୀନ ନିଷ୍ପାଦନ

ଏକ ଦକ୍ଷତାକୁ ବାର୍ତ୍ତା ପଠାଏ ଏବଂ ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରତିକ୍ରିୟା ପାଇଁ ଅପେକ୍ଷା କରେ।

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

**ପ୍ରତିକ୍ରିୟା:**

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

### `message/stream` — SSE ଷ୍ଟ୍ରିମିଂ

`message/send` ସହିତ ସମାନ, କିନ୍ତୁ ରିଅଲ୍-ଟାଇମ୍ ଷ୍ଟ୍ରିମିଂ ପାଇଁ Server-Sent Events ଫେରାଏ।

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

**SSE ଇଭେଣ୍ଟଗୁଡ଼ିକ:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — କାର୍ଯ୍ୟ ସ୍ଥିତି ପଚାରନ୍ତୁ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — ଏକ କାର୍ଯ୍ୟ ବାତିଲ୍ କରନ୍ତୁ

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## ଉପଲବ୍ଧ କୌଶଳଗୁଡ଼ିକ

OmniRoute, `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`ରେ ସଂଯୋଜିତ 6ଟି A2A କୌଶଳ ଉପଲବ୍ଧ କରାଏ। ପ୍ରତ୍ୟେକ କୌଶଳ ମଡ୍ୟୁଲ୍ `src/lib/a2a/skills/`ରେ ରହିଛି।

| କୌଶଳ                 | ID                   | ବର୍ଣ୍ଣନା                                                                                                                                                       | ଟ୍ୟାଗ୍                    | ଉଦାହରଣ                                                 |
| :------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------ | :----------------------------------------------------- |
| ସ୍ମାର୍ଟ ରାଉଟିଂ       | `smart-routing`      | OmniRouteର କମ୍ବୋ ଇଞ୍ଜିନ୍ + ସ୍କୋରିଂ ବ୍ୟବହାର କରି ସର୍ବୋତ୍ତମ ପ୍ରଦାନକାରୀ/କମ୍ବୋ ମାଧ୍ୟମରେ ଏକ ପ୍ରମ୍ପ୍ଟକୁ ରାଉଟ୍ କରେ                                                     | ରାଉଟିଂ, ପ୍ରଦାନକାରୀମାନେ    | "ସର୍ବୋତ୍ତମ ମଡେଲ୍ ମାଧ୍ୟମରେ ଏହି ପ୍ରମ୍ପ୍ଟକୁ ରାଉଟ୍ କରନ୍ତୁ" |
| କୋଟା ପରିଚାଳନା        | `quota-management`   | ପ୍ରତି-ପ୍ରଦାନକାରୀ କୋଟା ସ୍ଥିତି ରିପୋର୍ଟ କରେ, କେବେ ଥ୍ରଟଲ୍/ସ୍ୱିଚ୍ କରିବେ ତାହା ନିର୍ଣ୍ଣୟ କରିବାରେ କଲର୍ମାନଙ୍କୁ ସାହାଯ୍ୟ କରେ                                               | କୋଟା, ପ୍ରଦାନକାରୀମାନେ      | "anthropic ପାଇଁ କୋଟା ଯାଞ୍ଚ କରନ୍ତୁ"                     |
| ପ୍ରଦାନକାରୀ ଆବିଷ୍କାର  | `provider-discovery` | କ୍ଷମତା, ମାଗଣା-ସ୍ତର ଫ୍ଲାଗ୍ ଏବଂ OAuth ସ୍ଥିତି ସହିତ ଇନଷ୍ଟଲ୍ ହୋଇଥିବା ପ୍ରଦାନକାରୀମାନଙ୍କୁ ତାଲିକାଭୁକ୍ତ କରେ                                                              | ପ୍ରଦାନକାରୀମାନେ, ଆବିଷ୍କାର  | "କେଉଁ ପ୍ରଦାନକାରୀମାନେ ଉପଲବ୍ଧ?"                          |
| ଖର୍ଚ୍ଚ ବିଶ୍ଳେଷଣ      | `cost-analysis`      | କ୍ୟାଟାଲଗ୍ + ସାମ୍ପ୍ରତିକ ବ୍ୟବହାର ଆଧାରରେ ଏକ ଅନୁରୋଧ/ବାର୍ତ୍ତାଳାପର ଖର୍ଚ୍ଚ ଆକଳନ କରେ                                                                                   | ଖର୍ଚ୍ଚ, ବ୍ୟବହାର           | "ଏହି ବାର୍ତ୍ତାଳାପର ଖର୍ଚ୍ଚ ଆକଳନ କରନ୍ତୁ"                  |
| ସ୍ୱାସ୍ଥ୍ୟ ରିପୋର୍ଟ    | `health-report`      | ପ୍ରତି ପ୍ରଦାନକାରୀ ପାଇଁ ସର୍କିଟ୍ ବ୍ରେକର୍, କୁଲ୍ଡାଉନ୍ ଏବଂ ଲକ୍ଆଉଟ୍ ସ୍ଥିତିକୁ ଏକତ୍ର କରେ                                                                                | ସ୍ୱାସ୍ଥ୍ୟ, ସ୍ଥିତିସ୍ଥାପକତା | "ସମସ୍ତ ପ୍ରଦାନକାରୀଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ସ୍ଥିତି ଦେଖାନ୍ତୁ"        |
| କ୍ଷମତାଗୁଡ଼ିକର ତାଲିକା | `list-capabilities`  | ପ୍ରସଙ୍ଗ ଇଞ୍ଜେକ୍ସନ୍ ପାଇଁ କଞ୍ଚା SKILL.md URLଗୁଡ଼ିକ ସହିତ ଏକ ମାର୍କଡାଉନ୍ ସାରଣୀ ଭାବେ ସମ୍ପୂର୍ଣ୍ଣ 45-ଏଣ୍ଟ୍ରି Agent Skills କ୍ୟାଟାଲଗ୍ (23 API + 21 CLI + 1 config) ଫେରାଏ | କ୍ୟାଟାଲଗ୍, ଆବିଷ୍କାର, କୌଶଳ | "ସମସ୍ତ OmniRoute କ୍ଷମତା ତାଲିକାଭୁକ୍ତ କରନ୍ତୁ"            |

> Agent Cardକୁ ସକ୍ରିୟ 352-ପ୍ରଦାନକାରୀ କ୍ୟାଟାଲଗ୍ ସହିତ ସମନ୍ୱିତ ରଖିବା ଉଚିତ୍; ପ୍ରଦାନକାରୀ ସଂଖ୍ୟା ଏବଂ ମାଗଣା/ପ୍ରମାଣୀକରଣ-ବିହୀନ ମେଟାଡାଟା ରନ୍ଟାଇମ୍ ରେଜିଷ୍ଟ୍ରିରୁ ନିଆଯାଏ।

### `list-capabilities` କୌଶଳର ବିବରଣୀ

API କଲ୍ ପଠାଇବା ପୂର୍ବରୁ OmniRoute କ’ଣ ଉପଲବ୍ଧ କରାଏ ତାହା ଖୋଜିବାକୁ ଆବଶ୍ୟକ କରୁଥିବା ବାହ୍ୟ ଏଜେଣ୍ଟମାନଙ୍କ ପାଇଁ `list-capabilities` କୌଶଳ ବିଶେଷ ଭାବରେ ଉପଯୋଗୀ। ଏହା ଏକ ସଂରଚିତ ମାର୍କଡାଉନ୍ ସାରଣୀ ଆର୍ଟିଫ୍ୟାକ୍ଟ ଫେରାଏ:

```
| ID | ନାମ | ବର୍ଗ | କ୍ଷେତ୍ର | ଏଣ୍ଡପଏଣ୍ଟ୍/କମାଣ୍ଡ୍ | କଞ୍ଚା URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | ପ୍ରମାଣୀକରଣ ଏବଂ ସେସନ୍ଗୁଡ଼ିକ | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

ପ୍ରତ୍ୟେକ ଧାଡ଼ିରେ `rawUrl` ସ୍ତମ୍ଭ ଅନ୍ତର୍ଭୁକ୍ତ ଅଛି, ଯାହାଦ୍ୱାରା ଏଜେଣ୍ଟମାନେ ତୁରନ୍ତ ସମ୍ପୂର୍ଣ୍ଣ SKILL.md ଆଣିପାରିବେ। `metadata.totalSkills` ଫିଲ୍ଡ କ୍ୟାଟାଲଗ୍ର ଆକାରକୁ ପ୍ରତିଫଳିତ କରେ (ଆଜି 45)। କାର୍ଯ୍ୟାନ୍ୱୟନ: `src/lib/a2a/skills/listCapabilities.ts`। [AGENT-SKILLS.md](./AGENT-SKILLS.md) ମଧ୍ୟ ଦେଖନ୍ତୁ।

---

## REST API (ସହାୟକ)

JSON-RPC ଏଣ୍ଡପଏଣ୍ଟ `/a2a` ହେଉଛି ମାନକ A2A ପ୍ରବେଶ ବିନ୍ଦୁ। ନିମ୍ନର REST ଏଣ୍ଡପଏଣ୍ଟଗୁଡ଼ିକ ଡ୍ୟାସବୋର୍ଡ ଏବଂ ବାହ୍ୟ ଟୁଲିଂ ପାଇଁ ସହାୟକ ପ୍ରବେଶ ପ୍ରଦାନ କରେ:

| ଏଣ୍ଡପଏଣ୍ଟ                    | ପଦ୍ଧତି | ବର୍ଣ୍ଣନା                                                          | ପ୍ରମାଣୀକରଣ                                         |
| :--------------------------- | :----- | :---------------------------------------------------------------- | :------------------------------------------------- |
| `/api/a2a/status`            | GET    | ସର୍ଭର ସ୍ଥିତି, ପଞ୍ଜୀକୃତ ସ୍କିଲ୍                                     | (ସାର୍ବଜନୀନ)                                        |
| `/api/a2a/tasks`             | GET    | ଫିଲ୍ଟର ସହିତ ଟାସ୍କଗୁଡ଼ିକର ତାଲିକା                                   | ପରିଚାଳନା                                           |
| `/api/a2a/tasks/[id]`        | GET    | ID ଦ୍ୱାରା ଟାସ୍କ ପ୍ରାପ୍ତ କରନ୍ତୁ                                    | ପରିଚାଳନା                                           |
| `/api/a2a/tasks/[id]/cancel` | POST   | ଚାଲୁଥିବା ଟାସ୍କ ବାତିଲ କରନ୍ତୁ                                       | ପରିଚାଳନା                                           |
| `/.well-known/agent.json`    | GET    | Agent Card (A2A ଆବିଷ୍କାର)                                         | (ସାର୍ବଜନୀନ, 3600s ପାଇଁ କ୍ୟାଶ୍କୃତ)                  |
| `/api/a2a/tasks`             | POST   | OmniConductor ଫ୍ଲିଟ୍କୁ ଇନ୍ବାଉଣ୍ଡ ପ୍ରତିନିଧିତ୍ୱ (Conductor PRD RF5) | `OMNIROUTE_API_KEY` + `a2aEnabled` ବିପକ୍ଷରେ Bearer |

**ଇନ୍ବାଉଣ୍ଡ Conductor ପ୍ରତିନିଧିତ୍ୱ (`POST /api/a2a/tasks`):** ବାହ୍ୟ A2A ଏଜେଣ୍ଟଗୁଡ଼ିକ OmniRoute ମାଧ୍ୟମରେ OmniConductor ଫ୍ଲିଟ୍କୁ କୋଡିଂ କାର୍ଯ୍ୟ ପ୍ରତିନିଧିତ୍ୱ କରନ୍ତି। ବଡି: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — କେବଳ Conductor ଫ୍ଲିଟ୍ ସ୍କିଲ୍ଗୁଡ଼ିକ (Agent Cardରେ ଘୋଷିତ ସ୍କିଲ୍ଗୁଡ଼ିକ) ପ୍ରତିନିଧିତ୍ୱଯୋଗ୍ୟ; `metadata.conductor.repo.url` ଆବଶ୍ୟକ (ଫ୍ଲିଟ୍ଟି git ରିପୋଗୁଡ଼ିକରେ କାମ କରେ)। ଏହି ରୁଟ୍ ସର୍ଭର-ସାଇଡ୍ `CONDUCTOR_ORCHESTRATOR_TOKEN` (ଫଲ୍ବ୍ୟାକ୍ `CONDUCTOR_HUB_TOKEN`) ବ୍ୟବହାର କରି ହବ୍ର `POST /v1/tasks`କୁ ରୂପାନ୍ତର କରେ ଏବଂ `201 { conductor_task_id, state: "submitted" }` ଫେରାଏ; ଟାସ୍କ ସ୍ଥିତିଗୁଡ଼ିକ SSE→A2A ମିରର୍ (RF1) ମାଧ୍ୟମରେ ପୁନଃ ପ୍ରବାହିତ ହୁଏ ଏବଂ `GET /api/a2a/tasks?skill=conductor` ମାଧ୍ୟମରେ ଦୃଶ୍ୟମାନ ହୁଏ।

---

## ଏକ ନୂଆ ସ୍କିଲ୍ ଯୋଡ଼ିବା

1. **ସ୍କିଲ୍ ଫାଇଲ୍ ସୃଷ୍ଟି କରନ୍ତୁ:** `src/lib/a2a/skills/<your-skill>.ts`

   ଏକ async ଫଙ୍କସନ୍ `(task: A2ATask) => Promise<{ artifacts, metadata }>` ଏକ୍ସପୋର୍ଟ କରନ୍ତୁ। `smartRouting.ts` ପରି ବିଦ୍ୟମାନ ସ୍କିଲ୍ଗୁଡ଼ିକର ଢାଞ୍ଚା ଅନୁସରଣ କରନ୍ତୁ।

2. **ହ୍ୟାଣ୍ଡଲର୍ ପଞ୍ଜୀକରଣ କରନ୍ତୁ:** `src/lib/a2a/taskExecution.ts`ରେ, `A2A_SKILL_HANDLERS`କୁ ଏକ ଏଣ୍ଟ୍ରି ଯୋଡ଼ନ୍ତୁ:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...ବିଦ୍ୟମାନ ସ୍କିଲ୍ଗୁଡ଼ିକ
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Agent Cardରେ ପ୍ରକାଶ କରନ୍ତୁ:** `src/app/.well-known/agent.json/route.ts`ରେ, `skills` ଆରେରେ ଯୋଡ଼ନ୍ତୁ:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **ପରୀକ୍ଷାଗୁଡ଼ିକ ଲେଖନ୍ତୁ:** `tests/unit/a2a-<your-skill>.test.ts`। ସଫଳ ପଥ + ତ୍ରୁଟି ପଥକୁ ଅନ୍ତର୍ଭୁକ୍ତ କରନ୍ତୁ।

5. **ଡକ୍ୟୁମେଣ୍ଟ କରନ୍ତୁ** ଏହି ଫାଇଲ୍ର `Available Skills` ଟେବୁଲ୍ରେ ନୂଆ ସ୍କିଲ୍ଟିକୁ।

---

## କାର୍ଯ୍ୟ TTL

କାର୍ଯ୍ୟଗୁଡ଼ିକ `ttlMinutes` ପରେ (ଡିଫଲ୍ଟ ଭାବେ 5 ମିନିଟ୍) ମିଆଦ ଶେଷ ହୁଏ — ଏହା `src/lib/a2a/taskManager.ts:82` ରେ ଥିବା `A2ATaskManager` କନ୍ଷ୍ଟ୍ରକ୍ଟର୍ରେ ବିନ୍ୟାସ କରାଯାଇଛି। କଷ୍ଟମାଇଜ୍ କରିବା ପାଇଁ, `A2ATaskManager` ଇନ୍ଷ୍ଟାନ୍ସିଏସନ୍କୁ ଫୋର୍କ କରନ୍ତୁ ଏବଂ ଏକ ଭିନ୍ନ ମୂଲ୍ୟ ପାସ୍ କରନ୍ତୁ (ଯଥା, 15-ମିନିଟ୍ TTL ପାଇଁ `new A2ATaskManager(15)`)। ଏକ ପୃଷ୍ଠଭୂମି ଇଣ୍ଟରଭାଲ୍ ପ୍ରତି 60 ସେକେଣ୍ଡରେ ମିଆଦ ଶେଷ ହୋଇଥିବା କାର୍ଯ୍ୟଗୁଡ଼ିକୁ ସଫା କରେ।

---

## କାର୍ଯ୍ୟ ଜୀବନଚକ୍ର

```
ଦାଖଲ ହୋଇଛି → କାର୍ଯ୍ୟରତ → ସମ୍ପୂର୍ଣ୍ଣ
                         → ବିଫଳ
                         → ବାତିଲ
```

- କାର୍ଯ୍ୟଗୁଡ଼ିକ ଡିଫଲ୍ଟ ଭାବେ 5 ମିନିଟ୍ ପରେ ମିଆଦ ଶେଷ ହୁଏ ([କାର୍ଯ୍ୟ TTL](#task-ttl) ଦେଖନ୍ତୁ)
- ଅନ୍ତିମ ଅବସ୍ଥାଗୁଡ଼ିକ: `completed`, `failed`, `cancelled`
- ଇଭେଣ୍ଟ ଲଗ୍ ପ୍ରତ୍ୟେକ ଅବସ୍ଥା ପରିବର୍ତ୍ତନକୁ ଟ୍ରାକ୍ କରେ

---

## ତ୍ରୁଟି କୋଡ୍ଗୁଡ଼ିକ

| କୋଡ୍   | ଅର୍ଥ                            |
| :----- | :------------------------------ |
| -32700 | ପାର୍ସ ତ୍ରୁଟି (ଅବୈଧ JSON)        |
| -32600 | ଅବୈଧ ଅନୁରୋଧ / ଅନଧିକୃତ           |
| -32601 | ପଦ୍ଧତି କିମ୍ବା କୌଶଳ ମିଳିଲା ନାହିଁ |
| -32602 | ଅବୈଧ ପାରାମିଟର୍ଗୁଡ଼ିକ            |
| -32603 | ଆଭ୍ୟନ୍ତରୀଣ ତ୍ରୁଟି               |
| -32000 | A2A ଏଣ୍ଡପଏଣ୍ଟ ଅକ୍ଷମ ଅଛି         |

---

## ଏକୀକରଣ ଉଦାହରଣଗୁଡ଼ିକ

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
