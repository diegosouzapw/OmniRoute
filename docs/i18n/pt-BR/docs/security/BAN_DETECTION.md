# Account-Ban / Banned-Keyword Detection (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

O OmniRoute examina as respostas de erro do upstream em busca de sinais que indiquem que uma
**conta do provedor está permanentemente inutilizada** (suspensa / desativada / banida por violação dos Termos de Serviço) e, quando
há uma correspondência, move essa conexão para um **estado terminal `banned`**, de modo que ela não seja mais
selecionada para solicitações. É isso que o cartão de configurações **Segurança → Palavras-chave de banimento**
configura ("Palavras-chave adicionais que acionam a detecção de banimento permanente da
conta. As palavras-chave integradas sempre são aplicadas.").

Esta página documenta a lista integrada, o fluxo de detecção, seu escopo, como adicionar
palavras-chave personalizadas com segurança e como recuperar uma conexão sinalizada. O próprio
estado terminal faz parte do modelo de resiliência — consulte
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Estados terminais").

**Fonte da verdade:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Palavras-chave integradas

Estas 8 substrings sempre são aplicadas (sem diferenciar maiúsculas de minúsculas), independentemente de qualquer lista personalizada:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Esta lista evolui à medida que os provedores alteram a redação usada para banimentos. A cópia
> oficial é `ACCOUNT_DEACTIVATED_SIGNALS` em `open-sse/services/accountFallback.ts`;
> considere o bloco acima como um retrato do momento.

Duas tabelas de sinais adjacentes e **separadas** ficam no mesmo arquivo e _não_ fazem parte
da detecção por palavras-chave de banimento:

- `CREDITS_EXHAUSTED_SIGNALS` — cobrança/cota esgotada (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → estado terminal `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **não terminal**; uma atualização de token pode recuperar a conexão.

Observação: frases transitórias comuns, como **`rate limit`** / `429`, são tratadas pelo
fluxo de limitação de taxa / cooldown da conexão e **não** são sinais de banimento.

## Fluxo de detecção

```
resposta de erro do upstream
  → corpo convertido em string + transformado em minúsculas
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [correspondência de substring]
  → houve correspondência?
      → connection testStatus = "banned"      (permanente — cooldown de 1 ano, nunca se recupera automaticamente)
      → se a configuração `autoDisableBannedAccounts` estiver ativada e `autoDisableBannedScope`
        incluir esta conexão (`all`, ou `subscription` para OAuth/cookie/sessão)
        → também define isActive = false. Chaves de API pré-pagas permanecem ativas quando o escopo é
        `subscription`.
      → a conexão é ignorada durante a seleção de contas (status QUOTA_BLOCKING do combo)
```

- A correspondência é uma pesquisa de **substring sem diferenciar maiúsculas de minúsculas** no **corpo** da resposta
  (`isAccountDeactivated`, `accountFallback.ts`).
- A terminalização permanente como `banned` ocorre quando o corpo contém um sinal de banimento em **qualquer
  status HTTP** (por meio de `markAccountUnavailable` → `checkFallbackError`). O rótulo mais
  específico **`deactivated`** (`isActive=false` quando a conexão não possui
  chaves de API adicionais) é gravado pelo fluxo inline de `chatCore.ts` em **HTTP 401 / 403**
  (classificado por meio de `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Observe que o
  fluxo de `markAccountUnavailable()` grava um status terminal _diferente_ —
  **`expired`** — para o mesmo sinal `ACCOUNT_DEACTIVATED` (por meio de
  `resolveTerminalConnectionStatus`), portanto o mesmo banimento pode aparecer como
  `deactivated` ou `expired`, dependendo de qual fluxo tratou a resposta. (O
  comentário mais antigo no código diz "quando o corpo de uma resposta 401 contém estas strings" — isso
  não representa completamente o comportamento atual.)
- Uma conexão `banned` é excluída da seleção em todos os locais onde os status terminais
  são filtrados (`isTerminalConnectionStatus`, `QUOTA_BLOCKING_CONNECTION_STATUSES` do combo).

## Escopo — quais provedores são verificados

**Todos os provedores.** A verificação é executada no pipeline genérico de tratamento
de erros pelo qual passa toda solicitação upstream com falha — ela **não** é restrita
a scrapers de OAuth/assinatura. O estado terminal resultante é por **conexão**,
não por provedor.

Ainda assim, as _strings_ integradas são voltadas a provedores de assinatura/OAuth
com risco real de banimento (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). Um provedor com chave de API só acionará o detector se o corpo do erro
contiver literalmente uma das substrings.

`autoDisableBannedScope` (`all` | `subscription`, padrão `all`) controla se
uma correspondência também define `isActive=false`. `subscription` significa licenças
baseadas em login (assinaturas pagas e contas gratuitas, incluindo sessões com cookies
da Web). O sistema ainda registra `testStatus=banned` para chaves de API pré-pagas,
mas as mantém no pool de roteamento. O projeto definitivo prevê uma substituição por
provedor e por conta; o enum global é a primeira implementação.

## Palavras-chave personalizadas de banimento

Adicione ou remova palavras-chave em **Segurança → Palavras-chave de banimento** (persistidas como
a configuração global `customBannedSignals` por meio de `PATCH /api/settings`). Elas são **adicionadas à**
lista integrada — nunca a substituem — e são recarregadas a quente ao salvar (e na inicialização)
por meio de `setCustomBannedSignals()`. Cada palavra-chave é limitada a 200 caracteres; não há
limite para o tamanho do array.

**⚠ Risco de falso positivo — escolha frases específicas.** A detecção usa uma correspondência
bruta de substring em todo o corpo da resposta, e uma correspondência é **permanente** (cooldown
de 1 ano, recuperação manual). Uma palavra-chave genérica pode banir uma conexão perfeitamente saudável:

- **Ruim:** `quota`, `limit`, `error`, `denied` — aparecem em muitos erros transitórios.
- **Bom:** frases completas de banimento, por exemplo, `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Prefira a frase inequívoca mais longa que o provedor retorna em um banimento real. Em caso de
dúvida, observe primeiro o `lastError` da conexão e, depois, adicione o texto exato.

## Recuperação de uma conexão sinalizada

Os estados terminais `banned` / `deactivated` **nunca se recuperam automaticamente** (eles são excluídos
do ciclo de recuperação proativa — apenas os cooldowns de `unavailable` se recuperam por conta
própria). Um operador deve removê-los explicitamente:

1. **Teste novamente a conexão** — a ação **Testar** do dashboard
   (`POST /api/providers/{id}/test`); uma verificação bem-sucedida redefine `testStatus` como
   `active` e limpa os campos de erro.
2. **Autentique novamente / edite as credenciais** — para provedores OAuth, execute novamente o fluxo
   de login / atualização; as rotas de criação/importação do provedor definem `isActive = true`.
3. **Reative a conexão** — se a desativação automática tiver definido `isActive = false`
   (escopo `all`, ou `subscription` para uma conexão OAuth/cookie/sessão),
   ative-a novamente após corrigir a conta.

Não há um botão separado para "limpar o sinalizador de banimento" — a recuperação ocorre por novo teste,
nova autenticação ou reativação, de acordo com a regra geral de estado terminal em
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Isolamento de sondagem (test-all de modelos)

Uma **falha originada por sondagem** (despachos de test-all de modelos / verificação de integridade executados
dentro de `runAsProbe`) nunca remove uma conexão do pool (#9817): ela é
**registrada para visibilidade** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`), mas ignora **todas** as mutações de roteamento — cooldowns, estado
terminal (`banned` / `deactivated` / `credits_exhausted`), bloqueios por modelo,
o circuit breaker do provedor, o cache de cota de 5 minutos, a atualização do token OAuth
e a desativação automática. Somente uma falha no caminho de uma solicitação real causa desativação. O erro
registrado é o que torna uma conta sinalizada visível no dashboard enquanto ela continua
atendendo ao tráfego.

O ponto único de decisão é `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), consultado por **todos** os locais que poderiam
alterar o estado de roteamento em decorrência de uma falha originada por sondagem:

- `markAccountUnavailable` (`auth.ts`) — somente registro (`lastError` com o texto bruto,
  `lastErrorType`, `errorCode`, `lastErrorAt`; deliberadamente **sem**
  `backoffLevel`, que acionaria a redução automática no momento da seleção e apagaria
  o registro)
- `maybeAutoDisableBannedAccount` — sem desativação automática
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (somente registro,
  sem `credits_exhausted` terminal), GEO_BLOCKED (sem exclusão por 24h),
  MODEL_NOT_FOUND (sem `lockModel`), o failover de rotação de contas do codex por 429
  (sem `markCodexScopeRateLimited`, sem `rate_limited_until` persistido, sem
  limpeza da afinidade de sessão), `persistCodexQuotaState` (sem gravação do estado da cota,
  sem invalidação do cache), `recordKeyHealthStatus` (rotacionador de integridade da chave
  inalterado)
- Atualização OAuth — tanto a atualização proativa na base do executor
  (`base.ts` `execute()`, sem consumir a rotação do token de atualização) quanto o
  caminho reativo de 401/403 em `chatCore` (sem desativação por `expired`)
- `chat.ts` — o circuit breaker do provedor e o cache de cota de 5 minutos
  (`markAccountExhaustedFrom429`) nunca são degradados

O erro registrado é o que torna uma conta sinalizada visível no dashboard
enquanto ela continua atendendo ao tráfego. Observação: o registro da sondagem armazena o texto de erro
**bruto** (não recortado), diferentemente do truncamento com `slice(0,100)` usado no caminho real.

Os operadores que usam test-all como uma ferramenta de manutenção podem restaurar o comportamento
histórico (a sondagem conta como uma geração real) por meio de uma destas opções:

- a configuração `probeCanDisable` (`POST /api/settings` com
  `{"probeCanDisable": true}`, ou uma edição direta de `key_value` no banco de dados), ou
- a feature flag **`PROBE_CAN_DISABLE=true`** (substituição por variável de ambiente ou banco de dados; tem precedência sobre a
  configuração).

Mecanismo de segurança: se a consulta da flag ou das configurações lançar uma exceção, o isolamento permanecerá ATIVADO.

## Arquivos-fonte

| Aspecto                                                            | Arquivo                                                                                                       |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Tabelas de sinais + correspondência                                | `open-sse/services/accountFallback.ts`                                                                        |
| Finalização / persistência                                         | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Escopo da desativação automática                                   | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Classificação inline                                               | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Exclusão da recuperação de estado terminal                         | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Carregamento em tempo de execução de palavras-chave personalizadas | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Interface de configurações                                         | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
