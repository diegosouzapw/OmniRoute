# OmniRoute CLI Plugin System (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md)

---

無需修改 `omniroute` 核心即可擴充其 CLI。外掛程式遵循 `omniroute-cmd-*` 命名慣例，類似於 `gh extension` 或 `kubectl plugin`。

## 快速開始

```bash
# 從 npm 安裝外掛程式
omniroute plugin install stripe

# 安裝開發中的本機外掛程式
omniroute plugin install ./my-plugin

# 列出已安裝的外掛程式
omniroute plugin list

# 建立新外掛程式的基本架構
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## 外掛程式結構

外掛程式是名為 `omniroute-cmd-<name>`（或 `@scope/omniroute-cmd-<name>`）的 npm 套件。

```
omniroute-cmd-myplugin/
├── package.json     # 必須包含 "type": "module" 和 "main": "index.mjs"
├── index.mjs        # 匯出 register(program, ctx) 與選用的 meta
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

## 外掛程式內容 API

傳遞給 `register(program, ctx)` 的 `ctx` 物件：

| 屬性                         | 類型             | 說明                                               |
| ---------------------------- | ---------------- | -------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | 向 OmniRoute 伺服器發出已驗證身分的 fetch 請求     |
| `ctx.emit(data, opts)`       | `function`       | 依據 `--output` 旗標，以 table/json/jsonl/csv 輸出 |
| `ctx.t(key)`                 | `async function` | i18n 翻譯查詢                                      |
| `ctx.withSpinner(label, fn)` | `async function` | 使用 ora spinner 包裝非同步 fn                     |
| `ctx.baseUrl`                | `string`         | 解析後的基礎 URL                                   |
| `ctx.apiKey`                 | `string \| null` | 已提供的 API 金鑰                                  |

## 探索

外掛程式會從以下位置探索：

1. `~/.omniroute/plugins/<name>/` — 使用者本機安裝
2. `OMNIROUTE_PLUGIN_PATH` 環境變數 — 自訂目錄

兩者皆**僅供 CLI 使用**。伺服器端外掛程式執行階段（在代理伺服器內執行的市集／`plugin.json`
外掛程式）具有自己的掃描器及覆寫設定
`OMNIROUTE_PLUGINS_DIR` — 請參閱
[PLUGIN_MARKETPLACE.md → 外掛程式目錄](./PLUGIN_MARKETPLACE.md#plugin-directory)。
設定其中一個不會影響另一個。

載入錯誤會被捕捉並以警告形式顯示，因此損壞的外掛程式絕不會導致 CLI 當機。

## 安全性

外掛程式以與 `omniroute` 相同的 Node.js 程序權限執行。請僅從您信任的來源安裝外掛程式。`omniroute plugin install` 會顯示明確警告，並要求使用 `--yes` 或進行互動式確認。

## 發佈

1. 確認 `package.json` 包含 `"keywords": ["omniroute-plugin"]`
2. 如常執行 `npm publish`
3. 使用者可透過 `omniroute plugin search <query>` 探索外掛程式（搜尋 npm registry）

## 外掛程式範例

如需包含 `meta` 與 `register()` 的最小可運作範例，請參閱 [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs)。
