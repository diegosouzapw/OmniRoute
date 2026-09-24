# OmniRoute CLI Plugin System (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Lanjutkan CLI `omniroute` tanpa mengubah terasnya. Pemalam mengikut konvensyen penamaan `omniroute-cmd-*`, serupa dengan `gh extension` atau `kubectl plugin`.

## Mula pantas

```bash
# Pasang pemalam daripada npm
omniroute plugin install stripe

# Pasang pemalam setempat yang sedang dibangunkan
omniroute plugin install ./my-plugin

# Senaraikan pemalam yang dipasang
omniroute plugin list

# Jana rangka pemalam baharu
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Struktur pemalam

Pemalam ialah pakej npm bernama `omniroute-cmd-<name>` (atau `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # mesti mempunyai "type": "module" dan "main": "index.mjs"
├── index.mjs        # mengeksport register(program, ctx) + meta pilihan
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
  description: "Pemalam saya untuk OmniRoute",
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

## API konteks pemalam

Objek `ctx` yang dihantar kepada `register(program, ctx)`:

| Sifat                        | Jenis            | Penerangan                                                    |
| ---------------------------- | ---------------- | ------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Pengambilan disahkan ke pelayan OmniRoute                     |
| `ctx.emit(data, opts)`       | `function`       | Output dalam table/json/jsonl/csv mengikut bendera `--output` |
| `ctx.t(key)`                 | `async function` | Carian terjemahan i18n                                        |
| `ctx.withSpinner(label, fn)` | `async function` | Membalut fn tak segerak dengan pemutar ora                    |
| `ctx.baseUrl`                | `string`         | URL asas yang telah ditentukan                                |
| `ctx.apiKey`                 | `string \| null` | Kunci API jika diberikan                                      |

## Penemuan

Pemalam ditemui daripada:

1. `~/.omniroute/plugins/<name>/` — pemasangan setempat pengguna
2. Pemboleh ubah persekitaran `OMNIROUTE_PLUGIN_PATH` — direktori tersuai

Kedua-duanya adalah **CLI sahaja**. Masa jalan pemalam sebelah pelayan (pemalam marketplace/`plugin.json`
yang berjalan dalam proksi) mempunyai pengimbasnya sendiri dengan penggantian tersendiri,
`OMNIROUTE_PLUGINS_DIR` — lihat
[PLUGIN_MARKETPLACE.md → Direktori pemalam](./PLUGIN_MARKETPLACE.md#plugin-directory).
Menetapkan salah satu tidak mempengaruhi yang lain.

Ralat pemuatan ditangkap dan dipaparkan sebagai amaran — pemalam yang rosak tidak akan menyebabkan CLI ranap.

## Keselamatan

Pemalam berjalan dengan keistimewaan proses Node.js yang sama seperti `omniroute`. Hanya pasang pemalam daripada sumber yang anda percayai. `omniroute plugin install` memaparkan amaran yang jelas dan memerlukan `--yes` atau pengesahan interaktif.

## Penerbitan

1. Pastikan `package.json` mempunyai `"keywords": ["omniroute-plugin"]`
2. Jalankan `npm publish` seperti biasa
3. Pengguna boleh menemuinya melalui `omniroute plugin search <query>` (mencari dalam daftar npm)

## Contoh pemalam

Lihat [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) untuk contoh minimum yang berfungsi dengan `meta` + `register()`.
