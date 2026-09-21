# Skills Framework (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Doğruluk kaynağı:** `src/lib/skills/` ve `src/app/api/skills/`
> **Son güncelleme:** 2026-06-28 — v3.8.40

OmniRoute, dil modellerinin (ve operatörlerin) yeniden kullanılabilir yetenekler oluşturmasına olanak tanıyan genişletilebilir bir Skills çerçevesi sunar — dosya sistemi okumalarından ve HTTP isteklerinden korumalı alanlarda kod yürütmeye ve özenle seçilmiş pazaryeri becerilerine kadar.

Bir beceri; sürümlendirilmiş, şemayla tanımlanmış bir iş birimidir. OmniRoute, becerileri araç tanımları olarak giden isteklere enjekte edebilir, modelden dönen araç çağrılarını yakalayabilir, eşleşen işleyiciyi çalıştırabilir ve konuşmanın devam edebilmesi için sonucu modele geri iletebilir. Model, uygulamayı hiçbir zaman görmez — yalnızca araç arayüzünü görür.

---

## Agent Skills ve Omni Skills

OmniRoute, birbirinden farklı ancak birbirini tamamlayan iki beceri sistemine sahiptir:

| Boyut               | **Omni Skills** (bu belge)                                         | **Agent Skills**                                                                               |
| :------------------ | :----------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| Amaç                | LLM aracı enjeksiyonu + korumalı alanda yürütme                    | Harici aracıların keşfedip kullanabileceği SKILL.md kataloğu                                   |
| Doğruluk kaynağı    | `src/lib/skills/` + pazaryeri                                      | `src/lib/agentSkills/` + `skills/` dizini                                                      |
| Çalışma zamanı modu | Giden isteklere enjekte edilir, araç çağrısı olaylarında yürütülür | Statik markdown kataloğu + REST/MCP/A2A keşif uç noktaları                                     |
| Kim kullanır        | OmniRoute'un kendisi (birleşik yönlendirme, gelen LLM çağrıları)   | Harici aracılar, MCP istemcileri, A2A orkestratörleri                                          |
| Sayı                | Değişken (pazaryerine bağlı)                                       | 45 katalog girdisi (23 API + 21 CLI + 1 yapılandırma)                                          |
| Biçim               | Araç şeması + işleyici içeren `SkillDefinition`                    | `SKILL.md` ön bilgisi + markdown gövdesi                                                       |
| Keşif               | `/api/skills/*` REST + `omniroute_skills_*` MCP araçları           | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP araçları + A2A `list-capabilities` |

**Omni Skills**, yürütme motorudur — bir LLM bir aracı çağırdığında OmniRoute'un _neler yapabileceğini_ tanımlar.

**Agent Skills**, dokümantasyon kataloğudur — doğrudan aracı istemlerine aktarılabilen yapılandırılmış SKILL.md dosyalarıyla harici aracılara OmniRoute'un REST API'sinin ve CLI'ının _nasıl kullanılacağını_ açıklar.

Agent Skills kataloğu, oluşturucusu, MCP araçları ve A2A becerisi için [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md) belgesine bakın.

---

## Kavramlar

### Beceri Kaynakları

Aynı kayıt defterinde üç beceri kaynağı birlikte bulunur:

1. **Yerleşik beceriler** (`src/lib/skills/builtins.ts`) — OmniRoute ile birlikte sunulur. Yaygın kullanım alanlarını kapsar:
   - `file_read`, `file_write` — `<DATA_DIR>/skills/workspaces/<hashed-key>/` altında API anahtarı başına korumalı alan çalışma dizini
   - `http_request` — `guard: "public-only"` ile `safeOutboundFetch` üzerinden giden HTTP
   - `web_search` — önbelleğe alma özellikli takılabilir arama sağlayıcısı (`executeWebSearch`)
   - `eval_code` — Docker korumalı alanında `node` veya `python` yürütme
   - `execute_command` — Docker korumalı alanında kabuk komutu
   - `browser` — Playwright destekli iskelet; varsayılan olarak devre dışıdır (`builtin/browser.ts`)
2. **SkillsMP** (OmniRoute Pazaryeri) — `https://skillsmp.com/api/v1/skills/search` adresinden alınır. Ayarlar'da `skillsmpApiKey` gerektirir.
3. **SkillsSH** (`skills.sh` topluluk kataloğu) — `https://skills.sh/api/search` adresinden alınır. Kimlik doğrulaması gerekmez; SKILL.md içeriği GitHub raw üzerinden alınır.

Tek bir "etkin sağlayıcı", panonun hangi katalogdan kurulum yapacağını belirler (`src/lib/skills/providerSettings.ts`). Bunu **Ayarlar → Bellek ve Beceriler** altında değiştirebilirsiniz. Varsayılan: `skillsmp`.

### Beceri Kimliği

Beceriler, bellek içi kayıt defterinde (`src/lib/skills/registry.ts`) `name@version` ile anahtarlanır. Sürüm semver biçiminde (`^\d+\.\d+\.\d+$`) olmalıdır. `resolveVersion()`, `^`, `~`, `>`, `>=`, `<`, `<=`, `==` ve tam eşleşme kısıtlamalarını destekler.

### Beceri Modu

Her beceri, ne zaman enjekte edileceğini belirleyen bir çalışma zamanı moduna sahiptir:

| Mod    | Davranış                                                                                              |
| ------ | ----------------------------------------------------------------------------------------------------- |
| `on`   | Her zaman araç tanımı olarak enjekte edilir                                                           |
| `off`  | Hiçbir zaman enjekte edilmez veya yürütülemez                                                         |
| `auto` | Gelen isteğe göre puanlanır; yalnızca puan ≥ `AUTO_MIN_SCORE` (varsayılan 3) olduğunda enjekte edilir |

`auto`, pazaryerinden kurulan beceriler için varsayılandır. `enabled=true` ve `mode="off"` birlikte "kayıtlı ancak etkin değil" anlamına gelir — eski kod yollarının tutarlı kalması için eski sütun üzerinden `enabled` değeri değiştirildiğinde `mode` da güncellenir (`src/app/api/skills/[id]/route.ts`).

### Durum (yürütmeler)

Beceri yürütmeleri, aşağıdaki durumlarla `skill_executions` tablosunda izlenir (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Kayıt Defteri Önbelleği

`SkillRegistry`, 60 saniyelik TTL önbelleğine sahip bir singleton'dır (`registry.ts:14`). `loadFromDatabase()` eşgüçlüdür ve `pendingLoad` aracılığıyla eşzamanlı çağrılardaki yinelenen işlemleri kaldırır. Her yazma işlemi (`register`/`unregister`/`unregisterById`) önbelleği geçersiz kılar. Sürümleri `getSkillVersions(name)` ve `resolveVersion(name, constraint)` aracılığıyla arayın.

### Sağlayıcıya Duyarlı Enjeksiyon

`src/lib/skills/injection.ts` içindeki `injectSkills()`, kayıtlı becerileri sağlayıcıya özgü araç tanımlarına dönüştüren giriş noktasıdır:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Araç adı, model aracı geri çağırdığında işleyicinin doğru sürümü seçebilmesi için `name@version` biçiminde kodlanır.

### AUTO Puanlaması

`mode="auto"` olduğunda, her aday beceri istek bağlamına göre puanlanır (`injection.ts` içindeki `scoreAutoSkill()`):

| Sinyal                                                       | Puan               |
| ------------------------------------------------------------ | ------------------ |
| Beceri adı bağlamda aynen geçiyor                            | +6                 |
| Eşleşen her ad belirteci                                     | +2                 |
| Bağlamla eşleşen her etiket alt dizesi                       | +3                 |
| Bağlamla eşleşen her açıklama belirteci                      | +1                 |
| Bir ad belirteciyle eşleşen arka plan gerekçesi              | Belirteç başına +2 |
| Bir etiketle eşleşen arka plan gerekçesi                     | Belirteç başına +2 |
| Etiketlerdeki sağlayıcı ipucu istek sağlayıcısıyla eşleşiyor | +2 / −2            |

`score >= AUTO_MIN_SCORE = 3` olan en yüksek puanlı `AUTO_MAX_SKILLS = 5` beceri eklenir. Eşitlikler önce `installCount` değerine göre (azalan), ardından alfabetik ada göre bozulur (`injection.ts:225-235`).

### Araç Çağrısı Yakalama

`src/lib/skills/interception.ts` içindeki `handleToolCallExecution()`, üst sağlayıcı araç çağıran bir yanıt döndürdükten sonra sohbet işleyicisi tarafından çağrılır:

1. `extractToolCalls()`, sağlayıcıya özgü yapıları okur (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Önce yerleşik araç takma adları (ör. `omniroute_web_search` → `web_search`) çözümlenir. Yerleşik işleyiciler satır içinde çalıştırılır.
3. Diğer her şey `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })` üzerinden yönlendirilir.
4. Sonuçlar uygun biçimde yanıta geri eklenir: `tool_results`, `function_call_output` öğeleri veya Anthropic `tool_result` blokları.

Yürütme bağlamındaki `customSkillExecutionEnabled`, yalnızca yerleşik yakalamaya izin vermek için `false` olarak ayarlanabilir (kullanıcı tanımlı işleyicileri açıkça devre dışı bırakan istek yolları tarafından kullanılır).

---

## Docker Korumalı Alanı

Yerleşik olmayan kod yolları (`eval_code`, `execute_command`), `SandboxRunner` (`src/lib/skills/sandbox.ts`) aracılığıyla Docker içinde çalışır. Her konteyner şu seçeneklerle başlatılır:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (readOnly=true olduğunda)
```

Varsayılanlar (`SandboxRunner.DEFAULT_CONFIG`):

| Alan             | Varsayılan      | Notlar                                                  |
| ---------------- | --------------- | ------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | `--cpus` seçeneğine aktarılmadan önce 1000'e bölünür    |
| `memoryLimit`    | 256 MB          | Kesin sınır                                             |
| `timeout`        | 30000 ms        | `SIGTERM` + `docker kill` ile kontrollü sonlandırma     |
| `networkEnabled` | `false`         | `--network none` olur                                   |
| `readOnly`       | `true`          | Kök FS salt okunurdur; `/tmp` ve `/workspace` tmpfs'tir |

Kapatma işlemleri için `SandboxRunner.kill(id)` ve `killAll()` kullanıma sunulur; çalışan konteynerler `runningContainers: Map<string, ChildProcess>` içinde izlenir.

### Korumalı Alan Ortam Değişkenleri

`src/lib/skills/builtins.ts` içindeki `process.env` aracılığıyla yapılandırılır:

| Ortam Değişkeni                   | Varsayılan       | Amaç                                                                                          |
| --------------------------------- | ---------------- | --------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | `file_read` ve `file_write` için sınır                                                        |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | `http_request` yanıt gövdesi için sınır                                                       |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Çağırana döndürülen stdout/stderr için sınır                                                  |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Korumalı alandaki komutlar için varsayılan zaman aşımı; en fazla 60 s                         |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Dış erişim için ana geçit. Çağrı bazında etkinleştirmek için `1` veya `true` olarak ayarlayın |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (aşağıya bakın)  | Docker imajlarının virgülle ayrılmış izin listesi                                             |

Varsayılan izin verilen imajlar: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. `SKILLS_ALLOWED_SANDBOX_IMAGES` aracılığıyla yapılan eklemeler varsayılanlarla birleştirilir; bilinmeyen imajlar `normalizeImage()` tarafından reddedilir.

> Not: Ayrı bir `SKILLS_EXECUTION_TIMEOUT_MS` ortam değişkeni yoktur. Korumalı alan dışındaki işleyicinin zaman aşımı, `SkillExecutor` içinde (`executor.ts:13`) 30 s olarak sabit kodlanmıştır; ancak çalışma zamanında `skillExecutor.setTimeout(ms)` aracılığıyla geçersiz kılınabilir.

### Çalışma Alanı Yalıtımı

`file_read` ve `file_write`, her yolu `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/` konumundaki API anahtarı başına ayrılmış çalışma alanına göre çözümler. Yol geçişi (`..`) ve yasaklı bölümler (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`), herhangi bir disk G/Ç işleminden önce reddedilir.

### HTTP Güçlendirmesi

`http_request` (`builtins.ts:257`):

- Yöntem izin listesi: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Engellenen giden başlıklar: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Yönlendirmeler devre dışıdır (`allowRedirect: false`)
- `guard: "public-only"` ile `safeOutboundFetch` üzerinden yönlendirilir (özel/geri döngü aralıkları engellenir)
- Yanıt `SKILLS_MAX_HTTP_RESPONSE_BYTES` değerinde kesilir; istemci `truncated: true` görür

---

## Hibrit Yürütücü (önizleme)

`src/lib/skills/hybrid.ts`, her çağrı için `direct` (işlem içi) ve `sandbox` yürütme arasında karar veren, zaman aşımı/bellek hatalarında `autoUpgrade` yeniden deneme yoluna sahip bir `HybridExecutor` tanımlar. Bağlı `directExecutor` / `sandboxRunner` uygulamaları taslaktır (`executeDirect`, `executeInSandbox` yer tutucu nesneler döndürür) — bu modülü yapım aşamasındaki bir sözleşme olarak değerlendirin. Gerçek yürütme hâlâ `skillExecutor` + `SandboxRunner` üzerinden gerçekleştirilir.

---

## Depolama

Şema iki migration içinde bulunur:

- `src/lib/db/migrations/016_create_skills.sql` — temel `skills` ve `skill_executions` tabloları; `(api_key_id, name)` ve `(skill_id, status, created_at)` üzerinde indeksler içerir.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — `skills` tablosuna `mode`, `source_provider`, `tags` (JSON), `install_count` alanlarını ekler.

`skill_executions.status`, veritabanı düzeyinde şu şekilde kısıtlanmıştır: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Tüm uç noktalar `src/app/api/skills/` altında bulunur. Yönetim uç noktaları (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`), `requireManagementAuth()` aracılığıyla **yönetim kimlik doğrulaması** gerektirir. Pazar yeri/kurulum akışları daha hafif olan `isAuthenticated()` yöntemini (oturum veya API anahtarı) kullanır.

| Uç nokta | Yöntem | Amaç |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Kayıtlı becerileri listeler. `?q=`, `?mode=on                        | off | auto`, `?source=skillsmp | skillssh | local` ve sayfalandırmayı destekler |
| `/api/skills/[id]` | PUT | `enabled` veya `mode` alanını günceller |
| `/api/skills/[id]` | DELETE | Kimliğe göre kaydı kaldırır |
| `/api/skills/install` | POST | Özel bir beceri kurar (işleyici kodu + şema) |
| `/api/skills/marketplace` | GET | SkillsMP kataloğunda arama yapar (`q` boş olduğunda popüler varsayılanları döndürür) |
| `/api/skills/marketplace/install` | POST | Bir SkillsMP becerisi kurar (etkin sağlayıcının `skillsmp` olmasını gerektirir) |
| `/api/skills/skillssh` | GET | skills.sh kataloğunda arama yapar (`?q=&limit=`, üst sınır 100) |
| `/api/skills/skillssh/install` | POST | Bir skills.sh becerisi kurar (etkin sağlayıcının `skillssh` olmasını gerektirir) |
| `/api/skills/executions` | GET | Sayfalandırılmış yürütme geçmişi (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Kayıtlı bir beceriyi özel amaçlı olarak yürütür |

`POST /api/skills/executions` uç noktası, `settings.skillsEnabled === false` olduğunda (`executor.ts:42-45`) `{ error: "Skills execution is disabled..." }` ile birlikte HTTP `503` döndürür. Operatörler ana anahtarı **Ayarlar → Yapay Zekâ** bölümünden değiştirebilir.

### Örnek: özel bir beceri kurma

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Reverses a string",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

`handlerCode` dizesi bir **işleyici adı aramasıdır** — yürütülebilir kod değildir. Yürütücü bunu `skillExecutor.registerHandler(name, fn)` aracılığıyla eşler (`executor.ts:25`). Pazar yeri kurulumları, SKILL.md metnini belge olarak bu alanda depolar ve yürütmeyi model tarafından oluşturulan araç çağrıları üzerinden yönlendirir. Kullanıcı tarafından sağlanan rastgele kaynak kodu eval ile değerlendirilmez.

---

## MCP Araçları

Dört MCP aracı, beceri yüzeyini sarmalar (`open-sse/mcp-server/tools/skillTools.ts`). MCP sunucusu başlatıldığında otomatik olarak kaydedilirler.

| Araç                          | Açıklama                                                                   |
| ----------------------------- | -------------------------------------------------------------------------- |
| `omniroute_skills_list`       | Becerileri listeler; isteğe bağlı filtreler: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Bir beceriyi `skillId` ile etkinleştirir/devre dışı bırakır                |
| `omniroute_skills_execute`    | Bir beceriyi girdi yüküyle çalıştırır                                      |
| `omniroute_skills_executions` | Son çalıştırma geçmişi (varsayılan 50, en fazla 100)                       |

Aktarım kurulumu ve kapsam atamaları için [MCP-SERVER.md](./MCP-SERVER.md) belgesine bakın.

---

## A2A Entegrasyonu

`src/lib/skills/a2a.ts`, `memory_aware_routing` A2A beceri tanımlayıcısını ve bir `registerA2ASkill(registry)` yardımcısını dışa aktarır. Özel A2A becerileri `src/lib/a2a/skills/` altında bulunur ve `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`) aracılığıyla yönlendirilir. Görevin tüm yaşam döngüsü için [A2A-SERVER.md](./A2A-SERVER.md) belgesine bakın.

---

## Yeni Bir Yerleşik Beceri Ekleme

1. **İşleyiciyi tanımlayın:** `src/lib/skills/builtins.ts` içinde (veya `src/lib/skills/builtin/` altındaki eş düzey bir dosyada). İmza: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Korumalı alan kod yolu mu?** `sandboxRunner.run(image, command, env, sandboxConfig({...}))` çağrısını yapın. İzin verilenler listesine göre `normalizeImage()` kullanın.
3. **Dosya sistemi yolu mu?** Diske erişmeden önce yolu her zaman `resolveWorkspacePath(input, context)` üzerinden geçirin.
4. **Ağ çağrısı mı?** `guard: "public-only"` ile `safeOutboundFetch` kullanın; üstbilgileri `sanitizeHeaders()` ile temizleyin.
5. **Kaydedin:** Girdiyi `builtinSkills` içine ekleyin (veya başlangıçta `registerBrowserSkill(executor)` benzeri bir çağrı yapın).
6. Üst akış modeli farklı bir ad yayıyorsa `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) içinde **yerleşik araç takma adlarını bağlayın** (isteğe bağlı).
7. `src/lib/skills/__tests__/` içinde **testler** ekleyin (Vitest).

---

## Özel (Yerleşik Olmayan) Bir Beceri Ekleme

1. İşleyiciyi süreç başlangıcında kaydedin:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Beceriyi `POST /api/skills/install` aracılığıyla ekleyin (`handlerCode` alanı, kayıtlı işleyici adıyla eşleşmelidir).
3. `PUT /api/skills/[id]` aracılığıyla `mode` değerini `on` veya `auto` olarak değiştirin.

---

## Operasyonel İpuçları

- **Ana anahtar:** `settings.skillsEnabled = false`, tüm çalıştırmaları engeller ve `/api/skills/executions` üzerinde HTTP `503` döndürür. Kayıt defteri yüklenmeye devam eder.
- **Dışa giden trafiği kısıtlayın:** Tamamen ağdan yalıtılmış korumalı alan kullanımı için `SKILLS_SANDBOX_NETWORK_ENABLED` değişkenini ayarlamadan bırakın (varsayılan). Çağrı başına `networkEnabled: true` ayarı yine de ana geçidin etkin olmasını gerektirir.
- **Belirli imajlara izin verin:** İzin verilenler listesini genişletmek için `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` ayarını yapın.
- **Çalıştırmaları denetleyin:** Hem `/dashboard/skills/executions` hem de `omniroute_skills_executions`, `skill_executions` tablosunu sorgular. Başarılı çalıştırmalar `durationMs`, başarısız olanlar ise `errorMessage` içerir.
- **Önbellek geçersiz kılma:** Manuel DB düzenlemelerinden sonra `skillRegistry.invalidateCache()` çağrısını yapın; aksi takdirde 60 s bekleyin.
- **Anonim çalışma alanı:** `apiKeyId` boş olduğunda tüm çağrılar aynı `"anonymous"` çalışma alanına özetlenir — paylaşımı dikkate alan kod her zaman gerçek bir anahtar iletmelidir.

---

## Yürütme Yaşam Döngüsü (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`), her beceri çağrısını yöneten bir **singleton**'dır. Yaşam döngüsünü anlamak; zaman aşımlarında, yeniden denemelerde ve yürütme durumunda hata ayıklamak açısından kritik öneme sahiptir.

### 5 Aşamalı Yaşam Döngüsü

```
   execute() çağrıldı
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← kuyruğa alındı, henüz başlatılmadı (DB satırı oluşturuldu)
  └──────┬──────┘
         │ işleyiciyi başlat
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← işleyici zaman aşımıyla çağrıldı
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (başka yol yok — üst süreç tarafından sonlandırıldı)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   DB satırı durum, çıktı ve durationMs ile güncellendi
```

### Varsayılan Yapılandırma

| Ayar         | Varsayılan    | Şununla yapılandırılabilir           |
| ------------ | ------------- | ------------------------------------ |
| `timeout`    | `30000` (30s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`           | `skillExecutor.setMaxRetries(count)` |

> **Önemli**: Yürütücü bir singleton'dır — `setTimeout()` çağrısı, sonraki tüm çağrıları global olarak etkiler. Beceri başına zaman aşımı şu anda desteklenmemektedir; beceri başına farklı zaman aşımlarına ihtiyacınız varsa ayrı süreçler başlatın veya yürütücüyü çatallayın.

### Durum Değerleri

`src/lib/skills/types.ts` dosyasından:

```ts
enum SkillStatus {
  PENDING = "pending", // Kuyruğa alındı, henüz başlatılmadı
  RUNNING = "running", // İşleyici çağrıldı
  SUCCESS = "success", // İşleyici geçerli çıktı döndürdü
  ERROR = "error", // İşleyici bir istisna fırlattı
  TIMEOUT = "timeout", // Yürütücünün zaman aşımı süresini aştı
}
```

> **Not**: `TIMEOUT` durumu enum içinde tanımlanmıştır ancak mevcut yürütücü uygulaması tarafından **DB'ye gerçekte yazılmaz** — zaman aşımları, `"Skill execution timed out"` mesajıyla `ERROR` olarak görünür. Durum enum'u gelecekte kullanılmak üzere ayrılmıştır.

### Yürütmeleri İnceleme

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Belirli bir yürütmeyi ID ile al
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Bir API anahtarının son yürütmelerini listele
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Toplam yürütme sayısını al
const total = skillExecutor.countExecutions("api-key-id");
```

### Yeniden Deneme Davranışı

`maxRetries` ayarı saklanır ancak yürütücünün `execute()` yöntemi tarafından **şu anda kullanılmaz** — yalnızca tek bir deneme gerçekleştirir. `maxRetries` değeri, gelecekteki uygulamalar ve bu değeri okumak isteyen hook'lar için kullanıma sunulur.

Şimdilik yeniden denemeler, beceri işleyicisinin kendi içinde uygulanmalıdır. Yerleşik
beceriler yürütücüye kaydedilir (ör. `src/lib/skills/builtin/` içindeki `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)`); kaydettiğiniz işleyici, kendi yeniden deneme
döngüsünü kapsülleyebilir:

```ts
// bir beceri işleyicisinin içinde
async function handler(input, ctx) {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchSomething(input);
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
  }
  throw lastError;
}
```

---

## SkillMode Ayrıntıları

`SkillMode` enum'u (`src/lib/skills/types.ts`), becerilerin **ne zaman ve nasıl** çağrılacağını denetler:

```ts
enum SkillMode {
  AUTO = "auto", // Beceriye ne zaman çağrı yapılacağına LLM karar verir
  MANUAL = "manual", // Yalnızca açık bir kullanıcı isteğiyle çağrılır
  HYBRID = "hybrid", // AUTO puanlaması + manuel geçersiz kılma
}
```

> **Not**: Kod tabanı `SkillMode`'u (AUTO/MANUAL/HYBRID) tanımlarken `Skill.mode` alanı farklı bir yapı (`"on" | "off" | "auto"`) kullanır. Bunlar birbiriyle ilişkilidir ancak aynı değildir — `SkillMode` yürütücü politikası, `Skill.mode` ise beceri bazında etkinleştirme içindir.

### Her Mod Ne Zaman Kullanılmalı?

| Mod      | LLM davranışı                                                                   | Kullanım alanı                                       |
| -------- | ------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `AUTO`   | LLM gerekli gördüğünde beceriyi çağırabilir                                     | Genel amaçlı beceriler (dosya okuma, HTTP istekleri) |
| `MANUAL` | LLM beceriyi çağıramaz; yalnızca açık bir `executeSkill` API çağrısı çalıştırır | Hassas işlemler (veritabanına yazma, ödemeler)       |
| `HYBRID` | LLM beceriyi önerebilir; kullanıcının onaylaması gerekir                        | Yan etkileri olan ancak tehlikeli olmayan beceriler  |

### AUTO Puanlaması

`AUTO` modu etkinken her aday beceri, `src/lib/skills/injection.ts` içindeki
`scoreAutoSkill()` tarafından istek bağlamına göre puanlanır — toplamalı,
tam sayı tabanlı bir puan sistemi kullanılır (beceri adı eşleşmesi, ad/etiket/açıklama
belirteci örtüşmesi, arka plan nedeni ipuçları, sağlayıcı ipucu bonusu/cezası).
`score >= AUTO_MIN_SCORE = 3` olan en yüksek puanlı
`AUTO_MAX_SKILLS = 5` beceri çağrılabilir araçlar olarak eklenir; eşitlikler önce
`installCount`, ardından ad kullanılarak bozulur. Puanların tam tablosu için bu
belgenin önceki bölümündeki [**Araç Şeması Oluşturma → AUTO Puanlaması**](#auto-scoring)
kısmına bakın; kayan noktalı `0.6` tarzı bir eşik ve `registry.ts` puanlaması yoktur.

---

## Yerleşik Beceriler Kataloğu

OmniRoute, `src/lib/skills/builtin/` içinde özenle seçilmiş bir dizi yerleşik beceriyle birlikte gelir. En yaygın olanlar:

### Tarayıcı Otomasyonu Becerisi

Tarayıcı becerisi (`src/lib/skills/builtin/browser.ts`), Playwright/Puppeteer aracılığıyla başsız tarayıcı otomasyonu sağlar. **Uygulanmıştır ancak varsayılan beceriler kataloğunda yer almaz** — kullanmak için tarayıcı uzantısı eklentisini ayrıca yükleyin.

```ts
// Yapılandırmanızda etkinleştirin
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Her zaman açık çağrı gerektir
  allowedSkills: ["browser"],
  timeout: 60000, // Sayfa yüklemeleri için 60 sn.
  maxRetries: 1,
};
```

### Diğer Yerleşik Kategoriler

| Kategori    | Beceriler                                    | Mod    |
| ----------- | -------------------------------------------- | ------ |
| Dosya G/Ç   | `file_read`, `file_write`                    | AUTO   |
| HTTP        | `http_request`                               | AUTO   |
| Arama       | `web_search`                                 | AUTO   |
| Kod Yürütme | `eval_code` (yalıtılmış JavaScript/Python)   | HYBRID |
| Sistem      | `execute_command` (yalıtılmış CLI yürütmesi) | MANUAL |

### Özel Bir Beceri Ekleme

Eklenti sistemi aracılığıyla özel bir becerinin nasıl ekleneceğini öğrenmek için [Eklenti SDK'sı ve Beceri Entegrasyonu](./PLUGIN_SDK.md) belgesine bakın.

---

## Ayrıca Bakınız

- [MCP-SERVER.md](./MCP-SERVER.md) — MCP araç kaydı ve aktarımlar
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A görev yaşam döngüsü ve beceri yönlendirme
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — kullanıcıya yönelik giriş
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — istek işlem hattı ve bileşen haritası
- Kaynak: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Testler: `src/lib/skills/__tests__/integration.test.ts`
