# Guardrails (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

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

## Daxili Mühafizə Mexanizmləri

Reyestr idxal zamanı altı mühafizə mexanizmini prioritet ardıcıllıqla avtomatik yükləyir (bax: `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Ad                  | Mərhələ(lər)   | Fayl                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Aşağı prioritet nömrələri **əvvəlcə** işə düşür.

### Vision Bridge (`visionBridge.ts`) — Modallıq Körpüsü PR-1

**Qeyri-görmə modellərinə** yönəlmiş şəkil daşıyan sorğuları ələ keçirir və ya bütün sorğunu görmə qabiliyyətli bir modelə yönləndirir, ya da yuxarı axın zəngindən əvvəl şəkil hissələrini konfiqurasiya edilə bilən görmə modeli tərəfindən istehsal olunan mətn təsvirləri ilə əvəz edir. Bu, yalnız mətn təminatçılarına multimodal yükləri şəffaf şəkildə idarə etməyə imkan verir.

Axın:

1.  Hədəf model artıq görmə qabiliyyətini dəstəkləyirsə (məcburi körpü siyahısında `isVisionBridgeForcedModel` görünmürsə) atlayın.
2.  `extractImageParts(messages)` (`visionBridgeHelpers.ts`) vasitəsilə şəkil hissələrini çıxarın, bu da `open-sse/utils/mediaParts.ts` faylındakı **vahid media detektoruna** `detectMediaParts()` həvalə edilir — bu, kombinasiya uyğunluğu filtri ilə paylaşılan yeganə həqiqət mənbəyidir. Çıxarış, `replaceImageParts` tərəfindən geri birləşdirilə bilən formaların yuxarı səviyyəli hissələrinə (çıxarış↔əvəzetmə müqaviləsi) icazə verilir: OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` və Responses API `input_image`. Daxili hitlər və yalnız göstərici formaları kombinasiya-filtr materialıdır və heç vaxt çıxarılmır. Heç biri tapılmazsa atlayın.
3.  `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`) vasitəsilə işləmə vaxtı konfiqurasiyasını həll edin: yeni `modalityBridge*` tənzimləmə açarları üstünlük təşkil edir; köhnə `visionBridge*` açarları **bir dövrəlik ehtiyat** (geri qaytarma pəncərəsi) olaraq qalır. Körpü deaktiv edildikdə hər hansı media keçidindən əvvəl atlayın.
4.  Rejim seçicisi (`modalityBridgeVisionMode`, aşağıdakı cədvələ baxın) yönləndirmə və ya təsvir etməyə qərar verir. Yönləndirmə, yalnız `model` dəyişdirilmiş `modifiedPayload` ilə yanaşı, meta `{ rerouted, fromModel, toModel, imagesKept }` qaytarır.
5.  Təsvir yolu: şəkilləri `maxImages` ilə məhdudlaşdırın, tapşırığa uyğun sorğunu tərtib edin, təsvir keşinə müraciət edin, görmə modelini **paralel olaraq** (`Promise.allSettled`) çağırın və `[Image N]: <description>` mətn hissələrini onların yerinə daxil edin. Uğursuz təsvir `null` qaytarır və orijinal şəkil hissəsi **qorunur** (#4012) — yalnız kombinasiya təsvir yolunda hər bir təsvir uğursuz olduqda, təsdiqlənmiş qeyri-görmə yuxarı axını əvəzinə `(əlçatmaz — görmə qabiliyyətli təminatçı qoşulmayıb)` stub alır (#8430).
6.  `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`) qaytarın.

#### Rejim seçicisi (`modalityBridgeVisionMode`)

| Rejim      | Varsayılan | Davranış                                                                                                                                                                                                                                                                                           |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔          | Köhnə heuristika, toxunulmamış (#6640/#7204): orijinal modeldə artıq istifadə edilə bilən etimadnamələr yoxdursa (o zaman təsvir edin) qeyri-kombinasiya/`auto/` modelləri ən yaxşı görmə modelinə yönləndirilir; kombinasiya hədəfləri həmişə təsvir edilir.                                      |
| `describe` |            | Həmişə təsvir edin — yönləndirmə bloku tamamilə atlanır; istifadəçinin seçdiyi model həmişə cavab verir.                                                                                                                                                                                           |
| `reroute`  |            | Məcburi yönləndirmə: etimadnaməli modeli saxlamaq mühafizəsi yan keçilir. Yönləndirmə-**hədəf** etimadnamə mühafizəsi hələ də tətbiq olunur — istifadə edilə bilən görmə hədəfi olmadıqda, sorğu təsvir etməyə keçir ki, xam şəkillər heç vaxt yalnız mətnlə işləyən arxa tərəfə çatmasın (#8430). |

Məcburi rejimlər avtomatik heuristika işə düşməzdən **əvvəl** qısaqapanma edir; `auto` davranışı PR-1-dən əvvəlki mühafizə mexanizmi ilə bayt-identikdir.

#### Tapşırığa uyğun təsvir sorğusu (`modalityBridgeVisionTaskAware`)

Varsayılan **doğru**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) **son istifadəçi mesajının** mətnini (500 simvola qədər qısaldılmış) əsas təsvir sorğusuna əlavə edir, təsviri istifadəçinin əslində nə soruşduğuna (codex-vision-proxy nümunəsi) yönəldir və görmə modelindən görünən mətni transkripsiya etməsini xahiş edir. Bayraq söndürüldükdə — və ya istifadəçi mətni olmadıqda — əsas sorğu dəyişdirilmədən istifadə olunur.

Özünü təsvir edən öz-özünə dövrənin OpenAI-uyğun sorğusu (`callVisionModelSingle()`
`visionBridgeHelpers.ts` faylında) həmişə `image_url.detail: "high"` tələb edir —
şərtsiz olaraq, hər bir zəng edən/provayder üçün, heç bir müştəri siqnalı ilə məhdudlaşdırılmadan.
Aşağı detallı nümunələşdirmə, bu sorğunun tələb etdiyi mətn-transkripsiya
tapşırığı üçün OCR dəqiqliyini azaldır, buna görə də təsvir zənginin özü həmişə
orijinal daxil olan sorğunun hansı detal səviyyəsindən istifadə etməsindən asılı olmayaraq yüksək
detal tələb edir. Bu, yalnız daxili təsvir sorğusunun gövdəsinə təsir edir;
OmniRoute-un zəng edənin öz `image_url.detail` dəyərini əsas sorğuya necə
ötürdüyünü dəyişdirmir — bu defolt ayrıca tətbiq olunur və yalnız aşkar edilmiş
OpenCode müştəriləri üçün `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`)
faylında. Təsvir öz-özünə dövrəsinin Anthropic wire-format budağında `detail` sahəsi
yoxdur və heç bir defoltdan təsirlənmir.

#### Təsvir çıxış limiti (`modalityBridgeVisionMaxChars`)

| Açar                           | Defolt | Aralıq              |
| ------------------------------ | ------ | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` və ya 100–50000 |

`0` (defolt) **limit yoxdur** deməkdir — `callVisionModel()` tərəfindən qaytarılan
təsvir dəyişdirilmədən ötürülür, mövcud davranışı qoruyur. 100–50000 aralığındakı
istənilən dəyər təsviri `…` şəkilçisi ilə kəsir, sonra o, `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` `src/lib/guardrails/visionBridge.ts` faylında)
kimi yenidən birləşdirilir. Aşağı axın modelinin tam transkripsiyaya ehtiyacı olduğu
detallı OCR tapşırıqları üçün bunu artırın; danışqan görmə modellərində token
istifadəsini məhdudlaşdırmaq üçün azaldın.
İdarəetmə panelindəki sahə Vision tabının Advanced panelində yerləşir
(`modality-bridge-max-chars` `ModalityBridgeVisionTab.tsx` faylında) və 1 ilə 99
arasındakı istənilən dəyəri 100-ə qədər yuvarlayır, eyni zamanda açıq `0` dəyərini
toxunulmaz saxlayır — `0` özlüyündə etibarlı bir Zod dəyəridir
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), sadəcə "təyin
edilməmiş" defolt deyil.

#### Təsvir keş (`modalityBridge/bridgeCache.ts`)

Təsvir çıxışları üçün yaddaşda LRU + TTL keş, proses boyu paylaşılır.
Açar = `sha256(imageRef + composedPrompt + configuredBridgeModel)` uzunluq-prefiks
çərçivəsi ilə (sahə-sərhəd toqquşmaları yoxdur). Model komponenti **konfiqurasiya
edilmiş** körpü modelidir, əslində cavab verən model deyil — `callVisionModel`
daxili olaraq geri qayıda bilər və hər cəhd üçün açar təyin etmək keşi parçalayacaq.
Uğursuz təsvirlər heç vaxt keşlənmir. Parametrlər:

| Açar                            | Defolt | Aralıq  |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Uzaqdan şəkil normallaşdırılması (öz-özünə dövrə təsviri/base64 gətirmə)

Körpü **uzaqdan** şəkli özü gətirdikdə — Anthropic təsvir öz-zəngi və claude-wire-format
base64 çevrilməsi (`ensureBase64ImagesForClaudeWire`), hər ikisi
`visionBridgeHelpers.ts` faylında `fetchRemoteImageAsDataUri()` vasitəsilə — nəticədə
yaranan data URI, görmə-model sorğusuna daxil edilməzdən əvvəl `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) vasitəsilə keçirilir. Həddindən artıq böyük
şəkillər **2048px uzun kənar** ölçüsünə qədər kiçildilir (OpenAI/Anthropic-in artıq
server tərəfində tətbiq etdiyi ölçü dəyişdirmə limiti ilə uyğun gəlir), bu da görmə
modelinin gördüyünü dəyişdirmədən yükləmə baytlarını/gecikməni azaldır. Ölçü
dəyişdirmə `sharp` istifadə edir, dinamik import vasitəsilə yüklənir: yerli ikili
faylının yüklənməsi uğursuz olan bir platformada, `normalizeDataUri()` **heç vaxt
səhv atmır** — o, orijinal baytların ötürülməsinə qayıdır, beləliklə təsvir/base64-çevrilmə
yolu həmişə işləməyə davam edir. Şəkil olmayan baytlar (deşifr edilə bilən şəkil
qaytarılmayan bir gətirmə) də toxunulmadan ötürülür. Bu normallaşdırma körpünün
öz-zəngi üçün gətirdiyi şəkillərə şamil edilir — o, heç vaxt zəng edənin xam ötürmə
yükünə tətbiq edilmir, bu da yalnız seçmə-aktivləşdirmə mutasiya prinsipinə
(Sərt Qayda #20) uyğundur.

#### Parametrlər sxemi + miqrasiya

Yeni `modalityBridge*` açarları `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`) faylında Zod-təsdiqlənir:
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, `modalityBridgeCache*` üçlüyü və Audio Körpü
tərəfindən istifadə olunan `modalityBridgeAudio*` qrupu. Miqrasiya
`141_modality_bridge_settings.sql` mövcud köhnə `visionBridge*` dəyərlərini
uyğun yeni açarlara kopyalayır (idempotentdir, heç vaxt operator tərəfindən təyin
edilmiş `modalityBridge*` dəyərini yazmır); köhnə açarlar bir buraxılış dövrü
üçün oxuma geri dönüşü kimi qəbul edilməyə davam edir.

#### Şəffaflıq başlığı + statistikalar

Təsvir-çevrilmiş cavablar
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
( `modalityBridge/bridgeStats.ts` faylında `buildModalityBridgeHeader()` tərəfindən
yaradılır, `src/sse/handlers/chatHelpers.ts` faylında `withModalityBridgeHeader()`
tərəfindən möhürlənir) başlığını daşıyır. Yenidən yönləndirilmiş sorğulara **heç bir**
başlıq verilmir — yük toxunulmaz qalıb və model dəyişikliyi cavab gövdəsinin
`model` sahəsində artıq görünür.

`GET /api/modality-bridge/stats` (idarəetmə autentifikasiyası, `GET /api/settings`
ilə eyni səviyyə) `vision`, `audio` və `video` üçün yaddaşda olan hər-modalite
sayğaclarını `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` qaytarır. `averageLatencyMs`
məxrəc kimi bütün cəhdləri deyil, `latencySamples` istifadə edir; vaxtı olmayan
bir əməliyyat sıfır-milisaniyəlik nümunə yaratmır. `bridged` uğurlu çevrilmələr
üçün geriyə uyğun ləqəb olaraq qalır; uğursuz cəhdlər onu artırmır.
Sayğaclar dizaynla prosesin yenidən başlaması zamanı sıfırlanır
(telemetriya, mühasibat deyil).

#### İdarəetmə paneli konfiqurasiyası

Xüsusi idarəetmə paneli səhifəsi
`/dashboard/settings/modality-bridge` ünvanındadır. Onun URL-ünvanlana bilən `Vision`, `Audio`
və `Video` tabları `tab` dəyərini dəyişdirərkən sorğu parametrlərini saxlayır.
Vision tabı aktivləşdirməni, rejimi, model seçimini (avtomatik defolt daxil olmaqla),
tapşırığa uyğun sorğuları, qabaqcıl vaxt aşımı/şəkil/təsvir uzunluğu/keş
limitlərini, iş vaxtı sayğaclarını və qorunan nümunə sorğusunu təqdim edir.
Audio tabı da aktivdir: o, aktivləşdirməni, Auto ilə yalnız STT model seçicisini,
vaxt aşımı/maksimum klip limitlərini, audio sayğaclarını və `input_audio` nümunə testini təqdim edir.
Video tabı funksionaldır: o, FFmpeg/ffprobe iş vaxtı vəziyyətini bildirir — dörd açıq UI vəziyyətindən biri
(sorğu davam edərkən və ya tamamlanmadıqda `unknown`, sorğu müştəri tərəfindən atlandığı
qeyri-loopback idarəetmə paneli hostunda `restricted`, bir dəfə sorğu edildikdən və
mövcud olmadığı təsdiqləndikdən sonra `unavailable`, və ya FFmpeg/ffprobe versiyaları ilə `available`) —
aktivləşdirmə/model/kadr/video/vaxt aşımı limitlərini saxlayır, model seçicisini
görmə qabiliyyətli modellərə filtrləyir və video sayğaclarını təqdim edir.

AI parametrləri altında əvvəlki Vision Bridge kartı yeni səhifəyə uyğunluq linkidir;
o, artıq formanın ikinci nüsxəsinə sahib deyil. Media Provayderləri də
Şəkildən Mətnə və Nitqdən Mətnə iş axınlarını mövcud Nitqdən Mətnə oyun meydançasını
silmədən müvafiq Modality Bridge tablarına bağlayır.

**Öz-dövrə qəbulunun yan keçməsi:** təsvir çağırışı OmniRoute-un
öz `/v1` öz-dövrəsi (qeyri-standart provayder modeli) vasitəsilə yönləndirildikdə,
alt-sorğu `x-omniroute-admission-bypass: internal` göndərir və həll edilmiş
öz-dövrə etimadnaməsi ilə autentifikasiya olunur — yerli rejimdə yerli `sk_omniroute` sentinel,
və ya operator tərəfindən konfiqurasiya edilmiş `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env açarı (#1350)
belə ki, `REQUIRE_API_KEY=true` tətbiqləri hələ də təsvir çağırışını işlədə bilsin.
Yan keçmə yalnız bu dəqiq etimadnamələr üçün qəbul edilir, buna görə xarici müştərilər
başlığı qəbulu atlamaq üçün istifadə edə bilməzlər.

Köhnə defoltlar `src/shared/constants/visionBridgeDefaults.ts` faylında yerləşir;
yeni rejim/tapşırığa uyğun/keş defoltları və parametrlər həll edicisi
`src/shared/constants/modalityBridgeDefaults.ts` faylında yerləşir.
Qoruyucu `deps` konstruktor seçimini təqdim edir ki, testlər saxta `getSettings`
və `callVisionModel` tətbiqlərini daxil edə bilsin.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Audio daşıyan çat sorğularını audio girişini qəbul etdiyi bilinməyən bir hədəfə çatmadan əvvəl ələ keçirir.
O, heç vaxt çat sorğusunu yenidən yönləndirmir: audio hissələr mövcud OpenAI-uyğun
çoxhissəli son nöqtə vasitəsilə transkripsiya edilir və seçilmiş çat modeli mətn transkriptləri ilə davam edir.

Axın:

1. `getResolvedModelCapabilities()` vasitəsilə `supportsAudio` həll edin. Açıq
   provayder-qeydiyyatı metadataları üstünlük təşkil edir, sonra statik model metadataları,
   sonra sinxronlaşdırılmış `modalities_input`. `audio` olmayan elan edilmiş giriş siyahısı `false`dir;
   heç bir qabiliyyət sübutu `null` qalır. Həm `false`, həm də `null` mühafizəkar körpünü aktivləşdirir,
   `true` isə onu yan keçir.
2. `modalityBridgeAudio*` parametrlərini həll edin və hər mesajdan paylaşılan
   `detectMediaParts()` detektoru vasitəsilə birləşdirilə bilən üst səviyyəli
   audio hissələrini çıxarın. Dəstəklənən tel formaları OpenAI `input_audio`, `audio_url`
   və `source.media_type: "audio/*"`dir. Daxili audio yönləndirmə üçün aşkar edilir,
   lakin birləşdirmə yolu ilə silinmir. İş `modalityBridgeAudioMaxClips` ilə məhdudlaşdırılır;
   sonrakı hissələr toxunulmaz qalır.
3. Konfiqurasiya edilmiş `provider/model`ə riayət edin, və ya `selectAudioBridgeModel()`-in
   `AUDIO_TRANSCRIPTION_PROVIDERS` üzərində sabit kataloq sırası ilə gəzməsinə və
   istifadə edilə bilən aktiv provayder etimadnaməsi olan ilk modeli seçməsinə icazə verin.
4. `callAudioTranscription()` base64/data-URI audiosunu çoxhissəli `file`a çevirir,
   və ya uzaq `audio_url`u DNS pinləməsi və 25 MB limiti ilə yalnız ictimai
   çıxış qoruyucusu vasitəsilə yükləyir. Sonra faylı və seçilmiş modeli
   yerli `/v1/audio/transcriptions` öz-dövrəsinə POST edir, `resolveSelfLoopBearer()`
   ilə autentifikasiya olunur. Mövcud transkripsiya marşrutu normal etimadnamə axtarışı,
   soyuqlama/sürət limiti idarəetməsi və provayder göndərişi həyata keçirir.
5. Uğurlu çağırışlar hissələrini `[Audio N]: <transcript>` ilə əvəz edir. Çağırışlar
   `Promise.allSettled` ilə işləyir: fərdi uğursuzluq orijinal audio hissəsini saxlayır
   (#4012 müqaviləsi). Əgər hər çağırış uğursuz olarsa və hədəfin `supportsAudio === false`
   olduğu sübut edilərsə, hissələr `[Audio N]: (unavailable — no STT provider connected)`
   olur (#8430 müqaviləsi). Naməlum hədəf (`null`) üçün, tam uğursuzluq nəticəsi toxunulmaz qalır.
   İstifadə edilə bilən STT etimadnaməsi olmayan sübut edilmiş yalnız mətn hədəfi
   şəbəkə çağırışı etmədən eyni açıq stubu alır.

Uğurlu transkriptlər proses-geniş Modality Bridge LRU/TTL keşini istifadə edir.
Açar audio istinadını, sabit `audio-transcription` əməliyyat etiketini və
seçilmiş STT modelini birləşdirir; uğursuzluqlar heç vaxt keşlənmir. Audio cəhdləri
paylaşılan `bridged`, `cacheHits`, `failures` və `lastUsedAt` sayğaclarını yeniləyir.
Dönüşdürülmüş cavablar `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`
daşıyır; toxunulmamış sorğular Audio Bridge seqmenti almır.

İş vaxtı parametrləri DB-də saxlanılır və Zod-təsdiqlənir:

| Açar                          | Defolt  | Aralıq            |
| ----------------------------- | ------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                 |
| `modalityBridgeAudioModel`    | `""`    | Avto və ya STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10              |

Paylaşılan keş `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`
və `modalityBridgeCacheMaxEntries` tərəfindən idarə olunur.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Chat Completions `messages` və Responses API `input` daxilində ən yüksək səviyyəli video hissələrini, məlum yerli video dəstəyi olmayan hədəf çağırılmazdan əvvəl ələ keçirir.
Dəstəklənən formalar `input_video`, `video_url`, `video_source`, HTTPS URL-ləri və `data:video/*;base64,...` data URI-ləridir. Mətndəki adi fayl adları video kimi qəbul edilmir.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) sorğu keçidini, imkan/siyasət yoxlamasını, sorğu başına aqreqasiyanı və cavab yükünü idarə edir.
Video başına iş — əldə etmə, tam nəticə keşləməsi, kadr ardıcıllığının təsviri (hansı ki, zəng edən tərəfindən elan edilmiş audio transkripti birləşdirir) və cəhd başına metrikalar/abort/təmizləmə — `preCall` dövrü daxilində hər video hissəsi üçün bir dəfə çağırılan `videoBridgePipeline.ts` faylındakı `processVideoPart` arxasında gizlədilib.
Bu modul həmçinin açıq port sərhədlərini `VideoMediaBrokerPort` (baytları əldə etmək və nümunə kadrları çıxarmaq), `VideoAudioTranscriptionPort` (zəng edən tərəfindən elan edilmiş audio transkripti nümunələşdirilmiş başlıqlarla birləşdirmək) və `VideoDrilldownPort` (kadrın detallı təhlili üçün davamlılıq sərhədi; hələ `processVideoPart` ilə əlaqələndirilməyib — bu gün yalnız ayrı `/api/modality-bridge/video/drilldown` marşrutu detallı təhlil qeydlərini yazır) müəyyən edir.

İctimai `/v1` sorğu yolu heç vaxt alt prosesi idxal etmir və ya çağırmır. Uzaq videolar 50 MiB həddində yüklənir; daxili base64 videoları üçün hər video üçün 36 MiB deşifrə edilmiş konservativ hədd tətbiq olunur ki, model/mesajlar/çərçivə zərfi ictimai JSON sorğu qəbul həddi olan 50 MiB daxilində qalsın. Daxili uzunluq və deşifrə edilmiş ölçü təxminləri ayırmadan əvvəl yoxlanılır. Başlanğıc uzaq URL-də və hər bir yönləndirmədə HTTPS tələb olunur, mövcud yalnız ictimai çıxış qoruyucusu DNS pinləməsi ilə istifadə olunur. Baytlar daha sonra dəqiq daxili `POST /api/modality-bridge/video/extract` broker sərhədini keçir. Bu marşrut həm `LOCAL_ONLY`, həm də `SPAWN_CAPABLE`dir, yalnız proses başına autentifikasiya edilmiş, etibarlı geri döngə sorğusunu qəbul edir və heç vaxt URL, fayl sistemi yolu, icra edilə bilən fayl və ya arqument siyahısını qəbul etmir. API gövdə ölçüsü boru kəməri və işləyicinin artan gövdə oxuyucusu müstəqil olaraq 50 MiB broker giriş həddini tətbiq edir. Onun məhdud növbəsi bir çıxarışı bir anda işlədir, dörd gözləyən işə icazə verir və gözləyən girişi 100 MiB ilə məhdudlaşdırır.

Broker daxilində `ffprobe` xüsusi yerli faylı oxuyur; sabit format icazə siyahısı pleylist və manifest formatlarını istisna edir. İcazə verilən MOV-ailə konteynerləri üçün xarici MOV məlumat istinadları standart olaraq deaktiv qalır və sabit əmr onlara qoşulmur. Həm `ffprobe`, həm də `ffmpeg` yalnız `file` protokolunun ağ siyahısından, bir iş parçacığından, sabit arqument massivlərindən, qabıqsız və `PATH`dən həll edilmiş icra edilə bilən fayllardan istifadə edir. Qoşulmuş şəkil örtük axınları oynatıla bilən namizədlər deyil. Bütün oynatıla bilən axınlar limitləri ödəməlidir və açıq bir standart axın, deterministik ən aşağı indeksli ehtiyatdan əvvəl üstünlük təşkil edir. Videolar 600 saniyə, hər ölçüdə 8,192 piksel və 33,554,432 mənbə pikseli ilə məhdudlaşdırılır. FFmpeg 1-16 orta nöqtə JPEG kadrlarını nümunələşdirir, uzun kənarı ən çox 1,024 pikselə qədər kiçildir, daha kiçik girişləri böyütmür və heç vaxt URL qəbul etmir. Nümunələşdirmə standart olaraq `uniform`dur. İsteğe bağlı `scene_aware` və eksperimental `segment_aware` siyasətləri artıq təsdiqlənmiş yerli axın üzərində bir əlavə sabit FFmpeg keçidi həyata keçirir, məhdud `showinfo` səhnə zaman möhürlərini seçir və detektorun uğursuzluğu, vaxt aşımı, səhv formatlı çıxış və ya boş namizəd dəsti halında eyni vahid orta nöqtələrə deterministik olaraq geri dönür. Seqment-şüurlu rejim orta nöqtə nümunələrini təsdiqlənmiş səhnə intervallarına mütənasib olaraq ayırır; seqment-şüurlu sübut və geri dönmə davranışı aşağıda ətraflı təsvir edilmişdir. Sərt 16 kadr həddi hər siyasətdə seçimdən sonra tətbiq olunur. Səhnə-şüurlu sorğunun yalnız bir kadr büdcəsi olduqda, aktiv tam video və ya fokus pəncərəsinin vahid orta nöqtəsini istifadə edir və `policyEffective: uniform` bildirir: tək seçilmiş səhnə kadrı hər iki zaman sonunu qoruya bilməz. Zəng edən tərəf isteğe bağlı olaraq sonlu fokus pəncərəsi (`start`/`end` saniyə) təmin edə bilər; sərhədlər media müddətinə sıxılır, tərs və ya sonlu olmayan pəncərələr rədd edilir və bütün nümunələşdirmə siyasətləri yalnız normallaşdırılmış interval daxilində həyata keçirilir. Nəticədə yaranan pəncərə nümunələşdirmə metadatalarına və etibarsız təsvir prefiksinə daxil edilir ki, aşağı axın modelləri fokuslanmış bir parçanı tam zaman xəttindən ayıra bilsin.

Semantik başlıq fokusu ayrı, açıq bir parametirdir. Standart `full` analiz rejimi mövcud kadr tələbini qoruyur və heç vaxt sorğu mətnini başlıq modelinə ötürmür. `focused` rejimində, körpü yalnız eyni Chat və ya Responses konteynerindən ən son boş olmayan istifadəçi tərəfindən yazılmış `text`/`input_text`i oxuyur, onu NFC-yə normallaşdırır, nəzarət simvollarını və boşluqları yığır və onu 500 Unicode kod nöqtəsi ilə məhdudlaşdırır. Boş nəticə dəqiq `full` tələbinə geri dönür. İstifadə edilə bilən bir ipucu xüsusi etibarsız-istifadəçi-kontekst blokunda JSON olaraq seriyalaşdırılır və yalnız müşahidə edilə bilən detalları prioritetləşdirə bilər; o, mediada görünən və ya eşidilən təlimatlara əməl etməmək barədə ayrı xəbərdarlığı ləğv edə bilməz. Mətn fokusu heç vaxt `start`/`end`i təxmin etmir və ya zaman nümunəçisini dəyişdirmir.

#### FU-07 struktur seqment sübutu

`segment_aware` artıq təsdiqlənmiş yerli video axını üzərində bir məhdud ön-analiz keçidindən istifadə edir. Sabit filtr zənciri əvvəlcə ən çox 320 piksel genişliyə qədər miqyaslayır, səhnə dəyişikliklərini və donmuş intervalları aşkar edir, sonra bulanıqlıq, orta luma və məkan/zaman məlumatları üçün saniyədə 1 kadrda nümunələşdirir. Keçid 600 struktur nümunə, bir FFmpeg/filtr iş parçacığı, eyni `file`-only protokol və konteyner icazə siyahıları, 1 MiB proses-çıxış həddi və brokerin paylaşılan abort/son müddəti daxilində ən çox 30 saniyə ilə məhdudlaşdırılır. O, heç vaxt sorğudan əmr, filtr, yol və ya URL qəbul etmir.

Struktur dəyərlər semantik video anlayışı deyil, deterministik nümunə götürmə sübutudur. Onlar subyektləri, hərəkətləri, başlıqları, nitqi və ya istifadəçi niyyətini nəzərdə tutmur. Səhnə və dondurma sərhədləri seqmentlər əmələ gətirir; dondurma əhatə dairəsi, bulanıqlıq, ekspozisiya, məkan detalı və zamansal dəyişiklik yalnız mövcud 1-16 kadr büdcəsinin necə ayrılmasına təsir edir. Tamamilə dondurulmuş seqment bir kadrla məhdudlaşır, dondurulmamış seqmentlər isə qalan büdcə uğrunda rəqabət aparır. Sərhədlər kadrlardan çox olduqda, vahid zaman xətti əhatə dairəsi qorunur ki, sürətli erkən kəsimlər uzun bir quyruq seqmentini gizlədə bilməsin. Dondurma sərhədinin 1 saniyəlik analiz həlli daxilindəki səhnə sərhədləri birləşdirilir.

Çatışmayan filtrlər, səhv formalaşmış/boş sübutlar, detektor xətası və ya məhdudlaşdırılmış ilkin analiz vaxt aşımı dəqiq vahid orta nöqtə siyasətinə açıq şəkildə uğursuz olur. Zəng edənin ləğvi və ya brokerin son müddəti açıq şəkildə uğursuz olmur: o, davam edən alt prosesi dayandırır, sonrakı kadr çıxarılmasının qarşısını alır və şəxsi müvəqqəti ağac `finally` blokunda silinir.

`scripts/perf/video-bridge-fu07-eval.ts` dedup sonrası başlıq-zəng qənaəti, sıx hərəkət büdcəsinin ayrılması, bulanıqlıq/ekspozisiya/SI-TI sübutları, uzun quyruqlu sürətli kəsimlər və tədricən solan yalan müsbətlər üçün deterministik real FFmpeg fiksatorları yaradır. O, ilkin analiz divar vaxtını və, `/usr/bin/time` mövcud olduqda, uşaq CPU və pik RSS-i qeyd edir. Onun keyfiyyət yoxlamaları yalnız struktur orakullardır. Real başlıq-model keyfiyyəti `HOLD` olaraq qalır, çünki bu qurğunun səlahiyyətli son nöqtəsi və ya dondurulmuş hakimi yoxdur. Pul qənaəti də `HOLD` olaraq qalır, əgər `--caption-cost-per-call-usd` açıq müsbət zəng başına təxmini təmin etmirsə; skript heç vaxt hər iki nəticəni uydurmur.

Hər bir kadr 4 MiB, bütün xam kadrlar birlikdə 23 MiB, seriyalaşdırılmış broker cavabı isə 32 MiB ilə məhdudlaşır. Şəxsi müvəqqəti qovluq `finally` blokunda silinir. OmniRoute FFmpeg-i birləşdirmir və xüsusi icra edilə bilən yol qəbul etmir. Başlıq əlavə etməzdən əvvəl, körpü mühafizəkar vizual deduplikasiya keçidini tətbiq edir: hər bir JPEG 16×16 boz rəngli buferə endirilir və yalnız saxlanılan son kadrla müqayisə edilir. Tələb olunan başlıq büdcəsi bir kadrın üzərində olduqda, çıxarış bu büdcənin iki qatına qədər və heç vaxt 16 kadrı keçməyən məhdud namizəd hovuzu təmin edir. Tələb olunan limit yalnız deduplikasiyadan sonra tətbiq edilir, büdcə ən azı iki olduqda son nazikləşdirmə zamanı ilk və son seçilmiş namizədlər qorunur. Versiyalı `grayscale-16x16-mean-cells-v2` siyasəti orta luma deltasının və normallaşdırılmış deltasının ən azı 0.05 olduğu kiçik şəkil hüceyrələrinin nisbətinin böyüyünü istifadə edir. Dublikat həddi, işləmə zamanı tənzimləmə kimi ifşa edilməkdənsə, proqnozlaşdırıla bilməsi üçün seçilmiş sabit 0.04-dür. Bu ikinci yüksək kontrastlı siqnal, yalnız orta müqayisənin gizlədə biləcəyi kiçik hərəkəti və görünən mətn dəyişikliklərini qoruyur. Müqayisəçi və ya dekoder xətaları açıq şəkildə uğursuz olur və əhatə dairəsini saxlayır. Çıxış metadataları çıxarılmış namizədləri, uğurla istifadə edilmiş kadrları və atılmış vizual dublikatları ayırır.

Açıq şəkildə qeyd olunmuş video hissəsi zaman möhürlü kontakt vərəqi tələb edə bilər. Körpü ən çox 4 sütunlu, 16 kadrlı JPEG şəbəkəsi qurur. Hər 512 piksel hüceyrə mənbə zaman möhürünü yüksək kontrastlı alt zolağa yazır, eyni zaman möhürləri isə sonrakı əlaqələndirmə və audit üçün mətn metadatalarında qalır. Tam JPEG 32 MiB ilə məhdudlaşır. Əgər `sharp` şəbəkəni deşifrə edə və ya tərtib edə bilmirsə, körpü fərdi JPEG kadrlarına qayıdır; müştəri ləğvi vərəq əməliyyatı vasitəsilə hələ də yayılır.

Təşviq sübutları sintetik kompozisiya mikrobenchmarkından qəsdən ayrıdır. `scripts/perf/video-bridge-contact-sheet-eval.ts` real OpenAI-uyğun görmə modelləri üçün sxem-versiyalı A/B qurğusu müəyyən edir. O, provayder tərəfindən bildirilən tokenləri, ucdan-uca divar gecikməsini (vərəq kompozisiyası daxil olmaqla), model-zəng sayını və manifestdə müəyyən edilmiş fakt saxlanmasını ölçür. Xam model cavabları hesabatda yazılmır; yalnız SHA-256 həşləri və uyğun fakt ID-ləri saxlanılır. Qurğu, `--execute-real` keçirilmədikcə və `--model`, `OMNIROUTE_BASE_URL` və `OMNIROUTE_API_KEY` konfiqurasiya edilmədikcə heç bir şəbəkə və ya ödənişli model zəngi etmir. Bu açıq real işləmə olmadan, onun maşın tərəfindən oxuna bilən qərarı `HOLD` olaraq qalır; sintetik yükləmə/zəng-sayı ölçmələri təkbaşına təşviq sübutu deyil.

Zəng edənlər artıq uyğunlaşdırılmış mətnə malik olduqda, dəstəklənən video hissəsinə isteğe bağlı `transcript.cues` massivi əlavə edə bilərlər. Hər bir işarə `text`, yoxlanılmış müddət daxilində sonlu `start`/`end` intervalı və ağ siyahıya salınmış `source` (`client`, `embedded` və ya `audio-bridge`) daşımalıdır; `confidence` defolt olaraq `1`-dir və `0` ilə `1` arasında qalmalıdır. Dəqiq dublikat işarələr birləşdirilir. OmniRoute heç vaxt bu metadatalardan transkripsiya başlatmır: təsdiqlənmiş işarələr mənbə, etibarlılıq və interval ilə təsvir edilmiş nəticəyə kopyalanır və kadr başlıqları ilə yanaşı etibarsız müşahidələr kimi göstərilir. Yanlış, diapazondan kənar və ya mənşəyi olmayan mətn başlıq axınına qarışdırılmaqdansa rədd edilir. `source` sahəsi hazırda zəng edən tərəfindən elan edilir, server tərəfindən yoxlanılmır: OmniRoute dəyərin üç icazə verilən sətirdən biri olmasını təmin edir, lakin `embedded` və ya `audio-bridge` etiketinin həqiqətən serverə məxsus çıxarışdan gəldiyini hələ kriptoqrafik olaraq təsdiqləmir. Bu yoxlama həyata keçirilənə qədər `source` sahəsini etibarsız bir ipucu kimi qəbul edin; onun üzərində icazə qərarları qurmayın.

Qabaqcıl zəng edən eyni video üçün artıq icazə verilmiş `audioTranscript` treki təqdim edə bilər. Füzyon tikişi vizual və audio müşahidələri bir son tarix və ləğv siqnalı altında işlədir, onları ümumi bir zaman qrafikində sıralayır, dəqiq dublikatları birləşdirir və yalnız bir tərəf uğur qazandıqda qismən nəticə bildirir. Yanlış `audioTranscript` bütün videonun uğursuz olması əvəzinə, qismən nəticəyə çevrilir — vizual təsvir saxlanılır və audio qolu təmizlənmiş uğursuzluq kodunu qeyd edir. Hər qolun mövcudluğu, qismən bayraq və təmizlənmiş uğursuzluq kodları təsvir edilmiş nəticədə, qoruyucu metadata (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), nəticə-keş metadatasında və körpü füzyon sayğaclarında saxlanılır. Varsayılan Video Körpü yolu nitqdən mətnə çevirməni çağırmır və ya ikinci media nüsxəsini yükləmir; bu açıq trek olmadan, yalnız video olaraq qalır.

**Transkriptin saxlanması (#12150 P1).** Bu, Video Körpü (özü də seçməli) transkript işarəsini göstərdikdə avtomatik olaraq tətbiq olunur — ayrıca bir saxlama bayrağı yoxdur. Bir sorğu hər hansı bir transkript işarəsini (zəng edən tərəfindən elan edilmiş `transcript` və ya birləşdirilmiş `audioTranscript`) göstərdikdə, qoruyucu onu `videoBridgeObserved` olaraq qeyd edir və videonun təsvirinin redaktə edilmiş kölgəsini yaradır — hər bir işarənin sərbəst mətn hissəsinin `[redacted-video-transcript]` ilə əvəz olunduğu eyni bir göstərim, sətir yığılmadan əvvəl strukturlaşdırılmış işarə sahəsini əvəz etməklə qurulur (heç vaxt düzləşdirilmiş mətni təhlil etməklə deyil, buna görə heç bir işarə məzmunu — düşmənçilik və ya adi, o cümlədən `]` ehtiva edən hissələr, məsələn, `[inaudible]`/`[music]` — qala bilməz). Saxlanılan zəng-qeyd sorğu gövdəsi hər bir videodan törədilmiş mətn hissəsini məzmun bərabərliyinə uyğun olaraq bu redaktə edilmiş kölgə ilə dəyişdirir; `fullText` lövbəri bitmiş əvvəlki zəng qoruyucu yükündən yenidən oxunur, beləliklə, sonrakı zəncir qoruyucuları (PII və etimadnamə maskaları, prioritetlər 10/95) təsvir mətnini yerində yenidən yazdıqdan və sistem-təklif/ötürmə/yaddaş inyeksiyası mesaj massivini yenidən formalaşdırdıqdan sonra da uyğunluq uğurlu olur. Modelə yuxarıya göndərilən gövdə dəyişməz qalır. Müşahidə olunan sorğu həmçinin heç bir davamlı Yaddaş doldurmur (həm sorğu, həm də cavabdan törədilmiş çıxarış atlanır), beləliklə, modelin öz cavabı transkript mətnini Yaddaşa əks etdirə bilməz.

Əlavə saxlanılan nüsxələr eyni müşahidə olunan sorğu siqnalından istifadə edir. Qoruyucudan əvvəlki xam müştəri-sorğu anı, yaddaşda gözləyən sorğu və erkən rədd edilmiş sorğu qeydi video hissələrində transkript sahələrini struktur olaraq əvəz edir; boru kəməri mərhələləri tərəfindən sintez edilmiş sətir təklifləri və kontekst ötürmə saxlanılan sorğu-gövdə qəbuledicisində redaktə olunur. Saxlanılan `video_content_removed` işarəsi `previous_response_id` davamlılığını qəsdən atılmış mətni yenidən qurmaq əvəzinə bağlı şəkildə uğursuz edir. Əgər müşahidə olunan sorğu qeyd edilməzdən əvvəl hissə-hissə redaktə kölgəsini itirərsə, və ya sonrakı sorğu dəyişikliklərindən sonra bir neçə video kölgəsindən biri uyğun gəlməzsə, saxlanılan sorğu gövdəsi qismən redaktə edilmiş transkripti saxlamaq əvəzinə tamamilə atılır.

Müşahidə olunan sorğu üçün, model cavabı strukturlaşdırılmış işarə sərhədi olmadan transkriptin istənilən hissəsini sitat gətirə bilər. Onun saxlanılan zəng-qeyd `responseBody` buna görə də atılma işarəsi ilə əvəz olunur; ətraflı boru kəməri artefaktı (yuxarı/müştəri gövdələrini və axın hissələrini ehtiva edə bilər) saxlanılmır. Semantik, idempotensiya və əsaslandırma-təkrar keşləri bu sorğu üçün oxuma və yazmaları yan keçir. Təminatçı sorğusu və müştəri üçün görünən cavab dəyişməz qalır. Ətraflı artefakt atıldıqda müvəqqəti buferdən erkən canlılıq baytları boşaldılır. Kiro'nun səhv formalaşmış EventStream xəbərdarlığı yalnız yükün bayt sayını bildirir, heç vaxt onun məzmununu və ya JSON parserinin xam səhvini bildirmir.
Bu, hər bir əlaqəsiz təminatçı/plagin diaqnostikasının yoxlandığını iddia etmir; daha geniş saxlanılan-qəbuledici təmizlənməsi #11658-də izlənilir.

Daxili `/api/modality-bridge/video/drilldown` həyat dövrü ayrı, loopback/token-təsdiqlənmiş keş substratıdır. Hər bir əməliyyat həmçinin kanonik qeyri-şəffaf əsas ID tələb edir. İstehsal zəng edəni aktivləşdirilməzdən əvvəl, bu ID-ni təsdiqlənmiş kirayəçidən əldə etməli və heç vaxt müştəri tərəfindən seçilmiş dəyəri ötürməməlidir. Keş açarları bu əsası kanonik sessiya və video-istinad ID-lərinə bağlayır, yalnız onların SHA-256-dan törədilmiş açarlarını saxlayır və həm oxuma, həm də silməni eyni əsasa aid edir. Keş hər giriş üçün ən çox 16 törədilmiş JPEG kadrı saxlayır, onları on dəqiqədən sonra müddəti bitirir və məhdud `start`/`end` oxumalarını və ya açıq sessiya silinməsini dəstəkləyir.

Hər bir əsas 16 giriş və 64 MiB kanonik JPEG məlumatı ilə məhdudlaşır. Bu limitlər qlobal 64 giriş/256 MiB tavanından asılı deyil: əsas kvota təzyiqi qlobal LRU çıxarılması nəzərə alınmazdan əvvəl yalnız həmin əsasın ən az istifadə olunan girişlərini çıxarır. Müddəti bitmiş girişlər keş fəaliyyəti zamanı həm əsas, həm də qlobal uçotdan silinir, ləğv və təsdiqləmə uğursuzluğu isə qismən dəyişdirməni təsdiqləmir.

Keş qeyri-kanonik Base64-ü, artıq doldurmanı, qeyri-JPEG mediasını, səhv formalaşmış və ya kəsilmiş JPEG-ləri və məhdud tam-şəkil `sharp` deşifrə zamanı xəbərdarlıq yaradan JPEG-ləri rədd edir. Hər qəbul edilmiş şəkli kanonik JPEG olaraq yenidən kodlaşdırır, eni və hündürlüyü zəng edənin sahələrinə etibar etmək əvəzinə deşifrə edilmiş baytlardan əldə edir və onları saxlamaq əvəzinə hər hansı arxa poliqlot baytlarını atır. Yalnız məhdud kanonik sıxılmış bufer hər iki kvotaya daxil edilir. JSON naqil limiti 32 MiB deşifrə edilmiş giriş tavanı üçün Base64 əlavə xərclərini ehtiva edir. Hər bir saxlanılan törəmə təsdiqlənmiş JPEG formatını/çözünürlüyünü, nümunə götürmə siyasətini, törəmə versiyasını, yaradılma vaxtını, server tərəfindən hesablanmış məzmun heşini və heşlənmiş valideyn istinadını, üstəgəl etibarlı zəng edənin valideyn-məzmun heşini qeyd edir. Ləğv atomik keş təsdiqlənməsindən əvvəl asinxron deşifrə/heş fazaları arasında yoxlanılır.

Bu tranş hələ istehsalçı prodüseri marşruta bağlamır və çoxrezolusiyalı variant seçimi təmin etmir. Şəffaf Video Körpü sorğu yolu buna görə də əlavə iş tələb etmir, kirayəçiyə bağlı əsas törəmə və tam FU-08 çoxrezolusiyalı həyat dövrü isə tamamlanmış davranış kimi sənədləşdirilməkdənsə, açıq şəkildə davamlı iş olaraq qalır.

Kadrlar konfiqurasiya edilmiş Video modeli ilə ardıcıl olaraq başlıqlandırılır. Boş Video ləğvi Vision tənzimləməsini miras alır; hər ikisi boşdursa, Vision avtomatik marşrutlaşdırıcı effektiv görmə qabiliyyətli modeli seçir. Uğurlu başlıqlar orijinal hissəni etibarlı `[Video description:` prefiksi ilə əvəz edir ki, bu da mətni etibarsız media-törəmə müşahidə kimi qeyd edir və aşağı axın modellərinə mediada tapılan təlimatlara əməl etməmələrini bildirir. Kadr-başlıq keş açarları JPEG baytlarını, sorğunu, zaman möhürünü və effektiv modeli əhatə edir; yalnız uğurlu başlıqlar keşlənir. Keş girişləri faktiki uğurlu prodüser modelini, o cümlədən ehtiyat modeli saxlayır; körpü müxtəlif kadrlar müxtəlif modellər tərəfindən istehsal edildikdə `mixed` bildirir. Keş hit-i, tələb olunan marşrutlaşdırma planı kimi yenidən etiketləmək əvəzinə, həmin prodüser identifikasiyasını yenidən istifadə edir. Bütün video nəticə keş-i çıxışı dəyişdirən hər bir girişə əsaslanır — sorğu, effektiv model, nümunə götürmə siyasəti, kadr sayı, semantik analiz rejimi, normallaşdırılmış fokus ipucunun SHA-256 barmaq izi, fokus pəncərəsi, `transcript`, `audioTranscript` və kontakt-vərəq bayrağı — buna görə də bu ölçülərdən hər hansı birini dəyişdirmək keş miss-idir, heç vaxt köhnə yenidən istifadə deyil. Vizual dedup siyasətinin versiyası, həddi və məhdud namizəd-kadr sayı da nəticə-keş açarında və metadata-da açıq şəkildə göstərilir; buna görə də siyasət dəyişikliyi köhnə bütün-video təsvirini yenidən istifadə edə bilməz. Nəticə-keş v4 metadata rejimi və barmaq izini saxlayır, heç vaxt xam istifadəçi tapşırığını saxlamır. Qoruyucu metadata həm tələb olunan, həm də effektiv analiz rejimlərini bildirir; istifadə edilə bilən istifadəçi mətni olmayan tələb olunan `focused` rejimi effektiv olaraq `full` kimi bildirilir.

Qoruyucu hər dəstəklənən video hissəsini çıxarır, lakin `modalityBridgeVideoMaxVideos`-dan çoxunu təsvir etmir. `supportsVideo === false` olduğu sübut edilmiş bir hədəf üçün, uğursuz və həddən artıq videolar açıq təhlükəsiz mətn markerlərinə çevrilir ki, heç bir xam video qalmasın. Qabiliyyət naməlum olduqda, həmin hissələr toxunulmaz qalır. `supportsVideo === true` olan hədəflər körpünü keçir. Müştəri sorğusunun ləğv siqnalı yükləmə, broker növbəsi, alt proseslər və başlıq zəngləri vasitəsilə yayılır; ləğvlər videolar arasında dayanır və heç vaxt xam mediaya açıq şəkildə uğursuz olmur.

İş vaxtı tənzimləmələri DB-də saxlanılır və Zod tərəfindən təsdiqlənir:

| Açar                                | Defolt      | Aralıq / davranış                                                                                          |
| :---------------------------------- | :---------- | :--------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | İsteğe bağlı iş vaxtı, qoşulma                                                                             |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` ümumi başlıqları qoruyur; `focused` məhdud, etibarsız ən son istifadəçi kontekstindən istifadə edir |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge modelini miras alır                                                                          |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                       |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, və ya proporsional `segment_aware`; detektor uğursuzluğu `uniform`-a qayıdır     |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                        |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                             |

120 saniyədən yuxarı köhnə saxlanılan Video zaman aşımı dəyərləri broker son tarixinə uyğunlaşdırılır; bu həddən yuxarı yeni tənzimləmə yazışları rədd edilir. `GET /api/modality-bridge/video/runtime` autentifikasiya və ya iş vaxtı yoxlamasından əvvəl etibarlı möhürlənmiş loopback lokalizasiyasını, sonra isə idarəetmə autentifikasiyasını tələb edir. O, yalnız `available`, təmizlənmiş FFmpeg/ffprobe versiyalarını və iş vaxtı mövcud olmadıqda sabit bir səbəbi qaytarır. Daxili çıxarış son nöqtəsi ictimai yükləmə API-si deyil: növbə doyma `503` plus `Retry-After` qaytarır, zəng edənin əlaqəsinin kəsilməsi `499` qaytarır və sabit broker son tarixi `504` qaytarır. Çevrilmiş cavablar Vision və ya Audio seqmentlərini silmədən mərkəzi `x-omniroute-modality-bridge` başlığına `video->text;model=<visionModel>;parts=<videos>` əlavə edir.

### PII Masker (`piiMasker.ts`)

**Hər iki** mərhələdə işləyir.

- **`preCall`** yükü klonlayır, `system`, `messages`, `input` və `prompt` (o cümlədən sadə sətir elementləri) üzərində gəzir və sətir `content`/`text` sahələrinə `processPII()`-ni (`@/shared/utils/inputSanitizer`-dən) tətbiq edir. `PII_REDACTION_ENABLED=true` olduqda, aşkar edilmiş PII çıxan yükdə redaktə edilir. Bu, `INPUT_SANITIZER_MODE`-dan (yalnız prompt-injection siyasətini idarə edir) asılı deyil. Redaktə söndürüldükdə, zəng məzmunu yenidən yazmadan aşkarlama saylarını qeyd edir.
- **`postCall`** cavabı dərin klonlayır, `sanitizePIIResponse()` plus Responses-API-şəkil maskeri (`maskResponsesOutput` — `output_text` və `output[].content[].text`-i əhatə edir) işlədir. Hər hansı bir redaktə baş verərsə, dəyişdirilmiş cavab orijinalını əvəz edir.

Qoruyucu heç vaxt bloklamır; o, yalnız qeyd edir (`meta.detections`, `meta.redacted`) və ya yenidən yazır.

### Prompt Injection (`promptInjection.ts`)

İstifadəçi tərəfindən təqdim olunan məzmundakı düşmən strukturları aşkar edir və konfiqurasiya edilmiş siyasəti tətbiq edir. Davranış ətraf mühit dəyişənləri və konstruktor seçimləri ilə idarə olunur:

| Tənzimləmə | Ətraf mühit dəyişəni | Defolt | Təsir  
| Enabled | `INPUT_SANITIZER_ENABLED` | `true` | `false` olduqda, qoruyucu qısa qapanır. |
| Mode | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE` | `warn` | İnjeksiya siyasəti: `block`, `warn`, və ya `log`. (`redact` geriyə uyğunluq üçün qəbul edilir, lakin injeksiya mətnini **təmizləmir**; PII yenidən yazılması `PII_REDACTION_ENABLED` tərəfindən idarə olunur.) |
| Block threshold | `blockThreshold` seçimi / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Bloklamaq üçün tələb olunan minimum ciddilik. Defolt olaraq Medium yalnız müşahidə üçündür. |

**Rejim üstünlüyü** (`getMode`): zəng edən `options.mode` →
`INJECTION_GUARD_MODE` **DB xüsusiyyət-bayraq üstünlüyü** (İdarə Paneli → Tənzimləmələr →
Xüsusiyyət Bayraqları) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Buna görə də idarə paneli üstünlüyü env dəyişənlərini üstələyir, beləliklə Xüsusiyyət
Bayraqları UI canlı olaraq işləyən qoruyucunu idarə edir (yenidən başlatma yoxdur). DB oxunması
uğursuzluğa davamlıdır: əgər səhv verərsə, qoruyucu env-ə əsaslanan davranışa qayıdır
və heç bir üstünlük təyin edilmədikdə davranış yalnız env-ə əsaslanan həll ilə eynidir.

Aşkarlama mənbələri:

1. `@/shared/utils/inputSanitizer` -dən `sanitizeRequest()` (borudakı başqa yerlərdə istifadə olunan paylaşılan detektor
   dəsti).
2. Daxili `DEFAULT_GUARD_PATTERNS` (hal-hazırda `system_override_inline` və
   `markdown_system_block`, hər ikisi `high` ciddilikdə).
3. Konstruktor seçimləri vasitəsilə ötürülən isteğe bağlı `customPatterns` (sətirlər, regex,
   və ya `{ name, pattern, severity }` qeydləri).

`mode === "block"` **və** ən azı bir aşkarlama ciddilik həddini ödədikdə,
`preCall` `{ block: true, message: "Request rejected: suspicious content detected" }` qaytarır.
`warn`/`log` rejimlərində qoruyucu qeyd edir, lakin zəngə icazə verir. Paylaşılan köməkçi
`evaluatePromptInjection()` qeydiyyatdan keçmədən sorğuları qiymətləndirmək lazım olan zəng edənlər üçün də ixrac edilir.

**Skan həddi (v3.8.20):** detektor yalnız birləşdirilmiş sorğu mətninin **ilk 16 KB**-nı yoxlayır —
`src/shared/utils/inputSanitizer.ts` faylında `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bayt).
Həm `detectInjection()`, həm də `evaluatePromptInjection()` nümunə dövrünü işə salmadan əvvəl
`slice(0, MAX_INJECTION_SCAN_BYTES)` edir. İnjeksiya direktivləri girişin yuxarı hissəsində yerləşir,
beləliklə bu, aşkarlamayı zəiflətmədən yüz minlərlə KB-lıq yüklərdə regex CPU/GC-ni məhdudlaşdırır (bax.
#3932, #4041).

### Etimadnamə Maskalayıcı (`credentialMasker.ts`)

Hər **iki** mərhələdə işləyir, defolt zəncirdə sonuncudur (prioritet `95`). Giden yüklərdən (mesaj
məzmunu, alət-zəng arqumentləri, alət nəticələri) **və** provayder cavabından məlum API-açar / gizli-token
nümunələrini redaktə edir, beləliklə bir sorğuya yapışdırılmış (və ya alət nəticəsi ilə geri əks olunan)
etimadnamə yuxarı axın provayderinə və ya müştəriyə sızdırılmır.

- **Yalnız seçmə yolu ilə**, PII redaktə etmə ilə eyni konvensiya (Sərt Qayda #20-yə yaxın):
  `settings.credentialRedactionEnabled === true` **və ya** `CREDENTIAL_REDACTION_ENABLED=true`
  olmadığı müddətcə deaktivdir. Bu söndürüldükdə, qoruyucu heç bir əməliyyat yerinə yetirmir —
  heç vaxt bloklamır və heç vaxt yenidən yazmır.
- `redactCredentials()` tam yük/cavab ağacını (`walkValue()`, prototip-çirklənməyə davamlı,
  `WeakSet` vasitəsilə dövrə-davamlı) gəzir və uyğunluqları `[REDACTED:<type>]` yer tutucusu ilə əvəz edir,
  yalnız həqiqətən dəyişən budaqları klonlayır.
- `CREDENTIAL_PATTERNS` LLM provayder açarlarını (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face,
  Replicate), VCS/SaaS tokenlərini (GitHub, Slack, Linear, Notion, npm, Postman, Discord), ödəniş
  açarlarını (Stripe, Square), bulud açarlarını (AWS giriş açarı, Twilio, SendGrid, Mailgun), şəxsi
  açarları / JWT-ləri, etimadnamə daşıyan əlaqə sətirlərini (`mongodb://user:pass@...`, və s.) və
  ümumi `Authorization`/`x-api-key`/`api-key`/`apikey` başlıq-dəyər nümunəsini əhatə edir. Başlıq
  şəkilli açarlar (`authorization`, `x-api-key`, `api-key`, `apikey`) ümumi mətn regex vasitəsilə
  deyil, struktur olaraq (yalnız dəyər, `Bearer `/`Basic ` kimi sxem prefiksi saxlanılır) redaktə
  edilir.
- Qoruyucu heç vaxt bloklamır; yalnız yenidən yazır (`modifiedPayload` / `modifiedResponse`) və
  qeydlər əlavə edir (`meta.credentialsRedacted`, `meta.count`).

Reqressiya qoruyucusu: `tests/unit/credential-masker-guardrail.test.ts`.

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
