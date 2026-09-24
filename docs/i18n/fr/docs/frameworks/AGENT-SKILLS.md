# OmniRoute Agent Skills Catalog (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENT-SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENT-SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENT-SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENT-SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENT-SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENT-SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/AGENT-SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENT-SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENT-SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENT-SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENT-SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENT-SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENT-SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENT-SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENT-SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENT-SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENT-SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENT-SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENT-SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENT-SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENT-SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENT-SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENT-SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENT-SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENT-SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENT-SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENT-SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENT-SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENT-SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENT-SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENT-SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENT-SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENT-SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENT-SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENT-SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENT-SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENT-SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENT-SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENT-SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENT-SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENT-SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENT-SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENT-SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENT-SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENT-SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENT-SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENT-SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENT-SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENT-SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENT-SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENT-SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENT-SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENT-SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENT-SKILLS.md)

---

> **Source de référence :** `src/lib/agentSkills/` (catalogue, générateur, analyseurs) + répertoire `skills/` (fichiers SKILL.md)
> **Dernière mise à jour :** 2026-08-02 — v3.8.50

Les compétences d’agent sont des fichiers SKILL.md structurés qui enseignent aux agents externes, aux clients MCP et aux orchestrateurs A2A comment utiliser l’API REST et la CLI d’OmniRoute. Contrairement aux [compétences Omni](./SKILLS.md) (qui sont des définitions d’outils LLM exécutées dans OmniRoute), les compétences d’agent constituent un _catalogue de documentation_ — du markdown statique pouvant être directement intégré au contexte d’un agent.

---

## Vue d’ensemble

Le catalogue contient **45 compétences d’agent** (23 pour l’API REST + 21 pour la CLI + 1 flux de travail de configuration). Chaque compétence possède :

- Un **ID canonique** (`omni-auth`, `cli-serve`, etc.)
- Un fichier **SKILL.md** dans `skills/{id}/SKILL.md`, avec un frontmatter YAML (`name`, `description`) et un corps markdown détaillé
- Des **endpoints REST** (compétences API) ou des **sous-commandes CLI** (compétences CLI) dérivés de la spécification OpenAPI et du registre CLI
- Une **URL GitHub brute** permettant une récupération en direct : `https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills/{id}/SKILL.md`

---

## Architecture

```
src/shared/constants/agentSkills.ts    — Liste organisée de 45 entrées (nom/description/catégorie/domaine/icône)
src/lib/agentSkills/
  catalog.ts                           — getCatalog(), getSkillById(), filterCatalog(), computeCoverage()
  generator.ts                         — generateAgentSkills() écrit les fichiers SKILL.md dans skills/{id}/
  openapiParser.ts                     — extrait les endpoints REST depuis docs/openapi.yaml
  cliRegistryParser.ts                 — extrait les sous-commandes CLI depuis bin/cli-registry.ts
  schemas.ts                           — Schémas Zod : AgentSkillSchema, SkillCoverageSchema, etc.
  types.ts                             — Interfaces TypeScript : AgentSkill, SkillCoverage, etc.

skills/{id}/SKILL.md                   — Fichiers markdown générés et organisés (45 au total)

src/app/api/agent-skills/
  route.ts                             — GET /api/agent-skills
  [id]/route.ts                        — GET /api/agent-skills/{id}
  [id]/raw/route.ts                    — GET /api/agent-skills/{id}/raw (text/markdown)
  coverage/route.ts                    — GET /api/agent-skills/coverage
  generate/route.ts                    — POST /api/agent-skills/generate (authentification requise)

open-sse/mcp-server/tools/agentSkillTools.ts  — 3 outils MCP (liste, récupération, couverture)
src/lib/a2a/skills/listCapabilities.ts        — Compétence A2A : list-capabilities
```

---

## Format SKILL.md

```markdown
---
name: omni-providers
description: "Gérer les connexions aux fournisseurs : ajouter, tester, renouveler et supprimer des identifiants."
---

<!-- généré par src/lib/agentSkills/generator.ts ; les modifications manuelles seront écrasées -->

## Vue d’ensemble

...

## Authentification

...

## Endpoints

...

<!-- skill:custom-start -->

## Section personnalisée (conservée lors des régénérations)

...

<!-- skill:custom-end -->
```

Le générateur conserve le contenu situé entre `<!-- skill:custom-start -->` et `<!-- skill:custom-end -->` lors de la régénération. Dix compétences comportent des blocs personnalisés organisés manuellement :

`omni-mcp`, `omni-compression`, `cli-providers`, `cli-eval`, `omni-agents-a2a`, `omni-combos-routing`, `omni-auth`, `omni-resilience`, `omni-inference`, `cli-serve`.

---

## Découverte de l’API REST

| Point de terminaison         | Méthode | Description                                                                    | Authentification |
| :--------------------------- | :------ | :----------------------------------------------------------------------------- | :--------------- |
| `/api/agent-skills`          | GET     | Répertorier le catalogue (`?category=api\|cli\|config&area=<area>` facultatif) | aucune           |
| `/api/agent-skills/{id}`     | GET     | Obtenir les métadonnées d’une compétence                                       | aucune           |
| `/api/agent-skills/{id}/raw` | GET     | Récupérer SKILL.md au format `text/markdown`                                   | aucune           |
| `/api/agent-skills/coverage` | GET     | Statistiques de couverture (nombre de fichiers SKILL.md existants)             | aucune           |
| `/api/agent-skills/generate` | POST    | Déclencher le générateur (dryRun/prune/onlyIds)                                | gestion          |

Exemple — répertorier toutes les compétences d’API :

```bash
curl "http://localhost:20128/api/agent-skills?category=api"
```

Exemple — récupérer un fichier SKILL.md :

```bash
curl -H "Accept: text/markdown" "http://localhost:20128/api/agent-skills/omni-providers/raw"
```

---

## Découverte MCP

Trois outils MCP sont enregistrés sous la portée `read:catalog` :

| Outil                             | Description                                                              |
| :-------------------------------- | :----------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | Répertorier les compétences (filtres `category` / `area` facultatifs)    |
| `omniroute_agent_skills_get`      | Obtenir les métadonnées et le fichier SKILL.md d’une compétence par `id` |
| `omniroute_agent_skills_coverage` | Statistiques de couverture (API/CLI disponibles/total)                   |

Consultez [MCP-SERVER.md](./MCP-SERVER.md) pour la configuration des portées et l’authentification.

---

## Découverte A2A

La compétence A2A `list-capabilities` renvoie le catalogue complet des 45 compétences sous forme d’artefact de tableau Markdown. Les orchestrateurs externes peuvent l’invoquer via :

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "message/send",
  "params": {
    "skill": "list-capabilities",
    "messages": [{ "role": "user", "content": "Répertorier toutes les fonctionnalités" }]
  }
}
```

Consultez [A2A-SERVER.md](./A2A-SERVER.md) pour les détails du protocole.

---

## Catalogue — 45 identifiants de compétence

### Compétences d’API (23)

| ID                     | Domaine         | Point d’entrée                                |
| :--------------------- | :-------------- | :-------------------------------------------- |
| `omni-auth`            | auth            | Gestion de l’authentification et des sessions |
| `omni-providers`       | providers       | Gestion des connexions aux fournisseurs       |
| `omni-models`          | models          | Catalogue et fonctionnalités des modèles      |
| `omni-combos-routing`  | combos-routing  | Stratégies de routage combinées               |
| `omni-api-keys`        | api-keys        | Gestion des clés d’API                        |
| `omni-usage-logs`      | usage-logs      | Journaux d’utilisation et de coûts            |
| `omni-budget`          | budget          | Garde-fous budgétaires                        |
| `omni-settings`        | settings        | Paramètres globaux                            |
| `omni-proxies`         | proxies         | Gestion du pool de proxys                     |
| `omni-cache`           | cache           | Cache sémantique et de prompts                |
| `omni-compression`     | compression     | Moteurs de compression du contexte            |
| `omni-context-rtk`     | context-rtk     | Compression RTK                               |
| `omni-resilience`      | resilience      | Disjoncteurs et délais de récupération        |
| `omni-cli-tools`       | cli-tools       | Proxy REST pour les outils CLI                |
| `omni-tunnels`         | tunnels         | Gestion des tunnels                           |
| `omni-sync-cloud`      | sync-cloud      | Synchronisation avec le cloud                 |
| `omni-db-backups`      | db-backups      | Sauvegardes de la base de données             |
| `omni-webhooks`        | webhooks        | Répartiteur d’événements webhook              |
| `omni-mcp`             | mcp             | Serveur MCP (110 outils, 3 transports)        |
| `omni-agents-a2a`      | agents-a2a      | Protocole d’agent A2A                         |
| `omni-version-manager` | version-manager | Gestion des versions et des mises à jour      |
| `omni-inference`       | inference       | Inférence directe / complétions               |

### Compétences CLI (21)

| ID                    | Domaine            | Commande CLI racine     |
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

### Flux de travail de configuration (1)

| ID                 | Domaine          | Point d’entrée                                 |
| :----------------- | :--------------- | :--------------------------------------------- |
| `config-codex-cli` | config-codex-cli | Flux de configuration de l’interface CLI Codex |

---

## Comment les agents externes utilisent les compétences

### 1. Découverte via REST

```bash
# Obtenir le catalogue complet
curl "http://your-omniroute/api/agent-skills" | jq '.skills[] | {id, name, category}'

# Obtenir SKILL.md pour l’injection de contexte
curl "http://your-omniroute/api/agent-skills/omni-providers/raw" > omni-providers.md
```

### 2. Découverte via MCP

```typescript
// Dans un client MCP Claude Desktop / Cursor :
const result = await client.callTool("omniroute_agent_skills_list", {
  category: "api",
});
// result.skills → tableau d’AgentSkill avec rawUrl pour chacun
```

### 3. Découverte via A2A

```python
import requests

resp = requests.post("http://your-omniroute/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {"skill": "list-capabilities", "messages": [{"role": "user", "content": "list"}]}
})
table = resp.json()["result"]["artifacts"][0]["content"]
# table est un tableau Markdown contenant les 45 identifiants de compétence et les colonnes rawUrl
```

### 4. Récupération directe du contenu brut depuis GitHub (aucun serveur requis)

```bash
BASE="https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills"
curl "${BASE}/omni-providers/SKILL.md"
```

---

## Générateur

Le générateur lit le catalogue sélectionné, la spécification OpenAPI et le registre CLI, puis écrit `skills/{id}/SKILL.md` pour chaque entrée :

```bash
# Aperçu (simulation, aucune écriture)
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":true}'

# Régénération complète
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"prune":false}'

# Régénérer des identifiants spécifiques
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"onlyIds":["omni-providers","cli-serve"]}'
```

La réponse du générateur est un `GeneratorReport` :

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

## API de couverture

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

## Ressources associées

- [SKILLS.md](./SKILLS.md) — Cadre Omni Skills (injection d’outils LLM + place de marché)
- [MCP-SERVER.md](./MCP-SERVER.md) — Catalogue d’outils MCP (outils `omniroute_agent_skills_*`)
- [A2A-SERVER.md](./A2A-SERVER.md) — Protocole A2A (compétence `list-capabilities`)
- `src/lib/agentSkills/` — catalogue, générateur, analyseurs
- `skills/` — fichiers SKILL.md générés (45 entrées)
