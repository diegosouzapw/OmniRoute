# OmniRoute CLI Plugin System (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Розширюйте CLI `omniroute`, не змінюючи його ядро. Плагіни дотримуються угоди про іменування `omniroute-cmd-*`, подібно до `gh extension` або `kubectl plugin`.

## Швидкий старт

```bash
# Установити плагін із npm
omniroute plugin install stripe

# Установити локальний плагін під час розробки
omniroute plugin install ./my-plugin

# Перелічити встановлені плагіни
omniroute plugin list

# Створити каркас нового плагіна
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Структура плагіна

Плагін — це npm-пакет із назвою `omniroute-cmd-<name>` (або `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # має містити "type": "module" і "main": "index.mjs"
├── index.mjs        # експортує register(program, ctx) та необов’язковий meta
└── README.md
```

### `package.json`

```json
{
  "name": "omniroute-cmd-myplugin",
  "version": "0.1.0",
  "type": "module",
  "main": "index.mjs",
  "engines": { "omniroute": ">=4.0.0" },
  "keywords": ["omniroute-plugin", "omniroute-cmd"]
}
```

### `index.mjs`

```js
export const meta = {
  name: "myplugin",
  version: "0.1.0",
  description: "Мій плагін для OmniRoute",
  omnirouteApi: ">=4.0.0",
};

export function register(program, ctx) {
  program
    .command("myplugin")
    .description(meta.description)
    .option("-n, --name <name>")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      const res = await ctx.apiFetch("/api/combos", {
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = await res.json();
      ctx.emit(data, gOpts);
    });
}
```

## API контексту плагіна

Об’єкт `ctx`, переданий до `register(program, ctx)`:

| Властивість                  | Тип              | Опис                                                         |
| ---------------------------- | ---------------- | ------------------------------------------------------------ |
| `ctx.apiFetch(path, opts)`   | `async function` | Автентифікований запит до сервера OmniRoute                  |
| `ctx.emit(data, opts)`       | `function`       | Виведення у форматі table/json/jsonl/csv згідно з `--output` |
| `ctx.t(key)`                 | `async function` | Пошук перекладу i18n                                         |
| `ctx.withSpinner(label, fn)` | `async function` | Обгортає асинхронну функцію індикатором виконання ora        |
| `ctx.baseUrl`                | `string`         | Визначена базова URL-адреса                                  |
| `ctx.apiKey`                 | `string \| null` | Ключ API, якщо його надано                                   |

## Виявлення

Плагіни виявляються в таких розташуваннях:

1. `~/.omniroute/plugins/<name>/` — локальні встановлення користувача
2. Змінна середовища `OMNIROUTE_PLUGIN_PATH` — власний каталог

Обидва варіанти призначені **лише для CLI**. Серверне середовище виконання плагінів (плагіни marketplace/`plugin.json`, що виконуються всередині проксі) має власний сканер і власне перевизначення —
`OMNIROUTE_PLUGINS_DIR`; див.
[PLUGIN_MARKETPLACE.md → Каталог плагінів](./PLUGIN_MARKETPLACE.md#plugin-directory).
Налаштування одного не впливає на інше.

Помилки завантаження перехоплюються та виводяться як попередження — несправний плагін ніколи не спричинить аварійного завершення CLI.

## Безпека

Плагіни виконуються з тими самими привілеями процесу Node.js, що й `omniroute`. Установлюйте плагіни лише з джерел, яким довіряєте. `omniroute plugin install` показує явне попередження та вимагає `--yes` або інтерактивного підтвердження.

## Публікація

1. Переконайтеся, що `package.json` містить `"keywords": ["omniroute-plugin"]`
2. Виконайте `npm publish` у звичайний спосіб
3. Користувачі можуть знаходити плагіни за допомогою `omniroute plugin search <query>` (пошук у реєстрі npm)

## Приклад плагіна

Мінімальний робочий приклад із `meta` + `register()` див. у [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs).
