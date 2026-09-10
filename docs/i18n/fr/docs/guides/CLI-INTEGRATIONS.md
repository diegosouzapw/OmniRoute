# CLI-INTEGRATIONS (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "Intégrations CLI — dirigez n'importe quel CLI de codage vers OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# Intégrations CLI

OmniRoute propose une famille de commandes `setup-*` qui configurent un CLI de codage (Codex, Claude Code, OpenCode, Cline, …) pour utiliser OmniRoute comme son backend — ainsi l'outil communique avec **un** point de terminaison et OmniRoute redirige vers le bon fournisseur avec un retour automatique. Chaque commande lit le catalogue de modèles **en direct** d'un OmniRoute en cours d'exécution (local ou distant) et écrit le fichier de configuration de l'outil sur **votre** machine. La clé API est référencée par une variable d'environnement chaque fois que l'outil le supporte. Les commandes qui persistent un fichier d'environnement local à l'outil sont notées ci-dessous.

Il existe également un lanceur générique — `omniroute run <target>` — qui lance `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` ou `gemini` avec le bon environnement injecté, sans écrire de configuration du tout. Les cibles et leurs alias proviennent du manifeste canonique `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), et `omniroute completion` propose les mêmes mots cibles dérivés du manifeste. Les lanceurs par outil hérités — `omniroute launch` (Claude Code) et `omniroute launch-codex` (Codex) — restent disponibles.

L'intégration des fournisseurs est disponible depuis le même contexte local/distant. Les commandes orientées API ci-dessous maintiennent l'authentification de gestion séparée des informations d'identification du fournisseur et n'impriment jamais une information d'identification dans la sortie structurée :

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Pour les scripts, préférez `--credential-stdin` ou `--credential-env` ; `--credential` est conservé pour un usage local contrôlé. `providers remove` nécessite `--yes` sur un terminal non interactif, et les cinq commandes respectent le contexte actif ou les options globales `--base-url`/`--api-key`.

Pour la configuration de base écrite à la main une seule fois des deux intégrations les plus riches, consultez les plongées approfondies par outil :

- [Configuration de Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Configuration de Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Mode Distant](./REMOTE-MODE.md) — pilotez un OmniRoute distant (VPS / Tailnet) depuis votre ordinateur portable
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — l'extension OmniCopilot ; elle peut également exécuter ces commandes `setup-*` pour vous depuis l'éditeur

---

## Tableau maître

Chaque commande respecte le **contexte actif** (défini avec `omniroute connect`, voir [Mode Distant](./REMOTE-MODE.md)) ou les drapeaux explicites `--remote <url> --api-key <key>`. "Local vs distant" ci-dessous signifie : sans drapeaux, cela cible `http://localhost:20128` ; avec `--remote` (ou un contexte distant actif), cela récupère le catalogue depuis ce serveur et écrit la configuration localement.

| Commande                   | Outil                             | Ce qu'elle écrit                                                                                                                                                                   | Drapeaux clés                                                                                                                              | Local vs distant |
| -------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                  | `~/.codex/<name>.config.toml` — un profil par modèle de texte compatible (`codex --profile <name>`)                                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Les deux         |
| `omniroute setup-claude`   | Claude Code                       | `~/.claude/profiles/<name>/settings.json` — un profil par modèle correspondant (`CLAUDE_CONFIG_DIR`)                                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Les deux         |
| `omniroute setup-opencode` | OpenCode (compatible openai)      | `~/.config/opencode/opencode.json` — fournisseur `omniroute` avec chaque modèle du catalogue (`opencode -m omniroute/<model>`)                                                     | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Les deux         |
| `omniroute setup-cline`    | Cline                             | `~/.cline/data/{globalState,secrets}.json` (mode CLI) + imprime les paramètres de l'extension VS Code                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Les deux         |
| `omniroute setup-kilo`     | Kilo Code                         | `~/.local/share/kilo/auth.json` (CLI) + fusionne `kilocode.*` dans `settings.json` de VS Code si présent                                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Les deux         |
| `omniroute setup-continue` | Continue / `cn` CLI               | `~/.continue/config.yaml` — modèles `provider: openai`, clé via `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Les deux         |
| `omniroute setup-cursor`   | Cursor                            | Rien — imprime les étapes dans l'application (la configuration de Cursor est opaque SQLite)                                                                                        | `--remote` `--api-key` `--only` `--port`                                                                                                   | Les deux         |
| `omniroute setup-roo`      | Roo Code                          | `~/.omniroute/roo-settings.json` (doc d'importation) + définit `roo-cline.autoImportSettingsPath` si un `settings.json` de VS Code existe                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Les deux         |
| `omniroute setup-crush`    | Crush                             | `~/.config/crush/crush.json` — fournisseur `openai-compat`, clé via `$OMNIROUTE_API_KEY`                                                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Les deux         |
| `omniroute setup-goose`    | Goose                             | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + imprime la recette d'environnement                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Les deux         |
| `omniroute setup-aider`    | Aider                             | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + imprime la recette d'environnement                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Les deux         |
| `omniroute setup-qwen`     | Qwen Code                         | `~/.qwen/settings.json` — tableau `modelProviders.openai` V4 + `OMNIROUTE_API_KEY` dans `~/.qwen/.env`                                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Les deux         |
| `omniroute run <target>`   | Lancement d'exécution (générique) | Rien — lance `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` avec le bon environnement et les bons arguments ; Qwen et Gemini utilisent un répertoire temporaire isolé | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Les deux         |
| `omniroute launch`         | Claude Code                       | Rien — lance `claude` avec `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` injectés                                                                                                    | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Les deux         |
| `omniroute launch-codex`   | OpenAI Codex CLI                  | Rien — lance `codex` avec le fournisseur `omniroute` injecté via des drapeaux `-c`                                                                                                 | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Les deux         |

Notes sur les drapeaux (vérifiés dans la source de la commande) :

- `--remote <url>` — récupère le catalogue depuis un OmniRoute distant (remplace `--port` et le contexte actif). `--api-key <key>` fournit l'information d'identification pour ce serveur (par défaut à la variable d'environnement `OMNIROUTE_API_KEY`, ou le jeton du contexte actif).
- `--only <patterns>` — sous-chaînes séparées par des virgules ; conserve uniquement les ID de modèle qui correspondent (par exemple `--only glm,kimi`). Disponible sur `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — imprime exactement ce qui serait écrit sans toucher au système de fichiers. Disponible sur chaque commande `setup-*` **sauf** `setup-cursor` (qui n'écrit jamais de fichier).
- `--model <id>` — requis (ou choisi de manière interactive) pour les outils qui n'ont pas de découverte automatique de modèle : Cline, Kilo, Roo, Goose, Qwen, Aider. Ces outils acceptent également `--yes` pour des exécutions non interactives (ce qui nécessite alors `--model`). `setup-opencode` prend `--model` pour définir le modèle par défaut de niveau supérieur.
- `--model <id>` sur `omniroute run` suit le câblage par cible du manifeste (`bin/cli/cli-manifest.mjs`) : **aider** reçoit `--model openai/<id>` et **opencode** `--model omniroute/<id>` (le préfixe est ajouté uniquement lorsque l'id ne le porte pas déjà) ; **qwen** et **gemini** reçoivent l'id tel quel ; **claude** l'obtient via `ANTHROPIC_MODEL`, **goose** via `GOOSE_MODEL`, et **codex** via des arguments `-c model_providers.omniroute.*`. **Qwen est la seule cible d'exécution qui nécessite absolument `--model`** — `omniroute run qwen` sans cela sort `2` avec une erreur explicite.
- `--port <port>` — port local d'OmniRoute (par défaut `20128`, ignoré lorsque `--remote` est défini). Présent sur toutes les commandes `setup-*` et les deux lanceurs.
- Codes de sortie de `omniroute run` : le code de sortie du CLI enfant est propagé tel quel ; `2` = arguments invalides (cible non prise en charge, `--model` requis manquant, garde de conteneur) ; `127` = le binaire cible n'est pas dans `PATH` ; `130`/`143`/`129` lorsque le lancement est terminé par `SIGINT`/`SIGTERM`/`SIGHUP` ; `1` = autre échec de lancement d'exécution.
- Les deux lanceurs (`launch`, `launch-codex`) acceptent `--profile <name>` pour sélectionner un profil écrit par `setup-claude` / `setup-codex`, plus des arguments de passage pour le binaire sous-jacent `claude` / `codex`.

Le sélecteur interactif est également partagé par les recettes de configuration :

```bash
# Choisissez dans le catalogue de modèles local ou distant actif et configurez la cible.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` délègue actuellement aux recettes testées pour `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, et `kilo`. Les entrées de catalogue uniquement IDE, MITM, et guide restent des flux explicites `setup-*`/manuels et ne sont pas présentées comme des cibles lancables.

> `setup-opencode` est l'intégration OpenCode **légère compatible openai**.
> Il existe également une intégration de plugin plus riche — `omniroute setup opencode` — qui installe `@omniroute/opencode-plugin`. Ce sont des commandes différentes ; le tableau ci-dessus documente `setup-opencode`.

---

## Utilisation locale

Avec OmniRoute en cours d'exécution sur `localhost:20128`, il suffit d'exécuter la commande de configuration pour votre outil. Le catalogue est récupéré depuis le serveur local.

```bash
# Codex : écrire un profil par modèle correspondant dans ~/.codex/
omniroute setup-codex
codex --profile glm52            # utiliser un profil généré

# Claude Code : écrire des profils par modèle, puis en lancer un
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode : écrire le fournisseur compatible OpenAI avec tous les modèles du catalogue
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # référencé via {env:OMNIROUTE_API_KEY}, jamais sur disque
opencode -m omniroute/glm/glm-5.2 "..."

# Les outils sans auto-découverte nécessitent un modèle explicite :
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Prévisualisation sans rien écrire :
omniroute setup-continue --dry-run
```

Lancez sans écrire de configuration du tout (injection d'environnement uniquement) :

```bash
omniroute launch                 # Claude Code → OmniRoute local
omniroute launch-codex           # Codex CLI → OmniRoute local
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "réponse OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "réponse OK"
omniroute run qwen --model glm/glm-5.2 -- -p "réponse OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "réponse OK"

# Chemin de commande explicite : passez tout ce qui vient après --
omniroute run claude -- --print-system-prompt "révisez cette différence"
```

---

## Utilisation à distance

Pointez toute commande de configuration vers un OmniRoute distant avec `--remote` + `--api-key`. Le catalogue est récupéré depuis le distant ; la configuration est écrite sur votre machine locale.

```bash
# OpenCode contre un VPS distant, ne garder que les modèles glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # exportez d'abord OMNIROUTE_API_KEY

# Profils Codex depuis un catalogue distant
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Lancez un CLI directement contre le distant
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Au lieu de passer `--remote`/`--api-key` à chaque fois, connectez-vous une fois et laissez le **contexte actif** les fournir automatiquement :

```bash
omniroute connect 192.168.0.15        # génère un jeton de portée, stocke le contexte
omniroute setup-codex                 # ← utilise maintenant le catalogue distant
omniroute setup-opencode              # ← même chose
omniroute launch                      # ← Claude Code contre le distant
```

Voir [Mode à distance](./REMOTE-MODE.md) pour les contextes, les portées et la gestion des jetons.

---

## Conventions d'URL de base (que les outils veulent `/v1`)

OmniRoute expose la surface OpenAI à `/v1`, la surface Anthropic à la racine, et une surface Gemini native à `/v1beta`. Chaque intégration est câblée à la forme que son outil attend (vérifiée dans la source de la commande) :

| Intégration                                                                | URL de base écrite | `/v1` ?                                     |
| -------------------------------------------------------------------------- | ------------------ | ------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | racine             | Non — Cline ajoute `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | racine             | Non — Goose ajoute le chemin                |
| `setup-aider` (`OPENAI_API_BASE`)                                          | racine             | Non — LiteLLM ajoute `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | avec `/v1`         | Oui                                         |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | racine             | Non — Claude Code ajoute `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | avec `/v1`         | Oui                                         |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | avec `/v1`         | Oui                                         |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | racine             | Non — le SDK ajoute `/v1beta/models/…`      |

---

## Maintenir les dépendances natives à jour : `--include=optional`

Lorsque vous mettez à jour avec `omniroute update` (après confirmation, ou avec `--apply`), OmniRoute exécute l'installation avec `--include=optional` intégré :

```bash
npm install -g omniroute@latest --include=optional
```

Ce n'est **pas** un drapeau que vous passez à `omniroute update` — il est toujours appliqué par le
programme de mise à jour. Cela garantit que les `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, la pile LLMLingua SLM) survivent à la mise à jour même si votre configuration npm
a `omit=optional` défini, ce qui autrement supprimerait silencieusement le pilote SQLite
natif et le lien avec le trousseau de clés du système. Pour prévisualiser la commande exacte sans appliquer :

```bash
omniroute update --dry-run
# [DRY RUN] Would run: npm install -g omniroute@latest --include=optional
```

Autres drapeaux `omniroute update` (vérifiés dans la source) : `--check` (sortie 1 si
obsolète), `--apply` (installer sans demander), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI via `omniroute run gemini`

Contrat vérifié contre `@google/gemini-cli` 0.50.0 : le CLI respecte
`GOOGLE_GEMINI_BASE_URL` et émet `POST /v1beta/models/<model>:generateContent`
(et `:streamGenerateContent?alt=sse`) contre celui-ci — exactement la surface
native Gemini d'OmniRoute (`/v1beta`). `omniroute run gemini` le connecte automatiquement :

- `GOOGLE_GEMINI_BASE_URL` → l'URL de base active d'OmniRoute (racine, pas de `/v1`) ;
- `GEMINI_API_KEY` → les informations d'identification résolues d'OmniRoute (option/env/contexte) ;
- un **`GEMINI_CLI_HOME` isolé temporaire** dont le `.gemini/settings.json`
  sélectionne l'authentification `gemini-api-key`, de sorte qu'une session OAuth Google stockée (Code Assist)
  ne remplace jamais le lancement dirigé par OmniRoute — supprimé après la sortie ;
- **hygiène de l'environnement** : l'environnement enfant est nettoyé de `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` et `GOOGLE_GENAI_USE_GCA` (qui redirigerait
  l'authentification vers Vertex/Code Assist), et `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` est
  défini comme une sauvegarde — les autres cibles `run` reçoivent le même
  traitement pour leurs propres variables conflictuelles ;
- injection de `--model <id>` à partir de `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

La protection de confiance de l'espace de travail de Gemini s'applique toujours en mode sans tête — passez
`--skip-trust` (ou faites confiance au répertoire de manière interactive) vous-même ; le lanceur
ne le contourne délibérément pas. Ce lanceur est distinct de l'**enregistrement ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), qui reste l'intégration du protocole d'agent pour `/dashboard/acp-agents`.

---

## Réel balayage de fumée (opt-in)

Des exécutions de régression de plan de lancement déterministe dans CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Pour valider les binaires RÉELS contre un serveur OmniRoute RÉEL,
un cadre d'opt-in existe à
`tests/integration/upstream-cli-smoke.int.test.ts`. Il ne s'exécute jamais automatiquement
(tous les sous-tests sont ignorés sauf si `RUN_CLI_SMOKE=1`), passe les informations d'identification par la variable d'environnement
NAME (jamais par valeur), masque les chaînes en forme de clé de toute sortie enregistrée, ignore
les cibles dont le binaire n'est pas installé, et classe les échecs comme
auth / upstream / config au lieu d'un simple booléen :

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Optionnel : `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` restreint le balayage ;
`OMNIROUTE_SMOKE_TIMEOUT_MS` remplace le délai d'attente de 120s par cible.

---

## Voir aussi

- [Configuration de Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — le guide approfondi de Claude Code
- [Configuration de Codex CLI](./CODEX-CLI-CONFIGURATION.md) — la configuration de base `[model_providers.omniroute]` à effectuer une seule fois
- [Mode distant](./REMOTE-MODE.md) — contextes, jetons d'accès limités, contrôle d'un serveur distant
- [Référence des outils CLI](../reference/CLI-TOOLS.md) — le catalogue complet des outils pris en charge + pages de tableau de bord
- [Guide d'installation](./SETUP_GUIDE.md) — méthodes d'installation et intégration lors du premier lancement
