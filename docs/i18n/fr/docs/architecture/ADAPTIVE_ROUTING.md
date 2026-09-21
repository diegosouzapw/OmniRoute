# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Ce document décrit la base de routage adaptatif piloté par le feedback ajoutée à
OmniRoute. Elle est volontairement limitée : elle introduit un canal typé de résultats
de routage, un signal de qualité en ligne qui alimente le système de notation auto-combo
existant, un exportateur OpenTelemetry facultatif et un endpoint d’explicabilité. Elle ne
remplace **pas** la pile de résilience existante (disjoncteur, délai de récupération des
connexions, verrouillage des modèles, matrice de santé, autopilote) — elle la complète.

## 1. Contexte architectural

OmniRoute est un plan de données doté d’un **chemin critique des requêtes** et d’un **plan
de contrôle/d’intelligence**. Le chemin critique doit rester rapide, économe en mémoire,
asynchrone, résilient et prévisible. L’évaluation, la notation de la qualité, les
expérimentations et l’analyse historique relèvent du plan de contrôle.

```
Agent IA / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   plan de données (rapide, synchrone, en mémoire)
│  routage / repli    │
│  santé / garde-fou  │
│  cache / streaming  │
└──────────┬──────────┘
           │ RoutingEvent (sans attente de réponse, ~0.2µs)
           ▼
┌─────────────────────┐
│ Récepteurs feedback │   plan de contrôle (asynchrone, au mieux)
│ suivi de la qualité │
│ exportateur OTel    │
│ stockage explicatif│
└──────────┬──────────┘
           ▼  score de qualité
    système de notation auto-combo
```

### Ce qui existait déjà (audité, non dupliqué)

| Concept                                       | Implémentation existante                                                                                                        |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Disponibilité (peut-on envoyer du trafic ?)   | Disjoncteur (CLOSED/DEGRADED/OPEN/HALF_OPEN, persistant en BDD), délai de récupération des connexions, verrouillage des modèles |
| Rapports de santé                             | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                                         |
| Trafic fantôme                                | `open-sse/services/combo/shadowRouting.ts`                                                                                      |
| Garde-fous                                    | `src/lib/guardrails/` (hooks pré/post)                                                                                          |
| Cache exact                                   | `src/lib/semanticCache.ts` (basé sur les signatures)                                                                            |
| Évaluateurs / routage piloté par l’évaluation | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                                            |
| Explicabilité des décisions de combinaison    | `open-sse/services/combo/decisionTrace.ts`                                                                                      |
| Événements en temps réel du tableau de bord   | `src/lib/events/eventBus.ts` (canal de notification de l’interface, charges utiles `unknown`, historique de 100 entrées)        |

La couche d’événements de routage n’est **pas** une réimplémentation de `eventBus` : ce bus
est le canal de notification en temps réel du tableau de bord (noms d’_événements_
typés, charges utiles opaques, consommateurs côté interface). `RoutingEvent` est une
structure typée de _résultat_ (latence/jetons/coût/résultat/motif de fin) consommée par
les récepteurs de feedback du plan de contrôle (suivi de la qualité, exportateur OTel,
stockage explicatif).

### Ce qui manquait (ajouté ici)

1. Une **abstraction typée d’événement de résultat de routage et de récepteur**
   (`RoutingEvent` / `RoutingEventSink`). `decisionTrace` est limité aux combinaisons
   et uniquement en mémoire ; `comboMetrics` contient des compteurs cumulatifs ;
   `call_logs` correspond à une persistance asynchrone brute. Aucun de ces éléments
   ne constitue un canal de résultats typé, fondé sur des récepteurs, auquel un outil
   de suivi de la qualité, un exportateur OTel ou un évaluateur de type Future-AGI
   peut s’abonner.
2. Un **signal de qualité en ligne** (EWMA) pour la qualité des sorties — auparavant,
   le système de notation n’approxime la « qualité » qu’au moyen de l’adéquation
   statique à la tâche et des taux de réussite des évaluations optionnelles.
3. Un **exportateur OTel facultatif et sans dépendance** utilisant les conventions
   sémantiques GenAI.
4. Un **endpoint d’explicabilité** renvoyant les décisions de routage réelles ainsi
   que l’état de la qualité.

## 2. Événements de routage (base de la boucle de rétroaction)

Fichiers : `open-sse/services/routing/events.ts`, `.../index.ts`

Un `RoutingEvent` contient uniquement les métadonnées de routage :

```ts
interface RoutingEvent {
  requestId: string;
  provider: string;
  model: string;
  strategy: string; // "auto" | "priority" | "direct" | ...
  latencyMs: number;
  ttftMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome; // union avec liste d’autorisation
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` est un trait de type `Send+Sync` en TypeScript :

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // doit être en O(1), sans E/S synchrones
}
```

Le chemin critique appelle `emitRoutingEvent(event)` une fois par requête terminée
(le rappel de fin de streaming, le chemin de réussite sans streaming et le chemin
d’échec sur réponse 200 mal formée dans `handleChatCore`). La distribution est une
diffusion synchrone vers les récepteurs enregistrés, mais chaque récepteur se contente
de mettre en file d’attente ou de mettre à jour un état en mémoire. **Aucune écriture
synchrone en base de données, aucune E/S réseau sur le chemin critique.**

Récepteurs par défaut :

- `MemoryRoutingEventStore` — tampon circulaire borné (500), du plus récent au plus
  ancien, pour le point de terminaison d’explication.
- Consommateur `QualityTracker` — met à jour l’estimation de qualité EWMA.
- `OtlpHttpsEventSink` — facultatif, activé uniquement lorsque `OMNIROUTE_OTEL_ENDPOINT`
  (ou `OTEL_EXPORTER_OTLP_ENDPOINT`) est défini.

### Surcharge mesurée (comparaison transparente)

`npm run bench:routing-events` sur cette station de travail (100 000 itérations ; les
opérations inférieures à la microseconde sont mesurées sous forme de µs/op agrégées,
car les percentiles par opération sont inférieurs à la résolution du minuteur
`performance.now()`) :

| Scénario                                  | µs/op  | ops/s  |
| ----------------------------------------- | ------ | ------ |
| référence (scoring uniquement)            | ~0.045 | ~22 M  |
| référence + RoutingEvent (2 récepteurs)   | ~0.168 | ~5.9 M |
| référence + événement + mise en file OTel | ~0.163 | ~6.1 M |
| simultané (8 rafales entrelacées)         | ~0.18  | —      |

L’écart dû à la distribution des événements par rapport au scoring de référence est
d’environ 0,12 µs/requête ; le récepteur OTel se contente de mettre en file d’attente
(insertion dans un tampon en O(1)), sans ajouter de coût mesurable. Ces chiffres sont
propres à la machine et relatifs — ils ne constituent pas une garantie en production.
Le chiffre « ~0,2 µs » de la v1 était une estimation agrégée ; cette méthodologie
sépare le scoring de référence du coût de distribution des événements.

## 3. Signal de qualité (état du fournisseur piloté par la rétroaction)

Fichiers : `open-sse/services/routing/quality.ts`

La v2 distingue la qualité **opérationnelle** de la qualité **sémantique** :

- **Opérationnelle** — dérivée du chemin critique de routage (HTTP 4xx/5xx, échecs
  de connexion, erreurs 429, réponses mal formées, interruptions de flux,
  `finish_reason=length`, réussites sans sortie, EWMA de latence/TTFT). Une réponse
  200 n’est PAS considérée comme un indicateur de qualité sémantique.
- **Sémantique** — la valeur réelle de la sortie générée. Elle est produite
  UNIQUEMENT par un évaluateur via `setSemanticQuality()`. Elle vaut `null` jusqu’à
  ce qu’un évaluateur la fournisse et n’est jamais intégrée au score opérationnel.

État par paire (fournisseur, modèle) (EWMA + compteurs bornés) :

- `successEwma` — EWMA (α=0.2) du succès des résultats.
- `latencyEwma` / `ttftEwma` — EWMA de la latence (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — ancienneté de la dernière observation du modèle.

### Prise en compte de la confiance et du nombre d’échantillons

`confidence = clamp01(samples / 50)`, et le score renvoyé au système de notation est
ramené vers le point médian neutre :

```
score = 0.5 + confidence * (operational - 0.5)
```

Conséquences (vérifiées par des tests) :

- Un fournisseur sans historique (0 échantillon) obtient un score de **0.5** — il
  n’est pas injustement pénalisé, mais ne peut pas surpasser un fournisseur disposant
  de milliers d’observations solides.
- Un fournisseur ayant obtenu 7 réussites chanceuses est ramené vers 0.5 (il ne
  domine jamais grâce à une initialisation optimiste).
- Un fournisseur disposant de 50 échantillons ou plus converge vers son véritable
  score opérationnel.
- La dégradation et le rétablissement sont progressifs (EWMA), et un échec isolé ne
  compromet pas un fournisseur sain.

`ProviderQuality` expose `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Ces données alimentent le système de notation auto-combo en tant que facteur de
notation `quality` :

- `ScoringFactors.quality` / `ScoringWeights.quality` dans
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS` : `health` 0.1905 → 0.1605, `quality` 0.03. La somme reste égale à 1.0.
- `buildAutoCandidates` renseigne `candidate.quality` à partir du suivi ; les candidats
  sans données utilisent par défaut la valeur neutre **0.5** (un candidat sans
  historique n’est ni favorisé ni pénalisé).

La boucle fermée :

```
RoutingEvent → QualityTracker → getQualityScore → facteur de qualité auto-combo
      ↑                                                    │
      └────── résultat de la requête (handleChatCore) ←────┘
```

### Exclusion stricte ou pénalité souple

Le signal de qualité est uniquement une **préférence adaptative souple**. L’exclusion
stricte reste du ressort de la pile de résilience existante : disjoncteur OPEN, quota
épuisé, échec d’authentification, verrouillage du modèle — aucun de ces mécanismes
n’est affecté par le score de qualité. Un fournisseur dont le score de qualité baisse
temporairement est moins favorisé, mais jamais désactivé de manière stricte.

## 3b. Mesure temporelle canonique du flux (TTFT / ITL)

Fichiers : `open-sse/utils/streamTiming.ts`

`createStreamTiming()` constitue l’unique point d’instrumentation du chemin de streaming,
intégré à `createSSEStream` (open-sse/utils/stream.ts) :

- `markByte()` — premier fragment reçu en amont.
- `markForward()` — premier fragment transmis au client (utilisé pour le TTFT).
- `markInterrupted()` — expiration du délai, abandon ou erreur du flux avant une fin normale.
- `ttft()` = latence du premier fragment SSE transmis. **Il ne s’agit PAS du TTFT au niveau des tokens** —
  un seul fragment SSE peut contenir zéro, un ou plusieurs tokens. Cela est documenté précisément.
- `avgItlMs()` = intervalle moyen entre les fragments (une approximation de l’ITL fondée sur la latence des fragments).

Le TTFT, l’ITL et l’état d’interruption sont intégrés au `RoutingEvent` (`ttftMs`, `itlMs`) et sont
exportés en tant qu’attributs de span GenAI/OmniRoute par le récepteur OTel.

## 4. Observabilité OpenTelemetry / GenAI

Fichiers : `open-sse/services/routing/otel.ts`

- Exportateur OTLP/HTTP JSON sans dépendance (utilise la fonction globale `fetch`, sans
  SDK `@opentelemetry/*`).
- Les spans suivent les conventions sémantiques GenAI (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`), ainsi que les attributs de routage
  OmniRoute (résultat, statut, TTFT, nouvelles tentatives, repli).
- `record()` se contente d’ajouter les éléments à une mémoire tampon bornée (O(1)) ; un minuteur en arrière-plan
  les envoie de manière asynchrone via `POST {endpoint}/v1/traces`. En cas de surcharge, les
  événements les plus anciens sont supprimés (compteur `dropped`) — aucune contre-pression n’est
  jamais appliquée au plan de données.
- **Désactivé sauf en cas de configuration.** `OMNIROUTE_OTEL_ENDPOINT` (ou
  `OTEL_EXPORTER_OTLP_ENDPOINT`) doit être défini ; sinon, le récepteur n’est pas
  enregistré et aucun code OTel n’est exécuté.

## 5. Explicabilité

- `GET /v1/explain/routing` renvoie les `RoutingEvent` récents (les décisions réelles,
  du plus récent au plus ancien) et l’instantané de qualité par fournisseur/modèle.
- L’authentification reproduit celle de `/v1/combos` (clé API Bearer ou session du tableau de bord ; accès anonyme pour
  les déploiements locaux mono-utilisateur avec `REQUIRE_API_KEY=false`).
- Les traces par invocation au niveau des combos restent disponibles via le fichier existant
  `decisionTrace.ts` (en-tête `X-OmniRoute-Combo-Trace`).
- Sécurité : les événements ne contiennent que des métadonnées de routage, jamais de prompts, de corps de requête ni d’identifiants.

## 6. Intégration au plan d’évaluation (préparation à Future AGI)

OmniRoute considère Future AGI (ou tout autre évaluateur) comme un **backend potentiel
d’intelligence/d’évaluation, et non comme une dépendance**. Les points d’intégration sont les suivants :

- Un `RoutingEventSink` peut transmettre les événements à un évaluateur de manière asynchrone.
- Le `MemoryRoutingEventStore` et l’instantané de qualité fournissent à un évaluateur le flux
  brut des décisions.
- Un futur `Evaluator` (déterministe, juge local, HTTP, WASM) consommerait
  les événements/traces et renverrait un `QualityScore` alimentant le même
  chemin `getQualityScore`/facteur de qualité.
- Le routage existant piloté par les évaluations (`open-sse/services/evalRouting.ts`) réordonne déjà
  les cibles des combos selon les taux de réussite de `eval_runs` lorsqu’il est activé.

Aucune évaluation ne s’exécute de manière synchrone sur le chemin des requêtes, et la passerelle fonctionne
intégralement en l’absence d’évaluateur.

## 7. Revue architecturale finale

1. **Que reste-t-il sur le chemin critique synchrone ?** Le routage/calcul des scores, les
   contrôles préalables des garde-fous, la recherche dans le cache et une diffusion `emitRoutingEvent`
   (~0,12 µs par rapport au calcul de référence) vers les récepteurs en mémoire.
2. **Qu’est-ce qui a été déplacé vers un traitement asynchrone ?** L’export OTel (minuteur + fetch),
   la persistance de `call_logs`/l’utilisation, les écritures dans le cache sémantique ; la qualité est conservée en mémoire
   et s’exécute en O(1) (aucun traitement asynchrone nécessaire).
3. **Comment un résultat de routage devient-il un signal de retour ?** `handleChatCore` émet un
   `RoutingEvent` → `QualityTracker` met à jour l’état EWMA → `getQualityScore`
   alimente le facteur `quality` de l’auto-combo.
4. **Comment la qualité influence-t-elle le routage futur ?** Un faible score de qualité réduit
   le score pondéré de ce fournisseur/modèle dans `scoreAutoTargets`, de sorte que les modèles
   dégradés sont progressivement moins privilégiés et retrouvent leur priorité à mesure que leur EWMA s’améliore.
5. **Comment Future AGI peut-il être intégré sans devenir une dépendance ?** Via l’interface
   `RoutingEventSink` / un futur adaptateur `Evaluator` — aucune dépendance codée en dur.
6. **Que se passe-t-il lorsque l’évaluateur est indisponible ?** Le routage n’est pas affecté ;
   la qualité revient à une valeur neutre (1.0) pour les modèles ne disposant d’aucun signal observé.
7. **Que se passe-t-il lorsque la télémétrie est indisponible ?** Le récepteur OTel n’est simplement pas
   enregistré ; le reste de la couche de routage continue de fonctionner sans modification.
8. **Que se passe-t-il en cas de surcharge ?** La mémoire tampon OTel supprime les événements les plus anciens ; la qualité
   et la mémoire tampon circulaire sont bornées par conception ; aucune contre-pression n’est appliquée.
9. **Comment l’état d’un fournisseur se rétablit-il après une dégradation ?** L’EWMA converge de nouveau à mesure que
   les succès s’accumulent ; la phase de préchauffage maintient les modèles froids dans un état neutre ; le disjoncteur
   se rétablit indépendamment au moyen de sondes HALF_OPEN.
10. **Quelles fonctionnalités proposées n’ont intentionnellement PAS été implémentées, et pourquoi ?**
    - Trafic fantôme / expérimentations — déjà implémentés
      (`combo/shadowRouting.ts`) ; aucune nouvelle implémentation.
    - Garde-fous — déjà implémentés (`src/lib/guardrails/`) ; aucune duplication.
    - Cache sémantique — déjà implémenté (`src/lib/semanticCache.ts`) ; aucune
      duplication.
    - Une plateforme complète de gestion des expérimentations, des outils de jeu de données, une plateforme d’optimisation
      des prompts, une base de données vectorielle ou une infrastructure OTel externe obligatoire — hors du
      périmètre d’un plan de données léger.
    - Une structure Rust `RoutingEvent` — le plan de données est en TypeScript ; le type TS
      constitue l’équivalent adapté.

## 8. Référence de configuration

| Variable                      | Valeur par défaut | Effet                                                                                               |
| ----------------------------- | ----------------- | --------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | non définie       | Lorsqu'elle est définie, active l'exportateur de traces OTLP/HTTP (p. ex. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | non définie       | Alias de secours pour le point de terminaison OTLP.                                                 |
| `OTEL_SERVICE_NAME`           | `omniroute`       | Attribut de ressource `service.name`.                                                               |

## 9. Tests

- `tests/unit/routing-events.test.ts` — normalisation des événements, classification
  des statuts, tampon circulaire borné, diffusion vers les récepteurs + isolation.
- `tests/unit/routing-quality.test.ts` — préchauffage EWMA, récupération après échec/succès,
  pénalités d'anomalie, gestion transitoire des erreurs 429, instantané, réinitialisation.
- `tests/unit/routing-scoring-quality.test.ts` — intégrité des pondérations, valeur par
  défaut neutre, classement selon le facteur de qualité.
- `tests/unit/routing-otel.test.ts` — contrôle de l'activation, charge utile des spans GenAI, vidage
  asynchrone, abandon en cas de surcharge.
- `tests/unit/routing-events-concurrency.test.ts` — milliers d'événements, capacité
  bornée du tampon circulaire, isolation des récepteurs levant des exceptions, rafales asynchrones entrelacées,
  réinitialisation pendant les insertions.
- `tests/unit/routing-adaptive-e2e.test.ts` — boucle déterministe de bout en bout via
  le véritable moteur de notation `scoreAutoTargets` : sain → dégradation → récupération → incident passager, ainsi que
  des scénarios de démarrage à froid et de fournisseur froid chanceux.
- `tests/unit/stream-timing.test.ts` — TTFT (premier fragment transféré), ITL,
  premier octet par rapport au premier transfert, interruption, gestion sûre des fragments malformés/vides.

## 10. État des problèmes préexistants (Phase 18)

| Problème                                                         | État                          | Remarques                                                                                                                                                                                                                                                                                      |
| ---------------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Incohérence d'export de `omniglyph`                              | **CORRIGÉ (environnemental)** | `node_modules` n'était pas synchronisé avec `package-lock.json` (version 1.3.1 installée contre 1.4.0 verrouillée). L'exécution de `npm install omniglyph@1.4.0` a restauré la version verrouillée ; le nombre d'erreurs de typage est passé à 0. Manifestes inchangés.                        |
| Tests `getKnownContextOverflow` obsolètes                        | **CONNU — non corrigé**       | `combo-context-overflow-compression-probe.test.ts` importe une fonction qui n'existe plus dans `open-sse/services/combo.ts` (seuls des commentaires y font référence). La correction nécessite de réimplémenter la fonction ou de réécrire ces tests — remaniement architectural sans rapport. |
| Isolation de la BD dans `combo-runtime-unit-concurrency.test.ts` | **CONNU — non corrigé**       | L'assertion d'isolation SQLite du banc de test échoue lors d'une exécution directe ; elle échoue de manière identique sur la branche de base.                                                                                                                                                  |
| Dérive i18n de `llm.txt`                                         | **CONNU — non corrigé**       | Les fichiers `docs/i18n/*/llm.txt` diffèrent de celui à la racine ; problème préexistant qui bloque le contrôle de synchronisation de la documentation avant commit.                                                                                                                           |

Les problèmes environnementaux et les problèmes de code sont maintenus séparés ; aucun échec sans rapport n'est masqué
par des filtres de test modifiés.
