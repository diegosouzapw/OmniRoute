# Account-Ban / Banned-Keyword Detection (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute analyse les réponses d’erreur en amont afin d’y détecter des signaux indiquant qu’un
**compte fournisseur est définitivement inutilisable** (suspendu / désactivé / banni pour violation des conditions d’utilisation) et, lorsqu’une
correspondance est trouvée, place cette connexion dans un **état terminal `banned`** afin qu’elle ne soit
plus sélectionnée pour les requêtes. C’est ce que configure la carte de paramètres
**Sécurité → Mots-clés de bannissement** (« Mots-clés supplémentaires déclenchant la détection du
bannissement permanent d’un compte. Les mots-clés intégrés s’appliquent toujours. »).

Cette page documente la liste intégrée, le flux de détection, sa portée, la manière d’ajouter
des mots-clés personnalisés en toute sécurité et la procédure de récupération d’une connexion signalée. L’état
terminal lui-même fait partie du modèle de résilience — consultez
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) (« États terminaux »).

**Source de référence :** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Mots-clés intégrés

Ces 8 sous-chaînes s’appliquent toujours (sans distinction entre majuscules et minuscules), indépendamment de toute liste personnalisée :

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Cette liste évolue à mesure que les fournisseurs modifient la formulation de leurs messages de bannissement. La version
> faisant autorité est `ACCOUNT_DEACTIVATED_SIGNALS` dans `open-sse/services/accountFallback.ts` ;
> considérez le bloc ci-dessus comme un instantané.

Deux tables de signaux adjacentes et **distinctes** se trouvent dans le même fichier et ne font _pas_ partie
de la détection par mots-clés de bannissement :

- `CREDITS_EXHAUSTED_SIGNALS` — facturation/quota épuisé (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → état terminal `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **non terminal** ; une actualisation du jeton peut rétablir la connexion.

Remarque : les expressions transitoires courantes comme **`rate limit`** / `429` sont gérées par le
mécanisme de limitation de débit / délai de récupération de la connexion et ne constituent **pas** des signaux de bannissement.

## Flux de détection

```
réponse d’erreur en amont
  → corps converti en chaîne + en minuscules
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [correspondance de sous-chaîne]
  → correspondance ?
      → connection testStatus = "banned"      (permanent — délai de récupération d’un an, aucune récupération automatique)
      → si le paramètre `autoDisableBannedAccounts` est activé et que `autoDisableBannedScope`
        inclut cette connexion (`all`, ou `subscription` pour OAuth/cookie/session)
        → alors isActive = false également. Les clés API prépayées restent actives lorsque la portée est
        `subscription`.
      → la connexion est ignorée lors de la sélection du compte (statuts QUOTA_BLOCKING du combo)
```

- La correspondance est une recherche de **sous-chaîne sans distinction entre majuscules et minuscules** dans le **corps**
  de la réponse (`isAccountDeactivated`, `accountFallback.ts`).
- La transition terminale permanente vers `banned` se déclenche lorsque le corps contient un signal de bannissement, quel que soit
  le **statut HTTP** (via `markAccountUnavailable` → `checkFallbackError`). Le libellé
  **`deactivated`**, plus restrictif (`isActive=false` lorsque la connexion ne possède aucune
  clé API de secours), est écrit par le chemin intégré de `chatCore.ts` pour les statuts **HTTP 401 / 403**
  (classés via `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Notez que le
  chemin `markAccountUnavailable()` écrit un état terminal _différent_ —
  **`expired`** — pour le même signal `ACCOUNT_DEACTIVATED` (via
  `resolveTerminalConnectionStatus`). Un même bannissement peut donc apparaître comme
  `deactivated` ou `expired` selon le chemin ayant traité la réponse. (L’ancien
  commentaire du code indique « lorsqu’un corps de réponse 401 contient ces chaînes » — cela
  minimise le comportement actuel.)
- Une connexion `banned` est exclue de la sélection partout où les états terminaux
  sont filtrés (`isTerminalConnectionStatus`, `QUOTA_BLOCKING_CONNECTION_STATUSES` du combo).

## Périmètre — quels fournisseurs sont analysés

**Tous les fournisseurs.** La vérification s’exécute dans le pipeline générique de
gestion des erreurs par lequel transite chaque requête en amont ayant échoué — elle
n’est **pas** limitée aux scrapers OAuth/d’abonnement. L’état terminal qui en résulte
s’applique à chaque **connexion**, et non à chaque fournisseur.

Cela dit, les _chaînes_ intégrées sont orientées vers les fournisseurs
d’abonnement/OAuth présentant un risque réel de bannissement (ChatGPT Web Codex,
Claude Web, Codex, Muse Spark, Antigravity). Un fournisseur utilisant une clé API
ne déclenchera le détecteur que si le corps de son erreur contient littéralement
l’une des sous-chaînes.

`autoDisableBannedScope` (`all` | `subscription`, valeur par défaut `all`) détermine
si une correspondance définit également `isActive=false`. `subscription` désigne
les accès de type connexion (abonnements payants et comptes gratuits, y compris
les sessions utilisant des cookies Web). Le système enregistre toujours
`testStatus=banned` pour les clés API prépayées, mais les laisse dans le pool de
routage. La conception pérenne prévoit une substitution par fournisseur et par
compte ; l’énumération globale constitue la première version.

## Mots-clés de bannissement personnalisés

Ajoutez ou supprimez des mots-clés dans **Sécurité → Mots-clés de bannissement**
(enregistrés dans le paramètre global `customBannedSignals` via
`PATCH /api/settings`). Ils sont **ajoutés à** la liste intégrée — ils ne la
remplacent jamais — et sont rechargés à chaud lors de l’enregistrement (ainsi
qu’au démarrage) via `setCustomBannedSignals()`. Chaque mot-clé est limité à
200 caractères ; la longueur du tableau n’est pas limitée.

**⚠ Risque de faux positifs — choisissez des phrases précises.** La détection
repose sur une correspondance brute de sous-chaîne dans l’intégralité du corps de
la réponse, et une correspondance est **permanente** (délai de récupération d’un
an, rétablissement manuel). Un mot-clé trop général peut bannir une connexion
parfaitement saine :

- **Mauvais :** `quota`, `limit`, `error`, `denied` — apparaissent dans de nombreuses erreurs transitoires.
- **Bon :** des phrases complètes de bannissement, par ex. `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Privilégiez la phrase non ambiguë la plus longue renvoyée par le fournisseur lors
d’un bannissement réel. En cas de doute, observez d’abord le champ `lastError` de
la connexion, puis ajoutez la formulation exacte.

## Rétablissement d’une connexion signalée

Les états terminaux `banned` / `deactivated` ne sont **jamais rétablis
automatiquement** (ils sont exclus du cycle de récupération proactive — seuls les
délais de récupération `unavailable` se résolvent d’eux-mêmes). Un opérateur doit
les effacer explicitement :

1. **Tester à nouveau la connexion** — l’action **Tester** du tableau de bord
   (`POST /api/providers/{id}/test`) ; une sonde réussie réinitialise `testStatus`
   sur `active` et efface les champs d’erreur.
2. **Se réauthentifier / modifier les identifiants** — pour les fournisseurs OAuth,
   relancez le flux de connexion / d’actualisation ; les routes de création/importation
   de fournisseur définissent `isActive = true`.
3. **Réactiver la connexion** — si la désactivation automatique a défini
   `isActive = false` (périmètre `all`, ou `subscription` pour une connexion
   OAuth/cookie/session), réactivez-la après avoir corrigé le compte.

Il n’existe aucun bouton distinct « effacer l’indicateur de bannissement » — le
rétablissement passe par un nouveau test, une nouvelle authentification ou une
réactivation, conformément à la règle générale relative aux états terminaux dans
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Isolation des sondes (test de tous les modèles)

Un **échec provenant d’une sonde** (opérations de test global des modèles /
vérification d’intégrité exécutées dans `runAsProbe`) ne retire jamais une
connexion du pool (#9817) : il est **enregistré à des fins de visibilité**
(`last_error`, `last_error_type`, `error_code`, `last_error_at`), mais ignore
**toute** modification du routage — délais de récupération, état terminal
(`banned` / `deactivated` / `credits_exhausted`), verrouillages par modèle,
disjoncteur du fournisseur, cache de quota de 5 minutes, actualisation du jeton
OAuth et désactivation automatique. Seul un échec sur le chemin d’une requête
réelle entraîne une désactivation. L’erreur enregistrée permet de rendre un
compte signalé visible dans le tableau de bord tout en continuant à traiter du
trafic.

Le point de décision unique est `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), consulté par **chaque** emplacement susceptible
de modifier l’état du routage à la suite d’un échec provenant d’une sonde :

- `markAccountUnavailable` (`auth.ts`) — enregistrement uniquement (`lastError`
  avec le texte brut, `lastErrorType`, `errorCode`, `lastErrorAt` ;
  délibérément **aucun** `backoffLevel`, car cela déclencherait la décroissance
  automatique au moment de la sélection et effacerait l’enregistrement)
- `maybeAutoDisableBannedAccount` — aucune désactivation automatique
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (enregistrement
  uniquement, aucun état terminal `credits_exhausted`), GEO_BLOCKED (aucune
  exclusion de 24 h), MODEL_NOT_FOUND (aucun `lockModel`), basculement par rotation
  de compte pour les erreurs codex 429 (aucun `markCodexScopeRateLimited`, aucune
  persistance de `rate_limited_until`, aucun effacement de l’affinité de session),
  `persistCodexQuotaState` (aucune écriture de l’état du quota, aucune invalidation
  du cache), `recordKeyHealthStatus` (mécanisme de rotation fondé sur l’état des
  clés inchangé)
- Actualisation OAuth — tant l’actualisation proactive dans la base de l’exécuteur
  (`base.ts` `execute()`, sans consommer la rotation du jeton d’actualisation) que
  le chemin réactif 401/403 dans `chatCore` (aucune désactivation `expired`)
- `chat.ts` — le disjoncteur du fournisseur et le cache de quota de 5 minutes
  (`markAccountExhaustedFrom429`) ne sont jamais dégradés

L’erreur enregistrée permet de rendre un compte signalé visible dans le tableau
de bord tout en continuant à traiter du trafic. Remarque : l’enregistrement de la
sonde conserve le texte d’erreur **brut** (non tronqué), contrairement à la
troncature `slice(0,100)` du chemin réel.

Les opérateurs qui utilisent le test global comme outil de maintenance peuvent
rétablir le comportement historique (la sonde compte comme une génération réelle)
de l’une des manières suivantes :

- le paramètre `probeCanDisable` (`POST /api/settings` avec
  `{"probeCanDisable": true}`, ou une modification directe de `key_value` dans la
  base de données), ou
- l’indicateur de fonctionnalité **`PROBE_CAN_DISABLE=true`** (variable
  d’environnement ou substitution dans la base de données ; prioritaire sur le
  paramètre).

Sécurité intégrée : si la consultation de l’indicateur ou des paramètres génère
une exception, l’isolation reste ACTIVÉE.

## Fichiers sources

| Sujet                                                | Fichier                                                                                                       |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Tables de signaux + correspondance                   | `open-sse/services/accountFallback.ts`                                                                        |
| Finalisation / persistance                           | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Portée de la désactivation automatique               | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Classification en ligne                              | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Exclusion de la récupération d’un état terminal      | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Chargement à l’exécution des mots-clés personnalisés | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Interface des paramètres                             | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
