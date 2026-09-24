# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Este documento descreve a base de encaminhamento adaptativo orientado por feedback adicionada ao
OmniRoute. É deliberadamente pequena: introduz um canal tipado de resultados de
encaminhamento, um sinal de qualidade online que alimenta o avaliador auto-combo existente, um
exportador OpenTelemetry opcional e um endpoint de explicabilidade. **Não**
substitui a pilha de resiliência existente (circuit breaker, período de espera da ligação,
bloqueio de modelos, matriz de estado, autopilot) — complementa-a.

## 1. Contexto arquitetónico

O OmniRoute é um plano de dados com um **caminho crítico de pedidos** e um **plano de
controlo/inteligência**. O caminho crítico tem de permanecer rápido, eficiente em termos de memória, assíncrono, resiliente e
previsível. A avaliação, a pontuação de qualidade, as experiências e a análise histórica pertencem
ao plano de controlo.

```
Agente de IA / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   plano de dados (rápido, síncrono, em memória)
│  encaminhamento /   │
│  recuperação        │
│  estado / proteção  │
│  cache / streaming  │
└──────────┬──────────┘
           │ RoutingEvent (acionar e prosseguir, ~0.2µs)
           ▼
┌─────────────────────┐
│ Destinos de feedback│   plano de controlo (assíncrono, segundo o melhor esforço)
│ monitor de qualidade│
│ exportador OTel     │
│ armazém explicativo │
└──────────┬──────────┘
           ▼  pontuação de qualidade
      avaliador auto-combo
```

### O que já existia (auditado, não duplicado)

| Conceito                                              | Implementação existente                                                                                               |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Disponibilidade (podemos enviar tráfego?)             | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN, persistido na BD), período de espera da ligação, bloqueio de modelos |
| Relatórios de estado                                  | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                               |
| Tráfego sombra                                        | `open-sse/services/combo/shadowRouting.ts`                                                                            |
| Barreiras de proteção                                 | `src/lib/guardrails/` (hooks pré/pós)                                                                                 |
| Cache exata                                           | `src/lib/semanticCache.ts` (baseada em assinatura)                                                                    |
| Avaliadores / encaminhamento orientado por avaliações | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                                  |
| Explicabilidade das decisões de combo                 | `open-sse/services/combo/decisionTrace.ts`                                                                            |
| Eventos em tempo real do dashboard                    | `src/lib/events/eventBus.ts` (canal de notificações da IU, payloads `unknown`, histórico de 100 entradas)             |

A camada de eventos de encaminhamento **não** é uma reimplementação de `eventBus`: esse bus é
o canal de notificações em tempo real do dashboard (nomes de _eventos_ tipados, payloads
opacos, consumidores da IU). `RoutingEvent` é uma estrutura tipada de _resultado_
(latência/tokens/custo/resultado/motivo de conclusão) consumida pelos destinos de
feedback do plano de controlo (monitor de qualidade, exportador OTel, armazém explicativo).

### O que faltava (adicionado aqui)

1. Uma **abstração de evento tipado de resultado de encaminhamento + destino** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` está limitado a combos e apenas em memória;
   `comboMetrics` são contadores cumulativos; `call_logs` é persistência assíncrona em bruto.
   Nenhum deles é um canal de resultados tipado e baseado em destinos ao qual um monitor de qualidade, um exportador OTel
   ou um avaliador do tipo Future-AGI se possa subscrever.
2. Um **sinal de qualidade online** (EWMA) para a qualidade dos resultados — anteriormente, o avaliador
   representava a «qualidade» apenas através da adequação estática às tarefas e das taxas de aprovação de avaliações explicitamente ativadas.
3. Um **exportador OTel opcional e sem dependências** que utiliza convenções semânticas GenAI.
4. Um **endpoint de explicabilidade** que devolve as decisões reais de encaminhamento + o estado da qualidade.

## 2. Eventos de encaminhamento (base do feedback)

Ficheiros: `open-sse/services/routing/events.ts`, `.../index.ts`

Um `RoutingEvent` contém apenas metadados de encaminhamento:

```ts
interface RoutingEvent {
  requestId: string;
  provider: string;
  model: string;
  strategy: string; // "auto" | "priority" | "direct" | ...
  latencyMs: number;
  ttftMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome; // união com lista de valores permitidos
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` é uma interface ao estilo `Send+Sync` em TypeScript:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // tem de ser O(1), sem E/S síncrona
}
```

O caminho crítico chama `emitRoutingEvent(event)` uma vez por cada pedido concluído
(o callback de conclusão do streaming, o caminho de sucesso sem streaming e o
caminho de falha por resposta 200 malformada em `handleChatCore`). A distribuição
é um fan-out síncrono para os sinks registados, mas cada sink limita-se a colocar
eventos em fila/atualizar o estado em memória. **Sem escritas síncronas na base de
dados nem E/S de rede no caminho crítico.**

Sinks predefinidos:

- `MemoryRoutingEventStore` — buffer circular limitado (500), com os mais recentes
  primeiro, para o endpoint de explicação.
- Consumidor `QualityTracker` — atualiza a estimativa de qualidade EWMA.
- `OtlpHttpsEventSink` — opcional, ativado apenas quando
  `OMNIROUTE_OTEL_ENDPOINT` (ou `OTEL_EXPORTER_OTLP_ENDPOINT`) está definido.

### Sobrecarga medida (comparação transparente)

`npm run bench:routing-events` nesta estação de trabalho (100 mil iterações;
operações abaixo de µs medidas como µs/op agregados, porque os percentis por
operação estão abaixo da resolução do temporizador `performance.now()`):

| Cenário                                      | µs/op  | ops/s  |
| -------------------------------------------- | ------ | ------ |
| referência (apenas pontuação)                | ~0.045 | ~22 M  |
| referência + RoutingEvent (2 sinks)          | ~0.168 | ~5.9 M |
| referência + evento + colocação OTel em fila | ~0.163 | ~6.1 M |
| concorrente (8 rajadas intercaladas)         | ~0.18  | —      |

A diferença da distribuição de eventos relativamente à pontuação de referência
é de ~0,12 µs/pedido; o sink OTel apenas coloca eventos em fila (inserção num
buffer O(1)), sem acrescentar nada mensurável. Estes números são específicos da
máquina e relativos — não constituem uma garantia de produção. O valor de
"~0,2 µs" da v1 era uma estimativa agregada; esta metodologia separa a referência
de pontuação do custo da distribuição de eventos.

## 3. Sinal de qualidade (estado do fornecedor orientado por feedback)

Ficheiros: `open-sse/services/routing/quality.ts`

A v2 separa a qualidade **operacional** da qualidade **semântica**:

- **Operacional** — derivada do caminho crítico de encaminhamento (HTTP 4xx/5xx,
  falhas de ligação, respostas 429, respostas malformadas, interrupções de
  streaming, `finish_reason=length`, sucessos sem saída, EWMA de latência/TTFT).
  Uma resposta 200 NÃO é tratada como qualidade semântica.
- **Semântica** — o valor real da saída gerada. É produzida APENAS por um
  avaliador através de `setSemanticQuality()`. É `null` até que um avaliador a
  forneça e nunca influencia a pontuação operacional.

Estado por par (fornecedor, modelo) (EWMA + contadores limitados):

- `successEwma` — EWMA (α=0,2) do sucesso do resultado.
- `latencyEwma` / `ttftEwma` — EWMA da latência (α=0,1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — há quanto tempo o modelo foi observado pela última vez.

### Consideração da confiança/dimensão da amostra

`confidence = clamp01(samples / 50)`, e a pontuação devolvida ao sistema de
pontuação é combinada em direção ao ponto médio neutro:

```
score = 0.5 + confidence * (operational - 0.5)
```

Consequências (verificadas por testes):

- Um fornecedor sem dados (0 amostras) obtém uma pontuação de **0,5** — não é
  penalizado injustamente, mas não pode dominar um fornecedor com milhares de
  observações sólidas.
- Um fornecedor com 7 sucessos fortuitos é aproximado de 0,5 (nunca domina
  devido a uma inicialização otimista).
- Um fornecedor com 50 ou mais amostras converge para a sua verdadeira pontuação
  operacional.
- A degradação e a recuperação são graduais (EWMA), e uma única falha isolada
  não destrói um fornecedor saudável.

`ProviderQuality` expõe `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Isto alimenta o sistema de pontuação da combinação automática como o fator de
pontuação `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` em
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. A soma permanece 1.0.
- `buildAutoCandidates` preenche `candidate.quality` a partir do tracker; os
  candidatos sem dados usam por predefinição o valor neutro **0,5** (um candidato
  sem dados não é beneficiado nem penalizado).

O ciclo fechado:

```
RoutingEvent → QualityTracker → getQualityScore → fator de qualidade da combinação automática
      ↑                                                    │
      └────── resultado do pedido (handleChatCore) ←────────┘
```

### Exclusão estrita vs penalização suave

O sinal de qualidade é apenas uma **preferência adaptativa suave**. A exclusão
estrita continua a cargo da pilha de resiliência existente: disjuntor OPEN, quota
esgotada, falha de autenticação, bloqueio do modelo — nenhum destes elementos é
afetado pela pontuação de qualidade. Um fornecedor cuja pontuação de qualidade
baixe temporariamente passa a ter menor preferência, mas nunca é totalmente
desativado.

## 3b. Temporização canónica do stream (TTFT / ITL)

Ficheiros: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` é o único ponto de instrumentação do percurso de streaming,
integrado em `createSSEStream` (open-sse/utils/stream.ts):

- `markByte()` — primeiro chunk recebido do upstream.
- `markForward()` — primeiro chunk encaminhado para o cliente (utilizado para TTFT).
- `markInterrupted()` — timeout/interrupção/erro do stream antes de uma conclusão normal.
- `ttft()` = latência do primeiro chunk SSE encaminhado. **Isto NÃO é TTFT ao nível do token** —
  um único chunk SSE pode transportar zero/um/vários tokens. Documentado com precisão.
- `avgItlMs()` = intervalo médio entre chunks (uma aproximação da latência de chunks para ITL).

TTFT/ITL/interrupted são incorporados no `RoutingEvent` (`ttftMs`, `itlMs`) e
exportados como atributos de span GenAI/OmniRoute pelo sink OTel.

## 4. Observabilidade OpenTelemetry / GenAI

Ficheiros: `open-sse/services/routing/otel.ts`

- Exportador OTLP/HTTP JSON sem dependências (utiliza o `fetch` global, sem o
  SDK `@opentelemetry/*`).
- Os spans seguem as convenções semânticas GenAI (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`), além dos atributos de
  encaminhamento OmniRoute (resultado, estado, ttft, novas tentativas, fallback).
- `record()` limita-se a colocar numa fila de buffer com tamanho limitado (O(1)); um temporizador
  em segundo plano efetua o envio de forma assíncrona através de `POST {endpoint}/v1/traces`. Em caso de sobrecarga, os
  eventos mais antigos são descartados (contador `dropped`) — nunca aplica contrapressão ao plano
  de dados.
- **Desativado, exceto se configurado.** É necessário definir `OMNIROUTE_OTEL_ENDPOINT` (ou
  `OTEL_EXPORTER_OTLP_ENDPOINT`); caso contrário, o sink não é
  registado e não é executado qualquer código OTel.

## 5. Explicabilidade

- `GET /v1/explain/routing` devolve os `RoutingEvent`s recentes (as decisões
  reais, começando pelas mais recentes) e o snapshot de qualidade por fornecedor/modelo.
- A autenticação replica `/v1/combos` (chave de API Bearer ou sessão do dashboard; acesso anónimo em
  implementações locais de utilizador único com `REQUIRE_API_KEY=false`).
- Os rastos por invocação ao nível dos combos permanecem disponíveis através do
  `decisionTrace.ts` existente (cabeçalho `X-OmniRoute-Combo-Trace`).
- Segurança: os eventos contêm apenas metadados de encaminhamento, nunca prompts/corpos/credenciais.

## 6. Integração do plano de avaliação (preparação para Future AGI)

O OmniRoute trata o Future AGI (ou qualquer avaliador) como um **potencial
backend de inteligência/avaliação, não como uma dependência**. Os pontos de integração:

- Um `RoutingEventSink` pode encaminhar eventos para um avaliador de forma assíncrona.
- O `MemoryRoutingEventStore` + snapshot de qualidade fornecem a um avaliador o fluxo
  bruto de decisões.
- Um futuro `Evaluator` (determinístico, avaliador local, HTTP, WASM) consumiria
  eventos/rastos e devolveria um `QualityScore` que alimentaria o mesmo percurso
  `getQualityScore`/fator de qualidade.
- O encaminhamento existente orientado por avaliações (`open-sse/services/evalRouting.ts`) já
  reordena os destinos de combos pelas taxas de aprovação de `eval_runs`, quando ativado.

Nenhuma avaliação é executada de forma síncrona no percurso dos pedidos, e o gateway funciona
plenamente sem a presença do avaliador.

## 7. Revisão arquitetural final

1. **O que permanece no percurso crítico síncrono?** Encaminhamento/pontuação, pré-verificações
   de guardrails, consulta da cache e um fan-out de `emitRoutingEvent` (~0,12 µs acima
   da pontuação de referência) para sinks em memória.
2. **O que foi transferido para processamento assíncrono?** Exportação OTel (temporizador + fetch),
   persistência de `call_logs`/utilização, escritas na cache semântica; a qualidade é mantida em memória
   e é O(1) (não requer processamento assíncrono).
3. **Como é que um resultado de encaminhamento se transforma em feedback?** `handleChatCore` emite um
   `RoutingEvent` → `QualityTracker` atualiza o estado EWMA → `getQualityScore`
   alimenta o fator `quality` do combo automático.
4. **Como é que a qualidade influencia o encaminhamento futuro?** Uma pontuação de qualidade baixa reduz
   a pontuação ponderada desse fornecedor/modelo em `scoreAutoTargets`, pelo que os modelos
   degradados vão perdendo gradualmente a preferência e recuperam à medida que a respetiva EWMA melhora.
5. **Como pode o Future AGI ser integrado sem se tornar uma dependência?** Através da
   interface `RoutingEventSink` / de um futuro adaptador `Evaluator` — sem qualquer dependência
   codificada diretamente.
6. **O que acontece quando o avaliador está indisponível?** O encaminhamento não é afetado;
   a qualidade recorre ao valor neutro (1.0) para modelos sem sinal observado.
7. **O que acontece quando a telemetria está indisponível?** O sink OTel simplesmente não é
   registado; o resto da camada de encaminhamento continua a funcionar sem alterações.
8. **O que acontece em caso de sobrecarga?** O buffer OTel descarta os eventos mais antigos; a qualidade
   e o buffer circular têm limites definidos pela própria implementação; não existe contrapressão.
9. **Como recupera o estado do fornecedor após uma degradação?** A EWMA volta a convergir à medida que
   os sucessos se acumulam; o aquecimento mantém os modelos sem histórico num estado neutro; o disjuntor
   recupera de forma independente através de sondagens HALF_OPEN.
10. **Que funcionalidades propostas NÃO foram intencionalmente implementadas e porquê?**
    - Tráfego sombra / experiências — já implementados
      (`combo/shadowRouting.ts`); não foram recriados.
    - Guardrails — já implementados (`src/lib/guardrails/`); não foram duplicados.
    - Cache semântica — já implementada (`src/lib/semanticCache.ts`); não foi
      duplicada.
    - Uma plataforma completa de gestão de experiências, ferramentas para conjuntos de dados, uma plataforma
      de otimização de prompts, uma base de dados vetorial ou infraestrutura OTel externa obrigatória — estão fora do
      âmbito de um plano de dados leve.
    - Uma struct `RoutingEvent` em Rust — o plano de dados está em TypeScript; o tipo TS
      é o equivalente adaptado.

## 8. Referência de configuração

| Variável                      | Predefinição | Efeito                                                                                             |
| ----------------------------- | ------------ | -------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | não definida | Quando definida, ativa o exportador de rastreios OTLP/HTTP (por exemplo, `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | não definida | Alias de recurso para o endpoint OTLP.                                                             |
| `OTEL_SERVICE_NAME`           | `omniroute`  | Atributo de recurso `service.name`.                                                                |

## 9. Testes

- `tests/unit/routing-events.test.ts` — normalização de eventos, classificação
  de estados, buffer circular limitado, distribuição para coletores + isolamento.
- `tests/unit/routing-quality.test.ts` — aquecimento da EWMA, recuperação após falha/sucesso,
  penalizações por anomalias, tratamento transitório de 429, instantâneo, reposição.
- `tests/unit/routing-scoring-quality.test.ts` — integridade dos pesos, predefinição
  neutra, ordenação por fator de qualidade.
- `tests/unit/routing-otel.test.ts` — controlo de ativação, conteúdo do span GenAI, descarga
  assíncrona, descarte em caso de sobrecarga.
- `tests/unit/routing-events-concurrency.test.ts` — milhares de eventos, limitação
  do buffer circular, isolamento de coletores que lançam exceções, rajadas assíncronas intercaladas,
  reposição durante inserções.
- `tests/unit/routing-adaptive-e2e.test.ts` — ciclo determinístico de ponta a ponta através
  do avaliador `scoreAutoTargets` real: saudável → degradação → recuperação → falha pontual, além de
  cenários de arranque a frio e de fornecedor a frio com sorte.
- `tests/unit/stream-timing.test.ts` — TTFT (primeiro fragmento reencaminhado), ITL,
  primeiro byte vs. primeiro reencaminhamento, interrupção, segurança perante fragmentos malformados/vazios.

## 10. Estado dos problemas preexistentes (Fase 18)

| Problema                                                     | Estado                        | Notas                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Incompatibilidade da exportação `omniglyph`                  | **CORRIGIDO (ambiental)**     | `node_modules` estava dessincronizado de `package-lock.json` (versão 1.3.1 instalada vs. 1.4.0 bloqueada). A execução de `npm install omniglyph@1.4.0` restaurou a versão bloqueada; os erros de tipos desceram para 0. Manifestos inalterados.                                       |
| Testes `getKnownContextOverflow` obsoletos                   | **CONHECIDO — não corrigido** | `combo-context-overflow-compression-probe.test.ts` importa uma função que já não existe em `open-sse/services/combo.ts` (apenas os comentários lhe fazem referência). A correção exige voltar a implementá-la ou reescrever esses testes — alterações arquiteturais não relacionadas. |
| Isolamento da BD em `combo-runtime-unit-concurrency.test.ts` | **CONHECIDO — não corrigido** | A asserção de isolamento do SQLite da infraestrutura de testes falha quando executada diretamente; falha de forma idêntica no ramo base.                                                                                                                                              |
| Divergência de `llm.txt` de i18n                             | **CONHECIDO — não corrigido** | `docs/i18n/*/llm.txt` diferem da raiz; problema preexistente que bloqueia a validação de sincronização da documentação antes do commit.                                                                                                                                               |

Os problemas ambientais e de código são mantidos separados; nenhuma falha não relacionada é ocultada
por filtros de testes alterados.
