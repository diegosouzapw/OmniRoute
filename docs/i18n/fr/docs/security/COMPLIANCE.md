# Compliance & Audit (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Source de référence :** `src/lib/compliance/`, `src/app/api/compliance/`
> **Dernière mise à jour :** 2026-06-28 — v3.8.40

OmniRoute enregistre les actions administratives, les événements d’authentification, les modifications du cycle de vie des identifiants des fournisseurs et les invocations d’outils MCP dans des tables d’audit basées sur SQLite. Cette page décrit les éléments journalisés, leur emplacement, leur durée de conservation, la manière dont les clés API peuvent désactiver la journalisation et la façon d’interroger les données.

L’implémentation se trouve dans `src/lib/compliance/index.ts` (T-43 — « Contrôles de conformité ») et `src/lib/compliance/providerAudit.ts`. Les écritures d’audit ne lèvent jamais d’exception : en cas d’échec, l’appel est silencieusement ignoré afin que la journalisation d’audit ne puisse pas interrompre le flux principal de la requête.

## Éléments journalisés

### Événements d’audit administratifs (`audit_log`)

Chaque appel à `logAuditEvent({ action, actor, target, details, ... })` produit une ligne. Les chaînes d’action suivent un modèle `domain.verb` (ou `domain.verb.outcome`). Les types d’actions confirmés dans l’arborescence du code comprennent :

| Action                               | Source                                  |
| ------------------------------------ | --------------------------------------- |
| `auth.login.success`                 | `src/app/api/auth/login/route.ts`       |
| `auth.login.failed`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.locked`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.error`                   | `src/app/api/auth/login/route.ts`       |
| `auth.login.misconfigured`           | `src/app/api/auth/login/route.ts`       |
| `auth.login.setup_required`          | `src/app/api/auth/login/route.ts`       |
| `auth.logout.success`                | `src/app/api/auth/logout/route.ts`      |
| `provider.credentials.created`       | `src/app/api/providers/route.ts`        |
| `provider.credentials.updated`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.revoked`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.batch_revoked` | `src/app/api/providers/route.ts`        |
| `sync.token.created`                 | `src/app/api/sync/tokens/route.ts`      |
| `sync.token.revoked`                 | `src/app/api/sync/tokens/[id]/route.ts` |
| `compliance.cleanup`                 | `src/lib/compliance/index.ts`           |

Chaque entrée enregistre `action`, `actor` (valeur par défaut : `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` et `timestamp`. Les clés sensibles (`apiKey`, `accessToken`, `refreshToken`, `password`, tout élément correspondant à `*token`/`*secret`/`*apikey`, etc.) sont récursivement expurgées et remplacées par `"[redacted]"` avant l’écriture de la ligne.

### Appels d’outils MCP (`mcp_tool_audit`)

Chaque invocation d’un outil MCP écrit une ligne par l’intermédiaire de `open-sse/mcp-server/audit.ts`. Schéma (provenant de `src/lib/db/migrations/002_mcp_a2a_tables.sql`) :

| Colonne          | Remarques                                        |
| ---------------- | ------------------------------------------------ |
| `id`             | incrémentation automatique                       |
| `tool_name`      | identifiant de l’outil MCP                       |
| `input_hash`     | sha256 de l’entrée (aucune charge utile stockée) |
| `output_summary` | résumé court et tronqué                          |
| `duration_ms`    | temps écoulé                                     |
| `api_key_id`     | appelant (peut être nul)                         |
| `success`        | `1` / `0`                                        |
| `error_code`     | code d’erreur terminal en cas d’échec            |
| `created_at`     | horodatage ISO                                   |

### Journaux des requêtes et de l’utilisation

Il s’agit de données de télémétrie opérationnelle (et non, à proprement parler, d’un audit administratif), mais elles partagent le même pipeline de conservation :

- `usage_history` — agrégat d’utilisation par requête
- `call_logs` — journal complet par requête (soumis à une limite de lignes, voir ci-dessous)
- `proxy_logs` — journal du trafic du proxy (soumis à une limite de lignes)
- `request_detail_logs` — ancien journal détaillé des requêtes (toujours purgé s’il est présent)

## Schéma de stockage

`audit_log` est créée à la demande par `ensureAuditLogSchema()` lors de la première utilisation :

```sql
CREATE TABLE IF NOT EXISTS audit_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp     TEXT NOT NULL DEFAULT (datetime('now')),
  action        TEXT NOT NULL,
  actor         TEXT NOT NULL DEFAULT 'system',
  target        TEXT,
  details       TEXT,
  ip_address    TEXT,
  resource_type TEXT,
  status        TEXT,
  request_id    TEXT,
  metadata      TEXT
);
```

Des index sont créés sur `timestamp`, `action`, `actor`, `resource_type`,
`status` et `request_id`. Les colonnes manquantes dans les anciennes bases de données sont ajoutées via
`ALTER TABLE` à la demande.

## Conservation et nettoyage

Deux périodes de conservation distinctes sont appliquées :

| Variable d'environnement    | Valeur par défaut | S'applique à                                                      |
| --------------------------- | ----------------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`               | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`               | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`          | Réduction au nombre maximal de lignes pour `call_logs`            |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`          | Réduction au nombre maximal de lignes pour `proxy_logs`           |

`cleanupExpiredLogs()` exécute le processus de conservation. Elle est appelée au démarrage du serveur
depuis `src/instrumentation-node.ts`. Chaque exécution journalise un
événement d'audit `compliance.cleanup` avec le nombre de suppressions par table. La réduction des journaux
de proxy et d'appels est effectuée par lots (`BATCH_SIZE = 5000`) afin d'éviter les verrouillages prolongés en écriture.

Le nettoyage manuel de l'historique des requêtes est distinct de la conservation. La page des journaux de requêtes
appelle `POST /api/settings/purge-request-history`, qui supprime `call_logs`,
l'ancienne table `request_detail_logs` et les artefacts locaux des requêtes sous
`${DATA_DIR}/call_logs/`.

Les valeurs par défaut sont définies dans `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Désactivation `noLog` (par clé API)

Les clés API peuvent être marquées afin que le trafic de leurs appels en aval ne soit pas journalisé. Le
marqueur est stocké dans la table `api_keys` (`no_log INTEGER DEFAULT 0`) et est répliqué
dans un ensemble en mémoire pour permettre des recherches rapides sur les chemins critiques.

```bash
# Créer une clé sans journalisation (authentification de gestion requise)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Fonctions utilitaires (`src/lib/compliance/index.ts`) :

- `setNoLog(apiKeyId, true|false)` — active ou désactive l'entrée en mémoire
- `isNoLog(apiKeyId)` — vérifiée sur le chemin de la requête ; utilise en dernier recours une lecture de
  `api_keys.no_log` mise en cache pendant 30 s
- `NO_LOG_API_KEY_IDS` (variable d'environnement, valeurs séparées par des virgules) — préchargée dans l'ensemble en mémoire
  au démarrage ; utile lorsque vous ne pouvez pas modifier directement la colonne

Les événements d'audit administratifs (connexion, modifications des fournisseurs, appels d'outils MCP, etc.)
ne sont **pas** affectés par `noLog` — seule la journalisation du trafic par requête est
désactivée.

## API REST

| Point de terminaison        | Méthode | Description                                                     | Authentification |
| --------------------------- | ------- | --------------------------------------------------------------- | ---------------- |
| `/api/compliance/audit-log` | `GET`   | Entrées paginées du journal d’audit administrateur avec filtres | management       |
| `/api/mcp/audit`            | `GET`   | Entrées paginées du journal d’audit des outils MCP              | (open-sse)       |
| `/api/mcp/audit/stats`      | `GET`   | Statistiques agrégées de l’audit MCP                            | (open-sse)       |

Aucun point de terminaison d’exportation CSV n’est actuellement fourni — effectuez l’exportation depuis le tableau de bord ou interrogez directement
la base de données SQLite.

### Interrogation de `/api/compliance/audit-log`

Paramètres de requête pris en charge (tous facultatifs ; les filtres textuels
utilisent tous la correspondance `LIKE %value%`) :

- `action`, `actor`, `target`, `resourceType` (ou `resource_type`),
  `status`, `requestId` (ou `request_id`)
- `from` / `since`, `to` / `until` — horodatages ISO
- `limit` (`50` par défaut, minimum `1`, maximum `500`)
- `offset` (`0` par défaut, maximum `10_000`)

La réponse est un tableau JSON. Les métadonnées de pagination sont renvoyées dans les en-têtes :
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Tableau de bord

Le tableau de bord expose les données d’audit à l’adresse **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). La page comporte deux onglets :

- **Conformité** (`ComplianceTab.tsx`) — événements d’audit administrateur provenant de
  `/api/compliance/audit-log`. Filtrage par type d’événement, niveau de gravité (information / avertissement
  / critique, dérivé de l’action et du statut) et plage de dates. Le niveau de gravité est
  calculé côté client à partir des chaînes d’action et de statut.
- **MCP** (`McpAuditTab.tsx`) — audit des outils MCP provenant de `/api/mcp/audit`, avec
  des filtres par nom d’outil et par réussite/échec.

Les deux onglets utilisent une pagination avec des tailles de page de `50` (conformité) et de `25` (MCP).

## Utilitaires d’audit des identifiants de fournisseur

`src/lib/compliance/providerAudit.ts` fournit des utilitaires de mise en forme utilisés par les
routes de gestion des fournisseurs lorsqu’elles émettent des événements relatifs aux identifiants :

- `summarizeProviderConnectionForAudit(connection)` — supprime `apiKey`,
  `accessToken`, `refreshToken`, `idToken` et
  `providerSpecificData.consoleApiKey` avant que l’instantané de connexion ne soit
  écrit dans `details`.
- `getProviderAuditTarget(connection)` — compose une chaîne stable
  `"<provider>:<name|id>"` pour le champ `target`.
- `extractProviderWarnings(...payloads)` — analyse les réponses du fournisseur à la recherche
  d’avertissements de politique/sécurité (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) et
  remonte jusqu’à 5 occurrences, chacune étant tronquée à 400 caractères.

## Bonnes pratiques

- Marquez avec `noLog: true` les clés d’API traitant des données personnelles identifiables (juridiques, médicales, etc.).
- Ajustez `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` afin de respecter votre
  politique de conservation. Les valeurs par défaut de 7 jours sont prudentes.
- Exportez la table d’audit hors de la plateforme (`sqlite3 dump`) selon la fréquence
  requise par votre programme de conformité — aucun mécanisme d’archivage intégré n’existe.
- Suivez le nombre d’événements `auth.login.failed` et `auth.login.locked` afin de détecter
  les attaques par force brute.
- Lors de l’ajout de nouveaux points de terminaison administrateur, appelez `logAuditEvent({ ... })` avec une chaîne d’action stable
  `domain.verb.outcome` et transmettez le contexte de la requête via
  `getAuditRequestContext(request)` afin que l’adresse IP et le `requestId` soient capturés
  automatiquement.

## Voir aussi

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — masquage des données personnelles, injection de prompt
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — catalogue des outils MCP et portées
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — référence complète des variables d’environnement
- Source : `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
