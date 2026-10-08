# Cursor Image Generation (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute expose la **génération d’images** du forfait Cursor sur `POST /v1/images/generations` via le même identifiant de fournisseur que pour le chat : `cursor` (alias `cu`).

| Champ                         | Valeur                                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------------------------ |
| Identifiant `IMAGE_PROVIDERS` | `cursor`                                                                                         |
| Format                        | `cursor-agent-image`                                                                             |
| Authentification              | Même connexion OAuth / par clé API que pour le chat (`provider_connections.provider = "cursor"`) |
| Modèles                       | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                        |

## Pourquoi l’Agent CLI

Le chat Cursor dans OmniRoute utilise `agent.v1.AgentService/Run` (protobuf). Ce chemin **rejette** les outils clients intégrés (shell, écriture, …). La génération d’images est un outil natif de Cursor exécuté par l’**interface en ligne de commande `agent`** sur le siège. Le gestionnaire d’images lance donc `agent` avec une invite verrouillée et un espace de travail temporaire propre à chaque requête (selon la même structure que les passerelles de sièges communautaires), puis renvoie un `b64_json` compatible avec OpenAI.

## Restriction d’accès (Règles strictes nº 15 et nº 17)

Il s’agit du seul format `IMAGE_PROVIDERS` qui lance un processus enfant (le binaire
`agent`). Comme `POST /v1/images/generations` est partagé par environ 40 autres
fournisseurs d’images ne lançant aucun processus, légitimement utilisés par des appelants
distants, la route entière n’est **pas** classée `LOCAL_ONLY` — à la place,
`handleCursorAgentImageGeneration` applique son propre contrôle à l’aide du verdict fiable
`AUTHZ_HEADER_PEER_LOCALITY`, que le pipeline d’autorisation appose sur chaque requête
(à partir du véritable pair TCP, jamais de l’en-tête `Host` falsifiable) : seuls les
appelants `loopback` et `lan` peuvent atteindre le lancement du processus ; tous les
autres (y compris lorsqu’une clé API divulguée est réutilisée via un tunnel public)
reçoivent une réponse `403` avant toute recherche d’identifiants ou tout lancement de
processus. Consultez `src/server/authz/policies/management.ts` pour voir la même
politique appliquée au reste du niveau `LOCAL_ONLY`.

## Le contrôle de concurrence s’effectue au niveau du module (limitation à une seule instance)

`CURSOR_IMG_MAX_CONCURRENT` est appliqué par un compteur/une file d’attente en mémoire,
limité à l’instance du module Node
(`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
Il limite correctement les lancements simultanés d’`agent` au sein d’un même processus
OmniRoute, mais ne se coordonne **pas** entre plusieurs processus/instances partageant
le même siège Cursor (par exemple, dans un déploiement à plusieurs réplicas) — chaque
instance applique sa propre limite indépendante. Pour un déploiement à instance unique
(le cas par défaut), la limite est exacte ; les déploiements avec mise à l’échelle
horizontale doivent conserver une valeur prudente de `CURSOR_IMG_MAX_CONCURRENT` pour
chaque instance ou acheminer le trafic d’images Cursor vers une seule instance.

## Prérequis

1. Un compte Cursor connecté dans le tableau de bord (OAuth ou clé API `crsr_…`).
2. Le binaire Cursor Agent accessible au processus OmniRoute :
   - variable d’environnement `CURSOR_AGENT_BIN=/path/to/agent`, ou
   - `~/.local/bin/agent`, ou
   - `providerSpecificData.agentBin` sur la connexion Cursor.

Réglages facultatifs :

| Variable d’environnement    | Valeur par défaut               | Signification                                 |
| --------------------------- | ------------------------------- | --------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                        | Durée réelle maximale par image               |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                             | Contrôle de concurrence pour le siège partagé |
| `CURSOR_IMG_MODEL`          | (modèle de la requête / `auto`) | Remplace l’option CLI `--model`               |

## Exemple

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

La génération prend généralement 1 à 2 minutes. Privilégiez un chemin réseau interne ; les proxys en périphérie dont le délai d’expiration est d’environ 100 secondes échoueront.

## LiteLLM

Enregistrez un modèle d’image avec `mode: image_generation`, `api_base: http://omniroute:20128/v1` et `model: openai/cursor/auto` (ou simplement `cursor/auto`, selon votre version de LiteLLM).
