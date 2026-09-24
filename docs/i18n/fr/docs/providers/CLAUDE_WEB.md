# Providers — Claude Web (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇧🇦 [bs](../../../bs/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` envoie des requêtes de chat au format OpenAI par l’intermédiaire d’une session de navigateur `claude.ai`
authentifiée. L’exécuteur normalise le cookie fourni, détermine une organisation authentifiée,
prépare l’état de la conversation, sélectionne un transport direct ou par navigateur et
traduit strictement la réponse SSE en amont. L’orchestration se trouve dans
`open-sse/executors/claude-web.ts:320`.

> **Vous découvrez les fournisseurs utilisant des cookies Web ?**
>
> Consultez **`docs/getting-started/WEB-COOKIE-GUIDE.md`** pour connaître le processus général de configuration, les recommandations d’authentification, les limitations et les procédures de dépannage avant de suivre ce guide propre au fournisseur.

### Catalogue de modèles

Le registre des fournisseurs expose actuellement exactement ces sept identifiants de modèle statiques
(`open-sse/config/providers/registry/claude/web/index.ts:11`) :

| Identifiant du modèle       | Nom d’affichage         |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

La découverte dynamique des modèles n’est pas implémentée pour ce fournisseur. La liste ci-dessus constitue le
catalogue d’exécution.

### Identifiants et détermination de l’organisation

Fournissez soit l’en-tête Cookie complet de `claude.ai`, soit une valeur de session seule. Les valeurs seules sont
normalisées en `sessionKey` ; les autres cookies sont conservés s’ils sont fournis. L’exécuteur accepte le
cookie par l’intermédiaire de `cookie` ou `apiKey` et
lit les valeurs facultatives `deviceId` et `orgId` dans les données de connexion
(`open-sse/executors/claude-web.ts:72`).

Si `orgId` est absent, l’exécuteur appelle `GET https://claude.ai/api/organizations` et utilise la première
organisation renvoyée par la session Claude Web authentifiée
(`open-sse/executors/claude-web.ts:141`). Il échoue de manière sécurisée lorsqu’aucune organisation valide n’est
renvoyée, signale par un code 401 le rejet de l’autorisation de session et distingue un
défi Cloudflare d’un échec d’authentification.

### Opérations de conversation

L’objet facultatif de premier niveau `claude_web` est strict. Les champs inconnus sont rejetés. Ses
champs acceptés sont définis dans `open-sse/executors/claude-web/session.ts:50` :

| Champ                 | Signification                                                          |
| --------------------- | ---------------------------------------------------------------------- |
| `operation`           | `completion` par défaut ; utilisez `retry` pour une nouvelle tentative |
| `conversation_id`     | UUID explicite d’une conversation existante                            |
| `parent_message_uuid` | UUID explicite du message assistant parent                             |
| `timezone`            | Nom de fuseau horaire IANA valide                                      |
| `locale`              | Paramètre régional structurellement valide                             |
| `tool_states`         | Tableau facultatif des états d’outils du compte, limité à 128 entrées  |

Les requêtes préparées utilisent l’un des deux points de terminaison en amont
(`open-sse/executors/claude-web.ts:203`) :

- Un nouveau tour ou un tour de suivi envoie une requête à
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Une nouvelle tentative envoie une requête à
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Un nouveau tour inclut `create_conversation_params`. Un suivi mis en cache ou explicitement lié
inclut `parent_message_uuid` et omet `create_conversation_params`. Une nouvelle tentative nécessite à la fois
l’état de la conversation et celui du message parent, et n’envoie aucune invite
(`open-sse/executors/claude-web/session.ts:254`). Les nouvelles conversations ouvrent l’interface authentifiée
à l’adresse `/new` ; les suivis mis en cache ou explicitement liés ouvrent la page exacte de la conversation
(`open-sse/executors/claude-web/session.ts:324`).

L’état de la conversation est un cache en mémoire indexé par une portée de compte SHA-256 et la transcription
canonique de l’appelant. Les entrées expirent après 30 minutes et le cache est limité à 5 000 entrées
(`open-sse/executors/claude-web/session.ts:12`). L’état n’est validé qu’après que l’analyseur strict du
flux a observé `message_stop` ; les redémarrages du processus le suppriment. En cas d’absence dans le cache, une
requête comportant plusieurs messages est sérialisée en une seule invite de récupération au lieu d’ignorer
silencieusement les messages précédents.

Les paramètres régionaux et le fuseau horaire suivent cet ordre de priorité : valeur `claude_web` de la requête, valeur de connexion,
valeur d’exécution, puis `en-US` pour les paramètres régionaux ou `UTC` pour le fuseau horaire
(`open-sse/executors/claude-web/session.ts:218`).

### Outils et charges utiles des requêtes

Les requêtes directes transforment uniquement les outils de fonction OpenAI structurellement valides fournis par
l’appelant. Aucune liste statique d’outils par défaut n’est générée artificiellement
(`open-sse/executors/claude-web/payload.ts:102`).

Les requêtes du navigateur capturent à la place la requête de l’interface authentifiée et conservent ses outils de compte,
ses états d’outils et ses styles personnalisés. Les champs préparés de conversation, de modèle, de raisonnement, d’invite et
d’UUID de message remplacent toujours ceux de la requête capturée
(`open-sse/executors/claude-web/browserTransport.ts:175`). Les modèles de navigateur sont limités à une portée définie par un
hachage du compte, de l’organisation, du cookie, des paramètres régionaux et du fuseau horaire, et expirent après 30 minutes
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). Lorsqu’une requête directe ne comporte aucun outil fourni par l’appelant,
elle peut réutiliser ce modèle délimité ; les outils explicites de l’appelant sont prioritaires
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### Sélection du transport

Le chemin par défaut est `sendClaudeWebDirect()`, qui appelle `tlsFetchClaude()` avec le profil
Chrome 146 configuré et le cookie fourni (`open-sse/services/claudeTlsClient.ts:23`). Il ne
lance aucun solveur et ne génère aucun cookie de remplacement.

Définissez `WEB_COOKIE_USE_BROWSER` sur `1`, `true` ou `on` pour faire de l’adaptateur de navigateur limité au compte le transport principal. Définissez `OMNIROUTE_BROWSER_POOL` sur l’une de ces mêmes valeurs pour permettre à une demande de vérification Cloudflare 403 reconnue de basculer du transport direct vers l’adaptateur de navigateur (`open-sse/executors/claude-web.ts:195`). Les autres erreurs HTTP ne déclenchent pas ce basculement.

L’adaptateur de navigateur conserve les cookies dans le même contexte Playwright mis en pool, utilise la clé hachée limitée à la portée décrite ci-dessus et envoie la complétion depuis ce contexte (`open-sse/executors/claude-web/browserTransport.ts:444`). Il n’exporte jamais un cookie obtenu par le navigateur vers le client TLS direct. Les nouvelles tentatives via le navigateur nécessitent un modèle d’interface utilisateur non expiré, lié au même contexte Playwright réel (`open-sse/executors/claude-web/browserTransport.ts:467`). Les lectures de réponses du navigateur s’effectuent de manière incrémentielle dans la page authentifiée, respectent l’annulation de la requête et annulent le corps en amont dès qu’il dépasse 16 Mio (`open-sse/executors/claude-web/browserTransport.ts:259`).

L’exécuteur renvoie une projection d’audit expurgée au journaliseur de requêtes partagé : les UUID de l’organisation, de la conversation et des messages, le texte du prompt, les définitions d’outils, les cookies et les identifiants d’appareil en sont exclus (`open-sse/executors/claude-web.ts:237`, `open-sse/executors/claude-web.ts:252`). Les exceptions de transport renvoient également une erreur de connexion générique plutôt que le message de l’exception levée.

### Comportement SSE

`createClaudeWebResponse()` prend en charge le cadrage LF ou CRLF et les champs `data:` multilignes. Il associe les deltas de texte à `content`, les deltas de réflexion à `reasoning_content` et les événements de métadonnées connus à l’extension de réponse `claude_web`. Chaque événement de métadonnées est projeté au moyen de sa propre liste blanche de champs (`open-sse/executors/claude-web/stream.ts:37`). Les métadonnées de conversation, de message parent, de message de l’assistant et d’opération sont également renvoyées dans les en-têtes `X-OmniRoute-Claude-Web-*` (`open-sse/executors/claude-web/stream.ts:364`).

L’analyseur échoue de manière sécurisée en cas de JSON mal formé, d’événements `error` en amont, de types d’événements inconnus, d’ordre non valide, de discordances de blocs de contenu ou de fin de fichier avant `message_stop`. La sortie en streaming émet un bloc de fin et un `[DONE]` ; la sortie mise en mémoire tampon utilise le même analyseur. L’analyseur considère immédiatement `message_stop` comme terminal, annule les données restantes en amont et propage l’annulation en aval au lecteur en amont (`open-sse/executors/claude-web/stream.ts:461`, `open-sse/executors/claude-web/stream.ts:563`). Les lignes SSE non terminées et les événements accumulés sont limités à 1 Mio (`open-sse/executors/claude-web/stream.ts:17`, `open-sse/executors/claude-web/stream.ts:62`).

### Fichiers

| Fichier                                                  | Rôle                                            |
| -------------------------------------------------------- | ----------------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Registre statique des modèles du fournisseur    |
| `open-sse/executors/claude-web.ts`                       | Orchestration de l’exécuteur                    |
| `open-sse/executors/claude-web/payload.ts`               | Transformation de la charge utile et des outils |
| `open-sse/executors/claude-web/session.ts`               | État des tours et cache des transcriptions      |
| `open-sse/executors/claude-web/transport.ts`             | Adaptateur de transport direct                  |
| `open-sse/executors/claude-web/browserTransport.ts`      | Adaptateur de navigateur limité au compte       |
| `open-sse/executors/claude-web/stream.ts`                | Traduction SSE stricte                          |
| `open-sse/services/claudeTlsClient.ts`                   | Transport TLS natif                             |
| `open-sse/services/browserPool.ts`                       | Contextes Playwright mis en pool                |

### Tests

Exécutez la suite Claude Web déterministe sans identifiants réels :

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Les cas dépendant de Playwright dans `tests/unit/claude-web-auto-refresh.test.ts` sont explicitement ignorés. Ce dépôt ne définit actuellement aucun script de test en conditions réelles de Claude Web avec identifiants ; ces cas ignorés ne constituent donc pas une preuve de fonctionnement à l’exécution.

### Configuration

1. Démarrez OmniRoute avec `npm run dev` ou depuis une installation compilée.
2. Ouvrez Tableau de bord → Fournisseurs → Ajouter un fournisseur.
3. Sélectionnez la catégorie Cookie Web, puis Claude Web.
4. Collez l’en-tête Cookie complet copié depuis une requête `claude.ai` authentifiée.
