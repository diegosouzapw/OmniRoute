# OmniRoute CLI Plugin System (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Расширяйте CLI `omniroute`, не изменяя его ядро. Плагины следуют соглашению об именовании `omniroute-cmd-*`, аналогично `gh extension` или `kubectl plugin`.

## Быстрый старт

```bash
# Установить плагин из npm
omniroute plugin install stripe

# Установить локальный плагин, находящийся в разработке
omniroute plugin install ./my-plugin

# Вывести список установленных плагинов
omniroute plugin list

# Создать каркас нового плагина
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Структура плагина

Плагин представляет собой npm-пакет с именем `omniroute-cmd-<name>` (или `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # должен содержать "type": "module" и "main": "index.mjs"
├── index.mjs        # экспортирует register(program, ctx) и необязательный meta
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
  description: "Мой плагин для OmniRoute",
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

## Контекстный API плагина

Объект `ctx`, передаваемый в `register(program, ctx)`:

| Свойство                     | Тип              | Описание                                                       |
| ---------------------------- | ---------------- | -------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Аутентифицированный запрос к серверу OmniRoute                 |
| `ctx.emit(data, opts)`       | `function`       | Вывод в формате table/json/jsonl/csv согласно флагу `--output` |
| `ctx.t(key)`                 | `async function` | Поиск перевода i18n                                            |
| `ctx.withSpinner(label, fn)` | `async function` | Оборачивает асинхронную функцию индикатором выполнения ora     |
| `ctx.baseUrl`                | `string`         | Разрешённый базовый URL                                        |
| `ctx.apiKey`                 | `string \| null` | Ключ API, если он указан                                       |

## Обнаружение

Плагины обнаруживаются в следующих расположениях:

1. `~/.omniroute/plugins/<name>/` — пользовательские локальные установки
2. Переменная окружения `OMNIROUTE_PLUGIN_PATH` — пользовательский каталог

Оба варианта предназначены **только для CLI**. Серверная среда выполнения плагинов (плагины из маркетплейса/`plugin.json`,
работающие внутри прокси-сервера) использует собственный сканер и отдельную переменную переопределения —
`OMNIROUTE_PLUGINS_DIR`. См.
[PLUGIN_MARKETPLACE.md → Каталог плагинов](./PLUGIN_MARKETPLACE.md#plugin-directory).
Настройка одной из них не влияет на другую.

Ошибки загрузки перехватываются и выводятся как предупреждения — неисправный плагин никогда не приводит к сбою CLI.

## Безопасность

Плагины запускаются с теми же привилегиями процесса Node.js, что и `omniroute`. Устанавливайте плагины только из источников, которым доверяете. `omniroute plugin install` выводит явное предупреждение и требует флаг `--yes` или интерактивное подтверждение.

## Публикация

1. Убедитесь, что `package.json` содержит `"keywords": ["omniroute-plugin"]`
2. Выполните `npm publish` обычным способом
3. Пользователи могут находить плагины с помощью `omniroute plugin search <query>` (поиск выполняется в реестре npm)

## Пример плагина

Минимальный рабочий пример с `meta` и `register()` см. в [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs).
