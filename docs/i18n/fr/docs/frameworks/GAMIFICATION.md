# Gamification & Leaderboard System (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Source de vérité :** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Dernière mise à jour :** 2026-06-28 — v3.8.40

OmniRoute comprend une couche de gamification privilégiant le stockage local, qui récompense les utilisateurs lorsqu’ils interagissent avec la plateforme — en effectuant des requêtes, en changeant de fournisseurs, en créant des combinaisons, en partageant des jetons et en contribuant à la communauté. L’intégralité de l’état est stockée dans SQLite ; la fédération avec les serveurs communautaires est facultative et repose sur l’envoi de données.

Le système est conçu pour n’ajouter **aucune latence au chemin critique** — les événements de gamification sont distribués sans attente depuis le pipeline de requêtes et ne bloquent jamais une réponse du LLM.

---

## Vue d’ensemble

### Objectif

Accroître l’engagement et la fidélisation des utilisateurs en offrant une progression visible (XP, niveaux, badges), une preuve sociale (classements) et des incitations économiques (partage de jetons, récompenses d’invitation).

### Périmètre

| Fonctionnalité              | Description                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| XP et niveaux               | Gagner de l’XP pour chaque action ; monter de niveau selon une courbe polynomiale          |
| Badges                      | Plus de 20 récompenses réparties dans 5 catégories et 4 niveaux de rareté                  |
| Séries                      | Suivi de l’utilisation active quotidienne avec la série actuelle et la plus longue         |
| Classements                 | Classements globaux, hebdomadaires, mensuels, par partage de jetons et par contribution    |
| Partage de jetons           | Transférer des crédits entre utilisateurs au moyen d’un registre en partie double          |
| Invitation et utilisation   | Codes de parrainage stockés sous forme de hachages SHA-256                                 |
| Serveurs communautaires     | Se fédérer avec des instances OmniRoute externes                                           |
| Protection contre la triche | Calcul des scores côté serveur, limitation du débit et détection des anomalies par score z |

### Principes de conception

1. **Priorité au stockage local** — l’intégralité de l’état est stockée dans SQLite, sans nécessiter de services externes.
2. **Non bloquant** — les événements sont distribués sans attente ; le chemin de réponse du LLM n’est jamais retardé par la logique de gamification.
3. **Serveur faisant autorité** — l’XP est calculée uniquement côté serveur ; les clients ne peuvent pas gonfler leurs scores.
4. **Respect de la vie privée** — la participation aux classements est facultative ; les utilisateurs peuvent masquer leur profil.
5. **Prêt pour la fédération** — les serveurs communautaires peuvent envoyer les scores via une API signée ; la synchronisation remplace les données, elle ne les cumule pas.

---

## Architecture

### Flux général

```
Requête du client
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (pipeline existant) ...
      → réponse en amont envoyée au client
      → setImmediate (sans attente) :
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

L’émetteur d’événements constitue l’unique point d’intégration. `chatCore.ts` appelle `emitGamificationEvent()` après l’envoi de la réponse ; le module d’événements distribue ensuite le traitement aux sous-systèmes d’XP, de séries, de badges, de classements et de protection contre la triche.

### Graphe des dépendances des modules

```
src/lib/gamification/
  events.ts          ← point d’entrée (appelé depuis chatCore.ts)
    ├── xp.ts        ← calcul de l’XP et détermination du niveau
    ├── streaks.ts   ← suivi des séries d’activité quotidienne
    ├── badges.ts    ← évaluation des critères des badges
    ├── leaderboard.ts ← calcul du classement et diffusion SSE
    ├── antiCheat.ts ← limitation du débit et détection des anomalies
    ├── sharing.ts   ← registre des transferts de jetons
    ├── invites.ts   ← gestion des codes d’invitation et d’utilisation
    ├── servers.ts   ← fédération des serveurs communautaires
    └── notifications.ts ← flux de notifications SSE

src/lib/db/
  gamification.ts    ← toutes les opérations CRUD (8 tables)

src/app/api/gamification/
  leaderboard/       ← GET des classements, POST d’actualisation manuelle
  leaderboard/stream ← mises à jour en temps réel via SSE
  transfer/          ← GET de l’historique, POST d’envoi de jetons
  invite/            ← GET/POST des codes, DELETE de révocation
  invite/redeem/     ← POST d’utilisation d’un code
  servers/           ← GET/POST/DELETE des serveurs communautaires
  federation/score/  ← POST d’envoi d’un score au serveur
  federation/leaderboard/ ← GET de récupération du classement depuis le serveur
  notifications/     ← notifications SSE de badge et de montée de niveau
  anomalies/         ← GET des rapports d’anomalies (administration)
  rotate/            ← POST de rotation des secrets des jetons d’invitation
```

---

## Couche de données

### Tables de la base de données

Toutes les tables se trouvent dans la base de données SQLite principale d’OmniRoute, créée par la migration
`060_create_gamification.sql`. La journalisation WAL est héritée du singleton
`getDbInstance()` dans `src/lib/db/core.ts`.

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels          │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ api_key_id    TEXT PK    │
│ api_key_id    TEXT      │     │ xp            INTEGER    │
│ scope         TEXT      │     │ level         INTEGER    │
│ score         INTEGER   │     │ title         TEXT       │
│ period        TEXT      │     │ updated_at    TEXT       │
│ updated_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────┐     ┌──────────────────────────┐
│     user_badges         │     │    badge_definitions      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ badge_id      TEXT FK   │     │ category      TEXT       │
│ earned_at     TEXT      │     │ rarity        TEXT       │
│ notified      INTEGER   │     │ criteria_type TEXT       │
└─────────────────────────┘     │ criteria      TEXT(JSON) │
                                │ description   TEXT       │
                                │ icon          TEXT       │
                                │ hidden        INTEGER    │
                                └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│     xp_audit_log        │     │     token_ledger         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ from_key_id   TEXT       │
│ action        TEXT      │     │ to_key_id     TEXT       │
│ xp_awarded    INTEGER   │     │ amount        INTEGER    │
│ metadata      TEXT(JSON)│     │ idempotency_key TEXT UQ  │
│ created_at    TEXT      │     │ created_at    TEXT       │
└─────────────────────────┘     └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│    invite_tokens        │     │   community_servers      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ code          TEXT UQ   │     │ url           TEXT       │
│ token_hash    TEXT      │     │ token_hash    TEXT       │
│ uses          INTEGER   │     │ status        TEXT       │
│ max_uses      INTEGER   │     │ last_sync     TEXT       │
│ created_at    TEXT      │     │ created_at    TEXT       │
│ expires_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
```

### Module de domaine : `src/lib/db/gamification.ts`

Suit le modèle standard d’OmniRoute — importe `getDbInstance()` depuis
`core.ts` et exporte des fonctions CRUD typées. Aucun SQL brut dans les gestionnaires de routes.

Fonctions principales :

| Fonction                   | Description                                                     |
| -------------------------- | --------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Insère ou met à jour le score pour (api_key_id, scope, period)  |
| `getLeaderboard()`         | Classement paginé pour un scope et une period donnés            |
| `getUserLevel()`           | Récupère ou crée l’enregistrement de niveau d’un utilisateur    |
| `updateUserLevel()`        | Définit atomiquement l’XP, le niveau et le titre                |
| `getBadgeDefinitions()`    | Toutes les définitions de badges (avec filtrage facultatif)     |
| `getUserBadges()`          | Badges obtenus par un utilisateur                               |
| `awardBadge()`             | Insère l’obtention d’un badge (idempotent sur badge_id)         |
| `logXpAction()`            | Ajoute une entrée à xp_audit_log                                |
| `getXpAuditLog()`          | Historique d’audit paginé pour un utilisateur                   |
| `insertLedgerEntry()`      | Transfert en partie double (dans une transaction)               |
| `getBalance()`             | Somme des montants reçus moins ceux envoyés pour un utilisateur |
| `getTransferHistory()`     | Journal paginé des transferts                                   |
| `createInviteToken()`      | Insère un code d’invitation et un jeton haché                   |
| `redeemInviteToken()`      | Recherche par code, valide et incrémente uses                   |
| `upsertCommunityServer()`  | Enregistre ou met à jour un serveur de fédération               |
| `getCommunityServers()`    | Répertorie les serveurs d’un utilisateur                        |
| `deleteCommunityServer()`  | Supprime l’enregistrement d’un serveur                          |

---

## Système d’XP / de niveaux

**Fichier :** `src/lib/gamification/xp.ts`

### Courbe de progression

L’XP nécessaire pour atteindre le niveau `n` suit une courbe polynomiale :

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Niveau | XP jusqu’au niveau suivant | XP cumulée | Titre       |
| ------ | -------------------------- | ---------- | ----------- |
| 1      | 100                        | 100        | Débutant    |
| 5      | 1,118                      | 2,415      | Débutant    |
| 10     | 3,162                      | 10,523     | Explorateur |
| 25     | 12,500                     | 86,024     | Explorateur |
| 50     | 35,355                     | 345,529    | Expert      |
| 75     | 64,952                     | 948,683    | Maître      |
| 100    | 100,000                    | 2,050,000  | Légende     |

### Titres

| Plage de niveaux | Titre       |
| ---------------- | ----------- |
| 1 – 9            | Débutant    |
| 10 – 24          | Explorateur |
| 25 – 49          | Expert      |
| 50 – 74          | Maître      |
| 75 – 100         | Légende     |

### Récompenses en XP

| Action            | XP  | Description                                                          |
| ----------------- | --- | -------------------------------------------------------------------- |
| `request`         | 1   | Par requête API acheminée via OmniRoute                              |
| `provider_switch` | 5   | Passage à un autre fournisseur                                       |
| `model_switch`    | 3   | Passage à un autre modèle                                            |
| `combo_create`    | 10  | Création d’un nouveau combo                                          |
| `combo_use`       | 2   | Utilisation d’un combo pour une requête                              |
| `token_share`     | 1   | Par tranche de 1 000 tokens partagés avec un autre utilisateur       |
| `invite_redeem`   | 50  | Utilisation d’un code d’invitation                                   |
| `daily_login`     | 5   | Utilisation active quotidienne (une fois par jour)                   |
| `streak_bonus`    | 2   | Par jour consécutif de série (multiplié par la longueur de celle-ci) |
| `badge_unlock`    | 10  | Déblocage d’un badge                                                 |

### Flux d’attribution

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Rechercher `XP_REWARDS[action]` pour obtenir la quantité d’XP.
2. Passer par `checkRateLimit()` (anti-triche : 1000 XP/min maximum par clé).
3. Ouvrir une transaction :
   - Lire la ligne `user_levels` actuelle.
   - Ajouter l’XP ; recalculer le niveau via `levelFromXp(totalXp)`.
   - Si le niveau a changé, définir `levelUp = true`.
   - Mettre à jour la ligne `user_levels`.
   - Insérer une entrée dans `xp_audit_log`.
4. Renvoyer le résultat. L’appelant gère les notifications.

### Fonction auxiliaire : `levelFromXp(totalXp)`

Parcourt les niveaux de 1 à 100, en additionnant `xp_for_level(n)` jusqu’à ce que l’XP cumulée
dépasse `totalXp`. Renvoie le niveau le plus élevé dont le seuil est atteint.
Cette opération est en O(100) — ce qui est acceptable puisque les niveaux sont plafonnés à 100.

---

## Système de badges

**Fichier :** `src/lib/gamification/badges.ts`

### Catégories

| Catégorie      | Description                            | Exemples de badges                              |
| -------------- | -------------------------------------- | ----------------------------------------------- |
| `usage`        | Jalons basés sur le volume             | Première requête, 1 000 requêtes, 100 000       |
| `sharing`      | Partage de tokens et parrainages       | Premier partage, Généreux (10 partages)         |
| `contribution` | Participation à la communauté          | Créateur de combos, Explorateur de fournisseurs |
| `streak`       | Régularité dans le temps               | Guerrier de la semaine, Dévoué du mois          |
| `rare`         | Succès difficiles à obtenir ou masqués | Adopteur précoce, Signaleur de bugs             |

### Raretés

| Rareté      | Couleur | Indication de probabilité   |
| ----------- | ------- | --------------------------- |
| `common`    | Gris    | La plupart des utilisateurs |
| `uncommon`  | Vert    | Utilisateurs actifs         |
| `rare`      | Bleu    | Utilisateurs assidus        |
| `legendary` | Or      | Top 1 %                     |

### Types de critères

| Type           | Champ        | Description                                                |
| -------------- | ------------ | ---------------------------------------------------------- |
| `action_count` | `count`      | Effectuer une action N fois (p. ex., 1000 requêtes)        |
| `streak`       | `days`       | Maintenir une série pendant N jours consécutifs            |
| `unique_count` | `field`, `n` | Utiliser N valeurs uniques (p. ex., 10 modèles différents) |
| `rank`         | `scope`, `n` | Atteindre le rang N dans un classement donné               |
| `first`        | —            | Être le premier à effectuer une action                     |
| `hidden`       | (variable)   | Critères non affichés avant leur obtention                 |

Les définitions des badges sont stockées dans `badge_definitions` sous forme de `criteria` JSON :

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Flux d’évaluation

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # toutes les définitions
    → getUserBadges(apiKeyId)         # déjà obtenus (ignorer)
    → pour chaque badge non obtenu :
       → matchesCriteria(badge, event, userState)
       → en cas de correspondance : awardBadge(apiKeyId, badgeId)
         → renvoyer la charge utile de notification
```

L’évaluation est **pilotée par les événements** — elle s’exécute après chaque événement de gamification, mais
ne vérifie que les badges dont le `criteria.type` correspond à l’action de l’événement. Cela
permet de maintenir une évaluation rapide (< 5 ms pour la plupart des événements).

### `matchesCriteria(badge, event, userState)`

| Type de critère | Vérification                                                       |
| --------------- | ------------------------------------------------------------------ |
| `action_count`  | `getActionCount(apiKeyId, action) >= count`                        |
| `streak`        | `getCurrentStreak(apiKeyId) >= days`                               |
| `unique_count`  | `getUniqueCount(apiKeyId, field) >= n`                             |
| `rank`          | `getRank(apiKeyId, scope) <= n`                                    |
| `first`         | Aucune entrée antérieure dans `xp_audit_log` pour ce type d’action |
| `hidden`        | Délègue à la sous-vérification appropriée                          |

### Badges intégrés (plus de 20)

<details>
<summary>Liste complète des badges</summary>

| Badge                         | Catégorie    | Rareté     | Critères                            |
| ----------------------------- | ------------ | ---------- | ----------------------------------- |
| Premiers pas                  | utilisation  | commun     | 1 requête                           |
| Échauffement                  | utilisation  | commun     | 100 requêtes                        |
| Utilisateur avancé            | utilisation  | peu commun | 1 000 requêtes                      |
| Centurion                     | utilisation  | rare       | 10 000 requêtes                     |
| OmniPower                     | utilisation  | légendaire | 100 000 requêtes                    |
| Explorateur de fournisseurs   | contribution | commun     | Utiliser 5 fournisseurs différents  |
| Maître des fournisseurs       | contribution | peu commun | Utiliser 20 fournisseurs différents |
| Architecte de combos          | contribution | peu commun | Créer 5 combos                      |
| Grand maître des combos       | contribution | rare       | Créer 25 combos                     |
| Premier partage               | partage      | commun     | 1 transfert de jetons               |
| Généreux                      | partage      | peu commun | 10 transferts de jetons             |
| Philanthrope                  | partage      | rare       | Transférer 10 000 jetons au total   |
| Parrain                       | partage      | commun     | 1 parrainage réussi                 |
| Bâtisseur de réseau           | partage      | peu commun | 10 parrainages réussis              |
| Guerrier de la semaine        | série        | peu commun | Série de 7 jours                    |
| Fidèle du mois                | série        | rare       | Série de 30 jours                   |
| Inarrêtable                   | série        | légendaire | Série de 365 jours                  |
| Adopteur précoce              | rare         | légendaire | Rejoindre pendant la période bêta   |
| Pionnier de la compression    | rare         | peu commun | Utiliser la compression 100 fois    |
| Collectionneur de compétences | rare         | rare       | Utiliser 10 compétences différentes |
| Explorateur de modèles        | contribution | peu commun | Utiliser 15 modèles différents      |

</details>

---

## Suivi des séries

**Fichier :** `src/lib/gamification/streaks.ts`

### Modèle de données

Les séries sont stockées dans la table `key_value` (table utilitaire partagée) sous
des clés avec espace de noms :

| Clé                           | Valeur                           | Description                  |
| ----------------------------- | -------------------------------- | ---------------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Données de la série en cours |

### Logique

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Lire l'enregistrement de la série dans `key_value`.
2. Analyser `{current}`, `{longest}`, `{lastDate}` (chaîne de date ISO).
3. Si `lastDate === today` — aucun changement (déjà comptabilisé aujourd'hui).
4. Si `lastDate === yesterday` — incrémenter `current` ; mettre à jour `longest` si nécessaire.
5. Si `lastDate < yesterday` — réinitialiser `current = 1` (série interrompue).
6. Écrire l'enregistrement mis à jour.
7. Vérifier les jalons : 7, 14, 30, 60, 90, 180, 365 jours. Si l'un d'eux est franchi, définir
   `milestone = true` (l'appelant attribue les XP et vérifie les badges).

### Cas limites

- **Fuseau horaire** : les séries utilisent les dates UTC (`new Date().toISOString().slice(0, 10)`).
  Cela est intentionnel — un fuseau horaire canonique unique empêche de contourner
  le système en changeant de fuseau horaire.
- **Nouveaux utilisateurs** : aucun enregistrement de série n'existe ; la première requête le crée avec
  `current=1, longest=1, lastDate=today`.
- **Plusieurs requêtes par jour** : seule la première requête de la journée UTC
  incrémente la série.

---

## Classement

**Fichier :** `src/lib/gamification/leaderboard.ts`

### Périmètres

| Périmètre       | Période | Description                                                  |
| --------------- | ------- | ------------------------------------------------------------ |
| `global`        | `all`   | XP cumulés depuis toujours                                   |
| `weekly`        | `week`  | XP gagnés pendant la semaine UTC en cours (lun.-dim.)        |
| `monthly`       | `month` | XP gagnés pendant le mois UTC en cours                       |
| `tokens_shared` | `all`   | Nombre total de jetons transférés à d'autres utilisateurs    |
| `contributions` | `all`   | Combos créés + fournisseurs utilisés + compétences utilisées |

### Calcul du rang

Les rangs sont **calculés au moment de la lecture**, et non stockés. Cela évite les données de rang obsolètes
et supprime le besoin de tâches périodiques de recalcul des rangs.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Modèle de requête :

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Rotation des périodes

Les classements hebdomadaires et mensuels sont renouvelés automatiquement :

1. **Archivage** : à la fin d'une période, copier les entrées actuelles dans
   `leaderboard_archive` avec le libellé de la période.
2. **Réinitialisation** : supprimer les entrées de la période expirée.
3. **Déclenchement** : vérifié lors de chaque appel à `updateLeaderboard()` ; la première requête
   d'une nouvelle période déclenche la rotation.

Cela garantit que les classements hebdomadaires sont réinitialisés chaque lundi à 00:00 UTC et que les classements mensuels
sont réinitialisés le 1er de chaque mois.

### Mises à jour SSE en temps réel

**Point de terminaison :** `GET /api/gamification/stream`

```
Client → GET /api/gamification/stream
  → Connexion SSE établie
  → Le serveur envoie immédiatement un instantané des 10 premiers du classement
  → Toutes les 5 secondes : envoi des 10 premiers mis à jour s'ils ont changé
  → Toutes les 15 secondes : commentaire de maintien de connexion (": heartbeat\n\n")
  → Le client se déconnecte → nettoyage (suppression de l'écouteur)
```

Format des événements :

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

Le gestionnaire SSE suit les clients connectés pour chaque périmètre et n'envoie les mises à jour
que lorsque les données du classement ont réellement changé depuis le dernier envoi.

---

## Partage de jetons

**Fichier :** `src/lib/gamification/sharing.ts`

### Comptabilité en partie double

Chaque transfert crée deux lignes dans `token_ledger` :

| Ligne  | `from_key_id` | `to_key_id`  | `amount` |
| ------ | ------------- | ------------ | -------- |
| Débit  | expéditeur    | destinataire | +montant |
| Crédit | destinataire  | expéditeur   | -montant |

Attendez — la convention est la suivante :

| Ligne     | `from_key_id` | `to_key_id`  | `amount` | Signification               |
| --------- | ------------- | ------------ | -------- | --------------------------- |
| Envoi     | expéditeur    | destinataire | +montant | Sortie pour l’expéditeur    |
| Réception | destinataire  | expéditeur   | +montant | Entrée pour le destinataire |

Le solde est calculé comme suit :

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Déroulement du transfert

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Validation** : `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotence** : vérifier si `idempotency_key` existe déjà dans le registre.
   Si oui, renvoyer le résultat mis en cache.
3. **Transaction** (transaction SQLite unique) :
   a. Calculer le solde de l’expéditeur.
   b. Si `balance < amount`, annuler (fonds insuffisants).
   c. Insérer la ligne d’envoi (`from=sender,`.

### Limitation du débit

- 10 transferts par minute et par clé API au maximum.
- 10 000 jetons au maximum par transfert.
- 100 000 jetons transférés par jour et par clé API au maximum.

---

## Jetons d’invitation et d’utilisation

**Fichier :** `src/lib/gamification/invites.ts`

### Format du code

- **Code** : chaîne alphanumérique de 8 caractères (par exemple, `A3K9-X7M2`), lisible par l’utilisateur
  et affichée à celui-ci.
- **Jeton** : jeton aléatoire de 32 octets, stocké sous forme de hachage SHA-256. Utilisé pour
  l’utilisation programmatique (par exemple, les liens URL).

### Stockage

| Colonne      | Valeur                      |
| ------------ | --------------------------- |
| `code`       | `A3K9X7M2` (unique, indexé) |
| `token_hash` | SHA-256(raw_token)          |

Le jeton brut est renvoyé à l’utilisateur une seule fois, lors de sa création. OmniRoute
ne le stocke ni ne l’affiche plus jamais — seul le hachage est conservé.

### Prévention de l’auto-parrainage

Lorsqu’un utilisateur utilise un code, le système vérifie les points suivants :

1. Le code appartient à un autre `api_key_id`.
2. L’utilisateur qui utilise le code n’a jamais utilisé auparavant un code provenant du même
   parrain (jointure sur `invite_tokens` et le journal des utilisations).

Si l’une de ces vérifications échoue, l’utilisation est rejetée avec un message d’erreur clair.

### Expiration et limites

- Valeur par défaut de `max_uses` : 10 (configurable lors de la création).
- Valeur par défaut de `expires_at` : 30 jours après la création.
- Les codes expirés ou épuisés renvoient une réponse HTTP 410 Gone.

---

## Fédération des serveurs communautaires

**Fichier :** `src/lib/gamification/servers.ts`

### Connexion

Un serveur communautaire est enregistré au moyen d’un jeton d’invitation émis par le serveur distant. L’instance locale :

1. Reçoit le jeton d’invitation (par exemple, collé dans le tableau de bord).
2. Appelle `POST /api/gamification/federation/leaderboard` sur le serveur distant afin de valider le jeton et de récupérer le classement actuel.
3. Enregistre le serveur avec `status: connected`.

### Modèle de synchronisation

La fédération utilise une **synchronisation par remplacement**, et non additive :

```
Instance locale                Serveur communautaire
     │                              │
     ├── envoi du score ───────────►│  POST /federation/score
     │   { api_key_id, score }      │  (le serveur valide le hachage du jeton)
     │                              │
     ├── récupération du classement►│  GET /federation/leaderboard
     │◄── N premières entrées ──────┤  (remplace le cache local)
     │                              │
     └── contrôle d’intégrité ─────►│  GET /federation/health
         (toutes les 60 s, délai d’expiration de 5 s) │
```

### Authentification

Les requêtes de fédération incluent :

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Le serveur distant hache le jeton et recherche la ligne correspondante dans `community_servers`. Cela évite de transmettre le hachage enregistré.

### Surveillance de l’état

Chaque enregistrement de serveur assure le suivi des éléments suivants :

| Champ       | Description                                           |
| ----------- | ----------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`                |
| `last_sync` | Horodatage ISO de la dernière synchronisation réussie |
| `failures`  | Échecs consécutifs des contrôles d’intégrité          |

Après 5 échecs consécutifs, l’état passe à `unreachable` et la synchronisation est suspendue jusqu’à ce qu’un contrôle d’intégrité manuel réussisse.

---

## Lutte contre la triche

**Fichier :** `src/lib/gamification/antiCheat.ts`

### Calcul des scores côté serveur

Tous les calculs d’XP sont effectués dans `src/lib/gamification/xp.ts`. Les clients n’envoient jamais de score : ils envoient des actions et le serveur calcule l’XP. La colonne `leaderboard.score` ne peut être modifiée que par du code côté serveur.

### Limitation du débit

| Limite                         | Valeur  | Portée        |
| ------------------------------ | ------- | ------------- |
| XP maximal par minute          | 1,000   | Par clé API   |
| Transferts maximaux par minute | 10      | Par clé API   |
| Montant maximal d’un transfert | 10,000  | Par transfert |
| Transferts quotidiens maximaux | 100,000 | Par clé API   |

Les limites de débit utilisent une fenêtre glissante en mémoire (selon le même modèle que `RateLimitManager` dans `open-sse/services/`). En cas de redémarrage du processus, le système se rabat sur des compteurs stockés dans SQLite.

### Détection des anomalies par score Z

Pour chaque clé API, le système conserve une fenêtre glissante de 7 jours de l’XP gagnée par heure. À chaque attribution d’XP :

1. Calculer le taux horaire actuel d’XP de l’utilisateur.
2. Calculer la moyenne et l’écart-type de la population.
3. Calculer `z = (user_rate - mean) / stddev`.
4. Si `z > 3.0` (3 écarts-types), signaler une anomalie.

Les anomalies sont consignées dans `xp_audit_log` avec `action = 'anomaly_detected'` et affichées dans le tableau de bord d’administration.

### Piste d’audit

Chaque attribution d’XP, transfert, obtention de badge et détection d’anomalie est consigné dans `xp_audit_log` avec les éléments suivants :

| Champ        | Description                                           |
| ------------ | ----------------------------------------------------- |
| `api_key_id` | Qui                                                   |
| `action`     | Ce qui s’est produit (xp_award, transfer, anomaly, …) |
| `xp_awarded` | Quantité (0 pour les événements sans XP)              |
| `metadata`   | JSON avec le contexte (type d’action, cible, …)       |
| `created_at` | Quand (ISO 8601)                                      |

Les administrateurs peuvent interroger l’intégralité de la piste d’audit via `GET /api/gamification/anomalies`.

---

## Routes d’API

Toutes les routes suivent le modèle OmniRoute standard :

```
Route → Pré-vérification CORS → Validation du corps (Zod) → Authentification (extractApiKey)
  → Gestionnaire
```

### Points de terminaison

| Méthode | Chemin                                     | Description                                           | Authentification |
| ------- | ------------------------------------------ | ----------------------------------------------------- | ---------------- |
| GET     | `/api/gamification/leaderboard`            | Obtenir le classement (portée, période, pagination)   | Facultative      |
| POST    | `/api/gamification/leaderboard`            | Forcer l’actualisation du cache du classement         | Requise          |
| GET     | `/api/gamification/stream`                 | Mises à jour du classement en temps réel via SSE      | Facultative      |
| GET     | `/api/gamification/transfer`               | Obtenir l’historique des transferts (pagination)      | Requise          |
| POST    | `/api/gamification/transfer`               | Envoyer des jetons à un autre utilisateur             | Requise          |
| GET     | `/api/gamification/invite`                 | Répertorier mes codes d’invitation                    | Requise          |
| POST    | `/api/gamification/invite`                 | Générer un nouveau code d’invitation                  | Requise          |
| DELETE  | `/api/gamification/invite`                 | Révoquer un code d’invitation                         | Requise          |
| POST    | `/api/gamification/invite/redeem`          | Utiliser un code d’invitation                         | Requise          |
| GET     | `/api/gamification/servers`                | Répertorier les serveurs communautaires               | Requise          |
| POST    | `/api/gamification/servers`                | Se connecter à un serveur communautaire               | Requise          |
| DELETE  | `/api/gamification/servers`                | Se déconnecter d’un serveur communautaire             | Requise          |
| POST    | `/api/gamification/federation/score`       | Envoyer le score au serveur distant                   | Fédération       |
| GET     | `/api/gamification/federation/leaderboard` | Récupérer le classement depuis le serveur distant     | Fédération       |
| GET     | `/api/gamification/notifications`          | Notifications SSE de badge et de changement de niveau | Requise          |
| GET     | `/api/gamification/anomalies`              | Consulter les rapports d’anomalies (administrateur)   | Administrateur   |
| POST    | `/api/gamification/rotate`                 | Renouveler les secrets des jetons d’invitation        | Requise          |

### Exemples de requêtes/réponses

**POST /api/gamification/transfer**

```json
// Requête
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Réponse 200
{
  "success": true,
  "transfer": {
    "id": "txn-uuid",
    "from": "sender-api-key-id",
    "to": "recipient-api-key-id",
    "amount": 500,
    "createdAt": "2026-05-19T12:00:00.000Z"
  },
  "balance": 2500
}

// Réponse 400 (solde insuffisant)
{
  "error": "Insufficient balance",
  "balance": 200,
  "requested": 500
}
```

**GET /api/gamification/leaderboard?scope=weekly&limit=10**

```json
{
  "scope": "weekly",
  "period": "2026-W20",
  "entries": [
    {
      "rank": 1,
      "apiKeyId": "key-uuid",
      "displayName": "User***1234",
      "score": 15230,
      "level": 42,
      "title": "Expert"
    }
  ],
  "total": 847,
  "updatedAt": "2026-05-19T12:00:00.000Z"
}
```

---

## Outils MCP (8)

Enregistrés dans `open-sse/mcp-server/` avec les outils existants. Limités au
périmètre d’autorisation `gamification`.

| Outil                      | Description                                                   | Schéma d’entrée              |           |
| -------------------------- | ------------------------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Obtenir le classement pour un périmètre/une période           | `{ scope, period?, limit? }` |
| `gamification_rank`        | Obtenir le rang de l’appelant et ses voisins                  | `{ scope }`                  |
| `gamification_profile`     | Obtenir le résumé de l’XP, du niveau, du titre et de la série | `{}`                         |
| `gamification_badges`      | Lister les badges obtenus ou toutes les définitions           | `{ earned?: boolean }`       |
| `gamification_transfer`    | Envoyer des jetons à un autre utilisateur                     | `{ to, amount }`             |
| `gamification_invite`      | Générer ou lister des codes d’invitation                      | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Lister ou connecter des serveurs communautaires               | `{ action, token? }`         |
| `gamification_anomalies`   | Afficher les rapports d’anomalies (périmètre administrateur)  | `{ limit?, since? }`         |

---

## Pages du tableau de bord

### `/dashboard/leaderboard`

- Affichage du podium (les 3 premiers avec leurs avatars et leur XP).
- Sélecteur de périmètre : Global / Hebdomadaire / Mensuel / Jetons partagés / Contributions.
- Tableau paginé (25 par page) avec le rang, le nom, le score, le niveau et le titre.
- Mises à jour en temps réel via SSE — les changements de rang sont animés.
- L’utilisateur actuel est mis en évidence dans le tableau avec une ligne fixe « Votre rang ».

### `/dashboard/profile`

- Barre de progression de l’XP avec le niveau actuel et le seuil du niveau suivant.
- Badge de titre affiché de manière visible.
- Galerie de badges — badges obtenus avec leur date d’obtention, badges non obtenus grisés
  (les badges masqués affichent « ??? » jusqu’à leur obtention).
- Compteur de série avec une icône de flamme ; calendrier des séries (30 derniers jours).
- Graphique de l’historique de l’XP (XP quotidien sur les 30 derniers jours).

### `/dashboard/tokens`

- Solde de jetons (bien visible, en haut de la page).
- Formulaire de transfert : destinataire, montant, boîte de dialogue de confirmation.
- Tableau de l’historique des transferts avec des filtres (envoyés/reçus/tous).
- Section des invitations : codes actifs, génération de nouveaux codes, lien de partage.
- Serveurs communautaires : liste avec état de santé, connexion/déconnexion.

### `/dashboard/gamification/admin`

- Liste des anomalies avec gravité, utilisateur, horodatage et score z.
- Visionneuse du journal d’audit avec des filtres (type d’action, utilisateur, plage de dates).
- Statistiques système : XP total attribué, utilisateurs actifs, taux d’obtention des badges.
- Vue d’ensemble de l’état de santé des serveurs de fédération.

---

## Intégration au pipeline

### Point d’intégration

La gamification s’intègre au pipeline de requêtes en un seul point dans
`open-sse/handlers/chatCore.ts` :

```typescript
// Après l’envoi de la réponse au client :
setImmediate(() => {
  emitGamificationEvent({
    type: "request.completed",
    apiKeyId,
    metadata: {
      provider: selectedProvider,
      model: selectedModel,
      comboId: resolvedCombo?.id,
      compressionUsed: compressionStats?.applied,
      skillUsed: skillExecution?.name,
    },
  }).catch(() => {
    // Exécution sans attente : journaliser, mais ne jamais propager au client
  });
});
```

### Types d’événements

| Type d’événement    | Moment de l’émission                                     |
| ------------------- | -------------------------------------------------------- |
| `request.completed` | Réponse réussie du LLM envoyée                           |
| `provider.switch`   | Fournisseur modifié (les replis de combinaison comptent) |
| `combo.created`     | Nouvelle configuration de combinaison enregistrée        |
| `combo.used`        | Cible de combinaison atteinte avec succès                |
| `badge.earned`      | L’évaluation des badges a trouvé une correspondance      |
| `streak.milestone`  | Seuil de série franchi                                   |
| `transfer.sent`     | Transfert de jetons terminé                              |
| `referral.redeemed` | Code d’invitation utilisé avec succès                    |
| `compression.used`  | Compression de l’invite appliquée                        |
| `skill.executed`    | Exécution de la compétence terminée                      |
| `model.first_use`   | Modèle non utilisé au cours des 7 derniers jours         |

### Garantie de non-blocage

Le modèle `setImmediate` + `.catch(() => {})` garantit que :

1. La réponse est entièrement envoyée avant l’exécution de la gamification.
2. Les erreurs de gamification ne sont jamais exposées au client.
3. Le traitement de l’événement s’exécute dans la microtâche suivante, et non en ligne.

---

## Sécurité

### Modèle de menaces

| Menace                                         | Mesure d’atténuation                                                                        |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Gonflement des scores                          | Calcul de l’XP côté serveur uniquement ; les clients soumettent des actions, pas des scores |
| Attaques par rejeu                             | Clés d’idempotence sur les transferts ; déduplication du journal d’audit                    |
| Fraude lors des transferts                     | Registre en partie double ; transactions atomiques ; limites de débit                       |
| Auto-parrainage                                | Vérification croisée de `api_key_id` lors de l’utilisation                                  |
| Manipulation du classement                     | Détection des anomalies par score z ; tableau de bord d’administration des anomalies        |
| Vol de jeton de fédération                     | Stockage sous forme de hachage SHA-256 ; jeton brut affiché une seule fois                  |
| Attaque par force brute des codes d’invitation | Limitation du débit sur le point de terminaison d’utilisation ; entropie de 8 caractères    |
| XSS dans les noms d’affichage                  | Noms d’affichage assainis ; entrées du classement échappées                                 |
| Attaques temporelles sur les hachages          | `crypto.timingSafeEqual` pour comparer les hachages des jetons                              |

### Exigences d’authentification

- **Public** (sans authentification) : `GET /leaderboard`, `GET /stream` (classements
  en lecture seule).
- **Clé API requise** : toutes les opérations d’écriture, le profil, les transferts et les invitations.
- **Administrateur uniquement** : tableau de bord des anomalies, visionneuse du journal d’audit.
- **Fédération** : chemin d’authentification distinct utilisant le jeton brut dans l’en-tête
  `Authorization`, validé par rapport au hachage SHA-256 stocké.

---

## Tests

### Fichiers de test

Tous les tests utilisent l’outil d’exécution de tests natif de Node.js (`node --import tsx/esm --test`).

| Fichier de test                               | Éléments couverts                                     | Tests |
| --------------------------------------------- | ----------------------------------------------------- | ----- |
| `tests/unit/gamification/xp.test.ts`          | Calcul de l’XP, courbe des niveaux, titres            | 8     |
| `tests/unit/gamification/badges.test.ts`      | Correspondance des critères de badges, attribution    | 10    |
| `tests/unit/gamification/streaks.test.ts`     | Logique des séries, jalons, cas limites               | 7     |
| `tests/unit/gamification/leaderboard.test.ts` | Calcul du rang, pagination, rotation                  | 8     |
| `tests/unit/gamification/sharing.test.ts`     | Transferts, solde, idempotence                        | 9     |
| `tests/unit/gamification/invites.test.ts`     | Création, utilisation, expiration, auto-parrainage    | 7     |
| `tests/unit/gamification/antiCheat.test.ts`   | Limites de débit, score z, journalisation d’audit     | 6     |
| `tests/unit/gamification/events.test.ts`      | Émission d’événements, diffusion, gestion des erreurs | 5     |

### Exécution des tests

```bash
# Tous les tests de gamification
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Un seul fichier de test
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Exigences de couverture

Conformément à `CONTRIBUTING.md`, tous les nouveaux modules doivent respecter les exigences suivantes :

- Couverture des branches >= 80 %.
- Chaque fonction publique doit être testée au moins une fois.
- Les chemins d’erreur doivent être testés (solde insuffisant, codes expirés, limites de débit).

---

## Structure des fichiers

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Les 8 tables et leurs index
      gamification.ts                  # Module CRUD du domaine
    gamification/
      xp.ts                           # Calcul de l’XP, courbe de niveaux, titres
      badges.ts                       # Définitions des badges, critères, évaluation
      streaks.ts                      # Suivi des séries quotidiennes
      leaderboard.ts                  # Calcul du classement, SSE, rotation
      antiCheat.ts                    # Limitation du débit, score z, audit
      sharing.ts                      # Registre des transferts de jetons
      invites.ts                      # Codes d’invitation/de validation
      servers.ts                      # Fédération de serveurs communautaires
      events.ts                       # Émetteur d’événements (point d’intégration)
      notifications.ts                # Flux de notifications SSE
  app/
    api/
      gamification/
        leaderboard/route.ts          # Classement GET/POST
        leaderboard/stream/route.ts   # Mises à jour en temps réel via SSE
        transfer/route.ts             # Transferts GET/POST
        invite/route.ts               # Codes d’invitation GET/POST/DELETE
        invite/redeem/route.ts        # Validation d’un code par POST
        servers/route.ts              # Serveurs GET/POST/DELETE
        federation/score/route.ts     # Envoi du score par POST
        federation/leaderboard/route.ts # Récupération du classement par GET
        notifications/route.ts        # Notifications SSE
        anomalies/route.ts            # Rapports d’anomalies par GET
        rotate/route.ts               # Rotation des secrets par POST
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Page des classements
        profile/page.tsx               # Page de l’XP, des badges et des séries
        tokens/page.tsx                # Page du solde, des transferts et des invitations
        gamification/admin/page.tsx    # Supervision des anomalies par l’administrateur
  shared/
    constants/
      gamification.ts                  # XP_REWARDS, TITLES, BADGE_DEFS, LIMITS

tests/
  unit/
    gamification/
      xp.test.ts
      badges.test.ts
      streaks.test.ts
      leaderboard.test.ts
      sharing.test.ts
      invites.test.ts
      antiCheat.test.ts
      events.test.ts

docs/
  frameworks/
    GAMIFICATION.md                    # Le présent document
```

---

## Stratégie de migration

### Phase 1 : cœur du backend (PR 1)

- Migration `060_create_gamification.sql` (8 tables).
- `src/lib/db/gamification.ts` (module du domaine).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Point d’intégration dans `chatCore.ts`.
- Tests unitaires pour l’XP, les séries et les événements.

### Phase 2 : badges et classement (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Définitions des badges dans les constantes.
- Routes d’API du classement et flux SSE.
- Tests unitaires pour les badges et le classement.

### Phase 3 : partage et invitations (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Routes d’API pour les transferts et les invitations.
- Tests unitaires pour le partage, les invitations et la détection de triche.

### Phase 4 : fédération et tableau de bord (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Routes d’API de fédération.
- Pages du tableau de bord (classement, profil, jetons, administration).
- Enregistrement des outils MCP.

---

## Considérations futures

- **Événements saisonniers** : séries de badges disponibles pour une durée limitée et saisons de classement.
- **Classements par équipe** : regrouper les utilisateurs par organisation ou combo.
- **Multiplicateurs d’XP** : augmenter l’XP pendant les périodes promotionnelles.
- **Partage des accomplissements** : générer des cartes de badges partageables (images OpenGraph).
- **Notifications push mobiles** : notifications basées sur des webhooks pour les événements de badge/niveau.
- **API de classement** : API publique pour les intégrations tierces.
