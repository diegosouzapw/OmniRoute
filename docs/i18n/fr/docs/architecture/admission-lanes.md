# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute dispose de **deux** systèmes locaux au processus pour les files, avec des portées différentes. Ils sont
complémentaires ; les opérateurs doivent savoir lequel ils consultent.

## 1. Admission globale au processus au niveau des octets (`chatBodyAdmission.ts`)

- **Portée :** le chemin corps mis en mémoire tampon/tas pour `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` et les autres routes de type chat. Protège
  contre l'amplification du tas provoquée par les corps volumineux des agents de
  programmation (#4380).
- **Un contrôleur global unique par processus, et non des files par clé (#10110).**
  Chaque clé API (hachée) ou session `anonymous` est admise selon le **même**
  budget partagé — l'identifiant de session haché sert UNIQUEMENT de clé de
  planification équitable (distribution à tour de rôle entre les requêtes en
  attente), jamais de partition de capacité. Une version antérieure de ce
  document décrivait des files par clé dotées de capacités indépendantes ; ce
  modèle a été supprimé dans #10110, car il permettait à de faux identifiants
  non authentifiés de multiplier la limite globale du processus.
- **Barrière (#503-fanout) : un budget d'ingestion en OCTETS calculé
  automatiquement, et non un nombre fixe de requêtes.** L'ancienne limite du
  nombre de requêtes `CHAT_MAX_HEAVY_IN_FLIGHT` (valeur par défaut `1` avant ce
  correctif) réduisait le fan-out des agents de programmation (plusieurs
  sous-agents/CLI, avec des corps dépassant couramment 256 KB) à une concurrence
  effective d'environ 1, ce qui provoquait des erreurs 503 sous une charge tout
  à fait normale. Elle n'est désormais contraignante que lorsqu'un opérateur
  définit explicitement `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Lorsqu'elle n'est
  pas définie, l'admission est plutôt contrôlée par
  `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — un budget calculé automatiquement à
  partir de la limite mémoire réelle du processus
  (`src/shared/middleware/admissionBudget.ts`) : 25 % de la plus restrictive
  entre la limite du tas V8 et toute limite de cgroup/conteneur, divisés par un
  facteur d'amplification transitoire de 8x, puis bornés entre 8 MiB et 2 GiB.
  Les remplacements explicites utilisent les mêmes bornes. Ce budget s'adapte
  automatiquement d'un conteneur de 512 MB à un ordinateur de bureau de 32 GB,
  sans ajustement des variables d'environnement. Un corps qui ne peut pas tenir
  dans le budget effectif échoue immédiatement avec `413 body_exceeds_budget` ;
  seule la contention entre des corps individuellement admissibles entre dans
  la file d'attente bornée et équitable. Un système actif de suivi de la
  pression sur les ressources à signaux multiples (ratio du tas V8, cgroup,
  PSI, événements OOM — `open-sse/utils/resourcePressurePolicy.ts`) réduit
  l'attente bornée sous une pression `high` et déleste immédiatement avec
  `503 resource_pressure` sous une pression `critical`, avant même l'ingestion
  du moindre octet. PSI est lu depuis `memory.pressure` du cgroup de cette unité
  lorsqu'il est disponible (`open-sse/utils/resourcePressureSampler.ts`) ;
  `/proc/pressure/memory` concerne l'ensemble de l'hôte et n'est utilisé qu'en
  secours sur une machine physique / avec cgroup v1, afin qu'un hôte utilisant
  l'espace d'échange ne puisse pas provoquer une erreur 503 dans un conteneur
  inactif.
- **Réglage :**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — remplacement du budget en octets calculé automatiquement
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — ancienne limite du nombre de requêtes, activée uniquement sur demande
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — attente dans la file avant une erreur 503 (valeur par défaut : 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — soupape du tas pour les octets en file d'attente (valeur par défaut : 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — obsolètes
    et sans effet depuis #10110 (acceptées pour la compatibilité de la configuration, ignorées)
- **Rapports :** `GET /api/monitoring/health` → `chatAdmission` (#11244) — notamment
  les ajouts de #503-fanout `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` et `countCapEnabled`
  (false sur un déploiement par défaut — confirme que le budget en octets, et
  non l'ancienne limite du nombre de requêtes, est effectivement contraignant).

## 2. Voies virtuelles adaptatives à l’exécution (`open-sse/services/admission`)

- **Périmètre :** admission par clé de locataire pour la répartition vers les fournisseurs — coût de la file d’attente, adaptation des limites guidée par la latence, mise en file d’attente par voie et métriques des voies.
- **Activation :** **facultative.** Désactivée sauf si `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Sans cette option, le contrôleur adaptatif conserve le comportement de file d’attente partagée (le critère 1 de #9654 n’est satisfait qu’une fois les voies activées par un opérateur).
- **Réglage :** `OMNIROUTE_CHAT_VIRTUAL_LANES` + configuration adaptative (`maxQueueCount`, `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Rapports :** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`, `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (identifiants de voie opaques, jamais les clés brutes) et `virtualLanes` — l’indicateur faisant autorité dans l’instantané pour confirmer que les voies sont activées.

## 3. Sondes de fan-out — admission par cible pour combo/fusion (#9654 Vague 2)

Combo (priorité / round-robin) et fusion répartissent N cibles de modèle sous une même requête parente. Depuis la Vague 2 de #9654, **chaque cible de fan-out est soumise à un contrôle d’admission avant sa répartition** par une sonde par cible (`PerTargetAdmissionHook`, construite par `createPerTargetAdmissionHook`) appliquée à la voie du locataire de la requête **parente**.

- **Périmètre :** chaque cible de fan-out répartie par combo, fusion et le moteur de chaos. Le système 1 (au niveau des octets) n’est pas affecté — il ne sonde jamais les cibles de fan-out.
- **Activation :** **facultative avec le système 2.** Sans effet lorsque `OMNIROUTE_CHAT_VIRTUAL_LANES` n’est pas défini — dans ce mode, la requête parente détient déjà le bail de la file d’attente partagée ; effectuer une sonde entraînerait donc un double comptage et le rejet des cibles combo.
- **Sémantique :**
  - **Strictement non bloquante — ignorer, ne jamais mettre en file d’attente.** `maxWaitMs 0` : une voie pleine entraîne l’ignorance de la cible, puis le mécanisme de repli de combo (ou le panel de survivants de fusion) prend le relais. Ce comportement est délibéré : une cible de fan-out constitue un travail redondant, et sa mise en file d’attente ajouterait davantage de charge aux voies congestionnées que ce mécanisme vise précisément à protéger. `defaultMaxWaitMs` ne s’applique donc qu’à la **requête parente** ; les sondes de fan-out n’attendent jamais et il n’existe intentionnellement **aucun paramètre** permettant de les faire attendre (l’historique du ticket montre que les paramètres d’attente ont produit la catégorie d’erreurs 502/504 massives que #9654 vise à empêcher — à réexaminer uniquement si un opérateur signale que l’omission de cibles de fan-out dégrade la qualité des réponses).
  - **Libération après admission.** Une sonde admise libère immédiatement son bail : il s’agit d’un contrôle de capacité, et non d’une réservation. Le bail de la requête parente couvre le fan-out ; conserver N baux supplémentaires gonflerait artificiellement le coût actif partagé et provoquerait le rejet d’autres locataires. Il s’agit d’un mécanisme au mieux, et non d’une réservation : la voie peut se remplir à nouveau entre la sonde et la répartition. En cas de forte concurrence, le contrôle peut donc autoriser l’accès à une voie redevenue pleine au moment où la cible est répartie.
  - **Tarification basée sur le corps réel du fan-out.** La sonde estime le coût à partir du corps réel de la cible — y compris la classe de requête dérivée de son indicateur `stream`, exactement comme pour le chemin parent — afin que les membres du panel de fusion (`stream: false`) soient tarifés selon la classe non diffusée en continu qu’ils occuperont réellement, et les cibles priorité/RR selon ce que l’utilisateur a demandé.
- **Rapports :** l’omission d’une sonde après la première cible incrémente le `fallbackCount` par requête de combo (reflétant la sémantique de repli existante ; visible dans les journaux de combo) ; fusion renvoie 503 lorsque tous les membres du panel sont ignorés. Il n’existe actuellement **aucun compteur agrégé** (par exemple `virtualFanoutSkipped`) dans l’instantané — si un opérateur signale qu’il ne peut pas déterminer à quelle fréquence le contrôle des voies ignore des cibles de fan-out, cela constituera le déclencheur pour en ajouter un.

## Lequel apparaît dans un tableau de bord

- `adaptiveAdmission.laneCount` / `laneTenants` → **voies virtuelles adaptatives** (système 2).
- `adaptiveAdmission.virtualLanes === true` → les sondes en éventail de la section 3 sont
  également actives. Une charge utile où `virtualLanes` est absent ou vaut `false` signifie
  que `OMNIROUTE_CHAT_VIRTUAL_LANES` n’est pas défini — les voies au niveau des octets
  (système 1) restent actives, mais rien sous `adaptiveAdmission` (ni aucun contrôle
  d’admission en éventail) ne prend effet tant que cette option n’est pas activée.

## Pourquoi les deux existent

Les voies au niveau des octets limitent le chemin d’analyse/compression gourmand en mémoire ;
les voies adaptatives limitent le coût de répartition par locataire. Le critère 1 de #9654
(« la rafale d’une session ne provoque pas d’erreur 503 pour une autre ») est appliqué
systématiquement par le système 1, et par le système 2 une fois celui-ci activé explicitement.

## 4. `/v1/responses` long dans un seul processus (marge de capacité saine)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) a ajouté
`tryAcquireHealthyHeadroom` afin qu’une deuxième requête structurellement lourde soit admise
lorsque le tas se situe sous `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Le chemin BYTE
utilisé par `admitChatRequest` (corps ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
256 Kio par défaut, y compris `POST /v1/responses`) utilise le **même** mécanisme de dérogation.

Voici la recette **à processus unique** prise en charge pour exécuter plus de deux longues
connexions SSE `/v1/responses` simultanées : augmentez les limites principale et de marge de
capacité saine uniquement dans la mesure permise par le tas et par le budget d’octets en vol
à l’échelle du processus (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). La prise en charge
de dizaines de clients SSE de longue durée (40 à 50) relève de ce budget mémoire, et non
d’une limite stricte du produit à « 2 maximum ». Un tas sous pression continue à délester
la charge avec une erreur `503` réessayable afin que #7849 ne réapparaisse pas.

Pour **multiplier les tas**, exécutez N `DATA_DIR` indépendants (#11024). N’utilisez jamais
`replicas > 1` avec un seul fichier SQLite (#10350). Cette section ne remet pas en question
la recette de mise à l’échelle horizontale basée sur DATA_DIR.
