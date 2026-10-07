# ADR: Pluggable persistence boundary (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇧🇦 [bs](../../../bs/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Status:** Təklif edilib — icra mühiti üzrə işlər başlamazdan əvvəl müşayiətçinin təsdiqi tələb olunur
- **İzləmə məsələsi:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Əhatə dairəsi:** Yalnız davamlılıq arxitekturası; bu qərar xarici verilənlər bazası əlavə etmir və ya seçmir

## Kontekst

OmniRoute hazırda domen yönümlü davamlılıq funksiyalarını `src/lib/db/` vasitəsilə təqdim edir, halbuki
`src/lib/db/core.ts` tərəfindən qaytarılan ortaq bağlantı `src/lib/db/adapters/types.ts` daxilindəki sinxron `SqliteAdapter`
müqaviləsini həyata keçirir. Həmin adapter bir neçə SQLite icra mühitini dəstəkləyir, lakin onun
interfeysi SQLite-a uyğun olaraq qalır: sinxron hazırlanmış ifadələr, `pragma`, təxirə salınmış və dərhal
başlayan tranzaksiyalar, yerli/fayl-köçürmə ehtiyat nüsxəsi, yoxlama nöqtəsi və lokal verilənlər bazası deskriptoru.

Cari işəsalma və bərpa yolu SQLite faylının həyat dövrünü də idarə edir. `src/lib/db/core.ts`
`storage.sqlite` yolunu müəyyənləşdirir, proses üzrə bir qlobal adapteri saxlayır, WAL yoxlama nöqtələrini yaradır, bərpa
zamanı seçilmiş cədvəlləri qoruyur və verilənlər bazasını yenidən qurarkən SQLite köməkçi fayllarını silir. `src/lib/db/adapters/driverFactory.ts`
daxilində sürücü seçimi dəstəklənən SQLite icra mühitləri arasında seçim edir; bu,
xarici backend abstraksiyası deyil.

Sxemin təkamülü də eyni şəkildə sıx bağlıdır. `src/lib/db/migrationRunner.ts` nömrələnmiş SQL fayllarını tətbiq edir,
`sqlite_master` və `PRAGMA table_info` obyektlərini yoxlayır, əlavə FTS5 dəstəyini aşkarlayır və miqrasiya
işlərini SQLite tranzaksiyaları daxilində icra edir. `src/lib/db/backup.ts` və
`src/lib/db/optimizationSettings.ts` kimi əməliyyat modulları ehtiyat nüsxə, `PRAGMA`, WAL, səhifə ölçüsü, avtomatik vakuum və `VACUUM`
semantikasından birbaşa istifadə edir.

Bunlar daxilə yerləşdirilmiş SQLite tətbiqinin etibarlı xüsusiyyətləridir. PostgreSQL və ya MySQL-i SQLite API-sini təqlid etməyə
məcbur etmədən bu xüsusiyyətlər əlçatan qalmalıdır.

## Qərar

Daşına bilən davamlı vəziyyət üçün iki səviyyəli davamlılıq sərhədi qəbul edilsin:

1. **Domen repozitoriyası müqavilələri** biznes və marşrutlaşdırma kodunun ehtiyac duyduğu davamlılıq əməliyyatlarını
   müəyyənləşdirir. Çağıran tərəflər SQL mətnindən, hazırlanmış ifadələrdən,
   verilənlər bazası fayllarından və ya dialekt obyektlərindən deyil, domen davranışından və domen verilənlərindən asılı olur.
2. **Daxili asinxron backend müqaviləsi** tranzaksiya kontekstləri, sağlamlıq/hazırlıq, miqrasiyanın əlaqələndirilməsi, backend imkanları və
   təsnif edilmiş xətalar ilə repozitoriya implementasiyalarını dəstəkləyir. Dəqiq TypeScript interfeysi ilk implementasiya
   PR-ı ilə təklif ediləcək və uyğunluq testləri ilə təsdiqlənəcək; bu ADR qəsdən spekulyativ API-ni sabitləşdirmir.

SQLite standart implementasiya olaraq qalır. Mövcud SQLite sürücü ardıcıllığı və sinxron
`SqliteAdapter`, domenlər kiçik şaquli hissələr şəklində miqrasiya edilərkən SQLite repozitoriyası implementasiyasının arxasında qalır.
Heç bir istifadəçidən xarici xidmət konfiqurasiya etmək tələb olunmur.

PostgreSQL, repozitoriya sərhədi SQLite ilə yoxlanıldıqdan sonra təklif edilən ilk xarici implementasiyadır.
MySQL ikinci biznes-məntiqi budağı kimi deyil, eyni uyğunluq testləri dəstinə qarşı bərabərhüquqlu implementasiya kimi
ondan sonra gəlir.

## Sərhəd qaydaları

### Daşına bilən repozitoriya interfeysi

Daşına bilən repozitoriya aşağıdakıları təqdim edə bilər:

- domen üzrə oxuma və yazma əməliyyatları;
- açıq şəkildə müəyyən edilmiş atomik əməliyyatlar və tranzaksiya çərçivəli repozitoriya girişi;
- paralellik semantikasının domenin bir hissəsi olduğu hallarda müqayisə/yeniləmə və ya icarə əməliyyatları;
- backend-dən asılı olmayan səhifələmə, sıralama və məhdudiyyət xətaları.

Backend-in sağlamlığı, hazırlığı və miqrasiyanın əlaqələndirilməsi ayrı-ayrı domen repozitoriyalarına deyil,
daxili backend/əməliyyat müqaviləsinə aiddir.

Daşına bilən repozitoriya aşağıdakıları təqdim etməməlidir:

- `prepare`, `get`, `all`, `run` və ya xam sürücü deskriptorları;
- `PRAGMA`, WAL yoxlama nöqtəsi rejimləri, `VACUUM` və ya səhifə/keş sazlaması;
- SQLite fayl yolları, köməkçi fayllar və ya fayl-köçürmə ehtiyat nüsxəsi;
- backend-lərarası domen müqaviləsi kimi `lastInsertRowid`;
- FTS5 və ya `sqlite-vec` sintaksisi;
- normal biznes kodu tərəfindən istifadə edilən ümumi dialekt keçidi.

### Backend imkanları interfeysi

Backend-ə xas davranış açıq və aşkarlana bilən olaraq qalır. Yalnız SQLite-a aid texniki xidmət öz
implementasiyasının və əməliyyat interfeysinin arxasında qalır, o cümlədən:

- icra mühiti sürücüsünün seçilməsi;
- WAL yoxlama nöqtəsi və SQLite-ın dayandırılması davranışı;
- səhifə ölçüsü, keş ölçüsü və avtomatik vakuum parametrləri;
- verilənlər bazası faylının ehtiyat nüsxəsinin yaradılması, bərpası və qəza sonrası bərpası;
- SQLite sxeminin introspeksiyası;
- FTS5 və `sqlite-vec` inteqrasiyası.

Xarici backend-dən həmin xüsusiyyətləri təqlid etmək tələb olunmur. Repozitoriyalar ya
daşına bilən imkandan istifadə etməli, sənədləşdirilmiş davranışa malik backend-ə xas implementasiya təqdim etməli, ya da
imkanın əlçatan olmadığını bildirməlidir.

## Tranzaksiya və miqrasiya modeli

Repozitoriya API-ləri atomik biznes əməliyyatını müəyyən edir; çağıran tərəflər SQL tranzaksiya rejimini seçmir.
Hər bir əməliyyat müşahidə edilə bilən paralellik təminatlarını müəyyən etməlidir: qorunan invariantlar, konfliktlərin
aşkarlanması, təkrar cəhd təsnifatı, idempotentlik gözləntiləri və tranzaksiya kontekstinin ötürülməsi.
Realizasiyalar yalnız həmin müşahidə edilə bilən təminatlar ekvivalent qaldıqda fərqli tranzaksiya və izolyasiya
mexanizmlərindən istifadə edə bilər. SQLite daxilən, əməliyyatın müqaviləsini təmin etdiyi hallarda, cari təxirə salınmış
və ya dərhal tranzaksiya davranışından istifadə etməyə davam edə bilər.

Xarici backend-lər üçün miqrasiyaların sahibliyi açıq şəkildə müəyyən edilməlidir ki, tətbiqin bir neçə replikası
eyni sxem dəyişikliyini paralel icra etməyə çalışmasın. Backend miqrasiya tarixçələri ortaq məntiqi mərhələləri
paylaşa bilər, lakin SQLite SQL fayllarının digər dialektlərə daşına və ya orada təkrar istifadə edilə biləcəyi
nəzərdə tutulmur.

## Backend-lərarası uyğunluq semantikası

Uyğunluq testləri yalnız repozitoriya metodlarının siqnaturalarını deyil, həm də davranışı əhatə etməlidir. Hər bir
miqrasiya edilmiş domen aşağıdakıları müəyyən etməli və yoxlamalıdır:

- vaxt möhürünün saat qurşağı, dəqiqliyi və seriallaşdırılması;
- `NULL` sıralaması, müqayisə qaydaları və böyük-kiçik hərf həssaslığına dair gözləntilər;
- JSON təqdimatı və müqayisə davranışı;
- tam ədəd, onluq kəsr və pul dəyərlərinin dəqiqliyi;
- səhifələmə üçün sabit sıralama və deterministik bərabərlik həllediciləri;
- SQLite sətir ID-lərinə əsaslanmadan ID generasiyası;
- unikallıq və xarici açar pozuntularının təsnifatı;
- heç bir dəyişiklik etməyən, müqayisə/yeniləmə və silmə əməliyyatları üçün təsirlənmiş sətir davranışı;
- paralel yazma nəticələri, təkrar cəhd edilə bilən konfliktlər və idempotent təkrar cəhdlər.

Əgər domen ekvivalent müşahidə edilə bilən semantikanı müəyyən edə bilmirsə, o, hələ daşına bilən deyil və həmin
müqavilə hazırlanana qədər backend-ə xas qalmalıdır.

## Uyğunluq tələbləri

Bu ADR-ə uyğun olan istənilən realizasiya aşağıdakı xüsusiyyətləri qorumalıdır:

- SQLite sıfır konfiqurasiyalı standart seçim olaraq qalır.
- Mövcud SQLite faylları və miqrasiya tarixçəsi oxuna bilən olaraq qalır.
- npm, Electron, Docker və məhdud icra mühitlərindəki SQLite ehtiyat mexanizmləri cari işəsalma yolunu saxlayır.
- Saxlanılan provayder giriş məlumatları mövcud tətbiq şifrələmə davranışından istifadə etməyə davam edir.
- Repozitoriya miqrasiyası marşrutlaşdırma, kvota, API açarı və ya audit semantikasını xəbərdarlıq etmədən dəyişmir.
- Ehtiyat nüsxələmə və bərpa davranışı universal kimi təqdim edilmək əvəzinə hər backend üçün ayrıca sənədləşdirilir.
- Yalnız SQLite istifadə edən təmiz quraşdırma xarici verilənlər bazası drayverini yükləmir və ya tələb etmir.

## Çatdırılma ardıcıllığı

1. Təkrarlana bilən SQLite bağlılıq inventarını ayrıca nəzərdən keçirmə artefaktı kimi dərc edin.
2. İlk domen repozitoriyası müqavilələrini və uyğunluq testlərini təqdim edin.
3. Standart seçimləri dəyişdirmədən mövcud SQLite realizasiyasını həmin müqavilələrin arxasına uyğunlaşdırın.
4. Dəstəkçilərin təsdiqi şərtilə, məhdud bir idarəetmə müstəvisi bölməsi üçün ilk xarici realizasiya kimi PostgreSQL
   əlavə edin.
5. Ortaq vəziyyəti yalnız paralel yazma və miqrasiya sahibliyi testləri mövcud olduqdan sonra genişləndirin.
6. Verilənlər bazasının dəyişdirilməsini elan etməzdən əvvəl oflayn, yoxlanılmış SQLite-dan xarici sistemə miqrasiya
   yolu əlavə edin.
7. Sınaqdan keçmiş repozitoriya və backend müqavilələri əsasında MySQL dəstəyi əlavə edin.

İcra mühitinə aid hər bir addım ayrıca nəzərdən keçirilə bilən PR-dır. Sonrakı addım daha əvvəlki addımda
sınaqdan keçirilməmiş abstraksiyanın birləşdirilməsinə haqq qazandırmaq üçün istifadə edilməməlidir.

## İlk reallaşdırma mərhələsi

İlk icra mühiti mərhələsi əlaqəlilik inventarı nəzərdən keçirildikdən sonra seçilməlidir. Provayder
bağlantıları, API açarları, kombinasiyalar və marşrutlaşdırma konfiqurasiyası namizəddir, çünki onların baza cədvəlləri
`src/lib/db/core.ts` faylında görünür, lakin bu ADR cədvəl siyahısını və ya miqrasiya PR-ını təsdiqləmir.
Bu mərhələ aşağıdakıları əhatə etməlidir:

- SQLite davranışının qorunması testləri;
- repozitorinin uyğunluq testləri;
- aydın şəkildə müəyyən edilmiş tranzaksiya sərhədləri;
- saxlanılan giriş məlumatları üçün şifrələmə və redaktə yoxlaması;
- standart işəsalma konfiqurasiyasında heç bir dəyişiklik edilməməsi.

## Nəzərdən keçirilmiş alternativlər

### PostgreSQL-i `SqliteAdapter` altında əlavə etmək

Rədd edildi. `SqliteAdapter` SQLite icra mühitləri üçün uyğunluq qatıdır və SQLite-a xas
əməliyyatları təqdim edir. Bu interfeysin emulyasiyası sinxron və dialektə xas fərziyyələrin yeni
server hissəsinə sızmasına səbəb olardı.

### Bütün domenlər üçün ümumi sorğu/icra API-si təqdim etmək

Əsas sərhəd kimi rədd edildi. Bu, bağlantıların idarə edilməsini mərkəzləşdirərdi, lakin SQL dialekti,
tranzaksiya və cədvəl əlaqəliliyini biznes modullarında saxlayardı. Aşağı səviyyəli server hissəsi primitivi
repozitori reallaşdırmalarının daxilində mövcud ola bilər, lakin tətbiq yönümlü verilənlərin saxlanması API-si kimi deyil.

### Bir mərhələni doğrulamadan əvvəl bütün verilənlərin saxlanması mexanizmini yenidən yazmaq

Rədd edildi. Mövcud verilənlərin saxlanması səthi genişdir və faylın həyat dövrünü, bərpanı, axtarışı
və əməliyyat parametrlərini əhatə edir. Şaquli mərhələlər nəzərdən keçirilə bilən davranış və geri qaytarma sərhədləri təmin edir.

### Standart olaraq SQLite-ı əvəz etmək

Rədd edildi. Daxili və masaüstü yerləşdirmələr mövcud sıfır-xidmətli işəsalma modelindən asılıdır. Xarici
server hissəsi seçim əsasında aktivləşdirilir.

### Redis-i davamlı əsas mənbə kimi istifadə etmək

Rədd edildi. Redis açıq şəkildə müvəqqəti koordinasiyanı, keşi və ya sayğacları dəstəkləyə bilər, lakin burada
təsvir olunan davamlı repozitori müqaviləsini əvəz etmir.

## Nəticələr

### Müsbət

- Biznes kodu verilənlər bazası dialektindən asılı olmayan sabit verilən saxlama sərhədi əldə edir.
- Xarici server hissəsi abstraksiyanı müəyyən etməzdən əvvəl SQLite davranışı sınaqdan keçirilir.
- PostgreSQL və MySQL domen məntiqini təkrarlamaq əvəzinə müqavilələri və testləri paylaşır.
- Yalnız SQLite-a aid imkanlar sızan uyğunluq ara qatlarına çevrilmək əvəzinə birinci dərəcəli olaraq qalır.
- Çoxsaylı replika miqrasiyası və tranzaksiya davranışı açıq dizayn məsələsinə çevrilir.

### Xərclər və risklər

- Repozitorinin ayrılması çağırış nöqtələrinin mərhələli miqrasiyasını tələb edir.
- Asinxron sərhədlər hazırda sinxron olan xidmət koduna yayıla bilər.
- Server hissələri arasında semantik uyğunluq SQL sintaksisi uyğunluğundan əlavə uyğunluq testləri tələb edir.
- Ehtiyat nüsxələmə, axtarış, vektor saxlama və texniki xidmət imkanlara xas olaraq qalır.
- Birdən çox verilən saxlama reallaşdırmasının işlədilməsi CI və əməliyyat dəstəyi xərclərini artırır.

## Məqsədə daxil olmayanlar

Bu ADR aşağıdakıları etmir:

- verilənlər bazası asılılığı, mühit dəyişəni, sxem və ya miqrasiya əlavə etmir;
- aktiv SQLite singleton-unu və ya drayver kaskadını dəyişmir;
- konkret buraxılışda PostgreSQL və ya MySQL dəstəyi vəd etmir;
- FTS5, `sqlite-vec`, ehtiyat nüsxə faylları və ya SQLite texniki xidmətini portativ etmir;
- ortaq vəziyyət və koordinasiya testləri mövcud olmadan aktiv-aktiv rejimə hazırlığı müəyyən etmir;
- `src/lib/db/` qovluğunun birdəfəlik yenidən yazılmasını təsdiqləmir.

## Meyntener təsdiqi üçün açıq suallar

1. Repozitoriya və daxili asinxron backend sərhədi üstünlük verilən istiqamətdir, yoxsa
   xarici persistensiya ayrıca idarəetmə müstəvisi xidmətinin arxasında yerləşməlidir?
2. SQLite uyğunluğundan sonra ilk xarici implementasiya kimi PostgreSQL məqbuldurmu?
3. İlk sərhədlənmiş repozitoriya hissəsi hansı domen olmalıdır?
4. İlk çoxreplikalı mərhələ üçün hansı vəziyyət paylaşılmalı, hansı isə qovşaq daxilində lokal qalmalıdır?
5. Yarımçıq qalmış və ya geri qaytarılmış repozitoriya miqrasiyası üçün hansı uyğunluq müddəti tələb olunur?

Bu suallar həll olunana qədər bu sənəd təklif xarakteri daşıyır və heç bir icra vaxtı refaktorinqi nəzərdə tutulmur.
