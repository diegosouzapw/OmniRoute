# OmniRoute CLI Plugin System (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

`omniroute` CLI-ni onun nüvəsini dəyişdirmədən genişləndirin. Plaginlər `gh extension` və ya `kubectl plugin` kimi `omniroute-cmd-*` adlandırma qaydasına əməl edir.

## Sürətli başlanğıc

```bash
# npm-dən plagin quraşdırın
omniroute plugin install stripe

# Hazırlanma mərhələsində olan lokal plagini quraşdırın
omniroute plugin install ./my-plugin

# Quraşdırılmış plaginlərin siyahısını göstərin
omniroute plugin list

# Yeni plagin üçün ilkin struktur yaradın
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Plaginin strukturu

Plagin `omniroute-cmd-<name>` (və ya `@scope/omniroute-cmd-<name>`) adlı npm paketidir.

```
omniroute-cmd-myplugin/
├── package.json     # "type": "module" və "main": "index.mjs" olmalıdır
├── index.mjs        # register(program, ctx) və istəyə bağlı meta ixrac edir
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
  description: "My plugin for OmniRoute",
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

## Plagin kontekstinin API-si

`register(program, ctx)` funksiyasına ötürülən `ctx` obyekti:

| Xüsusiyyət                   | Növ              | Təsvir                                                   |
| ---------------------------- | ---------------- | -------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | OmniRoute serverinə autentifikasiyalı sorğu              |
| `ctx.emit(data, opts)`       | `function`       | `--output` parametrinə uyğun table/json/jsonl/csv çıxışı |
| `ctx.t(key)`                 | `async function` | i18n tərcümə axtarışı                                    |
| `ctx.withSpinner(label, fn)` | `async function` | Asinxron fn-i ora spinner-i ilə əhatə edir               |
| `ctx.baseUrl`                | `string`         | Müəyyən edilmiş əsas URL                                 |
| `ctx.apiKey`                 | `string \| null` | Təqdim edilibsə, API açarı                               |

## Aşkarlama

Plaginlər aşağıdakı mənbələrdən aşkarlanır:

1. `~/.omniroute/plugins/<name>/` — istifadəçinin lokal quraşdırmaları
2. `OMNIROUTE_PLUGIN_PATH` env dəyişəni — xüsusi qovluq

Hər ikisi **yalnız CLI üçündür**. Server tərəfindəki plagin icra mühitinin (proksi daxilində işləyən marketplace/`plugin.json` plaginləri) öz skaneri və ayrıca əvəzetmə parametri olan `OMNIROUTE_PLUGINS_DIR` mövcuddur — baxın:
[PLUGIN_MARKETPLACE.md → Plagin qovluğu](./PLUGIN_MARKETPLACE.md#plugin-directory).
Birinin təyin edilməsi digərinə təsir etmir.

Yükləmə xətaları tutulur və xəbərdarlıq kimi göstərilir — nasaz plagin heç vaxt CLI-nin dayanmasına səbəb olmur.

## Təhlükəsizlik

Plaginlər `omniroute` ilə eyni Node.js proses imtiyazları ilə işləyir. Yalnız etibar etdiyiniz mənbələrdən plagin quraşdırın. `omniroute plugin install` açıq xəbərdarlıq göstərir və `--yes` parametrini və ya interaktiv təsdiqi tələb edir.

## Dərc etmə

1. `package.json` faylında `"keywords": ["omniroute-plugin"]` olduğuna əmin olun
2. Adi qaydada `npm publish` icra edin
3. İstifadəçilər `omniroute plugin search <query>` vasitəsilə axtarış edə bilərlər (npm reyestrində axtarır)

## Nümunə plagin

`meta` + `register()` ilə minimal işlək nümunə üçün [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) bölməsinə baxın.
