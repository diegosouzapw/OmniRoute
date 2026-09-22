# Compression Engines (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

La compression d’OmniRoute repose sur des contrats de moteur. Un mode peut exécuter directement un moteur
(`caveman` ou `rtk`) ou un pipeline empilé déterministe qui exécute plusieurs moteurs dans l’ordre.

## Modes

| Mode         | Parcours du moteur                        | Entrée prévue                                                 |
| ------------ | ----------------------------------------- | ------------------------------------------------------------- |
| `off`        | aucun                                     | Conservation exacte du prompt                                 |
| `lite`       | Assistants légers Caveman                 | Nettoyage permanent à faible risque                           |
| `standard`   | Caveman                                   | Condensation des prompts en langage naturel                   |
| `aggressive` | Caveman + résumeurs d’historique/d’outils | Longues sessions de discussion                                |
| `ultra`      | Caveman + assistants d’élagage            | Récupération après atteinte de la limite de contexte          |
| `rtk`        | RTK                                       | Sorties de terminal, shell, build, test et git                |
| `omniglyph`  | OmniGlyph                                 | Contexte sous forme d’image sur le canal natif du fournisseur |
| `stacked`    | Pipeline, par défaut `rtk -> caveman`     | Journaux d’outils et prose mixtes, économies maximales        |

### Profils de compression OmniGlyph

Le moteur `omniglyph` (package `omniglyph`, 1.4.0+) accepte un profil sémantique nommé, défini
globalement via `omniglyph.profile` dans les paramètres de compression ou pour chaque étape via la
configuration d’étape du pipeline empilé :

| Profil        | Périmètre                                                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Par défaut. Politique mesurée par les résultats publiés — convertit en images le système, la documentation des outils et l’historique dense        |
| `balanced`    | Conserve l’état actif au format natif, protège les 8 derniers tours et condense l’ancien historique clos                                           |
| `coding-safe` | Conserve au format natif les instructions faisant autorité, les schémas d’outils et les sorties d’outils actives, et protège les 12 derniers tours |
| `passthrough` | Achemine sans transformation ; le moteur est ignoré                                                                                                |

Le profil est un **plafond, pas un plancher** : `mergeCompressionProfileOptions` dans le package
empêche une redéfinition par l’appelant de rouvrir une voie de compression avec perte que le profil a fermée. Ainsi, une valeur
`preserveSystemPrompt: false` propre à une étape ne peut pas réactiver la compression du système avec `coding-safe`.

Mesure effectuée sur cette base de code : `coding-safe` et `balanced` portent `minCompressChars` à sa
valeur maximale et conservent au format natif le système, les schémas d’outils et les résultats d’outils. Ainsi, une session qui n’a pas
encore accumulé d’historique s’arrête à `below_min_chars` et le moteur ne transforme rien. C’est
pourquoi la valeur par défaut est `aggressive` plutôt que le profil le plus sûr.

Le package détermine lui-même la portée de son modèle et son profil à partir de sa configuration d’environnement.
OmniRoute ne délègue jamais cette décision : l’adaptateur fixe le contrôle du modèle à la portée
la plus restrictive du package. Les paramètres de l’environnement hôte peuvent donc uniquement réduire la liste d’autorisation, sans jamais
l’élargir au-delà des résultats mesurés par OmniRoute.

## Registre des moteurs

Le registre se trouve dans `open-sse/services/compression/engines/registry.ts`. Les moteurs exposent un
contrat commun :

- `id` : identifiant stable du moteur, tel que `caveman` ou `rtk`
- `apply(text, config)` : chemin d’exécution historique utilisé par les pipelines empilés
- `compress(input, config)` : chemin d’exécution principal renvoyant le texte et les statistiques
- `getConfigSchema()` : renvoie la structure de type JSON Schema de la configuration valide
- `validateConfig(config)` : renvoie `{ valid, errors[] }`

L’enregistrement utilise `registerCompressionEngine(engine)` (ou `registerEngine` pour les cas avancés),
qui appelle `assertValidEngine()` et `validateConfig(defaultConfig)` avant d’accepter le moteur.
Utilisez `unregisterCompressionEngine(id)` pour supprimer un moteur lors de l’exécution.

`strategySelector.ts` enregistre les moteurs intégrés avant l’exécution de la compression. Cela permet à la prévisualisation,
à la compression lors de l’exécution, au mode empilé, aux tests et aux futurs moteurs d’utiliser le même chemin d’exécution.

### Compression des descriptions MCP (connexe)

Un registre distinct compresse les métadonnées de description des outils MCP au niveau du registre — voir
`open-sse/mcp-server/descriptionCompressor.ts` et [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Il réutilise
les règles Caveman, mais opère sur les métadonnées des outils, et non sur les charges utiles des requêtes.

### Moteurs intégrés supplémentaires

Outre Caveman, RTK et LLMLingua-2, le registre fournit plusieurs moteurs spécialisés sans perte /
structurels (utilisés par les pipelines empilés, le playground et les tests) :

| Moteur        | Id              | Fonctionnement                                                                                                                                                                                                                      |
| ------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4) : remplace les grands blocs de texte contigus par des références adressées par leur contenu, afin que les blocs répétés/volumineux ne soient envoyés qu’une seule fois puis référencés par la suite. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5) : compactage tabulaire sans perte des charges utiles constituées de tableaux JSON homogènes sous une forme en colonnes `[N rows]`.                                                                           |
| ionizer       | `ionizer`       | Échantillonnage des lignes du début, du milieu et de la fin pour les très grands blocs homogènes, avec stockage de la partie centrale omise sous la forme d’une référence CCR adressée par son contenu.                             |
| session-dedup | `session-dedup` | Déduplication inter-tours adressée par le contenu (inspirée de TokenMizer) : omet le texte déjà rencontré lors de tours précédents de la même session.                                                                              |

**Instruction du protocole de récupération CCR (#8033) :** la première fois que CCR remplace ≥1 bloc dans une
requête, le moteur ajoute au début un unique message `system` idempotent (commençant par la
sentinelle `[CCR protocol]`) qui explique à l’appelant le contrat marqueur → outil : ce que signifie un
marqueur `[CCR retrieve hash=<24hex> chars=N]`, que le hash doit être copié à l’identique
(les 24 caractères hexadécimaux — les hash mal copiés sont la cause probable des erreurs
« bloc introuvable »), et qu’un marqueur `[dedup:ref sha=...]` signifie « consulter l’historique », et non « appeler
l’outil ». La note est injectée **uniquement lorsque les `tools[]` déclarés par l’appelant prouvent qu’il peut
réellement accéder à `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` dans
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — un appelant simplement
compatible avec OpenAI ne disposant pas de cet outil ne reçoit jamais d’instruction lui demandant d’appeler quelque chose
auquel il ne peut pas accéder. L’idempotence est assurée en recherchant la sentinelle dans l’historique des messages
avant l’injection, afin que les requêtes multi-tours (qui rejouent les messages précédents) n’empilent pas la
note à chaque tour.

## Caveman

Le mode Caveman se concentre sur la condensation sémantique du texte courant :

- préserve les blocs de code, les URL, le JSON, les chemins et les données structurées
- supprime le remplissage, les formulations hésitantes, le contexte répété et les transitions inutilement verbeuses
- prend en charge les ensembles de règles propres à chaque langage dans `open-sse/services/compression/rules/`
- reste disponible via les anciens modes `standard`, `aggressive` et `ultra`

L’interface correspondante dans le tableau de bord est `Dashboard -> Context & Cache -> Caveman`.

Le projet Caveman en amont annonce une réduction de `~75%` des jetons de sortie, une économie moyenne de `65%` sur les sorties dans les benchmarks, avec une plage de `22-87%`, ainsi qu’un outil offrant une compression des entrées de `~46%`. OmniRoute utilise le chiffre de Caveman relatif aux entrées lorsqu’il documente les économies cumulées sur les invites et le contexte ; le mode de sortie de Caveman reste une fonctionnalité distincte concernant le comportement des réponses.

## RTK

Le mode RTK se concentre sur la sortie des commandes et des outils :

- détecte des catégories de sorties telles que `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest, les tests Cargo/Go, les builds TypeScript/Vite/Webpack, ESLint, les audits/installations npm, les journaux Docker, les commandes shell `find`/`grep`, les traces de pile et les journaux génériques
- applique 49 filtres JSON provenant de `open-sse/services/compression/engines/rtk/filters/`
- prend en charge le pipeline déclaratif de style RTK : suppression des séquences ANSI, remplacement, court-circuit selon la correspondance de la sortie, suppression/conservation de lignes, troncature par ligne, troncature en tête/fin ou selon un nombre maximal de lignes, et valeur de repli en cas de résultat vide
- prend en charge les filtres de projet soumis à approbation dans `.rtk/filters.json` et les filtres globaux dans `DATA_DIR/rtk/filters.json`
- supprime les séquences ANSI, les informations de progression superflues, les lignes répétées et le texte standard inutile
- préserve les échecs exploitables, les avertissements, les résumés, les fichiers modifiés et le contexte de fin
- peut éventuellement conserver une version expurgée de la sortie brute à des fins de récupération ou de débogage par l’intermédiaire de routes de gestion authentifiées

L’interface correspondante dans le tableau de bord est `Dashboard -> Context & Cache -> RTK`.

Les détails opérationnels concernant les filtres personnalisés, l’approbation, la vérification et la récupération de la sortie brute figurent dans [`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

Le projet RTK en amont annonce des économies de `60-90%` pour la compression des sorties de commandes. L’exemple de son README montre une session Claude Code de 30 minutes passant de `~118,000` jetons à `~23,900`, soit une économie de `79.7%`.

## LLMLingua-2 (Élagage sémantique)

Le mode LLMLingua-2 effectue un **élagage sémantique des jetons** dans le texte à l’aide d’un petit classificateur de jetons ONNX, en complément des moteurs Caveman et RTK fondés sur des règles :

- compresse uniquement le texte des messages non système ; les blocs de code délimités et les autres structures préservées ne sont jamais modifiés
- exécute le backend `@atjsh/llmlingua-2` (ONNX via `@huggingface/transformers`) dans un thread de travail, afin que l’inférence du modèle ne bloque jamais la boucle d’événements de la requête
- est **composable** (`stackPriority` 35) : dans un pipeline cumulé, il s’exécute après les moteurs structurels (CCR, session-dedup, headroom, Caveman), mais avant `ultra`, car l’élagage sémantique est plus efficace sur un texte ayant déjà fait l’objet d’une compression structurelle — par exemple `rtk -> caveman -> llmlingua`
- **échoue de manière ouverte en cas d’erreur quelconque** (dépendances facultatives manquantes, lancement du worker, chargement du modèle, inférence ou délai dépassé) → le texte d’origine est renvoyé sans modification, jamais une erreur

Emplacement du moteur : `open-sse/services/compression/engines/llmlingua/`. L’interface correspondante dans le tableau de bord est `Dashboard -> Context & Cache -> LLMLingua`.

### Modèles

Le modèle par défaut est **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB, rapide). Un modèle **BERT-base** offrant une précision supérieure (`Arcoldd/llmlingua4j-bert-base-onnx`, ~710 MB) est disponible via le champ `model` de la configuration du moteur. Lors du premier appel, `@huggingface/transformers` télécharge à la demande le modèle sélectionné depuis le Hub HuggingFace vers `${DATA_DIR}/models/llmlingua` (`modelStore.ts`) ; une valeur de configuration `modelPath` permet plutôt de pointer vers une copie locale (pour les installations hors ligne ou isolées).

### Dépendances facultatives et installation à la demande

La pile de dépendances homologues de l’environnement d’exécution LLMLingua pouvant être élaguée est **facultative**. Deux packages sont déclarés comme `optionalDependencies` dans `package.json` et restent **externes** au build de production (`scripts/build/prepublish.ts` ne les regroupe pas) :

| Package              | Version (fixée) | Remarques                                              |
| -------------------- | --------------- | ------------------------------------------------------ |
| `@atjsh/llmlingua-2` | `2.0.5`         | Package d’entrée ; déclare les autres comme homologues |
| `js-tiktoken`        | `^1.0.20`       | Tokeniseur                                             |

`@huggingface/transformers` est fixé à `^4.2.0` (partagé avec le chemin des embeddings locaux et également intégré par traçage au bundle autonome) ; `@atjsh/llmlingua-2@2.0.5` le déclare comme dépendance homologue avec `"^3.5.2 || ^4.0.0"`, de sorte que les versions v3 et v4 de Transformers.js sont toutes deux prises en charge. Depuis la version 2.0.4, `@atjsh/llmlingua-2` ne nécessite plus `@tensorflow/tfjs`, ce qui a supprimé de la pile SLM son principal contributeur individuel en taille (TensorFlow.js). Seuls les deux packages ci-dessus sont des dépendances homologues SLM pouvant être élaguées. Une commande `npm install` standard (développement) installe automatiquement la pile facultative, sauf si les dépendances facultatives sont omises.

**Pourquoi une installation à la demande :** le package publié sur npm, le bundle autonome et l’image Docker sont fournis **sans** ces dépendances afin de rester légers. Lorsqu’elles sont absentes, le contrôle des dépendances du worker (une tentative de résolution de `@atjsh/llmlingua-2` dans `worker.ts`) échoue et le moteur **échoue silencieusement de manière ouverte** — sélectionner LLMLingua devient une opération sans effet (le texte est renvoyé sans modification et aucune erreur n’est journalisée). Pour l’activer dans un environnement élagué, installez la pile facultative :

```bash
# fixer les versions à celles déclarées dans optionalDependencies de package.json
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

La suppression de `@tensorflow/tfjs` (2.0.4+) élimine l’élément auparavant dominant d’environ 800 MB — l’empreinte restante correspond aux environnements d’exécution transformers.js + onnxruntime-node, auxquels s’ajoute le modèle TinyBERT (~57 MB), téléchargé lors de la première utilisation (et non via npm).

Selon l’environnement :

- **Développement / `npm install`** — installé automatiquement, sauf si vous avez spécifié `--omit=optional`
  (ou `--no-optional`). Aucune action requise.
- **npm global (`npm i -g omniroute`) / autonome** — exécutez la commande d’installation ci-dessus dans
  le répertoire du package installé, ou réinstallez-le sans omettre les dépendances facultatives.
- **Docker** — ajoutez la commande d’installation dans une couche d’image dérivée ; l’image publiée
  est volontairement allégée.
- **VPS (PM2)** — effectuez l’installation dans le répertoire `node_modules` de l’application, puis redémarrez le processus afin que le
  worker sonde à nouveau le mécanisme de contrôle.
- **Version autonome Next brute (`npm run build` → `.build/next/standalone/server.js`)** — la
  trace autonome n’inclut NI le worker NI les dépendances facultatives ; le moteur passe donc silencieusement
  en mode ouvert. `scripts/build/colocate-standalone.mjs` réapplique les deux (worker esbuild +
  fermeture des dépendances facultatives dans l’arborescence autonome) ; ce script s’exécute automatiquement via le hook npm
  `postbuild` après chaque build. Idempotent, avec échec non bloquant lorsque les dépendances sont absentes.

**Vérifiez qu’il est actif :** lorsque LLMLingua est sélectionné, le texte réel est effectivement raccourci (le moteur
ne passe plus en mode ouvert) et la première requête déclenche le téléchargement du modèle dans
`${DATA_DIR}/models/llmlingua`. Le mécanisme de contrôle ne sonde volontairement que `@atjsh/llmlingua-2` —
les autres packages pairs sont exclusivement ESM et `require.resolve` lève une exception pour ceux-ci même lorsqu’ils sont présents — de sorte que
le worker passe toujours en mode ouvert si un package pair est réellement absent au moment de `import()`.

## Pipelines empilés

Le mode empilé exécute les étapes du pipeline dans l’ordre. Par défaut :

```txt
rtk -> caveman
```

Utilisez ce mode pour les sessions d’agents de codage dans lesquelles une invite combine la sortie de commandes avec du texte rédigé par un humain ou un assistant. RTK réduit d’abord les journaux d’outils trop verbeux, puis Caveman compresse le langage naturel restant.

Les étapes du pipeline sont configurées avec `stackedPipeline` dans les paramètres de compression ou au moyen de combinaisons de compression.

Lorsque les deux moteurs réduisent la même charge utile admissible, les économies se cumulent :

```txt
combiné = 1 - (1 - économies RTK) * (1 - économies de Caveman sur l’entrée)
moyenne = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
plage   = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Filtre d’arbre d’accessibilité MCP

Le filtre intelligent d’arbre d’accessibilité MCP est une couche de compression post-exécution qui s’applique aux **résultats d’outils** MCP, et non aux invites ou au contexte. Il cible les charges utiles volumineuses d’arbres d’accessibilité et d’instantanés de navigateur renvoyées par des outils tels que Playwright, computer-use et les serveurs MCP d’automatisation de navigateur.

### Fonctionnement

1. **Suppression du bruit** — supprime les entrées génériques/textuelles vides (`- generic:`, `- text: ""`)
2. **Regroupement des éléments adjacents** — lorsque ≥ `collapseThreshold` (30 par défaut) lignes consécutives sont des répétitions structurelles, les regroupe en conservant les `collapseKeepHead` premières lignes (10 par défaut), suivies d’un récapitulatif du nombre de lignes, puis des `collapseKeepTail` dernières lignes (5 par défaut)
3. **Préservation des références** — les ancres `[ref=eXX]` requises par Playwright/computer-use ne sont jamais modifiées
4. **Troncation stricte** — si le texte après regroupement dépasse encore `maxTextChars` (50 000 par défaut), le tronque en ajoutant une indication de navigation afin que l’agent puisse poursuivre son travail

### Emplacement du moteur

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← point d’entrée smartFilterText()
  collapseRepeated.ts ← algorithme de regroupement des éléments adjacents
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Configuration

Contrôlé par `compression.mcpAccessibility` dans les paramètres globaux (migration 056). Configuration par défaut :

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

Le filtre est appliqué uniquement aux charges utiles de résultats d’outils dont le `type` est `"text"` et dont la longueur dépasse `minLengthToProcess`. Il n’affecte ni la compression des invites ni les charges utiles des requêtes.

### Économies attendues

60 à 80 % sur les résultats d’outils contenant des instantanés de navigateur, selon la complexité de la page. L’algorithme de regroupement est en O(n) par rapport au nombre de lignes et ajoute une latence négligeable.

### Comparaison entre ce filtre et les moteurs de compression ci-dessus

| Aspect              | Caveman / RTK / Stacked          | Filtre d’accessibilité MCP             |
| ------------------- | -------------------------------- | -------------------------------------- |
| Cible               | Invites / contexte des requêtes  | Résultats d’outils MCP                 |
| Déclencheur         | Paramètre du mode de compression | `compression.mcpAccessibility.enabled` |
| Portée              | Tous les messages SSE            | Résultats d’outils uniquement          |
| Ancres de référence | S/O                              | Préservées sans condition              |

---

## Combinaisons de compression

Les combinaisons de compression sont des profils de compression nommés qui peuvent être attribués à des combinaisons de routage :

- `compression_combos` : stocke le mode, le pipeline, la configuration RTK, la configuration linguistique et l’indicateur par défaut
- `compression_combo_assignments` : associe une combinaison de compression à une combinaison de routage
- l’intégration à l’exécution résout une combinaison de compression attribuée avant les substitutions génériques de combinaison
- les données analytiques incluent `compression_combo_id` et `engine`

Interface du tableau de bord : `Tableau de bord -> Contexte et cache -> Combinaisons de compression`.

## Surface de l’API

| Route                                  | Objectif                                                                       |
| -------------------------------------- | ------------------------------------------------------------------------------ |
| `/api/settings/compression`            | Paramètres globaux de compression (inclut la configuration `mcpAccessibility`) |
| `/api/compression/preview`             | Prévisualiser n’importe quel mode de compression                               |
| `/api/compression/language-packs`      | Répertorier les packs linguistiques Caveman disponibles                        |
| `/api/context/caveman/config`          | Alias des paramètres Caveman                                                   |
| `/api/context/rtk/config`              | Valeurs par défaut et paramètres RTK                                           |
| `/api/context/rtk/filters`             | Catalogue de filtres RTK                                                       |
| `/api/context/rtk/test`                | Point de terminaison de prévisualisation/test RTK                              |
| `/api/context/rtk/raw-output/[id]`     | Récupération authentifiée de la sortie brute expurgée                          |
| `/api/context/combos`                  | Opérations CRUD sur les combinaisons de compression                            |
| `/api/context/combos/[id]/assignments` | Opérations CRUD sur les attributions aux combinaisons de routage               |
| `/api/context/analytics`               | Alias des données analytiques de compression                                   |

Les routes de gestion nécessitent une authentification de gestion ou des contrôles de stratégie par clé d’API.

## Outils MCP

La compression expose cinq outils MCP :

| Outil                               | Portée              | Objectif                                                 |
| ----------------------------------- | ------------------- | -------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Paramètres, données analytiques, statistiques du cache   |
| `omniroute_compression_configure`   | `write:compression` | Mettre à jour les paramètres globaux                     |
| `omniroute_set_compression_engine`  | `write:compression` | Définir le mode et le pipeline facultatif                |
| `omniroute_list_compression_combos` | `read:compression`  | Répertorier les combinaisons de compression              |
| `omniroute_compression_combo_stats` | `read:compression`  | Consulter les données analytiques par combinaison/moteur |

## Périmètre et exclusions

**Les embeddings ne sont jamais compressés.** `open-sse/handlers/embeddings.ts` n’appelle jamais de
moteur de compression — les corps des requêtes/réponses sont transmis directement à l’exécuteur sans modification.
Cette séparation est actuellement structurelle (les embeddings et les complétions de chat utilisent des gestionnaires distincts), et non un
contrôle à l’exécution, mais cela signifie que le problème de distorsion vectorielle décrit dans #8034 n’a aucune surface d’exposition
dans le chemin des embeddings.

**Filtre d’exclusion par modèle/point de terminaison (#8034).** Pour les complétions de chat, un opérateur peut désigner
des identifiants de modèle/cibles `provider/model` qui ne doivent jamais être compressés — une mesure de protection utile si
la compression est ultérieurement intégrée plus près d’un chemin adjacent aux embeddings, et généralement utile
pour tout modèle dont l’invite doit rester strictement identique octet par octet (évaluations déterministes, préfixes
sensibles au cache, etc.).

- Champ de paramétrage : `exclusions?: string[]` dans la configuration globale de compression
  (`GET`/`PUT /api/settings/compression`), persisté via l’espace de noms de compression `key_value` existant
  (`src/lib/db/compression.ts`) — aucune nouvelle table.
- Onglet du tableau de bord : **Tableau de bord → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Syntaxe des motifs : `*` est le seul caractère générique. Tous les autres métacaractères d’expression régulière d’un motif sont
  échappés avant la recherche de correspondance, de sorte que `gpt-5.6` correspond uniquement à la chaîne littérale, jamais à `gpt-5x6`
  (sans risque de ReDoS, borné, sans quantificateurs imbriqués). Les motifs sont comparés sans tenir compte de la casse
  à la fois à l’identifiant de modèle seul et à la valeur composite `provider/model` — `gpt-5-6`, `openai/gpt-5-6`,
  et `openai/*` fonctionnent tous, et `*` seul exclut tous les modèles.
- Correspondance : `isCompressionExcluded()` / `normalizeCompressionExclusions()` dans
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` vérifie la cible exclue
  immédiatement après avoir résolu les paramètres de compression, **avant l’exécution de tout moteur**, et traite une correspondance
  exactement comme si la compression était désactivée globalement — le corps de la requête est de manière démontrable
  identique octet par octet. L’omission est enregistrée via `writeCompressionSkip(..., "excluded")` afin d’être
  visible dans les données analytiques.
- Valeur par défaut (liste vide/absente) : comportement identique à celui précédant #8034 — rien n’est exclu.

## Limitations connues

- **LLMLingua-2 (SLM) nécessite que les dépendances optionnelles soient colocalisées.** Le worker ne fonctionne dans une
  build de production que lorsque `@atjsh/llmlingua-2` et ses dépendances homologues sont colocalisés dans
  `dist/node_modules` (voir `scripts/build/colocateOptionals.mjs`, #4286). Sans eux, le
  moteur échoue en mode ouvert (il renvoie le texte d’origine). La résolution du worker ne dépend plus de
  `import.meta.url` (qui échoue dans le bundle autonome) — elle s’appuie sur le
  cwd d’exécution / `argv[1]`.
- **Les packs linguistiques Caveman `de` / `fr` / `ja` sont partiels.** Ils fournissent des règles
  `context` + `filler` + `structural`, mais aucun pack `dedup` / `ultra` ; l’intensité `ultra`
  n’est donc pas supérieure à `full` pour ces langues (elles utilisent uniquement leurs propres règles — il n’existe aucun
  repli silencieux vers les règles anglaises `dedup`/`ultra`, qui déformeraient le texte en langue étrangère).
  Les packs `en` / `es` / `id` / `pt-BR` sont complets. Les contributions de fichiers `dedup.json` + `ultra.json`
  pour les packs partiels sont les bienvenues.
- **La télémétrie empilée répertorie uniquement les moteurs ayant effectué une compression.** Une étape d’un pipeline empilé dont le
  moteur s’est exécuté, mais n’a produit aucun gain, renvoie `stats:null` et n’apparaît donc pas dans
  `engineBreakdown` — ce qui la rend impossible à distinguer d’une étape ignorée. Distinguer
  « exécutée, 0 % » de « ignorée » nécessiterait une modification du modèle de ventilation et est reporté.

## Validation

Les contrôles ciblés pour cette partie sont les suivants :

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
