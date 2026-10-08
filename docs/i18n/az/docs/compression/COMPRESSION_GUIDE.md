# 🗜️ Prompt Compression Guide — OmniRoute (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Uyğun kontekstdə avtomatik olaraq 15-95% qənaət edin. Qısa icmal üçün [README-dəki Sıxılma bölməsinə](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically) baxın.

## İcmal

OmniRoute sorğular yuxarı axın provayderlərinə çatmazdan əvvəl **proaktiv şəkildə** işləyən modul tipli prompt sıxılma konveyerini həyata keçirir. Bu o deməkdir ki, token qənaəti şəffaf şəkildə baş verir — iş prosesinizdə heç bir dəyişiklik tələb olunmur.

```
Müştəri sorğusu
  → Sıxılma strategiyasının seçicisi
    → Kombinasiya üzrə üstün təyin edilmiş parametr var? → Kombinasiya parametrindən istifadə et
    → Avtomatik işə düşmə həddi keçilib? → Avtomatik rejimdən istifadə et
    → Defolt rejim var? → Qlobal parametrdən istifadə et
    → Söndürülüb? → Sıxılmanı ötür
  → Seçilmiş sıxılma rejimi
    → Söndürülüb: Sıxılma yoxdur
    → Yüngül: Təhlükəsiz boşluq/formatlama təmizlənməsi (~15%)
    → Standart: Mağara adamı üslubunda doldurucu sözlərin silinməsi (~30%)
    → Aqressiv: Tarixçənin köhnəldilməsi + xülasələşdirmə (~50%)
    → Ultra: Evristik seyrəltmə + kod bloklarının incəldilməsi (~75%)
    → RTK: Əmr əsaslı terminal/alət çıxışı filtrləməsi (yuxarı axında 60-90% diapazon)
    → Yığılmış: Ardıcıllığı müəyyən edilmiş çoxmühərrikli konveyer, adətən əvvəl RTK, sonra Caveman (uyğun kontekstdə 78-95% diapazon)
  → Sıxılmış sorğu → Provayder
```

---

## Sıxılma rejimləri

### Söndürülüb

Heç bir sıxılma tətbiq edilmir. Bütün mesajlar dəyişdirilmədən ötürülür.

### Yüngül rejim (~15% qənaət, <1ms gecikmə)

Ən təhlükəsiz rejim — semantik dəyişiklik yoxdur, yalnız formatlama təmizlənir:

| Texnika                  | Təsvir                                                          |
| ------------------------ | --------------------------------------------------------------- |
| `collapseWhitespace`     | Ardıcıl boş sətirləri və sətir sonundakı boşluqları birləşdirir |
| `dedupSystemPrompt`      | Dublikat sistem mesajlarını silir                               |
| `compressToolResults`    | Ətraflı alət/funksiya çıxışlarını sıxır                         |
| `removeRedundantContent` | Təkrarlanan təlimatları silir                                   |
| `replaceImageUrls`       | base64 şəkil məlumatı URI-lərini qısaldır                       |

**Ən uyğundur:** Daim aktiv istifadə, təhlükəsizliyin kritik olduğu iş prosesləri.

### Standart rejim (~30% qənaət)

[Caveman](https://github.com/JuliusBrussee/caveman)-dən ilhamlanıb — mənanı qoruyaraq doldurucu sözləri və müfəssəl ifadələri silir:

- Doldurucu sözləri ("zəhmət olmasa", "məncə", "əsasən", "əslində") silir
- Müfəssəl ifadələri yığcamlaşdırır ("etmək məqsədilə" → "etmək üçün", "nəticəsində" → "səbəbindən")
- Nəzakətli tərəddüd ifadələrini silir ("Etməyinizə etiraz etməzsiniz ki...", "Əgər mümkündürsə...")
- Kodlaşdırma promptları üçün optimallaşdırılmış 30-dan çox regex qaydası

**Ən uyğundur:** Gündəlik kodlaşdırma iş prosesləri, xərclərə diqqət yetirən komandalar.

### Aqressiv rejim (~50% qənaət)

Uzun sessiyalar üçün ağıllı tarixçə idarəetməsi:

- **Mesajların köhnəldilməsi** — daha köhnə mesajlar getdikcə daha çox sıxılır
- **Alət nəticələrinin sıxılması** — uzun alət çıxışları qısaldılır və ya ixtisar edilir (ilk/son sətirlər,
  uyğun sətirlərin filtrlənməsi, JSON açarlarının yığcamlaşdırılması)
- **Struktur bütövlüyü qoruyucuları** — `tool_use` + `tool_result` cütlərinin uyğun qalmasını təmin edir
- **Kontekst pəncərəsinin nəzərə alınması** — hər model üzrə token limitlərinə riayət edir

**Ən uyğundur:** Uzunmüddətli sazlama sessiyaları, böyük kod bazaları.

### Ultra rejim (~75% qənaət)

Token baxımından kritik ssenarilər üçün maksimum sıxılma:

- **Evristik seyrəltmə** — mətnin bal əsaslı token seyrəldilməsi
- **Strukturun qorunması** — çəpərlənmiş kod blokları, sətirdaxili kod, URL-lər və identifikatorlar
  müvəqqəti işarələnir və dəyişdirilmədən yenidən birləşdirilir, heç vaxt seyrəldilmir
- **İstəyə bağlı SLM səviyyəsi** — konfiqurasiya edildikdə kiçik lokal model seyrəltməni təkmilləşdirə bilər
- Aqressiv rejimdən asılı deyil: mesajların köhnəldilməsini, alət nəticələrinin sıxılmasını
  və ya ehtiyat xülasələşdiricini işə salmır (yalnız SLM səviyyəsindəki nasazlıq ehtiyat keçidi
  aqressiv rejim üzərindən yönləndirə bilər)

**Ən uyğundur:** Kontekst limitlərinə dəfələrlə çatdığınız hallar.

### RTK rejimi (yuxarı axında 60-90% diapazon)

RTK rejimi kodlaşdırma agenti sessiyalarında görünən ətraflı alət çıxışları üçün optimallaşdırılıb:

- `git status`, `git diff`, `git log`, test icraçıları,
  TypeScript/Vite/Webpack yığımları, ESLint/Biome/Prettier, npm audit/quraşdırmaları, Docker jurnalları, infrastruktur
  çıxışı və ümumi qabıq çıxışı kimi əmr/çıxış siniflərini aşkarlayır
- `open-sse/services/compression/engines/rtk/filters/` daxilindəki JSON filtr paketlərini tətbiq edir
- Layihə və ya qlobal `filters.toml` fayllarından RTK TOML schema v1 filtrlərini idxal edir,
  sətirdaxili test yoxlaması və layihə faylları üçün etibar nəzarəti tətbiq edir
- Sətirdaxili yoxlama nümunələri ilə birlikdə 55 daxili filtr təqdim edir
- ANSI idarəetmə ardıcıllıqlarını, irəliləyiş zolaqlarını, təkrarlanan sətirləri və əməli fayda verməyən səs-küyü silir
- Uğursuzluqları, xətaları, xəbərdarlıqları, dəyişdirilmiş faylları, xülasələri və uzun çıxışın son hissəsini qoruyur
- Etibar nəzarətli layihə filtrlərini, qlobal filtrləri və istəyə bağlı redaktə edilmiş xam çıxışın bərpasını dəstəkləyir

**Ən uyğundur:** Qabıq, yığım, test, git, grep və fayl çıxışı transkriptləri olan agent sessiyaları.

### Yığılmış rejim (uyğun kontekstdə 78-95% diapazon)

Yığılmış rejim bir neçə sıxılma mühərrikini deterministik ardıcıllıqla işə salır. Defolt konveyer belədir:

```txt
RTK -> Caveman
```

Bu ardıcıllıq əvvəlcə terminal/alət çıxışını yığcamlaşdırır, sonra qalan təbii dil promptuna Caveman semantik yığcamlaşdırmasını
tətbiq edir. Yığılmış konveyerlər qlobal şəkildə və ya marşrutlaşdırma kombinasiyalarına təyin edilmiş
sıxılma kombinasiyaları vasitəsilə konfiqurasiya edilə bilər.

**Ən uyğundur:** Böyük alət jurnalları ilə insan təlimatlarını və ya köməkçi xülasələrini birləşdirən qarışıq kontekst.

---

## Yuxarı Axın Qənaətlərinin Hesablanması

OmniRoute sıxılma qənaətlərini iki mənbə əsasında sənədləşdirir: yuxarı axın layihələrinin bençmarkları və
OmniRoute-un öz mühərrik kombinasiyası.

| Mənbə   | Burada istifadə edilən yuxarı axın README göstəricisi                                                                         |
| ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` daha az çıxış tokeni, bençmark üzrə orta hesabla `65%` çıxış qənaəti, `22-87%` diapazonu və `~46%` giriş sıxılma aləti |
| RTK     | Komanda çıxışında `60-90%` qənaət; nümunə sessiya: `~118,000 -> ~23,900` token və ya `79.7%` qənaət (`~80%`)                  |

Üst-üstə düşən alət/kontekst yükləri üçün standart OmniRoute kombinasiyası mühərrikləri ardıcıl tətbiq edir:

```txt
RTK -> Caveman
```

Birləşdirilmiş qənaətlər toplanmır, vurulur:

```txt
combined = 1 - (1 - RTK qənaəti) * (1 - Caveman giriş qənaəti)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Bu `78-95%` göstəricisi həm RTK, həm də Caveman eyni giriş/kontekst yükünü azalda bildikdə tətbiq olunur.
Caveman cavab çıxışı rejimi ayrıdır: aktivləşdirildikdə Caveman-in öz çıxış qənaətlərindən (orta hesabla `65%`,
əsas göstərici `~75%`, diapazon `22-87%`) istifadə edin. Ümumi ödəniş qənaətləri sorğu/çıxış nisbətinizdən asılıdır.

### "Uyğun" əslində nə deməkdir

Başlıqda göstərilən 15-95% diapazonu realdır, lakin o yalnız **təkrarlanan və ya həddindən artıq təfərrüatlı**
məzmuna — təkrarlanan xəta sətirlərinə, eyni xəbərdarlığı durmadan çıxaran yığım jurnalına, həddindən artıq böyük
`grep`/fayl oxuma çıxışına tətbiq olunur. Bu, hər sorğunun bu qədər qənaət təmin etdiyi
**demək deyil**.

Empirik olaraq təsdiqlənib (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): 300 eyni
xəta sətrindən ibarət Anthropic formalı `tool_result` bloku üzərində `stacked` (RTK + Caveman) icrası
**95.93% token qənaəti / 96.26% simvol qənaəti** təmin edib — bu da elan edilən diapazona tam uyğundur.
Lakin eyni emal xətti normal, təkrarlanmayan alət çıxışı (təmiz `grep` uyğunluq siyahısı,
qısa fayl oxunuşu, adi danışıq mətni) üzərində işlədildikdə haqlı olaraq **sıfıra yaxın qənaət** təmin edir, çünki
silinəcək təkrarlanan heç nə yoxdur və `validateCompression()` (`validation.ts`) kod bloklarını, URL-ləri,
başlıqları, versiyaları və ya TAMAMILƏ-BÖYÜK-HƏRFLƏRLƏ yazılmış sabit identifikatorları siləcək və ya dəyişdirəcək
yenidən yazılmış məzmunun göndərilməsinə icazə vermir.

Bu, xəta deyil, gözlənilən və təhlükəsiz davranışdır: əsasən təmiz faylları oxuyan/`grep` ilə axtaran kodlaşdırma sessiyasında
sıxılma tam aktiv olsa belə, ümumi qənaət az olacaq, uğursuzluq dövrəsinə və ya həddindən artıq çox məlumat çıxaran
linterə rast gələn sessiyada isə həmin trafik üzrə tam 78-95% diapazonu müşahidə ediləcək. Tək bir sessiyanın
aşağı məcmu qənaət faizini sıxılmanın yanlış konfiqurasiya edildiyinə sübut kimi istifadə etməyin — əvvəlcə
əsas alət çıxışının həqiqətən təkrarlanan olub-olmadığını yoxlayın.

---

## Token Qənaətinin Vizual Təqdimatı

```
Sıxılma olmadan:       LLM-ə 47K token göndərilir
Lite ilə:              40K token göndərilir          (15% qənaət — təhlükəsiz, həmişə aktiv)
Standard ilə:          33K token göndərilir          (30% qənaət — caveman-speak qaydaları)
Aggressive ilə:        24K token göndərilir          (50% qənaət — köhnəlmə + ümumiləşdirmə)
Ultra ilə:             12K token göndərilir          (75% qənaət — evristik budama)
RTK ilə:               19K-5K token göndərilir       (komanda/alət çıxışında 60-90% qənaət)
Stacked ilə:           10K-2.5K token göndərilir     (uyğun RTK+Caveman məzmununda 78-95% diapazonu)
```

---

## Konfiqurasiya

### İdarəetmə paneli

`Dashboard → Context & Cache` bölməsinə keçin:

- **Caveman** — rejim seçimi, dil paketləri, önizləmə və qlobal standart parametrlər
- **RTK** — əmr filtrinin önizləməsi, RTK təhlükəsizlik parametrləri və filtr kataloqu
- **Compression Combos** — marşrutlaşdırma kombinasiyalarına təyin edilən adlandırılmış mühərrik konveyerləri
- **Auto-Trigger Threshold** — token sayı həddi keçdikdə sıxılmanı avtomatik aktivləşdirir

### Kombinasiya üzrə əvəzləmə

`Dashboard → Context & Cache → Compression Combos` bölməsində marşrutlaşdırma kombinasiyasına sıxılma
kombinasiyası təyin edin:

```txt
Kombinasiya: "free-tier-fallback"
  Sıxılma kombinasiyası: "coding-agent-stack"
  Konveyer: RTK -> Caveman
  Hədəflər:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Bu, ödənişli abunəliklərdə yüngül rejimi saxlayaraq pulsuz/kodlaşdırma provayderlərində mərhələli
sıxılmadan istifadə etməyə imkan verir.

Bu "Kombinasiya üzrə əvəzləmə" təyinatı **marşrutlaşdırma kombinasiyasının sıxılma rejimi**
əvəzləməsindən (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — sahənin
sxemi həmçinin `rtk`, `stacked` və `omniglyph` dəyərlərini qəbul edir) fərqli idarəetmə elementidir —
həmin əvəzləmə adlandırılmış sıxılma kombinasiyası konveyerini seçmir; o, sadəcə
`resolveCompressionPlan` tərəfindən istifadə edilən `compressionMode` sahəsini təyin edir. Bu,
kombinasiya kartında (`Dashboard → Combos`) və ya #6760-dan etibarən
`Dashboard → Context & Cache → Compression Combos` bölməsindəki "Assign to routing" siyahısında,
yuxarıda sənədləşdirilmiş konveyer təyinatı seçiminin yanında hər marşrutlaşdırma kombinasiyası üçün
təyin edilə bilər. Hər iki interfeys dəyişiklikləri eyni `PUT /api/combos/{id}` son nöqtəsi vasitəsilə saxlayır.

### Sorğu üzrə əvəzləmə

Tək bir sorğu üçün sıxılma planını əvəzləmək məqsədilə `x-omniroute-compression` sorğu başlığını
göndərin. O, ən yüksək prioritetə malikdir — marşrutlaşdırma kombinasiyası əvəzləməsindən, aktiv profildən,
avtomatik aktivləşdirmədən və paneldəki Default seçimindən üstündür. Naməlum dəyərlər nəzərə alınmır
(sorğu heç vaxt rədd edilmir) və qlobal əsas keçid yenə də hər şeyi idarə edir: sıxılma qlobal səviyyədə
söndürülübsə, başlıq onu aktivləşdirə bilməz. Dəyərlər:

| Dəyər         | Təsir                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| `off`         | Bu sorğu üçün sıxılma yoxdur.                                                                                  |
| `default`     | Paneldən əldə edilən Default profili (aktiv profili nəzərə almır). İtkili mühərriklər söndürülmüş qalır.       |
| `safe`        | Başlığın buraxılması ilə eynidir: yalnız dublikatların silinməsi və boşluqların yığcamlaşdırılması.            |
| `allow-lossy` | Xülasələr, uyğunluq filtrləri və üslub yenidən yazmaları daxil olmaqla, bu sorğunun operator planını saxlayır. |
| `engine:<id>` | Aktiv olduqda tək mühərrik, məsələn, `engine:rtk`. Bu, həmin mühərrik üçün sorğu üzrə qoşulma seçimidir.       |
| `<combo>`     | Əvvəlcə ada görə (registrdən asılı olmayaraq), sonra isə id-yə görə uyğunlaşdırılan adlandırılmış kombinasiya. |

`allow-lossy`, `engine:<id>` və ya adlandırılmış kombinasiya olmadan itkili mühərriklər tətbiq edilmir.
Sıxılma aktiv olduqda sorğu yenə də sessiya dublikatlarının silinməsindən və boşluqların
yığcamlaşdırılmasından keçir.

Tətbiq edilən plan `X-OmniRoute-Compression: <mode>; source=<source>` cavab başlığında geri qaytarılır;
burada `<source>` `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default`
və ya `off` dəyərlərindən biridir.

### API

```bash
# Sıxılma parametrlərini əldə edin
curl http://localhost:20128/api/settings/compression

# Sıxılma parametrlərini yeniləyin
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Müəyyən RTK/stacked faydalı yükünü önizləyin
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK filtr paketlərini siyahıya alın
curl http://localhost:20128/api/context/rtk/filters

# Əlavə əmr metadatası ilə RTK-nı birbaşa sınaqdan keçirin
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Nələr Qorunur

Sıxılma mühərriki **həmişə bunları qoruyur:**

- ✅ Kod blokları (çərçivələnmiş və sətirdaxili)
- ✅ URL-lər və fayl yolları
- ✅ JSON strukturları və strukturlaşdırılmış verilənlər
- ✅ İdentifikatorlar və qorunan texniki tokenlər
- ✅ Riyazi ifadələr
- ✅ Alət/funksiya çağırışı tərifləri
- ✅ Sistem promptları (lite rejimində)

RTK xam çıxışın bərpası hər hansı məlumat yadda saxlanmazdan əvvəl geniş yayılmış API açarlarını, bearer tokenlərini, Slack tokenlərini, AWS giriş açarlarını, parolları, tokenləri və məxfi məlumatları redaktə edir.

---

## Sıxılma Statistikası

Hər sıxılmış sorğu server jurnallarında statistikanı ehtiva edir:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Mərhələlər üzrə Yol Xəritəsi

| Mərhələ    | Rejimlər                                                                                                                                                                       | Status       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| Mərhələ 1  | Söndürülmüş, Lite                                                                                                                                                              | ✅ Buraxılıb |
| Mərhələ 2  | Standard, Aggressive, Ultra                                                                                                                                                    | ✅ Buraxılıb |
| Mərhələ 3  | RTK, Stacked, Sıxılma Kombinasiyaları                                                                                                                                          | ✅ Buraxılıb |
| Mərhələ 4  | Çıxış Üslubları, SLM səviyyəli Ultra, qiymətləndirmə mexanizmi                                                                                                                 | ✅ Buraxılıb |
| Mərhələ 4C | Adaptiv kontekst büdcəsi ("tənzimləyici") — hesablama mühərriki + API (`PUT /api/settings/compression` üzərində `contextBudget`) + idarə panelində rejim/siyasət idarəetmələri | ✅ Buraxılıb |

---

## Təşəkkürlər

Standard rejiminin sıxılma qaydaları **[JuliusBrussee](https://github.com/JuliusBrussee)** tərəfindən hazırlanmış **[Caveman](https://github.com/JuliusBrussee/caveman)** (⭐ 51K+) — viral "az token işi görərkən niyə çox token istifadə etməli" layihəsindən ilhamlanıb. Caveman çıxış tokenlərinin `~75%` azaldığını, bençmark üzrə orta çıxış qənaətinin `65%` olduğunu, çıxış diapazonunun `22-87%` təşkil etdiyini və `~46%` giriş sıxılma alətini bildirir.

RTK rejimi **[RTK AI](https://github.com/rtk-ai)** tərəfindən hazırlanmış **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** — terminal, yığma, sınaq, git və alət çıxışlarının filtrlənməsi üçün yüksək məhsuldarlıqlı əmr çıxışı sıxılma layihəsindən ilhamlanıb. RTK `60-90%` qənaət bildirilir və onun README nümunə sessiyasında `~80%` qənaət göstərilir.

---

## Təkmil Sıxılma Sistemləri

Yuxarıda təsvir edilən 7 rejimdən əlavə (mənbə həmçinin bu təlimatda əhatə olunmayan `codex-responses` və `omniglyph` rejimlərini qəbul edir), aşağıdakı bölmələr həmin rejimlərin daxilində və ya onlarla yanaşı işləyən funksiyaları əhatə edir: Alət Nəticəsinin Sıxılması və Proqressiv Köhnəlmə aggressive mühərrikinin 1-ci və 2-ci addımlarıdır (Aggressive rejimi və stacked konveyerinin `aggressive` addımı), Yığılmış Konveyer Stacked rejiminin işləmə üsuludur, Keşdən Xəbərdar Sıxılma sıxılma aktiv olduğu müddətdə keşləmə provayderləri üçün `aggressive` və `ultra` strategiyalarını `standard` strategiyasına endirir, Caveman Çıxış Rejimi və Çıxış Üslubları isə standart olaraq söndürülmüş, sorğunu sıxmaq əvəzinə modelin çıxışını formalaşdıran, seçim əsasında aktivləşdirilən sistem promptu təlimatlarıdır.

### Keşdən Xəbərdar Sıxılma

Bəzi provayderlər (məsələn, prompt keşləməsindən istifadə edən Anthropic) **prompt keşləməsini** dəstəkləyir; bu, xərcləri və gecikməni azaltmaq üçün promptun hissələrini keşləməyə imkan verir. Keşləmə aktiv olduqda, aqressiv sıxılma əslində məhsuldarlığa **zərər verə bilər**, çünki keşlənmiş tokenləri dəyişdirərək keşi etibarsız edir.

`cachingAware.ts` modulu bunu **keşləmə kontekstini aşkarlamaq** və **sıxılma strategiyasını** müvafiq şəkildə tənzimləməklə həll edir.

#### Necə işləyir

1. **Keşləmə kontekstini aşkarlayır** — Sorğu gövdəsində `cache_control` markerlərini axtarır
2. **Keşləmə provayderlərini müəyyənləşdirir** — Hədəf provayderin keşləməni dəstəkləyib-dəstəkləmədiyini yoxlayır
3. **Strategiyanı tənzimləyir** — Keşləmə provayderləri üçün `aggressive`/`ultra` strategiyalarını `standard` strategiyasına endirir
4. **Sistem promptunu ötürür** — Sistem promptları adətən keşlənir, buna görə onları sıxmır

Strategiya köməkçisi həmçinin `deterministicOnly` bayrağını qaytarır, lakin plan qurucusu yalnız strategiyadan istifadə edir — hazırda aşağı axında heç nə bu bayrağı oxumur.

#### Kod nümunəsi

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Keş markeri
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Nə zaman istifadə edilməlidir

Keşdən xəbərdar sıxılma **həmişə aktivdir** — heç bir konfiqurasiya tələb olunmur. Sıxılma aktiv olduqda və hədəf provayder prompt keşləməsini dəstəklədikdə (Anthropic, OpenAI və s.) işə düşür; açıq `cache_control` markerləri tələb olunmur — yalnız keşləmə provayderinin olması strategiyanın aşağı salınmasına səbəb olur, təkcə markerlər isə bunu heç vaxt etmir (marker aşkarlanması strategiya qərarına deyil, keş telemetriyasına məlumat verir).

### Proqressiv Köhnəlmə

Uzun söhbətlər çoxlu mesaj növbələri toplayır, lakin köhnə növbələr getdikcə daha az aktual olur. `progressiveAging.ts` modulu **mesajların keyfiyyətini növbə məsafəsinə görə azaldır** (məsafə söhbətin sonundan ölçülür). Təqdim edilən standart parametrlərlə (`verbatim: 2, light: 2, moderate: 3`):

- **Son 2 gediş (məsafə ≤ 2)**: Olduğu kimi saxlanılır
- **Məsafə 3**: Mağara adamı sıxışdırması (dolğu sözlərinin silinməsi)
- **Məsafə 4+**: Assistent mesajları xülasələşdirilir; istifadəçi mesajları ilk
  sətrə qədər qısaldılır və 120 simvolla məhdudlaşdırılır; digər rollara toxunulmur. Sistem promptları, artıq köhnəlmiş
  mesajlar və ən son istifadəçi mesajı məsafədən asılı olmayaraq həmişə olduğu kimi saxlanılır.
  Heç nə tamamilə silinmir və təqdim edilən standart parametrlərlə `light`
  diapazonuna çatmaq mümkün deyil (`light`, `verbatim` ilə eynidir).

#### Kod nümunəsi

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... daha 50 gediş ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // son 3 gediş: olduğu kimi
  light: 8, // məsafə <= 8: yüngül sıxışdırma
  moderate: 20, // məsafə <= 20: mağara adamı sıxışdırması
  fullSummary: 5, // tip tərəfindən tələb olunur, diapazonlaşdırma kodu tərəfindən oxunmur
  // məsafə > 20: xülasələşdirilir (assistent) / ilk sətir saxlanılır (istifadəçi)
});

// saved = qənaət edilən tokenlərin sayı
```

#### Nə vaxt istifadə etməli

Proqressiv köhnəlmə `aggressive` rejimi üçün **həmişə aktivdir** — bu,
`compressAggressive()` funksiyasının 2-ci addımıdır. Ultra rejim onu işə salmır. O,
xüsusilə aşağıdakılar üçün effektivdir:

- Uzunmüddətli kodlaşdırma sessiyaları
- Bir neçə gün davam edən söhbətlər
- Çoxlu alət çağırışı olan agent əsaslı iş axınları

### Mağara Adamı Çıxış Rejimi

Mağara adamı çıxış rejimi modelin özündən yığcam çıxış istəyən **sistem promptu təlimatları**
əlavə edir — `lite` səviyyəsi tam cümlələri saxlayan qısa cavablar, `full`
səviyyəsi ondan "ağıllı mağara adamı kimi yığcam cavab verməyi", `ultra` səviyyəsi isə teleqrafik çıxış
istəyir; təlimatlar yalnız tələb edir, buna zəmanət verə bilməz. Sorğular onları
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) vasitəsilə alır:
`open-sse/handlers/chatCore.ts` əvvəlcə seçimi geriyə uyğunluq vasitəçisi ilə həll edir
(`open-sse/services/compression/outputStyles/backCompat.ts` daxilindəki
`resolveOutputStyleSelection()`); `outputStyles` boş olduqda, bu vasitəçi aktiv
`cavemanOutputMode` parametrini `cavemanOutputMode.intensity` intensivliyində
`terse-prose` çıxış üslubuna uyğunlaşdırır (aşağıdakı Geriyə uyğunluq bölməsinə baxın); boş olmayan `outputStyles`
seçimi olduğu kimi istifadə edilir və bundan sonra `cavemanOutputMode.enabled` və `intensity`
heç bir təsir göstərmir, lakin onun `autoClarity` keçidi yenə də tətbiq olunur. `outputMode.ts`
təlimat mətnlərini (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), məzmunun yan keçmə mexanizmini və
yeritmə zamanı istifadə edilən yerləşdirmə köməkçisini ehtiva edir; onun öz
`applyCavemanOutputMode()` yeridicisinin istehsalat mühitində çağırıcısı yoxdur.

#### Necə işləyir

Bu rejim girişi sıxışdırmır. O, sistem promptuna təlimat bloku əlavə edir
(aşağıdakı Yeritmənin necə işlədiyi bölməsinə baxın) və sorğu üçün seçilmiş istənilən giriş sıxışdırma rejimi
daha sonra artıq həmin bloku ehtiva edən gövdə üzərində işləyir. Hər səviyyənin sonunda olan ortaq
sərhədlər bəndindən əvvəl ingiliscə `full` səviyyəsi belədir:

> "Ağıllı mağara adamı kimi yığcam cavab ver. Artiklları (a/an/the), dolğu sözlərini (just/really/basically/actually/simply), nəzakət ifadələrini və tərəddüd bildirən ifadələri çıxar. Natamam cümlələr olar. Qısa sinonimlərdən istifadə et (extensive yox, big; implement yox, fix). Bütün texniki məzmunu, kodu, xətaları, URL-ləri və identifikatorları olduğu kimi saxla."

Bu, xüsusilə aşağıdakılar üçün yaxşı işləyir:

- Kod generasiyası (daha yığcam çıxış = daha az token)
- Sürətli sual-cavab (ətraflı izahlara ehtiyac yoxdur)
- Toplu emal (ötürmə qabiliyyətini maksimuma çatdırır)

#### Nə vaxt istifadə etməli

Mağara adamı çıxış rejimi **istəyə bağlıdır**. Sıxışdırma aktiv olduqda (`enabled: true`,
Sıxışdırma Parametrləri səhifəsindəki əsas keçid), onu `cavemanOutputMode.enabled` ilə aktiv edin;
`intensity` isə `lite`, `full` və ya `ultra` seçir:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Sıxışdırma kombinasiyasının **Çıxış Rejimi** keçidi (`outputMode`, səviyyə isə `outputModeIntensity`
daxilindədir) həmin kombinasiyanın tətbiq olunduğu sorğular üçün eyni keçidi təyin edir və
`omniroute_set_compression_engine` MCP aləti bunu özünün məntiqi `outputMode`
arqumenti vasitəsilə yazır. Boş olmayan `outputStyles` seçimi bu keçiddən üstündür. İdarəetmə
panelində **Yığcam nəsr** çıxış üslubunun aktivləşdirilməsi eyni bloku yeridir (aşağıdakı Çıxış
Üslubları bölməsinə baxın).

### Çıxış Üslubları (kataloq)

Yuxarıdakı mağara adamı çıxış rejimi **köhnə tək üslublu yoldur**. 4-cü mərhələ onu
birləşdirilə bilən çıxış üslubları kataloquna ümumiləşdirdi:
`open-sse/services/compression/outputStyles/catalog.ts` daxilindəki `OUTPUT_STYLE_CATALOG`.
Hər üslub modelin özündən daha az xərc tələb edən çıxış istəyən sistem promptu təlimatıdır;
üslublar birlikdə aktivləşdirilə bilər və kataloq sırası ilə yeridilir.

| Üslub                               | `id`          | Nə edir                                                                                                                                                                                                                                | Təlimat dilləri                                  |
| ----------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Yığcam mətn                         | `terse-prose` | Doldurucu sözləri/artiklləri/tərəddüd ifadələrini çıxarır; texniki məzmunu dəqiq saxlayır. Köhnə mağara adamı çıxış rejimi ilə eyni mətndir (istinad edilir, yenidən yazılmır).                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi    |
| Daha az kod                         | `less-code`   | YAGNI pillələri: işləyən ən kiçik dəyişiklik, tələb olunmayan abstraksiyalar yoxdur.                                                                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi    |
| Atquyruğu (tənbəl senior proqramçı) | `ponytail`    | "Ən yaxşı kod heç vaxt yazılmayan koddur": təkrar istifadə > yenidən yazma, əsas səbəb > simptom, işləyən ən qısa diff.                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi    |
| Məndə ADHD var (əvvəlcə əməl)       | `i-have-adhd` | Əvvəlcə əməl (mətndən əvvəl əmr/yol/snippet), nömrələnmiş məhdud addımlar, BİR konkret növbəti addım, giriş/xülasə/yekun ifadələri yoxdur. [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) əsasında uyğunlaşdırılıb. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi    |
| Yığcam CJK (文言)                   | `terse-cjk`   | `full`/`ultra` cavabı Klassik Çin dilindədir (文言); `lite` yalnız köməkçi sözlər, nəzakət ifadələri və ya bəzək olmadan qısa cavablar tələb edir.                                                                                     | zh (lokala görə məhdudlaşdırılıb, aşağıya baxın) |

Hər üslub üç intensivlik səviyyəsi ilə təqdim olunur — `lite`, `full`, `ultra` — və hər səviyyə
kod bloklarını, fayl yollarını, əmrləri, xətaları və URL-ləri dəqiq saxlayan ortaq
məhdudiyyətlər bəndi (`outputMode.ts` daxilində `SHARED_BOUNDARIES`) ilə bitir. `terse-prose` və
`terse-cjk` səviyyə mətnləri həmin siyahıya identifikatorları da əlavə edir.

`terse-cjk` iki yerdə `zh` lokalı ilə məhdudlaşdırılıb. Sıxılma Parametrləri səhifəsi
onun sətrini yalnız idarəetmə panelinin UI dili Çin dili (`zh-CN` və ya `zh-TW`) olduqda göstərir və
`applyOutputStyles()` onu yalnız sorğunun müəyyən edilmiş dili (aşağıdakı Dil
seçimi bölməsinə baxın) `zh` olduqda əlavə edir. Sətrin gizlədilməsi saxlanılmış `terse-cjk` seçimini
təmizləmir: parametrlər API-si istənilən üslub id-sini qəbul edir və səhifədə digər üslubların
saxlanılması onu qoruyur. Sorğu zamanı `applyOutputStyles()` dil yoxlaması yeganə lokal
məhdudiyyətidir.

#### Əlavəetmə necə işləyir

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) seçimi
kataloq üzrə müəyyən edir (naməlum id-lər və lokala uyğun gəlməyən üslublar
silinir, heç vaxt xəta yaranmır; nəticədə heç bir üsluba uyğun gəlməyən seçim gövdəni
dəyişmədən saxlayır və `no_styles` kimi ötürülür), seçilmiş təlimatları kataloq
ardıcıllığı ilə birləşdirir,
məhdudiyyətlər bəndini **bir dəfə** əlavə edir (üstəlik `less-code` və ya `ponytail`
seçildikdə təhlükəsizlik bəndini, `SAFETY_BOUNDARIES` və ya onun tərcüməsini) və bloku
vahid idempotentlik markeri (`[OmniRoute Output Styles]`) ilə başlayır; beləliklə, onun
yenidən tətbiqi heç bir dəyişiklik etmir. Müəyyən edilmiş dil (aşağıdakı Dil seçimi
bölməsinə baxın) üçün tərcümə olduqda, ingiliscə təlimat əvəzinə lokallaşdırılmış
təlimat əlavə edilir.

Boş olmayan `messages` massivi olan gövdədə idempotentlik yoxlaması məzmunun
ötürülməsi yoxlamasından əvvəl işləyir: `[OmniRoute Output Styles]` markeri artıq üst səviyyəli
`system` sahəsində (sətir və ya məzmun blokları massivi) yaxud sətir məzmunlu sistem
mesajında olduqda, gövdə `already_applied` kimi dəyişdirilmədən saxlanılır və heç bir
açar söz yoxlaması aparılmır. Əks halda məzmunun ötürülməsi yoxlaması
(`open-sse/services/compression/outputMode.ts` daxilində `shouldBypassCavemanOutputMode()`)
rolundan asılı olmayaraq son üç mesajın mətnini yoxlayır və həmin mətn təhlükəsizlik,
geri qaytarılması mümkün olmayan əməl və ya aydınlaşdırma açar sözlərinə, yaxud
ardıcıllıqdan asılı bir kombinasiya ilə uyğun gəldikdə bütün gediş üçün üslubları
ötürür: `first`, `then`, `after that`, `before`, `rollback` və ya
`backup` sözündən sonra 240 simvol daxilində `delete`, `drop`, `migrate`, `deploy` və ya
`release` gəlməsi. Ötürmə yoxlaması **Auto-Clarity Bypass** keçidi
(`cavemanOutputMode.autoClarity`, standart olaraq aktivdir) aktiv olduğu müddətdə işləyir;
keçidin söndürülməsi açar söz yoxlamasını ötürür.

Ötürmə mexanizmi gedişə icazə verdikdə `placeSystemInstruction()` (eyni fayl)
heç vaxt yeni `messages[0]` yaratmır və bloku tapdığı ilk uyğun yerə yerləşdirir:

1. Sətir məzmunlu başlanğıc sistem mesajı: blok onun mətnindən sonra əlavə edilir.
2. Üst səviyyəli `system` sahəsi: blok sətirin mətnindən sonra əlavə edilir və ya
   məzmun blokları massivinə yeni mətn bloku kimi daxil edilir.
3. Sətir məzmunlu ilk sonrakı sistem mesajı: blok onun mətnindən sonra əlavə edilir.
4. Yuxarıdakılardan heç biri: blok `messages` massivinin sonunda yeni sistem mesajına yerləşdirilir.

`messages` massivi olmayan (və ya boş massivli) gövdədə məzmunun ötürülməsi yoxlaması
aparılmır və üst səviyyəli `system` sahəsi nəzərə alınmır. Blok sətir tipli
`instructions` sahəsinin mətnindən sonra əlavə edilir; həmin sahə artıq
`[OmniRoute Output Styles]` markerini ehtiva edirsə, gövdə `already_applied` kimi
dəyişdirilmədən saxlanılır. Gövdədə sətir tipli `instructions` sahəsi olmadıqda, lakin
`input` (sətir və ya massiv) olduqda, blok `instructions` olur və həmin sahədəki
istənilən qeyri-sətir dəyəri əvəz edir. Nə sətir tipli `instructions` sahəsi, nə də
sətir və ya massiv tipli `input` olan gövdə dəyişdirilmədən saxlanılır və `no_messages`
kimi ötürülür.

#### Necə aktivləşdirmək olar

İdarəetmə panelində: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), Output styles bölməsində: hər üslub üçün aktiv/deaktiv
keçidi və səviyyə seçicisi olan bir sətir mövcuddur. Sıxılmanın özü aktiv olduqda
(səhifənin əsas keçidi, `enabled`) üslublar əlavə edilir. **Auto-Clarity Bypass** keçidi
**Caveman** səhifəsində (`/dashboard/context/caveman`), onun **Output Mode** kartındadır.
Proqram səviyyəsində sıxılma konfiqurasiyası seçimi belə yadda saxlayır:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Geriyə uyğunluq: `outputStyles` boş olduğu müddətdə köhnə
`cavemanOutputMode.enabled` parametri `cavemanOutputMode.intensity` səviyyəsində
`terse-prose` üslubuna uyğunlaşdırılır. Bundan sonra blok `[OmniRoute Output Styles]`
markeri ilə başlayır; köhnə `applyCavemanOutputMode()` injektoru isə
`[OmniRoute Caveman Output Mode]` yazısını əlavə edirdi. Marker altında mətn en, pt-BR,
es, de, fr, it, ru, id və vi dillərində köhnə əlavə edilən mətnlə eynidir; ja və zh
dillərində sərhədlər bəndindən əvvəl bir əlavə boşluq var. `terse-prose` pt-BR, es, de,
fr, it, ru, zh, ja, id və vi dillərinə tərcümə olunur, buna görə müəyyən edilmiş dili
`hu` olan sorğu, köhnə injektorun macar dilindəki mətndən istifadə etdiyi yerdə ingilis
dilindəki mətni alır.

Çıxış üslubu dilinin seçilməsi (`outputStyles/apply.ts` daxilində
`resolveOutputStyleLanguage()`): `languageConfig.enabled` aktiv olduqda, `autoDetect`
sorğunun `messages` massivində mətni olan ən son istifadəçi mesajını (sətir məzmunu və
ya məzmun hissələrinin `text` sahəsi) nümunə kimi götürür və Caveman mühərrikinin
detektorunu (`detectCompressionLanguage()`) onun üzərində işlədir. Mətn kana işarələri
olmadan Han simvolları ehtiva edirsə, detektor `zh` qaytarır; əks halda `it`, `pt-BR`,
`es`, `de`, `fr`, `ru`, `ja`, `hu` və `id` arasında ən çox ipucu uyğunluğu olan dili,
heç bir uyğunluq olmadıqda isə `en` qaytarır — təsnif edə bilmədiyi mətn üçün
`defaultLanguage` deyil, ingilis dili seçilir və üslublar `vi` mətnini ehtiva etsə də,
`vi` heç vaxt aşkarlanmır. Responses API gövdəsi dialoq növbələrini `input` daxilində
saxlayır və bu hissə nümunə kimi götürülmür, buna görə əvvəlcə `defaultLanguage`, sonra
isə ingilis dili seçilir. `messages` daxilində heç bir istifadəçi mesajında mətn
olmadıqda və ya `autoDetect` deaktiv olduqda, əvvəlcə `defaultLanguage`, sonra isə
ingilis dili tətbiq edilir. `languageConfig.enabled` deaktiv olduqda dil ingilis dili
olur — sorğuya sıxılma kombinasiyası tətbiq edilmədiyi halda (sorğunun marşrutlaşdırma
kombinasiyasına təyin edilmiş kombinasiya və ya daxili yığılmış konveyer üçün chatCore-un
geri qayıtdığı standart sıxılma kombinasiyası): kombinasiyanın tətbiqi həmin sorğu üçün
`languageConfig.enabled` parametrini aktivləşdirir və `defaultLanguage` parametrini
kombinasiyanın dil paketlərinə əsasən təyin edir (saxlanmış dəyər kombinasiyanın
paketlərindən biridirsə həmin dəyər, əks halda standart olaraq `en` olan kombinasiyanın
ilk paketi), saxlanmış `autoDetect` parametri isə (standart olaraq aktivdir) yenə də
tətbiq olunur. Caveman giriş mühərriki qayda paketi dilini fərqli şəkildə seçir — hər
mətn hissəsi üçün ayrıca və avtomatik aşkarlama deaktiv olduqda `enabledPacks` ilə
məhdudlaşdırılaraq.

Üslub × dil matrisi
`tests/unit/compression/output-styles-i18n-matrix.test.ts` tərəfindən sabitlənir:
kataloqdakı hər üslubun testin `BASELINE_LANGUAGES` siyahısında qeydi olmalıdır;
lokalla məhdudlaşdırılmayan üslub pt-BR tərcüməsi ilə təqdim edilməlidir (lokalla
məhdudlaşdırılan `terse-cjk` bu qaydadan azaddır), yalnız heç bir tərcüməsi olmayan
üslubları saxlaya bilən `KNOWN_ENGLISH_ONLY` siyahısında olmadığı təqdirdə — siyahıya
daxil edilmiş üslubun hər hansı tərcüməsi varsa, test uğursuz olur; həmçinin üslub
`BASELINE_LANGUAGES` qeydində göstərilən dillərdən birini itirdikdə test uğursuz olur.
Üslub əlavə etmək üçün
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) sənədinə
baxın.

### Alət Nəticəsinin Sıxılması

`open-sse/services/compression/toolResultCompressor.ts` daxilindəki
`compressToolResult()` alət nəticəsi mətnini **5 strategiya** ilə sıxır. O, strategiyaları
bu ardıcıllıqla sınayır və yoxlaması məzmuna uyğun gələn ilk aktiv strategiya nəticəni
müəyyən edir:

1. **`fileContent`**: 3 və ya daha çox sətirdən ibarət məzmun; bu sətirlərdən ən azı biri başlanğıcdakı
   girintiyə məhəl qoymadan `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` və ya `return ` ilə (açar söz və ardınca boşluq), yaxud `(`
   və ya ` (` ilə davam edən `if`, `for` və ya `while` ilə başlayırsa, ixtisar edilmiş
   orta hissə işarələnməklə ilk 20 və son 5 sətir saxlanılır.
2. **`grepSearch`**: `<path>:<digits>:` formasında ən azı bir sətri olan məzmunda,
   ilk iki nöqtədən əvvəlki mətndə boşluq yoxdursa, yalnız həmin sətirlər, maksimum
   30 sətir saxlanılır, ardınca əlavə uyğunluqların sayı və uyğunluq tapılan faylların
   siyahısı verilir; bütün digər sətirlər silinir. Strategiyanı işə salmaq üçün belə
   bir sətir kifayətdir, buna görə `12:30:45` kimi vaxt möhürü ilə başlayan jurnal
   sətri də uyğun sayılır.
3. **`shellOutput`**: ANSI CSI ardıcıllığı (`ESC[`, sonra rəqəmlər və ya nöqtəli
   vergüllər, ardınca isə rəng kodlarında olduğu kimi hərf) və ya mətnin hər hansı
   yerində ardınca boşluq gələn `$` ehtiva edən çıxışdan həmin ardıcıllıqlar silinir
   (digər qaçış ardıcıllıqları, məsələn `ESC[?25l` və ya OSC pəncərə başlığı ardıcıllığı
   saxlanılır) və ardıcıl təkrarlanan sətirlər birləşdirilməklə son 50 sətir saxlanılır.
   Bu yoxlama `json` və `errorMessage` strategiyalarından əvvəl icra edildiyinə görə
   belə bir `$` ehtiva edən JSON və ya xəta çıxışı `shellOutput` aktiv olduqda onlara
   heç vaxt çatmır.
4. **`json`**: isteğe bağlı boşluqdan sonra `{` və ya `[` ilə başlayan, sintaktik
   təhlildən keçən və 2.000 simvoldan uzun JSON faydalı yükü xülasələşdirilir: 7-dən
   çox elementi olan massivdə ilk 5 və son 2 element, eləcə də elementlərin ümumi sayı
   saxlanılır; obyektdə isə ilk 20 açar saxlanılır, hər bir iç-içə obyekt və ya massiv
   dəyəri `{…N keys}` yer tutucusu ilə əvəzlənir (massiv üçün N onun uzunluğudur) və
   ilk 20 açardan sonra silinən açarların sayını göstərən `_remaining_<N>_keys`
   işarələyicisi əlavə olunur. Skalyar dəyərlər bütövlükdə köçürülür, buna görə iç-içə
   dəyərləri olmayan və 20 və ya daha az açarı olan obyekt sadəcə yenidən girintilənir —
   minifikasiya edilmiş obyektin simvol sayı artır və o, dəyişməz saxlanılır.
5. **`errorMessage`**: hər hansı yerində və hərf registrindən asılı olmayaraq `error:`,
   `error ` (`no error found` nümunəsində olduğu kimi sözdən sonra boşluq), `[error]`,
   `exception:`, `exception `, `[exception]` və ya `traceback` olan çıxışda ilk sətir,
   sonrakı 10 sətir və son 3 sətir saxlanılır, onların arasındakı sətirlərin yerinə
   `… [N frames elided] …` işarələyicisi qoyulur. İşarələyici yalnız ilk sətirdən sonra
   13-dən çox sətir olduqda görünür, buna görə 14 və ya daha az sətirlik xəta çıxışı
   qısaldılmır (12 və ya 13 sətir olduqda son 3 sətir artıq saxlanılmış sətirləri
   təkrarlayır).

Strategiya uyğun gəldikdən sonra, heç bir qənaət təmin etməsə belə, sonrakı strategiyalar
sınaqdan keçirilmir. Uyğun gələn strategiya təxmini tokenlərə (uzunluq ÷ 4, yuxarıya
yuvarlaqlaşdırılır) qənaət etmədikdə — məsələn, 25 və ya daha az sətirlik koda bənzər
fayl, yaxud 2.000 simvoldan uzun, 7 və ya daha az elementi olan JSON massivi —
aqressiv mühərrik ilkin alət nəticəsini saxlayır: hər iki çağıran (`compressAggressive()`
və `compressAnthropicToolResultBlock()`) `saved` 0 və ya daha az olduqda ilkin nəticəni
saxlayır, `compressToolResult()` özü isə yenə də həmin strategiyanın çıxışını qaytarır.
Alət nəticəsi mərhələsi son qərar deyil: mühərrikin ehtiyat xülasələşdiricisi 8.192
simvoldan uzun `tool` və ya `function` mesajını (`maxTokensPerMessage`, 2.048, 4-ə
vurulur) yenə də qısalda bilər.

#### Nə vaxt istifadə edilməlidir

Alət nəticəsinin sıxılması aqressiv mühərrikin 1-ci mərhələsidir (`compressAggressive()`,
`open-sse/services/compression/aggressive.ts`), buna görə o, Aqressiv rejimdə və
yığılmış konveyerin `aggressive` mərhələsində işləyir. O, OpenAI formatlı `tool` və
`function` mesajlarını, eləcə də Anthropic `tool_result` bloklarının daxilindəki mətni
sıxır. Hər strategiyanın `aggressive.toolStrategies` altında ayrıca keçidi var və
hamısı standart olaraq aktivdir. İdarə panelində sıxılma aktiv və standart rejim
Aqressiv olduqda keçidlər Caveman səhifəsinin **Qabaqcıl** görünüşündə yerləşir.

### Yığılmış konveyer

Yığılmış rejim **bir neçə mühərriki ardıcıllıqla** işlədir — adətən əvvəlcə RTK
(alət çıxışında 60-90% qənaət), sonra isə qalan mətndə Caveman (girişdə təxminən 46%
qənaət). Birləşdirildikdə bu, **78-95% uyğun diapazon** deməkdir (yuxarıdakı Yuxarı
Axın Qənaətləri Riyaziyyatına baxın): `1 - (1 - 0.60..0.90) × (1 - 0.46)` orta hesabla
≈89% təşkil edir.

#### Necə işləyir

```
Giriş (1000 token)
  → RTK (əmri nəzərə alan filtr) → 200 token
    → Caveman (doldurucu mətnin silinməsi) → 108 token
  → Çıxış (108 token, ~89% qənaət)
```

#### Nə vaxt istifadə edilməlidir

Yığılmış rejimi aşağıdakı hallarda istifadə edin:

- Alətlərdən intensiv istifadə edilən iş axınları (agent əsaslı kodlaşdırma, araşdırma)
- Xərclərə həssas toplu emal
- Maksimum token qənaətinə ehtiyac olduqda

Yığılmış konveyerlər qlobal `stackedPipeline` sıxılma parametri vasitəsilə və ya
marşrutlaşdırma kombinasiyasına təyin edilmiş adlandırılmış sıxılma kombinasiyası
vasitəsilə konfiqurasiya edilir (yuxarıdakı Kombinasiya üzrə Yenidən Müəyyənləşdirməyə
baxın) — avtomatik kombinasiya `modePack` sahəsi vasitəsilə deyil (həmin sahə yalnız
avtomatik kombinasiya üçün model seçiminin çəkilərini dəyişir və `stacked` etibarlı
paket adı deyil).

---

## Kombinasiya üzrə sıxılma əvəzləmələri

Müxtəlif istifadə halları üçün davranışı dəqiq tənzimləmək məqsədilə qlobal sıxılma rejimini **hər kombinasiya üzrə** əvəzləyə bilərsiniz:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Bu, aşağıdakı hallar üçün faydalıdır:

- **Kodlaşdırma kombinasiyaları**: Uzun sessiyalar üçün `aggressive` rejimindən istifadə edin
- **Sürətli sual-cavab kombinasiyaları**: Sürətli cavablar üçün `lite` rejimindən istifadə edin
- **Alətlərdən intensiv istifadə edən kombinasiyalar**: Maksimum qənaət üçün `stacked` rejimindən istifadə edin
- **İstehsal kombinasiyaları**: Keşləmə provayderləri üçün əvəzləməni söndürülmüş saxlayın — daim aktiv olan
  keşdən xəbərdar tənzimləmə `aggressive`/`ultra` rejimlərini avtomatik olaraq `standard` rejiminə endirir
  (seçilə bilən `cache-aware` rejimi yoxdur)

---

## Həmçinin baxın

- [Mühit konfiqurasiyası](../reference/ENVIRONMENT.md) — Sıxılma mühiti dəyişənləri
- [Arxitektura bələdçisi](../architecture/ARCHITECTURE.md) — Sıxılma konveyerinin daxili mexanizmləri
- [İstifadəçi bələdçisi](../guides/USER_GUIDE.md) — Sıxılma ilə işə başlama
- [RTK sıxılması](./RTK_COMPRESSION.md) — RTK filtrləri, etibar modeli, yoxlama keçidi, emal edilməmiş çıxışın bərpası
- [Sıxılma mühərrikləri](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API-lər, MCP, idarə paneli
- [Sıxılma qaydalarının formatı](./COMPRESSION_RULES_FORMAT.md) — JSON qayda paketi formatı
- [Sıxılma dil paketləri](./COMPRESSION_LANGUAGE_PACKS.md) — Dilə xas Caveman qaydaları
