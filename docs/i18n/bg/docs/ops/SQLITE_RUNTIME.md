# SQLite Runtime Resolution (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute определя своя SQLite драйвер при стартиране чрез 5-стъпкова верига от резервни варианти:

1. **Вграденият `better-sqlite3`** (чрез `dependencies` в `package.json`)
   — най-бързият вариант, нативен двоичен файл, инсталиран от `npm install`, когато са налични инструменти за компилиране.

2. **Инсталираният по време на изпълнение `better-sqlite3`** (в `~/.omniroute/runtime/`)
   — инсталира се отложено при първото стартиране **ИЛИ** чрез `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Проверява магическите байтове на нативния `.node` файл (ELF / Mach-O / PE) преди зареждане,
   за да се предотврати използването на повредени двоични файлове или такива за грешна платформа.

3. **`node:sqlite`** (стандартна библиотека на Node ≥22.5) — не изисква нативно компилиране; използва се, когато
   и двата варианта с better-sqlite3 са неуспешни. Има ограничен набор от функционалности.

4. **`sql.js`** (WASM) — последен резервен вариант. Работи навсякъде, но е по-бавен
   и записва данните периодично, вместо синхронно.

## Защо е необходима тази сложност?

- **Windows EBUSY**: `npm install -g omniroute@latest` може да е неуспешна, ако `better_sqlite3.node`
  от предишната версия е заключен от работещ процес. Инсталирането по време на изпълнение
  в `~/.omniroute/runtime/` заобикаля глобалния npm кеш.
- **Липса на инструменти за компилиране**: Някои среди (корпоративни Windows системи без VS Build
  Tools, минимални Docker образи) не могат да компилират `better-sqlite3`. Инсталаторът по време
  на изпълнение извлича предварително компилиран двоичен файл от npm регистъра; резервните
  драйвери гарантират, че OmniRoute ще стартира дори ако това е неуспешно.
- **Изолирани от мрежата системи**: Ако npm регистърът е недостъпен, `node:sqlite`
  или `sql.js` гарантират базова функционалност.

## Проверка на магическите байтове

Преди да зареди инсталиран по време на изпълнение `.node` файл, OmniRoute прочита първите 8
байта и ги сравнява с познатите магически стойности за съответните платформи:

| Платформа               | Байтове (hex) | Етикет      |
| ----------------------- | ------------- | ----------- |
| Linux                   | `7F 45 4C 46` | `elf`       |
| macOS 64-битова BE      | `FE ED FA CF` | `macho`     |
| macOS 64-битова LE      | `CF FA ED FE` | `macho-le`  |
| macOS fat (универсална) | `CA FE BA BE` | `macho-fat` |
| Windows                 | `4D 5A` (MZ)  | `pe`        |

Несъответстваща магическа стойност → файлът се игнорира и веригата продължава към следващата стъпка.

## Проверка на активния драйвер

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Ръчно управление

```bash
# Пропускане на предварителното зареждане след инсталиране (за бързи CI инсталации)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Принудително преинсталиране на better-sqlite3 за средата на изпълнение
rm -rf ~/.omniroute/runtime
omniroute  # ще се преинсталира при следващото стартиране

# Проверка кой драйвер е активен
omniroute config db-info  # (ако CLI командата съществува)
```

## Справка

Реализация:

- `bin/cli/runtime/magicBytes.mjs` — помощни функции за проверка на магическите байтове на двоични файлове
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-стъпков механизъм за определяне по време на изпълнение + отложен инсталатор
- `bin/cli/runtime/index.mjs` — оркестратор при стартиране (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm кука след инсталиране (некритично предварително зареждане)
- `src/lib/db/core.ts` — експорти на `ensureDbInitialized()` / `getDriverInfo()`

## Топология с един записващ процес (HA не се поддържа)

Описаната по-горе верига от резервни драйвери продължава да работи в **един процес**. При използване на SQLite
по подразбиране OmniRoute има **един записващ процес**:

- Не свързвайте две реплики на OmniRoute към един и същ файл `storage.sqlite`.
- Рестартиране на контейнера, Recreate внедряване, OOM прекратяване или HEALTHCHECK рестартиране прекъсва
  всяка активна SSE сесия. Стандартният път не осигурява изчакване за приключване на сесиите.
- Проверка за жизнеспособност от оркестратора, която третира бавен `/healthz` като неработещ, ще прекрати единствената
  реплика. Предпочитайте TCP проверка за жизнеспособност + HTTP `/healthz` проверка за готовност. Вижте
  [Ръководство за Docker — наличност](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  и [Препоръки за проверки в Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
