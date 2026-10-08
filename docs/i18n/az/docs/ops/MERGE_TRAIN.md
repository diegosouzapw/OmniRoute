# Merge Queue & Manual Merge-Train Runbook (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 versiyasından (keyfiyyət/sürət planının WS3.2/WS3.4 mərhələləri) etibarən nəzərdən
keçirilmiş PR-lərin `release/vX.Y.Z` budağına birləşdirilməsi üçün standart yol **Mergify
birləşdirmə növbəsidir** (`.mergify.yml`); aşağıda sənədləşdirilmiş **əl ilə idarə olunan
birləşdirmə qatarı** isə EHTİYAT VARİANTDIR — insidentlər, buraxılış dondurmaları zamanı
və ya Mergify Open Source planı nə vaxtsa dəyişərsə istifadə olunur.

## Standart yol: Mergify növbəsi

1. PR kampaniyalar tərəfindən nəzərdən keçirilir/yaşıl status alır və sahibin birlədirmədən
   əvvəlki ⭐ keçid yoxlaması ilə təsdiqlənir (hesabat + hər bənd üzrə qərar — `/merge-prs`
   Addım 0.75-ə baxın).
2. Sahib (və ya sahibin qərarı əsasında fəaliyyət göstərən sessiya) **`queue`**
   etiketini tətbiq edir. Etiket birləşdirmə təsdiqinin ÖZÜDÜR; Mergify onu yalnız icra edir.
3. Mergify növbədəki 10-a qədər PR-i paketləyir, paketi sürətli keçid yoxlamaları ilə
   təsdiqləyir və birləşdirir (squash). Qırmızı paket **avtomatik olaraq yarıya bölünür** —
   problemli PR təxminən log2(N) təkrar yoxlama ilə təcrid edilir və növbədən çıxarılır;
   qalanları isə davam edir.
4. Birləşdirmədən sonra davamlı release-green iş axını push zamanı yeni ucu yoxlayır
   və kombinasiya reqressiyaya səbəb olarsa, aidiyyət məsələsi açır (heç vaxt avtomatik geri qaytarmır).

Qoruyucu qaydalar (`CLAUDE.md` sərt qaydaları #21/#22 ilə eynidir):

- **Buraxılış dondurması aktivdir** → dondurulmuş budağı hədəfləyən PR-lərə etiket
  tətbiq ETMƏYİN; əvvəlcə hədəfi aktiv `release/vX+1` budağına dəyişin.
- **Başqa sessiyanın icrada olan PR-i** → onu heç vaxt etiketləməyin; yalnız sahib
  sessiya öz işini növbəyə əlavə edir.
- Yalnız testlərdən ibarət fərqlər və `hotfix` etiketli PR-lər artıq azaldılmış CI işlədir
  (`RELEASE_CHECKLIST.md` → Hotfix Fast-Lane bölməsinə baxın); növbə şərtləri faktiki
  icra edilmiş istənilən yoxlama dəstini qəbul edir (`#check-failure=0` + `#check-pending=0`).

## Ehtiyat variant: əl ilə idarə olunan birləşdirmə qatarı

Növbə əlçatan olmadıqda istifadə olunur. Bu, v3.8.47 dövründə bir gündə 33 PR-i
tamamlayan praktikanı rəsmiləşdirir:

1. **Paketi formalaşdırın** (nəzərdən keçirilmiş+təsdiqlənmiş təxminən 10–30 PR). `linked:`
   toqquşmalarını (eyni `tap.testFiles`, eyni CHANGELOG hissələri) yoxlayın və onları ardıcıl icra edin.
2. **BİR DƏFƏ yoxlayın**: buraxılış ucundan yaradılmış təcrid olunmuş iş ağacında bütün
   paket başlıqlarını lokal olaraq birləşdirin, sonra buraxılışa ekvivalent dəsti işə salın
   (`npm run check:release-green`, buraxılışdan əvvəl `--with-build` əlavə edin).
   `scripts/release/merge-train.sh <base> <PR#>…` 1–2-ci addımları avtomatlaşdırır (toqquşan
   PR-lər çıxarılır, qatar davam edir). Tam rejim `npm run test:unit` işlədir — iki ardıcıl
   4 nüvəli CI seqmentini deyil, sistemə uyğunlaşdırılmış icraçını (`--test-concurrency=20`);
   həmin seqmentlər əsas mərhələnin 16 nüvəli sistemin yalnız təxminən 25%-ni istifadə etməsinə
   səbəb olurdu (2026-07-18 tarixində düzəldilib). `--fast` (gündaxili meqa-qatarların
   boşaldılması, sahib tərəfindən 2026-07-18 tarixində təsdiqlənib) bütün statik keçid
   yoxlamalarını + vitest-i saxlayır, lakin yalnız qatara mindirilmiş PR-lər tərəfindən
   dəyişdirilən node:test fayllarını işlədir; TAM dəst yığılmış uc üzərində gündə ən azı
   bir dəfə işə salınmalıdır (`--fast` olmadan bir qatar).
3. **Yaşıl** → PR-ləri ardıcıllıqla birləşdirin (hər birindən əvvəl `state,headRefOid`
   sahələrini yenidən yoxlayın — başlığı dəyişmiş PR yenidən nəzərdən keçirməyə qaytarılır).
   Hər bir birləşdirmənin xalis fərqinin PR-in öz dəyişikliyi olduğunu sübut edin (avtomatik
   həll nəticəsində geri qaytarmalara yol verməyin: əhatə dairəsindən kənar silinmələr üçün
   `git diff --stat` nəticəsini yoxlayın).
4. **Qırmızı** → paketi bir-bir yenidən yoxlamaq əvəzinə yarılara bölün (hər yarını
   yoxlayın); problemli PR-i sübutlarla birlikdə nəzərdən keçirmə növbəsinə qaytarın.
5. **Heç vaxt**: dondurma zamanı dondurulmuş budağa birləşdirməyin; heç bir yerdə
   `git stash` istifadə etməyin; qırmızı nəticənin yox olacağı ümidi ilə CI-ni ümumi
   şəkildə təkrar işə salmayın (qayda: qırmızı nəticə məlumatdır).

## Səviyyələr (növbənin yalnız sürətli keçid yoxlamaları ilə niyə təhlükəsiz olması)

- **Hər PR üçün** (quality.yml sürətli keçid yoxlamaları): TIA-nın təsir etdiyi testlər +
  4 seqmentli tam unit testləri + vitest + lint dəsti + typecheck + sənədlərin/CHANGELOG-un bütövlüyü.
- **Hər paket/uc üçün** (davamlı release-green): buraxılış budağına hər push zamanı
  `--quick` SƏRT keçid yoxlamaları; gündə 3 dəfə tam `--with-build --full-ci` yoxlamaları.
- **Hər buraxılış üçün** (buraxılış PR-ində ci.yml): E2E ×9 daxil olmaqla tam matris,
  package-artifact + tarball boot-smoke, coverage/ratchets.

Heç nə əvvəlkindən daha az yoxlanmır — ağır yoxlama səthi sadəcə hər PR üçün deyil,
hər paket/uc üçün işləyir və O(N) gediş-gəlişlərini aradan qaldıran da məhz budur.
