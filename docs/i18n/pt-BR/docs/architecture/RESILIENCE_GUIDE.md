# Resilience Guide (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

O OmniRoute possui três mecanismos de resiliência distintos, porém relacionados. Cada um tem um escopo e um propósito diferentes. Mantenha-os separados ao depurar o comportamento de roteamento.

![modelo de resiliência de 3 camadas](../diagrams/exported/resilience-3layers.svg)

> Fonte: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Circuit Breaker de Provedor

**Escopo:** provedor inteiro (por exemplo, `glm`, `openai`, `anthropic`).

**Propósito:** parar de enviar tráfego para um provedor que está falhando repetidamente no nível de upstream/serviço.

**Implementação:**

- Classe principal: `src/shared/utils/circuitBreaker.ts`
- Integração: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de status: `GET /api/monitoring/health`
- API de redefinição: `POST /api/resilience/reset`
- Wrappers: `open-sse/services/accountFallback.ts`
- Tabela do banco de dados: `domain_circuit_breakers`

**Estados:**

- `CLOSED` — tráfego normal permitido
- `DEGRADED` — tráfego ainda permitido, mas falhas elevadas do provedor estão sendo rastreadas; retorna a `CLOSED` após sucessos suficientes, após um teste de conexão válido, ou após a maior retenção em `OPEN` para o último tipo de falha (seu valor `cooldownByKind`, caso contrário `resetTimeout`, × `maxBackoffMultiplier`, no mínimo um cooldown) sem uma nova falha
- `OPEN` — provedor temporariamente bloqueado; o roteamento combo o ignora
- `HALF_OPEN` — timeout de redefinição decorrido; requisição de sondagem permitida

**Padrões configuráveis (`open-sse/config/constants.ts`, expostos em Dashboard → Configurações → Resiliência):**

| Classe       | Degrada com | Abre com  | Timeout de redefinição |
| ------------ | ----------- | --------- | ---------------------- |
| OAuth        | 5 falhas    | 8 falhas  | 60s                    |
| Chave de API | 7 falhas    | 12 falhas | 30s                    |
| Local        | derivado    | 2 falhas  | 15s                    |

`degradationThreshold` controla quando um provedor entra em `DEGRADED`; `failureThreshold` controla quando ele abre e passa a ser ignorado. Os perfis de provedor local ainda não estão expostos na página de configurações de Resiliência.

**Códigos de disparo:** apenas status de nível de provedor `[408, 500, 502, 503, 504]`. NÃO dispara para erros de nível de conta (a maioria dos 401/403/429 — esses pertencem ao cooldown ou lockout).

**Recuperação preguiçosa (lazy):** quando `OPEN` expira, `getStatus()`, `canExecute()`, `getRetryAfterMs()` atualizam o estado para `HALF_OPEN`. As mesmas leituras (e a próxima falha) fazem um `DEGRADED` obsoleto decair de volta para `CLOSED`. Nenhum timer em segundo plano é necessário.

---

### Cooldown global opcional de provedor (controle por janela)

Uma quarta camada, **opcional (opt-in)** (`PROVIDER_COOLDOWN_ENABLED`, padrão **desativado**), mantém uma
memória entre requisições dos provedores com falha em
`open-sse/services/providerCooldownTracker.ts`, consultada pela resolução de
alvos do combo para que requisições combo consecutivas parem de percorrer novamente
um provedor que acabou de falhar. As entradas de nível de provedor respeitam o
controle de janela do `PROVIDER_PROFILES`:

| Perfil       | dispara após (`providerFailureThreshold`) | dentro de (`providerFailureWindowMs`) | permanece em cooldown por (`providerCooldownMs`) |
| ------------ | ----------------------------------------: | ------------------------------------: | -----------------------------------------------: |
| OAuth        |                                      `10` |                               `15min` |                                           `5min` |
| Chave de API |                                      `15` |                               `30min` |                                          `10min` |

Abaixo do limiar, o provedor **não** é considerado em cooldown; um sucesso limpa
a janela. As entradas de nível de conexão (`provider:connectionId`) mantêm, em vez disso,
o backoff exponencial `minRetryCooldownMs → maxRetryCooldownMs`. Substituições:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Proteção contra regressão: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Cooldown de conexão

**Escopo:** conexão/conta/chave de um único provedor.

**Propósito:** pular uma chave com problemas enquanto outras conexões do mesmo provedor continuam atendendo.

**Implementação:**

- Marcar como indisponível: `src/sse/services/auth.ts::markAccountUnavailable()`
- Seleção: `getProviderCredentials*` no mesmo arquivo
- Cálculo do cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Configurações: `src/lib/resilience/settings.ts`

**Campos por conexão:**

- `rateLimitedUntil` — timestamp até o cooldown expirar
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — contador de backoff exponencial

**Cooldowns padrão:**

- Base OAuth: 5s
- Base de API key: 3s
- API key 429: prefere cabeçalhos `Retry-After`/reset do upstream ou texto de reset analisável
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Proteção anti-thundering-herd:** impede que falhas concorrentes estendam demais o cooldown ou incrementem `backoffLevel` em dobro.

**429s de limite de concorrência não sobem a escada de backoff.** Um `429` cujo corpo reporta um
limite de concorrência ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) significa que a conta está saudável, mas ocupada.
`checkFallbackError()` retorna o motivo `concurrency_limited`: faz failover para a próxima
conexão imediatamente, esfria esta por um `CONCURRENCY_LIMIT_COOLDOWN_MS` fixo (1s) ou pela
dica de retry do upstream, mantém `backoffLevel` inalterado e define `skipProviderBreaker`.
Um corpo de cota explícita ainda prevalece, então um corpo que também corresponde a um padrão
de cota continua sendo um veredicto de cota. Detecção: `looksLikeConcurrencyLimit()` em
`src/shared/utils/classify429.ts`; veredicto: `open-sse/services/accountFallback/concurrencyLimit429.ts`.
`classify429()` (o `FailureKind` do breaker) permanece inalterado e ainda lê `rate_limit` para
esses corpos.

**Travamentos de conteúdo do stream não esfriam a conta.** Quando o watchdog de travamento
de conteúdo (`open-sse/utils/streamHandler.ts`) desiste de um stream que não enviou saída do
modelo a tempo, `markAccountUnavailable()` registra o erro na conexão, mas não define
cooldown: o travamento pertence àquela requisição, na maioria das vezes um turno longo de
raciocínio ainda sem saída. Operadores podem reativar o cooldown com
`resilienceSettings.streamStallCooldown.enabled` (padrão `false`).

**Frames de raciocínio reiniciam o orçamento de travamento de conteúdo.** Um modelo de
raciocínio pode pensar por minutos antes do seu primeiro token visível: o Claude transmite
frames `thinking_delta` cujo texto de pensamento pode estar vazio, e a Responses API transmite
um item de raciocínio após o outro. `isReasoningProgressFrame()`
(`open-sse/utils/streamReadiness.ts`) reconhece esses frames, e o watchdog reinicia seu
orçamento a cada um deles em vez de cancelar o turno. Eles ainda não são saída do modelo,
então um turno que termina apenas com raciocínio ainda é reportado como vazio, e um turno que
para de raciocinar e só envia heartbeats ainda dispara o watchdog.

Os frames binários `reasoningContentEvent` do Kiro com assinatura não vazia preservam essa
atividade de raciocínio através do executor como um delta `reasoning_content` vazio. A
assinatura não é encaminhada. Metadados, frames incompletos e assinaturas vazias não reiniciam
o orçamento de conteúdo; o timeout independente de stream ativo e o cancelamento pelo cliente
ainda se aplicam (`open-sse/executors/kiro/reasoning.ts`).

**Estados terminais (NÃO são cooldowns):**

- `banned` — definido pela detecção de palavra-chave banida / banimento de conta (veja [BAN_DETECTION](../security/BAN_DETECTION.md)), e por três recusas consecutivas do upstream por requisição (`request_rejected`, ex.: Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); uma única recusa apenas esfria a conexão
- `expired` (transiciona para terminal após tentativas limitadas — `EXPIRED_RETRY_MAX = 3` com backoff exponencial — para que erros transitórios de OAuth possam se autorrecuperar antes que a conta seja permanentemente desativada)
- `credits_exhausted`

Esses estados persistem até que as credenciais mudem ou um operador os redefina. Não sobrescreva estados terminais com estado transitório de cooldown.

**Recuperação preguiçosa (lazy):** quando `rateLimitedUntil` já passou, a conexão volta a ser elegível. Em caso de uso bem-sucedido, `clearAccountError()` limpa todos os campos de erro.

### Muro de uso do Claude OAuth: faixa de prioridade mais baixa + reset de limite de sessão

**Escopo:** uma conexão de assinatura Claude (OAuth). Ambos os recursos são **opt-in por
conexão** (Editar conexão → seção Claude → `lowPriorityMode` / `autoLimitReset` em
`providerSpecificData`, ambos desativados por padrão) e espelham os comandos `/low-priority` e
`/limit-reset` do Claude Code (contrato de wire capturado do Claude Code 2.1.263).

**Implementação:**

- Máquina de estados + classificação de resposta: `open-sse/services/claudeLowPriority.ts`
- Cliente de status/claim de reset: `open-sse/services/claudeLimitReset.ts`
- Hook do executor (injeção de cabeçalho + retry na mesma conta): `open-sse/executors/base.ts::execute()`
- Persistência do opt-in: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Gatilho:** o muro de uso de 5 horas — um `429` cujos cabeçalhos carregam
`anthropic-ratelimit-unified-status: rejected` e, quando a conta é elegível,
`anthropic-ratelimit-unified-slow-offer: treatment`. Nada é enviado antes desse primeiro 429
do muro; um 429 de rajada sem cabeçalhos unificados segue o caminho normal de cooldown.

**Faixa de prioridade mais baixa** (`lowPriorityMode`):

- No 429 de wall, o executor aceita a oferta e imediatamente tenta novamente a **mesma**
  conta com `anthropic-usage-limit: slow`; a faixa permanece ativa até o
  `anthropic-ratelimit-unified-reset` anunciado (+60s de tolerância) e toda requisição nessa
  janela carrega o header. O 429 interceptado nunca chega ao `handleChatCore`, então a
  conexão **não** é colocada em cooldown e não é rotacionada para outra.
- `anthropic-ratelimit-unified-slow-status` em respostas posteriores: `active` / `not_needed`
  mantêm a faixa; `slot_busy` (429) ou um `529` aguardam o
  `anthropic-ratelimit-unified-slow-retry-after` do servidor (padrão 20s, limitado a 5–600s,
  jitter de ±30%) e tentam novamente, limitados pelo `anthropic-ratelimit-unified-slow-max-wait`
  (padrão 20 min, limitado a 1 min–6 h) — além disso a faixa termina e um cool-off de 10
  minutos bloqueia a reaceitação. A espera é adicionalmente limitada pelo que resta do timeout
  de início de upstream da própria requisição (`resolveFetchStartTimeout`, 10 min por padrão)
  menos uma margem de 5 s: sem esse limite, o max-wait padrão de 20 minutos sobreviveria à
  requisição e o sleep seria abortado no meio da espera, expondo um `TimeoutError` em vez do
  término gracioso por `max_wait` + cool-off.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, um rollover da janela de 5h, ou
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (que a encerra como
  `extra_usage` em qualquer status, já que o overage pago agora cobre a wall) encerram a
  faixa; a resposta então flui para o caminho normal de cooldown. `budget_exhausted` é
  lembrado até o reset de budget anunciado (≤ 8 dias).
- A verificação de wall roda após as retentativas intra-tentativa do próprio executor
  disparadas por 400 (edição de contexto, clamps de thinking/effort, auto-aprendizado de
  parâmetros), então um 429 de wall que só aparece em uma dessas retentativas ainda é
  interceptado em vez de alcançar o caminho de cooldown.
- O estado é em memória por conexão (um restart custa um 429 de wall extra para reaceitar).

**Reset de limite de sessão** (`autoLimitReset`, tentado antes da faixa quando ambos estão ativos):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → bloco `juniper_tide`;
  quando `arm: "reset"` e `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` com
  `{ "program": "juniper_tide" }` (UUID da organização de
  `providerSpecificData.organizationUUID`, com fallback de bootstrap).
- `result: reset|not_limited` → a requisição é tentada novamente em velocidade total (sem o
  header slow). `already_used` / `not_offered` memorizam `next_available_at` (padrão de uma
  semana); qualquer falha recua 15 minutos. O reset é uma vez por semana e ainda conta para o
  limite semanal.

Guardas de regressão: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afinidade de sessão (#7274)

**Escopo:** uma sessão de cliente (header `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) fixada em uma conexão, para **qualquer** provedor.

**Propósito:** manter um agente multi-turn (Claude Code, aider, agentes customizados) na mesma conta entre requisições, reduzindo a perda de contexto entre contas e 429s repetidos de cold-start em provedores com estado de sessão por conta.

**Implementação:**

- Resolução de TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Seleção/criação de pin: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extração de header (genérica, qualquer provedor): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabela de pins persistida: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Configuração: `sessionAffinityTtlMs` (TTL global em ms, `0` desativa) — `src/lib/db/settings.ts`. Renomeada de `codexSessionAffinityTtlMs`, que era exclusiva do Codex, pela migração `124_generic_session_affinity_ttl.sql`, que carrega qualquer TTL de Codex previamente configurado como o novo padrão.

Antes de #7274, `resolveSessionAffinityTtlMs()` retornava imediatamente `0` para todo provedor exceto `codex`, então a configuração de TTL (e os headers de sessão) não tinham efeito em nenhum outro lugar, mesmo que o mecanismo de fixação e a extração de header já fossem agnósticos a provedor. A correção removeu esse retorno antecipado; o TTL agora se aplica uniformemente a todo provedor uma vez definido globalmente acima de `0`.

Os três headers de afinidade de sessão nunca são encaminhados ao upstream — os executores constroem seus próprios headers de upstream do zero em vez de repassar os headers do cliente, então isso permanece apenas como um id de correlação interno.

### Leases de conexão exclusivos para sessões gerenciadas

**Escopo:** um cliente/sessão HTTP gerenciado ativo é dono de uma conexão OmniRoute elegível.

**Propósito:** fornecer posse exclusiva e durável de conexão para clientes que precisam de uma
barreira de roteamento rígida entre requisições. Isso difere da afinidade de sessão, que é uma
preferência suave de continuidade: um lease exclusivo persiste o estado do ciclo de vida no
SQLite, impõe unicidade global de dono ativo e de conexão ativa, e rejeita uma geração
obsoleta antes do despacho ao provedor.

O recurso é opt-in por chave de API. Uma chave gerenciada deve ter o escopo `lease:exclusive` e
uma lista `allowedConnections` explícita e não vazia. Qualquer cliente HTTP pode usar o
endpoint de ciclo de vida; nenhum nome de cliente, user-agent, provedor, método OAuth ou modelo
é necessário. O lease possui uma conexão, não um modelo, então uma mudança de modelo mantém o
vínculo enquanto a conexão permanece normalmente elegível. As regras normais de modelo, cota,
saúde, cooldown e allowlist permanecem autoritativas e podem mover a mesma geração para outra
conexão elegível livre.

O ciclo de vida é `POST /api/v1/session-leases` com as ações JSON `acquire`, `renew` e `release`.
As requisições de inferência gerenciada apresentam o valor opaco de `X-OmniRoute-Lease-Owner` e o valor exato de
`X-OmniRoute-Lease-Generation`. O proprietário usa `vlo_` seguido de 43 caracteres base64url; apenas
seu hash SHA-256 é armazenado. Cada fence de despacho final também vincula o ID da chave de API autenticada e
o ID da conexão ativa. Os cabeçalhos de controle de lease são removidos dos logs, dos snapshots de requisições retidos e
dos cabeçalhos do executor upstream.

Se o roteamento padrão tiver candidatos gerenciados elegíveis, mas todos os candidatos livres estiverem ocupados por um
lease ativo alheio, o OmniRoute retorna HTTP `429`, código de capacidade de lease indisponível, um
estado de aguardando capacidade e um `Retry-After` limitado derivado da expiração relevante mais próxima.
A elegibilidade vazia no roteamento padrão não é contenção de lease e mantém sua semântica de erro de roteamento existente.

Os mecanismos relacionados permanecem separados:

- A ocupação de sessão OAuth é uma distribuição suave (soft), local ao processo, para contas OAuth.
- Os semáforos de conta concedem permissões de concorrência de requisições e terminam quando uma requisição é concluída.
- Os leases exclusivos de sessão gerenciada são propriedade durável do ciclo de vida com um fence de geração.

---

## 3. Bloqueio de Modelo

**Escopo:** tripla provedor + conexão + modelo.

**Escopo da chave por status:** o status da falha decide em qual chave um bloqueio grava
(`resolveLockoutScope()` em `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — um sinal de cota ou permissão — bloqueia a **família de cota**:
  para o codex, todo o escopo `codex` / `spark` (cada modelo `gpt-5*` da
  conexão); para outros provedores, `getQuotaScopedModelForProvider()`.
- `404` bloqueia apenas o modelo (`getModelLockKey()` restringe `not_found`).
- Qualquer outro status — falhas de transporte/servidor `5xx` e o próprio `502`
  sintetizado pelo OmniRoute a partir da validação de qualidade — bloqueia apenas a
  tupla **exata** provedor/conexão/modelo. Um stream ruim em um modelo não é evidência
  sobre a cota da conta; antes dessa regra, uma única resposta vazia em
  `codex/gpt-5.6-luna` removia todos os modelos `gpt-5*` dessa conexão do
  roteamento por 2–30 min (escalando) enquanto sua cota permanecia intacta.
- A opção `scope` explícita do chamador sempre prevalece (o Antigravity passa `"exact"`).

**Propósito:** evitar desabilitar uma conexão inteira quando apenas um modelo está indisponível ou limitado por cota.

**Exemplos:**

- Provedores com cota por modelo retornando 429
- Provedores locais retornando 404 para um modelo ausente
- Falhas de permissão de modo/modelo específicas do provedor (ex.: modos do Grok)

**Implementação:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Painel de Cooldowns de Modelo (v3.8.0)

UI: Configurações → Cooldowns de Modelo (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Lista bloqueios ativos com: provedor, conexão, modelo, motivo, expiresAt. Operadores podem reabilitar manualmente um modelo pelo cartão.

**REST API:**

- `GET /api/resilience/model-cooldowns` — lista bloqueios ativos
- `DELETE /api/resilience/model-cooldowns` — reabilitação manual. Corpo: `{provider, connection, model}`. Autenticação: management.

### Gerenciador de Cooldowns

UI: Monitoramento → Gerenciador de Cooldowns (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Uma única página para cada conexão que está fora do roteamento por um motivo transitório, em vez de
abrir a página de cada provedor. Ela lista cooldowns de conexão, bloqueios de modelo e estados
terminais, limpa-os por conexão, para uma seleção ou para todas as conexões de um provedor,
e edita as regras de cooldown mais ajustadas: `streamStallCooldown.enabled` e o cooldown base
`connectionCooldown` de OAuth / API-key, além dos passos máximos de backoff (salvos via
`PATCH /api/resilience`). Estados terminais (`banned`, `expired`, `credits_exhausted`) são
listados, mas nunca limpos aqui.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autenticação: management):

- `GET /api/resilience/cooldowns[?provider=]` — conexões com status, cooldown restante,
  nível de backoff, tipo do último erro e bloqueios de modelo (sem credenciais)
- `POST /api/resilience/cooldowns` — corpo `{connectionIds: string[]}` ou
  `{all: true, provider?}`; retorna `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI de configurações de bloqueio + recuperação por decaimento em caso de sucesso (v3.8.23)

O bloqueio de modelo passou de um comportamento fixo e sempre ativo para um recurso
totalmente configurável e opcional (opt-in), com seu próprio cartão de configurações e um caminho de recuperação autorregenerativo.

**Cartão de configurações:** Configurações → Bloqueio de Modelo
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ele é **distinto** do `ModelCooldownsCard` somente leitura acima (que apenas
_lista_ bloqueios ativos) — o novo cartão _configura os parâmetros_. Os padrões
ficam em `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Configuração            | Padrão                           | Significado                                                         |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------- |
| `enabled`               | `false`                          | Chave mestra — o bloqueio de modelo está **desativado por padrão**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Status upstream que contam como falha no escopo do modelo.          |
| `baseCooldownMs`        | `120_000` (120 s)                | Duração inicial do bloqueio para a primeira falha.                  |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Limite máximo do cooldown escalado.                                 |
| `maxBackoffSteps`       | `10`                             | Número máximo de passos de escalonamento com backoff exponencial.   |
| `useExponentialBackoff` | `true`                           | Se falhas repetidas escalam o cooldown exponencialmente.            |

As configurações persistem pelo armazenamento normal de configurações e são validadas pelo
schema de configurações de resiliência; o cartão limita `baseCooldownMs`/`maxCooldownMs`
(com `maxCooldownMs ≥ baseCooldownMs`) e `maxBackoffSteps`.

**Recuperação por decaimento em caso de sucesso:** a recuperação **não** é puramente a
expiração do temporizador. Uma resposta saudável reduz progressivamente a contagem de falhas
do modelo, de modo que um modelo que se recuperou no meio da janela para de escalar
(e é liberado) antes que seu temporizador expirasse. Em um alvo de combo bem-sucedido,
`open-sse/services/combo.ts` chama `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), que **reduz à metade** o
`failureCount` armazenado (`Math.floor(failureCount / 2)`); quando ele chega a `0`, a entrada
de bloqueio é excluída por completo. A contraparte `recordModelLockoutFailure()`
incrementa a contagem (e escala o cooldown) em falhas dentro da janela de
escalonamento. Esse decaimento por sucesso soma-se à expiração simples do temporizador —
qualquer um dos dois caminhos pode reabilitar um modelo.

**Estado:** os bloqueios são mantidos **em memória** (`Map`s por processo de
`ModelLockoutEntry` indexados por `provider:connectionId:model`, bloqueios de escopo exato por
`provider:connectionId:exact:model`), não persistidos no
banco de dados — eles se perdem na reinicialização. As _configurações_ são persistidas; o
_estado_ de bloqueio ativo é efêmero.

---

## 4. Controle de Concorrência Quota-Share (v3.8.36)

Contas de assinatura (GLM, MiniMax, etc.) geralmente aceitam apenas ~1–3
requisições simultâneas; exceder esse limite dispara respostas 429 e cooldowns.
Isso é crítico em combos **quota-share** (`qtSd/…`), onde várias chaves de API
compartilham uma única conta upstream. Três camadas impedem que uma conta
compartilhada seja inundada.

### Limite de concorrência por conexão (`max_concurrent`)

Cada conexão de provedor pode declarar um teto de `max_concurrent`
(`provider_connections.max_concurrent`, definido no modal de conexão / API /
banco de dados). Deixe vazio para nenhum limite. Este é o único controle que
aciona a camada de serialização abaixo — defina-o para a concorrência real da
conta (ex.: GLM ~1, MiniMax ~2).

### Limites de concorrência por modelo (`modelConcurrency`)

Uma conexão pode adicionalmente declarar tetos exatos de concorrência por
modelo dentro do seu mapa `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Defina-o no modal de conexão (**Substituições de rate limit → Limites de
concorrência por modelo**, um `model=cap` por linha) ou via
`PATCH /api/providers/[id]` com o mesmo formato JSON. Semântica das chaves:

- **Âmbito da conexão vs. específico do modelo:** `maxConcurrent` permanece o
  teto compartilhado da conexão como um todo. Quando ambos se aplicam, os dois
  gates são adquiridos atomicamente no mesmo gate composto
  (`global → provider → account → model`); o comportamento efetivo é o limite
  aplicável mais restritivo.
- **Correspondência exata da chave do modelo:** a chave é a string do modelo
  passada ao executor após a resolução do roteamento — normalmente o id do
  modelo upstream puro (`glm-5`), não um alias `provider/model` do lado do
  cliente (`zai/glm-5` não corresponde a `glm-5`). Os valores são tetos
  inteiros positivos de requisições simultâneas.
- **Enfileiramento local, sem descoberta:** as requisições excedentes são
  enfileiradas localmente com a semântica de fila/timeout existente (erros de
  admissão tipados `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). O OmniRoute
  não descobre nem infere a política upstream — ele impõe os tetos exatos que
  o operador configurou. Um gate de modelo saturado nunca desabilita o
  provedor e nunca cria um bloqueio permanente do modelo; o comportamento
  upstream de 429/cooldown/fallback permanece como a salvaguarda final para
  erros.
- **Escopo por conexão, por processo:** os limites são por conexão de banco de
  dados e mantidos em memória, portanto duas conexões que reutilizam a mesma
  chave de API upstream não se coordenam entre si.
- **Não configurado significa inalterado:** omitir o mapa (ou deixar o campo do
  dashboard em branco) não adiciona nenhum gate de modelo. Exemplo de
  configuração sem afirmar nenhum limite universal do provedor:

```text
glm-5=1
glm-4.7=3
```

### Serialização de requisições quota-share

Quando um despacho quota-share tem como alvo uma conexão que declara um
`max_concurrent` positivo, as requisições simultâneas para essa **conta** são
serializadas por meio de um semáforo por conexão (chave `qsconn:<connectionId>`):
as requisições excedentes **aguardam na fila** em vez de inundar a conta. É
**fail-open** — uma fila saturada ou timeout prossegue sem um slot em vez de
jamais rejeitar uma requisição despachável. Alterne em **Configurações →
Resiliência → Concorrência por conexão quota-share**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ativado por padrão).
Sem um teto de `max_concurrent`, o comportamento permanece inalterado.

> O gate de roteamento quota-share (`selectQuotaShareTarget`, DRR + P2C) é em
> si fail-open e apenas _desprioriza_ uma conexão no limite — com um pool de
> conexão única ele não pode impor um limite rígido, portanto este semáforo é
> o que realmente contém o fluxo.

### Retry ciente de cooldown em combos

Para cada estratégia de combo (quando ativada), uma requisição que cristalizaria
um 429 por um cooldown transitório CURTO aguarda sua expiração e é reenviada em
vez de retornar o 429 — isso cobre janelas de TPM/RPM da classe Gemini (~60s de
retry-after) em combos multi-modelo, por exemplo, quando ambos os alvos de um
combo de 2 modelos atingem um limite de taxa por modelo. Limitado por
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) em
**Configurações → Resiliência**. Nunca aguarda em `quota_exhausted` (bloqueado
até meia-noite) ou por motivos de autenticação/não encontrado.

O mesmo gate cobre o caso pré-despacho (#16319): quando todos os alvos de um
combo são ignorados antes de qualquer tentativa porque seu modelo está em um
bloqueio transitório curto, o caminho de zero tentativas aguarda a expiração do
bloqueio sob os mesmos tetos e reenvia, em vez de responder um
`503 ALL_TARGETS_SKIPPED` sem hint. Quando nenhuma espera é permitida (teto,
tentativas ou orçamento esgotados, ou o recurso desativado), a resposta terminal
é promovida para `429 rate_limit_error` carregando `retry_after` / `reset_at`
da expiração de bloqueio transitório mais próxima; bloqueios de cota,
autenticação e não encontrado mantêm o 503 sem hint.

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

## 5. Controle de Admissão da Fila de Requisições (v3.8.49 · issue #6593)

**Escopo**: a fila local de rate limit por provedor+conexão (`open-sse/services/rateLimitManager.ts`,
respaldada pelo Bottleneck), uma camada abaixo dos três mecanismos acima.

**`maxWaitMs` limita a espera na fila; `executionMaxWaitMs` limita a execução.**
Os dois são deliberadamente separados, e nenhum alimenta o outro.

`resilienceSettings.requestQueue.maxWaitMs` é o **orçamento de espera na fila**: ele
cobre a espera por um slot do provedor e depois a permanência em QUEUED, e seu
temporizador é limpo no momento em que o job sai de QUEUED e começa a executar
(`rateLimitManager.ts`, `wrappedFn`). Uma requisição que o excede nunca chega
ao upstream. Padrão 30000ms, fornecido por `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
em `src/lib/resilience/settings.ts` e fixado por
`tests/unit/ratelimit-admission-control-6593.test.ts`, de modo que uma alteração nele
deixa esse teste vermelho em vez de deixar este parágrafo silenciosamente desatualizado.

`resilienceSettings.requestQueue.executionMaxWaitMs` é o que o Bottleneck
recebe como o `expiration` do job, cujo temporizador só inicia após o despacho. É
uma salvaguarda para executores sem um timeout de upstream próprio, e é
elevado ao timeout de início de fetch do próprio executor quando este é mais longo,
de modo que não pode cortar uma resposta saudável em andamento. Padrão 600000ms (10 min).

Alimentar o orçamento da fila no `expiration` era o que costumava matar gateways não incrementais
no meio do voo — eles rodam legitimamente por minutos antes dos primeiros bytes —
e é por isso que uma expiração é exposta como `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) enquanto o orçamento da fila carrega o
código de timeout da fila. Sobrescreva qualquer um deles via `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ou pelo dashboard
(**Settings → Resilience**). Ambos são restringidos ao intervalo de 1ms–24h quando normalizados.

**Precedência, para ambos:** a variável de ambiente só fornece o _padrão_. Um valor
persistido em `resilienceSettings.requestQueue` (dashboard / patch de API, armazenado
em `key_value`) prevalece sobre ela, e um
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` por conexão prevalece sobre esse. Definir
a variável de ambiente em uma implantação que já possui um valor persistido, portanto,
não muda nada — limpe ou atualize a configuração persistida em vez disso.

A permanência na fila é limitada pelo `maxWaitMs`; o `maxQueueDepth` abaixo limita quantos
chamadores podem estar enfileirados ao mesmo tempo.

**Retries declarados no corpo: ritmo vs bloqueio.** Um corpo 429 pode indicar sua própria espera
(`RetryInfo.retryDelay` do Gemini, texto "retry after Ns"), que o
`updateFromResponseBody` lê. Uma espera que cabe no `maxWaitMs`
da conexão é ritmo: o limitador esvazia seu reservatório por esse tempo e as chamadas
enfileiradas são despachadas quando ele se reabastece. Uma espera mais longa que o
`maxWaitMs` não é algo que a fila possa aguardar até o fim — o Gemini responde a uma
cota diária esgotada com `retryDelay: "86399s"`. O `Retry-After` retransmitido
no 429 reconstruído (#16528) já faz com que o motor de fallback bloqueie o modelo durante
essa janela, mas pausar o limitador por causa dela também ainda travaria qualquer
chamada que chegasse à chave mais cedo (após um reset de resiliência, por exemplo) por
todo o `maxWaitMs`. Quando tal espera vem de um detalhe `RetryInfo`
tipado do Google (a proveniência `google_rpc_retry_info`) e o limitador da chave
já tem escopo no modelo (veja `getLimiterKey`), o 429 passa a ser um
bloqueio de modelo naquela conexão (`lockModelForLongBodyRetry` em
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, limitado a 24h), e o
limitador permanece sem pausa. A seleção de conta pula com base nesse bloqueio via
`isModelLocked()`, e o mesmo acontece com o gate de pré-despacho do combo para alvos fixados
na conexão. No antigravity, cujo limitador é por família de cota, o bloqueio é
no modelo exato, como seus outros bloqueios de cota. O nome que o cliente solicitou
também é bloqueado quando um alias o resolveu para aquele modelo, porque essas
verificações usam o nome solicitado; ele é bloqueado de forma exata (`lockExactModel`),
de modo que um alias que cruza uma família de cota do antigravity ou um escopo do codex
nunca bloqueia o seu próprio. Uma dica em prosa, um `retryDelay` não tipado ou um
limitador compartilhado pela conexão inteira mantém a pausa. Quando o limitador que o
caminho do 429 acabou de reconstruir realmente pausa, um chamador cujo tempo restante
na fila termina antes do fim da pausa é rejeitado imediatamente com o código de
timeout da fila (`checkLimiterPause`), em vez de aguardar esse tempo se esgotar;
o fim registrado é ancorado antes de o limitador ser construído, onde o Bottleneck
inicia seu relógio de reabastecimento, e qualquer alteração posterior no reservatório
o esquece. Coberto por `tests/unit/rate-limit-long-body-retry-lockout.test.ts` e
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — limite de admissão opcional (novo).** `resilienceSettings.requestQueue.maxQueueDepth`
limita quantas requisições podem ficar enfileiradas (ainda não despachadas) para um
provedor+conexão ao mesmo tempo. Quando a fila já contém `maxQueueDepth`
requisições, uma nova requisição é rejeitada de forma rápida com um erro tipado
`code: "RATE_LIMIT_QUEUE_FULL"` **antes** de chegar a `limiter.schedule()`
— então a rejeição é barata e acontece antes de qualquer trabalho posterior de
compressão de prompt / tradução para essa requisição. Padrão `0` =
desabilitado, preservando o comportamento existente de fila ilimitada; limitado a 0–100000.
Sobrescreva via `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ou
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/patch de API).

A verificação de admissão em si é uma função pura
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), portanto
pode ser testada unitariamente sem um limitador Bottleneck real.

> O RFC que abriu #6593 também propôs uma flag
> `bypassCompressionOnRateLimit`. O pipeline
> `open-sse/services/compression/` deste repositório é de compressão de
> prompt/contexto na requisição de saída para o LLM (`chatCore.ts`, em
> torno do bloco `resolveCompressionSettings`/`selectCompressionStrategy`),
> e não compressão de resposta HTTP em corpos 429 sintetizados — não existe
> um caminho de código correspondente para uma flag de bypass literal. Essa
> etapa de compressão de prompt também é executada atualmente _antes_ de
> `withRateLimit()` no pipeline de requisição, portanto reordená-la para
> ignorá-la em uma rejeição de fila cheia é uma mudança separada e maior do
> que o escopo desta issue; ela foi intencionalmente **não** implementada
> aqui e fica como trabalho futuro, caso a economia de CPU valha o risco da
> reordenação.

### Rede de Segurança de Ativação Automática de Rate-Limit e Proteção de Conexão (`rateLimitProtection`)

**Rede de segurança de ativação automática** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, padrão `true`):
Por padrão, o OmniRoute ativa automaticamente a proteção de fila de rate-limit para todas as conexões ativas de provedores de chave de API (`getProviderCategory(provider) === "apikey"`). Isso garante que as requisições recebidas destinadas a chaves de API upstream sensíveis a limite de taxa sejam enfileiradas e limitadas pelo Bottleneck, em vez de estourarem em erros 429 no upstream. A rede de segurança pode ser sobrescrita pela variável de ambiente `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` desativa, `true`/`1`/`on` força a ativação), que tem precedência sobre a configuração persistida do painel (**Configurações → Resiliência** / `PATCH /api/resilience`).

**Semântica do `rateLimitProtection` por conexão:**
A proteção de rate-limit por conexão é controlada pelo campo booleano `rateLimitProtection` nas conexões de provedor (persistido como `rate_limit_protection` no SQLite):

- **Ativado explicitamente (`rateLimitProtection === true`)**: a proteção de rate-limit está explicitamente ativada para esta conexão, independentemente da categoria do provedor ou de a rede de segurança de ativação automática estar ligada.
- **Desativado explicitamente (`rateLimitProtection === false`)**: desativa a proteção explícita, mas **não** exclui uma conexão ativa de chave de API da rede de segurança global de ativação automática. Em `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` e `undefined` são equivalentes: apenas `rateLimitProtection === true` é tratado como uma sobrescrita explícita. Se `rateLimitProtection` for `false` (ou não estiver definido), uma conexão ativa de chave de API ainda corresponde à condição de ativação automática e permanece protegida contra rate-limit.
- **Sem opt-out por conexão**: atualmente, um operador não pode expressar "esta única conexão ativa de chave de API deve rodar sem proteção de fila de rate-limit" mantendo a ativação automática ativa para as demais. Para rodar conexões de chave de API completamente sem filas de rate-limit, a rede de segurança deve ser desativada globalmente (`RATE_LIMIT_AUTO_ENABLE=false` ou `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Caminhos de escrita suportados:**

- **`POST /api/rate-limits`**: o caminho de escrita de gerenciamento suportado para alternar o `rateLimitProtection` de uma conexão (`{ connectionId: string, enabled: boolean }`). Chamá-lo com `enabled: true` ativa a proteção explícita; chamá-lo com `enabled: false` remove a proteção explícita (embora conexões ativas de chave de API permaneçam cobertas pela rede de segurança global, caso a ativação automática esteja ligada).
- **`PUT /api/providers/[id]`**: deliberadamente **não** aceita nem altera `rateLimitProtection` (#11278). Atualizar os metadados da conexão de provedor via `PUT /api/providers/[id]` nunca mudará o estado persistido da proteção de rate-limit.

---

## 6. Watchdog de throughput de stream lento (#9709)

O guard opcional `resilienceSettings.streamRecovery.throughputWatchdog` detecta
um upstream que ainda está enviando chunks, mas produzindo saída do assistente abaixo
da taxa de saída útil configurada. Ele é deliberadamente distinto do timeout de inatividade:
heartbeats e metadados não resetam nenhum dos dois timers e não contam como progresso. Ele também é
distinto do deadline rígido da tentativa (#9153), que permanece um teto de segurança
absoluto independentemente da qualidade da saída.

O watchdog exige um período de warm-up seguido de uma janela móvel completa antes
de poder abortar. Ele conta deltas de texto do Chat Completions e dos eventos de saída da
Responses API (um proxy conservador de bytes UTF-8), ignora eventos somente de uso e eventos vazios, e
suspende a avaliação enquanto eventos de tool-call ou de reasoning estão em andamento. Ele é desabilitado
por padrão e pode ser habilitado com `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`;
a janela, o warm-up, a taxa mínima e a saída mensurável mínima são limitados pela
camada habitual de normalização das configurações de resiliência.

Quando habilitado, um abort do watchdog é aplicado apenas à tentativa de upstream ativa. Antes
de quaisquer bytes visíveis ao cliente, o caminho existente de recuperação antecipada na mesma conta pode reabrir
a tentativa. Após o commit, o stream nunca é repetido cegamente; apenas o contrato existente de
continuação segura no meio do stream pode emendar um sufixo. A finalização permanece
single-shot, portanto a contabilização de uso e a liberação do semáforo não são duplicadas.

---

## 7. Reexpressão de Status Upstream (erros de cota com status incorreto)

**Escopo:** um gateway upstream que reporta esgotamento temporário de cota com o status HTTP errado.

**Propósito:** corrigir um status enganoso ANTES da classificação, para que os consumidores downstream (motor de fallback, agregação de combos, a resposta voltada ao cliente) vejam a verdadeira natureza passível de retry da falha.

Alguns gateways sinalizam esgotamento TEMPORÁRIO de cota com um status HTTP
não passível de retry. `agentrouter.org` retorna `403` (às vezes `400`) com um
corpo em chinês (`用户额度不足` / `额度不足`) em vez do `429` padrão. Clientes como
o Claude Code tratam `403` como permanente e abortam a sessão e, sem correção,
o motor de fallback o classificaria como `AUTH_ERROR` em vez de um evento de
cota.

**Implementação:**

- Registro + matcher: `open-sse/config/upstreamStatusRestatement.ts` — uma
  lista de regras por provedor (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), com correspondência feita via `applyStatusRestatement()`.
- Ponto de chamada: o bloco `providerFailure:` em `open-sse/handlers/chatCore.ts`
  (por volta da linha 3654), logo após o `parseUpstreamError()` analisar uma
  resposta upstream com um status HTTP de erro (`!providerResponse.ok`), e
  antes de qualquer classificação ser executada, para que todo consumidor
  downstream veja o status corrigido. Erros embutidos dentro de um stream SSE
  `200` seguem um caminho separado e posterior de parsing de stream e **não**
  são cobertos por este hook hoje — uma limitação conhecida, ainda não
  necessária para o status incorreto do agentrouter (que surge como um status
  HTTP de erro).
- Elegibilidade de retry: `429` está em `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), então um erro reexpresso
  carrega uma janela real de retry em vez de surgir como um `403` morto.
- O `defaultRetryAfterMs` sintético de `60s` (`upstreamStatusRestatement.ts`)
  é apenas o que a resposta reexpressa informa ao **cliente**; não é, por si
  só, a duração interna de cooldown/lockout da conexão — essa é governada
  separadamente por qualquer mecanismo que efetivamente trate o erro reexpresso
  (o backoff progressivo do Connection Cooldown, §2, base `3s` para provedores
  de API key; ou o Model Lockout, §3, para provedores de cota por modelo como
  o agentrouter). O roteador pode se tornar elegível para retry internamente
  mais cedo do que a janela de 60s que anuncia ao cliente — folga intencional,
  não um bug.

Erros permanentes (o `无权访问模型` do agentrouter — sem acesso a este modelo)
NUNCA são reexpressos: `excludeMarkers` veta a regra mesmo quando os
`textMarkers` correspondem, de modo que o erro mantém seu status original e
nada fica tentando repeti-lo para sempre. A regra de classificação de provedor
correspondente (`agentrouter-model-access-denied` em
`open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`, `scope: "model"`,
um cooldown base declarado de `6h`) é consultada pelo `checkFallbackError`
(`open-sse/services/accountFallback.ts`) _antes_ do retorno antecipado
genérico de `FORBIDDEN` da categoria apikey, condicionada a
`honorsRuleLockScope(provider)` (#10334 — atualmente exclusiva do agentrouter
via a allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` em
`providerErrorRules.ts`). O cooldown declarado de 6h da regra flui como
`fallbackResult.baseCooldownMs`, mas ainda alimenta o caminho pré-existente de
lockout de cota por modelo (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, inalterado pelo #10334 exceto pela fonte do
cooldown): ele é limitado ao `mlSettings.maxCooldownMs` do operador (padrão
`1_800_000ms` / 30min), como qualquer outro lockout de modelo, e a _razão de
lockout persistida_ permanece o `"forbidden"` hardcoded pré-existente, não o
`"auth_error"` da regra — apenas a duração do cooldown é honrada de ponta a
ponta, não a string de razão. A conexão em si permanece ativa; os modelos
irmãos na mesma conexão não são afetados.

Erros de cota reexpressos (`额度不足`) alcançam uma regra de provedor em
produção (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, sem cooldown declarado próprio — aplica-se o padrão de backoff
escalonado da camada de persistência). Desde o #10334, o `scope` em
`ProviderErrorRuleMatch` É consumido de ponta a ponta, mas **somente** para
provedores na allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — hoje apenas `"agentrouter"`, condicionado via
`honorsRuleLockScope()`). Para todos os outros provedores, `scope` permanece
apenas informativo, exatamente como antes do #10334. `checkFallbackError`
expõe o scope da regra correspondida como `fallbackResult.ruleScope`;
`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) é o guard
compartilhado que confirma que um `ruleScope` é genuinamente seguro de honrar
como um sinal de autorrecuperação abrangente da conexão (scope `"connection"`,
reason `quota_exhausted`, nunca `permanent`, nunca `creditsExhausted` — uma
defesa contra uma regra futura que combine o scope `"connection"` com um
estado permanente de conta). Dois consumidores o chamam:

- **Persistência** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  em vez de cair no branch de bloqueio **por modelo** do provedor passthrough
  (agentrouter é `passthroughModels: true` → `hasPerModelQuota()`
  retorna `true`), aplica um **cooldown temporário de conexão** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nunca um status terminal
  (`credits_exhausted`/`banned`/`expired`) — de modo que a conexão se recupera
  sozinha quando o cooldown expira, em vez de exigir um reset manual de credencial.
  Ignorado para conexões com `disableCooling: true` (#2997): esse opt-out
  cai no bloqueio por modelo (um trade-off documentado —
  veja o comentário no código acima do branch).
- **Roteamento de combo na mesma requisição** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): o mesmo guard marca a
  conexão no conjunto em memória `exhaustedConnections`, chaveado por
  `${provider}:${connectionId}`. Isso só pula um alvo restante DA MESMA
  REQUISIÇÃO que _ele próprio já carrega exatamente esse `connectionId`_ no seu
  próprio objeto de alvo (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` antes da consulta a `exhaustedConnections`) — um combo simples
  de lista de modelos, em que os alvos irmãos não carregam nenhum `connectionId`
  fixado próprio e um só é resolvido por dispatch a partir do header
  `X-OmniRoute-Selected-Connection-Id` da resposta, nunca atinge essa correspondência
  de chave. Para esse caso comum, a proteção real contra uma perna restante
  reutilizar a conta recém-esgotada NÃO é este Set — é a camada de persistência
  acima (o `rateLimitedUntil` da conexão agora está no futuro) combinada com
  este mesmo guard suprimindo `transientRateLimitedProviders` para a
  falha (veja "Design em dois estágios" e o comentário no código no
  branch `isAgentrouterConnectionQuotaScope` em `targetExhaustion.ts`): com
  esse Set deixado sem marcação, o force-allow `allowRateLimitedConnection` do
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NÃO entra em
  ação para as pernas restantes do provedor, então o filtro `rateLimitedUntil`
  da seleção de credenciais (`src/sse/services/auth.ts:1238`) é respeitado
  normalmente e uma perna restante ou escolhe uma conexão agentrouter diferente,
  ainda elegível, ou falha sem credenciais disponíveis — ela não força seu
  caminho de volta para a conexão que este branch acabou de colocar em cooldown.

### Design em dois estágios: reformulação de status, depois classificação

A reformulação de status (`upstreamStatusRestatement.ts`) e as regras de
classificação de provedor (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) são registros separados que ambos chaveiam por id de
provedor e marcadores de texto, mas rodam em lugares diferentes e servem a
propósitos diferentes: a reformulação reescreve o status HTTP no início do
`chatCore.ts`; as regras de classificação escolhem o `reason` de fallback e
travam o `scope` (`model` / `provider` / `connection`) dentro de
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

As regras de classificação só veem o **texto** completo do erro (necessário
para corresponder marcadores de corpo como `额度不足`) para provedores listados
na allowlist `FULL_TEXT_RULE_PROVIDERS` em `providerErrorRules.ts` — atualmente
apenas `"agentrouter"`. Para todo outro provedor do **catálogo embutido**,
`checkFallbackError` entrega a `getProviderErrorRuleMatch` apenas o erro
estruturado (`{code, type}`), o que é suficiente para regras baseadas em
header/status/código, mas cego a marcadores de texto do corpo. O helper
`resolveRuleMatchBody()` realiza essa seleção: texto completo do erro para
provedores na allowlist, o erro estruturado caso contrário. Adicionar um
provedor **embutido** a `FULL_TEXT_RULE_PROVIDERS` é um opt-in explícito por
provedor — existe para que o caminho padrão de cada provedor fora da lista
permaneça byte a byte inalterado.

O `scope` de uma regra (`model` / `provider` / `connection`) é um opt-in
separado de `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` só o expõe como
`fallbackResult.ruleScope`, e os consumidores downstream só o honram como algo
além de um rótulo informativo para provedores na allowlist
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` no mesmo arquivo (controlado via
`honorsRuleLockScope()` — hoje apenas `"agentrouter"`). Veja "Erros de cota
reformulados" acima para o que uma correspondência `scope: "connection"`
realmente faz uma vez que um provedor está nessa allowlist.

**#11104 — regras declaradas pelo operador contornam ambas as allowlists.** Um
operador pode declarar uma regra por provedor em runtime via
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
sem editar este arquivo. Condicionar uma regra de operador a
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — allowlists
destinadas a proteger o comportamento **padrão** das regras do catálogo
embutido — tornaria o mecanismo de settings inerte para todo provedor, exceto
os já listados ali, já que declarar a regra já é o opt-in explícito do
operador. `resolveRuleMatchBody()` e `honorsRuleLockScope()` ambos verificam
`hasOperatorRuleForProvider()` primeiro: um provedor com regra de operador
recebe o texto bruto do erro e tem seu `scope` declarado honrado,
independentemente de também aparecer em qualquer uma das allowlists.

**Lacuna conhecida — `providerRuleRegistry` nunca é consultado para HTTP 400.**
O branch `BAD_REQUEST` de `checkFallbackError` classifica o status 400
inteiramente através de seus próprios arrays de padrões
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, etc. em
`accountFallback.ts`) e retorna antes que o branch
`configuredRule`/`getProviderErrorRuleMatch` acima dele seja alcançado.
Uma regra do catálogo embutido (ou uma regra de operador) com `status: 400` é
sintaticamente válida, mas nunca disparará. Nenhuma regra existente mira 400
hoje, então nada em produção é afetado — mas uma futura regra 400 precisa que
este branch seja alterado primeiro, o que é uma mudança maior do que adicionar
uma regra (ela reclassifica 400 para cada provedor que já depende do
comportamento dos arrays de padrões) e está fora do escopo de uma adição de
regra para um único provedor.

### Adicionando um novo gateway que deturpa quotas

1. Registre um array de regras em `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Mantenha os `textMarkers`
   específicos do provedor; nunca reutilize frases genéricas em inglês que colidam com
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Opcionalmente, registre regras de classificação em
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) para escolher
   o escopo de bloqueio correto (`connection` para quota em nível de conta, `model` para
   erros por modelo). Esta etapa só tem efeito em produção para
   provedores cujas regras precisam do texto completo do erro (marcadores de corpo): adicione o
   id do provedor a `FULL_TEXT_RULE_PROVIDERS` no mesmo arquivo — caso contrário,
   `checkFallbackError` só entrega à regra o erro estruturado
   `{code, type}` e uma regra baseada em texto do corpo nunca corresponderá ao tráfego real.
   Regras que correspondem puramente em `status`/`headers` (como as do Opencode ou
   do Minimax) não precisam dessa ativação. Separadamente, se a regra declarar
   `scope: "connection"` e a intenção for um cooldown real em nível de conexão
   mais a exclusão do combo na mesma requisição (não apenas um rótulo informativo), adicione o
   id do provedor a `HONORS_RULE_LOCK_SCOPE_PROVIDERS` no mesmo arquivo — é isso
   que controla o consumo no estilo `isAgentrouterConnectionQuotaScope()` em
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) e
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); sem isso, o `scope`
   ainda flui através de `fallbackResult.ruleScope`, mas nada age sobre ele.
3. Adicione testes unitários espelhando `tests/unit/upstream-status-restatement.test.ts`
   e `tests/unit/agentrouter-error-rules.test.ts` (incluindo as
   proteções not-permanent / not-creditsExhausted e — se o provedor precisar
   da allowlist — um teste verificando que `resolveRuleMatchBody()` retorna o
   texto completo apenas para aquele provedor).

Nenhuma alteração em `chatCore.ts`, `classifyError` ou combo é necessária.

#### Bloqueio por bucket de egresso (#10880)

Provedores em `EGRESS_BUCKETED_LOCK_PROVIDERS` (família opencode) são tratados
como upstream com bucketing por IP (o nível gratuito do opencode tem bucketing por IP, não
por conta — veja #9611): um status 429 classificado como `quota_exhausted`
**ou** `rate_limit_exceeded` coloca em cooldown toda conexão da família na allowlist
cujo último IP de egresso conhecido corresponda ao da conexão que falhou, antes que a
rotação possa tentá-las
— evitando N-1 chamadas upstream com falha garantida (mesmo formato de #10460/#10525).
`rate_limit_exceeded` é incluído deliberadamente: no caminho do `markAccountUnavailable`
as regras específicas do opencode nunca correspondem (nenhum header/corpo entregue ao
`checkFallbackError`, opencode não está em `FULL_TEXT_RULE_PROVIDERS`), então um 429
cujo corpo carrega o texto de quota de assinatura ("monthly usage limit
reached") é classificado como `quota_exhausted` pelo fallback de texto de quota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown de 1h) antes
que a regra `status_429` seja sequer alcançada — enquanto um 429 sem texto de quota
(limitação de taxa simples) é classificado via a regra `status_429` como `rate_limit_exceeded`
e ainda assim coloca a família de IPs em cooldown. Para um provedor na allowlist, uma
limitação de taxa com bucketing por IP é o mesmo sinal que uma quota esgotada. Limites honestos:

- **Melhor esforço**: o lock resolve o último `egress_ip` conhecido da conexão
  a partir de `proxy_logs` (janela de 24h, síncrono, sem cache). Cache frio
  (IP de egress nunca sondado) ou nenhuma linha → a conexão com falha ainda
  entra em cooldown pelo branch (registrada como hoje), apenas nenhum sibling
  é bloqueado.
- **Nunca terminal**: o cooldown é uma janela de cota renovável
  (`testStatus: "unavailable"`); um estado permanente nunca é derivado de um
  sinal em nível de IP. Conexões `disableCooling` pulam o branch
  inteiramente.
- **A granularidade do lock muda para a família na allowlist**: esta é uma
  mudança de escopo, não apenas uma otimização de siblings. opencode é um
  provedor `passthroughModels`, então antes deste branch um 429 produzia um
  lockout por MODELO; agora ele produz um cooldown de conexão — inclusive
  para um operador rodando uma única conexão, sem nenhum sibling. Essa é a
  granularidade que a tabela de regras do opencode já declara como correta
  (`scope: "connection"`, `providerErrorRules.ts`), nunca honrada até agora
  porque opencode não está em `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. O branch
  grava ele mesmo o cooldown + `backoffLevel` da conexão com falha,
  espelhando o branch agentrouter com escopo de conexão, e retorna — o bloco
  por modelo e o caminho genérico abaixo nunca são alcançados.
- **Combo incluído**: como o branch agentrouter, o escopo ignora
  deliberadamente o downgrade `persistUnavailableState`/`isCombo` que um
  chamador combo aplica a um 429. Um lockout por modelo não é uma forma mais
  fraca deste escopo, é a unidade errada: ele não diz nada sobre o IP
  esgotado, então a rotação do combo continuaria queimando uma chamada com
  falha garantida por sibling.
- **Segurança do sibling**: um sibling já terminal
  (banido/credits_exhausted) ou já em um cooldown mais longo nunca é
  sobrescrito.
- **Allowlist exclusiva**: ampliar `EGRESS_BUCKETED_LOCK_PROVIDERS` é uma
  decisão explícita do owner; sem wiring genérico (padrão #10334/#10419). A
  query de siblings vincula essa mesma allowlist em vez de repeti-la como um
  literal SQL, então ampliá-la continua sendo uma mudança de uma linha.
- **Rotação de IP de egress, em ambas as direções**: a janela de busca (24h)
  é bem mais ampla que o TTL do cache de IP de egress (5 min), então o
  "último IP conhecido" é histórico, não estado atual. Se o proxy de uma
  conexão rotacionou dentro da janela, o lock pode **perder** um IP
  genuinamente compartilhado (o IP registrado é o novo, não esgotado) — e
  simetricamente pode **colocar em cooldown um sibling que desde então
  rotacionou para fora** do IP esgotado. O segundo caso custa a esse sibling
  uma janela de cooldown; ambos são limites aceitos, inerentes ao melhor
  esforço de uma busca baseada em histórico.
- **Custo**: duas varreduras limitadas de `proxy_logs` (filtradas pela janela
  via `idx_pl_timestamp`), apenas na frequência de 429. Nenhum índice novo
  (migração 134 YAGNI). Medido em uma cópia de BD com tráfego real de tamanho
  moderado; uma instância de alto throughput mantém proporcionalmente mais
  linhas na mesma janela.

---

## Outros Recursos de Resiliência

- **21 estratégias de roteamento** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — veja [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Roteamento sensível a reset** (v3.8.0) — prioriza conexões pelo horário de reset da cota.
- **Degradação do modo background** — o `background: true` da Responses API é degradado para síncrono com aviso.
- **Detecção dinâmica de limite de ferramentas** — aplica backoff aos provedores quando os limites de contagem de ferramentas são atingidos.
- **Fallback de emergência** — controlado por `OMNIROUTE_EMERGENCY_FALLBACK`; operadores podem sobrescrevê-lo na página Feature Flags sem reinicialização.

---

## Depuração

- O combo weighted responde `503 all_targets_cooling_down` (`Retry-After` definido, `diagnostics.excluded` lista todos os alvos com `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → o pool está configurado e conectado, todos os alvos estão apenas excluídos por um timer de resiliência; o aviso `[COMBO] Weighted selection: every target excluded before dispatch — …` indica os motivos e os segundos restantes. Um `404 no_executable_targets` do mesmo combo significa que nenhum timer de resiliência esteve envolvido (nada para executar, ou todas as contas falharam na sonda de disponibilidade). Construído em `open-sse/services/combo/pinRecovery.ts` a partir das exclusões coletadas em `targetResolution.ts`.
- Todas as chaves de um provedor ignoradas → verifique tanto o estado do circuit breaker QUANTO o `rateLimitedUntil`/`testStatus` de cada conexão.
- Provedor excluído permanentemente após a janela de reset → código lendo `state` bruto em vez de `getStatus()`/`canExecute()`.
- Uma chave falha, as outras deveriam funcionar → prefira o cooldown de conexão em vez do circuit breaker.
- Apenas um modelo falha → prefira o lockout de modelo em vez do cooldown de conexão.
- O estado deveria se autorrecuperar, mas não o faz → verifique se há timestamp no futuro + caminho de leitura que atualiza o estado expirado. Status permanentes exigem alterações manuais.

---

## Estado de runtime — referência rápida para o agente

> Movido verbatim de `AGENTS.md` → "Resilience Runtime State" (PR #12743) para que o guia
> do agente permaneça dentro do orçamento de contexto de 40k. É a visão condensada, voltada
> ao agente, das seções acima; as seções numeradas permanecem como a referência completa.

A OmniRoute tem três mecanismos de falha temporária relacionados, porém distintos. Mantenha
seus escopos separados ao depurar o comportamento de roteamento. Consulte o
[diagrama de resiliência de 3 camadas](../diagrams/exported/resilience-3layers.svg)
(fonte: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
para um mapa de visão rápida.

### Circuit breaker de provedor

**Escopo**: provedor inteiro, ex. `glm`, `openai`, `anthropic`.

**Propósito**: parar de enviar tráfego para um provedor que está falhando repetidamente no
nível upstream/serviço, para que um provedor não saudável não desacelere todas as requisições.

**Implementação**:

- Classe principal: `src/shared/utils/circuitBreaker.ts`
- Integração do gate/execução do chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de status de runtime: `src/app/api/monitoring/health/route.ts`
- Wrappers compartilhados: `open-sse/services/accountFallback.ts`
- Tabela de estado persistido: `domain_circuit_breakers`

**Estados** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: tráfego normal é permitido.
- `DEGRADED`: faixa de alerta antecipado — as falhas ultrapassaram o limiar de degradação,
  mas ainda não o limiar do breaker; o tráfego ainda flui, os dashboards exibem o aviso. Um
  teste de conexão válido ou uma janela tranquila sem novas falhas o retorna a `CLOSED`
  (o `docs/architecture/RESILIENCE_GUIDE.md` tem a janela).
- `OPEN`: o provedor está temporariamente bloqueado; os chamadores recebem uma resposta
  provider-circuit-open ou o roteamento de combo pula para outro alvo.
- `HALF_OPEN`: o timeout de reset decorreu; permite uma requisição de sonda. O sucesso fecha
  o breaker, a falha o abre novamente.

**Padrões** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, consumidos via
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` em `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` em `src/sse/handlers/chatHelpers.ts`). O breaker de
provedor inteiro opera com `circuitBreakerThreshold` / `circuitBreakerReset`:

| Perfil  | degrada em | abre em (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| ------- | ---------: | ----------------------------------: | ----------------------------: |
| OAuth   |        `5` |                                 `8` |                         `60s` |
| API key |        `7` |                                `12` |                         `30s` |
| Local   | (derivado) |                                 `2` |                         `15s` |

`PROVIDER_PROFILES` também define `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) e `providerCooldownMs` (5/10/1 min): eles alimentam o
**gate de janela do Provider Cooldown global opcional (opt-in)** (`PROVIDER_COOLDOWN_ENABLED`,
desativado por padrão) — uma entrada em nível de provedor em
`open-sse/services/providerCooldownTracker.ts` só conta como em cooldown após
`providerFailureThreshold` falhas dentro de `providerFailureWindowMs`, e então permanece em
cooldown por `providerCooldownMs`. Eles NÃO são os limiares do breaker ativo — não os ajuste
esperando comportamento do breaker. Cada padrão pode ser sobrescrito pelas variáveis de
ambiente `OMNIROUTE_PROVIDER_BREAKER_*` e `OMNIROUTE_CIRCUIT_BREAKER_*`; a tabela de
referência precisa do runtime está em `docs/architecture/RESILIENCE_GUIDE.md`.

Apenas status de falha em nível de provedor devem disparar o breaker de provedor:

```ts
(408, 500, 502, 503, 504);
```

Não dispare o breaker de provedor inteiro para erros normais de conta/chave/modelo, como a
maioria dos casos `401`, `403` ou `429`. Esses geralmente pertencem ao cooldown de conexão
ou ao lockout de modelo. Um `403` de um provedor genérico de chave de API deve ser
recuperável, a menos que seja classificado como um erro terminal de provedor/conta.

O breaker usa recuperação lazy, não um timer em segundo plano. Quando `OPEN` expira, leituras como `getStatus()`, `canExecute()` e `getRetryAfterMs()` atualizam o estado para `HALF_OPEN`, para que dashboards e construtores de candidatos de combo não continuem excluindo indefinidamente um provedor expirado.

### Cooldown de Conexão

**Escopo**: uma conexão/conta/chave de provedor.

**Finalidade**: ignorar temporariamente uma chave/conta problemática enquanto permite que outras conexões do mesmo provedor continuem atendendo requisições.

**Implementação**:

- Caminho de escrita/atualização: `src/sse/services/auth.ts::markAccountUnavailable()`
- Seleção/filtragem de contas: `src/sse/services/auth.ts::getProviderCredentials...`
- Cálculo de cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Configurações: `src/lib/resilience/settings.ts`

Campos importantes nas conexões de provedor:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Durante a seleção de conta, uma conexão é ignorada enquanto:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Os cooldowns também são lazy: quando `rateLimitedUntil` está no passado, a conexão volta a ser elegível. Em uso bem-sucedido, `clearAccountError()` limpa `testStatus`, `rateLimitedUntil`, campos de erro e `backoffLevel`.

Comportamento padrão do cooldown de conexão:

- Cooldown base para OAuth: `5s`.
- Cooldown base para chave de API: `3s`.
- Para chave de API, `429` deve priorizar dicas de retry do upstream (`Retry-After`, cabeçalhos de reset ou texto de reset interpretável) quando disponíveis.
- Falhas recuperáveis repetidas usam backoff exponencial:

```ts
baseCooldownMs * 2 ** failureIndex;
```

A proteção anti-thundering-herd impede que falhas concorrentes na mesma conexão estendam repetidamente o cooldown ou incrementem `backoffLevel` em dobro.

Estados terminais não são cooldowns. `banned`, `expired` (que se torna terminal somente após N tentativas limitadas via `EXPIRED_RETRY_MAX`) e `credits_exhausted` devem permanecer indisponíveis até que credenciais/configurações mudem ou um operador os redefina. Não sobrescreva estados terminais com estado de cooldown transitório.

### Bloqueio de Modelo

**Escopo**: provedor + conexão + modelo.

**Finalidade**: evitar desabilitar uma conexão inteira quando apenas um modelo está indisponível ou limitado por cota para aquela conexão.

Exemplos:

- Provedores com cota por modelo retornando `429`.
- Provedores locais retornando `404` para um modelo ausente.
- Falhas de permissão de modo/modelo específicas do provedor, como modos Grok selecionados.

O bloqueio de modelo fica em `open-sse/services/accountFallback.ts` e permite que a mesma conexão continue atendendo outros modelos.

### Orientações de Depuração

- Se todas as chaves de um provedor forem ignoradas, inspecione tanto o estado do breaker do provedor quanto o `rateLimitedUntil`/`testStatus` de cada conexão.
- Se um provedor parecer permanentemente excluído após a janela de reset, verifique se o código está lendo `state` bruto em vez de usar `getStatus()`/`canExecute()`.
- Se uma chave de provedor falhar, mas outras deveriam funcionar, prefira cooldown de conexão em vez de breaker de provedor.
- Se apenas um modelo falhar, prefira bloqueio de modelo em vez de cooldown de conexão.
- Se um estado deve se recuperar sozinho, ele deve ter um timestamp futuro/timeout de reset e um caminho de leitura que atualize estados expirados. Status permanentes exigem alterações manuais de credenciais ou configuração.

---

## TLS Fingerprinting e Stealth

O stealth específico de cada provider (JA3/JA4, CCH, ofuscação) está documentado separadamente — consulte `docs/security/STEALTH_GUIDE.md` (git; não compilado em `/docs`).

---

## Testes de resiliência (Fase 8 · Bloco C)

Além dos testes unitários para a lógica de resiliência, três testes exercitam o runtime sob
condições reais de estresse/falha (todos de integração/nightly — nenhum bloqueia PRs):

| Teste       | O que faz                                                                                                                                                                      | Execução                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| Chaos       | O nó de fake-upstream injeta latência/reset/timeout/503 reais; valida que o circuit breaker abre/recupera e que `checkFallbackError` classifica 503 como fallback recuperável. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 streams por `createSSEStream` sob `--expose-gc`; falha se o heap crescer além do teto (proteção contra OOM #3069).                                                        | `npm run test:heap`                      |
| k6 soak     | Carga sustentada contra `/api/monitoring/health`; limites de p95/erro.                                                                                                         | `k6 run tests/load/k6-soak.js` (nightly) |

Orquestrado por `.github/workflows/nightly-resilience.yml` (cron + dispatch). No
`test:integration` padrão, chaos e heap se auto-ignoram (sem `RUN_CHAOS_INT`/`--expose-gc`).

---

## Veja também

- [Architecture Guide](./ARCHITECTURE.md) — Arquitetura do sistema e internos
- [User Guide](../guides/USER_GUIDE.md) — Providers, combos, integração com CLI
- [Auto-Combo Engine](../routing/AUTO-COMBO.md) — Pontuação de 16 fatores, mode packs
