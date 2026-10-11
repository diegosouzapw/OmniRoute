# OmniRoute Auto-Combo Engine (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **İstifadəçilər üçün**: Sürətli başlanğıc axtarırsınız? Sadə izahlar və nümunələr üçün [Auto-Combo İstifadəçi Təlimatına](../getting-started/AUTO-COMBO-GUIDE.md) baxın.

> Adaptiv qiymətləndirmə + sıfır konfiqurasiyalı avtomatik marşrutlaşdırma ilə özünü idarə edən model zəncirləri

## Sıfır konfiqurasiyalı avtomatik marşrutlaşdırma (`auto/` prefiksi)

> **YENİ:** Kombinasiya yaratmağa ehtiyac yoxdur. İstənilən klientdə birbaşa `auto/` prefiksindən istifadə edin.

### Sürətli nümunələr

| Model ID-si    | Variant | Davranış                                                                                |
| -------------- | ------- | --------------------------------------------------------------------------------------- |
| `auto`         | default | Bütün qoşulmuş provayderlər, LKGP strategiyası, balanslaşdırılmış çəkilər               |
| `auto/coding`  | coding  | Keyfiyyət prioritetli çəkilər, kod yaratmaq üçün uyğundur                               |
| `auto/fast`    | fast    | Aşağı gecikmə əsasında çəkili seçim                                                     |
| `auto/cheap`   | cheap   | Xərc baxımından optimallaşdırılmış marşrutlaşdırma (əvvəlcə ən aşağı xərc)              |
| `auto/offline` | offline | Ən yüksək kvota əlçatanlığına malik provayderlərə üstünlük verir                        |
| `auto/smart`   | smart   | Daha yaxşı model kəşfi üçün keyfiyyət prioriteti + daha yüksək araşdırma dərəcəsi (10%) |
| `auto/lkgp`    | lkgp    | Açıq şəkildə LKGP (standart `auto` ilə eynidir)                                         |
| `auto/chaos`   | chaos   | Paralel yayım, hər provayder üçün bir model (xəta inyeksiyası deyil)                    |

### Kateqoriya × Səviyyə kompozisiyası (`auto/<category>:<tier>`)

OpenRouter üslublu suffikslər **marşrutun hansı növdə olduğunu** (kateqoriya) **onun necə optimallaşdırılmasından** (səviyyə) ayırır, beləliklə onları sərbəst şəkildə birləşdirə bilərsiniz (#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kateqoriyalar** (namizədlər hovuzunu imkanlara görə filtrləyir): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` görüntü imkanlı modelləri saxlayır; `reasoning` məntiqi əsaslandırma/düşünmə modellərini saxlayır.
- **Səviyyələr** (qiymətləndirmə çəkilərini / hovuz filtrini seçir): `fast` (sürətli çatdırılma) · `cheap` (`floor` aliası, xərcə qənaət) · `reliable` (dövrə kəsicisinin sağlamlığı + gecikmə sabitliyi) · `free` / `pro` (`classifyTier` vasitəsilə hovuzu model səviyyəsinə görə filtrləyir — pulsuz səviyyə ilə premium arasında).

| Nümunə                 | Nəticə                                                                                 |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `auto/coding:fast`     | kodlaşdırma hovuzu, aşağı gecikmə çəkiləri                                             |
| `auto/coding:cheap`    | kodlaşdırma hovuzu, xərc baxımından optimallaşdırılmış (`auto/coding:floor` aliasıdır) |
| `auto/reasoning:pro`   | yalnız məntiqi əsaslandırma/düşünmə modelləri, premium səviyyə                         |
| `auto/vision`          | görüntü imkanlı modellər (səviyyə yoxdur → balanslaşdırılmış çəkilər)                  |
| `auto/multimodal:free` | multimodal imkanlı modellər, yalnız pulsuz səviyyə                                     |

İstənilən etibarlı `auto/<category>[:<tier>]` tələb əsasında həll olunur; seçilmiş bir alt çoxluq `/v1/models` daxilində və idarəetmə panelində elan edilir (`open-sse/services/autoCombo/builtinCatalog.ts` daxilində `AUTO_SUFFIX_VARIANTS`). Filtrləmə **uğursuzluqda açıqdır** — məhdudiyyət heç bir qoşulmuş modellə uyğun gəlməzsə, marşrutlaşdırmanın heç vaxt pozulmaması üçün tam hovuz istifadə olunur. Əsas qiymətləndirici (`combo.ts`) dəyişməz qalır; kateqoriya/səviyyə filtri `buildAutoCandidates` daxilində tətbiq edilir.

> **Canlı model analitikası:** `ARENA_ELO_SYNC_ENABLED` bayrağı aktiv olduqda avtomatik marşrutlaşdırmanın uyğunluğu canlı **Arena ELO** reytinqləri + **models.dev** səviyyə məlumatları əsasında müəyyən edilir (əks halda statik uyğunluq xəritəsinə geri qayıdır).

**İstifadə qaydası:**

```bash
# OpenAI formatını dəstəkləyən istənilən IDE və ya CLI aləti
Baza URL-i: http://localhost:20128/v1
API açarı:  <your-endpoint-key>

# Kodunuzda/konfiqurasiyanızda modeli belə təyin edin:
model: "auto"                 # balanslaşdırılmış standart
model: "auto/coding"          # kodlaşdırma tapşırıqları üçün ən yaxşısı
model: "auto/fast"            # mövcud olan ən sürətli
model: "auto/cheap"           # hər token üzrə ən ucuz
```

**Nə baş verir:**

1. OmniRoute `src/sse/handlers/chat.ts` daxilində `auto/` prefiksini aşkarlayır
2. Verilənlər bazasından bütün **aktiv provayder bağlantılarını** sorğulayır
3. Etibarlı etimadnamələri (API açarı və ya OAuth tokeni) olanları filtrləyir
4. Hər bağlantı üzrə modeli müəyyən edir (`connection.defaultModel` və ya provayderin ilk modeli)
5. Yaddaşda **virtual kombinasiya** qurur (DB-də saxlanılmır)
6. Seçilmiş variantın çəki profili + LKGP strategiyası ilə marşrutlaşdırır

**Əsas xüsusiyyətlər:**

- ✅ **Həmişə aktiv:** Heç bir keçid, kombinasiya yaratma və ya konfiqurasiya tələb olunmur
- ✅ **Dinamik:** Cari qoşulmuş provayderləri avtomatik əks etdirir
- ✅ **Sessiya bağlılığı:** LKGP son uğurlu provayderin prioritetləşdirilməsini təmin edir
- ✅ **Çoxhesablılığı nəzərə alır:** Hər provayder bağlantısı ayrıca namizədə çevrilir
- ✅ **DB-yə yazı yoxdur:** Virtual kombinasiya yalnız sorğu müddətində mövcuddur, saxlanma üçün əlavə xərc sıfırdır

### Hər açar üzrə namizəd nəzarəti (#7819, Səviyyə 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = `auto/` sonrasındakı suffiks və ya
əsas kanal üçün literal `auto`) mövcud dayanıqlılıq oxumalarından istifadə edərək
(heç vaxt xam kəsici `state` deyil), `auto/*` kanalının canlı əlçatanlıq məlumatları
ilə zənginləşdirilmiş cari namizədlər hovuzunu sadalayan **yalnız oxuma** son nöqtəsidir:

- provayder dövrə kəsicisi — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- bağlantının soyuma müddəti — həll edilmiş `provider_connections` sətrindəki
  `rateLimitedUntil` / `testStatus`
- model bloklanması — `isModelLocked(provider, connectionId, model)`

Hər namizəd həmçinin bu API açarının `excluded` bayrağını daşıyır. İstisnalar
hər API açarı üzrə saxlanılır (`auto_candidate_overrides` cədvəli, `128` miqrasiyası) —
OmniRoute `users` cədvəli olmayan tək icarəçili sistemdir, buna görə də `apiKeyId`
real çağırışçı identifikasiyasına ən yaxın seçimdir — və saf, vahid testlərlə sınaqdan
keçirilmiş `filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`)
vasitəsilə `open-sse/services/autoCombo/virtualFactory.ts` daxilində namizəd hovuzunun
dar keçid nöqtəsində tətbiq edilir. Filtr **uğursuzluqda açıqdır**: təyin edilməmiş
apiKeyId/kanal və ya DB axtarış xətası hovuzu filtrsiz saxlayır; beləliklə, heç bir
əvəzləmə konfiqurasiya etməmiş operator üçün marşrutlaşdırma bu funksiyadan əvvəlki
vəziyyətlə bayt səviyyəsində tam eyni qalır.

**Sonrakı məsələyə təxirə salınıb:** namizəd üzrə çəkilər + açıq sıralama (Səviyyə 3
— mövcud çəkili/prioritet strategiya yollarına daxil edilir) və hər `auto/*` kanalı üçün konkret
`combo.ts` strategiyasının sabitlənməsi (Səviyyə 4). Tək tenantlı model nəzərə alınmaqla,
əvəzləmələrin hər API açarı üzrə qalmalı, yoxsa qlobal olmalı olduğu barədə açıq sual üçün #7819 planına baxın.

**Pərdə arxasında:**

```txt
Sorğu: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts prefiksi aşkarlayır
   ↓
createVirtualAutoCombo('coding') → aktiv bağlantılardan candidatePool
   ↓
handleComboChat (saxlanılan kombinasiyalarla eyni mühərrik)
   ↓
Avtomatik qiymətləndirmə hər sorğu üçün ən yaxşı provayderi/modeli seçir
```

**İcra faylları:**

| Fayl                                                      | Məqsəd                                                   |
| --------------------------------------------------------- | -------------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Prefiks analizatoru (`parseAutoPrefix`)                  |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Virtual `AutoComboConfig` obyektləri yaradır             |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Provayder reyestrini imitasiya etmək üçün test mexanizmi |
| `src/sse/handlers/chat.ts`                                | İnteqrasiya: auto prefiksi üzrə qısaqapanma              |
| `src/shared/constants/providers.ts`                       | `SYSTEM_PROVIDERS.auto` sistem qeydi                     |

## Real Model Id-si ilə Uyğun Gələn Combo Adları

`name` dəyəri prefikssiz model id-si ilə eyni olan combo (məsələn, `gpt-5.5`
adlı combo) xəta deyil, **qəsdən yaradılmış və dəstəklənən nümunədir**: bu,
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940)-da sənədləşdirilmiş
hər model id-si üzrə provayderə ehtiyat keçid mexanizmidir. Combo həlli
prefikssiz model id-sinin həllindən əvvəl yoxlanıldığına görə
(`src/sse/services/model.ts` faylındakı `getComboForModel()`), prefikssiz
`gpt-5.5` id-si üçün sorğu birbaşa tək provayderə deyil, combo-nun hədəfləri
(məsələn, `acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) vasitəsilə
yönləndirilir — bu, [#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227)
üçün yaradılmış combo-nun yenidən yazmadan əvvəl gəlməsi prioritetindən təkrar
istifadə edir və `tests/unit/responses-combo-resolution-3227.test.ts` və
`tests/unit/combo-name-codex-responses-rewrite.test.ts` vasitəsilə reqressiya
testindən keçirilir.

Real model id-sini kölgədə qoyan ada malik combo yaratmaq və ya combo-nun adını
belə bir ada dəyişmək **heç vaxt rədd edilmir** — bunu etmək sənədləşdirilmiş
iş axınını pozardı. Bunun əvəzinə (#8530), (yeni) ad real model id-si ilə
toqquşduqda `POST /api/combos` və `PUT /api/combos/[id]` cavaba əməliyyatı
bloklamayan `warning` sahəsi əlavə edir:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

İşəsalma zamanı `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) həmçinin model id-sini kölgədə qoyan bütün
mövcud combo-ları sadalayan birsətirlik `[STARTUP]` xəbərdarlığını jurnala
yazır; beləliklə, bunu qəsdən deyil (#6940-da göstərildiyi kimi), təsadüfən
edən operatorlar xəbərdar edilir. Aşkarlama köməkçisi
`src/lib/combos/modelNameCollision.ts` faylında yerləşir.

## Müştəridən Fərdi Combo-nun Çağırılması

Yadda saxlanılan combo-lar (Settings → Combos) yalnız müştəri `model` sahəsində
combo-nun **dəqiq adını** göndərdikdə istifadə olunur — combo adı üçün qeyri-dəqiq
və ya qismən uyğunlaşdırma yoxdur və `auto/` prefiksi istifadə edilmir. Həll
ardıcıllığı (`src/sse/services/model.ts` faylındakı `getComboForModel()`):

1. combo adı ilə dəqiq uyğunluq (`model: "my-combo"`),
2. `combo/<name>` prefiksi (`model: "combo/my-combo"`),
3. model→combo qlob uyğunlaşdırmaları (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

İki geniş yayılmış yanlışlıq:

- **`auto` sizin combo-larınızdan istifadə etmir.** `auto`/`auto/*` öz sıfır
  konfiqurasiyalı namizəd hovuzunu yaradır və yalnız combo-nun adı sözün əsl
  mənasında `auto` olduqda yadda saxlanılan combo-lara müraciət edir (tövsiyə
  edilmir). Combo vasitəsilə yönləndirmək üçün `auto` deyil, onun dəqiq adını
  göndərin.
- **`openrouter/auto` real, ödənişli OpenRouter məhsuludur** ("Auto Best
  Available"), OmniRoute aliası deyil. O, OpenRouter reyestrinin
  (`open-sse/config/providers/registry/openrouter/index.ts`) yeganə statik model
  qeydidir və ayrıca hesablanır. Onu `auto` hovuzlarından çıxarmaq üçün
  Settings → Routing → Hide paid models seçimindən istifadə edin.

Burada sənədləşdirilən ilkin anlaşılmazlıq üçün
[#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) və
[#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111)-ə baxın.

## Necə İşləyir (Davamlı Saxlanılan Avtomatik Kombinasiyalar)

Avtomatik Kombinasiya Mühərriki **16 amilli qiymətləndirmə funksiyasından** (`open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS` daxilində müəyyən edilib) istifadə edərək hər sorğu üçün ən yaxşı provayderi/modeli dinamik şəkildə seçir. Standart çəkilərin cəmi `1.0`-dır; fərdi çəkilər `normalizeScoringWeights()` vasitəsilə yenidən normallaşdırılır. On altı amildən ikisinin — `cacheAffinity` və `resetWindowAffinity` — standart çəkisi `0`-dır; `reliability` üçün `DEFAULT_WEIGHTS` daxilində çəki `0`, ümumi paketlərdə `0.03`, `reliability-first` paketində isə `0.04`-dür və `quality` üçün paketlərdə çəki `0.02` (`quality-first` paketində `0.03`) təşkil edir: buna baxmayaraq, onlar hər namizəd üçün hesablanır və `cacheAffinity` qiymətləndirmədən kənarda prompt keşinin dublikatdan təmizlənməsini idarə edir. Beləliklə, standart çəkisi sıfır olan amillər standart halda seçimə təsir göstərmir, paketlərdə isə göstərir.

![Avtomatik Kombinasiyanın 16 amilli qiymətləndirilməsi](../diagrams/exported/auto-combo-scoring.svg)

> Mənbə: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (`npm run docs:render-diagrams` vasitəsilə yenidən yaradın). Fayl adı tarixən belə qalıb; mənbə və yaradılmış diaqram `DEFAULT_WEIGHTS` daxilində elan edilmiş bütün 16 amili göstərir.

| Amil                  | Standart Çəki | Təsvir                                                                                                                                                                                                                                                                 |
| :-------------------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429        | Qalan kvota / sürət məhdudiyyəti ehtiyatı [0..1]                                                                                                                                                                                                                       |
| `health`              | 0.1605        | Dövrə kəsicisindən alınan sağlamlıq balı (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                                                         |
| `costInv`             | 0.1429        | **Qarışıq** dəyərin tərsi (60% giriş + 40% çıxış tokeninin qiyməti, normallaşdırılıb) — daha ucuz = daha yüksək bal                                                                                                                                                    |
| `latencyInv`          | 0.1143        | Hovuz üzrə normallaşdırılmış p95 gecikməsinin tərsi — daha sürətli = daha yüksək bal                                                                                                                                                                                   |
| `taskFit`             | 0.0762        | Tapşırıq növünə uyğunluq (kodlaşdırma, nəzərdən keçirmə, planlaşdırma, təhlil, sazlama, sənədləşdirmə)                                                                                                                                                                 |
| `stability`           | 0.0476        | Gecikmənin standart kənarlaşmasına əsaslanan dəyişkənlik yönümlü sabitlik — cavab müddəti dəyişkən olan namizəd daha aşağı bal alır                                                                                                                                    |
| `tierPriority`        | 0.0476        | Hesab səviyyəsinin prioriteti — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                                                           |
| `tierAffinity`        | 0.0476        | Namizədin səviyyəsi ilə manifestin tövsiyə etdiyi səviyyə arasındakı uyğunluq                                                                                                                                                                                          |
| `specificityMatch`    | 0.0476        | Sorğunun spesifikliyi (manifest ipucu) ilə model səviyyəsi arasındakı uyğunluq                                                                                                                                                                                         |
| `contextAffinity`     | 0.0476        | Sorğunun kontekst pəncərəsi ehtiyacı ilə modelin kontekst pəncərəsi arasındakı uyğunluq                                                                                                                                                                                |
| `sessionAvailability` | 0.0476        | Namizəd bağlantının bu sessiya üçün OAuth sessiyası əlçatanlığı (`getOAuthSessionAvailability()`; OAuth olmayan bağlantılar 1.0 bal alır)                                                                                                                              |
| `connectionDensity`   | 0.0476        | Yükü eyni provayderin bağlantıları arasında paylayır (təmərküzləşmənin qarşısını alır)                                                                                                                                                                                 |
| `cacheAffinity`       | 0.00          | Bu sorğunun prompt-keş prefiksini artıq saxlaması ən çox ehtimal olunan bağlantıya doğru rendezvous-heş uyğunluğu (`open-sse/services/combo/promptCacheAffinity.ts`); standart olaraq deaktivdir (#8008)                                                               |
| `resetWindowAffinity` | 0.00          | Kvota sıfırlama pəncərəsi əlverişli olan bağlantılara üstünlük verir (standart olaraq deaktivdir)                                                                                                                                                                      |
| `quality`             | 0.03          | Marşrutlaşdırma hadisələrinin keyfiyyət izləyicisindən alınan, rəyə əsaslanan çıxış keyfiyyəti siqnalı; müşahidəsi olmayan namizədlər neytral 0.5 alır                                                                                                                 |
| `reliability`         | 0.00          | On nümunəlik minimum hədd nəzərə alınmaqla 24 saatlıq istifadə tarixçəsindən əldə edilən müşahidə olunmuş uğur payı, `1 - failureRate` (əks halda real vaxt metrikaları); müşahidəsi olmayan namizədlər üçün bu göstərici 1.0 hesab olunur. Standart olaraq deaktivdir |

**Cəm:** `DEFAULT_WEIGHTS` daxilində elan edildiyi kimi `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`; istifadəçi tərəfindən konfiqurasiya edilmiş çəkilər qiymətləndirmədən əvvəl `normalizeScoringWeights()` vasitəsilə paylanma şəklində yenidən normallaşdırılır.

## Rejim Paketləri

`open-sse/services/autoCombo/modePacks.ts` faylında əvvəlcədən təyin edilmiş 6 çəki profili var. Hər paket seçimi müəyyən bir məqsədə yönəltmək üçün standart çəkiləri tamamilə əvəz edir. Hər paketin cəmi artıq `1.0`-dır (dörd onluq mərtəbə ilə göstərildikdə `0.9999`), buna görə də paket aktiv olduqda `normalizeScoringWeights()` funksiyasının düzəldə biləcəyi əhəmiyyətli heç nə yoxdur — aşağıdakı dəyərlər, yuvarlaqlaşdırma nəzərə alınmaqla, qiymətləndiricinin tətbiq etdiyi dəyərlərdir.

| Amil                  | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Qeydlər:

- **Paketlərə `quality` və `reliability` daxildir** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) və onlar çəki xəritəsini bütünlüklə əvəz edir (`weights = pack`, birləşdirmə deyil). `DEFAULT_WEIGHTS` daxilində `quality 0.03 / reliability 0` var; `balanced`/`default` seçildikdə bu standart dəyərlər saxlanılır, paket seçildikdə isə paketin yuxarıdakı dəyərlərindən istifadə olunur. Soyuq hovuzda (hələ heç bir müşahidə yoxdur, buna görə `quality 0.5` və `reliability 1` olur) bu iki amil adi paketdə `+0.04` (`0.03 + 0.01`), `quality-first` paketində `+0.045`, `reliability-first` paketində isə `+0.05` əlavə edir.
- `tierAffinity`, `specificityMatch` və `resetWindowAffinity` hər paketdə açıq şəkildə `0` olaraq təyin edilib.
- Hər paketin əsas vurğusu qısa şəkildə:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (aşağı gecikməli, sağlam bağlantılar)
  - **cost-saver** → costInv 0.3324 (ən ucuz tokenlər üstün gəlir)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03 — bütün paketlər arasında ən yüksək göstərici (tapşırıq üçün ən yaxşı və ardıcıl model)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (sürət/xərcdən asılı olmayaraq maksimum ehtiyat)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04 — bütün paketlər arasında ən yüksək göstərici (ən az gözlənilməz hal)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (`auto/chaos` çəki paketinin panel üzvlərinə təyin etdiyi çəkilər; paralel şaxələnmə bu çəkiləri oxumur və bu, nasazlıq yeritmə profili deyil, baxın: [CHAOS-MODE.md](../guides/CHAOS-MODE.md#autochaos-parallel-fan-out))

### Sorğu Üzrə İdarəetmə Vasitələri (başlıqlar) — #6023 / #6024 / #6025 / #3470

`auto` kombosu saxlanılan konfiqurasiyanı dəyişdirmədən üç başlıq vasitəsilə **hər sorğu üzrə** yönləndirilə bilər. Bunlar yalnız `auto` strategiyasına və yalnız onları daşıyan sorğuya tətbiq olunur; başlıq olmadıqda kombonun saxlanılmış `modePack`/`budgetCap`/`budgetFallback` dəyərlərindən istifadə olunur.

| Başlıq                        | Qəbul edilən dəyərlər                                                                                                                                                                                    | Təsir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | əvvəlcədən təyin edilmiş alias (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) və ya xam paket adı (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Bu sorğu üçün qiymətləndirmə çəkilərini əvəz edir. `balanced`/`default` standart çəkiləri məcburi tətbiq edir (paket olmadan). Naməlum dəyərlər nəzərə alınmır (konfiqurasiya qorunur).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `X-OmniRoute-Budget`          | müsbət ədəd (hər sorğu üçün maksimum USD)                                                                                                                                                                | Sərt xərc limiti: təxmini xərci bu limiti aşan namizədlər seçimdən əvvəl süzgəcdən keçirilir. **Bütün** namizədlər bu limiti aşdıqda baş verəcək davranış aşağıdakı `X-OmniRoute-Budget-Fallback` ilə idarə olunur.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (standart, aliaslar: `cheapest-viable`, `soft`) və ya `strict` (aliaslar: `block`, `hard`)                                                                                                    | `cheapest`: limiti hələ də aşmasına baxmayaraq, qlobal olaraq ən ucuz namizədə geri qayıdır (köhnə davranış). `strict`: seçim etməkdən imtina edir — səssizcə limiti aşan xərcə yol vermək əvəzinə, sorğu `HTTP 402` ilə dərhal uğursuz olur. Naməlum dəyərlər nəzərə alınmır.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `X-OmniRoute-Effort`          | `auto` (digər dəyərlər rezerv edilib)                                                                                                                                                                    | Adaptiv düşünmə büdcəsi: sorğuda heç bir formada əsaslandırma sahəsi (`reasoning_effort`, `reasoning`, `thinking`) olmadıqda, şlüz deterministik sorğu strukturu siqnallarına (son istifadəçi mesajının uzunluğu, son istifadəçi mesajınadək kontekst ölçüsü, əvvəlki alət nəticələri, alət dövrəsinin dərinliyi) əsasən `auto` dəyərini `low`/`medium`/`high` kimi müəyyən edir. Siqnallar cari addımla məhdudlaşır — son istifadəçi mesajından sonrakı hər şey nəzərə alınmır — buna görə də alət dövrəsindəki hər sorğu eyni səviyyədə müəyyən edilir (hər addım üçün vəziyyətsiz sabitləmə, sessiya vəziyyəti yoxdur, yuxarı axındakı prompt keşinin prefikslərini poza biləcək dövrə ortası yüksəltmə yoxdur). Klient tərəfindən açıq şəkildə göstərilən əsaslandırma sahəsi həmişə üstünlük təşkil edir. Yuxarı axın yönləndirilməsi OpenAI Chat Completions strukturuna (`targetFormat === FORMATS.OPENAI`) uyğun olan sorğularla məhdudlaşır — `reasoning_effort` OpenAI strukturlu sahədir, buna görə də başlıq Claude və ya Gemini-yə yönəldilmiş sorğuda heç bir təsir göstərmir (baxın: `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Ən sürətli profili məcburi seçin, bu sorğunu $0.05 ilə məhdudlaşdırın və büdcəni aşmaq əvəzinə sərt şəkildə bloklayın
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Müəyyənləşdirmə xalis funksiyadır (`open-sse/services/autoCombo/requestControls.ts`);
müəyyən edilmiş dəyərlər mühərrikin mövcud `config.modePack` / `config.budgetCap` /
`config.budgetFallback` girişlərinə ötürülür. Kombinasiyada saxlanılan `config.budgetFallback` ("strict" |
"cheapest") davamlı siyasəti təyin edir; başlıq isə onu tək bir sorğu üçün əvəz edir.

## Bütün Marşrutlaşdırma Strategiyaları

OmniRoute-un kombinasiya mühərriki **20 marşrutlaşdırma strategiyasını** dəstəkləyir (`src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES` daxilində elan edilib). Auto Combo mühərrikinin özü `auto` strategiyası vasitəsilə təqdim olunur; digərləri yadda saxlanılan kombinasiyalar üçün əlçatandır.

| Strategiya          | Təsvir                                                                                                                                                                                                                |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Açıq şəkildə göstərilən prioritetə malik, ilk hədəfə üstünlük verən sıralanmış siyahı                                                                                                                                 |
| `weighted`          | Hər hədəfin çəkisinə əsaslanan çəkili təsadüfi seçim                                                                                                                                                                  |
| `round-robin`       | Hədəflər arasında ardıcıllıqla dövr et (paketlər şəklində; aşağıya baxın)                                                                                                                                             |
| `context-relay`     | Konteksti hədəflər arasında ötür (uzun söhbətlər)                                                                                                                                                                     |
| `fill-first`        | Növbəti hədəfə keçməzdən əvvəl hər hədəfin kvotasını doldur                                                                                                                                                           |
| `p2c`               | 2-seçimin-gücü əsasında təsadüfi yük balanslaşdırması                                                                                                                                                                 |
| `random`            | Bərabər ehtimallı təsadüfi seçim                                                                                                                                                                                      |
| `least-used`        | Cari yükü ən aşağı olan hədəfi seç                                                                                                                                                                                    |
| `cost-optimized`    | Kataloq qiymətlərinə əsasən hər sorğu üçün $ məbləğini minimuma endir                                                                                                                                                 |
| `reset-aware` ⭐    | Kvotanın sıfırlanma vaxtına əsasən prioritetləşdir — qısa sıfırlanma pəncərələri daha yuxarı sıralanır                                                                                                                |
| `reset-window`      | Kvota pəncərəsi ən tez sıfırlanacaq hədəflərə üstünlük ver                                                                                                                                                            |
| `headroom`          | Ən çox qalan kvota ehtiyatına malik hədəfi seç                                                                                                                                                                        |
| `quota-weighted`    | Kvotası tükənmiş hesabları ötür, sonra qalanlar arasından qalıq kvotanın icradakı yükə bölünməsi ilə mütənasib şəkildə seçim et; mövcud söhbətlər öz hədəfinə sabitlənmiş qalır                                       |
| `strict-random`     | Təkrarların deduplikasiyası olmadan təsadüfi seçim                                                                                                                                                                    |
| `auto`              | Auto Combo qiymətləndirməsindən istifadə et (16 amil) — **tövsiyə olunur**                                                                                                                                            |
| `lkgp`              | Sonuncu-Məlum-Uğurlu Yol (sonuncu uğurlu provayderə sabitlənir, sonra qaydalara geri qayıdır)                                                                                                                         |
| `context-optimized` | Cari kontekst ölçüsünə ən uyğun hədəfi seç                                                                                                                                                                            |
| `cache-optimized`   | Hədəfləri prompt keşi ilə uyğunluğa əsasən yenidən sırala — bu sorğunun keşlənmiş prefiksini artıq saxlama ehtimalı ən yüksək olan bağlantı əvvəlcə sınanır (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Paralel şəkildə model panelinə sorğular göndər, sonra hakim vasitəsilə vahid cavab sintez et (aşağıya baxın)                                                                                                          |
| `pipeline`          | Hədəfləri ardıcıllıqla işə salaraq hər addımın çıxışını növbəti addımın girişinə ötür; yalnız yekun cavab qaytarılır (#6396)                                                                                          |

⭐ = v3.8.0 versiyasında yenidir · 🧬 = v3.8.36 versiyasında yenidir

### `weighted` semantikası

`weighted`, bərabərləşdirici deyil, **hər sorğu üzrə mütənasib təsadüfi seçimdir**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`):

- Hər sorğu `weight / totalWeight` ehtimalı ilə **bir** addım seçir; qalan addımlar həmin sorğu üçün ehtiyat zənciri kimi çəkinin azalan sırası ilə düzülür.
- Çəkisi `0` olan (və ya çəkisi göstərilməyən) addım, hər hansı digər addımın çəkisi > 0 olduğu müddətdə **heç vaxt seçilmir** — o, yalnız seçilmiş addım uğursuz olduqdan sonra ehtiyat variant kimi xidmət edə bilər. Seçim yalnız **bütün** çəkilər 0 olduqda bərabər ehtimallı olur.
- Bütün hədəfləri əlçatan olmayan addımlar — provayderin avtomatik qoruyucu açarı `OPEN`, bağlantının gözləmə müddəti, modelin bloklanması — seçim baş verməzdən əvvəl seçim hovuzundan çıxarılır
  (`open-sse/services/combo/targetResolution.ts`), buna görə də yalnız bir sağlam addım müvəqqəti olaraq hər sorğuda seçilə bilər.
- `stickyWeightedLimit` (kombinasiya konfiqurasiyası, standart olaraq `1` = söndürülüb) yenidən seçim etməzdən əvvəl seçilmiş addımı həmin sayda ardıcıl uğur müddətində sabit saxlayır.

Sərt rotasiya üçün `round-robin` istifadə edin; `weighted` strategiyasında bərabər çəkilər statistik — sərt deyil — balans təmin edir.

### Agent əsaslı pipeline rejimi

Ən azı iki modeli olan `pipeline` kombinasiyası
`config.agenticOrchestration.enabled` vasitəsilə planlaşdırıcı/işə salıcı marşrutlaşdırmasını aktivləşdirə bilər. Birinci hədəf planlaşdırmaya və yekun cavablara cavabdehdir;
ikinci hədəf isə müştərinin doğma formatında alət çağırışları yaradır. OmniRoute sorğu protokolundan alət nəticələrinin
davamlarını aşkarlayır, planlaşdırıcıdan başqa bir alət raundunun lazım olub-olmadığını
soruşur və dinamik şəkildə ya işə salıcını, ya da planlaşdırıcını müştəriyə təqdim olunan yekun
mərhələyə çevirir.

İkinci hədəfdən sonrakı əlavə modellər ardıcıllıqla işə salıcının ehtiyat variantlarıdır. Uğursuz
HTTP cavabı və ya nəqliyyat istisnası növbəti işə salıcıya keçir və bu zaman
eyni planlaşdırıcı qərarı və doğma alətlər saxlanılır, lakin həmin işə salıcının öz mərhələ sorğusu və
müəyyən edilmiş bağlantısı istifadə olunur. İlk uğurlu cavab dəyişdirilmədən, o cümlədən
SSE axını ilə birlikdə qaytarılır; uğurlu axın başladıqdan sonrakı xətaları burada təkrar sınamaq
mümkün deyil. Bütün işə salıcılar uğursuz olarsa, son xəta qaytarılır. Müştərinin ləğvetmə sorğuları göndərişi dayandırır.

```json
{
  "strategy": "pipeline",
  "models": [{ "model": "provider/planner" }, { "model": "provider/executor" }],
  "config": {
    "agenticOrchestration": { "enabled": true, "maxToolRounds": 8 }
  }
}
```

İşə salıcı bir cavabda bir neçə müstəqil çağırış yarada bilər. Asılı çağırışlar
müştərinin sonrakı alət nəticəsi addımlarında işlənir və planlaşdırıcı hər nəticəni nəzərdən keçirir.
`maxToolRounds` üçün standart dəyər `8`-dir və `1`–`32` qəbul edir; həddə çatdıqda planlaşdırıcı
mövcud olan ən yaxşı yekun cavabı hazırlamalıdır. Daxili planlaşdırıcı qərarları buferlənir, seçilmiş
müştəriyə təqdim olunan cavab isə ilkin axın seçimini qoruyur.

### `round-robin` yapışqan paketi və hesab genişləndirilməsi

Round-robin hər addım üçün bir sorğu deyil, paketlər üzrə işləyir:

- `stickyRoundRobinLimit` (əvvəlcə kombinasiya konfiqurasiyası, sonra `comboStickyRoundRobinLimit`, daha sonra
  `settings.stickyRoundRobinLimit`, standart olaraq **3**) rotasiyadan əvvəl eyni hədəfi göstərilən sayda
  ardıcıl uğurlu sorğu üçün saxlayır. Hər sorğudan sonra rotasiya üçün kombinasiya üzrə dəyəri `1` olaraq
  təyin edin. Kombinasiya redaktoru effektiv dəyəri və onun hansı səviyyədən götürüldüyünü göstərir.
- `connectionAwareExpansion` (əvvəlcə kombinasiya konfiqurasiyası, sonra parametrlər, standart olaraq **false**) rotasiyadan
  əvvəl provayder səviyyəsindəki hər addımı hesab üzrə hədəflərə genişləndirir. B qrupu strategiyaları
  (priority, weighted, round-robin, random, p2c, least-used, cost-optimized, lkgp,
  fill-first, strict-random, context-optimized, cache-optimized, context-relay, fusion,
  pipeline) bu funksiya aktiv edilənədək provayder səviyyəli görünüşü saxlayır. Kombinasiya redaktoru
  varis alma / aktiv / deaktiv seçimlərini təqdim edir; varis alma qlobal standart dəyərdən (deaktiv) istifadə edir.
- Sorğu keşinin lokallığı üzrə marşrutlaşdırma (`promptCacheAffinityEnabled`, standart olaraq **true**)
  uyğun keş açarlarının bir hesabda qalması üçün bərkidilmiş bağlantıların sırasını dəyişir. Bu, hesab üzrə
  bərkidilmiş addımlar arasında round-robin və weighted rotasiyasından üstündür. Sərt rotasiya lazımdırsa,
  Settings → Combo defaults bölməsində bunu deaktiv edin. Kombinasiya üzrə ayrıca dəyər yoxdur.

Bir modeldə çoxhesablı rotasiya üçün yapışqan həddi `1` olan **bir dinamik hesab addımına** (boş
`connectionId`, bütün hovuz) üstünlük verin; üç bərkidilmiş `connectionId` istifadə etməyin.
Bərkidilmiş addımlar və yaxınlıq mexanizmi, hətta RR sayğacı irəlilədikdə belə, eyni hesab üzərində
cəmlənir.

## Fusion Strategiyası

`fusion` tək bir hədəf seçməyən **yeganə** strategiyadır. O, sorğunu paralel şəkildə
**hər bir panel modelinə** göndərir, sonra konfiqurasiya edilə bilən **hakim model**
bütün panel cavablarından vahid yekun cavab sintez edir. Yuxarı axındakı `decolua/9router`
layihəsindən (OpenRouter-in Fusion dizaynı) portlaşdırılıb; reallaşdırma `open-sse/services/fusion.ts` faylındadır.

İş prinsipi:

0. **Alət ehtiva edən sorğuların yan keçməsi** — boş olmayan `tools` massivi daşıyan və
   `tool_choice` dəyəri açıq şəkildə `"none"` olmayan sorğu paneli tamamilə ötür: o,
   `tools`/`tool_choice` dəyişdirilmədən birbaşa tək modelə (konfiqurasiya edilmiş hakimə
   və ya `panel[0]`-a) yönləndirilir. Panel üzvlərinin alətlərə çıxışı yoxdur və hakimin
   sintez göstərişi alət çağırışlarının yaradılmasını təşviq etmir; beləliklə, agent əsaslı/alət çağıran
   klientlər sintez edilmiş mətn əvəzinə real alət çağırışı qərarı əldə edir (#6771).
1. **Paralel paylama** (yalnız alət ehtiva etməyən sorğular üçün) — sorğu eyni anda bütün
   panel modellərinə göndərilir, alətlər çıxarılmaqla axınsız rejim məcburi edilir
   (hakimə sintez üçün tam mətn lazımdır).
2. **Kvorum və güzəşt müddəti ilə toplama** — `minPanel` sayda cavab daxil olan kimi,
   gecikənlər üçün qısa güzəşt taymeri başladılır, sonra fusion toplanmış cavablarla
   davam edir. Bu, sərt vaxt limiti çərçivəsində ən yavaş modelin ümumi gözləmə vaxtına
   təsirini məhdudlaşdırır.
3. **Hakim sintezi** — panel cavabları anonimləşdirilir (`Source 1`, `Source 2`, … —
   beləliklə, hakim model brendini deyil, məzmunu qiymətləndirir) və hakimə təqdim edilir;
   hakim konsensusu / ziddiyyətləri / qismən əhatəni / unikal fikirləri / nəzərdən qaçan
   məqamları təhlil edir, sonra **bir** mötəbər cavab yazır. Hakim çağırışı klientin orijinal
   `stream` bayrağını və alətləri saxlayır, buna görə axın və sonrakı alət istifadəsi işləməyə davam edir.
4. **Zərif deqradasiya** — 0 panel cavabı → `503`; yalnız 1 cavab qaldıqda → həmin cavab
   birbaşa qaytarılır (sintez ediləcək heç nə yoxdur); tək modelli panel birbaşa cavab verir.

Panel üzvü başqa bir komboya istinad edən `combo-ref` addımı
(`{kind: "combo-ref", comboName: "..."}`) da ola bilər — o, istinad edilən komboya tam rekursiv
yönləndirmə ilə **vahid qara qutu panel səsi** kimi həll olunur (həmin kombonun öz hədəflərinə
paralel paylama kimi deyil) və digər bütün combo-ref istifadə edən strategiyalarda artıq mövcud olan
eyni dərinlik/dövr qorunmasından istifadə edir (#6764).

### Konfiqurasiya

Kombonun `config` obyektində konfiqurasiya edilir (sxem miqrasiyası yoxdur — mövcud
`combos` cədvəlindən yenidən istifadə edir):

| Sahə                                     | Növ      | İlkin dəyər      | Məqsəd                                                                                                       |
| :--------------------------------------- | :------- | :--------------- | :----------------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | ilk panel modeli | Yekun cavabı sintez edən model                                                                               |
| `config.fusionTuning.minPanel`           | `number` | `2`              | Güzəşt taymeri başlamazdan əvvəl tələb olunan uğurlu cavabların sayı (`[2, panelSize]` ilə məhdudlaşdırılır) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`           | Kvoruma çatdıqdan sonra gecikənləri nə qədər gözləmək lazımdır                                               |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`          | Bir ilişmiş modelin sorğunu dayandırmaması üçün mütləq vaxt həddi                                            |

İlkin dəyərlər `FUSION_DEFAULTS` daxilindədir (`open-sse/services/fusion.ts`).

### Nümunə

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Sonra onu istənilən digər kombo kimi çağırın: `{"model":"fusion-panel","messages":[...]}`.

## Virtual Auto-Combo Fabriki

Auto Combo mühərriki əvvəlcədən müəyyən edilmiş kombinasiyalar tələb etmir. Bunun əvəzinə, `open-sse/services/autoCombo/virtualFactory.ts` namizədləri dinamik şəkildə yaradır:

1. `getProviderConnections({ isActive: true })` çağırışı ilə bütün aktiv bağlantıları əldə edir
2. Etibarlı giriş məlumatları olanları filtrləyir (API açarı və ya `hasUsableOAuthToken()` vasitəsilə müddəti bitməmiş OAuth tokeni)
3. Model əlçatanlığını və qiymətləri müəyyən etmək üçün `getProviderRegistry()` ilə çarpaz yoxlama aparır
4. Hər `(provider, model, connection)` korteji üçün bir `VirtualAutoComboCandidate` yaradır
5. Yönləndirmə hədəfi kimi `connection.defaultModel` modelini (və ya reyestrdəki ilk modeli) seçir
6. Hər namizədi 16 faktorlu `scorePool()` və variantın çəki paketi ilə qiymətləndirir
7. Yaranmış yaddaşdaxili `AutoComboConfig` obyektini `handleComboChat()` üçün qaytarır — heç vaxt DB-də saxlanmır

Bu o deməkdir ki, **`auto/*` aktiv edilmiş yeni provayder əlavə etmək namizəd hovuzunu avtomatik olaraq genişləndirir** — kombinasiyanı əl ilə redaktə etməyə ehtiyac yoxdur. Virtual kombinasiya hər sorğu üçün yenidən qurulur, buna görə yeni əlavə edilmiş və ya sağlamlığı yenicə bərpa olunmuş bağlantılar dərhal nəzərə alınır.

## Özünübərpa

- **Müvəqqəti istisna**: Qiymət < 0.2 → 5 dəqiqəlik istisna edilir (proqressiv gecikmə, maksimum 30 dəqiqə)
- **Dövrə açarının vəziyyətinin nəzərə alınması**: OPEN → avtomatik istisna edilir; HALF_OPEN → sınaq sorğuları
- **İnsident rejimi**: >50% OPEN → araşdırmanı deaktiv edir, stabilliyi maksimuma çatdırır
- **Soyuma müddətindən sonra bərpa**: İstisna müddəti bitdikdən sonra ilk sorğu azaldılmış taymautla bir "sınaq" olur

## Bandit Araşdırması

Sorğuların 5%-i (konfiqurasiya edilə bilər) araşdırma məqsədilə təsadüfi provayderlərə yönləndirilir. İnsident rejimində deaktiv edilir.

## API

**Xüsusi `POST /api/combos/auto` son nöqtəsi yoxdur** — Auto-Combo iki üsulla istifadə olunur:

1. **Sıfır konfiqurasiya (tövsiyə olunur):** `model: "auto"` və ya `model: "auto/<variant>"` ilə istənilən çat tamamlama sorğusu göndərin. Virtual fabrik hər sorğu üçün kombinasiyanı qurur — davamlı saxlama və API çağırışlarına ehtiyac yoxdur.

2. **`strategy: "auto"` ilə saxlanılan kombinasiya:** `POST /api/combos` vasitəsilə adi kombinasiya yaradın və `strategy: "auto"` ilə yanaşı `config.auto.weights` / `config.auto.candidatePool` dəyərlərini təyin edin. Eyni qiymətləndirmə mühərrikindən istifadə olunur; kombinasiya `combos` daxilində saxlanılır və ID vasitəsilə təkrar istifadə edilə bilər.

Aşkarlama üçün `GET /api/combos/auto` hər variantı onun müəyyən edilmiş namizəd hovuzu, həmçinin `context_length` / `max_output_tokens` ilə birlikdə siyahıya alır — bunlar namizəd hovuzunun kontekst pəncərələri üzrə MAKSİMUM dəyərlərdir. Müştərilər (məsələn, opencode plagini) `0` əvəzinə bu dəyərləri elan etməlidir: sıfır kontekst opencode-un avtomatik sıxlaşdırmasını tamamilə deaktiv edir və sessiyaların şlüzün tarixçə təmizləməsi konteksti məhv edənədək böyüməsinə imkan verir. MAKSİMUM dəyəri elan etmək təhlükəsizdir, çünki auto-combo-nun kontekst üzrə ilkin filtri həddindən böyük sorğuları geniş kontekst pəncərəli namizədlərə yönləndirir.

```bash
# Sıfır konfiqurasiya ilə istifadə (kombinasiya yaradılmır)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Adi kombinasiyalar son nöqtəsi vasitəsilə saxlanılan avtomatik kombinasiya
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Avtomatik yönləndirici strategiyaları

Saxlanılan `strategy: "auto"` kombinasiyaları `config.routerStrategy` (və ya köhnə
`config.auto.routerStrategy`) dəyərini aşağıdakılardan birinə təyin edə bilər:

- `rules` — standart çəkili qiymətləndirmə
- `score` — konfiqurasiya edilmiş ən yüksək çəkili xalı seçir. Tam bərabərliklər konfiqurasiya edilmiş
  namizəd sırasını qoruyur; mövcud `explorationRate` bütün sıralanmış hovuzdan nümunə seçir.
- `cost` / `eco` — ən ucuz sağlam provayder
- `latency` / `fast` — etibarlılıq cəriməsi ilə ən aşağı p95 gecikməsi
- `sla-aware` / `sla` — p95 gecikməsi, xəta tezliyi və istəyə bağlı
  xərc SLO-larını təmin edən namizədlərə üstünlük verir
- `lkgp` — əvvəlcə son məlum yaxşı provayder
- `nadir` — hovuzdakı hansı modelin sorğu üçün lazım olduğunu [Nadir](https://getnadir.com) qərar API-sindən
  soruşur; seçim əsasında aktivləşdirilir, uğursuzluq halında `rules` strategiyasına açıq şəkildə keçir

### Yönləndirici strategiyalarının təfərrüatları

Auto-combo mühərriki `config.routerStrategy` (və ya köhnə `config.auto.routerStrategy`)
vasitəsilə dəyişdirə biləcəyiniz 7 qoşula bilən **RouterStrategy** reallaşdırmasını təqdim edir.
Hər strategiya `RoutingContext` (tapşırıq növü, alət/görüntü ipucları, token təxmini, istəyə bağlı SLA siyasəti,
istəyə bağlı son məlum yaxşı provayder) əsasında namizəd hovuzundan bir provayder seçir.

#### 1. `rules` (standart) — 16 amilli çəkili qiymətləndirmə

Mövcud qiymətləndirmə mühərrikini əhatə edir. `OPEN` dövrə açarı vəziyyətindəki
namizədləri filtrləyir, sonra cari tapşırıq növü və `getTaskFitness()` ilə `scorePool()` funksiyasını
işə salaraq ən yüksək xal toplayan provayderi seçir.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Nə zaman istifadə etməli**: Standart seçimdir. Bütün siqnallar arasında balanslaşdırılmış kompromis istədiyiniz zaman istifadə edin.

**Alias**: `rules` (alias yoxdur)

---

#### 2. `cost` / `eco` — ən ucuz sağlam provayder

Namizəd hovuzunu `costPer1MTokens` üzrə (artan sıra ilə) sıralayır və ən ucuzunu seçir.
Əvvəlcə `OPEN` vəziyyətindəki namizədləri filtrləyir.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Nə zaman istifadə etməli**: Xərcə həssas iş yükləri, paket emalı və ya fon tapşırıqları üçün.

**Aliaslar**: `cost`, `eco`

---

#### 3. `latency` / `fast` — etibarlılıq cəriməsi ilə ən aşağı p95 gecikməsi

`p95LatencyMs + (errorRate * 1000)` üzrə sıralayır. Xəta tezliyi cəriməsi
nominal gecikmələri aşağı olsa belə, etibarsız provayderlərin daha aşağı sıralanmasını təmin edir.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Nə zaman istifadə etməli**: Real vaxt çatları, avtomatik tamamlama və ya
interaktiv kodlaşdırma köməkçiləri kimi gecikməyə həssas iş yükləri üçün.

**Aliaslar**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — gecikmə/xəta/xərc SLO uyğunluğu

Hər namizədi konfiqurasiya edilmiş SLO siyasətini nə dərəcədə yaxşı təmin etdiyinə görə qiymətləndirir:

| Amil           | Çəki | Düstur                                                   |
| -------------- | ---- | -------------------------------------------------------- |
| Gecikmə balı   | 35%  | `threshold / max(value, ε)`                              |
| Xəta balı      | 35%  | `threshold / max(value, ε)`                              |
| Sağlamlıq balı | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)        |
| Xərc balı      | 10%  | `threshold / max(value, ε)` və ya tərs normallaşdırılmış |
| Stabillik balı | 5%   | tərs normallaşdırılmış gecikmə standart sapması          |

`hardConstraints: true` olduqda namizədlər əvvəlcə **pozuntu balına**
(hər hansı SLO həddini nə qədər aşdıqlarına), sonra isə kompozit bala görə sıralanır. Əks halda yalnız
kompozit bal nəzərə alınır.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... hər bir namizədi siyasətə əsasən qiymətləndirir: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA sahələri** (kombinasiya konfiqurasiyasında təyin edilir):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Nə zaman istifadə edilməlidir**: Ciddi gecikmə, xəta tezliyi və ya xərc büdcələri olan istehsal iş yükləri.

**Alternativ adlar**: `sla-aware`, `sla`

---

#### 5. `lkgp` — əvvəlcə son məlum yaxşı provayder

Əvvəlcə **son məlum yaxşı provayderi** (təyin edilibsə) sınayır, sonra isə
`rules` strategiyasına keçir. Sessiya sabitliyi üçün faydalıdır — söhbətdəki
sonrakı sorğuları eyni provayder emal edir.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Ehtiyat variant kimi rules strategiyasına keçir
    return getStrategy("rules").select(pool, context);
  }
}
```

**Nə zaman istifadə edilməlidir**: Sonrakı sorğuların eyni provayder tərəfindən emal olunmasını
istədiyiniz çoxmərhələli söhbətlərdə (məsələn, keşləmə, kontekst davamlılığı və ya qiymət sabitliyi üçün).

**Alternativ ad**: `lkgp` (alternativ adı yoxdur)

---

#### 6. `nadir` — Nadir vasitəsilə promp­ta əsaslanan model seçimi

Yuxarıdakı hər bir strategiya namizədləri öz telemetriyasına görə sıralayır; onların heç biri
sorğunu oxumur. `nadir` istifadəçinin son mesajını və hovuzdakı model identifikatorlarını
[Nadir](https://getnadir.com) qərar API-sinə (`POST /v1/bucket`) göndərir və Nadir-in
həmin menyudan seçdiyi modelə yönləndirir (`simple` → tələblərə cavab verən ən ucuz model, `complex` → ən
qabaqcıl model). Həmin modeli təqdim edən bağlantı yenə də `rules` tərəfindən seçilir, buna görə kvota,
sağlamlıq və xərc hansı hesabın seçiləcəyini müəyyən etməyə davam edir.

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "nadir",
    "nadir": {
      "apiKey": "ndr_...",
      "baseUrl": "https://api.getnadir.com",
      "timeoutMs": 2000
    }
  }
}
```

`OMNIROUTE_NADIR_API_KEY` və `OMNIROUTE_NADIR_BASE_URL` bu iki sətir üçün ehtiyat mühit
dəyərləridir. `baseUrl` yalnız öz serverinizdə yerləşdirilmiş Nadir üçün lazımdır (sondakı `/v1` qəbul edilir).
Açarsız çağırışlar Nadir-in IP başına sürət məhdudiyyəti tətbiq edilən anonim səviyyəsinə yönləndirilir.

Sistemdən kənara çıxan məlumatlar: istifadəçinin son mesajının mətni (ilk 16 min simvol), namizəd
model identifikatorları və `source: "omniroute"` kanal teqi. Sistem promptu, tarixçə, alətlər və ya
başlıqlar göndərilmir.

Xəta zamanı sistem açıq rejimdə işləməyə davam edir: zaman aşımı (standart olaraq 2000 ms), 2xx olmayan cavab, əlçatmaz
host, səhv formatlı cavab və ya hovuzdan kənar seçim `rules`
qərarına keçir və səbəbin əvvəlinə `NadirStrategy: fallback (…)` əlavə edilir. Uğursuz çağırışdan sonra
strategiya 30 saniyə ərzində şəbəkə sorğularını ötürür, beləliklə kəsinti hər sorğu üçün bir zaman aşımı əvəzinə
hər 30 saniyədə bir zaman aşımına səbəb olur. Yönləndirmə hadisələri yalnız seçimi həqiqətən Nadir etdikdə
`strategy: "nadir"` bildirir.

**Nə zaman istifadə edilməlidir**: Müxtəlif model səviyyələrini (kiçik, orta
və qabaqcıl model) əhatə edən hovuzda qarışıq mürəkkəblikli trafik üçün, həmişə qabaqcıl modeldən istifadənin yaratdığı xərci azaltmaq istədikdə.

**Alternativ ad**: `nadir` (alternativ adı yoxdur)

---

### Fərdi yönləndirici strategiyaları

İctimai API vasitəsilə öz `RouterStrategy` reallaşdırmanızı qeydiyyatdan keçirə bilərsiniz:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Yönləndirmə məntiqinizi buraya əlavə edin
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Sonra onu istifadə edin:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Yönləndirici strategiyasının seçilməsi üzrə bələdçi

| İstifadə halı               | Strategiya  | Səbəb                                   |
| --------------------------- | ----------- | --------------------------------------- |
| Balanslaşdırılmış iş yükü   | `rules`     | Standart — bütün amilləri nəzərə alır   |
| Xərci minimuma endirmək     | `cost`      | Həmişə ən ucuz variantı seçir           |
| Gecikməni minimuma endirmək | `latency`   | Ən sürətli etibarlı provayderi seçir    |
| Ciddi SLO-lar               | `sla-aware` | p95/xəta/xərc hədlərinə görə filtrləyir |
| Çoxmərhələli söhbət         | `lkgp`      | Sessiya sabitliyi                       |
| Qarışıq mürəkkəblik         | `nadir`     | Hər prompt üçün model səviyyəsini seçir |

SLA-ya uyğun sahələr:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Tapşırığa uyğunluq

30-dan çox model 6 tapşırıq növü (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`) üzrə qiymətləndirilib. Joker simvol nümunələrini dəstəkləyir (məsələn, `*-coder` → yüksək kodlaşdırma balı).

## Avtomatik variantların xülasəsi

Sadə `auto` (standart) və `autoPrefix.ts` faylında elan edilmiş 6 `AutoVariant` dəyəri daxil olmaqla, **7 çağırıla bilən model ID-si** var:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` özü 6 dəyəri sadalayır; 7-ci seçim «variantsız» — sadə `auto` — olub, `parseAutoPrefix()` tərəfindən `variant: undefined` kimi emal edilir.)

## Səviyyələrin Auto-Combo-ya uyğunluğu

16 amilli qiymətləndirmə funksiyası (`open-sse/services/autoCombo/scoring.ts`) səviyyə
üzvlüyünü iki siqnal kimi nəzərə alır: `tierPriority` (0.0476) və `tierAffinity` (0.0476). Tam
`DEFAULT_WEIGHTS` dəsti üçün yuxarıdakı kanonik [qiymətləndirmə amilləri cədvəlinə](#how-it-works-persisted-auto-combos) baxın — hər paket üzrə əvəzləmələr (ship-fast/cost-saver/quality-first/
offline-friendly) "Hər paket üçün çəki profilləri" cədvəlində göstərilib.

Təkcə səviyyə **Tier 1**-in birinci olmasını təmin etmir — əgər **Tier 1** gecikməsi yüksəkdirsə və ya
xərc-keyfiyyət nisbəti optimal deyilsə, **Tier 2** üstün gəlir. Səviyyə sıralamasını məcburi etmək üçün
`priority` kombinasiya strategiyasından istifadə edin və provayderləri səviyyələrə görə düzün.

**Tier 1**-ə (abunəlik) güclü üstünlük vermək üçün `tierPriority` çəkisini artırın:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Səviyyə tərifləri və provayder təsnifatı üçün [`docs/guides/TIERS.md`](../guides/TIERS.md) sənədinə baxın.

## Test və əhatə dairəsi

### Deterministik marşrutlaşdırma qərarı matrisi (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` real kombinasiya konveyeri və imitasiya edilmiş yuxarı axın vasitəsilə bütün 19
ictimai strategiyanın marşrutlaşdırma **qərarını** başdan sona yoxlayır.
Əhatə dairəsinə daxildir:

- Bütün 19 `ROUTING_STRATEGY_VALUES` strategiyası (ordered, weighted, cost, context, fusion, …).
- `quota-share` (daxili) başdan sona: real `selectQuotaShareTarget` əlaqə nöqtəsi (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`) vasitəsilə DRR ədalətliliyi + doyma zamanı prioritetin azaldılması.
- Hər bir hədəf sayı üzrə `context-relay` universal ötürmə əhatəsi.

Bu test dəsti CI-da (`test:integration` işi) `--test-concurrency=1` və
`--test-force-exit` ilə işləyir, buna görə deterministikdir və real giriş məlumatları tələb etmir.

### Şərtli canlı tüstü testi (CI-da DEYİL — real provayderlər)

| Əmr                                    | Nə edir                                                                                               |
| :------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | `RUN_COMBO_LIVE=1` ilə prosesdaxili real marşrutlaşdırma; canlı OmniRoute DB-nin ani surətini yaradır |
| `npm run test:combo:live:vps`          | Canlı OmniRoute serverinə HTTP çağırışları (`COMBO_LIVE_BASE_URL` təyin edin)                         |
| `npm run test:combo:live:vps:failover` | Eyni əməliyyat, qəsdən yaradılmış avtomatik keçid ssenariləri ilə                                     |

Bu tüstü testləri real ötürmə yolunu (kombinasiya → provayder → tamamlama) yoxlayır. Onlar
real giriş məlumatları və VPS-ə giriş tələb etdiyinə görə qəsdən CI-dan çıxarılıb.

---

## Fayllar

| Fayl                                                      | Məqsəd                                                                                                                           |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 16 amilli qiymətləndirmə funksiyası, `DEFAULT_WEIGHTS`, hovuz norması                                                            |
| `open-sse/services/autoCombo/taskFitness.ts`              | Model × tapşırıq uyğunluğu üzrə axtarış                                                                                          |
| `open-sse/services/autoCombo/engine.ts`                   | Seçim məntiqi, bandit, büdcə limiti                                                                                              |
| `open-sse/services/autoCombo/selfHealing.ts`              | İstisna etmə, yoxlamalar, insident rejimi                                                                                        |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 çəki profili (sürətli buraxılış, xərcə qənaət, keyfiyyət prioritetli, oflayn üçün uyğun, etibarlılıq prioritetli, xaos rejimi) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/` prefiks analizatoru + 6 variant                                                                                          |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Aktiv bağlantılardan yaddaşdaxili `AutoComboConfig` yaradır                                                                      |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Provayder reyestrini imitasiya etmək üçün test qoşulma nöqtəsi                                                                   |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (20 strategiya)                                                                                        |
| `src/sse/handlers/chat.ts`                                | İnteqrasiya: auto-prefiks üçün qısa dövrə                                                                                        |
