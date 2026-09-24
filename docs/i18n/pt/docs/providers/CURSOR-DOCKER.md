# Cursor Provider in Docker Environments (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Quando o OmniRoute é executado dentro do Docker, os fluxos legados **Importar do Cursor IDE** /
`cursor-agent` falham porque o contentor não consegue ver a instalação do Cursor
no anfitrião. Em vez disso, utilize **Iniciar sessão com o Cursor** (PKCE de deep-control).

## Porque é que a importação do IDE / CLI falha no Docker

1. **Isolamento do sistema de ficheiros** — A importação automática procura caminhos Linux, como
   `~/.config/Cursor/User/globalStorage/state.vscdb`, _dentro_ do contentor.
   No Docker Desktop para macOS, a base de dados do IDE no anfitrião não é montada por predefinição, e
   o sistema operativo do contentor é Linux, mesmo quando o anfitrião é Darwin.
2. **Ausência do binário `cursor-agent`** — As imagens oficiais do OmniRoute não incluem
   `cursor-agent`. Anteriormente, a opção Modelos disponíveis executava
   `cursor-agent --list-models` e recorria a um catálogo estático como alternativa.
3. **Binário incorreto** — **Não** monte por associação um `cursor-agent` do macOS num contentor
   Linux. Este não será executado.

## Recomendado: Iniciar sessão com o Cursor

1. Abra **Painel → Fornecedores → Cursor**.
2. Escolha o separador **Iniciar sessão com o Cursor**.
3. Clique em **Iniciar sessão com o Cursor** — o OmniRoute abre
   `https://cursor.com/loginDeepControl?…` no navegador do **anfitrião**.
4. Aprove o início de sessão no navegador e, em seguida, regresse ao painel. O OmniRoute
   consulta `api2.cursor.sh/auth/poll` até receber os tokens.
5. O OmniRoute armazena os tokens de **acesso + atualização** e atualiza-os através de
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Este método não requer o Cursor IDE nem o `cursor-agent` dentro do contentor.

## Deteção de modelos

Com uma ligação autenticada, **Modelos disponíveis / Sincronização automática** dá preferência ao
catálogo HTTP `AiService/AvailableModels` do Cursor, utilizando o token bearer da ligação.
Se isso falhar, o OmniRoute ainda tenta utilizar o `cursor-agent` do anfitrião (quando presente) e,
por fim, o catálogo estático inicial.

O OmniRoute disponibiliza sempre **`auto`** no catálogo (apresentado como “Auto”), além
dos modos de encaminhamento ao estilo do OpenCodex **`auto-cost`**, **`auto-balance`** e
**`auto-intelligence`**. Na comunicação, estes correspondem ao modelo `default` do Cursor
(com um `optimization` ModelParameter para as três variantes). Dê preferência a
`cu/auto` quando os modelos premium tiverem esgotado a utilização — o Auto muitas vezes ainda tem orçamento.

### O catálogo em tempo real é exclusivo quando está sincronizado

Após uma sincronização bem-sucedida dos modelos do Cursor (`cursor-agent --list-models` → catálogo
sincronizado persistido, ou a obtenção de `AvailableModels` autenticada por bearer acima), o
**painel**, **`/v1/models`** e **Testar todos** apresentam:

1. Modelos devolvidos pela sincronização em tempo real
2. IDs de encaminhamento automático injetados: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Modelos **personalizados** do operador (Importação / manual) — nunca removidos pela sincronização

O extenso catálogo estático em
`open-sse/config/providers/registry/cursor/` destina-se **apenas à contingência offline**. Quando
a sincronização está vazia (ou a deteção falha), a listagem recorre a esse catálogo.

Os IDs com sufixo de esforço (por exemplo, `claude-4.6-sonnet-high`) ainda podem ser
**solicitados** em tempo de execução: `resolveRequestedModel` remove o sufixo e converte-o num
`ModelParameter` para transmissão. A listagem exclusiva oculta intencionalmente essas variantes estáticas
de Testar todos, para que as sondagens correspondam ao que o Cursor efetivamente devolve como disponível.

### Auxiliares

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — combinação no painel
- `ensureCursorAutoCatalogEntry` — injeção de auto* na deteção + listagem
- `shouldSuppressStaticModelForExclusiveListing` — ciclo estático de `/v1/models`

## Limites do fornecedor (quota)

**Utilização → Limites do fornecedor** para o Cursor utiliza APIs Bearer em `api2.cursor.sh`
(`GetCurrentPeriodUsage` → resumo de utilização → auth/usage) após PKCE ou importação
de tokens. O método legado do painel baseado em cookies/`cursor.com` permanece como último recurso
para sessões mais antigas importadas do IDE.

As janelas normalmente incluem **Total**, **Auto + Composer** e **API**. Se
os limites aparecerem vazios, execute novamente **Iniciar sessão com o Cursor** ou volte a importar os tokens (a importação
apenas a partir do IDE já não é necessária).

## Respostas vazias / utilização esgotada

Quando o Cursor aceita uma execução, mas não devolve texto do assistente (algo comum quando a utilização
premium está esgotada), o OmniRoute apresenta um erro **429** acionável (indícios de quota) ou
**502** com orientações — e não apenas “O fornecedor devolveu conteúdo vazio”. As falhas
de transmissão, como `not_found: AI Model Not Found` (janela de utilização esgotada), são
classificadas como **limite de taxa / utilização do Cursor excedida** e mantêm essa mensagem
ao longo do pipeline SSE (a proteção partilhada contra fluxos vazios não substitui um erro
já emitido). Verifique os Limites do fornecedor, experimente o modelo **`auto`** ou aumente
os limites do plano Cursor.

## Versão do cliente (sem interface)

Sem uma instalação local do `cursor-agent`, o OmniRoute determina
`x-cursor-client-version` através da variável de ambiente `CURSOR_AGENT_CLI_VERSION`, depois através de uma extração
do script de instalação do Cursor armazenada em cache no disco e, por fim, através de um ID de compilação fixado. Substitua-a
por `CURSOR_AGENT_CLI_VERSION` quando necessário.

## Alternativa: importação manual de tokens

Se não conseguir concluir o início de sessão no navegador:

1. No anfitrião, extraia os tokens do `state.vscdb` do Cursor:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Abra **Importar token** na janela de autenticação do Cursor.
3. Cole o **Token de acesso** e, quando disponível, o **Token de atualização** (necessário para
   a atualização automática). O ID da máquina é opcional.

As importações apenas com o token de acesso continuam a funcionar, mas expiram sem um token de atualização —
volte a importar quando o chat devolver erros de autenticação.

## Relacionado

- Orientações sobre o Zed no Docker: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Referência externa do início de sessão do Cursor no OpenCodex:
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
