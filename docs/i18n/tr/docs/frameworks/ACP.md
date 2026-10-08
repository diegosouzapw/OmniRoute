# ACP registry and registered CLI launchers (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute, **CLI keşfini**, **yerel Agent Client Protocol'ünü** ve
**eski stdio adaptörlerini** birbirinden ayırır. Yüklü bir ikili dosyanın bulunması;
kimlik doğrulamasının, model uyumluluğunun veya bir istemi işlemeye hazır olduğunun
kanıtı değildir.

Kontrol paneli, envanter ve özel ajan kaydı için `GET /api/acp/agents` ve
`POST /api/acp/agents` kullanır. Bunlar yalnızca yerel yönetim rotalarıdır;
süreç başlatmak veya istem göndermek için kullanılan genel bir API değildir.
Dahili `AcpManager`, otomatik olarak bir HTTP sağlayıcı yedeğine dönüşmez.

## Kayıtlı sözleşmeler

`config/cli-tools-manifest.json`, yerleşik başlatma ikili dosyaları, argümanları
ve arka uç modları için doğruluk kaynağıdır. Kayıt defteri, tanımlarını bu
manifest dosyasından türetir. Algılama sonuçları 60 saniye önbelleğe alınır.

- `acp`: Gemini sözleşmesi, `gemini --experimental-acp` komutunu başlatır ve
  resmi TypeScript SDK'sı üzerinden yeni satırlarla ayrılmış ACP JSON-RPC
  iletişimi gerçekleştirir.
- `stdio-adapter`: kayıtlı diğer sözleşmeler, yeni satır girdili ve stdout
  çıktılı eski adaptörü kullanmaya devam eder. İki saniyelik çıktı boşta kalma
  süresi yanıtı sonlandırır. Bu adaptör, söz konusu CLI'lar için yerel ACP
  desteğini **onaylamaz**.

Gemini, başlatma bayrağını [CLI referansında](https://geminicli.com/docs/cli/cli-reference/)
belgeler. İstemci; başlatma, oturum oluşturma, istem istekleri, bildirimler ve
iptal işlemleri için [resmi ACP SDK'sını](https://github.com/agentclientprotocol/typescript-sdk)
kullanır.

Özel ajan tanımları, yönetici denetimindeki başlatma sözleşmeleri olarak kalır.
Bir ikili dosyanın ve argümanların kaydedilmesi, söz konusu sürece sunucu
kullanıcısının yerel yürütme ayrıcalıklarını verir; kayıt işlemi bir korumalı
alan değildir. Sürüm yoklamaları yalnızca kayıtlı yürütülebilir dosyayı ve
tanınan bir sürüm bayrağını kabul eder.

## Dahili başlatma API'si

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Yalnızca bu ajana bilinçli olarak atanmış sağlayıcı değişkenlerini geçirin.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Bu projeyi açıklayın", 120_000);
  // Yanıtı çağıran uygulamada kullanın.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)`, yürütülebilir dosyayı ve argümanları kayıtlı tanımdan
çözümler. Çağıran tarafın kullanabileceği tek seçenekler `cwd` ve `env`'dir;
eski `spawn(agentId, binary, args, env)` imzası ve yürütülebilir dosya geçersiz
kılmaları reddedilir. HTTP başlatma sözleşmeleri bu yönetici tarafından
desteklenmez.

Alt süreç; CLI başlatıcılarıyla aynı işletim sistemi, terminal, yerel ayar ve
sertifika izin listesini devralır. Sunucu/sağlayıcı gizli bilgileri üst ortamdan
kopyalanmaz. Seçilen CLI'ın ihtiyaç duyduğu kimlik bilgileri açıkça geçirilmeli
veya ilgili CLI'ın kendi yerel kimlik doğrulaması aracılığıyla sağlanmalıdır.
Alt süreç yine de yerel kullanıcının dosya sistemi izinlerine sahiptir ve kendi
yapılandırmasını okuyabilir.

## Yerel yaşam döngüsü ve sınırlar

1. Kayıtlı ikili dosyayı başlatın, ACP'yi ilklendirin ve seçilen çalışma dizinini
   temel alan bir oturum oluşturun. İlklendirme için on saniyelik bir sınır vardır.
2. Bir istem gönderin ve yalnızca o oturuma ait metin bildirimlerini toplayın.
   Tamamlanma ölçütü stdout sessizliği süresi değil, istem RPC yanıtıdır.
3. Tamamlanmamış ilklendirme süresini de içeren tek bir istem son tarihi
   kullanın; varsayılan süre 120 saniyedir. Aynı süreçte eşzamanlı istemler
   reddedilir.
4. Yerel zaman aşımında `session/cancel` çağrısını deneyin ve süreci sonlandırın.
   100 ms ile sınırlandırılmış bir pencere, sonlandırma öncesinde bildirimin
   aktarılmasına olanak tanır.
5. İlklendirme başarısız olduğunda, bağlantı kapandığında, süreç sonlandığında
   veya çağıran taraf süreci durdurduğunda aktarım durumunu kapatın ve oturumu
   kaldırın.

Araç izin istekleri reddedilir. Hiçbir dosya sistemi veya terminal istemci
yeteneği duyurulmaz. Bu kısıtlamalar, alt ikili dosyayı korumalı alana almaz veya
bir CLI'ın kendi yetkilendirme ayarlarının yerini tutmaz.

Hem yerel metin hem de eski stdout/stderr, en yeni çıktıyı bir kırpılma
bildirimiyle birlikte koruyarak en fazla 1 MiB karakter tutar. Tek bir yerel
kablo çerçevesi, SDK ayrıştırmasından önce 2 MiB bayt ile sınırlandırılır.
Arabellekler her istemde sıfırlanır.

`kill(sessionId)`, SIGTERM gönderir ve süreç sonlanmadıysa beş saniye sonra
SIGKILL gönderir. Eski istem zaman aşımları dinleyicileri ve zamanlayıcıları
serbest bırakır ancak oturumu başka bir istem için kullanılabilir durumda
bırakır; çağıran taraflar işleri bittiğinde `kill()` veya `killAll()` çağrısını
yapmaktan sorumludur.

## Olaylar ve inceleme

Yönetici, her biri `sessionId` içeren `stdout`, `stderr` ve `exit` olaylarını
yayar. `sessionError`, arındırılmış bir aktarım hatasını bildirir. Uyumluluk
amaçlı `error` olayı yalnızca bir abonesi olduğunda yayılır; böylece eksik bir
ikili dosya, işlenmemiş bir EventEmitter hatasına neden olamaz.

- `getSession(sessionId)`, yönetilen bir oturumu veya `undefined` döndürür.
- `getActiveSessions()`, durdurulmuş veya durdurulmakta olan oturumları hariç tutar.
- `sendInput(sessionId, input)` yalnızca çalışan bir eski adaptör için
  kullanılabilir; yerel ACP, JSON-RPC akışını korumak amacıyla ham girdiyi reddeder.
- `killAll()`, ilgili örnek tarafından yönetilen tüm oturumları sonlandırır.

## Doğrulama sınırları

Belirlenimci sabit test verileri; yerel el sıkışmayı, metin çıktısını, reddedilen
izinleri, iptali, eşzamanlı istemleri, başarısız ilklendirmeyi, süreç çıkışını,
çıktı sınırlarını ve gizli bilgi yalıtımını kapsar. Mevcut eski
arabellek/dinleyici regresyonları da kapsanmaya devam eder. Bu testler, canlı
bir Gemini oturum açma işlemini veya başarılı sağlayıcı çıkarımını göstermez;
bunlar hedef ortamda ayrıca yetkilendirilmiş bir duman testi gerektirir.

## İlgili belgeler

- [Ajan protokolleri](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI başlatma sözleşmeleri](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI araçları](../reference/CLI-TOOLS.md)
- [A2A sunucusu](./A2A-SERVER.md)
- [Bulut ajanları](./CLOUD_AGENT.md)
