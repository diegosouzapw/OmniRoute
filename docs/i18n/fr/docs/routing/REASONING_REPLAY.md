# Reasoning Replay Cache (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Source de vérité :** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Dernière mise à jour :** 2026-06-28 — v3.8.40

OmniRoute capture le `reasoning_content` de l’assistant produit par les modèles en mode réflexion et le réinjecte de manière transparente dans les requêtes à plusieurs tours lorsque le fournisseur en amont l’exige. Cela élimine les erreurs HTTP 400 que les fournisseurs stricts renvoient lorsque l’historique de conversation d’un client ne contient pas le raisonnement du tour précédent.

## Pourquoi ce mécanisme existe

Plusieurs fournisseurs proposant un mode réflexion rejettent un tour de suivi si le **message précédent de l’assistant n’inclut pas le `reasoning_content` d’origine**. Le fournisseur en amont renvoie une erreur 400 accompagnée de messages tels que :

```
Paramètre incorrect : le reasoning_content du mode réflexion doit être renvoyé à l’API.
```

Cependant, les clients habituels (Cursor, Cline, Roo Code, OpenAI SDK) suppriment le `reasoning_content` de l’historique qu’ils renvoient. OmniRoute le restaure à partir d’un cache côté serveur afin que la requête reçue par le fournisseur en amont soit cohérente. Le ticket #1628 a introduit la persistance hybride en mémoire/SQLite afin que le cache survive aux redémarrages du processus.

## Architecture

```
Tour N (génération par l’assistant) :
  → la réponse contient reasoning_content + tool_calls
  → si requiresReasoningReplay(provider, model) : cacheReasoningFromAssistantMessage()
      écrit (mémoire + DB), avec chaque tool_call.id comme clé
  → transmet la réponse au client (qui peut conserver ou non le raisonnement)

Tour N+1 (le client envoie une requête de suivi) :
  → le traducteur détecte : requiresReasoningReplay(provider, model) === true
  → pour chaque message de l’assistant avec tool_calls et sans reasoning_content :
      lookupReasoning(toolCalls[0].id) → mémoire → DB
      succès → msg.reasoning_content = cached; recordReplay()
      échec  → msg.reasoning_content = "" (solution de repli historique pour les anciennes versions de DeepSeek)
  → le service en amont reçoit un historique cohérent → aucune erreur 400
```

La capture s’effectue dans `open-sse/handlers/chatCore.ts` (à deux endroits, aux deux sites d’appel de `cacheReasoningFromAssistantMessage`). La réinjection s’effectue dans `open-sse/translator/index.ts`, après la coercition du schéma, mais avant la répartition.

Les tours de l’assistant ordinaires (sans appel d’outil) utilisent un autre type de clé : `buildAssistantMessageCacheKey()` calcule l’empreinte du périmètre de la session ainsi que de la transcription normalisée au format OpenAI jusqu’à ce tour, car DeepSeek exige le raisonnement de _chaque_ tour précédent dès que `tools` est présent. Pour les cibles de l’API Responses (par exemple `opencode-go/deepseek-v4-flash`, acheminé vers `/responses`), le corps de la requête en amont contient `input`, et non `messages`. Ainsi, `translateRequest()` (`open-sse/translator/index.ts`) transmet, via une option de rappel, la transcription pivot dont il a calculé l’empreinte, et les sites de capture calculent l’empreinte de cette même transcription. La passe de réinjection Responses s’exécute sur le pivot OpenAI pour chaque format source, de sorte que les clients Anthropic Messages (Claude → OpenAI → Responses) bénéficient eux aussi de la réinjection.

## Stockage — Mémoire hybride + SQLite

Le chemin critique utilise une `Map` en mémoire (LRU selon l’ordre de création), adossée à une table SQLite pour la récupération après incident et la visibilité dans le tableau de bord.

| Couche  | Implémentation                                   | Objectif                                                          |
| ------- | ------------------------------------------------ | ----------------------------------------------------------------- |
| Mémoire | `Map` dans `open-sse/services/reasoningCache.ts` | Recherches rapides, éviction des plus anciennes à partir de 200   |
| BDD     | Table `reasoning_cache` (`src/lib/db/`)          | Persistance entre les redémarrages, alimentation des statistiques |

Les écritures sont effectuées dans les deux couches. Les lectures consultent d’abord la mémoire, puis se rabattent sur la BDD (les résultats trouvés dans la BDD sont réintégrés en mémoire). Les défaillances de la BDD ne sont pas fatales — le cache en mémoire continue de servir le chemin critique.

**Valeurs par défaut :**

- TTL : `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Nombre maximal d’entrées en mémoire : `200` (`MAX_MEMORY_ENTRIES`)
- Éviction : les entrées au `createdAt` le plus ancien en premier

## Schéma de la base de données

Migration : `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Index : `expires_at`, `provider`, `model`, `created_at`. `expires_at` est stocké sous forme de secondes depuis l’époque Unix ; la couche SELECT normalise les anciennes valeurs textuelles au moyen de `EXPIRES_AT_EPOCH_SQL`.

## Détection du fournisseur / modèle

La réinjection est activée lorsque `requiresReasoningReplay(provider, model)` renvoie `true`. La fonction vérifie deux listes dans `open-sse/services/reasoningCache.ts`.

**Identifiants de fournisseurs (correspondance exacte, insensible à la casse) :**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Motifs d'expressions régulières pour les modèles (insensibles à la casse) :**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` et `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, suffixe `-free` facultatif)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

L'ajout d'un nouveau fournisseur/modèle strict implique de l'ajouter à l'une de ces listes et d'écrire un test unitaire vérifiant l'injection de la réinjection. La description de la PR doit citer la chaîne d'erreur 400 exacte provenant du service en amont qui a motivé la modification.

## API REST

Le cache expose deux points de terminaison sous `src/app/api/cache/reasoning/route.ts`. Tous deux nécessitent une authentification de gestion (`isAuthenticated` depuis `@/shared/utils/apiAuth`).

| Méthode | Point de terminaison                                      | Description                                                          |
| ------- | --------------------------------------------------------- | -------------------------------------------------------------------- |
| GET     | `/api/cache/reasoning`                                    | Statistiques + entrées paginées                                      |
| GET     | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Liste filtrée (`limit` limité à l'intervalle `[1, 200]`)             |
| DELETE  | `/api/cache/reasoning`                                    | Tout effacer (mémoire + BDD) et réinitialiser les compteurs hit/miss |
| DELETE  | `/api/cache/reasoning?provider=deepseek`                  | Effacer uniquement les entrées d'un fournisseur                      |
| DELETE  | `/api/cache/reasoning?toolCallId=call_abc`                | Supprimer une seule entrée                                           |

**Structure de la réponse GET :**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Notes opérationnelles

- **Nettoyage :** `cleanupReasoningCache()` purge les entrées mémoire expirées et exécute `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Les workers de contrôle d'intégrité l'appellent périodiquement.
- **Récupération après un plantage :** après un redémarrage, la mémoire est vide, mais la BDD conserve les entrées non expirées. La première recherche pour un `tool_call_id` donné produit un hit en BDD ; les recherches suivantes produisent des hits en mémoire.
- **Pas de raisonnement, pas de cache :** `cacheReasoningFromAssistantMessage` renvoie `0` lorsque le message de l'assistant ne contient aucun champ `reasoning_content` / `reasoning`, de sorte que les réponses sans réflexion ne coûtent rien.
- **L'écriture est également conditionnée :** les deux sites d'appel dans `chatCore.ts` (sans streaming et avec streaming) n'appellent `cacheReasoningFromAssistantMessage()` que lorsque `requiresReasoningReplay(provider, model)` vaut `true` — le même prédicat que celui vérifié côté lecture. Les installations qui n'utilisent jamais de fournisseur nécessitant une réinjection n'ont plus à supporter le coût de l'écriture, de la mise à jour de l'index et du bloc try/catch pour chaque réponse contenant un raisonnement.
- **Fournisseurs non stricts :** lorsque `requiresReasoningReplay` vaut `false` et que le format cible est OpenAI, le traducteur **supprime** tout champ `reasoning_content` des messages sortants — OpenAI Chat Completions ne l'accepte pas.

## Voir aussi

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — disjoncteurs, délais de récupération, verrouillages de modèles
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnostic des erreurs 400 en amont
- Source : `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migration : `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Route d’API : `src/app/api/cache/reasoning/route.ts`
- Problème d’origine : #1628
