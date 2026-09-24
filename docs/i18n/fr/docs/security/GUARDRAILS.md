# Guardrails (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Source de vérité :** `src/lib/guardrails/`
> **Dernière mise à jour :** 2026-08-29 — v3.8.51 (la provenance des transcriptions de Video Bridge est déclarée par l'appelant,
> mais n'est pas encore vérifiée par le serveur — clarification conformément à #11661)

Les garde-fous appliquent les règles de sécurité, les politiques et les transformations de contenu à la frontière
entre OmniRoute et les fournisseurs en amont. Chaque garde-fou peut inspecter (et
éventuellement rejeter, transformer ou annoter) les charges utiles des requêtes (`preCall`) et
les réponses en amont (`postCall`).

Le système est **à tolérance ouverte** : si un garde-fou lève une exception pendant son exécution, le registre
consigne l'erreur et passe au garde-fou suivant au lieu de faire échouer la
requête. Le blocage est une décision explicite (`block: true`), jamais un accident.

## Garde-fous intégrés

Le registre charge automatiquement six garde-fous par ordre de priorité lors de l'importation
(voir `registry.ts` → `registerDefaultGuardrails()`):

| Priorité | Nom                 | Étape(s)       | Fichier               |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Les numéros de priorité inférieurs s'exécutent **en premier**.

### Pont de vision (`visionBridge.ts`) — Pont de modalité PR-1

Intercepte les requêtes contenant des images destinées à des **modèles non-vision** et
redirige soit l'ensemble de la requête vers un modèle compatible avec la vision, soit remplace les
parties d'image par des descriptions textuelles produites par un modèle de vision configurable avant
l'appel en amont. Cela permet aux fournisseurs de texte uniquement de gérer de manière transparente
les charges utiles multimodales.

Flux:

1. Ignorer si le modèle cible prend déjà en charge la vision (sauf s'il apparaît dans la
   liste `isVisionBridgeForcedModel` des ponts forcés).
2. Extraire les parties d'image via `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), qui délègue au **détecteur de média unifié**
   `detectMediaParts()` dans `open-sse/utils/mediaParts.ts` — la
   source unique de vérité partagée avec le filtre de compatibilité combo.
   L'extraction est autorisée pour les parties de niveau supérieur des formes que
   `replaceImageParts` peut réassembler (le contrat d'extraction↔remplacement): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, et Responses API `input_image`. Les correspondances imbriquées et
   les formes uniquement indicatives sont du matériel de filtre combo et ne sont jamais extraites.
   Ignorer si aucune n'est trouvée.
3. Résoudre la configuration d'exécution via `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): les nouvelles clés de paramètres
   `modalityBridge*` l'emportent; les clés `visionBridge*` héritées restent un
   **repli d'un cycle** (fenêtre de retour en arrière). Ignorer avant toute traversée de média lorsque le
   pont est désactivé.
4. Le sélecteur de mode (`modalityBridgeVisionMode`, voir tableau ci-dessous) décide
   de la redirection ou de la description. La redirection renvoie `modifiedPayload` avec seulement
   `model` échangé, plus les méta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Chemin de description: limiter les images à `maxImages`, composer l'invite sensible à la tâche,
   consulter le cache de description, appeler le modèle de vision **en parallèle**
   (`Promise.allSettled`), et injecter les parties de texte `[Image N]: <description>` à leur
   place. Une description échouée renvoie `null` et la partie d'image originale est
   **préservée** (#4012) — sauf sur le chemin de description combo lorsque toutes les
   descriptions ont échoué, où un amont non-vision confirmé reçoit un
   ` (indisponible — aucun fournisseur compatible vision connecté)` à la place (#8430).
6. Retourner `modifiedPayload` + méta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Sélecteur de mode (`modalityBridgeVisionMode`)

| Mode       | Défaut | Comportement                                                                                                                                                                                                                                                                                                                                  |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | Heuristique héritée, inchangée (#6640/#7204): les modèles non-combo/`auto/` redirigent vers le meilleur modèle de vision à moins que le modèle original n'ait déjà des identifiants utilisables (alors décrire); les cibles combo décrivent toujours.                                                                                         |
| `describe` |        | Toujours décrire — le bloc de redirection est entièrement ignoré; le modèle choisi par l'utilisateur répond toujours.                                                                                                                                                                                                                         |
| `reroute`  |        | Forcer la redirection: le garde-fou du modèle avec identifiants est contourné. Le garde-fou des identifiants de la **cible** de redirection s'applique toujours — lorsqu'aucune cible de vision utilisable n'existe, la requête passe à la description afin que les images brutes n'atteignent jamais un backend de texte uniquement (#8430). |

Les modes forcés court-circuitent **avant** l'exécution de l'heuristique automatique; le comportement
`auto` est identique au garde-fou pré-PR-1.

#### Invite de description sensible à la tâche (`modalityBridgeVisionTaskAware`)

Par défaut **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) ajoute
le texte du **dernier message utilisateur** (tronqué à 500 caractères) à l'invite
de description de base, orientant la description vers ce que l'utilisateur a réellement demandé
(modèle codex-vision-proxy) et demandant au modèle de vision de transcrire le
texte visible. Si le drapeau est désactivé — ou s'il n'y a pas de texte utilisateur — l'invite de base est utilisée telle quelle.

La requête compatible OpenAI de la boucle d'auto-description (`callVisionModelSingle()` dans `visionBridgeHelpers.ts`) demande toujours `image_url.detail: "high"` — inconditionnellement, pour chaque appelant/fournisseur, sans être conditionnée par un signal client. L'échantillonnage à faible détail dégrade la précision de l'OCR pour la tâche de transcription de texte que cette invite demande, de sorte que l'appel de description lui-même demande toujours un détail élevé, quel que soit le niveau de détail utilisé par la requête entrante originale. Cela n'affecte que le corps de la requête de description interne ; cela ne modifie pas la manière dont OmniRoute transmet le `image_url.detail` de l'appelant sur la requête principale — ce défaut est appliqué séparément, et uniquement pour les clients OpenCode détectés, dans `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). La branche au format filaire Anthropic de la boucle d'auto-description n'a pas de champ `detail` et n'est affectée par aucun des deux défauts.

#### Plafond de sortie de la description (`modalityBridgeVisionMaxChars`)

| Clé                            | Défaut | Plage            |
| :----------------------------- | :----- | :--------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` ou 100–50000 |

`0` (par défaut) signifie **aucun plafond** — la description renvoyée par `callVisionModel()` est transmise sans modification, préservant le comportement existant. Toute valeur dans la plage 100–50000 tronque la description avec un suffixe `…` avant qu'elle ne soit réinsérée sous la forme `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` dans `src/lib/guardrails/visionBridge.ts`). Augmentez cette valeur pour les tâches d'OCR riches en détails où le modèle en aval a besoin de la transcription complète ; diminuez-la pour limiter l'utilisation de jetons sur les modèles de vision bavards. Le champ du tableau de bord se trouve dans le panneau Avancé de l'onglet Vision (`modality-bridge-max-chars` dans `ModalityBridgeVisionTab.tsx`) et ramène toute valeur entre 1 et 99 au plancher de 100 tout en laissant un `0` explicite intact — `0` est une valeur Zod valide à part entière (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), et pas seulement le défaut "non défini".

#### Cache de description (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL en mémoire pour les sorties de description, partagé à l'échelle du processus. La clé = `sha256(imageRef + composedPrompt + configuredBridgeModel)` avec un encadrement par préfixe de longueur (pas de collisions de limites de champ). Le composant du modèle est le modèle de pont **configuré**, et non le modèle qui a réellement répondu — `callVisionModel` peut se replier en interne, et une clé par tentative fragmenterait le cache. Les descriptions échouées ne sont jamais mises en cache. Paramètres :

| Clé                             | Défaut | Plage   |
| :------------------------------ | :----- | :------ |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Normalisation des images distantes (description en boucle auto/récupération base64)

Lorsque le pont récupère lui-même une image **distante** — l'auto-appel de description Anthropic et la conversion base64 au format filaire claude (`ensureBase64ImagesForClaudeWire`), tous deux via `fetchRemoteImageAsDataUri()` dans `visionBridgeHelpers.ts` — l'URI de données résultante est passée par `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) avant d'être intégrée dans la requête du modèle de vision. Les images surdimensionnées sont réduites à un **bord long de 2048px** (correspondant au plafond de redimensionnement que OpenAI/Anthropic appliquent déjà côté serveur), ce qui réduit les octets/la latence de téléchargement sans changer ce que le modèle de vision voit. Le redimensionnement utilise `sharp`, chargé via importation dynamique : sur une plateforme où son binaire natif ne parvient pas à se charger, `normalizeDataUri()` **ne lève jamais d'erreur** — il se replie sur un passage direct des octets originaux, de sorte que le chemin de description/conversion base64 continue toujours de fonctionner. Les octets non-image (une récupération qui n'a pas renvoyé une image décodable) sont également passés sans modification. Cette normalisation est limitée aux images que le pont récupère pour son propre auto-appel — elle n'est jamais appliquée à la charge utile brute de l'appelant, conformément au principe de mutation uniquement opt-in (Règle stricte #20).

#### Schéma des paramètres + migration

Les nouvelles clés `modalityBridge*` sont validées par Zod dans `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`) : `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, le trio `modalityBridgeCache*`, et le groupe `modalityBridgeAudio*` utilisé par le pont audio. La migration `141_modality_bridge_settings.sql` copie les valeurs `visionBridge*` héritées existantes vers les nouvelles clés correspondantes (idempotente, ne remplace jamais une valeur `modalityBridge*` définie par l'opérateur) ; les clés héritées restent acceptées comme repli de lecture pour un cycle de publication.

#### En-tête de transparence + statistiques

Les réponses transformées par la description portent `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (construit par `buildModalityBridgeHeader()` dans `modalityBridge/bridgeStats.ts`, estampillé par `withModalityBridgeHeader()` dans `src/sse/handlers/chatHelpers.ts`). Les requêtes redirigées n'obtiennent **aucun** en-tête — la charge utile n'a pas été modifiée et l'échange de modèle est déjà visible dans le champ `model` du corps de la réponse.

`GET /api/modality-bridge/stats` (authentification de gestion, même niveau que `GET /api/settings`) renvoie les compteurs en mémoire par modalité `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` pour `vision`, `audio` et `video`. `averageLatencyMs` utilise `latencySamples`, et non toutes les tentatives, comme dénominateur ; une opération sans chronométrage ne fabrique pas un échantillon de zéro milliseconde. `bridged` reste l'alias rétrocompatible pour les conversions réussies ; les tentatives échouées ne l'incrémentent pas. Les compteurs sont réinitialisés au redémarrage du processus par conception (télémétrie, pas comptabilité).

#### Configuration du tableau de bord

La page de tableau de bord dédiée est `/dashboard/settings/modality-bridge`. Ses onglets `Vision`, `Audio` et `Video`, accessibles par URL, conservent les paramètres de requête lors du changement de la valeur `tab`. L'onglet Vision expose l'activation, le mode, la sélection du modèle (y compris le modèle par défaut automatique), l'incitation contextuelle, les limites avancées de délai d'attente/image/longueur de description/cache, les compteurs d'exécution et une requête d'échantillon protégée. L'onglet Audio est également actif : il expose l'activation, un sélecteur de modèle STT uniquement avec Auto, les limites de délai d'attente/clip maximal, les compteurs audio et un test d'échantillon `input_audio`. L'onglet Vidéo est fonctionnel : il rapporte l'état d'exécution de FFmpeg/ffprobe — l'un des quatre états explicites de l'interface utilisateur (`unknown` pendant que la sonde est en cours ou n'a pas pu se terminer, `restricted` sur un hôte de tableau de bord non-loopback où la sonde est ignorée côté client, `unavailable` une fois sondée et confirmée manquante, ou `available` avec les versions FFmpeg/ffprobe) — persiste les limites d'activation/modèle/image/vidéo/délai d'attente, filtre le sélecteur de modèle pour les modèles compatibles avec la vision et expose les compteurs vidéo.

L'ancienne carte Vision Bridge sous les paramètres d'IA est un lien de compatibilité vers la nouvelle page ; elle ne possède plus une deuxième copie du formulaire. Les fournisseurs de médias lient également les flux de travail Image-vers-Texte et Parole-vers-Texte aux onglets Modality Bridge correspondants sans supprimer le terrain de jeu Parole-vers-Texte existant.

**Contournement d'admission en boucle interne :** lorsque l'appel de description passe par la boucle interne `/v1` d'OmniRoute (modèle de fournisseur non standard), la sous-requête envoie `x-omniroute-admission-bypass: internal` et est authentifiée avec le credential de boucle interne résolu — le sentinelle local `sk_omniroute` en mode local, ou la clé d'environnement `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurée par l'opérateur (#1350) afin que les déploiements `REQUIRE_API_KEY=true` puissent toujours exécuter l'appel de description. Le contournement n'est honoré que pour ces credentials exacts, de sorte que les clients externes ne peuvent pas utiliser l'en-tête pour ignorer l'admission.

Les valeurs par défaut héritées se trouvent dans `src/shared/constants/visionBridgeDefaults.ts` ; les nouvelles valeurs par défaut de mode/sensibilité aux tâches/cache et le résolveur de paramètres se trouvent dans `src/shared/constants/modalityBridgeDefaults.ts`. Le garde-fou expose une option de constructeur `deps` afin que les tests puissent injecter de fausses implémentations de `getSettings` et `callVisionModel`.

### Pont Audio (`audioBridge.ts`) — Modality Bridge PR-3

Intercepte les requêtes de chat contenant de l'audio avant qu'elles n'atteignent une cible qui n'est pas connue pour accepter l'entrée audio. Il ne redirige jamais la requête de chat : les parties audio sont transcrites via le point de terminaison multipart existant compatible OpenAI et le modèle de chat choisi continue avec les transcriptions textuelles.

Flux :

1.  Résoudre `supportsAudio` via `getResolvedModelCapabilities()`. Les métadonnées explicites du registre des fournisseurs l'emportent, puis les métadonnées statiques du modèle, puis `modalities_input` synchronisées. Une liste d'entrées déclarée sans `audio` est `false` ; aucune preuve de capacité ne reste `null`. `false` et `null` activent le pont conservateur, tandis que `true` le contourne.
2.  Résoudre les paramètres `modalityBridgeAudio*` et extraire les parties audio de niveau supérieur pouvant être épissées de chaque message via le détecteur partagé `detectMediaParts()`. Les formats de fil pris en charge sont OpenAI `input_audio`, `audio_url` et `source.media_type: "audio/*"`. L'audio imbriqué est détecté pour le routage mais n'est pas supprimé par le chemin d'épissage. Le travail est plafonné par `modalityBridgeAudioMaxClips` ; les parties ultérieures restent intactes.
3.  Respecter un `provider/model` configuré, ou laisser `selectAudioBridgeModel()` parcourir `AUDIO_TRANSCRIPTION_PROVIDERS` dans l'ordre stable du catalogue et sélectionner le premier modèle avec un credential de fournisseur actif utilisable.
4.  `callAudioTranscription()` convertit l'audio base64/data-URI en un `file` multipart, ou télécharge un `audio_url` distant via la garde sortante publique uniquement avec épinglage DNS et une limite de 25 Mo. Il envoie ensuite le fichier et le modèle sélectionné à la boucle interne locale `/v1/audio/transcriptions`, authentifiée avec `resolveSelfLoopBearer()`. La route de transcription existante effectue la recherche normale des credentials, la gestion du refroidissement/limite de débit et la répartition du fournisseur.
5.  Les appels réussis remplacent leurs parties par `[Audio N]: <transcript>`. Les appels s'exécutent avec `Promise.allSettled` : un échec individuel préserve cette partie audio originale (contrat #4012). Si chaque appel échoue et que la cible est avérée `supportsAudio === false`, les parties deviennent `[Audio N]: (unavailable — no STT provider connected)` (contrat #8430). Pour une cible inconnue (`null`), un résultat de tous les échecs reste intact. Une cible avérée uniquement textuelle sans credential STT utilisable reçoit le même stub explicite sans émettre d'appel réseau.

Les transcriptions réussies utilisent le cache LRU/TTL Modality Bridge à l'échelle du processus. La clé combine la référence audio, l'étiquette d'opération stable `audio-transcription` et le modèle STT sélectionné ; les échecs ne sont jamais mis en cache. Les tentatives audio mettent à jour les compteurs partagés `bridged`, `cacheHits`, `failures` et `lastUsedAt`. Les réponses transformées portent `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` ; les requêtes non modifiées ne reçoivent pas de segment Audio Bridge.

Les paramètres d'exécution sont sauvegardés en base de données et validés par Zod :

| Clé                           | Défaut  | Plage          |
| ----------------------------- | ------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto ou ID STT |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

Le cache partagé reste contrôlé par `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` et `modalityBridgeCacheMaxEntries`.

### Pont Vidéo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercepte les parties vidéo de niveau supérieur dans les `messages` des Chat Completions et l'`input` de l'API Responses avant qu'une cible sans support vidéo natif connu ne soit appelée.
Les formes prises en charge sont `input_video`, `video_url`, `video_source`, les URL HTTPS et les URI de données `data:video/*;base64,...`. Les noms de fichiers simples dans le texte ne sont pas traités comme des vidéos.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) gère le parcours des requêtes, la vérification des capacités/politiques, l'agrégation par requête et la charge utile de la réponse. Le travail par vidéo — acquisition, le cache de résultats complets, la description d'une séquence d'images (qui fusionne toute transcription audio déclarée par l'appelant), et les métriques/abandon/nettoyage par tentative — est masqué derrière `processVideoPart` dans `videoBridgePipeline.ts`, appelé une fois par partie vidéo à l'intérieur de la boucle de `preCall`. Ce module définit également les limites de port explicites `VideoMediaBrokerPort` (acquisition d'octets et extraction d'images échantillonnées), `VideoAudioTranscriptionPort` (fusion d'une transcription audio déclarée par l'appelant avec les légendes échantillonnées), et `VideoDrilldownPort` (la limite de persistance de l'exploration d'images ; pas encore câblée dans `processVideoPart` — seule la route séparée `/api/modality-bridge/video/drilldown` écrit des entrées d'exploration aujourd'hui).

Le chemin de requête public `/v1` n'importe ni n'invoque jamais de sous-processus. Les vidéos distantes sont téléchargées avec une limite de 50 MiB ; les vidéos base64 en ligne ont une limite décodée par vidéo de 36 MiB, afin que l'enveloppe modèle/messages/cadrage puisse rester dans la limite d'admission des requêtes JSON publiques de 50 MiB. La longueur en ligne et les estimations de taille décodée sont vérifiées avant l'allocation. HTTPS est requis sur l'URL distante initiale et chaque redirection, en utilisant la protection sortante existante réservée au public avec l'épinglage DNS. Les octets traversent ensuite la limite exacte du courtier interne `POST /api/modality-bridge/video/extract`. Cette route est à la fois `LOCAL_ONLY` et `SPAWN_CAPABLE`, n'accepte qu'une requête authentifiée par processus et en boucle locale de confiance, et n'accepte jamais une URL, un chemin de système de fichiers, un exécutable ou une liste d'arguments. Le pipeline de taille de corps de l'API et le lecteur de corps incrémental du gestionnaire appliquent indépendamment une limite d'entrée de courtier de 50 MiB. Sa file d'attente bornée exécute une extraction à la fois, autorise quatre tâches en attente et limite l'entrée en attente à 100 MiB.

À l'intérieur du courtier, `ffprobe` lit un fichier local privé ; la liste blanche des formats fixes exclut les formats de playlist et de manifeste. Pour les conteneurs de la famille MOV autorisés, les références de données MOV externes restent désactivées par défaut, et la commande fixe ne les active pas. Les deux `ffprobe` et `ffmpeg` utilisent la liste blanche de protocoles `file`-only, un seul thread, des tableaux d'arguments fixes, aucun shell, et des exécutables résolus à partir de `PATH`. Les flux de couverture d'images attachées ne sont pas des candidats jouables. Tous les flux jouables doivent satisfaire les limites, et un flux par défaut explicite est préféré avant le repli déterministe sur l'index le plus bas. Les vidéos sont limitées à 600 secondes, 8 192 pixels par dimension et 33 554 432 pixels source. FFmpeg échantillonne 1 à 16 images JPEG médianes, réduit le côté le plus long à un maximum de 1 024 pixels sans agrandir les entrées plus petites, et ne reçoit jamais d'URL. L'échantillonnage est `uniform` par défaut. Les politiques optionnelles `scene_aware` et expérimentale `segment_aware` effectuent un passage FFmpeg fixe supplémentaire sur le flux local déjà validé, sélectionnent des horodatages de scène `showinfo` bornés, et se replient de manière déterministe sur les mêmes points médians uniformes en cas d'échec du détecteur, de dépassement de délai, de sortie mal formée ou d'ensemble de candidats vide. Le mode `segment_aware` alloue des échantillons médians proportionnellement aux intervalles de scène validés ; les preuves et le comportement de repli du mode `segment_aware` sont détaillés ci-dessous. La limite stricte de 16 images est appliquée après la sélection dans chaque politique. Lorsqu'une requête `scene_aware` n'a qu'un budget d'une seule image, elle utilise le point médian uniforme de la fenêtre vidéo complète active ou de la fenêtre de focus et rapporte `policyEffective: uniform` : une seule image de scène sélectionnée ne peut pas préserver les deux extrémités temporelles. Un appelant peut éventuellement fournir une fenêtre de focus finie (secondes `start`/`end`) ; les limites sont ajustées à la durée du média, les fenêtres inversées ou non finies sont rejetées, et toutes les politiques d'échantillonnage sont effectuées uniquement à l'intérieur de l'intervalle normalisé. La fenêtre résultante est incluse dans les métadonnées d'échantillonnage et dans le préfixe de description non fiable afin que les modèles en aval puissent distinguer un extrait ciblé de la chronologie complète.

Le focus sémantique des légendes est un paramètre distinct et explicite. Le mode d'analyse `full` par défaut préserve l'invite d'image existante et ne transmet jamais le texte de la requête au modèle de légende. En mode `focused`, le pont ne lit que le dernier `text`/`input_text` non vide rédigé par l'utilisateur à partir du même conteneur Chat ou Responses, le normalise en NFC, supprime les caractères de contrôle et les espaces blancs, et le limite à 500 points de code Unicode. Un résultat vide se replie sur l'invite `full` exacte. Un indice utilisable est sérialisé en JSON dans un bloc de contexte utilisateur non fiable dédié et ne peut que prioriser les détails observables ; il ne peut pas outrepasser l'avertissement distinct contre le suivi des instructions visibles ou audibles dans le média. Le focus textuel n'infère jamais `start`/`end` et ne modifie jamais l'échantillonneur temporel.

#### FU-07 preuves de segments structurels

`segment_aware` utilise un passage de pré-analyse borné sur le flux vidéo local déjà validé. La chaîne de filtres fixe met d'abord à l'échelle jusqu'à 320 pixels de large au maximum, détecte les changements de scène et les intervalles figés, puis échantillonne à 1 image par seconde pour le flou, la luminance moyenne et les informations spatiales/temporelles. Le passage est limité à 600 échantillons structurels, un thread FFmpeg/filtre, les mêmes listes blanches de protocole et de conteneur `file`-only, une limite de sortie de processus de 1 MiB, et un maximum de 30 secondes à l'intérieur de l'abandon/délai partagé du courtier. Il n'accepte jamais de commande, de filtre, de chemin ou d'URL de la requête.

Les valeurs structurelles sont des preuves d'échantillonnage déterministes, et non une compréhension sémantique de la vidéo. Elles n'infèrent pas de sujets, d'actions, de légendes, de paroles ou d'intentions de l'utilisateur. Les limites de scène et de gel forment des segments ; la couverture de gel, le flou, l'exposition, les détails spatiaux et le changement temporel n'influencent que la manière dont le budget existant de 1 à 16 images est alloué. Un segment entièrement gelé est plafonné à une image, tandis que les segments non gelés se disputent le budget restant. Lorsque les limites sont plus nombreuses que les images, une couverture uniforme de la chronologie est conservée afin que les coupes rapides et précoces ne puissent pas masquer un long segment de fin. Les limites de scène situées dans la résolution d'analyse d'une seconde d'une limite de gel sont fusionnées.

Des filtres manquants, des preuves malformées/vides, une erreur de détecteur ou le délai d'attente borné de pré-analyse échouent en mode ouvert vers la politique exacte du point médian uniforme. Un abandon de l'appelant ou une échéance du courtier n'échoue pas en mode ouvert : cela met fin au sous-processus en cours, empêche l'extraction ultérieure d'images, et l'arborescence temporaire privée est supprimée dans `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` génère des fixtures FFmpeg réelles et déterministes pour les économies d'appels de légendes post-déduplication, l'allocation de budget de mouvement dense, les preuves de flou/exposition/SI-TI, les coupes rapides avec une longue traîne, et les faux positifs de fondu progressif. Il enregistre le temps réel de pré-analyse et, lorsque `/usr/bin/time` est disponible, le CPU enfant et le RSS maximal. Ses contrôles de qualité ne sont que des oracles structurels. La qualité réelle du modèle de légende reste `HOLD` car ce harnais n'a pas de point d'accès autorisé ni de juge figé. Les économies monétaires restent également `HOLD` à moins que `--caption-cost-per-call-usd` ne fournisse une estimation positive explicite par appel ; le script ne fabrique jamais l'un ou l'autre de ces résultats.

Chaque image est limitée à 4 MiB, toutes les images brutes ensemble à 23 MiB, et la réponse sérialisée du courtier à 32 MiB. Un répertoire temporaire privé est supprimé dans `finally`. OmniRoute n'intègre pas FFmpeg et n'accepte pas de chemin d'exécutable personnalisé. Avant le sous-titrage, le pont applique une passe de déduplication visuelle conservative : chaque JPEG est réduit à un tampon de niveaux de gris de 16×16 et n'est comparé qu'à la dernière image conservée. Pour un budget de légende demandé supérieur à une image, l'extraction fournit un pool de candidats borné allant jusqu'à deux fois ce budget et jamais plus de 16 images. Le plafond demandé n'est appliqué qu'après déduplication, les premiers et derniers candidats sélectionnés étant conservés lors de l'amincissement final lorsque le budget est d'au moins deux. La politique versionnée `grayscale-16x16-mean-cells-v2` utilise la plus grande valeur entre le delta moyen de la luma et le rapport des cellules de vignette dont le delta normalisé est d'au moins 0,05. Le seuil de duplication est la constante 0,04, choisie pour sa prévisibilité plutôt que d'être exposée comme un paramètre d'exécution. Ce signal secondaire à contraste élevé préserve les petits mouvements et les changements de texte visibles qu'une comparaison basée uniquement sur la moyenne peut masquer. Les erreurs de comparateur ou de décodeur échouent en mode ouvert et maintiennent la couverture. Les métadonnées de sortie séparent les candidats extraits, les images utilisées avec succès et les doublons visuels supprimés.

Une partie de vidéo explicitement marquée peut demander une planche contact horodatée. Le pont construit au maximum une grille JPEG de 4 colonnes et 16 images. Chaque cellule de 512 pixels grave son horodatage source dans une bande inférieure à contraste élevé, tandis que les mêmes horodatages restent dans les métadonnées textuelles pour l'association et l'audit en aval. Le JPEG complet reste plafonné à 32 MiB. Si `sharp` ne peut pas décoder ou composer la grille, le pont revient aux images JPEG individuelles ; un abandon client se propage toujours à travers l'opération de la planche.

Les preuves de promotion sont délibérément séparées du micro-benchmark de composition synthétique. `scripts/perf/video-bridge-contact-sheet-eval.ts` définit un harnais A/B versionné par schéma pour les modèles de vision réels compatibles OpenAI. Il mesure les jetons rapportés par le fournisseur, la latence murale de bout en bout (y compris la composition de la planche), le nombre d'appels de modèle et la rétention des faits définis par le manifeste. Les réponses brutes du modèle ne sont pas écrites dans le rapport ; seuls les digests SHA-256 et les ID de faits correspondants sont conservés. Le harnais n'effectue aucun appel réseau ou de modèle payant à moins que `--execute-real` ne soit passé et que `--model`, `OMNIROUTE_BASE_URL` et `OMNIROUTE_API_KEY` ne soient configurés. Sans cette exécution réelle explicite, son verdict lisible par machine reste `HOLD` ; les mesures synthétiques de charge utile/nombre d'appels seules ne constituent pas une preuve de promotion.

Les appelants peuvent attacher un tableau `transcript.cues` optionnel à une partie de vidéo prise en charge lorsqu'ils possèdent déjà du texte aligné. Chaque repère doit contenir `text`, un intervalle `start`/`end` fini à l'intérieur de la durée sondée, et une `source` autorisée (`client`, `embedded`, ou `audio-bridge`) ; `confidence` est par défaut à `1` et doit rester entre `0` et `1`. Les repères exactement dupliqués sont fusionnés. OmniRoute ne démarre jamais la transcription à partir de ces métadonnées : les repères validés sont copiés dans le résultat décrit avec la source, la confiance et l'intervalle, et sont rendus comme des observations non fiables à côté des légendes d'image. Le texte invalide, hors de portée ou sans provenance est rejeté plutôt que d'être mélangé dans le flux de légendes. Le champ `source` est actuellement déclaré par l'appelant, non vérifié par le serveur : OmniRoute s'assure que la valeur est l'une des trois chaînes autorisées, mais ne confirme pas encore cryptographiquement qu'une étiquette `embedded` ou `audio-bridge` provient réellement d'une extraction appartenant au serveur. Traitez `source` comme un indice non fiable jusqu'à ce que cette vérification soit mise en place ; ne fondez pas de décisions d'autorisation dessus.

Un appelant avancé peut fournir une piste `audioTranscript` déjà autorisée
pour la même vidéo. La fusion combine les observations visuelles et audio sous
une seule échéance et un signal d'abandon, les ordonne sur une chronologie commune,
élimine les doublons exacts et signale un résultat partiel lorsque seul un côté
réussit. Un `audioTranscript` invalide se dégrade en ce résultat partiel — la
description visuelle est conservée et la branche audio enregistre un code d'échec
sanitizé — au lieu de faire échouer la vidéo entière. La disponibilité par branche,
l'indicateur partiel et les codes d'échec sanitizés sont conservés dans le résultat
décrit, dans les métadonnées de garde-fou (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), dans les métadonnées du cache de résultats et dans les
compteurs de fusion de pont. Le chemin par défaut de Video Bridge n'invoque pas la
synthèse vocale ni ne télécharge une deuxième copie multimédia ; sans cette piste
explicite, il reste uniquement vidéo.

**Rétention des transcriptions (#12150 P1).** Cela s'applique automatiquement
chaque fois que le Video Bridge (lui-même opt-in) rend un repère de transcription
— il n'y a pas d'indicateur de rétention séparé. Lorsqu'une requête rend un repère
de transcription (une `transcript` déclarée par l'appelant ou un `audioTranscript`
fusionné), le garde-fou le marque `videoBridgeObserved` et produit une ombre
expurgée de la description vidéo — un rendu identique dans lequel le corps de texte
libre de chaque repère est remplacé par `[redacted-video-transcript]`, construit
en substituant le champ de repère structuré avant que la chaîne ne soit assemblée
(jamais en analysant le texte aplati, de sorte qu'aucun contenu de repère —
adversaire ou ordinaire, y compris les corps contenant `]` tels que `[inaudible]`/
`[music]` — ne peut survivre). Le corps de la requête du journal d'appels persisté
échange chaque partie de texte dérivée de la vidéo contre cette ombre expurgée,
correspondant par égalité de contenu ; l'ancre `fullText` est relue à partir de la
charge utile du garde-fou de pré-appel terminée, de sorte que la correspondance
réussit toujours après que les garde-fous de chaîne ultérieurs (les masques PII et
d'informations d'identification, priorités 10/95) réécrivent le texte de la
description en place et après que l'injection de prompt/transfert/mémoire du système
remodèle le tableau de messages. Le corps envoyé en amont au modèle reste inchangé.
Une requête observée ne remplit pas non plus de mémoire durable (l'extraction
dérivée de la requête et de la réponse est ignorée), de sorte que la propre réponse
du modèle ne peut pas faire écho au texte de la transcription dans la mémoire.

Les copies supplémentaires conservées utilisent le même signal de requête observée.
L'instantané de la requête client brute avant le garde-fou, la requête en attente
en mémoire et le journal des requêtes rejetées précoces remplacent structurellement
les champs de transcription dans les parties vidéo ; les invites de chaîne
synthétisées par les étapes du pipeline et le transfert de contexte sont expurgées
au niveau du récepteur du corps de la requête persistée. Le marqueur persisté
`video_content_removed` fait échouer la continuation `previous_response_id` plutôt
que de reconstruire du texte qui a été intentionnellement supprimé. Si une requête
observée perd son ombre de rédaction par partie avant la journalisation, ou même
si l'une des plusieurs ombres vidéo ne correspond pas après des mutations de requête
ultérieures, le corps de la requête conservée est entièrement omis au lieu de
conserver une transcription partiellement expurgée.

Pour une requête observée, une réponse de modèle peut citer n'importe quelle
partie de la transcription sans limite de repère structuré. Son `responseBody`
du journal d'appels persisté est donc remplacé par un marqueur d'omission ;
l'artefact de pipeline détaillé (qui peut inclure les corps en amont/client et
les morceaux de flux) n'est pas conservé. Les caches sémantiques, d'idempotence
et de relecture de raisonnement contournent les lectures et les écritures pour
cette requête. La requête du fournisseur et la réponse visible par le client
restent inchangées. Les premiers octets de keepalive sont drainés du tampon
temporaire lorsque l'artefact détaillé est omis. L'avertissement EventStream
mal formé de Kiro ne signale que le nombre d'octets de la charge utile, jamais
son contenu ou l'erreur brute de l'analyseur JSON.
Cela ne prétend pas que chaque diagnostic de fournisseur/plugin non lié a été
audité ; le balayage plus large du récepteur conservé est suivi dans le #11658.

Le cycle de vie interne `/api/modality-bridge/video/drilldown` est un substrat
de cache séparé, en boucle locale/authentifié par jeton. Chaque opération
nécessite également un ID de principal opaque canonique. Avant qu'un appelant
de production ne soit activé, il doit dériver cet ID du locataire authentifié
et ne doit jamais transmettre une valeur sélectionnée par le client. Les clés
de cache lient ce principal aux ID de session et de référence vidéo canoniques,
ne stockent que leurs clés dérivées SHA-256 et limitent les lectures et les
suppressions au même principal. Le cache stocke au maximum 16 images JPEG
dérivées par entrée, les fait expirer après dix minutes et prend en charge les
lectures `start`/`end` bornées ou la suppression explicite de session.

Chaque principal est limité à 16 entrées et 64 Mio de données JPEG canoniques.
Ces limites sont indépendantes du plafond global de 64 entrées/256 Mio : la
pression du quota de principal évince uniquement les entrées les moins
récemment utilisées de ce principal avant que l'éviction LRU globale ne soit
prise en compte. Les entrées expirées sont supprimées de la comptabilité du
principal et de la comptabilité globale lors de l'activité du cache, tandis que
l'annulation et l'échec de validation ne valident pas un remplacement partiel.

Le cache rejette les Base64 non canoniques, le rembourrage excessif, les médias
non JPEG, les JPEG mal formés ou tronqués, et les JPEG qui produisent un
avertissement lors d'un décodage `sharp` d'image complète borné. Il ré-encode
chaque image acceptée en JPEG canonique, dérive la largeur et la hauteur des
octets décodés au lieu de faire confiance aux champs de l'appelant, et ignore
tous les octets polyglottes de fin plutôt que de les conserver. Seul le tampon
compressé canonique borné est imputé aux deux quotas. La limite de fil JSON
inclut la surcharge Base64 pour le plafond d'entrée décodée de 32 Mio. Chaque
dérivation stockée enregistre son format/résolution JPEG validé, sa politique
d'échantillonnage, sa version de dérivation, son heure de création, son hachage
de contenu calculé par le serveur et sa référence parent hachée, plus le hachage
de contenu parent de l'appelant de confiance. L'annulation est vérifiée entre
les phases de décodage/hachage asynchrones avant la validation atomique du cache.

Cette tranche ne connecte pas encore de producteur de production à la route et ne
fournit pas de sélection de variante multi-résolution. Le chemin de requête
transparent de Video Bridge n'entraîne donc aucun travail supplémentaire,
tandis que la dérivation principale liée au locataire et le cycle de vie
multi-résolution complet de FU-08 restent un travail de suivi explicite
plutôt que d'être documentés comme un comportement complet.

Les images sont légendées séquentiellement avec le modèle vidéo configuré. Une
substitution vidéo vide hérite du paramètre Vision ; si les deux sont vides,
l'auto-routeur Vision sélectionne le modèle vision-capable effectif. Les
légendes réussies remplacent la partie originale par un préfixe stable
`[Video description:` qui marque également le texte comme une observation
dérivée de média non fiable et indique aux modèles en aval de ne pas suivre les
instructions trouvées dans le média. Les clés de cache des légendes d'image
incluent les octets JPEG, l'invite, l'horodatage et le modèle effectif ;
seules les légendes réussies sont mises en cache. Les entrées de cache
conservent le modèle de producteur réel réussi, y compris un modèle de
secours ; le pont signale `mixed` lorsque différentes images ont été produites
par différents modèles. Un succès de cache réutilise cette identité de
producteur au lieu de la réétiqueter comme le plan de routage demandé. Le cache
de résultats vidéo complet est indexé sur chaque entrée qui modifie la sortie
— invite, modèle effectif, politique d'échantillonnage, nombre d'images, mode
d'analyse sémantique, l'empreinte SHA-256 de l'indice de focus normalisé,
fenêtre de focus, `transcript`, `audioTranscript` et le drapeau de la feuille
de contact — donc la modification de l'une de ces dimensions est un échec de
cache, jamais une réutilisation périmée. La version de la politique de
déduplication visuelle, le seuil et le nombre d'images candidates bornées sont
également explicites dans la clé et les métadonnées du cache de résultats ;
un changement de politique ne peut donc pas réutiliser une description vidéo
complète périmée. Les métadonnées de la version 4 du cache de résultats
conservent le mode et l'empreinte, jamais la tâche utilisateur brute. Les
métadonnées du garde-fou signalent les modes d'analyse demandé et effectif ;
un mode `focused` demandé sans texte utilisateur utilisable est signalé comme
effectivement `full`.

Le garde-fou extrait toutes les parties vidéo prises en charge mais ne décrit
pas plus de `modalityBridgeVideoMaxVideos`. Pour une cible dont il est prouvé
qu'elle a `supportsVideo === false`, les vidéos échouées et dépassant la
limite deviennent des marqueurs de texte sécurisés explicites afin qu'aucune
vidéo brute ne survive. Lorsque la capacité est inconnue, ces parties restent
intactes. Les cibles avec `supportsVideo === true` contournent le pont. Le
signal d'abandon de la requête client se propage via le téléchargement, la
file d'attente du courtier, les sous-processus et les appels de légende ; les
abandons s'arrêtent entre les vidéos et ne s'ouvrent jamais aux médias bruts.

Les paramètres d'exécution sont sauvegardés par la base de données et validés
par Zod :

| Clé                                 | Par défaut  | Plage / comportement                                                                                           |
| :---------------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Exécution optionnelle, opt-in                                                                                  |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` conserve les légendes génériques ; `focused` utilise un contexte utilisateur récent borné et non fiable |
| `modalityBridgeVideoModel`          | `""`        | Hérite du modèle Vision Bridge                                                                                 |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                           |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ou `segment_aware` proportionnel ; l'échec du détecteur revient à `uniform`          |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                            |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                 |

Les valeurs de délai d'expiration vidéo persistantes héritées supérieures à
120 secondes sont limitées à la date limite du courtier ; les nouvelles
écritures de paramètres dépassant cette limite sont rejetées.
`GET /api/modality-bridge/video/runtime` nécessite une localité de bouclage
estampillée et fiable avant l'authentification ou la vérification d'exécution,
puis nécessite une authentification de gestion. Il ne renvoie que les versions
FFmpeg/ffprobe `available` et assainies, et une raison fixe lorsque l'exécution
n'est pas disponible. Le point de terminaison d'extraction interne n'est pas
une API de téléchargement publique : la saturation de la file d'attente renvoie
`503` plus `Retry-After`, une déconnexion de l'appelant renvoie `499`, et la
date limite fixe du courtier renvoie `504`. Les réponses converties ajoutent
`video->text;model=<visionModel>;parts=<videos>` à l'en-tête central
`x-omniroute-modality-bridge` sans supprimer les segments Vision ou Audio.

### Masqueur PII (`piiMasker.ts`)

S'exécute sur **les deux** étapes.

- **`preCall`** clone la charge utile, parcourt `system`, `messages`, `input`
  et `prompt` (y compris les éléments de chaîne de caractères simples), et
  applique `processPII()` (de `@/shared/utils/inputSanitizer`) aux champs
  `content`/`text` de type chaîne. Lorsque `PII_REDACTION_ENABLED=true`, les
  PII détectées sont masquées dans la charge utile sortante. Ceci est
  indépendant de `INPUT_SANITIZER_MODE` (qui ne contrôle que la politique
  d'injection d'invite). Lorsque le masquage est désactivé, l'appel
  enregistre les nombres de détection sans réécrire le contenu.
- **`postCall`** clone en profondeur la réponse, exécute `sanitizePIIResponse()`
  plus le masqueur de forme d'API de réponses (`maskResponsesOutput` — couvre
  `output_text` et `output[].content[].text`). Si un masquage se produit, la
  réponse modifiée remplace l'originale.

Le garde-fou ne bloque jamais ; il ne fait qu'annoter (`meta.detections`,
`meta.redacted`) ou réécrire.

### Injection d'invite (`promptInjection.ts`)

Détecte les structures adverses dans le contenu fourni par l'utilisateur et
applique la politique configurée. Le comportement est dicté par les variables
d'environnement et les options du constructeur :

| Paramètre        | Variable d'environnement                                                                              | Par défaut | Effet                                                                                                                                                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Activé           | `INPUT_SANITIZER_ENABLED`                                                                             | `true`     | Lorsque `false`, le garde-fou court-circuite.                                                                                                                                                                     |
| Mode             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`     | Politique d'injection : `block`, `warn`, ou `log`. (`redact` est accepté pour la rétrocompatibilité mais ne supprime **pas** le texte d'injection ; la réécriture PII est contrôlée par `PII_REDACTION_ENABLED`.) |
| Seuil de blocage | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`     | Gravité minimale requise pour bloquer. Le niveau "medium" est en mode observation uniquement par défaut.                                                                                                          |

**Priorité du mode** (`getMode`) : `options.mode` de l'appelant →
**Surcharge de la fonctionnalité DB** (`INJECTION_GUARD_MODE`) (Tableau de bord → Paramètres →
Fonctionnalités) → variable d'environnement `INJECTION_GUARD_MODE` → variable d'environnement `INPUT_SANITIZER_MODE` →
`warn`. Une surcharge via le tableau de bord l'emporte donc sur les variables d'environnement, de sorte que l'interface utilisateur des fonctionnalités contrôle le garde-fou en direct (sans redémarrage). La lecture de la base de données est à sécurité intégrée :
si elle échoue, le garde-fou revient au comportement basé sur les variables d'environnement, et lorsqu'aucune surcharge n'est définie, le comportement est identique à la résolution basée uniquement sur les variables d'environnement.

Sources de détection :

1.  `sanitizeRequest()` de `@/shared/utils/inputSanitizer` (ensemble de détecteurs partagés utilisé ailleurs dans le pipeline).
2.  `DEFAULT_GUARD_PATTERNS` intégrés (actuellement `system_override_inline` et
    `markdown_system_block`, tous deux de gravité `high`).
3.  `customPatterns` facultatifs passés via les options du constructeur (chaînes de caractères, expressions régulières,
    ou enregistrements `{ name, pattern, severity }`).

Lorsque `mode === "block"` **et** qu'au moins une détection atteint le seuil de gravité, `preCall` renvoie `{ block: true, message: "Request rejected: suspicious content detected" }`. En modes `warn`/`log`, le garde-fou enregistre un journal mais autorise l'appel. L'aide partagée `evaluatePromptInjection()` est également exportée pour les appelants qui ont besoin d'évaluer des invites sans passer par le registre.

**Limite d'analyse (v3.8.20) :** le détecteur n'inspecte que les **16 premiers Ko** du texte d'invite joint — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 octets) dans `src/shared/utils/inputSanitizer.ts`. Les deux fonctions `detectInjection()` et `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` avant d'exécuter la boucle de motifs. Les directives d'injection se trouvent près du début d'une entrée, ce qui limite l'utilisation du CPU/GC des expressions régulières sur des charges utiles de plusieurs centaines de Ko sans affaiblir la détection (cf. #3932, #4041).

### Masqueur de crédentiels (`credentialMasker.ts`)

S'exécute sur **les deux** étapes, en dernier dans la chaîne par défaut (priorité `95`). Masque les motifs connus de clés API / jetons secrets de la charge utile sortante (contenu du message, arguments d'appel d'outil, résultats d'outil) **et** de la réponse du fournisseur, de sorte qu'un identifiant collé dans une invite (ou renvoyé par un résultat d'outil) ne soit pas divulgué au fournisseur en amont ou au client.

- **Optionnel uniquement**, même convention que la rédaction PII (Règle stricte adjacente à la #20) :
  désactivé sauf si `settings.credentialRedactionEnabled === true` **ou**
  `CREDENTIAL_REDACTION_ENABLED=true`. Si désactivé, le garde-fou est une opération nulle —
  il ne bloque jamais et ne réécrit jamais.
- `redactCredentials()` parcourt l'arbre complet de la charge utile/réponse (`walkValue()`,
  protégé contre la pollution de prototype, protégé contre les cycles via `WeakSet`) et remplace les correspondances par
  un espace réservé `[REDACTED:<type>]`, ne clonant que les branches qui ont réellement
  changé.
- `CREDENTIAL_PATTERNS` couvre les clés de fournisseurs LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), les jetons VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), les clés de paiement (Stripe, Square), les
  clés cloud (clé d'accès AWS, Twilio, SendGrid, Mailgun), les clés privées / JWT,
  les chaînes de connexion contenant des identifiants (`mongodb://user:pass@...`, etc.), et
  un motif générique de valeur d'en-tête `Authorization`/`x-api-key`/`api-key`/`apikey`. Les clés de type en-tête (`authorization`, `x-api-key`, `api-key`, `apikey`) sont masquées structurellement (valeur uniquement, préfixe de schéma comme `Bearer `/`Basic ` préservé) plutôt que via l'expression régulière textuelle générique.
- Le garde-fou ne bloque jamais ; il ne fait que réécrire (`modifiedPayload` /
  `modifiedResponse`) et annoter (`meta.credentialsRedacted`, `meta.count`).

Garde de régression : `tests/unit/credential-masker-guardrail.test.ts`.

## Contrat de base (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true interrompt immédiatement la chaîne
  message?: string; // affiché en cas de blocage
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // renvoyé par preCall pour réécrire la requête
  modifiedResponse?: TValue; // renvoyé par postCall pour réécrire la réponse
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Un garde-fou signale « aucune modification » en renvoyant soit `void`, `{}`, soit
`{ block: false }`. Le renvoi d'un `modifiedPayload`/`modifiedResponse` remplace
la valeur qui parcourt la chaîne pour les garde-fous suivants.
`signal?: AbortSignal` propage le cycle de vie de l'appelant aux garde-fous. L'abandon d'une requête constitue l'exception délibérée au comportement fail-open : les ponts multimédias interrompent leur traitement et effectuent le nettoyage sans restaurer les données multimédias brutes vers une cible dont on sait qu'elle ne les prend pas en charge.

## Registre (`registry.ts`)

Le singleton `guardrailRegistry` expose :

- `register(guardrail)` — ajoute un garde-fou (ou le remplace selon son nom normalisé) et
  retrie les garde-fous par `priority` croissante.
- `clear()` / `list()` — utilitaires d'administration.
- `runPreCallHooks(payload, context)` — parcourt les garde-fous actifs, fait transiter
  le contenu via `modifiedPayload` et s'arrête au premier `block: true`.
- `runPostCallHooks(response, context)` — même flux côté réponse.
- `resetGuardrailsForTests({ registerDefaults })` — efface l'état et, facultativement,
  réenregistre les garde-fous par défaut afin d'assurer une isolation propre des tests.

Les deux exécuteurs renvoient `{ blocked, payload|response, results, guardrail?, message? }`,
où `results` est un tableau d'enregistrements `GuardrailExecutionResult` comprenant
les champs `blocked`, `skipped`, `modified`, `error` et `meta` propres à chaque garde-fou,
utiles pour le traçage.

### Désactivation des garde-fous par requête

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agrège une
liste dédupliquée des noms de garde-fous qui doivent être ignorés pour la
requête actuelle. Sources (toutes facultatives et fusionnées) :

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` dans le corps de la requête (au niveau supérieur)
- `metadata.disabledGuardrails` dans le corps de la requête
- En-tête `x-omniroute-disabled-guardrails` (ou l'ancien
  `x-disabled-guardrails`)

Les valeurs peuvent être des tableaux de chaînes ou une chaîne séparée par des virgules ; les noms sont
normalisés en minuscules au format kebab-case (`pii_masker` → `pii-masker`). Le résultat
est transmis au registre via `context.disabledGuardrails`, qui ignore
les garde-fous correspondants (`skipped: true` dans `results`).

## Ordre d’exécution

Pour chaque requête transitant par `src/sse/handlers/chat.ts` et
`open-sse/handlers/chatCore.ts` :

1. `resolveDisabledGuardrails(...)` construit la liste des éléments à ignorer à partir de la clé API, du corps
   et des en-têtes.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` exécute les garde-fous par ordre croissant
   de priorité :
   - Les garde-fous désactivés sont enregistrés comme `skipped`.
   - La méthode `preCall` de chaque garde-fou peut réécrire la charge utile via `modifiedPayload`.
   - Le premier `block: true` interrompt la chaîne et le gestionnaire renvoie
     une réponse de rejet du garde-fou.
3. La charge utile (potentiellement réécrite) passe dans le routage combiné et l’envoi
   en amont.
4. Une fois la réponse assemblée, `guardrailRegistry.runPostCallHooks(...)`
   exécute la même chaîne sur la réponse. Ici, `block: true` supprime la réponse
   en amont.

Les garde-fous qui lèvent une exception sont enregistrés avec `error: <message>` et consignés via
`logger.warn`, mais la chaîne continue — par conception, les erreurs n’entraînent pas de blocage.

## Configuration

Variables d’environnement lues par les garde-fous intégrés :

| Variable                              | Utilisée par           | Effet                                                                                                                                                              |
| ------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`     | Définissez-la sur `false` pour désactiver entièrement la détection.                                                                                                |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`     | Politique d’injection : `warn`, `block` ou `log`. L’ancienne valeur `redact` ne réécrit pas le texte d’injection.                                                  |
| `INJECTION_GUARD_MODE`                | `prompt-injection`     | Mode du garde-fou contre les injections ; il s’agit également d’un indicateur de fonctionnalité en BDD qui **remplace** les variables d’environnement (BDD > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`     | Gravité minimale rejetée par `MODE=block` : `high` (par défaut), `medium` ou `low`.                                                                                |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`     | Ancien alias de `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                                                                 |
| `PII_REDACTION_ENABLED`               | `pii-masker`           | Lorsque la valeur est `true`, les données personnelles de la requête sont masquées (indépendamment du mode d’injection).                                           |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (en aval) | Contrôle le comportement du masqueur côté réponse.                                                                                                                 |

Les garde-fous Modality Bridge lisent la configuration d’exécution depuis le magasin de paramètres
adossé à la BDD (`getSettings()`), et non depuis les variables d’environnement. Les clés principales de Vision sont
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` et
`modalityBridgeCacheMaxEntries`. Les anciennes clés
`visionBridge*` ne sont acceptées que comme mécanisme documenté de repli en lecture pour un cycle ;
les écritures depuis le tableau de bord utilisent les clés principales. Les valeurs par défaut et le résolveur
de repli se trouvent dans `src/shared/constants/modalityBridgeDefaults.ts`, tandis que les anciennes
constantes sont conservées dans `src/shared/constants/visionBridgeDefaults.ts`.

Audio utilise `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` et `modalityBridgeAudioMaxClips`, ainsi que les paramètres partagés
`modalityBridgeCache*`. Audio ne dispose d’aucun mécanisme de repli vers d’anciennes clés, car celles-ci
ont été introduites avec le schéma Modality Bridge.

Video utilise `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` et
`modalityBridgeVideoTimeout`, ainsi que les paramètres partagés `modalityBridgeCache*`.
Il est désactivé par défaut, car FFmpeg/ffprobe sont des dépendances opérationnelles
facultatives et que le sous-titrage des images ajoute de la latence et augmente le coût du modèle.

## Garde-fous personnalisés

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Étapes :

1. Créez `src/lib/guardrails/myGuardrail.ts` en étendant `BaseGuardrail`.
2. Implémentez `preCall` et/ou `postCall`.
3. Enregistrez-le lors de l’importation (ajout depuis `registerDefaultGuardrails`) ou
   appelez `guardrailRegistry.register(...)` à l’exécution — le registre remplace
   tout garde-fou existant portant le même nom normalisé.
4. Ajoutez des tests sous `tests/unit/` (exemples existants :
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Tests

Utilisez `resetGuardrailsForTests()` entre les tests afin de repartir d’un état connu.
Passez `{ registerDefaults: false }` pour commencer avec un registre vide et
n’enregistrer que les garde-fous testés. Vision Bridge accepte l’injection de
dépendances (`deps.getSettings`, `deps.callVisionModel`) ; Audio Bridge expose les
points d’injection équivalents pour les paramètres, les capacités, la sélection du
modèle STT, la vérification des identifiants et la transcription. Les tests peuvent
donc couvrir les deux flux sans accès à une base de données ni au réseau.

## Voir aussi

- `src/lib/guardrails/` — implémentation
- `src/shared/utils/inputSanitizer.ts` — détecteur partagé utilisé pour
  l’injection de prompts et le masquage des informations personnelles
- `src/shared/constants/visionBridgeDefaults.ts` — valeurs par défaut de Vision Bridge et
  liste des modèles pour lesquels le pont est imposé
- `src/shared/constants/modalityBridgeDefaults.ts` — valeurs d’exécution par défaut partagées pour Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — couche orthogonale (disjoncteur, délais de récupération)
- `docs/reference/ENVIRONMENT.md` — référence complète des variables d’environnement

## Couverture des routes par le garde-fou contre les injections et red team (Phase 8 · Bloc D)

Le garde-fou contre les injections (`createInjectionGuard` / `withInjectionGuard`) couvre toutes les routes
qui acceptent des prompts utilisateur. Il respecte `INJECTION_GUARD_MODE` (`warn` par défaut = journalisation uniquement ;
`block` = renvoie une réponse HTTP 400 `SECURITY_001`).

| Type             | Routes                                                                                                                                               | Mode par défaut |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Texte (existant) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn            |
| Génératif        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn            |
| Données          | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn            |

L’extraction de texte (`extractMessageContents`) couvre `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red team (chaque nuit, `nightly-llm-security.yml`) :** promptfoo vérifie que chaque route bloque
le corpus OWASP-LLM lorsque `INJECTION_GUARD_MODE=block` ; garak exécute des sondes (ignorées en l’absence de secret).
`moderations` est inclus par souci de cohérence — les opérateurs utilisant le mode de blocage peuvent l’exempter via
`resolveDisabledGuardrails`.

Le workflow nocturne (`.github/workflows/nightly-llm-security.yml`, tâche cron + déclenchement
manuel) comporte deux jobs :

- **`promptfoo-guard` (bloquant)** — exécute `promptfoo eval -c promptfooconfig.yaml`
  avec `INJECTION_GUARD_MODE=block`. Chaque cas antagoniste (par exemple « ignorer toutes les
  instructions précédentes… », contournements de type DAN) vérifie que la réponse contient
  `error.code === "SECURITY_001"`, c’est-à-dire que le garde-fou a bien rejeté la requête.
- **`garak` (informatif)** — exécute garak avec `--probes promptinject,dan,leakreplay`
  sur une instance OmniRoute locale (`http://localhost:20128/v1`). Son exécution est conditionnée par un
  secret de fournisseur (`PROMPTFOO_PROVIDER_KEY`) ; il est ignoré proprement en son absence et se termine
  par `|| true`, afin de produire un rapport sans faire échouer la CI.

La couverture de l’utilitaire de garde-fou (`createInjectionGuard` / `withInjectionGuard`)
s’étend à toutes les routes `/v1` acceptant des prompts ; le texte du prompt est extrait de
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` par
`extractMessageContents()` dans `src/shared/utils/inputSanitizer.ts`.
