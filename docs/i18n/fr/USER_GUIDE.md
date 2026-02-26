# Guide de l'utilisateur

🌐 **Languages:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md)

Guide complet pour configurer les fournisseurs, créer des combos, intégrer des outils CLI et déployer OmniRoute.

---

## Table des matières

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)

---

## 💰 Aperçu des prix

| Niveau            | Fournisseur           | Coût                     | Réinitialisation des quotas | Idéal pour                        |
| ----------------- | --------------------- | ------------------------ | --------------------------- | --------------------------------- |
| **💳 ABONNEMENT** | Claude Code (Pro)     | 20 $/mois                | 5h + hebdomadaire           | Déjà abonné                       |
|                   | Codex (Plus/Pro)      | 20-200 $/mois            | 5h + hebdomadaire           | Utilisateurs d'OpenAI             |
|                   | CLI Gémeaux           | **GRATUIT**              | 180K/mois + 1K/jour         | Tout le monde!                    |
|                   | Copilote GitHub       | 10-19 $/mois             | Mensuel                     | Utilisateurs GitHub               |
| **🔑 CLÉ API**    | Recherche profonde    | Paiement à l'utilisation | Aucun                       | Raisonnement bon marché           |
|                   | Groq                  | Paiement à l'utilisation | Aucun                       | Inférence ultra-rapide            |
|                   | xAI (Grok)            | Paiement à l'utilisation | Aucun                       | Raisonnement Grok 4               |
|                   | Mistral               | Paiement à l'utilisation | Aucun                       | Modèles hébergés dans l'UE        |
|                   | Perplexité            | Paiement à l'utilisation | Aucun                       | Recherche augmentée               |
|                   | Ensemble IA           | Paiement à l'utilisation | Aucun                       | Modèles open source               |
|                   | IA de feux d'artifice | Paiement à l'utilisation | Aucun                       | Images FLUX rapides               |
|                   | Cérébraux             | Paiement à l'utilisation | Aucun                       | Vitesse à l'échelle d'une tranche |
|                   | Cohérer               | Paiement à l'utilisation | Aucun                       | Commande R+ RAG                   |
|                   | NIM NVIDIA            | Paiement à l'utilisation | Aucun                       | Modèles d'entreprise              |
| **💰 BON MARCHÉ** | GLM-4.7               | 0,6 $/1 M                | Tous les jours 10h          | Sauvegarde budgétaire             |
|                   | MiniMax M2.1          | 0,2 $/1 M                | 5 heures roulantes          | Option la moins chère             |
|                   | Kimi K2               | 9 $/mois plat            | 10 millions de jetons/mois  | Coût prévisible                   |
| **🆓 GRATUIT**    | iFlow                 | 0 $                      | Illimité                    | 8 modèles gratuits                |
|                   | Qwen                  | 0 $                      | Illimité                    | 3 modèles gratuits                |
|                   | Kiro                  | 0 $                      | Illimité                    | Claude gratuit                    |

**💡 Conseil de pro :** Commencez avec Gemini CLI (180 000 gratuits/mois) + combo iFlow (gratuit et illimité) = 0 $ de coût !

---

## 🎯 Cas d'utilisation

### Cas 1 : "J'ai un abonnement Claude Pro"

**Problème :** Le quota expire sans être utilisé, limites de débit lors d'un codage intensif

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Cas 2 : "Je veux un coût nul"

**Problème :** Je ne peux pas payer les abonnements, j'ai besoin d'un codage IA fiable

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### Cas 3 : "J'ai besoin de coder 24h/24 et 7j/7, sans interruption"

**Problème :** Délais, je ne peux pas me permettre de temps d'arrêt

```
Combo: "always-on"
  1. cc/claude-opus-4-6        (best quality)
  2. cx/gpt-5.2-codex          (second subscription)
  3. glm/glm-4.7               (cheap, resets daily)
  4. minimax/MiniMax-M2.1      (cheapest, 5h reset)
  5. if/kimi-k2-thinking       (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)
```

### Cas 4 : "Je veux une IA GRATUITE dans OpenClaw"

**Problème :** Besoin d'un assistant IA dans les applications de messagerie, entièrement gratuit

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Configuration du fournisseur

### 🔐 Fournisseurs d'abonnements

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

**Conseil de pro :** Utilisez Opus pour les tâches complexes, Sonnet pour la rapidité. OmniRoute suit le quota par modèle !

#### Codex OpenAI (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (180 000 GRATUITS/mois !)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Meilleur rapport qualité-prix :** Énorme niveau gratuit ! Utilisez-le avant les niveaux payants.

#### Copilote GitHub

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

### 💰 Fournisseurs bon marché

#### GLM-4.7 (réinitialisation quotidienne, 0,6 $/1 million)

1. Inscrivez-vous : [Zhipu AI](https://open.bigmodel.cn/)
2. Obtenez la clé API du plan de codage
3. Tableau de bord → Ajouter une clé API : Fournisseur : `glm`, Clé API : `your-key`

**Utilisez :** `glm/glm-4.7` — **Conseil de pro :** Le plan de codage offre un quota de 3 × à un coût de 1/7 ! Réinitialisation quotidienne à 10h00.

#### MiniMax M2.1 (réinitialisation de 5 h, 0,20 $/1 M)

1. Inscrivez-vous : [MiniMax](https://www.minimax.io/)
2. Obtenir la clé API → Tableau de bord → Ajouter une clé API

**Utilisez :** `minimax/MiniMax-M2.1` — **Conseil de pro :** Option la moins chère pour un contexte long (1 million de jetons) !

#### Kimi K2 (9$/mois fixe)

1. Abonnez-vous : [Moonshot AI](https://platform.moonshot.ai/)
2. Obtenir la clé API → Tableau de bord → Ajouter une clé API

**Utilisez :** `kimi/kimi-latest` — **Conseil de pro :** Fixe 9 $/mois pour 10 millions de jetons = 0,90 $/1 million de coût effectif !

### 🆓 Fournisseurs GRATUITS

#### iFlow (8 modèles GRATUITS)

```bash
Dashboard → Connect iFlow → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 modèles GRATUITS)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude GRATUIT)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨Combinaisons

### Exemple 1 : Maximiser l'abonnement → Sauvegarde bon marché

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Exemple 2 : Gratuit uniquement (sans coût)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

---

## 🔧 Intégration CLI

### IDE de curseur

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

###Claude Code

Modifier `~/.claude/config.json` :

```json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "your-omniroute-api-key"
}
```

### CLI du Codex

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### OpenClaw

Modifier `~/.openclaw/openclaw.json` :

```json
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

**Ou utilisez le tableau de bord :** Outils CLI → OpenClaw → Configuration automatique

### Cline / Continuer / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 Déploiement

### Déploiement VPS

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

### Docker

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

Pour le mode intégré à l'hôte avec les binaires CLI, consultez la section Docker dans la documentation principale.

### Variables d'environnement

| Variables             | Par défaut                           | Descriptif                                                                     |
| --------------------- | ------------------------------------ | ------------------------------------------------------------------------------ |
| `JWT_SECRET`          | `omniroute-default-secret-change-me` | Secret de signature JWT (**changement de production**)                         |
| `INITIAL_PASSWORD`    | `123456`                             | Mot de passe de première connexion                                             |
| `DATA_DIR`            | `~/.omniroute`                       | Répertoire de données (base de données, utilisation, journaux)                 |
| `PORT`                | cadre par défaut                     | Port de service (`20128` dans les exemples)                                    |
| `HOSTNAME`            | cadre par défaut                     | Lier l'hôte (Docker par défaut est `0.0.0.0`)                                  |
| `NODE_ENV`            | valeur par défaut d'exécution        | Définissez `production` pour le déploiement                                    |
| `BASE_URL`            | `http://localhost:20128`             | URL de base interne côté serveur                                               |
| `CLOUD_URL`           | `https://omniroute.dev`              | URL de base du point de terminaison de synchronisation cloud                   |
| `API_KEY_SECRET`      | `endpoint-proxy-api-key-secret`      | Secret HMAC pour les clés API générées                                         |
| `REQUIRE_API_KEY`     | `false`                              | Appliquer la clé API Bearer sur `/v1/*`                                        |
| `ENABLE_REQUEST_LOGS` | `false`                              | Active les journaux de requêtes/réponses                                       |
| `AUTH_COOKIE_SECURE`  | `false`                              | Forcer le cookie d'authentification `Secure` (derrière le proxy inverse HTTPS) |

Pour la référence complète des variables d'environnement, consultez le [README](../README.md).

---

## 📊 Modèles disponibles

<details>
<summary><b>Voir tous les modèles disponibles</b></summary>

**Code Claude (`cc/`)** — Pro/Max : `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)** — Plus/Pro : `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** — GRATUIT : `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**Copilote GitHub (`gh/`)** : `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** — 0,6 $/1 million : `glm/glm-4.7`

**MiniMax (`minimax/`)** — 0,2 $/1 million : `minimax/MiniMax-M2.1`

**iFlow (`if/`)** — GRATUIT : `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** — GRATUIT : `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** — GRATUIT : `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**Recherche profonde (`ds/`)** : `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)** : `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)** : `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)** : `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Perplexité (`pplx/`)** : `pplx/sonar-pro`, `pplx/sonar`

**Ensemble IA (`together/`)** : `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**IA de feux d'artifice (`fireworks/`)** : `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cérébras (`cerebras/`)** : `cerebras/llama-3.3-70b`

**Cohérer (`cohere/`)** : `cohere/command-r-plus-08-2024`

**NIM NVIDIA (`nvidia/`)** : `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Fonctionnalités avancées

### Modèles personnalisés

Ajoutez n'importe quel ID de modèle à n'importe quel fournisseur sans attendre une mise à jour de l'application :

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

Ou utilisez le tableau de bord : **Fournisseurs → [Fournisseur] → Modèles personnalisés**.

### Itinéraires de fournisseurs dédiés

Acheminez les demandes directement vers un fournisseur spécifique avec validation du modèle :

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

Le préfixe du fournisseur est ajouté automatiquement s'il est manquant. Les modèles incompatibles renvoient `400`.

### Configuration du proxy réseau

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
```

**Précédence :** Spécifique à la clé → Spécifique au combo → Spécifique au fournisseur → Global → Environnement.

### API du catalogue de modèles

```bash
curl http://localhost:20128/api/models/catalog
```

Renvoie les modèles regroupés par fournisseur avec des types (`chat`, `embedding`, `image`).

### Synchronisation avec le cloud

- Synchronisez les fournisseurs, les combos et les paramètres sur tous les appareils
- Synchronisation automatique en arrière-plan avec délai d'attente + échec rapide
- Préférer le côté serveur `BASE_URL`/`CLOUD_URL` en production

### LLM Gateway Intelligence (Phase 9)

- **Cache sémantique** — Met en cache automatiquement les réponses hors streaming, température = 0 (contourner avec `X-OmniRoute-No-Cache: true`)
- **Demande d'idempotence** — Déduplique les requêtes dans les 5 secondes via l'en-tête `Idempotency-Key` ou `X-Request-Id`
- **Suivi des progrès** – Événements SSE `event: progress` opt-in via l'en-tête `X-OmniRoute-Progress: true`

---

### Aire de jeux des traducteurs

Accès via **Tableau de bord → Traducteur**. Déboguez et visualisez comment OmniRoute traduit les requêtes API entre les fournisseurs.

| Mode                   | Objectif                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Aire de jeux**       | Sélectionnez les formats source/cible, collez une requête et voyez instantanément le résultat traduit         |
| **Testeur de chat**    | Envoyez des messages de chat en direct via le proxy et inspectez le cycle complet de demande/réponse          |
| **Banc d'essai**       | Exécutez des tests par lots sur plusieurs combinaisons de formats pour vérifier l'exactitude de la traduction |
| **Moniteur en direct** | Regardez les traductions en temps réel à mesure que les demandes transitent par le proxy                      |

**Cas d'utilisation :**

- Déboguer pourquoi une combinaison client/fournisseur spécifique échoue
- Vérifiez que les balises de réflexion, les appels d'outils et les invites système se traduisent correctement
- Comparez les différences de format entre les formats API OpenAI, Claude, Gemini et Responses

---

### Stratégies de routage

Configurez via **Tableau de bord → Paramètres → Routage**.

| Stratégie                         | Descriptif                                                                                                                   |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Remplir en premier**            | Utilise les comptes par ordre de priorité : le compte principal gère toutes les demandes jusqu'à ce qu'il soit indisponible  |
| **Tournoi à la ronde**            | Parcourt tous les comptes avec une limite persistante configurable (par défaut : 3 appels par compte)                        |
| **P2C (Puissance de deux choix)** | Sélectionne 2 comptes aléatoires et oriente vers le compte le plus sain – équilibre la charge avec la conscience de la santé |
| **Aléatoire**                     | Sélectionne au hasard un compte pour chaque demande à l'aide de Fisher-Yates shuffle                                         |
| **Le moins utilisé**              | Routes vers le compte avec l'horodatage `lastUsedAt` le plus ancien, répartissant le trafic de manière uniforme              |
| **Coût optimisé**                 | Itinéraires vers le compte avec la valeur de priorité la plus faible, optimisation pour les fournisseurs les moins chers     |

#### Alias de modèles génériques

Créez des modèles génériques pour remapper les noms de modèles :

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

Les caractères génériques prennent en charge `*` (n'importe quel caractère) et `?` (un seul caractère).

#### Chaînes de secours

Définissez des chaînes de secours globales qui s'appliquent à toutes les requêtes :

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Résilience et disjoncteurs

Configurez via **Tableau de bord → Paramètres → Résilience**.

OmniRoute met en œuvre la résilience au niveau du fournisseur avec quatre composants :

1. **Profils de fournisseur** — Configuration par fournisseur pour :
   - Seuil de défaillance (combien de défaillances avant ouverture)
   - Durée du temps de recharge
   - Sensibilité de détection de limite de débit
   - Paramètres d'intervalle exponentiel

2. **Limites de débit modifiables** — Paramètres par défaut au niveau du système configurables dans le tableau de bord :
   - **Requêtes par minute (RPM)** — Nombre maximal de requêtes par minute et par compte
   - **Min Time Between Requests** — Écart minimum en millisecondes entre les requêtes
   - **Max Concurrent Requests** — Nombre maximal de requêtes simultanées par compte
   - Cliquez sur **Modifier** pour modifier, puis sur **Enregistrer** ou **Annuler**. Les valeurs persistent via l'API de résilience.

3. **Disjoncteur** — Suit les pannes par fournisseur et ouvre automatiquement le circuit lorsqu'un seuil est atteint :
   - **FERMÉ** (sain) — Les demandes circulent normalement
   - **OPEN** — Le fournisseur est temporairement bloqué après des échecs répétés
   - **HALF_OPEN** — Test si le fournisseur a récupéré

4. **Politiques et identifiants verrouillés** — Affiche l'état du disjoncteur et les identifiants verrouillés avec capacité de déverrouillage forcé.

5. **Détection automatique des limites de débit** — Surveille les en-têtes `429` et `Retry-After` pour éviter de manière proactive d'atteindre les limites de débit du fournisseur.

**Conseil de pro :** Utilisez le bouton **Réinitialiser tout** pour effacer tous les disjoncteurs et les temps de recharge lorsqu'un fournisseur se remet d'une panne.

---

### Exportation/Importation de base de données

Gérez les sauvegardes de base de données dans **Tableau de bord → Paramètres → Système et stockage**.

| Actions                         | Descriptif                                                                                                                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Exporter la base de données** | Télécharge la base de données SQLite actuelle sous forme de fichier `.sqlite`                                                                                                              |
| **Exporter tout (.tar.gz)**     | Télécharge une archive de sauvegarde complète comprenant : base de données, paramètres, combos, connexions du fournisseur (pas d'informations d'identification), métadonnées de la clé API |
| **Importer la base de données** | Téléchargez un fichier `.sqlite` pour remplacer la base de données actuelle. Une sauvegarde de pré-importation est automatiquement créée                                                   |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Validation de l'importation :** Le fichier importé est validé pour son intégrité (vérification pragma SQLite), les tables requises (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) et sa taille (max 100 Mo).

**Cas d'utilisation :**

- Migrer OmniRoute entre machines
- Créer des sauvegardes externes pour la reprise après sinistre
- Partager les configurations entre les membres de l'équipe (exporter tout → partager l'archive)

---

### Tableau de bord des paramètres

La page des paramètres est organisée en 5 onglets pour une navigation facile :

| Onglet         | Contenu                                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Sécurité**   | Paramètres de connexion/mot de passe, contrôle d'accès IP, authentification API pour `/models` et blocage du fournisseur |
| **Routage**    | Stratégie de routage globale (6 options), alias de modèle générique, chaînes de secours, valeurs par défaut combinées    |
| **Résilience** | Profils de fournisseurs, limites de débit modifiables, état du disjoncteur, politiques et identifiants verrouillés       |
| **IA**         | Configuration du budget de réflexion, injection d'invite du système global, statistiques de cache d'invite               |
| **Avancé**     | Configuration globale du proxy (HTTP/SOCKS5)                                                                             |

---

### Gestion des coûts et du budget

Accès via **Tableau de bord → Coûts**.

| Onglet     | Objectif                                                                                                               |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Budget** | Fixez des limites de dépenses par clé API avec des budgets quotidiens/hebdomadaires/mensuels et un suivi en temps réel |
| **Tarif**  | Afficher et modifier les entrées de tarification du modèle — coût par 1 000 jetons d'entrée/sortie par fournisseur     |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Suivi des coûts :** Chaque demande enregistre l'utilisation du jeton et calcule le coût à l'aide du tableau de tarification. Affichez les répartitions dans **Tableau de bord → Utilisation** par fournisseur, modèle et clé API.

---

### Transcription audio

OmniRoute prend en charge la transcription audio via le point de terminaison compatible OpenAI :

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@audio.mp3" \
  -F "model=deepgram/nova-3"
```

Fournisseurs disponibles : **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

Formats audio pris en charge : `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

### Stratégies d'équilibrage des combos

Configurez l'équilibrage par combo dans **Tableau de bord → Combos → Créer/Modifier → Stratégie**.

| Stratégie              | Descriptif                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| **Robin à la ronde**   | Tourne à travers les modèles de manière séquentielle                                            |
| **Priorité**           | Essaie toujours le premier modèle ; se rabat uniquement sur l'erreur                            |
| **Aléatoire**          | Sélectionne un modèle aléatoire dans le combo pour chaque demande                               |
| **Pondéré**            | Itinéraires proportionnellement basés sur les poids attribués par modèle                        |
| **Les moins utilisés** | Itinéraires vers le modèle avec le moins de requêtes récentes (utilise des métriques combinées) |
| **Coût optimisé**      | Itinéraires vers le modèle disponible le moins cher (utilise le tableau de prix)                |

Les valeurs par défaut des combos globaux peuvent être définies dans **Tableau de bord → Paramètres → Routage → Paramètres par défaut des combos**.

---

### Tableau de bord de santé

Accès via **Tableau de bord → Santé**. Aperçu de l'état du système en temps réel avec 6 cartes :

| Carte                     | Ce que cela montre                                                          |
| ------------------------- | --------------------------------------------------------------------------- |
| **État du système**       | Disponibilité, version, utilisation de la mémoire, répertoire de données    |
| **Santé du fournisseur**  | État du disjoncteur par fournisseur (Fermé/Ouvert/Semi-ouvert)              |
| **Limites de taux**       | Temps de recharge de la limite de débit actif par compte avec temps restant |
| **Verrouillages actifs**  | Fournisseurs temporairement bloqués par la politique de verrouillage        |
| **Cache de signatures**   | Statistiques du cache de déduplication (clés actives, taux de réussite)     |
| **Télémétrie de latence** | Agrégation de latence p50/p95/p99 par fournisseur                           |

**Conseil de pro :** La page Santé s'actualise automatiquement toutes les 10 secondes. Utilisez la carte disjoncteur pour identifier les fournisseurs qui rencontrent des problèmes.
