# AgentRouter Setup Guide (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org), Claude ve diğer modelleri genellikle doğrudan Anthropic API'sinden daha düşük fiyatlarla yeniden satan, Anthropic uyumlu bir aktarma hizmetidir. Resmî Claude Code istemcisi için doğrudan kullanılabilen bir `ANTHROPIC_BASE_URL` alternatifi olarak tasarlanmıştır; bu nedenle yalnızca Claude Code bağlantı biçimiyle eşleşen trafiği kabul eder (belirli User-Agent, `anthropic-beta` bayrakları, Stainless SDK başlıkları vb.).

## Hızlı başlangıç — yerel `agentrouter` sağlayıcısını kullanın (önerilen)

Çoğu kullanıcı için **özel bir kurulum gerekmez**. OmniRoute, Claude Code bağlantı biçiminin tamamı önceden yerleşik olarak sunulan bir `agentrouter` sağlayıcısıyla birlikte gelir (bkz. `open-sse/config/providerRegistry.ts` → `agentrouter`). Kullanmak için:

1. **Kontrol Paneli → Sağlayıcılar → Sağlayıcı Ekle** bölümünü açın.
2. Listeden **AgentRouter** seçeneğini belirleyin.
3. `sk-...` API anahtarınızı yapıştırıp kaydedin.

Hepsi bu kadar — ortam değişkenlerine veya özel bir sağlayıcı türüne gerek yoktur. Yerleşik modeller arasında `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` ve `deepseek-v3.2` bulunur.

Bu kılavuzun geri kalanında **gelişmiş yöntem**, yani `anthropic-compatible-cc-*` sağlayıcı türünün kullanımı ele alınmaktadır. Bağlantı biçimi üzerinde daha fazla denetime ihtiyaç duyduğunuzda — örneğin, henüz yerel sağlayıcı kayıt defterinde bulunmayan diğer AgentRouter tarzı aktarma hizmetlerine bağlanırken veya temel URL'yi, sohbet yolunu ya da başlık kümesini geçersiz kılarken — bu yöntemi kullanın.

---

## Gelişmiş: Claude Code uyumlu sağlayıcı türü üzerinden bağlanma

OmniRoute, AgentRouter'ı (ve benzer aktarma hizmetlerini) doğru bağlantı biçimiyle Anthropic Messages API'sini kullanan **Claude Code uyumlu** sağlayıcı türü (`anthropic-compatible-cc-*`) aracılığıyla da destekler. `https://agentrouter.org` adresine yönlendirilen genel bir `openai-compatible-chat` sağlayıcısı **çalışmaz** — üst sistemdeki WAF, Claude Code'dan geliyor gibi görünmeyen istekleri reddeder.

---

## Ön koşullar

- Bir AgentRouter hesabı ve API anahtarı. Yeni kayıtlar, projenin [README](../README.md) dosyasındaki satış ortaklığı bağlantısı üzerinden ücretsiz kredi alır.
- `ENABLE_CC_COMPATIBLE_PROVIDER` özellik bayrağı etkinleştirilmiş olarak çalışan OmniRoute (aşağıya bakın).

## 1. CC uyumlu sağlayıcı türünü etkinleştirin

Claude Code uyumlu sağlayıcı türü, resmî Claude Code istemcisini yakından taklit eden trafik gönderdiği için bir özellik bayrağının arkasında tutulur. OmniRoute'u başlatmadan önce bir ortam değişkeni ayarlayarak etkinleştirin:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker örneği:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Yeniden başlatmanın ardından kontrol paneli, mevcut OpenAI uyumlu ve Anthropic uyumlu akışlara ek olarak **Claude Code Uyumlu Ekle** seçeneğini gösterir.

## 2. Sağlayıcıyı kontrol panelinde oluşturun

1. **Kontrol Paneli → Sağlayıcılar → Sağlayıcı Ekle** bölümünü açın.
2. **Claude Code Uyumlu Ekle** seçeneğini belirleyin (yalnızca yukarıdaki bayrak ayarlandığında görünür).
3. Alanları doldurun:

| Alan        | Değer                                                                |
| ----------- | -------------------------------------------------------------------- |
| Ad          | `AgentRouter` (veya herhangi bir etiket)                             |
| Ön ek       | `agentrouter` (günlüklerde ve kontrol panelinde gösterilen kolay ad) |
| Temel URL   | `https://agentrouter.org`                                            |
| Sohbet yolu | `/v1/messages?beta=true` (varsayılan — olduğu gibi bırakın)          |

> Kurallı model tanımlayıcısı hâlâ tam sağlayıcı düğümü kimliğini kullanır
> (`anthropic-compatible-cc-{uuid}/{model}`). **Ön ek**, daha anlaşılır günlük
> çıktıları için `src/lib/usage/callLogs.ts` tarafından çözümlenen bir görüntüleme
> takma adından ibarettir.

4. (İsteğe bağlı) Kaydetmeden önce bağlantıyı doğrulamak için API anahtarınızı **Doğrula** alanına yapıştırıp **Kontrol Et** seçeneğine tıklayın.
5. **Ekle** seçeneğine tıklayın.

Oluşturulduktan sonra sağlayıcıyı açın ve AgentRouter API anahtarınızla (`sk-...`) bir **Bağlantı** ekleyin. Bağlantının `test_status` değeri `active` olarak değişmelidir.

## 3. Bir combo üzerinden veya doğrudan kullanın

Sağlayıcınızın önekini ad alanı olarak kullanarak modele başvurun:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Standart model kimliği `anthropic-compatible-cc-{uuid}/claude-opus-4-6` de çalışır
ve veritabanında ve combo yapılandırmasında görünen kimlik budur.

Alternatif olarak, diğer sağlayıcılarda olduğu gibi yönlendirme, yedekleme ve kota
yönetimi için bunu bir combo'ya ekleyin.

---

## Wire image ayrıntıları

Referans olması açısından, cc-compatible köprüsü her yukarı akış isteğinde
aşağıdakileri gönderir (bkz. `open-sse/services/claudeCodeCompatible.ts`):

| Üstbilgi                                      | Değer                                                                                                        |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `Authorization`                               | `Bearer <api-key>`                                                                                           |
| `User-Agent`                                  | `claude-cli/2.1.258 (external, sdk-cli)`                                                                     |
| `anthropic-version`                           | `2023-06-01`                                                                                                 |
| `anthropic-beta`                              | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                     |
| Bağlantı başına redact-thinking beta seçeneği | Özellikle redakte edilmiş düşünme akışları gerektiren yukarı akışlar için `redact-thinking-2026-02-12` ekler |
| Bağlantı başına özetlenmiş düşünme seçeneği   | Henüz bir görüntüleme modu ayarlanmamış CC Compatible düşünme isteklerine `display: "summarized"` ekler      |
| `anthropic-dangerous-direct-browser-access`   | `true`                                                                                                       |
| `x-app`                                       | `cli`                                                                                                        |
| `X-Stainless-*`                               | Çeşitli Stainless SDK üstbilgileri (dil, paket sürümü, işletim sistemi, mimari vb.)                          |

İsteklerin yukarı akış WAF'ını / istemci izin listesini geçmesini sağlayan budur.

---

## Sorun giderme

**`{"error":{"message":"unauthorized client detected, ..."}}`** — İsteğiniz Claude
Code wire image ile eşleşmedi. Bu durum, sağlayıcı `anthropic-compatible-cc` yerine
`openai-compatible-chat` olarak yapılandırıldığında veya başlangıçta
`ENABLE_CC_COMPATIBLE_PROVIDER=true` bayrağı ayarlanmadığında meydana gelir.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"Geçersiz token". Wire image doğrudur ancak API anahtarı reddedilmiştir. AgentRouter
kontrol panelinde yeni bir anahtar oluşturun ve bağlantıyı güncelleyin.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter'ın moderasyon kancası istek içeriğini reddetti veya
anahtarın planı istenen modele izin vermiyor. Farklı bir istem veya model deneyin;
zararsız bir istem sürekli olarak engelleniyorsa AgentRouter desteğiyle iletişime
geçin.

**Yalnızca belirli modellerde `[400]: content-blocked`** — Çoğu AgentRouter planı
yalnızca belirli bir model alt kümesine (ör. `claude-opus-4-6`) izin verir. Anahtar
geçerli olsa bile diğer model kimlikleri `unauthorized_client_error` döndürür.
Planınızın hangi modelleri kapsadığını AgentRouter kontrol panelinden denetleyin.

**omniroute günlüklerinde `Invalid JSON response from provider (reset after Ns)`** —
Yukarı akış JSON olmayan bir gövde döndürdü (genellikle WAF'tan gelen bir HTML hata
sayfası). Bu genellikle isteğin AgentRouter arka ucuna hiç ulaşmadığı anlamına gelir
— sağlayıcı kimliğinin `anthropic-compatible-cc-` ile başladığını yeniden kontrol
edin (sondaki kısa çizgiye dikkat edin — `open-sse/services/claudeCodeCompatible.ts`
içindeki `CLAUDE_CODE_COMPATIBLE_PREFIX` bölümüne bakın) ve özellik bayrağının
etkinleştirildiğinden emin olun.

**Bir AgentRouter sağlayıcısı zaten mevcut olmasına rağmen `unauthorized client detected`
/ HTML hata sayfası** — büyük olasılıkla **birden fazla** AgentRouter sağlayıcınız
vardır ve isteğiniz yanlış olana ulaşmaktadır. `agentrouter` önekiyle oluşturulmuş,
elle yapılmış eski bir `anthropic-compatible-*` (`cc` olmayan) veya
`openai-compatible-chat-*` sağlayıcısı varsa `agentrouter/<model>` model
kimliklerinin sahibi olabilir (ve combo'lar buna düğüm kimliğiyle başvurabilir);
dolayısıyla trafik, doğru wire image ile birlikte gelen yerleşik `agentrouter`
sağlayıcısı yerine bu sağlayıcıya yönlendirilir — bu sağlayıcı genel bir User-Agent
gönderir ve reddedilir. Modelin gerçekte nereye çözümlendiğini omniroute günlüklerinde
kontrol edin (`ROUTING` etiketi `agentrouter/<model> → <providerId>/<model>`
ifadesini gösterir); `<providerId>`, `agentrouter` değilse yerel sağlayıcıda
birleştirin: combo'ları `agentrouter/<model>` (providerId `agentrouter`) hedefine
yönlendirin ve yinelenen uyumlu sağlayıcıları silin. Yerel sağlayıcı için herhangi
bir wire-image yapılandırması veya `customUserAgent` gerekmez.

---

## Ayrıca bkz.

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web sağlayıcısı entegrasyon notları
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Ücretsiz katman sağlayıcı
  kataloğu
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Kablolu görüntü uygulaması
