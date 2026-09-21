# Skills Framework (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Source de vérité :** `src/lib/skills/` et `src/app/api/skills/`
> **Dernière mise à jour :** 2026-06-28 — v3.8.40

OmniRoute expose un framework extensible de compétences qui permet aux modèles de langage (et aux opérateurs) de composer des fonctionnalités réutilisables — de la lecture du système de fichiers et des requêtes HTTP à l’exécution de code dans un bac à sable et aux compétences sélectionnées de la marketplace.

Une compétence est une unité de travail versionnée et définie par un schéma. OmniRoute peut injecter des compétences sous forme de définitions d’outils dans les requêtes sortantes, intercepter les appels d’outils renvoyés par le modèle, exécuter le gestionnaire correspondant et transmettre le résultat au modèle afin que la conversation puisse se poursuivre. Le modèle ne voit jamais l’implémentation — uniquement l’interface de l’outil.

---

## Agent Skills et Omni Skills

OmniRoute dispose de deux systèmes de compétences distincts, mais complémentaires :

| Dimension        | **Omni Skills** (ce document)                                                        | **Agent Skills**                                                                             |
| :--------------- | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| Objectif         | Injection d’outils LLM + exécution dans un bac à sable                               | Catalogue SKILL.md permettant aux agents externes de découvrir et d’utiliser les compétences |
| Source de vérité | `src/lib/skills/` + marketplace                                                      | `src/lib/agentSkills/` + répertoire `skills/`                                                |
| Mode d’exécution | Injectées dans les requêtes sortantes, exécutées lors des événements d’appel d’outil | Catalogue Markdown statique + points de terminaison de découverte REST/MCP/A2A               |
| Utilisateurs     | OmniRoute lui-même (routage combiné, appels LLM entrants)                            | Agents externes, clients MCP, orchestrateurs A2A                                             |
| Nombre           | Variable (déterminé par la marketplace)                                              | 45 entrées de catalogue (23 API + 21 CLI + 1 configuration)                                  |
| Format           | `SkillDefinition` avec schéma d’outil + gestionnaire                                 | Frontmatter `SKILL.md` + corps Markdown                                                      |
| Découverte       | REST `/api/skills/*` + outils MCP `omniroute_skills_*`                               | REST `/api/agent-skills/*` + outils MCP `omniroute_agent_skills_*` + `list-capabilities` A2A |

Les **Omni Skills** constituent le moteur d’exécution — elles définissent ce qu’OmniRoute _peut faire_ lorsqu’un LLM invoque un outil.

Les **Agent Skills** constituent le catalogue de documentation — elles expliquent aux agents externes _comment utiliser_ l’API REST et la CLI d’OmniRoute, au moyen de fichiers SKILL.md structurés pouvant être directement intégrés aux prompts des agents.

Pour en savoir plus sur le catalogue Agent Skills, le générateur, les outils MCP et la compétence A2A, consultez [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Concepts

### Sources des compétences

Trois sources de compétences coexistent dans le même registre :

1. **Compétences intégrées** (`src/lib/skills/builtins.ts`) — fournies avec OmniRoute. Elles couvrent les cas courants :
   - `file_read`, `file_write` — espace de travail en bac à sable propre à chaque clé API sous `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — requêtes HTTP sortantes via `safeOutboundFetch` avec `guard: "public-only"`
   - `web_search` — fournisseur de recherche interchangeable avec mise en cache (`executeWebSearch`)
   - `eval_code` — exécution de `node` ou `python` dans un bac à sable Docker
   - `execute_command` — commande shell exécutée dans un bac à sable Docker
   - `browser` — infrastructure reposant sur Playwright, désactivée par défaut (`builtin/browser.ts`)
2. **SkillsMP** (la marketplace OmniRoute) — récupérées depuis `https://skillsmp.com/api/v1/skills/search`. Nécessite `skillsmpApiKey` dans les paramètres.
3. **SkillsSH** (catalogue communautaire `skills.sh`) — récupérées depuis `https://skills.sh/api/search`. Aucune authentification requise ; le contenu SKILL.md est récupéré depuis les fichiers bruts de GitHub.

Un unique « fournisseur actif » détermine le catalogue depuis lequel le tableau de bord effectue les installations (`src/lib/skills/providerSettings.ts`). Changez-le sous **Paramètres → Mémoire et compétences**. Valeur par défaut : `skillsmp`.

### Identité des compétences

Les compétences sont indexées par `name@version` dans le registre en mémoire (`src/lib/skills/registry.ts`). La version doit respecter semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` prend en charge les contraintes `^`, `~`, `>`, `>=`, `<`, `<=`, `==` et les correspondances exactes.

### Mode des compétences

Chaque compétence possède un mode d’exécution qui détermine quand elle est injectée :

| Mode   | Comportement                                                                                                  |
| ------ | ------------------------------------------------------------------------------------------------------------- |
| `on`   | Toujours injectée sous forme de définition d’outil                                                            |
| `off`  | Jamais injectée, jamais exécutable                                                                            |
| `auto` | Évaluée par rapport à la requête entrante ; injectée uniquement si le score ≥ `AUTO_MIN_SCORE` (3 par défaut) |

`auto` est le mode par défaut des compétences installées depuis la marketplace. La combinaison `enabled=true` et `mode="off"` signifie « enregistrée mais inactive » — basculer `enabled` via l’ancienne colonne met également à jour `mode` afin que les anciens chemins de code restent cohérents (`src/app/api/skills/[id]/route.ts`).

### Statut (exécutions)

Les exécutions de compétences sont suivies dans la table `skill_executions` avec les statuts suivants (`src/lib/skills/types.ts`) :

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Cache du registre

`SkillRegistry` est un singleton doté d’un cache avec une durée de vie de 60 secondes (`registry.ts:14`). `loadFromDatabase()` est idempotente et déduplique les appels simultanés via `pendingLoad`. Toute écriture (`register`/`unregister`/`unregisterById`) invalide le cache. Recherchez les versions au moyen de `getSkillVersions(name)` et `resolveVersion(name, constraint)`.

### Injection adaptée au fournisseur

`injectSkills()` dans `src/lib/skills/injection.ts` est le point d’entrée qui transforme les compétences enregistrées en définitions d’outils propres à chaque fournisseur :

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Le nom de l'outil est encodé sous la forme `name@version` afin que le gestionnaire puisse sélectionner la bonne version lorsque le modèle le rappelle.

### Évaluation AUTO

Lorsque `mode="auto"`, chaque compétence candidate est évaluée par rapport au contexte de la requête (`scoreAutoSkill()` dans `injection.ts`) :

| Signal                                                                                  | Points       |
| --------------------------------------------------------------------------------------- | ------------ |
| Le nom de la compétence apparaît tel quel dans le contexte                              | +6           |
| Chaque jeton du nom correspond à un jeton du contexte                                   | +2           |
| Chaque sous-chaîne d'une étiquette correspond au contexte                               | +3           |
| Chaque jeton de la description correspond au contexte                                   | +1           |
| Le motif d'arrière-plan correspond à un jeton du nom                                    | +2 par jeton |
| Le motif d'arrière-plan correspond à une étiquette                                      | +2 par jeton |
| L'indication du fournisseur dans les étiquettes correspond au fournisseur de la requête | +2 / −2      |

Les `AUTO_MAX_SKILLS = 5` meilleures compétences ayant un `score >= AUTO_MIN_SCORE = 3` sont injectées. Les égalités sont départagées par `installCount` (ordre décroissant), puis par nom alphabétique (`injection.ts:225-235`).

### Interception des appels d'outils

`handleToolCallExecution()` dans `src/lib/skills/interception.ts` est invoquée par le gestionnaire de discussion après que le fournisseur en amont a renvoyé une réponse contenant un appel d'outil :

1. `extractToolCalls()` lit les structures propres à chaque fournisseur (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Les alias d'outils intégrés (par exemple, `omniroute_web_search` → `web_search`) sont d'abord résolus. Les gestionnaires intégrés s'exécutent directement.
3. Tout le reste est acheminé via `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Les résultats sont réinsérés dans la réponse — éléments `tool_results`, éléments `function_call_output` ou blocs Anthropic `tool_result`, selon le cas.

`customSkillExecutionEnabled` dans le contexte d'exécution peut être défini sur `false` afin de n'autoriser que l'interception intégrée (utilisé par les chemins de requête qui désactivent explicitement les gestionnaires définis par l'utilisateur).

---

## Bac à sable Docker

Les chemins de code non intégrés (`eval_code`, `execute_command`) s’exécutent dans Docker via `SandboxRunner` (`src/lib/skills/sandbox.ts`). Chaque conteneur est lancé avec :

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (lorsque readOnly=true)
```

Valeurs par défaut (`SandboxRunner.DEFAULT_CONFIG`) :

| Champ            | Valeur par défaut | Remarques                                                          |
| ---------------- | ----------------- | ------------------------------------------------------------------ |
| `cpuLimit`       | 100 (= 0,1 CPU)   | Divisé par 1000 avant d’être transmis à `--cpus`                   |
| `memoryLimit`    | 256 MB            | Limite stricte                                                     |
| `timeout`        | 30000 ms          | Arrêt progressif via `SIGTERM` + `docker kill`                     |
| `networkEnabled` | `false`           | Devient `--network none`                                           |
| `readOnly`       | `true`            | FS racine en lecture seule ; `/tmp` et `/workspace` sont des tmpfs |

`SandboxRunner.kill(id)` et `killAll()` sont exposées pour l’arrêt ; les conteneurs en cours d’exécution sont suivis dans `runningContainers: Map<string, ChildProcess>`.

### Variables d’environnement du bac à sable

Configurées via `process.env` dans `src/lib/skills/builtins.ts` :

| Variable d’environnement          | Valeur par défaut | Objectif                                                                                                  |
| --------------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB)  | Limite pour `file_read` et `file_write`                                                                   |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`          | Limite pour le corps de la réponse de `http_request`                                                      |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`          | Limite pour stdout/stderr renvoyés à l’appelant                                                           |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`           | Délai d’expiration par défaut des commandes isolées ; plafonné à 60 s                                     |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`           | Contrôle principal des sorties réseau. Définissez sur `1` ou `true` pour autoriser l’activation par appel |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (voir ci-dessous) | Liste d’images Docker autorisées, séparées par des virgules                                               |

Images autorisées par défaut : `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Tout ajout via `SKILLS_ALLOWED_SANDBOX_IMAGES` est fusionné avec les valeurs par défaut ; les images inconnues sont rejetées par `normalizeImage()`.

> Remarque : il n’existe aucune variable d’environnement `SKILLS_EXECUTION_TIMEOUT_MS` distincte. Le délai d’expiration du gestionnaire hors bac à sable est codé en dur à 30 s dans `SkillExecutor` (`executor.ts:13`), mais peut être remplacé à l’exécution via `skillExecutor.setTimeout(ms)`.

### Isolation de l’espace de travail

`file_read` et `file_write` résolvent chaque chemin relativement à un espace de travail propre à chaque clé d’API situé dans `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. La traversée de chemins (`..`) et les segments interdits (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) sont rejetés avant toute E/S disque.

### Renforcement de la sécurité HTTP

`http_request` (`builtins.ts:257`) :

- Liste des méthodes autorisées : `GET, HEAD, POST, PUT, PATCH, DELETE`
- En-têtes sortants bloqués : `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Redirections désactivées (`allowRedirect: false`)
- Acheminement via `safeOutboundFetch` avec `guard: "public-only"` (plages privées et de bouclage bloquées)
- Réponse tronquée à `SKILLS_MAX_HTTP_RESPONSE_BYTES` ; le client reçoit `truncated: true`

---

## Exécuteur hybride (aperçu)

`src/lib/skills/hybrid.ts` définit un `HybridExecutor` qui choisit entre une exécution `direct` (dans le processus) et `sandbox` pour chaque appel, avec un mécanisme de nouvelle tentative `autoUpgrade` en cas d’expiration du délai ou d’erreur de mémoire. Les implémentations intégrées `directExecutor` / `sandboxRunner` sont des stubs (`executeDirect`, `executeInSandbox` renvoient des objets temporaires) — considérez ce module comme un contrat en cours de construction. L’exécution réelle passe toujours par `skillExecutor` + `SandboxRunner`.

---

## Stockage

Le schéma est défini dans deux migrations :

- `src/lib/db/migrations/016_create_skills.sql` — tables de base `skills` et `skill_executions`, avec des index sur `(api_key_id, name)` et `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — ajoute `mode`, `source_provider`, `tags` (JSON), `install_count` à `skills`.

`skill_executions.status` est soumis à une contrainte au niveau de la base de données : `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## API REST

Tous les endpoints se trouvent sous `src/app/api/skills/`. Les endpoints de gestion (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) nécessitent une **authentification de gestion** via `requireManagementAuth()`. Les flux de marketplace et d’installation utilisent la fonction plus légère `isAuthenticated()` (session ou clé API).

| Endpoint | Méthode | Objectif |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Répertorier les skills enregistrés. Prend en charge `?q=`, `?mode=on                        | off | auto`, `?source=skillsmp | skillssh | local`, pagination |
| `/api/skills/[id]` | PUT | Mettre à jour `enabled` ou `mode` |
| `/api/skills/[id]` | DELETE | Désinscrire par identifiant |
| `/api/skills/install` | POST | Installer un skill personnalisé (code du gestionnaire + schéma) |
| `/api/skills/marketplace` | GET | Rechercher dans le catalogue SkillsMP (renvoie les choix populaires par défaut lorsque `q` est vide) |
| `/api/skills/marketplace/install` | POST | Installer un skill SkillsMP (nécessite que le fournisseur actif soit `skillsmp`) |
| `/api/skills/skillssh` | GET | Rechercher dans le catalogue skills.sh (`?q=&limit=`, limité à 100) |
| `/api/skills/skillssh/install` | POST | Installer un skill skills.sh (nécessite que le fournisseur actif soit `skillssh`) |
| `/api/skills/executions` | GET | Historique d’exécution paginé (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Exécuter ponctuellement un skill enregistré |

L’endpoint `POST /api/skills/executions` renvoie une réponse HTTP `503` avec `{ error: "Skills execution is disabled..." }` lorsque `settings.skillsEnabled === false` (`executor.ts:42-45`). Les opérateurs peuvent modifier le commutateur principal depuis **Paramètres → IA**.

### Exemple : installer un skill personnalisé

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Reverses a string",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

La chaîne `handlerCode` est une **recherche par nom de gestionnaire** — et non du code exécutable. L’exécuteur l’associe via `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Les installations depuis le marketplace stockent le texte SKILL.md dans ce champ à titre de documentation et acheminent l’exécution par l’intermédiaire d’appels d’outils générés par le modèle. Le code source arbitraire fourni par l’utilisateur n’est pas évalué avec `eval`.

---

## Outils MCP

Quatre outils MCP encapsulent l'interface des compétences (`open-sse/mcp-server/tools/skillTools.ts`). Ils sont enregistrés automatiquement au démarrage du serveur MCP.

| Outil                         | Description                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------ |
| `omniroute_skills_list`       | Répertorie les compétences, avec filtres facultatifs : `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Active/désactive une compétence via `skillId`                                        |
| `omniroute_skills_execute`    | Exécute une compétence avec une charge utile d'entrée                                |
| `omniroute_skills_executions` | Historique récent des exécutions (50 par défaut, 100 au maximum)                     |

Consultez [MCP-SERVER.md](./MCP-SERVER.md) pour la configuration du transport et l'attribution des portées.

---

## Intégration A2A

`src/lib/skills/a2a.ts` exporte le descripteur de compétence A2A `memory_aware_routing` et une fonction utilitaire `registerA2ASkill(registry)`. Les compétences A2A personnalisées se trouvent dans `src/lib/a2a/skills/` et sont distribuées via `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Consultez [A2A-SERVER.md](./A2A-SERVER.md) pour connaître le cycle de vie complet des tâches.

---

## Ajout d'une nouvelle compétence intégrée

1. **Définissez le gestionnaire** dans `src/lib/skills/builtins.ts` (ou dans un fichier voisin sous `src/lib/skills/builtin/`). Signature : `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Chemin d'exécution en bac à sable ?** Appelez `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Utilisez `normalizeImage()` avec la liste d'autorisation.
3. **Chemin du système de fichiers ?** Faites-le toujours passer par `resolveWorkspacePath(input, context)` avant d'accéder au disque.
4. **Appel réseau ?** Utilisez `safeOutboundFetch` avec `guard: "public-only"` ; assainissez les en-têtes via `sanitizeHeaders()`.
5. **Enregistrez-la** en ajoutant l'entrée à `builtinSkills` (ou en appelant une fonction de type `registerBrowserSkill(executor)` au démarrage).
6. **Configurez les alias des outils intégrés** (facultatif) dans `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) si le modèle en amont émet un nom différent.
7. **Tests** dans `src/lib/skills/__tests__/` (Vitest).

---

## Ajout d'une compétence personnalisée (non intégrée)

1. Enregistrez le gestionnaire au démarrage du processus :
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Insérez la compétence via `POST /api/skills/install` (le champ `handlerCode` doit correspondre au nom du gestionnaire enregistré).
3. Basculez `mode` sur `on` ou `auto` via `PUT /api/skills/[id]`.

---

## Conseils opérationnels

- **Interrupteur principal :** `settings.skillsEnabled = false` bloque toute exécution et renvoie une réponse HTTP `503` sur `/api/skills/executions`. Le registre continue à se charger.
- **Verrouillage des sorties réseau :** laissez `SKILLS_SANDBOX_NETWORK_ENABLED` non défini (valeur par défaut) pour une exécution en bac à sable totalement isolée du réseau. La valeur `networkEnabled: true` par appel nécessite toujours l'activation de l'interrupteur principal.
- **Autorisation d'images spécifiques :** définissez `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` pour étendre la liste d'autorisation.
- **Audit des exécutions :** `/dashboard/skills/executions` et `omniroute_skills_executions` interrogent tous deux `skill_executions`. Les exécutions réussies incluent `durationMs` ; les échecs incluent `errorMessage`.
- **Invalidation du cache :** appelez `skillRegistry.invalidateCache()` après des modifications manuelles de la base de données ; sinon, attendez 60 s.
- **Espace de travail anonyme :** lorsque `apiKeyId` est vide, tous les appels sont hachés vers le même espace de travail `"anonymous"` — le code tenant compte du partage doit toujours transmettre une clé réelle.

---

## Cycle de vie de l’exécution (v3.8.16+)

Le `SkillExecutor` (`src/lib/skills/executor.ts`) est un **singleton** qui gère chaque invocation de compétence. Comprendre son cycle de vie est essentiel pour déboguer les délais d’expiration, les nouvelles tentatives et l’état d’exécution.

### Le cycle de vie en 5 étapes

```
   execute() appelé
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← en file d’attente, pas encore démarré (ligne créée en BDD)
  └──────┬──────┘
         │ démarrage du gestionnaire
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← gestionnaire invoqué avec un délai d’expiration
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (aucun autre chemin — arrêté par le parent)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Ligne de BDD mise à jour avec le statut, la sortie et durationMs
```

### Configuration par défaut

| Paramètre    | Valeur par défaut | Configurable via                     |
| ------------ | ----------------- | ------------------------------------ |
| `timeout`    | `30000` (30 s)    | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`               | `skillExecutor.setMaxRetries(count)` |

> **Important** : l’exécuteur est un singleton — appeler `setTimeout()` affecte globalement toutes les invocations suivantes. Les délais d’expiration propres à chaque compétence ne sont actuellement pas pris en charge ; si vous avez besoin de délais différents selon la compétence, lancez des processus séparés ou créez un fork de l’exécuteur.

### Valeurs de statut

Depuis `src/lib/skills/types.ts` :

```ts
enum SkillStatus {
  PENDING = "pending", // En file d’attente, pas encore démarré
  RUNNING = "running", // Gestionnaire invoqué
  SUCCESS = "success", // Le gestionnaire a renvoyé une sortie valide
  ERROR = "error", // Le gestionnaire a levé une exception
  TIMEOUT = "timeout", // Dépassement du délai d’expiration de l’exécuteur
}
```

> **Remarque** : le statut `TIMEOUT` est défini dans l’énumération, mais n’est **pas réellement écrit dans la BDD** par l’implémentation actuelle de l’exécuteur — les délais d’expiration apparaissent comme `ERROR` avec le message `"Skill execution timed out"`. Le statut de l’énumération est réservé à un usage futur.

### Inspection des exécutions

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Obtenir une exécution spécifique par son ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Répertorier les exécutions récentes pour une clé d’API
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Compter le nombre total d’exécutions
const total = skillExecutor.countExecutions("api-key-id");
```

### Comportement des nouvelles tentatives

Le paramètre `maxRetries` est stocké, mais n’est **pas actuellement utilisé** par la méthode `execute()` de l’exécuteur — celle-ci n’effectue qu’une seule tentative. La valeur `maxRetries` est exposée en vue d’une implémentation future et pour les hooks qui souhaitent la lire.

Pour le moment, les nouvelles tentatives doivent être implémentées dans le gestionnaire de la compétence lui-même. Les compétences
intégrées sont enregistrées auprès de l’exécuteur (par exemple, `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` dans `src/lib/skills/builtin/`) ; tout gestionnaire
que vous enregistrez peut encapsuler sa propre boucle de nouvelles tentatives :

```ts
// dans un gestionnaire de compétence
async function handler(input, ctx) {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchSomething(input);
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
  }
  throw lastError;
}
```

---

## SkillMode en détail

L’énumération `SkillMode` (`src/lib/skills/types.ts`) détermine **quand et comment** les compétences sont invoquées :

```ts
enum SkillMode {
  AUTO = "auto", // Le LLM décide quand appeler la compétence
  MANUAL = "manual", // Invoquée uniquement à la demande explicite de l’utilisateur
  HYBRID = "hybrid", // Évaluation AUTO + remplacement manuel
}
```

> **Remarque** : Le code source définit `SkillMode` (AUTO/MANUAL/HYBRID), tandis que le champ `Skill.mode` utilise une structure différente (`"on" | "off" | "auto"`). Ils sont liés, mais ne sont pas identiques — `SkillMode` concerne la politique de l’exécuteur, tandis que `Skill.mode` concerne l’activation de chaque compétence.

### Quand utiliser chaque mode

| Mode     | Comportement du LLM                                                                                 | Cas d’utilisation                                                      |
| -------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `AUTO`   | Le LLM peut appeler la compétence lorsqu’il le juge nécessaire                                      | Compétences à usage général (lecture de fichiers, requêtes HTTP)       |
| `MANUAL` | Le LLM ne peut pas appeler la compétence ; seul un appel explicite à l’API `executeSkill` l’invoque | Opérations sensibles (écritures en base de données, paiements)         |
| `HYBRID` | Le LLM peut suggérer la compétence ; l’utilisateur doit confirmer                                   | Compétences ayant des effets de bord, mais qui ne sont pas dangereuses |

### Évaluation AUTO

Lorsque le mode `AUTO` est actif, chaque compétence candidate est évaluée par rapport au contexte de la requête
par `scoreAutoSkill()` dans `src/lib/skills/injection.ts` — un système additif
de points entiers (correspondance du nom de la compétence, chevauchement des jetons du nom/des étiquettes/de la description,
indices liés aux raisons d’arrière-plan, bonus/pénalité liés aux indications du fournisseur). Les
`AUTO_MAX_SKILLS = 5` meilleures compétences ayant un `score >= AUTO_MIN_SCORE = 3` sont injectées comme
outils appelables, les égalités étant départagées par `installCount`, puis par nom. Consultez le tableau complet des points
dans [**Génération du schéma des outils → Évaluation AUTO**](#auto-scoring), plus haut dans ce
document ; il n’existe aucun seuil décimal de type `0.6` ni aucune évaluation dans `registry.ts`.

---

## Catalogue des compétences intégrées

OmniRoute est fourni avec un ensemble sélectionné de compétences intégrées dans `src/lib/skills/builtin/`. Les plus courantes sont les suivantes :

### Compétence d’automatisation du navigateur

La compétence de navigateur (`src/lib/skills/builtin/browser.ts`) fournit une automatisation de navigateur sans interface graphique via Playwright/Puppeteer. **Elle est implémentée, mais ne figure pas dans le catalogue de compétences par défaut** — pour l’utiliser, installez séparément le plugin d’extension de navigateur.

```ts
// À activer dans votre configuration
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Toujours exiger une invocation explicite
  allowedSkills: ["browser"],
  timeout: 60000, // 60 s pour le chargement des pages
  maxRetries: 1,
};
```

### Autres catégories intégrées

| Catégorie         | Compétences                                      | Mode   |
| ----------------- | ------------------------------------------------ | ------ |
| E/S de fichiers   | `file_read`, `file_write`                        | AUTO   |
| HTTP              | `http_request`                                   | AUTO   |
| Recherche         | `web_search`                                     | AUTO   |
| Exécution de code | `eval_code` (JavaScript/Python en bac à sable)   | HYBRID |
| Système           | `execute_command` (exécution CLI en bac à sable) | MANUAL |

### Ajout d’une compétence personnalisée

Consultez [SDK de plugin et intégration des compétences](./PLUGIN_SDK.md) pour savoir comment ajouter une compétence personnalisée via le système de plugins.

---

## Voir aussi

- [MCP-SERVER.md](./MCP-SERVER.md) — enregistrement des outils MCP et transports
- [A2A-SERVER.md](./A2A-SERVER.md) — cycle de vie des tâches A2A et répartition des compétences
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — introduction destinée aux utilisateurs
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — pipeline de requêtes et cartographie des composants
- Source : `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Tests : `src/lib/skills/__tests__/integration.test.ts`
