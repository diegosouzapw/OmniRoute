# Skills Framework (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Həqiqət mənbəyi:** `src/lib/skills/` və `src/app/api/skills/`
> **Son yenilənmə:** 2026-06-28 — v3.8.40

OmniRoute dil modellərinə (və operatorlara) təkrar istifadə edilə bilən imkanlar yaratmağa şərait yaradan genişləndirilə bilən Bacarıqlar çərçivəsini təqdim edir — fayl sistemi oxumalarından və HTTP sorğularından tutmuş izolyasiya edilmiş kod icrasına və seçilmiş marketplace bacarıqlarına qədər.

Bacarıq versiyalaşdırılmış, sxemlə müəyyən edilmiş iş vahididir. OmniRoute bacarıqları alət tərifləri kimi gedən sorğulara daxil edə, modeldən geri gələn alət çağırışlarını ələ keçirə, uyğun emalçını işə sala və nəticəni modelə geri ötürə bilər ki, söhbət davam etsin. Model heç vaxt reallaşdırmanı görmür — yalnız alət interfeysini görür.

---

## Agent Skills və Omni Skills

OmniRoute bir-birindən fərqli, lakin bir-birini tamamlayan iki bacarıq sisteminə malikdir:

| Ölçü              | **Omni Skills** (bu sənəd)                                            | **Agent Skills**                                                                               |
| :---------------- | :-------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| Məqsəd            | LLM alətlərinin daxil edilməsi + izolyasiya edilmiş icra              | Xarici agentlərin aşkarlaması və istifadə etməsi üçün SKILL.md kataloqu                        |
| Həqiqət mənbəyi   | `src/lib/skills/` + marketplace                                       | `src/lib/agentSkills/` + `skills/` qovluğu                                                     |
| İş vaxtı rejimi   | Gedən sorğulara daxil edilir, alət çağırışı hadisələrində icra olunur | Statik markdown kataloqu + REST/MCP/A2A aşkarlama son nöqtələri                                |
| Kim istifadə edir | OmniRoute özü (combo marşrutlaşdırması, daxil olan LLM çağırışları)   | Xarici agentlər, MCP müştəriləri, A2A orkestratorları                                          |
| Say               | Dəyişkən (marketplace tərəfindən müəyyən edilir)                      | 45 kataloq qeydi (23 API + 21 CLI + 1 konfiqurasiya)                                           |
| Format            | Alət sxemi + emalçı ilə `SkillDefinition`                             | `SKILL.md` ön maddəsi + markdown məzmunu                                                       |
| Aşkarlama         | `/api/skills/*` REST + `omniroute_skills_*` MCP alətləri              | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP alətləri + A2A `list-capabilities` |

**Omni Skills** icra mühərrikidir — LLM aləti çağırdıqda OmniRoute-un _nə edə biləcəyini_ müəyyən edir.

**Agent Skills** sənədləşdirmə kataloqudur — onlar birbaşa agent göstərişlərinə ötürülə bilən strukturlaşdırılmış SKILL.md faylları vasitəsilə xarici agentlərə OmniRoute-un REST API və CLI interfeysindən _necə istifadə etməyi_ izah edir.

Agent Skills kataloqu, generatoru, MCP alətləri və A2A bacarığı üçün [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md) sənədinə baxın.

---

## Anlayışlar

### Bacarıq mənbələri

Eyni reyestrdə üç bacarıq mənbəyi birlikdə mövcuddur:

1. **Daxili bacarıqlar** (`src/lib/skills/builtins.ts`) — OmniRoute ilə birlikdə təqdim olunur. Ümumi istifadə hallarını əhatə edir:
   - `file_read`, `file_write` — `<DATA_DIR>/skills/workspaces/<hashed-key>/` altında hər API açarı üçün ayrıca izolyasiya edilmiş iş sahəsi
   - `http_request` — `guard: "public-only"` ilə `safeOutboundFetch` üzərindən gedən HTTP sorğuları
   - `web_search` — keşləmə ilə dəyişdirilə bilən axtarış provayderi (`executeWebSearch`)
   - `eval_code` — Docker-də izolyasiya edilmiş `node` və ya `python` icrası
   - `execute_command` — Docker-də izolyasiya edilmiş shell əmrinin icrası
   - `browser` — Playwright əsaslı ilkin struktur, standart olaraq deaktivdir (`builtin/browser.ts`)
2. **SkillsMP** (OmniRoute Marketplace) — `https://skillsmp.com/api/v1/skills/search` ünvanından əldə edilir. Parametrlərdə `skillsmpApiKey` tələb olunur.
3. **SkillsSH** (`skills.sh` icma kataloqu) — `https://skills.sh/api/search` ünvanından əldə edilir. Autentifikasiya tələb olunmur; SKILL.md məzmunu birbaşa GitHub raw-dan alınır.

Tək bir "aktiv provayder" idarəetmə panelinin hansı kataloqdan quraşdırma apardığını idarə edir (`src/lib/skills/providerSettings.ts`). Onu **Parametrlər → Yaddaş və Bacarıqlar** bölməsində dəyişdirin. Standart: `skillsmp`.

### Bacarıq identikliyi

Bacarıqlar yaddaşdaxili reyestrdə (`src/lib/skills/registry.ts`) `name@version` ilə açarlanır. Versiya semver formatında olmalıdır (`^\d+\.\d+\.\d+$`). `resolveVersion()` `^`, `~`, `>`, `>=`, `<`, `<=`, `==` və dəqiq uyğunluq məhdudiyyətlərini anlayır.

### Bacarıq rejimi

Hər bacarığın onun nə vaxt daxil ediləcəyini idarə edən iş vaxtı rejimi var:

| Rejim  | Davranış                                                                                                           |
| ------ | ------------------------------------------------------------------------------------------------------------------ |
| `on`   | Həmişə alət tərifi kimi daxil edilir                                                                               |
| `off`  | Heç vaxt daxil edilmir və heç vaxt icra edilə bilməz                                                               |
| `auto` | Daxil olan sorğuya əsasən qiymətləndirilir; yalnız xal ≥ `AUTO_MIN_SCORE` (standart olaraq 3) olduqda daxil edilir |

`auto` marketplace-dən quraşdırılmış bacarıqlar üçün standart rejimdir. `enabled=true` və `mode="off"` birlikdə "qeydiyyata alınıb, lakin aktiv deyil" deməkdir — köhnə kod yollarının uyğunluğunu qorumaq üçün köhnə sütun vasitəsilə `enabled` dəyişdirildikdə `mode` da yenilənir (`src/app/api/skills/[id]/route.ts`).

### Status (icralar)

Bacarıq icraları `skill_executions` cədvəlində aşağıdakı statuslarla izlənilir (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Reyestr keşi

`SkillRegistry` 60 saniyəlik TTL keşinə malik singleton-dur (`registry.ts:14`). `loadFromDatabase()` idempotentdir və `pendingLoad` vasitəsilə eyni vaxtda edilən çağırışların təkrarlanmasını aradan qaldırır. İstənilən yazma əməliyyatı (`register`/`unregister`/`unregisterById`) keşi etibarsızlaşdırır. Versiyaları `getSkillVersions(name)` və `resolveVersion(name, constraint)` vasitəsilə axtarın.

### Provayderdən asılı daxiletmə

`src/lib/skills/injection.ts` daxilindəki `injectSkills()` qeydiyyata alınmış bacarıqları provayderə xas alət təriflərinə çevirən giriş nöqtəsidir:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Alət adı `name@version` kimi kodlaşdırılır ki, model onu geri çağırdıqda emalçı düzgün versiyanı seçə bilsin.

### AUTO Qiymətləndirilməsi

`mode="auto"` olduqda, hər bir namizəd bacarıq sorğu kontekstinə əsasən qiymətləndirilir (`injection.ts` faylındakı `scoreAutoSkill()`):

| Siqnal                                                 | Xallar        |
| ------------------------------------------------------ | ------------- |
| Bacarıq adı kontekstdə olduğu kimi görünür             | +6            |
| Hər ad tokeni kontekst tokeninə uyğun gəlir            | +2            |
| Hər teq alt sətri kontekstlə uyğun gəlir               | +3            |
| Hər təsvir tokeni kontekstlə uyğun gəlir               | +1            |
| Arxa plan səbəbi ad tokeninə uyğun gəlir               | Hər tokenə +2 |
| Arxa plan səbəbi teqə uyğun gəlir                      | Hər tokenə +2 |
| Teqlərdəki provayder ipucu sorğu provayderinə uyğundur | +2 / −2       |

`score >= AUTO_MIN_SCORE = 3` olan ən yaxşı `AUTO_MAX_SKILLS = 5` bacarıq daxil edilir. Bərabərliklər əvvəlcə `installCount` (azalan sıra ilə), sonra isə əlifba sırası ilə ada əsasən həll edilir (`injection.ts:225-235`).

### Alət Çağırışlarının Tutulması

`src/lib/skills/interception.ts` faylındakı `handleToolCallExecution()` yuxarı axın alət çağırışı olan cavab qaytardıqdan sonra çat emalçısı tərəfindən çağırılır:

1. `extractToolCalls()` provayderə xas strukturları oxuyur (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Daxili alət aliasları (məsələn, `omniroute_web_search` → `web_search`) əvvəlcə həll edilir. Daxili emalçılar birbaşa işlədilir.
3. Qalan hər şey `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })` vasitəsilə yönləndirilir.
4. Nəticələr müvafiq qaydada cavaba əlavə edilir — `tool_results`, `function_call_output` elementləri və ya Anthropic `tool_result` blokları.

İcra kontekstindəki `customSkillExecutionEnabled` yalnız daxili tutmaya icazə vermək üçün `false` olaraq təyin edilə bilər (istifadəçi tərəfindən müəyyən edilmiş emalçıları açıq şəkildə deaktiv edən sorğu yollarında istifadə olunur).

---

## Docker Sandbox-u

Daxili olmayan kod yolları (`eval_code`, `execute_command`) Docker daxilində `SandboxRunner` (`src/lib/skills/sandbox.ts`) vasitəsilə işləyir. Hər konteyner aşağıdakı parametrlərlə başladılır:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (readOnly=true olduqda)
```

Standart dəyərlər (`SandboxRunner.DEFAULT_CONFIG`):

| Sahə             | Standart        | Qeydlər                                                   |
| ---------------- | --------------- | --------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | `--cpus` parametrinə ötürülməzdən əvvəl 1000-ə bölünür    |
| `memoryLimit`    | 256 MB          | Sərt limit                                                |
| `timeout`        | 30000 ms        | `SIGTERM` + `docker kill` vasitəsilə yumşaq dayandırma    |
| `networkEnabled` | `false`         | `--network none` parametrinə çevrilir                     |
| `readOnly`       | `true`          | Kök FS yalnız oxunandır; `/tmp` və `/workspace` tmpfs-dir |

`SandboxRunner.kill(id)` və `killAll()` dayandırma üçün əlçatandır; işləyən konteynerlər `runningContainers: Map<string, ChildProcess>` daxilində izlənir.

### Sandbox Mühit Dəyişənləri

`src/lib/skills/builtins.ts` daxilində `process.env` vasitəsilə konfiqurasiya edilir:

| Mühit dəyişəni                    | Standart         | Məqsəd                                                                                                       |
| --------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------ |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | `file_read` və `file_write` üçün limit                                                                       |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | `http_request` cavab gövdəsi üçün limit                                                                      |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Çağırana qaytarılan stdout/stderr üçün limit                                                                 |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Sandbox-da işləyən əmrlər üçün standart vaxt limiti; maksimum 60 s                                           |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Xaricə çıxış üçün əsas keçid. Hər çağırış üzrə aktivləşdirməyə icazə vermək üçün `1` və ya `true` təyin edin |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (aşağıya baxın)  | Docker obrazlarının vergüllə ayrılmış icazə siyahısı                                                         |

Standart icazə verilən obrazlar: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. `SKILLS_ALLOWED_SANDBOX_IMAGES` vasitəsilə edilən bütün əlavələr standartlarla birləşdirilir; naməlum obrazlar `normalizeImage()` tərəfindən rədd edilir.

> Qeyd: ayrıca `SKILLS_EXECUTION_TIMEOUT_MS` mühit dəyişəni yoxdur. Sandbox-dan kənar emalçının vaxt limiti `SkillExecutor` daxilində (`executor.ts:13`) 30 s olaraq sərt şəkildə kodlaşdırılıb, lakin icra zamanı `skillExecutor.setTimeout(ms)` vasitəsilə dəyişdirilə bilər.

### İş Sahəsinin İzolyasiyası

`file_read` və `file_write` hər bir yolu `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/` ünvanındakı hər API açarı üçün ayrıca iş sahəsinə nəzərən həll edir. Yol keçidi (`..`) və qadağan edilmiş seqmentlər (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) diskdə hər hansı giriş-çıxış əməliyyatından əvvəl rədd edilir.

### HTTP Sərtləşdirilməsi

`http_request` (`builtins.ts:257`):

- Metodların icazə siyahısı: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Bloklanmış gedən sorğu başlıqları: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Yönləndirmələr deaktiv edilib (`allowRedirect: false`)
- `guard: "public-only"` ilə `safeOutboundFetch` üzərindən yönləndirilir (özəl/geri dönüş diapazonları bloklanır)
- Cavab `SKILLS_MAX_HTTP_RESPONSE_BYTES` həddində kəsilir; klient `truncated: true` görür

---

## Hibrid İcraedici (önbaxış)

`src/lib/skills/hybrid.ts` hər çağırış üçün `direct` (prosesdaxili) və `sandbox` icrası arasında seçim edən, vaxt aşımı/yaddaş xətaları zamanı `autoUpgrade` ilə təkrar cəhd yoluna malik `HybridExecutor` müəyyən edir. Daxil edilmiş `directExecutor` / `sandboxRunner` reallaşdırmaları qaralamalardır (`executeDirect`, `executeInSandbox` müvəqqəti obyektlər qaytarır) — bu modulu hazırlanmaqda olan müqavilə kimi qəbul edin. Faktiki icra hələ də `skillExecutor` + `SandboxRunner` vasitəsilə həyata keçirilir.

---

## Saxlama

Sxem iki miqrasiyada yerləşir:

- `src/lib/db/migrations/016_create_skills.sql` — `(api_key_id, name)` və `(skill_id, status, created_at)` üzrə indekslərlə əsas `skills` və `skill_executions` cədvəlləri.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — `skills` cədvəlinə `mode`, `source_provider`, `tags` (JSON), `install_count` əlavə edir.

`skill_executions.status` verilənlər bazası səviyyəsində məhdudlaşdırılır: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Bütün son nöqtələr `src/app/api/skills/` altında yerləşir. İdarəetmə son nöqtələri (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) `requireManagementAuth()` vasitəsilə **idarəetmə autentifikasiyası** tələb edir. Marketpleys/quraşdırma axınları daha yüngül `isAuthenticated()` yoxlamasından (sessiya və ya API açarı) istifadə edir.

| Son nöqtə | Metod | Məqsəd |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Qeydiyyatdan keçmiş bacarıqları siyahıya alır. `?q=`, `?mode=on          | off | auto`, `?source=skillsmp | skillssh | local`, səhifələməni dəstəkləyir |
| `/api/skills/[id]` | PUT | `enabled` və ya `mode` dəyərini yeniləyir |
| `/api/skills/[id]` | DELETE | İdentifikatora görə qeydiyyatı ləğv edir |
| `/api/skills/install` | POST | Fərdi bacarıq quraşdırır (işləyici kodu + sxem) |
| `/api/skills/marketplace` | GET | SkillsMP kataloqunda axtarış edir (`q` boş olduqda populyar standart nəticələri qaytarır) |
| `/api/skills/marketplace/install` | POST | SkillsMP bacarığını quraşdırır (aktiv provayderin `skillsmp` olması tələb edilir) |
| `/api/skills/skillssh` | GET | skills.sh kataloqunda axtarış edir (`?q=&limit=`, maksimum 100) |
| `/api/skills/skillssh/install` | POST | skills.sh bacarığını quraşdırır (aktiv provayderin `skillssh` olması tələb edilir) |
| `/api/skills/executions` | GET | Səhifələnmiş icra tarixçəsi (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Qeydiyyatdan keçmiş bacarığı xüsusi sorğu əsasında icra edir |

`POST /api/skills/executions` son nöqtəsi `settings.skillsEnabled === false` olduqda (`executor.ts:42-45`) HTTP `503` və `{ error: "Skills execution is disabled..." }` qaytarır. Operatorlar əsas keçidi **Parametrlər → AI** bölməsindən dəyişə bilərlər.

### Nümunə: fərdi bacarığın quraşdırılması

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

`handlerCode` sətri icra edilə bilən kod deyil, **işləyici adına görə axtarışdır**. İcraedici onu `skillExecutor.registerHandler(name, fn)` vasitəsilə uyğunlaşdırır (`executor.ts:25`). Marketpleysdən quraşdırmalar SKILL.md mətnini sənədləşdirmə məqsədilə bu sahədə saxlayır və icranı model tərəfindən yaradılan alət çağırışları vasitəsilə yönləndirir. İstifadəçinin təqdim etdiyi ixtiyari mənbə kodu `eval` vasitəsilə icra edilmir.

---

## MCP Alətləri

Dörd MCP aləti bacarıqlar interfeysini (`open-sse/mcp-server/tools/skillTools.ts`) əhatə edir. MCP serveri işə salındıqda onlar avtomatik qeydiyyatdan keçirilir.

| Alət                          | Təsvir                                                                   |
| ----------------------------- | ------------------------------------------------------------------------ |
| `omniroute_skills_list`       | Bacarıqları siyahıya alır; əlavə filtrlər: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Bacarığı `skillId` vasitəsilə aktivləşdirir/deaktivləşdirir              |
| `omniroute_skills_execute`    | Bacarığı giriş verilənləri ilə icra edir                                 |
| `omniroute_skills_executions` | Son icra tarixçəsi (standart 50, maksimum 100)                           |

Nəqliyyat sazlanması və əhatə dairəsi təyinatları üçün [MCP-SERVER.md](./MCP-SERVER.md) sənədinə baxın.

---

## A2A İnteqrasiyası

`src/lib/skills/a2a.ts`, `memory_aware_routing` A2A bacarıq deskriptorunu və `registerA2ASkill(registry)` köməkçi funksiyasını ixrac edir. Xüsusi A2A bacarıqları `src/lib/a2a/skills/` daxilində yerləşir və `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`) vasitəsilə yönləndirilir. Tapşırığın tam həyat dövrü üçün [A2A-SERVER.md](./A2A-SERVER.md) sənədinə baxın.

---

## Yeni Daxili Bacarığın Əlavə Edilməsi

1. **İşləyicini müəyyənləşdirin:** `src/lib/skills/builtins.ts` daxilində (və ya `src/lib/skills/builtin/` altındakı eyni səviyyəli faylda). Siqnatura: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **İzolyasiya edilmiş kod yolu?** `sandboxRunner.run(image, command, env, sandboxConfig({...}))` çağırın. İcazə siyahısına uyğunluğu yoxlamaq üçün `normalizeImage()` istifadə edin.
3. **Fayl sistemi yolu?** Diskə müraciət etməzdən əvvəl yolu həmişə `resolveWorkspacePath(input, context)` vasitəsilə ötürün.
4. **Şəbəkə çağırışı?** `guard: "public-only"` ilə `safeOutboundFetch` istifadə edin; başlıqları `sanitizeHeaders()` vasitəsilə təhlükəsizləşdirin.
5. **Qeydiyyatdan keçirin:** qeydi `builtinSkills` daxilinə əlavə edin (və ya sistem işə salınarkən `registerBrowserSkill(executor)` üslubunda çağırış edin).
6. Yuxarı axın modeli fərqli ad qaytarırsa, **daxili alət aliaslarını əlaqələndirin** (ixtiyari) — `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) daxilində.
7. **Testləri** `src/lib/skills/__tests__/` daxilində yazın (Vitest).

---

## Yeni Xüsusi (Daxili Olmayan) Bacarığın Əlavə Edilməsi

1. Proses işə salınarkən işləyicini qeydiyyatdan keçirin:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Bacarığı `POST /api/skills/install` vasitəsilə əlavə edin (`handlerCode` sahəsi qeydiyyatdan keçirilmiş işləyicinin adı ilə uyğun olmalıdır).
3. `PUT /api/skills/[id]` vasitəsilə `mode` dəyərini `on` və ya `auto` olaraq dəyişin.

---

## Əməliyyat Məsləhətləri

- **Əsas keçid:** `settings.skillsEnabled = false` bütün icraları bloklayır və `/api/skills/executions` ünvanında HTTP `503` qaytarır. Reyestr yüklənməyə davam edir.
- **Çıxış trafikinə məhdudiyyət qoyun:** tamamilə şəbəkədən təcrid edilmiş izolyasiya üçün `SKILLS_SANDBOX_NETWORK_ENABLED` dəyişənini təyin etməyin (standart davranış). Hər çağırış üçün `networkEnabled: true` təyin edilsə belə, əsas icazə keçidi aktiv olmalıdır.
- **Müəyyən obrazlara icazə verin:** icazə siyahısını genişləndirmək üçün `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` təyin edin.
- **İcraları audit edin:** həm `/dashboard/skills/executions`, həm də `omniroute_skills_executions`, `skill_executions` məlumatlarını sorğulayır. Uğurlu icralara `durationMs`, uğursuz icralara isə `errorMessage` daxildir.
- **Keşin etibarsızlaşdırılması:** verilənlər bazasında əl ilə dəyişiklik etdikdən sonra `skillRegistry.invalidateCache()` çağırın; əks halda 60 saniyə gözləyin.
- **Anonim iş sahəsi:** `apiKeyId` boş olduqda bütün çağırışlar eyni `"anonymous"` iş sahəsinə heşlənir — paylaşımı nəzərə alan kod həmişə həqiqi açar ötürməlidir.

---

## İcra Həyat Dövrü (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) hər bir bacarıq çağırışını idarə edən **singleton**-dur. Onun həyat dövrünü anlamaq vaxt aşımı, təkrar cəhdlər və icra vəziyyətindəki problemləri sazlamaq üçün vacibdir.

### 5 Mərhələli Həyat Dövrü

```
   execute() çağırıldı
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← növbəyə alınıb, hələ başlamayıb (DB sətri yaradılıb)
  └──────┬──────┘
         │ işləyicini başlat
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← işləyici vaxt aşımı ilə çağırılıb
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (başqa yol yoxdur — ana proses tərəfindən dayandırılıb)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   DB sətri status, çıxış və durationMs ilə yenilənib
```

### Standart Konfiqurasiya

| Parametr     | Standart          | Aşağıdakının vasitəsilə konfiqurasiya edilə bilər |
| ------------ | ----------------- | ------------------------------------------------- |
| `timeout`    | `30000` (30 san.) | `skillExecutor.setTimeout(ms)`                    |
| `maxRetries` | `3`               | `skillExecutor.setMaxRetries(count)`              |

> **Vacibdir**: İcraçı singleton-dur — `setTimeout()` çağırılması sonrakı bütün çağırışlara qlobal şəkildə təsir edir. Hazırda hər bacarıq üçün ayrıca vaxt aşımı dəstəklənmir; hər bacarıq üçün fərqli vaxt aşımına ehtiyacınız varsa, ayrıca proseslər başladın və ya icraçının forkunu yaradın.

### Status Dəyərləri

`src/lib/skills/types.ts` faylından:

```ts
enum SkillStatus {
  PENDING = "pending", // Növbəyə alınıb, hələ başlamayıb
  RUNNING = "running", // İşləyici çağırılıb
  SUCCESS = "success", // İşləyici etibarlı çıxış qaytarıb
  ERROR = "error", // İşləyici istisna yaradıb
  TIMEOUT = "timeout", // İcraçının vaxt aşımı həddi keçilib
}
```

> **Qeyd**: `TIMEOUT` statusu enum-da müəyyən edilib, lakin cari icraçı tətbiqi tərəfindən **faktiki olaraq DB-yə yazılmır** — vaxt aşımları `"Skill execution timed out"` mesajı ilə `ERROR` kimi göstərilir. Status enum-u gələcək istifadə üçün saxlanılıb.

### İcraların Yoxlanılması

```ts
import { skillExecutor } from "omniroute/skills/executor";

// ID üzrə konkret icranı əldə edin
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// API açarı üçün son icraları siyahıya alın
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// İcraların ümumi sayını hesablayın
const total = skillExecutor.countExecutions("api-key-id");
```

### Təkrar Cəhd Davranışı

`maxRetries` parametri saxlanılır, lakin icraçının `execute()` metodu tərəfindən **hazırda istifadə edilmir** — o, yalnız bir cəhd həyata keçirir. `maxRetries` dəyəri gələcək tətbiq üçün və onu oxumaq istəyən hook-lar üçün əlçatandır.

Hazırda təkrar cəhdlər bacarıq işləyicisinin daxilində tətbiq edilməlidir. Daxili
bacarıqlar icraçıda qeydiyyata alınır (məsələn, `src/lib/skills/builtin/` daxilində
`registerBuiltinSkills(executor)` / `registerBrowserSkill(executor)`); qeydiyyata
aldığınız istənilən işləyici öz təkrar cəhd dövrünü əhatə edə bilər:

```ts
// bacarıq işləyicisinin daxilində
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

## SkillMode Ətraflı

`SkillMode` enum-u (`src/lib/skills/types.ts`) bacarıqların **nə vaxt və necə** çağırıldığını idarə edir:

```ts
enum SkillMode {
  AUTO = "auto", // Bacarığın nə vaxt çağırılacağına LLM qərar verir
  MANUAL = "manual", // Yalnız istifadəçinin açıq sorğusu ilə çağırılır
  HYBRID = "hybrid", // AUTO qiymətləndirməsi + əl ilə əvəzləmə
}
```

> **Qeyd**: Kod bazası `SkillMode` (AUTO/MANUAL/HYBRID) müəyyən edir, lakin `Skill.mode` sahəsi fərqli formadan (`"on" | "off" | "auto"`) istifadə edir. Bunlar əlaqəlidir, lakin eyni deyil — `SkillMode` icraçı siyasəti, `Skill.mode` isə ayrı-ayrı bacarıqların aktivləşdirilməsi üçündür.

### Hər Rejimdən Nə Vaxt İstifadə Etməli

| Rejim    | LLM davranışı                                                                     | İstifadə ssenarisi                                              |
| -------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `AUTO`   | LLM zəruri hesab etdikdə bacarığı çağıra bilər                                    | Ümumi təyinatlı bacarıqlar (faylların oxunması, HTTP sorğuları) |
| `MANUAL` | LLM bacarığı çağıra bilməz; onu yalnız açıq `executeSkill` API çağırışı işə salır | Həssas əməliyyatlar (verilənlər bazasına yazma, ödənişlər)      |
| `HYBRID` | LLM bacarığı təklif edə bilər; istifadəçi bunu təsdiqləməlidir                    | Yan təsirləri olan, lakin təhlükəli olmayan bacarıqlar          |

### AUTO Qiymətləndirməsi

`AUTO` rejimi aktiv olduqda, hər bir namizəd bacarıq sorğunun kontekstinə qarşı
`src/lib/skills/injection.ts` faylındakı `scoreAutoSkill()` tərəfindən qiymətləndirilir — bu,
toplanan tam ədəd xalları sistemidir (bacarıq adının uyğunluğu, ad/teq/təsvir tokenlərinin üst-üstə düşməsi,
fon səbəbi ipucları, provayder ipucu bonusu/cəriməsi). `score >= AUTO_MIN_SCORE = 3`
şərtini ödəyən ən yaxşı `AUTO_MAX_SKILLS = 5` bacarıq çağırıla bilən alətlər kimi
əlavə edilir; bərabərliklər əvvəlcə `installCount`, sonra isə ada görə həll olunur. Tam xal cədvəlinə
bu sənədin əvvəlindəki [**Alət Sxeminin Yaradılması → AUTO Qiymətləndirməsi**](#auto-scoring)
bölməsində baxın; `0.6` tipli onluq hədd və `registry.ts` daxilində qiymətləndirmə yoxdur.

---

## Daxili Bacarıqlar Kataloqu

OmniRoute `src/lib/skills/builtin/` daxilində seçilmiş daxili bacarıqlar dəsti ilə təqdim olunur. Ən çox istifadə olunanlar:

### Brauzer Avtomatlaşdırma Bacarığı

Brauzer bacarığı (`src/lib/skills/builtin/browser.ts`) Playwright/Puppeteer vasitəsilə qrafik interfeyssiz brauzer avtomatlaşdırması təmin edir. **O, reallaşdırılıb, lakin standart bacarıqlar kataloquna daxil deyil** — istifadə etmək üçün brauzer genişləndirməsi plaginini ayrıca quraşdırın.

```ts
// Konfiqurasiyanızda aktivləşdirin
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Həmişə açıq çağırış tələb edin
  allowedSkills: ["browser"],
  timeout: 60000, // Səhifə yükləmələri üçün 60 saniyə
  maxRetries: 1,
};
```

### Digər Daxili Kateqoriyalar

| Kateqoriya   | Bacarıqlar                                         | Rejim  |
| ------------ | -------------------------------------------------- | ------ |
| Fayl G/Ç     | `file_read`, `file_write`                          | AUTO   |
| HTTP         | `http_request`                                     | AUTO   |
| Axtarış      | `web_search`                                       | AUTO   |
| Kodun icrası | `eval_code` (izolyasiya edilmiş JavaScript/Python) | HYBRID |
| Sistem       | `execute_command` (izolyasiya edilmiş CLI icrası)  | MANUAL |

### Fərdi Bacarığın Əlavə Edilməsi

Plagin sistemi vasitəsilə fərdi bacarığın necə əlavə ediləcəyini öyrənmək üçün [Plugin SDK və Bacarıqların İnteqrasiyası](./PLUGIN_SDK.md) sənədinə baxın.

---

## Həmçinin baxın

- [MCP-SERVER.md](./MCP-SERVER.md) — MCP alətlərinin qeydiyyatı və nəqliyyat mexanizmləri
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A tapşırığının həyat dövrü və bacarıqların yönləndirilməsi
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — istifadəçi üçün giriş
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — sorğu emalı ardıcıllığı və komponent xəritəsi
- Mənbə: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Testlər: `src/lib/skills/__tests__/integration.test.ts`
