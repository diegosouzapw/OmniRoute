# Référence API

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

Référence complète pour tous les points de terminaison de l'API OmniRoute.

---

## Table des matières

- [Chat Completions](#chat-completions)
- [Embeddings](#embeddings)
- [Image Generation](#image-generation)
- [List Models](#list-models)
- [Compatibility Endpoints](#compatibility-endpoints)
- [Semantic Cache](#semantic-cache)
- [Dashboard & Management](#dashboard--management)
- [Request Processing](#request-processing)
- [Authentication](#authentication)

---

## Fins de chat

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### En-têtes personnalisés

| En-tête                  | Itinéraire | Descriptif                                           |
| ------------------------ | ---------- | ---------------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Demande    | Défini sur `true` pour contourner le cache           |
| `X-OmniRoute-Progress`   | Demande    | Défini sur `true` pour les événements de progression |
| `Idempotency-Key`        | Demande    | Clé de déduplication (fenêtre 5s)                    |
| `X-Request-Id`           | Demande    | Clé de déduplication alternative                     |
| `X-OmniRoute-Cache`      | Réponse    | `HIT` ou `MISS` (sans streaming)                     |
| `X-OmniRoute-Idempotent` | Réponse    | `true` si dédupliqué                                 |
| `X-OmniRoute-Progress`   | Réponse    | `enabled` si le suivi des progrès est activé         |

---

## Intégrations

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Fournisseurs disponibles : Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## Génération d'images

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/dall-e-3",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
```

Fournisseurs disponibles : OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.

```bash
# List all image models
GET /v1/images/generations
```

---

## Liste des modèles

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## Points de terminaison de compatibilité

| Méthode | Chemin                      | Formater                   |
| ------- | --------------------------- | -------------------------- |
| POSTER  | `/v1/chat/completions`      | OpenAI                     |
| POSTER  | `/v1/messages`              | Anthropique                |
| POSTER  | `/v1/responses`             | Réponses OpenAI            |
| POSTER  | `/v1/embeddings`            | OpenAI                     |
| POSTER  | `/v1/images/generations`    | OpenAI                     |
| OBTENIR | `/v1/models`                | OpenAI                     |
| POSTER  | `/v1/messages/count_tokens` | Anthropique                |
| OBTENIR | `/v1beta/models`            | Gémeaux                    |
| POSTER  | `/v1beta/models/{...path}`  | Gémeaux générer du contenu |
| POSTER  | `/v1/api/chat`              | Ollama                     |

### Itinéraires de fournisseurs dédiés

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Le préfixe du fournisseur est ajouté automatiquement s'il est manquant. Les modèles incompatibles renvoient `400`.

---

## Cache sémantique

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

Exemple de réponse :

```json
{
  "semanticCache": {
    "memorySize": 42,
    "memoryMaxSize": 500,
    "dbSize": 128,
    "hitRate": 0.65
  },
  "idempotency": {
    "activeKeys": 3,
    "windowMs": 5000
  }
}
```

---

## Tableau de bord et gestion

### Authentification

| Point de terminaison          | Méthode        | Descriptif                    |
| ----------------------------- | -------------- | ----------------------------- |
| `/api/auth/login`             | POSTER         | Connexion                     |
| `/api/auth/logout`            | POSTER         | Déconnexion                   |
| `/api/settings/require-login` | OBTENIR/METTRE | Basculer la connexion requise |

### Gestion des fournisseurs

| Point de terminaison         | Méthode                  | Descriptif                              |
| ---------------------------- | ------------------------ | --------------------------------------- |
| `/api/providers`             | OBTENIR/POST             | Lister/créer des prestataires           |
| `/api/providers/[id]`        | OBTENIR/METTRE/SUPPRIMER | Gérer un fournisseur                    |
| `/api/providers/[id]/test`   | POSTER                   | Connexion du fournisseur de test        |
| `/api/providers/[id]/models` | OBTENIR                  | Liste des modèles de fournisseurs       |
| `/api/providers/validate`    | POSTER                   | Valider la configuration du fournisseur |
| `/api/provider-nodes*`       | Divers                   | Gestion des nœuds de fournisseur        |
| `/api/provider-models`       | OBTENIR/POST/DELETE      | Modèles personnalisés                   |

### Flux OAuth

| Point de terminaison             | Méthode | Descriptif                      |
| -------------------------------- | ------- | ------------------------------- |
| `/api/oauth/[provider]/[action]` | Divers  | OAuth spécifique au fournisseur |

### Routage et configuration

| Point de terminaison  | Méthode      | Descriptif                              |
| --------------------- | ------------ | --------------------------------------- |
| `/api/models/alias`   | OBTENIR/POST | Alias ​​du modèle                       |
| `/api/models/catalog` | OBTENIR      | Tous les modèles par fournisseur + type |
| `/api/combos*`        | Divers       | Gestion des combos                      |
| `/api/keys*`          | Divers       | Gestion des clés API                    |
| `/api/pricing`        | OBTENIR      | Tarification du modèle                  |

### Utilisation et analyses

| Point de terminaison        | Méthode | Descriptif                       |
| --------------------------- | ------- | -------------------------------- |
| `/api/usage/history`        | OBTENIR | Historique d'utilisation         |
| `/api/usage/logs`           | OBTENIR | Journaux d'utilisation           |
| `/api/usage/request-logs`   | OBTENIR | Journaux au niveau de la demande |
| `/api/usage/[connectionId]` | OBTENIR | Utilisation par connexion        |

### Paramètres

| Point de terminaison            | Méthode        | Descriptif                               |
| ------------------------------- | -------------- | ---------------------------------------- |
| `/api/settings`                 | OBTENIR/METTRE | Paramètres généraux                      |
| `/api/settings/proxy`           | OBTENIR/METTRE | Configuration du proxy réseau            |
| `/api/settings/proxy/test`      | POSTER         | Tester la connexion proxy                |
| `/api/settings/ip-filter`       | OBTENIR/METTRE | Liste d'autorisation/liste de blocage IP |
| `/api/settings/thinking-budget` | OBTENIR/METTRE | Budget symbolique de raisonnement        |
| `/api/settings/system-prompt`   | OBTENIR/METTRE | Invite système globale                   |

### Surveillance

| Point de terminaison     | Méthode           | Descriptif                      |
| ------------------------ | ----------------- | ------------------------------- |
| `/api/sessions`          | OBTENIR           | Suivi de session active         |
| `/api/rate-limits`       | OBTENIR           | Limites de taux par compte      |
| `/api/monitoring/health` | OBTENIR           | Bilan de santé                  |
| `/api/cache`             | OBTENIR/SUPPRIMER | Statistiques du cache / effacer |

### Sauvegarde et exportation/importation

| Point de terminaison        | Méthode | Descriptif                                                       |
| --------------------------- | ------- | ---------------------------------------------------------------- |
| `/api/db-backups`           | OBTENIR | Liste des sauvegardes disponibles                                |
| `/api/db-backups`           | METTRE  | Créer une sauvegarde manuelle                                    |
| `/api/db-backups`           | POSTER  | Restaurer à partir d'une sauvegarde spécifique                   |
| `/api/db-backups/export`    | OBTENIR | Télécharger la base de données sous forme de fichier .sqlite     |
| `/api/db-backups/import`    | POSTER  | Téléchargez le fichier .sqlite pour remplacer la base de données |
| `/api/db-backups/exportAll` | OBTENIR | Télécharger la sauvegarde complète sous forme d'archive .tar.gz  |

### Synchronisation avec le cloud

| Point de terminaison   | Méthode | Descriptif                          |
| ---------------------- | ------- | ----------------------------------- |
| `/api/sync/cloud`      | Divers  | Opérations de synchronisation cloud |
| `/api/sync/initialize` | POSTER  | Initialiser la synchronisation      |
| `/api/cloud/*`         | Divers  | Gestion du cloud                    |

### Outils CLI

| Point de terminaison               | Méthode | Descriptif                 |
| ---------------------------------- | ------- | -------------------------- |
| `/api/cli-tools/claude-settings`   | OBTENIR | Statut CLI de Claude       |
| `/api/cli-tools/codex-settings`    | OBTENIR | Statut CLI du Codex        |
| `/api/cli-tools/droid-settings`    | OBTENIR | Statut de la CLI du droïde |
| `/api/cli-tools/openclaw-settings` | OBTENIR | Statut de la CLI OpenClaw  |
| `/api/cli-tools/runtime/[toolId]`  | OBTENIR | Exécution CLI générique    |

Les réponses CLI incluent : `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### Résilience et limites de taux

| Point de terminaison    | Méthode        | Descriptif                                      |
| ----------------------- | -------------- | ----------------------------------------------- |
| `/api/resilience`       | OBTENIR/METTRE | Obtenir/mettre à jour les profils de résilience |
| `/api/resilience/reset` | POSTER         | Réinitialiser les disjoncteurs                  |
| `/api/rate-limits`      | OBTENIR        | Statut de limite de débit par compte            |
| `/api/rate-limit`       | OBTENIR        | Configuration de la limite de débit globale     |

### Évaluations

| Point de terminaison | Méthode      | Descriptif                                                |
| -------------------- | ------------ | --------------------------------------------------------- |
| `/api/evals`         | OBTENIR/POST | Répertorier les suites d'évaluation/exécuter l'évaluation |

### Politiques

| Point de terminaison | Méthode             | Descriptif                      |
| -------------------- | ------------------- | ------------------------------- |
| `/api/policies`      | OBTENIR/POST/DELETE | Gérer les politiques de routage |

### Conformité

| Point de terminaison        | Méthode | Descriptif                                |
| --------------------------- | ------- | ----------------------------------------- |
| `/api/compliance/audit-log` | OBTENIR | Journal d'audit de conformité (dernier N) |

### v1beta (compatible Gemini)

| Point de terminaison       | Méthode | Descriptif                                    |
| -------------------------- | ------- | --------------------------------------------- |
| `/v1beta/models`           | OBTENIR | Liste des modèles au format Gemini            |
| `/v1beta/models/{...path}` | POSTER  | Point de terminaison Gemini `generateContent` |

Ces points de terminaison reflètent le format API de Gemini pour les clients qui attendent une compatibilité native avec le SDK Gemini.

### API internes/système

| Point de terminaison | Méthode | Descriptif                                                                                 |
| -------------------- | ------- | ------------------------------------------------------------------------------------------ |
| `/api/init`          | OBTENIR | Vérification de l'initialisation de l'application (utilisée lors de la première exécution) |
| `/api/tags`          | OBTENIR | Balises de modèle compatibles Ollama (pour les clients Ollama)                             |
| `/api/restart`       | POSTER  | Déclencher un redémarrage progressif du serveur                                            |
| `/api/shutdown`      | POSTER  | Déclencher l'arrêt progressif du serveur                                                   |

> **Remarque :** Ces points de terminaison sont utilisés en interne par le système ou pour la compatibilité du client Ollama. Ils ne sont généralement pas appelés par les utilisateurs finaux.

---

## Transcription audio

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Transcrivez des fichiers audio à l'aide de Deepgram ou AssemblyAI.

**Demande :**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**Réponse :**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**Fournisseurs pris en charge :** `deepgram/nova-3`, `assemblyai/best`.

**Formats pris en charge :** `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

## Compatibilité Ollama

Pour les clients qui utilisent le format API d'Ollama :

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

Les demandes sont automatiquement traduites entre Ollama et les formats internes.

---

## Télémétrie

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**Réponse :**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## Budget

```bash
# Get budget status for all API keys
GET /api/usage/budget

# Set or update a budget
POST /api/usage/budget
Content-Type: application/json

{
  "keyId": "key-123",
  "limit": 50.00,
  "period": "monthly"
}
```

---

## Disponibilité du modèle

```bash
# Get real-time model availability across all providers
GET /api/models/availability

# Check availability for a specific model
POST /api/models/availability
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929"
}
```

---

## Traitement des demandes

1. Le client envoie la demande à `/v1/*`
2. Le gestionnaire de route appelle `handleChat`, `handleEmbedding`, `handleAudioTranscription` ou `handleImageGeneration`
3. Le modèle est résolu (fournisseur/modèle direct ou alias/combo)
4. Informations d'identification sélectionnées dans la base de données locale avec filtrage de la disponibilité des comptes
5. Pour le chat : `handleChatCore` — détection de format, traduction, vérification du cache, vérification de l'idempotence
6. L'exécuteur du fournisseur envoie une requête en amont
7. Réponse traduite au format client (chat) ou renvoyée telle quelle (intégrations/images/audio)
8. Utilisation/journalisation enregistrée
9. Le repli s'applique aux erreurs selon les règles de combo

Référence complète de l'architecture : [**OMNI_TOKEN_119**](ARCHITECTURE.md)

---

## Authentification

- Les itinéraires du tableau de bord (`/dashboard/*`) utilisent le cookie `auth_token`
- La connexion utilise le hachage du mot de passe enregistré ; retour à `INITIAL_PASSWORD`
- `requireLogin` basculable via `/api/settings/require-login`
- Les routes `/v1/*` nécessitent éventuellement une clé API Bearer lorsque `REQUIRE_API_KEY=true`
