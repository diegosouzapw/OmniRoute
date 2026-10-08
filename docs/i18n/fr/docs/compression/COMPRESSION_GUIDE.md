# 🗜️ Prompt Compression Guide — OmniRoute (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Économisez automatiquement 15 à 95 % sur le contexte éligible. Pour un aperçu rapide, consultez la [section Compression du README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Présentation

OmniRoute implémente un pipeline modulaire de compression des prompts qui s’exécute **de manière proactive** avant que les requêtes n’atteignent les fournisseurs en amont. Vos économies de tokens sont donc réalisées de manière transparente, sans qu’aucune modification de votre flux de travail ne soit nécessaire.

```
Requête du client
  → Sélecteur de stratégie de compression
    → Remplacement défini par un combo ? → Utiliser le paramètre du combo
    → Seuil de déclenchement automatique atteint ? → Utiliser le mode automatique
    → Mode par défaut ? → Utiliser le paramètre global
    → Désactivé ? → Ignorer la compression
  → Mode de compression sélectionné
    → Désactivé : aucune compression
    → Léger : nettoyage sûr des espaces et de la mise en forme (~15 %)
    → Standard : suppression des éléments superflus dans un style télégraphique (~30 %)
    → Agressif : vieillissement de l’historique + résumé (~50 %)
    → Ultra : élagage heuristique + allègement des blocs de code (~75 %)
    → RTK : filtrage des sorties de terminal et d’outils tenant compte des commandes (plage en amont de 60 à 90 %)
    → Empilé : pipeline multi-moteur ordonné, généralement RTK puis Caveman (plage éligible de 78 à 95 %)
  → Requête compressée → Fournisseur
```

---

## Modes de compression

### Désactivé

Aucune compression n’est appliquée. Tous les messages sont transmis sans modification.

### Mode léger (~15 % d’économies, latence <1 ms)

Le mode le plus sûr — aucune modification sémantique, uniquement un nettoyage de la mise en forme :

| Technique                | Description                                                   |
| ------------------------ | ------------------------------------------------------------- |
| `collapseWhitespace`     | Fusionner les lignes vides consécutives et les espaces de fin |
| `dedupSystemPrompt`      | Supprimer les messages système en double                      |
| `compressToolResults`    | Compresser les sorties détaillées des outils/fonctions        |
| `removeRedundantContent` | Supprimer les instructions répétées                           |
| `replaceImageUrls`       | Raccourcir les URI de données d’images en base64              |

**Idéal pour :** une utilisation permanente et les flux de travail où la sécurité est critique.

### Mode standard (~30 % d’économies)

Inspiré de [Caveman](https://github.com/JuliusBrussee/caveman) — supprime les mots superflus et les formulations verbeuses tout en préservant le sens :

- Supprime les mots superflus (« please », « I think », « basically », « actually »)
- Condense les formulations verbeuses (« in order to » → « to », « as a result of » → « because »)
- Supprime les formules d’atténuation polies (« Would you mind... », « If you could possibly... »)
- Plus de 30 règles d’expressions régulières optimisées pour les prompts de programmation

**Idéal pour :** les flux de travail quotidiens de programmation et les équipes soucieuses des coûts.

### Mode agressif (~50 % d’économies)

Gestion intelligente de l’historique pour les longues sessions :

- **Vieillissement des messages** — les anciens messages sont progressivement compressés
- **Compression des résultats d’outils** — les longues sorties d’outils sont tronquées ou omises (premières/dernières lignes,
  filtrage des lignes correspondantes, compactage des clés JSON)
- **Protections de l’intégrité structurelle** — garantissent que les paires `tool_use` + `tool_result` restent cohérentes
- **Prise en compte de la fenêtre de contexte** — respecte les limites de tokens propres à chaque modèle

**Idéal pour :** les sessions de débogage prolongées et les grandes bases de code.

### Mode ultra (~75 % d’économies)

Compression maximale pour les scénarios où les tokens sont critiques :

- **Élagage heuristique** — élagage des tokens du texte en fonction d’un score
- **Préservation de la structure** — les blocs de code délimités, le code en ligne, les URL et les identifiants sont
  remplacés par des marqueurs, puis réinsérés à l’identique ; ils ne sont jamais élagués
- **Niveau SLM facultatif** — un petit modèle local peut affiner l’élagage lorsqu’il est configuré
- Indépendant du mode agressif : il n’exécute ni le vieillissement des messages, ni la compression des résultats d’outils,
  ni le mécanisme de résumé de secours (seul un échec du niveau SLM peut acheminer une passe de secours via le mode
  agressif)

**Idéal pour :** les situations où vous atteignez régulièrement les limites de contexte.

### Mode RTK (plage en amont de 60 à 90 %)

Le mode RTK est optimisé pour les sorties détaillées d’outils apparaissant dans les sessions d’agents de programmation :

- Détecte les classes de commandes/sorties telles que `git status`, `git diff`, `git log`, les exécuteurs de tests,
  les builds TypeScript/Vite/Webpack, ESLint/Biome/Prettier, les audits/installations npm, les journaux Docker, les sorties
  d’infrastructure et les sorties génériques du shell
- Applique les packs de filtres JSON provenant de `open-sse/services/compression/engines/rtk/filters/`
- Importe les filtres RTK conformes au schéma TOML v1 depuis les fichiers `filters.toml` du projet ou globaux, avec validation
  par tests intégrés et contrôle de confiance pour les fichiers du projet
- Inclut 55 filtres intégrés avec des exemples de vérification en ligne
- Supprime les séquences de contrôle ANSI, les barres de progression, les lignes répétées et les éléments non exploitables
- Préserve les échecs, les erreurs, les avertissements, les fichiers modifiés, les résumés et la fin des longues sorties
- Prend en charge les filtres de projet soumis à un contrôle de confiance, les filtres globaux et la récupération facultative
  des sorties brutes expurgées

**Idéal pour :** les sessions d’agents contenant des transcriptions de shell, de builds, de tests, de git, de grep et de sorties de fichiers.

### Mode empilé (plage éligible de 78 à 95 %)

Le mode empilé exécute plusieurs moteurs de compression dans un ordre déterministe. Le pipeline par défaut est :

```txt
RTK -> Caveman
```

Cet ordre compacte d’abord les sorties de terminal et d’outils, puis applique la condensation sémantique de Caveman
au reste du prompt en langage naturel. Les pipelines empilés peuvent être configurés globalement ou au moyen de
combos de compression affectés aux combos de routage.

**Idéal pour :** les contextes mixtes comprenant de volumineux journaux d’outils ainsi que des instructions humaines ou des résumés de l’assistant.

---

## Calcul des économies en amont

OmniRoute documente les économies liées à la compression à partir de deux sources : les benchmarks des projets en amont et
la propre composition de moteurs d’OmniRoute.

| Source  | Valeur du README en amont utilisée ici                                                                                                                       |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` de tokens de sortie en moins, `65%` d’économies moyennes sur les sorties du benchmark, plage de `22-87%` et outil de compression des entrées à `~46%` |
| RTK     | `60-90%` d’économies sur les sorties de commandes ; session d’exemple de `~118,000 -> ~23,900` tokens, soit `79.7%` économisés (`~80%`)                      |

Pour les charges utiles d’outils/de contexte qui se chevauchent, la combinaison OmniRoute par défaut empile les moteurs :

```txt
RTK -> Caveman
```

Les économies combinées sont multiplicatives et non additives :

```txt
combinées = 1 - (1 - économies RTK) * (1 - économies Caveman sur les entrées)
moyenne   = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
plage     = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Cette valeur de `78-95%` s’applique lorsque RTK et Caveman peuvent tous deux réduire la même charge utile d’entrée/de contexte.
Le mode de sortie des réponses Caveman est distinct : lorsqu’il est activé, utilisez les économies propres à Caveman sur les sorties (`65%`
en moyenne, chiffre mis en avant de `~75%`, plage de `22-87%`). Les économies totales sur la facturation dépendent de votre répartition entre prompts et sorties.

### Ce que signifie réellement « éligible »

La plage mise en avant de 15-95% est réelle, mais elle ne s’applique qu’au contenu **redondant ou verbeux** — lignes
d’erreur répétées, journal de build qui répète sans cesse le même avertissement, sortie `grep`/de lecture de fichier surdimensionnée. Cela ne
signifie **pas** que chaque requête permet d’économiser autant.

Vérifié empiriquement (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`) : une
exécution `stacked` (RTK + Caveman) sur un bloc `tool_result` au format Anthropic contenant 300 lignes
d’erreur identiques a produit **95.93% d’économies de tokens / 96.26% d’économies de caractères** — exactement dans la plage annoncée.
Mais le même pipeline exécuté sur une sortie d’outil normale et non redondante (une liste propre de correspondances `grep`,
une courte lecture de fichier, du texte conversationnel ordinaire) produit à juste titre des **économies proches de zéro**, car
il n’y a rien de répétitif à supprimer et `validateCompression()` (`validation.ts`) refuse de transmettre une
réécriture qui supprimerait ou modifierait des blocs de code, des URL, des titres, des versions ou des identifiants de constantes EN MAJUSCULES.

Il s’agit d’un comportement attendu et sûr, pas d’un bug : une session de codage qui consiste principalement à lire/parcourir avec grep des fichiers propres
constatera des économies totales modestes, même lorsque la compression est entièrement activée, tandis qu’une session confrontée à une boucle en échec
ou à un linter très bavard bénéficiera de la plage complète de 78-95% sur ce trafic. N’utilisez pas le faible
pourcentage d’économies agrégées d’une seule session comme preuve que la compression est mal configurée — vérifiez d’abord si la
sortie d’outil sous-jacente était réellement redondante.

---

## Visualisation des économies de tokens

```
Sans compression : 47K tokens envoyés au LLM
Avec Lite :         40K tokens envoyés          (15% économisés — sûr, toujours actif)
Avec Standard :     33K tokens envoyés          (30% économisés — règles caveman-speak)
Avec Aggressive :   24K tokens envoyés          (50% économisés — vieillissement + résumé)
Avec Ultra :        12K tokens envoyés          (75% économisés — élagage heuristique)
Avec RTK :          19K-5K tokens envoyés       (60-90% économisés sur les sorties de commandes/d’outils)
Avec Stacked :      10K-2.5K tokens envoyés     (plage éligible RTK+Caveman de 78-95%)
```

---

## Configuration

### Tableau de bord

Accédez à `Dashboard → Context & Cache` :

- **Caveman** — sélection du mode, packs de langues, aperçu et paramètres globaux par défaut
- **RTK** — aperçu du filtrage des commandes, paramètres de sécurité RTK et catalogue des filtres
- **Combinaisons de compression** — pipelines de moteurs nommés affectés aux combinaisons de routage
- **Seuil de déclenchement automatique** — active automatiquement la compression lorsque le nombre de jetons dépasse le seuil

### Remplacement par combinaison

Dans `Dashboard → Context & Cache → Compression Combos`, affectez une combinaison de compression à une
combinaison de routage :

```txt
Combinaison : "free-tier-fallback"
  Combinaison de compression : "coding-agent-stack"
  Pipeline : RTK -> Caveman
  Cibles :
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Cela vous permet d'utiliser une compression empilée sur les fournisseurs gratuits/de programmation tout en conservant le mode allégé pour les
abonnements payants.

Cette affectation de « remplacement par combinaison » est un contrôle distinct du remplacement du **mode de compression de la combinaison de
routage** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — le schéma du champ
accepte également `rtk`, `stacked` et `omniglyph`) : ce remplacement ne sélectionne pas un pipeline de
combinaison de compression nommé ; il définit simplement le champ `compressionMode` consulté par
`resolveCompressionPlan`. Il peut être défini soit sur la carte de la combinaison (`Dashboard → Combos`), soit, depuis
#6760, pour chaque combinaison de routage dans la liste « Assign to routing » de
`Dashboard → Context & Cache → Compression Combos`, juste à côté de la case à cocher d'affectation du pipeline
décrite ci-dessus. Les deux interfaces enregistrent les modifications via le même point de terminaison `PUT /api/combos/{id}`.

### Remplacement par requête

Envoyez l'en-tête de requête `x-omniroute-compression` pour remplacer le plan de compression d'une seule
requête. Il bénéficie de la priorité la plus élevée — il l'emporte sur le remplacement de la combinaison de routage, le profil actif,
le déclenchement automatique et la valeur Default du panneau. Les valeurs inconnues sont ignorées (la requête n'est jamais rejetée) et
l'interrupteur principal global continue de tout contrôler : lorsque la compression est désactivée globalement, l'en-tête ne peut pas
l'activer. Valeurs :

| Valeur        | Effet                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Aucune compression pour cette requête.                                                                                                |
| `default`     | Le profil Default dérivé du panneau (ignore le profil actif). Les moteurs avec perte restent désactivés.                              |
| `safe`        | Identique à l'omission de l'en-tête : déduplication et réduction des espaces uniquement.                                              |
| `allow-lossy` | Conserve le plan de l'opérateur pour cette requête, y compris les résumés, les filtres de pertinence et les réécritures stylistiques. |
| `engine:<id>` | Un seul moteur, s'il est activé, par ex. `engine:rtk`. Il s'agit de l'activation explicite de ce moteur pour la requête.              |
| `<combo>`     | Une combinaison nommée, recherchée d'abord par nom (sans distinction de casse), puis par identifiant.                                 |

Sans `allow-lossy`, `engine:<id>` ou une combinaison nommée, les moteurs avec perte ne sont pas appliqués. La
requête bénéficie tout de même de la déduplication de session et de la réduction des espaces lorsque la compression est activée.

Le plan appliqué est renvoyé dans l'en-tête de réponse `X-OmniRoute-Compression: <mode>; source=<source>`,
où `<source>` correspond à l'une des valeurs `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` ou `off`.

### API

```bash
# Obtenir les paramètres de compression
curl http://localhost:20128/api/settings/compression

# Mettre à jour les paramètres de compression
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Prévisualiser une charge utile RTK/empilée spécifique
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Répertorier les packs de filtres RTK
curl http://localhost:20128/api/context/rtk/filters

# Tester RTK directement avec des métadonnées de commande facultatives
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Ce qui est protégé

Le moteur de compression **préserve toujours :**

- ✅ Les blocs de code (délimités et en ligne)
- ✅ Les URL et les chemins de fichiers
- ✅ Les structures JSON et les données structurées
- ✅ Les identifiants et les jetons techniques protégés
- ✅ Les expressions mathématiques
- ✅ Les définitions d'appels d'outils/de fonctions
- ✅ Les prompts système (en mode lite)

La récupération de la sortie brute RTK masque les clés d'API courantes, les jetons bearer, les jetons Slack, les clés d'accès AWS,
les mots de passe, les jetons et les secrets avant toute persistance.

---

## Statistiques de compression

Chaque requête compressée inclut des statistiques dans les journaux du serveur :

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Feuille de route des phases

| Phase    | Modes                                                                                                                                                                     | Statut   |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Phase 1  | Désactivé, Lite                                                                                                                                                           | ✅ Livré |
| Phase 2  | Standard, Agressif, Ultra                                                                                                                                                 | ✅ Livré |
| Phase 3  | RTK, Empilé, Combinaisons de compression                                                                                                                                  | ✅ Livré |
| Phase 4  | Styles de sortie, Ultra de niveau SLM, infrastructure d'évaluation                                                                                                        | ✅ Livré |
| Phase 4C | Budget de contexte adaptatif (« cadran ») — moteur de calcul + API (`contextBudget` sur `PUT /api/settings/compression`) + contrôles de mode/politique du tableau de bord | ✅ Livré |

---

## Remerciements

Les règles de compression du mode Standard sont inspirées de **[Caveman](https://github.com/JuliusBrussee/caveman)** par **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — le projet viral « pourquoi utiliser beaucoup de jetons quand peu de jetons suffisent ». Caveman annonce `~75%` de jetons de sortie en moins, une économie moyenne de `65%` sur les sorties de référence, une plage d'économies en sortie de `22-87%` et un outil de compression des entrées à `~46%`.

Le mode RTK est inspiré de **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** par **[RTK AI](https://github.com/rtk-ai)** — le projet haute performance de compression des sorties de commandes pour le terminal, la compilation, les tests, git et le filtrage des sorties d'outils. RTK annonce des économies de `60-90%`, avec une session d'exemple dans son README affichant `~80%` d'économies.

---

## Systèmes de compression avancés

Au-delà des 7 modes décrits ci-dessus (la source accepte également les modes `codex-responses` et
`omniglyph`, que ce guide ne couvre pas), les sections ci-dessous présentent les fonctionnalités
qui opèrent au sein de ces modes ou en complément de ceux-ci : la compression des résultats d'outils et le vieillissement progressif
constituent les étapes 1 et 2 du moteur agressif (mode Agressif et étape `aggressive` d'un
pipeline empilé), le pipeline empilé décrit le fonctionnement du mode Empilé, la compression
adaptée au cache rétrograde `aggressive` et `ultra` vers `standard` pour les fournisseurs utilisant la mise en cache lorsque la compression
est activée, tandis que le mode de sortie Caveman et les styles de sortie sont des instructions facultatives du prompt système,
désactivées par défaut, qui façonnent la sortie du modèle au lieu de compresser la requête.

### Compression adaptée au cache

Certains fournisseurs (comme Anthropic avec la mise en cache des prompts) prennent en charge la **mise en cache des prompts**,
ce qui leur permet de mettre en cache certaines parties du prompt afin de réduire les coûts et la latence. Lorsque
la mise en cache est activée, une compression agressive peut en réalité **nuire** aux performances,
car elle modifie les jetons mis en cache, invalidant ainsi le cache.

Le module `cachingAware.ts` résout ce problème en **détectant le contexte de mise en cache** et en
**ajustant la stratégie de compression** en conséquence.

#### Fonctionnement

1. **Détecter le contexte de mise en cache** — Analyse le corps de la requête à la recherche de marqueurs `cache_control`
2. **Identifier les fournisseurs utilisant la mise en cache** — Vérifie si le fournisseur cible prend en charge la mise en cache
3. **Ajuster la stratégie** — Rétrograde `aggressive`/`ultra` vers `standard` pour les fournisseurs utilisant la mise en cache
4. **Ignorer le prompt système** — Les prompts système sont généralement mis en cache, il ne faut donc pas les compresser

La fonction auxiliaire de stratégie renvoie également un indicateur `deterministicOnly`, mais le générateur de plan ne consomme
que la stratégie — actuellement, aucun composant en aval ne lit cet indicateur.

#### Exemple de code

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Marqueur de cache
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Quand l'utiliser

La compression adaptée au cache est **toujours activée** — aucune configuration n'est nécessaire. Elle s'applique dès que
la compression est activée et que le fournisseur cible prend en charge la mise en cache des prompts (Anthropic, OpenAI,
etc.) ; les marqueurs `cache_control` explicites ne sont pas requis — la présence d'un fournisseur utilisant la mise en cache suffit à
déclencher le rétrogradage, tandis que les marqueurs seuls ne le font jamais (la détection des marqueurs alimente la
télémétrie du cache, et non la décision stratégique).

### Vieillissement progressif

Les longues conversations accumulent de nombreux tours de messages, mais les tours plus anciens deviennent moins
pertinents. Le module `progressiveAging.ts` **dégrade les messages en fonction de leur distance en nombre de tours**
(distance mesurée depuis la fin de la conversation). Avec les valeurs par défaut fournies
(`verbatim: 2, light: 2, moderate: 3`) :

- **2 derniers tours (distance ≤ 2)** : conservés tels quels
- **Distance 3** : compression « homme des cavernes » (suppression du superflu)
- **Distance 4+** : les messages de l’assistant sont résumés ; les messages de l’utilisateur sont réduits à leur première
  ligne, limitée à 120 caractères ; les autres rôles restent inchangés. Les invites système, les
  messages déjà vieillis et le dernier message de l’utilisateur sont toujours conservés tels quels, quelle que soit la distance.
  Rien n’est supprimé intégralement, et la bande `light`
  est inaccessible avec les valeurs par défaut fournies (`light` est égal à `verbatim`).

#### Exemple de code

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 tours supplémentaires ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 3 derniers tours : tels quels
  light: 8, // distance <= 8 : compression légère
  moderate: 20, // distance <= 20 : compression « homme des cavernes »
  fullSummary: 5, // requis par le type, non lu par le code de répartition en bandes
  // distance > 20 : résumé (assistant) / première ligne conservée (utilisateur)
});

// saved = nombre de jetons économisés
```

#### Quand l’utiliser

Le vieillissement progressif est **toujours activé** pour le mode `aggressive` — il constitue l’étape 2 de
`compressAggressive()`. Le mode Ultra ne l’exécute pas. Il est
particulièrement efficace pour :

- Les sessions de programmation prolongées
- Les conversations sur plusieurs jours
- Les workflows agentiques comportant de nombreux appels d’outils

### Mode de sortie « homme des cavernes »

Le mode de sortie « homme des cavernes » ajoute des **instructions à l’invite système** demandant au modèle lui-même de produire
une sortie concise — le niveau `lite` demande des réponses concises conservant des phrases complètes, `full`
lui demande de « répondre de façon concise comme un homme des cavernes intelligent », et `ultra` demande une sortie télégraphique ;
les instructions ne font que le demander, elles ne peuvent pas le garantir. Les requêtes les reçoivent via
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) :
`open-sse/handlers/chatCore.ts` résout d’abord la sélection à l’aide de la couche de compatibilité descendante
(`resolveOutputStyleSelection()` dans
`open-sse/services/compression/outputStyles/backCompat.ts`) qui, lorsque `outputStyles`
est vide, associe un `cavemanOutputMode` activé au style de sortie `terse-prose` avec
`cavemanOutputMode.intensity` (voir Compatibilité descendante ci-dessous) ; une sélection `outputStyles`
non vide est utilisée telle quelle, et `cavemanOutputMode.enabled` ainsi que `intensity` n’ont alors aucun
effet, tandis que son bouton `autoClarity` continue de s’appliquer. `outputMode.ts` contient les
textes des instructions (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), le contournement du contenu et
l’utilitaire de positionnement utilisé par l’injection ; son propre injecteur `applyCavemanOutputMode()` n’a aucun
appelant en production.

#### Fonctionnement

Ce mode ne compresse pas l’entrée. Il ajoute un bloc d’instructions à l’invite système
(voir Fonctionnement de l’injection ci-dessous), et tout mode de compression d’entrée sélectionné pour la requête
s’exécute ensuite malgré tout, sur le corps qui contient désormais le bloc. Avant la
clause commune sur les limites par laquelle chaque niveau se termine, le niveau `full` en anglais indique :

> « Réponds de façon concise comme un homme des cavernes intelligent. Supprime les articles (un/une/le/la/les), les mots superflus (juste/vraiment/fondamentalement/en fait/simplement), les politesses et les formulations prudentes. Fragments acceptés. Synonymes courts (grand plutôt qu’étendu, corriger plutôt qu’implémenter). Conserve exactement toute la substance technique, le code, les erreurs, les URL et les identifiants. »

Cela fonctionne particulièrement bien pour :

- La génération de code (sortie plus concise = moins de jetons)
- Les questions-réponses rapides (aucun besoin d’explications détaillées)
- Le traitement par lots (débit maximal)

#### Quand l’utiliser

Le mode de sortie « homme des cavernes » est **facultatif**. Lorsque la compression est activée (`enabled: true`, le bouton principal
activé sur la page Compression Settings), activez-le avec `cavemanOutputMode.enabled` ; `intensity`
sélectionne `lite`, `full` ou `ultra` :

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Le bouton **Output Mode** d’une combinaison de compression (`outputMode`, avec le niveau défini dans `outputModeIntensity`)
configure le même commutateur pour les requêtes auxquelles cette combinaison s’applique, et l’outil MCP
`omniroute_set_compression_engine` l’écrit via son argument booléen `outputMode`.
Une sélection `outputStyles` non vide a priorité sur ce commutateur. Dans le
tableau de bord, l’activation du style de sortie **Terse prose** injecte le même bloc (voir Styles de
sortie ci-dessous).

### Styles de sortie (catalogue)

Le mode de sortie « homme des cavernes » ci-dessus constitue le **chemin historique à style unique**. La phase 4 l’a généralisé
en un catalogue de styles de sortie composables : `OUTPUT_STYLE_CATALOG` dans
`open-sse/services/compression/outputStyles/catalog.ts`. Chaque style est une instruction d’invite système
qui demande au modèle lui-même de produire une sortie moins coûteuse ; plusieurs styles peuvent être activés
simultanément et sont injectés dans l’ordre du catalogue.

| Style                                          | `id`          | Fonction                                                                                                                                                                                                                                            | Langues des instructions                              |
| ---------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Prose concise                                  | `terse-prose` | Supprime le remplissage, les articles et les formulations hésitantes ; conserve exactement le contenu technique. Même texte que l'ancien mode de sortie « homme des cavernes » (référencé, non recopié).                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi         |
| Moins de code                                  | `less-code`   | Échelle YAGNI : plus petite modification fonctionnelle, sans abstractions non demandées.                                                                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi         |
| Queue-de-cheval (développeur senior paresseux) | `ponytail`    | « Le meilleur code est celui qui n'est jamais écrit » : réutilisation > réécriture, cause racine > symptôme, plus petit diff fonctionnel.                                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi         |
| J'ai un TDAH (action d'abord)                  | `i-have-adhd` | Action d'abord (commande/chemin/extrait avant la prose), étapes numérotées et limitées, UNE prochaine étape concrète, sans préambule/récapitulatif/formule de clôture. Adapté de [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi         |
| CJK concis (文言)                              | `terse-cjk`   | Réponse `full`/`ultra` en chinois classique (文言) ; `lite` demande uniquement des réponses brèves, sans mots fonctionnels, formules de politesse ni ornements.                                                                                     | zh (soumis aux paramètres régionaux, voir ci-dessous) |

Chaque style propose trois niveaux d'intensité — `lite`, `full`, `ultra` — et chaque niveau
se termine par la clause de limites partagée (`SHARED_BOUNDARIES` dans `outputMode.ts`), qui
conserve exactement les blocs de code, chemins de fichiers, commandes, erreurs et URLs. Les textes des niveaux
`terse-prose` et `terse-cjk` ajoutent les identifiants à cette liste.

`terse-cjk` est limité aux paramètres régionaux `zh` à deux endroits. La page Paramètres de compression affiche
sa ligne uniquement lorsque la langue de l'interface du tableau de bord est le chinois (`zh-CN` ou `zh-TW`), et
`applyOutputStyles()` ne l'injecte que lorsque la langue résolue de la requête (voir Sélection de la langue
ci-dessous) est `zh`. Masquer la ligne n'efface pas une sélection `terse-cjk` enregistrée :
l'API des paramètres accepte n'importe quel identifiant de style, et l'enregistrement d'autres styles sur la page la conserve. Au
moment de la requête, la vérification de langue de `applyOutputStyles()` constitue la seule restriction liée aux paramètres régionaux.

#### Fonctionnement de l'injection

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) résout
la sélection par rapport au catalogue (les identifiants inconnus et les styles ne correspondant pas aux paramètres régionaux sont
ignorés, sans jamais provoquer d'erreur ; une sélection ne correspondant à aucun style laisse le corps
inchangé, avec le motif `no_styles`), concatène les instructions sélectionnées dans l'ordre du catalogue,
ajoute la clause de limites **une seule fois** (ainsi que la clause de sécurité, `SAFETY_BOUNDARIES` ou sa
traduction, lorsque `less-code` ou `ponytail` est sélectionné), et commence le bloc par un
marqueur d'idempotence unique (`[OmniRoute Output Styles]`), de sorte qu'une nouvelle application ne produit aucun effet. Lorsque
la langue résolue (voir Sélection de la langue ci-dessous) dispose d'une traduction, l'instruction localisée
est injectée à la place de l'anglais.

Sur un corps comportant un tableau `messages` non vide, la vérification d'idempotence s'exécute avant le
contournement fondé sur le contenu : lorsque le marqueur `[OmniRoute Output Styles]` est déjà présent dans le champ
`system` de premier niveau (une chaîne ou un tableau de blocs de contenu) ou dans un message système dont le contenu
est une chaîne, le corps reste inchangé avec le motif `already_applied` et aucune recherche de mots-clés n'est effectuée.
Sinon, un contournement fondé sur le contenu (`shouldBypassCavemanOutputMode()` dans
`open-sse/services/compression/outputMode.ts`) examine le texte des trois derniers
messages, quel que soit leur rôle, et ignore les styles pour l'intégralité du tour lorsque ce texte
correspond à ses mots-clés de sécurité, d'action irréversible ou de clarification, ou à une
séquence dépendant de l'ordre : `first`, `then`, `after that`, `before`, `rollback` ou
`backup`, suivi dans les 240 caractères par `delete`, `drop`, `migrate`, `deploy` ou
`release`. Le contournement s'exécute tant que l'option **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, activée par défaut) est activée ; désactiver cette option ignore la
recherche de mots-clés.

Lorsque le contournement autorise le tour, `placeSystemInstruction()` (même fichier), qui
ne crée jamais de nouveau `messages[0]`, place le bloc au premier emplacement disponible parmi les suivants :

1. Un message système initial dont le contenu est une chaîne : le bloc est ajouté après son texte.
2. Le champ `system` de premier niveau : le bloc est ajouté après le texte d'une chaîne, ou
   ajouté en tant que nouveau bloc de texte à un tableau de blocs de contenu.
3. Le premier message système ultérieur dont le contenu est une chaîne : le bloc est ajouté après son
   texte.
4. Aucun des cas précédents : le bloc est placé dans un nouveau message système à la fin de `messages`.

Sur un corps dépourvu de tableau `messages` (ou comportant un tableau vide), aucun contournement fondé sur le contenu ne s'exécute et
le champ `system` de premier niveau n'est pas consulté. Le bloc est ajouté après le texte d'un
champ `instructions` de type chaîne, sauf si ce champ contient déjà le
marqueur `[OmniRoute Output Styles]`, auquel cas le corps reste inchangé avec le motif
`already_applied`. Lorsque le corps ne comporte aucun champ `instructions` de type chaîne, mais contient `input`
(une chaîne ou un tableau), le bloc devient `instructions`, remplaçant toute valeur non textuelle
que ce champ contenait. Un corps ne comportant ni champ `instructions` de type chaîne ni champ `input` de type chaîne ou tableau
reste inchangé et est ignoré avec le motif `no_messages`.

#### Activation

Dans le tableau de bord : **Contexte de compression → Paramètres de compression**
(`/dashboard/context/settings`), section Styles de sortie : une ligne par style avec un
bouton d’activation/désactivation et un sélecteur de niveau. Les styles sont injectés
tant que la compression elle-même est activée (le bouton principal de la page,
`enabled`). Le bouton **Contournement automatique de la clarté** se trouve sur la page
**Caveman** (`/dashboard/context/caveman`), dans sa carte **Mode de sortie**. Au niveau
du code, la configuration de compression conserve la sélection sous la forme suivante :

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Rétrocompatibilité : tant que `outputStyles` est vide, l’ancien paramètre
`cavemanOutputMode.enabled` est associé à `terse-prose` avec la valeur
`cavemanOutputMode.intensity`. Le bloc commence alors par le marqueur
`[OmniRoute Output Styles]`, là où l’ancien injecteur `applyCavemanOutputMode()`
écrivait `[OmniRoute Caveman Output Mode]`. Sous le marqueur, le texte correspond à
l’ancienne injection en en, pt-BR, es, de, fr, it, ru, id et vi ; en ja et zh, il
comporte une espace supplémentaire avant la clause relative aux limites. `terse-prose`
est traduit en pt-BR, es, de, fr, it, ru, zh, ja, id et vi ; ainsi, une requête dont la
langue résolue est `hu` reçoit le texte anglais, alors que l’ancien injecteur utilisait
sa version hongroise.

Sélection de la langue du style de sortie (`resolveOutputStyleLanguage()` dans
`outputStyles/apply.ts`) : lorsque `languageConfig.enabled` est activé, `autoDetect`
échantillonne le dernier message utilisateur du tableau `messages` de la requête qui
contient du texte (contenu sous forme de chaîne ou champ `text` de ses parties de
contenu), puis lui applique le détecteur du moteur Caveman
(`detectCompressionLanguage()`). Le détecteur renvoie `zh` pour un texte contenant des
caractères Han sans kana ; sinon, il renvoie la langue ayant le plus de correspondances
d’indices parmi `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` et `id`, et `en`
lorsqu’aucun indice ne correspond — un texte qu’il ne peut pas classer est traité en
anglais, jamais avec `defaultLanguage`, et `vi` n’est jamais détecté, bien que les
styles fournissent du texte en `vi`. Le corps d’une requête Responses API conserve ses
tours dans `input`, qui n’est pas échantillonné ; il utilise donc `defaultLanguage`,
puis l’anglais. Lorsqu’aucun message utilisateur de `messages` ne contient de texte, ou
lorsque `autoDetect` est désactivé, `defaultLanguage` s’applique, puis l’anglais. Lorsque
`languageConfig.enabled` est désactivé, la langue est l’anglais — sauf si une combinaison
de compression s’applique à la requête (une combinaison affectée à la combinaison de
routage de la requête, ou la combinaison de compression par défaut utilisée par
chatCore comme solution de repli pour le pipeline empilé intégré) : l’application
d’une combinaison active `languageConfig.enabled` pour cette requête et définit
`defaultLanguage` à partir des packs de langues de la combinaison (la valeur
enregistrée si elle fait partie des packs de la combinaison, sinon le premier pack de
la combinaison, qui vaut `en` par défaut), tandis que la valeur enregistrée
d’`autoDetect` (activé par défaut) continue de s’appliquer. Le moteur d’entrée Caveman
sélectionne différemment la langue de son pack de règles — pour chaque partie textuelle
et, lorsque la détection automatique est désactivée, selon `enabledPacks`.

La matrice style × langue est fixée par
`tests/unit/compression/output-styles-i18n-matrix.test.ts` : chaque style du catalogue
doit avoir une entrée dans le champ `BASELINE_LANGUAGES` du test ; un style qui n’est
pas limité par les paramètres régionaux doit fournir une traduction pt-BR (le style
`terse-cjk`, limité par les paramètres régionaux, est exempté de cette règle), sauf s’il
figure dans `KNOWN_ENGLISH_ONLY`, qui ne peut contenir que des styles ne disposant
d’aucune traduction — un style qui y figure et possède une traduction quelconque fait
échouer le test ; enfin, un style fait échouer le test s’il perd une langue répertoriée
dans son entrée `BASELINE_LANGUAGES`. Pour ajouter un style, consultez
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compression des résultats d’outils

`compressToolResult()` dans `open-sse/services/compression/toolResultCompressor.ts`
compresse le texte des résultats d’outils à l’aide de **5 stratégies**. Il les essaie
dans cet ordre, et la première stratégie activée dont la vérification correspond au
contenu détermine le résultat :

1. **`fileContent`** : le contenu de 3 lignes ou plus dans lequel au moins une ligne, en ignorant
   l'indentation initiale, commence par `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` ou `return ` (le mot-clé suivi d'une espace), ou par `if`,
   `for` ou `while` suivi de `(` ou ` (`, conserve ses 20 premières et 5 dernières lignes, avec
   une marque signalant l'omission de la partie centrale.
2. **`grepSearch`** : le contenu comprenant au moins une ligne de la forme `<path>:<digits>:`,
   où le texte précédant le premier deux-points ne contient aucune espace, conserve uniquement ces lignes, dans
   la limite de 30, suivies du nombre de correspondances supplémentaires éventuelles et de la liste des fichiers correspondants ;
   toutes les autres lignes sont supprimées. Une seule ligne de ce type suffit à déclencher la stratégie, donc une
   ligne de journal commençant par un horodatage tel que `12:30:45` compte également.
3. **`shellOutput`** : la sortie qui contient une séquence CSI ANSI (`ESC[` suivi de chiffres ou
   de points-virgules, puis d'une lettre, comme dans les codes de couleur) ou un `$` suivi d'une espace
   n'importe où dans le texte perd ces séquences (les autres séquences d'échappement, telles que `ESC[?25l` ou une
   séquence OSC de titre de fenêtre, sont conservées) et conserve ses 50 dernières lignes, les lignes
   consécutives répétées étant regroupées. Comme cette vérification s'exécute avant `json` et `errorMessage`,
   une sortie JSON ou d'erreur contenant un tel `$` ne les atteint jamais lorsque
   `shellOutput` est activé.
4. **`json`** : une charge utile JSON de plus de 2 000 caractères qui commence par `{` ou `[` (après
   d'éventuelles espaces) et dont l'analyse réussit est résumée : un tableau de plus de 7 éléments conserve
   ses 5 premiers et 2 derniers éléments ainsi que son nombre total, et un objet conserve ses 20 premières
   clés, chaque valeur d'objet ou de tableau imbriqué étant remplacée par un espace réservé `{…N keys}`
   (pour un tableau, N correspond à sa longueur) et un marqueur `_remaining_<N>_keys` indiquant le nombre de clés
   supprimées au-delà des 20 premières. Les valeurs scalaires sont copiées intégralement, de sorte qu'un objet de 20 clés
   ou moins sans valeur imbriquée est seulement réindenté — une version minifiée gagne des caractères
   et reste inchangée.
5. **`errorMessage`** : la sortie qui contient, n'importe où et sans tenir compte de la casse, `error:`,
   `error ` (le mot suivi d'une espace, comme dans `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` ou `traceback` conserve sa première ligne, les
   10 lignes suivantes et les 3 dernières, avec un marqueur `… [N frames elided] …` à la place des
   lignes intermédiaires. Le marqueur apparaît uniquement lorsque plus de 13 lignes suivent la première
   ligne ; une sortie d'erreur de 14 lignes ou moins n'est donc pas raccourcie (avec 12 ou 13 lignes, les
   3 dernières répètent des lignes déjà conservées).

Après qu'une stratégie a trouvé une correspondance, même si elle n'économise rien, les stratégies suivantes ne sont pas
essayées. Lorsque la stratégie correspondante n'économise aucun jeton estimé (longueur ÷ 4, arrondie à l'entier supérieur) —
par exemple un fichier ressemblant à du code de 25 lignes ou moins, ou un tableau JSON de plus de 2 000
caractères comportant 7 éléments ou moins — le moteur agressif conserve le résultat d'outil d'origine :
les deux appelants (`compressAggressive()` et `compressAnthropicToolResultBlock()`)
conservent l'original lorsque `saved` est égal ou inférieur à 0, tandis que `compressToolResult()` lui-même
renvoie tout de même la sortie de cette stratégie. L'étape du résultat d'outil n'est pas le dernier mot : le
résumeur de secours du moteur peut encore raccourcir un message `tool` ou `function` de plus de
8 192 caractères (`maxTokensPerMessage`, 2 048, multiplié par 4).

#### Quand l'utiliser

La compression des résultats d'outil est l'étape 1 du moteur agressif (`compressAggressive()` dans
`open-sse/services/compression/aggressive.ts`) ; elle s'exécute donc en mode Aggressive et lors d'une
étape `aggressive` d'un pipeline empilé. Elle compresse les messages `tool` et `function` au format
OpenAI ainsi que le texte contenu dans les blocs Anthropic `tool_result`. Chaque stratégie possède son propre
commutateur sous `aggressive.toolStrategies`, tous activés par défaut. Dans le tableau de bord, les
commutateurs se trouvent dans la vue **Advanced** de la page Caveman lorsque la compression est activée et que le
mode par défaut est Aggressive.

### Pipeline empilé

Le mode empilé exécute **plusieurs moteurs à la suite** — généralement RTK en premier
(60 à 90 % d'économies sur la sortie des outils), puis Caveman sur le texte restant (~46 % d'économies
en entrée). Combinés, ils atteignent la **plage admissible de 78 à 95 %** (voir Calcul des économies en amont
ci-dessus) : `1 - (1 - 0.60..0.90) × (1 - 0.46)` donne une moyenne d'environ 89 %.

#### Fonctionnement

```
Entrée (1 000 jetons)
  → RTK (filtre sensible aux commandes) → 200 jetons
    → Caveman (suppression du remplissage) → 108 jetons
  → Sortie (108 jetons, ~89 % d'économies)
```

#### Quand l'utiliser

Utilisez le mode empilé pour :

- Les workflows utilisant beaucoup d'outils (codage agentique, recherche)
- Le traitement par lots sensible aux coûts
- Lorsque vous avez besoin d'économiser un maximum de jetons

Les pipelines empilés sont configurés au moyen du paramètre global de compression `stackedPipeline`,
ou au moyen d'une combinaison de compression nommée attribuée à une combinaison de routage (voir
Remplacement par combinaison ci-dessus) — et non au moyen d'un `modePack` de combinaison automatique (ce champ
repondère uniquement la sélection du modèle de la combinaison automatique, et `stacked` n'est pas un nom de pack valide).

---

## Remplacements de compression par combo

Vous pouvez remplacer le mode de compression global **pour chaque combo** afin d’affiner le comportement
selon les différents cas d’utilisation :

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Cela est utile pour :

- **Combos de codage** : utilisez le mode `aggressive` pour les longues sessions
- **Combos de questions-réponses rapides** : utilisez le mode `lite` pour des réponses rapides
- **Combos utilisant beaucoup d’outils** : utilisez le mode `stacked` pour maximiser les économies
- **Combos de production** : désactivez le remplacement pour les fournisseurs avec mise en cache — l’ajustement
  tenant compte du cache et toujours actif rétrograde automatiquement `aggressive`/`ultra` vers `standard`
  (il n’existe aucun mode `cache-aware` sélectionnable)

---

## Voir aussi

- [Configuration de l’environnement](../reference/ENVIRONMENT.md) — Variables d’environnement de compression
- [Guide d’architecture](../architecture/ARCHITECTURE.md) — Fonctionnement interne du pipeline de compression
- [Guide de l’utilisateur](../guides/USER_GUIDE.md) — Premiers pas avec la compression
- [Compression RTK](./RTK_COMPRESSION.md) — Filtres RTK, modèle de confiance, étape de vérification et récupération de la sortie brute
- [Moteurs de compression](./COMPRESSION_ENGINES.md) — Caveman, RTK, mode empilé, API, MCP et tableau de bord
- [Format des règles de compression](./COMPRESSION_RULES_FORMAT.md) — Format JSON des packs de règles
- [Packs linguistiques de compression](./COMPRESSION_LANGUAGE_PACKS.md) — Règles Caveman propres à chaque langue
