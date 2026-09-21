# Error Message Sanitization (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Həqiqətin əsas mənbəyi:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` və `open-sse/utils/error.ts` daxilindəki ictimai qurucular
> **Testlər:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Son yenilənmə:** 2026-09-02 — v3.8.51
> **Auditoriya:** Xəta cavabları ilə işləyən istənilən mühəndis (HTTP marşrutları, SSE axınları, icraçılar, MCP işləyiciləri).
> **Status:** Müştəriyə xəta mesajı qaytaran hər bir kod yolu üçün **MƏCBURİDİR**.

## Bu niyə mövcuddur

CodeQL qaydası `js/stack-trace-exposure` (CWE-209), icra zamanı yaranan istisnadan qaynaqlanan xəta mesajının sanitizasiya edilmədən HTTP / SSE cavabına çatdığı istənilən kod yolunu işarələyir. İstehsal mühitindəki cavablarda stek izləri və mütləq fayl yolları hücumçulara aşağıdakı imkanları verir:

- Daxili qovluq quruluşu (`/srv/app/src/lib/...`) → sonrakı hücumlar üçün kəşfiyyat.
- Stek freymlərindən müəyyən edilən kitabxana / freymvork versiyaları → hədəflənmiş istismar üsulunun seçilməsi.
- Xəta mətnlərinə sətir interpolyasiyası ilə daxil edilə bilən həssas icra mühiti dəyərləri (DB sorğuları, konfiqurasiya dəyərləri).

`open-sse/utils/error.ts` tərəfindən ixrac edilən `sanitizeErrorMessage` köməkçisi aşağıdakı sızma siniflərini aradan qaldırır:

1. Fiziki, seriallaşdırılmış və birmənalı şəkildə sətirdaxili olan JavaScript stek freymi sonluqları.
2. Təhlükəsiz HTTPS URL-lərini və açıq şəkildə işarələnmiş API marşrutlarını qoruyaraq mütləq POSIX, Windows, UNC və `file://` fayl sistemi yolları.
3. Giriş məlumatı təyinatları, geniş yayılmış provayder token formatları, məxfi açarlı PEM blokları və base64 məlumat URL-ləri.

Sanitizator giriş uzunluğunu məhdudlaşdırır və atılmış dəyərin sətirə çevrilməsi uğursuz olduqda təhlükəsiz şəkildə işləməyi dayandırır. Rekursiv yuxarı axın JSON sanitizasiyası həmçinin cavab seriallaşdırılmazdan əvvəl təhlükəli giriş məlumatı/yol açarlarını, sessiya aliaslarını və prototipə nəzarət açarlarını silir.

## Məcburi nümunə

### 1. Xəta cavabının yaradılması (HTTP / API marşrutları)

`buildErrorBody()` istifadə edin — sanitizasiya daxilidir:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... işləyici məntiqi ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Yaxud eyni moduldakı rahatlıq sarmalayıcıları üçün:

```ts
import {
  errorResponse, // birdəfəlik Response obyekti
  writeStreamError, // SSE yazıcısı
  createErrorResult, // { success: false, status, response, ... } forması
  unavailableResponse, // Retry-After əlavə edir
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Bunların hamısı kanonik ictimai xəta sərhədini tətbiq edir. `errorResponse`, `writeStreamError` və `createErrorResult` `buildErrorBody` üzərindən keçir; üç ixtisaslaşdırılmış yenidən cəhd/dövrə köməkçisi isə ictimai kontekstini birbaşa proyeksiya və sanitizasiya edir. Bu köməkçilərdən istifadə edərkən **`sanitizeErrorMessage` funksiyasını heç vaxt əl ilə çağırmağa ehtiyac yoxdur**.

### 2. Fərdi xəta zərfləri (nadir hallarda)

Yuxarıdakı köməkçilərdən istifadə edə bilmədikdə (məsələn, cavab forması Connect-RPC kimi yuxarı axın protokolu tərəfindən müəyyən edildikdə), `sanitizeErrorMessage` funksiyasını birbaşa idxal edin:

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

Bu, fərdi xəta gövdəsi hazırlamaq üçün icazə verilən yeganə üsuldur. İstinad reallaşdırması üçün `open-sse/executors/cursor.ts::buildErrorResponse` bölməsinə baxın.

### 3. Jurnala yazma və cavablandırma

Etibarlı daxili istisnalar tam mesajını və stekini saxlaya bilər ki, operatorlar sazlama apara bilsinlər. Provayder, doğrulama, brauzer sessiyası və ya giriş məlumatları ilə əlaqəli sərhədlərdən qaynaqlanan dəyərlər konsol çıxışına, audit metadatasına və ya daimi çağırış jurnallarına daxil edilməzdən əvvəl sanitizasiya olunmalıdır. Nümunə:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "işləyici uğursuz oldu"); // yalnız etibarlı daxili istisna
  return errorResponse(500, getErrorMessage(err)); // sanitizasiya edilib — müştəriyə göndərilir
}
```

Provayder tərəfindən idarə olunan uğursuzluqlar üçün jurnala yazılan dəyəri də proyeksiya edin:

```ts
log.error({
  message: sanitizeErrorMessage(err) || "Provayder sorğusu uğursuz oldu",
});
```

### 4. Qadağan edilmiş nümunələr

❌ **Heç vaxt** emal edilməmiş istisna çıxışını Response gövdəsinə yerləşdirməyin:

```ts
// PİS: stek izi + fayl yolları müştəriyə çatır
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Heç vaxt** öz birinci sətir bölücünüzü yaratmayın:

```ts
// PİS: mütləq yolları silməyi unudur, kanonik köməkçidən yayına bilər
const safe = String(err).split("\n")[0];
```

❌ **Heç vaxt** yalnız marşrutda sanitizasiya edib SSE yolunu unutmayın. Axına yazan hər şey `writeStreamError` (və ya onun əsasındakı `buildErrorBody`) üzərindən keçir.

❌ Xəta mesajlarına **heç vaxt** qəsdən `process.cwd()`, `__filename`, `__dirname` və ya mühit dəyişənlərindən əldə edilən yolları daxil etməyin. Sanitizator əlavə müdafiə kimi mütləq yolları əhatə edir, lakin çağıran tərəflər ilk növbədə topologiyanı üzə çıxaran mesajlar yaratmamalıdır.

## CI-də əhatə dairəsi

`tests/unit/error-message-sanitization.test.ts` aşağıdakıları təmin edir:

- `/api/model-combo-mappings/*` altındakı hər bir marşrut 4xx/5xx hallarında sanitizasiya edilmiş gövdələr qaytarır.
- `sanitizeErrorMessage` çoxsətirli stek izlərini silir.
- `sanitizeErrorMessage` POSIX və Windows mütləq yollarını `<path>` ilə əvəz edir.
- `sanitizeErrorMessage` `null`/`undefined`/`Error` instansiyası girişlərini təhlükəsiz şəkildə emal edir.
- `buildErrorBody` öz `message` sahəsində stek izlərini heç vaxt ifşa etmir.

Yeni marşrut və ya icraedici əlavə edərkən bu fayldakı təsdiqləmə nümunəsini köçürün. Əhatə həddi (`npm run test:coverage`) ifadələr/sətirlər/funksiyalar/budaqlar üçün ≥60% tələb edir — xəta yolları əhatə edilməlidir.

## Əlaqəli nəzarət mexanizmləri

- `.github/security` daxilindəki `js/stack-trace-exposure` CodeQL xəbərdarlıqları həmişə **ya** bu köməkçi funksiyalar vasitəsilə düzəldilməli, **ya da** bu sənədə istinad edən şərhlə rədd edilməlidir.
- `pino` redaktə konfiqurasiyası (`src/shared/utils/logRedaction.ts`) etibarlı strukturlaşdırılmış jurnalları
  ayrıca emal edir. Bu sənəd açıq cavab mesajlarını və davamlı çağırış/proksi-jurnal sərhədlərini
  keçən provayder tərəfindən idarə olunan dəyərləri əhatə edir.
- Yuxarı axın başlıqları üçün qadağa siyahısı (`src/shared/constants/upstreamHeaders.ts`) başlıq sızmalarını əhatə edir — yeni məlumat sızdırma riski əlavə edərkən hər iki faylı uyğun saxlayın.

## Yuxarı axın təfərrüatlarının ötürülməsi

`buildErrorBody` istəyə bağlı üçüncü `upstreamDetails` arqumentini (yuxarı axın
provayderindən gələn, təhlil edilmiş xam gövdə) qəbul edir. Təqdim edildikdə, cavaba `upstream_details`
kimi daxil edilməzdən əvvəl `sanitizeUpstreamDetails` tərəfindən sanitizasiya olunur.

İstəyə bağlı dördüncü `classification`
(`{ type?: string; code?: string; reason?: string }`) arqumenti açıq təsnifatı qəbul edir.
Hər bir sahə məhdudlaşdırılmış açıq identifikator lüğətinə proyeksiya edilir. Təhlükəli, giriş məlumatına bənzəyən,
idarəetmə simvolları ehtiva edən və ya həddindən artıq uzun dəyərlər statusdan törədilmiş tip/koda geri qayıdır; təhlükəli istəyə bağlı
səbəb isə buraxılır. Üçrəqəmli HTTP status identifikatorları (`100`-dən `599`-a qədər), rəqəmsal yuxarı axın statusunu maşın tərəfindən oxuna bilən kod kimi təqdim edən provayder müqavilələri üçün
etibarlı olaraq qalır. Eyni məhdud diapazon yerli yaradılmış HTTP-status yer tutucusu formasında da qəbul edilir; ixtiyari provayder
nömrələri və adları lüğətdən kənarda qalır.

Hər bir açıq təsnifatı həmin dördüncü arqumentdə ötürün. `buildErrorBody()` qaytardıqdan sonra
`body.error.code`, `body.error.type` və ya `body.error.reason` sahələrinin üzərinə heç vaxt yazmayın;
qurucudan sonrakı dəyişiklik açıq proyeksiyadan yan keçir.

`upstreamDetails` üçün tətbiq olunan sanitizasiya qaydaları:

1. Sətir yarpaqları: `sanitizeErrorMessage` vasitəsilə emal edilir (stekləri və mütləq yolları silir).
2. Təhlükəli yol, giriş məlumatı, sessiya ləqəbi və prototipə nəzarət açarları silinir.
3. Dərinlik həddi: 4 səviyyədən sonrakı iç-içəlik `"[truncated]"` sətri ilə əvəz olunur.
4. Massivlər maksimum 32 elementlə məhdudlaşdırılır.

Yalnız təhlil edilmiş provayder xəta gövdəsi olan çağırış nöqtələri `upstreamDetails` ötürməlidir. Daxili OmniRoute
xətaları (SSE təhlili uğursuzluqları, boş məzmun, qoruyucu məhdudiyyət blokları) bunu ehtiva etməməlidir.

Xam `err.stack`, `err.message` və ya icra zamanı yaranan istisnadan gələn hər hansı sətri
`upstreamDetails`-a ötürməyin. Bunlar yuxarı axın gövdəsi olmadan yenə də
`errorResponse` / `buildErrorBody(code, msg)` vasitəsilə emal edilməlidir.

Yuxarı axın 4xx xətalarının seçmə ötürülməsi müştərinin avtomatik bərpası üçün tələb olunan provayderin təhlükəsiz JSON formasını və ifadə tərzini qoruyur,
lakin bu, bayt-bayt ötürülmə deyil: rekursiv sanitizator serializasiyadan əvvəl həmişə işə salınır.
Dövri, BigInt ehtiva edən və ya zərərli `toJSON()` gövdələri təhlükəsiz şəkildə rədd edilir və
ötürülməyə uyğun sayılmır. OCR və moderasiya eyni qaydanı tətbiq edir; JSON olmayan, boş və ya yanlış etiketlənmiş
yuxarı axın gövdələri kanonik OmniRoute JSON xəta zərfinə çevrilir.

## Məlum CodeQL məhdudiyyəti: xüsusi sanitarizatorlar tanınmır

CodeQL sorğusu [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) sanitarizator nümunələrinin sabit icazə siyahısından istifadə edir (məsələn, sətirdaxili `.split("\n")[0]`, müəyyən regex formalarına malik `String#replace`, `Error` üzərində `.message` xassəsinə giriş). O, bizim `sanitizeErrorMessage()` kimi xüsusi köməkçi vasitəsilə dolayı çağırışı **tanımır**.

Bu o deməkdir ki, bu modul vasitəsilə sanitarizasiya etdiyi sübut edilə bilən çağırış nöqtələri — məsələn, `open-sse/utils/error.ts::errorResponse` və `open-sse/executors/cursor.ts::buildErrorResponse` — kod funksional baxımdan təhlükəsiz olsa belə, xəbərdarlıq yaratmağa davam edə bilər. Əvvəlki rəddetmələr: `#224`, `#231` (may 2026); hər ikisi texniki əsaslandırma ilə `false positive` kimi işarələnib.

**Yeni halı necə idarə etməli:**

1. Çağırış nöqtəsinin mesajı həqiqətən `sanitizeErrorMessage` / `buildErrorBody` / yuxarıda sənədləşdirilmiş örtüklərdən biri vasitəsilə ötürdüyünü təsdiqləyin (çağırış zəncirini başdan sona oxuyun — şərhə etibar etməyin).
2. `tests/unit/error-message-sanitization.test.ts` faylının bu yolu sınaqdan keçirdiyini təsdiqləyin (və ya test əhatəsi əlavə edin).
3. Bu sənədə istinad edərək xəbərdarlığı `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` vasitəsilə rədd edin.
4. Hər yerdə `.split("\n")[0]` ifadəsini sətirdaxili yazmaqla problemi "həll etməyin" — köməkçi yeganə həqiqət mənbəyidir; nümunənin təkrarlanması skaneri razı salmaq görüntüsü naminə sanitarizatoru zəiflədir (yol təmizlənməsi, uzunluq həddi və tip çevrilməsi itirilir).

CodeQL-in [`@codeql/javascript-models` xüsusi sanitarizator konfiqurasiyası](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) kimi seçimlə aktivləşdirilən funksiyaların qəbul edilməsi uzunmüddətli həlldir; bu, həmin sənədin əhatə dairəsindən kənardadır.

## İstinadlar

- [CWE-209: Xəta mesajı vasitəsilə məlumatın ifşası](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Xətaların idarə edilməsi üzrə qısa təlimat](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Köməkçini mərkəzləşdirən commit: `1a39c31f` — _fix(security): açıq yuxarı axın giriş məlumatlarını maskala + xəta sanitarizasiyasını mərkəzləşdir_
