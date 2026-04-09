# Feature 144 — API Key Team/User Hierarchy

## Resumo

Implementar hierarquia organizacional para API keys: Organização → Teams → Users → Keys. Cada nível pode ter budgets, rate limits e permissões independentes, com herança do nível superior.

## Motivação

O LiteLLM gerencia keys numa hierarquia de 4 níveis (Organization → Team → User → Key), onde budgets e limites são herdados e acumulados. O OmniRoute tem keys planas (flat) em `apiKeys.js` — cada key é independente, sem conceito de agrupamento. Isso dificulta gerenciar ambientes com múltiplos desenvolvedores, cujos custos devem ser rastreados por equipe e individual.

## O que ganhamos

- **Controle por equipe**: Budget compartilhado de $100/mês entre 5 devs
- **Visibilidade**: Dashboard por team mostra quem gastou o quê
- **Herança de budgets**: Key herda limite do team se não tiver limite próprio
- **Billing simplificado**: Custo agrupado por team para faturamento
- **Permissões granulares**: Admin team pode criar keys, dev não pode

## Situação Atual (Antes)

```
Keys:
  - key_alice: budget $50    → uso independente
  - key_bob: budget $50      → uso independente
  - key_charlie: budget $50  → uso independente

PROBLEMAS:
  - Alice, Bob e Charlie são do Team Backend, mas não há relação
  - Budget total do team deveria ser $100, mas são $150 (3 × $50)
  - Sem visão consolidada de custo por team
  - Sem como criar "team admin" que gerencia keys do time
```

## Situação Proposta (Depois)

```
Organization: "MinhaEmpresa"
  ├── Team: "Backend" (budget: $100/mês)
  │   ├── User: "Alice" (budget: $40/mês)
  │   │   └── Key: key_alice_01
  │   ├── User: "Bob" (budget: $40/mês)
  │   │   └── Key: key_bob_01
  │   └── User: "Charlie" (budget: $20/mês)
  │       └── Key: key_charlie_01
  └── Team: "Frontend" (budget: $30/mês)
      └── User: "Diana"
          └── Key: key_diana_01

Regras:
  - Alice gasta $40 → ok (individual ok, team $40/$100 ok)
  - Bob gasta $35 → ok (individual ok, team $75/$100 ok)
  - Charlie tenta $30 → blocked (individual $20 limit)
  - Bob tenta mais $30 → blocked (team seria $105/$100)
```

## Especificação Técnica

### Schema Ampliado (SQLite)

```sql
-- Teams
CREATE TABLE IF NOT EXISTS teams (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  organization_id TEXT,
  budget_usd REAL,
  budget_reset_interval TEXT DEFAULT 'monthly',
  max_parallel_requests INTEGER,
  rate_limits TEXT, -- JSON: {tpm, rpm}
  created_at INTEGER DEFAULT (strftime('%s', 'now'))
);

-- Users
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  team_id TEXT REFERENCES teams(id),
  budget_usd REAL,
  role TEXT DEFAULT 'user', -- 'admin' | 'user'
  created_at INTEGER DEFAULT (strftime('%s', 'now'))
);

-- API Keys (expandido)
-- Adicionar colunas: user_id, team_id
ALTER TABLE api_keys ADD COLUMN user_id TEXT REFERENCES users(id);
ALTER TABLE api_keys ADD COLUMN team_id TEXT REFERENCES teams(id);
```

### Budget Check Hierárquico

```javascript
// src/domain/hierarchyBudget.js

export function checkHierarchicalBudget(keyId, cost) {
  const key = getApiKey(keyId);
  if (!key) return { allowed: true };

  const checks = [];

  // 1. Key-level budget
  if (key.budget_usd) {
    const keySpend = getKeySpend(keyId);
    checks.push({
      level: "key",
      id: keyId,
      spend: keySpend,
      limit: key.budget_usd,
      ok: keySpend + cost <= key.budget_usd,
    });
  }

  // 2. User-level budget
  if (key.user_id) {
    const user = getUser(key.user_id);
    if (user?.budget_usd) {
      const userSpend = getUserSpend(user.id);
      checks.push({
        level: "user",
        id: user.id,
        name: user.name,
        spend: userSpend,
        limit: user.budget_usd,
        ok: userSpend + cost <= user.budget_usd,
      });
    }
  }

  // 3. Team-level budget
  const teamId = key.team_id || (key.user_id ? getUser(key.user_id)?.team_id : null);
  if (teamId) {
    const team = getTeam(teamId);
    if (team?.budget_usd) {
      const teamSpend = getTeamSpend(teamId);
      checks.push({
        level: "team",
        id: teamId,
        name: team.name,
        spend: teamSpend,
        limit: team.budget_usd,
        ok: teamSpend + cost <= team.budget_usd,
      });
    }
  }

  // Qualquer nível bloqueando = blocked
  const blocked = checks.find((c) => !c.ok);
  return {
    allowed: !blocked,
    blockedAt: blocked?.level,
    message: blocked
      ? `${blocked.level} budget exceeded: $${blocked.spend.toFixed(2)}/$${blocked.limit.toFixed(2)} (${blocked.name || blocked.id})`
      : null,
    checks,
  };
}
```

## Arquivos a Criar/Modificar

| Arquivo                         | Ação                                             |
| ------------------------------- | ------------------------------------------------ |
| `src/lib/db/teams.js`           | **NOVO** — CRUD de teams                         |
| `src/lib/db/users.js`           | **NOVO** — CRUD de users                         |
| `src/domain/hierarchyBudget.js` | **NOVO** — Budget check hierárquico              |
| `src/lib/db/apiKeys.js`         | **MODIFICAR** — Adicionar user_id/team_id        |
| `src/domain/costRules.js`       | **MODIFICAR** — Integrar checkHierarchicalBudget |
| `src/app/api/teams/route.js`    | **NOVO** — API de teams                          |
| `src/app/api/users/route.js`    | **NOVO** — API de users                          |

## Critérios de Aceite

- [ ] Teams com budget compartilhado entre membros
- [ ] Users com budget individual dentro do team
- [ ] Budget check executa em todos os níveis (key → user → team)
- [ ] Qualquer nível atingido → requisição bloqueada
- [ ] Dashboard mostra hierarquia com spend de cada nível
- [ ] API CRUD para teams e users
- [ ] Roles: admin pode criar keys, user apenas usa

## Referência

- [LiteLLM: proxy/\_types.py](https://github.com/BerriAI/litellm/blob/main/litellm/proxy/_types.py) — LiteLLM_TeamTable, LiteLLM_UserTable, LiteLLM_OrganizationTable
- [LiteLLM: proxy/auth/](https://github.com/BerriAI/litellm/tree/main/litellm/proxy/auth) — hierarchical key validation
