# OmniRoute Tiers — User Guide (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TIERS.md) · 🇪🇹 [am](../../../am/docs/guides/TIERS.md) · 🇸🇦 [ar](../../../ar/docs/guides/TIERS.md) · 🇦🇿 [az](../../../az/docs/guides/TIERS.md) · 🇧🇬 [bg](../../../bg/docs/guides/TIERS.md) · 🇧🇩 [bn](../../../bn/docs/guides/TIERS.md) · 🇨🇿 [cs](../../../cs/docs/guides/TIERS.md) · 🇩🇰 [da](../../../da/docs/guides/TIERS.md) · 🇩🇪 [de](../../../de/docs/guides/TIERS.md) · 🇬🇷 [el](../../../el/docs/guides/TIERS.md) · 🇪🇸 [es](../../../es/docs/guides/TIERS.md) · 🇪🇪 [et](../../../et/docs/guides/TIERS.md) · 🇮🇷 [fa](../../../fa/docs/guides/TIERS.md) · 🇫🇮 [fi](../../../fi/docs/guides/TIERS.md) · 🇮🇪 [ga](../../../ga/docs/guides/TIERS.md) · 🇮🇳 [gu](../../../gu/docs/guides/TIERS.md) · 🇳🇬 [ha](../../../ha/docs/guides/TIERS.md) · 🇮🇱 [he](../../../he/docs/guides/TIERS.md) · 🇮🇳 [hi](../../../hi/docs/guides/TIERS.md) · 🇭🇷 [hr](../../../hr/docs/guides/TIERS.md) · 🇭🇺 [hu](../../../hu/docs/guides/TIERS.md) · 🇦🇲 [hy](../../../hy/docs/guides/TIERS.md) · 🇮🇩 [id](../../../id/docs/guides/TIERS.md) · 🇳🇬 [ig](../../../ig/docs/guides/TIERS.md) · 🇮🇹 [it](../../../it/docs/guides/TIERS.md) · 🇯🇵 [ja](../../../ja/docs/guides/TIERS.md) · 🇬🇪 [ka](../../../ka/docs/guides/TIERS.md) · 🇰🇭 [km](../../../km/docs/guides/TIERS.md) · 🇮🇳 [kn](../../../kn/docs/guides/TIERS.md) · 🇰🇷 [ko](../../../ko/docs/guides/TIERS.md) · 🇱🇹 [lt](../../../lt/docs/guides/TIERS.md) · 🇱🇻 [lv](../../../lv/docs/guides/TIERS.md) · 🇮🇳 [ml](../../../ml/docs/guides/TIERS.md) · 🇮🇳 [mr](../../../mr/docs/guides/TIERS.md) · 🇲🇾 [ms](../../../ms/docs/guides/TIERS.md) · 🇲🇹 [mt](../../../mt/docs/guides/TIERS.md) · 🇲🇲 [my](../../../my/docs/guides/TIERS.md) · 🇳🇵 [ne](../../../ne/docs/guides/TIERS.md) · 🇳🇱 [nl](../../../nl/docs/guides/TIERS.md) · 🇳🇴 [no](../../../no/docs/guides/TIERS.md) · 🇮🇳 [or](../../../or/docs/guides/TIERS.md) · 🇮🇳 [pa](../../../pa/docs/guides/TIERS.md) · 🇵🇭 [phi](../../../phi/docs/guides/TIERS.md) · 🇵🇱 [pl](../../../pl/docs/guides/TIERS.md) · 🇵🇹 [pt](../../../pt/docs/guides/TIERS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TIERS.md) · 🇷🇴 [ro](../../../ro/docs/guides/TIERS.md) · 🇷🇺 [ru](../../../ru/docs/guides/TIERS.md) · 🇱🇰 [si](../../../si/docs/guides/TIERS.md) · 🇸🇰 [sk](../../../sk/docs/guides/TIERS.md) · 🇸🇮 [sl](../../../sl/docs/guides/TIERS.md) · 🇷🇸 [sr](../../../sr/docs/guides/TIERS.md) · 🇸🇪 [sv](../../../sv/docs/guides/TIERS.md) · 🇰🇪 [sw](../../../sw/docs/guides/TIERS.md) · 🇮🇳 [ta](../../../ta/docs/guides/TIERS.md) · 🇮🇳 [te](../../../te/docs/guides/TIERS.md) · 🇹🇭 [th](../../../th/docs/guides/TIERS.md) · 🇹🇷 [tr](../../../tr/docs/guides/TIERS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TIERS.md) · 🇵🇰 [ur](../../../ur/docs/guides/TIERS.md) · 🇺🇿 [uz](../../../uz/docs/guides/TIERS.md) · 🇻🇳 [vi](../../../vi/docs/guides/TIERS.md) · 🇳🇬 [yo](../../../yo/docs/guides/TIERS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TIERS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TIERS.md)

---

OmniRoute organise les 352 fournisseurs pris en charge en 3 niveaux économiques. Chaque
requête les parcourt dans l’ordre jusqu’à ce que l’un d’eux réponde avec succès — vous
obtenez ainsi la réponse viable la moins chère sans jamais avoir à écrire de code de repli.

## Niveau 1 — Abonnement

**Fournisseurs auxquels vous êtes déjà abonné.** OmniRoute utilise chaque parcelle de quota avant
son expiration.

| Fournisseur                       | Pourquoi le niveau 1                                    |
| --------------------------------- | ------------------------------------------------------- |
| Claude Code OAuth                 | Anthropic Pro/Team — forfait, souvent inutilisé         |
| OpenAI Codex (abonnement ChatGPT) | Plus/Team inclut un quota Codex                         |
| GitHub Copilot                    | Par utilisateur — le quota est réinitialisé chaque mois |
| Cursor IDE                        | Quota du forfait Pro                                    |
| Antigravity / Devin Desktop       | Quotas intégrés                                         |

**Stratégie** : acheminez d’abord ici chaque requête correspondant aux points forts du modèle.
Le suivi des quotas surveille les réinitialisations imminentes, et la stratégie combinée
`reset-aware` établit les priorités en conséquence. Pour acheminer d’abord vers le niveau 1 et ne passer
aux niveaux payants qu’une fois le quota épuisé, utilisez l’identifiant `auto/thrifty` — ou `auto/subscription`
pour rester sur la capacité incluse dans le forfait et échouer sans basculement dans le cas contraire. Consultez
[Acheminement privilégiant les abonnements](../routing/SUBSCRIPTION_LADDER.md).

## Niveau 2 — Économique

**Fournisseurs facturés au jeton à moins de 1 $/1 M de jetons.** Réservés aux charges de travail volumineuses
ou utilisés lorsque les quotas du niveau 1 atteignent leurs limites.

| Fournisseur                        | Prix (entrée/sortie)    | Points forts                   |
| ---------------------------------- | ----------------------- | ------------------------------ |
| DeepSeek V4 Pro                    | 0,27 $ / 1,10 $ par 1 M | Code, raisonnement             |
| GLM-4.5                            | 0,60 $ / 2,20 $ par 1 M | Contexte long                  |
| MiniMax M1                         | 0,20 $ / 1,10 $ par 1 M | Rapidité                       |
| Qwen Coder                         | 0,30 $ / 1,20 $ par 1 M | Code                           |
| OpenRouter (optimisé pour le prix) | variable                | Plus de 100 modèles, dynamique |

**Stratégie** : la combinaison `cost-optimized` sélectionne le modèle au coût par jeton le plus faible qui satisfait
le filtre de capacités de la tâche (vision, mode JSON, outils, contexte maximal).

## Niveau 3 — Gratuit

**Fournisseurs sans frais** — offres gratuites, programmes de crédits, quotas OAuth quotidiens.

| Fournisseur      | Quota gratuit / crédits                              |
| ---------------- | ---------------------------------------------------- |
| Kiro AI          | Offre Claude gratuite (usage raisonnable généreux)   |
| OpenCode Free    | Aucune authentification, limites de débit généreuses |
| Qoder            | OAuth gratuit                                        |
| Google Vertex AI | 300 $ de crédits pour les nouveaux comptes           |
| Amazon Q         | Offre gratuite pour les utilisateurs AWS             |
| Pollinations     | API publique ouverte                                 |
| Cloudflare AI    | Offre gratuite Workers AI                            |

**Stratégie** : la combinaison `auto` avec un plafond budgétaire achemine les requêtes ici lorsque les niveaux 1 et 2 échouent
ou lorsque `useFreeOnly=true` est défini. Les fournisseurs gratuits ont souvent des
limites de débit plus strictes — le disjoncteur les rétablit après le délai de temporisation.

## Configuration des niveaux

Tableau de bord → **Niveaux** → attribuez vos fournisseurs. Les valeurs par défaut (issues de `tierDefaults.json`) sont
pertinentes ; modifiez-les si vous souhaitez donner la priorité à des abonnements précis ou exclure certains fournisseurs.

La notation à 16 facteurs d’Auto-Combo prend également le niveau en compte. Consultez
[`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md).

## Télémétrie

Tableau de bord → **Utilisation** affiche le nombre de jetons consommés par niveau et par jour. Utilisez ces données pour :

- Confirmer que le niveau 1 est pleinement utilisé (sinon, vous gaspillez la valeur de votre abonnement)
- Identifier les modèles du niveau 2 les plus souvent sélectionnés (regroupez-les pour n’en conserver qu’un ou deux)
- Vérifier que le niveau 3 permet d’économiser sur les charges de travail de test et d’exploration

## Scénarios courants

### Charge de travail entièrement gratuite

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "costInv": 0.5, "tierPriority": 0.3 } } }
}
```

Favorise fortement le niveau 3 ; n’utilise le niveau 2 que si le niveau 3 est indisponible.

### Abonnement prioritaire avec repli économique

```json
{
  "strategy": "priority",
  "targets": [
    { "provider": "claude-code-oauth", "weight": 1 },
    { "provider": "deepseek", "weight": 1 },
    { "provider": "kiro", "weight": 1 }
  ]
}
```

Liste ordonnée explicite correspondant au niveau 1 → niveau 2 → niveau 3.
