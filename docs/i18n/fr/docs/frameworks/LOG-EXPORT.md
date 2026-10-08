# Log export (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Export continu et incrémentiel des journaux d’appels d’OmniRoute vers un magasin d’analytique externe.

L’onglet du tableau de bord Logs conserve l’historique des requêtes dans SQLite (`call_logs`), avec une taille limitée par la rotation et la rétention. L’exportation des journaux envoie périodiquement le même ensemble d’enregistrements afin qu’il puisse survivre à la base de données locale et être rapproché d’autres données. BigQuery est la première destination ; le pipeline repose sur un registre, ce qui permet d’ajouter d’autres destinations.

---

## 1. Fonctionnement

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (l’ensemble de champs de l’onglet Logs)
      → client de destination.send(lot)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Planification** — une tâche cron `JobRegistry`, `log_export`, configurée par défaut sur `0 * * * *` (toutes les heures, UTC). Enregistrée dans `src/lib/initCloudSync.ts` ; peut être remplacée avec `OMNIROUTE_LOG_EXPORT_CRON`. À chaque déclenchement, toutes les destinations **activées** sont vidées, séquentiellement.
- **Curseur** — le `call_logs.rowid` implicite de SQLite, conservé pour chaque destination dans `log_export_destinations.cursor_row_id`. `timestamp` n’est délibérément pas utilisé comme curseur : les appelants peuvent fournir leur propre valeur, de sorte qu’une requête lente peut être écrite après une requête plus rapide ayant commencé plus tard, et qu’un curseur fondé sur l’horodatage l’ignorerait.
- **Traitement par lots** — `batch_size` lignes par requête (500 par défaut), `max_rows_per_run` lignes par exécution (10000 par défaut), afin qu’un retard important soit résorbé sur plusieurs déclenchements au lieu d’en bloquer un seul.
- **Livraison** — le curseur n’avance qu’après la résolution de `send()`. En cas d’échec d’un lot, le curseur reste inchangé, de sorte que les mêmes lignes sont retentées lors de l’exécution suivante. La garantie est une livraison au moins une fois avec déduplication côté destination, et non une livraison strictement une seule fois : BigQuery identifie chaque ligne par l’identifiant du journal d’appel, qu’il respecte au mieux dans les limites de sa propre fenêtre de déduplication.
- **Protection contre les chevauchements** — le déclenchement cron et `POST .../run` peuvent survenir simultanément. Une destination déjà en cours de vidage est ignorée plutôt que vidée deux fois (`skipped: true` dans le résultat de l’exécution), afin qu’une exécution simultanée ne puisse ni renvoyer un lot ni faire reculer le curseur.
- **Récupération après purge** — si `cursor_row_id` se retrouve au-dessus de `MAX(rowid)` (la table entière a été purgée et les rowids ont redémarré), l’exécuteur revient à 0 au lieu de rester définitivement aveugle.

### Charges utiles (prompts et réponses générées)

Par défaut, l’exportation contient uniquement les champs récapitulatifs affichés par la **liste** de Logs. L’activation de **Exporter les prompts et les réponses** (`includeBodies`) envoie également ce que le panneau de **détail** de Logs affiche pour chaque appel :

| Champ                            | Contenu                                                                             |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| `request_body` / `response_body` | Les charges utiles de l’appel telles que le tableau de bord les affiche             |
| `pipeline_route_decision`        | La cible et le modèle choisis par le routeur                                        |
| `pipeline_client_request`        | La requête brute exactement telle qu’elle a été envoyée par le client               |
| `pipeline_openai_request`        | Après traduction vers le format OpenAI interne                                      |
| `pipeline_provider_request`      | Telle qu’elle a effectivement été envoyée en amont, dans le dialecte du fournisseur |
| `pipeline_provider_response`     | La réponse brute provenant du service en amont                                      |
| `pipeline_client_response`       | Ce qui a été renvoyé à l’appelant                                                   |
| `pipeline_error`                 | Détails de l’erreur au niveau du pipeline pour un appel ayant échoué                |
| `bodies_truncated`               | Vrai lorsqu’un des champs ci-dessus a atteint `maxBodyBytes`                        |

Il s’agit du contenu des prompts ; cette option est donc **désactivée par défaut** et constitue délibérément un choix propre à chaque destination. Le contenu exporté correspond à ce qu’affiche le tableau de bord, car les deux passent par `getCallLogById` : les charges utiles sont déjà nettoyées des informations personnelles identifiables et expurgées des secrets lors de leur écriture, et un appel effectué avec une clé API `noLog` ne stocke aucune charge utile ; il n’y a donc rien à exporter.

Les charges utiles sont lues ligne par ligne depuis l’artefact du système de fichiers ; l’hydratation n’est donc effectuée que pour les destinations qui l’ont demandée. Si l’artefact d’une ligne est absent ou corrompu, son récapitulatif est exporté avec des charges utiles nulles au lieu de faire échouer le lot et de bloquer le curseur.

`maxBodyBytes` (262144 par défaut) limite la taille de chaque champ. Les charges utiles plus longues sont **tronquées plutôt que supprimées** — un prompt tronqué permet encore de savoir « ce qui a été demandé » — et la ligne est marquée avec `bodies_truncated`. Les deltas diffusés fragment par fragment ne sont pas exportés ; la réponse assemblée se trouve déjà dans `pipeline_provider_response` et `pipeline_client_response`.

---

## 2. Fichiers

| Élément                       | Emplacement                                  |
| ----------------------------- | -------------------------------------------- |
| Contrat de destination        | `src/lib/logExport/types.ts`                 |
| Registre                      | `src/lib/logExport/registry.ts`              |
| Gestion des secrets           | `src/lib/logExport/secrets.ts`               |
| Exécuteur (boucle de curseur) | `src/lib/logExport/runner.ts`                |
| Projection API                | `src/lib/logExport/presenter.ts`             |
| Destination BigQuery          | `src/lib/logExport/destinations/bigquery.ts` |
| Authentification Google SA    | `src/lib/logExport/googleServiceAccount.ts`  |
| Source des journaux d’appels  | `src/lib/usage/callLogExportSource.ts`       |
| Persistance                   | `src/lib/db/logExportDestinations.ts`        |
| Tâche cron                    | `src/lib/jobs/logExportJob.ts`               |
| Couche REST                   | `src/app/api/log-export/`                    |
| Page du tableau de bord       | `src/app/(dashboard)/dashboard/log-export/`  |

Schéma : `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Toutes les routes sont authentifiées pour la gestion (`requireManagementAuth`). Les secrets ne sont jamais renvoyés :
un secret stocké est renvoyé sous la forme littérale `__stored__`, et le renvoi de cette valeur lors d’une mise à jour
conserve l’identifiant stocké.

La création ou la mise à jour d’une destination dont le type déclare un secret **nécessite
`STORAGE_ENCRYPTION_KEY`**. Sans cette variable, `encrypt()` laisse silencieusement les données inchangées ; l’écriture est donc
refusée avec un code 400 plutôt que d’enregistrer un identifiant en clair dans SQLite (la même protection est
appliquée par le webhook Telegram).

| Méthode  | Chemin                                   | Objectif                                                                       |
| -------- | ---------------------------------------- | ------------------------------------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | Types de destinations et liste de leurs champs de configuration                |
| `GET`    | `/api/log-export/destinations`           | Répertorier les destinations (secrets masqués)                                 |
| `POST`   | `/api/log-export/destinations`           | Créer une destination                                                          |
| `GET`    | `/api/log-export/destinations/{id}`      | Lire une destination                                                           |
| `PUT`    | `/api/log-export/destinations/{id}`      | Mettre à jour le nom, l’activation, la configuration ou le traitement par lots |
| `DELETE` | `/api/log-export/destinations/{id}`      | Supprimer                                                                      |
| `POST`   | `/api/log-export/destinations/{id}/test` | Tester les identifiants, sans rien écrire                                      |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Vider maintenant, via le même chemin que l’exécution planifiée                 |
| `GET`    | `/api/log-export/status`                 | État du cron, exécutions récentes et arriéré par cible                         |

`GET /api/log-export/types` est ce qui rend l’interface utilisateur générique : le formulaire du tableau de bord est généré à partir
des descripteurs de champs renvoyés, de sorte qu’une nouvelle destination ne nécessite aucune modification de l’interface utilisateur.

---

## 4. Destination BigQuery

Clés de configuration (`type: "bigquery"`) :

| Clé                  | Remarques                                                                               |
| -------------------- | --------------------------------------------------------------------------------------- |
| `projectId`          | Projet GCP contenant le jeu de données                                                  |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                         |
| `tableId`            | `[A-Za-z0-9_]+`                                                                         |
| `location`           | Utilisé uniquement lorsque le jeu de données doit être créé (valeur par défaut : `EU`)  |
| `serviceAccountJson` | Clé de compte de service. Secret : chiffrée au repos, jamais renvoyée                   |
| `autoCreate`         | Créer le jeu de données et la table lors du premier export (valeur par défaut : `true`) |

Le compte de service nécessite `bigquery.tables.updateData` sur la table cible, ainsi que
`bigquery.datasets.create` / `bigquery.tables.create` lorsque `autoCreate` est activé.

Un lot configuré est une unité de **curseur**, et non une unité HTTP : `send()` le divise en appels insertAll
de 500 lignes au maximum, de sorte qu’une valeur `batch_size` élevée ne puisse pas dépasser la limite de requête de 10 Mo de BigQuery.
Les statuts transitoires (408/429/500/502/503/504) font l’objet de trois nouvelles tentatives au maximum avec un délai
exponentiel, en réutilisant les mêmes insertIds ; les erreurs d’authentification et de schéma déclenchent une exception dès la première tentative plutôt
que de gaspiller l’exécution.

Une table créée quelques instants auparavant n’est pas encore visible par le point de terminaison de streaming, qui renvoie
une erreur 404 pendant quelques secondes. Cette erreur 404 fait l’objet de nouvelles tentatives, mais **uniquement lorsque cette exécution a créé la table** —
une table réellement absente provoque toujours un échec immédiat. Notez que recréer une table sous un nom qui
a été supprimé récemment conduit BigQuery à refuser les insertions en streaming pendant plusieurs minutes ; il s’agit d’une
propriété de la suppression suivie d’une recréation. Préférez donc un nouveau nom de table plutôt que de supprimer puis recréer une table.

**Un échec partiel arrive sous la forme d’une réponse HTTP 200 avec un tableau `insertErrors[]` non vide.** Il est traité comme
un échec et déclenche une exception, ce qui empêche le curseur d’avancer au-delà des lignes que BigQuery n’a jamais
acceptées ; `tests/unit/log-export-bigquery.test.ts` garantit ce comportement.

Le transport utilise directement REST : une assertion RS256 auto-signée est échangée contre un jeton d’accès à l’adresse
`https://oauth2.googleapis.com/token`, puis les lignes sont envoyées à `tabledata.insertAll`. Aucun SDK Google n’est
inclus. Les jetons d’accès sont mis en cache dans le processus pour chaque paire (compte de service, portée).

La table créée contient une colonne pour chaque champ de l’onglet Journaux, ainsi que `exported_at`, et sa structure est adaptée à
la manière dont les journaux d’appels sont réellement interrogés :

- **Partitionnée par jour sur `timestamp`**, de sorte qu’une requête limitée par date n’analyse que les jours concernés.
- **Regroupée par `api_key_name`, `provider`, `model`, `status`** (dans cet ordre), de sorte qu’un filtrage par
  utilisateur, destination ou statut d’échec élimine des blocs au sein de chaque partition. BigQuery
  autorise au maximum quatre colonnes de regroupement, et leur ordre est important : un filtre uniquement sur `api_key_name`
  élimine des blocs, contrairement à un filtre uniquement sur `status`.
- **Conservation facultative des partitions** via `partitionExpirationDays` (`0` conserve tout), appliquée
  lors de la création de la table.

Les deux paramètres s’appliquent au moment de la création. Une table existante conserve sa disposition actuelle ; indiquez donc comme destination un nouvel identifiant de table si vous souhaitez les adopter.

`tests/unit/log-export-bigquery.test.ts` vérifie que le mappeur et le schéma de la table restent synchronisés, afin qu’une nouvelle colonne du journal des appels ne puisse pas être omise silencieusement lors de l’exportation.

Les lots sont découpés en fonction **à la fois** du nombre de lignes et du nombre d’octets sérialisés. Le nombre de lignes seul ne suffit pas une fois les charges utiles exportées : 500 lignes contenant des prompts peuvent représenter des dizaines de mégaoctets, et insertAll rejette toute requête dépassant 10 MB. Les segments sont clôturés dès qu’ils atteignent 500 lignes ou 9 MB, selon la première limite atteinte.

---

## 5. Ajout d’une destination

1. Créez `src/lib/logExport/destinations/<name>.ts` exportant un `LogExportDestinationType` :
   un `configSchema` Zod, un tableau de descripteurs `fields` pour l’interface utilisateur, des
   `secretFields`, et une fonction `createClient(config)` renvoyant `test()` / `prepare()` / `send(records)`.
2. Ajoutez-la au tableau `DESTINATIONS` dans `src/lib/logExport/registry.ts`.
3. Écrivez des tests sous `tests/unit/`.

C’est l’intégralité de la modification : la persistance, la tâche cron, la couche REST, le chiffrement
des secrets et le formulaire du tableau de bord lisent tous le registre.

Deux règles s’appliquent à une nouvelle destination :

- `send()` **doit lever une exception** en cas d’échec partiel. Une résolution signifie que « la
  destination possède ces lignes », et le curseur les dépasse définitivement.
- Une destination qui accepte une URL fournie par l’utilisateur doit la valider à l’aide de
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) avant d’effectuer
  la requête, de la même manière que les webhooks. BigQuery n’en a pas besoin : ses hôtes sont
  des constantes.

---

## 6. Exploitation

- **Tableau de bord** : Intégrations → Exportation des journaux. Ajoutez une destination, exécutez
  **Tester** pour vérifier les identifiants sans écrire de lignes, puis activez-la.
- **File d’attente** : chaque carte de destination affiche les lignes en attente et le curseur ;
  `GET /api/log-export/status` renvoie les mêmes chiffres, ainsi que les 20 dernières exécutions
  de la tâche.
- **L’échec d’une destination n’entraîne pas celui des autres** — le résumé de l’exécution
  enregistre l’état de chaque destination dans `last_status` / `last_error`, et l’historique des
  exécutions de la tâche conserve le résultat agrégé.
- **La suppression d’une destination supprime son curseur.** Si elle est ajoutée à nouveau, elle
  repart du journal d’appels conservé le plus ancien, ce qui renvoie des lignes que la destination
  contient peut-être déjà. Sur BigQuery, l’`insertId` de chaque ligne n’absorbe ces doublons que
  pendant la propre fenêtre de déduplication de BigQuery ; il est donc préférable de désactiver
  une destination plutôt que de la supprimer.
