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

- **Caveman** — seleção de modo, pacotes de idioma, visualização e padrões globais
- **RTK** — visualização de filtro de comando, configurações de segurança RTK e catálogo de filtros
- **Combos de Compressão** — pipelines de motor nomeados atribuídos a combos de roteamento
- **Limite de Acionamento Automático** — ativa automaticamente a compressão quando a contagem de tokens excede o limite

### Sobrescrita por Combo

Em `Painel → Contexto e Cache → Combos de Compressão`, atribua um combo de compressão a um combo de roteamento:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Isso permite que você use compressão empilhada em provedores gratuitos/de codificação, mantendo o modo lite em assinaturas pagas.

Esta atribuição de "Sobrescrita por Combo" é um controle diferente da sobrescrita do **modo de compressão do combo de roteamento** (Padrão/Desligado/Lite/Padrão/Agressivo/Ultra) — essa sobrescrita não seleciona um pipeline de combo de compressão nomeado; ela apenas define o campo `compressionMode` consultado por `resolveCompressionPlan`. Pode ser configurado tanto no cartão do combo (`Painel → Combos`) quanto, desde #6760, por combo de roteamento na lista "Atribuir ao roteamento" em `Painel → Contexto e Cache → Combos de Compressão`, logo ao lado da caixa de seleção de atribuição de pipeline documentada acima. Ambas as interfaces persistem através do mesmo endpoint `PUT /api/combos/{id}`.

### Sobrescrita por Requisição

Envie o cabeçalho de requisição `x-omniroute-compression` para sobrescrever o plano de compressão para uma única requisição. Ele tem a maior precedência — supera a sobrescrita do combo de roteamento, o perfil ativo, o acionamento automático e o Padrão do painel. Valores desconhecidos são ignorados (a requisição nunca é rejeitada) e o interruptor mestre global ainda controla tudo: quando a compressão está desativada globalmente, o cabeçalho não pode ativá-la. Valores:

| Valor         | Efeito                                                                                                        |
| :------------ | :------------------------------------------------------------------------------------------------------------ |
| `off`         | Nenhuma compressão para esta requisição.                                                                      |
| `default`     | O perfil Padrão derivado do painel (ignora o perfil ativo). Motores com perda são mantidos desativados.       |
| `safe`        | O mesmo que omitir o cabeçalho: apenas dedup e dobramento de espaços em branco.                               |
| `allow-lossy` | Mantém o plano de operador desta requisição, incluindo resumos, filtros de relevância e reescritas de estilo. |
| `engine:<id>` | Um único motor quando ativado, por exemplo, `engine:rtk`. Esta é a opção por requisição para esse motor.      |
| `<combo>`     | Um combo nomeado, correspondido primeiro pelo nome (não sensível a maiúsculas e minúsculas), depois pelo ID.  |

Sem `allow-lossy`, `engine:<id>` ou um combo nomeado, motores com perda não são aplicados. A requisição ainda recebe dedup de sessão e dobramento de espaços em branco quando a compressão está ativada.

O plano aplicado é retornado no cabeçalho de resposta `X-OmniRoute-Compression: <mode>; source=<source>`, onde `<source>` é um de `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` ou `off`.

### API

```bash
# Obter configurações de compressão
curl http://localhost:20128/api/settings/compression

# Atualizar configurações de compressão
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Visualizar um payload RTK/empilhado específico
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Listar pacotes de filtro RTK
curl http://localhost:20128/api/context/rtk/filters

# Testar RTK diretamente com metadados de comando opcionais
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

## Roteiro das Fases

| Fase    | Modos                                                                                                                                                             | Status      |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Fase 1  | Desligado, Lite                                                                                                                                                   | ✅ Entregue |
| Fase 2  | Padrão, Agressivo, Ultra                                                                                                                                          | ✅ Entregue |
| Fase 3  | RTK, Empilhado, Combos de Compressão                                                                                                                              | ✅ Entregue |
| Fase 4  | Estilos de Saída, Ultra de nível SLM, arnés de avaliação                                                                                                          | ✅ Entregue |
| Fase 4C | Orçamento de contexto adaptativo ("dial") — motor de computação + API (`contextBudget` em `PUT /api/settings/compression`) + controles de modo/política do painel | ✅ Entregue |

---

## Agradecimentos

As regras de compactação do modo Standard são inspiradas no **[Caveman](https://github.com/JuliusBrussee/caveman)**, de **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — o projeto viral "por que usar muitos token quando poucos token resolver". O Caveman relata `~75%` menos tokens de saída, economia média de `65%` na saída em benchmarks, uma faixa de `22-87%` na saída e uma ferramenta de compactação de entrada de `~46%`.

O modo RTK é inspirado no **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**, da **[RTK AI](https://github.com/rtk-ai)** — o projeto de alto desempenho para compactação de saída de comandos do terminal, builds, testes, git e filtragem de saídas de ferramentas. O RTK relata uma economia de `60-90%`, e a sessão de exemplo em seu README mostra uma economia de `~80%`.

---

## Sistemas de Compressão Avançados

Além dos 7 modos padrão, o OmniRoute inclui vários sistemas de compressão avançados que funcionam automaticamente com base no contexto.

### Compressão com Consciência de Cache

Alguns provedores (como a Anthropic com cache de prompt) suportam **cache de prompt**, o que lhes permite armazenar em cache partes do prompt para reduzir custos e latência. Quando o cache está ativado, a compressão agressiva pode, na verdade, **prejudicar** o desempenho porque altera os tokens em cache, invalidando o cache.

O módulo `cachingAware.ts` resolve isso **detectando o contexto de cache** e **ajustando a estratégia de compressão** de acordo.

#### Como funciona

1.  **Detectar contexto de cache** — Escaneia o corpo da requisição em busca de marcadores `cache_control`
2.  **Identificar provedores de cache** — Verifica se o provedor de destino suporta cache
3.  **Ajustar estratégia** — Rebaixa `aggressive`/`ultra` para `standard` para provedores de cache
4.  **Ignorar prompt do sistema** — Prompts do sistema geralmente são armazenados em cache, então não os comprima
5.  **Usar transformações determinísticas** — Use apenas transformações que produzam saída consistente

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

A compressão com consciência de cache está **sempre ativada** — nenhuma configuração é necessária. Ela só entra em ação quando:

- A requisição possui marcadores `cache_control`
- O provedor de destino suporta cache de prompt (Anthropic, OpenAI, etc.)

### Envelhecimento Progressivo

Conversas longas acumulam muitas rodadas de mensagens, mas as rodadas mais antigas se tornam menos relevantes. O módulo `progressiveAging.ts` **degrada as mensagens pela distância da rodada**:

- **Rodadas recentes (0-3)**: Mantidas na íntegra (detalhe completo)
- **Rodadas médias (4-8)**: Compressão leve (espaços em branco, limpeza de formatação)
- **Rodadas antigas (9+)**: Compressão "homem das cavernas" (remoção de preenchimento, sumarização)
- **Rodadas muito antigas (20+)**: Fortemente sumarizadas ou descartadas

#### Exemplo de código

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... mais 50 rodadas ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Primeiras 3 rodadas: na íntegra
  light: 8, // Rodadas 4-8: compressão leve
  moderate: 20, // Rodadas 9-20: compressão "homem das cavernas"
  // Rodadas 21+: sumarização pesada
});

// saved = número de tokens salvos
```

#### Quando usar

O envelhecimento progressivo está **sempre ativado** para os modos `aggressive` e `ultra`. É particularmente eficaz para:

- Sessões de codificação de longa duração
- Conversas de vários dias
- Fluxos de trabalho de agentes com muitas chamadas de ferramentas

### Modo de Saída "Homem das Cavernas"

O módulo `outputMode.ts` injeta **instruções de prompt do sistema** para fazer o próprio modelo produzir uma saída compactada e concisa (um estilo "homem das cavernas").

#### Como funciona

Em vez de comprimir a entrada, este modo adiciona um prompt do sistema como:

> "Responda com o mínimo de palavras. Pule as formalidades. Use frases curtas."

Isso funciona particularmente bem para:

- Geração de código (saída mais concisa = menos tokens)
- Perguntas e respostas rápidas (não há necessidade de explicações elaboradas)
- Processamento em lote (maximizar o rendimento)

#### Quando usar

O modo de saída "homem das cavernas" é **opcional** — defina-o através da configuração combinada:

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

### Estilos de Saída (catálogo)

O modo de saída "homem das cavernas" acima é o **caminho de estilo único legado**. A Fase 4 o generalizou em um catálogo de estilos de saída combináveis: `OUTPUT_STYLE_CATALOG` em `open-sse/services/compression/outputStyles/catalog.ts`. Cada estilo é uma instrução de prompt do sistema que faz o próprio modelo produzir uma saída mais barata; os estilos podem ser ativados juntos e são injetados na ordem do catálogo.

| Estilo                           | `id`          | O que faz                                                                                                                                                                                                                                 | Idiomas de instrução                                                            |
| -------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Prosa concisa                    | `terse-prose` | Remove preenchimentos/artigos/hesitações; mantém a substância técnica exata. Mesmo texto do modo de saída legado caveman (referenciado, não reescrito).                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                   |
| Menos código                     | `less-code`   | Escada YAGNI: menor mudança funcional, sem abstrações não solicitadas.                                                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                   |
| Ponytail (dev sênior preguiçoso) | `ponytail`    | "O melhor código é o código nunca escrito": reuso > reescrita, causa raiz > sintoma, menor diff funcional.                                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                   |
| Tenho TDAH (ação primeiro)       | `i-have-adhd` | Ação primeiro (comando/caminho/trecho antes da prosa), etapas numeradas e delimitadas, UM próximo passo concreto, sem preâmbulo/recapitulação/fechamentos. Adaptado de [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                   |
| CJK conciso (文言)               | `terse-cjk`   | Estilo ultraconciso chinês clássico.                                                                                                                                                                                                      | zh (restrito por localidade: oferecido apenas quando o idioma resolvido é `zh`) |

Cada estilo possui três níveis de intensidade — `lite`, `full`, `ultra` — e cada nível
termina com a cláusula de limites compartilhados, que mantém blocos de código, caminhos de arquivo, comandos,
strings de erro, URLs e identificadores textuais.

#### Como a injeção funciona

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) resolve
a seleção contra o catálogo (IDs desconhecidos e estilos com localidade incompatível são
descartados, nunca um erro), concatena as instruções selecionadas na ordem do catálogo,
anexa a cláusula de limites **uma vez**, e carrega o resultado no prompt do sistema
atrás de um único marcador de idempotência (`[OmniRoute Output Styles]`) — reaplicar
não faz nada. Quando o idioma da solicitação detectado tem uma tradução, a instrução
localizada é injetada em vez do inglês.

#### Como habilitar

No painel: **Contexto → Configurações → Compressão** — uma linha por estilo com um
botão de ligar/desligar e um seletor de nível. Programaticamente, a configuração de compressão persiste
a seleção como:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Compatibilidade retroativa: a configuração combinada legada `outputMode: "caveman"` ainda funciona e mapeia para
`terse-prose`, idêntico em bytes à antiga injeção em todos os idiomas legados.

Seleção de idioma: com `languageConfig.enabled` ativado, `autoDetect` escolhe o
idioma da última mensagem do usuário (mesmo detector dos motores de entrada);
desativar `autoDetect` fixa `defaultLanguage`. Desativado → Inglês.

A matriz estilo × idioma é fixada por
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: um novo estilo não pode ser lançado
sem pelo menos uma tradução para pt-BR (ou uma exceção explícita rastreada), e um
estilo existente não pode perder silenciosamente uma localidade. Para adicionar um estilo, consulte
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compressão de Resultado de Ferramenta

O módulo `toolResultCompressor.ts` fornece **5 estratégias de compressão especializadas**
para resultados de ferramentas (chamadas de função, saídas de agente, resultados de pesquisa, etc.):

1.  **Compressão de resultado de pesquisa** — Remove resultados redundantes, mantém os N principais
2.  **Compressão de leitura de arquivo** — Trunca arquivos grandes, preserva cabeçalhos/imports
3.  **Compressão de execução de código** — Mantém apenas stdout/stderr essenciais
4.  **Compressão de consulta de banco de dados** — Limita linhas, remove metadados verbosos
5.  **Compressão de resposta de API** — Remove campos nulos, condensa arrays

#### Quando usar

A compressão de resultado de ferramenta está **sempre ativada** quando há chamadas de ferramenta. Nenhuma
configuração é necessária.

### Pipeline Empilhado

O modo empilhado executa **múltiplos motores em sequência** — geralmente RTK primeiro
(60-90% de economia na saída da ferramenta), depois Caveman (30% de economia adicional no
texto restante). Isso alcança **78-95% de economia total**.

#### Como funciona

```
Input (1000 tokens) // Entrada (1000 tokens)
  → RTK (command-aware filter) → 200 tokens // → RTK (filtro sensível a comandos) → 200 tokens
    → Caveman (filler removal) → 140 tokens // → Caveman (remoção de preenchimento) → 140 tokens
  → Output (140 tokens, 86% savings) // → Saída (140 tokens, 86% de economia)
```

#### Quando usar

Use o modo empilhado para:

- Fluxos de trabalho com muitas ferramentas (codificação agêntica, pesquisa)
- Processamento em lote sensível ao custo
- Quando você precisa da máxima economia de tokens

Configure via combinação:

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
