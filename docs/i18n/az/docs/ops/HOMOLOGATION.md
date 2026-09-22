# Homologation Suite (`npm run homolog`) (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Homoloqasiya VPS-ində işləyən OmniRoute deploy-unun real mühitdə E2E yoxlanması
(`HOMOLOG_BASE_URL`, məsələn, `http://192.168.0.15:20128`). Bir əmr buraxılış üçün əl ilə icra edilən
STOP #2 yoxlama siyahısını avtomatlaşdırılmış və sübut yaradan icra ilə əvəz edir.

## Nələri əhatə edir

| Səviyyə                    | Nələri yoxlayır                                                                                                                                                                                                         | Reallaşdırma                                                                  |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — sağlamlıq/paritet     | `/api/monitoring/health` sorğusuna `status: "healthy"` və gözlənilən versiya ilə `200` cavabının verilməsi                                                                                                              | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — müvəqqəti açar       | Admin girişi → `POST /api/keys` icra üçün məhdud əhatəli API açarı yaradır və nəticədən asılı olmayaraq `finally` blokunda ləğv edilir (`DELETE /api/keys/:id`)                                                         | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API səthi            | `/v1/models` kataloqu, real qeyri-axınlı çat tamamlaması (səviyyə üçün kritik model, `max_tokens: 5`), etibarsız açar üçün `401` və ictimai `/api/monitoring/health`                                                    | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE axını            | Real axınlı çat tamamlaması; `text/event-stream`, ən azı bir məzmun deltasının və `[DONE]` sonlandırıcısının mövcudluğunu yoxlayır                                                                                      | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — real provayderlər     | Canlı `/v1/models` kataloqunda mövcud olan hər kritik provayder üçün promptfoo vasitəsilə dinamik yaradılan, minimal xərcli bir çat sorğusu                                                                             | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI autentifikasiyası | Real giriş forması vasitəsilə bir dəfə daxil olur və sessiyanı (`storageState`) bütün UI səviyyəsində təkrar istifadə edir                                                                                              | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI marşrutları       | `src/app/(dashboard)/dashboard` daxilindəki hər statik `page.tsx` faylı (fayl sistemindən aşkarlanır, dinamik `[param]` marşrutları ötürülür) HTTP xətası, səhifə xətası və ya Next.js xəta sərhədi olmadan yüklənir    | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — kritik UI axını      | İdarəetmə panelinin UI-si vasitəsilə API açarı yaradır və sonra onu yenidən ləğv edir (VPS-də heç bir qalıq saxlamır)                                                                                                   | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — vahid hesabat         | httpYac (`junit-to-ctrf` vasitəsilə), promptfoo→CTRF adapteri və Playwright CTRF reportyorunu vahid `homolog-ctrf.json` faylında birləşdirir, həmçinin insan tərəfindən oxuna bilən `homolog-report/summary.md` yaradır | `scripts/homolog/run.mjs`                                                     |

Təkrar icranın özündə LLM iştirakı sıfırdır — bu, qiymətləndirmə deyil, deterministik reqressiya
testləri toplusudur. Süni intellekt yalnız gələcək texniki xidmət işlərində istifadə olunur (aşağıdakı Yol xəritəsinə baxın).

## İlkin şərtlər

1. `.env.homolog.example` faylını `.env.homolog` faylına köçürün (git tərəfindən nəzərə alınmır — onu heç vaxt commit etməyin) və aşağıdakıları doldurun:
   - `HOMOLOG_BASE_URL` — hədəf deploy, məsələn, `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — həmin deploy üçün idarə panelinin idarəetmə parolu.
   - `HOMOLOG_CRITICAL_PROVIDERS` — real smoke çat sorğusu göndəriləcək, vergüllə ayrılmış provayder prefiksləri (məsələn, `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — adi işə salmalarda boş saxlayın; test dəsti öz müvəqqəti açarını yaradır və ləğv edir. Bunu yalnız ayrıca bir qatı təcrid olunmuş şəkildə sazlamaq üçün təyin edin.
2. Repoda `npm install` əmrini icra edin (test dəstinin asılılıqları — `httpyac`, `promptfoo`, `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — adi devDependencies-dir).
3. Brauzer binar faylları artıq mövcud deyilsə, `npx playwright install` əmrini icra edin.

## Necə işə salmalı

```bash
npm run homolog
```

Versiyası lokal `package.json` ilə uyğun gəlməyən deploy-u yoxlamaq üçün (məsələn, homologasiya mühiti hələ də əvvəlki patch buraxılışındadırsa), gözlənilən versiyanı açıq şəkildə əvəz edin:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Hər hansı qat uğursuz olarsa, icra sıfırdan fərqli kodla başa çatır və hətta uğursuzluq halında belə yaradılmış müvəqqəti API açarını ləğv etməyə həmişə cəhd göstərir (`scripts/homolog/run.mjs` daxilindəki `finally` bloku).

## Hesabatın oxunması

Bütün çıxışlar `homolog-report/` qovluğuna yazılır (git tərəfindən nəzərə alınmır):

- `summary.md` — stdout-a çap edilən eyni cədvəl; hər qat üçün bir sətir (✅/❌ + təfərrüat).
- `homolog-ctrf.json` — vahid CTRF hesabatı (API/SSE, provayder smoke və UI nəticələrinin birləşməsi) — buraxılışın STOP #2 yoxlama siyahısına əlavə edilməli artefakt budur.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — qatlar üzrə xam/aralıq hesabatlar.
- `promptfooconfig.yaml`, `provider-misses.json` — cari icra üçün yaradılmış promptfoo konfiqurasiyası və aktiv kataloqda olmayan kritik provayderlər.

L0 uğursuz olarsa, icra dərhal dayandırılır (müvəqqəti açar yaradılmır), çünki versiya/sağlamlıq uyğunsuzluğu sonrakı hər qatın yanlış deploy-u yoxlayacağı deməkdir.

## UI qanuni şəkildə dəyişdikdə baza səviyyəsinin yenilənməsi

L4b (marşrut smoke sınağı) və L4c (API açarının UI axını) snapshot-lar deyil, real DOM lokatorları əsasında işləyir, buna görə də qanuni UI dəyişikliklərinin əksəriyyəti test dəstində heç bir yeniləmə tələb etmir. Dəyişiklik lokatoru pozduqda (məsələn, düymə etiketi dəyişdirildikdə və ya parametrlər səhifəsi başqa yerə köçürüldükdə):

1. Lokatoru cari mənbə ilə yenidən təsdiqləyin (spesifikasiyalarda artıq hər lokatorun hansı fayl/sətirlə təsdiqləndiyi sənədləşdirilib — eyni nümunəyə əməl edin, təxmin etməyin).
2. `tests/homolog/ui/` daxilindəki spesifikasiyanı yeniləyin.
3. Düzəlişi təsdiqləmək üçün VPS-ə qarşı `npm run homolog` əmrini (və ya yalnız təsirlənmiş Playwright spesifikasiyasını) yenidən icra edin, sonra commit edin.

Bu test dəstində vizual/piksel baza səviyyəsi yoxdur (F1) — bunun üçün Yol xəritəsinə baxın.

## Yol xəritəsi (F2 / F3)

Dizayn və mərhələli tətbiq daxili planlaşdırma spesifikasiyasında yerləşir:
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (keçid verilməyib — daxili
`_tasks/` artefaktıdır, bu reponun izlənən sənədlərinin bir hissəsi deyil). Xülasə:

- **F2** — tam addım-addım keçidin qeydə alınması → Playwright Test Agents (`planner`/`generator`) bunu axın spesifikasiyalarına çevirir (combo yaratmaq, provayderi sınaqdan keçirmək, parametrləri redaktə etmək, MCP alətləri) + dinamik məlumatlar (metrikalar, vaxt möhürləri, jurnallar) üzərində maskaları olan vizual reqressiya baza səviyyəsi (Lost Pixel) + hər buraxılış üçün `healer` texniki xidmət proseduru.
- **F3** — dayanıqlılıq/müqavilə/inteqrasiya əhatəsi: devbox-da toxiproxy + saxta OpenAI-uyğun provayder, VPS-də ona yönləndirilmiş `homolog-resilience` combo-su (yeridilmiş timeout → fallback-i + `/api/monitoring/health` vasitəsilə avtomatik qoruyucunun açılmasını/bağlanmasını təsdiqləmək); `docs/openapi.yaml` əsasında şərtli Schemathesis müqavilə testi (aşağı `--max-examples`, sabit seed-lər, yalnız LLM olmayan endpoint-lər); həmçinin `npm run homolog` + onun `summary.md` faylının `/generate-release` STOP #2 mərhələsinə inteqrasiyası.
