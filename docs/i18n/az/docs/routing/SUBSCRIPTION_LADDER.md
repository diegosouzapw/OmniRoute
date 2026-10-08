# Subscription-first routing (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇦 [bs](../../../bs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> İki yeni `auto/*` identifikatoru — `auto/subscription` və `auto/thrifty`. Hər ikisi yalnız
> açıq şəkildə tələb edildikdə aktivləşir: çağıran tərəf identifikatoru adı ilə istəmədiyi halda
> heç nə onların üzərindən yönləndirilmir və heç bir mövcud hovuz, strategiya və ya standart davranış dəyişmir.

## Bunun mövcudluq səbəbi

OmniRoute artıq xərclə bağlı iki suala cavab verir, lakin onların heç biri əksər operatorların verdiyi sual deyil.

| Mövcud mexanizm                                          | Cavab verdiyi sual                                |
| -------------------------------------------------------- | ------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "bu model kataloqda pulsuz kimi göstərilib?"      |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "bu bağlantı məndən nə vaxtsa ödəniş tuta bilər?" |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "bu bağlantı limitinə yaxınlaşıb?"                |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "xərci məhdudlaşdır, ən ucuz seçimə keç"          |

Yalnız pulsuz seçimlərdən istifadə edən hər bir mexanizm **qapalı vəziyyətdə uğursuz olur** — tükənmiş pulsuz
hovuz boş hovuzdur, heç vaxt ödənişli seçimə keçid deyil — və ödənişli tərəfdəki bütün mexanizmlər pillələrə
laqeyddir. Bunların heç biri bu suala cavab vermir:

> "Artıq pulunu ödədiyim kvotadan istifadə et. O tükəndikdə ya dayan, ya da ən ucuz ödənişli
> seçimlərdən başlayaraq hər dəfə bir pillə yuxarı qalx — və kvota sıfırlanan kimi dərhal geri qayıt."

## Ödəniş modeli modelə deyil, bağlantıya aid xüsusiyyətdir

`classifyTier()` (`open-sse/services/tierResolver.ts`) `(provider, model)` cütünə əsaslanır və kataloq
qiymətləndirməsindən `free | cheap | premium` qaytarır. Lakin sorğunun əlavə xərc yaradıb-yaratmaması
ona **hansı bağlantının xidmət etməsindən** asılıdır: eyni model Claude Code OAuth bağlantısı vasitəsilə
plana daxil ola, API açarı bağlantısı vasitəsilə isə token başına ödənişlə hesablana bilər.

`provider_connections.auth_type` heç bir istiqamətdə etibarlı göstərici deyil — ölçülən OAuth
bağlantıları da, plana daxil olan API açarı bağlantıları da mövcuddur (Copilot istifadəçi tokeni ölçülən
API açarı deyil). Buna görə ödəniş sinfi hər bir provayderin dərc edilmiş şərtləri əsasında əl ilə
müəyyənləşdirilən **idarə olunan kataloqdan** — `open-sse/config/connectionBillingCatalog.ts` — gəlir;
bu, `FreeModelBudget.hardStopGuaranteed` tərəfindən pulsuz modellər üçün artıq yaradılmış eyni yanaşmadır.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Həll ardıcıllığı (`autoCombo/connectionBilling.ts`): autentifikasiyasız sintetik marker →
`keyless`; həm provayderə, həm də `authType` dəyərinə uyğun kataloq qeydi; provayder üzrə ümumi qeyd;
əks halda `unknown`. **Kataloqa daxil edilməmiş seçim pulsuz deyil** — `unknown` hər yerdə `metered`
kimi istifadə olunur, beləliklə sabah əlavə edilən provayder abunəlik pilləsindən kənarda başlayır və
ora bilərəkdən daxil edilməlidir.

## Pillə modeli

Yüksəlmə ardıcıllığında beş pillə. Onlar yalnız qiymətə görə fərqlənmir — hər birinin **öz**
tükənmə siqnalı var, buna görə də bu, sadəcə sıralama deyil.

| #   | Pillə          | Üzvlük                                           | Tükənmə şərti                                |
| --- | -------------- | ------------------------------------------------ | -------------------------------------------- |
| 0   | `subscription` | idarə olunan `billing: "subscription"`           | kvota pəncərəsi həddə çatdıqda/aşağı olduqda |
| 1   | `keyless`      | autentifikasiyasız sintetik yol                  | bağlantının gözləmə müddəti / kəsici         |
| 2   | `free`         | ölçülən bağlantı, `classifyTier() === "free"`    | pulsuz limit tükəndikdə                      |
| 3   | `cheap`        | ölçülən bağlantı, `classifyTier() === "cheap"`   | pillə üzrə büdcə sərf edildikdə              |
| 4   | `premium`      | ölçülən bağlantı, `classifyTier() === "premium"` | pillə üzrə büdcə sərf edildikdə              |

0-2-ci pillələr müşahidə edilə və artıq izlənilə bilən **kvota** əsasında tükənir. 3-4-cü pillələrdə
kvota yoxdur — ödənişli bağlantı sonsuza qədər xidmət göstərir — buna görə onların yeganə məntiqli
tükənmə siqnalı pillə üzrə **büdcədir**. Bu olmadan "ucuz seçim tükəndikdə yüksəl" davranışının
işə düşmə siqnalı yoxdur.

## `auto/subscription` — qapalı uğursuzluq

Hovuz = yalnız 0-cı pillə, əlavə istifadəsi sənədləşdirilmiş `hard-stop` olan və hər birində
kifayət qədər kvota ehtiyatının mövcudluğu canlı şəkildə yoxlanılmış bağlantılarla məhdudlaşır.
Qeyri-müəyyən olan hər şey istisna edilir: kurasiya edilməmiş provayder, yoxlanılması mümkün
olmayan kvota göstəricisi, köhnəlmiş göstərici və ya ödənişli hesablanan əlavə istifadə.

Boş hovuz qüsur deyil, **nəzərdə tutulan** nəticədir — çağıranın mövcud boş hovuz yolu bunu
səssiz, ödənişli ehtiyat varianta deyil, aydın xətaya çevirir. Bu id-nin bütün zəmanəti bundan
ibarətdir.

`keyless` qəsdən uyğun hesab edilmir: bu qruplaşdırma «ödəniş etdiyim plan» deməkdir, buna görə
də autentifikasiya tələb etməyən backend buraya aid deyil. Bunun üçün `auto/thrifty` (və ya
`auto/best-free`) istifadə edin.

### Bağlantı təhlükəsizliyi

Namizəd həmişə yalnız bir bağlantıya bağlı olmur — məntiqi namizəd `allowedConnectionIds`
icazə siyahısını daşıyır və faktiki istifadə olunan hesab daha sonra, göndəriş zamanı,
`open-sse/services/combo/autoStrategy.ts` tərəfindən seçilir. Buna görə də hər iki qruplaşdırma
**hər bir bağlantını ayrıca** yoxlayır və `allowedConnectionIds` siyahısını yalnız sağ qalan
altçoxluğa uyğun yenidən yazır — heç vaxt tam ilkin siyahıya və ya özbaşına seçilmiş bir üzvə
deyil. `autoStrategy.ts` artıq həmin massivi sərt icazə siyahısı kimi tətbiq etdiyindən, onu
burada yenidən yazmaq «yoxlanılmış» və «faktiki istifadə olunan» çoxluqları quruluş etibarilə
eyniləşdirir. Bu, [STRICT_ZERO_COST](./STRICT_ZERO_COST.md) ilə eyni invariant və eyni
məntiqdir.

## `auto/thrifty` — hər dəfə bir pillə yüksəlmək

Hovuz = bütün pillələr, pillə indeksinə görə sıralanmış və kvotası tükənmiş namizədlər
kənarlaşdırılmış şəkildə. `auto` mühərriki sağ qalan hovuzun **daxilində** yenə də xal hesablayır:
pilləkən hansı pillələrin nəzərdən keçiriləcəyini, xallama isə onların daxilində hansı namizədin
qalib gələcəyini müəyyən edir. Pillə daxilində sıralama sabitdir, buna görə də xal hesablayıcının
öz sıralaması bu üst qat tərəfindən heç vaxt dəyişdirilmir.

Bu, yeni dispetçer deyil, sıralama + filtrləmə üst qatıdır: `combo.ts` faylındakı spekulyativ
dövr artıq hədəfləri sıra ilə nəzərdən keçirir və uğursuzluq zamanı növbəti hədəfə keçir, buna
görə də ilkin yoxlamanın aşkarlamadığı icra vaxtı tükənməsi eyni sorğu daxilində yenə növbəti
pilləyə yüksəlir.

`auto/subscription` qapalı şəkildə uğursuz olduğu halda, `auto/thrifty` **açıq** şəkildə uğursuz
olur: istifadəyə yararlı kvota göstəricisi olmayan, plana daxil bağlantı yenə də əvvəlcə sınanır.
Onu sınamaq heç nəyə başa gəlmir və tükəndiyi məlum olarsa, növbəti pilləyə keçid onsuz da baş
verir — halbuki onu sınamaqdan imtina etmək telemetriya çatışmadıqda sorğunu ödənişli pilləyə
göndərərdi; qruplaşdırmanın qarşısını almaq üçün mövcud olduğu nəticə də məhz budur.

## Sıfırlamadan sonra plana qayıdış

Marşrutlaşdırmanın 0-cı pilləyə qayıtmasından əvvəl üç müstəqil şeyin müddəti bitməlidir.
Onlardan yalnız birini düzəltmək plan yenidən dolduqdan xeyli sonra da pilləkənin ödənişli
pillələrdə ilişib qalmasına səbəb olur.

1. **Kvota vəziyyəti keşi** — `freeAccessQuota.ts` hər `(provider, connection)` cütü üzrə
   180s TTL ilə keşləyir. Öz `resetAt` vaxtı artıq keçmiş keşlənmiş qeyd artıq mövcud olmayan
   pəncərəni təsvir edir, buna görə də indi yaşından **asılı olmayaraq** köhnəlmiş sayılır və
   yenilənməyə məcbur edir. Bu olmadan, gecə yarısı yenidən dolan plan TTL-in müddəti təsadüfən
   bitənədək tükənmiş kimi oxunmağa davam edir.
2. **Pilləkənin öz vəziyyəti** — layihələndirməyə görə belə vəziyyət yoxdur. Pillə uyğunluğu
   hər hovuz qurularkən canlı kvota vəziyyətindən yenidən hesablanır; sıfırlamadan daha uzun
   yaşayıb marşrutlaşdırmanı ilişdirə biləcək davamlı saxlanılan «hazırda 3-cü pillədəyik»
   qeydi mövcud deyil.
3. **Bağlantının gözləmə müddəti** — tükənməyə səbəb olan 429 eksponensial geri çəkilmə əsasında
   `rateLimitedUntil` təyin edir və bu, plan bağlantısı üçün faktiki sıfırlama vaxtını keçə
   bilər. `clampCooldownToReset()` (`subscriptionLadder.ts`) gözləmə müddətini yuxarı axının öz
   sıfırlama anına qədər qısaldır və onu heç vaxt uzada bilməz. **Bu funksiya reallaşdırılıb və
   sınaqdan keçirilib, lakin hələ qoşulmayıb**: `src/sse/services/auth.ts` daxilində kvota keşi
   hər hansı gözləmə müddəti yazılmamışdan _əvvəl_ etibarsızlaşdırılır, buna görə də `resetAt`
   həmin funksiyada daha əvvəl tutulmalıdır — bu, dayanıqlılığın kritik icra yolunda ayrıca
   nəzərdən keçirilmiş PR-a aid olan dəyişiklikdir. O vaxta qədər yenidən daxilolma bağlantının
   gözləmə müddətinin bitməsini gözləyir (provayder göndərdikdə bu müddət artıq yuxarı axının
   `Retry-After` göstərişlərinə üstünlük verir).

### Tez-tez keçidlərin qarşısının alınması

Yenicə sıfırlanmış pillə yalnız `reentryMinRemainingPercent` həddindən (standart olaraq 5)
yuxarı olduqda yenidən qəbul edilir, halbuki artıq istifadədə olan bağlantının yalnız
`exitCutoffPercent` həddindən (standart olaraq 2, `quotaPreflight.defaultThresholdPercent` ilə
eynidir) yuxarı qalması kifayətdir. Aradakı fərq histerezis zolağıdır — bu olmasa, həddə yaxın
dəyişən bağlantı ardıcıl sorğularda pillələr arasında tərəddüd edər.

## Konfiqurasiya

Yalnız tənzimləmə üçündür. Qəsdən `enabled` bayrağı yoxdur: bunları söndürə bilən keçid
`auto/subscription` seçiminin əksini vəd edən ad altında ödənişli modellər də daxil olmaqla
bütün hovuzu səssizcə təqdim etməsinə səbəb olardı.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 pilləni tamamilə deaktiv edir
  },
}
```

Xərc həlledicisi qoşulana qədər büdcə məhdudlaşdırması təsirsizdir: uçot mövcud olmadıqda ödənişli
pillə sıralanır, lakin heç vaxt məhdudlaşdırılmır. v3.8.51 versiyasından etibarən `rungBudgetUsd` parametri
sxem tərəfindən qəbul edilir, lakin hələ tətbiq EDİLMİR — onu aktiv xərc limiti deyil, rezerv edilmiş konfiqurasiya
kimi qəbul edin. Pillələrin sıralanması, kvota əsasında tükənmə və sıfırlamadan sonra yenidən daxilolma
onsuz da işləyir.

## Kompozisiya

`subscription` və `thrifty` `AutoTier` dəyərləridir, buna görə də hər bir kateqoriya ilə birləşdirilə bilirlər:
`auto/coding:thrifty`, `auto/reasoning:subscription` və s. İki sadə identifikator
(`auto/subscription`, `auto/thrifty`) `/v1/models` daxilində və idarəetmə panelində təqdim olunur.

Heç bir identifikator ödənişli səviyyəyə aid deyil, buna görə `isPaidTierAutoId()` hər ikisi üçün `false`
qaytarır və `auto/subscription` `hidePaidModels` tətbiq edildikdən sonra da qalır.

## Kodun yerləşdiyi yer

| Məqsəd                                            | Fayl                                                |
| ------------------------------------------------- | --------------------------------------------------- |
| Seçilmiş ödəniş məlumatları                       | `open-sse/config/connectionBillingCatalog.ts`       |
| Təsnifatçı                                        | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Pillələr, hər iki qruplaşdırma, yenidən daxilolma | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Namizəd hovuzuna qoşulma                          | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Sıfırlamanı nəzərə alan keş köhnəlməsi            | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Səviyyə interfeysi                                | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Təqdim edilən identifikatorlar                    | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Testlər                                           | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
