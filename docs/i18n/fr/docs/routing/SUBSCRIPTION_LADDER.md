# Subscription-first routing (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇦 [bs](../../../bs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Deux nouveaux identifiants `auto/*` — `auto/subscription` et `auto/thrifty`. Tous deux sont activés explicitement en étant
> demandés : rien n’est acheminé par leur intermédiaire à moins qu’un appelant ne demande l’identifiant par son nom, et aucun
> pool, aucune stratégie ni aucune valeur par défaut existants ne changent.

## Pourquoi cela existe

OmniRoute répond déjà à deux questions relatives aux coûts, mais aucune n’est celle que la plupart des opérateurs se posent.

| Mécanisme existant                                       | Question à laquelle il répond                                |
| -------------------------------------------------------- | ------------------------------------------------------------ |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | « ce modèle est-il répertorié comme gratuit ? »              |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | « cette connexion peut-elle un jour m’être facturée ? »      |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | « cette connexion approche-t-elle de sa limite ? »           |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | « plafonner les dépenses, passer à l’option la moins chère » |

Tous les mécanismes limités aux options gratuites **échouent de manière fermée** — un pool gratuit épuisé devient un pool vide, jamais
un passage à une option payante — et tous les mécanismes côté payant ignorent les paliers. Aucun ne répond à ceci :

> « Utiliser le quota que je paie déjà. Lorsqu’il est épuisé, soit s’arrêter, soit monter d’un palier à la
> fois parmi les options payantes les moins chères — puis revenir dès qu’il est réinitialisé. »

## La facturation est une caractéristique de la connexion, pas du modèle

`classifyTier()` (`open-sse/services/tierResolver.ts`) utilise `(provider, model)` comme clé et renvoie
`free | cheap | premium` à partir des tarifs du catalogue. Mais le fait qu’une requête entraîne ou non un coût supplémentaire
dépend de **la connexion qui la traite** : le même modèle est inclus dans le forfait via une connexion OAuth Claude Code
et facturé par token via une connexion utilisant une clé d’API.

`provider_connections.auth_type` n’est un indicateur fiable dans aucun des deux sens — il existe des connexions OAuth
facturées à l’usage et des connexions par clé d’API incluses dans un forfait (un jeton de poste Copilot n’est pas une
clé d’API facturée à l’usage). La classe de facturation provient donc d’un **catalogue géré manuellement**,
`open-sse/config/connectionBillingCatalog.ts`, configuré à partir des conditions publiées par chaque fournisseur —
selon le même modèle que celui déjà établi par `FreeModelBudget.hardStopGuaranteed` pour les modèles gratuits.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Ordre de résolution (`autoCombo/connectionBilling.ts`) : la sentinelle synthétique sans authentification →
`keyless` ; une entrée de catalogue correspondant au fournisseur **et** à `authType` ; une entrée valable pour l’ensemble du fournisseur ;
sinon `unknown`. **Ce qui n’est pas répertorié n’est pas gratuit** — `unknown` est traité comme `metered`
partout, de sorte qu’un fournisseur ajouté demain commence en dehors du palier d’abonnement et doit être
délibérément ajouté au catalogue.

## Le modèle à paliers

Cinq paliers par ordre d’escalade. Ils diffèrent sur plus que le prix — chacun possède son **propre**
signal d’épuisement, raison pour laquelle il ne s’agit pas d’un simple tri.

| #   | Palier         | Appartenance                                                 | Épuisé lorsque                                        |
| --- | -------------- | ------------------------------------------------------------ | ----------------------------------------------------- |
| 0   | `subscription` | `billing: "subscription"` répertorié manuellement            | la fenêtre de quota atteint ou passe sous le seuil    |
| 1   | `keyless`      | le chemin synthétique sans authentification                  | délai de récupération / coupe-circuit de la connexion |
| 2   | `free`         | connexion facturée à l’usage, `classifyTier() === "free"`    | l’allocation gratuite est épuisée                     |
| 3   | `cheap`        | connexion facturée à l’usage, `classifyTier() === "cheap"`   | le budget du palier est consommé                      |
| 4   | `premium`      | connexion facturée à l’usage, `classifyTier() === "premium"` | le budget du palier est consommé                      |

Les paliers 0 à 2 s’épuisent en fonction du **quota**, qui est observable et déjà suivi. Les paliers 3 et 4 n’ont pas de
quota — une connexion payante peut fonctionner indéfiniment — leur seul signal d’épuisement raisonnable est donc un
**budget** propre à chaque palier. Sans celui-ci, « passer au palier supérieur lorsque le palier économique est épuisé » ne dispose d’aucun déclencheur.

## `auto/subscription` — échec sécurisé

Pool = échelon 0 uniquement, limité aux connexions dont le dépassement est documenté comme un `hard-stop`, chacune étant vérifiée en temps réel pour confirmer qu’elle dispose d’une marge de quota. Tout ce qui est ambigu est exclu : un fournisseur non validé, une mesure de quota invérifiable, une mesure obsolète ou un dépassement entraînant une facturation.

Un pool vide est la réponse **attendue**, et non un défaut — le chemin existant du code appelant pour les pools vides le transforme en une erreur claire plutôt qu’en un repli silencieux et facturable. C’est toute la promesse de cet identifiant.

`keyless` ne remplit délibérément **pas** les conditions : ce regroupement signifie « le forfait que je paie », donc un backend sans authentification n’y a pas sa place. Utilisez `auto/thrifty` (ou `auto/best-free`) pour cela.

### Sécurité des connexions

Un candidat n’est pas toujours lié à une seule connexion — un candidat logique comporte une liste d’autorisation `allowedConnectionIds`, et le compte réellement utilisé est choisi ultérieurement, lors de l’envoi, par `open-sse/services/combo/autoStrategy.ts`. Les deux regroupements vérifient donc **chaque connexion individuellement** et réduisent `allowedConnectionIds` exactement au sous-ensemble restant — jamais à la liste d’origine complète, ni à un membre choisi arbitrairement. Comme `autoStrategy.ts` applique déjà ce tableau comme une liste d’autorisation stricte, le réécrire ici garantit par construction que les ensembles « vérifié » et « réellement utilisé » sont identiques. Il s’agit du même invariant et du même raisonnement que pour [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — progression d’un échelon à la fois

Pool = tous les échelons, ordonnés selon leur indice, les candidats épuisés étant exclus. Le moteur `auto` continue d’attribuer un score **au sein** du pool restant : l’échelle détermine quels échelons sont pris en compte, tandis que l’évaluation détermine quel candidat l’emporte parmi eux. L’ordre reste stable au sein d’un échelon, de sorte que le classement propre au moteur d’évaluation n’est jamais remanié par cette surcouche.

Il s’agit d’une surcouche d’ordonnancement et de filtrage, **pas** d’un nouveau répartiteur : la boucle spéculative de `combo.ts` parcourt déjà les cibles dans l’ordre et passe à la suivante en cas d’échec ; ainsi, un épuisement à l’exécution non détecté par la vérification préalable entraîne toujours une progression vers l’échelon suivant au cours de la même requête.

Là où `auto/subscription` échoue de façon **sécurisée**, `auto/thrifty` échoue de façon **ouverte** : une connexion incluse dans le forfait et dépourvue de mesure de quota exploitable est tout de même essayée en premier. L’essayer ne coûte rien et, si elle s’avère épuisée, le mécanisme de repli atteint de toute façon l’échelon suivant — tandis que refuser de l’essayer enverrait la requête vers un échelon payant en cas de télémétrie manquante, précisément le résultat que ce regroupement vise à éviter.

## Retour au forfait après une réinitialisation

Trois éléments indépendants doivent expirer avant que le routage revienne à l’échelon 0. N’en corriger qu’un seul laisse l’échelle bloquée sur des échelons payants bien après le renouvellement du forfait.

1. **Le cache d’état du quota** — `freeAccessQuota.ts` met en cache les données par paire `(provider, connection)` avec une durée de vie de 180 s. Une entrée mise en cache dont le propre `resetAt` est déjà dépassé décrit une fenêtre qui n’existe plus ; elle est donc désormais considérée comme obsolète **quel que soit son âge** et force une actualisation. Sans cela, un forfait renouvelé à minuit continue d’apparaître comme épuisé jusqu’à l’expiration fortuite de la durée de vie.
2. **L’état propre de l’échelle** — il n’y en a aucun, par conception. L’éligibilité des échelons est recalculée à partir de l’état du quota en temps réel à chaque construction du pool ; aucun enregistrement persistant « actuellement à l’échelon 3 » ne peut survivre à une réinitialisation et bloquer le routage.
3. **Le délai de récupération de la connexion** — l’erreur 429 liée à l’épuisement définit `rateLimitedUntil` à partir d’un délai exponentiel, lequel peut, pour une connexion liée à un forfait, dépasser la réinitialisation réelle. `clampCooldownToReset()` (`subscriptionLadder.ts`) ramène un délai de récupération à l’instant de réinitialisation propre au service en amont et ne peut jamais le prolonger. **La fonction est implémentée et testée, mais n’est pas encore raccordée** : le cache de quota est invalidé dans `src/sse/services/auth.ts` _avant_ l’écriture de tout délai de récupération ; `resetAt` doit donc être capturé plus tôt dans cette fonction — une modification du chemin critique de résilience qui doit faire l’objet de sa propre PR examinée. D’ici là, le retour attend la fin du délai de récupération de la connexion (qui privilégie déjà les indications `Retry-After` en amont lorsque le fournisseur les envoie).

### Anti-oscillation

Un échelon qui vient d’être réinitialisé n’est réadmis qu’au-dessus de `reentryMinRemainingPercent` (5 par défaut), tandis qu’une connexion déjà en cours d’utilisation doit seulement rester au-dessus de `exitCutoffPercent` (2 par défaut, conformément à `quotaPreflight.defaultThresholdPercent`). L’écart constitue la bande d’hystérésis — sans elle, une connexion qui oscille autour du seuil bascule d’un échelon à l’autre lors de requêtes consécutives.

## Configuration

Réglage uniquement. Il n’existe délibérément **aucun** indicateur `enabled` : une option permettant de les désactiver
laisserait `auto/subscription` servir discrètement l’intégralité du pool — modèles payants compris — sous un
nom qui promet le contraire.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 désactive complètement un échelon
  },
}
```

Le contrôle par budget reste inactif tant qu’un résolveur de dépenses n’est pas connecté : lorsqu’aucune comptabilité n’est disponible, un
échelon payant est ordonné, mais jamais soumis à un contrôle. Depuis la v3.8.51, le paramètre `rungBudgetUsd` est accepté par le
schéma, mais n’est PAS encore appliqué — considérez-le comme une configuration réservée, et non comme un plafond de dépenses actif. L’ordre des échelons, l’épuisement basé sur les quotas et la réintégration après réinitialisation
fonctionnent tous sans lui.

## Composition

`subscription` et `thrifty` sont des valeurs `AutoTier`, elles se combinent donc avec chaque catégorie :
`auto/coding:thrifty`, `auto/reasoning:subscription`, etc. Les deux identifiants simples
(`auto/subscription`, `auto/thrifty`) sont publiés dans `/v1/models` et le tableau de bord.

Aucun de ces identifiants n’appartient au niveau payant, donc `isPaidTierAutoId()` renvoie `false` pour les deux et
`auto/subscription` n’est pas masqué par `hidePaidModels`.

## Emplacement du code

| Sujet                                                     | Fichier                                             |
| --------------------------------------------------------- | --------------------------------------------------- |
| Données de facturation sélectionnées                      | `open-sse/config/connectionBillingCatalog.ts`       |
| Classificateur                                            | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Échelons, deux regroupements et réintégration             | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Intégration au pool de candidats                          | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Obsolescence du cache tenant compte des réinitialisations | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Surface des niveaux                                       | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Identifiants publiés                                      | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Tests                                                     | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
