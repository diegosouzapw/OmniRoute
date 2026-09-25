# OmniRoute CLI Plugin System (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Bővítse az `omniroute` CLI-t a mag módosítása nélkül. A bővítmények az `omniroute-cmd-*` elnevezési konvenciót követik, hasonlóan a `gh extension` vagy a `kubectl plugin` működéséhez.

## Gyors kezdés

```bash
# Bővítmény telepítése az npm-ről
omniroute plugin install stripe

# Helyi, fejlesztés alatt álló bővítmény telepítése
omniroute plugin install ./my-plugin

# Telepített bővítmények listázása
omniroute plugin list

# Új bővítmény vázának létrehozása
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## A bővítmény felépítése

A bővítmény egy `omniroute-cmd-<name>` (vagy `@scope/omniroute-cmd-<name>`) nevű npm-csomag.

```
omniroute-cmd-myplugin/
├── package.json     # tartalmaznia kell a "type": "module" és a "main": "index.mjs" mezőket
├── index.mjs        # exportálja a register(program, ctx) függvényt és az opcionális meta objektumot
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
  description: "Saját bővítményem az OmniRoute-hoz",
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

## Bővítménykörnyezet API-ja

A `register(program, ctx)` függvénynek átadott `ctx` objektum:

| Tulajdonság                  | Típus            | Leírás                                                                 |
| ---------------------------- | ---------------- | ---------------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Hitelesített lekérés az OmniRoute-kiszolgálóhoz                        |
| `ctx.emit(data, opts)`       | `function`       | Kimenet table/json/jsonl/csv formátumban a `--output` kapcsoló szerint |
| `ctx.t(key)`                 | `async function` | i18n-fordítás keresése                                                 |
| `ctx.withSpinner(label, fn)` | `async function` | Az aszinkron fn futtatása ora folyamatjelzővel                         |
| `ctx.baseUrl`                | `string`         | Feloldott alap-URL                                                     |
| `ctx.apiKey`                 | `string \| null` | API-kulcs, ha meg lett adva                                            |

## Felderítés

A bővítmények felderítése a következő helyeken történik:

1. `~/.omniroute/plugins/<name>/` — felhasználói helyi telepítések
2. `OMNIROUTE_PLUGIN_PATH` környezeti változó — egyéni könyvtár

Mindkettő **csak a CLI-re** vonatkozik. A kiszolgálóoldali bővítmény-futtatókörnyezetnek (a proxyn belül futó piactér-/`plugin.json`-bővítményeknek) saját keresője és saját felülbírálási beállítása van: `OMNIROUTE_PLUGINS_DIR` — lásd:
[PLUGIN_MARKETPLACE.md → Bővítménykönyvtár](./PLUGIN_MARKETPLACE.md#plugin-directory).
Az egyik beállítása nincs hatással a másikra.

A betöltési hibákat a rendszer elfogja, és figyelmeztetésként jeleníti meg — egy hibás bővítmény soha nem okozza a CLI összeomlását.

## Biztonság

A bővítmények ugyanazokkal a Node.js-folyamatjogosultságokkal futnak, mint az `omniroute`. Csak megbízható forrásból származó bővítményeket telepítsen. Az `omniroute plugin install` kifejezett figyelmeztetést jelenít meg, és megköveteli a `--yes` kapcsolót vagy az interaktív megerősítést.

## Közzététel

1. Győződjön meg arról, hogy a `package.json` tartalmazza a `"keywords": ["omniroute-plugin"]` mezőt
2. Futtassa az `npm publish` parancsot a szokásos módon
3. A felhasználók az `omniroute plugin search <query>` paranccsal találhatják meg a bővítményt (az npm-regisztrációs adatbázisában keres)

## Példabővítmény

A `meta` + `register()` használatát bemutató minimális, működő példáért tekintse meg az [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) könyvtárat.
