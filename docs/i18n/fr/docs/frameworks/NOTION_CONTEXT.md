# Notion Context Source (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Source de vérité :** `src/lib/notion/api.ts` (client REST), `src/lib/db/notion.ts`
> (persistance du jeton), `open-sse/mcp-server/tools/notionTools.ts` (6 outils MCP),
> `src/app/api/settings/notion/route.ts` (API des paramètres). L’enregistrement des outils et la
> configuration des portées se trouvent dans `open-sse/mcp-server/server.ts`.

## Présentation

OmniRoute peut se connecter à un espace de travail **Notion** en tant que **source de contexte** — une base de connaissances
en lecture/écriture à laquelle les agents accèdent via le serveur MCP intégré. Une fois qu’un jeton
d’intégration Notion est configuré, les outils MCP permettent à un LLM de rechercher des pages et des bases de données,
de lire le contenu des pages et les arborescences de blocs, d’interroger les bases de données avec des filtres/critères de tri et d’ajouter de nouveaux
blocs — le tout par l’intermédiaire d’OmniRoute (avec nouvelles tentatives, délai d’expiration et classification des erreurs),
afin que le modèle n’accède jamais directement à l’API Notion.

L’intégration est une surcouche légère et renforcée de l’API REST officielle de Notion
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Le client
(`src/lib/notion/api.ts`) ajoute :

- **Nouvelles tentatives avec temporisation exponentielle** (jusqu’à 3 tentatives) pour les erreurs `429` et `5xx`.
- **Délai d’expiration des requêtes de 55 secondes** via `AbortController`.
- **Classification typée des erreurs** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, respecte les indications `retry after`),
  `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Assainissement des messages** supprimant les fragments ressemblant à des traces de pile avant leur affichage.

## Configuration

Il n’existe **aucune variable d’environnement** pour le jeton Notion — celui-ci est stocké dans la
table SQLite `key_value` (espace de noms `notion`, clé `integration_token`) via
`src/lib/db/notion.ts`. Configurez-le depuis l’onglet **Sources de contexte** du tableau de bord
du point de terminaison (`NotionSourceCard`, voisin de `ObsidianSourceCard`), ou via l’API REST des paramètres.

> [!NOTE]
> Le jeton est un **jeton d’intégration interne Notion**. Créez une intégration sur
> <https://www.notion.com/my-integrations>, puis partagez avec cette intégration les pages/bases de données auxquelles
> OmniRoute doit accéder (le modèle d’autorisation de Notion repose sur le partage,
> et non sur un accès à l’ensemble de l’espace de travail).

### Configuration via REST

```bash
# Enregistrer et valider le jeton d’intégration (POST le valide en effectuant une recherche de test)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Vérifier l’état de la connexion
curl http://localhost:20128/api/settings/notion

# Se déconnecter (supprime le jeton stocké)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Les trois méthodes nécessitent une authentification au tableau de bord (`isAuthenticated`). Lors d’une requête `POST`,
OmniRoute enregistre le jeton et exécute immédiatement une recherche de test limitée à 1 résultat ; si Notion
renvoie un objet d’erreur, le jeton est supprimé et l’appel échoue avec le code `400`.

## Outils MCP (6)

Définis dans `open-sse/mcp-server/tools/notionTools.ts`. Le jeton est récupéré au moment de l’appel
via `getNotionToken()` ; si aucun jeton n’est configuré, l’outil génère l’erreur
`"Le jeton d’intégration Notion n’est pas configuré. Définissez-le dans Paramètres > Sources de contexte."`

| Outil                        | Portée         | Description                                                                                                           |
| ---------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Recherche des pages et des bases de données à partir d’une requête textuelle (renvoie les titres, ID et URL). Paginé. |
| `notion_get_page`            | `read:notion`  | Récupère le contenu et les métadonnées d’une page à partir de son ID.                                                 |
| `notion_list_block_children` | `read:notion`  | Répertorie tous les blocs enfants d’un bloc ou d’une page (l’arborescence des blocs). Paginé.                         |
| `notion_query_database`      | `read:notion`  | Interroge une base de données avec `filter` + `sorts` facultatifs (format de l’API Notion). Paginé.                   |
| `notion_get_database`        | `read:notion`  | Récupère le schéma et les métadonnées d’une base de données à partir de son ID.                                       |
| `notion_append_blocks`       | `write:notion` | Ajoute des blocs enfants à un bloc ou à une page existants (100 blocs maximum par requête).                           |

### Paramètres d’entrée

- `notion_search` — `query` (1 à 500 caractères), `pageSize` (1 à 100, valeur par défaut : 20),
  `startCursor` (facultatif).
- `notion_get_page` — `pageId` (hexadécimal de 32 caractères ou UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1 à 100, valeur par défaut : 50),
  `startCursor` (facultatif).
- `notion_query_database` — `databaseId`, `filter` (facultatif, format de filtre Notion),
  `sorts` (tableau facultatif), `pageSize` (1 à 100, valeur par défaut : 50), `startCursor` (facultatif).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (tableau d’objets de bloc),
  `after` (position facultative).

### Portées

Les outils de lecture nécessitent `read:notion` et l’outil d’écriture nécessite `write:notion`.
Les portées sont appliquées par `withScopeEnforcement()` dans
`open-sse/mcp-server/server.ts` uniquement lorsque `OMNIROUTE_MCP_ENFORCE_SCOPES=true` ; les
portées autorisées de l’appelant proviennent de `OMNIROUTE_MCP_SCOPES` (séparées par des virgules) ou du
contexte de portée de la clé API authentifiée. Consultez [MCP-SERVER.md](./MCP-SERVER.md) pour connaître le
modèle complet des portées.

## Points de terminaison

| Méthode  | Chemin                 | Objectif                                       |
| -------- | ---------------------- | ---------------------------------------------- |
| `GET`    | `/api/settings/notion` | Renvoyer `{ connected, hasToken }`.            |
| `POST`   | `/api/settings/notion` | Enregistrer et valider le jeton d’intégration. |
| `DELETE` | `/api/settings/notion` | Déconnecter (effacer le jeton stocké).         |

> Il s’agit de routes de paramètres du tableau de bord. Il n’existe **aucun point de terminaison
> proxy Notion public `/v1`** — Notion est accessible exclusivement via les outils MCP ci-dessus.

## Cas d’utilisation

- **Réponses fondées sur les connaissances** — permettre à un agent d’utiliser `notion_search` dans l’espace de travail et
  `notion_get_page` sur le premier résultat avant de répondre, afin que les réponses citent de vrais documents internes.
- **Flux de travail basés sur une base de données** — utiliser `notion_query_database` sur une base de données de tâches/CRM avec
  des filtres et des tris, puis résumer ou trier les lignes.
- **Écriture / journalisation** — utiliser `notion_append_blocks` pour ajouter des notes de réunion, des résumés
  d’exécution ou la sortie d’un agent à une page existante (ajout uniquement, sans modification destructive).
- **Exploration de la structure** — utiliser `notion_list_block_children` pour parcourir l’arborescence des blocs d’une page,
  ou `notion_get_database` pour découvrir le schéma des propriétés d’une base de données avant de l’interroger.

## Voir aussi

- [Serveur MCP](./MCP-SERVER.md) — transports, application des périmètres et inventaire complet des outils.
- [Source de contexte Obsidian](./OBSIDIAN_CONTEXT.md) — l’autre source de contexte intégrée.
- [Système de mémoire](./MEMORY.md) — mémoire conversationnelle persistante (couche de
  contexte complémentaire, injectée automatiquement plutôt que récupérée par un outil).
