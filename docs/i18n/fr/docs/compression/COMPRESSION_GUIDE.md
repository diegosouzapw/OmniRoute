# 🗜️ Prompt Compression Guide — OmniRoute (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Économisez automatiquement 15 à 95 % sur le contexte éligible. Pour un aperçu rapide, consultez la [section Compression du README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Vue d’ensemble

OmniRoute met en œuvre un pipeline modulaire de compression des prompts qui s’exécute **de manière proactive** avant que les requêtes n’atteignent les fournisseurs en amont. Vos économies de tokens s’effectuent donc de manière transparente, sans aucune modification de votre flux de travail.

```
Requête du client
  → Sélecteur de stratégie de compression
    → Remplacement par une combinaison ? → Utiliser le paramètre de la combinaison
    → Seuil de déclenchement automatique ? → Utiliser le mode automatique
    → Mode par défaut ? → Utiliser le paramètre global
    → Désactivé ? → Ignorer la compression
  → Mode de compression sélectionné
    → Désactivé : aucune compression
    → Léger : nettoyage sûr des espaces blancs et du formatage (~15 %)
    → Standard : suppression des mots de remplissage façon télégraphique (~30 %)
    → Agressif : vieillissement de l’historique + synthèse (~50 %)
    → Ultra : élagage heuristique + allègement des blocs de code (~75 %)
    → RTK : filtrage des sorties du terminal et des outils tenant compte des commandes (plage de 60 à 90 % en amont)
    → Empilé : pipeline ordonné à plusieurs moteurs, généralement RTK puis Caveman (plage éligible de 78 à 95 %)
  → Requête compressée → Fournisseur
```

---

## Modes de compression

### Désactivé

Aucune compression n’est appliquée. Tous les messages sont transmis sans modification.

### Mode léger (~15 % d’économies, latence <1 ms)

Le mode le plus sûr : aucune modification sémantique, uniquement un nettoyage du formatage :

| Technique                | Description                                                                    |
| ------------------------ | ------------------------------------------------------------------------------ |
| `collapseWhitespace`     | Fusionne les lignes vides consécutives et supprime les espaces en fin de ligne |
| `dedupSystemPrompt`      | Supprime les messages système en double                                        |
| `compressToolResults`    | Compresse les sorties détaillées des outils et fonctions                       |
| `removeRedundantContent` | Supprime les instructions répétées                                             |
| `replaceImageUrls`       | Raccourcit les URI de données d’images en base64                               |

**Idéal pour :** une utilisation permanente et les flux de travail où la sécurité est critique.

### Mode standard (~30 % d’économies)

Inspiré de [Caveman](https://github.com/JuliusBrussee/caveman) : supprime les mots de remplissage et les formulations verbeuses tout en préservant le sens :

- Supprime les mots de remplissage (« please », « I think », « basically », « actually »)
- Condense les formulations verbeuses (« in order to » → « to », « as a result of » → « because »)
- Supprime les tournures de politesse hésitantes (« Would you mind... », « If you could possibly... »)
- Plus de 30 règles d’expressions régulières optimisées pour les prompts de programmation

**Idéal pour :** les flux de développement quotidiens et les équipes soucieuses des coûts.

### Mode agressif (~50 % d’économies)

Gestion intelligente de l’historique pour les sessions longues :

- **Vieillissement des messages** — les messages les plus anciens sont progressivement compressés
- **Synthèse des résultats d’outils** — les longues sorties d’outils sont remplacées par des résumés
- **Garde-fous d’intégrité structurelle** — garantissent la cohérence des paires `tool_use` + `tool_result`
- **Prise en compte de la fenêtre de contexte** — respecte les limites de tokens propres à chaque modèle

**Idéal pour :** les sessions de débogage prolongées et les bases de code volumineuses.

### Mode ultra (~75 % d’économies)

Compression maximale pour les scénarios où les tokens sont critiques :

- **Élagage heuristique** — supprime les messages dont la pertinence est inférieure au seuil
- **Allègement des blocs de code** — compresse les exemples de code répétitifs
- **Troncature par recherche binaire** — détermine le point de coupure optimal pour la fenêtre de contexte
- Toutes les fonctionnalités du mode agressif sont incluses

**Idéal pour :** les situations où vous atteignez régulièrement les limites de contexte.

### Mode RTK (plage de 60 à 90 % en amont)

Le mode RTK est optimisé pour les sorties d’outils détaillées apparaissant dans les sessions d’agents de programmation :

- Détecte les classes de commandes et de sorties telles que `git status`, `git diff`, `git log`, les exécuteurs de tests,
  les builds TypeScript/Vite/Webpack, ESLint/Biome/Prettier, les audits et installations npm, les journaux Docker, les sorties
  d’infrastructure et les sorties génériques du shell
- Applique les ensembles de filtres JSON depuis `open-sse/services/compression/engines/rtk/filters/`
- Importe les filtres du schéma TOML v1 de RTK depuis les fichiers `filters.toml` du projet ou globaux, avec validation
  par des tests intégrés et contrôle de confiance pour les fichiers du projet
- Inclut 49 filtres intégrés avec des exemples de vérification
- Supprime les séquences de contrôle ANSI, les barres de progression, les lignes répétées et le bruit sans action possible
- Préserve les échecs, les erreurs, les avertissements, les fichiers modifiés, les résumés et la fin des longues sorties
- Prend en charge les filtres de projet soumis à un contrôle de confiance, les filtres globaux et la récupération facultative des sorties brutes expurgées

**Idéal pour :** les sessions d’agents contenant des transcriptions du shell, de builds, de tests, de git, de grep et de sorties de fichiers.

### Mode empilé (plage éligible de 78 à 95 %)

Le mode empilé exécute plusieurs moteurs de compression dans un ordre déterministe. Le pipeline par défaut est :

```txt
RTK -> Caveman
```

Cet ordre compacte d’abord les sorties du terminal et des outils, puis applique la condensation sémantique de Caveman
au reste du prompt en langage naturel. Les pipelines empilés peuvent être configurés globalement ou au moyen de
combinaisons de compression affectées à des combinaisons de routage.

**Idéal pour :** les contextes mixtes comportant de volumineux journaux d’outils ainsi que des instructions humaines ou des résumés de l’assistant.

---

## Calcul des économies en amont

OmniRoute documente les économies réalisées grâce à la compression à partir de deux sources : les benchmarks des projets en amont et
la composition des moteurs d’OmniRoute.

| Source  | Chiffre du README en amont utilisé ici                                                                                                                            |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` de tokens de sortie en moins, `65%` d’économies moyennes sur la sortie dans les benchmarks, plage de `22-87%` et outil de compression des entrées à `~46%` |
| RTK     | `60-90%` d’économies sur la sortie des commandes ; session d’exemple de `~118,000 -> ~23,900` tokens, soit `79.7%` d’économies (`~80%`)                           |

Pour les charges utiles d’outil/contexte qui se chevauchent, la combinaison OmniRoute par défaut enchaîne les moteurs :

```txt
RTK -> Caveman
```

Les économies combinées sont multiplicatives, et non additives :

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Ce chiffre de `78-95%` s’applique lorsque RTK et Caveman peuvent tous deux réduire la même charge utile d’entrée/contexte.
Le mode de sortie des réponses de Caveman est distinct : lorsqu’il est activé, utilisez les économies propres à Caveman sur les sorties (`65%`
en moyenne, `~75%` annoncé, plage de `22-87%`). Les économies totales sur la facturation dépendent de la répartition entre vos prompts et vos sorties.

### Ce que signifie réellement « éligible »

La plage annoncée de 15-95% est réelle, mais elle ne s’applique qu’au contenu **redondant ou verbeux** — lignes
d’erreur répétées, journal de compilation qui répète sans cesse le même avertissement, sortie `grep`/lecture de fichier surdimensionnée. Cela ne
signifie **pas** que chaque requête permet d’économiser autant.

Vérification empirique (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`) : une
exécution `stacked` (RTK + Caveman) sur un bloc `tool_result` au format Anthropic contenant 300 lignes
d’erreur identiques a produit **95.93% d’économies de tokens / 96.26% d’économies de caractères** — pleinement dans la plage
annoncée. Mais l’exécution du même pipeline sur une sortie d’outil normale et non redondante (une liste propre de correspondances `grep`,
une courte lecture de fichier, du texte conversationnel ordinaire) produit à juste titre des **économies proches de zéro**, car
il n’y a rien de répétitif à supprimer et `validateCompression()` (`validation.ts`) refuse de transmettre une
réécriture qui supprimerait ou modifierait des blocs de code, des URL, des titres, des versions ou des identifiants de constantes EN MAJUSCULES.

Il s’agit d’un comportement attendu et sûr, et non d’un bug : une session de codage qui consiste principalement à lire/parcourir avec grep des fichiers propres
constatera des économies totales modestes même lorsque la compression est entièrement activée, tandis qu’une session confrontée à une boucle en échec
ou à un linter très bavard bénéficiera de toute la plage de 78-95% sur ce trafic. N’utilisez pas le faible
pourcentage d’économies globales d’une seule session comme preuve que la compression est mal configurée — vérifiez d’abord si la
sortie d’outil sous-jacente était réellement redondante.

---

## Visualisation des économies de tokens

```
Sans compression : 47K tokens envoyés au LLM
Avec Lite :        40K tokens envoyés         (15% économisés — sûr, toujours actif)
Avec Standard :    33K tokens envoyés         (30% économisés — règles « caveman-speak »)
Avec Aggressive :  24K tokens envoyés         (50% économisés — vieillissement + résumé)
Avec Ultra :       12K tokens envoyés         (75% économisés — élagage heuristique)
Avec RTK :         19K-5K tokens envoyés      (60-90% économisés sur la sortie des commandes/outils)
Avec Stacked :     10K-2.5K tokens envoyés    (plage éligible RTK+Caveman de 78-95%)
```

---

## Configuration

### Tableau de bord

Accédez à `Dashboard → Context & Cache` :

- **Caveman** — sélection du mode, packs linguistiques, aperçu et paramètres globaux par défaut
- **RTK** — aperçu du filtrage des commandes, paramètres de sécurité RTK et catalogue de filtres
- **Combinaisons de compression** — pipelines de moteurs nommés attribués aux combinaisons de routage
- **Seuil de déclenchement automatique** — active automatiquement la compression lorsque le nombre de tokens dépasse le seuil

### Remplacement par combinaison

Dans `Dashboard → Context & Cache → Compression Combos`, attribuez une combinaison de compression à une
combinaison de routage :

```txt
Combinaison : "free-tier-fallback"
  Combinaison de compression : "coding-agent-stack"
  Pipeline : RTK -> Caveman
  Cibles :
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Cela vous permet d’utiliser une compression empilée avec les fournisseurs gratuits/de codage, tout en conservant
le mode allégé pour les abonnements payants.

Cette attribution de « remplacement par combinaison » est un contrôle distinct du remplacement du **mode de compression
de la combinaison de routage** (Default/Off/Lite/Standard/Aggressive/Ultra) — ce remplacement ne sélectionne pas un pipeline
de combinaison de compression nommé ; il définit simplement le champ `compressionMode` consulté par
`resolveCompressionPlan`. Il peut être défini soit sur la carte de la combinaison (`Dashboard → Combos`), soit, depuis
#6760, pour chaque combinaison de routage dans la liste « Assign to routing » sous
`Dashboard → Context & Cache → Compression Combos`, juste à côté de la case à cocher d’attribution du pipeline
décrite ci-dessus. Les deux interfaces enregistrent les données via le même endpoint `PUT /api/combos/{id}`.

### Remplacement par requête

Envoyez l’en-tête de requête `x-omniroute-compression` pour remplacer le plan de compression pour une seule
requête. Il a la priorité la plus élevée — il prévaut sur le remplacement de la combinaison de routage, le profil actif,
le déclenchement automatique et la valeur Default du panneau. Les valeurs inconnues sont ignorées (la requête n’est jamais rejetée) et
l’interrupteur principal global continue de tout contrôler : lorsque la compression est désactivée globalement, l’en-tête ne peut pas
l’activer. Valeurs :

| Valeur        | Effet                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Aucune compression pour cette requête.                                                                                      |
| `default`     | Le profil Default dérivé du panneau (ignore le profil actif).                                                               |
| `engine:<id>` | Un seul moteur lorsqu’il est activé, par ex. `engine:rtk`.                                                                  |
| `<combo>`     | Une combinaison nommée, recherchée d’abord par nom (sans distinction entre majuscules et minuscules), puis par identifiant. |

Le plan appliqué est renvoyé dans l’en-tête de réponse `X-OmniRoute-Compression: <mode>; source=<source>`,
où `<source>` correspond à l’une des valeurs suivantes : `request-header`, `routing-override`, `active-profile`,
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
- ✅ Les définitions d’appels d’outils/de fonctions
- ✅ Les prompts système (en mode lite)

La récupération des sorties brutes RTK masque les clés API courantes, les jetons bearer, les jetons Slack, les clés d’accès AWS,
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

| Phase    | Modes                                                                                                                                                                                | Statut    |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| Phase 1  | Off, Lite                                                                                                                                                                            | ✅ Livrée |
| Phase 2  | Standard, Aggressive, Ultra                                                                                                                                                          | ✅ Livrée |
| Phase 3  | RTK, Stacked, combinaisons de compression                                                                                                                                            | ✅ Livrée |
| Phase 4  | Styles de sortie, Ultra de niveau SLM, infrastructure d’évaluation                                                                                                                   | ✅ Livrée |
| Phase 4C | Budget de contexte adaptatif (« cadran ») — moteur de calcul + API (`contextBudget` sur `PUT /api/settings/compression`) + contrôles du mode/de la politique dans le tableau de bord | ✅ Livrée |

---

## Remerciements

Les règles de compression du mode Standard sont inspirées de **[Caveman](https://github.com/JuliusBrussee/caveman)** par **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — le projet viral « pourquoi utiliser beaucoup de jetons quand peu de jetons suffisent ». Caveman annonce `~75%` de jetons de sortie en moins, une économie moyenne de `65%` sur les sorties des benchmarks, une plage de réduction des sorties de `22-87%` et un outil de compression des entrées à `~46%`.

Le mode RTK est inspiré de **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** par **[RTK AI](https://github.com/rtk-ai)** — le projet haute performance de compression des sorties de commandes pour le terminal, la compilation, les tests, git et le filtrage des sorties d’outils. RTK annonce des économies de `60-90%`, avec `~80%` d’économie dans l’exemple de session de son README.

---

## Systèmes de compression avancés

Au-delà des 7 modes standard, OmniRoute comprend plusieurs systèmes de compression
avancés qui fonctionnent automatiquement selon le contexte.

### Compression tenant compte du cache

Certains fournisseurs (comme Anthropic avec la mise en cache des prompts) prennent en charge la **mise en cache des prompts**,
ce qui leur permet de mettre en cache certaines parties du prompt afin de réduire les coûts et la latence. Lorsque
la mise en cache est activée, une compression agressive peut en réalité **nuire** aux performances,
car elle modifie les jetons mis en cache, invalidant ainsi le cache.

Le module `cachingAware.ts` résout ce problème en **détectant le contexte de mise en cache** et en
**ajustant la stratégie de compression** en conséquence.

#### Fonctionnement

1. **Détecter le contexte de mise en cache** — Analyse le corps de la requête à la recherche de marqueurs `cache_control`
2. **Identifier les fournisseurs prenant en charge la mise en cache** — Vérifie si le fournisseur cible prend en charge la mise en cache
3. **Ajuster la stratégie** — Rétrograde `aggressive`/`ultra` vers `standard` pour les fournisseurs prenant en charge la mise en cache
4. **Ignorer le prompt système** — Les prompts système sont généralement mis en cache, il ne faut donc pas les compresser
5. **Utiliser des transformations déterministes** — Utilise uniquement des transformations produisant un résultat cohérent

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
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Quand l’utiliser

La compression tenant compte du cache est **toujours activée** — aucune configuration n’est nécessaire. Elle ne se déclenche
que lorsque :

- La requête contient des marqueurs `cache_control`
- Le fournisseur cible prend en charge la mise en cache des prompts (Anthropic, OpenAI, etc.)

### Vieillissement progressif

Les longues conversations accumulent de nombreux tours de messages, mais les tours plus anciens deviennent moins
pertinents. Le module `progressiveAging.ts` **dégrade les messages selon leur ancienneté en nombre de tours** :

- **Tours récents (0-3)** : Conservés textuellement (tous les détails)
- **Tours intermédiaires (4-8)** : Compression Lite (nettoyage des espaces et de la mise en forme)
- **Anciens tours (9+)** : Compression Caveman (suppression du contenu superflu, résumé)
- **Très anciens tours (20+)** : Fortement résumés ou supprimés

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
  verbatim: 3, // 3 premiers tours : textuels
  light: 8, // Tours 4 à 8 : compression Lite
  moderate: 20, // Tours 9 à 20 : compression Caveman
  // Tours 21 et suivants : résumé approfondi
});

// saved = nombre de jetons économisés
```

#### Quand l’utiliser

Le vieillissement progressif est **toujours activé** pour les modes `aggressive` et `ultra`. Il est particulièrement efficace pour :

- Les longues sessions de programmation
- Les conversations sur plusieurs jours
- Les workflows agentiques comportant de nombreux appels d’outils

### Mode de sortie Caveman

Le module `outputMode.ts` injecte des **instructions dans le prompt système** afin que le modèle produise lui-même une sortie compressée et concise (un style « homme des cavernes »).

#### Fonctionnement

Au lieu de compresser l’entrée, ce mode ajoute un prompt système tel que :

> « Réponds avec un minimum de mots. Évite les formules de politesse. Utilise des phrases courtes. »

Cela fonctionne particulièrement bien pour :

- La génération de code (sortie plus concise = moins de tokens)
- Les questions-réponses rapides (aucune explication élaborée nécessaire)
- Le traitement par lots (pour maximiser le débit)

#### Quand l’utiliser

Le mode de sortie Caveman est **facultatif** — activez-le via la configuration combinée :

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### Styles de sortie (catalogue)

Le mode de sortie Caveman ci-dessus constitue le **mécanisme historique à style unique**. La phase 4 l’a généralisé en un catalogue de styles de sortie composables : `OUTPUT_STYLE_CATALOG` dans `open-sse/services/compression/outputStyles/catalog.ts`. Chaque style est une instruction de prompt système qui amène le modèle lui-même à produire une sortie moins coûteuse ; plusieurs styles peuvent être activés ensemble et sont injectés dans l’ordre du catalogue.

| Style                                          | `id`          | Fonction                                                                                                                                                                                                                                                   | Langues des instructions                                                                         |
| ---------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Prose concise                                  | `terse-prose` | Supprime le remplissage, les articles et les formulations hésitantes ; conserve exactement le contenu technique. Même texte que le mode de sortie Caveman historique (référencé, non recopié).                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                    |
| Moins de code                                  | `less-code`   | Échelle YAGNI : la plus petite modification fonctionnelle, sans abstractions non demandées.                                                                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                    |
| Queue de cheval (développeur senior paresseux) | `ponytail`    | « Le meilleur code est celui qui n’a jamais été écrit » : réutiliser plutôt que réécrire, traiter la cause racine plutôt que le symptôme, produire le diff fonctionnel le plus court.                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                    |
| J’ai un TDAH (action d’abord)                  | `i-have-adhd` | Action d’abord (commande/chemin/extrait avant la prose), étapes numérotées et limitées, UNE prochaine étape concrète, sans préambule, récapitulatif ni formule de conclusion. Adapté de [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                    |
| CJK concis (文言)                              | `terse-cjk`   | Style ultra-concis en chinois classique.                                                                                                                                                                                                                   | zh (limité par les paramètres régionaux : proposé uniquement lorsque la langue résolue est `zh`) |

Chaque style comporte trois niveaux d’intensité — `lite`, `full`, `ultra` — et chaque niveau se termine par la clause commune de délimitation, qui conserve tels quels les blocs de code, chemins de fichiers, commandes, chaînes d’erreur, URL et identifiants.

#### Fonctionnement de l’injection

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) résout la sélection par rapport au catalogue (les identifiants inconnus et les styles ne correspondant pas aux paramètres régionaux sont ignorés, sans jamais provoquer d’erreur), concatène les instructions sélectionnées dans l’ordre du catalogue, ajoute la clause de délimitation **une seule fois**, puis place le résultat au début du prompt système derrière un marqueur unique d’idempotence (`[OmniRoute Output Styles]`) — toute nouvelle application est sans effet. Lorsqu’une traduction existe pour la langue détectée de la requête, l’instruction localisée est injectée à la place de l’instruction anglaise.

#### Activation

Dans le tableau de bord : **Contexte → Paramètres → Compression** — une ligne par style, avec un bouton d’activation/désactivation et un sélecteur de niveau. Par programmation, la configuration de compression conserve la sélection sous la forme suivante :

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Rétrocompatibilité : l’ancien paramètre combiné `outputMode: "caveman"` fonctionne toujours et correspond à `terse-prose`, avec une injection identique octet par octet à l’ancienne dans chaque langue historique.

Sélection de la langue : lorsque `languageConfig.enabled` est activé, `autoDetect` choisit la langue du dernier message utilisateur (avec le même détecteur que les moteurs d’entrée) ; désactiver `autoDetect` fixe la langue à `defaultLanguage`. Désactivé → anglais.

La matrice styles × langues est verrouillée par `tests/unit/compression/output-styles-i18n-matrix.test.ts` : un nouveau style ne peut pas être publié sans au moins une traduction pt-BR (ou une exception explicite faisant l’objet d’un suivi), et un style existant ne peut pas perdre silencieusement des paramètres régionaux. Pour ajouter un style, consultez [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compression des résultats d’outils

Le module `toolResultCompressor.ts` fournit **5 stratégies de compression spécialisées** pour les résultats d’outils (appels de fonctions, sorties d’agents, résultats de recherche, etc.) :

1. **Compression des résultats de recherche** — Supprime les résultats redondants et conserve les N meilleurs
2. **Compression des lectures de fichiers** — Tronque les fichiers volumineux et préserve les en-têtes/importations
3. **Compression de l’exécution de code** — Ne conserve que les éléments essentiels de stdout/stderr
4. **Compression des requêtes de base de données** — Limite le nombre de lignes et supprime les métadonnées détaillées
5. **Compression des réponses d’API** — Supprime les champs nuls et condense les tableaux

#### Quand l’utiliser

La compression des résultats d’outils est **toujours activée** lorsque des appels d’outils sont présents. Aucune configuration n’est nécessaire.

### Pipeline empilé

Le mode empilé exécute **plusieurs moteurs successivement** — généralement RTK en premier (60 à 90 % d’économies sur la sortie des outils), puis Caveman (30 % d’économies supplémentaires sur le texte restant). Cela permet d’obtenir **78 à 95 % d’économies totales**.

#### Fonctionnement

```
Entrée (1000 tokens)
  → RTK (filtre tenant compte des commandes) → 200 tokens
    → Caveman (suppression du remplissage) → 140 tokens
  → Sortie (140 tokens, 86 % d’économies)
```

#### Quand l’utiliser

Utilisez le mode empilé pour :

- Les workflows utilisant beaucoup d’outils (programmation agentique, recherche)
- Le traitement par lots sensible aux coûts
- Les situations nécessitant une économie maximale de tokens

Configurez-le via la configuration combinée :

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## Remplacements de compression par combo

Vous pouvez remplacer le mode de compression global **pour chaque combo** afin d’affiner le comportement
selon les différents cas d’utilisation :

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

Cela est utile pour :

- **Combos de programmation** : utilisez le mode `aggressive` pour les longues sessions
- **Combos de questions-réponses rapides** : utilisez le mode `lite` pour des réponses rapides
- **Combos utilisant beaucoup d’outils** : utilisez le mode `stacked` pour maximiser les économies
- **Combos de production** : utilisez le mode `cache-aware` pour les fournisseurs prenant en charge la mise en cache

---

## Voir aussi

- [Configuration de l’environnement](../reference/ENVIRONMENT.md) — Variables d’environnement de compression
- [Guide d’architecture](../architecture/ARCHITECTURE.md) — Fonctionnement interne du pipeline de compression
- [Guide de l’utilisateur](../guides/USER_GUIDE.md) — Premiers pas avec la compression
- [Compression RTK](./RTK_COMPRESSION.md) — Filtres RTK, modèle de confiance, porte de vérification et récupération de la sortie brute
- [Moteurs de compression](./COMPRESSION_ENGINES.md) — Caveman, RTK, empilement, API, MCP et tableau de bord
- [Format des règles de compression](./COMPRESSION_RULES_FORMAT.md) — Format JSON des packs de règles
- [Packs linguistiques de compression](./COMPRESSION_LANGUAGE_PACKS.md) — Règles Caveman propres à chaque langue
