# OmniRoute CLI Plugin System (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

コアを変更せずに `omniroute` CLI を拡張できます。プラグインは、`gh extension` や `kubectl plugin` と同様に、`omniroute-cmd-*` という命名規則に従います。

## クイックスタート

```bash
# npm からプラグインをインストール
omniroute plugin install stripe

# 開発中のローカルプラグインをインストール
omniroute plugin install ./my-plugin

# インストール済みプラグインを一覧表示
omniroute plugin list

# 新しいプラグインのひな形を作成
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## プラグインの構成

プラグインは、`omniroute-cmd-<name>`（または `@scope/omniroute-cmd-<name>`）という名前の npm パッケージです。

```
omniroute-cmd-myplugin/
├── package.json     # "type": "module" と "main": "index.mjs" が必須
├── index.mjs        # register(program, ctx) と省略可能な meta をエクスポート
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
  description: "OmniRoute 用のプラグイン",
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

## プラグインコンテキスト API

`register(program, ctx)` に渡される `ctx` オブジェクト：

| プロパティ                   | 型               | 説明                                                      |
| ---------------------------- | ---------------- | --------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | OmniRoute サーバーへの認証済み fetch                      |
| `ctx.emit(data, opts)`       | `function`       | `--output` フラグに応じて table/json/jsonl/csv 形式で出力 |
| `ctx.t(key)`                 | `async function` | i18n 翻訳の検索                                           |
| `ctx.withSpinner(label, fn)` | `async function` | 非同期 fn を ora スピナーでラップ                         |
| `ctx.baseUrl`                | `string`         | 解決済みのベース URL                                      |
| `ctx.apiKey`                 | `string \| null` | 指定されている場合の API キー                             |

## 検出

プラグインは以下の場所から検出されます：

1. `~/.omniroute/plugins/<name>/` — ユーザーローカルのインストール先
2. `OMNIROUTE_PLUGIN_PATH` 環境変数 — カスタムディレクトリ

どちらも **CLI 専用**です。サーバー側のプラグインランタイム（プロキシ内で実行されるマーケットプレイス／`plugin.json`
プラグイン）には、独自のオーバーライドである
`OMNIROUTE_PLUGINS_DIR` を使用する独自のスキャナーがあります。詳細は
[PLUGIN_MARKETPLACE.md → プラグインディレクトリ](./PLUGIN_MARKETPLACE.md#plugin-directory)
を参照してください。一方を設定しても、もう一方には影響しません。

読み込みエラーは捕捉され、警告として表示されます。壊れたプラグインが CLI をクラッシュさせることはありません。

## セキュリティ

プラグインは `omniroute` と同じ Node.js プロセス権限で実行されます。信頼できる提供元のプラグインのみをインストールしてください。`omniroute plugin install` は明示的な警告を表示し、`--yes` の指定または対話形式での確認を要求します。

## 公開

1. `package.json` に `"keywords": ["omniroute-plugin"]` が含まれていることを確認します
2. 通常どおり `npm publish` を実行します
3. ユーザーは `omniroute plugin search <query>` を使用して検索できます（npm レジストリを検索します）

## プラグインの例

`meta` + `register()` を含む最小限の動作例については、[`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) を参照してください。
