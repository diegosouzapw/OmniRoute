# OmniRoute A2A Server Documentation (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agentlərarası Protokol v0.3 — ağıllı marşrutlaşdırma agenti kimi OmniRoute

A2A interfeysinin iki üzü var:

- **JSON-RPC 2.0** — `POST /a2a` ünvanında (kanonik giriş nöqtəsi, `src/app/a2a/route.ts` faylında müəyyən edilib).
- **REST** — idarəetmə panelləri və alətlər üçün `/api/a2a/*` altında (status, tapşırıq siyahısı, ləğvetmə).

Tapşırıqlar `A2ATaskManager` tərəfindən izlənilir (`src/lib/a2a/taskManager.ts`, standart olaraq 5 dəqiqəlik TTL). Bacarıqlar `src/lib/a2a/taskExecution.ts` faylındakı `A2A_SKILL_HANDLERS` vasitəsilə yönləndirilir.

## Agentin aşkarlanması

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute-un imkanlarını, bacarıqlarını və autentifikasiya tələblərini təsvir edən Agent Kartını qaytarır.

Agent Kartının `version` sahəsi `process.env.npm_package_version` dəyişənindən alınır (`src/app/.well-known/agent.json/route.ts:13` bölməsinə baxın), buna görə də hər buraxılışda `package.json` ilə avtomatik sinxronlaşdırılır.

---

## Autentifikasiya

Bütün `/a2a` sorğuları `Authorization` başlığı vasitəsilə API açarı tələb edir:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Serverdə heç bir API açarı konfiqurasiya edilməyibsə, autentifikasiya ötürülür.

## Aktivləşdirmə

A2A **Endpoints → A2A** keçidi ilə idarə olunur və standart olaraq deaktivdir. Deaktiv olduqda,
`GET /api/a2a/status` sorğusu `status: "disabled"` və `online: false` qaytarır; `POST /a2a`
ünvanına JSON-RPC çağırışları isə `-32000` JSON-RPC xəta kodu ilə HTTP 503 qaytarır.

---

## JSON-RPC 2.0 metodları

### `message/send` — Sinxron icra

Bacarıqa mesaj göndərir və tam cavabı gözləyir.

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

**Cavab:**

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

### `message/stream` — SSE axını

`message/send` ilə eynidir, lakin real vaxt axını üçün server tərəfindən göndərilən hadisələri qaytarır.

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

**SSE hadisələri:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Tapşırıq statusunun sorğulanması

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Tapşırığın ləğv edilməsi

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Mövcud bacarıqlar

OmniRoute `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` daxilində qoşulmuş 6 A2A bacarığını təqdim edir. Hər bir bacarıq modulu `src/lib/a2a/skills/` daxilində yerləşir.

| Bacarıq                     | ID                   | Təsvir                                                                                                                                                                              | Teqlər                         | Nümunələr                                         |
| :-------------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------- | :------------------------------------------------ |
| Ağıllı marşrutlaşdırma      | `smart-routing`      | OmniRoute-un kombinasiya mühərriki və qiymətləndirməsindən istifadə edərək sorğunu optimal provayder/kombinasiya vasitəsilə yönləndirir                                             | marşrutlaşdırma, provayderlər  | "Bu sorğunu ən yaxşı model vasitəsilə yönləndir"  |
| Kvotanın idarə edilməsi     | `quota-management`   | Hər provayder üzrə kvota vəziyyətini bildirir, çağıran tərəflərə sürəti nə vaxt məhdudlaşdırmaq və ya provayderi dəyişmək barədə qərar verməyə kömək edir                           | kvota, provayderlər            | "anthropic üçün kvotanı yoxla"                    |
| Provayderlərin aşkarlanması | `provider-discovery` | Quraşdırılmış provayderləri imkanları, pulsuz səviyyə göstəriciləri və OAuth statusu ilə birlikdə sadalayır                                                                         | provayderlər, aşkarlama        | "Hansı provayderlər mövcuddur?"                   |
| Xərc təhlili                | `cost-analysis`      | Kataloq və son istifadə məlumatları əsasında sorğunun/söhbətin xərcini təxmin edir                                                                                                  | xərc, istifadə                 | "Bu söhbətin xərcini təxmin et"                   |
| Sağlamlıq hesabatı          | `health-report`      | Hər provayder üzrə dövrəqıranın, gözləmə müddətinin və kilidlənmə vəziyyətinin ümumi görünüşünü təqdim edir                                                                         | sağlamlıq, dayanıqlılıq        | "Bütün provayderlərin sağlamlıq statusunu göstər" |
| İmkanların siyahısı         | `list-capabilities`  | Kontekst daxil edilməsi üçün xam SKILL.md URL-ləri ilə birlikdə 45 elementdən ibarət tam Agent Skills kataloqunu (23 API + 21 CLI + 1 konfiqurasiya) markdown cədvəli kimi qaytarır | kataloq, aşkarlama, bacarıqlar | "Bütün OmniRoute imkanlarını sadala"              |

> Agent Kartı aktual 352 provayderdən ibarət kataloqla uyğun saxlanmalıdır; provayderlərin sayı və pulsuz/autentifikasiya tələb etməyən seçimlərə dair metadata icra vaxtı reyestrindən əldə edilir.

### `list-capabilities` bacarığının təfərrüatları

`list-capabilities` bacarığı API çağırışları göndərməzdən əvvəl OmniRoute-un təqdim etdiyi imkanları aşkarlamalı olan xarici agentlər üçün xüsusilə faydalıdır. O, strukturlaşdırılmış markdown cədvəl artefaktı qaytarır:

```
| ID | Ad | Kateqoriya | Sahə | Son nöqtələr/Əmrlər | Xam URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Autentifikasiya və sessiyalar | api | autentifikasiya | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Hər sətirdə `rawUrl` sütunu var ki, agentlər tam SKILL.md faylını dərhal əldə edə bilsinlər. `metadata.totalSkills` sahəsi kataloqun ölçüsünü əks etdirir (hazırda 45). İmplementasiya: `src/lib/a2a/skills/listCapabilities.ts`. Həmçinin [AGENT-SKILLS.md](./AGENT-SKILLS.md) sənədinə baxın.

---

## REST API (köməkçi)

JSON-RPC son nöqtəsi `/a2a` əsas A2A giriş nöqtəsidir. Aşağıdakı REST son nöqtələri idarəetmə panelləri və xarici alətlər üçün köməkçi giriş təmin edir:

| Son nöqtə                    | Metod | Təsvir                                                              | Autentifikasiya                              |
| :--------------------------- | :---- | :------------------------------------------------------------------ | :------------------------------------------- |
| `/api/a2a/status`            | GET   | Serverin statusu, qeydiyyatdan keçmiş bacarıqlar                    | (ictimai)                                    |
| `/api/a2a/tasks`             | GET   | Tapşırıqları filtrlərlə siyahıla                                    | idarəetmə                                    |
| `/api/a2a/tasks/[id]`        | GET   | Tapşırığı ID üzrə əldə et                                           | idarəetmə                                    |
| `/api/a2a/tasks/[id]/cancel` | POST  | İcra olunan tapşırığı ləğv et                                       | idarəetmə                                    |
| `/.well-known/agent.json`    | GET   | Agent Kartı (A2A aşkarlanması)                                      | (ictimai, 3600s keşlənir)                    |
| `/api/a2a/tasks`             | POST  | OmniConductor donanmasına daxil olan delegasiya (Conductor PRD RF5) | Bearer və `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Daxil olan Conductor delegasiyası (`POST /api/a2a/tasks`):** xarici A2A agentləri kodlaşdırma işlərini OmniRoute vasitəsilə OmniConductor donanmasına həvalə edir. Gövdə: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — yalnız Conductor donanmasının bacarıqları (Agent Kartında elan edilənlər) həvalə edilə bilər; `metadata.conductor.repo.url` tələb olunur (donanma git repozitoriyalarında işləyir). Marşrut server tərəfindəki `CONDUCTOR_ORCHESTRATOR_TOKEN`-dan (ehtiyat variant kimi `CONDUCTOR_HUB_TOKEN`) istifadə edərək mərkəzin `POST /v1/tasks` sorğusuna çevrilir və `201 { conductor_task_id, state: "submitted" }` qaytarır; tapşırıq vəziyyətləri SSE→A2A güzgüsü (RF1) vasitəsilə geri ötürülür və `GET /api/a2a/tasks?skill=conductor` vasitəsilə görünür.

---

## Yeni Bacarığın Əlavə Edilməsi

1. **Bacarıq faylını yaradın:** `src/lib/a2a/skills/<your-skill>.ts`

   `(task: A2ATask) => Promise<{ artifacts, metadata }>` formasında asinxron funksiya ixrac edin. `smartRouting.ts` kimi mövcud bacarıqların strukturunu izləyin.

2. **İşləyicini qeydiyyatdan keçirin:** `src/lib/a2a/taskExecution.ts` faylında `A2A_SKILL_HANDLERS` obyektinə giriş əlavə edin:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...mövcud bacarıqlar
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Agent Kartında təqdim edin:** `src/app/.well-known/agent.json/route.ts` faylında `skills` massivinə əlavə edin:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Testlər yazın:** `tests/unit/a2a-<your-skill>.test.ts`. Uğurlu icra ssenarisini və xəta ssenarisini əhatə edin.

5. **Yeni bacarığı** bu fayldakı `Available Skills` cədvəlində sənədləşdirin.

---

## Tapşırığın TTL-i

Tapşırıqlar `ttlMinutes` müddətindən sonra başa çatır (standart olaraq 5 dəq.) — bu parametr `src/lib/a2a/taskManager.ts:82` ünvanında `A2ATaskManager` konstruktorunda konfiqurasiya edilir. Fərdiləşdirmək üçün `A2ATaskManager` instansiyasını fork edin və fərqli dəyər ötürün (məsələn, 15 dəqiqəlik TTL üçün `new A2ATaskManager(15)`). Arxa fon intervalı vaxtı keçmiş tapşırıqları hər 60 saniyədən bir təmizləyir.

---

## Tapşırığın həyat dövrü

```
təqdim edilib → icra olunur → tamamlanıb
                           → uğursuz olub
                           → ləğv edilib
```

- Tapşırıqlar standart olaraq 5 dəqiqədən sonra başa çatır (baxın: [Tapşırığın TTL-i](#task-ttl))
- Son vəziyyətlər: `completed`, `failed`, `cancelled`
- Hadisələr jurnalı hər vəziyyət keçidini izləyir

---

## Xəta kodları

| Kod    | Mənası                         |
| :----- | :----------------------------- |
| -32700 | Təhlil xətası (etibarsız JSON) |
| -32600 | Etibarsız sorğu / İcazəsiz     |
| -32601 | Metod və ya bacarıq tapılmadı  |
| -32602 | Etibarsız parametrlər          |
| -32603 | Daxili xəta                    |
| -32000 | A2A son nöqtəsi deaktiv edilib |

---

## İnteqrasiya nümunələri

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
