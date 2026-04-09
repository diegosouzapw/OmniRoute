# User Guide (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Guide complet pour configurer les fournisseurs, créer des combos, intégrer des outils CLI et déployer OmniRoute.---

## Table of Contents

- [Prix en un coup d'oeil](#-pricing-at-a-glance)
- [Cas d'utilisation](#-cas d'utilisation)
- [Configuration du fournisseur](#-provider-setup)
- [Intégration CLI](#-cli-intégration)
- [Déploiement](#-déploiement)
- [Modèles disponibles](#-modèles-disponibles)
- [Fonctionnalités avancées](#-fonctionnalités-avancées)---

## 💰 Pricing at a Glance

| Niveau            | Fournisseur        | Coût                     | Réinitialisation des quotas | Idéal pour                        |
| ----------------- | ------------------ | ------------------------ | --------------------------- | --------------------------------- |
| **💳 ABONNEMENT** | Claude Code (Pro)  | 20 $/mois                | 5h + hebdomadaire           | Déjà abonné                       |
|                   | Codex (Plus/Pro)   | 20-200 $/mois            | 5h + hebdomadaire           | Utilisateurs d'OpenAI             |
|                   | CLI Gémeaux        | **GRATUIT**              | 180K/mois + 1K/jour         | Tout le monde!                    |
|                   | Copilote GitHub    | 10-19 $/mois             | Mensuel                     | Utilisateurs GitHub               |
| **🔑 CLÉ API**    | Recherche profonde | Paiement à l'utilisation | Aucun                       | Raisonnement bon marché           |
|                   | Groq               | Paiement à l'utilisation | Aucun                       | Inférence ultra-rapide            |
|                   | xAI (Grok)         | Paiement à l'utilisation | Aucun                       | Raisonnement Grok 4               |
|                   | Mistral            | Paiement à l'utilisation | Aucun                       | Modèles hébergés dans l'UE        |
|                   | Perplexité         | Paiement à l'utilisation | Aucun                       | Recherche augmentée               |
|                   | Ensemble IA        | Paiement à l'utilisation | Aucun                       | Modèles open source               |
|                   | Fireworks AI       | Paiement à l'utilisation | Aucun                       | Images FLUX rapides               |
|                   | Cérébraux          | Paiement à l'utilisation | Aucun                       | Vitesse à l'échelle d'une tranche |
|                   | Cohérer            | Paiement à l'utilisation | Aucun                       | Commande R+ RAG                   |
|                   | NIM NVIDIA         | Paiement à l'utilisation | Aucun                       | Modèles d'entreprise              |
| **💰 BON MARCHÉ** | GLM-4.7            | 0,6 $/1 M                | Tous les jours 10h          | Sauvegarde budgétaire             |
|                   | MiniMax M2.1       | 0,2 $/1 M                | 5 heures roulantes          | Option la moins chère             |
|                   | Kimi K2            | 9 $/mois plat            | 10 millions de jetons/mois  | Coût prévisible                   |
| **🆓 GRATUIT**    | Qoder              | 0 $                      | Illimité                    | 8 modèles gratuits                |
|                   | Qwen               | 0 $                      | Illimité                    | 3 modèles gratuits                |
|                   | Kiro               | 0 $                      | Illimité                    | Claude gratuit                    |

**💡 Conseil de pro :**Commencez avec Gemini CLI (180 000 $ gratuits/mois) + combo Qoder (gratuit illimité) = 0 $ de coût !---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Problème :**Le quota expire sans être utilisé, limites de débit lors d'un codage intensif```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Problème :**Je ne peux pas payer les abonnements, j'ai besoin d'un codage IA fiable```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Problème :**Délais, je ne peux pas me permettre de temps d'arrêt```
Combo: "always-on"

1. cc/claude-opus-4-6 (best quality)
2. cx/gpt-5.2-codex (second subscription)
3. glm/glm-4.7 (cheap, resets daily)
4. minimax/MiniMax-M2.1 (cheapest, 5h reset)
5. if/kimi-k2-thinking (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)

````

### Case 4: "I want FREE AI in OpenClaw"

**Problème :**Besoin d'un assistant IA dans les applications de messagerie, entièrement gratuit```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
````

---

## 📖 Provider Setup

### 🔐 Subscription Providers

#### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Conseil de pro :**Utilisez Opus pour les tâches complexes, Sonnet pour la rapidité. OmniRoute suit le quota par modèle !#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (FREE 180K/month!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Meilleur rapport qualité-prix :**Énorme niveau gratuit ! Utilisez-le avant les niveaux payants.#### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3.1-pro-preview
```

### 💰 Cheap Providers

#### GLM-4.7 (Daily reset, $0.6/1M)

1. Inscrivez-vous : [Zhipu AI](https://open.bigmodel.cn/)
2. Obtenez la clé API du plan de codage
3. Tableau de bord → Ajouter une clé API : Fournisseur : `glm`, Clé API : `votre-clé`

**Utilisez :**`glm/glm-4.7` —**Conseil de pro :**Le plan de codage offre un quota de 3 × à un coût de 1/7 ! Réinitialisation quotidienne à 10h00.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Inscrivez-vous : [MiniMax](https://www.minimax.io/)
2. Obtenir la clé API → Tableau de bord → Ajouter une clé API

**Utilisez :**`minimax/MiniMax-M2.1` —**Conseil de pro :**Option la moins chère pour un contexte long (1 million de jetons) !#### Kimi K2 ($9/month flat)

1. Abonnez-vous : [Moonshot AI](https://platform.moonshot.ai/)
2. Obtenir la clé API → Tableau de bord → Ajouter une clé API

**Utilisez :**`kimi/kimi-latest` —**Conseil de pro :**Fixe 9 $/mois pour 10 millions de jetons = 0,90 $/1 million de coût effectif !### 🆓 FREE Providers

#### Qoder (8 FREE models)

```bash
Dashboard → Connect Qoder → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 FREE models)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude FREE)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Combos

### Example 1: Maximize Subscription → Cheap Backup

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Example 2: Free-Only (Zero Cost)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

---

## 🔧 CLI Integration

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

Modifiez `~/.claude/config.json` :```json
{
"anthropic_api_base": "http://localhost:20128/v1",
"anthropic_api_key": "your-omniroute-api-key"
}

````

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
````

### OpenClaw

Modifiez `~/.openclaw/openclaw.json` :```json
{
"agents": {
"defaults": {
"model": { "primary": "omniroute/if/glm-4.7" }
}
},
"models": {
"providers": {
"omniroute": {
"baseUrl": "http://localhost:20128/v1",
"apiKey": "your-omniroute-api-key",
"api": "openai-completions",
"models": [{ "id": "if/glm-4.7", "name": "glm-4.7" }]
}
}
}
}

```

**Ou utilisez le tableau de bord :**Outils CLI → OpenClaw → Configuration automatique### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Déploiement

### Global npm install (Recommended)

```bash
npm install -g omniroute

# Create config directory
mkdir -p ~/.omniroute

# Create .env file (see .env.example)
cp .env.example ~/.omniroute/.env

# Start server
omniroute
# Or with custom port:
omniroute --port 3000
````

La CLI charge automatiquement « .env » à partir de « ~/.omniroute/.env » ou « ./.env ».### VPS Deployment

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute && npm install && npm run build

export JWT_SECRET="your-secure-secret-change-this"
export INITIAL_PASSWORD="your-password"
export DATA_DIR="/var/lib/omniroute"
export PORT="20128"
export HOSTNAME="0.0.0.0"
export NODE_ENV="production"
export NEXT_PUBLIC_BASE_URL="http://localhost:20128"
export API_KEY_SECRET="endpoint-proxy-api-key-secret"

npm run start
# Or: pm2 start npm --name omniroute -- start
```

### PM2 Deployment (Low Memory)

Pour les serveurs avec une RAM limitée, utilisez l'option de limite de mémoire :```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Créez `ecosystem.config.js` :```javascript
module.exports = {
  apps: [
    {
      name: "omniroute",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        OMNIROUTE_MEMORY_MB: "512",
        JWT_SECRET: "your-secret",
        INITIAL_PASSWORD: "your-password",
      },
      node_args: "--max-old-space-size=512",
      max_memory_restart: "300M",
    },
  ],
};
````

### Docker

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

Pour le mode intégré à l'hôte avec les binaires CLI, consultez la section Docker dans la documentation principale.### Void Linux (xbps-src)

Les utilisateurs de Void Linux peuvent empaqueter et installer OmniRoute de manière native à l'aide du framework de compilation croisée « xbps-src ». Cela automatise la construction autonome de Node.js ainsi que les liaisons natives « better-sqlite3 » requises.

<détails>

<summary><b>Afficher le modèle xbps-src</b></summary>```bash
# Template file for 'omniroute'
pkgname=omniroute
version=3.2.4
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
checksum=009400afee90a9f32599d8fe734145cfd84098140b7287990183dde45ae2245b
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() { # Determine target CPU arch for node-gyp
local \_gyp_arch
case "$XBPS_TARGET_MACHINE" in
aarch64*) \_gyp_arch=arm64 ;;
armv7*|armv6*) \_gyp_arch=arm ;;
i686*) \_gyp_arch=ia32 ;;
\*) \_gyp_arch=x64 ;;
esac

    # 1) Install all deps – skip scripts
    NODE_ENV=development npm ci --ignore-scripts

    # 2) Build the Next.js standalone bundle
    npm run build

    # 3) Copy static assets into standalone
    cp -r .next/static .next/standalone/.next/static
    [ -d public ] && cp -r public .next/standalone/public || true

    # 4) Compile better-sqlite3 native binding
    local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
    (cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

    # 5) Place the compiled binding into the standalone bundle
    local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
    mkdir -p "$_bs3_release"
    cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

    # 6) Remove arch-specific sharp bundles
    rm -rf .next/standalone/node_modules/@img

    # 7) Copy pino runtime deps omitted by Next.js static analysis:
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

    # Prevent removal of empty Next.js app router dirs by the post-install hook
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

````

</details>

### Environment Variables

| Variables | Par défaut | Descriptif |
| --------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET` | `omniroute-default-secret-change-me` | Secret de signature JWT (**changement de production**) |
| `INITIAL_PASSWORD` | `123456` | Mot de passe de première connexion |
| `DONNEES_DIR` | `~/.omniroute` | Répertoire de données (base de données, utilisation, journaux) |
| `PORT` | cadre par défaut | Port de service (`20128` dans les exemples) |
| `NOM D'HÔTE` | cadre par défaut | Lier l'hôte (Docker par défaut est « 0.0.0.0 ») |
| `NODE_ENV` | valeur par défaut d'exécution | Définir `production` pour le déploiement |
| `BASE_URL` | `http://localhost:20128` | URL de base interne côté serveur |
| `CLOUD_URL` | `https://omniroute.dev` | URL de base du point de terminaison de synchronisation cloud |
| `API_KEY_SECRET` | `endpoint-proxy-api-key-secret` | Secret HMAC pour les clés API générées |
| `REQUIRE_API_KEY` | `faux` | Appliquer la clé API Bearer sur `/v1/*` |
| `ALLOW_API_KEY_REVEAL` | `faux` | Autoriser Api Manager à copier des clés API complètes à la demande |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | '70' | Cadence d'actualisation côté serveur pour les données de limites du fournisseur mises en cache ; Les boutons d'actualisation de l'interface utilisateur déclenchent toujours la synchronisation manuelle |
| `DISABLE_SQLITE_AUTO_BACKUP` | `faux` | Désactivez les instantanés SQLite automatiques avant les écritures/importations/restaurations ; les sauvegardes manuelles fonctionnent toujours |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | `faux` | Forcer le cookie d'authentification « sécurisé » (derrière le proxy inverse HTTPS) |
| `CLOUDFLARED_BIN` | non défini | Utiliser un binaire `cloudflared` existant au lieu d'un téléchargement géré |
| `CLOUDFLARED_PROTOCOL` | `http2` | Transport pour les tunnels rapides gérés (`http2`, `quic` ou `auto`) |
| `OMNIROUTE_MEMORY_MB` | '512' | Limite de tas Node.js en Mo |
| `PROMPT_CACHE_MAX_SIZE` | '50' | Nombre maximal d'entrées dans le cache d'invite |
| `SEMANTIC_CACHE_MAX_SIZE` | '100' | Nombre maximum d'entrées de cache sémantique |Pour la référence complète des variables d'environnement, consultez le [README](../README.md).---

## 📊 Available Models

<détails>
<summary><b>Afficher tous les modèles disponibles</b></summary>

**Claude Code (`cc/`)**— Pro/Max : `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)**— Plus/Pro : `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**— GRATUIT : `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**Copilote GitHub (`gh/`)** : `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)**— 0,6 $/1 million : `glm/glm-4.7`

**MiniMax (`minimax/`)**— 0,2 $/1 million : `minimax/MiniMax-M2.1`

**Qoder (`if/`)**— GRATUIT : `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)**— GRATUIT : `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)**— GRATUIT : `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)** : `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)** : `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)** : `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)** : `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Perplexité (`pplx/`)** : `pplx/sonar-pro`, `pplx/sonar`

**Ensemble AI (`ensemble/`)** : `ensemble/méta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)** : `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cérébras (`cerebras/`)** : `cerebras/llama-3.3-70b`

**Cohérer (`cohere/`)** : `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)** : `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

Ajoutez n'importe quel ID de modèle à n'importe quel fournisseur sans attendre une mise à jour de l'application :```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

Ou utilisez le tableau de bord :**Fournisseurs → [Fournisseur] → Modèles personnalisés**.

Remarques :

- Les fournisseurs compatibles OpenRouter et OpenAI/Anthropic sont gérés à partir de**Modèles disponibles**uniquement. L'ajout manuel, l'importation et la synchronisation automatique se retrouvent tous dans la même liste de modèles disponibles, il n'y a donc pas de section Modèles personnalisés distincte pour ces fournisseurs.
- La section**Modèles personnalisés**est destinée aux fournisseurs qui n'exposent pas les importations de modèles disponibles gérés.### Dedicated Provider Routes

Acheminez les demandes directement vers un fournisseur spécifique avec validation du modèle :```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

Le préfixe du fournisseur est ajouté automatiquement s'il est manquant. Les modèles incompatibles renvoient « 400 ».### Network Proxy Configuration

```bash
# Set global proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"global": {"type":"http","host":"proxy.example.com","port":"8080"}}'

# Per-provider proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"providers": {"openai": {"type":"socks5","host":"proxy.example.com","port":"1080"}}}'

# Test proxy
curl -X POST http://localhost:20128/api/settings/proxy/test \
  -d '{"proxy":{"type":"socks5","host":"proxy.example.com","port":"1080"}}'
````

**Précédence :**Spécifique à la clé → Spécifique au combo → Spécifique au fournisseur → Global → Environnement.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Renvoie des modèles regroupés par fournisseur avec des types (`chat`, `embedding`, `image`).### Cloud Sync

- Synchronisez les fournisseurs, les combos et les paramètres sur tous les appareils
- Synchronisation automatique en arrière-plan avec délai d'attente + échec rapide
- Préférer `BASE_URL`/`CLOUD_URL` côté serveur en production### Cloudflare Quick Tunnel

- Disponible dans**Dashboard → Endpoints**pour Docker et autres déploiements auto-hébergés
- Crée une URL temporaire `https://*.trycloudflare.com` qui redirige vers votre point de terminaison `/v1` actuel compatible OpenAI
- Activez d'abord les installations « cloudflared » uniquement lorsque cela est nécessaire ; les redémarrages ultérieurs réutilisent le même binaire géré
- Les tunnels rapides ne sont pas automatiquement restaurés après un redémarrage d'OmniRoute ou d'un conteneur ; réactivez-les depuis le tableau de bord en cas de besoin
- Les URL des tunnels sont éphémères et changent à chaque fois que vous arrêtez/démarrez le tunnel
- Les tunnels rapides gérés utilisent par défaut le transport HTTP/2 pour éviter les avertissements de tampon QUIC UDP bruyants dans les conteneurs contraints
- Définissez `CLOUDFLARED_PROTOCOL=quic` ou `auto` si vous souhaitez remplacer le choix de transport géré
- Définissez `CLOUDFLARED_BIN` si vous préférez utiliser un binaire `cloudflared` préinstallé au lieu du téléchargement géré### LLM Gateway Intelligence (Phase 9)

-**Cache sémantique**— Met automatiquement en cache les réponses hors streaming, température = 0 (contourner avec `X-OmniRoute-No-Cache : true`) -**Request Idempotency**— Déduplique les requêtes dans les 5 secondes via l'en-tête `Idempotency-Key` ou `X-Request-Id` -**Suivi des progrès**— Événements SSE `event: progress` opt-in via l'en-tête `X-OmniRoute-Progress: true`---

### Translator Playground

Accès via**Tableau de bord → Traducteur**. Déboguez et visualisez comment OmniRoute traduit les requêtes API entre les fournisseurs.

| Mode                   | Objectif                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Aire de jeux**       | Sélectionnez les formats source/cible, collez une requête et voyez instantanément le résultat traduit         |
| **Testeur de chat**    | Envoyez des messages de chat en direct via le proxy et inspectez le cycle complet de demande/réponse          |
| **Banc d'essai**       | Exécutez des tests par lots sur plusieurs combinaisons de formats pour vérifier l'exactitude de la traduction |
| **Moniteur en direct** | Regardez les traductions en temps réel à mesure que les demandes transitent par le proxy                      |

**Cas d'utilisation :**

- Déboguer pourquoi une combinaison client/fournisseur spécifique échoue
- Vérifiez que les balises de réflexion, les appels d'outils et les invites système se traduisent correctement
- Comparez les différences de format entre les formats API OpenAI, Claude, Gemini et Responses---

### Routing Strategies

Configurez via**Tableau de bord → Paramètres → Routage**.

| Stratégie                         | Descriptif                                                                                                                   |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Remplir en premier**            | Utilise les comptes par ordre de priorité : le compte principal gère toutes les demandes jusqu'à ce qu'il soit indisponible  |
| **Tournoi à la ronde**            | Parcourt tous les comptes avec une limite persistante configurable (par défaut : 3 appels par compte)                        |
| **P2C (Puissance de deux choix)** | Sélectionne 2 comptes aléatoires et oriente vers le compte le plus sain – équilibre la charge avec la conscience de la santé |
| **Aléatoire**                     | Sélectionne au hasard un compte pour chaque demande à l'aide de Fisher-Yates shuffle                                         |
| **Le moins utilisé**              | Routes vers le compte avec l'horodatage `lastUsedAt` le plus ancien, répartissant le trafic de manière uniforme              |
| **Coût optimisé**                 | Itinéraires vers le compte avec la valeur de priorité la plus faible, optimisation pour les fournisseurs les moins chers     | #### External Sticky Session Header |

Pour une affinité de session externe (par exemple, agents Claude Code/Codex derrière des proxys inverses), envoyez :```http
X-Session-Id: your-session-key

````

OmniRoute accepte également `x_session_id` et renvoie la clé de session effective dans `X-OmniRoute-Session-Id`.

Si vous utilisez Nginx et envoyez des en-têtes de formulaire de soulignement, activez :```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Créez des modèles génériques pour remapper les noms de modèles :```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Les caractères génériques prennent en charge `*` (n'importe quel caractère) et `?` (un seul caractère).#### Fallback Chains

Définissez des chaînes de secours globales qui s'appliquent à toutes les requêtes :```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

Configurez via**Tableau de bord → Paramètres → Résilience**.

OmniRoute met en œuvre la résilience au niveau du fournisseur avec quatre composants :

1.**Profils de fournisseur**— Configuration par fournisseur pour :

- Seuil de défaillance (combien de défaillances avant ouverture)
- Durée du temps de recharge
- Sensibilité de détection de limite de débit
- Paramètres d'intervalle exponentiel

  2.**Limites de débit modifiables**— Paramètres par défaut au niveau du système configurables dans le tableau de bord : -**Requêtes par minute (RPM)**— Nombre maximal de requêtes par minute et par compte -**Min Time Between Requests**— Écart minimum en millisecondes entre les requêtes -**Max Concurrent Requests**— Nombre maximal de requêtes simultanées par compte

- Cliquez sur**Modifier**pour modifier, puis sur**Enregistrer**ou**Annuler**. Les valeurs persistent via l'API de résilience.

  3.**Disjoncteur**— Suit les pannes par fournisseur et ouvre automatiquement le circuit lorsqu'un seuil est atteint : -**FERMÉ**(sain) — Les demandes circulent normalement -**OPEN**— Le fournisseur est temporairement bloqué après des échecs répétés -**HALF_OPEN**— Test si le fournisseur a récupéré

  4.**Politiques et identifiants verrouillés**— Affiche l'état du disjoncteur et les identifiants verrouillés avec capacité de déverrouillage forcé.

  5.**Détection automatique des limites de débit**— Surveille les en-têtes « 429 » et « Retry-After » pour éviter de manière proactive d'atteindre les limites de débit du fournisseur.

**Conseil de pro :**Utilisez le bouton**Réinitialiser tout**pour effacer tous les disjoncteurs et les temps de recharge lorsqu'un fournisseur se remet d'une panne.---

### Database Export / Import

Gérez les sauvegardes de base de données dans**Tableau de bord → Paramètres → Système et stockage**.

| Actions                         | Descriptif                                                                                                                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| **Exporter la base de données** | Télécharge la base de données SQLite actuelle sous forme de fichier `.sqlite`                                                                                                              |
| **Exporter tout (.tar.gz)**     | Télécharge une archive de sauvegarde complète comprenant : base de données, paramètres, combos, connexions du fournisseur (pas d'informations d'identification), métadonnées de la clé API |
| **Importer la base de données** | Téléchargez un fichier `.sqlite` pour remplacer la base de données actuelle. Une sauvegarde de pré-importation est automatiquement créée sauf si `DISABLE_SQLITE_AUTO_BACKUP=true`         | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Validation de l'importation :**Le fichier importé est validé pour son intégrité (vérification pragma SQLite), les tables requises (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) et la taille (max 100 Mo).

**Cas d'utilisation :**

- Migrer OmniRoute entre machines
- Créer des sauvegardes externes pour la reprise après sinistre
- Partager les configurations entre les membres de l'équipe (exporter tout → partager l'archive)---

### Settings Dashboard

La page des paramètres est organisée en 6 onglets pour une navigation facile :

| Onglet | Contenu |
| ---------- | ------------------------------------------------------------------------------------------------------------- |
|**Général**| Outils de stockage système, paramètres d'apparence, commandes de thème et visibilité de la barre latérale par élément |
|**Sécurité**| Paramètres de connexion/mot de passe, contrôle d'accès IP, authentification API pour `/models` et blocage du fournisseur |
|**Routage**| Stratégie de routage globale (6 options), alias de modèle générique, chaînes de secours, valeurs par défaut combinées |
|**Résilience**| Profils de fournisseurs, limites de débit modifiables, état du disjoncteur, politiques et identifiants verrouillés |
|**IA**| Configuration du budget de réflexion, injection d'invite du système global, statistiques de cache d'invite |
|**Avancé**| Configuration globale du proxy (HTTP/SOCKS5) |---

### Costs & Budget Management

Accès via**Tableau de bord → Coûts**.

| Onglet | Objectif |
| ----------- | --------------------------------------------------------------------------------------------- |
|**Budget**| Fixez des limites de dépenses par clé API avec des budgets quotidiens/hebdomadaires/mensuels et un suivi en temps réel |
|**Tarif**| Afficher et modifier les entrées de tarification du modèle — coût par 1 000 jetons d'entrée/sortie par fournisseur |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Suivi des coûts :**Chaque demande enregistre l'utilisation du jeton et calcule le coût à l'aide du tableau de tarification. Affichez les répartitions dans**Tableau de bord → Utilisation**par fournisseur, modèle et clé API.---

### Audio Transcription

OmniRoute prend en charge la transcription audio via le point de terminaison compatible OpenAI :```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Fournisseurs disponibles :**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Formats audio pris en charge : `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

### Combo Balancing Strategies

Configurez l'équilibrage par combo dans**Tableau de bord → Combos → Créer/Modifier → Stratégie**.

| Stratégie | Descriptif |
| ------------------ | ------------------------------------------------------------------------ |
|**Robin à la ronde**| Tourne à travers les modèles de manière séquentielle |
|**Priorité**| Essaie toujours le premier modèle ; se rabat uniquement sur l'erreur |
|**Aléatoire**| Sélectionne un modèle aléatoire dans le combo pour chaque demande |
|**Pondéré**| Itinéraires proportionnellement basés sur les poids attribués par modèle |
|**Les moins utilisés**| Itinéraires vers le modèle avec le moins de requêtes récentes (utilise des métriques combinées) |
|**Coût optimisé**| Itinéraires vers le modèle disponible le moins cher (utilise le tableau de prix) |

Les valeurs par défaut des combos globaux peuvent être définies dans**Tableau de bord → Paramètres → Routage → Paramètres par défaut des combos**.---

### Health Dashboard

Accès via**Tableau de bord → Santé**. Aperçu de l'état du système en temps réel avec 6 cartes :

| Carte | Ce que cela montre |
| ------------------------------------ | ----------------------------------------------------------- |
|**État du système**| Disponibilité, version, utilisation de la mémoire, répertoire de données |
|**Santé du fournisseur**| État du disjoncteur par fournisseur (Fermé/Ouvert/Semi-ouvert) |
|**Limites de taux**| Temps de recharge de la limite de débit actif par compte avec temps restant |
|**Verrouillages actifs**| Fournisseurs temporairement bloqués par la politique de verrouillage |
|**Cache de signatures**| Statistiques du cache de déduplication (clés actives, taux de réussite) |
|**Télémétrie de latence**| Agrégation de latence p50/p95/p99 par fournisseur |

**Conseil de pro :**La page Santé s'actualise automatiquement toutes les 10 secondes. Utilisez la carte disjoncteur pour identifier les fournisseurs qui rencontrent des problèmes.---

## 🖥️ Desktop Application (Electron)

OmniRoute est disponible en tant qu'application de bureau native pour Windows, macOS et Linux.### Installer

```bash
# From the electron directory:
cd electron
npm install

# Development mode (connect to running Next.js dev server):
npm run dev

# Production mode (uses standalone build):
npm start
````

### Building Installers

```bash
cd electron
npm run build          # Current platform
npm run build:win      # Windows (.exe NSIS)
npm run build:mac      # macOS (.dmg universal)
npm run build:linux    # Linux (.AppImage)
```

Sortie → `électron/dist-électron/`### Key Features

| Fonctionnalité                       | Descriptif                                                                          |
| ------------------------------------ | ----------------------------------------------------------------------------------- | ------------------------- |
| **Préparation du serveur**           | Interroge le serveur avant d'afficher la fenêtre (pas d'écran vide)                 |
| **Barre d'état système**             | Réduire dans la barre d'état, changer de port, quitter le menu de la barre d'état   |
| **Gestion portuaire**                | Changer le port du serveur à partir du plateau (redémarrage automatique du serveur) |
| **Politique de sécurité du contenu** | CSP restrictif via les en-têtes de session                                          |
| **Instance unique**                  | Une seule instance d'application peut être exécutée à la fois                       |
| **Mode hors ligne**                  | Le serveur Next.js fourni fonctionne sans Internet                                  | ### Environment Variables |

| Variable              | Default | Descriptif                             |
| --------------------- | ------- | -------------------------------------- |
| `OMNIROUTE_PORT`      | `20128` | Port du serveur                        |
| `OMNIROUTE_MEMORY_MB` | `512`   | Limite de tas Node.js (64 à 16 384 Mo) |

📖 Documentation complète : [`electron/README.md`](../electron/README.md)
