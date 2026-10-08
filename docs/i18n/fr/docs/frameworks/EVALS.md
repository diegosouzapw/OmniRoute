# Evaluations (Evals) (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Source de vérité :** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Dernière mise à jour :** 2026-06-28 — v3.8.40

OmniRoute fournit un framework d’évaluation générique que vous pouvez utiliser pour comparer les performances de configurations de routage, de fournisseurs/modèles individuels ou des suites « golden set » intégrées.
Utilisez-le pour vérifier les modifications de routage, valider de nouveaux fournisseurs et conditionner les mises en production avant de les appliquer au trafic de production.

Le framework est implémenté comme suit :

- Un exécuteur pur (`src/lib/evals/evalRunner.ts`) qui enregistre en mémoire les suites intégrées, évalue les résultats selon les critères attendus et agrège les fiches de scores.
- Une couche de persistance (`src/lib/db/evals.ts`) pour les suites personnalisées (définies par l’utilisateur) et l’historique des exécutions dans SQLite.
- Une couche d’orchestration (`src/lib/evals/runtime.ts`) qui exécute chaque cas en envoyant des appels réels à `POST /v1/chat/completions`, mesure la latence, collecte les résultats et conserve l’exécution.
- Des endpoints REST sous `/api/evals/*` (authentification de gestion uniquement).
- Une interface de tableau de bord accessible via `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Concepts

### Suite

Une suite est une collection nommée de cas de test comprenant une `description` et un ou plusieurs cas. Les suites proviennent de deux sources :

| Source     | Emplacement de la définition                     | Modifiable à l’exécution ?  |
| ---------- | ------------------------------------------------ | --------------------------- |
| `built-in` | Enregistrée via `registerSuite()` au démarrage   | Non (définie dans le code)  |
| `custom`   | Stockée dans SQLite `eval_suites` + `eval_cases` | Oui (via l’API/l’interface) |

Les suites intégrées actuelles (voir `src/lib/evals/evalRunner.ts`) :

- `golden-set` — 10 cas de référence couvrant les salutations, les mathématiques, la traduction et la sécurité
- `coding-proficiency` — Python/JS/SQL/TS/détection de bogues
- `reasoning-logic` — syllogismes, problèmes rédigés, reconnaissance de motifs
- `multilingual` — traduction et détection de la langue
- `safety-guardrails` — informations personnelles identifiables, jailbreak, refus, sensibilisation aux biais
- `instruction-following` — JSON uniquement, listes numérotées, contraintes linguistiques
- `codex-comparison` — tâches de programmation en confrontation directe destinées au mode de comparaison

### Cas

Chaque cas comporte :

| Champ      | Description                                                            |
| ---------- | ---------------------------------------------------------------------- |
| `id`       | Identifiant stable (utilisé comme clé des résultats et métriques)      |
| `name`     | Libellé lisible par l’utilisateur                                      |
| `model`    | Modèle par défaut lorsque l’exécution utilise la cible `suite-default` |
| `input`    | `{ messages, max_tokens? }` — envoyé à `/v1/chat/completions`          |
| `expected` | `{ strategy, value }` — barème de notation (voir ci-dessous)           |
| `tags`     | Libellés facultatifs (par ex. `safety`, `pii`, `jailbreak`)            |

### Cible

Une même suite peut être exécutée sur différentes cibles. Le schéma de la cible est
`evalTargetSchema` dans `src/shared/validation/schemas.ts` :

| Type de cible   | `id`          | Comportement                                                           |
| --------------- | ------------- | ---------------------------------------------------------------------- |
| `suite-default` | `null`        | Chaque cas utilise son champ `model` intégré                           |
| `model`         | nom du modèle | Force le passage de chaque cas par un modèle direct (par ex. `gpt-4o`) |
| `combo`         | nom du combo  | Exécute chaque cas via un combo (met à l’épreuve le moteur de routage) |

Pour `model` et `combo`, le champ `id` est obligatoire (contrainte imposée par `superRefine` de Zod). Lorsque `compareTarget` est fourni, les deux cibles doivent être différentes — l’exécuteur conserve les deux exécutions sous le même `runGroupId` pour permettre une comparaison A/B.

## Barèmes de notation

Implémentés dans `evaluateCase()` (evalRunner.ts) :

| Stratégie  | Réussite lorsque…                                                                   |
| ---------- | ----------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                   |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                 |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` est vrai                            |
| `custom`   | `expected.fn(actualOutput, evalCase)` renvoie une valeur vraie (intégré uniquement) |

**Remarque :** La notation par fonction personnalisée est réservée aux suites
définies dans le code (intégrées), car les fonctions ne peuvent pas être
sérialisées via l’API. Le schéma `evalCaseBuilderSchema` accepte uniquement
`contains | exact | regex` pour les suites créées par les utilisateurs.

Il n’existe actuellement aucun évaluateur basé sur un LLM ni aucun évaluateur
de similarité fondé sur les embeddings — `evaluateCase()` constituerait un
point d’extension naturel à cette fin.

## Schéma de base de données

Trois tables (migrations `030_create_eval_runs.sql` et
`031_create_eval_suites.sql`) :

| Table         | Objectif                                                                                                                            |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Métadonnées des suites personnalisées (`id`, `name`, `description`)                                                                 |
| `eval_cases`  | Cas par suite — `input_json`, `expected_*`, `tags_json`                                                                             |
| `eval_runs`   | Exécutions historiques — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Les suites intégrées ne sont **pas** stockées dans la base de données. Elles
résident en mémoire et sont réenregistrées chaque fois que `evalRunner.ts` est
importé.

## API REST

Tous les points de terminaison nécessitent une authentification de gestion
(`requireManagementAuth`) — ils ne font pas partie de l’interface publique du
proxy.

| Point de terminaison          | Méthode  | Description                                                                    |
| ----------------------------- | -------- | ------------------------------------------------------------------------------ |
| `/api/evals`                  | `GET`    | Répertorier les suites + exécutions récentes + tableau de bord + cibles + clés |
| `/api/evals`                  | `POST`   | Exécuter une suite (seule ou en comparaison) — schéma `evalRunSuiteSchema`     |
| `/api/evals/{suiteId}`        | `GET`    | Récupérer une suite (intégrée ou personnalisée)                                |
| `/api/evals/suites`           | `POST`   | Créer une suite personnalisée — schéma `evalSuiteSaveSchema`                   |
| `/api/evals/suites/{suiteId}` | `GET`    | Récupérer une suite personnalisée                                              |
| `/api/evals/suites/{suiteId}` | `PUT`    | Remplacer une suite personnalisée (les cas sont réinsérés)                     |
| `/api/evals/suites/{suiteId}` | `DELETE` | Supprimer une suite personnalisée et ses cas                                   |

### Exécuter une suite

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

Champs facultatifs :

- `outputs` — `Record<caseId, string>` contenant des sorties précalculées.
  Lorsqu’il est fourni, l’exécuteur **ignore l’envoi** et note uniquement les
  sorties mises en cache (utile pour l’évaluation hors ligne).
- `compareTarget` — seconde cible à exécuter en parallèle ; les deux exécutions
  partagent un `runGroupId` généré pour permettre une comparaison directe.
- `apiKeyId` — clé d’API interne utilisée pour authentifier les appels envoyés
  à `/v1/chat/completions`. Obligatoire lorsque `REQUIRE_API_KEY` est activé.

### Créer une suite personnalisée

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## Pipeline d’exécution

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`) :

1. Résout la suite (intégrée ou personnalisée).
2. Pour chaque cas, construit une `Request` vers `/v1/chat/completions` avec les
   `messages` du cas, le `model` résolu, `stream: false` et `max_tokens: 512`
   (ou la valeur de remplacement définie pour le cas).
3. Appelle directement le gestionnaire de chat (dans le processus — sans requête HTTP supplémentaire).
4. Mesure la latence et extrait le texte soit de `choices[0].message.content`,
   soit de la charge utile `output[]` de l’API Responses.
5. Évalue toutes les sorties via `runSuite()`, puis les enregistre via `saveEvalRun()`.

Les cas sont exécutés **séquentiellement**. Il n’existe actuellement aucun paramètre de concurrence.

## Tableau de bord

L’interface utilisateur se trouve dans `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Depuis cette interface, vous
pouvez :

- Parcourir les suites intégrées et personnalisées avec un aperçu cas par cas.
- Créer/modifier/supprimer des suites personnalisées à l’aide du générateur de cas.
- Choisir une cible (valeurs par défaut de la suite / modèle / combo), éventuellement une seconde
  `compareTarget`, éventuellement une clé d’API, puis lancer l’exécution à la demande.
- Consulter l’historique des exécutions, la réussite ou l’échec de chaque cas, la latence et les sorties capturées.
- Afficher le tableau de scores glissant, agrégé sur la dernière exécution pour chaque
  périmètre `(suite, target)`.

## Relation avec la RFC d’auto-évaluation

Un sous-système d’évaluation distinct et plus ciblé se trouve dans `src/domain/assessment/`
(voir également [AUTO-COMBO.md](../routing/AUTO-COMBO.md) pour le moteur d’évaluation en production).
Ce sous-système cible le moteur Auto Combo — il évalue automatiquement les fournisseurs et
les modèles afin que les combos puissent s’autorétablir lorsque les services en amont échouent. Il utilise son propre exécuteur,
son propre outil de catégorisation et sa propre logique d’évaluation.

Le framework Evals documenté ici constitue la **surface de test générale et
plus étendue**. Privilégiez-le pour les suites de régression arbitraires, les comparaisons A/B
et les tests de bon fonctionnement à chaque version. Utilisez le sous-système d’auto-évaluation lorsque vous avez besoin
que l’état en temps réel des fournisseurs influence les décisions de routage.

## Intégration CI

Il n’existe actuellement aucun script npm `eval:ci` dédié. Deux approches sont possibles si vous souhaitez
conditionner les versions aux résultats des évaluations :

- **Approche HTTP** : démarrez le serveur, envoyez une requête `POST /api/evals` avec un
  `suiteId` + `target` connu, puis vérifiez que `runs[].summary.passRate >= N` dans la
  réponse.
- **Approche dans le processus** : importez `runEvalSuiteAgainstTarget()` depuis
  `@/lib/evals/runtime` dans un script, exécutez-le avec une base de données de test, puis vérifiez le
  `PersistedEvalRun.summary` renvoyé.

Les tests couvrant la route et l’historique se trouvent dans
`tests/unit/evals-route.test.ts` et `tests/unit/evals-history.test.ts`.

## Points d’extension

Modifications courantes et emplacements où les effectuer :

- **Nouvelle stratégie d’évaluation** — étendez le bloc `switch (evalCase.expected.strategy)`
  dans `evaluateCase()` (`evalRunner.ts`) et élargissez `EvalCaseStrategy` dans
  `src/lib/db/evals.ts`, ainsi que `evalCaseBuilderSchema` dans `schemas.ts`.
- **Nouvelle suite intégrée** — définissez un objet de suite et appelez `registerSuite()` au
  bas de `evalRunner.ts`. Il sera automatiquement découvert par `listSuites()`.
- **Exécution concurrente** — remplacez la boucle `for` séquentielle dans
  `runEvalSuiteAgainstTarget()` par un `Promise.all` borné (aucun contrôle de la concurrence
  n’existe actuellement).
- **Cas de streaming/d’appels d’outils** — actuellement, l’exécuteur impose `stream: false`.
  L’évaluation prenant en charge le streaming ou les outils nécessiterait des modifications dans `runtime.ts`
  (capturer et agréger les fragments SSE avant l’évaluation).

## Voir aussi

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — présentation générale du produit
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — référence du pipeline de requêtes
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — moteur de notation Auto Combo (exécution en direct)
- Source : `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Interface utilisateur : `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
