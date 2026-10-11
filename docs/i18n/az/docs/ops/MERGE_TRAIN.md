# Merge Queue & Manual Merge-Train Runbook (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 versiyasından (keyfiyyət/sürət planının WS3.2/WS3.4 mərhələlərindən) etibarən nəzərdən keçirilmiş PR-lərin `release/vX.Y.Z` budağına birləşdirilməsi üçün standart yol **Mergify birləşdirmə növbəsidir** (`.mergify.yml`);
aşağıda sənədləşdirilmiş **əl ilə birləşdirmə qatarı** isə EHTİYAT VARİANTIDIR — insidentlər, reliz dondurmaları zamanı və ya Mergify Open Source planı nə vaxtsa dəyişərsə istifadə olunur.

## Standart yol: Mergify növbəsi

1. PR kampaniyalar tərəfindən nəzərdən keçirilir/yoxlamalardan uğurla keçir və sahibin birləşdirmədən əvvəlki ⭐
   keçid mərhələsində təsdiqlənir (hesabat + hər element üzrə qərar — `/merge-prs` Addım 0.75-ə baxın).
2. Sahib (və ya sahibin qərarı əsasında fəaliyyət göstərən sessiya) **`queue`**
   etiketini tətbiq edir. Etiket birləşdirmə təsdiqinin ÖZÜDÜR; Mergify sadəcə onu icra edir.
3. Mergify növbədəki PR-ləri sürətli keçid yoxlamalarına qarşı **ardıcıl**
   (bir dəfəyə birini) yoxlayır və birləşdirir (squash). Paketləmə + avtomatik biseksiya ödənişli Mergify səviyyəsidir
   (pulsuz planda "Cannot use Merge Queue batch", #7220), buna görə `.mergify.yml` faylında
   `batch_size` təyin edilmir; paketləmə aşağıdakı əl ilə idarə olunan birləşdirmə qatarının işi olaraq qalır. Yoxlamaları
   `checks_timeout` müddətindən (240 dəq = `quality.yml` üçün ölçülmüş p95-in 2 qatı) sonra hələ də gözləmədə olan PR
   növbəni ləngitmək əvəzinə növbədən çıxarılır.
4. Birləşdirmədən sonra fasiləsiz buraxılışın uğurluluğunu yoxlayan iş axını push zamanı yeni son nöqtəni yoxlayır
   və kombinasiya reqressiyaya səbəb olubsa, aidiyyət məsələsi açır (heç vaxt avtomatik geri qaytarmır).

Qoruyucu qaydalar (`CLAUDE.md` Sərt Qaydalar #21/#22 ilə eynidir):

- **Buraxılış dondurulması aktivdir** → dondurulmuş budağı hədəfləyən PR-ləri etiketləməyin; əvvəlcə
  aktiv `release/vX+1` budağına yönləndirin.
- **Başqa sessiyanın icrada olan PR-i** → onu heç vaxt etiketləməyin; yalnız sahib sessiya
  öz işini növbəyə əlavə edir.
- Yalnız testlərdən ibarət fərqlər və `hotfix` etiketli PR-lər artıq azaldılmış CI yoxlamalarından keçir (bax:
  `RELEASE_CHECKLIST.md` → Təcili Düzəliş üçün Sürətli Zolaq); növbə şərtləri faktiki olaraq işə salınmış istənilən
  yoxlama dəstini qəbul edir (`#check-failure=0` + `#check-pending=0`).

## Ehtiyat variantı: əl ilə birləşdirmə qatarı

Növbə əlçatan olmadıqda istifadə olunur. Bu, v3.8.47 dövrü ərzində bir gündə
33 PR-i emal edən təcrübəni rəsmiləşdirir:

1. **Paketi formalaşdırın** (nəzərdən keçirilmiş+təsdiqlənmiş təxminən 10–30 PR). `linked:` toqquşmalarını
   (eyni `tap.testFiles`, eyni CHANGELOG hissələri) yoxlayın və onları ardıcıl icra edin.
2. **BİR DƏFƏ yoxlayın**: reliz ucundan yaradılmış təcrid olunmuş worktree daxilində bütün paket
   başlıqlarını lokal olaraq birləşdirin, sonra relizə ekvivalent dəsti işə salın
   (`npm run check:release-green`, relizdən əvvəl `--with-build` əlavə edin).
   `scripts/release/merge-train.sh <base> <PR#>…` 1–2-ci addımları avtomatlaşdırır (toqquşan
   PR-lər çıxarılır, qatar davam edir). Tam rejim `npm run test:unit` əmrini — sistemə
   uyğunlaşdırılmış icraçını (`--test-concurrency=20`) — işə salır; dominant mərhələdə 16 nüvəli sistemin təxminən 25%-dən istifadə edən, ardıcıl işləyən iki 4 nüvəli CI
   shardı DEYİL (2026-07-18 tarixində düzəldilib). `--fast` (gündaxili meqa-qatarların boşaldılması, sahib tərəfindən 2026-07-18 tarixində təsdiqlənib)
   bütün statik yoxlamaları + vitest-i saxlayır, lakin yalnız qatara daxil edilmiş PR-lər tərəfindən dəyişdirilən
   node:test fayllarını işlədir; TAM dəst gün ərzində ən azı bir dəfə
   yığılmış uc üzərində icra edilməlidir (`--fast` olmadan bir qatar).
3. **Yaşıl** → PR-ləri ardıcıllıqla birləşdirin (hər birindən əvvəl `state,headRefOid` dəyərlərini yenidən yoxlayın —
   başlığı dəyişmiş PR yenidən nəzərdən keçirməyə qaytarılır). Hər bir birləşdirmənin xalis fərqinin
   PR-in öz dəyişikliyi olduğunu sübut edin (avtomatik həll edilmiş geri qaytarmalar yoxdur: əhatə dairəsindən
   kənar silinmələri müəyyənləşdirmək üçün `git diff --stat` nəticəsini audit edin).
4. **Qırmızı** → tək-tək yenidən yoxlamaq əvəzinə paketi yarılara bölün (hər yarını yoxlayın);
   problemli PR-i sübutlarla birlikdə nəzərdən keçirmə növbəsinə qaytarın.
5. **Heç vaxt**: dondurma zamanı dondurulmuş budağa birləşdirməyin; heç bir yerdə `git stash` istifadə etməyin;
   qırmızı statusun yox olacağı ümidi ilə CI-ni kütləvi şəkildə yenidən işə salmayın (qayda: qırmızı status məlumatdır).

## Səviyyələr (növbənin yalnız sürətli yoxlamalarla niyə təhlükəsiz olması)

- **Hər PR üzrə** (quality.yml sürətli yoxlamaları): TIA-nın təsir etdiyi testlər + tam unit 4-shard +
  vitest + lint dəsti + typecheck + sənədlər/changelog bütövlüyü.
- **Hər paket/uc üzrə** (davamlı release-green): reliz budağına hər push zamanı `--quick` SƏRT yoxlamaları;
  gündə 3 dəfə tam `--with-build --full-ci` yoxlamaları.
- **Hər reliz üzrə** (reliz PR-ində ci.yml): E2E ×9 daxil olmaqla tam matris,
  paket artefaktı + tarball ilkin işəsalma sınağı, əhatə dairəsi/ratchet yoxlamaları.

Heç nə əvvəlkindən daha az yoxlanılmır — ağır səth sadəcə hər PR üzrə deyil, hər paket/uc üzrə işləyir;
O(N) gediş-gəlişlərini məhz bu aradan qaldırır.

## `merge-train.sh` üçün təzə checkout ilkin şərtləri

Skript kök checkout üzərində (hər hansı worktree əməliyyatından əvvəl) dərhal dayandırılan **ilkin yoxlama** icra edir ki, pozulmuş quraşdırma heç vaxt qırmızı qatar kimi görünməsin:

1. `npm ci`, sonra npm-in blokladığı `bun` postinstall əməliyyatını işə salın:
   `(cd node_modules/bun && node install.js)` — əks halda `check:provider-consistency`
   və `check:known-symbols` (hər ikisi `bun scripts/…`) həm qatarda, HƏM DƏ bazada
   heç bir pozuntu sətri olmadan uğursuz olur.
2. Əlavə `node_modules/node_modules` olmamalıdır (dublikat asılılıq ağacı; React iki dəfə yüklənir
   və UI vitest dəstləri dərhal uğursuz olur).
3. `node_modules/.bin/tsc` mövcud və icra edilə bilən olmalıdır (natamam quraşdırmada o olmur).

Qatar bloklayıcı `npm run check:cycles:ratchet` əmrini işlədir; sadə `npm run check:cycles`
məsləhət xarakterlidir (SCC-ləri siyahıya alır və sağlam bazada belə sıfırdan fərqli kodla çıxır).
