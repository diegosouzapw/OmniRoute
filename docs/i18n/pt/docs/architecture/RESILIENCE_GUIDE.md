# Resilience Guide (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

O OmniRoute tem três mecanismos de resiliência distintos, mas relacionados. Cada um tem um âmbito e uma finalidade diferentes. Mantenha-os separados ao depurar o comportamento do encaminhamento.

![Modelo de resiliência de 3 camadas](../diagrams/exported/resilience-3layers.svg)

> Fonte: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Circuit Breaker do fornecedor

**Âmbito:** fornecedor completo (por exemplo, `glm`, `openai`, `anthropic`).

**Finalidade:** deixar de enviar tráfego para um fornecedor que esteja a falhar repetidamente ao nível do serviço/upstream.

**Implementação:**

- Classe principal: `src/shared/utils/circuitBreaker.ts`
- Integração: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de estado: `GET /api/monitoring/health`
- API de reposição: `POST /api/resilience/reset`
- Wrappers: `open-sse/services/accountFallback.ts`
- Tabela da BD: `domain_circuit_breakers`

**Estados:**

- `CLOSED` — tráfego normal permitido
- `DEGRADED` — o tráfego continua a ser permitido, mas estão a ser monitorizadas falhas elevadas do fornecedor
- `OPEN` — fornecedor temporariamente bloqueado; o encaminhamento combo ignora-o
- `HALF_OPEN` — o tempo limite de reposição terminou; é permitido um pedido de teste

**Predefinições configuráveis (`open-sse/config/constants.ts`, expostas em Painel → Definições → Resiliência):**

| Classe       | Degradado após | Abre após | Tempo limite de reposição |
| ------------ | -------------- | --------- | ------------------------- |
| OAuth        | 5 falhas       | 8 falhas  | 60s                       |
| Chave de API | 7 falhas       | 12 falhas | 30s                       |
| Local        | derivado       | 2 falhas  | 15s                       |

`degradationThreshold` controla quando um fornecedor entra no estado `DEGRADED`; `failureThreshold` controla quando este abre e é ignorado. Os perfis de fornecedores locais ainda não estão expostos na página de definições de Resiliência.

**Códigos de disparo:** apenas estados ao nível do fornecedor `[408, 500, 502, 503, 504]`. NÃO disparar para erros ao nível da conta (a maioria dos 401/403/429 — estes pertencem ao período de espera ou ao bloqueio).

**Recuperação diferida:** quando `OPEN` expira, `getStatus()`, `canExecute()` e `getRetryAfterMs()` atualizam o estado para `HALF_OPEN`. Não é necessário qualquer temporizador em segundo plano.

---

### Período de espera global opcional do fornecedor (controlo por janela)

Uma quarta camada **opcional** (`PROVIDER_COOLDOWN_ENABLED`, desativada por predefinição) mantém uma
memória entre pedidos dos fornecedores com falhas em
`open-sse/services/providerCooldownTracker.ts`, consultada pela resolução de destinos
combo para que pedidos combo consecutivos deixem de voltar a percorrer um fornecedor que acabou de
falhar. As entradas ao nível do fornecedor respeitam o controlo por janela `PROVIDER_PROFILES`:

| Perfil       | dispara após (`providerFailureThreshold`) | dentro de (`providerFailureWindowMs`) | arrefece durante (`providerCooldownMs`) |
| ------------ | ----------------------------------------: | ------------------------------------: | --------------------------------------: |
| OAuth        |                                      `10` |                               `15min` |                                  `5min` |
| Chave de API |                                      `15` |                               `30min` |                                 `10min` |

Abaixo do limiar, o fornecedor **não** é considerado em período de espera; um sucesso limpa
a janela. Em alternativa, as entradas ao nível da ligação (`provider:connectionId`) mantêm o
backoff exponencial `minRetryCooldownMs → maxRetryCooldownMs`. Substituições:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Proteção contra regressões: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Período de espera da ligação

**Âmbito:** uma única ligação/conta/chave de fornecedor.

**Objetivo:** ignorar uma chave com problemas enquanto outras ligações do mesmo fornecedor continuam a servir pedidos.

**Implementação:**

- Marcar como indisponível: `src/sse/services/auth.ts::markAccountUnavailable()`
- Seleção: `getProviderCredentials*` no mesmo ficheiro
- Cálculo do período de espera: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Definições: `src/lib/resilience/settings.ts`

**Campos por ligação:**

- `rateLimitedUntil` — carimbo de data/hora até o período de espera expirar
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — contador de recuo exponencial

**Períodos de espera predefinidos:**

- Base para OAuth: 5s
- Base para chave de API: 3s
- Chave de API com 429: dá preferência a cabeçalhos `Retry-After`/de reposição do serviço a montante/texto de reposição analisável
- Recuo: `baseCooldownMs * 2 ** failureIndex`

**Proteção contra avalanches de pedidos:** impede que falhas simultâneas prolonguem excessivamente o período de espera ou incrementem `backoffLevel` duas vezes.

**Estados terminais (NÃO são períodos de espera):**

- `banned` — definido pela deteção de palavras-chave de banimento/banimento de conta (consulte [BAN_DETECTION](../security/BAN_DETECTION.md)) e por três recusas consecutivas por pedido do serviço a montante (`request_rejected`, por exemplo, Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); uma única recusa apenas coloca a ligação em período de espera
- `expired` (transita para terminal após um número limitado de novas tentativas — `EXPIRED_RETRY_MAX = 3` com recuo exponencial — para que erros OAuth transitórios possam resolver-se automaticamente antes de a conta ser desativada permanentemente)
- `credits_exhausted`

Estes persistem até as credenciais serem alteradas ou um operador os repor. Não substitua estados terminais por um estado transitório de período de espera.

**Recuperação diferida:** quando `rateLimitedUntil` já tiver passado, a ligação volta a ser elegível. Após uma utilização bem-sucedida, `clearAccountError()` limpa todos os campos de erro.

### Afinidade de sessão (#7274)

**Âmbito:** uma sessão de cliente (`X-Session-Id` / `x-codex-session-id` / cabeçalho `x-omniroute-session`) associada a uma ligação, para **qualquer** fornecedor.

**Objetivo:** manter um agente com vários turnos (Claude Code, aider, agentes personalizados) na mesma conta entre pedidos, reduzindo a perda de contexto entre contas e os 429 repetidos de arranque a frio em fornecedores com estado de sessão por conta.

**Implementação:**

- Resolução do TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Seleção/criação da associação: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extração do cabeçalho (genérica, para qualquer fornecedor): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabela de associações persistentes: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Definição: `sessionAffinityTtlMs` (TTL global em ms, `0` desativa) — `src/lib/db/settings.ts`. O nome foi alterado de `codexSessionAffinityTtlMs`, específico do Codex, pela migração `124_generic_session_affinity_ttl.sql`, que transfere qualquer TTL do Codex configurado anteriormente como a nova predefinição.

Antes da #7274, `resolveSessionAffinityTtlMs()` devolvia imediatamente `0` para todos os fornecedores, exceto `codex`, pelo que a definição de TTL (e os cabeçalhos de sessão) não produzia qualquer efeito nos restantes, apesar de o mecanismo de associação e a extração de cabeçalhos já serem independentes do fornecedor. A correção removeu esse retorno antecipado; o TTL aplica-se agora uniformemente a todos os fornecedores assim que for definido globalmente com um valor superior a `0`.

Os três cabeçalhos de afinidade de sessão nunca são reencaminhados para o serviço a montante — os executores constroem os seus próprios cabeçalhos do zero, em vez de passarem os cabeçalhos do cliente, pelo que isto permanece apenas um ID de correlação interno.

### Concessões exclusivas de ligações de sessões geridas

**Âmbito:** um cliente/sessão HTTP gerido ativo detém uma ligação OmniRoute elegível.

**Objetivo:** proporcionar a propriedade exclusiva e duradoura de uma ligação para clientes que necessitem de uma barreira rígida de encaminhamento
entre pedidos. Isto difere da afinidade de sessão, que constitui uma preferência de continuidade flexível:
uma concessão exclusiva mantém o estado do ciclo de vida no SQLite, impõe a unicidade global do proprietário
ativo e da ligação ativa e rejeita uma geração obsoleta antes do envio para o fornecedor.

A funcionalidade é opcional para cada chave de API. Uma chave gerida tem de possuir o âmbito `lease:exclusive` e uma
lista `allowedConnections` explícita e não vazia. Qualquer cliente HTTP pode utilizar o endpoint do ciclo de vida; não é
necessário qualquer nome de cliente, agente do utilizador, fornecedor, método OAuth ou modelo. A concessão detém uma ligação,
não um modelo, pelo que uma alteração de modelo mantém a associação enquanto a ligação continuar normalmente
elegível. As regras normais de modelo, quota, estado, período de espera e lista de permissões continuam a ser determinantes e podem
fazer a mesma geração transitar para outra ligação livre e elegível.

O ciclo de vida utiliza `POST /api/v1/session-leases` com as ações JSON `acquire`, `renew` e `release`.
Os pedidos de inferência geridos apresentam o valor opaco `X-OmniRoute-Lease-Owner` e o valor exato
`X-OmniRoute-Lease-Generation`. O proprietário utiliza `vlo_` seguido de 43 caracteres base64url; apenas
o respetivo hash SHA-256 é armazenado. Cada barreira de envio final associa também o ID da chave de API autenticada e
o ID da ligação ativa. Os cabeçalhos de controlo da concessão são removidos dos registos, dos instantâneos de pedidos retidos e dos
cabeçalhos do executor a montante.

Se o encaminhamento normal tiver candidatos geridos elegíveis, mas todos os candidatos livres estiverem ocupados por uma
concessão ativa de terceiros, o OmniRoute devolve HTTP `429`, o código de capacidade de concessão indisponível, um
estado de espera por capacidade e um `Retry-After` limitado, derivado da expiração relevante mais próxima.
A ausência normal de elegibilidade não constitui contenção de concessões e mantém a semântica existente dos erros de encaminhamento.

Os mecanismos relacionados permanecem separados:

- A ocupação de sessões OAuth é uma distribuição flexível de contas OAuth, local ao processo.
- Os semáforos de conta concedem permissões de simultaneidade de pedidos e terminam quando um pedido é concluído.
- As concessões exclusivas de sessões geridas constituem propriedade duradoura do ciclo de vida com uma barreira de geração.

---

## 3. Bloqueio de modelos

**Âmbito:** triplo fornecedor + ligação + modelo.

**Âmbito da chave por estado:** o estado da falha determina em que chave é escrito um bloqueio
(`resolveLockoutScope()` em `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — um sinal de quota ou direito de acesso — bloqueiam a **família de quota**:
  para o codex, todo o âmbito `codex` / `spark` (todos os modelos `gpt-5*` da
  ligação); para outros fornecedores, `getQuotaScopedModelForProvider()`.
- `404` bloqueia apenas o modelo (`getModelLockKey()` restringe `not_found`).
- Qualquer outro estado — falhas de transporte/servidor `5xx` e o `502`
  sintetizado pelo próprio OmniRoute na validação de qualidade — bloqueia apenas
  o tuplo **exato** de fornecedor/ligação/modelo. Um fluxo defeituoso num modelo
  não constitui prova sobre a quota da conta; antes desta regra, uma resposta
  vazia em `codex/gpt-5.6-luna` removia todos os modelos `gpt-5*` dessa ligação
  do encaminhamento durante 2–30 min (com agravamento progressivo), embora a
  respetiva quota não tivesse sido afetada.
- Uma opção `scope` explícita do autor da chamada tem sempre precedência (o Antigravity transmite `"exact"`).

**Objetivo:** evitar desativar uma ligação inteira quando apenas um modelo está indisponível ou limitado pela quota.

**Exemplos:**

- Fornecedores com quota por modelo que devolvem 429
- Fornecedores locais que devolvem 404 para um modelo em falta
- Falhas de permissão específicas do fornecedor para um modo/modelo (por exemplo, modos do Grok)

**Implementação:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Painel de períodos de suspensão dos modelos (v3.8.0)

IU: Definições → Períodos de suspensão dos modelos (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Apresenta os bloqueios ativos com: fornecedor, ligação, modelo, motivo, expiresAt. Os operadores podem reativar manualmente um modelo a partir do cartão.

**API REST:**

- `GET /api/resilience/model-cooldowns` — listar bloqueios ativos
- `DELETE /api/resilience/model-cooldowns` — reativação manual. Corpo: `{provider, connection, model}`. Autenticação: gestão.

### IU das definições de bloqueio + recuperação por redução após sucesso (v3.8.23)

O bloqueio de modelos deixou de ser um comportamento codificado e sempre ativo,
passando a ser uma funcionalidade totalmente configurável e opcional, com o seu
próprio cartão de definições e um mecanismo de recuperação autorreparável.

**Cartão de definições:** Definições → Bloqueio de modelos
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Este é **distinto** do `ModelCooldownsCard` só de leitura acima (que apenas
_lista_ os bloqueios ativos) — o novo cartão _configura os parâmetros_. Os valores
predefinidos encontram-se em `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Definição               | Predefinição                     | Significado                                                                      |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Controlo principal — o bloqueio de modelos está **desativado por predefinição**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Estados do serviço a montante que contam como uma falha ao nível do modelo.      |
| `baseCooldownMs`        | `120_000` (120 s)                | Duração inicial do bloqueio para a primeira falha.                               |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Limite máximo do período de suspensão agravado.                                  |
| `maxBackoffSteps`       | `10`                             | Número máximo de passos de agravamento do recuo exponencial.                     |
| `useExponentialBackoff` | `true`                           | Indica se as falhas repetidas agravam exponencialmente o período de suspensão.   |

As definições são persistidas através do armazenamento normal de definições e
validadas através do esquema de definições de resiliência; o cartão limita
`baseCooldownMs`/`maxCooldownMs` (com `maxCooldownMs ≥ baseCooldownMs`) e
`maxBackoffSteps`.

**Recuperação por redução após sucesso:** a recuperação **não** depende apenas
da expiração do temporizador. Uma resposta válida reduz progressivamente a
contagem de falhas do modelo, permitindo que um modelo que tenha recuperado
durante o intervalo deixe de agravar o bloqueio (e o elimine) antes de o
temporizador expirar. Quando um alvo combinado é bem-sucedido,
`open-sse/services/combo.ts` chama `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), que reduz para **metade** o
`failureCount` armazenado (`Math.floor(failureCount / 2)`); quando este chega a
`0`, a entrada de bloqueio é totalmente eliminada. A função correspondente
`recordModelLockoutFailure()` incrementa a contagem (e agrava o período de
suspensão) quando ocorrem falhas dentro do intervalo de agravamento. Esta redução
após sucesso complementa a simples expiração do temporizador — qualquer um dos
mecanismos pode reativar um modelo.

**Estado:** os bloqueios são mantidos **em memória** (`Map`s por processo de
`ModelLockoutEntry`, indexados por `provider:connectionId:model`; os bloqueios de
âmbito exato são indexados por `provider:connectionId:exact:model`) e não são
persistidos na base de dados — perdem-se ao reiniciar. As _definições_ são
persistidas; o _estado_ dos bloqueios ativos é efémero.

---

## 4. Controlo de concorrência da partilha de quota (v3.8.36)

As contas de subscrição (GLM, MiniMax, etc.) aceitam frequentemente apenas ~1–3 pedidos
simultâneos; exceder esse limite provoca erros 429 e períodos de espera. Isto é especialmente problemático em
combinações de **partilha de quota** (`qtSd/…`), nas quais várias chaves de API partilham uma única conta
a montante. Três camadas impedem que uma conta partilhada seja sobrecarregada.

### Limite de concorrência por ligação (`max_concurrent`)

Cada ligação de fornecedor pode declarar um limite máximo `max_concurrent`
(`provider_connections.max_concurrent`, definido na janela modal da ligação / API / BD).
Deixe-o vazio para não aplicar qualquer limite. Este é o único parâmetro que controla a camada de serialização
abaixo — defina-o com a concorrência real da conta (por exemplo, GLM ~1, MiniMax ~2).

### Serialização de pedidos de partilha de quota

Quando um encaminhamento de partilha de quota visa uma ligação que declara um valor positivo de
`max_concurrent`, os pedidos simultâneos para essa **conta** são serializados através de um
semáforo por ligação (chave `qsconn:<connectionId>`): os pedidos excedentes **aguardam na
fila** em vez de sobrecarregarem a conta. O mecanismo é **fail-open** — se a fila estiver saturada
ou ocorrer um tempo limite, o pedido prossegue sem uma vaga, em vez de alguma vez rejeitar um pedido
que possa ser encaminhado. Alterne esta opção em **Definições → Resiliência → Concorrência por ligação
da partilha de quota** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ativada
por predefinição). Sem um limite `max_concurrent`, o comportamento permanece inalterado.

> O mecanismo de encaminhamento da partilha de quota (`selectQuotaShareTarget`, DRR + P2C) também é
> fail-open e apenas atribui _menor prioridade_ a uma ligação que tenha atingido o limite — com um
> conjunto de uma única ligação, não pode impor um limite rígido, pelo que é este semáforo que efetivamente
> contém a sobrecarga.

### Nova tentativa sensível ao período de espera das combinações

Para cada estratégia de combinação (quando ativada), um pedido que consolidaria um erro 429
devido a um BREVE período de espera transitório aguarda que este termine e é novamente encaminhado, em vez de
devolver o erro 429 — isto abrange janelas TPM/RPM semelhantes às do Gemini (~60 s de retry-after)
em combinações com vários modelos, por exemplo, quando ambos os destinos de uma combinação de 2 modelos atingem um limite de
taxa por modelo. Limitado por `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) em **Definições → Resiliência**. Nunca aguarda por `quota_exhausted`
(bloqueado até à meia-noite) nem por motivos de autenticação/recurso não encontrado.

---

## 5. Controlo de admissão da fila de pedidos (v3.8.49 · problema #6593)

**Âmbito**: a fila local de limitação de taxa por fornecedor+ligação (`open-sse/services/rateLimitManager.ts`,
suportada pelo Bottleneck), uma camada abaixo dos três mecanismos anteriores.

**`maxWaitMs` é um nome persistido legado para a expiração da execução.**
`resilienceSettings.requestQueue.maxWaitMs` é passado ao Bottleneck como a
`expiration` de uma tarefa, cujo temporizador só começa após o encaminhamento. Por conseguinte, limita
a execução gerida pelo limitador, e não o tempo passado na fila local. A expiração é
apresentada como o erro local fidedigno `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504);
o antigo nome de código de tempo limite da fila só é aceite para retrocompatibilidade
interna fidedigna. A predefinição é 15000ms; substitua-a através de
`RATE_LIMIT_MAX_WAIT_MS` (variável de ambiente) ou do painel (**Definições → Resiliência**,
limite da interface de 1–30000ms). A permanência na fila não tem qualquer prazo limite; utilize
`maxQueueDepth` abaixo para limitar os pedidos em fila.

**`maxQueueDepth` — limite de admissão opcional (novo).** `resilienceSettings.requestQueue.maxQueueDepth`
limita quantos pedidos podem permanecer em fila (ainda não encaminhados) para uma
combinação de fornecedor+ligação em simultâneo. Quando a fila já contém `maxQueueDepth`
pedidos, um novo pedido é rapidamente rejeitado com um erro tipificado
`code: "RATE_LIMIT_QUEUE_FULL"` **antes** de alguma vez chegar a `limiter.schedule()`
— deste modo, a rejeição tem um baixo custo e ocorre antes de qualquer trabalho subsequente de
compressão/tradução do prompt para esse pedido. Predefinição `0` =
desativado, preservando o comportamento existente de fila sem limite; limitado a 0–100000.
Substitua através de `RATE_LIMIT_MAX_QUEUE_DEPTH` (variável de ambiente) ou
`resilienceSettings.requestQueue.maxQueueDepth` (correção através do painel/API).

A própria verificação de admissão é uma função pura
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), pelo que
pode ser testada unitariamente sem um limitador Bottleneck real.

> O RFC que deu origem ao problema #6593 também propôs um sinalizador `bypassCompressionOnRateLimit`.
> O pipeline `open-sse/services/compression/` deste repositório efetua a
> compressão do prompt/contexto no pedido LLM de saída (`chatCore.ts`,
> em torno do bloco `resolveCompressionSettings`/`selectCompressionStrategy`),
> e não a compressão de respostas HTTP em corpos 429 sintetizados — não existe
> um caminho de código correspondente para um sinalizador de omissão literal. Esse passo de compressão do prompt
> também é atualmente executado _antes_ de `withRateLimit()` no pipeline de pedidos, pelo que
> reordená-lo para o ignorar aquando de uma rejeição por fila cheia constitui uma alteração separada e de maior
> dimensão do que o âmbito deste problema; **não** foi intencionalmente implementado
> aqui e fica como tarefa de acompanhamento, caso a poupança de CPU justifique o
> risco da reordenação.

---

## 6. Watchdog de débito de fluxos lentos (#9709)

A proteção opcional `resilienceSettings.streamRecovery.throughputWatchdog` deteta
um upstream que continua a enviar blocos, mas que produz conteúdo do assistente abaixo
da taxa configurada de conteúdo útil. É deliberadamente distinta do tempo limite de inatividade:
os heartbeats e os metadados não reiniciam nenhum dos temporizadores nem contam como progresso. É também
distinta do prazo rígido da tentativa (#9153), que continua a ser um limite de segurança
absoluto, independentemente da qualidade do conteúdo.

O watchdog requer um período de aquecimento, seguido de uma janela deslizante completa, antes
de poder abortar. Contabiliza deltas de texto provenientes de eventos de saída das APIs Chat Completions
e Responses (uma aproximação conservadora baseada em bytes UTF-8), ignora eventos vazios e eventos
que contenham apenas utilização, e suspende a avaliação enquanto estiverem em curso eventos de chamada
de ferramentas ou de raciocínio. Está desativado por predefinição e pode ser ativado com
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; a janela, o aquecimento, a taxa mínima e o volume
mínimo mensurável de saída são limitados pela camada normal de normalização das definições de resiliência.

Quando ativado, um aborto pelo watchdog aplica-se apenas à tentativa upstream ativa. Antes
de quaisquer bytes ficarem visíveis para o cliente, o caminho existente de recuperação antecipada
na mesma conta pode reabrir a tentativa. Após a confirmação, o fluxo nunca é repetido cegamente;
apenas o contrato existente de continuação segura a meio do fluxo pode anexar um sufixo. A finalização
continua a ocorrer uma única vez, pelo que a contabilização da utilização e a libertação do semáforo
não são duplicadas.

---

## 7. Retificação do estado upstream (erros de quota com estado incorreto)

**Âmbito:** um gateway upstream que comunica o esgotamento temporário da quota com o estado HTTP incorreto.

**Objetivo:** corrigir um estado enganador ANTES da classificação, para que os consumidores downstream (motor de fallback, agregação de combinações e resposta apresentada ao cliente) reconheçam a verdadeira natureza repetível da falha.

Alguns gateways assinalam o esgotamento TEMPORÁRIO da quota com um estado HTTP
não repetível. `agentrouter.org` devolve `403` (por vezes `400`) com um corpo em chinês
(`用户额度不足` / `额度不足`) em vez do `429` padrão. Clientes como o Claude
Code tratam `403` como permanente e abortam a sessão e, sem correção,
o motor de fallback classificá-lo-ia como `AUTH_ERROR` em vez de um evento
de quota.

**Implementação:**

- Registo + correspondência: `open-sse/config/upstreamStatusRestatement.ts` — uma
  lista de regras por fornecedor (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), com correspondência efetuada através de `applyStatusRestatement()`.
- Ponto de chamada: o bloco `providerFailure:` em `open-sse/handlers/chatCore.ts`
  (por volta da linha 3654), imediatamente após `parseUpstreamError()` analisar uma resposta
  upstream com um estado HTTP de erro (`!providerResponse.ok`) e antes de ser executada qualquer
  classificação, para que todos os consumidores downstream vejam o estado corrigido.
  Os erros incorporados num fluxo SSE `200` seguem um caminho separado e posterior
  de análise do fluxo e **não** são atualmente abrangidos por este hook — uma
  limitação conhecida, que ainda não é necessária para o estado incorreto do agentrouter
  (que se manifesta como um estado HTTP de erro).
- Elegibilidade para nova tentativa: `429` está incluído em `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), pelo que um erro retificado
  inclui uma janela de repetição real, em vez de ser apresentado como um `403` inerte.
- O `defaultRetryAfterMs` sintético de `60s` (`upstreamStatusRestatement.ts`)
  corresponde apenas ao que a resposta retificada comunica ao **cliente**; não corresponde,
  por si só, à duração interna do cooldown/bloqueio da ligação — esta é controlada
  separadamente pelo mecanismo que processar efetivamente o erro retificado
  (o backoff crescente do Connection Cooldown, §2, com uma base de `3s` para
  fornecedores de chaves de API; ou o Model Lockout, §3, para fornecedores com quota
  por modelo, como o agentrouter). O router pode tornar-se internamente elegível para
  uma nova tentativa antes da janela de 60s que anuncia ao cliente — trata-se de uma
  margem intencional, não de um erro.

Os erros permanentes (`无权访问模型` do agentrouter — sem acesso a este modelo)
NUNCA são retificados: `excludeMarkers` veta a regra mesmo quando há correspondência
com `textMarkers`, pelo que o erro mantém o respetivo estado original e nada o repete
indefinidamente. A regra de classificação do fornecedor correspondente
(`agentrouter-model-access-denied` em `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, um cooldown base declarado de `6h`) é
consultada por `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_antes_ do retorno antecipado genérico `FORBIDDEN` da categoria apikey, condicionado por
`honorsRuleLockScope(provider)` (#10334 — atualmente exclusivo do agentrouter através
da lista de permissões `HONORS_RULE_LOCK_SCOPE_PROVIDERS` em
`providerErrorRules.ts`). O cooldown de 6h declarado pela regra é propagado como
`fallbackResult.baseCooldownMs`, mas continua a alimentar o caminho preexistente
de bloqueio de quota por modelo (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, inalterado pelo #10334 exceto quanto à origem do cooldown):
é limitado ao máximo definido pelo operador em `mlSettings.maxCooldownMs`
(predefinição de `1_800_000ms` / 30min), tal como qualquer outro bloqueio de modelo, e o
_motivo de bloqueio persistido_ continua a ser o valor preexistente codificado diretamente
`"forbidden"`, e não o `"auth_error"` da regra — apenas a duração do cooldown é respeitada
de ponta a ponta, não a cadeia do motivo. A própria ligação permanece ativa;
os modelos irmãos na mesma ligação não são afetados.

Os erros de quota reformulados (`额度不足`) correspondem a uma regra de fornecedor em produção
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, sem um cooldown próprio declarado — aplica-se a predefinição
de backoff escalonado da camada de persistência). Desde a #10334, o `scope` em
`ProviderErrorRuleMatch` É utilizado de ponta a ponta, mas **apenas** para os fornecedores
na allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
atualmente apenas `"agentrouter"`, condicionado através de `honorsRuleLockScope()`). Para todos
os outros fornecedores, o `scope` continua a ser informativo, exatamente como antes da #10334.
`checkFallbackError` expõe o âmbito da regra correspondente como
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) é a proteção partilhada que confirma que um
`ruleScope` é realmente seguro para ser respeitado como um sinal autorrecuperável
ao nível de toda a ligação (âmbito `"connection"`, motivo `quota_exhausted`, nunca
`permanent`, nunca `creditsExhausted` — uma defesa contra uma futura regra que associe o âmbito
`"connection"` a um estado permanente da conta). É chamado por dois consumidores:

- **Persistência** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  em vez de entrar no ramo de bloqueio **por modelo** do fornecedor passthrough
  (o agentrouter tem `passthroughModels: true` → `hasPerModelQuota()`
  devolve `true`), aplica um **cooldown temporário da ligação** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nunca um estado terminal
  (`credits_exhausted`/`banned`/`expired`) — para que a ligação recupere
  automaticamente assim que o cooldown terminar, em vez de exigir uma reposição manual das credenciais.
  Isto é ignorado para ligações com `disableCooling: true` (#2997): essa opção de exclusão
  recorre antes ao bloqueio por modelo (uma contrapartida documentada —
  consulte o comentário no código acima do ramo).
- **Encaminhamento combinado no mesmo pedido** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): a mesma proteção adiciona a
  ligação ao conjunto `exhaustedConnections` em memória, indexado por
  `${provider}:${connectionId}`. Isto apenas ignora um destino restante do MESMO PEDIDO
  que _já contenha exatamente esse `connectionId`_ no seu próprio
  objeto de destino (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` antes da consulta de `exhaustedConnections`) — uma combinação simples
  de listas de modelos, em que os destinos irmãos não contêm um `connectionId` fixado
  próprio e este apenas é resolvido em cada despacho a partir do cabeçalho
  `X-OmniRoute-Selected-Connection-Id` da resposta, nunca corresponde a essa chave. Nesse
  caso comum, a proteção real contra a reutilização, por uma etapa restante, da
  conta que acabou de se esgotar NÃO é este conjunto — é a camada de persistência acima
  (o `rateLimitedUntil` da ligação está agora no futuro), em conjunto com
  esta mesma proteção a suprimir `transientRateLimitedProviders` para a
  falha (consulte "Conceção em duas fases" e o comentário no código relativo ao
  ramo `isAgentrouterConnectionQuotaScope` em `targetExhaustion.ts`): como
  esse conjunto não é marcado, a permissão forçada `allowRateLimitedConnection`
  de `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NÃO
  é ativada para as restantes etapas do fornecedor, pelo que o filtro
  `rateLimitedUntil` da seleção de credenciais (`src/sse/services/auth.ts:1238`)
  é respeitado normalmente, e uma etapa restante seleciona outra ligação
  agentrouter ainda elegível ou falha por não existirem credenciais disponíveis —
  não força a reutilização da ligação que este ramo acabou de colocar em cooldown.

### Conceção em duas fases: reformulação do estado e, em seguida, classificação

A reformulação do estado (`upstreamStatusRestatement.ts`) e as regras de
classificação dos fornecedores (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) são registos separados que utilizam como chave o identificador do fornecedor
e marcadores de texto, mas são executados em locais diferentes e têm finalidades
diferentes: a reformulação reescreve antecipadamente o estado HTTP em `chatCore.ts`;
as regras de classificação selecionam o `reason` de fallback e o `scope` de bloqueio
(`model` / `provider` / `connection`) dentro de `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

As regras de classificação apenas veem o **texto** completo do erro (necessário para
corresponder a marcadores do corpo como `额度不足`) para fornecedores incluídos na allowlist
`FULL_TEXT_RULE_PROVIDERS` em `providerErrorRules.ts` — atualmente apenas
`"agentrouter"`. Para todos os outros fornecedores do **catálogo integrado**,
`checkFallbackError` fornece a `getProviderErrorRuleMatch` apenas o erro estruturado
(`{code, type}`), o que é suficiente para regras baseadas em cabeçalhos/estado/código,
mas não permite detetar marcadores no texto do corpo. O auxiliar
`resolveRuleMatchBody()` efetua esta seleção: o texto completo do erro para
fornecedores incluídos na allowlist e, caso contrário, o erro estruturado. Adicionar
um fornecedor **integrado** a `FULL_TEXT_RULE_PROVIDERS` constitui uma adesão explícita
por fornecedor — existe para que o caminho predefinido de todos os fornecedores que não
constam da lista permaneça inalterado byte por byte.

O `scope` de uma regra (`model` / `provider` / `connection`) é uma adesão separada
de `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` apenas o expõe como
`fallbackResult.ruleScope`, e os consumidores a jusante apenas o respeitam como
algo diferente de um rótulo informativo para fornecedores incluídos na
allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` no mesmo ficheiro (`condicionado através de
honorsRuleLockScope()` — atualmente apenas `"agentrouter"`). Consulte "Erros de quota
reformulados" acima para saber o que uma correspondência com `scope: "connection"`
faz efetivamente quando um fornecedor está nessa allowlist.

**#11104 — as regras declaradas pelo operador ignoram ambas as listas de permissões.** Um operador pode
declarar uma regra por fornecedor em tempo de execução através de `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
sem editar este ficheiro. Condicionar uma regra do operador a
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — listas de permissões
destinadas a proteger o comportamento **predefinido** das regras de catálogo incorporadas — tornaria
o mecanismo de definições inerte para todos os fornecedores, exceto os que já estão
nelas listados, uma vez que declarar a regra já constitui a adesão explícita
do operador. `resolveRuleMatchBody()` e `honorsRuleLockScope()` verificam ambos
primeiro `hasOperatorRuleForProvider()`: um fornecedor com uma regra do operador recebe
o texto do erro em bruto e o respetivo `scope` declarado é respeitado, independentemente de
também constar ou não de qualquer uma das listas de permissões.

**Lacuna conhecida — `providerRuleRegistry` nunca é consultado para HTTP 400.**
O ramo `BAD_REQUEST` de `checkFallbackError` classifica o estado 400 inteiramente
através dos seus próprios arrays de padrões (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, etc. em `accountFallback.ts`) e retorna antes
de alcançar o ramo `configuredRule`/`getProviderErrorRuleMatch` acima.
Uma regra de catálogo incorporada (ou uma regra do operador) com `status: 400` é
sintaticamente válida, mas nunca será acionada. Atualmente, nenhuma regra existente se destina ao 400,
pelo que nada em produção é afetado — mas uma futura regra para 400 exige que
este ramo seja primeiro alterado, o que representa uma mudança maior do que adicionar uma regra (esta
reclassifica o 400 para todos os fornecedores que já dependem do comportamento
dos arrays de padrões) e está fora do âmbito da adição de uma regra para um único fornecedor.

### Adicionar um novo gateway que indique incorretamente a quota

1. Registe um array de regras em `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Mantenha `textMarkers`
   específicos do fornecedor; nunca reutilize expressões inglesas genéricas que colidam com
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Opcionalmente, registe regras de classificação em
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) para selecionar
   o âmbito de bloqueio correto (`connection` para quotas ao nível da conta, `model` para
   erros por modelo). Este passo só produz efeitos em produção para
   fornecedores cujas regras necessitem do texto completo do erro (marcadores no corpo): adicione o
   id do fornecedor a `FULL_TEXT_RULE_PROVIDERS` no mesmo ficheiro — caso contrário,
   `checkFallbackError` apenas fornece à regra o erro estruturado
   `{code, type}`, e uma regra baseada no texto do corpo nunca corresponderá a tráfego real.
   As regras que correspondam apenas com base em `status`/`headers` (como as da Opencode ou
   da Minimax) não necessitam desta adesão. Separadamente, se a regra declarar
   `scope: "connection"` e a intenção for aplicar efetivamente um período de suspensão a toda a ligação,
   juntamente com a omissão da combinação no mesmo pedido (e não apenas uma etiqueta informativa), adicione o
   id do fornecedor a `HONORS_RULE_LOCK_SCOPE_PROVIDERS` no mesmo ficheiro — é
   isto que condiciona a utilização ao estilo de `isAgentrouterConnectionQuotaScope()` em
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) e
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); sem isso, `scope`
   continua a ser propagado através de `fallbackResult.ruleScope`, mas nada atua sobre ele.
3. Adicione testes unitários seguindo o modelo de `tests/unit/upstream-status-restatement.test.ts`
   e `tests/unit/agentrouter-error-rules.test.ts` (incluindo as
   verificações de não permanência / ausência de `creditsExhausted` e — se o fornecedor necessitar
   da lista de permissões — um teste que confirme que `resolveRuleMatchBody()` devolve o
   texto completo apenas para esse fornecedor).

Não são necessárias alterações em `chatCore.ts`, `classifyError` ou combo.

#### Bloqueio agrupado por egresso (#10880)

Os fornecedores em `EGRESS_BUCKETED_LOCK_PROVIDERS` (família opencode) são tratados
como upstream agrupado por IP (o escalão gratuito da opencode é agrupado por IP, não
por conta — consulte #9611): um estado 429 classificado como `quota_exhausted`
**ou** `rate_limit_exceeded` aplica um período de suspensão a todas as ligações da família
incluída na lista de permissões cujo último IP de egresso conhecido corresponda ao da ligação que falhou, antes de
a rotação poder tentar utilizá-las
— evitando N-1 chamadas upstream com falha garantida (a mesma abordagem de #10460/#10525).
`rate_limit_exceeded` é incluído deliberadamente: no caminho `markAccountUnavailable`,
as regras específicas da opencode nunca correspondem (não são fornecidos cabeçalhos/corpo a
`checkFallbackError`, e opencode não consta de `FULL_TEXT_RULE_PROVIDERS`), pelo que um 429
cujo corpo contenha o texto de quota da subscrição ("monthly usage limit
reached") é classificado como `quota_exhausted` pelo fallback de texto de quota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; período de suspensão de 1 h) antes de
a regra `status_429` ser sequer alcançada — enquanto um 429 sem texto de quota (simples
limitação de taxa) é classificado pela regra `status_429` como `rate_limit_exceeded`
e continua a aplicar o período de suspensão à família de IPs. Para um fornecedor incluído na lista de permissões, um
limite de taxa agrupado por IP constitui o mesmo sinal que uma quota esgotada. Limitações assumidas:

- **Melhor esforço**: o bloqueio resolve o último `egress_ip` conhecido da ligação
  a partir de `proxy_logs` (janela de 24h, síncrono, sem cache). Cache fria (IP de
  saída nunca testado) ou ausência de linha → a ligação que falhou continua a
  entrar em período de espera através do ramo (registado como atualmente), mas
  nenhum elemento do mesmo grupo é bloqueado.
- **Nunca terminal**: o período de espera é uma janela de quota renovável
  (`testStatus: "unavailable"`); nunca é derivado um estado permanente de um
  sinal ao nível do IP. As ligações `disableCooling` ignoram totalmente o ramo.
- **A granularidade do bloqueio muda para a família na lista de permissões**:
  esta é uma alteração de âmbito, não apenas uma otimização dos elementos do
  mesmo grupo. opencode é um fornecedor `passthroughModels`, pelo que, antes
  deste ramo, um 429 produzia um bloqueio por MODELO; agora produz um período
  de espera da ligação — incluindo para um operador que execute uma única
  ligação sem qualquer elemento do mesmo grupo. Esta é a granularidade que a
  tabela de regras de opencode já declara como correta (`scope: "connection"`,
  `providerErrorRules.ts`), mas que nunca foi respeitada até agora porque
  opencode não está em `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. O próprio ramo
  grava o período de espera + `backoffLevel` da ligação que falhou, replicando
  o ramo de agentrouter com âmbito de ligação, e retorna — o bloqueio por
  modelo e o caminho genérico abaixo nunca são alcançados.
- **Combo incluído**: tal como o ramo de agentrouter, o âmbito ignora
  deliberadamente a redução de `persistUnavailableState`/`isCombo` que um
  chamador combo aplica a um 429. Um bloqueio por modelo não é uma forma mais
  fraca deste âmbito, é a unidade errada: nada diz sobre o IP esgotado, pelo
  que a rotação combo continuaria a desperdiçar uma chamada com falha
  garantida por cada elemento do mesmo grupo.
- **Segurança dos elementos do mesmo grupo**: um elemento do mesmo grupo que
  já esteja num estado terminal (banned/credits_exhausted) ou num período de
  espera mais longo nunca é substituído.
- **Lista de permissões exclusiva**: alargar
  `EGRESS_BUCKETED_LOCK_PROVIDERS` é uma decisão explícita do proprietário;
  sem integração genérica (padrão #10334/#10419). A consulta dos elementos do
  mesmo grupo associa essa mesma lista de permissões em vez de a repetir como
  um literal SQL, pelo que alargá-la continua a ser uma alteração de uma única
  linha.
- **Rotação do IP de saída, em ambas as direções**: a janela de consulta (24h)
  é muito mais ampla do que o TTL da cache do IP de saída (5 min), pelo que o
  «último IP conhecido» é histórico, não o estado atual. Se o proxy de uma
  ligação tiver rodado dentro da janela, o bloqueio pode **não detetar** um IP
  realmente partilhado (o IP registado é o novo, ainda não esgotado) — e,
  simetricamente, pode **colocar em período de espera um elemento do mesmo
  grupo que entretanto já tenha mudado** do IP esgotado. O segundo caso custa
  a esse elemento um período de espera; ambos são aceites como limitações de
  melhor esforço de uma consulta baseada no histórico.
- **Custo**: dois varrimentos limitados de `proxy_logs` (filtrados por janela
  através de `idx_pl_timestamp`), apenas à frequência de erros 429. Nenhum
  índice novo (migração 134, YAGNI). Medido numa cópia de tamanho moderado de
  uma base de dados com tráfego real; uma instância de elevado débito mantém
  proporcionalmente mais linhas na mesma janela.

---

## Outras Funcionalidades de Resiliência

- **19 estratégias de encaminhamento** (prioridade, ponderada, round-robin, retransmissão de contexto, preenchimento prioritário, p2c, aleatória, menos utilizada, otimizada para custos, sensível à reposição, janela de reposição, margem disponível, estritamente aleatória, automática, lkgp, otimizada para contexto, otimizada para cache, fusão, pipeline) — consulte [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Encaminhamento sensível à reposição** (v3.8.0) — prioriza as ligações pela hora de reposição da quota.
- **Degradação do modo em segundo plano** — a API Responses com `background: true` é degradada para o modo síncrono com um aviso.
- **Deteção dinâmica do limite de ferramentas** — recua os fornecedores quando os limites do número de ferramentas são atingidos.
- **Alternativa de emergência** — controlada por `OMNIROUTE_EMERGENCY_FALLBACK`; os operadores podem substituí-la na página Feature Flags sem reiniciar.

---

## Depuração

- As respostas de combinação ponderada `503 all_targets_cooling_down` (`Retry-After` definido, `diagnostics.excluded` enumera todos os destinos com `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → o conjunto está configurado e ligado, mas todos os destinos estão excluídos por um temporizador de resiliência; o aviso `[COMBO] Weighted selection: every target excluded before dispatch — …` indica os motivos e os segundos restantes. Um `404 no_executable_targets` da mesma combinação significa que não esteve envolvido qualquer temporizador de resiliência (não há nada para executar ou todas as contas falharam na verificação de disponibilidade). Implementado em `open-sse/services/combo/pinRecovery.ts` a partir das exclusões recolhidas em `targetResolution.ts`.
- Todas as chaves de um fornecedor foram ignoradas → verifique tanto o estado do disjuntor como o `rateLimitedUntil`/`testStatus` de cada ligação.
- Fornecedor permanentemente excluído após a janela de reposição → código a ler diretamente `state` em vez de `getStatus()`/`canExecute()`.
- Uma chave falha, mas as restantes devem funcionar → dê preferência ao período de espera da ligação em detrimento do disjuntor.
- Apenas um modelo falha → dê preferência ao bloqueio do modelo em detrimento do período de espera da ligação.
- O estado deveria recuperar automaticamente, mas não recupera → verifique se existe um carimbo de data/hora futuro e um caminho de leitura que atualize o estado expirado. Os estados permanentes exigem alterações manuais.

---

## Impressão Digital TLS e Furtividade

A furtividade específica de cada fornecedor (JA3/JA4, CCH, ofuscação) está documentada separadamente — consulte `docs/security/STEALTH_GUIDE.md` (git; não compilado em `/docs`).

---

## Testes de resiliência (Fase 8 · Bloco C)

Além dos testes unitários da lógica de resiliência, três testes exercitam o ambiente de execução sob
condições reais de tensão/falha (todos de integração/noturnos — nenhum bloqueia PRs):

| Teste               | O que faz                                                                                                                                                                           | Execução                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Caos                | Um nó upstream falso injeta latência/reposição/tempo limite/503 reais; valida que o disjuntor abre/recupera e que `checkFallbackError` classifica 503 como alternativa recuperável. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Crescimento da heap | ~500 streams por `createSSEStream` com `--expose-gc`; falha se a heap crescer para além do limite máximo (proteção contra OOM #3069).                                               | `npm run test:heap`                      |
| Teste prolongado k6 | Carga contínua sobre `/api/monitoring/health`; limiares de p95/erros.                                                                                                               | `k6 run tests/load/k6-soak.js` (noturno) |

Orquestrado por `.github/workflows/nightly-resilience.yml` (cron + dispatch). No
`test:integration` predefinido, os testes de caos e heap ignoram-se automaticamente (sem `RUN_CHAOS_INT`/`--expose-gc`).

---

## Ver também

- [Guia de arquitetura](./ARCHITECTURE.md) — Arquitetura do sistema e componentes internos
- [Guia do utilizador](../guides/USER_GUIDE.md) — Fornecedores, combinações, integração com a CLI
- [Motor de combinações automáticas](../routing/AUTO-COMBO.md) — Pontuação baseada em 16 fatores, pacotes de modos
