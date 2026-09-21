# Reasoning Routing (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

Les règles de routage du raisonnement étendent le routage existant des modèles et des combos. Lorsqu’aucune règle active ne correspond,
le comportement existant concernant la réflexion, les suffixes, les valeurs par défaut des connexions et la traduction des fournisseurs reste
inchangé.

## Gestion

La gestion des règles est disponible sous **Paramètres → Routage global**. L’éditeur de clés API fournit la
même interface de gestion, filtrée selon la clé sélectionnée.

L’API de gestion est exposée par les routes suivantes :

- `GET` et `POST` sur `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` et `DELETE` sur `/api/settings/reasoning-routing-rules/[id]`
- `POST` sur `/api/settings/reasoning-routing-rules/simulate`

Toutes les routes utilisent `requireManagementAuth`. Les entrées sont validées avec les schémas définis dans
`src/shared/validation/schemas/reasoningRouting.ts`. Le simulateur n’effectue jamais d’appel en amont.

## Résolution des règles

L’évaluation précoce sélectionne exactement une règle. Les portées sont vérifiées dans l’ordre suivant :

1. `apiKey`
2. `combo`
3. `model`
4. `global`

Au sein d’une portée, la `priority` la plus élevée l’emporte en premier, suivie d’une correspondance exacte du modèle plutôt que d’un motif glob,
puis d’un classement stable selon `createdAt` et `id`. Les `requestTags` sont lus exclusivement depuis `metadata.tags`
et prennent en charge une correspondance `any` ou `all`.

Une règle `connection` est évaluée uniquement lorsqu’aucune règle précoce ne l’a emporté et qu’une connexion concrète à un fournisseur a
déjà été sélectionnée. Elle peut modifier uniquement l’effort et le budget.

## Effort et budget

`sourceEffort` accepte `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` et
`ultra`. `missing` signifie que la requête ne contient ni niveau d’effort discret, ni indicateur de réflexion,
ni budget de réflexion. Un signal composé uniquement d’un budget ne correspond donc qu’à `any`.

`effortMode` comporte trois variantes :

- `inherit` conserve l’effort du client tout en permettant au modèle ou au combo de changer.
- `default` définit `targetEffort` uniquement lorsqu’aucun signal de raisonnement explicite n’est présent.
- `force` remplace l’effort discret par `targetEffort`.

Indépendamment, `budgetAction` peut être `preserve`, `remove` ou `set`. `force` avec `none` supprime
tous les champs reconnus relatifs à l’effort et au budget. L’association de `none` et `set` n’est pas valide.

Les requêtes ciblant des modèles connus comme incompatibles sont rejetées avant l’appel en amont. Pour les cibles de type combo,
les entrées incompatibles sont supprimées ; s’il n’en reste aucune, la requête renvoie le statut `400`.
Des données de capacité inconnues produisent un avertissement et laissent la règle active.

## Sécurité et transports

Le modèle source et cible, ou le combo source et cible, restent soumis à la politique existante de la clé API.
Une règle de raisonnement n’étend jamais les autorisations relatives aux modèles, aux combos ou aux quotas.

Le moteur est intégré aux Chat Completions, aux Responses, aux Anthropic Messages et au chemin WebSocket interne de
Codex. Le chemin WebSocket accepte uniquement les modèles cibles Codex ; les cibles de type combo ne peuvent pas y être
exécutées. La décision de la règle est stockée dans la trace de routage existante, sans secrets.

## Persistance

La migration `src/lib/db/migrations/126_reasoning_routing_rules.sql` crée la table
`reasoning_routing_rules`. Les règles référencent les clés API stockées, les combos et les connexions aux fournisseurs.
Les suppressions nettoient les règles associées. La couche d’accès à la base de données dans
`src/lib/db/reasoningRoutingRules.ts` maintient un cache invalidable pour le chemin de requête.

Les règles sont incluses dans les sauvegardes SQLite, l’exportation complète de la base de données et le bundle de synchronisation de la configuration.
`reconcileReasoningRulesForSync` désactive les règles importées dont les références sont manquantes et signale ces
conflits.
