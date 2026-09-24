# Account-Ban / Banned-Keyword Detection (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute provayder **hesabının həmişəlik sıradan çıxdığını** (dayandırıldığını / deaktiv edildiyini / istifadə şərtlərini pozduğuna görə bloklandığını) göstərən siqnalları müəyyən etmək üçün yuxarı axın xəta cavablarını yoxlayır və uyğunluq aşkar etdikdə həmin bağlantını **terminal `banned` vəziyyətinə** keçirir ki, artıq sorğular üçün seçilməsin. **Security → Banned Keywords** parametrləri kartı məhz bunu konfiqurasiya edir ("Hesabın həmişəlik bloklandığını aşkarlamağa səbəb olan əlavə açar sözlər. Daxili açar sözlər həmişə tətbiq olunur.").

Bu səhifədə daxili siyahı, aşkarlama prosesi, onun əhatə dairəsi, fərdi açar sözlərin təhlükəsiz şəkildə əlavə edilməsi və işarələnmiş bağlantının necə bərpa olunması təsvir edilir. Terminal vəziyyətin özü davamlılıq modelinin bir hissəsidir — baxın:
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Terminal vəziyyətlər").

**Əsas mənbə:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Daxili açar sözlər

Fərdi siyahıdan asılı olmayaraq, bu 8 alt sətir həmişə tətbiq olunur (böyük-kiçik hərfə həssas deyil):

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Provayderlər bloklama mətnlərini dəyişdikcə bu siyahı da yenilənir. Etibarlı
> nüsxə `open-sse/services/accountFallback.ts` faylındakı `ACCOUNT_DEACTIVATED_SIGNALS`-dır;
> yuxarıdakı bloku anlıq görüntü kimi qəbul edin.

Eyni faylda yanaşı yerləşən iki **ayrı** siqnal cədvəli var və onlar bloklanmış açar sözlərin aşkarlanmasının bir hissəsi _deyil_:

- `CREDITS_EXHAUSTED_SIGNALS` — ödəniş/balans kvotası tükənib (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → terminal `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **terminal deyil**; tokenin yenilənməsi ilə bərpa oluna bilər.

Qeyd: **`rate limit`** / `429` kimi geniş yayılmış müvəqqəti ifadələr sürət məhdudiyyəti / bağlantının gözləmə müddəti mexanizmi tərəfindən idarə olunur və bloklama siqnalları **deyil**.

## Aşkarlama prosesi

```
yuxarı axın xəta cavabı
  → gövdə sətirə çevrilir + kiçik hərflərə çevrilir
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [alt sətir uyğunluğu]
  → uyğunluq var?
      → bağlantının testStatus = "banned"      (daimi — 1 illik gözləmə müddəti, heç vaxt avtomatik bərpa olunmur)
      → əgər `autoDisableBannedAccounts` parametri aktivdirsə və `autoDisableBannedScope`
        bu bağlantını əhatə edirsə (`all` və ya OAuth/cookie/session üçün `subscription`)
        → həmçinin isActive = false. Əhatə dairəsi `subscription` olduqda əvvəlcədən ödənilmiş API açarları
        aktiv qalır.
      → hesab seçimi zamanı bağlantı ötürülür (birləşdirilmiş QUOTA_BLOCKING vəziyyətləri)
```

- Uyğunlaşdırma cavabın **gövdəsi** üzərində böyük-kiçik hərfə həssas olmayan **alt sətir** axtarışıdır
  (`isAccountDeactivated`, `accountFallback.ts`).
- Daimi `banned` terminal vəziyyətinə keçid bloklama siqnalı olan gövdə üçün **istənilən
  HTTP statusunda** işə düşür (`markAccountUnavailable` → `checkFallbackError` vasitəsilə). Daha
  məhdud **`deactivated`** etiketi (bağlantının ehtiyat API açarları olmadıqda `isActive=false`)
  daxili `chatCore.ts` yolu tərəfindən **HTTP 401 / 403** zamanı yazılır
  (`classifyProviderError` → `ACCOUNT_DEACTIVATED` vasitəsilə təsnif edilir). Nəzərə alın ki,
  `markAccountUnavailable()` yolu eyni `ACCOUNT_DEACTIVATED` siqnalı üçün
  (`resolveTerminalConnectionStatus` vasitəsilə) _fərqli_ terminal statusu —
  **`expired`** — yazır, buna görə eyni bloklama cavabı hansı yolun emal etməsindən asılı olaraq
  `deactivated` və ya `expired` kimi görünə bilər. (Köhnə kod şərhində "401 cavabının gövdəsində
  bu sətirlər olduqda" deyilir — bu, mövcud davranışı tam əks etdirmir.)
- `banned` bağlantısı terminal statuslarının filtrləndiyi bütün seçim proseslərindən
  (`isTerminalConnectionStatus`, birləşdirilmiş `QUOTA_BLOCKING_CONNECTION_STATUSES`) çıxarılır.

## Əhatə dairəsi — hansı provayderlər skan edilir

**Bütün provayderlər.** Yoxlama hər bir uğursuz yuxarı axın sorğusunun keçdiyi
ümumi xəta emalı konveyerində işləyir — bu, OAuth/abunəlik skreperləri ilə
**məhdudlaşdırılmayıb**. Nəticədə yaranan terminal vəziyyət provayder üzrə deyil,
hər bir **bağlantı** üzrə təyin edilir.

Bununla belə, daxili _sətirlər_ real bloklanma riski olan abunəlik/OAuth
provayderlərinə (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity) yönəlib. API açarı ilə işləyən provayder yalnız xəta mətnində
alt sətirlərdən biri hərfi şəkildə olduqda detektoru işə salacaq.

`autoDisableBannedScope` (`all` | `subscription`, standart olaraq `all`) uyğunluq
aşkarlandıqda `isActive=false` təyin edilib-edilməməsinə nəzarət edir.
`subscription` giriş əsaslı yerləri (ödənişli abunəliklər və pulsuz hesablar,
o cümlədən veb-kuki sessiyaları) nəzərdə tutur. O, öncədən ödənişli API açarları
üçün yenə də `testStatus=banned` qeyd edir, lakin onları marşrutlaşdırma hovuzunda
saxlayır. Dayanıqlı dizayn hər bir provayder və hər bir hesab üzrə ayrıca
üstün təyinetmədir; qlobal enum ilkin həll variantıdır.

## Fərdi bloklanma açar sözləri

Açar sözləri **Security → Banned Keywords** bölməsində əlavə edin və ya silin
(`PATCH /api/settings` vasitəsilə qlobal `customBannedSignals` parametri kimi
saxlanılır). Onlar daxili siyahını əvəz etmir, ona **əlavə olunur** və yadda
saxlandıqda (həmçinin başlanğıcda) `setCustomBannedSignals()` vasitəsilə dərhal
yenidən yüklənir. Hər açar söz maksimum 200 simvolla məhdudlaşdırılır; massiv
uzunluğu üçün məhdudiyyət yoxdur.

**⚠ Yanlış müsbət nəticə riski — konkret ifadələr seçin.** Aşkarlama bütün cavab
mətnində xam alt sətir uyğunluğuna əsaslanır və uyğunluq **daimidir** (1 illik
gözləmə müddəti, əl ilə bərpa). Həddən artıq ümumi açar söz tam sağlam bağlantını
bloklaya bilər:

- **Pis:** `quota`, `limit`, `error`, `denied` — bir çox keçici xətada görünür.
- **Yaxşı:** tam bloklanma cümlələri, məsələn, `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Provayderin real bloklanma zamanı qaytardığı ən uzun və birmənalı ifadəyə üstünlük
verin. Şübhəniz varsa, əvvəlcə bağlantının `lastError` sahəsini izləyin, sonra
dəqiq ifadəni əlavə edin.

## İşarələnmiş bağlantının bərpası

Terminal `banned` / `deactivated` vəziyyətləri **heç vaxt avtomatik bərpa olunmur**
(onlar qabaqlayıcı bərpa dövründən çıxarılıb — yalnız `unavailable` gözləmə
müddətləri öz-özünə bərpa olunur). Operator onları açıq şəkildə sıfırlamalıdır:

1. **Bağlantını yenidən sınaqdan keçirin** — idarəetmə panelindəki **Test** əməliyyatı
   (`POST /api/providers/{id}/test`); uğurlu yoxlama `testStatus` dəyərini
   `active` olaraq sıfırlayır və xəta sahələrini təmizləyir.
2. **Yenidən autentifikasiya edin / giriş məlumatlarını redaktə edin** — OAuth
   provayderləri üçün giriş / yeniləmə axınını yenidən işə salın; provayder
   yaratma/idxal marşrutları `isActive = true` təyin edir.
3. **Bağlantını yenidən aktivləşdirin** — avtomatik deaktivləşdirmə
   `isActive = false` təyin edibsə (`all` əhatə dairəsi və ya OAuth/kuki/sessiya
   bağlantısı üçün `subscription`), hesabı düzəltdikdən sonra onu yenidən aktiv edin.

Ayrıca "bloklanma işarəsini təmizlə" düyməsi yoxdur — bərpa yenidən sınaqdan
keçirmə, yenidən autentifikasiya və ya yenidən aktivləşdirmə vasitəsilə aparılır
və [RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) sənədindəki ümumi
terminal vəziyyət qaydasına uyğundur.

## Yoxlamanın izolyasiyası (bütün modellərin sınağı)

**Yoxlama mənşəli xəta** (`runAsProbe` daxilində icra edilən bütün modellərin
sınağı / sağlamlıq yoxlaması göndərişləri) heç vaxt bağlantını hovuzdan çıxarmır
(#9817): o, **görünürlük üçün qeydə alınır** (`last_error`, `last_error_type`,
`error_code`, `last_error_at`), lakin **bütün** marşrutlaşdırma dəyişikliklərini —
gözləmə müddətlərini, terminal vəziyyətini (`banned` / `deactivated` /
`credits_exhausted`), model üzrə bloklamaları, provayder dövrəqırıcısını,
5 dəqiqəlik kvota keşini, OAuth tokeninin yenilənməsini və avtomatik
deaktivləşdirməni — ötürür. Yalnız real sorğu yolu xətası deaktivləşməyə səbəb
olur. Qeydə alınmış xəta işarələnmiş hesabı trafikə xidmət etməyə davam etdiyi
halda idarəetmə panelində görünən edir.

Yeganə qərar nöqtəsi `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`) funksiyasıdır; yoxlama mənşəli xəta əsasında
marşrutlaşdırma vəziyyətini dəyişə biləcək **hər bir** yerdə ona müraciət edilir:

- `markAccountUnavailable` (`auth.ts`) — yalnız qeydiyyat (`lastError` xam mətn,
  `lastErrorType`, `errorCode`, `lastErrorAt`; qəsdən **heç bir**
  `backoffLevel` yoxdur, çünki bu, seçim zamanı avtomatik azalmanı işə salaraq
  qeydi silərdi)
- `maybeAutoDisableBannedAccount` — avtomatik deaktivləşdirmə yoxdur
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (yalnız qeydiyyat,
  terminal `credits_exhausted` yoxdur), GEO_BLOCKED (24 saatlıq istisna yoxdur),
  MODEL_NOT_FOUND (`lockModel` yoxdur), codex 429 hesab rotasiyası üzrə alternativə
  keçid (`markCodexScopeRateLimited` yoxdur, saxlanılan `rate_limited_until`
  yoxdur, sessiya bağlılığının təmizlənməsi yoxdur), `persistCodexQuotaState`
  (kvota vəziyyətinin yazılması və keşin etibarsızlaşdırılması yoxdur),
  `recordKeyHealthStatus` (açar sağlamlığı rotatoruna toxunulmur)
- OAuth yenilənməsi — həm icraçının bazasındakı qabaqlayıcı yenilənmə
  (`base.ts` `execute()`, yeniləmə tokeninin rotasiyası sərf edilmir), həm də
  `chatCore` daxilindəki reaktiv 401/403 yolu (`expired` deaktivləşdirməsi yoxdur)
- `chat.ts` — provayder dövrəqırıcısı və 5 dəqiqəlik kvota keşi
  (`markAccountExhaustedFrom429`) heç vaxt zəiflədilmir

Qeydə alınmış xəta işarələnmiş hesabı trafikə xidmət etməyə davam etdiyi halda
idarəetmə panelində görünən edir. Qeyd: yoxlama qeydi, real yoldakı
`slice(0,100)` qısaltmasından fərqli olaraq, **xam** (kəsilməmiş) xəta mətnini
saxlayır.

Bütün modellərin sınağından texniki xidmət aləti kimi istifadə edən operatorlar
tarixi davranışı (yoxlamanın real generasiya kimi sayılmasını) aşağıdakılardan
biri vasitəsilə bərpa edə bilərlər:

- `probeCanDisable` parametri (`{"probeCanDisable": true}` ilə
  `POST /api/settings` və ya birbaşa `key_value` DB redaktəsi), yaxud
- **`PROBE_CAN_DISABLE=true`** funksiya bayrağı (mühit və ya DB üstün təyinetməsi;
  parametrdən üstündür).

Təhlükəsiz rejim: bayrağın və ya parametrlərin axtarışı xəta verərsə, izolyasiya
AKTİV qalır.

## Mənbə faylları

| Mövzu                                          | Fayl                                                                                                          |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Siqnal cədvəlləri + uyğunlaşdırma              | `open-sse/services/accountFallback.ts`                                                                        |
| Terminallaşdırma / davamlı saxlama             | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Avtomatik deaktivləşdirmə əhatəsi              | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Sətirdaxili təsnifat                           | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Terminal vəziyyətdən bərpanın istisna edilməsi | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Fərdi açar sözlərin icra zamanı yüklənməsi     | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Parametrlər interfeysi                         | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
