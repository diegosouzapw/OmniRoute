# RTK Compression (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

RTK sıxışdırması terminal və alət çıxışları üçün OmniRoute-un əmrləri nəzərə alan sıxışdırma mühərrikidir. O,
kontekst artımının böyük hissəsinin test jurnallarından, yığma çıxışından, paket meneceri səs-küyündən,
shell transkriptlərindən, Docker çıxışından, git çıxışından və stek izləmələrindən qaynaqlandığı kodlaşdırma agenti sessiyaları üçün nəzərdə tutulub.

RTK birbaşa `defaultMode: "rtk"` ilə və ya adətən aşağıdakı kimi yığılmış konveyerin ilk addımı olaraq işləyə bilər:

```txt
rtk -> caveman
```

Bu ardıcıllıq əvvəlcə səs-küylü maşın çıxışını sıxışdırır, sonra Caveman-ə qalan mətni yığcamlaşdırmağa imkan verir.

İlkin RTK mənbəyinə görə, əmr çıxışında `60-90%` qənaət əldə edilir. Onun README sənədindəki nümunə sessiya
`~118,000` standart tokendən `~23,900` RTK tokeninə enir ki, bu da `79.7%` qənaət (`~80%`) deməkdir. OmniRoute,
Caveman giriş sıxışdırması ilə birlikdə yığılmış qənaətin hesablanması üçün həmin ilkin orta göstəricidən istifadə edir:

```txt
RTK ortalaması: 80% qənaət
Caveman girişi: 46% qənaət
Yığılmış:       1 - (1 - 0.80) * (1 - 0.46) = 89.2% qənaət
Aralıq:         1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Nələri sıxışdırır

Daxili kataloq hazırda bu kateqoriyalar üzrə 49 filtrlə təqdim olunur:

| Kateqoriya | Nümunələr                                                      |
| ---------- | -------------------------------------------------------------- |
| `git`      | `git status`, `git branch`, `git diff`, `git log`              |
| `test`     | Vitest, Jest, Pytest, Playwright, Go testləri, Cargo testləri  |
| `build`    | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx  |
| `package`  | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler  |
| `shell`    | `ls`, `find`, `grep`, ümumi shell jurnalları                   |
| `docker`   | `docker ps`, Docker jurnalları                                 |
| `infra`    | Terraform, OpenTofu, `systemctl status`                        |
| `generic`  | JSON çıxışı, stek izləmələri, ümumi çıxış üçün ehtiyat variant |

`open-sse/services/compression/engines/rtk/commandDetector.ts` daxilindəki detektor filtr seçilməzdən
əvvəl çıxışı təsnif edir. Əmr sinfi kifayət etmədikdə filtrlər əmr nümunəsinə və ya çıxışın müntəzəm
ifadəsinə görə də uyğunluq tapa bilər.

## Filtrlərin müəyyənləşdirilməsi

RTK filtrləri bu ardıcıllıqla yükləyir:

1. Yalnız etibar edildikdə `.rtk/filters.toml` və `.rtk/filters.json` fayllarından layihə filtrləri.
2. `DATA_DIR/rtk/filters.toml` və `DATA_DIR/rtk/filters.json` fayllarından qlobal filtrlər.
3. `open-sse/services/compression/engines/rtk/filters/` daxilindən daxili filtrlər.

Eyni əhatə daxilində RTK TOML schema v1 filtrləri OmniRoute JSON filtrlərindən üstündür. İdxal edilmiş
əmrə xas filtrin həmin əhatədə daha geniş filtri əvəz edə bilməsi üçün TOML `match_command` ifadələri
əmr növünə görə uyğunlaşdırmadan əvvəl yoxlanılır. Fayl formatından asılı olmayaraq, layihə əhatəsi
qlobal əhatədən üstün olaraq qalır.

Regex filtrləri alət çıxışının agentlərə necə göstərildiyini dəyişə bildiyi üçün layihə filtrləri qəsdən
etibar yoxlamasından keçirilir. Aşağıdakılardan biri doğru olduqda layihə filtr faylı qəbul edilir:

- `rtkConfig.trustProjectFilters` dəyəri `true` olaraq təyin edilib.
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` təyin edilib.
- `.rtk/trust.json` layihənin filtr faylına uyğun SHA-256 heşini ehtiva edir.

Etibar faylı nümunəsi:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Heşlər ayrıdır: `filtersSha256` `.rtk/filters.json` faylına, `filtersTomlSha256` isə
`.rtk/filters.toml` faylına etibar edir. Fayllardan hər hansı birinin redaktə edilməsi yalnız onun öz
etibar qeydini etibarsız edir. Qlobal fayllar administrator tərəfindən quraşdırılır və mövcud qlobal
filtr etibarı davranışından istifadə edir.

Fərdi filtrlər bir filtr obyekti və ya filtr obyektləri massivi ola bilər. Etibarsız fərdi filtrlər
ötürülür və `/api/context/rtk/filters` diaqnostikası tərəfindən bildirilir. Etibarsız daxili filtrlər
dərhal xətaya səbəb olur.

## RTK TOML sxemi v1 uyğunluğu

OmniRoute RTK TOML sxemi v1-dən istifadə edən deklarativ filtr fayllarını təhlil, yoxlama, sınaq və quraşdırma qabiliyyətinə malikdir.
Dəstəklənən sahələr bunlardır: `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` və `[[tests.<filter>]]` daxili testləri.
Naməlum sahələr, etibarsız və ya təhlükəli müntəzəm ifadələr, eyni vaxtda tətbiq olunan silmə/saxlama qaydaları, ölçüsü
1 MiB-dan böyük olan fayllar və naməlum filtrlərə istinadlar rədd edilir. Daxili testləri uğursuz olan fayl
yoxlama məqsədilə validasiya edilə bilər, lakin quraşdırıla və ya yüklənə bilməz. Fərdi faylların yüklənməsi zamanı baş verən
xətalarda sistem açıq qalır: etibarsız fayl ötürülür və qalan filtrlər işləməyə davam edir.

OmniRoute alət çıxışını müştəri artıq əldə etdikdən sonra qəbul edir, buna görə də `filter_stderr = true`
proses çıxışının əldə edilməsini dəyişə bilməz. Bu sahə heç bir əməliyyat yerinə yetirməyən parametr kimi qəbul edilir və validasiya xəbərdarlıq qaytarır.
Bu, məqsədli şəkildə RTK icra faylı, qabıq qarmaqları, Rust əmr reallaşdırmaları və ya onun etibar anbarının strukturu ilə tam uyğunluq deyil, **RTK TOML sxemi v1 uyğunluğu** kimi təsvir edilir.

İdarə panelinin təkmil RTK görünüşü yapışdırılmış və ya yüklənmiş TOML-u qəbul edir. Validasiya yalnız oxuma rejimindədir.
Quraşdırma `DATA_DIR/rtk/filters.toml` faylını məhdudlaşdırıcı icazələrlə atomar şəkildə yazır və
canlı filtr kataloqunu yenidən başlatmadan yeniləyir. Mövcud faylın əvəzlənməsi üçün açıq şəkildə `overwrite`
təsdiqi tələb olunur və əvvəlcə `DATA_DIR/rtk/filters.toml.bak` yaradılır.

## Filtr DSL-i

Filtrlər [Sıxışdırma Qaydaları Formatı](./COMPRESSION_RULES_FORMAT.md) bölməsində təsvir olunan JSON sxemindən istifadə edir.
İcra mühiti bu mərhələləri göstərilən ardıcıllıqla tətbiq edir:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> sətirləri sil/daxil et
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Vacib sahələr:

| Sahə                         | Məqsəd                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| `rules.stripAnsi`            | Uyğunlaşdırmadan əvvəl terminal rəng/nəzarət ardıcıllıqlarını silmək                 |
| `rules.filterStderr`         | Uyğunlaşdırma/filtrləmədən əvvəl geniş yayılmış stderr prefikslərini normallaşdırmaq |
| `rules.replace`              | Sıralanmış müntəzəm ifadə əvəzləmələrini tətbiq etmək                                |
| `rules.matchOutput`          | Çıxış məlum şərtə uyğun olduqda yığcam xülasə qaytarmaq                              |
| `rules.matchOutput[].unless` | Xəta/uğursuzluq nümunəsi mövcud olduqda qısayolu ötürmək                             |
| `rules.dropPatterns`         | Səs-küylü sətirləri silmək                                                           |
| `rules.includePatterns`      | Əməliyyat tələb edən sətirlərə üstünlük vermək                                       |
| `rules.collapsePatterns`     | Təkrarlanan uyğun sətirləri birləşdirmək                                             |
| `rules.deduplicate`          | Hər filtr üçün seçimli aktivləşdirmə: ardıcıl təkrarlanan sətirləri birləşdirmək     |
| `rules.truncateLineAt`       | Hər sətri Unicode baxımından təhlükəsiz şəkildə qısaltmaq                            |
| `rules.onEmpty`              | Bütün sətirlər filtrləndikdə ehtiyat mesajı göstərmək                                |
| `tests[]`                    | Yoxlama keçidində istifadə olunan daxili nümunələr                                   |

Daxili filtrlərin `tests[]` daxili nümunələrini ehtiva etməsi gözlənilir. Fərdi filtrlər də,
xüsusilə layihələr arasında paylaşıldıqda, onları ehtiva etməlidir.

## Sətirlərin dublikatdan təmizlənməsi (iki səviyyə)

RTK təkrarlanan sətirləri iki müstəqil səviyyədə birləşdirir:

1. **Hər filtr üçün `deduplicate` (seçimə bağlı, standart olaraq `false`).** Filtr, kəsilmədən əvvəl _həmin filtrin uyğun gələn çıxışı daxilində_ ardıcıl təkrarlanan sətirləri birləşdirmək üçün `rules.deduplicate: true` təyin edə bilər.
   Bu əməliyyat `lineFilter.ts` daxilində icra olunur. Köhnə filtrlər üçün filtr `collapsePatterns` təyin etdikdə bu funksiya avtomatik aktivləşdirilir. Sxem:
   `open-sse/services/compression/engines/rtk/filterSchema.ts` daxilində `deduplicate: z.boolean().default(false)`.
2. **Bütün mühərrik üzrə `deduplicateThreshold` (standart olaraq `3`).** Bütün filtrlər icra olunduqdan sonra mühərrik bütöv nəticə boyunca `>= deduplicateThreshold` sayda eyni ardıcıl sətirdən ibarət istənilən seriyanı birləşdirir
   (`deduplicateRepeatedLines`, `engines/rtk/index.ts` daxilində tətbiq olunur). Normallaşdırma zamanı dəyər 2–100 aralığı ilə məhdudlaşdırılır.

Hər filtr üzrə keçid əvvəlcə (filtrin daxilində), bütün mühərrik üzrə keçid isə sonda (birləşdirilmiş çıxış üzərində) icra olunur; beləliklə, bu iki əməliyyat ikiqat sayım olmadan birlikdə işləyir.

## Sətirlərin qruplaşdırılması (`enableGrouping`)

`rtkConfig.enableGrouping` `true` olduqda (standart olaraq `false`), RTK dublikatdan təmizlənmiş nəticə üzərində əlavə `groupSimilarLines` keçidi icra edir və _demək olar ki, ekvivalent_ (bayt səviyyəsində eyni olmayan) ardıcıl sətir seriyalarını birləşdirir. `rtkConfig.groupingThreshold` (standart olaraq `3`) qruplaşdırmanı başladan minimum seriya uzunluğudur. Bu, `deduplicateThreshold` parametrinin struktur analoqudur: dublikatdan təmizləmə dəqiq təkrarları, qruplaşdırma isə "kiçik fərqlərlə eyni formaya malik" sətirləri emal edir. Hər iki parametr `key_value` cədvəlində saxlanılan `rtkConfig` JSON obyektinin bir hissəsidir (yuxarıdakı Konfiqurasiya bölməsinə baxın), buna görə parametr yenidən başladılmalardan sonra da qorunur.

## Kod şərhlərinin silinməsi (`stripCodeComments` / `preserveDocstrings`)

`rtkConfig.applyToCodeBlocks` aktivləşdirildikdə RTK hasarlanmış kod bloklarından şərhləri də silə bilər:

- `stripCodeComments` (standart olaraq `false`) — seçimə bağlıdır. `true` olduqda RTK JavaScript və TypeScript hasarlanmış bloklarından şərhləri silir. Tarixən bu parametr oxunur, lakin heç vaxt tətbiq olunmurdu; buna görə işlək mühitdə səssiz dəyişiklikdən qaçmaq məqsədilə standart dəyər "qorumaq" olaraq qalır.
- `preserveDocstrings` (standart olaraq `true`) — şərhlər silinərkən JSDoc/`/** … */` blok şərhləri qorunur (onların ehtiva etdiyi API sənədləri tutduqları baytlardan daha dəyərlidir). Onları da silmək üçün `false` təyin edin.

Şərhlərin silinməsi `open-sse/services/compression/engines/rtk/codeStripper.ts` daxilində həyata keçirilir. Sətir, şablon və müntəzəm ifadə literallarının səhvən şərh kimi qəbul edilməməsi üçün **TypeScript parserindən** (müntəzəm ifadədən deyil) istifadə olunur və JSX aşkar edildikdə əməliyyat tamamilə dayandırılır (beləliklə, JSX ifadə konteynerlərindəki şərhlər heç vaxt korlanmır). Hazırda şərhlərin silinməsi yalnız **JavaScript və TypeScript** üçün tətbiq olunur — silmə mexanizminin `CodeLanguage` dəstindəki digər dillər (Python, Rust, Go, Ruby, Java) üçün boş sətirlər və boşluqlar birləşdirilir, lakin şərhlər silinmir. Təmizlənmiş blokun icrası `rulesApplied` daxilində `rtk:code-strip` ilə işarələnir.

> **Qeyd — GCF / cədvəl kodlaşdırması ayrıca mühərrikdir.** RTK "GCF"
> (Graph Compact Format) cədvəl/sütun əsaslı JSON kodlayıcısını ehtiva **etmir**. Daha köhnə
> `omni-tabular` kodlayıcısını əvəz etmiş həmin kodlayıcı **headroom** mühərrikində yerləşir
> (`open-sse/services/compression/engines/headroom/`, daxil edilmiş kodek isə
> `headroom/gcf/` altındadır). Onun burada sənədləşdirilən RTK filtr konveyeri ilə əlaqəsi yoxdur.

## Konfiqurasiya

Qlobal parametrlər `/api/settings/compression` vasitəsilə əlçatandır. RTK-yə xas parametrlər də
`/api/context/rtk/config` vasitəsilə əlçatandır.

```json
{
  "defaultMode": "stacked",
  "autoTriggerMode": "stacked",
  "autoTriggerTokens": 32000,
  "stackedPipeline": [
    { "engine": "rtk", "intensity": "standard" },
    { "engine": "caveman", "intensity": "full" }
  ],
  "rtkConfig": {
    "enabled": true,
    "intensity": "standard",
    "applyToToolResults": true,
    "applyToCodeBlocks": false,
    "applyToAssistantMessages": false,
    "enabledFilters": [],
    "disabledFilters": [],
    "maxLinesPerResult": 120,
    "maxCharsPerResult": 12000,
    "deduplicateThreshold": 3,
    "customFiltersEnabled": true,
    "trustProjectFilters": false,
    "rawOutputRetention": "never",
    "rawOutputMaxBytes": 1048576,
    "enableGrouping": false,
    "groupingThreshold": 3,
    "stripCodeComments": false,
    "preserveDocstrings": true
  }
}
```

`enabledFilters` və `disabledFilters` filtr identifikatorlarından istifadə edir, məsələn, `test-vitest` və ya `git-diff`.

Tam `rtkConfig` strukturu `open-sse/services/compression/types.ts` faylındakı `RtkConfig` / `DEFAULT_RTK_CONFIG` ilə müəyyən edilir. Bütün obyekt SQLite `key_value` cədvəlində `namespace = "compression"`, `key = "rtkConfig"` altında (`src/lib/db/compression.ts`) vahid JSON dəyəri kimi saxlanılır və oxunarkən `normalizeRtkConfig` tərəfindən normallaşdırılır. Buna görə aşağıdakı hər bir sahə
— `enableGrouping`, `groupingThreshold`, `stripCodeComments` və `preserveDocstrings` daxil olmaqla —
eyni yaddaş vasitəsilə tam dövr edir və yenidən başladıldıqdan sonra saxlanılır.

| Açar                   | İlkin dəyər | Məqsəd                                                                                            |
| ---------------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`         | Bütün mühərrik üzrə: birləşdiriləcək ardıcıl eyni sətirlərin minimum sayı (2–100 ilə məhdudlaşır) |
| `enableGrouping`       | `false`     | İstəyə bağlı: demək olar ki, ekvivalent olan ardıcıl sətir sıralarını birləşdirir                 |
| `groupingThreshold`    | `3`         | Qruplaşdırmanı işə salan ardıcıl oxşar sətirlər sırasının minimum sayı                            |
| `stripCodeComments`    | `false`     | İstəyə bağlı: çəpərlənmiş kod bloklarından şərhləri silir (`applyToCodeBlocks` tələb olunur)      |
| `preserveDocstrings`   | `true`      | Şərhləri silərkən JSDoc/`/** … */` bloklarını saxlayır                                            |

## API

| Marşrut                            | Metod | Məqsəd                                                       |
| ---------------------------------- | ----- | ------------------------------------------------------------ |
| `/api/context/rtk/config`          | GET   | RTK konfiqurasiyasını oxumaq                                 |
| `/api/context/rtk/config`          | PUT   | RTK konfiqurasiyasını yeniləmək                              |
| `/api/context/rtk/filters`         | GET   | Filtr kataloqunu və yükləmə diaqnostikasını siyahılamaq      |
| `/api/context/rtk/import`          | POST  | RTK TOML schema v1 fayllarını doğrulamaq və ya quraşdırmaq   |
| `/api/context/rtk/test`            | POST  | Bir mətn yükü üçün RTK sıxışdırmasını önizləmək              |
| `/api/context/rtk/raw-output/[id]` | GET   | Saxlanılmış, məxfi məlumatları gizlədilmiş xam çıxışı oxumaq |
| `/api/compression/preview`         | POST  | İstənilən sıxışdırma rejimini önizləmək                      |

RTK test yükü:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Sıxışdırmanın önizləmə yükü:

```json
{
  "mode": "stacked",
  "messages": [
    {
      "role": "tool",
      "content": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed"
    }
  ],
  "config": {
    "rtkConfig": {
      "rawOutputRetention": "failures"
    }
  }
}
```

İdarəetmə marşrutları idarə paneli üçün idarəetmə autentifikasiyası və ya uyğun API açarı siyasəti tələb edir.

RTK TOML doğrulama yükü:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Doğrulanmış faylı qlobal şəkildə quraşdırmaq üçün `"action": "install"` istifadə edin. Yalnız mövcud qlobal faylın əvəzlənməsini nəzərdən keçirib təsdiqlədikdən sonra `"overwrite": true` əlavə edin.

## Xam Çıxışın Bərpası

RTK adətən yalnız sıxılmış mətni qaytarır. Sazlamaların yoxlanılması üçün `rawOutputRetention` redaktə edilmiş
xam çıxışı saxlaya bilər:

| Dəyər      | Davranış                                             |
| ---------- | ---------------------------------------------------- |
| `never`    | Xam çıxışı saxlama                                   |
| `failures` | Yalnız ehtimal olunan xəta çıxışını saxla            |
| `always`   | Redaktədən sonra hər sıxılmış RTK xam çıxışını saxla |

Saxlanılan fayllar aşağıdakı qovluğa yazılır:

```txt
DATA_DIR/rtk/raw-output/
```

Saxlanmadan əvvəl məxfi məlumatlar redaktə edilir; bunlara geniş yayılmış bearer tokenləri, API açarları, Slack tokenləri,
AWS giriş açarları və mənimsətmə üslublu `token=...`, `secret=...`, `password=...` dəyərləri daxildir. Analitika
yalnız göstərici identifikatorunu, ölçünü və heş metaməlumatlarını saxlayır.

## Yoxlama Keçidi

Fokuslanmış yoxlama keçidi xarici əmrləri shell vasitəsilə çağırmadan daxili sətirarası filtr testlərini işə salır:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Daha geniş RTK keçidi:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Buraxılışdan əvvəl geniş sıxılma keçidini işə salın:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## RTK-nın Genişləndirilməsi

1. Filtr JSON faylı əlavə edin və ya mövcud faylı yeniləyin.
2. Vacib davranışı təsdiqləyən ən azı bir `tests[]` nümunəsi daxil edin.
3. Yeni əmr ailələri üçün `tests/unit/compression/fixtures/rtk/` altında bir test nümunəsi əlavə edin.
4. Yeni çıxış sinfi təqdim edərkən əmrin aşkarlanması üçün test əhatəsi əlavə edin.
5. Yoxlama və geniş RTK keçidlərini işə salın.
6. Filtr layihəyə lokaldırsa, yalnız nəzərdən keçirildikdən sonra `.rtk/filters.json` faylını commit edin və `.rtk/trust.json` faylını yeniləyin.

---

## İntensivlik Səviyyələri (v3.8.16+)

RTK **sıxılmanın aqressivliyi** ilə **təhlükəsizlik** arasında tarazlıq yaradan **3 intensivlik səviyyəsini** dəstəkləyir. Səviyyə mühərrik konfiqurasiyasındakı `config.intensity` vasitəsilə təyin edilir.

### 3 Səviyyə

| Səviyyə               | Kəsilmə həddi         | Token qənaəti | Risk      | Ən uyğun istifadə sahəsi          |
| --------------------- | --------------------- | ------------- | --------- | --------------------------------- |
| `minimal`             | Bölmə başına 24 sətir | ~20-40%       | Çox aşağı | Kritik kontekstli istehsal mühiti |
| `standard` (standart) | Bölmə başına 24 sətir | ~50-70%       | Aşağı     | Gündəlik kodlaşdırma sessiyaları  |
| `aggressive`          | Bölmə başına 16 sətir | ~70-90%       | Orta      | Uzun sessiyalar, maksimum qənaət  |

### Kəsilmənin Baş Verdiyi Yer

Kəsilmə həddi `lineFilter.ts` faylına təsir edir:

```ts
// open-sse/services/compression/engines/rtk/index.ts:329-330 faylından
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Hər bölmənin həm **əvvəli**, həm də **sonu** qorunur; kəsilmə tətbiq edildikdə ortadakı məzmun silinir.

### Nələr Qalır və Nələr Kəsilir

| Məzmun                         | minimal             | standard            | aggressive          |
| ------------------------------ | ------------------- | ------------------- | ------------------- |
| Xətalar / stek treysləri       | ✅ qorunur          | ✅ qorunur          | ✅ qorunur          |
| Uğursuz testlər                | ✅ qorunur          | ✅ qorunur          | ✅ qorunur          |
| Yığım xətaları                 | ✅ qorunur          | ✅ qorunur          | ✅ qorunur          |
| Uğurlu testlər (təfərrüatlı)   | ✅ qorunur          | 🟡 yığcamlaşdırılır | 🟡 yığcamlaşdırılır |
| Adi çıxış (məlumat jurnalları) | 🟡 yığcamlaşdırılır | 🟡 yığcamlaşdırılır | ❌ silinir          |
| İrəliləyiş indikatorları       | 🟡 yığcamlaşdırılır | ❌ silinir          | ❌ silinir          |
| Banner / ASCII qrafikası       | 🟡 yığcamlaşdırılır | ❌ silinir          | ❌ silinir          |

### Düzgün İntensivliyin Seçilməsi

```
                  Kontekstin itirilməsi fəlakətlidirmi?
                  │
      ┌───────────┼───────────┐
      │           │           │
    BƏLİ         XEYR       ƏMİN DEYİLƏM
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Məhsuldarlıq    Əvvəlcə `standard` sınayın
      │      nə qədər        (halların 80%-i üçün
      │      vacibdir?       uyğundur)
      │           │
      │      ┌────┴────┐
      │      │         │
      │    AŞAĞI     YÜKSƏK
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### İntensivliyin Konfiqurasiya Edilməsi

**Hər kombinasiya üçün** (kombinasiya konfiqurasiyasında):

```json
{
  "combo": "my-coding-combo",
  "routing": {/* ... */},
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

**Proqram vasitəsilə**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) bir
`CompressionEngine`-dir və `updateConfig` metoduna malik deyil. Əvəzində mühərrikin konfiqurasiyasını
reyestr köməkçisi vasitəsilə yeniləyin:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Təsirin Yoxlanılması

Filtrinizin seçdiyiniz intensivlikdə təhlükəsiz olduğunu təsdiqləmək üçün **Yoxlama Keçidindən** (aşağıya baxın) istifadə edin:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filtrlər aqressiv intensivlikdə uğursuz oldu");
}
```

---

## Fərdi Filtrlərin Hazırlanması (v3.8.16+)

`engines/rtk/filters/` qovluğunda **49-dan çox daxili filtr JSON faylı** var. Standart filtrlərin əhatə etmədiyi fərdi alətlərin çıxışını sıxışdırmaq üçün öz filtrlərinizi əlavə edə bilərsiniz.

### Filtr Sxemi (Zod)

```ts
{
  "id": "string",                      // Məcburidir. Filtr identifikatoru (kebab-case, məsələn, "python-traceback")
  "label": "string",                   // Məcburidir. İnsan tərəfindən oxuna bilən filtr adı
  "description": "string",             // İxtiyaridir (standart: ""). Filtrin nə etdiyinin qısa təsviri
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // İxtiyaridir (0-100, standart: 50). İcra sırası (daha yüksək = əvvəl)
  "match": {
    "commands": ["string"],            // Uyğunlaşdırılacaq əmr adları (məsələn, "python", "pytest")
    "patterns": ["string"],            // Çıxışla uyğunlaşdırılacaq regex nümunələri
    "outputTypes": ["string"]          // Aşkarlanmış çıxış sinifləri (məsələn, "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // İxtiyaridir (standart: false). ANSI rəng kodlarını silir
    "replace": [                       // Axtarış və əvəzləmə qaydaları (standart: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Nümunə uyğun gəldikdə icranı qısa yolla dayandırır (standart: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Bu nümunə uyğun gələrsə, ötür
      }
    ],
    "includePatterns": ["string"],     // Saxlanılacaq sətirlər (regex nümunələri, standart: [])
    "dropPatterns": ["string"],        // Silinəcək sətirlər (regex nümunələri, standart: [])
    "collapsePatterns": ["string"],    // Tək təkrara endiriləcək sətirlər (standart: [])
    "deduplicate": boolean,            // İxtiyaridir (standart: false). Təkrarlanan sətirləri silir
    "truncateLineAt": number,          // İxtiyaridir (standart: 0). Sətirləri maksimum simvol sayına qədər qısaldır
    "maxLines": number,                // İxtiyaridir (standart: 0). Ümumi sətir sayı üçün sərt limit
    "headLines": number,               // İxtiyaridir (standart: 20). Uyğun gələn çıxışın ilk N sətrini saxlayır
    "tailLines": number,               // İxtiyaridir (standart: 20). Uyğun gələn çıxışın son N sətrini saxlayır
    "onEmpty": "string",               // İxtiyaridir (standart: ""). Bütün sətirlər filtrlənərsə, ehtiyat mesaj
    "filterStderr": boolean            // İxtiyaridir (standart: false). stderr çıxışını da filtrləyir
  },
  "preserve": {
    "errorPatterns": ["string"],       // Həmişə saxlanılmalı olan nümunələr (standart: [])
    "summaryPatterns": ["string"]      // Yekun xülasə sətri üçün nümunələr (standart: [])
  },
  "tests": [                           // Yoxlama üçün daxili testlər (standart: [])
    {
      "name": "string",               // Məcburidir. Test adı
      "input": "sample output",        // Məcburidir. Nümunə giriş mətni
      "expected": "expected output",   // Məcburidir. Gözlənilən sıxışdırılmış çıxış
      "command": "optional command"    // İxtiyaridir. Əmr konteksti
    }
  ]
}
```

### Nümunə: Python Traceback Filtri

```json
{
  "id": "python-traceback",
  "label": "Python Traceback Filter",
  "description": "Compresses Python tracebacks to essential file/line locations and error type",
  "category": "test",
  "priority": 60,
  "match": {
    "commands": ["python", "python3", "pytest", "uv", "poetry"],
    "patterns": ["Traceback \\(most recent call last\\)", "Error", "Exception"],
    "outputTypes": ["error-traceback"]
  },
  "rules": {
    "stripAnsi": true,
    "includePatterns": [
      "Traceback \\(most recent call last\\)",
      "^\\s*File \".+\", line \\d+",
      "^\\s*[A-Z][a-zA-Z]+Error:",
      "^\\s*[A-Z][a-zA-Z]+Exception"
    ],
    "dropPatterns": ["site-packages/", "^\\s+[a-z_]+\\([^)]*\\)$"],
    "headLines": 5,
    "tailLines": 3,
    "maxLines": 25,
    "filterStderr": true
  },
  "preserve": {
    "errorPatterns": ["Error:", "Exception:", "Traceback"],
    "summaryPatterns": ["^[A-Z][a-zA-Z]+(?:Error|Exception):"]
  },
  "tests": [
    {
      "name": "preserves-error-type-and-location",
      "input": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "expected": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n  File \"lib/utils.py\", line 17, in helper\nZeroDivisionError: division by zero",
      "command": "python app.py"
    }
  ]
}
```

### Fərdi Filtrlərin Yüklənməsi

Faylı tanınan qovluqlardan birinə yerləşdirin:

```
~/.omniroute/rtk/filters/my-filter.json     # İstifadəçi səviyyəsində
<project>/.rtk/filters/my-filter.json      # Layihə səviyyəsində
```

Filtrlər başlanğıc zamanı `open-sse/services/compression/engines/rtk/filterLoader.ts` faylındakı `loadRtkFilters()` vasitəsilə avtomatik yüklənir. Yükləyici filtrləri aşağıdakı mənbələrdə aşkar edir:

- Daxili kataloq: `open-sse/services/compression/engines/rtk/filters/`
- İstifadəçi qovluğu: `~/.omniroute/rtk/filters/`
- Layihə qovluğu: `<project>/.rtk/filters/`

Filtrləri proqram vasitəsilə yükləmək üçün:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Seçimlər: customFiltersEnabled (istifadəçi/layihə filtrlərini yükləyir, standart olaraq aktivdir),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Doğrulama

Filtrlər yüklənərkən Zod sxeminə uyğunluğu yoxlanılır. Yanlış struktura malik filtr yüklənməyəcək və xəta qeydə alınacaq:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

Quraşdırılmış bütün filtrləri yoxlamaq üçün `open-sse/services/compression/engines/rtk/verify.ts` faylından ixrac edilən `runRtkFilterTests()` funksiyasını çağırın.

### Ən Yaxşı Təcrübələr

1. **Həmişə `tests[]` daxil edin** — onlar filtrinizin işlədiyini sübut edir və reqressiyaların qarşısını alır
2. **Qısaqapanmalar üçün `matchOutput` istifadə edin** — əgər bir sətir mahiyyəti ifadə edirsə, bütün bloku əvəz edin
3. **`strip` əvəzinə `keep` seçiminə üstünlük verin** — açıq şəkildə müəyyən edilmiş «həmişə qoruyub saxla» qaydaları «həmişə sil» qaydalarından daha təhlükəsizdir
4. **Hər 3 intensivlik səviyyəsində sınaqdan keçirin** — `minimal` heç bir əməliyyat yerinə yetirməməli, `aggressive` isə yenə də xətaları qoruyub saxlamalıdır
5. **`unless` sahəsindən istifadə edin** — qısaqapanmaları «X mövcuddursa, işə salma» şərti ilə qoruyun

---

## Xam Çıxışın Bərpası və Yoxlama Keçidi

RTK çıxışı aqressiv şəkildə sıxdıqda, sazlama, audit və ya təkrar icra üçün **orijinal mətni bərpa edə bilərsiniz**.

### Xam Çıxışın Bərpası Necə İşləyir

```
Orijinal çıxış (10K token)
        │
        ▼
RTK sıxılması (rawOutput.enabled=true ilə)
        │
        ├─▶ Sıxılmış çıxış (2K token)  ──▶ LLM-ə
        │
        └─▶ Orijinal çıxış (10K token) ──▶ DB-də saxlanılır
                                                (request_id ilə əlaqələndirilir)
```

### Xam Çıxışın Saxlanmasının Aktivləşdirilməsi

**Hər sorğu üçün** (combo konfiqurasiyasında):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // 1MB limit
    }
  }
}
```

**Standart parametr**: `rawOutput.enabled: false` (yaddaş sahəsinə qənaət edir).

### Saxlama Xərci

| Hər sorğu üçün       | 1MB limit    | 10MB limit    |
| -------------------- | ------------ | ------------- |
| Orta sıxılmış çıxış  | ~5KB         | ~5KB          |
| Saxlanılan xam çıxış | ~50-500KB    | ~500KB-5MB    |
| Gündə 1000 sorğu ilə | 50-500MB/gün | 500MB-5GB/gün |

> **Tövsiyə**: Xam çıxışı daimi deyil, yalnız **sazlama sessiyaları** və ya **nümunələnmiş audit** üçün aktivləşdirin.

### Orijinalın Bərpası

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // sıxılma statistikasından əldə edilən pointerId
if (raw) {
  console.log("Original output:", raw);
}
```

`pointerId` sıxılmadan sonra `CompressionStats.rtkRawOutputPointers[]` daxilində qaytarılır.
Funksiya imzası üçün `open-sse/services/compression/engines/rtk/rawOutput.ts:102` faylına baxın.

### Yoxlama Keçidi

**RTK Filtr Yoxlaması** (`open-sse/services/compression/engines/rtk/verify.ts`) bütün filtrləri onların `tests[]` dəstləri əsasında yoxlayır və davranışın hər 3 intensivlik səviyyəsində düzgün olmasını təmin edir.

Yoxlamanı icra etmək üçün **`runRtkFilterTests()` çağırın**:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Passed: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Failed: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Filters failed verification");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: expected "${o.expected}", got "${o.actual}"`
      );
    });
}
```

**Yoxladıqları**:

1. Hər bir filtr yüklənir və sxem yoxlamasından keçir
2. Hər bir `tests[]` elementi gözlənilən çıxışı yaradır
3. `minimal` intensivlik heç bir əməliyyat həyata keçirmir (orijinalı qoruyur, yalnız struktur filtrlərini tətbiq edir)
4. `aggressive` intensivlik xətaları, uğursuz testləri və stek izlərini qoruyur
5. Sıxılmış çıxış heç vaxt orijinal girişdən böyük olmur

- Mənbə: `open-sse/services/compression/engines/rtk/` (63 fayl, ~70KB)

- **Filtr dəyişikliyini birləşdirməzdən əvvəl** — həmişə testlərin uğurla keçdiyinə əmin olun
- **RTK mühərrikini təkmilləşdirdikdən sonra** — sxem dəyişmiş ola bilər
- **Monitorinq zamanı periodik olaraq** — test qurğularındakı yayınmalardan qoruyur
- **Yeni alət/əmr ailəsi əlavə edərkən** — yeni filtrin işlədiyini təsdiqləyir

---

## Həmçinin baxın

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Tam sıxılma konveyerinə ümumi baxış
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Mühərrik reyestri və daxili mühərriklər
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Fərdi mühərriklər, dil paketləri, yığılmış konveyerlər
- Mənbə: `open-sse/services/compression/engines/rtk/` (63 fayl, ~70KB)
