# Management Authentication (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute idarəetmə marşrutlarını avtorizasiya edə bilən **dörd etimadnamə ailəsinə** malikdir.
Onlar bir-birini əvəz etmir. İnferensiya API açarları (`sk-…`) açıq şəkildə
`manage` və ya `admin` əhatə dairəsi verilmədiyi halda serveri **idarə etmir**.

Kanonik implementasiya: `src/lib/api/requireManagementAuth.ts`.

| Etimadnamə                    | Tipik format                            | Harada yaradılır                                            | Nəzərdə tutulan istifadə     | İdarəetmə imkanı                                                                                 |
| ----------------------------- | --------------------------------------- | ----------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------ |
| İdarə panelinin JWT sessiyası | `auth_token` kukisi                     | İdarə panelinə giriş                                        | Brauzer interfeysi           | CSRF, lokallıq və həmişə qorunan marşrut qaydaları nəzərə alınmaqla tam idarə paneli idarəetməsi |
| CLI maşın ID-si tokeni        | daxili / lokal                          | CLI ilkin quraşdırması (eyni maşında `omniroute`)           | Lokal CLI                    | Yalnız lokal idarəetmə                                                                           |
| Əhatə dairəli Giriş Tokeni    | `oma_live_…`                            | **Parametrlər → Giriş Tokenləri** və ya `omniroute connect` | Uzaq CLI və idarəetmə API-si | Marşrutun tələb etdiyi `read`, `write` və ya `admin` əhatə dairəsini təmin etməlidir             |
| İnferensiya API açarı         | `sk-…` (və digər API açarı prefiksləri) | **API Meneceri / API Açarları**                             | `/v1/*` inferensiyası        | Açarın metadatasına `manage` və ya `admin` daxil deyilsə, **heç biri**                           |

`oma_` etimadnamələri idarəetmə/CLI etimadnamələridir. Onlar inferensiya API açarları **deyil**.

Server üçün giriş/API açarı autentifikasiyası deaktiv edilibsə, bəzi idarəetmə marşrutları
autentifikasiya olunmamış çağırışları qəbul edə bilər. Yalnız lokal və həmişə qorunan marşrutlar
yenə də öz qaydalarını tətbiq edir. Buna görə də bu etimadnamələrdən birini təqdim etmək bütün
hallarda məcburi deyil və tələb olunan əhatə dairəsi və marşrut lokallığı olmadan ona sahib olmaq
da bütün hallarda kifayət etmir.

Əlaqəli: [Uzaq Rejim](./REMOTE-MODE.md) (uzaq CLI üçün `oma_live_…` tokeninin necə yaradıldığı).

---

## Əhatə dairəsi matrisləri

Bu iki əhatə dairəsi lüğəti **fərqlidir**. Onları qarışdırmayın.

### Giriş Tokeninin əhatə dairələri (`oma_live_…`)

| Əhatə dairəsi | Tipik əməliyyatlar                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| `read`        | Tokenin görməsinə icazə verilən siyahı/status GET sorğuları                                            |
| `write`       | Admin səviyyəsindən aşağı dəyişikliklər (yaratma/yeniləmə/silmə)                                       |
| `admin`       | Tam uzaq CLI / qoşulma tokeni (parol vasitəsilə ilkin quraşdırmada standart olaraq bu istifadə edilir) |

`read` əhatə dairəsinə malik token `write` marşrutunu çağıra bilməz. İcra zamanı mesajın formatı:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API açarının idarəetmə əhatə dairələri

| Əhatə dairəsi | Mənası                                                                               |
| ------------- | ------------------------------------------------------------------------------------ |
| (yoxdur)      | Yalnız inferensiya. İdarəetmə marşrutları 403 qaytarır.                              |
| `manage`      | İdarəetmə API-si (`requireManagementAuth` API açarı qolu ilə eyni yoxlama mexanizmi) |
| `admin`       | Həmçinin `hasManageScope` tələbini ödəyir (idarəetmə qabiliyyətli hesab edilir)      |

API Açarları / API Meneceri interfeysində açar üçün `manage` əhatə dairəsini aktivləşdirin.
Bu əhatə dairəsini məqsədli şəkildə verməmisinizsə, avtomatlaşdırma üçün çat klientinin açarını təkrar istifadə etməyin.

---

## Necə yaratmalı və ləğv etməli

### İdarə panelinin JWT sessiyası

1. `/login` səhifəsini açın, idarəetmə parolu ilə daxil olun (ilk işəsalmada `INITIAL_PASSWORD`).
2. `auth_token` kukisi HttpOnly-dır. Brauzerdəki idarə paneli ondan avtomatik istifadə edir.
3. `/api/auth/logout` vasitəsilə çıxış edin. Kopyalanacaq uzunmüddətli sirr yoxdur.

### CLI maşın ID-si tokeni

1. Serverlə **eyni hostda** `omniroute` işə salın (loopback).
2. CLI, `~/.omniroute/` daxilində maşın ID-si tokeninin ilkin quraşdırmasını həyata keçirir (chmod 600).
3. Bu, başqa maşından **işləmir**. Uzaq CLI üçün Giriş Tokenindən istifadə edin.

### Əhatə dairəli Giriş Tokeni (`oma_live_…`)

1. İdarə paneli: **Parametrlər → Giriş Tokenləri** → yaradın (ad + əhatə dairəsi). **Sirr yalnız bir dəfə göstərilir.**
2. Və ya CLI: `omniroute connect <host>` (parol → token). [Uzaq Rejim](./REMOTE-MODE.md) bölməsinə baxın.
3. Başlıq: `Authorization: Bearer oma_live_…`
4. Eyni Giriş Tokenləri səhifəsindən ləğv edin (və ya CLI kontekstini silin).
5. Server yalnız heşi saxlayır. Açıq mətni parol kimi qoruyun.

### `manage` əhatə dairəli API açarı

1. İdarə paneli: **API Meneceri / API Açarları** → açar yaradın və ya redaktə edin → `manage` (və ya `admin`) aktivləşdirin.
2. Başlıq: `Authorization: Bearer sk-…` (açarın faktiki prefiksi).
3. Eyni interfeysdə açarı ləğv edin və ya `manage` əhatə dairəsini silin.
4. CLI olmayan avtomatlaşdırmalar üçün ən az imtiyaz prinsipinə əməl edin: yalnız GET tapşırıqları üçün `read` Giriş Tokeninə üstünlük verin; API açarında `manage` əhatə dairəsindən yalnız çağıran tərəf həm `/v1`, həm də idarəetmə ilə işləməli olduqda istifadə edin.

---

## Başlıq formatı

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

İdarəetmə giriş məlumatlarını URL yoluna və ya sorğu sətrinə daxil etməyin. İdarəetmə autentifikasiyası yalnız başlıq/kuki vasitəsilə həyata keçirilir.

---

## Kopyalayıb istifadə edilə bilən nümunələr

Yalnız oxuma (provayderləri siyahılamaq). `read` Access Token istifadə edin:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Dəyişiklik etmək (provayder bağlantısı yaratmaq). `write`/`admin` Access Token və ya `manage` əhatəli API açarından istifadə edin:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

İnferensiya (idarəetmə deyil). Adi API açarı; `manage` tələb olunmur:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Cari icra mühiti xətaları (məxfi məlumatları təkrarlamayın)

| Vəziyyət                                      | Tipik status | Mesaj (məxfi məlumatlardan təmizlənmiş)                              |
| --------------------------------------------- | ------------ | -------------------------------------------------------------------- |
| Giriş məlumatı yoxdur                         | 401          | `Authentication required`                                            |
| Etibarsız/müddəti bitmiş `oma_live_…`         | 401          | `Invalid or expired access token`                                    |
| `manage`/`admin` olmadan etibarlı API açarı   | 403          | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| İdarəetmə marşrutunda etibarsız adi API açarı | 403          | `Invalid management token`                                           |
| Access Token əhatəsi kifayət qədər deyil      | 403          | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" daşıyıcının idarəetmə giriş məlumatı kimi **qəbul edilmədiyini** bildirir. Bu, hansı növ giriş məlumatı yaratmalı olduğunuzu **bildirmir**. Yuxarıdakı cədvəldən istifadə edin: inferensiya açarlarına `manage` əhatəsi lazımdır; uzaq CLI üçün `oma_live_…` tələb olunur; idarə paneli isə sessiya kukisindən istifadə edir.

---

## Tövsiyə olunan ən az imtiyazlı seçim

| Çağıran tərəf                              | İstifadə ediləcək vasitə                                |
| ------------------------------------------ | ------------------------------------------------------- |
| Brauzer                                    | İdarə paneli sessiyası                                  |
| Server hostundakı CLI                      | Maşın tokeni                                            |
| Uzaq serverlə əlaqə quran noutbukdakı CLI  | `omniroute connect` vasitəsilə əldə edilən `oma_live_…` |
| CI / skriptlər (yalnız idarəetmə)          | İşləyən ən kiçik əhatəyə malik `oma_live_…`             |
| Həm `/v1`, həm də `/api` çağırmalı olan CI | `manage` əhatəli API açarı **və ya** iki giriş məlumatı |
