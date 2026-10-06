# Error Message Sanitization (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Doğruluğun kaynağı:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` ve `open-sse/utils/error.ts` içindeki herkese açık oluşturucular
> **Testler:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Son güncelleme:** 2026-09-02 — v3.8.51
> **Hedef kitle:** Hata yanıtlarıyla çalışan tüm mühendisler (HTTP rotaları, SSE akışları, yürütücüler, MCP işleyicileri).
> **Durum:** İstemciye hata mesajı döndüren her kod yolu için **ZORUNLUDUR**.

## Bunun var olma nedeni

CodeQL kuralı `js/stack-trace-exposure` (CWE-209), çalışma zamanı istisnasından kaynaklanan bir hata mesajının temizlenmeden HTTP / SSE yanıtına ulaştığı tüm kod yollarını işaretler. Üretim yanıtlarındaki yığın izleri ve mutlak dosya yolları, saldırganlara şunları sağlar:

- Dahili dizin düzeni (`/srv/app/src/lib/...`) → daha ileri saldırılar için keşif.
- Yığın çerçevelerinden çıkarılan kütüphane / framework sürümleri → hedefe yönelik istismar seçimi.
- Hatalara dize enterpolasyonuyla eklenmiş olabilecek hassas çalışma zamanı değerleri (DB sorguları, yapılandırma değerleri).

`open-sse/utils/error.ts` tarafından dışa aktarılan `sanitizeErrorMessage` yardımcısı, şu sızıntı sınıflarını
temizler:

1. Fiziksel, serileştirilmiş ve açıkça satır içine yerleştirilmiş JavaScript yığın çerçevesi kuyrukları.
2. Güvenli HTTPS URL'lerini ve açıkça işaretlenmiş API rotalarını korurken mutlak POSIX, Windows, UNC ve `file://` dosya sistemi yolları.
3. Kimlik bilgisi atamaları, yaygın sağlayıcı token biçimleri, özel anahtar PEM blokları ve base64 veri URL'leri.

Temizleyici, girdi uzunluğunu sınırlar ve fırlatılan bir değer dizeye dönüştürülmeyi reddederse güvenli biçimde başarısız olur.
Özyinelemeli üst kaynak JSON temizleme işlemi de yanıt serileştirilmeden önce güvenli olmayan kimlik bilgisi/yol anahtarlarını, oturum takma adlarını ve
prototip denetim anahtarlarını kaldırır.

## Zorunlu kalıp

### 1. Hata yanıtı oluşturma (HTTP / API rotaları)

`buildErrorBody()` kullanın — temizleme yerleşik olarak uygulanır:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... işleyici mantığı ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Alternatif olarak, aynı modüldeki kolaylık sarmalayıcılarını kullanın:

```ts
import {
  errorResponse, // tek seferlik Response nesnesi
  writeStreamError, // SSE yazıcısı
  createErrorResult, // { success: false, status, response, ... } biçimi
  unavailableResponse, // Retry-After ekler
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Bunların tümü standart herkese açık hata sınırını uygular. `errorResponse`, `writeStreamError` ve
`createErrorResult`, `buildErrorBody` üzerinden yönlendirilir; üç özel yeniden deneme/devre yardımcısı ise
herkese açık bağlamlarını doğrudan yansıtır ve temizler. Bu yardımcıları kullanırken **hiçbir zaman
`sanitizeErrorMessage` işlevini manuel olarak çağırmanız gerekmez**.

### 2. Özel hata zarfları (nadiren)

Yukarıdaki yardımcıları kullanamadığınızda (ör. yanıt biçimi Connect-RPC gibi bir üst kaynak protokolü tarafından belirleniyorsa) `sanitizeErrorMessage` işlevini doğrudan içe aktarın:

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

Özel bir hata gövdesi oluşturmanın onaylanmış tek yolu budur. Referans uygulama için `open-sse/executors/cursor.ts::buildErrorResponse` bölümüne bakın.

### 3. Günlüğe kaydetme ve yanıt verme

Güvenilir dahili istisnalar, operatörlerin hata ayıklayabilmesi için tam mesajlarını ve yığınlarını koruyabilir. Sağlayıcı, doğrulama, tarayıcı oturumu veya kimlik bilgileriyle ilişkili sınırlardan
kaynaklanan değerler; konsol çıktısına, denetim meta verilerine veya kalıcı çağrı günlüklerine girmeden önce
temizlenmelidir. Kalıp:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "işleyici başarısız oldu"); // yalnızca güvenilir dahili istisna
  return errorResponse(500, getErrorMessage(err)); // temizlendi — istemciye gönderildi
}
```

Sağlayıcı tarafından denetlenen hatalarda, günlüğe kaydedilen değeri de yansıtın:

```ts
log.error({
  message: sanitizeErrorMessage(err) || "Sağlayıcı isteği başarısız oldu",
});
```

### 4. Yasaklanan kalıplar

❌ Ham istisna çıktısını **asla** bir Response gövdesine koymayın:

```ts
// KÖTÜ: yığın izi ve dosya yolları istemciye ulaşır
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ Kendi ilk satır ayırıcınızı **asla** oluşturmayın:

```ts
// KÖTÜ: mutlak yolları kaldırmayı unutur, standart yardımcıdan farklılaşabilir
const safe = String(err).split("\n")[0];
```

❌ Rotada temizleme yapıp SSE yolunu **asla** unutmayın. Akışa yazan her şey `writeStreamError` (veya onun temelindeki `buildErrorBody`) üzerinden geçer.

❌ Hata mesajlarına kasıtlı olarak `process.cwd()`, `__filename`, `__dirname` veya ortam değişkenlerinden türetilen yolları
**asla** eklemeyin. Temizleyici, derinlemesine savunma amacıyla mutlak yolları kapsar; ancak çağıranlar en başta
topoloji bilgisi taşıyan mesajlar oluşturmamalıdır.

## CI'da Kapsam

`tests/unit/error-message-sanitization.test.ts` şunları zorunlu kılar:

- `/api/model-combo-mappings/*` altındaki her rota, 4xx/5xx durumlarında temizlenmiş gövdeler döndürür.
- `sanitizeErrorMessage`, çok satırlı yığın izlerini kaldırır.
- `sanitizeErrorMessage`, POSIX ve Windows mutlak yollarını `<path>` ile değiştirir.
- `sanitizeErrorMessage`, `null`/`undefined`/`Error` örneği girdilerini güvenli biçimde işler.
- `buildErrorBody`, `message` alanında hiçbir zaman yığın izlerini açığa çıkarmaz.

Yeni bir rota veya yürütücü eklerken bu dosyadaki doğrulama kalıbını kopyalayın. Kapsam eşiği (`npm run test:coverage`), ifadeler/satırlar/fonksiyonlar/dallar için ≥%60 oranını zorunlu kılar — hata yolları kapsanmalıdır.

## İlgili kontroller

- `.github/security` içindeki `js/stack-trace-exposure` CodeQL uyarıları her zaman **ya** bu yardımcılar aracılığıyla düzeltilmeli **ya da** bu belgeye atıfta bulunan bir yorumla reddedilmelidir.
- `pino` maskeleme yapılandırması (`src/shared/utils/logRedaction.ts`), güvenilir yapılandırılmış günlükleri ayrı olarak işler. Bu belge, kalıcı çağrı/proxy günlüğü sınırlarını aşan genel yanıt mesajlarını ve sağlayıcı tarafından kontrol edilen değerleri kapsar.
- Üst kaynak başlığı engelleme listesi (`src/shared/constants/upstreamHeaders.ts`) başlık sızıntısını kapsar — yeni bir veri sızdırma riski eklerken her iki dosyayı da uyumlu tutun.

## Üst kaynak ayrıntılarının aktarılması

`buildErrorBody`, isteğe bağlı üçüncü bir `upstreamDetails` bağımsız değişkenini (üst kaynak sağlayıcısından gelen ham ayrıştırılmış gövde) kabul eder. Sağlandığında, yanıta `upstream_details` olarak eklenmeden önce `sanitizeUpstreamDetails` tarafından temizlenir.

İsteğe bağlı dördüncü bir `classification` bağımsız değişkeni (`{ type?: string; code?: string; reason?: string }`), açık bir genel sınıflandırma kabul eder. Her alan, sınırlandırılmış genel tanımlayıcı sözlüğüne yansıtılır. Güvenli olmayan, kimlik bilgisi biçimindeki, kontrol karakteri içeren veya aşırı uzun değerler, durumdan türetilen türe/koda geri döner; güvenli olmayan isteğe bağlı bir neden ise çıkarılır. Üç basamaklı HTTP durum tanımlayıcıları (`100` ile `599` arası), sayısal üst kaynak durumunu makine tarafından okunabilir bir kod olarak sunan sağlayıcı sözleşmeleri için geçerli kalır. Aynı sınırlandırılmış aralık, yerel olarak oluşturulan HTTP durumu yer tutucu biçiminde de kabul edilir; rastgele sağlayıcı sayıları ve adları sözlüğün dışında kalır.

Her açık sınıflandırmayı bu dördüncü bağımsız değişkende iletin. `buildErrorBody()` döndükten sonra hiçbir zaman `body.error.code`, `body.error.type` veya `body.error.reason` alanlarının üzerine yazmayın; oluşturucu sonrası değişiklik, genel yansıtmayı atlar.

`upstreamDetails` için uygulanan temizleme kuralları:

1. Dize yaprakları: `sanitizeErrorMessage` üzerinden geçirilir (yığın izlerini ve mutlak yolları kaldırır).
2. Güvenli olmayan yol, kimlik bilgisi, oturum takma adı ve prototip denetimi anahtarları kaldırılır.
3. Derinlik sınırı: 4 seviyeyi aşan iç içe yerleştirme, `"[truncated]"` dizesiyle değiştirilir.
4. Diziler en fazla 32 öğeyle sınırlandırılır.

Yalnızca ayrıştırılmış bir sağlayıcı hata gövdesine sahip çağrı noktaları `upstreamDetails` iletmelidir. Dahili OmniRoute hataları (SSE ayrıştırma hataları, boş içerik, koruma kuralı engellemeleri) bunu içermemelidir.

Ham `err.stack`, `err.message` veya çalışma zamanı istisnasından gelen herhangi bir dizeyi `upstreamDetails` öğesine GEÇİRMEYİN. Bunlar, üst kaynak gövdesi olmadan yine `errorResponse` / `buildErrorBody(code, msg)` üzerinden geçirilmelidir.

Seçici üst kaynak 4xx aktarımı, istemcinin otomatik kurtarması için gereken sağlayıcının güvenli JSON şeklini ve ifadesini korur; ancak bu, bayt düzeyinde bire bir aktarım değildir: özyinelemeli temizleyici, serileştirmeden önce her zaman çalışır. Döngüsel, BigInt içeren veya kötü niyetli `toJSON()` gövdeleri güvenli biçimde başarısız olur ve aktarım için uygun sayılmaz. OCR ve moderasyon da aynı kuralı uygular; JSON olmayan, boş veya yanlış etiketlenmiş üst kaynak gövdeleri, standart OmniRoute JSON hata zarfına dönüştürülür.

## Bilinen CodeQL sınırlaması: özel temizleyiciler tanınmıyor

CodeQL sorgusu [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/), temizleyici kalıplarından oluşan sabit bir izin verilenler listesi kullanır (ör. satır içi `.split("\n")[0]`, belirli regex biçimleriyle `String#replace`, `Error` üzerindeki `.message` özelliğine erişim). Bizim `sanitizeErrorMessage()` gibi özel bir yardımcı üzerinden yapılan dolaylı işlemleri **tanımaz**.

Bu, bu modül aracılığıyla temizleme yaptığı açıkça gösterilebilen çağrı noktalarının — örneğin `open-sse/utils/error.ts::errorResponse` ve `open-sse/executors/cursor.ts::buildErrorResponse` — kod işlevsel olarak güvenli olsa bile uyarı vermeye devam edebileceği anlamına gelir. Önceki kapatma örnekleri: `#224`, `#231` (Mayıs 2026); her ikisi de teknik gerekçeyle `false positive` olarak işaretlenmiştir.

**Yeni bir oluşum nasıl ele alınmalı:**

1. Çağrı noktasının mesajı gerçekten `sanitizeErrorMessage` / `buildErrorBody` / yukarıda belgelenen sarmalayıcılardan biri üzerinden geçirdiğini doğrulayın (çağrı zincirini baştan sona okuyun — bir yoruma güvenmeyin).
2. `tests/unit/error-message-sanitization.test.ts` dosyasının bu yolu test ettiğini doğrulayın (veya test kapsamı ekleyin).
3. Bu belgeye atıfta bulunarak uyarıyı `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` aracılığıyla kapatın.
4. Her yere `.split("\n")[0]` satır içi ekleyerek sorunu "düzeltmeye" **çalışmayın** — yardımcı, tek doğruluk kaynağıdır; kalıbı çoğaltmak, tarayıcıyı memnun ediyor görünmek uğruna temizleyiciyi zayıflatır (yol temizleme, uzunluk sınırı ve tür dönüştürme özellikleri kaybolur).

CodeQL'nin [`@codeql/javascript-models` özel temizleyici yapılandırması](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) gibi isteğe bağlı özellikleri benimsemek uzun vadeli çözümdür; bu, söz konusu belgenin kapsamı dışındadır.

## Referanslar

- [CWE-209: Hata Mesajı Yoluyla Bilgi İfşası](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Hata İşleme Başvuru Kılavuzu](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Yardımcıyı merkezileştiren commit: `1a39c31f` — _fix(security): genel upstream kimlik bilgilerini maskele + hata temizlemeyi merkezileştir_
