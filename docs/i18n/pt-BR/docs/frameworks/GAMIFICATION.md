# Gamification & Leaderboard System (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Fonte da verdade:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute inclui uma camada de gamificação local-first que recompensa os usuários por
interagirem com a plataforma — fazendo solicitações, alternando provedores, criando
combos, compartilhando tokens e contribuindo com a comunidade. Todo o estado reside no
SQLite; a federação com servidores da comunidade é opcional e baseada em push.

O sistema foi projetado para ter **latência zero no caminho crítico** — os eventos de
gamificação são disparados no modo fire-and-forget pelo pipeline de solicitações e nunca bloqueiam
uma resposta do LLM.

---

## Visão geral

### Objetivo

Aumentar o engajamento e a retenção dos usuários fornecendo progresso visível (XP,
níveis, emblemas), prova social (rankings) e incentivos econômicos (compartilhamento de
tokens, recompensas por convite).

### Escopo

| Recurso                    | Descrição                                                                         |
| -------------------------- | --------------------------------------------------------------------------------- |
| XP e níveis                | Ganhe XP por ação; suba de nível seguindo uma curva polinomial                    |
| Emblemas                   | Mais de 20 conquistas em 5 categorias com 4 níveis de raridade                    |
| Sequências                 | Monitoramento do uso ativo diário com sequência atual/mais longa                  |
| Rankings                   | Escopos global, semanal, mensal, compartilhamento de tokens e contribuição        |
| Compartilhamento de tokens | Transfira créditos entre usuários por meio de um livro-razão de partidas dobradas |
| Convite e resgate          | Códigos de indicação com armazenamento de hashes SHA-256                          |
| Servidores da comunidade   | Federação com instâncias externas do OmniRoute                                    |
| Antitrapaça                | Pontuação no servidor, limitação de taxa e detecção de anomalias por escore z     |

### Princípios de design

1. **Local-first** — todo o estado no SQLite, sem necessidade de serviços externos.
2. **Não bloqueante** — os eventos usam fire-and-forget; o caminho de resposta do LLM
   nunca sofre atrasos pela lógica de gamificação.
3. **Servidor como autoridade** — o XP é calculado somente no servidor; os clientes não podem
   inflar as pontuações.
4. **Respeito à privacidade** — a participação nos rankings é opcional; os usuários podem
   ocultar seu perfil.
5. **Pronto para federação** — os servidores da comunidade podem enviar pontuações por uma API assinada;
   a sincronização substitui os dados, em vez de adicioná-los.

---

## Arquitetura

### Fluxo de alto nível

```
Solicitação do cliente
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (pipeline existente) ...
      → resposta upstream enviada ao cliente
      → setImmediate (fire-and-forget):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

O emissor de eventos é o único ponto de integração. `chatCore.ts` chama
`emitGamificationEvent()` após o envio da resposta; o módulo de eventos distribui
o processamento entre os subsistemas de XP, sequências, emblemas, rankings e antitrapaça.

### Grafo de dependências dos módulos

```
src/lib/gamification/
  events.ts          ← ponto de entrada (chamado por chatCore.ts)
    ├── xp.ts        ← cálculo de XP e determinação de nível
    ├── streaks.ts   ← monitoramento de sequências de atividade diária
    ├── badges.ts    ← avaliação dos critérios de emblemas
    ├── leaderboard.ts ← cálculo de classificação e transmissão por SSE
    ├── antiCheat.ts ← limitação de taxa e detecção de anomalias
    ├── sharing.ts   ← livro-razão de transferência de tokens
    ├── invites.ts   ← gerenciamento de códigos de convite/resgate
    ├── servers.ts   ← federação de servidores da comunidade
    └── notifications.ts ← fluxo de notificações SSE

src/lib/db/
  gamification.ts    ← todas as operações CRUD (8 tabelas)

src/app/api/gamification/
  leaderboard/       ← GET classificações, POST atualização manual
  leaderboard/stream ← atualizações em tempo real por SSE
  transfer/          ← GET histórico, POST envio de tokens
  invite/            ← GET/POST códigos, DELETE revogação
  invite/redeem/     ← POST resgate de um código
  servers/           ← GET/POST/DELETE servidores da comunidade
  federation/score/  ← POST envio de pontuação ao servidor
  federation/leaderboard/ ← GET obtenção do ranking do servidor
  notifications/     ← notificações SSE de emblemas/subida de nível
  anomalies/         ← GET relatórios de anomalias (administrador)
  rotate/            ← POST rotação dos segredos de tokens de convite
```

---

## Camada de Dados

### Tabelas do Banco de Dados

Todas as tabelas residem no banco de dados SQLite principal do OmniRoute, criado pela migração
`060_create_gamification.sql`. O modo de registro WAL é herdado da instância singleton
`getDbInstance()` em `src/lib/db/core.ts`.

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ api_key_id    TEXT PK    │
│ api_key_id    TEXT      │     │ xp            INTEGER    │
│ scope         TEXT      │     │ level         INTEGER    │
│ score         INTEGER   │     │ title         TEXT       │
│ period        TEXT      │     │ updated_at    TEXT       │
│ updated_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────┐     ┌──────────────────────────┐
│     user_badges         │     │    badge_definitions     │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ badge_id      TEXT FK   │     │ category      TEXT       │
│ earned_at     TEXT      │     │ rarity        TEXT       │
│ notified      INTEGER   │     │ criteria_type TEXT       │
└─────────────────────────┘     │ criteria      TEXT(JSON) │
                                │ description   TEXT       │
                                │ icon          TEXT       │
                                │ hidden        INTEGER    │
                                └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│     xp_audit_log        │     │     token_ledger         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ from_key_id   TEXT       │
│ action        TEXT      │     │ to_key_id     TEXT       │
│ xp_awarded    INTEGER   │     │ amount        INTEGER    │
│ metadata      TEXT(JSON)│     │ idempotency_key TEXT UQ  │
│ created_at    TEXT      │     │ created_at    TEXT       │
└─────────────────────────┘     └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│    invite_tokens        │     │   community_servers      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ code          TEXT UQ   │     │ url           TEXT       │
│ token_hash    TEXT      │     │ token_hash    TEXT       │
│ uses          INTEGER   │     │ status        TEXT       │
│ max_uses      INTEGER   │     │ last_sync     TEXT       │
│ created_at    TEXT      │     │ created_at    TEXT       │
│ expires_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
```

### Módulo de Domínio: `src/lib/db/gamification.ts`

Segue o padrão habitual do OmniRoute — importa `getDbInstance()` de
`core.ts` e exporta funções CRUD tipadas. Não há SQL bruto nos manipuladores de rota.

Funções principais:

| Função                     | Descrição                                                     |
| -------------------------- | ------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Insere ou atualiza a pontuação de (api_key_id, scope, period) |
| `getLeaderboard()`         | Classificações paginadas para determinado escopo/período      |
| `getUserLevel()`           | Obtém ou cria o registro de nível do usuário                  |
| `updateUserLevel()`        | Define XP, nível e título atomicamente                        |
| `getBadgeDefinitions()`    | Todas as definições de medalhas (com filtro opcional)         |
| `getUserBadges()`          | Medalhas conquistadas por um usuário                          |
| `awardBadge()`             | Insere a conquista da medalha (idempotente em badge_id)       |
| `logXpAction()`            | Acrescenta uma entrada a xp_audit_log                         |
| `getXpAuditLog()`          | Histórico de auditoria paginado de um usuário                 |
| `insertLedgerEntry()`      | Transferência por partidas dobradas (em uma transação)        |
| `getBalance()`             | Soma do valor recebido menos o enviado por um usuário         |
| `getTransferHistory()`     | Registro paginado de transferências                           |
| `createInviteToken()`      | Insere um código de convite e um token com hash               |
| `redeemInviteToken()`      | Busca pelo código, valida e incrementa o número de usos       |
| `upsertCommunityServer()`  | Registra ou atualiza um servidor de federação                 |
| `getCommunityServers()`    | Lista os servidores de um usuário                             |
| `deleteCommunityServer()`  | Remove o registro de um servidor                              |

---

## Sistema de XP / Níveis

**Arquivo:** `src/lib/gamification/xp.ts`

### Curva de Níveis

O XP necessário para alcançar o nível `n` segue uma curva polinomial:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Nível | XP para o Próximo | XP Acumulado | Título       |
| ----- | ----------------- | ------------ | ------------ |
| 1     | 100               | 100          | Iniciante    |
| 5     | 1,118             | 2,415        | Iniciante    |
| 10    | 3,162             | 10,523       | Explorador   |
| 25    | 12,500            | 86,024       | Explorador   |
| 50    | 35,355            | 345,529      | Especialista |
| 75    | 64,952            | 948,683      | Mestre       |
| 100   | 100,000           | 2,050,000    | Lenda        |

### Títulos

| Faixa de Níveis | Título       |
| --------------- | ------------ |
| 1 – 9           | Iniciante    |
| 10 – 24         | Explorador   |
| 25 – 49         | Especialista |
| 50 – 74         | Mestre       |
| 75 – 100        | Lenda        |

### Recompensas de XP

| Ação              | XP  | Descrição                                                                 |
| ----------------- | --- | ------------------------------------------------------------------------- |
| `request`         | 1   | Por solicitação de API roteada pelo OmniRoute                             |
| `provider_switch` | 5   | Trocar para um provedor diferente                                         |
| `model_switch`    | 3   | Trocar para um modelo diferente                                           |
| `combo_create`    | 10  | Criar um novo combo                                                       |
| `combo_use`       | 2   | Usar um combo para uma solicitação                                        |
| `token_share`     | 1   | Por 1.000 tokens compartilhados com outro usuário                         |
| `invite_redeem`   | 50  | Resgatar um código de convite                                             |
| `daily_login`     | 5   | Uso ativo diário (uma vez por dia)                                        |
| `streak_bonus`    | 2   | Por dia consecutivo de sequência (multiplicado pela duração da sequência) |
| `badge_unlock`    | 10  | Desbloquear uma medalha                                                   |

### Fluxo de Concessão

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Consulte `XP_REWARDS[action]` para obter a quantidade de XP.
2. Passe por `checkRateLimit()` (antitrapaça: máximo de 1000 XP/min por chave).
3. Abra uma transação:
   - Leia a linha atual de `user_levels`.
   - Adicione o XP; recalcule o nível por meio de `levelFromXp(totalXp)`.
   - Se o nível mudou, defina `levelUp = true`.
   - Atualize a linha de `user_levels`.
   - Insira em `xp_audit_log`.
4. Retorne o resultado. O chamador lida com as notificações.

### Função Auxiliar: `levelFromXp(totalXp)`

Percorre os níveis de 1 a 100, somando `xp_for_level(n)` até que o XP acumulado
exceda `totalXp`. Retorna o nível mais alto cujo limite foi atingido.
Isso é O(100) — aceitável, pois os níveis são limitados a 100.

---

## Sistema de Medalhas

**Arquivo:** `src/lib/gamification/badges.ts`

### Categorias

| Categoria      | Descrição                               | Exemplos de Medalhas                                       |
| -------------- | --------------------------------------- | ---------------------------------------------------------- |
| `usage`        | Marcos baseados em volume               | Primeira Solicitação, 1K Solicitações, 100K                |
| `sharing`      | Compartilhamento de tokens e indicações | Primeiro Compartilhamento, Generoso (10 compartilhamentos) |
| `contribution` | Engajamento com a comunidade            | Criador de Combos, Explorador de Provedores                |
| `streak`       | Consistência ao longo do tempo          | Guerreiro Semanal, Devoto Mensal                           |
| `rare`         | Conquistas difíceis de obter ou ocultas | Usuário Inicial, Relator de Bugs                           |

### Raridades

| Raridade    | Cor     | Indicação de Probabilidade |
| ----------- | ------- | -------------------------- |
| `common`    | Cinza   | Maioria dos usuários       |
| `uncommon`  | Verde   | Usuários ativos            |
| `rare`      | Azul    | Usuários dedicados         |
| `legendary` | Dourado | 1% dos melhores            |

### Tipos de Critérios

| Tipo           | Campo        | Descrição                                                  |
| -------------- | ------------ | ---------------------------------------------------------- |
| `action_count` | `count`      | Realizar uma ação N vezes (por exemplo, 1000 solicitações) |
| `streak`       | `days`       | Manter uma sequência por N dias consecutivos               |
| `unique_count` | `field`, `n` | Usar N valores únicos (por exemplo, 10 modelos diferentes) |
| `rank`         | `scope`, `n` | Alcançar a posição N no escopo de uma classificação        |
| `first`        | —            | Ser o primeiro a realizar uma ação                         |
| `hidden`       | (varia)      | Critérios não exibidos até serem conquistados              |

As definições de medalhas são armazenadas em `badge_definitions` como `criteria` em JSON:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Fluxo de Avaliação

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # todas as definições
    → getUserBadges(apiKeyId)         # já conquistadas (ignorar)
    → para cada medalha não conquistada:
       → matchesCriteria(badge, event, userState)
       → se corresponder: awardBadge(apiKeyId, badgeId)
         → retornar a carga útil da notificação
```

A avaliação é **orientada a eventos** — ela é executada após cada evento de gamificação, mas
verifica apenas as medalhas cujo `criteria.type` corresponde à ação do evento. Isso
mantém a avaliação rápida (< 5ms para a maioria dos eventos).

### `matchesCriteria(badge, event, userState)`

| Tipo de Critério | Verificação                                                       |
| ---------------- | ----------------------------------------------------------------- |
| `action_count`   | `getActionCount(apiKeyId, action) >= count`                       |
| `streak`         | `getCurrentStreak(apiKeyId) >= days`                              |
| `unique_count`   | `getUniqueCount(apiKeyId, field) >= n`                            |
| `rank`           | `getRank(apiKeyId, scope) <= n`                                   |
| `first`          | Nenhuma entrada anterior em `xp_audit_log` para esse tipo de ação |
| `hidden`         | Delega para a subverificação apropriada                           |

### Medalhas Integradas (20+)

<details>
<summary>Lista completa de medalhas</summary>

| Insígnia                  | Categoria        | Raridade | Critérios                         |
| ------------------------- | ---------------- | -------- | --------------------------------- |
| Primeiros Passos          | uso              | comum    | 1 solicitação                     |
| Começando a Aquecer       | uso              | comum    | 100 solicitações                  |
| Usuário Avançado          | uso              | incomum  | 1.000 solicitações                |
| Centurião                 | uso              | raro     | 10.000 solicitações               |
| OmniPower                 | uso              | lendário | 100.000 solicitações              |
| Explorador de Provedores  | contribuição     | comum    | Usar 5 provedores diferentes      |
| Mestre dos Provedores     | contribuição     | incomum  | Usar 20 provedores diferentes     |
| Arquiteto de Combos       | contribuição     | incomum  | Criar 5 combos                    |
| Grão-Mestre dos Combos    | contribuição     | raro     | Criar 25 combos                   |
| Primeiro Compartilhamento | compartilhamento | comum    | 1 transferência de tokens         |
| Generoso                  | compartilhamento | incomum  | 10 transferências de tokens       |
| Filantropo                | compartilhamento | raro     | Transferir 10.000 tokens no total |
| Indicador                 | compartilhamento | comum    | 1 indicação bem-sucedida          |
| Construtor de Redes       | compartilhamento | incomum  | 10 indicações bem-sucedidas       |
| Guerreiro Semanal         | sequência        | incomum  | Sequência de 7 dias               |
| Dedicação Mensal          | sequência        | raro     | Sequência de 30 dias              |
| Imparável                 | sequência        | lendário | Sequência de 365 dias             |
| Usuário Pioneiro          | raro             | lendário | Participar durante o período beta |
| Pioneiro da Compressão    | raro             | incomum  | Usar a compressão 100 vezes       |
| Colecionador de Skills    | raro             | raro     | Usar 10 skills diferentes         |
| Explorador de Modelos     | contribuição     | incomum  | Usar 15 modelos diferentes        |

</details>

---

## Rastreador de Sequências

**Arquivo:** `src/lib/gamification/streaks.ts`

### Modelo de Dados

As sequências são armazenadas na tabela `key_value` (tabela de utilitários compartilhada) sob chaves com namespace:

| Chave                         | Valor                            | Descrição                |
| ----------------------------- | -------------------------------- | ------------------------ |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Dados da sequência ativa |

### Lógica

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Ler o registro da sequência em `key_value`.
2. Analisar `{current}`, `{longest}`, `{lastDate}` (string de data ISO).
3. Se `lastDate === today` — nenhuma alteração (já contabilizado hoje).
4. Se `lastDate === yesterday` — incrementar `current`; atualizar `longest` se necessário.
5. Se `lastDate < yesterday` — redefinir `current = 1` (sequência interrompida).
6. Gravar o registro atualizado.
7. Verificar os marcos: 7, 14, 30, 60, 90, 180, 365 dias. Se algum for atingido, definir
   `milestone = true` (o chamador concede XP e verifica os emblemas).

### Casos Extremos

- **Fuso horário**: as sequências usam datas UTC (`new Date().toISOString().slice(0, 10)`).
  Isso é intencional — um único fuso horário canônico evita manipulações por meio
  da troca de fuso horário.
- **Novos usuários**: não existe registro de sequência; a primeira solicitação o cria com
  `current=1, longest=1, lastDate=today`.
- **Várias solicitações por dia**: somente a primeira solicitação do dia em UTC
  incrementa a sequência.

---

## Classificação

**Arquivo:** `src/lib/gamification/leaderboard.ts`

### Escopos

| Escopo          | Período | Descrição                                               |
| --------------- | ------- | ------------------------------------------------------- |
| `global`        | `all`   | XP acumulado de todos os tempos                         |
| `weekly`        | `week`  | XP obtido na semana UTC atual (segunda a domingo)       |
| `monthly`       | `month` | XP obtido no mês UTC atual                              |
| `tokens_shared` | `all`   | Total de tokens transferidos para outras pessoas        |
| `contributions` | `all`   | Combos criados + provedores usados + habilidades usadas |

### Cálculo da Posição

As posições são **calculadas no momento da leitura**, não armazenadas. Isso evita dados de posição desatualizados
e elimina a necessidade de tarefas periódicas de recálculo de posições.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Padrão da consulta:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Rotação de Períodos

As classificações semanais e mensais são alternadas automaticamente:

1. **Arquivar**: no limite do período, copiar as entradas atuais para
   `leaderboard_archive` com o rótulo do período.
2. **Redefinir**: excluir as entradas do período expirado.
3. **Acionamento**: verificado em cada chamada de `updateLeaderboard()`; a primeira solicitação
   de um novo período aciona a rotação.

Isso garante que as classificações semanais sejam redefinidas toda segunda-feira às 00:00 UTC e que as classificações mensais
sejam redefinidas no primeiro dia de cada mês.

### Atualizações em Tempo Real via SSE

**Endpoint:** `GET /api/gamification/stream`

```
Cliente → GET /api/gamification/stream
  → Conexão SSE estabelecida
  → O servidor envia imediatamente um snapshot dos 10 primeiros da classificação
  → A cada 5 segundos: envia os 10 primeiros atualizados se houver alterações
  → A cada 15 segundos: comentário de heartbeat (": heartbeat\n\n")
  → O cliente se desconecta → limpeza (remove o listener)
```

Formato do evento:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

O gerenciador SSE monitora os clientes conectados por escopo e envia atualizações somente
quando os dados da classificação realmente mudaram desde o último envio.

---

## Compartilhamento de Tokens

**Arquivo:** `src/lib/gamification/sharing.ts`

### Livro-Razão de Partidas Dobradas

Cada transferência cria duas linhas em `token_ledger`:

| Linha   | `from_key_id` | `to_key_id`  | `amount` |
| ------- | ------------- | ------------ | -------- |
| Débito  | remetente     | destinatário | +valor   |
| Crédito | destinatário  | remetente    | -valor   |

Aguarde — a convenção é:

| Linha       | `from_key_id` | `to_key_id`  | `amount` | Significado                 |
| ----------- | ------------- | ------------ | -------- | --------------------------- |
| Envio       | remetente     | destinatário | +valor   | Saída do remetente          |
| Recebimento | destinatário  | remetente    | +valor   | Entrada para o destinatário |

O saldo é calculado da seguinte forma:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Fluxo de Transferência

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Validar**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotência**: verificar se `idempotency_key` já existe no livro-razão.
   Em caso afirmativo, retornar o resultado armazenado em cache.
3. **Transação** (uma única transação SQLite):
   a. Calcular o saldo do remetente.
   b. Se `balance < amount`, abortar (fundos insuficientes).
   c. Inserir a linha de envio (`from=sender,`.

### Limitação de Taxa

- Máximo de 10 transferências por minuto por chave de API.
- Máximo de 10.000 tokens por transferência.
- Máximo de 100.000 tokens transferidos por dia por chave de API.

---

## Tokens de Convite e Resgate

**Arquivo:** `src/lib/gamification/invites.ts`

### Formato do Código

- **Código**: alfanumérico de 8 caracteres (por exemplo, `A3K9-X7M2`), legível por humanos,
  exibido ao usuário.
- **Token**: token aleatório de 32 bytes, armazenado como hash SHA-256. Usado para
  resgate programático (por exemplo, links de URL).

### Armazenamento

| Coluna       | Valor                        |
| ------------ | ---------------------------- |
| `code`       | `A3K9X7M2` (único, indexado) |
| `token_hash` | SHA-256(raw_token)           |

O token bruto é retornado ao usuário exatamente uma vez no momento da criação. A OmniRoute
nunca o armazena nem o exibe novamente — somente o hash persiste.

### Prevenção contra Autorreferência

Quando um usuário resgata um código, o sistema verifica:

1. O código pertence a um `api_key_id` diferente.
2. O usuário que está fazendo o resgate não resgatou anteriormente nenhum código do mesmo
   indicador (junção em `invite_tokens` + registro de resgates).

Se qualquer uma das verificações falhar, o resgate será rejeitado com uma mensagem de erro clara.

### Expiração e Limites

- `max_uses` padrão: 10 (configurável durante a criação).
- `expires_at` padrão: 30 dias após a criação.
- Códigos expirados ou esgotados retornam HTTP 410 Gone.

---

## Federação de Servidores da Comunidade

**Arquivo:** `src/lib/gamification/servers.ts`

### Conexão

Um servidor da comunidade é registrado por meio de um token de convite emitido pelo servidor remoto. A instância local:

1. Recebe o token de convite (por exemplo, colado no painel).
2. Chama `POST /api/gamification/federation/leaderboard` no servidor remoto para validar o token e obter a classificação atual.
3. Armazena o registro do servidor com `status: connected`.

### Modelo de Sincronização

A federação usa **sincronização por substituição**, não aditiva:

```
Instância Local                Servidor da Comunidade
     │                              │
     ├── envia pontuação ──────────►│  POST /federation/score
     │   { api_key_id, score }      │  (o servidor valida o hash do token)
     │                              │
     ├── obtém classificação ──────►│  GET /federation/leaderboard
     │◄── N melhores entradas ──────┤  (substitui o cache local)
     │                              │
     └── verificação de integridade ►│  GET /federation/health
         (a cada 60s, timeout de 5s)│
```

### Autenticação

As solicitações de federação incluem:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

O servidor remoto calcula o hash do token e procura a linha correspondente em `community_servers`. Isso evita a transmissão do hash armazenado.

### Monitoramento de Integridade

Cada registro de servidor acompanha:

| Campo       | Descrição                                          |
| ----------- | -------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`             |
| `last_sync` | Timestamp ISO da última sincronização bem-sucedida |
| `failures`  | Falhas consecutivas na verificação de integridade  |

Após 5 falhas consecutivas, o status muda para `unreachable`, e a sincronização é pausada até que uma verificação manual de integridade seja bem-sucedida.

---

## Antitrapaça

**Arquivo:** `src/lib/gamification/antiCheat.ts`

### Pontuação no Lado do Servidor

Todos os cálculos de XP ocorrem em `src/lib/gamification/xp.ts`. Os clientes nunca enviam uma pontuação — eles enviam ações, e o servidor calcula o XP. A coluna `leaderboard.score` só pode ser gravada pelo código do lado do servidor.

### Limitação de Taxa

| Limite                           | Valor   | Escopo            |
| -------------------------------- | ------- | ----------------- |
| Máximo de XP por minuto          | 1,000   | Por chave de API  |
| Máximo de transferências por min | 10      | Por chave de API  |
| Valor máximo por transferência   | 10,000  | Por transferência |
| Máximo de transferências diárias | 100,000 | Por chave de API  |

Os limites de taxa usam uma janela deslizante em memória (o mesmo padrão de `RateLimitManager` em `open-sse/services/`). Caso o processo seja reiniciado, o sistema recorre a contadores armazenados no SQLite.

### Detecção de Anomalias por Escore Z

Para cada chave de API, o sistema mantém uma janela móvel de 7 dias do XP ganho por hora. A cada concessão de XP:

1. Calcula a taxa horária atual de XP do usuário.
2. Calcula a média e o desvio padrão da população.
3. Calcula `z = (user_rate - mean) / stddev`.
4. Se `z > 3.0` (3 desvios padrão), sinaliza como anomalia.

As anomalias são registradas em `xp_audit_log` com `action = 'anomaly_detected'` e exibidas no painel administrativo.

### Trilha de Auditoria

Cada concessão de XP, transferência, obtenção de distintivo e detecção de anomalia é registrada em `xp_audit_log` com:

| Campo        | Descrição                                        |
| ------------ | ------------------------------------------------ |
| `api_key_id` | Quem                                             |
| `action`     | O que aconteceu (xp_award, transfer, anomaly, …) |
| `xp_awarded` | Quantidade (0 para eventos que não envolvem XP)  |
| `metadata`   | JSON com contexto (tipo de ação, destino, …)     |
| `created_at` | Quando (ISO 8601)                                |

Os administradores podem consultar a trilha de auditoria completa por meio de `GET /api/gamification/anomalies`.

---

## Rotas da API

Todas as rotas seguem o padrão padrão do OmniRoute:

```
Rota → Preflight de CORS → Validação do corpo (Zod) → Autenticação (extractApiKey)
  → Manipulador
```

### Endpoints

| Método | Caminho                                    | Descrição                                         | Autenticação  |
| ------ | ------------------------------------------ | ------------------------------------------------- | ------------- |
| GET    | `/api/gamification/leaderboard`            | Obtém o ranking (escopo, período, paginação)      | Opcional      |
| POST   | `/api/gamification/leaderboard`            | Força a atualização do cache do ranking           | Obrigatória   |
| GET    | `/api/gamification/stream`                 | Atualizações do ranking em tempo real via SSE     | Opcional      |
| GET    | `/api/gamification/transfer`               | Obtém o histórico de transferências (paginação)   | Obrigatória   |
| POST   | `/api/gamification/transfer`               | Envia tokens para outro usuário                   | Obrigatória   |
| GET    | `/api/gamification/invite`                 | Lista meus códigos de convite                     | Obrigatória   |
| POST   | `/api/gamification/invite`                 | Gera um novo código de convite                    | Obrigatória   |
| DELETE | `/api/gamification/invite`                 | Revoga um código de convite                       | Obrigatória   |
| POST   | `/api/gamification/invite/redeem`          | Resgata um código de convite                      | Obrigatória   |
| GET    | `/api/gamification/servers`                | Lista os servidores da comunidade                 | Obrigatória   |
| POST   | `/api/gamification/servers`                | Conecta-se a um servidor da comunidade            | Obrigatória   |
| DELETE | `/api/gamification/servers`                | Desconecta-se de um servidor da comunidade        | Obrigatória   |
| POST   | `/api/gamification/federation/score`       | Envia a pontuação para o servidor remoto          | Federação     |
| GET    | `/api/gamification/federation/leaderboard` | Obtém o ranking do servidor remoto                | Federação     |
| GET    | `/api/gamification/notifications`          | Notificações de emblemas/subida de nível via SSE  | Obrigatória   |
| GET    | `/api/gamification/anomalies`              | Visualiza relatórios de anomalias (administrador) | Administrador |
| POST   | `/api/gamification/rotate`                 | Rotaciona os segredos dos tokens de convite       | Obrigatória   |

### Exemplos de requisição/resposta

**POST /api/gamification/transfer**

```json
// Requisição
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Resposta 200
{
  "success": true,
  "transfer": {
    "id": "txn-uuid",
    "from": "sender-api-key-id",
    "to": "recipient-api-key-id",
    "amount": 500,
    "createdAt": "2026-05-19T12:00:00.000Z"
  },
  "balance": 2500
}

// Resposta 400 (saldo insuficiente)
{
  "error": "Insufficient balance",
  "balance": 200,
  "requested": 500
}
```

**GET /api/gamification/leaderboard?scope=weekly&limit=10**

```json
{
  "scope": "weekly",
  "period": "2026-W20",
  "entries": [
    {
      "rank": 1,
      "apiKeyId": "key-uuid",
      "displayName": "User***1234",
      "score": 15230,
      "level": 42,
      "title": "Expert"
    }
  ],
  "total": 847,
  "updatedAt": "2026-05-19T12:00:00.000Z"
}
```

---

## Ferramentas MCP (8)

Registradas em `open-sse/mcp-server/` juntamente com as ferramentas existentes. Restritas ao
escopo de permissão `gamification`.

| Ferramenta                 | Descrição                                        | Esquema de entrada           |           |
| -------------------------- | ------------------------------------------------ | ---------------------------- | --------- |
| `gamification_leaderboard` | Obtém a classificação de um escopo/período       | `{ scope, period?, limit? }` |
| `gamification_rank`        | Obtém a posição e os vizinhos do solicitante     | `{ scope }`                  |
| `gamification_profile`     | Obtém resumo de XP, nível, título e sequência    | `{}`                         |
| `gamification_badges`      | Lista distintivos obtidos ou todas as definições | `{ earned?: boolean }`       |
| `gamification_transfer`    | Envia tokens para outro usuário                  | `{ to, amount }`             |
| `gamification_invite`      | Gera ou lista códigos de convite                 | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Lista ou conecta servidores da comunidade        | `{ action, token? }`         |
| `gamification_anomalies`   | Exibe relatórios de anomalias (escopo de admin)  | `{ limit?, since? }`         |

---

## Páginas do painel

### `/dashboard/leaderboard`

- Exibição do pódio (os 3 primeiros com avatares e XP).
- Seletor de escopo: Global / Semanal / Mensal / Tokens compartilhados / Contribuições.
- Tabela paginada (25 por página) com posição, nome, pontuação, nível e título.
- Atualizações em tempo real via SSE — as alterações de posição são animadas.
- O usuário atual é destacado na tabela com uma linha fixa "Sua posição".

### `/dashboard/profile`

- Barra de progresso de XP com o nível atual e o limite do próximo nível.
- Distintivo de título exibido em destaque.
- Galeria de distintivos — distintivos obtidos com a data de obtenção; distintivos não obtidos aparecem esmaecidos
  (distintivos ocultos exibem "???" até serem obtidos).
- Contador de sequência com ícone de chama; calendário de sequência (últimos 30 dias).
- Gráfico de histórico de XP (XP diário nos últimos 30 dias).

### `/dashboard/tokens`

- Saldo de tokens (em destaque, no topo da página).
- Formulário de transferência: destinatário, quantidade e caixa de diálogo de confirmação.
- Tabela do histórico de transferências com filtros (enviados/recebidos/todos).
- Seção de convites: códigos ativos, geração de novos códigos e link de compartilhamento.
- Servidores da comunidade: lista com status de integridade e opções de conectar/desconectar.

### `/dashboard/gamification/admin`

- Lista de anomalias com gravidade, usuário, data e hora e z-score.
- Visualizador do log de auditoria com filtros (tipo de ação, usuário e intervalo de datas).
- Estatísticas do sistema: total de XP concedido, usuários ativos e taxas de obtenção de distintivos.
- Visão geral da integridade dos servidores de federação.

---

## Integração com o pipeline

### Ponto de integração

A gamificação se conecta ao pipeline de requisições em um único ponto em
`open-sse/handlers/chatCore.ts`:

```typescript
// Após a resposta ser enviada ao cliente:
setImmediate(() => {
  emitGamificationEvent({
    type: "request.completed",
    apiKeyId,
    metadata: {
      provider: selectedProvider,
      model: selectedModel,
      comboId: resolvedCombo?.id,
      compressionUsed: compressionStats?.applied,
      skillUsed: skillExecution?.name,
    },
  }).catch(() => {
    // Disparar e esquecer: registrar no log, mas nunca propagar para o cliente
  });
});
```

### Tipos de evento

| Tipo de evento      | Quando é emitido                                      |
| ------------------- | ----------------------------------------------------- |
| `request.completed` | Resposta bem-sucedida do LLM enviada                  |
| `provider.switch`   | Provedor alterado (fallback de combo é contabilizado) |
| `combo.created`     | Nova configuração de combo salva                      |
| `combo.used`        | Destino do combo alcançado com sucesso                |
| `badge.earned`      | A avaliação de distintivos encontrou uma combinação   |
| `streak.milestone`  | Limite de sequência atingido                          |
| `transfer.sent`     | Transferência de tokens concluída                     |
| `referral.redeemed` | Código de convite resgatado com sucesso               |
| `compression.used`  | Compressão de prompt aplicada                         |
| `skill.executed`    | Execução da skill concluída                           |
| `model.first_use`   | Modelo não utilizado nos últimos 7 dias               |

### Garantia de não bloqueio

O padrão `setImmediate` + `.catch(() => {})` garante que:

1. A resposta seja totalmente enviada antes da execução da gamificação.
2. Erros de gamificação nunca sejam expostos ao cliente.
3. O processamento do evento seja executado na próxima microtarefa, não de forma inline.

---

## Segurança

### Modelo de Ameaças

| Ameaça                            | Mitigação                                                                   |
| --------------------------------- | --------------------------------------------------------------------------- |
| Inflação de pontuação             | Cálculo de XP somente no servidor; clientes enviam ações, não pontuações    |
| Ataques de repetição              | Chaves de idempotência em transferências; desduplicação do log de auditoria |
| Fraude em transferências          | Livro-razão de partidas dobradas; transações atômicas; limites de taxa      |
| Autorreferral                     | Verificação cruzada de `api_key_id` no resgate                              |
| Manipulação da classificação      | Detecção de anomalias por escore Z; painel administrativo de anomalias      |
| Roubo de token de federação       | Armazenamento com hash SHA-256; token bruto exibido apenas uma vez          |
| Força bruta em códigos de convite | Limitação de taxa no endpoint de resgate; entropia de 8 caracteres          |
| XSS em nomes de exibição          | Nomes de exibição sanitizados; entradas da classificação escapadas          |
| Ataques de temporização em hashes | `crypto.timingSafeEqual` para comparação de hashes de tokens                |

### Requisitos de Autenticação

- **Público** (sem autenticação): `GET /leaderboard`, `GET /stream` (classificações
  somente para leitura).
- **Chave de API obrigatória**: todas as operações de escrita, perfil, transferências e convites.
- **Somente administradores**: painel de anomalias, visualizador do log de auditoria.
- **Federação**: caminho de autenticação separado usando o token bruto no cabeçalho
  `Authorization`, validado em relação ao hash SHA-256 armazenado.

---

## Testes

### Arquivos de Teste

Todos os testes usam o executor de testes nativo do Node.js (`node --import tsx/esm --test`).

| Arquivo de Teste                              | Abrange                                               | Testes |
| --------------------------------------------- | ----------------------------------------------------- | ------ |
| `tests/unit/gamification/xp.test.ts`          | Cálculo de XP, curva de níveis, títulos               | 8      |
| `tests/unit/gamification/badges.test.ts`      | Correspondência de critérios e concessão de emblemas  | 10     |
| `tests/unit/gamification/streaks.test.ts`     | Lógica de sequências, marcos, casos extremos          | 7      |
| `tests/unit/gamification/leaderboard.test.ts` | Cálculo de posição, paginação, rotação                | 8      |
| `tests/unit/gamification/sharing.test.ts`     | Transferências, saldo, idempotência                   | 9      |
| `tests/unit/gamification/invites.test.ts`     | Criação, resgate, expiração, autorreferral            | 7      |
| `tests/unit/gamification/antiCheat.test.ts`   | Limites de taxa, escore Z, registro de auditoria      | 6      |
| `tests/unit/gamification/events.test.ts`      | Emissão de eventos, distribuição, tratamento de erros | 5      |

### Execução dos Testes

```bash
# Todos os testes de gamificação
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Um único arquivo de teste
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Requisitos de Cobertura

Conforme `CONTRIBUTING.md` — todos os novos módulos devem ter:

- Cobertura de ramificações >= 80%.
- Cada função pública testada pelo menos uma vez.
- Caminhos de erro testados (saldo insuficiente, códigos expirados, limites de taxa).

---

## Estrutura de Arquivos

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Todas as 8 tabelas + índices
      gamification.ts                  # Módulo CRUD do domínio
    gamification/
      xp.ts                           # Cálculo de XP, curva de níveis, títulos
      badges.ts                       # Definições, critérios e avaliação de emblemas
      streaks.ts                      # Acompanhamento de sequências diárias
      leaderboard.ts                  # Cálculo de classificação, SSE, rotação
      antiCheat.ts                    # Limitação de taxa, escore z, auditoria
      sharing.ts                      # Livro-razão de transferências de tokens
      invites.ts                      # Códigos de convite/resgate
      servers.ts                      # Federação de servidores da comunidade
      events.ts                       # Emissor de eventos (ponto de integração)
      notifications.ts                # Fluxo de notificações SSE
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST da classificação
        leaderboard/stream/route.ts   # Atualizações em tempo real via SSE
        transfer/route.ts             # GET/POST de transferências
        invite/route.ts               # GET/POST/DELETE de códigos de convite
        invite/redeem/route.ts        # POST para resgatar código
        servers/route.ts              # GET/POST/DELETE de servidores
        federation/score/route.ts     # POST para enviar pontuação
        federation/leaderboard/route.ts # GET para obter classificação
        notifications/route.ts        # Notificações via SSE
        anomalies/route.ts            # GET de relatórios de anomalias
        rotate/route.ts               # POST para rotacionar segredos
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Página de classificações
        profile/page.tsx               # Página de XP/emblemas/sequências
        tokens/page.tsx                # Página de saldo/transferências/convites
        gamification/admin/page.tsx    # Monitoramento administrativo de anomalias
  shared/
    constants/
      gamification.ts                  # XP_REWARDS, TITLES, BADGE_DEFS, LIMITS

tests/
  unit/
    gamification/
      xp.test.ts
      badges.test.ts
      streaks.test.ts
      leaderboard.test.ts
      sharing.test.ts
      invites.test.ts
      antiCheat.test.ts
      events.test.ts

docs/
  frameworks/
    GAMIFICATION.md                    # Este documento
```

---

## Estratégia de Migração

### Fase 1: Núcleo do Backend (PR 1)

- Migração `060_create_gamification.sql` (8 tabelas).
- `src/lib/db/gamification.ts` (módulo do domínio).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Ponto de integração em `chatCore.ts`.
- Testes unitários para XP, sequências e eventos.

### Fase 2: Emblemas e Classificação (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Definições de emblemas nas constantes.
- Rotas da API de classificação + fluxo SSE.
- Testes unitários para emblemas e classificação.

### Fase 3: Compartilhamento e Convites (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Rotas da API de transferências + convites.
- Testes unitários para compartilhamento, convites e antitrapaça.

### Fase 4: Federação e Dashboard (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Rotas da API de federação.
- Páginas do dashboard (classificação, perfil, tokens, administração).
- Registro de ferramentas MCP.

---

## Considerações Futuras

- **Eventos sazonais**: conjuntos de emblemas por tempo limitado e temporadas de classificação.
- **Classificações por equipe**: agrupe usuários por organização ou combo.
- **Multiplicadores de XP**: aumente o XP durante períodos promocionais.
- **Compartilhamento de conquistas**: gere cartões de emblemas compartilháveis (imagens OpenGraph).
- **Notificações push para dispositivos móveis**: notificações baseadas em webhook para eventos de emblema/nível.
- **API de classificação**: API pública para integrações de terceiros.
