# Resilience Guide (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

O OmniRoute tem três mecanismos de resiliência distintos mas relacionados. Cada um tem um âmbito e um propósito diferentes. Mantenha-os separados ao depurar o comportamento de encaminhamento.

![modelo de resiliência de 3 camadas](../diagrams/exported/resilience-3layers.svg)

> Fonte: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Circuit Breaker de Fornecedor

**Âmbito:** fornecedor inteiro (p. ex., `glm`, `openai`, `anthropic`).

**Objetivo:** parar de enviar tráfego para um fornecedor que está a falhar repetidamente ao nível do serviço upstream.

**Implementação:**

- Classe principal: `src/shared/utils/circuitBreaker.ts`
- Ligações: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de estado: `GET /api/monitoring/health`
- API de reposição: `POST /api/resilience/reset`
- Wrappers: `open-sse/services/accountFallback.ts`
- Tabela da BD: `domain_circuit_breakers`

**Estados:**

- `CLOSED` — tráfego normal permitido
- `DEGRADED` — o tráfego continua a ser permitido, mas as falhas elevadas do fornecedor estão a ser monitorizadas; regressa a `CLOSED` após sucessos suficientes, após um teste de ligação válido, ou após a retenção em `OPEN` mais longa para o último tipo de falha (o seu valor `cooldownByKind`, caso contrário `resetTimeout`, × `maxBackoffMultiplier`, no mínimo um cooldown) sem uma nova falha
- `OPEN` — fornecedor temporariamente bloqueado; o encaminhamento combo ignora-o
- `HALF_OPEN` — o tempo limite de reposição decorreu; pedido de sonda permitido

**Predefinições configuráveis (`open-sse/config/constants.ts`, expostas em Dashboard → Settings → Resilience):**

| Classe  | Degrada em | Abre em   | Tempo limite de reposição |
| ------- | ---------- | --------- | ------------------------- |
| OAuth   | 5 falhas   | 8 falhas  | 60s                       |
| API-key | 7 falhas   | 12 falhas | 30s                       |
| Local   | derivado   | 2 falhas  | 15s                       |

O `degradationThreshold` controla quando um fornecedor entra em `DEGRADED`; o `failureThreshold` controla quando abre e é ignorado. Os perfis de fornecedores locais ainda não estão expostos na página de definições de Resilience.

**Códigos de disparo:** apenas códigos de estado ao nível do fornecedor `[408, 500, 502, 503, 504]`. NÃO dispare para erros ao nível da conta (a maioria dos 401/403/429 — esses pertencem ao cooldown ou ao lockout).

**Recuperação diferida (lazy):** quando o `OPEN` expira, `getStatus()`, `canExecute()`, `getRetryAfterMs()` atualizam o estado para `HALF_OPEN`. As mesmas leituras (e a falha seguinte) fazem decair um `DEGRADED` obsoleto de volta para `CLOSED`. Não é necessário nenhum temporizador em segundo plano.

---

### Cooldown global de fornecedor opcional (window gate)

Uma quarta camada, **opcional** (`PROVIDER_COOLDOWN_ENABLED`, predefinição **desativada**), mantém uma memória entre pedidos dos fornecedores em falha em
`open-sse/services/providerCooldownTracker.ts`, consultada pela resolução de destinos do combo para que pedidos combo consecutivos deixem de revisitar um fornecedor que acabou de falhar. As entradas ao nível do fornecedor respeitam o window gate de `PROVIDER_PROFILES`:

| Perfil  | dispara após (`providerFailureThreshold`) | dentro de (`providerFailureWindowMs`) | arrefece durante (`providerCooldownMs`) |
| ------- | ----------------------------------------: | ------------------------------------: | --------------------------------------: |
| OAuth   |                                      `10` |                               `15min` |                                  `5min` |
| API key |                                      `15` |                               `30min` |                                 `10min` |

Abaixo do limiar, o fornecedor **não** é considerado em arrefecimento; um sucesso limpa
a janela. As entradas ao nível da ligação (`provider:connectionId`) mantêm, em alternativa, o
backoff exponencial `minRetryCooldownMs → maxRetryCooldownMs`. Substituições:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Proteção de regressão: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Cooldown de ligação

**Âmbito:** uma única ligação/conta/chave de fornecedor.

**Objetivo:** ignorar uma chave problemática enquanto as outras ligações do mesmo fornecedor continuam a servir.

**Implementação:**

- Marcar como indisponível: `src/sse/services/auth.ts::markAccountUnavailable()`
- Seleção: `getProviderCredentials*` no mesmo ficheiro
- Cálculo do cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Definições: `src/lib/resilience/settings.ts`

**Campos por ligação:**

- `rateLimitedUntil` — timestamp até ao qual o cooldown expira
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — contador de backoff exponencial

**Cooldowns predefinidos:**

- Base OAuth: 5s
- Base de chave API: 3s
- 429 de chave API: prefere os cabeçalhos `Retry-After`/reset do upstream ou texto de reset analisável
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Proteção anti-thundering-herd:** impede que falhas concorrentes prolonguem excessivamente o cooldown ou incrementem duas vezes o `backoffLevel`.

**Os 429 de limite de concorrência não sobem a escada de backoff.** Um `429` cujo corpo indica um
limite de concorrência ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) significa que a conta está saudável mas ocupada.
`checkFallbackError()` devolve a razão `concurrency_limited`: faz failover imediato para a ligação
seguinte, coloca esta em cooldown durante um valor fixo de `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) ou
a sugestão de retry do upstream, mantém o `backoffLevel` inalterado e define `skipProviderBreaker`.
Um corpo de quota explícita continua a prevalecer, pelo que um corpo que também corresponda a um
padrão de quota continua a ser um veredito de quota. Deteção: `looksLikeConcurrencyLimit()` em
`src/shared/utils/classify429.ts`; veredito: `open-sse/services/accountFallback/concurrencyLimit429.ts`.
`classify429()` (o `FailureKind` do breaker) permanece inalterado e continua a ler `rate_limit`
para estes corpos.

**As paragens de conteúdo do stream não arrefecem a conta.** Quando o watchdog de paragem de
conteúdo (`open-sse/utils/streamHandler.ts`) desiste de um stream que não enviou saída do modelo
a tempo, `markAccountUnavailable()` regista o erro na ligação mas não define cooldown: a paragem
pertence a esse pedido — na maioria das vezes um turno de raciocínio longo ainda sem saída.
Os operadores podem reativar este comportamento com `resilienceSettings.streamStallCooldown.enabled`
(predefinição `false`).

**As frames de raciocínio reiniciam o orçamento de paragem de conteúdo.** Um modelo de raciocínio
pode pensar durante minutos antes do seu primeiro token visível: o Claude transmite frames
`thinking_delta` cujo texto de raciocínio pode estar vazio, e a Responses API transmite um item de
raciocínio atrás do outro. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`)
reconhece estas frames, e o watchdog reinicia o seu orçamento em cada uma em vez de cancelar o
turno. Continuam a não ser saída do modelo, pelo que um turno que termina apenas com raciocínio
continua a ser reportado como vazio, e um turno que deixa de raciocinar e passa apenas a enviar
heartbeats continua a acionar o watchdog.

As frames binárias `reasoningContentEvent` do Kiro com assinatura não vazia preservam esta
atividade de raciocínio através do executor como um delta `reasoning_content` vazio. A assinatura
não é reencaminhada. Metadados, frames incompletas e assinaturas vazias não reiniciam o orçamento
de conteúdo; o timeout independente de stream ativo e o cancelamento pelo cliente continuam a
aplicar-se (`open-sse/executors/kiro/reasoning.ts`).

**Estados terminais (NÃO são cooldowns):**

- `banned` — definido pela deteção de palavras-chave banidas / banimento de conta (ver [BAN_DETECTION](../security/BAN_DETECTION.md)) e por três recusas consecutivas do upstream por pedido (`request_rejected`, p. ex. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); uma única recusa apenas coloca a ligação em cooldown
- `expired` (transita para terminal após um número limitado de tentativas — `EXPIRED_RETRY_MAX = 3` com backoff exponencial — para que erros OAuth transitórios possam resolver-se sozinhos antes de a conta ser desativada permanentemente)
- `credits_exhausted`

Estes estados persistem até as credenciais mudarem ou um operador os repuser. Não substituir estados terminais por estado transitório de cooldown.

**Recuperação preguiçosa (lazy):** quando `rateLimitedUntil` já passou, a ligação volta a ficar elegível. Após uma utilização bem-sucedida, `clearAccountError()` limpa todos os campos de erro.

### Muro de utilização OAuth do Claude: via de prioridade mais baixa + reposição do limite de sessão

**Âmbito:** uma ligação de subscrição Claude (OAuth). Ambas as funcionalidades são **opt-in por
ligação** (Editar ligação → secção Claude → `lowPriorityMode` / `autoLimitReset` em
`providerSpecificData`, ambas desativadas por predefinição) e espelham os comandos `/low-priority` e
`/limit-reset` do Claude Code (contrato de comunicação capturado a partir do Claude Code 2.1.263).

**Implementação:**

- Máquina de estados + classificação de respostas: `open-sse/services/claudeLowPriority.ts`
- Cliente de estado/reivindicação de reposição: `open-sse/services/claudeLimitReset.ts`
- Hook do executor (injeção de cabeçalhos + nova tentativa na mesma conta): `open-sse/executors/base.ts::execute()`
- Persistência do opt-in: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Gatilho:** o muro de utilização de 5 horas — um `429` cujos cabeçalhos trazem
`anthropic-ratelimit-unified-status: rejected` e, quando a conta é elegível,
`anthropic-ratelimit-unified-slow-offer: treatment`. Nada é enviado antes desse primeiro 429 do
muro; um 429 de rajada sem cabeçalhos unified segue o caminho normal de cooldown.

**Via de prioridade mais baixa** (`lowPriorityMode`):

- No 429 do muro, o executor aceita a oferta e tenta imediatamente de novo a **mesma**
  conta com `anthropic-usage-limit: slow`; a via permanece ativa até ao
  `anthropic-ratelimit-unified-reset` anunciado (+60s de tolerância) e todos os pedidos nessa
  janela transportam o cabeçalho. O 429 intercetado nunca chega ao `handleChatCore`, pelo que a
  ligação **não** é colocada em cooldown nem é afastada por rotação.
- `anthropic-ratelimit-unified-slow-status` em respostas posteriores: `active` / `not_needed`
  mantêm a via; `slot_busy` (429) ou um `529` aguardam o
  `anthropic-ratelimit-unified-slow-retry-after` do servidor (predefinição 20s, com clamp de
  5–600s, jitter de ±30%) e tentam de novo, limitados pelo
  `anthropic-ratelimit-unified-slow-max-wait` (predefinição 20 min, com clamp de
  1 min–6 h) — para além disso, a via termina e um cool-off de 10 minutos bloqueia a
  reaceitação. A espera é adicionalmente limitada pelo que resta do timeout de início de
  upstream do próprio pedido (`resolveFetchStartTimeout`, 10 min por predefinição) menos uma
  margem de 5 s: sem esse teto, o max-wait predefinido de 20 minutos sobreviveria ao pedido e
  o sleep seria abortado a meio da espera, fazendo surgir um `TimeoutError` em vez do fim
  gracioso `max_wait` + cool-off.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, uma rotação da janela de 5 h, ou
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (que a termina como
  `extra_usage` em qualquer estado, uma vez que o overage pago passa a cobrir o muro) terminam
  a via; a resposta flui então para o percurso normal de cooldown. `budget_exhausted` fica
  memorizado até ao reset de orçamento anunciado (≤ 8 dias).
- A verificação do muro corre depois das novas tentativas intra-tentativa do próprio executor
  motivadas por 400 (edição de contexto, clamps de thinking/effort, auto-aprendizagem de
  parâmetros), pelo que um 429 do muro que só surja numa dessas novas tentativas é ainda assim
  intercetado em vez de chegar ao percurso de cooldown.
- O estado é em memória por ligação (um reinício custa um 429 do muro extra para reaceitar).

**Reset do limite de sessão** (`autoLimitReset`, tentado antes da via quando ambos estão ativos):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → bloco
  `juniper_tide`; quando `arm: "reset"` e `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` com
  `{ "program": "juniper_tide" }` (UUID da organização obtido de
  `providerSpecificData.organizationUUID`, com fallback de bootstrap).
- `result: reset|not_limited` → o pedido é tentado de novo à velocidade máxima (sem cabeçalho
  slow). `already_used` / `not_offered` memoizam `next_available_at` (predefinição: uma
  semana); qualquer falha recua 15 minutos. O reset é uma vez por semana e continua a contar
  para o limite semanal.

Proteções contra regressões: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afinidade de sessão (#7274)

**Âmbito:** uma sessão de cliente (cabeçalho `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) fixada a uma ligação, para **qualquer** fornecedor.

**Objetivo:** manter um agente multi-turno (Claude Code, aider, agentes personalizados) na mesma conta ao longo dos pedidos, reduzindo a perda de contexto entre contas e os 429 repetidos de arranque a frio em fornecedores com estado de sessão por conta.

**Implementação:**

- Resolução do TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Seleção/criação da fixação: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extração de cabeçalhos (genérica, qualquer fornecedor): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabela de fixações persistida: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Definição: `sessionAffinityTtlMs` (TTL global em ms, `0` desativa) — `src/lib/db/settings.ts`. Renomeada a partir de `codexSessionAffinityTtlMs`, exclusiva do Codex, pela migração `124_generic_session_affinity_ttl.sql`, que transporta qualquer TTL de Codex previamente configurado como a nova predefinição.

Antes do #7274, `resolveSessionAffinityTtlMs()` devolvia imediatamente `0` para todos os fornecedores exceto `codex`, pelo que a definição de TTL (e os cabeçalhos de sessão) não tinham qualquer efeito nos restantes, apesar de o mecanismo de fixação e a extração de cabeçalhos já serem agnósticos quanto ao fornecedor. A correção removeu esse retorno antecipado; o TTL passa a aplicar-se uniformemente a todos os fornecedores quando definido globalmente acima de `0`.

Os três cabeçalhos de afinidade de sessão nunca são reencaminhados para upstream — os executores constroem os seus próprios cabeçalhos de upstream de raiz em vez de deixarem passar os cabeçalhos do cliente, pelo que este permanece apenas um id de correlação interno.

### Leases exclusivos de ligação de sessão gerida

**Âmbito:** um cliente/sessão HTTP gerido ativo possui uma ligação OmniRoute elegível.

**Objetivo:** proporcionar posse exclusiva e duradoura de ligações a clientes que precisam de uma
barreira rígida de encaminhamento entre pedidos. Isto difere da afinidade de sessão, que é uma
preferência flexível de continuidade: um lease exclusivo persiste o estado do ciclo de vida em
SQLite, impõe a unicidade global do proprietário ativo e da ligação ativa e rejeita uma geração
obsoleta antes do despacho para o fornecedor.

A funcionalidade é opt-in por chave de API. Uma chave gerida tem de ter o scope `lease:exclusive` e
uma lista `allowedConnections` explícita e não vazia. Qualquer cliente HTTP pode usar o endpoint de
ciclo de vida; não é exigido nome de cliente, user-agent, fornecedor, método OAuth nem modelo. O
lease detém uma ligação, não um modelo, pelo que uma mudança de modelo mantém o vínculo enquanto a
ligação permanecer elegível nos termos normais. As regras normais de modelo, quota, saúde,
cooldown e allowlist mantêm-se autoritativas e podem transitar a mesma geração para outra ligação
elegível livre.

O ciclo de vida é `POST /api/v1/session-leases` com as ações JSON `acquire`, `renew` e `release`.
Os pedidos de inferência geridos apresentam o valor opaco `X-OmniRoute-Lease-Owner` e o valor exato de
`X-OmniRoute-Lease-Generation`. O proprietário usa `vlo_` seguido de 43 caracteres base64url; apenas
o seu hash SHA-256 é armazenado. Cada barreira de envio final também vincula o ID da chave de API autenticada e
o ID da ligação ativa. Os cabeçalhos de controlo de concessões são removidos dos registos, dos instantâneos de pedidos retidos e
dos cabeçalhos do executor a montante.

Se o encaminhamento normal tiver candidatos geridos elegíveis, mas todos os candidatos livres estiverem ocupados por uma
concessão ativa externa, o OmniRoute devolve HTTP `429`, um código de capacidade de concessão indisponível, um
estado de espera por capacidade e um `Retry-After` limitado, derivado da expiração relevante mais próxima.
A elegibilidade vazia normal não é contenção de concessões e mantém a semântica de erro de encaminhamento existente.

Os mecanismos relacionados permanecem separados:

- A ocupação de sessões OAuth é uma distribuição flexível, local ao processo, para contas OAuth.
- Os semáforos de conta concedem autorizações de concorrência de pedidos e terminam quando um pedido é concluído.
- As concessões de sessão geridas exclusivas são propriedade durável do ciclo de vida com uma barreira de geração.

---

## 3. Bloqueio de Modelos

**Âmbito:** o triplo fornecedor + ligação + modelo.

**Âmbito da chave por código de estado:** o código de estado da falha decide em que chave um bloqueio é escrito (`resolveLockoutScope()` em `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — um sinal de quota ou de direitos de acesso — bloqueia a **família de quota**: para o codex todo o âmbito `codex` / `spark` (todos os modelos `gpt-5*` da ligação), para outros fornecedores `getQuotaScopedModelForProvider()`.
- `404` bloqueia apenas o modelo em si (`getModelLockKey()` restringe `not_found`).
- Qualquer outro código de estado — falhas de transporte/servidor `5xx` e o próprio `502` sintetizado pelo OmniRoute a partir da validação de qualidade — bloqueia apenas o tuplo **exato** fornecedor/ligação/modelo. Um stream defeituoso num modelo não é evidência sobre a quota da conta; antes desta regra, uma única resposta vazia em `codex/gpt-5.6-luna` removia do encaminhamento todos os modelos `gpt-5*` dessa ligação durante 2–30 min (em escalada), embora a sua quota permanecesse intacta.
- A opção `scope` explícita de quem chama prevalece sempre (o Antigravity passa `"exact"`).

**Objetivo:** evitar desativar uma ligação inteira quando apenas um modelo está indisponível ou limitado por quota.

**Exemplos:**

- Fornecedores com quota por modelo que devolvem 429
- Fornecedores locais que devolvem 404 para um modelo em falta
- Falhas de permissão de modo/modelo específicas do fornecedor (p. ex., modos do Grok)

**Implementação:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Painel de Cooldowns de Modelos (v3.8.0)

IU: Definições → Cooldowns de Modelos (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Lista os bloqueios ativos com: fornecedor, ligação, modelo, motivo, expiresAt. Os operadores podem reativar manualmente um modelo a partir do cartão.

**API REST:**

- `GET /api/resilience/model-cooldowns` — lista os bloqueios ativos
- `DELETE /api/resilience/model-cooldowns` — reativação manual. Corpo: `{provider, connection, model}`. Autenticação: management.

### Gestor de Cooldowns

IU: Monitorização → Gestor de Cooldowns (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Uma única página para todas as ligações que estão fora do encaminhamento por um motivo transitório, em vez de abrir a página de cada fornecedor. Lista os cooldowns de ligação, os bloqueios de modelo e os estados terminais, limpa-os por ligação, para uma seleção, ou para todas as ligações de um fornecedor, e edita as regras de cooldown mais frequentemente ajustadas: `streamStallCooldown.enabled` e o cooldown base e os passos máximos de backoff do `connectionCooldown` para OAuth / chave de API (guardados através de `PATCH /api/resilience`). Os estados terminais (`banned`, `expired`, `credits_exhausted`) são listados, mas nunca limpos aqui.

**API REST** (`src/lib/resilience/cooldownManager.ts`, autenticação: management):

- `GET /api/resilience/cooldowns[?provider=]` — ligações com estado, cooldown restante, nível de backoff, tipo do último erro e bloqueios de modelo (sem credenciais)
- `POST /api/resilience/cooldowns` — corpo `{connectionIds: string[]}` ou `{all: true, provider?}`; devolve `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### IU das definições de bloqueio + recuperação por decaimento com sucessos (v3.8.23)

O bloqueio de modelos passou de um comportamento sempre ativo e fixado no código para uma funcionalidade totalmente configurável, de ativação explícita (opt-in), com o seu próprio cartão de definições e um percurso de recuperação com autorregeneração.

**Cartão de definições:** Definições → Bloqueio de Modelos
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Este é **distinto** do `ModelCooldownsCard` acima, apenas de leitura (que apenas
_lista_ os bloqueios ativos) — o novo cartão _configura os parâmetros_. As
predefinições residem em `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Definição               | Predefinição                     | Significado                                                                       |
| ----------------------- | -------------------------------- | --------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Comutador principal — o bloqueio de modelos está **desativado por predefinição**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Códigos de estado a montante que contam como uma falha com âmbito de modelo.      |
| `baseCooldownMs`        | `120_000` (120 s)                | Duração inicial do bloqueio na primeira falha.                                    |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Limite superior do cooldown escalado.                                             |
| `maxBackoffSteps`       | `10`                             | Número máximo de passos de escalada do backoff exponencial.                       |
| `useExponentialBackoff` | `true`                           | Se as falhas repetidas escalam o cooldown exponencialmente.                       |

As definições persistem através do armazenamento habitual de definições e são validadas através do esquema de definições de resiliência; o cartão limita os valores de `baseCooldownMs`/`maxCooldownMs`
(com `maxCooldownMs ≥ baseCooldownMs`) e de `maxBackoffSteps`.

**Recuperação por decaimento com sucessos:** a recuperação **não** é puramente a expiração do temporizador. Uma resposta bem-sucedida faz recuar a contagem de falhas do modelo, pelo que um modelo que recuperou a meio da janela deixa de escalar (e é desbloqueado) antes de o temporizador expirar. Num alvo de combo bem-sucedido, `open-sse/services/combo.ts` chama `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), que **reduz para metade** o
`failureCount` armazenado (`Math.floor(failureCount / 2)`); quando este chega a `0`, a entrada de bloqueio é totalmente eliminada. A contrapartida `recordModelLockoutFailure()`
incrementa a contagem (e escala o cooldown) em falhas dentro da janela de escalada. Este decaimento com sucessos soma-se à simples expiração do temporizador — qualquer um dos percursos pode reativar um modelo.

**Estado:** os bloqueios são mantidos **em memória** (`Map`s por processo de
`ModelLockoutEntry` indexados por `provider:connectionId:model`, e os bloqueios de âmbito exato por
`provider:connectionId:exact:model`), não sendo persistidos na
base de dados — perdem-se ao reiniciar. As _definições_ são persistidas; o _estado_ de bloqueio ativo é efémero.

---

## 4. Controlo de Concorrência Quota-Share (v3.8.36)

As contas de subscrição (GLM, MiniMax, etc.) aceitam frequentemente apenas ~1–3 pedidos concorrentes; exceder esse limite desencadeia erros 429 e cooldowns. Isto é especialmente crítico em combos **quota-share** (`qtSd/…`), onde várias chaves API partilham uma única conta upstream. Três camadas evitam que uma conta partilhada seja inundada.

### Limite de concorrência por ligação (`max_concurrent`)

Cada ligação de fornecedor pode declarar um teto `max_concurrent`
(`provider_connections.max_concurrent`, definido no modal de ligação / API / BD).
Deixe-o vazio para não aplicar limite. Este é o único parâmetro que alimenta a camada de serialização abaixo — defina-o para a concorrência real da conta (p. ex. GLM ~1, MiniMax ~2).

### Limites de concorrência por modelo (`modelConcurrency`)

Uma ligação pode adicionalmente declarar tetos de concorrência exatos por modelo
dentro do seu mapa `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Defina-o no modal de ligação (**Substituições de rate limit → Limites de
concorrência por modelo**, um `model=cap` por linha) ou através de
`PATCH /api/providers/[id]` com a mesma estrutura JSON. Semântica das chaves:

- **Âmbito da ligação vs. específico do modelo:** o `maxConcurrent` continua a
  ser o teto partilhado ao nível da ligação. Quando ambos se aplicam, ambos os
  gates são adquiridos atomicamente no mesmo gate composto
  (`global → provider → account → model`); o comportamento efetivo é o do
  limite aplicável mais restritivo.
- **Correspondência exata da chave do modelo:** a chave é a string do modelo
  passada ao executor após a resolução do encaminhamento — normalmente o id do
  modelo upstream sem prefixo (`glm-5`), e não um alias `provider/model` do lado
  do cliente (`zai/glm-5` não corresponde a `glm-5`). Os valores são tetos de
  pedidos concorrentes em números inteiros positivos.
- **Fila local, sem deteção:** os pedidos excedentes aguardam em fila local com
  a semântica de fila/timeout existente (erros de admissão tipados
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). O OmniRoute não deteta nem
  infere a política upstream — impõe exatamente os tetos que o operador
  configurou. Um gate de modelo saturado nunca desativa o fornecedor e nunca
  cria um bloqueio permanente do modelo; o comportamento upstream de
  429/cooldown/fallback continua a ser a salvaguarda de erro.
- **Âmbito por ligação e por processo:** os limites são por ligação de base de
  dados e mantidos em memória, pelo que duas ligações que reutilizam a mesma
  chave API upstream não se coordenam entre si.
- **Não configurado significa inalterado:** omitir o mapa (ou deixar o campo do
  dashboard em branco) não adiciona nenhum gate de modelo. Exemplo de
  configuração sem afirmar qualquer limite universal do fornecedor:

```text
glm-5=1
glm-4.7=3
```

### Serialização de pedidos quota-share

Quando um despacho quota-share tem como alvo uma ligação que declara um
`max_concurrent` positivo, os pedidos concorrentes para essa **conta** são
serializados através de um semáforo por ligação (chave `qsconn:<connectionId>`):
os pedidos excedentes **aguardam na fila** em vez de inundarem a conta. É
**fail-open** — uma fila saturada ou um timeout prossegue sem um slot, em vez de
alguma vez rejeitar um pedido despachável. Ative/desative em **Definições →
Resiliência → Concorrência por ligação quota-share**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ativo por
predefinição). Sem um limite `max_concurrent`, o comportamento permanece
inalterado.

> O gate de encaminhamento quota-share (`selectQuotaShareTarget`, DRR + P2C) é
> ele próprio fail-open e apenas _desprioriza_ uma ligação no limite — com um
> pool de uma única ligação não consegue impor um limite rígido, pelo que é este
> semáforo que contém efetivamente a inundação.

### Repetição ciente de cooldown em combos

Para cada estratégia de combo (quando ativada), um pedido que cristalizaria um
429 por um cooldown transitório CURTO aguarda que este expire e volta a despachar
em vez de devolver o 429 — isto cobre janelas TPM/RPM da classe Gemini (~60s de
retry-after) em combos multi-modelo, p. ex. ambos os alvos de um combo de 2
modelos atingirem um rate limit por modelo. Limitado por `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) em **Definições →
Resiliência**. Nunca aguarda em caso de `quota_exhausted` (bloqueado até à
meia-noite) ou motivos de autenticação/não encontrado.

O mesmo gate cobre o caso de pré-despacho (#16319): quando todos os alvos de um
combo são ignorados antes de qualquer tentativa porque o seu modelo se encontra
num bloqueio transitório curto, o caminho de zero tentativas aguarda que o
bloqueio expire sob os mesmos tetos e volta a despachar, em vez de responder com
um `503 ALL_TARGETS_SKIPPED` sem indicação. Quando não é permitida qualquer
espera (teto, tentativas ou orçamento esgotados, ou a funcionalidade
desativada), a resposta terminal é promovida a `429 rate_limit_error`,
transportando `retry_after` / `reset_at` do bloqueio transitório que expira
primeiro; os bloqueios de quota, autenticação e não encontrado mantêm o 503 sem
indicação.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Controlo de Admissão da Fila de Pedidos (v3.8.49 · issue #6593)

**Âmbito**: a fila local de rate limit por fornecedor+ligação (`open-sse/services/rateLimitManager.ts`,
suportada pelo Bottleneck), uma camada abaixo dos três mecanismos acima.

**`maxWaitMs` limita a espera em fila; `executionMaxWaitMs` limita a execução.**
Os dois são deliberadamente separados, e nenhum alimenta o outro.

`resilienceSettings.requestQueue.maxWaitMs` é o **orçamento de espera em fila**: cobre
a espera por um slot do fornecedor e depois a permanência em QUEUED, e o seu
temporizador é limpo no momento em que a tarefa sai de QUEUED e começa a executar
(`rateLimitManager.ts`, `wrappedFn`). Um pedido que o exceda nunca chega
ao upstream. Predefinição de 30000ms, fornecida por `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
em `src/lib/resilience/settings.ts` e fixada por
`tests/unit/ratelimit-admission-control-6593.test.ts`, pelo que uma alteração a esse valor
torna esse teste vermelho em vez de deixar este parágrafo silenciosamente desatualizado.

`resilienceSettings.requestQueue.executionMaxWaitMs` é o que o Bottleneck
recebe como `expiration` da tarefa, cujo temporizador só arranca após o despacho. É
uma salvaguarda para executores sem um timeout de upstream próprio, e é
elevado ao timeout de início de fetch do próprio executor quando este é mais longo, para
não poder cortar uma resposta saudável em curso. Predefinição de 600000ms (10 min).

Alimentar o orçamento da fila no `expiration` era o que costumava matar gateways não incrementais
a meio do voo — estes funcionam legitimamente durante minutos antes dos primeiros bytes —
e é por isso que uma expiração é exposta como `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), enquanto o orçamento da fila transporta o
código de timeout da fila. Substitua qualquer um deles através de `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ou do dashboard
(**Definições → Resiliência**). Ambos são limitados ao intervalo 1ms–24h quando normalizados.

**Precedência, para ambos:** a variável de ambiente apenas fornece a _predefinição_. Um valor
persistido em `resilienceSettings.requestQueue` (dashboard / patch de API, guardado
em `key_value`) prevalece sobre ela, e um
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` por ligação prevalece sobre esse. Definir
a variável de ambiente numa implementação que já tem um valor persistido, portanto,
não muda nada — limpe ou atualize antes a definição persistida.

A permanência em fila é limitada por `maxWaitMs`; o `maxQueueDepth` abaixo limita quantos
chamadores podem estar em fila em simultâneo.

**Retries declarados no corpo: pacing vs bloqueio.** Um corpo 429 pode indicar a sua própria espera
(Gemini `RetryInfo.retryDelay`, texto "retry after Ns"), que o
`updateFromResponseBody` lê. Uma espera que cabe no `maxWaitMs`
da ligação é pacing: o limiter esvazia o seu reservatório durante esse tempo e as chamadas em fila
são despachadas quando este volta a encher. Uma espera mais longa do que `maxWaitMs` não é algo que a
fila possa aguardar — o Gemini responde a uma quota diária esgotada com
`retryDelay: "86399s"`. O `Retry-After` retransmitido no 429 reconstruído (#16528)
já faz com que o motor de fallback bloqueie o modelo durante essa janela, mas pausar
também o limiter por causa disso continuaria a bloquear qualquer chamada que chegue à chave mais cedo
(após um reset de resiliência, por exemplo) durante todo o `maxWaitMs`. Quando essa espera provém de um detalhe `RetryInfo`
tipado da Google (a proveniência `google_rpc_retry_info`) e o limiter da chave
já tem âmbito no modelo (ver `getLimiterKey`), o 429 passa a ser um
bloqueio do modelo nessa ligação (`lockModelForLongBodyRetry` em
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, com teto de 24h), e o
limiter não é pausado. A seleção de conta salta esse bloqueio através de
`isModelLocked()`, tal como o gate de pré-despacho do combo para alvos fixados
à ligação. No antigravity, cujo limiter é por família de quota, o bloqueio é
no modelo exato, tal como os seus outros bloqueios de quota. O nome que o cliente pediu
também é bloqueado quando um alias o resolveu para esse modelo, porque essas verificações usam
o nome solicitado; é bloqueado exatamente (`lockExactModel`), pelo que um alias que
atrasse uma família de quota do antigravity ou um âmbito codex nunca bloqueia o seu próprio. Uma
dica em texto livre, um `retryDelay` não tipado, ou um
limiter partilhado por toda a ligação mantém a pausa. Quando o limiter que
o caminho do 429 acabou de reconstruir entra efetivamente em pausa, um chamador cujo tempo restante em fila termina
antes do fim da pausa é rejeitado de imediato com o código de timeout da fila
(`checkLimiterPause`), em vez de esperar que esse tempo se esgote; o fim registado é
ancorado antes de o limiter ser construído, onde o Bottleneck inicia o seu relógio de
renovação, e qualquer alteração posterior ao reservatório esquece-o. Coberto por
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` e
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — limite de admissão opt-in (novo).** `resilienceSettings.requestQueue.maxQueueDepth`
limita quantos pedidos podem estar em fila (ainda não despachados) para um
fornecedor+ligação em simultâneo. Quando a fila já contém `maxQueueDepth`
pedidos, um novo pedido é rejeitado de imediato com um erro tipado
`code: "RATE_LIMIT_QUEUE_FULL"` **antes** de chegar sequer a `limiter.schedule()`
— pelo que a rejeição é barata e acontece antes de qualquer trabalho a jusante
de compressão de prompts / tradução para esse pedido. Predefinição `0` =
desativado, preservando o comportamento existente de fila ilimitada; limitado a 0–100000.
Substituição via `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ou
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/patch de API).

A própria verificação de admissão é uma função pura
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), pelo que
é testável unitariamente sem um limiter Bottleneck real.

> O RFC que abriu #6593 também propôs uma flag
> `bypassCompressionOnRateLimit`. O pipeline
> `open-sse/services/compression/` deste repositório é compressão de
> prompt/contexto no pedido LLM de saída (`chatCore.ts`, em torno do bloco
> `resolveCompressionSettings`/`selectCompressionStrategy`), e não compressão
> de resposta HTTP em corpos 429 sintetizados — não existe um caminho de código
> correspondente para uma flag literal de bypass. Esse passo de compressão de
> prompt também corre atualmente _antes_ de `withRateLimit()` no pipeline de
> pedidos, pelo que reordenar para o ignorar numa rejeição por fila cheia é
> uma alteração separada e maior do que o âmbito deste issue; foi
> intencionalmente **não** implementada aqui e fica como follow-up, caso o
> ganho de poupança de CPU justifique o risco de reordenação.

### Rede de Segurança de Ativação Automática de Limite de Taxa e Proteção de Ligações (`rateLimitProtection`)

**Rede de segurança de ativação automática** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, predefinição `true`):
Por predefinição, o OmniRoute ativa automaticamente a proteção por fila de limite de taxa para todas as ligações ativas de fornecedores com chave API (`getProviderCategory(provider) === "apikey"`). Isto garante que os pedidos recebidos destinados a chaves API upstream sensíveis a limites de taxa são enfileirados e limitados através do Bottleneck, em vez de explodirem em erros 429 no upstream. A rede de segurança pode ser sobreposta através da variável de ambiente `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` desativa, `true`/`1`/`on` força a ativação), que tem precedência sobre a definição persistida no dashboard (**Definições → Resiliência** / `PATCH /api/resilience`).

**Semântica de `rateLimitProtection` por ligação:**
A proteção de limite de taxa por ligação é controlada através do campo booleano `rateLimitProtection` nas ligações de fornecedores (persistido como `rate_limit_protection` no SQLite):

- **Explicitamente ativada (`rateLimitProtection === true`)**: A proteção de limite de taxa está explicitamente ativada para esta ligação, independentemente da categoria do fornecedor ou de a rede de segurança de ativação automática estar ligada.
- **Explicitamente desativada (`rateLimitProtection === false`)**: Desativa a proteção explícita, mas **não** exclui uma ligação ativa de chave API da rede de segurança global de ativação automática. Em `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` e `undefined` são equivalentes: apenas `rateLimitProtection === true` é tratado como uma sobreposição explícita. Se `rateLimitProtection` for `false` (ou não estiver definido), uma ligação ativa de chave API continua a corresponder à condição de ativação automática e permanece protegida por limite de taxa.
- **Sem exclusão por ligação**: Um operador não pode atualmente expressar "esta única ligação ativa de chave API deve correr sem proteção por fila de limite de taxa" mantendo a ativação automática ativa para as restantes. Para correr ligações de chave API totalmente sem filas de limite de taxa, a rede de segurança tem de ser desativada globalmente (`RATE_LIMIT_AUTO_ENABLE=false` ou `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Caminhos de escrita suportados:**

- **`POST /api/rate-limits`**: O caminho de escrita de gestão suportado para alternar `rateLimitProtection` numa ligação (`{ connectionId: string, enabled: boolean }`). Chamar este endpoint com `enabled: true` ativa a proteção explícita; chamar com `enabled: false` remove a proteção explícita (embora as ligações ativas de chave API permaneçam cobertas pela rede de segurança global, se a ativação automática estiver ligada).
- **`PUT /api/providers/[id]`**: Deliberadamente **não** aceita nem altera `rateLimitProtection` (#11278). Atualizar os metadados da ligação de fornecedor via `PUT /api/providers/[id]` nunca mudará o estado persistido da proteção de limite de taxa.

---

## 6. Watchdog de débito de streams lentas (#9709)

A proteção opcional `resilienceSettings.streamRecovery.throughputWatchdog` deteta
um upstream que continua a enviar chunks mas que produz saída do assistente abaixo
da taxa de saída útil configurada. É deliberadamente distinta do timeout de
inatividade: heartbeats e metadados não reiniciam nenhum dos temporizadores e não
contam como progresso. É também distinta do prazo limite absoluto da tentativa
(#9153), que permanece um teto de segurança absoluto independentemente da
qualidade da saída.

O watchdog exige um período de aquecimento seguido de uma janela deslizante
completa antes de poder abortar. Conta deltas de texto de eventos de saída das
APIs Chat Completions e Responses (uma aproximação conservadora em bytes UTF-8),
ignora eventos apenas de utilização e eventos vazios, e suspende a avaliação
enquanto houver eventos de chamada de ferramentas ou de raciocínio em curso. Está
desativado por predefinição e pode ser ativado com
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; a janela, o aquecimento, a taxa mínima
e a saída mensurável mínima são limitados pela camada normal de normalização das
definições de resiliência.

Quando ativado, um abort do watchdog é aplicado apenas à tentativa upstream ativa.
Antes de quaisquer bytes visíveis para o cliente, o caminho existente de
recuperação antecipada na mesma conta pode reabrir a tentativa. Após o commit, o
stream nunca é repetido às cegas; apenas o contrato existente de continuação
segura a meio do stream pode coser um sufixo. A finalização permanece de execução
única, pelo que a contabilização de utilização e a libertação do semáforo não são
duplicadas.

---

## 7. Reformulação do Estado Upstream (erros de quota com estado incorreto)

**Âmbito:** um gateway upstream que reporta esgotamento temporário de quota com o estado HTTP errado.

**Objetivo:** corrigir um estado enganador ANTES da classificação, para que os consumidores downstream (motor de fallback, agregação de combos, a resposta exposta ao cliente) vejam a verdadeira natureza repetível da falha.

Alguns gateways sinalizam esgotamento TEMPORÁRIO de quota com um estado HTTP
não repetível. O `agentrouter.org` devolve `403` (por vezes `400`) com um corpo
em chinês (`用户额度不足` / `额度不足`) em vez do `429` padrão. Clientes como o
Claude Code tratam o `403` como permanente e abortam a sessão e, sem correção,
o motor de fallback classificá-lo-ia como `AUTH_ERROR` em vez de um evento de
quota.

**Implementação:**

- Registo + matcher: `open-sse/config/upstreamStatusRestatement.ts` — uma
  lista de regras por fornecedor (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), correspondida através de
  `applyStatusRestatement()`.
- Local de chamada: o bloco `providerFailure:` em `open-sse/handlers/chatCore.ts`
  (por volta da linha 3654), logo após `parseUpstreamError()` analisar uma
  resposta upstream com um estado HTTP de erro (`!providerResponse.ok`), e antes
  de qualquer classificação ser executada, para que todos os consumidores
  downstream vejam o estado corrigido. Erros embutidos num stream SSE `200`
  seguem um caminho de análise de stream separado e posterior e **não** são
  cobertos por este hook atualmente — uma limitação conhecida, ainda não
  necessária para o estado incorreto do agentrouter (que surge como um estado
  HTTP de erro).
- Elegibilidade de repetição: `429` está em `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), pelo que um erro
  reformulado transporta uma janela de repetição real em vez de surgir como um
  `403` morto.
- O `defaultRetryAfterMs` sintético de `60s` (`upstreamStatusRestatement.ts`)
  é apenas o que a resposta reformulada comunica ao **cliente**; não é, por si
  só, a duração interna de cooldown/lockout da ligação — essa é regida
  separadamente pelo mecanismo que efetivamente trata o erro reformulado
  (o backoff escalonado do Connection Cooldown, §2, com base de `3s` para
  fornecedores de chave API; ou o Model Lockout, §3, para fornecedores com
  quota por modelo como o agentrouter). O router pode tornar-se elegível para
  repetir internamente mais cedo do que a janela de 60s que anuncia ao cliente
  — margem intencional, não um bug.

Erros permanentes (o `无权访问模型` do agentrouter — sem acesso a este modelo)
NUNCA são reformulados: `excludeMarkers` veta a regra mesmo quando os
`textMarkers` correspondem, pelo que o erro mantém o seu estado original e nada
o repete para sempre. A regra de classificação de fornecedor correspondente
(`agentrouter-model-access-denied` em `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, um cooldown base declarado de `6h`) é
consultada por `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_antes_ do retorno antecipado `FORBIDDEN` genérico da categoria apikey,
condicionada por `honorsRuleLockScope(provider)` (#10334 — atualmente exclusivo
do agentrouter através da lista de permissões `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
em `providerErrorRules.ts`). O cooldown declarado de 6h da regra flui como
`fallbackResult.baseCooldownMs`, mas continua a alimentar o caminho de lockout
de quota por modelo pré-existente (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, inalterado pelo #10334 exceto quanto à origem do
cooldown): é limitado ao `mlSettings.maxCooldownMs` do operador (predefinição
`1_800_000ms` / 30min), como qualquer outro lockout de modelo, e a _razão de
lockout persistida_ mantém-se o `"forbidden"` hardcoded pré-existente, não o
`"auth_error"` da regra — apenas a duração do cooldown é honrada de ponta a
ponta, não a string da razão. A ligação em si permanece ativa; os modelos
irmãos na mesma ligação não são afetados.

Os erros de quota reformulados (`额度不足`) atingem uma regra de fornecedor em
produção (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, sem cooldown declarado próprio — aplica-se a predefinição
de backoff escalonado da camada de persistência). Desde o #10334, o `scope` em
`ProviderErrorRuleMatch` É consumido de ponta a ponta, mas **apenas** para
fornecedores na lista de permissões `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — hoje apenas `"agentrouter"`, condicionado através de
`honorsRuleLockScope()`). Para todos os outros fornecedores, o `scope`
permanece informativo, exatamente como antes do #10334.
`checkFallbackError` expõe o scope da regra correspondida como
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) é a guarda partilhada que confirma que um
`ruleScope` é genuinamente seguro de honrar como um sinal à escala da ligação e
auto-recuperável (scope `"connection"`, razão `quota_exhausted`, nunca
`permanent`, nunca `creditsExhausted` — uma defesa contra uma regra futura que
emparelhe o scope `"connection"` com um estado de conta permanente). Dois
consumidores invocam-na:

- **Persistência** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  em vez de cair no ramo de bloqueio **por modelo** do fornecedor passthrough
  (agentrouter é `passthroughModels: true` → `hasPerModelQuota()`
  devolve `true`), aplica um **cooldown temporário da ligação** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nunca um estado terminal
  (`credits_exhausted`/`banned`/`expired`) — para que a ligação se recupere
  automaticamente quando o cooldown expirar, em vez de exigir uma reposição
  manual das credenciais. Ignorado para ligações com `disableCooling: true`
  (#2997): essa opção de exclusão passa, em alternativa, para o bloqueio por
  modelo (um compromisso documentado — ver o comentário de código acima do
  ramo).
- **Encaminhamento de combos no mesmo pedido** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): a mesma verificação de
  proteção marca a ligação no conjunto em memória `exhaustedConnections`, com
  a chave `${provider}:${connectionId}`. Isto apenas ignora um alvo restante
  do MESMO PEDIDO que _ele próprio já traz esse exato `connectionId`_ no seu
  próprio objeto de alvo (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` antes da consulta a `exhaustedConnections`) — um combo
  simples de lista de modelos, em que os alvos irmãos não trazem nenhum
  `connectionId` fixado próprio e um só é resolvido por despacho a partir do
  cabeçalho `X-OmniRoute-Selected-Connection-Id` da resposta, nunca atinge
  essa correspondência de chave. Para esse caso comum, a proteção real contra
  a reutilização da conta acabada de esgotar por uma etapa restante NÃO é
  este Set — é a camada de persistência acima (o `rateLimitedUntil` da
  ligação está agora no futuro), combinada com esta mesma verificação de
  proteção a suprimir `transientRateLimitedProviders` para a falha (ver
  "Conceção em duas fases" e o comentário de código no ramo
  `isAgentrouterConnectionQuotaScope` em `targetExhaustion.ts`): com esse Set
  por marcar, a permissão forçada `allowRateLimitedConnection` de `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NÃO entra em ação
  para as etapas restantes do fornecedor, pelo que o filtro `rateLimitedUntil`
  da seleção de credenciais (`src/sse/services/auth.ts:1238`) é respeitado
  normalmente e uma etapa restante ou escolhe uma ligação agentrouter
  diferente e ainda elegível, ou falha sem credenciais disponíveis — não
  força o regresso à ligação que este ramo acabou de arrefecer.

### Conceção em duas fases: reformulação do estado, depois classificação

A reformulação de estado (`upstreamStatusRestatement.ts`) e as regras de
classificação de fornecedores (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) são registos separados que usam ambos como chave o id
do fornecedor e marcadores de texto, mas executam em locais diferentes e
servem propósitos diferentes: a reformulação reescreve o estado HTTP no
início de `chatCore.ts`; as regras de classificação escolhem a `reason` de
fallback e o `scope` de bloqueio (`model` / `provider` / `connection`) dentro
de `checkFallbackError()` (`open-sse/services/accountFallback.ts`).

As regras de classificação só veem o **texto** completo do erro (necessário
para corresponder a marcadores do corpo como `额度不足`) para fornecedores
listados na lista de permissões `FULL_TEXT_RULE_PROVIDERS` em
`providerErrorRules.ts` — atualmente apenas `"agentrouter"`. Para todos os
outros fornecedores do **catálogo integrado**, `checkFallbackError` entrega a
`getProviderErrorRuleMatch` apenas o erro estruturado (`{code, type}`), o que
é suficiente para regras baseadas em cabeçalho/estado/código, mas cego a
marcadores de texto do corpo. O auxiliar `resolveRuleMatchBody()` efetua esta
seleção: texto completo do erro para fornecedores na lista de permissões, o
erro estruturado nos restantes casos. Adicionar um fornecedor **integrado** a
`FULL_TEXT_RULE_PROVIDERS` é uma inclusão explícita por fornecedor — existe
para que o caminho predefinido de cada fornecedor fora da lista permaneça
inalterado byte a byte.

O `scope` de uma regra (`model` / `provider` / `connection`) é uma inclusão
separada de `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` apenas o expõe
como `fallbackResult.ruleScope`, e os consumidores a jusante só o respeitam
como algo mais do que um rótulo informativo para fornecedores na lista de
permissões `HONORS_RULE_LOCK_SCOPE_PROVIDERS` no mesmo ficheiro (controlado
via `honorsRuleLockScope()` — hoje apenas `"agentrouter"`). Ver "Erros de
quota reformulados" acima para saber o que uma correspondência
`scope: "connection"` realmente faz quando um fornecedor está nessa lista de
permissões.

**#11104 — as regras declaradas pelo operador contornam ambas as listas de
permissões.** Um operador pode declarar uma regra por fornecedor em tempo de
execução via `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) sem
editar este ficheiro. Condicionar uma regra de operador a
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — listas de
permissões destinadas a proteger o comportamento **predefinido** das regras
do catálogo integrado — tornaria o mecanismo de definições inerte para todos
os fornecedores exceto os já aí listados, uma vez que declarar a regra já é,
por si só, a inclusão explícita do operador. `resolveRuleMatchBody()` e
`honorsRuleLockScope()` verificam ambas primeiro
`hasOperatorRuleForProvider()`: um fornecedor com uma regra de operador
recebe o texto bruto do erro e tem o seu `scope` declarado respeitado,
independentemente de também aparecer em qualquer uma das listas de
permissões.

**Lacuna conhecida — `providerRuleRegistry` nunca é consultado para HTTP 400.** O ramo `BAD_REQUEST` de `checkFallbackError` classifica o estado 400
inteiramente através dos seus próprios arrays de padrões
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, etc. em
`accountFallback.ts`) e retorna antes de ser alcançado o ramo
`configuredRule`/`getProviderErrorRuleMatch` acima dele. Uma regra do
catálogo integrado (ou uma regra de operador) com `status: 400` é
sintaticamente válida, mas nunca será acionada. Nenhuma regra existente visa
400 atualmente, pelo que nada em produção é afetado — mas uma futura regra
para 400 exige que este ramo seja alterado primeiro, o que constitui uma
alteração maior do que adicionar uma regra (reclassifica o 400 para todos os
fornecedores que já dependem do comportamento dos arrays de padrões) e está
fora do âmbito de uma adição de regra para um único fornecedor.

### Adicionar um novo gateway que reporta a quota incorretamente

1. Registe um array de regras em `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Mantenha os `textMarkers`
   específicos do fornecedor; nunca reutilize frases genéricas em inglês que
   colidam com `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Opcionalmente, registe regras de classificação em
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) para escolher
   o âmbito de bloqueio correto (`connection` para quota ao nível da conta,
   `model` para erros por modelo). Este passo só produz efeito em produção para
   fornecedores cujas regras precisam do texto completo do erro (marcadores de
   corpo): adicione o id do fornecedor a `FULL_TEXT_RULE_PROVIDERS` no mesmo
   ficheiro — caso contrário, o `checkFallbackError` entrega sempre à regra apenas
   o erro estruturado `{code, type}` e uma regra baseada no texto do corpo nunca
   corresponderá ao tráfego real. As regras que correspondem apenas com base em
   `status`/`headers` (como as do Opencode ou do Minimax) não precisam deste
   opt-in. Separadamente, se a regra declarar `scope: "connection"` e a intenção
   for um arrefecimento real ao nível da ligação, mais a exclusão de combos no
   mesmo pedido (e não apenas um rótulo informativo), adicione o id do
   fornecedor a `HONORS_RULE_LOCK_SCOPE_PROVIDERS` no mesmo ficheiro — é isto que
   condiciona o consumo ao estilo de `isAgentrouterConnectionQuotaScope()` em
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) e
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); sem isso, o `scope` continua
   a fluir através de `fallbackResult.ruleScope`, mas nada atua sobre ele.
3. Adicione testes unitários à semelhança de `tests/unit/upstream-status-restatement.test.ts`
   e `tests/unit/agentrouter-error-rules.test.ts` (incluindo as guardas
   not-permanent / not-creditsExhausted e — se o fornecedor precisar da lista de
   permissões — um teste que verifique que `resolveRuleMatchBody()` devolve o
   texto completo apenas para esse fornecedor).

Não são necessárias alterações a `chatCore.ts`, `classifyError` ou ao combo.

#### Bloqueio agrupado por IP de saída (#10880)

Os fornecedores em `EGRESS_BUCKETED_LOCK_PROVIDERS` (família opencode) são
tratados como upstream agrupado por IP (o escalão gratuito do opencode é
agrupado por IP, não por conta — ver #9611): um status 429 classificado como
`quota_exhausted` **ou** `rate_limit_exceeded` arrefece todas as ligações da
família incluída na lista de permissões cujo último IP de saída conhecido
coincida com o da ligação que falhou, antes de a rotação as poder tentar
— evitando N-1 chamadas ao upstream garantidamente falhadas (o mesmo padrão
de #10460/#10525).
O `rate_limit_exceeded` é incluído deliberadamente: no caminho do
`markAccountUnavailable`, as regras específicas do opencode nunca correspondem
(não são entregues cabeçalhos/corpo ao `checkFallbackError`, e o opencode não
está em `FULL_TEXT_RULE_PROVIDERS`), pelo que um 429 cujo corpo traz o texto de
quota de subscrição ("monthly usage limit reached") é classificado como
`quota_exhausted` pelo fallback de texto de quota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; arrefecimento de 1 h)
antes de a regra `status_429` ser sequer alcançada — enquanto um 429 sem texto
de quota (limitação de taxa simples) é classificado através da regra
`status_429` como `rate_limit_exceeded` e ainda assim arrefece a família de
IPs. Para um fornecedor incluído na lista de permissões, um limite de taxa
agrupado por IP é o mesmo sinal que uma quota esgotada. Limitações honestas:

- **Melhor esforço**: o bloqueio resolve o último `egress_ip` conhecido da
  ligação a partir de `proxy_logs` (janela de 24h, síncrono, sem cache).
  Cache fria (IP de egresso nunca sondado) ou nenhuma linha → a ligação que
  falhou é na mesma arrefecida pelo branch (registada como atualmente),
  apenas não é bloqueada nenhuma irmã.
- **Nunca terminal**: o cooldown é uma janela de quota renovável
  (`testStatus: "unavailable"`); um estado permanente nunca é derivado de um
  sinal ao nível do IP. As ligações `disableCooling` saltam o branch por
  completo.
- **A granularidade do bloqueio muda para a família abrangida pela lista de
  permissões**: trata-se de uma alteração de âmbito, não apenas de uma
  otimização entre irmãs. O opencode é um provider `passthroughModels`,
  pelo que antes deste branch um 429 produzia um bloqueio por MODELO; agora
  produz um cooldown da ligação — incluindo para um operador que execute
  uma única ligação, sem qualquer irmã. Essa é a granularidade que a tabela
  de regras do opencode já declara como correta (`scope: "connection"`,
  `providerErrorRules.ts`), nunca respeitada até agora porque o opencode
  não está em `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. O branch escreve ele
  próprio o cooldown + `backoffLevel` da ligação que falhou, espelhando o
  branch agentrouter de âmbito de ligação, e retorna — o bloco por modelo e
  o caminho genérico abaixo nunca são alcançados.
- **Combo incluído**: tal como o branch agentrouter, o âmbito ignora
  deliberadamente o downgrade de `persistUnavailableState`/`isCombo` que um
  chamador combo aplica a um 429. Um bloqueio por modelo não é uma forma
  mais fraca deste âmbito, é a unidade errada: nada diz sobre o IP esgotado,
  pelo que a rotação de combos continuaria a queimar uma chamada
  garantidamente falhada por irmã.
- **Segurança das irmãs**: uma irmã já terminal (banned/credits_exhausted)
  ou já num cooldown mais longo nunca é sobrescrita.
- **Lista de permissões exclusiva**: alargar
  `EGRESS_BUCKETED_LOCK_PROVIDERS` é uma decisão explícita do proprietário;
  sem cablagem genérica (padrão #10334/#10419). A consulta de irmãs vincula
  essa mesma lista de permissões em vez de a repetir como literal SQL, pelo
  que alargá-la continua a ser uma alteração de uma linha.
- **Rotação do IP de egresso, em ambas as direções**: a janela de consulta
  (24h) é muito mais ampla do que o TTL da cache de IP de egresso (5 min),
  pelo que o "último IP conhecido" é histórico, não estado atual. Se o proxy
  de uma ligação tiver rodado dentro da janela, o bloqueio pode **não
  detetar** um IP genuinamente partilhado (o IP registado é o novo, ainda
  não esgotado) — e, simetricamente, pode **arrefecer uma irmã que
  entretanto deixou de usar** o IP esgotado. O segundo caso custa a essa
  irmã uma janela de cooldown; ambos são limites aceites de melhor esforço
  de uma consulta baseada em histórico.
- **Custo**: duas varreduras limitadas de `proxy_logs` (filtradas por janela
  através de `idx_pl_timestamp`), apenas à frequência dos 429. Sem índice
  novo (migração 134 YAGNI). Medido numa cópia de BD de tráfego real de
  tamanho moderado; uma instância de alto débito contém proporcionalmente
  mais linhas na mesma janela.

---

## Outras Funcionalidades de Resiliência

- **21 estratégias de encaminhamento** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — consulte [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Encaminhamento sensível à reposição** (v3.8.0) — dá prioridade a ligações com base na hora de reposição da quota.
- **Degradação do modo em segundo plano** — o `background: true` da Responses API é degradado para síncrono, com aviso.
- **Deteção dinâmica de limites de ferramentas** — faz backoff aos fornecedores quando os limites de número de ferramentas são atingidos.
- **Fallback de emergência** — controlado pela variável `OMNIROUTE_EMERGENCY_FALLBACK`; os operadores podem substituí-lo na página de Feature Flags sem reiniciar.

---

## Depuração

- O combo ponderado responde `503 all_targets_cooling_down` (`Retry-After` definido, `diagnostics.excluded` lista todos os alvos com `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → o pool está configurado e ligado, todos os alvos estão apenas excluídos por um temporizador de resiliência; o aviso `[COMBO] Weighted selection: every target excluded before dispatch — …` indica os motivos e os segundos restantes. Um `404 no_executable_targets` do mesmo combo significa que não esteve envolvido nenhum temporizador de resiliência (nada para executar, ou todas as contas falharam a sonda de disponibilidade). Construído em `open-sse/services/combo/pinRecovery.ts` a partir das exclusões recolhidas em `targetResolution.ts`.
- Todas as chaves de um fornecedor ignoradas → verifique tanto o estado do circuit breaker como o `rateLimitedUntil`/`testStatus` de cada ligação.
- Fornecedor permanentemente excluído após a janela de reposição → código a ler o `state` em bruto em vez de `getStatus()`/`canExecute()`.
- Uma chave falha, as outras deveriam funcionar → prefira o cooldown de ligação ao circuit breaker.
- Apenas um modelo falha → prefira o bloqueio de modelo ao cooldown de ligação.
- O estado deveria recuperar-se automaticamente mas não o faz → verifique se existe um timestamp no futuro + um caminho de leitura que atualize o estado expirado. Os estados permanentes requerem alterações manuais.

---

## Estado de runtime — referência rápida para o agente

> Movido textualmente de `AGENTS.md` → "Resilience Runtime State" (PR #12743) para que o guia
> do agente se mantenha abaixo do orçamento de contexto de 40k. É a visão condensada, dirigida
> ao agente, das secções acima; as secções numeradas continuam a ser a referência completa.

O OmniRoute tem três mecanismos de falha temporária relacionados mas distintos. Mantenha os seus
âmbitos separados ao depurar o comportamento de encaminhamento. Consulte o
[diagrama de resiliência de 3 camadas](../diagrams/exported/resilience-3layers.svg)
(fonte: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
para um mapa de consulta imediata.

### Circuit Breaker de Fornecedor

**Âmbito**: fornecedor inteiro, p. ex. `glm`, `openai`, `anthropic`.

**Objetivo**: deixar de enviar tráfego para um fornecedor que falha repetidamente ao nível do
upstream/serviço, para que um fornecedor com problemas não abrande todos os pedidos.

**Implementação**:

- Classe principal: `src/shared/utils/circuitBreaker.ts`
- Interligação do gate/execução do chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de estado em runtime: `src/app/api/monitoring/health/route.ts`
- Wrappers partilhados: `open-sse/services/accountFallback.ts`
- Tabela de estado persistido: `domain_circuit_breakers`

**Estados** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: o tráfego normal é permitido.
- `DEGRADED`: faixa de aviso antecipado — as falhas ultrapassaram o limiar de degradação mas ainda
  não o limiar do breaker; o tráfego continua a fluir e os dashboards mostram o aviso. Um teste de
  ligação válido ou uma janela tranquila sem novas falhas devolve-o a `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` tem a janela).
- `OPEN`: o fornecedor está temporariamente bloqueado; os chamadores recebem uma resposta de
  circuito de fornecedor aberto ou o encaminhamento combo salta para outro alvo.
- `HALF_OPEN`: o timeout de reposição decorreu; permite um pedido de sonda. O sucesso fecha o
  breaker, a falha volta a abri-lo.

**Predefinições** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, consumidas via
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` em `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` em `src/sse/handlers/chatHelpers.ts`). O breaker de fornecedor
inteiro é governado por `circuitBreakerThreshold` / `circuitBreakerReset`:

| Perfil  | degrada em | abre em (`circuitBreakerThreshold`) | reposição (`circuitBreakerReset`) |
| ------- | ---------: | ----------------------------------: | --------------------------------: |
| OAuth   |        `5` |                                 `8` |                             `60s` |
| API key |        `7` |                                `12` |                             `30s` |
| Local   | (derivado) |                                 `2` |                             `15s` |

`PROVIDER_PROFILES` também define `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) e `providerCooldownMs` (5/10/1 min): estes alimentam o
**gate de janela do Provider Cooldown global, opt-in** (`PROVIDER_COOLDOWN_ENABLED`, desativado
por predefinição) — uma entrada ao nível do fornecedor em `open-sse/services/providerCooldownTracker.ts`
só conta como em cooldown após `providerFailureThreshold` falhas dentro de `providerFailureWindowMs`,
e depois arrefece durante `providerCooldownMs`. NÃO são os limiares do breaker em execução — não os
ajuste à espera de comportamento do breaker. Todas as predefinições são substituíveis através das
variáveis de ambiente `OMNIROUTE_PROVIDER_BREAKER_*` e `OMNIROUTE_CIRCUIT_BREAKER_*`; a tabela de
referência precisa para o runtime encontra-se em `docs/architecture/RESILIENCE_GUIDE.md`.

Apenas os códigos de estado de falha ao nível do fornecedor devem disparar o breaker de fornecedor:

```ts
(408, 500, 502, 503, 504);
```

Não dispare o breaker de fornecedor inteiro para erros normais de conta/chave/modelo, como a
maioria dos casos `401`, `403` ou `429`. Estes pertencem normalmente ao cooldown de ligação ou ao
bloqueio de modelo. Um `403` de um fornecedor genérico de chave API deve ser recuperável, a menos
que seja classificado como erro terminal de fornecedor/conta.

O breaker usa recuperação lazy, não um temporizador em segundo plano. Quando `OPEN` expira, leituras como `getStatus()`, `canExecute()` e `getRetryAfterMs()` atualizam o estado para `HALF_OPEN`, para que os dashboards e os construtores de candidatos a combos não continuem a excluir indefinidamente um fornecedor expirado.

### Cooldown de Ligação

**Âmbito**: uma ligação/conta/chave de fornecedor.

**Objetivo**: ignorar temporariamente uma chave/conta problemática, permitindo que outras ligações do mesmo fornecedor continuem a servir pedidos.

**Implementação**:

- Caminho de escrita/atualização: `src/sse/services/auth.ts::markAccountUnavailable()`
- Seleção/filtragem de contas: `src/sse/services/auth.ts::getProviderCredentials...`
- Cálculo do cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Definições: `src/lib/resilience/settings.ts`

Campos importantes nas ligações de fornecedores:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Durante a seleção de contas, uma ligação é ignorada enquanto:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Os cooldowns também são lazy: quando `rateLimitedUntil` está no passado, a ligação volta a ficar elegível. Após uma utilização bem-sucedida, `clearAccountError()` limpa `testStatus`, `rateLimitedUntil`, os campos de erro e `backoffLevel`.

Comportamento predefinido do cooldown de ligações:

- Cooldown base para OAuth: `5s`.
- Cooldown base para chaves API: `3s`.
- Um `429` de chave API deve dar preferência a indicações de retry do upstream (`Retry-After`, cabeçalhos de reset ou texto de reset analisável), quando disponíveis.
- Falhas recuperáveis repetidas usam backoff exponencial:

```ts
baseCooldownMs * 2 ** failureIndex;
```

A proteção anti-thundering-herd impede que falhas concorrentes na mesma ligação prolonguem repetidamente o cooldown ou incrementem `backoffLevel` em duplicado.

Os estados terminais não são cooldowns. `banned`, `expired` (que só se torna terminal após N tentativas limitadas através de `EXPIRED_RETRY_MAX`) e `credits_exhausted` destinam-se a permanecer indisponíveis até que as credenciais/definições sejam alteradas ou um operador os reponha. Não substitua estados terminais por estado transitório de cooldown.

### Lockout de Modelo

**Âmbito**: fornecedor + ligação + modelo.

**Objetivo**: evitar desativar uma ligação inteira quando apenas um modelo está indisponível ou limitado por quota nessa ligação.

Exemplos:

- Fornecedores com quota por modelo que devolvem `429`.
- Fornecedores locais que devolvem `404` para um modelo em falta.
- Falhas de permissão de modo/modelo específicas do fornecedor, como modos Grok selecionados.

O lockout de modelo reside em `open-sse/services/accountFallback.ts` e permite que a mesma ligação continue a servir outros modelos.

### Orientações de Depuração

- Se todas as chaves de um fornecedor forem ignoradas, inspecione tanto o estado do breaker do fornecedor como o `rateLimitedUntil`/`testStatus` de cada ligação.
- Se um fornecedor parecer permanentemente excluído após a janela de reset, verifique se o código está a ler o `state` em bruto em vez de usar `getStatus()`/`canExecute()`.
- Se uma chave de fornecedor falhar mas as outras deverem funcionar, prefira o cooldown de ligação em vez do breaker de fornecedor.
- Se apenas um modelo falhar, prefira o lockout de modelo em vez do cooldown de ligação.
- Se um estado se deve autorrecuperar, deve ter um timestamp/timeout de reset futuro e um caminho de leitura que atualize o estado expirado. Os estados permanentes exigem alterações manuais às credenciais ou à configuração.

---

## Fingerprinting TLS e Furtividade

A furtividade específica de cada fornecedor (JA3/JA4, CCH, ofuscação) está documentada separadamente — consulte `docs/security/STEALTH_GUIDE.md` (git; não compilado em `/docs`).

---

## Testes de resiliência (Fase 8 · Bloco C)

Para além dos testes unitários da lógica de resiliência, três testes exercitam o runtime sob
condições reais de stress/falha (todos de integração/noturnos — nenhum bloqueia PRs):

| Teste       | O que faz                                                                                                                                                                    | Execução                                 |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Um nó fake-upstream injeta latência/reset/timeout/503 reais; valida que o circuit breaker abre/recupera e que `checkFallbackError` classifica 503 como fallback recuperável. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 streams por `createSSEStream` sob `--expose-gc`; falha se o heap crescer além do limite (proteção OOM #3069).                                                           | `npm run test:heap`                      |
| k6 soak     | Carga sustentada contra `/api/monitoring/health`; limites de p95/erros.                                                                                                      | `k6 run tests/load/k6-soak.js` (noturno) |

Orquestrados por `.github/workflows/nightly-resilience.yml` (cron + dispatch). No
`test:integration` predefinido, chaos e heap ignoram-se automaticamente (sem `RUN_CHAOS_INT`/`--expose-gc`).

---

## Consulte também

- [Guia de Arquitetura](./ARCHITECTURE.md) — Arquitetura do sistema e funcionamento interno
- [Guia do Utilizador](../guides/USER_GUIDE.md) — Fornecedores, combos, integração com a CLI
- [Motor Auto-Combo](../routing/AUTO-COMBO.md) — Pontuação de 16 fatores, pacotes de modos
