# OmniRoute CLI Plugin System (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Проширите `omniroute` CLI без измене његовог језгра. Додаци прате конвенцију именовања `omniroute-cmd-*`, слично као `gh extension` или `kubectl plugin`.

## Брзи почетак

```bash
# Инсталирајте додатак са npm-а
omniroute plugin install stripe

# Инсталирајте локални додатак у развоју
omniroute plugin install ./my-plugin

# Прикажите инсталиране додатке
omniroute plugin list

# Генеришите основу новог додатка
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Структура додатка

Додатак је npm пакет под називом `omniroute-cmd-<name>` (или `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # мора да садржи "type": "module" и "main": "index.mjs"
├── index.mjs        # извози register(program, ctx) и опциони meta
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
  description: "Мој додатак за OmniRoute",
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

## API контекста додатка

Објекат `ctx` који се прослеђује функцији `register(program, ctx)`:

| Својство                     | Тип              | Опис                                                            |
| ---------------------------- | ---------------- | --------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Аутентификовани fetch ка OmniRoute серверу                      |
| `ctx.emit(data, opts)`       | `function`       | Излаз у формату table/json/jsonl/csv према заставици `--output` |
| `ctx.t(key)`                 | `async function` | Проналажење i18n превода                                        |
| `ctx.withSpinner(label, fn)` | `async function` | Обавија асинхрону fn помоћу ora индикатора напретка             |
| `ctx.baseUrl`                | `string`         | Разрешени основни URL                                           |
| `ctx.apiKey`                 | `string \| null` | API кључ, ако је наведен                                        |

## Откривање

Додаци се откривају из:

1. `~/.omniroute/plugins/<name>/` — локалне корисничке инсталације
2. `OMNIROUTE_PLUGIN_PATH` env променљива — прилагођени директоријум

Оба су намењена **искључиво CLI-ју**. Окружење за извршавање додатака на страни сервера (marketplace/`plugin.json`
додаци који се извршавају унутар проксија) има сопствени скенер са сопственим подешавањем за замену,
`OMNIROUTE_PLUGINS_DIR` — погледајте
[PLUGIN_MARKETPLACE.md → Директоријум додатака](./PLUGIN_MARKETPLACE.md#plugin-directory).
Подешавање једног не утиче на друго.

Грешке при учитавању се хватају и приказују као упозорења — неисправан додатак никада не доводи до пада CLI-ја.

## Безбедност

Додаци се извршавају са истим привилегијама Node.js процеса као `omniroute`. Инсталирајте додатке само из извора којима верујете. `omniroute plugin install` приказује изричито упозорење и захтева `--yes` или интерактивну потврду.

## Објављивање

1. Уверите се да `package.json` садржи `"keywords": ["omniroute-plugin"]`
2. Извршите `npm publish` на уобичајен начин
3. Корисници могу да претражују помоћу `omniroute plugin search <query>` (претражује npm регистар)

## Пример додатка

Погледајте [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) за минималан функционалан пример са `meta` + `register()`.
