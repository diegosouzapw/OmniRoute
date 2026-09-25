# Remote Mode (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Execute a CLI `omniroute` no seu laptop enquanto o próprio OmniRoute é executado em outro lugar
(uma VPS, um servidor doméstico, outra máquina na sua Tailnet). Você faz login uma vez com
`omniroute connect` e, a partir daí, **todos** os comandos da CLI são direcionados para esse servidor
remoto — mesmos comandos, mesma saída, apenas executados no servidor remoto.

Não há uma segunda ferramenta para instalar: o modo remoto usa a CLI `omniroute` normal
com **tokens de acesso** com escopo.

```bash
npm install -g omniroute                 # a CLI normal
omniroute connect 192.168.0.15           # faz login (senha → token com escopo)
omniroute models list                    # ← agora lista os modelos do servidor REMOTO
omniroute configure codex                # ← grava um perfil local do Codex usando o catálogo remoto
```

---

## Como funciona

```
seu laptop                               OmniRoute remoto (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ CLI omniroute      │  POST /api/cli/connect  (senha → token)             │
│  contexto: vps     │ ───────────────►  │ emite um token de acesso       │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ todas as rotas de gerenciamento│
│ grava configurações│ ◄───────────────  │ verificadas conforme o escopo  │
│ LOCALMENTE         │                   └───────────────────────────────┘
└────────────────────┘
```

- **Contextos** armazenam um servidor cada (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` alterna o servidor ativo; `default` é local.
- **Tokens de acesso** (`oma_live_…`) autorizam comandos de gerenciamento. Eles são
  diferentes das chaves da API de inferência (`sk-…`, usadas para `/v1/chat/completions`).
- Somente o hash SHA-256 de um token é armazenado no servidor. O texto simples é exibido
  **uma única vez**, na criação.

---

## Conectando

### Com a senha de gerenciamento (inicialização)

```bash
omniroute connect 192.168.0.15
# Senha de gerenciamento de http://192.168.0.15:20128: ********
# ✔ Conectado a http://192.168.0.15:20128 — contexto '192.168.0.15' (escopo: admin)
```

O fluxo com senha emite, por padrão, um token **admin** (você possui a senha, portanto
já tem controle total). Restrinja o escopo com `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Opções: `--port <p>` (quando o host não especifica uma porta), `--name <ctx>` (nome do contexto),
`--scope read|write|admin`. Uma URL completa é respeitada sem alterações:
`omniroute connect https://omni.example.com`.

### Com um token gerado previamente

Gere um token com escopo no painel (ou com `omniroute tokens create`) e
cole-o — nenhuma senha é necessária:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

A CLI o valida por meio de `GET /api/cli/whoami` e o salva como o contexto ativo.

---

## Escopos

Três níveis hierárquicos (`admin ⊃ write ⊃ read`):

| Escopo  | O que pode fazer                                                                             |
| ------- | -------------------------------------------------------------------------------------------- |
| `read`  | listar/inspecionar — `models list`, `providers status`, `logs`, `usage`, `cost`              |
| `write` | leitura **+** configurar/aplicar — `setup-codex`, `keys add`, `config set`, combos           |
| `admin` | gravação **+** gerenciar — CRUD de `tokens`, adicionar provedores, serviços, política, oauth |

O servidor infere o escopo exigido por cada rota com base no método HTTP
(`GET`→leitura, mutações→gravação), além de uma lista de permissões administrativas para áreas sensíveis
(mutações em `/api/cli/tokens`, `/api/providers`, `/api/oauth`, `/api/services`, …).
Um token com escopo insuficiente recebe `403` com uma mensagem clara.

> Rotas que iniciam processos (`/api/services/*`, `/api/mcp/*`, …) permanecem
> **restritas ao loopback** — um token remoto nunca pode acessá-las, independentemente do escopo.

---

## Conectando o Antigravity em uma instalação remota

O Antigravity usa a tela de consentimento firstparty/nativeapp do Google. O Google só
libera o código de autorização quando o **redirecionamento de loopback**
(`http://127.0.0.1:<port>/callback`) está **acessível pelo navegador que
aprova o login**. Em uma instalação em um VPS remoto, esse loopback existe no
servidor, não na sua máquina, portanto a tela de consentimento **fica travada para sempre e nunca
emite um código** — o fallback normal de "colar a URL de callback" não tem nada para
colar. (Essa é uma restrição do Google: o mesmo travamento ocorre em qualquer proxy
que usa o cliente desktop Antigravity incluído, não apenas no OmniRoute.)

O painel detecta isso antes que você fique travado: abrir **Providers → Antigravity →
Connect** a partir de um endereço que não seja localhost substitui o aviso genérico "copie a URL de callback"
pelas duas soluções abaixo, cada uma já preenchida com seu host e sua porta.
(Um endereço de LAN também conta — `192.168.x.x` não é localhost no que diz respeito a esse callback.)

Há duas maneiras compatíveis de conectar o Antigravity a um OmniRoute remoto.

### Opção A — auxiliar de login local (recomendado)

Execute o OAuth no **seu próprio computador**, onde `127.0.0.1` está acessível. O auxiliar
se comunica diretamente com o Google, portanto o consentimento é concluído onde isso
não seria possível pela versão do painel.

**Se você já estiver conectado** (`omniroute connect <host>`), não há nada para
copiar — o auxiliar entrega a credencial a essa instalação para você:

```bash
# Na sua máquina LOCAL (requer Node.js + um navegador):
omniroute connect 192.168.0.15        # uma vez — gera um token de contexto com escopo de administrador
npx omniroute login antigravity
#   ↳ abre o consentimento do Google, captura o callback em uma porta de loopback local,
#     realiza a troca e envia a credencial via POST para o contexto ativo:
#
#   Antigravity conectado em http://192.168.0.15:20128 (conexão abc123).
#   Não há nada para colar — você pode fechar este terminal.
```

O envio acontece automaticamente sempre que o contexto ativo aponta para outra
máquina. Force qualquer uma das opções com `--push` / `--no-push` ou direcione para um
contexto específico com `--context <name>`.

**Se sua máquina não conseguir acessar o VPS** (bloqueado por firewall, sem SSH, estação isolada),
o auxiliar ainda funcionará — ele só _precisa_ do Google. Use `--no-push` ou simplesmente deixe o
envio falhar: como fallback, ele exibe o blob em vez de descartar uma
autorização que você já concluiu.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Depois, no painel **remoto**: **Providers → Antigravity → Connect**, cole
o blob `omniroute-cred-v1.…` no campo da **Etapa 2** (ele aceita uma
URL de callback ou um blob de credencial). O OmniRoute o decodifica, executa a integração
do Cloud Code no servidor e mantém a conexão.

> O blob contém um token de atualização — trate-o como uma senha. No fluxo de envio, ele
> é enviado uma vez pela conexão autenticada do seu contexto; no fluxo de colagem, pela
> conexão do painel. De qualquer forma, ele é armazenado criptografado em repouso, e um
> envio bem-sucedido nunca o exibe no seu terminal.

Opções: `--no-browser` (exibe a URL em vez de abri-la automaticamente), `--port <n>`
(fixa a porta de loopback), `--timeout <ms>`, `--push` / `--no-push` (substitui a
entrega automática), `--context <name>` (direciona para um contexto específico).

### Opção B — túnel de encaminhamento local via SSH

Se você tiver acesso SSH ao VPS, encaminhe a porta do painel para que o
callback de loopback seja resolvido de volta para o servidor por meio do túnel:

```bash
# Na sua máquina LOCAL:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# depois, abra http://localhost:20128 no seu navegador LOCAL e conecte o Antigravity
# normalmente — o redirecionamento para 127.0.0.1:20128/callback agora chega ao VPS via SSH.
```

Como você acessa o painel por `localhost:20128`, o consentimento do Google
é concluído e o callback é entregue ao servidor pelo mesmo túnel —
nenhum blob é necessário. Mantenha o túnel aberto até que a conexão seja exibida como ativa.

Diferentemente dos provedores com loopback fixo abaixo, **um encaminhamento é suficiente** aqui: o
callback do Antigravity usa a própria porta do painel, portanto não há uma segunda
porta específica do provedor para encaminhar.

> Uma alternativa totalmente headless (sem auxiliar e sem túnel) é configurar suas **próprias**
> credenciais da Web do Google OAuth + uma URL base pública; consulte as variáveis de ambiente
> OAuth do provedor. As duas opções acima não exigem nenhuma configuração adicional do Google.

---

## Conectando Codex / Grok em uma instalação remota (provedores com loopback fixo)

Codex, xAI (`xai-oauth`) e Grok CLI (`grok-cli`) registram um `redirect_uri` de
loopback **fixo** no aplicativo OAuth upstream. O OmniRoute não pode alterá-lo — o
provedor sempre redireciona o navegador para o mesmo endereço predefinido:

| Provedor    | Callback fixo para o qual o provedor redireciona |
| ----------- | ------------------------------------------------ |
| `codex`     | `http://localhost:1455/auth/callback`            |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                |

Nesse caso, `localhost` significa **a máquina que está executando o navegador**,
enquanto o servidor de callback PKCE do OmniRoute escuta no loopback do
**servidor**. Abra o painel em um endereço da LAN, como
`http://192.168.0.15:20128`, e os dois nunca se encontrarão: o código de
autorização é entregue ao `localhost:1455` do seu próprio laptop, onde nada está
escutando, e o provedor não consegue concluir o login sem exibir um erro.

O painel detecta isso antes de abrir o pop-up e mostra o comando do túnel, em vez
de permitir que o login falhe silenciosamente (#8046).

### Correção — encaminhe **ambas** as portas

```bash
# Na máquina que está executando o NAVEGADOR:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# depois acesse http://localhost:20128 e conecte o Codex a partir daí
```

São necessários dois encaminhamentos, e encaminhar apenas um ainda resulta em
falha:

- **`20128`** (a porta do painel) faz com que a origem seja realmente localhost,
  o que faz o OmniRoute iniciar o servidor de callback PKCE — uma origem da LAN
  nunca alcança esse ramo.
- **`1455`** (a porta fixa de callback do provedor) é para onde o navegador é
  redirecionado; ela precisa passar pelo túnel até o loopback do servidor.

Substitua `1455` por `56121`/`56122` ao conectar xAI ou Grok CLI, e `20128` pela
porta real do seu painel. Mantenha o túnel aberto até que a conexão apareça como
ativa.

> **Sem acesso SSH?** Codex e Grok CLI também aceitam um token colado — a aba
> **Colar chave de API** / **Importar auth.json** na caixa de diálogo de conexão.
> Esse método não tem callback de loopback, portanto funciona a partir de qualquer
> origem. Além disso, o Codex aceita um token de acesso simples ou um blob de
> sessão `~/.codex/auth.json`.

---

## Gerenciando tokens

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ exibe o segredo UMA VEZ — copie-o agora
omniroute tokens list                 # mascarado: id, nome, escopo, prefixo, status, expiração
omniroute tokens revoke <id|prefix>   # revoga imediatamente
omniroute tokens scopes               # explica os três escopos
```

Os comandos `tokens` exigem uma credencial de **administrador**. Você também pode
gerenciar tokens no painel, em **Configurações → Tokens de acesso** (criar,
revogar, copiar uma única vez).

---

## Configurando uma CLI de programação a partir do catálogo remoto

`omniroute configure` lê o catálogo de modelos em tempo real do **servidor ativo**
e grava uma configuração na **sua** máquina.

```bash
omniroute configure codex
#   Provedores: glm, kmc, ollamacloud, opencode-go, …
#   Provedor: glm
#   ID do modelo: glm/glm-5.2
#   ✔ Gravado em ~/.codex/glm52.config.toml
#   Use assim:  codex --profile glm52

# não interativo
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# mantém um modelo usado com frequência no topo do seletor interativo
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

O seletor mantém apenas IDs de modelos (nunca URLs ou credenciais) no arquivo
local `model-preferences.json`, com escopo definido por contexto e destino da
CLI. Os favoritos são exibidos antes das seleções recentes; use `--unfavorite`
para remover um modelo selecionado da lista desse contexto/destino.

O perfil gravado referencia a chave de inferência por uma variável de ambiente
(`OMNIROUTE_API_KEY`) — o segredo nunca é gravado no disco. Para a configuração
inicial única do Codex (o bloco `[model_providers.omniroute]`), consulte
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Iniciando uma CLI no ambiente remoto (sem gravar configuração)

`omniroute run <target>` também respeita o contexto ativo: a URL base remota e a
credencial do contexto são injetadas apenas no processo iniciado.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → remoto
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Visualize exatamente o que seria iniciado (somente os NOMES DAS CHAVES de ambiente, nunca os valores):
omniroute run codex --dry-run --json
```

Destinos: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(fonte única: `bin/cli/cli-manifest.mjs`). Qwen e Gemini são executados com um
diretório pessoal temporário e isolado, que é removido ao sair; assim, a
inicialização nunca altera — nem vaza dados para — a configuração pessoal das
suas ferramentas.

### Comandos de configuração específicos de cada CLI

Cada CLI compatível tem um comando de configuração com suporte a ambientes
remotos (todos respeitam o contexto ativo ou
`--remote <url> --api-key <key>`):

| CLI         | Comando                    | O que é gravado                                                                                                                                                                                  |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Codex       | `omniroute setup-codex`    | perfis `~/.codex/<name>.config.toml` (por modelo)                                                                                                                                                |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (por modelo)                                                                                                                                           |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — o provedor `omniroute` compatível com OpenAI, com todos os modelos do catálogo (execute `opencode -m omniroute/<model>`)                                    |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (modo CLI) + exibe as configurações da extensão do VS Code para colar (compatível com OpenAI, URL base **sem** `/v1`)                                 |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + configurações `kilocode.*` do VS Code — compatível com OpenAI, URL base **com** `/v1`                                                                    |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + CLI `cn`) — `provider: openai`, `apiBase` **com** `/v1`, chave via `${{ secrets.OMNIROUTE_API_KEY }}`                                             |
| Cursor      | `omniroute setup-cursor`   | exibe as etapas no aplicativo (Configurações → Modelos → Substituir URL base da OpenAI **com** `/v1` + chave + modelo). A configuração do Cursor é um SQLite opaco — somente o painel de chat    |
| Roo Code    | `omniroute setup-roo`      | grava um JSON de importação do Roo (`~/.omniroute/roo-settings.json`) + define `roo-cline.autoImportSettingsPath` + exibe as etapas na interface (compatível com OpenAI, URL base **com** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — provedor `openai-compat`, `base_url` **com** `/v1`, chave via `$OMNIROUTE_API_KEY`                                                                                |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **sem** `/v1` + `GOOSE_MODEL`) + instruções para as variáveis de ambiente                                                 |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **sem** `/v1` + `model: openai/<id>`) + instruções para as variáveis de ambiente (`aider --message --yes`)                                                |
| Qwen Code   | `omniroute setup-qwen`     | entrada V4 `modelProviders.openai` em `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` em `~/.qwen/.env`                                                                                            |

```bash
# OpenCode (provedor compatível com OpenAI, todos os modelos do catálogo, VPS remoto)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # manter apenas os modelos correspondentes
opencode -m omniroute/glm/glm-5.2 "..."          # exportar OMNIROUTE_API_KEY primeiro
```

> O OpenCode também oferece uma integração mais completa por **plugin**: `omniroute setup opencode`
> (agora compatível com acesso remoto via `--remote`) instala `@omniroute/opencode-plugin`.
> `setup-opencode` é a alternativa leve compatível com OpenAI. A chave de API
> é referenciada via `{env:OMNIROUTE_API_KEY}` — nunca é gravada no disco.
>
> No OpenCode v2, use `@omniroute/opencode-plugin-v2`: mesmo catálogo,
> contrato de carregamento diferente. Ele lê a chave do próprio armazenamento
> de credenciais do OpenCode quando a integração está conectada, portanto um gateway remoto não precisa
> de nenhuma chave em `opencode.json`.

---

## Gerenciando contextos (alternar entre servidores)

Um **contexto** é um servidor salvo (baseUrl + credencial + escopo). `omniroute connect`
cria um e o torna ativo; a partir daí, todo comando o direciona. Gerencie e
alterne entre eles com `omniroute contexts`:

```bash
omniroute contexts list            # todos os contextos; o ativo é marcado ●
omniroute contexts current         # o servidor ativo, status de autenticação, escopo
```

```text
  | Nome    | URL Base                  | Autenticação | Escopo | Descrição
● | vps     | http://100.67.86.91:20128 | token        | admin  | OmniRoute Remoto (…)
  | default | http://localhost:20128    | ✗            |        |
```

**Alternar servidores** — todo comando subsequente segue o contexto ativo:

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

**Remover um contexto** — solicita confirmação; passe `--yes` para ignorá-la
(necessário para scripts / shells não interativos, que de outra forma recusam com segurança):

```bash
omniroute contexts remove stg --yes
```

> O `default` (localhost) não pode ser removido. A remoção do contexto ativo retorna ao `default`. Dica: remover um contexto apenas descarta a credencial salva **localmente** — revogue o token no servidor com `omniroute tokens revoke <id>` para realmente encerrar o acesso.

**Exportar / importar** contextos (por exemplo, para movê-los entre máquinas). As exportações omitem
credenciais por padrão, incluindo credenciais armazenadas pelo fallback de arquivo. Use
`--include-secrets` explicitamente quando um backup portátil contendo credenciais for necessário:

```bash
omniroute contexts export --out contexts.json     # redigido; destino padrão: stdout
omniroute contexts export --include-secrets --out private-contexts.json
omniroute contexts import contexts.json            # sobrescrever; --merge para manter os existentes
omniroute contexts migrate --yes                  # mover tokens de texto simples legados para o keychain
```

`--include-secrets` resolve referências do keychain antes de exportar e falha se qualquer
credencial referenciada não puder ser lida. `--no-secrets` sempre tem precedência.
Os arquivos de exportação são gravados atomicamente com o modo `0600`. Trate uma exportação explícita
contendo segredos como material secreto. Em sistemas headless sem um keychain do sistema operacional
utilizável, a CLI retorna para `config.json` com o modo `0600` e imprime um
aviso único; uma exportação padrão permanece redigida neste modo.

---

## Verificação rápida de ponta a ponta

Um ciclo de vida que pode ser copiado e colado para verificar uma configuração remota do zero — conectar, emitir um
token com escopo, direcionar um comando, retornar ao contexto anterior e desmontar a configuração. Substitua
`192.168.0.15` pelo host/IP do seu servidor (Tailscale, LAN ou uma URL pública
`https://…`).

```bash
# 1. Conecte-se (senha → token de administrador, salvo como um contexto que se torna ativo)
omniroute connect 192.168.0.15                 # ou: --key oma_live_xxxx  (sem senha)
omniroute contexts current                     # mostra o servidor remoto + escopo

# 2. Use-o — agora os comandos de gerenciamento são executados no servidor remoto
omniroute tokens create --name laptop --scope read   # emite um token com escopo mais restrito
omniroute tokens list                                 # lista mascarada, obtida do servidor remoto

# 3. Alterne entre os contextos
omniroute contexts use default                 # → local
omniroute contexts use 192-168-0-15            # → remoto novamente (nome obtido em `contexts list`)

# 4. Desmonte a configuração. OBSERVAÇÃO: `contexts remove` exclui apenas a credencial LOCAL —
#    ele NÃO revoga o token no servidor. Primeiro, revogue-o no servidor se você
#    realmente quiser eliminar o acesso.
omniroute tokens revoke <id|prefix>            # elimina o acesso no servidor
omniroute contexts remove 192-168-0-15 --yes   # remove o contexto local (mesmo se estiver ativo → retorna para default), sem confirmação
```

> `--yes` torna `contexts remove` não interativo (obrigatório em scripts/CI; sem
> essa opção, um shell não interativo recusa a operação com segurança em vez de ficar travado). Ao remover o
> contexto **ativo**, o sistema retorna automaticamente para `default`.

---

## Notas de segurança

- O texto simples do token é exibido uma única vez; somente o hash SHA-256 é armazenado (assim como ocorre com as chaves de API).
- `omniroute connect` reutiliza o bloqueio contra tentativas de login por força bruta + o registro de auditoria.
- Prefira HTTPS ou uma Tailnet para o transporte; um host sem protocolo usa `http://`
  por padrão para conveniência em LAN/Tailscale — forneça uma URL `https://…` completa para usar TLS.
- O arquivo de contexto local preferencial é `~/.omniroute/config.json` (`chmod 600`),
  contendo apenas uma `credentialRef`; o token em si é armazenado no chaveiro do
  sistema operacional (`keytar`) e nunca é exibido nos logs. Instalações sem interface
  gráfica que não tenham um chaveiro nativo funcional usam o mesmo arquivo com permissão
  `0600` como fallback explícito e emitem um aviso uma única vez. Use
  `omniroute contexts migrate --yes` após instalar um backend de chaveiro.

---

## Endpoints da API (referência)

| Método | Rota                  | Autenticação           | Escopo                           |
| ------ | --------------------- | ---------------------- | -------------------------------- |
| POST   | `/api/cli/connect`    | senha de gerenciamento | — (público, protegido por senha) |
| GET    | `/api/cli/whoami`     | token de acesso        | leitura                          |
| GET    | `/api/cli/tokens`     | token de acesso        | administrador                    |
| POST   | `/api/cli/tokens`     | token de acesso        | administrador                    |
| DELETE | `/api/cli/tokens/:id` | token de acesso        | administrador                    |

Consulte [openapi.yaml](../openapi.yaml) para ver os esquemas completos.
