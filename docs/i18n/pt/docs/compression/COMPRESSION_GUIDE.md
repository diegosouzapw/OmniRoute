# 🗜️ Prompt Compression Guide — OmniRoute (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Poupe automaticamente 15-95% do contexto elegível. Para uma visão geral rápida, consulte a [secção sobre compressão no README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Visão geral

O OmniRoute implementa um pipeline modular de compressão de prompts que é executado **proativamente** antes de os pedidos chegarem aos fornecedores a montante. Isto significa que a poupança de tokens ocorre de forma transparente — sem necessidade de alterar o seu fluxo de trabalho.

```
Pedido do cliente
  → Seletor da estratégia de compressão
    → Substituição por combo? → Utilizar a definição do combo
    → Limiar de ativação automática? → Utilizar o modo automático
    → Modo predefinido? → Utilizar a definição global
    → Desativado? → Ignorar a compressão
  → Modo de compressão selecionado
    → Desativado: Sem compressão
    → Lite: Limpeza segura de espaços em branco/formatação (~15%)
    → Standard: Remoção de conteúdo supérfluo em estilo telegráfico (~30%)
    → Aggressive: Envelhecimento do histórico + resumo (~50%)
    → Ultra: Poda heurística + redução de blocos de código (~75%)
    → RTK: Filtragem baseada em comandos de resultados do terminal/ferramentas (intervalo a montante de 60-90%)
    → Stacked: Pipeline ordenado com vários motores, normalmente RTK seguido de Caveman (intervalo elegível de 78-95%)
  → Pedido comprimido → Fornecedor
```

---

## Modos de compressão

### Desativado

Não é aplicada qualquer compressão. Todas as mensagens são transmitidas sem alterações.

### Modo Lite (~15% de poupança, latência <1ms)

O modo mais seguro — sem qualquer alteração semântica, apenas limpeza da formatação:

| Técnica                  | Descrição                                                |
| ------------------------ | -------------------------------------------------------- |
| `collapseWhitespace`     | Combina linhas em branco consecutivas e espaços no final |
| `dedupSystemPrompt`      | Remove mensagens de sistema duplicadas                   |
| `compressToolResults`    | Comprime resultados detalhados de ferramentas/funções    |
| `removeRedundantContent` | Remove instruções repetidas                              |
| `replaceImageUrls`       | Encurta URIs de dados de imagens em base64               |

**Ideal para:** Utilização permanente e fluxos de trabalho críticos em termos de segurança.

### Modo Standard (~30% de poupança)

Inspirado no [Caveman](https://github.com/JuliusBrussee/caveman) — remove palavras supérfluas e formulações prolixas, preservando o significado:

- Remove palavras supérfluas ("please", "I think", "basically", "actually")
- Condensa expressões prolixas ("in order to" → "to", "as a result of" → "because")
- Remove formulações excessivamente corteses ("Would you mind...", "If you could possibly...")
- Mais de 30 regras regex ajustadas para prompts de programação

**Ideal para:** Fluxos de trabalho diários de programação e equipas preocupadas com os custos.

### Modo Aggressive (~50% de poupança)

Gestão inteligente do histórico para sessões longas:

- **Envelhecimento de mensagens** — as mensagens mais antigas são progressivamente comprimidas
- **Compressão dos resultados de ferramentas** — resultados longos de ferramentas são truncados ou omitidos (primeiras/últimas linhas,
  filtragem de linhas correspondentes, compactação de chaves JSON)
- **Proteções da integridade estrutural** — garantem que os pares `tool_use` + `tool_result` permanecem consistentes
- **Consideração da janela de contexto** — respeita os limites de tokens de cada modelo

**Ideal para:** Sessões prolongadas de depuração e grandes bases de código.

### Modo Ultra (~75% de poupança)

Compressão máxima para cenários em que os tokens são críticos:

- **Poda heurística** — poda de tokens de prosa baseada em pontuação
- **Preservação da estrutura** — blocos de código delimitados, código inline, URLs e identificadores são
  substituídos por marcadores e reinseridos literalmente, nunca sendo podados
- **Camada SLM opcional** — um pequeno modelo local pode aperfeiçoar a poda quando configurado
- Independente do modo Aggressive: não executa o envelhecimento de mensagens, a compressão de resultados
  de ferramentas nem o gerador de resumos de contingência (apenas uma falha da camada SLM pode encaminhar
  uma passagem de contingência através do modo Aggressive)

**Ideal para:** Quando atinge repetidamente os limites de contexto.

### Modo RTK (intervalo a montante de 60-90%)

O modo RTK está otimizado para resultados detalhados de ferramentas que surgem em sessões de agentes de programação:

- Deteta classes de comandos/resultados, como `git status`, `git diff`, `git log`, executores de testes,
  compilações TypeScript/Vite/Webpack, ESLint/Biome/Prettier, auditorias/instalações npm, registos do Docker, resultados
  de infraestrutura e resultados genéricos da shell
- Aplica pacotes de filtros JSON de `open-sse/services/compression/engines/rtk/filters/`
- Importa filtros do esquema RTK TOML v1 de ficheiros `filters.toml` do projeto ou globais, com validação
  de testes inline e controlo de confiança para ficheiros do projeto
- Inclui 55 filtros integrados com exemplos de verificação inline
- Remove sequências de controlo ANSI, barras de progresso, linhas repetidas e ruído não acionável
- Preserva falhas, erros, avisos, ficheiros alterados, resumos e o final de resultados longos
- Suporta filtros de projeto sujeitos a controlo de confiança, filtros globais e recuperação opcional de resultados brutos com dados ocultados

**Ideal para:** Sessões de agentes com transcrições de shell, compilação, testes, git, grep e resultados de ficheiros.

### Modo Stacked (intervalo elegível de 78-95%)

O modo Stacked executa vários motores de compressão por uma ordem determinística. O pipeline predefinido é:

```txt
RTK -> Caveman
```

Esta ordem começa por manter compactos os resultados do terminal/das ferramentas e, em seguida, aplica a condensação semântica do Caveman ao
restante prompt em linguagem natural. Os pipelines Stacked podem ser configurados globalmente ou através de
combos de compressão atribuídos a combos de encaminhamento.

**Ideal para:** Contexto misto com grandes registos de ferramentas, juntamente com instruções humanas ou resumos do assistente.

---

## Cálculo das Poupanças a Montante

O OmniRoute documenta as poupanças de compressão de duas fontes: benchmarks de projetos a montante e
a composição dos próprios motores do OmniRoute.

| Fonte   | Valor do README a montante utilizado aqui                                                                                                            |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` menos tokens de saída, `65%` de poupança média de saída nos benchmarks, intervalo de `22-87%` e ferramenta de compressão de entrada de `~46%` |
| RTK     | `60-90%` de poupança na saída de comandos; sessão de exemplo com `~118,000 -> ~23,900` tokens, ou `79.7%` poupados (`~80%`)                          |

Para payloads de ferramentas/contexto sobrepostos, a combinação predefinida do OmniRoute encadeia os motores:

```txt
RTK -> Caveman
```

As poupanças combinadas são multiplicativas, não aditivas:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Esse valor de `78-95%` aplica-se quando tanto o RTK como o Caveman conseguem reduzir o mesmo payload de entrada/contexto.
O modo de saída de respostas do Caveman é separado: quando ativado, utilize as poupanças de saída do próprio Caveman (`65%`
em média, `~75%` em destaque, intervalo de `22-87%`). As poupanças totais na faturação dependem da combinação de prompts/saídas.

### O que significa realmente "elegível"

O intervalo de destaque de 15-95% é real, mas aplica-se apenas a conteúdo **redundante ou verboso** — linhas de
erro repetidas, um registo de compilação que repete incessantemente o mesmo aviso, um despejo sobredimensionado de `grep`/leitura de ficheiros. Isto
**não** significa que todos os pedidos permitam poupar esse valor.

Verificado empiricamente (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): uma
execução `stacked` (RTK + Caveman) num bloco `tool_result` com o formato da Anthropic, contendo 300 linhas de
erro idênticas, produziu **95.93% de poupança de tokens / 96.26% de poupança de caracteres** — claramente dentro do intervalo
anunciado. Contudo, o mesmo pipeline executado sobre a saída normal e não redundante de uma ferramenta (uma lista limpa de correspondências de `grep`,
uma leitura curta de um ficheiro, texto de conversação comum) produz corretamente **poupanças próximas de zero**, porque
não existe nada repetitivo para remover e `validateCompression()` (`validation.ts`) recusa enviar uma
reescrita que elimine ou altere blocos de código, URLs, títulos, versões ou identificadores de constantes em MAIÚSCULAS.

Este é um comportamento esperado e seguro, não um erro: uma sessão de programação que leia/pesquise sobretudo ficheiros sem ruído
terá poupanças totais modestas, mesmo com a compressão totalmente ativada, enquanto uma sessão que entre num ciclo de falhas
ou encontre um linter demasiado verboso terá o intervalo completo de 78-95% nesse tráfego. Não utilize a baixa percentagem
de poupança agregada de uma única sessão como prova de que a compressão está mal configurada — verifique primeiro se a
saída subjacente da ferramenta era realmente redundante.

---

## Visualização das Poupanças de Tokens

```
Sem compressão: 47K tokens enviados ao LLM
Com Lite:       40K tokens enviados          (15% poupados — seguro, sempre ativo)
Com Standard:   33K tokens enviados          (30% poupados — regras caveman-speak)
Com Aggressive: 24K tokens enviados          (50% poupados — envelhecimento + sumarização)
Com Ultra:      12K tokens enviados          (75% poupados — poda heurística)
Com RTK:        19K-5K tokens enviados       (60-90% poupados na saída de comandos/ferramentas)
Com Stacked:    10K-2.5K tokens enviados     (intervalo elegível de 78-95% com RTK+Caveman)
```

---

## Configuração

### Painel

Aceda a `Dashboard → Context & Cache`:

- **Caveman** — seleção do modo, pacotes de idiomas, pré-visualização e predefinições globais
- **RTK** — pré-visualização do filtro de comandos, definições de segurança do RTK e catálogo de filtros
- **Compression Combos** — pipelines de motores com nome atribuídos a combinações de encaminhamento
- **Auto-Trigger Threshold** — ativa automaticamente a compressão quando a contagem de tokens excede o limiar

### Substituição por combinação

Em `Dashboard → Context & Cache → Compression Combos`, atribua uma combinação de compressão a uma
combinação de encaminhamento:

```txt
Combinação: "free-tier-fallback"
  Combinação de compressão: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Destinos:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Isto permite utilizar compressão em pilha em fornecedores gratuitos/de programação, mantendo o modo
ligeiro nas subscrições pagas.

Esta atribuição de "Substituição por combinação" é um controlo diferente da substituição do **modo de
compressão da combinação de encaminhamento** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses
— o esquema do campo também aceita `rtk`, `stacked` e `omniglyph`) — essa substituição não seleciona
um pipeline de combinação de compressão com nome; apenas define o campo `compressionMode` consultado
por `resolveCompressionPlan`. Pode ser definida no cartão da combinação (`Dashboard → Combos`) ou,
desde a #6760, por combinação de encaminhamento na lista "Assign to routing" em
`Dashboard → Context & Cache → Compression Combos`, imediatamente ao lado da caixa de seleção de
atribuição do pipeline documentada acima. Ambas as interfaces persistem através do mesmo endpoint
`PUT /api/combos/{id}`.

### Substituição por pedido

Envie o cabeçalho de pedido `x-omniroute-compression` para substituir o plano de compressão de um
único pedido. Tem a precedência mais elevada — sobrepõe-se à substituição da combinação de
encaminhamento, ao perfil ativo, à ativação automática e à predefinição do painel. Os valores
desconhecidos são ignorados (o pedido nunca é rejeitado) e o interruptor principal global continua
a controlar tudo: quando a compressão está globalmente desativada, o cabeçalho não a pode ativar.
Valores:

| Valor         | Efeito                                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Sem compressão para este pedido.                                                                                                   |
| `default`     | O perfil Default derivado do painel (ignora o perfil ativo). Os motores com perdas permanecem desativados.                         |
| `safe`        | O mesmo que omitir o cabeçalho: apenas desduplicação e compactação de espaços em branco.                                           |
| `allow-lossy` | Mantém o plano do operador deste pedido, incluindo resumos, filtros de relevância e reformulações de estilo.                       |
| `engine:<id>` | Um único motor, quando ativado, por exemplo, `engine:rtk`. Esta é a adesão por pedido para esse motor.                             |
| `<combo>`     | Uma combinação com nome, primeiro por correspondência de nome (sem distinção entre maiúsculas e minúsculas) e, em seguida, por id. |

Sem `allow-lossy`, `engine:<id>` ou uma combinação com nome, os motores com perdas não são aplicados.
O pedido continua a beneficiar da desduplicação da sessão e da compactação de espaços em branco
quando a compressão está ativada.

O plano aplicado é devolvido no cabeçalho de resposta
`X-OmniRoute-Compression: <mode>; source=<source>`, em que `<source>` é um de `request-header`,
`routing-override`, `active-profile`, `auto-trigger`, `default` ou `off`.

### API

```bash
# Obter as definições de compressão
curl http://localhost:20128/api/settings/compression

# Atualizar as definições de compressão
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Pré-visualizar um payload RTK/stacked específico
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Listar os pacotes de filtros RTK
curl http://localhost:20128/api/context/rtk/filters

# Testar diretamente o RTK com metadados de comando opcionais
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## O Que Fica Protegido

O motor de compressão **preserva sempre:**

- ✅ Blocos de código (delimitados e em linha)
- ✅ URLs e caminhos de ficheiros
- ✅ Estruturas JSON e dados estruturados
- ✅ Identificadores e tokens técnicos protegidos
- ✅ Expressões matemáticas
- ✅ Definições de chamadas de ferramentas/funções
- ✅ Prompts de sistema (no modo lite)

A recuperação de resultados em bruto do RTK oculta chaves de API comuns, tokens bearer, tokens do Slack, chaves de acesso da AWS,
palavras-passe, tokens e segredos antes de qualquer informação ser guardada.

---

## Estatísticas de Compressão

Cada pedido comprimido inclui estatísticas nos registos do servidor:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Roteiro de Fases

| Fase    | Modos                                                                                                                                                                | Estado        |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Fase 1  | Desativado, Lite                                                                                                                                                     | ✅ Disponível |
| Fase 2  | Standard, Aggressive, Ultra                                                                                                                                          | ✅ Disponível |
| Fase 3  | RTK, Stacked, Combinações de Compressão                                                                                                                              | ✅ Disponível |
| Fase 4  | Estilos de Saída, Ultra de nível SLM, infraestrutura de avaliação                                                                                                    | ✅ Disponível |
| Fase 4C | Orçamento de contexto adaptativo ("seletor") — motor de computação + API (`contextBudget` em `PUT /api/settings/compression`) + controlos de modo/política no painel | ✅ Disponível |

---

## Agradecimentos

As regras de compressão do modo Standard são inspiradas no **[Caveman](https://github.com/JuliusBrussee/caveman)** de **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ mais de 51 mil) — o projeto viral "porquê usar muitos token quando poucos token fazem serviço". O Caveman indica `~75%` menos tokens de saída, uma poupança média de `65%` nos tokens de saída em testes de referência, um intervalo de `22-87%` na saída e uma ferramenta de compressão de entrada de `~46%`.

O modo RTK é inspirado no **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** da **[RTK AI](https://github.com/rtk-ai)** — o projeto de compressão de alto desempenho para resultados de comandos de terminal, compilação, testes, git e filtragem de resultados de ferramentas. O RTK indica poupanças de `60-90%`, com a sessão de exemplo no respetivo README a demonstrar uma poupança de `~80%`.

---

## Sistemas de Compressão Avançados

Além dos 7 modos descritos acima (o código-fonte também aceita os modos `codex-responses` e
`omniglyph`, que este guia não aborda), as secções abaixo abrangem funcionalidades
que operam dentro desses modos ou em conjunto com eles: a Compressão de Resultados de Ferramentas e o Envelhecimento Progressivo
são os passos 1 e 2 do motor agressivo (modo Aggressive e um passo `aggressive` de um
pipeline empilhado), o Pipeline Empilhado é a forma como o modo Stacked funciona, a Compressão Sensível à Cache
rebaixa `aggressive` e `ultra` para `standard` nos fornecedores com cache enquanto a compressão
está ativa, e o Modo de Saída Caveman e os Estilos de Saída são instruções opcionais no prompt de sistema,
desativadas por predefinição, que moldam a saída do modelo em vez de comprimirem o pedido.

### Compressão Sensível à Cache

Alguns fornecedores (como a Anthropic com cache de prompts) suportam **cache de prompts**,
o que lhes permite colocar partes do prompt em cache para reduzir custos e latência. Quando
a cache está ativada, a compressão agressiva pode, na verdade, **prejudicar** o desempenho
porque altera os tokens em cache, invalidando-a.

O módulo `cachingAware.ts` resolve esta situação ao **detetar o contexto de cache** e
**ajustar a estratégia de compressão** em conformidade.

#### Como funciona

1. **Detetar o contexto de cache** — Analisa o corpo do pedido à procura de marcadores `cache_control`
2. **Identificar fornecedores com cache** — Verifica se o fornecedor de destino suporta cache
3. **Ajustar a estratégia** — Rebaixa `aggressive`/`ultra` para `standard` nos fornecedores com cache
4. **Ignorar o prompt de sistema** — Os prompts de sistema costumam estar em cache, pelo que não devem ser comprimidos

A função auxiliar de estratégia também devolve um sinalizador `deterministicOnly`, mas o construtor do plano utiliza
apenas a estratégia — atualmente, nenhum componente subsequente lê o sinalizador.

#### Exemplo de código

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Marcador de cache
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Quando utilizar

A compressão sensível à cache está **sempre ativa** — não é necessária qualquer configuração. É acionada sempre que
a compressão está ativa e o fornecedor de destino suporta cache de prompts (Anthropic, OpenAI,
etc.); não são necessários marcadores `cache_control` explícitos — um fornecedor com cache, por si só,
aciona o rebaixamento, e os marcadores, por si só, nunca o fazem (a deteção de marcadores alimenta a
telemetria da cache, não a decisão da estratégia).

### Envelhecimento Progressivo

As conversas longas acumulam muitas interações de mensagens, mas as interações mais antigas tornam-se menos
relevantes. O módulo `progressiveAging.ts` **degrada as mensagens com base na distância entre interações**
(distância medida a partir do fim da conversa). Com as predefinições disponibilizadas
(`verbatim: 2, light: 2, moderate: 3`):

- **Últimos 2 turnos (distância ≤ 2)**: Mantidos literalmente
- **Distância 3**: Compressão caveman (remoção de texto supérfluo)
- **Distância 4+**: Mensagens do assistente resumidas; mensagens do utilizador reduzidas à primeira
  linha, limitadas a 120 caracteres; outras funções mantidas sem alterações. Os prompts de sistema, as
  mensagens já envelhecidas e a mensagem mais recente do utilizador são sempre mantidos literalmente,
  independentemente da distância. Nada é removido por completo, e a faixa `light`
  é inalcançável com os valores predefinidos fornecidos (`light` é igual a `verbatim`).

#### Exemplo de código

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... mais 50 turnos ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // últimos 3 turnos: literalmente
  light: 8, // distância <= 8: compressão ligeira
  moderate: 20, // distância <= 20: compressão caveman
  fullSummary: 5, // exigido pelo tipo, não lido pelo código de divisão em faixas
  // distância > 20: resumido (assistente) / primeira linha mantida (utilizador)
});

// saved = número de tokens poupados
```

#### Quando utilizar

O envelhecimento progressivo está **sempre ativo** no modo `aggressive` — é o passo 2 de
`compressAggressive()`. O modo Ultra não o executa. É
particularmente eficaz para:

- Sessões de programação prolongadas
- Conversas ao longo de vários dias
- Fluxos de trabalho agênticos com muitas chamadas de ferramentas

### Modo de saída Caveman

O modo de saída Caveman adiciona **instruções ao prompt de sistema** que pedem ao próprio modelo uma
saída concisa — o nível `lite` pede respostas concisas que mantenham frases completas, o nível `full`
pede-lhe para «responder de forma concisa como um homem das cavernas inteligente» e o nível `ultra` pede uma saída telegráfica;
as instruções apenas o pedem, não o podem garantir. Os pedidos recebem-nas através de
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` começa por resolver a seleção com a camada de compatibilidade retroativa
(`resolveOutputStyleSelection()` em
`open-sse/services/compression/outputStyles/backCompat.ts`), que, enquanto `outputStyles`
estiver vazio, mapeia um `cavemanOutputMode` ativado para o estilo de saída `terse-prose` com
`cavemanOutputMode.intensity` (consulte Compatibilidade retroativa abaixo); uma seleção `outputStyles`
não vazia é utilizada tal como está, e `cavemanOutputMode.enabled` e `intensity` deixam então de ter
efeito, enquanto a respetiva opção `autoClarity` continua a aplicar-se. `outputMode.ts` contém os
textos das instruções (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), a omissão baseada no conteúdo e a
função auxiliar de posicionamento utilizada pela injeção; o seu próprio injetor `applyCavemanOutputMode()` não tem
nenhum chamador em produção.

#### Como funciona

Este modo não comprime a entrada. Adiciona um bloco de instruções ao prompt de sistema
(consulte Como funciona a injeção abaixo), e qualquer modo de compressão da entrada selecionado para o pedido
continua a ser executado posteriormente, sobre o corpo que agora contém o bloco. Antes da cláusula partilhada
sobre limites com que todos os níveis terminam, o nível `full` em inglês diz:

> «Responda de forma concisa como um homem das cavernas inteligente. Omita artigos (a/an/the), texto supérfluo (just/really/basically/actually/simply), cortesias e linguagem evasiva. Fragmentos aceitáveis. Sinónimos curtos (big, não extensive; fix, não implement). Mantenha intactos todo o conteúdo técnico, código, erros, URLs e identificadores.»

Isto funciona particularmente bem para:

- Geração de código (saída mais concisa = menos tokens)
- Perguntas e respostas rápidas (sem necessidade de explicações elaboradas)
- Processamento em lote (maximiza o débito)

#### Quando utilizar

O modo de saída Caveman é **facultativo**. Com a compressão ativada (`enabled: true`, a opção principal
na página Definições de Compressão), ative-o com `cavemanOutputMode.enabled`; `intensity`
seleciona `lite`, `full` ou `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

A opção **Output Mode** de uma combinação de compressão (`outputMode`, com o nível em `outputModeIntensity`)
define o mesmo interruptor para os pedidos aos quais essa combinação se aplica, e a
ferramenta MCP `omniroute_set_compression_engine` configura-o através do respetivo argumento booleano `outputMode`.
Uma seleção `outputStyles` não vazia tem precedência sobre este interruptor. No
painel, ativar o estilo de saída **Terse prose** injeta o mesmo bloco (consulte Estilos de
saída abaixo).

### Estilos de saída (catálogo)

O modo de saída Caveman acima é o **percurso legado de estilo único**. A Fase 4 generalizou-o
num catálogo de estilos de saída combináveis: `OUTPUT_STYLE_CATALOG` em
`open-sse/services/compression/outputStyles/catalog.ts`. Cada estilo é uma instrução no prompt de sistema
que pede ao próprio modelo uma saída mais económica; os estilos podem ser ativados
em conjunto e são injetados pela ordem do catálogo.

| Estilo                                         | `id`          | O que faz                                                                                                                                                                                                                                | Idiomas das instruções                        |
| ---------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Prosa concisa                                  | `terse-prose` | Elimina texto supérfluo/artigos/atenuantes; mantém a substância técnica exata. O mesmo texto do modo de saída caveman antigo (referenciado, não repetido).                                                                               | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Menos código                                   | `less-code`   | Escada YAGNI: a menor alteração funcional, sem abstrações não solicitadas.                                                                                                                                                               | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Rabo de cavalo (programador sénior preguiçoso) | `ponytail`    | "O melhor código é o código que nunca foi escrito": reutilizar > reescrever, causa raiz > sintoma, o diff funcional mais curto.                                                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Tenho TDAH (ação primeiro)                     | `i-have-adhd` | Ação primeiro (comando/caminho/excerto antes da prosa), passos numerados e limitados, UM passo seguinte concreto, sem preâmbulo/recapitulação/despedidas. Adaptado de [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| CJK conciso (文言)                             | `terse-cjk`   | Resposta `full`/`ultra` em chinês clássico (文言); `lite` apenas pede respostas breves sem palavras funcionais, cortesias ou ornamentos.                                                                                                 | zh (limitado pela região, ver abaixo)         |

Cada estilo inclui três níveis de intensidade — `lite`, `full`, `ultra` — e cada nível
termina com a cláusula de limites partilhada (`SHARED_BOUNDARIES` em `outputMode.ts`), que
mantém exatos os blocos de código, caminhos de ficheiros, comandos, erros e URLs. Os textos dos níveis
`terse-prose` e `terse-cjk` acrescentam identificadores a essa lista.

`terse-cjk` está limitado à região `zh` em dois locais. A página Definições de Compressão apresenta
a respetiva linha apenas quando o idioma da interface do painel é chinês (`zh-CN` ou `zh-TW`), e
`applyOutputStyles()` apenas o injeta quando o idioma resolvido do pedido (ver Seleção de
idioma abaixo) é `zh`. Ocultar a linha não elimina uma seleção `terse-cjk` guardada:
a API de definições aceita qualquer id de estilo, e guardar outros estilos na página mantém-na. No
momento do pedido, a verificação de idioma de `applyOutputStyles()` é a única restrição de região.

#### Como funciona a injeção

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) resolve
a seleção com base no catálogo (ids desconhecidos e estilos incompatíveis com a região são
ignorados, nunca constituem um erro; uma seleção que não resulte em qualquer estilo deixa o corpo
inalterado, ignorado como `no_styles`), concatena as instruções selecionadas pela ordem do catálogo,
acrescenta a cláusula de limites **uma vez** (mais a cláusula de segurança, `SAFETY_BOUNDARIES` ou a sua
tradução, quando `less-code` ou `ponytail` está selecionado) e inicia o bloco com um
único marcador de idempotência (`[OmniRoute Output Styles]`), pelo que voltar a aplicar não produz alterações. Quando
o idioma resolvido (ver Seleção de idioma abaixo) tem uma tradução, a instrução localizada
é injetada em vez da inglesa.

Num corpo com um array `messages` não vazio, a verificação de idempotência é executada antes do
desvio de conteúdo: quando o marcador `[OmniRoute Output Styles]` já se encontra no campo
`system` de nível superior (uma string ou um array de blocos de conteúdo) ou numa mensagem de sistema com conteúdo
de string, o corpo permanece inalterado como `already_applied` e não é efetuada qualquer verificação de palavras-chave.
Caso contrário, um desvio de conteúdo (`shouldBypassCavemanOutputMode()` em
`open-sse/services/compression/outputMode.ts`) verifica o texto das últimas três
mensagens, independentemente da respetiva função, e ignora os estilos durante todo o turno quando esse texto
corresponde às respetivas palavras-chave de segurança, ação irreversível ou clarificação, ou a uma
sequência sensível à ordem: `first`, `then`, `after that`, `before`, `rollback` ou
`backup` seguida, num intervalo de 240 caracteres, por `delete`, `drop`, `migrate`, `deploy` ou
`release`. O desvio é executado enquanto a opção **Desvio automático para maior clareza**
(`cavemanOutputMode.autoClarity`, ativa por predefinição) estiver ativa; desativar a opção ignora a
verificação de palavras-chave.

Quando o desvio permite que o turno prossiga, `placeSystemInstruction()` (o mesmo ficheiro), que
nunca cria um novo `messages[0]`, coloca o bloco no primeiro destes locais que encontrar:

1. Uma mensagem de sistema inicial com conteúdo de string: o bloco é acrescentado após o respetivo texto.
2. O campo `system` de nível superior: o bloco é acrescentado após o texto de uma string ou
   adicionado como um novo bloco de texto a um array de blocos de conteúdo.
3. A primeira mensagem de sistema posterior com conteúdo de string: o bloco é acrescentado após o respetivo
   texto.
4. Nenhum dos anteriores: o bloco é colocado numa nova mensagem de sistema no fim de `messages`.

Num corpo sem um array `messages` (ou com um vazio), não é executado qualquer desvio de conteúdo e
um campo `system` de nível superior não é consultado. O bloco é acrescentado após o texto de um
campo `instructions` de string, exceto se esse campo já contiver o marcador
`[OmniRoute Output Styles]`, caso em que o corpo permanece inalterado como
`already_applied`. Quando o corpo não tem um campo `instructions` de string, mas contém `input`
(uma string ou um array), o bloco passa a ser `instructions`, substituindo qualquer valor que não seja uma string
que esse campo continha. Um corpo sem um campo `instructions` de string nem um `input` que seja uma string ou um array
permanece inalterado e é ignorado como `no_messages`.

#### Como ativar

No dashboard: **Contexto de Compressão → Definições de Compressão**
(`/dashboard/context/settings`), secção Estilos de saída: uma linha por estilo, com um
botão para ativar/desativar e um seletor de nível. Os estilos são injetados enquanto a
própria compressão estiver ativada (o botão principal da página, `enabled`). O botão
**Ignorar Clareza Automática** encontra-se na página **Caveman**
(`/dashboard/context/caveman`), no respetivo cartão **Modo de Saída**. Programaticamente,
a configuração de compressão mantém a seleção como:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Retrocompatibilidade: enquanto `outputStyles` estiver vazio, a definição antiga
`cavemanOutputMode.enabled` é mapeada para `terse-prose` com a intensidade definida em
`cavemanOutputMode.intensity`. O bloco começa então com o marcador
`[OmniRoute Output Styles]`, enquanto o injetor antigo `applyCavemanOutputMode()`
escrevia `[OmniRoute Caveman Output Mode]`. Abaixo do marcador, o texto corresponde à
injeção antiga em en, pt-BR, es, de, fr, it, ru, id e vi; em ja e zh, contém um espaço
adicional antes da cláusula de limites. `terse-prose` está traduzido para pt-BR, es, de,
fr, it, ru, zh, ja, id e vi, pelo que um pedido cujo idioma resolvido seja `hu` recebe o
texto em inglês, ao passo que o injetor antigo utilizava o respetivo texto em húngaro.

Seleção do idioma do estilo de saída (`resolveOutputStyleLanguage()` em
`outputStyles/apply.ts`): com `languageConfig.enabled` ativado, `autoDetect` obtém uma
amostra da mensagem mais recente do utilizador no array `messages` do pedido que
contenha texto (conteúdo em formato string ou o `text` das respetivas partes de
conteúdo) e executa sobre ela o detetor do motor Caveman
(`detectCompressionLanguage()`). O detetor devolve `zh` para texto com caracteres Han
e sem kana; caso contrário, devolve o idioma com mais correspondências de indicadores
entre `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` e `id`, ou `en` quando não
existem correspondências — o texto que não consegue classificar recebe inglês, nunca
`defaultLanguage`, e `vi` nunca é detetado, embora os estilos incluam texto em `vi`.
O corpo de uma Responses API mantém os respetivos turnos em `input`, que não é usado
para amostragem, pelo que recebe `defaultLanguage` e, em seguida, inglês. Quando nenhuma
mensagem do utilizador em `messages` contém texto, ou quando `autoDetect` está
desativado, aplica-se `defaultLanguage` e, em seguida, inglês. Com
`languageConfig.enabled` desativado, o idioma é inglês — exceto se uma combinação de
compressão se aplicar ao pedido (uma combinação atribuída à combinação de
encaminhamento do pedido, ou a combinação de compressão predefinida à qual o chatCore
recorre para o pipeline integrado em camadas): aplicar uma combinação ativa
`languageConfig.enabled` para esse pedido e define `defaultLanguage` a partir dos
pacotes de idiomas da combinação (o valor guardado, caso seja um dos pacotes da
combinação; caso contrário, o primeiro pacote da combinação, que assume `en` por
predefinição), enquanto o valor guardado de `autoDetect` (ativado por predefinição)
continua a aplicar-se. O motor de entrada Caveman seleciona o idioma do pacote de regras
de forma diferente — por parte de texto e, com a deteção automática desativada,
condicionado a `enabledPacks`.

A matriz estilo × idioma é fixada por
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: cada estilo do catálogo
necessita de uma entrada em `BASELINE_LANGUAGES`; um estilo que não esteja restringido
por região tem de incluir uma tradução pt-BR (o `terse-cjk`, restringido por região,
está isento desta regra), a menos que esteja listado em `KNOWN_ENGLISH_ONLY`, que apenas
pode conter estilos sem qualquer tradução — um estilo listado que tenha alguma tradução
faz com que o teste falhe; além disso, um estilo faz com que o teste falhe quando perde
um idioma listado na respetiva entrada de `BASELINE_LANGUAGES`. Para adicionar um
estilo, consulte
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compressão de Resultados de Ferramentas

`compressToolResult()` em `open-sse/services/compression/toolResultCompressor.ts`
comprime o texto dos resultados de ferramentas através de **5 estratégias**. Tenta-as
por esta ordem, e a primeira estratégia ativada cuja verificação corresponda ao conteúdo
determina o resultado:

1. **`fileContent`**: conteúdo com 3 ou mais linhas em que pelo menos uma linha, ignorando
   a indentação inicial, começa por `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` ou `return ` (a palavra-chave seguida de um espaço), ou por `if`,
   `for` ou `while` seguido de `(` ou ` (`, mantém as primeiras 20 e as últimas 5 linhas, com
   a parte intermédia omitida assinalada.
2. **`grepSearch`**: conteúdo com pelo menos uma linha no formato `<path>:<digits>:`,
   em que o texto antes dos primeiros dois-pontos não contém espaços em branco, mantém apenas essas linhas, no
   máximo 30, seguidas por uma contagem de quaisquer correspondências adicionais e pela lista de ficheiros correspondentes;
   todas as outras linhas são removidas. Uma única linha deste tipo é suficiente para acionar a estratégia, pelo que uma
   linha de registo que comece por uma marca temporal, como `12:30:45`, também conta.
3. **`shellOutput`**: a saída que contenha uma sequência ANSI CSI (`ESC[` seguida de algarismos ou
   pontos e vírgulas e, depois, uma letra, como nos códigos de cor) ou um `$` seguido de um espaço em branco
   em qualquer parte do texto perde essas sequências (outras sequências de escape, como `ESC[?25l` ou uma
   sequência OSC de título de janela, são mantidas) e conserva as suas últimas 50 linhas, com linhas
   consecutivas repetidas condensadas. Como esta verificação é executada antes de `json` e `errorMessage`,
   a saída JSON ou de erro que contenha um `$` deste tipo nunca chega a essas estratégias enquanto
   `shellOutput` estiver ativo.
4. **`json`**: um payload JSON com mais de 2 000 carateres que comece por `{` ou `[` (após
   espaços em branco opcionais) e seja analisado com êxito é resumido: um array com mais de 7 elementos mantém
   os primeiros 5 e os últimos 2 elementos e a sua contagem total, e um objeto mantém as primeiras 20
   chaves, com cada valor de objeto ou array aninhado substituído por um marcador `{…N keys}`
   (para um array, N é o seu comprimento) e um marcador `_remaining_<N>_keys` que contabiliza as chaves
   removidas após as primeiras 20. Os valores escalares são copiados na íntegra, pelo que um objeto com 20 chaves
   ou menos sem valores aninhados é apenas reindentado — uma versão minificada ganha carateres
   e permanece inalterada.
5. **`errorMessage`**: a saída que contenha, em qualquer parte e independentemente de maiúsculas ou minúsculas, `error:`,
   `error ` (a palavra seguida de um espaço, como em `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` ou `traceback` mantém a primeira linha, as
   10 linhas seguintes e as últimas 3, com um marcador `… [N frames elided] …` no lugar das
   linhas entre elas. O marcador só aparece quando mais de 13 linhas se seguem à primeira
   linha, pelo que uma saída de erro com 14 linhas ou menos não é encurtada (com 12 ou 13 linhas, as
   últimas 3 repetem linhas já mantidas).

Depois de uma estratégia corresponder, mesmo que não poupe nada, as estratégias posteriores não são
experimentadas. Quando a estratégia correspondente não poupa tokens estimados (comprimento ÷ 4, arredondado para cima) —
por exemplo, um ficheiro semelhante a código com 25 linhas ou menos, ou um array JSON com mais de 2 000
carateres e 7 elementos ou menos — o motor agressivo mantém o resultado original da ferramenta:
ambos os chamadores (`compressAggressive()` e `compressAnthropicToolResultBlock()`)
mantêm o original quando `saved` é 0 ou inferior, enquanto `compressToolResult()` continua a
devolver a saída dessa estratégia. O passo do resultado da ferramenta não é a última palavra: o
resumidor de recurso do motor ainda pode encurtar uma mensagem `tool` ou `function` com mais
de 8 192 carateres (`maxTokensPerMessage`, 2 048, vezes 4).

#### Quando utilizar

A compressão de resultados de ferramentas é o passo 1 do motor agressivo (`compressAggressive()` em
`open-sse/services/compression/aggressive.ts`), pelo que é executada no modo Agressivo e num passo
`aggressive` de um pipeline empilhado. Comprime mensagens `tool` e `function` no formato OpenAI
e o texto dentro de blocos `tool_result` da Anthropic. Cada estratégia tem o seu próprio
interruptor em `aggressive.toolStrategies`, todos ativados por predefinição. No painel, os
interruptores encontram-se na vista **Avançado** da página Caveman enquanto a compressão está ativada e o
modo predefinido é Agressivo.

### Pipeline Empilhado

O modo empilhado executa **vários motores em sequência** — normalmente primeiro o RTK
(60-90% de poupança na saída de ferramentas) e, depois, o Caveman no texto restante (~46% de
poupança na entrada). Em conjunto, isto corresponde ao **intervalo elegível de 78-95%** (consulte acima
Cálculo de Poupanças a Montante): `1 - (1 - 0.60..0.90) × (1 - 0.46)` resulta numa média de ≈89%.

#### Como funciona

```
Entrada (1000 tokens)
  → RTK (filtro sensível a comandos) → 200 tokens
    → Caveman (remoção de conteúdo supérfluo) → 108 tokens
  → Saída (108 tokens, ~89% de poupança)
```

#### Quando utilizar

Utilize o modo empilhado para:

- Fluxos de trabalho com utilização intensiva de ferramentas (programação agêntica, investigação)
- Processamento em lote sensível a custos
- Quando precisar da máxima poupança de tokens

Os pipelines empilhados são configurados através da definição global de compressão `stackedPipeline`
ou através de uma combinação de compressão nomeada atribuída a uma combinação de encaminhamento (consulte
Substituição por Combinação acima) — não através de um `modePack` de combinação automática (esse campo apenas
repondera a seleção de modelos da combinação automática, e `stacked` não é um nome de pacote válido).

---

## Substituições de Combinação para Compressão

Pode substituir o modo de compressão global **por combinação** para ajustar o comportamento
a diferentes casos de utilização:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Isto é útil para:

- **Combinações de programação**: Utilize o modo `aggressive` para sessões longas
- **Combinações de perguntas e respostas rápidas**: Utilize o modo `lite` para respostas rápidas
- **Combinações com utilização intensiva de ferramentas**: Utilize o modo `stacked` para obter a máxima poupança
- **Combinações de produção**: deixe a substituição desativada para fornecedores com cache — o ajuste com reconhecimento de cache, sempre ativo, reduz automaticamente `aggressive`/`ultra` para `standard`
  (não existe um modo `cache-aware` selecionável)

---

## Consulte Também

- [Configuração do Ambiente](../reference/ENVIRONMENT.md) — Variáveis de ambiente de compressão
- [Guia de Arquitetura](../architecture/ARCHITECTURE.md) — Funcionamento interno do pipeline de compressão
- [Guia do Utilizador](../guides/USER_GUIDE.md) — Introdução à compressão
- [Compressão RTK](./RTK_COMPRESSION.md) — Filtros RTK, modelo de confiança, porta de verificação e recuperação da saída não processada
- [Motores de Compressão](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, APIs, MCP e painel
- [Formato das Regras de Compressão](./COMPRESSION_RULES_FORMAT.md) — Formato JSON dos pacotes de regras
- [Pacotes de Idiomas de Compressão](./COMPRESSION_LANGUAGE_PACKS.md) — Regras Caveman específicas de cada idioma
