# Cursor Provider in Docker Environments (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Lorsque OmniRoute s’exécute dans Docker, les anciens flux **Importer depuis Cursor IDE** /
`cursor-agent` échouent, car le conteneur ne peut pas accéder à l’installation
de Cursor sur l’hôte. Utilisez plutôt **Se connecter avec Cursor** (PKCE deep-control).

## Pourquoi l’importation depuis l’IDE / la CLI échoue dans Docker

1. **Isolation du système de fichiers** — L’importation automatique recherche des chemins Linux tels que
   `~/.config/Cursor/User/globalStorage/state.vscdb` _à l’intérieur_ du conteneur.
   Avec Docker Desktop pour macOS, la base de données de l’IDE hôte n’est pas montée par défaut, et
   le système d’exploitation du conteneur est Linux même lorsque l’hôte est Darwin.
2. **Absence du binaire `cursor-agent`** — Les images OmniRoute officielles n’incluent pas
   `cursor-agent`. Auparavant, Modèles disponibles exécutait
   `cursor-agent --list-models` dans un shell, puis se rabattait sur un catalogue statique.
3. **Binaire incorrect** — Ne montez **pas** par liaison un `cursor-agent` macOS dans un
   conteneur Linux. Il ne pourra pas s’exécuter.

## Recommandé : Se connecter avec Cursor

1. Ouvrez **Tableau de bord → Fournisseurs → Cursor**.
2. Sélectionnez l’onglet **Se connecter avec Cursor**.
3. Cliquez sur **Se connecter avec Cursor** — OmniRoute ouvre
   `https://cursor.com/loginDeepControl?…` dans le navigateur de votre **hôte**.
4. Autorisez la connexion dans le navigateur, puis revenez au tableau de bord. OmniRoute
   interroge `api2.cursor.sh/auth/poll` jusqu’à la réception des jetons.
5. OmniRoute stocke les jetons **d’accès + d’actualisation** et les actualise via
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Cette méthode ne nécessite ni Cursor IDE ni `cursor-agent` à l’intérieur du conteneur.

## Découverte des modèles

Avec une connexion authentifiée, **Modèles disponibles / Synchronisation automatique** privilégie le
catalogue HTTP `AiService/AvailableModels` de Cursor à l’aide du jeton Bearer de la connexion.
En cas d’échec, OmniRoute essaie tout de même le `cursor-agent` de l’hôte (s’il est présent), puis
les données initiales du registre statique.

OmniRoute expose toujours **`auto`** dans le catalogue (affiché comme « Auto »), ainsi que
les modes de routage de style OpenCodex **`auto-cost`**, **`auto-balance`** et
**`auto-intelligence`**. Dans les échanges réseau, ceux-ci correspondent au modèle `default` de Cursor
(avec un `ModelParameter` `optimization` pour les trois variantes). Privilégiez
`cu/auto` lorsque le quota des modèles premium est épuisé — Auto dispose souvent encore d’un quota.

### Le catalogue dynamique est exclusif après synchronisation

Après une synchronisation réussie des modèles Cursor (`cursor-agent --list-models` → catalogue
synchronisé persistant, ou récupération authentifiée par jeton Bearer de `AvailableModels` ci-dessus), le
**tableau de bord**, **`/v1/models`** et **Tout tester** affichent :

1. Les modèles renvoyés par la synchronisation dynamique
2. Les identifiants de routage automatique injectés : `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Les modèles **personnalisés** de l’opérateur (importation / ajout manuel) — jamais supprimés par la synchronisation

Le vaste registre statique situé sous
`open-sse/config/providers/registry/cursor/` sert **uniquement de solution de secours hors ligne**. Lorsque
le catalogue synchronisé est vide (ou que la découverte échoue), la liste se rabat sur ce registre.

Les identifiants comportant un suffixe d’effort (par exemple `claude-4.6-sonnet-high`) peuvent toujours être
**demandés** à l’exécution : `resolveRequestedModel` retire le suffixe pour le convertir en
`ModelParameter` dans les échanges réseau. La liste exclusive masque volontairement ces variantes statiques
dans Tout tester afin que les sondes correspondent aux modèles réellement signalés comme disponibles par Cursor.

### Utilitaires

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — fusion pour le tableau de bord
- `ensureCursorAutoCatalogEntry` — injection de auto* lors de la découverte et de l’affichage
- `shouldSuppressStaticModelForExclusiveListing` — boucle statique de `/v1/models`

## Limites du fournisseur (quota)

**Utilisation → Limites du fournisseur** pour Cursor utilise les API Bearer sur `api2.cursor.sh`
(`GetCurrentPeriodUsage` → résumé de l’utilisation → auth/usage) après une authentification PKCE ou l’importation
d’un jeton. L’ancien mécanisme reposant sur les cookies et le tableau de bord `cursor.com` reste une solution de dernier recours
pour les anciennes sessions importées depuis l’IDE.

Les fenêtres comprennent généralement **Total**, **Auto + Composer** et **API**. Si
les limites semblent vides, relancez **Se connecter avec Cursor** ou réimportez les jetons (l’importation depuis l’IDE
seule n’est plus nécessaire).

## Tours vides / quota épuisé

Lorsque Cursor accepte une exécution mais ne renvoie aucun texte d’assistant (ce qui est courant lorsque le quota
premium est épuisé), OmniRoute présente une erreur **429** exploitable (avec des indications sur le quota) ou
une erreur **502** accompagnée d’instructions — et non un simple message « Le fournisseur a renvoyé un contenu vide ». Les échecs
de streaming tels que `not_found: AI Model Not Found` (fenêtre d’utilisation épuisée) sont
classés comme **limite de débit Cursor / utilisation dépassée** et conservent ce message
tout au long du pipeline SSE (la protection partagée contre les flux vides ne remplace pas une
erreur déjà émise). Vérifiez les limites du fournisseur, essayez le modèle **`auto`** ou augmentez
les limites de l’abonnement Cursor.

## Version du client (sans interface graphique)

Sans installation locale de `cursor-agent`, OmniRoute détermine
`x-cursor-client-version` à partir de la variable d’environnement `CURSOR_AGENT_CLI_VERSION`, puis d’une
analyse, mise en cache sur disque, du script d’installation de Cursor, et enfin d’un identifiant de build épinglé. Remplacez-la à l’aide de
`CURSOR_AGENT_CLI_VERSION` si nécessaire.

## Solution de secours : importation manuelle des jetons

Si vous ne pouvez pas terminer la connexion dans le navigateur :

1. Sur l’hôte, extrayez les jetons du fichier `state.vscdb` de Cursor :

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Ouvrez **Importer un jeton** dans la fenêtre modale d’authentification Cursor.
3. Collez le **Jeton d’accès** et, lorsqu’il est disponible, le **Jeton d’actualisation** (requis pour
   l’actualisation automatique). L’identifiant de la machine est facultatif.

Les importations ne contenant qu’un jeton d’accès fonctionnent également, mais expireront sans jeton d’actualisation —
effectuez une nouvelle importation lorsque la messagerie renvoie des erreurs d’authentification.

## Voir aussi

- Instructions Docker pour Zed : [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Référence externe pour la connexion de Cursor avec OpenCodex :
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
