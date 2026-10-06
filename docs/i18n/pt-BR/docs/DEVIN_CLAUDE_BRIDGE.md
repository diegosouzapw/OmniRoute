# Devin Claude Bridge (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../DEVIN_CLAUDE_BRIDGE.md) · 🇪🇹 [am](../../am/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇦 [ar](../../ar/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇿 [az](../../az/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇬 [bg](../../bg/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇩 [bn](../../bn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇦 [bs](../../bs/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇿 [cs](../../cs/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇰 [da](../../da/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇪 [de](../../de/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇷 [el](../../el/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇸 [es](../../es/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇪 [et](../../et/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇷 [fa](../../fa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇮 [fi](../../fi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇷 [fr](../../fr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇪 [ga](../../ga/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [gu](../../gu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ha](../../ha/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇱 [he](../../he/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [hi](../../hi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇷 [hr](../../hr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇺 [hu](../../hu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇲 [hy](../../hy/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇩 [id](../../id/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ig](../../ig/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇹 [it](../../it/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇯🇵 [ja](../../ja/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇪 [ka](../../ka/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇭 [km](../../km/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [kn](../../kn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇷 [ko](../../ko/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇹 [lt](../../lt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇻 [lv](../../lv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ml](../../ml/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [mr](../../mr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇾 [ms](../../ms/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇹 [mt](../../mt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇲 [my](../../my/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇵 [ne](../../ne/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇱 [nl](../../nl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇴 [no](../../no/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [or](../../or/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [pa](../../pa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇭 [phi](../../phi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇱 [pl](../../pl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇹 [pt](../../pt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇴 [ro](../../ro/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇺 [ru](../../ru/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇰 [si](../../si/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇰 [sk](../../sk/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇮 [sl](../../sl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇸 [sr](../../sr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇪 [sv](../../sv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇪 [sw](../../sw/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ta](../../ta/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [te](../../te/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇭 [th](../../th/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇷 [tr](../../tr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇰 [ur](../../ur/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇿 [uz](../../uz/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇻🇳 [vi](../../vi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [yo](../../yo/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVIN_CLAUDE_BRIDGE.md)

---

`devin-cli-agentic` permite que o runtime real do Claude Code use o endpoint local de
Messages da Anthropic do OmniRoute, enquanto a CLI oficial do Devin fornece respostas do modelo via ACP stdio. Ele
não modifica os provedores existentes Anthropic, Claude OAuth, Claude Web ou `devin-cli`.

> **Status atual: Claude Code fixado na versão `2.1.258`; a última validação offline e ao vivo foi registrada
> na versão `2.1.220`.** A versão fixada `2.1.220` concluiu três cenários isolados por meio da Devin CLI
> `3000.2.17` e do modelo `swe-1-7-lightning`; essa execução final ao vivo comprovou turnos de `Read`,
> `Edit` e `Bash` controlados pelo cliente, resultados bem-sucedidos de `npm test`, descoberta de comandos
> e habilidades do projeto, roteamento exclusivo pelo Devin e nenhuma saída para o Claude. A versão fixada foi então atualizada para `2.1.258`
> (a geração da CLI que a identidade Claude do OmniRoute representa e a primeira linha que inclui
> nativamente o nível Fable 5.1). Na nova versão fixada, a camada de instalação e `claude --version` foram
> verificadas na imagem base fixada, e a suíte de testes unitários da ponte, `compose config` e a
> prova de isolamento estático passam — mas o cenário simulado offline e a suíte de três cenários
> ao vivo ainda não foram executados novamente. Execute-os novamente (consulte "Atualização das ferramentas fixadas") antes de confiar na
> ponte com esta versão fixada.

## Arquitetura

```text
Claude Code 2.1.258 (contêiner Linux isolado sem privilégios de root)
  -> http://omniroute:20128/v1/messages
  -> devin-cli-agentic (formato Claude, provedor sem autenticação)
  -> devin acp --agent-type summarizer (ACP stdio oficial, sem ferramentas do Devin)
  -> Conta do Devin no volume dedicado devin-auth
```

O agente ACP padrão da CLI oficial pode executar suas próprias ferramentas, portanto esta ponte não o
utiliza. Ela inicia o agente ACP fixo `summarizer`, cujo modo oficial da CLI não possui ferramentas, e
estrutura a solicitação serializada da Anthropic como um rastreamento de execução. Quando outra ação
controlada pelo Claude é necessária, a resposta deve conter exatamente um envelope de ferramenta do cliente. Qualquer
`tool_call` ou `tool_call_update` do ACP é rejeitado antes que uma resposta possa ser considerada
bem-sucedida.

O serializador em `open-sse/executors/devin-agentic/serializer.ts` preserva `system`,
`text`, `tool_use`, `tool_result`, `thinking`, `redacted_thinking`, `tool_choice` e as
ferramentas fornecidas pelo Claude Code. Imagens e blocos desconhecidos falham explicitamente. Resultados extensos
de ferramentas usam um marcador de truncamento visível.

O analisador aceita um envelope `<tool>{...}</tool>` independente por turno do modelo. Ele verifica
o nome em relação à lista de ferramentas da solicitação, valida os argumentos em relação ao JSON
Schema dessa ferramenta, rejeita a combinação de narrativa e ações e permite uma tentativa limitada de correção. Em seguida, o Claude Code
executa localmente o `tool_use` resultante da Anthropic e envia o `tool_result` de volta por meio do
OmniRoute.

## Isolamento e modelo de ameaças

A instalação, a conta e a configuração do Claude no host estão fora do escopo e são tratadas como
proibidas. Os serviços do Compose:

- são executados como UID/GID `10001:10001`, com um sistema de arquivos raiz somente leitura, recursos removidos e
  `no-new-privileges`;
- usam um `/home/bridge` privado, um volume dedicado de configuração do Claude, dados isolados do OmniRoute
  e um volume `devin-auth` separado;
- montam apenas espaços de trabalho/evidências descartáveis em `.sandbox`;
- não montam o diretório inicial do host, Keychain, SSH, credenciais de nuvem ou o socket do Docker;
- constroem ambientes explícitos e removem variáveis de API/OAuth/roteamento da Anthropic;
- direcionam a inferência do Claude Code somente para `http://omniroute:20128` com uma chave exclusivamente local.

O perfil offline usa uma rede interna. No perfil ao vivo, o OmniRoute acessa os
endpoints oficiais do Devin somente por meio do `network-guard`; destinos não relacionados são negados.
O Claude Code possui uma proteção de saída separada que nega todo o tráfego e pode acessar apenas o serviço
OmniRoute local por meio de `NO_PROXY`. Os arquivos de auditoria das proteções são montados somente pelo respectivo processo
de proteção. Os scripts verificam a propriedade, o modo, a contagem de links dos arquivos e cada decisão antes de exportar
evidências sem tokens.

Execute a prova de isolamento de forma independente:

```bash
./scripts/devin-bridge/verify-anthropic-isolation
```

Ela valida a topologia, as montagens nomeadas, as configurações sem privilégios de root/somente leitura, o roteamento local
explícito, a ausência de variáveis de ambiente confidenciais, a ausência do socket do Docker, o acesso bloqueado a
`api.anthropic.com` e `claude.ai`, a seleção de provedor exclusiva do Devin e a falha explícita quando
o backend ACP está indisponível.

## Configuração inicial e uso normal

Crie a imagem fixada:

```bash
./scripts/devin-bridge/build
```

Autentique somente o volume isolado do Devin:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/login-devin
```

O comando de login usa o fluxo oficial de token manual destinado a ambientes remotos/em contêineres. O valor é inserido diretamente no prompt da CLI; ele não é passado como argumento de processo, gravado no Git nem copiado do host.

Inicie o runtime isolado do Claude Code:

```bash
./scripts/devin-bridge/launch
```

`launch` verifica novamente o isolamento, a autenticação do Devin e a descoberta de modelos antes de iniciar o Claude Code em contêiner. Ele nunca executa o executável do Claude presente no host. Os aliases de modelos podem ser definidos em `.env.devin-bridge`; cada valor configurado deve manter o prefixo `devin-cli-agentic/`.

## Comandos de validação

O fluxo offline reproduzível não requer uma conta do Devin e não possui acesso à Internet durante a execução:

```bash
./scripts/devin-bridge/test-unit
./scripts/devin-bridge/test-contract
./scripts/devin-bridge/test-e2e-mock
./scripts/devin-bridge/verify-anthropic-isolation
```

O fluxo online autenticado e opcional é:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/test-live-devin
```

O executor online aguarda entre os cenários para evitar a abertura de sessões ACP em sequência rápida e valida eventos estruturados do fluxo do Claude, em vez de confiar em alegações textuais. Seus três cenários comprovam:

1. leituras diretas do projeto e análise de defeitos;
2. uma operação `Edit` real, um `Bash` `npm test` controlado pelo cliente e um resultado final;
3. descoberta de `/bridge-check` e `bridge-proof`, leituras do projeto, outro `npm test` bem-sucedido controlado pelo cliente e conclusão sem trabalho pendente.

A verificação final também confere a auditoria de rede do Devin e exige que a auditoria de tráfego de saída do Claude permaneça vazia.

## Atualização das ferramentas fixadas

A imagem fixa as versões do Node, Claude Code e Devin CLI em `docker/devin-bridge/Dockerfile`. Para atualizar:

1. altere as versões explícitas;
2. substitua os checksums do arquivo do Devin específicos de ambas as arquiteturas pelos valores do artefato oficial;
3. recrie a imagem e execute todos os comandos de validação offline;
4. confirme as versões dentro da imagem;
5. execute novamente a suíte online autenticada de três cenários.

Não instale nenhuma das CLIs globalmente no host nem substitua a verificação de checksum por um download não verificado.

## Diagnóstico e limpeza

- `docker compose -f docker/devin-bridge/compose.yml --profile offline logs omniroute`
  exibe erros sanitizados do executor e do roteamento local.
- `.sandbox/evidence/mock-acp.jsonl` registra ações ACP simuladas e determinísticas.
- `.sandbox/evidence/claude-stream.jsonl` registra a execução offline real do Claude Code.
- `.sandbox/evidence/live-*.jsonl` registra os três fluxos online validados.
- `.sandbox/evidence/egress.jsonl` e `.sandbox/evidence/claude-egress.jsonl` são cópias validadas e sem tokens das auditorias de proteção.

Interrompa os contêineres e as redes pertencentes ao ambiente, preservando os volumes de login/configuração:

```bash
./scripts/devin-bridge/clean
```

Remova todo o ambiente pertencente à ponte, incluindo os volumes nomeados:

```bash
./scripts/devin-bridge/clean --all
```

## Limitações

- A ponte depende da função fixa `summarizer`, sem ferramentas, porque a Devin CLI `3000.2.17`
  não disponibiliza um agente ACP neutro sem ferramentas. O adaptador compensa as respostas
  intermediárias em formato de resumo, mas uma tentativa limitada de correção ainda pode falhar explicitamente.
- As chamadas ACP em produção podem retornar respostas transitórias `502`/`504`. O harness espaça os cenários;
  uma falha persistente permanece em modo de falha fechada e nunca seleciona outro provedor.
- O contexto ACP é reconstruído a partir de cada solicitação Anthropic; não há afinidade
  de processo/sessão.
- Há suporte para uma chamada de ferramenta por resposta do modelo; chamadas paralelas são rejeitadas.
- Imagens não são explicitamente suportadas. Recursos de visão, saída de raciocínio, controles de esforço e uma janela
  de contexto de 1M não são anunciados.
- O SSE usa eventos válidos do ciclo de vida da Anthropic, mas é emitido após a coleta do turno ACP limitado;
  os fragmentos ACP não são encaminhados de forma incremental.
