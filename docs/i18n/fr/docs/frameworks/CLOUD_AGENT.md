# Cloud Agents (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Source de vérité :** `src/lib/cloudAgent/` et `src/app/api/v1/agents/tasks/`
> **Dernière mise à jour :** 2026-06-28 — v3.8.40 (actualisation du frontmatter ; 4 agents, dont cursor-cloud)

OmniRoute orchestre des agents de codage tiers hébergés dans le cloud (Codex Cloud, Cursor,
Devin, Jules) sous forme de tâches de longue durée. Chaque agent est encapsulé derrière une interface uniforme afin que
les clients puissent envoyer un prompt + l’URL d’un dépôt et recevoir les résultats sans avoir à gérer
les API propres à chaque fournisseur.

Une tâche Cloud Agent n’est **pas** une complétion de chat classique. Il s’agit d’une unité de travail
durable et en plusieurs étapes, qui peut prendre de quelques minutes à plusieurs heures, produire une Pull Request comme
artefact et prendre en charge les messages de suivi ainsi que, chez certains fournisseurs, des étapes d’approbation du plan.

![Cycle de vie d’une tâche Cloud Agent](../diagrams/exported/cloud-agent-flow.svg)

> Source : [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Agents pris en charge

| ID du fournisseur | Classe             | Source                                | URL de base en amont                    | Approbation du plan |
| ----------------- | ------------------ | ------------------------------------- | --------------------------------------- | ------------------- |
| `jules`           | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Oui                 |
| `devin`           | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Oui                 |
| `codex-cloud`     | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Non (automatique)   |
| `cursor-cloud`    | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Non (automatique)   |

Registre : `src/lib/cloudAgent/registry.ts` — exporte `getAgent(providerId)`,
`getAvailableAgents()` et `isCloudAgentProvider(providerId)`. Le registre est un simple
`Record<string, CloudAgentBase>` en mémoire, alimenté lors du chargement du module.

## Architecture

```
Client (tableau de bord / CLI / API)
  → POST /api/v1/agents/tasks (authentification de gestion requise)
    → validation avec CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ récupère les données depuis getProviderConnections({ provider, isActive: true })
         (apiKey en premier, avec repli sur accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ requête HTTP POST vers l’API du fournisseur en amont
      └─ renvoie CloudAgentTask avec un id interne + externalId
    → insertCloudAgentTask(...) dans cloud_agent_tasks (SQLite)

Interrogation périodique (synchronisation différée lors de la lecture) :
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // actualise le statut + les activités
    → updateCloudAgentTask(...) avec le nouveau statut, le résultat et completed_at
    → renvoie la tâche sérialisée

Interactions :
  POST /api/v1/agents/tasks/[id]  corps : { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        pour "approve"
    → agent.sendMessage(externalId, message, credentials) pour "message"
    → le statut passe à "cancelled"                     pour "cancel" (local uniquement)
```

La synchronisation est **différée** : le statut est actualisé depuis le service en amont à chaque appel à `GET /tasks/[id]`.
Il n’existe aucun processus d’interrogation périodique en arrière-plan. Les tableaux de bord qui ont besoin d’un état à jour doivent interroger le point de terminaison GET
à un intervalle raisonnable.

## Interface `CloudAgentBase`

Source : `src/lib/cloudAgent/baseAgent.ts`

```typescript
export interface AgentCredentials {
  apiKey: string;
  baseUrl?: string;
}

export interface CreateTaskParams {
  prompt: string;
  source: CloudAgentSource;
  options: {
    autoCreatePr?: boolean;
    planApprovalRequired?: boolean;
    environment?: Record<string, string>;
  };
}

export interface GetStatusResult {
  status: CloudAgentStatus;
  externalId?: string;
  result?: CloudAgentResult;
  activities: CloudAgentActivity[];
  error?: string;
}

export abstract class CloudAgentBase {
  abstract readonly providerId: string;
  abstract readonly baseUrl: string;

  abstract createTask(p: CreateTaskParams, c: AgentCredentials): Promise<CloudAgentTask>;
  abstract getStatus(externalId: string, c: AgentCredentials): Promise<GetStatusResult>;
  abstract approvePlan(externalId: string, c: AgentCredentials): Promise<void>;
  abstract sendMessage(
    externalId: string,
    message: string,
    c: AgentCredentials
  ): Promise<CloudAgentActivity>;
  abstract listSources(
    c: AgentCredentials
  ): Promise<{ name: string; url: string; branch?: string }[]>;

  protected mapStatus(raw: string): CloudAgentStatus; // chaîne en amont heuristique → énumération
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` lève intentionnellement une exception — Codex Cloud génère automatiquement les plans et ne comporte
aucune étape d'approbation. `CodexCloudAgent.listSources` renvoie `[]`.

`CursorCloudAgent` pilote les agents Background / Cloud de Cursor via son API REST
officielle (`api.cursor.com/v0`) avec une **clé d'API d'utilisateur ou de compte de service** — l'alternative propriétaire
plus sûre à la réutilisation de la session OAuth de l'IDE Cursor (fournisseur `cursor`,
qui comporte un avertissement de risque de bannissement). Il s'agit d'un adaptateur REST simple (sans dépendance native
`@cursor/sdk`). `approvePlan` lève une exception (les agents Cursor fonctionnent de manière autonome) ; `listSources` répertorie
les dépôts accessibles avec la clé. Cursor renvoie des énumérations de statut en majuscules
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), explicitement mappées vers le
`CloudAgentStatus` partagé. `baseUrl` peut être remplacée pour chaque identifiant afin que la version/le chemin de l'API puisse
être corrigé sans modifier le code.

## Types du domaine

Source : `src/lib/cloudAgent/types.ts`

```typescript
export const CLOUD_AGENT_STATUS = {
  QUEUED: "queued",
  RUNNING: "running",
  AWAITING_APPROVAL: "awaiting_approval",
  COMPLETED: "completed",
  FAILED: "failed",
  CANCELLED: "cancelled",
} as const;

export interface CloudAgentSource {
  repoName: string;
  repoUrl: string; // doit être une URL valide
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // secondes, entier positif
  cost?: number; // nombre à virgule flottante positif
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // identifiant interne `task_...`
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // identifiant du fournisseur en amont
  status: CloudAgentStatus;
  prompt: string; // 1..10000 caractères
  source: CloudAgentSource;
  options: {
    autoCreatePr?: boolean;
    planApprovalRequired?: boolean;
    environment?: Record<string, string>;
  };
  result?: CloudAgentResult;
  activities: CloudAgentActivity[];
  error?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}
```

Les schémas de validation (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) sont
exportés avec les types et sont utilisés par les gestionnaires de routes.

## Base de données

Source : `src/lib/cloudAgent/db.ts` — la table est créée de manière différée via
`createCloudAgentTaskTable()` (également appelée depuis `src/lib/cloudAgent/index.ts` lors de
l’importation du module).

```sql
CREATE TABLE IF NOT EXISTS cloud_agent_tasks (
  id           TEXT PRIMARY KEY,
  provider_id  TEXT NOT NULL,
  external_id  TEXT,
  status       TEXT NOT NULL DEFAULT 'queued',
  prompt       TEXT NOT NULL,
  source       TEXT NOT NULL,             -- JSON
  options      TEXT DEFAULT '{}',         -- JSON
  result       TEXT,                       -- JSON
  activities   TEXT DEFAULT '[]',          -- JSON
  error        TEXT,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_provider ON cloud_agent_tasks(provider_id);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_status   ON cloud_agent_tasks(status);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_created  ON cloud_agent_tasks(created_at DESC);
```

`updateCloudAgentTask` applique une **liste blanche de colonnes** afin d’empêcher les injections SQL :
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Toute autre clé dans la mise à jour partielle est ignorée silencieusement.

## API REST — Cycle de vie des tâches

**Authentification :** Tous les points de terminaison `/api/v1/agents/tasks*` nécessitent une **authentification de gestion**
(`requireCloudAgentManagementAuth` encapsule `requireManagementAuth` provenant de
`src/lib/api/requireManagementAuth`). Cette règle est appliquée depuis le commit `588a0333`
(_« fix(auth): exiger l’authentification de gestion pour les API d’agents et de délai de récupération »_).

| Méthode | Chemin                        | Objectif                                                                                   |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------ |
| OPTIONS | `/api/v1/agents/tasks`        | Requête préliminaire CORS                                                                  |
| GET     | `/api/v1/agents/tasks`        | Répertorier les tâches (filtres : `provider`, `status`, `limit≤500`)                       |
| POST    | `/api/v1/agents/tasks`        | Créer une tâche (transmise au fournisseur en amont + persistée)                            |
| DELETE  | `/api/v1/agents/tasks?id=...` | Supprimer une tâche selon l’identifiant de requête (**sans** l’annuler en amont)           |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | Requête préliminaire CORS                                                                  |
| GET     | `/api/v1/agents/tasks/[id]`   | Lire la tâche + synchroniser de manière différée son statut depuis le fournisseur en amont |
| POST    | `/api/v1/agents/tasks/[id]`   | Action : `approve` / `message` / `cancel`                                                  |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Supprimer une tâche selon l’identifiant du chemin                                          |

### Créer une tâche

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "providerId": "devin",
    "prompt": "Fix the bug in src/foo.ts where the parser returns null",
    "source": {
      "repoName": "user/repo",
      "repoUrl": "https://github.com/user/repo",
      "branch": "main"
    },
    "options": {
      "autoCreatePr": true,
      "planApprovalRequired": false
    }
  }'
```

Réponse `201` :

```json
{
  "data": {
    "id": "task_1731512345678_abc123def",
    "providerId": "devin",
    "externalId": "session_xyz",
    "status": "queued",
    "prompt": "...",
    "source": { "repoName": "user/repo", "repoUrl": "...", "branch": "main" },
    "options": { "autoCreatePr": true },
    "createdAt": "2026-05-13T12:34:56.789Z"
  }
}
```

### Approuver un plan

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Envoyer un message de suivi

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Annuler (statut local uniquement)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` définit `status` sur `"cancelled"` dans la base de données locale, mais **n’appelle pas** le
fournisseur en amont — aucune RPC d’interruption n’existe dans `CloudAgentBase`. Pour arrêter la facturation
en amont, mettez fin à la tâche dans la propre console du fournisseur.

## API REST — infrastructure des fournisseurs cloud

Ces points de terminaison auxiliaires sous `src/app/api/cloud/` sont utilisés par les clients distants
(la CLI, l’application Electron ou les workers de synchronisation) pour lire les métadonnées de connexion
des fournisseurs et résoudre les alias de modèles. Ils sont authentifiés avec une **clé API standard**
(via `validateApiKey`), et non avec l’authentification d’administration utilisée par les points de terminaison des tâches.

| Méthode | Chemin                          | Objectif                                                                                                  |
| ------- | ------------------------------- | --------------------------------------------------------------------------------------------------------- |
| POST    | `/api/cloud/auth`               | Valider la clé API et renvoyer les métadonnées de connexion masquées ainsi que les alias de modèles       |
| PUT     | `/api/cloud/credentials/update` | Actualiser `accessToken` / `refreshToken` / `expiresAt`                                                   |
| POST    | `/api/cloud/model/resolve`      | Résoudre un alias de modèle en `{ provider, model }`                                                      |
| GET     | `/api/cloud/models/alias`       | Répertorier tous les alias de modèles                                                                     |
| PUT     | `/api/cloud/models/alias`       | Définir un alias de modèle (et le synchroniser automatiquement avec le cloud si cette option est activée) |

`/api/cloud/auth` ne renvoie jamais les valeurs brutes de `apiKey` / `accessToken` / `refreshToken`. Il
renvoie `hasApiKey`, `hasAccessToken`, `hasRefreshToken` ainsi qu’un aperçu masqué
(`maskedApiKey` : les 4 premiers caractères + `****` + les 4 derniers).

## Résolution des identifiants

`getCloudAgentCredentials(providerId)` dans `src/lib/cloudAgent/api.ts` :

1. Charge les connexions actives du fournisseur via `getProviderConnections({ provider: providerId, isActive: true })`.
2. Pour chaque connexion, donne la priorité à `apiKey` (sans espaces superflus). Utilise `accessToken` à défaut.
3. Renvoie le premier jeton non vide sous la forme `{ apiKey: token }`.
4. Renvoie `null` si aucun jeton utilisable n’est trouvé — l’API répond avec le code `400` et
   `"Aucun identifiant actif configuré pour le fournisseur d’agent cloud : <id>"`.

Cela signifie que les agents cloud réutilisent la même table de connexions de fournisseurs que les fournisseurs
LLM classiques. Pour activer Jules, créez une connexion active avec `provider: "jules"`
et une valeur `apiKey` renseignée.

## Tableau de bord

Source : `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

Une page React `"use client"` qui :

- Répertorie les tâches (interrogées périodiquement via `GET /api/v1/agents/tasks`).
- Soumet de nouvelles tâches au moyen d’un formulaire correspondant à `CreateCloudAgentTaskSchema`.
- Affiche des badges d’état (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) et restitue la chronologie `activities[]`.
- Affiche `result.prUrl` / `commitMessage` / `summary` lorsque `status === "completed"`.

## Intégration avec A2A

Les agents cloud peuvent être exposés en tant que compétences A2A en enregistrant une compétence A2A qui délègue
son gestionnaire `tasks/send` à `getAgent(...).createTask(...)` et traduit les événements d’état des tâches A2A
vers le protocole JSON-RPC 2.0. Consultez [A2A-SERVER.md](./A2A-SERVER.md).

## Ajout d’un nouvel agent cloud

1. Créez `src/lib/cloudAgent/agents/<name>.ts` en étendant `CloudAgentBase`.
2. Implémentez `createTask`, `getStatus`, `approvePlan` (ou levez une exception si non applicable),
   `sendMessage`, `listSources`. Utilisez `this.mapStatus(...)` pour normaliser les états.
3. Enregistrez-le dans `src/lib/cloudAgent/registry.ts` sous un `providerId` stable.
4. Étendez l’union de littéraux `providerId` dans `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` et `CreateCloudAgentTaskSchema`).
5. Ajoutez le fournisseur à `src/shared/constants/providers.ts` s’il nécessite un enregistrement
   de connexion. Les fournisseurs basés sur OAuth nécessitent également `src/lib/oauth/providers/`.
6. Ajoutez des tests sous `tests/unit/cloud-agent-*.test.ts`.
7. Mettez à jour ce document et la constante `CLOUD_AGENTS` du tableau de bord.

## Configuration

| Variable d’environnement | Rôle                                                                               |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `DATA_DIR`               | Emplacement de la base de données SQLite contenant `cloud_agent_tasks`             |
| `JWT_SECRET`             | Requis pour l’authentification de gestion sur les points de terminaison des tâches |
| `API_KEY_SECRET`         | Requis pour chiffrer au repos les identifiants de connexion aux fournisseurs       |

Il n’existe actuellement aucune variable d’environnement spécifique à Cloud-Agent — chaque secret réside dans la table
`provider_connections`.

## Voir aussi

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Source : `src/lib/cloudAgent/`
- Routes : `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Tableau de bord : `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
