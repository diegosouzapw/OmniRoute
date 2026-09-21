# Kiro Setup Guide (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Bu təlimatda Kiro (AWS-də yerləşdirilən AI kodlaşdırma köməkçisi) hesablarının OmniRoute-a əlavə edilməsi, xüsusilə də sessiya konfliktləri olmadan birdən çox hesabın eyni vaxtda işlədilməsi izah olunur.

---

## Arxa plan: Kiro hesabları niyə konflikt yarada bilər

Kiro-nun backend-i aktiv sessiyaları izləmək üçün AWS SSO OIDC müştəri qeydiyyatlarından istifadə edir.
Əsas məhdudiyyət: **hər OIDC müştəri qeydiyyatı eyni anda yalnız bir aktiv
sessiyanı dəstəkləyir**. İkinci cihaz və ya istifadəçi eyni qeydiyyatdan keçmiş
müştəridən istifadə edərək autentifikasiya etdikdə, backend birinci hesabın yeniləmə tokenini etibarsız edir.

Bu, başqa bir Kiro hesabının artıq daxil olduğu maşında `kiro-cli login`
işə salındıqda problemlərə səbəb olan eyni mexanizmdir — yeni giriş birinci
hesabın tokenini ləğv edir.

---

## OmniRoute bunu necə həll edir (v3.8.0+)

v3.8.0 versiyasından başlayaraq OmniRoute hər Kiro bağlantısının idxalı zamanı
`registerClient()` (AWS SSO OIDC) çağırır. Bu, hər OmniRoute bağlantısına ayrıca OIDC
müştəri qeydiyyatı verir. Hər müştəri qeydiyyatı müstəqil olduğuna görə bir hesabın
yenilənməsi və ya təkrar autentifikasiya edilməsi digər hesabların yeniləmə tokeninə təsir etmir.

İzolyasiya yeniləmə tokeninin idxalı üsullarına tətbiq olunur, API açarı ilə autentifikasiya isə
OIDC yeniləmə sessiyalarından tamamilə yayınır:

| İdxal üsulu                                                    | İzolyasiya statusu                                                                                                                           |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| AWS Builder ID / IDC cihaz-kodu axını                          | Cihaz-kodu axını təqdim ediləndən bəri izolyasiya olunub                                                                                     |
| **Tokeni İdxal Et** (yeniləmə tokeninin əl ilə daxil edilməsi) | v3.8.0 versiyasından etibarən izolyasiya olunub                                                                                              |
| **Google / GitHub sosial girişi**                              | v3.8.0 versiyasından etibarən izolyasiya olunub                                                                                              |
| **Avtomatik İdxal** (kiro-cli SQLite)                          | v3.8.0 versiyasından etibarən izolyasiya olunub (SQLite yolu artıq izolyasiya olunmuşdu; SSO keş ehtiyat variantı da indi izolyasiya olunub) |
| **API Açarı** (uzunmüddətli CodeWhisperer açarı)               | Yeniləmə sessiyası yoxdur; açar yoxlanılır və bearer giriş məlumatı kimi saxlanılır                                                          |

---

## v3.8.0-dan əvvəl yaradılmış bağlantılar üçün miqrasiya qeydi

v3.8.0-dan əvvəl idxal edilmiş bağlantıların `providerSpecificData` daxilində saxlanılan
ayrıca OIDC müştəri qeydiyyatı yoxdur. Bu bağlantılar işləməyə davam edir, lakin ortaq
sosial autentifikasiya yeniləmə son nöqtəsindən istifadə edir; bu isə iki belə bağlantının hələ də
bir-birini etibarsız edə bilməsi deməkdir.

**İzolyasiya əldə etmək üçün:** köhnə bağlantını **İdarəetmə Paneli → Provayderlər** bölməsindən silin və
dəstəklənən idxal axınlarından hər hansı biri ilə onu yenidən idxal edin. Yeni yaradılmış bütün bağlantılar
avtomatik olaraq öz müştəri qeydiyyatını əldə edəcək.

---

## İki Kiro hesabının yanaşı əlavə edilməsi

### İlkin tələblər

- OmniRoute v3.8.0 və ya daha yeni versiya.
- İşlək Kiro hesabı (e-poçt + parol, Google və ya GitHub girişi).
- İstəyə bağlı olaraq ikinci Kiro hesabı.

### Addım 1: Birinci hesabı idxal edin

1. **İdarəetmə Paneli → Provayderlər → Provayder Əlavə Et → Kiro** bölməsini açın.
2. Aşağıdakılardan birini seçin:
   - **Tokeni İdxal Et** — `aorAAAAAG` ilə başlayan yeniləmə tokenini daxil edin.
   - **API Açarı** — uzunmüddətli Kiro / CodeWhisperer API açarını daxil edin.
   - **Google / GitHub girişi** — brauzerdə OAuth axınını tamamlayın.
   - **Avtomatik İdxal** — düyməyə klikləyin; OmniRoute giriş məlumatlarını
     yerli kiro-cli verilənlər bazasından və ya `~/.aws/sso/cache` yolundan oxuyur.
3. Bağlantı saxlanılır. Yeniləmə tokeni axınları avtomatik olaraq ayrıca
   OIDC müştərisini qeydiyyatdan keçirir. API açarı axınları açarı AWS ilə yoxlayır və yeniləmə tokenini saxlamır.

### Addım 2: İkinci hesabı idxal edin

İkinci hesab üçün 1-ci addımı təkrarlayın. Hər idxal ayrıca OIDC
müştəri qeydiyyatı yaratdığına görə iki bağlantı tamamilə izolyasiya olunur.

### Addım 3: Hər iki bağlantının aktiv olduğunu yoxlayın

1. **İdarəetmə Paneli → Provayderlər** — hər iki Kiro bağlantısı **Aktiv** statusunu göstərməlidir.
2. **İdarəetmə Paneli → Sağlamlıq** — hər iki bağlantı token sağlamlığı yoxlamasından keçməlidir.

### Addım 4: Hesablar arasında yönləndirmə üçün kombinasiyadan istifadə edin

Yükü balanslaşdırmaq və ya biri əlçatan olmadıqda digərinə keçmək üçün hər iki bağlantını hədəf kimi ehtiva edən kombinasiya yaradın:

```
kiro/kiro-dev → kiro/kiro-pro
```

Kombinasiya konfiqurasiyası üçün [FEATURES.md](./FEATURES.md) faylına və yönləndirmə sənədlərinə baxın.

---

## Müəssisə / IDC İstifadəçiləri

AWS IAM Identity Center (IDC) hesabları üçün **AWS Builder ID / IDC cihaz kodu**
axınından **İdarəetmə paneli → Provayderlər → Kiro → Cihaz Kodu** yolu ilə istifadə edin. Cihaz kodu axını
həmişə tamamilə təcrid olunub. Bu bağlantılar üçün yenidən idxal tələb olunmur.

Standart olmayan AWS regionunda işləyən müəssisə istifadəçiləri Import Token API vasitəsilə
idxal edərkən regionu göstərə bilərlər:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

`region` sahəsi buraxıldıqda standart olaraq `us-east-1` istifadə edilir.

---

## API Açarının İdxal Axını

API açarı ilə autentifikasiya uzunmüddətli Kiro / AWS CodeWhisperer bearer etimadnamələri üçündür. O,
OAuth yeniləməsindən istifadə etmir və bununla da ortaq OIDC sessiyasının etibarsızlaşdırılmasının qarşısını alır.

### İdarəetmə Paneli

1. **İdarəetmə paneli -> Provayderlər -> Kiro** bölməsini açın.
2. **API Açarı** seçimini edin.
3. API açarını və istəyə bağlı AWS regionunu (standart olaraq `us-east-1`) daxil edin.
4. OmniRoute açarı yoxlayır və bağlantını yadda saxlayır.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Daxili Müqavilə

API marşrutu açarı `KiroService.validateApiKey()` çağırışı ilə yoxlayır; bu funksiya
regiona uyğun CodeWhisperer/Amazon Q son nöqtəsinə qarşı `ListAvailableProfiles` istifadə edir
və bir `profileArn` müəyyənləşdirir.

Yadda saxlanılan bağlantı aşağıdakılardan istifadə edir:

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

İcra zamanı `KiroExecutor.buildHeaders()` açarı
`Authorization: Bearer <key>` kimi göndərir və `tokentype: API_KEY` əlavə edir. Kvota/profil çağırışları
eyni markerdən istifadə edir ki, AWS bearer dəyərini OIDC və ya sosial giriş tokeni deyil,
uzunmüddətli API açarı kimi qəbul etsin.

---

## OIDC Müştərisinin İstifadə Müddətinin Bitməsi

AWS SSO OIDC ictimai müştərilərinin istifadə müddəti adətən 90 gündən sonra bitir
(`clientSecretExpiresAt`). OmniRoute müşahidə edilə bilməsi üçün bu zaman nişanını `providerSpecificData`
daxilində saxlayır. Bağlantı təxminən 90 gündən sonra yenilənməyi dayandırarsa, yeni OIDC müştəri
qeydiyyatı əldə etmək üçün bağlantını yenidən idxal edin. İstifadə müddəti bitdikdə avtomatik yenidən qeydiyyat
gələcək təkmilləşdirmə kimi izlənilir.

API açarı bağlantılarında OIDC müştərisinin istifadə müddəti bitmir, çünki onlar
AWS SSO OIDC vasitəsilə yenilənmir.

---

## Problemlərin Aradan Qaldırılması

### İkinci hesabın sessiyası davamlı bağlanır

- **İdarəetmə paneli → Provayderlər** bölməsində hər iki bağlantını yoxlayın və hər birinin xam JSON məlumatında
  (məlumat ikonası vasitəsilə görünür) null olmayan `clientId` göstərdiyini təsdiqləyin. Bağlantılardan hər hansı birində
  `clientId` yoxdursa, o, v3.8.0-dan əvvəl idxal edilib — onu yenidən idxal edin.

### İdxal "Token validation failed" xətası ilə uğursuz olur

- Yeniləmə tokeninin `aorAAAAAG` ilə başladığına əmin olun.
- OmniRoute-un `https://oidc.us-east-1.amazonaws.com` ünvanına (və ya konfiqurasiya edilmiş
  regiona) çata bildiyinə əmin olun. Korporativ proksinin arxasındasınızsa,
  **İdarəetmə paneli → Parametrlər → Proksilər** bölməsində provayder səviyyəli proksi təyin edin.

### API açarının idxalı uğursuz olur

- Açarın yeniləmə tokeni deyil, Kiro / CodeWhisperer API açarı olduğunu təsdiqləyin.
- AWS regionunun açara/hesaba uyğun olduğunu təsdiqləyin. Standart dəyər `us-east-1`-dir.
- Açar `ListAvailableProfiles` çağırışını edə bilməlidir; əks halda OmniRoute tələb olunan
  `profileArn` dəyərini müəyyənləşdirə bilməz.

Digər problemlər üçün əsas [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) faylına baxın.
