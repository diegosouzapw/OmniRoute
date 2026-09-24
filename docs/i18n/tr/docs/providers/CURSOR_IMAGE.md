# Cursor Image Generation (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute, sohbetle aynı sağlayıcı kimliği üzerinden `POST /v1/images/generations` uç noktasında Cursor planı **görsel oluşturma** özelliğini sunar: `cursor` (`cu` diğer adıyla).

| Alan                      | Değer                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| `IMAGE_PROVIDERS` kimliği | `cursor`                                                                                   |
| Biçim                     | `cursor-agent-image`                                                                       |
| Kimlik doğrulama          | Sohbetle aynı OAuth / API anahtarı bağlantısı (`provider_connections.provider = "cursor"`) |
| Modeller                  | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                  |

## Neden Agent CLI

OmniRoute'taki Cursor sohbeti `agent.v1.AgentService/Run` (protobuf) kullanır. Bu yol, yerleşik istemci araçlarını (shell, write, …) **reddeder**. Görsel oluşturma, lisans üzerinden **`agent` CLI** tarafından yürütülen Cursor'a özgü bir araçtır. Bu nedenle görsel işleyicisi, kilitlenmiş bir istem ve istek başına geçici bir çalışma alanıyla `agent` sürecini başlatır (topluluk lisans köprüleriyle aynı yapıda) ve ardından OpenAI uyumlu `b64_json` döndürür.

## Erişim kısıtlaması (Katı Kurallar #15 + #17)

Bu, bir alt süreç (`agent` ikili dosyası) başlatan tek `IMAGE_PROVIDERS`
biçimidir. `POST /v1/images/generations`, uzak çağrı yapanların meşru biçimde
kullandığı, süreç başlatmayan yaklaşık 40 başka görsel sağlayıcısı tarafından paylaşıldığından
tüm rota `LOCAL_ONLY` olarak sınıflandırılmaz. Bunun yerine
`handleCursorAgentImageGeneration`, yetkilendirme işlem hattının her isteğe eklediği
güvenilir `AUTHZ_HEADER_PEER_LOCALITY` kararını kullanarak kendi erişim denetimini uygular
(sahtecilik yapılabilen `Host` başlığından değil, gerçek TCP eşinden): yalnızca
`loopback` ve `lan` çağrıları süreç başlatma aşamasına ulaşabilir; diğer tüm çağrılar
(herkese açık bir tünel üzerinden yeniden kullanılan sızdırılmış bir API anahtarı dâhil),
herhangi bir kimlik bilgisi araması veya süreç başlatma gerçekleşmeden önce `403` alır.
`LOCAL_ONLY` katmanının geri kalanına uygulanan aynı politika için
`src/server/authz/policies/management.ts` dosyasına bakın.

## Eşzamanlılık denetimi modül düzeyindedir (tek örnek sınırlaması)

`CURSOR_IMG_MAX_CONCURRENT`, Node modülü örneği kapsamında tutulan bellek içi bir
sayaç/kuyruk tarafından uygulanır (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
Tek bir OmniRoute süreci içindeki eşzamanlı `agent` süreç başlatmalarını doğru biçimde
sınırlar ancak aynı Cursor lisansını paylaşan birden fazla süreç/örnek arasında
(ör. çok replikalı bir dağıtımda) koordinasyon **sağlamaz** — her örnek kendi bağımsız
sınırını uygular. Tek örnekli bir dağıtımda (varsayılan) bu sınır kesindir; yatay olarak
ölçeklendirilmiş dağıtımlar, örnek başına `CURSOR_IMG_MAX_CONCURRENT` değerini ihtiyatlı
tutmalı veya Cursor görsel trafiğini tek bir örneğe yönlendirmelidir.

## Gereksinimler

1. Kontrol panelinde bağlı bir Cursor hesabı (OAuth veya `crsr_…` API anahtarı).
2. Cursor Agent ikili dosyasının OmniRoute süreci tarafından kullanılabilir olması:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, veya
   - `~/.local/bin/agent`, veya
   - Cursor bağlantısında `providerSpecificData.agentBin`.

İsteğe bağlı ayarlar:

| Env                         | Varsayılan              | Anlamı                                       |
| --------------------------- | ----------------------- | -------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                | Görsel başına geçen gerçek süre              |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                     | Paylaşılan lisans için eşzamanlılık denetimi |
| `CURSOR_IMG_MODEL`          | (istek modeli / `auto`) | CLI `--model` değerini geçersiz kıl          |

## Örnek

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Oluşturma işlemi genellikle 1–2 dakika sürer. Dahili bir ağ yolunu tercih edin; yaklaşık 100 saniyelik zaman aşımına sahip uç proxy'ler başarısız olur.

## LiteLLM

`mode: image_generation`, `api_base: http://omniroute:20128/v1` ve `model: openai/cursor/auto` (veya LiteLLM sürümünüze bağlı olarak yalın `cursor/auto`) ile bir görsel modeli kaydedin.
