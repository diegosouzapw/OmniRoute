# Egress IP Family Policy (IPv4/IPv6) (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Giden trafiği proxy başına tek bir IP ailesine — `auto`, `ipv4` veya `ipv6` — sabitleyin; böylece yalnızca IPv6 kullanan bir çıkış hiçbir zaman fark edilmeden yeniden IPv4'e sızmaz.**

> **Doğru bilginin kaynağı:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute, her proxy'nin bir **adres ailesi çıkış yönergesi** taşımasına olanak tanır. Varsayılan olarak işletim sistemi IPv4 veya IPv6'yı seçer (çift yığın, "Happy Eyeballs"). Yönergeyi `ipv4` veya `ipv6` olarak ayarladığınızda OmniRoute, söz konusu proxy üzerinden kurulan her bağlantıyı seçilen aileye sabitler ve diğer aileye geri dönmek yerine **güvenli biçimde başarısız olur**.

Bu sayfa, yönergenin ne olduğunu, neden var olduğunu, nerede yapılandırıldığını ve çalışma zamanında nasıl çözümlendiğini açıklar.

---

## İçindekiler

- [Nedir](#what-it-is)
- [Neden Vardır](#why-it-exists)
- [Üç Değer](#the-three-values)
- [Nasıl Yapılandırılır](#how-to-configure-it)
- [`auto` Nasıl Çözümlenir](#how-auto-resolves)
- [`ipv4` / `ipv6` Nasıl Uygulanır](#how-ipv4--ipv6-are-enforced)
- [SOCKS5 Uyumluluğu](#socks5-compatibility)
- [Güvenli Biçimde Başarısız Olma Davranışı](#fail-closed-behavior)
- [Veri Modeli](#data-model)
- [İlgili Belgeler](#related-documentation)

---

## Nedir

Kayıt defterindeki her proxy, bir Zod enum'u tarafından doğrulanan ve üç olası değere sahip bir `family` alanı içerir:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

Alanın varsayılan değeri `"auto"` olup önceki çift yığın davranışını korur. Alanı `ipv4` veya `ipv6` olarak ayarlamak, söz konusu proxy için bağlantı ailesini sabitler.

Yönerge, bilinmeyen herhangi bir değerin `auto` olarak ele alınmasını sağlamak üzere her yerde tek bir yardımcı aracılığıyla normalleştirilir:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Neden Vardır

PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777) ile kullanıma sunulmuştur. Temel gerekçeler:

| Sorun                                             | Yönergenin sağladığı çözüm                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Yalnızca IPv6 kullanan çıkışın IPv4'e sızması** | Bir proxy ana bilgisayarı hem A hem de AAAA kayıtlarına sahip olduğunda (veya işletim sistemi IPv4'ü tercih ettiğinde), Happy Eyeballs yalnızca IPv6 kullanan bir yol amaçlasanız bile IPv4 üzerinden dışarı bağlantı kurabilir. `ipv6`'ya sabitlemek bu sızıntıyı ortadan kaldırır.                                                                                                   |
| **Paylaşılan çıkış anomalisi nedeniyle iptal**    | Dönen sağlayıcılar (codex/openai), çok sayıda hesap yüksek hacimde **aynı** IP üzerinden çıkış yaptığında token'ları iptal eder. Çıkış ailesini denetlemek, hesapları birbirinden ayrı ve öngörülebilir çıkış yollarında tutmanın bir parçasıdır (bununla birlikte kullanılan çıkış IP'si tanılamaları için [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) dosyasına bakın). |
| **Uyumluluk/test için deterministik çıkış**       | Trafiğin belirli bir aile üzerinden çıktığını garanti etmeniz gerektiğinde `auto` yeterli değildir.                                                                                                                                                                                                                                                                                    |

Yönerge kasıtlı olarak global değil, **proxy başınadır** — havuzunuzdaki farklı proxy'ler farklı politikalara sahip olabilir.

---

## Üç Değer

| Değer  | Kullanıcı arayüzü etiketi | Davranış                                                                                                                                                                                   |
| ------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto` | `Otomatik (çift yığın)`   | İşletim sistemi aileyi seçer. IP değişmezi olan bir proxy ana makinesi için aile, değişmezin kendisinde bulunur; bir ana makine adı için her iki aile de kullanılabilir. Varsayılan budur. |
| `ipv4` | `Yalnızca IPv4`           | Bağlantıyı IPv4'e sabitler. Proxy ana makinesinin IPv4 (A) kaydı yoksa bağlantı güvenli biçimde başarısız olur.                                                                            |
| `ipv6` | `Yalnızca IPv6`           | Bağlantıyı IPv6'ya sabitler. Proxy ana makinesinin IPv6 (AAAA) kaydı yoksa bağlantı güvenli biçimde başarısız olur.                                                                        |

Kullanıcı arayüzü dizeleri `src/i18n/messages/en.json` dosyasında bulunur (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Nasıl Yapılandırılır?

### Kontrol Paneli

Seçici, **Proxy Havuzu** sekmesindeki proxy formunda bulunur:

1. **Kontrol Paneli → Ayarlar → Proxy → Proxy Havuzu** bölümünü açın
2. Bir proxy ekleyin veya düzenleyin
3. **IP ailesi** açılır menüsünü `Otomatik (çift yığın)`, `Yalnızca IPv4` veya `Yalnızca IPv6` olarak ayarlayın
4. Kaydedin

Denetim, `ProxyRegistryManager.tsx` tarafından oluşturulur (`proxy/ProxyPoolTab.tsx` içinde bağlanır).

### API

`family` alanı, proxy kayıt defteri oluşturma/güncelleme yüklerinin bir parçasıdır; `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) tarafından doğrulanır ve `POST` / `PATCH /api/v1/management/proxies` tarafından işlenir:

```bash
# Yalnızca IPv6 kullanan bir proxy oluştur
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Mevcut bir proxy'yi yalnızca IPv4 kullanacak şekilde değiştir
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Aynı alan, yukarı akış proxy girdileri için kullanılan satır içi proxy yapılandırma nesnesi tarafından da kabul edilir (`upstream_proxy_config.family`; bkz. [Veri Modeli](#data-model)).

Proxy CRUD/atama API'sinin geri kalanı için [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md) belgesine bakın.

---

## `auto` Nasıl Çözümlenir?

`family`, `auto` olduğunda OmniRoute herhangi bir yönerge **eklemez** — proxy URL'si olduğu gibi kullanılır ve bağlantı ailesi kendiliğinden belirlenir.

URL oluşturma sırasında (`open-sse/utils/proxyDispatcher.ts` içindeki `proxyConfigToUrl` / `normalizeProxyUrl`), bir `auto` proxy, işaretçi içermeyen düz bir URL üretir:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Yönlendirme sırasında (`resolveDispatcherFamily`), `auto`, IP değişmezi olan bir ana makinenin kendiliğinden belirlenen ailesine veya bir ana makine adı için `null` değerine (işletim sisteminin karar vermesine izin verilir) çözümlenir:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // Bir ana makine adı için null → işletim sistemi seçer
  // ...
}
```

Dolayısıyla:

- `auto` + IP değişmezi olan ana makine (`192.0.2.1` / `[2001:db8::1]`) → bu değişmezin ailesi.
- `auto` + ana makine adı → `null` → standart çift yığınlı işletim sistemi çözümlemesi.

---

## `ipv4` / `ipv6` Nasıl Uygulanır

`auto` olmayan bir yönerge, normalleştirilmiş proxy URL'sine bir kez eklenen tek bir sentetik sorgu işaretçisi — `?family=ipv4` veya `?family=ipv6` — olarak taşınır. `normalizeProxyUrl`, port ayrıştırmasını hiçbir zaman bozmaması için bu işaretçiyi kaldırıp tam olarak bir kez yeniden eklemeye özen gösterir.

Dispatcher oluşturulduğunda işaretçi okunur ve somut bir bağlantı ailesine dönüştürülür. Ana makine, **zıt** aileden bir IP değişmez değeri ise OmniRoute hata fırlatır (çelişki durumunda bağlantı reddedilir):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

Ardından somut aile bağlayıcıda sabitlenir:

- **HTTP/HTTPS proxy'leri** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — Happy Eyeballs'ı devre dışı bırakarak yalnızca seçilen aileye bağlantı kurulmasını sağlar.
- **SOCKS5 proxy'leri**: özel bir bağlayıcı, `socket_options: { family, autoSelectFamily: false }` değerini SOCKS istemcisine aktarır (bkz. [SOCKS5 Uyumluluğu](#socks5-compatibility)).

---

## SOCKS5 Uyumluluğu

Aile sabitleme, SOCKS5 proxy'leriyle çalışır ancak standart `fetch-socks`, proxy atlamasının ailesini sabitlemek için gereken soket seçeneklerini kullanıma açmaz. OmniRoute bunun için kendi bağlayıcısını sunar:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Tüm SOCKS5 gönderimleri, `family` değerinden bağımsız olarak (bir ana makine adı üzerinden `null` / `auto` dahil) `createSocksDispatcherWithFamily` üzerinden geçer: `buildSocksFamilySocketOptions(null)`, `{}` sonucunu üretir ve IPv6'ya özel bir çıkış politikasında Happy Eyeballs'ın IPv4'ü seçememesi için aynı `SocksClient.createConnection` + TLS `buildConnector` yolu, `socket_options` sabitlemesiyle kullanılır.

SOCKS5 desteği varsayılan olarak etkindir (`ENABLE_SOCKS5_PROXY=false` ile devre dışı bırakılabilir); bkz. [PROXY_GUIDE.md → Ortam Değişkenleri](../ops/PROXY_GUIDE.md#environment-variables).

---

## Hata Durumunda Bağlantıyı Reddetme Davranışı

Yönergenin temel amacı, sessizce yanlış aileye geri dönmek yerine bağlantıyı **reddetmektir**. Bunu iki koruma uygular:

1. **Değişmez değer çelişkisi** — IP değişmez değerli bir ana makineyle çelişen yönerge, dispatcher oluşturulurken hata fırlatır (`resolveDispatcherFamily`, yukarıda gösterilmiştir).

2. **Ana makine adı için bağlantı öncesi DNS denetimi** — ailesi sabitlenmiş ana makine adı biçimindeki bir proxy için `proxyFetch.ts`, çıkış yapmadan **önce** `assertHostnameSupportsFamily` aracılığıyla ana makine adının gerekli ailede gerçekten bir kaydı olduğunu doğrular:

   ```ts
   // open-sse/utils/proxyFamilyResolve.ts
   const hasFamily = records.some((r) => r.family === family);
   if (!hasFamily) {
     throw new Error(
       `[ProxyFamily] Proxy host ${host} has no ${family === 6 ? "IPv6 (AAAA)" : "IPv4 (A)"} record; ` +
         `refusing ${family === 6 ? "IPv6" : "IPv4"}-only egress (fail-closed)`
     );
   }
   ```

   Başarısızlık durumunda `proxyFetch.ts`, hatayı `code = "PROXY_FAMILY_UNAVAILABLE"` ve `statusCode = 503` ile etiketler. DNS çözümleme hatası da aynı şekilde bağlantıyı reddetme olarak değerlendirilir (çıkış yapılması reddedilir).

IP değişmez değerli ana makineler için bağlantı öncesi DNS denetimi işlem yapmaz — aileleri kendiliğinden bellidir ve arama gerektirmez.

---

## Veri Modeli

`family` sütunu, `099_proxy_family.sql` migrasyonu tarafından **iki** tabloya eklendi:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — kayıt defteri girdileri için proxy başına yönerge (`src/lib/db/proxies.ts`). Çözümleme sorguları, diğer proxy sütunlarıyla birlikte `family` alanını seçer ve eksik/dize olmayan bir değer `"auto"` değerine dönüştürülür.
- `upstream_proxy_config.family` — aynı `"auto"` varsayılanıyla üst akış proxy girdileri için yönerge (`src/lib/db/upstreamProxy.ts`).

Çözümlenmiş bir proxy nesnesi `auto` olmayan bir `family` taşıdığında, `proxyConfigToUrl`, sabitlemenin dağıtıcıya kadar korunması için `?family=` işaretçisini ekler.

---

## İlgili Belgeler

> 📖 **İlgili belgeler:**
>
> - [Proxy Kılavuzu](../ops/PROXY_GUIDE.md) — proxy sisteminin tamamı: kayıt defteri CRUD işlemleri, 4 seviyeli çözümleme, rotasyon, sistem durumu denetimi, API referansı
> - `docs/security/STEALTH_GUIDE.md` (git'te bulunur; `/docs` içine derlenmez) — proxy üzerinde çalışan TLS parmak izi ve CLI parmak izi katmanları
> - [Rota Koruması Seviyeleri](./ROUTE_GUARD_TIERS.md) — yalnızca yerel rotalar için loopback zorunluluğu
