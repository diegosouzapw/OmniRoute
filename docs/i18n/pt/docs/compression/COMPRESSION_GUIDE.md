# 🗜️ Prompt Compression Guide — OmniRoute (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Poupe automaticamente 15-95% no contexto elegível. Para uma visão geral rápida, consulte a [secção sobre compressão no README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Visão geral

O OmniRoute implementa um pipeline modular de compressão de prompts que é executado **proativamente** antes de os pedidos chegarem aos fornecedores a montante. Isto significa que a poupança de tokens ocorre de forma transparente — não é necessário alterar o seu fluxo de trabalho.

```
Pedido do cliente
  → Seletor de estratégia de compressão
    → Substituição por combinação? → Utilizar a definição da combinação
    → Limiar de acionamento automático? → Utilizar o modo automático
    → Modo predefinido? → Utilizar a definição global
    → Desativado? → Ignorar a compressão
  → Modo de compressão selecionado
    → Desativado: Sem compressão
    → Ligeiro: Limpeza segura de espaços em branco/formatação (~15%)
    → Padrão: Remoção de conteúdo supérfluo ao estilo telegráfico (~30%)
    → Agressivo: Envelhecimento do histórico + resumo (~50%)
    → Ultra: Poda heurística + redução de blocos de código (~75%)
    → RTK: Filtragem de resultados do terminal/ferramentas com reconhecimento de comandos (intervalo a montante de 60-90%)
    → Empilhado: Pipeline ordenado com vários motores, normalmente RTK seguido de Caveman (intervalo elegível de 78-95%)
  → Pedido comprimido → Fornecedor
```

---

## Modos de compressão

### Desativado

Não é aplicada qualquer compressão. Todas as mensagens são transmitidas sem alterações.

### Modo ligeiro (~15% de poupança, latência <1ms)

O modo mais seguro — sem qualquer alteração semântica, apenas limpeza da formatação:

| Técnica                  | Descrição                                             |
| ------------------------ | ----------------------------------------------------- |
| `collapseWhitespace`     | Junta linhas em branco consecutivas e espaços finais  |
| `dedupSystemPrompt`      | Remove mensagens de sistema duplicadas                |
| `compressToolResults`    | Comprime resultados detalhados de ferramentas/funções |
| `removeRedundantContent` | Remove instruções repetidas                           |
| `replaceImageUrls`       | Encurta URIs de dados de imagem em base64             |

**Mais adequado para:** Utilização contínua, fluxos de trabalho críticos para a segurança.

### Modo padrão (~30% de poupança)

Inspirado no [Caveman](https://github.com/JuliusBrussee/caveman) — remove palavras supérfluas e formulações prolixas, preservando o significado:

- Remove palavras supérfluas ("por favor", "penso que", "basicamente", "na verdade")
- Condensa expressões prolixas ("com o objetivo de" → "para", "como resultado de" → "devido a")
- Remove formulações excessivamente corteses ("Importa-se de...", "Se pudesse...")
- Mais de 30 regras de expressões regulares otimizadas para prompts de programação

**Mais adequado para:** Fluxos de trabalho diários de programação, equipas preocupadas com os custos.

### Modo agressivo (~50% de poupança)

Gestão inteligente do histórico para sessões longas:

- **Envelhecimento de mensagens** — as mensagens mais antigas são progressivamente comprimidas
- **Resumo de resultados de ferramentas** — os resultados extensos das ferramentas são substituídos por resumos
- **Salvaguardas de integridade estrutural** — garantem que os pares `tool_use` + `tool_result` permanecem consistentes
- **Reconhecimento da janela de contexto** — respeita os limites de tokens de cada modelo

**Mais adequado para:** Sessões prolongadas de depuração, bases de código de grande dimensão.

### Modo Ultra (~75% de poupança)

Compressão máxima para cenários em que os tokens são críticos:

- **Poda heurística** — remove mensagens abaixo do limiar de relevância
- **Redução de blocos de código** — comprime exemplos de código repetitivos
- **Truncagem por pesquisa binária** — encontra o ponto de corte ideal para a janela de contexto
- Inclui todas as funcionalidades do modo Agressivo

**Mais adequado para:** Quando atinge repetidamente os limites de contexto.

### Modo RTK (intervalo a montante de 60-90%)

O modo RTK está otimizado para resultados detalhados de ferramentas que surgem em sessões de agentes de programação:

- Deteta classes de comandos/resultados, como `git status`, `git diff`, `git log`, executores de testes,
  compilações TypeScript/Vite/Webpack, ESLint/Biome/Prettier, auditorias/instalações npm, registos Docker, resultados
  de infraestrutura e resultados genéricos da shell
- Aplica pacotes de filtros JSON de `open-sse/services/compression/engines/rtk/filters/`
- Importa filtros do esquema RTK TOML v1 de ficheiros `filters.toml` do projeto ou globais, com validação
  de testes em linha e controlo de confiança para ficheiros do projeto
- Inclui 49 filtros integrados com amostras de verificação em linha
- Remove sequências de controlo ANSI, barras de progresso, linhas repetidas e ruído não acionável
- Preserva falhas, erros, avisos, ficheiros alterados, resumos e a parte final de resultados extensos
- Suporta filtros de projeto sujeitos a controlo de confiança, filtros globais e recuperação opcional dos resultados brutos com dados sensíveis ocultados

**Mais adequado para:** Sessões de agentes com transcrições de shell, compilação, testes, git, grep e resultados de ficheiros.

### Modo empilhado (intervalo elegível de 78-95%)

O modo empilhado executa vários motores de compressão numa ordem determinística. O pipeline predefinido é:

```txt
RTK -> Caveman
```

Esta ordem compacta primeiro os resultados do terminal/das ferramentas e, em seguida, aplica a condensação semântica do Caveman ao
restante prompt em linguagem natural. Os pipelines empilhados podem ser configurados globalmente ou através de
combinações de compressão atribuídas a combinações de encaminhamento.

**Mais adequado para:** Contexto misto com registos extensos de ferramentas, juntamente com instruções humanas ou resumos do assistente.

---

## Cálculo das poupanças a montante

O OmniRoute documenta as poupanças de compressão provenientes de duas fontes: os testes de desempenho dos projetos a montante e a composição dos motores do próprio OmniRoute.

| Fonte   | Valor do README a montante utilizado aqui                                                                                                        |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` menos tokens de saída, `65%` de poupança média de saída nos testes, intervalo de `22-87%` e ferramenta de compressão de entrada de `~46%` |
| RTK     | Poupanças de `60-90%` na saída de comandos; sessão de exemplo com `~118,000 -> ~23,900` tokens, ou `79.7%` poupados (`~80%`)                     |

Para payloads de ferramentas/contexto sobrepostos, a combinação predefinida do OmniRoute encadeia os motores:

```txt
RTK -> Caveman
```

As poupanças combinadas são multiplicativas, não aditivas:

```txt
combinado = 1 - (1 - poupança do RTK) * (1 - poupança de entrada do Caveman)
média     = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
intervalo = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Esse valor de `78-95%` aplica-se quando tanto o RTK como o Caveman conseguem reduzir o mesmo payload de entrada/contexto. O modo de saída de respostas do Caveman é separado: quando ativado, utilize as poupanças de saída do próprio Caveman (`65%` em média, `~75%` como valor em destaque, intervalo de `22-87%`). As poupanças totais na faturação dependem da combinação de prompts/saídas.

### O que significa realmente "elegível"

O intervalo em destaque de 15-95% é real, mas aplica-se apenas a conteúdo **redundante ou verboso** — linhas de erro repetidas, um registo de compilação que repete incessantemente o mesmo aviso, uma saída sobredimensionada de `grep`/leitura de ficheiro. Isto **não** significa que todos os pedidos permitam poupar tanto.

Verificado empiricamente (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): uma execução `stacked` (RTK + Caveman) num bloco `tool_result` no formato da Anthropic, contendo 300 linhas de erro idênticas, produziu **95.93% de poupança de tokens / 96.26% de poupança de caracteres** — plenamente dentro do intervalo anunciado. No entanto, a execução do mesmo pipeline com uma saída normal e não redundante de uma ferramenta (uma lista limpa de correspondências de `grep`, uma leitura curta de ficheiro, texto de conversação comum) produz corretamente **poupanças próximas de zero**, porque não existe nada repetitivo para remover e `validateCompression()` (`validation.ts`) recusa enviar uma reformulação que elimine ou altere blocos de código, URLs, títulos, versões ou identificadores de constantes em MAIÚSCULAS.

Este é um comportamento esperado e seguro, não um erro: uma sessão de programação que leia/pesquise sobretudo ficheiros limpos terá poupanças totais modestas, mesmo com a compressão totalmente ativada, enquanto uma sessão que encontre um ciclo de falhas ou um linter demasiado verboso terá o intervalo completo de 78-95% nesse tráfego. Não utilize a baixa percentagem de poupança agregada de uma única sessão como prova de que a compressão está mal configurada — verifique primeiro se a saída subjacente da ferramenta era realmente redundante.

---

## Visualização da poupança de tokens

```
Sem compressão:      47K tokens enviados ao LLM
Com Lite:            40K tokens enviados          (15% poupados — seguro, sempre ativo)
Com Standard:        33K tokens enviados          (30% poupados — regras de linguagem Caveman)
Com Aggressive:      24K tokens enviados          (50% poupados — envelhecimento + resumo)
Com Ultra:           12K tokens enviados          (75% poupados — poda heurística)
Com RTK:             19K-5K tokens enviados       (60-90% poupados na saída de comandos/ferramentas)
Com Stacked:         10K-2.5K tokens enviados     (intervalo elegível de 78-95% para RTK+Caveman)
```

---

## Configuração

### Painel

Navegue até `Dashboard → Context & Cache`:

- **Caveman** — seleção de modo, pacotes de idiomas, pré-visualização e predefinições globais
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

Isto permite-lhe utilizar compressão encadeada em fornecedores gratuitos/de programação, mantendo o
modo lite nas subscrições pagas.

Esta atribuição de "Substituição por combinação" é um controlo diferente da substituição do **modo de
compressão da combinação de encaminhamento** (Default/Off/Lite/Standard/Aggressive/Ultra) — essa
substituição não seleciona um pipeline de combinação de compressão com nome; apenas define o campo
`compressionMode` consultado por `resolveCompressionPlan`. Pode ser definida no cartão da combinação
(`Dashboard → Combos`) ou, desde a #6760, por combinação de encaminhamento na lista "Assign to routing"
em `Dashboard → Context & Cache → Compression Combos`, imediatamente ao lado da caixa de seleção de
atribuição do pipeline documentada acima. Ambas as interfaces persistem através do mesmo endpoint
`PUT /api/combos/{id}`.

### Substituição por pedido

Envie o cabeçalho de pedido `x-omniroute-compression` para substituir o plano de compressão num único
pedido. Tem a precedência mais elevada — sobrepõe-se à substituição da combinação de encaminhamento,
ao perfil ativo, ao acionamento automático e à predefinição do painel. Os valores desconhecidos são
ignorados (o pedido nunca é rejeitado) e o interruptor principal global continua a controlar tudo:
quando a compressão está globalmente desativada, o cabeçalho não consegue ativá-la. Valores:

| Valor         | Efeito                                                                                                    |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| `off`         | Sem compressão para este pedido.                                                                          |
| `default`     | O perfil predefinido derivado do painel (ignora o perfil ativo).                                          |
| `engine:<id>` | Um único motor, quando ativado, por exemplo, `engine:rtk`.                                                |
| `<combo>`     | Uma combinação com nome, primeiro por nome (sem distinção entre maiúsculas e minúsculas) e depois por ID. |

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

# Testar o RTK diretamente com metadados de comando opcionais
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
palavras-passe, tokens e segredos antes de qualquer informação ser armazenada.

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

| Fase    | Modos                                                                                                                                                                | Estado     |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Fase 1  | Desativado, Lite                                                                                                                                                     | ✅ Lançada |
| Fase 2  | Standard, Aggressive, Ultra                                                                                                                                          | ✅ Lançada |
| Fase 3  | RTK, Stacked, Combinações de Compressão                                                                                                                              | ✅ Lançada |
| Fase 4  | Estilos de Saída, Ultra de nível SLM, infraestrutura de avaliação                                                                                                    | ✅ Lançada |
| Fase 4C | Orçamento de contexto adaptativo ("seletor") — motor de computação + API (`contextBudget` em `PUT /api/settings/compression`) + controlos de modo/política no painel | ✅ Lançada |

---

## Agradecimentos

As regras de compressão do modo Standard são inspiradas no **[Caveman](https://github.com/JuliusBrussee/caveman)** de **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — o projeto viral "porquê usar muitos tokens quando poucos tokens resolvem". O Caveman comunica `~75%` menos tokens de saída, uma poupança média de `65%` nos tokens de saída em testes de desempenho, um intervalo de `22-87%` na saída e uma ferramenta de compressão de entrada de `~46%`.

O modo RTK é inspirado no **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** da **[RTK AI](https://github.com/rtk-ai)** — o projeto de compressão de alto desempenho para resultados de comandos de terminal, compilação, testes, git e filtragem de resultados de ferramentas. O RTK comunica poupanças de `60-90%`, com a sessão de exemplo no seu README a demonstrar uma poupança de `~80%`.

---

## Sistemas de Compressão Avançados

Para além dos 7 modos padrão, o OmniRoute inclui vários sistemas de compressão
avançados que funcionam automaticamente com base no contexto.

### Compressão Sensível à Cache

Alguns fornecedores (como a Anthropic com cache de prompts) suportam **cache de prompts**,
o que lhes permite armazenar em cache partes do prompt para reduzir custos e latência. Quando
a cache está ativada, a compressão agressiva pode, na verdade, **prejudicar** o desempenho
porque altera os tokens armazenados em cache, invalidando-a.

O módulo `cachingAware.ts` resolve este problema ao **detetar o contexto de cache** e
**ajustar a estratégia de compressão** em conformidade.

#### Como funciona

1. **Detetar o contexto de cache** — Analisa o corpo do pedido à procura de marcadores `cache_control`
2. **Identificar fornecedores com cache** — Verifica se o fornecedor de destino suporta cache
3. **Ajustar a estratégia** — Reduz `aggressive`/`ultra` para `standard` em fornecedores com cache
4. **Ignorar o prompt de sistema** — Os prompts de sistema são geralmente armazenados em cache, pelo que não devem ser comprimidos
5. **Utilizar transformações determinísticas** — Utiliza apenas transformações que produzem resultados consistentes

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
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Quando utilizar

A compressão sensível à cache está **sempre ativa** — não é necessária qualquer configuração. Só é acionada
quando:

- O pedido contém marcadores `cache_control`
- O fornecedor de destino suporta cache de prompts (Anthropic, OpenAI, etc.)

### Envelhecimento Progressivo

As conversas longas acumulam muitas interações de mensagens, mas as interações mais antigas tornam-se menos
relevantes. O módulo `progressiveAging.ts` **degrada as mensagens com base na distância entre interações**:

- **Interações recentes (0-3)**: Mantidas na íntegra (detalhe completo)
- **Interações intermédias (4-8)**: Compressão Lite (limpeza de espaços em branco e formatação)
- **Interações antigas (9+)**: Compressão Caveman (remoção de conteúdo supérfluo e resumo)
- **Interações muito antigas (20+)**: Fortemente resumidas ou removidas

#### Exemplo de código

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... mais 50 interações ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Primeiras 3 interações: na íntegra
  light: 8, // Interações 4-8: compressão lite
  moderate: 20, // Interações 9-20: compressão caveman
  // Interações 21+: resumo intensivo
});

// saved = número de tokens poupados
```

#### Quando utilizar

O envelhecimento progressivo está **sempre ativo** nos modos `aggressive` e `ultra`. É
particularmente eficaz para:

- Sessões de programação prolongadas
- Conversas de vários dias
- Fluxos de trabalho agênticos com muitas chamadas de ferramentas

### Modo de saída Caveman

O módulo `outputMode.ts` injeta **instruções no prompt de sistema** para fazer com que o
próprio modelo produza uma saída comprimida e concisa (um estilo "caveman").

#### Como funciona

Em vez de comprimir a entrada, este modo adiciona um prompt de sistema como:

> "Responde com o mínimo de palavras. Evita cortesias. Usa frases curtas."

Isto funciona particularmente bem para:

- Geração de código (saída mais concisa = menos tokens)
- Perguntas e respostas rápidas (sem necessidade de explicações elaboradas)
- Processamento em lote (maximiza o débito)

#### Quando utilizar

O modo de saída Caveman é **opcional** — defina-o através da configuração combo:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### Estilos de saída (catálogo)

O modo de saída Caveman acima é o **mecanismo legado de estilo único**. A Fase 4
generalizou-o num catálogo de estilos de saída combináveis: `OUTPUT_STYLE_CATALOG` em
`open-sse/services/compression/outputStyles/catalog.ts`. Cada estilo é uma instrução
de prompt de sistema que faz com que o próprio modelo produza uma saída mais económica;
os estilos podem ser ativados em conjunto e são injetados pela ordem do catálogo.

| Estilo                                         | `id`          | O que faz                                                                                                                                                                                                                               | Idiomas das instruções                                                                      |
| ---------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Prosa concisa                                  | `terse-prose` | Remove texto supérfluo/artigos/hesitações; mantém a substância técnica exata. O mesmo texto do modo de saída Caveman legado (referenciado, não reescrito).                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                               |
| Menos código                                   | `less-code`   | Escada YAGNI: a menor alteração funcional, sem abstrações não solicitadas.                                                                                                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                               |
| Rabo de cavalo (programador sénior preguiçoso) | `ponytail`    | "O melhor código é aquele que nunca foi escrito": reutilizar > reescrever, causa raiz > sintoma, o menor diff funcional.                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                               |
| Tenho PHDA (ação primeiro)                     | `i-have-adhd` | Ação primeiro (comando/caminho/excerto antes da prosa), passos numerados e limitados, UM próximo passo concreto, sem preâmbulo/recapitulação/despedidas. Adaptado de [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                               |
| CJK conciso (文言)                             | `terse-cjk`   | Estilo ultraconciso em chinês clássico.                                                                                                                                                                                                 | zh (restringido pela localidade: apenas é disponibilizado quando o idioma resolvido é `zh`) |

Cada estilo inclui três níveis de intensidade — `lite`, `full`, `ultra` — e todos os níveis
terminam com a cláusula de limites partilhada, que mantém os blocos de código, caminhos
de ficheiros, comandos, cadeias de erro, URLs e identificadores inalterados.

#### Como funciona a injeção

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) resolve
a seleção em relação ao catálogo (ids desconhecidos e estilos incompatíveis com a
localidade são ignorados, nunca constituindo um erro), concatena as instruções
selecionadas pela ordem do catálogo, acrescenta a cláusula de limites **uma única vez**
e coloca o resultado no início do prompt de sistema, após um único marcador de
idempotência (`[OmniRoute Output Styles]`) — voltar a aplicar não tem qualquer efeito.
Quando o idioma detetado do pedido tem uma tradução, é injetada a instrução localizada
em vez da inglesa.

#### Como ativar

No painel: **Contexto → Definições → Compressão** — uma linha por estilo, com um
interruptor para ativar/desativar e um seletor de nível. Programaticamente, a
configuração de compressão guarda a seleção como:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Retrocompatibilidade: a definição combo legada `outputMode: "caveman"` continua a
funcionar e é mapeada para `terse-prose`, sendo idêntica ao nível dos bytes à injeção
antiga em todos os idiomas legados.

Seleção do idioma: com `languageConfig.enabled` ativo, `autoDetect` seleciona o
idioma da mensagem mais recente do utilizador (o mesmo detetor dos motores de entrada);
desativar `autoDetect` fixa `defaultLanguage`. Desativado → inglês.

A matriz estilo × idioma é fixada por
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: um novo estilo não pode ser
disponibilizado sem, pelo menos, uma tradução pt-BR (ou uma exceção explícita
registada), e um estilo existente não pode perder silenciosamente uma localidade. Para
adicionar um estilo, consulte
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compressão de resultados de ferramentas

O módulo `toolResultCompressor.ts` fornece **5 estratégias de compressão especializadas**
para resultados de ferramentas (chamadas de funções, saídas de agentes, resultados de pesquisa, etc.):

1. **Compressão de resultados de pesquisa** — Remove resultados redundantes e mantém os N primeiros
2. **Compressão de leitura de ficheiros** — Trunca ficheiros grandes e preserva cabeçalhos/importações
3. **Compressão da execução de código** — Mantém apenas o stdout/stderr essencial
4. **Compressão de consultas à base de dados** — Limita as linhas e remove metadados verbosos
5. **Compressão de respostas de API** — Remove campos nulos e condensa arrays

#### Quando utilizar

A compressão de resultados de ferramentas está **sempre ativa** quando existem chamadas
de ferramentas. Não é necessária qualquer configuração.

### Pipeline empilhado

O modo empilhado executa **vários motores em sequência** — geralmente RTK primeiro
(60–90% de poupança na saída de ferramentas) e depois Caveman (30% de poupança adicional
no texto restante). Isto permite obter uma **poupança total de 78–95%**.

#### Como funciona

```
Entrada (1000 tokens)
  → RTK (filtro consciente dos comandos) → 200 tokens
    → Caveman (remoção de texto supérfluo) → 140 tokens
  → Saída (140 tokens, 86% de poupança)
```

#### Quando utilizar

Utilize o modo empilhado para:

- Fluxos de trabalho que utilizam muitas ferramentas (programação agêntica, investigação)
- Processamento em lote sensível a custos
- Quando necessita da máxima poupança de tokens

Configure através da configuração combo:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## Substituições da Compressão por Combo

Pode substituir o modo de compressão global **por combo** para ajustar o comportamento
a diferentes casos de utilização:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

Isto é útil para:

- **Combos de programação**: Utilize o modo `aggressive` para sessões longas
- **Combos de perguntas e respostas rápidas**: Utilize o modo `lite` para respostas rápidas
- **Combos com utilização intensiva de ferramentas**: Utilize o modo `stacked` para obter a máxima poupança
- **Combos de produção**: Utilize o modo `cache-aware` para fornecedores com colocação em cache

---

## Consulte Também

- [Configuração do Ambiente](../reference/ENVIRONMENT.md) — Variáveis de ambiente de compressão
- [Guia de Arquitetura](../architecture/ARCHITECTURE.md) — Funcionamento interno do pipeline de compressão
- [Guia do Utilizador](../guides/USER_GUIDE.md) — Primeiros passos com a compressão
- [Compressão RTK](./RTK_COMPRESSION.md) — Filtros RTK, modelo de confiança, mecanismo de verificação e recuperação da saída não processada
- [Motores de Compressão](./COMPRESSION_ENGINES.md) — Caveman, RTK, empilhamento, APIs, MCP e painel
- [Formato das Regras de Compressão](./COMPRESSION_RULES_FORMAT.md) — Formato JSON dos pacotes de regras
- [Pacotes de Idiomas de Compressão](./COMPRESSION_LANGUAGE_PACKS.md) — Regras Caveman específicas do idioma
