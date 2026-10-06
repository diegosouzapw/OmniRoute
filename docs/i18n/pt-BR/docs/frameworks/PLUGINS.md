# OmniRoute CLI Plugin System (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Estenda a CLI `omniroute` sem modificar seu núcleo. Os plugins seguem a convenção de nomenclatura `omniroute-cmd-*`, semelhante a `gh extension` ou `kubectl plugin`.

## Início rápido

```bash
# Instale um plugin do npm
omniroute plugin install stripe

# Instale um plugin local em desenvolvimento
omniroute plugin install ./my-plugin

# Liste os plugins instalados
omniroute plugin list

# Gere a estrutura de um novo plugin
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Anatomia de um plugin

Um plugin é um pacote npm chamado `omniroute-cmd-<name>` (ou `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # deve ter "type": "module" e "main": "index.mjs"
├── index.mjs        # exporta register(program, ctx) + meta opcional
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

## API de contexto do plugin

O objeto `ctx` passado para `register(program, ctx)`:

| Propriedade                  | Tipo             | Descrição                                                      |
| ---------------------------- | ---------------- | -------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Requisição autenticada ao servidor OmniRoute                   |
| `ctx.emit(data, opts)`       | `function`       | Saída em table/json/jsonl/csv de acordo com a opção `--output` |
| `ctx.t(key)`                 | `async function` | Consulta de tradução i18n                                      |
| `ctx.withSpinner(label, fn)` | `async function` | Encapsula uma função assíncrona com um spinner do ora          |
| `ctx.baseUrl`                | `string`         | URL base resolvida                                             |
| `ctx.apiKey`                 | `string \| null` | Chave de API, se fornecida                                     |

## Descoberta

Os plugins são descobertos a partir de:

1. `~/.omniroute/plugins/<name>/` — instalações locais do usuário
2. Variável de ambiente `OMNIROUTE_PLUGIN_PATH` — diretório personalizado

Ambos são **exclusivos da CLI**. O runtime de plugins no lado do servidor (os plugins do marketplace/`plugin.json`
executados dentro do proxy) possui seu próprio scanner, com sua própria substituição,
`OMNIROUTE_PLUGINS_DIR` — consulte
[PLUGIN_MARKETPLACE.md → Diretório de plugins](./PLUGIN_MARKETPLACE.md#plugin-directory).
A configuração de um não afeta o outro.

Erros de carregamento são capturados e exibidos como avisos — um plugin com defeito nunca causa uma falha na CLI.

## Segurança

Os plugins são executados com os mesmos privilégios de processo do Node.js que o `omniroute`. Instale apenas plugins de fontes confiáveis. `omniroute plugin install` exibe um aviso explícito e requer `--yes` ou uma confirmação interativa.

## Publicação

1. Certifique-se de que `package.json` contenha `"keywords": ["omniroute-plugin"]`
2. Execute `npm publish` normalmente
3. Os usuários podem encontrá-lo por meio de `omniroute plugin search <query>` (pesquisa no registro npm)

## Plugin de exemplo

Consulte [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) para ver um exemplo funcional mínimo com `meta` + `register()`.
