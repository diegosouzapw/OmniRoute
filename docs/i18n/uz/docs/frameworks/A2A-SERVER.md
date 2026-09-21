# OmniRoute A2A Server Documentation (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute aqlli marshrutlash agenti sifatida

A2A interfeysining ikki ko‘rinishi mavjud:

- **JSON-RPC 2.0** — `POST /a2a` manzilida (asosiy kirish nuqtasi, `src/app/a2a/route.ts` faylida belgilangan).
- **REST** — boshqaruv panellari va vositalar uchun `/api/a2a/*` ostida (holat, vazifalar ro‘yxati, bekor qilish).

Vazifalar `A2ATaskManager` tomonidan kuzatib boriladi (`src/lib/a2a/taskManager.ts`, standart TTL — 5 daqiqa). Ko‘nikmalar `src/lib/a2a/taskExecution.ts` faylidagi `A2A_SKILL_HANDLERS` orqali yo‘naltiriladi.

## Agentni aniqlash

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute imkoniyatlari, koʻnikmalari va autentifikatsiya talablarini tavsiflovchi Agent kartasini qaytaradi.

Agent kartasining `version` maydoni `process.env.npm_package_version` dan olinadi (`src/app/.well-known/agent.json/route.ts:13` ga qarang), shuning uchun u har bir relizda `package.json` bilan avtomatik ravishda sinxronlashtiriladi.

---

## Autentifikatsiya

Barcha `/a2a` soʻrovlari `Authorization` sarlavhasi orqali API kalitini talab qiladi:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Agar serverda hech qanday API kaliti sozlanmagan boʻlsa, autentifikatsiya chetlab oʻtiladi.

## Yoqish

A2A **Endpoints → A2A** almashtirgichi orqali boshqariladi va standart holatda oʻchirilgan. Oʻchirilganida,
`GET /api/a2a/status` soʻrovi `status: "disabled"` va `online: false` qiymatlarini qaytaradi; `POST /a2a`
manziliga yuborilgan JSON-RPC chaqiruvlari `-32000` JSON-RPC xato kodi bilan HTTP 503 javobini qaytaradi.

---

## JSON-RPC 2.0 metodlari

### `message/send` — Sinxron bajarish

Koʻnikmaga xabar yuboradi va toʻliq javobni kutadi.

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

**Javob:**

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

### `message/stream` — SSE oqimi

`message/send` bilan bir xil, ammo real vaqt rejimida oqimli uzatish uchun Server-Sent Events hodisalarini qaytaradi.

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

**SSE hodisalari:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Vazifa holatini soʻrash

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Vazifani bekor qilish

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Mavjud ko‘nikmalar

OmniRoute `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` ichida ulangan 6 ta A2A ko‘nikmasini taqdim etadi. Har bir ko‘nikma moduli `src/lib/a2a/skills/` ichida joylashgan.

| Ko‘nikma                   | ID                   | Tavsif                                                                                                                                                                             | Teglar                         | Misollar                                        |
| :------------------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------- | :---------------------------------------------- |
| Aqlli marshrutlash         | `smart-routing`      | OmniRoute kombinatsiya mexanizmi va baholash tizimidan foydalanib, so‘rovni optimal provayder/kombinatsiya orqali yo‘naltiradi                                                     | marshrutlash, provayderlar     | "Bu so‘rovni eng yaxshi model orqali yo‘naltir" |
| Kvotani boshqarish         | `quota-management`   | Har bir provayder bo‘yicha kvota holatini ko‘rsatadi va chaqiruvchilarga qachon cheklash/almashtirish kerakligini aniqlashga yordam beradi                                         | kvota, provayderlar            | "anthropic uchun kvotani tekshir"               |
| Provayderlarni aniqlash    | `provider-discovery` | O‘rnatilgan provayderlarni imkoniyatlari, bepul tarif belgilari va OAuth holati bilan birga ro‘yxatlaydi                                                                           | provayderlar, aniqlash         | "Qanday provayderlar mavjud?"                   |
| Xarajatlar tahlili         | `cost-analysis`      | Katalog va oxirgi foydalanish ma’lumotlari asosida so‘rov/suhbat xarajatini hisoblaydi                                                                                             | xarajat, foydalanish           | "Bu suhbat xarajatini hisobla"                  |
| Holat hisoboti             | `health-report`      | Har bir provayder bo‘yicha avtomatik uzgich, kutish muddati va blokirovka holatini jamlaydi                                                                                        | holat, barqarorlik             | "Barcha provayderlarning holatini ko‘rsat"      |
| Imkoniyatlarni ro‘yxatlash | `list-capabilities`  | Kontekst kiritish uchun xom SKILL.md URL manzillari bilan to‘liq 45 elementli Agent Skills katalogini (23 API + 21 CLI + 1 konfiguratsiya) markdown jadvali ko‘rinishida qaytaradi | katalog, aniqlash, ko‘nikmalar | "Barcha OmniRoute imkoniyatlarini ro‘yxatla"    |

> Agent kartasi amaldagi 352 provayderli katalog bilan muvofiqlashtirib turilishi kerak; provayderlar soni hamda bepul/autentifikatsiyasiz foydalanish metama’lumotlari bajarilish vaqtidagi reyestrdan olinadi.

### `list-capabilities` ko‘nikmasi tafsilotlari

`list-capabilities` ko‘nikmasi API chaqiruvlarini yuborishdan oldin OmniRoute nimalarni taqdim etishini aniqlashi kerak bo‘lgan tashqi agentlar uchun ayniqsa foydalidir. U tuzilmali markdown jadval artefaktini qaytaradi:

```
| ID | Nomi | Toifa | Soha | Endpointlar/Buyruqlar | Xom URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Autentifikatsiya va seanslar | api | autentifikatsiya | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Har bir qator `rawUrl` ustunini o‘z ichiga oladi, shuning uchun agentlar darhol to‘liq SKILL.md faylini olishi mumkin. `metadata.totalSkills` maydoni katalog hajmini aks ettiradi (bugungi kunda 45 ta). Amalga oshirish: `src/lib/a2a/skills/listCapabilities.ts`. Shuningdek, [AGENT-SKILLS.md](./AGENT-SKILLS.md) fayliga qarang.

---

## REST API (yordamchi)

JSON-RPC endpointi `/a2a` kanonik A2A kirish nuqtasidir. Quyidagi REST endpointlari boshqaruv panellari va tashqi vositalar uchun yordamchi kirishni taqdim etadi:

| Endpoint                     | Metod | Tavsif                                                         | Autentifikatsiya                             |
| :--------------------------- | :---- | :------------------------------------------------------------- | :------------------------------------------- |
| `/api/a2a/status`            | GET   | Server holati, roʻyxatdan oʻtgan ko‘nikmalar                   | (ommaviy)                                    |
| `/api/a2a/tasks`             | GET   | Vazifalarni filtrlar bilan roʻyxatlash                         | boshqaruv                                    |
| `/api/a2a/tasks/[id]`        | GET   | Vazifani ID boʻyicha olish                                     | boshqaruv                                    |
| `/api/a2a/tasks/[id]/cancel` | POST  | Bajarilayotgan vazifani bekor qilish                           | boshqaruv                                    |
| `/.well-known/agent.json`    | GET   | Agent kartasi (A2A aniqlash)                                   | (ommaviy, 3600s keshlanadi)                  |
| `/api/a2a/tasks`             | POST  | OmniConductor parkiga kiruvchi delegatsiya (Conductor PRD RF5) | Bearer va `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Kiruvchi Conductor delegatsiyasi (`POST /api/a2a/tasks`):** tashqi A2A agentlari kodlash ishlarini OmniRoute orqali OmniConductor parkiga delegatsiya qiladi. Soʻrov tanasi: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — faqat Conductor parki ko‘nikmalarini (Agent kartasida eʼlon qilinganlarini) delegatsiya qilish mumkin; `metadata.conductor.repo.url` talab qilinadi (park git repozitoriylari ustida ishlaydi). Marshrut server tomonidagi `CONDUCTOR_ORCHESTRATOR_TOKEN` (zaxira sifatida `CONDUCTOR_HUB_TOKEN`) yordamida hubning `POST /v1/tasks` soʻroviga aylantiriladi va `201 { conductor_task_id, state: "submitted" }` qaytaradi; vazifa holatlari SSE→A2A ko‘zgusi (RF1) orqali qaytib keladi va ularni `GET /api/a2a/tasks?skill=conductor` orqali koʻrish mumkin.

---

## Yangi ko‘nikma qoʻshish

1. **Ko‘nikma faylini yarating:** `src/lib/a2a/skills/<your-skill>.ts`

   `(task: A2ATask) => Promise<{ artifacts, metadata }>` asinxron funksiyasini eksport qiling. `smartRouting.ts` kabi mavjud ko‘nikmalar tuzilishiga amal qiling.

2. **Ishlov beruvchini roʻyxatdan oʻtkazing:** `src/lib/a2a/taskExecution.ts` faylidagi `A2A_SKILL_HANDLERS` obyektiga yozuv qoʻshing:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...mavjud ko‘nikmalar
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Agent kartasida koʻrsating:** `src/app/.well-known/agent.json/route.ts` faylidagi `skills` massiviga qoʻshing:

   ```json
   {
     "id": "your-skill",
     "name": "Ko‘nikmangiz",
     "description": "Qisqa, maqsadga yoʻnaltirilgan tavsif",
     "tags": ["marshrutlash", "kvota"],
     "examples": ["Tabiiy tildagi chaqiruv namunasi"]
   }
   ```

4. **Testlar yozing:** `tests/unit/a2a-<your-skill>.test.ts`. Muvaffaqiyatli bajarilish va xatolik holatlarini qamrab oling.

5. **Yangi ko‘nikmani** ushbu fayldagi `Mavjud ko‘nikmalar` jadvalida hujjatlashtiring.

---

## Vazifaning TTL muddati

Vazifalar `ttlMinutes` vaqtidan soʻng tugaydi (standart qiymat — 5 daqiqa). Bu qiymat `src/lib/a2a/taskManager.ts:82` manzilidagi `A2ATaskManager` konstruktorida sozlanadi. Uni moslashtirish uchun `A2ATaskManager` nusxasi yaratiladigan kodni fork qiling va boshqa qiymat uzating (masalan, 15 daqiqalik TTL uchun `new A2ATaskManager(15)`). Fon intervali muddati tugagan vazifalarni har 60 soniyada tozalaydi.

---

## Vazifaning hayot sikli

```
yuborilgan → bajarilmoqda → yakunlangan
                         → muvaffaqiyatsiz
                         → bekor qilingan
```

- Vazifalar standart holatda 5 daqiqadan soʻng tugaydi ([Vazifaning TTL muddati](#task-ttl)ga qarang)
- Yakuniy holatlar: `completed`, `failed`, `cancelled`
- Hodisalar jurnali har bir holat oʻzgarishini kuzatib boradi

---

## Xato kodlari

| Kod    | Maʼnosi                                |
| :----- | :------------------------------------- |
| -32700 | Tahlil xatosi (JSON notoʻgʻri)         |
| -32600 | Notoʻgʻri soʻrov / Avtorizatsiyasiz    |
| -32601 | Metod yoki koʻnikma topilmadi          |
| -32602 | Parametrlar notoʻgʻri                  |
| -32603 | Ichki xato                             |
| -32000 | A2A soʻnggi nuqtasi oʻchirib qoʻyilgan |

---

## Integratsiya misollari

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
