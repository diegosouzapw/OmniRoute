# 🌐 OmniRoute Proxy Guide (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Contournez les blocages géographiques, protégez votre identité et acheminez le trafic d’IA via n’importe quel proxy, sans aucune complexité de configuration.**

OmniRoute comprend un système complet de gestion des proxys qui vous permet d’acheminer le trafic vers les fournisseurs d’IA en amont via des proxys HTTP, HTTPS ou SOCKS5. Que vous vous trouviez dans une région bloquée, que vous ayez besoin d’une rotation d’adresses IP ou que vous souhaitiez masquer votre empreinte numérique, ce guide couvre tous les aspects.

---

## Table des matières

- [Pourquoi utiliser des proxys ?](#why-use-proxies)
- [Vue d’ensemble de l’architecture](#architecture-overview)
- [Système de proxy à 4 niveaux](#4-level-proxy-system)
- [Registre des proxys (CRUD)](#proxy-registry-crud)
- [Place de marché gratuite 1proxy](#1proxy-free-proxy-marketplace)
- [Rotation des proxys](#proxy-rotation)
- [Antidétection et discrétion](#anti-detection--stealth)
- [Modes de proxy en amont](#upstream-proxy-modes)
- [Interface du tableau de bord](#dashboard-ui)
- [Référence de l’API](#api-reference)
- [Variables d’environnement](#environment-variables)
- [Dépannage](#troubleshooting)

---

## Pourquoi utiliser des proxys ?

De nombreux fournisseurs d’IA limitent l’accès selon la région géographique. Les développeurs en **Russie, Chine, Iran, Cuba, Turquie** et dans d’autres pays rencontrent des erreurs telles que :

```
unsupported_country_region_territory
```

Même en dehors des régions bloquées, les proxys sont utiles pour :

| Cas d’utilisation              | Description                                                                            |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| **Contournement géographique** | Accéder à OpenAI, Anthropic, Codex et Copilot depuis des pays bloqués                  |
| **Rotation des adresses IP**   | Répartir les requêtes entre plusieurs adresses IP afin d’éviter la limitation de débit |
| **Confidentialité**            | Masquer votre véritable adresse IP aux fournisseurs en amont                           |
| **Conformité**                 | Acheminer le trafic via des juridictions spécifiques                                   |
| **Tests**                      | Simuler des requêtes provenant de différentes régions                                  |

---

## Vue d’ensemble de l’architecture

```
┌───────────────────────────────────────────────────────────────┐
│                       Serveur OmniRoute                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Registre    │    │ Répartiteur  │    │ Récupération     │  │
│  │ des proxys  │───▶│ de proxys    │───▶│ (undici)         │  │
│  │ (SQLite)    │    │ (en cache)   │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ Synchro.    │                        │ API du           │  │
│  │ 1proxy      │                        │ fournisseur      │  │
│  │ (pool grat.)│                        │ en amont         │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Composants principaux

| Composant                  | Fichier                                      | Rôle                                                               |
| -------------------------- | -------------------------------------------- | ------------------------------------------------------------------ |
| **Registre des proxys**    | `src/lib/db/proxies.ts`                      | Opérations CRUD sur les entrées de proxy et affectations de portée |
| **Répartiteur de proxys**  | `open-sse/utils/proxyDispatcher.ts`          | Crée des répartiteurs ProxyAgent/SOCKS `undici` avec mise en cache |
| **Récupération par proxy** | `open-sse/utils/proxyFetch.ts`               | Encapsule `fetch()` avec l’injection d’un répartiteur de proxys    |
| **Route des paramètres**   | `src/app/api/settings/proxy/route.ts`        | API héritée de configuration des proxys (GET/PUT/DELETE)           |
| **Route de gestion**       | `src/app/api/v1/management/proxies/route.ts` | API CRUD du registre (GET/POST/PATCH/DELETE)                       |
| **BD 1proxy**              | `src/lib/db/oneproxy.ts`                     | Persistance de la place de marché de proxys gratuits               |

---

## Système de proxy à 4 niveaux

OmniRoute prend en charge la configuration des proxys à **quatre niveaux indépendants**, résolus par ordre de priorité :

```
Ordre de résolution des priorités (de la plus élevée à la plus faible) :

  1. 🔵 Proxy de compte/connexion  →  par clé API / connexion OAuth
  2. 🟡 Proxy de fournisseur      →  par fournisseur (p. ex., tout le trafic OpenAI)
  3. 🟠 Proxy de combinaison      →  par combinaison/configuration de routage
  4. 🟢 Proxy global              →  tout le trafic, tous les fournisseurs
```

### Fonctionnement de la résolution

Lorsqu’OmniRoute envoie une requête à un fournisseur en amont, il appelle `resolveProxyForConnectionFromRegistry()`, qui vérifie chaque niveau dans l’ordre :

1. **Niveau du compte** — Un proxy est-il attribué à cet identifiant de connexion spécifique ?
2. **Niveau du fournisseur** — Un proxy est-il attribué à ce fournisseur (p. ex., `openai`) ?
3. **Niveau global** — Un proxy global est-il configuré ?
4. **Aucun proxy** — Connexion directe au fournisseur.

La première correspondance est retenue. Vous pouvez donc définir un proxy global comme solution de repli, puis le remplacer pour certains fournisseurs ou certaines connexions.

### Trafic passant par le proxy

| Type de trafic              | Via le proxy ? | Remarques                                          |
| --------------------------- | -------------- | -------------------------------------------------- |
| Complétions de chat         | ✅             | Toutes les requêtes `/v1/chat/completions`         |
| Embeddings                  | ✅             | `/v1/embeddings`                                   |
| Génération d’images         | ✅             | `/v1/images/generations`                           |
| Audio (TTS/STT)             | ✅             | `/v1/audio/*`                                      |
| Échange de jetons OAuth     | ✅             | Résout `unsupported_country_region_territory`      |
| Tests de connexion          | ✅             | Le bouton « Tester la connexion » utilise le proxy |
| Actualisation des jetons    | ✅             | Renouvellement OAuth en arrière-plan               |
| Synchronisation des modèles | ✅             | Liste et découverte des modèles                    |

---

## Registre des proxys (CRUD)

Le registre des proxys est une table SQLite (`proxy_registry`) qui stocke tous vos proxys. Chaque proxy possède les champs suivants :

| Champ      | Type   | Description                                             |
| ---------- | ------ | ------------------------------------------------------- |
| `id`       | UUID   | Identifiant unique                                      |
| `name`     | Chaîne | Libellé lisible par l’utilisateur                       |
| `type`     | Chaîne | Protocole : `http`, `https`, `socks5`                   |
| `host`     | Chaîne | Nom d’hôte ou adresse IP du proxy                       |
| `port`     | Entier | Numéro de port                                          |
| `username` | Chaîne | Nom d’utilisateur d’authentification (chiffré au repos) |
| `password` | Chaîne | Mot de passe d’authentification (chiffré au repos)      |
| `region`   | Chaîne | Libellé de la région géographique                       |
| `notes`    | Chaîne | Notes en texte libre                                    |
| `status`   | Chaîne | `active` ou `inactive`                                  |
| `source`   | Chaîne | `manual` ou `oneproxy`                                  |

### Création d’un proxy

**Via le tableau de bord :**

1. Accédez à **Paramètres → Proxy**
2. Cliquez sur **Ajouter un proxy**
3. Renseignez le type, l’hôte, le port et, facultativement, les identifiants d’authentification
4. Enregistrez

**Via l’API :**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### Mise à jour d’un proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Remarque :** Les identifiants sont conservés, sauf si vous envoyez explicitement des valeurs de remplacement non vides. L’envoi de chaînes vides pour `username`/`password` conservera les valeurs stockées.

### Suppression d’un proxy

```bash
# Échoue si le proxy est attribué à un niveau quelconque
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Force la suppression (supprime également les attributions)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Liste des proxys

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Attribution de proxys aux niveaux

```bash
# Attribuer au niveau global
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Attribuer à un fournisseur spécifique
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Attribuer à une connexion/clé spécifique
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Résolution du proxy effectif

Vérifiez quel proxy serait utilisé pour une connexion donnée :

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Renvoie le proxy résolu avec son niveau (`account`, `provider` ou `global`) et sa source.

### Attribution groupée

Attribuez un proxy à plusieurs fournisseurs ou connexions à la fois :

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Importation/Exportation

Les proxys sont inclus dans le système de **sauvegarde/restauration**. Lorsque vous exportez votre configuration OmniRoute :

1. Accédez à **Tableau de bord → Paramètres → Sauvegarde**
2. Cliquez sur **Exporter** — le registre des proxys et les attributions sont inclus
3. Pour effectuer une restauration, cliquez sur **Importer** et chargez le fichier de sauvegarde

Le registre des proxys prend également en charge l’**upsert par host+port** — si vous importez un proxy qui existe déjà (mêmes hôte et port), il est mis à jour au lieu de créer un doublon.

### Migration de l’ancien système

Si vous avez configuré des proxys dans une ancienne version (antérieure au registre), OmniRoute les migre automatiquement :

```
Ancien stockage key_value → proxy_registry + proxy_assignments
```

Cette opération s’effectue une seule fois, au premier démarrage après la mise à niveau. Utilisez `migrateLegacyProxyConfigToRegistry({ force: true })` pour la relancer.

---

## Marché gratuit de proxies 1proxy

> 🆕 **Contribution de [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (Issue [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute s’intègre à la plateforme communautaire **[1proxy](https://1proxy-api.aitradepulse.com)** pour fournir un accès à **des centaines de proxies gratuits et validés** provenant du monde entier. Cette solution est idéale pour les utilisateurs qui ne disposent pas de leur propre infrastructure de proxies.

### Fonctionnement

```
┌─────────────┐  Synchronisation  ┌─────────────────┐    Rotation     ┌─────────────┐
│ API 1proxy  │ ────────────────▶ │  proxy_registry  │ ──────────────▶ │ Fournisseur │
│  (externe)  │ jusqu’à 500       │  source=oneproxy │ par qualité     │     API     │
└─────────────┘ proxies           └─────────────────┘                 └─────────────┘
```

1. **Synchronisation** — OmniRoute récupère les proxies validés depuis l’API 1proxy
2. **Stockage** — Les proxies sont enregistrés dans la même table `proxy_registry` avec `source = 'oneproxy'`
3. **Filtrage** — Filtrez par protocole, pays et score de qualité
4. **Rotation** — Sélectionnez le meilleur proxy à l’aide d’une stratégie basée sur la qualité, aléatoire ou séquentielle
5. **Dégradation automatique** — Le score de qualité des proxies défaillants est réduit ; s’il passe sous le seuil, ils sont marqués comme inactifs

### Synchronisation des proxies

**Via le tableau de bord :**

1. Accédez à l’onglet **Settings → 1proxy**
2. Cliquez sur **« Sync Now »**
3. Consultez les statistiques : nombre total de proxies, nombre de proxies actifs, qualité moyenne et répartition par pays

**Via l’API :**

```bash
# Déclencher la synchronisation
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Réponse :
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Filtrage des proxies

```bash
# Filtrer par protocole
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Filtrer par pays
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Filtrer par score de qualité minimal
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Combiner les filtres
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Scores de qualité des proxies

Chaque proxy 1proxy est accompagné de métadonnées :

| Champ           | Description                                             |
| --------------- | ------------------------------------------------------- |
| `qualityScore`  | Note de 0 à 100 issue de la validation de 1proxy        |
| `latencyMs`     | Latence réseau mesurée                                  |
| `anonymity`     | `transparent`, `anonymous` ou `elite`                   |
| `googleAccess`  | Indique si le proxy peut accéder aux services de Google |
| `countryCode`   | Code pays ISO à deux lettres                            |
| `lastValidated` | Horodatage de la dernière validation                    |

Les scores de qualité sont ajustés dynamiquement :

- **Les requêtes ayant échoué** réduisent le score de 10 points
- **Le score tombe à ≤10** → le proxy est marqué comme `inactive`
- Les proxies inactifs sont exclus de la rotation

### Stratégies de rotation

```bash
# Rotation par qualité (meilleur proxy en premier) — stratégie par défaut
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Rotation aléatoire
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Rotation séquentielle (proxy validé le moins récemment en premier)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Coupe-circuit

La synchronisation avec 1proxy dispose d’un coupe-circuit intégré :

- Après **5 échecs de synchronisation consécutifs**, les tentatives de synchronisation suivantes sont bloquées
- Réinitialisez-le avec : `resetOneproxyCircuitBreaker()` ou redémarrez le serveur
- L’état de la synchronisation est disponible à l’adresse `GET /api/settings/oneproxy?action=status`

### Suppression des proxies 1proxy

```bash
# Supprimer un seul proxy 1proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Supprimer TOUS les proxies 1proxy (les proxies manuels ne sont pas affectés)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Antidétection et furtivité

OmniRoute ne se contente pas d’acheminer le trafic via un proxy — il lui donne une apparence légitime :

### Usurpation de l’empreinte TLS

Utilise `wreq-js` pour générer des empreintes TLS similaires à celles des navigateurs, contournant ainsi les systèmes de détection des bots qui signalent les négociations TLS ne provenant pas d’un navigateur.

### Correspondance de l’empreinte CLI

Le **bouton d’activation de l’empreinte CLI** (`Paramètres → Sécurité`) réorganise les en-têtes HTTP et les champs du corps JSON pour correspondre exactement à la signature des binaires CLI natifs (Claude Code, Codex, etc.). Cette fonctionnalité s’applique **en complément** du proxy :

```
Votre IP (bloquée) → IP du proxy (États-Unis) → API du fournisseur
                     + usurpation TLS
                     + empreinte CLI
```

Vous bénéficiez simultanément du **masquage de l’adresse IP** et de **l’authenticité des requêtes**.

### Préservation de l’adresse IP du proxy

Des badges à code couleur dans le tableau de bord indiquent le niveau de proxy actif :

| Badge | Niveau      | Signification                                          |
| ----- | ----------- | ------------------------------------------------------ |
| 🟢    | Global      | Tout le trafic transite par ce proxy                   |
| 🟡    | Fournisseur | Seul le trafic de ce fournisseur transite par ce proxy |
| 🔵    | Connexion   | Cette clé ou ce compte spécifique utilise ce proxy     |

Le badge affiche également l’adresse IP résolue du proxy à des fins de vérification.

---

## Modes de proxy en amont

Pour les fournisseurs qui utilisent le modèle CLIProxyAPI, OmniRoute prend en charge trois modes de proxy en amont :

| Mode          | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `native`      | OmniRoute gère directement le routage par proxy (par défaut) |
| `cliproxyapi` | Délègue le routage à une instance CLIProxyAPI externe        |
| `fallback`    | Essaie d’abord le mode natif, puis se rabat sur CLIProxyAPI  |

Configuration par fournisseur :

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Interface du tableau de bord

### Paramètres → Onglet Proxy

- Configuration du **proxy global** (définie une seule fois pour tout le trafic)
- Remplacements du proxy **par fournisseur**
- Affectations de proxy **par connexion**
- **Test de connexion** via le proxy configuré
- **Badges à code couleur** indiquant le niveau de proxy actif

### Paramètres → Onglet 1proxy

- Bouton **Synchroniser maintenant** pour récupérer des proxys gratuits
- **Cartes de statistiques** : total, actifs, qualité moyenne, dernière synchronisation
- **Filtres** : protocole, code pays, qualité minimale
- **Tableau des proxys** avec l’hôte, le protocole, le pays, le score de qualité, la latence, l’anonymat et l’accès à Google
- Panneau **d’état de la synchronisation** avec suivi des réussites et des échecs, ainsi que le nombre d’échecs consécutifs
- **Tout effacer** pour supprimer toutes les entrées 1proxy

---

## Référence de l’API

### API des paramètres de proxy

| Méthode  | Point de terminaison                           | Description                       |
| -------- | ---------------------------------------------- | --------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Obtenir la configuration complète |
| `GET`    | `/api/settings/proxy?level=global`             | Obtenir le proxy global           |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Obtenir le proxy du fournisseur   |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Résoudre le proxy effectif        |
| `PUT`    | `/api/settings/proxy`                          | Mettre à jour la configuration    |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Supprimer le proxy à ce niveau    |

### API du registre des proxys

| Méthode  | Point de terminaison                              | Description                        |
| -------- | ------------------------------------------------- | ---------------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Répertorier tous les proxys        |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Obtenir un proxy par ID            |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Obtenir les affectations du proxy  |
| `POST`   | `/api/v1/management/proxies`                      | Créer un proxy                     |
| `PATCH`  | `/api/v1/management/proxies`                      | Mettre à jour un proxy             |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Supprimer un proxy                 |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Forcer la suppression              |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Effectuer une affectation en masse |
| `GET`    | `/api/v1/management/proxies/assignments`          | Répertorier les affectations       |
| `GET`    | `/api/v1/management/proxies/health`               | Obtenir les statistiques d’état    |

### API des tunnels

Pour exposer votre instance OmniRoute à l’Internet public (Cloudflare/ngrok/Tailscale) au lieu d’acheminer le trafic sortant via un proxy, consultez [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). L’API REST des tunnels se trouve sous `/api/tunnels/{cloudflared,ngrok,tailscale}/*` et est indépendante de la chaîne de proxys sortants documentée ci-dessus.

### API 1proxy

| Méthode  | Point de terminaison                   | Description                                    |
| -------- | -------------------------------------- | ---------------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | Répertorier les proxys 1proxy                  |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Obtenir les statistiques et l’état de synchro. |
| `GET`    | `/api/settings/oneproxy?action=status` | Obtenir uniquement l’état de synchronisation   |
| `POST`   | `/api/settings/oneproxy`               | Déclencher la synchronisation                  |
| `POST`   | `/api/settings/oneproxy/rotate`        | Passer au proxy suivant                        |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | En supprimer un                                |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Tout effacer                                   |

### API du proxy en amont

| Méthode  | Point de terminaison              | Description                                  |
| -------- | --------------------------------- | -------------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Obtenir la configuration du proxy en amont   |
| `PUT`    | `/api/upstream-proxy/:providerId` | Définir le mode du proxy en amont            |
| `DELETE` | `/api/upstream-proxy/:providerId` | Supprimer la configuration du proxy en amont |

---

## Variables d’environnement

| Variable              | Valeur par défaut | Description                                                                       |
| --------------------- | ----------------- | --------------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`            | Active la prise en charge du proxy SOCKS5 (`true` par défaut dans `.env.example`) |

---

## Dépannage

### « Le proxy SOCKS5 est désactivé »

Définissez `ENABLE_SOCKS5_PROXY=true` dans votre fichier `.env`, puis redémarrez.

### Erreurs « socket hang up » via le proxy

Ce comportement est normal avec les proxys bon marché qui interrompent les connexions inactives. OmniRoute gère déjà ce problème en :

- Désactivant le maintien des connexions pour les connexions au proxy (`keepAliveTimeout: 1`)
- Désactivant le pipelining (`pipelining: 0`)
- Mettant en cache les répartiteurs afin d’éviter les négociations répétées

Si le problème persiste, essayez un autre proxy ou utilisez la fonctionnalité de rotation de 1proxy.

### « unsupported_country_region_territory » pendant OAuth

Assurez-vous que le proxy est configuré **avant** de démarrer le flux OAuth. OmniRoute achemine l’échange de jetons OAuth via le proxy configuré. Définissez d’abord un proxy global ou propre au fournisseur, puis établissez la connexion.

### Le proxy n’est pas utilisé

Vérifiez l’ordre de résolution :

1. Effectuez une vérification avec `GET /api/settings/proxy?resolve=your-connection-id`
2. Vérifiez que le `status` du proxy est `active` (et non `inactive`)
3. Assurez-vous que la portée d’affectation du proxy correspond à votre connexion

### Échec de la synchronisation de 1proxy

Vérifiez l’état de la synchronisation :

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Si `consecutiveFailures >= 5`, le disjoncteur s’est déclenché. Redémarrez le serveur pour le réinitialiser, ou attendez une réinitialisation manuelle.

---

## Schéma de la base de données

### Table `proxy_registry`

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' ou 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (1proxy uniquement)
  latency_ms INTEGER,                        -- millisecondes (1proxy uniquement)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- peut accéder à Google ? (1proxy)
  last_validated TEXT,                       -- horodatage ISO (1proxy)
  country_code TEXT,                         -- code ISO à 2 lettres (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Table `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- ID du fournisseur, ID de connexion ou ID de combinaison
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Vérification de l’état des proxys (v3.8.16+)

Le mécanisme d’**échec rapide des proxys** d’OmniRoute (`src/lib/proxyHealth.ts`) détecte les proxys indisponibles en moins de 2 s grâce à une vérification rapide de la connexion TCP, puis **met le résultat en cache** afin d’éviter une surcharge à chaque requête.

### Fonctionnement

```
Requête ──▶ ProxyHealthCache.get(url)
             │
             ├─ Résultat en cache et récent ?  ──▶ renvoyer l’état en cache
             │
             └─ Résultat absent ou obsolète ?  ──▶ connexion TCP à host:port
                                                    (délai d’expiration : FAST_FAIL_TIMEOUT_MS)
                                                    ──▶ mise en cache pendant HEALTH_CACHE_TTL_MS
                                                    ──▶ renvoyer le résultat
```

Sans ce mécanisme, un proxy indisponible bloquerait chaque requête pendant toute la durée de `PROXY_TIMEOUT_MS` (30 s par défaut) avant d’échouer.

### Variables d’environnement configurables

| Variable                     | Valeur par défaut | Rôle                                                           |
| ---------------------------- | ----------------- | -------------------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`            | Délai d’expiration de la connexion TCP par vérification d’état |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`           | Durée de mise en cache d’un résultat de vérification d’état    |

**Valeurs recommandées :**

| Scénario                            | Délai d’échec rapide | Durée de vie du cache | Justification                                                                                       |
| ----------------------------------- | -------------------- | --------------------- | --------------------------------------------------------------------------------------------------- |
| Passerelle API à haut débit         | 1500ms               | 60000ms               | Échec rapide agressif et cache plus long pour réduire le nombre de vérifications                    |
| Nœuds géodistribués                 | 3000ms               | 15000ms               | Les réseaux plus lents nécessitent davantage de temps ; cache plus court pour un basculement rapide |
| Développement / tests               | 1000ms               | 10000ms               | Itérations rapides sur les proxys locaux                                                            |
| Furtivité / prévention de détection | 2500ms               | 45000ms               | Évite les sondages rapides susceptibles de déclencher des limites de débit                          |

### Inspection de l’état des proxys

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Forcer une nouvelle vérification d’un proxy spécifique
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

L’indicateur `stale` vaut `true` lorsque l’entrée du cache a dépassé `HEALTH_CACHE_TTL_MS` et que la requête suivante déclenchera une nouvelle vérification.

### Valeurs par défaut selon le type de proxy

La vérification d’état utilise des valeurs par défaut adaptées au schéma de l’URL :

| Schéma                     | Port par défaut |
| -------------------------- | --------------- |
| `http://`                  | 8080            |
| `https://`                 | 443             |
| `socks5://` / `socks5h://` | 1080            |

Les ports personnalisés indiqués dans l’URL (`http://host:9999`) ont toujours priorité sur la valeur par défaut du schéma.

---

## Analyse et observabilité des proxys

OmniRoute suit l’utilisation de chaque proxy afin d’aider les opérateurs à diagnostiquer les schémas de routage, les pics de latence et les défaillances récurrentes.

### Données suivies

Pour chaque requête transitant par un proxy configuré, OmniRoute enregistre :

| Métrique     | Description                                                        |
| ------------ | ------------------------------------------------------------------ |
| `proxy_url`  | URL complète du proxy (identifiants d’authentification masqués)    |
| `provider`   | ID du fournisseur en amont (openai, anthropic, etc.)               |
| `latency_ms` | Durée totale de l’aller-retour, négociation avec le proxy comprise |
| `connect_ms` | Durée de connexion TCP uniquement                                  |
| `status`     | Code d’état HTTP provenant du service en amont                     |
| `error`      | Classe d’erreur en cas d’échec de la requête                       |
| `timestamp`  | UTC au format ISO 8601                                             |

### Accès aux données

```bash
# Événements récents des proxys
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Le point de terminaison réel est `/api/usage/proxy-logs` (voir `src/app/api/usage/proxy-logs/route.ts`). Ce point de terminaison prend en charge :

- `GET /api/usage/proxy-logs` — récupérer les journaux des proxys
- `DELETE /api/usage/proxy-logs` — effacer tous les journaux des proxys

Si nécessaire, les statistiques agrégées peuvent être interrogées directement dans la table `proxy_logs` via SQL. L’interface du tableau de bord peut proposer des vues agrégées.

### Schémas courants

**Détecter un proxy instable** (alternant entre succès et échec) :

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**Trouver les proxys lents** (latence p95 > 2 s) :

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## Arbre de décision pour la stratégie de rotation

Lorsque plusieurs proxys sont affectés à une portée, OmniRoute utilise une **stratégie de rotation** pour choisir celui à utiliser pour chaque requête. La stratégie est configurée au niveau de la portée (globale, par fournisseur, par compte ou par combinaison).

### Stratégies disponibles

| Stratégie              | Cas d’utilisation                              | Compromis                                                                                  |
| ---------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `quality` (par défaut) | Production avec des proxys de qualité variable | Favorise les proxys les mieux notés ; peut priver de trafic ceux qui sont moins bien notés |
| `random`               | Répartition de la charge, confidentialité      | Répartition uniforme ; ignore les indicateurs de qualité                                   |
| `sequential`           | Débogage, tests déterministes                  | Parcourt les proxys dans l’ordre ; comportement facile à comprendre                        |

### Arbre de décision

```
                    Disposez-vous de scores de qualité pour vos proxys ?
                    │
        ┌───────────┴───────────┐
        │                       │
       OUI                     NON
        │                       │
   Tous les proxys             │
   ont-ils une qualité          │
   à peu près équivalente ?     │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  OUI       NON              Utilisez
   │         │              `random`
   │         │              (la répartition
   │         │              uniforme constitue
   │         │              progressivement des
   │         │              données de qualité)
   │         │
   │    Utilisez `quality`
   │    (idéal pour une
   │    qualité variable)
   │
Utilisez `random`
(répartissez la charge
uniformément)
```

## Exclusion automatique des pannes pour vos propres proxys

Le pool de la marketplace 1proxy dégrade déjà automatiquement les proxys défaillants (voir
[Scores de qualité des proxys](#proxy-quality-scores)). Pour les
proxys que **vous** avez ajoutés au registre, le planificateur de vérification d’intégrité en arrière-plan
(`src/lib/proxyHealth/scheduler.ts`) fournit le même comportement permettant
« d’exclure automatiquement de la chaîne un membre hors service », sans rien supprimer :

```bash
# .env — désactiver temporairement un proxy après 3 sondes consécutives en échec,
# puis le réactiver automatiquement dès qu’il recommence à répondre aux sondes.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Fonctionnement au sein d’une chaîne de plusieurs proxys :

1. Le planificateur sonde chaque proxy enregistré toutes les `PROXY_HEALTH_INTERVAL_MS`
   (10 min par défaut ; 1 min au minimum).
2. Après `PROXY_AUTO_REMOVE_AFTER` échecs **concluants** consécutifs (un véritable
   échec de connexion — un délai d’attente dépassé ou une erreur 5xx provenant de la cible de la sonde ne compte jamais, voir
   [Vérification de l’intégrité des proxys](#proxy-health-checking-v3816)), le `status` du proxy est
   défini sur `dead`.
3. `dead` fait partie des statuts exclus par le filtre des statuts actifs utilisé lors de la
   résolution du pool/de la rotation. La rotation d’un périmètre (round-robin / aléatoire / persistante /
   latence — voir [Arbre de décision de la stratégie de rotation](#rotation-strategy-decision-tree))
   cesse donc immédiatement d’attribuer ce proxy aux nouvelles requêtes. Aucun autre proxy du
   pool n’est affecté, et l’ensemble du pool ne bascule jamais silencieusement vers une connexion
   directe — voir le mécanisme de protection à fermeture sécurisée du [Système de proxys à 4 niveaux](#4-level-proxy-system).
4. Le planificateur continue de sonder les proxys `dead` selon le même intervalle. La prochaine
   sonde réussie rétablit le `status` sur `active`, et le proxy réintègre la rotation —
   aucun ajout manuel n’est nécessaire.

Ce comportement est délibérément **optionnel et non destructif** : par défaut, le planificateur se contente de
compter et de journaliser les échecs (voir la politique C dans `decision.ts`), et `PROXY_AUTO_DISABLE`
ne supprime jamais aucune ligne — c’est le rôle de l’option distincte et plus agressive
`PROXY_AUTO_REMOVE`. Si les deux sont définies sur `true`, `PROXY_AUTO_REMOVE`
est prioritaire (il est inutile de désactiver temporairement un proxy sur le point d’être supprimé). Consultez
la référence [Configuration de l’environnement](../reference/ENVIRONMENT.md) pour obtenir la liste complète
des variables.

---

> 📖 **Documentation associée :**
>
> - [Guide de l’utilisateur](../guides/USER_GUIDE.md) — Installation et configuration générales
> - [Référence de l’API](../reference/API_REFERENCE.md) — Documentation complète de l’API
> - [Configuration de l’environnement](../reference/ENVIRONMENT.md) — Toutes les variables d’environnement
