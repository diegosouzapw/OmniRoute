# Release-Green: keeping the queue and release branch green (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Bunun həll etdiyi problem

**Tam yoxlama** (`.github/workflows/ci.yml` — unit hissələri, vitest, ratchet-lər,
`package-artifact`, SonarQube, E2E) **yalnız buraxılış PR-ində** (PR → `main`) işləyir.
`release/**` hədəfləyən PR-lər **sürətli yoxlamalardan** (`quality.yml`: TIA-nın təsir etdiyi testlər +
tip yoxlaması + lint) və kod dəyişiklikləri üçün **məsləhət xarakterli** istehsal build-indən keçir.
Nəticə: yalnız buraxılışda üzə çıxan qırmızı nəticələr buraxılış budağında səssizcə toplana və
buraxılış zamanı hər dəfə bir-bir olmaqla **~40 dəqiqəlik mərhələlər şəklində partlaya** bilər.

"release-green ailəsi" həmin qırmızı nəticələri **qabaqcadan müəyyənləşdirmək** üçün mövcuddur —
tam yoxlamanın ekvivalentini istənilən vaxt **lokal olaraq / buraxılışdan kənarda** doğrulayır ki,
buraxılış PR-i ilk CI işə salınmasındaca yaşıl olsun.

> **Dəyişməz prinsip:** bunların heç biri töhfəçini bloklamır. Onların PR-i uğursuz edən məcburi
> yoxlama əlavə etmirik. **Kənarlaşma** (ratchet-lər) buraxılış zamanı texniki xidmət göstərən şəxs
> tərəfindən yenidən baza səviyyəsinə uyğunlaşdırılmalıdır — bu, heç vaxt töhfəçinin qayğısı deyil.
> Heç bir hissə PR-i **bağlamır** (əməyi mənimsəmir) və keçməsi üçün testi **zəiflətmir**.

## Ailə (4 hissə) — və hər birinin müstəqil işləmə qaydası

| Hissə                                                                  | Nədir                                                                                    | Nə vaxt işə salınmalıdır                                                             | Əhatə dairəsi                   |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------- |
| **`/green-prs`** (Həll A)                                              | Texniki xidmət göstərən şəxsin **açıq PR növbəsini** tələb əsasında skan etməsi          | **Müstəqil və vaxtaşırı** — xüsusilə də `/generate-release` əməliyyatından **əvvəl** | Bütün PR növbəsi → `release/**` |
| **`/validate-release-green`** (Həll C — `npm run check:release-green`) | Doğrulama mühərriki: tam yoxlamanı budaq VƏ YA birləşdirmə namizədi üzərində təkrarlayır | Müstəqil şəkildə, istənilən vaxt                                                     | Konkret budaq və ya merge PR-i  |
| **`/babysit <PR#>`**                                                   | **Bir** PR-in **canlı CI** prosesini yaşıl nəticəyədək idarə edir                        | Müstəqil şəkildə, hər PR üçün                                                        | Tək bir PR                      |
| **`nightly-release-green.yml`** (Həll D)                               | Avtomatlaşdırılmış gecəlik workflow; HARD qırmızı nəticədə issue açır                    | Avtomatik (cron)                                                                     | Aktiv buraxılış budağı          |

**"Bu yalnız buraxılışlar üçündür?" sualının qısa cavabı:** **xeyr.** `/green-prs`
**vaxtaşırı, buraxılışlar arasında** işləmək üçün hazırlanıb. Onu müstəqil şəkildə işə salmaq normal
istifadə formasıdır — buraxılış sadəcə onun işə salınmasının ən çox fayda verdiyi məqamdır.

## PR-dən buraxılışa tövsiyə xarakterli yığım

`quality.yml` artıq qaralama olmayan kod PR-ları və Mergify növbə budaqları üçün `Build (advisory)` mərhələsini ehtiva edir.
O, `ci.yml` faylındakı istehsal yığımı reseptini təkrarlayır: Node 24, `npm-ci-retry`,
`check:node-runtime` və `OMNIROUTE_USE_TURBOPACK=1` ilə `npm run build`. Bu iş axınında sonrakı heç bir keyfiyyət tapşırığı yığım artefaktından istifadə etmədiyi üçün qəsdən
yığım artefaktı yükləmir.
Siqnalın PR-dən buraxılışa keçidi bloklayan bir qapıya çevrilməsi üçün bir həftəlik stabil buraxılış PR-ı icralarından sonra `continue-on-error` parametrini silin.

## Həll C — `npm run check:release-green` (mühərrik)

Cari iş ağacında buraxılışa ekvivalent yoxlamanı təkrarlayır və hər bir uğursuzluğu təsnif edir:

- **HARD** (tip yoxlaması, lint xətaları, vahid testləri, vitest, db-rules, public-creds, istəyə bağlı
  `package-artifact`) → **real qüsur**; `exit 1`. Mənbə budağında düzəldilir (TDD, Qayda #18).
- **DRIFT** (eslint **xəbərdarlıqları**, koqnitiv mürəkkəblik, fayl ölçüsü) → dövr ərzində yığılmış sərhəd sürüşməsi,
  **töhfə verənin günahı deyil**; yalnız hesabatda göstərilir və **buraxılış zamanı texniki xidmətçi tərəfindən yenidən baza səviyyəsinə uyğunlaşdırılır**.
  DRIFT **heç vaxt** çıxış kodunu dəyişmir — buna görə də heç kimi bloklamır.

```bash
npm run check:release-green                 # cari budaq (iş ağacı)
node scripts/quality/validate-release-green.mjs --json   # strukturlaşdırılmış çıxış
node scripts/quality/validate-release-green.mjs --quick  # vahid testlərini və vitest-i ötürür (yalnız sürüşmə, tip yoxlaması və lint)
node scripts/quality/validate-release-green.mjs --with-build  # package-artifact yoxlamasını daxil edir (ləng)
```

Yalnız diaqnostika aparır və **hesabat verir** (avtomatik düzəliş etmir). Yaşıl vəziyyətə çatdırmaq üçün düzəlişlərin orkestrasiyası
`/green-prs` və `/review-prs` daxilindədir.

## Həll A — `/green-prs` (növbənin skan edilməsi)

Prosedur (xülasə — ətraflı məlumat üçün `green-prs` bacarığına baxın):

1. Aktiv buraxılış budağına qarşı açıq PR növbəsini **inventarlaşdırın**.
2. Hər bir PR-ı **çeşidləyin** (uyğun / rədd edilməli / müəllifin müdaxiləsi tələb olunur) — rədd edilməli və ya müəllifin müdaxiləsini tələb edən PR-lar
   **hesabatda göstərilir, bağlanmır** (qərarı müəllif verir).
3. Hər bir uyğun PR üçün **izolyasiya edilmiş iş ağacında** (Qayda #19) PR-ı buraxılışın son vəziyyətinə gətirin və
   `npm run check:release-green` əmrini icra edin:
   - **HARD** → həmmüəlliflik vasitəsilə **töhfə verənin budağında** düzəldin (müəllifin "Merged" statusunu qoruyur),
     bütün HARD-lar aradan qaldırılana qədər yenidən icra edin.
   - **DRIFT** → olduğu kimi saxlayın; buraxılış zamanı yenidən baza səviyyəsinə uyğunlaşdırılacaq.
4. PR × (qərar, HARD uğursuzluqları, düzəldilib?, DRIFT, indi release-green vəziyyətindədir?) cədvəlini **hesabatda təqdim edin**.

Növbəni birləşdirmə aparmadan **hazırlaya** bilər; yalnız açıq şəkildə tələb edildikdə birləşdirir — və heç vaxt PR-ı bağlamır.

## Tövsiyə olunan tezlik

- **`/green-prs` əmrini mütəmadi olaraq** (məsələn, həftəlik) və **həmişə
  `/generate-release` əmrindən əvvəl** icra edin.
- Davamlı siqnal kimi **`nightly-release-green.yml`** (Həll D) faylını saxlayın: o, HARD uğursuzluğu ilə bağlı məsələ açdıqda,
  skan vaxtı çatıb.
- Budağı və ya konkret birləşdirmə namizədini yoxlamaq üçün **`/validate-release-green`** əmrindən ehtiyac yarandıqda istifadə edin.
- Konkret PR-ın canlı CI-da yaşıl vəziyyətə gətirilməsi lazım olduqda **`/babysit <PR#>`** əmrindən istifadə edin.

## Buraxılışla əlaqəsi

- `/generate-release` yoxlamanı **Mərhələ 0-da (ilkin yoxlama)** çağırır: buraxılış PR-ını açmazdan əvvəl DRIFT-i yenidən baza səviyyəsinə uyğunlaşdırır və
  HARD xətalarını düzəldir.
- `/review-prs` birləşdirmə qərarı mərhələsində release-green qapısından istifadə edir (birləşdirmədən əvvəl yaşıl vəziyyət).

Bütün hissələrin məqsədi eynidir: buraxılış günündə 40 dəqiqəlik mərhələlərlə uğursuzluqlar arasında keçid etmək əvəzinə, **ilk CI icrasında yaşıl olan buraxılış PR-ı**.
