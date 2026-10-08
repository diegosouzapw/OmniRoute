# Release-Green: keeping the queue and release branch green (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Bunun çözdüğü sorun

**Tam geçit** (`.github/workflows/ci.yml` — birim testi parçaları, vitest, ratchet'lar,
`package-artifact`, SonarQube, E2E) **yalnızca release PR'ında** (PR → `main`) çalışır. Hedefi
`release/**` olan PR'lar **hızlı geçitlerden** (`quality.yml`: TIA'dan etkilenen testler + tür denetimi + lint)
ve kod değişiklikleri için **tavsiye niteliğinde** bir production derlemesinden geçer. Sonuç olarak: yalnızca release'te ortaya çıkan kırmızılar release branch'inde sessizce birikebilir ve release zamanında
**her seferinde bir tane olmak üzere yaklaşık 40 dakikalık katmanlar hâlinde patlayabilir**.

"release-green ailesi", bu kırmızıları **önceden tespit etmek** için vardır — tam geçidin eşdeğerini
istenilen herhangi bir zamanda **yerel olarak / release dışında** doğrular; böylece release PR'ı ilk CI çalıştırmasında
zaten yeşil olur.

> **Tartışmaya kapalı ilke:** Bunların hiçbiri katkıda bulunan kişiyi engellemez. PR'larının başarısız olmasına neden olan
> zorunlu bir kontrol eklemeyiz. **Sapma** (ratchet'lar), bakım sorumlusunun release sırasında yeniden temel değer belirlemesi içindir —
> hiçbir zaman katkıda bulunan kişinin sorunu değildir. Hiçbir parça bir PR'ı **kapatmaz** (emeğin başkasına mal edilmesi) veya
> geçmesi için bir testi **zayıflatmaz**.

## Aile (4 parça) — ve her birinin bağımsız olarak nasıl çalıştığı

| Parça                                                                   | Nedir                                                                            | Ne zaman çalıştırılır                                                                       | Kapsam                             |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------- |
| **`/green-prs`** (Çözüm A)                                              | Bakım sorumlusu tarafından **açık PR kuyruğunda** isteğe bağlı tarama            | **Bağımsız olarak, periyodik biçimde** — ve özellikle bir `/generate-release` **öncesinde** | Tüm PR kuyruğu → `release/**`      |
| **`/validate-release-green`** (Çözüm C — `npm run check:release-green`) | Doğrulama motoru: tam geçidi bir branch VEYA merge adayı üzerinde yeniden üretir | Bağımsız olarak, istenilen herhangi bir zamanda                                             | Belirli bir branch veya merge PR'ı |
| **`/babysit <PR#>`**                                                    | **Tek** bir PR'ın **canlı CI** sürecini yeşile ulaşana kadar yönlendirir         | Bağımsız olarak, PR başına                                                                  | Tek bir PR                         |
| **`nightly-release-green.yml`** (Çözüm D)                               | Otomatik gecelik workflow; HARD kırmızı durumunda issue açar                     | Otomatik (cron)                                                                             | Etkin release branch'i             |

**"Bu yalnızca release'ler için mi?" sorusunun kısa yanıtı:** **hayır.** `/green-prs`,
**release'ler arasında periyodik olarak** çalıştırılmak üzere tasarlanmıştır. Bağımsız olarak çalıştırılması normal kullanımdır — release yalnızca
onu çalıştırmanın en fazla değer sağladığı andır.

## PR'dan sürüme yönelik danışma amaçlı derleme

`quality.yml` artık taslak olmayan kod PR'ları ve Mergify kuyruk dalları için `Build (advisory)` işini içeriyor.
Bu iş, `ci.yml` dosyasındaki üretim derleme tarifini yansıtır: Node 24, `npm-ci-retry`,
`check:node-runtime` ve `OMNIROUTE_USE_TURBOPACK=1` ile `npm run build`. Bu iş akışında sonraki hiçbir kalite işi bir derleme çıktısını kullanmadığından, kasıtlı olarak derleme çıktısı yüklemez.
Sinyalin PR'dan sürüme geçişi engelleyen bir kapı hâline gelmesi için bir haftalık kararlı sürüm PR'ı çalıştırmalarının ardından `continue-on-error` seçeneğini kaldırın.

## Çözüm C — `npm run check:release-green` (motor)

Mevcut çalışma ağacına karşı sürümle eşdeğer doğrulamayı yeniden üretir ve her başarısız sonucu sınıflandırır:

- **HARD** (typecheck, lint hataları, unit, vitest, db-rules, public-creds, isteğe bağlı
  `package-artifact`) → **gerçek kusur**; `exit 1`. Kaynak dalda düzeltilir (TDD, Kural #18).
- **DRIFT** (eslint **uyarıları**, cognitive-complexity, file-size) → döngü sırasında biriken eşik sapmasıdır,
  **katkıda bulunan kişinin hatası değildir**; yalnızca raporlanır ve **sürüm sırasında bakım sorumlusu tarafından
  yeniden temel alınır**. DRIFT çıkış kodunu **asla** değiştirmez; dolayısıyla hiç kimseyi engellemez.

```bash
npm run check:release-green                 # mevcut dal (çalışma ağacı)
node scripts/quality/validate-release-green.mjs --json   # yapılandırılmış çıktı
node scripts/quality/validate-release-green.mjs --quick  # unit+vitest'i atlar (yalnızca drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # package-artifact'ı içerir (yavaş)
```

Yalnızca tanılama yapar ve **raporlar** (otomatik düzeltme yoktur). Yeşile düzeltme orkestrasyonu
`/green-prs` ve `/review-prs` içinde bulunur.

## Çözüm A — `/green-prs` (kuyruk taraması)

Prosedür (özet — ayrıntılar için `green-prs` becerisine bakın):

1. Aktif sürüm dalına yönelik açık PR kuyruğunun **envanterini çıkarın**.
2. Her PR'ı **triyajdan geçirin** (uygulanabilir / reddedilmeye uygun / yazar müdahalesi gerekli) — reddedilmeye uygun/yazar müdahalesi gerekli olanlar
   **raporlanır, kapatılmaz** (kararı yazar verir).
3. Her uygulanabilir PR'ı **yalıtılmış bir worktree** içinde (Kural #19) sürüm dalının en son noktasına taşıyın ve
   `npm run check:release-green` komutunu çalıştırın:
   - **HARD** → ortak yazarlık yoluyla **katkıda bulunan kişinin dalında** düzeltin (yazarın "Merged" durumunu korur),
     tüm HARD sonuçları giderilene kadar yeniden çalıştırın.
   - **DRIFT** → olduğu gibi bırakın; sürüm sırasında yeniden temel alınacaktır.
4. PR × (karar, HARD sonuçları, düzeltildi mi?, DRIFT, şu anda release-green mi?) tablosunu **raporlayın**.

Kuyruğu birleştirme yapmadan **hazırlayabilir**; yalnızca açıkça istendiğinde birleştirir ve hiçbir PR'ı kapatmaz.

## Önerilen çalışma sıklığı

- **`/green-prs` komutunu düzenli aralıklarla** (ör. haftalık) ve **her
  `/generate-release` öncesinde** çalıştırın.
- Sürekli bir sinyal olarak **`nightly-release-green.yml`** dosyasını (Çözüm D) koruyun: bir
  HARD başarısızlık sorunu açtığında tarama zamanı gelmiştir.
- Bir dalı veya belirli bir birleştirme adayını kontrol etmek için gerektiğinde **`/validate-release-green`** kullanın.
- Belirli bir PR'ın canlı CI üzerinde yeşile ulaştırılması gerektiğinde **`/babysit <PR#>`** kullanın.

## Sürümle ilişkisi

- `/generate-release`, doğrulamayı **Aşama 0'da (ön kontrol)** çağırır: sürüm PR'ını açmadan önce DRIFT sonuçlarını yeniden temel alır ve
  HARD sonuçlarını düzeltir.
- `/review-prs`, birleştirme kararı adımında release-green kapısını kullanır (birleştirmeden önce yeşil).

Tüm parçaların amacı aynıdır: sürüm gününde 40 dakikalık katmanlar hâlinde başarısız sonuçların peşinde koşmak yerine **ilk CI çalıştırmasında yeşil bir sürüm PR'ı** elde etmek.
