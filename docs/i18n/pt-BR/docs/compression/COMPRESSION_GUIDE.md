# 🗜️ Prompt Compression Guide — OmniRoute (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Economize automaticamente de 15% a 95% no contexto elegível. Para uma visão geral rápida, consulte a [seção de compressão do README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Visão geral

O OmniRoute implementa um pipeline modular de compressão de prompts executado **proativamente** antes que as solicitações cheguem aos provedores upstream. Isso significa que a economia de tokens ocorre de forma transparente — nenhuma alteração no seu fluxo de trabalho é necessária.

```
Solicitação do cliente
  → Seletor de estratégia de compressão
    → Substituição por combo? → Usar configuração do combo
    → Limite de acionamento automático? → Usar modo automático
    → Modo padrão? → Usar configuração global
    → Desativado? → Ignorar compressão
  → Modo de compressão selecionado
    → Desativado: Sem compressão
    → Leve: Limpeza segura de espaços em branco/formatação (~15%)
    → Padrão: Remoção de palavras supérfluas no estilo telegráfico (~30%)
    → Agressivo: Envelhecimento do histórico + sumarização (~50%)
    → Ultra: Poda heurística + redução de blocos de código (~75%)
    → RTK: Filtragem de saída de terminal/ferramentas sensível a comandos (faixa upstream de 60-90%)
    → Empilhado: Pipeline ordenado com vários mecanismos, geralmente RTK e depois Caveman (faixa elegível de 78-95%)
  → Solicitação comprimida → Provedor
```

---

## Modos de compressão

### Desativado

Nenhuma compressão é aplicada. Todas as mensagens passam sem alterações.

### Modo leve (~15% de economia, latência <1ms)

O modo mais seguro — nenhuma alteração semântica, apenas limpeza de formatação:

| Técnica                  | Descrição                                               |
| ------------------------ | ------------------------------------------------------- |
| `collapseWhitespace`     | Mescla linhas em branco consecutivas e espaços ao final |
| `dedupSystemPrompt`      | Remove mensagens de sistema duplicadas                  |
| `compressToolResults`    | Comprime saídas detalhadas de ferramentas/funções       |
| `removeRedundantContent` | Remove instruções repetidas                             |
| `replaceImageUrls`       | Encurta URIs de dados de imagem em base64               |

**Ideal para:** Uso contínuo e fluxos de trabalho críticos para a segurança.

### Modo padrão (~30% de economia)

Inspirado no [Caveman](https://github.com/JuliusBrussee/caveman) — remove palavras supérfluas e formulações prolixas, preservando o significado:

- Remove palavras supérfluas ("por favor", "eu acho", "basicamente", "na verdade")
- Condensa expressões prolixas ("com o objetivo de" → "para", "como resultado de" → "porque")
- Remove atenuações excessivamente educadas ("Você se importaria de...", "Se você pudesse, por acaso...")
- Mais de 30 regras de expressões regulares ajustadas para prompts de programação

**Ideal para:** Fluxos diários de programação e equipes preocupadas com custos.

### Modo agressivo (~50% de economia)

Gerenciamento inteligente de histórico para sessões longas:

- **Envelhecimento de mensagens** — mensagens mais antigas são progressivamente comprimidas
- **Sumarização de resultados de ferramentas** — saídas longas de ferramentas são substituídas por resumos
- **Proteções de integridade estrutural** — garantem que os pares `tool_use` + `tool_result` permaneçam consistentes
- **Consideração da janela de contexto** — respeita os limites de tokens de cada modelo

**Ideal para:** Sessões prolongadas de depuração e grandes bases de código.

### Modo ultra (~75% de economia)

Compressão máxima para cenários em que os tokens são críticos:

- **Poda heurística** — remove mensagens abaixo do limite de relevância
- **Redução de blocos de código** — comprime exemplos de código repetitivos
- **Truncamento por busca binária** — encontra o ponto de corte ideal para a janela de contexto
- Inclui todos os recursos do modo agressivo

**Ideal para:** Quando você atinge repetidamente os limites de contexto.

### Modo RTK (faixa upstream de 60-90%)

O modo RTK é otimizado para saídas detalhadas de ferramentas que aparecem em sessões de agentes de programação:

- Detecta classes de comandos/saídas, como `git status`, `git diff`, `git log`, executores de testes,
  builds do TypeScript/Vite/Webpack, ESLint/Biome/Prettier, auditorias/instalações do npm, logs do Docker, saídas de
  infraestrutura e saídas genéricas de shell
- Aplica pacotes de filtros JSON de `open-sse/services/compression/engines/rtk/filters/`
- Importa filtros do esquema RTK TOML v1 de arquivos `filters.toml` do projeto ou globais, com validação
  de testes inline e controle de confiança para arquivos do projeto
- Inclui 49 filtros integrados com amostras de verificação inline
- Remove sequências de controle ANSI, barras de progresso, linhas repetidas e ruído que não exige ação
- Preserva falhas, erros, avisos, arquivos alterados, resumos e o final de saídas longas
- Oferece suporte a filtros de projeto com controle de confiança, filtros globais e recuperação opcional da saída bruta com dados sensíveis ocultados

**Ideal para:** Sessões de agentes com transcrições de shell, build, teste, git, grep e saída de arquivos.

### Modo empilhado (faixa elegível de 78-95%)

O modo empilhado executa vários mecanismos de compressão em uma ordem determinística. O pipeline padrão é:

```txt
RTK -> Caveman
```

Essa ordem primeiro mantém compacta a saída de terminal/ferramentas e depois aplica a condensação semântica do Caveman ao
prompt restante em linguagem natural. Os pipelines empilhados podem ser configurados globalmente ou por meio de
combos de compressão atribuídos a combos de roteamento.

**Ideal para:** Contexto misto com grandes logs de ferramentas, além de instruções humanas ou resumos do assistente.

---

## Cálculo da economia upstream

O OmniRoute documenta a economia com compressão a partir de duas fontes: benchmarks de projetos upstream e
a composição dos próprios mecanismos do OmniRoute.

| Fonte   | Número do README upstream usado aqui                                                                                                           |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` menos tokens de saída, `65%` de economia média de saída no benchmark, faixa de `22-87%` e ferramenta de compressão de entrada de `~46%` |
| RTK     | Economia de `60-90%` na saída de comandos; sessão de exemplo com `~118,000 -> ~23,900` tokens, ou `79.7%` de economia (`~80%`)                 |

Para payloads sobrepostos de ferramenta/contexto, a combinação padrão do OmniRoute empilha os mecanismos:

```txt
RTK -> Caveman
```

A economia combinada é multiplicativa, não aditiva:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Esse número de `78-95%` se aplica quando tanto o RTK quanto o Caveman conseguem reduzir o mesmo payload de entrada/contexto.
O modo de saída de resposta do Caveman é separado: quando ativado, use a própria economia de saída do Caveman (`65%`
em média, destaque de `~75%`, faixa de `22-87%`). A economia total na cobrança depende da proporção entre prompts e saídas.

### O que "qualificado" realmente significa

A faixa de destaque de 15-95% é real, mas se aplica apenas a conteúdo **redundante ou excessivamente verboso** — linhas de
erro repetidas, um log de build que repete incessantemente o mesmo aviso, um despejo superdimensionado de `grep`/leitura de arquivo. Isso
**não** significa que toda solicitação economize tanto.

Verificado empiricamente (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): uma
execução `stacked` (RTK + Caveman) em um bloco `tool_result` no formato da Anthropic contendo 300 linhas de
erro idênticas produziu **95.93% de economia de tokens / 96.26% de economia de caracteres** — exatamente dentro da faixa
anunciada. Porém, o mesmo pipeline executado em uma saída de ferramenta normal e não redundante (uma lista limpa de correspondências de `grep`,
uma leitura curta de arquivo, texto conversacional comum) produz corretamente **economia próxima de zero**, porque
não há nada repetitivo para remover, e `validateCompression()` (`validation.ts`) se recusa a enviar uma
reescrita que removeria ou alteraria blocos de código, URLs, títulos, versões ou identificadores de constantes em MAIÚSCULAS.

Esse é o comportamento esperado e seguro, não um bug: uma sessão de programação que principalmente lê/pesquisa com grep em arquivos limpos
terá uma economia total modesta mesmo com a compressão totalmente ativada, enquanto uma sessão que encontra um
loop com falha ou um linter excessivamente verboso terá a faixa completa de 78-95% nesse tráfego. Não use a baixa
porcentagem de economia agregada de uma única sessão como evidência de que a compressão está configurada incorretamente — primeiro verifique se a
saída subjacente da ferramenta era realmente redundante.

---

## Visualização da economia de tokens

```
Sem compressão: 47K tokens enviados ao LLM
Com Lite:       40K tokens enviados          (15% de economia — seguro, sempre ativo)
Com Standard:   33K tokens enviados          (30% de economia — regras de caveman-speak)
Com Aggressive: 24K tokens enviados          (50% de economia — envelhecimento + sumarização)
Com Ultra:      12K tokens enviados          (75% de economia — poda heurística)
Com RTK:        19K-5K tokens enviados       (60-90% de economia na saída de comandos/ferramentas)
Com Stacked:    10K-2.5K tokens enviados     (faixa qualificada de 78-95% do RTK+Caveman)
```

---

## Configuração

### Painel

Navegue até `Painel → Contexto e Cache`:

- **Caveman** — seleção de modo, pacotes de idiomas, pré-visualização e padrões globais
- **RTK** — pré-visualização do filtro de comandos, configurações de segurança do RTK e catálogo de filtros
- **Combos de compressão** — pipelines de mecanismos nomeados atribuídos a combos de roteamento
- **Limite de acionamento automático** — ativa automaticamente a compressão quando a contagem de tokens excede o limite

### Substituição por combo

Em `Painel → Contexto e Cache → Combos de compressão`, atribua um combo de compressão a um combo de
roteamento:

```txt
Combo: "free-tier-fallback"
  Combo de compressão: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Destinos:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Isso permite usar compressão empilhada em provedores gratuitos/de programação, mantendo o modo leve
nas assinaturas pagas.

Essa atribuição de "Substituição por combo" é um controle diferente da substituição do **modo de
compressão do combo de roteamento** (Padrão/Desativado/Leve/Normal/Agressivo/Ultra) — essa
substituição não seleciona um pipeline de combo de compressão nomeado; ela apenas define o campo
`compressionMode` consultado por `resolveCompressionPlan`. Ela pode ser definida no cartão do combo
(`Painel → Combos`) ou, desde a #6760, por combo de roteamento na lista "Atribuir ao roteamento" em
`Painel → Contexto e Cache → Combos de compressão`, ao lado da caixa de seleção de atribuição de
pipeline documentada acima. Ambas as interfaces persistem por meio do mesmo endpoint
`PUT /api/combos/{id}`.

### Substituição por requisição

Envie o cabeçalho de requisição `x-omniroute-compression` para substituir o plano de compressão de
uma única requisição. Ele tem a precedência mais alta — prevalece sobre a substituição do combo de
roteamento, o perfil ativo, o acionamento automático e o padrão do painel. Valores desconhecidos são
ignorados (a requisição nunca é rejeitada), e o controle mestre global ainda governa tudo: quando a
compressão está desativada globalmente, o cabeçalho não pode ativá-la. Valores:

| Valor         | Efeito                                                                                                         |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| `off`         | Sem compressão para esta requisição.                                                                           |
| `default`     | O perfil Padrão derivado do painel (ignora o perfil ativo).                                                    |
| `engine:<id>` | Um único mecanismo, quando ativado, por exemplo, `engine:rtk`.                                                 |
| `<combo>`     | Um combo nomeado, correspondido primeiro pelo nome (sem diferenciar maiúsculas e minúsculas) e depois pelo ID. |

O plano aplicado é retornado no cabeçalho de resposta
`X-OmniRoute-Compression: <mode>; source=<source>`, em que `<source>` é um dos seguintes:
`request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` ou `off`.

### API

```bash
# Obter as configurações de compressão
curl http://localhost:20128/api/settings/compression

# Atualizar as configurações de compressão
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Pré-visualizar um payload RTK/empilhado específico
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Listar os pacotes de filtros do RTK
curl http://localhost:20128/api/context/rtk/filters

# Testar o RTK diretamente com metadados opcionais do comando
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## O que é protegido

O mecanismo de compactação **sempre preserva:**

- ✅ Blocos de código (delimitados e inline)
- ✅ URLs e caminhos de arquivos
- ✅ Estruturas JSON e dados estruturados
- ✅ Identificadores e tokens técnicos protegidos
- ✅ Expressões matemáticas
- ✅ Definições de chamadas de ferramentas/funções
- ✅ Prompts de sistema (no modo lite)

A recuperação da saída bruta do RTK oculta chaves de API comuns, tokens bearer, tokens do Slack, chaves de acesso da AWS,
senhas, tokens e segredos antes que qualquer informação seja persistida.

---

## Estatísticas de compactação

Cada solicitação compactada inclui estatísticas nos logs do servidor:

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

## Roteiro de fases

| Fase    | Modos                                                                                                                                                                 | Status     |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Fase 1  | Off, Lite                                                                                                                                                             | ✅ Lançada |
| Fase 2  | Standard, Aggressive, Ultra                                                                                                                                           | ✅ Lançada |
| Fase 3  | RTK, Stacked, combinações de compactação                                                                                                                              | ✅ Lançada |
| Fase 4  | Estilos de saída, Ultra de nível SLM, infraestrutura de avaliação                                                                                                     | ✅ Lançada |
| Fase 4C | Orçamento de contexto adaptativo ("dial") — mecanismo de computação + API (`contextBudget` em `PUT /api/settings/compression`) + controles de modo/política no painel | ✅ Lançada |

---

## Agradecimentos

As regras de compactação do modo Standard são inspiradas no **[Caveman](https://github.com/JuliusBrussee/caveman)**, de **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — o projeto viral "por que usar muitos token quando poucos token resolver". O Caveman relata `~75%` menos tokens de saída, economia média de `65%` na saída em benchmarks, uma faixa de `22-87%` na saída e uma ferramenta de compactação de entrada de `~46%`.

O modo RTK é inspirado no **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**, da **[RTK AI](https://github.com/rtk-ai)** — o projeto de alto desempenho para compactação de saída de comandos do terminal, builds, testes, git e filtragem de saídas de ferramentas. O RTK relata uma economia de `60-90%`, e a sessão de exemplo em seu README mostra uma economia de `~80%`.

---

## Sistemas avançados de compactação

Além dos 7 modos padrão, o OmniRoute inclui vários sistemas avançados de compactação
que funcionam automaticamente de acordo com o contexto.

### Compactação sensível ao cache

Alguns provedores (como a Anthropic, com cache de prompts) oferecem suporte a **cache de prompts**,
o que permite armazenar partes do prompt em cache para reduzir custos e latência. Quando
o cache está habilitado, uma compactação agressiva pode, na verdade, **prejudicar** o desempenho
porque altera os tokens armazenados em cache, invalidando-o.

O módulo `cachingAware.ts` resolve isso **detectando o contexto de cache** e
**ajustando a estratégia de compactação** de acordo.

#### Como funciona

1. **Detecta o contexto de cache** — Examina o corpo da solicitação em busca de marcadores `cache_control`
2. **Identifica provedores com cache** — Verifica se o provedor de destino oferece suporte a cache
3. **Ajusta a estratégia** — Rebaixa `aggressive`/`ultra` para `standard` em provedores com cache
4. **Ignora o prompt de sistema** — Os prompts de sistema geralmente ficam em cache, portanto, não são compactados
5. **Usa transformações determinísticas** — Usa somente transformações que produzem uma saída consistente

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

#### Quando usar

A compactação sensível ao cache fica **sempre ativada** — nenhuma configuração é necessária. Ela só entra em ação
quando:

- A solicitação contém marcadores `cache_control`
- O provedor de destino oferece suporte a cache de prompts (Anthropic, OpenAI etc.)

### Envelhecimento progressivo

Conversas longas acumulam muitos turnos de mensagens, mas os turnos mais antigos se tornam menos
relevantes. O módulo `progressiveAging.ts` **degrada as mensagens de acordo com a distância entre turnos**:

- **Turnos recentes (0-3)**: Mantidos na íntegra (todos os detalhes)
- **Turnos intermediários (4-8)**: Compactação Lite (limpeza de espaços em branco e formatação)
- **Turnos antigos (9+)**: Compactação Caveman (remoção de conteúdo supérfluo e sumarização)
- **Turnos muito antigos (20+)**: Fortemente sumarizados ou descartados

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
  verbatim: 3, // Primeiros 3 turnos: na íntegra
  light: 8, // Turnos 4-8: compactação lite
  moderate: 20, // Turnos 9-20: compactação caveman
  // Turnos 21+: sumarização intensa
});

// saved = número de tokens economizados
```

#### Quando usar

O envelhecimento progressivo está **sempre ativado** nos modos `aggressive` e `ultra`. Ele é
particularmente eficaz para:

- Sessões prolongadas de programação
- Conversas que duram vários dias
- Fluxos de trabalho agênticos com muitas chamadas de ferramentas

### Modo de saída Homem das Cavernas

O módulo `outputMode.ts` injeta **instruções no prompt do sistema** para fazer com que o
próprio modelo produza uma saída comprimida e concisa (um estilo "homem das cavernas").

#### Como funciona

Em vez de comprimir a entrada, esse modo adiciona um prompt do sistema como:

> "Responda com o mínimo de palavras. Evite cortesias. Use frases curtas."

Isso funciona particularmente bem para:

- Geração de código (saída mais concisa = menos tokens)
- Perguntas e respostas rápidas (não há necessidade de explicações elaboradas)
- Processamento em lote (maximiza a taxa de transferência)

#### Quando usar

O modo de saída Homem das Cavernas é **opcional** — defina-o por meio da configuração combinada:

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

O modo de saída Homem das Cavernas acima é o **caminho legado de estilo único**. A Fase 4 o generalizou
em um catálogo de estilos de saída combináveis: `OUTPUT_STYLE_CATALOG` em
`open-sse/services/compression/outputStyles/catalog.ts`. Cada estilo é uma instrução de prompt
do sistema que faz com que o próprio modelo produza uma saída mais econômica; os estilos podem ser habilitados
em conjunto e são injetados na ordem do catálogo.

| Estilo                                           | `id`          | O que faz                                                                                                                                                                                                                                  | Idiomas das instruções                                                            |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Prosa concisa                                    | `terse-prose` | Remove texto supérfluo/artigos/ressalvas; mantém a essência técnica exata. Mesmo texto do modo de saída Homem das Cavernas legado (referenciado, não redigitado).                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                     |
| Menos código                                     | `less-code`   | Escada YAGNI: a menor alteração funcional, sem abstrações não solicitadas.                                                                                                                                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                     |
| Rabo de cavalo (desenvolvedor sênior preguiçoso) | `ponytail`    | "O melhor código é aquele que nunca foi escrito": reutilizar > reescrever, causa raiz > sintoma, menor diff funcional.                                                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                     |
| Tenho TDAH (ação primeiro)                       | `i-have-adhd` | Ação primeiro (comando/caminho/trecho antes da prosa), etapas numeradas e limitadas, UMA próxima etapa concreta, sem preâmbulo/recapitulação/encerramentos. Adaptado de [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                     |
| CJK conciso (文言)                               | `terse-cjk`   | Estilo ultraconciso do chinês clássico.                                                                                                                                                                                                    | zh (restrito pela localidade: oferecido somente quando o idioma resolvido é `zh`) |

Cada estilo oferece três níveis de intensidade — `lite`, `full`, `ultra` — e todos os níveis
terminam com a cláusula de limites compartilhada, que mantém blocos de código, caminhos de arquivos, comandos,
mensagens de erro, URLs e identificadores inalterados.

#### Como funciona a injeção

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) resolve
a seleção em relação ao catálogo (ids desconhecidos e estilos incompatíveis com a localidade são
descartados, sem jamais causar erro), concatena as instruções selecionadas na ordem do catálogo,
acrescenta a cláusula de limites **uma vez** e coloca o resultado no início do prompt do sistema
após um único marcador de idempotência (`[OmniRoute Output Styles]`) — reaplicá-lo
não produz efeito. Quando o idioma detectado da solicitação tem uma tradução, a instrução
localizada é injetada no lugar da versão em inglês.

#### Como habilitar

No painel: **Contexto → Configurações → Compressão** — uma linha por estilo, com um
controle de ativação/desativação e um seletor de nível. Programaticamente, a configuração de compressão persiste
a seleção como:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Compatibilidade retroativa: a configuração combinada legada `outputMode: "caveman"` ainda funciona e é mapeada para
`terse-prose`, sendo idêntica byte a byte à injeção antiga em todos os idiomas legados.

Seleção de idioma: com `languageConfig.enabled` ativado, `autoDetect` escolhe o
idioma da mensagem mais recente do usuário (o mesmo detector usado pelos mecanismos de entrada);
desativar `autoDetect` fixa o `defaultLanguage`. Desativado → inglês.

A matriz estilo × idioma é fixada por
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: um novo estilo não pode ser lançado
sem pelo menos uma tradução para pt-BR (ou uma exceção explícita rastreada), e um
estilo existente não pode perder silenciosamente uma localidade. Para adicionar um estilo, consulte
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compressão de resultados de ferramentas

O módulo `toolResultCompressor.ts` fornece **5 estratégias de compressão especializadas**
para resultados de ferramentas (chamadas de funções, saídas de agentes, resultados de pesquisa etc.):

1. **Compressão de resultados de pesquisa** — Remove resultados redundantes, mantém os N principais
2. **Compressão de leitura de arquivos** — Trunca arquivos grandes, preserva cabeçalhos/importações
3. **Compressão de execução de código** — Mantém apenas stdout/stderr essenciais
4. **Compressão de consultas ao banco de dados** — Limita linhas, remove metadados detalhados
5. **Compressão de respostas de API** — Remove campos nulos, condensa arrays

#### Quando usar

A compressão de resultados de ferramentas está **sempre ativada** quando há chamadas de ferramentas. Nenhuma
configuração é necessária.

### Pipeline empilhado

O modo empilhado executa **vários mecanismos em sequência** — geralmente primeiro o RTK
(economia de 60–90% na saída das ferramentas), seguido pelo Homem das Cavernas (economia adicional de 30% no
texto restante). Isso alcança uma **economia total de 78–95%**.

#### Como funciona

```
Entrada (1000 tokens)
  → RTK (filtro ciente de comandos) → 200 tokens
    → Homem das Cavernas (remoção de texto supérfluo) → 140 tokens
  → Saída (140 tokens, economia de 86%)
```

#### Quando usar

Use o modo empilhado para:

- Fluxos de trabalho com uso intenso de ferramentas (programação agêntica, pesquisa)
- Processamento em lote sensível a custos
- Quando você precisar da máxima economia de tokens

Configure por meio da configuração combinada:

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

## Substituições de Compressão por Combo

Você pode substituir o modo de compressão global **por combo** para ajustar com precisão o comportamento
para diferentes casos de uso:

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

Isso é útil para:

- **Combos de programação**: use o modo `aggressive` para sessões longas
- **Combos de perguntas e respostas rápidas**: use o modo `lite` para respostas rápidas
- **Combos com uso intensivo de ferramentas**: use o modo `stacked` para obter a máxima economia
- **Combos de produção**: use o modo `cache-aware` para provedores com cache

---

## Veja Também

- [Configuração do Ambiente](../reference/ENVIRONMENT.md) — Variáveis de ambiente de compressão
- [Guia de Arquitetura](../architecture/ARCHITECTURE.md) — Detalhes internos do pipeline de compressão
- [Guia do Usuário](../guides/USER_GUIDE.md) — Introdução à compressão
- [Compressão RTK](./RTK_COMPRESSION.md) — Filtros RTK, modelo de confiança, porta de verificação e recuperação da saída bruta
- [Mecanismos de Compressão](./COMPRESSION_ENGINES.md) — Caveman, RTK, empilhamento, APIs, MCP e painel
- [Formato das Regras de Compressão](./COMPRESSION_RULES_FORMAT.md) — Formato de pacote de regras JSON
- [Pacotes de Idiomas para Compressão](./COMPRESSION_LANGUAGE_PACKS.md) — Regras do Caveman específicas para cada idioma
