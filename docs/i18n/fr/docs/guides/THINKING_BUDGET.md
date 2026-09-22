# Thinking Budget (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇧🇦 [bs](../../../bs/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Tableau de bord :** Paramètres → **IA** → Budget de réflexion  
> **API :** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Source :** `open-sse/services/thinkingBudget.ts`

Le budget de réflexion détermine si OmniRoute **réécrit les paramètres de réflexion/raisonnement du client** avant de transmettre les requêtes aux fournisseurs. Il n’active ni ne désactive la compression, le routage ou le cache des prompts.

## Modes

| Mode                           | Ce que fait OmniRoute                                                                                                             | Quand l’utiliser                                                                                                                                                                                                                                 |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`passthrough`** (par défaut) | Laisse les champs du client inchangés (`reasoning`, `reasoning_effort`, `thinking` de Claude, `thinking_config` de Gemini, etc.). | **Codex / Desktop / tout client qui doit contrôler l’effort et les résumés de raisonnement.** Requis pour afficher les panneaux de réflexion lorsque le client demande `reasoning.summary`.                                                      |
| **`auto`**                     | **Supprime tous** les champs de réflexion/raisonnement du corps de la requête avant son envoi en amont.                           | Uniquement lorsque vous souhaitez délibérément que le **fournisseur** définisse les valeurs par défaut et que vous n’avez **pas** besoin d’une réflexion contrôlée par le client. Ne signifie **pas** « afficher automatiquement la réflexion ». |
| **`custom`**                   | Remplace chaque requête par un budget fixe de jetons de réflexion.                                                                | Limite stricte du nombre de jetons de réflexion pour l’ensemble du trafic.                                                                                                                                                                       |
| **`adaptive`**                 | Ajuste le budget à partir d’un effort de base en fonction du nombre de messages, des outils et de la longueur du prompt.          | Contrôle souple des jetons sans ignorer entièrement l’intention du client.                                                                                                                                                                       |

### Ce que supprime `auto`

Lorsque le mode est `auto`, `stripThinkingConfig()` supprime notamment :

- OpenAI / Responses : `reasoning`, `reasoning_effort`
- Claude : `thinking`, ainsi que `output_config.effort` lorsqu’il est présent
- Gemini : `generationConfig.thinking_config` / `thinkingConfig`

Si un client (par exemple Codex Desktop) a envoyé `reasoning: { effort: "ultra", summary: "detailed" }`, **`auto` supprime cet objet**. Le fournisseur en amont peut malgré tout facturer certains jetons de raisonnement, mais il renvoie souvent des éléments de raisonnement **vides ou uniquement chiffrés** — l’interface utilisateur n’affiche donc aucun flux de réflexion utile.

## Ce que ceci **n’est pas**

| Fonctionnalité                                       | Relation                                                                                                                                                       |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Compression** (Caveman, RTK, empilée, …)           | Pipeline distinct. Fonctionne avec tous les modes de budget de réflexion.                                                                                      |
| **Cache de prompts / sémantique**                    | Distinct. Non affecté par le mode de budget de réflexion.                                                                                                      |
| **Routage combiné / solutions de repli**             | Distinct. Non affecté.                                                                                                                                         |
| **Limites de jetons par clé API / budgets de coûts** | Distinct. Non affecté.                                                                                                                                         |
| **Cache de relecture du raisonnement**               | Réinjection multitour pour les fournisseurs stricts (DeepSeek, Kimi, Qwen-thinking, …). Ce n’est pas la même chose que « afficher la réflexion » dans Desktop. |
| **Déchiffrement de `encrypted_content`**             | **Impossible.** Les blocs de raisonnement privés d’OpenAI/Codex sont opaques. OmniRoute ne les déchiffre jamais (#7095 / #7176 / #7304).                       |

## Réflexion visible (clients Codex / Responses)

Pour qu’un client affiche le texte de réflexion, **toutes** les conditions suivantes doivent être remplies :

1. Mode Thinking Budget = **`passthrough`** (ou personnalisé/adaptatif, à condition qu’il préserve suffisamment les demandes de résumé pour le chemin utilisé).
2. Le client demande un résumé, par exemple Codex `model_reasoning_summary = "detailed"` / `auto` (et non `none`).
3. Le fournisseur en amont diffuse effectivement `response.reasoning_summary_text.*` (ou un `reasoning.summary` non vide sur l’élément).

Si vous obtenez uniquement une « réflexion privée chiffrée », cela signifie que :

- le mode était **`auto`** (la demande du client a été supprimée), ou
- le fournisseur en amont a renvoyé `encrypted_content` sans texte de résumé (limitation du fournisseur ; OmniRoute ne peut afficher qu’un texte de remplacement, pas le texte en clair).

## Exemples d’API

```bash
# Lire
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Recommandé pour la visibilité de la réflexion dans Codex / Desktop
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Schéma (`updateThinkingBudgetSchema`) : `mode` ∈ `passthrough|auto|custom|adaptive` ; `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier` facultatifs.

### Persistance / redémarrage

La valeur est stockée sous la clé de paramètres `thinkingBudget` et chargée au démarrage du processus (`hydrateThinkingBudgetConfig`). Après une modification via la base de données ou certains chemins hors API, **redémarrez le processus OmniRoute** afin que le singleton en mémoire corresponde aux données sur disque.

## Liste de contrôle pour les opérateurs

- [ ] Utilisateurs de Codex / Desktop : mode = **passthrough**
- [ ] Conservez la compression activée si vous souhaitez économiser des jetons sur les **messages**, et non en supprimant la réflexion
- [ ] Ne vous attendez pas à ce que `auto` « affiche davantage de réflexion »
- [ ] Les résumés uniquement chiffrés relèvent du comportement du **fournisseur** ; le mode passthrough ne peut pas les déchiffrer

## Documentation connexe

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — cache `reasoning_content` multi-tour
- [USER_GUIDE.md](./USER_GUIDE.md) — onglets du tableau de bord des paramètres
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — points de terminaison des paramètres
