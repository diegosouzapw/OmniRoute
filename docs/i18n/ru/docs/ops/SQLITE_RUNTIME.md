# SQLite Runtime Resolution (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute определяет драйвер SQLite при запуске с помощью 5-ступенчатой цепочки резервных вариантов:

1. **Встроенный `better-sqlite3`** (через `dependencies` в `package.json`)
   — самый быстрый вариант, нативный бинарный файл, устанавливается командой `npm install`, если доступны инструменты сборки.

2. **Установленный во время выполнения `better-sqlite3`** (в `~/.omniroute/runtime/`)
   — устанавливается отложенно при первом запуске **ИЛИ** через `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Перед загрузкой проверяются сигнатурные байты нативного файла `.node` (ELF / Mach-O / PE),
   чтобы исключить повреждённые или предназначенные для другой платформы бинарные файлы.

3. **`node:sqlite`** (стандартная библиотека Node ≥22.5) — нативная сборка не требуется; используется, когда
   оба варианта better-sqlite3 недоступны. Имеет ограниченный набор возможностей.

4. **`sql.js`** (WASM) — последний резервный вариант. Работает везде, но медленнее
   и записывает данные через определённые интервалы, а не синхронно.

## Зачем нужна такая сложность?

- **Windows EBUSY**: команда `npm install -g omniroute@latest` может завершиться ошибкой, если файл
  `better_sqlite3.node` предыдущей версии заблокирован запущенным процессом. Установка
  во время выполнения в `~/.omniroute/runtime/` позволяет обойти глобальный кеш npm.
- **Отсутствие инструментов сборки**: в некоторых средах (корпоративная Windows без VS Build
  Tools, минимальные образы Docker) невозможно скомпилировать `better-sqlite3`. Установщик
  среды выполнения получает предварительно собранный бинарный файл из реестра npm; резервные
  драйверы гарантируют запуск OmniRoute, даже если это не удастся.
- **Изолированные от сети системы**: если реестр npm недоступен, `node:sqlite`
  или `sql.js` гарантируют базовую функциональность.

## Проверка сигнатурных байтов

Перед загрузкой установленного во время выполнения файла `.node` OmniRoute считывает первые 8
байт и сопоставляет их с известными сигнатурами платформ:

| Платформа             | Байты (hex)   | Метка       |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-разрядная BE | `FE ED FA CF` | `macho`     |
| macOS 64-разрядная LE | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Если сигнатура не совпадает → файл игнорируется, и выполняется переход к следующему резервному варианту.

## Проверка активного драйвера

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Ручное управление

```bash
# Пропустить предварительную инициализацию после установки (для быстрой установки в CI)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Принудительно переустановить better-sqlite3 среды выполнения
rm -rf ~/.omniroute/runtime
omniroute  # будет переустановлен при следующем запуске

# Проверить, какой драйвер активен
omniroute config db-info  # (если команда CLI существует)
```

## Справочная информация

Реализация:

- `bin/cli/runtime/magicBytes.mjs` — вспомогательные функции проверки сигнатурных байтов бинарных файлов
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-ступенчатый механизм выбора во время выполнения + отложенный установщик
- `bin/cli/runtime/index.mjs` — оркестратор запуска (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — хук npm после установки (неблокирующая предварительная инициализация)
- `src/lib/db/core.ts` — экспорты `ensureDbInitialized()` / `getDriverInfo()`

## Топология с единственным процессом записи (HA не поддерживается)

Описанная выше цепочка резервных драйверов по-прежнему работает в **одном процессе**. По умолчанию
OmniRoute с SQLite использует **единственный процесс записи**:

- Не подключайте два экземпляра OmniRoute к одному файлу `storage.sqlite`.
- Перезапуск контейнера, развёртывание Recreate, завершение из-за OOM или перезапуск HEALTHCHECK прерывает
  каждый активный сеанс SSE. В стандартной конфигурации корректное завершение сеансов не предусмотрено.
- Проверка работоспособности оркестратора, которая считает медленный ответ `/healthz` признаком сбоя, завершит единственный
  экземпляр. Для проверки работоспособности предпочитайте TCP, а для проверки готовности — HTTP `/healthz`. См.
  [руководство по Docker — доступность](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  и [рекомендации по пробам Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
