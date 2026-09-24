# Cursor Provider in Docker Environments (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

OmniRoute Docker içinde çalıştığında, container ana makinedeki Cursor
kurulumunu göremediği için eski **Cursor IDE'den İçe Aktar** /
`cursor-agent` akışları başarısız olur. Bunun yerine **Cursor ile Oturum Aç**
(deep-control PKCE) seçeneğini kullanın.

## IDE / CLI İçe Aktarma Docker'da Neden Başarısız Olur?

1. **Dosya sistemi yalıtımı** — Otomatik içe aktarma, container _içinde_
   `~/.config/Cursor/User/globalStorage/state.vscdb` gibi Linux yollarını arar.
   macOS için Docker Desktop'ta ana makinenin IDE veritabanı varsayılan olarak
   bağlanmaz ve ana makine Darwin olsa bile container işletim sistemi Linux'tur.
2. **`cursor-agent` ikili dosyası yok** — Resmî OmniRoute imajları
   `cursor-agent` içermez. Kullanılabilir Modeller daha önce
   `cursor-agent --list-models` komutunu çalıştırıyor ve başarısız olduğunda
   statik bir kataloğa geri dönüyordu.
3. **Yanlış ikili dosya** — macOS için bir `cursor-agent` ikili dosyasını Linux
   container'a bind-mount ile bağlamayın. Çalışmayacaktır.

## Önerilen: Cursor ile Oturum Açma

1. **Kontrol Paneli → Sağlayıcılar → Cursor** bölümünü açın.
2. **Cursor ile Oturum Aç** sekmesini seçin.
3. **Cursor ile Oturum Aç** düğmesine tıklayın — OmniRoute, **ana makine**
   tarayıcınızda `https://cursor.com/loginDeepControl?…` adresini açar.
4. Tarayıcıda oturum açmayı onaylayın, ardından kontrol paneline dönün. OmniRoute,
   token'lar gelene kadar `api2.cursor.sh/auth/poll` uç noktasını sorgular.
5. OmniRoute, **erişim + yenileme** token'larını saklar ve bunları
   `https://api2.cursor.sh/auth/exchange_user_api_key` üzerinden yeniler.

Bu yöntem, container içinde Cursor IDE veya `cursor-agent` bulunmasını gerektirmez.

## Model keşfi

Oturum açılmış bir bağlantı olduğunda **Kullanılabilir Modeller / Otomatik
Senkronizasyon**, bağlantının bearer token'ını kullanarak Cursor'ın HTTP
`AiService/AvailableModels` kataloğunu tercih eder. Bu başarısız olursa OmniRoute,
ana makinedeki `cursor-agent` aracını (mevcutsa), ardından statik kayıt defteri
başlangıç verilerini dener.

OmniRoute katalogda her zaman **`auto`** seçeneğini (görünen adı “Auto”) ve
OpenCodex tarzı yönlendirici modları olan **`auto-cost`**, **`auto-balance`** ve
**`auto-intelligence`** seçeneklerini sunar. İletim sırasında bunlar, Cursor'ın
`default` modeline eşlenir (üç varyant için bir `optimization` ModelParameter
ile). Premium modellerin kullanım hakkı tükendiğinde `cu/auto` seçeneğini tercih
edin — Auto için çoğu zaman hâlâ bütçe bulunur.

### Senkronize edildiğinde canlı katalog özeldir

Başarılı bir Cursor model senkronizasyonundan sonra (`cursor-agent --list-models`
→ kalıcı senkronize katalog veya yukarıdaki bearer kimlik doğrulamalı
`AvailableModels` isteği) **kontrol paneli**, **`/v1/models`** ve **Tümünü Test
Et** şunları listeler:

1. Canlı senkronizasyon tarafından döndürülen modeller
2. Eklenen otomatik yönlendirici kimlikleri: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Operatörün **özel** modelleri (İçe Aktarma / manuel) — senkronizasyon tarafından hiçbir zaman kaldırılmaz

`open-sse/config/providers/registry/cursor/` altındaki büyük statik kayıt defteri
**yalnızca çevrimdışı geri dönüş içindir**. Senkronize katalog boş olduğunda
(veya keşif başarısız olduğunda) listeleme bu kayıt defterine geri döner.

Efor sonekli kimlikler (örneğin `claude-4.6-sonnet-high`) çalışma zamanında yine
de **istenebilir**: `resolveRequestedModel`, soneki kaldırarak bir iletim
`ModelParameter` değerine dönüştürür. Özel listeleme, testlerin Cursor'ın gerçekten
kullanılabilir olarak döndürdüğü modellerle eşleşmesi için bu statik varyantları
Tümünü Test Et listesinden kasıtlı olarak gizler.

### Yardımcılar

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — kontrol paneli birleştirmesi
- `ensureCursorAutoCatalogEntry` — keşif ve listeleme sırasında auto* ekleme
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` statik döngüsü

## Sağlayıcı Sınırları (kota)

Cursor için **Kullanım → Sağlayıcı Sınırları**, PKCE veya token içe aktarma
işleminden sonra `api2.cursor.sh` üzerindeki Bearer API'lerini
(`GetCurrentPeriodUsage` → kullanım özeti → auth/usage) kullanır. Eski
cookie/`cursor.com` kontrol paneli yolu, eski IDE'den içe aktarılmış oturumlar
için son geri dönüş seçeneği olarak kalır.

Pencereler genellikle **Toplam**, **Auto + Composer** ve **API** bölümlerini
içerir. Sınırlar boş görünüyorsa **Cursor ile Oturum Aç** işlemini yeniden
gerçekleştirin veya token'ları yeniden içe aktarın (artık yalnızca IDE'den içe
aktarma gerekli değildir).

## Boş yanıtlar / kullanım hakkının tükenmesi

Cursor bir Run isteğini kabul edip hiçbir asistan metni döndürmediğinde (premium
kullanım hakkı tükendiğinde sık görülür), OmniRoute yalnızca “Sağlayıcı boş içerik
döndürdü” mesajı yerine, işlem yapılabilir bir **429** (kota ipuçlarıyla) veya
yönlendirme içeren bir **502** hatası gösterir. `not_found: AI Model Not Found`
(kullanım aralığı tükendi) gibi akış hataları **Cursor hız sınırı / kullanım
aşıldı** olarak sınıflandırılır ve bu mesaj SSE işlem hattı boyunca korunur
(paylaşılan boş akış koruması, daha önce yayımlanmış bir hatanın üzerine yazmaz).
Sağlayıcı Sınırları'nı kontrol edin, **`auto`** modelini deneyin veya Cursor plan
sınırlarını yükseltin.

## İstemci sürümü (başsız)

Yerel bir `cursor-agent` kurulumu olmadan OmniRoute, `x-cursor-client-version`
değerini önce `CURSOR_AGENT_CLI_VERSION` ortam değişkeninden, ardından Cursor
yükleyici betiğinin diskte önbelleğe alınmış taramasından ve son olarak sabitlenmiş
bir derleme kimliğinden çözümler. Gerektiğinde `CURSOR_AGENT_CLI_VERSION` ile
geçersiz kılın.

## Geri Dönüş: Manuel Token İçe Aktarma

Tarayıcı üzerinden oturum açmayı tamamlayamıyorsanız:

1. Ana makinede token'ları Cursor'ın `state.vscdb` dosyasından çıkarın:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor kimlik doğrulama penceresinde **Token içe aktar** seçeneğini açın.
3. **Erişim Token'ı** ve mevcutsa **Yenileme Token'ı** değerlerini yapıştırın
   (otomatik yenileme için gereklidir). Makine kimliği isteğe bağlıdır.

Yalnızca erişim token'ı içeren aktarımlar çalışmaya devam eder ancak yenileme
token'ı olmadan süreleri dolar — sohbet kimlik doğrulama hataları döndürdüğünde
yeniden içe aktarın.

## İlgili

- Zed Docker rehberi: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor oturum açma referansı (harici):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
