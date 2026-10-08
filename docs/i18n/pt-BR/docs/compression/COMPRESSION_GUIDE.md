# 🗜️ Prompt Compression Guide — OmniRoute (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Economize automaticamente de 15% a 95% no contexto elegível. Para uma visão geral rápida, consulte a [seção sobre compactação do README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Visão geral

O OmniRoute implementa um pipeline modular de compactação de prompts que é executado **proativamente** antes que as solicitações cheguem aos provedores upstream. Isso significa que sua economia de tokens ocorre de forma transparente — sem necessidade de alterar seu fluxo de trabalho.

```
Solicitação do cliente
  → Seletor de estratégia de compactação
    → Há uma substituição por combinação? → Usar configuração da combinação
    → Limite de acionamento automático atingido? → Usar modo automático
    → Modo padrão? → Usar configuração global
    → Desativado? → Ignorar compactação
  → Modo de compactação selecionado
    → Desativado: sem compactação
    → Leve: limpeza segura de espaços em branco/formatação (~15%)
    → Padrão: remoção de conteúdo supérfluo em estilo telegráfico (~30%)
    → Agressivo: envelhecimento do histórico + sumarização (~50%)
    → Ultra: poda heurística + redução de blocos de código (~75%)
    → RTK: filtragem de saída de terminal/ferramenta com reconhecimento de comandos (faixa upstream de 60-90%)
    → Empilhado: pipeline ordenado com vários mecanismos, normalmente RTK seguido por Caveman (faixa elegível de 78-95%)
  → Solicitação compactada → Provedor
```

---

## Modos de compactação

### Desativado

Nenhuma compactação é aplicada. Todas as mensagens passam sem alterações.

### Modo leve (~15% de economia, latência <1ms)

O modo mais seguro — nenhuma alteração semântica, apenas limpeza de formatação:

| Técnica                  | Descrição                                               |
| ------------------------ | ------------------------------------------------------- |
| `collapseWhitespace`     | Mescla linhas em branco consecutivas e espaços no final |
| `dedupSystemPrompt`      | Remove mensagens de sistema duplicadas                  |
| `compressToolResults`    | Compacta saídas detalhadas de ferramentas/funções       |
| `removeRedundantContent` | Remove instruções repetidas                             |
| `replaceImageUrls`       | Encurta URIs de dados de imagem em base64               |

**Ideal para:** Uso contínuo e fluxos de trabalho críticos para a segurança.

### Modo padrão (~30% de economia)

Inspirado no [Caveman](https://github.com/JuliusBrussee/caveman) — remove palavras supérfluas e formulações prolixas, preservando o significado:

- Remove palavras supérfluas ("por favor", "eu acho", "basicamente", "na verdade")
- Condensa frases prolixas ("a fim de" → "para", "como resultado de" → "porque")
- Remove atenuações de cortesia ("Você se importaria...", "Se você pudesse...")
- Mais de 30 regras de regex ajustadas para prompts de programação

**Ideal para:** Fluxos diários de programação e equipes preocupadas com custos.

### Modo agressivo (~50% de economia)

Gerenciamento inteligente do histórico para sessões longas:

- **Envelhecimento de mensagens** — mensagens mais antigas são compactadas progressivamente
- **Compactação de resultados de ferramentas** — saídas longas de ferramentas são truncadas ou omitidas (primeiras/últimas linhas,
  filtragem de linhas correspondentes, compactação de chaves JSON)
- **Proteções de integridade estrutural** — garantem que os pares `tool_use` + `tool_result` permaneçam consistentes
- **Reconhecimento da janela de contexto** — respeita os limites de tokens de cada modelo

**Ideal para:** Sessões prolongadas de depuração e bases de código grandes.

### Modo ultra (~75% de economia)

Compactação máxima para cenários com restrições críticas de tokens:

- **Poda heurística** — poda de tokens de texto com base em pontuação
- **Preservação de estrutura** — blocos de código delimitados, código inline, URLs e identificadores são
  substituídos temporariamente por marcadores e reinseridos literalmente, sem nunca serem podados
- **Camada SLM opcional** — um pequeno modelo local pode refinar a poda quando configurado
- Independente do modo agressivo: não executa envelhecimento de mensagens, compactação de resultados
  de ferramentas nem o sumarizador de fallback (somente uma falha da camada SLM pode encaminhar uma
  etapa de fallback pelo modo agressivo)

**Ideal para:** Quando você atinge repetidamente os limites de contexto.

### Modo RTK (faixa upstream de 60-90%)

O modo RTK é otimizado para saídas detalhadas de ferramentas que aparecem em sessões de agentes de programação:

- Detecta classes de comandos/saídas, como `git status`, `git diff`, `git log`, executores de testes,
  builds do TypeScript/Vite/Webpack, ESLint/Biome/Prettier, auditorias/instalações npm, logs do Docker, saídas
  de infraestrutura e saídas genéricas de shell
- Aplica pacotes de filtros JSON de `open-sse/services/compression/engines/rtk/filters/`
- Importa filtros do schema TOML v1 do RTK a partir de arquivos `filters.toml` globais ou do projeto, com
  validação por testes inline e controle de confiança para arquivos do projeto
- Inclui 55 filtros integrados com amostras de verificação inline
- Remove sequências de controle ANSI, barras de progresso, linhas repetidas e ruídos que não exigem ação
- Preserva falhas, erros, avisos, arquivos alterados, resumos e o final de saídas longas
- Oferece suporte a filtros de projeto sujeitos a controle de confiança, filtros globais e recuperação
  opcional da saída bruta com dados sensíveis ocultados

**Ideal para:** Sessões de agentes com transcrições de shell, build, teste, git, grep e saídas de arquivos.

### Modo empilhado (faixa elegível de 78-95%)

O modo empilhado executa vários mecanismos de compactação em uma ordem determinística. O pipeline padrão é:

```txt
RTK -> Caveman
```

Essa ordem mantém primeiro a saída de terminal/ferramenta compacta e, em seguida, aplica a condensação
semântica do Caveman ao prompt em linguagem natural restante. Os pipelines empilhados podem ser
configurados globalmente ou por meio de combinações de compactação atribuídas a combinações de roteamento.

**Ideal para:** Contextos mistos com grandes logs de ferramentas, além de instruções humanas ou resumos do assistente.

---

## Cálculo da economia upstream

O OmniRoute documenta a economia com compressão a partir de duas fontes: benchmarks dos projetos upstream e a própria composição de mecanismos do OmniRoute.

| Fonte   | Número do README upstream usado aqui                                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` menos tokens de saída, economia média de `65%` na saída em benchmarks, faixa de `22-87%` e ferramenta com compressão de entrada de `~46%` |
| RTK     | Economia de `60-90%` na saída de comandos; sessão de exemplo com `~118,000 -> ~23,900` tokens, ou `79.7%` de economia (`~80%`)                   |

Para payloads de ferramentas/contexto sobrepostos, a combinação padrão do OmniRoute encadeia os mecanismos:

```txt
RTK -> Caveman
```

A economia combinada é multiplicativa, não aditiva:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Esse número de `78-95%` se aplica quando tanto o RTK quanto o Caveman podem reduzir o mesmo payload de entrada/contexto. O modo de saída de respostas do Caveman é separado: quando ativado, use os próprios valores de economia de saída do Caveman (média de `65%`, destaque de `~75%`, faixa de `22-87%`). A economia total de cobrança depende da sua combinação de prompts e saídas.

### O que "elegível" realmente significa

A faixa de destaque de 15-95% é real, mas aplica-se apenas a conteúdo **redundante ou verboso** — linhas de erro repetidas, um log de build que envia o mesmo aviso incessantemente, uma saída superdimensionada de `grep`/leitura de arquivo. Isso **não** significa que toda solicitação economizará tanto.

Verificado empiricamente (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): uma execução `stacked` (RTK + Caveman) em um bloco `tool_result` no formato da Anthropic contendo 300 linhas de erro idênticas produziu **95.93% de economia de tokens / 96.26% de economia de caracteres** — perfeitamente dentro da faixa anunciada. Porém, a mesma pipeline executada em uma saída normal e não redundante de ferramenta (uma lista limpa de correspondências do `grep`, uma leitura curta de arquivo, texto de conversa comum) produz corretamente uma **economia próxima de zero**, pois não há nada repetitivo a remover e `validateCompression()` (`validation.ts`) se recusa a enviar uma reescrita que removeria ou alteraria blocos de código, URLs, títulos, versões ou identificadores de constantes em MAIÚSCULAS.

Esse é um comportamento esperado e seguro, não um bug: uma sessão de programação que principalmente lê/pesquisa com grep em arquivos limpos terá uma economia total modesta, mesmo com a compressão totalmente ativada, enquanto uma sessão que entra em um loop com falhas ou encontra um linter verboso terá a faixa completa de 78-95% de economia nesse tráfego. Não use o baixo percentual agregado de economia de uma única sessão como evidência de que a compressão está configurada incorretamente — primeiro verifique se a saída subjacente da ferramenta era realmente redundante.

---

## Visualização da economia de tokens

```
Sem compressão: 47K tokens enviados ao LLM
Com Lite:       40K tokens enviados          (15% economizados — seguro, sempre ativo)
Com Standard:   33K tokens enviados          (30% economizados — regras caveman-speak)
Com Aggressive: 24K tokens enviados          (50% economizados — envelhecimento + sumarização)
Com Ultra:      12K tokens enviados          (75% economizados — poda heurística)
Com RTK:        19K-5K tokens enviados       (60-90% economizados na saída de comandos/ferramentas)
Com Stacked:    10K-2.5K tokens enviados     (faixa elegível de 78-95% com RTK+Caveman)
```

---

## Configuração

### Painel

Acesse `Dashboard → Context & Cache`:

- **Caveman** — seleção de modo, pacotes de idiomas, pré-visualização e padrões globais
- **RTK** — pré-visualização do filtro de comandos, configurações de segurança do RTK e catálogo de filtros
- **Compression Combos** — pipelines de mecanismos nomeados atribuídos a combinações de roteamento
- **Auto-Trigger Threshold** — ativa automaticamente a compactação quando a contagem de tokens excede o limite

### Substituição por combinação

Em `Dashboard → Context & Cache → Compression Combos`, atribua uma combinação de compactação a uma
combinação de roteamento:

```txt
Combinação: "free-tier-fallback"
  Combinação de compactação: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Destinos:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Isso permite usar compactação empilhada em provedores gratuitos/de programação, mantendo o modo leve
nas assinaturas pagas.

Essa atribuição de "Substituição por combinação" é um controle diferente da substituição do **modo de
compactação da combinação de roteamento** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses
— o esquema do campo também aceita `rtk`, `stacked` e `omniglyph`) — essa substituição não seleciona
um pipeline nomeado de combinação de compactação; ela apenas define o campo `compressionMode`
consultado por `resolveCompressionPlan`. Ela pode ser definida no cartão da combinação
(`Dashboard → Combos`) ou, desde a #6760, por combinação de roteamento na lista "Assign to routing" em
`Dashboard → Context & Cache → Compression Combos`, ao lado da caixa de seleção de atribuição de
pipeline documentada acima. Ambas as interfaces persistem por meio do mesmo endpoint
`PUT /api/combos/{id}`.

### Substituição por solicitação

Envie o cabeçalho de solicitação `x-omniroute-compression` para substituir o plano de compactação de
uma única solicitação. Ele tem a precedência mais alta — prevalece sobre a substituição da combinação
de roteamento, o perfil ativo, o acionamento automático e o padrão do painel. Valores desconhecidos
são ignorados (a solicitação nunca é rejeitada), e o controle global principal ainda se aplica a tudo:
quando a compactação está desativada globalmente, o cabeçalho não pode ativá-la. Valores:

| Valor         | Efeito                                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `off`         | Nenhuma compactação para esta solicitação.                                                                              |
| `default`     | O perfil padrão derivado do painel (ignora o perfil ativo). Mecanismos com perdas permanecem desativados.               |
| `safe`        | O mesmo que omitir o cabeçalho: apenas desduplicação e redução de espaços em branco.                                    |
| `allow-lossy` | Mantém o plano do operador desta solicitação, incluindo resumos, filtros de relevância e reescritas de estilo.          |
| `engine:<id>` | Um único mecanismo quando habilitado, por exemplo, `engine:rtk`. Essa é a ativação por solicitação para esse mecanismo. |
| `<combo>`     | Uma combinação nomeada, correspondente primeiro pelo nome (sem diferenciar maiúsculas de minúsculas) e depois pelo id.  |

Sem `allow-lossy`, `engine:<id>` ou uma combinação nomeada, mecanismos com perdas não são aplicados.
A solicitação ainda recebe desduplicação de sessão e redução de espaços em branco quando a
compactação está ativada.

O plano aplicado é retornado no cabeçalho de resposta
`X-OmniRoute-Compression: <mode>; source=<source>`, em que `<source>` é um entre `request-header`,
`routing-override`, `active-profile`, `auto-trigger`, `default` ou `off`.

### API

```bash
# Obter as configurações de compactação
curl http://localhost:20128/api/settings/compression

# Atualizar as configurações de compactação
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Pré-visualizar um payload RTK/empilhado específico
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Listar pacotes de filtros RTK
curl http://localhost:20128/api/context/rtk/filters

# Testar o RTK diretamente com metadados opcionais do comando
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## O que é protegido

O mecanismo de compressão **sempre preserva:**

- ✅ Blocos de código (delimitados e inline)
- ✅ URLs e caminhos de arquivos
- ✅ Estruturas JSON e dados estruturados
- ✅ Identificadores e tokens técnicos protegidos
- ✅ Expressões matemáticas
- ✅ Definições de chamadas de ferramentas/funções
- ✅ Prompts de sistema (no modo lite)

A recuperação de saída bruta do RTK oculta chaves de API comuns, tokens bearer, tokens do Slack, chaves de acesso da AWS,
senhas, tokens e segredos antes que qualquer dado seja persistido.

---

## Estatísticas de compressão

Cada solicitação comprimida inclui estatísticas nos logs do servidor:

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

## Roteiro das fases

| Fase    | Modos                                                                                                                                                                 | Status     |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Fase 1  | Off, Lite                                                                                                                                                             | ✅ Lançada |
| Fase 2  | Standard, Aggressive, Ultra                                                                                                                                           | ✅ Lançada |
| Fase 3  | RTK, Stacked, Combinações de compressão                                                                                                                               | ✅ Lançada |
| Fase 4  | Estilos de saída, Ultra de nível SLM, estrutura de avaliação                                                                                                          | ✅ Lançada |
| Fase 4C | Orçamento de contexto adaptativo ("dial") — mecanismo de computação + API (`contextBudget` em `PUT /api/settings/compression`) + controles de modo/política no painel | ✅ Lançada |

---

## Agradecimentos

As regras de compressão do modo Standard são inspiradas no **[Caveman](https://github.com/JuliusBrussee/caveman)**, de **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51 mil+) — o projeto viral "por que usar muitos tokens quando poucos tokens resolvem". O Caveman relata `~75%` menos tokens de saída, economia média de `65%` na saída em benchmarks, uma faixa de `22-87%` na saída e uma ferramenta de compressão de entrada de `~46%`.

O modo RTK é inspirado no **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**, da **[RTK AI](https://github.com/rtk-ai)** — o projeto de alto desempenho para compressão de saída de comandos para terminal, compilação, testes, git e filtragem da saída de ferramentas. O RTK relata uma economia de `60-90%`, com a sessão de exemplo em seu README mostrando uma economia de `~80%`.

---

## Sistemas avançados de compressão

Além dos 7 modos descritos acima (o código-fonte também aceita os modos `codex-responses` e
`omniglyph`, que este guia não aborda), as seções abaixo tratam de recursos que
funcionam dentro desses modos ou em conjunto com eles: a Compressão de resultados de ferramentas e o Envelhecimento progressivo
são as etapas 1 e 2 do mecanismo agressivo (o modo Aggressive e uma etapa `aggressive` de um
pipeline empilhado), o Pipeline empilhado é a forma como o modo Stacked é executado, a Compressão sensível ao cache
rebaixa `aggressive` e `ultra` para `standard` em provedores com cache enquanto a compressão
está ativada, e o Modo de saída Caveman e os Estilos de saída são instruções opcionais de prompt de sistema,
desativadas por padrão, que moldam a saída do modelo em vez de comprimir a solicitação.

### Compressão sensível ao cache

Alguns provedores (como a Anthropic com cache de prompts) oferecem suporte a **cache de prompts**,
o que permite armazenar partes do prompt em cache para reduzir custos e latência. Quando
o cache está ativado, a compressão agressiva pode, na verdade, **prejudicar** o desempenho
porque altera os tokens armazenados em cache, invalidando-o.

O módulo `cachingAware.ts` resolve isso ao **detectar o contexto de cache** e
**ajustar a estratégia de compressão** de acordo.

#### Como funciona

1. **Detecta o contexto de cache** — Verifica o corpo da solicitação em busca de marcadores `cache_control`
2. **Identifica provedores com cache** — Verifica se o provedor de destino oferece suporte a cache
3. **Ajusta a estratégia** — Rebaixa `aggressive`/`ultra` para `standard` em provedores com cache
4. **Ignora o prompt de sistema** — Prompts de sistema geralmente são armazenados em cache, portanto, não os comprime

O auxiliar de estratégia também retorna um sinalizador `deterministicOnly`, mas o construtor do plano utiliza
apenas a estratégia — atualmente, nada nas etapas seguintes lê esse sinalizador.

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

#### Quando usar

A compressão sensível ao cache está **sempre ativada** — nenhuma configuração é necessária. Ela entra em ação sempre que
a compressão está ativada e o provedor de destino oferece suporte a cache de prompts (Anthropic, OpenAI,
etc.); marcadores `cache_control` explícitos não são necessários — um provedor com cache, por si só,
aciona o rebaixamento, enquanto somente os marcadores nunca o fazem (a detecção de marcadores alimenta a
telemetria de cache, não a decisão da estratégia).

### Envelhecimento progressivo

Conversas longas acumulam muitas interações de mensagens, mas as interações mais antigas tornam-se menos
relevantes. O módulo `progressiveAging.ts` **degrada as mensagens com base na distância entre interações**
(distância medida a partir do fim da conversa). Com os padrões fornecidos
(`verbatim: 2, light: 2, moderate: 3`):

- **Últimos 2 turnos (distância ≤ 2)**: Mantidos literalmente
- **Distância 3**: Compressão caveman (remoção de palavras supérfluas)
- **Distância 4+**: Mensagens do assistente resumidas; mensagens do usuário reduzidas à primeira
  linha, limitadas a 120 caracteres; outras funções permanecem inalteradas. Prompts de sistema, mensagens
  já envelhecidas e a mensagem mais recente do usuário são sempre mantidos literalmente, independentemente da distância.
  Nada é descartado completamente, e a faixa `light`
  é inacessível com os padrões fornecidos (`light` é igual a `verbatim`).

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
  verbatim: 3, // últimos 3 turnos: literais
  light: 8, // distância <= 8: compressão leve
  moderate: 20, // distância <= 20: compressão caveman
  fullSummary: 5, // exigido pelo tipo, não lido pelo código de definição de faixas
  // distância > 20: resumido (assistente) / primeira linha mantida (usuário)
});

// saved = número de tokens economizados
```

#### Quando usar

O envelhecimento progressivo está **sempre ativado** no modo `aggressive` — ele é a etapa 2 de
`compressAggressive()`. O modo Ultra não o executa. Ele é
especialmente eficaz para:

- Sessões de programação prolongadas
- Conversas que duram vários dias
- Fluxos de trabalho agênticos com muitas chamadas de ferramentas

### Modo de saída Caveman

O modo de saída Caveman adiciona **instruções ao prompt de sistema** que pedem ao próprio modelo
uma saída concisa — o nível `lite` pede respostas concisas que mantenham frases completas, `full`
pede para ele "responder de forma concisa como um homem das cavernas inteligente", e `ultra` pede uma saída telegráfica;
as instruções apenas solicitam, não podem garantir isso. As requisições as recebem por meio de
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` primeiro resolve a seleção com o adaptador de retrocompatibilidade
(`resolveOutputStyleSelection()` em
`open-sse/services/compression/outputStyles/backCompat.ts`), que, enquanto `outputStyles`
estiver vazio, mapeia um `cavemanOutputMode` habilitado para o estilo de saída `terse-prose` na
intensidade definida por `cavemanOutputMode.intensity` (consulte Retrocompatibilidade abaixo); uma seleção não vazia de `outputStyles`
é usada como está, e `cavemanOutputMode.enabled` e `intensity` não têm
efeito nesse caso, enquanto sua opção `autoClarity` ainda se aplica. `outputMode.ts` contém os
textos das instruções (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), o desvio baseado no conteúdo e o
auxiliar de posicionamento usado pela injeção; seu próprio injetor `applyCavemanOutputMode()` não possui
nenhum chamador em produção.

#### Como funciona

Este modo não comprime a entrada. Ele adiciona um bloco de instruções ao prompt de sistema
(consulte Como funciona a injeção abaixo), e qualquer modo de compressão de entrada selecionado para a requisição
ainda é executado depois, no corpo que agora contém o bloco. Antes da cláusula compartilhada de
limites com a qual todos os níveis terminam, o nível `full` em inglês diz:

> "Responda de forma concisa como um homem das cavernas inteligente. Remova artigos (um/uma/o/a), palavras supérfluas (apenas/realmente/basicamente/na verdade/simplesmente), cortesias e ressalvas. Fragmentos são aceitáveis. Use sinônimos curtos (grande, não extenso; corrigir, não implementar). Mantenha todo o conteúdo técnico, código, erros, URLs e identificadores exatos."

Isso funciona especialmente bem para:

- Geração de código (saída mais concisa = menos tokens)
- Perguntas e respostas rápidas (sem necessidade de explicações elaboradas)
- Processamento em lote (maximiza a vazão)

#### Quando usar

O modo de saída Caveman é **opcional**. Com a compressão ativada (`enabled: true`, a opção mestre
na página Compression Settings), ative-o com `cavemanOutputMode.enabled`; `intensity`
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
define a mesma configuração para as requisições às quais essa combinação se aplica, e a ferramenta MCP
`omniroute_set_compression_engine` a grava por meio de seu argumento booleano `outputMode`.
Uma seleção não vazia de `outputStyles` tem precedência sobre essa opção. No
painel, habilitar o estilo de saída **Terse prose** injeta o mesmo bloco (consulte Output
Styles abaixo).

### Estilos de saída (catálogo)

O modo de saída Caveman acima é o **caminho legado de estilo único**. A Fase 4 o generalizou
em um catálogo de estilos de saída combináveis: `OUTPUT_STYLE_CATALOG` em
`open-sse/services/compression/outputStyles/catalog.ts`. Cada estilo é uma instrução de prompt de sistema
que pede ao próprio modelo uma saída mais econômica; os estilos podem ser habilitados
em conjunto e são injetados na ordem do catálogo.

| Estilo                                 | `id`          | O que faz                                                                                                                                                                                                                                   | Idiomas das instruções                        |
| -------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Prosa concisa                          | `terse-prose` | Remove palavras de preenchimento/artigos/ressalvas; mantém a precisão do conteúdo técnico. Mesmo texto do modo legado de saída caveman (referenciado, não redigitado).                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Menos código                           | `less-code`   | Escada YAGNI: menor alteração funcional, sem abstrações não solicitadas.                                                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Rabo de cavalo (dev sênior preguiçoso) | `ponytail`    | "O melhor código é aquele que nunca foi escrito": reutilizar > reescrever, causa raiz > sintoma, menor diff funcional.                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Tenho TDAH (ação primeiro)             | `i-have-adhd` | Ação primeiro (comando/caminho/snippet antes da prosa), etapas numeradas e limitadas, UMA próxima etapa concreta, sem preâmbulo/recapitulação/encerramentos. Adaptado de [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| CJK conciso (文言)                     | `terse-cjk`   | Resposta `full`/`ultra` em chinês clássico (文言); `lite` apenas solicita respostas breves sem palavras funcionais, cortesias ou embelezamentos.                                                                                            | zh (restrito por localidade, veja abaixo)     |

Cada estilo inclui três níveis de intensidade — `lite`, `full`, `ultra` — e cada nível
termina com a cláusula de limites compartilhada (`SHARED_BOUNDARIES` em `outputMode.ts`), que
mantém blocos de código, caminhos de arquivo, comandos, erros e URLs exatos. Os textos dos níveis de
`terse-prose` e `terse-cjk` adicionam identificadores a essa lista.

`terse-cjk` é restrito à localidade `zh` em dois lugares. A página de Configurações de Compressão exibe
sua linha somente quando o idioma da interface do painel é chinês (`zh-CN` ou `zh-TW`), e
`applyOutputStyles()` o injeta somente quando o idioma resolvido da solicitação (consulte Seleção de idioma
abaixo) é `zh`. Ocultar a linha não limpa uma seleção salva de `terse-cjk`:
a API de configurações aceita qualquer id de estilo, e salvar outros estilos na página o mantém. No
momento da solicitação, a verificação de idioma de `applyOutputStyles()` é a única restrição por localidade.

#### Como funciona a injeção

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) resolve
a seleção com base no catálogo (ids desconhecidos e estilos incompatíveis com a localidade são
descartados, nunca geram erro; uma seleção que não resulta em nenhum estilo deixa o corpo
inalterado, ignorado como `no_styles`), concatena as instruções selecionadas na ordem do catálogo,
acrescenta a cláusula de limites **uma vez** (mais a cláusula de segurança, `SAFETY_BOUNDARIES` ou sua
tradução, quando `less-code` ou `ponytail` está selecionado) e inicia o bloco com um
único marcador de idempotência (`[OmniRoute Output Styles]`), portanto reaplicá-lo não produz efeito. Quando
o idioma resolvido (consulte Seleção de idioma abaixo) tem uma tradução, a instrução localizada
é injetada em vez da instrução em inglês.

Em um corpo com um array `messages` não vazio, a verificação de idempotência ocorre antes do
desvio por conteúdo: quando o marcador `[OmniRoute Output Styles]` já está presente no campo
`system` de nível superior (uma string ou um array de blocos de conteúdo) ou em uma mensagem de sistema com conteúdo
em formato de string, o corpo permanece inalterado como `already_applied` e nenhuma verificação de palavras-chave é executada.
Caso contrário, um desvio por conteúdo (`shouldBypassCavemanOutputMode()` em
`open-sse/services/compression/outputMode.ts`) verifica o texto das três últimas
mensagens, independentemente de suas funções, e ignora os estilos durante todo o turno quando esse texto
corresponde às palavras-chave de segurança, ação irreversível ou esclarecimento, ou a uma
sequência sensível à ordem: `first`, `then`, `after that`, `before`, `rollback` ou
`backup` seguida, em até 240 caracteres, por `delete`, `drop`, `migrate`, `deploy` ou
`release`. O desvio é executado enquanto a opção **Desvio de Clareza Automática**
(`cavemanOutputMode.autoClarity`, ativada por padrão) estiver ativada; desativar a opção pula a
verificação de palavras-chave.

Quando o desvio permite a passagem do turno, `placeSystemInstruction()` (mesmo arquivo), que
nunca cria um novo `messages[0]`, coloca o bloco no primeiro local encontrado entre estes:

1. Uma mensagem de sistema inicial com conteúdo em formato de string: o bloco é acrescentado após seu texto.
2. O campo `system` de nível superior: o bloco é acrescentado após o texto de uma string ou
   adicionado como um novo bloco de texto a um array de blocos de conteúdo.
3. A primeira mensagem de sistema posterior com conteúdo em formato de string: o bloco é acrescentado após seu
   texto.
4. Nenhuma das opções acima: o bloco é inserido em uma nova mensagem de sistema no fim de `messages`.

Em um corpo sem um array `messages` (ou com um array vazio), nenhum desvio por conteúdo é executado e
um campo `system` de nível superior não é consultado. O bloco é acrescentado após o texto de um
campo `instructions` em formato de string, a menos que esse campo já contenha o marcador
`[OmniRoute Output Styles]`; nesse caso, o corpo permanece inalterado como
`already_applied`. Quando o corpo não tem um campo `instructions` em formato de string, mas contém `input`
(uma string ou um array), o bloco se torna `instructions`, substituindo qualquer valor que não seja string
anteriormente contido nesse campo. Um corpo sem um campo `instructions` em formato de string nem um `input`
em formato de string ou array permanece inalterado e é ignorado como `no_messages`.

#### Como habilitar

No dashboard: **Contexto de Compressão → Configurações de Compressão**
(`/dashboard/context/settings`), seção Estilos de saída: uma linha por estilo, com um
botão para ativar/desativar e um seletor de nível. Os estilos são injetados enquanto a
própria compressão está ativada (o botão mestre da página, `enabled`). O botão
**Ignorar Clareza Automática** fica na página **Caveman**
(`/dashboard/context/caveman`), no cartão **Modo de Saída**. Programaticamente, a
configuração de compressão persiste a seleção como:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Compatibilidade retroativa: enquanto `outputStyles` estiver vazio, a configuração
legada `cavemanOutputMode.enabled` será mapeada para `terse-prose` em
`cavemanOutputMode.intensity`. O bloco então começará com o marcador
`[OmniRoute Output Styles]`, enquanto o injetor legado `applyCavemanOutputMode()`
escrevia `[OmniRoute Caveman Output Mode]`. Abaixo do marcador, o texto corresponde à
injeção legada em en, pt-BR, es, de, fr, it, ru, id e vi; em ja e zh, ele contém um
espaço adicional antes da cláusula de limites. `terse-prose` tem traduções para pt-BR,
es, de, fr, it, ru, zh, ja, id e vi; portanto, uma solicitação cujo idioma resolvido
seja `hu` recebe o texto em inglês, enquanto o injetor legado usava o texto em húngaro.

Seleção de idioma do estilo de saída (`resolveOutputStyleLanguage()` em
`outputStyles/apply.ts`): com `languageConfig.enabled` ativado, `autoDetect` obtém uma
amostra da mensagem de usuário mais recente no array `messages` da solicitação que
contenha texto (conteúdo em formato de string ou o `text` de suas partes de conteúdo) e
executa nela o detector do mecanismo Caveman (`detectCompressionLanguage()`). O
detector retorna `zh` para textos com caracteres Han e sem kana; caso contrário, retorna
o idioma entre `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` e `id` que tiver o
maior número de correspondências de indícios, e `en` quando nenhum corresponder — textos
que ele não consegue classificar recebem inglês, nunca `defaultLanguage`, e `vi` nunca
é detectado, embora os estilos incluam texto em `vi`. Um corpo da Responses API mantém
seus turnos em `input`, que não é usado como amostra, portanto recebe
`defaultLanguage` e, em seguida, inglês. Quando nenhuma mensagem de usuário em
`messages` contém texto, ou com `autoDetect` desativado, aplica-se `defaultLanguage` e,
em seguida, inglês. Com `languageConfig.enabled` desativado, o idioma é inglês — a menos
que um combo de compressão se aplique à solicitação (um combo atribuído ao combo de
roteamento da solicitação ou o combo de compressão padrão ao qual o chatCore recorre no
pipeline empilhado integrado): aplicar um combo ativa `languageConfig.enabled` para
essa solicitação e define `defaultLanguage` com base nos pacotes de idiomas do combo (o
valor salvo, se ele for um dos pacotes do combo; caso contrário, o primeiro pacote do
combo, cujo padrão é `en`), enquanto o valor salvo de `autoDetect` (ativado por padrão)
continua sendo aplicado. O mecanismo de entrada Caveman escolhe o idioma do pacote de
regras de forma diferente — por parte de texto e, com a detecção automática desativada,
condicionado a `enabledPacks`.

A matriz de estilos × idiomas é fixada por
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: cada estilo do catálogo
precisa ter uma entrada no `BASELINE_LANGUAGES` do teste; um estilo que não tenha
restrição de localidade precisa incluir uma tradução para pt-BR (o `terse-cjk`, que tem
restrição de localidade, está isento dessa regra), a menos que esteja listado em
`KNOWN_ENGLISH_ONLY`, que só pode conter estilos sem nenhuma tradução — um estilo
listado que tenha qualquer tradução causa falha no teste; e um estilo causa falha no
teste quando perde um idioma listado em sua entrada de `BASELINE_LANGUAGES`. Para
adicionar um estilo, consulte
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compressão de Resultados de Ferramentas

`compressToolResult()` em `open-sse/services/compression/toolResultCompressor.ts`
comprime o texto dos resultados de ferramentas usando **5 estratégias**. Ele as testa
nesta ordem, e a primeira estratégia ativada cuja verificação corresponder ao conteúdo
determina o resultado:

1. **`fileContent`**: conteúdo de 3 ou mais linhas em que pelo menos uma linha, ignorando
   a indentação inicial, começa com `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` ou `return ` (a palavra-chave seguida de um espaço), ou com `if`,
   `for` ou `while` seguido por `(` ou ` (`, mantém suas primeiras 20 e últimas 5 linhas, com
   o trecho intermediário omitido marcado.
2. **`grepSearch`**: conteúdo com pelo menos uma linha no formato `<path>:<digits>:`,
   em que o texto antes do primeiro caractere de dois-pontos não contém espaços em branco, mantém apenas essas linhas, no
   máximo 30, seguidas por uma contagem de quaisquer correspondências adicionais e pela lista de arquivos correspondentes;
   todas as outras linhas são descartadas. Uma única linha desse tipo é suficiente para acionar a estratégia, portanto uma
   linha de log iniciada por um carimbo de data/hora como `12:30:45` também conta.
3. **`shellOutput`**: uma saída que contém uma sequência ANSI CSI (`ESC[` seguida por dígitos ou
   pontos e vírgulas e depois por uma letra, como em códigos de cores) ou um `$` seguido por um espaço em branco
   em qualquer parte do texto perde essas sequências (outros escapes, como `ESC[?25l` ou uma
   sequência OSC de título de janela, são mantidos) e mantém suas últimas 50 linhas, com linhas repetidas
   consecutivas condensadas. Como essa verificação é executada antes de `json` e `errorMessage`,
   uma saída JSON ou de erro que contenha esse `$` nunca chega a essas estratégias enquanto
   `shellOutput` estiver ativada.
4. **`json`**: uma carga JSON com mais de 2.000 caracteres que começa com `{` ou `[` (após
   espaços em branco opcionais) e é analisada com sucesso é resumida: um array com mais de 7 itens mantém
   seus primeiros 5 e últimos 2 itens e sua contagem total, e um objeto mantém suas primeiras 20
   chaves, com cada valor de objeto ou array aninhado substituído por um espaço reservado `{…N keys}`
   (para um array, N é seu comprimento) e um marcador `_remaining_<N>_keys` que contabiliza as chaves
   descartadas após as primeiras 20. Valores escalares são copiados por inteiro, portanto um objeto com 20 chaves
   ou menos e sem valores aninhados é apenas reindentado — um objeto minificado ganha caracteres
   e permanece inalterado.
5. **`errorMessage`**: uma saída que contém, em qualquer lugar e sem distinção entre maiúsculas e minúsculas, `error:`,
   `error ` (a palavra seguida por um espaço, como em `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` ou `traceback` mantém sua primeira linha, as
   10 linhas seguintes e as últimas 3, com um marcador `… [N frames elided] …` no lugar das
   linhas entre elas. O marcador aparece somente quando mais de 13 linhas seguem a primeira
   linha, portanto uma saída de erro com 14 linhas ou menos não é encurtada (com 12 ou 13 linhas, as
   últimas 3 repetem linhas já mantidas).

Depois que uma estratégia encontra uma correspondência, mesmo que não economize nada, as estratégias posteriores não são
tentadas. Quando a estratégia correspondente não economiza tokens estimados (comprimento ÷ 4, arredondado para cima) —
por exemplo, um arquivo semelhante a código com 25 linhas ou menos, ou um array JSON com mais de 2.000
caracteres e 7 itens ou menos — o mecanismo agressivo mantém o resultado original da ferramenta:
ambos os chamadores (`compressAggressive()` e `compressAnthropicToolResultBlock()`)
mantêm o original quando `saved` é 0 ou menor, enquanto o próprio `compressToolResult()` ainda
retorna a saída dessa estratégia. A etapa de resultado da ferramenta não é a decisão final: o
resumidor de contingência do mecanismo ainda pode encurtar uma mensagem `tool` ou `function` com mais
de 8.192 caracteres (`maxTokensPerMessage`, 2.048, multiplicado por 4).

#### Quando usar

A compactação de resultados de ferramentas é a etapa 1 do mecanismo agressivo (`compressAggressive()` em
`open-sse/services/compression/aggressive.ts`), portanto é executada no modo Aggressive e em uma
etapa `aggressive` de um pipeline empilhado. Ela compacta mensagens `tool` e `function`
no formato da OpenAI e o texto dentro de blocos `tool_result` da Anthropic. Cada estratégia tem seu próprio
controle em `aggressive.toolStrategies`, todos ativados por padrão. No painel, os
controles ficam na visualização **Advanced** da página Caveman enquanto a compactação está ativada e o
modo padrão é Aggressive.

### Pipeline empilhado

O modo empilhado executa **vários mecanismos em sequência** — geralmente o RTK primeiro
(60–90% de economia na saída de ferramentas) e depois o Caveman no texto restante (~46% de
economia na entrada). Combinados, eles resultam no **intervalo elegível de 78–95%** (consulte Cálculo de economia upstream
acima): `1 - (1 - 0.60..0.90) × (1 - 0.46)` resulta em uma média de ≈89%.

#### Como funciona

```
Entrada (1000 tokens)
  → RTK (filtro com reconhecimento de comandos) → 200 tokens
    → Caveman (remoção de conteúdo supérfluo) → 108 tokens
  → Saída (108 tokens, ~89% de economia)
```

#### Quando usar

Use o modo empilhado para:

- Fluxos de trabalho com uso intenso de ferramentas (programação agêntica, pesquisa)
- Processamento em lote sensível a custos
- Quando você precisa da máxima economia de tokens

Pipelines empilhados são configurados por meio da configuração global de compactação `stackedPipeline`
ou por meio de uma combinação de compactação nomeada atribuída a uma combinação de roteamento (consulte
Substituição por combinação acima) — não por meio de um `modePack` de combinação automática (esse campo apenas
repondera a seleção de modelos da combinação automática, e `stacked` não é um nome de pacote válido).

---

## Substituições de Compressão por Combo

Você pode substituir o modo de compressão global **por combo** para ajustar o comportamento
a diferentes casos de uso:

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

Isso é útil para:

- **Combos de programação**: use o modo `aggressive` para sessões longas
- **Combos de perguntas e respostas rápidas**: use o modo `lite` para respostas rápidas
- **Combos com uso intensivo de ferramentas**: use o modo `stacked` para obter a máxima economia
- **Combos de produção**: deixe a substituição desativada para provedores com cache — o ajuste
  com reconhecimento de cache, que está sempre ativo, rebaixa `aggressive`/`ultra` para `standard` automaticamente
  (não há um modo `cache-aware` selecionável)

---

## Veja Também

- [Configuração do Ambiente](../reference/ENVIRONMENT.md) — Variáveis de ambiente de compressão
- [Guia de Arquitetura](../architecture/ARCHITECTURE.md) — Detalhes internos do pipeline de compressão
- [Guia do Usuário](../guides/USER_GUIDE.md) — Primeiros passos com a compressão
- [Compressão RTK](./RTK_COMPRESSION.md) — Filtros RTK, modelo de confiança, etapa de verificação e recuperação da saída bruta
- [Mecanismos de Compressão](./COMPRESSION_ENGINES.md) — Caveman, RTK, empilhamento, APIs, MCP e painel
- [Formato das Regras de Compressão](./COMPRESSION_RULES_FORMAT.md) — Formato JSON do pacote de regras
- [Pacotes de Idiomas de Compressão](./COMPRESSION_LANGUAGE_PACKS.md) — Regras do Caveman específicas por idioma
