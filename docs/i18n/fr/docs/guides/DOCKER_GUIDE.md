# 🐳 Docker Guide — OmniRoute (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Référence complète du déploiement Docker. Pour démarrer rapidement, consultez la [section Docker du README](../README.md#-docker).

## Table des matières

- [Exécution rapide](#quick-run)
- [Avec un fichier d’environnement](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profils disponibles](#available-profiles)
- [Configuration des outils CLI de l’hôte lorsqu’OmniRoute s’exécute dans Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Conteneur auxiliaire Redis](#redis-sidecar)
- [Compose pour la production](#production-compose)
- [Étapes du Dockerfile](#dockerfile-stages)
- [Variables d’environnement critiques](#critical-environment-variables)
- [Docker Compose avec Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Tunnel rapide Cloudflare](#cloudflare-quick-tunnel)
- [Tags d’image](#image-tags)
- [Disponibilité : SQLite par défaut ne prend en charge qu’une seule réplique](#availability-default-sqlite-is-single-replica)
- [Remarques importantes](#important-notes)

---

## Démarrage rapide

> **Auto-héberger en une seule commande ?** Consultez le
> [guide d’auto-hébergement](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (image publiée +
> Redis, accessible uniquement via l’interface de bouclage, sans choix de profil). Le démarrage rapide ci-dessous correspond à
> l’utilisation d’un conteneur unique pour les utilisateurs qui exécutent déjà Redis ailleurs.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Avec un fichier d’environnement

```bash
# Copiez et modifiez d’abord .env
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# Profil de base (sans outils CLI)
docker compose --profile base up -d

# Profil CLI (Claude Code, Codex et OpenClaw intégrés)
docker compose --profile cli up -d

# Profil hôte (principalement pour Linux ; monte les binaires CLI de l’hôte en lecture seule)
docker compose --profile host up -d

# Combiner le profil CLI et le conteneur auxiliaire CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Profils disponibles

OmniRoute fournit quatre profils Compose. Choisissez celui qui correspond à votre environnement.

| Profil          | Service          | Cas d’utilisation                                                                                                                                  | Commande                                     |
| --------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (défaut) | `omniroute-base` | Serveur sans interface graphique / environnement d’exécution minimal, sans CLI de fournisseurs incluses                                            | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | Flux de travail agentiques qui appellent `omniroute providers/setup/doctor` et les CLI incluses (Codex, Claude Code, Droid, OpenClaw)              | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | Hôtes Linux souhaitant un accès de type `network_mode` aux CLI de l’hôte en montant `~/.local/bin`, `~/.codex`, `~/.claude`, etc. en lecture seule | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | Exécuter le conteneur auxiliaire [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sur le port `8317` pour relayer les CLI en amont      | `docker compose --profile cliproxyapi up -d` |

> Plusieurs profils peuvent être combinés : `docker compose --profile cli --profile cliproxyapi up -d`.

## Configuration des outils CLI de l’hôte lorsqu’OmniRoute s’exécute dans Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` et le bouton
**Enregistrer la configuration** du tableau de bord écrivent tous des fichiers tels que `~/.codex/*.config.toml`. Ces chemins
n’ont de sens que sur la machine où la CLI s’exécute réellement. Si vous les exécutez dans
le conteneur, l’écriture s’effectue dans le répertoire personnel du conteneur (`/home/node` —
l’image s’exécute avec `USER node`), qu’aucune CLI de l’hôte ne consultera jamais et qui est
supprimé dès que le conteneur est recréé.

OmniRoute détecte cette situation et refuse l’écriture en fournissant des instructions au lieu de
signaler une réussite dont vous ne pourriez pas profiter : la CLI se termine avec le code `2` et l’API répond `422`
avec `containerEphemeralTarget: true`.

### Recommandé : exécuter la CLI sur l’hôte et OmniRoute dans Docker

Le conteneur fournit l’API ; la CLI configure les outils de votre hôte.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # fait pointer la CLI vers le conteneur
omniroute setup-codex                      # écrit dans le véritable ~/.codex de votre hôte
```

C’est le choix approprié lorsque Codex, Claude Code, Cursor ou des outils similaires s’exécutent sur votre
ordinateur portable — ce qui correspond à la configuration habituelle.

### Alternative : monter les répertoires de configuration de l’hôte avec un montage lié (profil `host`)

Si vous souhaitez que le conteneur lui-même écrive dans la configuration de votre hôte, montez les
répertoires et faites pointer `CLI_CONFIG_HOME` vers la racine du montage. Le profil `host`
le fait déjà :

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

C’est le montage lié qui rend le chemin fiable : OmniRoute lit
`/proc/self/mountinfo` et autorise les écritures dans les chemins montés (ainsi que dans les répertoires
dont les enfants sont des montages, ce qui correspond exactement à la structure `/host-home` ci-dessus), tout en
continuant de refuser les chemins non montés.

### Solution de dernier recours : configurer les propres CLI du conteneur (à utiliser avec parcimonie)

Lorsque les CLI se trouvent réellement dans le conteneur (profil `cli`), l’écriture
est intentionnelle. Transmettez `--allow-container-write` à toute commande `setup-*`, ou définissez
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` pour le serveur. L’écriture est effectuée
avec un avertissement indiquant qu’elle ne survivra pas au conteneur.

> **Avertissement de sécurité — profil `cli` + montage de `docker.sock`.**
> Le profil `cli` monte `/var/run/docker.sock` avec un montage lié afin que le programme
> de mise à jour automatique exécuté dans le conteneur puisse recréer la pile à partir du démon de l’hôte
> (`src/lib/system/autoUpdate.ts` vérifie la présence de ce socket et ignore le
> chemin Docker lorsqu’il est absent). Ce socket constitue **une frontière de confiance donnant un accès root
> à l’hôte** : tout ce qui peut y accéder contrôle le démon Docker de l’hôte en tant que
> root — et peut créer, inspecter, arrêter et supprimer n’importe quel conteneur de l’hôte.
> Conséquences :
>
> 1. **N’exposez jamais le port du profil `cli` sur le réseau.** Publiez-le
>    sur `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — rendre un profil `cli` accessible depuis le LAN transforme toute RCE au niveau du tableau de bord en
>    compromission complète de l’hôte.
> 2. **Ne montez aucun répertoire supplémentaire de l’hôte dans le profil `cli`.**
>    Le socket Docker combiné à tout montage supplémentaire donne au conteneur un accès complet en
>    lecture/écriture à votre système de fichiers et à la configuration de l’hôte. Si un outil doit
>    accéder à un projet, exécutez-le localement avec le binaire CLI — ne le montez pas
>    dans le conteneur `cli`.
>
> Si vous n’avez pas besoin de la mise à jour automatique dans le conteneur, laissez le profil `cli` désactivé
> (`COMPOSE_PROFILES=core,redis` ou une valeur plus courte). Les autres profils ne
> montent pas le socket Docker.
>
> Consultez `docs/security/MITM-TPROXY-DECRYPT.md` (git ; non compilé dans `/docs`) pour le modèle de menace associé
> à l’interception MITM, et `docs/security/SUPPLY_CHAIN.md` pour la chaîne de provenance
> des binaires `codex`/`claude-code`/`droid`/`openclaw`.

## Conteneur auxiliaire Redis

OmniRoute s’appuie sur Redis pour prendre en charge le limiteur de débit distribué et le cache partagé. Le service `redis` est **toujours défini** dans `docker-compose.yml` (il n’est associé à aucun profil) et démarre avec n’importe quel autre profil.

| Détail                      | Valeur                                     |
| --------------------------- | ------------------------------------------ |
| Image                       | `redis:7-alpine`                           |
| Nom du conteneur            | `omniroute-redis`                          |
| Port interne                | `6379`                                     |
| Port hôte (remplacement)    | `REDIS_PORT` (`6379` par défaut)           |
| Adresse hôte (remplacement) | `REDIS_BIND_HOST` (`127.0.0.1` par défaut) |
| Volume                      | `omniroute-redis-data` → `/data`           |
| Vérification de l’état      | `redis-cli ping` (intervalle de 10 s)      |

Variables d’environnement associées :

- `REDIS_URL` — chaîne de connexion injectée dans l’application (`redis://redis:6379` par défaut).
- `REDIS_PORT` — mappage du port côté hôte pour le conteneur Redis.
- `REDIS_BIND_HOST` — interface hôte sur laquelle le port est publié. Valeur par défaut : `127.0.0.1`.

> **Pourquoi l’interface de bouclage est utilisée par défaut :** le conteneur auxiliaire s’exécute sans `requirepass`, et les conteneurs
> de l’application y accèdent via le réseau Compose (`redis:6379`) — le port publié sert
> uniquement aux outils exécutés côté hôte (`redis-cli`, une commande locale `npm run dev`). Une publication sur
> `0.0.0.0` exposerait une instance Redis non authentifiée à tous les hôtes de votre réseau local. Si vous définissez
> `REDIS_BIND_HOST=0.0.0.0`, ajoutez également `--requirepass` au champ `command:` du service.

**La désactivation de Redis** n’est pas recommandée (le limiteur de débit basculera vers une solution de secours en mémoire). Si vous devez le faire, supprimez ou commentez le bloc du service `redis:` dans `docker-compose.yml`, ou réduisez son nombre d’instances à zéro :

```bash
docker compose up -d --scale redis=0
```

## Compose de production

Pour exécuter un instantané de production isolé parallèlement à l’environnement de développement, utilisez `docker-compose.prod.yml`.

| Détail                             | Valeur                                                                                                |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Fichier                            | `docker-compose.prod.yml`                                                                             |
| Port par défaut du tableau de bord | `PROD_DASHBOARD_PORT=20130` (mappé vers le port interne `${DASHBOARD_PORT:-20128}`)                   |
| Port par défaut de l’API           | `PROD_API_PORT=20131`                                                                                 |
| Image                              | `omniroute:prod` (construite à partir de la cible `runner-cli`)                                       |
| Conteneur Redis                    | `omniroute-redis-prod` (`redis:8.6.2`, volume dédié `redis-prod-data`)                                |
| Volume de données                  | `omniroute-prod-data` (nommé et conservé entre les reconstructions)                                   |
| Vérifications de l’état            | `node healthcheck.mjs` + `redis-cli ping`, avec `depends_on` conditionné par l’état de santé de Redis |

Utilisation :

```bash
# Construire et démarrer la pile de production
docker compose -f docker-compose.prod.yml up -d --build

# Afficher les journaux en continu
docker compose -f docker-compose.prod.yml logs -f

# Arrêter la pile (conserver les volumes)
docker compose -f docker-compose.prod.yml down
```

La pile de production s’exécute parallèlement à la configuration Compose de développement (avec des noms de conteneurs, des ports et des volumes différents). Vous pouvez ainsi poursuivre vos itérations en local tout en maintenant la production en fonctionnement.

## Étapes du Dockerfile

Le dépôt fournit un Dockerfile multi-étapes (`Dockerfile`). Trois étapes sont exposées ; choisissez la bonne valeur de `target` pour votre cas d’utilisation.

| Étape         | Image de base         | Objectif                                                                                                                                                                                       |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Installe les dépendances (`npm ci --legacy-peer-deps`) et exécute `npm run build` (Turbopack par défaut — voir Ressources de compilation ci-dessous)                                           |
| `runner-base` | `node:26-trixie-slim` | Environnement d’exécution de production avec la sortie autonome de Next.js. **Aucune CLI de fournisseur incluse.**                                                                             |
| `runner-cli`  | `runner-base`         | Ajoute `git`, `docker.io`, `docker-compose` et les CLI globales : `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Choisissez cette étape pour les workflows agentiques.** |

Construisez manuellement une cible spécifique :

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Ressources de compilation

Trois arguments de compilation contrôlent les ressources consommées par l’étape `builder`. Ils s’appliquent uniquement à la compilation —
`OMNIROUTE_MEMORY_MB` (ci-dessous) est un réglage d’exécution distinct.

| Argument de compilation     | Valeur par défaut | Effet                                                                                               |
| --------------------------- | ----------------- | --------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`               | `0` compile avec webpack à la place. Pic de mémoire plus faible, mais plus lent.                    |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`            | Plafond du tas V8 (`--max-old-space-size`) pour le processus `next build` lancé.                    |
| `OMNIROUTE_BUILD_WORKERS`   | `2`               | Alimente `CIRCLE_NODE_TOTAL` ; Next déduit `workers = N - 1` pour la collecte des données de pages. |

`OMNIROUTE_BUILD_WORKERS` est le paramètre à augmenter sur une machine de compilation puissante et celui à
suspecter lorsqu’une compilation aux ressources limitées échoue **après** `✓ Compiled successfully`. Chaque
worker de données de pages constitue son propre processus, tout comme le processus parent `next build` ;
une reproduction sur un VPS actif (problème #7518) a mesuré le pic de RSS de chaque processus à
~4,5 Go, indépendamment de l’option de tas `NODE_OPTIONS` (Turbopack compile dans de la
mémoire native/Rust située hors du tas V8). La valeur par défaut de `2` (→ 1 worker, 2
processus au total) est dimensionnée pour les runners hébergés par GitHub disposant de 16 Go / 4 vCPU et utilisés par le
pipeline de publication. Avec `8` (→ 7 workers), ce runner a manqué de mémoire et
buildkit a fait échouer l’étape avec `ResourceExhausted: ... cannot allocate memory` ;
`3` (→ 2 workers) ne tenait toujours pas une fois la RSS par processus mesurée
directement plutôt que déduite. `tests/unit/docker-build-memory-budget.test.ts`
effectue le calcul à partir de la valeur mesurée et échoue si l’un des deux réglages
dépasse les capacités du runner.

Turbopack compile dans de la mémoire Rust native qui se trouve **hors** du tas V8, de sorte que
`OMNIROUTE_BUILD_MEMORY_MB` ne la limite pas. Sur un hôte doté d’un plafond de mémoire, la
compilation est alors interrompue par SIGKILL par le mécanisme OOM sans aucun message d’erreur — elle
s’arrête simplement au milieu de `Creating an optimized production build`, ce qui ressemble davantage
à un blocage qu’à un manque de mémoire. Si l’hôte de compilation dispose de ressources limitées, changez d’outil de regroupement :

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` est activé, de sorte que `next build` exécute un processus parent **et** un processus
worker, chacun respectant séparément `OMNIROUTE_BUILD_MEMORY_MB`. Dimensionnez le plafond du conteneur
à environ plus de deux fois cette valeur, et non à une seule fois.

Mesures effectuées sur cette arborescence (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`) :

| Outil de regroupement | Plafond du conteneur | Résultat                                            |
| --------------------- | -------------------- | --------------------------------------------------- |
| Turbopack             | 8 Gio / 16 Gio       | Arrêté par l’OOM dans les deux cas, silencieusement |
| webpack               | 8 Gio                | Worker de compilation arrêté par SIGKILL            |
| webpack               | 12 Gio               | Réussite, avec un pic à 11,1 Gio                    |

### Valeurs d’exécution par défaut

Valeurs par défaut exportées par `runner-base` : `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Comportement de la mémoire dans Docker :

- L’image définit `OMNIROUTE_MEMORY_MB=1024` et en déduit `NODE_OPTIONS=--max-old-space-size=1024`.
- Le processus serveur réel est lancé par le lanceur autonome, qui lit `OMNIROUTE_MEMORY_MB` et ajoute `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node utilise la dernière valeur répétée de `--max-old-space-size` ; définir `OMNIROUTE_MEMORY_MB` contrôle donc la limite effective du tas Docker.
- Comme l’image la définit toujours, la valeur de secours du lanceur, calibrée en fonction de la RAM, ne s’applique jamais sous Docker. Augmentez-la explicitement selon la charge de travail (tableau ci-dessous). `2048` reste insuffisant pour les requêtes `/v1/responses` des agents de programmation.

### RAM d’exécution pour les agents de programmation

La valeur Docker par défaut de 1 Gio constitue un minimum pour le tableau de bord et les conversations légères, pas une configuration de production. Les longs corps de requêtes `POST /v1/responses` (des centaines de messages, des dizaines d’outils) conservent plusieurs graphes en mémoire pendant la compression. Deux requêtes simultanées d’environ 3 Mio / 750 000 jetons ont provoqué l’arrêt de V8 avec un espace ancien de **12 Gio** (`FATAL ERROR: Reached heap limit`) et ont également déclenché un OOM du cgroup à 16 Gio. Voir [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Dimensionnez la **mémoire du cgroup `--memory` au-dessus du tas** — les tampons natifs, SQLite et les données intermédiaires de compression se trouvent hors de V8.

| Charge de travail                                 | `OMNIROUTE_MEMORY_MB`                    | Conteneur / cgroup       | Remarques                                                                                                                                                    |
| ------------------------------------------------- | ---------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tableau de bord, une conversation légère          | `1024` (valeur par défaut de l’image)    | ≥2 GiB                   |                                                                                                                                                              |
| Un agent de codage (Claude/Codex/Grok)            | `8192`                                   | ≥10 GiB                  | Session unique `/v1/responses` typique                                                                                                                       |
| Deux longues requêtes `/v1/responses` simultanées | `10240`–`12288`                          | ≥12–16 GiB               | Interruption de V8 mesurée avec un tas d’environ 12 GiB                                                                                                      |
| Trois contextes longs simultanés ou plus          | à ne pas exécuter dans un seul processus | sérialiser / plus de RAM | Par défaut, l’admission des charges lourdes est limitée à 1 requête en cours ; augmenter cette limite sans ajouter de RAM provoque de nouveau l’interruption |

Sur une machine physique, `omniroute serve` se calibre sur environ 35 % de la RAM (dans les limites `[512, 4096]`) lorsque `OMNIROUTE_MEMORY_MB` n’est **pas défini**. Docker définit toujours `1024`, ce calibrage ne s’exécute donc jamais dans l’image officielle.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Variables d’environnement critiques

Au-delà des valeurs par défaut documentées dans [ENVIRONMENT.md](../reference/ENVIRONMENT.md), les variables suivantes sont les plus importantes lors d’une exécution sous Docker :

| Variable                      | Rôle                                                                                                                                                                                                                                                                                                                | Valeur par défaut               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Secret partagé pour le pont WebSocket. **Obligatoire en production** — définissez-le sur une chaîne aléatoire robuste.                                                                                                                                                                                              | non définie (doit être fournie) |
| `REDIS_URL`                   | Chaîne de connexion pour le limiteur de débit / système de cache                                                                                                                                                                                                                                                    | `redis://redis:6379`            |
| `REDIS_PORT`                  | Port côté hôte pour le conteneur Redis fourni                                                                                                                                                                                                                                                                       | `6379`                          |
| `REDIS_BIND_HOST`             | Interface hôte sur laquelle le port Redis fourni est publié (interface de bouclage, sauf si vous ajoutez AUTH)                                                                                                                                                                                                      | `127.0.0.1`                     |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Chemin de l’hôte monté dans le profil `cli` à l’emplacement `/workspace/omniroute` pour les processus d’auto-mise à jour                                                                                                                                                                                            | `.` (répertoire actuel)         |
| `OMNIROUTE_MEMORY_MB`         | Plafond du tas Node à l’exécution pour le serveur Docker autonome ; remplace la valeur par défaut de l’image indiquée ci-dessus. Agents de codage : `8192`+ (voir [RAM d’exécution](#runtime-ram-for-coding-agents)).                                                                                               | `1024`                          |
| `DASHBOARD_PORT` / `API_PORT` | Remplace les ports exposés pour le tableau de bord (20128) et l’API (20129)                                                                                                                                                                                                                                         | `20128` / `20129`               |
| `APP_BIND_HOST`               | Interface hôte sur laquelle docker-compose publie les ports du tableau de bord, de l’API et du WS en direct. Avec `REQUIRE_API_KEY=false` (valeur par défaut), `0.0.0.0` expose le proxy `/v1` anonyme au réseau local — n’élargissez l’accès qu’avec `REQUIRE_API_KEY=true` ou en plaçant un proxy inverse devant. | `127.0.0.1`                     |
| `CLIPROXY_BIND_HOST`          | Interface hôte sur laquelle docker-compose publie le side-car `cliproxyapi` — son volume de données contient les identifiants des fournisseurs.                                                                                                                                                                     | `127.0.0.1`                     |
| `OMNIROUTE_PLUGINS_DIR`       | Répertoire lu par l’analyseur d’extensions à l’exécution et dans lequel il effectue les installations. Définissez-le lorsque les extensions sont montées par liaison : la valeur par défaut dépend de `HOME`, qu’une image n’est pas tenue d’exporter.                                                              | `~/.omniroute/plugins`          |
| `OMNIROUTE_BASE_PATH`         | Sous-chemin d’URL lorsque l’application est publiée derrière un proxy inverse (p. ex. `/omniroute`)                                                                                                                                                                                                                 | _(vide = racine)_               |
| `NEXT_PUBLIC_BASE_URL`        | Origine publique du navigateur incluant le sous-chemin (p. ex. `https://host/omniroute`)                                                                                                                                                                                                                            | non définie                     |
| `PROD_DASHBOARD_PORT`         | Port du tableau de bord côté hôte pour `docker-compose.prod.yml`                                                                                                                                                                                                                                                    | `20130`                         |
| `CLIPROXYAPI_PORT`            | Port côté hôte pour le side-car `cliproxyapi`                                                                                                                                                                                                                                                                       | `8317`                          |

## Proxy inverse sur un sous-chemin (Traefik / nginx)

Le `basePath` de Next.js est compilé dans le bundle autonome. OmniRoute enregistre la
valeur intégrée dans un fichier sentinelle à la racine de l’application (écrit pendant
`npm run build` ; lu par `scripts/docker/ensure-docker-base-path.mjs`) et la compare à
`OMNIROUTE_BASE_PATH` au démarrage du conteneur. Lorsque ces valeurs diffèrent et que
l’image a été construite pour la racine du domaine, le point d’entrée réécrit les
manifestes autonomes, les littéraux `basePath`/`assetPrefix` intégrés (Next 16 génère
les URL des ressources SSR uniquement à partir de `assetPrefix` — le correctif y
réplique le sous-chemin), les URL de ressources `/_next/static` intégrées (manifestes
de références client, importations de médias, pages d’erreur pré-rendues) ainsi que le
shim client de `process.env` avant l’exécution de `node dev/run-standalone.mjs`.

### Construction avec Compose (recommandée)

Définissez les deux variables dans `.env`, puis reconstruisez afin que l’image et
l’environnement d’exécution soient cohérents :

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` transmet `OMNIROUTE_BASE_PATH` comme argument de construction
Docker et comme variable d’environnement d’exécution.

### Image racine préconstruite + sous-chemin à l’exécution

Les images publiées `diegosouzapw/omniroute:*` sont construites pour la racine du
domaine. Vous pouvez néanmoins définir `OMNIROUTE_BASE_PATH` à l’exécution ; le
conteneur corrige le bundle une fois au démarrage. Associez-le à l’origine publique
correspondante :

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Configurez le proxy inverse pour qu’il transmette le chemin externe **complet** (ne
supprimez pas le préfixe). Traefik doit acheminer `PathPrefix(`/omniroute`)` vers le
conteneur sans `StripPrefix`, afin que Next.js reçoive `/omniroute/...` et serve les
ressources depuis `/omniroute/_next/...`.

Le contrôle d’intégrité Docker interroge le point de terminaison léger de cycle de vie
`/healthz`, préfixé par la valeur active de `OMNIROUTE_BASE_PATH`.
`/api/monitoring/health` reste disponible pour les diagnostics humains ou de tableaux
de bord ; pour que le HEALTHCHECK du conteneur l’utilise à nouveau (par exemple pour
imposer un contrôle d’intégrité approfondi), définissez
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Ce chemin effectue un contrôle
**approfondi** (base de données + résumé de la surveillance) — il convient au
`HEALTHCHECK` peu fréquent de Docker si vous choisissez de le réactiver, mais **pas**
aux intervalles de `livenessProbe` de Kubernetes.

Pour les orchestrateurs (Kubernetes, Nomad, etc.) :

| Sonde                     | À privilégier                                                            | À éviter                                                    |
| ------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------- |
| Vivacité                  | HTTP `GET /livez`, ou TCP sur le port principal (`PORT`, défaut `20128`) | `/api/monitoring/health` comme contrôle de vivacité         |
| Disponibilité             | HTTP `GET /healthz`                                                      | Les délais courts qui assimilent une boucle occupée à morte |
| Approfondie / boîte noire | `/api/monitoring/health`                                                 | —                                                           |

`/healthz` indique l’état du cycle de vie du processus (`ok` / `starting` /
`stopping`). `/livez` vérifie uniquement que le processus est actif (200 chaque fois
que le gestionnaire peut s’exécuter ; il n’attend pas que le service soit prêt). Les
deux s’exécutent néanmoins sur la même boucle d’événements Node que le traitement des
requêtes ; les opérations de catalogue ou de compression intensives en CPU peuvent
donc les retarder — occupé ≠ mort. Privilégiez une sonde de vivacité TCP si les sondes
HTTP expirent. Guide complet sur les sondes :
[Guide de surveillance — recommandations relatives aux sondes Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose avec Caddy (TLS automatique HTTPS)

OmniRoute peut être exposé de manière sécurisée grâce au provisionnement SSL automatique de Caddy. Assurez-vous que l’enregistrement DNS A de votre domaine pointe vers l’adresse IP de votre serveur.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Origine visible par le navigateur pour les rappels OAuth, les liens du tableau de bord et les URL publiques générées.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL interne de serveur à serveur pour les tâches planifiées et les requêtes vers soi-même.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy définit les en-têtes de transfert standard pour le conteneur en amont. OmniRoute utilise
`NEXT_PUBLIC_BASE_URL` comme origine publique canonique pour les rappels OAuth et les liens publics
générés ; les écritures authentifiées du tableau de bord utilisent des requêtes de même origine ainsi qu’une protection CSRF
liée à la session. N’activez `OMNIROUTE_TRUST_PROXY` que pour les déploiements avancés dans lesquels vous souhaitez délibérément
qu’OmniRoute détermine l’origine publique à partir d’en-têtes de transfert approuvés plutôt que d’une configuration
explicite.

## Tunnel rapide Cloudflare

La prise en charge du tableau de bord pour les déploiements Docker comprend un **tunnel rapide Cloudflare** activable en un clic dans `Dashboard → Endpoints`. Lors de la première activation, `cloudflared` est téléchargé uniquement si nécessaire, un tunnel temporaire vers votre point de terminaison `/v1` actuel est démarré, et l’URL `https://*.trycloudflare.com/v1` générée s’affiche directement sous votre URL publique habituelle.

Les panneaux de tunnel des points de terminaison (Cloudflare, Tailscale, ngrok) peuvent être affichés ou masqués depuis `Settings → Appearance` sans modifier l’état actif des tunnels.

### Remarques sur les tunnels

- Les URL des tunnels rapides sont temporaires et changent après chaque redémarrage.
- Les tunnels rapides ne sont pas restaurés automatiquement après le redémarrage d’OmniRoute ou du conteneur. Réactivez-les depuis le tableau de bord lorsque cela est nécessaire.
- L’installation gérée prend actuellement en charge Linux, macOS et Windows sur `x64` / `arm64`.
- Les tunnels rapides gérés utilisent par défaut le transport HTTP/2 afin d’éviter les avertissements bruyants liés aux tampons UDP de QUIC dans les environnements de conteneurs aux ressources limitées. Définissez `CLOUDFLARED_PROTOCOL=quic` ou `auto` si vous souhaitez utiliser un autre transport.
- Les images Docker incluent les autorités de certification racines du système et les transmettent à l’instance gérée de `cloudflared`, ce qui évite les échecs de validation TLS lorsque le tunnel s’initialise à l’intérieur du conteneur.
- Définissez `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` si vous souhaitez qu’OmniRoute utilise un binaire existant au lieu d’en télécharger un.

## Étiquettes d’image

| Image                    | Étiquette | Taille | Description                                                       |
| ------------------------ | --------- | ------ | ----------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest`  | ~250MB | Version stable SemVer **publiée** la plus élevée (pas git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`   | ~250MB | Épinglez cette catégorie d’étiquette pour GitOps                  |

Manifeste multiplateforme : versions natives `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker sélectionne automatiquement l’architecture correspondante ; transmettez `--platform linux/amd64` si vous devez forcer l’émulation AMD64 sur des hôtes ARM.

### Canaux de publication

OmniRoute publie des canaux Docker distincts pour les versions stables, les tests de la branche de publication active et les versions de développement.

| Canal                           | Source                                           | Mutabilité                        | Utilisation recommandée                                                                                                              |
| ------------------------------- | ------------------------------------------------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Version signée/versionnée                        | Immuable                          | Déploiements de production épinglant une version précise                                                                             |
| `:latest` / `:latest-web`       | Version stable SemVer **publiée** la plus élevée | Pointeur stable mutable           | Suit les versions stables **après** une tâche de publication SemVer — ne suit **pas** `main` ni les commits `release/v*` non publiés |
| `:next` / `:next-web`           | Branche `release/v*` par défaut actuelle         | Pointeur de préversion mutable    | Test des correctifs intégrés à la branche de publication active, mais pas encore inclus dans une version stable                      |
| `:main` / `:main-web`           | Branche `main`                                   | Pointeur de développement mutable | Uniquement pour les tests de développement et d’intégration                                                                          |

#### Utilisation du canal de préversion

Le canal `next` est reconstruit à chaque envoi vers la branche `release/v*` par défaut actuelle et est publié pour AMD64 et ARM64. Les anciennes branches de maintenance ne peuvent pas le remplacer. Le canal fournit une image pouvant être téléchargée pour les correctifs fusionnés dans la branche de publication active avant la création de la prochaine étiquette stable.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Pour Docker Compose, remplacez l’étiquette d’image utilisée par le profil sélectionné, puis téléchargez l’image et recréez le service :

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Sécurité et retour arrière

`next` est un canal de préversion flottant. Il peut changer à chaque envoi vers la branche de publication active et n’est **pas pris en charge pour une utilisation en production**. Épinglez le condensat de l’image lors de l’évaluation d’une version spécifique :

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Avant d’effectuer les tests, sauvegardez le volume de données OmniRoute ou le répertoire de données monté avec un montage bind. Pour revenir à la version précédente, restaurez la version stable ou le digest précédemment utilisé, puis recréez le conteneur :

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Une build de branche de publication ne peut jamais déplacer `latest` ; seule une version sémantique stable admissible peut promouvoir le pointeur stable. Les images `next` conservent l’inspection des images de publication ainsi que le contrôle bloquant des vulnérabilités CRITICAL.

**`latest` ne garantit pas l’actualité par rapport à git.** Les correctifs fusionnés dans `main` ou dans la branche `release/v*` active ne sont **pas** inclus dans `:latest` tant qu’une image SemVer stable n’a pas été publiée et que la tâche de publication n’a pas promu `:latest` (avec le même digest que cette version SemVer). Si `latest` semble figée alors que GitHub affiche déjà le correctif, récupérez `:next` pour tester la branche de publication ou attendez le tag SemVer.

| Votre objectif                                                                       | À utiliser                                  |
| ------------------------------------------------------------------------------------ | ------------------------------------------- |
| GitOps / production ne devant subir aucune dérive                                    | Épingler `:X.Y.Z` (ou le digest de l’image) |
| Suivre les versions stables publiées et accepter une recréation à chaque publication | `:latest`                                   |
| Tester les commits `release/v*` non publiés                                          | `:next` (pas en production)                 |
| Tester `main`                                                                        | `:main` (pas en production)                 |

## Disponibilité : SQLite par défaut ne prend en charge qu’un seul réplica

La configuration Docker / Kubernetes standard d’OmniRoute repose sur **un processus Node + un processus d’écriture SQLite**. La haute disponibilité n’est **pas prise en charge** avec cette topologie.

| Contrainte                                       | Conséquence                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Processus d’écriture unique                      | N’exécutez **pas** plusieurs réplicas utilisant le même fichier SQLite. Cela corrompt la base de données.                                                                                                                                                                                                                                                                                                                |
| Recréation / redémarrage / arrêt par HEALTHCHECK | **Interruption totale** des flux SSE en cours, des sessions du tableau de bord et de l’état en mémoire. Chaque client connecté est déconnecté. Les nouvelles requêtes effectuées pendant la période sans point de terminaison reçoivent du proxy inverse une erreur **`502 Bad Gateway: Unknown error`**, et non du JSON OmniRoute — les clients ne peuvent pas la distinguer d’une défaillance du fournisseur (#11015). |
| Même boucle d’événements que `/healthz`          | Une opération intensive sur le catalogue ou un cycle de compression peut retarder les sondes ; un délai d’expiration court redémarre alors le **seul** réplica.                                                                                                                                                                                                                                                          |

**Matrice des sondes** (voir également les [recommandations relatives aux sondes Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)) :

| Sonde                            | Cible                                                          | Ne pas utiliser                                                                                |
| -------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Vivacité                         | TCP sur `PORT` (`20128` par défaut), ou HTTP souple `/healthz` | `/api/monitoring/health`                                                                       |
| Disponibilité                    | HTTP `GET /healthz`                                            | Des délais d’expiration courts qui interprètent une boucle d’événements occupée comme un arrêt |
| Approfondie / opérateurs humains | `/api/monitoring/health`                                       | La vivacité automatisée du kubelet                                                             |

**Mises à niveau :** attendez-vous à ce que chaque session soit interrompue. Drainez les clients si possible ; aucune mise à jour progressive n’est possible avec la configuration SQLite par défaut. La combinaison de `restart: unless-stopped` dans Compose et du `HEALTHCHECK` Docker remplacera également l’unique processus lorsque le conteneur est dans l’état Unhealthy — avec le même périmètre d’impact.

Extrait Kubernetes pour un **seul réplica** (Recreate est obligatoire ; n’augmentez pas `replicas` pour un même fichier SQLite) :

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

La pause `preStop` permet à kube de retirer les points de terminaison du Service avant SIGTERM, afin que le **nouveau** trafic cesse d’atteindre le processus en cours d’arrêt. Les flux SSE `/v1/responses` en cours disposent d’un délai de drainage pouvant atteindre `SHUTDOWN_TIMEOUT_MS` (30 s par défaut), grâce à des baux d’admission renforcés (#11015). Les nouvelles requêtes qui atteignent encore le processus reçoivent `503` + `Retry-After: 5`. La période sans point de terminaison propre à Recreate, jusqu’à ce que le processus de remplacement soit Ready, reste une interruption totale — elle est inhérente à la topologie SQLite et ne résulte pas d’une mauvaise configuration des sondes.

Postgres externe / la haute disponibilité avec plusieurs processus d’écriture ne constitue **pas** une configuration standard documentée. Si vous avez besoin de haute disponibilité, conservez un seul réplica ou exécutez une topologie que le projet a testée et documentée séparément. Les travaux relatifs à Postgres/MySQL sont suivis dans [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). En attendant leur livraison, la seule façon prise en charge de multiplier la capacité pour les requêtes `/v1/responses` **volumineuses** consiste à utiliser N processus indépendants (section suivante), et non `replicas > 1` sur un même volume.

## Mise à l’échelle horizontale : N processus indépendants

Un processus Node correspond à **un tas V8**. Deux requêtes d’agent de codage `POST /v1/responses` (RTK + Caveman) simultanées d’environ 3 MiB / 750 000 tokens font échouer ce tas aux alentours de 12 Gio (`FATAL ERROR: Reached heap limit`) et peuvent provoquer une erreur OOM dans un cgroup de 16 Gio. Voir [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Cette mesure constitue un avertissement relatif au **budget mémoire**, et non une limite maximale du produit fixée à deux longues requêtes `/v1/responses` simultanées. L’admission des conversations lourdes est contrôlée par un budget d’octets entrants calculé automatiquement (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), dimensionné à partir de cette même limite V8/cgroup — le remplacer par une valeur supérieure (ou définir l’ancienne limite du nombre de requêtes `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) sur un processus déjà dimensionné réintroduit cet échec. Les petites conversations, `/healthz`, `/v1/models` et MCP ne sont **pas** soumis à cette limite.

### Un seul processus : plus de deux longues requêtes `/v1/responses`

Un processus **sain** (tas inférieur à `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, valeur par défaut `0.75`) **peut** exécuter plus de deux longues requêtes `POST /v1/responses` simultanées lorsque le budget d’octets en cours à l’échelle du processus (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) dispose encore de capacité. Les corps dont la taille est supérieure ou égale à `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (256 Kio par défaut) utilisent le même bail pour charge lourde que les requêtes structurellement lourdes et le même mécanisme d’échappement `tryAcquireHealthyHeadroom` de [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). La prise en charge de dizaines de clients SSE simultanés et durables (les opérateurs en ont souvent besoin de 40 à 50) relève du **budget mémoire** — dimensionnez le tas, les emplacements principaux/de réserve et `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — et non d’une limite stricte du produit à « 2 maximum ». Un tas sous pression continue de délester les requêtes avec une erreur `503` réessayable afin que le problème #7849 ne réapparaisse pas.

Pour **multiplier les tas** (espaces old-space V8 indépendants) **dès aujourd’hui** :

| À faire                                                                                                                                                                                                             | À ne pas faire                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Exécuter **N conteneurs/pods**, chacun avec son **propre** `DATA_DIR` / volume                                                                                                                                      | Définir `replicas > 1` pour un même fichier SQLite                                           |
| Dimensionner les requêtes lourdes en cours + la réserve saine en fonction du tas / budget d’octets en cours ; 1 à 2 est la valeur par défaut prudente issue de #7849, et non une limite maximale stricte du produit | Attribuer 8× plus de RAM à un processus et une limite de nombre non bornée                   |
| Facultatif : `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` pour des **compteurs de quotas partagés**                                                                                                         | Considérer Redis comme un SQLite partagé — ce n’est pas le cas                               |
| Dupliquer les secrets des fournisseurs dans chaque instance (ou accepter des tableaux de bord partitionnés)                                                                                                         | S’attendre à disposer d’un seul tableau de bord / journal d’appels pour toutes les instances |
| Placer n’importe quel équilibreur de charge en frontal ; une affinité par clé d’API ou par session suffit                                                                                                           | Exiger un middleware propre à un fournisseur et tenant compte de la taille                   |

Matériel : le nombre de longues requêtes `/v1/responses` simultanées par instance relève du **budget mémoire** (tas + octets en cours / #10110). `N` répertoires `DATA_DIR` indépendants multiplient toujours les tas : la RAM de l’hôte doit prendre en charge `N × cgroup`, et non « un pod de 16 Gio avec N=8 ». N’utilisez jamais `replicas > 1` sur un même fichier SQLite.

Exemple Compose (deux tas, deux volumes — pas `deploy.replicas: 2`) :

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

La densité au sein d’un même processus (compression hors de l’isolate HTTP) est traitée dans [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Un cluster logique unique reposant sur un état durable partagé est traité dans [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Remarques importantes

- **Mode WAL de SQLite :** Il convient de laisser `docker stop` se terminer afin qu’OmniRoute puisse réintégrer les dernières modifications dans `storage.sqlite` via un point de contrôle. Les fichiers Compose fournis définissent déjà un délai d’arrêt de 40 s. Si vous exécutez directement l’image, conservez `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP` :** Définissez cette variable sur `true` si les sauvegardes périodiques/avant écriture sont gérées en externe. Les migrations de bases de données existantes nécessitent toujours leur propre instantané de sécurité durable ainsi qu’une protection contre les migrations massives.
- **Persistance des données :** Montez toujours un volume sur `/app/data` afin de conserver votre base de données, vos clés et vos configurations lors des redémarrages du conteneur.
- **Configuration du port :** Remplacez la variable d’environnement `PORT` pour modifier le port par défaut `20128`.

## Voir aussi

- [Guide de déploiement sur une VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Configuration d’une VM, de nginx et de Cloudflare
- [Guide de déploiement sur Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Déployer sur Fly.io
- [Configuration de l’environnement](../reference/ENVIRONMENT.md) — Référence complète du fichier `.env`
