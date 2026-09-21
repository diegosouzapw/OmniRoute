# Guardrails (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Həqiqət mənbəyi:** `src/lib/guardrails/`
> **Son yenilənmə:** 2026-08-29 — v3.8.51 (Video Bridge transkriptinin mənşəyi çağıran tərəf tərəfindən bəyan edilir,
> hələ server tərəfindən təsdiqlənmir — #11661 əsasında dəqiqləşdirilib)

Qoruyucu mexanizmlər OmniRoute ilə yuxarı axın provayderləri arasındakı sərhəddə
təhlükəsizlik, siyasət və məzmun transformasiyalarını təmin edir. Hər bir qoruyucu mexanizm
sorğu faydalı yüklərini (`preCall`) və yuxarı axın cavablarını (`postCall`) yoxlaya
(və istəyə görə rədd edə, transformasiya edə və ya annotasiya edə) bilər.

Sistem **xəta zamanı açıqdır**: qoruyucu mexanizm icra zamanı xəta atarsa, reyestr
xətanı qeydə alır və sorğunu uğursuz etmək əvəzinə növbəti qoruyucu mexanizmlə
davam edir. Bloklama heç vaxt təsadüf deyil, açıq şəkildə verilən qərardır (`block: true`).

## Daxili qoruyucu mexanizmlər

Reyestr import zamanı prioritet sırasına görə altı qoruyucu mexanizmi avtomatik yükləyir
(baxın: `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Ad                  | Mərhələ(lər)   | Fayl                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Daha aşağı prioritet nömrələri **daha əvvəl** icra olunur.

### Vision Bridge (`visionBridge.ts`) — Modallıq körpüsü PR-1

**Görmə imkanını dəstəkləməyən modellərə** yönəldilmiş, şəkil ehtiva edən sorğuları tutur və
ya bütün sorğunu görmə imkanlı modelə yenidən yönləndirir, ya da yuxarı axın çağırışından
əvvəl şəkil hissələrini konfiqurasiya edilə bilən görmə modelinin hazırladığı mətn
təsvirləri ilə əvəz edir. Bu, yalnız mətnlə işləyən provayderlərin multimodal faydalı
yükləri şəffaf şəkildə emal etməsinə imkan verir.

Axın:

1. Hədəf model artıq görmə imkanını dəstəkləyirsə, keçin (məcburi körpü
   siyahısında `isVisionBridgeForcedModel` görünmədiyi halda).
2. Şəkil hissələrini `extractImageParts(messages)` vasitəsilə çıxarın
   (`visionBridgeHelpers.ts`); bu funksiya `open-sse/utils/mediaParts.ts`
   daxilindəki **vahid media detektoruna** — kombinasiya uyğunluğu filtri ilə
   paylaşılan yeganə həqiqət mənbəyi olan `detectMediaParts()` funksiyasına
   ötürür. Çıxarma prosesi `replaceImageParts` funksiyasının yenidən yerləşdirə
   biləcəyi formalardakı yuxarı səviyyəli hissələrlə məhdudlaşdırılıb
   (çıxarma↔əvəzləmə müqaviləsi): OpenAI `image_url`, Anthropic base64
   `source.type:"base64"`, Anthropic URL `source.type:"url"` və Responses API
   `input_image`. İç-içə uyğunluqlar və yalnız indikator ehtiva edən formalar
   kombinasiya filtri üçün nəzərdə tutulub və heç vaxt çıxarılmır.
   Heç nə tapılmadıqda keçin.
3. İcra vaxtı konfiqurasiyasını `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) vasitəsilə müəyyənləşdirin:
   yeni `modalityBridge*` parametr açarları üstünlük təşkil edir; köhnə
   `visionBridge*` açarları isə **bir dövrlük ehtiyat variant** (geri qaytarma
   pəncərəsi) olaraq qalır. Körpü deaktiv edildikdə hər hansı media keçidindən
   əvvəl keçin.
4. Rejim seçicisi (`modalityBridgeVisionMode`, aşağıdakı cədvələ baxın)
   yenidən yönləndirmə və ya təsvir arasında seçim edir. Yenidən yönləndirmə
   yalnız `model` dəyişdirilmiş `modifiedPayload`, həmçinin
   `{ rerouted, fromModel, toModel, imagesKept }` metadatasını qaytarır.
5. Təsvir yolu: şəkillərin sayını `maxImages` ilə məhdudlaşdırır, tapşırığı nəzərə
   alan sorğunu tərtib edir, təsvir keşini yoxlayır, görmə modelini **paralel**
   çağırır (`Promise.allSettled`) və onların yerinə
   `[Image N]: <description>` mətn hissələrini daxil edir. Uğursuz təsvir
   `null` qaytarır və ilkin şəkil hissəsi **qorunur** (#4012) — bütün
   təsvirlərin uğursuz olduğu kombinasiya təsviri yolu istisna olmaqla; bu
   halda təsdiqlənmiş, görmə imkanını dəstəkləməyən yuxarı axın əvəzinə
   `(unavailable — no vision-capable provider connected)` doldurucusu alır
   (#8430).
6. `modifiedPayload` və metadatanı (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) qaytarın.

#### Rejim seçicisi (`modalityBridgeVisionMode`)

| Rejim      | Defolt | Davranış                                                                                                                                                                                                                                                                                                                                       |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | Köhnə evristika dəyişdirilməyib (#6640/#7204): kombinasiya olmayan/`auto/` modellər, ilkin modelin artıq istifadə edilə bilən giriş məlumatları olmadığı halda, ən yaxşı görmə modelinə yenidən yönləndirilir (olduqda təsvir edilir); kombinasiya hədəfləri həmişə təsvir edilir.                                                             |
| `describe` |        | Həmişə təsvir et — yenidən yönləndirmə bloku tamamilə ötürülür; həmişə istifadəçinin seçdiyi model cavab verir.                                                                                                                                                                                                                                |
| `reroute`  |        | Məcburi yenidən yönləndirmə: giriş məlumatları olan modeli saxlama qoruyucusu nəzərə alınmır. Yenidən yönləndirmə **hədəfinin** giriş məlumatları qoruyucusu yenə də tətbiq olunur — istifadə edilə bilən görmə hədəfi olmadıqda sorğu təsvir mərhələsinə keçir ki, xam şəkillər yalnız mətnlə işləyən arxa sistemə heç vaxt çatmasın (#8430). |

Məcburi rejimlər avtomatik evristika işləməzdən **əvvəl** qısa qapanma yaradır;
`auto` davranışı PR-1-dən əvvəlki qoruyucu mexanizmlə bayt səviyyəsində eynidir.

#### Tapşırığı nəzərə alan təsvir sorğusu (`modalityBridgeVisionTaskAware`)

Defolt olaraq **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) əsas
təsvir sorğusuna **son istifadəçi mesajının** mətnini (500 simvoladək qısaldılmış)
əlavə edir; bu, təsviri istifadəçinin həqiqətən soruşduğu məsələyə yönəldir
(codex-vision-proxy nümunəsi) və görmə modelindən görünən mətni transkripsiya
etməsini istəyir. Bayraq söndürülübsə və ya istifadəçi mətni yoxdursa, əsas
sorğu dəyişdirilmədən istifadə olunur.

Describe öz-dövrəsinin OpenAI-uyğun sorğusu (`callVisionModelSingle()`
`visionBridgeHelpers.ts` daxilində) həmişə `image_url.detail: "high"` tələb edir —
qeyd-şərtsiz, hər çağıran/provayder üçün və heç bir müştəri siqnalından asılı
olmadan. Aşağı detallı nümunələmə məhz bu promptun tələb etdiyi mətn
transkripsiyası tapşırığında OCR dəqiqliyini azaldır, buna görə də ilkin daxil
olan sorğunun istifadə etdiyi detal səviyyəsindən asılı olmayaraq, describe
çağırışının özü həmişə yüksək detal tələb edir. Bu, yalnız daxili describe
sorğusunun gövdəsinə təsir edir; OmniRoute-un əsas sorğuda çağıranın öz
`image_url.detail` dəyərini necə yönləndirdiyini dəyişmir — həmin standart
ayrıca və yalnız aşkarlanmış OpenCode müştəriləri üçün `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`) daxilində tətbiq olunur. Describe
öz-dövrəsinin Anthropic wire-format qolu `detail` sahəsinə malik deyil və hər
iki standartdan təsirlənmir.

#### Describe çıxış limiti (`modalityBridgeVisionMaxChars`)

| Açar                           | Standart | Aralıq              |
| ------------------------------ | -------- | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`      | `0` və ya 100–50000 |

`0` (standart) **limit yoxdur** deməkdir — `callVisionModel()` tərəfindən
qaytarılan təsvir dəyişdirilmədən ötürülür və mövcud davranış qorunur.
100–50000 aralığındakı istənilən dəyər təsvir
`[Image N]: <description>` şəklində yenidən yerləşdirilməzdən əvvəl onu `…`
şəkilçisi ilə qısaldır (`src/lib/guardrails/visionBridge.ts` daxilində
`VisionBridgeGuardrail.preCall()`). Aşağı axındakı modelin tam transkripsiyaya
ehtiyac duyduğu, detalla zəngin OCR tapşırıqları üçün bunu artırın; çox danışan
görmə modellərində token istifadəsini məhdudlaşdırmaq üçün isə azaldın.
İdarəetmə panelindəki sahə Vision nişanının Advanced panelində yerləşir
(`ModalityBridgeVisionTab.tsx` daxilində `modality-bridge-max-chars`) və açıq
şəkildə verilmiş `0` dəyərinə toxunmadan 1 ilə 99 arasındakı istənilən dəyəri
minimum 100 həddinə yüksəldir — `0` sadəcə “təyin edilməmiş” standart deyil,
özlüyündə etibarlı Zod dəyəridir
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`).

#### Describe keşi (`modalityBridge/bridgeCache.ts`)

Describe çıxışları üçün proses miqyasında paylaşılan yaddaşdaxili LRU + TTL
keşi. Açar = uzunluq prefiksli çərçivələmə ilə
`sha256(imageRef + composedPrompt + configuredBridgeModel)` (sahə sərhədlərində
toqquşma yoxdur). Model komponenti faktiki cavab vermiş model deyil,
**konfiqurasiya edilmiş** körpü modelidir — `callVisionModel` daxildə ehtiyat
modelə keçə bilər və hər cəhd üzrə açarlama keşi parçalayardı. Uğursuz describe
nəticələri heç vaxt keşlənmir. Parametrlər:

| Açar                            | Standart | Aralıq  |
| ------------------------------- | -------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Uzaqdan alınan təsvirlərin normallaşdırılması (öz-dövrə describe/base64 əldəetməsi)

Körpü **uzaqdan** təsviri özü əldə etdikdə — həm Anthropic describe
öz-çağırışı, həm də claude-wire-format base64 çevrilməsi
(`ensureBase64ImagesForClaudeWire`), hər ikisi `visionBridgeHelpers.ts`
daxilindəki `fetchRemoteImageAsDataUri()` vasitəsilə — nəticədə yaranan data
URI görmə modeli sorğusuna yerləşdirilməzdən əvvəl `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) vasitəsilə emal olunur. Həddindən artıq
böyük təsvirlərin **uzun tərəfi 2048px** ölçüsünə qədər kiçildilir (OpenAI/Anthropic
tərəfindən server tərəfində artıq tətbiq edilən ölçü limitinə uyğun olaraq);
bu, görmə modelinin gördüklərini dəyişmədən yükləmə baytlarını/gecikməni
azaldır. Ölçünün dəyişdirilməsi dinamik import vasitəsilə yüklənən `sharp`
paketindən istifadə edir: onun yerli binar faylının yüklənə bilmədiyi
platformada `normalizeDataUri()` **heç vaxt xəta atmır** — ilkin baytları
dəyişmədən ötürür, beləliklə describe/base64-çevirmə yolu həmişə işləməyə davam
edir. Təsvir olmayan baytlar (dekodlana bilən təsvir qaytarmayan əldəetmə) da
dəyişdirilmədən ötürülür. Bu normallaşdırma yalnız körpünün öz çağırışı üçün
əldə etdiyi təsvirlərlə məhdudlaşır — yalnız açıq seçim əsasında dəyişiklik
prinsipinə (Sərt Qayda #20) uyğun olaraq çağıranın xam, birbaşa ötürülən
payload-una heç vaxt tətbiq edilmir.

#### Parametrlər sxemi + miqrasiya

Yeni `modalityBridge*` açarları `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`) daxilində Zod ilə doğrulanır:
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCache*` üçlüyü və Audio Bridge tərəfindən istifadə olunan
`modalityBridgeAudio*` qrupu. `141_modality_bridge_settings.sql` miqrasiyası
mövcud köhnə `visionBridge*` dəyərlərini uyğun yeni açarlara köçürür
(idempotentdir, operator tərəfindən təyin edilmiş `modalityBridge*` dəyərinin
üzərinə heç vaxt yazmır); köhnə açarlar bir buraxılış dövrü ərzində oxuma üçün
ehtiyat variant kimi qəbul edilməyə davam edir.

#### Şəffaflıq başlığı + statistika

Describe vasitəsilə çevrilmiş cavablarda
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
olur (`modalityBridge/bridgeStats.ts` daxilindəki
`buildModalityBridgeHeader()` tərəfindən yaradılır,
`src/sse/handlers/chatHelpers.ts` daxilindəki
`withModalityBridgeHeader()` tərəfindən əlavə olunur).
Yenidən yönləndirilmiş sorğular **heç bir** başlıq almır — payload dəyişdirilməyib
və model dəyişikliyi artıq cavab gövdəsinin `model` sahəsində görünür.

`GET /api/modality-bridge/stats` (idarəetmə autentifikasiyası, `GET /api/settings`
ilə eyni səviyyə) `vision`, `audio` və `video` üçün yaddaşdaxili modalitet
sayğaclarını qaytarır:
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }`. `averageLatencyMs` məxrəc kimi
bütün cəhdlərdən deyil, `latencySamples` dəyərindən istifadə edir; zamanlaması
olmayan əməliyyat süni sıfır millisaniyəlik nümunə yaratmır. `bridged` uğurlu
çevirmələr üçün geriyə uyğun ləqəb olaraq qalır; uğursuz cəhdlər onu artırmır.
Sayğaclar dizayna uyğun olaraq proses yenidən başladıqda sıfırlanır
(uçot deyil, telemetriyadır).

#### İdarəetmə panelinin konfiqurasiyası

Xüsusi idarəetmə paneli səhifəsi
`/dashboard/settings/modality-bridge` ünvanındadır. Onun URL vasitəsilə əlçatan olan `Vision`, `Audio`
və `Video` vərəqləri `tab` dəyərini dəyişərkən sorğu parametrlərini qoruyur.
Vision vərəqi aktivləşdirmə, rejim, model seçimi (avtomatik standart seçim daxil olmaqla),
tapşırığı nəzərə alan promptlar, qabaqcıl vaxt aşımı/şəkil/təsvir uzunluğu/keş
məhdudiyyətləri, icra zamanı sayğacları və qorunan nümunə sorğusunu təqdim edir.
Audio vərəqi də aktivdir: o, aktivləşdirməni, Auto seçimi olan yalnız STT üçün model
seçicisini, vaxt aşımı/maksimum klip məhdudiyyətlərini, audio sayğaclarını və
`input_audio` nümunə testini təqdim edir. Video vərəqi funksionaldır: o,
FFmpeg/ffprobe icra vəziyyətini bildirir — dörd açıq UI vəziyyətindən biri
(zondlama davam edərkən və ya tamamlana bilmədikdə `unknown`, zondlamanın müştəri
tərəfində ötürüldüyü qeyri-loopback idarəetmə paneli hostunda `restricted`,
zondlama aparıldıqdan və mövcud olmadığı təsdiqləndikdən sonra `unavailable`
və ya FFmpeg/ffprobe versiyaları ilə birlikdə `available`) — aktivləşdirmə/model/kadr/video/vaxt aşımı
məhdudiyyətlərini yadda saxlayır, model seçicisini görüntü imkanlı modellərlə
məhdudlaşdırır və video sayğaclarını təqdim edir.

AI parametrləri altındakı əvvəlki Vision Bridge kartı yeni səhifəyə aparan
uyğunluq keçididir; o, artıq formanın ikinci nüsxəsinə sahib deyil. Media Providers
həmçinin mövcud Speech-to-Text sınaq mühitini silmədən Image-to-Text və
Speech-to-Text iş axınlarını müvafiq Modality Bridge vərəqlərinə bağlayır.

**Özünə dövrə qəbulunun yan keçməsi:** təsvir çağırışı OmniRoute-un öz
`/v1` özünə dövrəsi (qeyri-standart provayder modeli) üzərindən yönləndirildikdə,
alt sorğu `x-omniroute-admission-bypass: internal` göndərir və müəyyən edilmiş
özünə dövrə giriş məlumatı ilə autentifikasiya olunur — lokal rejimdə lokal
`sk_omniroute` sentinel dəyəri və ya operator tərəfindən konfiqurasiya edilmiş
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` mühit açarı (#1350); beləliklə,
`REQUIRE_API_KEY=true` yerləşdirmələri təsvir çağırışını yenə də icra edə bilir.
Yan keçmə yalnız həmin dəqiq giriş məlumatları üçün qəbul edilir, buna görə də
xarici müştərilər qəbulu ötürmək üçün bu başlıqdan istifadə edə bilməzlər.

Köhnə standart dəyərlər `src/shared/constants/visionBridgeDefaults.ts` daxilindədir;
yeni rejim/tapşırığı nəzərə alma/keş standartları və parametr həlledicisi isə
`src/shared/constants/modalityBridgeDefaults.ts` daxilindədir. Qoruyucu mexanizm
testlərin saxta `getSettings` və `callVisionModel` reallaşdırmalarını yeritməsi üçün
`deps` konstruktor seçimini təqdim edir.

### Audio Körpüsü (`audioBridge.ts`) — Modallıq Körpüsü PR-3

Audio ehtiva edən çat sorğularını audio girişini qəbul etdiyi məlum olmayan
hədəfə çatmazdan əvvəl tutur. O, çat sorğusunu heç vaxt yenidən yönləndirmir:
audio hissələri mövcud OpenAI-uyğun multipart son nöqtəsi vasitəsilə transkripsiya
edilir və seçilmiş çat modeli mətn transkriptləri ilə davam edir.

Axın:

1. `supportsAudio` dəyərini `getResolvedModelCapabilities()` vasitəsilə müəyyən edin.
   Əvvəlcə açıq provayder reyestri metadatası, sonra statik model metadatası, daha
   sonra isə sinxronlaşdırılmış `modalities_input` üstünlük təşkil edir. `audio`
   ehtiva etməyən elan edilmiş giriş siyahısı `false` sayılır; imkanla bağlı heç
   bir sübut olmadıqda `null` qalır. Həm `false`, həm də `null` konservativ körpünü
   aktivləşdirir, `true` isə ondan yan keçir.
2. `modalityBridgeAudio*` parametrlərini müəyyən edin və ortaq `detectMediaParts()`
   detektoru vasitəsilə hər mesajdan birləşdirilə bilən üst səviyyəli audio
   hissələrini çıxarın. Dəstəklənən ötürmə formatları OpenAI `input_audio`,
   `audio_url` və `source.media_type: "audio/*"`-dır. İç-içə audio yönləndirmə üçün
   aşkarlanır, lakin birləşdirmə yolu tərəfindən silinmir. İş həcmi
   `modalityBridgeAudioMaxClips` ilə məhdudlaşdırılır; sonrakı hissələr toxunulmaz qalır.
3. Konfiqurasiya edilmiş `provider/model` dəyərinə əməl edin və ya
   `selectAudioBridgeModel()` funksiyasının sabit kataloq sırası ilə
   `AUDIO_TRANSCRIPTION_PROVIDERS` siyahısını dolaşaraq istifadəyə yararlı aktiv
   provayder giriş məlumatına malik ilk modeli seçməsinə icazə verin.
4. `callAudioTranscription()` base64/data-URI audionu multipart `file` faylına çevirir
   və ya uzaq `audio_url` resursunu DNS sabitləməsi və 25 MB məhdudiyyəti ilə yalnız
   ictimai çıxışa icazə verən qoruyucu vasitəsilə endirir. Daha sonra faylı və
   seçilmiş modeli `resolveSelfLoopBearer()` ilə autentifikasiya olunan lokal
   `/v1/audio/transcriptions` özünə dövrəsinə POST edir. Mövcud transkripsiya marşrutu
   normal giriş məlumatı axtarışını, gözləmə müddəti/sürət məhdudiyyəti idarəetməsini
   və provayderə yönləndirməni həyata keçirir.
5. Uğurlu çağırışlar öz hissələrini `[Audio N]: <transcript>` ilə əvəz edir.
   Çağırışlar `Promise.allSettled` ilə icra olunur: ayrı-ayrı xətalar həmin orijinal
   audio hissəsini qoruyur (#4012 müqaviləsi). Bütün çağırışlar uğursuz olarsa və
   hədəfin `supportsAudio === false` olduğu sübut edilərsə, hissələr
   `[Audio N]: (əlçatan deyil — heç bir STT provayderi qoşulmayıb)` formasını alır
   (#8430 müqaviləsi). Naməlum hədəf (`null`) üçün bütün çağırışların uğursuz olduğu
   nəticə toxunulmaz qalır. İstifadəyə yararlı STT giriş məlumatı olmayan, yalnız
   mətn üçün olduğu sübut edilmiş hədəf şəbəkə çağırışı etmədən eyni açıq
   doldurucunu qəbul edir.

Uğurlu transkriptlər proses miqyasında olan Modallıq Körpüsü LRU/TTL keşindən
istifadə edir. Açar audio istinadını, sabit `audio-transcription` əməliyyat
etiketini və seçilmiş STT modelini birləşdirir; uğursuzluqlar heç vaxt keşlənmir.
Audio cəhdləri ortaq `bridged`, `cacheHits`, `failures` və `lastUsedAt`
sayğaclarını yeniləyir. Çevrilmiş cavablar
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` daşıyır;
toxunulmamış sorğular Audio Körpüsü seqmenti almır.

İcra zamanı parametrləri verilənlər bazasında saxlanılır və Zod ilə doğrulanır:

| Açar                          | Standart | Diapazon          |
| ----------------------------- | -------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                 |
| `modalityBridgeAudioModel`    | `""`     | Auto və ya STT ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10              |

Ortaq keş hələ də `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` və `modalityBridgeCacheMaxEntries` tərəfindən
idarə olunur.

### Video Körpüsü (`videoBridge.ts`, `videoBridgePipeline.ts`)

Məlum yerli video dəstəyi olmayan hədəf çağırılmazdan əvvəl Chat Completions `messages` və Responses API `input` daxilindəki yuxarı səviyyəli video hissələrini ələ keçirir. Dəstəklənən formalar `input_video`, `video_url`, `video_source`, HTTPS URL-ləri və `data:video/*;base64,...` data URI-ləridir. Mətndəki adi fayl adları video kimi qəbul edilmir.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) sorğunun traversiyasını, imkan/siyasət yoxlamasını, sorğu üzrə aqreqasiyanı və cavab yükünü idarə edir. Hər video üzrə iş — əldəetmə, bütöv nəticə keşi, kadr ardıcıllığının təsvir edilməsi (çağıran tərəfin bəyan etdiyi hər hansı audio transkripti bununla birləşdirilir), həmçinin hər cəhd üzrə metriklər/dayandırma/təmizləmə — `preCall` dövründə hər video hissəsi üçün bir dəfə çağırılan `videoBridgePipeline.ts` daxilindəki `processVideoPart` arxasında gizlədilib. Bu modul həmçinin açıq port sərhədlərini müəyyən edir: `VideoMediaBrokerPort` (baytların əldə edilməsi və nümunələnmiş kadrların çıxarılması), `VideoAudioTranscriptionPort` (çağıran tərəfin bəyan etdiyi audio transkriptin nümunələnmiş kadr altyazıları ilə birləşdirilməsi) və `VideoDrilldownPort` (kadr üzrə detallı araşdırmanın davamlı saxlanma sərhədi; hələ `processVideoPart` ilə əlaqələndirilməyib — hazırda detallı araşdırma qeydlərini yalnız ayrıca `/api/modality-bridge/video/drilldown` marşrutu yazır).

İctimai `/v1` sorğu yolu heç vaxt alt prosesi idxal etmir və ya işə salmır. Uzaq videolar 50 MiB həddi daxilində endirilir; daxili base64 videolar üçün isə model/messages/framing örtüyünün 50 MiB-lıq ictimai JSON sorğusu qəbul həddi daxilində qala bilməsi məqsədilə hər video üzrə dekodlaşdırılmış ölçüyə konservativ 36 MiB limiti tətbiq edilir. Daxili məlumatın uzunluğu və dekodlaşdırılmış ölçü təxminləri yaddaş ayrılmazdan əvvəl yoxlanılır. İlkin uzaq URL və hər bir yönləndirmə üçün HTTPS tələb olunur; bunun üçün DNS pinləməsi ilə mövcud, yalnız ictimai ünvanlara icazə verən çıxış qorumasından istifadə edilir. Daha sonra baytlar dəqiq daxili `POST /api/modality-bridge/video/extract` broker sərhədindən keçir. Həmin marşrut həm `LOCAL_ONLY`, həm də `SPAWN_CAPABLE`-dır, yalnız proses üzrə autentifikasiya edilmiş, etibarlı loopback sorğusunu qəbul edir və heç vaxt URL, fayl sistemi yolu, icra olunan fayl və ya arqument siyahısı qəbul etmir. API-nin sorğu gövdəsi ölçüsü emal zənciri və işləyicinin artımlı gövdə oxuyucusu broker girişinə tətbiq olunan 50 MiB limitini bir-birindən asılı olmadan təmin edir. Onun məhdud növbəsi eyni vaxtda bir çıxarma əməliyyatı icra edir, gözləmədə olan dörd tapşırığa icazə verir və gözləyən giriş məlumatlarını 100 MiB ilə məhdudlaşdırır.

Broker daxilində `ffprobe` özəl lokal faylı oxuyur; sabit format icazə siyahısı pleylist və manifest formatlarını istisna edir. İcazə verilən MOV ailəli konteynerlər üçün xarici MOV məlumat istinadları standart olaraq deaktiv qalır və sabit komanda onları aktivləşdirmir. Həm `ffprobe`, həm də `ffmpeg` yalnız `file` protokoluna icazə verən siyahıdan, bir axından, sabit arqument massivlərindən istifadə edir, shell istifadə etmir və icra olunan faylları `PATH` daxilindən tapır. Əlavə edilmiş şəkil-üzlük axınları oynadıla bilən namizəd hesab edilmir. Oynadıla bilən bütün axınlar limitlərə cavab verməlidir və deterministik ən aşağı indeksli ehtiyat variantından əvvəl açıq şəkildə standart kimi işarələnmiş axına üstünlük verilir. Videolar 600 saniyə, hər ölçü üzrə 8,192 piksel və 33,554,432 mənbə pikseli ilə məhdudlaşdırılır. FFmpeg orta nöqtələrdən 1–16 JPEG kadrı nümunələyir, daha kiçik girişləri böyütmədən uzun kənarı maksimum 1,024 pikselədək kiçildir və heç vaxt URL qəbul etmir. Standart nümunələmə `uniform`-dur. İxtiyari `scene_aware` və eksperimental `segment_aware` siyasətləri artıq doğrulanmış lokal axın üzərində əlavə bir sabit FFmpeg keçidi yerinə yetirir, məhdud sayda `showinfo` səhnə zaman nişanlarını seçir və detektor xətası, vaxt aşımı, qüsurlu çıxış və ya boş namizəd dəsti olduqda deterministik şəkildə eyni vahid orta nöqtələrə geri qayıdır. Segmentdən xəbərdar rejim orta nöqtə nümunələrini doğrulanmış səhnə intervallarına mütənasib şəkildə ayırır; segmentdən xəbərdar sübutlar və ehtiyat davranışı aşağıda ətraflı təsvir edilir. Sərt 16 kadr limiti hər siyasətdə seçimdən sonra tətbiq olunur. Səhnədən xəbərdar sorğunun büdcəsi yalnız bir kadr olduqda, aktiv tam video və ya fokus pəncərəsinin vahid orta nöqtəsindən istifadə edilir və `policyEffective: uniform` bildirilir: seçilmiş tək səhnə kadrı zaman aralığının hər iki ucunu qoruya bilməz. Çağıran tərəf istəyə görə sonlu fokus pəncərəsi (`start`/`end` saniyə) təqdim edə bilər; sərhədlər medianın müddətinə uyğun məhdudlaşdırılır, tərsinə çevrilmiş və ya sonlu olmayan pəncərələr rədd edilir və bütün nümunələmə siyasətləri yalnız normallaşdırılmış interval daxilində icra olunur. Nəticə pəncərəsi nümunələmə metadatasına və etibar edilməyən təsvir prefiksinə daxil edilir ki, sonrakı modellər fokuslanmış fraqmenti tam zaman xəttindən fərqləndirə bilsin.

Semantik altyazı fokusu ayrıca və açıq parametrdir. Standart `full` təhlil rejimi mövcud kadr promptunu qoruyur və sorğu mətnini heç vaxt altyazı modelinə ötürmür. `focused` rejimində körpü eyni Chat və ya Responses konteynerindən yalnız istifadəçinin yazdığı ən son boş olmayan `text`/`input_text` mətnini oxuyur, onu NFC-yə normallaşdırır, idarəetmə simvollarını və boşluqları yığcamlaşdırır və 500 Unicode kod nöqtəsi ilə məhdudlaşdırır. Boş nəticə tam olaraq `full` promptuna geri qayıdır. Yararlı ipucu ayrıca etibar edilməyən istifadəçi konteksti blokunda JSON kimi seriallaşdırılır və yalnız müşahidə edilə bilən detalları prioritetləşdirə bilər; mediada görünən və ya eşidilən təlimatlara əməl etməmək barədə ayrıca xəbərdarlığı ləğv edə bilməz. Mətn fokusu heç vaxt `start`/`end` dəyərlərini çıxarmır və temporal nümunələyicini dəyişmir.

#### FU-07 struktur segment sübutları

`segment_aware` artıq doğrulanmış lokal video axını üzərində bir məhdud ilkin təhlil keçidindən istifadə edir. Sabit filtr zənciri əvvəlcə eni maksimum 320 pikselədək kiçildir, səhnə dəyişikliklərini və donmuş intervalları aşkarlayır, sonra bulanıqlıq, orta parlaqlıq və fəza/zaman məlumatı üçün saniyədə 1 kadr nümunələyir. Keçid 600 struktur nümunəsi, bir FFmpeg/filtr axını, eyni yalnız `file` protokoluna və konteynerlərə icazə verən siyahılar, 1 MiB proses çıxışı həddi və brokerin ortaq dayandırma/son müddəti daxilində maksimum 30 saniyə ilə məhdudlaşdırılır. O, sorğudan heç vaxt komanda, filtr, yol və ya URL qəbul etmir.

Struktur dəyərləri semantik video anlayışı deyil, deterministik seçmə sübutudur. Onlar subyektlər, hərəkətlər, subtitrlər, nitq və ya istifadəçi niyyəti barədə nəticə çıxarmır. Səhnə və donma sərhədləri seqmentlər yaradır; donma əhatəsi, bulanıqlıq, ekspozisiya, məkan detallılığı və zaman üzrə dəyişiklik yalnız mövcud 1–16 kadr büdcəsinin necə bölüşdürüldüyünə təsir edir. Tamamilə donmuş seqment ən çox bir kadrla məhdudlaşdırılır, donmamış seqmentlər isə qalan büdcə uğrunda rəqabət aparır. Sərhədlərin sayı kadrların sayını aşdıqda, sürətli erkən keçidlərin uzun son seqmenti gizlədə bilməməsi üçün zaman xətti üzrə bərabər əhatə saxlanılır. Donma sərhədinin 1 saniyəlik analiz ayırdetmə intervalına düşən səhnə sərhədləri birləşdirilir.

Çatışmayan filtrlər, səhv formatlı/boş sübut, detektor xətası və ya məhdudlaşdırılmış ilkin analiz vaxt aşımı zamanı sistem dəqiq vahid orta nöqtə siyasətinə açıq şəkildə geri qayıdır. Çağıranın dayandırması və ya broker son müddətinin bitməsi belə geri qayıdışa səbəb olmur: bu, icra olunan alt prosesi dayandırır, sonrakı kadr çıxarılmasının qarşısını alır və özəl müvəqqəti ağac `finally` blokunda silinir.

`scripts/perf/video-bridge-fu07-eval.ts` deduplikasiyadan sonrakı subtitr çağırışı qənaəti, sıx hərəkət büdcəsinin bölüşdürülməsi, bulanıqlıq/ekspozisiya/SI-TI sübutu, uzun sonluqlu sürətli keçidlər və tədricən solma ilə bağlı yanlış müsbət nəticələr üçün deterministik real FFmpeg sınaq nümunələri yaradır. O, ilkin analizin faktiki keçən vaxtını və `/usr/bin/time` mövcud olduqda alt prosesin CPU istifadəsini və pik RSS göstəricisini qeydə alır. Onun keyfiyyət yoxlamaları yalnız struktur etalonlarıdır. Real subtitr modelinin keyfiyyəti `HOLD` olaraq qalır, çünki bu sınaq sistemində səlahiyyətli son nöqtə və ya sabitləşdirilmiş qiymətləndirici yoxdur. `--caption-cost-per-call-usd` hər çağırış üçün açıq şəkildə müsbət xərc təxmini təqdim etmədikcə, pul qənaəti də `HOLD` olaraq qalır; skript heç vaxt bu nəticələrdən heç birini uydurmur.

Hər kadr 4 MiB, bütün xam kadrlar birlikdə 23 MiB, seriallaşdırılmış broker cavabı isə 32 MiB ilə məhdudlaşdırılır. Özəl müvəqqəti kataloq `finally` blokunda silinir. OmniRoute FFmpeg-i paketə daxil etmir və fərdi icraolunan fayl yolunu qəbul etmir. Subtitrləməzdən əvvəl körpü konservativ vizual deduplikasiya mərhələsi tətbiq edir: hər JPEG 16×16 boz çalar buferinə kiçildilir və yalnız saxlanılan son kadrla müqayisə edilir. Bir kadrdan çox tələb olunan subtitr büdcəsi üçün çıxarış həmin büdcənin ən çox iki misli qədər və heç vaxt 16 kadrdan çox olmayan məhdud namizəd hovuzu təqdim edir. Tələb olunan limit yalnız deduplikasiyadan sonra tətbiq edilir; büdcə ən azı iki olduqda, son seyrəltmə zamanı ilk və son seçilmiş namizədlər qorunur. Versiyalanmış
`grayscale-16x16-mean-cells-v2` siyasəti orta parlaqlıq fərqi ilə normallaşdırılmış fərqi ən azı 0.05 olan miniatür hüceyrələrinin nisbətindən daha böyük olanını istifadə edir. Dublikat həddi icra vaxtı parametri kimi təqdim edilmək əvəzinə, proqnozlaşdırıla bilməsi üçün seçilmiş 0.04 sabitidir. Bu ikinci yüksək kontrastlı siqnal yalnız orta qiymətə əsaslanan müqayisənin gizlədə biləcəyi kiçik hərəkətləri və görünən mətn dəyişikliklərini qoruyur. Müqayisəçi və ya dekoder xətaları zamanı sistem açıq şəkildə geri qayıdır və əhatəni saxlayır. Çıxış metadatası çıxarılmış namizədləri, uğurla istifadə edilmiş kadrları və atılmış vizual dublikatları ayrı göstərir.

Açıq şəkildə video hissəsi kimi işarələnmiş element vaxt damğalı kontakt vərəqi tələb edə bilər. Körpü ən çox 4 sütundan və 16 kadrdan ibarət JPEG toru yaradır. Hər 512 piksellik xana öz mənbə vaxt damğasını yüksək kontrastlı alt zolağa həkk edir, eyni vaxt damğaları isə sonrakı əlaqələndirmə və audit üçün mətn metadatasında saxlanılır. Tam JPEG 32 MiB ilə məhdudlaşdırılır. `sharp` torun dekodlanmasını və ya tərtibini həyata keçirə bilməzsə, körpü ayrı-ayrı JPEG kadrlarına geri qayıdır; müştəri dayandırması isə vərəq əməliyyatı boyunca ötürülməyə davam edir.

Buraxılış üçün uyğunluq sübutu sintetik tərtib mikrobencmarkından qəsdən ayrı saxlanılır. `scripts/perf/video-bridge-contact-sheet-eval.ts` real OpenAI-uyğun görüntü modelləri üçün sxem versiyalı A/B sınaq sistemi müəyyən edir. O, provayder tərəfindən bildirilən tokenləri, başdan sona faktiki gecikməni (vərəqin tərtibi daxil olmaqla), model çağırışlarının sayını və manifestdə müəyyən edilmiş faktların saxlanmasını ölçür. Xam model cavabları hesabata yazılmır; yalnız SHA-256 heşləri və uyğun gələn fakt ID-ləri saxlanılır. `--execute-real` ötürülmədikcə və `--model`, `OMNIROUTE_BASE_URL` və `OMNIROUTE_API_KEY` konfiqurasiya edilmədikcə sınaq sistemi heç bir şəbəkə və ya ödənişli model çağırışı etmir. Bu açıq real icra olmadan onun maşınla oxuna bilən hökmü `HOLD` olaraq qalır; yalnız sintetik faydalı yük/çağırış sayı ölçmələri buraxılış üçün uyğunluq sübutu deyil.

Çağıranlar artıq sinxronlaşdırılmış mətnə sahib olduqda dəstəklənən video hissəsinə istəyə bağlı `transcript.cues` massivi əlavə edə bilərlər. Hər cue `text`, yoxlanılmış müddət daxilində sonlu `start`/`end` intervalı və icazəli siyahıdakı `source` (`client`, `embedded` və ya `audio-bridge`) daşımalıdır; `confidence` üçün standart dəyər `1`-dir və bu dəyər `0` ilə `1` arasında qalmalıdır. Tam eyni cue-lar birləşdirilir. OmniRoute heç vaxt bu metadata əsasında transkripsiyaya başlamır: doğrulanmış cue-lar mənbə, əminlik dərəcəsi və intervalla birlikdə təsvir edilmiş nəticəyə köçürülür və kadr subtitrləri ilə yanaşı etibar edilməyən müşahidələr kimi göstərilir. Etibarsız, diapazondan kənar və ya mənşəyi göstərilməyən mətn subtitr axınına qarışdırılmaq əvəzinə rədd edilir. Hazırda `source` sahəsi server tərəfindən doğrulanmır, çağıran tərəfindən bəyan edilir: OmniRoute dəyərin icazə verilən üç sətirdən biri olmasını təmin edir, lakin `embedded` və ya `audio-bridge` etiketinin həqiqətən serverə məxsus çıxarışdan gəldiyini hələ kriptoqrafik şəkildə təsdiqləmir. Bu doğrulama tətbiq edilənədək `source` sahəsinə etibar edilməyən ipucu kimi yanaşın; avtorizasiya qərarlarını onun əsasında qurmayın.

Təkmil çağırıcı eyni video üçün artıq avtorizasiya edilmiş `audioTranscript`
trekini təqdim edə bilər. Birləşdirmə qatı vizual və audio müşahidələri vahid
son müddət və dayandırma siqnalı çərçivəsində işlədir, onları ümumi zaman
xəttində sıralayır, tam dublikatları birləşdirir və yalnız bir tərəf uğurlu
olduqda qismən nəticə qaytarır. Etibarsız `audioTranscript` bütöv videonun
emalını uğursuz etmək əvəzinə həmin qismən nəticəyə çevrilir — vizual təsvir
saxlanılır, audio qolu isə təmizlənmiş xəta kodunu qeydə alır. Hər qol üzrə
əlçatanlıq, qismən nəticə bayrağı və təmizlənmiş xəta kodları təsvir edilmiş
nəticədə, qoruyucu mexanizm metadatasında (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), nəticə keşi metadatasında və körpünün birləşdirmə
sayğaclarında qorunur. Defolt Video Bridge yolu nitqdən mətnə çevirməni işə
salmır və medianın ikinci nüsxəsini endirmir; həmin trek açıq şəkildə təqdim
edilmədikdə, o yalnız video rejimində qalır.

**Transkriptin saxlanması (#12150 P1).** Bu, Video Bridge (özü könüllü aktivləşdirilir)
transkript işarəsini render etdikdə avtomatik tətbiq olunur — ayrıca saxlama
bayrağı yoxdur. Sorğu hər hansı transkript işarəsini (çağırıcı tərəfindən elan
edilmiş `transcript` və ya birləşdirilmiş `audioTranscript`) render etdikdə,
qoruyucu mexanizm onu `videoBridgeObserved` kimi işarələyir və video təsvirinin
redaktə edilmiş kölgə nüsxəsini yaradır — hər bir işarənin sərbəst mətn gövdəsinin
`[redacted-video-transcript]` ilə əvəz edildiyi eyni render; bu, sətir
formalaşdırılmamışdan əvvəl strukturlaşdırılmış işarə sahəsinin əvəzlənməsi ilə
qurulur (heç vaxt yastılanmış mətn təhlil edilmir, buna görə də heç bir işarə
məzmunu — zərərli və ya adi, o cümlədən `[inaudible]`/`[music]` kimi `]`
simvolunu ehtiva edən gövdələr — qorunub qala bilməz). Davamlı çağırış jurnalının
sorğu gövdəsi məzmun bərabərliyi əsasında uyğunlaşdıraraq videodan alınmış hər
mətn hissəsini həmin redaktə edilmiş kölgə nüsxəsi ilə əvəz edir; `fullText`
ankoru tamamlanmış çağırışöncəsi qoruyucu mexanizm faydalı yükündən yenidən
oxunur, buna görə sonrakı zəncir qoruyucu mexanizmləri (PII və etimadnamə
maskalayıcıları, prioritetlər 10/95) təsvir mətnini yerində yenidən yazdıqdan və
sistem sorğusu/ötürmə/yaddaş inyeksiyası mesaj massivini yenidən formalaşdırdıqdan
sonra da uyğunlaşdırma uğurlu olur. Modelə yuxarı axınla göndərilən gövdə
dəyişmir. Müşahidə edilmiş sorğu həmçinin davamlı Memory-ni doldurmur (həm
sorğudan, həm də cavabdan alınan çıxarış ötürülür), buna görə modelin öz cavabı
transkript mətnini Memory-yə əks etdirə bilməz.

Hələ açıq qalan saxlama səthləri sonrakı iş üçün izlənilir (**P2**, #12430):
ətraflı jurnal artefaktındakı qoruyucu mexanizmdən əvvəlki xam müştəri sorğusu
ani görüntüsü; `previous_response_id` davamının qapalı şəkildə uğursuz olması;
transkripti sintez edilmiş sətir sorğusunun daxilində yerləşdirən törəmə sorğu
daxili göndərişləri (konveyer mərhələləri, kontekst ötürməsi); və transkriptdən
sitat gətirən model cavabının cavab gövdəsi / semantik keş nüsxəsi. Bunlar P1-in
davamlı sorğu gövdəsi + Memory əhatə dairəsindən kənarda olan xam/cavab sinifli
və ya könüllü aktivləşdirilən səthlərdir.

Daxili `/api/modality-bridge/video/drilldown` həyat dövrü ayrıca, geri dövrə/token
əsasında autentifikasiya olunan keş altlığıdır. Hər əməliyyat həmçinin kanonik,
qeyri-şəffaf prinsipial ID-si tələb edir. İstehsal çağırıcısı aktiv edilməzdən
əvvəl həmin ID-ni autentifikasiya olunmuş tenantdan törətməli və heç vaxt müştəri
tərəfindən seçilmiş dəyəri yönləndirməməlidir. Keş açarları həmin prinsipialı
kanonik sessiya və video istinadı ID-lərinə bağlayır, yalnız onların SHA-256
əsasında törədilmiş açarlarını saxlayır və həm oxumaları, həm də silməni eyni
prinsipialla məhdudlaşdırır. Keş hər qeyd üçün ən çox 16 törəmə JPEG kadrı
saxlayır, onların müddətini on dəqiqədən sonra bitirir və məhdudlaşdırılmış
`start`/`end` oxumalarını və ya sessiyanın açıq şəkildə silinməsini dəstəkləyir.

Hər prinsipial 16 qeyd və 64 MiB kanonik JPEG məlumatı ilə məhdudlaşdırılır. Bu
məhdudiyyətlər qlobal 64 qeyd/256 MiB həddindən müstəqildir: prinsipial kvotasının
təzyiqi qlobal LRU çıxarılması nəzərdən keçirilməzdən əvvəl yalnız həmin
prinsipialın ən uzun müddət istifadə edilməmiş qeydlərini çıxarır. Müddəti bitmiş
qeydlər keş fəaliyyəti zamanı həm prinsipial, həm də qlobal uçotdan təmizlənir,
ləğvetmə və doğrulama xətası isə qismən əvəzləməni təsdiqləmir.

Keş qeyri-kanonik Base64-ü, həddindən artıq doldurmanı, JPEG olmayan medianı,
qüsurlu və ya kəsilmiş JPEG-ləri və məhdud tam təsvir `sharp` dekodlaşdırması
zamanı xəbərdarlıq yaradan JPEG-ləri rədd edir. O, qəbul edilmiş hər təsviri
kanonik JPEG kimi yenidən kodlaşdırır, çağırıcının sahələrinə etibar etmək
əvəzinə en və hündürlüyü dekodlaşdırılmış baytlardan törədir və hər hansı arxadakı
poliqlot baytlarını saxlamaq əvəzinə silir. Hər iki kvotaya yalnız
məhdudlaşdırılmış kanonik sıxılmış bufer daxil edilir. JSON ötürmə həddi 32 MiB
dekodlaşdırılmış giriş tavanı üçün Base64 əlavəsini də əhatə edir. Saxlanılan hər
törəmə onun doğrulanmış JPEG formatını/rezolyusiyasını, seçmə siyasətini, törəmə
versiyasını, yaradılma vaxtını, server tərəfindən hesablanmış məzmun heşini,
həmçinin heşlənmiş ana istinadı və etibarlı çağırıcının ana məzmun heşini qeydə
alır. Atomik keş təsdiqindən əvvəl asinxron dekodlaşdırma/heş mərhələləri arasında
ləğvetmə yoxlanılır.

Bu tranş hələ istehsal prodüserini marşruta qoşmur və çoxrezolyusiyalı variant
seçimini təmin etmir. Buna görə şəffaf Video Bridge sorğu yolu əlavə iş yükünə
məruz qalmır, tenantla əlaqələndirilmiş prinsipialın törədilməsi və tam FU-08
çoxrezolyusiyalı həyat dövrü isə tamamlanmış davranış kimi sənədləşdirilmək
əvəzinə açıq sonrakı iş olaraq qalır.

Kadrlar konfiqurasiya edilmiş Video modeli ilə ardıcıl olaraq təsvirlənir. Boş
Video əvəzetməsi Vision parametrini miras alır; hər ikisi boş olduqda isə Vision
avtomatik marşrutlayıcısı effektiv, görüntü imkanlı modeli seçir. Uğurlu təsvirlər
orijinal hissəni sabit `[Video description:` prefiksi ilə əvəz edir; bu prefiks
həmçinin mətni etibar edilməyən, mediadan əldə olunmuş müşahidə kimi işarələyir və
sonrakı modellərə mediada tapılan təlimatlara əməl etməməyi bildirir. Kadr təsviri
keşinin açarlarına JPEG baytları, sorğu, zaman damğası və effektiv model daxildir;
yalnız uğurlu təsvirlər keşlənir. Keş qeydləri ehtiyat model də daxil olmaqla,
faktiki uğurlu istehsalçı modeli saxlayır; müxtəlif kadrlar fərqli modellər
tərəfindən yaradıldıqda körpü `mixed` bildirir. Keş uyğunluğu həmin istehsalçı
identikliyini sorğu edilən marşrutlaşdırma planı kimi yenidən etiketləmək əvəzinə
təkrar istifadə edir. Bütöv video nəticəsinin keşi çıxışı dəyişdirən hər bir
girişə əsasən açarlanır — sorğu, effektiv model, nümunələmə siyasəti, kadr sayı,
semantik analiz rejimi, normallaşdırılmış fokus ipucunun SHA-256 rəqəmsal izi,
fokus pəncərəsi, `transcript`, `audioTranscript` və kontakt vərəqi bayrağı — buna
görə də bu ölçülərdən hər hansı birinin dəyişdirilməsi köhnəlmiş nəticənin təkrar
istifadəsinə deyil, keş uyğunsuzluğuna səbəb olur. Vizual dublikatların aradan
qaldırılması siyasətinin versiyası, həddi və məhdudlaşdırılmış namizəd kadr sayı
da nəticə keşinin açarında və metadatasında açıq şəkildə göstərilir; beləliklə,
siyasət dəyişikliyi köhnəlmiş bütöv video təsvirindən təkrar istifadə edə bilməz.
Nəticə keşi v4 metadatası rejimi və rəqəmsal izi saxlayır, istifadəçinin ilkin
tapşırığını isə heç vaxt saxlamır. Qoruyucu mexanizmin metadatası həm sorğu
edilmiş, həm də effektiv analiz rejimlərini bildirir; istifadəyə yararlı istifadəçi
mətni olmadan sorğu edilən `focused` rejimi effektiv olaraq `full` kimi bildirilir.

Qoruyucu mexanizm dəstəklənən bütün video hissələrini çıxarır, lakin
`modalityBridgeVideoMaxVideos` sayından çoxunu təsvir etmir.
`supportsVideo === false` olduğu sübut edilmiş hədəf üçün uğursuz və limiti aşan
videolar açıq, təhlükəsiz mətn markerlərinə çevrilir ki, heç bir xam video
qalmasın. İmkan məlum olmadıqda həmin hissələr dəyişdirilmədən saxlanılır.
`supportsVideo === true` olan hədəflər körpüdən yan keçir. Müştəri sorğusunun
dayandırma siqnalı endirmə, broker növbəsi, alt proseslər və təsvir çağırışları
boyunca ötürülür; dayandırmalar videolar arasında prosesi dayandırır və heç vaxt
xam mediaya açıq keçidlə nəticələnmir.

İcra vaxtı parametrləri DB-də saxlanılır və Zod ilə doğrulanır:

| Açar                                | İlkin dəyər | Aralıq / davranış                                                                                                         |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | İstəyə bağlı icra vaxtı funksiyası, ayrıca aktivləşdirilir                                                                |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` ümumi təsvirləri qoruyur; `focused` məhdudlaşdırılmış, etibar edilməyən son istifadəçi kontekstindən istifadə edir |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge modelini miras alır                                                                                         |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                      |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` və ya proporsional `segment_aware`; detektor xətası zamanı `uniform` istifadə olunur             |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                       |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                            |

Əvvəllər saxlanılmış, 120 saniyədən yüksək Video taymaut dəyərləri brokerin son
müddətinə endirilir; bu limiti aşan yeni parametr yazılışları rədd edilir.
`GET /api/modality-bridge/video/runtime` autentifikasiyadan və ya icra mühitinin
yoxlanmasından əvvəl etibarlı şəkildə möhürlənmiş loopback lokallığı, daha sonra
isə idarəetmə autentifikasiyası tələb edir. O, yalnız `available`, təmizlənmiş
FFmpeg/ffprobe versiyalarını və icra mühiti əlçatan olmadıqda sabit səbəbi
qaytarır. Daxili çıxarma endpoint-i açıq yükləmə API-si deyil: növbənin dolması
`503` və `Retry-After`, çağıranın bağlantını kəsməsi `499`, brokerin sabit son
müddətinin bitməsi isə `504` qaytarır. Çevrilmiş cavablar Vision və ya Audio
seqmentlərini silmədən mərkəzi `x-omniroute-modality-bridge` başlığına
`video->text;model=<visionModel>;parts=<videos>` əlavə edir.

### PII Maskalayıcısı (`piiMasker.ts`)

**Hər iki** mərhələdə işləyir.

- **`preCall`** faydalı yükün surətini yaradır, `system`, `messages`, `input` və
  `prompt` sahələrini (sadə sətir elementləri daxil olmaqla) gəzir və `content`/`text`
  sətir sahələrinə (`@/shared/utils/inputSanitizer` modulundan) `processPII()`
  tətbiq edir. `PII_REDACTION_ENABLED=true` olduqda aşkarlanmış PII gedən faydalı
  yükdə redaktə edilir. Bu, `INPUT_SANITIZER_MODE` parametrindən asılı deyil
  (həmin parametr yalnız sorğu inyeksiyası siyasətini idarə edir). Redaktə
  söndürüldükdə çağırış məzmunu yenidən yazmadan aşkarlanma saylarını qeydə alır.
- **`postCall`** cavabın dərin surətini yaradır, `sanitizePIIResponse()` və
  Responses API formasının maskalayıcısını (`maskResponsesOutput` —
  `output_text` və `output[].content[].text` sahələrini əhatə edir) işə salır.
  Hər hansı redaktə baş verdikdə dəyişdirilmiş cavab orijinalı əvəz edir.

Qoruyucu mexanizm heç vaxt bloklamır; o yalnız annotasiya edir
(`meta.detections`, `meta.redacted`) və ya yenidən yazır.

### Sorğu inyeksiyası (`promptInjection.ts`)

İstifadəçi tərəfindən təqdim edilən məzmunda düşmən xarakterli strukturları
aşkarlayır və konfiqurasiya edilmiş siyasəti tətbiq edir. Davranış mühit
dəyişənləri və konstruktor seçimləri ilə idarə olunur:

| Parametr       | Mühit dəyişəni                                                                                        | Defolt | Təsir                                                                                                                                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktivdir       | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | `false` olduqda qoruyucu mexanizm dərhal icranı dayandırır.                                                                                                                                                                 |
| Rejim          | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | İnjeksiya siyasəti: `block`, `warn` və ya `log`. (`redact` geriyə uyğunluq üçün qəbul edilir, lakin injeksiya mətnini **silməz**; sorğudakı PII məlumatlarının yenidən yazılması `PII_REDACTION_ENABLED` ilə idarə olunur.) |
| Bloklama həddi | `blockThreshold` seçimi / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Bloklama üçün tələb olunan minimum ciddilik səviyyəsi. Defolt olaraq orta səviyyə yalnız müşahidə edilir.                                                                                                                   |

**Rejim prioriteti** (`getMode`): çağıranın `options.mode` dəyəri →
`INJECTION_GUARD_MODE` üçün **DB funksiya bayrağı üstün təyinatı** (İdarəetmə paneli → Parametrlər →
Funksiya bayraqları) → `INJECTION_GUARD_MODE` mühit dəyişəni → `INPUT_SANITIZER_MODE` mühit dəyişəni →
`warn`. Beləliklə, idarəetmə panelindəki üstün təyinat mühit dəyişənlərindən üstün olur və Funksiya
bayraqları interfeysi işləyən qoruyucunu canlı şəkildə idarə edir (yenidən başlatma tələb olunmur). DB oxunuşu xətaya davamlıdır:
xəta baş verərsə, qoruyucu mühitə əsaslanan davranışa geri qayıdır; üstün təyinat
olmadıqda isə davranış yalnız mühit dəyişənlərinə əsaslanan həll ilə eynidir.

Aşkarlama mənbələri:

1. `@/shared/utils/inputSanitizer` modulundakı `sanitizeRequest()` (emal
   konveyerinin digər hissələrində də istifadə edilən ortaq detektor dəsti).
2. Daxili `DEFAULT_GUARD_PATTERNS` (hazırda `system_override_inline` və
   `markdown_system_block`; hər ikisinin ciddilik səviyyəsi `high`-dır).
3. Konstruktor seçimləri vasitəsilə ötürülən qeyri-məcburi `customPatterns` (sətirlər, müntəzəm ifadələr
   və ya `{ name, pattern, severity }` qeydləri).

`mode === "block"` olduqda **və** ən azı bir aşkarlama ciddilik
həddinə çatdıqda, `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }` qaytarır. `warn`/`log` rejimlərində qoruyucu mexanizm qeydlər yaradır, lakin
çağırışa icazə verir. Reyestrdən keçmədən sorğuları qiymətləndirməli olan
çağıranlar üçün ortaq `evaluatePromptInjection()` köməkçi funksiyası da ixrac edilir.

**Skan limiti (v3.8.20):** detektor birləşdirilmiş sorğu mətninin yalnız **ilk 16 KB** hissəsini
yoxlayır — `src/shared/utils/inputSanitizer.ts` faylında
`MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bayt). Həm `detectInjection()`, həm də
`evaluatePromptInjection()` nümunə dövrünü işə salmazdan əvvəl
`slice(0, MAX_INJECTION_SCAN_BYTES)` çağırır. İnjeksiya direktivləri girişin yuxarı hissəsində yerləşdiyi üçün bu,
aşkarlamanı zəiflətmədən yüzlərlə KB ölçülü faydalı yükdə regex CPU/GC istifadəsini
məhdudlaşdırır (bax: #3932, #4041).

### Etimadnamə maskalayıcısı (`credentialMasker.ts`)

**Hər iki** mərhələdə, defolt zəncirin sonunda (prioritet `95`) işləyir. Geniş tanınan
API açarı / məxfi token nümunələrini həm çıxış faydalı yükündən (mesaj
məzmunu, alət çağırışı arqumentləri, alət nəticələri), **həm də** provayder cavabından redaktə edir. Beləliklə,
sorğuya yapışdırılmış (və ya alət nəticəsi tərəfindən geri qaytarılmış) etimadnamə
yuxarı axındakı provayderə və ya geriyə, müştəriyə sızdırılmır.

- PII redaktəsi ilə eyni qaydaya əsasən **yalnız aktivləşdirildikdə işləyir** (Sərt Qayda #20 ilə əlaqəli):
  `settings.credentialRedactionEnabled === true` **və ya**
  `CREDENTIAL_REDACTION_ENABLED=true` olmadığı halda deaktivdir. Söndürülmüş olduqda qoruyucu mexanizm heç bir əməliyyat yerinə yetirmir —
  heç vaxt bloklamır və heç vaxt yenidən yazmır.
- `redactCredentials()` bütün faydalı yük/cavab ağacını gəzir (`walkValue()`,
  prototip çirklənməsinə qarşı təhlükəsizdir, `WeakSet` vasitəsilə dövrlərə qarşı təhlükəsizdir) və uyğunluqları
  `[REDACTED:<type>]` yer tutucusu ilə əvəz edir; yalnız faktiki olaraq
  dəyişmiş budaqları klonlayır.
- `CREDENTIAL_PATTERNS` LLM provayder açarlarını (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokenlərini (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), ödəniş açarlarını (Stripe, Square), bulud
  açarlarını (AWS giriş açarı, Twilio, SendGrid, Mailgun), şəxsi açarları / JWT-ləri,
  etimadnamə ehtiva edən bağlantı sətirlərini (`mongodb://user:pass@...` və s.) və
  ümumi `Authorization`/`x-api-key`/`api-key`/`apikey` başlıq-dəyər
  nümunəsini əhatə edir. Başlıq formasındakı açarlar (`authorization`, `x-api-key`, `api-key`,
  `apikey`) ümumi mətn regex-i vasitəsilə deyil, struktur olaraq redaktə edilir (yalnız dəyər dəyişdirilir,
  `Bearer `/`Basic ` kimi sxem prefiksi qorunur).
- Qoruyucu mexanizm heç vaxt bloklamır; o, yalnız yenidən yazır (`modifiedPayload` /
  `modifiedResponse`) və annotasiya edir (`meta.credentialsRedacted`, `meta.count`).

Reqressiyadan qorunma: `tests/unit/credential-masker-guardrail.test.ts`.

## Əsas müqavilə (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true zənciri dərhal dayandırır
  message?: string; // bloklama zamanı göstərilir
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // sorğunu yenidən yazmaq üçün preCall tərəfindən qaytarılır
  modifiedResponse?: TValue; // cavabı yenidən yazmaq üçün postCall tərəfindən qaytarılır
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Qoruyucu mexanizm `void`, `{}` və ya `{ block: false }` qaytarmaqla "dəyişiklik yoxdur"
siqnalını verir. `modifiedPayload`/`modifiedResponse` qaytarılması zəncir boyunca
sonrakı qoruyucu mexanizmlərə ötürülən dəyəri əvəz edir.
`signal?: AbortSignal` çağıranın həyat dövrünü qoruyucu mexanizmlərə ötürür. Sorğunun ləğv edilməsi qəsdən tətbiq olunan fail-open istisnasıdır: media körpüləri işi dayandırır və təmizləmə aparır, lakin emal edilməmiş medianı onu dəstəkləmədiyi məlum olan hədəfə bərpa etmir.

## Reyestr (`registry.ts`)

Tək nümunəli `guardrailRegistry` aşağıdakıları təqdim edir:

- `register(guardrail)` — qoruyucu mexanizm əlavə edir (və ya normallaşdırılmış ada görə əvəz edir) və
  artan `priority` sırasına görə yenidən çeşidləyir.
- `clear()` / `list()` — inzibati köməkçi funksiyalar.
- `runPreCallHooks(payload, context)` — aktiv qoruyucu mexanizmlər üzrə iterasiya edir, payload-u
  `modifiedPayload` vasitəsilə zəncir boyunca ötürür və ilk `block: true` halında dayanır.
- `runPostCallHooks(response, context)` — cavab tərəfində eyni axını icra edir.
- `resetGuardrailsForTests({ registerDefaults })` — vəziyyəti təmizləyir və təmiz test izolyasiyası üçün istəyə bağlı olaraq
  standartları yenidən qeydiyyatdan keçirir.

Hər iki icra mexanizmi `{ blocked, payload|response, results, guardrail?, message? }`
qaytarır; burada `results` hər qoruyucu mexanizm üzrə
`blocked`, `skipped`, `modified`, `error` və `meta` sahələrini ehtiva edən
`GuardrailExecutionResult` qeydləri massividir və izləmə üçün faydalıdır.

### Hər sorğu üzrə qoruyucu mexanizmlərin deaktiv edilməsi

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` cari sorğu üçün
ötürülməli olan qoruyucu mexanizm adlarının təkrarlanmayan siyahısını toplayır.
Mənbələr (hamısı istəyə bağlıdır və hamısı birləşdirilir):

- `apiKeyInfo.disabledGuardrails`
- Sorğunun gövdəsində `disabledGuardrails` (yuxarı səviyyə)
- Sorğunun gövdəsində `metadata.disabledGuardrails`
- `x-omniroute-disabled-guardrails` başlığı (və ya köhnə
  `x-disabled-guardrails`)

Dəyərlər sətirlər massivləri və ya vergüllə ayrılmış sətir ola bilər; adlar
kiçik hərflərlə kebab-case formatına normallaşdırılır (`pii_masker` → `pii-masker`). Nəticə
`context.disabledGuardrails` vasitəsilə reyestrə ötürülür və reyestr uyğun gələn
qoruyucu mexanizmləri ötürür (`results` daxilində `skipped: true`).

## İcra ardıcıllığı

`src/sse/handlers/chat.ts` və `open-sse/handlers/chatCore.ts` vasitəsilə keçən hər bir sorğu üçün:

1. `resolveDisabledGuardrails(...)` API açarı, sorğu gövdəsi və başlıqlar əsasında ötürüləcək qoruyucu mexanizmlərin siyahısını yaradır.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` qoruyucu mexanizmləri artan prioritet sırası ilə işə salır:
   - Deaktiv edilmiş qoruyucu mexanizmlər `skipped` kimi qeydə alınır.
   - Hər qoruyucu mexanizmin `preCall` funksiyası `modifiedPayload` vasitəsilə faydalı yükü yenidən yaza bilər.
   - İlk `block: true` zənciri qısa qapayır və emalçı qoruyucu mexanizm tərəfindən rədd cavabı qaytarır.
3. Dəyişdirilmiş ola bilən faydalı yük kombinə edilmiş marşrutlaşdırmaya və yuxarı axına göndərilməyə ötürülür.
4. Cavab formalaşdırıldıqdan sonra `guardrailRegistry.runPostCallHooks(...)` cavab üzərində eyni zənciri işə salır. Buradakı `block: true` yuxarı axın cavabını ləğv edir.

İstisna atan qoruyucu mexanizmlər `error: <message>` ilə qeydə alınır və `logger.warn` vasitəsilə jurnala yazılır, lakin zəncir davam edir — bu, dizayn etibarilə nasazlıq zamanı icazəvermə yanaşmasıdır.

## Konfiqurasiya

Daxili qoruyucu mexanizmlərin oxuduğu mühit dəyişənləri:

| Dəyişən                               | İstifadə edən             | Təsir                                                                                                         |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Aşkarlamanı tamamilə deaktiv etmək üçün `false` təyin edin.                                                   |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | İnjeksiya siyasəti: `warn`, `block` və ya `log`. Köhnə `redact` dəyəri injeksiya mətnini yenidən yazmır.      |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | İnjeksiya qoruyucusunun rejimi; həmçinin mühit dəyişənlərini **üstələyən** DB funksiya bayrağıdır (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | `MODE=block` tərəfindən rədd edilən minimum ciddilik səviyyəsi: `high` (standart), `medium` və ya `low`.      |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | `INPUT_SANITIZER_BLOCK_THRESHOLD` üçün köhnə alternativ ad.                                                   |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | `true` olduqda sorğudakı PII redaktə edilir (injeksiya rejimindən asılı olmayaraq).                           |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (aşağı axın) | Cavab tərəfindəki maskalayıcının davranışını idarə edir.                                                      |

Modality Bridge qoruyucu mexanizmləri mühit dəyişənlərindən deyil, DB dəstəkli parametrlər anbarındakı icra vaxtı konfiqurasiyasını (`getSettings()`) oxuyur. Vision üçün əsas açarlar bunlardır:
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` və
`modalityBridgeCacheMaxEntries`. Köhnə
`visionBridge*` açarları yalnız sənədləşdirilmiş bir dövrlük oxuma ehtiyat variantı kimi qəbul edilir; idarəetmə panelindəki yazma əməliyyatları əsas açarlardan istifadə edir. Standart dəyərlər və ehtiyat həll mexanizmi `src/shared/constants/modalityBridgeDefaults.ts` daxilindədir, köhnə sabitlər isə `src/shared/constants/visionBridgeDefaults.ts` daxilində saxlanılır.

Audio `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` və `modalityBridgeAudioMaxClips`, həmçinin ortaq
`modalityBridgeCache*` parametrlərindən istifadə edir. Bu açarlar Modality Bridge sxemi ilə təqdim edildiyinə görə Audio üçün köhnə açarlara ehtiyat keçid yoxdur.

Video `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` və
`modalityBridgeVideoTimeout`, həmçinin ortaq `modalityBridgeCache*` parametrlərindən istifadə edir.
FFmpeg/ffprobe istəyə bağlı əməliyyat asılılıqları olduğuna, kadrların təsvir edilməsi isə gecikmə və model xərci yaratdığına görə bu funksiya standart olaraq deaktivdir.

## Fərdi qoruyucu mexanizmlər

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Addımlar:

1. `BaseGuardrail` sinfini genişləndirən `src/lib/guardrails/myGuardrail.ts` faylını yaradın.
2. `preCall` və/və ya `postCall` metodunu reallaşdırın.
3. Ya import zamanı qeydiyyatdan keçirin (`registerDefaultGuardrails` daxilindən əlavə edin), ya da
   icra zamanı `guardrailRegistry.register(...)` çağırın — reyestr eyni normallaşdırılmış ada
   malik əvvəlki qoruyucu mexanizmi əvəz edir.
4. Testləri `tests/unit/` altında əlavə edin (mövcud nümunələr:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testləmə

Məlum vəziyyətdən başlamaq üçün testlər arasında `resetGuardrailsForTests()` istifadə edin.
Boş reyestrlə başlamaq və yalnız test edilən qoruyucu mexanizmləri qeydiyyatdan keçirmək
üçün `{ registerDefaults: false }` ötürün. Vision Bridge asılılıqların yeridilməsini
(`deps.getSettings`, `deps.callVisionModel`) qəbul edir; Audio Bridge isə parametrlər,
imkanlar, STT modelinin seçimi, giriş məlumatlarının yoxlanılması və transkripsiya üçün
ekvivalent müdaxilə nöqtələri təqdim edir. Buna görə də testlər hər iki axını DB və ya
şəbəkə çıxışı olmadan sınaqdan keçirə bilər.

## Həmçinin baxın

- `src/lib/guardrails/` — reallaşdırma
- `src/shared/utils/inputSanitizer.ts` — prompt inyeksiyasını və PII maskalanmasını
  təmin edən ortaq detektor
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge standartları və
  məcburi körpü model siyahısı
- `src/shared/constants/modalityBridgeDefaults.ts` — ortaq Vision/Audio icra mühiti standartları
- `docs/architecture/RESILIENCE_GUIDE.md` — ortoqonal qat (dövrə kəsicisi, gözləmə müddətləri)
- `docs/reference/ENVIRONMENT.md` — mühit dəyişənlərinin tam arayışı

## İnyeksiya qoruyucusunun marşrut əhatəsi və red-team (Mərhələ 8 · Blok D)

İnyeksiya qoruyucusu (`createInjectionGuard` / `withInjectionGuard`) istifadəçi promptlarını
qəbul edən bütün marşrutları əhatə edir. O, `INJECTION_GUARD_MODE` parametrinə riayət edir
(standart `warn` = yalnız jurnala yazır; `block` = HTTP 400 `SECURITY_001` qaytarır).

| Növ           | Marşrutlar                                                                                                                                           | Standart rejim |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Mətn (mövcud) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn           |
| Generativ     | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn           |
| Məlumat       | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn           |

Mətnin çıxarılması (`extractMessageContents`) `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` sahələrini əhatə edir.

**Red-team (gecəlik, `nightly-llm-security.yml`):** promptfoo hər bir marşrutun
`INJECTION_GUARD_MODE=block` rejimində OWASP-LLM korpusunu blokladığını yoxlayır; garak
sınaqları işə salır (gizli açar olmadıqda ötürür). `moderations` ardıcıllıq naminə daxil
edilib — `block` rejimindəki operatorlar onu `resolveDisabledGuardrails` vasitəsilə istisna
edə bilərlər.

Gecəlik iş axınının (`.github/workflows/nightly-llm-security.yml`, cron + əl ilə
işə salma) iki tapşırığı var:

- **`promptfoo-guard` (bloklayıcı)** — `INJECTION_GUARD_MODE=block` ilə
  `promptfoo eval -c promptfooconfig.yaml` əmrini işlədir. Hər bir rəqib ssenari
  (məsələn, "əvvəlki bütün təlimatlara məhəl qoyma…", DAN üslublu jailbreak-lər)
  cavabın `error.code === "SECURITY_001"` daşıdığını, yəni qoruyucunun sorğunu
  həqiqətən rədd etdiyini təsdiqləyir.
- **`garak` (məşvərətçi)** — yerli OmniRoute instansiyasına
  (`http://localhost:20128/v1`) qarşı garak-ı `--probes promptinject,dan,leakreplay`
  ilə işə salır. Provayderin gizli açarından (`PROMPTFOO_PROVIDER_KEY`) asılıdır;
  açar olmadıqda problemsiz ötürülür və sonuna `|| true` əlavə edilib, buna görə
  CI prosesini uğursuz etmədən hesabat verir.

Qoruyucu köməkçi funksiyanın (`createInjectionGuard` / `withInjectionGuard`) əhatəsi
prompt daşıyan hər bir `/v1` marşrutunu əhatə edir; prompt mətni
`src/shared/utils/inputSanitizer.ts` daxilindəki `extractMessageContents()` tərəfindən
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` sahələrindən
götürülür.
