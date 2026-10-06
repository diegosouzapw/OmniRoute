# Remote Mode (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Execute a CLI `omniroute` no seu portátil enquanto o próprio OmniRoute é executado noutro local
(um VPS, um servidor doméstico, outra máquina na sua Tailnet). Inicia sessão uma vez com
`omniroute connect` e, a partir daí, **todos** os comandos da CLI têm como destino esse servidor
remoto — os mesmos comandos, o mesmo resultado, apenas executados no servidor remoto.

Não existe uma segunda ferramenta para instalar: o modo remoto utiliza a CLI `omniroute`
normal, juntamente com **tokens de acesso** com âmbito definido.

```bash
npm install -g omniroute                 # a CLI normal
omniroute connect 192.168.0.15           # iniciar sessão (palavra-passe → token com âmbito)
omniroute models list                    # ← agora apresenta os modelos do servidor REMOTO
omniroute configure codex                # ← cria um perfil Codex local a partir do catálogo remoto
```

---

## Como funciona

```
o seu portátil                            OmniRoute remoto (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ CLI omniroute      │  POST /api/cli/connect  (palavra-passe → token)    │
│  contexto: vps     │ ───────────────►  │ emite um token de acesso com   │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ todas as rotas de gestão, com  │
│ cria configurações │ ◄───────────────  │ verificação do âmbito do token │
│ LOCALMENTE         │                   └───────────────────────────────┘
└────────────────────┘
```

- Os **contextos** armazenam um servidor cada (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` muda o servidor ativo; `default` é local.
- Os **tokens de acesso** (`oma_live_…`) autorizam comandos de gestão. São
  distintos das chaves da API de inferência (`sk-…`, utilizadas para `/v1/chat/completions`).
- Apenas o hash SHA-256 de um token é armazenado no servidor. O texto simples é apresentado
  **uma única vez**, no momento da criação.

---

## Ligar

### Com a palavra-passe de gestão (inicialização)

```bash
omniroute connect 192.168.0.15
# Palavra-passe de gestão para http://192.168.0.15:20128: ********
# ✔ Ligado a http://192.168.0.15:20128 — contexto '192.168.0.15' (âmbito: admin)
```

Por predefinição, o fluxo com palavra-passe emite um token **admin** (se tem a palavra-passe,
já possui controlo total). Restrinja o âmbito com `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Opções: `--port <p>` (quando o anfitrião não inclui uma porta), `--name <ctx>` (nome do contexto),
`--scope read|write|admin`. Um URL completo é respeitado tal como está:
`omniroute connect https://omni.example.com`.

### Com um token previamente gerado

Gere um token com âmbito definido no painel (ou com `omniroute tokens create`) e
cole-o — não é necessária qualquer palavra-passe:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

A CLI valida-o através de `GET /api/cli/whoami` e guarda-o como contexto ativo.

---

## Âmbitos

Três níveis hierárquicos (`admin ⊃ write ⊃ read`):

| Âmbito  | Permite                                                                                   |
| ------- | ----------------------------------------------------------------------------------------- |
| `read`  | listar/inspecionar — `models list`, `providers status`, `logs`, `usage`, `cost`           |
| `write` | leitura **+** configurar/aplicar — `setup-codex`, `keys add`, `config set`, combinações   |
| `admin` | escrita **+** gerir — CRUD de `tokens`, adicionar fornecedores, serviços, política, oauth |

O servidor determina o âmbito exigido por cada rota a partir do método HTTP
(`GET`→leitura, mutações→escrita), juntamente com uma lista de permissões de administrador para áreas sensíveis
(mutações em `/api/cli/tokens`, `/api/providers`, `/api/oauth`, `/api/services`, …).
Um token com âmbito insuficiente recebe `403` com uma mensagem clara.

> As rotas que iniciam processos (`/api/services/*`, `/api/mcp/*`, …) permanecem
> **limitadas ao loopback** — um token remoto nunca lhes pode aceder, independentemente do âmbito.

---

## Ligar o Antigravity numa instalação remota

O Antigravity utiliza o ecrã de consentimento firstparty/nativeapp da Google. A Google apenas
fornece o código de autorização quando o **redirecionamento de loopback**
(`http://127.0.0.1:<port>/callback`) está **acessível a partir do browser que
aprova o início de sessão**. Numa instalação num VPS remoto, esse loopback existe no
servidor, não na sua máquina, pelo que o ecrã de consentimento **fica bloqueado indefinidamente e nunca
emite um código** — a alternativa normal de «colar o URL de callback» não tem nada para
colar. (Esta é uma restrição do lado da Google: o mesmo bloqueio ocorre em qualquer proxy
que utilize o cliente Antigravity para desktop incluído, e não apenas no OmniRoute.)

O painel deteta esta situação antes de ficar bloqueado: ao abrir **Fornecedores → Antigravity →
Ligar** a partir de um endereço que não seja localhost, o aviso genérico «copiar o URL de callback»
é substituído pelas duas soluções abaixo, cada uma já preenchida com o seu anfitrião e porta.
(Um endereço de LAN também conta — `192.168.x.x` não é localhost no que diz respeito a este
callback.)

Existem duas formas suportadas de ligar o Antigravity a um OmniRoute remoto.

### Opção A — auxiliar de início de sessão local (recomendado)

Execute o OAuth no **seu próprio computador**, onde `127.0.0.1` está acessível. O auxiliar
comunica diretamente com a Google, pelo que o consentimento é concluído onde a versão do painel
não o consegue fazer.

**Se já estiver ligado** (`omniroute connect <host>`), não há nada para
copiar — o auxiliar entrega a credencial nessa instalação por si:

```bash
# Na sua máquina LOCAL (requer Node.js + um browser):
omniroute connect 192.168.0.15        # uma vez — gera um token de contexto com âmbito de administrador
npx omniroute login antigravity
#   ↳ abre o consentimento da Google, captura o callback numa porta de loopback local,
#     efetua a troca e envia a credencial por POST para o contexto ativo:
#
#   Antigravity ligado em http://192.168.0.15:20128 (ligação abc123).
#   Nada para colar — pode fechar este terminal.
```

O envio ocorre automaticamente sempre que o contexto ativo aponta para outra
máquina. Force-o em qualquer dos sentidos com `--push` / `--no-push`, ou direcione-o para um
contexto específico com `--context <name>`.

**Se a sua máquina não conseguir aceder ao VPS** (protegido por firewall, sem SSH, posto de trabalho isolado), o
auxiliar continua a funcionar — apenas _necessita_ da Google. Utilize `--no-push` ou simplesmente deixe o
envio falhar: em vez de descartar uma autorização já concluída, passa a imprimir o blob.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Depois, no painel **remoto**: **Fornecedores → Antigravity → Ligar**, cole
o blob `omniroute-cred-v1.…` no campo do **Passo 2** (aceita um
URL de callback ou um blob de credencial). O OmniRoute descodifica-o, executa a configuração
inicial do Cloud Code no lado do servidor e guarda a ligação.

> O blob contém um token de atualização — trate-o como uma palavra-passe. No método de envio, este
> é enviado uma vez através da ligação autenticada do seu contexto; no método de colagem, através
> da ligação ao painel. Em ambos os casos, é armazenado de forma encriptada em repouso, e um
> envio bem-sucedido nunca o imprime no terminal.

Opções: `--no-browser` (imprime o URL em vez de o abrir automaticamente), `--port <n>`
(fixa a porta de loopback), `--timeout <ms>`, `--push` / `--no-push` (substitui a
entrega automática), `--context <name>` (seleciona um contexto específico).

### Opção B — túnel de encaminhamento local SSH

Se tiver acesso SSH ao VPS, encaminhe a porta do painel para que o
callback de loopback seja direcionado de volta para o servidor através do túnel:

```bash
# Na sua máquina LOCAL:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# depois, abra http://localhost:20128 no seu browser LOCAL e ligue o Antigravity
# normalmente — o redirecionamento para 127.0.0.1:20128/callback chega agora ao VPS através de SSH.
```

Como acede ao painel através de `localhost:20128`, o consentimento da Google
é concluído e o callback é entregue ao servidor através do mesmo túnel —
sem necessidade de um blob. Mantenha o túnel aberto até a ligação ser apresentada como ativa.

Ao contrário dos fornecedores com loopback fixo abaixo, **um único encaminhamento é suficiente** neste caso: o
callback do Antigravity utiliza a própria porta do painel, pelo que não existe uma segunda
porta específica do fornecedor que seja necessário encaminhar.

> Uma alternativa totalmente sem interface gráfica (sem auxiliar nem túnel) consiste em configurar as suas **próprias**
> credenciais Web do Google OAuth + um URL base público; consulte as variáveis de ambiente
> OAuth do fornecedor. As duas opções acima não requerem qualquer configuração adicional da Google.

---

## Ligar o Codex / Grok numa instalação remota (fornecedores com loopback fixo)

O Codex, xAI (`xai-oauth`) e Grok CLI (`grok-cli`) registam um `redirect_uri`
de loopback **fixo** na respetiva aplicação OAuth a montante. O OmniRoute não pode alterá-lo — o
fornecedor redireciona sempre o navegador para o mesmo endereço predefinido:

| Fornecedor  | Callback fixo para o qual o fornecedor redireciona |
| ----------- | -------------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`              |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                  |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                  |

Nesse caso, `localhost` significa **a máquina que executa o navegador**, enquanto o servidor
de callback PKCE do OmniRoute escuta no loopback **do servidor**. Se abrir o painel num
endereço LAN como `http://192.168.0.15:20128`, os dois nunca se encontram: o código de
autorização é enviado para o `localhost:1455` do seu próprio portátil, onde nada está à escuta,
e o fornecedor não consegue iniciar sessão sem apresentar qualquer erro.

O painel deteta esta situação antes de abrir a janela pop-up e apresenta o comando do túnel
em vez de permitir que o início de sessão falhe silenciosamente (#8046).

### Correção — encaminhar **ambas** as portas

```bash
# Na máquina que executa o NAVEGADOR:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# depois, aceda a http://localhost:20128 e ligue o Codex a partir daí
```

São necessários dois encaminhamentos, e encaminhar apenas um continua a falhar:

- **`20128`** (a porta do painel) faz com que a origem seja verdadeiramente localhost, o que
  leva o OmniRoute a iniciar o servidor de callback PKCE — uma origem LAN nunca
  chega a esse ramo.
- **`1455`** (a porta de callback fixa do fornecedor) é o destino para o qual o navegador é
  redirecionado; tem de atravessar o túnel até ao loopback do servidor.

Substitua `1455` por `56121`/`56122` ao ligar o xAI ou o Grok CLI, e `20128` pela
porta real do seu painel. Mantenha o túnel aberto até a ligação ser apresentada como
ativa.

> **Sem acesso SSH?** O Codex e o Grok CLI também aceitam um token colado — o separador **Paste API
> Key** / **Import auth.json** na caixa de diálogo de ligação. Esse método não utiliza um callback
> de loopback, pelo que funciona a partir de qualquer origem. O Codex também aceita um token de acesso
> simples ou um blob de sessão `~/.codex/auth.json`.

---

## Gerir tokens

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ apresenta o segredo UMA VEZ — copie-o agora
omniroute tokens list                 # ocultado: id, nome, âmbito, prefixo, estado, validade
omniroute tokens revoke <id|prefix>   # revogar imediatamente
omniroute tokens scopes               # explicar os três âmbitos
```

Os comandos `tokens` exigem uma credencial de **administrador**. Também pode gerir tokens no
painel, em **Settings → Access Tokens** (criar, revogar, copiar uma única vez).

---

## Configurar uma CLI de programação a partir do catálogo remoto

`omniroute configure` lê o catálogo de modelos em tempo real do **servidor ativo** e grava
uma configuração na **sua** máquina.

```bash
omniroute configure codex
#   Fornecedores: glm, kmc, ollamacloud, opencode-go, …
#   Fornecedor: glm
#   ID do modelo: glm/glm-5.2
#   ✔ Gravado em ~/.codex/glm52.config.toml
#   Utilize-o:  codex --profile glm52

# não interativo
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# manter um modelo utilizado frequentemente no topo do seletor interativo
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

O seletor guarda apenas IDs de modelos (nunca URLs ou credenciais) no ficheiro local
`model-preferences.json`, organizados por contexto e CLI de destino. Os favoritos são
apresentados antes das seleções recentes; utilize `--unfavorite` para remover um modelo
selecionado da lista desse contexto/destino.

O perfil gravado referencia a chave de inferência através de uma variável de ambiente
(`OMNIROUTE_API_KEY`) — o segredo nunca é gravado no disco. Para a configuração base
única do Codex (o bloco `[model_providers.omniroute]`), consulte
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Iniciar uma CLI ligada ao servidor remoto (sem gravar configuração)

`omniroute run <target>` também respeita o contexto ativo: o URL base remoto
e a credencial do contexto são injetados apenas no processo iniciado.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → servidor remoto
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Pré-visualizar exatamente o que seria iniciado (apenas os NOMES das CHAVES de ambiente, nunca os valores):
omniroute run codex --dry-run --json
```

Destinos: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(fonte única: `bin/cli/cli-manifest.mjs`). O Qwen e o Gemini são executados com um
diretório pessoal temporário e isolado, que é removido ao sair, pelo que a execução nunca toca
— nem deixa escapar dados — na configuração pessoal das suas ferramentas.

### Comandos de configuração por CLI

Cada CLI suportada tem um comando de configuração compatível com servidores remotos (todos respeitam o contexto
ativo ou `--remote <url> --api-key <key>`):

| CLI         | Comando                    | O que escreve                                                                                                                                                                                   |
| ----------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | perfis `~/.codex/<name>.config.toml` (por modelo)                                                                                                                                               |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (por modelo)                                                                                                                                          |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — o fornecedor `omniroute` compatível com OpenAI, com todos os modelos do catálogo (execute `opencode -m omniroute/<model>`)                                 |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (modo CLI) + apresenta as definições da extensão do VS Code a colar (compatível com OpenAI, URL base **sem** `/v1`)                                  |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + definições `kilocode.*` do VS Code — compatível com OpenAI, URL base **com** `/v1`                                                                      |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + CLI `cn`) — `provider: openai`, `apiBase` **com** `/v1`, chave através de `${{ secrets.OMNIROUTE_API_KEY }}`                                     |
| Cursor      | `omniroute setup-cursor`   | apresenta os passos na aplicação (Definições → Modelos → substituir o URL base da OpenAI **com** `/v1` + chave + modelo). A configuração do Cursor usa SQLite opaco — apenas o painel de chat   |
| Roo Code    | `omniroute setup-roo`      | escreve um JSON de importação do Roo (`~/.omniroute/roo-settings.json`) + define `roo-cline.autoImportSettingsPath` + apresenta os passos na IU (compatível com OpenAI, URL base **com** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — fornecedor `openai-compat`, `base_url` **com** `/v1`, chave através de `$OMNIROUTE_API_KEY`                                                                      |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **sem** `/v1` + `GOOSE_MODEL`) + instruções para as variáveis de ambiente                                                |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **sem** `/v1` + `model: openai/<id>`) + instruções para as variáveis de ambiente (`aider --message --yes`)                                               |
| Qwen Code   | `omniroute setup-qwen`     | entrada V4 `modelProviders.openai` em `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` em `~/.qwen/.env`                                                                                           |

```bash
# OpenCode (fornecedor compatível com OpenAI, todos os modelos do catálogo, VPS remoto)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # manter apenas os modelos correspondentes
opencode -m omniroute/glm/glm-5.2 "..."          # exportar primeiro OMNIROUTE_API_KEY
```

> O OpenCode também dispõe de uma integração por **plugin** mais completa: `omniroute setup opencode`
> (agora com suporte remoto através de `--remote`) instala `@omniroute/opencode-plugin`.
> `setup-opencode` é a alternativa simples compatível com OpenAI. A chave da API
> é referenciada através de `{env:OMNIROUTE_API_KEY}` — nunca é escrita no disco.
>
> No OpenCode v2, utilize antes `@omniroute/opencode-plugin-v2`: o mesmo catálogo,
> mas um contrato de carregamento diferente. Lê a chave do próprio armazenamento
> de credenciais do OpenCode quando a integração está ligada, pelo que um gateway
> remoto não necessita de qualquer chave em `opencode.json`.

---

## Gerir contextos (alternar entre servidores)

Um **contexto** é um servidor guardado (baseUrl + credencial + âmbito). `omniroute connect`
cria um e torna-o ativo; a partir daí, cada comando visa-o. Gira e
alterne entre eles com `omniroute contexts`:

```bash
omniroute contexts list            # todos os contextos; o ativo é marcado ●
omniroute contexts current         # o servidor ativo, estado de autenticação, âmbito
```

```text
  | Name    | Base URL                  | Auth  | Scope | Description
● | vps     | http://100.67.86.91:20128 | token | admin | Remote OmniRoute (…)
  | default | http://localhost:20128    | ✗     |       |
```

**Alternar servidores** — cada comando subsequente segue o contexto ativo:

```bash
omniroute contexts use vps         # → todos os comandos agora atingem o VPS remoto
omniroute tokens list              #   (executa contra o VPS)

omniroute contexts use default     # → de volta ao localhost
omniroute tokens list              #   (executa contra o servidor local)
```

**Adicionar um contexto manualmente** (em vez de `connect`), inspecionar ou renomear:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # detalhes completos para um contexto
omniroute contexts rename staging stg
```

**Remover um contexto** — pede confirmação; passe `--yes` para ignorar
(necessário para scripts / shells não interativas, que de outra forma recusam em segurança):

```bash
omniroute contexts remove stg --yes
```

> O `default` (localhost) não pode ser removido. Remover o contexto ativo reverte
> para `default`. Dica: remover um contexto apenas elimina a credencial guardada
> **localmente** — revogue o token no servidor com `omniroute tokens revoke <id>`
> para realmente anular o acesso.

**Exportar / importar** contextos (por exemplo, para os mover entre máquinas). As exportações omitem
credenciais por predefinição, incluindo credenciais armazenadas pelo fallback de ficheiro. Use
`--include-secrets` explicitamente quando for necessário um backup portátil com credenciais:

```bash
omniroute contexts export --out contexts.json     # redigido; destino predefinido: stdout
omniroute contexts export --include-secrets --out private-contexts.json
omniroute contexts import contexts.json            # sobrescrever; --merge para manter os existentes
omniroute contexts migrate --yes                  # mover tokens de texto simples legados para o keychain
```

`--include-secrets` resolve referências de keychain antes de exportar e falha se
qualquer credencial referenciada não puder ser lida. `--no-secrets` tem sempre precedência.
Os ficheiros de exportação são escritos atomicamente com o modo `0600`. Trate uma exportação
explícita com segredos como material secreto. Em sistemas sem cabeça sem um keychain
de SO utilizável, a CLI reverte para `config.json` com o modo `0600` e imprime um
aviso único; uma exportação predefinida permanece redigida neste modo.

---

## Verificação rápida de ponta a ponta

Um ciclo de vida que pode copiar e colar para verificar uma configuração remota de raiz — estabelecer ligação, emitir um
token com âmbito, encaminhar um comando, regressar ao contexto anterior e eliminar a configuração. Substitua
`192.168.0.15` pelo anfitrião/IP do seu servidor (Tailscale, LAN ou um URL público
`https://…`).

```bash
# 1. Estabelecer ligação (palavra-passe → token de administrador, guardado como um contexto que se torna ativo)
omniroute connect 192.168.0.15                 # ou: --key oma_live_xxxx  (sem palavra-passe)
omniroute contexts current                     # mostra o servidor remoto + âmbito

# 2. Utilizá-lo — os comandos de gestão são agora executados no servidor remoto
omniroute tokens create --name laptop --scope read   # emitir um token com um âmbito mais restrito
omniroute tokens list                                 # lista mascarada, obtida do servidor remoto

# 3. Alternar entre contextos
omniroute contexts use default                 # → local
omniroute contexts use 192-168-0-15            # → novamente remoto (nome de `contexts list`)

# 4. Eliminar a configuração. NOTA: `contexts remove` elimina apenas a credencial LOCAL —
#    NÃO revoga o token no servidor. Primeiro, revogue-o no servidor se pretender
#    efetivamente eliminar o acesso.
omniroute tokens revoke <id|prefix>            # elimina o acesso no servidor
omniroute contexts remove 192-168-0-15 --yes   # elimina o contexto local (mesmo se estiver ativo → é utilizado default), sem confirmação
```

> `--yes` faz com que `contexts remove` seja não interativo (obrigatório em scripts/CI; sem
> esta opção, uma shell não interativa recusa a operação em segurança, em vez de ficar bloqueada). Ao remover o contexto
> **ativo**, é utilizado automaticamente o contexto `default`.

---

## Notas de segurança

- O token em texto simples é apresentado uma única vez; apenas o hash SHA-256 é guardado (tal como acontece com as chaves de API).
- `omniroute connect` reutiliza o bloqueio contra tentativas de início de sessão por força bruta e o registo de auditoria.
- Prefira HTTPS ou uma Tailnet para o transporte; por predefinição, um anfitrião sem protocolo utiliza `http://`
  para maior conveniência em LAN/Tailscale — forneça um URL `https://…` completo para utilizar TLS.
- O ficheiro de contexto local recomendado é `~/.omniroute/config.json` (`chmod 600`),
  contendo apenas uma `credentialRef`; o próprio token é armazenado no porta-chaves do
  sistema operativo (`keytar`) e nunca é apresentado nos registos. As instalações sem interface
  e sem um porta-chaves nativo funcional utilizam o mesmo ficheiro com permissões `0600`
  como alternativa explícita e emitem um aviso uma única vez. Utilize
  `omniroute contexts migrate --yes` depois de instalar um backend de porta-chaves.

---

## Endpoints da API (referência)

| Método | Rota                  | Autenticação            | Âmbito                                   |
| ------ | --------------------- | ----------------------- | ---------------------------------------- |
| POST   | `/api/cli/connect`    | palavra-passe de gestão | — (público, protegido por palavra-passe) |
| GET    | `/api/cli/whoami`     | token de acesso         | leitura                                  |
| GET    | `/api/cli/tokens`     | token de acesso         | administração                            |
| POST   | `/api/cli/tokens`     | token de acesso         | administração                            |
| DELETE | `/api/cli/tokens/:id` | token de acesso         | administração                            |

Consulte [openapi.yaml](../openapi.yaml) para ver os esquemas completos.
