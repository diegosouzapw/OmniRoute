# Chaos Mode (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Tableau de bord :** **Mode Chaos** (barre latérale) → `/dashboard/chaos`  
> **API :** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (session du tableau de bord) · `POST /api/skills/collect/chaos` (clé API)  
> **Source :** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Le Mode Chaos envoie **une tâche à plusieurs fournisseurs simultanément** — chaque fournisseur participant
apporte une instance de modèle, et vous obtenez toutes les réponses côte à côte (ou en chaîne). Il s'agit
d'une interface d'exécution multimodèle, et non d'une stratégie de routage : votre trafic
`/v1/chat/completions` habituel n'est jamais affecté.

**Clarification — trois éléments différents comportent « chaos » dans leur nom :**

| Élément                      | Description                                                                                                                                        | Documentation                                |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Mode Chaos**               | La page du tableau de bord et l'API décrites ici : diffuser une tâche vers plusieurs fournisseurs (en parallèle ou en collaboration).              | Ce guide                                     |
| `auto/chaos`                 | Un identifiant de modèle Auto-Combo avec des pondérations de notation par injection de pannes, destiné aux tests de résilience. Rien à configurer. | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Configuration de combo Chaos | Un combo persistant avec `config.chaos.enabled` diffuse la tâche vers un panel avec un modèle juge facultatif (API uniquement).                    | `open-sse/services/autoCombo/chaosEngine.ts` |

## Configuration

1. Ouvrez **Tableau de bord → Mode Chaos** (`/dashboard/chaos`).
2. **Activez-le** — le Mode Chaos est fourni **désactivé par défaut** (`enabled: false` dans
   `src/lib/chaos/chaosConfig.ts`). Lorsqu'il est désactivé, `POST /api/chaos/run` renvoie
   `400 — "Le Mode Chaos n'est pas activé. Activez-le dans Tableau de bord → Mode Chaos."`.
3. Choisissez les participants et les valeurs par défaut (conservés pour chaque instance via le stockage des paramètres) :

   | Champ               | Signification                                                                 | Valeur par défaut / limites                   |
   | ------------------- | ----------------------------------------------------------------------------- | --------------------------------------------- |
   | `enabled`           | Interrupteur principal                                                        | `false`                                       |
   | `defaultMode`       | `parallel` ou `collaborative` (voir ci-dessous)                               | `parallel`                                    |
   | `providerOverrides` | Participation par fournisseur (`providerId`, `modelId` facultatif, `enabled`) | vide = tous les fournisseurs actifs, 200 max. |
   | `systemPrompt`      | Remplacement du prompt système Chaos intégré                                  | facultatif, 10 000 caractères max.            |
   | `timeoutMs`         | Durée maximale de chaque appel de modèle                                      | `120000` (5 000–600 000)                      |
   | `maxTokens`         | `max_tokens` par appel de modèle                                              | `4096` (256–128 000)                          |

4. Lancez un **test directement depuis la page** — le panneau de résultats affiche la réponse,
   l'état et la durée de chaque fournisseur.

## Modes d'exécution

- **`parallel`** — chaque modèle reçoit simultanément la même tâche ; vous recevez toutes les réponses
  indépendamment.
- **`collaborative`** — les modèles s'exécutent **en chaîne** : chacun voit la sortie du modèle précédent et
  doit l'affiner, l'enrichir, la critiquer ou proposer une autre approche. Le champ `summary` de la réponse
  concatène les sorties réussies dans l'ordre de la chaîne (les exécutions parallèles ne comportent pas de `summary`).

## API

### `POST /api/chaos/run` — session du tableau de bord

Authentification par cookie (la session de gestion — voir
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)) ; utilisé par la page du tableau de bord.

```jsonc
// corps
{
  "task": "Comparer les approches de X", // obligatoire
  "providers": ["glm", "kimi"], // filtre facultatif
  "mode": "parallel", // facultatif — remplace defaultMode
  "systemPrompt": "…", // remplacement facultatif
  "maxTokens": 4096, // remplacement facultatif
}
```

### `POST /api/skills/collect/chaos` — clé API

Variante avec jeton Bearer destinée aux appelants externes. La clé doit disposer de l'**autorisation Mode Chaos**
(`chaosModeEnabled`), qui est **désactivée par défaut** — activez-la pour chaque clé dans
**Tableau de bord → Gestionnaire d'API → modifier la clé → autorisations → Mode Chaos**. Le corps est identique à celui ci-dessus.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Comparer les approches de X","mode":"parallel"}'
```

Les deux points de terminaison renvoient la même structure :

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // mode collaboratif uniquement
}
```

## Dépannage

- **`400 Le Mode Chaos n'est pas activé`** — consultez l'étape 2 ci-dessus : l'interrupteur global est désactivé.
- **La clé API est rejetée sur `/api/skills/collect/chaos`** — la clé ne dispose pas de l'autorisation
  `chaosModeEnabled` propre à cette clé (désactivée par défaut ; il s'agit d'un paramètre, pas d'une erreur).
- **Un fournisseur attendu ne figure pas dans les résultats** — vérifiez `providerOverrides` sur la
  page Mode Chaos (un remplacement désactivé l'exclut) et assurez-vous que la connexion au fournisseur est
  active.
