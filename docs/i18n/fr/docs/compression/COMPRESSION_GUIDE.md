# 🗜️ Prompt Compression Guide — OmniRoute (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Économisez automatiquement 15 à 95 % sur le contexte éligible. Pour un aperçu rapide, consultez la [section Compression du README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatiquement).

## Aperçu

OmniRoute met en œuvre un pipeline modulaire de compression de prompts qui s'exécute **de manière proactive** avant que les requêtes n'atteignent les fournisseurs en amont. Cela signifie que vos économies de jetons se produisent de manière transparente — aucune modification n'est nécessaire à votre flux de travail.

```
Requête du client
  → Sélecteur de stratégie de compression
    → Remplacement de combo ? → Utiliser le paramètre de combo
    → Seuil de déclenchement automatique ? → Utiliser le mode automatique
    → Mode par défaut ? → Utiliser le paramètre global
    → Désactivé ? → Ignorer la compression
  → Mode de compression sélectionné
    → Désactivé : Aucune compression
    → Lite : Nettoyage sûr des espaces/formatage (~15%)
    → Standard : Suppression des mots de remplissage de type 'homme des cavernes' (~30%)
    → Agressif : Vieillissement de l'historique + résumé (~50%)
    → Ultra : Élagage heuristique + amincissement des blocs de code (~75%)
    → RTK : Filtrage de la sortie terminal/outil sensible aux commandes (plage de 60-90% en amont)
    → Empilé : Pipeline multi-moteurs ordonné, généralement RTK puis Caveman (plage éligible de 78-95%)
  → Requête compressée → Fournisseur
```

---

## Modes de compression

### Désactivé

Aucune compression appliquée. Tous les messages passent sans modification.

### Mode Lite (15 % d'économies, <1 ms de latence)

Le mode le plus sûr — aucun changement sémantique, seulement un nettoyage du formatage :

| Technique                | Description                                                           |
| ------------------------ | --------------------------------------------------------------------- |
| `collapseWhitespace`     | Fusionne les lignes vides consécutives et les espaces de fin de ligne |
| `dedupSystemPrompt`      | Supprime les messages système en double                               |
| `compressToolResults`    | Compresse les sorties verbeuses d'outils/fonctions                    |
| `removeRedundantContent` | Supprime les instructions répétées                                    |
| `replaceImageUrls`       | Raccourcit les URI de données d'image base64                          |

**Idéal pour :** Utilisation permanente, flux de travail critiques pour la sécurité.

### Mode Standard (30 % d'économies)

Inspiré par [Caveman](https://github.com/JuliusBrussee/caveman) — supprime les mots de remplissage et les formulations verbeuses tout en préservant le sens :

- Supprime les mots de remplissage (« please », « I think », « basically », « actually »)
- Condense les phrases verbeuses (« in order to » → « to », « as a result of » → « because »)
- Supprime les tournures de politesse (« Would you mind... », « If you could possibly... »)
- Plus de 30 règles regex optimisées pour les prompts de codage

**Idéal pour :** Flux de travail de codage quotidiens, équipes soucieuses des coûts.

### Mode Agressif (50 % d'économies)

Gestion intelligente de l'historique pour les sessions longues :

- **Vieillissement des messages** — les messages plus anciens sont progressivement compressés
- **Résumé des résultats d'outils** — les sorties d'outils longues sont remplacées par des résumés
- **Gardes d'intégrité structurelle** — assure que les paires `tool_use` + `tool_result` restent cohérentes
- **Conscience de la fenêtre de contexte** — respecte les limites de jetons par modèle

**Idéal pour :** Sessions de débogage prolongées, grandes bases de code.

### Mode Ultra (75 % d'économies)

Compression maximale pour les scénarios critiques en jetons :

- **Élagage heuristique** — supprime les messages en dessous du seuil de pertinence
- **Amincissement des blocs de code** — compresse les exemples de code répétitifs
- **Troncation par recherche binaire** — trouve le point de coupure optimal pour la fenêtre de contexte
- Toutes les fonctionnalités du mode Agressif sont incluses

**Idéal pour :** Lorsque vous atteignez les limites de contexte de manière répétée.

### Mode RTK (plage de 60-90 % en amont)

Le mode RTK est optimisé pour les sorties d'outils verbeuses qui apparaissent dans les sessions d'agents de codage :

- Détecte les classes de commande/sortie telles que `git status`, `git diff`, `git log`, les exécuteurs de tests, les builds TypeScript/Vite/Webpack, ESLint/Biome/Prettier, les audits/installations npm, les logs Docker, la sortie d'infra, et la sortie shell générique
- Applique les packs de filtres JSON depuis `open-sse/services/compression/engines/rtk/filters/`
- Importe les filtres du schéma RTK TOML v1 depuis les fichiers `filters.toml` de projet ou globaux, avec validation de test en ligne et contrôle d'accès pour les fichiers de projet
- Fournit 49 filtres intégrés avec des exemples de vérification en ligne
- Supprime les séquences de contrôle ANSI, les barres de progression, les lignes répétées et le bruit non exploitable
- Préserve les échecs, les erreurs, les avertissements, les fichiers modifiés, les résumés et la fin des sorties longues
- Prend en charge les filtres de projet à accès contrôlé, les filtres globaux et la récupération optionnelle de la sortie brute expurgée

**Idéal pour :** Sessions d'agent avec des transcriptions de shell, build, test, git, grep et sortie de fichier.

### Mode Empilé (plage éligible de 78-95 %)

Le mode empilé exécute plusieurs moteurs de compression dans un ordre déterministe. Le pipeline par défaut est :

```txt
RTK -> Caveman
```

Cet ordre maintient d'abord la sortie du terminal/outil compacte, puis applique la condensation sémantique de Caveman au prompt en langage naturel restant. Les pipelines empilés peuvent être configurés globalement ou via des combos de compression attribués à des combos de routage.

**Idéal pour :** Contexte mixte avec de grands journaux d'outils ainsi que des instructions humaines ou des résumés d'assistant.

---

## Calcul des économies en amont

OmniRoute documente les économies de compression provenant de deux sources : les benchmarks des projets en amont et la composition du moteur propre à OmniRoute.

| Source  | Chiffre du README en amont utilisé ici                                                                                                               |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` de jetons de sortie en moins, `65%` d'économies moyennes de sortie de benchmark, plage de `22-87%`, et `~46%` d'outil de compression d'entrée |
| RTK     | `60-90%` d'économies sur la sortie de commande ; session d'exemple `~118,000 -> ~23,900` jetons, soit `79.7%` d'économies (`~80%`)                   |

Pour les charges utiles d'outils/contextes qui se chevauchent, la combinaison OmniRoute par défaut empile les moteurs :

```txt
RTK -> Caveman
```

Les économies combinées sont multiplicatives, non additives :

```txt
combiné = 1 - (1 - économies RTK) * (1 - économies d'entrée Caveman)
moyenne  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
plage    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Ce chiffre de `78-95%` s'applique lorsque RTK et Caveman peuvent tous deux réduire la même charge utile d'entrée/contexte. Le mode de sortie de réponse de Caveman est distinct : lorsqu'il est activé, utilisez les propres économies de sortie de Caveman (`65%` en moyenne, `~75%` en titre, plage de `22-87%`). Les économies de facturation totales dépendent de votre mix d'invites/sorties.

### Ce que "éligible" signifie réellement

La plage de 15-95% annoncée est réelle, mais elle ne s'applique qu'au contenu **redondant ou verbeux** — lignes d'erreur répétées, un journal de construction qui spamme le même avertissement, un dump `grep`/lecture de fichier surdimensionné. Cela ne signifie **pas** que chaque requête économise autant.

Vérifié empiriquement (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`) : une exécution `stacked` (RTK + Caveman) sur un bloc `tool_result` de type Anthropic contenant 300 lignes d'erreur identiques a produit **95.93% d'économies de jetons / 96.26% d'économies de caractères** — parfaitement dans la plage annoncée. Mais la même exécution de pipeline sur une sortie d'outil normale et non redondante (une liste de correspondances `grep` propre, une courte lecture de fichier, un texte conversationnel ordinaire) produit correctement **des économies quasi nulles**, car il n'y a rien de répétitif à supprimer et `validateCompression()` (`validation.ts`) refuse d'envoyer une réécriture qui supprimerait ou altérerait des blocs de code, des URL, des titres, des versions ou des identifiants de constantes en MAJUSCULES.

C'est un comportement attendu et sûr, pas un bug : une session de codage qui lit/grep principalement des fichiers propres verra des économies totales modestes même avec la compression entièrement activée, tandis qu'une session qui rencontre une boucle défaillante ou un linter bavard verra la plage complète de 78-95% sur ce trafic. N'utilisez pas le faible pourcentage d'économies agrégées d'une seule session comme preuve que la compression est mal configurée — vérifiez d'abord si la sortie de l'outil sous-jacent était réellement redondante.

---

## Visualisation des économies de jetons

```
Sans compression : 47K jetons envoyés au LLM
Avec Lite :          40K jetons envoyés          (15% d'économies — sûr, toujours activé)
Avec Standard :      33K jetons envoyés          (30% d'économies — règles de langage cavernicole)
Avec Agressif :      24K jetons envoyés          (50% d'économies — vieillissement + résumé)
Avec Ultra :         12K jetons envoyés          (75% d'économies — élagage heuristique)
Avec RTK :           19K-5K jetons envoyés       (60-90% d'économies sur la sortie de commande/outil)
Avec Stacked :       10K-2.5K jetons envoyés     (Plage éligible RTK+Caveman de 78-95%)
```

---

## Configuration

### Tableau de bord

Accédez à `Dashboard → Context & Cache` :

- **Caveman** — sélection du mode, packs de langue, aperçu et valeurs par défaut globales
- **RTK** — aperçu du filtre de commande, paramètres de sécurité RTK et catalogue de filtres
- **Compression Combos** — pipelines de moteur nommés assignés à des combos de routage
- **Auto-Trigger Threshold** — active automatiquement la compression lorsque le nombre de jetons dépasse le seuil

### Remplacement par combo

Dans `Dashboard → Context & Cache → Compression Combos`, assignez un combo de compression à un combo de routage :

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Cela vous permet d'utiliser la compression empilée sur les fournisseurs gratuits/de codage tout en conservant le mode lite sur les abonnements payants.

Cette affectation "Remplacement par combo" est un contrôle différent du remplacement du **mode de compression du combo de routage** (Default/Off/Lite/Standard/Aggressive/Ultra) — ce remplacement ne sélectionne pas un pipeline de combo de compression nommé ; il définit simplement le champ `compressionMode` consulté par `resolveCompressionPlan`. Il peut être défini soit sur la carte du combo (`Dashboard → Combos`), soit, depuis le #6760, par combo de routage dans la liste "Assign to routing" sur `Dashboard → Context & Cache → Compression Combos`, juste à côté de la case à cocher d'affectation de pipeline documentée ci-dessus. Les deux interfaces persistent via le même point de terminaison `PUT /api/combos/{id}`.

### Remplacement par requête

Envoyez l'en-tête de requête `x-omniroute-compression` pour remplacer le plan de compression pour une seule requête. Il a la priorité la plus élevée — il l'emporte sur le remplacement du combo de routage, le profil actif, le déclenchement automatique et le panneau par défaut. Les valeurs inconnues sont ignorées (la requête n'est jamais rejetée) et l'interrupteur principal global contrôle toujours tout : lorsque la compression est désactivée globalement, l'en-tête ne peut pas l'activer. Valeurs :

| Valeur        | Effet                                                                                                                         |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Aucune compression pour cette requête.                                                                                        |
| `default`     | Le profil par défaut dérivé du panneau (ignore le profil actif). Les moteurs avec perte sont désactivés.                      |
| `safe`        | Identique à l'omission de l'en-tête : déduplication et repliement des espaces blancs uniquement.                              |
| `allow-lossy` | Conserve le plan d'opérateur de cette requête, y compris les résumés, les filtres de pertinence et les réécritures de style.  |
| `engine:<id>` | Un seul moteur lorsqu'il est activé, par exemple `engine:rtk`. Il s'agit de l'option d'activation par requête pour ce moteur. |
| `<combo>`     | Un combo nommé, correspondant d'abord par nom (insensible à la casse), puis par ID.                                           |

Sans `allow-lossy`, `engine:<id>`, ou un combo nommé, les moteurs avec perte ne sont pas appliqués. La requête bénéficie toujours de la déduplication de session et du repliement des espaces blancs lorsque la compression est activée.

Le plan appliqué est renvoyé dans l'en-tête de réponse `X-OmniRoute-Compression: <mode>; source=<source>`, où `<source>` est l'un des suivants : `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default`, ou `off`.

### API

```bash
# Get compression settings
curl http://localhost:20128/api/settings/compression

# Update compression settings
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Preview a specific RTK/stacked payload
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# List RTK filter packs
curl http://localhost:20128/api/context/rtk/filters

# Test RTK directly with optional command metadata
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Ce qui est protégé

Le moteur de compression **préserve toujours** :

- ✅ Les blocs de code (délimités et en ligne)
- ✅ Les URL et les chemins de fichiers
- ✅ Les structures JSON et les données structurées
- ✅ Les identifiants et les jetons techniques protégés
- ✅ Les expressions mathématiques
- ✅ Les définitions d'appels d'outils/fonctions
- ✅ Les invites système (en mode lite)

La récupération de sortie brute RTK masque les clés API courantes, les jetons d'authentification (bearer tokens), les jetons Slack, les clés d'accès AWS, les mots de passe, les jetons et les secrets avant que quoi que ce soit ne soit persisté.

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

| Phase    | Modes                                                                                                                                                                 | Statut   |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Phase 1  | Off, Lite                                                                                                                                                             | ✅ Livré |
| Phase 2  | Standard, Aggressive, Ultra                                                                                                                                           | ✅ Livré |
| Phase 3  | RTK, Stacked, Compression Combos                                                                                                                                      | ✅ Livré |
| Phase 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                                           | ✅ Livré |
| Phase 4C | Budget de contexte adaptatif ("dial") — moteur de calcul + API (`contextBudget` sur `PUT /api/settings/compression`) + contrôles de mode/politique du tableau de bord | ✅ Livré |

---

## Remerciements

Les règles de compression en mode standard sont inspirées de **[Caveman](https://github.com/JuliusBrussee/caveman)** par **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — le projet viral « pourquoi utiliser beaucoup de jetons quand peu de jetons font l'affaire ». Caveman rapporte `~75%` de jetons de sortie en moins, `65%` d'économies moyennes de sortie de référence, une plage de sortie de `22-87%`, et un outil de compression d'entrée de `~46%`.

Le mode RTK est inspiré de **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** par **[RTK AI](https://github.com/rtk-ai)** — le projet de compression de sortie de commande haute performance pour le filtrage des sorties de terminal, de build, de test, de git et d'outils. RTK rapporte `60-90%` d'économies, avec sa session d'exemple README montrant `~80%` d'économies.

---

## Systèmes de compression avancés

Au-delà des 7 modes standard, OmniRoute inclut plusieurs systèmes de compression avancés qui fonctionnent automatiquement en fonction du contexte.

### Compression consciente du cache

Certains fournisseurs (comme Anthropic avec la mise en cache des invites) prennent en charge la **mise en cache des invites**, ce qui leur permet de mettre en cache des parties de l'invite pour réduire les coûts et la latence. Lorsque la mise en cache est activée, une compression agressive peut en fait **nuire** aux performances car elle modifie les jetons mis en cache, invalidant ainsi le cache.

Le module `cachingAware.ts` résout ce problème en **détectant le contexte de mise en cache** et en **ajustant la stratégie de compression** en conséquence.

#### Comment ça marche

1. **Détecter le contexte de mise en cache** — Scanne le corps de la requête à la recherche de marqueurs `cache_control`
2. **Identifier les fournisseurs de mise en cache** — Vérifie si le fournisseur cible prend en charge la mise en cache
3. **Ajuster la stratégie** — Rétrograde `aggressive`/`ultra` à `standard` pour les fournisseurs de mise en cache
4. **Ignorer l'invite système** — Les invites système sont généralement mises en cache, il ne faut donc pas les compresser
5. **Utiliser des transformations déterministes** — N'utiliser que des transformations qui produisent une sortie cohérente

#### Exemple de code

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Quand l'utiliser

La compression consciente du cache est **toujours activée** — aucune configuration n'est nécessaire. Elle ne s'active que lorsque :

- La requête contient des marqueurs `cache_control`
- Le fournisseur cible prend en charge la mise en cache des invites (Anthropic, OpenAI, etc.)

### Vieillissement progressif

Les longues conversations accumulent de nombreux échanges de messages, mais les échanges plus anciens deviennent moins pertinents. Le module `progressiveAging.ts` **dégrade les messages en fonction de la distance des échanges** :

- **Échanges récents (0-3)** : Conservés tels quels (détail complet)
- **Échanges moyens (4-8)** : Compression légère (espaces blancs, nettoyage du formatage)
- **Anciens échanges (9+)** : Compression Caveman (suppression des remplissages, résumé)
- **Très anciens échanges (20+)** : Fortement résumés ou supprimés

#### Exemple de code

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 3 premiers échanges : verbatim
  light: 8, // Échanges 4-8 : compression légère
  moderate: 20, // Échanges 9-20 : compression caveman
  // Échanges 21+ : résumé intensif
});

// saved = nombre de jetons économisés
```

#### Quand l'utiliser

Le vieillissement progressif est **toujours activé** pour les modes `aggressive` et `ultra`. Il est particulièrement efficace pour :

- Les sessions de codage de longue durée
- Les conversations de plusieurs jours
- Les workflows agentiques avec de nombreux appels d'outils

### Mode de sortie "Homme des cavernes"

Le module `outputMode.ts` injecte des **instructions de prompt système** pour que le
modèle produise lui-même une sortie compressée et concise (un style "homme des cavernes").

#### Comment ça marche

Au lieu de compresser l'entrée, ce mode ajoute un prompt système comme :

> "Répondez en un minimum de mots. Omettez les amabilités. Utilisez des phrases courtes."

Cela fonctionne particulièrement bien pour :

- La génération de code (sortie plus concise = moins de tokens)
- Les questions-réponses rapides (pas besoin d'explications élaborées)
- Le traitement par lots (maximiser le débit)

#### Quand l'utiliser

Le mode de sortie "homme des cavernes" est **optionnel** — configurez-le via la configuration combinée :

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

Le mode de sortie "homme des cavernes" ci-dessus est le **chemin hérité à style unique**. La Phase 4 l'a généralisé
en un catalogue de styles de sortie composables : `OUTPUT_STYLE_CATALOG` dans
`open-sse/services/compression/outputStyles/catalog.ts`. Chaque style est une instruction de prompt système
qui fait en sorte que le modèle produise une sortie moins coûteuse ; les styles peuvent être activés
ensemble et sont injectés dans l'ordre du catalogue.

| Style                                   | `id`          | Ce qu'il fait                                                                                                                                                                                                                                | Langues d'instruction                                                     |
| --------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Prose concise                           | `terse-prose` | Supprime les mots de remplissage/articles/hésitations ; conserve la substance technique exacte. Même texte que le mode de sortie "homme des cavernes" hérité (référencé, non re-tapé).                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                             |
| Moins de code                           | `less-code`   | Échelle YAGNI : le plus petit changement fonctionnel, pas d'abstractions non demandées.                                                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                             |
| Ponytail (développeur senior paresseux) | `ponytail`    | "Le meilleur code est le code jamais écrit" : réutilisation > réécriture, cause racine > symptôme, diff fonctionnel le plus court.                                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                             |
| J'ai un TDAH (action d'abord)           | `i-have-adhd` | Action d'abord (commande/chemin/extrait avant la prose), étapes numérotées et délimitées, UNE prochaine étape concrète, pas de préambule/récapitulatif/clôture. Adapté de [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                             |
| CJK concis (文言)                       | `terse-cjk`   | Style ultra-concis du chinois classique.                                                                                                                                                                                                     | zh (locale-gated : proposé uniquement lorsque la langue résolue est `zh`) |

Chaque style propose trois niveaux d'intensité — `lite`, `full`, `ultra` — et chaque niveau
se termine par la clause de limites partagées, qui conserve les blocs de code, les chemins de fichiers, les commandes,
les chaînes d'erreur, les URL et les identifiants tels quels.

#### Comment fonctionne l'injection

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) résout
la sélection par rapport au catalogue (les identifiants inconnus et les styles non concordants avec la locale sont
ignorés, ce n'est jamais une erreur), concatène les instructions sélectionnées dans l'ordre du catalogue,
ajoute la clause de limites **une seule fois**, et place le résultat en début de prompt système
derrière un marqueur d'idempotence unique (`[OmniRoute Output Styles]`) — une réapplication
ne fait rien. Lorsque la langue de la requête détectée a une traduction, l'instruction localisée
est injectée à la place de l'anglais.

#### Comment activer

Dans le tableau de bord : **Contexte → Paramètres → Compression** — une ligne par style avec un
interrupteur marche/arrêt et un sélecteur de niveau. Par programmation, la configuration de compression persiste
la sélection comme suit :

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Rétrocompatibilité : le paramètre combiné hérité `outputMode: "caveman"` fonctionne toujours et correspond à
`terse-prose`, identique au byte près à l'ancienne injection dans toutes les langues héritées.

Sélection de la langue : avec `languageConfig.enabled` activé, `autoDetect` choisit la
langue du dernier message utilisateur (même détecteur que les moteurs d'entrée) ;
désactiver `autoDetect` fixe `defaultLanguage`. Désactivé → Anglais.

La matrice style × langue est fixée par
`tests/unit/compression/output-styles-i18n-matrix.test.ts` : un nouveau style ne peut pas être livré
sans au moins une traduction pt-BR (ou une exception explicite suivie), et un
style existant ne peut pas perdre silencieusement une locale. Pour ajouter un style, voir
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compression des résultats d'outils

Le module `toolResultCompressor.ts` fournit **5 stratégies de compression spécialisées**
pour les résultats d'outils (appels de fonctions, sorties d'agents, résultats de recherche, etc.) :

1. **Compression des résultats de recherche** — Supprime les résultats redondants, conserve les N meilleurs
2. **Compression de la lecture de fichiers** — Tronque les fichiers volumineux, préserve les en-têtes/imports
3. **Compression de l'exécution de code** — Ne conserve que les sorties stdout/stderr essentielles
4. **Compression des requêtes de base de données** — Limite les lignes, supprime les métadonnées verbeuses
5. **Compression des réponses d'API** — Supprime les champs nuls, condense les tableaux

#### Quand l'utiliser

La compression des résultats d'outils est **toujours activée** lorsque des appels d'outils sont présents. Aucune
configuration n'est nécessaire.

### Pipeline empilé

Le mode empilé exécute **plusieurs moteurs en séquence** — généralement RTK en premier (60-90% d'économies sur la sortie de l'outil), puis Caveman (30% d'économies supplémentaires sur le texte restant). Cela permet d'atteindre **78-95% d'économies totales**.

#### Comment ça marche

```
Entrée (1000 tokens)
  → RTK (filtre sensible aux commandes) → 200 tokens
    → Caveman (suppression des remplissages) → 140 tokens
  → Sortie (140 tokens, 86% d'économies)
```

#### Quand l'utiliser

Utilisez le mode empilé pour :

- Workflows gourmands en outils (codage agentique, recherche)
- Traitement par lots sensible aux coûts
- Lorsque vous avez besoin d'économies maximales de tokens

Configurez via la combinaison :

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

## Surcharges de compression par combo

Vous pouvez surcharger le mode de compression global **par combo** pour affiner le comportement en fonction de différents cas d'utilisation :

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

Ceci est utile pour :

- **Combos de codage** : Utilisez le mode `aggressive` pour les longues sessions
- **Combos de questions-réponses rapides** : Utilisez le mode `lite` pour des réponses rapides
- **Combos riches en outils** : Utilisez le mode `stacked` pour des économies maximales
- **Combos de production** : Utilisez le mode `cache-aware` pour les fournisseurs de mise en cache

---

## Voir Aussi

- [Configuration de l'environnement](../reference/ENVIRONMENT.md) — Variables d'environnement de compression
- [Guide d'architecture](../architecture/ARCHITECTURE.md) — Internes du pipeline de compression
- [Guide de l'utilisateur](../guides/USER_GUIDE.md) — Démarrer avec la compression
- [Compression RTK](./RTK_COMPRESSION.md) — Filtres RTK, modèle de confiance, porte de vérification, récupération de sortie brute
- [Moteurs de compression](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, APIs, MCP, dashboard
- [Format des règles de compression](./COMPRESSION_RULES_FORMAT.md) — Format de pack de règles JSON
- [Packs linguistiques de compression](./COMPRESSION_LANGUAGE_PACKS.md) — Règles Caveman spécifiques à la langue
