# CLI-TOOLS (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "Outils CLI — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# Outils CLI — OmniRoute

Dernière mise à jour : 2026-08-18

OmniRoute s'intègre avec trois catégories d'outils CLI répartis sur trois pages de tableau de bord dédiées :

| Page           | Route                   | Concept                                                                                   | Compte        |
| -------------- | ----------------------- | ----------------------------------------------------------------------------------------- | ------------- |
| **Code CLI**   | `/dashboard/cli-code`   | Outils de codage que vous pointez vers OmniRoute (Client → CLI → OmniRoute → Fournisseur) | 26            |
| **Agents CLI** | `/dashboard/cli-agents` | Agents autonomes que vous pointez vers OmniRoute (même flux, portée plus large)           | 8             |
| **Agents ACP** | `/dashboard/acp-agents` | CLIs qu'OmniRoute génère en tant que backend via stdio/ACP (flux inverse)                 | voir registre |

Les routes héritées redirigent via 308 : `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Comment ça fonctionne

```
Code CLI / Agents CLI (flux de consommation) :
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (tous pointent vers OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute route vers le bon fournisseur)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

Agents ACP (flux de génération inverse) :
    Demande client → OmniRoute → génère CLI via stdio/ACP → réponse
```

**Avantages :**

- Une clé API pour gérer tous les outils
- Suivi des coûts à travers tous les CLIs dans le tableau de bord
- Changement de modèle sans reconfigurer chaque outil
- Fonctionne localement et sur des serveurs distants (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Auto-configuration avec `setup-*`

Vous n'avez pas à écrire la configuration de chaque outil à la main. OmniRoute fournit une commande `setup-*`
par CLI supporté qui lit le catalogue de modèles **en direct** d'un OmniRoute en cours d'exécution
(local ou distant) et écrit la configuration propre de l'outil sur votre machine :

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

Chacune accepte `--remote <url> --api-key <key>` (configurer un outil local contre un
OmniRoute distant), `--dry-run` (aperçu sans écriture), et `--port`. Les outils
sans découverte automatique de modèle (Cline, Kilo, Roo, Goose, Aider, Qwen) prennent
`--model <id>` (et `--yes` pour des exécutions non interactives). Pour lancer un CLI avec le
bon environnement injecté et aucune configuration écrite, utilisez le lanceur générique
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen,
gemini — cibles et alias proviennent de `bin/cli/cli-manifest.mjs`); les lanceurs par outil hérités `omniroute launch` (Claude Code) et `omniroute launch-codex`
(Codex) restent disponibles. Le CLI Gemini est uniquement pour le lancement : c'est une cible `omniroute run`
mais n'a pas de recette `setup-*`/`configure`.

> **Référence complète :** le tableau maître — ce que chaque commande écrit, chaque drapeau,
> local vs distant, et quels outils veulent un suffixe `/v1` — se trouve dans
> **[Intégrations CLI](../guides/CLI-INTEGRATIONS.md)**.

### Exécution de ces commandes à l'intérieur d'un conteneur

Une commande `setup-*` exécutée à l'intérieur du conteneur OmniRoute écrit dans le
dossier personnel du conteneur, que aucun CLI hôte ne lit et qui disparaît avec le
conteneur. OmniRoute détecte cela et sort avec `2` avec des instructions plutôt que
d'écrire. Deux façons prises en charge — installer le CLI sur l'hôte et
`omniroute connect` au conteneur, ou monter les répertoires de configuration et définir
`CLI_CONFIG_HOME` (le profil `host` de compose). Chaque commande `setup-*`, plus
`omniroute configure` et `omniroute config set`, accepte
`--allow-container-write` lorsque la configuration des CLIs propres au conteneur est ce que vous
vouliez réellement ; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` fait la même chose pour
le serveur. Voir
[Guide Docker → Configuration des outils CLI hôtes](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

Le **point de terminaison d'application** du tableau de bord (`POST /api/cli-tools/apply`) impose la
même protection : dans un conteneur, une écriture dont la cible n'est pas montée à partir de
l'hôte répond **`422`** avec `containerEphemeralTarget: true`, le texte d'erreur sécurisé et — pour les outils avec une recette hôte (claude, codex, opencode, cline,
kilo, continue) — une `hostSetupCommand` (par exemple `omniroute setup-opencode`) à exécuter
sur l'hôte à la place ; rien n'est écrit. `dryRun: true` continue de fonctionner en mode conteneur
et retourne le contenu généré + le chemin cible sans toucher au disque, vous permettant de prévisualiser depuis le tableau de bord et d'appliquer sur l'hôte. Ce comportement est
intentionnel et protégé contre les régressions par
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — ne "réparez" jamais un 422
en supprimant la protection.

---

## Source de vérité

Le catalogue unifié se trouve dans `src/shared/constants/cliTools.ts` sous `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Chaque entrée a ces champs (définis dans `src/shared/schemas/cliCatalog.ts`):

| Champ                                           | Type                                                         | Description                                                                        |
| ----------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | Sur quelle page l'outil apparaît                                                   |
| `vendor`                                        | `string`                                                     | Origine de l'outil ("Anthropic", "OSS (P. Gauthier)")                              |
| `acpSpawnable`                                  | `boolean`                                                    | Également utilisable en tant qu'agent ACP (badge affiché)                          |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Niveau de support des points de terminaison personnalisés. `"none"` = backlog MITM |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Mécanisme de configuration                                                         |
| `id`, `name`, `color`, `description`, `docsUrl` | standard                                                     | Champs d'affichage principaux                                                      |

Les entrées avec `baseUrlSupport: "none"` **ne sont pas affichées** dans les pages du tableau de bord — elles sont enregistrées dans le backlog MITM pour le plan 11 (voir `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Niveaux de capacité (catalogué × détectable × configurable × lançable)

Tous les outils catalogués ne sont pas détectables, configurables ou lançables. Chaque niveau a une source déclarative, et un test de dérive les maintient alignés :

| Niveau         | Signification                                                                                 | Déclaré dans                                                            |
| -------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Catalogué**  | Apparaît dans le catalogue du tableau de bord (nom, fournisseur, docs, type de configuration) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                        |
| **Détectable** | Détection binaire/configuration, vérifications de santé, chemins de configuration             | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` catalogue d'exécution) |
| **Configuré**  | Supporté par `omniroute configure <cli>` (recette de configuration existante)                 | `bin/cli/cli-manifest.mjs` (`configure: true`)                          |
| **Lançable**   | Supporté par `omniroute run <target>` (injection d'env/args définie)                          | `bin/cli/cli-manifest.mjs` (`run: true`)                                |

`bin/cli/cli-manifest.mjs` est le manifeste exécutable canonique pour les commandes CLI : `run`, `configure` et les générateurs de complétion de shell dérivent tous leurs listes de cibles, résolution d'alias (par exemple `kilocode`/`kilo-code`/`kilo_cli` → `kilo`) et câblage du drapeau `--model` à partir de celui-ci. Le garde de dérive `tests/unit/cli/cli-manifest-drift.test.ts` affirme que le manifeste, le catalogue d'exécution, le catalogue UI et chaque surface de consommateur restent synchronisés — une cible ajoutée à une surface sans les autres échoue la suite au lieu de dériver silencieusement.

## 1. Catalogue des outils CLI (26 outils)

Tous les outils qui apparaissent dans `/dashboard/cli-code`. Ceux avec `baseUrlSupport: none` sont connectés via MITM ou un guide manuel au lieu d'une URL de base personnalisée :

| id           | nom                     | fournisseur         | supportBaseUrl | typeConfig                | acpSpawnable |
| ------------ | ----------------------- | ------------------- | -------------- | ------------------------- | ------------ |
| claude       | Claude Code             | Anthropic           | complet        | env                       | vrai         |
| codex        | OpenAI Codex CLI        | OpenAI              | complet        | personnalisé              | vrai         |
| zcode        | ZCode (GLM Coding Plan) | Z.ai                | aucun          | personnalisé              | faux         |
| cline        | Cline                   | OSS (ex-Claude Dev) | complet        | personnalisé              | vrai         |
| kilo         | Kilo Code               | Kilo-Org            | complet        | personnalisé              | faux         |
| roo          | Roo Code                | Roo (OSS)           | complet        | guide                     | faux         |
| continue     | Continue                | continue.dev        | complet        | guide                     | faux         |
| aider        | Aider                   | OSS (P. Gauthier)   | complet        | guide                     | vrai         |
| forge        | ForgeCode               | Antinomy HQ         | complet        | personnalisé              | vrai         |
| jcode        | jcode                   | 1jehuang (OSS)      | complet        | personnalisé              | faux         |
| deepseek-tui | DeepSeek TUI            | Hunter Bown (OSS)   | complet        | personnalisé              | faux         |
| codewhale    | CodeWhale               | Hmbown (OSS)        | complet        | personnalisé              | faux         |
| opencode     | OpenCode                | Anomaly (ex-SST)    | complet        | guide                     | vrai         |
| droid        | Factory Droid           | Factory AI          | partiel        | guide                     | faux         |
| copilot      | GitHub Copilot CLI      | GitHub/MS           | complet        | personnalisé              | faux         |
| cursor-cli   | Cursor CLI              | Anysphere           | partiel        | guide                     | vrai         |
| smelt        | Smelt                   | leonardcser (OSS)   | complet        | personnalisé              | faux         |
| pi           | Pi (pi-coding-agent)    | M. Zechner (OSS)    | complet        | personnalisé              | faux         |
| grok-build   | Grok Build              | xAI                 | complet        | personnalisé              | faux         |
| crush        | Crush                   | OSS (Charm)         | complet        | personnalisé              | faux         |
| qwen         | Qwen Code               | Alibaba             | complet        | guide                     | vrai         |
| cursor       | Cursor                  | Anysphere           | aucun          | guide                     | faux         |
| antigravity  | Antigravity             | Google              | aucun          | mitm                      | faux         |
| hermes       | Hermes                  | Nous Research       | aucun          | guide                     | faux         |
| kiro         | Kiro AI                 | Amazon              | aucun          | mitm                      | faux         |
| custom       | Custom CLI              | —                   | complet        | constructeur-personnalisé | faux         |

Les outils avec `baseUrlSupport: "partiel"` affichent un badge "⚠ Base URL partiel" dans la carte du tableau de bord.
---

## 2. Catalogue des agents CLI (8 outils)

Agents autonomes qui apparaissent dans `/dashboard/cli-agents` :

| id           | nom              | fournisseur              | baseUrlSupport | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Agent Hermes     | Nous Research            | complet        | faux         |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | complet        | vrai         |
| goose        | Goose            | Block / Linux Foundation | complet        | vrai         |
| interpreter  | Open Interpreter | OSS                      | complet        | vrai         |
| warp         | Warp AI          | Warp Inc.                | partiel        | vrai         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | complet        | faux         |
| omp          | Oh My Pi         | OSS                      | complet        | vrai         |
| letta        | Letta CLI        | Letta                    | complet        | faux         |

---

## 3. Agents ACP (/dashboard/acp-agents)

Cette page (renommée depuis `/dashboard/agents`) montre les CLI que OmniRoute peut **générer** en tant que moteurs d'exécution backend via le protocole stdio/ACP. Le catalogue est maintenu séparément dans `src/lib/acp/registry.ts` et **n'est pas** le même que `CLI_TOOLS`.

---

## 4. Retard MITM (non affiché dans le tableau de bord)

Les CLI suivantes ne prennent pas en charge l'URL de base personnalisée nativement et **ne sont pas listées** dans les pages de Code CLI ou d'Agents CLI. Elles sont candidates à l'interception MITM dans le plan 11 :

| CLI                 | Raison                                                         |
| ------------------- | -------------------------------------------------------------- |
| windsurf            | BYOK limité à certains modèles Claude + URL/token d'entreprise |
| amp                 | Écosystème fermé (Sourcegraph)                                 |
| amazon-q / kiro-cli | Auth AWS SSO, pas d'URL personnalisée                          |
| cowork              | Anthropic Desktop, pas de point de terminaison configurable    |

Voir `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` pour la référence complète.

---

## 5. API de détection par lot

Toute détection d'outil est agrégée via un seul point de terminaison :

**`GET /api/cli-tools/all-statuses`**

- Auth : `requireCliToolsAuth(request)` (identique aux autres routes `/api/cli-tools/`)
- Retourne : `Record<toolId, ToolBatchStatus>` (type : `src/shared/types/cliBatchStatus.ts`)
- Stratégie : `Promise.all` sur tous les outils, délai d'attente de 5s par outil
- Cache : LRU en mémoire indexé par le fichier de configuration `mtime`. Cache invalidé lorsque mtime change. Réinitialisé au redémarrage du serveur.

Structure de la réponse par outil :

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // assaini, pas de traces de pile
}
```

## 6. Gestionnaires de Paramètres pour Nouveaux Outils

Les nouveaux outils avec `configType: "custom"` ont des routes API de paramètres dédiées :

| Route                                       | Outil                                                                        |
| ------------------------------------------- | ---------------------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                                      |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                                      |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                                       |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primaire + synchronisation legacy `~/.deepseek`) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                                        |
| `POST /api/cli-tools/pi-settings`           | Agent de codage Pi                                                           |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)                        |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + clé `.env` dédiée)                      |

Toutes les routes utilisent `sanitizeErrorMessage()` pour les réponses d'erreur (Règle stricte #12).

---

## 7. Architecture des Pages du Tableau de Bord

### Code CLI (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — composant serveur
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — grille client
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — page de détail de l'outil
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 cartes d'outils spécialisées + `ToolDetailClient.tsx`

### Agents CLI (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — composant serveur
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — grille client
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — réutilise `ToolDetailClient`

### Agents ACP (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — composant serveur (déplacé de `agents/`)

### Composants UI Partagés (`src/shared/components/cli/`)

| Fichier                 | But                                                                   |
| ----------------------- | --------------------------------------------------------------------- |
| `CliToolCard.tsx`       | Carte d'état intelligente (détection + config + point de terminaison) |
| `CliConceptCard.tsx`    | Carte d'explication de concept par page                               |
| `CliComparisonCard.tsx` | Comparaison en trois colonnes entre les types de CLI                  |
| `BaseUrlSelect.tsx`     | Menu déroulant de point de terminaison (Local/Cloud/Personnalisé)     |
| `ApiKeySelect.tsx`      | Sélecteur de clé API                                                  |
| `ManualConfigModal.tsx` | Modal de snippet de configuration copiable                            |

### Hook Partagé (`src/shared/hooks/cli/`)

| Fichier                   | But                                                                                |
| ------------------------- | ---------------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Récupère `/api/cli-tools/all-statuses`, gère l'état de chargement/rafraîchissement |

## 8. i18n

Nouveaux espaces de noms ajoutés dans le plan 14 F9 :

| Namespace   | But                                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------------------- |
| `cliCommon` | Chaînes partagées (étiquettes de carte, textes de concept/comparaison, étiquettes de page de détail) |
| `cliCode`   | Chaînes de page du code CLI                                                                          |
| `cliAgents` | Chaînes de page des agents CLI                                                                       |
| `acpAgents` | Chaînes de page des agents ACP                                                                       |

Des traductions complètes en PT-BR et EN sont fournies. 39 autres locales se rabattent automatiquement sur l'EN via la fusion au niveau de l'espace de noms dans `src/i18n/request.ts`.

---

## 9. Démarrage rapide

### Étape 1 — Obtenez une clé API OmniRoute

1. Ouvrez `/dashboard/api-manager` → **Créer une clé API**
2. Donnez-lui un nom (par exemple `cli-tools`) et sélectionnez toutes les autorisations
3. Copiez la clé — vous en aurez besoin pour chaque CLI ci-dessous

> Votre clé ressemble à : `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Étape 2 — Installez les outils CLI

Tous les outils basés sur npm nécessitent Node.js 22.22.2+ ou 24.x :

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Google Gemini CLI (lancé via `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Basé sur Rust

# Agent de codage Pi
# voir https://github.com/zechnerj/pi-coding-agent pour l'installation

# jcode
# voir https://github.com/1jehuang/jcode pour l'installation
```

---

### Étape 3 — Configurez via le tableau de bord

1. Allez à `http://localhost:20128/dashboard/cli-code`
2. Trouvez votre outil dans la grille
3. Cliquez sur la carte pour ouvrir la page de détail de l'outil
4. Sélectionnez votre clé API et l'URL de base
5. Cliquez sur **Appliquer la configuration** ou copiez le snippet de configuration manuelle

---

### Étape 4 — Définir des variables d'environnement globales

```bash
# Point de terminaison universel OmniRoute
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Le CLI Gemini lit GOOGLE_GEMINI_BASE_URL à la RACINE (son SDK ajoute /v1beta/... lui-même)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Pour un **serveur distant**, remplacez `localhost:20128` par l'IP ou le domaine du serveur,
> par exemple `http://<your-server-ip>:20128`.

---

### Étape 4 — Configurez chaque outil

#### Claude Code

```bash
# Créez ~/.claude/settings.json :
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Utilisez la racine de la passerelle unifiée Anthropic pour Claude Code. Ne pas ajouter `/v1` ici.

**Test :** `claude "say hello"`

---

#### OpenAI Codex

Le Codex moderne (v0.137+) lit uniquement `~/.codex/config.toml` — l'ancien
`config.yaml` appartient au CLI npm hérité et est silencieusement ignoré. La clé API
reste dans la variable d'environnement `OMNIROUTE_API_KEY` (`env_key`), jamais
dans le fichier :

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

Référence complète (profils, `wire_api`, fenêtres de contexte) : [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**Test :** `codex "what is 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "sk-your-omniroute-key"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**Test :** `opencode`

> Utilisez `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> pour envoyer des variantes de réflexion.

---

#### Cline (CLI ou VS Code)

**Mode CLI :**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**Mode VS Code :**
Paramètres de l'extension Cline → Fournisseur API : `OpenAI Compatible` → URL de base : `http://localhost:20128/v1`

Ou utilisez le tableau de bord OmniRoute → **Outils CLI → Cline → Appliquer la configuration**.

---

#### KiloCode (CLI ou VS Code)

**Mode CLI :**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Paramètres VS Code :**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Ou utilisez le tableau de bord OmniRoute → **Outils CLI → KiloCode → Appliquer la configuration**.

---

#### Continue (Extension VS Code)

Éditez `~/.continue/config.yaml` :

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Redémarrez VS Code après l'édition.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Utilisez ceci lorsque VS Code Insiders est configuré pour des modèles de point de terminaison personnalisés et que vous souhaitez qu'OmniRoute fonctionne sans champ d'en-tête personnalisé.

**Emplacement recommandé :**

- Linux : `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows : `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Exemple utilisant l'alias OmniRoute tokenisé :**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**Remarques :**

- Remplacez `sk-your-omniroute-key` par une clé API créée dans OmniRoute.
- Le champ `url` doit pointer vers `/api/v1/vscode/{token}/chat/completions`.
- Le champ `modelsUrl` doit pointer vers `/api/v1/vscode/{token}/models`.
- Préférez le flux normal `/v1` + en-tête Bearer lorsque le client prend en charge les en-têtes personnalisés.
- Les tokens intégrés dans l'URL sont un retour de compatibilité et peuvent apparaître dans les journaux de l'éditeur ou l'historique du proxy.

---

#### Kiro CLI (Amazon)

```bash
# Connectez-vous à votre compte AWS/Kiro :
kiro-cli login

# Le CLI utilise sa propre authentification — OmniRoute n'est pas nécessaire en tant que backend pour Kiro CLI lui-même.
# Utilisez kiro-cli avec OmniRoute pour d'autres outils.
kiro-cli status
```

Pour l'application de bureau **Kiro IDE**, utilisez le point de terminaison MITM exposé par OmniRoute
sous `/dashboard/cli-tools → Kiro`.

---

## 10. CLI OmniRoute Interne

Le binaire `omniroute` fournit des commandes pour le cycle de vie du serveur, la configuration, le diagnostic et la gestion des fournisseurs. Point d'entrée : `bin/omniroute.mjs`.

```bash
omniroute                              # Démarrer le serveur (port par défaut 20128)
omniroute setup                        # Assistant de configuration interactif
omniroute doctor                       # Vérifier la configuration, la base de données, les ports, l'exécution
omniroute providers list               # Connexions de fournisseurs configurées
omniroute providers test-all           # Tester chaque connexion active
omniroute reset-password               # Réinitialiser le mot de passe admin
omniroute logs                         # Diffuser les journaux de requêtes
omniroute health                       # Santé détaillée (disjoncteurs, cache, mémoire)
omniroute --version                    # Afficher la version
omniroute --help                       # Afficher toutes les commandes
```

### Configuration et Initialisation

```bash
omniroute setup                        # Assistant de configuration interactif
omniroute setup --non-interactive      # Mode CI/automatisation (lit les variables d'environnement + flags)
omniroute setup --password '<value>'   # Définir le mot de passe admin directement
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Ajouter et tester un fournisseur en une seule fois
```

Variables d'environnement reconnues pour la configuration non interactive :

| Var                 | But                                                                |
| ------------------- | ------------------------------------------------------------------ |
| `OMNIROUTE_API_KEY` | Clé API du fournisseur (liée à `--api-key` via Commander `.env()`) |
| `DATA_DIR`          | Remplacer le répertoire de données d'OmniRoute                     |

Toutes les autres entrées non interactives sont passées en tant que flags, pas en tant que variables d'environnement :
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(voir les options `omniroute setup` ci-dessus).

### Diagnostics

```bash
omniroute doctor                       # Vérifier la configuration, la base de données, les ports, l'exécution, la mémoire, la vivacité
omniroute doctor --json                # JSON lisible par machine
omniroute doctor --no-liveness         # Ignorer le probe de santé HTTP
omniroute doctor --host 0.0.0.0        # Remplacer l'hôte de vivacité
omniroute doctor --liveness-url <url>  # Remplacer l'URL de l'endpoint de santé complet
```

Le doctor effectue ces vérifications : `Configuration`, `Base de données`, `Stockage/chiffrement`,
`Disponibilité des ports`, `Exécution de Node`, `Binaire natif` (better-sqlite3),
`Mémoire`, et `Vivacité du serveur`. Il sort avec un code non nul si une vérification échoue.

### Gestion des Fournisseurs

```bash
omniroute providers available                       # Catalogue des fournisseurs OmniRoute
omniroute providers available --search openai       # Filtrer le catalogue par id/nom/alias/catégorie
omniroute providers available --category api-key    # Filtrer par catégorie (api-key, oauth, gratuit, ...)
omniroute providers available --json                # JSON lisible par machine

omniroute providers list                            # Connexions de fournisseurs configurées
omniroute providers list --json

omniroute providers test <id|name>                  # Tester une connexion configurée
omniroute providers test-all                        # Tester chaque connexion active
omniroute providers validate                        # Validation structurelle locale uniquement
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Flux OAuth existant
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` sont orientés API et fonctionnent donc contre
le contexte local ou distant actif. L'entrée des identifiants doit utiliser
`--credential-stdin` ou `--credential-env`; `--dry-run --json` ne rapporte que
la présence/forme masquée. `providers available` lit le catalogue OmniRoute ;
`providers list/test/test-all/validate` conservent leur comportement SQLite local et
ne nécessitent pas que le serveur soit en cours d'exécution.

### Récupération et Réinitialisation

```bash
omniroute reset-password                # Réinitialiser le mot de passe admin (aussi : omniroute-reset-password)
omniroute reset-encrypted-columns       # Afficher un avertissement + exécution à blanc pour la réinitialisation des identifiants chiffrés
omniroute reset-encrypted-columns --force  # Réinitialiser réellement les identifiants chiffrés dans SQLite
```

### Exportation des Identifiants (⚠ à manipuler avec précaution)

```bash
omniroute auth export                                 # Afficher un avertissement + porte de confirmation — pas d'accès à la base de données
omniroute auth export --force                          # Exporter tous les identifiants déchiffrés des connexions vers stdout au format JSON
omniroute auth export --force --id <id>                 # Exporter uniquement la connexion correspondante
omniroute auth export --force --format env               # Émettre des lignes OMNIROUTE_<PROVIDER>_<FIELD>=<value>
omniroute auth export --force --out creds.json           # Écrire dans un fichier (créé avec des permissions 0600)
```

`auth export` est **local uniquement** (lecture directe de SQLite, pas de route HTTP) et imprime/écrit intentionnellement
des valeurs **en texte clair** `apiKey`/`accessToken`/`refreshToken`/`idToken` — c'est la fonctionnalité, pas un
bug. Rien n'est lu dans la base de données, et rien n'est déchiffré, sans `--force`. Une bannière d'avertissement stderr
s'imprime toujours avant que du texte clair ne soit émis. Nécessite que `STORAGE_ENCRYPTION_KEY` soit
défini. Un champ qui échoue à se déchiffrer (clé obsolète, texte chiffré corrompu) est signalé comme
`<field>DecryptFailed: true` au lieu d'abandonner l'ensemble de l'exportation ou de divulguer l'erreur sous-jacente.

### Autres sous-commandes

Celles-ci supposent un serveur OmniRoute en cours d'exécution, sauf indication contraire :

```bash
omniroute status                       # État d'exécution complet
omniroute logs                         # Diffuser les journaux de requêtes (--json, --search, --follow)
omniroute config show                  # Afficher la configuration actuelle

omniroute provider list                # Lister les fournisseurs disponibles (alias de providers list)
omniroute provider add                 # Enregistrer OmniRoute en tant que fournisseur sur un outil
omniroute keys add | list | remove     # Gérer les clés API
omniroute models [provider]            # Lister les modèles (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Instantané de la configuration + base de données
omniroute restore                      # Restaurer à partir d'un instantané précédent

omniroute health                       # Santé détaillée (disjoncteurs, cache, mémoire)
omniroute quota                        # Utilisation du quota du fournisseur
omniroute cache                        # État du cache
omniroute cache clear                  # Effacer les caches sémantiques + de signature

omniroute mcp status | restart         # État du serveur MCP / redémarrer
omniroute a2a status | card            # État du serveur A2A / carte d'agent

omniroute tunnel list | create | stop  # Gérer les tunnels (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Inspecter / définir les variables d'environnement (temporaire)

omniroute test                         # Test de connectivité du fournisseur
omniroute update                       # Vérifier les mises à jour
omniroute completion                   # Générer la complétion de shell
```

### Flags Communs

| Flag                | Description                                               |
| ------------------- | --------------------------------------------------------- |
| `--no-open`         | Ne pas ouvrir automatiquement le navigateur au démarrage  |
| `--port <n>`        | Remplacer le port API (par défaut 20128)                  |
| `--mcp`             | Exécuter en tant que serveur MCP via stdio (pour les IDE) |
| `--non-interactive` | Mode CI (pas de prompts ; lit depuis env/flags)           |
| `--json`            | Sortie JSON lisible par machine (doctor, providers, etc.) |
| `--help`, `-h`      | Afficher l'aide spécifique à la commande                  |
| `--version`, `-v`   | Afficher la version installée                             |

---

## Points de terminaison API disponibles

| Point de terminaison       | Description                           | Utilisé pour                            |
| -------------------------- | ------------------------------------- | --------------------------------------- |
| `/v1/chat/completions`     | Chat standard (tous les fournisseurs) | Tous les outils modernes                |
| `/v1/responses`            | API des réponses (format OpenAI)      | Codex, flux agentique                   |
| `/v1/completions`          | Complétions de texte héritées         | Outils plus anciens utilisant `prompt:` |
| `/v1/embeddings`           | Embeddings de texte                   | RAG, recherche                          |
| `/v1/images/generations`   | Génération d'images                   | GPT-Image, Flux, etc.                   |
| `/v1/audio/speech`         | Texte en parole                       | ElevenLabs, OpenAI TTS                  |
| `/v1/audio/transcriptions` | Parole en texte                       | Deepgram, AssemblyAI                    |

Exemples prêts à coller avec une URL OmniRoute tokenisée :

```txt
Exemple de token : sk-a3ab3c080beaee3a-69f4a4-070d71af

Base OpenAI standard : http://localhost:20128/v1
Modèles VS Code : http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
Chat VS Code : http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
Réponses VS Code : http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Tags Ollama : http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Chat Ollama : http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Dépannage

| Erreur                                                         | Cause                              | Solution                                                        |
| -------------------------------------------------------------- | ---------------------------------- | --------------------------------------------------------------- |
| `Connection refused`                                           | OmniRoute non en cours d'exécution | `omniroute serve`                                               |
| `401 Unauthorized`                                             | Clé API incorrecte                 | Vérifiez dans `/dashboard/api-manager`                          |
| `No combo configured`                                          | Pas de combo de routage actif      | Configurez dans `/dashboard/combos`                             |
| CLI affiche "not installed"                                    | Binaire non dans le PATH           | Vérifiez `which <command>`                                      |
| Le tableau de bord affiche "not detected" après l'installation | Cache obsolète                     | Cliquez sur "⟳ Actualiser la détection" dans le tableau de bord |
| Ancien lien `/dashboard/cli-tools`                             | Favori avant v3.8.6                | Redirection automatique vers `/dashboard/cli-code` (308)        |
| Ancien lien `/dashboard/agents`                                | Favori avant v3.8.6                | Redirection automatique vers `/dashboard/acp-agents` (308)      |
