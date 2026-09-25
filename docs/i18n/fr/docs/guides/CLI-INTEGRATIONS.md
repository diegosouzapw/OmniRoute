# CLI Integrations (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute propose une famille de commandes `setup-*` qui configurent une interface de ligne de commande (CLI) de codage (Codex, Claude Code, OpenCode, Cline, …) pour utiliser OmniRoute comme backend — ainsi, l'outil communique avec **un seul** point d'accès et OmniRoute achemine vers le bon fournisseur avec un repli automatique. Chaque commande lit le catalogue de modèles **en direct** depuis une instance OmniRoute en cours d'exécution (locale ou distante) et écrit le fichier de configuration propre à l'outil sur **votre** machine. La clé API est référencée par une variable d'environnement partout où l'outil le supporte. Les commandes qui persistent un fichier d'environnement local à l'outil sont notées ci-dessous.

Il existe également un lanceur générique — `omniroute run <target>` — qui lance `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` ou `gemini` avec l'environnement approprié injecté, sans écrire aucune configuration. Les cibles et leurs alias proviennent du manifeste canonique `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), et `omniroute completion` offre les mêmes mots cibles dérivés du manifeste. Les lanceurs hérités par outil — `omniroute launch` (Claude Code) et `omniroute launch-codex` (Codex) — restent disponibles.

L'intégration des fournisseurs est disponible depuis le même contexte local/distant. Les commandes API-first ci-dessous séparent l'authentification de gestion des identifiants de fournisseur et n'affichent jamais un identifiant dans une sortie structurée :

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Pour les scripts, préférez `--credential-stdin` ou `--credential-env` ; `--credential` est conservé pour une utilisation locale contrôlée. `providers remove` nécessite `--yes` sur un terminal non interactif, et les cinq commandes respectent le contexte actif ou les options globales `--base-url`/`--api-key`.

Les sélecteurs de fournisseur rejettent les préfixes d'ID, les noms ou les noms de fournisseur ambigus ; utilisez un ID de connexion complet lorsque plusieurs connexions correspondent. Les commandes de création et d'édition relisent la connexion enregistrée, et la suppression vérifie qu'elle n'est plus lisible. Une importation ignore une paire fournisseur/nom existante. Les entrées importées ne peuvent pas remplacer le point d'accès de gestion, le contexte ou les identifiants de gestion fournis à la CLI.

Pour la configuration de base unique et manuelle des deux intégrations les plus riches, consultez les approfondissements par outil :

- [Configuration de Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Configuration de Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Mode distant](./REMOTE-MODE.md) — pilotez un OmniRoute distant (VPS / Tailnet) depuis votre ordinateur portable
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — l'extension OmniCopilot ; elle peut également exécuter ces commandes `setup-*` pour vous depuis l'éditeur

---

## Tableau récapitulatif

Chaque commande respecte le **contexte actif** (défini avec `omniroute connect`, voir
[Mode distant](./REMOTE-MODE.md)) ou les options explicites `--remote <url> --api-key <key>`.
« Local ou distant » signifie ci-dessous que, sans option, la commande cible `http://localhost:20128` ;
avec `--remote` (ou un contexte distant actif), elle récupère le catalogue depuis ce
serveur et écrit la configuration localement.

| Commande                   | Outil                             | Ce qui est écrit                                                                                                                                                                              | Options principales                                                                                                                        | Local ou distant |
| -------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                  | `~/.codex/<name>.config.toml` — un profil par modèle de texte compatible (`codex --profile <name>`)                                                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Les deux         |
| `omniroute setup-claude`   | Claude Code                       | `~/.claude/profiles/<name>/settings.json` — un profil par modèle correspondant (`CLAUDE_CONFIG_DIR`)                                                                                          | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Les deux         |
| `omniroute setup-opencode` | OpenCode (compatible OpenAI)      | `~/.config/opencode/opencode.json` — fournisseur `omniroute` avec tous les modèles du catalogue (`opencode -m omniroute/<model>`)                                                             | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Les deux         |
| `omniroute setup-cline`    | Cline                             | `~/.cline/data/{globalState,secrets}.json` (mode CLI) + affiche les paramètres de l’extension VS Code                                                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Les deux         |
| `omniroute setup-kilo`     | Kilo Code                         | `~/.local/share/kilo/auth.json` (CLI) + fusionne `kilocode.*` dans le fichier `settings.json` de VS Code s’il existe                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Les deux         |
| `omniroute setup-continue` | Continue / CLI `cn`               | `~/.continue/config.yaml` — modèles avec `provider: openai`, clé via `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Les deux         |
| `omniroute setup-cursor`   | Cursor                            | Rien — affiche les étapes à suivre dans l’application (la configuration de Cursor est une base SQLite opaque)                                                                                 | `--remote` `--api-key` `--only` `--port`                                                                                                   | Les deux         |
| `omniroute setup-roo`      | Roo Code                          | `~/.omniroute/roo-settings.json` (document d’importation) + définit `roo-cline.autoImportSettingsPath` si un fichier `settings.json` de VS Code existe                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Les deux         |
| `omniroute setup-crush`    | Crush                             | `~/.config/crush/crush.json` — fournisseur `openai-compat`, clé via `$OMNIROUTE_API_KEY`                                                                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Les deux         |
| `omniroute setup-goose`    | Goose                             | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + affiche les instructions pour les variables d’environnement                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Les deux         |
| `omniroute setup-aider`    | Aider                             | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + affiche les instructions pour les variables d’environnement                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Les deux         |
| `omniroute setup-qwen`     | Qwen Code                         | `~/.qwen/settings.json` — tableau V4 `modelProviders.openai` + `OMNIROUTE_API_KEY` dans `~/.qwen/.env`                                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Les deux         |
| `omniroute setup-5dive`    | 5dive (flotte d’agents)           | Rien sous `$HOME` — écrit un **profil d’authentification** 5dive (`/var/lib/5dive/auth-profiles/<name>/`) via `5dive agent auth set` ; réservé à root, s’exécute sur l’hôte de la flotte      | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Les deux         |
| `omniroute run <target>`   | Lancement d’exécution (générique) | Rien — lance `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` avec l’environnement et les arguments appropriés ; Qwen et Gemini utilisent un répertoire personnel temporaire isolé | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Les deux         |
| `omniroute launch`         | Claude Code                       | Rien — lance `claude` en injectant `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                                                | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Les deux         |
| `omniroute launch-codex`   | OpenAI Codex CLI                  | Rien — lance `codex` en injectant le fournisseur `omniroute` via les options `-c`                                                                                                             | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Les deux         |

Notes sur les options (vérifiées dans le code source des commandes) :

- `--remote <url>` — récupère le catalogue depuis une instance OmniRoute distante (remplace `--port`
  et le contexte actif). `--api-key <key>` fournit les identifiants pour ce
  serveur (par défaut, la variable d’environnement `OMNIROUTE_API_KEY` ou le jeton du contexte actif).
- `--only <patterns>` — sous-chaînes séparées par des virgules ; conserve uniquement les identifiants de modèles correspondants
  (par ex. `--only glm,kimi`). Disponible avec `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — affiche exactement ce qui serait écrit sans modifier le
  système de fichiers. Disponible avec chaque commande `setup-*`, **sauf** `setup-cursor`
  (qui n’écrit jamais de fichier).
- `--model <id>` — requis (ou sélectionné de manière interactive) pour les outils qui ne disposent pas
  de détection automatique des modèles : Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Ces outils
  acceptent également `--yes` pour les exécutions non interactives (ce qui rend alors `--model` obligatoire).
  `setup-opencode` accepte `--model` pour définir le modèle global par défaut.
- `--model <id>` avec `omniroute run` suit le câblage propre à chaque cible dans le manifeste
  (`bin/cli/cli-manifest.mjs`) : **aider** reçoit `--model openai/<id>` et
  **opencode** `--model omniroute/<id>` (le préfixe n’est ajouté que si l’identifiant
  ne le contient pas déjà) ; **qwen** et **gemini** reçoivent l’identifiant tel quel ;
  **claude** le reçoit via `ANTHROPIC_MODEL`, **goose** via `GOOSE_MODEL`, et
  **codex** via les arguments `-c model_providers.omniroute.*`. **Qwen est la seule cible d’exécution
  qui exige impérativement `--model`** — `omniroute run qwen` sans cette option se termine
  avec le code `2` et une erreur explicite.
- `--port <port>` — port OmniRoute local (`20128` par défaut, ignoré lorsque `--remote`
  est défini). Présent sur toutes les commandes `setup-*` et sur les deux lanceurs.
- Codes de sortie de `omniroute run` : le code de sortie propre à la CLI enfant est propagé
  tel quel ; `2` = arguments non valides (cible non prise en charge, option `--model` requise
  mais absente, protection du conteneur) ; `127` = le binaire cible n’est pas dans `PATH` ;
  `130`/`143`/`129` lorsque le lancement est interrompu par `SIGINT`/`SIGTERM`/`SIGHUP` ;
  `1` = autre échec d’exécution lors du lancement.
- Les deux lanceurs (`launch`, `launch-codex`) acceptent `--profile <name>` pour sélectionner
  un profil écrit par `setup-claude` / `setup-codex`, ainsi que des arguments transmis directement
  au binaire `claude` / `codex` sous-jacent.

Le sélecteur interactif est également partagé par les procédures de configuration :

```bash
# Sélectionnez un modèle dans le catalogue local ou distant actif et configurez la cible.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` délègue actuellement aux procédures testées pour `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` et `5dive`.
Les entrées du catalogue réservées aux IDE,
au MITM et aux guides restent des procédures explicites `setup-*`/manuelles et
ne sont pas présentées comme des cibles exécutables.

> `setup-opencode` est l’intégration OpenCode **légère et compatible avec OpenAI**.
> Il existe également une intégration plus complète sous forme de plugin — `omniroute setup opencode` — qui
> installe `@omniroute/opencode-plugin`. Il s’agit de commandes différentes ; le tableau
> ci-dessus documente `setup-opencode`.
>
> Le plugin est fourni dans deux packages, un pour chaque version majeure d’OpenCode, car les deux
> chargeurs attendent des points d’entrée différents :
> `@omniroute/opencode-plugin` pour OpenCode v1 et
> `@omniroute/opencode-plugin-v2` pour OpenCode v2. Le package v2 est nouveau
> (`0.1.0`) et suit un contrat d’hôte encore en évolution ; il lit donc la
> structure qu’OpenCode injecte dans l’ébauche du catalogue au lieu d’en supposer une. Installez-le
> en ajoutant une entrée `plugins` à `opencode.json` ; `omniroute setup opencode`
> installe toujours le package v1. Les options et l’ordre de recherche des identifiants figurent dans
> le README du package.

---

## Utilisation locale

Avec OmniRoute exécuté sur `localhost:20128`, lancez simplement la commande de configuration de votre
outil. Le catalogue est récupéré depuis le serveur local.

```bash
# Codex : écrire un profil par modèle correspondant dans ~/.codex/
omniroute setup-codex
codex --profile glm52            # utiliser un profil généré

# Claude Code : écrire des profils par modèle, puis en lancer un
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode : écrire le fournisseur compatible avec OpenAI avec tous les modèles du catalogue
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # référencée via {env:OMNIROUTE_API_KEY}, jamais sur le disque
opencode -m omniroute/glm/glm-5.2 "..."

# Les outils sans détection automatique nécessitent un modèle explicite :
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Prévisualiser sans rien écrire :
omniroute setup-continue --dry-run
```

Lancez sans écrire la moindre configuration (injection de variables d’environnement uniquement) :

```bash
omniroute launch                 # Claude Code → OmniRoute local
omniroute launch-codex           # Codex CLI → OmniRoute local
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Chemin de commande explicite : transmettre tel quel tout ce qui suit --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Utilisation à distance

Faites pointer n’importe quelle commande de configuration vers une instance OmniRoute distante avec `--remote` + `--api-key`. Le
catalogue est récupéré depuis l’instance distante ; la configuration est écrite sur votre machine locale.

```bash
# OpenCode avec un VPS distant, conserver uniquement les modèles glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # exporter d’abord OMNIROUTE_API_KEY

# Profils Codex issus d’un catalogue distant
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Lancer directement une CLI avec l’instance distante
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Au lieu de transmettre `--remote`/`--api-key` à chaque fois, connectez-vous une fois et laissez le
**contexte actif** les fournir automatiquement :

```bash
omniroute connect 192.168.0.15        # génère un jeton à portée limitée et stocke le contexte
omniroute setup-codex                 # ← utilise désormais le catalogue distant
omniroute setup-opencode              # ← idem
omniroute launch                      # ← Claude Code avec l’instance distante
```

Consultez [Mode distant](./REMOTE-MODE.md) pour en savoir plus sur les contextes, les portées et la gestion des jetons.

---

## Flottes d’agents 5dive

[5dive](https://5dive.ai) exécute une flotte d’agents de programmation de longue durée, chacun étant une
unité systemd sous son propre utilisateur Unix. Il ne s’agit pas lui-même d’une CLI de programmation, il n’y a donc
rien à lancer avec `omniroute run` — `5dive` est une cible **de configuration uniquement**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Les deux formes écrivent un **profil d’authentification** 5dive, et chaque poste `claude` associé à ce
profil communique ensuite avec OmniRoute. Trois éléments sont propres à cette cible :

- **Elle s’exécute sur l’hôte de la flotte, en tant que root.** Les commandes de 5dive agissent sur les unités systemd locales
  et un répertoire d’état appartenant à root ; il n’existe aucun mode distant. La procédure se relance via
  `sudo` lorsqu’elle n’est pas déjà exécutée en tant que root (`--no-sudo` désactive ce comportement et affiche plutôt la
  commande).
- **Le point de terminaison doit utiliser `https://`, sauf s’il s’agit de l’adresse de bouclage.** La clé API de l’agent
  transite par cette URL à chaque requête, et 5dive refuse un point de terminaison distant en texte clair.
  Une adresse de réseau local privé ne constitue pas une exception.
- **Le modèle épinglé propre à chaque poste prévaut sur le profil.** Le profil contient
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, mais un poste toujours épinglé à un identifiant de
  modèle standard échoue dès son premier tour avec _« Un problème est survenu avec le modèle sélectionné »_.
  Transmettez `--agent <name>` (répétable) pour épingler également les postes ; la procédure affiche la
  commande lorsque vous ne le faites pas.

La clé API est transmise à 5dive sur l’**entrée standard** (`--api-key=-`), elle n’apparaît donc jamais dans
la sortie de `ps`.

Faire pointer le profil vers un **combo** OmniRoute plutôt que vers un seul modèle permet
à la flotte de bénéficier du basculement du fournisseur : lorsque le point de terminaison principal est devenu totalement indisponible en cours de tour
lors de l’exécution consignée dans
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), l’agent a terminé
les étapes restantes sur la solution de secours sans jamais signaler l’interruption.

---

## Conventions d’URL de base (quels outils nécessitent `/v1`)

OmniRoute expose l’interface OpenAI sous `/v1`, l’interface Anthropic à la racine,
et une interface Gemini native sous `/v1beta`. Chaque intégration est configurée selon la forme
attendue par son outil (vérifié dans le code source de la commande) :

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
| `setup-5dive` (`ANTHROPIC_BASE_URL` dans le profil d’authentification)     | racine             | Non — Claude Code ajoute `/v1/messages`     |

---

## Conservation des dépendances natives lors de la mise à jour : `--include=optional`

Lorsque vous effectuez une mise à jour avec `omniroute update` (après confirmation ou avec `--apply`),
OmniRoute exécute l’installation en intégrant automatiquement `--include=optional` :

```bash
npm install -g omniroute@latest --include=optional
```

Il ne s’agit **pas** d’une option à transmettre à `omniroute update` — elle est toujours appliquée par le
programme de mise à jour. Cela garantit que les `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, la pile SLM LLMLingua) sont conservées lors de la mise à jour, même si votre configuration npm
définit `omit=optional`, ce qui supprimerait autrement silencieusement le pilote SQLite natif
et la liaison au trousseau de clés du système d’exploitation. Pour prévisualiser la commande exacte sans l’appliquer :

```bash
omniroute update --dry-run
# [EXÉCUTION SIMULÉE] Exécuterait : npm install -g omniroute@latest --include=optional
```

Autres options de `omniroute update` (vérifiées dans le code source) : `--check` (quitte avec le code 1 si
une mise à jour est disponible), `--apply` (installe sans demander de confirmation), `--changelog`, `--no-backup`,
`--yes`.

---

## CLI Google Gemini via `omniroute run gemini`

Contrat vérifié avec `@google/gemini-cli` 0.50.0 : la CLI respecte
`GOOGLE_GEMINI_BASE_URL` et envoie des requêtes `POST /v1beta/models/<model>:generateContent`
(et `:streamGenerateContent?alt=sse`) à cette URL — exactement l’interface Gemini native
d’OmniRoute (`/v1beta`). `omniroute run gemini` configure cela automatiquement :

- `GOOGLE_GEMINI_BASE_URL` → l’URL de base OmniRoute active (racine, sans `/v1`) ;
- `GEMINI_API_KEY` → l’identifiant OmniRoute résolu (option/environnement/contexte) ;
- un **`GEMINI_CLI_HOME` temporaire et isolé** dont le fichier `.gemini/settings.json`
  sélectionne l’authentification `gemini-api-key`, afin qu’une session Google OAuth enregistrée (Code Assist)
  ne remplace jamais le lancement dirigé vers OmniRoute — supprimé après la fermeture ;
- **hygiène de l’environnement** : les variables `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` et `GOOGLE_GENAI_USE_GCA` sont retirées de l’environnement du processus enfant
  (elles redirigeraient l’authentification vers Vertex/Code Assist), et `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` est
  défini comme sécurité supplémentaire — les autres cibles `run` bénéficient du même
  traitement pour leurs propres variables conflictuelles ;
- injection de `--model <id>` depuis `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

La protection de confiance de l’espace de travail de Gemini s’applique toujours en mode sans interface — transmettez
vous-même `--skip-trust` (ou approuvez le répertoire de manière interactive) ; le lanceur
ne la contourne délibérément pas. Ce lanceur est distinct de l’**enregistrement ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), qui reste l’intégration au protocole d’agent pour
`/dashboard/acp-agents`.

---

## Test de fumée réel (facultatif)

Des tests de régression déterministes du plan de lancement s’exécutent dans la CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Pour valider les VRAIS binaires auprès d’un VRAI
serveur OmniRoute, un banc de test facultatif est disponible dans
`tests/integration/upstream-cli-smoke.int.test.ts`. Il ne s’exécute jamais automatiquement
(chaque sous-test est ignoré sauf si `RUN_CLI_SMOKE=1`), transmet l’identifiant via le NOM
d’une variable d’environnement (jamais par sa valeur), masque les chaînes ressemblant à des clés dans toute sortie enregistrée, ignore
les cibles dont le binaire n’est pas installé et classe les échecs dans les catégories
auth / upstream / config plutôt que sous la forme d’un simple booléen :

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Facultatif : `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` limite le test ;
`OMNIROUTE_SMOKE_TIMEOUT_MS` remplace le délai d’expiration de 120 s par cible.

---

## Voir aussi

- [Configuration de Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — le guide détaillé de Claude Code
- [Configuration de Codex CLI](./CODEX-CLI-CONFIGURATION.md) — la configuration initiale de base de `[model_providers.omniroute]`
- [Mode distant](./REMOTE-MODE.md) — contextes, jetons d’accès à portée limitée et pilotage d’un serveur distant
- [Référence des outils CLI](../reference/CLI-TOOLS.md) — le catalogue complet des outils pris en charge et des pages du tableau de bord
- [Guide d’installation](./SETUP_GUIDE.md) — méthodes d’installation et intégration lors de la première exécution
