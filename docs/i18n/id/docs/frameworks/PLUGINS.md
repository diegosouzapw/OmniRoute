# OmniRoute CLI Plugin System (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Perluas CLI `omniroute` tanpa memodifikasi intinya. Plugin mengikuti konvensi penamaan `omniroute-cmd-*`, serupa dengan `gh extension` atau `kubectl plugin`.

## Mulai cepat

```bash
# Instal plugin dari npm
omniroute plugin install stripe

# Instal plugin lokal dalam pengembangan
omniroute plugin install ./my-plugin

# Cantumkan plugin yang terinstal
omniroute plugin list

# Buat kerangka plugin baru
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Anatomi plugin

Plugin adalah paket npm bernama `omniroute-cmd-<name>` (atau `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # harus memiliki "type": "module" dan "main": "index.mjs"
├── index.mjs        # mengekspor register(program, ctx) + meta opsional
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
  description: "Plugin saya untuk OmniRoute",
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

## API konteks plugin

Objek `ctx` yang diteruskan ke `register(program, ctx)`:

| Properti                     | Tipe             | Deskripsi                                                  |
| ---------------------------- | ---------------- | ---------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Pengambilan terautentikasi dari server OmniRoute           |
| `ctx.emit(data, opts)`       | `function`       | Keluaran dalam table/json/jsonl/csv sesuai flag `--output` |
| `ctx.t(key)`                 | `async function` | Pencarian terjemahan i18n                                  |
| `ctx.withSpinner(label, fn)` | `async function` | Membungkus fn asinkron dengan spinner ora                  |
| `ctx.baseUrl`                | `string`         | URL dasar yang telah diresolusi                            |
| `ctx.apiKey`                 | `string \| null` | Kunci API jika diberikan                                   |

## Penemuan

Plugin ditemukan dari:

1. `~/.omniroute/plugins/<name>/` — instalasi lokal pengguna
2. Variabel lingkungan `OMNIROUTE_PLUGIN_PATH` — direktori khusus

Keduanya **hanya untuk CLI**. Runtime plugin sisi server (marketplace/plugin `plugin.json`
yang berjalan di dalam proksi) memiliki pemindai dan pengaturan penggantinya sendiri,
`OMNIROUTE_PLUGINS_DIR` — lihat
[PLUGIN_MARKETPLACE.md → Direktori plugin](./PLUGIN_MARKETPLACE.md#plugin-directory).
Mengatur salah satunya tidak memengaruhi yang lain.

Kesalahan pemuatan ditangkap dan ditampilkan sebagai peringatan — plugin yang rusak tidak akan pernah menyebabkan CLI berhenti bekerja.

## Keamanan

Plugin berjalan dengan hak istimewa proses Node.js yang sama seperti `omniroute`. Hanya instal plugin dari sumber yang Anda percayai. `omniroute plugin install` menampilkan peringatan eksplisit dan memerlukan `--yes` atau konfirmasi interaktif.

## Publikasi

1. Pastikan `package.json` memiliki `"keywords": ["omniroute-plugin"]`
2. Jalankan `npm publish` seperti biasa
3. Pengguna dapat menemukan plugin melalui `omniroute plugin search <query>` (mencari di registry npm)

## Contoh plugin

Lihat [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) untuk contoh minimal yang berfungsi dengan `meta` + `register()`.
