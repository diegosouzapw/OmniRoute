# Skills Framework (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Asosiy manba:** `src/lib/skills/` va `src/app/api/skills/`
> **Oxirgi yangilanish:** 2026-06-28 — v3.8.40

OmniRoute til modellariga (va operatorlarga) qayta foydalaniladigan imkoniyatlarni — fayl tizimidan oʻqish va HTTP soʻrovlaridan tortib, izolyatsiyalangan muhitda kod bajarish hamda saralangan marketpleys ko‘nikmalarigacha — birlashtirish imkonini beruvchi kengaytiriladigan Ko‘nikmalar freymvorkini taqdim etadi.

Ko‘nikma — versiyalangan, sxema orqali belgilangan ish birligi. OmniRoute ko‘nikmalarni chiquvchi so‘rovlarga vosita ta’riflari sifatida kiritishi, modeldan qaytadigan vosita chaqiruvlarini tutib qolishi, tegishli ishlov beruvchini ishga tushirishi va suhbat davom etishi uchun natijani modelga qaytarishi mumkin. Model hech qachon amalga oshirish tafsilotlarini ko‘rmaydi — faqat vosita interfeysini ko‘radi.

---

## Agent ko‘nikmalari va Omni ko‘nikmalari

OmniRoute bir-biridan farqli, ammo o‘zaro bir-birini to‘ldiradigan ikkita ko‘nikmalar tizimiga ega:

| O‘lchov         | **Omni ko‘nikmalari** (ushbu hujjat)                                             | **Agent ko‘nikmalari**                                                                           |
| :-------------- | :------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| Maqsad          | LLM vositalarini kiritish + izolyatsiyalangan muhitda bajarish                   | Tashqi agentlar topishi va ishlatishi uchun SKILL.md katalogi                                    |
| Asosiy manba    | `src/lib/skills/` + marketpleys                                                  | `src/lib/agentSkills/` + `skills/` katalogi                                                      |
| Ishlash rejimi  | Chiquvchi so‘rovlarga kiritiladi, vosita chaqiruvi hodisalarida bajariladi       | Statik markdown katalogi + REST/MCP/A2A aniqlash endpointlari                                    |
| Kim foydalanadi | OmniRoute’ning o‘zi (kombinatsiyalangan marshrutlash, kiruvchi LLM chaqiruvlari) | Tashqi agentlar, MCP mijozlari, A2A orkestratorlari                                              |
| Soni            | O‘zgaruvchan (marketpleysga bog‘liq)                                             | 45 ta katalog yozuvi (23 ta API + 21 ta CLI + 1 ta konfiguratsiya)                               |
| Format          | Vosita sxemasi + ishlov beruvchiga ega `SkillDefinition`                         | `SKILL.md` frontmatter’i + markdown asosiy qismi                                                 |
| Aniqlash        | `/api/skills/*` REST + `omniroute_skills_*` MCP vositalari                       | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP vositalari + A2A `list-capabilities` |

**Omni ko‘nikmalari** — bajarish mexanizmi bo‘lib, ular LLM biror vositani chaqirganda OmniRoute _nima qila olishini_ belgilaydi.

**Agent ko‘nikmalari** — hujjatlar katalogi bo‘lib, ular tashqi agentlarga OmniRoute’ning REST API va CLI vositalaridan _qanday foydalanishni_ tushuntiradi hamda agent ko‘rsatmalariga to‘g‘ridan-to‘g‘ri kiritish mumkin bo‘lgan tuzilmali SKILL.md fayllarini taqdim etadi.

Agent ko‘nikmalari katalogi, generatori, MCP vositalari va A2A ko‘nikmasi haqida ma’lumot olish uchun [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md) sahifasiga qarang.

---

## Tushunchalar

### Ko‘nikma manbalari

Bitta reyestrda ko‘nikmalarning uchta manbasi birgalikda mavjud:

1. **Ichki ko‘nikmalar** (`src/lib/skills/builtins.ts`) — OmniRoute bilan birga taqdim etiladi. Keng tarqalgan holatlarni qamrab oladi:
   - `file_read`, `file_write` — `<DATA_DIR>/skills/workspaces/<hashed-key>/` ostidagi har bir API kaliti uchun alohida izolyatsiyalangan ish maydoni
   - `http_request` — `guard: "public-only"` bilan `safeOutboundFetch` orqali chiquvchi HTTP so‘rovlari
   - `web_search` — keshlash xususiyatiga ega ulanuvchi qidiruv provayderi (`executeWebSearch`)
   - `eval_code` — Docker orqali izolyatsiyalangan `node` yoki `python` bajarilishi
   - `execute_command` — Docker orqali izolyatsiyalangan shell buyrug‘i
   - `browser` — Playwright asosidagi tayanch tuzilma, standart holatda o‘chirilgan (`builtin/browser.ts`)
2. **SkillsMP** (OmniRoute marketpleysi) — `https://skillsmp.com/api/v1/skills/search` manzilidan olinadi. Sozlamalarda `skillsmpApiKey` bo‘lishi talab etiladi.
3. **SkillsSH** (`skills.sh` hamjamiyat katalogi) — `https://skills.sh/api/search` manzilidan olinadi. Autentifikatsiya talab etilmaydi; SKILL.md tarkibi GitHub raw manbasidan olinadi.

Bitta „faol provayder“ boshqaruv paneli ko‘nikmalarni qaysi katalogdan o‘rnatishini boshqaradi (`src/lib/skills/providerSettings.ts`). Uni **Sozlamalar → Xotira va ko‘nikmalar** bo‘limida almashtiring. Standart qiymat: `skillsmp`.

### Ko‘nikma identifikatori

Ko‘nikmalar xotiradagi reyestrda `name@version` bo‘yicha kalitlanadi (`src/lib/skills/registry.ts`). Versiya semver formatida (`^\d+\.\d+\.\d+$`) bo‘lishi kerak. `resolveVersion()` funksiyasi `^`, `~`, `>`, `>=`, `<`, `<=`, `==` va aniq moslik cheklovlarini tushunadi.

### Ko‘nikma rejimi

Har bir ko‘nikmada uning qachon kiritilishini boshqaradigan bajarilish rejimi mavjud:

| Rejim  | Xatti-harakat                                                                                              |
| ------ | ---------------------------------------------------------------------------------------------------------- |
| `on`   | Har doim vosita ta’rifi sifatida kiritiladi                                                                |
| `off`  | Hech qachon kiritilmaydi va bajarilmaydi                                                                   |
| `auto` | Kiruvchi so‘rovga nisbatan baholanadi; faqat ball ≥ `AUTO_MIN_SCORE` bo‘lsa kiritiladi (standart qiymat 3) |

`auto` — marketpleysdan o‘rnatilgan ko‘nikmalar uchun standart rejim. `enabled=true` va `mode="off"` birgalikda „ro‘yxatdan o‘tkazilgan, ammo faol emas“ degan ma’noni anglatadi — eski kod yo‘llari izchil ishlashi uchun eski ustun orqali `enabled` qiymatini almashtirish `mode` qiymatini ham yangilaydi (`src/app/api/skills/[id]/route.ts`).

### Holat (bajarilishlar)

Ko‘nikma bajarilishlari `skill_executions` jadvalida quyidagi holatlar bilan kuzatib boriladi (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Reyestr keshi

`SkillRegistry` — 60 soniyalik TTL keshiga ega singleton (`registry.ts:14`). `loadFromDatabase()` idempotent bo‘lib, `pendingLoad` orqali bir vaqtdagi takroriy chaqiruvlarni birlashtiradi. Har qanday yozish amali (`register`/`unregister`/`unregisterById`) keshni haqiqiy emas deb belgilaydi. Versiyalarni `getSkillVersions(name)` va `resolveVersion(name, constraint)` orqali qidiring.

### Provayderga mos kiritish

`src/lib/skills/injection.ts` ichidagi `injectSkills()` ro‘yxatdan o‘tkazilgan ko‘nikmalarni provayderga xos vosita ta’riflariga aylantiruvchi kirish nuqtasidir:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Model uni qayta chaqirganda ishlov beruvchi toʻgʻri versiyani tanlashi uchun vosita nomi `name@version` shaklida kodlanadi.

### AUTO baholash

`mode="auto"` boʻlganda, har bir nomzod koʻnikma soʻrov kontekstiga nisbatan baholanadi (`injection.ts` faylidagi `scoreAutoSkill()`):

| Signal                                                        | Ballar                 |
| ------------------------------------------------------------- | ---------------------- |
| Koʻnikma nomi kontekstda aynan uchraydi                       | +6                     |
| Har bir nom tokeni kontekst tokeniga mos keladi               | +2                     |
| Har bir teg qism-satri kontekstga mos keladi                  | +3                     |
| Har bir tavsif tokeni kontekstga mos keladi                   | +1                     |
| Fon sababi nom tokeniga mos keladi                            | Har bir token uchun +2 |
| Fon sababi tegga mos keladi                                   | Har bir token uchun +2 |
| Teglardagi provayder maslahati soʻrov provayderiga mos keladi | +2 / −2                |

`score >= AUTO_MIN_SCORE = 3` boʻlgan eng yuqori balli `AUTO_MAX_SKILLS = 5` ta koʻnikma kiritiladi. Tengliklar avval `installCount` (kamayish tartibida), soʻngra nomning alifbo tartibi boʻyicha hal qilinadi (`injection.ts:225-235`).

### Vosita chaqiruvini tutib olish

`src/lib/skills/interception.ts` faylidagi `handleToolCallExecution()` yuqori oqim vositani chaqiruvchi javobni qaytarganidan keyin chat ishlov beruvchisi tomonidan chaqiriladi:

1. `extractToolCalls()` provayderga xos shakllarni oʻqiydi (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Avval ichki vosita taxalluslari (masalan, `omniroute_web_search` → `web_search`) aniqlanadi. Ichki ishlov beruvchilar bevosita bajariladi.
3. Qolgan barcha chaqiruvlar `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })` orqali yoʻnaltiriladi.
4. Natijalar tegishli tarzda javobga — `tool_results`, `function_call_output` elementlari yoki Anthropic `tool_result` bloklari sifatida — qayta joylashtiriladi.

Bajarish kontekstidagi `customSkillExecutionEnabled` qiymatini `false` qilib belgilash orqali faqat ichki vositalarni tutib olishga ruxsat berish mumkin (bu foydalanuvchi belgilagan ishlov beruvchilarni aniq oʻchirib qoʻyadigan soʻrov yoʻllarida ishlatiladi).

---

## Docker qumdoni

Ichki bo‘lmagan kod yo‘llari (`eval_code`, `execute_command`) Docker ichida `SandboxRunner` (`src/lib/skills/sandbox.ts`) orqali ishlaydi. Har bir konteyner quyidagi parametrlar bilan ishga tushiriladi:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (readOnly=true bo‘lganda)
```

Standart qiymatlar (`SandboxRunner.DEFAULT_CONFIG`):

| Maydon           | Standart        | Izohlar                                                               |
| ---------------- | --------------- | --------------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | `--cpus` parametriga uzatishdan oldin 1000 ga bo‘linadi               |
| `memoryLimit`    | 256 MB          | Qat’iy cheklov                                                        |
| `timeout`        | 30000 ms        | `SIGTERM` + `docker kill` orqali yumshoq to‘xtatish                   |
| `networkEnabled` | `false`         | `--network none` ga aylanadi                                          |
| `readOnly`       | `true`          | Ildiz FS faqat o‘qish uchun; `/tmp` va `/workspace` tmpfs hisoblanadi |

O‘chirish uchun `SandboxRunner.kill(id)` va `killAll()` ochiq; ishlayotgan konteynerlar `runningContainers: Map<string, ChildProcess>` ichida kuzatiladi.

### Qumdon muhit o‘zgaruvchilari

`src/lib/skills/builtins.ts` ichida `process.env` orqali sozlanadi:

| Muhit o‘zgaruvchisi               | Standart         | Maqsad                                                                                                                            |
| --------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | `file_read` va `file_write` uchun cheklov                                                                                         |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | `http_request` javob tanasi uchun cheklov                                                                                         |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Chaqiruvchiga qaytariladigan stdout/stderr uchun cheklov                                                                          |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Qumdondagi buyruqlar uchun standart kutish vaqti; ko‘pi bilan 60 s                                                                |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Chiquvchi trafik uchun asosiy ruxsat. Har bir chaqiruvda alohida yoqishga ruxsat berish uchun `1` yoki `true` qiymatini o‘rnating |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (quyiga qarang)  | Vergul bilan ajratilgan ruxsat etilgan Docker tasvirlari ro‘yxati                                                                 |

Standart ruxsat etilgan tasvirlar: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. `SKILLS_ALLOWED_SANDBOX_IMAGES` orqali kiritilgan har qanday qo‘shimchalar standartlar bilan birlashtiriladi; noma’lum tasvirlar `normalizeImage()` tomonidan rad etiladi.

> Eslatma: alohida `SKILLS_EXECUTION_TIMEOUT_MS` muhit o‘zgaruvchisi mavjud emas. Qumdondan tashqari ishlov beruvchi uchun kutish vaqti `SkillExecutor` ichida 30 s qilib qat’iy belgilangan (`executor.ts:13`), ammo uni ishlash vaqtida `skillExecutor.setTimeout(ms)` orqali almashtirish mumkin.

### Ish maydonini izolyatsiyalash

`file_read` va `file_write` har bir yo‘lni `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/` manzilidagi har bir API kalitiga alohida ish maydoniga nisbatan aniqlaydi. Yo‘l bo‘ylab yuqoriga o‘tish (`..`) va taqiqlangan segmentlar (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) diskdagi har qanday kiritish-chiqarish amalidan oldin rad etiladi.

### HTTP himoyasini kuchaytirish

`http_request` (`builtins.ts:257`):

- Ruxsat etilgan metodlar ro‘yxati: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Bloklangan chiquvchi sarlavhalar: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Qayta yo‘naltirishlar o‘chirilgan (`allowRedirect: false`)
- `guard: "public-only"` bilan `safeOutboundFetch` orqali yo‘naltiriladi (xususiy/loopback diapazonlar bloklanadi)
- Javob `SKILLS_MAX_HTTP_RESPONSE_BYTES` da qisqartiriladi; mijoz `truncated: true` qiymatini ko‘radi

---

## Gibrid ijrochi (oldindan ko‘rish)

`src/lib/skills/hybrid.ts` har bir chaqiruv uchun `direct` (jarayon ichida) va `sandbox` ijrosi o‘rtasida tanlov qiladigan, vaqt tugashi yoki xotira xatolarida `autoUpgrade` orqali qayta urinish yo‘liga ega `HybridExecutor`ni belgilaydi. Ulangan `directExecutor` / `sandboxRunner` implementatsiyalari vaqtinchalik stub hisoblanadi (`executeDirect`, `executeInSandbox` vaqtinchalik obyektlarni qaytaradi) — ushbu modulni ishlab chiqilayotgan kontrakt sifatida qabul qiling. Haqiqiy ijro hali ham `skillExecutor` + `SandboxRunner` orqali amalga oshadi.

---

## Saqlash

Sxema ikkita migratsiyada joylashgan:

- `src/lib/db/migrations/016_create_skills.sql` — asosiy `skills` va `skill_executions` jadvallari, `(api_key_id, name)` va `(skill_id, status, created_at)` uchun indekslar bilan.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — `skills` jadvaliga `mode`, `source_provider`, `tags` (JSON), `install_count` maydonlarini qo‘shadi.

`skill_executions.status` ma’lumotlar bazasi darajasida cheklangan: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Barcha endpointlar `src/app/api/skills/` ostida joylashgan. Boshqaruv endpointlari (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) `requireManagementAuth()` orqali **boshqaruv autentifikatsiyasi**ni talab qiladi. Marketpleys/o‘rnatish oqimlari yengilroq `isAuthenticated()` tekshiruvidan foydalanadi (sessiya yoki API kaliti).

| Endpoint | Metod | Maqsad |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Ro‘yxatdan o‘tgan skill’larni ko‘rsatadi. `?q=`, `?mode=on                        | off | auto`, `?source=skillsmp | skillssh | local`, sahifalashni qo‘llab-quvvatlaydi |
| `/api/skills/[id]` | PUT | `enabled` yoki `mode`ni yangilaydi |
| `/api/skills/[id]` | DELETE | ID bo‘yicha ro‘yxatdan chiqaradi |
| `/api/skills/install` | POST | Maxsus skill’ni o‘rnatadi (handler kodi + sxema) |
| `/api/skills/marketplace` | GET | SkillsMP katalogidan qidiradi (`q` bo‘sh bo‘lsa, standart ommabop natijalarni qaytaradi) |
| `/api/skills/marketplace/install` | POST | SkillsMP skill’ini o‘rnatadi (faol provayder = `skillsmp` bo‘lishi kerak) |
| `/api/skills/skillssh` | GET | skills.sh katalogidan qidiradi (`?q=&limit=`, maksimal 100) |
| `/api/skills/skillssh/install` | POST | skills.sh skill’ini o‘rnatadi (faol provayder = `skillssh` bo‘lishi kerak) |
| `/api/skills/executions` | GET | Sahifalangan ijro tarixi (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Ro‘yxatdan o‘tgan skill’ni maxsus so‘rov bilan ijro etadi |

`POST /api/skills/executions` endpointi `settings.skillsEnabled === false` bo‘lganda (`executor.ts:42-45`) `{ error: "Skills execution is disabled..." }` bilan HTTP `503` qaytaradi. Operatorlar asosiy kalitni **Sozlamalar → AI** orqali o‘zgartirishi mumkin.

### Misol: maxsus skill’ni o‘rnatish

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

`handlerCode` satri — bajariladigan kod emas, balki **handler nomini qidirish** uchun ishlatiladi. Ijrochi uni `skillExecutor.registerHandler(name, fn)` orqali moslaydi (`executor.ts:25`). Marketpleysdan o‘rnatishlar SKILL.md matnini ushbu maydonda hujjat sifatida saqlaydi va ijroni model yaratgan vosita chaqiruvlari orqali yo‘naltiradi. Foydalanuvchi ixtiyoriy ravishda taqdim etgan manba kodi `eval` qilinmaydi.

---

## MCP vositalari

Toʻrtta MCP vositasi ko‘nikmalar interfeysini o‘rab turadi (`open-sse/mcp-server/tools/skillTools.ts`). Ular MCP serveri ishga tushganda avtomatik ravishda roʻyxatdan oʻtkaziladi.

| Vosita                        | Tavsif                                                                  |
| ----------------------------- | ----------------------------------------------------------------------- |
| `omniroute_skills_list`       | Koʻnikmalar roʻyxati, ixtiyoriy filtrlar: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Koʻnikmani `skillId` orqali yoqish/oʻchirish                            |
| `omniroute_skills_execute`    | Kirish yuklamasi bilan ko‘nikmani bajarish                              |
| `omniroute_skills_executions` | Soʻnggi bajarilishlar tarixi (standart 50 ta, maksimum 100 ta)          |

Transportni sozlash va qamrov tayinlovlari uchun [MCP-SERVER.md](./MCP-SERVER.md) fayliga qarang.

---

## A2A integratsiyasi

`src/lib/skills/a2a.ts` `memory_aware_routing` A2A ko‘nikma deskriptorini va `registerA2ASkill(registry)` yordamchi funksiyasini eksport qiladi. Maxsus A2A ko‘nikmalari `src/lib/a2a/skills/` ichida joylashadi va `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`) orqali yo‘naltiriladi. Vazifaning to‘liq hayot sikli uchun [A2A-SERVER.md](./A2A-SERVER.md) fayliga qarang.

---

## Yangi ichki ko‘nikma qo‘shish

1. **Ishlov beruvchini belgilang** — `src/lib/skills/builtins.ts` faylida (yoki `src/lib/skills/builtin/` ichidagi yonma-yon faylda). Imzo: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Izolyatsiyalangan kod yo‘limi?** `sandboxRunner.run(image, command, env, sandboxConfig({...}))` ni chaqiring. Ruxsat berilganlar roʻyxatiga nisbatan `normalizeImage()` dan foydalaning.
3. **Fayl tizimi yo‘limi?** Diskka murojaat qilishdan oldin har doim `resolveWorkspacePath(input, context)` orqali o‘tkazing.
4. **Tarmoq chaqiruvimi?** `safeOutboundFetch` dan `guard: "public-only"` bilan foydalaning; sarlavhalarni `sanitizeHeaders()` orqali tozalang.
5. **Ro‘yxatdan o‘tkazing** — yozuvni `builtinSkills` ga qo‘shing (yoki ishga tushirish vaqtida `registerBrowserSkill(executor)` uslubidagi funksiyani chaqiring).
6. **Ichki vosita taxalluslarini bog‘lang** (ixtiyoriy) — agar yuqori oqim modeli boshqa nom chiqarsa, `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) ichida.
7. **Testlar** — `src/lib/skills/__tests__/` ichida (Vitest).

---

## Yangi maxsus (ichki bo‘lmagan) ko‘nikma qo‘shish

1. Jarayon ishga tushganda ishlov beruvchini ro‘yxatdan o‘tkazing:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Ko‘nikmani `POST /api/skills/install` orqali kiriting (`handlerCode` maydoni ro‘yxatdan o‘tkazilgan ishlov beruvchi nomiga mos kelishi kerak).
3. `PUT /api/skills/[id]` orqali `mode` ni `on` yoki `auto` ga o‘zgartiring.

---

## Operatsion maslahatlar

- **Asosiy kalit:** `settings.skillsEnabled = false` barcha bajarilishlarni bloklaydi va `/api/skills/executions` da HTTP `503` qaytaradi. Reyestr yuklanishda davom etadi.
- **Chiquvchi trafikni cheklang:** to‘liq tarmoqdan ajratilgan izolyatsiya uchun `SKILLS_SANDBOX_NETWORK_ENABLED` ni o‘rnatilmagan holda qoldiring (standart holat). Har bir chaqiruvdagi `networkEnabled: true` ham asosiy ruxsatni talab qiladi.
- **Muayyan tasvirlarga ruxsat bering:** ruxsat berilganlar ro‘yxatini kengaytirish uchun `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` ni o‘rnating.
- **Bajarilishlarni audit qiling:** `/dashboard/skills/executions` va `omniroute_skills_executions` ikkalasi ham `skill_executions` ga so‘rov yuboradi. Muvaffaqiyatli ishga tushirishlar `durationMs` ni, muvaffaqiyatsizlari esa `errorMessage` ni o‘z ichiga oladi.
- **Keshni bekor qilish:** ma’lumotlar bazasi qo‘lda tahrirlangandan keyin `skillRegistry.invalidateCache()` ni chaqiring; aks holda 60 s kuting.
- **Anonim ish maydoni:** `apiKeyId` bo‘sh bo‘lsa, barcha chaqiruvlar bir xil `"anonymous"` ish maydoniga xeshlanadi — ulashishni hisobga oluvchi kod har doim haqiqiy kalitni uzatishi kerak.

---

## Bajarilish hayotiy sikli (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) — har bir ko‘nikma chaqiruvini boshqaruvchi **singleton**. Uning hayotiy siklini tushunish vaqt tugashlari, qayta urinishlar va bajarilish holatini nosozliklardan xalos qilish uchun juda muhim.

### 5 bosqichli hayotiy sikl

```
   execute() chaqirildi
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← navbatga qo‘yilgan, hali boshlanmagan (DB qatori yaratildi)
  └──────┬──────┘
         │ ishlov beruvchini boshlash
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← ishlov beruvchi vaqt cheklovi bilan chaqirildi
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (boshqa yo‘l yo‘q — asosiy jarayon tomonidan to‘xtatilgan)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   DB qatori holat, natija va durationMs bilan yangilandi
```

### Standart konfiguratsiya

| Sozlama      | Standart      | Quyidagilar orqali sozlanadi         |
| ------------ | ------------- | ------------------------------------ |
| `timeout`    | `30000` (30s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`           | `skillExecutor.setMaxRetries(count)` |

> **Muhim**: Ijrochi singleton hisoblanadi — `setTimeout()` chaqiruvi keyingi barcha chaqiruvlarga global miqyosda ta’sir qiladi. Hozirda har bir ko‘nikma uchun alohida vaqt cheklovi qo‘llab-quvvatlanmaydi; har bir ko‘nikma uchun turli vaqt cheklovlari kerak bo‘lsa, alohida jarayonlarni ishga tushiring yoki ijrochini fork qiling.

### Holat qiymatlari

`src/lib/skills/types.ts` faylidan:

```ts
enum SkillStatus {
  PENDING = "pending", // Navbatga qo‘yilgan, hali boshlanmagan
  RUNNING = "running", // Ishlov beruvchi chaqirildi
  SUCCESS = "success", // Ishlov beruvchi yaroqli natija qaytardi
  ERROR = "error", // Ishlov beruvchi istisno chiqardi
  TIMEOUT = "timeout", // Ijrochining vaqt cheklovidan oshib ketdi
}
```

> **Eslatma**: `TIMEOUT` holati enum ichida belgilangan, ammo joriy ijrochi implementatsiyasi tomonidan **amalda DB ga yozilmaydi** — vaqt tugashlari `"Skill execution timed out"` xabari bilan `ERROR` sifatida ko‘rsatiladi. Bu holat enumi kelajakda foydalanish uchun ajratilgan.

### Bajarilishlarni tekshirish

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Muayyan bajarilishni ID orqali olish
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// API kaliti uchun so‘nggi bajarilishlarni ro‘yxatlash
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Barcha bajarilishlar sonini hisoblash
const total = skillExecutor.countExecutions("api-key-id");
```

### Qayta urinish xatti-harakati

`maxRetries` sozlamasi saqlanadi, ammo ijrochining `execute()` metodi tomonidan **hozirda ishlatilmaydi** — u faqat bitta urinishni amalga oshiradi. `maxRetries` qiymati kelajakdagi implementatsiya va uni o‘qishni xohlaydigan hooklar uchun taqdim etilgan.

Hozircha qayta urinishlar ko‘nikma ishlov beruvchisining o‘zida amalga oshirilishi kerak. Ichki
ko‘nikmalar ijrochida ro‘yxatdan o‘tkaziladi (masalan, `src/lib/skills/builtin/` ichidagi
`registerBuiltinSkills(executor)` / `registerBrowserSkill(executor)`); siz ro‘yxatdan
o‘tkazgan har qanday ishlov beruvchi o‘z qayta urinish siklini o‘rab olishi mumkin:

```ts
// ko‘nikma ishlov beruvchisi ichida
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

## SkillMode batafsil

`SkillMode` enum’i (`src/lib/skills/types.ts`) ko‘nikmalar **qachon va qanday** chaqirilishini boshqaradi:

```ts
enum SkillMode {
  AUTO = "auto", // Ko‘nikmani qachon chaqirishni LLM hal qiladi
  MANUAL = "manual", // Faqat foydalanuvchining aniq so‘rovi bilan chaqiriladi
  HYBRID = "hybrid", // AUTO baholash + qo‘lda bekor qilish
}
```

> **Eslatma**: Kod bazasida `SkillMode` (AUTO/MANUAL/HYBRID) belgilangan, `Skill.mode` maydoni esa boshqa shakldan (`"on" | "off" | "auto"`) foydalanadi. Ular o‘zaro bog‘liq, ammo bir xil emas — `SkillMode` ijrochi siyosati uchun, `Skill.mode` esa har bir ko‘nikmani alohida yoqish uchun ishlatiladi.

### Har bir rejimdan qachon foydalanish kerak

| Rejim    | LLM xatti-harakati                                                                          | Qo‘llanish holati                                         |
| -------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `AUTO`   | LLM zarur deb hisoblaganida ko‘nikmani chaqira oladi                                        | Umumiy maqsadli ko‘nikmalar (fayl o‘qish, HTTP so‘rovlar) |
| `MANUAL` | LLM ko‘nikmani chaqira olmaydi; uni faqat aniq `executeSkill` API chaqiruvi ishga tushiradi | Maxfiy amallar (ma’lumotlar bazasiga yozish, to‘lovlar)   |
| `HYBRID` | LLM ko‘nikmani taklif qilishi mumkin; foydalanuvchi tasdiqlashi kerak                       | Yon ta’sirlarga ega, ammo xavfli bo‘lmagan ko‘nikmalar    |

### AUTO baholash

`AUTO` rejimi faol bo‘lganda, har bir nomzod ko‘nikma so‘rov
kontekstiga nisbatan `src/lib/skills/injection.ts` faylidagi `scoreAutoSkill()` orqali baholanadi — bu qo‘shiluvchi,
butun sonli ball tizimi (ko‘nikma nomining mosligi, nom/teg/tavsif tokenlarining ustma-ust tushishi,
fon sababi ishoralari, provayder ishorasi bonusi/jarimasi). `score >= AUTO_MIN_SCORE = 3` bo‘lgan eng yuqori
`AUTO_MAX_SKILLS = 5` ta ko‘nikma chaqiriladigan vositalar sifatida kiritiladi,
tengliklar avval `installCount`, so‘ng nom bo‘yicha hal qilinadi. To‘liq ballar jadvalini ushbu
hujjatning avvalgi [**Vosita sxemasini yaratish → AUTO baholash**](#auto-scoring) bo‘limida
ko‘ring; `0.6` uslubidagi kasr chegarasi ham, `registry.ts` faylida baholash ham mavjud emas.

---

## Ichki ko‘nikmalar katalogi

OmniRoute `src/lib/skills/builtin/` ichida saralangan ichki ko‘nikmalar to‘plami bilan taqdim etiladi. Eng ko‘p ishlatiladiganlari:

### Brauzerni avtomatlashtirish ko‘nikmasi

Brauzer ko‘nikmasi (`src/lib/skills/builtin/browser.ts`) Playwright/Puppeteer orqali grafik interfeyssiz brauzerni avtomatlashtirish imkonini beradi. **U amalga oshirilgan, ammo standart ko‘nikmalar katalogiga kiritilmagan** — undan foydalanish uchun brauzer kengaytmasi plaginini alohida o‘rnating.

```ts
// Konfiguratsiyangizda yoqing
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Har doim aniq chaqiruvni talab qilish
  allowedSkills: ["browser"],
  timeout: 60000, // Sahifalar yuklanishi uchun 60 soniya
  maxRetries: 1,
};
```

### Boshqa ichki toifalar

| Toifa      | Ko‘nikmalar                                       | Rejim  |
| ---------- | ------------------------------------------------- | ------ |
| Fayl I/O   | `file_read`, `file_write`                         | AUTO   |
| HTTP       | `http_request`                                    | AUTO   |
| Qidiruv    | `web_search`                                      | AUTO   |
| Kod ijrosi | `eval_code` (izolyatsiyalangan JavaScript/Python) | HYBRID |
| Tizim      | `execute_command` (izolyatsiyalangan CLI ijrosi)  | MANUAL |

### Maxsus ko‘nikma qo‘shish

Plagin tizimi orqali maxsus ko‘nikma qo‘shish usuli uchun [Plugin SDK va ko‘nikmalar integratsiyasi](./PLUGIN_SDK.md) sahifasiga qarang.

---

## Shuningdek qarang

- [MCP-SERVER.md](./MCP-SERVER.md) — MCP vositalarini roʻyxatdan oʻtkazish va transportlar
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A vazifasining hayot sikli va koʻnikmalarni yoʻnaltirish
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — foydalanuvchilar uchun kirish
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — soʻrovlarni qayta ishlash konveyeri va komponentlar xaritasi
- Manba: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Testlar: `src/lib/skills/__tests__/integration.test.ts`
