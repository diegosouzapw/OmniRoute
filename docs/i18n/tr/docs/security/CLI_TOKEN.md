# CLI Machine-ID Token (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Genel Bakış

OmniRoute CLI komutları, `x-omniroute-cli-token` istek üstbilgisi üzerinden
gönderilen bir `HMAC-SHA256(machine-id, salt)` belirteci kullanarak yerel yönetim
API'sinde kimlik doğrulaması yapar.

Bu, CLI alt komutlarının (`omniroute status`, `omniroute providers` vb.) her
çalıştırmada kullanıcının bir JWT veya parola sağlamasına gerek kalmadan yönetim
uç noktalarını çağırmasına olanak tanır.

## Nasıl çalışır?

1. `getMachineTokenSync()`, `node-machine-id` aracılığıyla donanım makine
   kimliğini okur (başarısızlık durumunda boş bir dizeye geri döner ve CLI kimlik
   doğrulamasını devre dışı bırakır).
2. `HMAC-SHA256(machine_id, salt)` değerini hesaplar ve bu makineye bağlı,
   belirlenimsel ve geri döndürülemez bir belirteç olan 64 karakterlik tam onaltılık
   özeti döndürür.
3. CLI, belirteci yalnızca çözümlenen hedef açık bir geri döngü URL'si
   (`localhost`, `127.0.0.0/8` veya geri döngü IPv6) olduğunda
   `x-omniroute-cli-token` olarak gönderir. Belirteci taşıyan istekler
   `redirect: error` kullanır; böylece yerel bir yönlendirme belirteci başka bir
   kaynağa iletemez. Uzak bağlamlar bunun yerine kapsamlı erişim belirteçlerini
   kullanır. Türetme kullanılamıyorsa CLI üstbilgiyi atlar ve `omniroute doctor`,
   boş bir belirteci geçerli saymak yerine hatayı bildirir.
4. Sunucu (`src/server/authz/policies/management.ts`), aynı salt değerini
   kullanarak beklenen belirteci yeniden hesaplar ve zamanlamaya dayalı çıkarımı
   önlemek için `timingSafeEqual` aracılığıyla karşılaştırır.

## Güvenlik özellikleri

| Özellik                          | Ayrıntı                                                                                                                                                                                                              |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Yalnızca geri döngü**          | Yalnızca sunucunun güvenilir eş yerelliği damgası (gerçek TCP eş adresinden türetilir) geri döngüyü gösterdiğinde kabul edilir. İstemci tarafından kontrol edilen `Host` üstbilgisine yerellik için asla güvenilmez. |
| **Sabit zamanlı karşılaştırma**  | `crypto.timingSafeEqual`, zamanlama saldırılarını önler.                                                                                                                                                             |
| **Geri döndürülemez**            | HMAC çıktısından makine kimliği elde edilemez.                                                                                                                                                                       |
| **`always` korumasını aşma yok** | `isAlwaysProtectedPath()`, CLI belirteci kontrolünden önce değerlendirilir. `/api/shutdown` ve `/api/settings/database` her zaman JWT gerektirir.                                                                    |
| **Dışa aktarılamaz**             | Belirteç hiçbir zaman diske yazılmaz veya günlüğe kaydedilmez.                                                                                                                                                       |

## Varsayılan salt (kurulum başına rastgele)

`OMNIROUTE_CLI_SALT` ayarlanmadığında salt, bir kez oluşturulan ve
`<DATA_DIR>/cli-token-salt.json` konumunda (`0600` moduyla) kalıcı olarak saklanan
rastgele 64 karakterlik bir onaltılık dizedir; depoya eklenmiş sabit
`omniroute-cli-auth-v1` değeri değildir. Hem `src/lib/machineToken.ts` içindeki
`getActiveSalt()` hem de `bin/cli/utils/cliToken.mjs` içindeki karşılığı aynı
dosyayı okur; böylece sunucu ve bu kurulumdaki her CLI çağrısı aynı değerde
uzlaşır. Depoya eklenmiş sabit değer yalnızca henüz kalıcı veya ortam değişkeni
tabanlı bir salt oluşturulamadığında son çare olarak kullanılır (örneğin, sunucu
daha önce hiç çalıştırılmadan önceki yeni bir yalnızca-CLI kurulumu). Bu, eski
sabit varsayılanın zayıflığını giderir: `/etc/machine-id` genellikle herkes
tarafından okunabilir olduğundan, aksi takdirde herhangi bir yerel kullanıcı
`OMNIROUTE_CLI_SALT` değerinin hiç ayarlanmadığı her kurulum için aynı belirteci
türetebilirdi.

## Salt rotasyonu

Türetilmiş token'ı kod değişikliği yapmadan döndürmek için `OMNIROUTE_CLI_SALT` değerini ayarlayın — bu değer, kurulum başına kalıcı olarak saklanan salt değerine her zaman göre önceliklidir. Rotasyondan sonra bu makinedeki tüm CLI işlemleri yeni token'ı otomatik olarak kullanır. Önceki türetilmiş değeri açığa çıkarmış olabilecek bir işlem listesi sızıntısından sonra kullanışlıdır.

```bash
# Kalıcı rotasyon (kabuk profiline ekleyin)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Yeni token'ın kullanıldığını doğrulayın
omniroute status
```

## Eski biçim (SHA-256, 32 karakter) — hâlâ kabul ediliyor

Yukarıdaki HMAC biçiminden önce CLI, token'ını
`bin/cli/utils/cliToken.mjs` içinde (`src/lib/machineToken.ts` dosyasındaki
`getLegacyCliTokenSync`) `SHA-256(machineId + salt).hex[0..32]` (32 karakterlik bir
önek) olarak türetiyordu.

Geriye dönük uyumluluk için sunucu **her iki** biçimi de kabul eder: doğrulayıcı
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` oluşturur ve gelen
üstbilgiyi `timingSafeEqual` ile her biriyle karşılaştırır
(`src/server/authz/policies/management.ts` ve `src/lib/middleware/cliTokenAuth.ts`).
Dolayısıyla bir token, 64 karakterlik HMAC özetiyle **veya** 32 karakterlik eski
SHA-256 önekiyle eşleşirse geçerlidir.

**Devre dışı bırakma:** CLI token mekanizmasını tamamen devre dışı bırakmak için
`OMNIROUTE_DISABLE_CLI_TOKEN=true` değerini (`env` veya `.env` içinde) ayarlayın;
bundan sonra tüm erişimler açıkça belirtilmiş bir API anahtarı gerektirir. Çok
kullanıcılı ana makinelerde bu önerilir; çünkü `machine-id` kullanıcı başına değil,
cihaz başınadır ve aynı ana makinedeki başka bir kullanıcı aynı token'ı hesaplayabilir.

## Dosyalar

| Dosya                                     | Amaç                                              |
| ----------------------------------------- | ------------------------------------------------- |
| `src/lib/machineToken.ts`                 | Token türetme (`getMachineTokenSync`)             |
| `bin/cli/utils/cliToken.mjs`              | Aynı türetmenin CLI tarafındaki karşılığı         |
| `<DATA_DIR>/cli-token-salt.json`          | Kurulum başına kalıcı rastgele salt               |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` sabiti                         |
| `src/server/authz/policies/management.ts` | Sunucu tarafı doğrulama                           |
| `src/server/authz/routeGuard.ts`          | Geri döngü ana makine denetimi (`isLoopbackHost`) |

## Ayrıca bkz.

- `docs/security/ROUTE_GUARD_TIERS.md` — rota koruma katmanları
- `docs/architecture/AUTHZ_GUIDE.md` — eksiksiz yetkilendirme işlem hattı
