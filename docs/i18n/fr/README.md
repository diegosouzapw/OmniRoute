<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute — La Passerelle IA Gratuite

### N'arrêtez jamais de coder. Routage intelligent vers des **modèles IA GRATUITS et économiques** avec fallback automatique.

_Votre proxy API universel — un endpoint, 36+ fournisseurs, zéro temps d'arrêt._

**Chat Completions • Embeddings • Génération d'images • Audio • Reranking • 100% TypeScript**

---

### 🆕 Nouveautés dans v2.7.0

- **RouterStrategy extensible** — stratégies de règles, coût et latence
- **Détection d'intention multilingue** — scoring de routage en 30+ langues
- **Déduplication des requêtes** — évite les appels dupliqués via hash de contenu
- **Nouveaux fournisseurs :** Grok-4 Fast (xAI), GLM-5 / Z.AI, MiniMax M2.5, Kimi K2.5
- **Tarifs mis à jour :** Grok-4 Fast $0.20/$0.50/M, GLM-5 $0.50/M, MiniMax M2.5 $0.30/M

---

### 🚀 New in v2.0.9+ — Playground, CLI Fingerprints & ACP

| Feature                                    | What It Does                                                                                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Playground**                    | Dashboard page to test any model directly — provider/model/endpoint selectors, Monaco Editor, streaming, abort, timing                        |
| 🔏 **CLI Fingerprint Matching**            | Per-provider header/body ordering to match native CLI signatures — toggle per provider in Settings > Security. **Your proxy IP is preserved** |
| 🤝 **ACP Support (Agent Client Protocol)** | CLI agent discovery (Codex, Claude, Goose, Gemini CLI, OpenClaw), process spawner, `/api/acp/agents` endpoint                                 |
| 🤖 **ACP Agents Dashboard**                | Debug > Agents page — grid of 14 agents with install status, version, custom agent form for any CLI tool                                      |
| 🔧 **Custom Model `apiFormat` Routing**    | Custom models with `apiFormat: "responses"` now correctly route to the Responses API translator                                               |
| 🏢 **Codex Workspace Isolation**           | Multiple Codex workspaces per email — OAuth correctly separates connections by workspace ID                                                   |
| 🔄 **Electron Auto-Update**                | Desktop app checks for updates + auto-install on restart                                                                                      |

### 🤖 Fournisseur IA gratuit pour vos agents de programmation préférés

_Connectez n'importe quel IDE ou outil CLI alimenté par l'IA via OmniRoute — passerelle API gratuite pour un codage illimité._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/cline/cline">
          <img src="./public/providers/openclaw.png" alt="OpenClaw" width="48"/><br/>
          <b>OpenClaw</b>
        </a><br/>
        <sub>⭐ 205K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/HKUDS/nanobot">
          <img src="./public/providers/nanobot.png" alt="NanoBot" width="48"/><br/>
          <b>NanoBot</b>
        </a><br/>
        <sub>⭐ 20.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/sipeed/picoclaw">
          <img src="./public/providers/picoclaw.jpg" alt="PicoClaw" width="48"/><br/>
          <b>PicoClaw</b>
        </a><br/>
        <sub>⭐ 14.6K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/zeroclaw-labs/zeroclaw">
          <img src="./public/providers/zeroclaw.png" alt="ZeroClaw" width="48"/><br/>
          <b>ZeroClaw</b>
        </a><br/>
        <sub>⭐ 9.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/nearai/ironclaw">
          <img src="./public/providers/ironclaw.png" alt="IronClaw" width="48"/><br/>
          <b>IronClaw</b>
        </a><br/>
        <sub>⭐ 2.1K</sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/anomalyco/opencode">
          <img src="./public/providers/opencode.svg" alt="OpenCode" width="48"/><br/>
          <b>OpenCode</b>
        </a><br/>
        <sub>⭐ 106K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/openai/codex">
          <img src="./public/providers/codex.png" alt="Codex CLI" width="48"/><br/>
          <b>Codex CLI</b>
        </a><br/>
        <sub>⭐ 60.8K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/anthropics/claude-code">
          <img src="./public/providers/claude.png" alt="Claude Code" width="48"/><br/>
          <b>Claude Code</b>
        </a><br/>
        <sub>⭐ 67.3K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/google-gemini/gemini-cli">
          <img src="./public/providers/gemini-cli.png" alt="Gemini CLI" width="48"/><br/>
          <b>Gemini CLI</b>
        </a><br/>
        <sub>⭐ 94.7K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/Kilo-Org/kilocode">
          <img src="./public/providers/kilocode.png" alt="Kilo Code" width="48"/><br/>
          <b>Kilo Code</b>
        </a><br/>
        <sub>⭐ 15.5K</sub>
      </td>
    </tr>
  </table>

<sub>📡 Tous les agents se connectent via <code>http://localhost:20128/v1</code> ou <code>http://cloud.omniroute.online/v1</code> — une configuration, modèles et quota illimités</sub>

---

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Site web](https://omniroute.online) • [🚀 Démarrage rapide](#-démarrage-rapide) • [💡 Fonctionnalités](#-fonctionnalités-principales) • [📖 Docs](#-documentation) • [💰 Tarifs](#-aperçu-des-tarifs)

🌐 **Disponible en :** 🇺🇸 [English](../../README.md) | 🇧🇷 [Português (Brasil)](../pt-BR/README.md) | 🇪🇸 [Español](../es/README.md) | 🇫🇷 [Français](../fr/README.md) | 🇮🇹 [Italiano](../it/README.md) | 🇷🇺 [Русский](../ru/README.md) | 🇨🇳 [中文 (简体)](../zh-CN/README.md) | 🇩🇪 [Deutsch](../de/README.md) | 🇮🇳 [हिन्दी](../in/README.md) | 🇹🇭 [ไทย](../th/README.md) | 🇺🇦 [Українська](../uk-UA/README.md) | 🇸🇦 [العربية](../ar/README.md) | 🇯🇵 [日本語](../ja/README.md) | 🇻🇳 [Tiếng Việt](../vi/README.md) | 🇧🇬 [Български](../bg/README.md) | 🇩🇰 [Dansk](../da/README.md) | 🇫🇮 [Suomi](../fi/README.md) | 🇮🇱 [עברית](../he/README.md) | 🇭🇺 [Magyar](../hu/README.md) | 🇮🇩 [Bahasa Indonesia](../id/README.md) | 🇰🇷 [한국어](../ko/README.md) | 🇲🇾 [Bahasa Melayu](../ms/README.md) | 🇳🇱 [Nederlands](../nl/README.md) | 🇳🇴 [Norsk](../no/README.md) | 🇵🇹 [Português (Portugal)](../pt/README.md) | 🇷🇴 [Română](../ro/README.md) | 🇵🇱 [Polski](../pl/README.md) | 🇸🇰 [Slovenčina](../sk/README.md) | 🇸🇪 [Svenska](../sv/README.md) | 🇵🇭 [Filipino](../phi/README.md)

</div>

---

## 🖼️

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute" width="800"/>
</div>

---

## 📸

<details>
<summary><b>...</b></summary>

| #     | #                                        |
| ----- | ---------------------------------------- |
| **1** | ![1](docs/screenshots/01-providers.png)  |
| **2** | ![2](docs/screenshots/02-combos.png)     |
| **3** | ![3](docs/screenshots/03-analytics.png)  |
| **4** | ![4](docs/screenshots/04-health.png)     |
| **5** | ![5](docs/screenshots/05-translator.png) |
| **6** | ![6](docs/screenshots/06-settings.png)   |
| **7** | ![7](docs/screenshots/07-cli-tools.png)  |
| **8** | ![8](docs/screenshots/08-usage.png)      |
| **9** | ![9](docs/screenshots/09-endpoint.png)   |

</details>

---

## 🤔 Pourquoi OmniRoute ?

**Arrêtez de gaspiller de l'argent et de vous heurter aux limites :**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Le quota d'abonnement expire inutilisé chaque mois
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Les limites de débit vous arrêtent en plein codage
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> APIs coûteuses (20-50 $/mois par fournisseur)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Changement manuel entre fournisseurs

**OmniRoute résout ces problèmes :**

- ✅ **Maximisez les abonnements** — Suivez les quotas, utilisez chaque bit avant la réinitialisation
- ✅ **Fallback automatique** — Abonnement → Clé API → Économique → Gratuit, zéro temps d'arrêt
- ✅ **Multi-comptes** — Round-robin entre les comptes par fournisseur
- ✅ **Universel** — Fonctionne avec Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, tout outil CLI

---

## 📧 Support

> 💬 **Rejoignez notre communauté !** [Groupe WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Obtenez de l'aide, partagez des astuces et restez informé.

- **Site web** : [omniroute.online](https://omniroute.online)
- **GitHub** : [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Issues** : [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp** : [Groupe communautaire](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Projet original** : [9router par decolua](https://github.com/decolua/9router)

---

## 🔄 Comment ça fonctionne

```
┌─────────────┐
│  Votre CLI  │  (Claude Code, Codex, Gemini CLI, OpenClaw, Cursor, Cline...)
│   Tool      │
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────┐
│        OmniRoute (Routeur intelligent)   │
│  • Traduction de format (OpenAI ↔ Claude) │
│  • Suivi des quotas + Embeddings + Images │
│  • Renouvellement automatique des tokens   │
└──────┬──────────────────────────────────┘
       │
       ├─→ [Tier 1: ABONNEMENT] Claude Code, Codex, Gemini CLI
       │   ↓ quota épuisé
       ├─→ [Tier 2: CLÉ API] DeepSeek, Groq, xAI, Mistral, NVIDIA NIM, etc.
       │   ↓ limite de budget
       ├─→ [Tier 3: ÉCONOMIQUE] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ limite de budget
       └─→ [Tier 4: GRATUIT] iFlow, Qwen, Kiro (illimité)

Résultat : Ne jamais arrêter de coder, coût minimal
```

---

## 🎯 Ce qu'OmniRoute résout : 30 problèmes réels et cas d'utilisation

> **Tous les développeurs utilisant des outils d'IA sont confrontés quotidiennement à ces problèmes.** OmniRoute a été conçu pour tous les résoudre : des dépassements de coûts aux blocages régionaux, des flux OAuth interrompus aux opérations de protocole et à l'observabilité de l'entreprise.

<details>
<summary><b>💸 1. "Je paie un abonnement coûteux mais je suis quand même interrompu par des limites" </b></summary>

Les développeurs paient entre 20 et 200 $/mois pour Claude Pro, Codex Pro ou GitHub Copilot. Même payant, le quota est plafonné : 5 heures d'utilisation, limites hebdomadaires ou limites de tarif à la minute. En cours de session de codage, le fournisseur ne répond plus et le développeur perd en fluidité et en productivité.

**Comment OmniRoute le résout :**

- **Smart 4-Tier Fallback** — Si le quota d'abonnement est épuisé, redirige automatiquement vers la clé API → Pas cher → Gratuit sans intervention manuelle
- **Suivi des quotas en temps réel** — Affiche la consommation de jetons en temps réel avec un compte à rebours réinitialisé (5 h, quotidiennement, hebdomadairement)
- **Support multi-comptes** — Plusieurs comptes par fournisseur avec tourniquet automatique — lorsqu'un compte est épuisé, passe au suivant
- **Combos personnalisés** — Chaînes de secours personnalisables avec 6 stratégies d'équilibrage (remplir en premier, round-robin, P2C, aléatoire, les moins utilisées, optimisées en termes de coûts)
- **Codex Business Quotas** — Surveillance des quotas d'espace de travail Business/Équipe directement dans le tableau de bord

</details>

<details>
<summary><b>🔌 2. "Je dois utiliser plusieurs fournisseurs mais chacun a une API différente" </b></summary>

OpenAI utilise un format, Claude (Anthropic) en utilise un autre, Gemini encore un autre. Si un développeur souhaite tester des modèles de différents fournisseurs ou utiliser un modèle de secours entre eux, il doit reconfigurer les SDK, modifier les points de terminaison et gérer les formats incompatibles. Les fournisseurs personnalisés (FriendLI, NIM) ont des points de terminaison de modèle non standard.

**Comment OmniRoute le résout :**

- **Point de terminaison unifié** : un seul `http://localhost:20128/v1` sert de proxy pour les plus de 36 fournisseurs.
- **Traduction de format** — Automatique et transparente : OpenAI ↔ Claude ↔ Gemini ↔ API Responses
- **Response Sanitization** — Supprime les champs non standard (`x_groq`, `usage_breakdown`, `service_tier`) qui cassent OpenAI SDK v1.83+
- **Role Normalization** — Convertit `developer` → `system` pour les fournisseurs non OpenAI ; `system` → `user` pour GLM/ERNIE
- **Think Tag Extraction** — Extrait les blocs `<think>` de modèles comme DeepSeek R1 dans un `reasoning_content` standardisé.
- **Sortie structurée pour Gemini** — Conversion automatique `json_schema` → `responseMimeType`/`responseSchema`
- **`stream` est par défaut `false`** — S'aligne sur les spécifications OpenAI, évitant ainsi le SSE inattendu dans les SDK Python/Rust/Go

</details>

<details>
<summary><b>🌐 3. "Mon fournisseur d'IA bloque ma région/pays" </b></summary>

Des fournisseurs comme OpenAI/Codex bloquent l’accès depuis certaines régions géographiques. Les utilisateurs obtiennent des erreurs telles que `unsupported_country_region_territory` lors des connexions OAuth et API. Ceci est particulièrement frustrant pour les développeurs des pays en développement.

**Comment OmniRoute le résout :**

- **Configuration proxy à 3 niveaux** — Proxy configurable à 3 niveaux : global (tout le trafic), par fournisseur (un seul fournisseur) et par connexion/clé
- **Badges proxy à code couleur** — Indicateurs visuels : 🟢 proxy global, 🟡 proxy fournisseur, 🔵 proxy de connexion, affichant toujours l'adresse IP
- **Échange de jetons OAuth via proxy** — Le flux OAuth passe également par le proxy, résolvant `unsupported_country_region_territory`
- **Tests de connexion via proxy** — Les tests de connexion utilisent le proxy configuré (plus de contournement direct)
- **Support SOCKS5** — Prise en charge complète du proxy SOCKS5 pour le routage sortant
- **TLS Fingerprint Spoofing** — Empreinte digitale TLS de type navigateur via `wreq-js` pour contourner la détection des robots

</details>

<details>
<summary><b>🆓 4. "Je veux utiliser l'IA pour coder mais je n'ai pas d'argent"</b></summary>

Tout le monde ne peut pas payer entre 20 et 200 $/mois pour des abonnements à l’IA. Les étudiants, les développeurs des pays émergents, les amateurs et les indépendants doivent avoir accès à des modèles de qualité à un coût nul.

**Comment OmniRoute le résout :**

- **Fournisseurs gratuits intégrés** — Prise en charge native des fournisseurs 100 % gratuits : iFlow (8 modèles illimités), Qwen (3 modèles illimités), Kiro (Claude gratuit), Gemini CLI (180 000 /mois gratuits)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **Combos gratuits uniquement** — Chaîne `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = 0 $/mois sans temps d'arrêt
- **Crédits gratuits NVIDIA NIM** — 1 000 crédits gratuits intégrés
- **Stratégie d'optimisation des coûts** — Stratégie de routage qui choisit automatiquement le fournisseur disponible le moins cher

</details>

<details>
<summary><b>🔒 5. "Je dois protéger ma passerelle IA contre les accès non autorisés" </b></summary>

Lors de l'exposition d'une passerelle IA au réseau (LAN, VPS, Docker), toute personne possédant l'adresse peut consommer les jetons/quota du développeur. Sans protection, les API sont vulnérables aux utilisations abusives, aux injections rapides et aux abus.

**Comment OmniRoute le résout :**

- **Gestion des clés API** — Génération, rotation et portée par fournisseur avec une page `/dashboard/api-manager` dédiée
- **Autorisations au niveau du modèle** : restreindre les clés API à des modèles spécifiques (`openai/*`, modèles génériques), avec la bascule Autoriser tout/Restreindre
- **API Endpoint Protection** – exige une clé pour `/v1/models` et bloque des fournisseurs spécifiques de la liste
- **Auth Guard + Protection CSRF** — Toutes les routes du tableau de bord protégées avec le middleware `withAuth` + les jetons CSRF
- **Rate Limiter** — Limitation du débit par IP avec fenêtres configurables
- **Filtrage IP** – Liste autorisée/liste de blocage pour le contrôle d'accès
- **Prompt Injection Guard** — Nettoyage contre les modèles d'invite malveillants
- **Chiffrement AES-256-GCM** — Informations d'identification chiffrées au repos

</details>

<details>
<summary><b>🛑 6. "Mon fournisseur est tombé en panne et j'ai perdu mon flux de codage"</b></summary>

Les fournisseurs d’IA peuvent devenir instables, renvoyer des erreurs 5xx ou atteindre des limites de débit temporaires. Si un développeur dépend d'un seul fournisseur, il est interrompu. Sans disjoncteurs, des tentatives répétées peuvent faire planter l’application.

**Comment OmniRoute le résout :**

- **Disjoncteur par fournisseur** — Ouverture/fermeture automatique avec seuils et temps de recharge configurables (Fermé/Ouvert/Semi-ouvert)
- **Exponential Backoff** — Délais progressifs entre les tentatives
- **Anti-Thundering Herd** — Protection mutex + sémaphore contre les tempêtes de nouvelles tentatives simultanées
- **Chaînes de secours combinées** — Si le fournisseur principal échoue, passe automatiquement à travers la chaîne sans intervention
- **Combo Circuit Breaker** – Désactive automatiquement les fournisseurs défaillants au sein d'une chaîne combo
- **Tableau de bord de santé** — Surveillance de la disponibilité, états des disjoncteurs, verrouillages, statistiques du cache, latence p50/p95/p99

</details>

<details>
<summary><b>🔧 7. "La configuration de chaque outil d'IA est fastidieuse et répétitive"</b></summary>

Les développeurs utilisent Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Chaque outil nécessite une configuration différente (point de terminaison API, clé, modèle). La reconfiguration lors du changement de fournisseur ou de modèle est une perte de temps.

**Comment OmniRoute le résout :**

- **CLI Tools Dashboard** — Page dédiée avec configuration en un clic pour Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** — Génère `chatLanguageModels.json` pour VS Code avec sélection groupée de modèles
- **Assistant d'intégration** — Configuration guidée en 4 étapes pour les nouveaux utilisateurs
- **Un point de terminaison, tous les modèles** – Configurez `http://localhost:20128/v1` une fois, accédez à plus de 36 fournisseurs

</details>

<details>
<summary><b>🔑 8. "Gérer les jetons OAuth de plusieurs fournisseurs est un enfer"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot — tous utilisent OAuth 2.0 avec des jetons expirant. Les développeurs doivent se réauthentifier constamment, gérer `client_secret is missing`, `redirect_uri_mismatch` et les pannes sur les serveurs distants. OAuth sur LAN/VPS est particulièrement problématique.

**Comment OmniRoute le résout :**

- **Actualisation automatique des jetons** : les jetons OAuth sont actualisés en arrière-plan avant leur expiration.
- **OAuth 2.0 (PKCE) intégré** — Flux automatique pour Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **Multi-Account OAuth** — Plusieurs comptes par fournisseur via l'extraction de jetons JWT/ID
- **OAuth LAN/Remote Fix** — Détection IP privée pour `redirect_uri` + mode URL manuel pour les serveurs distants
- **OAuth derrière Nginx** — Utilise `window.location.origin` pour la compatibilité du proxy inverse
- **Guide OAuth à distance** — Guide étape par étape pour les informations d'identification Google Cloud sur VPS/Docker

</details>

<details>
<summary><b>📊 9. "Je ne sais pas combien je dépense ni où" </b></summary>

Les développeurs utilisent plusieurs fournisseurs payants mais n'ont pas de vue unifiée des dépenses. Chaque fournisseur dispose de son propre tableau de bord de facturation, mais il n'existe pas de vue consolidée. Les coûts inattendus peuvent s’accumuler.

**Comment OmniRoute le résout :**

- **Cost Analytics Dashboard** — Suivi des coûts par jeton et gestion du budget par fournisseur
- **Limites budgétaires par niveau** — Plafond de dépenses par niveau qui déclenche un repli automatique
- **Configuration de tarification par modèle** — Prix configurables par modèle
- **Statistiques d'utilisation par clé API** — Nombre de demandes et horodatage de la dernière utilisation par clé
- **Tableau de bord Analytics** — Cartes statistiques, tableau d'utilisation du modèle, tableau des fournisseurs avec taux de réussite et latence

</details>

<details>
<summary><b>🐛 10. "Je ne peux pas diagnostiquer les erreurs et les problèmes dans les appels IA" </b></summary>

Lorsqu'un appel échoue, le développeur ne sait pas s'il s'agit d'une limite de débit, d'un jeton expiré, d'un format incorrect ou d'une erreur du fournisseur. Journaux fragmentés sur différents terminaux. Sans observabilité, le débogage est un essai et une erreur.

**Comment OmniRoute le résout :**

- **Tableau de bord des journaux unifiés** — 4 onglets : journaux de requêtes, journaux proxy, journaux d'audit, console
- **Console Log Viewer** — Visualiseur de style terminal en temps réel avec niveaux de code couleur, défilement automatique, recherche, filtre
- **Journaux du proxy SQLite** — Journaux persistants qui survivent aux redémarrages du serveur
- **Translator Playground** — 4 modes de débogage : Playground (traduction de format), Chat Tester (aller-retour), Test Bench (batch), Live Monitor (temps réel)
- **Demande de télémétrie** — latence p50/p95/p99 + traçage X-Request-Id
- **Journalisation basée sur des fichiers avec rotation** — L'intercepteur de console capture tout dans le journal JSON avec une rotation basée sur la taille

</details>

<details>
<summary><b>🏗️ 11. "Le déploiement et la maintenance de la passerelle sont complexes"</b></summary>

L'installation, la configuration et la maintenance d'un proxy IA dans différents environnements (local, VPS, Docker, cloud) demandent beaucoup de main-d'œuvre. Des problèmes tels que les chemins codés en dur, `EACCES` sur les répertoires, les conflits de ports et les versions multiplateformes ajoutent des frictions.

**Comment OmniRoute le résout :**

- **Installation globale npm** — `npm install -g omniroute && omniroute` — terminée
- **Docker Multi-Platform** — AMD64 + ARM64 natif (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Profils Docker Compose** — `base` (pas d'outils CLI) et `cli` (avec Claude Code, Codex, OpenClaw)
- **Electron Desktop App** — Application native pour Windows/macOS/Linux avec barre d'état système, démarrage automatique et mode hors ligne
- **Mode Split-Port** — API et tableau de bord sur des ports séparés pour des scénarios avancés (proxy inverse, réseau de conteneurs)
- **Cloud Sync** – Configurez la synchronisation entre les appareils via Cloudflare Workers
- **Sauvegardes DB** — Sauvegarde, restauration, exportation et importation automatiques de tous les paramètres

</details>

<details>
<summary><b>🌍 12. "L'interface est uniquement en anglais et mon équipe ne parle pas anglais" </b></summary>

Les équipes des pays non anglophones, notamment en Amérique latine, en Asie et en Europe, ont du mal à utiliser des interfaces uniquement en anglais. Les barrières linguistiques réduisent l’adoption et augmentent les erreurs de configuration.

**Comment OmniRoute le résout :**

- **Tableau de bord i18n — 30 langues** — Plus de 500 touches traduites, dont arabe, bulgare, danois, allemand, espagnol, finnois, français, hébreu, hindi, hongrois, indonésien, italien, japonais, coréen, malais, néerlandais, norvégien, polonais, portugais (PT/BR), roumain, russe, slovaque, suédois, thaï, ukrainien, vietnamien, chinois, philippin, anglais.
- **Support RTL** — Prise en charge de droite à gauche pour l'arabe et l'hébreu
- ** README multilingues ** — 30 traductions complètes de la documentation
- **Sélecteur de langue** — Icône de globe dans l'en-tête pour une commutation en temps réel

</details>

<details>
<summary><b>🔄 13. "J'ai besoin de plus que du chat : j'ai besoin d'intégrations, d'images, d'audio" </b></summary>

L'IA ne se limite pas à la réalisation de discussions. Les développeurs doivent générer des images, transcrire l'audio, créer des intégrations pour RAG, reclasser les documents et modérer le contenu. Chaque API a un point de terminaison et un format différents.

**Comment OmniRoute le résout :**

- **Embeddings** — `/v1/embeddings` avec 6 fournisseurs et plus de 9 modèles
- **Génération d'images** — `/v1/images/generations` avec 10 fournisseurs et plus de 20 modèles (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Texte vers vidéo** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) et SD WebUI
- **Texte en musique** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Transcription audio** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Text-to-Speech** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, Inworld, Cartesia, PlayHT, + fournisseurs existants
- **Modérations** — `/v1/moderations` — Contrôles de sécurité du contenu
- **Reclassement** — `/v1/rerank` — Reclassement de la pertinence du document
- **API Réponses** — Prise en charge complète de `/v1/responses` pour le Codex

</details>

<details>
<summary><b>🧪 14. "Je n'ai aucun moyen de tester et de comparer la qualité des modèles" </b></summary>

Les développeurs veulent savoir quel modèle convient le mieux à leur cas d'utilisation (code, traduction, raisonnement) mais la comparaison manuelle est lente. Il n’existe aucun outil d’évaluation intégré.

**Comment OmniRoute le résout :**

- **Évaluations LLM** — Tests Golden Set avec 10 cas préchargés couvrant les salutations, les mathématiques, la géographie, la génération de code, la conformité JSON, la traduction, la démarque, le refus de sécurité
- **4 stratégies de correspondance** — `exact`, `contains`, `regex`, `custom` (fonction JS)
- **Banc de test Translator Playground** — Tests par lots avec plusieurs entrées et sorties attendues, comparaison entre fournisseurs
- **Chat Tester** — Aller-retour complet avec rendu de réponse visuelle
- **Live Monitor** — Flux en temps réel de toutes les requêtes transitant par le proxy

</details>

<details>
<summary><b>📈 15. "J'ai besoin d'évoluer sans perdre en performances"</b></summary>

À mesure que le volume de demandes augmente, sans mettre en cache les mêmes questions, cela génère des coûts en double. Sans idempotence, les demandes en double gaspillent le traitement. Les limites tarifaires par fournisseur doivent être respectées.

**Comment OmniRoute le résout :**

- **Cache sémantique** — Le cache à deux niveaux (signature + sémantique) réduit les coûts et la latence
- **Request Idempotency** — Fenêtre de déduplication de 5 s pour des requêtes identiques
- **Détection de limite de débit** — RPM par fournisseur, écart minimum et suivi simultané maximum
- **Limites de débit modifiables** — Valeurs par défaut configurables dans Paramètres → Résilience avec persistance
- **Cache de validation de clé API** — Cache à 3 niveaux pour les performances de production
- **Tableau de bord de santé avec télémétrie** — latence p50/p95/p99, statistiques de cache, disponibilité

</details>

<details>
<summary><b>🤖 16. "Je souhaite contrôler le comportement du modèle à l'échelle mondiale" </b></summary>

Les développeurs qui souhaitent que toutes les réponses soient dans une langue spécifique, avec un ton spécifique, ou qui souhaitent limiter les jetons de raisonnement. Configurer cela dans chaque outil/demande n’est pas pratique.

**Comment OmniRoute le résout :**

- **Injection d'invite système** — Invite globale appliquée à toutes les requêtes
- **Thinking Budget Validation** — Contrôle d'allocation de jetons de raisonnement par requête (passthrough, automatique, personnalisé, adaptatif)
- **6 Stratégies de routage** – Stratégies globales qui déterminent la façon dont les demandes sont distribuées
- **Wildcard Router** — Les modèles `provider/*` sont acheminés dynamiquement vers n'importe quel fournisseur.
- **Combo Enable/Disable Toggle** — Basculez les combos directement depuis le tableau de bord
- **Provider Toggle** — Activer/désactiver toutes les connexions pour un fournisseur en un seul clic
- **Fournisseurs bloqués** — Exclure des fournisseurs spécifiques de la liste `/v1/models`

</details>

<details>
<summary><b>🧰 17. "J'ai besoin d'outils MCP en tant que fonctionnalités de produit de première classe" </b></summary>

De nombreuses passerelles IA exposent MCP uniquement en tant que détail d'implémentation caché. Les équipes ont besoin d’une couche opérationnelle visible et gérable.

**Comment OmniRoute le résout :**

- MCP apparaît dans l'onglet de navigation du tableau de bord et de protocole de point de terminaison
- Page de gestion MCP dédiée avec processus, outils, portées et audit
- Démarrage rapide intégré pour `omniroute --mcp` et intégration du client

</details>

<details>
<summary><b>🧠 18. "J'ai besoin d'une orchestration A2A avec des chemins de tâches de synchronisation + flux" </b></summary>

Les flux de travail des agents nécessitent à la fois des réponses directes et une exécution en continu de longue durée avec contrôle du cycle de vie.

**Comment OmniRoute le résout :**

- Point de terminaison A2A JSON-RPC (`POST /a2a`) avec `message/send` et `message/stream`
- Streaming SSE avec propagation de l'état terminal
- API de cycle de vie des tâches pour `tasks/get` et `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. "J'ai besoin d'un véritable état de santé du processus MCP, et non d'un état deviné" </b></summary>

Les équipes opérationnelles doivent savoir si MCP est réellement actif, et pas seulement si une API est accessible.

**Comment OmniRoute le résout :**

- Fichier de battement de cœur d'exécution avec PID, horodatages, transport, nombre d'outils et mode de portée
- API de statut MCP combinant battement de coeur + activité récente
- Cartes d'état de l'interface utilisateur pour la fraîcheur des processus/disponibilité/battement de cœur

</details>

<details>
<summary><b>📋 20. "J'ai besoin d'une exécution vérifiable de l'outil MCP" </b></summary>

Lorsque les outils modifient la configuration ou déclenchent des actions opérationnelles, les équipes ont besoin d'une traçabilité médico-légale.

**Comment OmniRoute le résout :**

- Journalisation d'audit basée sur SQLite pour les appels d'outils MCP
- Filtres par outil, succès/échec, clé API et pagination
- Tableau d'audit du tableau de bord + points de terminaison de statistiques pour l'automatisation

</details>

<details>
<summary><b>🔐 21. "J'ai besoin d'autorisations MCP limitées par intégration" </b></summary>

Différents clients doivent avoir le moindre privilège d’accès aux catégories d’outils.

**Comment OmniRoute le résout :**

- 9 étendues MCP granulaires pour un accès contrôlé aux outils
- Application de la portée et visibilité dans l'interface utilisateur de gestion MCP
- Posture par défaut sûre pour les outils opérationnels

</details>

<details>
<summary><b>⚙️ 22. "J'ai besoin de contrôles opérationnels sans redéploiement"</b></summary>

Les équipes ont besoin de changements d'exécution rapides lors d'incidents ou d'événements de coûts.

**Comment OmniRoute le résout :**

- Activer le combo de commutation directement depuis le tableau de bord MCP
- Appliquer des profils de résilience à partir de packs de politiques prédéfinis
- Réinitialiser l'état du disjoncteur à partir du même panneau de commande

</details>

<details>
<summary><b>🔄 23. "J'ai besoin d'une visibilité et d'une annulation en direct du cycle de vie des tâches A2A" </b></summary>

Sans visibilité sur le cycle de vie, les incidents de tâches deviennent difficiles à trier.

**Comment OmniRoute le résout :**

- Liste des tâches/filtrage par état/compétence avec pagination
- Analyse approfondie des métadonnées, des événements et des artefacts des tâches
- Point de terminaison d'annulation de tâche et action de l'interface utilisateur avec confirmation

</details>

<details>
<summary><b>🌊 24. "J'ai besoin de métriques de flux actif pour la charge A2A" </b></summary>

Les flux de travail de streaming nécessitent une vision opérationnelle de la concurrence et des connexions en direct.

**Comment OmniRoute le résout :**

- Compteurs de flux actifs intégrés au statut A2A
- Horodatage de la dernière tâche et nombre par état
- Cartes de tableau de bord A2A pour la surveillance des opérations en temps réel

</details>

<details>
<summary><b>🪪 25. "J'ai besoin d'une découverte d'agent standard pour les clients" </b></summary>

Les clients et orchestrateurs externes ont besoin de métadonnées lisibles par machine pour l'intégration.

**Comment OmniRoute le résout :**

- Carte d'agent exposée à `/.well-known/agent.json`
- Capacités et compétences affichées dans l'interface utilisateur de gestion
- L'API de statut A2A inclut des métadonnées de découverte pour l'automatisation

</details>

<details>
<summary><b>🧭 26. "J'ai besoin de la possibilité de découvrir le protocole dans le produit UX"</b></summary>

Si les utilisateurs ne peuvent pas découvrir les surfaces de protocole, l’adoption et la qualité du support chutent.

**Comment OmniRoute le résout :**

- Entrées de la barre latérale pour MCP et A2A
- Onglet Protocoles de la page du point de terminaison avec démarrage rapide et état
- Liens depuis l'aperçu vers les tableaux de bord de gestion dédiés

</details>

<details>
<summary><b>🧪 27. "J'ai besoin d'une validation de protocole de bout en bout avec de vrais clients"</b></summary>

Les tests simulés ne suffisent pas pour valider la compatibilité des protocoles avant la publication.

**Comment OmniRoute le résout :**

- Suite E2E qui démarre l'application et utilise un véritable transport client MCP SDK
- Tests client A2A pour les flux de découverte, d'envoi, de streaming, d'obtention et d'annulation
- Vérifier les assertions par rapport aux API d'audit MCP et de tâches A2A

</details>

<details>
<summary><b>📡 28. "J'ai besoin d'une observabilité unifiée sur toutes les interfaces"</b></summary>

Le fractionnement de l'observabilité par protocole crée des angles morts et un MTTR plus long.

**Comment OmniRoute le résout :**

- Tableaux de bord/journaux/analyses unifiés dans un seul produit
- Santé + audit + télémétrie des demandes sur les couches OpenAI, MCP et A2A
- API opérationnelles pour le statut et l'automatisation

</details>

<details>
<summary><b>💼 29. "J'ai besoin d'un environnement d'exécution pour l'orchestration proxy + outils + agent" </b></summary>

L’exécution de nombreux services distincts augmente les coûts opérationnels et les modes de défaillance.

**Comment OmniRoute le résout :**

- Proxy compatible OpenAI, serveur MCP et serveur A2A dans une seule pile
- Authentification partagée, résilience, stockage de données et observabilité
- Modèle de politique cohérent sur toutes les surfaces d'interaction

</details>

<details>
<summary><b>🚀 30. "Je dois expédier des flux de travail agentiques sans prolifération de codes adhésifs" </b></summary>

Les équipes perdent de la vitesse lors de l’assemblage de plusieurs services et scripts ad hoc.

**Comment OmniRoute le résout :**

- Stratégie de point de terminaison unifiée pour les clients et les agents
- Interfaces utilisateur de gestion de protocole intégrées et chemins de validation de fumée
- Bases prêtes pour la production (sécurité, journalisation, résilience, sauvegarde)

</details>

### Exemples de playbooks (cas d'utilisation intégrés)

**Playbook A : Maximisez l'abonnement payant + sauvegarde bon marché**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Playbook B : pile de codage à coût nul**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Playbook C : chaîne de secours toujours active 24h/24 et 7j/7**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Playbook D : Opérations d'agent avec MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ Démarrage rapide

**1. Installer globalement :**

```bash
npm install -g omniroute
omniroute
```

🎉 Le tableau de bord s'ouvre sur `http://localhost:20128`

| Commande                | Description                                 |
| ----------------------- | ------------------------------------------- |
| `omniroute`             | Démarrer le serveur (port par défaut 20128) |
| `omniroute --port 3000` | Utiliser un port personnalisé               |
| `omniroute --no-open`   | Ne pas ouvrir le navigateur automatiquement |
| `omniroute --help`      | Afficher l'aide                             |

**2. Connecter un fournisseur GRATUIT :**

Tableau de bord → Fournisseurs → Connecter **Claude Code** ou **Antigravity** → Connexion OAuth → Terminé !

**3. Utiliser dans votre outil CLI :**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Paramètres :
  Endpoint : http://localhost:20128/v1
  API Key : [copier depuis le tableau de bord]
  Model : if/kimi-k2-thinking
```

**C'est tout !** Commencez à coder avec des modèles IA GRATUITS.

**Alternative — exécuter depuis le code source :**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

---

## 🐳 Docker

OmniRoute est disponible en tant qu'image Docker publique sur [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

**Démarrage rapide :**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Avec fichier d'environnement :**

```bash
# Copier et modifier le .env d'abord
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Avec Docker Compose :**

```bash
# Profil de base (sans outils CLI)
docker compose --profile base up -d

# Profil CLI (Claude Code, Codex, OpenClaw intégrés)
docker compose --profile cli up -d
```

| Image                    | Tag      | Taille | Description             |
| ------------------------ | -------- | ------ | ----------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Dernière version stable |
| `diegosouzapw/omniroute` | `1.0.6`  | ~250MB | Version actuelle        |

---

---

## 🖥️

> 🆕 **NOUVEAU !** OmniRoute est maintenant disponible en tant qu'**application de bureau native** pour Windows, macOS et Linux.

Exécutez OmniRoute en tant qu'application de bureau autonome — sans terminal, sans navigateur, sans internet requis pour les modèles locaux.

- 🖥️ **Fenêtre Native** — Fenêtre dédiée avec intégration dans la barre d'état système
- 🔄 **Démarrage Automatique** — Lancez OmniRoute à la connexion système
- 🔔 **Notifications Natives** — Alertes pour l'épuisement de quota ou les problèmes
- ⚡ **Installation en Un Clic** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Mode Hors Ligne** — Fonctionne entièrement hors ligne avec serveur intégré

```bash
npm run electron:dev           # Mode développement
npm run electron:build         # Plateforme actuelle
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg)
npm run electron:build:linux   # Linux (.AppImage)
```

📖 Documentation complète : [`electron/README.md`](electron/README.md)

---

## 💰 Aperçu des tarifs

| Tier              | Fournisseur       | Coût                       | Réinitialisation    | Idéal pour                    |
| ----------------- | ----------------- | -------------------------- | ------------------- | ----------------------------- |
| **💳 ABONNEMENT** | Claude Code (Pro) | 20 $/mois                  | 5h + hebdomadaire   | Déjà abonné                   |
|                   | Codex (Plus/Pro)  | 20-200 $/mois              | 5h + hebdomadaire   | Utilisateurs OpenAI           |
|                   | Gemini CLI        | **GRATUIT**                | 180K/mois + 1K/jour | Tout le monde !               |
|                   | GitHub Copilot    | 10-19 $/mois               | Mensuel             | Utilisateurs GitHub           |
| **🔑 CLÉ API**    | NVIDIA NIM        | **GRATUIT** (1000 crédits) | Unique              | Tests gratuits                |
|                   | DeepSeek          | À l'usage                  | Aucune              | Meilleur rapport qualité-prix |
|                   | Groq              | Niveau gratuit + payant    | Limité              | Inférence ultra-rapide        |
|                   | xAI (Grok)        | À l'usage                  | Aucune              | Modèles Grok                  |
|                   | Mistral           | Niveau gratuit + payant    | Limité              | IA européenne                 |
|                   | OpenRouter        | À l'usage                  | Aucune              | 100+ modèles                  |
| **💰 ÉCONOMIQUE** | GLM-4.7           | 0,6 $/1M                   | Quotidien 10h       | Backup économique             |
|                   | MiniMax M2.1      | 0,2 $/1M                   | Rotatif 5h          | Option la moins chère         |
|                   | Kimi K2           | 9 $/mois fixe              | 10M tokens/mois     | Coût prévisible               |
| **🆓 GRATUIT**    | iFlow             | 0 $                        | Illimité            | 8 modèles gratuits            |
|                   | Qwen              | 0 $                        | Illimité            | 3 modèles gratuits            |
|                   | Kiro              | 0 $                        | Illimité            | Claude gratuit                |

**💡 Conseil Pro :** Commencez avec Gemini CLI (180K gratuits/mois) + iFlow (illimité gratuit) = 0 $ de coût !

---

## 💡 Fonctionnalités principales

### 🧠 Routage & Intelligence

| Fonctionnalité                        | Ce qu'elle fait                                                                 |
| ------------------------------------- | ------------------------------------------------------------------------------- |
| 🎯 **Fallback intelligent 4 niveaux** | Auto-routage : Abonnement → Clé API → Économique → Gratuit                      |
| 📊 **Suivi des quotas en temps réel** | Comptage de tokens en direct + compte à rebours de réinitialisation             |
| 🔄 **Traduction de format**           | OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro transparent                            |
| 👥 **Support multi-comptes**          | Plusieurs comptes par fournisseur avec sélection intelligente                   |
| 🔄 **Renouvellement auto des tokens** | Les tokens OAuth se renouvellent automatiquement avec retry                     |
| 🎨 **Combos personnalisés**           | 6 stratégies : fill-first, round-robin, p2c, random, least-used, cost-optimized |
| 🧩 **Modèles personnalisés**          | Ajoutez n'importe quel ID de modèle à n'importe quel fournisseur                |
| 🌐 **Routeur wildcard**               | Routez les patterns `provider/*` vers n'importe quel fournisseur dynamiquement  |
| 🧠 **Budget de raisonnement**         | Modes passthrough, auto, custom et adaptive pour les modèles de raisonnement    |
| 🔀 **Model Aliases**                  | Auto-forward deprecated model IDs to current replacements (built-in + custom)   |
| ⚡ **Background Degradation**         | Auto-route background tasks (titles, summaries) to cheaper models               |
| 💬 **Injection System Prompt**        | System prompt global appliqué à toutes les requêtes                             |
| 📄 **API Responses**                  | Support complet de l'API Responses d'OpenAI (`/v1/responses`) pour Codex        |

### 🎵 APIs multi-modales

| Fonctionnalité             | Ce qu'elle fait                                                                                                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Génération d'images** | `/v1/images/generations` — 4 fournisseurs, 9+ modèles                                                                                                                      |
| 📐 **Embeddings**          | `/v1/embeddings` — 6 fournisseurs, 9+ modèles                                                                                                                              |
| 🎤 **Transcription audio** | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **Texte vers parole**   | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise)                                      |
| 🛡️ **Modérations**         | `/v1/moderations` — vérifications de sécurité                                                                                                                              |
| 🔀 **Reranking**           | `/v1/rerank` — reclassement de pertinence des documents                                                                                                                    |

### 🛡️ Résilience & Sécurité

| Fonctionnalité                  | Ce qu'elle fait                                                                        |
| ------------------------------- | -------------------------------------------------------------------------------------- |
| 🔌 **Circuit Breaker**          | Ouverture/fermeture auto par fournisseur avec seuils configurables                     |
| 🎯 **Endpoint-Aware Models**    | Custom models declare supported endpoints + API format                                 |
| 🛡️ **Anti-Thundering Herd**     | Mutex + sémaphore de rate-limit pour les fournisseurs avec clé API                     |
| 🧠 **Cache sémantique**         | Cache à deux niveaux (signature + sémantique) réduit coût et latence                   |
| ⚡ **Idempotence des requêtes** | Fenêtre de dédup 5s pour les requêtes dupliquées                                       |
| 🔒 **Spoofing TLS Fingerprint** | Contournement de détection de bot via wreq-js                                          |
| 🔏 **CLI Fingerprint Matching** | Matches native CLI request signatures — **reduces ban risk while preserving proxy IP** |
| 🌐 **Filtrage IP**              | Allowlist/blocklist pour le contrôle d'accès API                                       |
| 📊 **Rate limits éditables**    | RPM configurable, intervalle minimum, concurrence max                                  |
| 💾 **Rate Limit Persistence**   | Learned limits survive restarts via SQLite with 60s debounce + 24h staleness           |
| 🔄 **Token Refresh Resilience** | Per-provider circuit breaker (5 fails→30min) + 30s timeout per attempt                 |

### 📊 Observabilité & Analytique

| Fonctionnalité                    | Ce qu'elle fait                                                           |
| --------------------------------- | ------------------------------------------------------------------------- |
| 📝 **Logs de requêtes**           | Mode debug avec logs complets requête/réponse                             |
| 💾 **Logs SQLite**                | Logs proxy persistants survivant aux redémarrages                         |
| 📊 **Tableau de bord analytique** | Recharts : cartes de stats, graphique d'utilisation, tableau fournisseurs |
| 📈 **Suivi de progression**       | Événements SSE de progression opt-in pour le streaming                    |
| 🧪 **Évaluations LLM**            | Tests avec golden set et 4 stratégies de correspondance                   |
| 🔍 **Télémétrie des requêtes**    | Agrégation de latence p50/p95/p99 + traçage X-Request-Id                  |
| 📋 **Logs + Quotas**              | Pages dédiées pour navigation des logs et suivi des quotas                |
| 🏥 **Tableau de bord santé**      | Uptime, états circuit breaker, lockouts, stats cache                      |
| 💰 **Suivi des coûts**            | Gestion de budget + configuration des prix par modèle                     |

### ☁️ Déploiement & Synchronisation

| Fonctionnalité                    | Ce qu'elle fait                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------- |
| 💾 **Cloud Sync**                 | Synchroniser les paramètres entre appareils via Cloudflare Workers              |
| 🌐 **Déployer partout**           | Localhost, VPS, Docker, Cloudflare Workers                                      |
| 🔑 **Gestion des clés API**       | Générer, faire tourner et limiter les clés API par fournisseur                  |
| 🧙 **Assistant de configuration** | Setup guidé en 4 étapes pour les nouveaux utilisateurs                          |
| 🔧 **Tableau de bord CLI Tools**  | Configuration en un clic pour Claude, Codex, Cline, OpenClaw, Kilo, Antigravity |
| 🔄 **Sauvegardes DB**             | Sauvegarde et restauration automatiques de tous les paramètres                  |

<details>
<summary><b>📖 Détails des fonctionnalités</b></summary>

### 🎯 Fallback intelligent 4 niveaux

Créez des combos avec fallback automatique :

```
Combo : "my-coding-stack"
  1. cc/claude-opus-4-6        (votre abonnement)
  2. nvidia/llama-3.3-70b      (API NVIDIA gratuite)
  3. glm/glm-4.7               (backup économique, $0.6/1M)
  4. if/kimi-k2-thinking       (fallback gratuit)

→ Bascule automatiquement lorsque le quota est épuisé ou en cas d'erreurs
```

### 📊 Suivi des quotas en temps réel

- Consommation de tokens par fournisseur
- Compte à rebours de réinitialisation (5 heures, quotidien, hebdomadaire)
- Estimation des coûts pour les niveaux payants
- Rapports de dépenses mensuels

### 🔄 Traduction de format

Traduction transparente entre les formats :

- **OpenAI** ↔ **Claude** ↔ **Gemini** ↔ **OpenAI Responses**
- Votre CLI envoie le format OpenAI → OmniRoute traduit → Le fournisseur reçoit le format natif
- Fonctionne avec tout outil supportant les endpoints OpenAI personnalisés

### 👥 Support multi-comptes

- Ajouter plusieurs comptes par fournisseur
- Round-robin automatique ou routage par priorité
- Basculement vers le compte suivant lorsqu'un quota est atteint

### 🔄 Renouvellement automatique des tokens

- Les tokens OAuth se renouvellent automatiquement avant expiration
- Pas de réauthentification manuelle nécessaire
- Expérience transparente sur tous les fournisseurs

### 🎨 Combos personnalisés

- Créer des combinaisons de modèles illimitées
- 6 stratégies : fill-first, round-robin, power-of-two-choices, random, least-used, cost-optimized
- Partager les combos entre appareils avec Cloud Sync

### 🏥 Tableau de bord santé

- Statut du système (uptime, version, utilisation mémoire)
- États des circuit breakers par fournisseur (Closed/Open/Half-Open)
- Statut des rate limits et lockouts actifs
- Statistiques du cache de signatures
- Télémétrie de latence (p50/p95/p99) + cache de prompt
- Réinitialisation de la santé en un clic

### 🔧 Playground du traducteur

- Déboguer, tester et visualiser les traductions de format d'API
- Envoyer des requêtes et voir comment OmniRoute traduit entre les formats des fournisseurs
- Inestimable pour résoudre les problèmes d'intégration

### 💾 Cloud Sync

- Synchroniser fournisseurs, combos et paramètres entre appareils
- Synchronisation en arrière-plan automatique
- Stockage chiffré sécurisé

</details>

## 🧪 Évaluations (Evals)

OmniRoute inclut un framework d'évaluation intégré pour tester la qualité des réponses LLM contre un golden set. Accès via **Analytics → Evals** dans le tableau de bord.

### Set intégré

Le « OmniRoute Golden Set » préchargé contient 10 cas de test :

- Salutations, mathématiques, géographie, génération de code
- Conformité format JSON, traduction, markdown
- Rejet de sécurité (contenu nocif), comptage, logique booléenne

### Stratégies d'évaluation

| Stratégie  | Description                                                    | Exemple                          |
| ---------- | -------------------------------------------------------------- | -------------------------------- |
| `exact`    | La sortie doit correspondre exactement                         | `"4"`                            |
| `contains` | La sortie doit contenir la sous-chaîne (insensible à la casse) | `"Paris"`                        |
| `regex`    | La sortie doit correspondre au motif regex                     | `"1.*2.*3"`                      |
| `custom`   | Fonction JS personnalisée retourne true/false                  | `(output) => output.length > 10` |

---

## 📖 Guide de configuration

<details>
<summary><b>💳 Fournisseurs par abonnement</b></summary>

### Claude Code (Pro/Max)

```bash
Tableau de bord → Fournisseurs → Connecter Claude Code
→ Connexion OAuth → Renouvellement auto des tokens
→ Suivi de quota 5h + hebdomadaire

Modèles :
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Conseil Pro :** Utilisez Opus pour les tâches complexes, Sonnet pour la vitesse. OmniRoute suit les quotas par modèle !

### OpenAI Codex (Plus/Pro)

```bash
Tableau de bord → Fournisseurs → Connecter Codex
→ Connexion OAuth (port 1455)
→ Reset 5h + hebdomadaire

Modèles :
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

### Gemini CLI (GRATUIT 180K/mois !)

```bash
Tableau de bord → Fournisseurs → Connecter Gemini CLI
→ Google OAuth
→ 180K completions/mois + 1K/jour

Modèles :
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Meilleure valeur :** Niveau gratuit énorme ! Utilisez avant les niveaux payants.

### GitHub Copilot

```bash
Tableau de bord → Fournisseurs → Connecter GitHub
→ OAuth via GitHub
→ Reset mensuel (1er du mois)

Modèles :
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

</details>

<details>
<summary><b>🔑 Fournisseurs par clé API</b></summary>

### NVIDIA NIM (GRATUIT 1000 crédits !)

1. S'inscrire : [build.nvidia.com](https://build.nvidia.com)
2. Obtenir une clé API gratuite (1000 crédits d'inférence inclus)
3. Tableau de bord → Ajouter fournisseur → NVIDIA NIM :
   - API Key : `nvapi-your-key`

**Modèles :** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` et 50+ autres

**Conseil Pro :** API compatible OpenAI — fonctionne parfaitement avec la traduction de format d'OmniRoute !

### DeepSeek

1. S'inscrire : [platform.deepseek.com](https://platform.deepseek.com)
2. Obtenir une clé API
3. Tableau de bord → Ajouter fournisseur → DeepSeek

**Modèles :** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (Niveau gratuit disponible !)

1. S'inscrire : [console.groq.com](https://console.groq.com)
2. Obtenir une clé API (niveau gratuit inclus)
3. Tableau de bord → Ajouter fournisseur → Groq

**Modèles :** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Conseil Pro :** Inférence ultra-rapide — idéal pour le codage en temps réel !

### OpenRouter (100+ modèles)

1. S'inscrire : [openrouter.ai](https://openrouter.ai)
2. Obtenir une clé API
3. Tableau de bord → Ajouter fournisseur → OpenRouter

**Modèles :** Accès à 100+ modèles de tous les grands fournisseurs via une seule clé API.

</details>

<details>
<summary><b>💰 Fournisseurs économiques (Backup)</b></summary>

### GLM-4.7 (Reset quotidien, $0.6/1M)

1. S'inscrire : [Zhipu AI](https://open.bigmodel.cn/)
2. Obtenir une clé API du Coding Plan
3. Tableau de bord → Ajouter clé API :
   - Fournisseur : `glm`
   - API Key : `your-key`

**Utilisez :** `glm/glm-4.7`

**Conseil Pro :** Le Coding Plan offre 3× le quota à 1/7 du coût ! Reset quotidien à 10h.

### MiniMax M2.1 (Reset 5h, $0.20/1M)

1. S'inscrire : [MiniMax](https://www.minimax.io/)
2. Obtenir une clé API
3. Tableau de bord → Ajouter clé API

**Utilisez :** `minimax/MiniMax-M2.1`

**Conseil Pro :** L'option la moins chère pour le contexte long (1M tokens) !

### Kimi K2 (9 $/mois fixe)

1. S'abonner : [Moonshot AI](https://platform.moonshot.ai/)
2. Obtenir une clé API
3. Tableau de bord → Ajouter clé API

**Utilisez :** `kimi/kimi-latest`

**Conseil Pro :** 9 $/mois fixe pour 10M tokens = 0,90 $/1M de coût effectif !

</details>

<details>
<summary><b>🆓 Fournisseurs GRATUITS (Backup d'urgence)</b></summary>

### iFlow (8 modèles GRATUITS)

```bash
Tableau de bord → Connecter iFlow
→ Connexion OAuth iFlow
→ Utilisation illimitée

Modèles :
  if/kimi-k2-thinking
  if/qwen3-coder-plus
  if/glm-4.7
  if/minimax-m2
  if/deepseek-r1
```

### Qwen (3 modèles GRATUITS)

```bash
Tableau de bord → Connecter Qwen
→ Autorisation par code d'appareil
→ Utilisation illimitée

Modèles :
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro (Claude GRATUIT)

```bash
Tableau de bord → Connecter Kiro
→ AWS Builder ID ou Google/GitHub
→ Utilisation illimitée

Modèles :
  kr/claude-sonnet-4.5
  kr/claude-haiku-4.5
```

</details>

<details>
<summary><b>🎨 Créer des combos</b></summary>

### Exemple 1 : Maximiser l'abonnement → Backup économique

```
Tableau de bord → Combos → Créer nouveau

Nom : premium-coding
Modèles :
  1. cc/claude-opus-4-6 (Abonnement principal)
  2. glm/glm-4.7 (Backup économique, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Fallback le moins cher, $0.20/1M)

Utilisez en CLI : premium-coding
```

### Exemple 2 : Gratuit uniquement (Zéro coût)

```
Nom : free-combo
Modèles :
  1. gc/gemini-3-flash-preview (180K gratuits/mois)
  2. if/kimi-k2-thinking (illimité)
  3. qw/qwen3-coder-plus (illimité)

Coût : 0 $ pour toujours !
```

</details>

<details>
<summary><b>🔧 Intégration CLI</b></summary>

### Cursor IDE

```
Paramètres → Modèles → Avancé :
  OpenAI API Base URL : http://localhost:20128/v1
  OpenAI API Key : [du tableau de bord OmniRoute]
  Model : cc/claude-opus-4-6
```

### Claude Code

Utilisez la page **CLI Tools** dans le tableau de bord pour la configuration en un clic, ou modifiez `~/.claude/settings.json` manuellement.

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**Option 1 — Tableau de bord (recommandé) :**

```
Tableau de bord → CLI Tools → OpenClaw → Sélectionner modèle → Appliquer
```

**Option 2 — Manuel :** Modifier `~/.openclaw/openclaw.json` :

```json
{
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://127.0.0.1:20128/v1",
        "apiKey": "sk_omniroute",
        "api": "openai-completions"
      }
    }
  }
}
```

> **Note :** OpenClaw fonctionne uniquement avec OmniRoute local. Utilisez `127.0.0.1` au lieu de `localhost` pour éviter les problèmes de résolution IPv6.

### Cline / Continue / RooCode

```
Paramètres → Configuration API :
  Fournisseur : OpenAI Compatible
  Base URL : http://localhost:20128/v1
  API Key : [du tableau de bord OmniRoute]
  Model : if/kimi-k2-thinking
```

</details>

---

## 🐛 Dépannage

<details>
<summary><b>Cliquez pour développer le guide de dépannage</b></summary>

**« Language model did not provide messages »**

- Quota du fournisseur épuisé → Vérifiez le suivi de quota dans le tableau de bord
- Solution : Utilisez un combo avec fallback ou passez à un niveau moins cher

**Rate limiting**

- Quota d'abonnement épuisé → Fallback vers GLM/MiniMax
- Ajoutez un combo : `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**Token OAuth expiré**

- Renouvelé automatiquement par OmniRoute
- Si le problème persiste : Tableau de bord → Fournisseur → Reconnecter

**Coûts élevés**

- Vérifiez les statistiques d'utilisation dans Tableau de bord → Coûts
- Changez le modèle principal pour GLM/MiniMax
- Utilisez le niveau gratuit (Gemini CLI, iFlow) pour les tâches non critiques

**Le tableau de bord s'ouvre sur le mauvais port**

- Définissez `PORT=20128` et `NEXT_PUBLIC_BASE_URL=http://localhost:20128`

**Erreurs de cloud sync**

- Vérifiez que `BASE_URL` pointe vers votre instance en cours d'exécution
- Vérifiez que `CLOUD_URL` pointe vers le point de terminaison cloud attendu
- Gardez les valeurs `NEXT_PUBLIC_*` alignées avec les valeurs du serveur

**Le premier login ne fonctionne pas**

- Vérifiez `INITIAL_PASSWORD` dans `.env`
- Si non défini, le mot de passe par défaut est `123456`

**Pas de logs de requêtes**

- Définissez `ENABLE_REQUEST_LOGS=true` dans `.env`

**Le test de connexion affiche « Invalid » pour les fournisseurs compatibles OpenAI**

- Beaucoup de fournisseurs n'exposent pas le point de terminaison `/models`
- OmniRoute v1.0.6+ inclut une validation de secours via chat completions
- Assurez-vous que l'URL de base inclut le suffixe `/v1`

</details>

---

## 🛠️

- **Runtime** : Node.js 20+
- **Langage** : TypeScript 5.9 — **100% TypeScript** dans `src/` et `open-sse/` (v1.0.6)
- **Framework** : Next.js 16 + React 19 + Tailwind CSS 4
- **Base de données** : LowDB (JSON) + SQLite (état du domaine + logs proxy)
- **Streaming** : Server-Sent Events (SSE)
- **Auth** : OAuth 2.0 (PKCE) + JWT + API Keys
- **Tests** : Node.js test runner (368+ tests unitaires)
- **CI/CD** : GitHub Actions (publication automatique npm + Docker Hub lors du release)
- **Site web** : [omniroute.online](https://omniroute.online)
- **Package** : [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker** : [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Résilience** : Circuit breaker, backoff exponentiel, anti-thundering herd, spoofing TLS

---

## 📖 Documentation

| Document                                   | Description                                         |
| ------------------------------------------ | --------------------------------------------------- |
| [Guide utilisateur](docs/USER_GUIDE.md)    | Fournisseurs, combos, intégration CLI, déploiement  |
| [Référence API](docs/API_REFERENCE.md)     | Tous les endpoints avec exemples                    |
| [Dépannage](docs/TROUBLESHOOTING.md)       | Problèmes courants et solutions                     |
| [Architecture](docs/ARCHITECTURE.md)       | Architecture système et détails internes            |
| [Contribuer](CONTRIBUTING.md)              | Configuration de développement et directives        |
| [Spécification OpenAPI](docs/openapi.yaml) | Spécification OpenAPI 3.0                           |
| [Politique de sécurité](SECURITY.md)       | Signalement de vulnérabilités et pratiques sécurité |

---

## 🗺️

## 👥 Contributeurs

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Comment contribuer

1. Forkez le dépôt
2. Créez votre branche de fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

Consultez [CONTRIBUTING.md](CONTRIBUTING.md) pour les directives détaillées.

### Publier une nouvelle version

```bash
# Créer un release — la publication npm est automatique
gh release create v1.0.6 --title "v1.0.6" --generate-notes
```

---

## 📊 Historique des Stars

## Stargazers over time

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Remerciements

Remerciements spéciaux à **[9router](https://github.com/decolua/9router)** par **[decolua](https://github.com/decolua)** — le projet original qui a inspiré ce fork. OmniRoute construit sur cette base incroyable avec des fonctionnalités supplémentaires, des APIs multi-modales et une réécriture complète en TypeScript.

Remerciements spéciaux à **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — l'implémentation originale en Go qui a inspiré ce portage en JavaScript.

---

## 📄 Licence

Licence MIT — voir [LICENSE](LICENSE) pour les détails.

---

<div align="center">
  <sub>Fait avec ❤️ pour les développeurs qui codent 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
