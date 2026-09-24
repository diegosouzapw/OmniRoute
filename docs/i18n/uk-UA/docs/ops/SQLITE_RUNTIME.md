# SQLite Runtime Resolution (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute визначає драйвер SQLite під час запуску за допомогою 5-крокового ланцюжка резервних варіантів:

1. **Вбудований `better-sqlite3`** (через `dependencies` у `package.json`)
   — найшвидший варіант, нативний бінарний файл, установлюється командою `npm install`, коли доступні інструменти збирання.

2. **Установлений під час виконання `better-sqlite3`** (у `~/.omniroute/runtime/`)
   — установлюється відкладено під час першого запуску **АБО** за допомогою `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Перед завантаженням перевіряє магічні байти нативного файлу `.node` (ELF / Mach-O / PE),
   щоб захиститися від пошкоджених бінарних файлів або файлів для іншої платформи.

3. **`node:sqlite`** (стандартна бібліотека Node ≥22.5) — не потребує нативного збирання; використовується, коли
   обидва варіанти better-sqlite3 не спрацювали. Має обмежений набір функцій.

4. **`sql.js`** (WASM) — останній резервний варіант. Працює всюди, але повільніше
   й записує дані періодично, а не синхронно.

## Навіщо така складність?

- **Windows EBUSY**: `npm install -g omniroute@latest` може завершитися помилкою, якщо файл
  `better_sqlite3.node` попередньої версії заблокований запущеним процесом. Установлення
  під час виконання в `~/.omniroute/runtime/` дає змогу обійти глобальний кеш npm.
- **Відсутність інструментів збирання**: деякі середовища (корпоративні системи Windows без VS Build
  Tools, мінімальні образи Docker) не можуть скомпілювати `better-sqlite3`. Інсталятор
  під час виконання отримує попередньо зібраний бінарний файл із реєстру npm; резервні
  драйвери гарантують, що OmniRoute усе одно запуститься, навіть якщо це не вдасться.
- **Ізольовані від мережі системи**: якщо реєстр npm недоступний, `node:sqlite`
  або `sql.js` гарантують базову функціональність.

## Перевірка магічних байтів

Перед завантаженням установленого під час виконання файлу `.node` OmniRoute зчитує перші 8
байтів і порівнює їх із відомими магічними байтами платформ:

| Платформа                | Байти (hex)   | Мітка       |
| ------------------------ | ------------- | ----------- |
| Linux                    | `7F 45 4C 46` | `elf`       |
| macOS 64-бітна BE        | `FE ED FA CF` | `macho`     |
| macOS 64-бітна LE        | `CF FA ED FE` | `macho-le`  |
| macOS fat (універсальна) | `CA FE BA BE` | `macho-fat` |
| Windows                  | `4D 5A` (MZ)  | `pe`        |

Якщо магічні байти не збігаються → файл ігнорується, а перехід до наступного резервного варіанта продовжується.

## Перевірка активного драйвера

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Ручне керування

```bash
# Пропустити прогрівання після встановлення (для швидкого встановлення в CI)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Примусово перевстановити better-sqlite3 для середовища виконання
rm -rf ~/.omniroute/runtime
omniroute  # буде перевстановлено під час наступного запуску

# Перевірити, який драйвер активний
omniroute config db-info  # (якщо команда CLI існує)
```

## Довідка

Реалізація:

- `bin/cli/runtime/magicBytes.mjs` — допоміжні засоби перевірки магічних байтів бінарних файлів
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-кроковий механізм визначення драйвера під час виконання + відкладений інсталятор
- `bin/cli/runtime/index.mjs` — оркестратор запуску (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — хук npm після встановлення (некритичне прогрівання)
- `src/lib/db/core.ts` — експорти `ensureDbInitialized()` / `getDriverInfo()`

## Топологія з одним процесом запису (HA не підтримується)

Наведений вище ланцюжок резервних драйверів усе одно виконується в **одному процесі**. За замовчуванням SQLite
у OmniRoute має **один процес запису**:

- Не підключайте дві репліки OmniRoute до одного файлу `storage.sqlite`.
- Перезапуск контейнера, розгортання Recreate, завершення через OOM або перезапуск через HEALTHCHECK перериває
  кожен активний сеанс SSE. У стандартному сценарії штатне завершення сеансів не передбачене.
- Перевірка життєздатності оркестратора, яка вважає повільну відповідь `/healthz` ознакою збою, завершить єдину
  репліку. Надавайте перевагу перевірці життєздатності через TCP + перевірці готовності через HTTP `/healthz`. Див.
  [Посібник із Docker — доступність](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  і [рекомендації щодо проб Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
