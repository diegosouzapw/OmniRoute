# Evaluations (Evals) (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Əsas mənbə:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Son yenilənmə:** 2026-06-28 — v3.8.40

OmniRoute, marşrutlaşdırma konfiqurasiyalarını, ayrı-ayrı provayderləri/modelləri və ya paketə daxil edilmiş "qızıl dəst" paketlərini müqayisəli qiymətləndirmək üçün istifadə edə biləcəyiniz ümumi qiymətləndirmə çərçivəsi ilə birlikdə təqdim olunur.
İstehsal trafikinə keçirməzdən əvvəl marşrutlaşdırma dəyişikliklərini yoxlamaq, yeni provayderləri təsdiqləmək və buraxılışları nəzarətdən keçirmək üçün ondan istifadə edin.

Çərçivə aşağıdakı kimi həyata keçirilib:

- Yaddaşdaxili daxili paketləri qeydiyyatdan keçirən, çıxışları gözlənilən meyarlar əsasında qiymətləndirən və nəticə kartlarını ümumiləşdirən xalis icra modulu (`src/lib/evals/evalRunner.ts`).
- Fərdi (istifadəçi tərəfindən müəyyən edilmiş) paketlər və SQLite-da saxlanılan tarixi icralar üçün davamlılıq qatı (`src/lib/db/evals.ts`).
- Hər bir halı `POST /v1/chat/completions` ünvanına real çağırışlar göndərərək icra edən, gecikmə müddətini və çıxışları qeydə alan və icranı saxlayan orkestrasiya qatı (`src/lib/evals/runtime.ts`).
- `/api/evals/*` altında REST son nöqtələri (yalnız idarəetmə autentifikasiyası ilə).
- `Dashboard → Usage → Evals` bölməsində idarəetmə paneli interfeysi (`EvalsTab.tsx`).

## Anlayışlar

### Paket

Paket, `description` sahəsinə və bir və ya daha çox hala malik, adlandırılmış test halları toplusudur. Paketlər iki mənbədən əldə edilir:

| Mənbə      | Müəyyən edildiyi yer                                            | İcra zamanı dəyişdirilə bilər? |
| ---------- | --------------------------------------------------------------- | ------------------------------ |
| `built-in` | Başlanğıcda `registerSuite()` vasitəsilə qeydiyyatdan keçirilir | Xeyr (kodda müəyyən edilir)    |
| `custom`   | SQLite-da `eval_suites` + `eval_cases` daxilində saxlanılır     | Bəli (API/UI vasitəsilə)       |

Cari daxili paketlər (`src/lib/evals/evalRunner.ts` faylına baxın):

- `golden-set` — salamlaşma/riyaziyyat/tərcümə/təhlükəsizlik üzrə 10 baza halı
- `coding-proficiency` — Python/JS/SQL/TS/xətaların aşkarlanması
- `reasoning-logic` — sillogizmlər, mətn məsələləri, qanunauyğunluqların tanınması
- `multilingual` — tərcümə və dilin müəyyən edilməsi
- `safety-guardrails` — fərdi identifikasiya məlumatları, jailbreak, imtina, qərəzlilik barədə məlumatlılıq
- `instruction-following` — yalnız JSON, nömrələnmiş siyahılar, dil məhdudiyyətləri
- `codex-comparison` — müqayisə rejimi üçün nəzərdə tutulmuş birbaşa kodlaşdırma tapşırıqları

### Hal

Hər bir halda aşağıdakılar mövcuddur:

| Sahə       | Təsvir                                                                        |
| ---------- | ----------------------------------------------------------------------------- |
| `id`       | Sabit identifikator (çıxışları və metrikaları açarlamaq üçün istifadə olunur) |
| `name`     | İnsan tərəfindən oxuna bilən etiket                                           |
| `model`    | İcra `suite-default` hədəfləməsindən istifadə etdikdə standart model          |
| `input`    | `{ messages, max_tokens? }` — `/v1/chat/completions` ünvanına göndərilir      |
| `expected` | `{ strategy, value }` — qiymətləndirmə rubrikası (aşağıya baxın)              |
| `tags`     | İxtiyari etiketlər (məsələn, `safety`, `pii`, `jailbreak`)                    |

### Hədəf

Eyni paket müxtəlif hədəflərə qarşı icra edilə bilər. Hədəf sxemi
`src/shared/validation/schemas.ts` faylındakı `evalTargetSchema`-dır:

| Hədəf növü      | `id`            | Davranış                                                                                     |
| --------------- | --------------- | -------------------------------------------------------------------------------------------- |
| `suite-default` | `null`          | Hər hal öz daxili `model` sahəsindən istifadə edir                                           |
| `model`         | model adı       | Bütün halları birbaşa bir model vasitəsilə məcburi icra edir (məsələn, `gpt-4o`)             |
| `combo`         | kombinasiya adı | Hər halı bir kombinasiya vasitəsilə icra edir (marşrutlaşdırma mühərrikini sınaqdan keçirir) |

`model` və `combo` üçün `id` sahəsi tələb olunur (`superRefine` tərəfindən
Zod vasitəsilə məcburi edilir). `compareTarget` təqdim edildikdə, hər iki hədəf fərqli olmalıdır —
icra modulu A/B müqayisəsi üçün hər iki icranı eyni `runGroupId` altında saxlayır.

## Qiymətləndirmə meyarları

`evaluateCase()` (`evalRunner.ts`) daxilində həyata keçirilib:

| Strategiya | Keçid şərti…                                                                |
| ---------- | --------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                           |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`         |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` doğru nəticə verir          |
| `custom`   | `expected.fn(actualOutput, evalCase)` doğru nəticə qaytarır (yalnız daxili) |

**Qeyd:** Xüsusi funksiya ilə qiymətləndirmə yalnız kodda müəyyən edilmiş (daxili)
dəstlər üçün nəzərdə tutulub, çünki funksiyalar API vasitəsilə serializasiya edilə
bilməz. `evalCaseBuilderSchema` istifadəçilər tərəfindən yaradılmış dəstlər üçün
yalnız `contains | exact | regex` qəbul edir.

Hazırda hakim qismində LLM və ya embedding əsaslı oxşarlıq qiymətləndiricisi
yoxdur — bunu `evaluateCase()` daxilində rahatlıqla genişləndirmə nöqtəsi kimi
əlavə etmək olar.

## Verilənlər bazasının sxemi

Üç cədvəl (`030_create_eval_runs.sql` və `031_create_eval_suites.sql`
miqrasiyaları):

| Cədvəl        | Məqsəd                                                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Xüsusi dəst metadatası (`id`, `name`, `description`)                                                                        |
| `eval_cases`  | Hər dəst üzrə hallar — `input_json`, `expected_*`, `tags_json`                                                              |
| `eval_runs`   | Tarixi icralar — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Daxili dəstlər DB-də saxlanılmır. Onlar yaddaşda yerləşir və `evalRunner.ts`
hər dəfə import edildikdə yenidən qeydiyyata alınır.

## REST API

Bütün son nöqtələr idarəetmə autentifikasiyası (`requireManagementAuth`) tələb
edir — onlar ictimai proksi səthinin bir hissəsi deyil.

| Son nöqtə                     | Metod    | Təsvir                                                              |
| ----------------------------- | -------- | ------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Dəstlər + son icralar + qiymət cədvəli + hədəflər + açarlar         |
| `/api/evals`                  | `POST`   | Dəsti icra edir (tək və ya müqayisəli) — `evalRunSuiteSchema` sxemi |
| `/api/evals/{suiteId}`        | `GET`    | Bir dəsti əldə edir (daxili və ya xüsusi)                           |
| `/api/evals/suites`           | `POST`   | Xüsusi dəst yaradır — `evalSuiteSaveSchema` sxemi                   |
| `/api/evals/suites/{suiteId}` | `GET`    | Xüsusi dəsti əldə edir                                              |
| `/api/evals/suites/{suiteId}` | `PUT`    | Xüsusi dəsti əvəz edir (hallar yenidən daxil edilir)                |
| `/api/evals/suites/{suiteId}` | `DELETE` | Xüsusi dəsti və onun hallarını silir                                |

### Dəstin icrası

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

İxtiyari sahələr:

- `outputs` — əvvəlcədən hesablanmış çıxışlardan ibarət `Record<caseId, string>`.
  Təqdim edildikdə icra mexanizmi **göndərişi ötürür** və yalnız keşlənmiş
  çıxışları qiymətləndirir (oflayn qiymətləndirmə üçün faydalıdır).
- `compareTarget` — paralel icra ediləcək ikinci hədəf; hər iki icra qarşılıqlı
  müqayisəli görünüş üçün yaradılmış eyni `runGroupId` dəyərini paylaşır.
- `apiKeyId` — göndərilən `/v1/chat/completions` çağırışlarının
  autentifikasiyası üçün istifadə olunan daxili API açarı. `REQUIRE_API_KEY`
  aktiv olduqda tələb olunur.

### Xüsusi dəstin yaradılması

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## Göndəriş Konveyeri

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Dəsti həll edir (daxili və ya fərdi).
2. Hər bir sınaq halı üçün həmin sınaq halının `messages`, həll edilmiş `model`, `stream: false` və `max_tokens: 512` (və ya sınaq halında göstərilən alternativ dəyər) parametrləri ilə `/v1/chat/completions` ünvanına `Request` yaradır.
3. Çat emalçısını birbaşa çağırır (proses daxilində — əlavə HTTP keçidi olmadan).
4. Gecikməni qeydə alır və mətni ya `choices[0].message.content`, ya da Responses-API `output[]` faydalı yükündən çıxarır.
5. Bütün çıxışları `runSuite()` vasitəsilə qiymətləndirir, sonra `saveEvalRun()` vasitəsilə yadda saxlayır.

Sınaq halları **ardıcıl** icra olunur. Hazırda paralellik bayrağı yoxdur.

## İdarəetmə Paneli

İstifadəçi interfeysi `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`) bölməsində yerləşir. Buradan aşağıdakıları edə bilərsiniz:

- Daxili və fərdi dəstlərə sınaq halı üzrə önizləmə ilə baxmaq.
- Sınaq halı qurucusu ilə fərdi dəstlər yaratmaq, redaktə etmək və silmək.
- Hədəf (dəstin standartları / model / kombinasiya), istəyə bağlı olaraq ikinci `compareTarget` və API açarı seçmək, sonra tələb əsasında icra etmək.
- İcra tarixçəsini, hər sınaq halı üzrə keçdi/uğursuz oldu nəticələrini, gecikməni və qeydə alınmış çıxışları yoxlamaq.
- Hər `(suite, target)` əhatə dairəsi üzrə ən son icra əsasında birləşdirilmiş dəyişən qiymət cədvəlini görmək.

## Auto-Assessment RFC ilə Əlaqə

Ayrı, daha məhdud qiymətləndirmə alt sistemi `src/domain/assessment/` daxilində yerləşir (canlı qiymətləndirmə mühərriki üçün həmçinin [AUTO-COMBO.md](../routing/AUTO-COMBO.md) sənədinə baxın). Bu alt sistem Auto Combo mühərrikini hədəfləyir — yuxarı axın xidmətləri sıradan çıxdıqda kombinasiyaların özünü bərpa edə bilməsi üçün provayderləri və modelləri avtomatik qiymətləndirir. O, öz icra mexanizmindən, kateqoriyalaşdırıcısından və qiymətləndirmə məntiqindən istifadə edir.

Burada sənədləşdirilən Evals çərçivəsi **daha geniş, ümumi təyinatlı test səthidir**. İxtiyari reqressiya dəstləri, A/B müqayisələri və hər buraxılış üzrə ilkin yoxlama testləri üçün ona üstünlük verin. Marşrutlaşdırma qərarlarına təsir etmək üçün real vaxt rejimində provayder sağlamlığına ehtiyacınız olduqda Auto-Assessment alt sistemindən istifadə edin.

## CI İnteqrasiyası

Hazırda xüsusi `eval:ci` npm skripti yoxdur. Buraxılışları qiymətləndirmə nəticələrinə əsasən bloklamaq istəyirsinizsə, iki yol var:

- **HTTP yolu**: serveri işə salın, məlum `suiteId` + `target` ilə `POST /api/evals` sorğusu göndərin və cavabda `runs[].summary.passRate >= N` şərtinin ödəndiyini yoxlayın.
- **Prosesdaxili yol**: skriptdən `@/lib/evals/runtime` modulundakı `runEvalSuiteAgainstTarget()` funksiyasını idxal edin, test verilənlər bazasına qarşı icra edin və qaytarılan `PersistedEvalRun.summary` dəyərini yoxlayın.

Marşrutu və tarixçəni əhatə edən testlər `tests/unit/evals-route.test.ts` və `tests/unit/evals-history.test.ts` fayllarında yerləşir.

## Genişləndirmə Nöqtələri

Tez-tez edilən dəyişikliklər və onların tətbiq yerləri:

- **Yeni qiymətləndirmə strategiyası** — `evaluateCase()` (`evalRunner.ts`) daxilindəki `switch (evalCase.expected.strategy)` blokunu genişləndirin və `src/lib/db/evals.ts` daxilindəki `EvalCaseStrategy`, həmçinin `schemas.ts` daxilindəki `evalCaseBuilderSchema` tiplərini genişləndirin.
- **Yeni daxili dəst** — dəst obyekti müəyyənləşdirin və `evalRunner.ts` faylının sonunda `registerSuite()` funksiyasını çağırın. O, `listSuites()` tərəfindən avtomatik aşkarlanacaq.
- **Paralel icra** — `runEvalSuiteAgainstTarget()` daxilindəki ardıcıl `for` dövrünü məhdudlaşdırılmış `Promise.all` ilə əvəz edin (hazırda paralellik nəzarəti mövcud deyil).
- **Axın/alət çağırışı sınaq halları** — hazırda icra mexanizmi `stream: false` parametrini məcburi edir. Axınlı və ya alətlərdən xəbərdar qiymətləndirmə üçün `runtime.ts` daxilində dəyişikliklər tələb olunur (qiymətləndirmədən əvvəl SSE fraqmentlərini qeydə almaq və birləşdirmək).

## Həmçinin baxın

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — məhsul üzrə ümumi təlimat
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — sorğu emalı konveyeri üzrə istinad sənədi
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo qiymətləndirmə mühərriki (işlək mühitdə)
- Mənbə: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- İstifadəçi interfeysi: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
