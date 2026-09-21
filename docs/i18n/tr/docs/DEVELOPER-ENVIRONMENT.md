# Developer environment notes (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

Bu sayfa, projenin yerel `.env` davranışını ve OmniRoute geliştirilirken ortam dosyaları ile gizli bilgilerin nasıl yönetileceğini açıklar.

## .env postinstall davranışı

Proje, geliştiricilere kolaylık sağlamak amacıyla `npm install` / `postinstall` sırasında yerel bir `.env` dosyası oluşturabilir. Bu dosya yalnızca yerel geliştirme ve test amaçlıdır ve hiçbir zaman sürüm kontrolüne kaydedilmemelidir.

Önemli noktalar:

- Deponun `.gitignore` dosyası `.env*` dosyalarını zaten yok sayar (`.gitignore` girdisine bakın). Belirli bir örnek dosyayı bilinçli olarak kaydetmeyi amaçlamadığınız ve bunun için belgelenmiş bir süreciniz olmadığı sürece bu kuralı kaldırmayın veya değiştirmeyin.
- Gerçek bir gizli bilgi yanlışlıkla depoya kaydedilirse kimlik bilgisini hemen yenileyin/iptal edin ve depo geçmişinden kaldırın (örneğin, `git filter-repo` veya eşdeğer bir düzeltme iş akışı kullanarak). Yardıma ihtiyacınız varsa güvenlik sorumlusu/iletişim yetkilisiyle irtibata geçin.
- CI ve üretim ortamlarında gizli bilgileri dosyalara kaydetmek yerine CI gizli bilgilerini veya bir gizli bilgi yöneticisini (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault vb.) kullanın.

## Önerilen yerel iş akışı

- `.env` dosyasını yalnızca yerel çalışma alanınızda tutun. Gerekli değişkenleri ve kabul edilebilir örnek değerleri belgelemek için `.env.example` dosyasını (zaten izlenmektedir) kullanın.
- Yerel olarak gizli bilgi benzeri değerler gerektiren testleri çalıştırırken gerçek kimlik bilgileri yerine sentetik yer tutucuları veya çalışma zamanında oluşturulan geçici anahtarları tercih edin.
- Yer tutucu kullanan testlere kısa bir yorum ekleyerek inceleyenlerin test verisinin sentetik olduğunu anlamasını sağlayın.

## Tarayıcı notları

- Bazı derlenmiş veya ikili varlıklar (ör. gömülü base64 WASM blobları), kimlik bilgilerine benzeyen ASCII alt dizeleri içerebilir ve metin tabanlı gizli bilgi tarayıcılarını tetikleyebilir. Bu varlıklar meşruysa bunları tarayıcının izin verilenler listesine ekleyin veya ilgili dizinleri tarayıcı yapılandırmasında hariç tutun.

## Bir sızıntı bulursanız

1. Anahtarı hemen yenileyin/iptal edin.
2. Gizli bilgiyi geçmişten kaldırın ve gerekirse temizlenmiş dalı zorla gönderin.
3. Bakım sorumlularını bilgilendirin ve kuruluşunuzun olay müdahale kontrol listesini izleyin.
