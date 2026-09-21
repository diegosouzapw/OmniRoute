# AgentRouter Setup Guide (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) est un relais compatible avec Anthropic qui revend
l'accès à Claude et à d'autres modèles, souvent à des tarifs inférieurs à ceux de l'API Anthropic directe. Il est
conçu comme un remplacement immédiat de `ANTHROPIC_BASE_URL` pour le client officiel Claude Code ;
il n'accepte donc que le trafic correspondant à la signature réseau de Claude Code (User-Agent spécifique,
indicateurs `anthropic-beta`, en-têtes du SDK Stainless, etc.).

## Démarrage rapide — utiliser le fournisseur `agentrouter` natif (recommandé)

Pour la plupart des utilisateurs, **aucune configuration particulière n'est requise**. OmniRoute intègre un
fournisseur `agentrouter` avec la signature réseau complète de Claude Code déjà configurée (voir
`open-sse/config/providerRegistry.ts` → `agentrouter`). Pour l'utiliser :

1. Ouvrez **Tableau de bord → Fournisseurs → Ajouter un fournisseur**.
2. Sélectionnez **AgentRouter** dans la liste.
3. Collez votre clé API `sk-...` et enregistrez.

C'est tout — aucune variable d'environnement ni aucun type de fournisseur personnalisé. Les modèles intégrés
incluent `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` et
`deepseek-v3.2`.

La suite de ce guide présente la **méthode avancée** : l'utilisation du type de fournisseur
`anthropic-compatible-cc-*`. Utilisez-la lorsque vous avez besoin d'un contrôle plus précis
sur la signature réseau — par exemple, pour vous connecter à d'autres relais de type AgentRouter
qui ne figurent pas encore dans le registre natif des fournisseurs, ou pour remplacer
l'URL de base, le chemin de chat ou l'ensemble d'en-têtes.

---

## Avancé : connexion via le type de fournisseur compatible avec Claude Code

OmniRoute prend également en charge AgentRouter (et les relais similaires) via le type de fournisseur
**compatible avec Claude Code** (`anthropic-compatible-cc-*`), qui communique avec
l'API Anthropic Messages en utilisant la signature réseau appropriée. Un fournisseur générique
`openai-compatible-chat` pointant vers `https://agentrouter.org`
ne fonctionnera **pas** — le WAF en amont rejette les requêtes qui ne ressemblent pas à celles de Claude
Code.

---

## Prérequis

- Un compte AgentRouter et une clé API. Les nouvelles inscriptions bénéficient de crédits gratuits via le lien d'affiliation
  figurant dans le fichier [README](../README.md) du projet.
- Une instance OmniRoute exécutée avec l'indicateur de fonctionnalité `ENABLE_CC_COMPATIBLE_PROVIDER` activé
  (voir ci-dessous).

## 1. Activer le type de fournisseur compatible avec CC

Le type de fournisseur compatible avec Claude Code est protégé par un indicateur de fonctionnalité, car il
envoie du trafic qui reproduit fidèlement celui du client officiel Claude Code. Activez-le en
définissant une variable d'environnement avant de démarrer OmniRoute :

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Exemple avec Docker :

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Après le redémarrage, le tableau de bord affiche une option **Ajouter un fournisseur compatible avec Claude Code**
en plus des parcours existants compatibles avec OpenAI et Anthropic.

## 2. Créer le fournisseur dans le tableau de bord

1. Ouvrez **Tableau de bord → Fournisseurs → Ajouter un fournisseur**.
2. Choisissez **Ajouter un fournisseur compatible avec Claude Code** (visible uniquement lorsque l'indicateur ci-dessus est activé).
3. Remplissez les champs :

| Champ          | Valeur                                                                          |
| -------------- | ------------------------------------------------------------------------------- |
| Nom            | `AgentRouter` (ou tout autre libellé)                                           |
| Préfixe        | `agentrouter` (alias convivial affiché dans les journaux et le tableau de bord) |
| URL de base    | `https://agentrouter.org`                                                       |
| Chemin de chat | `/v1/messages?beta=true` (valeur par défaut — laissez-la telle quelle)          |

> L'identifiant canonique du modèle utilise toujours l'ID complet du nœud fournisseur
> (`anthropic-compatible-cc-{uuid}/{model}`). Le **Préfixe** est uniquement un alias
> d'affichage résolu par `src/lib/usage/callLogs.ts` afin de rendre les journaux plus lisibles.

4. (Facultatif) Collez votre clé API dans le champ **Valider**, puis cliquez sur **Vérifier** afin de
   confirmer la connectivité avant l'enregistrement.
5. Cliquez sur **Ajouter**.

Une fois le fournisseur créé, ouvrez-le et ajoutez une **Connexion** avec votre clé API AgentRouter
(`sk-...`). Le `test_status` de la connexion devrait passer à `active`.

## 3. Utilisez-le via un combo ou directement

Référencez le modèle en utilisant le préfixe de votre fournisseur comme espace de noms :

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

L’ID de modèle canonique `anthropic-compatible-cc-{uuid}/claude-opus-4-6` fonctionne également
et c’est celui qui apparaît dans la base de données et la configuration des combos.

Vous pouvez aussi l’ajouter à un combo pour bénéficier du routage, du repli et de la gestion des quotas, comme avec tout autre
fournisseur.

---

## Détails de l’empreinte réseau

À titre de référence, la passerelle compatible cc envoie les éléments suivants lors de chaque requête
en amont (voir `open-sse/services/claudeCodeCompatible.ts`) :

| En-tête                                               | Valeur                                                                                                                      |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                       | `Bearer <api-key>`                                                                                                          |
| `User-Agent`                                          | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                    |
| `anthropic-version`                                   | `2023-06-01`                                                                                                                |
| `anthropic-beta`                                      | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                    |
| Option bêta de masquage du raisonnement par connexion | Ajoute `redact-thinking-2026-02-12` pour les services en amont qui exigent spécifiquement des flux de raisonnement masqués  |
| Option de raisonnement résumé par connexion           | Ajoute `display: "summarized"` aux requêtes de raisonnement CC Compatible qui ne définissaient pas déjà un mode d’affichage |
| `anthropic-dangerous-direct-browser-access`           | `true`                                                                                                                      |
| `x-app`                                               | `cli`                                                                                                                       |
| `X-Stainless-*`                                       | Divers en-têtes du SDK Stainless (langage, version du package, système d’exploitation, architecture, etc.)                  |

C’est ce qui permet aux requêtes de passer le WAF / la liste blanche des clients du service en amont.

---

## Dépannage

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Votre requête ne
correspondait pas à l’empreinte réseau de Claude Code. Cela se produit lorsque le fournisseur est configuré
en tant que `openai-compatible-chat` au lieu de `anthropic-compatible-cc`, ou lorsque
l’option `ENABLE_CC_COMPATIBLE_PROVIDER=true` n’a pas été définie au démarrage.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
« Jeton non valide ». L’empreinte réseau est correcte, mais la clé API est refusée. Générez une
nouvelle clé dans le tableau de bord AgentRouter et mettez à jour la connexion.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — Le mécanisme de modération d’AgentRouter a rejeté le contenu de la requête, ou l’offre
associée à la clé n’autorise pas le modèle demandé. Essayez une autre invite ou un autre modèle ;
contactez l’assistance AgentRouter si une invite inoffensive est systématiquement bloquée.

**`[400]: content-blocked` uniquement sur certains modèles** — La plupart des offres AgentRouter n’autorisent
qu’un sous-ensemble de modèles (par exemple `claude-opus-4-6`). Les autres ID de modèle renvoient
`unauthorized_client_error`, même si la clé est valide. Vérifiez les modèles couverts par
votre offre dans le tableau de bord AgentRouter.

**`Invalid JSON response from provider (reset after Ns)` dans les journaux omniroute** —
Le service en amont a renvoyé un corps qui n’est pas au format JSON (généralement une page d’erreur HTML du WAF).
Cela signifie généralement que la requête n’a jamais atteint le backend d’AgentRouter — vérifiez à nouveau que
l’ID du fournisseur commence par `anthropic-compatible-cc-` (notez le tiret final —
voir `CLAUDE_CODE_COMPATIBLE_PREFIX` dans `open-sse/services/claudeCodeCompatible.ts`)
et que l’indicateur de fonctionnalité est activé.

**`unauthorized client detected` / page d’erreur HTML alors qu’un fournisseur AgentRouter
existe déjà** — vous avez probablement **plusieurs** fournisseurs AgentRouter
et votre requête est dirigée vers le mauvais. Si un ancien fournisseur créé manuellement
`anthropic-compatible-*` (sans `cc`) ou `openai-compatible-chat-*` a été
créé avec le préfixe `agentrouter`, il peut être propriétaire des ID de modèle `agentrouter/<model>`
(et les combos peuvent le référencer par son ID de nœud), de sorte que le trafic est dirigé vers ce fournisseur —
qui envoie un User-Agent générique et se fait rejeter — au lieu du fournisseur
`agentrouter` intégré qui fournit déjà la bonne empreinte réseau. Vérifiez vers quelle cible le
modèle est réellement résolu dans les journaux omniroute (la balise `ROUTING` affiche
`agentrouter/<model> → <providerId>/<model>`) ; si `<providerId>` n’est pas
`agentrouter`, centralisez la configuration sur le fournisseur natif : faites pointer les combos vers
`agentrouter/<model>` (providerId `agentrouter`) et supprimez les fournisseurs compatibles
en double. Le fournisseur natif ne nécessite aucune configuration de l’empreinte réseau ni aucun
`customUserAgent`.

---

## Voir aussi

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Notes sur l’intégration du fournisseur Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Catalogue des fournisseurs avec offre gratuite
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Implémentation de la transmission d’images
