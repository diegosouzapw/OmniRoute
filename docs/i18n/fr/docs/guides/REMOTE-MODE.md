# Remote Mode (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Exécutez la CLI `omniroute` sur votre ordinateur portable tandis qu’OmniRoute s’exécute ailleurs
(un VPS, un serveur domestique, une autre machine sur votre Tailnet). Vous vous connectez une fois avec
`omniroute connect`, puis **toutes** les commandes de la CLI ciblent ce serveur distant —
mêmes commandes, même sortie, mais exécutées sur le serveur distant.

Il n’y a pas de second outil à installer : le mode distant utilise la CLI `omniroute`
standard ainsi que des **jetons d’accès** dotés de portées spécifiques.

```bash
npm install -g omniroute                 # la CLI standard
omniroute connect 192.168.0.15           # connexion (mot de passe → jeton doté d’une portée)
omniroute models list                    # ← répertorie désormais les modèles du serveur DISTANT
omniroute configure codex                # ← écrit un profil Codex local à partir du catalogue distant
```

---

## Fonctionnement

```
votre ordinateur portable                OmniRoute distant (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ CLI omniroute      │  POST /api/cli/connect  (mot de passe → jeton)    │
│  contexte : vps    │ ───────────────►  │ émet un jeton d’accès doté    │
│  baseUrl, jeton    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ chaque route de gestion est    │
│ écrit les configs  │ ◄───────────────  │ vérifiée selon sa portée      │
│ LOCALEMENT         │                   └───────────────────────────────┘
└────────────────────┘
```

- Les **contextes** stockent chacun un serveur (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` change le serveur actif ; `default` correspond au serveur local.
- Les **jetons d’accès** (`oma_live_…`) autorisent les commandes de gestion. Ils sont
  distincts des clés d’API d’inférence (`sk-…`, utilisées pour `/v1/chat/completions`).
- Seul le hachage SHA-256 d’un jeton est stocké côté serveur. Le texte en clair n’est affiché
  qu’**une seule fois**, lors de sa création.

---

## Connexion

### Avec le mot de passe de gestion (amorçage)

```bash
omniroute connect 192.168.0.15
# Mot de passe de gestion pour http://192.168.0.15:20128: ********
# ✔ Connecté à http://192.168.0.15:20128 — contexte '192.168.0.15' (portée : admin)
```

Le flux par mot de passe émet par défaut un jeton **admin** (vous détenez le mot de passe, vous
disposez donc déjà d’un contrôle total). Réduisez la portée avec `--scope` :

```bash
omniroute connect 192.168.0.15 --scope write
```

Options : `--port <p>` (lorsque l’hôte n’en spécifie aucun), `--name <ctx>` (nom du contexte),
`--scope read|write|admin`. Une URL complète est respectée telle quelle :
`omniroute connect https://omni.example.com`.

### Avec un jeton généré au préalable

Générez un jeton doté d’une portée dans le tableau de bord (ou avec `omniroute tokens create`) et
collez-le — aucun mot de passe n’est nécessaire :

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

La CLI le valide via `GET /api/cli/whoami` et l’enregistre comme contexte actif.

---

## Portées

Trois niveaux hiérarchiques (`admin ⊃ write ⊃ read`) :

| Portée  | Autorisations                                                                                   |
| ------- | ----------------------------------------------------------------------------------------------- |
| `read`  | lister/inspecter — `models list`, `providers status`, `logs`, `usage`, `cost`                   |
| `write` | lecture **+** configuration/application — `setup-codex`, `keys add`, `config set`, combinaisons |
| `admin` | écriture **+** gestion — CRUD des `tokens`, ajout de fournisseurs, services, politiques, oauth  |

Le serveur déduit la portée requise par chaque route à partir de la méthode HTTP
(`GET`→lecture, mutations→écriture), ainsi que d’une liste d’autorisation admin pour les interfaces sensibles
(mutations de `/api/cli/tokens` et `/api/providers`, `/api/oauth`, `/api/services`, …).
Un jeton dont la portée est insuffisante reçoit une réponse `403` accompagnée d’un message explicite.

> Les routes qui lancent des processus (`/api/services/*`, `/api/mcp/*`, …) restent
> **accessibles uniquement via l’interface de bouclage** — un jeton distant ne peut jamais y accéder, quelle que soit sa portée.

---

## Connexion d’Antigravity sur une installation distante

Antigravity utilise l’écran de consentement firstparty/nativeapp de Google. Google ne
fournit le code d’autorisation que lorsque la **redirection loopback**
(`http://127.0.0.1:<port>/callback`) est **accessible depuis le navigateur qui
approuve la connexion**. Sur une installation distante sur un VPS, cette adresse loopback
se trouve sur le serveur, et non sur votre machine ; l’écran de consentement **reste donc
bloqué indéfiniment sans jamais générer de code** — la solution de secours habituelle
consistant à « coller l’URL de callback » ne fournit rien à coller. (Il s’agit d’une
contrainte imposée par Google : le même blocage se produit dans tout proxy utilisant le
client de bureau Antigravity intégré, pas uniquement dans OmniRoute.)

Le tableau de bord détecte ce problème avant que vous ne soyez bloqué : lorsque vous ouvrez
**Providers → Antigravity → Connect** depuis une adresse autre que localhost, l’avis
générique « copier l’URL de callback » est remplacé par les deux solutions ci-dessous,
avec votre hôte et votre port déjà renseignés. (Une adresse de réseau local est également
concernée — `192.168.x.x` n’est pas localhost pour ce callback.)

Il existe deux méthodes prises en charge pour connecter Antigravity à une instance
OmniRoute distante.

### Option A — assistant de connexion local (recommandé)

Exécutez le processus OAuth sur **votre propre ordinateur**, où `127.0.0.1` est accessible.
L’assistant communique directement avec Google, ce qui permet au consentement d’aboutir là
où la version du tableau de bord ne le peut pas.

**Si vous êtes déjà connecté** (`omniroute connect <host>`), vous n’avez rien à copier :
l’assistant transmet automatiquement l’identifiant à cette installation :

```bash
# Sur votre machine LOCALE (nécessite Node.js et un navigateur) :
omniroute connect 192.168.0.15        # une seule fois — génère un jeton de contexte avec une portée administrateur
npx omniroute login antigravity
#   ↳ ouvre l’écran de consentement Google, capture le callback sur un port loopback local,
#     l’échange, puis envoie l’identifiant par POST au contexte actif :
#
#   Antigravity connecté sur http://192.168.0.15:20128 (connexion abc123).
#   Rien à coller — vous pouvez fermer ce terminal.
```

L’envoi s’effectue automatiquement dès que le contexte actif pointe vers une autre
machine. Forcez-le dans un sens ou dans l’autre avec `--push` / `--no-push`, ou ciblez un
contexte précis avec `--context <name>`.

**Si votre machine ne peut pas accéder au VPS** (pare-feu, absence de SSH, poste isolé),
l’assistant fonctionne tout de même — il n’a réellement _besoin_ que de Google. Utilisez
`--no-push`, ou laissez simplement l’envoi échouer : il affichera alors le blob au lieu de
supprimer une autorisation que vous avez déjà effectuée.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Ensuite, dans le tableau de bord **distant** : **Providers → Antigravity → Connect**,
collez le blob `omniroute-cred-v1.…` dans le champ de l’**Étape 2** (il accepte soit une
URL de callback, soit un blob d’identifiant). OmniRoute le décode, exécute l’intégration
Cloud Code côté serveur et conserve la connexion.

> Le blob contient un jeton d’actualisation — traitez-le comme un mot de passe. Lors d’un
> envoi automatique, il est transmis une seule fois via la connexion authentifiée de
> votre contexte ; lors d’un collage, il est transmis via la connexion à votre tableau de
> bord. Dans les deux cas, il est stocké chiffré au repos, et un envoi réussi ne l’affiche
> jamais dans votre terminal.

Options : `--no-browser` (afficher l’URL au lieu de l’ouvrir automatiquement), `--port <n>`
(fixer le port loopback), `--timeout <ms>`, `--push` / `--no-push` (remplacer le mode de
transmission automatique), `--context <name>` (cibler un contexte précis).

### Option B — tunnel de redirection locale SSH

Si vous disposez d’un accès SSH au VPS, redirigez le port du tableau de bord afin que le
callback loopback revienne jusqu’au serveur par l’intermédiaire du tunnel :

```bash
# Sur votre machine LOCALE :
ssh -L 20128:127.0.0.1:20128 user@your-vps
# ouvrez ensuite http://localhost:20128 dans votre navigateur LOCAL et connectez Antigravity
# normalement — la redirection 127.0.0.1:20128/callback atteint désormais le VPS via SSH.
```

Comme vous accédez au tableau de bord à l’adresse `localhost:20128`, le consentement Google
aboutit et le callback est transmis au serveur par le même tunnel — aucun blob n’est
nécessaire. Maintenez le tunnel ouvert jusqu’à ce que la connexion soit indiquée comme
active.

Contrairement aux fournisseurs à loopback fixe ci-dessous, **une seule redirection
suffit** ici : le callback Antigravity utilise directement le port du tableau de bord ;
il n’est donc pas nécessaire de créer un second tunnel pour un port propre au fournisseur.

> Une autre solution entièrement sans interface graphique (sans assistant ni tunnel)
> consiste à configurer vos **propres** identifiants OAuth Web Google et une URL de base
> publique ; consultez les variables d’environnement OAuth du fournisseur. Les deux
> options ci-dessus ne nécessitent aucune configuration Google supplémentaire.

---

## Connexion de Codex / Grok sur une installation distante (fournisseurs à boucle locale fixe)

Codex, xAI (`xai-oauth`) et Grok CLI (`grok-cli`) enregistrent un
`redirect_uri` de boucle locale **fixe** auprès de leur application OAuth en amont. OmniRoute ne peut pas le modifier — le
fournisseur renvoie toujours le navigateur vers la même adresse codée en dur :

| Fournisseur | Callback fixe vers lequel le fournisseur redirige |
| ----------- | ------------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`             |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                 |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                 |

Ici, `localhost` désigne **la machine exécutant le navigateur**, tandis que le serveur
de callback PKCE d’OmniRoute écoute sur la boucle locale du **serveur**. Si vous ouvrez le tableau de bord à une adresse du réseau local
comme `http://192.168.0.15:20128`, les deux ne se rencontrent jamais : le code
d’autorisation est envoyé au `localhost:1455` de votre propre ordinateur portable, où rien n’écoute,
et le fournisseur fait échouer la connexion sans afficher d’erreur.

Le tableau de bord détecte cette situation avant d’ouvrir la fenêtre contextuelle et affiche la commande de tunnel
au lieu de laisser la connexion échouer silencieusement (#8046).

### Correctif — transférer **les deux** ports

```bash
# Sur la machine exécutant le NAVIGATEUR :
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# puis accédez à http://localhost:20128 et connectez Codex depuis cette adresse
```

Deux transferts sont nécessaires, et n’en effectuer qu’un seul échoue également :

- **`20128`** (le port du tableau de bord) fait de l’origine un véritable localhost, ce qui
  permet à OmniRoute de démarrer le serveur de callback PKCE — une origine du réseau local
  n’atteint jamais cette branche.
- **`1455`** (le port de callback fixe du fournisseur) est l’adresse vers laquelle le navigateur est renvoyé ;
  il doit être transféré par le tunnel vers la boucle locale du serveur.

Remplacez `1455` par `56121`/`56122` lors de la connexion à xAI ou Grok CLI, et `20128` par
le port réel de votre tableau de bord. Gardez le tunnel ouvert jusqu’à ce que la connexion apparaisse comme
active.

> **Pas d’accès SSH ?** Codex et Grok CLI acceptent également un jeton collé — l’onglet **Coller la clé API
> ** / **Importer auth.json** de la boîte de dialogue de connexion. Cette méthode n’utilise aucun callback de boucle locale
> et fonctionne donc depuis n’importe quelle origine. Codex accepte en outre un simple jeton d’accès
> ou un blob de session `~/.codex/auth.json`.

---

## Gestion des jetons

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ affiche le secret UNE SEULE FOIS — copiez-le maintenant
omniroute tokens list                 # masqués : identifiant, nom, portée, préfixe, statut, expiration
omniroute tokens revoke <id|prefix>   # révoquer immédiatement
omniroute tokens scopes               # expliquer les trois portées
```

Les commandes `tokens` nécessitent un identifiant **administrateur**. Vous pouvez également gérer les jetons dans
le tableau de bord sous **Paramètres → Jetons d’accès** (création, révocation, copie unique).

---

## Configuration d’une CLI de programmation à partir du catalogue distant

`omniroute configure` lit le catalogue de modèles en direct du **serveur actif** et écrit
une configuration sur **votre** machine.

```bash
omniroute configure codex
#   Fournisseurs : glm, kmc, ollamacloud, opencode-go, …
#   Fournisseur : glm
#   Identifiant du modèle : glm/glm-5.2
#   ✔ Écriture effectuée dans ~/.codex/glm52.config.toml
#   Utilisation :  codex --profile glm52

# mode non interactif
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# conserver un modèle fréquemment utilisé en haut du sélecteur interactif
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Le sélecteur conserve uniquement les identifiants de modèles (jamais les URL ni les identifiants d’accès) dans le fichier local
`model-preferences.json`, avec une portée définie par contexte et par CLI cible. Les favoris sont
affichés avant les sélections récentes ; utilisez `--unfavorite` pour retirer un modèle sélectionné
de la liste de ce contexte/cette cible.

Le profil écrit référence la clé d’inférence au moyen d’une variable d’environnement
(`OMNIROUTE_API_KEY`) — le secret n’est jamais écrit sur le disque. Pour la configuration initiale
unique de Codex (le bloc `[model_providers.omniroute]`), consultez
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Lancement d’une CLI sur le serveur distant (sans écrire de configuration)

`omniroute run <target>` respecte également le contexte actif : l’URL de base distante
et l’identifiant d’accès du contexte sont injectés uniquement dans le processus lancé.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → serveur distant
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Prévisualiser précisément ce qui serait lancé (uniquement les NOMS DES CLÉS d’environnement, jamais leurs valeurs) :
omniroute run codex --dry-run --json
```

Cibles : `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(source unique : `bin/cli/cli-manifest.mjs`). Qwen et Gemini s’exécutent avec un
répertoire personnel temporaire isolé, supprimé à la fermeture, de sorte que le lancement ne modifie jamais —
et ne divulgue rien dans — la configuration personnelle de vos outils.

### Commandes de configuration propres à chaque CLI

Chaque CLI prise en charge dispose d’une commande de configuration compatible avec les serveurs distants (toutes respectent le contexte
actif, ou `--remote <url> --api-key <key>`) :

| CLI         | Commande                   | Ce qui est écrit                                                                                                                                                                                                               |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Codex       | `omniroute setup-codex`    | Profils `~/.codex/<name>.config.toml` (par modèle)                                                                                                                                                                             |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (par modèle)                                                                                                                                                                         |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — le fournisseur `omniroute` compatible avec OpenAI, avec chaque modèle du catalogue (exécutez `opencode -m omniroute/<model>`)                                                             |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (mode CLI) + affiche les paramètres de l’extension VS Code à coller (compatible avec OpenAI, URL de base **sans** `/v1`)                                                            |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + paramètres VS Code `kilocode.*` — compatible avec OpenAI, URL de base **avec** `/v1`                                                                                                   |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + CLI `cn`) — `provider: openai`, `apiBase` **avec** `/v1`, clé via `${{ secrets.OMNIROUTE_API_KEY }}`                                                                            |
| Cursor      | `omniroute setup-cursor`   | affiche les étapes dans l’application (Settings → Models → Override OpenAI Base URL **avec** `/v1` + clé + modèle). La configuration de Cursor est une base SQLite opaque — panneau de discussion uniquement                   |
| Roo Code    | `omniroute setup-roo`      | écrit un fichier JSON d’importation Roo (`~/.omniroute/roo-settings.json`) + définit `roo-cline.autoImportSettingsPath` + affiche les étapes dans l’interface utilisateur (compatible avec OpenAI, URL de base **avec** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — fournisseur `openai-compat`, `base_url` **avec** `/v1`, clé via `$OMNIROUTE_API_KEY`                                                                                                            |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **sans** `/v1` + `GOOSE_MODEL`) + instructions pour les variables d’environnement                                                                       |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **sans** `/v1` + `model: openai/<id>`) + instructions pour les variables d’environnement (`aider --message --yes`)                                                                      |
| Qwen Code   | `omniroute setup-qwen`     | Entrée V4 `modelProviders.openai` dans `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` dans `~/.qwen/.env`                                                                                                                       |

```bash
# OpenCode (fournisseur compatible avec OpenAI, tous les modèles du catalogue, VPS distant)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # conserver uniquement les modèles correspondants
opencode -m omniroute/glm/glm-5.2 "..."          # exporter d’abord OMNIROUTE_API_KEY
```

> OpenCode dispose également d’une intégration **plugin** plus riche : `omniroute setup opencode`
> (désormais compatible avec les environnements distants via `--remote`) installe `@omniroute/opencode-plugin`.
> `setup-opencode` est l’alternative légère compatible avec OpenAI. La clé API
> est référencée via `{env:OMNIROUTE_API_KEY}` — elle n’est jamais écrite sur le disque.
>
> Sur OpenCode v2, utilisez plutôt `@omniroute/opencode-plugin-v2` : même catalogue,
> mais contrat de chargement différent. Il lit la clé depuis le propre magasin
> d’identifiants d’OpenCode lorsque l’intégration est connectée ; une passerelle distante
> ne nécessite donc aucune clé dans `opencode.json`.

---

## Gestion des contextes (basculer entre les serveurs)

Un **contexte** est un serveur enregistré (baseUrl + identifiant + portée). `omniroute connect`
en crée un et le rend actif ; à partir de ce moment, chaque commande le cible. Gérez et
basculez entre eux avec `omniroute contexts` :

```bash
omniroute contexts list            # tous les contextes ; l'actif est marqué ●
omniroute contexts current         # le serveur actif, le statut d'authentification, la portée
```

```text
  | Name    | Base URL                  | Auth  | Scope | Description
● | vps     | http://100.67.86.91:20128 | token | admin | OmniRoute distant (…)
  | default | http://localhost:20128    | ✗     |       |
```

**Changer de serveur** — chaque commande suivante utilise le contexte actif :

```bash
omniroute contexts use vps         # → toutes les commandes ciblent maintenant le VPS distant
omniroute tokens list              #   (s'exécute sur le VPS)

omniroute contexts use default     # → retour à localhost
omniroute tokens list              #   (s'exécute sur le serveur local)
```

**Ajouter un contexte manuellement** (au lieu de `connect`), inspecter ou renommer :

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "boîte de staging"
omniroute contexts show staging    # détails complets pour un contexte
omniroute contexts rename staging stg
```

**Supprimer un contexte** — demande confirmation ; passez `--yes` pour l'ignorer
(requis pour les scripts / shells non interactifs, qui refusent sinon en toute sécurité) :

```bash
omniroute contexts remove stg --yes
```

> Le contexte `default` (localhost) ne peut pas être supprimé. La suppression du contexte actif entraîne un retour
> au contexte `default`. Astuce : la suppression d'un contexte ne fait que supprimer l'identifiant enregistré **localement** —
> révoquez le jeton sur le serveur avec `omniroute tokens revoke <id>` pour réellement
> couper l'accès.

**Exporter / importer** des contextes (par exemple, pour les déplacer entre machines). Les exportations omettent
les identifiants par défaut, y compris les identifiants stockés par le mécanisme de secours basé sur fichier. Utilisez
`--include-secrets` explicitement lorsqu'une sauvegarde portable contenant des identifiants est nécessaire :

```bash
omniroute contexts export --out contexts.json     # expurgé ; destination par défaut : stdout
omniroute contexts export --include-secrets --out private-contexts.json
omniroute contexts import contexts.json            # écraser ; --merge pour conserver les existants
omniroute contexts migrate --yes                  # déplacer les jetons en texte clair hérités vers le trousseau
```

`--include-secrets` résout les références du trousseau avant l'exportation et échoue si un
identifiant référencé ne peut pas être lu. `--no-secrets` a toujours la priorité.
Les fichiers d'exportation sont écrits de manière atomique avec le mode `0600`. Traitez une exportation explicite
contenant des secrets comme un matériel secret. Sur les systèmes sans interface graphique et sans trousseau de clés OS utilisable,
la CLI utilise `config.json` avec le mode `0600` et affiche un
avertissement unique ; une exportation par défaut reste expurgée dans ce mode.

---

## Vérification rapide de bout en bout

Voici un cycle de vie prêt à copier-coller pour vérifier depuis zéro une configuration distante : connexion, création d’un
jeton à portée limitée, acheminement d’une commande, retour au contexte précédent et nettoyage. Remplacez
`192.168.0.15` par l’hôte ou l’adresse IP de votre serveur (Tailscale, réseau local ou URL
publique `https://…`).

```bash
# 1. Connexion (mot de passe → jeton administrateur, enregistré comme contexte qui devient actif)
omniroute connect 192.168.0.15                 # ou : --key oma_live_xxxx  (sans mot de passe)
omniroute contexts current                     # affiche le serveur distant et la portée

# 2. Utilisation — les commandes de gestion s’exécutent désormais sur le serveur distant
omniroute tokens create --name laptop --scope read   # crée un jeton avec une portée plus restreinte
omniroute tokens list                                 # liste masquée provenant du serveur distant

# 3. Basculement entre les contextes
omniroute contexts use default                 # → local
omniroute contexts use 192-168-0-15            # → de nouveau distant (nom obtenu via `contexts list`)

# 4. Nettoyage. REMARQUE : `contexts remove` supprime uniquement l’identifiant LOCAL —
#    cette commande ne révoque PAS le jeton sur le serveur. Révoquez-le d’abord côté serveur si vous
#    souhaitez réellement supprimer l’accès.
omniroute tokens revoke <id|prefix>            # supprime l’accès sur le serveur
omniroute contexts remove 192-168-0-15 --yes   # supprime le contexte local (même s’il est actif → retour à default), sans confirmation
```

> `--yes` rend `contexts remove` non interactif (requis dans les scripts/CI ; sans
> cette option, un shell non interactif refuse l’opération en toute sécurité au lieu de rester bloqué). La suppression du
> contexte **actif** entraîne automatiquement le retour à `default`.

---

## Notes de sécurité

- Le jeton en texte clair n’est affiché qu’une seule fois ; seul son hachage SHA-256 est conservé (comme pour les clés API).
- `omniroute connect` réutilise le verrouillage contre les attaques par force brute lors de la connexion ainsi que la journalisation d’audit.
- Privilégiez HTTPS ou un Tailnet pour le transport ; un hôte seul utilise par défaut `http://`
  pour faciliter l’utilisation sur un réseau local/Tailscale — transmettez une URL `https://…` complète pour TLS.
- Le fichier de contexte local recommandé est `~/.omniroute/config.json` (`chmod 600`)
  et ne contient qu’une `credentialRef` ; le jeton lui-même est stocké dans le
  trousseau du système d’exploitation (`keytar`) et n’est jamais affiché dans les journaux. Les installations sans interface qui ne disposent pas d’un
  trousseau natif fonctionnel utilisent explicitement le même fichier `0600` comme solution de secours et
  émettent un avertissement une seule fois. Utilisez `omniroute contexts migrate --yes` après avoir installé un
  backend de trousseau.

---

## Points de terminaison de l’API (référence)

| Méthode | Route                 | Authentification        | Portée                               |
| ------- | --------------------- | ----------------------- | ------------------------------------ |
| POST    | `/api/cli/connect`    | mot de passe de gestion | — (public, protégé par mot de passe) |
| GET     | `/api/cli/whoami`     | jeton d’accès           | lecture                              |
| GET     | `/api/cli/tokens`     | jeton d’accès           | administration                       |
| POST    | `/api/cli/tokens`     | jeton d’accès           | administration                       |
| DELETE  | `/api/cli/tokens/:id` | jeton d’accès           | administration                       |

Consultez [openapi.yaml](../openapi.yaml) pour les schémas complets.
