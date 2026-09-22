# SQLite Runtime Resolution (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute, başlangıçta SQLite sürücüsünü 5 adımlı bir geri dönüş zinciri aracılığıyla çözümler:

1. **Paketle birlikte gelen `better-sqlite3`** (`package.json` içindeki `dependencies` aracılığıyla)
   — en hızlı seçenektir; yerel ikili dosyayı kullanır ve derleme araçları mevcut olduğunda `npm install` tarafından yüklenir.

2. **Çalışma zamanında yüklenen `better-sqlite3`** (`~/.omniroute/runtime/` içinde)
   — ilk çalıştırmada **VEYA** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` tarafından gerektiğinde yüklenir.
   Bozuk veya yanlış platforma ait ikili dosyalara karşı koruma sağlamak amacıyla yüklemeden önce
   yerel `.node` sihirli baytlarını (ELF / Mach-O / PE) doğrular.

3. **`node:sqlite`** (Node ≥22.5 standart kitaplığı) — yerel derleme gerektirmez; her iki
   better-sqlite3 yolu da başarısız olduğunda kullanılır. Sınırlı bir özellik kümesine sahiptir.

4. **`sql.js`** (WASM) — son geri dönüş seçeneğidir. Her yerde çalışır ancak daha yavaştır
   ve verileri eşzamanlı olarak değil, belirli aralıklarla yazar.

## Bu karmaşıklık neden gerekli?

- **Windows EBUSY**: Önceki sürümün `better_sqlite3.node` dosyası çalışan bir işlem
  tarafından kilitlenmişse `npm install -g omniroute@latest` başarısız olabilir. Çalışma zamanı
  yüklemesinin `~/.omniroute/runtime/` içinde yapılması, global npm önbelleğini devre dışı bırakır.
- **Derleme araçlarının bulunmaması**: Bazı ortamlar (VS Build Tools bulunmayan kurumsal Windows
  sistemleri, minimal Docker imajları) `better-sqlite3` paketini derleyemez. Çalışma zamanı
  yükleyicisi npm kayıt defterinden önceden derlenmiş bir ikili dosya çözümler; geri dönüş
  sürücüleri ise bu işlem başarısız olsa bile OmniRoute'un başlatılabilmesini sağlar.
- **İnternete kapalı sistemler**: npm kayıt defterine erişilemiyorsa `node:sqlite`
  veya `sql.js`, temel işlevselliği garanti eder.

## Sihirli bayt doğrulaması

OmniRoute, çalışma zamanında yüklenmiş bir `.node` dosyasını yüklemeden önce ilk 8
baytı okur ve bilinen platform sihirli değerleriyle eşleştirir:

| Platform             | Baytlar (onaltılık) | Etiket      |
| -------------------- | ------------------- | ----------- |
| Linux                | `7F 45 4C 46`       | `elf`       |
| macOS 64 bit BE      | `FE ED FA CF`       | `macho`     |
| macOS 64 bit LE      | `CF FA ED FE`       | `macho-le`  |
| macOS fat (evrensel) | `CA FE BA BE`       | `macho-fat` |
| Windows              | `4D 5A` (MZ)        | `pe`        |

Sihirli değer eşleşmezse dosya yok sayılır ve geri dönüş zincirindeki bir sonraki adıma geçilir.

## Etkin sürücüyü kontrol etme

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Manuel kontrol

```bash
# Hızlı CI yüklemeleri için yükleme sonrası hazırlığı atla
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Çalışma zamanı better-sqlite3 paketini yeniden yüklemeye zorla
rm -rf ~/.omniroute/runtime
omniroute  # bir sonraki başlatmada yeniden yüklenir

# Hangi sürücünün etkin olduğunu kontrol et
omniroute config db-info  # (CLI komutu mevcutsa)
```

## Referans

Uygulama:

- `bin/cli/runtime/magicBytes.mjs` — ikili dosya sihirli baytlarını doğrulama yardımcıları
- `bin/cli/runtime/sqliteRuntime.mjs` — 5 adımlı çalışma zamanı çözümleyicisi + gerektiğinde yükleyici
- `bin/cli/runtime/index.mjs` — başlangıç düzenleyicisi (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm yükleme sonrası kancası (başarısızlığı kritik olmayan hazırlık)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` dışa aktarımları

## Tek yazıcılı topoloji (HA desteklenmez)

Yukarıdaki sürücü geri dönüş zinciri yine de **tek bir işlemde** çalışır. Varsayılan SQLite
yapılandırmasında OmniRoute **tek yazıcılıdır**:

- İki OmniRoute replikasını aynı `storage.sqlite` dosyasına bağlamayın.
- Bir konteynerin yeniden başlatılması, Recreate dağıtımı, OOM nedeniyle sonlandırma veya HEALTHCHECK
  yeniden başlatması, devam eden tüm SSE oturumlarını sonlandırır. Standart çalışma yolunda oturumların kontrollü biçimde boşaltılması yoktur.
- Yavaş bir `/healthz` yanıtını sistemin çalışmadığı şeklinde yorumlayan orkestratör canlılık kontrolü, tek
  replikayı sonlandırır. TCP canlılık kontrolü + HTTP `/healthz` hazır olma kontrolünü tercih edin. Bkz.
  [Docker Kılavuzu — kullanılabilirlik](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  ve [Kubernetes probe önerileri](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
