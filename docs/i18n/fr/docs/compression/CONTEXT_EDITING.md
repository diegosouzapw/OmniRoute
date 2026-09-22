# Delegated Context Editing (Anthropic) (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

L’**édition du contexte** déléguée est une fonctionnalité de gestion du contexte propre à Claude. Contrairement aux moteurs de
compression locaux d’OmniRoute (Caveman, RTK, LLMLingua, pipelines empilés) — qui réécrivent le corps de la requête
_avant_ qu’il ne quitte le proxy — l’édition du contexte demande au **fournisseur** de supprimer les blocs obsolètes
d’utilisation d’outils / de résultats d’outils de sa propre fenêtre de contexte active. OmniRoute se contente d’ajouter un
paramètre au corps (`context_management.edits[]`) ; Claude effectue la suppression proprement dite en fonction de son propre tokenizer.

Il s’agit par nature d’une capacité déléguée : les autres fournisseurs rejettent ce paramètre. OmniRoute la limite donc
strictement à Claude et aux relais compatibles avec Claude Code.

Sources de référence : `open-sse/config/contextEditing.ts` (identifiants de stratégie, injection dans le corps, extraction
de la télémétrie), `open-sse/executors/base.ts` (contrôle de l’injection + repli en cas d’erreur 400) et
`open-sse/services/compression/types.ts` (structure de la configuration + valeur par défaut).

## Fonctionnement de `clear_tool_uses`

OmniRoute injecte une seule modification dans le corps sortant des messages Anthropic :

```json
{
  "context_management": {
    "edits": [
      {
        "type": "clear_tool_uses_20250919",
        "trigger": { "type": "input_tokens", "value": 100000 },
        "keep": { "type": "tool_uses", "value": 3 }
      }
    ]
  }
}
```

- `type: "clear_tool_uses_20250919"` — l’identifiant daté de la stratégie Anthropic (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — lorsque les tokens d’entrée de la requête dépassent ce seuil, Claude commence à
  supprimer les anciennes paires utilisation/résultat d’outil (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, valeur par défaut d’Anthropic).
- `keep.value: 3` — les N paires utilisation/résultat d’outil les plus récentes sont conservées intactes
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

La version bêta est signalée au moyen de l’en-tête `anthropic-beta: context-management-2025-06-27`, qu’OmniRoute
émet déjà pour les requêtes Claude.

L’injection est effectuée par `applyContextEditingToBody()` et est **idempotente** : si une modification `clear_tool_uses`
existe déjà dans le corps (ajoutée lors d’un appel précédent ou fournie par le client), le corps reste
inchangé. Si une modification `clear_thinking_20251015` est également présente, OmniRoute effectue un tri stable afin de placer la
modification `clear_thinking` en premier, car Anthropic exige que `clear_thinking` précède
`clear_tool_uses` dans le tableau `edits[]`.

## L’option d’activation propre à chaque combinaison

L’édition du contexte est **désactivée par défaut** et doit être activée explicitement. L’option est un simple booléen inclus dans la
configuration de compression :

- Clé de paramètre : `contextEditing.enabled` (camelCase — **pas** `context_editing` / `context-editing`).
- Type : `ContextEditingConfig { enabled: boolean }` dans
  `open-sse/services/compression/types.ts`.
- Valeur par défaut : `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Schéma Zod : `contextEditingConfigSchema` dans `src/shared/validation/compressionConfigSchemas.ts`.
- Stockage : persisté avec le reste des paramètres de compression (normalisés dans
  `src/lib/db/compression.ts`).

Dans le tableau de bord, l’option se trouve dans le centre de compression
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) et renvoie
`{ contextEditing: { enabled: … } }` via `saveSettings()`. Comme elle est intégrée à l’objet des
paramètres de compression, elle se combine avec le profil de compression propre à chaque combinaison au lieu de constituer une
surface entièrement indépendante — la configuration contient uniquement l’indicateur d’activation/désactivation ; tous les seuils (`trigger`,
`keep`) correspondent aux constantes documentées ci-dessus.

## Filtrage réservé à Claude

L’injection ne se produit que pour les relais Claude authentiques ou compatibles avec Claude Code. La condition dans
`open-sse/executors/base.ts` est la suivante :

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — véritable clé Anthropic/OAuth.
- `isClaudeCodeCompatible(this.provider)` — relais dont l’identifiant de fournisseur commence par le
  préfixe `anthropic-compatible-cc-` (ils annoncent une compatibilité avec Claude Code et sont donc les relais
  les plus susceptibles d’accepter la fonctionnalité bêta). Voir `open-sse/services/provider.ts`.

Sont délibérément **exclus** :

- `claude-web` — un relais de navigateur dont le format de requête `create_conversation_params` ne reçoit jamais
  `context_management`.
- Les relais génériques `anthropic-compatible-*` (sans le préfixe `-cc-`) — des points de terminaison tiers dont
  la prise en charge de la fonctionnalité bêta est incertaine.

Les fournisseurs autres que Claude ne reçoivent jamais le paramètre `context_management`, même lorsque l’option est activée.

## Repli en cas d’erreur 400 / couverture des relais

Un relais compatible avec Claude peut annoncer la fonctionnalité bêta tout en rejetant le paramètre `context_management`
avec une erreur HTTP 400. Afin de réduire progressivement les fonctionnalités au lieu de faire échouer la requête, l’exécuteur supprime le
paramètre et réessaie la même URL **une seule fois** :

```ts
if (
  response.status === HTTP_STATUS.BAD_REQUEST &&
  contextEditing?.enabled &&
  !contextEditingDisabled &&
  transformedBody?.context_management !== undefined
) {
  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  if (/context[_-]management|context editing/i.test(errText)) {
    contextEditingDisabled = true;
    delete transformedBody.context_management;
    let retryBody = JSON.stringify(transformedBody);
    if (isClaudeCodeCompatible(this.provider) || this.provider === "claude") {
      retryBody = await signRequestBody(retryBody);
    }
    response = await fetch(url, { ...fetchOptions, body: retryBody });
  }
}
```

Comportement :

1. Ce mécanisme ne se déclenche que lors d’une erreur `400`, lorsque l’édition du contexte est activée et que le corps contient effectivement
   `context_management`.
2. Le corps de la réponse 400 est lu via un `clone()` afin que la réponse d’origine reste intacte si aucune correspondance
   n’est trouvée.
3. Le texte de l’erreur doit correspondre à `/context[_-]management|context editing/i` — une erreur 400 sans rapport (par ex.
   `max_tokens must be >= 1`) ne déclenche **pas** le repli ; l’erreur d’origine est propagée.
4. En cas de correspondance, le mécanisme définit `contextEditingDisabled = true` (ce qui empêche toute nouvelle injection si un nouveau
   `transformedBody` est ensuite construit pour une URL de nouvelle tentative/de repli), supprime `context_management`,
   signe à nouveau le corps pour Claude et les relais compatibles avec Claude Code (`signRequestBody`), puis réessaie la
   même URL une seule fois.

Claude authentique inclut la fonctionnalité bêta dans `ANTHROPIC_BETA_BASE` et n’emprunte pas ce chemin de repli.

## Télémétrie `applied_edits`

Après une réponse de Claude, OmniRoute enregistre la quantité de contexte que le fournisseur a réellement supprimée. Cette information n’est
**pas** transmise en flux continu — elle est extraite au mieux du corps de la réponse non diffusée en continu et
n’affecte jamais la réponse (les échecs de télémétrie sont ignorés).

- Extraction : `extractContextEditingTelemetry(responseBody)` dans `open-sse/config/contextEditing.ts`.
  Cette fonction recherche `applied_edits` à trois emplacements (par précaution face aux différentes structures de réponse) :
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Champs lus dans chaque entrée : `cleared_input_tokens` et `cleared_tool_uses`
  (snake_case, format natif d’Anthropic), avec recours à leurs équivalents camelCase `clearedInputTokens` / `clearedToolUses`.
- Renvoie `null` lorsqu’aucun tableau `applied_edits` n’est trouvé ou que rien n’a effectivement été supprimé.

La structure du reçu est `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
L’enregistrement s’effectue dans `open-sse/handlers/chatCore.ts` (limité à `provider === "claude"`) via
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), qui écrit une ligne d’analyse de compression
avec les étiquettes suivantes :

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = le nombre de jetons d’entrée supprimés
- `request_id` suffixé par `::context-editing`

Ainsi, la suppression déléguée apparaît dans les analyses de compression aux côtés des moteurs locaux, sous
l’étiquette de moteur `context-editing`, et peut être distinguée des économies réalisées par RTK/Caveman/LLMLingua.

## Relation avec les moteurs de compression locaux

| Aspect                   | Moteurs locaux (Caveman / RTK / LLMLingua / empilés)    | Édition de contexte déléguée                                                      |
| ------------------------ | ------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Où cela s’exécute        | Dans OmniRoute, avant que la requête ne quitte le proxy | Chez le fournisseur (Claude), côté serveur                                        |
| Ce qui est modifié       | Texte du prompt / contexte / résultat d’outil           | Anciens blocs d’utilisation/résultat d’outil                                      |
| Fournisseurs concernés   | Tous les fournisseurs                                   | `claude` + `anthropic-compatible-cc-*` uniquement                                 |
| Activation               | Paramètres du mode de compression                       | `contextEditing.enabled`                                                          |
| Mode de défaillance      | Poursuite sans compression (texte d’origine)            | Repli en cas d’erreur 400 : suppression du paramètre, puis une nouvelle tentative |
| Télémétrie des économies | `engine: <engine id>`                                   | `engine: "context-editing"`                                                       |

Les deux approches sont complémentaires : les moteurs locaux compressent les octets envoyés par OmniRoute ; l’édition de contexte permet à
Claude d’élaguer le contexte actif au fil des échanges. Elles peuvent être activées simultanément.

## Voir aussi

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — registre des moteurs et moteurs de compression
  locaux
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — compression des commandes/sorties d’outils
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — compression des descriptions MCP et
  réduction de la cardinalité des outils
- Source : `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
