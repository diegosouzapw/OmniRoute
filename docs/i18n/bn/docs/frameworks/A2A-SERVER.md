# OmniRoute A2A Server Documentation (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — একটি বুদ্ধিমান রাউটিং এজেন্ট হিসেবে OmniRoute

A2A সারফেসের দুটি দিক রয়েছে:

- **JSON-RPC 2.0** হলো `POST /a2a`-এ (প্রামাণ্য এন্ট্রি পয়েন্ট, `src/app/a2a/route.ts`-এ সংজ্ঞায়িত)।
- **REST** হলো ড্যাশবোর্ড ও টুলিংয়ের জন্য `/api/a2a/*`-এর অধীনে (স্ট্যাটাস, টাস্কের তালিকা, বাতিলকরণ)।

টাস্কগুলো `A2ATaskManager` দ্বারা ট্র্যাক করা হয় (`src/lib/a2a/taskManager.ts`, ডিফল্ট TTL ৫ মিনিট)। `src/lib/a2a/taskExecution.ts`-এর `A2A_SKILL_HANDLERS`-এর মাধ্যমে স্কিলগুলো ডিসপ্যাচ করা হয়।

## এজেন্ট আবিষ্কার

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute-এর সক্ষমতা, স্কিল এবং প্রমাণীকরণের প্রয়োজনীয়তা বর্ণনাকারী Agent Card ফেরত দেয়।

Agent Card-এর `version` ফিল্ডটি `process.env.npm_package_version` থেকে নেওয়া হয় (`src/app/.well-known/agent.json/route.ts:13` দেখুন), তাই প্রতিটি রিলিজে এটি `package.json`-এর সঙ্গে স্বয়ংক্রিয়ভাবে সিঙ্ক থাকে।

---

## প্রমাণীকরণ

সব `/a2a` অনুরোধের জন্য `Authorization` হেডারের মাধ্যমে একটি API কী প্রয়োজন:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

সার্ভারে কোনো API কী কনফিগার করা না থাকলে প্রমাণীকরণ এড়িয়ে যাওয়া হয়।

## সক্রিয়করণ

A2A **Endpoints → A2A** টগলের মাধ্যমে নিয়ন্ত্রিত হয় এবং ডিফল্টভাবে নিষ্ক্রিয় থাকে। নিষ্ক্রিয় থাকলে,
`GET /api/a2a/status` থেকে `status: "disabled"` এবং `online: false` রিপোর্ট করা হয়; `POST /a2a`-এ
JSON-RPC কলগুলো JSON-RPC ত্রুটি কোড `-32000`-সহ HTTP 503 ফেরত দেয়।

---

## JSON-RPC 2.0 মেথডসমূহ

### `message/send` — সিঙ্ক্রোনাস এক্সিকিউশন

একটি স্কিলে বার্তা পাঠায় এবং সম্পূর্ণ প্রতিক্রিয়ার জন্য অপেক্ষা করে।

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

**প্রতিক্রিয়া:**

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

### `message/stream` — SSE স্ট্রিমিং

`message/send`-এর মতোই, তবে রিয়েল-টাইম স্ট্রিমিংয়ের জন্য Server-Sent Events ফেরত দেয়।

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

**SSE ইভেন্টসমূহ:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — টাস্কের স্ট্যাটাস অনুসন্ধান

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — একটি টাস্ক বাতিল করুন

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## উপলভ্য দক্ষতাসমূহ

OmniRoute `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`-এ সংযুক্ত 6টি A2A দক্ষতা প্রকাশ করে। প্রতিটি দক্ষতা মডিউল `src/lib/a2a/skills/`-এ অবস্থিত।

| দক্ষতা              | ID                   | বিবরণ                                                                                                                                                   | ট্যাগ                      | উদাহরণ                                       |
| :------------------ | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------- | :------------------------------------------- |
| স্মার্ট রাউটিং      | `smart-routing`      | OmniRoute-এর কম্বো ইঞ্জিন + স্কোরিং ব্যবহার করে সর্বোত্তম প্রোভাইডার/কম্বোর মাধ্যমে একটি প্রম্পট রাউট করে                                               | রাউটিং, প্রোভাইডার         | "সেরা মডেলের মাধ্যমে এই প্রম্পটটি রাউট করুন" |
| কোটা ব্যবস্থাপনা    | `quota-management`   | প্রতিটি প্রোভাইডারের কোটা অবস্থা রিপোর্ট করে এবং কখন থ্রটল/সুইচ করতে হবে তা নির্ধারণে কলারদের সহায়তা করে                                               | কোটা, প্রোভাইডার           | "anthropic-এর কোটা পরীক্ষা করুন"             |
| প্রোভাইডার আবিষ্কার | `provider-discovery` | সক্ষমতা, ফ্রি-টিয়ার ফ্ল্যাগ এবং OAuth অবস্থাসহ ইনস্টল করা প্রোভাইডারগুলোর তালিকা দেয়                                                                  | প্রোভাইডার, আবিষ্কার       | "কোন কোন প্রোভাইডার উপলভ্য?"                 |
| খরচ বিশ্লেষণ        | `cost-analysis`      | ক্যাটালগ + সাম্প্রতিক ব্যবহার অনুযায়ী একটি অনুরোধ/কথোপকথনের আনুমানিক খরচ নির্ধারণ করে                                                                  | খরচ, ব্যবহার               | "এই কথোপকথনের খরচ অনুমান করুন"               |
| স্বাস্থ্য প্রতিবেদন | `health-report`      | প্রতিটি প্রোভাইডারের সার্কিট ব্রেকার, কুলডাউন এবং লকআউট অবস্থা একত্রিত করে                                                                              | স্বাস্থ্য, স্থিতিস্থাপকতা  | "সব প্রোভাইডারের স্বাস্থ্যগত অবস্থা দেখান"   |
| সক্ষমতার তালিকা     | `list-capabilities`  | কনটেক্সট ইনজেকশনের জন্য raw SKILL.md URL-সহ সম্পূর্ণ 45-এন্ট্রির Agent Skills ক্যাটালগ (23 API + 21 CLI + 1 কনফিগ) একটি markdown টেবিল হিসেবে ফেরত দেয় | ক্যাটালগ, আবিষ্কার, দক্ষতা | "OmniRoute-এর সব সক্ষমতার তালিকা দিন"        |

> Agent Card-কে সক্রিয় 352-প্রোভাইডার ক্যাটালগের সঙ্গে সামঞ্জস্যপূর্ণ রাখতে হবে; প্রোভাইডারের সংখ্যা এবং ফ্রি/নো-অথ মেটাডেটা রানটাইম রেজিস্ট্রি থেকে নেওয়া হয়।

### `list-capabilities` দক্ষতার বিস্তারিত

যেসব বহিরাগত এজেন্ট API কল পাঠানোর আগে OmniRoute কী কী প্রকাশ করে তা জানতে চায়, তাদের জন্য `list-capabilities` দক্ষতাটি বিশেষভাবে উপযোগী। এটি একটি কাঠামোবদ্ধ markdown টেবিল আর্টিফ্যাক্ট ফেরত দেয়:

```
| ID | নাম | বিভাগ | ক্ষেত্র | এন্ডপয়েন্ট/কমান্ড | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | অথ ও সেশন | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

প্রতিটি সারিতে `rawUrl` কলাম থাকে, যাতে এজেন্টরা অবিলম্বে সম্পূর্ণ SKILL.md আনতে পারে। `metadata.totalSkills` ফিল্ডটি ক্যাটালগের আকার প্রতিফলিত করে (বর্তমানে 45)। বাস্তবায়ন: `src/lib/a2a/skills/listCapabilities.ts`। আরও দেখুন [AGENT-SKILLS.md](./AGENT-SKILLS.md)।

---

## REST API (সহায়ক)

JSON-RPC এন্ডপয়েন্ট `/a2a` হলো প্রামাণ্য A2A প্রবেশপথ। নিচের REST এন্ডপয়েন্টগুলো ড্যাশবোর্ড এবং বাহ্যিক টুলিংয়ের জন্য সহায়ক অ্যাক্সেস প্রদান করে:

| এন্ডপয়েন্ট                  | মেথড | বিবরণ                                                      | প্রমাণীকরণ                                     |
| :--------------------------- | :--- | :--------------------------------------------------------- | :--------------------------------------------- |
| `/api/a2a/status`            | GET  | সার্ভারের অবস্থা, নিবন্ধিত স্কিল                           | (সর্বজনীন)                                     |
| `/api/a2a/tasks`             | GET  | ফিল্টারসহ টাস্কের তালিকা                                   | ব্যবস্থাপনা                                    |
| `/api/a2a/tasks/[id]`        | GET  | ID অনুযায়ী টাস্ক সংগ্রহ                                   | ব্যবস্থাপনা                                    |
| `/api/a2a/tasks/[id]/cancel` | POST | চলমান টাস্ক বাতিল করা                                      | ব্যবস্থাপনা                                    |
| `/.well-known/agent.json`    | GET  | Agent Card (A2A আবিষ্কার)                                  | (সর্বজনীন, 3600s ক্যাশ করা)                    |
| `/api/a2a/tasks`             | POST | OmniConductor ফ্লিটে ইনবাউন্ড ডেলিগেশন (Conductor PRD RF5) | Bearer বনাম `OMNIROUTE_API_KEY` + `a2aEnabled` |

**ইনবাউন্ড Conductor ডেলিগেশন (`POST /api/a2a/tasks`):** বাহ্যিক A2A এজেন্টগুলো OmniRoute-এর মাধ্যমে OmniConductor ফ্লিটে কোডিংয়ের কাজ অর্পণ করে। বডি: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — শুধু Conductor ফ্লিটের স্কিলগুলোই (Agent Card-এ ঘোষিত স্কিলগুলো) অর্পণযোগ্য; `metadata.conductor.repo.url` আবশ্যক (ফ্লিটটি git রিপোজিটরিতে কাজ করে)। রুটটি সার্ভার-সাইড `CONDUCTOR_ORCHESTRATOR_TOKEN` (ফলব্যাক `CONDUCTOR_HUB_TOKEN`) ব্যবহার করে হাবের `POST /v1/tasks`-এ অনুবাদ করে এবং `201 { conductor_task_id, state: "submitted" }` ফেরত দেয়; টাস্কের অবস্থাগুলো SSE→A2A মিরর (RF1)-এর মাধ্যমে ফিরে আসে এবং `GET /api/a2a/tasks?skill=conductor` ব্যবহার করে দেখা যায়।

---

## নতুন স্কিল যোগ করা

1. **স্কিল ফাইল তৈরি করুন:** `src/lib/a2a/skills/<your-skill>.ts`

   একটি async ফাংশন `(task: A2ATask) => Promise<{ artifacts, metadata }>` এক্সপোর্ট করুন। `smartRouting.ts`-এর মতো বিদ্যমান স্কিলগুলোর কাঠামো অনুসরণ করুন।

2. **হ্যান্ডলার নিবন্ধন করুন:** `src/lib/a2a/taskExecution.ts`-এ `A2A_SKILL_HANDLERS`-এ একটি এন্ট্রি যোগ করুন:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...বিদ্যমান স্কিলগুলো
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Agent Card-এ প্রকাশ করুন:** `src/app/.well-known/agent.json/route.ts`-এ `skills` অ্যারেতে যোগ করুন:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **টেস্ট লিখুন:** `tests/unit/a2a-<your-skill>.test.ts`। সফলতার পথ + ত্রুটির পথ কভার করুন।

5. **এই ফাইলের `Available Skills` টেবিলে** নতুন স্কিলটি নথিভুক্ত করুন।

---

## টাস্ক TTL

টাস্কগুলো `ttlMinutes` পরে মেয়াদোত্তীর্ণ হয় (ডিফল্ট 5 মিনিট) — এটি `src/lib/a2a/taskManager.ts:82`-এ `A2ATaskManager` কনস্ট্রাক্টরে কনফিগার করা আছে। কাস্টমাইজ করতে, `A2ATaskManager` ইনস্ট্যানশনের একটি ফর্ক তৈরি করুন এবং ভিন্ন একটি মান পাস করুন (যেমন, 15 মিনিটের TTL-এর জন্য `new A2ATaskManager(15)`)। একটি ব্যাকগ্রাউন্ড ইন্টারভ্যাল প্রতি 60 সেকেন্ডে মেয়াদোত্তীর্ণ টাস্কগুলো সরিয়ে দেয়।

---

## টাস্কের জীবনচক্র

```
জমা দেওয়া → প্রক্রিয়াধীন → সম্পন্ন
                         → ব্যর্থ
                         → বাতিল
```

- ডিফল্টভাবে টাস্কগুলো 5 মিনিট পরে মেয়াদোত্তীর্ণ হয় ([টাস্ক TTL](#task-ttl) দেখুন)
- চূড়ান্ত স্টেটসমূহ: `completed`, `failed`, `cancelled`
- ইভেন্ট লগ প্রতিটি স্টেট ট্রানজিশন ট্র্যাক করে

---

## ত্রুটি কোড

| কোড    | অর্থ                        |
| :----- | :-------------------------- |
| -32700 | পার্স ত্রুটি (অবৈধ JSON)    |
| -32600 | অবৈধ অনুরোধ / অননুমোদিত     |
| -32601 | মেথড বা স্কিল পাওয়া যায়নি |
| -32602 | অবৈধ প্যারামিটার            |
| -32603 | অভ্যন্তরীণ ত্রুটি           |
| -32000 | A2A এন্ডপয়েন্ট নিষ্ক্রিয়  |

---

## ইন্টিগ্রেশনের উদাহরণ

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
