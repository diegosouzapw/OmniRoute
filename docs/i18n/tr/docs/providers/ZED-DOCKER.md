# Zed IDE Integration in Docker Environments (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

OmniRoute Docker içinde çalıştığında, standart "Zed Anahtar Zincirinden İçe Aktar" akışı başarısız olur;
çünkü container, ana işletim sisteminin anahtar zinciri daemon'una (Linux'ta libsecret,
macOS'ta Keychain, Windows'ta Credential Manager) erişemez ve ana dosya sistemindeki
Zed yapılandırma dizinleri varsayılan olarak container içinde görünmez.

## Docker'da Anahtar Zincirinden İçe Aktarma Neden Başarısız Olur?

Bir container içinde iki engelleyici sorun oluşur:

1. **Dosya sistemi yalıtımı** — `isZedInstalled()`, `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) veya Windows eşdeğerini arar. Bu yollar
   ana sistemde bulunur ve açıkça volume olarak bağlanmadıkları sürece kullanılamaz.
2. **IPC yalıtımı** — Yapılandırma dizini bağlanmış olsa bile `keytar` yerel
   modülü, işletim sisteminin anahtar zinciri hizmetiyle bir Unix soketi veya D-Bus oturumu
   üzerinden iletişim kurar. Bunların hiçbiri varsayılan olarak container'a köprülenmez,
   bu nedenle kimlik bilgilerini okuma işlemleri her zaman başarısız olur.

OmniRoute, Docker ortamını iki sezgisel yöntemle algılar:

- `/.dockerenv` dosyasının varlığı (container başlatılırken Docker daemon'u tarafından yazılır).
- `/proc/1/cgroup` içinde `docker` dizesinin bulunması (Linux cgroup v1).

Bu sezgisel yöntemlerden biri tetiklendiğinde içe aktarma rotası,
`zedDockerEnvironment: true` ve sizi Manuel Token İçe Aktarma sekmesine yönlendiren
bir mesajla birlikte HTTP 422 döndürür.

## Manuel Token İçe Aktarma Sekmesini Kullanma

1. **Dashboard → Providers → Zed** bölümünü açın.
2. **Manuel Token İçe Aktarma** paneli, anahtar zincirinden içe aktarma kartının altında görünür.
   OmniRoute Docker'ı algıladığında bu panel, ilk başarısız anahtar zincirinden içe aktarma
   denemesinden sonra otomatik olarak genişler.
3. Açılır menüden sağlayıcıyı seçin (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter veya DeepSeek).
4. API anahtarını parola alanına yapıştırın.
5. **İçe Aktar** düğmesine tıklayın.

Anahtar, `Zed Manual Import (<provider>)` adıyla yeni bir sağlayıcı bağlantısı
olarak kaydedilir.

## Zed API Anahtarlarını Ana Sistemde Nerede Saklar?

Zed, yapay zekâ sağlayıcısı anahtarlarını işletim sisteminin anahtar zincirinde
`zed-openai`, `ai.zed.openai`, `zed-anthropic` vb. hizmet adları altında saklar.
Bunları manuel içe aktarma için almak üzere aşağıdaki konumlara bakın:

**Linux**

```
~/.config/zed/settings.json
```

`language_models` bölümü sağlayıcı yapılandırmalarını içerir. Zed kullanıcı arayüzü
aracılığıyla anahtar zincirine kaydedilen anahtarlar `settings.json` içinde düz metin
olarak bulunmaz; bunları GNOME Keyring / Seahorse gibi bir anahtar zinciri
görüntüleyicisiyle veya aşağıdaki komutu çalıştırarak alın:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Anahtar zinciri girdileri, **Keychain Access.app** içinde `zed` aranarak bulunabilir.

## Volume Bağlama Seçeneği (Gelişmiş)

İsteğe bağlı olarak Zed yapılandırma dizinini salt okunur biçimde container'a
bağlayabilirsiniz. Bu, anahtar zinciri sorununu çözmez ancak gizli olmayan Zed
yapılandırma değerlerini (ör. model tercihlerini) okuyacak gelecekteki özellikler
için yararlı olabilir.

```yaml
# docker-compose.yml parçası
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux ana sistemi
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS ana sistemi (bunun yerine yorum işaretini kaldırın)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Gelecekte: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Not: `ZED_CONFIG_PATH` ortam değişkeni geçersiz kılma özelliği henüz uygulanmamıştır.
Bu parça, söz konusu özellik eklendiğinde kullanılmak üzere referans olarak sağlanmıştır.

## Manuel İçe Aktarma API'si

Manuel içe aktarma uç noktası doğrudan da çağrılabilir:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Zed OpenAI anahtarım"   // isteğe bağlı
}
```

Başarılı olduğunda şu yanıtı döndürür:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Sorun Giderme

| Belirti                                      | Neden                                              | Çözüm                                             |
| -------------------------------------------- | -------------------------------------------------- | ------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`           | Docker içinde çalışıyor                            | Manuel Token İçe Aktarma sekmesini kullanın       |
| 404 + `zedInstalled: false`                  | Zed ana sistemde yüklü değil                       | Zed'i yükleyin veya manuel içe aktarmayı kullanın |
| 403 + anahtar zinciri erişimi reddedildi     | İşletim sistemi anahtar zinciri erişimini reddetti | İşletim sistemi isteminde izin verin              |
| 404 + anahtar zinciri hizmeti kullanılamıyor | Linux'ta `libsecret` eksik                         | `libsecret-1-dev` paketini yükleyin               |
