# Quality Gates Reference (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Bu sənəd OmniRoute-da bütün CI keyfiyyət qapıları üçün əsas istinaddır.
O, hər bir qapını, qapının nəyi yoxladığını, hansı CI tapşırığında işlədiyini, ratchet baza səviyyəsindən, yoxsa keçdi/qaldı siyasətindən istifadə etdiyini və yığmanı bloklayıb-bloklamadığını, yaxud yalnız tövsiyə xarakterli olub-olmadığını təsvir edir.

Qısa xülasə və icazə siyahısı siyasəti üçün `AGENTS.md` faylındakı "Keyfiyyət Qapıları və Ratchet-lər" bölməsinə baxın. Eyni sistemin kritik qiymətləndirilməsi, yetkinlik təsnifatı və alətdən asılı olmayan təkrarlama planı üçün
[Keyfiyyət Qapıları üzrə Təlimata](../ops/QUALITY_GATE_PLAYBOOK.md) baxın.

---

## Qeyt inventarı və icra profilləri

### Namizədin qəbulu

CI və Quality Gates iş axınlarının hər biri sabit nəticə yaradır: `Gate / CI` və
`Gate / Quality`. Onların versiyalaşdırılmış qəbul siyasəti bütün yuxarı axın tapşırıqlarını
məcburi və ya tövsiyə xarakterli kimi sadalayır. Tətbiq olunan məcburi tapşırıq uğurla
tamamlanmalıdır: mövcud olmayan, ləğv edilmiş, ötürülmüş, gözləmədə olan və naməlum nəticələr
PASS statusunu təsdiqləyə bilməz. Yalnız sənədlərə və ya yalnız kataloqa aid etibarlı təsnifat
kod zolağını tətbiqedilməz edə bilər; qaralama PR qəbul edilmiş namizəd deyil. `hotfix`
etiketi sübut tələbini aradan qaldırmır.

Hər iki iş axını PR-ləri və main/release budaqlarına göndərişləri, əl ilə başladılmanı və
birləşdirmə qrupu hadisələrini əhatə edir. Göndəriş, başladılma və birləşdirmə qrupu tam
seçimi işlədir. Fork-lar və birləşdirmə qrupları, əks halda öz serverində yerləşdirilən
icraçıları seçəcək tapşırıqlar üçün hostinq olunan icraçılardan istifadə edir; tətbiqdən
əvvəl kifayət qədər hostinq tutumu yoxlanılmalıdır.

Hər bir JSON qəbzi checkout edilmiş SHA-nı, iş axını icrasını və cəhdi müəyyən edir.
CLI checkout/hadisə SHA uyğunsuzluğunu rədd edir. İş axını testləri siyasət üzvlüyünü
nəticə tapşırığının `needs` siyahısına bağlayır ki, yeni və ya silinmiş zolaq səssizcə
yoxa çıxmasın. Qəbzlər nəşri, yerləşdirməni və ya mövcud tövsiyə xarakterli skanerin
daxili işini deyil, öz iş axınlarını əhatə edir. Budaq qaydalarında hər iki yoxlama adının
aktivləşdirilməsi ayrıca inzibati dəyişiklikdir; bu tapşırıqların əlavə edilməsi öz-özlüyündə
budağı qorumur.

### Statik skan inventarı

Versiyalaşdırılmış npm-alias inventarı və statik skan üzvlüyü
`config/quality/gate-manifest.json` daxilində yerləşir. Skript adlarını və dəqiq əmrləri
`package.json` ilə müqayisədə doğrulamaq üçün `npm run check:gate-manifest` əmrini icra edin;
əlavələr, silinmələr və əmr dəyişiklikləri həm lokal hook-u, həm də CI daxilindəki
dəyişiklik təsnifatı tapşırıqlarını uğursuz edir. Alias iş axını tapşırığı, matris instansiyası
və ya test nümunəsi deyil: bu saylar bir-birini əvəz edə bilən kimi təqdim edilməməlidir.

Seçilmiş alias-ları icra etmədən yoxlamaq üçün `npm run quality:scan -- --list` və ya
`npm run quality:scan:fast -- --list` istifadə edin. İcraçı npm giriş nöqtəsini çağırır,
buna görə onun icra mühiti (konfiqurasiya edildiyi hallarda Bun daxil olmaqla) qorunur.
Manifest həmin profillərdən kənardakı alias-ları ayrıca çağırılan kimi qeyd edir və
yalnız oxuma üçün nəzərdə tutulmuş skan profillərində texniki xidmət əmrləri qadağandır.

Bu profillər yalnız statik skanı əhatə edir. Onlar məhsul testlərini, əhatə dairəsini,
paketləməni, xarici yoxlamaları və ya namizədin tam buraxılış qəbulunu təsdiqləmir.
İş axını qəbulu əlaqələndirilmiş `config/quality/admission-policy.json` və
`scripts/quality/admission-verdict.mjs` fayllarından istifadə edir. Buraxılış müşahidəçisi
profilləri ayrıca qalır; onların tətbiq olunan yoxlamalarını və qəbzlərini müstəqil şəkildə
yoxlayın. Aşağıdakı mətn inventarı istinad üçündür, qeytin həqiqətən işə salındığının
sübutu deyil.

Skriptlər `scripts/check/` (siyasət qeytləri) və `scripts/quality/` (ratchet mühərriki)
altında yerləşir. CI üçün əsas həqiqət mənbəyi `.github/workflows/ci.yml` faylıdır.

### Buraxılış PR-i üçün sürətli yol (`quality.yml`)

`.github/workflows/quality.yml` main/release PR-lərində, qorunan budaqlara göndərişlərdə,
əl ilə başladılmada və birləşdirmə qruplarında CI-ni tamamlayır. PR-lər yol üzrə filtrlənmiş
sürətli yoxlamalardan istifadə edir. Daimi olaraq deaktiv edilmiş dublikat qurma prosesi
silinib; həqiqi qurma/paketləmə/işəsalma yoxlamaları CI daxilində qalır.

| Tapşırıq                                         | Əhatə dairəsi                                                                                                                                                                                                                                   | Bloklayıcı                   |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `Docs Gates (fast-path)`                         | Sənəd/kod PR-ləri; API sənəd istinadları və bütün sənədlər                                                                                                                                                                                      | Bəli                         |
| `Fast Quality Gates`                             | Kod PR-ləri; statik yoxlamalar, tip yoxlaması, idarə panelinin tip yoxlaması, təsirlənmiş vahid testləri                                                                                                                                        | Bəli                         |
| `Forgotten sibling tests`                        | Kod PR-ləri; dəyişdirilmiş modulların statik istehlakçılara və namizəd qardaş testlərə qədər izlənməsi; barrel və dinamik idxal yolları, istinad edilən icazə siyahısı istisnaları ilə birlikdə, tövsiyə xarakterli diaqnostika kimi bildirilir | **Tövsiyə xarakterli**       |
| `Vitest (fast-path)`                             | Kod PR-ləri; sürətli vitest dəsti                                                                                                                                                                                                               | Bəli                         |
| `Unit Tests fast-path`                           | Kod PR-ləri; 4 hissəli vahid test dəsti                                                                                                                                                                                                         | Bəli                         |
| `No new ESLint warnings`                         | Kod PR-ləri; susdurmaları nəzərə alan lint qoruyucusu                                                                                                                                                                                           | Bəli, fork-lar daxil olmaqla |
| `Merge integrity (changelog + generated skills)` | Qaralama olmayan PR-lər; dəyişiklik jurnalı və yaradılmış bacarıqların sinxronlaşdırılması                                                                                                                                                      | Bəli, fork-lar daxil olmaqla |

#### Unudulmuş qardaş testlər hesabatı

`npm run check:forgotten-sibling-tests` test təsiri xəritəsinin arxasındakı idxal həlledicisindən
təkrar istifadə edir. Hər bir dəyişdirilmiş istehsal modulu üçün namizəd test pull request
fərqində olmadıqda deterministik
`dəyişdirilmiş modul/simvol -> statik istehlakçı -> namizəd qardaş test` zəncirlərini bildirir.
Markdown xülasəsi və JSON nəticəsi hər hansı bloklayıcı tətbiqdən əvvəl kalibrləmə üçün
`forgotten-sibling-tests` iş axını artefaktı kimi saxlanılır.

Barrel təkrar ixracları və dinamik importlar yalnız həll etmə diaqnostikasıdır; onlar heç vaxt
bloklayıcı aşkarlama yaratmır. Nəzərdən keçirilmiş istisnalar
`config/quality/forgotten-sibling-allowlist.json` faylında saxlanılır. Hər qeyd istehlakçı və namizəd
testi göstərməli, konkret əsaslandırma təqdim etməli və GitHub məsələsinə və ya pull request-ə keçid verməlidir. Səhv formatlanmış qeydlər
təhlükəsiz şəkildə rədd edilir. İstisnalar silinmiş namizəd testi və ya `.skip`/`.todo` əlavə edən diff-i gözardı edə bilməz;
assertion-ların zəiflədilməsi və digər maskalama halları müstəqil şəkildə bloklayan
`check:test-masking` keçidinin nəzarətində qalır.

### Tapşırıq: `lint`

`main` budağına edilən hər PR üçün işə salınır. Uğursuz olduqda birləşdirməni bloklayır.

| Skript (`npm run ...`)            | Yoxlayır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Bloklayıcı                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `check:node-runtime`              | Node.js versiyasının dəstəklənən diapazonda olub-olmadığını                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Bəli                                               |
| `check:cycles`                    | Bütün `src/` + `open-sse/` üzrə dövri importları (AST əsaslıdır, tsconfig `paths` həll edilir). Sadə rejim = məsləhət xarakterlidir, dövrləri sadalayır. `check:cycles:ratchet` (CI-nin işə saldığı) say `quality-baseline.json` faylındakı `metrics.cycles` həddini aşdıqda bloklayır — hazırda 14, `direction: down`, buna görə də yalnız azala bilər (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Bəli (ratchet)                                     |
| `check:route-validation:t06`      | Zod sxemlərinin bütün marşrutlarda mövcudluğunu (Tier 6 siyasəti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Bəli                                               |
| `check:any-budget:t11`            | `@ts-expect-error // any` sayının büdcəni aşmamasını (Tier 11 ratchet-i)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Bəli                                               |
| `check:provider-consistency`      | `providers.ts` faylındakı hər bir provayderin `providerRegistry.ts` faylında uyğun qeydi var (və əksinə, icazə siyahısı daxilində)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Bəli                                               |
| `check:model-lifecycle`           | Əl ilə idarə olunan üç marşrutlaşdırma cədvəli repozitoriyaya daxil edilmiş həyat dövrü anlıq görüntüsü (#11503) ilə uyğun qalır: `FITNESS_TABLE` (`taskFitness.ts`) `REGISTRY` tərəfindən marşrutlaşdırıla bilən heç bir istifadədən çıxarılmış id-ni qiymətləndirmir; hər `BUILT_IN_ALIASES` hədəfi `REGISTRY` daxilində mövcuddur və istifadədən çıxarılmış id-lərin anlıq görüntüsündə yoxdur; `REGISTRY` daxilində hələ də qalan hər istifadədən çıxarılmış id yönləndirilir və ya `allowedRetiredInCatalog` siyahısında göstərilir; həmçinin heç bir `DEFAULT_DEGRADATION_MAP` mənbəyi və ya hədəfi həmin anlıq görüntüdə istifadədən çıxarılmış kimi göstərilmir. Bu, modelin hazırda aktiv yuxarı axın xidməti tərəfindən təqdim olunduğunu sübut etmir. Oflayn — əl ilə `npm run quality:refresh-model-lifecycle` vasitəsilə yenilənən `config/quality/model-lifecycle.json` ilə müqayisə edir (şəbəkə tələb olunur; CI sisteminə qoşulmayıb). `allowedRetiredInCatalog` tədricən azaldılan məhdudlaşdırıcı siyahıdır: qeydi yalnız izləmə məsələsi ilə birlikdə əlavə edin. | Bəli                                               |
| `check:fetch-targets`             | Müştəri tərəfindəki `src/` daxilində hər `fetch("/api/...")` real `route.ts` faylına yönəlir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Bəli                                               |
| `check:deps`                      | Repozitoriyadakı hər `package.json` faylında `npm install` vasitəsilə quraşdırıla bilən bütün asılılıqlar `dependency-allowlist.json` daxilindədir; versiyası sabitlənməmiş və ya slopsquatting riski daşıyan yeni paketlər işarələnir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Bəli                                               |
| `audit:deps`                      | `npm audit` (kök + electron) — yüksək/kritik səviyyəli xəbərdarlıq yoxdur (osv `check:vuln-ratchet` ilə üst-üstə düşür; Əsaslandırma Gözləyən İşlər Siyahısına baxın)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Bəli                                               |
| `check:lockfile`                  | `package-lock.json` bütövlüyü — https reyestri, bütövlük heşləri, host əvəzləmələri yoxdur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Bəli                                               |
| `check:licenses`                  | İstehsal asılılıqları üçün SPDX lisenziyalarının icazə siyahısı                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Bəli                                               |
| `check:tracked-artifacts`         | Build artefaktları / repozitoriyaya əlavə edilmiş `node_modules` simvolik keçidləri yoxdur (həmçinin husky pre-commit zamanı işləyir; pre-push qəsdən yüngüldür — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Bəli                                               |
| `check:ai-attribution`            | PR commit-lərində, başlığında və ya mətnində AI/bot `Co-Authored-By` treyleri və ya AI tərəfindən yaradılma altbilgisi yoxdur — Sərt Qayda #16 (`quality.yml` faylındakı PR→`release/**` üçün fast-gates dövrəsində — hadisə payload-unu oxuyur, PR olmadıqda heç bir əməliyyat etmir — və `ci.yml` lint prosesində PR→`main` üçün yalnız PR-a aid addım; həmçinin husky `commit-msg` hook-u; insan həmmüəlliflərə icazə verilir; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | Hər bir Vitest istisnası izləmə məsələsini göstərir və `config/quality/vitest-exclusions.json` faylında yer alır (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Bəli                                               |
| `check:file-size`                 | Heç bir mənbə faylı genişlənməyə görə müəyyən edilmiş limiti aşmır (ratchet: böyük fayllar `frozen` siyahısında dondurulub)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Bəli                                               |
| `check:error-helper`              | İcraçılarda/işləyicilərdə xəta cavabları `buildErrorBody()` / `sanitizeErrorMessage()` funksiyalarından istifadə edir (Sərt Qayda #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Bəli                                               |
| `check:migration-numbering`       | Miqrasiya SQL faylları boşluqlar və ya dublikatlar olmadan ardıcıl nömrələnib                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Bəli                                               |
| `check:public-creds`              | `publicCreds.ts` xaricində heç bir literal OAuth `client_id`/`client_secret` və ya Firebase Web açarı yoxdur (Sərt Qayda #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Bəli                                               |
| `check:db-rules`                  | `src/lib/db/` modullarından kənarda xam SQL yoxdur; `localDb.ts` faylından barrel-importlar yoxdur (Sərt Qaydalar #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Bəli                                               |
| `check:known-symbols`             | Dispetçer cədvəllərində qeydiyyatdan keçirilmiş provayder icraçıları, marşrutlaşdırma strategiyaları və tərcüməçilər diskdəki fayllarla uyğun gəlir — yetim və ya elan edilməmiş simvollar yoxdur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Bəli                                               |
| `check:route-guard-membership`    | Alt proses yaradan hər bir marşrut `isLocalOnlyPath()` tərəfindən təsnif edilir (Sərt Qaydalar #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Bəli                                               |
| `check:test-discovery`            | Repodakı hər bir `*.test.ts` / `*.spec.ts` faylı ən azı bir test icraçısı tərəfindən toplanır (ratchet: `test-discovery-baseline.json` faylındakı yetimlər siyahısı yalnız kiçilə bilər)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Bəli                                               |
| `check:agent-skills-sync`         | Yaradılmış agent-skills artefaktları mənbə kataloqu ilə uyğun gəlir (fərqlənmə yoxdur)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:provider-asset-provenance` | Provayder loqoları/aktivləri qeydə alınmış mənşə qeydini ehtiva edir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `lint:json`                       | JSON konfiqurasiya faylları təhlil olunur və repozitoriyanın lint qaydalarına cavab verir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `typecheck:core`                  | TypeScript kompilyasiyası xətasız tamamlanır (yalnız tövsiyə xarakterli xəbərdarlıqlar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Bəli                                               |
| `typecheck:noimplicit:core`       | Sərt `noImplicitAny` — gələcəyə yönəlib; əvvəlcədən mövcud olan bir çox çağırış nöqtəsi hələ də annotasiyalara ehtiyac duyur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | **Tövsiyə xarakterli** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` ilə məhdudlaşdırılmış `tsc` (#7033) — `typecheck:core` modulunun xüsusi seçilmiş 27 fayllıq icazə siyahısına heç bir idarə paneli TSX faylı daxil deyil və `next build` də onları heç vaxt tip yoxlamasından keçirmir (`next.config.mjs` faylında `ignoreBuildErrors: true` təyin edilib), buna görə də oradakı sahibsiz identifikator reqressiyaları (#6625/#6909) CI üçün görünməz idi. Dondurulmuş hər-fayl/hər-TS-kod xəta sayı bazası (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` ilə eyni köhnəlmə nəzarəti nümunəsi) ilə müqayisə aparır — yalnız baza sayını aşan YENİ xətalar yoxlamanın uğursuz olmasına səbəb olur; əvvəlcədən mövcud olan xəta düzəldildikdə `--update` ilə bazanı tədricən azaldın.                                                                                                                                                                                                                                                                                                              | Bəli                                               |

### Tapşırıq: `quality-gate`

`test-coverage` tamamlandıqdan sonra işə düşür. Uğursuz olarsa, birləşdirməni bloklayır.

| Skript                       | Yoxlayır                                                                                                                                                                                    | Bloklayıcı               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | `quality-metrics.json` yaradır (ESLint xəbərdarlıqlarının sayı, birləşdirilmiş şard hesabatından əhatə göstəricisi)                                                                         | Bəli (ratchet-dən əvvəl) |
| `quality:ratchet`            | `quality-baseline.json` faylındakı hər bir metrik geriləməyib (ESLint xəbərdarlıqları ≤ baza göstəricisi; əhatə ≥ baza göstəricisi)                                                         | Bəli                     |
| `check:duplication`          | Kod təkrarlanması (jscpd@4) `quality-baseline.json` faylındakı baza göstəricisini aşmır                                                                                                     | Bəli                     |
| `check:complexity`           | Fayl səviyyəsində siklomatik mürəkkəblik həddi aşmır (əsas ESLint `complexity` + `max-lines-per-function`)                                                                                  | Bəli                     |
| `check:cognitive-complexity` | Koqnitiv mürəkkəblik ratchet-i (`eslint-plugin-sonarjs`) — ayrıca ESLint keçidi; CI hər ikisini vahid `check:complexity-ratchets` addımı kimi birləşdirərək işə salır                       | Bəli                     |
| `check:dead-code`            | İstifadə olunmayan eksportlar / fayllar ratchet-i (knip) baza göstəricisi ilə müqayisədə geriləmir                                                                                          | Bəli                     |
| `check:compression-budget`   | Sıxılma etalon testinin büdcəsi — hər mühərrik üzrə token qənaətinin minimum hədləri geriləməməlidir                                                                                        | Bəli                     |
| `check:type-coverage`        | Tipləşdirilmiş kod faizi ratchet-i (`type-coverage`) geriləmir; `typecheck:noimplicit:core` yoxlamasını böyük ölçüdə əvəz edir                                                              | Bəli                     |
| `check:codeql-ratchet`       | Açıq CodeQL xəbərdarlıqlarının sayı artmır (`gh api` vasitəsilə oxuyur; token olmadıqda xətasız ötürür) — yenilənmə tezliyi və əl ilə işə salma: aşağıdakı "CodeQL ratchet" bölməsinə baxın | Bəli                     |

### Tapşırıq: `quality-extended`

Bütün tapşırıq məsləhət xarakterlidir (`continue-on-error: true`). npm əsaslı ratchet-lər
real olaraq işə salınır; xarici skanerlər `gh release download` vasitəsilə quraşdırılır və
binar fayl hələ də mövcud olmadıqda özünü ötürür (exit 0).

| Skript                   | Yoxlayır                                                                                                                                                                                                                                 | Bloklayıcı                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `check:circular-deps`    | Dövri asılılıqların olmaması (dpdm)                                                                                                                                                                                                      | **Məsləhət xarakterli**                                 |
| `check:bundle-size`      | Paket ölçüsü həddi aşmır                                                                                                                                                                                                                 | **Məsləhət xarakterli**                                 |
| `check:secrets`          | Məxfi məlumatların skan edilməsi (gitleaks) — binar fayl olmadıqda ötürülür                                                                                                                                                              | **Məsləhət xarakterli**                                 |
| `check:vuln-ratchet`     | Asılılıqlardakı zəifliklər (osv-scanner) geriləmir — binar fayl olmadıqda ötürülür                                                                                                                                                       | **Məsləhət xarakterli**                                 |
| `check:workflows`        | İş axını lint-i (actionlint + zizmor); çatışmayan/nasaz skanerlər, etibarsız hesabatlar və ya çatışmayan ratchet baza göstəricisi INCOMPLETE kimi uğursuz sayılır. Etibarlı tapıntılar seçilmiş sərt/məsləhət/ratchet siyasətinə tabedir | İcra tələb olunur; zizmor ratchet-i CI-də bloklayıcıdır |
| `check:openapi-breaking` | Açıq API müqaviləsində (`openapi.yaml`) baza budağı ilə müqayisədə geriyə uyğunluğu pozan dəyişikliklər (oasdiff) — `openapiBreaking=N` yaradır; oasdiff olmadıqda və ya baza spesifikasiyasını müəyyən etmək mümkün olmadıqda ötürülür  | **Məsləhət xarakterli**                                 |

### Tapşırıq: `docs-sync-strict`

`main` budağına hər PR zamanı işə salınır. Uğursuzluq halında birləşdirməni bloklayır.

| Skript                         | Yoxlayır                                                                                                                                                                                         | Bloklayıcı                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| `check:docs-all`               | Aşağıdakı 6 alt-keçidi ardıcıl işə salan meta-keçid                                                                                                                                              | Bəli                               |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt versiyalarının uyğunluğu                                                                                                                                           | Bəli                               |
| ↳ `check:docs-counts`          | Mətndəki sayların (provayder sayı, miqrasiya sayı və s.) real sayların ratchet pəncərəsi daxilində olması                                                                                        | Bəli                               |
| ↳ `check:env-doc-sync`         | `.env.example` faylındakı hər bir mühit dəyişəninin sənədlərdəki cədvəldə təsvir edilməsi və əksinin də doğru olması                                                                             | Bəli                               |
| ↳ `check:deprecated-versions`  | Sənədlərdə köhnəlmiş versiya sətirlərinin olmaması                                                                                                                                               | Bəli                               |
| ↳ `check:doc-links`            | Sənədlərdəki daxili markdown keçidlərinin real fayllara yönəlməsi (`[mətn]`/`(path)` forması)                                                                                                    | Bəli                               |
| ↳ `check:fabricated-docs`      | Sənədlərdə qeyd edilən marşrutların, mühit dəyişənlərinin, CLI əmrlərinin, hook adlarının və fayl yollarının kod bazasında mövcud olması. `--strict` ilə sərt keçid; bayraq olmadan yumşaq xəta. | Bəli (CI-də `--strict` vasitəsilə) |
| `check:cli-i18n`               | CLI əmr sətirlərinin bütün i18n lokalizasiya fayllarında mövcud olması                                                                                                                           | Bəli                               |
| `check:openapi-coverage`       | OpenAPI spesifikasiyasının real marşrutların ən azı ratchet ilə müəyyən edilmiş minimumunu əhatə etməsi                                                                                          | Bəli                               |
| `check:openapi-security-tiers` | `openapi.yaml` faylındakı təhlükəsizlik səviyyəsi annotasiyalarının `routeGuard.ts` təsnifatları ilə uyğun olması                                                                                | **Tövsiyə xarakterli**             |
| `check:openapi-routes`         | `openapi.yaml` faylındakı hər bir yolun real `route.ts` faylına yönəlməsi (hallüsinasiyaya qarşı)                                                                                                | Bəli                               |
| `check:docs-symbols`           | `docs/**/*.md` daxilindəki hər bir `/api/...` istinadının real `route.ts` faylına yönəlməsi (hallüsinasiyaya qarşı)                                                                              | Bəli                               |
| `i18n translation drift`       | i18n lokalizasiya fayllarındakı tərcümə edilməmiş açarlar — yalnız xəbərdarlıq                                                                                                                   | **Tövsiyə xarakterli**             |

### İş: `i18n-ui-coverage`

| Skript                                 | Yoxlayır                                                                                                                                                                                                    | Bloklayıcı             |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `check-ui-keys-coverage` (sətirdaxili) | UI i18n açarlarının əhatə dairəsi ≥ 65%-dir                                                                                                                                                                 | Bəli                   |
| `check-ui-value-drift` (sətirdaxili)   | Yenidən yazılmış ingiliscə **dəyər** geridə köhnəlmiş tərcümə saxlamır                                                                                                                                      | Bəli                   |
| `check-new-key-coverage` (sətirdaxili) | **Yeni** ingiliscə açar hər bir lokalizasiya üçün tərcümə edilib — `__MISSING__:` markeri rədd edilir                                                                                                       | Bəli                   |
| `check-translation-ratio`              | Hər lokalizasiya üçün real tərcümə nisbəti (icazə siyahısından kənarda ingiliscə ilə eyni / yer tutucu / çatışmayan yarpaqlar) `config/quality/i18n-translation-baseline.json` + güzəşt həddini aşmamalıdır | **Tövsiyə xarakterli** |

`fetch-depth: 0` tələb edir — dəyər fərqi keçidi `en.json` faylını birləşdirmə bazası ilə müqayisə edir.

#### `check-ui-value-drift` — köhnəlmiş tərcümə keçidi

Digər keçidlərin struktur baxımından görə bilmədiyi yeganə i18n reqressiyasını aşkarlayır: ingiliscə dəyər
yenidən yazılır və _əvvəlki_ ingiliscə mətndən əldə edilmiş tərcümələr yerində qalır, buna görə də
ingilisdilli olmayan istifadəçilər əminliklə ifadə edilmiş, lakin artıq yanlış olan mətni oxumağa davam edirlər.

Bu, həqiqətən buraxılışa daxil olub. Antigravity giriş köməkçisi əlavə ediləndə (#5203)
`oauthModal.googleOAuthWarning` yenidən yazılmışdı; **43 lokalizasiyadan 39-u** operatorlara "tam
URL-i kopyalayıb aşağıya yapışdırmağı" bildirən mətni saxlamışdı — həmin provayder üçün tamamlanması
mümkün olmayan bir axın. Bu, #8463-ə qədər nəzərdən qaçdı, çünki:

- `sync-ui-keys` yalnız **mövcud olmayan** açarları geriyə doldurur, **köhnəlmiş** olanları isə heç vaxt yeniləmir;
- `check-ui-keys-coverage` açarın _mövcudluğunu_ sayır, buna görə köhnəlmiş tərcümə əhatə olunmuş kimi hesablanır;
- `check-translation-drift` `docs/i18n/<locale>/**.md` sənədləşdirmə güzgülərini izləyir —
  o, heç vaxt `src/i18n/messages/*.json` fayllarını oxumur. 2026-09 yenidən sinxronizasiyasından bəri `docs-sync-strict`
  işində bloklayıcıdır: əsas sənədi redaktə edin → `npm run i18n:run -- --files=<doc>` (bölmə səviyyəsində, az resurs tələb edir).

**Fərqləri nəzərə alır, baza xəttinə əsaslanmır.** Birləşdirmə bazasındakı `en.json` faylını
işçi ağacı ilə müqayisə edir; ingiliscə dəyəri dəyişmiş hər açar üçün hələ də
toxunulmamış tərcüməni saxlayan istənilən lokal köhnəlmiş sayılır. Bu, qəsdən **əvvəldən mövcud olan borcu dondurur** — fərq
uzun müddətdir mövcud olan tərcümənin hansı köhnə ingiliscə mətndən gəldiyini göstərə bilməz, buna görə yoxlama
yalnız cari dəyişikliyin toxunduğu hissələri qiymətləndirir. Alternativ (hər açar üçün heş baza xətti)
təxminən 600 KB həcmində yaradılan fayl tələb edərdi; bu, mövcud ən böyük baza xəttindən 3 dəfə böyükdür və hər i18n PR-da
dəyişiklik səs-küyü yaradardı.

Tələbi ödəməyin iki yolu var:

1. təsirə məruz qalan tərcümələri yeniləyin və ya
2. onları `__MISSING__:<new english>` olaraq təyin edin — bundan sonra icra mühiti düzəldilmiş ingiliscə mətni təqdim edir
   (`src/i18n/request.ts::deepMergeFallback`, #7258) və açar tərcümə növbəsinə əlavə olunur.

Əgər sətrin **mənası** dəyişibsə, **açarın adını dəyişməyə** üstünlük verin: yeni açar
köhnəlmiş tərcüməni miras ala bilməz. #8463-də istifadə olunan nümunə budur.

```bash
npm run i18n:check-value-drift          # sərt (CI-da işlədilən)
npm run i18n:check-value-drift:warn     # yalnız hesabat
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Baza kataloqunu oxumaq mümkün olmadıqda (baza ref-i olmayan dayaz
klon) `SKIP reason=base-unresolved` ilə 0 çıxış kodu qaytarır; bu, `check-openapi-breaking` davranışını təkrarlayır.

### Tapşırıq: `i18n`

Tam i18n doğrulama matrisi (hər lokal üçün bir tapşırıq). Bütün tapşırıq tövsiyə xarakterlidir.

| Skript                          | Doğruladığı                       | Bloklama                                                            |
| ------------------------------- | --------------------------------- | ------------------------------------------------------------------- |
| `validate_translation.py quick` | Hər lokal üzrə tərcümənin tamlığı | **Tövsiyə xarakterli** (bütün tapşırıqda `continue-on-error: true`) |

### Tapşırıq: `pr-test-policy`

Yalnız pull request-lərdə işləyir.

| Skript                 | Doğruladığı                                                                                                                                        | Bloklama |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` və ya `bin/` daxilində istehsal kodunu dəyişən PR-lar testləri daxil etməli və ya yeniləməlidir (Sərt Qayda #8)   | Bəli     |
| `check:test-masking`   | Dəyişdirilmiş test faylları xalis təsdiq sayını azaltmır və `assert.ok(true)` tavtologiyaları əlavə etmir                                          | Bəli     |
| `check:pr-evidence`    | PR mətni dəyişiklik üçün test/VPS sübutlarına istinad edir (PR mətnini grep etməklə Sərt Qayda #18-i avtomatlaşdırır — kövrəkdir, Backlog-a baxın) | Bəli     |

### Tapşırıq: `test-vitest`

`build` sonrasında işləyir. Uğursuz olduqda birləşdirməni bloklayır.

| Test dəsti       | Doğruladığı                                                 | Bloklama                                                                                                                                                               |
| ---------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP serveri (110 alət), autoCombo, keş — vitest icraedicisi | Bəli                                                                                                                                                                   |
| `test:vitest:ui` | UI komponent testləri — vitest icraedicisi                  | **Bloklayır** — əvvəldən mövcud olan uğursuzluqlar `vitest.config.ts` daxilində açıq şəkildə istisna edilib; yeni uğursuzluqlar tapşırığın uğursuz olmasına səbəb olur |

### Gecə iş axınları (planlaşdırılmış, tövsiyə xarakterli)

Bunlar cron cədvəli üzrə (və `workflow_dispatch` ilə) işləyir, PR-larda isə heç vaxt işləmir. Hamısı tövsiyə xarakterlidir.

| İş axını               | Doğruladığı                                                                                                                                                                                           | Bloklama               |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `nightly-property`     | təsadüfi seed + yüksək icra sayı ilə fast-check xüsusiyyət testləri                                                                                                                                   | **Tövsiyə xarakterli** |
| `nightly-resilience`   | heap artımı yoxlaması, xaos nasazlıq inyeksiyası, k6 yük/davamlı yük testi                                                                                                                            | **Tövsiyə xarakterli** |
| `nightly-llm-security` | promptfoo inyeksiya qoruyucusu (bloklama rejimi) + garak yoxlamaları (provayder sirri olmadıqda ötürülür)                                                                                             | **Tövsiyə xarakterli** |
| `nightly-schemathesis` | `docs/openapi.yaml` istifadə etməklə canlı OmniRoute-a qarşı OpenAPI müqaviləsinin fuzzinqi (schemathesis) — spesifikasiya pozuntularını / idarə olunmamış 500 xətalarını üzə çıxarır (Mərhələ 8 B.4) | **Tövsiyə xarakterli** |
| `nightly-mutation`     | sürətli vahid test xətti üzrə Stryker mutasiya testi balı — sağ qalan mutantlar zəif təsdiqləri üzə çıxarır                                                                                           | **Tövsiyə xarakterli** |
| `nightly-compat`       | dəstəklənən `engines.node` diapazonları üzrə Node mühərriki uyğunluq matrisi                                                                                                                          | **Tövsiyə xarakterli** |

---

## Sürət mərhələsi (2026-08-30 → v4.0 LTS): bütün baza hədləri 20% yumşaldıldı

Məsul şəxsin qərarı (2026-08-30): v4.0 modullaşdırılmasına qədər buraxılış sürəti
texniki borcun sərhəddə saxlanmasından daha vacibdir. Bütün **ədədi** ratchet baza hədləri audit edilə bilən
vahid keçiddə 20% yumşaldıldı və mərhələ `config/quality/quality-baseline.json` faylında elan edildi:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Nə dəyişdi                                                                                                                                                                                                                            | Harada                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — aşağı olduqda daha yaxşı olan saylar ×1.2, yüksək olduqda daha yaxşı olan faizlər ÷1.2 (əhatəetmə minimumu 60 saxlanıldı, `eslintErrors` 0 olaraq qalır, `eslintWarnings` 0 → dondurulmuş susdurma sayının 20%-i) | `quality-baseline.json` (`_relax_velocity_2026_08_30` qeydi hər əvvəlki → sonrakı dəyəri sadalayır)    |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                      | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, hər `frozen[*]` / `testFrozen[*]` sətir həddi ×1.2                                                                                                                                                                  | `file-size-baseline.json`                                                                              |
| hər fayl / hər TS kodu üzrə saylar ×1.2                                                                                                                                                                                               | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                   | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `_policy.requireTighten === false` olduqda `--require-tighten` tövsiyə xarakteri alır                                                                                                                                                 | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| gecəlik `bank-ratchet-shrinks` dayandırılır (əks halda ölçülmüş azalmanı qeydə alaraq əlavə ehtiyatı ləğv edərdi)                                                                                                                     | `.github/workflows/nightly-release-green.yml`                                                          |

İcazə siyahıları (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) büdcə **deyil** və onlara toxunulmayıb. Keçdi/qaldı siyasəti keçidləri (məxfi məlumatlar, SQL qaydaları,
sənədlər/mühit müqaviləsi, i18n uyğunluğu, vahid testləri) dəyişməyib — uğursuz test hələ də uğursuz testdir.

**Alətlər**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — birdəfəlik
  yumşaltma (`scripts/quality/relax-baselines.mjs`); eyni qeydlə ikinci dəfə işləməkdən imtina edir.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  hər ədədi keçidi CI ilə eyni qaydada ölçür və hər keçid üzrə qalan ehtiyatı göstərir
  (`scripts/quality/baseline-headroom.mjs`). Gecəlik `baseline-headroom` tapşırığı cədvəli aktual
  **📈 Baza ehtiyatı (sürət mərhələsi)** məsələsinə göndərir və hər hansı keçid həddinin 10%-i daxilindədirsə
  və ya artıq onu keçibsə, `headroom-alert` etiketini əlavə edir. Həmin məsələ erkən xəbərdarlıqdır:
  bir neçə günə dolan büdcə yumşalmanın bütün komanda tərəfindən deyil, bir neçə PR tərəfindən
  istifadə edildiyini göstərir — problemli keçidin `_rebaseline_*` qeydlərinə baxın.

**Yeni kod rejimi (Clean-as-You-Code) — 2026-08-30 tarixindən, yalnız PR sürətli yolu**

`pull_request` hadisələrində `quality.yml`, `check:file-size`, `check:complexity-ratchets` və
`check:dead-code` üçün `--base-ref <PR base SHA>` ötürür. Bu rejimdə keçid HEAD-i merge-base ilə
**yalnız PR-ın toxunduğu fayllar çərçivəsində** müqayisə edir (`scripts/check/newCodeMode.mjs`:
merge-base müvəqqəti `git worktree` daxilində materiallaşdırılır, ESLint/knip orada və HEAD üzərində
işlədilir, hər fayl üzrə sayların fərqi hesablanır):

- **bloklayıcı** — PR dəyişdirdiyi fayllara siklomatik/koqnitiv pozuntular və ya ölü eksportlar əlavə edib
  (jurnalda `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **tövsiyə xarakterli** — qlobal cəmin dondurulmuş baza həddi ilə müqayisəsi. Miras qalmış yayınma
  günahsız PR-ı heç vaxt uğursuz etmir; yayınma buraxılış uzlaşdırılması zamanı yenidən dondurulur və
  ehtiyat tapşırığı tərəfindən izlənilir.

`workflow_dispatch` icralarında, release-green yoxlamasında və gecəlik ehtiyat tapşırığında PR bazası
yoxdur və onlar mütləq (qlobal) müqayisəni saxlayır. Əhatəetmə, dublikatlar və tip əhatəetməsi hələlik
qlobal qalır (onların alətləri hər fayl üzrə fərqi az xərclə yaratmır) — eyni yanaşma üçün namizədlərdir.

**v4.0-da mərhələnin bağlanması (LTS = əvvəlkindən daha sərt, "normal vəziyyətə qayıdış" deyil)**

1. Təmiz `release/v4.0.0` uc nöqtəsində: qeyd üçün `npm run quality:headroom --json`, sonra
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, hər typecheck keçidinin
   `--update` əmri — bütün baza göstəriciləri ölçülmüş dəyərə enir.
2. `quality-baseline.json` faylından `_policy` bölməsini silin (`--require-tighten` və gecə
   ehtiyat toplamasını yenidən aktivləşdirir), `check-openapi-coverage.mjs` faylında `THRESHOLD = 36`
   (və ya daha yüksək) dəyərini bərpa edin.
3. Modullaşdırmanın fayda verdiyi yerlərdə hədləri ölçülmüş göstəricilərdən daha da sərtləşdirin: fayl ölçüsü
   `cap` dəyərini yenidən 1000-ə (və ya 800-ə), əhatəetmə minimumlarını +5-ə, modullaşdırılmış paketlər üçün
   istifadə olunmayan ixracların sayını isə 0-a təyin edin.

## Ratchet baza səviyyəsi (`quality-baseline.json`)

Ratchet mühərriki (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json`
faylını oxuyur və onu yeni toplanmış `quality-metrics.json` ilə müqayisə edir. Epsilon
həddindən artıq geriləyən hər hansı metrika qurulmanın uğursuz olmasına səbəb olur.

Hazırda izlənilən metrikalar:

| Metrika               | İstiqamət | Mənası                                      |
| --------------------- | --------- | ------------------------------------------- |
| `eslintWarnings`      | `down`    | ESLint xəbərdarlıqlarının sayı artmamalıdır |
| `coverage.statements` | `up`      | Təlimat əhatəsi azalmamalıdır               |
| `coverage.lines`      | `up`      | Sətir əhatəsi azalmamalıdır                 |
| `coverage.functions`  | `up`      | Funksiya əhatəsi azalmamalıdır              |
| `coverage.branches`   | `up`      | Budaq əhatəsi azalmamalıdır                 |

Real yaxşılaşmadan sonra baza səviyyəsini yeniləmək üçün:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` bayrağı cari ölçülmüş dəyərləri `quality-baseline.json` faylına yazır.
Bu faylı metrikanı yaxşılaşdıran dəyişikliklə birlikdə commit edin. Metrikanı
yaxşılaşdırıb baza səviyyəsini yeniləməyən PR `--require-tighten` tərəfindən aşkarlanacaq
(Mərhələ 6A.5, icrası gözlənilir).

### CodeQL ratchet-i: yeniləmə tezliyi və əl ilə işə salma

`check:codeql-ratchet` **hər PR üzrə deyil, cədvəl əsasında yenilənən repozitoriya vəziyyətini** oxuyur.
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` əmri
`state: configured`, `schedule: weekly` bildirir: bu, hər push üçün analiz deyil,
GitHub-un standart quraşdırma skanıdır. Nəticə etibarilə, xəbərdarlıqları ARADAN QALDIRAN
PR birləşdirildikdən sonra ratchet növbəti planlaşdırılmış skan işə düşənədək köhnə,
daha yüksək sayı oxumağa davam edir — buna görə də skan yenilənənədək bütün açıq
PR-lərdə, o cümlədən düzəliş PR-nin sonrakı dəyişikliklərində geriləmə bildirir.

**Əl ilə yeniləmə**: `gh workflow run codeql.yml --ref release/vX.Y.Z` analizi yenidən
işə salır və xəbərdarlıqları bir neçə dəqiqə ərzində təkrar dərc edir. Əvvəlcə
`.github/workflows/codeql.yml` faylını oxuyun — onun başlığı bunun **GitHub-un "default setup"
rejimi ilə ziddiyyət təşkil etdiyinə görə** yalnız `workflow_dispatch` olduğunu izah edir
(`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`).
`push`/`pull_request`/`schedule` trigger-lərini bərpa etmək üçün əvvəlcə **sahib tərəfindən əməliyyat**
tələb olunur: Settings → Code security → CodeQL: Default → Advanced. Bu keçid edilmədən
`schedule:` trigger-i əlavə etməyin — bu, yalnız uğursuz icralar yaradacaq.

**Say azaldıqdan sonra baza səviyyəsini sərtləşdirin** — `node scripts/check/check-codeql-ratchet.mjs
--update` yeni ölçülmüş sayı `quality-baseline.json` →
`metrics.codeqlAlerts.value` daxilinə yazır, beləliklə ratchet köhnə yuxarı həddə doğru
geriləməyə səssizcə icazə vermir. İşlənmiş nümunə (2026-09-02/03): PR #12502 7 real
xəbərdarlığı aradan qaldırdı (ölçülmüş açıq xəbərdarlıq sayı 13 → 6); PR #12530 uyğunluq
üçün dondurulmuş baza səviyyəsini 11 → 6 olaraq sərtləşdirdi; qalan 6 xəbərdarlıq isə
sonradan hər xəbərdarlıq üzrə əsaslandırma ilə rədd edilərək açıq xəbərdarlıqların sayı 0-a endirildi.

**Rəddetmələr operatorun qərarıdır (Sərt Qayda #14)** — rəddetmə şərhində texniki
əsaslandırmanı qeyd etmədən heç vaxt CodeQL xəbərdarlığını rədd etməyin: yuxarı axın
protokolu tələbi üçün `won't fix`, test qurğusu üçün `used in tests`, CodeQL-in görə
bilmədiyi sanitarizator üçün `false positive` (presedent: `docs/security/ERROR_SANITIZATION.md`).

---

## Testlərin təkrar icra siyasəti (WS5.4, v3.8.49)

Təkrar icra hər bir icraçı üçün ayrıca tətbiq olunur, heç vaxt qlobal şəkildə tətbiq edilmir — ümumi təkrar icra real reqressiyaları
görünməz qeyri-sabitliklərə çevirir:

| İcraçı           | Siyasət                                                                                                                                                          | Səbəb                                                                                                                                         |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | Yalnız CI-də `retries: 1`, `trace: on-first-retry` ilə                                                                                                           | Brauzer/şəbəkə vaxtlaması həqiqətən qeyri-determinikdir; izləmə ilə bir təkrar icra qeyri-sabitliyi diaqnostika edilə bilən artefakta çevirir |
| Vitest           | Qlobal təkrar icra YOXDUR. Qeyri-sabitliyi təsdiqlənmiş test üçün ayrıca, test səviyyəsində təkrar icra təyin edilir (diff-də görünür, PR-da nəzərdən keçirilir) | Karantin siyahısını qeyri-şəffaf deyil, repozitoriyada saxlayır                                                                               |
| node:test (unit) | Heç vaxt təkrar icra YOXDUR                                                                                                                                      | Qeyri-sabit modul testi testdəki xətadır — onu düzəldin, yenidən sınamaqla keçirməyə çalışmayın                                               |

Qeyri-sabitlik telemetriyası tətbiq edildikdən sonra hədəf SLO-lar (WS5.2/5.3): hər test üzrə <1% qeyri-sabitlik dərəcəsi
(“indi düzəlt” həddi), hər konveyer üzrə ≥95% keçid dərəcəsi. Bunlar sənaye üzrə istinad dəyərləridir —
öz ölçmələrimiz əsasında yenidən kalibrlənməlidir.

## Buraxılış səviyyəsində ratchet sürüşməsi (WS5.5, v3.8.49)

Ratchet (fayl ölçüsü, mürəkkəblik, eslint xəbərdarlıqları) TƏMİZ buraxılış
ucunda reqressiyaya uğradıqda — yəni birləşdirmələrin KOMBİNASİYASI reqressiyaya səbəb olduqda və heç bir PR bunu öz
budağında ayrıca təkrarlamadıqda — düzəliş **buraxılış kapitanına aiddir və buraxılış
budağında bir dəfə** edilməlidir: çıxarma/refaktorinqə üstünlük verin; baza səviyyəsini yalnız sənədləşdirilmiş
əsaslandırma qeydi ilə yeniləyin. Kombinasiya sürüşməsini heç vaxt töhfəçinin PR-ına yükləməyin və
hər PR üçün baza səviyyəsini yeniləməyin (bu, real reqressiyaları gizlədir). Əvvəlcə fərqləndirin: problemin sizin PR-dan
qaynaqlandığını fərz etməzdən əvvəl probe iş ağacında təmiz uc üzərində qırmızı nəticəni təkrarlayın.

## Ratchet azalmalarının qeydə alınması — aşağı istiqamət (#8584)

Ratchet yalnız yarı-avtomatikdir və avtomatik olan hissə yanlış hissədir. Həddin **artırılması**
on saniyə çəkən əl ilə JSON redaktəsidir və qırmızı PR-ın blokdan çıxarılmasının ən sürətli yoludur.
Həddin **azaldılması** üçün isə kimsə `--update` icra etməli və nəticəni commit etməlidir — və
`bank-ratchet-shrinks` tapşırığı tətbiq edilənədək heç bir iş axını bunu icra etmirdi. Ölçülmüş nəticə
(2026-07-25): artıq yeni fayllar üçün 800 sətirlik həddə və ya ondan aşağı olan 18 dondurulmuş fayl, ən pis
halda 132× (`src/shared/validation/schemas.ts`, 2,523 həddi daşıyan 19 sətir);
mürəkkəblik tavanı təxminən 37 baza yeniləmə qeydi ərzində `1794 → 2169` yüksəlib və cəmi bir
azalma (−1) olub; “növbəti dövrdə `--update` vasitəsilə sərtləşdirin” ifadəsi 31 dəfə yazılıb və
yalnız bir dəfə yerinə yetirilib. Onu doğuran koddan daha uzunömürlü olan hədd, tamamlanmış hər bir
parçalanmanı faylı növbəti dəfə redaktə edən şəxs üçün səssizcə böyümə güzəştinə çevirir.

`nightly-release-green.yml` → **`bank-ratchet-shrinks`** tapşırığı bu dövrəni bağlayır:

|          |                                                                                                                              |
| -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| İşləyir  | `schedule` (gündə 3×) + `workflow_dispatch` — məqsədli şəkildə `push` **deyil**                                              |
| Ölçür    | ən yüksək `release/vX.Y.Z`, `release-green` ilə eyni həll və inyeksiya qoruması                                              |
| Yazır    | `check:file-size --update` və `check:complexity-ratchets --update` (hər ikisi konstruksiyaya görə yalnız azalma tətbiq edir) |
| Yoxlayır | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                     |
| Göndərir | buraxılış budağına qarşı həmişə aktual olan bir PR — məcburi yenilənir, heç vaxt spam edilmir                                |

Qeydəalma hər `push` üzrə deyil, paketləşdirilmiş şəkildə aparılır, çünki gecikmə tələbi yoxdur (azalmanın
8 saat ərzində qeydə alınması kifayətdir), hər birləşdirmə üzrə icra isə birləşdirmə kampaniyaları zamanı
PR budağını təkrar-təkrar quracaq və hər dəfə tam ESLint keçidinin xərcini ödəyəcəkdi. Aşkarlama `push`
üzərində qalır (`release-green`); yalnız qeydəalma paketləşdirilir.

### Təhlükəsizlik yoxlayıcısı

Tapşırıq baza səviyyələrinə nəzarətsiz şəkildə yazır, buna görə bunu məqbul edən
`verify-ratchet-bank.mjs`-dir. O, `--update` sonrasındakı ağacı `HEAD` ilə müqayisə edir və hər bir
dəyişiklik aşağıdakılardan biri olmadıqda **hər hansı commit yaranmazdan əvvəl tapşırığı dayandırır** —
heç bir PR açılmır:

- `frozen` / `testFrozen` daxilindəki rəqəmsal qeydin **azaldılması** və ya **silinməsi**
- `complexity-baseline.json` → `count` dəyərinin **azaldılması**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` dəyərinin **azaldılması**

Başqa hər şey uğursuzluqla nəticələnir: rəqəmin artırılması, qeydin əlavə edilməsi, `cap`/`testCap`
dəyərinin dəyişdirilməsi və ya `_rebaseline_*` qeydinin silinməsi/yenidən yazılması (bu qeydlər hər bir
tavanın niyə mövcud olduğuna dair audit izidir və fayl qeydləri ilə eyni `frozen` obyekti daxilində saxlanılır).
Həddi artıra bilən bot mövcud vəziyyətdən qəti şəkildə daha pis olardı. Reqressiya qoruması:
`tests/unit/verify-ratchet-bank.test.ts`.

Tapşırıq heç vaxt `release/*` budağına göndərmir — PR-ı insan birləşdirir, buna görə yanlış ölçmə
nəzərdən keçirilmədən tətbiq edilə bilməz.

## İcazə siyahısı siyasəti

Əvvəldən mövcud olan pozuntular səbəbindən uğursuz ola bilməyən hər bir yoxlama sabitləşdirilmiş icazə siyahısından
(məsələn, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`) istifadə edir. Siyasət belədir:

**Əsas səbəbi aradan qaldırın; icazə siyahısından yalnız pozuntu əvvəldən mövcud olduqda və
eyni PR çərçivəsində düzəldilə bilmədikdə istifadə edin.**

İcazə siyahısına qeyd əlavə edərkən:

1. Əsaslandırmanı ehtiva edən şərh əlavə edin.
2. İzləmə məsələsinə istinad edin (məsələn, `// #3498 — Mərhələ 2 funksionallığı, hələ həyata keçirilməyib`).
3. Pozuntunu düzəldən eyni PR çərçivəsində qeydi silin — artıq aktiv pozuntunu
   istisna etməyən köhnəlmiş qeyd özü də qüsurdur (6A.3 köhnəlmiş-tətbiqetmə funksiyası
   həyata keçirildikdən sonra sahibsiz icazə siyahısı qeydi yoxlamanın uğursuz olmasına
   səbəb olacaq).

Testlərin daha tez keçməsi üçün icazə siyahısına qeydlər əlavə **etməyin**. Böyüyən
icazə siyahısı ilə uğurlu yoxlama yanlış keyfiyyət təəssüratı yaradır.

### PR-nizdə yoxlama uğursuz olduqda

1. **Yoxlama çıxışını diqqətlə oxuyun** — o, qaydanı hansı faylın və ya simvolun pozduğunu
   dəqiq göstərir.
2. **Pozuntunu düzəldin** — yoxlamaların əksəriyyəti kod düzgün olan kimi uğurla keçən
   deterministik fayl sistemi yoxlamalarıdır.
3. **Pozuntu əvvəldən mövcuddursa** (yəni onu siz yaratmamısınız, lakin yoxlama artıq
   onu əhatə edir): əsaslandırma şərhi və izləmə məsələsi ilə birlikdə icazə siyahısına qeyd əlavə edin.
4. **Yoxlama ratçetdirsə** (əhatə dairəsi, ESLint xəbərdarlıqları, təkrarlanma, mürəkkəblik):
   dəyişikliyiniz göstəricini pisləşdirib. Əsas problemi düzəldin və ya (nadir hallarda) dəyişiklik
   qəsdən edilibsə və göstəricinin pisləşməsi məqbuldursa, `npm run quality:ratchet -- --update`
   əmrini icra edin — lakin səbəbini PR təsvirində sənədləşdirin.
5. **Məsləhət xarakterli yoxlamalar** (`continue-on-error: true`) məlumat məqsədlidir — onlar
   birləşdirməni bloklamır, lakin CI xülasəsində görünür. Buna baxmayaraq, onları düzəldin.

---

## Yeni yoxlamanın əlavə edilməsi

1. `scripts/check/check-<name>.mjs` (və ya `.ts`) yaradın. Siyasət yoxlamaları 0/1 çıxış kodu ilə tamamlanır.
   Ratçet tipli yoxlamalar `collect-metrics.mjs` vasitəsilə `quality-metrics.json` faylına göstərici yazır.
2. `package.json` faylına `"check:<name>": "node scripts/check/check-<name>.mjs"` əlavə edin.
3. Onu `.github/workflows/ci.yml` daxilində uyğun tapşırığa
   (siyasət → `lint` və ya `docs-sync-strict`; ratçet → `quality-gate`) qoşun.
4. İcazə siyahısı varsa, köhnəlmiş qeydlərin avtomatik aşkarlanması üçün
   `scripts/check/lib/allowlist.mjs` faylındakı `reportStaleEntries()` funksiyasını tətbiq edin.
5. `tests/unit/build/` daxilində yoxlamanın aşkarlama məntiqini əhatə edən test yazın.
6. Bu sənədi yeniləyin (müvafiq tapşırıq cədvəlinə sətir əlavə edin).

---

## Agent alətləri: dövrədə LSP (seçimlidir)

CI yoxlamalarına əlavə olaraq, OmniRoute **seçimli** `agent-lsp` ilkin strukturunu
(layihə səviyyəli `.mcp.json`, Fase 7 Task 15) təqdim edir. TypeScript dil serverini
kodlaşdırma agentləri üçün əlçatan etmək məqsədilə `.mcp.json` yaradın ki, onlar kodu yazmazdan
**əvvəl** simvolları / diaqnostikanı müəyyənləşdirsinlər — bu, “uydurulmuş simvol” xətalarını
mənbədə azaldan və `typecheck:core` yoxlamasını tamamlayan, iddiadan əvvəl kompilyasiya yanaşmasıdır.
O, qəsdən avtomatik yüklənmir (MCP↔LSP körpüsünü siz seçir və yoxlayırsınız); nasaz qeyd yalnız
bağlantı xətasını jurnala yazır və sessiyaları heç vaxt pozmur.

---

## Rasionallaşdırma ehtiyat siyahısı (ROI icmalı — Mərhələ 9 Dalğa 3)

Bu inventar 2026-06-17 tarixində `ci.yml` ilə tutuşduruldu (əvvəlki versiyada
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` buraxılmışdı). Tutuşdurulmuş dəstin ROI icmalı
aşağıdakı rasionallaşdırma namizədlərini müəyyən etdi. **Birləşdirmələr mexaniki CI
dəyişiklikləridir; çevirmə/ləğvetmə qərarları operatorun səlahiyyətində olan siyasət qərarlarıdır.** Aşağıdakılardan heç biri
hələ tətbiq edilməyib.

**Yuxarıda sənədləşdirilməyənlər də var** (məsləhət xarakterli, zəif siqnal): `docs-lint` işi
(markdownlint + Vale, bütün iş üçün `continue-on-error`) və müstəqil skaner iş axınları
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0`
`quality-baseline.json` daxilindədir, lakin `ci.yml` daxilində bloklayıcı bir xırxır mexanizminə qoşulmayıb — metrik
hazırda təcrid olunub.

### Birləşdirmə / təkrarların aradan qaldırılması (mexaniki, daha az riskli)

Hər bir namizəd 2026-06-17 tarixində mövcud qapı vəziyyətinə əsasən yoxlanılıb (etibar et, amma yoxla);
bir neçə «aşkar» birləşdirmənin borcu gizlətdiyi üzə çıxdı və onlar **birbaşa əvəzləmə üçün uyğun deyil**.

- **`check:docs-sync` iki dəfə işə düşür** — `lint` işində ayrıca və yenidən `check:docs-all` (`docs-sync-strict`) daxilində, həmçinin husky pre-commit qarmağında. ✅ **TAMAMLANDI** — ayrıca `lint` çağırışı silindi.
- **CVE skanlaması** — ❌ **Təmiz birləşdirmə DEYİL.** `audit:deps` istənilən yüksək/kritik CVE olduqda sərt şəkildə uğursuz olur; `check:vuln-ratchet` (osv) isə yalnız baza xətti ilə müqayisədə _geriləmə_ olduqda uğursuz olur (hazırda 1 MODERATE). Semantikaları fərqlidir — `audit:deps` ləğv edilsəydi, mütləq yüksək/kritik qapı itirilərdi. Hər ikisini saxlayın.
- **Dövr aşkarlanması** — ✅ **TAMAMLANDI** (#15159 G-01/G-02). Buradakı köhnə mətn `check:cycles` yoxlamasını «yaşıl, seçilmiş» qapı adlandırır və `check:circular-deps` (dpdm) 91 dövr bildirdiyi üçün onu bloklayıcı saxlamağı əsaslandırırdı. Həmin yaşıl status **yanlış yaşıl** idi: `check:cycles` 5 alt kataloqu (450 fayl) skan edir, yalnız statik `import|export … from` nümunələrini uyğunlaşdırır və hər bir `@/` və `@omniroute/open-sse/` spesifikatorunu kənarlaşdırırdı; buna görə repozitoriyada üstünlük təşkil edən dinamik import + alias dövrlərini görə bilmirdi. Düzəldildi: qapı indi `src` + `open-sse` daxilində gəzir (5023 fayl), spesifikatorları TypeScript AST-dən toplayır (beləliklə, `import("…")` nəzərə alınır, tip mövqeyindəki `typeof import("…")` isə alınmır) və tsconfig `paths` dəyərlərini həll edir. O, 0 deyil, **14** dövr tapır. Əvvəldən mövcud olan 14 dövr qapı PR-ında düzəldilə bilmədiyi üçün `check:cycles` indi **xırxır mexanizmidir** (`--ratchet`, `quality-baseline.json` daxilində yuxarı hədd `metrics.cycles.value = 14`, `direction: down`) — istənilən _geriləməni_ bloklayır və say yalnız azala bilər. CI `npm run check:cycles:ratchet` əmrini işə salır. Azaltma işi **A-01** ilə birlikdə aparılır. `check:circular-deps` (dpdm) daha geniş ikinci rəy kimi məsləhət xarakterli qalır.
- **Mürəkkəblik** — ✅ **TAMAMLANDI** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): bir ESLint keçidi, ruleId üzrə sayır ki, siklomatik+max-lines və koqnitiv baza xətləri müstəqil qalsın; ayrı-ayrı `check:complexity` / `check:cognitive-complexity` yoxlamaları lokal `--update` üçün saxlanılır.
- **`/api` anti-hallüsinasiya yoxlaması** — ✅ **TAMAMLANDI** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` üçün bir FS inventarı, openapi-routes + docs-symbols yenə də müstəqil hesabat verir; fərdi yoxlamalar lokal icralar üçün saxlanılır.
- **`check:node-runtime` 11 işdə icra olunur** — ⚠️ **aşağı ROI.** Hər biri ayrıca icra mühitidir və yoxlama <1s çəkir; ümumi qənaət ~10s təşkil edir, əvəzində isə hər iş üçün ucuz qoruyucu itirilir. Yaradacağı qarışıqlığa dəyməz.
- **CI lint-də `typecheck:noimplicit:core`** — ✅ **lint işindən silindi** (məsləhət xarakterli `continue-on-error` idi); bloklayıcı tip səthi `typecheck:core` + `check:type-coverage` ilə təmin edilir. Lokal skript saxlanıldı.

### Çevirmə / qərarvermə (operator siyasəti)

- `check:openapi-security-tiers` (məsləhət xarakterli) — ❌ **Təmiz şəkildə çevrilə BİLMƏZ.** 0 kodu ilə çıxır, lakin `LOCAL_ONLY_API_PREFIXES` altındakı bir neçə `traffic-inspector` marşrutunda `x-loopback-only: true` annotasiyasının olmadığını bildirir. Onu məcburi etmək üçün əvvəlcə həmin annotasiyalar `openapi.yaml` faylına əlavə edilməlidir.
- `typecheck:noimplicit:core` (məsləhət xarakterli) — bloklayıcı `check:type-coverage` xırxır mexanizmi tərəfindən əsasən əhatə olunur. Xırxır mexanizminə çevirin və ya lazımsız ikinci `tsc` keçidini ləğv edin.
- `test:vitest:ui` (indi **bloklayıcıdır**) — əvvəldən mövcud uğursuzluqlar `vitest.config.ts` daxilində `// #8618` izləmə şərhləri ilə açıq şəkildə istisna edilib; yeni uğursuzluqlar işin uğursuz olmasına səbəb olur.
- `check:secrets` (gitleaks, 3 sənədləşdirilmiş yanlış müsbət nəticədə dondurulmuş bloklayıcı xırxır mexanizmi) — 0-a çatmaq üçün bu 3 nəticəni icazə siyahısına əlavə edin və ya məsləhət xarakterli statusa endirin. GitHub-un daxili məxfi məlumat skanlaması + `check:public-creds` ilə üst-üstə düşür.
- `check:pr-evidence` (bloklayıcıdır, PR mətnini grep ilə axtarır) — yanlış müsbət nəticə riski yüksəkdir; ləğv edilərsə, Sərt Qayda #18-in icrasını zəiflədir, buna görə bu, həqiqi siyasət qərarıdır.
- `semgrep` (məsləhət xarakterli müstəqil yoxlama) — OWASP ailələri üzrə CodeQL ilə üst-üstə düşür; baza xəttini xırxır mexanizminə qoşun və ya ləğv edin.

---

## Əlaqəli sənədlər

- Təchizat zənciri (mənşə, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — açar dəstlərinin uyğunluq qapısı

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, `i18n-ui-coverage` tapşırığı).
Hər bir `src/i18n/messages/<locale>.json` faylındakı son səviyyə açarları dəstini `en.json` ilə müqayisə edir və
açarın nə vaxt əlavə edilməsindən asılı olmayaraq, çatışmayan və ya əlavə son səviyyə açarı olduqda uğursuz olur. `__MISSING__:`
yer tutucuları mövcud sayılır (onların məzmunu nisbət qapısının işidir). Bu, fərqə əsaslanan/faizli digər iki
qapının mütləq tamamlayıcısıdır: `check-ui-keys-coverage` hər lokal üçün 80 % minimum həddi tətbiq edir
(~13,000 açardan 43-nün çatışmaması yenə də 99.7 % kimi görünür), `check-new-key-coverage` isə yalnız
PR-ın `en.json` faylına əlavə etdiyi açarları qiymətləndirir. Lokal paketi budağının ayrıldığı gün mövcud olan
`en.json` əsasında yaradılır və əsas budaq açarlar əlavə etməyə davam edərkən tərcümə işi günlərlə davam edir;
paket PR-ı özü heç bir açar əlavə etmir, buna görə paket 1 (#13044) doqquz lokalda 43 açar çatışmazlığı ilə,
paket 2 (#13660) isə səkkiz lokalda 10 açar çatışmazlığı ilə birləşdiriləndə hər iki əlaqəli qapı səssiz qaldı
(2026-09-15). Qırmızı nəticəni
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` ilə düzəldin; `extra` son səviyyə açarı
mənbənin onu sildiyini bildirir — həmin açarı lokaldan silin. `--warn` uğursuzluq yaratmadan hesabat verir.
`--catalog=cli` eyni müqayisəni `bin/cli/locales` üzərində aparır (`npm run i18n:check-keys:cli`);
hər iki addım `i18n-ui-coverage` tapşırığında yer alır.

#### `check-new-key-coverage` — yeni açarların i18n qapısı

`check-ui-value-drift` qapısının əlaqəli qapısıdır. Həmin qapı ingiliscə dəyərin **yenidən yazıldığı**,
lakin tərcümələrin geridə qaldığı halları aşkarlayır; bu qapı isə ingiliscə açarın **əlavə edildiyi**,
lakin bəzi lokalların onu heç almadığı halları aşkarlayır.

`check-ui-keys-coverage` bu halı görə bilmir: o, hər lokal üçün faizlə minimum hədd tətbiq edir və
~13,000 son səviyyə açarından on birinin çatışmaması əhatə səviyyəsini 99.9% saxlayır. Hər dil üzrə faiz
“bu funksiya tərcüməsiz buraxıldı” vəziyyətini ifadə edə bilməz — bütöv bir funksiya yeni lokalda heç bir
mətn olmadan buraxıla və göstəricini heç dəyişməyə bilər.

Bu qapının kodlaşdırdığı insident: Orchestration Canvas-ın 3-cü mərhələsi öz on bir açarını həmin vaxt
mövcud olan 42 lokalın hamısında tərcümə etdi. Bir neçə saat sonra Aİ dilləri paketi (#13044) repozitoriyanı
51 lokala çatdırdı və doqquz yeni lokal (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) həmin açarları
heç vaxt almadı. `deepMergeFallback` çatışmayan açarı ingiliscə mətnlə əvəz edir, buna görə uğursuzluq
boş interfeys deyil, tərcümə edilməmiş interfeys şəklində idi — real və quruluş etibarilə səssiz.

Əlaqəli qapı kimi bu da **fərqdən xəbərdardır**: birləşdirmə bazasındakı ingiliscəni işçi ağacla müqayisə edir,
beləliklə əvvəlcədən mövcud olan boşluqlar olduğu kimi qalır və qapını aktivləşdirmək üçün miqrasiya tələb olunmur.

**`__MISSING__:<english>` markeri bu tələbi ödəmir (2026-09-17 tarixindən etibarən).** Əvvəllər bu, sənədləşdirilmiş
təxirəsalma üsulu idi — icra zamanı düzgün ingiliscə mətnə geri qayıdılırdı — ta ki 2026-09-16 tarixində səkkiz
funksiya PR-ı 61 açar əlavə edib onları tərcümə etmək əvəzinə markerləri bütün 65 lokala yerləşdirənədək:
bu qapı onların hamısını qəbul etdi, PR-ları heç nə bloklamadı və real tərcümə nisbətini bloklayıcı şəkildə
yoxlayan qapı daha sonra buraxılışın son nöqtəsində hər kəs üçün uğursuz oldu (pt-BR 3.2 % > 2.5 % + 0.5).
İndi marker çatışmayan tərcümə kimi qiymətləndirilir. Qırmızı nəticəni
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` ilə və ya
bütün lokalları paralel şəkildə `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
ayrılmış rejimdə təhlükəsizdir, `OMNIROUTE_TRANSLATION_*` mühit dəyişənləri olmadan işə başlamaqdan imtina edir)
ilə düzəldin. İngiliscə qalmalı olan açar (sabitləşdirilmiş məhsul/mühərrik/bayraq adı)
heç vaxt marker arxasında deyil, `scripts/i18n/untranslatable-keys.json` daxilində olmalıdır.
`vi` markerləri tamamilə qadağan edir (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — dayandırılmış testlər qapısı

`vitest.config.ts` faylının `exclude` siyahısındakı fayl işlədilməyən testdir və ağacı oxuyan hər kəs üçün
əhatə kimi görünür. Altmış iki fayl
`// #8618 — əvvəlcədən mövcud olan uğursuzluq; düzəldildikdə bu istisnanı silin` şərhinin arxasında toplandı.
#8618 məsələsi 2026-08-11 tarixində bağlandı, lakin onun izlədiyi siyahı 45 qeyddən 62 qeydə qədər böyüdü
və hər yeni qeyd artıq bağlı olan məsələyə yönələn şərhi miras aldı. Siyahı nəhayət fayl-fayl ölçüldükdə
(#13204), **62 fayldan 51-i mənbədə heç bir dəyişiklik edilmədən cari ağacda uğurla keçdi**.

Qapı real fayla uyğun gələn hər bir istisnanın (a) izləmə məsələsini göstərməsini və
(b) ölçülmüş statusu ilə birlikdə `config/quality/vitest-exclusions.json` daxilində olmasını tələb edir;
beləliklə yeni istisna əlavə etmək 60 qeyddən ibarət massivdə daha bir sətir deyil, xüsusi faylda nəzərdən
keçirilə bilən fərq olur. Qapı istisna edilmiş testləri qəsdən yenidən işə salmır — bu, təxminən 10 dəqiqə
çəkir və dövri tapşırığa aiddir; inventar hər birinin son ölçülmə vaxtını qeydə alır.
