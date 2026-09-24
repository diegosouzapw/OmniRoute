# Gamification & Leaderboard System (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Fonte oficial:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute inclui uma camada de gamificação local-first que recompensa os utilizadores por
interagirem com a plataforma — fazerem pedidos, mudarem de fornecedores, criarem
combos, partilharem tokens e contribuírem para a comunidade. Todo o estado reside no
SQLite; a federação com servidores da comunidade é opcional e baseada em push.

O sistema foi concebido para ter **latência zero no caminho crítico** — os eventos de gamificação
são enviados de forma assíncrona a partir do pipeline de pedidos e nunca bloqueiam
uma resposta do LLM.

---

## Visão geral

### Objetivo

Aumentar o envolvimento e a retenção dos utilizadores através da disponibilização de progresso visível (XP,
níveis, emblemas), validação social (tabelas classificativas) e incentivos económicos (partilha de
tokens, recompensas por convites).

### Âmbito

| Funcionalidade           | Descrição                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------ |
| XP e níveis              | Ganhe XP por ação; suba de nível segundo uma curva polinomial                        |
| Emblemas                 | Mais de 20 conquistas em 5 categorias, com 4 níveis de raridade                      |
| Sequências               | Monitorização da utilização diária, com a sequência atual e a mais longa             |
| Tabelas classificativas  | Âmbitos global, semanal, mensal, de partilha de tokens e de contribuição             |
| Partilha de tokens       | Transfira créditos entre utilizadores através de um livro-razão de partidas dobradas |
| Convites e resgate       | Códigos de referência armazenados com hashes SHA-256                                 |
| Servidores da comunidade | Federe com instâncias externas do OmniRoute                                          |
| Prevenção de fraude      | Pontuação no servidor, limitação de taxa e deteção de anomalias por z-score          |

### Princípios de design

1. **Local-first** — todo o estado reside no SQLite, sem necessidade de serviços externos.
2. **Não bloqueante** — os eventos são enviados de forma assíncrona; o caminho de resposta do LLM
   nunca é atrasado pela lógica de gamificação.
3. **Controlado pelo servidor** — o XP é calculado apenas no servidor; os clientes não podem
   inflacionar as pontuações.
4. **Respeito pela privacidade** — a participação nas tabelas classificativas é opcional; os utilizadores podem
   ocultar o respetivo perfil.
5. **Preparado para federação** — os servidores da comunidade podem enviar pontuações através de uma API assinada;
   a sincronização substitui os valores existentes, não é aditiva.

---

## Arquitetura

### Fluxo de alto nível

```
Pedido do cliente
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (pipeline existente) ...
      → resposta do serviço upstream enviada ao cliente
      → setImmediate (assíncrono):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

O emissor de eventos é o único ponto de integração. `chatCore.ts` chama
`emitGamificationEvent()` depois de a resposta ser enviada; o módulo de eventos distribui
a execução pelos subsistemas de XP, sequências, emblemas, tabelas classificativas e prevenção de fraude.

### Grafo de dependências dos módulos

```
src/lib/gamification/
  events.ts          ← ponto de entrada (chamado a partir de chatCore.ts)
    ├── xp.ts        ← cálculo de XP e determinação do nível
    ├── streaks.ts   ← monitorização de sequências de atividade diária
    ├── badges.ts    ← avaliação dos critérios dos emblemas
    ├── leaderboard.ts ← cálculo de classificações e difusão por SSE
    ├── antiCheat.ts ← limitação de taxa e deteção de anomalias
    ├── sharing.ts   ← livro-razão de transferências de tokens
    ├── invites.ts   ← gestão de códigos de convite/resgate
    ├── servers.ts   ← federação de servidores da comunidade
    └── notifications.ts ← fluxo de notificações SSE

src/lib/db/
  gamification.ts    ← todas as operações CRUD (8 tabelas)

src/app/api/gamification/
  leaderboard/       ← GET classificações, POST atualização manual
  leaderboard/stream ← atualizações em tempo real por SSE
  transfer/          ← GET histórico, POST enviar tokens
  invite/            ← GET/POST códigos, DELETE revogar
  invite/redeem/     ← POST resgatar um código
  servers/           ← GET/POST/DELETE servidores da comunidade
  federation/score/  ← POST enviar pontuação para o servidor
  federation/leaderboard/ ← GET obter tabela classificativa do servidor
  notifications/     ← notificações de emblemas/subidas de nível por SSE
  anomalies/         ← GET relatórios de anomalias (administração)
  rotate/            ← POST rodar segredos dos tokens de convite
```

---

## Camada de Dados

### Tabelas da Base de Dados

Todas as tabelas residem na base de dados SQLite principal do OmniRoute, criada pela migração
`060_create_gamification.sql`. O registo WAL é herdado da instância singleton
`getDbInstance()` em `src/lib/db/core.ts`.

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels          │
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
│     user_badges         │     │    badge_definitions      │
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
`core.ts` e exporta funções CRUD tipadas. Não existe SQL em bruto nos processadores de rotas.

Funções principais:

| Função                     | Descrição                                                        |
| -------------------------- | ---------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Insere ou atualiza a pontuação para (api_key_id, scope, period)  |
| `getLeaderboard()`         | Classificações paginadas para um determinado âmbito/período      |
| `getUserLevel()`           | Obtém ou cria o registo de nível do utilizador                   |
| `updateUserLevel()`        | Define XP, nível e título de forma atómica                       |
| `getBadgeDefinitions()`    | Todas as definições de distintivos (com filtragem opcional)      |
| `getUserBadges()`          | Distintivos conquistados por um utilizador                       |
| `awardBadge()`             | Insere a conquista de um distintivo (idempotente em badge_id)    |
| `logXpAction()`            | Adiciona a xp_audit_log                                          |
| `getXpAuditLog()`          | Histórico de auditoria paginado de um utilizador                 |
| `insertLedgerEntry()`      | Transferência de dupla entrada (numa transação)                  |
| `getBalance()`             | Soma dos valores recebidos menos os enviados por um utilizador   |
| `getTransferHistory()`     | Registo paginado de transferências                               |
| `createInviteToken()`      | Insere o código de convite e o token com hash                    |
| `redeemInviteToken()`      | Pesquisa por código, valida e incrementa o número de utilizações |
| `upsertCommunityServer()`  | Regista ou atualiza um servidor de federação                     |
| `getCommunityServers()`    | Lista os servidores de um utilizador                             |
| `deleteCommunityServer()`  | Remove o registo de um servidor                                  |

---

## Sistema de XP / Níveis

**Ficheiro:** `src/lib/gamification/xp.ts`

### Curva de Níveis

O XP necessário para atingir o nível `n` segue uma curva polinomial:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Nível | XP até ao Seguinte | XP Acumulado | Título       |
| ----- | ------------------ | ------------ | ------------ |
| 1     | 100                | 100          | Principiante |
| 5     | 1,118              | 2,415        | Principiante |
| 10    | 3,162              | 10,523       | Explorador   |
| 25    | 12,500             | 86,024       | Explorador   |
| 50    | 35,355             | 345,529      | Perito       |
| 75    | 64,952             | 948,683      | Mestre       |
| 100   | 100,000            | 2,050,000    | Lenda        |

### Títulos

| Intervalo de Níveis | Título       |
| ------------------- | ------------ |
| 1 – 9               | Principiante |
| 10 – 24             | Explorador   |
| 25 – 49             | Perito       |
| 50 – 74             | Mestre       |
| 75 – 100            | Lenda        |

### Recompensas de XP

| Ação              | XP  | Descrição                                                         |
| ----------------- | --- | ----------------------------------------------------------------- |
| `request`         | 1   | Por pedido à API encaminhado através do OmniRoute                 |
| `provider_switch` | 5   | Mudar para um fornecedor diferente                                |
| `model_switch`    | 3   | Mudar para um modelo diferente                                    |
| `combo_create`    | 10  | Criar uma nova combinação                                         |
| `combo_use`       | 2   | Utilizar uma combinação num pedido                                |
| `token_share`     | 1   | Por cada 1 000 tokens partilhados com outro utilizador            |
| `invite_redeem`   | 50  | Resgatar um código de convite                                     |
| `daily_login`     | 5   | Utilização diária ativa (uma vez por dia)                         |
| `streak_bonus`    | 2   | Por dia consecutivo da série (multiplicado pela duração da série) |
| `badge_unlock`    | 10  | Desbloquear um distintivo                                         |

### Fluxo de Atribuição

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Consultar `XP_REWARDS[action]` para obter a quantidade de XP.
2. Passar por `checkRateLimit()` (antibatota: máximo de 1000 XP/min por chave).
3. Abrir uma transação:
   - Ler a linha atual de `user_levels`.
   - Adicionar XP; recalcular o nível através de `levelFromXp(totalXp)`.
   - Se o nível tiver mudado, definir `levelUp = true`.
   - Atualizar a linha de `user_levels`.
   - Inserir em `xp_audit_log`.
4. Devolver o resultado. O chamador trata das notificações.

### Função Auxiliar: `levelFromXp(totalXp)`

Percorre os níveis 1..100, somando `xp_for_level(n)` até o XP acumulado
exceder `totalXp`. Devolve o nível mais elevado cujo limiar foi atingido.
Isto é O(100) — aceitável, uma vez que os níveis estão limitados a 100.

---

## Sistema de Distintivos

**Ficheiro:** `src/lib/gamification/badges.ts`

### Categorias

| Categoria      | Descrição                               | Exemplos de Distintivos                            |
| -------------- | --------------------------------------- | -------------------------------------------------- |
| `usage`        | Marcos baseados no volume               | Primeiro Pedido, 1K Pedidos, 100K                  |
| `sharing`      | Partilha de tokens e referências        | Primeira Partilha, Generoso (10 partilhas)         |
| `contribution` | Participação na comunidade              | Criador de Combinações, Explorador de Fornecedores |
| `streak`       | Consistência ao longo do tempo          | Guerreiro Semanal, Devoto Mensal                   |
| `rare`         | Conquistas difíceis de obter ou ocultas | Adotante Inicial, Relator de Erros                 |

### Raridades

| Raridade    | Cor      | Indicação de Probabilidade |
| ----------- | -------- | -------------------------- |
| `common`    | Cinzento | Maioria dos utilizadores   |
| `uncommon`  | Verde    | Utilizadores ativos        |
| `rare`      | Azul     | Utilizadores dedicados     |
| `legendary` | Dourado  | 1% superior                |

### Tipos de Critérios

| Tipo           | Campo        | Descrição                                                      |
| -------------- | ------------ | -------------------------------------------------------------- |
| `action_count` | `count`      | Realizar uma ação N vezes (por exemplo, 1000 pedidos)          |
| `streak`       | `days`       | Manter uma série durante N dias consecutivos                   |
| `unique_count` | `field`, `n` | Utilizar N valores únicos (por exemplo, 10 modelos diferentes) |
| `rank`         | `scope`, `n` | Atingir a posição N no âmbito de uma tabela classificativa     |
| `first`        | —            | Ser o primeiro a realizar uma ação                             |
| `hidden`       | (varia)      | Critérios não apresentados até serem cumpridos                 |

As definições dos distintivos são armazenadas em `badge_definitions` como `criteria` JSON:

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
    → getUserBadges(apiKeyId)         # já obtidos (ignorar)
    → para cada distintivo não obtido:
       → matchesCriteria(badge, event, userState)
       → se corresponder: awardBadge(apiKeyId, badgeId)
         → devolver a carga útil da notificação
```

A avaliação é **orientada a eventos** — é executada após cada evento de gamificação, mas
verifica apenas os distintivos cujo `criteria.type` corresponde à ação do evento. Isto
mantém a avaliação rápida (< 5ms para a maioria dos eventos).

### `matchesCriteria(badge, event, userState)`

| Tipo de Critério | Verificação                                                       |
| ---------------- | ----------------------------------------------------------------- |
| `action_count`   | `getActionCount(apiKeyId, action) >= count`                       |
| `streak`         | `getCurrentStreak(apiKeyId) >= days`                              |
| `unique_count`   | `getUniqueCount(apiKeyId, field) >= n`                            |
| `rank`           | `getRank(apiKeyId, scope) <= n`                                   |
| `first`          | Nenhuma entrada anterior em `xp_audit_log` para este tipo de ação |
| `hidden`         | Delega para a subverificação adequada                             |

### Distintivos Integrados (20+)

<details>
<summary>Lista completa de distintivos</summary>

| Distintivo                   | Categoria    | Raridade | Critérios                            |
| ---------------------------- | ------------ | -------- | ------------------------------------ |
| Primeiros Passos             | utilização   | comum    | 1 pedido                             |
| A Aquecer                    | utilização   | comum    | 100 pedidos                          |
| Utilizador Avançado          | utilização   | incomum  | 1,000 pedidos                        |
| Centurião                    | utilização   | raro     | 10,000 pedidos                       |
| OmniPower                    | utilização   | lendário | 100,000 pedidos                      |
| Explorador de Fornecedores   | contribuição | comum    | Utilizar 5 fornecedores diferentes   |
| Mestre de Fornecedores       | contribuição | incomum  | Utilizar 20 fornecedores diferentes  |
| Arquiteto de Combinações     | contribuição | incomum  | Criar 5 combinações                  |
| Grão-Mestre de Combinações   | contribuição | raro     | Criar 25 combinações                 |
| Primeira Partilha            | partilha     | comum    | 1 transferência de tokens            |
| Generoso                     | partilha     | incomum  | 10 transferências de tokens          |
| Filantropo                   | partilha     | raro     | Transferir um total de 10,000 tokens |
| Referenciador                | partilha     | comum    | 1 recomendação bem-sucedida          |
| Construtor de Redes          | partilha     | incomum  | 10 recomendações bem-sucedidas       |
| Guerreiro Semanal            | série        | incomum  | Série de 7 dias                      |
| Devoto Mensal                | série        | raro     | Série de 30 dias                     |
| Imparável                    | série        | lendário | Série de 365 dias                    |
| Adotante Inicial             | raro         | lendário | Aderir durante o período beta        |
| Pioneiro da Compressão       | raro         | incomum  | Utilizar a compressão 100 vezes      |
| Colecionador de Competências | raro         | raro     | Utilizar 10 competências diferentes  |
| Explorador de Modelos        | contribuição | incomum  | Utilizar 15 modelos diferentes       |

</details>

---

## Monitor de Séries

**Ficheiro:** `src/lib/gamification/streaks.ts`

### Modelo de Dados

As séries são armazenadas na tabela `key_value` (tabela utilitária partilhada) sob
chaves com espaços de nomes:

| Chave                         | Valor                            | Descrição            |
| ----------------------------- | -------------------------------- | -------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Dados da série ativa |

### Lógica

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Ler o registo da série a partir de `key_value`.
2. Analisar `{current}`, `{longest}`, `{lastDate}` (cadeia de data ISO).
3. Se `lastDate === today` — nenhuma alteração (já contabilizado hoje).
4. Se `lastDate === yesterday` — incrementar `current`; atualizar `longest`, se necessário.
5. Se `lastDate < yesterday` — repor `current = 1` (série interrompida).
6. Escrever o registo atualizado.
7. Verificar marcos: 7, 14, 30, 60, 90, 180, 365 dias. Se algum for atingido, definir
   `milestone = true` (o chamador atribui XP e verifica os distintivos).

### Casos Limite

- **Fuso horário**: as séries utilizam datas UTC (`new Date().toISOString().slice(0, 10)`).
  Isto é intencional — um único fuso horário canónico impede manipulações através
  da mudança de fuso horário.
- **Novos utilizadores**: não existe qualquer registo de série; o primeiro pedido cria-o com
  `current=1, longest=1, lastDate=today`.
- **Vários pedidos por dia**: apenas o primeiro pedido do dia UTC
  incrementa a série.

---

## Classificação

**Ficheiro:** `src/lib/gamification/leaderboard.ts`

### Âmbitos

| Âmbito          | Período | Descrição                                                  |
| --------------- | ------- | ---------------------------------------------------------- |
| `global`        | `all`   | XP acumulado desde sempre                                  |
| `weekly`        | `week`  | XP obtido na semana UTC atual (segunda-feira-domingo)      |
| `monthly`       | `month` | XP obtido no mês UTC atual                                 |
| `tokens_shared` | `all`   | Total de tokens transferidos para outros                   |
| `contributions` | `all`   | Combos criados + fornecedores usados + competências usadas |

### Cálculo da Posição

As posições são **calculadas no momento da leitura**, não armazenadas. Isto evita dados de posição desatualizados
e elimina a necessidade de tarefas periódicas de recálculo das posições.

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

As classificações semanais e mensais são renovadas automaticamente:

1. **Arquivar**: no limite do período, copiar as entradas atuais para
   `leaderboard_archive` com a etiqueta do período.
2. **Repor**: eliminar as entradas do período expirado.
3. **Acionamento**: verificado em cada chamada a `updateLeaderboard()`; o primeiro pedido
   de um novo período aciona a rotação.

Isto garante que as classificações semanais são repostas todas as segundas-feiras às 00:00 UTC e as classificações mensais
são repostas no primeiro dia de cada mês.

### Atualizações SSE em Tempo Real

**Endpoint:** `GET /api/gamification/stream`

```
Cliente → GET /api/gamification/stream
  → Ligação SSE estabelecida
  → O servidor envia imediatamente um instantâneo dos 10 primeiros da classificação
  → A cada 5 segundos: envia os 10 primeiros atualizados, caso tenham mudado
  → A cada 15 segundos: comentário de heartbeat (": heartbeat\n\n")
  → O cliente desliga-se → limpeza (remoção do listener)
```

Formato do evento:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

O gestor SSE monitoriza os clientes ligados por âmbito e apenas envia atualizações
quando os dados da classificação tiverem efetivamente mudado desde o último envio.

---

## Partilha de Tokens

**Ficheiro:** `src/lib/gamification/sharing.ts`

### Registo de Partida Dobrada

Cada transferência cria duas linhas em `token_ledger`:

| Linha   | `from_key_id` | `to_key_id`  | `amount` |
| ------- | ------------- | ------------ | -------- |
| Débito  | remetente     | destinatário | +amount  |
| Crédito | destinatário  | remetente    | -amount  |

Espera — a convenção é:

| Linha   | `from_key_id` | `to_key_id`  | `amount` | Significado                      |
| ------- | ------------- | ------------ | -------- | -------------------------------- |
| Envio   | remetente     | destinatário | +amount  | Saída da conta do remetente      |
| Receção | destinatário  | remetente    | +amount  | Entrada na conta do destinatário |

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
2. **Idempotência**: verificar se `idempotency_key` já existe no registo.
   Em caso afirmativo, devolver o resultado em cache.
3. **Transação** (uma única transação SQLite):
   a. Calcular o saldo do remetente.
   b. Se `balance < amount`, abortar (fundos insuficientes).
   c. Inserir a linha de envio (`from=sender,`.

### Limitação de Frequência

- Máximo de 10 transferências por minuto por chave de API.
- Máximo de 10 000 tokens por transferência.
- Máximo de 100 000 tokens transferidos por dia por chave de API.

---

## Tokens de Convite e Resgate

**Ficheiro:** `src/lib/gamification/invites.ts`

### Formato do Código

- **Código**: alfanumérico de 8 caracteres (por exemplo, `A3K9-X7M2`), legível por humanos,
  apresentado ao utilizador.
- **Token**: token aleatório de 32 bytes, armazenado como hash SHA-256. Utilizado para
  resgate programático (por exemplo, ligações URL).

### Armazenamento

| Coluna       | Valor                        |
| ------------ | ---------------------------- |
| `code`       | `A3K9X7M2` (único, indexado) |
| `token_hash` | SHA-256(raw_token)           |

O token em bruto é devolvido ao utilizador exatamente uma vez, no momento da criação. O OmniRoute
nunca volta a armazená-lo ou apresentá-lo — apenas o hash persiste.

### Prevenção de Autorreferenciação

Quando um utilizador resgata um código, o sistema verifica:

1. O código pertence a um `api_key_id` diferente.
2. O utilizador que efetua o resgate não resgatou anteriormente qualquer código do mesmo
   referenciador (junção entre `invite_tokens` + registo de resgates).

Se qualquer uma das verificações falhar, o resgate é rejeitado com uma mensagem de erro clara.

### Expiração e Limites

- `max_uses` predefinido: 10 (configurável no momento da criação).
- `expires_at` predefinido: 30 dias após a criação.
- Os códigos expirados ou esgotados devolvem HTTP 410 Gone.

---

## Federação de Servidores da Comunidade

**Ficheiro:** `src/lib/gamification/servers.ts`

### Ligação

Um servidor da comunidade é registado através de um token de convite emitido pelo servidor
remoto. A instância local:

1. Recebe o token de convite (por exemplo, colado no painel de controlo).
2. Efetua um pedido `POST /api/gamification/federation/leaderboard` ao servidor remoto
   para validar o token e obter a tabela de classificação atual.
3. Armazena o registo do servidor com `status: connected`.

### Modelo de Sincronização

A federação utiliza **sincronização por substituição**, não aditiva:

```
Instância Local               Servidor da Comunidade
     │                              │
     ├── enviar pontuação ─────────►│  POST /federation/score
     │   { api_key_id, score }      │  (o servidor valida o hash do token)
     │                              │
     ├── obter classificação ──────►│  GET /federation/leaderboard
     │◄── top-N entradas ───────────┤  (substitui a cache local)
     │                              │
     └── verificação de estado ────►│  GET /federation/health
         (a cada 60s, tempo limite de 5s) │
```

### Autenticação

Os pedidos de federação incluem:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

O servidor remoto calcula o hash do token e procura a linha correspondente em
`community_servers`. Isto evita a transmissão do hash armazenado.

### Monitorização do Estado

Cada registo de servidor acompanha:

| Campo       | Descrição                                            |
| ----------- | ---------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`               |
| `last_sync` | Data e hora ISO da última sincronização bem-sucedida |
| `failures`  | Falhas consecutivas na verificação de estado         |

Após 5 falhas consecutivas, o estado muda para `unreachable` e a sincronização é
suspensa até que uma verificação de estado manual seja bem-sucedida.

---

## Antifraude

**Ficheiro:** `src/lib/gamification/antiCheat.ts`

### Cálculo da Pontuação no Servidor

Todos os cálculos de XP são efetuados em `src/lib/gamification/xp.ts`. Os clientes nunca
enviam uma pontuação — enviam ações e o servidor calcula o XP. A
coluna `leaderboard.score` só pode ser escrita por código do lado do servidor.

### Limitação de Taxa

| Limite                            | Valor   | Âmbito            |
| --------------------------------- | ------- | ----------------- |
| Máximo de XP por minuto           | 1,000   | Por chave de API  |
| Máximo de transferências por min  | 10      | Por chave de API  |
| Montante máximo por transferência | 10,000  | Por transferência |
| Máximo diário de transferências   | 100,000 | Por chave de API  |

Os limites de taxa utilizam uma janela deslizante em memória (o mesmo padrão que
`RateLimitManager` em `open-sse/services/`). Em caso de reinício do processo, são utilizados
contadores suportados por SQLite.

### Deteção de Anomalias por Pontuação Z

Para cada chave de API, o sistema mantém uma janela móvel de 7 dias do XP ganho por
hora. Em cada atribuição de XP:

1. Calcula a taxa horária de XP atual do utilizador.
2. Calcula a média e o desvio-padrão da população.
3. Calcula `z = (user_rate - mean) / stddev`.
4. Se `z > 3.0` (3 desvios-padrão), assinala como anomalia.

As anomalias são registadas em `xp_audit_log` com `action = 'anomaly_detected'`
e apresentadas no painel de administração.

### Registo de Auditoria

Cada atribuição de XP, transferência, obtenção de distintivo e deteção de anomalia é registada em
`xp_audit_log` com:

| Campo        | Descrição                                           |
| ------------ | --------------------------------------------------- |
| `api_key_id` | Quem                                                |
| `action`     | O que aconteceu (xp_award, transfer, anomaly, …)    |
| `xp_awarded` | Quantidade (0 para eventos não relacionados com XP) |
| `metadata`   | JSON com contexto (tipo de ação, alvo, …)           |
| `created_at` | Quando (ISO 8601)                                   |

Os administradores podem consultar o registo de auditoria completo através de `GET /api/gamification/anomalies`.

---

## Rotas da API

Todas as rotas seguem o padrão OmniRoute habitual:

```
Rota → Preflight CORS → Validação do corpo (Zod) → Autenticação (extractApiKey)
  → Processador
```

### Endpoints

| Método | Caminho                                    | Descrição                                           | Autenticação  |
| ------ | ------------------------------------------ | --------------------------------------------------- | ------------- |
| GET    | `/api/gamification/leaderboard`            | Obter classificação (âmbito, período, paginação)    | Opcional      |
| POST   | `/api/gamification/leaderboard`            | Forçar a atualização da cache da classificação      | Obrigatória   |
| GET    | `/api/gamification/stream`                 | Atualizações da classificação em tempo real via SSE | Opcional      |
| GET    | `/api/gamification/transfer`               | Obter histórico de transferências (paginação)       | Obrigatória   |
| POST   | `/api/gamification/transfer`               | Enviar tokens para outro utilizador                 | Obrigatória   |
| GET    | `/api/gamification/invite`                 | Listar os meus códigos de convite                   | Obrigatória   |
| POST   | `/api/gamification/invite`                 | Gerar um novo código de convite                     | Obrigatória   |
| DELETE | `/api/gamification/invite`                 | Revogar um código de convite                        | Obrigatória   |
| POST   | `/api/gamification/invite/redeem`          | Resgatar um código de convite                       | Obrigatória   |
| GET    | `/api/gamification/servers`                | Listar servidores da comunidade                     | Obrigatória   |
| POST   | `/api/gamification/servers`                | Ligar a um servidor da comunidade                   | Obrigatória   |
| DELETE | `/api/gamification/servers`                | Desligar de um servidor da comunidade               | Obrigatória   |
| POST   | `/api/gamification/federation/score`       | Enviar pontuação para um servidor remoto            | Federação     |
| GET    | `/api/gamification/federation/leaderboard` | Obter classificação de um servidor remoto           | Federação     |
| GET    | `/api/gamification/notifications`          | Notificações SSE de distintivos/subidas de nível    | Obrigatória   |
| GET    | `/api/gamification/anomalies`              | Ver relatórios de anomalias (administrador)         | Administrador |
| POST   | `/api/gamification/rotate`                 | Rodar os segredos dos tokens de convite             | Obrigatória   |

### Exemplos de Pedidos/Respostas

**POST /api/gamification/transfer**

```json
// Pedido
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

Registadas em `open-sse/mcp-server/` juntamente com as ferramentas existentes. Limitadas ao âmbito de permissões
`gamification`.

| Ferramenta                 | Descrição                                             | Esquema de entrada           |           |
| -------------------------- | ----------------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Obter a classificação para um âmbito/período          | `{ scope, period?, limit? }` |
| `gamification_rank`        | Obter a posição do autor e dos seus vizinhos          | `{ scope }`                  |
| `gamification_profile`     | Obter resumo de XP, nível, título e sequência         | `{}`                         |
| `gamification_badges`      | Listar emblemas obtidos ou todas as definições        | `{ earned?: boolean }`       |
| `gamification_transfer`    | Enviar tokens para outro utilizador                   | `{ to, amount }`             |
| `gamification_invite`      | Gerar ou listar códigos de convite                    | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Listar ou ligar servidores da comunidade              | `{ action, token? }`         |
| `gamification_anomalies`   | Ver relatórios de anomalias (âmbito de administrador) | `{ limit?, since? }`         |

---

## Páginas do painel

### `/dashboard/leaderboard`

- Apresentação do pódio (os 3 primeiros, com avatares e XP).
- Seletor de âmbito: Global / Semanal / Mensal / Tokens partilhados / Contribuições.
- Tabela paginada (25 por página) com posição, nome, pontuação, nível e título.
- Atualizações em tempo real por SSE — as alterações de posição são animadas.
- O utilizador atual é destacado na tabela com uma linha fixa "A sua posição".

### `/dashboard/profile`

- Barra de progresso de XP com o nível atual e o limiar do nível seguinte.
- Emblema do título apresentado em destaque.
- Galeria de emblemas — emblemas obtidos com a data de obtenção e emblemas não obtidos a cinzento
  (os emblemas ocultos apresentam "???" até serem obtidos).
- Contador de sequência com ícone de chama; calendário da sequência (últimos 30 dias).
- Gráfico do histórico de XP (XP diário ao longo dos últimos 30 dias).

### `/dashboard/tokens`

- Saldo de tokens (em destaque, no topo da página).
- Formulário de transferência: destinatário, montante e caixa de diálogo de confirmação.
- Tabela do histórico de transferências com filtros (enviadas/recebidas/todas).
- Secção de convites: códigos ativos, gerar novo, ligação de partilha.
- Servidores da comunidade: lista com estado de funcionamento, ligar/desligar.

### `/dashboard/gamification/admin`

- Lista de anomalias com gravidade, utilizador, carimbo de data/hora e pontuação z.
- Visualizador do registo de auditoria com filtros (tipo de ação, utilizador e intervalo de datas).
- Estatísticas do sistema: XP total atribuído, utilizadores ativos e taxas de obtenção de emblemas.
- Visão geral do estado dos servidores da federação.

---

## Integração no pipeline

### Ponto de integração

A gamificação liga-se ao pipeline de pedidos num único ponto em
`open-sse/handlers/chatCore.ts`:

```typescript
// Depois de a resposta ser enviada ao cliente:
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
    // Execução sem aguardar: registar, mas nunca propagar para o cliente
  });
});
```

### Tipos de eventos

| Tipo de evento      | Quando é emitido                                      |
| ------------------- | ----------------------------------------------------- |
| `request.completed` | Resposta bem-sucedida do LLM enviada                  |
| `provider.switch`   | Fornecedor alterado (os fallbacks de combo contam)    |
| `combo.created`     | Nova configuração de combo guardada                   |
| `combo.used`        | Alvo do combo atingido com sucesso                    |
| `badge.earned`      | A avaliação de emblemas encontrou uma correspondência |
| `streak.milestone`  | Limiar da sequência ultrapassado                      |
| `transfer.sent`     | Transferência de tokens concluída                     |
| `referral.redeemed` | Código de convite resgatado com sucesso               |
| `compression.used`  | Compressão do prompt aplicada                         |
| `skill.executed`    | Execução da competência concluída                     |
| `model.first_use`   | Modelo não utilizado nos últimos 7 dias               |

### Garantia de não bloqueio

O padrão `setImmediate` + `.catch(() => {})` garante que:

1. A resposta é totalmente enviada antes de a gamificação ser executada.
2. Os erros de gamificação nunca são apresentados ao cliente.
3. O processamento do evento é executado na microtarefa seguinte, e não em linha.

---

## Segurança

### Modelo de Ameaças

| Ameaça                               | Mitigação                                                                               |
| ------------------------------------ | --------------------------------------------------------------------------------------- |
| Inflação da pontuação                | Cálculo de XP apenas no servidor; os clientes submetem ações, não pontuações            |
| Ataques de repetição                 | Chaves de idempotência nas transferências; desduplicação do registo de auditoria        |
| Fraude em transferências             | Registo contabilístico de partidas dobradas; transações atómicas; limites de frequência |
| Autorreferenciação                   | Verificação cruzada de `api_key_id` no resgate                                          |
| Manipulação da tabela classificativa | Deteção de anomalias por pontuação Z; painel administrativo de anomalias                |
| Roubo de tokens de federação         | Armazenamento com hash SHA-256; o token original é apresentado apenas uma vez           |
| Força bruta em códigos de convite    | Limitação de frequência no endpoint de resgate; entropia de 8 caracteres                |
| XSS em nomes de apresentação         | Nomes de apresentação sanitizados; entradas da tabela classificativa escapadas          |
| Ataques temporais a hashes           | `crypto.timingSafeEqual` para comparar hashes de tokens                                 |

### Requisitos de Autenticação

- **Público** (sem autenticação): `GET /leaderboard`, `GET /stream` (tabelas
  classificativas apenas para leitura).
- **Chave de API obrigatória**: todas as operações de escrita, perfil, transferências e convites.
- **Apenas administradores**: painel de anomalias e visualizador do registo de auditoria.
- **Federação**: caminho de autenticação separado que utiliza o token original no cabeçalho
  `Authorization`, validado em relação ao hash SHA-256 armazenado.

---

## Testes

### Ficheiros de Teste

Todos os testes utilizam o executor de testes nativo do Node.js (`node --import tsx/esm --test`).

| Ficheiro de Teste                             | Abrange                                                  | Testes |
| --------------------------------------------- | -------------------------------------------------------- | ------ |
| `tests/unit/gamification/xp.test.ts`          | Cálculo de XP, curva de níveis, títulos                  | 8      |
| `tests/unit/gamification/badges.test.ts`      | Correspondência de critérios e atribuição de distintivos | 10     |
| `tests/unit/gamification/streaks.test.ts`     | Lógica de sequências, marcos, casos-limite               | 7      |
| `tests/unit/gamification/leaderboard.test.ts` | Cálculo da classificação, paginação, rotação             | 8      |
| `tests/unit/gamification/sharing.test.ts`     | Transferências, saldo, idempotência                      | 9      |
| `tests/unit/gamification/invites.test.ts`     | Criação, resgate, expiração, autorreferenciação          | 7      |
| `tests/unit/gamification/antiCheat.test.ts`   | Limites de frequência, pontuação Z, registo de auditoria | 6      |
| `tests/unit/gamification/events.test.ts`      | Emissão de eventos, distribuição, tratamento de erros    | 5      |

### Executar os Testes

```bash
# Todos os testes de gamificação
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Um único ficheiro de teste
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Requisitos de Cobertura

De acordo com `CONTRIBUTING.md` — todos os novos módulos devem ter:

- Cobertura de ramificações >= 80%.
- Cada função pública testada pelo menos uma vez.
- Caminhos de erro testados (saldo insuficiente, códigos expirados, limites de frequência).

---

## Estrutura de Ficheiros

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # As 8 tabelas + índices
      gamification.ts                  # Módulo CRUD do domínio
    gamification/
      xp.ts                           # Cálculo de XP, curva de níveis, títulos
      badges.ts                       # Definições, critérios e avaliação de medalhas
      streaks.ts                      # Acompanhamento de séries diárias
      leaderboard.ts                  # Cálculo da classificação, SSE, rotação
      antiCheat.ts                    # Limitação de frequência, z-score, auditoria
      sharing.ts                      # Registo de transferências de tokens
      invites.ts                      # Códigos de convite/resgate
      servers.ts                      # Federação de servidores da comunidade
      events.ts                       # Emissor de eventos (ponto de integração)
      notifications.ts                # Fluxo SSE de notificações
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST da tabela classificativa
        leaderboard/stream/route.ts   # Atualizações em tempo real por SSE
        transfer/route.ts             # GET/POST de transferências
        invite/route.ts               # GET/POST/DELETE de códigos de convite
        invite/redeem/route.ts        # POST para resgatar código
        servers/route.ts              # GET/POST/DELETE de servidores
        federation/score/route.ts     # POST para enviar pontuação
        federation/leaderboard/route.ts # GET para obter a tabela classificativa
        notifications/route.ts        # Notificações por SSE
        anomalies/route.ts            # GET de relatórios de anomalias
        rotate/route.ts               # POST para rodar segredos
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Página de classificações
        profile/page.tsx               # Página de XP/medalhas/séries
        tokens/page.tsx                # Página de saldo/transferências/convites
        gamification/admin/page.tsx    # Monitorização administrativa de anomalias
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
- Testes unitários para XP, séries e eventos.

### Fase 2: Medalhas e Tabela Classificativa (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Definições de medalhas nas constantes.
- Rotas da API da tabela classificativa + fluxo SSE.
- Testes unitários para medalhas e tabela classificativa.

### Fase 3: Partilha e Convites (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Rotas da API de transferências + convites.
- Testes unitários para partilha, convites e prevenção de fraude.

### Fase 4: Federação e Painel (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Rotas da API de federação.
- Páginas do painel (tabela classificativa, perfil, tokens, administração).
- Registo de ferramentas MCP.

---

## Considerações Futuras

- **Eventos sazonais**: conjuntos de distintivos disponíveis por tempo limitado e temporadas de classificações.
- **Classificações por equipa**: agrupar utilizadores por organização ou combo.
- **Multiplicadores de XP**: aumentar o XP durante períodos promocionais.
- **Partilha de conquistas**: gerar cartões de distintivos partilháveis (imagens OpenGraph).
- **Notificações push em dispositivos móveis**: notificações baseadas em webhooks para eventos de distintivos/níveis.
- **API de classificações**: API pública para integrações de terceiros.
