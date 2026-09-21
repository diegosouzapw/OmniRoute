# 📖 Setup Guide — OmniRoute (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Référence complète pour la configuration d’OmniRoute. Pour la version rapide, consultez le [Démarrage rapide dans le README](../README.md#-quick-start).

## Table des matières

- [Méthodes d’installation](#install-methods)
- [Configuration de l’outil CLI](#cli-tool-configuration)
- [Configuration des protocoles (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Configuration des délais d’expiration](#timeout-configuration)
- [Mode avec ports séparés](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Désinstallation](#uninstalling)

---

## Méthodes d’installation

### npm (recommandé)

```bash
npm install -g omniroute
omniroute
```

Le tableau de bord s’ouvre à l’adresse `http://localhost:20128` et l’URL de base de l’API est `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **Utilisateurs de pnpm :** l’option `--allow-build` est requise pour activer les scripts de compilation natifs de `better-sqlite3` et `@swc/core`. La commande `pnpm approve-builds -g` n’est pas prise en charge pour les installations globales avec pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

Le [paquet AUR](https://aur.archlinux.org/packages/omniroute-bin) installe OmniRoute et fournit un service utilisateur systemd.

### Depuis les sources

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Remarque pour Windows :** par défaut, OmniRoute utilise `%APPDATA%\omniroute` lorsque l’ancien répertoire `%USERPROFILE%\.omniroute` n’est pas présent. Définissez `DATA_DIR` pour choisir un autre emplacement pour le répertoire de données.

> **Remarque :** `npm install` génère automatiquement `.env` à partir de `.env.example` lors de la première exécution. Les installations suivantes ne remplaceront pas un fichier `.env` existant, ce qui permet de conserver les personnalisations. Pour le régénérer, supprimez `.env` avant de relancer la commande.

### Docker

Consultez le [Guide Docker](./DOCKER_GUIDE.md) pour obtenir les instructions complètes de configuration de Docker, notamment les profils Compose et le HTTPS avec Caddy.

### Application de bureau (Electron)

OmniRoute inclut une application de bureau basée sur Electron 41 + electron-builder 26.10. Scripts disponibles (à la racine de l’espace de travail) :

```bash
npm run electron:dev          # Exécuter l’application de bureau avec rechargement à chaud
npm run electron:build        # Compiler pour le système d’exploitation actuel (détecté automatiquement)
npm run electron:build:win    # Programme d’installation Windows (NSIS + portable)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Tester sommairement la version empaquetée
```

Les programmes d’installation de l’application de bureau sont joints aux versions publiées sur GitHub. Pour une présentation approfondie d’Electron (signature, pont IPC, distributions), consultez [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(créé lors d’une phase ultérieure)_.

### Serveur sans interface graphique (CI/automatisation)

Pour les configurations sans intervention (Docker, Kubernetes, CI), utilisez :

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Associé à des variables d’environnement (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET`, etc.), cela vous permet de déployer une instance OmniRoute entièrement automatisable par script.

### Options de la CLI

| Commande                | Description                                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------------------- |
| `omniroute`             | Démarrer le serveur (`PORT=20128`, API et tableau de bord sur le même port)                         |
| `omniroute setup`       | Configuration guidée via la CLI pour le mot de passe et le premier fournisseur                      |
| `omniroute doctor`      | Exécuter des vérifications d’intégrité locales sans démarrer le serveur                             |
| `omniroute providers`   | Découvrir, répertorier, valider et tester les fournisseurs depuis la CLI                            |
| `omniroute config`      | Configuration de l’outil CLI — répertorier, obtenir, définir et valider les configurations          |
| `omniroute status`      | Tableau de bord d’état hors ligne — version, base de données, outils, configuration                 |
| `omniroute logs`        | Diffuser les journaux d’utilisation depuis l’API (prend en charge `--follow`)                       |
| `omniroute update`      | Rechercher ou appliquer les mises à jour d’OmniRoute                                                |
| `omniroute provider`    | Gérer les connexions aux fournisseurs — ajouter, répertorier, supprimer, tester, définir par défaut |
| `omniroute --port 3000` | Définir le port canonique/de l’API sur 3000                                                         |
| `omniroute --mcp`       | Démarrer le serveur MCP (transport stdio)                                                           |
| `omniroute --no-open`   | Ne pas ouvrir automatiquement le navigateur                                                         |
| `omniroute --help`      | Afficher l’aide                                                                                     |

La configuration sans interface graphique peut être automatisée à l’aide d’options ou de variables d’environnement :

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Exécutez les diagnostics locaux sans ouvrir le tableau de bord :

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Gérez les fournisseurs via SSH ou des scripts sans ouvrir le tableau de bord :

```bash
omniroute providers available
omniroute providers available --search openai
omniroute providers available --category api-key
omniroute providers list
omniroute providers test <id-or-name>
omniroute providers test-all
omniroute providers validate
```

---

## Configuration de l’outil CLI

### 1) Connecter des fournisseurs et créer une clé API

1. Ouvrez le Dashboard → `Providers` et connectez au moins un fournisseur (OAuth ou clé API).
2. Ouvrez le Dashboard → `Endpoints` et créez une clé API.
3. (Facultatif) Ouvrez le Dashboard → `Combos` et définissez votre chaîne de repli.

### 2) Configurer votre outil de programmation

```txt
URL de base : http://localhost:20128/v1
Clé API :     [copiée depuis la page Endpoint]
Modèle :      if/qwen3.8-max-preview (ou tout préfixe fournisseur/modèle)
```

Si votre éditeur ne peut pas envoyer `Authorization: Bearer ...`, utilisez plutôt l’URL de base de compatibilité contenant le jeton :

```txt
URL de base :     http://localhost:20128/api/v1/vscode/YOUR_KEY/
URL des modèles : http://localhost:20128/api/v1/vscode/YOUR_KEY/models
URL du chat :     http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
URL des tags Ollama : http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Fonctionne avec Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode et les SDK compatibles avec OpenAI.

#### Configuration automatique avec `setup-*`

Au lieu de coller manuellement l’URL de base et la clé, laissez OmniRoute écrire la configuration propre à chaque outil à partir du catalogue de modèles actif. Une commande par outil :

```bash
omniroute setup-codex        # Profils ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (compatible avec OpenAI)
omniroute setup-cline        # Paramètres de Cline CLI et de l’extension VS Code
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # Affiche les étapes à suivre dans l’application Cursor
omniroute setup-roo          # Importation Roo Code et pointeur autoImport
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Chaque commande accepte `--remote <url> --api-key <key>` afin de configurer un outil local pour une instance OmniRoute **distante**, ainsi que `--dry-run` pour afficher un aperçu. Pour lancer une CLI avec les variables d’environnement appropriées injectées sans écrire le moindre fichier de configuration, utilisez le lanceur générique `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini) ; les anciens lanceurs propres à chaque outil, `omniroute launch` (Claude Code) et `omniroute launch-codex` (Codex), restent disponibles.

Pour consulter le tableau complet (éléments écrits par chaque commande, tous les indicateurs, fonctionnement local ou distant et conventions `/v1` des URL de base), consultez **[Intégrations CLI](./CLI-INTEGRATIONS.md)**.

Pour obtenir des instructions de configuration détaillées pour chaque outil (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot, etc.), consultez le **[Guide des outils CLI](../reference/CLI-TOOLS.md)** dédié.

---

## Configuration des protocoles (MCP + A2A)

### Configuration de MCP (Model Context Protocol)

Démarrez le transport MCP en mode stdio :

```bash
omniroute --mcp
```

Procédure de validation recommandée :

```bash
# 1. Démarrer le serveur MCP
omniroute --mcp

# 2. Depuis votre client MCP, appeler :
omniroute_get_health        # Doit renvoyer l’état du système
omniroute_list_combos       # Doit renvoyer les combos actifs

# 3. Ou exécuter la suite E2E complète :
npm run test:protocols:e2e
```

#### Configuration du client MCP

**Claude Code :**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline :**

Ajoutez ceci à vos paramètres MCP :

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"],
      "env": {}
    }
  }
}
```

**Documentation MCP complète :** [README du serveur MCP](../../open-sse/mcp-server/README.md) — 110 outils, configurations d’IDE, clients Python/TS/Go.

### Configuration d’A2A (protocole agent-à-agent)

Vérifiez l’Agent Card :

```bash
curl http://localhost:20128/.well-known/agent.json
```

Envoyez une tâche :

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Donnez-moi un bref résumé des quotas."}]}}'
```

**Documentation A2A complète :** [README du serveur A2A](../../src/lib/a2a/README.md) — JSON-RPC 2.0, compétences, diffusion en continu et cycle de vie des tâches.

---

## Configuration des délais d’expiration

### Délais d’expiration de base

Pour la plupart des déploiements, seules ces deux variables sont nécessaires :

| Variable                 | Valeur par défaut              | Objectif                                                                                                                                                                        |
| ------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                       | Référence commune pour le délai d’attente du début de la réponse en amont, les délais Undici masqués, les requêtes d’empreinte TLS et les délais de requête/proxy du pont d’API |
| `STREAM_IDLE_TIMEOUT_MS` | hérite de `REQUEST_TIMEOUT_MS` | Intervalle maximal entre les fragments de streaming avant qu’OmniRoute n’interrompe le flux SSE                                                                                 |

La rétrocompatibilité est préservée : les variables existantes `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` et les autres variables de délai d’expiration propres à chaque couche continuent de fonctionner et remplacent la référence commune.

### Remarques spécifiques aux fournisseurs

Pour les services en amont compatibles avec Claude Code (`anthropic-compatible-cc-*`), OmniRoute calcule l’en-tête sortant `X-Stainless-Timeout` à partir du délai d’expiration de récupération résolu, afin que les délais de lecture côté fournisseur restent alignés sur votre configuration d’environnement.

Pour les proxys inverses tiers compatibles avec Claude Code, OmniRoute conserve un ensemble `anthropic-beta` par défaut prudent et, lorsque `Client Cache Control` reste défini sur `Auto`, transmet uniquement les marqueurs `cache_control` fournis par le client. Activez l’option « Enable redact-thinking beta » pour chaque connexion uniquement lorsque le service en amont exige spécifiquement des flux de raisonnement Claude expurgés.

### Remplacements avancés des délais d’expiration

| Variable                                 | Valeur par défaut                          | Objectif                                                                                              |
| ---------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | hérite de `REQUEST_TIMEOUT_MS`             | Délai d’attente du début de la réponse en amont, utilisé jusqu’à la réception des en-têtes de réponse |
| `FETCH_HEADERS_TIMEOUT_MS`               | hérite de `FETCH_TIMEOUT_MS`               | Durée limite Undici pour la réception des en-têtes de réponse en amont                                |
| `FETCH_BODY_TIMEOUT_MS`                  | hérite de `FETCH_TIMEOUT_MS`               | Durée limite Undici entre les fragments du corps en amont (`0` la désactive)                          |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Délai d’expiration Undici pour la connexion TCP                                                       |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Délai d’expiration Undici pour les sockets persistants inactifs                                       |
| `TLS_CLIENT_TIMEOUT_MS`                  | hérite de `FETCH_TIMEOUT_MS`               | Délai d’expiration des requêtes d’empreinte TLS effectuées via `wreq-js`                              |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | hérite de `REQUEST_TIMEOUT_MS` ou `600000` | Délai d’expiration du transfert proxy de `/v1` depuis le port de l’API vers celui du tableau de bord  |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | Délai d’expiration des requêtes entrantes sur le serveur du pont d’API                                |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | Délai d’expiration des en-têtes entrants sur le serveur du pont d’API                                 |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | Délai d’expiration des connexions persistantes sur le serveur du pont d’API                           |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | Délai d’expiration en cas d’inactivité du socket sur le serveur du pont d’API (`0` le désactive)      |

> **Remarque :** Pour les requêtes en streaming, `FETCH_TIMEOUT_MS` couvre uniquement l’établissement de la connexion et l’attente de la première réponse en amont. Une fois le flux actif, OmniRoute ne l’interrompt qu’en cas de blocage effectif (`STREAM_IDLE_TIMEOUT_MS`) ou d’inactivité du corps Undici (`FETCH_BODY_TIMEOUT_MS`).

### Compatibilité avec les proxys inverses

Si vous exécutez OmniRoute derrière Nginx, Caddy, Cloudflare ou un autre proxy inverse, assurez-vous que les délais d’expiration du proxy sont également supérieurs aux délais de streaming/récupération d’OmniRoute.

---

## Mode à ports séparés

Exécutez l’API et le tableau de bord sur des ports distincts pour les scénarios avancés (proxy inverse, mise en réseau de conteneurs) :

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API :              http://localhost:20128/v1
# Tableau de bord :  http://localhost:20129
```

---

## Modèle Void Linux (xbps-src)

Les utilisateurs de Void Linux peuvent créer un paquet natif avec `xbps-src`. Enregistrez ce bloc sous `srcpkgs/omniroute/template` :

```bash
# Fichier modèle pour 'omniroute'
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# Régénérez la somme de contrôle pour chaque version avec :
#   curl -L -o /tmp/omniroute.tar.gz "https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz" && sha256sum /tmp/omniroute.tar.gz
checksum=PLACEHOLDER_REGENERATE_PER_RELEASE
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() {
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
	esac

	NODE_ENV=development npm ci --ignore-scripts
	npm run build
	cp -r .next/static .next/standalone/.next/static
	[ -d public ] && cp -r public .next/standalone/public || true

	local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
	(cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

	local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
	mkdir -p "$_bs3_release"
	cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

	rm -rf .next/standalone/node_modules/@img

	for _mod in pino-abstract-transport split2 process-warning; do
		cp -r "node_modules/$_mod" .next/standalone/node_modules/
	done
}

do_check() {
	npm run test:unit
}

do_install() {
	vmkdir usr/lib/omniroute/.next
	vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

	for _d in \
		.next/standalone/.next/server/app/dashboard \
		.next/standalone/.next/server/app/dashboard/settings \
		.next/standalone/.next/server/app/dashboard/providers; do
		touch "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
	done

	cat > "${WRKDIR}/omniroute" <<'EOF'
#!/bin/sh
export PORT="${PORT:-20128}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
export APP_LOG_TO_FILE="${APP_LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/omniroute"
}

post_install() {
	vlicense LICENSE
}
```

---

## Désinstallation

| Commande                 | Action                                                                                                                |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Supprime l’application du système, mais **conserve votre base de données et vos configurations** dans `~/.omniroute`. |
| `npm run uninstall:full` | Supprime l’application ET **efface définitivement toutes les configurations, clés et bases de données**.              |

> Pour obtenir des instructions de désinstallation détaillées pour toutes les méthodes, consultez [UNINSTALL.md](./UNINSTALL.md).
