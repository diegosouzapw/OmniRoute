# Cloud Agents (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Doğruluk kaynağı:** `src/lib/cloudAgent/` ve `src/app/api/v1/agents/tasks/`
> **Son güncelleme:** 2026-06-28 — v3.8.40 (frontmatter yenilemesi; cursor-cloud dahil 4 ajan)

OmniRoute, üçüncü taraf bulut tabanlı kodlama ajanlarını (Codex Cloud, Cursor,
Devin, Jules) uzun süre çalışan görevler olarak yönetir. Her ajan, istemcilerin
sağlayıcıya özgü API'lerle uğraşmadan bir istem + depo URL'si gönderebilmesi ve
sonuçları alabilmesi için ortak bir arayüz arkasında kapsüllenir.

Bir Cloud Agent görevi, normal bir sohbet tamamlama işlemi **değildir**. Tamamlanması
dakikalar veya saatler sürebilen, çıktı olarak bir Pull Request üretebilen ve takip
mesajlarının yanı sıra (bazı sağlayıcılarda) plan onay adımlarını destekleyen, kalıcı
ve çok adımlı bir iş birimidir.

![Cloud Agent görev yaşam döngüsü](../diagrams/exported/cloud-agent-flow.svg)

> Kaynak: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Desteklenen Ajanlar

| Sağlayıcı Kimliği | Sınıf              | Kaynak                                | Üst Hizmet Temel URL'si                 | Plan Onayı       |
| ----------------- | ------------------ | ------------------------------------- | --------------------------------------- | ---------------- |
| `jules`           | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Evet             |
| `devin`           | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Evet             |
| `codex-cloud`     | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Hayır (otomatik) |
| `cursor-cloud`    | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Hayır (otomatik) |

Kayıt defteri: `src/lib/cloudAgent/registry.ts` — `getAgent(providerId)`,
`getAvailableAgents()` ve `isCloudAgentProvider(providerId)` dışa aktarılır. Kayıt defteri,
modül yüklenirken doldurulan, bellekte tutulan basit bir `Record<string, CloudAgentBase>` yapısıdır.

## Mimari

```
İstemci (Dashboard / CLI / API)
  → POST /api/v1/agents/tasks (yönetim kimlik doğrulaması gerekir)
    → CreateCloudAgentTaskSchema doğrulaması (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ getProviderConnections({ provider, isActive: true }) üzerinden alır
         (önce apiKey, yoksa accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ Üst sağlayıcı API'sine HTTP POST
      └─ dahili id + externalId içeren CloudAgentTask döndürür
    → cloud_agent_tasks (SQLite) içine insertCloudAgentTask(...)

Yoklama (okuma sırasında tembel eşitleme):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // durumu + etkinlikleri yeniler
    → yeni durum, sonuç ve completed_at ile updateCloudAgentTask(...)
    → serileştirilmiş görevi döndürür

Etkileşimler:
  POST /api/v1/agents/tasks/[id]  gövde: { action: "approve" | "message" | "cancel" }
    → "approve" için agent.approvePlan(externalId, credentials)
    → "message" için agent.sendMessage(externalId, message, credentials)
    → "cancel" için durum "cancelled" olarak değiştirilir (yalnızca yerel)
```

Eşitleme **tembeldir**: durum, her `GET /tasks/[id]` isteğinde üst hizmetten yenilenir.
Arka planda çalışan bir yoklayıcı yoktur. Güncel duruma ihtiyaç duyan dashboard'lar, GET
uç noktasını makul bir aralıkla yoklamalıdır.

## `CloudAgentBase` Arayüzü

Kaynak: `src/lib/cloudAgent/baseAgent.ts`

```typescript
export interface AgentCredentials {
  apiKey: string;
  baseUrl?: string;
}

export interface CreateTaskParams {
  prompt: string;
  source: CloudAgentSource;
  options: {
    autoCreatePr?: boolean;
    planApprovalRequired?: boolean;
    environment?: Record<string, string>;
  };
}

export interface GetStatusResult {
  status: CloudAgentStatus;
  externalId?: string;
  result?: CloudAgentResult;
  activities: CloudAgentActivity[];
  error?: string;
}

export abstract class CloudAgentBase {
  abstract readonly providerId: string;
  abstract readonly baseUrl: string;

  abstract createTask(p: CreateTaskParams, c: AgentCredentials): Promise<CloudAgentTask>;
  abstract getStatus(externalId: string, c: AgentCredentials): Promise<GetStatusResult>;
  abstract approvePlan(externalId: string, c: AgentCredentials): Promise<void>;
  abstract sendMessage(
    externalId: string,
    message: string,
    c: AgentCredentials
  ): Promise<CloudAgentActivity>;
  abstract listSources(
    c: AgentCredentials
  ): Promise<{ name: string; url: string; branch?: string }[]>;

  protected mapStatus(raw: string): CloudAgentStatus; // sezgisel üst sağlayıcı dizesi → enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` kasıtlı olarak hata fırlatır — Codex Cloud planlamayı otomatik olarak yapar ve
onay geçidine sahip değildir. `CodexCloudAgent.listSources`, `[]` döndürür.

`CursorCloudAgent`, Cursor'ın Background / Cloud Agents hizmetini resmî REST
API'si (`api.cursor.com/v0`) üzerinden bir **kullanıcı veya hizmet hesabı API anahtarıyla** çalıştırır — bu,
Cursor IDE'nin OAuth oturumunu yeniden kullanmaya kıyasla daha güvenli ve birinci taraf bir
alternatiftir (yasaklanma riski uyarısı taşıyan `cursor` sağlayıcısı). Bu, yalın bir REST bağdaştırıcısıdır
(yerel `@cursor/sdk` bağımlılığı yoktur). `approvePlan` hata fırlatır (Cursor ajanları otonom olarak çalışır);
`listSources`, anahtarın erişebildiği depoları listeler. Cursor, ortak
`CloudAgentStatus` değerine açıkça eşlenen BÜYÜK HARFLİ durum enum'ları
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`) döndürür. API sürümünün/yolunun kod
değişikliği olmadan düzeltilebilmesi için `baseUrl`, kimlik bilgisi bazında geçersiz kılınabilir.

## Etki Alanı Türleri

Kaynak: `src/lib/cloudAgent/types.ts`

```typescript
export const CLOUD_AGENT_STATUS = {
  QUEUED: "queued",
  RUNNING: "running",
  AWAITING_APPROVAL: "awaiting_approval",
  COMPLETED: "completed",
  FAILED: "failed",
  CANCELLED: "cancelled",
} as const;

export interface CloudAgentSource {
  repoName: string;
  repoUrl: string; // geçerli bir URL olmalıdır
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // saniye, pozitif tam sayı
  cost?: number; // pozitif ondalıklı sayı
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // dâhilî `task_...` kimliği
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // üst sağlayıcının kimliği
  status: CloudAgentStatus;
  prompt: string; // 1..10000 karakter
  source: CloudAgentSource;
  options: {
    autoCreatePr?: boolean;
    planApprovalRequired?: boolean;
    environment?: Record<string, string>;
  };
  result?: CloudAgentResult;
  activities: CloudAgentActivity[];
  error?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}
```

Doğrulama şemaları (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`), türlerle
birlikte dışa aktarılır ve rota işleyicileri tarafından kullanılır.

## Veritabanı

Kaynak: `src/lib/cloudAgent/db.ts` — tablo,
`createCloudAgentTaskTable()` aracılığıyla gerektiğinde oluşturulur (ayrıca modül içe aktarılırken
`src/lib/cloudAgent/index.ts` içinden çağrılır).

```sql
CREATE TABLE IF NOT EXISTS cloud_agent_tasks (
  id           TEXT PRIMARY KEY,
  provider_id  TEXT NOT NULL,
  external_id  TEXT,
  status       TEXT NOT NULL DEFAULT 'queued',
  prompt       TEXT NOT NULL,
  source       TEXT NOT NULL,             -- JSON
  options      TEXT DEFAULT '{}',         -- JSON
  result       TEXT,                       -- JSON
  activities   TEXT DEFAULT '[]',          -- JSON
  error        TEXT,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_provider ON cloud_agent_tasks(provider_id);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_status   ON cloud_agent_tasks(status);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_created  ON cloud_agent_tasks(created_at DESC);
```

`updateCloudAgentTask`, SQL enjeksiyonunu önlemek için bir **sütun izin listesi** uygular:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Kısmi güncellemedeki diğer tüm anahtarlar sessizce yok sayılır.

## REST API — Görev Yaşam Döngüsü

**Kimlik doğrulama:** Tüm `/api/v1/agents/tasks*` uç noktaları **yönetim kimlik doğrulaması**
gerektirir (`requireCloudAgentManagementAuth`,
`src/lib/api/requireManagementAuth` içindeki `requireManagementAuth` işlevini sarmalar).
Bu gereklilik `588a0333` commit'inden sonra uygulanmaktadır
(_"fix(auth): aracı ve bekleme süresi API'leri için yönetim kimlik doğrulaması gerektir"_).

| Yöntem  | Yol                           | Amaç                                                              |
| ------- | ----------------------------- | ----------------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | CORS ön kontrolü                                                  |
| GET     | `/api/v1/agents/tasks`        | Görevleri listele (filtre: `provider`, `status`, `limit≤500`)     |
| POST    | `/api/v1/agents/tasks`        | Görev oluştur (üst sağlayıcıya gönderir + kalıcı olarak saklar)   |
| DELETE  | `/api/v1/agents/tasks?id=...` | Görevi sorgu kimliğine göre sil (üst sağlayıcıda **iptal etmez**) |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | CORS ön kontrolü                                                  |
| GET     | `/api/v1/agents/tasks/[id]`   | Görevi oku + durumu üst sağlayıcıdan tembel olarak eşitle         |
| POST    | `/api/v1/agents/tasks/[id]`   | Eylem: `approve` / `message` / `cancel`                           |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Görevi yol kimliğine göre sil                                     |

### Görev oluşturma

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "providerId": "devin",
    "prompt": "Fix the bug in src/foo.ts where the parser returns null",
    "source": {
      "repoName": "user/repo",
      "repoUrl": "https://github.com/user/repo",
      "branch": "main"
    },
    "options": {
      "autoCreatePr": true,
      "planApprovalRequired": false
    }
  }'
```

`201` yanıtı:

```json
{
  "data": {
    "id": "task_1731512345678_abc123def",
    "providerId": "devin",
    "externalId": "session_xyz",
    "status": "queued",
    "prompt": "...",
    "source": { "repoName": "user/repo", "repoUrl": "...", "branch": "main" },
    "options": { "autoCreatePr": true },
    "createdAt": "2026-05-13T12:34:56.789Z"
  }
}
```

### Planı onaylama

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Takip mesajı gönderme

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### İptal etme (yalnızca yerel durum)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel`, yerel veritabanındaki `status` değerini `"cancelled"` olarak değiştirir ancak
üst sağlayıcıyı **çağırmaz** — `CloudAgentBase` içinde iptal RPC'si yoktur. Üst
sağlayıcıdaki faturalandırmayı durdurmak için görevi sağlayıcının kendi konsolundan sonlandırın.

## REST API — Bulut Sağlayıcısı Altyapısı

`src/app/api/cloud/` altındaki bu yardımcı uç noktalar, uzak istemciler
(CLI, Electron uygulaması veya senkronizasyon çalışanları) tarafından sağlayıcı bağlantı meta verilerini
okumak ve model takma adlarını çözümlemek için kullanılır. Görev uç noktalarının kullandığı yönetim kimlik doğrulamasıyla değil,
`validateApiKey` aracılığıyla **normal bir API anahtarıyla** kimlik doğrulaması yapılır.

| Yöntem | Yol                             | Amaç                                                                                        |
| ------ | ------------------------------- | ------------------------------------------------------------------------------------------- |
| POST   | `/api/cloud/auth`               | API anahtarını doğrula, maskelenmiş bağlantı meta verilerini ve model takma adlarını döndür |
| PUT    | `/api/cloud/credentials/update` | `accessToken` / `refreshToken` / `expiresAt` değerlerini yenile                             |
| POST   | `/api/cloud/model/resolve`      | Bir model takma adını `{ provider, model }` biçiminde çözümle                               |
| GET    | `/api/cloud/models/alias`       | Tüm model takma adlarını listele                                                            |
| PUT    | `/api/cloud/models/alias`       | Bir model takma adı ayarla (ve etkinse Cloud ile otomatik olarak senkronize et)             |

`/api/cloud/auth`, ham `apiKey` / `accessToken` / `refreshToken` değerlerini hiçbir zaman döndürmez.
Bunun yerine `hasApiKey`, `hasAccessToken`, `hasRefreshToken` ve maskelenmiş bir önizleme
(`maskedApiKey`: ilk 4 + `****` + son 4) döndürür.

## Kimlik Bilgilerinin Çözümlenmesi

`src/lib/cloudAgent/api.ts` içindeki `getCloudAgentCredentials(providerId)`:

1. Etkin sağlayıcı bağlantılarını `getProviderConnections({ provider: providerId, isActive: true })` aracılığıyla yükler.
2. Her bağlantı için öncelikle `apiKey` değerini (kırpılmış olarak) tercih eder. Yoksa `accessToken` değerini kullanır.
3. Boş olmayan ilk belirteci `{ apiKey: token }` olarak sarmalanmış biçimde döndürür.
4. Kullanılabilir bir belirteç bulunamazsa `null` döndürür; API, `400` durum koduyla
   `"Bulut aracısı sağlayıcısı için etkin kimlik bilgileri yapılandırılmamış: <id>"` yanıtını verir.

Bu, Cloud Agents'ın normal LLM sağlayıcılarıyla aynı Provider Connection tablosunu yeniden kullandığı
anlamına gelir. Jules'u etkinleştirmek için `provider: "jules"` değerine ve doldurulmuş bir
`apiKey` alanına sahip etkin bir bağlantı oluşturun.

## Kontrol Paneli

Kaynak: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

Aşağıdakileri yapan bir `"use client"` React sayfası:

- Görevleri listeler (`GET /api/v1/agents/tasks` aracılığıyla düzenli olarak sorgulanır).
- `CreateCloudAgentTaskSchema` ile eşleşen bir form aracılığıyla yeni görevler gönderir.
- Durum rozetlerini (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) gösterir ve `activities[]` zaman çizelgesini oluşturur.
- `status === "completed"` olduğunda `result.prUrl` / `commitMessage` / `summary` değerlerini gösterir.

## A2A ile Entegrasyon

Cloud Agents, `tasks/send` işleyicisini `getAgent(...).createTask(...)` çağrısına devreden
ve A2A görev durumu olaylarını JSON-RPC 2.0 protokolüne dönüştüren bir A2A becerisi kaydedilerek
A2A becerileri olarak sunulabilir. Bkz. [A2A-SERVER.md](./A2A-SERVER.md).

## Yeni Bir Cloud Agent Ekleme

1. `CloudAgentBase` sınıfını genişleten `src/lib/cloudAgent/agents/<name>.ts` dosyasını oluşturun.
2. `createTask`, `getStatus`, `approvePlan` (veya uygulanabilir değilse hata fırlatın),
   `sendMessage`, `listSources` yöntemlerini uygulayın. Durum normalleştirmesi için `this.mapStatus(...)` kullanın.
3. `src/lib/cloudAgent/registry.ts` içinde kararlı bir `providerId` altında kaydedin.
4. `src/lib/cloudAgent/types.ts` içindeki `providerId` sabit değer birleşimini
   (`CloudAgentTask.providerId` ve `CreateCloudAgentTaskSchema`) genişletin.
5. Bir bağlantı kaydına ihtiyaç duyuyorsa sağlayıcıyı `src/shared/constants/providers.ts` dosyasına
   ekleyin. OAuth tabanlı sağlayıcılar için ayrıca `src/lib/oauth/providers/` gerekir.
6. `tests/unit/cloud-agent-*.test.ts` altında testler ekleyin.
7. Bu belgeyi ve kontrol panelindeki `CLOUD_AGENTS` sabitini güncelleyin.

## Yapılandırma

| Ortam Değişkeni  | Amaç                                                                         |
| ---------------- | ---------------------------------------------------------------------------- |
| `DATA_DIR`       | `cloud_agent_tasks` tablosunu içeren SQLite veritabanının konumu             |
| `JWT_SECRET`     | Görev uç noktalarında yönetim kimlik doğrulaması için gereklidir             |
| `API_KEY_SECRET` | Sağlayıcı bağlantısı kimlik bilgilerini beklemede şifrelemek için gereklidir |

Şu anda Cloud-Agent'a özgü ortam değişkenleri yoktur — tüm gizli bilgiler
`provider_connections` tablosunda bulunur.

## Ayrıca Bakınız

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Kaynak: `src/lib/cloudAgent/`
- Rotalar: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Kontrol Paneli: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
