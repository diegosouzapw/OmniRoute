# OmniRoute Auto-Combo Engine (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Pour les utilisateurs** : Vous cherchez un démarrage rapide ? Consultez le [Guide utilisateur d’Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) pour obtenir des explications simples et des exemples.

> Chaînes de modèles autogérées avec notation adaptative + routage automatique sans configuration

## Routage automatique sans configuration (préfixe `auto/`)

> **NOUVEAU :** Aucune création de combo requise. Utilisez directement le préfixe `auto/` dans n’importe quel client.

### Exemples rapides

| ID du modèle   | Variante | Comportement                                                                                 |
| -------------- | -------- | -------------------------------------------------------------------------------------------- |
| `auto`         | default  | Tous les fournisseurs connectés, stratégie LKGP, poids équilibrés                            |
| `auto/coding`  | coding   | Poids privilégiant la qualité, adaptés à la génération de code                               |
| `auto/fast`    | fast     | Sélection pondérée à faible latence                                                          |
| `auto/cheap`   | cheap    | Routage optimisé pour les coûts (coût le plus bas en premier)                                |
| `auto/offline` | offline  | Privilégie les fournisseurs disposant du quota disponible le plus élevé                      |
| `auto/smart`   | smart    | Priorité à la qualité + taux d’exploration supérieur (10 %) pour mieux découvrir les modèles |
| `auto/lkgp`    | lkgp     | LKGP explicite (identique à `auto` par défaut)                                               |
| `auto/chaos`   | chaos    | Poids d’injection de pannes pour les tests de résilience (ingénierie du chaos)               |

### Composition catégorie × niveau (`auto/<category>:<tier>`)

Les suffixes de style OpenRouter séparent **le type de route** (catégorie) de **la manière de l’optimiser** (niveau), afin que vous puissiez les combiner librement (#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`) :

- **Catégories** (filtrent le groupe de candidats selon leurs capacités) : `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` conservent les modèles capables de traiter des images ; `reasoning` conserve les modèles de raisonnement/réflexion.
- **Niveaux** (sélectionnent les poids de notation / le filtre du groupe) : `fast` (livraison rapide) · `cheap` (alias `floor`, économie de coûts) · `reliable` (état du disjoncteur + stabilité de la latence) · `free` / `pro` (filtrent le groupe selon le niveau du modèle via `classifyTier` — niveau gratuit ou premium).

| Exemple                | Résultat                                                                 |
| ---------------------- | ------------------------------------------------------------------------ |
| `auto/coding:fast`     | groupe de codage, poids à faible latence                                 |
| `auto/coding:cheap`    | groupe de codage, optimisé pour les coûts (alias `auto/coding:floor`)    |
| `auto/reasoning:pro`   | modèles de raisonnement/réflexion uniquement, niveau premium             |
| `auto/vision`          | modèles capables de traiter des images (aucun niveau → poids équilibrés) |
| `auto/multimodal:free` | modèles multimodaux, niveau gratuit uniquement                           |

Toute combinaison valide `auto/<category>[:<tier>]` est résolue à la demande ; une sélection organisée est annoncée dans `/v1/models` et le tableau de bord (`AUTO_SUFFIX_VARIANTS` dans `open-sse/services/autoCombo/builtinCatalog.ts`). Le filtrage est **tolérant aux échecs** — si une contrainte ne correspond à aucun modèle connecté, le groupe complet est utilisé afin que le routage ne soit jamais interrompu. Le mécanisme de notation principal (`combo.ts`) reste inchangé ; le filtre de catégorie/niveau est appliqué dans `buildAutoCandidates`.

> **Intelligence des modèles en direct :** la pertinence du routage automatique s’appuie sur les classements **Arena ELO** en direct ainsi que sur les données de niveau de **models.dev** lorsque l’indicateur `ARENA_ELO_SYNC_ENABLED` est activé (sinon, retour à la carte de pertinence statique).

**Utilisation :**

```bash
# Tout IDE ou outil CLI prenant en charge le format OpenAI
Base URL: http://localhost:20128/v1
API Key:  <votre-clé-de-point-de-terminaison>

# Dans votre code/configuration, définissez le modèle sur :
model: "auto"                 # valeur équilibrée par défaut
model: "auto/coding"          # idéal pour les tâches de codage
model: "auto/fast"            # le plus rapide disponible
model: "auto/cheap"           # le moins cher par jeton
```

**Ce qui se passe :**

1. OmniRoute détecte le préfixe `auto/` dans `src/sse/handlers/chat.ts`
2. Interroge toutes les **connexions de fournisseurs actives** dans la base de données
3. Filtre celles qui disposent d’identifiants valides (clé API ou jeton OAuth)
4. Détermine le modèle pour chaque connexion (`connection.defaultModel` ou le premier modèle du fournisseur)
5. Construit un **combo virtuel** en mémoire (non stocké dans la base de données)
6. Effectue le routage à l’aide du profil de poids de la variante sélectionnée + la stratégie LKGP

**Propriétés principales :**

- ✅ **Toujours actif :** Aucun bouton d’activation, aucune création de combo et aucune configuration nécessaires
- ✅ **Dynamique :** Reflète automatiquement les fournisseurs actuellement connectés
- ✅ **Affinité de session :** LKGP garantit que le dernier fournisseur ayant réussi est prioritaire
- ✅ **Prise en charge de plusieurs comptes :** Chaque connexion de fournisseur devient un candidat distinct
- ✅ **Aucune écriture dans la base de données :** Le combo virtuel n’existe que pour la requête, sans aucune surcharge de persistance

### Contrôle des candidats par clé (#7819, niveaux 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = le suffixe après `auto/`, ou
la valeur littérale `auto` pour le canal de base) est un point de terminaison **en lecture seule** qui répertorie
le groupe de candidats actuel d’un canal `auto/*`, enrichi avec l’accessibilité en direct, en réutilisant
les lectures de résilience existantes (jamais la valeur brute `state` du disjoncteur) :

- disjoncteur du fournisseur — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- délai de récupération de la connexion — `rateLimitedUntil` / `testStatus` sur la ligne
  `provider_connections` résolue
- verrouillage du modèle — `isModelLocked(provider, connectionId, model)`

Chaque candidat comporte également l’indicateur `excluded` propre à cette clé API. Les exclusions sont stockées
par clé API (table `auto_candidate_overrides`, migration `128`) — OmniRoute est
monolocataire et ne possède aucune table `users`, donc `apiKeyId` est l’identité réelle par appelant
la plus proche — et appliquées au point de passage obligé du groupe de candidats dans
`open-sse/services/autoCombo/virtualFactory.ts` via la fonction pure et testée unitairement
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
Le filtre est **tolérant aux échecs** : un apiKeyId/canal non défini ou l’échec d’une recherche dans la base de données
laissent tous deux le groupe sans filtrage, de sorte qu’un opérateur n’ayant configuré aucun remplacement bénéficie d’un routage
strictement identique, octet pour octet, à celui d’avant cette fonctionnalité.

**Reporté à un ticket de suivi :** pondérations par candidat + ordre explicite (niveau 3
— alimente les chemins de stratégie pondérée/prioritaire existants) et épinglage d’une
stratégie `combo.ts` spécifique par canal `auto/*` (niveau 4). Consultez le plan du ticket #7819 concernant la question en suspens :
les substitutions doivent-elles rester propres à chaque clé d’API ou devenir globales compte tenu du
modèle à locataire unique ?

**En coulisses :**

```txt
Requête : { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts détecte le préfixe
   ↓
createVirtualAutoCombo('coding') → candidatePool issu des connexions actives
   ↓
handleComboChat (même moteur que pour les combinaisons persistées)
   ↓
La notation automatique sélectionne le meilleur fournisseur/modèle pour chaque requête
```

**Fichiers d’implémentation :**

| Fichier                                                   | Objectif                                                            |
| --------------------------------------------------------- | ------------------------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Analyseur de préfixe (`parseAutoPrefix`)                            |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Crée des objets `AutoComboConfig` virtuels                          |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Point d’injection de test pour simuler le registre des fournisseurs |
| `src/sse/handlers/chat.ts`                                | Intégration : court-circuit pour le préfixe automatique             |
| `src/shared/constants/providers.ts`                       | Entrée système `SYSTEM_PROVIDERS.auto`                              |

## Noms de combos correspondant à un identifiant de modèle réel

Un combo dont le `name` est identique à un identifiant de modèle sans préfixe (par exemple, un combo nommé
`gpt-5.5`) constitue un **comportement intentionnel et pris en charge**, et non un bug : il s’agit du
mécanisme de repli entre fournisseurs pour chaque identifiant de modèle, documenté dans
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Comme la résolution des combos
est vérifiée avant celle des identifiants de modèle sans préfixe
(`getComboForModel()` dans `src/sse/services/model.ts`), une requête portant sur l’identifiant
`gpt-5.5` est acheminée via les cibles du combo (par exemple,
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) plutôt que directement vers
un seul fournisseur — cela réutilise la priorité des combos sur la réécriture, conçue pour
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227), et fait l’objet de
tests de non-régression dans `tests/unit/responses-combo-resolution-3227.test.ts` et
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

La création ou le renommage d’un combo avec un nom masquant un identifiant de modèle réel n’est
**jamais refusé** — un tel refus interromprait ce flux de travail documenté. À la place
(#8530), `POST /api/combos` et `PUT /api/combos/[id]` ajoutent à la réponse un champ
`warning` non bloquant lorsque le nouveau nom entre en collision avec un identifiant de
modèle réel :

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Au démarrage, `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) consigne également un avertissement `[STARTUP]` sur une seule ligne,
énumérant chaque combo existant qui masque un identifiant de modèle, afin que les opérateurs qui
rencontrent cette situation accidentellement (plutôt qu’intentionnellement, conformément à #6940) en soient avertis.
La fonction utilitaire de détection se trouve dans `src/lib/combos/modelNameCollision.ts`.

## Appeler un combo personnalisé depuis un client

Les combos persistants (Paramètres → Combos) ne sont utilisés que lorsque le client envoie le **nom exact** du combo dans le champ `model` — aucune correspondance approximative ou partielle du nom du combo n’est effectuée, et aucun préfixe `auto/` n’intervient. Ordre de résolution (`getComboForModel()` dans `src/sse/services/model.ts`) :

1. correspondance exacte avec le nom du combo (`model: "my-combo"`),
2. préfixe `combo/<name>` (`model: "combo/my-combo"`),
3. mappages modèle→combo par motifs glob (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Deux pièges courants :

- **`auto` n’utilise pas vos combos.** `auto`/`auto/*` construit son propre ensemble de candidats sans configuration et ne consulte les combos persistants que si un combo porte littéralement le nom `auto` (non recommandé). Pour acheminer une requête via un combo, envoyez son nom exact — pas `auto`.
- **`openrouter/auto` est un véritable produit OpenRouter payant** (« Auto Best Available »), et non un alias OmniRoute. Il s’agit de l’unique entrée de modèle statique du registre OpenRouter (`open-sse/config/providers/registry/openrouter/index.ts`) et sa facturation est distincte. Utilisez Paramètres → Routage → Masquer les modèles payants pour l’exclure des ensembles `auto`.

Consultez [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) et [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) pour connaître l’origine de la confusion clarifiée par cette documentation.

## Fonctionnement (Auto-Combos persistées)

L’Auto-Combo Engine sélectionne dynamiquement le meilleur fournisseur/modèle pour chaque requête à l’aide d’une **fonction de notation à 16 facteurs** (définie dans `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). La somme des pondérations par défaut est égale à `1.0` ; les pondérations personnalisées sont renormalisées par `normalizeScoringWeights()`. Deux de ces seize facteurs — `cacheAffinity` et `resetWindowAffinity` — ont une pondération par défaut de `0` ; `reliability` vaut `0` dans `DEFAULT_WEIGHTS`, mais `0.03` dans les profils génériques et `0.04` dans `reliability-first`, tandis que `quality` vaut `0.02` dans les profils (`0.03` dans `quality-first`) : ils sont néanmoins calculés pour chaque candidat, et `cacheAffinity` contrôle la déduplication du cache de prompts en dehors du score. Ainsi, les facteurs dont la valeur par défaut est nulle ne participent tout simplement pas au score par défaut, contrairement à ceux activés par les profils.

![Notation à 16 facteurs de l’Auto-Combo](../diagrams/exported/auto-combo-scoring.svg)

> Source : [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (régénérez via `npm run docs:render-diagrams`). Le nom de fichier est historique ; la source et le diagramme généré présentent les 16 facteurs déclarés dans `DEFAULT_WEIGHTS`.

| Facteur               | Pondération par défaut | Description                                                                                                                                                                                                                                                      |
| :-------------------- | :--------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429                 | Quota restant / marge disponible avant la limite de débit [0..1]                                                                                                                                                                                                 |
| `health`              | 0.1605                 | Score de santé fourni par le disjoncteur (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                                                   |
| `costInv`             | 0.1429                 | Inverse du coût **combiné** (60 % du prix des tokens d’entrée + 40 % du prix des tokens de sortie, normalisé) — moins cher = score plus élevé                                                                                                                    |
| `latencyInv`          | 0.1143                 | Inverse de la latence p95 normalisée par rapport au pool — plus rapide = score plus élevé                                                                                                                                                                        |
| `taskFit`             | 0.0762                 | Adéquation au type de tâche (codage, revue, planification, analyse, débogage, documentation)                                                                                                                                                                     |
| `stability`           | 0.0476                 | Stabilité basée sur la variance de l’écart-type de latence — un candidat dont le temps de réponse fluctue obtient un score inférieur                                                                                                                             |
| `tierPriority`        | 0.0476                 | Priorité du niveau de compte — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                                                      |
| `tierAffinity`        | 0.0476                 | Affinité entre le niveau du candidat et le niveau recommandé par le manifeste                                                                                                                                                                                    |
| `specificityMatch`    | 0.0476                 | Correspondance entre la spécificité de la requête (indication du manifeste) et le niveau du modèle                                                                                                                                                               |
| `contextAffinity`     | 0.0476                 | Affinité entre le besoin de la requête en matière de fenêtre de contexte et la fenêtre de contexte du modèle                                                                                                                                                     |
| `sessionAvailability` | 0.0476                 | Disponibilité de la session OAuth de la connexion candidate pour cette session (`getOAuthSessionAvailability()` ; les connexions non OAuth obtiennent un score de 1.0)                                                                                           |
| `connectionDensity`   | 0.0476                 | Répartit la charge entre les connexions d’un même fournisseur (anti-concentration)                                                                                                                                                                               |
| `cacheAffinity`       | 0.00                   | Affinité par hachage rendez-vous vers la connexion la plus susceptible de déjà détenir le préfixe du cache de prompts de cette requête (`open-sse/services/combo/promptCacheAffinity.ts`) ; désactivée par défaut (#8008)                                        |
| `resetWindowAffinity` | 0.00                   | Favorise les connexions dont la fenêtre de réinitialisation du quota est avantageuse (désactivé par défaut)                                                                                                                                                      |
| `quality`             | 0.03                   | Signal de qualité de sortie fondé sur les retours du dispositif de suivi de la qualité des événements de routage ; les candidats sans observations reçoivent une valeur neutre de 0.5                                                                            |
| `reliability`         | 0.00                   | Part de succès observée, `1 - failureRate`, sur 24 h d’historique d’utilisation avec un seuil minimal de dix échantillons (sinon, métriques en temps réel) ; les candidats sans observations sont considérés comme ayant une valeur de 1.0. Désactivé par défaut |

**Somme :** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`, comme déclaré dans `DEFAULT_WEIGHTS` ; les pondérations configurées par l’utilisateur sont renormalisées en une distribution par `normalizeScoringWeights()` avant le calcul du score.

## Packs de modes

6 profils de pondération prédéfinis dans `open-sse/services/autoCombo/modePacks.ts`. Chaque pack remplace intégralement les pondérations par défaut afin d’orienter la sélection vers un objectif. La somme de chaque pack est déjà égale à `1.0` (`0.9999` avec un affichage à quatre décimales) ; `normalizeScoringWeights()` n’a donc rien de significatif à corriger lorsqu’un pack est actif — les valeurs ci-dessous sont, à l’arrondi près, celles appliquées par le système de notation.

| Facteur               | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Remarques :

- **Les packs incluent `quality` et `reliability`** (`quality 0.02`, `quality-first 0.03` ; `reliability 0.03`, `reliability-first 0.04`) et remplacent entièrement la table de pondérations (`weights = pack`, sans fusion). `DEFAULT_WEIGHTS` contient `quality 0.03 / reliability 0` ; sélectionner `balanced`/`default` conserve ces valeurs par défaut, tandis que sélectionner un pack utilise les valeurs du pack indiquées ci-dessus. Avec un pool froid (encore aucune observation, donc `quality 0.5` et `reliability 1`), ces deux facteurs ajoutent `+0.04` avec un pack générique (`0.03 + 0.01`), `+0.045` avec `quality-first` et `+0.05` avec `reliability-first`.
- `tierAffinity`, `specificityMatch` et `resetWindowAffinity` sont explicitement définis sur `0` dans chaque pack.
- Aperçu des priorités de chaque pack :
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (connexions saines à faible latence)
  - **cost-saver** → costInv 0.3324 (les jetons les moins chers l’emportent)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, la valeur la plus élevée de tous les packs (meilleur modèle pour la tâche, comportement cohérent)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (marge maximale, indépendamment de la vitesse ou du coût)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, la valeur la plus élevée de tous les packs (moins de surprises)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (profil d’injection de pannes)

### Contrôles par requête (en-têtes) — #6023 / #6024 / #6025 / #3470

Un combo `auto` peut être piloté **pour chaque requête** au moyen de trois en-têtes, sans modifier la
configuration stockée du combo. Ceux-ci s’appliquent uniquement à la stratégie `auto` et uniquement à la requête
qui les contient ; les valeurs `modePack`/`budgetCap`/`budgetFallback` enregistrées du combo sont utilisées
lorsque l’en-tête est absent.

| En-tête                       | Accepte                                                                                                                                                                                             | Effet                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `X-OmniRoute-Mode`            | un alias de préréglage (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) ou un nom de pack brut (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Remplace les pondérations de score pour cette requête. `balanced`/`default` imposent les pondérations par défaut (aucun pack). Les valeurs inconnues sont ignorées (configuration préservée).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `X-OmniRoute-Budget`          | un nombre positif (montant maximal en USD par requête)                                                                                                                                              | Plafond de coût strict : les candidats dont le coût estimé le dépasse sont filtrés avant la sélection. Le comportement lorsque **tous** les candidats le dépassent est déterminé par `X-OmniRoute-Budget-Fallback` ci-dessous.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (par défaut, alias : `cheapest-viable`, `soft`) ou `strict` (alias : `block`, `hard`)                                                                                                    | `cheapest` : se rabat sur le candidat globalement le moins cher, même s’il dépasse toujours le plafond (comportement historique). `strict` : refuse d’effectuer une sélection — la requête échoue immédiatement avec `HTTP 402` au lieu d’entraîner silencieusement un dépassement de budget. Les valeurs inconnues sont ignorées.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `X-OmniRoute-Effort`          | `auto` (autres valeurs réservées)                                                                                                                                                                   | Budget de réflexion adaptatif : lorsque la requête ne contient **aucun** champ de raisonnement, quelle qu’en soit la forme (`reasoning_effort`, `reasoning`, `thinking`), la passerelle résout `auto` en `low`/`medium`/`high` à partir de signaux déterministes liés à la structure de la requête (longueur du dernier message utilisateur, taille du contexte jusqu’au dernier message utilisateur, résultats d’outils antérieurs, profondeur de la boucle d’outils). Les signaux sont limités au tour actuel — tout ce qui suit le dernier message utilisateur est ignoré — de sorte que chaque requête d’une boucle d’outils est résolue au même niveau (verrouillage sans état par tour, aucun état de session, aucune augmentation en cours de boucle susceptible de rompre les préfixes du cache de prompts en amont). Un champ de raisonnement explicite du client est toujours prioritaire. Limité aux requêtes dont la répartition en amont correspond au format OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` est un champ au format OpenAI ; l’en-tête est donc sans effet sur une requête ciblant Claude ou Gemini (voir `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Forcer le profil le plus rapide, plafonner cette requête à 0,05 $, et bloquer strictement plutôt que de dépasser le budget
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

La résolution est une fonction pure (`open-sse/services/autoCombo/requestControls.ts`) ; les
valeurs résolues alimentent les entrées `config.modePack` / `config.budgetCap` /
`config.budgetFallback` existantes du moteur. La valeur `config.budgetFallback` enregistrée d'une combinaison ("strict" |
"cheapest") définit la politique persistante ; l'en-tête la remplace pour une seule requête.

## Toutes les stratégies de routage

Le moteur de combos d’OmniRoute prend en charge **19 stratégies de routage** (déclarées dans `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Le moteur Auto Combo lui-même est exposé sous la stratégie `auto` ; les autres sont disponibles pour les combos persistés.

| Stratégie           | Description                                                                                                                                                                                                                           |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `priority`          | Liste ordonnée donnant la priorité à la première cible, avec priorité explicite                                                                                                                                                       |
| `weighted`          | Sélection aléatoire pondérée selon le poids de chaque cible                                                                                                                                                                           |
| `round-robin`       | Parcourt les cibles dans l’ordre, de manière cyclique                                                                                                                                                                                 |
| `context-relay`     | Transmet le contexte entre les cibles (conversations longues)                                                                                                                                                                         |
| `fill-first`        | Épuise le quota de chaque cible avant de passer à la suivante                                                                                                                                                                         |
| `p2c`               | Équilibrage de charge aléatoire selon la méthode « Power of 2 Choices »                                                                                                                                                               |
| `random`            | Sélection aléatoire uniforme                                                                                                                                                                                                          |
| `least-used`        | Sélectionne la cible ayant la charge actuelle la plus faible                                                                                                                                                                          |
| `cost-optimized`    | Minimise le coût en $ par requête en fonction des tarifs du catalogue                                                                                                                                                                 |
| `reset-aware` ⭐    | Classe les cibles par délai de réinitialisation du quota — les fenêtres de réinitialisation courtes sont prioritaires                                                                                                                 |
| `reset-window`      | Privilégie les cibles dont la fenêtre de quota sera réinitialisée le plus tôt                                                                                                                                                         |
| `headroom`          | Sélectionne la cible disposant de la plus grande marge de quota restante                                                                                                                                                              |
| `strict-random`     | Sélection aléatoire sans déduplication des répétitions                                                                                                                                                                                |
| `auto`              | Utilise la notation Auto Combo (16 facteurs) — **recommandé**                                                                                                                                                                         |
| `lkgp`              | Dernier chemin connu comme fonctionnel (s’en tient au dernier fournisseur ayant réussi, puis se rabat sur les règles)                                                                                                                 |
| `context-optimized` | Sélectionne la cible la mieux adaptée à la taille actuelle du contexte                                                                                                                                                                |
| `cache-optimized`   | Réordonne les cibles selon l’affinité du cache d’invite — la connexion la plus susceptible de déjà contenir le préfixe mis en cache de cette requête est essayée en premier (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Interroge en parallèle un panel de modèles, puis synthétise une réponse unique au moyen d’un juge (voir ci-dessous)                                                                                                                   |
| `pipeline`          | Exécute les cibles séquentiellement en transmettant la sortie de chaque étape comme entrée de la suivante ; seule la réponse finale est renvoyée (#6396)                                                                              |

⭐ = Nouveau dans v3.8.0 · 🧬 = Nouveau dans v3.8.36

### Sémantique de `weighted`

`weighted` effectue un **tirage aléatoire proportionnel pour chaque requête**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`) et non un équilibrage :

- Chaque requête tire **une** étape avec une probabilité égale à `weight / totalWeight` ; les étapes restantes
  sont ordonnées par poids décroissant afin de former la chaîne de repli pour cette requête.
- Une étape dont le poids est `0` (ou absent) n’est **jamais tirée** tant qu’une autre étape possède un
  poids > 0 — elle ne peut servir que de solution de repli après l’échec de l’étape tirée. La sélection ne devient
  uniforme que lorsque **tous** les poids sont égaux à 0.
- Les étapes dont toutes les cibles sont indisponibles — disjoncteur du fournisseur à l’état `OPEN`, délai de récupération
  de la connexion, verrouillage du modèle — sont retirées du tirage avant qu’il ne soit effectué
  (`open-sse/services/combo/targetResolution.ts`) ; une seule étape saine peut donc temporairement
  remporter toutes les requêtes.
- `stickyWeightedLimit` (configuration du combo, valeur par défaut `1` = désactivé) conserve l’étape tirée pendant ce nombre
  de réussites consécutives avant d’effectuer un nouveau tirage.

Pour une rotation stricte, utilisez `round-robin` ; des poids égaux avec `weighted` produisent un équilibre statistique — et non
strict.

## Stratégie de fusion

`fusion` est la seule stratégie qui ne sélectionne **pas** une cible unique. Elle distribue la requête
à **tous les modèles du panel en parallèle**, puis un **modèle juge** configurable synthétise
une réponse finale unique à partir de toutes les réponses du panel. Portée depuis le projet amont `decolua/9router`
(conception Fusion d’OpenRouter) ; implémentation dans `open-sse/services/fusion.ts`.

Fonctionnement :

0. **Contournement pour les requêtes avec outils** — une requête contenant un tableau `tools` non vide avec
   `tool_choice` qui n’est pas explicitement défini sur `"none"` ignore entièrement le panel : elle est acheminée directement vers
   un modèle unique (le juge configuré ou `panel[0]`), avec `tools`/`tool_choice`
   transmis sans modification. Les membres du panel n’ont pas accès aux outils, et la
   directive de synthèse du juge décourage l’émission d’appels d’outils ; les clients
   agentiques ou utilisant des appels d’outils obtiennent ainsi une véritable décision d’appel d’outil plutôt qu’un texte synthétisé (#6771).
1. **Distribution** (uniquement pour les requêtes sans outils) — la requête est envoyée simultanément à chaque
   modèle du panel, en imposant le mode non-streaming et en retirant les outils (le juge a besoin d’un
   texte complet pour effectuer la synthèse).
2. **Collecte avec délai de grâce après quorum** — dès que `minPanel` réponses sont reçues, un court
   délai de grâce démarre pour les retardataires, puis la fusion se poursuit avec les réponses collectées.
   Cela limite l’impact du modèle le plus lent sur le temps d’exécution total, dans la limite d’un délai d’expiration strict.
3. **Synthèse par le juge** — les réponses du panel sont anonymisées (`Source 1`, `Source 2`, … — afin que
   le juge évalue le fond plutôt que la marque du modèle) et transmises au juge, qui analyse
   le consensus, les contradictions, la couverture partielle, les perspectives uniques et les angles morts, puis
   rédige **une** réponse faisant autorité. L’appel au juge conserve le paramètre `stream` d’origine
   du client ainsi que les outils, afin que le streaming et l’utilisation ultérieure d’outils restent possibles.
4. **Dégradation contrôlée** — 0 réponse du panel → `503` ; exactement 1 réponse survivante → cette réponse
   est renvoyée directement (rien à fusionner) ; un panel constitué d’un seul modèle répond directement.

Un membre du panel peut également être une étape `combo-ref` (`{kind: "combo-ref", comboName: "..."}`) référençant
un autre combo — il est résolu comme **une seule voix opaque du panel** (une distribution récursive complète vers le
combo référencé, et non une distribution vers les propres cibles de ce combo), avec les mêmes protections contre
la profondeur excessive et les cycles que celles déjà utilisées par toutes les autres stratégies consommant des références `combo-ref` (#6764).

### Configuration

La configuration s’effectue dans le blob `config` du combo (aucune migration de schéma — elle réutilise la table
`combos` existante) :

| Champ                                    | Type     | Valeur par défaut       | Objectif                                                                                            |
| :--------------------------------------- | :------- | :---------------------- | :-------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | premier modèle du panel | Modèle qui synthétise la réponse finale                                                             |
| `config.fusionTuning.minPanel`           | `number` | `2`                     | Nombre de réponses réussies requis avant le démarrage du délai de grâce (limité à `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`                  | Durée d’attente des retardataires une fois le quorum atteint                                        |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`                 | Limite absolue empêchant un modèle bloqué de retarder indéfiniment la requête                       |

Les valeurs par défaut sont définies dans `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Exemple

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Appelez-le ensuite comme n’importe quel autre combo : `{"model":"fusion-panel","messages":[...]}`.

## Fabrique virtuelle d’Auto-Combo

Le moteur Auto Combo ne nécessite pas de combos prédéfinis. À la place, `open-sse/services/autoCombo/virtualFactory.ts` construit les candidats à la volée :

1. Récupère `getProviderConnections({ isActive: true })` (toutes les connexions activées)
2. Filtre celles qui disposent d’identifiants valides (clé API ou jeton OAuth non expiré via `hasUsableOAuthToken()`)
3. Effectue un recoupement avec `getProviderRegistry()` pour connaître la disponibilité des modèles et leur tarification
4. Pour chaque tuple `(provider, model, connection)`, construit un `VirtualAutoComboCandidate`
5. Sélectionne `connection.defaultModel` (ou le premier modèle du registre) comme cible d’acheminement
6. Attribue un score à chaque candidat à l’aide de `scorePool()`, qui comporte 16 facteurs, et du jeu de pondérations de la variante
7. Renvoie l’`AutoComboConfig` en mémoire résultante à `handleComboChat()` — sans jamais la persister dans la base de données

Cela signifie que **l’ajout d’un nouveau fournisseur avec `auto/*` activé étend automatiquement le pool de candidats** — aucune modification manuelle des combos n’est nécessaire. Le combo virtuel est reconstruit à chaque requête, de sorte que les connexions nouvellement ajoutées ou redevenues opérationnelles sont immédiatement prises en compte.

## Autoréparation

- **Exclusion temporaire** : score < 0,2 → exclusion pendant 5 min (temporisation progressive, 30 min max.)
- **Prise en compte du disjoncteur** : OPEN → exclusion automatique ; HALF_OPEN → requêtes de test
- **Mode incident** : >50 % OPEN → désactivation de l’exploration, maximisation de la stabilité
- **Récupération après temporisation** : après une exclusion, la première requête est un « test » avec un délai d’expiration réduit

## Exploration par bandit

5 % des requêtes (valeur configurable) sont acheminées vers des fournisseurs aléatoires à des fins d’exploration. Cette fonctionnalité est désactivée en mode incident.

## API

Il n’existe **aucun point de terminaison `POST /api/combos/auto` dédié** — Auto-Combo s’utilise de deux manières :

1. **Sans configuration (recommandé) :** envoyez n’importe quelle requête de complétion de chat avec `model: "auto"` ou `model: "auto/<variant>"`. La fabrique virtuelle construit le combo à chaque requête — aucune persistance ni aucun appel d’API n’est nécessaire.

2. **Combo persisté avec `strategy: "auto"` :** créez un combo standard via `POST /api/combos` et définissez `strategy: "auto"`, ainsi que `config.auto.weights` / `config.auto.candidatePool`. Le même moteur de notation est utilisé ; le combo est stocké dans `combos` et peut être réutilisé par son ID.

Pour la découverte, `GET /api/combos/auto` répertorie chaque variante avec son pool de candidats résolu, ainsi que `context_length` / `max_output_tokens` — les valeurs MAXIMALES parmi les fenêtres du pool de candidats. Les clients (par exemple, le plugin opencode) doivent publier ces valeurs au lieu de `0` : un contexte nul désactive entièrement la compression automatique d’opencode, ce qui permet aux sessions de croître jusqu’à ce que la purge de l’historique par la passerelle détruise le contexte. Il est sûr de publier la valeur MAXIMALE, car le préfiltre de contexte de l’auto-combo achemine les requêtes surdimensionnées vers des candidats dotés de grandes fenêtres.

```bash
# Utilisation sans configuration (aucune création de combo)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Combo automatique persisté via le point de terminaison standard des combos
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Stratégies du routeur automatique

Les combos persistés avec `strategy: "auto"` peuvent définir `config.routerStrategy` (ou l’ancien
`config.auto.routerStrategy`) sur l’une des valeurs suivantes :

- `rules` — notation pondérée par défaut
- `score` — sélectionne le score pondéré configuré le plus élevé. En cas d’égalité parfaite, l’ordre configuré
  des candidats est conservé ; le paramètre `explorationRate` existant effectue un échantillonnage dans l’ensemble du pool classé.
- `cost` / `eco` — fournisseur opérationnel le moins cher
- `latency` / `fast` — latence p95 la plus faible avec pénalité de fiabilité
- `sla-aware` / `sla` — privilégie les candidats qui respectent les objectifs de niveau de service relatifs à la latence p95, au taux d’erreur et, éventuellement,
  au coût
- `lkgp` — priorité au dernier fournisseur connu comme opérationnel

### Stratégies du routeur en détail

Le moteur auto-combo expose 6 implémentations enfichables de **RouterStrategy** que
vous pouvez remplacer via `config.routerStrategy` (ou l’ancien `config.auto.routerStrategy`).
Chaque stratégie choisit un fournisseur dans le pool de candidats en fonction d’un `RoutingContext`
(type de tâche, indications relatives aux outils/à la vision, estimation du nombre de jetons, politique de SLA facultative, dernier
fournisseur connu comme opérationnel facultatif).

#### 1. `rules` (par défaut) — notation pondérée à 16 facteurs

Encapsule le moteur de notation existant. Élimine les candidats dont le disjoncteur est à l’état `OPEN`,
puis exécute `scorePool()` avec le type de tâche actuel et `getTaskFitness()`,
en sélectionnant le fournisseur ayant obtenu le meilleur score.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Quand l’utiliser** : par défaut. À utiliser lorsque vous recherchez un compromis équilibré entre tous les signaux.

**Alias** : `rules` (aucun alias)

---

#### 2. `cost` / `eco` — fournisseur opérationnel le moins cher

Trie le pool de candidats par `costPer1MTokens` (ordre croissant) et sélectionne le moins cher.
Élimine d’abord les candidats à l’état `OPEN`.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Quand l’utiliser** : charges de travail sensibles aux coûts, traitement par lots ou tâches en arrière-plan.

**Alias** : `cost`, `eco`

---

#### 3. `latency` / `fast` — latence p95 la plus faible avec pénalité de fiabilité

Trie selon `p95LatencyMs + (errorRate * 1000)`. La pénalité liée au taux d’erreur garantit que
les fournisseurs peu fiables sont moins bien classés, même si leur latence nominale est faible.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Quand l’utiliser** : Charges de travail sensibles à la latence, comme le chat en temps réel, l’autocomplétion ou
les assistants de programmation interactifs.

**Alias** : `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — conformité aux SLO de latence/d’erreur/de coût

Attribue un score à chaque candidat selon son niveau de conformité à la politique SLO configurée :

| Facteur            | Pondération | Formule                                           |
| ------------------ | ----------- | ------------------------------------------------- |
| Score de latence   | 35%         | `threshold / max(value, ε)`                       |
| Score d’erreur     | 35%         | `threshold / max(value, ε)`                       |
| Score de santé     | 15%         | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN) |
| Score de coût      | 10%         | `threshold / max(value, ε)` ou inverse normalisée |
| Score de stabilité | 5%          | écart-type de latence normalisé inversement       |

Lorsque `hardConstraints: true`, les candidats sont principalement triés selon leur **score de violation**
(l’ampleur du dépassement des SLO), puis selon leur score composite. Sinon, seul
le score composite est utilisé.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... attribue un score à chaque candidat par rapport à la politique : { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Champs SLA** (définis dans la configuration combinée) :

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Quand l’utiliser** : Charges de travail de production soumises à des budgets stricts de latence, de taux d’erreur ou de coût.

**Alias** : `sla-aware`, `sla`

---

#### 5. `lkgp` — dernier fournisseur fonctionnel connu en premier

Essaie d’abord le **dernier fournisseur fonctionnel connu** (s’il est défini), puis se rabat sur la
stratégie `rules`. Utile pour l’affinité de session : le même fournisseur traite
les requêtes de suivi d’une conversation.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Repli sur la stratégie rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Quand l’utiliser** : Conversations à plusieurs tours pour lesquelles vous souhaitez que le même fournisseur traite
les requêtes de suivi (par exemple, pour la mise en cache, la continuité du contexte ou la cohérence tarifaire).

**Alias** : `lkgp` (aucun autre alias)

---

### Stratégies de routage personnalisées

Vous pouvez enregistrer votre propre implémentation de `RouterStrategy` via l’API publique :

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Votre logique de routage ici
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Puis utilisez-la :

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Guide de sélection d’une stratégie de routage

| Cas d’utilisation      | Stratégie   | Raison                                         |
| ---------------------- | ----------- | ---------------------------------------------- |
| Charge équilibrée      | `rules`     | Par défaut — prend en compte tous les facteurs |
| Réduire le coût        | `cost`      | Choisit toujours le moins cher                 |
| Réduire la latence     | `latency`   | Choisit le fournisseur fiable le plus rapide   |
| SLO stricts            | `sla-aware` | Filtre selon les seuils p95/erreur/coût        |
| Chat à plusieurs tours | `lkgp`      | Affinité de session                            |

Champs SLA :

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Adéquation aux tâches

Plus de 30 modèles évalués sur 6 types de tâches (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Prend en charge les motifs génériques (par ex., `*-coder` → score élevé en programmation).

## Récapitulatif des variantes Auto

En incluant `auto` seul (valeur par défaut) ainsi que les 6 valeurs `AutoVariant` déclarées dans `autoPrefix.ts`, il existe **7 ID de modèle invocables** :

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` lui-même énumère 6 valeurs ; la 7e option correspond à « aucune variante » — `auto` seul — gérée par `parseAutoPrefix()` sous la forme `variant: undefined`.)

## Intégration des niveaux dans Auto-Combo

La fonction de notation à 16 facteurs (`open-sse/services/autoCombo/scoring.ts`) traite l’appartenance à un niveau comme deux signaux : `tierPriority` (0.0476) et `tierAffinity` (0.0476). Consultez le [tableau canonique des facteurs de notation](#how-it-works-persisted-auto-combos) ci-dessus pour l’ensemble complet de `DEFAULT_WEIGHTS` — les substitutions propres à chaque pack (ship-fast/cost-saver/quality-first/
offline-friendly) sont répertoriées dans le tableau « Weight profiles per pack ».

Le niveau seul ne force **pas** le niveau 1 à être prioritaire — si la latence du niveau 1 est mauvaise ou si le rapport coût-qualité est sous-optimal, le niveau 2 l’emporte. Pour imposer l’ordre des niveaux, utilisez la stratégie de combinaison `priority` et classez les fournisseurs par niveau.

Pour favoriser fortement le niveau 1 (abonnement), augmentez le poids de `tierPriority` :

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Consultez `docs/marketing/TIERS.md` pour les définitions des niveaux et la classification des fournisseurs.

## Tests et couverture

### Matrice déterministe des décisions de routage (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` vérifie de bout en bout la **décision** de routage des 19 stratégies publiques à travers le véritable pipeline de combinaison, avec un service en amont simulé. La couverture comprend :

- Les 19 stratégies `ROUTING_STRATEGY_VALUES` (ordered, weighted, cost, context, fusion, …).
- `quota-share` (interne) de bout en bout : équité DRR + dépriorisation en cas de saturation via le véritable point d’intégration `selectQuotaShareTarget` (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- La couverture du transfert universel de `context-relay` pour chaque nombre de cibles.

Cette suite s’exécute dans la CI (tâche `test:integration`) avec `--test-concurrency=1` et `--test-force-exit` afin d’être déterministe et de ne nécessiter aucun identifiant réel.

### Tests rapides réels soumis à condition (PAS dans la CI — fournisseurs réels)

| Commande                               | Fonctionnement                                                                                                        |
| :------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Routage réel dans le processus avec `RUN_COMBO_LIVE=1` ; capture un instantané d’une base de données OmniRoute active |
| `npm run test:combo:live:vps`          | Appels HTTP vers un serveur OmniRoute actif (définissez `COMBO_LIVE_BASE_URL`)                                        |
| `npm run test:combo:live:vps:failover` | Même chose, avec des scénarios de basculement délibérés                                                               |

Ces tests rapides utilisent le véritable chemin de communication (combinaison → fournisseur → complétion). Ils sont intentionnellement exclus de la CI, car ils nécessitent des identifiants réels et un accès VPS.

---

## Fichiers

| Fichier                                                   | Objectif                                                                                                         |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Fonction de notation à 16 facteurs, `DEFAULT_WEIGHTS`, normalisation du pool                                     |
| `open-sse/services/autoCombo/taskFitness.ts`              | Table de correspondance d’adéquation modèle × tâche                                                              |
| `open-sse/services/autoCombo/engine.ts`                   | Logique de sélection, bandit, plafond budgétaire                                                                 |
| `open-sse/services/autoCombo/selfHealing.ts`              | Exclusion, sondes, mode incident                                                                                 |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 profils de pondération (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Analyseur du préfixe `auto/` + 6 variantes                                                                       |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Construit un `AutoComboConfig` en mémoire à partir des connexions actives                                        |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Point d’injection de test pour simuler le registre des fournisseurs                                              |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 stratégies)                                                                        |
| `src/sse/handlers/chat.ts`                                | Intégration : court-circuit du préfixe auto                                                                      |
