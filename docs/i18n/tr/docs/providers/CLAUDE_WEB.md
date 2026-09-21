# Providers — Claude Web (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web`, kimliği doğrulanmış bir `claude.ai` tarayıcı oturumu üzerinden OpenAI biçiminde sohbet istekleri gönderir. Yürütücü, sağlanan çerezi normalleştirir, kimliği doğrulanmış bir kuruluşu çözümler, konuşma durumunu hazırlar, doğrudan veya tarayıcı aktarımını seçer ve üst kaynaktan gelen SSE yanıtını katı biçimde dönüştürür. Orkestrasyon `open-sse/executors/claude-web.ts:320` konumundadır.

> **Web Çerezi sağlayıcılarını ilk kez mi kullanıyorsunuz?**
>
> Bu sağlayıcıya özel kılavuzu izlemeden önce genel kurulum süreci, kimlik doğrulama rehberi, sınırlamalar ve sorun giderme bilgileri için **`docs/getting-started/WEB-COOKIE-GUIDE.md`** belgesini okuyun.

### Model kataloğu

Sağlayıcı kayıt defteri şu anda tam olarak şu yedi statik model kimliğini sunmaktadır (`open-sse/config/providers/registry/claude/web/index.ts:11`):

| Model kimliği               | Görünen ad              |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

Bu sağlayıcı için dinamik model keşfi uygulanmamıştır. Yukarıdaki liste çalışma zamanı kataloğudur.

### Kimlik bilgileri ve kuruluş çözümleme

Tam `claude.ai` Cookie üst bilgisini veya yalın bir oturum değeri sağlayın. Yalın değerler `sessionKey` olarak normalleştirilir; sağlanmışsa diğer çerezler korunur. Yürütücü, çerezi `cookie` veya `apiKey` üzerinden kabul eder ve bağlantı verilerinden isteğe bağlı `deviceId` ve `orgId` değerlerini okur (`open-sse/executors/claude-web.ts:72`).

`orgId` yoksa yürütücü `GET https://claude.ai/api/organizations` çağrısı yapar ve kimliği doğrulanmış Claude Web oturumu tarafından döndürülen ilk kuruluşu kullanır (`open-sse/executors/claude-web.ts:141`). Geçerli bir kuruluş döndürülmediğinde güvenli biçimde başarısız olur, reddedilen oturum yetkilendirmesini 401 olarak bildirir ve Cloudflare sınamasını kimlik doğrulama hatasından ayırt eder.

### Konuşma işlemleri

İsteğe bağlı üst düzey `claude_web` nesnesi katıdır. Bilinmeyen alanlar reddedilir. Kabul edilen alanlar `open-sse/executors/claude-web/session.ts:50` içinde tanımlanmıştır:

| Alan                  | Anlamı                                                                    |
| --------------------- | ------------------------------------------------------------------------- |
| `operation`           | Varsayılan olarak `completion`; yeniden deneme turu için `retry` kullanın |
| `conversation_id`     | Mevcut bir konuşma için açık UUID                                         |
| `parent_message_uuid` | Üst yardımcı mesajı için açık UUID                                        |
| `timezone`            | Geçerli IANA saat dilimi adı                                              |
| `locale`              | Yapısal olarak geçerli yerel ayar                                         |
| `tool_states`         | 128 girdiyle sınırlı isteğe bağlı hesap aracı durumu dizisi               |

Hazırlanan istekler iki üst kaynak uç noktasından birini kullanır (`open-sse/executors/claude-web.ts:203`):

- Yeni veya devam niteliğindeki bir tur şu adrese gönderilir:
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Yeniden deneme şu adrese gönderilir:
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Yeni bir tur `create_conversation_params` içerir. Önbelleğe alınmış veya açıkça bağlantılı bir devam isteği `parent_message_uuid` içerir ve `create_conversation_params` değerini hariç tutar. Yeniden deneme hem konuşma hem de üst mesaj durumunu gerektirir ve istem göndermez (`open-sse/executors/claude-web/session.ts:254`). Yeni konuşmalar, kimliği doğrulanmış kullanıcı arayüzünü `/new` konumunda açar; önbelleğe alınmış veya açıkça bağlantılı devam istekleri tam konuşma sayfasını açar (`open-sse/executors/claude-web/session.ts:324`).

Konuşma durumu, SHA-256 hesap kapsamı ve çağıranın standartlaştırılmış transkriptiyle anahtarlanan bir bellek içi önbellektir. Girdilerin süresi 30 dakika sonra dolar ve önbellek 5.000 girdiyle sınırlıdır (`open-sse/executors/claude-web/session.ts:12`). Durum yalnızca katı akış ayrıştırıcısı `message_stop` olayını gözlemledikten sonra kaydedilir; işlem yeniden başlatıldığında durum atılır. Önbellek ıskalamasında, çok mesajlı bir istek önceki mesajları sessizce yok saymak yerine tek bir kurtarma istemine serileştirilir.

Yerel ayar ve saat dilimi şu öncelik sırasını kullanır: istekteki `claude_web` değeri, bağlantı değeri, çalışma zamanı değeri; ardından yerel ayar için `en-US` veya saat dilimi için `UTC` (`open-sse/executors/claude-web/session.ts:218`).

### Araçlar ve istek yükleri

Doğrudan istekler yalnızca çağıran tarafından sağlanan, yapısal olarak geçerli OpenAI fonksiyon araçlarını dönüştürür. Yapay olarak oluşturulan statik bir varsayılan araç listesi yoktur (`open-sse/executors/claude-web/payload.ts:102`).

Tarayıcı istekleri bunun yerine kimliği doğrulanmış kullanıcı arayüzü isteğini yakalar ve bu isteğin hesap araçlarını, araç durumlarını ve kişiselleştirilmiş stillerini korur. Hazırlanan konuşma, model, akıl yürütme, istem ve mesaj UUID alanları yakalanan isteği yine de geçersiz kılar (`open-sse/executors/claude-web/browserTransport.ts:175`). Tarayıcı şablonları hesap, kuruluş, çerez, yerel ayar ve saat dilimi karmasıyla kapsamlandırılır ve süreleri 30 dakika sonra dolar (`open-sse/executors/claude-web/browserTransport.ts:11`, `open-sse/executors/claude-web/browserTransport.ts:158`). Doğrudan bir istekte çağıran tarafından sağlanan araçlar yoksa bu kapsamlı şablon yeniden kullanılabilir; çağıran tarafından açıkça sağlanan araçlar önceliklidir (`open-sse/executors/claude-web/browserTransport.ts:214`).

### Aktarım seçimi

Varsayılan yol, yapılandırılmış Chrome 146 profili ve sağlanan çerezle `tlsFetchClaude()` işlevini çağıran `sendClaudeWebDirect()` yoludur (`open-sse/services/claudeTlsClient.ts:23`). Bir çözücü başlatmaz veya yedek çerez üretmez.

Hesap kapsamlı tarayıcı adaptörünü birincil aktarım yöntemi yapmak için `WEB_COOKIE_USE_BROWSER` değerini `1`, `true` veya `on` olarak ayarlayın. Tanınan bir Cloudflare 403 sınaması durumunda doğrudan aktarımdan tarayıcı adaptörüne geri dönülmesine izin vermek için `OMNIROUTE_BROWSER_POOL` değerini aynı değerlerden birine ayarlayın (`open-sse/executors/claude-web.ts:195`). Diğer HTTP hataları bu geri dönüşü tetiklemez.

Tarayıcı adaptörü, çerezleri aynı havuzlanmış Playwright bağlamında tutar, yukarıda açıklanan kapsamlı karma anahtarı kullanır ve tamamlamayı bu bağlamdan gönderir (`open-sse/executors/claude-web/browserTransport.ts:444`). Tarayıcı tarafından çözümlenen bir çerezi hiçbir zaman doğrudan TLS istemcisine aktarmaz. Tarayıcı yeniden denemeleri, aynı gerçek Playwright bağlamına bağlı ve süresi dolmamış bir kullanıcı arayüzü şablonu gerektirir (`open-sse/executors/claude-web/browserTransport.ts:467`). Tarayıcı yanıtı okumaları, kimliği doğrulanmış sayfada artımlı olarak çalışır, istek iptaline uyar ve 16 MiB'ı aşar aşmaz yukarı akış gövdesini iptal eder (`open-sse/executors/claude-web/browserTransport.ts:259`).

Yürütücü, paylaşılan istek günlükçüsüne sansürlenmiş bir denetim görünümü döndürür: kuruluş, konuşma ve mesaj UUID'leri, istem metni, araç tanımları, çerezler ve cihaz tanımlayıcıları hariç tutulur (`open-sse/executors/claude-web.ts:237`, `open-sse/executors/claude-web.ts:252`). Aktarım istisnaları da fırlatılan ileti yerine genel bir bağlantı hatası döndürür.

### SSE davranışı

`createClaudeWebResponse()`, LF veya CRLF çerçevelemesini ve çok satırlı `data:` alanlarını işler. Metin deltalarını `content` alanına, düşünme deltalarını `reasoning_content` alanına ve bilinen meta veri olaylarını `claude_web` yanıt uzantısına eşler. Her meta veri olayı, kendisine ait alan izin listesi üzerinden yansıtılır (`open-sse/executors/claude-web/stream.ts:37`). Konuşma, üst mesaj, asistan mesajı ve işlem meta verileri de `X-OmniRoute-Claude-Web-*` başlıklarında döndürülür (`open-sse/executors/claude-web/stream.ts:364`).

Ayrıştırıcı; hatalı biçimlendirilmiş JSON, yukarı akış `error` olayları, bilinmeyen olay türleri, geçersiz sıralama, içerik bloğu uyuşmazlıkları veya `message_stop` öncesinde EOF durumlarında güvenli biçimde başarısız olur. Akışlı çıktı bir bitiş parçası ve bir `[DONE]` yayar; arabelleğe alınmış çıktı aynı ayrıştırıcıyı kullanır. Ayrıştırıcı, `message_stop` olayını hemen terminal olarak değerlendirir, sondaki yukarı akış verilerini iptal eder ve aşağı akış iptalini yukarı akış okuyucusuna iletir (`open-sse/executors/claude-web/stream.ts:461`, `open-sse/executors/claude-web/stream.ts:563`). Sonlandırılmamış SSE satırları ve birikmiş olaylar 1 MiB ile sınırlandırılır (`open-sse/executors/claude-web/stream.ts:17`, `open-sse/executors/claude-web/stream.ts:62`).

### Dosyalar

| Dosya                                                    | Amaç                                 |
| -------------------------------------------------------- | ------------------------------------ |
| `open-sse/config/providers/registry/claude/web/index.ts` | Statik sağlayıcı model kayıt defteri |
| `open-sse/executors/claude-web.ts`                       | Yürütücü orkestrasyonu               |
| `open-sse/executors/claude-web/payload.ts`               | Yük ve araç dönüşümü                 |
| `open-sse/executors/claude-web/session.ts`               | Tur durumu ve transkript önbelleği   |
| `open-sse/executors/claude-web/transport.ts`             | Doğrudan aktarım adaptörü            |
| `open-sse/executors/claude-web/browserTransport.ts`      | Hesap kapsamlı tarayıcı adaptörü     |
| `open-sse/executors/claude-web/stream.ts`                | Katı SSE çevirisi                    |
| `open-sse/services/claudeTlsClient.ts`                   | Yerel TLS aktarımı                   |
| `open-sse/services/browserPool.ts`                       | Havuzlanmış Playwright bağlamları    |

### Test

Deterministik Claude Web paketini gerçek kimlik bilgileri olmadan çalıştırın:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

`tests/unit/claude-web-auto-refresh.test.ts` içindeki Playwright bağımlı durumlar açıkça atlanır. Bu depo şu anda kimlik bilgileriyle çalışan bir Claude Web canlı test betiği tanımlamadığından, atlanan bu durumlar çalışma zamanı kanıtı değildir.

### Kurulum

1. OmniRoute'u `npm run dev` ile veya derlenmiş bir kurulumdan başlatın.
2. Dashboard → Providers → Add Provider bölümünü açın.
3. Web Cookie kategorisini ve Claude Web'i seçin.
4. Kimliği doğrulanmış bir `claude.ai` isteğinden kopyalanan Cookie başlığının tamamını yapıştırın.
