# Management Authentication (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute, yönetim rotalarını yetkilendirebilen **dört kimlik bilgisi ailesine** sahiptir.
Bunlar birbirinin yerine kullanılamaz. Çıkarım API anahtarları (`sk-…`), açıkça `manage` veya `admin` kapsamı verilmedikçe sunucuyu yönetmez.

Kanonsal uygulama: `src/lib/api/requireManagementAuth.ts`.

| Kimlik Bilgisi               | Tipik biçim                             | Oluşturulduğu yer                                          | Amaçlanan kullanım         | Yönetim yeteneği                                                                      |
| :--------------------------- | :-------------------------------------- | :--------------------------------------------------------- | :------------------------- | :------------------------------------------------------------------------------------ |
| Kontrol Paneli JWT oturumu   | `auth_token` çerezi                     | Kontrol Paneli girişi                                      | Tarayıcı kullanıcı arayüzü | CSRF, yerellik ve her zaman korunan rota kurallarına tabi tam kontrol paneli yönetimi |
| CLI makine kimliği belirteci | dahili / yerel                          | CLI önyüklemesi (aynı makinede `omniroute`)                | Yerel CLI                  | Yalnızca yerel yönetim                                                                |
| Kapsamlı Erişim Belirteci    | `oma_live_…`                            | **Ayarlar → Erişim Belirteçleri** veya `omniroute connect` | Uzak CLI ve yönetim API'si | Rotanın gerekli `read`, `write` veya `admin` kapsamını karşılamalıdır                 |
| Çıkarım API anahtarı         | `sk-…` (ve diğer API anahtarı önekleri) | **API Yöneticisi / API Anahtarları**                       | `/v1/*` çıkarım            | Anahtar meta verileri `manage` veya `admin` içermiyorsa **Yoktur**                    |

`oma_` kimlik bilgileri yönetim/CLI kimlik bilgileridir. Bunlar çıkarım API anahtarları **değildir**.

Sunucu için oturum açma/API anahtarı kimlik doğrulaması devre dışı bırakılırsa, bazı yönetim rotaları kimliği doğrulanmamış çağrıları kabul edebilir. Yalnızca yerel ve her zaman korunan rotalar kendi kurallarını uygulamaya devam eder. Bu nedenle, bu kimlik bilgilerinden birini sunmak evrensel olarak zorunlu değildir ve birine sahip olmak, gerekli kapsam ve rota yerelliği olmadan evrensel olarak yeterli değildir.

İlgili: [Uzak Mod](./REMOTE-MODE.md) (`oma_live_…` uzak bir CLI için nasıl oluşturulur).

---

## Kapsam matrisleri

API anahtarı yönetimi kapsamları ve erişim belirteci kapsamları farklı kelime dağarcıklarıdır.
MCP aracı kapsamları, aşağıdaki tablolardaki işlevlerden ziyade `scopeMatches` ile kontrol edilen üçüncü bir kelime dağarcığıdır.
Yan yana: [Üç kapsam ad alanı](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Erişim Belirteci kapsamları (`oma_live_…`)

| Kapsam  | Tipik işlemler                                                                |
| ------- | ----------------------------------------------------------------------------- |
| `read`  | Belirtecin görmesine izin verilen listeleme/durum GET'leri                    |
| `write` | Yöneticinin altındaki mutasyonlar (oluşturma/güncelleme/silme)                |
| `admin` | Tam uzaktan CLI / bağlantı belirteci (parola önyükleme varsayılanları burada) |

`read` yetkisine sahip bir belirteç, `write` rotasını çağıramaz. Çalışma zamanı mesajı şekli:
`Erişim belirteci kapsamı '<have>' yetersiz; '<need>' gerekli.`

### API anahtarı yönetimi kapsamları

| Kapsam   | Anlamı                                                                               |
| -------- | ------------------------------------------------------------------------------------ |
| (yok)    | Yalnızca çıkarım. Yönetim rotaları 403 döndürür.                                     |
| `manage` | Yönetim API'si (`requireManagementAuth` API anahtarı dalı ile aynı geçit)            |
| `admin`  | Ayrıca `hasManageScope`'u da karşılar (yönetim yeteneğine sahip olarak kabul edilir) |

API Anahtarları / API Yöneticisi kullanıcı arayüzünde anahtarda `manage` özelliğini etkinleştirin. Bu kapsamı bilerek vermediğiniz sürece, bir sohbet istemcisi anahtarını otomasyon için yeniden kullanmayın.

---

## Oluşturma ve iptal etme

### Dashboard JWT oturumu

1. `/login` sayfasını açın ve yönetim parolasıyla oturum açın (ilk başlatmada `INITIAL_PASSWORD`).
2. `auth_token` çerezi HttpOnly'dir. Tarayıcı dashboard'u bunu otomatik olarak kullanır.
3. `/api/auth/logout` üzerinden oturumu kapatın. Kopyalanacak uzun ömürlü bir gizli bilgi yoktur.

### CLI makine kimliği belirteci

1. Sunucuyla **aynı ana makinede** `omniroute` komutunu çalıştırın (geri döngü).
2. CLI, `~/.omniroute/` altında bir makine kimliği belirteci oluşturur (chmod 600).
3. Bu, başka bir makineden **çalışmaz**. Uzak CLI için bir Erişim Belirteci kullanın.

### Kapsamlı Erişim Belirteci (`oma_live_…`)

1. Dashboard: **Ayarlar → Erişim Belirteçleri** → oluşturun (ad + kapsam). **Gizli değer yalnızca bir kez gösterilir.**
2. Alternatif olarak CLI: `omniroute connect <host>` (parola → belirteç). Bkz. [Uzak Mod](./REMOTE-MODE.md).
3. Üstbilgi: `Authorization: Bearer oma_live_…`
4. Aynı Erişim Belirteçleri sayfasından iptal edin (veya CLI bağlamını silin).
5. Sunucu yalnızca bir karma değer saklar. Düz metin değeri bir parola gibi koruyun.

### `manage` kapsamlı API anahtarı

1. Dashboard: **API Yöneticisi / API Anahtarları** → bir anahtar oluşturun veya düzenleyin → `manage` (ya da `admin`) kapsamını etkinleştirin.
2. Üstbilgi: `Authorization: Bearer sk-…` (anahtarın gerçek öneki).
3. Aynı kullanıcı arayüzünde anahtarı iptal edin veya `manage` kapsamını kaldırın.
4. CLI olmayan otomasyonlar için en düşük ayrıcalık ilkesini uygulayın: yalnızca GET kullanan işler için `read` kapsamlı bir Erişim Belirtecini tercih edin; bir API anahtarında `manage` kapsamını yalnızca çağıranın hem `/v1` hem de yönetim API'siyle iletişim kurması gerektiğinde kullanın.

---

## Üst bilgi biçimi

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Yönetim kimlik bilgilerini URL yoluna veya sorgu dizesine koymayın. Yönetim kimlik doğrulaması yalnızca üst bilgi/çerez üzerinden yapılır.

---

## Kopyalayıp yapıştırılabilir örnekler

Salt okunur (sağlayıcıları listeleme). Bir `read` Erişim Belirteci kullanın:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Değişiklik yapma (sağlayıcı bağlantısı oluşturma). `write`/`admin` Erişim Belirteci veya `manage` kapsamlı bir API anahtarı kullanın:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Çıkarım (yönetim değildir). Sıradan bir API anahtarı kullanın; `manage` gerekli değildir:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Mevcut çalışma zamanı hataları (gizli bilgileri yansıtmayın)

| Durum                                           | Tipik durum | Mesaj (temizlenmiş)                                                  |
| :---------------------------------------------- | :---------- | :------------------------------------------------------------------- |
| Kimlik bilgisi yok                              | 401         | `Authentication required`                                            |
| Geçersiz/süresi dolmuş `oma_live_…`             | 401         | `Invalid or expired access token`                                    |
| `manage`/`admin` olmadan geçerli API anahtarı   | 403         | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Yönetim rotasında geçersiz sıradan API anahtarı | 403         | `Invalid management token`                                           |
| Erişim Jetonu kapsamı çok düşük                 | 403         | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" (Geçersiz yönetim jetonu) ifadesi, taşıyıcının bir yönetim kimlik bilgisi olarak kabul edilmediği anlamına gelir. Hangi ailenin basılacağını size söylemez. Yukarıdaki tabloyu kullanın: çıkarım anahtarları `manage` kapsamına ihtiyaç duyar; uzak CLI `oma_live_…`'ye ihtiyaç duyar; kontrol paneli oturum çerezini kullanır.

---

## Önerilen en az ayrıcalıklı seçim

| Arayan                                            | Kullanım                                               |
| ------------------------------------------------- | ------------------------------------------------------ |
| Tarayıcı                                          | Kontrol paneli oturumu                                 |
| Sunucu ana bilgisayarındaki CLI                   | Makine belirteci                                       |
| Uzak sunucuyla konuşan dizüstü bilgisayardaki CLI | `omniroute connect`'ten `oma_live_…`                   |
| CI / betikler (yalnızca yönetim)                  | Çalışan en küçük kapsamlı `oma_live_…`                 |
| Hem `/v1` hem de `/api` çağırması gereken CI      | `manage` **veya** iki kimlik bilgisi olan API anahtarı |
