# Account-Ban / Banned-Keyword Detection (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

O OmniRoute analisa as respostas de erro dos serviços a montante em busca de sinais que indiquem que uma
**conta de fornecedor está permanentemente inutilizável** (suspensa / desativada / banida por violação dos Termos de Serviço) e, quando
encontra uma correspondência, move essa ligação para um **estado terminal `banned`**, para que deixe de ser
selecionada para pedidos. É isto que configura o cartão de definições **Security → Banned Keywords**
("Palavras-chave adicionais que acionam a deteção de banimento permanente da
conta. As palavras-chave incorporadas aplicam-se sempre.").

Esta página documenta a lista incorporada, o fluxo de deteção, o respetivo âmbito, como adicionar
palavras-chave personalizadas de forma segura e como recuperar uma ligação sinalizada. O próprio estado
terminal faz parte do modelo de resiliência — consulte
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Estados terminais").

**Fonte fidedigna:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Palavras-chave incorporadas

Estas 8 substrings aplicam-se sempre (sem distinção entre maiúsculas e minúsculas), independentemente de qualquer lista personalizada:

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

> Esta lista evolui à medida que os fornecedores alteram a terminologia dos banimentos. A cópia
> fidedigna é `ACCOUNT_DEACTIVATED_SIGNALS` em `open-sse/services/accountFallback.ts`;
> considere o bloco acima como uma captura pontual.

Existem duas tabelas de sinais adjacentes e **separadas** no mesmo ficheiro, que _não_ fazem parte
da deteção por palavras-chave de banimento:

- `CREDITS_EXHAUSTED_SIGNALS` — faturação/quota esgotada (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → estado terminal `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **não terminal**; uma atualização do token pode permitir a recuperação.

Nota: expressões transitórias comuns como **`rate limit`** / `429` são processadas pelo
fluxo de limitação de pedidos / período de espera da ligação e **não** são sinais de banimento.

## Fluxo de deteção

```
resposta de erro do serviço a montante
  → corpo convertido em string + convertido para minúsculas
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [correspondência de substring]
  → correspondência?
      → testStatus da ligação = "banned"      (permanente — período de espera de 1 ano, nunca recupera automaticamente)
      → se a definição `autoDisableBannedAccounts` estiver ativa e `autoDisableBannedScope`
        incluir esta ligação (`all` ou `subscription` para OAuth/cookie/sessão)
        → também isActive = false. As chaves de API pré-pagas permanecem ativas quando o âmbito é
        `subscription`.
      → a ligação é ignorada durante a seleção de contas (estados QUOTA_BLOCKING combinados)
```

- A correspondência consiste numa pesquisa de **substring sem distinção entre maiúsculas e minúsculas** no **corpo** da resposta
  (`isAccountDeactivated`, `accountFallback.ts`).
- A terminalização permanente como `banned` é acionada quando o corpo contém um sinal de banimento, com **qualquer
  estado HTTP** (através de `markAccountUnavailable` → `checkFallbackError`). A
  etiqueta mais restrita **`deactivated`** (`isActive=false` quando a ligação não tem
  chaves de API suplentes) é escrita pelo fluxo inline de `chatCore.ts` em **HTTP 401 / 403**
  (classificado através de `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Tenha em atenção que o
  fluxo `markAccountUnavailable()` escreve um estado terminal _diferente_ —
  **`expired`** — para o mesmo sinal `ACCOUNT_DEACTIVATED` (através de
  `resolveTerminalConnectionStatus`), pelo que o mesmo banimento pode surgir como
  `deactivated` ou `expired`, consoante o fluxo que processou a resposta. (O
  comentário no código mais antigo diz "quando o corpo de uma resposta 401 contém estas strings" — isto
  subestima o comportamento atual.)
- Uma ligação `banned` é excluída da seleção em todos os locais onde os estados terminais
  são filtrados (`isTerminalConnectionStatus`, `QUOTA_BLOCKING_CONNECTION_STATUSES` combinado).

## Âmbito — que fornecedores são analisados

**Todos os fornecedores.** A verificação é executada no pipeline genérico de tratamento de erros pelo qual passam todos os pedidos upstream que falham — **não** está limitada aos scrapers de OAuth/subscrições. O estado terminal resultante aplica-se por **ligação**, não por fornecedor.

Ainda assim, as _strings_ incorporadas estão orientadas para fornecedores de subscrições/OAuth com risco real de bloqueio (ChatGPT Web Codex, Claude Web, Codex, Muse Spark, Antigravity). Um fornecedor com chave de API apenas acionará o detetor se o corpo do erro contiver literalmente uma das substrings.

`autoDisableBannedScope` (`all` | `subscription`, predefinição `all`) controla se uma correspondência também define `isActive=false`. `subscription` refere-se a acessos do tipo início de sessão (subscrições pagas e contas gratuitas, incluindo sessões com cookies da Web). Continua a registar `testStatus=banned` para chaves de API pré-pagas, mas mantém-nas no conjunto de encaminhamento. A solução duradoura consiste numa substituição por fornecedor e por conta; a enumeração global é a primeira implementação.

## Palavras-chave de bloqueio personalizadas

Adicione ou remova palavras-chave em **Segurança → Palavras-chave de bloqueio** (persistidas como a definição global `customBannedSignals` através de `PATCH /api/settings`). Estas são **adicionadas à** lista incorporada — nunca a substituem — e são recarregadas imediatamente ao guardar (e no arranque) através de `setCustomBannedSignals()`. Cada palavra-chave está limitada a 200 caracteres; não existe qualquer limite para o comprimento do array.

**⚠ Risco de falsos positivos — escolha expressões específicas.** A deteção consiste numa correspondência simples de substring em todo o corpo da resposta, e uma correspondência é **permanente** (período de suspensão de 1 ano, recuperação manual). Uma palavra-chave demasiado abrangente pode bloquear uma ligação perfeitamente funcional:

- **Mau:** `quota`, `limit`, `error`, `denied` — aparecem em muitos erros transitórios.
- **Bom:** frases de bloqueio completas, por exemplo, `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Prefira a expressão inequívoca mais longa que o fornecedor devolve perante um bloqueio real. Em caso de dúvida, observe primeiro o `lastError` da ligação e, em seguida, adicione o texto exato.

## Recuperar uma ligação sinalizada

Os estados terminais `banned` / `deactivated` **nunca recuperam automaticamente** (são excluídos do ciclo de recuperação proativa — apenas os períodos de suspensão `unavailable` recuperam por si próprios). Um operador tem de os limpar explicitamente:

1. **Voltar a testar a ligação** — a ação **Testar** do painel
   (`POST /api/providers/{id}/test`); uma sondagem bem-sucedida repõe `testStatus`
   como `active` e limpa os campos de erro.
2. **Voltar a autenticar/editar as credenciais** — para fornecedores OAuth, execute novamente o fluxo de início de sessão/atualização; as rotas de criação/importação do fornecedor definem `isActive = true`.
3. **Reativar a ligação** — se a desativação automática tiver definido `isActive = false`
   (âmbito `all`, ou `subscription` para uma ligação OAuth/cookie/sessão),
   volte a ativá-la após corrigir a conta.

Não existe um botão separado para «limpar o indicador de bloqueio» — a recuperação é feita através de um novo teste, uma nova autenticação ou uma reativação, em conformidade com a regra geral de estados terminais descrita em
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Isolamento de sondagens (testar todos os modelos)

Uma **falha com origem numa sondagem** (ações de testar todos os modelos/verificação de integridade executadas dentro de `runAsProbe`) nunca remove uma ligação do conjunto (#9817): é **registada para fins de visibilidade** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`), mas ignora **todas** as alterações ao encaminhamento — períodos de suspensão, estado terminal (`banned` / `deactivated` / `credits_exhausted`), bloqueios por modelo, disjuntor do fornecedor, cache de quotas de 5 minutos, atualização do token OAuth e desativação automática. Apenas uma falha no caminho de pedidos provoca a desativação. O erro registado é o que torna uma conta sinalizada visível no painel, enquanto esta continua a servir tráfego.

O único ponto de decisão é `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), consultado por **todos** os locais que possam alterar o estado do encaminhamento devido a uma falha com origem numa sondagem:

- `markAccountUnavailable` (`auth.ts`) — apenas registo (`lastError` com o texto bruto,
  `lastErrorType`, `errorCode`, `lastErrorAt`; deliberadamente **sem**
  `backoffLevel`, que acionaria a redução automática no momento da seleção e eliminaria
  o registo)
- `maybeAutoDisableBannedAccount` — sem desativação automática
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (apenas registo,
  sem o estado terminal `credits_exhausted`), GEO_BLOCKED (sem exclusão durante 24 h),
  MODEL_NOT_FOUND (sem `lockModel`), o failover de rotação de contas do Codex em caso de 429
  (sem `markCodexScopeRateLimited`, sem `rate_limited_until` persistido, sem
  limpeza da afinidade de sessão), `persistCodexQuotaState` (sem escrita do estado
  da quota, sem invalidação da cache), `recordKeyHealthStatus` (rotador do estado
  das chaves inalterado)
- Atualização OAuth — tanto a atualização proativa na base do executor
  (`base.ts` `execute()`, sem consumir a rotação do token de atualização) como o
  caminho reativo 401/403 em `chatCore` (sem desativação `expired`)
- `chat.ts` — o disjuntor do fornecedor e a cache de quotas de 5 minutos
  (`markAccountExhaustedFrom429`) nunca são degradados

O erro registado é o que torna uma conta sinalizada visível no painel, enquanto esta continua a servir tráfego. Nota: o registo da sondagem armazena o texto do erro **bruto** (não cortado), ao contrário do truncamento `slice(0,100)` aplicado no caminho real.

Os operadores que utilizem a funcionalidade de testar tudo como ferramenta de manutenção podem repor o comportamento histórico (a sondagem conta como uma geração real) através de uma das seguintes opções:

- a definição `probeCanDisable` (`POST /api/settings` com
  `{"probeCanDisable": true}`, ou uma edição direta de `key_value` na base de dados), ou
- a flag de funcionalidade **`PROBE_CAN_DISABLE=true`** (variável de ambiente ou substituição na base de dados; tem precedência sobre a definição).

Mecanismo de segurança: se a consulta da flag ou das definições gerar uma exceção, o isolamento permanece ATIVADO.

## Ficheiros de origem

| Área                                                               | Ficheiro                                                                                                      |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Tabelas de sinais + correspondência                                | `open-sse/services/accountFallback.ts`                                                                        |
| Finalização / persistência                                         | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Âmbito da desativação automática                                   | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Classificação inline                                               | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Exclusão da recuperação do estado terminal                         | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Carregamento em tempo de execução de palavras-chave personalizadas | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Interface de definições                                            | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
