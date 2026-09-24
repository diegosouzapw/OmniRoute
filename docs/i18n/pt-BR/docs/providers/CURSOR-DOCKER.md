# Cursor Provider in Docker Environments (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Quando o OmniRoute é executado dentro do Docker, os fluxos legados de **Importar do Cursor IDE** /
`cursor-agent` falham porque o contêiner não consegue acessar a instalação do Cursor
no host. Em vez disso, use **Entrar com o Cursor** (PKCE deep-control).

## Por que a importação do IDE / CLI falha no Docker

1. **Isolamento do sistema de arquivos** — A importação automática procura caminhos do Linux, como
   `~/.config/Cursor/User/globalStorage/state.vscdb`, _dentro_ do contêiner.
   No Docker Desktop para macOS, o banco de dados do IDE no host não é montado por padrão, e
   o sistema operacional do contêiner é Linux, mesmo quando o host é Darwin.
2. **Ausência do binário `cursor-agent`** — As imagens oficiais do OmniRoute não incluem
   `cursor-agent`. Anteriormente, a opção Modelos disponíveis executava
   `cursor-agent --list-models` e recorria a um catálogo estático em caso de falha.
3. **Binário incorreto** — **Não** monte via bind um `cursor-agent` do macOS em um contêiner
   Linux. Ele não será executado.

## Recomendado: entrar com o Cursor

1. Abra **Painel → Provedores → Cursor**.
2. Escolha a aba **Entrar com o Cursor**.
3. Clique em **Entrar com o Cursor** — o OmniRoute abre
   `https://cursor.com/loginDeepControl?…` no navegador do seu **host**.
4. Aprove o login no navegador e retorne ao painel. O OmniRoute
   consulta `api2.cursor.sh/auth/poll` até que os tokens sejam recebidos.
5. O OmniRoute armazena os tokens de **acesso + atualização** e os atualiza por meio de
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Esse método não exige o Cursor IDE nem o `cursor-agent` dentro do contêiner.

## Descoberta de modelos

Com uma conexão autenticada, **Modelos disponíveis / Sincronização automática** prioriza o
catálogo HTTP `AiService/AvailableModels` do Cursor usando o token bearer da conexão.
Se isso falhar, o OmniRoute ainda tenta usar o `cursor-agent` do host (quando presente) e,
depois, os dados iniciais do registro estático.

O OmniRoute sempre disponibiliza **`auto`** no catálogo (exibido como “Auto”), além
dos modos de roteador no estilo OpenCodex **`auto-cost`**, **`auto-balance`** e
**`auto-intelligence`**. Na comunicação, eles são mapeados para o modelo `default` do Cursor
(com um `ModelParameter` de `optimization` para as três variantes). Prefira
`cu/auto` quando o uso dos modelos premium estiver esgotado — o Auto muitas vezes ainda tem cota disponível.

### O catálogo em tempo real é exclusivo quando sincronizado

Após uma sincronização bem-sucedida dos modelos do Cursor (`cursor-agent --list-models` → catálogo
sincronizado persistido, ou a busca autenticada por bearer em `AvailableModels` mencionada acima), o
**painel**, **`/v1/models`** e **Testar todos** listam:

1. Modelos retornados pela sincronização em tempo real
2. IDs de roteadores automáticos injetados: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Modelos **personalizados** do operador (importados / adicionados manualmente) — nunca removidos pela sincronização

O grande registro estático em
`open-sse/config/providers/registry/cursor/` é usado **somente como fallback offline**. Quando
a lista sincronizada está vazia (ou a descoberta falha), a listagem recorre a esse registro.

IDs com sufixo de esforço (por exemplo, `claude-4.6-sonnet-high`) ainda podem ser
**solicitados** durante a execução: `resolveRequestedModel` remove o sufixo e o transforma em um
`ModelParameter` para a comunicação. A listagem exclusiva oculta intencionalmente essas variantes estáticas
de Testar todos, para que as verificações correspondam ao que o Cursor realmente retorna como disponível.

### Auxiliares

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — mesclagem do painel
- `ensureCursorAutoCatalogEntry` — injeção de auto* na descoberta + listagem
- `shouldSuppressStaticModelForExclusiveListing` — loop estático de `/v1/models`

## Limites do provedor (cota)

**Uso → Limites do provedor** para o Cursor usa APIs Bearer em `api2.cursor.sh`
(`GetCurrentPeriodUsage` → resumo de uso → auth/usage) após o PKCE ou a
importação de tokens. O caminho legado de cookie/painel do `cursor.com` permanece como último fallback
para sessões antigas importadas do IDE.

As janelas normalmente incluem **Total**, **Auto + Composer** e **API**. Se
os limites aparecerem vazios, execute novamente **Entrar com o Cursor** ou reimporte os tokens (a importação
apenas do IDE não é mais necessária).

## Turnos vazios / uso esgotado

Quando o Cursor aceita uma execução, mas não retorna texto do assistente (algo comum quando o
uso premium está esgotado), o OmniRoute apresenta um erro **429** acionável (indicando a cota) ou
**502** com orientações — não apenas “O provedor retornou conteúdo vazio”. Falhas de streaming,
como `not_found: AI Model Not Found` (janela de uso esgotada), são
classificadas como **limite de taxa / uso do Cursor excedido** e mantêm essa mensagem
durante todo o pipeline SSE (a proteção compartilhada contra streams vazios não substitui um
erro já emitido). Verifique os Limites do provedor, experimente o modelo **`auto`** ou aumente
os limites do plano do Cursor.

## Versão do cliente (headless)

Sem uma instalação local do `cursor-agent`, o OmniRoute resolve
`x-cursor-client-version` por meio da variável de ambiente `CURSOR_AGENT_CLI_VERSION`, depois por uma extração
armazenada em cache em disco do script de instalação do Cursor e, por fim, por um ID de build fixado. Substitua com
`CURSOR_AGENT_CLI_VERSION` quando necessário.

## Fallback: importação manual de tokens

Se não for possível concluir o login pelo navegador:

1. No host, extraia os tokens do `state.vscdb` do Cursor:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Abra **Importar token** no modal de autenticação do Cursor.
3. Cole o **Token de acesso** e, quando disponível, o **Token de atualização** (necessário para
   a atualização automática). O ID da máquina é opcional.

As importações somente do token de acesso ainda funcionam, mas expiram sem um token de atualização —
reimporte quando o chat retornar erros de autenticação.

## Relacionados

- Orientações sobre o Zed no Docker: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Referência de login do Cursor no OpenCodex (externa):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
