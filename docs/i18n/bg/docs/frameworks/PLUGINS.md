# OmniRoute CLI Plugin System (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Разширете CLI на `omniroute`, без да променяте ядрото му. Плъгините следват конвенцията за именуване `omniroute-cmd-*`, подобно на `gh extension` или `kubectl plugin`.

## Бърз старт

```bash
# Инсталиране на плъгин от npm
omniroute plugin install stripe

# Инсталиране на локален плъгин в процес на разработка
omniroute plugin install ./my-plugin

# Показване на инсталираните плъгини
omniroute plugin list

# Генериране на структура за нов плъгин
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Структура на плъгина

Плъгинът е npm пакет с име `omniroute-cmd-<name>` (или `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # трябва да съдържа "type": "module" и "main": "index.mjs"
├── index.mjs        # експортира register(program, ctx) + незадължителен meta
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
  description: "Моят плъгин за OmniRoute",
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

## Контекстен API за плъгини

Обектът `ctx`, предаден на `register(program, ctx)`:

| Свойство                     | Тип              | Описание                                                    |
| ---------------------------- | ---------------- | ----------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Удостоверена заявка към сървъра на OmniRoute                |
| `ctx.emit(data, opts)`       | `function`       | Извеждане като table/json/jsonl/csv според флага `--output` |
| `ctx.t(key)`                 | `async function` | Търсене на i18n превод                                      |
| `ctx.withSpinner(label, fn)` | `async function` | Обгръща асинхронна функция с индикатор за напредък от ora   |
| `ctx.baseUrl`                | `string`         | Разрешен базов URL                                          |
| `ctx.apiKey`                 | `string \| null` | API ключ, ако е предоставен                                 |

## Откриване

Плъгините се откриват от:

1. `~/.omniroute/plugins/<name>/` — локални инсталации на потребителя
2. Променливата на средата `OMNIROUTE_PLUGIN_PATH` — персонализирана директория

И двете са **само за CLI**. Сървърната среда за изпълнение на плъгини (маркетплейсът/плъгините с `plugin.json`, които се изпълняват в прокси сървъра) има собствен механизъм за сканиране със собствена настройка за замяна — `OMNIROUTE_PLUGINS_DIR`. Вижте
[PLUGIN_MARKETPLACE.md → Директория за плъгини](./PLUGIN_MARKETPLACE.md#plugin-directory).
Задаването на едната не влияе на другата.

Грешките при зареждане се прихващат и извеждат като предупреждения — повреден плъгин никога не причинява срив на CLI.

## Сигурност

Плъгините се изпълняват със същите привилегии на процеса на Node.js като `omniroute`. Инсталирайте плъгини само от източници, на които имате доверие. `omniroute plugin install` показва изрично предупреждение и изисква `--yes` или интерактивно потвърждение.

## Публикуване

1. Уверете се, че `package.json` съдържа `"keywords": ["omniroute-plugin"]`
2. Изпълнете `npm publish` по обичайния начин
3. Потребителите могат да откриват плъгини чрез `omniroute plugin search <query>` (търси в npm регистъра)

## Примерен плъгин

Вижте [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) за минимален работещ пример с `meta` + `register()`.
