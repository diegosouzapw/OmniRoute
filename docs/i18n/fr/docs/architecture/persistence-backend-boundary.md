# ADR: Pluggable persistence boundary (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Statut :** Proposé — nécessite l’approbation d’un mainteneur avant le début des travaux sur l’environnement d’exécution
- **Ticket de suivi :** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Périmètre :** Architecture de persistance uniquement ; cette décision n’ajoute ni ne sélectionne de base de données externe

## Contexte

OmniRoute expose actuellement des fonctions de persistance orientées domaine depuis `src/lib/db/`, tandis que la
connexion partagée renvoyée par `src/lib/db/core.ts` implémente le contrat synchrone `SqliteAdapter`
défini dans `src/lib/db/adapters/types.ts`. Cet adaptateur prend en charge plusieurs environnements d’exécution SQLite, mais son
interface reste calquée sur SQLite : instructions préparées synchrones, `pragma`, transactions différées et immédiates,
sauvegarde native/par copie de fichier, point de contrôle et handle de base de données locale.

Le chemin actuel de démarrage et de récupération gère également le cycle de vie du fichier SQLite. `src/lib/db/core.ts`
résout `storage.sqlite`, maintient un adaptateur global unique par processus, crée des points de contrôle WAL, préserve certaines
tables lors de la récupération et supprime les fichiers compagnons SQLite lors de la reconstruction d’une base de données. La sélection
du pilote dans `src/lib/db/adapters/driverFactory.ts` choisit parmi les environnements d’exécution SQLite pris en charge ; il
ne s’agit pas d’une abstraction de backend externe.

L’évolution du schéma est couplée de la même manière. `src/lib/db/migrationRunner.ts` applique des fichiers SQL numérotés,
interroge `sqlite_master` et `PRAGMA table_info`, détecte la prise en charge facultative de FTS5 et exécute les
opérations de migration dans des transactions SQLite. Les modules opérationnels tels que `src/lib/db/backup.ts` et
`src/lib/db/optimizationSettings.ts` utilisent directement les sémantiques de sauvegarde, de `PRAGMA`, de WAL, de taille de page, d’auto-vacuum et de `VACUUM`.

Il s’agit de propriétés valides du déploiement SQLite embarqué. Elles doivent rester disponibles sans
contraindre PostgreSQL ou MySQL à émuler une API SQLite.

## Décision

Adopter une frontière de persistance à deux niveaux pour l’état durable portable :

1. **Les contrats de dépôt de domaine** définissent les opérations de persistance nécessaires au code métier et de routage.
   Les appelants dépendent du comportement et des données du domaine, et non du texte SQL, des instructions préparées,
   des fichiers de base de données ou des objets de dialecte.
2. **Un contrat de backend asynchrone interne** prend en charge les implémentations de dépôts avec des
   contextes de transaction, des contrôles d’intégrité/disponibilité, la coordination des migrations, les capacités du backend et
   des erreurs classifiées. L’interface TypeScript exacte sera proposée avec la première PR d’implémentation
   et validée par des tests de conformité ; cet ADR ne fige intentionnellement pas une API spéculative.

SQLite reste l’implémentation par défaut. La cascade existante de pilotes SQLite et l’adaptateur synchrone
`SqliteAdapter` restent derrière l’implémentation SQLite des dépôts, tandis que les domaines sont migrés par
petites tranches verticales. Aucun utilisateur n’est tenu de configurer un service externe.

PostgreSQL est la première implémentation externe proposée après validation de la frontière des dépôts
avec SQLite. MySQL suivra en tant qu’implémentation homologue utilisant la même suite de conformité,
plutôt que comme une seconde bifurcation de la logique métier.

## Règles de la frontière

### Interface portable des dépôts

Un dépôt portable peut exposer :

- des lectures et écritures de domaine ;
- des opérations atomiques explicites et un accès aux dépôts limité à la portée d’une transaction ;
- des opérations de comparaison/mise à jour ou de bail lorsque la sémantique de concurrence fait partie du domaine ;
- une pagination, un tri et des erreurs de contrainte indépendants du backend.

L’intégrité, la disponibilité et la coordination des migrations du backend relèvent du contrat
interne de backend/d’exploitation plutôt que des dépôts de domaine individuels.

Un dépôt portable ne doit pas exposer :

- `prepare`, `get`, `all`, `run` ou des handles bruts de pilote ;
- `PRAGMA`, les modes de point de contrôle WAL, `VACUUM` ou le réglage des pages/du cache ;
- les chemins de fichiers SQLite, les fichiers compagnons ou la sauvegarde par copie de fichier ;
- `lastInsertRowid` en tant que contrat de domaine inter-backends ;
- la syntaxe de FTS5 ou de `sqlite-vec` ;
- une échappatoire générique vers un dialecte utilisée par le code métier normal.

### Interface des capacités du backend

Le comportement propre à chaque backend reste explicite et détectable. La maintenance spécifique à SQLite demeure derrière
sa propre implémentation et son interface opérationnelle, notamment :

- la sélection du pilote d’exécution ;
- le point de contrôle WAL et le comportement d’arrêt de SQLite ;
- les paramètres de taille de page, de taille de cache et d’auto-vacuum ;
- la sauvegarde, la restauration et la récupération du fichier de base de données ;
- l’introspection du schéma SQLite ;
- l’intégration de FTS5 et de `sqlite-vec`.

Un backend externe n’est pas tenu d’imiter ces fonctionnalités. Les dépôts doivent soit utiliser une
capacité portable, soit fournir une implémentation spécifique au backend avec un comportement documenté, soit signaler
qu’une capacité n’est pas disponible.

## Modèle de transaction et de migration

Les API des dépôts définissent l’opération métier atomique ; les appelants ne sélectionnent pas de mode de transaction SQL.
Chaque opération doit définir ses garanties de concurrence observables : invariants protégés, détection des conflits, classification des nouvelles tentatives, exigences d’idempotence et propagation du contexte transactionnel.
Les implémentations peuvent utiliser différents mécanismes de transaction et d’isolation uniquement lorsque ces garanties observables restent équivalentes. SQLite peut continuer à utiliser en interne son comportement actuel de transaction différée ou immédiate lorsqu’il respecte le contrat de l’opération.

Les backends externes nécessitent une responsabilité explicite des migrations afin d’éviter que plusieurs réplicas de l’application exécutent simultanément la même modification de schéma. Les historiques de migration des backends peuvent partager des jalons logiques, mais les fichiers SQL SQLite ne sont pas supposés être portables ni réutilisables avec un autre dialecte.

## Sémantique de conformité entre backends

Les tests de conformité doivent couvrir le comportement, et pas seulement les signatures des méthodes des dépôts. Chaque domaine migré doit définir et vérifier :

- le fuseau horaire, la précision et la sérialisation des horodatages ;
- les attentes relatives au tri des valeurs `NULL`, à l’interclassement et à la sensibilité à la casse ;
- la représentation JSON et le comportement des comparaisons ;
- la précision des nombres entiers, décimaux et des valeurs monétaires ;
- un ordre stable et des critères de départage déterministes pour la pagination ;
- la génération des identifiants sans dépendre des identifiants de lignes SQLite ;
- la classification des violations de contraintes d’unicité et de clés étrangères ;
- le comportement relatif au nombre de lignes affectées pour les opérations sans effet, de comparaison/mise à jour et de suppression ;
- les résultats des écritures concurrentes, les conflits pouvant faire l’objet d’une nouvelle tentative et les nouvelles tentatives idempotentes.

Si un domaine ne peut pas spécifier une sémantique observable équivalente, il n’est pas encore portable et doit rester spécifique au backend jusqu’à ce que ce contrat soit conçu.

## Exigences de compatibilité

Toute implémentation conforme à cet ADR doit préserver les propriétés suivantes :

- SQLite reste l’option par défaut ne nécessitant aucune configuration.
- Les fichiers SQLite existants et l’historique des migrations restent lisibles.
- Les mécanismes de repli SQLite pour npm, Electron, Docker et les environnements d’exécution restreints conservent leur chemin de démarrage actuel.
- Les identifiants d’accès aux fournisseurs qui sont stockés continuent d’utiliser le mécanisme de chiffrement existant de l’application.
- La migration d’un dépôt ne modifie pas silencieusement la sémantique du routage, des quotas, des clés d’API ou de l’audit.
- Le comportement de sauvegarde et de récupération est documenté pour chaque backend plutôt que présenté comme universel.
- Une installation propre utilisant uniquement SQLite ne charge pas et ne requiert pas de pilote de base de données externe.

## Séquence de livraison

1. Publier un inventaire reproductible des dépendances à SQLite en tant qu’artefact de revue distinct.
2. Introduire les premiers contrats des dépôts de domaine ainsi que les tests de conformité.
3. Adapter l’implémentation SQLite existante derrière ces contrats sans modifier les valeurs par défaut.
4. Sous réserve de l’approbation des mainteneurs, ajouter PostgreSQL comme première implémentation externe pour une partie délimitée du plan de contrôle.
5. Étendre l’état partagé uniquement après la mise en place de tests sur les écritures concurrentes et la responsabilité des migrations.
6. Ajouter un processus hors ligne et validé de migration de SQLite vers un backend externe avant d’annoncer la possibilité de changer de base de données.
7. Ajouter MySQL sur la base des contrats éprouvés des dépôts et des backends.

Chaque étape d’exécution fait l’objet d’une PR distincte et révisable. Une étape ultérieure ne doit pas servir à justifier la fusion d’une abstraction non éprouvée lors d’une étape antérieure.

## Première tranche d’implémentation

La première tranche d’exécution doit être sélectionnée après l’examen de l’inventaire des couplages. Les connexions aux fournisseurs, les clés d’API, les combinaisons et la configuration du routage sont des candidats, car leurs tables de base sont visibles dans `src/lib/db/core.ts`, mais cet ADR n’approuve ni une liste de tables ni une PR de migration. La tranche doit inclure :

- des tests de préservation du comportement de SQLite ;
- des tests de conformité des dépôts ;
- des limites de transaction explicites ;
- la vérification du chiffrement et du masquage des identifiants stockés ;
- aucune modification de la configuration de démarrage par défaut.

## Solutions alternatives envisagées

### Ajouter PostgreSQL sous `SqliteAdapter`

Rejeté. `SqliteAdapter` est une couche de compatibilité destinée aux environnements d’exécution SQLite et expose des opérations propres à SQLite. Émuler cette interface introduirait des hypothèses synchrones et propres au dialecte dans un nouveau backend.

### Exposer une API générique de requête/exécution à tous les domaines

Rejeté en tant que frontière principale. Cela centraliserait la gestion des connexions, mais laisserait le couplage au dialecte SQL, aux transactions et aux tables dans les modules métier. Une primitive de backend de bas niveau peut exister dans les implémentations des dépôts, mais pas en tant qu’API de persistance exposée à l’application.

### Réécrire toute la persistance avant de valider une tranche

Rejeté. La surface de persistance actuelle est vaste et comprend le cycle de vie des fichiers, la récupération, la recherche et les paramètres opérationnels. Les tranches verticales fournissent des limites de comportement et de retour en arrière pouvant être examinées.

### Remplacer SQLite comme solution par défaut

Rejeté. Les déploiements embarqués et de bureau dépendent du modèle de démarrage actuel sans service externe. Un backend externe reste optionnel.

### Utiliser Redis comme autorité durable

Rejeté. Redis peut prendre en charge la coordination explicitement éphémère, le cache ou les compteurs, mais ne remplace pas le contrat de dépôt durable décrit ici.

## Conséquences

### Avantages

- Le code métier bénéficie d’une interface de persistance stable, indépendante du dialecte de base de données.
- Le comportement de SQLite est testé avant qu’un backend externe ne définisse l’abstraction.
- PostgreSQL et MySQL partagent des contrats et des tests au lieu de dupliquer la logique métier.
- Les fonctionnalités propres à SQLite restent de premier ordre au lieu de devenir des couches de compatibilité dont les détails transparaissent.
- Le comportement des migrations et des transactions avec plusieurs réplicas devient une préoccupation de conception explicite.

### Coûts et risques

- L’extraction des dépôts nécessite une migration progressive des sites d’appel.
- Les frontières asynchrones peuvent se propager dans du code de service actuellement synchrone.
- La sémantique multibackend nécessite des tests de conformité allant au-delà de la compatibilité de la syntaxe SQL.
- La sauvegarde, la recherche, le stockage vectoriel et la maintenance restent spécifiques aux capacités.
- L’exécution de plusieurs implémentations de persistance augmente le coût de l’intégration continue et du support opérationnel.

## Non-objectifs

Cet ADR ne vise pas à :

- ajouter une dépendance de base de données, une variable d’environnement, un schéma ou une migration ;
- modifier le singleton SQLite actif ou la cascade de pilotes ;
- promettre la prise en charge de PostgreSQL ou de MySQL dans une version spécifique ;
- rendre portables FTS5, `sqlite-vec`, les fichiers de sauvegarde ou la maintenance SQLite ;
- définir la préparation à un fonctionnement actif-actif avant que des tests d’état partagé et de coordination n’existent ;
- approuver une réécriture en une seule fois de `src/lib/db/`.

## Questions ouvertes nécessitant l’approbation du mainteneur

1. Le dépôt avec une frontière de backend asynchrone interne constitue-t-il l’orientation privilégiée, ou la persistance externe doit-elle
   être placée derrière un service distinct de plan de contrôle ?
2. PostgreSQL est-il acceptable comme première implémentation externe après validation de la conformité avec SQLite ?
3. Quel domaine doit constituer la première tranche délimitée du dépôt ?
4. Quel état doit être partagé pour le premier jalon multi-réplicas, et lequel doit rester local au nœud ?
5. Quelle fenêtre de compatibilité est requise en cas d’interruption ou d’annulation d’une migration du dépôt ?

Tant que ces questions ne sont pas résolues, ce document reste une proposition et aucune refactorisation à l’exécution n’est envisagée.
