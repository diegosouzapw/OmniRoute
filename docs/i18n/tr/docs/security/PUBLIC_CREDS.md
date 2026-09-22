# Public Credentials Handling (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Tek doğruluk kaynağı:** `open-sse/utils/publicCreds.ts`
> **Testler:** `tests/unit/publicCreds.test.ts`
> **Son güncelleme:** 2026-08-07 — v3.8.50
> **Hedef kitle:** Herkese açık CLI'larında herkese açık OAuth client_id / client_secret / Firebase Web API anahtarları sunan sağlayıcıları entegre eden mühendisler.
> **Durum:** Yukarı akış tanımlayıcılarını gömen tüm yeni kodlar için **ZORUNLUDUR**.

## Bunun var olma nedeni

- [Yerel uygulamalar için OAuth 2.0 (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — Yüklü uygulamalara ait OAuth client_id / client_secret değerleri herkese açıktır; gerçek güvenliği PKCE sağlar.
- [Firebase API anahtarları](https://firebase.google.com/docs/projects/api-keys) — Web istemcisi tanımlayıcıları tasarım gereği herkese açıktır.

OmniRoute, `.env` yapılandırmayan kullanıcıların da kullanıma hazır, çalışan bir OAuth akışına sahip olabilmesi için bu değerleri gömmelidir. Gömülü bir geri dönüş değeri olmadan Gemini / Antigravity sağlayıcıları, "yalnızca klonla ve çalıştır" yolunu izleyen tüm kullanıcılar için çalışmayı durdurur.

Ancak `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` gibi değişmez değerler **GitHub Secret Scanning**, **Semgrep** ve benzer örüntü tarayıcıları tarafından eşleştirilir. Her sürüm, gürültülü bir yanlış pozitif akışına dönüşür; push koruması meşru commit'leri engeller ve operatörler uyarı akışına güvenmemeye başlar.

`open-sse/utils/publicCreds.ts` yardımcısı her iki kısıtı da aynı anda çözer:

- Herkese açık tanımlayıcıyı **XOR ile maskelenmiş bir bayt dizisi** olarak gömer (kaynakta tarayıcı örüntüsü bulunmaz).
- Çalışma zamanında `decodePublicCred` / `resolvePublicCred` aracılığıyla çözer.
- İyi bilinen önekleri (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) zaten izleyen ham değerleri algılar ve değiştirmeden geçirir; böylece mevcut `.env` dosyalarında ham değerler bulunan kullanıcılar **sıfır geçiş işlemiyle** çalışmaya devam eder.

Bu, **gizleme işlemidir; şifreleme değildir.** Kaynak kodu okuyan herkes değeri geri elde edebilir — değer tasarım gereği herkese açık olduğundan bunda bir sakınca yoktur. Tek amaç, tarayıcı regex eşleşmelerini önlemektir.

## Zorunlu örüntü

### 1. Yeni bir herkese açık kimlik bilgisi ekleme

Şu özelliklere sahip, yukarı akış tarafından sağlanan yeni bir değeri gömmeniz gerektiğinde:

- herkese açık bir CLI / masaüstü uygulaması / tarayıcı paketinden geliyorsa, **ve**
- yukarı akış sağlayıcısı bunu herkese açık bir istemci tanımlayıcısı olarak belgeliyor (veya bu şekilde değerlendiriyor) ise, **ve**
- aksi hâlde bir örüntü tarayıcısı bunu eşleştirecekse (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` vb.),

…şu kontrol listesini izleyin:

1. Maskelenmiş bayt dizisini oluşturun:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. `open-sse/utils/publicCreds.ts` içindeki `EMBEDDED_DEFAULTS` öğesine **tarafsız bir anahtar adıyla** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` vb.) yeni bir girdi ekleyin. Yardımcıda `client_secret` veya `api_key` gibi adlar **kullanmayın** — bu sözcükler Semgrep genel gizli bilgi kurallarını tetikler.

3. Herkese açık tür birleşimine bir `keyof typeof EMBEDDED_DEFAULTS` ekleyin (bu, otomatik olarak çıkarımlanır).

4. Tüketici kodunda sabit kodlanmış değişmez değeri şununla değiştirin:

   ```ts
   // tek ortam değişkeni geçersiz kılması
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // birden fazla ortam değişkeni takma adı (boş olmayan ilk değer kazanır)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // ortam değişkeni geçersiz kılması yok (her zaman gömülü varsayılan)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Değişmez değeri `.env.example` dosyasından kaldırın (okuyucuları buraya yönlendiren, yalnızca yorumlardan oluşan belgelerle değiştirin):

   ```dotenv
   # ── Sağlayıcı (Google / Firebase / vb.) ──
   # Herkese açık OAuth kimlik bilgileri kodun içine
   # open-sse/utils/publicCreds.ts aracılığıyla gömülür. Bu değişkenleri yalnızca kendi değerlerinizi kullanmak için ayarlayın.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Yeni anahtar için bir şekil doğrulaması eklemek üzere `tests/unit/publicCreds.test.ts` dosyasını güncelleyin (değişmez değeri değil, biçimi doğrulayın — örüntü için mevcut testlere bakın).

7. Test dosyalarına `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` değişmez değerlerini **asla** eklemeyin. `.join("")` parçalarından oluşturulan `FAKE_*` sabitlerini kullanın (mevcut testlere bakın).

### 2. Tüketiciler

- **Yalnızca `resolvePublicCred()` / `resolvePublicCredMulti()` üzerinden okuyun** — yardımcının dışında hiçbir zaman doğrudan `decodePublicCredBytes()` çağırmayın.
- Yardımcı, kasıtlı olarak düşük maliyetlidir (doğrusal bayt XOR işlemi) ve modül yükleme zamanında güvenle çağrılabilir; varsayılanlar bir kez hesaplanır.
- Ortam değişkeni geçersiz kılması her zaman önceliklidir. Bir kullanıcı `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` ayarlarsa yardımcı, bu ham değeri doğrudan ve değiştirmeden geçirir.

### 3. Yasak örüntüler

❌ Üretim kodunda (`src/`, `open-sse/`, `electron/`, `bin/`) aşağıdakilerden herhangi birini **asla** yapmayın:

```ts
// KÖTÜ: değişmez değer Secret Scanning + Semgrep'i tetikler
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// KÖTÜ: değişmez değerin base64 biçimi — GitHub, Şubat 2025'ten beri bunu da algılıyor
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// KÖTÜ: örüntüyü çalışma zamanında yeniden birleştiren dize birleştirme
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// KÖTÜ: hex/ROT13 kodlaması — farklı gizleme, aynı algılanma riski
clientSecret: hexDecode("474f4353..."),
```

Bunların tümü eninde sonunda bir tarayıcıyı tetikler. `resolvePublicCred()` kullanın.

❌ `.env.example` dosyasına değişmez kimlik bilgilerini **asla** eklemeyin. Gerçek yukarı akış değerlerine ihtiyaç duyan kullanıcılar bunları herkese açık CLI'dan kendileri çıkarabilir veya kendi OAuth kayıtlarını kullanabilir.

❌ Kimlik bilgisinin bu yardımcıya taşınması gerekip gerekmediğini kontrol etmeden yeni bir gizli bilgi tarama uyarısını **asla** göz ardı etmeyin.

## İlgili kontroller

- `publicCreds.ts` içindeki `RAW_VALUE_PATTERN`, doğrudan aktarımı tetikleyen önekleri listeler (geriye dönük uyumluluk). Bunu yalnızca belgelenmiş herkese açık kimlik bilgisi biçimleri için genişletin; tescilli gizli bilgiler için asla genişletmeyin.
- `.env.example`, CI'ın `check-env-doc-sync` betiği tarafından denetlenir — buradan bir değişkeni kaldırdığınızda belgelerin de buna uygun olduğundan emin olun.
- Hem `npm run test:vitest` hem de `node --import tsx/esm --test tests/unit/publicCreds.test.ts` test paketleri başarılı kalmalıdır.

## Bu yardımcı ne zaman KULLANILMAMALI

Bu yardımcı **yalnızca** şu niteliklere sahip kimlik bilgileri içindir:

1. Üst sağlayıcı tarafından herkese açık olarak dağıtılanlar (CLI ikili dosyası, tarayıcı paketi, resmi belgeler).
2. Gizli olmadığı belgelenen veya güçlü şekilde ima edilenler (PKCE korumalı, Firebase Web anahtarı veya benzeri).

Bunların dışındaki her şey — operatör tarafından verilen token'lar, kiracı başına gizli bilgiler, kendi OAuth uygulamanızın client_secret değeri, şifreleme anahtarları, JWT gizli bilgileri, veritabanı parolaları — için **yalnızca ortam değişkenlerini** (`process.env.FOO`, boş değere `||` geri dönüşü / açık hata) kullanın. Bunlar kaynak kodda değil, `.env` dosyasında ve [şifrelenmiş kimlik bilgileri deposunda](./COMPLIANCE.md) bulunmalıdır.

## Referanslar

- [Google: Yerel uygulamalar için OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: İstemci tanımlaması için API anahtarları](https://firebase.google.com/docs/projects/api-keys)
- [GitHub Secret Scanning tarafından desteklenen gizli bilgiler](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: token'lar için base64 algılama (Şubat 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Bu yardımcıyı kullanıma sunan commit: `1a39c31f` — _fix(security): herkese açık üst sağlayıcı kimlik bilgilerini maskeleme + hata temizlemeyi merkezileştirme_
