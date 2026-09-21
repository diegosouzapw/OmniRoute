# OmniRoute MCP Server Documentation (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Serveur Model Context Protocol proposant 110 outils pour les opérations de routage, de cache, de compression, de mémoire, de compétences, de proxy, de pool, de Radar et de sources de contexte.
>
> Source de référence : `open-sse/mcp-server/server.ts` calcule **110 outils uniques** avec `countUniqueMcpTools()` : 45 définitions canoniques (dont les six outils de cycle de vie CCR, le trio agent-skills, `omniroute_radar_catalog` et `omniroute_x_search`), plus la mémoire (3), les compétences (4), les compétences GitHub (3), le pool (6), la ludification (8), les plugins (8), Notion (6), Obsidian (22), le corpus local (3) et deux outils de compression réservés à RTK.

## Installation

OmniRoute MCP est intégré. Démarrez-le avec :

```bash
omniroute --mcp
```

Ou via le transport open-sse :

```bash
# Transport HTTP diffusable (port 20130)
omniroute --dev  # MCP démarre automatiquement sur le point de terminaison /mcp
```

Les transports HTTP (`sse` / `streamable-http`, servis dans le même processus par le serveur du tableau de bord) sont
désactivés par défaut et ne pouvaient auparavant être activés ou désactivés que depuis la page `/dashboard/mcp`. Depuis la v3.8.51,
la CLI offre les mêmes fonctionnalités :

```bash
omniroute mcp status                                  # état activé/en ligne, transport, nombre d’outils
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # réinitialise les sessions sse/streamable-http actives
```

`mcp enable`/`mcp disable` envoient une requête PATCH au même paramètre `mcpEnabled` (et éventuellement à `mcpTransport`)
que celui contrôlé par le tableau de bord via `/api/settings`. `mcp restart` appelle `POST /api/mcp/restart` : cette commande met
fin aux sessions `sse`/`streamable-http` actives afin que la requête suivante effectue une réinitialisation propre, renvoie
`409` si MCP est désactivé et `501` pour le transport `stdio` (les clients stdio gèrent leur propre
sous-processus — il n’existe aucun descripteur dans le processus permettant de le redémarrer).

## Transports

Le serveur MCP expose trois transports, tous reposant sur la même fabrique `createMcpServer()` :

| Transport         | Emplacement                                 | Cas d’utilisation                                              |
| :---------------- | :------------------------------------------ | :------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | Intégrations aux IDE (Claude Desktop, Cursor, etc.)            |
| `sse`             | `POST/GET /api/mcp/sse` via `httpTransport` | Clients de navigateur/d’agent nécessitant un flux d’événements |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | Clients HTTP multisessions (en-tête `mcp-session-id`)          |

Le transport HTTP actif (`sse` ou `streamable-http`) est sélectionné par le paramètre `mcpTransport`. Le changement de transport ferme les sessions existantes sur l’autre transport.

### Accès distant (contournement via la portée manage)

`/api/mcp/*` appartient au niveau LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — par défaut, seuls les hôtes de bouclage (`localhost`, `127.0.0.1`, `::1`) peuvent y accéder. Depuis la v3.8.2, les clients hors bouclage peuvent se connecter s’ils présentent un en-tête `Authorization: Bearer <api-key>` dont la clé possède la portée `manage`. Il s’agit du seul moyen d’accéder au serveur MCP distant par l’intermédiaire d’un tunnel, d’un proxy inverse ou d’un nom d’hôte public.

```bash
# Accordez la portée manage : ouvrez la page API Keys du tableau de bord et activez
# « Management Access » pour la clé, ou utilisez POST avec scopes:["manage"] lors de sa création.

# Connectez-vous ensuite depuis un client MCP distant :
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Une clé sans portée `manage` (ou l’absence de jeton Bearer) renvoie `403 LOCAL_ONLY`. Le préfixe voisin `/api/cli-tools/runtime/*` ne peut intentionnellement PAS bénéficier de ce contournement — consultez [Niveaux de protection des routes — exception pour la portée manage](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Configuration de l’IDE

Consultez [Configuration du client MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) pour configurer Claude Desktop,
Cursor, Cline et les clients MCP compatibles.

---

## Outils essentiels (14) — Phase 1

| Outil                           | Portées               | Description                                                                                                                                              |
| :------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Disponibilité, mémoire, disjoncteurs, limites de débit, statistiques du cache                                                                            |
| `omniroute_list_combos`         | `read:combos`         | Tous les combos configurés avec leurs stratégies (métriques facultatives)                                                                                |
| `omniroute_get_combo_metrics`   | `read:combos`         | Métriques de performance pour un combo spécifique                                                                                                        |
| `omniroute_switch_combo`        | `write:combos`        | Activer ou désactiver un combo                                                                                                                           |
| `omniroute_create_combo`        | `write:combos`        | Créer un combo validé via l’API de combos existante                                                                                                      |
| `omniroute_check_quota`         | `read:quota`          | Quota utilisé/total, pourcentage restant, heure de réinitialisation, état des jetons                                                                     |
| `omniroute_route_request`       | `execute:completions` | Envoyer une requête de complétion de chat via le routage OmniRoute                                                                                       |
| `omniroute_cost_report`         | `read:usage`          | Rapport des coûts par période (session/jour/semaine/mois)                                                                                                |
| `omniroute_list_models_catalog` | `read:models`         | Catalogue complet des modèles avec fonctionnalités, état et tarification                                                                                 |
| `omniroute_radar_catalog`       | `read:radar`          | Catalogue Radar local signé ; filtres facultatifs par fournisseur/famille                                                                                |
| `omniroute_tool_search`         | `read:tools`          | Découvrir les outils du catalogue MCP enregistré                                                                                                         |
| `omniroute_web_search`          | `execute:search`      | Recherche sur le Web via les fournisseurs de recherche configurés. Hors X/Twitter.                                                                       |
| `omniroute_x_search`            | `execute:search`      | Rechercher sur X via xAI/SuperGrok, ou choisir `xquik-search` pour les résultats de l’API Xquik. Nécessite des identifiants pour le backend sélectionné. |
| `omniroute_web_fetch`           | `execute:search`      | Récupérer du contenu Web via les fournisseurs de récupération configurés                                                                                 |

## Outils avancés (11) — Phase 2

| Outil                              | Portées                              | Description                                                                                                                                                        |
| :--------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulation de routage à blanc avec arbre de repli                                                                                                                  |
| `omniroute_set_budget_guard`       | `write:budget`                       | Budget de session avec action de dégradation, de blocage ou d’alerte                                                                                               |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Mise à jour à l’exécution de la stratégie de combinaison (priorité/pondérée/automatique/etc.)                                                                      |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Application du préréglage de résilience `aggressive` / `balanced` / `conservative`                                                                                 |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Test en direct de chaque fournisseur d’une combinaison au moyen d’un véritable appel au service distant                                                            |
| `omniroute_get_provider_metrics`   | `read:health`                        | Métriques par fournisseur avec latence p50/p95/p99 et état du disjoncteur                                                                                          |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Recommandation d’une combinaison selon le type de tâche, avec contraintes de budget et de latence                                                                  |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Explication du choix du fournisseur pour une requête (facteurs de notation + solutions de repli)                                                                   |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Instantané complet de la session : coût, jetons, principaux modèles/fournisseurs, erreurs, garde-budget                                                            |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnostic (et réparation automatique facultative) des incohérences de base de données, telles que les références de combinaisons rompues et les lignes orphelines |
| `omniroute_sync_pricing`           | `pricing:write`                      | Synchronisation des données tarifaires depuis des sources externes (LiteLLM) ; prend en charge `dryRun`                                                            |

## Outils de cache (2)

| Outil                   | Portées       | Description                                                              |
| :---------------------- | :------------ | :----------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Statistiques du cache sémantique, du cache d’invites et de l’idempotence |
| `omniroute_cache_flush` | `write:cache` | Vidage global du cache ou par signature/modèle                           |

## Outils de compression (13)

| Outil                               | Portées             | Description                                                                                                                                                     |
| :---------------------------------- | :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Paramètres de compression, résumé analytique et statistiques tenant compte du cache (inclut les métadonnées `analytics.mcpDescriptionCompression`)              |
| `omniroute_compression_configure`   | `write:compression` | Configuration du mode de compression, du seuil, du taux cible, de la conservation de l’invite système et de l’activation de la compression des descriptions MCP |
| `omniroute_set_compression_engine`  | `write:compression` | Sélection du moteur actif (off/caveman/rtk/stacked) et de l’intensité de Caveman/RTK                                                                            |
| `omniroute_list_compression_combos` | `read:compression`  | Liste des combinaisons de compression nommées et des chaînes de traitement de leurs moteurs                                                                     |
| `omniroute_compression_combo_stats` | `read:compression`  | Données analytiques regroupées par combinaison de compression et par moteur                                                                                     |
| `omniroute_ccr_store`               | `write:compression` | Stockage de contenu isolé par appelant dans le magasin CCR borné en mémoire et renvoi d’un marqueur ainsi que d’une référence `ccr://`                          |
| `omniroute_ccr_retrieve`            | `read:compression`  | Récupération du contenu CCR en totalité ou à l’aide des modes début, fin, lignes, grep et statistiques                                                          |
| `omniroute_ccr_inspect`             | `read:compression`  | Inspection des métadonnées CCR appartenant à l’appelant sans renvoyer le contenu                                                                                |
| `omniroute_ccr_list`                | `read:compression`  | Liste paginée des métadonnées des blocs CCR appartenant à l’appelant                                                                                            |
| `omniroute_ccr_delete`              | `write:compression` | Suppression d’un bloc CCR appartenant à l’appelant                                                                                                              |
| `omniroute_ccr_stats`               | `read:compression`  | Rapport sur l’utilisation de la mémoire propre à l’appelant, les compteurs de cycle de vie et les limites du magasin                                            |
| `omniroute_rtk_discover`            | `read:compression`  | Détection du bruit récurrent dans les échantillons de sortie RTK fournis volontairement                                                                         |
| `omniroute_rtk_learn`               | `read:compression`  | Génération d’une ébauche révisable de filtre RTK à partir d’échantillons fournis volontairement                                                                 |

Les entrées CCR résident uniquement en mémoire et disparaissent au redémarrage. Chaque bloc est limité à 2 Mio, chaque
principal à 16 Mio et le magasin global à 64 Mio. Par défaut, les entrées ont une durée de vie de 24 heures (sept
jours au maximum). La récupération MCP complète est limitée à 256 Kio ; les blocs plus volumineux restent accessibles par les
modes de plages et grep. Le stockage, la récupération, l’énumération, l’inspection, la suppression et les statistiques sont isolés selon
le principal de la clé API authentifiée. Les journaux d’audit contiennent des hachages et des métadonnées de taille, jamais le contenu.

`omniroute_compression_status` rapporte séparément la compression des descriptions MCP sous
`analytics.mcpDescriptionCompression`. Ces valeurs sont des estimations de la taille des métadonnées pour les
descriptions MCP pouvant être listées (`tools`, `prompts`, `resources` et `resourceTemplates`) ; elles ne constituent pas des relevés
d’utilisation des fournisseurs et sont marquées avec `source: "mcp_metadata_estimate"`.

### Filtre d’arborescence d’accessibilité MCP (v3.8.0)

Indépendamment des outils de compression ci-dessus, OmniRoute comprend un filtre de post-exécution qui
compresse les **résultats d’outils** des outils MCP de navigateur/d’accessibilité avant qu’ils ne soient renvoyés à
l’agent. Ce filtre n’est pas lui-même un outil — il s’exécute de manière transparente sur tout résultat d’outil contenant
un texte détaillé d’arborescence d’accessibilité ou d’instantané de navigateur (≥2000 caractères).

Comportements principaux :

- Condense ≥30 lignes sœurs consécutives répétées en un résumé comprenant le début et la fin
- Préserve les ancres `[ref=eXX]` requises par Playwright/computer-use
- Tronque de force les textes trop volumineux (>50,000 caractères) avec une indication de navigation
- Économies attendues : **60–80 %** sur les charges utiles d’instantanés de navigateur

Configuration : `compression.mcpAccessibility` dans les paramètres globaux (migration 056).
Implémentation : `open-sse/services/compression/engines/mcpAccessibility/`.
Documentation complète : [Moteurs de compression — Filtre d’arborescence d’accessibilité MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Consultez [Moteurs de compression](../compression/COMPRESSION_ENGINES.md) et [Compression RTK](../compression/RTK_COMPRESSION.md) pour
le modèle de compression à l’exécution sur lequel reposent ces outils.

## Outils 1Proxy (3)

| Outil                       | Portées        | Description                                                                                            |
| :-------------------------- | :------------- | :----------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Récupère des proxys gratuits sur la place de marché 1proxy (filtres par protocole/pays/qualité/limite) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Obtient le prochain proxy disponible selon la stratégie (`random` / `quality` / `sequential`)          |
| `omniroute_oneproxy_stats`  | `read:proxies` | Statistiques du pool, état de la synchronisation, répartition par protocole et par pays                |

## Outils de mémoire (3)

Définis dans `open-sse/mcp-server/tools/memoryTools.ts`. L’authentification et les portées sont appliquées via le pipeline standard des portées MCP.

| Outil                     | Portées        | Description                                                                                              |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Recherche des souvenirs par requête / type / clé API avec application d’un budget de jetons              |
| `omniroute_memory_add`    | `write:memory` | Ajoute une nouvelle entrée de mémoire (`factual` / `episodic` / `procedural` / `semantic`)               |
| `omniroute_memory_clear`  | `write:memory` | Efface les souvenirs associés à une clé API, avec filtrage facultatif par type ou horodatage `olderThan` |

## Outils de compétences (4)

Définis dans `open-sse/mcp-server/tools/skillTools.ts`. Reposent sur `src/lib/skills/registry` + `src/lib/skills/executor`.

| Outil                         | Portées          | Description                                                                                       |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | Répertorie les compétences enregistrées avec filtrage facultatif par clé API, nom ou état activé  |
| `omniroute_skills_enable`     | `write:skills`   | Active ou désactive une compétence spécifique par ID                                              |
| `omniroute_skills_execute`    | `execute:skills` | Exécute une compétence avec les données d’entrée fournies et renvoie l’enregistrement d’exécution |
| `omniroute_skills_executions` | `read:skills`    | Répertorie l’historique récent des exécutions de compétences                                      |

## Source de contexte Notion (6)

Définie dans `open-sse/mcp-server/tools/notionTools.ts`. Le jeton est stocké dans la table `key_value` via `src/lib/db/notion.ts`. Le client REST se trouve dans `src/lib/notion/api.ts`. L’API des paramètres se trouve dans `src/app/api/settings/notion/route.ts`. L’interface du tableau de bord se trouve dans `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Configurez le jeton de votre intégration Notion depuis l’onglet **Sources de contexte** du tableau de bord Endpoint, ou via l’API REST :

```bash
# Définir le jeton
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Vérifier l’état
curl http://localhost:20128/api/settings/notion

# Déconnecter
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Outil                        | Portées        | Description                                                                |
| :--------------------------- | :------------- | :------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Recherche en texte intégral dans toutes les pages et bases de données      |
| `notion_get_page`            | `read:notion`  | Obtient une page par ID avec ses propriétés                                |
| `notion_list_block_children` | `read:notion`  | Répertorie les blocs enfants d’une page ou d’un bloc                       |
| `notion_query_database`      | `read:notion`  | Interroge une base de données avec des filtres, des tris et une pagination |
| `notion_get_database`        | `read:notion`  | Obtient le schéma d’une base de données par ID                             |
| `notion_append_blocks`       | `write:notion` | Ajoute des blocs enfants à un bloc parent (100 maximum par requête)        |

## Outils du catalogue de compétences d’agent (3)

Définis dans `open-sse/mcp-server/tools/agentSkillTools.ts`. Basés sur `src/lib/agentSkills/catalog`. Ces outils exposent aux clients MCP et aux agents externes le catalogue de documentation des 45 compétences d’agent. Portée : `read:catalog`.

| Outil                             | Portées        | Description                                                                                                                                                                                      |
| :-------------------------------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Répertorie les 45 compétences d’agent avec des filtres facultatifs `category` (api\|cli) et `area` ; renvoie les métadonnées et la couverture                                                    |
| `omniroute_agent_skills_get`      | `read:catalog` | Obtient les métadonnées complètes et le contenu de SKILL.md pour une compétence donnée à partir de son `id` canonique                                                                            |
| `omniroute_agent_skills_coverage` | `read:catalog` | Statistiques de couverture : nombre de compétences parmi les 23 API, 21 CLI et 1 de configuration disposant de fichiers SKILL.md sur le système de fichiers, par rapport aux totaux du catalogue |

Consultez [AGENT-SKILLS.md](./AGENT-SKILLS.md) pour découvrir le catalogue complet et la manière dont les agents externes l’utilisent.

## Frameworks associés (v3.8.0)

L’inventaire des outils MCP ci-dessus (110 outils uniques, calculés par `countUniqueMcpTools()`) est intentionnellement
limité aux opérations d’exécution relatives au routage, au cache, à la compression, à la mémoire, aux compétences, au proxy et aux sources de contexte. Deux frameworks adjacents
sont fournis avec le serveur MCP dans v3.8.0 et font l’objet d’une documentation distincte :

### Agents cloud

Les agents cloud sont des agents de codage IA hors processus (codex-cloud, cursor-cloud, devin, jules) intégrés à
OmniRoute au moyen du même modèle de connexion que celui utilisé pour les fournisseurs de LLM. Ils sont exposés via
leur propre interface REST (`/api/v1/agents/*`) et ne font **pas** partie du catalogue d’outils MCP
— l’appel d’un agent cloud ne consomme aucune portée MCP.

- Implémentation : `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Cycle de vie : `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Documentation : [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Garde-fous

Les garde-fous sont des filtres pré/post-exécution (vision-bridge, pii-masker, prompt-injection)
appliqués dans le pipeline de discussion. Ils s’exécutent avant que la couche d’outils/de routage MCP ne soit atteinte
et émettent des violations structurées vers le pipeline d’audit ; ils ne sont pas invoqués en tant qu’outils MCP.

- Implémentation : `src/lib/guardrails/`.
- Documentation : [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Lors du débogage d’un appel MCP qui semble bloqué, vérifiez à la fois le journal d’audit MCP
(entrées `scope_denied:*`) et la piste d’audit des garde-fous — une requête peut être rejetée par
un garde-fou **avant** même d’atteindre la couche d’application des portées MCP.

---

## Points de terminaison de l’API REST

| Point de terminaison   | Méthode               | Description                                                                                                           | Authentification                 |
| :--------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------------------- | :------------------------------- |
| `/api/mcp/status`      | `GET`                 | État du serveur : signal de vie, état du transport HTTP, résumé de l’activité d’audit                                 | Gestion (session/administrateur) |
| `/api/mcp/tools`       | `GET`                 | Catalogue d’outils (nom, description, portées, phase, points de terminaison sources)                                  | Gestion                          |
| `/api/mcp/sse`         | `GET` / `POST`        | Point de terminaison du transport SSE (soumis à `mcpEnabled` + `mcpTransport === "sse"`)                              | Clé API + portées                |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Transport HTTP diffusable (utilise l’en-tête `mcp-session-id` ; `DELETE` met fin à la session)                        | Clé API + portées                |
| `/api/mcp/audit`       | `GET`                 | Entrées du journal d’audit provenant de `mcp_tool_audit` (filtres : `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Gestion                          |
| `/api/mcp/audit/stats` | `GET`                 | Statistiques d’audit agrégées (`totalCalls`, `successRate`, `avgDurationMs`, principaux outils)                       | Gestion                          |

Fichiers sources : `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Les transports SSE et HTTP diffusable sont tous deux bloqués jusqu’à ce que le serveur MCP soit activé dans les paramètres (`mcpEnabled`) et que le `mcpTransport` approprié soit sélectionné. Si le mauvais transport est configuré, la route renvoie une réponse HTTP 400 accompagnée d’une indication invitant à modifier les paramètres.

---

## Authentification et portées

Les outils MCP sont authentifiés à l’aide de portées de clé API. L’application des portées est centralisée dans
`open-sse/mcp-server/scopeEnforcement.ts`. Chaque outil nécessite des portées spécifiques :

| Portée                | Outils                                                                                                                                                                              |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                   |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                           |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                              |
| `read:quota`          | `check_quota`                                                                                                                                                                       |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                              |
| `read:models`         | `list_models_catalog`                                                                                                                                                               |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                       |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                               |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                  |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                         |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                      |
| `read:cache`          | `cache_stats`                                                                                                                                                                       |
| `write:cache`         | `cache_flush`                                                                                                                                                                       |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                          |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                   |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                               |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                    |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                              |
| `read:memory`         | `memory_search`                                                                                                                                                                     |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                        |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                  |
| `write:skills`        | `skills_enable`                                                                                                                                                                     |
| `execute:skills`      | `skills_execute`                                                                                                                                                                    |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                    |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                             |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                           |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                    |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                      |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                  |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                     |
| `read:obsidian`       | 13 outils de lecture — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 outils d’écriture — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                   |

Les portées avec caractères génériques sont prises en charge : `read:*` accorde toutes les portées de lecture, `*` accorde un accès complet.

### `mcp:connect` — capacité de route restreinte (#7895)

L’accès au transport HTTP/SSE MCP (`/api/mcp/*`) depuis une adresse autre que l’interface de bouclage nécessite l’exception LOCAL_ONLY de `/api/mcp/` (voir `docs/security/ROUTE_GUARD_TIERS.md`). Historiquement, cette exception n’acceptait qu’une clé d’API dotée de la portée complète `manage`/`admin` — une autorisation trop large pour un appelant qui doit uniquement communiquer avec MCP. `src/shared/constants/managementScopes.ts` exporte désormais `MCP_CONNECT_SCOPE = "mcp:connect"` : une portée additive et restreinte (suivant le même précédent que `SELF_USAGE_SCOPE`) qui autorise UNIQUEMENT le contournement pour `/api/mcp/` dans `src/server/authz/policies/management.ts` — elle n’accorde aucun autre accès aux routes de gestion et est délibérément exclue de `MANAGEMENT_API_KEY_SCOPES`. Une clé possédant `manage`/`admin` continue de bénéficier de l’exception sans changement ; `mcp:connect` constitue une alternative à privilèges réduits pour les appelants distants utilisant uniquement MCP, vérifiée via `hasMcpConnectOrManageScope()`.

### Liaison des portées HTTP par clé (#7895)

Sur HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` résout désormais les véritables `api_keys.scopes` de l’appelant via `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) et les transmet à `transport.handleRequest(req, { authInfo })` du SDK MCP, afin que `extra.authInfo.scopes`, reçu par chaque appel d’outil, reflète les portées propres à la clé Bearer. La fonction `resolveCallerScopeContext()` de `scopeEnforcement.ts` donnait déjà la priorité à `authInfo` par rapport à `_meta` et à la solution de repli reposant sur la variable d’environnement `OMNIROUTE_MCP_SCOPES` — cette modification ne fait qu’alimenter cette première source, de priorité maximale, qui ne l’était auparavant pas via HTTP. Lorsqu’aucune clé d’API n’est résolue (absence d’en-tête, clé non valide), `authInfo` reste `undefined` et la résolution poursuit sans changement avec la chaîne de repli `meta`/variable d’environnement existante. Cela ne modifie PAS la valeur par défaut de `OMNIROUTE_MCP_ENFORCE_SCOPES` — l’application des portées doit toujours être explicitement activée ; cette modification donne uniquement la priorité au chemin propre à chaque clé une fois cette application activée. stdio ne dispose d’aucune identité propre à l’appelant (voir `mcpCallerIdentity.ts`) et n’est pas affecté — il continue d’utiliser la chaîne de repli `_meta`/variable d’environnement.

---

## Variables d’environnement

| Variable                                | Valeur par défaut                | Objectif                                                                                                                                                                  |
| :-------------------------------------- | :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`         | URL de base utilisée par le serveur MCP pour appeler les API internes d’OmniRoute                                                                                         |
| `OMNIROUTE_API_KEY`                     | (vide)                           | Clé d’API transmise sous la forme `Authorization: Bearer` aux appels d’API internes                                                                                       |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (seul `"true"` l’active) | Lorsque cette option est activée, l’absence des portées requises refuse les appels d’outils et consigne `scope_denied:<reason>` dans le journal d’audit                   |
| `OMNIROUTE_MCP_SCOPES`                  | (vide)                           | Liste d’autorisation, séparée par des virgules, des portées considérées comme « disponibles » par défaut (utilisée lorsque l’appelant ne fournit pas ses propres portées) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (non définie = activée)          | Lorsqu’elle est définie sur `0/false/off/no`, désactive la compression des descriptions MCP au moment de l’enregistrement                                                 |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (non définie = activée)          | Autre alias du même paramètre que ci-dessus                                                                                                                               |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                          | Délai maximal avant annulation des lectures de gestion internes (état de santé, résilience, combinaisons, quota, utilisation)                                             |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                          | Délai maximal avant annulation des étapes qui attendent un fournisseur (`route_request`, `web_search`, `web_fetch`)                                                       |
| `MCP_TOOL_DENY`                         | (non définie = aucun filtre)     | Noms d’outils séparés par des virgules à retirer de `tools/list` (réduction de la cardinalité des outils — voir ci-dessous)                                               |
| `MCP_TOOL_ALLOW`                        | (non définie = aucun filtre)     | Noms d’outils séparés par des virgules à conserver exclusivement (mode liste d’autorisation — voir ci-dessous)                                                            |
| `DATA_DIR`                              | `~/.omniroute`                   | Le fichier de pulsation est écrit dans `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                           |

---

## Compression des descriptions

Les registres d’outils, de prompts et de ressources MCP peuvent compresser les descriptions au moment de l’enregistrement ou de l’énumération afin de réduire le volume de métadonnées exposé aux clients (et donc le coût lié au contexte du prompt). L’implémentation se trouve dans `open-sse/mcp-server/descriptionCompressor.ts` et est intégrée au serveur MCP via `compressMcpRegistryMetadata` dans `createMcpServer()`.

- La compression est appliquée au texte de la description à l’aide de l’ensemble de règles Caveman (`getRulesForContext("all", "full")`), avec extraction des blocs préservés (portions de code, blocs délimités, etc.), afin de ne pas altérer le contenu structurel.
- Activez ou désactivez cette fonctionnalité pour chaque déploiement via la valeur `compression.mcpDescriptionCompressionEnabled` de la table de paramètres `key_value` (par défaut : activée) — accessible dans l’interface sous **Analytique → Compression des descriptions MCP**.
- Activez ou désactivez cette fonctionnalité pour l’ensemble du processus via `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` ou `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Les statistiques en temps réel sont exposées via `omniroute_compression_status` sous `analytics.mcpDescriptionCompression` et marquées avec `source: "mcp_metadata_estimate"` afin de les distinguer des relevés d’utilisation réels des fournisseurs.

---

## Réduction de la cardinalité des outils (F4.3)

La compression des descriptions réduit les métadonnées de chaque outil ; la **réduction de la cardinalité des outils** va encore plus loin en diminuant le _nombre_ d’outils annoncés. Le fait d’annoncer moins d’outils dans le manifeste `tools/list` réduit le coût en jetons par requête que le modèle du client consacre au catalogue d’outils (compression de « couche 5 »). L’implémentation est un filtre pur et sans état dans `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), intégré à la boucle d’enregistrement dans `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Activation explicite, désactivé par défaut.** Le filtre ne s’exécute que lorsqu’au moins l’une des deux variables d’environnement est définie ; si aucune ne l’est, les 110 outils sont annoncés sans modification.

| Variable         | Mode                                                                                                                       |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Liste noire — noms d’outils séparés par des virgules qui sont toujours retirés de `tools/list`                             |
| `MCP_TOOL_ALLOW` | Liste d’autorisation — noms d’outils séparés par des virgules ; seuls ceux-ci sont conservés, tous les autres sont retirés |

`deny` est prioritaire sur `allow`. Les noms sont séparés par des virgules, les espaces superflus sont supprimés et les entrées vides sont ignorées. Exemples :

```bash
# Retirer deux outils du catalogue
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Annoncer uniquement les outils de routage et de quota (mode liste d’autorisation)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Méthode de suppression des outils filtrés :** l’enregistrement réussit toujours ; un outil rejeté par le profil est ensuite désactivé avec `.disable()` sur le handle du SDK MCP. Il n’apparaît donc jamais dans `tools/list`, mais le câblage reste intact (activation/désactivation propre, sans réenregistrement). L’analyseur de profil est `readMcpToolProfileFromEnv(process.env)`, qui renvoie `null` (aucun filtrage) lorsque les deux variables sont vides.

La structure `ToolProfile` plus riche utilisée par `reduceToolManifest` prend également en charge le filtrage par intersection de portées (`allowScopes`, avec correspondance par caractères génériques de type `read:*`) ainsi qu’une limite déterministe `maxTools`. Toutefois, ces deux paramètres nécessitent le manifeste complet au moment de l’enregistrement et ne sont **pas** exposés aujourd’hui au moyen des variables d’environnement (un hook au niveau de `tools/list` fait l’objet d’un suivi). `estimateManifestTokens()` permet de comparer le coût en jetons du manifeste avant et après la réduction.

---

## Heartbeat d’exécution

Le transport stdio enregistre l’état d’activité dans `${DATA_DIR}/runtime/mcp-heartbeat.json` toutes les 5 secondes. Le tableau de bord (`/api/mcp/status`) lit ce fichier ainsi que l’état d’activité du PID afin de déterminer `online`. Les transports HTTP signalent plutôt leur état à partir de `getMcpHttpStatus()` au sein du processus (aucune écriture de fichier).

L’instantané du heartbeat contient :

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## Journalisation d’audit

Chaque appel d’outil est consigné dans la table SQLite `mcp_tool_audit` par `open-sse/mcp-server/audit.ts` :

- Nom de l’outil, arguments (hachés/tronqués selon la valeur `auditLevel` propre à l’outil), résultat
- Durée en ms, indicateur de réussite/d’échec, message d’erreur (le cas échéant)
- Hachage de la clé API, horodatage
- Les refus liés aux portées sont consignés sous la forme `scope_denied:<reason>` avec la liste des portées manquantes

Utilisez le tableau de bord ou les endpoints REST `/api/mcp/audit` et `/api/mcp/audit/stats` pour consulter les appels récents.

---

## Fichiers

| Fichier                                                                  | Fonction                                                                                           |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Fabrique du serveur MCP, point d’entrée stdio, enregistrement des outils avec portée               |
| `open-sse/mcp-server/httpTransport.ts`                                   | Transport SSE + HTTP streamable (gestion des sessions)                                             |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Évaluation de la portée des outils et résolution de l’appelant                                     |
| `open-sse/mcp-server/audit.ts`                                           | Journalisation des appels d’outils (`mcp_tool_audit`)                                              |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Écriture du signal d’activité stdio (`mcp-heartbeat.json`)                                         |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Compression des descriptions pour les registres d’outils, d’invites et de ressources               |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Schémas Zod + registre d’outils (`MCP_TOOLS`, 45 entrées)                                          |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Gestionnaires d’outils de phase 2, de cache et de 1proxy                                           |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Gestionnaires d’outils de compression                                                              |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Définitions des outils de mémoire (3 outils)                                                       |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Définitions des outils de compétences (4 outils)                                                   |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Définitions des outils de source de contexte Notion (6 outils)                                     |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Définitions des outils de ludification (8 outils)                                                  |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Outils d’enregistrement et de gestion des plugins (8 outils)                                       |
| `src/app/api/mcp/status/route.ts`                                        | Point de terminaison `/api/mcp/status`                                                             |
| `src/app/api/mcp/tools/route.ts`                                         | Point de terminaison `/api/mcp/tools`                                                              |
| `src/app/api/mcp/sse/route.ts`                                           | Route de transport SSE `/api/mcp/sse`                                                              |
| `src/app/api/mcp/stream/route.ts`                                        | Route de transport HTTP streamable `/api/mcp/stream`                                               |
| `src/app/api/mcp/audit/route.ts`                                         | Requête du journal d’audit `/api/mcp/audit`                                                        |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Métriques d’audit agrégées `/api/mcp/audit/stats`                                                  |
| `src/lib/notion/api.ts`                                                  | Client de l’API REST Notion (nouvelles tentatives, délai d’expiration, classification des erreurs) |
| `src/lib/db/notion.ts`                                                   | Persistance du jeton Notion (table `key_value`)                                                    |
| `src/app/api/settings/notion/route.ts`                                   | API des paramètres Notion (GET/POST/DELETE)                                                        |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Interface de gestion du jeton Notion                                                               |
| `tests/unit/notion-api.test.ts`                                          | Tests du client de l’API Notion (7)                                                                |
| `tests/unit/notion-tools.test.ts`                                        | Tests de l’application des portées aux outils Notion (10)                                          |
| `tests/unit/db/notion.test.mjs`                                          | Tests du module de base de données Notion (3)                                                      |
