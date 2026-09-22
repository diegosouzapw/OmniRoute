# Compression Engines (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute sıxışdırması mühərrik müqavilələri əsasında qurulub. Rejim birbaşa bir mühərriki
(`caveman` və ya `rtk`) və ya bir neçə mühərriki ardıcıllıqla icra edən deterministik yığılmış konveyeri işlədə bilər.

## Rejimlər

| Rejim        | Mühərrik yolu                       | Nəzərdə tutulan giriş                            |
| ------------ | ----------------------------------- | ------------------------------------------------ |
| `off`        | yoxdur                              | Sorğunun dəqiq qorunması                         |
| `lite`       | Caveman lite köməkçiləri            | Aşağı riskli, daim aktiv təmizləmə               |
| `standard`   | Caveman                             | Təbii dildəki sorğunun yığcamlaşdırılması        |
| `aggressive` | Caveman + tarixçə/alət xülasəçiləri | Uzun söhbət sessiyaları                          |
| `ultra`      | Caveman + budama köməkçiləri        | Kontekst limiti aşıldıqda bərpa                  |
| `rtk`        | RTK                                 | Terminal, shell, build, test və git çıxışı       |
| `omniglyph`  | OmniGlyph                           | Yerli provayder protokolunda şəkil kimi kontekst |
| `stacked`    | Konveyer, standart `rtk -> caveman` | Qarışıq alət jurnalları və mətn, maksimum qənaət |

### OmniGlyph sıxışdırma profilləri

`omniglyph` mühərriki (`omniglyph` paketi, 1.4.0+) sıxışdırma parametrlərində qlobal olaraq
`omniglyph.profile` vasitəsilə və ya yığılmış konveyerin addım konfiqurasiyası vasitəsilə hər addım üçün təyin edilən adlandırılmış semantik profili qəbul edir:

| Profil        | Sərhəd                                                                                                         |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Standart. Dərc edilmiş nəticələrin ölçdüyü siyasət — sistem, alət sənədləri və sıx tarixçəni şəkilləşdirir     |
| `balanced`    | Aktiv vəziyyəti yerli formatda saxlayır, son 8 gedişi qoruyur, daha köhnə tamamlanmış tarixçəni yığcamlaşdırır |
| `coding-safe` | Səlahiyyətləri, alət sxemlərini və aktiv alət çıxışını yerli formatda saxlayır, son 12 gedişi qoruyur          |
| `passthrough` | Transformasiya etmədən yönləndirir; mühərrik ötürülür                                                          |

Profil **minimum deyil, maksimum həddir**: paketdəki `mergeCompressionProfileOptions`
çağıran tərəfin itkilərlə sıxışdırılan və profil tərəfindən bağlanmış kanalı yenidən açmasına imkan vermir; buna görə də hər addım üçün
`preserveSystemPrompt: false` parametri `coding-safe` altında sistem sıxışdırmasını yenidən aktivləşdirə bilməz.

Bu kod bazasında aparılan ölçmələrə əsasən: `coding-safe` və `balanced` `minCompressChars` dəyərini maksimuma qaldırır və sistemi, alət sxemlərini və alət nəticələrini yerli formatda saxlayır; buna görə də hələ tarixçə toplamamış sessiya
`below_min_chars` mərhələsində dayanır və mühərrik heç nəyi transformasiya etmir. Buna görə də standart profil ən təhlükəsiz profil deyil, `aggressive` profilidir.

Paket öz model əhatəsini və profilini mühit konfiqurasiyasından müəyyən edir.
OmniRoute qərarı heç vaxt ötürmür: adapter model filtrini paketin ən məhdudlaşdırıcı əhatəsinə sabitləyir, buna görə də host mühitinin parametrləri icazə siyahısını yalnız daralda bilər, onu heç vaxt OmniRoute-un ölçülmüş nəticələrindən daha geniş edə bilməz.

## Mühərrik reyestri

Reyestr `open-sse/services/compression/engines/registry.ts` faylında yerləşir. Mühərriklər ortaq
bir müqavilə təqdim edir:

- `id`: `caveman` və ya `rtk` kimi sabit mühərrik identifikatoru
- `apply(text, config)`: yığılmış konveyerlər tərəfindən istifadə edilən köhnə icra yolu
- `compress(input, config)`: mətn + statistika qaytaran əsas icra yolu
- `getConfigSchema()`: etibarlı konfiqurasiyanın JSON-Schema-ya bənzər strukturunu qaytarır
- `validateConfig(config)`: `{ valid, errors[] }` qaytarır

Qeydiyyat üçün `registerCompressionEngine(engine)` (və ya mürəkkəb hallar üçün `registerEngine`)
istifadə olunur və qəbul etməzdən əvvəl `assertValidEngine()` və `validateConfig(defaultConfig)` çağırılır.
İcra zamanı mühərriki silmək üçün `unregisterCompressionEngine(id)` istifadə edin.

`strategySelector.ts` sıxılma işə salınmazdan əvvəl daxili mühərrikləri qeydiyyata alır. Bu, önizləmə,
icra zamanı sıxılma, yığılmış rejim, testlər və gələcək mühərriklər üçün eyni icra yolundan istifadə etməyə imkan verir.

### MCP təsvirinin sıxılması (əlaqəli)

Ayrı bir reyestr MCP alət təsvirlərinin metadatasını reyestr səviyyəsində sıxır — baxın:
`open-sse/mcp-server/descriptionCompressor.ts` və [MCP-SERVER.md](../frameworks/MCP-SERVER.md). O, Caveman
qaydalarından təkrar istifadə edir, lakin sorğu faydalı yükü deyil, alət metadatası üzərində işləyir.

### Əlavə daxili mühərriklər

Caveman, RTK və LLMLingua-2 ilə yanaşı, reyestr bir neçə ixtisaslaşmış itkisiz /
struktur mühərriklə təchiz olunur (yığılmış konveyerlər, sınaq mühiti və testlər tərəfindən istifadə edilir):

| Mühərrik      | Id              | Nə edir                                                                                                                                                                                               |
| ------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): böyük bitişik mətn bloklarını məzmuna görə ünvanlanan istinadlarla əvəz edir, beləliklə təkrarlanan/böyük bloklar bir dəfə göndərilir və sonra onlara istinad edilir. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): homogen JSON massivi faydalı yüklərinin sütunşəkilli `[N rows]` formasına itkisiz cədvəl sıxlaşdırılması.                                                                     |
| ionizer       | `ionizer`       | Çox böyük homogen bloklar üçün başlanğıc/orta/son sətir nümunələməsi; buraxılan orta hissəni CCR məzmuna görə ünvanlanan istinad kimi saxlayır.                                                       |
| session-dedup | `session-dedup` | Məzmun ünvanlı, dialoqlar arası dublikatların aradan qaldırılması (TokenMizer-dən ilhamlanıb): eyni sessiyanın əvvəlki dialoqlarında artıq görülmüş mətni ixtisar edir.                               |

**CCR əldəetmə protokolu təlimatı (#8033):** CCR sorğuda ilk dəfə ≥1 bloku əvəz etdikdə,
mühərrik marker → alət müqaviləsini çağırana öyrədən, bir dəfə əlavə olunan və idempotent
`system` mesajını (`[CCR protocol]` sentinel-i ilə başlayan) əvvələ əlavə edir:
`[CCR retrieve hash=<24hex> chars=N]` markerinin nə demək olduğunu, heşin olduğu kimi
(kopyalanmalı olduğunu (bütün 24 onaltılıq simvol — səhv kopyalanmış heşlər "blok tapılmadı"
hallarının ehtimal olunan səbəbidir) və `[dedup:ref sha=...]` markerinin "tarixçəyə geri bax"
mənasını verdiyini, "aləti çağır" demək olmadığını bildirir. Qeyd **yalnız çağıranın elan etdiyi `tools[]`
onun həqiqətən `omniroute_ccr_retrieve`-ə çata bildiyini təsdiqlədikdə** əlavə edilir
(`open-sse/services/compression/engines/ccr/protocolInstruction.ts` daxilindəki
`callerSupportsCcrRetrieve()`) — bu aləti olmayan adi OpenAI-uyğun çağıran heç vaxt çata bilmədiyi
bir şeyi çağırmaq üçün təlimat almır. İdempotentlik əlavə etməzdən əvvəl mesaj tarixçəsində sentinel-in
axtarılması ilə təmin olunur, buna görə çoxgedişli sorğular (əvvəlki mesajları yenidən təqdim edənlər)
qeydi hər gedişdə təkrar-təkrar əlavə etmir.

## Caveman

Caveman rejimi adi mətnin semantik sıxlaşdırılmasına yönəlib:

- kod bloklarını, URL-ləri, JSON-u, yolları və strukturlaşdırılmış verilənləri qoruyur
- artıq sözləri, qeyri-müəyyən ifadələri, təkrarlanan konteksti və həddindən artıq uzun bağlayıcı ifadələri silir
- `open-sse/services/compression/rules/` daxilində dilə uyğun fayl qaydaları paketlərini dəstəkləyir
- köhnə `standard`, `aggressive` və `ultra` rejimləri vasitəsilə əlçatan qalır

İdarəetmə panelindəki bölmə `Dashboard -> Context & Cache -> Caveman` yolundadır.

Caveman-in yuxarı axın layihəsi çıxış tokenlərinin `~75%` azalmasını, müqayisəli testlərdə
`22-87%` diapazonu ilə orta hesabla `65%` çıxış qənaətini və `~46%` giriş sıxlaşdırmasını bildirir.
OmniRoute birləşdirilmiş sorğu/kontekst qənaətini sənədləşdirərkən Caveman-in giriş tərəfi üçün
göstəricidən istifadə edir; Caveman çıxış rejimi isə ayrıca cavab davranışı funksiyası olaraq qalır.

## RTK

RTK rejimi əmr və alət çıxışına yönəlib:

- `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest, Cargo/Go testləri,
  TypeScript/Vite/Webpack yığımları, ESLint, npm audit/quraşdırmaları, Docker jurnalları,
  shell `find`/`grep`, çağırış stekləri və ümumi jurnallar kimi çıxış siniflərini aşkarlayır
- `open-sse/services/compression/engines/rtk/filters/` daxilindəki 49 JSON filtrini tətbiq edir
- RTK üslublu deklarativ emal zəncirini dəstəkləyir: ANSI kodlarının silinməsi, əvəzləmə, çıxış uyğunlaşdıqda qısa qapanma,
  sətirlərin silinməsi/saxlanması, hər sətir üzrə qısaltma, başlanğıc/son/maksimum sətir üzrə qısaltma və boş nəticə üçün ehtiyat variant
- `.rtk/filters.json` daxilində etibar yoxlamasından keçən layihə filtrlərini və
  `DATA_DIR/rtk/filters.json` daxilindəki qlobal filtrləri dəstəkləyir
- ANSI ardıcıllıqlarını, gedişatla bağlı səs-küyü, təkrarlanan sətirləri və faydasız standart mətnləri silir
- tədbir görülə bilən xətaları, xəbərdarlıqları, xülasələri, dəyişdirilmiş faylları və son hissədəki konteksti qoruyur
- bərpa/sazlama üçün redaktə edilmiş xam çıxışı autentifikasiya olunmuş idarəetmə
  marşrutları vasitəsilə istəyə bağlı olaraq saxlaya bilər

İdarəetmə panelindəki bölmə `Dashboard -> Context & Cache -> RTK` yolundadır.

Fərdi filtrlər, etibar, yoxlama və xam çıxışın bərpası ilə bağlı əməliyyat təfərrüatları
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md) faylında verilib.

RTK-nin yuxarı axın layihəsi əmr çıxışının sıxlaşdırılması üçün `60-90%` qənaət bildirir. Onun README nümunəsində
30 dəqiqəlik Claude Code sessiyasının `~118,000` tokendən `~23,900` tokenə endiyi, yəni `79.7%` qənaət edildiyi göstərilir.

## LLMLingua-2 (Semantik budama)

LLMLingua-2 rejimi kiçik ONNX token təsnifatçısından istifadə edərək mətn üzərində
**semantik token budaması** həyata keçirir və qaydalara əsaslanan Caveman və RTK mühərriklərini tamamlayır:

- yalnız sistemə aid olmayan mesajlardakı mətni sıxlaşdırır; çəpərlənmiş kod blokları və digər qorunan
  konstruksiyalar heç vaxt dəyişdirilmir
- `@atjsh/llmlingua-2` arxa sistemini (`@huggingface/transformers` vasitəsilə ONNX) ayrıca
  işçi axında işlədir, beləliklə model nəticə çıxarışı sorğunun hadisə dövrəsini heç vaxt bloklamır
- **zəncirlənə bilir** (`stackPriority` 35): zəncirlənmiş emal xəttində struktur mühərriklərdən
  (CCR, session-dedup, headroom, Caveman) sonra, lakin `ultra`-dan əvvəl işləyir, çünki
  semantik budama əvvəlcədən struktur baxımından sıxlaşdırılmış mətn üzərində daha effektivdir — məsələn,
  `rtk -> caveman -> llmlingua`
- **istənilən xəta zamanı açıq rejimə keçir** (çatışmayan istəyə bağlı asılılıqlar, işçi axının başladılması, modelin yüklənməsi, nəticə çıxarışı
  və ya vaxt aşımı) → xəta əvəzinə orijinal mətn dəyişdirilmədən qaytarılır

Mühərrikin yerləşdiyi yer: `open-sse/services/compression/engines/llmlingua/`. İdarəetmə panelindəki bölmə
`Dashboard -> Context & Cache -> LLMLingua` yolundadır.

### Modellər

Standart model **TinyBERT**-dir (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
sürətli). Daha yüksək dəqiqliyə malik **BERT-base** modeli (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) mühərrik konfiqurasiyasındakı `model` sahəsi vasitəsilə əlçatandır. `@huggingface/transformers`
seçilmiş modeli ilk çağırış zamanı HuggingFace Hub-dan
`${DATA_DIR}/models/llmlingua` daxilinə tənbəl şəkildə endirir (`modelStore.ts`); `modelPath` konfiqurasiya
əvəzləməsi isə onu yerli nüsxəyə yönəldir (oflayn / şəbəkədən təcrid olunmuş quraşdırmalar).

### İstəyə bağlı asılılıqlar və tələb əsasında quraşdırma

Budana bilən LLMLingua icra mühitinin bərabərsəviyyəli asılılıqlar dəsti **istəyə bağlıdır**. İki paket
`package.json` daxilində `optionalDependencies` kimi elan edilib və istehsal yığımı tərəfindən **xarici**
saxlanılır (`scripts/build/prepublish.ts` onları paketə daxil etmir):

| Paket                | Versiya (sabitlənmiş) | Qeydlər                                                            |
| -------------------- | --------------------- | ------------------------------------------------------------------ |
| `@atjsh/llmlingua-2` | `2.0.5`               | Giriş paketi; digərlərini bərabərsəviyyəli asılılıq kimi elan edir |
| `js-tiktoken`        | `^1.0.20`             | Tokenləşdirici                                                     |

`@huggingface/transformers` `^4.2.0` versiyasına sabitlənib (yerli daxiletmələr yolu ilə paylaşılır və
həmçinin müstəqil paketdə izlənilir); `@atjsh/llmlingua-2@2.0.5` onun üçün
`"^3.5.2 || ^4.0.0"` bərabərsəviyyəli asılılığını tələb edir, buna görə həm Transformers.js v3, həm də v4 dəstəklənir. 2.0.4-dən etibarən
`@atjsh/llmlingua-2` artıq `@tensorflow/tfjs` tələb etmir; bununla SLM dəstinə ən böyük töhfə verən
komponent (TensorFlow.js) çıxarılıb. Yalnız yuxarıdakı iki paket budana bilən SLM
bərabərsəviyyəli asılılıqlarıdır. Standart `npm install` (inkişaf mühiti), istəyə bağlı
asılılıqlar buraxılmadığı halda, bu dəsti avtomatik quraşdırır.

**Niyə tələb əsasında:** npm-də dərc olunan paket, müstəqil paket və Docker obrazı
kiçik qalmaq üçün bu asılılıqlar **olmadan** təqdim olunur. Onlar olmadıqda işçi axının asılılıq
yoxlaması (`worker.ts` daxilində `@atjsh/llmlingua-2` həll etmə sınağı) uğursuz olur və mühərrik
**səssizcə açıq rejimə keçir** — LLMLingua-nın seçilməsi heç bir əməliyyat icra etmir (mətn dəyişdirilmədən qaytarılır,
heç bir xəta jurnala yazılmır). Onu budanmış mühitdə aktivləşdirmək üçün istəyə bağlı dəsti quraşdırın:

```bash
# package.json optionalDependencies daxilində elan edilmiş versiyalara sabitləyin
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

`@tensorflow/tfjs` paketinin çıxarılması (2.0.4+) əvvəllər üstünlük təşkil edən ~800 MB-lıq
komponenti aradan qaldırır — qalan həcm transformers.js + onnxruntime-node icra mühitlərindən,
həmçinin ilk istifadə zamanı endirilən (npm vasitəsilə deyil) TinyBERT modelindən (~57 MB) ibarətdir.

Hər mühit üzrə:

- **Dev / `npm install`** — `--omit=optional` (və ya `--no-optional`) parametrini ötürmədiyiniz halda avtomatik quraşdırılır.
  Heç bir əməliyyat tələb olunmur.
- **Qlobal npm (`npm i -g omniroute`) / müstəqil paket** — yuxarıdakı quraşdırma əmrini
  quraşdırılmış paket qovluğunda icra edin və ya optional asılılıqları kənarda saxlamadan yenidən quraşdırın.
- **Docker** — quraşdırma əmrini törəmə image qatına əlavə edin; yayımlanmış image
  məqsədli şəkildə minimaldır.
- **VPS (PM2)** — tətbiqin `node_modules` qovluğuna quraşdırın, sonra worker-in yoxlama mexanizmini
  yenidən sınaqdan keçirməsi üçün prosesi yenidən başladın.
- **Xam Next standalone (`npm run build` → `.build/next/standalone/server.js`)** — standalone
  trace NƏ worker-i, NƏ DƏ optional asılılıqları ehtiva edir, buna görə də mühərrik səssizcə
  fail-open rejiminə keçir. `scripts/build/colocate-standalone.mjs` hər ikisini yenidən tətbiq edir (worker üçün esbuild +
  optional asılılıqların tam zəncirini standalone ağacına əlavə edir); o, hər build-dən sonra
  `postbuild` npm hook-u vasitəsilə avtomatik işləyir. İdempotentdir, asılılıqlar olmadıqda xətanı yumşaq şəkildə idarə edir.

**Aktiv olduğunu yoxlayın:** LLMLingua seçildikdə real mətn həqiqətən qısalır (mühərrik
fail-open rejiminə keçməyi dayandırır) və ilk sorğu modelin
`${DATA_DIR}/models/llmlingua` qovluğuna endirilməsini başladır. Yoxlama mexanizmi qəsdən yalnız `@atjsh/llmlingua-2` paketini yoxlayır —
digər peer-lər yalnız ESM üçündür və mövcud olsalar belə `require.resolve` onlar üçün xəta atır — buna görə də
`import()` zamanı hər hansı peer həqiqətən çatışmırsa, worker yenə fail-open rejiminə keçir.

## Ard-arda düzülmüş konveyerlər

Ard-arda düzülmüş rejim konveyer addımlarını sıra ilə icra edir. Standart ardıcıllıq belədir:

```txt
rtk -> caveman
```

Bu rejimi əmrlərin çıxışını insan və ya köməkçi tərəfindən yazılmış mətnlə birləşdirən sorğuların olduğu kodlaşdırma agenti sessiyaları üçün istifadə edin. Əvvəlcə RTK səs-küylü alət jurnallarını azaldır, sonra Caveman qalan təbii dili sıxır.

Konveyer addımları sıxılma parametrlərində `stackedPipeline` ilə və ya sıxılma kombinasiyaları vasitəsilə konfiqurasiya edilir.

Hər iki mühərrik eyni uyğun məlumat yükünü azaltdıqda qənaət kumulyativ olur:

```txt
birləşdirilmiş = 1 - (1 - RTK qənaəti) * (1 - Caveman giriş qənaəti)
orta           = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
diapazon        = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP əlçatanlıq ağacı filtri

MCP əlçatanlıq ağacının ağıllı filtri sorğularda və ya kontekstdə deyil, MCP **alət nəticələrində** işləyən icradan sonrakı sıxılma qatıdır. O, Playwright, computer-use və brauzer avtomatlaşdırması üçün MCP serverləri kimi alətlərin qaytardığı çoxhəcmli əlçatanlıq ağacı və brauzer anlıq görüntü məlumatlarını hədəfləyir.

### Nə edir

1. **Səs-küyün təmizlənməsi** — boş ümumi/mətn qeydlərini (`- generic:`, `- text: ""`) silir
2. **Qonşu elementlərin yığılması** — ≥ `collapseThreshold` (standart olaraq 30) ardıcıl sətir struktur baxımından təkrarlandıqda, onları ilk `collapseKeepHead` (standart olaraq 10) sətirə + say xülasəsinə + son `collapseKeepTail` (standart olaraq 5) sətirə yığır
3. **İstinadların qorunması** — Playwright/computer-use üçün tələb olunan `[ref=eXX]` lövbərlərinə heç vaxt toxunulmur
4. **Sərt kəsilmə** — yığılmadan sonra mətn hələ də `maxTextChars` (standart olaraq 50,000) həddini aşırsa, agentin işi davam etdirə bilməsi üçün naviqasiya göstərişi əlavə etməklə mətni kəsir

### Mühərrikin yerləşdiyi yer

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText() giriş nöqtəsi
  collapseRepeated.ts ← qonşu elementləri yığma alqoritmi
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Konfiqurasiya

Qlobal parametrlərdəki `compression.mcpAccessibility` ilə idarə olunur (miqrasiya 056). Standart konfiqurasiya:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

Filtr yalnız `type` dəyəri `"text"` olan və uzunluğu `minLengthToProcess` həddini aşan alət nəticəsi məlumatlarına tətbiq edilir. O, sorğuların sıxılmasına və ya sorğu məlumatlarına təsir etmir.

### Gözlənilən qənaət

Səhifənin mürəkkəbliyindən asılı olaraq brauzer anlıq görüntüsü alət nəticələrində 60–80% qənaət. Yığılma alqoritminin sətir sayına görə mürəkkəbliyi O(n)-dir və cüzi gecikmə yaradır.

### Bu filtrlə yuxarıdakı sıxılma mühərriklərinin müqayisəsi

| Aspekt             | Caveman / RTK / Ard-arda düzülmüş | MCP əlçatanlıq filtri                  |
| ------------------ | --------------------------------- | -------------------------------------- |
| Hədəf              | Sorğular / kontekst               | MCP alət nəticələri                    |
| İşəsalma mexanizmi | Sıxılma rejimi parametri          | `compression.mcpAccessibility.enabled` |
| Əhatə dairəsi      | Bütün SSE mesajları               | Yalnız alət nəticələri                 |
| İstinad lövbərləri | Tətbiq edilmir                    | Şərtsiz qorunur                        |

---

## Sıxılma kombinasiyaları

Sıxılma kombinasiyaları marşrutlaşdırma kombinasiyalarına təyin edilə bilən adlandırılmış sıxılma profilləridir:

- `compression_combos`: rejimi, emal konveyerini, RTK konfiqurasiyasını, dil konfiqurasiyasını və standart göstəricini saxlayır
- `compression_combo_assignments`: sıxılma kombinasiyasını marşrutlaşdırma kombinasiyası ilə əlaqələndirir
- icra mühiti inteqrasiyası ümumi kombinasiya əvəzləmələrindən əvvəl təyin edilmiş sıxılma kombinasiyasını müəyyən edir
- analitikaya `compression_combo_id` və `engine` daxildir

İdarə panelindəki yeri: `İdarə paneli -> Kontekst və keş -> Sıxılma kombinasiyaları`.

## API interfeysi

| Marşrut                                | Məqsəd                                                                         |
| -------------------------------------- | ------------------------------------------------------------------------------ |
| `/api/settings/compression`            | Qlobal sıxılma parametrləri (`mcpAccessibility` konfiqurasiyası daxil olmaqla) |
| `/api/compression/preview`             | İstənilən sıxılma rejiminə önbaxış                                             |
| `/api/compression/language-packs`      | Mövcud Caveman dil paketlərini siyahıya almaq                                  |
| `/api/context/caveman/config`          | Caveman parametrləri üçün alternativ ad                                        |
| `/api/context/rtk/config`              | RTK standartları və parametrləri                                               |
| `/api/context/rtk/filters`             | RTK filtrləri kataloqu                                                         |
| `/api/context/rtk/test`                | RTK önbaxış/sınaq son nöqtəsi                                                  |
| `/api/context/rtk/raw-output/[id]`     | Autentifikasiya tələb edən, məxfi hissələri çıxarılmış xam çıxışın bərpası     |
| `/api/context/combos`                  | Sıxılma kombinasiyaları üçün CRUD                                              |
| `/api/context/combos/[id]/assignments` | Marşrutlaşdırma kombinasiyası təyinatları üçün CRUD                            |
| `/api/context/analytics`               | Sıxılma analitikası üçün alternativ ad                                         |

İdarəetmə marşrutları idarəetmə autentifikasiyası və ya API açarı siyasəti yoxlamalarını tələb edir.

## MCP alətləri

Sıxılma beş MCP aləti təqdim edir:

| Alət                                | Əhatə dairəsi       | Məqsəd                                              |
| ----------------------------------- | ------------------- | --------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Parametrlər, analitika, keş statistikası            |
| `omniroute_compression_configure`   | `write:compression` | Qlobal parametrləri yeniləmək                       |
| `omniroute_set_compression_engine`  | `write:compression` | Rejimi və istəyə bağlı emal konveyerini təyin etmək |
| `omniroute_list_compression_combos` | `read:compression`  | Sıxılma kombinasiyalarını siyahıya almaq            |
| `omniroute_compression_combo_stats` | `read:compression`  | Kombinasiya/mühərrik analitikasını oxumaq           |

## Əhatə dairəsi və istisnalar

**Embeddinqlər heç vaxt sıxılmır.** `open-sse/handlers/embeddings.ts` heç bir
sıxılma mühərrikini çağırmır — sorğu/cavab gövdələri dəyişdirilmədən birbaşa icraçıya ötürülür.
Hazırda bu, struktur səviyyəsində təmin edilir (embeddinqlər və çat tamamlamaları ayrı-ayrı emalçılardır),
icra mühiti yoxlaması deyil, lakin bu o deməkdir ki, #8034-dəki vektor təhrifinə dair narahatlığın
embeddinq yolunda heç bir təsir səthi yoxdur.

**Model/son nöqtə üzrə istisna filtri (#8034).** Çat tamamlamaları üçün operator heç vaxt
sıxılmamalı olan model id-lərini / `provider/model` hədəflərini göstərə bilər — bu, sıxılma
gələcəkdə embeddinqə yaxın bir yola qoşularsa faydalı olan qoruyucu mexanizmdir və ümumiyyətlə,
bayt-bayt tam eyni promptun vacib olduğu istənilən model üçün yararlıdır (deterministik
qiymətləndirmələr, keşə həssas prefikslər və s.).

- Parametrlər sahəsi: qlobal sıxılma konfiqurasiyasında `exclusions?: string[]`
  (`GET`/`PUT /api/settings/compression`); mövcud `key_value` sıxılma ad məkanı
  (`src/lib/db/compression.ts`) vasitəsilə saxlanılır — yeni cədvəl yoxdur.
- İdarə paneli nişanı: **İdarə paneli → Sıxılma → İstisnalar**
  (`/dashboard/compression/exclusions`).
- Nümunə sintaksisi: `*` yeganə əvəzedici simvoldur. Nümunədəki bütün digər regex metasimvolları
  uyğunlaşdırmadan əvvəl ekranlaşdırılır, buna görə `gpt-5.6` yalnız hərfi sətri uyğunlaşdırır,
  heç vaxt `gpt-5x6` ilə uyğun gəlmir (ReDoS-a qarşı təhlükəsizdir, məhduddur və iç-içə kvantifikatorlar
  yoxdur). Nümunələr həm yalnız model id-si, həm də `provider/model` birləşməsi ilə registrdən asılı
  olmadan uyğunlaşdırılır — `gpt-5-6`, `openai/gpt-5-6` və `openai/*` hamısı işləyir,
  yalnız `*` isə hər modeli istisna edir.
- Uyğunlaşdırma: `open-sse/services/compression/exclusions.ts` daxilində
  `isCompressionExcluded()` / `normalizeCompressionExclusions()`. `chatCore.ts` istisna edilən
  hədəfi sıxılma parametrlərini müəyyən etdikdən dərhal sonra, **hər hansı mühərrik işə düşməzdən əvvəl**
  yoxlayır və uyğunluğu sıxılmanın qlobal şəkildə deaktiv edilməsi ilə tam eyni formada emal edir —
  sorğu gövdəsinin bayt səviyyəsində tam eyni olduğu sübut edilə bilər. Buraxılma analitikada
  görünməsi üçün `writeCompressionSkip(..., "excluded")` vasitəsilə qeydə alınır.
- Standart davranış (boş/mövcud olmayan siyahı): #8034-dən əvvəlki davranışla eynidir —
  heç nə istisna edilmir.

## Məlum məhdudiyyətlər

- **LLMLingua-2 (SLM) yanaşı yerləşdirilmiş əlavə asılılıqlar tələb edir.** Worker yalnız
  `@atjsh/llmlingua-2` və onun peer asılılıqları `dist/node_modules` daxilində yanaşı
  yerləşdirildikdə production build-də işləyir (bax: `scripts/build/colocateOptionals.mjs`,
  #4286). Onlar olmadan engine xəta zamanı ilkin mətni qaytarır. Worker-in həll edilməsi
  artıq `import.meta.url`-dan asılı deyil (o, standalone bundle daxilində işləmir) — əsas
  kimi runtime cwd / `argv[1]` istifadə olunur.
- **Caveman dil paketləri `de` / `fr` / `ja` qisməndir.** Onlar `context` + `filler` +
  `structural` qaydaları ilə təchiz edilir, lakin `dedup` / `ultra` paketlərini ehtiva
  etmir; buna görə həmin dillər üçün `ultra` intensivliyi `full` intensivliyindən daha
  güclü deyil (onlar yalnız öz qaydalarından istifadə edir — xarici dildəki mətni korlaya
  biləcək ingilis dilindəki `dedup`/`ultra` qaydalarına gizli geri dönüş yoxdur).
  `en` / `es` / `id` / `pt-BR` tamdır. Qismən paketlər üçün `dedup.json` + `ultra.json`
  töhfələri qəbul olunur.
- **Yığılmış telemetriya yalnız sıxılma həyata keçirmiş engine-ləri sadalayır.**
  Engine-i işə düşən, lakin 0 % qənaət təmin edən yığılmış pipeline addımı `stats:null`
  qaytarır və buna görə `engineBreakdown` daxilində görünmür — bu, ötürülmüş addımdan
  fərqləndirilə bilmir. "İşə düşdü, 0 %" ilə "ötürüldü" hallarını fərqləndirmək üçün
  breakdown modelində dəyişiklik tələb olunur və bu, sonraya saxlanılıb.

## Yoxlama

Bu sahə üçün məqsədyönlü yoxlamalar bunlardır:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
