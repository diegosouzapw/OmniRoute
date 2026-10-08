# OmniRoute CLI Plugin System (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Proširite CLI `omniroute` bez izmjene njegove jezgre. Dodaci slijede konvenciju imenovanja `omniroute-cmd-*`, slično kao `gh extension` ili `kubectl plugin`.

## Brzi početak

```bash
# Instalirajte dodatak s npm-a
omniroute plugin install stripe

# Instalirajte lokalni dodatak u razvoju
omniroute plugin install ./my-plugin

# Prikažite instalirane dodatke
omniroute plugin list

# Izradite predložak novog dodatka
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Anatomija dodatka

Dodatak je npm paket naziva `omniroute-cmd-<name>` (ili `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # mora sadržavati "type": "module" i "main": "index.mjs"
├── index.mjs        # izvozi register(program, ctx) i opcionalno meta
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
  description: "Moj dodatak za OmniRoute",
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

## Kontekstni API dodatka

Objekt `ctx` koji se prosljeđuje funkciji `register(program, ctx)`:

| Svojstvo                     | Tip              | Opis                                                           |
| ---------------------------- | ---------------- | -------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Autentificirani zahtjev prema poslužitelju OmniRoute           |
| `ctx.emit(data, opts)`       | `function`       | Ispis u obliku table/json/jsonl/csv prema zastavici `--output` |
| `ctx.t(key)`                 | `async function` | Dohvaćanje i18n prijevoda                                      |
| `ctx.withSpinner(label, fn)` | `async function` | Omata asinkronu funkciju `fn` indikatorom napretka ora         |
| `ctx.baseUrl`                | `string`         | Razriješeni osnovni URL                                        |
| `ctx.apiKey`                 | `string \| null` | API ključ, ako je naveden                                      |

## Otkrivanje

Dodaci se otkrivaju iz:

1. `~/.omniroute/plugins/<name>/` — lokalne korisničke instalacije
2. varijable okruženja `OMNIROUTE_PLUGIN_PATH` — prilagođeni direktorij

Oboje je namijenjeno **samo CLI-ju**. Izvršno okruženje za dodatke na strani poslužitelja (marketplace/`plugin.json`
dodaci koji se izvršavaju unutar proxyja) ima vlastiti skener s vlastitim nadjačavanjem,
`OMNIROUTE_PLUGINS_DIR` — pogledajte
[PLUGIN_MARKETPLACE.md → Direktorij dodataka](./PLUGIN_MARKETPLACE.md#plugin-directory).
Postavljanje jednoga ne utječe na drugo.

Pogreške pri učitavanju hvataju se i ispisuju kao upozorenja — neispravan dodatak nikada ne ruši CLI.

## Sigurnost

Dodaci se izvršavaju s istim ovlastima Node.js procesa kao `omniroute`. Instalirajte samo dodatke iz izvora kojima vjerujete. `omniroute plugin install` prikazuje izričito upozorenje i zahtijeva `--yes` ili interaktivnu potvrdu.

## Objavljivanje

1. Provjerite sadrži li `package.json` stavku `"keywords": ["omniroute-plugin"]`
2. Izvršite `npm publish` kao i obično
3. Korisnici ih pronalaze putem naredbe `omniroute plugin search <query>` (pretražuje npm registar)

## Primjer dodatka

Minimalni funkcionalni primjer s `meta` + `register()` pogledajte u [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs).
