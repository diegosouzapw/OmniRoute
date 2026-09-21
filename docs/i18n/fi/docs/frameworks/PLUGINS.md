# OmniRoute CLI Plugin System (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Laajenna `omniroute`-CLI:tä muuttamatta sen ydintä. Liitännäiset noudattavat nimeämiskäytäntöä `omniroute-cmd-*`, samaan tapaan kuin `gh extension` tai `kubectl plugin`.

## Pika-aloitus

```bash
# Asenna liitännäinen npm:stä
omniroute plugin install stripe

# Asenna paikallinen kehitysvaiheessa oleva liitännäinen
omniroute plugin install ./my-plugin

# Luettele asennetut liitännäiset
omniroute plugin list

# Luo uuden liitännäisen pohja
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Liitännäisen rakenne

Liitännäinen on npm-paketti nimeltä `omniroute-cmd-<name>` (tai `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # tiedostossa on oltava "type": "module" ja "main": "index.mjs"
├── index.mjs        # vie register(program, ctx) -funktion ja valinnaisen meta-objektin
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
  description: "OmniRoute-liitännäiseni",
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

## Liitännäiskontekstin API

Funktiolle `register(program, ctx)` välitettävä `ctx`-objekti:

| Ominaisuus                   | Tyyppi           | Kuvaus                                                              |
| ---------------------------- | ---------------- | ------------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Todennettu pyyntö OmniRoute-palvelimelle                            |
| `ctx.emit(data, opts)`       | `function`       | Tulostus table/json/jsonl/csv-muodossa `--output`-valitsimen mukaan |
| `ctx.t(key)`                 | `async function` | i18n-käännöksen haku                                                |
| `ctx.withSpinner(label, fn)` | `async function` | Ympäröi asynkronisen funktion oran edistymisilmaisimella            |
| `ctx.baseUrl`                | `string`         | Selvitetty perus-URL                                                |
| `ctx.apiKey`                 | `string \| null` | API-avain, jos sellainen on annettu                                 |

## Löytäminen

Liitännäiset löydetään seuraavista sijainneista:

1. `~/.omniroute/plugins/<name>/` — käyttäjäkohtaiset asennukset
2. `OMNIROUTE_PLUGIN_PATH`-ympäristömuuttuja — mukautettu hakemisto

Molemmat koskevat **vain CLI:tä**. Palvelinpuolen liitännäisten suoritusympäristöllä (välityspalvelimen sisällä suoritettavat marketplace-/`plugin.json`-liitännäiset) on oma hakutoimintonsa ja oma ohitusasetuksensa,
`OMNIROUTE_PLUGINS_DIR` — katso
[PLUGIN_MARKETPLACE.md → Liitännäishakemisto](./PLUGIN_MARKETPLACE.md#plugin-directory).
Toisen asettaminen ei vaikuta toiseen.

Latausvirheet käsitellään ja tulostetaan varoituksina — viallinen liitännäinen ei koskaan kaada CLI:tä.

## Tietoturva

Liitännäiset suoritetaan samoilla Node.js-prosessin käyttöoikeuksilla kuin `omniroute`. Asenna liitännäisiä vain luottamistasi lähteistä. `omniroute plugin install` näyttää nimenomaisen varoituksen ja edellyttää joko `--yes`-valitsinta tai interaktiivista vahvistusta.

## Julkaiseminen

1. Varmista, että `package.json` sisältää kohdan `"keywords": ["omniroute-plugin"]`
2. Suorita `npm publish` tavalliseen tapaan
3. Käyttäjät löytävät liitännäisiä komennolla `omniroute plugin search <query>` (hakee npm-rekisteristä)

## Esimerkkiliitännäinen

Hakemistossa [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) on toimiva vähimmäisesimerkki, joka sisältää `meta`-objektin ja `register()`-funktion.
