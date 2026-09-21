# OmniRoute CLI Plugin System (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

无需修改 `omniroute` 核心即可扩展其 CLI。插件遵循 `omniroute-cmd-*` 命名约定，类似于 `gh extension` 或 `kubectl plugin`。

## 快速开始

```bash
# 从 npm 安装插件
omniroute plugin install stripe

# 安装开发中的本地插件
omniroute plugin install ./my-plugin

# 列出已安装的插件
omniroute plugin list

# 创建新插件的脚手架
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## 插件结构

插件是一个名为 `omniroute-cmd-<name>`（或 `@scope/omniroute-cmd-<name>`）的 npm 包。

```
omniroute-cmd-myplugin/
├── package.json     # 必须包含 "type": "module" 和 "main": "index.mjs"
├── index.mjs        # 导出 register(program, ctx) 和可选的 meta
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

## 插件上下文 API

传递给 `register(program, ctx)` 的 `ctx` 对象：

| 属性                         | 类型             | 描述                                                 |
| ---------------------------- | ---------------- | ---------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | 向 OmniRoute 服务器发起经过身份验证的 fetch 请求     |
| `ctx.emit(data, opts)`       | `function`       | 根据 `--output` 标志以 table/json/jsonl/csv 格式输出 |
| `ctx.t(key)`                 | `async function` | i18n 翻译查询                                        |
| `ctx.withSpinner(label, fn)` | `async function` | 使用 ora 加载动画包装异步函数                        |
| `ctx.baseUrl`                | `string`         | 解析后的基础 URL                                     |
| `ctx.apiKey`                 | `string \| null` | 提供的 API 密钥（如有）                              |

## 发现机制

插件从以下位置发现：

1. `~/.omniroute/plugins/<name>/` — 用户本地安装
2. `OMNIROUTE_PLUGIN_PATH` 环境变量 — 自定义目录

二者都**仅用于 CLI**。服务端插件运行时（即在代理内部运行的 marketplace/`plugin.json`
插件）拥有自己的扫描器及其专用覆盖变量
`OMNIROUTE_PLUGINS_DIR`——请参阅
[PLUGIN_MARKETPLACE.md → 插件目录](./PLUGIN_MARKETPLACE.md#plugin-directory)。
设置其中一个不会影响另一个。

加载错误会被捕获并以警告形式输出——损坏的插件绝不会导致 CLI 崩溃。

## 安全性

插件以与 `omniroute` 相同的 Node.js 进程权限运行。请仅安装来自可信来源的插件。`omniroute plugin install` 会显示明确的警告，并要求提供 `--yes` 或进行交互式确认。

## 发布

1. 确保 `package.json` 包含 `"keywords": ["omniroute-plugin"]`
2. 像往常一样运行 `npm publish`
3. 用户可通过 `omniroute plugin search <query>` 发现插件（搜索 npm registry）

## 示例插件

有关包含 `meta` 和 `register()` 的最小可运行示例，请参阅 [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs)。
