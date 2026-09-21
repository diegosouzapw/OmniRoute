# Devin Claude Bridge (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../DEVIN_CLAUDE_BRIDGE.md) · 🇪🇹 [am](../../am/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇦 [ar](../../ar/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇿 [az](../../az/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇬 [bg](../../bg/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇩 [bn](../../bn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇿 [cs](../../cs/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇰 [da](../../da/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇪 [de](../../de/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇷 [el](../../el/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇸 [es](../../es/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇪 [et](../../et/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇷 [fa](../../fa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇮 [fi](../../fi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇷 [fr](../../fr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇪 [ga](../../ga/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [gu](../../gu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ha](../../ha/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇱 [he](../../he/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [hi](../../hi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇷 [hr](../../hr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇺 [hu](../../hu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇲 [hy](../../hy/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇩 [id](../../id/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ig](../../ig/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇹 [it](../../it/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇯🇵 [ja](../../ja/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇪 [ka](../../ka/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇭 [km](../../km/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [kn](../../kn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇷 [ko](../../ko/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇹 [lt](../../lt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇻 [lv](../../lv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ml](../../ml/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [mr](../../mr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇾 [ms](../../ms/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇹 [mt](../../mt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇲 [my](../../my/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇵 [ne](../../ne/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇱 [nl](../../nl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇴 [no](../../no/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [or](../../or/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [pa](../../pa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇭 [phi](../../phi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇱 [pl](../../pl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇴 [ro](../../ro/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇺 [ru](../../ru/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇰 [si](../../si/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇰 [sk](../../sk/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇮 [sl](../../sl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇸 [sr](../../sr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇪 [sv](../../sv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇪 [sw](../../sw/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ta](../../ta/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [te](../../te/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇭 [th](../../th/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇷 [tr](../../tr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇰 [ur](../../ur/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇿 [uz](../../uz/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇻🇳 [vi](../../vi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [yo](../../yo/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVIN_CLAUDE_BRIDGE.md)

---

`devin-cli-agentic` permite que o runtime real do Claude Code utilize o endpoint local Anthropic
Messages do OmniRoute, enquanto a CLI oficial do Devin fornece respostas do modelo através de ACP stdio. Não
modifica os fornecedores existentes Anthropic, Claude OAuth, Claude Web ou `devin-cli`.

> **Estado atual: Claude Code fixado na versão `2.1.258`; última validação offline e em produção registada
> na versão `2.1.220`.** A versão fixada `2.1.220` concluiu três cenários isolados através da CLI do Devin
> `3000.2.17` e do modelo `swe-1-7-lightning`; essa execução final em produção comprovou interações `Read`,
> `Edit` e `Bash` controladas pelo cliente, resultados bem-sucedidos de `npm test`, deteção de comandos e
> competências do projeto, encaminhamento exclusivo para o Devin e ausência total de tráfego de saída para o Claude.
> A versão fixada foi depois atualizada para `2.1.258` (a geração da CLI cuja identidade do Claude é imitada pelo
> OmniRoute e a primeira linha que inclui nativamente o nível Fable 5.1). Na nova versão fixada, a camada de
> instalação e `claude --version` foram verificadas na imagem de base fixada, e o conjunto de testes unitários da
> ponte, `compose config` e a prova de isolamento estática são aprovados — mas o cenário simulado offline e o
> conjunto de três cenários em produção ainda não foram executados novamente. Execute-os novamente (consulte
> "Atualizar ferramentas fixadas") antes de utilizar a ponte com esta versão fixada.

## Arquitetura

```text
Claude Code 2.1.258 (contentor Linux isolado sem privilégios de root)
  -> http://omniroute:20128/v1/messages
  -> devin-cli-agentic (fornecedor no formato Claude, sem autenticação)
  -> devin acp --agent-type summarizer (ACP stdio oficial, sem ferramentas do Devin)
  -> Conta Devin no volume devin-auth dedicado
```

O agente ACP predefinido da CLI oficial pode executar as suas próprias ferramentas, pelo que esta ponte não o
utiliza. Inicia o agente ACP `summarizer` fixo, cujo modo da CLI oficial não possui ferramentas, e
enquadra o pedido Anthropic serializado como um rastreio de execução. Quando é necessária outra
ação controlada pelo Claude, a resposta tem de conter exatamente um envelope de ferramenta do cliente. Qualquer
`tool_call` ou `tool_call_update` do ACP é rejeitado antes de uma resposta poder ser considerada
bem-sucedida.

O serializador em `open-sse/executors/devin-agentic/serializer.ts` preserva `system`,
`text`, `tool_use`, `tool_result`, `thinking`, `redacted_thinking`, `tool_choice` e as
ferramentas fornecidas pelo Claude Code. Imagens e blocos desconhecidos falham explicitamente. Resultados de
ferramentas extensos utilizam um marcador de truncagem visível.

O analisador aceita um envelope `<tool>{...}</tool>` autónomo por interação do modelo. Verifica
o nome relativamente à lista de ferramentas do pedido, valida os argumentos em relação ao JSON
Schema dessa ferramenta, rejeita a combinação de narrativa e ações e permite uma tentativa de correção limitada. Em seguida,
o Claude Code executa localmente o `tool_use` Anthropic resultante e envia o `tool_result` de volta através
do OmniRoute.

## Isolamento e modelo de ameaças

A instalação, a conta e a configuração do Claude no anfitrião estão fora do âmbito e são consideradas
proibidas. Os serviços do Compose:

- são executados com UID/GID `10001:10001`, com um sistema de ficheiros raiz só de leitura, capacidades removidas e
  `no-new-privileges`;
- utilizam um `/home/bridge` privado, um volume de configuração do Claude dedicado, dados isolados do OmniRoute
  e um volume `devin-auth` separado;
- montam apenas espaços de trabalho/provas `.sandbox` descartáveis;
- não montam o diretório pessoal do anfitrião, o Keychain, credenciais SSH, credenciais de serviços na nuvem ou o socket do Docker;
- constroem ambientes explícitos e removem variáveis de API/OAuth/encaminhamento do Anthropic;
- encaminham a inferência do Claude Code apenas para `http://omniroute:20128`, com uma chave exclusivamente local.

O perfil offline utiliza uma rede interna. No perfil em produção, o OmniRoute acede aos
endpoints oficiais do Devin apenas através de `network-guard`; destinos não relacionados são recusados.
O Claude Code possui um mecanismo de proteção de tráfego de saída separado que recusa tudo e só consegue aceder ao serviço
OmniRoute local através de `NO_PROXY`. Os ficheiros de auditoria dos mecanismos de proteção são montados apenas pelos
respetivos processos. Os scripts verificam a propriedade, o modo, a contagem de ligações e cada decisão dos ficheiros antes de
exportarem provas sem tokens.

Execute a prova de isolamento de forma independente:

```bash
./scripts/devin-bridge/verify-anthropic-isolation
```

Valida a topologia, as montagens com nome, as definições de execução sem privilégios de root/só de leitura, o encaminhamento local
explícito, a ausência de variáveis de ambiente sensíveis, a ausência do socket do Docker, o acesso bloqueado a
`api.anthropic.com` e `claude.ai`, a seleção exclusiva do fornecedor Devin e a falha explícita quando
o backend ACP não está disponível.

## Configuração inicial e utilização normal

Crie a imagem fixada:

```bash
./scripts/devin-bridge/build
```

Autentique apenas o volume isolado do Devin:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/login-devin
```

O comando de início de sessão utiliza o fluxo oficial de token manual destinado a ambientes
remotos/de contentor. O valor é introduzido diretamente no pedido da CLI; não é passado como
argumento de processo, guardado no Git nem copiado a partir do anfitrião.

Inicie o ambiente de execução isolado do Claude Code:

```bash
./scripts/devin-bridge/launch
```

`launch` volta a verificar o isolamento, a autenticação do Devin e a deteção de modelos antes
de iniciar o Claude Code em contentor. Nunca executa o ficheiro executável do Claude no
anfitrião. Os aliases dos modelos podem ser definidos em `.env.devin-bridge`; todos os valores
configurados têm de manter o prefixo `devin-cli-agentic/`.

## Comandos de validação

O fluxo offline reproduzível não requer uma conta Devin e não tem acesso à Internet durante a execução:

```bash
./scripts/devin-bridge/test-unit
./scripts/devin-bridge/test-contract
./scripts/devin-bridge/test-e2e-mock
./scripts/devin-bridge/verify-anthropic-isolation
```

O fluxo autenticado em produção, de adesão explícita, é:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/test-live-devin
```

O executor em produção aguarda entre cenários para evitar abrir sessões ACP em rajada e
valida eventos estruturados do fluxo do Claude em vez de confiar em afirmações textuais. Os
três cenários demonstram:

1. leituras diretas do projeto e análise de defeitos;
2. uma operação `Edit` real, uma operação `Bash` `npm test` detida pelo cliente e um resultado final;
3. deteção de `/bridge-check` e `bridge-proof`, leituras do projeto, outra execução bem-sucedida
   de `npm test` detida pelo cliente e conclusão sem trabalho pendente.

A verificação final também verifica a auditoria de rede do Devin e exige que a auditoria de
saída do Claude permaneça vazia.

## Atualização das ferramentas fixadas

A imagem fixa o Node, o Claude Code e a Devin CLI em
`docker/devin-bridge/Dockerfile`. Para atualizar:

1. altere as versões explícitas;
2. substitua ambas as somas de verificação do arquivo do Devin, específicas de cada arquitetura, por valores do artefacto
   oficial;
3. reconstrua e execute todos os comandos de validação offline;
4. confirme as versões dentro da imagem;
5. volte a executar o conjunto autenticado de três cenários em produção.

Não instale nenhuma das CLI globalmente no anfitrião nem substitua a verificação da soma de
verificação por uma transferência não verificada.

## Diagnóstico e limpeza

- `docker compose -f docker/devin-bridge/compose.yml --profile offline logs omniroute`
  apresenta o encaminhamento local e os erros saneados do executor.
- `.sandbox/evidence/mock-acp.jsonl` regista ações ACP simuladas e determinísticas.
- `.sandbox/evidence/claude-stream.jsonl` regista a execução offline real do Claude Code.
- `.sandbox/evidence/live-*.jsonl` regista os três fluxos em produção validados.
- `.sandbox/evidence/egress.jsonl` e `.sandbox/evidence/claude-egress.jsonl` são cópias validadas,
  sem tokens, das auditorias de controlo.

Pare os contentores e as redes sob gestão, preservando os volumes de início de sessão/configuração:

```bash
./scripts/devin-bridge/clean
```

Remova o ambiente completo sob gestão da bridge, incluindo os volumes com nome:

```bash
./scripts/devin-bridge/clean --all
```

## Limitações

- A ponte depende da função fixa `summarizer`, sem ferramentas, porque a Devin CLI `3000.2.17`
  não disponibiliza um agente ACP neutro sem ferramentas. O adaptador compensa as respostas
  intermédias em formato de resumo, mas uma reparação limitada ainda pode falhar explicitamente.
- As chamadas ACP em tempo real podem devolver respostas `502`/`504` transitórias. O mecanismo
  de testes intervala os cenários; uma falha persistente mantém o comportamento de falha segura
  e nunca seleciona outro fornecedor.
- O contexto ACP é reconstruído a partir de cada pedido Anthropic; não existe afinidade de
  processo/sessão.
- É suportada uma chamada de ferramenta por resposta do modelo; as chamadas paralelas são
  rejeitadas.
- As imagens não são explicitamente suportadas. A visão, os resultados de raciocínio, os
  controlos de esforço e uma janela de contexto de 1M não são anunciados.
- O SSE utiliza eventos válidos do ciclo de vida Anthropic, mas é emitido depois de o turno ACP
  limitado ser recolhido; os fragmentos ACP não são reencaminhados de forma incremental.
