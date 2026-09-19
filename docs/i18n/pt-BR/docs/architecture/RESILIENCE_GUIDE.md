# Resilience Guide (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

O OmniRoute possui três mecanismos de resiliência distintos, porém relacionados. Cada um tem um escopo e uma finalidade diferentes. Mantenha-os separados ao depurar o comportamento do roteamento.

![Modelo de resiliência em 3 camadas](../diagrams/exported/resilience-3layers.svg)

> Fonte: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Disjuntor do provedor

**Escopo:** provedor inteiro (por exemplo, `glm`, `openai`, `anthropic`).

**Finalidade:** interromper o envio de tráfego para um provedor que esteja falhando repetidamente no nível do serviço upstream.

**Implementação:**

- Classe principal: `src/shared/utils/circuitBreaker.ts`
- Integração: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de status: `GET /api/monitoring/health`
- API de redefinição: `POST /api/resilience/reset`
- Wrappers: `open-sse/services/accountFallback.ts`
- Tabela do banco de dados: `domain_circuit_breakers`

**Estados:**

- `CLOSED` — tráfego normal permitido
- `DEGRADED` — o tráfego ainda é permitido, mas as falhas elevadas do provedor estão sendo monitoradas
- `OPEN` — provedor temporariamente bloqueado; o roteamento combinado o ignora
- `HALF_OPEN` — o tempo limite de redefinição expirou; uma solicitação de sondagem é permitida

**Padrões configuráveis (`open-sse/config/constants.ts`, expostos em Painel → Configurações → Resiliência):**

| Classe       | Degradado após | Abre após | Tempo limite de redefinição |
| ------------ | -------------- | --------- | --------------------------- |
| OAuth        | 5 falhas       | 8 falhas  | 60s                         |
| Chave de API | 7 falhas       | 12 falhas | 30s                         |
| Local        | derivado       | 2 falhas  | 15s                         |

`degradationThreshold` controla quando um provedor entra em `DEGRADED`; `failureThreshold` controla quando ele abre e passa a ser ignorado. Os perfis de provedores locais ainda não são expostos na página de configurações de Resiliência.

**Códigos de acionamento:** somente status no nível do provedor `[408, 500, 502, 503, 504]`. NÃO acione para erros no nível da conta (a maioria dos 401/403/429 — eles pertencem ao período de espera ou ao bloqueio).

**Recuperação sob demanda:** quando `OPEN` expira, `getStatus()`, `canExecute()`, `getRetryAfterMs()` atualizam o estado para `HALF_OPEN`. Nenhum temporizador em segundo plano é necessário.

---

### Período de espera global opcional do provedor (controle por janela)

Uma quarta camada **opcional** (`PROVIDER_COOLDOWN_ENABLED`, desativada por padrão) mantém uma
memória entre solicitações dos provedores com falha em
`open-sse/services/providerCooldownTracker.ts`, consultada pela resolução de destinos
combinados para que solicitações combinadas consecutivas parem de percorrer novamente um provedor que acabou
de falhar. As entradas no nível do provedor respeitam o controle por janela de `PROVIDER_PROFILES`:

| Perfil       | aciona após (`providerFailureThreshold`) | dentro de (`providerFailureWindowMs`) | esfria por (`providerCooldownMs`) |
| ------------ | ---------------------------------------: | ------------------------------------: | --------------------------------: |
| OAuth        |                                     `10` |                               `15min` |                            `5min` |
| Chave de API |                                     `15` |                               `30min` |                           `10min` |

Abaixo do limite, o provedor **não** é considerado em período de espera; um sucesso limpa
a janela. Em vez disso, as entradas no nível da conexão (`provider:connectionId`) mantêm o
recuo exponencial de `minRetryCooldownMs → maxRetryCooldownMs`. Substituições:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Proteção contra regressão: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Cooldown de conexão

**Escopo:** uma única conexão/conta/chave de provedor.

**Finalidade:** ignorar uma chave com problema enquanto outras conexões do mesmo provedor continuam atendendo.

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

- Base do OAuth: 5s
- Base da chave de API: 3s
- 429 de chave de API: dá preferência a cabeçalhos upstream `Retry-After`/de redefinição/texto de redefinição analisável
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Proteção antiefeito-manada:** impede que falhas simultâneas prolonguem excessivamente o cooldown ou incrementem `backoffLevel` duas vezes.

**Estados terminais (NÃO são cooldowns):**

- `banned` — definido pela detecção de palavra-chave de banimento / banimento de conta (consulte [BAN_DETECTION](../security/BAN_DETECTION.md)) e por três recusas upstream consecutivas por solicitação (`request_rejected`, por exemplo, Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); uma única recusa apenas coloca a conexão em cooldown
- `expired` (faz a transição para o estado terminal após um número limitado de novas tentativas — `EXPIRED_RETRY_MAX = 3` com backoff exponencial — para que erros transitórios de OAuth possam se autorrecuperar antes que a conta seja permanentemente desativada)
- `credits_exhausted`

Esses estados persistem até que as credenciais sejam alteradas ou um operador os redefina. Não substitua estados terminais por um estado de cooldown transitório.

**Recuperação preguiçosa:** quando `rateLimitedUntil` já passou, a conexão volta a ser elegível. Após o uso bem-sucedido, `clearAccountError()` limpa todos os campos de erro.

### Afinidade de sessão (#7274)

**Escopo:** uma sessão de cliente (`X-Session-Id` / `x-codex-session-id` / cabeçalho `x-omniroute-session`) fixada a uma conexão, para **qualquer** provedor.

**Finalidade:** manter um agente de múltiplos turnos (Claude Code, aider, agentes personalizados) na mesma conta entre solicitações, reduzindo a perda de contexto entre contas e ocorrências repetidas de 429 em inicializações a frio em provedores com estado de sessão por conta.

**Implementação:**

- Resolução do TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Seleção/criação da fixação: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extração de cabeçalho (genérica, para qualquer provedor): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabela persistida de fixações: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Configuração: `sessionAffinityTtlMs` (TTL global em ms, `0` desabilita) — `src/lib/db/settings.ts`. Renomeada de `codexSessionAffinityTtlMs`, específica do Codex, pela migração `124_generic_session_affinity_ttl.sql`, que transfere qualquer TTL do Codex configurado anteriormente como o novo padrão.

Antes da #7274, `resolveSessionAffinityTtlMs()` retornava imediatamente `0` para todos os provedores, exceto `codex`; portanto, a configuração de TTL (e os cabeçalhos de sessão) não produzia efeito em nenhum outro lugar, embora o mecanismo de fixação e a extração de cabeçalhos já fossem independentes do provedor. A correção removeu esse retorno antecipado; agora, o TTL é aplicado uniformemente a todos os provedores quando definido globalmente com um valor acima de `0`.

Os três cabeçalhos de afinidade de sessão nunca são encaminhados ao upstream — os executores constroem do zero seus próprios cabeçalhos upstream em vez de repassar os cabeçalhos do cliente, portanto eles permanecem apenas como identificadores internos de correlação.

### Locações exclusivas de conexão para sessões gerenciadas

**Escopo:** um cliente/sessão HTTP gerenciado ativo possui uma conexão elegível do OmniRoute.

**Finalidade:** fornecer a clientes que precisam de uma barreira rígida de roteamento entre solicitações a propriedade exclusiva e durável de uma conexão. Isso difere da afinidade de sessão, que é uma preferência flexível de continuidade: uma locação exclusiva mantém o estado do ciclo de vida no SQLite, impõe a unicidade global do proprietário ativo e da conexão ativa e rejeita uma geração obsoleta antes do despacho ao provedor.

O recurso é opcional para cada chave de API. Uma chave gerenciada deve ter o escopo `lease:exclusive` e uma lista `allowedConnections` explicitamente não vazia. Qualquer cliente HTTP pode usar o endpoint de ciclo de vida; não são necessários nome do cliente, user-agent, provedor, método OAuth nem modelo. A locação possui uma conexão, não um modelo; portanto, uma alteração de modelo mantém o vínculo enquanto a conexão permanecer normalmente elegível. As regras normais de modelo, cota, integridade, cooldown e lista de permissões continuam tendo precedência e podem transferir a mesma geração para outra conexão livre e elegível.

O ciclo de vida é `POST /api/v1/session-leases` com as ações JSON `acquire`, `renew` e `release`. As solicitações gerenciadas de inferência apresentam o valor opaco de `X-OmniRoute-Lease-Owner` e o valor exato de `X-OmniRoute-Lease-Generation`. O proprietário usa `vlo_` seguido por 43 caracteres base64url; somente seu hash SHA-256 é armazenado. Cada barreira final de despacho também vincula o ID da chave de API autenticada e o ID da conexão ativa. Os cabeçalhos de controle da locação são removidos dos logs, dos snapshots de solicitação retidos e dos cabeçalhos dos executores upstream.

Se o roteamento normal tiver candidatos gerenciados elegíveis, mas todos os candidatos livres estiverem ocupados por uma locação ativa estrangeira, o OmniRoute retornará HTTP `429`, o código lease-capacity-unavailable, um estado de espera por capacidade e um `Retry-After` limitado, derivado da expiração relevante mais próxima. A ausência normal de elegibilidade não constitui contenção de locação e mantém a semântica de erro de roteamento existente.

Os mecanismos relacionados permanecem separados:

- A ocupação de sessão OAuth é uma distribuição flexível e local ao processo para contas OAuth.
- Os semáforos de conta concedem permissões de simultaneidade de solicitações e terminam quando uma solicitação é concluída.
- As locações exclusivas de sessão gerenciada representam propriedade durável durante o ciclo de vida, com uma barreira de geração.

---

## 3. Bloqueio de modelo

**Escopo:** trio de provedor + conexão + modelo.

**Escopo da chave por status:** o status da falha determina em qual chave um bloqueio é gravado
(`resolveLockoutScope()` em `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — um sinal de cota ou direito de acesso — bloqueiam a **família de cota**:
  para codex, todo o escopo `codex` / `spark` (todos os modelos `gpt-5*` da
  conexão); para outros provedores, `getQuotaScopedModelForProvider()`.
- `404` bloqueia o modelo específico (`getModelLockKey()` restringe `not_found`).
- Qualquer outro status — falhas de transporte/servidor `5xx` e o `502`
  sintetizado pelo próprio OmniRoute a partir da validação de qualidade — bloqueia somente a
  tupla **exata** de provedor/conexão/modelo. Um stream inválido em um modelo não é evidência
  sobre a cota da conta; antes dessa regra, uma resposta vazia em
  `codex/gpt-5.6-luna` removia todos os modelos `gpt-5*` dessa conexão do
  roteamento por 2–30 min (com escalonamento), mesmo que sua cota permanecesse intacta.
- A opção explícita `scope` do chamador sempre prevalece (Antigravity passa `"exact"`).

**Objetivo:** evitar desabilitar uma conexão inteira quando apenas um modelo está indisponível ou com a cota limitada.

**Exemplos:**

- Provedores com cota por modelo retornando 429
- Provedores locais retornando 404 para um único modelo ausente
- Falhas de permissão específicas do provedor para modos/modelos (por exemplo, modos do Grok)

**Implementação:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Painel de períodos de espera dos modelos (v3.8.0)

IU: Configurações → Períodos de espera dos modelos (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Lista os bloqueios ativos com: provedor, conexão, modelo, motivo, expiresAt. Os operadores podem reabilitar manualmente um modelo pelo cartão.

**API REST:**

- `GET /api/resilience/model-cooldowns` — lista os bloqueios ativos
- `DELETE /api/resilience/model-cooldowns` — reabilitação manual. Corpo: `{provider, connection, model}`. Autorização: gerenciamento.

### IU de configurações de bloqueio + recuperação por decaimento após sucesso (v3.8.23)

O bloqueio de modelo deixou de ser um comportamento codificado e sempre ativo para se tornar um recurso
totalmente configurável e opcional, com seu próprio cartão de configurações e um mecanismo de recuperação automática.

**Cartão de configurações:** Configurações → Bloqueio de modelo
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ele é **diferente** do `ModelCooldownsCard` somente leitura acima (que apenas
_lista_ os bloqueios ativos) — o novo cartão _configura os parâmetros_. Os valores padrão
ficam em `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Configuração            | Padrão                           | Significado                                                               |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Controle mestre — o bloqueio de modelo fica **desativado por padrão**.    |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Status do upstream que contam como falha no escopo do modelo.             |
| `baseCooldownMs`        | `120_000` (120 s)                | Duração inicial do bloqueio para a primeira falha.                        |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Limite máximo do período de espera escalonado.                            |
| `maxBackoffSteps`       | `10`                             | Número máximo de etapas de escalonamento por recuo exponencial.           |
| `useExponentialBackoff` | `true`                           | Define se falhas repetidas aumentam exponencialmente o período de espera. |

As configurações persistem por meio do armazenamento normal de configurações e são validadas pelo
esquema de configurações de resiliência; o cartão limita `baseCooldownMs`/`maxCooldownMs`
(com `maxCooldownMs ≥ baseCooldownMs`) e `maxBackoffSteps`.

**Recuperação por decaimento após sucesso:** a recuperação **não** ocorre somente pela expiração do temporizador. Uma resposta
bem-sucedida reduz gradualmente a contagem de falhas do modelo para que um modelo que se recuperou
durante o intervalo pare de escalar (e seja liberado) antes que seu temporizador expire. Quando um
destino de combinação tem sucesso, `open-sse/services/combo.ts` chama `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), que reduz pela **metade** o
`failureCount` armazenado (`Math.floor(failureCount / 2)`); quando ele chega a `0`, a entrada
de bloqueio é completamente excluída. A função correspondente `recordModelLockoutFailure()`
incrementa a contagem (e aumenta o período de espera) em caso de falhas dentro da
janela de escalonamento. Esse decaimento após sucesso complementa a simples expiração do temporizador —
qualquer um dos caminhos pode reabilitar um modelo.

**Estado:** os bloqueios são mantidos **em memória** (`Map`s por processo de
`ModelLockoutEntry` indexados por `provider:connectionId:model`, com bloqueios de escopo exato por
`provider:connectionId:exact:model`), sem persistência no
banco de dados — eles são perdidos ao reiniciar. As _configurações_ são persistidas; o
_estado_ dos bloqueios ativos é efêmero.

---

## 4. Controle de concorrência de compartilhamento de cota (v3.8.36)

Contas de assinatura (GLM, MiniMax etc.) geralmente aceitam apenas cerca de 1–3
solicitações simultâneas; exceder esse limite aciona erros 429 e períodos de espera. Isso é especialmente crítico em
combinações de **compartilhamento de cota** (`qtSd/…`), nas quais várias chaves de API compartilham uma única
conta upstream. Três camadas impedem que uma conta compartilhada seja sobrecarregada.

### Limite de concorrência por conexão (`max_concurrent`)

Cada conexão de provedor pode declarar um limite máximo `max_concurrent`
(`provider_connections.max_concurrent`, definido no modal da conexão / API / banco de dados).
Deixe-o vazio para não aplicar limite. Esse é o único parâmetro que controla a camada de serialização
abaixo — defina-o com a concorrência real da conta (por exemplo, GLM ~1, MiniMax ~2).

### Serialização de solicitações de compartilhamento de cota

Quando um despacho de compartilhamento de cota tem como destino uma conexão que declara um
`max_concurrent` positivo, as solicitações simultâneas para essa **conta** são serializadas por meio de um
semáforo por conexão (chave `qsconn:<connectionId>`): as solicitações excedentes **aguardam na
fila** em vez de sobrecarregar a conta. O comportamento é **fail-open** — uma fila saturada
ou um timeout faz com que o processamento prossiga sem um slot, em vez de rejeitar uma solicitação
que poderia ser despachada. Ative ou desative em **Configurações → Resiliência → Concorrência por conexão
do compartilhamento de cota** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ativado
por padrão). Sem um limite `max_concurrent`, o comportamento permanece inalterado.

> O gate de roteamento do compartilhamento de cota (`selectQuotaShareTarget`, DRR + P2C) também é
> fail-open e apenas _reduz a prioridade_ de uma conexão que atingiu o limite — com um
> pool de uma única conexão, ele não consegue impor um limite rígido; portanto, é esse semáforo que efetivamente
> contém a sobrecarga.

### Nova tentativa sensível ao período de espera da combinação

Para cada estratégia de combinação (quando ativada), uma solicitação que resultaria em um erro 429
devido a um período de espera transitório CURTO aguarda seu término e é despachada novamente, em vez de
retornar o erro 429 — isso abrange janelas de TPM/RPM da classe Gemini (retry-after de aproximadamente 60s)
em combinações de vários modelos, por exemplo, quando ambos os destinos de uma combinação de 2 modelos atingem um limite de taxa
por modelo. Limitado por `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) em **Configurações → Resiliência**. Ele nunca aguarda por `quota_exhausted`
(bloqueado até a meia-noite) nem por motivos de autenticação/recurso não encontrado.

---

## 5. Controle de admissão da fila de solicitações (v3.8.49 · issue #6593)

**Escopo**: a fila local de limite de taxa por provedor+conexão (`open-sse/services/rateLimitManager.ts`,
implementada com Bottleneck), uma camada abaixo dos três mecanismos anteriores.

**`maxWaitMs` é um nome legado persistido para a expiração da execução.**
`resilienceSettings.requestQueue.maxWaitMs` é passado ao Bottleneck como uma
`expiration` de job, cujo temporizador é iniciado somente após o despacho. Portanto, ele limita
a execução gerenciada pelo limitador, e não o tempo passado na fila local. A expiração é
exposta como o `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` local confiável (HTTP 504);
o antigo nome de código de timeout da fila é aceito apenas para compatibilidade retroativa
interna confiável. O padrão é 15000ms; substitua-o por meio de
`RATE_LIMIT_MAX_WAIT_MS` (variável de ambiente) ou do painel (**Configurações → Resiliência**,
limite da interface de 1–30000ms). A permanência na fila não possui prazo limite; use
`maxQueueDepth` abaixo para limitar as chamadas enfileiradas.

**`maxQueueDepth` — limite de admissão opcional (novo).** `resilienceSettings.requestQueue.maxQueueDepth`
limita quantas solicitações podem permanecer enfileiradas (ainda não despachadas) simultaneamente para uma
combinação de provedor+conexão. Quando a fila já contém `maxQueueDepth`
solicitações, uma nova solicitação é rejeitada imediatamente com um erro tipado
`code: "RATE_LIMIT_QUEUE_FULL"` **antes** mesmo de chegar a `limiter.schedule()`
— portanto, a rejeição tem baixo custo e acontece antes de qualquer trabalho downstream de
compactação / tradução do prompt para essa solicitação. O padrão `0` =
desativado, preservando o comportamento existente de fila ilimitada; limitado a 0–100000.
Substitua-o por meio de `RATE_LIMIT_MAX_QUEUE_DEPTH` (variável de ambiente) ou
`resilienceSettings.requestQueue.maxQueueDepth` (patch do painel/API).

A própria verificação de admissão é uma função pura
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), portanto
pode ser testada unitariamente sem um limitador Bottleneck real.

> O RFC que abriu a #6593 também propôs um sinalizador `bypassCompressionOnRateLimit`.
> O pipeline `open-sse/services/compression/` deste repositório realiza a
> compactação do prompt/contexto na solicitação LLM de saída (`chatCore.ts`,
> próximo ao bloco `resolveCompressionSettings`/`selectCompressionStrategy`),
> e não a compactação da resposta HTTP em corpos 429 sintetizados — não há
> um caminho de código correspondente para um sinalizador de bypass literal. Essa etapa de compactação do prompt
> também é executada atualmente _antes_ de `withRateLimit()` no pipeline da solicitação; portanto,
> reordená-la para ignorá-la em uma rejeição por fila cheia constitui uma alteração separada e maior
> do que o escopo desta issue; isso **não** foi implementado intencionalmente
> aqui e foi deixado como acompanhamento futuro, caso o ganho de economia de CPU compense o
> risco da reordenação.

---

## 6. Watchdog de throughput de stream lento (#9709)

A proteção opcional `resilienceSettings.streamRecovery.throughputWatchdog` detecta
um upstream que ainda está enviando chunks, mas produzindo saída do assistente abaixo
da taxa configurada de saída útil. Ela é deliberadamente distinta do tempo limite por
inatividade: heartbeats e metadados não redefinem nenhum dos temporizadores e não
contam como progresso. Também é distinta do prazo rígido da tentativa (#9153), que
continua sendo um limite máximo absoluto de segurança, independentemente da qualidade
da saída.

O watchdog exige um período de aquecimento seguido por uma janela móvel completa antes
que possa abortar. Ele contabiliza deltas de texto dos eventos de saída das APIs Chat
Completions e Responses (um proxy conservador de bytes UTF-8), ignora eventos vazios ou
que contenham apenas uso e suspende a avaliação enquanto eventos de chamada de
ferramenta ou raciocínio estiverem em andamento. Ele vem desabilitado por padrão e pode
ser habilitado com `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; a janela, o aquecimento,
a taxa mínima e a saída mínima mensurável são limitados pela camada normal de
normalização das configurações de resiliência.

Quando habilitado, um aborto pelo watchdog é aplicado somente à tentativa upstream
ativa. Antes de quaisquer bytes ficarem visíveis para o cliente, o caminho existente
de recuperação antecipada na mesma conta pode reabrir a tentativa. Após o commit, o
stream nunca é reproduzido novamente às cegas; somente o contrato existente de
continuação segura no meio do stream pode concatenar um sufixo. A finalização continua
ocorrendo uma única vez, portanto a contabilização de uso e a liberação do semáforo não
são duplicadas.

---

## 7. Reformulação do status upstream (erros de cota com status incorreto)

**Escopo:** um gateway upstream que relata esgotamento temporário de cota com o status HTTP incorreto.

**Objetivo:** corrigir um status enganoso ANTES da classificação, para que os consumidores downstream (mecanismo de fallback, agregação de combo e resposta voltada ao cliente) vejam a verdadeira natureza recuperável da falha.

Alguns gateways sinalizam esgotamento TEMPORÁRIO de cota com um status HTTP
não recuperável. `agentrouter.org` retorna `403` (às vezes `400`) com um corpo
em chinês (`用户额度不足` / `额度不足`) em vez do `429` padrão. Clientes como o Claude
Code tratam `403` como permanente e abortam a sessão e, sem a correção,
o mecanismo de fallback o classificaria como `AUTH_ERROR` em vez de um evento
de cota.

**Implementação:**

- Registro + matcher: `open-sse/config/upstreamStatusRestatement.ts` — uma
  lista de regras por provedor (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), correspondidas por meio de `applyStatusRestatement()`.
- Local da chamada: o bloco `providerFailure:` em `open-sse/handlers/chatCore.ts`
  (por volta da linha 3654), logo após `parseUpstreamError()` analisar uma resposta
  upstream com um status HTTP de erro (`!providerResponse.ok`) e antes da execução
  de qualquer classificação, para que cada consumidor downstream veja o status
  corrigido. Erros incorporados em um stream SSE `200` seguem um caminho separado
  e posterior de análise do stream e **não** são cobertos por esse hook atualmente — uma
  limitação conhecida, ainda não necessária para o status incorreto do agentrouter (que
  se manifesta como um status HTTP de erro).
- Elegibilidade para nova tentativa: `429` está em `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), portanto um erro reformulado
  contém uma janela real para nova tentativa em vez de se manifestar como um `403`
  sem possibilidade de recuperação.
- O `defaultRetryAfterMs` sintético de `60s` (`upstreamStatusRestatement.ts`)
  é apenas o que a resposta reformulada informa ao **cliente**; ele não é, por si só,
  a duração interna do cooldown/bloqueio da conexão — isso é regido
  separadamente pelo mecanismo que efetivamente trata o erro reformulado
  (o backoff crescente do Connection Cooldown, §2, com base de `3s` para provedores
  com chave de API; ou Model Lockout, §3, para provedores com cota por modelo como
  o agentrouter). O roteador pode se tornar internamente elegível para tentar novamente
  antes da janela de 60s que anuncia ao cliente — uma margem intencional,
  não um bug.

Erros permanentes (`无权访问模型` do agentrouter — sem acesso a este modelo) NUNCA são
reformulados: `excludeMarkers` veta a regra mesmo quando `textMarkers` corresponde,
portanto o erro mantém seu status original e nada continua tentando processá-lo
indefinidamente. A regra correspondente de classificação do provedor
(`agentrouter-model-access-denied` em `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, um cooldown-base declarado de `6h`) é
consultada por `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_antes_ do retorno antecipado genérico `FORBIDDEN` da categoria apikey, condicionado a
`honorsRuleLockScope(provider)` (#10334 — atualmente exclusivo do agentrouter por meio
da allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` em
`providerErrorRules.ts`). O cooldown declarado de 6h da regra é propagado como
`fallbackResult.baseCooldownMs`, mas ainda alimenta o caminho preexistente
de bloqueio por cota por modelo (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, inalterado por #10334, exceto pela origem do cooldown):
ele é limitado ao máximo configurado pelo operador em `mlSettings.maxCooldownMs`
(padrão de `1_800_000ms` / 30min), como qualquer outro bloqueio de modelo, e o
_motivo de bloqueio persistido_ permanece como o valor preexistente codificado
diretamente `"forbidden"`, e não o `"auth_error"` da regra — somente a duração do
cooldown é respeitada de ponta a ponta, não a string do motivo. A própria conexão
permanece ativa; modelos irmãos na mesma conexão não são afetados.

Erros de cota reformulados (`额度不足`) chegam a uma regra de provedor em produção
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, sem cooldown próprio declarado — aplica-se o padrão de backoff
escalonado da camada de persistência). Desde a #10334, o `scope` em
`ProviderErrorRuleMatch` É consumido de ponta a ponta, mas **somente** para provedores na
allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
atualmente apenas `"agentrouter"`, controlado por `honorsRuleLockScope()`). Para todos os
outros provedores, `scope` permanece informativo, exatamente como antes da #10334.
`checkFallbackError` expõe o escopo da regra correspondente como
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) é a proteção compartilhada que confirma que um
`ruleScope` é realmente seguro para ser respeitado como um sinal de abrangência de conexão e
autorrecuperável (escopo `"connection"`, motivo `quota_exhausted`, nunca `permanent`,
nunca `creditsExhausted` — uma defesa contra uma regra futura que associe o escopo
`"connection"` a um estado permanente da conta). Dois consumidores a invocam:

- **Persistência** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  em vez de cair na ramificação de bloqueio **por modelo** do provedor passthrough
  (agentrouter tem `passthroughModels: true` → `hasPerModelQuota()`
  retorna `true`), ela aplica um **cooldown temporário da conexão** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nunca um status terminal
  (`credits_exhausted`/`banned`/`expired`) — para que a conexão se recupere
  automaticamente quando o cooldown terminar, em vez de exigir uma redefinição manual da credencial.
  Isso é ignorado para conexões com `disableCooling: true` (#2997): essa opção de exclusão
  segue para o bloqueio por modelo (uma compensação documentada —
  consulte o comentário no código acima da ramificação).
- **Roteamento combinado na mesma requisição** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): a mesma proteção marca a
  conexão no Set em memória `exhaustedConnections`, indexado por
  `${provider}:${connectionId}`. Isso ignora somente um destino restante da MESMA REQUISIÇÃO
  que _já contenha exatamente esse `connectionId`_ em seu próprio
  objeto de destino (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` antes da consulta a `exhaustedConnections`) — um combo simples
  de lista de modelos, no qual os destinos irmãos não contêm um `connectionId` fixado
  próprio e um deles só é resolvido por despacho a partir do cabeçalho
  `X-OmniRoute-Selected-Connection-Id` da resposta, nunca encontra correspondência para essa chave. Nesse
  caso comum, a proteção real contra uma etapa restante reutilizar a
  conta recém-esgotada NÃO é esse Set — é a camada de persistência acima
  (o `rateLimitedUntil` da conexão agora está no futuro), combinada com
  essa mesma proteção suprimindo `transientRateLimitedProviders` para a
  falha (consulte "Design em duas etapas" e o comentário no código da
  ramificação `isAgentrouterConnectionQuotaScope` em `targetExhaustion.ts`): com
  esse Set sem marcação, a liberação forçada `allowRateLimitedConnection` de
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NÃO é
  ativada para as etapas restantes do provedor, portanto o filtro `rateLimitedUntil`
  da seleção de credenciais (`src/sse/services/auth.ts:1238`) é respeitado normalmente, e uma
  etapa restante seleciona outra conexão agentrouter ainda elegível ou
  falha por não haver credenciais disponíveis — ela não força o retorno à
  conexão que essa ramificação acabou de colocar em cooldown.

### Design em duas etapas: reformulação de status, seguida de classificação

A reformulação de status (`upstreamStatusRestatement.ts`) e as regras de
classificação de provedores (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) são registros separados que usam como chave o id do provedor
e marcadores de texto, mas são executados em locais diferentes e têm finalidades
distintas: a reformulação reescreve o status HTTP antecipadamente em `chatCore.ts`;
as regras de classificação selecionam o `reason` de fallback e o `scope` de bloqueio
(`model` / `provider` / `connection`) dentro de `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

As regras de classificação só veem o **texto** completo do erro (necessário para encontrar
marcadores no corpo, como `额度不足`) para provedores listados na allowlist
`FULL_TEXT_RULE_PROVIDERS` em `providerErrorRules.ts` — atualmente apenas `"agentrouter"`. Para
todos os outros provedores do **catálogo integrado**, `checkFallbackError` fornece
a `getProviderErrorRuleMatch` apenas o erro estruturado (`{code, type}`), o que
é suficiente para regras baseadas em cabeçalhos/status/códigos, mas não enxerga marcadores no texto do corpo.
O auxiliar `resolveRuleMatchBody()` realiza essa seleção: texto completo do erro
para provedores na allowlist, e o erro estruturado para os demais. Adicionar um
provedor **integrado** a `FULL_TEXT_RULE_PROVIDERS` é uma adesão explícita por provedor
— ela existe para que o caminho padrão de todos os provedores ausentes da
lista permaneça inalterado byte por byte.

O `scope` de uma regra (`model` / `provider` / `connection`) é uma adesão separada
de `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` apenas o expõe como
`fallbackResult.ruleScope`, e os consumidores posteriores só o respeitam como
algo além de um rótulo informativo para provedores na allowlist
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` no mesmo arquivo (`controlado por
honorsRuleLockScope()` — atualmente apenas `"agentrouter"`). Consulte "Erros de cota
reformulados" acima para saber o que uma correspondência com `scope: "connection"` realmente faz quando um
provedor está nessa allowlist.

**#11104 — regras declaradas pelo operador ignoram ambas as listas de permissões.** Um operador pode
declarar uma regra por provedor em tempo de execução por meio de `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
sem editar este arquivo. Condicionar uma regra do operador a
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — listas de permissões
destinadas a proteger o comportamento **padrão** das regras internas do catálogo — tornaria
o mecanismo de configurações inoperante para todos os provedores, exceto aqueles já
listados nelas, pois declarar a regra já representa a adesão explícita do operador.
`resolveRuleMatchBody()` e `honorsRuleLockScope()` verificam
`hasOperatorRuleForProvider()` primeiro: um provedor com uma regra do operador recebe
o texto bruto do erro e tem seu `scope` declarado respeitado, independentemente de
também aparecer ou não em qualquer uma das listas de permissões.

**Lacuna conhecida — `providerRuleRegistry` nunca é consultado para HTTP 400.**
A ramificação `BAD_REQUEST` de `checkFallbackError` classifica o status 400 inteiramente
por meio de suas próprias listas de padrões (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` etc. em `accountFallback.ts`) e retorna antes que
a ramificação `configuredRule`/`getProviderErrorRuleMatch` acima dela seja alcançada.
Uma regra interna do catálogo (ou uma regra do operador) com `status: 400` é
sintaticamente válida, mas nunca será acionada. Atualmente, nenhuma regra existente
tem o status 400 como alvo, portanto nada em produção é afetado — mas uma futura regra
para 400 exigirá que essa ramificação seja alterada primeiro, o que representa uma
mudança maior do que adicionar uma regra (ela reclassifica o status 400 para todos os
provedores que já dependem do comportamento baseado nas listas de padrões) e está fora
do escopo da adição de uma regra para um único provedor.

### Adicionando um novo gateway que declara incorretamente a cota

1. Registre uma lista de regras em `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Mantenha `textMarkers`
   específicos do provedor; nunca reutilize frases genéricas em inglês que entrem em
   conflito com `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Opcionalmente, registre regras de classificação em
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) para escolher
   o escopo de bloqueio correto (`connection` para cotas que abrangem toda a conta,
   `model` para erros por modelo). Esta etapa só entra em vigor em produção para
   provedores cujas regras precisam do texto completo do erro (marcadores no corpo):
   adicione o id do provedor a `FULL_TEXT_RULE_PROVIDERS` no mesmo arquivo — caso
   contrário, `checkFallbackError` fornece à regra apenas o erro estruturado
   `{code, type}`, e uma regra baseada no texto do corpo nunca corresponderá ao tráfego
   real. Regras que correspondem exclusivamente a `status`/`headers` (como as do
   Opencode ou do Minimax) não precisam dessa adesão. Separadamente, se a regra declarar
   `scope: "connection"` e a intenção for aplicar de fato um período de espera a toda
   a conexão, além de ignorar a combinação na mesma solicitação (e não apenas fornecer
   um rótulo informativo), adicione o id do provedor a
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` no mesmo arquivo — é isso que condiciona o
   consumo no estilo de `isAgentrouterConnectionQuotaScope()` em
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) e
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); sem isso, `scope`
   ainda é propagado por `fallbackResult.ruleScope`, mas nada age com base nele.
3. Adicione testes unitários espelhando `tests/unit/upstream-status-restatement.test.ts`
   e `tests/unit/agentrouter-error-rules.test.ts` (incluindo as proteções
   contra permanente / contra `creditsExhausted` e — se o provedor precisar
   da lista de permissões — um teste que confirme que `resolveRuleMatchBody()` retorna
   o texto completo apenas para esse provedor).

Nenhuma alteração em `chatCore.ts`, `classifyError` ou combo é necessária.

#### Bloqueio agrupado por saída (#10880)

Provedores em `EGRESS_BUCKETED_LOCK_PROVIDERS` (família opencode) são tratados
como upstream agrupado por IP (o nível gratuito do opencode é agrupado por IP, não
por conta — consulte #9611): um status 429 classificado como `quota_exhausted`
**ou** `rate_limit_exceeded` coloca em período de espera todas as conexões da família
incluída na lista de permissões cujo último IP de saída conhecido corresponda ao da
conexão com falha, antes que a rotação possa testá-las
— evitando N-1 chamadas upstream com falha garantida (mesmo formato de #10460/#10525).
`rate_limit_exceeded` foi incluído deliberadamente: no caminho de
`markAccountUnavailable`, as regras específicas do opencode nunca correspondem
(nenhum cabeçalho/corpo é fornecido a `checkFallbackError`, e opencode não está em
`FULL_TEXT_RULE_PROVIDERS`), portanto um 429 cujo corpo contenha o texto de cota da
assinatura ("monthly usage limit reached") é classificado como `quota_exhausted`
pelo fallback de texto de cota (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; período de espera de 1h) antes que a regra `status_429` seja
alcançada — enquanto um 429 sem texto de cota (limitação de taxa simples) é
classificado pela regra `status_429` como `rate_limit_exceeded` e ainda coloca a
família de IPs em período de espera. Para um provedor incluído na lista de permissões,
um limite de taxa agrupado por IP é o mesmo sinal de uma cota esgotada. Limites conhecidos:

- **Melhor esforço**: o bloqueio resolve o último `egress_ip` conhecido da conexão
  a partir de `proxy_logs` (janela de 24h, síncrono, sem cache). Cache frio (IP de
  saída nunca sondado) ou nenhuma linha → a conexão com falha ainda recebe o
  cooldown pela ramificação (registrado como atualmente), mas nenhum sibling é bloqueado.
- **Nunca terminal**: o cooldown é uma janela de cota renovável
  (`testStatus: "unavailable"`); um estado permanente nunca é derivado de um
  sinal no nível do IP. Conexões com `disableCooling` ignoram completamente a ramificação.
- **A granularidade do bloqueio muda para a família na lista de permissões**: esta é uma mudança
  de escopo, não apenas uma otimização de siblings. opencode é um provedor de
  `passthroughModels`, portanto, antes desta ramificação, um 429 produzia um bloqueio
  por MODELO; agora, ele produz um cooldown da conexão — inclusive para um operador que
  executa uma única conexão, sem nenhum sibling. Essa é a granularidade que a tabela de
  regras do opencode já declara como correta (`scope: "connection"`,
  `providerErrorRules.ts`), mas que nunca foi respeitada até agora porque opencode não está em
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. A ramificação grava por conta própria o cooldown
  - `backoffLevel` da conexão com falha, espelhando a ramificação do agentrouter
    com escopo de conexão, e retorna — o bloqueio por modelo e
    o caminho genérico abaixo nunca são alcançados.
- **Combo incluído**: assim como a ramificação do agentrouter, o escopo ignora deliberadamente
  o rebaixamento de `persistUnavailableState`/`isCombo` que um chamador combo
  aplica a um 429. Um bloqueio por modelo não é uma forma mais branda desse escopo; ele
  usa a unidade errada: não diz nada sobre o IP esgotado, portanto a rotação do
  combo continuaria desperdiçando uma chamada com falha garantida por sibling.
- **Segurança dos siblings**: um sibling que já esteja terminal (banned/credits_exhausted)
  ou que já esteja em um cooldown mais longo nunca é sobrescrito.
- **Lista de permissões exclusiva**: ampliar `EGRESS_BUCKETED_LOCK_PROVIDERS` é uma
  decisão explícita do responsável; nada de integração genérica (padrão #10334/#10419). A
  consulta de siblings usa essa mesma lista de permissões em vez de repeti-la como um literal
  SQL, portanto ampliá-la continua sendo uma alteração de uma única linha.
- **Rotação do IP de saída, em ambas as direções**: a janela de consulta (24h) é muito
  maior que o TTL do cache de IP de saída (5 min), portanto o "último IP conhecido" é histórico,
  não o estado atual. Se o proxy de uma conexão tiver rotacionado dentro da janela, o
  bloqueio poderá **não detectar** um IP realmente compartilhado (o IP registrado é o novo,
  não esgotado) — e, simetricamente, poderá **aplicar cooldown a um sibling que desde então
  deixou de usar** o IP esgotado. O segundo caso custa a esse sibling uma
  janela de cooldown; ambos são aceitos como limitações de melhor esforço de uma consulta
  baseada em histórico.
- **Custo**: duas varreduras limitadas de `proxy_logs` (filtradas por janela via
  `idx_pl_timestamp`), apenas na frequência de erros 429. Nenhum índice novo (migração 134
  YAGNI). Medido em uma cópia de tamanho moderado de um banco de dados com tráfego real; uma
  instância de alto throughput mantém proporcionalmente mais linhas na mesma janela.

---

## Outros recursos de resiliência

- **19 estratégias de roteamento** (prioridade, ponderada, round-robin, retransmissão de contexto, preenchimento prioritário, p2c, aleatória, menos usada, otimizada por custo, ciente de redefinição, janela de redefinição, margem disponível, estritamente aleatória, automática, lkgp, otimizada por contexto, otimizada por cache, fusão, pipeline) — consulte [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Roteamento ciente de redefinição** (v3.8.0) — prioriza conexões pelo tempo de redefinição da cota.
- **Degradação do modo em segundo plano** — `background: true` da Responses API é degradado para o modo síncrono com um aviso.
- **Detecção dinâmica do limite de ferramentas** — recua os provedores quando os limites de quantidade de ferramentas são atingidos.
- **Fallback de emergência** — controlado por `OMNIROUTE_EMERGENCY_FALLBACK`; os operadores podem substituí-lo na página Feature Flags sem reiniciar.

---

## Depuração

- Respostas da combinação ponderada `503 all_targets_cooling_down` (`Retry-After` definido, `diagnostics.excluded` lista todos os destinos com `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → o pool está configurado e conectado; todos os destinos estão apenas excluídos por um temporizador de resiliência. O aviso `[COMBO] Weighted selection: every target excluded before dispatch — …` informa os motivos e os segundos restantes. Um `404 no_executable_targets` da mesma combinação significa que nenhum temporizador de resiliência esteve envolvido (não há nada para executar ou todas as contas falharam na verificação de disponibilidade). Implementado em `open-sse/services/combo/pinRecovery.ts` com base nas exclusões coletadas em `targetResolution.ts`.
- Todas as chaves de um provedor foram ignoradas → verifique tanto o estado do circuit breaker QUANTO o `rateLimitedUntil`/`testStatus` de cada conexão.
- Provedor permanentemente excluído após a janela de redefinição → o código está lendo o `state` bruto em vez de `getStatus()`/`canExecute()`.
- Uma chave falha, mas as outras deveriam funcionar → prefira o cooldown da conexão ao circuit breaker.
- Apenas um modelo falha → prefira o bloqueio do modelo ao cooldown da conexão.
- O estado deveria se recuperar automaticamente, mas não se recupera → verifique se há um timestamp futuro e um caminho de leitura que atualize o estado expirado. Status permanentes exigem alterações manuais.

---

## Impressão digital TLS e furtividade

A furtividade específica do provedor (JA3/JA4, CCH, ofuscação) está documentada separadamente — consulte `docs/security/STEALTH_GUIDE.md` (git; não compilado em `/docs`).

---

## Testes de resiliência (Fase 8 · Bloco C)

Além dos testes unitários da lógica de resiliência, três testes exercitam o runtime sob
condições reais de estresse/falha (todos de integração/noturnos — nenhum bloqueia PRs):

| Teste                   | O que faz                                                                                                                                                                                 | Execução                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Caos                    | Um nó upstream simulado injeta latência/redefinição/timeout/503 reais; valida que o circuit breaker abre/se recupera e que `checkFallbackError` classifica 503 como fallback recuperável. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Crescimento do heap     | ~500 streams por `createSSEStream` com `--expose-gc`; falha se o heap crescer além do limite máximo (proteção contra OOM #3069).                                                          | `npm run test:heap`                      |
| Teste prolongado com k6 | Carga contínua contra `/api/monitoring/health`; limites de p95/erros.                                                                                                                     | `k6 run tests/load/k6-soak.js` (noturno) |

Orquestrado por `.github/workflows/nightly-resilience.yml` (cron + acionamento manual). No
`test:integration` padrão, os testes de caos e heap são ignorados automaticamente (sem `RUN_CHAOS_INT`/`--expose-gc`).

---

## Veja também

- [Guia de arquitetura](./ARCHITECTURE.md) — Arquitetura e componentes internos do sistema
- [Guia do usuário](../guides/USER_GUIDE.md) — Provedores, combos e integração com a CLI
- [Mecanismo de combo automático](../routing/AUTO-COMBO.md) — Pontuação de 16 fatores e pacotes de modos
