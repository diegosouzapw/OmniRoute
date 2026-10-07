# Extending the Compression Pipeline (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **TL;DR** : le moteur de compression d’OmniRoute est **extensible** — vous pouvez enregistrer des moteurs personnalisés, fournir des packs linguistiques pour de nouvelles langues et composer des pipelines empilés. Ce guide explique comment procéder.

**Guides connexes :**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Vue d’ensemble complète du pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registre des moteurs et moteurs intégrés
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Moteur RTK et filtres personnalisés
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Référence du format des packs de règles

---

## Vue d’ensemble

Le système de compression comporte **3 points d’extension** :

| Point d’extension       | Cas d’utilisation                                                                 | Difficulté |
| ----------------------- | --------------------------------------------------------------------------------- | ---------- |
| **Moteur personnalisé** | Ajouter un tout nouvel algorithme de compression (p. ex., un résumeur spécialisé) | Avancée    |
| **Pack linguistique**   | Ajouter la prise en charge d’une nouvelle langue naturelle (p. ex., hindi, arabe) | Moyenne    |
| **Pipeline empilé**     | Composer des moteurs existants dans un ordre personnalisé                         | Débutante  |

```
┌─────────────────────────────────────────────────────────────┐
│                    Stratégie de compression                  │
│                                                              │
│   Messages d’entrée ──▶ getEffectiveMode() ──▶ mode         │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   Moteur    Moteur   Moteur    engines[]   │
│                   RTK       Lite     Caveman   enchaînés   │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             Sortie compressée              │
└─────────────────────────────────────────────────────────────┘

Le sélecteur de stratégie est BASÉ SUR LE MODE : chaque requête sélectionne UN mode
(rtk / lite / standard / aggressive / ultra / stacked / off).
Seul le mode "stacked" enchaîne plusieurs moteurs de manière séquentielle.
Le mode de déclenchement automatique par défaut est "lite" (et non une chaîne de priorité à 3 niveaux).
```

---

## Écriture d’un moteur de compression personnalisé

L’interface du moteur (`open-sse/services/compression/engines/types.ts`) constitue le contrat que chaque moteur doit respecter. Elle comporte 5 méthodes obligatoires.

### L’interface `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Identifiant unique du moteur
  name: string; // Nom d’affichage
  description: string; // Brève description
  icon: string; // Icône (emoji ou URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Peut être utilisé dans un pipeline empilé
  stackPriority: number; // Ordre dans les pipelines empilés (valeur inférieure = exécution plus tôt)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Exemple minimal : moteur de gestion des espaces

Le moteur le plus simple possible — supprimer les espaces superflus des messages.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Diviser selon les délimiteurs de blocs de code et préserver les espaces à l'intérieur
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Ne pas modifier les blocs de code
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Appliquer uniquement au texte
    })
    .join("");
}

const whitespaceEngine: CompressionEngine = {
  id: "whitespace",
  name: "Whitespace Stripper",
  description: "Removes extra whitespace and blank lines",
  icon: "📝",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 100, // Exécuter APRÈS caveman/rtk

  metadata: {
    id: "whitespace",
    name: "Whitespace Stripper",
    description: "Removes extra whitespace and blank lines",
    inputScope: "messages",
    targetLatencyMs: 5,
    supportsPreview: true,
    stable: true,
  },

  apply(body, options) {
    return this.compress(body, options?.config);
  },

  compress(body, config = {}) {
    let originalLength = 0;
    let compressedLength = 0;

    // Parcourir le tableau de messages — gérer à la fois le contenu textuel et multipartie
    const compressedBody = (body.messages || []).map((msg) => {
      if (typeof msg.content === "string") {
        originalLength += msg.content.length;
        let compressed = msg.content
          .replace(/[ \t]+/g, " ")
          .replace(/\n{3,}/g, "\n\n")
          .replace(/^\s+|\s+$/gm, "");
        compressedLength += compressed.length;
        return { ...msg, content: compressed };
      }
      // Contenu multipartie : parcourir les parties et compresser uniquement les parties textuelles
      if (Array.isArray(msg.content)) {
        const newParts = msg.content.map((part) => {
          if (part.type === "text" && typeof part.text === "string") {
            originalLength += part.text.length;
            let compressed = part.text
              .replace(/[ \t]+/g, " ")
              .replace(/\n{3,}/g, "\n\n")
              .replace(/^\s+|\s+$/gm, "");
            compressedLength += compressed.length;
            return { ...part, text: compressed };
          }
          return part; // préserver image_url, tool_use, etc.
        });
        return { ...msg, content: newParts };
      }
      return msg;
    });

    return {
      body: { ...body, messages: compressedBody },
      stats: {
        originalTokens: Math.ceil(originalLength / 4),
        compressedTokens: Math.ceil(compressedLength / 4),
        savingsPercent: originalLength > 0 ? 100 * (1 - compressedLength / originalLength) : 0,
        techniques: ["whitespace-collapse"],
        engineId: "whitespace",
      },
    };
  },

  getConfigSchema() {
    return [
      {
        key: "preserveCodeBlocks",
        type: "boolean",
        label: "Preserve code blocks",
        defaultValue: true,
        description: "Don't touch whitespace inside ```code``` blocks",
      },
    ];
  },

  validateConfig(config) {
    if (config.preserveCodeBlocks !== undefined && typeof config.preserveCodeBlocks !== "boolean") {
      return { valid: false, errors: ["preserveCodeBlocks must be a boolean"] };
    }
    return { valid: true, errors: [] };
  },
};

// Enregistrer globalement
registerCompressionEngine(whitespaceEngine);
````

### Où placer les moteurs personnalisés

```
~/.omniroute/compression/engines/my-engine.ts    # Niveau utilisateur
<project>/compression-engines/my-engine.ts        # Niveau projet (chargé au démarrage)
```

Ou chargez-les par programmation depuis un plugin :

```ts
// Dans votre plugin
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // Le SDK du plugin expose les hooks onRequest / onResponse / onError. Enregistrer le
  // moteur lors du chargement du module du plugin (ou au premier onRequest) ; le désenregistrer
  // depuis votre propre procédure de nettoyage.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Lors du nettoyage :
// unregisterCompressionEngine("my-engine");
```

### Tester votre moteur

Enregistrez votre moteur dans un plugin ou une fonction de démarrage. Une fois enregistré, le moteur sera disponible
dans le sélecteur de stratégie via son `id`. Testez l'intégration en l'intégrant à un pipeline empilé :

---

## Création de packs linguistiques

La compression de style télégraphique utilise des **packs de règles propres à chaque langue** pour gérer les mots de remplissage, les formulations prudentes et les tournures verbeuses dans chaque langue naturelle. OmniRoute est fourni avec **6 packs linguistiques** : `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Structure d’un pack

Un pack linguistique est un répertoire de **fichiers JSON** situé sous `open-sse/services/compression/rules/<language>/` :

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Formules de politesse, précautions, courtoisie
│   ├── context.json         # Règles de réduction du contexte
│   ├── dedup.json           # Règles de déduplication
│   ├── structural.json      # Ponctuation, mise en forme
│   └── ultra.json           # Règles de compression agressive
├── es/  (même structure)
├── fr/  (même structure)
├── de/  (même structure)
├── ja/  (même structure)
└── pt-BR/ (même structure)
```

### Anatomie d’une règle

Chaque règle présente la structure suivante (issue de `open-sse/services/compression/ruleLoader.ts`) :

```ts
interface FileRule {
  name: string; // Nom lisible par l’utilisateur (kebab-case)
  pattern: string; // Motif d’expression régulière JavaScript
  replacement?: string; // Texte remplaçant la correspondance
  replacementMap?: Record<string, string>; // OU table clé→remplacement
  flags?: string; // Indicateurs d’expression régulière (généralement "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Ignorer en dessous de cette intensité
  description?: string; // Documentation
}
```

### Exemple : ajout de règles de mots de remplissage en hindi

```json
{
  "language": "hi",
  "category": "filler",
  "rules": [
    {
      "name": "polite_opener",
      "pattern": "\\b(?:नमस्ते|नमस्कार|आदरणीय)\\b[,!\\s]*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Supprimer les formules d’introduction polies comme « नमस्ते »"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Supprimer les mots de remplissage équivalant à « actually »"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Supprimer « please » en hindi"
    }
  ]
}
```

### Validation

Les packs de règles sont validés par rapport à `_schema.json` lors du chargement. Un pack dont la structure est incorrecte ne pourra pas être chargé et générera une erreur dans les journaux :

```
RULE_LOADER: la validation du pack "hi/filler.json" a échoué :
  - rules.0.pattern: Expression régulière non valide
  - rules.1.context: doit être l’une des valeurs suivantes [all, user, system, assistant]
```

La validation s’exécute automatiquement lors du chargement d’un pack (par rapport à `_schema.json`) ; un
pack non valide est rejeté et l’erreur ci-dessus est consignée dans les journaux. Il n’existe aucun script
`npm run` distinct pour valider les packs — chargez le pack (par exemple, en démarrant le serveur ou en
exécutant le chemin de compression) et surveillez les journaux.

### Chargement d’un pack linguistique personnalisé

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Ou placez-le dans un emplacement reconnu :

```
~/.omniroute/compression/rules/hi/filler.json  # Niveau utilisateur
<project>/.compression/rules/hi/filler.json   # Niveau projet
```

### Bonnes pratiques pour les packs linguistiques

1. **Commencez par `filler`** — ce sont les règles ayant le plus d’impact
2. **Utilisez `minIntensity`** pour réserver les règles agressives à certains niveaux — cela protège contre une compression excessive
3. **Incluez des cas de test** — ajoutez un tableau `tests[]` dans le JSON pour vérifier le comportement
4. **L’ordre est important** — les premières règles sont appliquées en premier ; placez les règles ayant le plus d’impact en tête
5. **Soyez prudent avec `replacement`** — une chaîne vide est généralement appropriée ; n’introduisez jamais de nouveau contenu

### Stratégie de traduction

Lors de la localisation de packs de règles vers une nouvelle langue :

1. **Traduisez les noms des règles** — ils apparaissent dans la sortie de débogage
2. **Adaptez les motifs d’expression régulière** — une traduction directe échoue souvent (les limites de mots diffèrent)
3. **Testez-les sur de vraies conversations** — le pack doit être sûr lorsqu’il est appliqué à des entrées réelles
4. **Respectez les conventions culturelles** — les packs japonais, par exemple, contiennent davantage de formules honorifiques superflues que les packs anglais

---

## Pipelines empilés

Un **pipeline empilé** exécute plusieurs moteurs en séquence, la sortie de chaque moteur alimentant le suivant. C'est ainsi que `mode: stacked` fonctionne en interne.

### Fonctionnement de l'empilement

```
Entrée (10 000 tokens)
        │
        ▼
   ┌──────────┐
   │  Moteur  │  priorité 10
   │  A       │  ──▶ sortie : 6 000 tokens (-40 %)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Moteur  │  priorité 50
   │  B       │  ──▶ sortie : 2 400 tokens (-60 %)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Moteur  │  priorité 100
   │  C       │  ──▶ sortie : 1 200 tokens (-80 %)
   └────┬─────┘
        │
        ▼
Sortie finale (1 200 tokens, ~88 % d'économies cumulées)
```

Lorsque `mode: "stacked"` est sélectionné, les moteurs s'exécutent séquentiellement dans l'ordre spécifié dans le tableau `pipeline`.
La sortie du moteur N devient l'entrée du moteur N+1.

### Modes de compression

OmniRoute sélectionne **UN mode par requête** en fonction de la configuration, des seuils de déclenchement automatique et des substitutions propres aux combinaisons.
Les modes disponibles sont définis dans `open-sse/services/compression/types.ts` (type `CompressionMode`) :

| Mode         | Moteurs               | Cas d'utilisation                                                                                                                                                                                                                |
| ------------ | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Aucun                 | Désactiver toute compression                                                                                                                                                                                                     |
| `rtk`        | RTK uniquement        | Sessions contenant principalement des sorties de commandes (plus de 80 % d'économies)                                                                                                                                            |
| `lite`       | Lite uniquement       | Compression prudente (rapide, sûre)                                                                                                                                                                                              |
| `standard`   | Caveman               | Compression de texte avec des packs linguistiques                                                                                                                                                                                |
| `aggressive` | Caveman + Aggressive  | Compression agressive du texte + passe finale agressive                                                                                                                                                                          |
| `ultra`      | Ultra                 | Compression maximale (avec perte, en dernier recours). Peut être acheminée via le moteur SLM **LLMLingua-2** lorsque `ultra.modelPath` est défini (retour au traitement basé sur des règles lorsque le modèle est indisponible). |
| `stacked`    | Pipeline personnalisé | Composer les moteurs dans n'importe quel ordre (voir ci-dessous)                                                                                                                                                                 |

> Outre les moteurs associés aux modes ci-dessus, le registre fournit également des moteurs empilables spécialisés —
> **CCR**, **headroom**, **ionizer** et **session-dedup** — documentés dans
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

La sélection du mode est déterminée par `getEffectiveMode()` dans `open-sse/services/compression/strategySelector.ts` :

1. Si la compression est désactivée : `"off"`
2. S'il existe une substitution propre à la combinaison : utiliser la substitution
3. Si le seuil de déclenchement automatique est dépassé : utiliser `autoTriggerMode` (valeur par défaut : `"lite"`)
4. Sinon : utiliser `defaultMode`

### Pipeline empilé par défaut

Lorsque `mode: "stacked"` est explicitement configuré, le pipeline par défaut se compose comme suit :

1. **RTK** — supprime le bruit des sorties de commandes (~80 % d'économies sur les sorties de terminal)
2. **Caveman** — supprime les mots de remplissage et rend le texte plus concis (~46 % sur le texte restant)
3. **Lite** — passe finale de suppression des espaces superflus et de déduplication

Cette composition permet de réaliser **78 à 95 % d'économies** sur les sessions utilisant intensivement des outils.

### Configuration des pipelines empilés

Dans la configuration de la combinaison :

```json
{
  "compression": {
    "mode": "stacked",
    "pipeline": [
      { "engine": "rtk", "config": { "intensity": "aggressive" } },
      { "engine": "caveman", "config": { "intensity": "full" } },
      { "engine": "lite", "config": {} }
    ]
  }
}
```

Vous pouvez omettre des moteurs, en ajouter des personnalisés ou modifier leur ordre.

### Transmission d'état

Les moteurs peuvent lire les métadonnées du contexte de la requête (dans `options`) :

```ts
compress(body, config) {
  // Lire les métadonnées provenant des moteurs précédents
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Les métadonnées sont **en lecture seule** — les moteurs ne peuvent pas modifier le contexte de la requête, seulement leur propre corps de sortie.

### Pièges liés à l'ordre d'exécution

| Ordre des moteurs                         | Effet                                                                                                       |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                      | **Recommandé** (supprime d'abord le bruit, puis traite le langage et enfin les espaces superflus)           |
| Lite → RTK → Caveman                      | Mauvais — Lite supprime les espaces de la sortie brute, ce qui fait échouer la reconnaissance de motifs RTK |
| Caveman → RTK                             | Mauvais — Caveman peut réécrire le texte d'une manière que RTK ne reconnaît pas                             |
| Tout ordre avec `tool_results` en premier | Meilleur — les sorties d'outils constituent le contenu le plus bruyant                                      |

### Quand NE PAS empiler

L'empilement n'est pas toujours préférable :

- **Messages simples** (sans sortie d'outil) — Caveman ou Lite seul suffit
- **Sensibilité aux coûts** — chaque moteur ajoute environ 5 à 50 ms de latence
- **Outils spécifiques** — RTK seul suffit généralement pour les sorties de shell

### Création d'un pipeline personnalisé

Il n’existe pas de registre de pipelines nommés. Un pipeline empilé est simplement un **tableau d’étapes en ligne** transmis à `applyStackedCompression()` (exporté depuis `@omniroute/open-sse/services/compression/strategySelector`) :

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Lorsque vous ne fournissez pas de pipeline, la valeur par défaut est `rtk(standard) → caveman(full)`.

Pour le piloter depuis la configuration, définissez `mode: "stacked"` et fournissez le tableau d’étapes sous `stackedPipeline` (lu depuis `config.stackedPipeline`) :

```json
{
  "compression": {
    "mode": "stacked",
    "stackedPipeline": [
      { "engine": "rtk", "intensity": "aggressive" },
      { "engine": "caveman", "intensity": "full" }
    ]
  }
}
```

---

## Politique de synchronisation avec les projets en amont

Les moteurs de compression d'OmniRoute mentionnent plusieurs projets en amont dans le README
(« inspiré par RTK, Caveman, LLMLingua-2, Troglodita »). Une question fréquente des contributeurs
est la suivante : **lorsque le projet RTK en amont ajoute un nouveau filtre d'outil ou que Caveman ajoute un pack
de règles, comment cela parvient-il à OmniRoute ?** Cette section fournit la réponse de référence.

### Copies intégrées au dépôt ou implémentations indépendantes

| Moteur                       | Relation avec le projet en amont                                                                                                                                 | Emplacement                                                         |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Réimplémentation indépendante** (inspirée du projet, et non une copie)                                                                                         | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Réimplémentation indépendante** (inspirée du projet)                                                                                                           | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Principalement interne ; seul le codec `gcf/` est **réellement intégré au dépôt** depuis `gcf-typescript` (MIT, avec marquage SPDX, profil générique uniquement) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Inspirés de ces projets (à l'origine des moteurs `llmlingua` + `session-dedup`)                                                                                  | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Point essentiel : **RTK et Caveman sont des implémentations TypeScript en salle blanche des
_idées_ (règles de filtrage, packs de règles), et non des arborescences de code source intégrées au dépôt.** Il n'existe aucune
copie du projet en amont depuis laquelle effectuer un `git pull` — c'est précisément pour cette raison que le README indique
« inspiré par » plutôt qu'« inclus ».

### Comment les améliorations en amont sont intégrées

Il n'existe **aucun suivi automatisé des versions en amont ni aucun libellé `compression-sync`**
— et ce, délibérément. Puisque les moteurs sont des réimplémentations, un filtre RTK
ou un pack de règles Caveman provenant du projet en amont n'est pas intégré sous forme de code ; il est **reformulé comme une nouvelle
règle ou un nouveau filtre dans le format propre à OmniRoute** (voir
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) et ajouté au cas par cas via
une PR ordinaire. Les points d'extension ci-dessus (moteur personnalisé, pack linguistique, filtre RTK)
constituent les moyens approuvés pour contribuer à l'un d'entre eux.

Exemples récents suivant exactement ce processus :

- Filtres RTK pour les sorties de compilation Gradle et `dotnet` (v3.8.42)
- Filtres RTK pour kubectl / docker-build / composer / gh (#2824)
- Pack linguistique indonésien pour Caveman (#3975), ainsi que des packs allemand / français / japonais / chinois

### Headroom (proxy de compression des entrées)

Headroom est **entièrement interne** — un instantané épinglé du codec `gcf` intégré au dépôt, accompagné
des couches `smartcrusher` / `toon` / `tabular` propres à OmniRoute. Il n'existe aucun projet en amont actif
à suivre au-delà de la copie intégrée au dépôt ; les mises à jour de `gcf` sont effectuées
manuellement lorsque le codec change, puis validées à nouveau par rapport au seuil de budget de compression
(`check:compression-budget`).

### Proposer une amélioration inspirée d'un projet en amont

1. **N'intégrez pas le code au dépôt** — reformulez la règle ou le filtre en amont dans le format d'OmniRoute.
2. Ajoutez-le via le point d'extension correspondant ci-dessous (pack linguistique, filtre RTK ou
   moteur personnalisé).
3. Référencez le projet en amont dans la description de la PR (attribution), plutôt que de
   copier son code source soumis à une licence.
4. Incluez des tests et vérifiez que le contrôle `check:compression-budget` réussit toujours.

---

## Ajout d’un style de sortie

Les styles de sortie (voir le [tableau du catalogue dans le guide](./COMPRESSION_GUIDE.md#output-styles-catalog))
sont l’équivalent, côté réponse, des moteurs d’entrée : au lieu de compresser ce que vous
envoyez, ils demandent au modèle de produire une sortie moins coûteuse. Le registre est
`OUTPUT_STYLE_CATALOG` dans `open-sse/services/compression/outputStyles/catalog.ts`, et
**une entrée du catalogue constitue l’intégralité de la fonctionnalité** : l’injecteur, le panneau de paramètres du tableau de bord,
la persistance et la télémétrie énumèrent tous le catalogue — aucune autre liste n’est à mettre à jour.

1. **Ajoutez une entrée à `OUTPUT_STYLE_CATALOG`** avec `id`, `label`, `description` et les
   trois `levels` en anglais (`lite`, `full`, `ultra`). Chaque niveau doit se terminer par
   `${SHARED_BOUNDARIES}` afin que le code, les chemins, les commandes, les erreurs et les URL restent inchangés.
   Le texte des instructions doit être **statique et déterministe** pour chaque
   `(id, level, language)` — `${SHARED_BOUNDARIES}` est la seule interpolation autorisée.
2. **Traduisez-la.** Fournissez au minimum un bloc `pt-BR` sous `i18n` ; `ponytail` et
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) constituent la structure de référence. Un style délibérément
   monolingue définit plutôt `locale` (comme `terse-cjk` → `zh`) et n’est alors
   proposé que pour cette locale.
3. **Mettez à jour la protection de la matrice** — ajoutez les langues du style à `BASELINE_LANGUAGES` dans
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Le contrôle rejette tout nouveau style
   non limité par une locale qui ne dispose pas des traductions requises, sauf s’il comporte une
   entrée `KNOWN_ENGLISH_ONLY` explicite avec un ticket de suivi.
4. **Ajoutez un test propre au style** sur le modèle de
   `tests/unit/compression/i-have-adhd-catalog.test.ts` : structure du catalogue, clause de
   limites pour chaque niveau et assertion de référence vérifiant que chaque traduction est rédigée dans sa propre
   langue plutôt que copiée depuis l’anglais.
5. **Attribution** : si le style est adapté d’un projet en amont, créditez-le dans un
   commentaire source sur l’entrée (par ex. `i-have-adhd` → ayghri/i-have-adhd, MIT) — selon la même
   règle que dans « Proposer une amélioration inspirée d’un projet en amont » ci-dessus.

Aucune modification de l’interface utilisateur, du schéma ou de la télémétrie n’est nécessaire — ces surfaces sont générées à partir du catalogue.

---

## Bonnes pratiques

### Développement de moteurs

1. **Implémentez toujours `validateConfig`** — les moteurs sans validation provoquent des échecs silencieux
2. **Définissez un `targetLatencyMs` réaliste** — utilisé par le sélecteur de stratégie pour choisir les moteurs
3. **Utilisez `getConfigSchema` pour le tableau de bord** — ne masquez jamais la configuration aux utilisateurs
4. **Prenez en charge `stackable: true` si votre moteur est pur** — les moteurs ayant des effets de bord ne doivent pas être empilés
5. **Écrivez des tests en ligne** — les moteurs doivent pouvoir être vérifiés en moins de 1 s

### Développement de packs linguistiques

1. **Commencez avec l’intensité `lite`** — vos règles doivent être sûres au niveau le plus faible
2. **Utilisez `context` pour limiter la portée des règles** — les règles réservées à `user` ne peuvent pas affecter accidentellement les invites système
3. **Évitez de capturer les clés JSON** — `\\bword\\b` peut trouver une correspondance dans du JSON et endommager les données structurées
4. **Testez les cas limites** — entrée vide, Unicode, texte RTL, émojis
5. **Utilisez les packs existants comme modèles** — `en/filler.json` est l’exemple le plus abouti

### Conception du pipeline

1. **Profilez avant d’optimiser** — effectuez d’abord des mesures avec `compression_stats`
2. **Préférez la composition à la réimplémentation** — étendez les règles Caveman avant d’écrire un nouveau moteur
3. **Documentez la justification de l’ordre** — expliquez dans un commentaire pourquoi le moteur A précède le moteur B
4. **Testez les 3 niveaux d’intensité** — `lite` est rapide mais avec pertes, `ultra` est lent mais précis

---

## Référence : moteurs intégrés

| ID du moteur         | Empilable | stackPriority par défaut | Cibles                              |
| -------------------- | --------- | ------------------------ | ----------------------------------- |
| `lite`               | Oui       | 5                        | messages, tool_results              |
| `rtk`                | Oui       | 10                       | tool_results                        |
| `standard` (caveman) | Oui       | 20                       | messages, tool_results, code_blocks |
| `aggressive`         | Oui       | 30                       | messages                            |
| `ultra`              | Oui       | 40                       | messages, code_blocks               |

### Voir aussi

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Vue d’ensemble du pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Référence du registre des moteurs
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Spécification du format des règles
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Détails des packs linguistiques
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Moteur RTK et filtres personnalisés
- Source : `open-sse/services/compression/` (117 fichiers, ~250 Ko)
