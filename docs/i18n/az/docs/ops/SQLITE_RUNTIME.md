# SQLite Runtime Resolution (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute işə salınarkən SQLite drayverini 5 mərhələli ehtiyat seçim zənciri vasitəsilə müəyyən edir:

1. **Paketə daxil edilmiş `better-sqlite3`** (`package.json` faylındakı `dependencies` vasitəsilə)
   — ən sürətli seçimdir, yerli binar fayldan istifadə edir və qurma alətləri mövcud olduqda `npm install` tərəfindən quraşdırılır.

2. **İcra zamanı quraşdırılmış `better-sqlite3`** (`~/.omniroute/runtime/` daxilində)
   — ilk işəsalma zamanı **VƏ YA** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` vasitəsilə təxirə salınmış şəkildə quraşdırılır.
   Zədələnmiş və ya yanlış platforma üçün nəzərdə tutulmuş binar faylların yüklənməsinin qarşısını almaq məqsədilə
   yükləmədən əvvəl yerli `.node` sehrli baytlarını (ELF / Mach-O / PE) yoxlayır.

3. **`node:sqlite`** (Node ≥22.5 standart kitabxanası) — yerli qurma tələb etmir; hər iki
   better-sqlite3 yolu uğursuz olduqda istifadə edilir. Məhdud funksiyalar dəstinə malikdir.

4. **`sql.js`** (WASM) — son ehtiyat seçimidir. Hər yerdə işləyir, lakin daha yavaşdır
   və məlumatları sinxron şəkildə deyil, müəyyən intervallarla yazır.

## Bu mürəkkəblik niyə lazımdır?

- **Windows EBUSY**: Əvvəlki versiyanın `better_sqlite3.node` faylı işləyən proses tərəfindən
  kilidlənibsə, `npm install -g omniroute@latest` uğursuz ola bilər. `~/.omniroute/runtime/`
  daxilində icra zamanı quraşdırma qlobal npm keşindən yan keçir.
- **Qurma alətlərinin olmaması**: Bəzi mühitlər (`VS Build Tools` olmayan korporativ Windows,
  minimal Docker obrazları) `better-sqlite3` paketini kompilyasiya edə bilmir. İcra zamanı
  quraşdırıcı npm reyestrindən əvvəlcədən qurulmuş binar faylı əldə edir; bu da uğursuz olarsa,
  ehtiyat drayverlər OmniRoute-un yenə də işə düşməsini təmin edir.
- **Şəbəkədən təcrid olunmuş sistemlər**: npm reyestrinə giriş mümkün olmadıqda, `node:sqlite`
  və ya `sql.js` baza funksionallığını təmin edir.

## Sehrli baytların yoxlanması

OmniRoute icra zamanı quraşdırılmış `.node` faylını yükləməzdən əvvəl ilk 8
baytı oxuyur və onları məlum platforma sehrli baytları ilə müqayisə edir:

| Platforma             | Baytlar (hex) | Etiket      |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Sehrli baytlar uyğun gəlmədikdə → fayl nəzərə alınmır və ehtiyat seçim prosesi növbəti mərhələyə keçir.

## Aktiv drayverin yoxlanması

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Əl ilə idarəetmə

```bash
# Sürətli CI quraşdırmaları üçün postinstall ilkin hazırlığını ötür
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# İcra zamanı istifadə olunan better-sqlite3 paketini məcburi şəkildə yenidən quraşdır
rm -rf ~/.omniroute/runtime
omniroute  # növbəti işəsalma zamanı yenidən quraşdırılacaq

# Hansı drayverin aktiv olduğunu yoxla
omniroute config db-info  # (CLI əmri mövcuddursa)
```

## İstinad

Reallaşdırma:

- `bin/cli/runtime/magicBytes.mjs` — binar sehrli baytların yoxlanması üçün köməkçi funksiyalar
- `bin/cli/runtime/sqliteRuntime.mjs` — 5 mərhələli icra zamanı həlledicisi + təxirə salınmış quraşdırıcı
- `bin/cli/runtime/index.mjs` — işəsalma orkestratoru (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm quraşdırmadan sonrakı qarmağı (uğursuzluğu kritik olmayan ilkin hazırlıq)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` ixracları

## Tək yazıcı topologiyası (HA dəstəklənmir)

Yuxarıdakı drayver ehtiyat seçim zənciri yenə də **bir prosesdə** işləyir. Defolt SQLite
konfiqurasiyasında OmniRoute **tək yazıcıdır**:

- İki OmniRoute replikasını eyni `storage.sqlite` faylına qoşmayın.
- Konteynerin yenidən başladılması, Recreate yerləşdirməsi, OOM səbəbindən dayandırılma və ya HEALTHCHECK yenidən başlatması
  icra prosesində olan bütün SSE sessiyalarını dayandırır. Standart icra yolunda sessiyaların mərhələli şəkildə bağlanması yoxdur.
- Yavaş `/healthz` cavabını prosesin dayanması kimi qiymətləndirən orkestratorun canlılıq yoxlaması yeganə
  replikanı dayandıracaq. TCP canlılıq yoxlamasına və HTTP `/healthz` hazırlıq yoxlamasına üstünlük verin. Baxın:
  [Docker təlimatı — əlçatanlıq](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  və [Kubernetes yoxlama tövsiyələri](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
