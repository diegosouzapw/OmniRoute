# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Este documento descreve a base de roteamento adaptativo orientado por feedback adicionada ao
OmniRoute. Ela é deliberadamente pequena: introduz um canal tipado de resultados de
roteamento, um sinal de qualidade on-line que alimenta o avaliador de auto-combo existente, um
exportador OpenTelemetry opcional e um endpoint de explicabilidade. Ela **não**
substitui a pilha de resiliência existente (circuit breaker, cooldown de conexão,
bloqueio de modelo, matriz de integridade, autopilot) — ela a complementa.

## 1. Contexto arquitetural

O OmniRoute é um plano de dados com um **caminho crítico de requisições** e um **plano de
controle/inteligência**. O caminho crítico deve permanecer rápido, eficiente no uso de memória, assíncrono, resiliente e
previsível. Avaliação, pontuação de qualidade, experimentos e análise histórica pertencem
ao plano de controle.

```
Agente de IA / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   plano de dados (rápido, síncrono, em memória)
│ roteamento / failover│
│ integridade / proteção│
│ cache / streaming   │
└──────────┬──────────┘
           │ RoutingEvent (disparar e esquecer, ~0.2µs)
           ▼
┌─────────────────────┐
│ Destinos de feedback│   plano de controle (assíncrono, melhor esforço)
│ rastreador de qualidade│
│ exportador OTel     │
│ armazenamento de explicações│
└──────────┬──────────┘
           ▼  pontuação de qualidade
      avaliador de auto-combo
```

### O que já existia (auditado, não duplicado)

| Conceito                                          | Implementação existente                                                                                                 |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Disponibilidade (podemos enviar tráfego?)         | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN, persistido no banco de dados), cooldown de conexão, bloqueio de modelo |
| Relatórios de integridade                         | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                                 |
| Tráfego de sombra                                 | `open-sse/services/combo/shadowRouting.ts`                                                                              |
| Proteções                                         | `src/lib/guardrails/` (hooks pré/pós)                                                                                   |
| Cache exato                                       | `src/lib/semanticCache.ts` (baseado em assinatura)                                                                      |
| Avaliadores / roteamento orientado por avaliações | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                                    |
| Explicabilidade da decisão de combo               | `open-sse/services/combo/decisionTrace.ts`                                                                              |
| Eventos em tempo real do painel                   | `src/lib/events/eventBus.ts` (canal de notificações da interface, payloads `unknown`, histórico de 100 entradas)        |

A camada de eventos de roteamento **não** é uma reimplementação do `eventBus`: esse barramento é
o canal de notificações em tempo real do painel (nomes de _eventos_ tipados, payloads
opacos, consumidores da interface). `RoutingEvent` é uma estrutura tipada de _resultado_
(latência/tokens/custo/resultado/motivo de término) consumida pelos destinos de
feedback do plano de controle (rastreador de qualidade, exportador OTel, armazenamento de explicações).

### O que estava faltando (adicionado aqui)

1. Um **evento tipado de resultado de roteamento + abstração de destino** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` tem escopo limitado ao combo e existe somente em memória;
   `comboMetrics` são contadores cumulativos; `call_logs` é persistência assíncrona bruta.
   Nenhum deles é um canal de resultados tipado e baseado em destinos ao qual um rastreador de qualidade, um exportador
   OTel ou um avaliador no estilo Future-AGI possa se inscrever.
2. Um **sinal de qualidade on-line** (EWMA) para a qualidade da saída — anteriormente, o avaliador
   aproximava a "qualidade" apenas por meio da adequação estática à tarefa e das taxas de aprovação opcionais das avaliações.
3. Um **exportador OTel opcional e sem dependências** que utiliza convenções semânticas de GenAI.
4. Um **endpoint de explicabilidade** que retorna as decisões reais de roteamento + o estado de qualidade.

## 2. Eventos de roteamento (base do feedback)

Arquivos: `open-sse/services/routing/events.ts`, `.../index.ts`

Um `RoutingEvent` contém apenas metadados de roteamento:

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

`RoutingEventSink` é um trait no estilo `Send+Sync` em TypeScript:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // deve ser O(1), sem E/S síncrona
}
```

O caminho crítico chama `emitRoutingEvent(event)` uma vez por solicitação concluída
(o callback de conclusão de streaming, o caminho de sucesso sem streaming e o
caminho de falha por resposta 200 malformada em `handleChatCore`). O despacho é
uma distribuição síncrona para os sinks registrados, mas cada sink apenas
enfileira/atualiza o estado em memória. **Nenhuma gravação síncrona no banco de
dados e nenhuma E/S de rede no caminho crítico.**

Sinks padrão:

- `MemoryRoutingEventStore` — buffer circular limitado (500), com os mais recentes
  primeiro, para o endpoint de explicação.
- Consumidor `QualityTracker` — atualiza a estimativa de qualidade EWMA.
- `OtlpHttpsEventSink` — opcional, habilitado somente quando
  `OMNIROUTE_OTEL_ENDPOINT` (ou `OTEL_EXPORTER_OTLP_ENDPOINT`) está definido.

### Sobrecarga medida (comparação realista)

`npm run bench:routing-events` nesta estação de trabalho (100 mil iterações; operações
abaixo de µs medidas como µs/op agregado, pois os percentis por operação ficam
abaixo da resolução do temporizador `performance.now()`):

| Cenário                                      | µs/op  | ops/s  |
| -------------------------------------------- | ------ | ------ |
| linha de base (somente pontuação)            | ~0.045 | ~22 M  |
| linha de base + RoutingEvent (2 sinks)       | ~0.168 | ~5.9 M |
| linha de base + evento + enfileiramento OTel | ~0.163 | ~6.1 M |
| concorrente (8 rajadas intercaladas)         | ~0.18  | —      |

A diferença do despacho de eventos em relação à pontuação de referência é de
~0.12 µs/solicitação; o sink OTel apenas enfileira (inserção O(1) no buffer), sem
adicionar nada mensurável. Esses números são específicos da máquina e relativos —
não constituem uma garantia para produção. O valor de "~0.2 µs" da v1 era uma
estimativa agregada; esta metodologia separa a linha de base da pontuação do custo
de despacho de eventos.

## 3. Sinal de qualidade (estado do provedor orientado por feedback)

Arquivos: `open-sse/services/routing/quality.ts`

A v2 separa a qualidade **operacional** da **semântica**:

- **Operacional** — derivada do caminho crítico de roteamento (HTTP 4xx/5xx, falhas
  de conexão, 429s, respostas malformadas, interrupções de streaming,
  `finish_reason=length`, sucessos com saída zero, EWMA de latência/TTFT). Uma
  resposta 200 NÃO é tratada como qualidade semântica.
- **Semântica** — o valor real da saída gerada. Produzida SOMENTE por um avaliador
  por meio de `setSemanticQuality()`. É `null` até que um avaliador a forneça e
  nunca é incorporada à pontuação operacional.

Estado por (provedor, modelo) (EWMA + contadores limitados):

- `successEwma` — EWMA (α=0.2) do sucesso do resultado.
- `latencyEwma` / `ttftEwma` — EWMA da latência (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — há quanto tempo o modelo foi observado pela última vez.

### Consideração de confiança / amostras

`confidence = clamp01(samples / 50)`, e a pontuação retornada ao mecanismo de
pontuação é combinada em direção ao ponto médio neutro:

```
score = 0.5 + confidence * (operational - 0.5)
```

Consequências (verificadas por testes):

- Um provedor sem histórico (0 amostras) recebe pontuação **0.5** — não é
  penalizado injustamente, mas não consegue superar um provedor com milhares de
  observações consistentes.
- Um provedor com 7 sucessos por sorte é aproximado de 0.5 (nunca prevalece por
  causa de uma inicialização otimista).
- Um provedor com 50 ou mais amostras converge para sua pontuação operacional real.
- A degradação e a recuperação são graduais (EWMA), e uma falha isolada não
  compromete um provedor saudável.

`ProviderQuality` expõe `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Isso alimenta o mecanismo de pontuação auto-combo como o fator de pontuação
`quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` em
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. A soma permanece 1.0.
- `buildAutoCandidates` preenche `candidate.quality` com dados do rastreador;
  candidatos sem dados usam por padrão o valor neutro **0.5** (um candidato sem
  histórico não recebe bônus nem penalidade).

O ciclo fechado:

```
RoutingEvent → QualityTracker → getQualityScore → fator de qualidade do auto-combo
      ↑                                                    │
      └────── resultado da solicitação (handleChatCore) ←──┘
```

### Exclusão rígida vs. penalidade branda

O sinal de qualidade é apenas uma **preferência adaptativa branda**. A exclusão
rígida permanece com a pilha de resiliência existente: circuit breaker OPEN, cota
esgotada, falha de autenticação, bloqueio do modelo — nenhum desses fatores é
afetado pela pontuação de qualidade. Um provedor cuja pontuação de qualidade caia
temporariamente passa a ter menor preferência, mas nunca é desabilitado de forma
rígida.

## 3b. Temporização canônica do stream (TTFT / ITL)

Arquivos: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` é o único ponto de instrumentação do caminho de streaming,
integrado a `createSSEStream` (open-sse/utils/stream.ts):

- `markByte()` — primeiro chunk recebido do upstream.
- `markForward()` — primeiro chunk encaminhado ao cliente (usado para TTFT).
- `markInterrupted()` — timeout/interrupção/erro do stream antes de uma conclusão normal.
- `ttft()` = latência até o primeiro chunk SSE encaminhado. **Isso NÃO é TTFT no nível de token** —
  um único chunk SSE pode transportar zero/um/muitos tokens. Documentado com precisão.
- `avgItlMs()` = intervalo médio entre chunks (uma aproximação da latência de chunks para ITL).

TTFT/ITL/interrupted fluem para o `RoutingEvent` (`ttftMs`, `itlMs`) e são
exportados como atributos de span GenAI/OmniRoute pelo sink OTel.

## 4. Observabilidade OpenTelemetry / GenAI

Arquivos: `open-sse/services/routing/otel.ts`

- Exportador OTLP/HTTP JSON sem dependências (usa o `fetch` global, sem o
  SDK `@opentelemetry/*`).
- Os spans seguem as convenções semânticas de GenAI (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`), além dos atributos de
  roteamento do OmniRoute (resultado, status, TTFT, novas tentativas, fallback).
- `record()` apenas enfileira em um buffer limitado (O(1)); um temporizador em
  segundo plano faz o flush via `POST {endpoint}/v1/traces` de forma assíncrona.
  Sob sobrecarga, os eventos mais antigos são descartados (contador `dropped`) —
  nunca aplica backpressure ao plano de dados.
- **Desabilitado a menos que seja configurado.** `OMNIROUTE_OTEL_ENDPOINT` (ou
  `OTEL_EXPORTER_OTLP_ENDPOINT`) deve ser definido; caso contrário, o sink não é
  registrado e nenhum código OTel é executado.

## 5. Explicabilidade

- `GET /v1/explain/routing` retorna os `RoutingEvent`s recentes (as decisões
  reais, das mais novas para as mais antigas) e o snapshot de qualidade por
  provedor/modelo.
- A autenticação replica `/v1/combos` (chave de API Bearer ou sessão do painel;
  acesso anônimo em implantações locais de usuário único com
  `REQUIRE_API_KEY=false`).
- Os traces por invocação no nível de combo continuam disponíveis por meio do
  `decisionTrace.ts` existente (cabeçalho `X-OmniRoute-Combo-Trace`).
- Segurança: os eventos contêm apenas metadados de roteamento, nunca
  prompts/corpos/credenciais.

## 6. Integração com o plano de avaliação (preparação para Future AGI)

O OmniRoute trata o Future AGI (ou qualquer avaliador) como um **backend
potencial de inteligência/avaliação, não como uma dependência**. Os pontos de
integração:

- Um `RoutingEventSink` pode encaminhar eventos de forma assíncrona para um
  avaliador.
- O `MemoryRoutingEventStore` + snapshot de qualidade fornecem ao avaliador o
  fluxo bruto de decisões.
- Um futuro `Evaluator` (determinístico, juiz local, HTTP, WASM) consumiria
  eventos/traces e retornaria um `QualityScore` que alimenta o mesmo caminho de
  `getQualityScore`/fator de qualidade.
- O roteamento orientado por avaliações existente
  (`open-sse/services/evalRouting.ts`) já reordena os destinos de combos pelas
  taxas de aprovação de `eval_runs` quando habilitado.

Nenhuma avaliação é executada de forma síncrona no caminho da requisição, e o
gateway funciona plenamente sem a presença do avaliador.

## 7. Revisão arquitetural final

1. **O que permanece no caminho crítico síncrono?** Roteamento/pontuação,
   pré-verificações de guardrails, consulta ao cache e um fan-out de
   `emitRoutingEvent` (~0,12 µs acima da pontuação de referência) para sinks em
   memória.
2. **O que foi movido para processamento assíncrono?** Exportação OTel
   (temporizador + fetch), persistência de `call_logs`/uso e gravações no cache
   semântico; a qualidade fica em memória e é O(1) (não requer processamento
   assíncrono).
3. **Como um resultado de roteamento se torna feedback?** `handleChatCore` emite
   um `RoutingEvent` → `QualityTracker` atualiza o estado EWMA →
   `getQualityScore` alimenta o fator `quality` do combo automático.
4. **Como a qualidade influencia o roteamento futuro?** Uma pontuação de
   qualidade baixa reduz a pontuação ponderada desse provedor/modelo em
   `scoreAutoTargets`, de modo que modelos degradados perdem prioridade
   gradualmente e se recuperam à medida que sua EWMA melhora.
5. **Como o Future AGI pode ser integrado sem se tornar uma dependência?** Por
   meio da interface `RoutingEventSink` / de um futuro adaptador `Evaluator` —
   sem dependência codificada diretamente.
6. **O que acontece quando o avaliador está indisponível?** O roteamento não é
   afetado; para modelos sem sinal observado, a qualidade usa como fallback o
   valor neutro (1.0).
7. **O que acontece quando a telemetria está indisponível?** O sink OTel
   simplesmente não é registrado; o restante da camada de roteamento continua
   funcionando sem alterações.
8. **O que acontece sob sobrecarga?** O buffer OTel descarta os eventos mais
   antigos; o estado de qualidade e o buffer circular são limitados por
   construção; não há backpressure.
9. **Como o estado do provedor se recupera após uma degradação?** A EWMA
   converge novamente à medida que os sucessos se acumulam; o warmup mantém
   modelos sem histórico em estado neutro; o circuit breaker se recupera de
   forma independente por meio de sondagens HALF_OPEN.
10. **Quais recursos propostos NÃO foram implementados intencionalmente e por
    quê?**
    - Tráfego shadow / experimentos — já implementados
      (`combo/shadowRouting.ts`); não foram reconstruídos.
    - Guardrails — já implementados (`src/lib/guardrails/`); não foram
      duplicados.
    - Cache semântico — já implementado (`src/lib/semanticCache.ts`); não foi
      duplicado.
    - Uma plataforma completa de gerenciamento de experimentos, ferramentas de
      datasets, plataforma de otimização de prompts, banco de dados vetorial ou
      infraestrutura OTel externa obrigatória — fora do escopo de um plano de
      dados enxuto.
    - Uma struct `RoutingEvent` em Rust — o plano de dados usa TypeScript; o
      tipo TS é o equivalente adaptado.

## 8. Referência de configuração

| Variável                      | Padrão       | Efeito                                                                                            |
| ----------------------------- | ------------ | ------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | não definido | Quando definida, habilita o exportador de rastreamentos OTLP/HTTP (ex.: `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | não definido | Alias alternativo para o endpoint OTLP.                                                           |
| `OTEL_SERVICE_NAME`           | `omniroute`  | Atributo de recurso `service.name`.                                                               |

## 9. Testes

- `tests/unit/routing-events.test.ts` — normalização de eventos, classificação
  de status, buffer circular limitado, distribuição para coletores + isolamento.
- `tests/unit/routing-quality.test.ts` — aquecimento da EWMA, recuperação após falha/sucesso,
  penalidades por anomalias, tratamento transitório de 429, snapshot, redefinição.
- `tests/unit/routing-scoring-quality.test.ts` — integridade dos pesos, padrão
  neutro, classificação por fator de qualidade.
- `tests/unit/routing-otel.test.ts` — controle de habilitação, payload de span GenAI, liberação
  assíncrona, descarte sob sobrecarga.
- `tests/unit/routing-events-concurrency.test.ts` — milhares de eventos, limitação
  do buffer circular, isolamento de coletores que lançam erros, rajadas assíncronas intercaladas,
  redefinição durante inserções.
- `tests/unit/routing-adaptive-e2e.test.ts` — ciclo determinístico de ponta a ponta por meio
  do pontuador real `scoreAutoTargets`: íntegro → degradação → recuperação → oscilação, além de
  cenários de inicialização a frio e provedor a frio com sorte.
- `tests/unit/stream-timing.test.ts` — TTFT (primeiro chunk encaminhado), ITL,
  primeiro byte versus primeiro encaminhamento, interrupção, segurança para chunks malformados/vazios.

## 10. Status de problemas preexistentes (Fase 18)

| Problema                                                     | Status                        | Observações                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Incompatibilidade de exportação do `omniglyph`               | **CORRIGIDO (ambiental)**     | `node_modules` estava dessincronizado de `package-lock.json` (versão 1.3.1 instalada versus 1.4.0 fixada). A execução de `npm install omniglyph@1.4.0` restaurou a versão fixada; os erros de tipo caíram para 0. Manifestos inalterados.                                      |
| Testes obsoletos de `getKnownContextOverflow`                | **CONHECIDO — não corrigido** | `combo-context-overflow-compression-probe.test.ts` importa uma função que não existe mais em `open-sse/services/combo.ts` (somente comentários fazem referência a ela). A correção exige reimplementar ou reescrever esses testes — alterações arquiteturais não relacionadas. |
| Isolamento de BD em `combo-runtime-unit-concurrency.test.ts` | **CONHECIDO — não corrigido** | A asserção de isolamento do SQLite no ambiente de testes falha quando executada diretamente; falha de forma idêntica na branch base.                                                                                                                                           |
| Divergência de i18n em `llm.txt`                             | **CONHECIDO — não corrigido** | `docs/i18n/*/llm.txt` difere da raiz; problema preexistente que bloqueia a verificação de sincronização da documentação no pre-commit.                                                                                                                                         |

Problemas ambientais e de código são mantidos separados; nenhuma falha não relacionada fica oculta
por trás de filtros de teste alterados.
