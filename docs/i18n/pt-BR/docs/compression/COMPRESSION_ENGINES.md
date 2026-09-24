# Compression Engines (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

A compactação do OmniRoute é estruturada em torno de contratos de mecanismos. Um modo pode executar um mecanismo diretamente
(`caveman` ou `rtk`) ou um pipeline empilhado determinístico que executa vários mecanismos em ordem.

## Modos

| Modo | Caminho do motor  
| Entrada pretendida |
| ------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `off` | nenhum | Preservação exata do prompt |
| `lite` | Ajudantes Caveman lite | Limpeza de baixo risco sempre ativa |
| `standard` | Caveman | Condensação de prompt em linguagem natural |
| `aggressive` | Caveman + sumarizadores de histórico/ferramentas | Sessões de chat longas |
| `ultra` | Caveman + ajudantes de poda | Recuperação de limite de contexto |
| `rtk` | RTK | Saída de terminal, shell, build, teste e git |
| `omniglyph` | OmniGlyph | Contexto como imagem no provedor nativo |
| `stacked` | Pipeline. O padrão da requisição é `session-dedup -> lite`. `rtk -> caveman` é opcional. | Logs de ferramentas mistos e prosa, economia máxima |

### Perfis de compressão OmniGlyph

O motor `omniglyph` (pacote `omniglyph`, 1.4.0+) aceita um perfil semântico nomeado, definido
globalmente através de `omniglyph.profile` nas configurações de compressão ou por etapa através da
configuração de etapa do pipeline empilhado:

| Perfil        | Limite                                                                                                                 |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Padrão. A política que os recibos publicados mediram — sistema de imagens, documentos de ferramentas e histórico denso |
| `balanced`    | Mantém o estado nativo, protege as últimas 8 rodadas, colapsa o histórico fechado mais antigo                          |
| `coding-safe` | Mantém a autoridade, esquemas de ferramentas e saída de ferramentas nativas, protege as últimas 12 rodadas             |
| `passthrough` | Roteia sem transformar; o motor é ignorado                                                                             |

O perfil é um **teto, não um piso**: `mergeCompressionProfileOptions` no pacote
recusa-se a permitir que um chamador substitua e reabra uma via com perdas que o perfil fechou, então um
`preserveSystemPrompt: false` por etapa não pode reativar a compressão do sistema sob `coding-safe`.

Medido nesta base de código: `coding-safe` e `balanced` elevam `minCompressChars` ao seu
máximo e mantêm o sistema, esquemas de ferramentas e resultados de ferramentas nativos, então uma sessão que não
acumulou histórico ainda para em `below_min_chars` e o motor não transforma nada. É
por isso que o padrão é `aggressive` em vez do perfil mais seguro.

O pacote resolve seu próprio escopo de modelo e perfil a partir de sua configuração de ambiente.
OmniRoute nunca delega a decisão: o adaptador fixa o gate do modelo ao
escopo mais restritivo do pacote, então as configurações do ambiente host só podem
estreitar a lista de permissões, nunca ampliá-la além dos recibos medidos do OmniRoute.

## Registro de engines

O registro está localizado em `open-sse/services/compression/engines/registry.ts`. Os engines expõem um
contrato compartilhado:

- `id`: ID estável do engine, como `caveman` ou `rtk`
- `apply(text, config)`: caminho de execução legado usado por pipelines empilhados
- `compress(input, config)`: caminho de execução principal que retorna texto + estatísticas
- `getConfigSchema()`: retorna a estrutura semelhante a JSON Schema da configuração válida
- `validateConfig(config)`: retorna `{ valid, errors[] }`

O registro usa `registerCompressionEngine(engine)` (ou `registerEngine` para casos avançados),
que chama `assertValidEngine()` e `validateConfig(defaultConfig)` antes de aceitar.
Use `unregisterCompressionEngine(id)` para remover um engine em tempo de execução.

`strategySelector.ts` registra os engines integrados antes da execução da compactação. Isso permite que a pré-visualização,
a compactação em tempo de execução, o modo empilhado, os testes e futuros engines usem o mesmo caminho de execução.

### Compactação de descrições MCP (relacionado)

Um registro separado compacta os metadados de descrição das ferramentas MCP no nível do registro — consulte
`open-sse/mcp-server/descriptionCompressor.ts` e [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Ele reutiliza
as regras do Caveman, mas opera nos metadados das ferramentas, não nos payloads das requisições.

### Engines integrados adicionais

Além de Caveman, RTK e LLMLingua-2, o registro inclui vários engines especializados sem perdas /
estruturais (usados por pipelines empilhados, pelo playground e por testes):

| Engine        | Id              | O que faz                                                                                                                                                                                                         |
| ------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): substitui grandes blocos contíguos de texto por referências endereçadas por conteúdo, de modo que blocos repetidos/grandes sejam enviados uma vez e referenciados posteriormente. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): compactação tabular sem perdas de payloads de arrays JSON homogêneos em um formato colunar `[N rows]`.                                                                                    |
| ionizer       | `ionizer`       | Amostragem de linhas do início/meio/fim para blocos homogêneos muito grandes, armazenando o meio omitido como uma referência CCR endereçada por conteúdo.                                                         |
| session-dedup | `session-dedup` | Desduplicação entre turnos endereçada por conteúdo (inspirada no TokenMizer): omite texto já visto em turnos anteriores da mesma sessão.                                                                          |

**Instrução do protocolo de recuperação do CCR (#8033):** na primeira vez em que o CCR substitui ≥1 bloco em uma
requisição, o engine adiciona no início uma única mensagem `system` idempotente (começando com a sentinela
`[CCR protocol]`) que ensina ao chamador o contrato entre marcador e ferramenta: o que significa um marcador
`[CCR retrieve hash=<24hex> chars=N]`, que o hash deve ser copiado literalmente
(todos os 24 caracteres hexadecimais — hashes copiados incorretamente são a causa provável de erros
"block not found") e que um marcador `[dedup:ref sha=...]` significa "consultar o histórico", não "chamar a
ferramenta". A observação é injetada **somente quando o `tools[]` anunciado pelo chamador comprova que ele consegue
realmente acessar `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` em
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — um chamador comum
compatível com OpenAI sem essa ferramenta nunca recebe uma instrução para chamar algo que
não consegue acessar. A idempotência é garantida pela verificação do histórico de mensagens em busca da sentinela
antes da injeção, de modo que requisições com vários turnos (que reproduzem mensagens anteriores) não acumulem a
observação uma vez por turno.

## Caveman

O modo Caveman concentra-se na condensação semântica de prosa comum:

- preserva blocos de código, URLs, JSON, caminhos e dados estruturados
- remove conteúdo supérfluo, ressalvas, contexto repetido e frases de ligação verbosas
- oferece suporte a conjuntos de regras de arquivo específicos por idioma em `open-sse/services/compression/rules/`
- continua disponível por meio dos modos legados `standard`, `aggressive` e `ultra`

A interface no painel é `Dashboard -> Context & Cache -> Caveman`.

O projeto upstream do Caveman relata `~75%` menos tokens de saída, uma economia média de `65%` na saída em benchmarks,
com uma faixa de `22-87%`, e uma ferramenta de compressão de entrada de `~46%`. O OmniRoute usa o valor de entrada
do Caveman ao documentar economias combinadas de prompt/contexto; o modo de saída do Caveman continua sendo um recurso
separado de comportamento da resposta.

## RTK

O modo RTK concentra-se na saída de comandos e ferramentas:

- detecta classes de saída como `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  testes do Cargo/Go, builds do TypeScript/Vite/Webpack, ESLint, auditorias/instalações do npm, logs do Docker,
  `find`/`grep` do shell, rastreamentos de pilha e logs genéricos
- aplica 49 filtros JSON de `open-sse/services/compression/engines/rtk/filters/`
- oferece suporte ao pipeline declarativo no estilo do RTK: remoção de ANSI, substituição, interrupção antecipada por correspondência da saída,
  remoção/manutenção de linhas, truncamento por linha, truncamento de início/fim/máximo de linhas e fallback quando vazio
- oferece suporte a filtros de projeto condicionados à confiança em `.rtk/filters.json` e filtros globais em
  `DATA_DIR/rtk/filters.json`
- remove sequências ANSI, ruído de progresso, linhas repetidas e texto padronizado sem utilidade
- preserva falhas acionáveis, avisos, resumos, arquivos alterados e contexto final
- pode, opcionalmente, reter a saída bruta com dados sensíveis removidos para recuperação/depuração por meio de rotas
  autenticadas de gerenciamento

A interface no painel é `Dashboard -> Context & Cache -> RTK`.

Os detalhes operacionais sobre filtros personalizados, confiança, verificação e recuperação da saída bruta estão em
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

O projeto upstream do RTK relata uma economia de `60-90%` na compressão de saídas de comandos. O exemplo no README mostra uma
sessão de 30 minutos do Claude Code passando de `~118,000` tokens para `~23,900`, ou uma economia de `79.7%`.

## LLMLingua-2 (Poda Semântica)

O modo LLMLingua-2 realiza **poda semântica de tokens** em prosa usando um pequeno classificador
de tokens ONNX, complementando os mecanismos Caveman e RTK baseados em regras:

- comprime a prosa apenas em mensagens que não sejam do sistema; blocos de código delimitados e outras estruturas
  preservadas nunca são alterados
- executa o backend `@atjsh/llmlingua-2` (ONNX por meio de `@huggingface/transformers`) em uma
  thread de trabalho, para que a inferência do modelo nunca bloqueie o loop de eventos da solicitação
- é **combinável** (`stackPriority` 35): em um pipeline combinado, é executado depois dos
  mecanismos estruturais (CCR, session-dedup, headroom, Caveman), mas antes de `ultra`, pois
  a poda semântica é mais eficaz em texto que já passou por compressão estrutural — por exemplo,
  `rtk -> caveman -> llmlingua`
- **prossegue sem falhar em qualquer erro** (dependências opcionais ausentes, criação do worker, carregamento do modelo, inferência
  ou tempo limite) → o texto original é retornado sem alterações, nunca um erro

Localização do mecanismo: `open-sse/services/compression/engines/llmlingua/`. A interface no painel
é `Dashboard -> Context & Cache -> LLMLingua`.

### Modelos

O modelo padrão é o **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
rápido). Um modelo **BERT-base** de maior precisão (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) está disponível por meio do campo `model` da configuração do mecanismo. `@huggingface/transformers`
baixa o modelo selecionado sob demanda do HuggingFace Hub para
`${DATA_DIR}/models/llmlingua` na primeira chamada (`modelStore.ts`); uma substituição pela configuração
`modelPath` aponta para uma cópia local (instalações offline / isoladas da rede).

### Dependências opcionais e instalação sob demanda

A pilha de peers do runtime removível do LLMLingua é **opcional**. Dois pacotes são declarados como
`optionalDependencies` em `package.json` e mantidos como **externos** pelo build de produção
(`scripts/build/prepublish.ts` não os inclui no bundle):

| Pacote               | Versão (fixada) | Observações                                     |
| -------------------- | --------------- | ----------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`         | Pacote de entrada; declara os demais como peers |
| `js-tiktoken`        | `^1.0.20`       | Tokenizador                                     |

`@huggingface/transformers` está fixado em `^4.2.0` (compartilhado com o caminho de embeddings locais e
também rastreado no bundle independente); `@atjsh/llmlingua-2@2.0.5` o declara como peer com
`"^3.5.2 || ^4.0.0"`, portanto há suporte tanto para Transformers.js v3 quanto para v4. Desde a versão 2.0.4,
`@atjsh/llmlingua-2` não exige mais `@tensorflow/tfjs`, o que removeu da pilha SLM seu maior
componente individual (TensorFlow.js). Apenas os dois pacotes acima são peers SLM removíveis.
Um `npm install` padrão (desenvolvimento) instala a pilha opcional automaticamente, a menos que as dependências
opcionais sejam omitidas.

**Por que sob demanda:** o pacote publicado no npm, o bundle independente e a imagem Docker
são distribuídos **sem** essas dependências para permanecerem enxutos. Quando elas estão ausentes, a verificação
de dependências do worker (uma sondagem de resolução de `@atjsh/llmlingua-2` em `worker.ts`) falha, e o mecanismo
**prossegue silenciosamente sem falhar** — selecionar o LLMLingua não produz efeito (o texto é retornado sem alterações e nenhum
erro é registrado). Para ativá-lo em um ambiente reduzido, instale a pilha opcional:

```bash
# fixe nas versões declaradas em optionalDependencies de package.json
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

A remoção de `@tensorflow/tfjs` (2.0.4+) elimina o componente anteriormente dominante de ~800 MB
— o espaço restante é ocupado pelos runtimes do transformers.js + onnxruntime-node,
além do modelo TinyBERT (~57 MB), baixado no primeiro uso (não por meio do npm).

Por ambiente:

- **Desenvolvimento / `npm install`** — instalado automaticamente, a menos que você tenha usado `--omit=optional`
  (ou `--no-optional`). Nenhuma ação necessária.
- **npm global (`npm i -g omniroute`) / autônomo** — execute o comando de instalação acima dentro
  do diretório do pacote instalado ou reinstale sem omitir as dependências opcionais.
- **Docker** — adicione o comando de instalação em uma camada de imagem derivada; a imagem publicada
  é distribuída de forma enxuta por design.
- **VPS (PM2)** — instale no `node_modules` do aplicativo e reinicie o processo para que o
  worker verifique novamente o gate.
- **Next autônomo bruto (`npm run build` → `.build/next/standalone/server.js`)** — o
  rastreamento autônomo não inclui NEM o worker NEM as dependências opcionais, portanto o mecanismo
  silenciosamente permite a execução em caso de falha. `scripts/build/colocate-standalone.mjs` reaplica ambos (esbuild do worker +
  fechamento das dependências opcionais na árvore autônoma); ele é executado automaticamente por meio do
  hook `postbuild` do npm após cada build. Idempotente e tolerante a falhas quando as dependências estão ausentes.

**Verifique se está ativo:** com o LLMLingua selecionado, textos reais de fato são reduzidos (o mecanismo
deixa de permitir a execução em caso de falha), e a primeira solicitação aciona o download do modelo para
`${DATA_DIR}/models/llmlingua`. O gate verifica intencionalmente apenas `@atjsh/llmlingua-2` —
os outros peers são exclusivos de ESM, e `require.resolve` gera um erro para eles mesmo quando estão presentes — portanto,
o worker ainda permite a execução em caso de falha se algum peer estiver realmente ausente no momento do `import()`.

## Pipelines empilhados

O modo empilhado executa as etapas do pipeline em ordem. O padrão é:

```txt
rtk -> caveman
```

Use isso em sessões de agentes de programação nas quais um prompt combina a saída de comandos com texto em linguagem natural produzido por uma pessoa ou pelo assistente. O RTK reduz primeiro os logs ruidosos das ferramentas; depois, o Caveman comprime a linguagem natural restante.

As etapas do pipeline são configuradas com `stackedPipeline` nas configurações de compactação ou por meio de combinações de compactação.

Quando ambos os mecanismos reduzem a mesma carga qualificada, a economia é composta:

```txt
combinada = 1 - (1 - economia do RTK) * (1 - economia de entrada do Caveman)
média     = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
intervalo = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Filtro da árvore de acessibilidade do MCP

O filtro inteligente da árvore de acessibilidade do MCP é uma camada de compactação pós-execução que atua nos **resultados de ferramentas** do MCP, não nos prompts nem no contexto. Ele processa as cargas extensas de árvores de acessibilidade e snapshots do navegador retornadas por ferramentas como Playwright, computer-use e servidores MCP de automação de navegador.

### O que ele faz

1. **Remoção de ruído** — remove entradas genéricas/de texto vazias (`- generic:`, `- text: ""`)
2. **Agrupamento de elementos irmãos** — quando ≥ `collapseThreshold` (padrão: 30) linhas consecutivas são repetições estruturais, agrupa-as nas primeiras `collapseKeepHead` (padrão: 10) linhas + um resumo da contagem + as últimas `collapseKeepTail` (padrão: 5) linhas
3. **Preservação de referências** — as âncoras `[ref=eXX]` exigidas pelo Playwright/computer-use nunca são alteradas
4. **Truncamento rígido** — se o texto após o agrupamento ainda exceder `maxTextChars` (padrão: 50.000), ele será truncado com uma dica de navegação para que o agente possa continuar trabalhando

### Localização do mecanismo

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← ponto de entrada smartFilterText()
  collapseRepeated.ts ← algoritmo de agrupamento de elementos irmãos
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Configuração

Controlado por `compression.mcpAccessibility` nas configurações globais (migração 056). Configuração padrão:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

O filtro é aplicado somente às cargas de resultados de ferramentas cujo `type` seja `"text"` e cujo comprimento exceda `minLengthToProcess`. Ele não afeta a compactação de prompts nem as cargas das solicitações.

### Economia esperada

De 60% a 80% nos resultados de ferramentas de snapshot do navegador, dependendo da complexidade da página. O algoritmo de agrupamento tem complexidade O(n) em relação ao número de linhas e acrescenta latência insignificante.

### Este filtro em comparação com os mecanismos de compactação acima

| Aspecto               | Caveman / RTK / Empilhado           | Filtro de acessibilidade do MCP        |
| --------------------- | ----------------------------------- | -------------------------------------- |
| Alvo                  | Prompts/contexto da solicitação     | Resultados de ferramentas do MCP       |
| Acionamento           | Configuração do modo de compactação | `compression.mcpAccessibility.enabled` |
| Escopo                | Todas as mensagens SSE              | Somente resultados de ferramentas      |
| Âncoras de referência | N/A                                 | Preservadas incondicionalmente         |

---

## Combos de compressão

Combos de compressão são perfis de compressão nomeados que podem ser atribuídos a combos de roteamento:

- `compression_combos`: armazena modo, pipeline, configuração do RTK, configuração de idioma e marcador padrão
- `compression_combo_assignments`: mapeia um combo de compressão para um combo de roteamento
- a integração em tempo de execução resolve um combo de compressão atribuído antes das substituições genéricas de combo
- as análises incluem `compression_combo_id` e `engine`

Área no dashboard: `Dashboard -> Context & Cache -> Compression Combos`.

## Superfície da API

| Rota                                   | Finalidade                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------------ |
| `/api/settings/compression`            | Configurações globais de compressão (inclui a configuração `mcpAccessibility`) |
| `/api/compression/preview`             | Visualizar qualquer modo de compressão                                         |
| `/api/compression/language-packs`      | Listar os pacotes de idioma Caveman disponíveis                                |
| `/api/context/caveman/config`          | Alias das configurações do Caveman                                             |
| `/api/context/rtk/config`              | Padrões e configurações do RTK                                                 |
| `/api/context/rtk/filters`             | Catálogo de filtros do RTK                                                     |
| `/api/context/rtk/test`                | Endpoint de visualização/teste do RTK                                          |
| `/api/context/rtk/raw-output/[id]`     | Recuperação autenticada da saída bruta com dados sensíveis ocultados           |
| `/api/context/combos`                  | CRUD de combos de compressão                                                   |
| `/api/context/combos/[id]/assignments` | CRUD de atribuições de combos de roteamento                                    |
| `/api/context/analytics`               | Alias das análises de compressão                                               |

As rotas de gerenciamento exigem autenticação de gerenciamento ou verificações de política de chave de API.

## Ferramentas MCP

A compressão disponibiliza cinco ferramentas MCP:

| Ferramenta                          | Escopo              | Finalidade                                      |
| ----------------------------------- | ------------------- | ----------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Configurações, análises e estatísticas de cache |
| `omniroute_compression_configure`   | `write:compression` | Atualizar configurações globais                 |
| `omniroute_set_compression_engine`  | `write:compression` | Definir modo e pipeline opcional                |
| `omniroute_list_compression_combos` | `read:compression`  | Listar combos de compressão                     |
| `omniroute_compression_combo_stats` | `read:compression`  | Consultar análises de combos/engines            |

## Escopo e exclusões

**Embeddings nunca são comprimidos.** `open-sse/handlers/embeddings.ts` nunca chama nenhum
engine de compressão — os corpos da solicitação/resposta são encaminhados diretamente ao executor sem alterações.
Atualmente, isso é estrutural (embeddings e conclusões de chat têm handlers separados), não uma
verificação em tempo de execução, mas significa que a preocupação com distorção de vetores em #8034 não tem superfície de exposição
no caminho de embeddings.

**Filtro de exclusão por modelo/endpoint (#8034).** Para conclusões de chat, um operador pode especificar
ids de modelo/alvos `provider/model` que nunca devem ser comprimidos — uma proteção útil caso
a compressão seja futuramente conectada mais perto de um caminho adjacente a embeddings e, em geral, útil
para qualquer modelo em que o prompt exato, byte por byte, seja importante (avaliações determinísticas, prefixos
sensíveis ao cache etc.).

- Campo de configuração: `exclusions?: string[]` na configuração global de compressão
  (`GET`/`PUT /api/settings/compression`), persistido por meio do namespace de compressão `key_value`
  existente (`src/lib/db/compression.ts`) — nenhuma tabela nova.
- Aba do dashboard: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Sintaxe dos padrões: `*` é o único curinga. Todos os demais metacaracteres de regex em um padrão são
  escapados antes da correspondência, de modo que `gpt-5.6` corresponde apenas à string literal, nunca a `gpt-5x6`
  (seguro contra ReDoS, limitado, sem quantificadores aninhados). Os padrões são comparados sem distinção entre maiúsculas e minúsculas
  tanto com o id simples do modelo quanto com o composto `provider/model` — `gpt-5-6`, `openai/gpt-5-6`
  e `openai/*` funcionam, e `*` sozinho exclui todos os modelos.
- Correspondência: `isCompressionExcluded()` / `normalizeCompressionExclusions()` em
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` verifica o alvo excluído
  logo após resolver as configurações de compressão, **antes da execução de qualquer engine**, e trata uma correspondência
  exatamente como se a compressão estivesse globalmente desabilitada — o corpo da solicitação é comprovadamente
  idêntico byte por byte. A omissão é registrada por meio de `writeCompressionSkip(..., "excluded")` para
  visibilidade nas análises.
- Padrão (lista vazia/ausente): idêntico ao comportamento anterior ao #8034 — nada é excluído.

## Limitações conhecidas

- **O LLMLingua-2 (SLM) exige dependências opcionais colocalizadas.** O worker só é executado em uma
  compilação de produção quando `@atjsh/llmlingua-2` + pares são colocalizados em
  `dist/node_modules` (consulte `scripts/build/colocateOptionals.mjs`, #4286). Sem eles, o
  mecanismo falha de forma aberta (retorna o texto original). A resolução do worker não depende mais de
  `import.meta.url` (isso falha no bundle independente) — ela se ancora no
  cwd / `argv[1]` do runtime.
- **Os pacotes de idiomas `de` / `fr` / `ja` do Caveman são parciais.** Eles incluem regras de `context` +
  `filler` + `structural`, mas não incluem pacotes `dedup` / `ultra`; portanto, a intensidade `ultra` não é
  mais forte que `full` para esses idiomas (eles usam apenas suas próprias regras — não há
  fallback silencioso para as regras `dedup`/`ultra` em inglês, que corromperiam textos em outros idiomas).
  `en` / `es` / `id` / `pt-BR` estão completos. Contribuições de `dedup.json` + `ultra.json`
  para os pacotes parciais são bem-vindas.
- **A telemetria empilhada lista apenas os mecanismos que realizaram compressão.** Uma etapa do pipeline empilhado cujo
  mecanismo foi executado, mas produziu 0 % de economia, retorna `stats:null` e, portanto, não aparece em
  `engineBreakdown` — não sendo possível distingui-la de uma etapa que foi ignorada. Distinguir
  "executada, 0 %" de "ignorada" exigiria uma alteração no modelo de detalhamento e foi adiado.

## Validação

Os "gates" focados para esta área são:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
