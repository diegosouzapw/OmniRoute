# Database Schema & Operations Guide (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **En bref** : OmniRoute utilise **SQLite avec journalisation WAL** comme stockage principal, avec un chiffrement **AES-256-GCM** au repos pour les champs sensibles. Ce guide couvre le schéma, les migrations, la sauvegarde/restauration et les procédures opérationnelles.

**Sources :**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 tables de base)
- `src/lib/db/migrationRunner.ts` — migrations versionnées
- `src/lib/db/migrations/` — 167 fichiers SQL versionnés
- `src/lib/db/encryption.ts` — fonctions utilitaires de chiffrement
- `src/lib/db/backup.ts` — exportation/importation des sauvegardes
- `src/lib/db/healthCheck.ts` — diagnostics d’intégrité

---

## Pourquoi SQLite ?

OmniRoute a choisi SQLite plutôt que PostgreSQL/MySQL pour plusieurs raisons :

| Facteur          | SQLite                                        | PostgreSQL                                       |
| ---------------- | --------------------------------------------- | ------------------------------------------------ |
| **Déploiement**  | Intégré — aucun serveur distinct              | Nécessite la configuration d’un serveur          |
| **Chiffrement**  | Couche applicative (AES-256-GCM)              | TDE intégré                                      |
| **Performances** | Plus rapide pour les charges faibles/moyennes | Meilleur pour les écritures simultanées massives |
| **Concurrence**  | Le mode WAL autorise les lectures simultanées | MVCC complet                                     |
| **Sauvegarde**   | Copie d’un fichier unique                     | `pg_dump` ou instantané du système de fichiers   |
| **Cas d’usage**  | Installation par utilisateur, intégrée        | SaaS mutualisé                                   |

Pour les déploiements **mono-utilisateur et à instance unique** (le principal cas d’usage d’OmniRoute), SQLite est plus simple et plus rapide.

### Journalisation WAL

`core.ts` ouvre la base de données en **mode WAL (Write-Ahead Logging, journalisation anticipée)** :

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL permet des **lectures simultanées** pendant les écritures — un point important pour le tableau de bord, qui exécute des requêtes pendant l’enregistrement des requêtes entrantes.

La taille par défaut du cache est de **65 536 Kio (64 Mio)**. SQLite interprète une valeur négative de
`cache_size` comme une limite supérieure approximative exprimée en Kio et alloue les pages à la demande.
**Paramètres > Système et stockage > Taille du cache** accepte des valeurs entières comprises entre **1 et
1 000 000 Kio** ; l’enregistrement du paramètre l’applique à la connexion active à la base de données,
et OmniRoute restaure la valeur persistée au démarrage.

---

## Emplacement de la base de données

Le fichier SQLite est stocké à l’emplacement suivant :

| SE      | Chemin                                                   |
| ------- | -------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                            |
| macOS   | `~/.omniroute/storage.sqlite`                            |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                |
| Docker  | `/app/data/storage.sqlite` (configurable via `DATA_DIR`) |

Fichiers associés :

- `storage.sqlite-wal` — journal d’écriture anticipée
- `storage.sqlite-shm` — fichier de mémoire partagée
- `call_logs/` — artefacts des charges utiles des requêtes (si activé)

**Remplacer l’emplacement :**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Architecture des modules de domaine

La base de données d’OmniRoute comporte **110 modules TypeScript de premier niveau** dans `src/lib/db/`. Chaque module de domaine :

- Gère une ou plusieurs tables spécifiques
- Exporte des fonctions CRUD typées
- N’accède jamais aux tables d’un autre module
- Utilise `getDbInstance()` depuis `core.ts` pour accéder à la base de données

### Les 110 modules de base de données de premier niveau

OmniRoute comporte **110 fichiers TypeScript de premier niveau** dans `src/lib/db/`. Vous trouverez ci-dessous un échantillon des principaux modules ; consultez la liste du répertoire pour obtenir la liste complète :

| Module                  | Tables                                                         | Responsabilité                                                                            |
| ----------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Enregistrement des fournisseurs et identifiants OAuth/clés d’API                          |
| `models.ts`             | `key_value` (données des modèles)                              | Définitions, fonctionnalités et tarification des modèles                                  |
| `combos.ts`             | `combos`                                                       | Configurations et ordre de routage des combinaisons                                       |
| `apiKeys.ts`            | `api_keys`                                                     | Cycle de vie des clés d’API, portées et suivi des quotas                                  |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Configuration système et stockage clé-valeur partagé                                      |
| `backup.ts`             | —                                                              | Opérations d’exportation/importation des sauvegardes                                      |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Configurations des proxys et règles de routage                                            |
| `prompts.ts`            | `prompt_templates`                                             | Modèles de prompts réutilisables et gestion des versions                                  |
| `webhooks.ts`           | `webhooks`                                                     | Abonnements aux webhooks pilotés par des événements et journaux                           |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Journalisation d’audit par requête (facultative, volume élevé)                            |
| `domainState.ts`        | `domain_*` (5 tables)                                          | Budgets de domaine, disjoncteurs, verrouillages, chaînes de repli et historique des coûts |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Clés d’API autorisées pour MCP/A2A                                                        |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historique de l’utilisation des quotas                                                    |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Association des modèles aux combinaisons par défaut                                       |
| `cliToolState.ts`       | `cli_tool_state`                                               | État persistant propre à la CLI                                                           |
| `encryption.ts`         | —                                                              | Utilitaires de chiffrement/déchiffrement des champs                                       |
| `readCache.ts`          | —                                                              | Cache en mémoire pour les opérations à forte intensité de lecture                         |
| `secrets.ts`            | `key_value` (entrées chiffrées)                                | Stockage chiffré des secrets                                                              |
| `stateReset.ts`         | —                                                              | Effacement/réinitialisation de l’état de la base de données pour les tests                |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Contexte de session pour le transfert entre agents                                        |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Suivi de l’utilisation                                                                    |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Configuration de la compression                                                           |

### Limites des modules

Une règle architecturale fondamentale : **les modules n’accèdent pas directement aux tables des autres modules**. Pour utiliser les données d’un autre module, importez la fonction depuis ce module.

```ts
// ❌ INCORRECT : requête SQL directe sur la table d’un autre module
db.prepare("SELECT * FROM provider_connections").all();

// ✅ CORRECT : utiliser la fonction du module providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Cette règle est appliquée lors de la revue de code — il n’existe aucun contrôle statique, mais les violations sont signalées.

---

## Schéma de base (17 tables)

`core.ts` définit les 17 tables de base dans `SCHEMA_SQL`. Celles-ci sont créées par la migration `001_initial_schema.sql` et constituent le schéma principal.

### Tables principales (créées lors de la migration initiale)

| Table                      | Objectif                                       | Colonnes clés                                                           |
| -------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Identifiants des fournisseurs (chiffrés)       | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informations de routage des nœuds fournisseurs | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Stockage clé-valeur générique                  | `namespace`, `key`, `value`                                             |
| `combos`                   | Définitions des combinaisons de routage        | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Clés API pour la passerelle                    | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Métadonnées de la base de données              | `key`, `value`                                                          |
| `usage_history`            | Enregistrements d’utilisation des requêtes     | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Charges utiles et réponses des requêtes        | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Journaux des requêtes du proxy                 | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Chaînes modèle-fournisseur                     | `model`, `chain`                                                        |
| `domain_budgets`           | Budgets de dépenses par domaine                | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Historique des réinitialisations de budget     | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Suivi des coûts par domaine                    | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | État de limitation du débit du domaine         | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | État du disjoncteur par domaine                | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache des réponses du LLM                      | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Instantanés historiques des quotas             | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Tables supplémentaires (ajoutées par des migrations ultérieures)

Les migrations suivantes ajoutent notamment des tables telles que :

- `cli_tool_state` (migration 011) — état de l’outil CLI
- Tables `mcp_*` — audit du serveur MCP
- Tables `a2a_*` — état des tâches A2A
- Tables `usage_*` — suivi de l’utilisation
- Tables `plugin_*` — système de plugins
- `skill_executions` — historique d’exécution des compétences
- Tables `memory_*` — système de mémoire
- Tables `compression_*` — système de compression
- Tables `webhook_*` — journal de livraison des webhooks
- Tables `acp_*` — protocole client-agent
- Tables `oneproxy_*` — place de marché 1proxy
- `proxy_assignments` — liaisons des portées du proxy
- `detailed_call_artifacts` — métadonnées des artefacts du journal d’appels
- `quota_alert_history` — audit des alertes de quota
- `command_code_auth_sessions` — sessions OAuth de Command Code

La liste complète des quelque 30 tables et plus se trouve dans `src/lib/db/migrations/`.

---

## Migrations

OmniRoute utilise des **migrations versionnées et idempotentes** dans `src/lib/db/migrations/`. Chaque migration est un fichier SQL unique nommé `NNN_description.sql`.

### Nommage des migrations

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Exécution des migrations

Au démarrage, `migrationRunner.ts` :

1. Crée la table `_omniroute_migrations` si elle n’existe pas
2. Recherche les migrations déjà appliquées
3. Applique toutes les nouvelles migrations dans l’ordre, chacune dans une transaction
4. Enregistre chaque migration appliquée avec son horodatage

```ts
// src/lib/db/migrationRunner.ts (version simplifiée)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### Idempotence

Les migrations doivent être **idempotentes** — les exécuter deux fois ne doit produire aucun effet supplémentaire :

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Utilisez largement les clauses `IF NOT EXISTS`, `IF EXISTS` et `OR IGNORE` / `OR REPLACE`.

### Ajout d’une nouvelle migration

1. **Identifiez le prochain numéro** : `ls src/lib/db/migrations/ | tail -1`
2. **Créez le fichier** : `NNN_my_change.sql`
3. **Utilisez un DDL sûr** : `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Renseignez prudemment les données existantes** : utilisez `UPDATE ... WHERE ...` pour traiter les lignes existantes
5. **Testez sur une copie** : n’exécutez jamais de migrations non testées en production

Exemple :

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> Les **modifications non rétrocompatibles** (par exemple, la suppression de colonnes) sont délicates. OmniRoute ne prend PAS en charge les rétrogradations — une fois qu’une migration est appliquée, la modification du schéma est définitive. Planifiez en conséquence.

---

## Chiffrement des données au repos

Les champs sensibles (clés d’API, jetons OAuth, chaînes de connexion) sont chiffrés au repos à l’aide d’**AES-256-GCM**.

### Fonctionnement

```ts
// src/lib/db/encryption.ts (version simplifiée)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Emplacements concernés

- `provider_connections.api_key` — chiffré au niveau de l’application
- `provider_connections.access_token`, `refresh_token`, `id_token` — chiffrés au niveau de l’application
- Entrées `key_value` avec `namespace = "secrets"` — chiffrées au niveau de l’application
- `proxy_registry.auth` — chiffré au niveau de l’application (le cas échéant)

### Clé de chiffrement

La clé de chiffrement est dérivée d’une **phrase secrète** (définie via la variable d’environnement `STORAGE_ENCRYPTION_KEY`) et d’un **sel** (stocké dans la base de données). Les deux sont nécessaires pour déchiffrer les données.

```bash
# Générer une phrase secrète sécurisée
openssl rand -hex 32

# Définir dans .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Critique** : perdre la clé de chiffrement signifie perdre l’accès à toutes les données chiffrées. **Sauvegardez la clé séparément de la base de données**.

### Données NON chiffrées

Pour des raisons de performances, les éléments suivants sont stockés en texte brut :

- Noms d’affichage des fournisseurs
- Définitions des modèles (déjà publiques)
- Règles de routage
- Données d’utilisation (aucune donnée à caractère personnel)

---

## Points d’attention concernant le chiffrement (v3.8.16+)

OmniRoute utilise **`migrateLegacyEncryptedString()`** pour gérer de manière transparente deux mécanismes de chiffrement :

- **Ancien** (avant v3.5.0) : « chiffrement » basé sur XOR (il ne s’agit pas d’un véritable chiffrement)
- **Actuel** : AES-256-GCM avec un vecteur d’initialisation et une balise d’authentification appropriés

L’utilitaire de migration détecte l’ancien format et rechiffre les données avec le nouveau mécanisme lors de la première lecture. Cela signifie que vous pouvez mettre à niveau une ancienne base de données sans perdre les identifiants.

---

## Cache de lecture

Pour les données fréquemment consultées (modèles, fournisseurs, paramètres), `readCache.ts` fournit un **cache en mémoire** :

```ts
// Mis en cache au démarrage, invalidé lors d’une écriture
const providers = await getCachedProviders(); // Rapide, en mémoire
const fresh = await listProviders(); // Lent, interroge la BDD
```

| Entité mise en cache   | Clé de cache   | Durée de vie         |
| ---------------------- | -------------- | -------------------- |
| `models`               | `models:v1`    | Jusqu’à une écriture |
| `provider_connections` | `providers:v1` | Jusqu’à une écriture |
| `settings`             | `settings:v1`  | Jusqu’à une écriture |
| `combos`               | `combos:v1`    | Jusqu’à une écriture |

Le cache est invalidé à chaque écriture dans la table correspondante.

---

## Sauvegarde et récupération

### Sauvegarde manuelle

```bash
# Utiliser la CLI pour créer une sauvegarde locale
omniroute backup create --name pre-migration

# Ou via l’API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Le fichier de sauvegarde comprend :

- Toutes les tables de la BDD (sérialisées au format JSON)
- Les artefacts des journaux d’appels (encodés en base64, facultatifs)
- Les paramètres et secrets (chiffrés)
- La configuration des plugins

### Restauration

```bash
# Via la CLI
omniroute restore pre-migration

# Via l’API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Avertissement** : la restauration écrase l’intégralité de la BDD. Arrêtez d’abord tous les clients.

### Sauvegardes automatisées

```bash
# Activer les sauvegardes quotidiennes automatisées via la CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

La planification est exécutée côté serveur par une tâche en arrière-plan qui s’active toutes les 30 secondes
(par défaut) et évalue l’expression cron par rapport à l’heure locale du serveur.

| Variable                                    | Valeur par défaut | Description                                                                                                                           |
| ------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`           | Intervalle d’activation en ms (minimum : `5000`). Il doit être inférieur à 60 s pour correspondre de manière fiable à la minute cron. |

### Sauvegarde à chaud de SQLite

Pour effectuer une sauvegarde sans interruption d’une BDD active :

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Cette commande utilise l’API de sauvegarde en ligne de SQLite — elle peut être exécutée en toute sécurité pendant qu’OmniRoute fonctionne.

---

## Optimisation des performances

### Mode WAL

WAL est activé par défaut. Pour les charges de travail comportant beaucoup d’écritures, envisagez les réglages suivants :

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Point de contrôle toutes les 1000 pages
PRAGMA journal_size_limit = 67108864;  -- Limite WAL de 64 Mo
```

### Index

Index clés pour les performances (créés automatiquement par les migrations) :

- `idx_models_provider` — recherche de modèles par fournisseur
- `idx_combo_targets_combo_id` — développement des cibles combinées
- `idx_usage_history_api_key_timestamp` — analyse de l’utilisation
- `idx_quota_snapshots_api_key_window` — suivi des quotas
- `idx_call_logs_timestamp` — requêtes sur les journaux d’appels

Pour ajouter un nouvel index, créez une migration :

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### E/S mappées en mémoire

Pour les bases de données très volumineuses (>10 Go), le mappage en mémoire peut être ajusté via un pragma SQLite :

```sql
-- Définir via un pragma SQLite (à ajuster dans core.ts ou à l’exécution)
PRAGMA mmap_size = 268435456;  -- 256 Mo
```

### Compactage

Les instances OmniRoute fonctionnant sur de longues périodes bénéficient d’un `VACUUM` occasionnel :

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Exécutez-le chaque mois pendant les périodes de faible trafic. (Le mode WAL réduit ce besoin, mais ne l’élimine pas.)

---

## Vérification de l’état

`src/lib/db/healthCheck.ts` fournit des **diagnostics d’état au niveau de la base de données** :

Les deux verbes nécessitent une authentification (`401` dans le cas contraire). `GET` effectue uniquement le diagnostic ; `POST` exécute la
même vérification avec `autoRepair` activé.

```bash
GET  /api/db/health   # diagnostiquer
POST /api/db/health   # diagnostiquer + réparer
```

La réponse correspond au `DbHealthCheckResult` produit par `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`) :

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Les budgets de domaine faisaient référence à des clés d’API qui n’existent plus.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| Champ             | Signification                                                                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` lorsque `issues` est vide. `driver` n’a jamais d’incidence sur cette valeur.                                                                                                                   |
| `issues[].type`   | L’une des valeurs suivantes : `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                                        |
| `repairedCount`   | Nombre de lignes réparées lors de cette exécution ; toujours égal à `0` lorsque `autoRepair` vaut false.                                                                                              |
| `backupCreated`   | Indique si une sauvegarde a été effectuée avant la réparation.                                                                                                                                        |
| `checkedAt`       | Horodatage ISO commun à l’exécution et à toute note de réparation qu’elle écrit.                                                                                                                      |
| `driver.name`     | Pilote SQLite utilisé pour la base de données vérifiée.                                                                                                                                               |
| `driver.degraded` | `true` lorsque les écritures ne sont pas sauvegardées durablement dans le fichier de base de données — solution de repli WASM `sql.js` (persistance du fichier entier) ou base de données en mémoire. |

La même charge utile est renvoyée par l’outil MCP `omniroute_db_health_check`.

Exécutez `PRAGMA integrity_check` pour détecter toute corruption :

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Devrait afficher : ok
```

Si la commande renvoie autre chose que `ok`, **cessez immédiatement d’utiliser la base de données** et restaurez-la à partir d’une sauvegarde.

---

## Reprise après sinistre

### Scénario 1 : fichier WAL perdu

Le fichier `-wal` est manquant, mais le fichier `-shm` et la base de données principale sont intacts :

```bash
# Récupération automatique à la prochaine ouverture
omniroute
```

Si SQLite ne peut pas effectuer la récupération automatique :

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scénario 2 : fichier principal de la base de données corrompu

Restaurez à partir d'une sauvegarde :

```bash
omniroute sync pull --merge   # ou : omniroute backup restore <backup-id>
```

### Scénario 3 : clé de chiffrement perdue

**Aucune récupération n'est possible** sans la clé. Les champs chiffrés sont illisibles. Ajoutez à nouveau manuellement tous les fournisseurs avec de nouveaux identifiants.

> **Mesure préventive** : sauvegardez toujours la clé de chiffrement séparément, idéalement dans un gestionnaire de mots de passe ou un KMS.

### Scénario 4 : disque plein

SQLite renverra des erreurs `SQLITE_FULL`. Libérez de l'espace disque, puis :

```bash
# Effectuer un point de contrôle du WAL pour libérer de l'espace
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Opérations courantes

### Inspecter une table

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Compter les lignes de toutes les tables

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Réinitialiser (effacer) toutes les données

```bash
# Arrêter d'abord OmniRoute
omniroute stop

# Supprimer le fichier de la base de données
rm ~/.omniroute/storage.sqlite*

# Redémarrer (une base de données vide sera recréée)
omniroute
```

Pour une réinitialisation **sélective** (conserver les fournisseurs, effacer les données d'utilisation) :

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Exporter une seule table

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Dépannage

### « La base de données est verrouillée »

Un autre processus détient un verrou en écriture. Vous pouvez :

- Attendre que l'autre processus se termine (vérifiez avec `lsof | grep storage.sqlite`)
- Arrêter l'autre processus
- Si le problème persiste, redémarrer OmniRoute

### « Échec de la contrainte de clé étrangère »

Un module de domaine enfreint l'intégrité référentielle. Vérifiez :

- Les lignes orphelines dans les tables dépendantes
- Les suppressions en cascade qui ne se sont pas propagées
- Une migration récente ayant modifié une clé étrangère

Exécutez `PRAGMA foreign_key_check;` pour trouver les violations.

### « Mémoire insuffisante »

Les E/S mappées en mémoire de SQLite dépassent la limite du système d'exploitation. Réduisez leur taille à l'aide d'un pragma SQLite :

```sql
PRAGMA mmap_size = 134217728;  -- 128 Mo au lieu de 256 Mo
```

Ou désactivez-les :

```sql
PRAGMA mmap_size = 0;
```

### « Échec de la migration en cours d'exécution »

La migration a été exécutée dans une transaction ; elle devrait donc avoir été annulée. Si ce n'est pas le cas :

1. **Arrêtez OmniRoute** (pour empêcher de nouvelles tentatives)
2. **Vérifiez l'état de la base de données** avec `sqlite3`
3. **Corrigez manuellement** la migration partielle
4. **Relancez** OmniRoute (la migration sera retentée)

Pour éviter ce problème, testez toujours d'abord les migrations sur une copie.

---

## Voir aussi

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tables d'utilisation
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — surveillance de l'état
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — processus de publication
- Source : `src/lib/db/` (plus de 80 fichiers, environ 25 000 lignes de code)
