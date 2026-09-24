# OmniRoute Agent Skills Catalog (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENT-SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENT-SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENT-SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENT-SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENT-SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENT-SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/AGENT-SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENT-SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENT-SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENT-SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENT-SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENT-SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENT-SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENT-SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENT-SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENT-SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENT-SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENT-SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENT-SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENT-SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENT-SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENT-SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENT-SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENT-SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENT-SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENT-SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENT-SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENT-SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENT-SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENT-SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENT-SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENT-SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENT-SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENT-SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENT-SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENT-SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENT-SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENT-SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENT-SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENT-SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENT-SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENT-SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENT-SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENT-SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENT-SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENT-SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENT-SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENT-SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENT-SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENT-SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENT-SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENT-SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENT-SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENT-SKILLS.md)

---

> **Fonte da verdade:** `src/lib/agentSkills/` (catálogo, gerador, analisadores) + diretório `skills/` (arquivos SKILL.md)
> **Última atualização:** 2026-08-02 — v3.8.50

Agent Skills são arquivos SKILL.md estruturados que ensinam agentes externos, clientes MCP e orquestradores A2A a usar a API REST e a CLI do OmniRoute. Diferentemente das [Omni Skills](./SKILLS.md) (que são definições de ferramentas de LLM executadas dentro do OmniRoute), as Agent Skills são um _catálogo de documentação_ — markdown estático que pode ser fornecido diretamente ao contexto do agente.

---

## Visão geral

O catálogo contém **45 Agent Skills** (23 de API REST + 21 de CLI + 1 fluxo de trabalho de configuração). Cada skill possui:

- Um **ID canônico** (`omni-auth`, `cli-serve` etc.)
- Um arquivo **SKILL.md** em `skills/{id}/SKILL.md` com frontmatter YAML (`name`, `description`) + conteúdo markdown detalhado
- **Endpoints REST** (skills de API) ou **subcomandos da CLI** (skills de CLI) derivados da especificação OpenAPI e do registro da CLI
- Uma **URL raw do GitHub** para obtenção em tempo real: `https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills/{id}/SKILL.md`

---

## Arquitetura

```
src/shared/constants/agentSkills.ts    — lista selecionada com 45 entradas (nome/descrição/categoria/área/ícone)
src/lib/agentSkills/
  catalog.ts                           — getCatalog(), getSkillById(), filterCatalog(), computeCoverage()
  generator.ts                         — generateAgentSkills() grava SKILL.md em skills/{id}/
  openapiParser.ts                     — extrai endpoints REST de docs/openapi.yaml
  cliRegistryParser.ts                 — extrai subcomandos da CLI de bin/cli-registry.ts
  schemas.ts                           — esquemas Zod: AgentSkillSchema, SkillCoverageSchema etc.
  types.ts                             — interfaces TypeScript: AgentSkill, SkillCoverage etc.

skills/{id}/SKILL.md                   — Arquivos markdown gerados + selecionados (45 no total)

src/app/api/agent-skills/
  route.ts                             — GET /api/agent-skills
  [id]/route.ts                        — GET /api/agent-skills/{id}
  [id]/raw/route.ts                    — GET /api/agent-skills/{id}/raw (text/markdown)
  coverage/route.ts                    — GET /api/agent-skills/coverage
  generate/route.ts                    — POST /api/agent-skills/generate (autenticação obrigatória)

open-sse/mcp-server/tools/agentSkillTools.ts  — 3 ferramentas MCP (listar, obter, cobertura)
src/lib/a2a/skills/listCapabilities.ts        — Skill A2A: list-capabilities
```

---

## Formato do SKILL.md

```markdown
---
name: omni-providers
description: "Gerencie conexões de provedores: adicione, teste, alterne e remova credenciais."
---

<!-- gerado por src/lib/agentSkills/generator.ts; edições manuais serão sobrescritas -->

## Visão geral

...

## Autenticação

...

## Endpoints

...

<!-- skill:custom-start -->

## Seção personalizada (preservada entre regenerações)

...

<!-- skill:custom-end -->
```

O gerador preserva o conteúdo entre `<!-- skill:custom-start -->` e `<!-- skill:custom-end -->` durante a regeneração. Dez skills possuem blocos personalizados selecionados:

`omni-mcp`, `omni-compression`, `cli-providers`, `cli-eval`, `omni-agents-a2a`, `omni-combos-routing`, `omni-auth`, `omni-resilience`, `omni-inference`, `cli-serve`.

---

## Descoberta da API REST

| Endpoint                     | Método | Descrição                                                            | Autenticação  |
| :--------------------------- | :----- | :------------------------------------------------------------------- | :------------ |
| `/api/agent-skills`          | GET    | Lista o catálogo (`?category=api\|cli\|config&area=<area>` opcional) | nenhuma       |
| `/api/agent-skills/{id}`     | GET    | Obtém os metadados de uma habilidade                                 | nenhuma       |
| `/api/agent-skills/{id}/raw` | GET    | Obtém o SKILL.md como `text/markdown`                                | nenhuma       |
| `/api/agent-skills/coverage` | GET    | Estatísticas de cobertura (quantos arquivos SKILL.md existem)        | nenhuma       |
| `/api/agent-skills/generate` | POST   | Aciona o gerador (dryRun/prune/onlyIds)                              | gerenciamento |

Exemplo — listar todas as habilidades da API:

```bash
curl "http://localhost:20128/api/agent-skills?category=api"
```

Exemplo — obter um único SKILL.md:

```bash
curl -H "Accept: text/markdown" "http://localhost:20128/api/agent-skills/omni-providers/raw"
```

---

## Descoberta do MCP

Três ferramentas MCP estão registradas no escopo `read:catalog`:

| Ferramenta                        | Descrição                                                 |
| :-------------------------------- | :-------------------------------------------------------- |
| `omniroute_agent_skills_list`     | Lista habilidades (filtros `category` / `area` opcionais) |
| `omniroute_agent_skills_get`      | Obtém metadados + SKILL.md de uma habilidade pelo `id`    |
| `omniroute_agent_skills_coverage` | Estatísticas de cobertura (API/CLI existentes/total)      |

Consulte [MCP-SERVER.md](./MCP-SERVER.md) para saber mais sobre a configuração de escopos e a autenticação.

---

## Descoberta do A2A

A habilidade A2A `list-capabilities` retorna o catálogo completo de 45 habilidades como um artefato de tabela Markdown. Orquestradores externos podem invocá-la por meio de:

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "message/send",
  "params": {
    "skill": "list-capabilities",
    "messages": [{ "role": "user", "content": "Liste todos os recursos" }]
  }
}
```

Consulte [A2A-SERVER.md](./A2A-SERVER.md) para obter detalhes do protocolo.

---

## Catálogo — 45 IDs de habilidades

### Habilidades da API (23)

| ID                     | Área            | Ponto de entrada                              |
| :--------------------- | :-------------- | :-------------------------------------------- |
| `omni-auth`            | auth            | Autenticação + gerenciamento de sessões       |
| `omni-providers`       | providers       | Gerenciamento de conexões com provedores      |
| `omni-models`          | models          | Catálogo e recursos de modelos                |
| `omni-combos-routing`  | combos-routing  | Estratégias de roteamento combinado           |
| `omni-api-keys`        | api-keys        | Gerenciamento de chaves de API                |
| `omni-usage-logs`      | usage-logs      | Logs de uso e custos                          |
| `omni-budget`          | budget          | Controles de orçamento                        |
| `omni-settings`        | settings        | Configurações globais                         |
| `omni-proxies`         | proxies         | Gerenciamento do pool de proxies              |
| `omni-cache`           | cache           | Cache semântico + de prompts                  |
| `omni-compression`     | compression     | Mecanismos de compactação de contexto         |
| `omni-context-rtk`     | context-rtk     | Compactação RTK                               |
| `omni-resilience`      | resilience      | Disjuntores + períodos de espera              |
| `omni-cli-tools`       | cli-tools       | Proxy REST para ferramentas de CLI            |
| `omni-tunnels`         | tunnels         | Gerenciamento de túneis                       |
| `omni-sync-cloud`      | sync-cloud      | Sincronização com a nuvem                     |
| `omni-db-backups`      | db-backups      | Backups de banco de dados                     |
| `omni-webhooks`        | webhooks        | Despachante de eventos de webhook             |
| `omni-mcp`             | mcp             | Servidor MCP (110 ferramentas, 3 transportes) |
| `omni-agents-a2a`      | agents-a2a      | Protocolo de agentes A2A                      |
| `omni-version-manager` | version-manager | Gerenciamento de versões e atualizações       |
| `omni-inference`       | inference       | Inferência direta / completações              |

### Habilidades da CLI (21)

| ID                    | Área               | Comando raiz da CLI     |
| :-------------------- | :----------------- | :---------------------- |
| `cli-serve`           | cli-serve          | `omniroute serve`       |
| `cli-health`          | cli-health         | `omniroute health`      |
| `cli-providers`       | cli-providers      | `omniroute providers`   |
| `cli-keys`            | cli-keys           | `omniroute keys`        |
| `cli-models`          | cli-models         | `omniroute models`      |
| `cli-chat`            | cli-chat           | `omniroute chat`        |
| `cli-routing`         | cli-routing        | `omniroute routing`     |
| `cli-resilience`      | cli-resilience     | `omniroute resilience`  |
| `cli-compression`     | cli-compression    | `omniroute compression` |
| `cli-contexts`        | cli-contexts       | `omniroute contexts`    |
| `cli-cost-usage`      | cli-cost-usage     | `omniroute cost`        |
| `cli-mcp`             | cli-mcp            | `omniroute mcp`         |
| `cli-a2a`             | cli-a2a            | `omniroute a2a`         |
| `cli-tunnel`          | cli-tunnel         | `omniroute tunnel`      |
| `cli-backup-sync`     | cli-backup-sync    | `omniroute backup`      |
| `cli-policy-audit`    | cli-policy-audit   | `omniroute policy`      |
| `cli-batches`         | cli-batches        | `omniroute batch`       |
| `cli-eval`            | cli-eval           | `omniroute eval`        |
| `cli-plugins-skills`  | cli-plugins-skills | `omniroute plugins`     |
| `cli-setup`           | cli-setup          | `omniroute setup`       |
| `cli-skill-collector` | cli-setup          | `omniroute skills`      |

### Fluxo de trabalho de configuração (1)

| ID                 | Área             | Ponto de entrada                               |
| :----------------- | :--------------- | :--------------------------------------------- |
| `config-codex-cli` | config-codex-cli | Fluxo de trabalho de configuração da Codex CLI |

---

## Como Agentes Externos Consomem Skills

### 1. Descoberta via REST

```bash
# Obtém o catálogo completo
curl "http://your-omniroute/api/agent-skills" | jq '.skills[] | {id, name, category}'

# Obtém o SKILL.md para injeção de contexto
curl "http://your-omniroute/api/agent-skills/omni-providers/raw" > omni-providers.md
```

### 2. Descoberta via MCP

```typescript
// Em um cliente MCP do Claude Desktop / Cursor:
const result = await client.callTool("omniroute_agent_skills_list", {
  category: "api",
});
// result.skills → array de AgentSkill com rawUrl para cada item
```

### 3. Descoberta via A2A

```python
import requests

resp = requests.post("http://your-omniroute/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {"skill": "list-capabilities", "messages": [{"role": "user", "content": "list"}]}
})
table = resp.json()["result"]["artifacts"][0]["content"]
# table é uma tabela markdown com todos os 45 IDs de skills + colunas rawUrl
```

### 4. Busca direta do conteúdo bruto no GitHub (nenhum servidor necessário)

```bash
BASE="https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills"
curl "${BASE}/omni-providers/SKILL.md"
```

---

## Gerador

O gerador lê o catálogo selecionado + a especificação OpenAPI + o registro da CLI e grava `skills/{id}/SKILL.md` para cada entrada:

```bash
# Visualização prévia (execução simulada, sem gravações)
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":true}'

# Regeneração completa
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"prune":false}'

# Regenera IDs específicos
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"onlyIds":["omni-providers","cli-serve"]}'
```

A resposta do gerador é um `GeneratorReport`:

```json
{
  "generated": ["omni-providers", "cli-serve"],
  "unchanged": [],
  "pruned": [],
  "orphansDetected": [],
  "errors": []
}
```

---

## API de Cobertura

```bash
curl "http://localhost:20128/api/agent-skills/coverage"
```

```json
{
  "api": { "have": 23, "total": 23 },
  "cli": { "have": 21, "total": 21 },
  "config": { "have": 1, "total": 1 },
  "totalSkills": 45,
  "generatedAt": "2026-08-02T00:00:00.000Z"
}
```

---

## Relacionados

- [SKILLS.md](./SKILLS.md) — framework Omni Skills (injeção de ferramentas em LLM + marketplace)
- [MCP-SERVER.md](./MCP-SERVER.md) — catálogo de ferramentas MCP (ferramentas `omniroute_agent_skills_*`)
- [A2A-SERVER.md](./A2A-SERVER.md) — protocolo A2A (skill `list-capabilities`)
- `src/lib/agentSkills/` — catálogo, gerador, analisadores
- `skills/` — arquivos SKILL.md gerados (45 entradas)
