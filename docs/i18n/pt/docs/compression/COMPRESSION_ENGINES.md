# Compression Engines (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

A compressão do OmniRoute é estruturada em torno de contratos de motores. Um modo pode executar diretamente um motor
(`caveman` ou `rtk`) ou um pipeline empilhado determinístico que executa vários motores sequencialmente.

## Modos

| Modo         | Caminho do motor                               | Entrada prevista                                        |
| ------------ | ---------------------------------------------- | ------------------------------------------------------- |
| `off`        | nenhum                                         | Preservação exata do prompt                             |
| `lite`       | Auxiliares lite do Caveman                     | Limpeza permanente de baixo risco                       |
| `standard`   | Caveman                                        | Condensação de prompts em linguagem natural             |
| `aggressive` | Caveman + resumidores de histórico/ferramentas | Sessões de conversação longas                           |
| `ultra`      | Caveman + auxiliares de poda                   | Recuperação do limite de contexto                       |
| `rtk`        | RTK                                            | Saída de terminal, shell, compilação, testes e git      |
| `omniglyph`  | OmniGlyph                                      | Contexto como imagem no canal nativo do fornecedor      |
| `stacked`    | Pipeline, predefinição `rtk -> caveman`        | Registos mistos de ferramentas e prosa, poupança máxima |

### Perfis de compressão do OmniGlyph

O motor `omniglyph` (pacote `omniglyph`, 1.4.0+) aceita um perfil semântico com nome, definido
globalmente através de `omniglyph.profile` nas definições de compressão ou, por etapa, através da
configuração de etapas do pipeline empilhado:

| Perfil        | Limite                                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Predefinição. A política medida pelos recibos publicados — imagens do sistema, documentação de ferramentas e histórico denso       |
| `balanced`    | Mantém o estado ativo no formato nativo, protege os últimos 8 turnos e compacta o histórico fechado mais antigo                    |
| `coding-safe` | Mantém a autoridade, os esquemas de ferramentas e a saída ativa das ferramentas no formato nativo, protegendo os últimos 12 turnos |
| `passthrough` | Encaminha sem transformar; o motor é ignorado                                                                                      |

O perfil é um **limite máximo, não um limite mínimo**: `mergeCompressionProfileOptions` no pacote
impede que uma substituição feita pelo chamador reabra uma via com perdas que o perfil tenha fechado, pelo que uma definição
`preserveSystemPrompt: false` por etapa não pode reativar a compressão do sistema em `coding-safe`.

Segundo as medições nesta base de código: `coding-safe` e `balanced` elevam `minCompressChars` até ao seu
valor máximo e mantêm o sistema, os esquemas de ferramentas e os resultados das ferramentas no formato nativo, pelo que uma sessão que ainda não
tenha acumulado histórico termina em `below_min_chars` e o motor não transforma nada. É
por isso que a predefinição é `aggressive`, e não o perfil mais seguro.

O pacote determina o seu próprio âmbito de modelos e perfil a partir da respetiva configuração de ambiente.
O OmniRoute nunca delega essa decisão: o adaptador fixa o filtro de modelos ao âmbito mais
restritivo do pacote, pelo que as definições do ambiente anfitrião apenas podem restringir a lista de permissões, nunca
alargá-la para além dos recibos medidos do OmniRoute.

## Registo de Motores

O registo encontra-se em `open-sse/services/compression/engines/registry.ts`. Os motores expõem um
contrato comum:

- `id`: identificador estável do motor, como `caveman` ou `rtk`
- `apply(text, config)`: fluxo de execução legado utilizado por pipelines empilhados
- `compress(input, config)`: fluxo de execução principal que devolve texto + estatísticas
- `getConfigSchema()`: devolve a estrutura semelhante a JSON Schema da configuração válida
- `validateConfig(config)`: devolve `{ valid, errors[] }`

O registo utiliza `registerCompressionEngine(engine)` (ou `registerEngine` para casos avançados),
que chama `assertValidEngine()` e `validateConfig(defaultConfig)` antes de aceitar.
Utilize `unregisterCompressionEngine(id)` para remover um motor em tempo de execução.

`strategySelector.ts` regista os motores incorporados antes da execução da compressão. Isto permite que a pré-visualização,
a compressão em tempo de execução, o modo empilhado, os testes e os futuros motores utilizem o mesmo fluxo de execução.

### Compressão de descrições MCP (relacionada)

Um registo separado comprime os metadados das descrições das ferramentas MCP ao nível do registo — consulte
`open-sse/mcp-server/descriptionCompressor.ts` e [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Reutiliza
as regras do Caveman, mas opera sobre os metadados das ferramentas, não sobre os payloads dos pedidos.

### Motores incorporados adicionais

Além do Caveman, RTK e LLMLingua-2, o registo inclui vários motores especializados sem perdas /
estruturais (utilizados por pipelines empilhados, pelo playground e por testes):

| Motor         | Id              | O que faz                                                                                                                                                                                                      |
| ------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): substitui grandes blocos de texto contíguos por referências endereçadas por conteúdo, para que blocos repetidos/grandes sejam enviados uma vez e referenciados posteriormente. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): compactação tabular sem perdas de payloads de arrays JSON homogéneos para um formato colunar `[N rows]`.                                                                               |
| ionizer       | `ionizer`       | Amostragem de linhas do início/meio/fim para blocos homogéneos muito grandes, armazenando o conteúdo intermédio omitido como uma referência CCR endereçada por conteúdo.                                       |
| session-dedup | `session-dedup` | Deduplicação entre turnos endereçada por conteúdo (inspirada no TokenMizer): omite texto já visto em turnos anteriores da mesma sessão.                                                                        |

**Instrução do protocolo de recuperação CCR (#8033):** na primeira vez que o CCR substitui ≥1 bloco num
pedido, o motor antepõe uma única mensagem `system` idempotente (que começa com a
sentinela `[CCR protocol]`) que ensina ao chamador o contrato marcador → ferramenta: o que significa um
marcador `[CCR retrieve hash=<24hex> chars=N]`, que o hash deve ser copiado literalmente
(todos os 24 caracteres hexadecimais — hashes copiados incorretamente são a causa provável de erros
"block not found") e que um marcador `[dedup:ref sha=...]` significa "consultar o histórico", não "chamar a
ferramenta". A nota é injetada **apenas quando o `tools[]` anunciado pelo chamador comprova que este consegue
efetivamente aceder a `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` em
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — um chamador simples
compatível com OpenAI sem essa ferramenta nunca recebe uma instrução para chamar algo
a que não consegue aceder. A idempotência é assegurada através da pesquisa da sentinela
no histórico de mensagens antes da injeção, pelo que os pedidos com vários turnos (que reproduzem mensagens anteriores) não acumulam a
nota uma vez por turno.

## Caveman

O modo Caveman centra-se na condensação semântica de prosa normal:

- preserva blocos de código, URLs, JSON, caminhos e dados estruturados
- remove conteúdo supérfluo, linguagem de incerteza, contexto repetido e formulações de ligação prolixas
- suporta conjuntos de regras de ficheiros específicos de cada linguagem em `open-sse/services/compression/rules/`
- continua disponível através dos modos legados `standard`, `aggressive` e `ultra`

A secção correspondente no painel é `Dashboard -> Context & Cache -> Caveman`.

O projeto Caveman a montante indica uma redução de `~75%` nos tokens de saída, uma poupança média de saída de `65%` em testes de desempenho,
com um intervalo de `22-87%`, e uma ferramenta de compressão de entrada de `~46%`. O OmniRoute utiliza o valor do Caveman relativo à entrada
ao documentar as poupanças combinadas de prompts/contexto; o modo de saída do Caveman continua a ser uma funcionalidade separada
do comportamento das respostas.

## RTK

O modo RTK centra-se na saída de comandos e ferramentas:

- deteta classes de saída como `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  testes Cargo/Go, compilações TypeScript/Vite/Webpack, ESLint, auditorias/instalações npm, registos Docker,
  `find`/`grep` da shell, rastreios de pilha e registos genéricos
- aplica 49 filtros JSON de `open-sse/services/compression/engines/rtk/filters/`
- suporta o pipeline declarativo ao estilo do RTK: remoção de ANSI, substituição, atalho match-output,
  remoção/manutenção de linhas, truncamento por linha, truncamento de início/fim/número máximo de linhas e alternativa quando vazio
- suporta filtros de projeto sujeitos a confiança em `.rtk/filters.json` e filtros globais em
  `DATA_DIR/rtk/filters.json`
- remove sequências ANSI, ruído de progresso, linhas repetidas e texto padrão sem utilidade
- preserva falhas que exigem ação, avisos, resumos, ficheiros alterados e contexto final
- pode, opcionalmente, reter a saída original expurgada para recuperação/depuração através de rotas de gestão
  autenticadas

A secção correspondente no painel é `Dashboard -> Context & Cache -> RTK`.

Os detalhes operacionais relativos a filtros personalizados, confiança, verificação e recuperação da saída original encontram-se em
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

O projeto RTK a montante indica poupanças de `60-90%` na compressão da saída de comandos. O exemplo do respetivo README apresenta uma
sessão de 30 minutos do Claude Code que passa de `~118,000` tokens para `~23,900`, ou seja, uma poupança de `79.7%`.

## LLMLingua-2 (Poda semântica)

O modo LLMLingua-2 efetua **poda semântica de tokens** em prosa, utilizando um pequeno classificador
de tokens ONNX, complementando os motores Caveman e RTK baseados em regras:

- comprime prosa apenas em mensagens que não sejam do sistema; blocos de código delimitados e outras
  construções preservadas nunca são alterados
- executa o backend `@atjsh/llmlingua-2` (ONNX através de `@huggingface/transformers`) numa
  thread de trabalho, para que a inferência do modelo nunca bloqueie o ciclo de eventos do pedido
- é **combinável** (`stackPriority` 35): num pipeline combinado, é executado depois dos
  motores estruturais (CCR, session-dedup, headroom, Caveman), mas antes de `ultra`, uma vez que
  a poda semântica é mais eficaz em texto que já tenha sido comprimido estruturalmente — por exemplo,
  `rtk -> caveman -> llmlingua`
- **prossegue sem falhar perante qualquer erro** (dependências opcionais em falta, criação do worker, carregamento do modelo, inferência
  ou limite de tempo excedido) → o texto original é devolvido sem alterações, nunca um erro

Localização do motor: `open-sse/services/compression/engines/llmlingua/`. A secção correspondente no painel
é `Dashboard -> Context & Cache -> LLMLingua`.

### Modelos

O modelo predefinido é o **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
rápido). Está disponível um modelo **BERT-base** de maior precisão (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) através do campo `model` da configuração do motor. `@huggingface/transformers`
transfere o modelo selecionado de forma diferida a partir do HuggingFace Hub para
`${DATA_DIR}/models/llmlingua` na primeira chamada (`modelStore.ts`); uma substituição através da configuração
`modelPath` direciona-o para uma cópia local (instalações offline / isoladas da rede).

### Dependências opcionais e instalação a pedido

O conjunto de dependências peer do runtime LLMLingua passível de remoção é **opcional**. Dois pacotes são declarados como
`optionalDependencies` em `package.json` e mantidos como **externos** pela compilação de produção
(`scripts/build/prepublish.ts` não os inclui no bundle):

| Pacote               | Versão (fixada) | Notas                                              |
| -------------------- | --------------- | -------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`         | Pacote de entrada; declara os restantes como peers |
| `js-tiktoken`        | `^1.0.20`       | Tokenizador                                        |

`@huggingface/transformers` está fixado em `^4.2.0` (partilhado com o caminho de embeddings locais e
também incluído no rastreio para o bundle autónomo); `@atjsh/llmlingua-2@2.0.5` utiliza-o como peer com
`"^3.5.2 || ^4.0.0"`, pelo que são suportadas as versões v3 e v4 do Transformers.js. Desde a versão 2.0.4,
`@atjsh/llmlingua-2` já não requer `@tensorflow/tfjs`, o que removeu o maior
contribuinte individual (TensorFlow.js) do conjunto SLM. Apenas os dois pacotes acima são peers SLM
passíveis de remoção. Um `npm install` padrão (desenvolvimento) instala automaticamente o conjunto opcional, salvo se as dependências
opcionais forem omitidas.

**Porquê a pedido:** o pacote publicado no npm, o bundle autónomo e a imagem Docker
são distribuídos **sem** estas dependências para se manterem compactos. Quando não estão presentes, a verificação
de dependências do worker (uma tentativa de resolução de `@atjsh/llmlingua-2` em `worker.ts`) falha e o motor
**prossegue silenciosamente sem falhar** — selecionar LLMLingua não produz qualquer efeito (o texto é devolvido sem alterações, sem
qualquer erro registado). Para o ativar num ambiente reduzido, instale o conjunto opcional:

```bash
# fixe nas versões declaradas em optionalDependencies de package.json
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

A remoção de `@tensorflow/tfjs` (2.0.4+) elimina o anterior contribuinte dominante de ~800 MB
— a dimensão restante corresponde aos runtimes transformers.js + onnxruntime-node,
mais o modelo TinyBERT (~57 MB), transferido na primeira utilização (não através do npm).

Por ambiente:

- **Desenvolvimento / `npm install`** — instalado automaticamente, a menos que tenha usado `--omit=optional`
  (ou `--no-optional`). Não é necessária qualquer ação.
- **npm global (`npm i -g omniroute`) / autónomo** — execute o comando de instalação acima dentro do
  diretório do pacote instalado ou reinstale sem omitir as dependências opcionais.
- **Docker** — adicione o comando de instalação numa camada de uma imagem derivada; a imagem publicada
  é fornecida numa versão reduzida por conceção.
- **VPS (PM2)** — instale no `node_modules` da aplicação e, em seguida, reinicie o processo para que o
  worker volte a sondar o mecanismo de controlo.
- **Next autónomo em bruto (`npm run build` → `.build/next/standalone/server.js`)** — o
  rastreio autónomo NÃO inclui o worker nem as dependências opcionais, pelo que o motor
  permite silenciosamente a execução em caso de falha. `scripts/build/colocate-standalone.mjs` volta a aplicar ambos (esbuild do worker +
  fecho das dependências opcionais na árvore autónoma); é executado automaticamente através do
  hook npm `postbuild` após cada compilação. Idempotente e tolerante a falhas quando as dependências estão ausentes.

**Verifique se está ativo:** com o LLMLingua selecionado, o texto real é efetivamente reduzido (o motor
deixa de permitir a execução em caso de falha) e o primeiro pedido aciona a transferência do modelo para
`${DATA_DIR}/models/llmlingua`. O mecanismo de controlo sonda intencionalmente apenas `@atjsh/llmlingua-2` —
os restantes pares são exclusivos de ESM e `require.resolve` gera uma exceção para estes mesmo quando estão presentes — pelo que
o worker continua a permitir a execução em caso de falha se algum par estiver efetivamente em falta aquando de `import()`.

## Pipelines empilhados

O modo empilhado executa os passos do pipeline por ordem. A predefinição é:

```txt
rtk -> caveman
```

Utilize-o em sessões de agentes de programação nas quais um prompt combina a saída de comandos com prosa humana ou do assistente. O RTK reduz primeiro os registos ruidosos das ferramentas e, em seguida, o Caveman comprime a linguagem natural restante.

Os passos do pipeline são configurados através de `stackedPipeline` nas definições de compressão ou de combinações de compressão.

Quando ambos os motores reduzem o mesmo payload elegível, as poupanças são acumuladas:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Filtro da árvore de acessibilidade do MCP

O filtro inteligente da árvore de acessibilidade do MCP é uma camada de compressão pós-execução que atua nos **resultados das ferramentas** do MCP, não nos prompts nem no contexto. Destina-se aos payloads detalhados de árvores de acessibilidade e de instantâneos do browser devolvidos por ferramentas como Playwright, computer-use e servidores MCP de automatização do browser.

### O que faz

1. **Remoção de ruído** — remove entradas genéricas/de texto vazias (`- generic:`, `- text: ""`)
2. **Colapso de elementos irmãos** — quando ≥ `collapseThreshold` (predefinição: 30) linhas consecutivas são repetições estruturais, colapsa-as nas primeiras `collapseKeepHead` (predefinição: 10) linhas + um resumo da contagem + as últimas `collapseKeepTail` (predefinição: 5) linhas
3. **Preservação de referências** — as âncoras `[ref=eXX]` necessárias para Playwright/computer-use nunca são alteradas
4. **Truncagem rígida** — se o texto após o colapso ainda exceder `maxTextChars` (predefinição: 50 000), é truncado com uma indicação de navegação para que o agente possa continuar a trabalhar

### Localização do motor

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← ponto de entrada de smartFilterText()
  collapseRepeated.ts ← algoritmo de colapso de elementos irmãos
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Configuração

Controlado por `compression.mcpAccessibility` nas definições globais (migração 056). Configuração predefinida:

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

O filtro é aplicado apenas a payloads de resultados de ferramentas cujo `type` seja `"text"` e cujo comprimento exceda `minLengthToProcess`. Não afeta a compressão de prompts nem os payloads dos pedidos.

### Poupanças esperadas

60–80% nos resultados de ferramentas de instantâneos do browser, dependendo da complexidade da página. O algoritmo de colapso é O(n) relativamente ao número de linhas e acrescenta uma latência insignificante.

### Este filtro em comparação com os motores de compressão acima

| Aspeto                | Caveman / RTK / Empilhado       | Filtro de acessibilidade do MCP        |
| --------------------- | ------------------------------- | -------------------------------------- |
| Alvo                  | Prompts/contexto do pedido      | Resultados das ferramentas MCP         |
| Acionamento           | Definição do modo de compressão | `compression.mcpAccessibility.enabled` |
| Âmbito                | Todas as mensagens SSE          | Apenas resultados de ferramentas       |
| Âncoras de referência | N/A                             | Preservadas incondicionalmente         |

---

## Combinações de compressão

As combinações de compressão são perfis de compressão com nome que podem ser atribuídos a combinações de encaminhamento:

- `compression_combos`: armazena o modo, o pipeline, a configuração RTK, a configuração de idioma e o marcador predefinido
- `compression_combo_assignments`: associa uma combinação de compressão a uma combinação de encaminhamento
- a integração em tempo de execução resolve uma combinação de compressão atribuída antes das substituições genéricas de combinações
- as análises incluem `compression_combo_id` e `engine`

Localização no painel: `Painel -> Contexto e cache -> Combinações de compressão`.

## Superfície da API

| Rota                                   | Finalidade                                                                  |
| -------------------------------------- | --------------------------------------------------------------------------- |
| `/api/settings/compression`            | Definições globais de compressão (inclui a configuração `mcpAccessibility`) |
| `/api/compression/preview`             | Pré-visualizar qualquer modo de compressão                                  |
| `/api/compression/language-packs`      | Listar os pacotes de idiomas Caveman disponíveis                            |
| `/api/context/caveman/config`          | Alias das definições do Caveman                                             |
| `/api/context/rtk/config`              | Predefinições e definições do RTK                                           |
| `/api/context/rtk/filters`             | Catálogo de filtros RTK                                                     |
| `/api/context/rtk/test`                | Endpoint de pré-visualização/teste do RTK                                   |
| `/api/context/rtk/raw-output/[id]`     | Recuperação autenticada de resultados em bruto com dados ocultados          |
| `/api/context/combos`                  | CRUD de combinações de compressão                                           |
| `/api/context/combos/[id]/assignments` | CRUD de atribuições de combinações de encaminhamento                        |
| `/api/context/analytics`               | Alias das análises de compressão                                            |

As rotas de gestão exigem autenticação de gestão ou verificações de política de chave de API.

## Ferramentas MCP

A compressão disponibiliza cinco ferramentas MCP:

| Ferramenta                          | Âmbito              | Finalidade                                   |
| ----------------------------------- | ------------------- | -------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Definições, análises e estatísticas da cache |
| `omniroute_compression_configure`   | `write:compression` | Atualizar as definições globais              |
| `omniroute_set_compression_engine`  | `write:compression` | Definir o modo e o pipeline opcional         |
| `omniroute_list_compression_combos` | `read:compression`  | Listar combinações de compressão             |
| `omniroute_compression_combo_stats` | `read:compression`  | Consultar análises de combinações/motores    |

## Âmbito e exclusões

**Os embeddings nunca são comprimidos.** `open-sse/handlers/embeddings.ts` nunca invoca qualquer
motor de compressão — os corpos do pedido/resposta são enviados diretamente para o executor sem alterações.
Atualmente, isto é estrutural (os embeddings e as conclusões de chat são processadores distintos), e não uma
verificação em tempo de execução, mas significa que a preocupação relativa à distorção de vetores em #8034 não tem qualquer superfície de exposição
no percurso dos embeddings.

**Filtro de exclusão por modelo/endpoint (#8034).** Para conclusões de chat, um operador pode indicar
IDs de modelos/alvos `provider/model` que nunca devem ser comprimidos — uma salvaguarda útil caso
a compressão venha a ser integrada mais perto de um percurso adjacente aos embeddings e, de forma geral, útil
para qualquer modelo em que seja importante manter o pedido exatamente igual, byte a byte (avaliações determinísticas, prefixos
sensíveis à cache, etc.).

- Campo das definições: `exclusions?: string[]` na configuração global de compressão
  (`GET`/`PUT /api/settings/compression`), persistido através do espaço de nomes de compressão `key_value`
  existente (`src/lib/db/compression.ts`) — sem uma nova tabela.
- Separador do painel: **Painel → Compressão → Exclusões**
  (`/dashboard/compression/exclusions`).
- Sintaxe dos padrões: `*` é o único caráter universal. Todos os outros metacarateres de expressões regulares num padrão são
  escapados antes da correspondência, pelo que `gpt-5.6` corresponde apenas à cadeia literal, nunca a `gpt-5x6`
  (seguro contra ReDoS, limitado e sem quantificadores aninhados). Os padrões são comparados sem distinção entre maiúsculas e minúsculas
  tanto com o ID simples do modelo como com a composição `provider/model` — `gpt-5-6`, `openai/gpt-5-6`
  e `openai/*` funcionam todos, e `*` isolado exclui todos os modelos.
- Correspondência: `isCompressionExcluded()` / `normalizeCompressionExclusions()` em
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` verifica o alvo excluído
  imediatamente após resolver as definições de compressão, **antes de qualquer motor ser executado**, e trata uma correspondência
  exatamente como se a compressão estivesse globalmente desativada — é possível provar que o corpo do pedido é
  idêntico byte a byte. A omissão é registada através de `writeCompressionSkip(..., "excluded")` para
  garantir a visibilidade nas análises.
- Predefinição (lista vazia/ausente): comportamento idêntico ao anterior a #8034 — nada é excluído.

## Limitações conhecidas

- **O LLMLingua-2 (SLM) requer dependências opcionais colocadas em conjunto.** O worker só é executado numa
  compilação de produção quando `@atjsh/llmlingua-2` + pares estão colocados em conjunto em
  `dist/node_modules` (consulte `scripts/build/colocateOptionals.mjs`, #4286). Sem estes, o
  motor permite a continuação em caso de falha (devolve o texto original). A resolução do worker já não depende de
  `import.meta.url` (deixa de funcionar no pacote autónomo) — baseia-se no
  cwd / `argv[1]` do ambiente de execução.
- **Os pacotes de idiomas Caveman `de` / `fr` / `ja` estão incompletos.** Incluem regras
  `context` + `filler` + `structural`, mas não incluem pacotes `dedup` / `ultra`, pelo que a intensidade
  `ultra` não é superior a `full` nesses idiomas (utilizam apenas as suas próprias regras — não existe
  recurso silencioso às regras `dedup`/`ultra` em inglês, que deturpariam texto noutros idiomas).
  `en` / `es` / `id` / `pt-BR` estão completos. São bem-vindos contributos de `dedup.json` + `ultra.json`
  para os pacotes incompletos.
- **A telemetria empilhada apenas apresenta os motores que efetuaram compressão.** Um passo de um pipeline empilhado cujo
  motor foi executado, mas produziu uma poupança de 0 %, devolve `stats:null` e, por isso, não aparece em
  `engineBreakdown` — sendo indistinguível de um passo que foi ignorado. Distinguir
  "executado, 0 %" de "ignorado" exigiria uma alteração ao modelo de discriminação e foi adiado.

## Validação

As verificações específicas para esta área são:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
