# Plugin Marketplace (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Source de vérité :** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` et
> `src/app/(dashboard)/dashboard/plugins/`
> **Dernière mise à jour :** 2026-06-28 — v3.8.40

OmniRoute fournit un système de plugins inspiré de WordPress. Les plugins sont des
répertoires autonomes — chacun comprenant un manifeste `plugin.json` et un fichier
d'entrée — qui se greffent au pipeline de requêtes (`onRequest` / `onResponse` /
`onError`) ainsi qu'aux événements du cycle de vie (`onInstall` / `onActivate` /
`onDeactivate` / `onUninstall`).

La **place de marché des plugins** constitue la couche de découverte qui complète
ce système. Elle expose un catalogue consultable de plugins disponibles à
l'installation. Par défaut, le catalogue est un petit registre initial intégré ;
un opérateur peut le faire pointer vers l'URL d'un registre distant personnalisé,
auquel cas la récupération est sécurisée par une protection SSRF avec résolution
DNS (voir [Sécurité](#security)).

Toutes les routes de plugins sont **accessibles uniquement en boucle locale**
(niveau 1 — `LOCAL_ONLY`) : les plugins chargent et exécutent du code dans des
processus enfants ; les routes sont donc inaccessibles depuis une origine autre
que la boucle locale, indépendamment de l'authentification. Consultez
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Fonctionnement général

```
Tableau de bord (/dashboard/plugins)
  ├─ Onglet « Installés »       → GET /api/plugins            (listPlugins)
  │                               POST /api/plugins/scan      (pluginManager.scan)
  │                               POST /api/plugins/{name}/activate|deactivate
  │                               DELETE /api/plugins/{name}   (désinstallation)
  └─ Onglet « Place de marché » → GET /api/plugins/marketplace
                                    → listMarketplacePlugins()
                                      ├─ aucune URL personnalisée → SEED_REGISTRY intégré
                                      └─ URL personnalisée → protection SSRF isSafeMarketplaceUrl()
                                                               → safeOutboundFetch(guard:"public-only")
```

- **Couche de registre** — `src/lib/plugins/marketplace.ts` : répertorie/recherche
  les éléments du catalogue et se rabat sur le registre initial en cas d'échec.
- **Couche de cycle de vie** — `src/lib/plugins/manager.ts` (singleton
  `pluginManager`) : installation, mise à niveau, activation, désactivation,
  désinstallation, analyse et chargement au démarrage.
- **Couche de manifeste** — `src/lib/plugins/manifest.ts` : schéma Zod et valeurs
  par défaut de `plugin.json`.
- **Analyseur** — `src/lib/plugins/scanner.ts` : découvre les plugins présents sur
  le disque dans le répertoire des plugins.
- **Chargeur** — `src/lib/plugins/loader.ts` : lance chaque plugin dans un
  processus enfant isolé et assure le relais des appels de hooks via IPC.

## Catalogue de la place de marché

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) renvoie une liste
d'objets `MarketplaceEntry` :

| Champ         | Type     | Remarques                                      |
| ------------- | -------- | ---------------------------------------------- |
| `name`        | string   | Nom du plugin en kebab-case                    |
| `version`     | string   | semver                                         |
| `description` | string   | Résumé succinct                                |
| `author`      | string   | Auteur/organisation                            |
| `license`     | string   | Identifiant de licence de type SPDX            |
| `downloadUrl` | string   | URL de téléchargement source (peut être vide)  |
| `repository`  | string?  | URL facultative du dépôt                       |
| `tags`        | string[] | Étiquettes de recherche/filtrage               |
| `downloads`   | number   | Nombre de téléchargements                      |
| `rating`      | number   | 0–5                                            |
| `verified`    | boolean  | Indique si l'entrée est marquée comme vérifiée |
| `lastUpdated` | string   | Chaîne de date au format proche d'ISO          |

Lorsqu'aucune URL de registre personnalisée n'est configurée, le catalogue
correspond au `SEED_REGISTRY` intégré (actuellement `request-logger`,
`rate-limiter`, `cost-tracker` et `theme-manager`). Le registre initial est
toujours disponible : si un registre distant configuré est inaccessible, renvoie
un statut autre que `200` ou un corps non reconnu, `listMarketplacePlugins()`
journalise un avertissement et se rabat sur la liste initiale.

> Remarque : le **catalogue** de la place de marché (navigation/recherche) est
> entièrement intégré, mais l'**installation** en un clic depuis le catalogue
> n'est pas encore implémentée — le bouton « Installer » du tableau de bord pour
> une entrée de la place de marché affiche actuellement un avis indiquant que
> cette fonctionnalité sera bientôt disponible. Pour le moment, l'installation
> s'effectue au moyen du flux d'installation depuis un chemin local
> (`POST /api/plugins`) et de la découverte sur disque (`POST /api/plugins/scan`).

## API REST

Tous les points de terminaison nécessitent une authentification de gestion (`requireManagementAuth`) **et** sont
accessibles uniquement depuis l’interface de bouclage — `/api/plugins` et `/api/plugins/` figurent dans
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Point de terminaison             | Méthode | Description                                                              |
| -------------------------------- | ------- | ------------------------------------------------------------------------ |
| `/api/plugins`                   | GET     | Répertorier les plugins installés (filtre `?status=` facultatif)         |
| `/api/plugins`                   | POST    | Installer un plugin depuis un chemin local absolu                        |
| `/api/plugins/scan`              | POST    | Analyser le répertoire des plugins et enregistrer les nouveaux plugins   |
| `/api/plugins/marketplace`       | GET     | Répertorier les entrées du catalogue de la marketplace                   |
| `/api/plugins/[name]`            | GET     | Obtenir les détails d’un plugin installé                                 |
| `/api/plugins/[name]`            | DELETE  | Désinstaller un plugin                                                   |
| `/api/plugins/[name]/activate`   | POST    | Activer (charger + enregistrer les hooks)                                |
| `/api/plugins/[name]/deactivate` | POST    | Désactiver (déclencher `onDeactivate`, désenregistrer les hooks)         |
| `/api/plugins/[name]/config`     | GET     | Obtenir la configuration du plugin + son schéma de configuration         |
| `/api/plugins/[name]/config`     | PUT     | Mettre à jour la configuration du plugin (validée par rapport au schéma) |

Le filtre `status` de `GET /api/plugins` accepte l’une des valeurs suivantes :
`installed` / `active` / `inactive` / `error`. Une valeur non valide renvoie `400`.

### Répertorier les plugins installés

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Installer depuis un chemin local

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

Le `path` doit être **absolu** et ne peut pas contenir de segments de traversée `..` ni
d’octets nuls (contrainte appliquée par Zod). Le répertoire source doit contenir un
`plugin.json` valide (ou être le parent d’un tel répertoire). En cas de réussite, la réponse est `201` et contient
la ligne du plugin installé.

### Parcourir la marketplace

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Mettre à jour la configuration du plugin

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` valide chaque valeur fournie par rapport au
`configSchema` du plugin (déclaré dans le manifeste) : les champs `number` respectent `min`/`max`,
les champs `select` doivent correspondre à l’`enum` déclarée. Les clés absentes du schéma
sont autorisées.

## Configuration

### Répertoire des plugins

Les plugins se trouvent dans le répertoire de données d’OmniRoute :

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (ou tout autre fichier indiqué par manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) résout ce répertoire en
trois étapes :

1. **`OMNIROUTE_PLUGINS_DIR`**, lorsqu’elle est définie — utilisée telle quelle, indépendamment de la valeur de `HOME`. Il s’agit
   du paramètre explicite pour Docker/K8s, où l’arborescence des plugins est montée par liaison à un chemin
   qui n’a généralement aucun rapport avec le répertoire personnel du conteneur (#11827).
2. `<home>/.omniroute/plugins`, où `<home>` provient des variables d’environnement `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, lorsque le processus n’exporte aucun répertoire personnel.

Le répertoire résolu est journalisé une fois au démarrage sous `scanner.dir_resolved`, en indiquant
l’entrée retenue (`OMNIROUTE_PLUGINS_DIR`, `home` ou `no-home-fallback`) — ainsi, une image
qui aboutit silencieusement à l’étape 3 le signale, au lieu d’indiquer uniquement une liste de plugins vide.
`POST /api/plugins/scan` découvre tout sous-répertoire qui contient un
`plugin.json` valide et l’enregistre ; ce même répertoire est la racine dans laquelle
`pluginManager.install()` copie les plugins, de sorte qu’une substitution déplace conjointement la découverte et
l’installation.

> **`OMNIROUTE_PLUGINS_DIR` n’est pas `OMNIROUTE_PLUGIN_PATH`.** Cette dernière est lue uniquement par
> le chargeur de plugins de commande de la CLI (`bin/cli/plugins.mjs`) afin de trouver les paquets npm
> `omniroute-cmd-*` qui ajoutent des sous-commandes à `omniroute` — elle n’a aucun effet sur l’analyseur d’exécution
> décrit ici. Consultez [PLUGINS.md](./PLUGINS.md) pour cet aspect.

### URL personnalisée du registre de la marketplace

La source du catalogue de la marketplace est lue depuis le paramètre `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` lit `settings.pluginMarketplaceUrl`). Lorsqu’il
est défini sur une URL `http(s)`, `listMarketplacePlugins()` récupère cette URL et accepte
soit un tableau JSON d’entrées au niveau racine, soit un objet contenant un tableau `plugins` ;
les entrées dépourvues d’un `name` de type chaîne sont filtrées. Lorsque le paramètre n’est pas défini (ou lorsque la récupération
échoue à cause de la protection SSRF / renvoie une réponse incorrecte), le registre initial intégré est
utilisé.

L’onglet « Marketplace » du tableau de bord expose un champ pour cette URL (relue depuis
`GET /api/settings`).

> Remarque d’implémentation : l’action « Enregistrer » du tableau de bord envoie
> `pluginMarketplaceUrl` à `PATCH /api/settings`. Au moment de la rédaction, cette
> clé n’est pas déclarée dans `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`) ; vérifiez donc sa persistance dans votre
> version avant de vous y fier — le chemin de **lecture** (`getSettings()` →
> `listMarketplacePlugins()`) prend en compte la clé dès qu’elle est présente dans le magasin
> de paramètres.

## Sécurité

### Niveau de route — boucle locale uniquement

Les plugins exécutent du code dans des processus enfants générés, de sorte que
l’ensemble de la surface `/api/plugins` est classé `LOCAL_ONLY` (niveau 1).
L’application de la restriction à la boucle locale s’effectue systématiquement
**avant** toute vérification d’authentification ; ainsi, même si un jeton de
gestion divulgué atteint la machine via un tunnel, il ne peut toujours pas
installer, activer ou désinstaller un plugin.
Consultez [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md)
et les règles strictes nº 15 / nº 17.

### Protection SSRF du registre de la place de marché

Une URL de registre personnalisée est une configuration susceptible d’être
influencée par un attaquant. Par conséquent, avant de la récupérer,
`listMarketplacePlugins()` la soumet à deux couches de protection :

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`) :
   - Rejette tout ce qui n’utilise pas `http:` / `https:`.
   - Rejette les hôtes littéraux privés/de boucle locale/link-local/ULA (IPv4
     **et** IPv6, y compris les adresses IPv4 mappées) via la fonction canonique
     `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Résout **à la fois** les enregistrements `A` et `AAAA`, puis rejette l’URL
     si **l’une quelconque** des adresses résolues est privée, empêchant ainsi
     le contournement nom d’hôte public → adresse IP privée.
   - **Échoue en mode fermé** : un échec de résolution DNS entraîne le rejet de
     l’URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`) : applique de nouveau la
   protection d’URL limitée aux adresses publiques au moment de la récupération
   et **bloque les redirections** (aucun pivot public → privé via `30x`).

Une URL qui échoue à l’une ou l’autre couche n’interrompt pas la requête : la
place de marché revient silencieusement au registre initial intégré et consigne
un avertissement.

> Cette protection a été renforcée dans la PR nº 3774 afin de résoudre
> spécifiquement les enregistrements A + AAAA et d’utiliser la fonction
> canonique `isPrivateHost` au lieu d’une vérification limitée à IPv4.

### Isolation de l’exécution des plugins

- **Isolation des processus** — `loadPlugin()` (`src/lib/plugins/loader.ts`)
  génère chaque plugin dans un processus enfant Node.js distinct et communique
  via IPC. Les appels de hooks disposent d’un délai d’expiration avec une
  escalade `SIGTERM` → `SIGKILL`.
- **Liste d’autorisation des variables d’environnement** — le processus enfant
  ne reçoit qu’un ensemble autorisé de variables d’environnement ; l’ensemble
  plus large n’est accordé que lorsque le manifeste demande l’autorisation
  `env`.
- **Confinement des chemins** — l’installation/la mise à niveau/la
  désinstallation vérifient que le répertoire du plugin et `manifest.main` sont
  résolus **à l’intérieur** de la racine gérée des plugins avant toute copie ou
  suppression récursive (protection contre les chemins de base de données
  falsifiés et la traversée `../` dans `manifest.main`). L’activation résout les
  liens symboliques via `realpath` et refuse de charger un point d’entrée qui
  sort du répertoire du plugin.
- **Épinglage facultatif de l’intégrité** — un manifeste peut déclarer un champ
  `integrity` (`sha256-<base64>`, format SRI). Lorsqu’il est présent, le chargeur
  vérifie le hachage du fichier d’entrée au moment du chargement et refuse
  l’activation en cas de non-correspondance. Il s’agit d’une détection
  facultative des altérations, **et non** d’une frontière de sécurité — le
  routage limité à la boucle locale et le modèle d’autorisations constituent
  les véritables frontières.

## Manifeste (`plugin.json`)

Validé par `PluginManifestSchema` (`src/lib/plugins/manifest.ts`) :

| Champ              | Type      | Remarques                                                                  |
| ------------------ | --------- | -------------------------------------------------------------------------- |
| `name`             | string    | Obligatoire ; casse kebab (`^[a-z0-9-]+$`), 1 à 100 caractères             |
| `version`          | string    | Obligatoire ; semver (`MAJOR.MINOR.PATCH`)                                 |
| `description`      | string?   | ≤ 500 caractères                                                           |
| `author`           | string?   | ≤ 200 caractères                                                           |
| `license`          | string?   | Valeur par défaut : `MIT`                                                  |
| `main`             | string?   | Fichier d’entrée ; valeur par défaut : `index.js`                          |
| `source`           | enum?     | `local` \| `marketplace` (valeur par défaut : `local`)                     |
| `tags`             | string[]? | Balises de recherche                                                       |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                            |
| `hooks`            | object?   | Booléens indiquant les hooks implémentés par le plugin                     |
| `skills`           | object[]? | Définitions facultatives de compétences                                    |
| `enabledByDefault` | boolean?  | Activation automatique lors de l’installation                              |
| `configSchema`     | object?   | Mappage des champs de configuration (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Épinglage facultatif du fichier d’entrée avec `sha256-<base64>`            |

Les autorisations proviennent de l’énumération
`network` / `file-read` / `file-write` / `env` / `exec`.

## Flux du cycle de vie

```
installation (POST /api/plugins, chemin)
  → analyser/valider le manifeste → copier vers la zone de préproduction → vérifier que main se trouve dans le répertoire
  → renommage atomique vers ~/.omniroute/plugins/<name> → insérer une ligne en base de données
  → déclencher onInstall → si enabledByDefault : activer

activation (POST /api/plugins/{name}/activate)
  → vérifier le confinement via realpath → loadPlugin() (lancer un processus enfant)
  → enregistrer les hooks déclarés → status = "active" → déclencher onActivate

désactivation (POST /api/plugins/{name}/deactivate)
  → déclencher onDeactivate (AVANT la désinscription) → désinscrire les hooks
  → arrêter le processus enfant → status = "inactive"

désinstallation (DELETE /api/plugins/{name})
  → désactiver s'il est actif → déclencher onUninstall
  → suppression récursive, avec vérification du confinement, du répertoire du plugin → supprimer la ligne de la base de données
```

La réexécution de `install` sur un répertoire dont la version du manifeste est **strictement
plus récente** que la version installée déclenche une mise à niveau automatique (réinstallation propre ; la configuration est réinitialisée
aux valeurs par défaut). Une version identique ou antérieure est refusée.

## Base de données

Table `plugins` (migration `076_create_plugins.sql`) :

| Colonne         | Type    | Notes                                                            |
| --------------- | ------- | ---------------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                             |
| `name`          | TEXT    | Unique                                                           |
| `version`       | TEXT    | semver ; valeur par défaut `1.0.0`                               |
| `description`   | TEXT    | Facultatif                                                       |
| `author`        | TEXT    | Facultatif                                                       |
| `license`       | TEXT    | Valeur par défaut `MIT`                                          |
| `main`          | TEXT    | Fichier d'entrée ; valeur par défaut `index.js`                  |
| `source`        | TEXT    | Valeur par défaut `local`                                        |
| `tags`          | TEXT    | Tableau JSON ; valeur par défaut `[]`                            |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`                 |
| `enabled`       | INT     | 0/1 ; valeur par défaut 0                                        |
| `manifest`      | TEXT    | JSON complet du manifeste                                        |
| `config`        | TEXT    | JSON ; valeur par défaut `{}`                                    |
| `config_schema` | TEXT    | JSON ; valeur par défaut `{}`                                    |
| `hooks`         | TEXT    | Tableau JSON des noms de hooks déclarés ; valeur par défaut `[]` |
| `permissions`   | TEXT    | Tableau JSON ; valeur par défaut `[]`                            |
| `plugin_dir`    | TEXT    | Répertoire d'installation absolu                                 |
| `error_message` | TEXT    | Défini lorsque `status = "error"`                                |
| `installed_at`  | TEXT    | `datetime('now')`                                                |
| `updated_at`    | TEXT    | `datetime('now')`                                                |
| `activated_at`  | TEXT    | Défini lors de l'activation                                      |

Les métriques et analyses des plugins sont suivies dans des tables supplémentaires
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Tableau de bord

La page du tableau de bord située à `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) comporte deux onglets :

- **Installés** — répertorie les plugins installés avec leurs hooks déclarés, un
  bouton permettant de les activer ou de les désactiver, un bouton de désinstallation et une action « Rechercher des plugins »
  (`POST /api/plugins/scan`).
- **Place de marché** — affiche le catalogue obtenu depuis `GET /api/plugins/marketplace` avec un
  champ permettant de définir l'URL du registre personnalisé.

Une page de configuration propre à chaque plugin se trouve à `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Voir aussi

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  pourquoi `/api/plugins` est accessible uniquement via l’interface de bouclage (niveau 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — le framework de compétences associé
  (`src/lib/skills/`) ; les plugins peuvent déclarer des compétences dans leur manifeste
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — intégrations sortantes
  pilotées par des événements
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  le modèle `buildErrorBody()` utilisé par chaque route de plugin pour les réponses d’erreur
